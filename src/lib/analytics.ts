declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function sendEvent(event: string, params: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", event, params);
}

export const analytics = {
  leadFormSubmit(service?: string, budget?: string) {
    sendEvent("lead_form_submit", { service: service ?? "", budget: budget ?? "" });
  },

  ctaClick(label: string, location = "") {
    sendEvent("cta_click", { cta_label: label, cta_location: location });
  },

  marketplacePurchase(nicheSlug: string, value: number, currency: string) {
    sendEvent("marketplace_purchase", { niche_slug: nicheSlug, value, currency });
  },

  marketplaceViewItem(nicheSlug: string) {
    sendEvent("marketplace_view_item", { niche_slug: nicheSlug });
  },

  portfolioView(slug: string) {
    sendEvent("portfolio_view", { portfolio_slug: slug });
  },

  pricingView() {
    sendEvent("pricing_view");
  },

  languageSwitch(from: string, to: string) {
    sendEvent("language_switch", { from_lang: from, to_lang: to });
  },

  blogReadComplete(slug: string) {
    sendEvent("blog_read_complete", { blog_slug: slug });
  },
};
