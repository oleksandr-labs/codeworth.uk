import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buildAlternates } from "@/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import {
  USE_CASES,
  USE_CASE_CATEGORY_LABELS,
  type UseCaseCategory,
} from "@/lib/data/useCases";
import { ArrowRight, CheckCircle2, MessageCircle, ChevronRight } from "lucide-react";

export async function generateStaticParams() {
  const langs = ["en", "uk"];
  return USE_CASES.flatMap((uc) => langs.map((lang) => ({ lang, slug: uc.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const uc = USE_CASES.find((u) => u.slug === slug);
  if (!uc) return {};
  const isUk = lang === "uk";
  return {
    title: isUk ? uc.metaTitleUk : uc.metaTitleEn,
    description: isUk ? uc.metaDescriptionUk : uc.metaDescriptionEn,
    alternates: buildAlternates(lang, `use-cases/${slug}`),
    openGraph: {
      title: isUk ? uc.metaTitleUk : uc.metaTitleEn,
      description: isUk ? uc.metaDescriptionUk : uc.metaDescriptionEn,
      type: "article",
      url: `https://codeworth.uk/${lang}/use-cases/${slug}`,
    },
  };
}

const CATEGORY_BG: Record<UseCaseCategory, string> = {
  conversion: "bg-emerald-50",
  automation: "bg-violet-50",
  seo: "bg-blue-50",
  ecommerce: "bg-orange-50",
  ai: "bg-cyan-50",
  trust: "bg-amber-50",
};

const CATEGORY_GRADIENT: Record<UseCaseCategory, string> = {
  conversion: "from-emerald-500 to-teal-600",
  automation: "from-violet-500 to-purple-600",
  seo: "from-blue-500 to-indigo-600",
  ecommerce: "from-orange-500 to-amber-600",
  ai: "from-cyan-500 to-blue-600",
  trust: "from-amber-500 to-orange-600",
};

const CATEGORY_ICONS: Record<UseCaseCategory, string> = {
  conversion: "🎯",
  automation: "⚙️",
  seo: "📈",
  ecommerce: "🛒",
  ai: "🤖",
  trust: "💼",
};

export default async function UseCaseDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const uc = USE_CASES.find((u) => u.slug === slug);
  if (!uc) notFound();

  const isUk = lang === "uk";
  const bg = CATEGORY_BG[uc.category];
  const gradient = CATEGORY_GRADIENT[uc.category];
  const catIcon = CATEGORY_ICONS[uc.category];
  const catMeta = USE_CASE_CATEGORY_LABELS[uc.category];

  const relatedCases = USE_CASES.filter(
    (u) => u.slug !== slug && u.category === uc.category
  ).slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main id="main-content" className="flex-1">

        {/* Breadcrumb */}
        <div className="pt-24 pb-0 bg-white border-b border-neutral-100">
          <Container>
            <nav className="flex items-center gap-2 text-xs text-neutral-400 pb-4">
              <Link href={`/${lang}`} className="hover:text-neutral-600 transition-colors">
                {isUk ? "Головна" : "Home"}
              </Link>
              <ChevronRight className="w-3 h-3" />
              <Link href={`/${lang}/use-cases`} className="hover:text-neutral-600 transition-colors">
                {isUk ? "Рішення" : "Use Cases"}
              </Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-neutral-600 truncate max-w-[200px]">
                {isUk ? uc.titleUk : uc.titleEn}
              </span>
            </nav>
          </Container>
        </div>

        {/* Hero */}
        <section className={`py-16 ${bg}`}>
          <Container>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-neutral-200 text-neutral-600 text-xs font-semibold mb-6">
                <span>{catIcon}</span>
                <span>{isUk ? catMeta.uk : catMeta.en}</span>
              </div>
              <div className={`w-16 h-16 rounded-2xl bg-linear-to-br ${gradient} flex items-center justify-center text-3xl mb-6`}>
                {uc.icon}
              </div>
              <h1 className="text-4xl lg:text-5xl font-heading font-extrabold text-neutral-900 mb-4 leading-tight">
                {isUk ? uc.titleUk : uc.titleEn}
              </h1>
              {(uc.whoUk || uc.whoEn) && (
                <p className="text-sm font-semibold text-neutral-400 mb-3">
                  {isUk ? "Для кого:" : "Who it's for:"}{" "}
                  <span className="text-neutral-600">{isUk ? uc.whoUk : uc.whoEn}</span>
                </p>
              )}
              <p className="text-xl text-neutral-600 leading-relaxed">
                {isUk ? uc.problemUk : uc.problemEn}
              </p>
            </div>
          </Container>
        </section>

        {/* Main content */}
        <section className="py-16">
          <Container>
            <div className="grid lg:grid-cols-3 gap-10">

              {/* Left: Problem → Solution → Result */}
              <div className="lg:col-span-2 space-y-10">

                {/* Problem */}
                <div>
                  <h2 className="flex items-center gap-2 text-sm font-bold text-rose-600 uppercase tracking-widest mb-3">
                    <span>⚠️</span>
                    {isUk ? "Проблема" : "The Problem"}
                  </h2>
                  <p className="text-lg text-neutral-700 leading-relaxed">
                    {isUk ? uc.problemUk : uc.problemEn}
                  </p>
                </div>

                {/* Solution */}
                <div>
                  <h2 className="flex items-center gap-2 text-sm font-bold text-indigo-600 uppercase tracking-widest mb-3">
                    <span>🔧</span>
                    {isUk ? "Рішення Codeworth" : "Codeworth Solution"}
                  </h2>
                  <p className="text-lg text-neutral-700 leading-relaxed">
                    {isUk ? uc.solutionUk : uc.solutionEn}
                  </p>
                </div>

                {/* Result quote */}
                <blockquote className="relative pl-6 border-l-4 border-indigo-500">
                  <CheckCircle2 className="absolute -left-2.5 top-0 w-5 h-5 bg-white text-indigo-600" />
                  <p className="text-lg font-semibold text-neutral-800 italic">
                    "{isUk ? uc.resultQuoteUk : uc.resultQuoteEn}"
                  </p>
                  <footer className="mt-2 text-sm text-neutral-400">
                    — Codeworth {isUk ? "клієнтський кейс" : "client case study"}
                  </footer>
                </blockquote>

              </div>

              {/* Sidebar */}
              <aside className="space-y-5">

                {/* CTA card */}
                <div className="p-6 rounded-2xl bg-indigo-600 text-white">
                  <p className="font-heading font-bold text-lg mb-2">
                    {isUk ? "Хочете такий самий результат?" : "Want the same result?"}
                  </p>
                  <p className="text-indigo-200 text-sm mb-5 leading-relaxed">
                    {isUk
                      ? "Безкоштовна консультація — розберемо вашу ситуацію та запропонуємо рішення."
                      : "Free consultation — we'll analyse your situation and propose a solution."}
                  </p>
                  <Link
                    href={`/${lang}/contact`}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white text-indigo-700 font-bold text-sm hover:bg-indigo-50 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    {isUk ? "Отримати консультацію" : "Get a consultation"}
                  </Link>
                </div>

                {/* Related portfolio */}
                {uc.relatedPortfolio.length > 0 && (
                  <div className="p-5 rounded-2xl border border-neutral-200 bg-white">
                    <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-3">
                      {isUk ? "Схожі кейси" : "Related Cases"}
                    </h3>
                    <ul className="space-y-2">
                      {uc.relatedPortfolio.map((portSlug) => (
                        <li key={portSlug}>
                          <Link
                            href={`/${lang}/portfolio/${portSlug}`}
                            className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                          >
                            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                            {portSlug.replace(/-/g, " ")}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Related services */}
                {uc.relatedServices.length > 0 && (
                  <div className="p-5 rounded-2xl border border-neutral-200 bg-white">
                    <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-3">
                      {isUk ? "Пов'язані послуги" : "Related Services"}
                    </h3>
                    <ul className="space-y-2">
                      {uc.relatedServices.map((svcSlug) => (
                        <li key={svcSlug}>
                          <Link
                            href={`/${lang}/services/${svcSlug}`}
                            className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                          >
                            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                            {svcSlug.replace(/-/g, " ")}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              </aside>
            </div>
          </Container>
        </section>

        {/* Related use cases */}
        {relatedCases.length > 0 && (
          <section className="py-16 bg-neutral-50 border-t border-neutral-100">
            <Container>
              <h2 className="text-2xl font-heading font-extrabold text-neutral-900 mb-8">
                {isUk ? "Схожі рішення" : "Similar Solutions"}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {relatedCases.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/${lang}/use-cases/${rel.slug}`}
                    className="group flex items-start gap-4 p-5 rounded-2xl border border-neutral-200 bg-white hover:shadow-md transition-shadow"
                  >
                    <span className="text-2xl shrink-0">{rel.icon}</span>
                    <div>
                      <h3 className="font-bold text-neutral-800 text-sm leading-snug group-hover:text-indigo-600 transition-colors">
                        {isUk ? rel.titleUk : rel.titleEn}
                      </h3>
                      <p className="text-xs text-neutral-400 mt-1 line-clamp-2">
                        {isUk ? rel.problemUk : rel.problemEn}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Link
                  href={`/${lang}/use-cases`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  {isUk ? "Всі рішення" : "All solutions"}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Container>
          </section>
        )}

      </main>
      <Footer />
    </div>
  );
}
