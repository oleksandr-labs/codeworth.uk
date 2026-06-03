"use client";
import { useState, useEffect } from "react";

const MACHINES = [
  { id: "M-01", name: "Press Line A",    health: 92, temp: 78,  vibr: 0.3, rpm: 1450, status: "ok"       as const, predDays: 42 },
  { id: "M-02", name: "CNC Mill #3",     health: 61, temp: 95,  vibr: 1.8, rpm: 2200, status: "warning"  as const, predDays: 8  },
  { id: "M-03", name: "Conveyor B",      health: 88, temp: 68,  vibr: 0.5, rpm: 800,  status: "ok"       as const, predDays: 31 },
  { id: "M-04", name: "Hydraulic Press", health: 34, temp: 112, vibr: 3.2, rpm: 960,  status: "critical" as const, predDays: 2  },
  { id: "M-05", name: "Welding Robot",   health: 77, temp: 85,  vibr: 0.9, rpm: 0,    status: "ok"       as const, predDays: 18 },
  { id: "M-06", name: "Grinding Disk",   health: 55, temp: 99,  vibr: 2.1, rpm: 3600, status: "warning"  as const, predDays: 5  },
];

const ALERTS = [
  { time: "08:42", machine: "Hydraulic Press", msg: "Vibration 3.2g — CRITICAL. Bearing failure predicted in 48h", type: "critical" as const },
  { time: "08:31", machine: "CNC Mill #3",     msg: "Temperature 95°C above threshold. Schedule maintenance.",     type: "warning"  as const },
  { time: "08:15", machine: "Grinding Disk",   msg: "Vibration trending up. Inspect bearing lubrication.",          type: "warning"  as const },
  { time: "07:58", machine: "CNC Mill #3",     msg: "RPM fluctuation detected. Spindle wear pattern confirmed.",    type: "warning"  as const },
  { time: "07:30", machine: "Hydraulic Press", msg: "Oil pressure drop. Check hydraulic seals.",                    type: "critical" as const },
];

const TIMELINE = [
  { h: "00", v: 0.3 }, { h: "02", v: 0.4 }, { h: "04", v: 0.5 },
  { h: "06", v: 0.8 }, { h: "08", v: 1.2 }, { h: "10", v: 0.9 },
  { h: "12", v: 1.5 }, { h: "14", v: 2.1 }, { h: "16", v: 3.2 },
];

function machineCfg(s: "ok" | "warning" | "critical") {
  if (s === "critical") return { ring: "ring-red-600",    bgCard: "bg-red-950/30",     textStatus: "text-red-400",    barFrom: "from-red-500",    labelBg: "bg-neutral-800 text-red-400",    pulse: true  };
  if (s === "warning")  return { ring: "ring-amber-500",  bgCard: "bg-amber-950/20",   textStatus: "text-amber-400",  barFrom: "from-amber-500",  labelBg: "bg-neutral-800 text-amber-400",  pulse: false };
  return                       { ring: "ring-emerald-700", bgCard: "bg-neutral-900",   textStatus: "text-emerald-400", barFrom: "from-emerald-500", labelBg: "bg-neutral-800 text-emerald-400", pulse: false };
}

const STATUS_LABEL = { ok: "OK", warning: "WARNING", critical: "CRITICAL" };

