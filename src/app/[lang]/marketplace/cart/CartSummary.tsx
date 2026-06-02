"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Shield, RefreshCw, Headphones } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useLocale } from "@/components/layout/LocaleProvider";

export function CartSummary() {
  const lang = useLocale();
  const isUk = lang === "uk";
  const { subtotal, isHydrated } = useCart();
  const [promoApplied] = useState(false); // synced via shared state in future

  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal - discount;
  const locale = isUk ? "uk-UA" : "en-US";

  const trustBadges = isUk
    ? [
        { icon: Shield, text: "Безпечна оплата SSL" },
        { icon: RefreshCw, text: "Повернення коштів 14 днів" },
        { icon: Headphones, text: "Підтримка у Telegram" },
      ]
    : [
        { icon: Shield, text: "Secure SSL payment" },
        { icon: RefreshCw, text: "14-day money-back guarantee" },
        { icon: Headphones, text: "Support via Telegram" },
      ];

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl border border-gray-100 dark:border-neutral-700 p-6">
        <h2 className="font-bold text-gray-900 dark:text-white mb-5">{isUk ? "Підсумок замовлення" : "Order Summary"}</h2>
        <div className="space-y-3 text-sm text-gray-600 dark:text-neutral-300 mb-5">
          <div className="flex justify-between">
            <span>{isUk ? "Підсумок" : "Subtotal"}</span>
            <span className="font-semibold text-gray-900">
              {isHydrated ? `${subtotal.toLocaleString(locale)} ₴` : "—"}
            </span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>{isUk ? "Знижка 10%" : "Discount 10%"}</span>
              <span>−{discount.toLocaleString(locale)} ₴</span>
            </div>
          )}
          <div className="border-t border-gray-100 dark:border-neutral-700 pt-3 flex justify-between font-bold text-gray-900 dark:text-white text-base">
            <span>{isUk ? "Разом" : "Total"}</span>
            <span>{isHydrated ? `${total.toLocaleString(locale)} ₴` : "—"}</span>
          </div>
        </div>
        <Link
          href={`/${lang}/marketplace/checkout`}
          className="flex items-center justify-center gap-2 w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
        >
          {isUk ? "Оформити замовлення" : "Proceed to Checkout"} <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href={`/${lang}/marketplace/catalog`}
          className="flex items-center justify-center w-full py-2.5 mt-3 text-sm text-gray-500 dark:text-neutral-400 hover:text-gray-700 dark:text-neutral-300 transition-colors"
        >
          {isUk ? "← Продовжити покупки" : "← Continue Shopping"}
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 dark:border-neutral-700 p-5 space-y-3">
        {trustBadges.map((b) => (
          <div key={b.text} className="flex items-center gap-3 text-sm text-gray-600">
            <b.icon className="w-4 h-4 text-indigo-500 shrink-0" />
            {b.text}
          </div>
        ))}
      </div>
    </div>
  );
}
