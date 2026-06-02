"use client";

import Script from "next/script";
import { useState, useEffect } from "react";

const COOKIE_KEY = "Codeworth_cookie_consent";

interface Props {
  gaId?: string;
  fbPixelId?: string;
  googleAdsId?: string;
}

export function AnalyticsScripts({ gaId, fbPixelId, googleAdsId }: Props) {
  const [consent, setConsent] = useState<{ analytics: boolean; marketing: boolean } | null>(null);

  useEffect(() => {
    const read = () => {
      try {
        const raw = localStorage.getItem(COOKIE_KEY);
        if (raw) {
          const { analytics = false, marketing = false } = JSON.parse(raw);
          setConsent({ analytics: !!analytics, marketing: !!marketing });
        }
      } catch {
        // localStorage unavailable — keep null (no scripts loaded)
      }
    };
    read();
    window.addEventListener("cookieConsentUpdate", read);
    return () => window.removeEventListener("cookieConsentUpdate", read);
  }, []);

  // No consent recorded yet — wait for CookieConsent decision
  if (!consent) return null;

  return (
    <>
      {/* Google Analytics 4 — analytics consent required */}
      {gaId && consent.analytics && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', { page_path: window.location.pathname });
            `}
          </Script>
        </>
      )}

      {/* Facebook Meta Pixel — marketing consent required */}
      {fbPixelId && consent.marketing && (
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${fbPixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}

      {/* Google Ads — marketing consent required */}
      {googleAdsId && consent.marketing && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAdsId}`}
            strategy="afterInteractive"
          />
          <Script id="google-ads-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleAdsId}');
            `}
          </Script>
        </>
      )}
    </>
  );
}
