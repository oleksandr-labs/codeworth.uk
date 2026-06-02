"use client";

import { useState, useMemo } from "react";
import { Star, TrendingUp, CheckCircle, Filter, X } from "lucide-react";
import type { Review } from "@/lib/data/reviews";

// ─── Types ────────────────────────────────────────────────────────────────────

type Platform = "all" | "google" | "clutch" | "dou" | "direct";
type RatingFilter = "all" | "5" | "4plus";
type ServiceFilter = "all" | "website-dev" | "ecommerce" | "seo-service" | "landing";
type NicheFilter = "all" | string;

interface Props {
  reviews: Review[];
  lang: string;
  isUk: boolean;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const PLATFORM_LABELS: Record<string, string> = {
  google: "Google",
  clutch: "Clutch",
  dou: "DOU",
  direct: "Direct",
};

const PLATFORM_COLORS: Record<string, string> = {
  google: "bg-blue-50 text-blue-700 border-blue-200",
  clutch: "bg-orange-50 text-orange-700 border-orange-200",
  dou: "bg-green-50 text-green-700 border-green-200",
  direct: "bg-gray-50 dark:bg-neutral-900 text-gray-600 dark:text-neutral-300 border-gray-200",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`w-4 h-4 ${s <= rating ? "text-amber-400 fill-amber-400" : "text-gray-200"}`}
        />
      ))}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all border ${
        active
          ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
          : "bg-white text-gray-600 dark:text-neutral-300 border-gray-200 dark:border-neutral-700 hover:border-indigo-300 hover:text-indigo-600"
      }`}
    >
      {children}
    </button>
  );
}

function EmptyState({ isUk }: { isUk: boolean }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 bg-gray-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mb-4">
        <Star className="w-8 h-8 text-gray-300" />
      </div>
      <p className="text-gray-500 dark:text-neutral-400 font-medium">
        {isUk ? "Немає відгуків за обраними фільтрами" : "No reviews match the selected filters"}
      </p>
      <p className="text-gray-400 dark:text-neutral-500 text-sm mt-1">
        {isUk ? "Спробуйте скинути фільтри" : "Try clearing the filters"}
      </p>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ReviewsClient({ reviews, lang, isUk }: Props) {
  const [platform, setPlatform] = useState<Platform>("all");
  const [ratingFilter, setRatingFilter] = useState<RatingFilter>("all");
  const [serviceFilter, setServiceFilter] = useState<ServiceFilter>("all");
  const [nicheFilter, setNicheFilter] = useState<NicheFilter>("all");

  const niches = useMemo(() => {
    const seen = new Set<string>();
    reviews.forEach((r) => { if (r.nicheSlug) seen.add(r.nicheSlug); });
    return Array.from(seen);
  }, [reviews]);

  const filtered = useMemo(() => {
    return reviews.filter((r) => {
      if (platform !== "all" && r.platform !== platform) return false;
      if (ratingFilter === "5" && r.rating !== 5) return false;
      if (ratingFilter === "4plus" && r.rating < 4) return false;
      if (serviceFilter !== "all" && r.serviceSlug !== serviceFilter) return false;
      if (nicheFilter !== "all" && r.nicheSlug !== nicheFilter) return false;
      return true;
    });
  }, [reviews, platform, ratingFilter, serviceFilter, nicheFilter]);

  const hasActiveFilters = platform !== "all" || ratingFilter !== "all" || serviceFilter !== "all" || nicheFilter !== "all";

  const serviceLabels: Record<ServiceFilter, string> = {
    all: isUk ? "Всі послуги" : "All Services",
    "website-dev": isUk ? "Розробка сайтів" : "Website Dev",
    ecommerce: isUk ? "Інтернет-магазин" : "E-commerce",
    "seo-service": isUk ? "SEO" : "SEO",
    landing: isUk ? "Лендінг" : "Landing",
  };

  const ratingLabels: Record<RatingFilter, string> = {
    all: isUk ? "Всі оцінки" : "All Ratings",
    "5": "★★★★★",
    "4plus": isUk ? "4★ і вище" : "4★ & above",
  };

  return (
    <section className="py-16 bg-gray-50" id="reviews-list">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter bar */}
        <div className="bg-white rounded-2xl border border-gray-200 dark:border-neutral-700 shadow-sm p-4 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-semibold text-gray-700">
              {isUk ? "Фільтри" : "Filters"}
            </span>
            {hasActiveFilters && (
              <button
                onClick={() => {
                  setPlatform("all");
                  setRatingFilter("all");
                  setServiceFilter("all");
                  setNicheFilter("all");
                }}
                className="ml-auto flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                {isUk ? "Скинути всі" : "Clear all"}
              </button>
            )}
          </div>

          <div className="space-y-3">
            {/* Platform filter */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs text-gray-500 dark:text-neutral-400 w-16 shrink-0">
                {isUk ? "Джерело:" : "Platform:"}
              </span>
              {(["all", "google", "clutch", "dou", "direct"] as Platform[]).map((p) => (
                <FilterChip key={p} active={platform === p} onClick={() => setPlatform(p)}>
                  {p === "all" ? (isUk ? "Всі" : "All") : PLATFORM_LABELS[p]}
                </FilterChip>
              ))}
            </div>

            {/* Rating filter */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs text-gray-500 dark:text-neutral-400 w-16 shrink-0">
                {isUk ? "Оцінка:" : "Rating:"}
              </span>
              {(["all", "5", "4plus"] as RatingFilter[]).map((r) => (
                <FilterChip key={r} active={ratingFilter === r} onClick={() => setRatingFilter(r)}>
                  {ratingLabels[r]}
                </FilterChip>
              ))}
            </div>

            {/* Service filter */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs text-gray-500 dark:text-neutral-400 w-16 shrink-0">
                {isUk ? "Послуга:" : "Service:"}
              </span>
              {(["all", "website-dev", "ecommerce", "seo-service", "landing"] as ServiceFilter[]).map(
                (s) => (
                  <FilterChip
                    key={s}
                    active={serviceFilter === s}
                    onClick={() => setServiceFilter(s)}
                  >
                    {serviceLabels[s]}
                  </FilterChip>
                )
              )}
            </div>

            {/* Niche filter */}
            {niches.length > 0 && (
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-xs text-gray-500 dark:text-neutral-400 w-16 shrink-0">
                  {isUk ? "Ніша:" : "Niche:"}
                </span>
                <FilterChip active={nicheFilter === "all"} onClick={() => setNicheFilter("all")}>
                  {isUk ? "Всі" : "All"}
                </FilterChip>
                {niches.map((n) => (
                  <FilterChip key={n} active={nicheFilter === n} onClick={() => setNicheFilter(n)}>
                    {n}
                  </FilterChip>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">
            {isUk
              ? `Показано ${filtered.length} з ${reviews.length} відгуків`
              : `Showing ${filtered.length} of ${reviews.length} reviews`}
          </p>
          {hasActiveFilters && filtered.length > 0 && (
            <span className="text-xs bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-1 rounded-full font-medium">
              {isUk ? "Фільтри активні" : "Filters active"}
            </span>
          )}
        </div>

        {/* Reviews grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.length === 0 ? (
            <EmptyState isUk={isUk} />
          ) : (
            filtered.map((review) => (
              <article
                key={review.id}
                className="bg-white rounded-2xl p-6 border border-gray-200 dark:border-neutral-700 shadow-sm flex flex-col"
              >
                <div className="flex items-start justify-between mb-3">
                  <StarRating rating={review.rating} />
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full border ${PLATFORM_COLORS[review.platform]}`}
                  >
                    {PLATFORM_LABELS[review.platform]}
                  </span>
                </div>

                <blockquote className="text-gray-700 dark:text-neutral-300 text-sm leading-relaxed flex-1 mb-4">
                  &ldquo;{isUk ? review.text : review.textEn}&rdquo;
                </blockquote>

                {(review.resultHighlight || review.resultHighlightEn) && (
                  <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-600 shrink-0" />
                    <span className="text-sm font-medium text-green-800">
                      {isUk ? review.resultHighlight : review.resultHighlightEn}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-gray-900 dark:text-white text-sm">
                        {review.authorName}
                      </span>
                      {review.verified && (
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{review.authorRole}</p>
                  </div>
                  <time className="text-xs text-gray-400">
                    {new Date(review.date).toLocaleDateString(isUk ? "uk-UA" : "en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </time>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
