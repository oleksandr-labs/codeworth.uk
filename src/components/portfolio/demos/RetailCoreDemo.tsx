"use client";
import { useState } from "react";

const STORES = [
  { name: "Oxford St", rev: 18.4, st: 74 }, { name: "Canary Wharf", rev: 14.2, st: 68 },
  { name: "Westfield W12", rev: 22.1, st: 81 }, { name: "Covent Gdn", rev: 16.8, st: 77 },
  { name: "Shoreditch", rev: 11.4, st: 62 }, { name: "Westfield E20", rev: 19.6, st: 79 },
  { name: "Kings Road", rev: 13.8, st: 71 }, { name: "Brent Cross", rev: 12.4, st: 65 },
  { name: "Kingston", rev: 10.2, st: 60 }, { name: "Bluewater", rev: 15.6, st: 76 },
  { name: "Lakeside", rev: 14.9, st: 73 }, { name: "Webshop", rev: 38.4, st: 88 },
];

const CATEGORIES = [
  { name: "Knitwear", pct: 24, colour: "#8b5cf6" },
  { name: "Jackets", pct: 19, colour: "#ec4899" },
  { name: "Dresses", pct: 18, colour: "#f59e0b" },
  { name: "Trousers", pct: 16, colour: "#10b981" },
  { name: "T-shirts", pct: 14, colour: "#3b82f6" },
  { name: "Accessories", pct: 9, colour: "#64748b" },
];

const SALES_7D = [142, 168, 155, 189, 174, 212, 228];

function heatColour(st: number) {
  if (st >= 78) return "bg-violet-600";
  if (st >= 72) return "bg-violet-500";
  if (st >= 66) return "bg-violet-400";
  if (st >= 62) return "bg-amber-400";
  return "bg-red-400";
}

