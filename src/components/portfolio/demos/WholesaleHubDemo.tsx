"use client";
import { useState } from "react";

const NAV = [
  { id: "stock", icon: "📦", label: "Stock" },
  { id: "orders", icon: "📋", label: "Orders" },
  { id: "suppliers", icon: "🚚", label: "Suppliers" },
  { id: "invoice", icon: "🧾", label: "Invoice" },
  { id: "reports", icon: "📊", label: "Reports" },
  { id: "portal", icon: "🛒", label: "B2B" },
];

// Catalogue shown in the customer-facing B2B portal
const CATALOGUE = [
  { sku: "BRK-001", name: "Brick Standard (pallet)", price: 237.5, unit: "pallet", inStock: true },
  { sku: "CEM-204", name: "Portland Cement 25kg", price: 14.5, unit: "bag", inStock: true },
  { sku: "STL-ROD", name: "Steel Rebar 10mm (6m)", price: 22.0, unit: "length", inStock: true },
  { sku: "INS-100", name: "Rockwool Insulation Roll", price: 38.0, unit: "roll", inStock: true },
  { sku: "PLY-12M", name: "Plywood 12mm Sheet", price: 31.0, unit: "sheet", inStock: false },
  { sku: "TIM-C16", name: "C16 Timber 4.8m", price: 16.0, unit: "length", inStock: true },
];

const STOCK = [
  { sku: "BRK-001", name: "Brick Standard (pallet)", qty: 240, min: 50, loc: "W1·A3", trend: "+12", ok: true },
  { sku: "CEM-204", name: "Portland Cement 25kg", qty: 18, min: 30, loc: "W1·B1", trend: "−8", ok: false },
  { sku: "PLY-12M", name: "Plywood 12mm Sheet", qty: 0, min: 20, loc: "W2·C4", trend: "−20", ok: false },
  { sku: "STL-ROD", name: "Steel Rebar 10mm (6m)", qty: 312, min: 100, loc: "W2·A1", trend: "+41", ok: true },
  { sku: "INS-100", name: "Rockwool Insulation Roll", qty: 45, min: 40, loc: "W3·D2", trend: "+5", ok: true },
  { sku: "PVC-110", name: "PVC Pipe 110mm (2m)", qty: 8, min: 25, loc: "W1·C2", trend: "−17", ok: false },
  { sku: "GLS-4MM", name: "Float Glass 4mm (m²)", qty: 92, min: 30, loc: "W3·A5", trend: "+22", ok: true },
  { sku: "TIM-C16", name: "C16 Timber 4.8m", qty: 156, min: 80, loc: "W2·B3", trend: "+34", ok: true },
];

const ORDERS = [
  { id: "ORD-1841", client: "BuildRight Ltd", val: "£2,340", items: 6, status: "Processing", mins: 8 },
  { id: "ORD-1840", client: "North Construct", val: "£780", items: 2, status: "Picking", mins: 23 },
  { id: "ORD-1839", client: "FastBuild UK", val: "£5,120", items: 11, status: "Dispatched", mins: 94 },
  { id: "ORD-1838", client: "City Builders", val: "£1,650", items: 4, status: "Delivered", mins: 340 },
  { id: "ORD-1837", client: "SteelWorx Ltd", val: "£8,900", items: 3, status: "Delivered", mins: 420 },
];

const SUPPLIERS = [
  { name: "Hanson Cement UK", cat: "Cement & Aggregates", lead: 2, rating: 4.8, openPO: 2, spend: "£142k", auto: true },
  { name: "British Steel Ltd", cat: "Steel & Rebar", lead: 5, rating: 4.6, openPO: 1, spend: "£318k", auto: true },
  { name: "Forterra Bricks", cat: "Bricks & Blocks", lead: 3, rating: 4.9, openPO: 0, spend: "£96k", auto: true },
  { name: "Knauf Insulation", cat: "Insulation", lead: 4, rating: 4.4, openPO: 1, spend: "£54k", auto: false },
  { name: "Polypipe Group", cat: "Plumbing & PVC", lead: 6, rating: 4.2, openPO: 3, spend: "£71k", auto: false },
];

