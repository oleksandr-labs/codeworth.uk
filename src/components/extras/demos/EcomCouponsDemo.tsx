"use client";

import { useState } from "react";
import { Tag, Check, X, AlertCircle, Sparkles } from "lucide-react";

interface Props {
  variant?: string;
  isUk: boolean;
}

interface Coupon {
  code: string;
  discount: number; // percent or fixed
  type: "percent" | "fixed";
  minOrder?: number;
  expires?: string;
  used?: boolean;
}

const VALID_COUPONS: Record<string, Coupon> = {
  "WELCOME10": { code: "WELCOME10", discount: 10, type: "percent", expires: "2026-06-30" },
  "SAVE500": { code: "SAVE500", discount: 500, type: "fixed", minOrder: 2000, expires: "2026-05-31" },
  "BLACKFRIDAY": { code: "BLACKFRIDAY", discount: 30, type: "percent", expires: "2025-12-01", used: true },
  "VIP25": { code: "VIP25", discount: 25, type: "percent", expires: "2026-12-31" },
};

const SUBTOTAL = 3450;

export function EcomCouponsDemo({ isUk }: Props) {
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState<Coupon | null>(null);
  const [error, setError] = useState<string | null>(null);

  const apply = (e?: React.FormEvent) => {
    e?.preventDefault();
    setError(null);
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) return;
    const coupon = VALID_COUPONS[trimmed];
    if (!coupon) {
      setError(isUk ? "Невірний промокод" : "Invalid promo code");
      return;
    }
    if (coupon.used) {
      setError(isUk ? "Цей код вже використано" : "This code has already been used");
      return;
    }
    if (coupon.expires && new Date(coupon.expires) < new Date()) {
      setError(isUk ? "Термін дії коду закінчився" : "Promo code expired");
      return;
    }
    if (coupon.minOrder && SUBTOTAL < coupon.minOrder) {
      setError(isUk ? `Мінімальне замовлення: ${coupon.minOrder} ₴` : `Minimum order: ${coupon.minOrder} ₴`);
      return;
    }
    setApplied(coupon);
    setCode("");
  };

  const remove = () => {
    setApplied(null);
    setError(null);
  };

  const discount = applied
    ? applied.type === "percent"
      ? Math.round((SUBTOTAL * applied.discount) / 100)
      : applied.discount
    : 0;
  const total = SUBTOTAL - discount;
  const fmt = (n: number) => isUk ? `${n.toLocaleString("uk-UA")} ₴` : `£${Math.round(n / 40)}`;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-neutral-200 bg-white p-5 space-y-4">
        <h3 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
          <Tag className="w-5 h-5 text-indigo-600" />
          {isUk ? "Промокод" : "Promo code"}
        </h3>

        {!applied ? (
          <form onSubmit={apply} className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={code}
                onChange={(e) => { setCode(e.target.value); setError(null); }}
                placeholder={isUk ? "Введіть промокод" : "Enter promo code"}
                className={`flex-1 px-4 py-2.5 rounded-lg border ${error ? "border-rose-300 bg-rose-50/50" : "border-neutral-200 bg-white"} focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 text-sm uppercase tracking-wider`}
                aria-label={isUk ? "Промокод" : "Promo code"}
              />
              <button
                type="submit"
                disabled={!code.trim()}
                className="px-5 py-2.5 rounded-lg bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed transition-colors"
              >
                {isUk ? "Застосувати" : "Apply"}
              </button>
            </div>
            {error && (
              <div role="alert" className="flex items-center gap-2 text-sm text-rose-600">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}
            <div className="text-xs text-neutral-500">
              {isUk ? "Спробуйте:" : "Try:"}{" "}
              {Object.keys(VALID_COUPONS).map((c, i) => (
                <button
                  key={c}
                  onClick={() => setCode(c)}
                  type="button"
                  className="font-mono text-indigo-600 hover:underline mr-2"
                >
                  {c}{i < Object.keys(VALID_COUPONS).length - 1 ? "," : ""}
                </button>
              ))}
            </div>
          </form>
        ) : (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
              <Check className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-emerald-900">
                {applied.code} <span className="ml-1 text-sm">— {applied.type === "percent" ? `−${applied.discount}%` : `−${fmt(applied.discount)}`}</span>
              </p>
              <p className="text-xs text-emerald-700">
                {isUk ? "Знижку застосовано" : "Discount applied"}
                {applied.expires && ` · ${isUk ? "Діє до" : "Valid until"} ${applied.expires}`}
              </p>
            </div>
            <button
              onClick={remove}
              className="p-2 text-emerald-700 hover:text-rose-600 transition-colors"
              aria-label={isUk ? "Видалити" : "Remove"}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Order summary */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-5 space-y-2">
        <h3 className="font-bold text-neutral-900 mb-3">{isUk ? "Підсумок замовлення" : "Order summary"}</h3>
        <div className="flex justify-between text-sm">
          <span className="text-neutral-500">{isUk ? "Сума" : "Subtotal"}</span>
          <span className="text-neutral-900 tabular-nums">{fmt(SUBTOTAL)}</span>
        </div>
        {applied && (
          <div className="flex justify-between text-sm text-emerald-700">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              {isUk ? "Знижка" : "Discount"} ({applied.code})
            </span>
            <span className="tabular-nums">−{fmt(discount)}</span>
          </div>
        )}
        <div className="flex justify-between pt-3 border-t border-neutral-100 text-base">
          <span className="font-bold text-neutral-900">{isUk ? "Разом" : "Total"}</span>
          <span className="font-bold text-indigo-700 tabular-nums">{fmt(total)}</span>
        </div>
      </div>

      <p className="text-sm text-neutral-500">
        {isUk
          ? "Підтримка % та фіксованих знижок, мін. суми замовлення, експірації, лімітів використання. Адмін генерує коди в дашборді."
          : "Supports % and fixed discounts, minimum order, expiration, usage limits. Admin generates codes in dashboard."}
      </p>
    </div>
  );
}
