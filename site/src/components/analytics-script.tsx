"use client";
import { useEffect, useState } from "react";
import Script from "next/script";
import { analytics, optedOut } from "@/lib/analytics";

/** Loads the configured analytics script, for visitors who have not opted out. */
export function AnalyticsScript() {
  const [allowed, setAllowed] = useState(false);
  useEffect(() => setAllowed(!optedOut()), []);
  if (!allowed) return null;
  if (analytics.umami) {
    return <Script src={analytics.umami.src} data-website-id={analytics.umami.id} data-do-not-track="true" data-exclude-search="true" data-exclude-hash="true" strategy="afterInteractive" />;
  }
  if (analytics.plausible) {
    return <Script src={analytics.plausible.src} data-domain={analytics.plausible.domain} strategy="afterInteractive" />;
  }
  return null;
}
