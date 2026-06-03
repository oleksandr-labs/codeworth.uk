import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildAlternates } from "@/i18n";
import { EXTRAS } from "@/lib/data/extras";
import { getDemoExamples } from "@/lib/data/extras-demos";

// Demo implementations (lazy-loaded per module type)
import { FiltersDemo } from "@/components/extras/demos/FiltersDemo";
import { CalculatorDemo } from "@/components/extras/demos/CalculatorDemo";
import { BookingDemo } from "@/components/extras/demos/BookingDemo";
import { ContactFormDemo } from "@/components/extras/demos/ContactFormDemo";
import { VacancyDemo } from "@/components/extras/demos/VacancyDemo";
import { BlogDemo } from "@/components/extras/demos/BlogDemo";
import { GenericDemo } from "@/components/extras/demos/GenericDemo";
import { AiCopywriterDemo } from "@/components/extras/demos/AiCopywriterDemo";
import { AiVoiceSearchDemo } from "@/components/extras/demos/AiVoiceSearchDemo";
import { AiPriceOptimizerDemo } from "@/components/extras/demos/AiPriceOptimizerDemo";
import { MultiStepFormDemo } from "@/components/extras/demos/MultiStepFormDemo";
import { FloatingChatDemo } from "@/components/extras/demos/FloatingChatDemo";
import { AnnouncementBarDemo } from "@/components/extras/demos/AnnouncementBarDemo";
import { FabClusterDemo } from "@/components/extras/demos/FabClusterDemo";
import { ScrollAnimationsDemo } from "@/components/extras/demos/ScrollAnimationsDemo";
import { CountdownDemo } from "@/components/extras/demos/CountdownDemo";
import { SkillsBarDemo } from "@/components/extras/demos/SkillsBarDemo";
import { I18nSwitcherDemo } from "@/components/extras/demos/I18nSwitcherDemo";
import { CompareDemo } from "@/components/extras/demos/CompareDemo";
import { StickySidebarDemo } from "@/components/extras/demos/StickySidebarDemo";
import { A11yToolbarDemo } from "@/components/extras/demos/A11yToolbarDemo";
import { PrintPdfDemo } from "@/components/extras/demos/PrintPdfDemo";
import { LightboxDemo } from "@/components/extras/demos/LightboxDemo";
import { SliderDemo } from "@/components/extras/demos/SliderDemo";
import { VisualSitemapDemo } from "@/components/extras/demos/VisualSitemapDemo";
import { VideoDemo } from "@/components/extras/demos/VideoDemo";
import { InteractiveMapDemo } from "@/components/extras/demos/InteractiveMapDemo";
import { WebPushDemo } from "@/components/extras/demos/WebPushDemo";
import { VirtualTourDemo } from "@/components/extras/demos/VirtualTourDemo";
import { LiveChatDemo } from "@/components/extras/demos/LiveChatDemo";
import { AnalyticsFunnelDemo } from "@/components/extras/demos/AnalyticsFunnelDemo";
import { MiniShopDemo } from "@/components/extras/demos/MiniShopDemo";
import { InstagramFeedDemo } from "@/components/extras/demos/InstagramFeedDemo";
import { AiChatbotDemo } from "@/components/extras/demos/AiChatbotDemo";
import { SeoArticleDemo } from "@/components/extras/demos/SeoArticleDemo";
import { AnalyticsLookerDemo } from "@/components/extras/demos/AnalyticsLookerDemo";
import { HotjarDemo } from "@/components/extras/demos/HotjarDemo";
import { AbTestDemo } from "@/components/extras/demos/AbTestDemo";
import { EcomWishlistDemo } from "@/components/extras/demos/EcomWishlistDemo";
import { EcomCouponsDemo } from "@/components/extras/demos/EcomCouponsDemo";
import { EcomReviewsDemo } from "@/components/extras/demos/EcomReviewsDemo";
import { EcomLoyaltyDemo } from "@/components/extras/demos/EcomLoyaltyDemo";
import { EcomFlashSaleDemo } from "@/components/extras/demos/EcomFlashSaleDemo";
import { EcomUpsellDemo } from "@/components/extras/demos/EcomUpsellDemo";
import { EcomTrackingDemo } from "@/components/extras/demos/EcomTrackingDemo";
import { EcomGiftCardDemo } from "@/components/extras/demos/EcomGiftCardDemo";
import { EcomProductPageDemo } from "@/components/extras/demos/EcomProductPageDemo";
import { EcomBackInStockDemo } from "@/components/extras/demos/EcomBackInStockDemo";
import { EcomAbandonedCartDemo } from "@/components/extras/demos/EcomAbandonedCartDemo";
import { EcomRecentlyViewedDemo } from "@/components/extras/demos/EcomRecentlyViewedDemo";
import { EcomReturnsDemo } from "@/components/extras/demos/EcomReturnsDemo";
import { EcomInventoryDemo } from "@/components/extras/demos/EcomInventoryDemo";
import { EcomSubscriptionDemo } from "@/components/extras/demos/EcomSubscriptionDemo";
import { EcomInvoiceGenDemo } from "@/components/extras/demos/EcomInvoiceGenDemo";
import { EcomMultivendorDemo } from "@/components/extras/demos/EcomMultivendorDemo";
import { EcomB2bDemo } from "@/components/extras/demos/EcomB2bDemo";
import { IntCrmDemo } from "@/components/extras/demos/IntCrmDemo";
import { MktWelcomeSeriesDemo } from "@/components/extras/demos/MktWelcomeSeriesDemo";
import { EmojiIcon } from "@/components/ui/EmojiIcon";

