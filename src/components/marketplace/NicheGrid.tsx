"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { EmptyState } from "@/components/ui/EmptyState";
import { useLocale } from "@/components/layout/LocaleProvider";
import { EmojiIcon } from "@/components/ui/EmojiIcon";

interface NicheItem {
  name: string;
  slug: string;
  price: string;
  complexity: string;
  emoji: string;
  color: string;
}

interface NicheGroup {
  group: string;
  items: NicheItem[];
}

interface NicheGridProps {
  niches: NicheGroup[];
}

const COMPLEXITY_STYLES: Record<string, string> = {
  simple: "bg-emerald-100 text-emerald-700",
  medium: "bg-amber-100 text-amber-700",
  complex: "bg-red-100 text-red-700",
};

const COMPLEXITY_LABELS_UK: Record<string, string> = {
  simple: "Простий",
  medium: "Середній",
  complex: "Складний",
};

const COMPLEXITY_LABELS_EN: Record<string, string> = {
  simple: "Simple",
  medium: "Medium",
  complex: "Complex",
};

const COMPLEXITY_FILTERS_UK = [
  { value: "all", label: "Всі" },
  { value: "simple", label: "🟢 Простий" },
  { value: "medium", label: "🟡 Середній" },
  { value: "complex", label: "🔴 Складний" },
];

const COMPLEXITY_FILTERS_EN = [
  { value: "all", label: "All" },
  { value: "simple", label: "🟢 Simple" },
  { value: "medium", label: "🟡 Medium" },
  { value: "complex", label: "🔴 Complex" },
];

export function NicheGrid({ niches }: NicheGridProps) {
  const lang = useLocale();
  const isUk = lang === "uk";
  const lp = (path: string) => `/${lang}${path}`;
  const COMPLEXITY_LABELS = isUk ? COMPLEXITY_LABELS_UK : COMPLEXITY_LABELS_EN;
  const COMPLEXITY_FILTERS = isUk ? COMPLEXITY_FILTERS_UK : COMPLEXITY_FILTERS_EN;
  const [query, setQuery] = useState("");
  const [complexity, setComplexity] = useState("all");

  const isFiltered = query.trim() !== "" || complexity !== "all";

  const filteredGroups = useMemo(() => {
    if (!isFiltered) return niches;

    return niches
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => {
          const matchesQuery =
            !query.trim() ||
            item.name.toLowerCase().includes(query.toLowerCase());
          const matchesComplexity =
            complexity === "all" || item.complexity === complexity;
          return matchesQuery && matchesComplexity;
        }),
      }))
      .filter((group) => group.items.length > 0);
  }, [niches, query, complexity, isFiltered]);

  const totalFiltered = filteredGroups.reduce(
    (sum, g) => sum + g.items.length,
    0
  );

  function reset() {
    setQuery("");
    setComplexity("all");
  }

  return (
    <div>
      {/* Search + filter controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isUk ? "Пошук ніші..." : "Search niche..."}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all placeholder:text-neutral-400 text-neutral-900 dark:text-white text-sm"
          />
        </div>

        {/* Complexity filter */}
        <div className="flex gap-2 flex-wrap">
          {COMPLEXITY_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setComplexity(f.value)}
              className={cn(
                "px-4 py-2.5 rounded-xl text-sm font-medium transition-all border",
                complexity === f.value
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                  : "bg-white text-neutral-600 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700 hover:border-indigo-200 hover:text-indigo-600"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results count + clear */}
      {isFiltered && (
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-neutral-500">
            {isUk ? "Знайдено:" : "Found:"} <span className="font-semibold text-neutral-800">{totalFiltered}</span> {isUk ? "рішень" : "solutions"}
          </p>
          <button
            onClick={reset}
            className="flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            {isUk ? "Скинути фільтри" : "Clear filters"}
          </button>
        </div>
      )}

      {/* Empty state */}
      {isFiltered && totalFiltered === 0 && (
        <div className="py-20 text-center">
          <EmptyState variant="search" size={130} className="mb-4" />
          <h3 className="text-xl font-heading font-bold text-neutral-900 dark:text-white mb-2">
            {isUk ? "Нічого не знайдено" : "Nothing found"}
          </h3>
          <p className="text-neutral-500 dark:text-neutral-400 mb-6">
            {isUk ? "Спробуйте інший запит або змініть фільтр складності." : "Try a different query or change the complexity filter."}
          </p>
          <button
            onClick={reset}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
          >
            {isUk ? "Показати всі рішення" : "Show all solutions"}
          </button>
        </div>
      )}

      {/* Niche groups */}
      <div className="space-y-16">
        {filteredGroups.map((group) => (
          <div key={group.group}>
            <h3 className="text-xl font-heading font-bold text-neutral-900 dark:text-white mb-6">
              {group.group}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {group.items.map((item) => (
                <div
                  key={item.slug}
                  className="group p-5 rounded-2xl border border-neutral-100 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:shadow-lg hover:shadow-neutral-200/60 hover:border-indigo-100 transition-all duration-300 hover:-translate-y-1"
                >
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl bg-linear-to-br flex items-center justify-center mb-4",
                      item.color
                    )}
                  >
                    <EmojiIcon emoji={item.emoji} className="w-6 h-6 text-white/80" />
                  </div>
                  <h4 className="font-heading font-bold text-neutral-900 dark:text-white mb-1 text-sm leading-tight">
                    {item.name}
                  </h4>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-lg font-extrabold text-neutral-900">
                      ₴{item.price}
                    </span>
                    <span
                      className={cn(
                        "text-xs px-2 py-0.5 rounded-full font-medium",
                        COMPLEXITY_STYLES[item.complexity]
                      )}
                    >
                      {COMPLEXITY_LABELS[item.complexity]}
                    </span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-700 flex gap-2">
                    <Link
                      href={lp(`/marketplace/product/${item.slug}`)}
                      className="flex-1 text-center py-2 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-colors"
                    >
                      {isUk ? "Замовити" : "Order"}
                    </Link>
                    <Link
                      href={lp(`/niches/${item.slug}`)}
                      className="px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400 text-xs hover:border-indigo-200 hover:text-indigo-600 transition-colors"
                    >
                      Demo
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
