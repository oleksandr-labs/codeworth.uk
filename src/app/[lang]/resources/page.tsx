import type { Metadata } from "next";
import Link from "next/link";
import { buildAlternates } from "@/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { RESOURCES, RESOURCE_CATEGORIES } from "@/lib/data/resources";
import { ArrowRight, Download, Clock, Zap } from "lucide-react";
import { EmojiIcon } from "@/components/ui/EmojiIcon";

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
  const title = isUk
    ? "Безкоштовні матеріали для бізнесу — чек-листи, гайди, шаблони | Codeworth"
    : "Free Business Resources — Checklists, Guides, Templates | Codeworth";
  const desc = isUk
    ? "Завантажте безкоштовно: чек-ліст запуску сайту, SEO-аудит, гайди з цифрового маркетингу. 9+ практичних матеріалів від веб-студії Codeworth."
    : "Download for free: website launch checklist, SEO audit, digital marketing guides. 9+ practical resources from Codeworth web studio.";
  return {
    title,
    description: desc,
    openGraph: {
      title,
      description: desc,
      type: "website",
      url: `https://codeworth.uk/${lang}/resources`,
      images: [{ url: "/og/resources.png", width: 1200, height: 630, alt: title }],
    },
    alternates: buildAlternates(lang, "/resources"),
  };
}

const FORMAT_ICONS: Record<string, React.ReactNode> = {
  interactive: <Zap className="w-4 h-4" />,
  pdf: <Download className="w-4 h-4" />,
  page: <ArrowRight className="w-4 h-4" />,
};

const FORMAT_LABELS = {
  interactive: { uk: "Інтерактив", en: "Interactive" },
  pdf: { uk: "PDF", en: "PDF" },
  page: { uk: "Стаття", en: "Article" },
};

export default async function ResourcesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const isUk = lang === "uk";

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isUk ? "Головна" : "Home", item: `https://codeworth.uk/${lang}` },
      { "@type": "ListItem", position: 2, name: isUk ? "Ресурси" : "Resources" },
    ],
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: isUk ? "Безкоштовні матеріали Codeworth" : "Codeworth Free Resources",
    url: `https://codeworth.uk/${lang}/resources`,
    description: isUk
      ? "Безкоштовні чек-листи, гайди та шаблони для власників бізнесу"
      : "Free checklists, guides and templates for business owners",
    numberOfItems: RESOURCES.length,
  };

  const popular = RESOURCES.filter((r) => r.isPopular);
  const checklists = RESOURCES.filter((r) => r.category === "checklist");
  const guides = RESOURCES.filter((r) => r.category === "guide");
  const tools = RESOURCES.filter((r) => r.category === "tool" || r.category === "template");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-indigo-900 to-purple-900 py-16 sm:py-20">
          <Container>
            <nav className="mb-6 text-sm text-indigo-300">
              <Link href={`/${lang}`} className="hover:text-white transition-colors">
                {isUk ? "Головна" : "Home"}
              </Link>
              <span className="mx-2">›</span>
              <span className="text-white">{isUk ? "Ресурси" : "Resources"}</span>
            </nav>
            <div className="max-w-2xl">
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                {isUk
                  ? "Безкоштовні матеріали для власників бізнесу"
                  : "Free Resources for Business Owners"}
              </h1>
              <p className="text-indigo-200 text-lg mb-6">
                {isUk
                  ? "Зібрали практичні гайди, чек-листи та шаблони, якими користуємося самі. Завантажуйте безкоштовно — без спаму."
                  : "We compiled practical guides, checklists, and templates we use ourselves. Download free — no spam."}
              </p>
              <div className="flex items-center gap-6 text-indigo-300 text-sm">
                <span>📋 {RESOURCES.filter((r) => r.category === "checklist").length} {isUk ? "чек-листи" : "checklists"}</span>
                <span>📖 {RESOURCES.filter((r) => r.category === "guide").length} {isUk ? "гайди" : "guides"}</span>
                <span>🔧 {RESOURCES.filter((r) => r.category === "tool").length} {isUk ? "інструменти" : "tools"}</span>
              </div>
            </div>
          </Container>
        </section>

        {/* Popular */}
        <section className="py-12 bg-white dark:bg-neutral-800 border-b">
          <Container>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              <EmojiIcon emoji="🔥" className="w-5 h-5 inline-block align-middle mr-1" />{isUk ? "Популярне" : "Popular"}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {popular.map((r) => (
                <ResourceCard key={r.slug} resource={r} lang={lang} isUk={isUk} />
              ))}
            </div>
          </Container>
        </section>

        {/* Checklists */}
        <section className="py-12 bg-gray-50 dark:bg-neutral-900 border-b">
          <Container>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">✅ {isUk ? "Чек-листи" : "Checklists"}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {checklists.map((r) => (
                <ResourceCard key={r.slug} resource={r} lang={lang} isUk={isUk} />
              ))}
            </div>
          </Container>
        </section>

        {/* Guides */}
        <section className="py-12 bg-white dark:bg-neutral-800 border-b">
          <Container>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">📖 {isUk ? "Гайди" : "Guides"}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {guides.map((r) => (
                <ResourceCard key={r.slug} resource={r} lang={lang} isUk={isUk} />
              ))}
            </div>
          </Container>
        </section>

        {/* Tools & Templates */}
        <section className="py-12 bg-gray-50">
          <Container>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              🔧 {isUk ? "Інструменти та шаблони" : "Tools & Templates"}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tools.map((r) => (
                <ResourceCard key={r.slug} resource={r} lang={lang} isUk={isUk} />
              ))}
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-16 bg-indigo-600">
          <Container>
            <div className="text-center text-white">
              <h2 className="text-2xl font-bold mb-3">
                {isUk ? "Хочете профі-аудит вашого сайту?" : "Want a Pro Audit of Your Website?"}
              </h2>
              <p className="text-indigo-200 mb-6 max-w-lg mx-auto">
                {isUk
                  ? "Наші спеціалісти проведуть повний SEO та UX-аудит і дадуть конкретні рекомендації."
                  : "Our specialists will conduct a full SEO and UX audit with concrete recommendations."}
              </p>
              <Link
                href={`/${lang}/contact`}
                className="inline-flex items-center gap-2 bg-white text-indigo-600 font-semibold px-8 py-3 rounded-xl hover:bg-indigo-50 transition-colors"
              >
                {isUk ? "Замовити аудит" : "Order Audit"}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}

