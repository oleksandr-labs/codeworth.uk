import type { Metadata } from "next";
import { buildAlternates } from "@/i18n";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { BLOG_AUTHORS, getAuthorBySlug } from "@/lib/data/blogAuthors";
import { BLOG_POSTS, getPostTitle, getPostExcerpt } from "@/lib/data/blog";
import { Clock, ArrowLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { EmojiIcon } from "@/components/ui/EmojiIcon";

interface Props {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_AUTHORS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) return {};
  const isUk = lang === "uk";
  const name = isUk ? author.name : author.nameEn;
  const role = isUk ? author.role : author.roleEn;
  const posts = BLOG_POSTS.filter((p) => p.author === author.name);
  const title = isUk
    ? `${name} — ${role} | Codeworth Blog`
    : `${name} — ${role} | Codeworth Blog`;
  const description = isUk
    ? `${posts.length} статей від ${name}, ${role} в Codeworth. ${author.bio.slice(0, 120)}...`
    : `${posts.length} articles by ${name}, ${role} at Codeworth. ${author.bioEn.slice(0, 120)}...`;
  return {
    title,
    description,
    alternates: buildAlternates(lang, `blog/author/${slug}`),
    openGraph: { title, description, type: "profile" },
  };
}

function formatDate(dateStr: string, lang: string) {
  return new Date(dateStr).toLocaleDateString(lang === "uk" ? "uk-UA" : "en-US", {
    day: "numeric", month: "long", year: "numeric",
  });
}

export default async function BlogAuthorPage({ params }: Props) {
  const { lang, slug } = await params;
  const isUk = lang === "uk";
  const author = getAuthorBySlug(slug);
  if (!author) notFound();

  const posts = BLOG_POSTS.filter((p) => p.author === author.name);
  const name = isUk ? author.name : author.nameEn;
  const role = isUk ? author.role : author.roleEn;
  const bio = isUk ? author.bio : author.bioEn;

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle: role,
    description: bio,
    worksFor: { "@type": "Organization", name: "Codeworth", url: "https://codeworth.uk" },
    url: `https://codeworth.uk/${lang}/blog/author/${slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main id="main-content" className="flex-1">

          {/* Hero */}
          <section className="pt-32 pb-16 bg-linear-to-br from-indigo-950 via-neutral-900 to-neutral-950 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            <Container className="relative">
              <nav className="flex items-center gap-2 text-sm text-white/50 mb-8">
                <Link href={`/${lang}`} className="hover:text-white transition-colors">{isUk ? "Головна" : "Home"}</Link>
                <ChevronRight className="w-4 h-4" />
                <Link href={`/${lang}/blog`} className="hover:text-white transition-colors">{isUk ? "Блог" : "Blog"}</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-white/80">{name}</span>
              </nav>

              <div className="flex items-start gap-6">
                <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                  <EmojiIcon emoji={author.emoji} className="w-16 h-16" />
                </div>
                <div>
                  <div className="text-indigo-400 text-sm font-semibold uppercase tracking-wider mb-1">
                    {isUk ? "Автор" : "Author"}
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-heading font-extrabold text-white mb-2">{name}</h1>
                  <p className="text-indigo-300 font-medium mb-3">{role}</p>
                  <p className="text-white/70 max-w-2xl leading-relaxed">{bio}</p>
                  <div className="mt-4 flex items-center gap-3 text-white/50 text-sm">
                    <span>{posts.length} {isUk ? "статей" : "articles"}</span>
                    <span>·</span>
                    <span>Codeworth</span>
                  </div>
                </div>
              </div>
            </Container>
          </section>

          {/* Articles */}
          <section className="py-16 bg-white dark:bg-neutral-950">
            <Container>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-heading font-bold text-neutral-900">
                  {isUk ? `Статті від ${name}` : `Articles by ${name}`}
                </h2>
                <Link href={`/${lang}/blog`} className="flex items-center gap-1.5 text-sm text-indigo-600 font-medium hover:underline">
                  <ArrowLeft className="w-4 h-4" />
                  {isUk ? "Всі статті" : "All articles"}
                </Link>
              </div>

              {posts.length === 0 ? (
                <p className="text-neutral-500 dark:text-neutral-400 text-center py-12">
                  {isUk ? "Статті ще не опубліковані" : "No articles published yet"}
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/${lang}/blog/${post.slug}`}
                      className="group rounded-2xl border border-neutral-100 dark:border-neutral-700 overflow-hidden hover:shadow-lg hover:shadow-neutral-200/60 transition-all duration-300 hover:-translate-y-1 bg-white"
                    >
                      <div className={cn("h-36 bg-linear-to-br flex items-center justify-center", post.color)}>
                        <EmojiIcon emoji={post.emoji} className="w-12 h-12 text-white/80" />
                      </div>
                      <div className="p-5">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-2">
                          {post.category}
                        </span>
                        <h3 className="font-heading font-bold text-neutral-900 dark:text-white mb-2 leading-tight group-hover:text-indigo-700 transition-colors line-clamp-2">
                          {getPostTitle(post, lang)}
                        </h3>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-3 line-clamp-2">
                          {getPostExcerpt(post, lang)}
                        </p>
                        <div className="flex items-center justify-between text-xs text-neutral-400 pt-3 border-t border-neutral-100">
                          <span>{formatDate(post.updatedDate ?? post.date, lang)}</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime} {isUk ? "хв" : "min"}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </Container>
          </section>

          {/* Other authors */}
          <section className="py-12 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-100">
            <Container>
              <h2 className="text-lg font-heading font-bold text-neutral-900 dark:text-white mb-6">
                {isUk ? "Інші автори" : "Other Authors"}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {BLOG_AUTHORS.filter((a) => a.slug !== slug).map((a) => (
                  <Link
                    key={a.slug}
                    href={`/${lang}/blog/author/${a.slug}`}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 hover:border-indigo-200 hover:shadow-sm transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                      <EmojiIcon emoji={a.emoji} className="w-8 h-8" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-neutral-900 dark:text-white text-sm truncate group-hover:text-indigo-700 transition-colors">
                        {isUk ? a.name.split(" ")[0] : a.nameEn.split(" ")[0]}
                      </div>
                      <div className="text-xs text-neutral-400 truncate">
                        {BLOG_POSTS.filter((p) => p.author === a.name).length} {isUk ? "статей" : "posts"}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </Container>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
