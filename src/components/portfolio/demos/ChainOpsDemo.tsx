"use client";
import { useState } from "react";

const VENUES = [
  { id: 1, name: "Deansgate", covers: 84, rev: 3420, fc: 28, waste: 82, staff: 9, alert: false },
  { id: 2, name: "Spinningfields", covers: 112, rev: 4810, fc: 31, waste: 124, staff: 12, alert: false },
  { id: 3, name: "N. Quarter", covers: 56, rev: 2190, fc: 27, waste: 48, staff: 7, alert: false },
  { id: 4, name: "Salford Quays", covers: 98, rev: 3940, fc: 29, waste: 96, staff: 10, alert: false },
  { id: 5, name: "Didsbury", covers: 64, rev: 2640, fc: 34, waste: 138, staff: 8, alert: true },
  { id: 6, name: "Chorlton", covers: 48, rev: 1920, fc: 26, waste: 42, staff: 6, alert: false },
  { id: 7, name: "Ancoats", covers: 72, rev: 2880, fc: 30, waste: 88, staff: 9, alert: false },
  { id: 8, name: "Media City", covers: 88, rev: 3540, fc: 29, waste: 72, staff: 11, alert: false },
];

const INVENTORY = [
  { item: "Chicken Breast", unit: "kg", current: 12, par: 20 },
  { item: "Salmon Fillet", unit: "kg", current: 8, par: 15 },
  { item: "Beef Mince", unit: "kg", current: 24, par: 18 },
  { item: "Mixed Salad", unit: "kg", current: 3, par: 10 },
  { item: "Olive Oil", unit: "5L tin", current: 6, par: 4 },
];

const ALERTS = [
  { type: "waste", venue: "Didsbury", msg: "Food cost 34% — above 32% threshold", sev: "high" },
  { type: "stock", venue: "All venues", msg: "Mixed Salad: 3kg vs 10kg PAR", sev: "high" },
  { type: "stock", venue: "All venues", msg: "Salmon Fillet: 8kg vs 15kg PAR", sev: "med" },
  { type: "rota", venue: "Spinningfields", msg: "Ben W. reaches 48h — overtime risk", sev: "med" },
  { type: "sales", venue: "N. Quarter", msg: "Revenue 18% below target", sev: "low" },
];

