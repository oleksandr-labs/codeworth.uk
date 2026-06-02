"use client";

import { useState } from "react";
import { Check, X, Star } from "lucide-react";

interface Props {
  variant?: string;
  isUk: boolean;
}

const PLANS = [
  {
    id: "starter",
    nameEn: "Starter",
    nameUk: "Старт",
    price: { en: "£499", uk: "₴19,900" },
    popular: false,
    features: {
      "Кількість сторінок": "5",
      "SEO базовий": true,
      "Адаптивність": true,
      "Форма зворотного зв'язку": true,
      "Інтеграція з CRM": false,
      "Кошик та оплата": false,
      "Підтримка 1 рік": false,
      "Пріоритетна розробка": false,
    },
    featuresEn: {
      "Pages count": "5",
      "Basic SEO": true,
      "Responsive design": true,
      "Contact form": true,
      "CRM integration": false,
      "Shopping cart": false,
      "1-year support": false,
      "Priority dev": false,
    },
  },
  {
    id: "business",
    nameEn: "Business",
    nameUk: "Бізнес",
    price: { en: "£999", uk: "₴39,900" },
    popular: true,
    features: {
      "Кількість сторінок": "до 20",
      "SEO базовий": true,
      "Адаптивність": true,
      "Форма зворотного зв'язку": true,
      "Інтеграція з CRM": true,
      "Кошик та оплата": false,
      "Підтримка 1 рік": true,
      "Пріоритетна розробка": false,
    },
    featuresEn: {
      "Pages count": "up to 20",
      "Basic SEO": true,
      "Responsive design": true,
      "Contact form": true,
      "CRM integration": true,
      "Shopping cart": false,
      "1-year support": true,
      "Priority dev": false,
    },
  },
  {
    id: "enterprise",
    nameEn: "Enterprise",
    nameUk: "Преміум",
    price: { en: "£1,999", uk: "₴79,900" },
    popular: false,
    features: {
      "Кількість сторінок": "Необмежено",
      "SEO базовий": true,
      "Адаптивність": true,
      "Форма зворотного зв'язку": true,
      "Інтеграція з CRM": true,
      "Кошик та оплата": true,
      "Підтримка 1 рік": true,
      "Пріоритетна розробка": true,
    },
    featuresEn: {
      "Pages count": "Unlimited",
      "Basic SEO": true,
      "Responsive design": true,
      "Contact form": true,
      "CRM integration": true,
      "Shopping cart": true,
      "1-year support": true,
      "Priority dev": true,
    },
  },
];

export function CompareDemo({ isUk }: Props) {
  const [highlightOnly, setHighlightOnly] = useState(false);
  const featureKeys = Object.keys(isUk ? PLANS[0].features : PLANS[0].featuresEn);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-neutral-900">
          {isUk ? "Порівняння тарифів" : "Plans comparison"}
        </h3>
        <label className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300 cursor-pointer">
          <input
            type="checkbox"
            checked={highlightOnly}
            onChange={(e) => setHighlightOnly(e.target.checked)}
            className="rounded border-neutral-300 text-indigo-600 focus:ring-indigo-500"
          />
          {isUk ? "Тільки відмінності" : "Differences only"}
        </label>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-neutral-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200">
              <th className="text-left p-4 font-semibold text-neutral-500 dark:text-neutral-400 uppercase text-xs tracking-wider">
                {isUk ? "Функція" : "Feature"}
              </th>
              {PLANS.map((plan) => (
                <th key={plan.id} className="p-4 text-center min-w-[140px]">
                  <div className="flex flex-col items-center gap-1.5">
                    {plan.popular && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold">
                        <Star className="w-3 h-3" />
                        {isUk ? "Популярно" : "Popular"}
                      </span>
                    )}
                    <div className="font-bold text-neutral-900">{isUk ? plan.nameUk : plan.nameEn}</div>
                    <div className="text-indigo-600 font-semibold">{isUk ? plan.price.uk : plan.price.en}</div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {featureKeys.map((key) => {
              const values = PLANS.map((p) => isUk ? p.features[key as keyof typeof p.features] : p.featuresEn[key as keyof typeof p.featuresEn]);
              const allSame = values.every((v) => v === values[0]);
              if (highlightOnly && allSame) return null;

              return (
                <tr key={key} className={`border-b border-neutral-100 dark:border-neutral-700 ${!allSame ? "bg-amber-50/30" : ""}`}>
                  <td className="p-4 font-medium text-neutral-700">{key}</td>
                  {values.map((v, i) => (
                    <td key={i} className="p-4 text-center">
                      {typeof v === "boolean" ? (
                        v ? (
                          <Check className="w-5 h-5 text-emerald-500 mx-auto" aria-label="Yes" />
                        ) : (
                          <X className="w-5 h-5 text-neutral-300 mx-auto" aria-label="No" />
                        )
                      ) : (
                        <span className="font-semibold text-neutral-700">{v}</span>
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="text-sm text-neutral-500">
        {isUk
          ? "Таблиця підтримує до 4 планів, sticky-заголовки, фільтр відмінностей."
          : "Table supports up to 4 plans, sticky headers, differences-only filter."}
      </p>
    </div>
  );
}
