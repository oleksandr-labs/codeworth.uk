"use client";
import { useState } from "react";

const STORES = [
  { name: "Oxford St", revenue: 18420, target: 18000, sellThru: 74, stock: 342, transfers: 0 },
  { name: "Canary Wharf", revenue: 14200, target: 15000, sellThru: 68, stock: 218, transfers: 3 },
  { name: "Westfield W12", revenue: 22100, target: 20000, sellThru: 81, stock: 287, transfers: 1 },
  { name: "Covent Garden", revenue: 16800, target: 16500, sellThru: 77, stock: 195, transfers: 0 },
  { name: "Shoreditch", revenue: 11400, target: 13000, sellThru: 62, stock: 156, transfers: 5 },
  { name: "Westfield Strat.", revenue: 19600, target: 18500, sellThru: 79, stock: 264, transfers: 2 },
  { name: "Kings Road", revenue: 13800, target: 14200, sellThru: 71, stock: 178, transfers: 4 },
  { name: "Brent Cross", revenue: 12400, target: 13000, sellThru: 65, stock: 201, transfers: 3 },
  { name: "Kingston", revenue: 10200, target: 11000, sellThru: 60, stock: 143, transfers: 6 },
  { name: "Bluewater", revenue: 15600, target: 15000, sellThru: 76, stock: 233, transfers: 1 },
  { name: "Lakeside", revenue: 14900, target: 15000, sellThru: 73, stock: 220, transfers: 2 },
  { name: "Webshop", revenue: 38400, target: 36000, sellThru: 88, stock: 0, transfers: 0 },
];

const SLOW_MOVERS = [
  { sku: "JKT-005-L", name: "Puffer Jacket Navy L", stock: 42, weeks: 8, price: 120, markdown: 20 },
  { sku: "TRS-014-32", name: "Linen Trousers Tan 32", stock: 28, weeks: 6, price: 85, markdown: 15 },
  { sku: "SWT-022-M", name: "Oversized Sweater Grey M", stock: 35, weeks: 9, price: 95, markdown: 25 },
  { sku: "DRS-008-XS", name: "Midi Dress Floral XS", stock: 19, weeks: 7, price: 140, markdown: 30 },
];