export function ChainOpsDemo({ lang }: { lang: string }) {
  const [selected, setSelected] = useState(VENUES[0]);
  const isUk = lang === "uk";
  const totalRev = VENUES.reduce((s, v) => s + v.rev, 0);
  const totalWaste = VENUES.reduce((s, v) => s + v.waste, 0);

  const labour = selected.rev * 0.28;
  const food = selected.rev * (selected.fc / 100);
  const profit = selected.rev - labour - food - 220;

  return (
    <div className="h-screen bg-neutral-950 flex flex-col overflow-hidden font-sans text-white">

      {/* ── COMPACT HEADER STRIP ── */}
      <div className="flex items-center justify-between px-5 py-2.5 bg-neutral-900 border-b border-neutral-800 shrink-0">
        <div className="flex items-center gap-2">
          <span className="font-bold text-orange-400 tracking-tight">ChainOps</span>
          <span className="text-neutral-600 text-xs hidden sm:inline">Manchester Group · 8 venues</span>
        </div>
        <div className="flex items-center gap-3 sm:gap-5 text-xs">
          <div className="text-center"><div className="font-black text-orange-400">£{(totalRev / 1000).toFixed(1)}k</div><div className="text-neutral-600">{isUk ? "виручка" : "revenue"}</div></div>
          <div className="text-center hidden sm:block"><div className="font-black text-red-400">£{totalWaste}</div><div className="text-neutral-600">{isUk ? "списання" : "waste"}</div></div>
          <div className="text-center"><div className="font-black text-emerald-400">29%</div><div className="text-neutral-600">food cost</div></div>
          <div className="w-px h-6 bg-neutral-800 hidden sm:block" />
          <div className="flex items-center gap-1.5 text-emerald-400"><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" /><span className="hidden sm:inline">Live</span></div>
        </div>
      </div>

      {/* ── 3-COLUMN LAYOUT ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* COL 1 — Venue list (desktop) */}
        <div className="hidden md:block w-44 bg-neutral-900 border-r border-neutral-800 overflow-y-auto shrink-0">
          <div className="px-3 py-2 text-[10px] text-neutral-600 uppercase tracking-widest">{isUk ? "Точки" : "Venues"}</div>
          {VENUES.map(v => (
            <button
              key={v.id}
              onClick={() => setSelected(v)}
              className={`w-full text-left px-3 py-2.5 flex items-center justify-between hover:bg-neutral-800 transition-colors border-l-2 ${
                selected.id === v.id ? "border-orange-500 bg-neutral-800" : "border-transparent"
              }`}
            >
              <div>
                <div className={`text-xs font-semibold ${selected.id === v.id ? "text-orange-400" : "text-neutral-200"}`}>{v.name}</div>
                <div className="text-[10px] text-neutral-600">£{(v.rev / 1000).toFixed(1)}k</div>
              </div>
              {v.alert && <span className="text-red-400 text-xs">!</span>}
            </button>
          ))}
        </div>

        {/* COL 2 — Venue detail */}
        <div className="flex-1 overflow-y-auto">
          {/* Mobile venue selector — horizontal scroll */}
          <div className="md:hidden flex gap-2 overflow-x-auto px-4 py-2 border-b border-neutral-800 bg-neutral-900">
            {VENUES.map(v => (
              <button
                key={v.id}
                onClick={() => setSelected(v)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  selected.id === v.id ? "bg-orange-500 text-white" : "bg-neutral-800 text-neutral-300"
                }`}
              >
                {v.name}{v.alert && " !"}
              </button>
            ))}
          </div>
          <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-black text-xl text-orange-400">{selected.name}</h2>
            {selected.alert && <span className="bg-red-500/20 text-red-400 text-xs px-2 py-0.5 rounded-full">⚠ {isUk ? "Перевищення" : "Alert"}</span>}
          </div>

          {/* P&L block */}
          <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-4">
            <div className="text-[10px] text-neutral-600 uppercase tracking-wider mb-3">{isUk ? "P&L сьогодні" : "P&L today"}</div>
            <div className="space-y-2">
              {[
                { l: isUk ? "Виручка" : "Revenue", v: selected.rev, c: "text-emerald-400" },
                { l: "Food cost", v: -Math.round(food), c: "text-orange-400" },
                { l: isUk ? "Зарплата" : "Labour", v: -Math.round(labour), c: "text-blue-400" },
                { l: isUk ? "Накладні" : "Overheads", v: -220, c: "text-neutral-500" },
              ].map(r => (
                <div key={r.l} className="flex justify-between text-sm">
                  <span className="text-neutral-400">{r.l}</span>
                  <span className={`font-bold tabular-nums ${r.c}`}>{r.v > 0 ? "+" : ""}£{Math.abs(r.v).toLocaleString()}</span>
                </div>
              ))}
              <div className="border-t border-neutral-800 pt-2 flex justify-between font-black">
                <span>{isUk ? "Прибуток" : "Profit"}</span>
                <span className={profit > 0 ? "text-emerald-400" : "text-red-400"}>£{profit.toFixed(0)}</span>
              </div>
            </div>
          </div>

          {/* Metrics grid */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { l: isUk ? "Кавери" : "Covers", v: selected.covers },
              { l: "Food cost", v: `${selected.fc}%`, warn: selected.fc > 31 },
              { l: isUk ? "Персонал" : "Staff", v: selected.staff },
            ].map(m => (
              <div key={m.l} className={`bg-neutral-900 rounded-xl border p-3 text-center ${m.warn ? "border-red-800/50" : "border-neutral-800"}`}>
                <div className={`font-black text-xl ${m.warn ? "text-red-400" : "text-white"}`}>{m.v}</div>
                <div className="text-[10px] text-neutral-600 mt-0.5">{m.l}</div>
              </div>
            ))}
          </div>

          {/* Inventory */}
          <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-4">
            <div className="text-[10px] text-neutral-600 uppercase tracking-wider mb-3">{isUk ? "Запаси кухні" : "Kitchen stock"}</div>
            <div className="space-y-2">
              {INVENTORY.map(i => {
                const pct = Math.min(100, Math.round((i.current / i.par) * 100));
                const low = pct < 65;
                return (
                  <div key={i.item}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className={low ? "text-red-400" : "text-neutral-400"}>{i.item}</span>
                      <span className="text-neutral-600 tabular-nums">{i.current}/{i.par} {i.unit}</span>
                    </div>
                    <div className="h-1 bg-neutral-800 rounded-full overflow-hidden">
                      <div className={`h-1 rounded-full ${low ? "bg-red-500" : "bg-emerald-500"}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          </div>
        </div>

        {/* COL 3 — Alerts feed (desktop only) */}
        <div className="hidden lg:block w-52 bg-neutral-900 border-l border-neutral-800 overflow-y-auto shrink-0">
          <div className="px-3 py-2 text-[10px] text-neutral-600 uppercase tracking-widest">{isUk ? "Сповіщення" : "Alerts"}</div>
          {ALERTS.map((a, i) => (
            <div key={i} className={`px-3 py-2.5 border-b border-neutral-800/60 border-l-2 ${a.sev === "high" ? "border-l-red-500" : a.sev === "med" ? "border-l-amber-500" : "border-l-neutral-600"}`}>
              <div className={`text-[10px] font-bold uppercase ${a.sev === "high" ? "text-red-400" : a.sev === "med" ? "text-amber-400" : "text-neutral-500"}`}>
                {a.type} · {a.venue}
              </div>
              <div className="text-xs text-neutral-300 mt-0.5 leading-snug">{a.msg}</div>
            </div>
          ))}
          <div className="px-3 py-3 border-t border-neutral-800 mt-2">
            <div className="text-[10px] text-neutral-600 uppercase tracking-widest mb-2">{isUk ? "Рота — тижень 23" : "Rota — week 23"}</div>
            {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d, i) => (
              <div key={d} className="flex items-center justify-between py-1">
                <span className="text-[10px] text-neutral-500">{d}</span>
                <div className="flex gap-0.5">
                  {Array.from({ length: selected.staff }).map((_, j) => (
                    <div key={j} className={`w-1.5 h-1.5 rounded-full ${j < (i === 0 || i === 6 ? selected.staff - 2 : selected.staff) ? "bg-orange-500" : "bg-neutral-800"}`} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
