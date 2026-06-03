"use client";
import { useState } from "react";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Each project: start month index, length in months, % done
const PROJECTS = [
  { id: "P-041", name: "Kirkstall Road", units: 24, start: 0, len: 14, done: 38, pm: "R. Hughes", budget: 1.24, phase: "Foundation" },
  { id: "P-038", name: "Chapel Allerton", units: 8, start: 2, len: 7, done: 72, pm: "S. Patel", budget: 0.64, phase: "Superstructure" },
  { id: "P-035", name: "Headingley Mews", units: 12, start: 1, len: 6, done: 91, pm: "R. Hughes", budget: 0.82, phase: "Fit-Out" },
  { id: "P-033", name: "Roundhay", units: 6, start: 3, len: 3, done: 98, pm: "T. Walsh", budget: 0.41, phase: "Handover" },
];

const CIS = [
  { name: "Leeds Groundwork", trade: "Groundworks", gross: 18400, status: "paid" },
  { name: "Northern Frames", trade: "Timber Frame", gross: 42000, status: "pending" },
  { name: "Electra UK", trade: "Electrical", gross: 9200, status: "overdue" },
  { name: "PlumbRight Ltd", trade: "Plumbing", gross: 14600, status: "pending" },
];

// Per-project phase detail + linked documents (shown in the Gantt modal)
const PROJECT_DETAIL: Record<string, {
  phases: { en: string; uk: string; done: boolean }[];
  docs: { name: string; type: string; ok: boolean }[];
}> = {
  "P-041": {
    phases: [
      { en: "Site setup & enabling", uk: "Підготовка майданчика", done: true },
      { en: "Foundations & substructure", uk: "Фундамент", done: true },
      { en: "Superstructure", uk: "Суперструктура", done: false },
      { en: "Roof & weathertight", uk: "Покрівля", done: false },
      { en: "Fit-out & handover", uk: "Оздоблення та здача", done: false },
    ],
    docs: [
      { name: "Planning Approval", type: "Planning", ok: true },
      { name: "Foundation Drawing v4.1", type: "Drawing", ok: true },
      { name: "Building Regs Notice", type: "Compliance", ok: false },
    ],
  },
  "P-038": {
    phases: [
      { en: "Foundations", uk: "Фундамент", done: true },
      { en: "Timber frame erection", uk: "Монтаж каркаса", done: true },
      { en: "Roof & cladding", uk: "Покрівля та фасад", done: false },
      { en: "First fix M&E", uk: "Перший фікс інженерки", done: false },
    ],
    docs: [
      { name: "Structural Calc v2.3", type: "Engineering", ok: true },
      { name: "SAP Energy Assessment", type: "Compliance", ok: true },
    ],
  },
};

const DEFAULT_DETAIL = {
  phases: [
    { en: "Mobilisation", uk: "Мобілізація", done: true },
    { en: "Build phase", uk: "Будівництво", done: true },
    { en: "Finishing", uk: "Оздоблення", done: false },
  ],
  docs: [
    { name: "Planning Approval", type: "Planning", ok: true },
    { name: "EPC Certificate", type: "Certificate", ok: true },
  ],
};

