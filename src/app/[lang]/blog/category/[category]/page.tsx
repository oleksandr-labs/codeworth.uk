import type { Metadata } from "next";
import { buildAlternates } from "@/i18n";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { BLOG_POSTS, BLOG_CATEGORIES, getPostTitle, getPostExcerpt } from "@/lib/data/blog";
import { Clock, Calendar, ArrowLeft, LayoutGrid } from "lucide-react";
import { EmojiIcon } from "@/components/ui/EmojiIcon";

interface Props {
  params: Promise<{ lang: string; category: string }>;
}

export async function generateStaticParams() {
  return BLOG_CATEGORIES.filter((c) => c.id !== "all").map((c) => ({
    category: c.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, category } = await params;
  const cat = BLOG_CATEGORIES.find((c) => c.id === category);
  if (!cat) return {};
  const isUk = lang === "uk";
  const label = isUk ? cat.label.uk : cat.label.en;
  const posts = BLOG_POSTS.filter((p) => p.category === cat.label.uk);
  const count = posts.length;
  const desc = isUk
    ? `${count} ${count === 1 ? "стаття" : count < 5 ? "статті" : "статей"} у категорії «${label}» — блог Codeworth.`
    : `${count} ${count === 1 ? "article" : "articles"} in the «${label}» category on the Codeworth blog.`;

  return {
    title: isUk
      ? `${label} — Блог Codeworth`
      : `${label} — Codeworth Blog`,
    description: desc,
    openGraph: {
      title: isUk ? `${label} — Блог Codeworth` : `${label} — Codeworth Blog`,
      description: desc,
      type: "website",
      url: `https://codeworth.uk/${lang}/blog/category/${category}`,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: isUk ? "Блог Codeworth" : "Codeworth Blog" }],
    },
    twitter: {
      card: "summary_large_image",
      title: isUk ? `${label} — Блог Codeworth` : `${label} — Codeworth Blog`,
      images: ["/opengraph-image"],
    },
    alternates: buildAlternates(lang, `blog/category/${category}`),
  };
}

