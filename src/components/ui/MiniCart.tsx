"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, X, ArrowRight, Package } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useLocale } from "@/components/layout/LocaleProvider";
import { cn } from "@/lib/utils";

const PACKAGE_DISPLAY: Record<string, { uk: string; en: string }> = {
  "Базовий":    { uk: "Базовий",    en: "Basic" },
  "Розширений": { uk: "Розширений", en: "Extended" },
  "Преміум":    { uk: "Преміум",    en: "Premium" },
};

export function MiniCart({ className }: { className?: string }) {
  const { items, count, subtotal, removeItem, isHydrated } = useCart();
  const lang = useLocale();
  const isUk = lang === "uk";
  const [open, setOpen] = useState(false);

  if (!isHydrated) {
    return (
      <div className={cn("relative", className)}>
        <div className="p-2 rounded-lg text-neutral-500 dark:text-neutral-400">
          <ShoppingCart className="w-5 h-5" />
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      {/* Trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={isUk ? `Кошик — ${count} ${count === 1 ? "товар" : "товарів"}` : `Cart — ${count} ${count === 1 ? "item" : "items"}`}
        className="relative p-2 rounded-lg text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-800 transition-colors"
      >
        <ShoppingCart className="w-5 h-5" />
        {count > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center leading-none">
            {count > 9 ? "9+" : count}
          </span>
        )}
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-full mt-2 z-50 w-80 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-700 dark:border-neutral-800 rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-100 dark:border-neutral-700 dark:border-neutral-800">
            <span className="text-sm font-semibold text-neutral-900 dark:text-white">
              {isUk ? "Кошик" : "Cart"}
              {count > 0 && (
                <span className="ml-1.5 text-xs font-normal text-neutral-400">({count})</span>
              )}
            </span>
            <button
              onClick={() => setOpen(false)}
              className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 dark:text-neutral-300 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-800 transition-colors"
              aria-label={isUk ? "Закрити кошик" : "Close cart"}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Items */}
          {items.length === 0 ? (
            <div className="py-10 text-center">
              <Package className="w-10 h-10 text-neutral-200 dark:text-neutral-700 dark:text-neutral-300 mx-auto mb-3" />
              <p className="text-sm text-neutral-400 dark:text-neutral-500">{isUk ? "Кошик порожній" : "Your cart is empty"}</p>
              <Link
                href={`/${lang}/marketplace/catalog`}
                onClick={() => setOpen(false)}
                className="inline-block mt-3 text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                {isUk ? "Перейти до каталогу" : "Browse catalog"}
              </Link>
            </div>
          ) : (
            <>
              <ul className="max-h-60 overflow-y-auto divide-y divide-neutral-100 dark:divide-neutral-800">
                {items.map((item) => (
                  <li key={item.id} className="flex items-start gap-3 px-4 py-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-xl shrink-0">
                      {item.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-900 dark:text-white line-clamp-1">
                        {item.title}
                      </p>
                      <p className="text-xs text-neutral-400 dark:text-neutral-500">{PACKAGE_DISPLAY[item.package]?.[isUk ? "uk" : "en"] ?? item.package}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                        {item.price.toLocaleString("uk-UA")} ₴
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="mt-1 text-xs text-neutral-300 dark:text-neutral-600 dark:text-neutral-300 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                        aria-label={isUk ? `Видалити ${item.title}` : `Remove ${item.title}`}
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Footer */}
              <div className="p-4 border-t border-neutral-100 dark:border-neutral-700 dark:border-neutral-800 space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-neutral-500 dark:text-neutral-400">{isUk ? "Разом:" : "Total:"}</span>
                  <span className="font-bold text-neutral-900 dark:text-white">
                    {subtotal.toLocaleString("uk-UA")} ₴
                  </span>
                </div>
                <Link
                  href={`/${lang}/marketplace/checkout`}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors"
                >
                  {isUk ? "Оформити замовлення" : "Checkout"}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href={`/${lang}/marketplace/cart`}
                  onClick={() => setOpen(false)}
                  className="block text-center text-xs text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:text-neutral-300 dark:hover:text-neutral-300 transition-colors"
                >
                  {isUk ? "Переглянути кошик" : "View cart"}
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
