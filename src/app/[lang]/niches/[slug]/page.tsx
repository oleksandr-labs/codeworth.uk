import type { Metadata } from "next";
import { buildAlternates } from "@/i18n";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, Clock, Layers, ArrowRight, Star, ChevronRight, Tag, X, ShoppingCart, Package, Sparkles } from "lucide-react";
import { NICHES_DATA, getNiche, getNicheLocalized, COMPLEXITY_LABELS_NICHE } from "@/lib/data/niches";
import { BLOG_POSTS } from "@/lib/data/blog";
import { PROJECTS } from "@/lib/data/portfolio";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { NicheStats } from "@/components/niches/NicheStats";
import { NicheReviews } from "@/components/niches/NicheReviews";
import { BookingSection } from "@/components/niches/BookingSection";
import { NicheCalculator } from "@/components/niches/NicheCalculator";
import { PropertyFilter } from "@/components/niches/PropertyFilter";
import { PricingToggle } from "@/components/niches/PricingToggle";
import { BMICalculator } from "@/components/niches/BMICalculator";
import { MenuFilter } from "@/components/niches/MenuFilter";
import { ProductCatalog } from "@/components/niches/ProductCatalog";
import { CourseFilter } from "@/components/niches/CourseFilter";
import { ScheduleFilter } from "@/components/niches/ScheduleFilter";
import { CustomizerPanel } from "@/components/customizer/CustomizerPanel";

