"use client";

import { useState } from "react";
import { TrendingUp, TrendingDown, Users, MousePointerClick, ShoppingCart, DollarSign, Calendar } from "lucide-react";

interface Props {
  variant?: string;
  isUk: boolean;
}

const RANGES = [
  { id: "7d", labelEn: "Last 7 days", labelUk: "Останні 7 днів" },
  { id: "30d", labelEn: "Last 30 days", labelUk: "Останні 30 днів" },
  { id: "90d", labelEn: "Last 90 days", labelUk: "Останні 90 днів" },
];

const KPIS = {
  "7d": [
    { key: "users", icon: Users, labelEn: "Users", labelUk: "Користувачі", value: "12,847", delta: 8.4, color: "text-indigo-600", bg: "bg-indigo-50" },
    { key: "sessions", icon: MousePointerClick, labelEn: "Sessions", labelUk: "Сесії", value: "18,492", delta: 12.1, color: "text-violet-600", bg: "bg-violet-50" },
    { key: "conv", icon: ShoppingCart, labelEn: "Conversions", labelUk: "Конверсії", value: "412", delta: -3.2, color: "text-rose-600", bg: "bg-rose-50" },
    { key: "revenue", icon: DollarSign, labelEn: "Revenue", labelUk: "Дохід", value: "£42,180", delta: 18.7, color: "text-emerald-600", bg: "bg-emerald-50" },
  ],
  "30d": [
    { key: "users", icon: Users, labelEn: "Users", labelUk: "Користувачі", value: "48,392", delta: 14.2, color: "text-indigo-600", bg: "bg-indigo-50" },
    { key: "sessions", icon: MousePointerClick, labelEn: "Sessions", labelUk: "Сесії", value: "72,184", delta: 22.5, color: "text-violet-600", bg: "bg-violet-50" },
    { key: "conv", icon: ShoppingCart, labelEn: "Conversions", labelUk: "Конверсії", value: "1,847", delta: 6.8, color: "text-emerald-600", bg: "bg-emerald-50" },
    { key: "revenue", icon: DollarSign, labelEn: "Revenue", labelUk: "Дохід", value: "£189,420", delta: 28.3, color: "text-emerald-600", bg: "bg-emerald-50" },
  ],
  "90d": [
    { key: "users", icon: Users, labelEn: "Users", labelUk: "Користувачі", value: "142,180", delta: 32.1, color: "text-indigo-600", bg: "bg-indigo-50" },
    { key: "sessions", icon: MousePointerClick, labelEn: "Sessions", labelUk: "Сесії", value: "218,492", delta: 41.6, color: "text-violet-600", bg: "bg-violet-50" },
    { key: "conv", icon: ShoppingCart, labelEn: "Conversions", labelUk: "Конверсії", value: "5,892", delta: 18.4, color: "text-emerald-600", bg: "bg-emerald-50" },
    { key: "revenue", icon: DollarSign, labelEn: "Revenue", labelUk: "Дохід", value: "£612,840", delta: 45.2, color: "text-emerald-600", bg: "bg-emerald-50" },
  ],
};

// Generate sparkline data per range
const SPARKLINES: Record<string, number[]> = {
  "7d": [40, 55, 45, 70, 62, 80, 85],
  "30d": [30, 35, 45, 40, 55, 65, 60, 70, 75, 68, 80, 82, 85, 78, 90, 88, 95, 92, 100, 98],
  "90d": [20, 25, 30, 35, 32, 40, 45, 42, 55, 60, 65, 62, 70, 75, 72, 80, 78, 85, 82, 88, 92, 90, 95, 100],
};

const SOURCES = [
  { name: "Google Organic", value: 42, color: "bg-blue-500" },
  { name: "Direct", value: 24, color: "bg-emerald-500" },
  { name: "Facebook", value: 16, color: "bg-indigo-500" },
  { name: "Email", value: 10, color: "bg-amber-500" },
  { name: "Other", value: 8, color: "bg-neutral-400" },
];

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - ((v - min) / range) * 100;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-12">
      <polyline points={points} fill="none" stroke="currentColor" strokeWidth="2" className={color} />
    </svg>
  );
}

export function AnalyticsLookerDemo({ isUk }: Props) {
  const [range, setRange] = useState<keyof typeof KPIS>("7d");
  const kpis = KPIS[range];
  const sparkline = SPARKLINES[range];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h3 className="text-lg font-bold text-neutral-900">
          {isUk ? "Аналітичний дашборд" : "Analytics Dashboard"}
        </h3>
        <div className="flex gap-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 p-1">
          {RANGES.map((r) => (
            <button
              key={r.id}
              onClick={() => setRange(r.id as keyof typeof KPIS)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                range === r.id ? "bg-white text-neutral-900 dark:text-white shadow-sm" : "text-neutral-500"
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              {isUk ? r.labelUk : r.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {kpis.map((k) => {
          const Icon = k.icon;
          const positive = k.delta >= 0;
          return (
            <div key={k.key} className={`rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-4`}>
              <div className="flex items-center justify-between mb-3">
                <div className={`w-9 h-9 rounded-lg ${k.bg} ${k.color} flex items-center justify-center`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className={`flex items-center gap-0.5 text-xs font-semibold tabular-nums ${positive ? "text-emerald-600" : "text-rose-600"}`}>
                  {positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {Math.abs(k.delta).toFixed(1)}%
                </span>
              </div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">{isUk ? k.labelUk : k.labelEn}</div>
              <div className="text-2xl font-bold text-neutral-900 dark:text-white tabular-nums">{k.value}</div>
            </div>
          );
        })}
      </div>

      {/* Main chart */}
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white p-5">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-bold text-neutral-900">{isUk ? "Сесії за період" : "Sessions over time"}</h4>
          <span className="text-xs text-neutral-500">{isUk ? "Live дані" : "Live data"}</span>
        </div>
        <div className="text-indigo-500">
          <Sparkline data={sparkline} color="text-indigo-500" />
        </div>
        <div className="flex items-center justify-between mt-2 text-xs text-neutral-400">
          <span>{range === "7d" ? "Mon" : range === "30d" ? "Day 1" : "Week 1"}</span>
          <span>{isUk ? "Сьогодні" : "Today"}</span>
        </div>
      </div>

      {/* Traffic sources */}
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white p-5">
        <h4 className="font-bold text-neutral-900 dark:text-white mb-4">{isUk ? "Джерела трафіку" : "Traffic sources"}</h4>
        <div className="space-y-3">
          {SOURCES.map((s) => (
            <div key={s.name}>
              <div className="flex items-center justify-between mb-1.5 text-sm">
                <span className="text-neutral-700">{s.name}</span>
                <span className="font-semibold text-neutral-900 dark:text-white tabular-nums">{s.value}%</span>
              </div>
              <div className="h-2 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                <div
                  className={`h-full ${s.color} rounded-full transition-all duration-700`}
                  style={{ width: `${s.value}%` }}
                  role="progressbar"
                  aria-valuenow={s.value}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${s.name}: ${s.value}%`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-sm text-neutral-500">
        {isUk
          ? "Production: Looker Studio + GA4 + BigQuery export. Custom embed на сайті або щотижневий email-звіт."
          : "Production: Looker Studio + GA4 + BigQuery export. Custom embed on site or weekly email reports."}
      </p>
    </div>
  );
}
