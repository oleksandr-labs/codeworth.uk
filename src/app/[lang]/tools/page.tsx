import type { Metadata } from "next";
import Link from "next/link";
import { buildAlternates } from "@/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { TOOLS, TOOL_CATEGORIES, type Tool } from "@/lib/data/tools";
import { ArrowRight } from "lucide-react";

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
      ? "Безкоштовні Веб-Інструменти — Калькулятор Сайту, SEO Чек-ліст | Codeworth"
      : "Free Web Tools — Website Cost Calculator, SEO Checklist & More | Codeworth",
    description: isUk
      ? "10 безкоштовних інструментів для власників сайтів: калькулятор вартості, SEO чек-ліст, генератор мета-тегів та інше."
      : "10 free tools for website owners: cost calculator, SEO audit checklist, meta tag generator, UTM builder and more.",
    alternates: buildAlternates(lang, "tools"),
    openGraph: {
      title: isUk
        ? "Безкоштовні Веб-Інструменти | Codeworth"
        : "Free Web Tools | Codeworth",
      description: isUk
        ? "10 безкоштовних інструментів для власників сайтів."
        : "10 free tools for website owners.",
      type: "website",
      url: `https://codeworth.uk/${lang}/tools`,
      images: [{ url: "/og/tools.png", width: 1200, height: 630, alt: "Free Web Tools — Codeworth" }],
    },
    twitter: {
      card: "summary_large_image",
      title: isUk ? "Безкоштовні Веб-Інструменти | Codeworth" : "Free Web Tools | Codeworth",
      description: isUk
        ? "10 безкоштовних інструментів для власників сайтів."
        : "10 free tools for website owners.",
      images: ["/og/tools.png"],
    },
  };
}

const CATEGORY_LABELS: Record<string, { uk: string; en: string }> = {
  calculator: { uk: "Калькулятор", en: "Calculator" },
  audit: { uk: "Аудит", en: "Audit" },
  checklist: { uk: "Чек-ліст", en: "Checklist" },
  generator: { uk: "Генератор", en: "Generator" },
};

const CATEGORY_COLORS: Record<string, string> = {
  calculator: "bg-amber-100 text-amber-700",
  audit: "bg-blue-100 text-blue-700",
  checklist: "bg-green-100 text-green-700",
  generator: "bg-violet-100 text-violet-700",
};

function ToolCard({ tool, isUk, lang }: { tool: Tool; isUk: boolean; lang: string }) {
  const categoryLabel = CATEGORY_LABELS[tool.category];
  const categoryColor = CATEGORY_COLORS[tool.category] ?? "bg-neutral-100 text-neutral-600";

  return (
    <div className="group relative flex flex-col p-6 rounded-2xl border border-neutral-200 bg-white hover:shadow-md transition-shadow duration-200">
      {/* Badges */}
      <div className="absolute top-4 right-4 flex gap-1.5">
        {tool.badge && (
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
              tool.badge === "New"
                ? "bg-green-500 text-white"
                : "bg-indigo-500 text-white"
            }`}
          >
            {tool.badge}
          </span>
        )}
        {!tool.isBuilt && (
          <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-neutral-200 text-neutral-500">
            {isUk ? "Незабаром" : "Coming soon"}
          </span>
        )}
      </div>

      {/* Icon */}
      <div className="text-4xl mb-4">{tool.icon}</div>

      {/* Title */}
      <h3 className="font-heading font-bold text-neutral-900 text-lg mb-2 leading-snug pr-20">
        {isUk ? tool.title : tool.titleEn}
      </h3>

      {/* Description */}
      <p className="text-sm text-neutral-500 leading-relaxed mb-4 flex-1">
        {isUk ? tool.description : tool.descriptionEn}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-neutral-100">
        <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${categoryColor}`}>
          {isUk ? categoryLabel?.uk : categoryLabel?.en}
        </span>

        {tool.isBuilt ? (
          <Link
            href={`/${lang}/${tool.href}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-colors"
          >
            {isUk ? "Відкрити" : "Open Tool"}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-400 text-xs font-semibold cursor-not-allowed">
            {isUk ? "Відкрити →" : "Open Tool →"}
          </span>
        )}
      </div>
    </div>
  );
}

export default async function ToolsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const isUk = lang === "uk";

  // Group tools by category for static section headers
  const byCategory = TOOL_CATEGORIES.slice(1).map((cat) => ({
    ...cat,
    tools: TOOLS.filter((t) => t.category === cat.id),
  }));

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main id="main-content" className="flex-1">

        {/* Hero */}
        <section className="pt-32 pb-20 bg-linear-to-br from-indigo-600 to-purple-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08),transparent)] pointer-events-none" />
          <Container className="relative">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 text-white text-xs font-semibold mb-6 backdrop-blur-sm border border-white/20">
                <span>🎁</span>
                <span>{isUk ? "Безкоштовно · Без реєстрації" : "Free · No Registration"}</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-heading font-extrabold text-white mb-6 leading-tight">
                {isUk
                  ? "Безкоштовні Інструменти для Власників Сайтів"
                  : "Free Tools for Website Owners"}
              </h1>
              <p className="text-xl text-indigo-100 leading-relaxed max-w-xl">
                {isUk
                  ? "10 безкоштовних інструментів: калькулятор вартості, SEO чек-ліст, генератор мета-тегів, UTM-конструктор та інше. Без реєстрації."
                  : "10 free tools: cost calculator, SEO checklist, meta tag generator, UTM builder and more. No account needed."}
              </p>
            </div>
          </Container>
        </section>

        {/* Tools grid by category */}
        {byCategory.map((cat) => (
          <section key={cat.id} className="py-16 border-b border-neutral-100 last:border-0">
            <Container>
              <div className="flex items-center gap-3 mb-8">
                <h2 className="text-2xl font-heading font-extrabold text-neutral-900">
                  {isUk ? cat.labelUk : cat.labelEn}
                </h2>
                <span className="px-2.5 py-1 rounded-lg bg-neutral-100 text-neutral-500 text-xs font-semibold">
                  {cat.tools.length}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {cat.tools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} isUk={isUk} lang={lang} />
                ))}
              </div>
            </Container>
          </section>
        ))}

        {/* Bottom CTA */}
        <section className="py-24 bg-neutral-50">
          <Container>
            <div className="max-w-2xl mx-auto text-center p-10 rounded-3xl bg-linear-to-br from-indigo-50 to-violet-50 border border-indigo-100">
              <span className="text-5xl mb-5 block">🛠️</span>
              <h2 className="text-3xl font-heading font-extrabold text-neutral-900 mb-3">
                {isUk ? "Потрібен власний інструмент?" : "Need a custom tool?"}
              </h2>
              <p className="text-neutral-600 mb-6 leading-relaxed">
                {isUk
                  ? "Ми розробляємо кастомні калькулятори, аудит-інструменти та генератори спеціально для вашого бізнесу."
                  : "We build custom calculators, audit tools and generators tailored to your business needs."}
              </p>
              <Link
                href={`/${lang}/contact`}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
              >
                {isUk ? "Давайте збудуємо його" : "Let's build it"}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Container>
        </section>

      </main>
      <Footer />
    </div>
  );
}