export async function generateStaticParams() {
  return NICHES_DATA.map((niche) => ({ slug: niche.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const niche = getNicheLocalized(slug, lang);
  if (!niche) return {};
  const title = niche.titleSeo ?? niche.title;
  const ogImage = `/og/niches/${niche.slug}.png`;
  return {
    title,
    description: niche.metaDescription,
    keywords: niche.tags,
    alternates: buildAlternates(lang, `niches/${niche.slug}`),
    openGraph: {
      title,
      description: niche.metaDescription,
      type: "website",
      url: `https://codenest.com.ua/${lang}/niches/${niche.slug}`,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: niche.metaDescription,
      images: [ogImage],
    },
  };
}

export default async function NichePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const isUk = lang === "uk";
  const niche = getNicheLocalized(slug, lang);
  if (!niche) notFound();

  const rawNiche = getNiche(slug)!;

  // AI/ML cross-link suggestions for niches that have corresponding AI/ML hubs
  const NICHE_AI_ML: Record<string, { label: string; labelUk: string; href: string; type: "ai" | "ml" }[]> = {
    "medical": [{ label: "AI for Healthcare", labelUk: "AI для медицини", href: "/ai/healthcare", type: "ai" }],
    "realestate": [
      { label: "AI for Real Estate", labelUk: "AI для нерухомості", href: "/ai/real-estate", type: "ai" },
      { label: "ML Property Valuation", labelUk: "ML оцінка нерухомості", href: "/ml/real-estate", type: "ml" },
    ],
    "fitness": [{ label: "AI for HR & Coaching", labelUk: "AI для HR та коучингу", href: "/ai/hr", type: "ai" }],
    "saas": [{ label: "ML for SaaS (Churn Prediction)", labelUk: "ML для SaaS (відтік клієнтів)", href: "/ml/saas", type: "ml" }],
    "logistics": [{ label: "ML for Logistics", labelUk: "ML для логістики", href: "/ml/logistics", type: "ml" }],
    "construction": [{ label: "ML for Manufacturing", labelUk: "ML для виробництва", href: "/ml/manufacturing", type: "ml" }],
    "agriculture": [{ label: "ML for AgriTech", labelUk: "ML для агробізнесу", href: "/ml/agritech", type: "ml" }],
    "law": [{ label: "AI for Legal", labelUk: "AI для юристів", href: "/ai/legal", type: "ai" }],
    "education": [{ label: "AI for Education", labelUk: "AI для освіти", href: "/ai/education", type: "ai" }],
    "events": [{ label: "AI for Hospitality", labelUk: "AI для готельного бізнесу", href: "/ai/hospitality", type: "ai" }],
    "travel": [{ label: "AI for Hospitality", labelUk: "AI для готельного бізнесу", href: "/ai/hospitality", type: "ai" }],
  };
  const aiMlLinks = NICHE_AI_ML[slug] ?? null;

  const relatedNiches = NICHES_DATA.filter(
    (n) => n.slug !== rawNiche.slug && n.category === rawNiche.category
  ).slice(0, 3).map((n) => getNicheLocalized(n.slug, lang) ?? n);

  const otherNiches =
    relatedNiches.length < 3
      ? [
          ...relatedNiches,
          ...NICHES_DATA.filter(
            (n) => n.slug !== niche.slug && n.category !== niche.category
          ).slice(0, 3 - relatedNiches.length).map((n) => getNicheLocalized(n.slug, lang) ?? n),
        ]
      : relatedNiches;

  // Portfolio case for this niche
  const portfolioCase = PROJECTS.find((p) => p.nicheSlug === niche.slug) ?? null;

  // Related blog posts: niche-specific first, then by tag overlap
  const nicheTags = niche.tags.map((t) => t.toLowerCase());
  const relatedPosts = BLOG_POSTS.filter((p) => {
    if (p.nicheSlug === niche.slug) return true;
    return p.tags.some((t) => nicheTags.includes(t.toLowerCase()));
  }).slice(0, 3);

  const complexityColor = {
    simple: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400",
    medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
    complex: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
  }[niche.complexity];

  // Auto-generated FAQ from niche data
  const faqItems = isUk
    ? [
        {
          q: `Скільки коштує сайт для ${niche.title.toLowerCase()}?`,
          a: `Вартість стартує від ${niche.priceFrom.toLocaleString("uk-UA")} грн за базовий пакет. Точна ціна залежить від обсягу кастомізації, кількості сторінок та необхідних інтеграцій. Залиште заявку — розрахуємо безкоштовно.`,
        },
        {
          q: "Скільки часу займе розробка?",
          a: `Базовий варіант — від ${niche.deliveryDays} робочих днів після затвердження дизайну. Терміни залежать від обраного пакету: чим більше кастомізації, тим більше часу. Але навіть складні варіанти ми здаємо вчасно.`,
        },
        {
          q: "Чи можна кастомізувати дизайн під мій бренд?",
          a: "Так. Ми адаптуємо кольори, шрифти, логотип, контент та структуру сторінок під ваш бізнес. Готове рішення — це стартова точка, а не шаблон-коробка.",
        },
        {
          q: "Що входить у готове рішення?",
          a: `До складу входять: ${niche.features.slice(0, 3).join(", ")} — та ще більше. Повний список уточнюється під час консультації.`,
        },
        {
          q: "Чи буде сайт оптимізований для Google?",
          a: "Так. Всі рішення CodeNest мають вбудовану SEO-оптимізацію: Title, Description, Schema.org розмітку, швидке завантаження (LCP < 2.5с) та адаптивний дизайн — що саме те, що любить Google.",
        },
        ...(niche.nicheFaq ?? []),
      ]
    : [
        {
          q: `How much does a website for ${niche.title.toLowerCase()} cost?`,
          a: `Price starts from $${niche.priceFrom} for the basic package. The exact price depends on the level of customization, number of pages, and required integrations. Leave a request — we'll calculate it for free.`,
        },
        {
          q: "How long does development take?",
          a: `The basic option takes from ${niche.deliveryDays} business days after design approval. Timelines depend on the chosen package: the more customization, the more time. But even complex options are delivered on time.`,
        },
        {
          q: "Can the design be customized to my brand?",
          a: "Yes. We adapt colors, fonts, logo, content, and page structure to your business. The ready-made solution is a starting point, not a boxed template.",
        },
        {
          q: "What's included in the ready-made solution?",
          a: `Included: ${niche.features.slice(0, 3).join(", ")} — and more. The full list is clarified during consultation.`,
        },
        {
          q: "Will the website be optimized for Google?",
          a: "Yes. All CodeNest solutions have built-in SEO: Title, Description, Schema.org markup, fast loading (LCP < 2.5s), and responsive design — exactly what Google loves.",
        },
        ...(niche.nicheFaq ?? []),
      ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isUk ? "Головна" : "Home", item: `https://codenest.com.ua/${lang}` },
      { "@type": "ListItem", position: 2, name: isUk ? "Рішення" : "Solutions", item: `https://codenest.com.ua/${lang}/niches` },
      { "@type": "ListItem", position: 3, name: niche.title },
    ],
  };

  // Schema.org: Product (for CodeNest offer) + LocalBusiness/AutoRepair/Bakery (for demo business)
  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: niche.title,
    description: niche.metaDescription,
    url: `https://codenest.com.ua/niches/${niche.slug}`,
    image: `https://codenest.com.ua/og/${niche.slug}.png`,
    offers: {
      "@type": "Offer",
      price: niche.priceFrom,
      priceCurrency: "UAH",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "CodeNest", url: "https://codenest.com.ua" },
    },
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "200" },
    brand: { "@type": "Brand", name: "CodeNest" },
  };

  // LocalBusiness schema for the demo niche type
  const businessLd = {
    "@context": "https://schema.org",
    "@type": niche.schemaType ?? "LocalBusiness",
    name: niche.title,
    description: niche.metaDescription,
    image: `https://codenest.com.ua/og/${niche.slug}.png`,
    url: `https://codenest.com.ua/niches/${niche.slug}`,
    priceRange: `від ${niche.priceFrom.toLocaleString("uk-UA")} ₴`,
    areaServed: { "@type": "Country", name: "Ukraine" },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />
      <main id="main-content" className="flex-1">
        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section
          className={`relative bg-linear-to-br ${niche.gradient} text-white py-20 md:py-28 overflow-hidden`}
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white/20 blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
          </div>
          <Container className="relative z-10">
            {/* Live demo notice */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white/90 text-sm mb-6">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300 shrink-0" />
              {isUk
                ? "Це живий демо-сайт — саме так виглядатиме ваш сайт після замовлення"
                : "This is a live demo — this is exactly how your site will look after ordering"}
            </div>
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-white/70 mb-8">
              <Link href={`/${lang}`} className="hover:text-white transition-colors">
                {isUk ? "Головна" : "Home"}
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link href={`/${lang}/niches`} className="hover:text-white transition-colors">
                {isUk ? "Рішення" : "Solutions"}
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">{niche.title}</span>
            </nav>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-5xl">{niche.emoji}</span>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white">
                    {niche.category}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold font-syne leading-tight mb-4">
                  {niche.heroTitle ?? niche.title}
                </h1>
                <p className="text-xl text-white/80 mb-8 leading-relaxed">
                  {niche.description}
                </p>
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="flex items-center gap-2 bg-white/20 rounded-xl px-4 py-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {isUk ? `від ${niche.deliveryDays} днів` : `from ${niche.deliveryDays} days`}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/20 rounded-xl px-4 py-2">
                    <Star className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {isUk ? `від ${niche.priceFrom.toLocaleString("uk-UA")} грн` : `from $${niche.priceFrom}`}
                    </span>
                  </div>
                  <div className={`flex items-center gap-2 rounded-xl px-4 py-2 ${complexityColor}`}>
                    <Layers className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {COMPLEXITY_LABELS_NICHE[niche.complexity]}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button href={`/${lang}/contact`} variant="secondary" size="lg">
                    {niche.ctaPrimary ?? (isUk ? "Замовити цей сайт" : "Order This Website")}
                  </Button>
                  <Button
                    href={`/${lang}/marketplace`}
                    variant="outline"
                    size="lg"
                    className="border-white/50 text-white hover:bg-white/10"
                  >
                    {isUk ? "Усі рішення" : "All Solutions"}
                  </Button>
                </div>
              </div>

              {/* Demo preview card */}
              <div className="hidden md:block">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                    <div className="flex-1 bg-white/20 rounded-full h-5 ml-2 flex items-center px-3">
                      <span className="text-white/60 text-xs">
                        codenest.com.ua/niches/{niche.slug}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-white/20 rounded-lg h-32 flex items-center justify-center text-4xl">
                      {niche.emoji}
                    </div>
                    <div className="bg-white/10 rounded h-4 w-3/4" />
                    <div className="bg-white/10 rounded h-3 w-full" />
                    <div className="bg-white/10 rounded h-3 w-5/6" />
                    <div className="grid grid-cols-3 gap-2 mt-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white/10 rounded-lg h-16" />
                      ))}
                    </div>
                    <div className="bg-white/30 rounded-lg h-10 mt-2" />
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* ── Stats ─────────────────────────────────────────────────────────── */}
        <section className="py-16 bg-neutral-50 dark:bg-neutral-900/80">
          <Container>
            <NicheStats color={niche.color} />
          </Container>
        </section>

        {/* ── Trust Stats ───────────────────────────────────────────────────── */}
        {niche.trustStats && niche.trustStats.length > 0 && (
          <section className="py-12 bg-white dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800">
            <Container>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {niche.trustStats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-3xl mb-2">{stat.icon}</div>
                    <div className="text-2xl md:text-3xl font-bold font-syne text-neutral-900 dark:text-white mb-1" style={{ color: niche.color }}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-neutral-500 dark:text-neutral-400 leading-snug">{stat.label}</div>
                  </div>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* ── Process Steps ─────────────────────────────────────────────────── */}
        {niche.processSteps && niche.processSteps.length > 0 && (
          <section className="py-20 bg-neutral-50 dark:bg-neutral-800/40">
            <Container>
              <div className="text-center mb-14">
                <h2 className="text-3xl font-bold font-syne text-neutral-900 dark:text-white mb-4">
                  {isUk ? "Як це працює" : "How It Works"}
                </h2>
                <p className="text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
                  {isUk ? "Прозорий процес — від першого звернення до результату" : "Transparent process — from first contact to result"}
                </p>
              </div>
              <div className="relative max-w-4xl mx-auto">
                {/* Connector line */}
                <div className="hidden md:block absolute top-10 left-[calc(100%/10)] right-[calc(100%/10)] h-0.5 bg-neutral-200 dark:bg-neutral-700" />
                <div className={`grid gap-6 ${niche.processSteps.length <= 3 ? "md:grid-cols-3" : niche.processSteps.length === 4 ? "md:grid-cols-4" : "md:grid-cols-5"}`}>
                  {niche.processSteps.map((step, idx) => (
                    <div key={step.title} className="relative flex flex-col items-center text-center group">
                      {/* Step number + icon */}
                      <div
                        className="relative w-20 h-20 rounded-2xl flex flex-col items-center justify-center mb-4 text-2xl shadow-sm border-2 bg-white dark:bg-neutral-800 transition-transform group-hover:-translate-y-1"
                        style={{ borderColor: niche.color + "40" }}
                      >
                        <span className="leading-none">{step.icon}</span>
                        <span
                          className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center"
                          style={{ backgroundColor: niche.color }}
                        >
                          {idx + 1}
                        </span>
                      </div>
                      <h3 className="font-bold text-sm text-neutral-900 dark:text-white mb-1 leading-snug">
                        {step.title}
                      </h3>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed mb-2">
                        {step.description}
                      </p>
                      {step.duration && (
                        <span
                          className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
                          style={{ backgroundColor: niche.color + "15", color: niche.color }}
                        >
                          <Clock className="w-3 h-3" />
                          {step.duration}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Container>
          </section>
        )}

        {/* ── Highlights ────────────────────────────────────────────────────── */}
        {niche.highlights && niche.highlights.length > 0 && (
          <section className="py-16 bg-white dark:bg-neutral-900">
            <Container>
              <div className="grid md:grid-cols-3 gap-8">
                {niche.highlights.map((h) => (
                  <div
                    key={h.title}
                    className="text-center p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-100 dark:border-neutral-700/50"
                  >
                    <div className="text-4xl mb-4">{h.icon}</div>
                    <h3 className="text-lg font-bold font-syne text-neutral-900 dark:text-white mb-2">
                      {h.title}
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {h.description}
                    </p>
                  </div>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* ── Property Listings ─────────────────────────────────────────────── */}
        {niche.propertyListings && niche.propertyListings.length > 0 && (
          <section className="py-20 bg-neutral-50 dark:bg-neutral-800/40">
            <Container>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-syne text-neutral-900 dark:text-white mb-4">
                  {isUk ? "Актуальні об'єкти" : "Current Listings"}
                </h2>
                <p className="text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
                  {isUk ? "Демо-приклади карток нерухомості. У вашому сайті — реальна база з фільтрами та пошуком." : "Demo property cards. Your site will have a real database with filters and search."}
                </p>
              </div>
              <PropertyFilter listings={niche.propertyListings} lang={lang} color={niche.color} />
            </Container>
          </section>
        )}

        {/* ── Menu Items ────────────────────────────────────────────────────── */}
        {niche.menuItems && niche.menuItems.length > 0 && (
          <section className="py-20 bg-neutral-50 dark:bg-neutral-800/40">
            <Container>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-syne text-neutral-900 dark:text-white mb-4">
                  {isUk ? "Меню закладу" : "Venue Menu"}
                </h2>
                <p className="text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
                  {isUk ? "Демо-приклади карток меню. У вашому сайті — повний каталог із фільтрами, пошуком та фото страв." : "Demo menu cards. Your site will have a full catalog with filters, search, and dish photos."}
                </p>
              </div>
              <MenuFilter items={niche.menuItems} lang={lang} color={niche.color} />
            </Container>
          </section>
        )}

        {/* ── Product Catalog ───────────────────────────────────────────────── */}
        {niche.productCards && niche.productCards.length > 0 && (
          <section className="py-20 bg-white dark:bg-neutral-900">
            <Container>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-syne text-neutral-900 dark:text-white mb-4">
                  {niche.catalogHeading ?? "Нова колекція"}
                </h2>
                <p className="text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
                  {niche.catalogSubtitle ?? "Демо-приклади карток товарів. У вашому магазині — повний каталог із фільтрами, розмірами, фото та швидким замовленням."}
                </p>
              </div>
              <ProductCatalog products={niche.productCards} lang={lang} color={niche.color} />
            </Container>
          </section>
        )}

        {/* ── Tech Products ─────────────────────────────────────────────────── */}
        {niche.techProducts && niche.techProducts.length > 0 && (
          <section className="py-20 bg-neutral-50 dark:bg-neutral-800/40">
            <Container>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-syne text-neutral-900 dark:text-white mb-4">
                  {isUk ? "Популярні товари" : "Popular Products"}
                </h2>
                <p className="text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
                  {isUk ? "Демо-приклади карток техніки. У вашому магазині — повний каталог із характеристиками, порівнянням та розстрочкою." : "Demo tech product cards. Your store will have a full catalog with specs, comparisons, and installment options."}
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {niche.techProducts.map((item) => (
                  <div
                    key={item.id}
                    className="group flex flex-col bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-700/50 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all"
                  >
                    {/* Gradient header */}
                    <div className={`relative h-36 bg-linear-to-br ${item.gradient} flex items-center justify-center`}>
                      <span className="text-6xl opacity-90">{item.icon}</span>
                      {item.badge && (
                        <span className={`absolute top-2 left-2 ${item.badgeColor ?? "bg-neutral-700"} text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full`}>
                          {item.badge}
                        </span>
                      )}
                      <span className="absolute top-2 right-2 bg-black/40 text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
                        {item.category}
                      </span>
                    </div>

                    <div className="flex flex-col flex-1 p-4">
                      <p className="text-[10px] text-neutral-400 dark:text-neutral-500 font-medium uppercase tracking-wide mb-0.5">
                        {item.brand}
                      </p>
                      <h3 className="font-semibold text-sm text-neutral-900 dark:text-white mb-3 leading-snug">
                        {item.name}
                      </h3>

                      {/* Specs */}
                      <ul className="space-y-1 mb-3 flex-1">
                        {item.specs.map((spec) => (
                          <li key={spec} className="flex items-start gap-1.5 text-[11px] text-neutral-500 dark:text-neutral-400">
                            <span className="mt-0.5 shrink-0 text-[8px]" style={{ color: niche.color }}>●</span>
                            {spec}
                          </li>
                        ))}
                      </ul>

                      {/* Tags */}
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {item.tags.map((tag) => (
                            <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="mt-auto flex items-center justify-between gap-2">
                        <div className="flex flex-col">
                          <span className="text-base font-bold font-syne" style={{ color: niche.color }}>
                            {item.price}
                          </span>
                          {item.originalPrice && (
                            <span className="text-xs text-neutral-400 line-through">
                              {item.originalPrice}
                            </span>
                          )}
                        </div>
                        <Link
                          href={`/${lang}/contact`}
                          className="text-[11px] font-semibold px-3 py-1.5 rounded-lg border transition-colors shrink-0"
                          style={{ borderColor: niche.color, color: niche.color }}
                        >
                          {isUk ? "Купити" : "Buy"}
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-10">
                <Button href={`/${lang}/contact`} variant="primary" size="md">
                  {isUk ? "Переглянути весь каталог" : "View Full Catalog"}
                </Button>
              </div>
            </Container>
          </section>
        )}

        {/* ── Course Catalog ────────────────────────────────────────────────── */}
        {niche.courseCards && niche.courseCards.length > 0 && (
          <section className="py-20 bg-neutral-50 dark:bg-neutral-800/40">
            <Container>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-syne text-neutral-900 dark:text-white mb-4">
                  {niche.courseHeading ?? "Популярні курси"}
                </h2>
                <p className="text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
                  Демо-приклади карток курсів. У вашій платформі — повний каталог із фільтрами, відео-превʼю та особистим кабінетом.
                </p>
              </div>
              <CourseFilter courses={niche.courseCards} lang={lang} color={niche.color} />
            </Container>
          </section>
        )}

        {/* ── Class Schedule ─────────────────────────────────────────────────── */}
        {niche.scheduleItems && niche.scheduleItems.length > 0 && (
          <section className="py-20 bg-white dark:bg-neutral-900">
            <Container>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-syne text-neutral-900 dark:text-white mb-4">
                  {niche.scheduleHeading ?? "Розклад групових тренувань"}
                </h2>
                <p className="text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
                  Демо-розклад занять. У вашому клубі — повний розклад із онлайн-записом та сповіщеннями.
                </p>
              </div>
              <ScheduleFilter items={niche.scheduleItems} lang={lang} color={niche.color} />
            </Container>
          </section>
        )}

        {/* ── Room Cards ────────────────────────────────────────────────────── */}
        {niche.roomCards && niche.roomCards.length > 0 && (
          <section className="py-20 bg-neutral-50 dark:bg-neutral-800/40">
            <Container>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-syne text-neutral-900 dark:text-white mb-4">
                  {isUk ? "Номери та ціни" : "Rooms & Prices"}
                </h2>
                <p className="text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
                  {isUk ? "Демо-приклади карток номерів. У вашому готелі — онлайн-бронювання з календарем та миттєвим підтвердженням." : "Demo room cards. Your hotel site will have online booking with a calendar and instant confirmation."}
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {niche.roomCards.map((room) => (
                  <div
                    key={room.id}
                    className="group flex flex-col bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-700/50 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all"
                  >
                    {/* Gradient header */}
                    <div className={`relative h-36 bg-linear-to-br ${room.gradient} flex items-center justify-center`}>
                      <span className="text-6xl opacity-90">{room.icon}</span>
                      {room.badge && (
                        <span className={`absolute top-2 left-2 ${room.badgeColor ?? "bg-neutral-700"} text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full`}>
                          {room.badge}
                        </span>
                      )}
                      <span className="absolute top-2 right-2 bg-black/40 text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
                        {room.type}
                      </span>
                    </div>

                    <div className="flex flex-col flex-1 p-5">
                      <h3 className="font-semibold text-sm text-neutral-900 dark:text-white mb-3 leading-snug">
                        {room.title}
                      </h3>

                      {/* Capacity + Area */}
                      <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400 mb-3">
                        <span>👥 {isUk ? `До ${room.capacity} ос.` : `Up to ${room.capacity} guests`}</span>
                        {room.area && <span>📐 {room.area}</span>}
                      </div>

                      {/* Amenities */}
                      <div className="flex flex-wrap gap-1.5 mb-4 flex-1">
                        {room.amenities.map((amenity) => (
                          <span key={amenity} className="text-[10px] px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                            {amenity}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto flex items-center justify-between gap-2">
                        <span className="text-base font-bold font-syne" style={{ color: niche.color }}>
                          {room.pricePerNight}
                        </span>
                        <Link
                          href={`/${lang}/contact`}
                          className="text-[11px] font-semibold px-3 py-1.5 rounded-lg border transition-colors shrink-0"
                          style={{ borderColor: niche.color, color: niche.color }}
                        >
                          {isUk ? "Забронювати" : "Book"}
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-10">
                <Button href={`/${lang}/contact`} variant="primary" size="md">
                  {isUk ? "Перевірити наявність номерів" : "Check Room Availability"}
                </Button>
              </div>
            </Container>
          </section>
        )}

        {/* ── Car Catalog ───────────────────────────────────────────────────── */}
        {niche.carCards && niche.carCards.length > 0 && (
          <section className="py-20 bg-neutral-50 dark:bg-neutral-800/40">
            <Container>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-syne text-neutral-900 dark:text-white mb-4">
                  {isUk ? "Каталог автомобілів" : "Car Catalog"}
                </h2>
                <p className="text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
                  {isUk ? "Демо-приклади карток авто. У вашому автосалоні — повний каталог із фільтрами, фотогалереєю та онлайн-заявкою на тест-драйв." : "Demo car cards. Your dealership will have a full catalog with filters, photo gallery, and online test-drive requests."}
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {niche.carCards.map((car) => (
                  <div
                    key={car.id}
                    className="group flex flex-col bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-700/50 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all"
                  >
                    {/* Gradient header */}
                    <div className={`relative h-32 bg-linear-to-br ${car.gradient} flex items-center justify-center`}>
                      <span className="text-5xl opacity-90">{car.icon}</span>
                      {car.badge && (
                        <span className={`absolute top-2 left-2 ${car.badgeColor ?? "bg-neutral-700"} text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full`}>
                          {car.badge}
                        </span>
                      )}
                      <span className="absolute top-2 right-2 bg-black/40 text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
                        {car.bodyType}
                      </span>
                    </div>

                    <div className="flex flex-col flex-1 p-4">
                      <p className="text-[10px] text-neutral-400 dark:text-neutral-500 font-medium uppercase tracking-wide mb-0.5">
                        {car.make} · {car.year}
                      </p>
                      <h3 className="font-semibold text-sm text-neutral-900 dark:text-white mb-2 leading-snug">
                        {car.model}
                      </h3>

                      {/* Specs */}
                      <div className="space-y-1 mb-3 flex-1">
                        {car.engine && (
                          <p className="text-[11px] text-neutral-500 dark:text-neutral-400">⚙️ {car.engine}</p>
                        )}
                        <p className="text-[11px] text-neutral-500 dark:text-neutral-400">⛽ {car.fuelType}</p>
                        {car.mileage && (
                          <p className="text-[11px] text-neutral-500 dark:text-neutral-400">🛣 {car.mileage}</p>
                        )}
                      </div>

                      {/* Tags */}
                      {car.tags && car.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {car.tags.map((tag) => (
                            <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="mt-auto flex items-center justify-between gap-2">
                        <span className="text-base font-bold font-syne" style={{ color: niche.color }}>
                          {car.price}
                        </span>
                        <Link
                          href={`/${lang}/contact`}
                          className="text-[11px] font-semibold px-3 py-1.5 rounded-lg border transition-colors shrink-0"
                          style={{ borderColor: niche.color, color: niche.color }}
                        >
                          {isUk ? "Деталі" : "Details"}
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-10">
                <Button href={`/${lang}/contact`} variant="primary" size="md">
                  {isUk ? "Переглянути весь каталог авто" : "View Full Car Catalog"}
                </Button>
              </div>
            </Container>
          </section>
        )}

        {/* ── Project Portfolio ─────────────────────────────────────────────── */}
        {niche.projectCards && niche.projectCards.length > 0 && (
          <section className="py-20 bg-neutral-50 dark:bg-neutral-800/40">
            <Container>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-syne text-neutral-900 dark:text-white mb-4">
                  {niche.projectsHeading ?? "Реалізовані проєкти"}
                </h2>
                <p className="text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
                  {isUk ? "Демо-приклади карток портфоліо. У вашому сайті — повний каталог проєктів із фотозвітами, кошторисами та відгуками." : "Demo portfolio cards. Your site will have a full project catalog with photo reports, estimates, and reviews."}
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {niche.projectCards.map((project) => (
                  <div
                    key={project.id}
                    className="group flex flex-col bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-700/50 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all"
                  >
                    {/* Gradient header */}
                    <div className={`relative h-36 bg-linear-to-br ${project.gradient} flex items-center justify-center`}>
                      <span className="text-6xl opacity-90">{project.icon}</span>
                      {project.badge && (
                        <span className={`absolute top-2 left-2 ${project.badgeColor ?? "bg-neutral-700"} text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full`}>
                          {project.badge}
                        </span>
                      )}
                      <span className="absolute top-2 right-2 bg-black/40 text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
                        {project.category}
                      </span>
                    </div>

                    <div className="flex flex-col flex-1 p-5">
                      <h3 className="font-semibold text-sm text-neutral-900 dark:text-white mb-2 leading-snug">
                        {project.title}
                      </h3>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-3 flex-1 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Stats */}
                      <div className="flex items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400 mb-3">
                        <span>📐 {project.area}</span>
                        <span>⏱ {project.duration}</span>
                      </div>

                      {/* Tags */}
                      {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {project.tags.map((tag) => (
                            <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <Link
                        href={`/${lang}/contact`}
                        className="mt-auto text-center text-[11px] font-semibold py-2 rounded-lg border transition-colors"
                        style={{ borderColor: niche.color, color: niche.color }}
                      >
                        {isUk ? "Переглянути проєкт" : "View Project"}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-10">
                <Button href={`/${lang}/contact`} variant="primary" size="md">
                  {isUk ? "Переглянути всі проєкти" : "View All Projects"}
                </Button>
              </div>
            </Container>
          </section>
        )}

        {/* ── Job Listings ──────────────────────────────────────────────────── */}
        {niche.jobCards && niche.jobCards.length > 0 && (
          <section className="py-20 bg-white dark:bg-neutral-900">
            <Container>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-syne text-neutral-900 dark:text-white mb-4">
                  {isUk ? "Актуальні вакансії" : "Current Job Openings"}
                </h2>
                <p className="text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
                  {isUk ? "Демо-приклади карток вакансій. У вашому порталі — повна база з фільтрами, заявками та CRM для рекрутерів." : "Demo job cards. Your portal will have a full database with filters, applications, and recruiter CRM."}
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
                {niche.jobCards.map((job) => (
                  <div
                    key={job.id}
                    className="group flex flex-col bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-700/50 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all"
                  >
                    {/* Gradient header */}
                    <div className={`relative h-24 bg-linear-to-br ${job.gradient} flex items-center justify-center`}>
                      <span className="text-4xl opacity-90">{job.icon}</span>
                      {job.badge && (
                        <span className={`absolute top-2 left-2 ${job.badgeColor ?? "bg-neutral-700"} text-white text-[10px] font-bold px-2 py-0.5 rounded-full`}>
                          {job.badge}
                        </span>
                      )}
                      <span className="absolute top-2 right-2 bg-black/40 text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
                        {job.type}
                      </span>
                    </div>

                    <div className="flex flex-col flex-1 p-4">
                      <h3 className="font-semibold text-sm text-neutral-900 dark:text-white mb-1 leading-snug">
                        {job.title}
                      </h3>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-3">
                        🏢 {job.company}
                      </p>

                      <div className="flex flex-wrap gap-2 text-xs text-neutral-500 dark:text-neutral-400 mb-3">
                        <span>📍 {job.location}</span>
                        <span>🎓 {job.experience}</span>
                      </div>

                      {job.tags && job.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3 flex-1">
                          {job.tags.map((tag) => (
                            <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="mt-auto flex items-center justify-between">
                        <span className="text-sm font-bold font-syne" style={{ color: niche.color }}>
                          {job.salary}
                        </span>
                        <Link
                          href={`/${lang}/contact`}
                          className="text-[11px] font-semibold px-3 py-1.5 rounded-lg border transition-colors"
                          style={{ borderColor: niche.color, color: niche.color }}
                        >
                          {isUk ? "Відгукнутись" : "Apply"}
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-10">
                <Button href={`/${lang}/contact`} variant="primary" size="md">
                  {isUk ? "Переглянути всі вакансії" : "View All Jobs"}
                </Button>
              </div>
            </Container>
          </section>
        )}

        {/* ── Mock Services / Price List ────────────────────────────────────── */}
        {niche.mockServices && niche.mockServices.length > 0 && (
          <section className="py-20 bg-white dark:bg-neutral-900">
            <Container>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-syne text-neutral-900 dark:text-white mb-4">
                  {isUk ? "Послуги та ціни" : "Services & Prices"}
                </h2>
                <p className="text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
                  {isUk
                    ? `Орієнтовний прайс для ${niche.title.toLowerCase()}. Точна вартість — після консультації.`
                    : `Estimated prices for ${niche.title.toLowerCase()}. Exact cost — after consultation.`}
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
                {niche.mockServices.map((svc) => (
                  <div
                    key={svc.name}
                    className="group flex flex-col bg-neutral-50 dark:bg-neutral-800/60 rounded-2xl border border-neutral-100 dark:border-neutral-700/50 p-6 hover:border-neutral-200 dark:hover:border-neutral-600 hover:shadow-md transition-all"
                  >
                    <div className="text-3xl mb-4">{svc.icon}</div>
                    <div className="font-semibold text-neutral-900 dark:text-white mb-1 flex-1">
                      {svc.name}
                    </div>
                    {svc.duration && (
                      <div className="text-xs text-neutral-400 dark:text-neutral-500 mb-3">
                        {svc.duration}
                      </div>
                    )}
                    <div
                      className="text-base font-bold mt-auto"
                      style={{ color: niche.color }}
                    >
                      {svc.price}
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-10">
                <Button href={`/${lang}/contact`} variant="primary" size="md">
                  {isUk ? "Отримати точний розрахунок" : "Get Exact Quote"}
                </Button>
              </div>
            </Container>
          </section>
        )}

        {/* ── Contact Info ──────────────────────────────────────────────────── */}
        {(niche.phone || niche.address || niche.openingHours) && (
          <section className="py-16 bg-neutral-50 dark:bg-neutral-900/80">
            <Container>
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold font-syne text-neutral-900 dark:text-white mb-8 text-center">
                  {isUk ? "Контакти та режим роботи" : "Contacts & Working Hours"}
                </h2>
                <div className="grid sm:grid-cols-3 gap-5">
                  {niche.phone && (
                    <div className="flex flex-col items-center text-center bg-white dark:bg-neutral-800/60 rounded-2xl border border-neutral-100 dark:border-neutral-700/50 p-6">
                      <div className="text-3xl mb-3">📞</div>
                      <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1 uppercase tracking-wide font-medium">{isUk ? "Телефон" : "Phone"}</div>
                      <a href={`tel:${niche.phone.replace(/\s/g, "")}`} className="font-semibold text-neutral-900 dark:text-white hover:underline text-sm">
                        {niche.phone}
                      </a>
                    </div>
                  )}
                  {niche.address && (
                    <div className="flex flex-col items-center text-center bg-white dark:bg-neutral-800/60 rounded-2xl border border-neutral-100 dark:border-neutral-700/50 p-6">
                      <div className="text-3xl mb-3">📍</div>
                      <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1 uppercase tracking-wide font-medium">{isUk ? "Адреса" : "Address"}</div>
                      <span className="font-semibold text-neutral-900 dark:text-white text-sm">{niche.address}</span>
                    </div>
                  )}
                  {niche.openingHours && (
                    <div className="flex flex-col items-center text-center bg-white dark:bg-neutral-800/60 rounded-2xl border border-neutral-100 dark:border-neutral-700/50 p-6">
                      <div className="text-3xl mb-3">🕐</div>
                      <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1 uppercase tracking-wide font-medium">{isUk ? "Години роботи" : "Working Hours"}</div>
                      <span className="font-semibold text-neutral-900 dark:text-white text-sm">{niche.openingHours}</span>
                    </div>
                  )}
                </div>
              </div>
            </Container>
          </section>
        )}

        {/* ── Features ──────────────────────────────────────────────────────── */}
        <section className="py-20 bg-white dark:bg-neutral-900">
          <Container>
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="text-3xl font-bold font-syne text-neutral-900 dark:text-white mb-6">
                  {isUk ? "Що входить у рішення" : "What's Included"}
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-8 text-lg">
                  {isUk
                    ? `Готовий сайт для ${niche.title.toLowerCase()} включає все необхідне для швидкого старту онлайн-присутності вашого бізнесу.`
                    : `A ready-made website for ${niche.title.toLowerCase()} includes everything you need for a quick start of your business online.`}
                </p>
                <ul className="space-y-4">
                  {niche.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                        style={{ backgroundColor: niche.color + "25" }}
                      >
                        <Check className="w-3.5 h-3.5" style={{ color: niche.color }} />
                      </div>
                      <span className="text-neutral-700 dark:text-neutral-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">
                {/* Pages */}
                <div className="bg-neutral-50 dark:bg-neutral-800/60 rounded-2xl p-6 border border-neutral-100 dark:border-neutral-700/50">
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">
                    {isUk ? "Сторінки сайту" : "Website Pages"}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {niche.pages.map((page) => (
                      <span
                        key={page}
                        className="px-3 py-1.5 rounded-lg text-sm font-medium text-white"
                        style={{ backgroundColor: niche.color }}
                      >
                        {page}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="bg-neutral-50 dark:bg-neutral-800/60 rounded-2xl p-6 border border-neutral-100 dark:border-neutral-700/50">
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">
                    {isUk ? "Технологічний стек" : "Tech Stack"}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {niche.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1.5 rounded-lg text-sm font-medium bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-600"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Delivery */}
                <div className="bg-neutral-50 dark:bg-neutral-800/60 rounded-2xl p-6 border border-neutral-100 dark:border-neutral-700/50">
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">
                    {isUk ? "Умови та ціни" : "Terms & Prices"}
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 rounded-xl bg-neutral-100 dark:bg-neutral-700/50">
                      <div className="text-2xl font-bold text-neutral-900 dark:text-white">
                        {niche.deliveryDays}
                      </div>
                      <div className="text-sm text-neutral-500 dark:text-neutral-400">
                        {isUk ? "днів розробки" : "days to build"}
                      </div>
                    </div>
                    <div
                      className="text-center p-4 rounded-xl"
                      style={{ backgroundColor: niche.color + "18" }}
                    >
                      <div className="text-2xl font-bold" style={{ color: niche.color }}>
                        {niche.priceFrom.toLocaleString("uk-UA")}₴
                      </div>
                      <div className="text-sm text-neutral-500 dark:text-neutral-400">
                        {isUk ? "від" : "from"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* ── Page Sections Preview ─────────────────────────────────────────── */}
        <section className="py-20 bg-neutral-50 dark:bg-neutral-800/40">
          <Container>
            <h2 className="text-3xl font-bold font-syne text-neutral-900 dark:text-white text-center mb-4">
              {isUk ? "Структура сайту" : "Website Structure"}
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400 text-center mb-12 max-w-2xl mx-auto">
              {isUk
                ? `Типова структура сторінок для ${niche.title.toLowerCase()}. Ми адаптуємо її під ваш бізнес.`
                : `Typical page structure for ${niche.title.toLowerCase()}. We'll adapt it to your business.`}
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {niche.sampleSections.map((section, idx) => (
                <div
                  key={section}
                  className="relative p-4 rounded-xl border border-neutral-100 dark:border-neutral-700/50 bg-white dark:bg-neutral-800/60 hover:border-neutral-200 dark:hover:border-neutral-600 transition-colors"
                >
                  <div
                    className="w-7 h-7 rounded-full text-white text-xs font-bold flex items-center justify-center mb-3"
                    style={{ backgroundColor: niche.color }}
                  >
                    {idx + 1}
                  </div>
                  <div className="font-medium text-neutral-800 dark:text-neutral-200">
                    {section}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ── Variants ──────────────────────────────────────────────────────── */}
        {niche.variants && niche.variants.length > 0 && (
          <section className="py-20 bg-white dark:bg-neutral-900">
            <Container>
              <h2 className="text-3xl font-bold font-syne text-neutral-900 dark:text-white text-center mb-4">
                {isUk ? "Варіанти ніші" : "Niche Variants"}
              </h2>
              <p className="text-neutral-500 dark:text-neutral-400 text-center mb-12 max-w-2xl mx-auto">
                {isUk ? "Оберіть підкатегорію, що найбільше відповідає вашому бізнесу — ми адаптуємо рішення під специфіку." : "Choose the subcategory that best fits your business — we'll adapt the solution to your specifics."}
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {niche.variants.map((v) => (
                  <div
                    key={v.title}
                    className="group p-6 rounded-2xl border border-neutral-100 dark:border-neutral-700/50 bg-neutral-50 dark:bg-neutral-800/60 hover:border-indigo-200 dark:hover:border-indigo-700/50 hover:shadow-md transition-all"
                  >
                    <div className="text-3xl mb-3">{v.emoji}</div>
                    <h3 className="font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {v.title}
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {v.description}
                    </p>
                  </div>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* ── Promotions ────────────────────────────────────────────────────── */}
        {niche.promotions && niche.promotions.length > 0 && (
          <section className="py-20 bg-white dark:bg-neutral-900">
            <Container>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-syne text-neutral-900 dark:text-white mb-4">
                  {isUk ? "Акції та спеціальні пропозиції" : "Promotions & Special Offers"}
                </h2>
                <p className="text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto">
                  {isUk ? "Актуальні знижки та вигідні пропозиції — скористайтесь зараз" : "Current discounts and special offers — take advantage now"}
                </p>
              </div>
              <div className={`grid sm:grid-cols-${Math.min(niche.promotions.length, 3)} gap-6 max-w-4xl mx-auto`}>
                {niche.promotions.map((promo) => (
                  <div
                    key={promo.title}
                    className="relative flex flex-col bg-neutral-50 dark:bg-neutral-800/60 rounded-2xl border border-neutral-100 dark:border-neutral-700/50 p-6 overflow-hidden group hover:shadow-md transition-all"
                  >
                    {/* Decorative accent */}
                    <div
                      className="absolute top-0 right-0 w-20 h-20 rounded-bl-[3rem] opacity-10"
                      style={{ backgroundColor: niche.color }}
                    />
                    {promo.tag && (
                      <div className="flex items-center gap-1.5 mb-3">
                        <Tag className="w-3 h-3" style={{ color: niche.color }} />
                        <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: niche.color }}>
                          {promo.tag}
                        </span>
                      </div>
                    )}
                    <div className="text-3xl mb-3">{promo.icon}</div>
                    <div className="font-bold text-neutral-900 dark:text-white text-lg mb-1">
                      {promo.title}
                    </div>
                    <div
                      className="text-3xl font-bold font-syne mb-3"
                      style={{ color: niche.color }}
                    >
                      {promo.discount}
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 flex-1 leading-relaxed">
                      {promo.description}
                    </p>
                    <Link
                      href={`/${lang}/contact`}
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-80"
                      style={{ color: niche.color }}
                    >
                      {isUk ? "Скористатись" : "Claim"} <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* ── Team ──────────────────────────────────────────────────────────── */}
        {niche.team && niche.team.length > 0 && (
          <section className="py-20 bg-neutral-50 dark:bg-neutral-800/40">
            <Container>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-syne text-neutral-900 dark:text-white mb-4">
                  {isUk ? "Наша команда" : "Our Team"}
                </h2>
                <p className="text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto">
                  {isUk ? "Досвідчені фахівці з підтвердженою кваліфікацією" : "Experienced specialists with proven qualifications"}
                </p>
              </div>
              <div className={`grid sm:grid-cols-${Math.min(niche.team.length, 3)} gap-8 max-w-4xl mx-auto`}>
                {niche.team.map((member) => (
                  <div
                    key={member.name}
                    className="text-center bg-white dark:bg-neutral-800/60 rounded-2xl border border-neutral-100 dark:border-neutral-700/50 p-8 hover:shadow-md transition-all group"
                  >
                    {/* Avatar */}
                    <div
                      className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl ring-4 ring-offset-2 dark:ring-offset-neutral-800"
                      style={{ backgroundColor: niche.color + "20" }}
                    >
                      {member.emoji}
                    </div>
                    <div className="font-bold text-neutral-900 dark:text-white text-lg mb-1">
                      {member.name}
                    </div>
                    <div className="text-sm font-medium mb-1" style={{ color: niche.color }}>
                      {member.role}
                    </div>
                    <div className="text-xs text-neutral-400 dark:text-neutral-500 mb-4">
                      {isUk ? "Досвід:" : "Experience:"} {member.experience}
                    </div>
                    {member.specializations && member.specializations.length > 0 && (
                      <div className="flex flex-wrap justify-center gap-1.5">
                        {member.specializations.map((spec) => (
                          <span
                            key={spec}
                            className="px-2.5 py-1 rounded-lg text-xs font-medium"
                            style={{ backgroundColor: niche.color + "15", color: niche.color }}
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* ── Pricing Plans ─────────────────────────────────────────────────── */}
        {niche.pricingPlans && niche.pricingPlans.length > 0 && (
          <section className="py-20 bg-neutral-50 dark:bg-neutral-800/40">
            <Container>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-syne text-neutral-900 dark:text-white mb-4">
                  {isUk ? "Тарифні плани" : "Pricing Plans"}
                </h2>
                <p className="text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
                  {isUk ? "Оберіть план, що відповідає вашим потребам. Всі тарифи можна адаптувати індивідуально." : "Choose a plan that fits your needs. All plans can be customized individually."}
                </p>
              </div>
              {niche.billingToggle ? (
                <PricingToggle plans={niche.pricingPlans} lang={lang} color={niche.color} />
              ) : (
                <>
                  <div className={`grid sm:grid-cols-2 ${niche.pricingPlans.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"} gap-6 max-w-6xl mx-auto`}>
                    {niche.pricingPlans.map((plan) => (
                      <div
                        key={plan.name}
                        className={`relative flex flex-col rounded-2xl border p-6 transition-all ${
                          plan.highlighted
                            ? "border-2 shadow-xl shadow-indigo-500/10 bg-white dark:bg-neutral-800"
                            : "border-neutral-100 dark:border-neutral-700/50 bg-white dark:bg-neutral-800/60 hover:shadow-md"
                        }`}
                        style={plan.highlighted ? { borderColor: niche.color } : undefined}
                      >
                        {plan.highlighted && (
                          <div
                            className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-white text-xs font-bold whitespace-nowrap"
                            style={{ backgroundColor: niche.color }}
                          >
                            {plan.cta ?? "Найпопулярніший"}
                          </div>
                        )}
                        <div className="mb-4">
                          <div className="font-bold text-lg text-neutral-900 dark:text-white mb-1">
                            {plan.name}
                          </div>
                          <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-snug">
                            {plan.description}
                          </p>
                        </div>
                        <div className="flex items-baseline gap-1 mb-6">
                          <span className="text-3xl font-bold font-syne" style={{ color: niche.color }}>
                            {plan.price}
                          </span>
                          {plan.period && (
                            <span className="text-sm text-neutral-400">{plan.period}</span>
                          )}
                        </div>
                        <ul className="space-y-2.5 flex-1 mb-6">
                          {plan.features.map((f) => (
                            <li key={f.text} className="flex items-start gap-2.5 text-sm">
                              {f.included ? (
                                <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: niche.color }} />
                              ) : (
                                <X className="w-4 h-4 shrink-0 mt-0.5 text-neutral-300 dark:text-neutral-600" />
                              )}
                              <span className={f.included ? "text-neutral-700 dark:text-neutral-300" : "text-neutral-400 dark:text-neutral-600"}>
                                {f.text}
                              </span>
                            </li>
                          ))}
                        </ul>
                        <Link
                          href={`/${lang}/contact`}
                          className="block text-center py-3 px-5 rounded-xl font-semibold text-sm transition-all"
                          style={
                            plan.highlighted
                              ? { backgroundColor: niche.color, color: "#fff" }
                              : { border: `1.5px solid ${niche.color}`, color: niche.color }
                          }
                        >
                          {plan.cta ?? "Обрати план"}
                        </Link>
                      </div>
                    ))}
                  </div>
                  <p className="text-center text-xs text-neutral-400 dark:text-neutral-500 mt-8">
                    {isUk ? "Ціни орієнтовні. Точна вартість формується після консультації — залиште заявку." : "Prices are approximate. Exact cost is determined after consultation — leave a request."}
                  </p>
                </>
              )}
            </Container>
          </section>
        )}

        {/* ── Calculator ────────────────────────────────────────────────────── */}
        {niche.calculatorSteps && niche.calculatorSteps.length > 0 && (
          <NicheCalculator
            steps={niche.calculatorSteps}
            color={niche.color}
            title={isUk ? "Калькулятор вартості" : "Cost Calculator"}
          />
        )}

        {/* ── BMI Calculator ────────────────────────────────────────────────── */}
        {niche.bmiCalculator && (
          <BMICalculator lang={lang} color={niche.color} />
        )}

        {/* ── Booking Form ──────────────────────────────────────────────────── */}
        {niche.bookingForm && niche.mockServices && niche.mockServices.length > 0 && (
          <BookingSection
            services={niche.mockServices}
            color={niche.color}
            gradient={niche.gradient}
          />
        )}

        {/* ── Order This Solution ───────────────────────────────────────────── */}
        <section className="py-20 bg-white dark:bg-neutral-900">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: niche.color }}>
                  {isUk ? "Замовити у CodeNest" : "Order from CodeNest"}
                </p>
                <h2 className="text-3xl font-heading font-extrabold text-neutral-900 dark:text-white mb-3">
                  {isUk
                    ? `Хочете такий сайт для вашого бізнесу?`
                    : `Want this website for your business?`}
                </h2>
                <p className="text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto">
                  {isUk
                    ? `Готове рішення для ${niche.title.toLowerCase()} — від £${Math.ceil(niche.priceFrom / 40 / 5) * 5}. Запуск за ${niche.deliveryDays}+ днів. Адаптуємо під ваш бренд.`
                    : `Ready-made solution for ${niche.title.toLowerCase()} — from £${Math.ceil(niche.priceFrom / 40 / 5) * 5}. Launch in ${niche.deliveryDays}+ days. Customized for your brand.`}
                </p>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                {(isUk
                  ? [
                      { name: "Basic", price: `від ₴${(19900).toLocaleString("uk-UA")}`, days: "3–5 днів", popular: false, items: ["Лендінг 1–5 сторінок", "Mobile-first дизайн", "Базова SEO", "Форма звʼязку", "3 міс підтримки"] },
                      { name: "Standard", price: `від ₴${(39900).toLocaleString("uk-UA")}`, days: "7–14 днів", popular: true, items: ["Мультисторінковий сайт", `Нішевий модуль (${niche.title})`, "CMS + Аналітика", "SEO + Schema.org", "6 міс підтримки"] },
                      { name: "Premium", price: `від ₴${(79900).toLocaleString("uk-UA")}`, days: "14–30 днів", popular: false, items: ["Кастомний дизайн", "Всі модулі + E-commerce", "Клієнтська адмінка", "Пріоритетна підтримка 12 міс"] },
                    ]
                  : [
                      { name: "Basic", price: "from £499", days: "3–5 days", popular: false, items: ["1–5 page landing", "Mobile-first design", "Basic SEO", "Contact form", "3 mo support"] },
                      { name: "Standard", price: "from £999", days: "7–14 days", popular: true, items: ["Multi-page site", `Niche module (${niche.title})`, "CMS + Analytics", "SEO + Schema.org", "6 mo support"] },
                      { name: "Premium", price: "from £1,999", days: "14–30 days", popular: false, items: ["Custom design", "All modules + E-commerce", "Client admin panel", "Priority support 12 mo"] },
                    ]
                ).map((pkg) => (
                  <div
                    key={pkg.name}
                    className={`relative rounded-2xl border p-6 flex flex-col ${
                      pkg.popular
                        ? "border-2 bg-white dark:bg-neutral-800 shadow-xl shadow-indigo-500/10"
                        : "border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800/60"
                    }`}
                    style={pkg.popular ? { borderColor: niche.color } : {}}
                  >
                    {pkg.popular && (
                      <span
                        className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold text-white px-3 py-1 rounded-full"
                        style={{ backgroundColor: niche.color }}
                      >
                        {isUk ? "Популярний" : "Popular"}
                      </span>
                    )}
                    <div className="font-heading font-bold text-neutral-900 dark:text-white mb-1">{pkg.name}</div>
                    <div className="font-semibold text-sm mb-1" style={{ color: niche.color }}>{pkg.price}</div>
                    <div className="flex items-center gap-1 text-xs text-neutral-400 mb-5">
                      <Clock className="w-3 h-3" /> {pkg.days}
                    </div>
                    <ul className="space-y-2 flex-1 mb-6">
                      {pkg.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs text-neutral-600 dark:text-neutral-400">
                          <Check className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/${lang}/contact?niche=${niche.slug}&package=${pkg.name.toLowerCase()}`}
                      className="block text-center px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                      style={pkg.popular
                        ? { backgroundColor: niche.color, color: "white" }
                        : { border: `1px solid ${niche.color}`, color: niche.color }}
                    >
                      {isUk ? "Замовити" : "Order"}
                    </Link>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Link
                  href={`/${lang}/contact?niche=${niche.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white transition-colors hover:opacity-90"
                  style={{ backgroundColor: niche.color }}
                >
                  <ShoppingCart className="w-4 h-4" />
                  {isUk ? "Отримати безкоштовну консультацію" : "Get a Free Consultation"}
                </Link>
                <p className="text-xs text-neutral-400 mt-3">
                  {isUk ? "Відповідаємо протягом 1 робочого дня" : "We respond within 1 business day"}
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* ── Reviews ───────────────────────────────────────────────────────── */}
        <NicheReviews slug={niche.slug} color={niche.color} />

        {/* ── FAQ ───────────────────────────────────────────────────────────── */}
        <section className="py-20 bg-neutral-50 dark:bg-neutral-800/40">
          <Container className="max-w-3xl">
            <h2 className="text-3xl font-bold font-syne text-neutral-900 dark:text-white text-center mb-12">
              {isUk ? "Часті питання" : "Frequently Asked Questions"}
            </h2>
            <div className="space-y-3">
              {faqItems.map((item) => (
                <details
                  key={item.q}
                  className="group border border-neutral-100 dark:border-neutral-700/50 rounded-2xl overflow-hidden bg-white dark:bg-neutral-800/60"
                >
                  <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none font-semibold text-neutral-900 dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-700/30 transition-colors">
                    {item.q}
                    <Check
                      className="w-4 h-4 shrink-0 ml-4 text-neutral-400 group-open:hidden"
                      style={{ color: niche.color }}
                    />
                  </summary>
                  <div className="px-6 pb-5 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </Container>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────────────── */}
        <section className={`py-20 bg-linear-to-br ${niche.gradient} text-white`}>
          <Container>
            <div className="text-center max-w-3xl mx-auto">
              <div className="text-6xl mb-6">{niche.emoji}</div>
              <h2 className="text-3xl md:text-4xl font-bold font-syne mb-6">
                {isUk ? "Готові запустити сайт для вашого бізнесу?" : "Ready to Launch a Website for Your Business?"}
              </h2>
              <p className="text-white/80 text-lg mb-10">
                {isUk
                  ? <>Замовте готове рішення для {niche.title.toLowerCase()} — і отримайте повноцінний сайт за {niche.deliveryDays} днів від{" "}{niche.priceFrom.toLocaleString("uk-UA")} грн.</>
                  : <>Order a ready-made solution for {niche.title.toLowerCase()} — and get a full website in {niche.deliveryDays} days from ${niche.priceFrom}.</>}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href={`/${lang}/contact`} variant="secondary" size="lg">
                  {isUk ? "Замовити зараз" : "Order Now"}
                </Button>
                <Button
                  href={`/${lang}/pricing`}
                  variant="outline"
                  size="lg"
                  className="border-white/50 text-white hover:bg-white/10"
                >
                  {isUk ? "Переглянути ціни" : "View Prices"}
                </Button>
              </div>
            </div>
          </Container>
        </section>

        {/* ── Related Blog Posts ────────────────────────────────────────────── */}
        {relatedPosts.length > 0 && (
          <section className="py-16 bg-white dark:bg-neutral-900">
            <Container>
              <h2 className="text-2xl font-bold font-syne text-neutral-900 dark:text-white mb-8">
                {isUk ? "Читайте також" : "Read Also"}
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/${lang}/blog/${post.slug}`}
                    className="group bg-neutral-50 dark:bg-neutral-800/60 rounded-2xl overflow-hidden border border-neutral-100 dark:border-neutral-700/50 hover:border-indigo-100 dark:hover:border-indigo-800/50 hover:shadow-md transition-all"
                  >
                    <div className={`h-2 bg-linear-to-r ${post.color}`} />
                    <div className="p-5">
                      <div className="text-2xl mb-3">{post.emoji}</div>
                      <div className="text-xs font-medium text-indigo-600 dark:text-indigo-400 mb-2">{post.category}</div>
                      <h3 className="font-semibold text-neutral-900 dark:text-white group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors leading-snug mb-3 line-clamp-2">
                        {post.title}
                      </h3>
                      <div className="flex items-center justify-between text-xs text-neutral-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {post.readTime} {isUk ? "хв" : "min"}
                        </span>
                        <span className="flex items-center gap-1 text-indigo-500 group-hover:gap-2 transition-all">
                          {isUk ? "Читати" : "Read"} <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* ── Portfolio Case ────────────────────────────────────────────────── */}
        {portfolioCase && (
          <section className="py-16 bg-neutral-50 dark:bg-neutral-800/40">
            <Container>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-8 rounded-2xl border border-neutral-100 dark:border-neutral-700/50 bg-white dark:bg-neutral-800/60">
                <div className="flex-1">
                  <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: niche.color }}>
                    {isUk ? "Кейс портфоліо" : "Portfolio Case"}
                  </p>
                  <h2 className="text-xl font-bold font-syne text-neutral-900 dark:text-white mb-2">
                    {portfolioCase.title}
                  </h2>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4 max-w-xl">
                    {portfolioCase.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {portfolioCase.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-3 shrink-0">
                  <Button href={`/${lang}/portfolio/${portfolioCase.slug}`} variant="primary">
                    {isUk ? "Дивитися кейс" : "View Case"}
                  </Button>
                  <Button href={`/${lang}/portfolio`} variant="outline">
                    {isUk ? "Усе портфоліо" : "All Portfolio"}
                  </Button>
                </div>
              </div>
            </Container>
          </section>
        )}

        {/* ── AI/ML Cross-links ────────────────────────────────────────────── */}
        {aiMlLinks && (
          <section className="py-10 bg-linear-to-br from-indigo-950 to-violet-950">
            <Container>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="shrink-0">
                  <span className="text-3xl">🤖</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-1">
                    {isUk ? "Розширте можливості з AI / ML" : "Take it further with AI / ML"}
                  </p>
                  <h3 className="text-lg font-heading font-bold text-white mb-1">
                    {isUk
                      ? "Хочете більше від вашого сайту? Додайте штучний інтелект."
                      : "Want more from your website? Add artificial intelligence."}
                  </h3>
                  <p className="text-sm text-indigo-200/70">
                    {isUk
                      ? "CodeNest розробляє AI/ML рішення спеціально для цього типу бізнесу."
                      : "CodeNest builds AI/ML solutions tailored for this type of business."}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 shrink-0">
                  {aiMlLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={`/${lang}${link.href}`}
                      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                        link.type === "ai"
                          ? "bg-indigo-600 hover:bg-indigo-500 text-white"
                          : "bg-violet-700 hover:bg-violet-600 text-white"
                      }`}
                    >
                      {link.type === "ai" ? "🤖" : "📊"} {isUk ? link.labelUk : link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </Container>
          </section>
        )}

        {/* ── Related Niches ────────────────────────────────────────────────── */}
        {otherNiches.length > 0 && (
          <section className="py-20 bg-neutral-50 dark:bg-neutral-900/80">
            <Container>
              <h2 className="text-2xl font-bold font-syne text-neutral-900 dark:text-white mb-8">
                {isUk ? "Інші готові рішення" : "Other Ready-Made Solutions"}
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {otherNiches.map((n) => (
                  <Link
                    key={n.slug}
                    href={`/${lang}/niches/${n.slug}`}
                    className="group bg-white dark:bg-neutral-800/60 rounded-2xl p-6 border border-neutral-100 dark:border-neutral-700/50 hover:border-neutral-200 dark:hover:border-neutral-600 hover:shadow-md transition-all"
                  >
                    <div
                      className={`w-12 h-12 rounded-xl bg-linear-to-br ${n.gradient} flex items-center justify-center text-2xl mb-4`}
                    >
                      {n.emoji}
                    </div>
                    <h3 className="font-bold text-neutral-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2">
                      {n.title}
                    </h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4 line-clamp-2">
                      {n.subtitle}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">
                        {isUk ? `від ${n.priceFrom.toLocaleString("uk-UA")} грн` : `from $${n.priceFrom}`}
                      </span>
                      <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                ))}
              </div>
              <div className="text-center mt-8">
                <Button href={`/${lang}/marketplace`} variant="outline">
                  {isUk ? "Усі рішення маркетплейсу" : "All Marketplace Solutions"}
                </Button>
              </div>
            </Container>
          </section>
        )}
      </main>
      <Footer />
      <CustomizerPanel nicheSlug={niche.slug} />
    </>
  );
}
