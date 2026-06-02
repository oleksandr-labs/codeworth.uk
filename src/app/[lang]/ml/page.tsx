import type { Metadata } from "next";
import Link from "next/link";
import { buildAlternates } from "@/i18n";
import { ML_NICHES } from "@/lib/data/mlNiches";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { ArrowRight, TrendingUp } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isUk = lang === "uk";

  const title = isUk
    ? "Машинне навчання для бізнесу | ML-рішення по галузях | CodeNest"
    : "Machine Learning by Industry | ML Solutions for Business | CodeNest";
  const description = isUk
    ? "10 спеціалізованих ML-рішень для банків, рітейлу, SaaS, логістики та інших галузей. Від £4,000. Реальні кейси, пакети та ROI."
    : "10 specialised ML solutions for banking, retail, SaaS, logistics and more. From £4,000. Real cases, packages and ROI metrics.";

  return {
    title,
    description,
    alternates: buildAlternates(lang, "/ml"),
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://codeworth.uk/${lang}/ml`,
    },
  };
}

export default async function MLHubPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const isUk = lang === "uk";

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: isUk ? "ML-рішення CodeNest по галузях" : "CodeNest ML Solutions by Industry",
    description: isUk
      ? "Спеціалізовані ML-розробки для 10 галузей"
      : "Specialised machine learning development for 10 industries",
    url: `https://codeworth.uk/${lang}/ml`,
    hasPart: ML_NICHES.map((n) => ({
      "@type": "Service",
      name: isUk ? n.h1Uk : n.h1En,
      url: `https://codeworth.uk/${lang}/ml/${n.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Header />
      <main>
        {/* Hero */}
        <section className="relative py-20 bg-linear-to-br from-blue-950 via-indigo-950 to-slate-950 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/30 via-transparent to-transparent" />
          <Container className="relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-sm mb-6">
                <TrendingUp className="w-4 h-4" />
                {isUk ? "ML по галузях" : "ML by Industry"}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {isUk
                  ? "Машинне навчання для вашої галузі"
                  : "Machine Learning for Your Industry"}
              </h1>
              <p className="text-xl text-slate-300 mb-8">
                {isUk
                  ? "ML — це не магія, це математика на ваших даних. Ми будуємо моделі, що вирішують конкретні бізнес-задачі з вимірюваним ROI."
                  : "ML isn't magic — it's maths applied to your data. We build models that solve specific business problems with measurable ROI."}
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                <span>✓ {isUk ? "10 галузей" : "10 industries"}</span>
                <span>✓ {isUk ? "Від £4,000" : "From £4,000"}</span>
                <span>✓ {isUk ? "XAI для регульованих галузей" : "XAI for regulated industries"}</span>
                <span>✓ {isUk ? "MLOps включено" : "MLOps included"}</span>
              </div>
            </div>
          </Container>
        </section>

        {/* Niche grid */}
        <section className="py-16 bg-slate-950">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ML_NICHES.map((niche) => (
                <Link
                  key={niche.slug}
                  href={`/${lang}/ml/${niche.slug}`}
                  className="group relative block rounded-2xl border border-slate-800 bg-slate-900 hover:border-slate-600 transition-all duration-200 overflow-hidden"
                >
                  <div className={`h-1.5 w-full bg-linear-to-r ${niche.gradient}`} />
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-3xl">{niche.iconEmoji}</span>
                      <div className="flex items-center gap-1.5">
                        {niche.xaiRequired && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-amber-900/50 border border-amber-700/50 text-amber-300">
                            XAI
                          </span>
                        )}
                        <span className="text-xs px-2 py-1 rounded-full bg-slate-800 text-slate-400">
                          {niche.audienceType}
                        </span>
                      </div>
                    </div>
                    <h2 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">
                      {isUk ? niche.h1Uk : niche.h1En}
                    </h2>
                    <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                      {isUk ? niche.subtitleUk : niche.subtitleEn}
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-slate-500 mb-0.5">
                          {isUk ? "Ключова метрика" : "Key metric"}
                        </div>
                        <div className="text-sm font-medium text-emerald-400">
                          {niche.cardMetricEn}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-500 mb-0.5">
                          {isUk ? "Ціна від" : "From"}
                        </div>
                        <div className="text-sm font-medium text-white">
                          {isUk
                            ? `${niche.priceFromUAH.toLocaleString()} ₴`
                            : `£${niche.priceFromGBP.toLocaleString()}`}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-6 pb-4 flex items-center gap-1 text-sm text-blue-400 group-hover:text-blue-300 transition-colors">
                    {isUk ? "Детальніше" : "View details"}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>

        {/* Cross-link to AI */}
        <section className="py-10 bg-slate-900 border-t border-slate-800">
          <Container>
            <div className="rounded-2xl border border-violet-800/50 bg-violet-950/30 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-1">
                  {isUk ? "Потрібен AI чат-бот або RAG?" : "Need an AI chatbot or RAG?"}
                </p>
                <h3 className="text-base font-bold text-white mb-1">
                  {isUk ? "Штучний інтелект по галузях" : "Artificial Intelligence by Industry"}
                </h3>
                <p className="text-sm text-slate-400">
                  {isUk
                    ? "GPT-боти, RAG, NLP, комп'ютерний зір — 10 AI-рішень для вашої галузі від £1,200."
                    : "GPT chatbots, RAG, NLP, computer vision — 10 AI solutions for your industry from £1,200."}
                </p>
              </div>
              <Link
                href={`/${lang}/ai`}
                className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-violet-700 hover:bg-violet-900/40 text-violet-300 font-semibold text-sm transition-colors"
              >
                {isUk ? "Переглянути AI-рішення" : "Browse AI solutions"}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-16 bg-linear-to-r from-blue-950 to-indigo-950 border-t border-slate-800">
          <Container className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              {isUk ? "Які дані у вас є?" : "What data do you have?"}
            </h2>
            <p className="text-slate-300 mb-8 max-w-xl mx-auto">
              {isUk
                ? "Покажіть нам ваші дані — ми скажемо, яку ML-модель можна побудувати і яку цінність вона принесе."
                : "Show us your data — we'll tell you what ML model to build and what business value it will deliver."}
            </p>
            <Link
              href={`/${lang}/contact`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors"
            >
              {isUk ? "Безкоштовна оцінка даних" : "Free data assessment"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
