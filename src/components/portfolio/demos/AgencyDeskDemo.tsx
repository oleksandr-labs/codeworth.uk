"use client";
import { useState, useEffect } from "react";
import { ClipboardCheck, TrendingUp, Users, LayoutGrid, PoundSterling, AlertTriangle, ChevronRight, Zap } from "lucide-react";

type ColId = "todo" | "doing" | "review" | "done";
type Tab = "board" | "finance" | "team" | "client";

type Card = {
  id: string;
  client: string;
  title: string;
  col: ColId;
  team: string[];
  hours: number;
  budget: number;
  due: string;
  tag: string;
  priority?: boolean;
};

type Subtask = { en: string; uk: string; done: boolean };

const INITIAL: Card[] = [
  // Highland Brewing — Branding + Web
  { id: "T-201", client: "Highland Brewing", title: "Brand strategy doc", col: "done", team: ["KM"], hours: 4, budget: 4, due: "12 May", tag: "Brand" },
  { id: "T-202", client: "Highland Brewing", title: "Logo finalisation", col: "done", team: ["KM", "AS"], hours: 11, budget: 12, due: "20 May", tag: "Brand" },
  { id: "T-203", client: "Highland Brewing", title: "UI design — 5 pages", col: "doing", team: ["AS"], hours: 9, budget: 14, due: "10 Jun", tag: "Design" },
  { id: "T-204", client: "Highland Brewing", title: "Dev sprint 1", col: "todo", team: ["JB"], hours: 0, budget: 20, due: "18 Jun", tag: "Dev", priority: true },
  // Forth Street Finance — Social + Ads
  { id: "T-210", client: "Forth Street Finance", title: "8× LinkedIn posts", col: "doing", team: ["LT"], hours: 3, budget: 6, due: "30 Jun", tag: "Social" },
  { id: "T-211", client: "Forth Street Finance", title: "Google Ads optimise", col: "todo", team: ["AS"], hours: 0, budget: 3, due: "28 Jun", tag: "Ads" },
  // Caledonian Hotels — SEO
  { id: "T-220", client: "Caledonian Hotels", title: "SEO strategy report", col: "review", team: ["JB", "KM"], hours: 8, budget: 8, due: "05 Jun", tag: "SEO", priority: true },
  { id: "T-221", client: "Caledonian Hotels", title: "Keyword gap analysis", col: "done", team: ["JB"], hours: 6, budget: 6, due: "28 May", tag: "SEO" },
  // SkyBridge Logistics — Web
  { id: "T-230", client: "SkyBridge Logistics", title: "Website copywriting", col: "doing", team: ["RT"], hours: 5, budget: 8, due: "12 Jun", tag: "Content" },
  { id: "T-231", client: "SkyBridge Logistics", title: "Homepage design", col: "review", team: ["AS"], hours: 12, budget: 12, due: "06 Jun", tag: "Design" },
  { id: "T-232", client: "SkyBridge Logistics", title: "Dev — 8 pages", col: "todo", team: ["JB"], hours: 0, budget: 32, due: "25 Jun", tag: "Dev" },
  // Meridian Property — Brand refresh
  { id: "T-240", client: "Meridian Property", title: "Q3 Social calendar", col: "todo", team: ["LT", "RT"], hours: 0, budget: 4, due: "01 Jul", tag: "Social" },
  { id: "T-241", client: "Meridian Property", title: "Brand refresh deck", col: "done", team: ["KM", "AS"], hours: 9, budget: 10, due: "25 May", tag: "Brand" },
];

const TEAM_DATA = [
  { id: "KM", name: "Kirsty Muir", role: "Brand Lead", rate: 95, hours: 34, capacity: 40, taskId: "T-220", color: "bg-violet-500" },
  { id: "AS", name: "Amy Stewart", role: "Sr. Designer", rate: 90, hours: 38, capacity: 40, taskId: "T-203", color: "bg-pink-500" },
  { id: "JB", name: "Jamie Burnett", role: "Developer", rate: 110, hours: 42, capacity: 40, taskId: "T-232", color: "bg-blue-500" },
  { id: "LT", name: "Liam Thomson", role: "PPC Specialist", rate: 85, hours: 28, capacity: 40, taskId: "T-210", color: "bg-orange-500" },
  { id: "RT", name: "Rachel Thomson", role: "Copywriter", rate: 80, hours: 31, capacity: 40, taskId: "T-230", color: "bg-teal-500" },
];

