"use client";

import Link from "next/link";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  AnalyticsConfig, ConsentChoice, ConsentRecord, CONSENT_KEY, CONSENT_MAX_AGE_MS,
  browserAnalyticsPort, createAnalytics, parseConsent, publicPage,
} from "@/lib/analytics";

const AnalyticsContext = createContext({
  openSettings: () => {},
  contactSent: (_response: unknown) => {},
});

export function useContactAnalytics() {
  return useContext(AnalyticsContext).contactSent;
}

export function AnalyticsSettings() {
  const { openSettings } = useContext(AnalyticsContext);
  return <button type="button" onClick={openSettings} className="underline underline-offset-4 hover:text-ember-500">Google Analytics preferences</button>;
}

function readChoice() {
  try { return parseConsent(window.localStorage.getItem(CONSENT_KEY)); }
  catch { return null; }
}

export function AnalyticsProvider({ config, children }: { config: AnalyticsConfig; children: React.ReactNode }) {
  const pathname = usePathname();
  const configKey = JSON.stringify(config);
  const stableConfig = useMemo(() => JSON.parse(configKey) as AnalyticsConfig, [configKey]);
  const analytics = useRef<ReturnType<typeof createAnalytics> | null>(null);
  // A failed withdrawal write must never let a stale saved grant re-enable this tab.
  // undefined means storage is authoritative; null means an expired local denial.
  const failedWithdrawal = useRef<ConsentRecord | null | undefined>(undefined);
  const readCurrentChoice = useCallback(() => {
    if (failedWithdrawal.current === undefined) return readChoice();
    if (failedWithdrawal.current && failedWithdrawal.current.expiresAt <= Date.now()) {
      failedWithdrawal.current = null;
    }
    return failedWithdrawal.current;
  }, []);
  const [choice, setChoice] = useState<ConsentRecord | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [privacySignal, setPrivacySignal] = useState(false);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const onPublicPage = !!publicPage(pathname, config.pages);

  useEffect(() => {
    const port = browserAnalyticsPort();
    analytics.current = createAnalytics(stableConfig, port);
    setEnabled(analytics.current.configured);
    setPrivacySignal(port.hasPrivacySignal());
    setChoice(readCurrentChoice());
    setReady(true);
    return () => { analytics.current?.dispose(); analytics.current = null; };
  }, [stableConfig, readCurrentChoice]);

  useEffect(() => {
    if (ready) analytics.current?.update(pathname, choice);
  }, [pathname, choice, ready]);

  useEffect(() => {
    function refresh() {
      const next = readCurrentChoice();
      // update() rereads live DNT/GPC and disables the running tag, not just the UI.
      analytics.current?.update(pathname, next);
      setPrivacySignal(browserAnalyticsPort().hasPrivacySignal());
      setChoice(next);
    }
    function onStorage(event: StorageEvent) {
      if (event.key === CONSENT_KEY || event.key === null) refresh();
    }
    window.addEventListener("storage", onStorage);
    window.addEventListener("pageshow", refresh);
    window.addEventListener("focus", refresh);
    const timeout = choice ? window.setTimeout(refresh, Math.min(2_147_483_647, Math.max(0, choice.expiresAt - Date.now()))) : undefined;
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("pageshow", refresh);
      window.removeEventListener("focus", refresh);
      window.clearTimeout(timeout);
    };
  }, [pathname, choice, readCurrentChoice]);

  function choose(value: ConsentChoice) {
    const next = { choice: value, expiresAt: Date.now() + CONSENT_MAX_AGE_MS };
    // Stop collection synchronously on withdrawal, before React updates the banner.
    analytics.current?.update(pathname, next);
    // Only a new explicit choice can replace an in-memory withdrawal override.
    failedWithdrawal.current = undefined;
    try { window.localStorage.setItem(CONSENT_KEY, JSON.stringify(next)); }
    catch {
      if (value === "denied") {
        failedWithdrawal.current = next;
        try { window.localStorage.removeItem(CONSENT_KEY); }
        catch { /* The in-memory denial stays authoritative even if removal fails. */ }
      }
    }
    setChoice(next);
    setOpen(false);
  }

  const show = ready && (open || (onPublicPage && enabled && !privacySignal && !choice));
  return (
    <AnalyticsContext.Provider value={{
      openSettings: () => setOpen(true),
      contactSent: (response) => analytics.current?.contactSent(response),
    }}>
      {children}
      {show && (
        <section aria-label="Google Analytics preferences" className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-2xl rounded-2xl border border-ink-300 bg-paper p-5 text-ink-900 shadow-xl dark:border-ink-600 dark:bg-ink-900 dark:text-paper-100 sm:p-6">
          <h2 className="font-display text-lg font-semibold">Optional Google Analytics</h2>
          {enabled ? (
            <p className="mt-2 text-sm leading-relaxed">
              With your permission, Google Analytics uses cookies to measure visits, pages viewed,
              and provider-accepted contact submissions. Your name, email, and message are never sent to it.
              You can change your Google Analytics choice here anytime.
            </p>
          ) : (
            <p className="mt-2 text-sm leading-relaxed">Google Analytics is disabled on this site environment. No Google Analytics tag is loaded.</p>
          )}
          <p className="mt-3 text-sm leading-relaxed">
            The production site uses separate cookieless Vercel pageview counts. These Google Analytics
            preferences do not control that baseline. Both respect your browser&apos;s Global Privacy Control
            or Do Not Track signal. <Link href="/privacy" className="underline underline-offset-4">Privacy details</Link>
          </p>
          {privacySignal && <p className="mt-3 text-sm">Your browser&apos;s privacy signal is respected. Analytics collection remains off.</p>}
          <div className="mt-4 flex flex-wrap gap-3">
            {enabled && <button type="button" onClick={() => choose("denied")} className="rounded-full border border-ink-400 px-5 py-2 text-sm font-medium hover:border-ember-500">Decline Google Analytics</button>}
            {enabled && !privacySignal && <button type="button" onClick={() => choose("granted")} className="rounded-full border border-ink-400 px-5 py-2 text-sm font-medium hover:border-ember-500">Accept Google Analytics</button>}
            {(choice || !enabled || privacySignal) && <button type="button" onClick={() => setOpen(false)} className="rounded-full px-4 py-2 text-sm underline underline-offset-4">Close</button>}
          </div>
        </section>
      )}
    </AnalyticsContext.Provider>
  );
}
