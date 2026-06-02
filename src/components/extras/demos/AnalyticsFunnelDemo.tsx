"use client";

import { useState } from "react";
import { Users, ShoppingCart, CreditCard, CheckCircle2, TrendingDown, RefreshCw } from "lucide-react";

interface Props {
  variant?: string;
  isUk: boolean;
}

const FUNNELS = {
  ecommerce: {
    labelEn: "E-commerce funnel",
    labelUk: "E-commerce воронка",
    steps: [
      { key: "visit", labelEn: "Site visits", labelUk: "Відвідування", icon: Users, value: 10000, color: "bg-indigo-500" },
      { key: "product", labelEn: "Product view", labelUk: "Перегляд товару", icon: Users, value: 4200, color: "bg-violet-500" },
      { key: "cart", labelEn: "Add to cart", labelUk: "В кошику", icon: ShoppingCart, value: 1600, color: "bg-rose-500" },
      { key: "checkout", labelEn: "Checkout started", labelUk: "Перейшли до оплати", icon: CreditCard, value: 720, color: "bg-amber-500" },
      { key: "purchase", labelEn: "Purchase", labelUk: "Покупка", icon: CheckCircle2, value: 412, color: "bg-emerald-500" },
    ],
  },
  saas: {
    labelEn: "SaaS signup funnel",
    labelUk: "SaaS реєстрація",
    steps: [
      { key: "land", labelEn: "Landing page", labelUk: "Landing page", icon: Users, value: 25000, color: "bg-indigo-500" },
      { key: "signup", labelEn: "Signup started", labelUk: "Почав реєстрацію", icon: Users, value: 5800, color: "bg-violet-500" },
      { key: "verified", labelEn: "Email verified", labelUk: "Email верифіковано", icon: CheckCircle2, value: 4200, color: "bg-blue-500" },
      { key: "onboard", labelEn: "Onboarding complete", labelUk: "Onboarding", icon: CheckCircle2, value: 2900, color: "bg-amber-500" },
      { key: "active", labelEn: "Active day 7", labelUk: "Активний на 7-й день", icon: CheckCircle2, value: 1850, color: "bg-emerald-500" },
    ],
  },
  lead: {
    labelEn: "Lead generation funnel",
    labelUk: "Воронка ліда",
    steps: [
      { key: "impr", labelEn: "Ad impressions", labelUk: "Покази реклами", icon: Users, value: 100000, color: "bg-indigo-500" },
      { key: "click", labelEn: "Ad clicks", labelUk: "Кліки", icon: Users, value: 3200, color: "bg-violet-500" },
      { key: "form", labelEn: "Form started", labelUk: "Почав форму", icon: Users, value: 480, color: "bg-rose-500" },
      { key: "submit", labelEn: "Form submitted", labelUk: "Відправив форму", icon: CheckCircle2, value: 245, color: "bg-amber-500" },
      { key: "qualified", labelEn: "Qualified lead", labelUk: "Кваліфікований", icon: CheckCircle2, value: 68, color: "bg-emerald-500" },
    ],
  },
};

type FunnelKey = keyof typeof FUNNELS;

export function AnalyticsFunnelDemo({ isUk }: Props) {
  const [funnel, setFunnel] = useState<FunnelKey>("ecommerce");
  const current = FUNNELS[funnel];
  const max = current.steps[0].value;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {(Object.keys(FUNNELS) as FunnelKey[]).map((k) => (
          <button
            key={k}
            onClick={() => setFunnel(k)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              k === funnel
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-indigo-50"
            }`}
          >
            {isUk ? FUNNELS[k].labelUk : FUNNELS[k].labelEn}
          </button>
        ))}
        <button
          onClick={() => setFunnel(funnel)}
          className="ml-auto flex items-center gap-1.5 px-3 py-2 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:text-white transition-colors"
          aria-label={isUk ? "Оновити дані" : "Refresh data"}
        >
          <RefreshCw className="w-3.5 h-3.5" />
          {isUk ? "Оновити" : "Refresh"}
        </button>
      </div>

      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-6">
        <div className="space-y-3">
          {current.steps.map((step, i) => {
            const Icon = step.icon;
            const widthPct = (step.value / max) * 100;
            const conversionFromPrev = i === 0 ? 100 : (step.value / current.steps[i - 1].value) * 100;
            const dropFromPrev = i === 0 ? 0 : current.steps[i - 1].value - step.value;
            return (
              <div key={step.key}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2 text-sm font-medium text-neutral-700">
                    <Icon className="w-4 h-4 text-neutral-400" />
                    {isUk ? step.labelUk : step.labelEn}
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="font-bold text-neutral-900 dark:text-white tabular-nums">
                      {step.value.toLocaleString()}
                    </span>
                    {i > 0 && (
                      <span className={`text-xs font-semibold tabular-nums ${conversionFromPrev > 50 ? "text-emerald-600" : conversionFromPrev > 20 ? "text-amber-600" : "text-rose-600"}`}>
                        {conversionFromPrev.toFixed(1)}%
                      </span>
                    )}
                  </div>
                </div>
                <div
                  className={`h-9 ${step.color} rounded-lg flex items-center px-3 text-white text-xs font-semibold transition-all duration-700`}
                  style={{ width: `${widthPct}%`, minWidth: "60px" }}
                  role="progressbar"
                  aria-valuenow={Math.round(widthPct)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${isUk ? step.labelUk : step.labelEn}: ${step.value}`}
                >
                  {widthPct.toFixed(0)}%
                </div>
                {i > 0 && dropFromPrev > 0 && (
                  <div className="mt-1 ml-1 flex items-center gap-1 text-xs text-rose-500">
                    <TrendingDown className="w-3 h-3" />
                    -{dropFromPrev.toLocaleString()} ({(100 - conversionFromPrev).toFixed(1)}%)
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-700 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1">
              {isUk ? "Загальна конверсія" : "Overall conversion"}
            </div>
            <div className="text-2xl font-bold text-indigo-600 tabular-nums">
              {((current.steps[current.steps.length - 1].value / current.steps[0].value) * 100).toFixed(2)}%
            </div>
          </div>
          <div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1">
              {isUk ? "Втрати" : "Drop-offs"}
            </div>
            <div className="text-2xl font-bold text-rose-600 tabular-nums">
              {(current.steps[0].value - current.steps[current.steps.length - 1].value).toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1">
              {isUk ? "Кроків" : "Steps"}
            </div>
            <div className="text-2xl font-bold text-neutral-900 dark:text-white tabular-nums">
              {current.steps.length}
            </div>
          </div>
        </div>
      </div>

      <p className="text-sm text-neutral-500">
        {isUk
          ? "Воронка показує де клієнти втрачаються. Production: GA4 Explore, Mixpanel, Amplitude funnels."
          : "Funnel visualization shows where users drop off. Production: GA4 Explore, Mixpanel, Amplitude funnels."}
      </p>
    </div>
  );
}
