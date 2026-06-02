"use client";

import { useState } from "react";
import { Plus, Check, Sparkles, TrendingUp } from "lucide-react";

interface Props {
  variant?: string;
  isUk: boolean;
}

const MAIN_PRODUCT = {
  nameEn: "MacBook Pro 14\" M3",
  nameUk: "MacBook Pro 14\" M3",
  price: 89900,
  emoji: "💻",
  color: "from-slate-700 to-neutral-900",
};

const RECOMMENDATIONS = [
  { id: "r1", nameEn: "USB-C Hub 8-in-1", nameUk: "USB-C Hub 8-в-1", price: 2890, savings: 290, emoji: "🔌", color: "from-indigo-600 to-violet-700" },
  { id: "r2", nameEn: "Laptop Sleeve Premium", nameUk: "Преміум чохол для ноутбука", price: 1490, savings: 150, emoji: "💼", color: "from-amber-600 to-orange-700" },
  { id: "r3", nameEn: "AppleCare+ 3 years", nameUk: "AppleCare+ на 3 роки", price: 8900, savings: 0, emoji: "🛡", color: "from-emerald-600 to-teal-700" },
  { id: "r4", nameEn: "Magic Mouse", nameUk: "Magic Mouse", price: 3490, savings: 350, emoji: "🖱", color: "from-rose-500 to-pink-600" },
];

