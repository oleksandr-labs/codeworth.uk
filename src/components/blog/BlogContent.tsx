"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Clock, ArrowRight, BookOpen, Search, X, Tag, Layers, ExternalLink, ArrowUpDown, Globe } from "lucide-react";
import { BLOG_POSTS, BLOG_CATEGORIES, getPostTitle, getPostExcerpt } from "@/lib/data/blog";
import { getAuthorByName } from "@/lib/data/blogAuthors";
import { cn } from "@/lib/utils";
import { Pagination } from "@/components/ui/Pagination";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { EmptyState } from "@/components/ui/EmptyState";
import { useLocale } from "@/components/layout/LocaleProvider";
import { EmojiIcon } from "@/components/ui/EmojiIcon";

const POSTS_PER_PAGE = 9;
const BLOG_CATEGORY_LIST = BLOG_CATEGORIES.filter((c) => c.id !== 'all');
const NEW_POST_DAYS = 60;
function isNewPost(dateStr: string) {
  const diff = (Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24);
  return diff <= NEW_POST_DAYS;
}
const ALL_OTHERS = BLOG_POSTS.filter((p) => !p.featured);

// Counts computed once at module level (static data)
const CATEGORY_COUNTS: Record<string, number> = {};
ALL_OTHERS.forEach((p) => {
  CATEGORY_COUNTS[p.category] = (CATEGORY_COUNTS[p.category] || 0) + 1;
});

const TAG_COUNTS: Record<string, number> = {};
ALL_OTHERS.forEach((p) =>
  p.tags.forEach((t) => {
    TAG_COUNTS[t] = (TAG_COUNTS[t] || 0) + 1;
  })
);

const SORTED_TAGS = Array.from(new Set(ALL_OTHERS.flatMap((p) => p.tags))).sort(
  (a, b) => (TAG_COUNTS[b] || 0) - (TAG_COUNTS[a] || 0)
);