// Monthly revenue for the bar chart (£k)
const REV_12M = [62, 71, 68, 84, 79, 92, 88, 95, 102, 97, 110, 124];

const TOP_SKUS = [
  { name: "Steel Rebar 10mm", units: 8420, rev: "£185k" },
  { name: "Portland Cement 25kg", units: 12100, rev: "£175k" },
  { name: "Brick Standard", units: 940, rev: "£223k" },
  { name: "C16 Timber 4.8m", units: 6200, rev: "£99k" },
];

export function WholesaleHubDemo({ lang }: { lang: string }) {
  const [active, setActive] = useState("stock");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<Record<string, number>>({ "STL-ROD": 50, "CEM-204": 20 });
  const [placed, setPlaced] = useState(false);
  const isUk = lang === "uk";

  const addToCart = (sku: string) => setCart(c => ({ ...c, [sku]: (c[sku] ?? 0) + 1 }));
  const removeFromCart = (sku: string) => setCart(c => {
    const n = (c[sku] ?? 0) - 1;
    const next = { ...c };
    if (n <= 0) delete next[sku]; else next[sku] = n;
    return next;
  });
  const cartLines = Object.entries(cart).map(([sku, qty]) => ({ ...CATALOGUE.find(p => p.sku === sku)!, qty }));
  const cartTotal = cartLines.reduce((s, l) => s + l.price * l.qty, 0);

  const filtered = STOCK.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) || s.sku.includes(search.toUpperCase())
  );

  return (
    <div className="flex h-screen bg-[#0f1117] text-white font-mono overflow-hidden select-none">

      {/* ── SIDEBAR ── */}
      <aside className="w-16 bg-[#0a0c10] border-r border-white/5 flex flex-col items-center py-4 gap-1 shrink-0">
        <div className="w-9 h-9 bg-sky-500 rounded-lg flex items-center justify-center text-xs font-bold mb-4">WH</div>
        {NAV.map(n => (
          <button
            key={n.id}
            onClick={() => setActive(n.id)}
            title={n.label}
            className={`w-10 h-10 rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all ${
              active === n.id ? "bg-sky-500/20 text-sky-400" : "text-white/30 hover:text-white/60 hover:bg-white/5"
            }`}
          >
            <span className="text-base leading-none">{n.icon}</span>
            <span className="text-[8px] leading-none">{n.label}</span>
          </button>
        ))}
        <div className="mt-auto">
          <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-xs">JT</div>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Topbar */}
        <div className="h-11 border-b border-white/5 flex items-center px-4 gap-4 shrink-0 bg-[#0f1117]">
          <span className="text-white/40 text-xs uppercase tracking-widest">{NAV.find(n => n.id === active)?.label}</span>
          <div className="ml-auto flex items-center gap-3">
            <div className="text-xs text-white/30">Birmingham · 3 warehouses</div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              Live
            </div>
          </div>
        </div>

        {/* ── STOCK ── */}
        {active === "stock" && (
          <div className="flex-1 overflow-auto">
            <div className="px-4 py-3 flex items-center gap-3 border-b border-white/5 sticky top-0 bg-[#0f1117] z-10">
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={isUk ? "Пошук SKU або назви..." : "Search SKU or name..."}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder:text-white/30 outline-none focus:border-sky-500/50 w-56"
              />
              <div className="ml-auto flex gap-4 text-xs">
                <span className="text-white/40">{filtered.length} {isUk ? "позицій" : "items"}</span>
                <span className="text-red-400">{filtered.filter(s => !s.ok).length} {isUk ? "проблем" : "alerts"}</span>
              </div>
            </div>
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-white/5">
                  {["SKU", isUk ? "Назва" : "Product", isUk ? "Залишок" : "Qty", isUk ? "Мін" : "Min", isUk ? "Локація" : "Location", "24h", isUk ? "Статус" : "Status"].map(h => (
                    <th key={h} className="px-4 py-2.5 text-left text-white/30 font-normal tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(s => (
                  <tr key={s.sku} className="border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors">
                    <td className="px-4 py-2.5 text-sky-400">{s.sku}</td>
                    <td className="px-4 py-2.5 text-white/80">{s.name}</td>
                    <td className={`px-4 py-2.5 font-bold tabular-nums ${s.qty === 0 ? "text-red-400" : s.ok ? "text-white" : "text-amber-400"}`}>{s.qty}</td>
                    <td className="px-4 py-2.5 text-white/40">{s.min}</td>
                    <td className="px-4 py-2.5 text-white/50 font-mono">{s.loc}</td>
                    <td className={`px-4 py-2.5 tabular-nums ${s.trend.startsWith("+") ? "text-emerald-400" : "text-red-400"}`}>{s.trend}</td>
                    <td className="px-4 py-2.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                        s.qty === 0 ? "bg-red-500/20 text-red-400" : !s.ok ? "bg-amber-500/20 text-amber-400" : "bg-emerald-500/10 text-emerald-500"
                      }`}>
                        {s.qty === 0 ? "OUT" : !s.ok ? "LOW" : "OK"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ── ORDERS ── */}
        {active === "orders" && (
          <div className="flex-1 overflow-auto">
            <div className="px-4 py-3 flex items-center justify-between border-b border-white/5 sticky top-0 bg-[#0f1117]">
              <span className="text-xs text-white/40">{isUk ? "Сьогодні" : "Today"} · {ORDERS.length} {isUk ? "замовлень" : "orders"}</span>
              <button className="bg-sky-500 hover:bg-sky-400 text-white text-xs px-3 py-1.5 rounded-lg transition-colors">
                + {isUk ? "Нове" : "New order"}
              </button>
            </div>
            {ORDERS.map(o => (
              <div key={o.id} className="flex items-center border-b border-white/[0.04] px-4 py-3 hover:bg-white/[0.03] transition-colors">
                <span className="text-sky-400 w-24">{o.id}</span>
                <span className="text-white/80 flex-1">{o.client}</span>
                <span className="text-white/50 w-20 text-right">{o.items} {isUk ? "поз." : "items"}</span>
                <span className="text-white w-24 text-right font-bold tabular-nums">{o.val}</span>
                <span className="w-32 text-right">
                  <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                    o.status === "Delivered" ? "bg-emerald-500/10 text-emerald-400" :
                    o.status === "Dispatched" ? "bg-sky-500/10 text-sky-400" :
                    o.status === "Picking" ? "bg-amber-500/10 text-amber-400" :
                    "bg-white/5 text-white/50"
                  }`}>{o.status}</span>
                </span>
                <span className="text-white/20 w-20 text-right text-[10px]">{o.mins}m {isUk ? "тому" : "ago"}</span>
              </div>
            ))}
          </div>
        )}

        {/* ── INVOICE ── */}
        {active === "invoice" && (
          <div className="flex-1 overflow-auto p-6 flex gap-6">
            <div className="flex-1 bg-white/[0.03] border border-white/10 rounded-xl p-5 text-xs space-y-4">
              <div className="flex justify-between">
                <div>
                  <div className="text-white/40 text-[10px] uppercase mb-1">FROM</div>
                  <div className="text-white font-bold">WholesaleHub Ltd</div>
                  <div className="text-white/40">14 Trade Park, Birmingham B12 4XX</div>
                  <div className="text-white/40">VAT: GB 123 456 789</div>
                </div>
                <div className="text-right">
                  <div className="text-sky-400 font-bold text-base">INV-2025-1841</div>
                  <div className="text-white/40">Issued: 02 Jun 2025</div>
                  <div className="text-white/40">Due: 16 Jun 2025</div>
                </div>
              </div>
              <div className="border-t border-white/10 pt-3">
                <div className="text-white/40 text-[10px] uppercase mb-1">BILL TO</div>
                <div className="text-white">BuildRight Ltd</div>
                <div className="text-white/40">22 Construction Ave, London EC1</div>
              </div>
              <table className="w-full">
                <thead><tr className="border-b border-white/10">
                  <th className="text-left text-white/30 font-normal pb-2">{isUk ? "Опис" : "Description"}</th>
                  <th className="text-right text-white/30 font-normal pb-2">{isUk ? "Кіл." : "Qty"}</th>
                  <th className="text-right text-white/30 font-normal pb-2">{isUk ? "Ціна" : "Rate"}</th>
                  <th className="text-right text-white/30 font-normal pb-2">{isUk ? "Сума" : "Amount"}</th>
                </tr></thead>
                <tbody className="divide-y divide-white/5">
                  {[["Portland Cement 25kg","20","£14.50","£290.00"],["Steel Rebar 10mm","50","£22.00","£1,100.00"],["Brick Standard (pallet)","4","£237.50","£950.00"]].map(r => (
                    <tr key={r[0]}><td className="py-2 text-white/70">{r[0]}</td><td className="text-right text-white/50">{r[1]}</td><td className="text-right text-white/50">{r[2]}</td><td className="text-right text-white">{r[3]}</td></tr>
                  ))}
                </tbody>
              </table>
              <div className="border-t border-white/10 pt-3 space-y-1 text-right">
                <div className="text-white/40">Subtotal: £2,340.00</div>
                <div className="text-white/40">VAT 20%: £468.00</div>
                <div className="text-white text-base font-bold">Total: £2,808.00</div>
              </div>
              <button className="w-full bg-sky-500 hover:bg-sky-400 text-white py-2 rounded-lg transition-colors text-center">
                ↓ {isUk ? "Завантажити PDF" : "Download PDF"}
              </button>
            </div>
          </div>
        )}

        {/* ── SUPPLIERS ── */}
        {active === "suppliers" && (
          <div className="flex-1 overflow-auto">
            <div className="px-4 py-3 flex items-center justify-between border-b border-white/5 sticky top-0 bg-[#0f1117]">
              <span className="text-xs text-white/40">{SUPPLIERS.length} {isUk ? "постачальників" : "suppliers"} · {SUPPLIERS.filter(s => s.auto).length} {isUk ? "на авто-замовленні" : "auto-reorder on"}</span>
              <button className="bg-sky-500 hover:bg-sky-400 text-white text-xs px-3 py-1.5 rounded-lg transition-colors">+ {isUk ? "Постачальник" : "Add supplier"}</button>
            </div>
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-white/5">
                  {[isUk ? "Постачальник" : "Supplier", isUk ? "Категорія" : "Category", isUk ? "Лід-тайм" : "Lead", isUk ? "Рейтинг" : "Rating", isUk ? "Відкриті PO" : "Open PO", "YTD spend", isUk ? "Авто" : "Auto"].map(h => (
                    <th key={h} className="px-4 py-2.5 text-left text-white/30 font-normal tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SUPPLIERS.map(s => (
                  <tr key={s.name} className="border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors">
                    <td className="px-4 py-2.5 text-white/90 font-medium">{s.name}</td>
                    <td className="px-4 py-2.5 text-white/50">{s.cat}</td>
                    <td className="px-4 py-2.5 text-white/60 tabular-nums">{s.lead} {isUk ? "дн" : "days"}</td>
                    <td className="px-4 py-2.5">
                      <span className={`tabular-nums ${s.rating >= 4.5 ? "text-emerald-400" : "text-amber-400"}`}>★ {s.rating}</span>
                    </td>
                    <td className="px-4 py-2.5 text-white/60 tabular-nums">{s.openPO}</td>
                    <td className="px-4 py-2.5 text-white tabular-nums font-bold">{s.spend}</td>
                    <td className="px-4 py-2.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${s.auto ? "bg-emerald-500/10 text-emerald-400" : "bg-white/5 text-white/30"}`}>
                        {s.auto ? "ON" : "OFF"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-4 py-3 text-[10px] text-white/25">
              ⚡ {isUk ? "Авто-замовлення спрацьовує коли залишок SKU падає нижче мінімуму" : "Auto-reorder fires when an SKU drops below its minimum threshold"}
            </div>
          </div>
        )}

        {/* ── REPORTS ── */}
        {active === "reports" && (
          <div className="flex-1 overflow-auto p-5 space-y-5">
            {/* KPI row */}
            <div className="grid grid-cols-4 gap-3">
              {[
                { l: isUk ? "Виручка (рік)" : "Revenue YTD", v: "£1.07M", d: "+18%" },
                { l: isUk ? "Сер. час замовл." : "Avg order time", v: "7 min", d: "−72%" },
                { l: isUk ? "Точність залишків" : "Stock accuracy", v: "99.1%", d: "+91%" },
                { l: isUk ? "Активні клієнти" : "Active clients", v: "47", d: "+9" },
              ].map(k => (
                <div key={k.l} className="bg-white/[0.03] border border-white/10 rounded-xl p-3">
                  <div className="text-lg font-black text-white tabular-nums">{k.v}</div>
                  <div className="text-[10px] text-white/40">{k.l}</div>
                  <div className="text-[10px] text-emerald-400 font-medium mt-0.5">{k.d}</div>
                </div>
              ))}
            </div>
            {/* Revenue chart */}
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
              <div className="text-[10px] text-white/40 uppercase tracking-widest mb-3">{isUk ? "Виручка по місяцях (£k)" : "Monthly revenue (£k)"}</div>
              <div className="flex items-end gap-1.5 h-32">
                {REV_12M.map((v, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full bg-sky-500/80 rounded-t hover:bg-sky-400 transition-colors" style={{ height: `${(v / Math.max(...REV_12M)) * 100}%` }} title={`£${v}k`} />
                    <span className="text-[8px] text-white/20">{["J","F","M","A","M","J","J","A","S","O","N","D"][i]}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Top SKUs */}
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
              <div className="text-[10px] text-white/40 uppercase tracking-widest mb-3">{isUk ? "Топ SKU за виручкою (рік)" : "Top SKUs by revenue (YTD)"}</div>
              <div className="space-y-2">
                {TOP_SKUS.map(s => (
                  <div key={s.name} className="flex items-center justify-between text-xs">
                    <span className="text-white/70">{s.name}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-white/40 tabular-nums">{s.units.toLocaleString()} {isUk ? "од." : "units"}</span>
                      <span className="text-white font-bold tabular-nums w-16 text-right">{s.rev}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── B2B CLIENT PORTAL (customer-facing view) ── */}
        {active === "portal" && (
          <div className="flex-1 overflow-auto">
            {/* Portal sub-header — visually distinct from operator chrome */}
            <div className="bg-sky-500/10 border-b border-sky-500/20 px-4 py-2.5 flex items-center justify-between sticky top-0 backdrop-blur z-10">
              <div className="flex items-center gap-2">
                <span className="text-sky-400 text-xs font-bold uppercase tracking-wide">🛒 B2B {isUk ? "Портал" : "Portal"}</span>
                <span className="text-white/40 text-xs">{isUk ? "вигляд клієнта · BuildRight Ltd" : "client view · BuildRight Ltd"}</span>
              </div>
              <div className="text-xs text-white/40">{isUk ? "Кредитний ліміт" : "Credit limit"}: <span className="text-emerald-400 font-bold">£15,000</span></div>
            </div>

            <div className="flex">
              {/* Catalogue */}
              <div className="flex-1 p-4 space-y-2">
                <div className="text-[10px] text-white/30 uppercase tracking-widest mb-1">{isUk ? "Каталог — замовлення 24/7" : "Catalogue — order 24/7"}</div>
                {CATALOGUE.map(p => (
                  <div key={p.sku} className={`flex items-center justify-between rounded-lg border px-3 py-2.5 ${p.inStock ? "bg-white/[0.03] border-white/10" : "bg-white/[0.01] border-white/5 opacity-60"}`}>
                    <div>
                      <div className="text-sm text-white/90">{p.name}</div>
                      <div className="text-[10px] text-white/40">{p.sku} · £{p.price.toFixed(2)} / {p.unit}</div>
                    </div>
                    {p.inStock ? (
                      <div className="flex items-center gap-1.5">
                        {cart[p.sku] ? (
                          <>
                            <button onClick={() => removeFromCart(p.sku)} className="w-6 h-6 rounded bg-white/10 text-white hover:bg-white/20 text-sm">−</button>
                            <span className="w-7 text-center text-sm text-white tabular-nums">{cart[p.sku]}</span>
                          </>
                        ) : null}
                        <button onClick={() => addToCart(p.sku)} className="w-6 h-6 rounded bg-sky-500 text-white hover:bg-sky-400 text-sm">+</button>
                      </div>
                    ) : (
                      <span className="text-[10px] text-red-400 font-medium">{isUk ? "Немає" : "Out of stock"}</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Cart / basket */}
              <div className="w-64 shrink-0 border-l border-white/5 p-4 bg-[#0a0c10]">
                <div className="text-[10px] text-white/30 uppercase tracking-widest mb-3">{isUk ? "Кошик" : "Your basket"}</div>
                {placed ? (
                  <div className="text-center py-8">
                    <div className="text-3xl mb-2">✅</div>
                    <div className="text-sm text-emerald-400 font-bold">{isUk ? "Замовлення розміщено!" : "Order placed!"}</div>
                    <div className="text-xs text-white/40 mt-1">{isUk ? "Надійшло оператору · ORD-1842" : "Sent to operator · ORD-1842"}</div>
                    <button onClick={() => { setPlaced(false); setCart({}); }} className="mt-4 text-xs text-sky-400 hover:text-sky-300">{isUk ? "Нове замовлення" : "New order"}</button>
                  </div>
                ) : cartLines.length === 0 ? (
                  <div className="text-xs text-white/30 italic py-8 text-center">{isUk ? "Кошик порожній" : "Basket is empty"}</div>
                ) : (
                  <>
                    <div className="space-y-2 mb-3">
                      {cartLines.map(l => (
                        <div key={l.sku} className="flex justify-between text-xs">
                          <span className="text-white/70">{l.qty}× {l.name.split("(")[0].trim()}</span>
                          <span className="text-white tabular-nums">£{(l.price * l.qty).toFixed(0)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-white/10 pt-2 space-y-1">
                      <div className="flex justify-between text-xs text-white/40"><span>{isUk ? "Сума" : "Subtotal"}</span><span className="tabular-nums">£{cartTotal.toFixed(0)}</span></div>
                      <div className="flex justify-between text-xs text-white/40"><span>VAT 20%</span><span className="tabular-nums">£{(cartTotal * 0.2).toFixed(0)}</span></div>
                      <div className="flex justify-between text-sm font-bold text-white"><span>{isUk ? "Разом" : "Total"}</span><span className="tabular-nums">£{(cartTotal * 1.2).toFixed(0)}</span></div>
                    </div>
                    <button onClick={() => setPlaced(true)} className="mt-3 w-full bg-sky-500 hover:bg-sky-400 text-white text-sm font-semibold py-2 rounded-lg transition-colors">
                      {isUk ? "Розмістити замовлення" : "Place order"} →
                    </button>
                    <div className="text-[10px] text-white/25 mt-2 text-center">{isUk ? "На рахунок · оплата 14 днів" : "On account · 14-day terms"}</div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Statusbar */}
        <div className="h-7 border-t border-white/5 bg-[#0a0c10] flex items-center px-4 gap-6 text-[10px] text-white/25 shrink-0">
          <span>500+ SKU · 3 {isUk ? "склади" : "warehouses"}</span>
          <span className="text-amber-400">⚠ 3 {isUk ? "позиції нижче мінімуму" : "items below min"}</span>
          <span className="ml-auto">v2.4.1</span>
        </div>
      </div>
    </div>
  );
}
