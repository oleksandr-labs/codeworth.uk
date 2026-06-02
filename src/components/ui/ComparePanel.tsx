"use client";

import Link from "next/link";
import { X, ArrowRight, BarChart2 } from "lucide-react";
import { useCompare } from "@/hooks/useCompare";
import { useLocale } from "@/components/layout/LocaleProvider";

const COMPLEXITY_LABEL_UK: Record<string, string> = {
  simple: "Простий",
  medium: "Середній",
  complex: "Складний",
};

const COMPLEXITY_LABEL_EN: Record<string, string> = {
  simple: "Simple",
  medium: "Medium",
  complex: "Complex",
};

const COMPLEXITY_COLOR: Record<string, string> = {
  simple: "text-emerald-600 bg-emerald-50",
  medium: "text-amber-600 bg-amber-50",
  complex: "text-indigo-600 bg-indigo-50",
};

/**
 * ComparePanel — sticky bottom bar that appears when 2–3 products are selected.
 * Shows selected products with remove buttons and a "Порівняти" CTA.
 */
export function ComparePanel() {
  const { items, removeItem, clearAll } = useCompare();
  const lang = useLocale();
  const isUk = lang === "uk";
  const COMPLEXITY_LABEL = isUk ? COMPLEXITY_LABEL_UK : COMPLEXITY_LABEL_EN;

  if (items.length < 2) return null;

  // Build compare query string: /marketplace/compare?slugs=a,b,c
  const query = items.map((i) => i.slug).join(",");

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[300] bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-700 shadow-[0_-4px_24px_-4px_rgb(30_27_75/0.12)] animate-fade-up"
      role="region"
      aria-label={isUk ? "Панель порівняння" : "Compare panel"}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
          {/* Icon + label */}
          <div className="flex items-center gap-2 shrink-0 text-sm font-semibold text-neutral-700 dark:text-neutral-300 dark:text-neutral-200">
            <BarChart2 className="w-4 h-4 text-indigo-500" />
            <span>{isUk ? "Порівняння" : "Compare"}</span>
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold">
              {items.length}
            </span>
          </div>

          {/* Selected items */}
          <div className="flex items-center gap-2 flex-1 overflow-x-auto">
            {items.map((item) => (
              <div
                key={item.slug}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-50 dark:bg-neutral-900 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shrink-0"
              >
                <span className="text-base leading-none">{item.emoji}</span>
                <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200 dark:text-neutral-100 max-w-[120px] truncate">
                  {item.title}
                </span>
                <span
                  className={`text-xs px-1.5 py-0.5 rounded font-medium ${COMPLEXITY_COLOR[item.complexity]}`}
                >
                  {COMPLEXITY_LABEL[item.complexity]}
                </span>
                <span className="text-xs text-neutral-500 dark:text-neutral-400 shrink-0">
                  {isUk ? "від" : "from"} {item.priceFrom.toLocaleString("uk-UA")} ₴
                </span>
                <button
                  onClick={() => removeItem(item.slug)}
                  className="ml-1 p-0.5 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                  aria-label={isUk ? `Прибрати ${item.title} з порівняння` : `Remove ${item.title} from comparison`}
                >
                  <X className="w-3.5 h-3.5 text-neutral-500" />
                </button>
              </div>
            ))}

            {/* Empty slots */}
            {Array.from({ length: 3 - items.length }).map((_, i) => (
              <div
                key={`empty-${i}`}
                className="flex items-center justify-center w-32 h-9 rounded-lg border-2 border-dashed border-neutral-200 dark:border-neutral-700 shrink-0"
              >
                <span className="text-xs text-neutral-400">{isUk ? "+ додати" : "+ add"}</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0 ml-auto">
            <button
              onClick={clearAll}
              className="text-sm text-neutral-500 hover:text-neutral-700 dark:text-neutral-300 dark:hover:text-neutral-300 transition-colors px-2 py-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-800"
            >
              {isUk ? "Очистити" : "Clear all"}
            </button>
            <Link
              href={`/${lang}/marketplace/compare?slugs=${query}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors"
            >
              {isUk ? "Порівняти" : "Compare"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
