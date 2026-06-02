import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buildAlternates } from "@/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { TOOLS } from "@/lib/data/tools";
import { MetaTagGenerator } from "@/components/tools/MetaTagGenerator";
import { UtmBuilder } from "@/components/tools/UtmBuilder";
import { KeywordDensityChecker } from "@/components/tools/KeywordDensityChecker";
import { ColorContrastChecker } from "@/components/tools/ColorContrastChecker";
import { RobotsTxtGenerator } from "@/components/tools/RobotsTxtGenerator";
import { WebsiteCostCalculator } from "@/components/tools/WebsiteCostCalculator";
import { SchemaGenerator } from "@/components/tools/SchemaGenerator";
import { SeoChecklist } from "@/components/tools/SeoChecklist";
import { MobileReadinessChecker } from "@/components/tools/MobileReadinessChecker";
import { PageSpeedAudit } from "@/components/tools/PageSpeedAudit";

export async function generateStaticParams() {
  const builtTools = TOOLS.filter((t) => t.isBuilt);
  return [{ lang: "uk" }, { lang: "en" }].flatMap((l) =>
    builtTools.map((t) => ({ ...l, slug: t.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const isUk = lang === "uk";
  const tool = TOOLS.find((t) => t.slug === slug);
  if (!tool) return {};

  const title = isUk
    ? `${tool.title} — Безкоштовно | CodeNest`
    : `${tool.titleEn} — Free Online Tool | CodeNest`;
  const description = isUk ? tool.description : tool.descriptionEn;

  return {
    title,
    description,
    alternates: buildAlternates(lang, `tools/${slug}`),
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://codenest.com.ua/${lang}/tools/${slug}`,
    },
  };
}

function ToolComponent({ slug, isUk }: { slug: string; isUk: boolean }) {
  switch (slug) {
    case "meta-tag-generator":
      return <MetaTagGenerator isUk={isUk} />;
    case "utm-builder":
      return <UtmBuilder isUk={isUk} />;
    case "keyword-density-checker":
      return <KeywordDensityChecker isUk={isUk} />;
    case "color-contrast-checker":
      return <ColorContrastChecker isUk={isUk} />;
    case "robots-txt-generator":
      return <RobotsTxtGenerator isUk={isUk} />;
    case "website-cost-calculator":
      return <WebsiteCostCalculator isUk={isUk} />;
    case "schema-generator":
      return <SchemaGenerator isUk={isUk} />;
    case "seo-checklist":
      return <SeoChecklist isUk={isUk} />;
    case "mobile-readiness-checker":
      return <MobileReadinessChecker isUk={isUk} />;
    case "page-speed-audit":
      return <PageSpeedAudit isUk={isUk} />;
    default:
      return null;
  }
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const isUk = lang === "uk";
  const tool = TOOLS.find((t) => t.slug === slug && t.isBuilt);
  if (!tool) notFound();

  const CATEGORY_COLORS: Record<string, string> = {
    calculator: "bg-amber-100 text-amber-700",
    audit: "bg-blue-100 text-blue-700",
    checklist: "bg-green-100 text-green-700",
    generator: "bg-violet-100 text-violet-700",
  };

  const CATEGORY_LABELS: Record<string, { uk: string; en: string }> = {
    calculator: { uk: "Калькулятор", en: "Calculator" },
    audit: { uk: "Аудит", en: "Audit" },
    checklist: { uk: "Чек-ліст", en: "Checklist" },
    generator: { uk: "Генератор", en: "Generator" },
  };

  const catColor = CATEGORY_COLORS[tool.category] ?? "bg-neutral-100 text-neutral-600";
  const catLabel = CATEGORY_LABELS[tool.category];

  const otherTools = TOOLS.filter((t) => t.isBuilt && t.slug !== slug).slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main id="main-content" className="flex-1">

        {/* Hero */}
        <section className="pt-32 pb-16 bg-linear-to-br from-indigo-600 to-violet-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08),transparent)] pointer-events-none" />
          <Container className="relative">
            {/* Breadcrumb */}
            <nav className="mb-6">
              <Link
                href={`/${lang}/tools`}
                className="inline-flex items-center gap-1.5 text-indigo-200 hover:text-white text-sm transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                {isUk ? "Всі інструменти" : "All Tools"}
              </Link>
            </nav>

            <div className="flex items-start gap-5">
              <div className="text-5xl">{tool.icon}</div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${catColor}`}>
                    {isUk ? catLabel?.uk : catLabel?.en}
                  </span>
                  {tool.badge && (
                    <span
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                        tool.badge === "New" ? "bg-green-500 text-white" : "bg-white text-indigo-700"
                      }`}
                    >
                      {tool.badge}
                    </span>
                  )}
                </div>
                <h1 className="text-4xl lg:text-5xl font-heading font-extrabold text-white mb-3 leading-tight">
                  {isUk ? tool.title : tool.titleEn}
                </h1>
                <p className="text-lg text-indigo-100 max-w-xl leading-relaxed">
                  {isUk ? tool.description : tool.descriptionEn}
                </p>
                <p className="mt-3 text-sm text-indigo-200">
                  🎁 {isUk ? "Безкоштовно · Без реєстрації · Працює у браузері" : "Free · No registration · Works in browser"}
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Tool */}
        <section className="py-16">
          <Container>
            <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm p-8 lg:p-12">
              <ToolComponent slug={slug} isUk={isUk} />
            </div>
          </Container>
        </section>

        {/* Other tools */}
        {otherTools.length > 0 && (
          <section className="py-16 bg-neutral-50">
            <Container>
              <h2 className="text-2xl font-heading font-extrabold text-neutral-900 mb-8">
                {isUk ? "Інші безкоштовні інструменти" : "Other free tools"}
              </h2>
              <div className="grid sm:grid-cols-3 gap-5">
                {otherTools.map((t) => (
                  <Link
                    key={t.id}
                    href={`/${lang}/${t.href}`}
                    className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-neutral-200 hover:shadow-md transition-shadow group"
                  >
                    <span className="text-3xl">{t.icon}</span>
                    <div>
                      <p className="font-semibold text-neutral-900 group-hover:text-indigo-600 transition-colors text-sm">
                        {isUk ? t.title : t.titleEn}
                      </p>
                      <p className="text-xs text-neutral-500 mt-1 leading-relaxed line-clamp-2">
                        {isUk ? t.description : t.descriptionEn}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Link
                  href={`/${lang}/tools`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-neutral-200 bg-white text-sm font-semibold text-neutral-700 hover:border-indigo-400 hover:text-indigo-600 transition-colors"
                >
                  {isUk ? "Переглянути всі інструменти →" : "View all tools →"}
                </Link>
              </div>
            </Container>
          </section>
        )}

        {/* CTA */}
        <section className="py-20">
          <Container>
            <div className="max-w-2xl mx-auto text-center p-10 rounded-3xl bg-linear-to-br from-indigo-50 to-violet-50 border border-indigo-100">
              <span className="text-4xl mb-4 block">🚀</span>
              <h2 className="text-2xl font-heading font-extrabold text-neutral-900 mb-3">
                {isUk ? "Потрібен повноцінний сайт?" : "Ready for a proper website?"}
              </h2>
              <p className="text-neutral-600 mb-6 text-sm leading-relaxed">
                {isUk
                  ? "Ми розробляємо швидкі, SEO-оптимізовані сайти з інтерактивними функціями для бізнесу будь-якого розміру."
                  : "We build fast, SEO-optimised websites with interactive features for businesses of any size."}
              </p>
              <Link
                href={`/${lang}/contact`}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 text-sm"
              >
                {isUk ? "Обговорити проєкт" : "Discuss your project"}
              </Link>
            </div>
          </Container>
        </section>

      </main>
      <Footer />
    </div>
  );
}
