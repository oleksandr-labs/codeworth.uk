"use client";
import { useState } from "react";

// ─── DATA ───────────────────────────────────────────────────────────────────

const STORES = [
  { name: "Oxford St",    rev: 18.4, st: 74, conv: 22 },
  { name: "Canary Wharf", rev: 14.2, st: 68, conv: 19 },
  { name: "Westfield W12",rev: 22.1, st: 81, conv: 26 },
  { name: "Covent Gdn",   rev: 16.8, st: 77, conv: 24 },
  { name: "Shoreditch",   rev: 11.4, st: 62, conv: 17 },
  { name: "Westfield E20",rev: 19.6, st: 79, conv: 25 },
  { name: "Kings Road",   rev: 13.8, st: 71, conv: 21 },
  { name: "Brent Cross",  rev: 12.4, st: 65, conv: 18 },
  { name: "Kingston",     rev: 10.2, st: 60, conv: 16 },
  { name: "Bluewater",    rev: 15.6, st: 76, conv: 23 },
  { name: "Lakeside",     rev: 14.9, st: 73, conv: 22 },
  { name: "Webshop",      rev: 38.4, st: 88, conv: 31 },
];

const CATEGORIES = [
  { name: "Knitwear",     pct: 24, colour: "#8b5cf6" },
  { name: "Jackets",      pct: 19, colour: "#ec4899" },
  { name: "Dresses",      pct: 18, colour: "#f59e0b" },
  { name: "Trousers",     pct: 16, colour: "#10b981" },
  { name: "T-shirts",     pct: 14, colour: "#3b82f6" },
  { name: "Accessories",  pct: 9,  colour: "#64748b" },
];

const SALES_7D = [142, 168, 155, 189, 174, 212, 228];

const DISPLAY_STORES = ["Oxford St", "Canary Wharf", "Westfield W12", "Covent Gdn", "Shoreditch", "Westfield E20", "Webshop"];

type StoreKey = typeof DISPLAY_STORES[number];

const STOCK_DATA: { sku: string; name: string; cat: string; price: number; stores: Record<StoreKey, number> }[] = [
  { sku: "JKT-005", name: "Puffer Jacket Navy",   cat: "Jackets",      price: 120, stores: { "Oxford St": 42, "Canary Wharf": 3,  "Westfield W12": 8,  "Covent Gdn": 0,  "Shoreditch": 0,  "Westfield E20": 12, "Webshop": 2  } },
  { sku: "DRS-008", name: "Midi Dress Floral",     cat: "Dresses",      price: 140, stores: { "Oxford St": 4,  "Canary Wharf": 12, "Westfield W12": 18, "Covent Gdn": 7,  "Shoreditch": 2,  "Westfield E20": 5,  "Webshop": 0  } },
  { sku: "SWT-022", name: "Oversized Sweater",     cat: "Knitwear",     price: 95,  stores: { "Oxford St": 15, "Canary Wharf": 9,  "Westfield W12": 6,  "Covent Gdn": 3,  "Shoreditch": 19, "Westfield E20": 4,  "Webshop": 11 } },
  { sku: "TRS-014", name: "Linen Trousers Tan",    cat: "Trousers",     price: 85,  stores: { "Oxford St": 7,  "Canary Wharf": 0,  "Westfield W12": 5,  "Covent Gdn": 22, "Shoreditch": 0,  "Westfield E20": 14, "Webshop": 3  } },
  { sku: "KNT-031", name: "Cable Knit Cardigan",   cat: "Knitwear",     price: 110, stores: { "Oxford St": 2,  "Canary Wharf": 5,  "Westfield W12": 0,  "Covent Gdn": 1,  "Shoreditch": 14, "Westfield E20": 0,  "Webshop": 8  } },
  { sku: "DRS-016", name: "Wrap Dress Black",      cat: "Dresses",      price: 135, stores: { "Oxford St": 0,  "Canary Wharf": 8,  "Westfield W12": 3,  "Covent Gdn": 0,  "Shoreditch": 6,  "Westfield E20": 0,  "Webshop": 15 } },
  { sku: "ACC-008", name: "Leather Belt Tan",      cat: "Accessories",  price: 45,  stores: { "Oxford St": 18, "Canary Wharf": 14, "Westfield W12": 22, "Covent Gdn": 9,  "Shoreditch": 6,  "Westfield E20": 19, "Webshop": 33 } },
  { sku: "TRS-027", name: "Wide-leg Jeans",        cat: "Trousers",     price: 90,  stores: { "Oxford St": 3,  "Canary Wharf": 0,  "Westfield W12": 7,  "Covent Gdn": 0,  "Shoreditch": 0,  "Westfield E20": 4,  "Webshop": 0  } },
];

