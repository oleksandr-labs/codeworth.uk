"use client";

import { useState } from "react";
import { Building2, Package, FileText, CreditCard, Check, TrendingDown } from "lucide-react";

interface Props {
  variant?: string;
  isUk: boolean;
}

const PRODUCTS = [
  {
    id: "p1",
    nameEn: "Premium Coffee 1kg",
    nameUk: "Преміум кава 1кг",
    emoji: "☕",
    color: "from-amber-700 to-amber-900",
    retail: 1290,
    tiers: [
      { min: 10, price: 1090, discount: 15 },
      { min: 50, price: 890, discount: 31 },
      { min: 100, price: 750, discount: 42 },
    ],
  },
  {
    id: "p2",
    nameEn: "Office Mug Branded",
    nameUk: "Корпоративна чашка",
    emoji: "🧉",
    color: "from-indigo-600 to-violet-700",
    retail: 290,
    tiers: [
      { min: 50, price: 220, discount: 24 },
      { min: 100, price: 180, discount: 38 },
      { min: 500, price: 140, discount: 52 },
    ],
  },
];

type PaymentMethod = "card" | "invoice-net30" | "invoice-net60";

export function EcomB2bDemo({ isUk }: Props) {
  const [qty, setQty] = useState<Record<string, number>>({ p1: 50, p2: 100 });
  const [payment, setPayment] = useState<PaymentMethod>("invoice-net30");
  const [companyName, setCompanyName] = useState("");
  const [vat, setVat] = useState("");

  const fmt = (uah: number) => isUk ? `${uah.toLocaleString("uk-UA")} ₴` : `£${Math.round(uah / 40)}`;

  const getTierPrice = (p: typeof PRODUCTS[0], q: number) => {
    const tier = [...p.tiers].reverse().find((t) => q >= t.min);
    return tier ? tier.price : p.retail;
  };

  const getSavings = (p: typeof PRODUCTS[0], q: number) => {
    const tierPrice = getTierPrice(p, q);
    return (p.retail - tierPrice) * q;
  };

  const subtotal = PRODUCTS.reduce((s, p) => s + getTierPrice(p, qty[p.id] ?? 0) * (qty[p.id] ?? 0), 0);
  const totalSavings = PRODUCTS.reduce((s, p) => s + getSavings(p, qty[p.id] ?? 0), 0);
  const vat20 = Math.round(subtotal * 0.2);
  const total = subtotal + vat20;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-linear-to-r from-indigo-700 to-violet-800 text-white p-5 flex items-center gap-3">
        <Building2 className="w-8 h-8 shrink-0" />
        <div className="flex-1">
          <h3 className="font-bold">{isUk ? "B2B / Оптовий замовлення" : "B2B / Wholesale order"}</h3>
          <p className="text-sm text-white/80">
            {isUk ? "Багаторівневі знижки, рахунок-фактура з відстрочкою, ПДВ" : "Tiered pricing, invoice with deferred payment, VAT"}
          </p>
        </div>
      </div>

      {/* Products with tier pricing */}
      <div className="space-y-4">
        {PRODUCTS.map((p) => {
          const q = qty[p.id] ?? 0;
          const currentPrice = getTierPrice(p, q);
          const currentTier = [...p.tiers].reverse().find((t) => q >= t.min);
          const nextTier = p.tiers.find((t) => q < t.min);
          return (
            <div key={p.id} className="rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white overflow-hidden">
              <div className="flex items-center gap-4 p-4">
                <div className={`w-16 h-16 rounded-xl bg-linear-to-br ${p.color} flex items-center justify-center text-3xl shrink-0`}>
                  {p.emoji}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-neutral-900">{isUk ? p.nameUk : p.nameEn}</h4>
                  <p className="text-xs text-neutral-500">
                    {isUk ? "Роздрібна:" : "Retail:"} <span className="line-through">{fmt(p.retail)}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQty((s) => ({ ...s, [p.id]: Math.max(1, (s[p.id] ?? 0) - 10) }))}
                    className="w-8 h-8 rounded bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-sm font-semibold"
                    aria-label="−10"
                  >
                    −10
                  </button>
                  <input
                    type="number"
                    value={q}
                    onChange={(e) => setQty((s) => ({ ...s, [p.id]: Math.max(0, parseInt(e.target.value || "0", 10)) }))}
                    className="w-16 px-2 py-1 border border-neutral-200 dark:border-neutral-700 rounded text-center text-sm font-semibold tabular-nums focus:outline-none focus:ring-2 focus:ring-indigo-100"
                    min={0}
                    aria-label={isUk ? "Кількість" : "Quantity"}
                  />
                  <button
                    onClick={() => setQty((s) => ({ ...s, [p.id]: (s[p.id] ?? 0) + 10 }))}
                    className="w-8 h-8 rounded bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-sm font-semibold"
                    aria-label="+10"
                  >
                    +10
                  </button>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-bold text-neutral-900 dark:text-white tabular-nums">{fmt(currentPrice)}/{isUk ? "шт" : "ea"}</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 tabular-nums">{isUk ? "Разом:" : "Total:"} {fmt(currentPrice * q)}</p>
                </div>
              </div>

              {/* Tier ladder */}
              <div className="bg-neutral-50 dark:bg-neutral-900 px-4 py-2 border-t border-neutral-100 dark:border-neutral-700 flex items-center gap-2 flex-wrap text-xs">
                <span className="text-neutral-500">{isUk ? "Знижки:" : "Tier discounts:"}</span>
                {p.tiers.map((t, i) => (
                  <span
                    key={i}
                    className={`px-2 py-0.5 rounded-md font-semibold ${
                      currentTier === t ? "bg-emerald-500 text-white" : "bg-white border border-neutral-200 dark:border-neutral-700 text-neutral-600"
                    }`}
                  >
                    {t.min}+: −{t.discount}%
                  </span>
                ))}
                {nextTier && (
                  <span className="ml-auto text-xs text-amber-600 font-semibold">
                    +{nextTier.min - q} {isUk ? `шт. для −${nextTier.discount}%` : `pcs to −${nextTier.discount}%`}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Company info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder={isUk ? "Назва компанії" : "Company name"}
          className="px-3 py-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 text-sm"
          aria-label={isUk ? "Компанія" : "Company"}
        />
        <input
          type="text"
          value={vat}
          onChange={(e) => setVat(e.target.value)}
          placeholder={isUk ? "ЄДРПОУ / VAT" : "VAT number"}
          className="px-3 py-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 text-sm"
          aria-label={isUk ? "ЄДРПОУ" : "VAT"}
        />
      </div>

      {/* Payment method */}
      <div className="space-y-2">
        <p className="text-sm font-semibold text-neutral-900">{isUk ? "Спосіб оплати" : "Payment method"}</p>
        {([
          { id: "card", icon: CreditCard, labelEn: "Card (now)", labelUk: "Картка (одразу)" },
          { id: "invoice-net30", icon: FileText, labelEn: "Invoice — Net 30 days", labelUk: "Рахунок — відстрочка 30 днів" },
          { id: "invoice-net60", icon: FileText, labelEn: "Invoice — Net 60 days (Premium B2B)", labelUk: "Рахунок — Net 60 (Premium B2B)" },
        ] as const).map((m) => {
          const Icon = m.icon;
          return (
            <label
              key={m.id}
              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                payment === m.id ? "border-indigo-500 bg-indigo-50/50" : "border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50"
              }`}
            >
              <input
                type="radio"
                name="payment"
                value={m.id}
                checked={payment === m.id}
                onChange={(e) => setPayment(e.target.value as PaymentMethod)}
                className="border-neutral-300 text-indigo-600 focus:ring-indigo-500"
              />
              <Icon className="w-4 h-4 text-indigo-500" />
              <span className="text-sm text-neutral-900">{isUk ? m.labelUk : m.labelEn}</span>
            </label>
          );
        })}
      </div>

      {/* Summary */}
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white p-5 space-y-2 text-sm">
        <div className="flex justify-between text-neutral-600">
          <span>{isUk ? "Сума товарів" : "Subtotal"}</span>
          <span className="tabular-nums">{fmt(subtotal)}</span>
        </div>
        <div className="flex justify-between text-emerald-600 font-semibold">
          <span className="flex items-center gap-1.5">
            <TrendingDown className="w-3.5 h-3.5" />
            {isUk ? "Економія від оптової знижки" : "Wholesale savings"}
          </span>
          <span className="tabular-nums">−{fmt(totalSavings)}</span>
        </div>
        <div className="flex justify-between text-neutral-600">
          <span>{isUk ? "ПДВ 20%" : "VAT 20%"}</span>
          <span className="tabular-nums">{fmt(vat20)}</span>
        </div>
        <div className="flex justify-between pt-3 mt-2 border-t-2 border-neutral-900 text-base">
          <span className="font-bold">{isUk ? "Разом до сплати" : "Total due"}</span>
          <span className="font-bold text-indigo-700 tabular-nums">{fmt(total)}</span>
        </div>
        <button
          disabled={!companyName.trim() || !vat.trim()}
          className="w-full mt-3 flex items-center justify-center gap-2 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed transition-colors"
        >
          <Check className="w-4 h-4" />
          {payment === "card" ? (isUk ? "Оплатити карткою" : "Pay by card") : (isUk ? "Виставити рахунок" : "Issue invoice")}
        </button>
      </div>

      <p className="text-sm text-neutral-500">
        {isUk
          ? "B2B функції: tier pricing, бізнес-валідація (ЄДРПОУ/VAT), рахунки з відстрочкою, окрема admin-роль 'B2B account manager'."
          : "B2B features: tier pricing, business validation (VAT), deferred-payment invoices, dedicated 'B2B account manager' role."}
      </p>
    </div>
  );
}
