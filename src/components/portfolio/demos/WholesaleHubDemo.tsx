"use client";
import { useState } from "react";
import {
  LayoutDashboard, Package, ClipboardList, Truck, Receipt,
  BarChart3, ShoppingCart, Bell, X, ChevronRight, RefreshCw,
  AlertTriangle, CheckCircle2, TrendingUp, Users,
  ArrowLeftRight, ShoppingBag,
} from "lucide-react";

const NAV = [
  { id: "dash",      Icon: LayoutDashboard, label: "Home" },
  { id: "stock",     Icon: Package,         label: "Stock" },
  { id: "orders",    Icon: ClipboardList,   label: "Orders" },
  { id: "purchases", Icon: ShoppingBag,     label: "POs" },
  { id: "transfers", Icon: ArrowLeftRight,  label: "Xfer" },
  { id: "suppliers", Icon: Truck,           label: "Suppliers" },
  { id: "invoice",   Icon: Receipt,         label: "Invoice" },
  { id: "reports",   Icon: BarChart3,       label: "Reports" },
  { id: "portal",    Icon: ShoppingCart,    label: "B2B" },
];

const CATALOGUE = [
  { sku: "BRK-001", name: "Brick Standard (pallet)",   price: 237.5,  unit: "pallet", inStock: true },
  { sku: "CEM-204", name: "Portland Cement 25kg",       price: 14.5,   unit: "bag",    inStock: true },
  { sku: "STL-ROD", name: "Steel Rebar 10mm (6m)",      price: 22.0,   unit: "length", inStock: true },
  { sku: "INS-100", name: "Rockwool Insulation Roll",   price: 38.0,   unit: "roll",   inStock: true },
  { sku: "PLY-12M", name: "Plywood 12mm Sheet",         price: 31.0,   unit: "sheet",  inStock: false },
  { sku: "TIM-C16", name: "C16 Timber 4.8m",            price: 16.0,   unit: "length", inStock: true },
];

const STOCK_ALL = [
  { sku: "BRK-001", name: "Brick Standard (pallet)",   qty: 240, min: 50,  loc: "W1·A3", wh: "W1", trend: "+12", ok: true  },
  { sku: "CEM-204", name: "Portland Cement 25kg",       qty: 18,  min: 30,  loc: "W1·B1", wh: "W1", trend: "−8",  ok: false },
  { sku: "PLY-12M", name: "Plywood 12mm Sheet",         qty: 0,   min: 20,  loc: "W2·C4", wh: "W2", trend: "−20", ok: false },
  { sku: "STL-ROD", name: "Steel Rebar 10mm (6m)",      qty: 312, min: 100, loc: "W2·A1", wh: "W2", trend: "+41", ok: true  },
  { sku: "INS-100", name: "Rockwool Insulation Roll",   qty: 45,  min: 40,  loc: "W3·D2", wh: "W3", trend: "+5",  ok: true  },
  { sku: "PVC-110", name: "PVC Pipe 110mm (2m)",        qty: 8,   min: 25,  loc: "W1·C2", wh: "W1", trend: "−17", ok: false },
  { sku: "GLS-4MM", name: "Float Glass 4mm (m²)",       qty: 92,  min: 30,  loc: "W3·A5", wh: "W3", trend: "+22", ok: true  },
  { sku: "TIM-C16", name: "C16 Timber 4.8m",            qty: 156, min: 80,  loc: "W2·B3", wh: "W2", trend: "+34", ok: true  },
];

const ORDERS = [
  {
    id: "ORD-1841", client: "BuildRight Ltd",   val: "£2,340", items: 3, status: "Processing", mins: 8,
    lines: [
      { name: "Portland Cement 25kg",   qty: 20,  rate: "£14.50", total: "£290.00"   },
      { name: "Steel Rebar 10mm (6m)", qty: 50,  rate: "£22.00", total: "£1,100.00" },
      { name: "Brick Standard (pallet)", qty: 4, rate: "£237.50", total: "£950.00"  },
    ],
  },
  {
    id: "ORD-1840", client: "North Construct",  val: "£780",   items: 2, status: "Picking",    mins: 23,
    lines: [
      { name: "C16 Timber 4.8m",          qty: 30, rate: "£16.00", total: "£480.00" },
      { name: "Rockwool Insulation Roll",  qty: 5,  rate: "£38.00", total: "£190.00" },
      { name: "Float Glass 4mm (m²)",      qty: 3,  rate: "£37.00", total: "£111.00" },
    ],
  },
  {
    id: "ORD-1839", client: "FastBuild UK",     val: "£5,120", items: 4, status: "Dispatched", mins: 94,
    lines: [
      { name: "Steel Rebar 10mm (6m)",     qty: 200, rate: "£22.00",  total: "£4,400.00" },
      { name: "Portland Cement 25kg",      qty: 40,  rate: "£14.50",  total: "£580.00"   },
      { name: "PVC Pipe 110mm (2m)",       qty: 5,   rate: "£28.00",  total: "£140.00"   },
    ],
  },
  {
    id: "ORD-1838", client: "City Builders",    val: "£1,650", items: 4, status: "Delivered",  mins: 340,
    lines: [
      { name: "Brick Standard (pallet)",   qty: 6,  rate: "£237.50", total: "£1,425.00" },
      { name: "C16 Timber 4.8m",           qty: 14, rate: "£16.00",  total: "£224.00"   },
    ],
  },
  {
    id: "ORD-1837", client: "SteelWorx Ltd",    val: "£8,900", items: 3, status: "Delivered",  mins: 420,
    lines: [
      { name: "Steel Rebar 10mm (6m)",     qty: 400, rate: "£22.00", total: "£8,800.00" },
      { name: "Portland Cement 25kg",      qty: 5,   rate: "£14.50", total: "£72.50"    },
    ],
  },
];

const SUPPLIERS = [
  { name: "Hanson Cement UK",  cat: "Cement & Aggregates", lead: 2, rating: 4.8, openPO: 2, spend: "£142k", auto: true  },
  { name: "British Steel Ltd", cat: "Steel & Rebar",       lead: 5, rating: 4.6, openPO: 1, spend: "£318k", auto: true  },
  { name: "Forterra Bricks",   cat: "Bricks & Blocks",     lead: 3, rating: 4.9, openPO: 0, spend: "£96k",  auto: true  },
  { name: "Knauf Insulation",  cat: "Insulation",          lead: 4, rating: 4.4, openPO: 1, spend: "£54k",  auto: false },
  { name: "Polypipe Group",    cat: "Plumbing & PVC",      lead: 6, rating: 4.2, openPO: 3, spend: "£71k",  auto: false },
];