export function MachineGuardDemo({ lang }: { lang: string }) {
  const [selected, setSelected] = useState(MACHINES[3]);
  const [tick, setTick] = useState(0);
  const [workOrderCreated, setWorkOrderCreated] = useState(false);
  const isUk = lang === "uk";

  useEffect(() => {
    const t = setInterval(() => setTick(v => v + 1), 2000);
    return () => clearInterval(t);
  }, []);

  const liveVibr = (selected.vibr + Math.sin(tick * 0.7) * selected.vibr * 0.1).toFixed(2);
  const liveTemp = (selected.temp + Math.sin(tick * 0.3) * 0.8).toFixed(1);
  const maxTL = Math.max(...TIMELINE.map(t => t.v));
  const cfg = machineCfg(selected.status);

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans">

      {/* ── HEADER ── */}
      <header className="h-14 bg-neutral-900 border-b border-neutral-800 flex items-center px-5 gap-4 sticky top-0 z-10">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-orange-600 flex items-center justify-center text-white text-[11px] font-black">MG</div>
          <span className="font-black text-lg tracking-tight">MachineGuard</span>
          <span className="text-orange-400 text-xs font-semibold">AI Predictive Maintenance</span>
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-3 text-xs text-neutral-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            CRITICAL ALERT
          </span>
          <span className="hidden sm:inline">Zaporizhzhia Plant · Line 3 · {isUk ? "14 машин" : "14 machines"}</span>
        </div>
      </header>

      <div className="p-5 max-w-7xl mx-auto">

        {/* MACHINE GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-5">
          {MACHINES.map(m => {
            const c = machineCfg(m.status);
            const isSel = selected.id === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setSelected(m)}
                className={`${c.bgCard} rounded-2xl p-4 text-left ring-1 ${c.ring} ${isSel ? "ring-2" : ""} hover:ring-2 transition-all`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-[10px] font-bold text-neutral-500 font-mono">{m.id}</div>
                    <div className="font-semibold text-sm text-white">{m.name}</div>
                  </div>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${c.labelBg}`}>
                    {STATUS_LABEL[m.status]}
                  </span>
                </div>

                {/* Health bar */}
                <div className="mb-2">
                  <div className="flex justify-between text-[10px] text-neutral-500 mb-1">
                    <span>{isUk ? "Здоров'я" : "Health"}</span>
                    <span className={`font-bold ${m.health >= 75 ? "text-emerald-400" : m.health >= 50 ? "text-amber-400" : "text-red-400"}`}>{m.health}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-neutral-800 overflow-hidden">
                    <div className={`h-full rounded-full bg-linear-to-r ${c.barFrom} to-neutral-700`} style={{ width: `${m.health}%` }} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-1 text-[10px] text-neutral-400">
                  <span>Temp: <span className={m.temp > 100 ? "text-red-400 font-bold" : "text-neutral-300"}>{m.temp}°C</span></span>
                  <span>Vibr: <span className={m.vibr > 2 ? "text-red-400 font-bold" : m.vibr > 1 ? "text-amber-400" : "text-neutral-300"}>{m.vibr}g</span></span>
                </div>

                {m.status !== "ok" && (
                  <div className={`mt-2 text-[10px] font-bold ${m.status === "critical" ? "text-red-400" : "text-amber-400"}`}>
                    ⚠ {isUk ? "Відмова за" : "Failure in"} {m.predDays}d
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5">

          {/* SELECTED MACHINE DETAIL */}
          <div className="space-y-4">
            <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-5">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <div className={`w-3 h-3 rounded-full ${cfg.textStatus.replace("text-", "bg-")} ${selected.status === "critical" ? "animate-pulse" : ""} shrink-0`} />
                <span className="font-bold text-lg">{selected.name}</span>
                <span className={`text-xs font-black px-2 py-0.5 rounded-full bg-neutral-800 ${cfg.textStatus}`}>
                  {STATUS_LABEL[selected.status]}
                </span>
                {selected.status !== "ok" && (
                  <span className="ml-auto text-red-400 text-sm font-bold whitespace-nowrap">
                    {isUk ? "Відмова за" : "Predicted failure:"} {selected.predDays}d
                  </span>
                )}
              </div>

              {/* Live metrics */}
              <div className="grid grid-cols-4 gap-3 mb-5">
                {[
                  { label: isUk ? "Здоров'я"     : "Health",      value: `${selected.health}%`, alert: selected.health < 60                  },
                  { label: isUk ? "Температура"  : "Temp",        value: `${liveTemp}°C`,       alert: Number(liveTemp) > 100                },
                  { label: isUk ? "Вібрація live": "Vibr (live)", value: `${liveVibr}g`,        alert: Number(liveVibr) > 2                  },
                  { label: "RPM",                                  value: selected.rpm > 0 ? selected.rpm.toLocaleString() : "—", alert: false },
                ].map(s => (
                  <div key={s.label} className={`p-3 rounded-xl ${s.alert ? "bg-red-950/40 border border-red-900/40" : "bg-neutral-800"}`}>
                    <div className="text-[10px] text-neutral-500 mb-1 truncate">{s.label}</div>
                    <div className={`text-xl font-black tabular-nums ${s.alert ? "text-red-400" : "text-white"}`}>{s.value}</div>
                  </div>
                ))}
              </div>

              {/* Vibration timeline */}
              <div>
                <div className="text-xs text-neutral-400 uppercase tracking-widest mb-3">
                  {isUk ? "Вібрація сьогодні (g)" : "Vibration today (g)"}
                </div>
                <div className="flex items-end gap-1.5 h-24">
                  {TIMELINE.map(t => (
                    <div key={t.h} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full rounded-t relative" style={{ height: `${(t.v / maxTL) * 100}%`, minHeight: 4 }}>
                        <div className={`absolute inset-0 rounded-t ${t.v > 2 ? "bg-red-500" : t.v > 1 ? "bg-amber-500" : "bg-emerald-500"}`} />
                      </div>
                      <span className="text-[9px] text-neutral-600">{t.h}h</span>
                    </div>
                  ))}
                </div>
                {selected.status !== "ok" && (
                  <div className="mt-2 text-[10px] text-red-400 font-semibold">
                    {isUk ? "↑ Вібрація зростає — LSTM-модель (PyTorch) виявила аномалію" : "↑ Vibration trending up — LSTM anomaly detected (PyTorch)"}
                  </div>
                )}
              </div>
            </div>

            {/* ML model info */}
            <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-4">
              <div className="text-[10px] font-bold uppercase text-neutral-500 tracking-wide mb-2">{isUk ? "Стек ML" : "ML Stack"}</div>
              <div className="flex flex-wrap gap-1.5">
                {["Python", "PyTorch", "LSTM", "TimescaleDB", "FastAPI", "MQTT", "Docker"].map(t => (
                  <span key={t} className="px-2 py-0.5 rounded-md text-[10px] bg-neutral-800 text-neutral-400 font-medium">{t}</span>
                ))}
              </div>
              <div className="mt-3 text-xs text-neutral-500">
                {isUk ? "Горизонт прогнозу: 72 год · Точність: 89% · IoT сенсори: 14 машин × 8 каналів" : "Forecast horizon: 72h · Accuracy: 89% · IoT: 14 machines × 8 sensor channels"}
              </div>
            </div>
          </div>

          {/* ALERT FEED + ACTIONS */}
          <div className="space-y-4">
            <div className="bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden">
              <div className="px-5 py-3 border-b border-neutral-800 flex items-center justify-between">
                <span className="font-semibold text-sm">{isUk ? "Сповіщення" : "Alert Feed"}</span>
                <span className="text-[10px] font-bold text-red-400 bg-red-900/20 px-2 py-0.5 rounded-full">
                  {ALERTS.filter(a => a.type === "critical").length} CRITICAL
                </span>
              </div>
              <div className="divide-y divide-neutral-800 max-h-72 overflow-y-auto">
                {ALERTS.map((a, i) => (
                  <div key={i} className={`px-5 py-3.5 ${a.type === "critical" ? "bg-red-950/15" : ""}`}>
                    <div className="flex items-start gap-3">
                      <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${a.type === "critical" ? "bg-red-500 animate-pulse" : "bg-amber-500"}`} />
                      <div>
                        <div className="text-[10px] text-neutral-500 font-mono">{a.time} · {a.machine}</div>
                        <div className={`text-xs mt-0.5 leading-relaxed ${a.type === "critical" ? "text-red-300" : "text-amber-300"}`}>{a.msg}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-4 space-y-2">
              <div className="text-[10px] text-neutral-500 uppercase tracking-wide mb-3">{isUk ? "Дії" : "Actions"}</div>
              {!workOrderCreated ? (
                <button
                  onClick={() => setWorkOrderCreated(true)}
                  className="w-full py-2.5 rounded-xl bg-red-600 text-white font-semibold text-sm hover:bg-red-700 transition-colors"
                >
                  🚨 {isUk ? "Створити ордер на обслуговування" : "Create Maintenance Work Order"}
                </button>
              ) : (
                <div className="w-full py-2.5 rounded-xl bg-emerald-900/30 border border-emerald-700/30 text-emerald-400 font-semibold text-sm text-center">
                  ✓ {isUk ? "Ордер WO-2847 створено · Механік повідомлений" : "Work Order WO-2847 created · Mechanic notified"}
                </div>
              )}
              <button className="w-full py-2.5 rounded-xl bg-neutral-800 text-neutral-300 text-sm hover:bg-neutral-700 transition-colors">
                {isUk ? "Завантажити ML-звіт PDF" : "Export ML Report PDF"}
              </button>
              <button className="w-full py-2.5 rounded-xl bg-neutral-800 text-neutral-300 text-sm hover:bg-neutral-700 transition-colors">
                {isUk ? "Переглянути усі 14 машин" : "View All 14 Machines"}
              </button>
            </div>

            {/* Stats */}
            <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-4">
              <div className="text-[10px] text-neutral-500 uppercase tracking-wide mb-3">{isUk ? "Результати впровадження" : "Results"}</div>
              <div className="space-y-2 text-sm">
                {[
                  { label: isUk ? "Незаплановані простої ↓" : "Unplanned downtime ↓", value: "−73%", color: "text-emerald-400" },
                  { label: isUk ? "Ремонтні витрати ↓"     : "Repair costs ↓",        value: "−38%", color: "text-emerald-400" },
                  { label: isUk ? "ROI"                     : "ROI",                   value: "5 міс", color: "text-amber-400"  },
                ].map(r => (
                  <div key={r.label} className="flex justify-between">
                    <span className="text-neutral-400">{r.label}</span>
                    <span className={`font-black ${r.color}`}>{r.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