function formatDate(dateStr: string, locale: string) {
  return new Date(dateStr).toLocaleDateString(locale === "uk" ? "uk-UA" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function BlogContent() {
  const lang = useLocale();
  const isUk = lang === "uk";
  const lp = (path: string) => `/${lang}${path}`;
  const [activeCategory, setActiveCategory] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [langFilter, setLangFilter] = useState<"all" | "en" | "uk">("all");
  const [page, setPage] = useState(1);
  const [showAllTags, setShowAllTags] = useState(false);

  const featured = BLOG_POSTS.find((p) => p.featured);

  const filtered = useMemo(() => {
    let posts: typeof BLOG_POSTS;
    if (query.trim()) {
      const q = query.toLowerCase();
      posts = BLOG_POSTS.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    } else {
      posts = !activeCategory
        ? ALL_OTHERS
        : ALL_OTHERS.filter((p) => p.category === activeCategory);
      if (activeTag) posts = posts.filter((p) => p.tags.includes(activeTag));
    }
    if (langFilter === "en") posts = posts.filter((p) => p.contentEn && p.contentEn.length > 0);
    if (langFilter === "uk") posts = posts.filter((p) => p.content && p.content.length > 0);
    return [...posts].sort((a, b) => {
      const diff = new Date(b.date).getTime() - new Date(a.date).getTime();
      return sortOrder === "newest" ? diff : -diff;
    });
  }, [activeCategory, activeTag, query, sortOrder, langFilter]);

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);
  const visibleTags = showAllTags ? SORTED_TAGS : SORTED_TAGS.slice(0, 12);

  const resetPage = () => setPage(1);
  const resetFilters = () => {
    setActiveCategory("");
    setActiveTag(null);
    setQuery("");
    setSortOrder("newest");
    setLangFilter("all");
    setPage(1);
  };
  const handlePageChange = (p: number) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showFeatured = featured && !activeCategory && !activeTag && !query;

  return (
    <>
      {/* Featured post */}
      {showFeatured && (
        <div className="mb-12">
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-6">
            {isUk ? "Головна стаття" : "Featured article"}
          </p>
          <Link
            href={lp(`/blog/${featured.slug}`)}
            className="group grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-neutral-100 dark:border-neutral-700 hover:shadow-xl hover:shadow-neutral-200/60 transition-all duration-300"
          >
            <div
              className={cn(
                "h-64 lg:h-auto min-h-70 bg-linear-to-br flex items-center justify-center text-7xl",
                featured.color
              )}
            >
              <EmojiIcon emoji={featured.emoji} className="w-16 h-16 text-white/80" />
            </div>
            <div className="p-8 lg:p-10 flex flex-col justify-center">
              <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-4">
                {featured.category}
              </span>
              <h2 className="text-2xl lg:text-3xl font-heading font-extrabold text-neutral-900 dark:text-white mb-3 group-hover:text-indigo-700 transition-colors leading-tight">
                {getPostTitle(featured, lang)}
              </h2>
              <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed mb-6">{getPostExcerpt(featured, lang)}</p>
              <div className="flex items-center gap-4 text-sm text-neutral-400 mb-6">
                <span>{featured.author}</span>
                <span>·</span>
                <span>{formatDate(featured.date, lang)}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {featured.readTime} {isUk ? "хв" : "min"}
                </span>
              </div>
              <span className="inline-flex items-center gap-2 text-indigo-600 font-semibold group-hover:gap-3 transition-all">
                {isUk ? "Читати статтю" : "Read article"}
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        </div>
      )}

      {/* Search + Sort */}
      <div className="flex gap-3 mb-10">
      <div
        role="search"
        aria-label={isUk ? "Пошук статей" : "Search articles"}
        className="relative flex-1"
      >
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none"
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            resetPage();
          }}
          placeholder={isUk ? "Пошук статей..." : "Search articles..."}
          aria-label={isUk ? "Пошук статей" : "Search articles"}
          aria-controls="blog-results"
          className="w-full pl-11 pr-10 py-3.5 rounded-xl border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all placeholder:text-neutral-400 text-sm bg-white"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              resetPage();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
            aria-label={isUk ? "Очистити пошук" : "Clear search"}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      {/* Language filter */}
      <div className="flex items-center gap-1 shrink-0 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white p-1">
        <Globe className="w-4 h-4 text-neutral-400 ml-2 shrink-0" aria-hidden="true" />
        {(["all", "en", "uk"] as const).map((lf) => (
          <button
            key={lf}
            onClick={() => { setLangFilter(lf); resetPage(); }}
            aria-pressed={langFilter === lf}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all leading-none",
              langFilter === lf
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50"
            )}
          >
            {lf === "all" ? (isUk ? "Всі" : "All") : lf === "en" ? "🇬🇧 EN" : "🇺🇦 UK"}
          </button>
        ))}
      </div>
      {/* Sort */}
      <div className="relative shrink-0">
        <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" aria-hidden="true" />
        <select
          value={sortOrder}
          onChange={(e) => { setSortOrder(e.target.value as "newest" | "oldest"); resetPage(); }}
          aria-label={isUk ? "Сортування" : "Sort order"}
          className="pl-9 pr-3 py-3.5 rounded-xl border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all text-sm bg-white text-neutral-700 dark:text-neutral-300 appearance-none cursor-pointer"
        >
          <option value="newest">{isUk ? "Новіші" : "Newest"}</option>
          <option value="oldest">{isUk ? "Старіші" : "Oldest"}</option>
        </select>
      </div>
      </div>

      {/* Two-column layout: posts + sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_300px] gap-10 items-start">
        {/* ── Main content ── */}
        <div>
          {/* Active filter chips */}
          {(activeCategory || activeTag || langFilter !== "all") && !query && (
            <div className="flex items-center gap-2 mb-6 flex-wrap">
              <span className="text-sm text-neutral-500">
                {isUk ? "Фільтр:" : "Filter:"}
              </span>
              {activeCategory && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-medium">
                  {BLOG_CATEGORY_LIST.find(c => c.label.uk === activeCategory)?.label[isUk ? "uk" : "en"] ?? activeCategory}
                  <button
                    onClick={() => {
                      setActiveCategory("");
                      resetPage();
                    }}
                    aria-label="Remove category filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {activeTag && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-medium">
                  #{activeTag}
                  <button
                    onClick={() => {
                      setActiveTag(null);
                      resetPage();
                    }}
                    aria-label="Remove tag filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {langFilter !== "all" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-medium">
                  {langFilter === "en" ? "🇬🇧 EN" : "🇺🇦 UK"}
                  <button
                    onClick={() => { setLangFilter("all"); resetPage(); }}
                    aria-label="Remove language filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              <button
                onClick={resetFilters}
                className="text-xs text-neutral-400 hover:text-neutral-700 dark:text-neutral-300 underline ml-1"
              >
                {isUk ? "Скинути" : "Clear all"}
              </button>
            </div>
          )}

          {/* Results count */}
          <p aria-live="polite" aria-atomic="true" className="text-sm text-neutral-400 mb-6 min-h-5">
            {query.trim()
              ? isUk
                ? `Знайдено ${filtered.length} ${filtered.length === 1 ? "стаття" : "статей"} за «${query}»`
                : `Found ${filtered.length} article${filtered.length !== 1 ? "s" : ""} for "${query}"`
              : ""}
          </p>

          {/* Posts grid */}
          {filtered.length === 0 ? (
            <div id="blog-results" className="text-center py-16 text-neutral-400">
              <EmptyState variant="search" size={130} className="mb-4" />
              <p className="text-lg">
                {query
                  ? isUk
                    ? "Нічого не знайдено. Спробуйте інший запит."
                    : "Nothing found. Try a different query."
                  : isUk
                    ? "Статей не знайдено."
                    : "No articles found."}
              </p>
              <button
                onClick={resetFilters}
                className="mt-3 text-indigo-600 hover:underline text-sm"
              >
                {isUk ? "Скинути фільтри" : "Clear filters"}
              </button>
            </div>
          ) : (
            <div id="blog-results" className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {paginated.map((post) => (
                <Link
                  key={post.slug}
                  href={lp(`/blog/${post.slug}`)}
                  className="group rounded-2xl border border-neutral-100 dark:border-neutral-700 overflow-hidden hover:shadow-lg hover:shadow-neutral-200/60 transition-all duration-300 hover:-translate-y-1 bg-white"
                >
                  <div
                    className={cn(
                      "h-40 bg-linear-to-br flex items-center justify-center text-5xl relative",
                      post.color
                    )}
                  >
                    <EmojiIcon emoji={post.emoji} className="w-14 h-14 text-white/80" />
                    {isNewPost(post.date) && (
                      <span className="absolute top-3 right-3 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide shadow">
                        {isUk ? "Нове" : "New"}
                      </span>
                    )}
                    {!isNewPost(post.date) && post.updatedDate && isNewPost(post.updatedDate) && (
                      <span className="absolute top-3 right-3 bg-indigo-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide shadow">
                        {isUk ? "Оновлено" : "Updated"}
                      </span>
                    )}
                    {post.contentEn && post.contentEn.length > 0 && (
                      <span className="absolute bottom-3 right-3 text-[11px] bg-white/90 backdrop-blur-sm px-1.5 py-0.5 rounded-md shadow-sm leading-none">
                        🇬🇧
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-3">
                      {post.category}
                    </span>
                    <h3 className="font-heading font-bold text-neutral-900 dark:text-white mb-2 leading-tight group-hover:text-indigo-700 transition-colors">
                      {getPostTitle(post, lang)}
                    </h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-4 line-clamp-3">
                      {getPostExcerpt(post, lang)}
                    </p>
                    <div className="flex items-center justify-between text-xs text-neutral-400 pt-3 border-t border-neutral-100">
                      <div className="flex items-center gap-2 min-w-0">
                        {(() => {
                          const author = getAuthorByName(post.author);
                          const authorFirstName = post.author.split(" ")[0];
                          const avatar = (
                            <span className="w-5 h-5 rounded-full bg-indigo-50 flex items-center justify-center text-[10px] font-bold text-indigo-600 shrink-0">
                              {author?.emoji ? <EmojiIcon emoji={author.emoji} className="w-8 h-8" /> : post.author[0]}
                            </span>
                          );
                          return author ? (
                            <Link
                              href={lp(`/blog/author/${author.slug}`)}
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-center gap-2 min-w-0 hover:text-indigo-600 transition-colors"
                            >
                              {avatar}
                              <span className="truncate text-neutral-500 dark:text-neutral-400 hover:text-indigo-600">{authorFirstName}</span>
                            </Link>
                          ) : (
                            <>
                              {avatar}
                              <span className="truncate text-neutral-500">{authorFirstName}</span>
                            </>
                          );
                        })()}
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
          )}

          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              className="mt-10"
            />
          )}
        </div>

        {/* ── Right Sidebar ── */}
        <aside className="lg:sticky lg:top-8 space-y-5">
          {/* Categories */}
          <div className="rounded-2xl border border-neutral-100 dark:border-neutral-700 bg-white p-5">
            <div className="flex items-center gap-2 mb-4">
              <Layers className="w-4 h-4 text-indigo-500" />
              <h3 className="font-heading font-bold text-neutral-900 dark:text-white text-sm uppercase tracking-wide">
                {isUk ? "Розділи" : "Categories"}
              </h3>
            </div>
            <ul className="space-y-0.5">
              <li>
                <button
                  onClick={() => {
                    setActiveCategory("");
                    setActiveTag(null);
                    resetPage();
                  }}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all",
                    activeCategory === ""
                      ? "bg-indigo-600 text-white font-semibold"
                      : "text-neutral-600 dark:text-neutral-300 hover:bg-indigo-50 hover:text-indigo-700"
                  )}
                >
                  <span>{isUk ? "Всі статті" : "All articles"}</span>
                  <span
                    className={cn(
                      "text-xs px-2 py-0.5 rounded-full font-medium",
                      activeCategory === ""
                        ? "bg-white/20 text-white"
                        : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500"
                    )}
                  >
                    {ALL_OTHERS.length}
                  </span>
                </button>
              </li>
              {BLOG_CATEGORY_LIST.map((cat) => {
                const catLabel = isUk ? cat.label.uk : cat.label.en;
                const isActive = cat.label.uk === activeCategory;
                return (
                  <li key={cat.id} className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        setActiveCategory(cat.label.uk);
                        setActiveTag(null);
                        resetPage();
                      }}
                      className={cn(
                        "flex-1 flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all",
                        isActive
                          ? "bg-indigo-600 text-white font-semibold"
                          : "text-neutral-600 dark:text-neutral-300 hover:bg-indigo-50 hover:text-indigo-700"
                      )}
                    >
                      <span className="inline-flex items-center gap-1.5 text-left leading-snug">
                        {cat.icon && <span aria-hidden="true">{cat.icon}</span>}
                        {catLabel}
                        {cat.isNew && (
                          <span className={cn(
                            "text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none",
                            isActive ? "bg-white/30 text-white" : "bg-violet-100 text-violet-700"
                          )}>
                            NEW
                          </span>
                        )}
                      </span>
                      <span
                        className={cn(
                          "text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ml-2",
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500"
                        )}
                      >
                        {CATEGORY_COUNTS[cat.label.uk] || 0}
                      </span>
                    </button>
                    <Link
                      href={lp(`/blog/category/${cat.id}`)}
                      className="p-1.5 rounded-lg text-neutral-300 hover:text-indigo-500 hover:bg-indigo-50 transition-colors shrink-0"
                      title={isUk ? `Сторінка категорії: ${catLabel}` : `Category page: ${catLabel}`}
                      aria-label={isUk ? `Відкрити сторінку категорії ${catLabel}` : `Open category page ${catLabel}`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Tags */}
          <div className="rounded-2xl border border-neutral-100 dark:border-neutral-700 bg-white p-5">
            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-4 h-4 text-indigo-500" />
              <h3 className="font-heading font-bold text-neutral-900 dark:text-white text-sm uppercase tracking-wide">
                {isUk ? "Теги" : "Tags"}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {visibleTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setActiveTag(activeTag === tag ? null : tag);
                    resetPage();
                  }}
                  className={cn(
                    "px-3 py-1 rounded-lg text-xs font-medium transition-all",
                    activeTag === tag
                      ? "bg-indigo-600 text-white"
                      : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                  )}
                >
                  #{tag}
                </button>
              ))}
            </div>
            {SORTED_TAGS.length > 12 && (
              <button
                onClick={() => setShowAllTags(!showAllTags)}
                className="mt-3 text-xs text-indigo-600 hover:text-indigo-800 font-medium"
              >
                {showAllTags
                  ? isUk
                    ? "Приховати"
                    : "Show less"
                  : isUk
                    ? `Всі теги (${SORTED_TAGS.length})`
                    : `All tags (${SORTED_TAGS.length})`}
              </button>
            )}
          </div>

          {/* Newsletter */}
          <div className="rounded-2xl bg-linear-to-br from-indigo-50 to-violet-50 border border-indigo-100 p-5 text-center">
            <BookOpen className="w-8 h-8 text-indigo-500 mx-auto mb-3" />
            <h3 className="font-heading font-bold text-neutral-900 dark:text-white mb-1 text-base">
              {isUk ? "Розсилка" : "Newsletter"}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-300 text-xs mb-4">
              {isUk ? "Нові статті раз на тиждень. Без спаму." : "Weekly articles. No spam."}
            </p>
            <NewsletterForm variant="compact" />
          </div>
        </aside>
      </div>
    </>
  );
}
