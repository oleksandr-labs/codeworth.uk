"use client";
import { useState } from "react";

const PROJECTS = [
  { id: "P-041", name: "Kirkstall Road — 24 units", phase: "Foundation", progress: 38, budget: 1_240_000, spent: 471_200, due: "Mar 2026", pm: "R. Hughes", status: "on-track" },
  { id: "P-038", name: "Chapel Allerton — 8 units", phase: "Superstructure", progress: 72, budget: 640_000, spent: 460_800, due: "Sep 2025", pm: "S. Patel", status: "on-track" },
  { id: "P-035", name: "Headingley Mews — 12 units", phase: "Fit-Out", progress: 91, budget: 820_000, spent: 795_400, due: "Jul 2025", pm: "R. Hughes", status: "overrun" },
  { id: "P-033", name: "Roundhay — 6 units", phase: "Handover", progress: 98, budget: 410_000, spent: 402_000, due: "Jun 2025", pm: "T. Walsh", status: "on-track" },
];

const SUBCONTRACTORS = [
  { name: "Leeds Groundwork Ltd", trade: "Groundworks", invoice: "£18,400", cis: "£3,680", net: "£14,720", status: "paid" },
  { name: "Northern Frames", trade: "Timber Frame", invoice: "£42,000", cis: "£8,400", net: "£33,600", status: "pending" },
  { name: "Electra UK", trade: "Electrical 1st Fix", invoice: "£9,200", cis: "£1,840", net: "£7,360", status: "overdue" },
  { name: "PlumbRight Ltd", trade: "Plumbing", invoice: "£14,600", cis: "£2,920", net: "£11,680", status: "pending" },
  { name: "Brickwork Solutions", trade: "Bricklaying", invoice: "£28,800", cis: "£5,760", net: "£23,040", status: "paid" },
];

const DOCS = [
  { name: "Kirkstall Rd — Planning Approval", type: "Planning", version: "v1.0", date: "12 Jan 2025", approved: true },
  { name: "Chapel Allerton — Structural Calc", type: "Engineering", version: "v2.3", date: "08 Mar 2025", approved: true },
  { name: "Headingley — Building Regs Notice", type: "Compliance", version: "v1.1", date: "15 Apr 2025", approved: false },
  { name: "Kirkstall Rd — Foundation Drawing", type: "Drawing", version: "v4.1", date: "28 May 2025", approved: true },
  { name: "Roundhay — EPC Certificate", type: "Certificate", version: "v1.0", date: "30 May 2025", approved: true },
];

const STATUS_COLOR: Record<string, string> = {
  "on-track": "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400",
  overrun: "text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400",
  paid: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20",
  pending: "text-amber-600 bg-amber-50 dark:bg-amber-900/20",
  overdue: "text-red-600 bg-red-50 dark:bg-red-900/20",
};

