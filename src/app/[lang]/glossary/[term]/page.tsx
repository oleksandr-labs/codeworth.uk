import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildAlternates } from "@/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import {
  GLOSSARY_TERMS,
  GLOSSARY_CATEGORIES,
  getTerm,
  GLOSSARY_TERM_SLUGS,
} from "@/lib/data/glossary";
import { ArrowRight, BookOpen, ExternalLink, FileText } from "lucide-react";
import { BLOG_POSTS } from "@/lib/data/blog";

export async function generateStaticParams() {
  const langs = ["uk", "en"];
  return langs.flatMap((lang) => GLOSSARY_TERM_SLUGS.map((term) => ({ lang, term })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; term: string }>;
}): Promise<Metadata> {
  const { lang, term: termSlug } = await params;
  const term = getTerm(termSlug);
  if (!term) return {};
  const isUk = lang === "uk";
  const title = isUk
    ? `${term.termUk} — що це таке: визначення та приклади | Codeworth Глосарій`
    : `${term.termEn} — Definition and Examples | Codeworth Glossary`;
  const desc = isUk
    ? `${term.termUk}: ${term.shortDescription} Дізнайтесь більше у глосарії Codeworth.`
    : `${term.termEn}: ${term.shortDescription} Learn more in the Codeworth glossary.`;
  return {
    title,
    description: desc,
    openGraph: {
      title,
      description: desc,
      type: "article",
      url: `https://codeworth.uk/${lang}/glossary/${termSlug}`,
    },
    alternates: buildAlternates(lang, `/glossary/${termSlug}`),
  };
}

