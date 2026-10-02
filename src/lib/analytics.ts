/** Consent-gated GA4. Keep payloads closed: never accept arbitrary event fields. */
export const CONSENT_KEY = "portfolio-analytics-consent-v1";
export const CONSENT_MAX_AGE_MS = 180 * 24 * 60 * 60 * 1000;
export type ConsentChoice = "granted" | "denied";
export type ConsentRecord = { choice: ConsentChoice; expiresAt: number };
export type AnalyticsPage = { path: string; title: string };
export type AnalyticsConfig = {
  enabled: boolean;
  measurementId: string;
  production: boolean;
  pages: AnalyticsPage[];
};

const HOSTS = new Set(["grandmasterj.com", "www.grandmasterj.com", "jjsmiley.net", "www.jjsmiley.net"]);
const DENIED = { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" };

export function parseConsent(raw: string | null, now = Date.now()): ConsentRecord | null {
  try {
    const value = JSON.parse(raw || "null");
    if ((value?.choice === "granted" || value?.choice === "denied") &&
      typeof value.expiresAt === "number" && value.expiresAt > now &&
      value.expiresAt <= now + CONSENT_MAX_AGE_MS) return value;
  } catch { /* Block analytics on malformed or unavailable storage. */ }
  return null;
}

export function isConfigured(config: AnalyticsConfig, hostname: string, protocol: string): boolean {
  return config.enabled && config.production && /^G-[A-Z0-9]{5,20}$/.test(config.measurementId) &&
    HOSTS.has(hostname.toLowerCase()) && protocol === "https:";
}

export function publicPage(pathname: string, pages: AnalyticsPage[]): AnalyticsPage | undefined {
  const path = pathname.split(/[?#]/, 1)[0].replace(/\/+$/, "") || "/";
  if (/^\/(studio|admin|api)(\/|$)/i.test(path)) return undefined;
  // An allowlist from checked-in content also prevents arbitrary paths containing PII.
  return pages.find((page) => page.path === path);
}

export type VercelAnalyticsConfig = Pick<AnalyticsConfig, "enabled" | "production" | "pages">;
export type VercelAnalyticsContext = {
  hostname: string;
  protocol: string;
  pathname: string;
  privacySignal: boolean;
};

export function isVercelAnalyticsAllowed(config: VercelAnalyticsConfig, context: VercelAnalyticsContext) {
  return config.enabled && config.production && context.protocol === "https:" &&
    HOSTS.has(context.hostname.toLowerCase()) && !context.privacySignal &&
    !!publicPage(context.pathname, config.pages);
}

/** One filter per pathname navigation; the SDK itself owns pageview emission. */
export function createVercelPageviewFilter(
  config: VercelAnalyticsConfig,
  readContext: () => VercelAnalyticsContext,
  visitPath: string,
) {
  const visit = publicPage(visitPath, config.pages);
  let lastUrl: string | null = null;
  return (event: { type: "pageview" | "event"; url: string }): { type: "pageview"; url: string } | null => {
    try {
      const context = readContext();
      if (event.type !== "pageview" || !isVercelAnalyticsAllowed(config, context)) {
        lastUrl = null;
        return null;
      }
      const url = new URL(event.url);
      const page = publicPage(url.pathname, config.pages);
      const current = publicPage(context.pathname, config.pages);
      if (!page || page.path !== current?.path || page.path !== visit?.path || url.hostname !== context.hostname ||
        url.protocol !== "https:" || url.username || url.password || url.port) return null;
      const sanitized = `https://${context.hostname}${page.path}`;
      if (lastUrl === sanitized) return null; // Includes repeated SDK effects in Strict Mode.
      lastUrl = sanitized;
      // The SDK hook does not expose referrer/device/geo fields. Don't claim to redact them.
      return { type: "pageview", url: sanitized };
    } catch { return null; } // Malformed data/privacy-access errors fail closed.
  };
}

export function hasProviderMessageId(data: unknown): boolean {
  if (!data || typeof data !== "object") return false;
  const response = data as { ok?: unknown; id?: unknown };
  return response.ok === true && typeof response.id === "string" && response.id.trim().length > 0;
}

export type AnalyticsPort = {
  hostname: string;
  protocol: string;
  hasPrivacySignal: () => boolean;
  now: () => number;
  load: (id: string) => Promise<void>;
  command: (...args: unknown[]) => void;
  disable: (id: string, disabled: boolean) => void;
  clearCookies: () => void;
};

export function createAnalytics(config: AnalyticsConfig, port: AnalyticsPort) {
  let consent: ConsentRecord | null = null;
  let pathname = "/";
  let ready = false;
  let loading = false;
  let initialized = false;
  let lastLocation: string | null = null;
  let disposed = false;
  const configured = isConfigured(config, port.hostname, port.protocol);

  function disable(disabled: boolean) {
    try { port.disable(config.measurementId, disabled); }
    catch { /* Optional analytics must never interrupt the site. */ }
  }

  function permitted() {
    try {
      return configured && !disposed && !port.hasPrivacySignal() && consent?.choice === "granted" &&
        consent.expiresAt > port.now();
    } catch { return false; } // Unreadable privacy state fails closed.
  }

  function context() {
    const page = publicPage(pathname, config.pages);
    if (!page) return null;
    return {
      page_location: `https://${port.hostname}${page.path}`,
      page_path: page.path,
      page_title: page.title,
      page_referrer: "",
    };
  }

  function sync() {
    try { syncPermitted(); }
    catch { disable(true); } // A broken/blocked Google tag is nonfatal and fails closed.
  }

  function syncPermitted() {
    const page = context();
    if (!permitted() || !page) {
      disable(true);
      lastLocation = null;
      return;
    }
    if (!ready) {
      disable(true);
      if (!loading) {
        loading = true;
        port.load(config.measurementId).then(() => {
          ready = true;
          loading = false;
          sync(); // Recheck the current route/choice, never replay pre-consent history.
        }).catch(() => { loading = false; });
      }
      return;
    }
    disable(false);
    if (!initialized) {
      port.command("consent", "default", DENIED);
      port.command("consent", "update", { ...DENIED, analytics_storage: "granted" });
      port.command("set", "ads_data_redaction", true);
      port.command("set", "url_passthrough", false);
      port.command("js", new Date(port.now()));
      initialized = true;
    }
    // Update the default context too, so GA's session/engagement events use safe URLs.
    port.command("config", config.measurementId, {
      ...page,
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      ignore_referrer: true,
      cookie_domain: "none",
      cookie_expires: CONSENT_MAX_AGE_MS / 1000,
      cookie_update: false,
      cookie_flags: "SameSite=Lax;Secure",
    });
    if (lastLocation !== page.page_location) {
      port.command("event", "page_view", { ...page, send_to: config.measurementId });
      lastLocation = page.page_location;
    }
  }

  return {
    configured,
    update(path: string, choice: ConsentRecord | null) {
      pathname = path;
      consent = choice;
      if (!permitted()) {
        disable(true);
        try { port.clearCookies(); }
        catch { /* Cookie restrictions must not prevent persisting a declined choice. */ }
      }
      sync();
    },
    contactSent(response: unknown) {
      try {
        if (!hasProviderMessageId(response) || !permitted() || !ready || !initialized) return;
        const page = context();
        if (page?.page_path !== "/contact") return;
        port.command("event", "contact_form_success", { ...page, send_to: config.measurementId });
      } catch { disable(true); } // Measurement is best-effort; sending the contact is not.
    },
    dispose() {
      disposed = true;
      disable(true);
    },
  };
}

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  [key: `ga-disable-${string}`]: boolean;
};

/** Only called after hydration; no browser access during server rendering. */
export function browserAnalyticsPort(): AnalyticsPort {
  const browser = window as unknown as AnalyticsWindow;
  return {
    hostname: window.location.hostname,
    protocol: window.location.protocol,
    hasPrivacySignal: () => {
      try {
        return navigator.doNotTrack === "1" ||
          (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
      } catch { return true; }
    },
    now: () => Date.now(),
    disable: (id, disabled) => { browser[`ga-disable-${id}`] = disabled; },
    command: (...args) => { browser.gtag?.(...args); },
    load: (id) => new Promise<void>((resolve, reject) => {
      browser.dataLayer = browser.dataLayer || [];
      browser.gtag = browser.gtag || function () { browser.dataLayer!.push(arguments); };
      const existing = document.getElementById("portfolio-ga4") as HTMLScriptElement | null;
      if (existing?.dataset.loaded === "true") { resolve(); return; }
      const script = existing || document.createElement("script");
      script.addEventListener("load", () => { script.dataset.loaded = "true"; resolve(); }, { once: true });
      script.addEventListener("error", () => { script.remove(); reject(new Error("Analytics unavailable")); }, { once: true });
      if (!existing) {
        script.id = "portfolio-ga4";
        script.async = true;
        script.referrerPolicy = "no-referrer";
        script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
        document.head.appendChild(script);
      }
    }),
    clearCookies: () => {
      // These are host-only cookies, set with cookie_domain:none above.
      document.cookie.split(";").forEach((cookie) => {
        const name = cookie.trim().split("=", 1)[0];
        if (name === "_ga" || name.startsWith("_ga_")) {
          document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax; Secure`;
        }
      });
    },
  };
}
