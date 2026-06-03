"use client";
import { useState, useEffect, useRef } from "react";

const VENUES = [
  { id: 1, name: "Deansgate",      covers: 84,  rev: 3420, fc: 28, waste: 82,  staff: 9,  alert: false },
  { id: 2, name: "Spinningfields", covers: 112, rev: 4810, fc: 31, waste: 124, staff: 12, alert: false },
  { id: 3, name: "N. Quarter",     covers: 56,  rev: 2190, fc: 27, waste: 48,  staff: 7,  alert: false },
  { id: 4, name: "Salford Quays",  covers: 98,  rev: 3940, fc: 29, waste: 96,  staff: 10, alert: false },
  { id: 5, name: "Didsbury",       covers: 64,  rev: 2640, fc: 34, waste: 138, staff: 8,  alert: true  },
  { id: 6, name: "Chorlton",       covers: 48,  rev: 1920, fc: 26, waste: 42,  staff: 6,  alert: false },
  { id: 7, name: "Ancoats",        covers: 72,  rev: 2880, fc: 30, waste: 88,  staff: 9,  alert: false },
  { id: 8, name: "Media City",     covers: 88,  rev: 3540, fc: 29, waste: 72,  staff: 11, alert: false },
];

const INVENTORY = [
  { item: "Chicken Breast", unit: "kg",  current: 12, par: 20, supplier: "Northern Meats"    },
  { item: "Salmon Fillet",  unit: "kg",  current: 8,  par: 15, supplier: "Fresh Catch Ltd"   },
  { item: "Beef Mince",     unit: "kg",  current: 24, par: 18, supplier: "Northern Meats"    },
  { item: "Mixed Salad",    unit: "kg",  current: 3,  par: 10, supplier: "GreenLeaf Produce" },
  { item: "Olive Oil",      unit: "5L",  current: 6,  par: 4,  supplier: "MedSupply Co"      },
  { item: "Flour (bread)",  unit: "kg",  current: 18, par: 25, supplier: "Mill Direct"       },
];