const FINANCE_ROWS = [
  { client: "Highland Brewing", project: "Branding + Web", totalHours: 44, billedHours: 15, rate: 90, invoiceNo: null, paid: null },
  { client: "Caledonian Hotels", project: "SEO Audit & Strategy", totalHours: 14, billedHours: 14, rate: 95, invoiceNo: "INV-089", paid: true },
  { client: "Forth Street Finance", project: "Social + PPC Mgmt", totalHours: 3, billedHours: 0, rate: 85, invoiceNo: null, paid: null },
  { client: "SkyBridge Logistics", project: "Website Build", totalHours: 17, billedHours: 0, rate: 90, invoiceNo: null, paid: null },
  { client: "Meridian Property", project: "Brand Refresh", totalHours: 9, billedHours: 9, rate: 90, invoiceNo: "INV-085", paid: false },
];

const COLS = [
  { id: "todo" as ColId, label: { en: "To Do", uk: "Черга" }, accent: "border-t-neutral-400" },
  { id: "doing" as ColId, label: { en: "In Progress", uk: "В роботі" }, accent: "border-t-teal-500" },
  { id: "review" as ColId, label: { en: "Client Review", uk: "Ревʼю" }, accent: "border-t-amber-500" },
  { id: "done" as ColId, label: { en: "Done", uk: "Готово" }, accent: "border-t-emerald-500" },
];

const TAG_COLOUR: Record<string, string> = {
  Brand: "bg-purple-100 text-purple-700",
  Design: "bg-pink-100 text-pink-700",
  Dev: "bg-blue-100 text-blue-700",
  Social: "bg-cyan-100 text-cyan-700",
  Ads: "bg-orange-100 text-orange-700",
  SEO: "bg-emerald-100 text-emerald-700",
  Content: "bg-lime-100 text-lime-700",
};

const SUBTASKS_INIT: Record<string, Subtask[]> = {
  "T-203": [
    { en: "Homepage hi-fi", uk: "Головна — hi-fi", done: true },
    { en: "Product page", uk: "Сторінка товару", done: true },
    { en: "Checkout flow", uk: "Флоу оформлення", done: false },
    { en: "Mobile breakpoints", uk: "Мобільні breakpoints", done: false },
    { en: "Design QA", uk: "QA дизайну", done: false },
  ],
  "T-220": [
    { en: "Crawl & index audit", uk: "Crawl/index аудит", done: true },
    { en: "Backlink profile", uk: "Профіль беклінків", done: true },
    { en: "Content gap matrix", uk: "Контент-прогалини", done: true },
    { en: "Executive summary", uk: "Резюме для клієнта", done: false },
  ],
  "T-230": [
    { en: "Homepage copy", uk: "Текст головної", done: true },
    { en: "Services pages (5)", uk: "Сторінки послуг (5)", done: false },
    { en: "About + Team", uk: "Про нас + Команда", done: false },
  ],
};

const COMMENTS: Record<string, { who: string; en: string; uk: string; ago: string }[]> = {
  "T-203": [
    { who: "KM", en: "Client loves the hero — keep the bold type.", uk: "Клієнту зайшов hero — лишаємо жирний шрифт.", ago: "2h" },
    { who: "AS", en: "Checkout needs a guest option, adding now.", uk: "У checkout треба гостьовий режим, додаю.", ago: "40m" },
  ],
  "T-220": [
    { who: "JB", en: "Found 18 quick-win keywords, added to report.", uk: "Знайшов 18 quick-win ключів, додав до звіту.", ago: "1d" },
    { who: "KM", en: "Exec summary drafted — client review requested.", uk: "Резюме готове — надіслано клієнту на ревʼю.", ago: "3h" },
  ],
};

const TAB_ICONS = { board: LayoutGrid, finance: PoundSterling, team: Users, client: ChevronRight };

