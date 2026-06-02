import type { Metadata } from "next";
import Link from "next/link";
import { buildAlternates } from "@/i18n";
import { AI_NICHES } from "@/lib/data/aiNiches";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { ArrowRight, Sparkles } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isUk = lang === "uk";

  const title = isUk
    ? "Штучний інтелект для бізнесу | AI-рішення по галузях | CodeNest"
    : "AI Solutions by Industry | Artificial Intelligence for Business | CodeNest";
  const description = isUk
    ? "10 спеціалізованих AI-рішень для медицини, e-commerce, FinTech, маркетингу та інших галузей. Від £1,200. Кейси, пакети та ціни."
    : "10 specialised AI solutions for healthcare, e-commerce, FinTech, marketing and more. From £1,200. Real cases, packages and pricing.";

  return {
    title,
    description,
    alternates: buildAlternates(lang, "/ai"),
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://codeworth.uk/${lang}/ai`,
    },
  };
}

export default async function AIHubPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const isUk = lang === "uk";

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: isUk ? "AI-рішення CodeNest по галузях" : "CodeNest AI Solutions by Industry",
    description: isUk
      ? "Спеціалізовані AI-розробки для 10 галузей"
      : "Specialised AI development for 10 industries",
    url: `https://codeworth.uk/${lang}/ai`,
    hasPart: AI_NICHES.map((n) => ({
      "@type": "Service",
      name: isUk ? n.h1Uk : n.h1En,
      url: `https://codeworth.uk/${lang}/ai/${n.slug}`,
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
        <section className="relative py-20 bg-linear-to-br from-violet-950 via-indigo-950 to-slate-950 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-900/30 via-transparent to-transparent" />
          <Container className="relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-300 text-sm mb-6">
                <Sparkles className="w-4 h-4" />
                {isUk ? "AI по галузях" : "AI by Industry"}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {isUk
                  ? "Штучний інтелект для вашої галузі"
                  : "Artificial Intelligence for Your Industry"}
              </h1>
              <p className="text-xl text-slate-300 mb-8">
                {isUk
                  ? "Ми не будуємо «AI взагалі». Кожне рішення адаптоване до специфіки галузі — процесів, регуляторних вимог та метрик успіху."
                  : "We don't build 'AI in general'. Every solution is tailored to industry-specific workflows, compliance requirements and success metrics."}
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-slate-400 mb-8">
                <span>✓ {isUk ? "10 галузей" : "10 industries"}</span>
                <span>✓ {isUk ? "Від £1,200" : "From £1,200"}</span>
                <span>✓ {isUk ? "Реальні кейси" : "Real cases"}</span>
                <span>✓ {isUk ? "GPT-4o / RAG / Fine-tuning" : "GPT-4o / RAG / Fine-tuning"}</span>
              </div>
              <Link
                href={`/${lang}/ai-solutions`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-violet-400/40 bg-violet-500/10 text-violet-200 text-sm font-semibold hover:bg-violet-500/20 transition-colors"
              >
                {isUk ? "Каталог готових AI-продуктів (30+)" : "Browse ready AI products catalog (30+)"}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Container>
        </section>

        {/* Niche grid */}
        <section className="py-16 bg-slate-950">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {AI_NICHES.map((niche) => (
                <Link
                  key={niche.slug}
                  href={`/${lang}/ai/${niche.slug}`}
                  className="group relative block rounded-2xl border border-slate-800 bg-slate-900 hover:border-slate-600 transition-all duration-200 overflow-hidden"
                >
                  <div className={`h-1.5 w-full bg-linear-to-r ${niche.gradient}`} />
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-3xl">{niche.iconEmoji}</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-slate-800 text-slate-400">
                        {isUk ? "AI" : "AI"}
                      </span>
                    </div>
                    <h2 className="text-lg font-semibold text-white mb-2 group-hover:text-violet-300 transition-colors">
                      {isUk ? niche.h1Uk : niche.h1En}
                    </h2>
                    <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                      {isUk ? niche.subtitleUk : niche.subtitleEn}
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-slate-500 mb-0.5">
                          {isUk ? "Метрика" : "Key metric"}
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
                  <div className="px-6 pb-4 flex items-center gap-1 text-sm text-violet-400 group-hover:text-violet-300 transition-colors">
                    {isUk ? "Детальніше" : "View details"}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>

        {/* Cross-link to ML */}
        <section className="py-10 bg-slate-900 border-t border-slate-800">
          <Container>
            <div className="rounded-2xl border border-blue-800/50 bg-blue-950/30 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-1">
                  {isUk ? "Потрібна кастомна ML-модель?" : "Need a custom ML model?"}
                </p>
                <h3 className="text-base font-bold text-white mb-1">
                  {isUk ? "Machine Learning по галузях" : "Machine Learning by Industry"}
                </h3>
                <p className="text-sm text-slate-400">
                  {isUk
                    ? "Fraud detection, прогноз попиту, churn prediction, MLOps — 10 ML-рішень для Enterprise."
                    : "Fraud detection, demand forecasting, churn prediction, MLOps — 10 ML solutions for Enterprise."}
                </p>
              </div>
              <Link
                href={`/${lang}/ml`}
                className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-blue-700 hover:bg-blue-900/40 text-blue-300 font-semibold text-sm transition-colors"
              >
                {isUk ? "Переглянути ML-рішення" : "Browse ML solutions"}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-16 bg-linear-to-r from-violet-950 to-indigo-950 border-t border-slate-800">
          <Container className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              {isUk ? "Не знаєте з чого почати?" : "Not sure where to start?"}
            </h2>
            <p className="text-slate-300 mb-8 max-w-xl mx-auto">
              {isUk
                ? "Розкажіть про ваш бізнес — ми підберемо оптимальне AI-рішення безкоштовно."
                : "Tell us about your business — we'll identify the optimal AI solution at no cost."}
            </p>
            <Link
              href={`/${lang}/contact`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-colors"
            >
              {isUk ? "Безкоштовна консультація" : "Free consultation"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
