"use client";

import { useState } from "react";
import { Check, Calendar, CreditCard, Pause, X, RotateCcw, Sparkles } from "lucide-react";

interface Props {
  variant?: string;
  isUk: boolean;
}

const PLANS = [
  {
    id: "monthly",
    labelEn: "Monthly",
    labelUk: "Місячна",
    price: 990,
    period: { en: "/month", uk: "/міс" },
    saveLabel: null,
  },
  {
    id: "quarterly",
    labelEn: "Quarterly",
    labelUk: "Квартальна",
    price: 2670,
    period: { en: "/3 months", uk: "/3 міс" },
    saveLabel: { en: "Save 10%", uk: "−10%" },
    monthlyEquiv: 890,
    popular: true,
  },
  {
    id: "yearly",
    labelEn: "Yearly",
    labelUk: "Річна",
    price: 9990,
    period: { en: "/year", uk: "/рік" },
    saveLabel: { en: "Save 15%", uk: "−15%" },
    monthlyEquiv: 833,
  },
];

type Stage = "plans" | "subscribed";

export function EcomSubscriptionDemo({ isUk }: Props) {
  const [stage, setStage] = useState<Stage>("plans");
  const [selected, setSelected] = useState("quarterly");
  const [status, setStatus] = useState<"active" | "paused">("active");

  const plan = PLANS.find((p) => p.id === selected)!;
  const fmt = (uah: number) => isUk ? `${uah.toLocaleString("uk-UA")} ₴` : `£${Math.round(uah / 40)}`;

  const nextBilling = new Date();
  nextBilling.setDate(nextBilling.getDate() + (selected === "monthly" ? 30 : selected === "quarterly" ? 90 : 365));
  const nextBillingStr = nextBilling.toISOString().slice(0, 10);

  if (stage === "plans") {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-1">{isUk ? "Оберіть план підписки" : "Choose your subscription plan"}</h3>
          <p className="text-sm text-neutral-500">{isUk ? "Скасуйте будь-коли. Без прихованих платежів." : "Cancel anytime. No hidden fees."}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PLANS.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelected(p.id)}
              className={`text-left rounded-2xl border-2 p-5 transition-all relative ${
                selected === p.id ? "border-indigo-500 bg-indigo-50/30 shadow-lg" : "border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-neutral-300"
              }`}
            >
              {p.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-amber-400 text-amber-900 text-xs font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  {isUk ? "ПОПУЛЯРНО" : "POPULAR"}
                </div>
              )}
              <p className="text-sm font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2">
                {isUk ? p.labelUk : p.labelEn}
              </p>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl font-extrabold text-neutral-900 dark:text-white tabular-nums">{fmt(p.price)}</span>
                <span className="text-sm text-neutral-500">{isUk ? p.period.uk : p.period.en}</span>
              </div>
              {p.monthlyEquiv && (
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">
                  {isUk ? `Еквівалент ${fmt(p.monthlyEquiv)}/міс` : `Equivalent to ${fmt(p.monthlyEquiv)}/month`}
                </p>
              )}
              {p.saveLabel && (
                <p className="inline-block px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 text-xs font-bold">
                  {isUk ? p.saveLabel.uk : p.saveLabel.en}
                </p>
              )}
              <div className={`w-5 h-5 rounded-full mt-3 ${selected === p.id ? "bg-indigo-600" : "border-2 border-neutral-300"} flex items-center justify-center`}>
                {selected === p.id && <Check className="w-3 h-3 text-white" />}
              </div>
            </button>
          ))}
        </div>

        <div className="rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 p-4 space-y-2 text-sm">
          {(isUk
            ? ["Преміум-доступ до всіх функцій", "Безкоштовна доставка на всі замовлення", "Skip the line — пріоритетна підтримка", "Подарункові карти −5% бонусом"]
            : ["Premium access to all features", "Free shipping on all orders", "Skip the line — priority support", "Gift cards with −5% bonus"]
          ).map((perk, i) => (
            <div key={i} className="flex items-center gap-2 text-neutral-700">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              {perk}
            </div>
          ))}
        </div>

        <button
          onClick={() => setStage("subscribed")}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
        >
          <CreditCard className="w-4 h-4" />
          {isUk ? `Оформити підписку за ${fmt(plan.price)}` : `Subscribe for ${fmt(plan.price)}`}
        </button>

        <p className="text-sm text-neutral-500">
          {isUk
            ? "Production: Stripe Subscriptions / LiqPay Recurring. Webhook → оновлення статусу. Email-нагадування за 7 днів до billing."
            : "Production: Stripe Subscriptions / LiqPay Recurring. Webhook → status update. 7-day pre-billing email reminder."}
        </p>
      </div>
    );
  }

  // Subscribed state — management panel
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
          <Check className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <p className="font-bold text-emerald-900">{isUk ? "Підписку активовано" : "Subscription active"}</p>
          <p className="text-sm text-emerald-700">{isUk ? plan.labelUk : plan.labelEn} · {fmt(plan.price)}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white p-5 space-y-4">
        <h3 className="font-bold text-neutral-900">{isUk ? "Управління підпискою" : "Manage subscription"}</h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
          <div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1">{isUk ? "Статус" : "Status"}</p>
            <p className={`font-bold ${status === "active" ? "text-emerald-600" : "text-amber-600"}`}>
              {status === "active" ? (isUk ? "● Активна" : "● Active") : (isUk ? "❚❚ Призупинено" : "❚❚ Paused")}
            </p>
          </div>
          <div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1">
              <Calendar className="w-3 h-3 inline mr-1" />
              {isUk ? "Наступна оплата" : "Next billing"}
            </p>
            <p className="font-bold text-neutral-900">{nextBillingStr}</p>
          </div>
          <div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1">{isUk ? "Метод оплати" : "Payment method"}</p>
            <p className="font-bold text-neutral-900 dark:text-white tabular-nums">•••• 4242</p>
          </div>
        </div>

        <div className="pt-3 border-t border-neutral-100 dark:border-neutral-700 flex flex-wrap gap-2">
          <button
            onClick={() => setStatus((s) => s === "active" ? "paused" : "active")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50"
          >
            {status === "active" ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                {isUk ? "Призупинити" : "Pause"}
              </>
            ) : (
              <>
                <RotateCcw className="w-3.5 h-3.5" />
                {isUk ? "Відновити" : "Resume"}
              </>
            )}
          </button>
          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50">
            <CreditCard className="w-3.5 h-3.5" />
            {isUk ? "Змінити план" : "Change plan"}
          </button>
          <button
            onClick={() => setStage("plans")}
            className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm text-rose-600 hover:bg-rose-50"
          >
            <X className="w-3.5 h-3.5" />
            {isUk ? "Скасувати підписку" : "Cancel subscription"}
          </button>
        </div>
      </div>

      <p className="text-sm text-neutral-500">
        {isUk
          ? "Self-service портал: pause/resume, change plan, update payment method, cancel. Все без support."
          : "Self-service portal: pause/resume, change plan, update payment method, cancel. All without contacting support."}
      </p>
    </div>
  );
}