const TRANSFERS_DATA = [
  { id: 1, sku: "JKT-005", name: "Puffer Jacket Navy",  from: "Oxford St",   to: "Covent Gdn",    units: 15, reason: "Oxford St: 42 units — 60+ days cover. Covent Gdn: 0 units, 3 lost sales this week.", saving: 1800, priority: "high"   as const },
  { id: 2, sku: "JKT-005", name: "Puffer Jacket Navy",  from: "Oxford St",   to: "Shoreditch",    units: 10, reason: "Oxford St overstocked. Shoreditch: 0 units, conversion 17% (–7pp vs chain avg).",  saving: 1200, priority: "high"   as const },
  { id: 3, sku: "TRS-014", name: "Linen Trousers Tan",  from: "Covent Gdn",  to: "Canary Wharf",  units: 8,  reason: "Covent Gdn: 22 units, low footfall. Canary Wharf: 0 units, trending category.",    saving: 680,  priority: "medium" as const },
  { id: 4, sku: "DRS-016", name: "Wrap Dress Black",    from: "Webshop",     to: "Westfield E20", units: 6,  reason: "Webshop: 15 units slow-moving online. Westfield E20: 0, dress ST 79%.",             saving: 810,  priority: "medium" as const },
  { id: 5, sku: "KNT-031", name: "Cable Knit Cardigan", from: "Shoreditch",  to: "Westfield W12", units: 7,  reason: "Shoreditch: 14 units, lowest footfall. Westfield W12: 0 in stock, ST 81%.",         saving: 770,  priority: "low"    as const },
];

const BUYING_PLAN = [
  { cat: "Knitwear",     budget: 48000, spent: 51200, sales: 54800, planSales: 52000, units: 480, sold: 318 },
  { cat: "Jackets",      budget: 38000, spent: 39400, sales: 36200, planSales: 42000, units: 320, sold: 198 },
  { cat: "Dresses",      budget: 36000, spent: 34800, sales: 41200, planSales: 38000, units: 290, sold: 247 },
  { cat: "Trousers",     budget: 32000, spent: 31200, sales: 29400, planSales: 34000, units: 380, sold: 241 },
  { cat: "T-shirts",     budget: 28000, spent: 27600, sales: 30100, planSales: 29000, units: 620, sold: 478 },
  { cat: "Accessories",  budget: 18000, spent: 17400, sales: 19800, planSales: 18500, units: 860, sold: 712 },
];

