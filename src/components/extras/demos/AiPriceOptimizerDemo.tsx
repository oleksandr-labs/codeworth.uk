"use client";

import { useState } from "react";

function formatPrice(uah: number, isUk: boolean): string {
  if (isUk) return `${uah} ₴`;
  return `£${Math.ceil(uah / 40 / 5) * 5}`;
}

interface Product {
  id: number;
  nameUk: string;
  nameEn: string;
  currentUah: number;
  recommendedUah: number;
  reasonUk: string;
  reasonEn: string;
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    nameUk: "Бездротові навушники",
    nameEn: "Wireless Headphones",
    currentUah: 2400,
    recommendedUah: 2750,
    reasonUk: "Високий попит, конкуренти на 2900–3100",
    reasonEn: "High demand, competitors at 2900–3100",
  },
  {
    id: 2,
    nameUk: "USB-C Хаб",
    nameEn: "USB-C Hub",
    currentUah: 890,
    recommendedUah: 790,
    reasonUk: "3 нових конкуренти вийшли, попит -12%",
    reasonEn: "3 new competitors entered, demand -12%",
  },
  {
    id: 3,
    nameUk: "Підставка для ноутбука",
    nameEn: "Laptop Stand",
    currentUah: 650,
    recommendedUah: 650,
    reasonUk: "Оптимальна ціна, в межах ±5% ринку",
    reasonEn: "Optimal price, within ±5% of market",
  },
  {
    id: 4,
    nameUk: "Механічна клавіатура",
    nameEn: "Mechanical Keyboard",
    currentUah: 3200,
    recommendedUah: 3650,
    reasonUk: "Сезонний пік, унікальна модель",
    reasonEn: "Seasonal peak, unique model",
  },
  {
    id: 5,
    nameUk: "Вебкамера HD",
    nameEn: "Webcam HD",
    currentUah: 1450,
    recommendedUah: 1250,
    reasonUk: "Перетоварювання, потрібно розпродати",
    reasonEn: "Overstocked, need to clear inventory",
  },
  {
    id: 6,
    nameUk: "Ігрова миша",
    nameEn: "Gaming Mouse",
    currentUah: 1800,
    recommendedUah: 2100,
    reasonUk: "Початок ігрового сезону, +25% прогноз попиту",
    reasonEn: "Gaming season starts, +25% demand forecast",
  },
];

type Mode = "revenue" | "sales" | "competitive";

const MODE_LABELS: Record<Mode, { uk: string; en: string }> = {
  revenue: { uk: "Макс. Виручка", en: "Max Revenue" },
  sales: { uk: "Макс. Продажі", en: "Max Sales" },
  competitive: { uk: "Конкурентна", en: "Competitive" },
};

const MODE_DESCRIPTIONS: Record<Mode, { uk: string; en: string }> = {
  revenue: {
    uk: "AI максимізує загальний дохід, підвищуючи ціни на продукти з низькою еластичністю та унікальною цінністю.",
    en: "AI maximises total revenue by raising prices on products with low elasticity and unique value.",
  },
  sales: {
    uk: "AI знижує ціни для збільшення обсягу продажів, використовуючи ефект масштабу та зростання частки ринку.",
    en: "AI lowers prices to boost sales volume, leveraging scale effects and market share growth.",
  },
  competitive: {
    uk: "AI відстежує конкурентів у реальному часі та тримає ваші ціни на 3–5% нижче середнього по ринку.",
    en: "AI tracks competitors in real-time and keeps your prices 3–5% below the market average.",
  },
};