const ALERTS = [
  { type: "waste",  venue: "Didsbury",       msg: "Food cost 34% — above 32% threshold",  sev: "high" },
  { type: "stock",  venue: "All venues",     msg: "Mixed Salad: 3 kg vs 10 kg PAR",       sev: "high" },
  { type: "stock",  venue: "All venues",     msg: "Salmon Fillet: 8 kg vs 15 kg PAR",     sev: "med"  },
  { type: "rota",   venue: "Spinningfields", msg: "Ben W. reaches 48h — overtime risk",   sev: "med"  },
  { type: "sales",  venue: "N. Quarter",     msg: "Revenue 18% below target",             sev: "low"  },
  { type: "stock",  venue: "All venues",     msg: "Flour (bread): 18 kg vs 25 kg PAR",   sev: "low"  },
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const SHIFT_HOURS = 8;
const ROTA_STAFF = [
  { name: "Alice M.", role: "Chef",      days: [true,  true,  false, true,  true,  true,  false] },
  { name: "Ben W.",   role: "Sous Chef", days: [false, true,  true,  true,  true,  true,  true ] },
  { name: "Clara T.", role: "Floor",     days: [true,  false, true,  false, true,  true,  true ] },
  { name: "Dan K.",   role: "Bar",       days: [true,  true,  true,  true,  false, false, true ] },
  { name: "Eve S.",   role: "KP",        days: [false, false, true,  true,  true,  true,  false] },
];

const WASTE_CATEGORIES = [
  { name: "Produce",  nameUk: "Продукти",      icon: "🥬", costPerUnit: 2.5  },
  { name: "Dairy",    nameUk: "Молочні",        icon: "🥛", costPerUnit: 3.8  },
  { name: "Protein",  nameUk: "М'ясо/риба",     icon: "🥩", costPerUnit: 12.0 },
  { name: "Bread",    nameUk: "Хліб/випічка",   icon: "🍞", costPerUnit: 1.8  },
  { name: "Prepared", nameUk: "Готові страви",  icon: "🍲", costPerUnit: 8.5  },
];

type WasteEntry = { cat: string; qty: number; venue: string; time: string };
type Tab = "overview" | "inventory" | "rota" | "waste" | "pos";

// POS feed helpers
const POS_MENU_ITEMS = [
  { name: "Burger & Fries",    price: 14.5, ingredient: "Beef Mince",     depletes: 0.15 },
  { name: "Salmon Salad",      price: 17.0, ingredient: "Salmon Fillet",  depletes: 0.18 },
  { name: "Chicken Wrap",      price: 12.5, ingredient: "Chicken Breast", depletes: 0.12 },
  { name: "Caesar Salad",      price: 11.0, ingredient: "Mixed Salad",    depletes: 0.08 },
  { name: "Sourdough Toast",   price:  7.0, ingredient: "Flour (bread)",  depletes: 0.05 },
  { name: "Beef Tacos (×2)",   price: 15.5, ingredient: "Beef Mince",     depletes: 0.20 },
  { name: "Salmon Tartare",    price: 19.0, ingredient: "Salmon Fillet",  depletes: 0.22 },
  { name: "House Burger",      price: 13.5, ingredient: "Beef Mince",     depletes: 0.15 },
];

type PosOrder = {
  id: number;
  table: number;
  items: { name: string; qty: number; price: number }[];
  total: number;
  venue: string;
  time: string;
  status: "open" | "paid";
};

export function ChainOpsDemo({ lang }: { lang: string }) {
  const [selected,      setSelected]      = useState(VENUES[0]);
  const [rota,          setRota]          = useState<boolean[][]>(ROTA_STAFF.map(s => s.days));
  const [tab,           setTab]           = useState<Tab>("overview");
  const [groupView,     setGroupView]     = useState(false);
  const [transferOpen,  setTransferOpen]  = useState(false);
  const [transferDone,  setTransferDone]  = useState(false);
  const [poSent,        setPoSent]        = useState(false);
  const [wasteLog,      setWasteLog]      = useState<WasteEntry[]>([
    { cat: "Produce",  qty: 2.4, venue: "Deansgate",      time: "09:12" },
    { cat: "Protein",  qty: 0.8, venue: "Didsbury",        time: "11:45" },
    { cat: "Bread",    qty: 1.2, venue: "Spinningfields",  time: "14:30" },
    { cat: "Dairy",    qty: 0.6, venue: "Chorlton",        time: "16:05" },
  ]);
  const [posOrders,     setPosOrders]     = useState<PosOrder[]>([
    { id: 1001, table: 4,  items: [{ name: "Salmon Salad", qty: 2, price: 17.0 }, { name: "House Burger", qty: 1, price: 13.5 }], total: 47.5, venue: "Deansgate",      time: "18:22", status: "paid"  },
    { id: 1002, table: 7,  items: [{ name: "Chicken Wrap", qty: 3, price: 12.5 }],                                                 total: 37.5, venue: "Spinningfields", time: "18:35", status: "open"  },
    { id: 1003, table: 2,  items: [{ name: "Beef Tacos (×2)", qty: 1, price: 15.5 }, { name: "Caesar Salad", qty: 2, price: 11.0 }], total: 37.5, venue: "Deansgate",   time: "18:41", status: "paid"  },
  ]);
  const [inventory,     setInventory]     = useState(INVENTORY.map(i => ({ ...i })));
  const [liveRevenue,   setLiveRevenue]   = useState(3420);
  const posCounter = useRef(1004);

  const isUk = lang === "uk";

  // Auto-generate POS orders when on pos tab
  useEffect(() => {
    if (tab !== "pos") return;
    const iv = setInterval(() => {
      const menuItem  = POS_MENU_ITEMS[Math.floor(Math.random() * POS_MENU_ITEMS.length)];
      const qty       = Math.floor(Math.random() * 3) + 1;
      const table     = Math.floor(Math.random() * 20) + 1;
      const venueIdx  = Math.floor(Math.random() * VENUES.length);
      const now       = new Date();
      const timeStr   = `${now.getHours().toString().padStart(2,"0")}:${now.getMinutes().toString().padStart(2,"0")}`;
      const total     = parseFloat((menuItem.price * qty).toFixed(2));
      const newOrder: PosOrder = {
        id: posCounter.current++,
        table, items: [{ name: menuItem.name, qty, price: menuItem.price }],
        total, venue: VENUES[venueIdx].name, time: timeStr, status: "open",
      };
      setPosOrders(prev => [newOrder, ...prev].slice(0, 18));
      setLiveRevenue(prev => parseFloat((prev + total).toFixed(2)));
      // Deplete inventory
      setInventory(prev => prev.map(i =>
        i.item === menuItem.ingredient
          ? { ...i, current: Math.max(0, parseFloat((i.current - menuItem.depletes * qty).toFixed(1))) }
          : i
      ));
    }, 4000);
    return () => clearInterval(iv);
  }, [tab]);

  const totalRev   = VENUES.reduce((s, v) => s + v.rev,   0);
  const totalWaste = VENUES.reduce((s, v) => s + v.waste, 0);
  const labour     = selected.rev * 0.28;
  const food       = selected.rev * (selected.fc / 100);
  const profit     = selected.rev - labour - food - 220;

  const toggleShift = (si: number, di: number) =>
    setRota(prev => prev.map((row, i) => i === si ? row.map((on, j) => j === di ? !on : on) : row));
  const staffHours  = (i: number) => rota[i].filter(Boolean).length * SHIFT_HOURS;
  const weekTotal   = rota.reduce((s, row) => s + row.filter(Boolean).length * SHIFT_HOURS, 0);
  const dayCover    = (d: number) => rota.reduce((s, row) => s + (row[d] ? 1 : 0), 0);

  const logWaste = (cat: string) => {
    const qty  = parseFloat((Math.random() * 1.8 + 0.3).toFixed(1));
    const mins = Math.floor(Math.random() * 60).toString().padStart(2, "0");
    const hrs  = (9 + Math.floor(Math.random() * 9)).toString().padStart(2, "0");
    setWasteLog(prev => [{ cat, qty, venue: selected.name, time: `${hrs}:${mins}` }, ...prev].slice(0, 15));
  };

  const wasteCostToday = wasteLog.reduce((s, e) => {
    const cat = WASTE_CATEGORIES.find(c => c.name === e.cat);
    return s + (cat ? e.qty * cat.costPerUnit : 0);
  }, 0);

  const TABS: { key: Tab; label: string; uk: string }[] = [
    { key: "overview",  label: "Overview",  uk: "Огляд"     },
    { key: "inventory", label: "Inventory", uk: "Запаси"    },
    { key: "rota",      label: "Rota",      uk: "Графік"    },
    { key: "waste",     label: "Waste Log", uk: "Списання"  },
    { key: "pos",       label: "POS Feed",  uk: "POS Feed"  },
  ];

  const handleTransferConfirm = () => {
    setTransferDone(true);
    setTransferOpen(false);
  };

  return (
    <div className="h-screen bg-neutral-950 flex flex-col overflow-hidden font-sans text-white">

      {/* ── HEADER ── */}
      <div className="flex items-center justify-between px-5 py-2.5 bg-neutral-900 border-b border-neutral-800 shrink-0">
        <div className="flex items-center gap-2">
          <span className="font-bold text-orange-400 tracking-tight">ChainOps</span>
          <span className="text-neutral-600 text-xs hidden sm:inline">Manchester Group · 8 venues</span>
        </div>
        <div className="flex items-center gap-3 sm:gap-4 text-xs">
          <div className="text-center hidden sm:block">
            <div className="font-black text-orange-400">£{(totalRev / 1000).toFixed(1)}k</div>
            <div className="text-neutral-600">{isUk ? "виручка" : "revenue"}</div>
          </div>
          <div className="text-center hidden sm:block">
            <div className="font-black text-red-400">£{totalWaste}</div>
            <div className="text-neutral-600">{isUk ? "списання" : "waste"}</div>
          </div>
          <div className="text-center">
            <div className="font-black text-emerald-400">29%</div>
            <div className="text-neutral-600">food cost</div>
          </div>
          <div className="w-px h-6 bg-neutral-800 hidden sm:block" />
          <button
            onClick={() => setGroupView(v => !v)}
            className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-colors ${
              groupView
                ? "bg-orange-500 text-white"
                : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-neutral-200"
            }`}
          >
            {isUk ? "Група ▾" : "Group ▾"}
          </button>
          <div className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            <span className="hidden sm:inline text-xs">Live</span>
          </div>
        </div>
      </div>

      {/* ── GROUP VIEW ── */}
      {groupView ? (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="text-[10px] text-neutral-600 uppercase tracking-wider mb-4">
            {isUk ? "Зведений звіт — всі точки · клік → деталь" : "Group P&L — All Venues · click → detail"}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-separate" style={{ borderSpacing: "0 2px" }}>
              <thead>
                <tr className="text-neutral-600 text-[10px] uppercase tracking-wider">
                  <th className="text-left pb-2 font-medium pl-2">{isUk ? "Точка" : "Venue"}</th>
                  <th className="text-right pb-2 font-medium hidden sm:table-cell">{isUk ? "Кавери" : "Covers"}</th>
                  <th className="text-right pb-2 font-medium">{isUk ? "Виручка" : "Revenue"}</th>
                  <th className="text-right pb-2 font-medium">Food Cost</th>
                  <th className="text-right pb-2 font-medium hidden sm:table-cell">{isUk ? "Списання" : "Waste"}</th>
                  <th className="text-right pb-2 font-medium hidden sm:table-cell">{isUk ? "Персонал" : "Staff"}</th>
                  <th className="text-right pb-2 font-medium pr-2">P&L</th>
                </tr>
              </thead>
              <tbody>
                {VENUES.map(v => {
                  const vProfit = v.rev - v.rev * 0.28 - v.rev * (v.fc / 100) - 220;
                  const fcHigh  = v.fc > 31;
                  return (
                    <tr
                      key={v.id}
                      onClick={() => { setGroupView(false); setSelected(v); }}
                      className="cursor-pointer hover:bg-neutral-800/60 transition-colors rounded-lg"
                    >
                      <td className={`py-2.5 px-2 rounded-l-lg font-semibold text-sm ${v.alert ? "text-red-400" : "text-neutral-200"}`}>
                        {v.name}{v.alert && <span className="ml-1 text-red-400">⚠</span>}
                      </td>
                      <td className="py-2.5 px-2 text-right text-neutral-500 tabular-nums hidden sm:table-cell">{v.covers}</td>
                      <td className="py-2.5 px-2 text-right text-emerald-400 tabular-nums font-bold">£{v.rev.toLocaleString()}</td>
                      <td className={`py-2.5 px-2 text-right tabular-nums font-bold ${fcHigh ? "text-red-400" : "text-orange-400"}`}>{v.fc}%</td>
                      <td className="py-2.5 px-2 text-right text-neutral-500 tabular-nums hidden sm:table-cell">£{v.waste}</td>
                      <td className="py-2.5 px-2 text-right text-neutral-500 tabular-nums hidden sm:table-cell">{v.staff}</td>
                      <td className={`py-2.5 px-2 text-right tabular-nums font-bold pr-2 rounded-r-lg ${vProfit > 0 ? "text-emerald-400" : "text-red-400"}`}>
                        £{vProfit.toFixed(0)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="text-xs">
                  <td className="pt-3 px-2 font-bold text-neutral-200 border-t border-neutral-800">{isUk ? "Разом" : "Total"}</td>
                  <td className="pt-3 px-2 text-right text-neutral-500 tabular-nums border-t border-neutral-800 hidden sm:table-cell">
                    {VENUES.reduce((s, v) => s + v.covers, 0)}
                  </td>
                  <td className="pt-3 px-2 text-right text-emerald-400 font-bold tabular-nums border-t border-neutral-800">
                    £{totalRev.toLocaleString()}
                  </td>
                  <td className="pt-3 px-2 text-right text-orange-400 font-bold border-t border-neutral-800">29%</td>
                  <td className="pt-3 px-2 text-right text-neutral-500 tabular-nums border-t border-neutral-800 hidden sm:table-cell">
                    £{totalWaste}
                  </td>
                  <td className="pt-3 px-2 text-right text-neutral-500 tabular-nums border-t border-neutral-800 hidden sm:table-cell">
                    {VENUES.reduce((s, v) => s + v.staff, 0)}
                  </td>
                  <td className="pt-3 px-2 text-right text-emerald-400 font-bold tabular-nums pr-2 border-t border-neutral-800">
                    £{VENUES.reduce((s, v) => s + v.rev - v.rev * 0.28 - v.rev * (v.fc / 100) - 220, 0).toFixed(0)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <p className="text-[10px] text-neutral-700 mt-4 text-center">
            {isUk ? "Натисніть на рядок для переходу до деталей точки" : "Click any row to drill into venue detail"}
          </p>
        </div>
      ) : (

      /* ── 3-COLUMN LAYOUT ── */
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
              {v.alert && <span className="text-red-400 text-xs shrink-0">!</span>}
            </button>
          ))}
        </div>

        {/* COL 2 — Venue detail with tabs */}
        <div className="flex-1 flex flex-col overflow-hidden">

          {/* Mobile venue selector */}
          <div className="md:hidden flex gap-2 overflow-x-auto px-4 py-2 border-b border-neutral-800 bg-neutral-900 shrink-0">
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

          {/* Tab bar */}
          <div className="flex bg-neutral-900/60 border-b border-neutral-800 px-4 shrink-0 overflow-x-auto">
            {TABS.map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`px-3 py-2.5 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors ${
                  tab === t.key
                    ? "border-orange-500 text-orange-400"
                    : "border-transparent text-neutral-500 hover:text-neutral-300"
                }`}
              >
                {isUk ? t.uk : t.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">

            <div className="flex items-center justify-between">
              <h2 className="font-black text-xl text-orange-400">{selected.name}</h2>
              {selected.alert && (
                <span className="bg-red-500/20 text-red-400 text-xs px-2 py-0.5 rounded-full border border-red-500/20">
                  ⚠ {isUk ? "Перевищення" : "Alert"}
                </span>
              )}
            </div>

            {/* ── OVERVIEW TAB ── */}
            {tab === "overview" && (
              <>
                {/* P&L */}
                <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-4">
                  <div className="text-[10px] text-neutral-600 uppercase tracking-wider mb-3">{isUk ? "P&L сьогодні" : "P&L today"}</div>
                  <div className="space-y-2">
                    {[
                      { l: isUk ? "Виручка"  : "Revenue",   v: selected.rev,       c: "text-emerald-400" },
                      { l: "Food cost",                       v: -Math.round(food),  c: "text-orange-400"  },
                      { l: isUk ? "Зарплата" : "Labour",     v: -Math.round(labour),c: "text-blue-400"    },
                      { l: isUk ? "Накладні" : "Overheads",  v: -220,               c: "text-neutral-500" },
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
                    { l: isUk ? "Кавери"   : "Covers",    v: selected.covers,     warn: false               },
                    { l: "Food cost",                       v: `${selected.fc}%`,   warn: selected.fc > 31    },
                    { l: isUk ? "Персонал" : "Staff",      v: selected.staff,      warn: false               },
                  ].map(m => (
                    <div key={m.l} className={`bg-neutral-900 rounded-xl border p-3 text-center ${m.warn ? "border-red-800/50" : "border-neutral-800"}`}>
                      <div className={`font-black text-xl ${m.warn ? "text-red-400" : "text-white"}`}>{m.v}</div>
                      <div className="text-[10px] text-neutral-600 mt-0.5">{m.l}</div>
                    </div>
                  ))}
                </div>

                {/* Active alerts for this venue */}
                {(() => {
                  const venueAlerts = ALERTS.filter(a => a.venue === selected.name || a.venue === "All venues");
                  if (!venueAlerts.length) return null;
                  return (
                    <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-4">
                      <div className="text-[10px] text-neutral-600 uppercase tracking-wider mb-3">
                        {isUk ? "Активні сповіщення" : "Active Alerts"}
                      </div>
                      <div className="space-y-2">
                        {venueAlerts.map((a, i) => (
                          <div
                            key={i}
                            className={`flex items-start gap-2.5 text-xs rounded-lg px-3 py-2 ${
                              a.sev === "high" ? "bg-red-500/10 border border-red-800/30" :
                              a.sev === "med"  ? "bg-amber-500/10 border border-amber-800/30" :
                                                 "bg-neutral-800/50 border border-neutral-700/30"
                            }`}
                          >
                            <span>{a.sev === "high" ? "🔴" : a.sev === "med" ? "🟡" : "⚪"}</span>
                            <span className={a.sev === "high" ? "text-red-300" : a.sev === "med" ? "text-amber-300" : "text-neutral-400"}>
                              {a.msg}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </>
            )}

            {/* ── INVENTORY TAB ── */}
            {tab === "inventory" && (
              <>
                <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-[10px] text-neutral-600 uppercase tracking-wider">{isUk ? "Залишки кухні" : "Kitchen Stock"}</div>
                    {!poSent ? (
                      <button
                        onClick={() => setPoSent(true)}
                        className="text-[10px] bg-orange-500/20 text-orange-400 border border-orange-500/30 px-2 py-1 rounded-lg hover:bg-orange-500/30 transition-colors font-semibold"
                      >
                        {isUk ? "Сформувати PO" : "Generate PO"}
                      </button>
                    ) : (
                      <span className="text-[10px] text-emerald-400 flex items-center gap-1.5">
                        ✓ {isUk ? "Замовлення надіслано постачальникам" : "PO sent to suppliers"}
                      </span>
                    )}
                  </div>
                  <div className="space-y-3">
                    {inventory.map(i => {
                      const pct = Math.min(100, Math.round((i.current / i.par) * 100));
                      const low = pct < 65;
                      return (
                        <div key={i.item}>
                          <div className="flex justify-between text-xs mb-1">
                            <div className="flex items-center gap-2">
                              <span className={low ? "text-red-400 font-semibold" : "text-neutral-300"}>{i.item}</span>
                              <span className="text-neutral-700 text-[9px]">{i.supplier}</span>
                            </div>
                            <span className="text-neutral-600 tabular-nums">{i.current}/{i.par} {i.unit}</span>
                          </div>
                          <div className="h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                            <div
                              className={`h-1.5 rounded-full transition-all ${low ? "bg-red-500" : "bg-emerald-500"}`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-[10px] text-neutral-700 mt-3">
                    {isUk ? "Червоне = нижче 65% від PAR — потребує поповнення" : "Red = below 65% of PAR — needs replenishment"}
                  </p>
                </div>

                {/* Inter-venue transfer */}
                <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-4">
                  <div className="text-[10px] text-neutral-600 uppercase tracking-wider mb-3">
                    {isUk ? "Переміщення між точками" : "Inter-Venue Transfer"}
                  </div>

                  {transferDone ? (
                    <div className="flex items-center gap-2 text-emerald-400 text-sm">
                      <span>✓</span>
                      <span className="font-semibold">
                        {isUk ? "Переміщення підтверджено — Beef Mince 4 kg → Ancoats" : "Transfer confirmed — Beef Mince 4 kg → Ancoats"}
                      </span>
                    </div>
                  ) : !transferOpen ? (
                    <div className="space-y-2">
                      <p className="text-xs text-neutral-500">
                        {isUk
                          ? "Надлишок на одній точці — миттєве переміщення до іншої без дзвінків і ручних записів"
                          : "Excess stock at one venue — move it to another instantly, no calls or manual paperwork"}
                      </p>
                      <button
                        onClick={() => setTransferOpen(true)}
                        className="text-xs px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-400 text-white font-semibold transition-colors"
                      >
                        {isUk ? "+ Створити переміщення" : "+ Create Transfer"}
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {[
                          { l: isUk ? "Звідки" : "From",       v: selected.name },
                          { l: isUk ? "Куди"   : "To",         v: VENUES.find(v => v.id !== selected.id)?.name ?? "Ancoats" },
                          { l: isUk ? "Товар"  : "Item",       v: "Beef Mince" },
                          { l: isUk ? "Кількість" : "Qty",     v: "4 kg" },
                        ].map(f => (
                          <div key={f.l} className="bg-neutral-800 rounded-lg px-3 py-2">
                            <div className="text-[9px] text-neutral-600 mb-0.5">{f.l}</div>
                            <div className="text-neutral-200 font-semibold">{f.v}</div>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={handleTransferConfirm}
                          className="flex-1 text-xs py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white font-semibold transition-colors"
                        >
                          ✓ {isUk ? "Підтвердити" : "Confirm Transfer"}
                        </button>
                        <button
                          onClick={() => setTransferOpen(false)}
                          className="px-3 text-xs py-2 rounded-lg bg-neutral-800 text-neutral-400 hover:bg-neutral-700 transition-colors font-semibold"
                        >
                          {isUk ? "Скасувати" : "Cancel"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* ── ROTA TAB ── */}
            {tab === "rota" && (
              <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[10px] text-neutral-600 uppercase tracking-wider">
                    {isUk ? "Графік персоналу — тиждень 23" : "Staff Rota — week 23"}
                  </div>
                  <div className="text-[10px] text-neutral-600">{isUk ? "клік = зміна 8 год" : "click = 8h shift"}</div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-separate" style={{ borderSpacing: "2px" }}>
                    <thead>
                      <tr>
                        <th className="text-left font-normal text-neutral-600 pr-2 pb-1">{isUk ? "Зміна" : "Staff"}</th>
                        {DAYS.map((d, i) => {
                          const cover = dayCover(i);
                          return (
                            <th key={d} className="font-normal pb-1 px-0.5">
                              <div className="text-neutral-500 text-[10px]">{d}</div>
                              <div className={`text-[9px] ${cover < 3 ? "text-red-400" : "text-neutral-600"}`}>{cover}</div>
                            </th>
                          );
                        })}
                        <th className="font-normal text-neutral-600 pl-2 pb-1">{isUk ? "Год" : "Hrs"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ROTA_STAFF.map((s, si) => {
                        const hrs  = staffHours(si);
                        const over = hrs > 40;
                        return (
                          <tr key={s.name}>
                            <td className="pr-2 whitespace-nowrap">
                              <div className="text-neutral-200 font-medium">{s.name}</div>
                              <div className="text-[9px] text-neutral-600">{s.role}</div>
                            </td>
                            {rota[si].map((on, di) => (
                              <td key={di} className="text-center">
                                <button
                                  onClick={() => toggleShift(si, di)}
                                  className={`w-7 h-7 rounded transition-colors ${
                                    on ? "bg-orange-500 hover:bg-orange-400 text-white" : "bg-neutral-800 hover:bg-neutral-700 text-neutral-700"
                                  }`}
                                  aria-label={`${s.name} ${DAYS[di]}`}
                                >
                                  {on ? "✓" : ""}
                                </button>
                              </td>
                            ))}
                            <td className={`pl-2 text-center font-bold tabular-nums ${over ? "text-red-400" : "text-neutral-200"}`}>
                              {hrs}
                              {over && <span className="block text-[8px] font-normal text-red-400">{isUk ? "понад" : "OT"}</span>}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-neutral-800 text-xs">
                  <span className="text-neutral-500">{isUk ? "Всього годин/тиждень" : "Total hours/week"}</span>
                  <div className="flex items-center gap-3">
                    {rota.some((_, i) => staffHours(i) > 40) && (
                      <span className="text-amber-400 text-[10px]">⚠ {isUk ? "є понаднормові" : "overtime flagged"}</span>
                    )}
                    <span className="font-bold text-orange-400 tabular-nums">{weekTotal}h</span>
                  </div>
                </div>
              </div>
            )}

            {/* ── WASTE LOG TAB ── */}
            {tab === "waste" && (
              <>
                {/* Quick log buttons */}
                <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-4">
                  <div className="text-[10px] text-neutral-600 uppercase tracking-wider mb-3">
                    {isUk ? "Зареєструвати списання" : "Log Waste Entry"}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {WASTE_CATEGORIES.map(cat => (
                      <button
                        key={cat.name}
                        onClick={() => logWaste(cat.name)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-orange-500/20 border border-neutral-700 hover:border-orange-500/40 text-xs font-semibold text-neutral-300 hover:text-orange-300 transition-colors"
                      >
                        <span>{cat.icon}</span>
                        {isUk ? cat.nameUk : cat.name}
                      </button>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-neutral-800 flex items-center justify-between text-xs">
                    <span className="text-neutral-500">{isUk ? "Вартість списань сьогодні" : "Waste cost today"}</span>
                    <span className="font-bold text-red-400 tabular-nums">£{wasteCostToday.toFixed(2)}</span>
                  </div>
                </div>

                {/* Waste log entries */}
                <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-4">
                  <div className="text-[10px] text-neutral-600 uppercase tracking-wider mb-3">
                    {isUk ? "Журнал списань" : "Waste Log"}
                  </div>
                  <div className="space-y-1">
                    {wasteLog.map((e, i) => {
                      const cat  = WASTE_CATEGORIES.find(c => c.name === e.cat);
                      const cost = cat ? (e.qty * cat.costPerUnit).toFixed(2) : "—";
                      return (
                        <div
                          key={i}
                          className="flex items-center justify-between text-xs py-2 border-b border-neutral-800/50 last:border-0"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="shrink-0">{cat?.icon}</span>
                            <span className="text-neutral-300 font-medium">{isUk ? cat?.nameUk : e.cat}</span>
                            <span className="text-neutral-600 truncate">{e.venue}</span>
                          </div>
                          <div className="flex items-center gap-3 text-right shrink-0 ml-2">
                            <span className="text-neutral-500 tabular-nums">{e.qty} kg</span>
                            <span className="text-red-400 tabular-nums font-semibold w-12 text-right">£{cost}</span>
                            <span className="text-neutral-700 text-[9px] w-10">{e.time}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Waste by category (CSS bars) */}
                <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-4">
                  <div className="text-[10px] text-neutral-600 uppercase tracking-wider mb-3">
                    {isUk ? "За категоріями (поточні дані)" : "By category (current data)"}
                  </div>
                  <div className="space-y-2.5">
                    {WASTE_CATEGORIES.map(cat => {
                      const entries    = wasteLog.filter(e => e.cat === cat.name);
                      const totalQty   = entries.reduce((s, e) => s + e.qty, 0);
                      const totalCost  = (totalQty * cat.costPerUnit).toFixed(2);
                      const maxQty     = 6;
                      const pct        = Math.min(100, (totalQty / maxQty) * 100);
                      return (
                        <div key={cat.name}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-neutral-400">{cat.icon} {isUk ? cat.nameUk : cat.name}</span>
                            <span className="text-red-400 tabular-nums">£{totalCost}</span>
                          </div>
                          <div className="h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                            <div
                              className="h-1.5 bg-red-500/70 rounded-full transition-all duration-300"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-[9px] text-neutral-700 mt-3">
                    {isUk ? "Натисніть кнопки вище щоб логувати нові списання" : "Use the buttons above to log new waste entries"}
                  </p>
                </div>
              </>
            )}

            {/* ── POS FEED TAB ── */}
            {tab === "pos" && (
              <>
                {/* Live stats strip */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { l: isUk ? "Виручка (live)" : "Revenue (live)", v: `£${liveRevenue.toLocaleString()}`, c: "text-emerald-400" },
                    { l: isUk ? "Замовлень сьогодні" : "Orders today",   v: posOrders.length.toString(),        c: "text-orange-400"  },
                    { l: isUk ? "Відкритих"         : "Open tickets",    v: posOrders.filter(o => o.status === "open").length.toString(), c: "text-amber-400" },
                  ].map(m => (
                    <div key={m.l} className="bg-neutral-900 rounded-xl border border-neutral-800 p-3 text-center">
                      <div className={`font-black text-xl ${m.c} tabular-nums`}>{m.v}</div>
                      <div className="text-[10px] text-neutral-600 mt-0.5">{m.l}</div>
                    </div>
                  ))}
                </div>

                {/* Integration badge */}
                <div className="flex items-center gap-2 text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shrink-0" />
                  <span>
                    {isUk
                      ? "POS-інтеграція активна — замовлення надходять автоматично кожні ~4 сек, запаси зменшуються в реальному часі"
                      : "POS integration live — orders arriving automatically every ~4 sec, inventory depletes in real time"}
                  </span>
                </div>

                {/* Orders feed */}
                <div className="bg-neutral-900 rounded-xl border border-neutral-800 overflow-hidden">
                  <div className="px-4 py-2.5 border-b border-neutral-800 text-[10px] text-neutral-600 uppercase tracking-wider">
                    {isUk ? "Вхідні замовлення з POS" : "Incoming POS orders"}
                  </div>
                  <div className="divide-y divide-neutral-800/60 max-h-72 overflow-y-auto">
                    {posOrders.map((order, idx) => (
                      <div
                        key={order.id}
                        className={`flex items-start justify-between px-4 py-2.5 text-xs transition-colors ${
                          idx === 0 ? "bg-emerald-500/5" : ""
                        }`}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="font-semibold text-neutral-200">
                              {isUk ? "Стіл" : "Table"} {order.table}
                            </span>
                            <span className="text-neutral-600">·</span>
                            <span className="text-neutral-500 text-[10px]">{order.venue}</span>
                            {idx === 0 && (
                              <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-full font-semibold">
                                {isUk ? "Нове" : "New"}
                              </span>
                            )}
                          </div>
                          <div className="text-neutral-500 text-[10px] truncate">
                            {order.items.map(i => `${i.name} ×${i.qty}`).join(", ")}
                          </div>
                        </div>
                        <div className="text-right shrink-0 ml-3">
                          <div className="font-bold text-emerald-400 tabular-nums">£{order.total.toFixed(2)}</div>
                          <div className="flex items-center justify-end gap-1.5 mt-0.5">
                            <span className={`text-[9px] font-semibold ${order.status === "paid" ? "text-emerald-500" : "text-amber-400"}`}>
                              {order.status === "paid" ? (isUk ? "Сплачено" : "Paid") : (isUk ? "Відкрито" : "Open")}
                            </span>
                            <span className="text-neutral-700 text-[9px]">{order.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live inventory depletion */}
                <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-4">
                  <div className="text-[10px] text-neutral-600 uppercase tracking-wider mb-3">
                    {isUk ? "Запаси — авто-списання з POS" : "Inventory — auto-depleted from POS"}
                  </div>
                  <div className="space-y-2.5">
                    {inventory.map(i => {
                      const pct = Math.min(100, Math.round((i.current / i.par) * 100));
                      const low = pct < 65;
                      return (
                        <div key={i.item}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className={low ? "text-red-400" : "text-neutral-400"}>{i.item}</span>
                            <span className="text-neutral-600 tabular-nums">{i.current}/{i.par} {i.unit}</span>
                          </div>
                          <div className="h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                            <div
                              className={`h-1.5 rounded-full transition-all duration-700 ${low ? "bg-red-500" : "bg-emerald-500"}`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

          </div>
        </div>

        {/* COL 3 — Alerts feed (desktop only) */}
        <div className="hidden lg:block w-52 bg-neutral-900 border-l border-neutral-800 overflow-y-auto shrink-0">
          <div className="px-3 py-2 text-[10px] text-neutral-600 uppercase tracking-widest">{isUk ? "Сповіщення" : "Alerts"}</div>
          {ALERTS.map((a, i) => (
            <div
              key={i}
              className={`px-3 py-2.5 border-b border-neutral-800/60 border-l-2 ${
                a.sev === "high" ? "border-l-red-500" : a.sev === "med" ? "border-l-amber-500" : "border-l-neutral-600"
              }`}
            >
              <div className={`text-[10px] font-bold uppercase ${
                a.sev === "high" ? "text-red-400" : a.sev === "med" ? "text-amber-400" : "text-neutral-500"
              }`}>
                {a.type} · {a.venue}
              </div>
              <div className="text-xs text-neutral-300 mt-0.5 leading-snug">{a.msg}</div>
            </div>
          ))}
        </div>

      </div>
      )}
    </div>
  );
}
