"use client";

import { useState } from "react";
import { Mail, Clock, Percent, ShoppingCart, Send, MousePointerClick, TrendingUp } from "lucide-react";

interface Props {
  variant?: string;
  isUk: boolean;
}

const SEQUENCE = [
  { id: 1, hours: 1, subject_en: "You left items in your cart 🛒", subject_uk: "Ви залишили товари в кошику 🛒", body_en: "Looks like you forgot something! Your cart is still saved.", body_uk: "Здається, ви щось забули! Кошик ще збережено.", discount: 0, openRate: 42, clickRate: 18, conversionRate: 6.2 },
  { id: 2, hours: 24, subject_en: "Still thinking? Here's 10% off", subject_uk: "Ще думаєте? Знижка 10%", body_en: "Use code SAVE10 at checkout to complete your purchase.", body_uk: "Промокод SAVE10 на чекауті для завершення покупки.", discount: 10, openRate: 38, clickRate: 22, conversionRate: 12.4 },
  { id: 3, hours: 72, subject_en: "Last chance — 15% off ends soon", subject_uk: "Останній шанс — 15% знижки", body_en: "Your reserved cart expires in 24 hours. Use SAVE15.", body_uk: "Зарезервований кошик діє ще 24 години. Код: SAVE15.", discount: 15, openRate: 28, clickRate: 15, conversionRate: 9.8 },
];

const CART_ITEMS = [
  { emoji: "👟", nameEn: "Sneakers Urban", nameUk: "Кросівки Urban", price: 2890, color: "from-indigo-600 to-violet-700" },
  { emoji: "👕", nameEn: "Linen T-Shirt", nameUk: "Лляна футболка", price: 890, color: "from-amber-400 to-orange-500" },
  { emoji: "🎒", nameEn: "Backpack 25L", nameUk: "Рюкзак 25L", price: 1490, color: "from-emerald-600 to-teal-700" },
];

