"use client";
import { useState, useEffect } from "react";

type Card = {
  id: string;
  client: string;
  title: string;
  col: "todo" | "doing" | "review" | "done";
  team: string[];
  hours: number;
  budget: number;
  due: string;
  tag: string;
};

const INITIAL: Card[] = [
  { id: "T-201", client: "Highland Brewing", title: "Brand strategy doc", col: "done", team: ["KM"], hours: 4, budget: 4, due: "12 May", tag: "Brand" },
  { id: "T-202", client: "Highland Brewing", title: "Logo finalisation", col: "done", team: ["KM", "AS"], hours: 11, budget: 12, due: "20 May", tag: "Brand" },
  { id: "T-203", client: "Highland Brewing", title: "UI design — 5 pages", col: "doing", team: ["AS"], hours: 9, budget: 14, due: "10 Jun", tag: "Design" },
  { id: "T-204", client: "Highland Brewing", title: "Dev sprint 1", col: "todo", team: ["JB"], hours: 0, budget: 20, due: "18 Jun", tag: "Dev" },
  { id: "T-210", client: "Forth Street Finance", title: "8× LinkedIn posts", col: "doing", team: ["LT"], hours: 3, budget: 6, due: "30 Jun", tag: "Social" },
  { id: "T-211", client: "Forth Street Finance", title: "Google Ads tune", col: "todo", team: ["AS"], hours: 0, budget: 3, due: "28 Jun", tag: "Ads" },
  { id: "T-220", client: "Caledonian Hotels", title: "SEO strategy report", col: "review", team: ["JB", "KM"], hours: 8, budget: 8, due: "05 Jun", tag: "SEO" },
  { id: "T-221", client: "Caledonian Hotels", title: "Keyword gap analysis", col: "done", team: ["JB"], hours: 6, budget: 6, due: "28 May", tag: "SEO" },
];

const COLS = [
  { id: "todo", label: "To Do", accent: "border-t-neutral-400" },
  { id: "doing", label: "In Progress", accent: "border-t-teal-500" },
  { id: "review", label: "Client Review", accent: "border-t-amber-500" },
  { id: "done", label: "Done", accent: "border-t-emerald-500" },
] as const;

const TAG_COLOUR: Record<string, string> = {
  Brand: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  Design: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
  Dev: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  Social: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
  Ads: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  SEO: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
};

