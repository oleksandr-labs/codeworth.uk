import type { Metadata } from "next";
import { buildAlternates } from "@/i18n";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { NICHES_DATA, getNicheLocalized, NICHE_CATEGORY_EN } from "@/lib/data/niches";
import { ArrowRight, Eye, Check, X } from "lucide-react";
import { EmojiIcon } from "@/components/ui/EmojiIcon";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isUk = lang === "uk";
  return {
    title: isUk
      ? `Готові рішення для ${NICHES_DATA.length}+ ніш — Codeworth | від £499 | 3–7 днів`
      : `Ready-Made Solutions for ${NICHES_DATA.length}+ Business Niches — Codeworth | from £499`,
    description: isUk
      ? `${NICHES_DATA.length}+ живих демо-сайтів для ресторанів, салонів краси, клінік, магазинів, юристів, фітнес-клубів та інших. Перегляньте демо — замовте за 3–7 днів від £499.`
      : `${NICHES_DATA.length}+ live demo sites for restaurants, beauty salons, clinics, stores, lawyers, fitness clubs and more. View the demo — order in 3–7 days from £499.`,
    openGraph: {
      title: isUk
        ? `Готові рішення для ${NICHES_DATA.length}+ ніш — Codeworth | від £499`
        : `Ready-Made Solutions for ${NICHES_DATA.length}+ Solutions — Codeworth | from £499`,
      description: isUk
        ? `${NICHES_DATA.length}+ живих демо-сайтів. Запуск за 3–7 днів від £499. Адаптуємо під ваш бренд.`
        : `${NICHES_DATA.length}+ live demos. Launch in 3–7 days from £499. Customized for your brand.`,
      type: "website",
      url: `https://codeworth.uk/${lang}/niches`,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: isUk ? "Нішеві сайти Codeworth" : "Codeworth Niche Websites" }],
    },
    twitter: {
      card: "summary_large_image",
      title: isUk
        ? `Готові рішення для ${NICHES_DATA.length}+ ніш — Codeworth | від £499`
        : `Ready-Made Solutions for ${NICHES_DATA.length}+ Solutions — Codeworth | from £499`,
      images: ["/opengraph-image"],
    },
    alternates: buildAlternates(lang, 'niches'),
  };
}

const COMPLEXITY_LABEL_UK: Record<string, string> = {
  simple: "Простий",
  medium: "Середній",
  complex: "Складний",
};

const COMPLEXITY_LABEL_EN: Record<string, string> = {
  simple: "Simple",
  medium: "Medium",
  complex: "Complex",
};

const COMPLEXITY_COLOR: Record<string, string> = {
  simple: "bg-emerald-100 text-emerald-700",
  medium: "bg-amber-100 text-amber-700",
  complex: "bg-indigo-100 text-indigo-700",
};

// Group niches by category (UK categories — translated per locale inside component)
const CATEGORIES_UK = Array.from(new Set(NICHES_DATA.map((n) => n.category)));

const COMPARISON_UK = [
  { feature: "Ціна", ready: "від 4 900 грн", custom: "від 15 000 грн", readyWin: true },
  { feature: "Терміни запуску", ready: "3 дні", custom: "3–8 тижнів", readyWin: true },
  { feature: "Унікальний дизайн", ready: "Адаптований бренд", custom: "Повністю унікальний", readyWin: false },
  { feature: "SEO-оптимізація", ready: "Вбудована", custom: "Вбудована", readyWin: true },
  { feature: "Кастомний функціонал", ready: "Обмежено", custom: "Будь-який", readyWin: false },
  { feature: "Ризик запуску", ready: "Мінімальний", custom: "Середній", readyWin: true },
  { feature: "Підходить для", ready: "Старт, MVP, бюджет", custom: "Амбітний бренд, складний продукт", readyWin: null },
];

const COMPARISON_EN = [
  { feature: "Price", ready: "from £120", custom: "from £375", readyWin: true },
  { feature: "Launch time", ready: "3 days", custom: "3–8 weeks", readyWin: true },
  { feature: "Unique design", ready: "Branded adaptation", custom: "Fully unique", readyWin: false },
  { feature: "SEO optimisation", ready: "Built-in", custom: "Built-in", readyWin: true },
  { feature: "Custom features", ready: "Limited", custom: "Any", readyWin: false },
  { feature: "Launch risk", ready: "Minimal", custom: "Medium", readyWin: true },
  { feature: "Best for", ready: "Start-up, MVP, tight budget", custom: "Ambitious brand, complex product", readyWin: null },
];

