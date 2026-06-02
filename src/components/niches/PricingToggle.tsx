"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, X } from "lucide-react";
import type { NichePricingPlan } from "@/lib/data/niches";

interface PricingToggleProps {
  plans: NichePricingPlan[];
  lang: string;
  color: string;
}

/** Parse "2 990 ₴" → 2990, returns null for non-numeric prices */
function parsePrice(priceStr: string): number | null {
  const cleaned = priceStr.replace(/\s/g, "").replace(/[₴$€£]/g, "");
  const num = parseFloat(cleaned.replace(",", "."));
  return isNaN(num) ? null : num;
}

/** Format number back to price string with currency */
function formatPrice(amount: number, originalStr: string): string {
  const currency = originalStr.match(/[₴$€£]/) ? originalStr.match(/[₴$€£]/)![0] : "₴";
  return `${Math.round(amount).toLocaleString("uk-UA")} ${currency}`;
}

export function PricingToggle({ plans, lang, color }: PricingToggleProps) {
  const [yearly, setYearly] = useState(false);
  const isUk = lang === "uk";

  return (
    <div>
      {/* Toggle */}
      <div className="flex items-center justify-center gap-4 mb-10">
        <span
          className={`text-sm font-medium transition-colors ${!yearly ? "text-neutral-900 dark:text-white" : "text-neutral-400 dark:text-neutral-500"}`}
        >
          {isUk ? "Щомісяця" : "Monthly"}
        </span>

        <button
          onClick={() => setYearly((v) => !v)}
          role="switch"
          aria-checked={yearly}
          className="relative w-14 h-7 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          style={{ backgroundColor: yearly ? color : "#d1d5db" }}
        >
          <span
            className="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-sm transition-transform"
            style={{ transform: yearly ? "translateX(28px)" : "translateX(0)" }}
          />
        </button>

        <span
          className={`text-sm font-medium transition-colors flex items-center gap-2 ${yearly ? "text-neutral-900 dark:text-white" : "text-neutral-400 dark:text-neutral-500"}`}
        >
          {isUk ? "Щорічно" : "Yearly"}
          <span
            className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
            style={{ backgroundColor: color }}
          >
            −20%
          </span>
        </span>
      </div>

      {/* Plans grid */}
      <div className={`grid sm:grid-cols-2 ${plans.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"} gap-6 max-w-6xl mx-auto`}>
        {plans.map((plan) => {
          const basePrice = parsePrice(plan.price);
          const displayPrice =
            yearly && basePrice !== null
              ? formatPrice(basePrice * 0.8, plan.price)
              : plan.price;

          return (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-6 transition-all ${
                plan.highlighted
                  ? "border-2 shadow-xl shadow-indigo-500/10 bg-white dark:bg-neutral-800"
                  : "border-neutral-100 dark:border-neutral-700 /50 bg-white dark:bg-neutral-800/60 hover:shadow-md"
              }`}
              style={plan.highlighted ? { borderColor: color } : undefined}
            >
              {plan.highlighted && (
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-white text-xs font-bold whitespace-nowrap"
                  style={{ backgroundColor: color }}
                >
                  {isUk ? "Найпопулярніший" : "Most Popular"}
                </div>
              )}

              <div className="mb-4">
                <div className="font-bold text-lg text-neutral-900 dark:text-white mb-1">
                  {plan.name}
                </div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-snug">
                  {plan.description}
                </p>
              </div>

              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl font-bold font-syne" style={{ color }}>
                  {displayPrice}
                </span>
                {plan.period && basePrice !== null && (
                  <span className="text-sm text-neutral-400">{plan.period}</span>
                )}
              </div>

              {yearly && basePrice !== null && (
                <p className="text-xs text-neutral-400 dark:text-neutral-500 mb-4">
                  {isUk
                    ? `${formatPrice(basePrice * 0.8 * 12, plan.price)} / рік`
                    : `${formatPrice(basePrice * 0.8 * 12, plan.price)} / year`}
                </p>
              )}

              <ul className="space-y-2.5 flex-1 mt-4 mb-6">
                {plan.features.map((f) => (
                  <li key={f.text} className="flex items-start gap-2.5 text-sm">
                    {f.included ? (
                      <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color }} />
                    ) : (
                      <X className="w-4 h-4 shrink-0 mt-0.5 text-neutral-300 dark:text-neutral-600" />
                    )}
                    <span
                      className={
                        f.included
                          ? "text-neutral-700 dark:text-neutral-300 "
                          : "text-neutral-400 dark:text-neutral-600"
                      }
                    >
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={`/${lang}/contact`}
                className="block text-center py-3 px-5 rounded-xl font-semibold text-sm transition-all"
                style={
                  plan.highlighted
                    ? { backgroundColor: color, color: "#fff" }
                    : { border: `1.5px solid ${color}`, color }
                }
              >
                {plan.cta ?? (isUk ? "Обрати план" : "Get Started")}
              </Link>
            </div>
          );
        })}
      </div>

      <p className="text-center text-xs text-neutral-400 dark:text-neutral-500 mt-8">
        {isUk
          ? "Ціни орієнтовні. Річна підписка оплачується наперед зі знижкою 20%."
          : "Prices are approximate. Annual subscription is billed upfront with a 20% discount."}
      </p>
    </div>
  );
}
