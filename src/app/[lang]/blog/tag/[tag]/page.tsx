import type { Metadata } from "next";
import { buildAlternates } from "@/i18n";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { BLOG_POSTS } from "@/lib/data/blog";
import { Clock, Calendar, ArrowLeft, Tag } from "lucide-react";

interface Props {
  params: Promise<{ lang: string; tag: string }>;
}

function getAllTags(): string[] {
  return [...new Set(BLOG_POSTS.flatMap((p) => p.tags))];
}

export async function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag: encodeURIComponent(tag) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, tag } = await params;
  const decoded = decodeURIComponent(tag);
  const posts = BLOG_POSTS.filter((p) => p.tags.includes(decoded));
  if (!posts.length) return {};
  const isUk = lang === "uk";
  return {
    title: isUk
      ? `#${decoded} — Статті блогу Codeworth`
      : `#${decoded} — Codeworth Blog Articles`,
    description: isUk
      ? `${posts.length} ${posts.length === 1 ? "стаття" : posts.length < 5 ? "статті" : "статей"} з тегом «${decoded}» у блозі веб-студії Codeworth.`
      : `${posts.length} ${posts.length === 1 ? "article" : "articles"} tagged «${decoded}» on the Codeworth blog.`,
    openGraph: {
      title: isUk ? `#${decoded} — Блог Codeworth` : `#${decoded} — Codeworth Blog`,
      description: isUk
        ? `Статті з тегом «${decoded}» у блозі Codeworth.`
        : `Articles tagged «${decoded}» on the Codeworth blog.`,
      type: "website",
      url: `https://codeworth.uk/${lang}/blog/tag/${tag}`,
      images: [{ url: "/og/blog.png", width: 1200, height: 630, alt: isUk ? "Блог Codeworth" : "Codeworth Blog" }],
    },
    twitter: {
      card: "summary_large_image",
      title: isUk ? `#${decoded} — Блог Codeworth` : `#${decoded} — Codeworth Blog`,
      images: ["/og/blog.png"],
    },
    alternates: buildAlternates(lang, `blog/tag/${tag}`),
  };
}

function formatDate(dateStr: string, lang: string) {
  return new Date(dateStr).toLocaleDateString(lang === "uk" ? "uk-UA" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogTagPage({ params }: Props) {
  const { lang, tag } = await params;
  const isUk = lang === "uk";
  const decoded = decodeURIComponent(tag);
  const posts = BLOG_POSTS.filter((p) => p.tags.includes(decoded));
  if (!posts.length) notFound();

  const allTags = getAllTags();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Головна", item: "https://codeworth.uk" },
      { "@type": "ListItem", position: 2, name: "Блог", item: "https://codeworth.uk/blog" },
      { "@type": "ListItem", position: 3, name: `#${decoded}`, item: `https://codeworth.uk/blog/tag/${tag}` },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
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
              <Link href={`/${lang}`} className="hover:text-white transition-colors">{isUk ? "Головна" : "Home"}</Link>
              <span>/</span>
              <Link href={`/${lang}/blog`} className="hover:text-white transition-colors">{isUk ? "Блог" : "Blog"}</Link>
              <span>/</span>
              <span className="text-white/90">#{decoded}</span>
            </nav>
            <div className="flex items-center gap-3 mb-4">
              <Tag className="w-6 h-6 text-white/70" />
              <span className="text-white/70 text-sm font-medium uppercase tracking-widest">{isUk ? "Тег" : "Tag"}</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-heading font-extrabold text-white mb-4">
              #{decoded}
            </h1>
            <p className="text-white/70">
              {posts.length}{" "}
              {isUk
                ? (posts.length === 1 ? "стаття" : posts.length < 5 ? "статті" : "статей")
                : (posts.length === 1 ? "article" : "articles")}{" "}
              {isUk ? "з цим тегом" : "with this tag"}
            </p>
          </Container>
        </section>

        <section className="py-16 bg-neutral-50">
          <Container>
            <div className="grid lg:grid-cols-4 gap-10">
              {/* Posts grid */}
              <div className="lg:col-span-3">
                <div className="grid sm:grid-cols-2 gap-6">
                  {posts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/${lang}/blog/${post.slug}`}
                      className="group bg-white rounded-2xl border border-neutral-100 overflow-hidden hover:shadow-lg hover:border-indigo-100 transition-all duration-300"
                    >
                      {/* Cover */}
                      <div className={`h-36 bg-linear-to-br ${post.color} flex items-center justify-center`}>
                        <span className="text-5xl">{post.emoji}</span>
                      </div>

                      <div className="p-5">
                        <span className="inline-block text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full mb-3">
                          {post.category}
                        </span>
                        <h2 className="font-heading font-bold text-neutral-900 group-hover:text-indigo-700 transition-colors leading-snug mb-2 line-clamp-2">
                          {post.title}
                        </h2>
                        <p className="text-sm text-neutral-500 leading-relaxed line-clamp-2 mb-4">
                          {post.excerpt}
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

              {/* Sidebar — all tags */}
              <aside className="lg:col-span-1">
                <div className="bg-white rounded-2xl border border-neutral-100 p-5 sticky top-24">
                  <h3 className="font-heading font-bold text-neutral-900 mb-4 text-sm uppercase tracking-wider">
                    {isUk ? "Всі теги" : "All Tags"}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map((t) => (
                      <Link
                        key={t}
                        href={`/${lang}/blog/tag/${encodeURIComponent(t)}`}
                        className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                          t === decoded
                            ? "bg-indigo-600 text-white border-indigo-600"
                            : "bg-white text-neutral-600 border-neutral-200 hover:border-indigo-300 hover:text-indigo-600"
                        }`}
                      >
                        #{t}
                      </Link>
                    ))}
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
