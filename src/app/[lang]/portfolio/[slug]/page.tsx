import type { Metadata } from "next";
import { buildAlternates } from "@/i18n";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, ChevronRight, ExternalLink, Monitor, ShoppingCart, Clock, Package, BrainCircuit } from "lucide-react";
import { PROJECTS, COMPLEXITY_LABELS } from "@/lib/data/portfolio";
import { PageAnalytics } from "@/components/analytics/PageAnalytics";

/** Portfolio cases with a dedicated real-design demo page at /demo */
const DEDICATED_DEMOS = new Set([
  "math-school-online",
  "music-school-melody",
  "coding-bootcamp-devstart",
  "language-school-speakeasy",
  "agroua-farm",
  "agrodrone-tech",
  "organicbox-csa",
  "vynohrad-winery",
  "pasika-honey",
  "fashion-store",
  "sportpeak-equipment",
  "toyland-kids",
  "fine-dining",
  "beauty-studio",
  "fitness-gym",
  "coffee-bar",
  "pastry-shop",
  "travel-agency",
  "estate-agency",
  "dental-studio",
  "autopro-service",
  "barber-lordcut",
  "vr-zone",
  "budpro-builders",
  "greenleaf-cafe",
  "lexua-law",
  "petcare-vet",
  "bloom-flowers",
  "eventmaster-agency",
  "lasertag-arena",
  "quickbite-delivery",
  "calmmind-therapy",
  "ai-chatbot-saas",
  "travel-hotel",
  "photographer-portfolio",
  "cleaning-service",
  "ngo-charity-landing",
  "craft-workshop-landing",
  "architecture-studio",
  "interior-design-studio",
  "restaurant-cafe",
  "beauty-salon",
  "medical-clinic",
  "fitness-club",
  "bakery",
  "law-firm",
  "construction",
  "real-estate-agency",
  "education-platform",
  "auto-service",
  "events-agency",
  "veterinary-clinic",
  "food-delivery-app",
  "flower-shop",
  "psychology-coach",
  "professional-courses-portal",
  "personal-trainer-landing",
  "dental-clinic-landing",
  "pharmacy-online-landing",
  "saas-product-landing",
  "logistics-b2b-landing",
  "tattoo-spa",
  "hammam-turkish-spa",
  "recruitment-platform",
  "business-consulting",
  "electronics-store",
  "bespoke-tailoring-atelier",
  "art-creativity-kids",
  "furniture-store",
  "used-car-marketplace",
  "car-detailing-wrap",
  "nail-art-studio",
  "post-construction-cleaning",
  "commercial-cleaning",
  "mobile-coffee-truck",
  "specialty-teahouse",
  "digital-transformation-consulting",
  "legaltech-consulting",
  "ceramics-studio-shop",
  "leather-goods-workshop",
  "repair-service",
  "smarthome-store",
  "entertainment-center",
  "festival-ticketing",
  "conference-platform",
  "fashion-brand",
  "vintage-thrift-shop",
  "yoga-studio",
  "premium-floral-design",
  "kids-center",
  "stem-robotics-kids",
  "family-law",
  "ip-law",
  "bakery-pastry",
  "artisan-bread-bakery",
  "kids-coding-school",
  "language-school",
  "online-education",
  "wildflower-eco-shop",
  "meal-prep-service",
  "corporate-lunch",
  "warehouse-rental",
  "last-mile-courier",
  "fertility-center",
  "animal-rescue-fund",
  "ngo-foundation",
  "war-reconstruction-ngo",
  "online-pharmacy",
  "herbal-natural-pharmacy",
  "pharmacy-express-delivery",
  "photography-studio",
  "newborn-photography",
  "commercial-photography",
  "couples-counseling",
  "psychology-platform",
  "villa-rental",
  "residential-complex",
  "it-headhunter",
  "general-staffing-agency",
  "hr-payroll-saas",
  "project-management-saas",
  "piercing-body-art-studio",
  "yacht-charter",
  "hostel-booking",
  "emergency-vet-clinic",
  "petshop-vet-combo",
  "personal-trainer",
  "window-manufacturer",
  "luxury-kitchen-studio",
  "smart-kids-development",
  "financial-advisory",
  "glowbar-beauty",
  "ink-city-tattoo",
  "aqua-zen-spa",
  "bridal-luxury-salon",
  "executive-hunt",
]);
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface Props {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const isUk = lang === "uk";
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return {};
  const desc = isUk ? project.description : (project.descriptionEn ?? project.description);
  const res = isUk ? project.result : (project.resultEn ?? project.result);
  const ogTitle = isUk
    ? `${project.title} — Кейс Codeworth`
    : `${project.title} — Codeworth Case Study`;
  const ogDescription = isUk
    ? `${project.description} Результат: ${project.result}`
    : `${desc} Result: ${res}`;
  const ogImage = `/og/portfolio/${slug}.png`;
  return {
    title: isUk
      ? `${project.title} — Кейс | Codeworth`
      : `${project.title} — Case Study | Codeworth`,
    description: ogDescription,
    alternates: buildAlternates(lang, `portfolio/${slug}`),
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      type: "article",
      url: `https://codeworth.uk/${lang}/portfolio/${slug}`,
      images: [{ url: ogImage, width: 1200, height: 630, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [ogImage],
    },
  };
}

export default async function PortfolioProjectPage({ params }: Props) {
  const { lang, slug } = await params;
  const isUk = lang === "uk";
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  const complexity = COMPLEXITY_LABELS[project.complexity];
  const description = isUk ? project.description : (project.descriptionEn ?? project.description);
  const result = isUk ? project.result : (project.resultEn ?? project.result);
  const caseStudy = isUk ? project.caseStudy : (project.caseStudyEn ?? project.caseStudy);

  const related = PROJECTS.filter((p) => p.slug !== slug && p.niche === project.niche).slice(0, 2);
  const others = PROJECTS.filter((p) => p.slug !== slug && !related.includes(p)).slice(0, 3 - related.length);
  const suggestions = [...related, ...others].slice(0, 3);

  const PRICE_GBP = { simple: 499, medium: 999, complex: 1999 };
  const PRICE_UAH = { simple: 19900, medium: 39900, complex: 79900 };
  const DELIVERY_DAYS = { simple: 3, medium: 7, complex: 14 };
  const priceGbp = project.priceFrom ?? PRICE_GBP[project.complexity];
  const priceUah = project.priceFrom ? Math.round(project.priceFrom * 40) : PRICE_UAH[project.complexity];
  const deliveryDays = project.deliveryDays ?? DELIVERY_DAYS[project.complexity];

  const PACKAGES = isUk
    ? [
        { name: "Basic", price: `від ₴${PRICE_UAH.simple.toLocaleString("uk-UA")}`, days: "3–5 днів", includes: ["Лендінг 1–5 сторінок", "Mobile-first дизайн", "Базова SEO-оптимізація", "Форма звʼязку", "3 місяці підтримки"] },
        { name: "Standard", price: `від ₴${PRICE_UAH.medium.toLocaleString("uk-UA")}`, days: "7–14 днів", includes: ["Мультисторінковий сайт", "Нішевий модуль (меню/запис/каталог)", "CMS (Sanity)", "Google Analytics 4", "SEO + Schema.org", "6 місяців підтримки"], highlight: true },
        { name: "Premium", price: `від ₴${PRICE_UAH.complex.toLocaleString("uk-UA")}`, days: "14–30 днів", includes: ["Кастомний дизайн", "Всі нішеві модулі", "E-commerce / Booking", "Клієнтська адмінка", "Пріоритетна підтримка 12 міс"] },
      ]
    : [
        { name: "Basic", price: `from £${PRICE_GBP.simple}`, days: "3–5 days", includes: ["1–5 page landing", "Mobile-first design", "Basic SEO", "Contact form", "3 months support"] },
        { name: "Standard", price: `from £${PRICE_GBP.medium}`, days: "7–14 days", includes: ["Multi-page site", "Niche module (menu/booking/catalog)", "CMS (Sanity)", "Google Analytics 4", "SEO + Schema.org", "6 months support"], highlight: true },
        { name: "Premium", price: `from £${PRICE_GBP.complex}`, days: "14–30 days", includes: ["Custom design", "All niche modules", "E-commerce / Booking", "Client admin panel", "Priority support 12 mo"] },
      ];

  const idx = PROJECTS.indexOf(project);
  const prevProject = idx > 0 ? PROJECTS[idx - 1] : null;
  const nextProject = idx < PROJECTS.length - 1 ? PROJECTS[idx + 1] : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Головна", item: "https://codeworth.uk" },
      { "@type": "ListItem", position: 2, name: "Портфоліо", item: "https://codeworth.uk/portfolio" },
      { "@type": "ListItem", position: 3, name: project.title },
    ],
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: isUk
      ? `${project.title} — Кейс Codeworth`
      : `${project.title} — Codeworth Case Study`,
    description,
    image: `https://codeworth.uk/og/portfolio/${project.slug}.png`,
    author: { "@type": "Organization", name: "Codeworth", url: "https://codeworth.uk" },
    publisher: {
      "@type": "Organization",
      name: "Codeworth",
      url: "https://codeworth.uk",
      logo: { "@type": "ImageObject", url: "https://codeworth.uk/logo.png" },
    },
    datePublished: project.year ? `${project.year}-01-01` : undefined,
    url: `https://codeworth.uk/${lang}/portfolio/${project.slug}`,
    inLanguage: isUk ? "uk" : "en",
    about: { "@type": "Thing", name: project.category },
    keywords: project.tech?.join(", "),
  };

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: isUk ? `${project.title} — Готовий сайт` : `${project.title} — Ready-Made Website`,
    description: isUk
      ? `Готове рішення для ${project.niche ?? project.category}. Запуск за ${deliveryDays} днів.`
      : `Ready-made solution for ${project.niche ?? project.category}. Launch in ${deliveryDays} days.`,
    image: `https://codeworth.uk/og/portfolio/${project.slug}.png`,
    brand: { "@type": "Brand", name: "Codeworth" },
    offers: {
      "@type": "Offer",
      priceCurrency: "GBP",
      price: priceGbp,
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "Codeworth", url: "https://codeworth.uk" },
      url: `https://codeworth.uk/${lang}/portfolio/${project.slug}`,
    },
  };

  return (
    <>
      <PageAnalytics event="portfolioView" slug={project.slug} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main id="main-content" className="flex-1">

          {/* ── Hero ───────────────────────────────────────────────────── */}
          <section className={`pt-32 pb-20 bg-linear-to-br ${project.color} relative overflow-hidden`}>
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            <Container className="relative">
              <nav className="flex items-center gap-2 text-sm text-white/60 mb-8 flex-wrap">
                <Link href={`/${lang}`} className="hover:text-white transition-colors">{isUk ? "Головна" : "Home"}</Link>
                <ChevronRight className="w-4 h-4 shrink-0" />
                <Link href={`/${lang}/portfolio`} className="hover:text-white transition-colors">{isUk ? "Портфоліо" : "Portfolio"}</Link>
                <ChevronRight className="w-4 h-4 shrink-0" />
                <span className="text-white/90 truncate">{project.title}</span>
              </nav>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="max-w-xl">
                  <div className="flex flex-wrap items-center gap-3 mb-5">
                    <span className="px-3 py-1 rounded-full text-sm font-semibold bg-white/20 text-white">
                      {project.category}
                    </span>
                    <span className={cn("px-3 py-1 rounded-full text-sm font-semibold", complexity.color)}>
                      {complexity.label}
                    </span>
                    <span className="text-white/60 text-sm">{project.year}</span>
                  </div>
                  <div className="text-6xl mb-4">{project.emoji}</div>
                  <h1 className="text-4xl lg:text-5xl font-heading font-extrabold text-white mb-4 leading-tight">
                    {project.title}
                  </h1>
                  <p className="text-lg text-white/80 leading-relaxed mb-6">{description}</p>
                  <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 text-white mb-8">
                    <span className="text-xl">📈</span>
                    <span className="font-semibold text-sm">{result}</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {(project.nicheSlug || DEDICATED_DEMOS.has(project.slug)) && (
                      <Button
                        href={
                          DEDICATED_DEMOS.has(project.slug)
                            ? `/${lang}/portfolio/${project.slug}/demo`
                            : `/${lang}/niches/${project.nicheSlug}`
                        }
                        variant="secondary"
                        size="lg"
                      >
                        <Monitor className="w-4 h-4 mr-2 inline" />
                        {isUk ? "Переглянути демо" : "View Demo"}
                      </Button>
                    )}
                    <Button href={`/${lang}/contact`} variant="outline" size="lg" className="border-white/40 text-white hover:bg-white/10">
                      {isUk ? "Замовити подібний" : "Order Similar"}
                    </Button>
                  </div>
                </div>

                {/* Sidebar card — desktop */}
                <aside className="hidden md:flex flex-col gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
                    <div className="text-white/60 text-xs uppercase tracking-wider mb-3 font-semibold">{isUk ? "Деталі" : "Details"}</div>
                    <dl className="space-y-2.5 text-sm">
                      {[
                        { label: isUk ? "Клієнт" : "Client", value: project.client },
                        { label: isUk ? "Категорія" : "Category", value: project.category },
                        { label: isUk ? "Ніша" : "Niche", value: project.niche },
                        { label: isUk ? "Рік" : "Year", value: String(project.year) },
                      ].map(({ label, value }) => (
                        <div key={label} className="flex justify-between">
                          <dt className="text-white/50">{label}</dt>
                          <dd className="text-white font-medium">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
                    <div className="text-white/60 text-xs uppercase tracking-wider mb-3 font-semibold">{isUk ? "Стек" : "Stack"}</div>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span key={t} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/20 text-white">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </aside>
              </div>
            </Container>
          </section>

          {/* ── Live Demo Preview ─────────────────────────────────────── */}
          {(project.nicheSlug || DEDICATED_DEMOS.has(project.slug)) && (() => {
            const hasDedicated = DEDICATED_DEMOS.has(project.slug);
            const demoHref = hasDedicated
              ? `/${lang}/portfolio/${project.slug}/demo`
              : `/${lang}/niches/${project.nicheSlug}`;
            const demoLabel = hasDedicated
              ? project.title.toLowerCase().replace(/\s+/g, "") + ".ua"
              : `codeworth.uk/niches/${project.nicheSlug}`;

            return (
              <section className="py-16 bg-neutral-50 dark:bg-neutral-900/80">
                <Container>
                  <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                    <div>
                      <h2 className="text-2xl font-bold font-syne text-neutral-900 dark:text-white">
                        {hasDedicated
                          ? (isUk ? "Демо готового сайту" : "Live Website Demo")
                          : (isUk ? "Живе демо рішення" : "Live Solution Demo")}
                      </h2>
                      <p className="text-neutral-500 dark:text-neutral-400 mt-1 text-sm">
                        {hasDedicated
                          ? (isUk
                              ? "Реальний дизайн клієнтського сайту — унікальна розробка під проєкт"
                              : "Real client website design — unique build for this project")
                          : (isUk
                              ? "Інтерактивний превью — прокрутіть сторінку або відкрийте на повний екран"
                              : "Interactive preview — scroll the page or open in full screen")}
                      </p>
                    </div>
                    <Link
                      href={demoHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {isUk ? "Відкрити демо" : "Open Demo"}
                    </Link>
                  </div>

                  {/* Browser chrome */}
                  <div className="rounded-2xl border border-neutral-200 dark:border-neutral-700 overflow-hidden shadow-xl shadow-neutral-200/50 dark:shadow-neutral-900/40">
                    <div className="flex items-center gap-3 bg-neutral-100 dark:bg-neutral-800 px-4 py-3 border-b border-neutral-200 dark:border-neutral-700">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                        <div className="w-3 h-3 rounded-full bg-green-400" />
                      </div>
                      <div className="flex-1 bg-white dark:bg-neutral-900 rounded-md px-3 py-1.5 text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-2">
                        <svg className="w-3 h-3 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        {demoLabel}
                      </div>
                    </div>
                    <div className="relative bg-white dark:bg-neutral-900 overflow-hidden">
                      <a href={demoHref} target="_blank" rel="noopener noreferrer" className="block group">
                        <img
                          src={`/og/portfolio/${project.slug}.png`}
                          alt={`${project.title} — demo`}
                          className="w-full h-auto block"
                          style={{ maxHeight: "640px", objectFit: "cover", objectPosition: "top" }}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 dark:bg-neutral-900/90 text-neutral-900 dark:text-white text-sm font-medium px-5 py-2.5 rounded-full shadow-lg">
                            {isUk ? "Відкрити демо ↗" : "Open demo ↗"}
                          </span>
                        </div>
                      </a>
                    </div>
                  </div>
                </Container>
              </section>
            );
          })()}

          {/* ── Case Study ────────────────────────────────────────────── */}
          <section className="py-20 bg-white dark:bg-neutral-900">
            <Container>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-10">

                  {caseStudy ? (
                    <>
                      <div>
                        <h2 className="text-2xl font-heading font-bold text-neutral-900 dark:text-white mb-4">🎯 {isUk ? "Задача клієнта" : "Client's Challenge"}</h2>
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">{caseStudy.challenge}</p>
                      </div>
                      <div>
                        <h2 className="text-2xl font-heading font-bold text-neutral-900 dark:text-white mb-4">🔧 {isUk ? "Наше рішення" : "Our Solution"}</h2>
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">{caseStudy.solution}</p>
                      </div>
                      <div>
                        <h2 className="text-2xl font-heading font-bold text-neutral-900 dark:text-white mb-4">📈 {isUk ? "Результати" : "Results"}</h2>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {caseStudy.results.map((r) => (
                            <div
                              key={r}
                              className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40"
                            >
                              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                              <span className="text-sm text-emerald-800 dark:text-emerald-300 font-medium">{r}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <h2 className="text-2xl font-heading font-bold text-neutral-900 dark:text-white mb-4">{isUk ? "Задача клієнта" : "Client's Challenge"}</h2>
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                          {isUk
                            ? <>Клієнт звернувся з запитом на розробку сучасного сайту для <strong>{project.client}</strong>. Основні вимоги: конвертувати відвідувачів у клієнтів, бути швидким, адаптивним та SEO-оптимізованим.</>
                            : <>The client requested a modern website for <strong>{project.client}</strong>. Key requirements: convert visitors into customers, be fast, mobile-friendly, and SEO-optimized.</>}
                        </p>
                      </div>
                      <div>
                        <h2 className="text-2xl font-heading font-bold text-neutral-900 dark:text-white mb-4">{isUk ? "Наше рішення" : "Our Solution"}</h2>
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                          {isUk
                            ? `Розробили сучасне рішення на стеку: ${project.tech.join(", ")}.`
                            : `Built a modern solution using: ${project.tech.join(", ")}.`}
                        </p>
                        <ul className="space-y-2">
                          {project.tags.map((tag) => (
                            <li key={tag} className="flex items-center gap-2.5 text-neutral-700 dark:text-neutral-300">
                              <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center shrink-0">
                                <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                              </div>
                              {tag}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                        <p className="text-emerald-800 dark:text-emerald-300 font-semibold text-lg">📈 {project.result}</p>
                      </div>
                    </>
                  )}

                  {/* Order section */}
                  <div className="rounded-2xl border border-indigo-100 dark:border-indigo-900/40 overflow-hidden">
                    <div className="bg-linear-to-br from-indigo-600 to-indigo-800 p-6 text-white">
                      <h3 className="text-xl font-heading font-bold mb-1">
                        {isUk ? "Замовити такий самий проєкт" : "Order a Similar Project"}
                      </h3>
                      <p className="text-indigo-200 text-sm">
                        {isUk
                          ? `Запуск за ${deliveryDays}+ днів · від ${isUk ? `₴${priceUah.toLocaleString("uk-UA")}` : `£${priceGbp}`}`
                          : `Launch in ${deliveryDays}+ days · from £${priceGbp}`}
                      </p>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-px bg-neutral-100 dark:bg-neutral-700/50">
                      {PACKAGES.map((pkg) => (
                        <div key={pkg.name} className={cn(
                          "p-5 bg-white dark:bg-neutral-800/80 flex flex-col",
                          pkg.highlight && "ring-2 ring-indigo-500 ring-inset relative"
                        )}>
                          {pkg.highlight && (
                            <span className="absolute top-3 right-3 text-[10px] font-bold bg-indigo-600 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
                              {isUk ? "Популярний" : "Popular"}
                            </span>
                          )}
                          <div className="font-heading font-bold text-neutral-900 dark:text-white mb-1">{pkg.name}</div>
                          <div className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm mb-1">{pkg.price}</div>
                          <div className="flex items-center gap-1 text-xs text-neutral-400 mb-4">
                            <Clock className="w-3 h-3" /> {pkg.days}
                          </div>
                          <ul className="space-y-1.5 flex-1">
                            {pkg.includes.map((item) => (
                              <li key={item} className="flex items-start gap-2 text-xs text-neutral-600 dark:text-neutral-400">
                                <Check className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className="p-5 bg-white dark:bg-neutral-800/80 flex flex-col sm:flex-row gap-3 border-t border-neutral-100 dark:border-neutral-700/50">
                      <Link
                        href={`/${lang}/contact?project=${project.slug}&complexity=${project.complexity}`}
                        className="flex-1 text-center px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        {isUk ? "Замовити зараз" : "Order Now"}
                      </Link>
                      <Link
                        href={`/${lang}/marketplace`}
                        className="px-5 py-3 rounded-xl border border-neutral-200 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors"
                      >
                        <Package className="w-4 h-4" />
                        {isUk ? "Всі пакети" : "All packages"}
                      </Link>
                    </div>
                    <div className="px-5 py-2.5 bg-neutral-50 dark:bg-neutral-900/40 border-t border-neutral-100 dark:border-neutral-700/30 text-center">
                      <Link
                        href={`/${lang}/compare`}
                        className="text-xs text-neutral-400 dark:text-neutral-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      >
                        {isUk ? "Порівняти тарифи →" : "Compare all plans →"}
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <aside className="space-y-5">
                  <div className="p-6 rounded-2xl border border-neutral-100 dark:border-neutral-700/50 bg-white dark:bg-neutral-800/60">
                    <h3 className="font-heading font-bold text-neutral-900 dark:text-white mb-4 text-xs uppercase tracking-wider">{isUk ? "Деталі проєкту" : "Project Details"}</h3>
                    <dl className="space-y-3 text-sm">
                      {[
                        { label: isUk ? "Клієнт" : "Client", value: project.client },
                        { label: isUk ? "Категорія" : "Category", value: project.category },
                        { label: isUk ? "Ніша" : "Niche", value: project.niche },
                        { label: isUk ? "Рік" : "Year", value: String(project.year) },
                        { label: isUk ? "Складність" : "Complexity", value: complexity.label },
                      ].map(({ label, value }) => (
                        <div key={label} className="flex justify-between">
                          <dt className="text-neutral-400 dark:text-neutral-500">{label}</dt>
                          <dd className="text-neutral-900 dark:text-white font-medium">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  <div className="p-6 rounded-2xl border border-neutral-100 dark:border-neutral-700/50 bg-white dark:bg-neutral-800/60">
                    <h3 className="font-heading font-bold text-neutral-900 dark:text-white mb-4 text-xs uppercase tracking-wider">{isUk ? "Технологічний стек" : "Tech Stack"}</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span key={t} className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 text-sm font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl border border-neutral-100 dark:border-neutral-700/50 bg-white dark:bg-neutral-800/60">
                    <h3 className="font-heading font-bold text-neutral-900 dark:text-white mb-4 text-xs uppercase tracking-wider">{isUk ? "Особливості" : "Features"}</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price CTA card */}
                  <div className="p-6 rounded-2xl bg-linear-to-br from-indigo-600 to-indigo-800 text-white">
                    <div className="text-xs uppercase tracking-wider text-indigo-200 font-semibold mb-2">
                      {isUk ? "Вартість рішення" : "Solution Price"}
                    </div>
                    <div className="text-3xl font-heading font-extrabold mb-0.5">
                      {isUk ? `₴${priceUah.toLocaleString("uk-UA")}` : `£${priceGbp}`}
                    </div>
                    <div className="text-indigo-200 text-xs mb-4 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {isUk ? `Запуск за ${deliveryDays}+ днів` : `Launch in ${deliveryDays}+ days`}
                    </div>
                    <Link
                      href={`/${lang}/contact?project=${project.slug}&complexity=${project.complexity}`}
                      className="w-full block text-center px-4 py-2.5 rounded-xl bg-white text-indigo-700 font-semibold text-sm hover:bg-indigo-50 transition-colors"
                    >
                      {isUk ? "Замовити зараз" : "Order Now"}
                    </Link>
                  </div>

                  {project.nicheSlug && (
                    <Link
                      href={`/${lang}/niches/${project.nicheSlug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 hover:bg-indigo-100 dark:hover:bg-indigo-950/70 transition-colors group"
                    >
                      <Monitor className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                      <div>
                        <div className="font-semibold text-indigo-700 dark:text-indigo-400 text-sm group-hover:underline">
                          {isUk ? "Переглянути живе демо" : "View Live Demo"}
                        </div>
                        <div className="text-xs text-indigo-500 dark:text-indigo-500">
                          /niches/{project.nicheSlug}
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-indigo-400 ml-auto shrink-0" />
                    </Link>
                  )}

                  {project.relatedAINichePage && (
                    <Link
                      href={`/${lang}${project.relatedAINichePage}`}
                      className="flex items-center gap-3 p-4 rounded-2xl bg-violet-50 dark:bg-violet-950/40 border border-violet-100 dark:border-violet-900/60 hover:bg-violet-100 dark:hover:bg-violet-950/70 transition-colors group"
                    >
                      <BrainCircuit className="w-5 h-5 text-violet-600 dark:text-violet-400 shrink-0" />
                      <div>
                        <div className="font-semibold text-violet-700 dark:text-violet-400 text-sm group-hover:underline">
                          {isUk ? "AI-рішення для цієї ніші" : "AI solutions for this niche"}
                        </div>
                        <div className="text-xs text-violet-500">
                          {project.relatedAINichePage}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-violet-400 ml-auto shrink-0" />
                    </Link>
                  )}

                  {project.relatedMLNichePage && (
                    <Link
                      href={`/${lang}${project.relatedMLNichePage}`}
                      className="flex items-center gap-3 p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60 hover:bg-blue-100 dark:hover:bg-blue-950/70 transition-colors group"
                    >
                      <BrainCircuit className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
                      <div>
                        <div className="font-semibold text-blue-700 dark:text-blue-400 text-sm group-hover:underline">
                          {isUk ? "ML-моделі для цієї ніші" : "ML models for this niche"}
                        </div>
                        <div className="text-xs text-blue-500">
                          {project.relatedMLNichePage}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-blue-400 ml-auto shrink-0" />
                    </Link>
                  )}
                </aside>
              </div>
            </Container>
          </section>

          {/* ── Related ───────────────────────────────────────────────── */}
          {suggestions.length > 0 && (
            <section className="py-16 bg-neutral-50 dark:bg-neutral-900/80 border-t border-neutral-100 dark:border-neutral-800">
              <Container>
                <h3 className="text-xl font-heading font-bold text-neutral-900 dark:text-white mb-8">{isUk ? "Схожі проєкти" : "Similar Projects"}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {suggestions.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/${lang}/portfolio/${p.slug}`}
                      className="group p-5 rounded-2xl border border-neutral-100 dark:border-neutral-700/50 bg-white dark:bg-neutral-800/60 hover:shadow-md hover:-translate-y-1 transition-all duration-200"
                    >
                      <div className={cn("h-28 rounded-xl bg-linear-to-br flex items-center justify-center text-4xl mb-4", p.color)}>
                        {p.emoji}
                      </div>
                      <h4 className="font-heading font-bold text-neutral-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-1">
                        {p.title}
                      </h4>
                      <p className="text-xs text-neutral-400 dark:text-neutral-500">{p.category} · {p.year}</p>
                    </Link>
                  ))}
                </div>
              </Container>
            </section>
          )}

          {/* ── Prev / Next ───────────────────────────────────────────── */}
          <section className="py-10 pb-28 md:pb-10 bg-white dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800">
            <Container>
              <div className="flex items-center justify-between gap-4">
                {prevProject ? (
                  <Link href={`/${lang}/portfolio/${prevProject.slug}`}
                    className="group flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800/60 transition-colors">
                    <ArrowLeft className="w-5 h-5 text-neutral-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 shrink-0 transition-colors" />
                    <div>
                      <div className="text-xs text-neutral-400 mb-0.5">{isUk ? "Попередній" : "Previous"}</div>
                      <div className="font-semibold text-sm text-neutral-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                        {prevProject.title}
                      </div>
                    </div>
                  </Link>
                ) : (
                  <Link href={`/${lang}/portfolio`} className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                    <ArrowLeft className="w-4 h-4" /> {isUk ? "Всі проєкти" : "All Projects"}
                  </Link>
                )}

                {nextProject ? (
                  <Link href={`/${lang}/portfolio/${nextProject.slug}`}
                    className="group flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800/60 transition-colors text-right">
                    <div>
                      <div className="text-xs text-neutral-400 mb-0.5">{isUk ? "Наступний" : "Next"}</div>
                      <div className="font-semibold text-sm text-neutral-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                        {nextProject.title}
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 shrink-0 transition-colors" />
                  </Link>
                ) : <div />}
              </div>
            </Container>
          </section>

          {/* ── Mobile floating CTA ──────────────────────────────────── */}
          <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-700 shadow-xl px-4 py-3 flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <div className="text-xs text-neutral-400 leading-none mb-0.5">
                {isUk ? "Замовити аналог" : "Order similar"}
              </div>
              <div className="font-heading font-extrabold text-neutral-900 dark:text-white text-lg leading-none">
                {isUk ? `від ₴${priceUah.toLocaleString("uk-UA")}` : `from £${priceGbp}`}
              </div>
              <div className="text-[11px] text-neutral-400 mt-0.5 flex items-center gap-1">
                <Clock className="w-3 h-3 shrink-0" />
                {isUk ? `${deliveryDays}+ днів` : `${deliveryDays}+ days`}
              </div>
            </div>
            <Link
              href={`/${lang}/contact?project=${project.slug}&complexity=${project.complexity}`}
              className="shrink-0 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm flex items-center gap-2 transition-colors shadow-lg shadow-indigo-500/25"
            >
              <ShoppingCart className="w-4 h-4" />
              {isUk ? "Замовити" : "Order Now"}
            </Link>
          </div>

        </main>
        <Footer />
      </div>
    </>
  );
}