export function AiPriceOptimizerDemo({ variant, isUk }: { variant: string; isUk: boolean }) {
  const [applied, setApplied] = useState<Set<number>>(new Set());
  const [mode, setMode] = useState<Mode>("revenue");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  // variant is accepted as prop (used by parent catalog) — kept for future use
  void variant;

  function handleApply(id: number) {
    setApplied((prev) => new Set([...prev, id]));
  }

  function handleRunAnalysis() {
    if (isAnalyzing || analysisComplete) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }, 2000);
  }

  function getPriceIndicator(product: Product) {
    if (product.recommendedUah > product.currentUah) {
      return { arrow: "↑", label: isUk ? "підвищити" : "increase", color: "text-green-600 bg-green-50 border-green-200" };
    }
    if (product.recommendedUah < product.currentUah) {
      return { arrow: "↓", label: isUk ? "знизити" : "decrease", color: "text-red-600 bg-red-50 border-red-200" };
    }
    return { arrow: "✓", label: isUk ? "оптимально" : "optimal", color: "text-neutral-500 bg-neutral-50 border-neutral-200" };
  }

  return (
    <div>
      {/* Header */}
      <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-2">
        {isUk ? "AI Оптимізатор Цін" : "AI Price Optimizer"}
      </h2>
      <p className="text-neutral-500 text-sm mb-8">
        {isUk
          ? "AI аналізує попит, сезонність та конкурентів і рекомендує оптимальну ціну"
          : "AI analyses demand, seasonality and competitors to recommend the optimal price"}
      </p>

      {/* Products table */}
      <div className="overflow-x-auto rounded-2xl border border-neutral-200 shadow-sm mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-200">
              <th className="text-left px-4 py-3 font-semibold text-neutral-700 text-xs uppercase tracking-wide">
                {isUk ? "Товар" : "Product"}
              </th>
              <th className="text-right px-4 py-3 font-semibold text-neutral-700 text-xs uppercase tracking-wide">
                {isUk ? "Поточна ціна" : "Current Price"}
              </th>
              <th className="text-right px-4 py-3 font-semibold text-neutral-700 text-xs uppercase tracking-wide">
                {isUk ? "AI Рекомендація" : "AI Recommended"}
              </th>
              <th className="text-left px-4 py-3 font-semibold text-neutral-700 text-xs uppercase tracking-wide hidden lg:table-cell">
                {isUk ? "Причина" : "Reason"}
              </th>
              <th className="text-center px-4 py-3 font-semibold text-neutral-700 text-xs uppercase tracking-wide">
                {isUk ? "Дія" : "Action"}
              </th>
            </tr>
          </thead>
          <tbody>
            {PRODUCTS.map((product, i) => {
              const indicator = getPriceIndicator(product);
              const isApplied = applied.has(product.id);
              return (
                <tr
                  key={product.id}
                  className={`border-b border-neutral-100 last:border-0 transition-colors ${
                    isApplied ? "bg-green-50" : i % 2 === 0 ? "bg-white" : "bg-neutral-50/50"
                  }`}
                >
                  <td className="px-4 py-3.5">
                    <span className="font-medium text-neutral-900">
                      {isUk ? product.nameUk : product.nameEn}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-right text-neutral-500">
                    {formatPrice(product.currentUah, isUk)}
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg border text-xs font-semibold ${indicator.color}`}
                    >
                      <span>{indicator.arrow}</span>
                      <span>{formatPrice(product.recommendedUah, isUk)}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3.5 hidden lg:table-cell">
                    <span className="text-neutral-500 text-xs">
                      {isUk ? product.reasonUk : product.reasonEn}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    {isApplied ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-500 text-white text-xs font-semibold">
                        ✓ {isUk ? "Застосовано" : "Applied"}
                      </span>
                    ) : (
                      <button
                        onClick={() => handleApply(product.id)}
                        disabled={product.recommendedUah === product.currentUah}
                        className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {isUk ? "Застосувати" : "Apply Price"}
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Summary + Mode selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Potential revenue card */}
        <div className="p-5 rounded-2xl bg-linear-to-br from-green-50 to-emerald-50 border border-green-200">
          <p className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-1">
            {isUk ? "Потенційне збільшення виручки" : "Potential revenue increase"}
          </p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-4xl font-heading font-extrabold text-green-600 animate-pulse">
              +18%
            </span>
            <span className="text-sm text-green-500 font-medium">
              {isUk ? "при повному застосуванні" : "with full adoption"}
            </span>
          </div>
          <p className="text-xs text-green-600 mt-2">
            {isUk
              ? `Застосовано ${applied.size} з ${PRODUCTS.length} рекомендацій`
              : `Applied ${applied.size} of ${PRODUCTS.length} recommendations`}
          </p>
        </div>

        {/* Mode selector */}
        <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-sm">
          <p className="text-xs font-semibold text-neutral-700 uppercase tracking-wide mb-3">
            {isUk ? "Режим оптимізації" : "Optimisation Mode"}
          </p>
          <div className="flex gap-2 mb-3">
            {(["revenue", "sales", "competitive"] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-2 px-2 rounded-xl text-xs font-semibold transition-all ${
                  mode === m
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                {isUk ? MODE_LABELS[m].uk : MODE_LABELS[m].en}
              </button>
            ))}
          </div>
          <p className="text-xs text-neutral-500 leading-relaxed">
            {isUk ? MODE_DESCRIPTIONS[mode].uk : MODE_DESCRIPTIONS[mode].en}
          </p>
        </div>
      </div>

      {/* Run Full Analysis */}
      <div className="flex flex-col items-center gap-3">
        <button
          onClick={handleRunAnalysis}
          disabled={isAnalyzing || analysisComplete}
          className="w-full max-w-sm py-4 rounded-2xl bg-linear-to-r from-indigo-600 to-violet-600 text-white font-bold text-base hover:from-indigo-700 hover:to-violet-700 transition-all shadow-lg shadow-indigo-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {isAnalyzing ? (
            <>
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              {isUk ? "Аналізую..." : "Analysing..."}
            </>
          ) : analysisComplete ? (
            <>
              <span>✅</span>
              {isUk ? "Аналіз завершено!" : "Analysis complete!"}
            </>
          ) : (
            <>
              <span>🔍</span>
              {isUk ? "Запустити повний аналіз" : "Run Full Analysis"}
            </>
          )}
        </button>

        {analysisComplete && (
          <div className="w-full max-w-sm p-4 rounded-2xl bg-green-50 border border-green-200 text-center">
            <p className="text-sm font-semibold text-green-700">
              ✅{" "}
              {isUk
                ? "Аналіз завершено! 6 рекомендацій готово"
                : "Analysis complete! 6 recommendations ready"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