const MARKDOWN_LINES = [
  { sku: "JKT-005", name: "Puffer Jacket Navy",  stock: 42, price: 120, cost: 48, rec: 20 },
  { sku: "DRS-008", name: "Midi Dress Floral",    stock: 19, price: 140, cost: 49, rec: 30 },
  { sku: "SWT-022", name: "Oversized Sweater",    stock: 35, price: 95,  cost: 38, rec: 25 },
  { sku: "TRS-014", name: "Linen Trousers Tan",   stock: 28, price: 85,  cost: 34, rec: 15 },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function heatColour(st: number) {
  if (st >= 78) return "bg-violet-600";
  if (st >= 72) return "bg-violet-500";
  if (st >= 66) return "bg-violet-400";
  if (st >= 62) return "bg-amber-400";
  return "bg-red-400";
}

function stockBadge(qty: number) {
  if (qty === 0)   return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
  if (qty <= 3)    return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
  if (qty >= 15)   return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
  return "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400";
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────

type Tab = "dashboard" | "stock" | "transfers" | "buying" | "reports";

export function RetailCoreDemo({ lang }: { lang: string }) {
  const [tab, setTab]       = useState<Tab>("dashboard");
  const [approved, setApproved] = useState<Set<number>>(new Set());
  const [skipped,  setSkipped]  = useState<Set<number>>(new Set());
  const [mdSku, setMdSku]   = useState(MARKDOWN_LINES[0].sku);
  const [mdPct, setMdPct]   = useState(MARKDOWN_LINES[0].rec);
  const isUk = lang === "uk";

  const mdLine       = MARKDOWN_LINES.find(m => m.sku === mdSku)!;
  const newPrice     = mdLine.price * (1 - mdPct / 100);
  const marginPct    = Math.round(((newPrice - mdLine.cost) / newPrice) * 100);
  const capitalOut   = Math.round(newPrice * mdLine.stock);
  const marginGiven  = Math.round((mdLine.price - newPrice) * mdLine.stock);
  const selectMd     = (sku: string) => { setMdSku(sku); setMdPct(MARKDOWN_LINES.find(m => m.sku === sku)!.rec); };

  const totalRev     = STORES.reduce((s, v) => s + v.rev, 0);
  const maxSale      = Math.max(...SALES_7D);
  const pending      = TRANSFERS_DATA.filter(t => !approved.has(t.id) && !skipped.has(t.id));
  const savedToday   = TRANSFERS_DATA.filter(t => approved.has(t.id)).reduce((s, t) => s + t.saving, 0);

  const circumference = 2 * Math.PI * 42;
  let cumulative = 0;

  const NAV: { key: Tab; icon: string; label: string }[] = [
    { key: "dashboard", icon: "📊", label: isUk ? "Дашборд"      : "Dashboard" },
    { key: "stock",     icon: "📦", label: isUk ? "Залишки"      : "Stock"     },
    { key: "transfers", icon: "🔄", label: isUk ? "Переміщення"  : "Transfers" },
    { key: "buying",    icon: "🛒", label: isUk ? "Байєр"        : "Buying"    },
    { key: "reports",   icon: "📈", label: isUk ? "Звіти"        : "Reports"   },
  ];

  return (
    <div className="min-h-screen bg-violet-50/40 dark:bg-neutral-950 font-sans text-neutral-900 dark:text-white">

      {/* ── TOP HEADER ── */}
      <header className="h-14 bg-white dark:bg-neutral-900 border-b border-violet-100 dark:border-neutral-800 flex items-center px-5 gap-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center text-white text-[11px] font-black">RC</div>
          <span className="font-black text-lg tracking-tight">RetailCore</span>
          <span className="text-violet-500 text-xs font-semibold">ERP</span>
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400 flex-wrap">
          <span className="px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 font-semibold">● Live</span>
          <span>12 {isUk ? "магазинів" : "stores"} · London Fashion Group</span>
          <span className="hidden sm:inline text-neutral-200 dark:text-neutral-700">|</span>
          <span className="hidden sm:inline">Season AW25/26</span>
          {savedToday > 0 && (
            <span className="px-2.5 py-1 rounded-full bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-400 font-semibold">
              +£{savedToday.toLocaleString()} {isUk ? "збережено сьогодні" : "saved today"}
            </span>
          )}
        </div>
      </header>

      <div className="flex">

        {/* ── LEFT SIDEBAR ── */}
        <nav className="w-48 shrink-0 min-h-[calc(100vh-3.5rem)] bg-white dark:bg-neutral-900 border-r border-violet-100 dark:border-neutral-800 p-3 space-y-0.5 sticky top-14 self-start">
          {NAV.map(item => {
            const badge = item.key === "transfers" ? pending.length : 0;
            return (
              <button
                key={item.key}
                onClick={() => setTab(item.key)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors relative ${
                  tab === item.key
                    ? "bg-violet-600 text-white shadow-md shadow-violet-500/25"
                    : "text-neutral-600 dark:text-neutral-400 hover:bg-violet-50 dark:hover:bg-neutral-800"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
                {badge > 0 && (
                  <span className={`ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full ${tab === item.key ? "bg-white/25 text-white" : "bg-violet-600 text-white"}`}>
                    {badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-4 mt-4 border-t border-violet-50 dark:border-neutral-800 space-y-0.5">
            <div className="px-3 py-1 text-[10px] text-neutral-400 dark:text-neutral-600 uppercase tracking-wider">{isUk ? "Система" : "System"}</div>
            {[
              { icon: "⚙️", label: isUk ? "Налаштування" : "Settings" },
              { icon: "👤", label: isUk ? "Акаунт"       : "Account"  },
            ].map(item => (
              <button key={item.label} className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-neutral-400 hover:bg-violet-50 dark:hover:bg-neutral-800 hover:text-neutral-600 transition-colors">
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* ── MAIN CONTENT ── */}
        <main className="flex-1 p-5 min-h-[calc(100vh-3.5rem)] overflow-auto">

          {/* ══ DASHBOARD ══ */}
          {tab === "dashboard" && (
            <div className="space-y-4 max-w-5xl">
              {/* KPIs */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: isUk ? "Виручка групи"  : "Group Revenue",  value: `£${totalRev.toFixed(1)}k`, delta: "+9.2%",  green: true  },
                  { label: isUk ? "Транзакції"      : "Transactions",   value: "3,140",                    delta: "+6.8%",  green: true  },
                  { label: isUk ? "Середній чек"   : "Avg Basket",     value: "£68",                      delta: "+2.3%",  green: true  },
                  { label: isUk ? "Конверсія"       : "Conversion",     value: "24%",                      delta: "−0.4%",  green: false },
                ].map(k => (
                  <div key={k.label} className="bg-white dark:bg-neutral-900 rounded-2xl border border-violet-100 dark:border-neutral-800 p-5">
                    <div className="text-xs text-neutral-400 dark:text-neutral-500 mb-1">{k.label}</div>
                    <div className="text-2xl font-black">{k.value}</div>
                    <div className={`text-xs font-semibold mt-1 ${k.green ? "text-emerald-500" : "text-red-400"}`}>
                      {k.delta} {isUk ? "vs тиж. тому" : "vs last week"}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* 7-day bar chart */}
                <div className="lg:col-span-2 bg-white dark:bg-neutral-900 rounded-2xl border border-violet-100 dark:border-neutral-800 p-6">
                  <div className="text-xs text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-4">
                    {isUk ? "Продажі — 7 днів (£k)" : "Sales — 7 days (£k)"}
                  </div>
                  <div className="flex items-end gap-2 h-32">
                    {SALES_7D.map((v, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1.5 group">
                        <div className="text-[9px] text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity tabular-nums">{v}</div>
                        <div className="w-full rounded-t-lg relative overflow-hidden" style={{ height: `${(v / maxSale) * 100}%` }}>
                          <div className={`absolute inset-0 rounded-t-lg ${i === 6 ? "bg-linear-to-t from-violet-600 to-violet-400" : "bg-linear-to-t from-violet-300 to-violet-200 dark:from-violet-800 dark:to-violet-700"}`} />
                        </div>
                        <span className="text-[10px] text-neutral-400">{"MTWTFSS"[i]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Donut */}
                <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-violet-100 dark:border-neutral-800 p-6">
                  <div className="text-xs text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-3">
                    {isUk ? "Категорії" : "Category Mix"}
                  </div>
                  <div className="flex items-center gap-4">
                    <svg viewBox="0 0 100 100" className="w-28 h-28 -rotate-90 shrink-0">
                      {CATEGORIES.map(c => {
                        const dash   = (c.pct / 100) * circumference;
                        const offset = -(cumulative / 100) * circumference;
                        cumulative  += c.pct;
                        return (
                          <circle key={c.name} cx="50" cy="50" r="42" fill="none" stroke={c.colour}
                            strokeWidth="14" strokeDasharray={`${dash} ${circumference}`} strokeDashoffset={offset} />
                        );
                      })}
                    </svg>
                    <div className="space-y-1 flex-1">
                      {CATEGORIES.map(c => (
                        <div key={c.name} className="flex items-center gap-2 text-xs">
                          <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: c.colour }} />
                          <span className="text-neutral-600 dark:text-neutral-300 flex-1 truncate">{c.name}</span>
                          <span className="font-bold tabular-nums">{c.pct}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Store heatmap */}
              <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-violet-100 dark:border-neutral-800 p-6">
                <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                  <div className="text-xs text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                    {isUk ? "Sell-through по точках" : "Sell-through Heatmap"}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-neutral-400">
                    <span>{isUk ? "Низький" : "Low"}</span>
                    <div className="flex gap-0.5">
                      {["bg-red-400","bg-amber-400","bg-violet-400","bg-violet-500","bg-violet-600"].map(c => (
                        <div key={c} className={`w-4 h-3 rounded-sm ${c}`} />
                      ))}
                    </div>
                    <span>{isUk ? "Високий" : "High"}</span>
                  </div>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {STORES.map(s => (
                    <button
                      key={s.name}
                      onClick={() => setTab("stock")}
                      title={isUk ? "Переглянути залишки" : "View stock"}
                      className={`${heatColour(s.st)} rounded-xl p-3 text-white hover:opacity-90 transition-opacity text-left`}
                    >
                      <div className="text-[10px] font-medium opacity-90 truncate">{s.name}</div>
                      <div className="text-lg font-black mt-1">{s.st}%</div>
                      <div className="text-[9px] opacity-75">£{s.rev}k</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Pending transfers CTA */}
              {pending.length > 0 && (
                <button
                  onClick={() => setTab("transfers")}
                  className="w-full p-4 rounded-2xl border-2 border-violet-200 dark:border-violet-800/50 bg-violet-50 dark:bg-violet-900/10 flex items-center gap-4 hover:bg-violet-100 dark:hover:bg-violet-900/20 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center text-white text-lg shrink-0">🔄</div>
                  <div className="text-left flex-1">
                    <div className="font-semibold text-violet-800 dark:text-violet-300">
                      {pending.length} {isUk ? "рекомендованих переміщень" : "transfer recommendations pending"}
                    </div>
                    <div className="text-sm text-violet-500">
                      {isUk ? `Потенційне збереження £${TRANSFERS_DATA.reduce((s, t) => s + t.saving, 0).toLocaleString()}` : `Potential saving £${TRANSFERS_DATA.reduce((s, t) => s + t.saving, 0).toLocaleString()}`}
                    </div>
                  </div>
                  <span className="text-violet-400 text-lg shrink-0">→</span>
                </button>
              )}
            </div>
          )}

          {/* ══ STOCK ══ */}
          {tab === "stock" && (
            <div className="space-y-4 max-w-5xl">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h2 className="text-xl font-bold">{isUk ? "Залишки по локаціях" : "Stock by Location"}</h2>
                  <p className="text-sm text-neutral-400 mt-0.5">
                    {isUk ? "Real-time синхронізація · 12 магазинів + webshop" : "Real-time sync · 12 stores + webshop"}
                  </p>
                </div>
                <div className="flex gap-2 text-xs flex-wrap">
                  {[
                    { cls: "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400",    dot: "bg-red-400",    label: isUk ? "0 одиниць"  : "Out of stock" },
                    { cls: "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400", dot: "bg-amber-400", label: isUk ? "Низький"    : "Low stock"    },
                    { cls: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",  dot: "bg-blue-400",  label: isUk ? "Надлишок"   : "Overstock"    },
                  ].map(l => (
                    <span key={l.label} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${l.cls}`}>
                      <span className={`w-2 h-2 rounded-full ${l.dot}`} />
                      {l.label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-violet-100 dark:border-neutral-800 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-violet-50/60 dark:bg-neutral-800/50">
                        <th className="text-left px-4 py-3 font-semibold text-neutral-500 dark:text-neutral-400 text-xs uppercase tracking-wide whitespace-nowrap">
                          {isUk ? "SKU / Назва" : "SKU / Name"}
                        </th>
                        {DISPLAY_STORES.map(s => (
                          <th key={s} className="px-2 py-3 text-center font-semibold text-neutral-500 dark:text-neutral-400 text-[10px] uppercase tracking-wide whitespace-nowrap">
                            {s}
                          </th>
                        ))}
                        <th className="px-4 py-3 text-center font-semibold text-neutral-500 dark:text-neutral-400 text-xs uppercase tracking-wide">
                          {isUk ? "Всього" : "Total"}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-violet-50 dark:divide-neutral-800">
                      {STOCK_DATA.map(row => {
                        const total = Object.values(row.stores).reduce((a, b) => a + b, 0);
                        return (
                          <tr key={row.sku} className="hover:bg-violet-50/20 dark:hover:bg-neutral-800/20 transition-colors">
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="font-mono text-xs text-violet-500 font-bold">{row.sku}</div>
                              <div className="font-medium text-neutral-900 dark:text-white">{row.name}</div>
                              <div className="text-xs text-neutral-400">{row.cat} · £{row.price}</div>
                            </td>
                            {DISPLAY_STORES.map(s => {
                              const qty = row.stores[s] ?? 0;
                              return (
                                <td key={s} className="px-2 py-3 text-center">
                                  <span className={`inline-block min-w-7 px-1.5 py-0.5 rounded-lg font-bold text-sm tabular-nums ${stockBadge(qty)}`}>
                                    {qty}
                                  </span>
                                </td>
                              );
                            })}
                            <td className="px-4 py-3 text-center font-bold text-neutral-700 dark:text-neutral-200 tabular-nums">{total}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: isUk ? "SKU без залишків"   : "SKUs out of stock",   value: "14", sub: isUk ? "по всіх точках"        : "across all locations",  color: "text-red-500"    },
                  { label: isUk ? "SKU з надлишком"     : "Overstock SKUs",      value: "8",  sub: isUk ? "рекомендовано переміщення" : "transfer recommended", color: "text-blue-500"   },
                  { label: isUk ? "Вартість залишків"   : "Total stock value",   value: "£284k", sub: "AW25/26",                                               color: "text-violet-500" },
                ].map(card => (
                  <div key={card.label} className="bg-white dark:bg-neutral-900 rounded-2xl border border-violet-100 dark:border-neutral-800 p-5">
                    <div className="text-xs text-neutral-400 dark:text-neutral-500 mb-2">{card.label}</div>
                    <div className={`text-3xl font-black ${card.color}`}>{card.value}</div>
                    <div className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">{card.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══ TRANSFERS ══ */}
          {tab === "transfers" && (
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h2 className="text-xl font-bold">{isUk ? "Рекомендовані переміщення" : "Transfer Recommendations"}</h2>
                  <p className="text-sm text-neutral-400 mt-0.5">
                    {isUk ? "Алгоритм виявив дисбаланс залишків між точками" : "Algorithm detected stock imbalances across stores"}
                  </p>
                </div>
                {savedToday > 0 && (
                  <div className="px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl text-emerald-700 dark:text-emerald-400 text-sm font-semibold shrink-0">
                    ✓ {approved.size} {isUk ? "затверджено · збережено" : "approved · saved"} £{savedToday.toLocaleString()}
                  </div>
                )}
              </div>

              <div className="space-y-3">
                {TRANSFERS_DATA.map(t => {
                  const isApproved = approved.has(t.id);
                  const isSkipped  = skipped.has(t.id);
                  return (
                    <div key={t.id} className={`bg-white dark:bg-neutral-900 rounded-2xl border-2 p-5 transition-all ${
                      isApproved ? "border-emerald-200 dark:border-emerald-800/60" :
                      isSkipped  ? "border-neutral-100 dark:border-neutral-800 opacity-40" :
                      t.priority === "high" ? "border-violet-200 dark:border-violet-800/50" :
                      "border-violet-100 dark:border-neutral-800"
                    }`}>
                      <div className="flex items-start gap-4 flex-wrap">
                        <div className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${t.priority === "high" ? "bg-red-400" : t.priority === "medium" ? "bg-amber-400" : "bg-emerald-400"}`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="font-mono text-xs font-bold text-violet-500">{t.sku}</span>
                            <span className="font-semibold text-neutral-900 dark:text-white">{t.name}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                              t.priority === "high"   ? "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400" :
                              t.priority === "medium" ? "bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400" :
                                                        "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400"
                            }`}>{t.priority}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 mb-2 flex-wrap">
                            <span className="font-semibold text-neutral-700 dark:text-neutral-200">{t.from}</span>
                            <span className="text-violet-400">→</span>
                            <span className="font-semibold text-neutral-700 dark:text-neutral-200">{t.to}</span>
                            <span className="font-bold text-violet-600 dark:text-violet-400">{t.units} {isUk ? "od." : "units"}</span>
                          </div>
                          <p className="text-xs text-neutral-400 dark:text-neutral-500">{t.reason}</p>
                        </div>
                        <div className="text-right shrink-0 flex flex-col items-end gap-2">
                          <div>
                            <div className="text-[10px] text-neutral-400 dark:text-neutral-500">{isUk ? "Очікуване збереження" : "Est. saving"}</div>
                            <div className="text-xl font-black text-emerald-600">+£{t.saving.toLocaleString()}</div>
                          </div>
                          {!isApproved && !isSkipped && (
                            <div className="flex gap-2">
                              <button
                                onClick={() => setSkipped(prev => new Set([...prev, t.id]))}
                                className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-400 text-xs hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                              >
                                {isUk ? "Пропустити" : "Skip"}
                              </button>
                              <button
                                onClick={() => setApproved(prev => new Set([...prev, t.id]))}
                                className="px-3 py-1.5 rounded-lg bg-violet-600 text-white text-xs font-semibold hover:bg-violet-700 transition-colors"
                              >
                                ✓ {isUk ? "Затвердити" : "Approve"}
                              </button>
                            </div>
                          )}
                          {isApproved && (
                            <div className="text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1.5 rounded-lg">
                              ✓ {isUk ? "Затверджено" : "Approved"}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Summary */}
              <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-violet-100 dark:border-neutral-800 p-5">
                <div className="text-xs text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-3">
                  {isUk ? "Підсумок сесії" : "Session Summary"}
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-black text-violet-600">{approved.size}</div>
                    <div className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">{isUk ? "затверджено" : "approved"}</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-emerald-600">£{savedToday.toLocaleString()}</div>
                    <div className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">{isUk ? "збережено" : "saved"}</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-neutral-700 dark:text-neutral-200">{pending.length}</div>
                    <div className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">{isUk ? "очікують" : "pending"}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ══ BUYING ══ */}
          {tab === "buying" && (
            <div className="space-y-4 max-w-5xl">
              <div>
                <h2 className="text-xl font-bold">{isUk ? "Модуль байєра — AW25/26" : "Buying Module — AW25/26"}</h2>
                <p className="text-sm text-neutral-400 mt-0.5">
                  {isUk ? "Сезонний план vs факт · Markdown engine" : "Season plan vs actual · Markdown engine"}
                </p>
              </div>

              {/* Season plan table */}
              <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-violet-100 dark:border-neutral-800 overflow-hidden">
                <div className="px-6 py-4 border-b border-violet-50 dark:border-neutral-800 flex items-center justify-between">
                  <h3 className="font-semibold text-neutral-900 dark:text-white">
                    {isUk ? "Бюджет vs факт по категоріях" : "Budget vs Actual by Category"}
                  </h3>
                  <span className="text-xs text-neutral-400 dark:text-neutral-500">
                    {isUk ? "Тиждень 24 з 36" : "Week 24 of 36"}
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-violet-50/50 dark:bg-neutral-800/40">
                        {[
                          isUk ? "Категорія"       : "Category",
                          isUk ? "Бюджет"          : "Budget",
                          isUk ? "Витрачено"       : "Spent",
                          isUk ? "Продажі"         : "Sales",
                          isUk ? "План продажів"   : "Sales Plan",
                          isUk ? "vs план"         : "vs Plan",
                          isUk ? "Sell-through"    : "Sell-through",
                        ].map(h => (
                          <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-violet-50 dark:divide-neutral-800">
                      {BUYING_PLAN.map(row => {
                        const vsplan = Math.round(((row.sales - row.planSales) / row.planSales) * 100);
                        const st     = Math.round((row.sold / row.units) * 100);
                        return (
                          <tr key={row.cat} className="hover:bg-violet-50/20 dark:hover:bg-neutral-800/20 transition-colors">
                            <td className="px-4 py-3 font-medium text-neutral-900 dark:text-white">{row.cat}</td>
                            <td className="px-4 py-3 text-neutral-600 dark:text-neutral-300 tabular-nums">£{row.budget.toLocaleString()}</td>
                            <td className="px-4 py-3 tabular-nums">
                              <span className={row.spent > row.budget ? "text-amber-600 font-semibold" : "text-neutral-600 dark:text-neutral-300"}>
                                £{row.spent.toLocaleString()}
                              </span>
                            </td>
                            <td className="px-4 py-3 font-semibold text-neutral-900 dark:text-white tabular-nums">£{row.sales.toLocaleString()}</td>
                            <td className="px-4 py-3 text-neutral-500 dark:text-neutral-400 tabular-nums">£{row.planSales.toLocaleString()}</td>
                            <td className="px-4 py-3">
                              <span className={`font-bold tabular-nums ${vsplan > 0 ? "text-emerald-600" : "text-red-500"}`}>
                                {vsplan > 0 ? "+" : ""}{vsplan}%
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <div className="flex-1 h-1.5 rounded-full bg-violet-100 dark:bg-neutral-700 overflow-hidden min-w-[64px]">
                                  <div className="h-full rounded-full bg-violet-500" style={{ width: `${st}%` }} />
                                </div>
                                <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300 w-9 tabular-nums">{st}%</span>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Markdown engine */}
              <div className="bg-linear-to-r from-violet-600 to-purple-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-violet-200">Markdown Engine</div>
                    <div className="text-lg font-bold mt-0.5">
                      {isUk ? "Симуляція знижки — перетягни слайдер" : "Markdown Simulator — drag the slider"}
                    </div>
                  </div>
                  <div className="flex gap-1.5 flex-wrap">
                    {MARKDOWN_LINES.map(m => (
                      <button
                        key={m.sku}
                        onClick={() => selectMd(m.sku)}
                        className={`font-mono text-[11px] px-2.5 py-1.5 rounded-lg transition-colors ${m.sku === mdSku ? "bg-white text-violet-700 font-bold" : "bg-white/15 text-violet-100 hover:bg-white/25"}`}
                      >
                        {m.sku}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-center">
                  <div>
                    <div className="flex items-baseline justify-between mb-2 flex-wrap gap-2">
                      <span className="font-semibold">{mdLine.name}</span>
                      <span className="text-violet-200 text-sm">{mdLine.stock} {isUk ? "од. в наявності" : "units in stock"}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <input
                        type="range" min={0} max={50} value={mdPct}
                        onChange={e => setMdPct(Number(e.target.value))}
                        className="flex-1 accent-white h-2"
                      />
                      <span className="font-black text-3xl tabular-nums w-20 text-right">−{mdPct}%</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-xs text-violet-200 flex-wrap">
                      <span className="line-through opacity-70">£{mdLine.price}</span>
                      <span>→</span>
                      <span className="font-bold text-white text-base">£{newPrice.toFixed(2)}</span>
                      {mdPct === mdLine.rec && (
                        <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px]">
                          {isUk ? "рекомендовано" : "recommended"}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3 flex-wrap items-stretch">
                    {[
                      { label: isUk ? "Маржа після"   : "Margin after",  value: `${marginPct}%`,              color: marginPct >= 30 ? "text-emerald-300" : marginPct >= 15 ? "text-amber-300" : "text-red-300" },
                      { label: isUk ? "Вивільнення"   : "Capital out",   value: `£${capitalOut.toLocaleString()}`,   color: "text-white" },
                      { label: isUk ? "Втрата маржі"  : "Margin given",  value: `−£${marginGiven.toLocaleString()}`, color: "text-red-200" },
                    ].map(m => (
                      <div key={m.label} className="bg-white/15 backdrop-blur rounded-2xl px-4 py-3 text-center min-w-[96px]">
                        <div className="text-[10px] uppercase text-violet-200 whitespace-nowrap">{m.label}</div>
                        <div className={`font-black text-xl tabular-nums ${m.color}`}>{m.value}</div>
                      </div>
                    ))}
                    <button className="bg-white text-violet-700 rounded-2xl px-5 font-bold text-sm hover:bg-violet-50 transition-colors self-stretch flex items-center whitespace-nowrap">
                      {isUk ? "Застосувати" : "Apply"} →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ══ REPORTS ══ */}
          {tab === "reports" && (
            <div className="space-y-4 max-w-4xl">
              <div>
                <h2 className="text-xl font-bold">{isUk ? "Звіти по точках" : "Store Reports"}</h2>
                <p className="text-sm text-neutral-400 mt-0.5">
                  {isUk ? "Виручка, конверсія та sell-through по кожному магазину" : "Revenue, conversion & sell-through per store"}
                </p>
              </div>

              {/* Revenue bar chart */}
              <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-violet-100 dark:border-neutral-800 p-6">
                <div className="flex items-center justify-between mb-5">
                  <div className="text-xs text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                    {isUk ? "Виручка по точках (£k/тиждень)" : "Revenue by store (£k/week)"}
                  </div>
                  <div className="text-xs text-neutral-400 dark:text-neutral-500">
                    {isUk ? "Конверсія" : "Conversion"} →
                  </div>
                </div>
                <div className="space-y-2.5">
                  {[...STORES].sort((a, b) => b.rev - a.rev).map(s => (
                    <div key={s.name} className="flex items-center gap-3">
                      <div className="w-24 text-xs text-neutral-500 dark:text-neutral-400 text-right shrink-0 truncate">{s.name}</div>
                      <div className="flex-1 h-7 bg-violet-50 dark:bg-neutral-800 rounded-lg overflow-hidden">
                        <div
                          className="h-full bg-linear-to-r from-violet-500 to-violet-400 rounded-lg flex items-center px-3 min-w-10 transition-all"
                          style={{ width: `${(s.rev / 38.4) * 100}%` }}
                        >
                          <span className="text-white text-xs font-bold whitespace-nowrap">£{s.rev}k</span>
                        </div>
                      </div>
                      <div className="w-14 text-xs text-right shrink-0">
                        <span className={`font-bold tabular-nums ${s.conv >= 25 ? "text-emerald-500" : s.conv >= 20 ? "text-neutral-500 dark:text-neutral-400" : "text-red-400"}`}>
                          {s.conv}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Below-average stores */}
              <div className="bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-200 dark:border-amber-800/30 p-5">
                <h3 className="font-semibold text-amber-800 dark:text-amber-400 mb-3">
                  ⚠ {isUk ? "Точки нижче середнього — потребують уваги" : "Below-average stores — action needed"}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {STORES.filter(s => s.st < 65).map(s => (
                    <div key={s.name} className="bg-white dark:bg-neutral-900 rounded-xl p-4">
                      <div className="font-semibold text-neutral-900 dark:text-white">{s.name}</div>
                      <div className="text-2xl font-black text-amber-500 my-1">{s.st}%</div>
                      <div className="text-xs text-neutral-400 dark:text-neutral-500">{isUk ? "sell-through" : "sell-through"} · £{s.rev}k</div>
                      <button
                        onClick={() => setTab("transfers")}
                        className="mt-2 text-xs text-violet-600 dark:text-violet-400 font-semibold hover:underline"
                      >
                        {isUk ? "Переглянути переміщення →" : "View transfers →"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: isUk ? "Топ магазин"          : "Top store",          value: "Webshop",      sub: "£38.4k · ST 88%", icon: "🏆" },
                  { label: isUk ? "Найвища конверсія"     : "Best conversion",    value: "Webshop",      sub: "31% conv.",        icon: "📊" },
                  { label: isUk ? "Найнижчий sell-through": "Lowest sell-through",value: "Kingston",     sub: "60% ST",           icon: "⚠️" },
                  { label: isUk ? "Потреба переміщень"    : "Transfers needed",   value: `${pending.length}`, sub: isUk ? "очікують апруву" : "awaiting approval", icon: "🔄" },
                ].map(card => (
                  <div key={card.label} className="bg-white dark:bg-neutral-900 rounded-2xl border border-violet-100 dark:border-neutral-800 p-4 flex items-start gap-3">
                    <span className="text-2xl shrink-0">{card.icon}</span>
                    <div className="min-w-0">
                      <div className="text-xs text-neutral-400 dark:text-neutral-500 truncate">{card.label}</div>
                      <div className="font-bold text-neutral-900 dark:text-white">{card.value}</div>
                      <div className="text-sm font-black text-violet-600">{card.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