const REV_12M = [62, 71, 68, 84, 79, 92, 88, 95, 102, 97, 110, 124];

const TOP_SKUS = [
  { name: "Steel Rebar 10mm",      units: 8420,  rev: "£185k", pct: 87 },
  { name: "Portland Cement 25kg",  units: 12100, rev: "£175k", pct: 82 },
  { name: "Brick Standard",        units: 940,   rev: "£223k", pct: 100 },
  { name: "C16 Timber 4.8m",       units: 6200,  rev: "£99k",  pct: 47  },
];

const TOP_CLIENTS = [
  { name: "SteelWorx Ltd",   ytd: "£142k", orders: 18, credit: "£20k" },
  { name: "FastBuild UK",    ytd: "£118k", orders: 24, credit: "£15k" },
  { name: "City Builders",   ytd: "£97k",  orders: 31, credit: "£12k" },
  { name: "BuildRight Ltd",  ytd: "£84k",  orders: 42, credit: "£15k" },
  { name: "North Construct", ytd: "£61k",  orders: 19, credit: "£10k" },
];

const ACTIVITY = [
  { time: "09:42", event: "ORD-1841 placed by BuildRight Ltd · £2,340",    type: "order"  },
  { time: "09:31", event: "Auto-PO sent to Hanson Cement (Portland CEM-204 LOW)", type: "alert" },
  { time: "09:18", event: "ORD-1840 picked by J. Turner · North Construct", type: "order"  },
  { time: "08:55", event: "PLY-12M stock hit zero — W2·C4 flagged",          type: "alert"  },
  { time: "08:34", event: "INV-2025-1839 paid by FastBuild UK · £6,144",    type: "payment"},
  { time: "08:12", event: "ORD-1837 delivered · SteelWorx Ltd confirmed",   type: "ok"     },
];

const NOTIFICATIONS = [
  { id: 1, text: "CEM-204 below min — auto-PO fired to Hanson", type: "warn" },
  { id: 2, text: "PLY-12M out of stock — W2·C4", type: "error" },
  { id: 3, text: "PVC-110 below min — no auto-reorder set", type: "warn"  },
  { id: 4, text: "INV-1839 paid by FastBuild UK", type: "ok" },
];

const STATUS_COLORS: Record<string, string> = {
  Processing: "bg-white/5 text-white/50",
  Picking:    "bg-amber-500/10 text-amber-400",
  Dispatched: "bg-sky-500/10 text-sky-400",
  Delivered:  "bg-emerald-500/10 text-emerald-400",
};

const PO_STATUS_COLORS: Record<string, string> = {
  Draft:      "bg-white/5 text-white/40",
  Sent:       "bg-sky-500/10 text-sky-400",
  Confirmed:  "bg-amber-500/10 text-amber-400",
  "In Transit": "bg-violet-500/10 text-violet-400",
  Received:   "bg-emerald-500/10 text-emerald-400",
};

type PoLine = { sku: string; name: string; qty: number; unitCost: number };

type Po = {
  id: string;
  supplier: string;
  status: string;
  eta: string;
  total: string;
  auto: boolean;
  lines: PoLine[];
};

const INITIAL_POS: Po[] = [
  {
    id: "PO-2025-184",
    supplier: "Hanson Cement UK",
    status: "In Transit",
    eta: "04 Jun",
    total: "£1,305",
    auto: true,
    lines: [
      { sku: "CEM-204", name: "Portland Cement 25kg", qty: 90,  unitCost: 11.50 },
    ],
  },
  {
    id: "PO-2025-183",
    supplier: "British Steel Ltd",
    status: "Confirmed",
    eta: "07 Jun",
    total: "£6,600",
    auto: true,
    lines: [
      { sku: "STL-ROD", name: "Steel Rebar 10mm (6m)", qty: 300, unitCost: 18.00 },
      { sku: "GLS-4MM", name: "Float Glass 4mm (m²)",  qty: 50,  unitCost: 24.00 },
    ],
  },
  {
    id: "PO-2025-182",
    supplier: "Polypipe Group",
    status: "Confirmed",
    eta: "09 Jun",
    total: "£840",
    auto: false,
    lines: [
      { sku: "PVC-110", name: "PVC Pipe 110mm (2m)", qty: 60, unitCost: 14.00 },
    ],
  },
  {
    id: "PO-2025-181",
    supplier: "Forterra Bricks",
    status: "Received",
    eta: "01 Jun",
    total: "£4,750",
    auto: true,
    lines: [
      { sku: "BRK-001", name: "Brick Standard (pallet)", qty: 20, unitCost: 190.00 },
      { sku: "PLY-12M", name: "Plywood 12mm Sheet",      qty: 25, unitCost: 26.00  },
    ],
  },
  {
    id: "PO-2025-180",
    supplier: "Knauf Insulation",
    status: "Received",
    eta: "29 May",
    total: "£1,140",
    auto: false,
    lines: [
      { sku: "INS-100", name: "Rockwool Insulation Roll", qty: 30, unitCost: 38.00 },
    ],
  },
];

const INITIAL_TRANSFERS = [
  { id: "TRF-041", from: "W2", to: "W1", sku: "PLY-12M", name: "Plywood 12mm Sheet", qty: 15, status: "Completed", ts: "02 Jun 09:18" },
  { id: "TRF-040", from: "W1", to: "W3", sku: "CEM-204", name: "Portland Cement 25kg", qty: 10, status: "Completed", ts: "01 Jun 14:45" },
  { id: "TRF-039", from: "W3", to: "W2", sku: "GLS-4MM", name: "Float Glass 4mm (m²)", qty: 20, status: "Completed", ts: "31 May 11:02" },
];