export function RetailCoreDemo({ lang }: { lang: string }) {
  const [period, setPeriod] = useState<"today" | "week" | "month">("today");
  const isUk = lang === "uk";
  const totalRev = STORES.reduce((s, v) => s + v.rev, 0);
  const maxSale = Math.max(...SALES_7D);

  // donut stroke calc
  let cumulative = 0;
  const circumference = 2 * Math.PI * 42;

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-white dark:from-neutral-950 dark:to-neutral-900 font-sans text-neutral-900 dark:text-white p-6">
      <div className="max-w-6xl mx-auto">

        {/* ── HEADER ROW ── */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black tracking-tight">RetailCore <span className="text-violet-500 font-medium text-sm">Analytics</span></h1>
            <p className="text-sm text-neutral-400 dark:text-neutral-500">12 stores + webshop · London fashion group</p>
          </div>
          <div className="flex bg-white dark:bg-neutral-800 rounded-xl border border-violet-100 dark:border-neutral-700 p-1">
            {(["today", "week", "month"] as const).map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${
                  period === p ? "bg-violet-600 text-white" : "text-neutral-500 dark:text-neutral-400 hover:text-violet-600"
                }`}
              >
                {isUk ? (p === "today" ? "Сьогодні" : p === "week" ? "Тиждень" : "Місяць") : p}
              </button>
            ))}
          </div>
        </div>

        {/* ── BIG NUMBER + SPARK ROW ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          {/* Hero revenue with bar chart */}
          <div className="lg:col-span-2 bg-white dark:bg-neutral-800 rounded-3xl border border-violet-100 dark:border-neutral-700 p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="text-xs text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">{isUk ? "Виручка групи" : "Group Revenue"}</div>
                <div className="text-4xl font-black mt-1">£{totalRev.toFixed(1)}k</div>
                <div className="text-sm text-emerald-500 font-semibold mt-1">↑ 9.2% {isUk ? "vs минулий тиждень" : "vs last week"}</div>
              </div>
              <div className="text-right text-xs space-y-1">
                <div className="text-neutral-400 dark:text-neutral-500">{isUk ? "Сер. чек" : "Avg basket"}: <span className="font-bold text-neutral-700 dark:text-neutral-200">£68</span></div>
                <div className="text-neutral-400 dark:text-neutral-500">{isUk ? "Конверсія" : "Conversion"}: <span className="font-bold text-neutral-700 dark:text-neutral-200">24%</span></div>
                <div className="text-neutral-400 dark:text-neutral-500">{isUk ? "Транзакції" : "Transactions"}: <span className="font-bold text-neutral-700 dark:text-neutral-200">3,140</span></div>
              </div>
            </div>
            {/* 7-day bar chart */}
            <div className="flex items-end gap-2 h-28">
              {SALES_7D.map((v, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5 group">
                  <div className="w-full bg-violet-100 dark:bg-neutral-700 rounded-t-lg relative overflow-hidden" style={{ height: `${(v / maxSale) * 100}%` }}>
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-violet-600 to-violet-400 rounded-t-lg" style={{ height: i === 6 ? "100%" : "70%" }} />
                  </div>
                  <span className="text-[10px] text-neutral-400 dark:text-neutral-500">{["M","T","W","T","F","S","S"][i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Donut category mix */}
          <div className="bg-white dark:bg-neutral-800 rounded-3xl border border-violet-100 dark:border-neutral-700 p-6">
            <div className="text-xs text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-3">{isUk ? "Категорії" : "Category mix"}</div>
            <div className="flex items-center gap-4">
              <svg viewBox="0 0 100 100" className="w-28 h-28 -rotate-90 shrink-0">
                {CATEGORIES.map(c => {
                  const dash = (c.pct / 100) * circumference;
                  const offset = -(cumulative / 100) * circumference;
                  cumulative += c.pct;
                  return (
                    <circle key={c.name} cx="50" cy="50" r="42" fill="none" stroke={c.colour} strokeWidth="14"
                      strokeDasharray={`${dash} ${circumference}`} strokeDashoffset={offset} />
                  );
                })}
              </svg>
              <div className="space-y-1 flex-1">
                {CATEGORIES.map(c => (
                  <div key={c.name} className="flex items-center gap-2 text-xs">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: c.colour }} />
                    <span className="text-neutral-600 dark:text-neutral-300 flex-1">{c.name}</span>
                    <span className="font-bold tabular-nums">{c.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── STORE HEATMAP ── */}
        <div className="bg-white dark:bg-neutral-800 rounded-3xl border border-violet-100 dark:border-neutral-700 p-6 mb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">{isUk ? "Sell-through по точках" : "Sell-through heatmap"}</div>
            <div className="flex items-center gap-2 text-[10px] text-neutral-400 dark:text-neutral-500">
              <span>{isUk ? "Низький" : "Low"}</span>
              <div className="flex gap-0.5">
                {["bg-red-400","bg-amber-400","bg-violet-400","bg-violet-500","bg-violet-600"].map(c => <div key={c} className={`w-4 h-3 rounded-sm ${c}`} />)}
              </div>
              <span>{isUk ? "Високий" : "High"}</span>
            </div>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {STORES.map(s => (
              <div key={s.name} className={`${heatColour(s.st)} rounded-xl p-3 text-white relative overflow-hidden`}>
                <div className="text-[10px] font-medium opacity-90 truncate">{s.name}</div>
                <div className="text-lg font-black mt-1">{s.st}%</div>
                <div className="text-[9px] opacity-75">£{s.rev}k</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── MARKDOWN RECOMMENDATIONS STRIP ── */}
        <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-3xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-widest text-violet-200">{isUk ? "Markdown Engine" : "Markdown Engine"}</div>
              <div className="text-lg font-bold mt-0.5">{isUk ? "4 позиції рекомендовані до знижки" : "4 lines flagged for markdown"}</div>
              <div className="text-sm text-violet-200 mt-0.5">{isUk ? "Прогнозоване вивільнення капіталу: £4,820" : "Forecast capital released: £4,820"}</div>
            </div>
            <div className="flex gap-2">
              {[{ sku: "JKT-005", md: 20 }, { sku: "DRS-008", md: 30 }, { sku: "SWT-022", md: 25 }, { sku: "TRS-014", md: 15 }].map(m => (
                <div key={m.sku} className="bg-white/15 backdrop-blur rounded-xl px-3 py-2 text-center">
                  <div className="font-mono text-[10px] text-violet-100">{m.sku}</div>
                  <div className="font-black text-lg">−{m.md}%</div>
                </div>
              ))}
              <button className="bg-white text-violet-700 rounded-xl px-4 font-bold text-sm hover:bg-violet-50 transition-colors">
                {isUk ? "Застосувати" : "Apply all"} →
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
