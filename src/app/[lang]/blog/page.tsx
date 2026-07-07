import type { Metadata } from "next";
import { buildAlternates } from "@/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import Link from "next/link";
import { BlogContent } from "@/components/blog/BlogContent";
import { BLOG_POSTS, BLOG_CATEGORIES, getPostCategoryId } from "@/lib/data/blog";
import { ArrowRight } from "lucide-react";

const CATEGORY_BADGE_CLASSES: Record<string, string> = {
  indigo: "bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300",
  violet: "bg-violet-50 dark:bg-violet-950 text-violet-700 dark:text-violet-300",
  blue: "bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300",
  emerald: "bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300",
  amber: "bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300",
  rose: "bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300",
};

const CATEGORY_HOVER_BORDER_CLASSES: Record<string, string> = {
  indigo: "hover:border-indigo-300 dark:hover:border-indigo-700",
  violet: "hover:border-violet-300 dark:hover:border-violet-700",
  blue: "hover:border-blue-300 dark:hover:border-blue-700",
  emerald: "hover:border-emerald-300 dark:hover:border-emerald-700",
  amber: "hover:border-amber-300 dark:hover:border-amber-700",
  rose: "hover:border-rose-300 dark:hover:border-rose-700",
};

export const revalidate = 300; // ISR: revalidate every 5 minutes

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isUk = lang === "uk";
  return {
    title: isUk
      ? "Блог — Codeworth | ML, AI, NLP, MLOps, LLM — гіди та кейси"
      : "Blog — Codeworth | ML, AI, NLP, MLOps, LLM — Guides & Case Studies",
    description: isUk
      ? "Блог Codeworth — практичні гіди з Machine Learning, NLP, Computer Vision, MLOps, LLM & RAG та предиктивної аналітики. Кейси та інсайти для UK бізнесу."
      : "Codeworth Blog — practical guides on Machine Learning, NLP, Computer Vision, MLOps, LLM & RAG, and predictive analytics. Cases and insights for UK business.",
    alternates: buildAlternates(lang, 'blog'),
    openGraph: {
      title: isUk ? "Блог — Codeworth" : "Blog — Codeworth",
      description: isUk
        ? "Практичні гіди з ML, NLP, Computer Vision, MLOps, LLM & RAG та предиктивної аналітики від Codeworth."
        : "Practical guides on ML, NLP, Computer Vision, MLOps, LLM & RAG, and predictive analytics from Codeworth.",
      type: "website",
      url: `https://codeworth.uk/${lang}/blog`,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: isUk ? "Блог Codeworth" : "Codeworth Blog" }],
    },
    twitter: {
      card: "summary_large_image",
      title: isUk ? "Блог — Codeworth" : "Blog — Codeworth",
      description: isUk
        ? "ML, NLP, MLOps, LLM & RAG — гіди та кейси від команди Codeworth."
        : "ML, NLP, MLOps, LLM & RAG — guides and case studies from the Codeworth team.",
      images: ["/opengraph-image"],
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

            </div>
          </Container>
        </section>

        {/* Browse by category — primary discovery entry point */}
        <section className="py-16 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800">
          <Container>
            <h2 className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-6 text-center">
              {isUk ? "Огляд за категоріями" : "Browse by Category"}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {HERO_CATEGORIES.map((cat) => {
                const count = BLOG_POSTS.filter((p) => getPostCategoryId(p) === cat.id).length;
                const badgeClasses = CATEGORY_BADGE_CLASSES[cat.color ?? "indigo"] ?? CATEGORY_BADGE_CLASSES.indigo;
                const hoverBorderClasses = CATEGORY_HOVER_BORDER_CLASSES[cat.color ?? "indigo"] ?? CATEGORY_HOVER_BORDER_CLASSES.indigo;
                return (
                  <Link
                    key={cat.id}
                    href={`/${lang}/blog/category/${cat.id}`}
                    className={`group flex items-start gap-4 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:shadow-md transition-all duration-200 ${hoverBorderClasses}`}
                  >
                    <div className={`shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-xl ${badgeClasses}`}>
                      <span aria-hidden="true">{cat.icon}</span>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-heading font-bold text-neutral-900 dark:text-white leading-tight">
                          {isUk ? cat.label.uk : cat.label.en}
                        </h3>
                        <span className="text-xs text-neutral-400 dark:text-neutral-500 shrink-0">
                          {count} {isUk ? "статей" : "articles"}
                        </span>
                      </div>
                      {cat.description && (
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-2">
                          {isUk ? cat.description.uk : cat.description.en}
                        </p>
                      )}
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mt-2 group-hover:gap-1.5 transition-all">
                        {isUk ? "Переглянути" : "Browse"}
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                );
              })}
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
