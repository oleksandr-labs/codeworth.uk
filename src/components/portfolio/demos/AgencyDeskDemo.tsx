"use client";
import { useState, useEffect } from "react";

const PROJECTS = [
  {
    id: "PRJ-014",
    client: "Highland Brewing Co.",
    name: "Brand Refresh + Website",
    status: "in-progress",
    deadline: "20 Jun",
    budget: 8400,
    billed: 4200,
    tasks: [
      { title: "Brand strategy doc", done: true, hours: 4 },
      { title: "Logo concepts (3 options)", done: true, hours: 8 },
      { title: "Logo finalisation", done: true, hours: 3 },
      { title: "Website wireframes", done: true, hours: 6 },
      { title: "UI design (5 pages)", done: false, hours: 14 },
      { title: "Development sprint 1", done: false, hours: 0 },
      { title: "Content upload + QA", done: false, hours: 0 },
    ],
    team: ["KM", "AS", "JB"],
    colour: "bg-teal-500",
  },
  {
    id: "PRJ-013",
    client: "Forth Street Finance",
    name: "Monthly Social + Ads",
    status: "in-progress",
    deadline: "30 Jun",
    budget: 2200,
    billed: 1100,
    tasks: [
      { title: "Content calendar Jun", done: true, hours: 2 },
      { title: "8× LinkedIn posts", done: false, hours: 0 },
      { title: "Google Ads optimisation", done: false, hours: 3 },
    ],
    team: ["LT", "AS"],
    colour: "bg-cyan-500",
  },
  {
    id: "PRJ-012",
    client: "Caledonian Hotels Group",
    name: "SEO Audit + Strategy",
    status: "review",
    deadline: "05 Jun",
    budget: 3600,
    billed: 3600,
    tasks: [
      { title: "Technical crawl", done: true, hours: 5 },
      { title: "Keyword gap analysis", done: true, hours: 6 },
      { title: "Competitor analysis", done: true, hours: 4 },
      { title: "Strategy report", done: true, hours: 8 },
    ],
    team: ["JB", "KM"],
    colour: "bg-sky-500",
  },
];

const TIME_LOG = [
  { initials: "KM", project: "Highland Brewing", task: "Logo finalisation", hours: 3, rate: 95, date: "Today" },
  { initials: "AS", project: "Highland Brewing", task: "Website wireframes", hours: 6, rate: 85, date: "Today" },
  { initials: "LT", project: "Forth Street Finance", task: "LinkedIn posts", hours: 2, rate: 75, date: "Today" },
  { initials: "JB", project: "Caledonian Hotels", task: "Strategy report", hours: 4, rate: 90, date: "Yesterday" },
];

const INVOICES = [
  { ref: "INV-2024-089", client: "Caledonian Hotels", amount: 3600, status: "paid", date: "01 Jun", dueDate: "15 Jun" },
  { ref: "INV-2024-088", client: "Highland Brewing", amount: 4200, status: "sent", date: "20 May", dueDate: "03 Jun" },
  { ref: "INV-2024-087", client: "Forth Street Finance", amount: 1100, status: "overdue", date: "01 May", dueDate: "15 May" },
];

const TEAM_UTIL = [
  { initials: "KM", name: "Kirsty Muir", role: "Creative Dir.", hrs: 38, capacity: 40, revenue: 3610 },
  { initials: "AS", name: "Alistair Scott", role: "Designer", hrs: 32, capacity: 40, revenue: 2720 },
  { initials: "JB", name: "Jamie Bell", role: "SEO Lead", hrs: 40, capacity: 40, revenue: 3600 },
  { initials: "LT", name: "Laura Thomson", role: "Copywriter", hrs: 28, capacity: 40, revenue: 2100 },
];

