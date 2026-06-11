"use client";

import { useState } from "react";
import Link from "next/link";
import { Trash2, Tag } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { getNiche } from "@/lib/data/niches";
import { EmptyState } from "@/components/ui/EmptyState";
import { Skeleton } from "@/components/ui/Skeleton";
import { useLocale } from "@/components/layout/LocaleProvider";
import { EmojiIcon } from "@/components/ui/EmojiIcon";

const PACKAGE_MULTIPLIERS: Record<string, number> = {
  "Базовий": 1,
  "Розширений": 1.7,
  "Преміум": 2.5,
};

const PACKAGE_DISPLAY: Record<string, { uk: string; en: string }> = {
  "Базовий":    { uk: "Базовий",    en: "Basic" },
  "Розширений": { uk: "Розширений", en: "Extended" },
  "Преміум":    { uk: "Преміум",    en: "Premium" },
};

export default function CartClient() {
  const lang = useLocale();
  const isUk = lang === "uk";
  const { items, removeItem, updatePackage, subtotal, isHydrated } = useCart();
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const applyPromo = () => {
    if (promo.toLowerCase() === "codeworth10") {
      setPromoApplied(true);
    }
  };

  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal - discount;

  const handlePackageChange = (id: string, slug: string, pkg: string) => {
    const niche = getNiche(slug);
    if (!niche) return;
    const price = Math.round(niche.priceFrom * (PACKAGE_MULTIPLIERS[pkg] ?? 1));
    updatePackage(id, pkg, price);
  };

  if (!isHydrated) {
    return (
      <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-700 dark:border-neutral-800 p-6 space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="flex gap-4 items-start p-4 rounded-xl border border-gray-100 dark:border-neutral-700 dark:border-neutral-800">
            <Skeleton className="w-14 h-14 rounded-xl shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-1/2 rounded" />
              <Skeleton className="h-3 w-1/3 rounded" />
              <Skeleton className="h-8 w-32 rounded-lg mt-1" />
            </div>
            <Skeleton className="h-5 w-16 rounded" />
          </div>
        ))}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-neutral-700 dark:border-neutral-800">
          <Skeleton className="h-4 w-20 rounded" />
          <Skeleton className="h-6 w-24 rounded" />
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-700 dark:border-neutral-800 p-12 text-center">
        <EmptyState variant="cart" size={140} className="mb-6" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{isUk ? "Ваш кошик порожній" : "Your cart is empty"}</h2>
        <p className="text-gray-500 dark:text-neutral-400 mb-6">{isUk ? "Додайте готові рішення з нашого каталогу" : "Add ready-made solutions from our catalog"}</p>
        <Link
          href={`/${lang}/marketplace/catalog`}
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium text-sm hover:bg-indigo-700 transition-colors"
        >
          {isUk ? "Перейти до каталогу" : "Browse Catalog"}
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="bg-white rounded-2xl border border-gray-100 dark:border-neutral-700 p-5 flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
            <EmojiIcon emoji={item.emoji} className="w-8 h-8 text-white/80" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-gray-900">{item.title}</div>
            <div className="text-sm text-gray-500 dark:text-neutral-400 mt-0.5">{isUk ? "Пакет" : "Package"}: {PACKAGE_DISPLAY[item.package]?.[isUk ? "uk" : "en"] ?? item.package}</div>
            <div className="flex items-center gap-3 mt-3">
              <select
                value={item.package}
                onChange={(e) => handlePackageChange(item.id, item.slug, e.target.value)}
                className="text-sm border border-gray-200 dark:border-neutral-700 rounded-lg px-2.5 py-1.5 text-gray-700 dark:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              >
                <option value="Базовий">{isUk ? "Базовий" : "Basic"}</option>
                <option value="Розширений">{isUk ? "Розширений" : "Extended"}</option>
                <option value="Преміум">{isUk ? "Преміум" : "Premium"}</option>
              </select>
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="font-bold text-gray-900">{item.price.toLocaleString("uk-UA")} ₴</div>
            <button
              onClick={() => removeItem(item.id)}
              className="mt-2 p-1.5 text-gray-400 dark:text-neutral-500 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}

      {/* Promo code */}
      <div className="bg-white rounded-2xl border border-gray-100 dark:border-neutral-700 p-5">
        <div className="flex items-center gap-2 mb-3 text-sm font-medium text-gray-700">
          <Tag className="w-4 h-4 text-indigo-500" />
          {isUk ? "Промокод" : "Promo Code"}
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            value={promo}
            onChange={(e) => setPromo(e.target.value)}
            placeholder={isUk ? "Введіть промокод" : "Enter promo code"}
            className="flex-1 px-4 py-2.5 text-sm border border-gray-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          <button
            onClick={applyPromo}
            className="px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors"
          >
            {isUk ? "Застосувати" : "Apply"}
          </button>
        </div>
        {promoApplied && (
          <p className="text-green-600 text-sm mt-2 font-medium">
            {isUk ? "✓ Промокод застосовано — знижка 10%" : "✓ Promo code applied — 10% discount"}
          </p>
        )}
        <p className="text-xs text-gray-400 dark:text-neutral-500 mt-2">{isUk ? "Спробуйте: CODEWORTH10" : "Try: CODEWORTH10"}</p>
      </div>

      {/* Totals (mobile visible) */}
      <div className="bg-indigo-50 rounded-2xl border border-indigo-100 p-5 space-y-2 text-sm lg:hidden">
        <div className="flex justify-between text-gray-700">
          <span>{isUk ? "Підсумок" : "Subtotal"}</span>
          <span>{subtotal.toLocaleString(isUk ? "uk-UA" : "en-US")} ₴</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>{isUk ? "Знижка 10%" : "Discount 10%"}</span>
            <span>−{discount.toLocaleString(isUk ? "uk-UA" : "en-US")} ₴</span>
          </div>
        )}
        <div className="flex justify-between font-bold text-gray-900 text-base pt-2 border-t border-indigo-100">
          <span>{isUk ? "Разом" : "Total"}</span>
          <span>{total.toLocaleString(isUk ? "uk-UA" : "en-US")} ₴</span>
        </div>
      </div>
    </div>
  );
}
