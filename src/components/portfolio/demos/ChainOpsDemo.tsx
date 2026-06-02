"use client";
import { useState } from "react";

const VENUES = [
  { id: 1, name: "Deansgate", covers: 84, revenue: "£3,420", foodCost: "28%", waste: "£82", staff: 9, status: "open" },
  { id: 2, name: "Spinningfields", covers: 112, revenue: "£4,810", foodCost: "31%", waste: "£124", staff: 12, status: "open" },
  { id: 3, name: "Northern Quarter", covers: 56, revenue: "£2,190", foodCost: "27%", waste: "£48", staff: 7, status: "open" },
  { id: 4, name: "Salford Quays", covers: 98, revenue: "£3,940", foodCost: "29%", waste: "£96", staff: 10, status: "open" },
  { id: 5, name: "Didsbury", covers: 64, revenue: "£2,640", foodCost: "33%", waste: "£138", staff: 8, status: "alert" },
  { id: 6, name: "Chorlton", covers: 48, revenue: "£1,920", foodCost: "26%", waste: "£42", staff: 6, status: "open" },
  { id: 7, name: "Ancoats", covers: 72, revenue: "£2,880", foodCost: "30%", waste: "£88", staff: 9, status: "open" },
  { id: 8, name: "Media City", covers: 88, revenue: "£3,540", foodCost: "29%", waste: "£72", staff: 11, status: "open" },
];

const ROTA = [
  { name: "Alice M.", role: "Chef", mon: true, tue: true, wed: false, thu: true, fri: true, sat: true, sun: false, hours: 40 },
  { name: "Ben W.", role: "Sous Chef", mon: false, tue: true, wed: true, thu: true, fri: true, sat: true, sun: true, hours: 42 },
  { name: "Clara T.", role: "Floor", mon: true, tue: false, wed: true, thu: false, fri: true, sat: true, sun: true, hours: 35 },
  { name: "Dan K.", role: "Floor", mon: true, tue: true, wed: true, thu: true, fri: false, sat: false, sun: true, hours: 37 },
  { name: "Eve S.", role: "Bar", mon: false, tue: false, wed: true, thu: true, fri: true, sat: true, sun: true, hours: 38 },
];

