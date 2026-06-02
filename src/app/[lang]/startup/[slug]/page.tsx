import type { Metadata } from "next";
import { buildAlternates } from "@/i18n";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Clock, Target, BarChart2, Layers, ShoppingCart } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import {
  STARTUP_SOLUTIONS,
  STARTUP_CATEGORY_LABELS_EN,
  STARTUP_CATEGORY_LABELS_UK,
  getStartupSolution,
} from "@/lib/data/startup";
import { SaasWaitlistPreview } from "@/components/startup/demos/SaasWaitlistPreview";
import { SaasMvpPreview } from "@/components/startup/demos/SaasMvpPreview";
import { MobileAppPreview } from "@/components/startup/demos/MobileAppPreview";
import { DtcBrandPreview } from "@/components/startup/demos/DtcBrandPreview";
import { NewsletterPreview } from "@/components/startup/demos/NewsletterPreview";
import { SaasB2bPreview } from "@/components/startup/demos/SaasB2bPreview";
import { MarketplaceTwoSidedPreview } from "@/components/startup/demos/MarketplaceTwoSidedPreview";
import { CrowdfundingPreview } from "@/components/startup/demos/CrowdfundingPreview";
import { AiToolPreview } from "@/components/startup/demos/AiToolPreview";
import { FintechAppPreview } from "@/components/startup/demos/FintechAppPreview";
import { EdtechCoursePreview } from "@/components/startup/demos/EdtechCoursePreview";
import { AgencyPortfolioPreview } from "@/components/startup/demos/AgencyPortfolioPreview";
import { CommunityPlatformPreview } from "@/components/startup/demos/CommunityPlatformPreview";
import { ImpactNgoPreview } from "@/components/startup/demos/ImpactNgoPreview";
import { B2bToolLaunchPreview } from "@/components/startup/demos/B2bToolLaunchPreview";

interface Props {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateStaticParams() {
  return STARTUP_SOLUTIONS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const isUk = lang === "uk";
  const solution = getStartupSolution(slug);
  if (!solution) return {};

  const title = isUk
    ? `${solution.title} — Готовий лендінг для стартапу | Codeworth`
    : `${solution.titleEn} — Ready-Made Startup Landing | Codeworth`;
  const description = isUk
    ? `${solution.description} Запуск за ${solution.deliveryDays} дні від £${solution.priceFrom}.`
    : `${solution.descriptionEn} Launch in ${solution.deliveryDays} days from £${solution.priceFrom}.`;

  return {
    title,
    description,
    alternates: buildAlternates(lang, `startup/${slug}`),
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://codeworth.uk/${lang}/startup/${slug}`,
    },
  };
}

const DEMO_COMPONENTS: Record<string, React.ComponentType> = {
  "saas-waitlist":        SaasWaitlistPreview,
  "saas-mvp":             SaasMvpPreview,
  "mobile-app-landing":   MobileAppPreview,
  "dtc-brand":            DtcBrandPreview,
  "newsletter-landing":   NewsletterPreview,
  "saas-b2b":             SaasB2bPreview,
  "marketplace-two-sided": MarketplaceTwoSidedPreview,
  "crowdfunding-landing": CrowdfundingPreview,
  "ai-tool-landing":      AiToolPreview,
  "fintech-app":          FintechAppPreview,
  "edtech-course":        EdtechCoursePreview,
  "agency-portfolio":     AgencyPortfolioPreview,
  "community-platform":   CommunityPlatformPreview,
  "impact-ngo":           ImpactNgoPreview,
  "b2b-tool-launch":      B2bToolLaunchPreview,
};

const PACKAGES_EN = [
  {
    name: "Basic",
    price: "from £299",
    days: "3–5 days",
    includes: ["1-page landing", "Mobile-first design", "Email capture form", "Basic SEO + og:tags", "3 months support"],
  },
  {
    name: "Standard",
    price: "from £499",
    days: "5–7 days",
    includes: ["All Basic features", "A/B test variant", "Google Analytics 4 events", "Zapier/Make integration", "Hotjar heatmap setup", "6 months support"],
    highlight: true,
  },
  {
    name: "Premium",
    price: "from £799",
    days: "7–14 days",
    includes: ["All Standard features", "Custom design system", "3 A/B variants", "Full analytics dashboard", "Email automation", "Priority support 12 mo"],
  },
];

