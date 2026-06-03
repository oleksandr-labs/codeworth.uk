import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { BLOG_POSTS } from "@/lib/data/blog";
import { getAuthorByName } from "@/lib/data/blogAuthors";
import { Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { EmojiIcon } from "@/components/ui/EmojiIcon";

function formatDate(dateStr: string, locale: string) {
  return new Date(dateStr).toLocaleDateString(locale === "uk" ? "uk-UA" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function BlogPreviewSection({ lang }: { lang: string }) {
  const isUk = lang === "uk";
  const posts = BLOG_POSTS.slice(0, 3);

  return (
    <section className="py-24 bg-white dark:bg-neutral-950">
      <Container>
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
              {isUk ? "Блог" : "Blog"}
            </p>
            <h2 className="text-4xl lg:text-5xl font-heading font-extrabold text-neutral-900">
              {isUk ? "Останні статті" : "Latest articles"}
            </h2>
            <p className="mt-3 text-lg text-neutral-500">
              {isUk
                ? "Корисний контент про веб-розробку, SEO та маркетинг."
                : "Useful content about web development, SEO and marketing."}
            </p>
          </div>
          <Link
            href={`/${lang}/blog`}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-indigo-200 text-indigo-700 font-semibold text-sm hover:bg-indigo-50 transition-colors shrink-0"
          >
            {isUk ? "Читати всі" : "Read all"}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/${lang}/blog/${post.slug}`}
              className="group rounded-2xl border border-neutral-100 dark:border-neutral-700 overflow-hidden hover:shadow-lg hover:shadow-neutral-200/60 transition-all duration-300 hover:-translate-y-1 bg-white"
            >
              {/* Visual */}
              <div className={cn("h-40 bg-linear-to-br flex items-center justify-center", post.color)}>
                <EmojiIcon emoji={post.emoji} className="w-14 h-14 text-white/80" />
              </div>
              {/* Content */}
              <div className="p-6">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-3">
                  {post.category}
                </span>
                <h3 className="font-heading font-bold text-neutral-900 dark:text-white mb-2 leading-tight group-hover:text-indigo-700 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-neutral-400 pt-3 border-t border-neutral-100">
                  <div className="flex items-center gap-1.5 min-w-0">
                    {(() => {
                      const author = getAuthorByName(post.author);
                      return (
                        <span className="w-5 h-5 rounded-full bg-indigo-50 flex items-center justify-center text-[10px] font-bold text-indigo-600 shrink-0">
                          {author?.emoji ? <EmojiIcon emoji={author.emoji} className="w-7 h-7" /> : (post.author?.[0] ?? "?")}
                        </span>
                      );
                    })()}
                    <span className="truncate">{post.author?.split(" ")[0] ?? ""}</span>
                    {post.updatedDate && <span className="text-indigo-400 shrink-0">🔄</span>}
                  </div>
                  <span className="flex items-center gap-1 shrink-0">
                    <Clock className="w-3 h-3" />
                    {post.readTime} {isUk ? "хв" : "min"}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href={`/${lang}/blog`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-indigo-200 text-indigo-700 font-semibold text-sm hover:bg-indigo-50 transition-colors"
          >
            {isUk ? "Всі статті" : "All articles"}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
