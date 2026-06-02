"use client";
import { useState } from "react";

const STOCK = [
  { sku: "BRK-001", name: "Brick Standard (pallet)", qty: 240, min: 50, location: "W1-A3", status: "ok" },
  { sku: "CEM-204", name: "Portland Cement 25kg", qty: 18, min: 30, location: "W1-B1", status: "low" },
  { sku: "PLY-12M", name: "Plywood 12mm Sheet", qty: 0, min: 20, location: "W2-C4", status: "out" },
  { sku: "STL-ROD", name: "Steel Rebar 10mm (6m)", qty: 312, min: 100, location: "W2-A1", status: "ok" },
  { sku: "INS-100", name: "Rockwool Insulation Roll", qty: 45, min: 40, location: "W3-D2", status: "ok" },
  { sku: "PVC-110", name: "PVC Pipe 110mm (2m)", qty: 8, min: 25, location: "W1-C2", status: "low" },
];

const ORDERS = [
  { id: "ORD-1841", client: "BuildRight Ltd", items: 6, total: "£2,340", status: "Processing", date: "02 Jun" },
  { id: "ORD-1840", client: "North Construct", items: 2, total: "£780", status: "Dispatched", date: "02 Jun" },
  { id: "ORD-1839", client: "FastBuild UK", items: 11, total: "£5,120", status: "Delivered", date: "01 Jun" },
  { id: "ORD-1838", client: "City Builders", items: 4, total: "£1,650", status: "Delivered", date: "01 Jun" },
];

const KPIS = [
  { label: "Orders Today", value: "14", trend: "+3", icon: "📦" },
  { label: "Revenue Today", value: "£8,420", trend: "+12%", icon: "💷" },
  { label: "Low Stock SKUs", value: "3", trend: "!", icon: "⚠️" },
  { label: "Active Clients", value: "47", trend: "+2", icon: "🏢" },
];

const STATUS_STYLE: Record<string, string> = {
  ok: "bg-emerald-100 text-emerald-700",
  low: "bg-amber-100 text-amber-700",
  out: "bg-red-100 text-red-700",
  Processing: "bg-blue-100 text-blue-700",
  Dispatched: "bg-amber-100 text-amber-700",
  Delivered: "bg-emerald-100 text-emerald-700",
};