export function EcomUpsellDemo({ isUk }: Props) {
  const [selected, setSelected] = useState<Set<string>>(new Set(["r1"]));
  const [layout, setLayout] = useState<"bundle" | "cross-sell">("bundle");

  const toggle = (id: string) => {
    setSelected((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectedItems = RECOMMENDATIONS.filter((r) => selected.has(r.id));
  const itemsTotal = selectedItems.reduce((s, i) => s + i.price, 0);
  const savings = selectedItems.reduce((s, i) => s + i.savings, 0);
  const bundleTotal = MAIN_PRODUCT.price + itemsTotal - savings;

  const fmt = (uah: number) => isUk ? `${uah.toLocaleString("uk-UA")} ₴` : `£${Math.round(uah / 40)}`;

  return (
    <div className="space-y-6">
      <div className="flex gap-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 p-1 w-fit">
        {([
          { id: "bundle", labelEn: "Bundle (FBT)", labelUk: "Бандл (FBT)" },
          { id: "cross-sell", labelEn: "Cross-sell carousel", labelUk: "Cross-sell карусель" },
        ] as const).map((v) => (
          <button
            key={v.id}
            onClick={() => setLayout(v.id)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              layout === v.id ? "bg-white text-neutral-900 dark:text-white shadow-sm" : "text-neutral-500"
            }`}
          >
            {isUk ? v.labelUk : v.labelEn}
          </button>
        ))}
      </div>

      {layout === "bundle" && (
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white p-5 space-y-5">
          <h3 className="font-bold text-neutral-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            {isUk ? "Часто купують разом" : "Frequently bought together"}
          </h3>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Main */}
            <div className="flex-shrink-0">
              <div className={`w-24 h-24 rounded-xl bg-linear-to-br ${MAIN_PRODUCT.color} flex items-center justify-center text-4xl ring-2 ring-indigo-300`}>
                {MAIN_PRODUCT.emoji}
              </div>
              <p className="text-xs text-center mt-1 text-neutral-500 dark:text-neutral-400 max-w-[96px]">{isUk ? "Цей товар" : "This item"}</p>
            </div>

            {selectedItems.map((item) => (
              <div key={item.id} className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-neutral-400 shrink-0" />
                <div>
                  <div className={`w-24 h-24 rounded-xl bg-linear-to-br ${item.color} flex items-center justify-center text-4xl`}>
                    {item.emoji}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Toggle items */}
          <div className="space-y-2">
            {RECOMMENDATIONS.map((item) => {
              const isSelected = selected.has(item.id);
              return (
                <label
                  key={item.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                    isSelected ? "border-indigo-300 bg-indigo-50/50" : "border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggle(item.id)}
                    className="rounded border-neutral-300 text-indigo-600 focus:ring-indigo-500"
                    aria-label={isUk ? item.nameUk : item.nameEn}
                  />
                  <div className={`w-10 h-10 rounded-md bg-linear-to-br ${item.color} flex items-center justify-center text-xl shrink-0`}>
                    {item.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-neutral-900 dark:text-white text-sm">{isUk ? item.nameUk : item.nameEn}</p>
                    {item.savings > 0 && (
                      <p className="text-xs text-emerald-600 font-semibold">
                        {isUk ? "Знижка" : "Save"} {fmt(item.savings)} {isUk ? "у бандлі" : "in bundle"}
                      </p>
                    )}
                  </div>
                  <span className="font-bold text-neutral-900 dark:text-white tabular-nums">{fmt(item.price)}</span>
                </label>
              );
            })}
          </div>

          {/* Total */}
          <div className="pt-4 border-t border-neutral-100 dark:border-neutral-700 space-y-1 text-sm">
            <div className="flex justify-between text-neutral-500">
              <span>{isUk ? "Сума товарів" : "Items subtotal"}</span>
              <span className="tabular-nums">{fmt(MAIN_PRODUCT.price + itemsTotal)}</span>
            </div>
            {savings > 0 && (
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>{isUk ? "Економія у бандлі" : "Bundle savings"}</span>
                <span className="tabular-nums">−{fmt(savings)}</span>
              </div>
            )}
            <div className="flex justify-between pt-2 mt-2 border-t border-neutral-100 dark:border-neutral-700 text-base">
              <span className="font-bold text-neutral-900">{isUk ? "Разом" : "Total"}</span>
              <span className="font-bold text-indigo-700 tabular-nums">{fmt(bundleTotal)}</span>
            </div>
            <button className="mt-3 w-full py-2.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors">
              {isUk ? `Купити вибране (${selectedItems.length + 1})` : `Buy selected (${selectedItems.length + 1})`}
            </button>
          </div>
        </div>
      )}

      {layout === "cross-sell" && (
        <div>
          <h3 className="font-bold text-neutral-900 dark:text-white flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-emerald-500" />
            {isUk ? "Можливо вас зацікавить" : "You might also like"}
          </h3>
          <div className="overflow-x-auto pb-3">
            <div className="flex gap-3">
              {RECOMMENDATIONS.map((item) => {
                const isAdded = selected.has(item.id);
                return (
                  <div key={item.id} className="flex-shrink-0 w-48 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white overflow-hidden">
                    <div className={`aspect-square bg-linear-to-br ${item.color} flex items-center justify-center text-5xl`}>
                      {item.emoji}
                    </div>
                    <div className="p-3 space-y-2">
                      <h4 className="font-semibold text-neutral-900 dark:text-white text-sm line-clamp-1">{isUk ? item.nameUk : item.nameEn}</h4>
                      <p className="font-bold text-indigo-700">{fmt(item.price)}</p>
                      <button
                        onClick={() => toggle(item.id)}
                        className={`w-full py-1.5 rounded-md text-xs font-semibold transition-colors ${
                          isAdded
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-neutral-900 text-white hover:bg-neutral-700"
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3 h-3 inline mr-1" />
                            {isUk ? "Додано" : "Added"}
                          </>
                        ) : (
                          isUk ? "+ В кошик" : "+ Add to cart"
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <p className="text-sm text-neutral-500">
        {isUk
          ? "Upsell/Cross-sell збільшують AOV на 15-30%. Production: AI рекомендації на основі історії покупок або collaborative filtering."
          : "Upsell/Cross-sell increases AOV by 15-30%. Production: AI recommendations based on purchase history or collaborative filtering."}
      </p>
    </div>
  );
}
