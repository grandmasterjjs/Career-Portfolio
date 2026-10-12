"use client";

import { Analytics } from "@vercel/analytics/react";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  VercelAnalyticsConfig, browserAnalyticsPort, createVercelPageviewFilter,
  isVercelAnalyticsAllowed, publicPage,
} from "@/lib/analytics";

function browserContext() {
  return {
    hostname: window.location.hostname,
    protocol: window.location.protocol,
    pathname: window.location.pathname,
    privacySignal: browserAnalyticsPort().hasPrivacySignal(),
  };
}

export function VercelPageViews({ config }: { config: VercelAnalyticsConfig }) {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [restoreEpoch, setRestoreEpoch] = useState(0);
  const configKey = JSON.stringify(config);
  const stableConfig = useMemo(() => JSON.parse(configKey) as VercelAnalyticsConfig, [configKey]);
  const visit = useMemo(() => ({
    beforeSend: createVercelPageviewFilter(stableConfig, browserContext, pathname),
    key: restoreEpoch,
  }), [stableConfig, pathname, restoreEpoch]);

  useEffect(() => {
    setReady(true);
    function onPageShow(event: PageTransitionEvent) {
      if (event.persisted) setRestoreEpoch((epoch) => epoch + 1);
    }
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);
  if (!ready || !isVercelAnalyticsAllowed(stableConfig, browserContext())) return null;
  const page = publicPage(pathname, stableConfig.pages);
  if (!page) return null;

  // The Next SDK can derive route labels from query-parameter names. Supplying both
  // trusted path/route to the official React SDK prevents that separate field leaking them.
  // A defined route makes the SDK disable its history auto-tracker; don't add manual events.
  return <Analytics key={visit.key} route={page.path} path={page.path} beforeSend={visit.beforeSend} mode="production" debug={false} />;
}
