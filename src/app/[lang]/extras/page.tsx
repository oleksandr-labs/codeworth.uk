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
      ? "Доробки та модулі — CodeNest | Розширення для вашого сайту"
      : "Add-ons & Modules — CodeNest | Extensions for Your Website",
    description: isUk
      ? "42+ готових модулі та доробки для сайту: форми, інтеграції, сторінки, аналітика, SEO-аудит. Підключимо до вашого проєкту від 800 ₴."
      : "42+ ready-made modules and add-ons for your website: forms, integrations, pages, analytics, SEO audit. From £20. Installed and configured for your project.",
    openGraph: {
      title: isUk ? "Доробки та модулі — CodeNest" : "Add-ons & Modules — CodeNest",
      description: isUk
        ? "Готові модулі та функції для вашого сайту. Від форм і калькуляторів до CRM та онлайн-оплати."
        : "Ready-made modules and features for your website. From forms and calculators to CRM and online payments.",
      type: "website",
      url: `https://codenest.com.ua/${lang}/extras`,
      images: [{ url: "/og/extras.png", width: 1200, height: 630, alt: isUk ? "Доробки та модулі CodeNest" : "CodeNest Add-ons" }],
    },
    twitter: {
      card: "summary_large_image",
      title: isUk ? "Доробки та модулі — CodeNest" : "Add-ons & Modules — CodeNest",
      description: isUk ? "42+ готових модулів від 800 ₴." : "42+ ready-made modules from £20.",
      images: ["/og/extras.png"],
    },
    alternates: buildAlternates(lang, 'extras'),
  };
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Головна", item: "https://codenest.com.ua" },
    { "@type": "ListItem", position: 2, name: "Доробки та модулі" },
  ],
};

export default async function ExtrasPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  // Schema.org ItemList
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Доробки та модулі CodeNest",
    description: "Готові модулі, функції та доробки для сайтів від студії CodeNest",
    url: "https://codenest.com.ua/extras",
    numberOfItems: EXTRAS.length,
    itemListElement: EXTRAS.map((extra, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: extra.title,
      description: extra.description,
      url: `https://codenest.com.ua/contact?extra=${extra.id}`,
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