export function BuildTrackDemo({ lang }: { lang: string }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const isUk = lang === "uk";
  const colW = 100 / 12;
  const cisTotal = CIS.reduce((s, c) => s + c.gross * 0.2, 0);
  const openProject = PROJECTS.find(p => p.id === openId);
  const openDetail = openId ? (PROJECT_DETAIL[openId] ?? DEFAULT_DETAIL) : null;

  return (
    <div className="min-h-screen bg-[#1c1917] text-stone-100 font-sans">

      {/* ── HERO BANNER ── */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-500 px-8 py-6">
        <div className="flex items-end justify-between max-w-6xl mx-auto">
          <div>
            <div className="text-amber-900/70 text-xs font-bold uppercase tracking-[0.2em]">Construction ERP</div>
            <h1 className="text-4xl font-black text-white tracking-tight">BuildTrack<span className="text-amber-900/50 text-lg ml-2">/ Leeds</span></h1>
          </div>
          <div className="flex gap-8 text-white">
            {[
              { v: "4", l: isUk ? "проєкти" : "live projects" },
              { v: "£3.1M", l: isUk ? "портфель" : "portfolio value" },
              { v: "12", l: isUk ? "субпідряди" : "subcontractors" },
              { v: "£22.6k", l: isUk ? "CIS до HMRC" : "CIS due HMRC" },
            ].map(s => (
              <div key={s.l} className="text-right">
                <div className="text-2xl font-black">{s.v}</div>
                <div className="text-[10px] text-amber-100 uppercase tracking-wide">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-8 space-y-10">

        {/* ── SECTION: GANTT TIMELINE ── */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-6 bg-amber-500 rounded-full" />
            <h2 className="font-black text-lg uppercase tracking-wide">{isUk ? "Програма робіт 2025" : "2025 Build Programme"}</h2>
          </div>

          {/* Month grid header */}
          <div className="flex border-b border-stone-700 pb-2 mb-1 pl-44">
            {MONTHS.map((m, i) => (
              <div key={m} className={`text-[10px] text-center flex-1 font-mono ${i === 5 ? "text-amber-400 font-bold" : "text-stone-500"}`}>{m}</div>
            ))}
          </div>

          {/* Gantt rows */}
          <div className="space-y-2 relative">
            {/* "today" line at June */}
            <div className="absolute top-0 bottom-0 w-px bg-amber-500/40 z-10" style={{ left: `calc(11rem + ${5.5 * colW}%)` }}>
              <div className="absolute -top-1 -translate-x-1/2 w-2 h-2 bg-amber-500 rounded-full" />
            </div>

            {PROJECTS.map(p => (
              <div
                key={p.id}
                className="flex items-center group"
                onMouseEnter={() => setHovered(p.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="w-44 pr-4 shrink-0">
                  <div className="text-sm font-bold text-stone-100">{p.name}</div>
                  <div className="text-[10px] text-stone-500">{p.units} units · {p.pm}</div>
                </div>
                <div className="flex-1 relative h-9">
                  <button
                    onClick={() => setOpenId(p.id)}
                    className="absolute h-9 rounded-md bg-stone-800 border border-stone-700 hover:border-amber-500 overflow-hidden flex items-center transition-colors cursor-pointer"
                    style={{ left: `${p.start * colW}%`, width: `${p.len * colW}%` }}
                  >
                    {/* progress fill */}
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-600 to-amber-500 transition-all"
                      style={{ width: `${p.done}%` }}
                    />
                    <span className="relative z-10 text-[10px] font-bold px-2 text-white whitespace-nowrap">
                      {p.phase} · {p.done}%
                    </span>
                  </button>
                  {hovered === p.id && (
                    <div className="absolute -top-8 left-0 bg-stone-950 border border-amber-500/40 rounded-lg px-3 py-1 text-[10px] z-20 whitespace-nowrap" style={{ left: `${p.start * colW}%` }}>
                      £{p.budget}M · {isUk ? "завершення" : "due"} {MONTHS[Math.min(11, p.start + p.len - 1)]}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION: TWO COLUMNS — CIS + cost ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* CIS subcontractor payments */}
          <section>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-6 bg-amber-500 rounded-full" />
              <h2 className="font-black text-lg uppercase tracking-wide">{isUk ? "CIS Виплати" : "CIS Payments"}</h2>
            </div>
            <div className="space-y-2">
              {CIS.map(c => {
                const cis = c.gross * 0.2;
                const net = c.gross - cis;
                return (
                  <div key={c.name} className="bg-stone-900 rounded-lg border border-stone-800 p-3.5 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm">{c.name}</div>
                      <div className="text-[10px] text-stone-500">{c.trade}</div>
                    </div>
                    <div className="flex items-center gap-4 text-right">
                      <div>
                        <div className="text-[9px] text-stone-600 uppercase">Gross</div>
                        <div className="text-xs text-stone-300">£{c.gross.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-[9px] text-amber-600 uppercase">CIS 20%</div>
                        <div className="text-xs text-amber-400 font-bold">−£{cis.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-[9px] text-stone-600 uppercase">Net</div>
                        <div className="text-sm font-black">£{net.toLocaleString()}</div>
                      </div>
                      <span className={`text-[9px] px-2 py-1 rounded font-bold uppercase ${
                        c.status === "paid" ? "bg-emerald-500/15 text-emerald-400" :
                        c.status === "pending" ? "bg-amber-500/15 text-amber-400" :
                        "bg-red-500/15 text-red-400"
                      }`}>{c.status}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 bg-amber-500/10 border border-amber-500/30 rounded-lg px-4 py-2.5 flex justify-between text-sm">
              <span className="text-amber-200">{isUk ? "Сума CIS до HMRC (19 Jul):" : "Total CIS due HMRC (19 Jul):"}</span>
              <span className="font-black text-amber-400">£{cisTotal.toLocaleString()}</span>
            </div>
          </section>

          {/* Cost breakdown bars */}
          <section>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-6 bg-amber-500 rounded-full" />
              <h2 className="font-black text-lg uppercase tracking-wide">{isUk ? "Бюджет — Kirkstall Rd" : "Cost — Kirkstall Rd"}</h2>
            </div>
            <div className="bg-stone-900 rounded-xl border border-stone-800 p-5 space-y-4">
              {[
                { l: isUk ? "Земляні роботи" : "Groundworks", spent: 142, total: 160 },
                { l: isUk ? "Каркас" : "Frame & structure", spent: 218, total: 340 },
                { l: isUk ? "Покрівля" : "Roofing", spent: 0, total: 120 },
                { l: isUk ? "Інженерні мережі" : "M&E services", spent: 84, total: 280 },
                { l: isUk ? "Оздоблення" : "Fit-out", spent: 27, total: 340 },
              ].map(c => {
                const pct = Math.round((c.spent / c.total) * 100);
                return (
                  <div key={c.l}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-stone-300">{c.l}</span>
                      <span className="text-stone-500 font-mono">£{c.spent}k / £{c.total}k</span>
                    </div>
                    <div className="h-2.5 bg-stone-800 rounded-full overflow-hidden">
                      <div className="h-2.5 bg-gradient-to-r from-amber-600 to-amber-400 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
              <div className="border-t border-stone-800 pt-3 flex justify-between">
                <span className="text-sm text-stone-400">{isUk ? "Витрачено / Бюджет" : "Spent / Budget"}</span>
                <span className="font-black"><span className="text-amber-400">£471k</span> <span className="text-stone-600">/ £1.24M</span></span>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* ── GANTT PHASE MODAL ── */}
      {openProject && openDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setOpenId(null)}>
          <div className="absolute inset-0 bg-black/60" />
          <div onClick={e => e.stopPropagation()} className="relative bg-[#1c1917] border border-amber-500/30 rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto shadow-2xl">
            {/* Modal header */}
            <div className="bg-gradient-to-r from-amber-600 to-amber-500 px-5 py-4 flex items-start justify-between">
              <div>
                <div className="font-mono text-[10px] text-amber-900/70">{openProject.id}</div>
                <h3 className="font-black text-white text-lg">{openProject.name}</h3>
                <div className="text-amber-100 text-xs">{openProject.units} units · PM {openProject.pm} · £{openProject.budget}M</div>
              </div>
              <button onClick={() => setOpenId(null)} className="w-7 h-7 rounded-lg bg-black/20 text-white hover:bg-black/30 transition-colors">✕</button>
            </div>

            <div className="p-5 space-y-5">
              {/* Overall progress */}
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-stone-400">{isUk ? "Загальне завершення" : "Overall completion"}</span>
                  <span className="font-bold text-amber-400">{openProject.done}%</span>
                </div>
                <div className="h-2.5 bg-stone-800 rounded-full overflow-hidden">
                  <div className="h-2.5 bg-gradient-to-r from-amber-600 to-amber-400 rounded-full" style={{ width: `${openProject.done}%` }} />
                </div>
              </div>

              {/* Phases checklist */}
              <div>
                <div className="text-xs font-black uppercase tracking-wide text-stone-300 mb-2">{isUk ? "Фази робіт" : "Build phases"}</div>
                <div className="space-y-1.5">
                  {openDetail.phases.map((ph, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <div className={`w-4 h-4 rounded flex items-center justify-center text-[9px] ${ph.done ? "bg-amber-500 text-white" : "border border-stone-600"}`}>{ph.done ? "✓" : ""}</div>
                      <span className={`text-sm ${ph.done ? "text-stone-500 line-through" : "text-stone-200"}`}>{isUk ? ph.uk : ph.en}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Document Vault */}
              <div>
                <div className="text-xs font-black uppercase tracking-wide text-stone-300 mb-2">{isUk ? "Документи проєкту" : "Document Vault"}</div>
                <div className="space-y-1.5">
                  {openDetail.docs.map(d => (
                    <div key={d.name} className="flex items-center justify-between bg-stone-900 border border-stone-800 rounded-lg px-3 py-2">
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">{d.type === "Drawing" ? "📐" : d.type === "Certificate" ? "🏆" : d.type === "Compliance" ? "⚖️" : d.type === "Engineering" ? "📊" : "📄"}</span>
                        <div>
                          <div className="text-sm text-stone-100">{d.name}</div>
                          <div className="text-[10px] text-stone-500">{d.type}</div>
                        </div>
                      </div>
                      {d.ok
                        ? <span className="text-[10px] bg-emerald-500/15 text-emerald-400 px-2 py-1 rounded font-bold">✓ {isUk ? "Затв." : "Approved"}</span>
                        : <span className="text-[10px] bg-amber-500/15 text-amber-400 px-2 py-1 rounded font-bold">⏳ {isUk ? "Очікує" : "Pending"}</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
