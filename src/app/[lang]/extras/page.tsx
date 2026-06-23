import type { Metadata } from "next";
import { buildAlternates } from "@/i18n";
import { ExtrasHero } from "@/components/extras/ExtrasHero";
import { ExtrasCatalog } from "@/components/extras/ExtrasCatalog";
import { EXTRAS } from "@/lib/data/extras";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isUk = lang === "uk";
  return {
    title: isUk
      ? "AI-модулі та готові рішення — Codeworth | Від £350"
      : "AI Modules & Ready-to-Deploy Solutions — Codeworth | From £350",
    description: isUk
      ? "29+ готових AI-продуктів для бізнесу: RAG чат-боти, генератори контенту, CV-пошук, recommendation engines. Швидкий деплой у ваш проєкт від £350."
      : "29+ ready-to-deploy AI products for business: RAG chatbots, content generators, visual search, recommendation engines. Fast deployment from £350.",
    openGraph: {
      title: isUk ? "AI-модулі — Codeworth" : "AI Modules — Codeworth",
      description: isUk
        ? "Готові AI-продукти: RAG чат-боти, CV, NLP, recommendation engines."
        : "Ready-to-deploy AI products: RAG chatbots, CV, NLP, recommendation engines.",
      type: "website",
      url: `https://codeworth.uk/${lang}/extras`,
      images: [{ url: "/og/extras.png", width: 1200, height: 630, alt: isUk ? "AI-модулі Codeworth" : "Codeworth AI Modules" }],
    },
    twitter: {
      card: "summary_large_image",
      title: isUk ? "AI-модулі — Codeworth" : "AI Modules — Codeworth",
      description: isUk ? "29+ готових AI-продуктів від £350." : "29+ ready-to-deploy AI products from £350.",
      images: ["/og/extras.png"],
    },
    alternates: buildAlternates(lang, 'extras'),
  };
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Головна", item: "https://codeworth.uk" },
    { "@type": "ListItem", position: 2, name: "Доробки та модулі" },
  ],
};

export default async function ExtrasPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  // Schema.org ItemList
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Доробки та модулі Codeworth",
    description: "Готові модулі, функції та доробки для сайтів від студії Codeworth",
    url: "https://codeworth.uk/extras",
    numberOfItems: EXTRAS.length,
    itemListElement: EXTRAS.map((extra, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: extra.title,
      description: extra.description,
      url: `https://codeworth.uk/contact?extra=${extra.id}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <ExtrasHero lang={lang} />
      <ExtrasCatalog />
    </>
  );
}