export function WholesaleHubDemo({ lang }: { lang: string }) {
  const [active, setActive]           = useState("dash");
  const [search, setSearch]           = useState("");
  const [whFilter, setWhFilter]       = useState("All");
  const [cart, setCart]               = useState<Record<string, number>>({ "STL-ROD": 50, "CEM-204": 20 });
  const [placed, setPlaced]           = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [notifOpen, setNotifOpen]     = useState(false);
  const [poSupplier, setPoSupplier]   = useState<string | null>(null);
  const [poSent, setPoSent]           = useState<Set<string>>(new Set());

  // Purchases tab
  const [pos, setPos]                 = useState<Po[]>(INITIAL_POS);
  const [selectedPo, setSelectedPo]   = useState<string | null>(null);
  const [receivedPos, setReceivedPos] = useState<Set<string>>(new Set(["PO-2025-181","PO-2025-180"]));
  const [stockLevels, setStockLevels] = useState<Record<string, number>>(
    Object.fromEntries(STOCK_ALL.map(s => [s.sku, s.qty]))
  );

  // Transfers tab
  const [transfers, setTransfers]     = useState(INITIAL_TRANSFERS);
  const [xfrFrom, setXfrFrom]         = useState("W1");
  const [xfrTo, setXfrTo]             = useState("W2");
  const [xfrSku, setXfrSku]           = useState("BRK-001");
  const [xfrQty, setXfrQty]           = useState("10");
  const [xfrMsg, setXfrMsg]           = useState("");

  const isUk = lang === "uk";

  const t = (en: string, uk: string) => (isUk ? uk : en);

  const addToCart    = (sku: string) => setCart(c => ({ ...c, [sku]: (c[sku] ?? 0) + 1 }));
  const removeFromCart = (sku: string) => setCart(c => {
    const n = (c[sku] ?? 0) - 1;
    const next = { ...c };
    if (n <= 0) delete next[sku]; else next[sku] = n;
    return next;
  });
  const cartLines = Object.entries(cart).map(([sku, qty]) => ({ ...CATALOGUE.find(p => p.sku === sku)!, qty }));
  const cartTotal = cartLines.reduce((s, l) => s + l.price * l.qty, 0);

  const filtered = STOCK_ALL
    .filter(s => whFilter === "All" || s.wh === whFilter)
    .filter(s =>
      s.name.toLowerCase().includes(search.toLowerCase()) || s.sku.includes(search.toUpperCase())
    );

  const alertCount = STOCK_ALL.filter(s => !s.ok).length;
  const openOrder  = ORDERS.find(o => o.id === selectedOrder);

  return (
    <div className="flex h-screen bg-[#0f1117] text-white font-mono overflow-hidden select-none">

      {/* ── SIDEBAR ── */}
      <aside className="w-16 bg-[#0a0c10] border-r border-white/5 flex flex-col items-center py-4 gap-1 shrink-0">
        <div className="w-9 h-9 bg-sky-500 rounded-lg flex items-center justify-center text-xs font-bold mb-4">WH</div>
        {NAV.map(n => (
          <button
            key={n.id}
            onClick={() => { setActive(n.id); setSelectedOrder(null); }}
            title={n.label}
            className={`w-10 h-10 rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all ${
              active === n.id ? "bg-sky-500/20 text-sky-400" : "text-white/30 hover:text-white/60 hover:bg-white/5"
            }`}
          >
            <n.Icon className="w-4 h-4" strokeWidth={1.75} />
            <span className="text-[8px] leading-none">{n.label}</span>
          </button>
        ))}
        <div className="mt-auto">
          <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-xs">JT</div>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div className="flex-1 flex flex-col overflow-hidden relative">

        {/* Topbar */}
        <div className="h-11 border-b border-white/5 flex items-center px-4 gap-4 shrink-0 bg-[#0f1117]">
          <span className="text-white/40 text-xs uppercase tracking-widest">{NAV.find(n => n.id === active)?.label}</span>
          {active === "orders" && selectedOrder && (
            <span className="text-white/25 text-xs flex items-center gap-1">
              <ChevronRight className="w-3 h-3" />
              {selectedOrder}
            </span>
          )}
          <div className="ml-auto flex items-center gap-4">
            <div className="text-xs text-white/30">Birmingham · 3 warehouses</div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              Live
            </div>
            {/* Notifications bell */}
            <button
              onClick={() => setNotifOpen(v => !v)}
              className="relative w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors"
            >
              <Bell className="w-4 h-4 text-white/40" />
              {NOTIFICATIONS.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>
          </div>
        </div>

        {/* Notifications dropdown */}
        {notifOpen && (
          <div className="absolute top-11 right-0 w-80 bg-[#0a0c10] border border-white/10 rounded-bl-xl shadow-xl z-50">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5">
              <span className="text-xs text-white/50 uppercase tracking-wide">{t("Alerts", "Сповіщення")}</span>
              <button onClick={() => setNotifOpen(false)}><X className="w-3.5 h-3.5 text-white/30 hover:text-white/60" /></button>
            </div>
            {NOTIFICATIONS.map(n => (
              <div key={n.id} className="flex items-start gap-2.5 px-4 py-2.5 border-b border-white/4 hover:bg-white/3">
                {n.type === "error"  && <AlertTriangle className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" />}
                {n.type === "warn"   && <AlertTriangle className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />}
                {n.type === "ok"     && <CheckCircle2  className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />}
                <span className="text-[11px] text-white/60 leading-relaxed">{n.text}</span>
              </div>
            ))}
          </div>
        )}

        {/* ── DASHBOARD ── */}
        {active === "dash" && (
          <div className="flex-1 overflow-auto p-5 space-y-4">
            {/* KPI row */}
            <div className="grid grid-cols-4 gap-3">
              {[
                { l: t("Revenue today","Виручка сьогодні"), v: "£18,790", d: "+12% vs yesterday", Icon: TrendingUp,  color: "text-sky-400" },
                { l: t("Orders today","Замовлень сьогодні"), v: "5",       d: "2 in progress",      Icon: ClipboardList, color: "text-amber-400" },
                { l: t("Stock alerts","Сповіщення"),         v: `${alertCount}`,  d: "items below min",   Icon: AlertTriangle, color: "text-red-400" },
                { l: t("Active B2B clients","Активні клієнти"), v: "47",   d: "+3 this week",      Icon: Users,        color: "text-emerald-400" },
              ].map(k => (
                <div key={k.l} className="bg-white/3 border border-white/10 rounded-xl p-3.5">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-[10px] text-white/40 uppercase tracking-wide">{k.l}</span>
                    <k.Icon className={`w-3.5 h-3.5 ${k.color}`} />
                  </div>
                  <div className="text-2xl font-black text-white tabular-nums">{k.v}</div>
                  <div className={`text-[10px] font-medium mt-0.5 ${k.color}`}>{k.d}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Recent activity */}
              <div className="bg-white/3 border border-white/10 rounded-xl p-4">
                <div className="text-[10px] text-white/40 uppercase tracking-widest mb-3">{t("Recent activity","Остання активність")}</div>
                <div className="space-y-2.5">
                  {ACTIVITY.map((a, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs">
                      <span className="text-white/25 tabular-nums w-10 shrink-0">{a.time}</span>
                      <span className={`shrink-0 mt-0.5 w-1.5 h-1.5 rounded-full ${
                        a.type === "alert" ? "bg-amber-400" : a.type === "payment" ? "bg-emerald-400" : a.type === "ok" ? "bg-emerald-500" : "bg-sky-400"
                      }`} />
                      <span className="text-white/60 leading-snug">{a.event}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Low stock + quick nav */}
              <div className="space-y-3">
                <div className="bg-white/3 border border-white/10 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] text-white/40 uppercase tracking-widest">{t("Low stock alerts","Низький залишок")}</span>
                    <button onClick={() => setActive("stock")} className="text-[10px] text-sky-400 hover:text-sky-300">{t("See all →","Всі →")}</button>
                  </div>
                  {STOCK_ALL.filter(s => !s.ok).map(s => (
                    <div key={s.sku} className="flex items-center gap-2 mb-2 last:mb-0">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${s.qty === 0 ? "bg-red-400" : "bg-amber-400"}`} />
                      <span className="text-xs text-white/70 flex-1">{s.name}</span>
                      <span className={`text-xs tabular-nums font-bold ${s.qty === 0 ? "text-red-400" : "text-amber-400"}`}>{s.qty}/{s.min}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-white/30">{s.loc}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-white/3 border border-white/10 rounded-xl p-4">
                  <div className="text-[10px] text-white/40 uppercase tracking-widest mb-3">{t("Today's orders","Замовлення сьогодні")}</div>
                  {ORDERS.slice(0, 3).map(o => (
                    <button key={o.id} onClick={() => { setActive("orders"); setSelectedOrder(o.id); }}
                      className="w-full flex items-center gap-2 mb-2 last:mb-0 hover:bg-white/4 rounded-lg px-1 py-1 transition-colors text-left">
                      <span className="text-sky-400 text-xs w-20">{o.id}</span>
                      <span className="text-white/60 text-xs flex-1">{o.client}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${STATUS_COLORS[o.status]}`}>{o.status}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── STOCK ── */}
        {active === "stock" && (
          <div className="flex-1 overflow-auto">
            <div className="px-4 py-3 flex items-center gap-3 border-b border-white/5 sticky top-0 bg-[#0f1117] z-10">
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={t("Search SKU or name...","Пошук SKU або назви...")}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder:text-white/30 outline-none focus:border-sky-500/50 w-52"
              />
              {/* Warehouse filter */}
              <div className="flex gap-1">
                {["All","W1","W2","W3"].map(w => (
                  <button key={w} onClick={() => setWhFilter(w)}
                    className={`text-[10px] px-2.5 py-1 rounded-md transition-colors ${
                      whFilter === w ? "bg-sky-500/20 text-sky-400" : "bg-white/5 text-white/30 hover:text-white/50"
                    }`}>{w}</button>
                ))}
              </div>
              <div className="ml-auto flex gap-4 text-xs">
                <span className="text-white/40">{filtered.length} {t("items","позицій")}</span>
                <span className="text-red-400">{filtered.filter(s => !s.ok).length} {t("alerts","проблем")}</span>
              </div>
            </div>
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-white/5">
                  {["SKU", t("Product","Назва"), t("Qty","Залишок"), t("Min","Мін"), t("Location","Локація"), "24h", t("Status","Статус")].map(h => (
                    <th key={h} className="px-4 py-2.5 text-left text-white/30 font-normal tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(s => (
                  <tr key={s.sku} className="border-b border-white/4 hover:bg-white/3 transition-colors">
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
        {active === "orders" && !selectedOrder && (
          <div className="flex-1 overflow-auto">
            <div className="px-4 py-3 flex items-center justify-between border-b border-white/5 sticky top-0 bg-[#0f1117]">
              <span className="text-xs text-white/40">{t("Today","Сьогодні")} · {ORDERS.length} {t("orders","замовлень")}</span>
              <button className="bg-sky-500 hover:bg-sky-400 text-white text-xs px-3 py-1.5 rounded-lg transition-colors">
                + {t("New order","Нове")}
              </button>
            </div>
            {ORDERS.map(o => (
              <button
                key={o.id}
                onClick={() => setSelectedOrder(o.id)}
                className="w-full flex items-center border-b border-white/4 px-4 py-3 hover:bg-white/3 transition-colors text-left"
              >
                <span className="text-sky-400 w-24 text-xs">{o.id}</span>
                <span className="text-white/80 flex-1 text-xs">{o.client}</span>
                <span className="text-white/50 w-20 text-right text-xs">{o.items} {t("items","поз.")}</span>
                <span className="text-white w-24 text-right font-bold tabular-nums text-xs">{o.val}</span>
                <span className="w-32 text-right">
                  <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${STATUS_COLORS[o.status]}`}>{o.status}</span>
                </span>
                <span className="text-white/20 w-20 text-right text-[10px]">{o.mins}m {t("ago","тому")}</span>
                <ChevronRight className="w-3.5 h-3.5 text-white/20 ml-2" />
              </button>
            ))}
          </div>
        )}

        {/* ── ORDER DETAIL ── */}
        {active === "orders" && selectedOrder && openOrder && (
          <div className="flex-1 overflow-auto p-5">
            <button onClick={() => setSelectedOrder(null)} className="text-xs text-sky-400 hover:text-sky-300 mb-4 flex items-center gap-1">
              ← {t("Back to orders","Назад до замовлень")}
            </button>
            <div className="max-w-2xl space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xl font-black text-white">{openOrder.id}</div>
                  <div className="text-sm text-white/50 mt-0.5">{openOrder.client}</div>
                </div>
                <span className={`text-xs px-3 py-1 rounded-lg font-medium ${STATUS_COLORS[openOrder.status]}`}>{openOrder.status}</span>
              </div>
              {/* Timeline */}
              <div className="bg-white/3 border border-white/10 rounded-xl p-4">
                <div className="text-[10px] text-white/40 uppercase tracking-widest mb-3">{t("Fulfilment progress","Прогрес виконання")}</div>
                <div className="flex items-center gap-0">
                  {["Placed","Processing","Picking","Dispatched","Delivered"].map((step, i) => {
                    const idx = ["Placed","Processing","Picking","Dispatched","Delivered"].indexOf(openOrder.status);
                    const done = i <= idx;
                    return (
                      <div key={step} className="flex items-center flex-1 last:flex-none">
                        <div className={`w-3 h-3 rounded-full shrink-0 ${done ? "bg-sky-500" : "bg-white/10"}`} />
                        <div className="flex flex-col items-start ml-1 mr-2">
                          <span className={`text-[9px] ${done ? "text-white/60" : "text-white/20"}`}>{step}</span>
                        </div>
                        {i < 4 && <div className={`flex-1 h-px ${done && i < idx ? "bg-sky-500/60" : "bg-white/10"}`} />}
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* Line items */}
              <div className="bg-white/3 border border-white/10 rounded-xl p-4">
                <div className="text-[10px] text-white/40 uppercase tracking-widest mb-3">{t("Line items","Позиції замовлення")}</div>
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left text-white/30 font-normal pb-2">{t("Product","Товар")}</th>
                      <th className="text-right text-white/30 font-normal pb-2">{t("Qty","Кількість")}</th>
                      <th className="text-right text-white/30 font-normal pb-2">{t("Unit price","Ціна")}</th>
                      <th className="text-right text-white/30 font-normal pb-2">{t("Total","Сума")}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {openOrder.lines.map(l => (
                      <tr key={l.name}>
                        <td className="py-2 text-white/70">{l.name}</td>
                        <td className="text-right text-white/50 tabular-nums">{l.qty}</td>
                        <td className="text-right text-white/50 tabular-nums">{l.rate}</td>
                        <td className="text-right text-white tabular-nums font-bold">{l.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="border-t border-white/10 pt-3 text-right space-y-1 mt-2">
                  <div className="text-xs text-white/40">{t("Subtotal","Сума")}: {openOrder.val}</div>
                  <div className="text-xs text-white/40">VAT 20%: £{Math.round(parseInt(openOrder.val.replace(/[^0-9]/g,"")) * 0.2).toLocaleString()}</div>
                  <div className="text-sm font-bold text-white">{t("Total incl. VAT","Разом з ПДВ")}: £{Math.round(parseInt(openOrder.val.replace(/[^0-9]/g,"")) * 1.2).toLocaleString()}</div>
                </div>
              </div>
              <button className="w-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs py-2 rounded-lg hover:bg-sky-500/20 transition-colors">
                ↓ {t("Generate PDF Invoice","Сформувати PDF-інвойс")}
              </button>
            </div>
          </div>
        )}

        {/* ── INVOICE ── */}
        {active === "invoice" && (
          <div className="flex-1 overflow-auto p-6 flex gap-6">
            <div className="flex-1 bg-white/3 border border-white/10 rounded-xl p-5 text-xs space-y-4">
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
                  <div className="text-amber-400 font-medium">Due: 16 Jun 2025</div>
                </div>
              </div>
              <div className="border-t border-white/10 pt-3">
                <div className="text-white/40 text-[10px] uppercase mb-1">BILL TO</div>
                <div className="text-white">BuildRight Ltd</div>
                <div className="text-white/40">22 Construction Ave, London EC1</div>
              </div>
              <table className="w-full">
                <thead><tr className="border-b border-white/10">
                  <th className="text-left text-white/30 font-normal pb-2">{t("Description","Опис")}</th>
                  <th className="text-right text-white/30 font-normal pb-2">{t("Qty","Кіл.")}</th>
                  <th className="text-right text-white/30 font-normal pb-2">{t("Rate","Ціна")}</th>
                  <th className="text-right text-white/30 font-normal pb-2">{t("Amount","Сума")}</th>
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
              <div className="flex gap-2">
                <button className="flex-1 bg-sky-500 hover:bg-sky-400 text-white py-2 rounded-lg transition-colors text-center">
                  ↓ {t("Download PDF","Завантажити PDF")}
                </button>
                <button className="flex-1 bg-white/5 hover:bg-white/10 text-white/60 py-2 rounded-lg transition-colors text-center">
                  ✉ {t("Send to client","Надіслати клієнту")}
                </button>
              </div>
              <div className="flex gap-2 pt-1">
                <span className="text-[10px] px-2 py-1 rounded bg-amber-500/10 text-amber-400">{t("Awaiting payment","Очікує оплати")}</span>
                <span className="text-[10px] px-2 py-1 rounded bg-white/5 text-white/30">Net 14</span>
              </div>
            </div>
          </div>
        )}

        {/* ── SUPPLIERS ── */}
        {active === "suppliers" && (
          <div className="flex-1 overflow-auto">
            <div className="px-4 py-3 flex items-center justify-between border-b border-white/5 sticky top-0 bg-[#0f1117]">
              <span className="text-xs text-white/40">
                {SUPPLIERS.length} {t("suppliers","постачальників")} · {SUPPLIERS.filter(s => s.auto).length} {t("auto-reorder on","на авто-замовленні")}
              </span>
              <button className="bg-sky-500 hover:bg-sky-400 text-white text-xs px-3 py-1.5 rounded-lg transition-colors">+ {t("Add supplier","Постачальник")}</button>
            </div>
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-white/5">
                  {[t("Supplier","Постачальник"), t("Category","Категорія"), t("Lead","Лід-тайм"), t("Rating","Рейтинг"), t("Open PO","Відкриті PO"), "YTD spend", t("Auto","Авто"), ""].map(h => (
                    <th key={h} className="px-4 py-2.5 text-left text-white/30 font-normal tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SUPPLIERS.map(s => (
                  <tr key={s.name} className="border-b border-white/4 hover:bg-white/3 transition-colors">
                    <td className="px-4 py-2.5 text-white/90 font-medium">{s.name}</td>
                    <td className="px-4 py-2.5 text-white/50">{s.cat}</td>
                    <td className="px-4 py-2.5 text-white/60 tabular-nums">{s.lead} {t("days","дн")}</td>
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
                    <td className="px-4 py-2.5">
                      {poSent.has(s.name) ? (
                        <span className="text-[10px] text-emerald-400 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> {t("PO sent","PO надіслано")}</span>
                      ) : poSupplier === s.name ? (
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-white/50">{t("Confirm?","Підтвердити?")}</span>
                          <button onClick={() => { setPoSent(p => new Set([...p, s.name])); setPoSupplier(null); }}
                            className="text-[10px] bg-sky-500 hover:bg-sky-400 text-white px-2 py-0.5 rounded transition-colors">
                            {t("Yes","Так")}
                          </button>
                          <button onClick={() => setPoSupplier(null)} className="text-[10px] text-white/30 hover:text-white/50 px-1">{t("No","Ні")}</button>
                        </div>
                      ) : (
                        <button onClick={() => setPoSupplier(s.name)}
                          className="text-[10px] flex items-center gap-1 text-white/30 hover:text-sky-400 transition-colors">
                          <RefreshCw className="w-3 h-3" /> {t("Create PO","Створити PO")}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-4 py-3 text-[10px] text-white/25">
              ⚡ {t("Auto-reorder fires when an SKU drops below its minimum threshold","Авто-замовлення спрацьовує коли залишок SKU падає нижче мінімуму")}
            </div>
          </div>
        )}

        {/* ── REPORTS ── */}
        {active === "reports" && (
          <div className="flex-1 overflow-auto p-5 space-y-4">
            {/* KPI row */}
            <div className="grid grid-cols-4 gap-3">
              {[
                { l: t("Revenue YTD","Виручка (рік)"),        v: "£1.07M", d: "+18%" },
                { l: t("Avg order time","Сер. час замовл."),    v: "7 min",  d: "−72%" },
                { l: t("Stock accuracy","Точність залишків"),   v: "99.1%",  d: "+91%" },
                { l: t("Active clients","Активні клієнти"),     v: "47",     d: "+9"   },
              ].map(k => (
                <div key={k.l} className="bg-white/3 border border-white/10 rounded-xl p-3">
                  <div className="text-lg font-black text-white tabular-nums">{k.v}</div>
                  <div className="text-[10px] text-white/40">{k.l}</div>
                  <div className="text-[10px] text-emerald-400 font-medium mt-0.5">{k.d}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Revenue chart */}
              <div className="bg-white/3 border border-white/10 rounded-xl p-4">
                <div className="text-[10px] text-white/40 uppercase tracking-widest mb-3">{t("Monthly revenue (£k)","Виручка по місяцях (£k)")}</div>
                <div className="flex items-end gap-1.5 h-28">
                  {REV_12M.map((v, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full bg-sky-500/80 rounded-t hover:bg-sky-400 transition-colors" style={{ height: `${(v / Math.max(...REV_12M)) * 100}%` }} title={`£${v}k`} />
                      <span className="text-[8px] text-white/20">{["J","F","M","A","M","J","J","A","S","O","N","D"][i]}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top clients */}
              <div className="bg-white/3 border border-white/10 rounded-xl p-4">
                <div className="text-[10px] text-white/40 uppercase tracking-widest mb-3">{t("Top clients YTD","Топ клієнти (рік)")}</div>
                <div className="space-y-2">
                  {TOP_CLIENTS.map((c, i) => (
                    <div key={c.name} className="flex items-center gap-2 text-xs">
                      <span className="text-white/25 w-3">{i + 1}</span>
                      <span className="text-white/70 flex-1">{c.name}</span>
                      <span className="text-white/40 tabular-nums w-12 text-right">{c.orders} {t("ord","зам")}</span>
                      <span className="text-white font-bold tabular-nums w-14 text-right">{c.ytd}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top SKUs */}
            <div className="bg-white/3 border border-white/10 rounded-xl p-4">
              <div className="text-[10px] text-white/40 uppercase tracking-widest mb-3">{t("Top SKUs by revenue (YTD)","Топ SKU за виручкою (рік)")}</div>
              <div className="space-y-3">
                {TOP_SKUS.map(s => (
                  <div key={s.name}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-white/70">{s.name}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-white/40 tabular-nums">{s.units.toLocaleString()} {t("units","од.")}</span>
                        <span className="text-white font-bold tabular-nums w-16 text-right">{s.rev}</span>
                      </div>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-sky-500/70 rounded-full" style={{ width: `${s.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── PURCHASES (PO) ── */}
        {active === "purchases" && !selectedPo && (
          <div className="flex-1 overflow-auto">
            <div className="px-4 py-3 flex items-center justify-between border-b border-white/5 sticky top-0 bg-[#0f1117]">
              <div className="flex items-center gap-4 text-xs">
                <span className="text-white/40">{pos.length} {t("purchase orders","замовлень постачальникам")}</span>
                <span className="text-amber-400">{pos.filter(p => p.status !== "Received").length} {t("open","відкрито")}</span>
                <span className="text-sky-400">{pos.filter(p => p.auto).length} {t("auto-generated","авто")}</span>
              </div>
              <button className="bg-sky-500 hover:bg-sky-400 text-white text-xs px-3 py-1.5 rounded-lg transition-colors">
                + {t("Create PO","Створити PO")}
              </button>
            </div>
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-white/5">
                  {[t("PO №","PO №"), t("Supplier","Постачальник"), t("Lines","Позицій"), t("Total","Сума"), "ETA", t("Type","Тип"), t("Status","Статус"), ""].map(h => (
                    <th key={h} className="px-4 py-2.5 text-left text-white/30 font-normal tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pos.map(po => (
                  <tr key={po.id} className="border-b border-white/4 hover:bg-white/3 transition-colors cursor-pointer" onClick={() => setSelectedPo(po.id)}>
                    <td className="px-4 py-2.5 text-sky-400">{po.id}</td>
                    <td className="px-4 py-2.5 text-white/80">{po.supplier}</td>
                    <td className="px-4 py-2.5 text-white/50 tabular-nums">{po.lines.length}</td>
                    <td className="px-4 py-2.5 text-white font-bold tabular-nums">{po.total}</td>
                    <td className="px-4 py-2.5 text-white/50">{po.eta}</td>
                    <td className="px-4 py-2.5">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded ${po.auto ? "bg-sky-500/10 text-sky-400" : "bg-white/5 text-white/30"}`}>
                        {po.auto ? t("Auto","Авто") : t("Manual","Ручний")}
                      </span>
                    </td>
                    <td className="px-4 py-2.5">
                      <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${PO_STATUS_COLORS[po.status] ?? "text-white/40"}`}>{po.status}</span>
                    </td>
                    <td className="px-4 py-2.5">
                      {po.status === "In Transit" && !receivedPos.has(po.id) ? (
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            setReceivedPos(s => new Set([...s, po.id]));
                            setPos(prev => prev.map(p => p.id === po.id ? { ...p, status: "Received" } : p));
                            setStockLevels(prev => {
                              const next = { ...prev };
                              po.lines.forEach(l => { next[l.sku] = (next[l.sku] ?? 0) + l.qty; });
                              return next;
                            });
                          }}
                          className="text-[10px] bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 px-2 py-0.5 rounded font-medium transition-colors"
                        >
                          ✓ {t("Mark received","Отримано")}
                        </button>
                      ) : po.status === "Received" ? (
                        <span className="text-[10px] text-emerald-400 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> {t("Stock updated","Залишок оновлено")}</span>
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5 text-white/20" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ── PO DETAIL ── */}
        {active === "purchases" && selectedPo && (() => {
          const po = pos.find(p => p.id === selectedPo)!;
          const lineTotal = po.lines.reduce((s, l) => s + l.qty * l.unitCost, 0);
          return (
            <div className="flex-1 overflow-auto p-5">
              <button onClick={() => setSelectedPo(null)} className="text-xs text-sky-400 hover:text-sky-300 mb-4 flex items-center gap-1">
                ← {t("Back to purchase orders","Назад до PO")}
              </button>
              <div className="max-w-2xl space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-xl font-black text-white">{po.id}</div>
                    <div className="text-sm text-white/50 mt-0.5">{po.supplier}</div>
                    <div className="text-xs text-white/30 mt-0.5">ETA: {po.eta} · {po.auto ? t("Auto-generated","Авто-сформовано") : t("Manual order","Ручне замовлення")}</div>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-lg font-medium ${PO_STATUS_COLORS[po.status] ?? "text-white/40"}`}>{po.status}</span>
                </div>

                {/* PO timeline */}
                <div className="bg-white/3 border border-white/10 rounded-xl p-4">
                  <div className="text-[10px] text-white/40 uppercase tracking-widest mb-3">{t("Order status","Статус замовлення")}</div>
                  <div className="flex items-center">
                    {["Draft","Sent","Confirmed","In Transit","Received"].map((step, i, arr) => {
                      const steps = ["Draft","Sent","Confirmed","In Transit","Received"];
                      const cur = steps.indexOf(po.status);
                      const done = i <= cur;
                      return (
                        <div key={step} className="flex items-center flex-1 last:flex-none">
                          <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${done ? "bg-sky-500" : "bg-white/10"}`} />
                          <div className="ml-1 mr-2">
                            <span className={`text-[9px] ${done ? "text-white/60" : "text-white/20"}`}>{step}</span>
                          </div>
                          {i < arr.length - 1 && <div className={`flex-1 h-px ${done && i < cur ? "bg-sky-500/50" : "bg-white/10"}`} />}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Line items */}
                <div className="bg-white/3 border border-white/10 rounded-xl p-4">
                  <div className="text-[10px] text-white/40 uppercase tracking-widest mb-3">{t("Ordered items","Замовлені позиції")}</div>
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left text-white/30 font-normal pb-2">SKU</th>
                        <th className="text-left text-white/30 font-normal pb-2">{t("Product","Товар")}</th>
                        <th className="text-right text-white/30 font-normal pb-2">{t("Qty","Кількість")}</th>
                        <th className="text-right text-white/30 font-normal pb-2">{t("Unit cost","Ціна")}</th>
                        <th className="text-right text-white/30 font-normal pb-2">{t("Subtotal","Сума")}</th>
                        {po.status === "Received" && <th className="text-right text-white/30 font-normal pb-2">{t("Stock +","Склад +")}</th>}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {po.lines.map(l => (
                        <tr key={l.sku}>
                          <td className="py-2 text-sky-400">{l.sku}</td>
                          <td className="py-2 text-white/70">{l.name}</td>
                          <td className="py-2 text-right text-white/60 tabular-nums">{l.qty}</td>
                          <td className="py-2 text-right text-white/50 tabular-nums">£{l.unitCost.toFixed(2)}</td>
                          <td className="py-2 text-right text-white tabular-nums font-bold">£{(l.qty * l.unitCost).toFixed(2)}</td>
                          {po.status === "Received" && (
                            <td className="py-2 text-right text-emerald-400 tabular-nums">+{l.qty} → {stockLevels[l.sku] ?? "?"}</td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="border-t border-white/10 pt-3 text-right mt-2 space-y-1">
                    <div className="text-xs text-white/40">{t("Subtotal","Сума")}: £{lineTotal.toFixed(2)}</div>
                    <div className="text-sm font-bold text-white">{t("Total (ex. VAT)","Разом (без ПДВ)")}: {po.total}</div>
                  </div>
                </div>

                {po.status === "In Transit" && !receivedPos.has(po.id) && (
                  <button
                    onClick={() => {
                      setReceivedPos(s => new Set([...s, po.id]));
                      setPos(prev => prev.map(p => p.id === po.id ? { ...p, status: "Received" } : p));
                      setStockLevels(prev => {
                        const next = { ...prev };
                        po.lines.forEach(l => { next[l.sku] = (next[l.sku] ?? 0) + l.qty; });
                        return next;
                      });
                    }}
                    className="w-full bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-400 text-sm font-semibold py-2.5 rounded-lg transition-colors"
                  >
                    ✓ {t("Confirm delivery received — update stock","Підтвердити отримання — оновити залишки")}
                  </button>
                )}
                {po.status === "Received" && (
                  <div className="flex items-center gap-2 text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-4 py-3">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    {t("Delivery confirmed — stock levels updated automatically","Доставку підтверджено — залишки оновлено автоматично")}
                  </div>
                )}
              </div>
            </div>
          );
        })()}

        {/* ── TRANSFERS ── */}
        {active === "transfers" && (
          <div className="flex-1 overflow-auto p-5">
            <div className="grid grid-cols-2 gap-5">

              {/* Create transfer form */}
              <div className="space-y-4">
                <div className="bg-white/3 border border-white/10 rounded-xl p-4">
                  <div className="text-[10px] text-white/40 uppercase tracking-widest mb-4">{t("Create stock transfer","Нове переміщення")}</div>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <label className="text-[10px] text-white/40 block mb-1">{t("From warehouse","З складу")}</label>
                        <select value={xfrFrom} onChange={e => setXfrFrom(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-sky-500/50">
                          {["W1","W2","W3"].map(w => <option key={w} value={w} className="bg-[#1a1d26]">{w}</option>)}
                        </select>
                      </div>
                      <div className="flex items-end pb-2 text-white/30">
                        <ArrowLeftRight className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <label className="text-[10px] text-white/40 block mb-1">{t("To warehouse","На склад")}</label>
                        <select value={xfrTo} onChange={e => setXfrTo(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-sky-500/50">
                          {["W1","W2","W3"].map(w => <option key={w} value={w} className="bg-[#1a1d26]">{w}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] text-white/40 block mb-1">SKU</label>
                      <select value={xfrSku} onChange={e => setXfrSku(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-sky-500/50">
                        {STOCK_ALL.map(s => (
                          <option key={s.sku} value={s.sku} className="bg-[#1a1d26]">{s.sku} — {s.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] text-white/40 block mb-1">{t("Quantity","Кількість")}</label>
                      <input
                        type="number" min="1" value={xfrQty} onChange={e => setXfrQty(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-sky-500/50"
                      />
                    </div>
                    {xfrMsg && (
                      <div className={`text-xs rounded-lg px-3 py-2 ${xfrMsg.startsWith("✓") ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}>
                        {xfrMsg}
                      </div>
                    )}
                    <button
                      onClick={() => {
                        const qty = parseInt(xfrQty);
                        if (isNaN(qty) || qty <= 0) { setXfrMsg(t("⚠ Enter a valid quantity","⚠ Введіть коректну кількість")); return; }
                        if (xfrFrom === xfrTo) { setXfrMsg(t("⚠ From and To must differ","⚠ Склади мають відрізнятись")); return; }
                        const cur = stockLevels[xfrSku] ?? 0;
                        if (qty > cur) { setXfrMsg(t(`⚠ Only ${cur} units available`,`⚠ Доступно лише ${cur} одиниць`)); return; }
                        const skuName = STOCK_ALL.find(s => s.sku === xfrSku)?.name ?? xfrSku;
                        const newId = `TRF-${(parseInt(transfers[0]?.id.split("-")[1] ?? "041") + 1).toString().padStart(3,"0")}`;
                        setTransfers(prev => [{
                          id: newId, from: xfrFrom, to: xfrTo, sku: xfrSku,
                          name: skuName, qty, status: "Completed",
                          ts: t("Just now","Щойно"),
                        }, ...prev]);
                        setXfrMsg(`✓ ${t(`Moved ${qty}× ${skuName} from ${xfrFrom} to ${xfrTo}`,`Переміщено ${qty}× ${skuName} з ${xfrFrom} до ${xfrTo}`)}`);
                      }}
                      className="w-full bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold py-2.5 rounded-lg transition-colors"
                    >
                      {t("Create transfer","Створити переміщення")} →
                    </button>
                  </div>
                </div>

                {/* Stock quick-view */}
                <div className="bg-white/3 border border-white/10 rounded-xl p-4">
                  <div className="text-[10px] text-white/40 uppercase tracking-widest mb-3">{t("Current stock (live)","Поточний залишок (live)")}</div>
                  <div className="space-y-1.5">
                    {STOCK_ALL.filter(s => s.sku === xfrSku).map(s => (
                      <div key={s.sku} className="flex items-center justify-between text-xs">
                        <span className="text-white/60">{s.name}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-white/30">{s.loc}</span>
                          <span className={`font-bold tabular-nums ${(stockLevels[s.sku] ?? s.qty) === 0 ? "text-red-400" : (stockLevels[s.sku] ?? s.qty) < s.min ? "text-amber-400" : "text-white"}`}>
                            {stockLevels[s.sku] ?? s.qty}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Transfer log */}
              <div className="bg-white/3 border border-white/10 rounded-xl p-4 self-start">
                <div className="text-[10px] text-white/40 uppercase tracking-widest mb-3">{t("Transfer log","Журнал переміщень")}</div>
                <div className="space-y-2">
                  {transfers.map(tr => (
                    <div key={tr.id} className="flex items-center gap-2 text-xs border-b border-white/4 pb-2 last:border-0 last:pb-0">
                      <span className="text-sky-400 w-20 shrink-0">{tr.id}</span>
                      <div className="flex-1">
                        <div className="text-white/70">{tr.qty}× {tr.name.split("(")[0].trim()}</div>
                        <div className="text-white/30 text-[10px]">{tr.from} → {tr.to} · {tr.ts}</div>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 shrink-0">{tr.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── B2B CLIENT PORTAL ── */}
        {active === "portal" && (
          <div className="flex-1 overflow-auto">
            <div className="bg-sky-500/10 border-b border-sky-500/20 px-4 py-2.5 flex items-center justify-between sticky top-0 backdrop-blur z-10">
              <div className="flex items-center gap-2">
                <span className="text-sky-400 text-xs font-bold uppercase tracking-wide">🛒 B2B {t("Portal","Портал")}</span>
                <span className="text-white/40 text-xs">{t("client view · BuildRight Ltd","вигляд клієнта · BuildRight Ltd")}</span>
              </div>
              <div className="text-xs text-white/40">{t("Credit limit","Кредитний ліміт")}: <span className="text-emerald-400 font-bold">£15,000</span></div>
            </div>

            <div className="flex">
              {/* Catalogue */}
              <div className="flex-1 p-4 space-y-2">
                <div className="text-[10px] text-white/30 uppercase tracking-widest mb-1">{t("Catalogue — order 24/7","Каталог — замовлення 24/7")}</div>
                {CATALOGUE.map(p => (
                  <div key={p.sku} className={`flex items-center justify-between rounded-lg border px-3 py-2.5 ${p.inStock ? "bg-white/3 border-white/10" : "bg-white/1 border-white/5 opacity-60"}`}>
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
                      <span className="text-[10px] text-red-400 font-medium">{t("Out of stock","Немає")}</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Cart / basket */}
              <div className="w-64 shrink-0 border-l border-white/5 p-4 bg-[#0a0c10]">
                <div className="text-[10px] text-white/30 uppercase tracking-widest mb-3">{t("Your basket","Кошик")}</div>
                {placed ? (
                  <div className="text-center py-8">
                    <div className="text-3xl mb-2">✅</div>
                    <div className="text-sm text-emerald-400 font-bold">{t("Order placed!","Замовлення розміщено!")}</div>
                    <div className="text-xs text-white/40 mt-1">{t("Sent to operator · ORD-1842","Надійшло оператору · ORD-1842")}</div>
                    <button onClick={() => { setPlaced(false); setCart({}); }} className="mt-4 text-xs text-sky-400 hover:text-sky-300">{t("New order","Нове замовлення")}</button>
                  </div>
                ) : cartLines.length === 0 ? (
                  <div className="text-xs text-white/30 italic py-8 text-center">{t("Basket is empty","Кошик порожній")}</div>
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
                      <div className="flex justify-between text-xs text-white/40"><span>{t("Subtotal","Сума")}</span><span className="tabular-nums">£{cartTotal.toFixed(0)}</span></div>
                      <div className="flex justify-between text-xs text-white/40"><span>VAT 20%</span><span className="tabular-nums">£{(cartTotal * 0.2).toFixed(0)}</span></div>
                      <div className="flex justify-between text-sm font-bold text-white"><span>{t("Total","Разом")}</span><span className="tabular-nums">£{(cartTotal * 1.2).toFixed(0)}</span></div>
                    </div>
                    <button onClick={() => setPlaced(true)} className="mt-3 w-full bg-sky-500 hover:bg-sky-400 text-white text-sm font-semibold py-2 rounded-lg transition-colors">
                      {t("Place order","Розмістити замовлення")} →
                    </button>
                    <div className="text-[10px] text-white/25 mt-2 text-center">{t("On account · 14-day terms","На рахунок · оплата 14 днів")}</div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Statusbar */}
        <div className="h-7 border-t border-white/5 bg-[#0a0c10] flex items-center px-4 gap-6 text-[10px] text-white/25 shrink-0">
          <span>500+ SKU · 3 {t("warehouses","склади")}</span>
          <span className="text-amber-400">⚠ {alertCount} {t("items below min","позиції нижче мінімуму")}</span>
          <span className="ml-auto">v2.4.1 · WholesaleHub ERP</span>
        </div>
      </div>
    </div>
  );
}