const PACKAGES_UK = [
  {
    name: "Basic",
    price: "від £299",
    days: "3–5 днів",
    includes: ["Лендінг 1 сторінка", "Mobile-first дизайн", "Форма збору email", "Базовий SEO + og:tags", "3 місяці підтримки"],
  },
  {
    name: "Standard",
    price: "від £499",
    days: "5–7 днів",
    includes: ["Все з Basic", "A/B тест варіант", "Google Analytics 4 events", "Інтеграція Zapier/Make", "Hotjar heatmap", "6 місяців підтримки"],
    highlight: true,
  },
  {
    name: "Premium",
    price: "від £799",
    days: "7–14 днів",
    includes: ["Все зі Standard", "Кастомна дизайн-система", "3 A/B варіанти", "Повна аналітична панель", "Email automation", "Пріоритетна підтримка 12 міс"],
  },
];

export default async function StartupSolutionPage({ params }: Props) {
  const { lang, slug } = await params;
  const isUk = lang === "uk";
  const solution = getStartupSolution(slug);
  if (!solution) notFound();

  const lp = (path: string) => `/${lang}${path}`;
  const CATEGORY_LABELS = isUk ? STARTUP_CATEGORY_LABELS_UK : STARTUP_CATEGORY_LABELS_EN;
  const PACKAGES = isUk ? PACKAGES_UK : PACKAGES_EN;

  const DemoComponent = DEMO_COMPONENTS[slug];

  const related = STARTUP_SOLUTIONS.filter(
    (s) => s.slug !== slug && (s.category === solution.category || s.priceFrom <= solution.priceFrom + 200)
  ).slice(0, 3);

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: isUk ? `${solution.title} — Стартап лендінг` : `${solution.titleEn} — Startup Landing`,
    description: isUk ? solution.description : solution.descriptionEn,
    brand: { "@type": "Brand", name: "Codeworth" },
    offers: {
      "@type": "Offer",
      priceCurrency: "GBP",
      price: solution.priceFrom,
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "Codeworth", url: "https://codeworth.uk" },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main id="main-content" className="flex-1">

          {/* Breadcrumb */}
          <div className="bg-white border-b border-neutral-100">
            <Container>
              <div className="py-3 flex items-center gap-2 text-sm text-neutral-500">
                <Link href={lp("/")} className="hover:text-neutral-800 dark:text-neutral-200 transition-colors">{isUk ? "Головна" : "Home"}</Link>
                <span>/</span>
                <Link href={lp("/startup")} className="hover:text-neutral-800 dark:text-neutral-200 transition-colors">
                  {isUk ? "Стартап рішення" : "Startup Solutions"}
                </Link>
                <span>/</span>
                <span className="text-neutral-800 dark:text-neutral-200 font-medium">{solution.titleEn}</span>
              </div>
            </Container>
          </div>

          {/* Hero */}
          <section className="pt-12 pb-10 bg-gradient-to-br from-gray-950 via-indigo-950 to-violet-950 text-white">
            <Container>
              <div className="max-w-3xl mx-auto text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="text-4xl">{solution.icon}</span>
                  <span className="text-xs bg-white/10 border border-white/20 text-white/70 px-3 py-1 rounded-full font-medium">
                    {CATEGORY_LABELS[solution.category]}
                  </span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-heading font-extrabold mb-4 leading-tight">
                  {solution.titleEn}
                </h1>
                <p className={`text-xl font-semibold mb-4`} style={{ color: "#a5b4fc" }}>
                  {isUk ? solution.tagline : solution.taglineEn}
                </p>
                <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                  {isUk ? solution.description : solution.descriptionEn}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href={lp(`/contact?source=startup&slug=${slug}&package=standard`)}
                    className="inline-flex items-center gap-2 bg-white text-gray-900 dark:text-white font-bold px-7 py-3.5 rounded-2xl hover:bg-white/90 transition-colors shadow-lg"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {isUk ? `Замовити від £${solution.priceFrom}` : `Order from £${solution.priceFrom}`}
                  </Link>
                  <div className="flex items-center gap-2 text-white/60 text-sm">
                    <Clock className="w-4 h-4" />
                    {isUk ? `Запуск за ${solution.deliveryDays} дні` : `Launch in ${solution.deliveryDays} days`}
                  </div>
                </div>
              </div>
            </Container>
          </section>

          {/* Demo Preview */}
          {DemoComponent && (
            <section className="py-12 bg-neutral-100 dark:bg-neutral-800 border-b border-neutral-200">
              <Container>
                <div className="text-center mb-6">
                  <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-2">
                    {isUk ? "Жива демо-версія" : "Live Preview"}
                  </p>
                  <h2 className="text-2xl font-heading font-bold text-neutral-900">
                    {isUk ? "Саме так виглядатиме ваш лендінг" : "This is exactly what your landing will look like"}
                  </h2>
                </div>
                <div className="rounded-2xl overflow-hidden border border-neutral-300 shadow-xl bg-white">
                  <DemoComponent />
                </div>
              </Container>
            </section>
          )}

          <div className="py-16">
            <Container>
              <div className="grid lg:grid-cols-3 gap-8">

                {/* Left: main content */}
                <div className="lg:col-span-2 space-y-8">

                  {/* For whom */}
                  <div className="bg-white rounded-2xl border border-neutral-100 dark:border-neutral-700 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                        <Target className="w-4 h-4 text-indigo-600" />
                      </div>
                      <h2 className="font-bold text-neutral-900 dark:text-white text-lg">
                        {isUk ? "Для кого це рішення" : "Who This Is For"}
                      </h2>
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      {isUk ? solution.targetAudience : solution.targetAudienceEn}
                    </p>
                  </div>

                  {/* Hypothesis */}
                  <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xl">🔬</span>
                      <h2 className="font-bold text-amber-900 text-lg">
                        {isUk ? "Яку гіпотезу тестує цей лендінг" : "What Hypothesis This Landing Tests"}
                      </h2>
                    </div>
                    <p className="text-amber-800 leading-relaxed mb-4">
                      {isUk ? solution.hypothesis : solution.hypothesisEn}
                    </p>
                    <div className="flex items-start gap-3 bg-white/70 rounded-xl p-4 border border-amber-200">
                      <BarChart2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-1">
                          {isUk ? "Ключова метрика успіху" : "Key Success Metric"}
                        </div>
                        <div className="text-sm font-semibold text-amber-800">{solution.conversionGoal}</div>
                        <div className="text-xs text-amber-700 mt-1">
                          {isUk ? solution.successMetric : solution.successMetricEn}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sections included */}
                  <div className="bg-white rounded-2xl border border-neutral-100 dark:border-neutral-700 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                        <Layers className="w-4 h-4 text-indigo-600" />
                      </div>
                      <h2 className="font-bold text-neutral-900 dark:text-white text-lg">
                        {isUk ? "Що включено в лендінг" : "What's Included in the Landing"}
                      </h2>
                    </div>
                    <ul className="space-y-2.5">
                      {(isUk ? solution.sections : solution.sectionsEn).map((section, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-neutral-700">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          {section}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {solution.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 rounded-full text-xs font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: pricing sidebar */}
                <div className="space-y-4">
                  {/* Sticky price card */}
                  <div className="sticky top-20">
                    <div className={`rounded-2xl p-6 text-white mb-4 ${solution.color}`}>
                      <div className="text-sm font-medium text-white/80 mb-1">
                        {isUk ? "Ціна від" : "Starting from"}
                      </div>
                      <div className="text-4xl font-extrabold mb-1">£{solution.priceFrom}</div>
                      <div className="text-sm text-white/70 mb-4">
                        {isUk ? `Запуск за ${solution.deliveryDays} дні` : `Launch in ${solution.deliveryDays} days`}
                      </div>
                      <Link
                        href={lp(`/contact?source=startup&slug=${slug}&package=standard`)}
                        className="block w-full text-center bg-white text-gray-900 dark:text-white font-bold py-3 rounded-xl hover:bg-white/90 transition-colors"
                      >
                        {isUk ? "Замовити зараз" : "Order Now"}
                      </Link>
                    </div>

                    <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-700 p-4 text-sm text-neutral-600 dark:text-neutral-300 space-y-2">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-500" />
                        {isUk ? "Безкоштовна консультація" : "Free consultation"}
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-500" />
                        {isUk ? "Відповідь протягом 2 годин" : "Response within 2 hours"}
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-500" />
                        {isUk ? "Mobile-first + SEO" : "Mobile-first + SEO"}
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-500" />
                        {isUk ? "GA4 та analytics setup" : "GA4 & analytics setup"}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </Container>
          </div>

          {/* Packages */}
          <section className="py-16 bg-neutral-50 dark:bg-neutral-900 border-y border-neutral-100">
            <Container>
              <div className="text-center mb-10">
                <h2 className="text-3xl font-heading font-extrabold text-neutral-900">
                  {isUk ? "Оберіть пакет" : "Choose Your Package"}
                </h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {PACKAGES.map((pkg) => (
                  <div
                    key={pkg.name}
                    className={`rounded-2xl p-6 border-2 ${
                      pkg.highlight
                        ? "border-indigo-600 bg-indigo-50"
                        : "border-neutral-200 dark:border-neutral-700 bg-white"
                    }`}
                  >
                    {pkg.highlight && (
                      <div className="text-xs font-bold text-indigo-600 uppercase tracking-wide mb-3">
                        ⭐ {isUk ? "Популярний" : "Most Popular"}
                      </div>
                    )}
                    <div className="font-bold text-neutral-900 dark:text-white text-xl mb-1">{pkg.name}</div>
                    <div className="text-2xl font-extrabold text-neutral-900 dark:text-white mb-0.5">{pkg.price}</div>
                    <div className="text-sm text-neutral-500 dark:text-neutral-400 mb-5 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {pkg.days}
                    </div>
                    <ul className="space-y-2 mb-6">
                      {pkg.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-neutral-700">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={lp(`/contact?source=startup&slug=${slug}&package=${pkg.name.toLowerCase()}`)}
                      className={`block w-full text-center py-2.5 rounded-xl font-semibold text-sm transition-colors ${
                        pkg.highlight
                          ? "bg-indigo-600 text-white hover:bg-indigo-700"
                          : "bg-neutral-900 text-white hover:bg-neutral-800"
                      }`}
                    >
                      {isUk ? "Замовити" : "Order Now"}
                    </Link>
                  </div>
                ))}
              </div>
            </Container>
          </section>

          {/* Related solutions */}
          {related.length > 0 && (
            <section className="py-16 bg-white dark:bg-neutral-950">
              <Container>
                <h2 className="text-2xl font-heading font-bold text-neutral-900 dark:text-white mb-8">
                  {isUk ? "Схожі рішення" : "Related Solutions"}
                </h2>
                <div className="grid sm:grid-cols-3 gap-5">
                  {related.map((s) => (
                    <Link
                      key={s.slug}
                      href={lp(`/startup/${s.slug}`)}
                      className="group flex items-center gap-4 p-4 rounded-2xl border border-neutral-200 dark:border-neutral-700 hover:border-indigo-300 hover:shadow-sm transition-all"
                    >
                      <span className="text-3xl shrink-0">{s.icon}</span>
                      <div className="min-w-0">
                        <div className="font-semibold text-neutral-800 dark:text-neutral-200 group-hover:text-indigo-700 transition-colors truncate text-sm">
                          {s.titleEn}
                        </div>
                        <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                          {isUk ? `від £${s.priceFrom}` : `from £${s.priceFrom}`} · {s.deliveryDays} {isUk ? "днів" : "days"}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-indigo-500 shrink-0 ml-auto transition-colors" />
                    </Link>
                  ))}
                </div>
              </Container>
            </section>
          )}

          {/* Back nav */}
          <div className="py-8 bg-white dark:bg-neutral-800 border-t border-neutral-100">
            <Container>
              <Link
                href={lp("/startup")}
                className="inline-flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 hover:text-indigo-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                {isUk ? "Всі стартап-рішення" : "All Startup Solutions"}
              </Link>
            </Container>
          </div>

        </main>
        <Footer />
      </div>
    </>
  );
}
