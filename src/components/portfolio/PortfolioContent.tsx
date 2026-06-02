"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowUpRight, ExternalLink, Search, X, ZoomIn, ShoppingCart } from "lucide-react";
import { PROJECTS } from "@/lib/data/portfolio";
import { cn } from "@/lib/utils";
import { Lightbox } from "@/components/ui/Lightbox";
import type { LightboxImage } from "@/components/ui/Lightbox";
import { EmptyState } from "@/components/ui/EmptyState";
import { useLocale } from "@/components/layout/LocaleProvider";

const COMPLEXITY_PRICE_GBP = { simple: 499, medium: 999, complex: 1999 };
const COMPLEXITY_PRICE_UAH = { simple: 19900, medium: 39900, complex: 79900 };

function getPrice(complexity: "simple" | "medium" | "complex", priceFrom: number | undefined, isUk: boolean): string {
  if (isUk) {
    const uah = priceFrom ? Math.round(priceFrom * 40) : COMPLEXITY_PRICE_UAH[complexity];
    return `від ₴${uah.toLocaleString("uk-UA")}`;
  }
  const gbp = priceFrom ?? COMPLEXITY_PRICE_GBP[complexity];
  return `from £${gbp.toLocaleString("en-GB")}`;
}

const PROJECT_CATEGORIES = Array.from(new Set(PROJECTS.map((p) => p.category)));
const PROJECT_INDUSTRIES = Array.from(
  new Set(PROJECTS.map((p) => p.industry).filter((x): x is string => Boolean(x)))
).sort();

