import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GlossaryClient } from "@/components/glossary/GlossaryClient";
import { buildAlternates } from "@/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isUk = lang === "uk";
  return {
    title: isUk
      ? "Глосарій веб-розробки: 100+ термінів від A до Я | CodeNest"
      : "Web Development Glossary: 100+ Terms A to Z | CodeNest",
    description: isUk
      ? "100+ ключових термінів SEO, API, CMS, Core Web Vitals, PWA та цифрового маркетингу. Зрозумілий словник без жаргону від CodeNest."
      : "100+ key terms: SEO, API, CMS, Core Web Vitals, PWA and digital marketing. Clear glossary without jargon by CodeNest.",
    alternates: buildAlternates(`/${lang}/glossary`),
  };
}

export default async function GlossaryPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const isUk = lang === "uk";

  const heading = isUk
    ? "Глосарій веб-розробки та цифрового маркетингу"
    : "Web Development & Digital Marketing Glossary";
  const subheading = isUk
    ? "100+ ключових термінів: SEO, API, CMS, Core Web Vitals, PWA та багато іншого. Зрозуміло — без жаргону."
    : "100+ key terms: SEO, API, CMS, Core Web Vitals, PWA, and more. Clear explanations — no jargon.";

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isUk ? "Головна" : "Home", item: `https://codenest.com.ua/${lang}` },
      { "@type": "ListItem", position: 2, name: isUk ? "Глосарій" : "Glossary" },
    ],
  };

  const definedTermSetSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: heading,
    url: `https://codenest.com.ua/${lang}/glossary`,
    description: subheading,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSetSchema) }} />
      <Header />
      <GlossaryClient lang={lang} isUk={isUk} />
      <Footer />
    </>
  );
}
