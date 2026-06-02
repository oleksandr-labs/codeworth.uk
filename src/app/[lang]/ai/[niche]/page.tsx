import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buildAlternates } from "@/i18n";
import { AI_NICHES } from "@/lib/data/aiNiches";
import { getAINicheBySlug, formatNichePrice, getGlossaryTermsForNichePage, getBlogPostsForNichePage } from "@/lib/nicheUtils";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { Check, ChevronRight, Clock, ArrowRight, Zap, Code2, BookOpen } from "lucide-react";

export async function generateStaticParams() {
  return AI_NICHES.map((n) => ({ niche: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; niche: string }>;
}): Promise<Metadata> {
  const { lang, niche: nicheSlug } = await params;
  const niche = getAINicheBySlug(nicheSlug);
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
    alternates: buildAlternates(lang, `/ai/${niche.slug}`),
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://codeworth.uk/${lang}/ai/${niche.slug}`,
    },
  };
}

export default async function AINichePage({
  params,
}: {
  params: Promise<{ lang: string; niche: string }>;
}) {
  const { lang, niche: nicheSlug } = await params;
  const niche = getAINicheBySlug(nicheSlug);
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
      name: "CodeNest",
      url: "https://codeworth.uk",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "GBP",
      price: niche.schemaPriceGBP,
      priceSpecification: { "@type": "PriceSpecification", minPrice: niche.schemaPriceGBP, priceCurrency: "GBP" },
    },
    url: `https://codeworth.uk/${lang}/ai/${niche.slug}`,
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

  const [minWeeks, maxWeeks] = niche.implementationWeeks;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isUk ? "Головна" : "Home", item: `https://codeworth.uk/${lang}` },
      { "@type": "ListItem", position: 2, name: isUk ? "AI-рішення" : "AI Solutions", item: `https://codeworth.uk/${lang}/ai` },
      { "@type": "ListItem", position: 3, name: isUk ? niche.h1Uk : niche.h1En, item: `https://codeworth.uk/${lang}/ai/${niche.slug}` },
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
          <div className="absolute inset-0 bg-black/50" />
          <Container className="relative z-10">
            <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
              <Link href={`/${lang}`} className="hover:text-white transition-colors">{isUk ? "Головна" : "Home"}</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href={`/${lang}/ai`} className="hover:text-white transition-colors">{isUk ? "AI-рішення" : "AI Solutions"}</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">{niche.industry}</span>
            </nav>
            <div className="max-w-3xl">
              <div className="text-4xl mb-4">{niche.iconEmoji}</div>
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
                  <div className="text-white/50 mb-1">{isUk ? "Терміни" : "Timeline"}</div>
                  <div className="text-lg font-semibold text-white">{minWeeks}–{maxWeeks} {isUk ? "тижнів" : "weeks"}</div>
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
                  {isUk ? "Обговорити проєкт" : "Discuss project"}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href={`/${lang}/services/${niche.relatedServiceSlug}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white/30 text-white hover:bg-white/10 transition-colors"
                >
                  {isUk ? "Переглянути сервіс" : "View service"}
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Description */}
        <section className="py-16 bg-slate-950">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {isUk ? "Про рішення" : "About this solution"}
                </h2>
                <p className="text-slate-300 leading-relaxed text-lg">
                  {isUk ? niche.descriptionUk : niche.descriptionEn}
                </p>
              </div>
              <div className="space-y-4">
                <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
                  <div className="flex items-center gap-2 text-violet-400 mb-3">
                    <Zap className="w-4 h-4" />
                    <span className="text-sm font-medium">{isUk ? "Технології" : "Technologies"}</span>
                  </div>
                  <div className="space-y-2">
                    {niche.technologies.map((tech) => (
                      <div key={tech.name} className="flex items-start gap-2">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 shrink-0" />
                        <div>
                          <span className="text-sm font-medium text-white">{tech.name}</span>
                          <p className="text-xs text-slate-400">{tech.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {niche.integrations.length > 0 && (
                  <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
                    <div className="flex items-center gap-2 text-cyan-400 mb-3">
                      <Code2 className="w-4 h-4" />
                      <span className="text-sm font-medium">{isUk ? "Інтеграції" : "Integrations"}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {niche.integrations.map((int) => (
                        <span key={int} className="text-xs px-2 py-1 rounded-full bg-slate-800 text-slate-300">
                          {int}
                        </span>
                      ))}
                    </div>
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
                      ? "border-violet-500 bg-violet-950/30"
                      : "border-slate-700 bg-slate-800/50"
                  }`}
                >
                  {pkg.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-violet-600 text-white text-xs font-semibold">
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
                        ? "bg-violet-600 hover:bg-violet-500 text-white"
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
                  <Link
                    key={c.slug}
                    href={`/${lang}/portfolio/${c.slug}`}
                    className="group rounded-xl border border-slate-800 bg-slate-900 hover:border-slate-600 p-6 transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-white group-hover:text-violet-300 transition-colors">
                        {c.name}
                      </h3>
                      <span className="text-sm font-medium text-emerald-400">{c.metric}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                      {isUk ? "Переглянути кейс" : "View case study"}
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* Related blog articles */}
        {(() => {
          const posts = getBlogPostsForNichePage(`/ai/${niche.slug}`);
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
                      <div className="text-3xl mb-3">{post.emoji}</div>
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
          const glossaryTerms = getGlossaryTermsForNichePage(`/ai/${niche.slug}`);
          if (glossaryTerms.length === 0) return null;
          return (
            <section className="py-16 bg-slate-950 border-t border-slate-800">
              <Container>
                <h2 className="text-3xl font-bold text-white mb-3">
                  {isUk ? "Ключові терміни" : "Key terminology"}
                </h2>
                <p className="text-slate-400 mb-10 max-w-2xl">
                  {isUk
                    ? "Швидкий довідник по термінам, які зустрічаються в цьому AI-напрямку."
                    : "Quick reference for terms used in this AI domain."}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {glossaryTerms.map((term) => (
                    <Link
                      key={term.slug}
                      href={`/${lang}/glossary/${term.slug}`}
                      className="group rounded-xl border border-slate-800 bg-slate-900/50 p-5 hover:border-violet-500/50 hover:bg-slate-900 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="font-semibold text-white group-hover:text-violet-300 transition-colors">
                          {isUk ? term.termUk : term.termEn}
                        </h3>
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-violet-400 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
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
                    <BookOpen className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
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
        {(niche.crossLinkMLNiche || niche.crossLinkAINiche) && (
          <section className="py-12 bg-slate-950 border-t border-slate-800">
            <Container>
              <h2 className="text-xl font-semibold text-white mb-6">
                {isUk ? "Пов'язані рішення" : "Related solutions"}
              </h2>
              <div className="flex flex-wrap gap-4">
                {niche.crossLinkMLNiche && (
                  <Link
                    href={`/${lang}${niche.crossLinkMLNiche}`}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white text-sm transition-colors"
                  >
                    {isUk ? "ML для цієї галузі" : "ML for this industry"}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
                <Link
                  href={`/${lang}/services/${niche.relatedServiceSlug}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white text-sm transition-colors"
                >
                  {isUk ? "Повний AI-сервіс" : "Full AI service"}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Container>
          </section>
        )}

        {/* CTA */}
        <section className={`py-16 bg-linear-to-r ${niche.gradient}`}>
          <div className="absolute inset-0 bg-black/60" />
          <Container className="relative text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              {isUk
                ? `Готові впровадити AI у ${niche.industry}?`
                : `Ready to implement AI in ${niche.industry}?`}
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              {isUk
                ? "Безкоштовна консультація — оцінка вашого кейсу та рекомендації по архітектурі рішення."
                : "Free consultation — we'll assess your use case and recommend the right solution architecture."}
            </p>
            <Link
              href={`/${lang}/contact`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-slate-900 font-semibold hover:bg-white/90 transition-colors"
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
