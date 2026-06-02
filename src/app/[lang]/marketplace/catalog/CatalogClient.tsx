"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { solidBlur } from "@/lib/utils";
import { Search, X, SlidersHorizontal, ArrowRight, ShoppingCart, Eye, Check, Clock, Zap, BarChart2, Star, ExternalLink } from "lucide-react";
import { NICHES_DATA, NICHE_CATEGORIES, NICHE_CATEGORY_EN, getNicheLocalized, type NicheData } from "@/lib/data/niches";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { Pagination } from "@/components/ui/Pagination";
import { StarRating } from "@/components/ui/StarRating";
import { ComparePanel } from "@/components/ui/ComparePanel";
import { useCart } from "@/hooks/useCart";
import { useCompare } from "@/hooks/useCompare";
import { EmptyState } from "@/components/ui/EmptyState";
import { useLocale } from "@/components/layout/LocaleProvider";

const HOT_SLUGS = new Set(["restaurant", "beauty-salon", "medical-clinic", "fitness-club", "real-estate"]);
const NEW_SLUGS = new Set(["saas-product", "education-courses", "food-delivery"]);

// Popularity order (higher = more popular)
const POPULARITY: Record<string, number> = {
  "restaurant": 95,
  "beauty-salon": 90,
  "medical-clinic": 88,
  "real-estate": 85,
  "fitness-club": 82,
  "food-delivery": 78,
  "education-courses": 75,
  "ecommerce-fashion": 72,
  "saas-product": 70,
};
const getPopularity = (slug: string) => POPULARITY[slug] ?? 50;

// Derived rating 4.0–5.0 based on popularity score
const getRating = (slug: string): number => {
  const p = getPopularity(slug);
  return Math.round((4.0 + (p / 100)) * 10) / 10;
};

const COMPLEXITY_VALUES = ["simple", "medium", "complex"];

const COMPLEXITY_BADGE: Record<string, string> = {
  simple: "bg-green-100 text-green-700",
  medium: "bg-amber-100 text-amber-700",
  complex: "bg-red-100 text-red-700",
};

function getComplexityLabel(complexity: string, isUk: boolean): string {
  const labels: Record<string, [string, string]> = {
    simple: ["Простий", "Simple"],
    medium: ["Середній", "Medium"],
    complex: ["Складний", "Complex"],
  };
  const pair = labels[complexity];
  return pair ? (isUk ? pair[0] : pair[1]) : complexity;
}

const ITEMS_PER_PAGE = 12;

const FEATURE_FILTERS = [
  { value: "booking",   labelUk: "Онлайн-запис",       labelEn: "Online Booking",    test: (f: string) => /онлайн.зап|бронюв/i.test(f) },
  { value: "catalog",   labelUk: "Каталог товарів",    labelEn: "Product Catalog",   test: (f: string) => /каталог|товар/i.test(f) },
  { value: "gallery",   labelUk: "Галерея",            labelEn: "Gallery",           test: (f: string) => /галере/i.test(f) },
  { value: "blog",      labelUk: "Блог / Новини",      labelEn: "Blog / News",       test: (f: string) => /блог|новин/i.test(f) },
  { value: "shop",      labelUk: "Магазин / Кошик",   labelEn: "Shop / Cart",       test: (f: string) => /магазин|кошик/i.test(f) },
  { value: "account",   labelUk: "Особистий кабінет", labelEn: "User Account",      test: (f: string) => /особист.{0,5}каб|кабінет/i.test(f) },
  { value: "seo",       labelUk: "SEO-оптимізація",   labelEn: "SEO Optimization",  test: (f: string) => /SEO/i.test(f) },
];

