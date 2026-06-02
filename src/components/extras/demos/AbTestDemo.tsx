"use client";

import { useState } from "react";
import { Trophy, TrendingUp, Users, FlaskConical } from "lucide-react";

interface Props {
  variant?: string;
  isUk: boolean;
}

const TESTS = [
  {
    id: "cta-color",
    nameEn: "CTA button color",
    nameUk: "Колір CTA кнопки",
    variants: [
      { id: "a", label: "A", color: "bg-indigo-600 hover:bg-indigo-700", text: "Get started", textUk: "Розпочати", visitors: 5240, conversions: 312, isControl: true },
      { id: "b", label: "B", color: "bg-emerald-600 hover:bg-emerald-700", text: "Get started", textUk: "Розпочати", visitors: 5180, conversions: 421, isControl: false },
    ],
  },
  {
    id: "headline",
    nameEn: "Hero headline",
    nameUk: "Hero заголовок",
    variants: [
      { id: "a", label: "A", color: "bg-neutral-700", text: "Fast websites for business", textUk: "Швидкі сайти для бізнесу", visitors: 4120, conversions: 198, isControl: true },
      { id: "b", label: "B", color: "bg-neutral-700", text: "Sites that convert visitors into customers", textUk: "Сайти, що перетворюють відвідувачів на клієнтів", visitors: 4080, conversions: 287, isControl: false },
    ],
  },
];

export function AbTestDemo({ isUk }: Props) {
  const [testIdx, setTestIdx] = useState(0);
  const test = TESTS[testIdx];

  const variants = test.variants.map((v) => ({
    ...v,
    rate: (v.conversions / v.visitors) * 100,
  }));
  const winner = variants.reduce((best, v) => (v.rate > best.rate ? v : best), variants[0]);
  const control = variants.find((v) => v.isControl)!;
  const uplift = ((winner.rate - control.rate) / control.rate) * 100;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <FlaskConical className="w-5 h-5 text-violet-600" />
        <h3 className="text-lg font-bold text-neutral-900">
          {isUk ? "A/B тест:" : "A/B test:"} {isUk ? test.nameUk : test.nameEn}
        </h3>
        <div className="ml-auto flex gap-1">
          {TESTS.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setTestIdx(i)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                i === testIdx ? "bg-violet-600 text-white" : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-violet-50"
              }`}
            >
              {isUk ? t.nameUk : t.nameEn}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {variants.map((v) => {
          const isWinner = v.id === winner.id && uplift > 5;
          return (
            <div
              key={v.id}
              className={`rounded-2xl border-2 bg-white overflow-hidden ${
                isWinner ? "border-emerald-400 ring-2 ring-emerald-100" : "border-neutral-200"
              }`}
            >
              <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-100">
                <span className="flex items-center gap-2">
                  <span className={`w-7 h-7 rounded-full font-bold text-sm flex items-center justify-center ${
                    v.isControl ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-600" : "bg-violet-100 text-violet-700"
                  }`}>{v.label}</span>
                  <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase">
                    {v.isControl ? (isUk ? "Контроль" : "Control") : (isUk ? "Варіант" : "Variant")}
                  </span>
                </span>
                {isWinner && (
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                    <Trophy className="w-3 h-3" />
                    {isUk ? "Переможець" : "Winner"}
                  </span>
                )}
              </div>

              {/* Sample variant rendering */}
              <div className="p-6 bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center min-h-[120px]">
                {test.id === "cta-color" ? (
                  <button className={`px-6 py-3 rounded-lg ${v.color} text-white font-semibold shadow-sm transition-colors`}>
                    {isUk ? v.textUk : v.text}
                  </button>
                ) : (
                  <p className="text-center font-bold text-neutral-900 dark:text-white text-lg leading-tight">
                    {isUk ? v.textUk : v.text}
                  </p>
                )}
              </div>

              {/* Metrics */}
              <div className="p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1">
                      <Users className="w-3 h-3 inline mr-1" />
                      {isUk ? "Відвідувачі" : "Visitors"}
                    </div>
                    <div className="font-bold text-neutral-900 dark:text-white tabular-nums">{v.visitors.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1">
                      {isUk ? "Конверсії" : "Conversions"}
                    </div>
                    <div className="font-bold text-neutral-900 dark:text-white tabular-nums">{v.conversions}</div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      {isUk ? "Конверсія" : "Conversion rate"}
                    </span>
                    <span className={`font-bold tabular-nums ${isWinner ? "text-emerald-600" : "text-neutral-900"}`}>
                      {v.rate.toFixed(2)}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                    <div
                      className={`h-full ${isWinner ? "bg-emerald-500" : "bg-neutral-400"} rounded-full transition-all`}
                      style={{ width: `${(v.rate / 15) * 100}%` }}
                      role="progressbar"
                      aria-valuenow={v.rate}
                      aria-valuemin={0}
                      aria-valuemax={15}
                      aria-label={`Variant ${v.label} conversion rate ${v.rate.toFixed(2)}%`}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Results summary */}
      <div className="rounded-xl bg-linear-to-r from-emerald-50 to-teal-50 border border-emerald-200 p-4 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
          <TrendingUp className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <p className="font-bold text-emerald-900">
            {isUk ? `Варіант ${winner.label} переміг` : `Variant ${winner.label} wins`}
            <span className="ml-2 text-2xl tabular-nums">+{uplift.toFixed(1)}%</span>
          </p>
          <p className="text-sm text-emerald-700">
            {isUk
              ? `Статистично значущий результат (p < 0.05). Рекомендуємо розгорнути варіант ${winner.label}.`
              : `Statistically significant (p < 0.05). Recommend rolling out Variant ${winner.label}.`}
          </p>
        </div>
      </div>

      <p className="text-sm text-neutral-500">
        {isUk
          ? "Production: Google Optimize (sunset), Vercel Edge Config, або власне рішення на cookie + edge middleware."
          : "Production: Google Optimize (sunset), Vercel Edge Config, or custom cookie + edge middleware setup."}
      </p>
    </div>
  );
}
