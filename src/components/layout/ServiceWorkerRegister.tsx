"use client";

import { useEffect } from "react";

export function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

    // Build ID in the URL forces browsers to re-fetch sw.js on each new deploy,
    // which triggers a new SW installation and cache invalidation.
    const buildId = process.env.NEXT_PUBLIC_BUILD_ID ?? "1";
    navigator.serviceWorker
      .register(`/sw.js?v=${buildId}`, { scope: "/" })
      .catch(() => {
        // SW registration failure is non-critical
      });
  }, []);

  return null;
}