export function AgencyDeskDemo({ lang }: { lang: string }) {
  const [cards, setCards] = useState(INITIAL);
  const [subtasks, setSubtasks] = useState(SUBTASKS_INIT);
  const [seconds, setSeconds] = useState(2_847);
  const [running, setRunning] = useState(true);
  const [activeTask, setActiveTask] = useState("T-203");
  const [detailId, setDetailId] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("board");
  const [generatedInvoices, setGeneratedInvoices] = useState<Set<string>>(new Set());
  const isUk = lang === "uk";

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(t);
  }, [running]);

  const fmt = (s: number) =>
    `${String(Math.floor(s / 3600)).padStart(2, "0")}:${String(Math.floor((s % 3600) / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const move = (id: string, dir: 1 | -1) => {
    setCards(prev => prev.map(c => {
      if (c.id !== id) return c;
      const order: ColId[] = ["todo", "doing", "review", "done"];
      const idx = order.indexOf(c.col);
      const next = order[Math.max(0, Math.min(3, idx + dir))];
      return { ...c, col: next };
    }));
  };

  const toggleSubtask = (cardId: string, idx: number) => {
    setSubtasks(prev => ({
      ...prev,
      [cardId]: prev[cardId]?.map((s, i) => i === idx ? { ...s, done: !s.done } : s) ?? [],
    }));
  };

  const activeCard = cards.find(c => c.id === activeTask);

  // ── Finance stats
  const totalBillable = FINANCE_ROWS.reduce((s, r) => s + (r.billedHours * r.rate), 0);
  const totalUnbilled = FINANCE_ROWS.reduce((s, r) => s + ((r.totalHours - r.billedHours) * r.rate), 0);
  const totalHoursAll = FINANCE_ROWS.reduce((s, r) => s + r.totalHours, 0);

  // ── Team stats
  const teamUtil = Math.round(TEAM_DATA.reduce((s, t) => s + t.hours / t.capacity, 0) / TEAM_DATA.length * 100);

  const TABS: { id: Tab; en: string; uk: string }[] = [
    { id: "board", en: "Projects", uk: "Проєкти" },
    { id: "finance", en: "Finance", uk: "Фінанси" },
    { id: "team", en: "Team", uk: "Команда" },
    { id: "client", en: "Client Portal", uk: "Клієнт" },
  ];

  return (
    <div className="h-screen bg-neutral-100 flex flex-col font-sans overflow-hidden">

      {/* ── HEADER ── */}
      <div className="shrink-0 bg-white border-b border-neutral-200">
        {/* Top strip */}
        <div className="flex items-center justify-between px-5 py-2 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-teal-600 rounded-md flex items-center justify-center text-white text-[10px] font-black">AD</div>
            <span className="font-bold text-neutral-900 text-sm">AgencyDesk</span>
            <span className="text-neutral-400 text-xs hidden sm:inline">· Edinburgh · 5 {isUk ? "клієнти" : "clients"}</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-neutral-500">
            <span className="hidden sm:inline">{isUk ? "Завантаженість" : "Utilisation"}: <strong className="text-teal-600">{teamUtil}%</strong></span>
            <span className="hidden sm:inline text-neutral-300">|</span>
            <span className="hidden sm:inline">{isUk ? "Активні годин цього тижня" : "Hours this week"}: <strong className="text-neutral-700">{TEAM_DATA.reduce((s, t) => s + t.hours, 0)}</strong></span>
            <div className="flex -space-x-1.5">
              {TEAM_DATA.map(t => (
                <div key={t.id} className={`w-6 h-6 rounded-full ${t.color} text-white text-[9px] flex items-center justify-center font-bold border-2 border-white`}>{t.id}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Tab nav */}
        <div className="flex px-4">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
                tab === t.id
                  ? "border-teal-500 text-teal-600"
                  : "border-transparent text-neutral-500 hover:text-neutral-700"
              }`}
            >
              {isUk ? t.uk : t.en}
              {t.id === "finance" && totalUnbilled > 0 && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              )}
              {t.id === "team" && TEAM_DATA.some(m => m.hours > m.capacity) && (
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── BOARD TAB ── */}
      {tab === "board" && (
        <div className="flex-1 overflow-x-auto p-4 relative">
          <div className="grid grid-cols-4 gap-3 h-full min-w-200">
            {COLS.map(col => {
              const colCards = cards.filter(c => c.col === col.id);
              const colHours = colCards.reduce((s, c) => s + c.hours, 0);
              return (
                <div key={col.id} className={`bg-white/70 rounded-2xl border-t-4 ${col.accent} flex flex-col overflow-hidden shadow-sm`}>
                  <div className="px-3 py-2.5 flex items-center justify-between shrink-0">
                    <span className="font-bold text-sm text-neutral-700">{isUk ? col.label.uk : col.label.en}</span>
                    <span className="text-[10px] text-neutral-400 bg-white rounded-full px-2 py-0.5">{colCards.length} · {colHours}h</span>
                  </div>
                  <div className="flex-1 overflow-y-auto px-2.5 pb-2.5 space-y-2">
                    {colCards.map(c => (
                      <div
                        key={c.id}
                        onClick={() => setDetailId(c.id)}
                        className={`cursor-pointer bg-white rounded-xl border p-3 group hover:shadow-md transition-shadow ${
                          c.id === activeTask ? "border-teal-400 ring-2 ring-teal-100" : "border-neutral-200"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-1">
                            <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${TAG_COLOUR[c.tag] ?? "bg-neutral-100 text-neutral-500"}`}>{c.tag}</span>
                            {c.priority && <span className="text-[9px] px-1 py-0.5 rounded font-bold bg-red-100 text-red-600">!</span>}
                          </div>
                          <span className="font-mono text-[9px] text-neutral-300">{c.id}</span>
                        </div>
                        <div className="font-semibold text-sm text-neutral-900 leading-snug">{c.title}</div>
                        <div className="text-[10px] text-neutral-400 mt-0.5">{c.client}</div>
                        <div className="mt-2 h-1 bg-neutral-100 rounded-full overflow-hidden">
                          <div
                            className={`h-1 rounded-full ${c.hours > c.budget ? "bg-red-400" : "bg-teal-500"}`}
                            style={{ width: `${Math.min(100, (c.hours / c.budget) * 100 || 2)}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex -space-x-1">
                            {c.team.map(tm => {
                              const member = TEAM_DATA.find(m => m.id === tm);
                              return (
                                <div key={tm} className={`w-5 h-5 rounded-full ${member?.color ?? "bg-teal-500"} text-white text-[8px] flex items-center justify-center font-bold border border-white`}>{tm}</div>
                              );
                            })}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] text-neutral-400">{c.hours}/{c.budget}h</span>
                            <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button onClick={e => { e.stopPropagation(); move(c.id, -1); }} className="w-5 h-5 rounded bg-neutral-100 text-neutral-500 text-xs hover:bg-neutral-200">←</button>
                              <button onClick={e => { e.stopPropagation(); move(c.id, 1); }} className="w-5 h-5 rounded bg-neutral-100 text-neutral-500 text-xs hover:bg-neutral-200">→</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {colCards.length === 0 && (
                      <div className="border-2 border-dashed border-neutral-200 rounded-xl h-14 flex items-center justify-center text-[10px] text-neutral-300">
                        {isUk ? "Порожньо" : "Empty"}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Floating timer */}
          <div className="absolute bottom-5 right-5 bg-neutral-900 text-white rounded-2xl shadow-2xl border border-neutral-700 px-4 py-3 flex items-center gap-4 z-20">
            <div>
              <div className="text-[9px] text-neutral-400 uppercase tracking-widest">{isUk ? "Трекінг" : "Tracking"}</div>
              <div className="text-xs text-teal-400 font-medium max-w-30 truncate">{activeCard?.title ?? "—"}</div>
            </div>
            <div className="font-mono font-black text-2xl tabular-nums">{fmt(seconds)}</div>
            <button
              onClick={() => setRunning(r => !r)}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-colors ${running ? "bg-red-500 hover:bg-red-400" : "bg-emerald-500 hover:bg-emerald-400"}`}
            >
              {running ? "⏸" : "▶"}
            </button>
            <div className="border-l border-neutral-700 pl-4 text-right">
              <div className="text-[9px] text-neutral-400 uppercase">{isUk ? "Виставлено сьогодні" : "Billable today"}</div>
              <div className="font-bold text-teal-400">£{(Math.floor(seconds / 3600 * 95) + 285).toLocaleString()}</div>
            </div>
          </div>
        </div>
      )}

      {/* ── FINANCE TAB ── */}
      {tab === "finance" && (
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* KPI row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: isUk ? "Виставлено (місяць)" : "Invoiced (MTD)", value: `£${totalBillable.toLocaleString()}`, icon: PoundSterling, color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
              { label: isUk ? "Не виставлено" : "Unbilled hours", value: `£${totalUnbilled.toLocaleString()}`, icon: AlertTriangle, color: "text-amber-600 bg-amber-50 border-amber-100" },
              { label: isUk ? "Годин відпрацьовано" : "Hours tracked", value: `${totalHoursAll}h`, icon: Zap, color: "text-blue-600 bg-blue-50 border-blue-100" },
              { label: isUk ? "Середня ставка" : "Avg hourly rate", value: `£${Math.round(TEAM_DATA.reduce((s, t) => s + t.rate, 0) / TEAM_DATA.length)}/h`, icon: TrendingUp, color: "text-violet-600 bg-violet-50 border-violet-100" },
            ].map(kpi => (
              <div key={kpi.label} className={`rounded-2xl border p-4 ${kpi.color}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium opacity-70">{kpi.label}</span>
                  <kpi.icon className="w-4 h-4 opacity-60" />
                </div>
                <div className="text-2xl font-black">{kpi.value}</div>
              </div>
            ))}
          </div>

          {/* Projects table */}
          <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm">
            <div className="px-5 py-3.5 border-b border-neutral-100 flex items-center justify-between">
              <h3 className="font-bold text-neutral-900 text-sm">{isUk ? "Проєкти та виставлення рахунків" : "Projects & Invoicing"}</h3>
              <span className="text-xs text-neutral-400">{isUk ? "Поточний місяць" : "Current month"}</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-150">
                <thead>
                  <tr className="bg-neutral-50 text-left">
                    {[
                      isUk ? "Клієнт / Проєкт" : "Client / Project",
                      isUk ? "Годин" : "Hours",
                      isUk ? "Ставка" : "Rate",
                      isUk ? "Вартість" : "Value",
                      isUk ? "Статус" : "Status",
                      "",
                    ].map((h, i) => (
                      <th key={i} className="px-4 py-2.5 text-xs font-semibold text-neutral-500 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {FINANCE_ROWS.map((row, i) => {
                    const unbilledHours = row.totalHours - row.billedHours;
                    const unbilledValue = unbilledHours * row.rate;
                    const totalValue = row.totalHours * row.rate;
                    const isGenerated = generatedInvoices.has(row.client);
                    return (
                      <tr key={i} className="hover:bg-neutral-50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="font-semibold text-neutral-900">{row.client}</div>
                          <div className="text-xs text-neutral-400">{row.project}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-mono text-neutral-700">{row.totalHours}h</div>
                          {unbilledHours > 0 && (
                            <div className="text-xs text-amber-600 font-medium">{unbilledHours}h {isUk ? "не вист." : "unbilled"}</div>
                          )}
                        </td>
                        <td className="px-4 py-3 font-mono text-neutral-600">£{row.rate}/h</td>
                        <td className="px-4 py-3">
                          <div className="font-bold text-neutral-900">£{totalValue.toLocaleString()}</div>
                          {unbilledHours > 0 && (
                            <div className="text-xs text-amber-600">£{unbilledValue.toLocaleString()} {isUk ? "до виставлення" : "to bill"}</div>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {isGenerated || row.invoiceNo ? (
                            row.paid === true ? (
                              <span className="inline-flex items-center gap-1 text-xs font-semibold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">✓ {isUk ? "Оплачено" : "Paid"}</span>
                            ) : row.paid === false ? (
                              <span className="inline-flex items-center gap-1 text-xs font-semibold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">⏳ {isUk ? "Очікує" : "Awaiting"}</span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                                ✓ {isUk ? "Виставлено" : "Invoiced"}
                              </span>
                            )
                          ) : unbilledHours > 0 ? (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">● {isUk ? "Не виставлено" : "Unbilled"}</span>
                          ) : (
                            <span className="text-xs text-neutral-400">{isUk ? "В роботі" : "In progress"}</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right">
                          {!row.invoiceNo && !isGenerated && unbilledHours > 0 && (
                            <button
                              onClick={() => setGeneratedInvoices(s => new Set([...s, row.client]))}
                              className="text-xs bg-teal-600 hover:bg-teal-500 text-white font-semibold px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
                            >
                              {isUk ? "Виставити рахунок" : "Generate Invoice"}
                            </button>
                          )}
                          {(row.invoiceNo || isGenerated) && (
                            <button className="text-xs text-teal-600 hover:underline font-medium">
                              ↓ {row.invoiceNo ?? "INV-new"} (PDF)
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Summary footer */}
            <div className="px-5 py-3 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between">
              <span className="text-xs text-neutral-500">{isUk ? "Всього до виставлення цього місяця" : "Total unbilled this month"}</span>
              <span className="font-black text-amber-600 text-lg">£{totalUnbilled.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}

      {/* ── TEAM TAB ── */}
      {tab === "team" && (
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-neutral-900">{isUk ? "Завантаженість команди — цей тиждень" : "Team utilisation — this week"}</h3>
            <span className="text-sm text-neutral-400">{isUk ? "Цільова: 40 год" : "Target: 40 hrs"}</span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM_DATA.map(member => {
              const pct = Math.round(member.hours / member.capacity * 100);
              const isOver = member.hours > member.capacity;
              const barColor = isOver ? "bg-red-500" : pct >= 85 ? "bg-amber-500" : "bg-teal-500";
              const cardBorder = isOver ? "border-red-200 bg-red-50" : "border-neutral-200 bg-white";
              const task = INITIAL.find(c => c.id === member.taskId);
              const billableWeek = member.hours * member.rate;
              return (
                <div key={member.id} className={`rounded-2xl border p-5 shadow-sm ${cardBorder}`}>
                  <div className="flex items-start gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-full ${member.color} text-white text-sm font-black flex items-center justify-center shrink-0`}>
                      {member.id}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-neutral-900 text-sm">{member.name}</div>
                      <div className="text-xs text-neutral-500">{member.role}</div>
                    </div>
                    {isOver && (
                      <div className="flex items-center gap-1 text-[10px] font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full shrink-0">
                        <AlertTriangle className="w-3 h-3" />
                        {isUk ? "Перевантаження" : "Overloaded"}
                      </div>
                    )}
                  </div>

                  {/* Utilisation bar */}
                  <div className="mb-3">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-neutral-500">{isUk ? "Завантаженість" : "Utilisation"}</span>
                      <span className={`font-bold ${isOver ? "text-red-600" : pct >= 85 ? "text-amber-600" : "text-teal-600"}`}>
                        {member.hours}/{member.capacity}h · {pct}%
                      </span>
                    </div>
                    <div className="h-2.5 bg-neutral-100 rounded-full overflow-hidden">
                      <div className={`h-2.5 rounded-full transition-all ${barColor}`} style={{ width: `${Math.min(110, pct)}%` }} />
                    </div>
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                    <div className="bg-neutral-50 rounded-lg p-2">
                      <div className="text-neutral-400">{isUk ? "Ставка" : "Rate"}</div>
                      <div className="font-bold text-neutral-700">£{member.rate}/h</div>
                    </div>
                    <div className="bg-neutral-50 rounded-lg p-2">
                      <div className="text-neutral-400">{isUk ? "Тиждень виставл." : "Week billable"}</div>
                      <div className="font-bold text-teal-600">£{billableWeek.toLocaleString()}</div>
                    </div>
                  </div>

                  {/* Current task */}
                  {task && (
                    <div className="flex items-start gap-2 bg-white border border-neutral-200 rounded-xl px-3 py-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0 mt-1" />
                      <div className="min-w-0">
                        <div className="text-[10px] text-neutral-400">{isUk ? "Зараз над" : "Currently on"}</div>
                        <div className="text-xs font-semibold text-neutral-700 truncate">{task.title}</div>
                        <div className="text-[10px] text-neutral-400">{task.client}</div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Overload warning */}
          {TEAM_DATA.some(m => m.hours > m.capacity) && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-red-800 text-sm">{isUk ? "Є перевантажені спеціалісти" : "Overloaded team members detected"}</div>
                <p className="text-xs text-red-700 mt-0.5">
                  {isUk
                    ? "Jamie Burnett (Developer) має 42 год при цілі 40. Перенесіть задачі або перенесіть дедлайни."
                    : "Jamie Burnett (Developer) is at 42h against a 40h target. Reassign tasks or push deadlines to avoid burnout."}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── CLIENT PORTAL TAB ── */}
      {tab === "client" && (
        <div className="flex-1 overflow-y-auto bg-linear-to-b from-teal-50 to-neutral-100 p-6">
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="bg-white rounded-2xl border border-neutral-200 p-5">
              <div className="text-xs text-teal-600 font-semibold uppercase tracking-wide">{isUk ? "Портал клієнта" : "Client Portal"}</div>
              <h2 className="text-xl font-black text-neutral-900 mt-1">Caledonian Hotels Group</h2>
              <p className="text-sm text-neutral-500">{isUk ? "Проєкт: SEO Audit + Strategy · менеджер Kirsty Muir" : "Project: SEO Audit + Strategy · managed by Kirsty Muir"}</p>
            </div>

            {/* Progress */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-neutral-900 text-sm">{isUk ? "Прогрес проєкту" : "Project progress"}</span>
                <span className="font-black text-teal-600">90%</span>
              </div>
              <div className="h-2.5 bg-neutral-100 rounded-full overflow-hidden">
                <div className="h-2.5 bg-teal-500 rounded-full" style={{ width: "90%" }} />
              </div>
              <div className="text-xs text-neutral-400 mt-2">{isUk ? "Очікувана здача: 5 червня" : "Expected delivery: 5 June"}</div>
            </div>

            {/* Deliverables */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-5">
              <div className="font-bold text-neutral-900 text-sm mb-3">{isUk ? "Результати (deliverables)" : "Deliverables"}</div>
              <div className="space-y-2">
                {[
                  { en: "Technical SEO crawl report", uk: "Технічний SEO-аудит (crawl)", done: true },
                  { en: "Keyword gap analysis (18 quick wins)", uk: "Аналіз ключових прогалин (18 quick wins)", done: true },
                  { en: "Competitor benchmark (top 5)", uk: "Аналіз конкурентів (топ 5)", done: true },
                  { en: "Strategy report & action plan (PDF)", uk: "Стратегічний звіт + план дій (PDF)", done: false },
                ].map((d, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-4 h-4 rounded flex items-center justify-center text-[9px] ${d.done ? "bg-teal-500 text-white" : "border border-neutral-300"}`}>{d.done ? "✓" : ""}</div>
                      <span className={`text-sm ${d.done ? "text-neutral-700" : "text-neutral-400"}`}>{isUk ? d.uk : d.en}</span>
                    </div>
                    {d.done && (
                      <button className="text-xs text-teal-600 hover:underline flex items-center gap-0.5">
                        ↓ {isUk ? "Завантажити" : "Download"}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Approval needed */}
            <div className="bg-amber-50 rounded-2xl border border-amber-200 p-5">
              <div className="flex items-center gap-2 mb-2">
                <ClipboardCheck className="w-5 h-5 text-amber-600" />
                <span className="font-bold text-amber-800 text-sm">{isUk ? "Потрібне ваше затвердження" : "Your approval needed"}</span>
              </div>
              <p className="text-sm text-amber-700 mb-3">{isUk ? "Перегляньте чернетку стратегічного звіту перед фіналізацією." : "Please review the draft strategy report before we finalise it."}</p>
              <div className="flex gap-2">
                <button className="bg-teal-600 hover:bg-teal-500 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">✓ {isUk ? "Затвердити" : "Approve"}</button>
                <button className="bg-white border border-neutral-200 text-neutral-600 text-sm px-4 py-2 rounded-xl hover:bg-neutral-50 transition-colors">{isUk ? "Запросити правки" : "Request changes"}</button>
              </div>
            </div>

            {/* Invoices */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-5">
              <div className="font-bold text-neutral-900 text-sm mb-3">{isUk ? "Рахунки" : "Invoices"}</div>
              <div className="divide-y divide-neutral-100">
                {[
                  { no: "INV-2024-089", desc: isUk ? "SEO Audit — фаза 1" : "SEO Audit — phase 1", date: isUk ? "01 червня" : "1 June", amount: "£3,600", status: "paid" },
                  { no: "INV-2024-094", desc: isUk ? "SEO Strategy Report" : "SEO Strategy Report", date: isUk ? "Очікується 06 червня" : "Due 6 June", amount: "£1,425", status: "pending" },
                ].map((inv, i) => (
                  <div key={i} className="flex items-center justify-between py-2.5">
                    <div>
                      <div className="text-sm text-neutral-800 font-mono">{inv.no}</div>
                      <div className="text-xs text-neutral-400">{inv.desc} · {inv.date}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-neutral-900">{inv.amount}</span>
                      {inv.status === "paid" ? (
                        <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-semibold">{isUk ? "Оплачено" : "Paid"}</span>
                      ) : (
                        <button className="text-xs bg-teal-600 hover:bg-teal-500 text-white px-3 py-1 rounded-lg font-semibold transition-colors">{isUk ? "Оплатити" : "Pay now"}</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TASK DETAIL DRAWER ── */}
      {detailId && tab === "board" && (() => {
        const c = cards.find(x => x.id === detailId);
        if (!c) return null;
        const subs = subtasks[c.id] ?? [{ en: "Task in delivery", uk: "Задача в роботі", done: false }];
        const subDone = subs.filter(s => s.done).length;
        const comments = COMMENTS[c.id] ?? [];
        return (
          <>
            <div onClick={() => setDetailId(null)} className="absolute inset-0 bg-black/40 z-30" />
            <aside className="absolute top-0 right-0 bottom-0 w-full max-w-sm bg-white z-40 shadow-2xl flex flex-col overflow-hidden">
              <div className="px-5 py-4 border-b border-neutral-100 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${TAG_COLOUR[c.tag] ?? "bg-neutral-100 text-neutral-500"}`}>{c.tag}</span>
                    {c.priority && <span className="text-[9px] px-1 py-0.5 rounded font-bold bg-red-100 text-red-600">! {isUk ? "Пріоритет" : "Priority"}</span>}
                    <span className="font-mono text-[10px] text-neutral-400">{c.id}</span>
                  </div>
                  <h3 className="font-bold text-neutral-900">{c.title}</h3>
                  <div className="text-xs text-neutral-400">{c.client} · {isUk ? "до" : "due"} {c.due}</div>
                </div>
                <button onClick={() => setDetailId(null)} className="w-7 h-7 rounded-lg text-neutral-400 hover:bg-neutral-100 transition-colors">✕</button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-5">
                {/* Budget bar */}
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-neutral-500">{isUk ? "Витрачено годин" : "Hours logged"}</span>
                    <span className={`font-bold ${c.hours > c.budget ? "text-red-500" : "text-neutral-900"}`}>{c.hours} / {c.budget}h</span>
                  </div>
                  <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <div className={`h-2 rounded-full ${c.hours > c.budget ? "bg-red-400" : "bg-teal-500"}`} style={{ width: `${Math.min(100, (c.hours / c.budget) * 100 || 2)}%` }} />
                  </div>
                  <div className="text-xs text-neutral-400 mt-1">
                    {isUk ? "Вартість:" : "Billable:"} £{(c.hours * 90).toLocaleString()} {isUk ? "з" : "of"} £{(c.budget * 90).toLocaleString()} {isUk ? "бюджету" : "budget"}
                  </div>
                </div>

                {/* Subtasks — interactive */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-neutral-700 uppercase tracking-wide">{isUk ? "Підзадачі" : "Subtasks"}</span>
                    <span className="text-[10px] text-neutral-400">{subDone}/{subs.length}</span>
                  </div>
                  <div className="h-1 bg-neutral-100 rounded-full overflow-hidden mb-3">
                    <div className="h-1 bg-teal-500 rounded-full transition-all" style={{ width: `${subs.length ? (subDone / subs.length) * 100 : 0}%` }} />
                  </div>
                  <div className="space-y-1.5">
                    {subs.map((s, idx) => (
                      <button
                        key={idx}
                        onClick={() => toggleSubtask(c.id, idx)}
                        className="flex items-center gap-2.5 w-full text-left hover:bg-neutral-50 rounded-lg px-1 py-0.5 transition-colors"
                      >
                        <div className={`w-4 h-4 rounded flex items-center justify-center text-[9px] shrink-0 transition-colors ${s.done ? "bg-teal-500 text-white" : "border border-neutral-300 hover:border-teal-400"}`}>{s.done ? "✓" : ""}</div>
                        <span className={`text-sm ${s.done ? "text-neutral-400 line-through" : "text-neutral-700"}`}>{isUk ? s.uk : s.en}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Team */}
                <div>
                  <span className="text-xs font-bold text-neutral-700 uppercase tracking-wide">{isUk ? "Команда" : "Assigned"}</span>
                  <div className="flex gap-2 mt-2">
                    {c.team.map(tm => {
                      const member = TEAM_DATA.find(m => m.id === tm);
                      return (
                        <div key={tm} className="flex items-center gap-2 bg-neutral-50 rounded-xl px-3 py-2">
                          <div className={`w-7 h-7 rounded-full ${member?.color ?? "bg-teal-500"} text-white text-xs flex items-center justify-center font-bold`}>{tm}</div>
                          <div>
                            <div className="text-xs font-semibold text-neutral-700">{member?.name ?? tm}</div>
                            <div className="text-[10px] text-neutral-400">{member?.role}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Activity */}
                <div>
                  <span className="text-xs font-bold text-neutral-700 uppercase tracking-wide">{isUk ? "Активність" : "Activity"}</span>
                  <div className="space-y-2.5 mt-2">
                    {comments.length === 0 && <div className="text-xs text-neutral-400 italic">{isUk ? "Поки що немає коментарів" : "No comments yet"}</div>}
                    {comments.map((cm, i) => (
                      <div key={i} className="flex gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-neutral-200 text-neutral-700 text-[10px] flex items-center justify-center font-bold shrink-0">{cm.who}</div>
                        <div className="flex-1">
                          <div className="bg-neutral-50 rounded-xl rounded-tl-none px-3 py-2 text-sm text-neutral-700">{isUk ? cm.uk : cm.en}</div>
                          <div className="text-[10px] text-neutral-400 mt-0.5">{cm.who} · {cm.ago} {isUk ? "тому" : "ago"}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-5 py-3 border-t border-neutral-100 flex gap-2">
                <button
                  onClick={() => { setActiveTask(c.id); setDetailId(null); }}
                  className="flex-1 bg-teal-600 hover:bg-teal-500 text-white text-sm font-semibold py-2 rounded-xl transition-colors"
                >
                  ▶ {isUk ? "Трекати задачу" : "Track this task"}
                </button>
                <button onClick={() => setDetailId(null)} className="px-4 text-sm text-neutral-500 hover:bg-neutral-100 rounded-xl transition-colors">{isUk ? "Закрити" : "Close"}</button>
              </div>
            </aside>
          </>
        );
      })()}
    </div>
  );
}