export default async function GlossaryTermPage({
  params,
}: {
  params: Promise<{ lang: string; term: string }>;
}) {
  const { lang, term: termSlug } = await params;
  const term = getTerm(termSlug);
  if (!term) notFound();

  const isUk = lang === "uk";
  const catMeta = GLOSSARY_CATEGORIES.find((c) => c.value === term.category);

  const relatedTerms = term.relatedTerms
    .map((slug) => GLOSSARY_TERMS.find((t) => t.slug === slug))
    .filter(Boolean) as typeof GLOSSARY_TERMS;

  const SERVICE_NAMES: Record<string, { uk: string; en: string }> = {
    "website-dev": { uk: "Розробка сайтів", en: "Website Development" },
    landing: { uk: "Лендінги", en: "Landing Pages" },
    ecommerce: { uk: "Інтернет-магазини", en: "E-Commerce" },
    seo: { uk: "SEO-просування", en: "SEO Services" },
    design: { uk: "UI/UX Дизайн", en: "UI/UX Design" },
    mobile: { uk: "Мобільні PWA", en: "Mobile PWA" },
    integrations: { uk: "Інтеграції", en: "Integrations" },
    "artificial-intelligence": { uk: "Штучний інтелект", en: "Artificial Intelligence" },
    "machine-learning": { uk: "Machine Learning", en: "Machine Learning" },
    ads: { uk: "Реклама", en: "Advertising" },
    chatbots: { uk: "Чат-боти", en: "Chatbots" },
    "email-marketing": { uk: "Email-маркетинг", en: "Email Marketing" },
    smm: { uk: "SMM", en: "SMM" },
    crm: { uk: "CRM-інтеграції", en: "CRM Integrations" },
    branding: { uk: "Брендинг", en: "Branding" },
    support: { uk: "Технічна підтримка", en: "Technical Support" },
  };

  const relatedBlogPost = term.relatedBlogPost
    ? BLOG_POSTS.find((p) => p.slug === term.relatedBlogPost)
    : undefined;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isUk ? "Головна" : "Home", item: `https://codeworth.uk/${lang}` },
      {
        "@type": "ListItem",
        position: 2,
        name: isUk ? "Глосарій" : "Glossary",
        item: `https://codeworth.uk/${lang}/glossary`,
      },
      { "@type": "ListItem", position: 3, name: term.termUk },
    ],
  };

  const definedTermSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: isUk ? term.termUk : term.termEn,
    description: term.shortDescription,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: isUk ? "Глосарій Codeworth" : "Codeworth Glossary",
      url: `https://codeworth.uk/${lang}/glossary`,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-linear-to-br from-gray-900 to-indigo-900 py-14 sm:py-18">
          <Container>
            <nav className="mb-6 text-sm text-gray-400">
              <Link href={`/${lang}`} className="hover:text-white transition-colors">
                {isUk ? "Головна" : "Home"}
              </Link>
              <span className="mx-2">›</span>
              <Link href={`/${lang}/glossary`} className="hover:text-white transition-colors">
                {isUk ? "Глосарій" : "Glossary"}
              </Link>
              <span className="mx-2">›</span>
              <span className="text-white">{term.termUk}</span>
            </nav>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-medium text-indigo-300 bg-indigo-900/50 border border-indigo-700 px-3 py-1 rounded-full">
                {catMeta?.emoji} {isUk ? catMeta?.label : catMeta?.labelEn}
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4">{term.termUk}</h1>
            {term.termEn !== term.termUk && (
              <p className="text-indigo-300 text-lg mb-4">{term.termEn}</p>
            )}
            <p className="text-xl text-gray-200 max-w-2xl leading-relaxed">{term.shortDescription}</p>
          </Container>
        </section>

        {/* Content */}
        <section className="py-12 bg-white">
          <Container>
            <div className="max-w-3xl mx-auto">
              {/* Full description */}
              <div className="prose prose-lg max-w-none mb-10">
                {term.fullDescription.split("\n\n").map((para, i) => (
                  <p key={i} className="text-gray-700 leading-relaxed mb-4"
                    dangerouslySetInnerHTML={{
                      __html: para
                        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                        .replace(/\n/g, "<br/>"),
                    }}
                  />
                ))}
              </div>

              {/* Example */}
              {term.example && (
                <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 mb-10">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-5 h-5 text-indigo-600" />
                    <span className="font-semibold text-indigo-800">{isUk ? "Приклад" : "Example"}</span>
                  </div>
                  <p className="text-indigo-900">{term.example}</p>
                </div>
              )}

              {/* How Codeworth applies */}
              {term.relatedService && SERVICE_NAMES[term.relatedService] && (
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-10">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {isUk
                      ? `Як Codeworth застосовує ${term.termUk}`
                      : `How Codeworth applies ${term.termEn}`}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {isUk
                      ? `Codeworth використовує ${term.termUk} у послузі «${SERVICE_NAMES[term.relatedService].uk}». Хочете дізнатись більше або замовити — звертайтесь до нас.`
                      : `Codeworth applies ${term.termEn} in the "${SERVICE_NAMES[term.relatedService].en}" service. Want to learn more or order — contact us.`}
                  </p>
                  <Link
                    href={`/${lang}/services/${term.relatedService}`}
                    className="inline-flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-800 transition-colors"
                  >
                    {isUk ? "Дізнатись про послугу" : "Learn about the service"}
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              )}

              {/* Related blog post */}
              {relatedBlogPost && (
                <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 mb-10">
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="w-5 h-5 text-indigo-600" />
                    <span className="font-semibold text-indigo-800">
                      {isUk ? "Читайте детальніше у блозі" : "Read more in our blog"}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-3 text-sm leading-relaxed">
                    {relatedBlogPost.excerpt}
                  </p>
                  <Link
                    href={`/${lang}/blog/${relatedBlogPost.slug}`}
                    className="inline-flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-800 transition-colors text-sm"
                  >
                    {relatedBlogPost.emoji} {relatedBlogPost.title}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}

              {/* Related terms */}
              {relatedTerms.length > 0 && (
                <div className="mb-10">
                  <h3 className="font-semibold text-gray-800 mb-4">
                    {isUk ? "Пов'язані терміни" : "Related Terms"}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {relatedTerms.map((rt) => (
                      <Link
                        key={rt.slug}
                        href={`/${lang}/glossary/${rt.slug}`}
                        className="inline-flex items-center gap-1 bg-gray-100 hover:bg-indigo-100 text-gray-700 hover:text-indigo-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        {rt.termUk}
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Container>
        </section>

        {/* Back to glossary + CTA */}
        <section className="py-12 bg-gray-50 border-t">
          <Container>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <Link
                href={`/${lang}/glossary`}
                className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
              >
                ← {isUk ? "Назад до глосарію" : "Back to Glossary"}
              </Link>
              <Link
                href={`/${lang}/contact`}
                className="inline-flex items-center gap-2 bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors"
              >
                {isUk ? "Безкоштовна консультація" : "Free Consultation"}
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