export function EcomAbandonedCartDemo({ isUk }: Props) {
  const [emailIdx, setEmailIdx] = useState(0);
  const email = SEQUENCE[emailIdx];
  const fmt = (uah: number) => isUk ? `${uah.toLocaleString("uk-UA")} ₴` : `£${Math.round(uah / 40)}`;
  const cartTotal = CART_ITEMS.reduce((s, i) => s + i.price, 0);
  const discountAmount = (cartTotal * email.discount) / 100;
  const finalTotal = cartTotal - discountAmount;

  return (
    <div className="space-y-6">
      {/* Sequence selector */}
      <div className="flex flex-wrap gap-2">
        {SEQUENCE.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setEmailIdx(i)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              i === emailIdx
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-neutral-100 text-neutral-600 hover:bg-indigo-50"
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            {isUk ? `+${s.hours} год` : `+${s.hours}h`}
            {s.discount > 0 && (
              <span className="ml-1 text-xs font-bold opacity-90">−{s.discount}%</span>
            )}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Email preview */}
        <div className="rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-sm">
          {/* Email header */}
          <div className="border-b border-neutral-100 p-4 bg-neutral-50">
            <div className="flex items-center gap-2 mb-2 text-xs text-neutral-500">
              <Mail className="w-3 h-3" />
              <span>noreply@codeworth.uk</span>
              <span className="ml-auto">{isUk ? "Сьогодні" : "Today"}, 10:32</span>
            </div>
            <h4 className="font-bold text-neutral-900">{isUk ? email.subject_uk : email.subject_en}</h4>
          </div>

          {/* Email body */}
          <div className="p-5 space-y-4">
            <p className="text-sm text-neutral-700 leading-relaxed">{isUk ? email.body_uk : email.body_en}</p>

            {email.discount > 0 && (
              <div className="rounded-xl bg-linear-to-r from-amber-400 to-orange-500 text-white p-4 text-center">
                <Percent className="w-6 h-6 mx-auto mb-1" />
                <p className="text-2xl font-extrabold">−{email.discount}%</p>
                <p className="text-xs uppercase tracking-widest mt-0.5">
                  {isUk ? "Промокод" : "Promo code"}: <span className="font-mono font-bold">SAVE{email.discount}</span>
                </p>
              </div>
            )}

            {/* Cart preview */}
            <div className="rounded-lg border border-neutral-200 overflow-hidden">
              <div className="px-3 py-2 bg-neutral-50 text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                {isUk ? "Ваш кошик" : "Your cart"} ({CART_ITEMS.length})
              </div>
              <div className="divide-y divide-neutral-100">
                {CART_ITEMS.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3">
                    <div className={`w-10 h-10 rounded bg-linear-to-br ${item.color} flex items-center justify-center text-xl shrink-0`}>
                      {item.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-neutral-900 text-sm truncate">{isUk ? item.nameUk : item.nameEn}</p>
                    </div>
                    <span className="text-sm font-semibold tabular-nums">{fmt(item.price)}</span>
                  </div>
                ))}
                <div className="p-3 bg-neutral-50">
                  {email.discount > 0 && (
                    <>
                      <div className="flex justify-between text-xs text-neutral-500 mb-1">
                        <span>{isUk ? "Сума" : "Subtotal"}</span>
                        <span className="tabular-nums">{fmt(cartTotal)}</span>
                      </div>
                      <div className="flex justify-between text-xs text-emerald-600 font-semibold mb-1">
                        <span>{isUk ? "Знижка" : "Discount"} (SAVE{email.discount})</span>
                        <span className="tabular-nums">−{fmt(discountAmount)}</span>
                      </div>
                    </>
                  )}
                  <div className="flex justify-between text-sm font-bold pt-1 border-t border-neutral-200">
                    <span>{isUk ? "Разом" : "Total"}</span>
                    <span className="text-indigo-700 tabular-nums">{fmt(finalTotal)}</span>
                  </div>
                </div>
              </div>
            </div>

            <button className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors">
              <ShoppingCart className="w-4 h-4" />
              {isUk ? "Завершити покупку" : "Complete purchase"}
            </button>

            <p className="text-xs text-neutral-400 text-center">
              {isUk ? "Кошик зберігається 7 днів" : "Cart saved for 7 days"}
            </p>
          </div>
        </div>

        {/* Metrics */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-neutral-200 bg-white p-5">
            <h4 className="font-bold text-neutral-900 mb-3 flex items-center gap-2">
              <Send className="w-4 h-4 text-indigo-500" />
              {isUk ? "Sequence stats" : "Sequence stats"}
            </h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-neutral-600 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" />
                    {isUk ? "Open rate" : "Open rate"}
                  </span>
                  <span className="font-bold tabular-nums">{email.openRate}%</span>
                </div>
                <div className="h-2 rounded-full bg-neutral-100 overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${email.openRate}%` }} role="progressbar" aria-valuenow={email.openRate} aria-valuemin={0} aria-valuemax={100} aria-label="Open rate" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-neutral-600 flex items-center gap-1.5">
                    <MousePointerClick className="w-3.5 h-3.5" />
                    {isUk ? "Click rate" : "Click rate"}
                  </span>
                  <span className="font-bold tabular-nums">{email.clickRate}%</span>
                </div>
                <div className="h-2 rounded-full bg-neutral-100 overflow-hidden">
                  <div className="h-full bg-violet-500 rounded-full" style={{ width: `${email.clickRate}%` }} role="progressbar" aria-valuenow={email.clickRate} aria-valuemin={0} aria-valuemax={100} aria-label="Click rate" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-neutral-600 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5" />
                    {isUk ? "Conversion" : "Conversion"}
                  </span>
                  <span className="font-bold tabular-nums text-emerald-600">{email.conversionRate}%</span>
                </div>
                <div className="h-2 rounded-full bg-neutral-100 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${email.conversionRate * 5}%` }} role="progressbar" aria-valuenow={email.conversionRate} aria-valuemin={0} aria-valuemax={20} aria-label="Conversion rate" />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-900">
            <p className="font-bold mb-1">{isUk ? "💰 Очікуваний ROI" : "💰 Expected ROI"}</p>
            <p>
              {isUk
                ? "Sequence з 3 листів повертає 18-25% покинутих кошиків. ARPU росте на 12-18%."
                : "3-email sequence recovers 18-25% of abandoned carts. ARPU grows 12-18%."}
            </p>
          </div>
        </div>
      </div>

      <p className="text-sm text-neutral-500">
        {isUk
          ? "Тригерна послідовність на основі cartId + email. Resend / Mailchimp / Brevo для надсилання. Динамічні промокоди."
          : "Trigger sequence based on cartId + email. Resend / Mailchimp / Brevo for sending. Dynamic promo codes."}
      </p>
    </div>
  );
}
