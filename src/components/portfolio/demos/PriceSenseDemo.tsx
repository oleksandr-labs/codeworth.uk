"use client";
import { useState } from "react";

const PRODUCTS = [
  { id: 1, sku: "PHONE-S24",  name: "Samsung Galaxy S24",    cat: "Smartphones", current: 699,  cost: 420, compAvg: 679,  aiRec: 689,  units: 142, trend: "stable" as const },
  { id: 2, sku: "LAPT-M3",    name: "MacBook Air M3",         cat: "Laptops",     current: 1099, cost: 780, compAvg: 1149, aiRec: 1129, units: 58,  trend: "up"     as const },
  { id: 3, sku: "EARBUD-XM5", name: "Sony WF-1000XM5",        cat: "Audio",       current: 279,  cost: 120, compAvg: 249,  aiRec: 259,  units: 214, trend: "down"   as const },
  { id: 4, sku: "TABLET-P12", name: "iPad Pro 12.9\" M4",     cat: "Tablets",     current: 1199, cost: 820, compAvg: 1179, aiRec: 1189, units: 31,  trend: "stable" as const },
  { id: 5, sku: "WATCH-S9",   name: "Apple Watch Series 9",   cat: "Wearables",   current: 399,  cost: 195, compAvg: 429,  aiRec: 419,  units: 188, trend: "up"     as const },
  { id: 6, sku: "CAM-ZFC",    name: "Nikon Z fc",              cat: "Cameras",     current: 849,  cost: 520, compAvg: 799,  aiRec: 829,  units: 24,  trend: "down"   as const },
  { id: 7, sku: "GAME-PS5",   name: "PlayStation 5 Slim",      cat: "Gaming",      current: 449,  cost: 340, compAvg: 449,  aiRec: 444,  units: 93,  trend: "stable" as const },
  { id: 8, sku: "ROBOT-X8",   name: "Roomba Combo j9+",        cat: "Smart Home",  current: 699,  cost: 310, compAvg: 679,  aiRec: 689,  units: 67,  trend: "up"     as const },
];

const MONTHLY = [
  { m: "Jul", before: 4.2, after: 4.8 },
  { m: "Aug", before: 3.9, after: 4.5 },
  { m: "Sep", before: 4.8, after: 5.6 },
  { m: "Oct", before: 5.1, after: 6.0 },
  { m: "Nov", before: 6.8, after: 8.1 },
  { m: "Dec", before: 7.2, after: 8.9 },
];

