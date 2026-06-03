"use client";
import { useState, useEffect } from "react";
import { Truck, Package, AlertTriangle, CheckCircle, Clock, MapPin } from "lucide-react";

type TruckStatus = "en-route" | "loading" | "stopped" | "returning";
type SlaStatus = "green" | "amber" | "red";
type Tab = "fleet" | "orders" | "warehouse";

type TruckData = {
  id: string;
  driver: string;
  reg: string;
  status: TruckStatus;
  route: string;
  hoursToday: number;
  maxHours: number;
};

type Order = {
  id: string;
  customer: string;
  destination: string;
  truck: string | null;
  pallets: number;
  eta: string;
  sla: SlaStatus;
  slaNote: string;
  status: string;
};

type PickTask = {
  id: string;
  sku: string;
  description: string;
  qty: number;
  location: string;
  assignedTo: string | null;
  done: boolean;
  priority: boolean;
};

const TRUCKS: TruckData[] = [
  { id: "LT01", driver: "D. Mackenzie", reg: "LK71 ABC", status: "en-route", route: "Leicester → Sheffield", hoursToday: 6.5, maxHours: 9 },
  { id: "LT02", driver: "R. Patel", reg: "LK71 DEF", status: "loading", route: "— Depot B", hoursToday: 3.0, maxHours: 9 },
  { id: "LT03", driver: "S. Hughes", reg: "LK72 GHI", status: "en-route", route: "Leicester → Birmingham", hoursToday: 7.8, maxHours: 9 },
  { id: "LT04", driver: "C. Okafor", reg: "LK72 JKL", status: "stopped", route: "— Rest break", hoursToday: 4.5, maxHours: 9 },
  { id: "LT05", driver: "T. Walsh", reg: "LK73 MNO", status: "returning", route: "Nottingham → Leicester", hoursToday: 8.1, maxHours: 9 },
  { id: "LT06", driver: "J. Fisher", reg: "LK73 PQR", status: "en-route", route: "Leicester → Derby", hoursToday: 2.0, maxHours: 9 },
  { id: "LT07", driver: "P. Nguyen", reg: "LK74 STU", status: "loading", route: "— Depot A", hoursToday: 1.5, maxHours: 9 },
  { id: "LT08", driver: "B. Kowalski", reg: "LK74 VWX", status: "en-route", route: "Leicester → Coventry", hoursToday: 5.2, maxHours: 9 },
  { id: "LT09", driver: "A. Williams", reg: "LK75 YZA", status: "stopped", route: "— Customer wait", hoursToday: 6.0, maxHours: 9 },
  { id: "LT10", driver: "M. Johansson", reg: "LK75 BCD", status: "en-route", route: "Leicester → Milton Keynes", hoursToday: 4.8, maxHours: 9 },
  { id: "LT11", driver: "G. Osei", reg: "LK71 EFG", status: "en-route", route: "Loughborough → Leicester", hoursToday: 3.3, maxHours: 9 },
  { id: "LT12", driver: "L. Brennan", reg: "LK72 HIJ", status: "returning", route: "Derby → Leicester", hoursToday: 7.5, maxHours: 9 },
];

const ORDERS_INIT: Order[] = [
  { id: "ORD-4410", customer: "Halford Builders", destination: "Sheffield", truck: "LT01", pallets: 12, eta: "14:30", sla: "green", slaNote: "On time", status: "In transit" },
  { id: "ORD-4411", customer: "Midland Foods", destination: "Birmingham", truck: "LT03", pallets: 8, eta: "15:00", sla: "amber", slaNote: "18 min behind", status: "In transit" },
  { id: "ORD-4412", customer: "Trent Plastics", destination: "Nottingham", truck: null, pallets: 16, eta: "16:45", sla: "red", slaNote: "No truck assigned!", status: "Unassigned" },
  { id: "ORD-4413", customer: "Avon Electricals", destination: "Coventry", truck: "LT08", pallets: 6, eta: "15:30", sla: "green", slaNote: "On time", status: "In transit" },
  { id: "ORD-4414", customer: "Peak District Drinks", destination: "Derby", truck: "LT06", pallets: 20, eta: "16:00", sla: "amber", slaNote: "Traffic delay", status: "In transit" },
  { id: "ORD-4415", customer: "NorthGate Retail", destination: "Milton Keynes", truck: "LT10", pallets: 10, eta: "17:15", sla: "green", slaNote: "On time", status: "In transit" },
];

