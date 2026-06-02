"use client";

import { useEffect } from "react";
import { analytics } from "@/lib/analytics";

interface Props {
  event: "pricingView" | "portfolioView" | "blogReadComplete" | "ctaClick";
  slug?: string;
}

export function PageAnalytics({ event, slug }: Props) {
  useEffect(() => {
    switch (event) {
      case "pricingView":
        analytics.pricingView();
        break;
      case "portfolioView":
        if (slug) analytics.portfolioView(slug);
        break;
      case "blogReadComplete":
        // Fire on mount as a "page read started" proxy; full read tracked elsewhere
        if (slug) analytics.blogReadComplete(slug);
        break;
      case "ctaClick":
        break;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