export function AgencyDeskDemo({ lang }: { lang: string }) {
  const [cards, setCards] = useState(INITIAL);
  const [seconds, setSeconds] = useState(2_847);
  const [running, setRunning] = useState(true);
  const [activeTask, setActiveTask] = useState("T-203");
  const isUk = lang === "uk";

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(t);
  }, [running]);

  const fmt = (s: number) => `${String(Math.floor(s / 3600)).padStart(2, "0")}:${String(Math.floor((s % 3600) / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const move = (id: string, dir: 1 | -1) => {
    setCards(prev => prev.map(c => {
      if (c.id !== id) return c;
      const order = ["todo", "doing", "review", "done"] as const;
      const idx = order.indexOf(c.col);
      const next = order[Math.max(0, Math.min(3, idx + dir))];
      return { ...c, col: next };
    }));
  };

  const COL_LABEL: Record<string, string> = isUk
    ? { todo: "Черга", doing: "В роботі", review: "Ревʼю клієнта", done: "Готово" }
    : { todo: "To Do", doing: "In Progress", review: "Client Review", done: "Done" };

  const activeCard = cards.find(c => c.id === activeTask);

  return (
    <div className="h-screen bg-neutral-100 dark:bg-neutral-900 flex flex-col font-sans overflow-hidden">

      {/* ── SLIM TOP STRIP ── */}
      <div className="flex items-center justify-between px-5 py-2.5 bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-teal-600 rounded-md flex items-center justify-center text-white text-[10px] font-black">AD</div>
          <span className="font-bold text-neutral-900 dark:text-white text-sm">AgencyDesk</span>
          <span className="text-neutral-400 dark:text-neutral-500 text-xs">· Edinburgh · 3 {isUk ? "активні клієнти" : "active clients"}</span>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="text-neutral-500 dark:text-neutral-400">{isUk ? "Завантаженість" : "Utilisation"}: <strong className="text-teal-600 dark:text-teal-400">84%</strong></span>
          <span className="text-neutral-500 dark:text-neutral-400">{isUk ? "Дебіторка" : "Outstanding"}: <strong className="text-amber-600">£1,100</strong></span>
          <div className="flex -space-x-1.5">
            {["KM","AS","JB","LT"].map(t => <div key={t} className="w-6 h-6 rounded-full bg-teal-500 text-white text-[9px] flex items-center justify-center font-bold border-2 border-white dark:border-neutral-800">{t}</div>)}
          </div>
        </div>
      </div>

      {/* ── KANBAN BOARD (fills screen) ── */}
      <div className="flex-1 overflow-x-auto p-4">
        <div className="grid grid-cols-4 gap-3 h-full min-w-[760px]">
          {COLS.map(col => {
            const colCards = cards.filter(c => c.col === col.id);
            const colHours = colCards.reduce((s, c) => s + c.hours, 0);
            return (
              <div key={col.id} className={`bg-neutral-50 dark:bg-neutral-800/50 rounded-2xl border-t-4 ${col.accent} flex flex-col overflow-hidden`}>
                <div className="px-3 py-2.5 flex items-center justify-between shrink-0">
                  <span className="font-bold text-sm text-neutral-700 dark:text-neutral-200">{COL_LABEL[col.id]}</span>
                  <span className="text-[10px] text-neutral-400 dark:text-neutral-500 bg-white dark:bg-neutral-700 rounded-full px-2 py-0.5">{colCards.length} · {colHours}h</span>
                </div>
                <div className="flex-1 overflow-y-auto px-2.5 pb-2.5 space-y-2.5">
                  {colCards.map(c => (
                    <div key={c.id} className={`bg-white dark:bg-neutral-800 rounded-xl border p-3 group ${c.id === activeTask ? "border-teal-400 ring-2 ring-teal-100 dark:ring-teal-900/40" : "border-neutral-200 dark:border-neutral-700"}`}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${TAG_COLOUR[c.tag]}`}>{c.tag}</span>
                        <span className="font-mono text-[9px] text-neutral-300 dark:text-neutral-600">{c.id}</span>
                      </div>
                      <div className="font-semibold text-sm text-neutral-900 dark:text-white leading-snug">{c.title}</div>
                      <div className="text-[10px] text-neutral-400 dark:text-neutral-500 mt-0.5">{c.client}</div>
                      {/* budget bar */}
                      <div className="mt-2 h-1 bg-neutral-100 dark:bg-neutral-700 rounded-full overflow-hidden">
                        <div className={`h-1 rounded-full ${c.hours > c.budget ? "bg-red-400" : "bg-teal-500"}`} style={{ width: `${Math.min(100, (c.hours / c.budget) * 100 || 2)}%` }} />
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex -space-x-1.5">
                          {c.team.map(t => <div key={t} className="w-5 h-5 rounded-full bg-teal-500 text-white text-[8px] flex items-center justify-center font-bold border border-white dark:border-neutral-800">{t}</div>)}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-neutral-400 dark:text-neutral-500">{c.hours}/{c.budget}h</span>
                          <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => move(c.id, -1)} className="w-5 h-5 rounded bg-neutral-100 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-300 text-xs hover:bg-neutral-200 dark:hover:bg-neutral-600">←</button>
                            <button onClick={() => move(c.id, 1)} className="w-5 h-5 rounded bg-neutral-100 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-300 text-xs hover:bg-neutral-200 dark:hover:bg-neutral-600">→</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {colCards.length === 0 && (
                    <div className="border-2 border-dashed border-neutral-200 dark:border-neutral-700 rounded-xl h-16 flex items-center justify-center text-[10px] text-neutral-300 dark:text-neutral-600">
                      {isUk ? "Порожньо" : "Empty"}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── FLOATING TIMER WIDGET ── */}
      <div className="absolute bottom-5 right-5 bg-neutral-900 dark:bg-black text-white rounded-2xl shadow-2xl border border-neutral-700 px-4 py-3 flex items-center gap-4 z-20">
        <div>
          <div className="text-[9px] text-neutral-400 uppercase tracking-widest">{isUk ? "Трекінг часу" : "Tracking"}</div>
          <div className="text-xs text-teal-400 font-medium">{activeCard?.title ?? "—"}</div>
        </div>
        <div className="font-mono font-black text-2xl tabular-nums">{fmt(seconds)}</div>
        <button
          onClick={() => setRunning(r => !r)}
          className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-colors ${running ? "bg-red-500 hover:bg-red-400" : "bg-emerald-500 hover:bg-emerald-400"}`}
        >
          {running ? "⏸" : "▶"}
        </button>
        <div className="border-l border-neutral-700 pl-4 text-right">
          <div className="text-[9px] text-neutral-400 uppercase">{isUk ? "Сьогодні" : "Billable today"}</div>
          <div className="font-bold text-teal-400">£{(Math.floor(seconds / 3600 * 95) + 285).toLocaleString()}</div>
        </div>
      </div>

    </div>
  );
}