const PICK_TASKS_INIT: PickTask[] = [
  { id: "PK-001", sku: "PLT-2241", description: "Pallet wrap 500mm × 300m (×10)", qty: 10, location: "A3-14", assignedTo: "W. Abbas", done: true, priority: false },
  { id: "PK-002", sku: "STL-1094", description: "Steel tube 40×40 (×50 lengths)", qty: 50, location: "B1-02", assignedTo: "W. Abbas", done: true, priority: false },
  { id: "PK-003", sku: "PLY-0887", description: "Plywood 18mm sheets (×24)", qty: 24, location: "C2-08", assignedTo: "K. Sharma", done: false, priority: true },
  { id: "PK-004", sku: "INS-3312", description: "Insulation rolls 100mm (×6 packs)", qty: 6, location: "A1-22", assignedTo: null, done: false, priority: true },
  { id: "PK-005", sku: "PVC-0044", description: "PVC conduit 20mm × 3m (×200)", qty: 200, location: "D4-01", assignedTo: "M. Novak", done: false, priority: false },
  { id: "PK-006", sku: "FIX-2200", description: "M10 bolts box (×12)", qty: 12, location: "A2-31", assignedTo: null, done: false, priority: false },
];

const STATUS_CFG: Record<TruckStatus, { label: string; ukLabel: string; dot: string; text: string }> = {
  "en-route": { label: "En Route", ukLabel: "В дорозі", dot: "bg-emerald-400", text: "text-emerald-400" },
  "loading": { label: "Loading", ukLabel: "Завантаження", dot: "bg-amber-400", text: "text-amber-400" },
  "stopped": { label: "Stopped", ukLabel: "Зупинка", dot: "bg-neutral-400", text: "text-neutral-400" },
  "returning": { label: "Returning", ukLabel: "Повертається", dot: "bg-sky-400", text: "text-sky-400" },
};

const SLA_CFG: Record<SlaStatus, { dot: string; bg: string; text: string }> = {
  green: { dot: "bg-emerald-400", bg: "bg-emerald-900/20 text-emerald-300", text: "text-emerald-400" },
  amber: { dot: "bg-amber-400", bg: "bg-amber-900/20 text-amber-300", text: "text-amber-400" },
  red: { dot: "bg-red-500", bg: "bg-red-900/30 text-red-300", text: "text-red-400" },
};