const INVENTORY = [
  { item: "Chicken Breast (kg)", current: 12, par: 20, status: "low" },
  { item: "Salmon Fillet (kg)", current: 8, par: 15, status: "low" },
  { item: "Beef Mince (kg)", current: 24, par: 18, status: "ok" },
  { item: "Mixed Salad (kg)", current: 3, par: 10, status: "low" },
  { item: "Olive Oil (5L)", current: 6, par: 4, status: "ok" },
  { item: "Pasta (kg)", current: 18, par: 12, status: "ok" },
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function ChainOpsDemo({ lang }: { lang: string }) {
  const [view, setView] = useState<"venues" | "rota" | "inventory" | "pl">("venues");
  const [selectedVenue, setSelectedVenue] = useState<number | null>(null);
  const isUk = lang === "uk";

  const totalRevenue = VENUES.reduce((s, v) => s + parseFloat(v.revenue.replace("£", "").replace(",", "")), 0);

  return (
    <div className="min-h-screen bg-orange-50 dark:bg-neutral-950 font-sans">
      {/* Header — warm restaurant branding */}
      <header className="bg-white dark:bg-neutral-900 border-b-4 border-orange-500 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-orange-500 rounded-lg flex items-center justify-center text-white text-lg">🍽️</div>
          <div>
            <div className="font-bold text-neutral-900 dark:text-white text-base leading-none">ChainOps</div>
            <div className="text-xs text-orange-500 font-medium">8 Venues · Manchester Group</div>
          </div>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <div className="text-center">
            <div className="font-bold text-neutral-900 dark:text-white">£{totalRevenue.toLocaleString()}</div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400">{isUk ? "Виручка сьогодні" : "Revenue today"}</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-orange-600">29%</div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400">{isUk ? "Середній food cost" : "Avg food cost"}</div>
          </div>
          <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center text-sm">👤</div>
        </div>
      </header>

      {/* Tab bar */}
      <div className="bg-white dark:bg-neutral-900 px-6 flex gap-0 border-b border-neutral-100 dark:border-neutral-800">
        {([
          { id: "venues", icon: "🗺️", label: isUk ? "Точки" : "Venues" },
          { id: "rota", icon: "📅", label: isUk ? "Графік" : "Rota" },
          { id: "inventory", icon: "🥩", label: isUk ? "Запаси" : "Inventory" },
          { id: "pl", icon: "📊", label: "P&L" },
        ] as const).map(t => (
          <button
            key={t.id}
            onClick={() => setView(t.id)}
            className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium transition-colors border-b-2 ${
              view === t.id
                ? "border-orange-500 text-orange-600 dark:text-orange-400"
                : "border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
            }`}
          >
            <span>{t.icon}</span> {t.label}
          </button>
        ))}
      </div>

      <main className="p-6 max-w-6xl mx-auto">

        {/* VENUES GRID */}
        {view === "venues" && (
          <div>
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">
              {isUk ? "Всі точки — сьогодні" : "All venues — today"}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {VENUES.map(v => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVenue(selectedVenue === v.id ? null : v.id)}
                  className={`text-left rounded-2xl p-4 border-2 transition-all ${
                    selectedVenue === v.id
                      ? "border-orange-400 bg-orange-50 dark:bg-orange-900/20 shadow-md"
                      : v.status === "alert"
                      ? "border-red-200 dark:border-red-800 bg-white dark:bg-neutral-800 hover:border-orange-300"
                      : "border-neutral-100 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-orange-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-neutral-900 dark:text-white text-sm">{v.name}</span>
                    {v.status === "alert"
                      ? <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      : <span className="w-2 h-2 bg-emerald-400 rounded-full" />}
                  </div>
                  <div className="space-y-1">
                    <div className="text-xl font-bold text-orange-600">{v.revenue}</div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400">{v.covers} {isUk ? "кавери" : "covers"}</div>
                    <div className={`text-xs font-medium ${parseFloat(v.foodCost) > 30 ? "text-red-500" : "text-emerald-600"}`}>
                      Food cost: {v.foodCost}
                    </div>
                  </div>
                </button>
              ))}
            </div>
            {selectedVenue && (() => {
              const v = VENUES.find(x => x.id === selectedVenue)!;
              return (
                <div className="mt-4 bg-white dark:bg-neutral-800 rounded-2xl border border-orange-200 dark:border-orange-800/50 p-5">
                  <h3 className="font-bold text-neutral-900 dark:text-white mb-3">📍 {v.name} — {isUk ? "Деталі" : "Details"}</h3>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div><div className="text-neutral-400 dark:text-neutral-500 text-xs">{isUk ? "Виручка" : "Revenue"}</div><div className="font-bold text-neutral-900 dark:text-white">{v.revenue}</div></div>
                    <div><div className="text-neutral-400 dark:text-neutral-500 text-xs">Food cost</div><div className={`font-bold ${parseFloat(v.foodCost) > 30 ? "text-red-500" : "text-emerald-600"}`}>{v.foodCost}</div></div>
                    <div><div className="text-neutral-400 dark:text-neutral-500 text-xs">{isUk ? "Списання" : "Waste"}</div><div className="font-bold text-neutral-900 dark:text-white">{v.waste}</div></div>
                    <div><div className="text-neutral-400 dark:text-neutral-500 text-xs">{isUk ? "Персонал" : "Staff"}</div><div className="font-bold text-neutral-900 dark:text-white">{v.staff} {isUk ? "ос." : "ppl"}</div></div>
                    <div><div className="text-neutral-400 dark:text-neutral-500 text-xs">{isUk ? "Кавери" : "Covers"}</div><div className="font-bold text-neutral-900 dark:text-white">{v.covers}</div></div>
                    <div><div className="text-neutral-400 dark:text-neutral-500 text-xs">{isUk ? "Статус" : "Status"}</div><div className={`font-bold ${v.status === "alert" ? "text-red-500" : "text-emerald-500"}`}>{v.status === "alert" ? "⚠️ Alert" : "✅ OK"}</div></div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ROTA */}
        {view === "rota" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white">
                {isUk ? "Графік персоналу — тиждень 23" : "Staff Rota — Week 23"} · Deansgate
              </h2>
              <button className="bg-orange-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                💾 {isUk ? "Зберегти ротацію" : "Save Rota"}
              </button>
            </div>
            <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-100 dark:border-neutral-700 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-orange-50 dark:bg-orange-900/20">
                  <tr>
                    <th className="px-4 py-3 text-left text-neutral-600 dark:text-neutral-300 font-semibold">{isUk ? "Ім'я" : "Name"}</th>
                    <th className="px-4 py-3 text-left text-neutral-500 dark:text-neutral-400 font-medium text-xs">{isUk ? "Посада" : "Role"}</th>
                    {DAYS.map(d => <th key={d} className="px-2 py-3 text-center text-neutral-500 dark:text-neutral-400 font-medium text-xs w-12">{d}</th>)}
                    <th className="px-4 py-3 text-center text-neutral-500 dark:text-neutral-400 font-medium text-xs">{isUk ? "Год." : "Hrs"}</th>
                  </tr>
                </thead>
                <tbody>
                  {ROTA.map(r => (
                    <tr key={r.name} className="border-t border-neutral-50 dark:border-neutral-700/50 hover:bg-orange-50/50 dark:hover:bg-orange-900/10">
                      <td className="px-4 py-3 font-semibold text-neutral-900 dark:text-white">{r.name}</td>
                      <td className="px-4 py-3 text-xs text-neutral-500 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-700/30">{r.role}</td>
                      {[r.mon, r.tue, r.wed, r.thu, r.fri, r.sat, r.sun].map((on, i) => (
                        <td key={i} className="px-2 py-3 text-center">
                          <div className={`w-7 h-7 rounded-lg mx-auto flex items-center justify-center text-xs font-bold ${
                            on ? "bg-orange-500 text-white" : "bg-neutral-100 dark:bg-neutral-700 text-neutral-300 dark:text-neutral-600"
                          }`}>{on ? "✓" : "–"}</div>
                        </td>
                      ))}
                      <td className="px-4 py-3 text-center">
                        <span className={`font-bold text-sm ${r.hours > 40 ? "text-red-500" : "text-neutral-900 dark:text-white"}`}>{r.hours}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-4 py-3 bg-orange-50 dark:bg-orange-900/10 text-xs text-neutral-500 dark:text-neutral-400 flex gap-4">
                <span>📋 Total hours this week: <strong className="text-neutral-900 dark:text-white">192h</strong></span>
                <span className="text-amber-600">⚠️ Ben W. at overtime (42h)</span>
              </div>
            </div>
          </div>
        )}

        {/* INVENTORY */}
        {view === "inventory" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white">{isUk ? "Запаси кухні — всі точки" : "Kitchen Inventory — all venues"}</h2>
              <button className="bg-orange-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                + {isUk ? "Замовити постачальнику" : "Raise PO"}
              </button>
            </div>
            <div className="space-y-2">
              {INVENTORY.map(i => (
                <div key={i.item} className={`bg-white dark:bg-neutral-800 rounded-xl border p-4 flex items-center justify-between ${
                  i.status === "low" ? "border-red-200 dark:border-red-800/50" : "border-neutral-100 dark:border-neutral-700"
                }`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-10 rounded-full ${i.status === "low" ? "bg-red-400" : "bg-emerald-400"}`} />
                    <div>
                      <div className="font-semibold text-neutral-900 dark:text-white">{i.item}</div>
                      <div className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5">
                        PAR level: {i.par} · {isUk ? "Залишок" : "Current"}: {i.current}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32">
                      <div className="h-2 bg-neutral-100 dark:bg-neutral-700 rounded-full overflow-hidden">
                        <div
                          className={`h-2 rounded-full transition-all ${i.status === "low" ? "bg-red-400" : "bg-emerald-400"}`}
                          style={{ width: `${Math.min(100, (i.current / i.par) * 100)}%` }}
                        />
                      </div>
                      <div className="text-xs text-neutral-400 dark:text-neutral-500 mt-1 text-right">{Math.round((i.current / i.par) * 100)}% of PAR</div>
                    </div>
                    {i.status === "low" && (
                      <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-1 rounded-lg font-medium">
                        {isUk ? "Замовити" : "Order now"}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* P&L */}
        {view === "pl" && (
          <div>
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">
              P&L {isUk ? "зведення — сьогодні" : "Summary — today"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {VENUES.slice(0, 4).map(v => {
                const rev = parseFloat(v.revenue.replace("£", "").replace(",", ""));
                const food = rev * (parseFloat(v.foodCost) / 100);
                const labour = rev * 0.28;
                const profit = rev - food - labour - 180;
                const margin = ((profit / rev) * 100).toFixed(1);
                return (
                  <div key={v.id} className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-100 dark:border-neutral-700 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-neutral-900 dark:text-white">{v.name}</span>
                      <span className={`text-sm font-bold ${parseFloat(margin) > 20 ? "text-emerald-600" : "text-amber-600"}`}>
                        {margin}% {isUk ? "маржа" : "margin"}
                      </span>
                    </div>
                    {[
                      { label: isUk ? "Виручка" : "Revenue", val: rev, color: "bg-emerald-400" },
                      { label: "Food cost", val: food, color: "bg-orange-400" },
                      { label: isUk ? "Зарплата" : "Labour", val: labour, color: "bg-blue-400" },
                      { label: isUk ? "Накладні" : "Overheads", val: 180, color: "bg-neutral-300 dark:bg-neutral-500" },
                    ].map(row => (
                      <div key={row.label} className="flex items-center justify-between text-sm py-1">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${row.color}`} />
                          <span className="text-neutral-600 dark:text-neutral-300">{row.label}</span>
                        </div>
                        <span className="font-medium text-neutral-900 dark:text-white">£{row.val.toFixed(0)}</span>
                      </div>
                    ))}
                    <div className="border-t border-neutral-100 dark:border-neutral-700 mt-2 pt-2 flex justify-between">
                      <span className="font-bold text-neutral-900 dark:text-white text-sm">{isUk ? "Прибуток" : "Profit"}</span>
                      <span className={`font-bold text-sm ${profit > 0 ? "text-emerald-600" : "text-red-500"}`}>
                        £{profit.toFixed(0)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