function ResourceCard({
  resource,
  lang,
  isUk,
}: {
  resource: ReturnType<typeof import("@/lib/data/resources").getResource> & object;
  lang: string;
  isUk: boolean;
}) {
  if (!resource) return null;
  const catMeta = RESOURCE_CATEGORIES.find((c) => c.value === resource.category);
  const formatLabel = resource.format === "interactive"
    ? (isUk ? "Інтерактив" : "Interactive")
    : resource.format === "pdf"
    ? "PDF"
    : (isUk ? "Стаття" : "Article");

  return (
    <Link
      href={`/${lang}/resources/${resource.slug}`}
      className="bg-white rounded-xl p-5 border border-gray-200 dark:border-neutral-700 hover:border-indigo-300 hover:shadow-md transition-all group flex flex-col"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
          {catMeta?.emoji && <EmojiIcon emoji={catMeta.emoji} className="w-4 h-4 inline-block align-middle mr-1" />}{isUk ? catMeta?.labelUk : catMeta?.labelEn}
        </span>
        {resource.isPopular && (
          <span className="text-xs text-orange-600 font-medium inline-flex items-center gap-1"><EmojiIcon emoji="🔥" className="w-3.5 h-3.5" />{isUk ? "Популярне" : "Popular"}</span>
        )}
      </div>
      <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-2 group-hover:text-indigo-700 transition-colors leading-snug flex-1">
        {isUk ? resource.titleUk : resource.titleEn}
      </h3>
      <p className="text-xs text-gray-500 dark:text-neutral-400 line-clamp-2 mb-4">
        {isUk ? resource.descriptionUk : resource.descriptionEn}
      </p>
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <Clock className="w-3.5 h-3.5" />
          {resource.readTime} {isUk ? "хв" : "min"}
        </div>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
          resource.emailRequired
            ? "bg-orange-50 text-orange-600"
            : "bg-green-50 text-green-600"
        }`}>
          {resource.emailRequired
            ? (isUk ? "Email" : "Email")
            : (isUk ? "Безкоштовно" : "Free")}
        </span>
      </div>
    </Link>
  );
}
