"use client";

import { useState } from "react";
import { Award, Sparkles, ShoppingBag, Gift, TrendingUp } from "lucide-react";

interface Props {
  variant?: string;
  isUk: boolean;
}

const TIERS = [
  { id: "bronze", nameEn: "Bronze", nameUk: "Бронза", min: 0, multiplier: 1, color: "from-amber-700 to-amber-800", perksEn: ["1pt per £1", "Birthday bonus"], perksUk: ["1 бал за 1 ₴", "Бонус на ДН"] },
  { id: "silver", nameEn: "Silver", nameUk: "Срібло", min: 500, multiplier: 1.25, color: "from-slate-400 to-slate-500", perksEn: ["1.25× points", "Free shipping", "Early access"], perksUk: ["1.25× балів", "Безкоштовна доставка", "Ранній доступ"] },
  { id: "gold", nameEn: "Gold", nameUk: "Золото", min: 2000, multiplier: 1.5, color: "from-amber-400 to-yellow-500", perksEn: ["1.5× points", "Priority support", "Exclusive items"], perksUk: ["1.5× балів", "Пріоритет підтримки", "Ексклюзивні товари"] },
  { id: "platinum", nameEn: "Platinum", nameUk: "Платина", min: 5000, multiplier: 2, color: "from-indigo-600 to-violet-700", perksEn: ["2× points", "Personal manager", "VIP events"], perksUk: ["2× балів", "Персональний менеджер", "VIP заходи"] },
];

const REWARDS = [
  { id: "r1", points: 100, titleEn: "£5 off coupon", titleUk: "Купон на 200 ₴", emoji: "🎟" },
  { id: "r2", points: 300, titleEn: "Free shipping", titleUk: "Безкоштовна доставка", emoji: "🚚" },
  { id: "r3", points: 500, titleEn: "Mystery gift", titleUk: "Подарунок-сюрприз", emoji: "🎁" },
  { id: "r4", points: 1000, titleEn: "10% off any order", titleUk: "10% знижка на будь-яке замовлення", emoji: "💎" },
];