function formatDate(dateStr: string, lang: string) {
  return new Date(dateStr).toLocaleDateString(lang === "uk" ? "uk-UA" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogCategoryPage({ params }: Props) {
  const { lang, category } = await params;
  const isUk = lang === "uk";
  const cat = BLOG_CATEGORIES.find((c) => c.id === category);
  if (!cat) notFound();

  const posts = BLOG_POSTS.filter((p) => p.category === cat.label.uk).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  if (!posts.length) notFound();

  const label = isUk ? cat.label.uk : cat.label.en;
  const description = cat.description ? (isUk ? cat.description.uk : cat.description.en) : undefined;
  const allCategories = BLOG_CATEGORIES.filter((c) => c.id !== "all");

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isUk ? "Головна" : "Home", item: `https://codeworth.uk/${lang}` },
      { "@type": "ListItem", position: 2, name: isUk ? "Блог" : "Blog", item: `https://codeworth.uk/${lang}/blog` },
      { "@type": "ListItem", position: 3, name: label, item: `https://codeworth.uk/${lang}/blog/category/${category}` },
    ],
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: isUk ? `${label} — Блог Codeworth` : `${label} — Codeworth Blog`,
    description: description,
    url: `https://codeworth.uk/${lang}/blog/category/${category}`,
    hasPart: posts.slice(0, 10).map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `https://codeworth.uk/${lang}/blog/${p.slug}`,
      datePublished: p.date,
      author: { "@type": "Person", name: p.author },
    })),
  };

  return (
    <div className="flex flex-col min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <Header />
      <main id="main-content" className="flex-1">
        {/* Hero */}
        <section className="pt-32 pb-12 bg-linear-to-br from-indigo-600 to-violet-600 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <Container className="relative">
            <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
              <Link href={`/${lang}`} className="hover:text-white transition-colors">
                {isUk ? "Головна" : "Home"}
              </Link>
              <span>/</span>
              <Link href={`/${lang}/blog`} className="hover:text-white transition-colors">
                {isUk ? "Блог" : "Blog"}
              </Link>
              <span>/</span>
              <span className="text-white/90">{label}</span>
            </nav>
            <div className="flex items-center gap-3 mb-4">
              {cat.icon ? (
                <span className="text-2xl" aria-hidden="true">{cat.icon}</span>
              ) : (
                <LayoutGrid className="w-6 h-6 text-white/70" />
              )}
              <span className="text-white/70 text-sm font-medium uppercase tracking-widest">
                {isUk ? "Категорія" : "Category"}
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-heading font-extrabold text-white mb-3">
              {label}
            </h1>
            {description && (
              <p className="text-white/70 text-lg mb-3 max-w-xl">{description}</p>
            )}
            <p className="text-white/60 text-sm">
              {posts.length}{" "}
              {isUk
                ? posts.length === 1 ? "стаття" : posts.length < 5 ? "статті" : "статей"
                : posts.length === 1 ? "article" : "articles"}
            </p>
          </Container>
        </section>

        <section className="py-16 bg-neutral-50 dark:bg-neutral-900 ">
          <Container>
            <div className="grid lg:grid-cols-4 gap-10">
              {/* Posts grid */}
              <div className="lg:col-span-3">
                <div className="grid sm:grid-cols-2 gap-6">
                  {posts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/${lang}/blog/${post.slug}`}
                      className="group bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-100 dark:border-neutral-700 overflow-hidden hover:shadow-lg hover:border-indigo-100 transition-all duration-300"
                    >
                      <div className={`h-36 bg-linear-to-br ${post.color} flex items-center justify-center`}>
                        <EmojiIcon emoji={post.emoji} className="w-16 h-16 text-white/80" />
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-3">
                          {cat.icon && <span className="text-base" aria-hidden="true">{cat.icon}</span>}
                          <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                            {label}
                          </span>
                        </div>
                        <h2 className="font-heading font-bold text-neutral-900 dark:text-white group-hover:text-indigo-700 transition-colors leading-snug mb-2 line-clamp-2">
                          {getPostTitle(post, lang)}
                        </h2>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-2 mb-4">
                          {getPostExcerpt(post, lang)}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-neutral-400 pt-3 border-t border-neutral-100">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(post.date, lang)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime} {isUk ? "хв" : "min"}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="mt-10">
                  <Link
                    href={`/${lang}/blog`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    {isUk ? "Всі статті блогу" : "All Blog Articles"}
                  </Link>
                </div>
              </div>

              {/* Sidebar — all categories */}
              <aside className="lg:col-span-1">
                <div className="bg-white rounded-2xl border border-neutral-100 dark:border-neutral-700 p-5 sticky top-24">
                  <h3 className="font-heading font-bold text-neutral-900 dark:text-white mb-4 text-sm uppercase tracking-wider">
                    {isUk ? "Категорії" : "Categories"}
                  </h3>
                  <div className="flex flex-col gap-1.5">
                    {allCategories.map((c) => {
                      const catPostCount = BLOG_POSTS.filter((p) => p.category === c.label.uk).length;
                      return (
                        <Link
                          key={c.id}
                          href={`/${lang}/blog/category/${c.id}`}
                          className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-colors ${
                            c.id === category
                              ? "bg-indigo-600 text-white font-semibold"
                              : "text-neutral-600 dark:text-neutral-300 hover:bg-indigo-50 hover:text-indigo-700"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            {c.icon && <span aria-hidden="true">{c.icon}</span>}
                            {isUk ? c.label.uk : c.label.en}
                          </span>
                          <span className={`text-xs px-1.5 py-0.5 rounded-full ${c.id === category ? "bg-white/20 text-white" : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500"}`}>
                            {catPostCount}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </aside>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