function AddToCartButton({ niche }: { niche: NicheData }) {
  const { addItem, hasItem } = useCart();
  const lang = useLocale();
  const isUk = lang === "uk";
  const inCart = hasItem(`${niche.slug}-basic`);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        addItem({
          id: `${niche.slug}-basic`,
          slug: niche.slug,
          title: niche.title,
          emoji: niche.emoji,
          package: "Базовий",
          price: niche.priceFrom,
        });
      }}
      aria-label={inCart ? (isUk ? "Вже у кошику" : "Already in cart") : (isUk ? "Додати у кошик" : "Add to cart")}
      className={`p-1.5 rounded-lg transition-all ${
        inCart
          ? "text-indigo-600 bg-indigo-50"
          : "text-gray-400 hover:text-indigo-600 hover:bg-indigo-50"
      }`}
    >
      <ShoppingCart className="w-3.5 h-3.5" />
    </button>
  );
}

function QuickViewModal({ niche, onClose }: { niche: NicheData; onClose: () => void }) {
  const { addItem, hasItem } = useCart();
  const lang = useLocale();
  const isUk = lang === "uk";
  const inCart = hasItem(`${niche.slug}-basic`);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={isUk ? `Швидкий перегляд: ${niche.title}` : `Quick view: ${niche.title}`}
    >
      <div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header gradient */}
        <div className={`relative h-40 bg-linear-to-br ${niche.gradient} flex items-center justify-center rounded-t-3xl overflow-hidden`}>
          {niche.previewImage ? (
            <Image
              src={niche.previewImage}
              alt={niche.title}
              fill
              className="object-cover object-top"
              sizes="672px"
              placeholder="blur"
              blurDataURL={solidBlur()}
            />
          ) : (
            <span className="text-7xl drop-shadow-lg">{niche.emoji}</span>
          )}
          <button
            onClick={onClose}
            aria-label={isUk ? "Закрити" : "Close"}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <h2 className="text-xl font-heading font-bold text-neutral-900 dark:text-white leading-tight">
              {niche.title}
            </h2>
            <StarRating value={5} readonly size="sm" showValue reviewCount={Math.floor(getPopularity(niche.slug) / 10) + 2} />
          </div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-5 leading-relaxed">{niche.subtitle}</p>

          {/* Key stats */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { icon: Zap, label: isUk ? "Запуск" : "Launch", value: `${niche.deliveryDays} ${isUk ? "днів" : "days"}` },
              { icon: Clock, label: isUk ? "Пакет від" : "Starting at", value: `${niche.priceFrom.toLocaleString("uk-UA")} ₴` },
              { icon: Check, label: isUk ? "Складність" : "Complexity", value: getComplexityLabel(niche.complexity, isUk) },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="text-center p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800">
                <Icon className="w-4 h-4 text-indigo-500 mx-auto mb-1" />
                <div className="text-xs text-neutral-400 mb-0.5">{label}</div>
                <div className="text-sm font-bold text-neutral-900 dark:text-white">{value}</div>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="mb-5">
            <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-2">{isUk ? "Що включено" : "What's Included"}</div>
            <ul className="grid grid-cols-2 gap-1.5">
              {niche.features.slice(0, 6).map((f) => (
                <li key={f} className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-300">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {niche.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => {
                addItem({
                  id: `${niche.slug}-basic`,
                  slug: niche.slug,
                  title: niche.title,
                  emoji: niche.emoji,
                  package: "Базовий",
                  price: niche.priceFrom,
                });
              }}
              className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all ${
                inCart
                  ? "bg-emerald-500 text-white cursor-default"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }`}
            >
              {inCart ? (isUk ? "✓ У кошику" : "✓ In Cart") : (isUk ? "Додати у кошик" : "Add to Cart")}
            </button>
            <Link
              href={`/${lang}/marketplace/product/${niche.slug}`}
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border-2 border-indigo-200 text-indigo-700 font-semibold text-sm text-center hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-950 transition-colors"
            >
              {isUk ? "Детальніше →" : "View Details →"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCard({
  niche,
  onQuickView,
  onToggleCompare,
  isCompareSelected,
  isCompareFull,
}: {
  niche: NicheData;
  onQuickView: (niche: NicheData) => void;
  onToggleCompare: (niche: NicheData) => void;
  isCompareSelected: boolean;
  isCompareFull: boolean;
}) {
  const lang = useLocale();
  const isUk = lang === "uk";
  return (
    <div className="group relative bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 overflow-hidden hover:shadow-lg hover:border-indigo-100 dark:hover:border-indigo-900 transition-all duration-300 flex flex-col">
      <Link href={`/${lang}/marketplace/product/${niche.slug}`} className="flex flex-col flex-1">
      {/* Visual header */}
      <div
        className={`h-36 bg-linear-to-br ${niche.gradient} flex items-center justify-center relative overflow-hidden`}
      >
        {niche.previewImage ? (
          <Image
            src={niche.previewImage}
            alt={niche.title}
            fill
            className="object-cover object-top"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            placeholder="blur"
            blurDataURL={solidBlur()}
          />
        ) : (
          <span className="text-5xl drop-shadow-sm">{niche.emoji}</span>
        )}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {HOT_SLUGS.has(niche.slug) && <Badge variant="hot">🔥 {isUk ? "Хіт" : "Hot"}</Badge>}
          {NEW_SLUGS.has(niche.slug) && <Badge variant="new">✨ {isUk ? "Новинка" : "New"}</Badge>}
        </div>
        <div className="absolute top-3 right-3">
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full bg-white/90 ${COMPLEXITY_BADGE[niche.complexity]}`}>
            {getComplexityLabel(niche.complexity, isUk)}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors text-sm leading-snug">
            {niche.title}
          </h3>
        </div>
        <p className="text-xs text-gray-500 dark:text-neutral-400 mb-3 line-clamp-2 flex-1">{niche.subtitle}</p>

        {/* Stars */}
        <StarRating value={getRating(niche.slug)} readonly size="sm" showValue reviewCount={Math.floor(getPopularity(niche.slug) / 10) + 2} className="mb-3" />

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {niche.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-neutral-800 text-gray-500 dark:text-neutral-400">
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-neutral-800">
          <div>
            <div className="text-xs text-gray-400">{isUk ? "від" : "from"}</div>
            <div className="font-bold text-gray-900 dark:text-white">
              {niche.priceFrom.toLocaleString("uk-UA")} ₴
            </div>
          </div>
          <div className="flex items-center gap-1">
            <AddToCartButton niche={niche} />
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
          </div>
        </div>
      </div>
      </Link>

      {/* Quick View + Live Demo + Compare buttons — appear on hover */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onQuickView(niche);
          }}
          aria-label={isUk ? `Швидкий перегляд: ${niche.title}` : `Quick view: ${niche.title}`}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-medium text-neutral-600 dark:text-neutral-300 shadow-sm hover:border-indigo-300 hover:text-indigo-600 whitespace-nowrap transition-colors"
        >
          <Eye className="w-3.5 h-3.5" />
          {isUk ? "Перегляд" : "Quick View"}
        </button>
        <Link
          href={`/${lang}/niches/${niche.slug}`}
          target="_blank"
          onClick={(e) => e.stopPropagation()}
          aria-label={isUk ? `Жива демо: ${niche.title}` : `Live demo: ${niche.title}`}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white border border-emerald-600 text-xs font-medium shadow-sm hover:bg-emerald-700 whitespace-nowrap transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          {isUk ? "Live Demo" : "Live Demo"}
        </Link>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleCompare(niche);
          }}
          disabled={isCompareFull && !isCompareSelected}
          aria-label={isCompareSelected ? (isUk ? `Прибрати ${niche.title} з порівняння` : `Remove ${niche.title} from comparison`) : (isUk ? `Порівняти ${niche.title}` : `Compare ${niche.title}`)}
          aria-pressed={isCompareSelected}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium shadow-sm whitespace-nowrap transition-colors
            ${isCompareSelected
              ? "bg-indigo-600 border-indigo-600 text-white hover:bg-indigo-700"
              : "bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:border-indigo-300 hover:text-indigo-600"
            }
            disabled:opacity-40 disabled:cursor-not-allowed`}
        >
          <BarChart2 className="w-3.5 h-3.5" />
          {isCompareSelected ? (isUk ? "В порівнянні" : "Comparing") : (isUk ? "Порівняти" : "Compare")}
        </button>
      </div>
    </div>
  );
}

export default function CatalogClient() {
  const lang = useLocale();
  const isUk = lang === "uk";
  const router = useRouter();
  const searchParams = useSearchParams();

  const SORT_OPTIONS = isUk
    ? [
        { value: "popular",   label: "За популярністю" },
        { value: "new",       label: "Нові спочатку" },
        { value: "price-asc", label: "Ціна: від низької" },
        { value: "price-desc",label: "Ціна: від високої" },
        { value: "days-asc",  label: "Терміни: швидші спочатку" },
        { value: "rating",    label: "За рейтингом" },
      ]
    : [
        { value: "popular",   label: "By Popularity" },
        { value: "new",       label: "Newest First" },
        { value: "price-asc", label: "Price: Low to High" },
        { value: "price-desc",label: "Price: High to Low" },
        { value: "days-asc",  label: "Fastest Delivery" },
        { value: "rating",    label: "By Rating" },
      ];

  const RATING_FILTERS = isUk
    ? [
        { value: 0,   label: "Будь-який" },
        { value: 4.0, label: "від 4.0★" },
        { value: 4.5, label: "від 4.5★" },
        { value: 4.7, label: "від 4.7★" },
        { value: 4.9, label: "від 4.9★" },
      ]
    : [
        { value: 0,   label: "Any" },
        { value: 4.0, label: "4.0★+" },
        { value: 4.5, label: "4.5★+" },
        { value: 4.7, label: "4.7★+" },
        { value: 4.9, label: "4.9★+" },
      ];

  const COMPLEXITY_FILTER = COMPLEXITY_VALUES.map((v) => ({ value: v, label: getComplexityLabel(v, isUk) }));

  // Read initial state from URL
  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
  const [category, setCategory] = useState(() => searchParams.get("cat") ?? "");
  const [complexity, setComplexity] = useState(() => searchParams.get("cx") ?? "");
  const [featureFilter, setFeatureFilter] = useState(() => searchParams.get("feat") ?? "");
  const [minRating, setMinRating] = useState(() => Number(searchParams.get("rating") ?? 0));
  const [maxPrice, setMaxPrice] = useState(() => Number(searchParams.get("price") ?? 25000));
  const [sort, setSort] = useState(() => searchParams.get("sort") ?? "popular");
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(() => Number(searchParams.get("page") ?? 1));

  const [quickViewNiche, setQuickViewNiche] = useState<NicheData | null>(null);
  const { toggleItem, isSelected, isFull } = useCompare();

  // Lock body scroll when mobile filter drawer is open
  useEffect(() => {
    document.body.style.overflow = showFilters ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [showFilters]);

  // Sync state → URL
  const syncUrl = useCallback((updates: Record<string, string | number>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([k, v]) => {
      if (!v || v === "popular" || (k === "price" && Number(v) >= 25000) || (k === "page" && Number(v) === 1) || (k === "rating" && Number(v) === 0)) {
        params.delete(k);
      } else {
        params.set(k, String(v));
      }
    });
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [router, searchParams]);

  const setAndSync = (key: string, val: string | number, extra?: Record<string, string | number>) => {
    syncUrl({ [key]: val, page: 1, ...extra });
    if (key === "page") setPage(Number(val));
    else setPage(1);
  };

  const filtered = useMemo(() => {
    let list = [...NICHES_DATA];

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.subtitle.toLowerCase().includes(q) ||
          n.tags.some((t) => t.toLowerCase().includes(q)) ||
          n.category.toLowerCase().includes(q)
      );
    }

    if (category) list = list.filter((n) => n.category === category);
    if (complexity) list = list.filter((n) => n.complexity === complexity);
    if (featureFilter) {
      const ff = FEATURE_FILTERS.find((f) => f.value === featureFilter);
      if (ff) list = list.filter((n) => n.features.some(ff.test));
    }
    list = list.filter((n) => n.priceFrom <= maxPrice);
    if (minRating > 0) list = list.filter((n) => getRating(n.slug) >= minRating);

    switch (sort) {
      case "popular":
        list.sort((a, b) => getPopularity(b.slug) - getPopularity(a.slug));
        break;
      case "new":
        list.sort((a, b) => (NEW_SLUGS.has(b.slug) ? 1 : 0) - (NEW_SLUGS.has(a.slug) ? 1 : 0));
        break;
      case "price-asc":
        list.sort((a, b) => a.priceFrom - b.priceFrom);
        break;
      case "price-desc":
        list.sort((a, b) => b.priceFrom - a.priceFrom);
        break;
      case "days-asc":
        list.sort((a, b) => a.deliveryDays - b.deliveryDays);
        break;
      case "rating":
        list.sort((a, b) => getPopularity(b.slug) - getPopularity(a.slug));
        break;
    }

    return list;
  }, [query, category, complexity, featureFilter, minRating, maxPrice, sort]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const hasFilters = !!(query || category || complexity || featureFilter || minRating > 0 || maxPrice < 25000);

  const clearAll = () => {
    setQuery(""); setCategory(""); setComplexity(""); setFeatureFilter(""); setMinRating(0); setMaxPrice(25000); setSort("popular"); setPage(1);
    router.replace("?", { scroll: false });
  };

  const handlePageChange = (p: number) => {
    setPage(p);
    setAndSync("page", p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
    <section className="py-10 bg-neutral-50 dark:bg-neutral-950">
      <Container>
        {/* Category quick-chips */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => { setCategory(""); setAndSync("cat", ""); }}
            className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-colors ${
              !category
                ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400"
                : "border-gray-200 dark:border-neutral-700 text-gray-600 dark:text-neutral-400 hover:border-gray-300 bg-white dark:bg-neutral-900"
            }`}
          >
            {isUk ? "Всі" : "All"}
          </button>
          {NICHE_CATEGORIES.slice(0, 8).map((cat) => (
            <button
              key={cat}
              onClick={() => { setCategory(category === cat ? "" : cat); setAndSync("cat", category === cat ? "" : cat); }}
              className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-colors ${
                category === cat
                  ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400"
                  : "border-gray-200 dark:border-neutral-700 text-gray-600 dark:text-neutral-400 hover:border-gray-300 bg-white dark:bg-neutral-900"
              }`}
            >
              {isUk ? cat : (NICHE_CATEGORY_EN[cat] ?? cat)}
            </button>
          ))}
        </div>

        {/* Top bar */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {/* Search */}
          <div className="relative flex-1 min-w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setAndSync("q", e.target.value); }}
              placeholder={isUk ? "Пошук рішень..." : "Search solutions..."}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400"
            />
            {query && (
              <button
                onClick={() => { setQuery(""); setAndSync("q", ""); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => { setSort(e.target.value); setAndSync("sort", e.target.value); }}
            className="py-2.5 px-3 rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-gray-700 dark:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>

          {/* Toggle filters */}
          <button
            onClick={() => setShowFilters((v) => !v)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
              showFilters || hasFilters
                ? "border-indigo-400 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400"
                : "border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-gray-700 dark:text-neutral-300 hover:border-gray-300"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            {isUk ? "Фільтри" : "Filters"}
            {hasFilters && <span className="w-2 h-2 rounded-full bg-indigo-600" />}
          </button>

          {hasFilters && (
            <button onClick={clearAll} className="text-sm text-gray-500 hover:text-gray-700 underline underline-offset-2">
              {isUk ? "Скинути" : "Reset"}
            </button>
          )}
        </div>

        {/* Filters panel — desktop: inline; mobile: bottom drawer */}
        {showFilters && (
          <>
            {/* Desktop inline panel */}
            <div className="hidden md:grid md:grid-cols-3 gap-5 bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 p-5 mb-6">
              {/* Category */}
              <div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{isUk ? "Категорія" : "Category"}</div>
                <div className="flex flex-wrap gap-2">
                  {NICHE_CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => { setCategory(category === cat ? "" : cat); setAndSync("cat", category === cat ? "" : cat); }}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                        category === cat
                          ? "border-indigo-400 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400"
                          : "border-gray-200 dark:border-neutral-700 text-gray-600 dark:text-neutral-400 hover:border-gray-300"
                      }`}
                    >
                      {isUk ? cat : (NICHE_CATEGORY_EN[cat] ?? cat)}
                    </button>
                  ))}
                </div>
              </div>
              {/* Complexity */}
              <div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{isUk ? "Складність" : "Complexity"}</div>
                <div className="flex gap-2">
                  {COMPLEXITY_FILTER.map((c) => (
                    <button
                      key={c.value}
                      onClick={() => { setComplexity(complexity === c.value ? "" : c.value); setAndSync("cx", complexity === c.value ? "" : c.value); }}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                        complexity === c.value
                          ? "border-indigo-400 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400"
                          : "border-gray-200 dark:border-neutral-700 text-gray-600 dark:text-neutral-400 hover:border-gray-300"
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
              {/* Features */}
              <div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{isUk ? "Функціонал" : "Features"}</div>
                <div className="flex flex-wrap gap-2">
                  {FEATURE_FILTERS.map((f) => (
                    <button
                      key={f.value}
                      onClick={() => { setFeatureFilter(featureFilter === f.value ? "" : f.value); setAndSync("feat", featureFilter === f.value ? "" : f.value); }}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                        featureFilter === f.value
                          ? "border-indigo-400 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400"
                          : "border-gray-200 dark:border-neutral-700 text-gray-600 dark:text-neutral-400 hover:border-gray-300"
                      }`}
                    >
                      {isUk ? f.labelUk : f.labelEn}
                    </button>
                  ))}
                </div>
              </div>
              {/* Rating */}
              <div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{isUk ? "Мін. рейтинг" : "Min. Rating"}</div>
                <div className="flex flex-wrap gap-2">
                  {RATING_FILTERS.map((r) => (
                    <button
                      key={r.value}
                      onClick={() => { setMinRating(r.value); setAndSync("rating", r.value); }}
                      className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-full border transition-colors ${
                        minRating === r.value
                          ? "border-amber-400 bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400"
                          : "border-gray-200 dark:border-neutral-700 text-gray-600 dark:text-neutral-400 hover:border-gray-300"
                      }`}
                    >
                      {r.value > 0 && <Star className="w-3 h-3 fill-current" />}
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>
              {/* Price */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{isUk ? "Ціна до" : "Max Price"}</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{maxPrice.toLocaleString("uk-UA")} ₴</span>
                </div>
                <input
                  type="range" min={5000} max={25000} step={1000} value={maxPrice}
                  onChange={(e) => { setMaxPrice(Number(e.target.value)); setAndSync("price", e.target.value); }}
                  className="w-full accent-indigo-600"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>5 000 ₴</span><span>25 000+ ₴</span>
                </div>
              </div>
            </div>

            {/* Mobile bottom sheet */}
            <div className="md:hidden fixed inset-0 z-40 flex flex-col justify-end" role="dialog" aria-modal="true" aria-label={isUk ? "Фільтри" : "Filters"}>
              {/* Backdrop */}
              <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={() => setShowFilters(false)}
              />
              {/* Sheet */}
              <div className="relative bg-white dark:bg-neutral-900 rounded-t-3xl px-5 pt-5 pb-8 space-y-5 max-h-[80vh] overflow-y-auto">
                {/* Handle */}
                <div className="w-10 h-1 rounded-full bg-gray-200 dark:bg-neutral-700 mx-auto mb-1" />
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-900 dark:text-white text-base">{isUk ? "Фільтри" : "Filters"}</h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
                    aria-label={isUk ? "Закрити" : "Close"}
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
                {/* Category */}
                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{isUk ? "Категорія" : "Category"}</div>
                  <div className="flex flex-wrap gap-2">
                    {NICHE_CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => { setCategory(category === cat ? "" : cat); setAndSync("cat", category === cat ? "" : cat); }}
                        className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                          category === cat
                            ? "border-indigo-400 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400"
                            : "border-gray-200 dark:border-neutral-700 text-gray-600 dark:text-neutral-400"
                        }`}
                      >
                        {isUk ? cat : (NICHE_CATEGORY_EN[cat] ?? cat)}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Complexity */}
                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{isUk ? "Складність" : "Complexity"}</div>
                  <div className="flex gap-2">
                    {COMPLEXITY_FILTER.map((c) => (
                      <button
                        key={c.value}
                        onClick={() => { setComplexity(complexity === c.value ? "" : c.value); setAndSync("cx", complexity === c.value ? "" : c.value); }}
                        className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                          complexity === c.value
                            ? "border-indigo-400 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400"
                            : "border-gray-200 dark:border-neutral-700 text-gray-600 dark:text-neutral-400"
                        }`}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Features */}
                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{isUk ? "Функціонал" : "Features"}</div>
                  <div className="flex flex-wrap gap-2">
                    {FEATURE_FILTERS.map((f) => (
                      <button
                        key={f.value}
                        onClick={() => { setFeatureFilter(featureFilter === f.value ? "" : f.value); setAndSync("feat", featureFilter === f.value ? "" : f.value); }}
                        className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                          featureFilter === f.value
                            ? "border-indigo-400 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400"
                            : "border-gray-200 dark:border-neutral-700 text-gray-600 dark:text-neutral-400"
                        }`}
                      >
                        {isUk ? f.labelUk : f.labelEn}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Rating */}
                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{isUk ? "Мін. рейтинг" : "Min. Rating"}</div>
                  <div className="flex flex-wrap gap-2">
                    {RATING_FILTERS.map((r) => (
                      <button
                        key={r.value}
                        onClick={() => { setMinRating(r.value); setAndSync("rating", r.value); }}
                        className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-full border transition-colors ${
                          minRating === r.value
                            ? "border-amber-400 bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400"
                            : "border-gray-200 dark:border-neutral-700 text-gray-600 dark:text-neutral-400"
                        }`}
                      >
                        {r.value > 0 && <Star className="w-3 h-3 fill-current" />}
                        {r.label}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Price */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{isUk ? "Ціна до" : "Max Price"}</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">{maxPrice.toLocaleString("uk-UA")} ₴</span>
                  </div>
                  <input
                    type="range" min={5000} max={25000} step={1000} value={maxPrice}
                    onChange={(e) => { setMaxPrice(Number(e.target.value)); setAndSync("price", e.target.value); }}
                    className="w-full accent-indigo-600"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>5 000 ₴</span><span>25 000+ ₴</span>
                  </div>
                </div>
                {/* Apply button */}
                <button
                  onClick={() => setShowFilters(false)}
                  className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-colors"
                >
                  {isUk ? `Застосувати (${filtered.length} рішень)` : `Apply (${filtered.length} results)`}
                </button>
                {hasFilters && (
                  <button onClick={() => { clearAll(); }} className="w-full py-2 text-sm text-gray-500 hover:text-gray-700 underline underline-offset-2">
                    {isUk ? "Скинути фільтри" : "Reset Filters"}
                  </button>
                )}
              </div>
            </div>
          </>
        )}

        {/* Active filter chips + count */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="text-sm text-gray-500 dark:text-neutral-400">
            {isUk ? "Знайдено:" : "Found:"} <strong className="text-gray-900 dark:text-white">{filtered.length}</strong> {isUk ? "рішень" : "solutions"}
          </span>
          {category && (
            <button
              onClick={() => { setCategory(""); setAndSync("cat", ""); }}
              className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400"
            >
              {isUk ? category : (NICHE_CATEGORY_EN[category] ?? category)} <X className="w-3 h-3" />
            </button>
          )}
          {complexity && (
            <button
              onClick={() => { setComplexity(""); setAndSync("cx", ""); }}
              className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400"
            >
              {getComplexityLabel(complexity, isUk)} <X className="w-3 h-3" />
            </button>
          )}
          {featureFilter && (
            <button
              onClick={() => { setFeatureFilter(""); setAndSync("feat", ""); }}
              className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400"
            >
              {(() => { const ff = FEATURE_FILTERS.find((f) => f.value === featureFilter); return ff ? (isUk ? ff.labelUk : ff.labelEn) : featureFilter; })()} <X className="w-3 h-3" />
            </button>
          )}
          {minRating > 0 && (
            <button
              onClick={() => { setMinRating(0); setAndSync("rating", 0); }}
              className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400"
            >
              <Star className="w-3 h-3 fill-current" /> {isUk ? "від" : "from"} {minRating}★ <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Grid */}
        {paginated.length > 0 ? (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {paginated.map((rawNiche) => {
                const niche = getNicheLocalized(rawNiche.slug, lang) ?? rawNiche;
                return (
                <ProductCard
                    key={niche.slug}
                    niche={niche}
                    onQuickView={setQuickViewNiche}
                    onToggleCompare={(n) => toggleItem({
                      slug: n.slug,
                      title: n.title,
                      emoji: n.emoji,
                      priceFrom: n.priceFrom,
                      complexity: n.complexity,
                      features: n.features,
                      gradient: n.gradient,
                    })}
                    isCompareSelected={isSelected(niche.slug)}
                    isCompareFull={isFull}
                  />
                );
              })}
            </div>

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              className="mt-10"
            />
          </>
        ) : (
          <div className="text-center py-20">
            <EmptyState variant="search" size={140} className="mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{isUk ? "Нічого не знайдено" : "No results found"}</h3>
            <p className="text-gray-500 dark:text-neutral-400 mb-6">{isUk ? "Спробуйте змінити параметри пошуку або скиньте фільтри." : "Try adjusting your search parameters or reset the filters."}</p>
            <button
              onClick={clearAll}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              {isUk ? "Скинути фільтри" : "Reset Filters"}
            </button>
          </div>
        )}

        {/* Bottom CTA */}
        {paginated.length > 0 && (
          <div className="mt-12 text-center p-8 bg-indigo-50 dark:bg-indigo-950/50 rounded-2xl border border-indigo-100 dark:border-indigo-900">
            <p className="text-gray-700 dark:text-neutral-300 mb-4">
              {isUk
                ? "Не знайшли підходящого рішення? Ми розробимо сайт під ваш бізнес індивідуально."
                : "Didn't find the right solution? We'll build a custom website for your business."}
            </p>
            <Link
              href={`/${lang}/contact`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium text-sm hover:bg-indigo-700 transition-colors"
            >
              {isUk ? "Зв'язатися з нами" : "Contact Us"} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </Container>

      {/* Quick View Modal */}
      {quickViewNiche && (
        <QuickViewModal niche={quickViewNiche} onClose={() => setQuickViewNiche(null)} />
      )}
    </section>

    {/* Compare Panel — sticky bottom bar (shows when 2+ items selected) */}
    <ComparePanel />
    </>
  );
}