export function PortfolioContent() {
  const lang = useLocale();
  const isUk = lang === "uk";
  const lp = (path: string) => `/${lang}${path}`;

  const COMPLEXITY_LABELS = {
    simple: { label: isUk ? "Простий" : "Simple", color: "bg-emerald-100 text-emerald-700" },
    medium: { label: isUk ? "Середній" : "Medium", color: "bg-amber-100 text-amber-700" },
    complex: { label: isUk ? "Складний" : "Complex", color: "bg-red-100 text-red-700" },
  };

  const COMPLEXITIES: Array<{ value: "all" | "simple" | "medium" | "complex"; label: string }> = [
    { value: "all", label: isUk ? "Всі рівні" : "All levels" },
    { value: "simple", label: isUk ? "🟢 Прості" : "🟢 Simple" },
    { value: "medium", label: isUk ? "🟡 Середні" : "🟡 Medium" },
    { value: "complex", label: isUk ? "🔴 Складні" : "🔴 Complex" },
  ];

  const [activeCategory, setActiveCategory] = useState("");
  const [activeComplexity, setActiveComplexity] = useState<"all" | "simple" | "medium" | "complex">("all");
  const [activeIndustry, setActiveIndustry] = useState("");
  const [query, setQuery] = useState("");
  const [lightbox, setLightbox] = useState<{ images: LightboxImage[]; index: number } | null>(null);

  const filtered = useMemo(() => {
    if (query.trim()) {
      const q = query.toLowerCase();
      return PROJECTS.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.niche.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return PROJECTS.filter((p) => {
      const categoryMatch = !activeCategory || p.category === activeCategory;
      const complexityMatch = activeComplexity === "all" || p.complexity === activeComplexity;
      const industryMatch = !activeIndustry || p.industry === activeIndustry;
      return categoryMatch && complexityMatch && industryMatch;
    });
  }, [activeCategory, activeComplexity, activeIndustry, query]);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isUk ? "Пошук проєктів..." : "Search projects..."}
            className="w-full pl-11 pr-10 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all placeholder:text-neutral-400 text-sm"
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

        {/* Legend */}
        <div className={cn("flex flex-wrap items-center gap-3 mb-6", query && "opacity-40 pointer-events-none")}>
          <span className="text-sm text-neutral-500 mr-2">{isUk ? "Складність:" : "Complexity:"}</span>
          {Object.entries(COMPLEXITY_LABELS).map(([key, val]) => (
            <span key={key} className={cn("px-3 py-1 rounded-full text-xs font-semibold", val.color)}>
              {val.label}
            </span>
          ))}
        </div>

        {/* Category filter */}
        <div className={cn("flex flex-wrap gap-2 mb-4", query && "opacity-40 pointer-events-none")}>
          <button
            onClick={() => setActiveCategory("")}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-medium transition-all",
              activeCategory === ""
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-neutral-100 text-neutral-600 hover:bg-indigo-50 hover:text-indigo-700"
            )}
          >
            {isUk ? "Всі" : "All"}
          </button>
          {PROJECT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium transition-all",
                activeCategory === cat
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-neutral-100 text-neutral-600 hover:bg-indigo-50 hover:text-indigo-700"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Industry filter (AI/ML cross-linking) */}
        {PROJECT_INDUSTRIES.length > 0 && (
          <div className={cn("flex flex-wrap gap-2 mb-4", query && "opacity-40 pointer-events-none")}>
            <button
              onClick={() => setActiveIndustry("")}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                activeIndustry === ""
                  ? "bg-violet-600 text-white shadow-sm"
                  : "bg-neutral-100 text-neutral-600 hover:bg-violet-50 hover:text-violet-700"
              )}
            >
              {isUk ? "Всі галузі" : "All industries"}
            </button>
            {PROJECT_INDUSTRIES.map((ind) => (
              <button
                key={ind}
                onClick={() => setActiveIndustry(ind)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                  activeIndustry === ind
                    ? "bg-violet-600 text-white shadow-sm"
                    : "bg-neutral-100 text-neutral-600 hover:bg-violet-50 hover:text-violet-700"
                )}
              >
                {ind}
              </button>
            ))}
          </div>
        )}

        {/* Complexity filter */}
        <div className={cn("flex flex-wrap gap-2 mb-10", query && "opacity-40 pointer-events-none")}>
          {COMPLEXITIES.map((c) => (
            <button
              key={c.value}
              onClick={() => setActiveComplexity(c.value)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium transition-all",
                activeComplexity === c.value
                  ? "bg-neutral-900 text-white shadow-sm"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              )}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Count */}
        <p className="text-sm text-neutral-400 mb-6">
          {isUk ? `Показано ${filtered.length} з ${PROJECTS.length} проєктів` : `Showing ${filtered.length} of ${PROJECTS.length} projects`}
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-neutral-400">
            <EmptyState variant="search" size={130} className="mb-4" />
            <p className="text-lg">{query ? (isUk ? "Нічого не знайдено. Спробуйте інший запит." : "Nothing found. Try a different query.") : (isUk ? "Проєктів не знайдено" : "No projects found")}</p>
            <button
              onClick={() => { setActiveCategory(""); setActiveComplexity("all"); setActiveIndustry(""); setQuery(""); }}
              className="mt-4 text-indigo-600 hover:underline text-sm"
            >
              {isUk ? "Скинути фільтри" : "Clear filters"}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project) => {
              const complexity = COMPLEXITY_LABELS[project.complexity];
              return (
                <div
                  key={project.slug}
                  className="group relative rounded-2xl border border-neutral-100 bg-white overflow-hidden hover:shadow-xl hover:shadow-neutral-200/60 transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Visual preview — click to open lightbox */}
                  <button
                    type="button"
                    onClick={() => {
                      const imgs: LightboxImage[] = project.tech.map((t, i) => ({
                        src: `https://placehold.co/1200x800/4f46e5/ffffff?text=${encodeURIComponent(project.title + ' — ' + t)}`,
                        alt: `${project.title} — ${t}`,
                        caption: `${project.title}: ${t}`,
                      }));
                      setLightbox({ images: imgs, index: 0 });
                    }}
                    className={cn("w-full h-48 bg-linear-to-br flex items-center justify-center text-5xl relative group/prev cursor-zoom-in", project.color)}
                    aria-label={isUk ? `Переглянути скріншоти: ${project.title}` : `View screenshots: ${project.title}`}
                  >
                    {project.emoji}
                    <div className="absolute inset-0 bg-black/0 group-hover/prev:bg-black/25 transition-colors flex items-center justify-center">
                      <ZoomIn className="w-7 h-7 text-white opacity-0 group-hover/prev:opacity-100 transition-opacity drop-shadow-lg" />
                    </div>
                  </button>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-heading font-bold text-neutral-900 group-hover:text-indigo-700 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-xs text-neutral-400 mt-0.5">{project.category} · {project.year}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <span className={cn("px-2.5 py-1 rounded-full text-xs font-semibold", complexity.color)}>
                          {complexity.label}
                        </span>
                        <span className="text-xs font-semibold text-indigo-600">
                          {getPrice(project.complexity, project.priceFrom, isUk)}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-neutral-500 leading-relaxed mb-4">{project.description}</p>

                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-xs text-emerald-700 font-medium mb-4">
                      📈 {project.result}
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-600 text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-neutral-100">
                      {project.tech.map((t) => (
                        <span key={t} className="text-xs text-neutral-400">{t}</span>
                      ))}
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-indigo-900/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 px-4">
                    <p className="text-white/80 text-xs font-medium mb-1">
                      {getPrice(project.complexity, project.priceFrom, isUk)}
                    </p>
                    <div className="flex items-center gap-2">
                      <Link
                        href={lp(`/portfolio/${project.slug}`)}
                        className="px-4 py-2.5 rounded-xl bg-white text-indigo-700 font-semibold text-sm flex items-center gap-2 hover:bg-indigo-50 transition-colors"
                      >
                        {isUk ? "Деталі" : "Details"}
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                      {project.nicheSlug && (
                        <Link
                          href={lp(`/niches/${project.nicheSlug}`)}
                          className="px-4 py-2.5 rounded-xl bg-indigo-500/80 text-white font-semibold text-sm flex items-center gap-2 hover:bg-indigo-500 transition-colors border border-white/20"
                        >
                          {isUk ? "Демо" : "Demo"}
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                    <Link
                      href={lp(`/contact?project=${project.slug}`)}
                      className="w-full text-center px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      {isUk ? "Замовити подібне" : "Order Similar"}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <Lightbox
          images={lightbox.images}
          initialIndex={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}
    </section>
  );
}
