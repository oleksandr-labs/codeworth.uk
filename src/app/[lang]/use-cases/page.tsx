import type { Metadata } from "next";
import Link from "next/link";
import { buildAlternates } from "@/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import {
  USE_CASES,
  USE_CASE_CATEGORY_LABELS,
  type UseCase,
  type UseCaseCategory,
} from "@/lib/data/useCases";
import { ArrowRight, MessageCircle } from "lucide-react";

export async function generateStaticParams() {
  return [{ lang: "uk" }, { lang: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isUk = lang === "uk";
  return {
    title: isUk
      ? "Рішення для Вашого Бізнесу — 15 Кейсів Застосування | Codeworth"
      : "Solutions for Your Business — 15 Use Cases | Codeworth",
    description: isUk
      ? "Знайдіть готове рішення для вашої задачі: онлайн-записи, AI-підтримка, SEO, e-commerce, автоматизація. Конкретні результати від Codeworth."
      : "Find a ready solution for your challenge: online bookings, AI support, SEO, e-commerce, automation. Concrete results from Codeworth.",
    alternates: buildAlternates(lang, "use-cases"),
    openGraph: {
      title: isUk ? "Рішення для Вашого Бізнесу | Codeworth" : "Solutions for Your Business | Codeworth",
      description: isUk
        ? "15 готових рішень для бізнес-задач."
        : "15 ready-made solutions for business challenges.",
      type: "website",
      url: `https://codeworth.uk/${lang}/use-cases`,
      images: [{ url: "/og/use-cases.png", width: 1200, height: 630, alt: "Use Cases — Codeworth" }],
    },
  };
}

const CATEGORY_COLORS: Record<string, string> = {
  emerald: "bg-emerald-100 text-emerald-700",
  violet: "bg-violet-100 text-violet-700",
  blue: "bg-blue-100 text-blue-700",
  orange: "bg-orange-100 text-orange-700",
  cyan: "bg-cyan-100 text-cyan-700",
  amber: "bg-amber-100 text-amber-700",
};

const CATEGORY_ICONS: Record<UseCaseCategory, string> = {
  conversion: "🎯",
  automation: "⚙️",
  seo: "📈",
  ecommerce: "🛒",
  ai: "🤖",
  trust: "💼",
};

const CATEGORY_GRADIENT: Record<UseCaseCategory, string> = {
  conversion: "from-emerald-500 to-teal-600",
  automation: "from-violet-500 to-purple-600",
  seo: "from-blue-500 to-indigo-600",
  ecommerce: "from-orange-500 to-amber-600",
  ai: "from-cyan-500 to-blue-600",
  trust: "from-amber-500 to-orange-600",
};

function UseCaseCard({ uc, isUk, lang }: { uc: UseCase; isUk: boolean; lang: string }) {
  const catLabel = USE_CASE_CATEGORY_LABELS[uc.category];
  const colorPill = CATEGORY_COLORS[catLabel.color] ?? "bg-neutral-100 dark:bg-neutral-800 text-neutral-600";
  const gradient = CATEGORY_GRADIENT[uc.category];

  return (
    <Link
      href={`/${lang}/use-cases/${uc.slug}`}
      className="group flex flex-col p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
    >
      <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${gradient} flex items-center justify-center text-2xl mb-4 shrink-0`}>
        {uc.icon}
      </div>
      <h3 className="font-heading font-bold text-neutral-900 dark:text-white text-lg mb-2 leading-snug group-hover:text-indigo-600 transition-colors">
        {isUk ? uc.titleUk : uc.titleEn}
      </h3>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-4 flex-1 line-clamp-3">
        {isUk ? uc.problemUk : uc.problemEn}
      </p>
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-neutral-100">
        <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${colorPill}`}>
          {isUk ? catLabel.uk : catLabel.en}
        </span>
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 group-hover:gap-2 transition-all">
          {isUk ? "Дізнатись більше" : "Learn more"}
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  );
}

export default async function UseCasesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const isUk = lang === "uk";

  const categories = Object.entries(USE_CASE_CATEGORY_LABELS) as [UseCaseCategory, { en: string; uk: string; color: string }][];
  const byCategory = categories.map(([catId, catMeta]) => ({
    id: catId,
    ...catMeta,
    cases: USE_CASES.filter((uc) => uc.category === catId),
  })).filter((c) => c.cases.length > 0);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main id="main-content" className="flex-1">

        {/* Hero */}
        <section className="pt-32 pb-20 bg-linear-to-br from-slate-900 via-indigo-950 to-purple-950 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.2),transparent)] pointer-events-none" />
          <Container className="relative">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-xs font-semibold mb-6 backdrop-blur-sm border border-white/15">
                <span>💡</span>
                <span>
                  {isUk
                    ? `${USE_CASES.length} готових рішень для бізнес-задач`
                    : `${USE_CASES.length} ready-made solutions for business challenges`}
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-heading font-extrabold text-white mb-6 leading-tight">
                {isUk ? "Знайдіть рішення для вашої задачі" : "Find the solution for your challenge"}
              </h1>
              <p className="text-xl text-indigo-200 leading-relaxed max-w-xl">
                {isUk
                  ? "На відміну від переліку послуг — тут ви знайдете конкретну відповідь на конкретну бізнес-проблему. Зі стратегією та результатом."
                  : "Unlike a list of services — here you find a concrete answer to a concrete business problem. With strategy and proven results."}
              </p>
            </div>
          </Container>
        </section>

        {/* Quick nav pills */}
        <section className="py-6 bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 sticky top-0 z-20 shadow-sm">
          <Container>
            <div className="flex flex-wrap gap-2">
              {byCategory.map((cat) => (
                <a
                  key={cat.id}
                  href={`#${cat.id}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-indigo-50 hover:text-indigo-700 text-neutral-600 dark:text-neutral-300 text-xs font-semibold transition-colors"
                >
                  <span>{CATEGORY_ICONS[cat.id]}</span>
                  <span>{isUk ? cat.uk : cat.en}</span>
                </a>
              ))}
            </div>
          </Container>
        </section>

        {/* Cases by category */}
        {byCategory.map((cat) => (
          <section key={cat.id} id={cat.id} className="py-16 border-b border-neutral-100 dark:border-neutral-700 last:border-0 scroll-mt-20">
            <Container>
              <div className="flex items-center gap-3 mb-8">
                <span className="text-2xl">{CATEGORY_ICONS[cat.id]}</span>
                <h2 className="text-2xl font-heading font-extrabold text-neutral-900">
                  {isUk ? cat.uk : cat.en}
                </h2>
                <span className="px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-xs font-semibold">
                  {cat.cases.length}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {cat.cases.map((uc) => (
                  <UseCaseCard key={uc.slug} uc={uc} isUk={isUk} lang={lang} />
                ))}
              </div>
            </Container>
          </section>
        ))}

        {/* CTA */}
        <section className="py-24 bg-neutral-50 dark:bg-neutral-900 ">
          <Container>
            <div className="max-w-2xl mx-auto text-center p-10 rounded-3xl bg-linear-to-br from-indigo-50 to-violet-50 border border-indigo-100">
              <span className="text-5xl mb-5 block">🎯</span>
              <h2 className="text-3xl font-heading font-extrabold text-neutral-900 dark:text-white mb-3">
                {isUk ? "Не знайшли свій кейс?" : "Didn't find your use case?"}
              </h2>
              <p className="text-neutral-600 dark:text-neutral-300 mb-6 leading-relaxed">
                {isUk
                  ? "Розкажіть нам про свою задачу — ми підберемо або розробимо рішення під ваш бізнес. Безкоштовна консультація."
                  : "Tell us about your challenge — we'll find or build a solution for your business. Free consultation."}
              </p>
              <Link
                href={`/${lang}/contact`}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
              >
                <MessageCircle className="w-4 h-4" />
                {isUk ? "Розповісти про задачу" : "Tell us about your challenge"}
              </Link>
            </div>
          </Container>
        </section>

      </main>
      <Footer />
    </div>
  );
}