export default async function NichesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isUk = lang === "uk";
  const COMPLEXITY_LABEL = isUk ? COMPLEXITY_LABEL_UK : COMPLEXITY_LABEL_EN;
  const CATEGORIES = CATEGORIES_UK;
  const COMPARISON = isUk ? COMPARISON_UK : COMPARISON_EN;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isUk ? "Головна" : "Home", item: `https://codeworth.uk/${lang}` },
      { "@type": "ListItem", position: 2, name: isUk ? "Рішення" : "Solutions", item: `https://codeworth.uk/${lang}/niches` },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: isUk ? "Готові сайти для бізнесу" : "Ready-Made Business Websites",
    numberOfItems: NICHES_DATA.length,
    itemListElement: NICHES_DATA.map((n, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: n.title,
      url: `https://codeworth.uk/${lang}/niches/${n.slug}`,
    })),
  };

  // Product schema for each niche solution
  const productsSchema = {
    "@context": "https://schema.org",
    "@graph": NICHES_DATA.map((n) => ({
      "@type": "Product",
      name: n.title,
      description: n.subtitle,
      url: `https://codeworth.uk/${lang}/niches/${n.slug}`,
      brand: { "@type": "Brand", name: "Codeworth" },
      offers: {
        "@type": "Offer",
        priceCurrency: isUk ? "UAH" : "GBP",
        price: isUk ? String(n.priceFrom) : String(Math.ceil(n.priceFrom / 40 / 5) * 5),
        availability: "https://schema.org/InStock",
        url: `https://codeworth.uk/${lang}/niches/${n.slug}`,
      },
    })),
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productsSchema) }} />
      <main id="main-content" className="flex-1">

        {/* Hero */}
        <section className="pt-32 pb-20 bg-neutral-950 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-5"
            style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          <Container className="relative">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-4">
                {isUk ? `${NICHES_DATA.length} готових рішень` : `${NICHES_DATA.length} ready-made solutions`}
              </p>
              <h1 className="text-4xl lg:text-6xl font-heading font-extrabold mb-6 leading-tight">
                {isUk ? <>{"Сайт для вашої "}<span className="bg-linear-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">{"ніші бізнесу"}</span></> : <>{"A website for your "}<span className="bg-linear-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">{"business niche"}</span></>}
              </h1>
              <p className="text-lg text-neutral-400 max-w-2xl mx-auto mb-8">
                {isUk
                  ? "Кожне рішення розроблене під конкретний тип бізнесу — з потрібними секціями, функціями та SEO. Перегляньте live demo та замовте запуск за 3 дні."
                  : "Each solution is built for a specific business type — with the right sections, features, and SEO. View the live demo and order your launch in 3 days."}
              </p>
              <Link
                href={`/${lang}/marketplace`}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-colors"
              >
                {isUk ? "Перейти в маркетплейс" : "Go to Marketplace"} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Container>
        </section>

        {/* Niche grid by category */}
        {CATEGORIES.map((ukCategory) => {
          const niches = NICHES_DATA.filter((n) => n.category === ukCategory);
          const categoryLabel = isUk ? ukCategory : (NICHE_CATEGORY_EN[ukCategory] ?? ukCategory);
          return (
            <section key={ukCategory} className="py-16 border-b border-neutral-100 dark:border-neutral-700 last:border-b-0">
              <Container>
                <h2 className="text-2xl font-heading font-extrabold text-neutral-900 dark:text-white mb-8">
                  {categoryLabel}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {niches.map((rawNiche) => {
                    const niche = getNicheLocalized(rawNiche.slug, lang) ?? rawNiche;
                    return (
                    <Link
                      key={niche.slug}
                      href={`/${lang}/niches/${niche.slug}`}
                      className="group rounded-2xl border border-neutral-100 dark:border-neutral-700 overflow-hidden hover:shadow-lg hover:shadow-neutral-200/60 transition-all duration-300 hover:-translate-y-1 bg-white"
                    >
                      {/* Gradient header */}
                      <div className={`h-24 bg-linear-to-br ${niche.gradient} flex items-center justify-center relative`}>
                        <EmojiIcon emoji={niche.emoji} className="w-12 h-12 text-white/80" />
                        <div className="absolute top-3 right-3 flex items-center gap-1.5">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${COMPLEXITY_COLOR[niche.complexity]}`}>
                            {COMPLEXITY_LABEL[niche.complexity]}
                          </span>
                        </div>
                      </div>
                      {/* Content */}
                      <div className="p-5">
                        <h3 className="font-heading font-bold text-neutral-900 dark:text-white mb-1 group-hover:text-indigo-700 transition-colors">
                          {niche.title}
                        </h3>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed mb-3 line-clamp-2">
                          {niche.subtitle}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-heading font-extrabold text-neutral-900">
                            {isUk ? `від ${niche.priceFrom.toLocaleString("uk-UA")} ₴` : `from $${Math.round(niche.priceFrom / 40)}`}
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs text-indigo-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                            <Eye className="w-3.5 h-3.5" /> {isUk ? "Демо" : "Demo"}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ); })}
                </div>
              </Container>
            </section>
          );
        })}

        {/* Custom vs Ready-Made comparison */}
        <section className="py-24 bg-white dark:bg-neutral-800 border-t border-neutral-100">
          <Container>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
                {isUk ? "Як обрати" : "How to Choose"}
              </p>
              <h2 className="text-4xl font-heading font-extrabold text-neutral-900">
                {isUk ? "Готове рішення vs розробка з нуля" : "Ready-Made vs Custom Development"}
              </h2>
              <p className="mt-4 text-neutral-500">
                {isUk
                  ? "Порівняйте два підходи і оберіть той, що підходить вашому бізнесу."
                  : "Compare both approaches and choose what fits your business best."}
              </p>
            </div>
            <div className="max-w-3xl mx-auto overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left px-5 py-4 font-heading font-bold text-neutral-500 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-900 rounded-tl-xl w-1/3">{isUk ? "Параметр" : "Feature"}</th>
                    <th className="px-5 py-4 font-heading font-bold text-white bg-indigo-600 text-center">
                      {isUk ? "✅ Готове рішення" : "✅ Ready-Made"}
                    </th>
                    <th className="px-5 py-4 font-heading font-bold text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 text-center rounded-tr-xl">
                      {isUk ? "Розробка з нуля" : "Custom Build"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row, i) => (
                    <tr key={row.feature} className={i % 2 === 0 ? "bg-white" : "bg-neutral-50/50"}>
                      <td className="px-5 py-3.5 font-semibold text-neutral-700">{row.feature}</td>
                      <td className="px-5 py-3.5 text-center">
                        <span className={`inline-flex items-center gap-1.5 ${row.readyWin === true ? "text-emerald-700 font-semibold" : row.readyWin === false ? "text-neutral-500" : "text-neutral-600"}`}>
                          {row.readyWin === true && <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />}
                          {row.ready}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        <span className={`inline-flex items-center gap-1.5 ${row.readyWin === false ? "text-emerald-700 font-semibold" : "text-neutral-500"}`}>
                          {row.readyWin === false && <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />}
                          {row.custom}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="max-w-3xl mx-auto mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${lang}/marketplace`} className="flex-1 text-center px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-colors">
                {isUk ? "Обрати готове рішення" : "Choose Ready-Made"}
              </Link>
              <Link href={`/${lang}/services/website-dev`} className="flex-1 text-center px-6 py-3.5 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 font-semibold hover:border-indigo-200 hover:bg-indigo-50 transition-all">
                {isUk ? "Замовити розробку з нуля" : "Order Custom Development"}
              </Link>
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-20 bg-neutral-50 dark:bg-neutral-900 ">
          <Container>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-heading font-extrabold text-neutral-900 dark:text-white mb-4">
                {isUk ? "Не знайшли свою нішу?" : "Don't see your niche?"}
              </h2>
              <p className="text-neutral-500 dark:text-neutral-400 mb-8">
                {isUk
                  ? "Ми розробляємо сайти для будь-якого типу бізнесу. Напишіть нам — обговоримо ваш проєкт."
                  : "We build websites for any type of business. Write to us — let's discuss your project."}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href={`/${lang}/contact`}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-colors"
                >
                  {isUk ? "Замовити консультацію" : "Request a Consultation"} <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href={`/${lang}/services`}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 font-semibold hover:border-indigo-200 hover:bg-indigo-50 transition-all"
                >
                  {isUk ? "Послуги під замовлення" : "Custom Services"}
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