export function RetailCoreDemo({ lang }: { lang: string }) {
  const [tab, setTab] = useState<"live" | "markdown" | "transfers" | "buying">("live");
  const [selectedMarkdown, setSelectedMarkdown] = useState<number[]>([]);
  const isUk = lang === "uk";

  const totalRevenue = STORES.reduce((s, v) => s + v.revenue, 0);
  const avgSellThru = Math.round(STORES.reduce((s, v) => s + v.sellThru, 0) / STORES.length);
  const alertStores = STORES.filter(s => s.sellThru < 65).length;
  const pendingTransfers = STORES.reduce((s, v) => s + v.transfers, 0);

  const toggleMarkdown = (i: number) => {
    setSelectedMarkdown(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);
  };

  return (
    <div className="min-h-screen bg-violet-50 dark:bg-neutral-950 font-sans">
      {/* Analytics-first header */}
      <header className="bg-white dark:bg-neutral-900 border-b border-violet-100 dark:border-neutral-800 px-6 py-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-violet-600 rounded-xl flex items-center justify-center text-white font-black text-sm">RC</div>
            <div>
              <span className="font-black text-neutral-900 dark:text-white text-lg">RetailCore</span>
              <span className="ml-2 text-xs text-violet-500 font-semibold bg-violet-50 dark:bg-violet-900/30 px-2 py-0.5 rounded-full">12 stores + webshop</span>
            </div>
          </div>
          <div className="text-xs text-neutral-400 dark:text-neutral-500">Live · Updated 2 min ago</div>
        </div>
        {/* KPI strip */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: isUk ? "Виручка сьогодні" : "Revenue today", value: `£${(totalRevenue / 1000).toFixed(1)}k`, delta: "+9%", ok: true },
            { label: isUk ? "Середній sell-through" : "Avg sell-through", value: `${avgSellThru}%`, delta: "+4pp", ok: true },
            { label: isUk ? "Відставання (точки)" : "Underperforming", value: `${alertStores}`, delta: "stores", ok: false },
            { label: isUk ? "Очікують переміщення" : "Transfers pending", value: `${pendingTransfers}`, delta: "lines", ok: pendingTransfers < 10 },
          ].map(k => (
            <div key={k.label} className={`rounded-xl p-3 border ${k.ok ? "bg-violet-50 dark:bg-violet-900/20 border-violet-100 dark:border-violet-800/50" : "bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-800/50"}`}>
              <div className="text-xl font-black text-neutral-900 dark:text-white">{k.value}</div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400">{k.label}</div>
              <div className={`text-xs font-semibold mt-0.5 ${k.ok ? "text-emerald-600" : "text-amber-600"}`}>{k.delta}</div>
            </div>
          ))}
        </div>
      </header>

      {/* Tabs — underline style */}
      <div className="bg-white dark:bg-neutral-900 px-6 border-b border-neutral-100 dark:border-neutral-800 flex gap-6">
        {([
          { id: "live", label: isUk ? "Live по точках" : "Live by store" },
          { id: "markdown", label: isUk ? "Markdown engine" : "Markdown engine" },
          { id: "transfers", label: isUk ? "Переміщення" : "Transfers" },
          { id: "buying", label: isUk ? "Байєр" : "Buying" },
        ] as const).map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`py-3.5 text-sm font-semibold border-b-2 transition-colors ${
              tab === t.id ? "border-violet-600 text-violet-700 dark:text-violet-400" : "border-transparent text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <main className="p-6 max-w-6xl mx-auto">

        {/* LIVE */}
        {tab === "live" && (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {STORES.map(s => {
              const overTarget = s.revenue >= s.target;
              const pct = Math.min(100, (s.revenue / s.target) * 100);
              return (
                <div key={s.name} className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-100 dark:border-neutral-700 p-4 space-y-2">
                  <div className="font-semibold text-neutral-900 dark:text-white text-sm truncate">{s.name}</div>
                  <div className={`text-xl font-black ${overTarget ? "text-violet-700 dark:text-violet-400" : "text-neutral-900 dark:text-white"}`}>
                    £{(s.revenue / 1000).toFixed(1)}k
                  </div>
                  <div className="h-1.5 bg-neutral-100 dark:bg-neutral-700 rounded-full overflow-hidden">
                    <div className={`h-1.5 rounded-full transition-all ${overTarget ? "bg-violet-500" : "bg-amber-400"}`} style={{ width: `${pct}%` }} />
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-semibold ${s.sellThru >= 70 ? "text-emerald-600" : s.sellThru >= 65 ? "text-amber-600" : "text-red-500"}`}>
                      {s.sellThru}% ST
                    </span>
                    <span className="text-neutral-400 dark:text-neutral-500">
                      {s.stock > 0 ? `${s.stock} units` : "digital"}
                    </span>
                  </div>
                  {s.transfers > 0 && (
                    <div className="text-xs bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 px-2 py-1 rounded-lg">
                      ↔ {s.transfers} {isUk ? "переміщення" : "transfers"}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* MARKDOWN ENGINE */}
        {tab === "markdown" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-neutral-900 dark:text-white">{isUk ? "Повільні рухи — рекомендований markdown" : "Slow movers — recommended markdowns"}</h2>
                <p className="text-sm text-neutral-400 dark:text-neutral-500 mt-0.5">{isUk ? "На основі тижнів запасу та sell-through rate" : "Based on weeks-of-stock and sell-through rate"}</p>
              </div>
              {selectedMarkdown.length > 0 && (
                <button className="bg-violet-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-violet-700 transition-colors">
                  ✓ {isUk ? "Застосувати" : "Apply"} {selectedMarkdown.length} {isUk ? "знижки" : "markdowns"}
                </button>
              )}
            </div>
            {SLOW_MOVERS.map((item, i) => {
              const selected = selectedMarkdown.includes(i);
              const newPrice = item.price * (1 - item.markdown / 100);
              const margin = ((newPrice - item.price * 0.4) / newPrice * 100).toFixed(0);
              return (
                <div
                  key={item.sku}
                  onClick={() => toggleMarkdown(i)}
                  className={`cursor-pointer bg-white dark:bg-neutral-800 rounded-2xl border-2 p-5 transition-all ${selected ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20" : "border-neutral-100 dark:border-neutral-700 hover:border-violet-200 dark:hover:border-violet-700"}`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-mono text-xs text-neutral-400 dark:text-neutral-500">{item.sku}</div>
                      <div className="font-bold text-neutral-900 dark:text-white mt-0.5">{item.name}</div>
                      <div className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                        {item.stock} {isUk ? "од. в наявності" : "units in stock"} · {item.weeks} {isUk ? "тижнів запасу" : "weeks of stock"}
                      </div>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${selected ? "bg-violet-600 border-violet-600 text-white" : "border-neutral-300 dark:border-neutral-600"}`}>
                      {selected && <span className="text-xs">✓</span>}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-6">
                    <div>
                      <div className="text-xs text-neutral-400 dark:text-neutral-500">{isUk ? "Поточна ціна" : "Current price"}</div>
                      <div className="font-bold text-neutral-900 dark:text-white">£{item.price}</div>
                    </div>
                    <div className="text-neutral-300 dark:text-neutral-600 text-xl">→</div>
                    <div>
                      <div className="text-xs text-violet-500">{isUk ? "Нова ціна" : "Recommended"} (−{item.markdown}%)</div>
                      <div className="font-black text-violet-700 dark:text-violet-400 text-lg">£{newPrice.toFixed(0)}</div>
                    </div>
                    <div className="ml-auto bg-neutral-50 dark:bg-neutral-700 rounded-xl px-4 py-2">
                      <div className="text-xs text-neutral-400 dark:text-neutral-500">{isUk ? "Маржа після" : "Margin after"}</div>
                      <div className={`font-bold text-sm ${parseInt(margin) > 25 ? "text-emerald-600" : "text-amber-600"}`}>{margin}%</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TRANSFERS */}
        {tab === "transfers" && (
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white">
              {isUk ? "Рекомендовані міжмагазинні переміщення" : "Recommended inter-store transfers"}
            </h2>
            {[
              { from: "Shoreditch", to: "Oxford St", sku: "JKT-005-L", qty: 8, reason: "Oxford St: 0 stock, 12 requests" },
              { from: "Kings Road", to: "Westfield Strat.", sku: "DRS-008-XS", qty: 4, reason: "Westfield XS size sold out" },
              { from: "Brent Cross", to: "Webshop reserve", sku: "SWT-022-M", qty: 10, reason: "Webshop demand forecasted +40%" },
              { from: "Kingston", to: "Canary Wharf", sku: "TRS-014-32", qty: 6, reason: "Kingston slow; CW sell-through 82%" },
            ].map((t, i) => (
              <div key={i} className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-100 dark:border-neutral-700 p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-2xl">↔</div>
                  <div>
                    <div className="font-semibold text-neutral-900 dark:text-white text-sm">
                      {t.from} → {t.to}
                    </div>
                    <div className="font-mono text-xs text-neutral-400 dark:text-neutral-500 mt-0.5">{t.sku} · {t.qty} units</div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 italic">{t.reason}</div>
                  </div>
                </div>
                <button className="bg-violet-600 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-violet-700 transition-colors">
                  {isUk ? "Підтвердити" : "Approve"}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* BUYING */}
        {tab === "buying" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white">{isUk ? "Байєр — Сезон SS26" : "Buying — Season SS26"}</h2>
              <span className="text-sm bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400 px-3 py-1 rounded-full font-semibold">
                {isUk ? "Бюджет: £280,000" : "Budget: £280,000"}
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-100 dark:border-neutral-700 overflow-hidden">
                <thead className="bg-violet-50 dark:bg-violet-900/20">
                  <tr>
                    {[isUk ? "Категорія" : "Category", isUk ? "Замовлено" : "Ordered", isUk ? "Продано" : "Sold", isUk ? "Залишок" : "Remaining", "Sell-thru", isUk ? "Бюджет SS26" : "SS26 Budget", isUk ? "Рекомендація" : "Rec."].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-violet-700 dark:text-violet-400 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { cat: "Knitwear", ordered: 1200, sold: 1056, budget: 42000, rec: "+5%" },
                    { cat: "Jackets", ordered: 800, sold: 624, budget: 68000, rec: "−10%" },
                    { cat: "Trousers", ordered: 1400, sold: 1204, budget: 35000, rec: "+3%" },
                    { cat: "Dresses", ordered: 960, sold: 710, budget: 52000, rec: "−8%" },
                    { cat: "T-shirts", ordered: 2000, sold: 1860, budget: 22000, rec: "+12%" },
                  ].map(r => {
                    const st = Math.round((r.sold / r.ordered) * 100);
                    const rem = r.ordered - r.sold;
                    return (
                      <tr key={r.cat} className="border-t border-neutral-50 dark:border-neutral-700/50">
                        <td className="px-4 py-3 font-semibold text-neutral-900 dark:text-white">{r.cat}</td>
                        <td className="px-4 py-3 text-neutral-600 dark:text-neutral-300">{r.ordered.toLocaleString()}</td>
                        <td className="px-4 py-3 text-neutral-600 dark:text-neutral-300">{r.sold.toLocaleString()}</td>
                        <td className="px-4 py-3 text-neutral-600 dark:text-neutral-300">{rem.toLocaleString()}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-neutral-100 dark:bg-neutral-700 rounded-full overflow-hidden">
                              <div className={`h-1.5 rounded-full ${st >= 75 ? "bg-emerald-500" : st >= 65 ? "bg-amber-400" : "bg-red-400"}`} style={{ width: `${st}%` }} />
                            </div>
                            <span className={`text-xs font-bold ${st >= 75 ? "text-emerald-600" : st >= 65 ? "text-amber-600" : "text-red-500"}`}>{st}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 font-medium text-neutral-700 dark:text-neutral-300">£{r.budget.toLocaleString()}</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-bold px-2 py-1 rounded-lg ${r.rec.startsWith("+") ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400" : "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"}`}>
                            {r.rec}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
