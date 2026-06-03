"use client";

import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { EXTRAS, EXTRA_CATEGORIES, getExtraTitle, getExtraDesc } from "@/lib/data/extras";
import { ExtraCard } from "./ExtraCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { useLocale } from "@/components/layout/LocaleProvider";
import { EmojiIcon } from "@/components/ui/EmojiIcon";

export function ExtrasCatalog() {
  const lang = useLocale();
  const isUk = lang === "uk";
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return EXTRAS.filter((e) => {
      const categoryMatch = activeCategory === "all" || e.category === activeCategory;
      if (q) {
        return (
          e.title.toLowerCase().includes(q) ||
          getExtraTitle(e, false).toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          getExtraDesc(e, false).toLowerCase().includes(q) ||
          e.tags.some((t) => t.toLowerCase().includes(q))
        );
      }
      return categoryMatch;
    });
  }, [activeCategory, query]);

  return (
    <section className="py-16 bg-white dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search */}
        <div role="search" aria-label={isUk ? "Пошук доробок" : "Search add-ons"} className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isUk ? "Пошук доробок..." : "Search add-ons..."}
            aria-label={isUk ? "Пошук доробок" : "Search add-ons"}
            aria-controls="extras-results"
            className="w-full pl-11 pr-10 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all placeholder:text-neutral-400 text-sm"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
              aria-label={isUk ? "Очистити пошук" : "Clear search"}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category tabs */}
        <div className={cn("flex flex-wrap gap-2 mb-10", query && "opacity-40 pointer-events-none")}>
          <button
            onClick={() => setActiveCategory("all")}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-medium transition-all",
              activeCategory === "all"
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-indigo-50 hover:text-indigo-700"
            )}
          >
            {isUk ? `Всі (${EXTRAS.length})` : `All (${EXTRAS.length})`}
          </button>
          {EXTRA_CATEGORIES.map((cat) => {
            const count = EXTRAS.filter((e) => e.category === cat.value).length;
            return (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium transition-all",
                  activeCategory === cat.value
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-indigo-50 hover:text-indigo-700"
                )}
              >
                <EmojiIcon emoji={cat.emoji} className="w-4 h-4 inline-block align-middle mr-1" />{isUk ? cat.label : cat.labelEn} ({count})
              </button>
            );
          })}
        </div>

        {/* Count */}
        <p aria-live="polite" aria-atomic="true" className="text-sm text-neutral-400 mb-6">
          {isUk ? `Показано ${filtered.length} з ${EXTRAS.length} доробок` : `Showing ${filtered.length} of ${EXTRAS.length} add-ons`}
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div id="extras-results" className="text-center py-20 text-neutral-400">
            <EmptyState variant="search" size={130} className="mb-4" />
            <p className="text-lg">{isUk ? "Нічого не знайдено. Спробуйте інший запит." : "Nothing found. Try a different query."}</p>
            <button
              onClick={() => { setActiveCategory("all"); setQuery(""); }}
              className="mt-4 text-indigo-600 hover:underline text-sm"
            >
              {isUk ? "Скинути фільтри" : "Clear filters"}
            </button>
          </div>
        ) : (
          <div id="extras-results" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((extra) => (
              <ExtraCard key={extra.id} extra={extra} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
