"use client";

import { useState } from "react";
import { Check, X, Minus, Clock, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/components/layout/LocaleProvider";

const ML_PLANS_UK = [
  {
    name: "Proof of Concept",
    price: "£1,800",
    period: "разово",
    delivery: "3–4 тижні",
    description: "Швидко перевіримо ідею. Прототип моделі з документованими результатами.",
    highlight: false,
    features: [
      { text: "Аудит даних та оцінка якості", included: true },
      { text: "Розвідувальний аналіз даних (EDA)", included: true },
      { text: "1 навчена та оцінена ML-модель", included: true },
      { text: "Звіт метрик (precision/recall/F1)", included: true },
      { text: "Базовий FastAPI serving endpoint", included: true },
      { text: "MLOps дашборд моніторингу", included: false },
      { text: "Кастомні інтеграції (CRM/ERP тощо)", included: false },
      { text: "Гарантійна підтримка 3 місяці", included: false },
    ],
    cta: "Розпочати PoC",
  },
  {
    name: "Production ML",
    price: "від £4,500",
    period: "проєкт",
    delivery: "8–12 тижнів",
    description: "Продакшн-модель з API, моніторингом та документацією.",
    highlight: true,
    badge: "Найпопулярніший",
    features: [
      { text: "Аудит даних та оцінка якості", included: true },
      { text: "EDA + Feature engineering", included: true },
      { text: "1 продакшн ML-модель", included: true },
      { text: "Звіт метрик (precision/recall/F1)", included: true },
      { text: "FastAPI REST serving (Docker/K8s)", included: true },
      { text: "MLOps моніторинг + виявлення drift", included: true },
      { text: "Кастомні інтеграції (CRM/ERP тощо)", included: "partial" },
      { text: "Гарантійна підтримка 3 місяці", included: true },
    ],
    cta: "Запустити в продакшн",
  },
  {
    name: "Enterprise / MLOps",
    price: "Індивідуально",
    period: "",
    delivery: "12–20 тижнів",
    description: "Multi-model системи, real-time inference, повна MLOps-інфраструктура.",
    highlight: false,
    features: [
      { text: "Аудит даних та оцінка якості", included: true },
      { text: "EDA + Feature engineering", included: true },
      { text: "Кілька ML-моделей", included: true },
      { text: "Звіт метрик (precision/recall/F1)", included: true },
      { text: "FastAPI REST serving (Docker/K8s)", included: true },
      { text: "MLOps моніторинг + виявлення drift", included: true },
      { text: "Кастомні інтеграції (CRM/ERP тощо)", included: true },
      { text: "Розширена гарантійна підтримка 3 місяці", included: true },
    ],
    cta: "Обговорити Enterprise",
  },
];

const ML_PLANS_EN = [
  {
    name: "Proof of Concept",
    price: "£1,800",
    period: "one-off",
    delivery: "3–4 weeks",
    description: "Validate your ML idea fast. Working prototype with documented results.",
    highlight: false,
    features: [
      { text: "Data audit & quality assessment", included: true },
      { text: "Exploratory data analysis (EDA)", included: true },
      { text: "1 trained & evaluated ML model", included: true },
      { text: "Performance report (precision/recall/F1)", included: true },
      { text: "Basic FastAPI serving endpoint", included: true },
      { text: "MLOps monitoring dashboard", included: false },
      { text: "Custom integrations (CRM/ERP/etc.)", included: false },
      { text: "3-month warranty support", included: false },
    ],
    cta: "Start a PoC",
  },
  {
    name: "Production ML",
    price: "£4,500",
    period: "project",
    delivery: "8–12 weeks",
    description: "Full production model with API, monitoring, and handover documentation.",
    highlight: true,
    badge: "Most Popular",
    features: [
      { text: "Data audit & quality assessment", included: true },
      { text: "EDA + Feature engineering", included: true },
      { text: "1 production-grade ML model", included: true },
      { text: "Performance report (precision/recall/F1)", included: true },
      { text: "FastAPI REST serving (Docker/K8s)", included: true },
      { text: "MLOps monitoring + drift detection", included: true },
      { text: "Custom integrations (CRM/ERP/etc.)", included: "partial" },
      { text: "3-month warranty support", included: true },
    ],
    cta: "Start Production",
  },
  {
    name: "Enterprise / MLOps",
    price: "Custom",
    period: "",
    delivery: "12–20 weeks",
    description: "Multi-model systems, real-time inference, full MLOps infrastructure, dedicated team.",
    highlight: false,
    features: [
      { text: "Data audit & quality assessment", included: true },
      { text: "EDA + Feature engineering", included: true },
      { text: "Multiple ML models", included: true },
      { text: "Performance report (precision/recall/F1)", included: true },
      { text: "FastAPI REST serving (Docker/K8s)", included: true },
      { text: "MLOps monitoring + drift detection", included: true },
      { text: "Custom integrations (CRM/ERP/etc.)", included: true },
      { text: "3-month warranty support (extended)", included: true },
    ],
    cta: "Discuss Enterprise",
  },
];

function FeatureIcon({ included }: { included: boolean | "partial" }) {
  if (included === true) return <Check className="w-4 h-4 text-emerald-500 shrink-0" />;
  if (included === "partial") return <Minus className="w-4 h-4 text-amber-400 shrink-0" />;
  return <X className="w-4 h-4 text-neutral-300 dark:text-neutral-600 shrink-0" />;
}

export function PricingContent() {
  const lang = useLocale();
  const isUk = lang === "uk";
  const lp = (path: string) => `/${lang}${path}`;
  const ML_PLANS = isUk ? ML_PLANS_UK : ML_PLANS_EN;

  return (
    <div>
      {/* ML Project Plans */}
      <section className="py-10 bg-white dark:bg-neutral-950">
        <div className="max-w-2xl mx-auto text-center mb-12 px-4">
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
            {isUk ? "ML-проєкти" : "ML Projects"}
          </p>
          <h2 className="text-4xl font-heading font-extrabold text-neutral-900 dark:text-white">
            {isUk ? "Тарифи на ML-розробку" : "ML Development Plans"}
          </h2>
          <p className="mt-3 text-neutral-500 dark:text-neutral-400">
            {isUk
              ? "Від швидкого PoC до enterprise MLOps-інфраструктури."
              : "From rapid PoC to enterprise-grade MLOps infrastructure."}
          </p>
        </div>

        <div className="flex md:grid md:grid-cols-3 gap-6 max-w-5xl mx-auto overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 md:pb-0 px-4 md:overflow-visible">
          {ML_PLANS.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative p-8 rounded-2xl border transition-all duration-200 snap-start shrink-0 w-[85vw] md:w-auto flex flex-col",
                plan.highlight
                  ? "border-indigo-300 dark:border-indigo-500 bg-linear-to-b from-indigo-50 to-white dark:from-indigo-950 dark:to-neutral-900 shadow-xl shadow-indigo-500/15 scale-[1.02]"
                  : "border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:shadow-md"
              )}
            >
              {"badge" in plan && plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-indigo-600 text-white text-xs font-bold whitespace-nowrap">
                  {plan.badge}
                </div>
              )}

              <h3 className="font-heading font-bold text-xl text-neutral-900 dark:text-white mb-1">
                {plan.name}
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                {plan.description}
              </p>

              <div className="mb-2">
                <span className="text-4xl font-sans font-bold tabular-nums tracking-tight text-neutral-900 dark:text-white">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-neutral-400 dark:text-neutral-500 text-sm ml-1">
                    {plan.period}
                  </span>
                )}
              </div>

              <div className="text-xs text-neutral-400 dark:text-neutral-500 mb-6 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {isUk ? "Термін:" : "Timeline:"} {plan.delivery}
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li
                    key={f.text}
                    className={cn(
                      "flex items-center gap-2.5 text-sm",
                      f.included
                        ? "text-neutral-700 dark:text-neutral-200"
                        : "text-neutral-400 dark:text-neutral-500"
                    )}
                  >
                    <FeatureIcon included={f.included as boolean | "partial"} />
                    {f.text}
                  </li>
                ))}
              </ul>

              <a
                href={lp("/contact")}
                className={cn(
                  "block text-center px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5",
                  plan.highlight
                    ? "bg-linear-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-500/30 hover:from-indigo-700 hover:to-indigo-800"
                    : "border-2 border-indigo-200 dark:border-indigo-700 text-indigo-700 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950"
                )}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Feature legend */}
        <div className="flex items-center justify-center gap-6 mt-8 text-xs text-neutral-500 dark:text-neutral-400">
          <span className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-500" />
            {isUk ? "Включено" : "Included"}
          </span>
          <span className="flex items-center gap-1.5">
            <Minus className="w-3.5 h-3.5 text-amber-400" />
            {isUk ? "Частково" : "Partial"}
          </span>
          <span className="flex items-center gap-1.5">
            <X className="w-3.5 h-3.5 text-neutral-300 dark:text-neutral-600" />
            {isUk ? "Не включено" : "Not included"}
          </span>
        </div>
      </section>

      {/* MLOps Retainer Section */}
      <section className="py-16 bg-neutral-50 dark:bg-neutral-900">
        <div className="max-w-4xl mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
              {isUk ? "Щомісячна підписка" : "Monthly Retainer"}
            </p>
            <h2 className="text-3xl font-heading font-extrabold text-neutral-900 dark:text-white">
              {isUk ? "MLOps Ретейнер" : "MLOps Retainer"}
            </h2>
            <p className="mt-3 text-neutral-500 dark:text-neutral-400">
              {isUk
                ? "Тримайте моделі в актуальному стані. Ми стежимо за drift, перенавчаємо та звітуємо щомісяця."
                : "Keep your models healthy. We monitor drift, trigger retraining, and report monthly."}
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-8 md:p-10 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              {/* Price */}
              <div className="shrink-0">
                <div className="text-4xl font-sans font-bold tabular-nums tracking-tight text-neutral-900 dark:text-white">
                  {"from £800"}
                </div>
                <div className="text-neutral-400 dark:text-neutral-500 text-sm mt-1">
                  {isUk ? "/місяць" : "/month"}
                </div>
              </div>

              {/* Features */}
              <ul className="flex-1 grid sm:grid-cols-2 gap-3">
                {(isUk
                  ? [
                      "Моніторинг drift та аномалій",
                      "Автоматичні тригери перенавчання",
                      "Версіонування моделей",
                      "Щомісячний звіт продуктивності",
                      "До 4 год. додаткової розробки",
                    ]
                  : [
                      "Drift monitoring & anomaly alerts",
                      "Automatic retraining triggers",
                      "Model versioning",
                      "Monthly performance report",
                      "Up to 4h additional dev time",
                    ]
                ).map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2.5 text-sm text-neutral-700 dark:text-neutral-200"
                  >
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="shrink-0">
                <a
                  href={lp("/contact?ref=mlops-retainer")}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-indigo-600 to-indigo-700 text-white font-semibold text-sm shadow-lg shadow-indigo-500/30 transition-all duration-200 hover:-translate-y-0.5 hover:from-indigo-700 hover:to-indigo-800"
                >
                  <RefreshCw className="w-4 h-4" />
                  {isUk ? "Підключити ретейнер" : "Get Retainer"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
