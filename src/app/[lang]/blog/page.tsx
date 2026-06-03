import type { Metadata } from "next";
import { buildAlternates } from "@/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import Link from "next/link";
import { BlogContent } from "@/components/blog/BlogContent";
import { BLOG_POSTS, BLOG_CATEGORIES } from "@/lib/data/blog";

export const revalidate = 300; // ISR: revalidate every 5 minutes

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isUk = lang === "uk";
  return {
    title: isUk
      ? "Блог — Codeworth | Веб-розробка, SEO, дизайн, кейси"
      : "Blog — Codeworth | Web Development, SEO, Design, Cases",
    description: isUk
      ? "Блог Codeworth — статті про веб-розробку на Next.js, SEO-просування, UI/UX дизайн, e-commerce та кейси клієнтів. Корисний контент для бізнесу."
      : "Codeworth Blog — articles about Next.js web development, SEO, UI/UX design, e-commerce, and client case studies. Useful content for businesses.",
    alternates: buildAlternates(lang, 'blog'),
    openGraph: {
      title: isUk ? "Блог — Codeworth" : "Blog — Codeworth",
      description: isUk
        ? "Блог Codeworth — статті про веб-розробку на Next.js, SEO-просування, UI/UX дизайн, e-commerce та кейси клієнтів."
        : "Codeworth Blog — articles about Next.js web development, SEO, UI/UX design, e-commerce, and client case studies.",
      type: "website",
      url: `https://codeworth.uk/${lang}/blog`,
      images: [{ url: "/og/blog.png", width: 1200, height: 630, alt: isUk ? "Блог Codeworth" : "Codeworth Blog" }],
    },
    twitter: {
      card: "summary_large_image",
      title: isUk ? "Блог — Codeworth" : "Blog — Codeworth",
      description: isUk
        ? "Статті про веб-розробку, SEO, дизайн та e-commerce від команди Codeworth."
        : "Articles about web development, SEO, design, and e-commerce from the Codeworth team.",
      images: ["/og/blog.png"],
    },
  };
}

const HERO_CATEGORIES = BLOG_CATEGORIES.filter((c) => c.id !== 'all' && c.icon).slice(0, 10);

export default async function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isUk = lang === "uk";

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isUk ? "Головна" : "Home", item: `https://codeworth.uk/${lang}` },
      { "@type": "ListItem", position: 2, name: isUk ? "Блог" : "Blog", item: `https://codeworth.uk/${lang}/blog` },
    ],
  };


  const postCount = BLOG_POSTS.length;
  const categoryCount = BLOG_CATEGORIES.filter((c) => c.id !== 'all').length;
  const tagCount = new Set(BLOG_POSTS.flatMap((p) => p.tags)).size;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main id="main-content" className="flex-1">

        {/* Hero */}
        <section className="pt-32 pb-16 gradient-hero">
          <Container>
            <nav className="flex items-center gap-2 text-sm text-neutral-400 mb-8">
              <Link href={`/${lang}`} className="hover:text-indigo-600 transition-colors">
                {isUk ? "Головна" : "Home"}
              </Link>
              <span>/</span>
              <span className="text-neutral-700 dark:text-neutral-300 font-medium">{isUk ? "Блог" : "Blog"}</span>
            </nav>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-4">
                {isUk ? "Блог" : "Blog"}
              </p>
              <h1 className="text-5xl lg:text-6xl font-heading font-extrabold text-neutral-900 dark:text-white mb-5">
                {isUk ? "Знання & Кейси" : "Knowledge & Cases"}
              </h1>
              <p className="text-lg text-neutral-500 dark:text-neutral-400 mb-8 max-w-2xl mx-auto leading-relaxed">
                {isUk
                  ? `${postCount} статей від команди Codeworth — практичні гайди з веб-розробки на Next.js, реальні SEO-кейси, огляди інструментів та розбір проєктів із конкретними метриками.`
                  : `${postCount} articles from the Codeworth team — practical Next.js development guides, real SEO case studies, tool reviews, and project breakdowns with concrete metrics.`}
              </p>

              {/* Stats strip */}
              <div className="flex flex-wrap justify-center gap-8 mb-8 text-sm">
                <div className="flex flex-col items-center gap-0.5">
                  <span className="text-4xl font-extrabold tabular-nums text-neutral-900 dark:text-white leading-none">{postCount}</span>
                  <span className="text-neutral-500 dark:text-neutral-400 text-sm">{isUk ? "статей" : "articles"}</span>
                </div>
                <div className="w-px h-12 bg-neutral-200 dark:bg-neutral-700 self-center hidden sm:block" />
                <div className="flex flex-col items-center gap-0.5">
                  <span className="text-4xl font-extrabold tabular-nums text-neutral-900 dark:text-white leading-none">{categoryCount}</span>
                  <span className="text-neutral-500 dark:text-neutral-400 text-sm">{isUk ? "категорій" : "categories"}</span>
                </div>
                <div className="w-px h-12 bg-neutral-200 dark:bg-neutral-700 self-center hidden sm:block" />
                <div className="flex flex-col items-center gap-0.5">
                  <span className="text-4xl font-extrabold tabular-nums text-neutral-900 dark:text-white leading-none">{tagCount}+</span>
                  <span className="text-neutral-500 dark:text-neutral-400 text-sm">{isUk ? "тегів" : "tags"}</span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                {HERO_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/${lang}/blog/category/${cat.id}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-600 dark:text-neutral-300 font-medium shadow-sm hover:border-indigo-300 hover:text-indigo-600 transition-colors"
                  >
                    <span aria-hidden="true">{cat.icon}</span>
                    {isUk ? cat.label.uk : cat.label.en}
                  </Link>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section className="py-24 bg-white dark:bg-neutral-950">
          <Container>
            <BlogContent />
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
