"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Fires a GA4 page_view event on every client-side route change.
 * Required for SPA navigation in Next.js App Router — gtag('config') only
 * fires on initial load, so subsequent navigations need this manual event.
 */
export function RouteTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (typeof window.gtag !== "function") return;
    window.gtag("event", "page_view", {
      page_path: pathname,
      page_location: window.location.href,
    });
  }, [pathname]);

  return null;
}