export function AgencyDeskDemo({ lang }: { lang: string }) {
  const [view, setView] = useState<"kanban" | "time" | "invoices" | "team">("kanban");
  const [timerOn, setTimerOn] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const isUk = lang === "uk";

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (timerOn) interval = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(interval);
  }, [timerOn]);

  const fmt = (s: number) => `${String(Math.floor(s / 3600)).padStart(2, "0")}:${String(Math.floor((s % 3600) / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const STATUS_COLS = [
    { id: "in-progress", label: isUk ? "В роботі" : "In progress", dot: "bg-teal-400" },
    { id: "review", label: isUk ? "На ревʼю" : "Review", dot: "bg-amber-400" },
    { id: "done", label: isUk ? "Завершено" : "Done", dot: "bg-neutral-300 dark:bg-neutral-600" },
  ];

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 font-sans">
      {/* Clean agency header */}
      <header className="bg-teal-600 dark:bg-teal-800 text-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center font-black text-sm">AD</div>
            <span className="font-bold text-lg">AgencyDesk</span>
            <span className="text-teal-200 text-xs">Edinburgh Office</span>
          </div>
          {/* Timer widget */}
          <div className="flex items-center gap-3 bg-teal-700 dark:bg-teal-900 rounded-xl px-4 py-2">
            <span className="font-mono font-bold text-lg">{fmt(seconds)}</span>
            <button
              onClick={() => setTimerOn(t => !t)}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors ${timerOn ? "bg-red-400 hover:bg-red-500" : "bg-emerald-400 hover:bg-emerald-500"}`}
            >
              {timerOn ? "⏸" : "▶"}
            </button>
            {timerOn && <span className="text-xs text-teal-200 animate-pulse">{isUk ? "Трекінг…" : "Tracking…"}</span>}
          </div>
        </div>
      </header>

      {/* Pill nav */}
      <div className="px-6 py-3 flex gap-2 bg-teal-700 dark:bg-teal-900">
        {([
          { id: "kanban", label: "Kanban" },
          { id: "time", label: isUk ? "⏱ Час" : "⏱ Time log" },
          { id: "invoices", label: isUk ? "🧾 Інвойси" : "🧾 Invoices" },
          { id: "team", label: isUk ? "👥 Команда" : "👥 Team" },
        ] as const).map(v => (
          <button
            key={v.id}
            onClick={() => setView(v.id)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
              view === v.id ? "bg-white text-teal-700" : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>

      <main className="p-6">

        {/* KANBAN */}
        {view === "kanban" && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {STATUS_COLS.map(col => (
              <div key={col.id}>
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-2.5 h-2.5 rounded-full ${col.dot}`} />
                  <span className="font-semibold text-neutral-700 dark:text-neutral-200 text-sm">{col.label}</span>
                  <span className="text-xs text-neutral-400 dark:text-neutral-500 bg-neutral-200 dark:bg-neutral-700 rounded-full px-2 py-0.5">
                    {PROJECTS.filter(p => p.status === col.id).length}
                  </span>
                </div>
                <div className="space-y-3">
                  {PROJECTS.filter(p => p.status === col.id).map(p => {
                    const doneTasks = p.tasks.filter(t => t.done).length;
                    const totalTasks = p.tasks.length;
                    const pct = Math.round((doneTasks / totalTasks) * 100);
                    return (
                      <div key={p.id} className="bg-white dark:bg-neutral-800 rounded-2xl p-4 shadow-sm border border-neutral-200 dark:border-neutral-700">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className={`w-1 h-12 rounded-full ${p.colour} float-left mr-3`} />
                            <div className="font-bold text-neutral-900 dark:text-white text-sm">{p.name}</div>
                            <div className="text-xs text-neutral-400 dark:text-neutral-500">{p.client}</div>
                          </div>
                        </div>
                        <div className="mt-3 space-y-2">
                          <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400">
                            <span>{doneTasks}/{totalTasks} {isUk ? "завдань" : "tasks"}</span>
                            <span>Due {p.deadline}</span>
                          </div>
                          <div className="h-1.5 bg-neutral-100 dark:bg-neutral-700 rounded-full overflow-hidden">
                            <div className={`h-1.5 ${p.colour} rounded-full`} style={{ width: `${pct}%` }} />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex -space-x-1.5">
                              {p.team.map(t => (
                                <div key={t} className={`w-6 h-6 rounded-full ${p.colour} text-white text-xs flex items-center justify-center font-bold border-2 border-white dark:border-neutral-800`}>{t}</div>
                              ))}
                            </div>
                            <div className="text-xs font-semibold text-teal-600 dark:text-teal-400">
                              £{p.billed.toLocaleString()}/{p.budget.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {PROJECTS.filter(p => p.status === col.id).length === 0 && (
                    <div className="border-2 border-dashed border-neutral-200 dark:border-neutral-700 rounded-2xl p-6 text-center text-neutral-400 dark:text-neutral-600 text-sm">
                      {isUk ? "Немає проєктів" : "No projects"}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TIME LOG */}
        {view === "time" && (
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white">{isUk ? "Часовий журнал" : "Time log"}</h2>
              <button className="bg-teal-600 text-white text-sm px-4 py-2 rounded-xl hover:bg-teal-700 transition-colors">
                + {isUk ? "Додати запис" : "Log time"}
              </button>
            </div>
            <div className="space-y-2">
              {TIME_LOG.map((e, i) => (
                <div key={i} className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-100 dark:border-neutral-700 p-4 flex items-center gap-4">
                  <div className="w-9 h-9 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                    {e.initials}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-neutral-900 dark:text-white text-sm">{e.task}</div>
                    <div className="text-xs text-neutral-400 dark:text-neutral-500">{e.project} · {e.date}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-bold text-neutral-900 dark:text-white">{e.hours}h</div>
                    <div className="text-xs text-teal-600 dark:text-teal-400">£{(e.hours * e.rate).toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-teal-50 dark:bg-teal-900/20 rounded-xl border border-teal-100 dark:border-teal-800/50 p-4 flex justify-between text-sm">
              <span className="text-neutral-600 dark:text-neutral-300">{isUk ? "Зароблено сьогодні:" : "Earned today:"}</span>
              <span className="font-black text-teal-700 dark:text-teal-400">£{TIME_LOG.filter(e => e.date === "Today").reduce((s, e) => s + e.hours * e.rate, 0).toLocaleString()}</span>
            </div>
          </div>
        )}

        {/* INVOICES */}
        {view === "invoices" && (
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white">{isUk ? "Рахунки-фактури" : "Invoices"}</h2>
              <button className="bg-teal-600 text-white text-sm px-4 py-2 rounded-xl hover:bg-teal-700 transition-colors">
                + {isUk ? "Новий інвойс" : "New invoice"}
              </button>
            </div>
            {INVOICES.map(inv => (
              <div key={inv.ref} className={`bg-white dark:bg-neutral-800 rounded-2xl border-2 p-5 flex items-center justify-between ${inv.status === "overdue" ? "border-red-200 dark:border-red-800/50" : "border-neutral-100 dark:border-neutral-700"}`}>
                <div>
                  <div className="font-mono text-xs text-neutral-400 dark:text-neutral-500">{inv.ref}</div>
                  <div className="font-bold text-neutral-900 dark:text-white mt-0.5">{inv.client}</div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                    {isUk ? "Виставлено" : "Issued"}: {inv.date} · {isUk ? "До сплати" : "Due"}: {inv.dueDate}
                  </div>
                </div>
                <div className="text-right flex items-center gap-4">
                  <div>
                    <div className="font-black text-neutral-900 dark:text-white text-lg">£{inv.amount.toLocaleString()}</div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                      inv.status === "paid" ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400" :
                      inv.status === "sent" ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400" :
                      "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                    }`}>
                      {inv.status === "paid" ? (isUk ? "Оплачено" : "Paid") : inv.status === "sent" ? (isUk ? "Надіслано" : "Sent") : (isUk ? "Прострочено" : "Overdue")}
                    </span>
                  </div>
                  {inv.status !== "paid" && (
                    <button className="text-xs bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 px-3 py-1.5 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900/50 transition-colors">
                      {inv.status === "overdue" ? `📧 ${isUk ? "Нагадати" : "Chase"}` : `🔗 ${isUk ? "Stripe лінк" : "Stripe link"}`}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TEAM */}
        {view === "team" && (
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white">
              {isUk ? "Завантаженість команди — цей тиждень" : "Team utilisation — this week"}
            </h2>
            {TEAM_UTIL.map(m => {
              const pct = Math.round((m.hrs / m.capacity) * 100);
              return (
                <div key={m.initials} className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-100 dark:border-neutral-700 p-5">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {m.initials}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-bold text-neutral-900 dark:text-white">{m.name}</div>
                          <div className="text-xs text-neutral-400 dark:text-neutral-500">{m.role}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-black text-neutral-900 dark:text-white">{m.hrs}/{m.capacity}h</div>
                          <div className="text-xs text-teal-600 dark:text-teal-400 font-semibold">£{m.revenue.toLocaleString()}</div>
                        </div>
                      </div>
                      <div className="mt-3 h-2 bg-neutral-100 dark:bg-neutral-700 rounded-full overflow-hidden">
                        <div
                          className={`h-2 rounded-full transition-all ${pct >= 95 ? "bg-red-400" : pct >= 80 ? "bg-teal-500" : "bg-amber-400"}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <div className={`text-xs mt-1 font-medium ${pct >= 95 ? "text-red-500" : pct >= 80 ? "text-teal-600 dark:text-teal-400" : "text-amber-600"}`}>
                        {pct}% {pct >= 95 ? (isUk ? "— наближається до перевантаження" : "— near capacity") : pct >= 80 ? (isUk ? "— оптимально" : "— optimal") : (isUk ? "— є вільний час" : "— has capacity")}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </main>
    </div>
  );
}
