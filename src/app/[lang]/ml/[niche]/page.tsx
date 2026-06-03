import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buildAlternates } from "@/i18n";
import { ML_NICHES } from "@/lib/data/mlNiches";
import { getMLNicheBySlug, formatNichePrice, getGlossaryTermsForNichePage, getBlogPostsForNichePage } from "@/lib/nicheUtils";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { Check, ChevronRight, ArrowRight, Database, TrendingUp, BookOpen, Shield } from "lucide-react";
import { EmojiIcon } from "@/components/ui/EmojiIcon";

export async function generateStaticParams() {
  return ML_NICHES.map((n) => ({ niche: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; niche: string }>;
}): Promise<Metadata> {
  const { lang, niche: nicheSlug } = await params;
  const niche = getMLNicheBySlug(nicheSlug);
  if (!niche) return {};

  const isUk = lang === "uk";
  const title = isUk ? niche.metaTitleUk : niche.metaTitleEn;
  const description = isUk ? niche.metaDescriptionUk : niche.metaDescriptionEn;
  const keywords = isUk
    ? [niche.keywordsUk.primary, ...niche.keywordsUk.secondary, ...(niche.keywordsUk.localUk ?? [])]
    : [niche.keywordsEn.primary, ...niche.keywordsEn.secondary, ...(niche.keywordsEn.localEn ?? [])];

  return {
    title,
    description,
    keywords,
    alternates: buildAlternates(lang, `/ml/${niche.slug}`),
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://codeworth.uk/${lang}/ml/${niche.slug}`,
    },
  };
}