export function FleetDeskDemo({ lang }: { lang: string }) {
  const [tab, setTab] = useState<Tab>("fleet");
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [orders, setOrders] = useState(ORDERS_INIT);
  const [pickTasks, setPickTasks] = useState(PICK_TASKS_INIT);
  const [tick, setTick] = useState(0);
  const isUk = lang === "uk";

  // Simulate live updates: every 5s change one amber SLA slightly
  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 5000);
    return () => clearInterval(interval);
  }, []);

  const assignTruck = (orderId: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, truck: "LT02", status: "Assigned", sla: "amber", slaNote: "Just assigned" } : o));
  };

  const togglePickDone = (id: string) => {
    setPickTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const assignPick = (id: string) => {
    setPickTasks(prev => prev.map(t => t.id === id && !t.assignedTo ? { ...t, assignedTo: "You" } : t));
  };

  const enRouteCount = TRUCKS.filter(t => t.status === "en-route").length;
  const loadingCount = TRUCKS.filter(t => t.status === "loading").length;
  const nearLimitCount = TRUCKS.filter(t => t.hoursToday >= 8).length;
  const redOrders = orders.filter(o => o.sla === "red").length;
  const pickDone = pickTasks.filter(t => t.done).length;

  const TABS = [
    { id: "fleet" as Tab, en: "Fleet", uk: "Флот", icon: Truck },
    { id: "orders" as Tab, en: "Orders", uk: "Замовлення", icon: Package },
    { id: "warehouse" as Tab, en: "Warehouse", uk: "Склад", icon: MapPin },
  ];

  const selectedOrderData = orders.find(o => o.id === selectedOrder);

  return (
    <div className="h-screen flex flex-col font-sans overflow-hidden" style={{ background: "#1a1205", color: "#f5e9d0" }}>

      {/* ── HEADER ── */}
      <div className="shrink-0 border-b border-amber-900/50" style={{ background: "#231808" }}>
        <div className="flex items-center justify-between px-5 py-2.5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center">
              <Truck className="w-4 h-4 text-amber-950 font-black" />
            </div>
            <div>
              <div className="font-black text-sm text-amber-100">FleetDesk</div>
              <div className="text-[10px] text-amber-600">{isUk ? "Лестер · 2 склади" : "Leicester · 2 depots"}</div>
            </div>
          </div>

          {/* Live KPI strip */}
          <div className="hidden sm:flex items-center gap-4 text-xs">
            {[
              { label: isUk ? "В дорозі" : "En route", value: enRouteCount, color: "text-emerald-400" },
              { label: isUk ? "Завантаж." : "Loading", value: loadingCount, color: "text-amber-400" },
              { label: isUk ? "Ліміт год." : "Hours limit", value: nearLimitCount, color: nearLimitCount > 0 ? "text-red-400" : "text-neutral-500" },
              { label: isUk ? "SLA ризик" : "SLA risk", value: redOrders, color: redOrders > 0 ? "text-red-400" : "text-neutral-500" },
            ].map(k => (
              <div key={k.label} className="text-center">
                <div className={`text-xl font-black tabular-nums ${k.color}`}>{k.value}</div>
                <div className="text-amber-700 text-[9px] uppercase tracking-wider">{k.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tab nav */}
        <div className="flex px-4 gap-1">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
                tab === t.id
                  ? "border-amber-500 text-amber-300"
                  : "border-transparent text-amber-700 hover:text-amber-400"
              }`}
            >
              <t.icon className="w-3.5 h-3.5" />
              {isUk ? t.uk : t.en}
              {t.id === "orders" && redOrders > 0 && (
                <span className="w-4 h-4 rounded-full bg-red-500 text-white text-[9px] flex items-center justify-center font-black">{redOrders}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── FLEET TAB ── */}
      {tab === "fleet" && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Summary row */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: isUk ? "Всього тягачів" : "Total trucks", value: TRUCKS.length, sub: isUk ? "в парку" : "in fleet" },
              { label: isUk ? "Активних" : "Active", value: enRouteCount + loadingCount, sub: isUk ? "en route + завант." : "en route + loading", color: "text-emerald-400" },
              { label: isUk ? "Завт. завершат." : "Near hours limit", value: nearLimitCount, sub: "≥ 8h today", color: nearLimitCount > 0 ? "text-red-400" : undefined },
              { label: isUk ? "Утил. парку" : "Fleet utilisation", value: "82%", sub: isUk ? "від місткості" : "of capacity", color: "text-amber-400" },
            ].map(k => (
              <div key={k.label} className="rounded-xl border border-amber-900/40 p-3" style={{ background: "#231808" }}>
                <div className="text-[10px] text-amber-700 uppercase tracking-wider mb-1">{k.label}</div>
                <div className={`text-2xl font-black tabular-nums ${k.color ?? "text-amber-100"}`}>{k.value}</div>
                <div className="text-[10px] text-amber-800 mt-0.5">{k.sub}</div>
              </div>
            ))}
          </div>

          {/* Truck grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {TRUCKS.map(truck => {
              const s = STATUS_CFG[truck.status];
              const hoursWarning = truck.hoursToday >= 8;
              return (
                <div
                  key={truck.id}
                  className={`rounded-xl border p-3 ${hoursWarning ? "border-red-800/60" : "border-amber-900/40"}`}
                  style={{ background: hoursWarning ? "#2a100a" : "#231808" }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-2 h-2 rounded-full ${s.dot}`} />
                      <span className="font-black text-amber-100 text-sm">{truck.id}</span>
                    </div>
                    <span className={`text-[10px] font-semibold ${s.text}`}>{isUk ? s.ukLabel : s.label}</span>
                  </div>
                  <div className="text-xs text-amber-400 font-medium truncate">{truck.driver}</div>
                  <div className="text-[10px] text-amber-700 font-mono mb-2">{truck.reg}</div>
                  <div className="text-[10px] text-amber-600 truncate mb-2">{truck.route}</div>
                  {/* Hours bar */}
                  <div>
                    <div className="flex justify-between text-[9px] mb-1">
                      <span className="text-amber-800">{isUk ? "Год. сьогодні" : "Hours today"}</span>
                      <span className={hoursWarning ? "text-red-400 font-bold" : "text-amber-600"}>{truck.hoursToday}/{truck.maxHours}h</span>
                    </div>
                    <div className="h-1 bg-amber-950 rounded-full overflow-hidden">
                      <div
                        className={`h-1 rounded-full ${truck.hoursToday >= 9 ? "bg-red-500" : truck.hoursToday >= 8 ? "bg-amber-500" : "bg-emerald-500"}`}
                        style={{ width: `${Math.min(100, (truck.hoursToday / truck.maxHours) * 100)}%` }}
                      />
                    </div>
                  </div>
                  {hoursWarning && (
                    <div className="flex items-center gap-1 mt-1.5 text-[9px] text-red-400 font-semibold">
                      <AlertTriangle className="w-3 h-3" />
                      {isUk ? "Близько до ліміту WTD" : "Near WTD limit"}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── ORDERS TAB ── */}
      {tab === "orders" && (
        <div className="flex-1 overflow-hidden flex gap-0">
          {/* Order table */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="rounded-xl border border-amber-900/40 overflow-hidden" style={{ background: "#231808" }}>
              <div className="px-4 py-3 border-b border-amber-900/30 flex items-center justify-between">
                <span className="font-bold text-amber-100 text-sm">{isUk ? "Замовлення — сьогодні" : "Today's Dispatch"}</span>
                <span className="text-[10px] text-amber-700">{isUk ? `${orders.length} замовлень` : `${orders.length} orders`}</span>
              </div>
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-amber-950/60">
                    {[isUk ? "SLA" : "SLA", isUk ? "Замовлення" : "Order", isUk ? "Клієнт" : "Customer", isUk ? "Тягач" : "Truck", isUk ? "ETA" : "ETA", ""].map((h, i) => (
                      <th key={i} className="px-3 py-2 text-left text-[10px] text-amber-700 uppercase tracking-wider font-semibold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-950/40">
                  {orders.map(order => {
                    const sla = SLA_CFG[order.sla];
                    const isSelected = order.id === selectedOrder;
                    return (
                      <tr
                        key={order.id}
                        onClick={() => setSelectedOrder(isSelected ? null : order.id)}
                        className={`cursor-pointer transition-colors ${isSelected ? "" : "hover:bg-amber-950/30"}`}
                        style={isSelected ? { background: "#2e1a05" } : undefined}
                      >
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-1.5">
                            <div className={`w-3 h-3 rounded-full ${sla.dot} ${order.sla === "red" ? "animate-pulse" : ""}`} />
                          </div>
                        </td>
                        <td className="px-3 py-3 font-mono text-amber-300 font-bold">{order.id}</td>
                        <td className="px-3 py-3">
                          <div className="text-amber-100 font-medium">{order.customer}</div>
                          <div className="text-amber-700 flex items-center gap-0.5 mt-0.5"><MapPin className="w-2.5 h-2.5" />{order.destination}</div>
                        </td>
                        <td className="px-3 py-3">
                          {order.truck ? (
                            <span className="text-amber-400 font-mono font-bold">{order.truck}</span>
                          ) : (
                            <span className="text-red-400 font-semibold">{isUk ? "Не призн." : "Unassigned"}</span>
                          )}
                        </td>
                        <td className="px-3 py-3">
                          <div className="font-mono font-bold text-amber-200">{order.eta}</div>
                          <div className={`text-[10px] mt-0.5 ${sla.text}`}>{order.slaNote}</div>
                        </td>
                        <td className="px-3 py-3">
                          {!order.truck && (
                            <button
                              onClick={e => { e.stopPropagation(); assignTruck(order.id); }}
                              className="text-[10px] bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold px-2 py-1 rounded-lg transition-colors whitespace-nowrap"
                            >
                              {isUk ? "Призначити" : "Assign"}
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Order detail panel */}
          {selectedOrderData && (
            <div className="w-64 shrink-0 border-l border-amber-900/40 overflow-y-auto p-4 space-y-4" style={{ background: "#1e1407" }}>
              <div>
                <div className="text-[10px] text-amber-700 uppercase tracking-wider mb-1">{isUk ? "Деталі замовлення" : "Order Detail"}</div>
                <div className="font-black text-amber-100 text-lg">{selectedOrderData.id}</div>
                <div className="text-xs text-amber-500">{selectedOrderData.customer}</div>
              </div>
              <div className="space-y-2 text-xs">
                {[
                  { label: isUk ? "Призначення" : "Destination", value: selectedOrderData.destination },
                  { label: isUk ? "Тягач" : "Truck", value: selectedOrderData.truck ?? (isUk ? "Не призначено" : "Unassigned") },
                  { label: isUk ? "Палет" : "Pallets", value: `${selectedOrderData.pallets} PLT` },
                  { label: "ETA", value: selectedOrderData.eta },
                  { label: isUk ? "Статус" : "Status", value: selectedOrderData.status },
                ].map(r => (
                  <div key={r.label} className="flex justify-between">
                    <span className="text-amber-700">{r.label}</span>
                    <span className="text-amber-200 font-medium">{r.value}</span>
                  </div>
                ))}
              </div>
              <div className={`rounded-xl px-3 py-2 text-xs font-semibold ${SLA_CFG[selectedOrderData.sla].bg}`}>
                <div className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${SLA_CFG[selectedOrderData.sla].dot}`} />
                  {isUk ? "SLA статус" : "SLA Status"}
                </div>
                <div className="mt-1 font-normal">{selectedOrderData.slaNote}</div>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="w-full text-xs text-amber-700 hover:text-amber-400 py-1 transition-colors"
              >
                {isUk ? "Закрити" : "Close"}
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── WAREHOUSE TAB ── */}
      {tab === "warehouse" && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Summary */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: isUk ? "Всього задач" : "Total tasks", value: pickTasks.length, color: "text-amber-300" },
              { label: isUk ? "Виконано" : "Completed", value: pickDone, color: "text-emerald-400" },
              { label: isUk ? "Пріоритетних" : "Priority", value: pickTasks.filter(t => t.priority && !t.done).length, color: "text-red-400" },
            ].map(k => (
              <div key={k.label} className="rounded-xl border border-amber-900/40 p-3 text-center" style={{ background: "#231808" }}>
                <div className={`text-3xl font-black tabular-nums ${k.color}`}>{k.value}</div>
                <div className="text-[10px] text-amber-700 mt-1">{k.label}</div>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="rounded-xl border border-amber-900/40 p-4" style={{ background: "#231808" }}>
            <div className="flex items-center justify-between mb-2 text-xs">
              <span className="font-bold text-amber-100">{isUk ? "Прогрес пікінгу" : "Pick Progress"}</span>
              <span className="text-amber-500">{pickDone}/{pickTasks.length} {isUk ? "задач" : "tasks"}</span>
            </div>
            <div className="h-3 bg-amber-950 rounded-full overflow-hidden">
              <div
                className="h-3 bg-amber-500 rounded-full transition-all duration-500"
                style={{ width: `${pickTasks.length ? (pickDone / pickTasks.length) * 100 : 0}%` }}
              />
            </div>
          </div>

          {/* Pick task list */}
          <div className="rounded-xl border border-amber-900/40 overflow-hidden" style={{ background: "#231808" }}>
            <div className="px-4 py-3 border-b border-amber-900/30">
              <span className="font-bold text-amber-100 text-sm">{isUk ? "Черга пікінгу — Склад A" : "Pick Queue — Depot A"}</span>
            </div>
            <div className="divide-y divide-amber-950/40">
              {pickTasks.map(task => (
                <div
                  key={task.id}
                  className={`px-4 py-3 transition-colors ${task.done ? "opacity-50" : ""}`}
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => togglePickDone(task.id)}
                      className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center shrink-0 transition-colors ${
                        task.done ? "bg-emerald-600 text-white" : "border border-amber-700 hover:border-amber-400"
                      }`}
                    >
                      {task.done && <CheckCircle className="w-3.5 h-3.5" />}
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-mono text-[10px] text-amber-600">{task.sku}</span>
                        {task.priority && !task.done && (
                          <span className="text-[9px] font-bold text-red-400 bg-red-900/30 px-1.5 py-0.5 rounded">
                            {isUk ? "ПРІОРИТЕТ" : "PRIORITY"}
                          </span>
                        )}
                      </div>
                      <div className={`text-sm font-medium ${task.done ? "line-through text-amber-800" : "text-amber-100"}`}>
                        {task.description}
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-[10px] text-amber-700">
                        <span className="flex items-center gap-0.5"><MapPin className="w-2.5 h-2.5" />{task.location}</span>
                        <span>Qty: {task.qty}</span>
                        {task.assignedTo && (
                          <span className="text-amber-500 font-medium">→ {task.assignedTo}</span>
                        )}
                      </div>
                    </div>
                    {!task.done && (
                      <div className="shrink-0">
                        {task.assignedTo ? (
                          <span className="text-[10px] text-amber-600 bg-amber-900/30 px-2 py-1 rounded-lg font-medium">
                            {task.assignedTo}
                          </span>
                        ) : (
                          <button
                            onClick={() => assignPick(task.id)}
                            className="text-[10px] border border-amber-600 hover:bg-amber-900/30 text-amber-500 px-2 py-1 rounded-lg transition-colors whitespace-nowrap"
                          >
                            {isUk ? "Взяти" : "Claim"}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