export function BuildTrackDemo({ lang }: { lang: string }) {
  const [section, setSection] = useState<"projects" | "cis" | "docs" | "milestones">("projects");
  const isUk = lang === "uk";

  return (
    <div className="min-h-screen bg-amber-50 dark:bg-stone-950 font-sans">
      {/* Rugged construction header */}
      <header className="bg-amber-500 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🏗️</span>
            <div>
              <div className="font-black text-white text-xl tracking-tight uppercase">BuildTrack</div>
              <div className="text-amber-100 text-xs font-medium">Construction ERP · Leeds, UK</div>
            </div>
          </div>
          <div className="flex gap-6 text-center text-white">
            <div><div className="font-black text-xl">4</div><div className="text-xs text-amber-100">{isUk ? "Проєкти" : "Projects"}</div></div>
            <div><div className="font-black text-xl">12</div><div className="text-xs text-amber-100">{isUk ? "Субпідряди" : "Subcons"}</div></div>
            <div><div className="font-black text-xl">£3.1M</div><div className="text-xs text-amber-100">{isUk ? "Бюджет" : "Total budget"}</div></div>
          </div>
        </div>
      </header>

      {/* Section switcher — pill style */}
      <div className="bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-700 px-6 py-3 flex gap-2 flex-wrap">
        {([
          { id: "projects", label: isUk ? "📋 Проєкти" : "📋 Projects" },
          { id: "cis", label: isUk ? "🧾 CIS Платежі" : "🧾 CIS Payments" },
          { id: "docs", label: isUk ? "📁 Документи" : "📁 Documents" },
          { id: "milestones", label: isUk ? "🎯 Майлстоуни" : "🎯 Milestones" },
        ] as const).map(s => (
          <button
            key={s.id}
            onClick={() => setSection(s.id)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              section === s.id
                ? "bg-amber-500 text-white"
                : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-amber-100 dark:hover:bg-amber-900/30"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <main className="p-6 max-w-5xl mx-auto">

        {/* PROJECTS */}
        {section === "projects" && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-stone-900 dark:text-white uppercase tracking-wide">
              {isUk ? "Активні проєкти" : "Active projects"}
            </h2>
            {PROJECTS.map(p => {
              const pct = (p.spent / p.budget) * 100;
              const overBudget = pct > 95;
              return (
                <div key={p.id} className={`bg-white dark:bg-stone-800 rounded-2xl border-2 p-5 ${overBudget ? "border-red-300 dark:border-red-700" : "border-stone-100 dark:border-stone-700"}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-stone-400 dark:text-stone-500">{p.id}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${STATUS_COLOR[p.status]}`}>
                          {p.status === "on-track" ? (isUk ? "В графіку" : "On track") : (isUk ? "Перевищення" : "Overrun")}
                        </span>
                      </div>
                      <div className="font-bold text-stone-900 dark:text-white mt-1">{p.name}</div>
                      <div className="text-sm text-stone-500 dark:text-stone-400">{p.phase} · PM: {p.pm} · Due: {p.due}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-stone-900 dark:text-white">£{p.spent.toLocaleString()}</div>
                      <div className="text-xs text-stone-400 dark:text-stone-500">of £{p.budget.toLocaleString()}</div>
                    </div>
                  </div>
                  {/* Progress bars */}
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs text-stone-500 dark:text-stone-400 mb-1">
                        <span>{isUk ? "Завершення" : "Completion"}</span>
                        <span className="font-bold text-stone-900 dark:text-white">{p.progress}%</span>
                      </div>
                      <div className="h-3 bg-stone-100 dark:bg-stone-700 rounded-full overflow-hidden">
                        <div className="h-3 bg-amber-500 rounded-full" style={{ width: `${p.progress}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-stone-500 dark:text-stone-400 mb-1">
                        <span>{isUk ? "Бюджет витрачено" : "Budget used"}</span>
                        <span className={`font-bold ${overBudget ? "text-red-500" : "text-stone-900 dark:text-white"}`}>{pct.toFixed(1)}%</span>
                      </div>
                      <div className="h-3 bg-stone-100 dark:bg-stone-700 rounded-full overflow-hidden">
                        <div className={`h-3 rounded-full ${overBudget ? "bg-red-400" : "bg-emerald-500"}`} style={{ width: `${Math.min(100, pct)}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* CIS */}
        {section === "cis" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-stone-900 dark:text-white uppercase tracking-wide">
                {isUk ? "CIS Утримання — поточний місяць" : "CIS Deductions — current month"}
              </h2>
              <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-sm font-bold px-4 py-2 rounded-xl">
                {isUk ? "До сплати HMRC:" : "HMRC due:"} £22,600
              </div>
            </div>
            <div className="bg-white dark:bg-stone-800 rounded-2xl border border-stone-100 dark:border-stone-700 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-stone-50 dark:bg-stone-700/50">
                  <tr>
                    {[isUk ? "Субпідрядник" : "Subcontractor", isUk ? "Вид робіт" : "Trade", isUk ? "Рахунок" : "Invoice", "CIS (20%)", isUk ? "Виплата" : "Net pay", isUk ? "Статус" : "Status"].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SUBCONTRACTORS.map(s => (
                    <tr key={s.name} className="border-t border-stone-50 dark:border-stone-700/50 hover:bg-amber-50/50 dark:hover:bg-amber-900/10">
                      <td className="px-4 py-3 font-semibold text-stone-900 dark:text-white">{s.name}</td>
                      <td className="px-4 py-3 text-stone-500 dark:text-stone-400">{s.trade}</td>
                      <td className="px-4 py-3 font-medium text-stone-700 dark:text-stone-300">{s.invoice}</td>
                      <td className="px-4 py-3 text-amber-600 font-semibold">{s.cis}</td>
                      <td className="px-4 py-3 font-bold text-stone-900 dark:text-white">{s.net}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${STATUS_COLOR[s.status]}`}>
                          {s.status === "paid" ? (isUk ? "Сплачено" : "Paid") : s.status === "pending" ? (isUk ? "Очікує" : "Pending") : (isUk ? "Прострочено" : "Overdue")}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-4 py-3 bg-amber-50 dark:bg-amber-900/10 text-xs text-stone-500 dark:text-stone-400">
                ⚡ {isUk ? "Авторозрахунок CIS — нуль ручної роботи. Наступний платіж HMRC:" : "CIS auto-calculated — zero manual work. Next HMRC payment:"} <strong className="text-stone-800 dark:text-stone-200">19 Jul 2025</strong>
              </div>
            </div>
          </div>
        )}

        {/* DOCS */}
        {section === "docs" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-stone-900 dark:text-white uppercase tracking-wide">
                {isUk ? "Сховище документів" : "Document Vault"}
              </h2>
              <button className="bg-amber-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors">
                📤 {isUk ? "Завантажити" : "Upload"}
              </button>
            </div>
            <div className="space-y-2">
              {DOCS.map(d => (
                <div key={d.name} className={`bg-white dark:bg-stone-800 rounded-xl border p-4 flex items-center justify-between ${d.approved ? "border-stone-100 dark:border-stone-700" : "border-amber-200 dark:border-amber-800/50"}`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${
                      d.type === "Planning" ? "bg-blue-100 dark:bg-blue-900/30" :
                      d.type === "Engineering" ? "bg-purple-100 dark:bg-purple-900/30" :
                      d.type === "Compliance" ? "bg-amber-100 dark:bg-amber-900/30" :
                      d.type === "Drawing" ? "bg-emerald-100 dark:bg-emerald-900/30" : "bg-stone-100 dark:bg-stone-700"
                    }`}>
                      {d.type === "Drawing" ? "📐" : d.type === "Certificate" ? "🏆" : d.type === "Compliance" ? "⚖️" : "📄"}
                    </div>
                    <div>
                      <div className="font-semibold text-stone-900 dark:text-white text-sm">{d.name}</div>
                      <div className="text-xs text-stone-400 dark:text-stone-500 mt-0.5">{d.type} · {d.version} · {d.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {d.approved
                      ? <span className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-2 py-1 rounded-lg font-medium">✓ {isUk ? "Затверджено" : "Approved"}</span>
                      : <span className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 px-2 py-1 rounded-lg font-medium">⏳ {isUk ? "На затвердженні" : "Pending"}</span>
                    }
                    <button className="text-xs text-stone-400 dark:text-stone-500 hover:text-amber-500 transition-colors">⬇</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MILESTONES */}
        {section === "milestones" && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-stone-900 dark:text-white uppercase tracking-wide">
              {isUk ? "Майлстоуни та білінг" : "Milestones & Billing"} · Kirkstall Road
            </h2>
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-stone-200 dark:bg-stone-700" />
              {[
                { label: isUk ? "Підписання контракту" : "Contract signed", amount: "£62,000", date: "10 Jan 2025", done: true, paid: true },
                { label: isUk ? "Фундамент завершено" : "Foundation complete", amount: "£186,000", date: "28 Feb 2025", done: true, paid: true },
                { label: isUk ? "Суперструктура" : "Superstructure", amount: "£248,000", date: "15 May 2025", done: false, paid: false },
                { label: isUk ? "Перекриття + покрівля" : "Roof & slab", amount: "£186,000", date: "01 Aug 2025", done: false, paid: false },
                { label: isUk ? "Оздоблення та фасад" : "Fit-out & façade", amount: "£310,000", date: "15 Nov 2025", done: false, paid: false },
                { label: isUk ? "Здача замовнику" : "Practical completion", amount: "£248,000", date: "01 Mar 2026", done: false, paid: false },
              ].map((m, i) => (
                <div key={i} className="relative flex items-start gap-4 mb-5 pl-14">
                  <div className={`absolute left-3.5 -translate-x-1/2 w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs ${
                    m.done ? "bg-amber-500 border-amber-500 text-white" : "bg-white dark:bg-stone-800 border-stone-300 dark:border-stone-600"
                  }`}>
                    {m.done ? "✓" : ""}
                  </div>
                  <div className={`flex-1 bg-white dark:bg-stone-800 rounded-xl border p-4 flex items-center justify-between ${m.done ? "border-amber-200 dark:border-amber-800/50" : "border-stone-100 dark:border-stone-700 opacity-75"}`}>
                    <div>
                      <div className="font-semibold text-stone-900 dark:text-white">{m.label}</div>
                      <div className="text-xs text-stone-400 dark:text-stone-500 mt-0.5">{m.date}</div>
                    </div>
                    <div className="text-right flex items-center gap-3">
                      <span className="font-bold text-stone-900 dark:text-white">{m.amount}</span>
                      {m.paid
                        ? <span className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-2 py-1 rounded-lg">✓ {isUk ? "Сплачено" : "Paid"}</span>
                        : m.done
                        ? <button className="text-xs bg-amber-500 text-white px-2 py-1 rounded-lg hover:bg-amber-600 transition-colors">{isUk ? "Виставити рахунок" : "Invoice client"}</button>
                        : <span className="text-xs text-stone-300 dark:text-stone-600">{isUk ? "Очікується" : "Upcoming"}</span>
                      }
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