export function WholesaleHubDemo({ lang }: { lang: string }) {
  const [tab, setTab] = useState<"dashboard" | "stock" | "orders" | "invoice">("dashboard");
  const isUk = lang === "uk";

  const TABS = [
    { id: "dashboard", label: isUk ? "Дашборд" : "Dashboard" },
    { id: "stock",     label: isUk ? "Склад" : "Stock" },
    { id: "orders",    label: isUk ? "Замовлення" : "Orders" },
    { id: "invoice",   label: isUk ? "Інвойс" : "Invoice" },
  ] as const;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
      {/* Top bar */}
      <header className="bg-slate-800 dark:bg-slate-900 text-white px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl">🏭</span>
          <span className="font-bold text-lg tracking-tight">WholesaleHub ERP</span>
          <span className="text-xs bg-slate-600 px-2 py-0.5 rounded text-slate-300">Birmingham Branch</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-slate-300">
          <span>👤 James Thornton</span>
          <span className="w-2 h-2 bg-emerald-400 rounded-full inline-block" />
          <span className="text-emerald-400 text-xs">{isUk ? "Онлайн" : "Online"}</span>
        </div>
      </header>

      {/* Nav */}
      <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-6 flex gap-1">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              tab === t.id
                ? "border-slate-700 text-slate-900 dark:text-white dark:border-slate-300"
                : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            }`}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-6">

        {/* DASHBOARD */}
        {tab === "dashboard" && (
          <div className="space-y-6">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              {isUk ? "Огляд на сьогодні" : "Today's Overview"}
            </h1>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {KPIS.map(k => (
                <div key={k.label} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-4">
                  <div className="text-2xl mb-1">{k.icon}</div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">{k.value}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{k.label}</div>
                  <div className={`text-xs mt-1 font-medium ${k.trend.startsWith("+") ? "text-emerald-600" : "text-amber-600"}`}>{k.trend}</div>
                </div>
              ))}
            </div>
            {/* Recent orders */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 font-semibold text-slate-900 dark:text-white text-sm">
                {isUk ? "Останні замовлення" : "Recent Orders"}
              </div>
              {ORDERS.slice(0, 3).map(o => (
                <div key={o.id} className="flex items-center justify-between px-5 py-3 border-b border-slate-50 dark:border-slate-700/50 last:border-0">
                  <div>
                    <span className="font-mono text-xs text-slate-400 dark:text-slate-500">{o.id}</span>
                    <span className="ml-3 text-sm font-medium text-slate-900 dark:text-white">{o.client}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{o.total}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_STYLE[o.status]}`}>{o.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STOCK */}
        {tab === "stock" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">{isUk ? "Управління складом" : "Stock Management"}</h1>
              <button className="bg-slate-800 text-white text-sm px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors">
                + {isUk ? "Додати SKU" : "Add SKU"}
              </button>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 dark:bg-slate-700/50">
                  <tr>
                    {["SKU", isUk ? "Назва" : "Product", isUk ? "Залишок" : "Qty", isUk ? "Мін" : "Min", isUk ? "Склад" : "Location", isUk ? "Статус" : "Status"].map(h => (
                      <th key={h} className="px-4 py-3 text-left font-medium text-slate-600 dark:text-slate-300 text-xs uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {STOCK.map(s => (
                    <tr key={s.sku} className="border-t border-slate-50 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30">
                      <td className="px-4 py-3 font-mono text-xs text-slate-500 dark:text-slate-400">{s.sku}</td>
                      <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">{s.name}</td>
                      <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">{s.qty}</td>
                      <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{s.min}</td>
                      <td className="px-4 py-3 text-slate-500 dark:text-slate-400 font-mono text-xs">{s.location}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_STYLE[s.status]}`}>
                          {s.status === "ok" ? (isUk ? "В нормі" : "OK") : s.status === "low" ? (isUk ? "Мало" : "Low") : (isUk ? "Немає" : "Out")}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ORDERS */}
        {tab === "orders" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">{isUk ? "Замовлення B2B" : "B2B Orders"}</h1>
              <button className="bg-slate-800 text-white text-sm px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors">
                + {isUk ? "Нове замовлення" : "New Order"}
              </button>
            </div>
            <div className="space-y-3">
              {ORDERS.map(o => (
                <div key={o.id} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-4 flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-slate-400 dark:text-slate-500">{o.id}</span>
                      <span className="font-semibold text-slate-900 dark:text-white">{o.client}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_STYLE[o.status]}`}>{o.status}</span>
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {o.items} {isUk ? "позицій" : "items"} · {o.date}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-slate-900 dark:text-white">{o.total}</div>
                    <button className="text-xs text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 mt-1">{isUk ? "Деталі →" : "Details →"}</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* INVOICE */}
        {tab === "invoice" && (
          <div className="space-y-4">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">{isUk ? "Генерація інвойсу" : "Invoice Generator"}</h1>
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-6 max-w-xl">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-1">FROM</div>
                  <div className="font-bold text-slate-900 dark:text-white">WholesaleHub Ltd</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">14 Trade Park, Birmingham B12 4XX</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">VAT: GB 123 456 789</div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-lg font-bold text-slate-900 dark:text-white">INV-2024-1841</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Date: 02 Jun 2025</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Due: 16 Jun 2025</div>
                </div>
              </div>
              <div className="border-t border-slate-100 dark:border-slate-700 pt-4 mb-4">
                <div className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-2">BILL TO</div>
                <div className="font-semibold text-slate-900 dark:text-white">BuildRight Ltd</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">22 Construction Ave, London EC1 5AB</div>
              </div>
              <table className="w-full text-sm mb-4">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-700">
                    <th className="text-left pb-2 text-slate-500 dark:text-slate-400 font-medium">Item</th>
                    <th className="text-right pb-2 text-slate-500 dark:text-slate-400 font-medium">Qty</th>
                    <th className="text-right pb-2 text-slate-500 dark:text-slate-400 font-medium">Price</th>
                    <th className="text-right pb-2 text-slate-500 dark:text-slate-400 font-medium">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
                  <tr><td className="py-2 text-slate-800 dark:text-slate-200">Portland Cement 25kg</td><td className="text-right text-slate-700 dark:text-slate-300">20</td><td className="text-right text-slate-700 dark:text-slate-300">£14.50</td><td className="text-right font-medium text-slate-900 dark:text-white">£290.00</td></tr>
                  <tr><td className="py-2 text-slate-800 dark:text-slate-200">Steel Rebar 10mm (6m)</td><td className="text-right text-slate-700 dark:text-slate-300">50</td><td className="text-right text-slate-700 dark:text-slate-300">£22.00</td><td className="text-right font-medium text-slate-900 dark:text-white">£1,100.00</td></tr>
                  <tr><td className="py-2 text-slate-800 dark:text-slate-200">Brick Standard (pallet)</td><td className="text-right text-slate-700 dark:text-slate-300">4</td><td className="text-right text-slate-700 dark:text-slate-300">£237.50</td><td className="text-right font-medium text-slate-900 dark:text-white">£950.00</td></tr>
                </tbody>
              </table>
              <div className="text-right space-y-1 border-t border-slate-100 dark:border-slate-700 pt-3">
                <div className="text-sm text-slate-500 dark:text-slate-400">Subtotal: £2,340.00</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">VAT (20%): £468.00</div>
                <div className="font-bold text-lg text-slate-900 dark:text-white">Total: £2,808.00</div>
              </div>
              <button className="mt-4 w-full bg-slate-800 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors">
                📄 {isUk ? "Завантажити PDF" : "Download PDF"}
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
