import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buildAlternates } from "@/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { COMPARE_DATA, COMPARE_SLUGS, getCompare } from "@/lib/data/compare";
import { CheckCircle, XCircle, Minus, ArrowRight, Scale } from "lucide-react";

type Params = { lang: string; slug: string };

export async function generateStaticParams() {
  const langs = ["en", "uk"];
  return langs.flatMap((lang) => COMPARE_SLUGS.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const data = getCompare(slug);
  if (!data) return {};
  const isUk = lang === "uk";
  const title = isUk ? data.seoTitleUk : data.seoTitleEn;
  const desc = isUk ? data.seoDescUk : data.seoDescEn;
  return {
    title,
    description: desc,
    openGraph: {
      title,
      description: desc,
      type: "website",
      url: `https://codeworth.uk/${lang}/compare/${slug}`,
      images: [{ url: "/og/compare.png", width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, images: ["/og/compare.png"] },
    alternates: buildAlternates(lang, `/compare/${slug}`),
  };
}

function CellValue({
  value,
  lang,
}: {
  value: string | boolean | undefined;
  lang: string;
}) {
  const isUk = lang === "uk";
  if (value === true) return <CheckCircle className="w-5 h-5 text-emerald-500 mx-auto" />;
  if (value === false) return <XCircle className="w-5 h-5 text-red-400 mx-auto" />;
  return <span className="text-sm text-neutral-700 dark:text-neutral-300 leading-snug">{value}</span>;
}

export default async function ComparePage({ params }: { params: Promise<Params> }) {
  const { lang, slug } = await params;
  const data = getCompare(slug);
  if (!data) notFound();

  const isUk = lang === "uk";
  const competitorName = isUk ? data.competitorUk : data.competitorEn;
  const codenestWins = data.rows.filter((r) => r.winner === "Codeworth").length;
  const competitorWins = data.rows.filter((r) => r.winner === "competitor").length;
  const ties = data.rows.filter((r) => r.winner === "tie").length;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isUk ? "Головна" : "Home", item: `https://codeworth.uk/${lang}` },
      { "@type": "ListItem", position: 2, name: isUk ? "Порівняння" : "Comparison", item: `https://codeworth.uk/${lang}/compare` },
      { "@type": "ListItem", position: 3, name: isUk ? data.seoTitleUk : data.seoTitleEn },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: isUk ? `Що краще: Codeworth чи ${competitorName}?` : `What's better: Codeworth or ${competitorName}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: isUk ? data.verdictUk : data.verdictEn,
        },
      },
      {
        "@type": "Question",
        name: isUk ? `Коли обирати Codeworth замість ${competitorName}?` : `When to choose Codeworth over ${competitorName}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: isUk
            ? (data.useCasesCodeworthUk.join("; "))
            : (data.useCasesCodeworthEn.join("; ")),
        },
      },
    ],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: isUk ? data.seoTitleUk : data.seoTitleEn,
    description: isUk ? data.seoDescUk : data.seoDescEn,
    url: `https://codeworth.uk/${lang}/compare/${slug}`,
    datePublished: "2024-01-01",
    dateModified: "2026-01-01",
    inLanguage: lang,
    breadcrumb: breadcrumbSchema,
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <main id="main-content" className="flex-1">

        {/* Hero */}
        <section className="pt-32 pb-20 bg-neutral-950 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-5"
            style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          <Container className="relative">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 mb-8">
              <Link href={`/${lang}`} className="hover:text-white transition-colors">{isUk ? "Головна" : "Home"}</Link>
              <span>/</span>
              <Link href={`/${lang}/compare`} className="hover:text-white transition-colors">{isUk ? "Порівняння" : "Comparison"}</Link>
              <span>/</span>
              <span className="text-neutral-300">{`Codeworth vs ${competitorName}`}</span>
            </nav>

            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 bg-indigo-500/20 text-indigo-300 text-sm font-medium px-3 py-1.5 rounded-full border border-indigo-500/30">
                <Scale className="w-3.5 h-3.5" /> {isUk ? "Об'єктивне порівняння" : "Objective comparison"}
              </span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-heading font-extrabold mb-6 leading-tight">
              <span className="bg-linear-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">Codeworth</span>
              {" vs "}
              <span className="text-white">{competitorName}</span>
            </h1>
            <p className="text-lg text-neutral-300 max-w-2xl mb-6">
              {isUk ? data.summaryUk : data.summaryEn}
            </p>

            {/* Score */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 px-4 py-2 rounded-xl">
                <span className="text-emerald-400 font-extrabold text-2xl font-heading">{codenestWins}</span>
                <span className="text-emerald-300 text-sm">{isUk ? "перевага Codeworth" : "Codeworth wins"}</span>
              </div>
              <div className="flex items-center gap-2 bg-red-500/20 border border-red-500/30 px-4 py-2 rounded-xl">
                <span className="text-red-400 font-extrabold text-2xl font-heading">{competitorWins}</span>
                <span className="text-red-300 text-sm">{isUk ? `перевага ${competitorName}` : `${competitorName} wins`}</span>
              </div>
              {ties > 0 && (
                <div className="flex items-center gap-2 bg-neutral-700/50 border border-neutral-600 px-4 py-2 rounded-xl">
                  <span className="text-neutral-300 font-extrabold text-2xl font-heading">{ties}</span>
                  <span className="text-neutral-400 text-sm">{isUk ? "однаково" : "tie"}</span>
                </div>
              )}
            </div>
          </Container>
        </section>

        {/* Comparison table */}
        <section className="py-16 bg-white dark:bg-neutral-950">
          <Container>
            <h2 className="text-2xl font-heading font-extrabold text-neutral-900 dark:text-white mb-8">
              {isUk ? "Детальне порівняння" : "Detailed Comparison"}
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-neutral-100 dark:border-neutral-700 shadow-sm">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="bg-neutral-950 text-white">
                    <th className="text-left px-6 py-4 font-heading font-bold text-sm w-1/3">
                      {isUk ? "Характеристика" : "Feature"}
                    </th>
                    <th className="px-6 py-4 font-heading font-bold text-sm text-center w-1/3">
                      <span className="bg-linear-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">Codeworth</span>
                    </th>
                    <th className="px-6 py-4 font-heading font-bold text-sm text-center w-1/3">
                      {competitorName}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {data.rows.map((row, i) => (
                    <tr
                      key={i}
                      className={`${row.winner === "Codeworth" ? "bg-emerald-50/30" : row.winner === "competitor" ? "bg-red-50/30" : ""} hover:bg-neutral-50 dark:hover:bg-neutral-800 dark:bg-neutral-900 transition-colors`}
                    >
                      <td className="px-6 py-4">
                        <div className="font-medium text-neutral-900 dark:text-white text-sm">
                          {isUk ? row.feature : row.featureEn}
                        </div>
                        {row.winner === "Codeworth" && (
                          <span className="text-xs text-emerald-600 font-medium mt-0.5 block">
                            {isUk ? "✓ Перевага Codeworth" : "✓ Codeworth wins"}
                          </span>
                        )}
                        {row.winner === "competitor" && (
                          <span className="text-xs text-amber-600 font-medium mt-0.5 block">
                            {isUk ? `✓ Перевага ${competitorName}` : `✓ ${competitorName} wins`}
                          </span>
                        )}
                      </td>
                      <td className={`px-6 py-4 text-center ${row.winner === "Codeworth" ? "font-medium" : ""}`}>
                        <CellValue
                          value={isUk ? row.Codeworth : (row.CodeworthEn ?? row.Codeworth)}
                          lang={lang}
                        />
                      </td>
                      <td className={`px-6 py-4 text-center ${row.winner === "competitor" ? "font-medium" : ""}`}>
                        <CellValue
                          value={isUk ? row.competitor : (row.competitorEn ?? row.competitor)}
                          lang={lang}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Container>
        </section>

        {/* Use cases */}
        <section className="py-16 bg-neutral-50 dark:bg-neutral-900 ">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Codeworth */}
              <div className="rounded-2xl bg-white dark:bg-neutral-800 border-2 border-indigo-200 p-8">
                <h3 className="font-heading font-extrabold text-xl text-neutral-900 dark:text-white mb-2">
                  {isUk ? "Обирайте Codeworth, якщо:" : "Choose Codeworth if:"}
                </h3>
                <p className="text-sm text-indigo-600 font-medium mb-5">Codeworth web studio</p>
                <ul className="space-y-3">
                  {(isUk ? data.useCasesCodeworthUk : data.useCasesCodeworthEn).map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-neutral-700 dark:text-neutral-300 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/${lang}/contact`}
                  className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold transition-colors"
                >
                  {isUk ? "Замовити у Codeworth" : "Order from Codeworth"} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Competitor */}
              <div className="rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-8">
                <h3 className="font-heading font-extrabold text-xl text-neutral-900 dark:text-white mb-2">
                  {isUk ? `Обирайте ${competitorName}, якщо:` : `Choose ${competitorName} if:`}
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium mb-5">{isUk ? data.taglineUk : data.taglineEn}</p>
                <ul className="space-y-3">
                  {(isUk ? data.useCasesCompetitorUk : data.useCasesCompetitorEn).map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Minus className="w-5 h-5 text-neutral-300 shrink-0 mt-0.5" />
                      <span className="text-neutral-600 dark:text-neutral-300 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </section>

        {/* Verdict */}
        <section className="py-16 bg-white dark:bg-neutral-950">
          <Container>
            <div className="max-w-3xl mx-auto rounded-2xl border-2 border-indigo-100 bg-indigo-50/50 p-8">
              <h2 className="text-xl font-heading font-extrabold text-neutral-900 dark:text-white mb-4">
                {isUk ? "🏆 Висновок" : "🏆 Verdict"}
              </h2>
              <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {isUk ? data.verdictUk : data.verdictEn}
              </p>
            </div>
          </Container>
        </section>

        {/* FAQ Schema hidden section */}
        <section className="py-12 bg-neutral-50">
          <Container>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-xl font-heading font-extrabold text-neutral-900 dark:text-white mb-6">
                {isUk ? `FAQ: Codeworth vs ${competitorName}` : `FAQ: Codeworth vs ${competitorName}`}
              </h2>
              <div className="space-y-4">
                <div className="rounded-xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 p-5">
                  <h3 className="font-heading font-bold text-neutral-900 dark:text-white mb-2 text-sm">
                    {isUk ? `Що краще: Codeworth чи ${competitorName}?` : `What's better: Codeworth or ${competitorName}?`}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">{isUk ? data.verdictUk : data.verdictEn}</p>
                </div>
                <div className="rounded-xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 p-5">
                  <h3 className="font-heading font-bold text-neutral-900 dark:text-white mb-2 text-sm">
                    {isUk ? `Коли обирати Codeworth замість ${competitorName}?` : `When to choose Codeworth over ${competitorName}?`}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">
                    {isUk
                      ? data.useCasesCodeworthUk.join("; ")
                      : data.useCasesCodeworthEn.join("; ")}
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Other comparisons */}
        <section className="py-12 bg-white dark:bg-neutral-800 border-t border-neutral-100">
          <Container>
            <h2 className="text-lg font-heading font-bold text-neutral-900 dark:text-white mb-5">
              {isUk ? "Інші порівняння:" : "Other comparisons:"}
            </h2>
            <div className="flex flex-wrap gap-3">
              {COMPARE_DATA.filter((c) => c.slug !== slug).map((c) => (
                <Link
                  key={c.slug}
                  href={`/${lang}/compare/${c.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-700 dark:text-neutral-300 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 transition-all"
                >
                  <Scale className="w-3 h-3" /> {`Codeworth vs ${isUk ? c.competitorUk : c.competitorEn}`}
                </Link>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-20 bg-neutral-950 text-white">
          <Container>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-heading font-extrabold mb-4">
                {isUk ? "Обрали Codeworth?" : "Chose Codeworth?"}
              </h2>
              <p className="text-neutral-400 mb-8">
                {isUk
                  ? "Консультація безкоштовна. Розповімо що підходить саме для вашого бізнесу."
                  : "Consultation is free. We'll explain what's right for your business."}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href={`/${lang}/contact`}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg transition-colors"
                >
                  {isUk ? "Отримати консультацію" : "Get a Consultation"} <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href={`/${lang}/pricing`}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/10 transition-all"
                >
                  {isUk ? "Переглянути ціни" : "View Pricing"}
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