interface Props {
  params: Promise<{ lang: string; id: string; example: string }>;
}

export async function generateStaticParams() {
  const params: { lang: string; id: string; example: string }[] = [];
  for (const lang of ["en", "uk"]) {
    for (const extra of EXTRAS.filter((e) => e.hasDemo)) {
      const examples = getDemoExamples(extra.id);
      for (const ex of examples) {
        params.push({ lang, id: extra.id, example: ex.id });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, id, example } = await params;
  const isUk = lang === "uk";
  const extra = EXTRAS.find((e) => e.id === id);
  const examples = getDemoExamples(id);
  const ex = examples.find((e) => e.id === example);
  if (!extra || !ex) return {};

  const title = isUk
    ? `Демо: ${isUk ? ex.titleUk : ex.title} — Codeworth`
    : `Demo: ${ex.title} — Codeworth`;
  const description = isUk ? ex.descriptionUk : ex.description;

  return {
    title,
    description,
    alternates: buildAlternates(`/extras/demo/${id}/${example}`),
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://codeworth.uk/${lang}/extras/demo/${id}/${example}`,
    },
  };
}

function getDemoComponent(extraId: string, exampleId: string, lang: string) {
  const isUk = lang === "uk";
  switch (extraId) {
    case "feat-filters":
      return <FiltersDemo variant={exampleId} isUk={isUk} />;
    case "feat-calculator":
      return <CalculatorDemo variant={exampleId} isUk={isUk} />;
    case "feat-booking":
      return <BookingDemo variant={exampleId} isUk={isUk} />;
    case "feat-contact-form":
      return <ContactFormDemo variant={exampleId} isUk={isUk} />;
    case "page-vacancy":
      return <VacancyDemo variant={exampleId} isUk={isUk} />;
    case "page-blog":
      return <BlogDemo variant={exampleId} isUk={isUk} />;
    case "ai-copywriter":
      return <AiCopywriterDemo variant={exampleId} isUk={isUk} />;
    case "ai-voice-search":
      return <AiVoiceSearchDemo variant={exampleId} isUk={isUk} />;
    case "ai-price-optimizer":
      return <AiPriceOptimizerDemo variant={exampleId} isUk={isUk} />;
    case "feat-multistep-form":
      return <MultiStepFormDemo variant={exampleId} isUk={isUk} />;
    case "feat-floating-chat":
      return <FloatingChatDemo variant={exampleId} isUk={isUk} />;
    case "feat-announcement-bar":
      return <AnnouncementBarDemo variant={exampleId} isUk={isUk} />;
    case "feat-fab-cluster":
      return <FabClusterDemo variant={exampleId} isUk={isUk} />;
    case "feat-scroll-animations":
      return <ScrollAnimationsDemo variant={exampleId} isUk={isUk} />;
    case "feat-countdown":
      return <CountdownDemo variant={exampleId} isUk={isUk} />;
    case "feat-skills-bar":
      return <SkillsBarDemo variant={exampleId} isUk={isUk} />;
    case "feat-i18n-switcher":
      return <I18nSwitcherDemo variant={exampleId} isUk={isUk} />;
    case "feat-compare":
      return <CompareDemo variant={exampleId} isUk={isUk} />;
    case "feat-sticky-sidebar":
      return <StickySidebarDemo variant={exampleId} isUk={isUk} />;
    case "feat-a11y-toolbar":
      return <A11yToolbarDemo variant={exampleId} isUk={isUk} />;
    case "feat-print-pdf":
      return <PrintPdfDemo variant={exampleId} isUk={isUk} />;
    case "feat-lightbox":
      return <LightboxDemo variant={exampleId} isUk={isUk} />;
    case "feat-slider":
      return <SliderDemo variant={exampleId} isUk={isUk} />;
    case "feat-visual-sitemap":
      return <VisualSitemapDemo variant={exampleId} isUk={isUk} />;
    case "feat-video":
      return <VideoDemo variant={exampleId} isUk={isUk} />;
    case "feat-interactive-map":
      return <InteractiveMapDemo variant={exampleId} isUk={isUk} />;
    case "feat-web-push":
      return <WebPushDemo variant={exampleId} isUk={isUk} />;
    case "feat-virtual-tour":
      return <VirtualTourDemo variant={exampleId} isUk={isUk} />;
    case "feat-live-chat":
      return <LiveChatDemo variant={exampleId} isUk={isUk} />;
    case "analytics-funnel":
      return <AnalyticsFunnelDemo variant={exampleId} isUk={isUk} />;
    case "ecom-mini-shop":
      return <MiniShopDemo variant={exampleId} isUk={isUk} />;
    case "int-instagram":
      return <InstagramFeedDemo variant={exampleId} isUk={isUk} />;
    case "mkt-ai-chatbot":
      return <AiChatbotDemo variant={exampleId} isUk={isUk} />;
    case "content-seo-article":
      return <SeoArticleDemo variant={exampleId} isUk={isUk} />;
    case "analytics-looker":
      return <AnalyticsLookerDemo variant={exampleId} isUk={isUk} />;
    case "analytics-hotjar":
      return <HotjarDemo variant={exampleId} isUk={isUk} />;
    case "analytics-ab":
      return <AbTestDemo variant={exampleId} isUk={isUk} />;
    case "ecom-wishlist":
      return <EcomWishlistDemo variant={exampleId} isUk={isUk} />;
    case "ecom-coupons":
      return <EcomCouponsDemo variant={exampleId} isUk={isUk} />;
    case "ecom-reviews":
      return <EcomReviewsDemo variant={exampleId} isUk={isUk} />;
    case "ecom-loyalty":
      return <EcomLoyaltyDemo variant={exampleId} isUk={isUk} />;
    case "ecom-flash-sale":
      return <EcomFlashSaleDemo variant={exampleId} isUk={isUk} />;
    case "ecom-upsell-cross-sell":
      return <EcomUpsellDemo variant={exampleId} isUk={isUk} />;
    case "ecom-tracking":
      return <EcomTrackingDemo variant={exampleId} isUk={isUk} />;
    case "ecom-gift-cards":
      return <EcomGiftCardDemo variant={exampleId} isUk={isUk} />;
    case "ecom-product-page":
      return <EcomProductPageDemo variant={exampleId} isUk={isUk} />;
    case "ecom-back-in-stock":
      return <EcomBackInStockDemo variant={exampleId} isUk={isUk} />;
    case "ecom-abandoned-cart":
      return <EcomAbandonedCartDemo variant={exampleId} isUk={isUk} />;
    case "ecom-recently-viewed":
      return <EcomRecentlyViewedDemo variant={exampleId} isUk={isUk} />;
    case "ecom-returns":
      return <EcomReturnsDemo variant={exampleId} isUk={isUk} />;
    case "ecom-inventory":
      return <EcomInventoryDemo variant={exampleId} isUk={isUk} />;
    case "ecom-subscription":
      return <EcomSubscriptionDemo variant={exampleId} isUk={isUk} />;
    case "ecom-invoice-gen":
      return <EcomInvoiceGenDemo variant={exampleId} isUk={isUk} />;
    case "ecom-multivendor":
      return <EcomMultivendorDemo variant={exampleId} isUk={isUk} />;
    case "ecom-b2b":
      return <EcomB2bDemo variant={exampleId} isUk={isUk} />;
    case "int-crm":
      return <IntCrmDemo variant={exampleId} isUk={isUk} />;
    case "mkt-email-welcome-series":
      return <MktWelcomeSeriesDemo variant={exampleId} isUk={isUk} />;
    default:
      return <GenericDemo extraId={extraId} exampleId={exampleId} isUk={isUk} />;
  }
}

export default async function ExtraDemoExamplePage({ params }: Props) {
  const { lang, id, example } = await params;
  const isUk = lang === "uk";
  const extra = EXTRAS.find((e) => e.id === id);
  const examples = getDemoExamples(id);
  const ex = examples.find((e) => e.id === example);
  if (!extra || !extra.hasDemo || !ex) notFound();

  const subject = encodeURIComponent(
    isUk ? `Замовлення: ${extra.title}` : `Order: ${extra.title}`
  );
  const orderHref = `/${lang}/contact?subject=${subject}&extra=${extra.id}`;

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <nav className="border-b border-neutral-100 dark:border-neutral-700 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 flex-wrap">
          <Link href={`/${lang}`} className="hover:text-indigo-600 transition-colors">
            {isUk ? "Головна" : "Home"}
          </Link>
          <span>/</span>
          <Link href={`/${lang}/extras`} className="hover:text-indigo-600 transition-colors">
            {isUk ? "Модулі" : "Add-ons"}
          </Link>
          <span>/</span>
          <Link
            href={`/${lang}/extras/demo/${id}`}
            className="hover:text-indigo-600 transition-colors"
          >
            {extra.title}
          </Link>
          <span>/</span>
          <span className="text-neutral-900 dark:text-white font-medium">
            {isUk ? ex.titleUk : ex.title}
          </span>
        </div>
      </nav>

      {/* Demo header */}
      <header className="border-b border-neutral-100 dark:border-neutral-700 bg-white sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <EmojiIcon emoji={extra.emoji} className="w-6 h-6 text-indigo-500" />
            <div>
              <div className="text-xs text-neutral-400 mb-0.5">
                {isUk ? ex.industryUk : ex.industry}
              </div>
              <h1 className="font-heading font-bold text-neutral-900 dark:text-white text-lg leading-tight">
                {isUk ? ex.titleUk : ex.title}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href={`/${lang}/extras/demo/${id}`}
              className="hidden sm:block text-sm text-neutral-500 dark:text-neutral-400 hover:text-indigo-600 transition-colors"
            >
              ← {isUk ? "Всі приклади" : "All examples"}
            </Link>
            <Link
              href={orderHref}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors"
            >
              {isUk ? "Замовити" : "Order"}
            </Link>
          </div>
        </div>
      </header>

      {/* Demo content */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        {getDemoComponent(id, example, lang)}
      </div>

      {/* Other example CTA */}
      {examples.length > 1 && (
        <section className="border-t border-neutral-100 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 py-12">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="font-heading text-xl font-bold text-neutral-900 dark:text-white mb-6 text-center">
              {isUk ? "Інший приклад цього модуля" : "Another example of this module"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {examples
                .filter((e) => e.id !== example)
                .map((e) => (
                  <Link
                    key={e.id}
                    href={`/${lang}/extras/demo/${id}/${e.id}`}
                    className={`group rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition-all`}
                  >
                    <div
                      className={`h-28 bg-linear-to-br ${e.previewGradient} flex items-center justify-center`}
                    >
                      <span className={`text-sm font-semibold ${e.previewTextColor}`}>
                        {isUk ? e.industryUk : e.industry}
                      </span>
                    </div>
                    <div className="p-4 bg-white">
                      <p className="font-semibold text-neutral-900 dark:text-white text-sm group-hover:text-indigo-700 transition-colors">
                        {isUk ? e.titleUk : e.title}
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