export default async function MLNichePage({
  params,
}: {
  params: Promise<{ lang: string; niche: string }>;
}) {
  const { lang, niche: nicheSlug } = await params;
  const niche = getMLNicheBySlug(nicheSlug);
  if (!niche) notFound();

  const isUk = lang === "uk";

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: isUk ? niche.h1Uk : niche.h1En,
    description: isUk ? niche.descriptionUk : niche.descriptionEn,
    serviceType: niche.schemaServiceType,
    provider: {
      "@type": "Organization",
      name: "Codeworth",
      url: "https://codeworth.uk",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "GBP",
      price: niche.schemaPriceGBP,
      priceSpecification: { "@type": "PriceSpecification", minPrice: niche.schemaPriceGBP, priceCurrency: "GBP" },
    },
    url: `https://codeworth.uk/${lang}/ml/${niche.slug}`,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: niche.faq.map((f) => ({
      "@type": "Question",
      name: isUk ? f.questionUk : f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: isUk ? f.answerUk : f.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isUk ? "Головна" : "Home", item: `https://codeworth.uk/${lang}` },
      { "@type": "ListItem", position: 2, name: isUk ? "ML-рішення" : "ML Solutions", item: `https://codeworth.uk/${lang}/ml` },
      { "@type": "ListItem", position: 3, name: isUk ? niche.h1Uk : niche.h1En, item: `https://codeworth.uk/${lang}/ml/${niche.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <main>

        {/* Hero */}
        <section className={`relative py-20 bg-linear-to-br ${niche.gradient} overflow-hidden`}>
          <div className="absolute inset-0 bg-black/55" />
          <Container className="relative z-10">
            <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
              <Link href={`/${lang}`} className="hover:text-white transition-colors">{isUk ? "Головна" : "Home"}</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href={`/${lang}/ml`} className="hover:text-white transition-colors">{isUk ? "ML-рішення" : "ML Solutions"}</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">{niche.industry}</span>
            </nav>
            <div className="max-w-3xl">
              <div className="text-4xl mb-4">{niche.iconEmoji}</div>
              <div className="flex flex-wrap gap-2 mb-4">
                {niche.xaiRequired && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs">
                    <Shield className="w-3 h-3" />
                    {isUk ? "XAI обов'язково" : "XAI required"}
                  </span>
                )}
                {niche.regulatoryContext && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-300 text-xs">
                    {isUk ? "Регульована галузь" : "Regulated industry"}
                  </span>
                )}
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/10 text-white/70 text-xs">
                  {niche.audienceType}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {isUk ? niche.h1Uk : niche.h1En}
              </h1>
              <p className="text-xl text-white/80 mb-8">
                {isUk ? niche.subtitleUk : niche.subtitleEn}
              </p>
              <div className="flex flex-wrap gap-6 text-sm text-white/70 mb-8">
                <div>
                  <div className="text-white/50 mb-1">{isUk ? "Ціна від" : "From"}</div>
                  <div className="text-lg font-semibold text-white">{formatNichePrice(niche, lang)}</div>
                </div>
                <div>
                  <div className="text-white/50 mb-1">{isUk ? "ROI за" : "ROI in"}</div>
                  <div className="text-lg font-semibold text-white">{niche.roiTimeframe}</div>
                </div>
                <div>
                  <div className="text-white/50 mb-1">{isUk ? "Ключова метрика" : "Key metric"}</div>
                  <div className="text-lg font-semibold text-emerald-300">{niche.cardMetricEn}</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/${lang}/contact`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white text-slate-900 font-semibold hover:bg-white/90 transition-colors"
                >
                  {isUk ? "Оцінити датасет" : "Assess your dataset"}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href={`/${lang}/services/${niche.relatedServiceSlug}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white/30 text-white hover:bg-white/10 transition-colors"
                >
                  {isUk ? "ML-сервіс" : "ML service"}
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Description + ROI */}
        <section className="py-16 bg-slate-950">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {isUk ? "Про рішення" : "About this solution"}
                </h2>
                <p className="text-slate-300 leading-relaxed text-lg mb-8">
                  {isUk ? niche.descriptionUk : niche.descriptionEn}
                </p>

                {/* Algorithms */}
                <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
                  <h3 className="text-sm font-medium text-blue-400 mb-3">
                    {isUk ? "Алгоритми" : "Algorithms"}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {niche.algorithms.map((algo) => (
                      <span key={algo} className="text-xs px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
                        {algo}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* ROI metrics */}
              <div className="space-y-4">
                <div className="rounded-xl border border-emerald-800/50 bg-emerald-950/30 p-5">
                  <div className="flex items-center gap-2 text-emerald-400 mb-3">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-medium">{isUk ? "ROI метрики" : "ROI metrics"}</span>
                  </div>
                  <div className="space-y-3">
                    {niche.roiMetrics.map((metric) => (
                      <div key={metric.metricName} className="border-b border-emerald-900/50 pb-3 last:border-0 last:pb-0">
                        <div className="text-xl font-bold text-emerald-300">{metric.value}</div>
                        <div className="text-sm text-slate-300">{metric.metricName}</div>
                        <div className="text-xs text-slate-500">{metric.timeframe}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Data requirements */}
                <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
                  <div className="flex items-center gap-2 text-blue-400 mb-3">
                    <Database className="w-4 h-4" />
                    <span className="text-sm font-medium">{isUk ? "Дані" : "Data needed"}</span>
                  </div>
                  <div className="text-xs text-slate-500 mb-3">
                    {isUk ? "Мінімальний датасет" : "Minimum dataset"}: {niche.minDatasetSize}
                  </div>
                  <div className="space-y-2">
                    {niche.dataRequirements.map((req) => (
                      <div key={req.dataType} className="text-xs">
                        <div className="font-medium text-slate-300">{req.dataType}</div>
                        <div className="text-slate-500">{req.minVolume} · {req.format}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {niche.regulatoryContext && (
                  <div className="rounded-xl border border-amber-800/50 bg-amber-950/20 p-5">
                    <div className="flex items-center gap-2 text-amber-400 mb-2">
                      <Shield className="w-4 h-4" />
                      <span className="text-sm font-medium">{isUk ? "Регулювання" : "Regulatory"}</span>
                    </div>
                    <p className="text-xs text-slate-300">{niche.regulatoryContext}</p>
                  </div>
                )}
              </div>
            </div>
          </Container>
        </section>

        {/* Packages */}
        <section className="py-16 bg-slate-900">
          <Container>
            <h2 className="text-3xl font-bold text-white mb-2 text-center">
              {isUk ? "Пакети та ціни" : "Packages & Pricing"}
            </h2>
            <p className="text-slate-400 text-center mb-10">
              {isUk ? "Фіксована ціна. Без прихованих витрат." : "Fixed price. No hidden costs."}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {niche.packages.map((pkg) => (
                <div
                  key={pkg.name}
                  className={`relative rounded-2xl border p-6 flex flex-col ${
                    pkg.highlight
                      ? "border-blue-500 bg-blue-950/30"
                      : "border-slate-700 bg-slate-800/50"
                  }`}
                >
                  {pkg.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-semibold">
                      {isUk ? "Популярний" : "Most popular"}
                    </div>
                  )}
                  <h3 className="text-lg font-bold text-white mb-2">{pkg.name}</h3>
                  <div className="mb-1">
                    <span className="text-3xl font-bold text-white">£{pkg.priceGBP.toLocaleString()}</span>
                    <span className="text-slate-400 text-sm ml-2">/ {pkg.deliveryWeeks} {isUk ? "тиж" : "wks"}</span>
                  </div>
                  {isUk && (
                    <div className="text-slate-400 text-sm mb-4">{pkg.priceUAH.toLocaleString()} ₴</div>
                  )}
                  <ul className="space-y-2 flex-1 mb-6">
                    {pkg.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/${lang}/contact?service=${niche.relatedServiceSlug}&package=${encodeURIComponent(pkg.name)}`}
                    className={`block text-center py-2.5 rounded-lg font-semibold text-sm transition-colors ${
                      pkg.highlight
                        ? "bg-blue-600 hover:bg-blue-500 text-white"
                        : "border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white"
                    }`}
                  >
                    {isUk ? "Вибрати пакет" : "Choose package"}
                  </Link>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Cases */}
        {niche.cases.length > 0 && (
          <section className="py-16 bg-slate-950">
            <Container>
              <h2 className="text-3xl font-bold text-white mb-10">
                {isUk ? "Кейси" : "Case studies"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {niche.cases.map((c) => (
                  <div key={c.slug} className="rounded-xl border border-slate-800 bg-slate-900 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-white">{c.name}</h3>
                      <span className="text-sm font-medium text-emerald-400">{c.metric}</span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={`/${lang}/portfolio/${c.slug}`}
                        className="inline-flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        {isUk ? "Кейс" : "Case study"}
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                      {c.blogSlug && (
                        <Link
                          href={`/${lang}/blog/${c.blogSlug}`}
                          className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-slate-300 transition-colors"
                        >
                          {isUk ? "Стаття в блозі" : "Blog post"}
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* Related blog articles */}
        {(() => {
          const posts = getBlogPostsForNichePage(`/ml/${niche.slug}`);
          if (posts.length === 0) return null;
          return (
            <section className="py-16 bg-slate-900 border-t border-slate-800">
              <Container>
                <h2 className="text-3xl font-bold text-white mb-3">
                  {isUk ? "Статті по темі" : "Related articles"}
                </h2>
                <p className="text-slate-400 mb-10 max-w-2xl">
                  {isUk
                    ? "Кейси, гайди та технічні розбори для цієї галузі."
                    : "Cases, guides and technical breakdowns for this industry."}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {posts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/${lang}/blog/${post.slug}`}
                      className={`group rounded-xl bg-linear-to-br ${post.color} p-5 hover:scale-[1.02] transition-transform`}
                    >
                      <div className="mb-3"><EmojiIcon emoji={post.emoji} className="w-8 h-8 text-white/80" /></div>
                      <h3 className="font-semibold text-white mb-2 line-clamp-2">{post.title}</h3>
                      <p className="text-sm text-white/80 line-clamp-2 mb-3">{post.excerpt}</p>
                      <div className="flex items-center gap-2 text-xs text-white/70">
                        <span>{post.readTime} {isUk ? "хв" : "min"}</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              </Container>
            </section>
          );
        })()}

        {/* Glossary */}
        {(() => {
          const glossaryTerms = getGlossaryTermsForNichePage(`/ml/${niche.slug}`);
          if (glossaryTerms.length === 0) return null;
          return (
            <section className="py-16 bg-slate-950 border-t border-slate-800">
              <Container>
                <h2 className="text-3xl font-bold text-white mb-3">
                  {isUk ? "Ключові терміни" : "Key terminology"}
                </h2>
                <p className="text-slate-400 mb-10 max-w-2xl">
                  {isUk
                    ? "Швидкий довідник по термінам, які зустрічаються в цьому ML-напрямку."
                    : "Quick reference for terms used in this ML domain."}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {glossaryTerms.map((term) => (
                    <Link
                      key={term.slug}
                      href={`/${lang}/glossary/${term.slug}`}
                      className="group rounded-xl border border-slate-800 bg-slate-900/50 p-5 hover:border-blue-500/50 hover:bg-slate-900 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="font-semibold text-white group-hover:text-blue-300 transition-colors">
                          {isUk ? term.termUk : term.termEn}
                        </h3>
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                      </div>
                      <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">
                        {term.shortDescription}
                      </p>
                    </Link>
                  ))}
                </div>
              </Container>
            </section>
          );
        })()}

        {/* FAQ */}
        <section className="py-16 bg-slate-900">
          <Container>
            <h2 className="text-3xl font-bold text-white mb-10">
              {isUk ? "Часті запитання" : "FAQ"}
            </h2>
            <div className="max-w-3xl space-y-6">
              {niche.faq.map((f, i) => (
                <div key={i} className="rounded-xl border border-slate-700 bg-slate-800/50 p-6">
                  <h3 className="font-semibold text-white mb-3 flex items-start gap-2">
                    <BookOpen className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    {isUk ? f.questionUk : f.question}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {isUk ? f.answerUk : f.answer}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Cross-links */}
        {(niche.crossLinkAINiche || niche.crossLinkMLNiche) && (
          <section className="py-12 bg-slate-950 border-t border-slate-800">
            <Container>
              <h2 className="text-xl font-semibold text-white mb-6">
                {isUk ? "Пов'язані рішення" : "Related solutions"}
              </h2>
              <div className="flex flex-wrap gap-4">
                {niche.crossLinkAINiche && (
                  <Link
                    href={`/${lang}${niche.crossLinkAINiche}`}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white text-sm transition-colors"
                  >
                    {isUk ? "AI для цієї галузі" : "AI for this industry"}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
                <Link
                  href={`/${lang}/services/${niche.relatedServiceSlug}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white text-sm transition-colors"
                >
                  {isUk ? "Повний ML-сервіс" : "Full ML service"}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Container>
          </section>
        )}

        {/* CTA */}
        <section className={`relative py-16 bg-linear-to-r ${niche.gradient}`}>
          <div className="absolute inset-0 bg-black/60" />
          <Container className="relative text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              {isUk
                ? `Готові запустити ML у ${niche.industry}?`
                : `Ready to launch ML in ${niche.industry}?`}
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              {isUk
                ? `Мінімальний датасет: ${niche.minDatasetSize}. Якщо у вас є ці дані — ми можемо починати.`
                : `Minimum dataset: ${niche.minDatasetSize}. If you have this data — we can start.`}
            </p>
            <Link
              href={`/${lang}/contact`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-slate-900 font-semibold hover:bg-white/90 transition-colors"
            >
              {isUk ? "Безкоштовна оцінка" : "Free assessment"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