export function EcomLoyaltyDemo({ isUk }: Props) {
  const [points, setPoints] = useState(750);
  const [redeemed, setRedeemed] = useState<Set<string>>(new Set());

  const currentTier = TIERS.reduce((t, tier) => (points >= tier.min ? tier : t), TIERS[0]);
  const nextTier = TIERS.find((t) => t.min > points);
  const tierProgress = nextTier ? ((points - currentTier.min) / (nextTier.min - currentTier.min)) * 100 : 100;

  const redeem = (id: string, cost: number) => {
    if (points < cost || redeemed.has(id)) return;
    setPoints((p) => p - cost);
    setRedeemed((s) => new Set(s).add(id));
  };

  const earn = (amount: number) => setPoints((p) => p + amount);

  return (
    <div className="space-y-6">
      {/* Tier card */}
      <div className={`rounded-2xl bg-linear-to-br ${currentTier.color} text-white p-6 shadow-xl`}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-white/70 text-xs uppercase tracking-wider mb-1">{isUk ? "Ваш статус" : "Your tier"}</p>
            <h3 className="text-3xl font-bold flex items-center gap-2">
              <Award className="w-7 h-7" />
              {isUk ? currentTier.nameUk : currentTier.nameEn}
            </h3>
          </div>
          <div className="text-right">
            <p className="text-white/70 text-xs uppercase tracking-wider mb-1">{isUk ? "Балів" : "Points"}</p>
            <p className="text-3xl font-bold tabular-nums">{points.toLocaleString()}</p>
          </div>
        </div>

        {nextTier ? (
          <div>
            <div className="flex items-center justify-between mb-1.5 text-sm">
              <span className="text-white/80">{isUk ? `До ${nextTier.nameUk}` : `To ${nextTier.nameEn}`}</span>
              <span className="font-semibold tabular-nums">{(nextTier.min - points).toLocaleString()} {isUk ? "балів" : "points"}</span>
            </div>
            <div className="h-2 rounded-full bg-white/20 overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-700"
                style={{ width: `${tierProgress}%` }}
                role="progressbar"
                aria-valuenow={Math.round(tierProgress)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${tierProgress.toFixed(0)}% to next tier`}
              />
            </div>
          </div>
        ) : (
          <p className="text-white/80 text-sm">✨ {isUk ? "Максимальний рівень досягнуто!" : "Maximum tier reached!"}</p>
        )}

        <div className="mt-4 pt-4 border-t border-white/20">
          <p className="text-white/70 text-xs uppercase tracking-wider mb-2">{isUk ? "Привілеї" : "Your perks"}</p>
          <div className="flex flex-wrap gap-1.5">
            {(isUk ? currentTier.perksUk : currentTier.perksEn).map((perk, i) => (
              <span key={i} className="px-2 py-0.5 rounded-full bg-white/20 text-xs">
                {perk}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Earn points action */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        <button
          onClick={() => earn(50)}
          className="flex flex-col items-center gap-1 p-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white hover:bg-indigo-50 hover:border-indigo-300 transition-all text-sm"
        >
          <ShoppingBag className="w-5 h-5 text-indigo-600" />
          <span className="font-semibold text-neutral-900">+50</span>
          <span className="text-xs text-neutral-500">{isUk ? "Замовлення" : "Order"}</span>
        </button>
        <button
          onClick={() => earn(20)}
          className="flex flex-col items-center gap-1 p-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white hover:bg-indigo-50 hover:border-indigo-300 transition-all text-sm"
        >
          <Sparkles className="w-5 h-5 text-violet-600" />
          <span className="font-semibold text-neutral-900">+20</span>
          <span className="text-xs text-neutral-500">{isUk ? "Відгук" : "Review"}</span>
        </button>
        <button
          onClick={() => earn(100)}
          className="flex flex-col items-center gap-1 p-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white hover:bg-indigo-50 hover:border-indigo-300 transition-all text-sm"
        >
          <TrendingUp className="w-5 h-5 text-emerald-600" />
          <span className="font-semibold text-neutral-900">+100</span>
          <span className="text-xs text-neutral-500">{isUk ? "Реферал" : "Referral"}</span>
        </button>
      </div>

      {/* Rewards catalog */}
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white p-5">
        <h3 className="font-bold text-neutral-900 dark:text-white mb-3 flex items-center gap-2">
          <Gift className="w-5 h-5 text-rose-500" />
          {isUk ? "Каталог винагород" : "Rewards catalog"}
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {REWARDS.map((r) => {
            const affordable = points >= r.points;
            const isRedeemed = redeemed.has(r.id);
            return (
              <button
                key={r.id}
                onClick={() => redeem(r.id, r.points)}
                disabled={!affordable || isRedeemed}
                className={`text-left p-3 rounded-xl border transition-all ${
                  isRedeemed
                    ? "border-emerald-300 bg-emerald-50"
                    : affordable
                    ? "border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-indigo-300 hover:bg-indigo-50/50"
                    : "border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 opacity-50 cursor-not-allowed"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-2xl">{r.emoji}</span>
                  <span className={`text-xs font-bold tabular-nums ${affordable ? "text-indigo-600" : "text-neutral-400"}`}>
                    {r.points} pts
                  </span>
                </div>
                <p className="text-sm font-medium text-neutral-900 dark:text-white mb-1">{isUk ? r.titleUk : r.titleEn}</p>
                <p className={`text-xs ${isRedeemed ? "text-emerald-600 font-semibold" : "text-neutral-500"}`}>
                  {isRedeemed ? (isUk ? "✓ Активовано" : "✓ Redeemed") : affordable ? (isUk ? "Активувати →" : "Redeem →") : (isUk ? `Ще ${r.points - points} балів` : `Need ${r.points - points} more`)}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      <p className="text-sm text-neutral-500">
        {isUk
          ? "4 рівні (Bronze→Platinum), множники балів, каталог винагород. Production: інтегрується з замовленнями + email-нагадування."
          : "4 tiers (Bronze→Platinum), points multipliers, rewards catalog. Production: integrates with orders + email reminders."}
      </p>
    </div>
  );
}