export function PriceSenseDemo({ lang }: { lang: string }) {
  const [applied,   setApplied]   = useState<Set<number>>(new Set());
  const [allApplied,setAllApplied]= useState(false);
  const [selected,  setSelected]  = useState<typeof PRODUCTS[0] | null>(null);
  const isUk = lang === "uk";

  const effectiveApplied = allApplied ? new Set(PRODUCTS.map(p => p.id)) : applied;

  const extraRev = PRODUCTS.reduce((s, p) => (
    effectiveApplied.has(p.id) ? s + (p.aiRec - p.current) * p.units : s
  ), 0);

  const toggle = (id: number) => {
    setApplied(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };
  const applyAll = () => { setAllApplied(true); setApplied(new Set(PRODUCTS.map(p => p.id))); };

  const maxRev = Math.max(...MONTHLY.map(r => r.after));

  return (
    <div className="min-h-screen bg-emerald-50/30 dark:bg-neutral-950 font-sans text-neutral-900 dark:text-white">

      {/* ── HEADER ── */}
      <header className="h-14 bg-white dark:bg-neutral-900 border-b border-emerald-100 dark:border-neutral-800 flex items-center px-5 gap-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white text-[11px] font-black">PS</div>
          <span className="font-black text-lg tracking-tight">PriceSense</span>
          <span className="text-emerald-500 text-xs font-semibold">AI Dynamic Pricing</span>
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-3">
          {extraRev > 0 && (
            <div className="px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
              +£{extraRev.toLocaleString()} {isUk ? "дод. виручка" : "extra revenue"}
            </div>
          )}
          <button
            onClick={applyAll}
            disabled={allApplied}
            className="px-4 py-1.5 rounded-xl bg-emerald-600 text-white font-semibold text-xs hover:bg-emerald-700 disabled:opacity-60 transition-colors whitespace-nowrap"
          >
            {allApplied
              ? (isUk ? "✓ Всі AI-ціни застосовано" : "✓ All AI prices applied")
              : (isUk ? "⚡ Застосувати всі AI ціни" : "⚡ Apply All AI Prices")}
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-5 space-y-5">

        {/* KPI row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: isUk ? "SKU проаналізовано" : "SKUs analysed",     value: "50,142", sub: isUk ? "12 категорій" : "12 categories",      color: "text-emerald-600" },
            { label: isUk ? "Рекомендацій AI"    : "AI recommendations", value: "48,931", sub: "97.6% coverage",                             color: "text-violet-600"  },
            { label: isUk ? "Маржа (зараз)"      : "Avg margin (now)",   value: "31.4%",  sub: isUk ? "AI ціль: 37.2%" : "AI target: 37.2%", color: "text-amber-600"   },
            { label: isUk ? "Оновлення ціни"     : "Price refresh",      value: isUk ? "Щогодини" : "Hourly", sub: isUk ? "автоматично" : "automated", color: "text-sky-600" },
          ].map(k => (
            <div key={k.label} className="bg-white dark:bg-neutral-900 rounded-2xl border border-emerald-100 dark:border-neutral-800 p-5">
              <div className="text-xs text-neutral-400 dark:text-neutral-500 mb-1">{k.label}</div>
              <div className={`text-2xl font-black ${k.color}`}>{k.value}</div>
              <div className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">{k.sub}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_270px] gap-5">

          {/* Product table */}
          <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-emerald-100 dark:border-neutral-800 overflow-hidden">
            <div className="px-5 py-4 border-b border-emerald-50 dark:border-neutral-800 flex items-center justify-between">
              <h2 className="font-bold text-neutral-900 dark:text-white">
                {isUk ? "Продукти — рекомендації AI" : "Products — AI Price Recommendations"}
              </h2>
              <span className="text-xs text-neutral-400">{isUk ? "Клікніть рядок для деталей" : "Click row for details"}</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-emerald-50/50 dark:bg-neutral-800/40">
                    {[
                      isUk ? "Назва"           : "Product",
                      isUk ? "Поточна"         : "Current £",
                      isUk ? "Конкурент"       : "Comp avg £",
                      isUk ? "AI рекомендація" : "AI Rec £",
                      isUk ? "Маржа AI"        : "AI Margin",
                      isUk ? "Тренд"           : "Trend",
                      isUk ? "Дія"             : "Action",
                    ].map(h => (
                      <th key={h} className="px-3 py-3 text-left text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-50 dark:divide-neutral-800">
                  {PRODUCTS.map(p => {
                    const isApp   = effectiveApplied.has(p.id);
                    const diff    = p.aiRec - p.current;
                    const aiMargin = Math.round(((p.aiRec - p.cost) / p.aiRec) * 100);
                    return (
                      <tr
                        key={p.id}
                        onClick={() => setSelected(prev => prev?.id === p.id ? null : p)}
                        className={`cursor-pointer hover:bg-emerald-50/20 dark:hover:bg-neutral-800/20 transition-colors ${selected?.id === p.id ? "bg-emerald-50/40 dark:bg-neutral-800/40" : ""}`}
                      >
                        <td className="px-3 py-3">
                          <div className="font-medium text-neutral-900 dark:text-white truncate max-w-[150px]">{p.name}</div>
                          <div className="text-[10px] text-neutral-400 dark:text-neutral-500">{p.cat}</div>
                        </td>
                        <td className="px-3 py-3 tabular-nums font-medium">£{p.current}</td>
                        <td className="px-3 py-3 tabular-nums text-neutral-500 dark:text-neutral-400">£{p.compAvg}</td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-1.5">
                            <span className={`font-bold tabular-nums ${isApp ? "text-emerald-600" : "text-neutral-900 dark:text-white"}`}>£{p.aiRec}</span>
                            <span className={`text-[10px] font-bold ${diff > 0 ? "text-emerald-500" : diff < 0 ? "text-red-400" : "text-neutral-400"}`}>
                              {diff > 0 ? `+${diff}` : diff < 0 ? String(diff) : "="}
                            </span>
                          </div>
                        </td>
                        <td className="px-3 py-3 tabular-nums">
                          <span className={`font-semibold ${aiMargin >= 35 ? "text-emerald-600" : aiMargin >= 25 ? "text-amber-600" : "text-red-400"}`}>{aiMargin}%</span>
                        </td>
                        <td className="px-3 py-3 text-base">{p.trend === "up" ? "📈" : p.trend === "down" ? "📉" : "➡️"}</td>
                        <td className="px-3 py-3">
                          <button
                            onClick={e => { e.stopPropagation(); toggle(p.id); }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                              isApp
                                ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                                : "bg-emerald-600 text-white hover:bg-emerald-700"
                            }`}
                          >
                            {isApp ? "✓ Applied" : "Apply"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right column: chart + detail */}
          <div className="space-y-4">

            {/* Revenue chart */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-emerald-100 dark:border-neutral-800 p-5">
              <div className="text-xs text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-4">
                {isUk ? "Виручка (£M) — до/після AI" : "Revenue (£M) — before / after AI"}
              </div>
              <div className="space-y-2.5">
                {MONTHLY.map(r => (
                  <div key={r.m}>
                    <div className="flex justify-between text-[10px] text-neutral-400 dark:text-neutral-500 mb-0.5">
                      <span>{r.m}</span>
                      <span className="text-emerald-500 font-semibold">+{Math.round((r.after - r.before) / r.before * 100)}%</span>
                    </div>
                    <div className="space-y-0.5">
                      <div className="h-2 bg-slate-100 dark:bg-neutral-800 rounded overflow-hidden">
                        <div className="h-full bg-slate-300 dark:bg-neutral-600 rounded" style={{ width: `${(r.before / maxRev) * 100}%` }} />
                      </div>
                      <div className="h-2 bg-emerald-50 dark:bg-neutral-800 rounded overflow-hidden">
                        <div className="h-full bg-emerald-400 rounded" style={{ width: `${(r.after / maxRev) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex gap-3 text-[10px] text-neutral-400 dark:text-neutral-500">
                <span className="flex items-center gap-1"><span className="w-3 h-1.5 rounded bg-slate-300 dark:bg-neutral-600 inline-block" />{isUk ? "До AI" : "Before AI"}</span>
                <span className="flex items-center gap-1"><span className="w-3 h-1.5 rounded bg-emerald-400 inline-block" />{isUk ? "З AI" : "With AI"}</span>
              </div>
            </div>

            {/* Selected product detail */}
            {selected && (
              <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-emerald-100 dark:border-neutral-800 p-5">
                <div className="text-xs text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-2">{isUk ? "Аналіз продукту" : "Product Analysis"}</div>
                <div className="font-bold text-neutral-900 dark:text-white mb-0.5">{selected.name}</div>
                <div className="text-xs text-neutral-400 dark:text-neutral-500 mb-4">{selected.units} {isUk ? "одиниць/міс" : "units/month"}</div>
                <div className="space-y-2 text-sm">
                  {[
                    { label: isUk ? "Собівартість"     : "Cost",          value: `£${selected.cost}`,    color: "text-neutral-600 dark:text-neutral-300" },
                    { label: isUk ? "Поточна ціна"     : "Current price",  value: `£${selected.current}`, color: "text-neutral-600 dark:text-neutral-300" },
                    { label: isUk ? "Сер. конкурентів" : "Competitor avg", value: `£${selected.compAvg}`, color: "text-sky-500" },
                    { label: isUk ? "AI рекомендація"  : "AI Recommend",   value: `£${selected.aiRec}`,   color: "text-emerald-600 font-bold" },
                    { label: isUk ? "Маржа (AI)"       : "Margin (AI)",    value: `${Math.round(((selected.aiRec - selected.cost) / selected.aiRec) * 100)}%`, color: "text-emerald-600 font-bold" },
                    { label: isUk ? "Дод. виручка/міс" : "Extra rev/month",value: `+£${((selected.aiRec - selected.current) * selected.units).toLocaleString()}`, color: "text-emerald-600 font-bold" },
                  ].map(r => (
                    <div key={r.label} className="flex justify-between">
                      <span className="text-neutral-500 dark:text-neutral-400">{r.label}</span>
                      <span className={r.color}>{r.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* How it works */}
            {!selected && (
              <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-100 dark:border-emerald-900/30 p-5">
                <div className="text-xs font-bold uppercase text-emerald-600 dark:text-emerald-400 tracking-wide mb-2">
                  {isUk ? "Як це працює" : "How it works"}
                </div>
                <div className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
                  <div>📊 {isUk ? "LightGBM аналізує 30+ факторів" : "LightGBM analyses 30+ features"}</div>
                  <div>🔍 {isUk ? "Парсер цін конкурентів (real-time)" : "Competitor price scraper (real-time)"}</div>
                  <div>⚡ {isUk ? "Оновлення раз на годину" : "Price update every hour"}</div>
                  <div>📈 {isUk ? "MLflow для версіонування моделей" : "MLflow for model versioning"}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
