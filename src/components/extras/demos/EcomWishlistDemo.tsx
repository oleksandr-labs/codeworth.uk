"use client";

import { useState } from "react";
import { Heart, ShoppingCart, Trash2, Share2 } from "lucide-react";

interface Props {
  variant?: string;
  isUk: boolean;
}

const PRODUCTS = [
  { id: "p1", nameEn: "Leather Crossbody Bag", nameUk: "Шкіряна сумка через плече", price: 1890, color: "from-amber-700 to-amber-900", emoji: "👜" },
  { id: "p2", nameEn: "Sneakers Urban Pro", nameUk: "Кросівки Urban Pro", price: 2490, color: "from-slate-700 to-slate-900", emoji: "👟" },
  { id: "p3", nameEn: "Wool Coat Winter", nameUk: "Вовняне зимове пальто", price: 4290, color: "from-indigo-700 to-indigo-900", emoji: "🧥" },
  { id: "p4", nameEn: "Silver Watch Classic", nameUk: "Срібний годинник Classic", price: 6890, color: "from-neutral-500 to-neutral-700", emoji: "⌚" },
  { id: "p5", nameEn: "Sunglasses Aviator", nameUk: "Окуляри Aviator", price: 1290, color: "from-stone-700 to-stone-900", emoji: "🕶" },
  { id: "p6", nameEn: "Linen Shirt Beige", nameUk: "Льняна сорочка беж", price: 1490, color: "from-amber-300 to-orange-400", emoji: "👔" },
];

export function EcomWishlistDemo({ isUk }: Props) {
  const [wishlist, setWishlist] = useState<Set<string>>(new Set(["p1", "p3"]));
  const [view, setView] = useState<"shop" | "wishlist">("shop");

  const toggle = (id: string) => {
    setWishlist((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.has(p.id));
  const fmt = (uah: number) => isUk ? `${uah.toLocaleString("uk-UA")} ₴` : `£${Math.round(uah / 40)}`;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-neutral-900">
          {isUk ? "Wishlist / Збережені товари" : "Wishlist / Saved items"}
        </h3>
        <div className="flex gap-1 rounded-lg bg-neutral-100 p-1">
          {(["shop", "wishlist"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                view === v ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500"
              }`}
            >
              {v === "shop" ? (isUk ? "Магазин" : "Shop") : (
                <>
                  {isUk ? "Обране" : "Wishlist"}
                  <span className="px-1.5 py-0.5 rounded-full bg-rose-500 text-white text-xs font-bold tabular-nums">
                    {wishlist.size}
                  </span>
                </>
              )}
            </button>
          ))}
        </div>
      </div>

      {view === "shop" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {PRODUCTS.map((p) => {
            const isFav = wishlist.has(p.id);
            return (
              <div key={p.id} className="rounded-xl border border-neutral-200 bg-white overflow-hidden hover:shadow-md transition-shadow">
                <div className={`relative h-28 bg-linear-to-br ${p.color} flex items-center justify-center text-5xl`}>
                  {p.emoji}
                  <button
                    onClick={() => toggle(p.id)}
                    className={`absolute top-2 right-2 w-9 h-9 rounded-full backdrop-blur-sm flex items-center justify-center transition-all ${
                      isFav
                        ? "bg-rose-500 text-white scale-110"
                        : "bg-white/80 text-neutral-400 hover:text-rose-500 hover:scale-110"
                    }`}
                    aria-label={isFav ? (isUk ? "Видалити з обраного" : "Remove from wishlist") : (isUk ? "Додати в обране" : "Add to wishlist")}
                    aria-pressed={isFav}
                  >
                    <Heart className={`w-4 h-4 ${isFav ? "fill-white" : ""}`} />
                  </button>
                </div>
                <div className="p-3">
                  <h4 className="font-semibold text-neutral-900 text-sm leading-tight mb-1 line-clamp-1">
                    {isUk ? p.nameUk : p.nameEn}
                  </h4>
                  <p className="text-indigo-700 font-bold">{fmt(p.price)}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {view === "wishlist" && (
        <div className="rounded-2xl border border-neutral-200 bg-white p-5">
          {wishlistedProducts.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-12 h-12 text-neutral-200 mx-auto mb-3" />
              <p className="text-neutral-500 mb-2">{isUk ? "Wishlist порожній" : "Wishlist is empty"}</p>
              <button onClick={() => setView("shop")} className="text-indigo-600 hover:underline text-sm">
                {isUk ? "Перейти до магазину →" : "Browse shop →"}
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-100">
                <span className="text-sm text-neutral-500">
                  {wishlistedProducts.length} {isUk ? "товар(ів)" : "item(s)"}
                </span>
                <button className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
                  <Share2 className="w-4 h-4" />
                  {isUk ? "Поділитись" : "Share"}
                </button>
              </div>
              <div className="space-y-2">
                {wishlistedProducts.map((p) => (
                  <div key={p.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-50">
                    <div className={`w-14 h-14 rounded-md bg-linear-to-br ${p.color} flex items-center justify-center text-2xl shrink-0`}>
                      {p.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-neutral-900 text-sm truncate">{isUk ? p.nameUk : p.nameEn}</h4>
                      <p className="text-indigo-700 font-bold text-sm">{fmt(p.price)}</p>
                    </div>
                    <button className="flex items-center gap-1 px-3 py-2 rounded-md bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-colors">
                      <ShoppingCart className="w-3 h-3" />
                      {isUk ? "В кошик" : "Add"}
                    </button>
                    <button
                      onClick={() => toggle(p.id)}
                      className="p-2 text-neutral-400 hover:text-rose-500 transition-colors"
                      aria-label={isUk ? "Видалити" : "Remove"}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      <p className="text-sm text-neutral-500">
        {isUk
          ? "Wishlist зберігається у localStorage для анонімних користувачів або в БД для авторизованих. Поділення через unique URL."
          : "Wishlist persists in localStorage for anonymous users, or in DB for authenticated. Share via unique URL."}
      </p>
    </div>
  );
}
