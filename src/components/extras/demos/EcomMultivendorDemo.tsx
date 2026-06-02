"use client";

import { useState } from "react";
import { Store, Star, MapPin, Package, TrendingUp, Search } from "lucide-react";

interface Props {
  variant?: string;
  isUk: boolean;
}

const VENDORS = [
  { id: "v1", name: "Atelier Maria", cityEn: "Kyiv", cityUk: "Київ", rating: 4.9, reviews: 248, products: 42, emoji: "👗", color: "from-rose-500 to-pink-600", tagEn: "Fashion", tagUk: "Мода" },
  { id: "v2", name: "Khreshchatyk Brew", cityEn: "Kyiv", cityUk: "Київ", rating: 4.7, reviews: 189, products: 18, emoji: "☕", color: "from-amber-700 to-orange-800", tagEn: "Coffee", tagUk: "Кава" },
  { id: "v3", name: "Lviv Wood Studio", cityEn: "Lviv", cityUk: "Львів", rating: 4.8, reviews: 156, products: 28, emoji: "🪵", color: "from-amber-800 to-yellow-900", tagEn: "Crafts", tagUk: "Крафт" },
  { id: "v4", name: "Carpathian Honey", cityEn: "Ivano-Frankivsk", cityUk: "Івано-Франківськ", rating: 5.0, reviews: 92, products: 14, emoji: "🍯", color: "from-amber-500 to-yellow-600", tagEn: "Food", tagUk: "Їжа" },
  { id: "v5", name: "Odesa Linen", cityEn: "Odesa", cityUk: "Одеса", rating: 4.6, reviews: 312, products: 67, emoji: "🧵", color: "from-emerald-600 to-teal-700", tagEn: "Textiles", tagUk: "Текстиль" },
  { id: "v6", name: "Kharkiv Electronics", cityEn: "Kharkiv", cityUk: "Харків", rating: 4.5, reviews: 451, products: 134, emoji: "💻", color: "from-indigo-600 to-violet-700", tagEn: "Tech", tagUk: "Техніка" },
];

const PRODUCTS_BY_VENDOR: Record<string, { nameEn: string; nameUk: string; price: number; emoji: string }[]> = {
  v1: [
    { nameEn: "Silk Dress", nameUk: "Шовкова сукня", price: 4290, emoji: "👗" },
    { nameEn: "Linen Blazer", nameUk: "Льняний блейзер", price: 3490, emoji: "🧥" },
    { nameEn: "Cotton Blouse", nameUk: "Бавовняна блуза", price: 1890, emoji: "👚" },
  ],
  v2: [
    { nameEn: "Ethiopian Roast 250g", nameUk: "Ефіопія обсмажка 250г", price: 520, emoji: "☕" },
    { nameEn: "Cold Brew Bottle 500ml", nameUk: "Cold brew 500мл", price: 180, emoji: "🥤" },
  ],
  v3: [
    { nameEn: "Walnut Cutting Board", nameUk: "Дошка з горіха", price: 890, emoji: "🪵" },
    { nameEn: "Oak Wall Shelf", nameUk: "Дубова полиця", price: 1490, emoji: "📚" },
  ],
};

export function EcomMultivendorDemo({ isUk }: Props) {
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filtered = VENDORS.filter((v) =>
    !search || v.name.toLowerCase().includes(search.toLowerCase()) || (isUk ? v.tagUk : v.tagEn).toLowerCase().includes(search.toLowerCase())
  );

  const vendor = selectedVendor ? VENDORS.find((v) => v.id === selectedVendor) : null;
  const products = selectedVendor ? PRODUCTS_BY_VENDOR[selectedVendor] ?? [] : [];

  const fmt = (uah: number) => isUk ? `${uah.toLocaleString("uk-UA")} ₴` : `£${Math.round(uah / 40)}`;

  if (vendor) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setSelectedVendor(null)}
          className="text-sm text-indigo-600 hover:underline"
        >
          ← {isUk ? "Усі продавці" : "All vendors"}
        </button>

        <div className={`relative rounded-2xl bg-linear-to-br ${vendor.color} text-white p-6`}>
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl shrink-0">
              {vendor.emoji}
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-1">{vendor.name}</h3>
              <div className="flex flex-wrap items-center gap-3 text-sm text-white/90">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
                  {vendor.rating} ({vendor.reviews})
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {isUk ? vendor.cityUk : vendor.cityEn}
                </span>
                <span className="flex items-center gap-1">
                  <Package className="w-4 h-4" />
                  {vendor.products} {isUk ? "товарів" : "products"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {products.length > 0 ? products.map((p, i) => (
            <div key={i} className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white overflow-hidden hover:shadow-md transition-shadow">
              <div className={`aspect-square bg-linear-to-br ${vendor.color} flex items-center justify-center text-5xl opacity-90`}>
                {p.emoji}
              </div>
              <div className="p-3">
                <p className="font-medium text-neutral-900 dark:text-white text-sm line-clamp-1">{isUk ? p.nameUk : p.nameEn}</p>
                <p className="text-indigo-700 font-bold mt-1">{fmt(p.price)}</p>
              </div>
            </div>
          )) : (
            <div className="col-span-full text-center p-8 text-sm text-neutral-500 dark:text-neutral-400 border-2 border-dashed border-neutral-200 dark:border-neutral-700 rounded-xl">
              {isUk ? "Демо-каталог цього продавця" : "Vendor catalog (demo)"}
            </div>
          )}
        </div>

        <p className="text-sm text-neutral-500">
          {isUk
            ? "Сторінка продавця: profile, рейтинг, каталог. Покупець може комбінувати товари різних продавців в одному кошику."
            : "Vendor page: profile, rating, catalog. Buyer can combine items from different vendors in one cart."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h3 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
          <Store className="w-5 h-5 text-indigo-600" />
          {isUk ? "Маркетплейс — продавці" : "Marketplace vendors"}
          <span className="px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 text-xs font-semibold tabular-nums">
            {filtered.length}
          </span>
        </h3>
        <div className="relative w-full sm:w-auto sm:min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={isUk ? "Пошук продавця..." : "Search vendors..."}
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 text-sm"
            aria-label={isUk ? "Пошук" : "Search"}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((v) => (
          <button
            key={v.id}
            onClick={() => setSelectedVendor(v.id)}
            className="text-left rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white overflow-hidden hover:shadow-lg hover:border-indigo-300 transition-all"
          >
            <div className={`relative h-24 bg-linear-to-br ${v.color} flex items-center justify-center text-5xl`}>
              {v.emoji}
              <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-neutral-700">
                {isUk ? v.tagUk : v.tagEn}
              </span>
            </div>
            <div className="p-4 space-y-1">
              <h4 className="font-bold text-neutral-900">{v.name}</h4>
              <div className="flex items-center justify-between text-xs text-neutral-500">
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <strong className="text-neutral-900">{v.rating}</strong> ({v.reviews})
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {isUk ? v.cityUk : v.cityEn}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-700 text-xs text-neutral-500">
                <span>{v.products} {isUk ? "товарів" : "items"}</span>
                <span className="text-indigo-600 font-semibold flex items-center gap-0.5">
                  {isUk ? "Перейти" : "View"}
                  <TrendingUp className="w-3 h-3" />
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      <p className="text-sm text-neutral-500">
        {isUk
          ? "Multivendor: окремі продавці зі своїм каталогом, ratings, commissions. Production: окрема admin-роль 'vendor', payouts через Stripe Connect."
          : "Multivendor: separate sellers with own catalog, ratings, commissions. Production: separate 'vendor' admin role, payouts via Stripe Connect."}
      </p>
    </div>
  );
}
