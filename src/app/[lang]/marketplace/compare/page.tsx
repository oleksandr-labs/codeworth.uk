"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { NICHES_DATA, getNicheLocalized } from "@/lib/data/niches";
import { ArrowLeft, Check, X, Eye } from "lucide-react";
import { useLocale } from "@/components/layout/LocaleProvider";
import { EmojiIcon } from "@/components/ui/EmojiIcon";

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

function CompareContent() {
  const lang = useLocale();
  const isUk = lang === "uk";
  const COMPLEXITY_LABEL = isUk ? COMPLEXITY_LABEL_UK : COMPLEXITY_LABEL_EN;

  const searchParams = useSearchParams();
  const slugsParam = searchParams.get("slugs") || "";
  const slugs = slugsParam.split(",").filter(Boolean);

  const niches = slugs
    .map((slug) => getNicheLocalized(slug, lang) ?? NICHES_DATA.find((n) => n.slug === slug))
    .filter(Boolean) as typeof NICHES_DATA;

  if (niches.length < 2) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main id="main-content" className="flex-1">
          <section className="pt-32 pb-20">
            <Container>
              <div className="max-w-lg mx-auto text-center">
                <p className="text-6xl mb-6">⚖️</p>
                <h1 className="text-3xl font-heading font-extrabold text-neutral-900 dark:text-white mb-4">
                  {isUk ? "Оберіть мінімум 2 рішення" : "Select at least 2 solutions"}
                </h1>
                <p className="text-neutral-500 dark:text-neutral-400 mb-8">
                  {isUk
                    ? "Для порівняння потрібно обрати 2–3 нішевих рішення з каталогу."
                    : "To compare, select 2–3 niche solutions from the catalog."}
                </p>
                <Link
                  href={`/${lang}/marketplace/catalog`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> {isUk ? "До каталогу" : "To Catalog"}
                </Link>
              </div>
            </Container>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  // Gather all unique features across selected niches
  const allFeatures = Array.from(new Set(niches.flatMap((n) => n.features)));
  const allTech = Array.from(new Set(niches.flatMap((n) => n.tech)));
  const allPages = Array.from(new Set(niches.flatMap((n) => n.pages)));

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main id="main-content" className="flex-1">

        {/* Hero */}
        <section className="pt-32 pb-12 gradient-hero">
          <Container>
            <Link
              href={`/${lang}/marketplace/catalog`}
              className="inline-flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-700 font-medium mb-6"
            >
              <ArrowLeft className="w-4 h-4" /> {isUk ? "Назад до каталогу" : "Back to Catalog"}
            </Link>
            <h1 className="text-4xl font-heading font-extrabold text-neutral-900 dark:text-white mb-2">
              {isUk ? "Порівняння рішень" : "Solution Comparison"}
            </h1>
            <p className="text-neutral-500">
              {isUk
                ? `Порівняйте ${niches.length} нішевих рішення та оберіть найкраще для вашого бізнесу`
                : `Compare ${niches.length} niche solutions and choose the best one for your business`}
            </p>
          </Container>
        </section>

        {/* Comparison table */}
        <section className="py-16 bg-white dark:bg-neutral-950">
          <Container>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr>
                    <th className="text-left p-4 bg-neutral-50 dark:bg-neutral-900 rounded-tl-xl font-heading font-bold text-neutral-600 dark:text-neutral-300 text-sm w-48">
                      {isUk ? "Параметр" : "Parameter"}
                    </th>
                    {niches.map((n) => (
                      <th key={n.slug} className="p-4 bg-neutral-50 dark:bg-neutral-900 text-center last:rounded-tr-xl">
                        <div className={`w-14 h-14 rounded-2xl bg-linear-to-br ${n.gradient} flex items-center justify-center mx-auto mb-3`}>
                          <EmojiIcon emoji={n.emoji} className="w-12 h-12 text-white/80" />
                        </div>
                        <div className="font-heading font-bold text-neutral-900 dark:text-white text-sm">{n.title}</div>
                        <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{n.subtitle}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {/* Price */}
                  <tr>
                    <td className="p-4 text-sm font-medium text-neutral-700">{isUk ? "Ціна від" : "Price from"}</td>
                    {niches.map((n) => (
                      <td key={n.slug} className="p-4 text-center">
                        <span className="text-lg font-heading font-extrabold text-neutral-900">
                          {n.priceFrom.toLocaleString(isUk ? "uk-UA" : "en-US")} ₴
                        </span>
                      </td>
                    ))}
                  </tr>
                  {/* Complexity */}
                  <tr>
                    <td className="p-4 text-sm font-medium text-neutral-700">{isUk ? "Складність" : "Complexity"}</td>
                    {niches.map((n) => (
                      <td key={n.slug} className="p-4 text-center">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${COMPLEXITY_COLOR[n.complexity]}`}>
                          {COMPLEXITY_LABEL[n.complexity]}
                        </span>
                      </td>
                    ))}
                  </tr>
                  {/* Delivery */}
                  <tr>
                    <td className="p-4 text-sm font-medium text-neutral-700">{isUk ? "Термін запуску" : "Launch Time"}</td>
                    {niches.map((n) => (
                      <td key={n.slug} className="p-4 text-center text-sm text-neutral-700">
                        {n.deliveryDays} {isUk ? "днів" : "days"}
                      </td>
                    ))}
                  </tr>
                  {/* Pages */}
                  <tr>
                    <td className="p-4 text-sm font-medium text-neutral-700">{isUk ? "Кількість сторінок" : "Number of Pages"}</td>
                    {niches.map((n) => (
                      <td key={n.slug} className="p-4 text-center text-sm text-neutral-700">
                        {n.pages.length}
                      </td>
                    ))}
                  </tr>
                  {/* Features */}
                  {allFeatures.slice(0, 10).map((feature) => (
                    <tr key={feature}>
                      <td className="p-4 text-sm text-neutral-600">{feature}</td>
                      {niches.map((n) => (
                        <td key={n.slug} className="p-4 text-center">
                          {n.features.includes(feature) ? (
                            <Check className="w-5 h-5 text-emerald-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-neutral-300 mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                  {/* Tech */}
                  <tr>
                    <td className="p-4 text-sm font-medium text-neutral-700">{isUk ? "Технології" : "Technologies"}</td>
                    {niches.map((n) => (
                      <td key={n.slug} className="p-4 text-center">
                        <div className="flex flex-wrap justify-center gap-1">
                          {n.tech.slice(0, 5).map((t) => (
                            <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600">
                              {t}
                            </span>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap justify-center gap-4 mt-12">
              {niches.map((n) => (
                <Link
                  key={n.slug}
                  href={`/${lang}/niches/${n.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-indigo-200 text-indigo-700 font-semibold text-sm hover:bg-indigo-50 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  {isUk ? `Демо ${n.title}` : `Demo ${n.title}`}
                </Link>
              ))}
              <Link
                href={`/${lang}/contact`}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-colors"
              >
                {isUk ? "Замовити консультацію" : "Book a Consultation"}
              </Link>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col min-h-screen">
        <Header />
        <main id="main-content" className="flex-1 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
        </main>
        <Footer />
      </div>
    }>
      <CompareContent />
    </Suspense>
  );
}
