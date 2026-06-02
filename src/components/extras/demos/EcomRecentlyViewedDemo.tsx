"use client";

import { useEffect, useState } from "react";
import { Eye, X, ShoppingCart } from "lucide-react";

interface Props {
  variant?: string;
  isUk: boolean;
}

const ALL_PRODUCTS = [
  { id: "p1", nameEn: "Sneakers Urban", nameUk: "Кросівки Urban", price: 2890, emoji: "👟", color: "from-slate-700 to-slate-900", viewedAt: "10:42" },
  { id: "p2", nameEn: "Leather Bag", nameUk: "Шкіряна сумка", price: 4290, emoji: "👜", color: "from-amber-800 to-amber-900", viewedAt: "10:38" },
  { id: "p3", nameEn: "Watch Classic", nameUk: "Годинник Classic", price: 8990, emoji: "⌚", color: "from-neutral-500 to-neutral-700", viewedAt: "10:31" },
  { id: "p4", nameEn: "Sunglasses Aviator", nameUk: "Окуляри Aviator", price: 1290, emoji: "🕶", color: "from-stone-700 to-stone-900", viewedAt: "10:24" },
  { id: "p5", nameEn: "Backpack 25L", nameUk: "Рюкзак 25L", price: 1990, emoji: "🎒", color: "from-emerald-700 to-teal-800", viewedAt: "10:15" },
  { id: "p6", nameEn: "Wool Beanie", nameUk: "Вовняна шапка", price: 490, emoji: "🧢", color: "from-rose-600 to-pink-700", viewedAt: "10:08" },
  { id: "p7", nameEn: "Wireless Earbuds", nameUk: "Бездротові навушники", price: 3490, emoji: "🎧", color: "from-indigo-700 to-violet-800", viewedAt: "09:55" },
  { id: "p8", nameEn: "Travel Umbrella", nameUk: "Парасолька", price: 690, emoji: "☂", color: "from-blue-600 to-cyan-700", viewedAt: "09:42" },
];

export function EcomRecentlyViewedDemo({ isUk }: Props) {
  const [items, setItems] = useState(ALL_PRODUCTS);

  const remove = (id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  const clearAll = () => setItems([]);

  const fmt = (uah: number) => isUk ? `${uah.toLocaleString("uk-UA")} ₴` : `£${Math.round(uah / 40)}`;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-neutral-900 dark:text-white flex items-center gap-2">
          <Eye className="w-5 h-5 text-neutral-500" />
          {isUk ? "Нещодавно переглянуті" : "Recently viewed"}
          <span className="px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 text-xs font-semibold tabular-nums">
            {items.length}
          </span>
        </h3>
        {items.length > 0 && (
          <button
            onClick={clearAll}
            className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-rose-600 transition-colors"
          >
            {isUk ? "Очистити все" : "Clear all"}
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-neutral-200 dark:border-neutral-700 p-12 text-center">
          <Eye className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
          <p className="text-neutral-500 dark:text-neutral-400 text-sm">{isUk ? "Історія переглядів порожня" : "View history is empty"}</p>
          <button
            onClick={() => setItems(ALL_PRODUCTS)}
            className="mt-3 text-sm text-indigo-600 hover:underline"
          >
            {isUk ? "Відновити демо" : "Restore demo"}
          </button>
        </div>
      ) : (
        <>
          {/* Horizontal scroll strip */}
          <div className="overflow-x-auto pb-3">
            <div className="flex gap-3">
              {items.map((item) => (
                <div key={item.id} className="flex-shrink-0 w-44 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white overflow-hidden group">
                  <div className={`relative aspect-square bg-linear-to-br ${item.color} flex items-center justify-center text-5xl`}>
                    {item.emoji}
                    <button
                      onClick={() => remove(item.id)}
                      className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-white/90 backdrop-blur-sm text-neutral-400 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center"
                      aria-label={isUk ? "Видалити з історії" : "Remove from history"}
                    >
                      <X className="w-3 h-3" />
                    </button>
                    <div className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/50 text-white text-[10px] tabular-nums">
                      {item.viewedAt}
                    </div>
                  </div>
                  <div className="p-2.5">
                    <h4 className="font-medium text-neutral-900 dark:text-white text-xs line-clamp-1 mb-1">{isUk ? item.nameUk : item.nameEn}</h4>
                    <p className="text-sm font-bold text-indigo-700">{fmt(item.price)}</p>
                    <button className="mt-1.5 w-full flex items-center justify-center gap-1 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-[10px] font-semibold hover:bg-indigo-50 hover:text-indigo-700 transition-colors">
                      <ShoppingCart className="w-2.5 h-2.5" />
                      {isUk ? "В кошик" : "Add"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-neutral-400">
            ← {isUk ? "Прокрутіть, щоб побачити більше" : "Scroll to see more"} →
          </p>
        </>
      )}

      <p className="text-sm text-neutral-500">
        {isUk
          ? "Зберігається у localStorage (анонімні) або БД (авторизовані). Збільшує depth-of-visit на 35% і recovery rate на 12%."
          : "Stored in localStorage (anonymous) or DB (logged in). Increases depth-of-visit 35% and recovery rate 12%."}
      </p>
    </div>
  );
}
