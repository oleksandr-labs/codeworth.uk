"use client";
import { useState } from "react";

const CONTRACT_LINES = [
  "SERVICE AGREEMENT",
  "",
  'This Service Agreement ("Agreement") is entered into as of 1 March 2025 between',
  'Axiom Legal Partners LLP ("Client") and TechForge Solutions Ltd ("Service Provider").',
  "",
  "1. SERVICES",
  "Service Provider agrees to deliver custom software development services as detailed",
  "in Schedule A. All deliverables shall be completed within agreed timelines.",
  "",
  "2. PAYMENT TERMS",
  "Client shall pay £45,000 per month, due within 30 days of invoice. Late payments",
  "shall incur interest at 8% per annum above Bank of England base rate.",
  "",
  "3. INTELLECTUAL PROPERTY",
  "All intellectual property created under this Agreement shall vest exclusively in the",
  "Service Provider unless expressly transferred in writing. Client receives a",
  "non-exclusive, non-transferable licence only.",
  "",
  "4. LIMITATION OF LIABILITY",
  "Service Provider's aggregate liability shall not exceed £5,000 regardless of the",
  "nature of the claim. This cap applies to all claims including negligence, breach of",
  "contract and statutory duty.",
  "",
  "5. TERMINATION",
  "Either party may terminate this Agreement with 180 days written notice. Upon",
  "termination, all outstanding work shall be invoiced at full contract rate.",
  "",
  "6. GOVERNING LAW",
  "This Agreement shall be governed by the laws of England and Wales.",
];

const CLAUSES = [
  { id: 1, clause: 4, title: "Limitation of Liability", risk: "high"   as const, excerpt: "Cap £5,000 — extremely low for a £45k/month contract.",         rec: "Negotiate cap to min 3× monthly fee (£135,000) — standard commercial practice." },
  { id: 2, clause: 3, title: "Intellectual Property",   risk: "high"   as const, excerpt: "All IP vests in Service Provider. Client gets licence only.",    rec: "Insist on full IP assignment for bespoke software — this is non-negotiable." },
  { id: 3, clause: 5, title: "Termination Notice",      risk: "medium" as const, excerpt: "180-day notice period — unusually long for software services.",  rec: "Industry standard is 30–90 days. Request amendment before signing." },
  { id: 4, clause: 2, title: "Late Payment Interest",   risk: "low"    as const, excerpt: "8% above BoE base rate — aligns with Late Payment Act.",         rec: "Acceptable. Verify invoice trigger date is clearly defined in Schedule A." },
  { id: 5, clause: 2, title: "Payment Terms",           risk: "low"    as const, excerpt: "30-day payment cycle — standard commercial terms.",              rec: "OK. Ensure change-request pricing mechanism is documented." },
  { id: 6, clause: 6, title: "Governing Law",           risk: "low"    as const, excerpt: "England and Wales — appropriate for both parties.",              rec: "Confirm dispute resolution (arbitration vs litigation). Add ADR clause." },
];

const RISK_CFG = {
  high:   { badge: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",     dot: "bg-red-500",     label: "High Risk"   },
  medium: { badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400", dot: "bg-amber-500", label: "Medium Risk" },
  low:    { badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400", dot: "bg-emerald-500", label: "Low Risk" },
};

const RISK_SCORE = 42;

export function DocSenseDemo({ lang }: { lang: string }) {
  const [selected, setSelected] = useState<typeof CLAUSES[0]>(CLAUSES[0]);
  const [resolved, setResolved] = useState<Set<number>>(new Set());
  const isUk = lang === "uk";

  const highlightLine = (line: string) => {
    if (!selected) return false;
    const n = selected.clause;
    if (n === 2 && (line.startsWith("2.") || line.includes("£45,000") || line.includes("8%"))) return true;
    if (n === 3 && (line.startsWith("3.") || line.includes("intellectual property") || line.includes("non-exclusive"))) return true;
    if (n === 4 && (line.startsWith("4.") || line.includes("£5,000") || line.includes("aggregate liability"))) return true;
    if (n === 5 && (line.startsWith("5.") || line.includes("180 days") || line.includes("outstanding work"))) return true;
    if (n === 6 && (line.startsWith("6.") || line.includes("England and Wales"))) return true;
    return false;
  };

  const highCount   = CLAUSES.filter(c => c.risk === "high"   && !resolved.has(c.id)).length;
  const medCount    = CLAUSES.filter(c => c.risk === "medium"  && !resolved.has(c.id)).length;
  const lowCount    = CLAUSES.filter(c => c.risk === "low"    && !resolved.has(c.id)).length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 font-sans text-neutral-900 dark:text-white">

      {/* ── HEADER ── */}
      <header className="h-14 bg-white dark:bg-neutral-900 border-b border-slate-200 dark:border-neutral-800 flex items-center px-5 gap-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-sky-700 flex items-center justify-center text-white text-[11px] font-black">DS</div>
          <span className="font-black text-lg tracking-tight">DocSense</span>
          <span className="text-sky-500 text-xs font-semibold">Document Intelligence</span>
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
          <span className="hidden sm:inline">service-agreement-draft.pdf · 2 pages · Axiom Legal Partners</span>
          <span className="px-2.5 py-1 rounded-full bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-400 font-semibold">
            {isUk ? "Аналіз завершено" : "Analysis complete"} ✓
          </span>
        </div>
      </header>

      {/* ── BODY ── */}
      <div className="max-w-7xl mx-auto p-5 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5 min-h-[calc(100vh-3.5rem)]">

        {/* DOCUMENT */}
        <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-slate-200 dark:border-neutral-800 overflow-hidden flex flex-col">
          <div className="px-5 py-3.5 border-b border-slate-100 dark:border-neutral-800 flex items-center gap-3 shrink-0">
            <span className="text-xl">📄</span>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm text-neutral-900 dark:text-white">service-agreement-draft.pdf</div>
              <div className="text-xs text-neutral-400 dark:text-neutral-500">
                {isUk ? "Завантажено 2 хв тому · Проаналізовано за 18 хв" : "Uploaded 2 min ago · Analysed in 18 min"}
              </div>
            </div>
            <div className={`px-3 py-1.5 rounded-xl text-sm font-bold shrink-0 ${RISK_SCORE >= 60 ? "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"}`}>
              {isUk ? "Ризик:" : "Risk:"} {RISK_SCORE}/100
            </div>
          </div>

          <div className="p-6 overflow-y-auto flex-1" style={{ maxHeight: "calc(100vh - 280px)" }}>
            <div className="font-mono text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {CONTRACT_LINES.map((line, i) => (
                <div
                  key={i}
                  className={`${
                    line.match(/^\d+\./) ? "font-bold text-neutral-800 dark:text-neutral-200 mt-4 mb-1" :
                    line === "SERVICE AGREEMENT" ? "font-black text-base text-neutral-900 dark:text-white mb-2 text-center" :
                    ""
                  } ${
                    highlightLine(line)
                      ? "bg-amber-100 dark:bg-amber-900/20 -mx-6 px-6 rounded border-l-4 border-amber-400"
                      : ""
                  }`}
                >
                  {line || " "}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ANALYSIS PANEL */}
        <div className="space-y-4 overflow-y-auto" style={{ maxHeight: "calc(100vh - 100px)" }}>

          {/* Risk summary */}
          <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-slate-200 dark:border-neutral-800 p-5">
            <div className="text-xs text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-3">{isUk ? "Загальний ризик" : "Overall Risk Score"}</div>
            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-16 h-16 shrink-0">
                <svg viewBox="0 0 36 36" className="w-16 h-16 -rotate-90">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#fee2e2" strokeWidth="3.2" className="dark:stroke-red-950" />
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f59e0b" strokeWidth="3.2"
                    strokeDasharray={`${RISK_SCORE} ${100 - RISK_SCORE}`} />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-black text-amber-500">{RISK_SCORE}</span>
                </div>
              </div>
              <div>
                <div className="font-bold text-amber-600 dark:text-amber-400 text-base">{isUk ? "Середній ризик" : "Medium Risk"}</div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  {isUk ? "2 пункти потребують уваги" : "2 clauses need immediate attention"}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              {[
                { label: isUk ? "Критично" : "Critical", count: highCount, color: "text-red-500" },
                { label: isUk ? "Середній" : "Medium",   count: medCount,  color: "text-amber-500" },
                { label: isUk ? "Низький"  : "Low",      count: lowCount,  color: "text-emerald-500" },
              ].map(s => (
                <div key={s.label}>
                  <div className={`text-2xl font-black ${s.color}`}>{s.count}</div>
                  <div className="text-[10px] text-neutral-400 dark:text-neutral-500 uppercase tracking-wide mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Clause list */}
          <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-slate-200 dark:border-neutral-800 overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-100 dark:border-neutral-800 text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wide">
              {isUk ? "Аналіз по пунктах" : "Clause Analysis"}
            </div>
            <div className="divide-y divide-slate-50 dark:divide-neutral-800">
              {CLAUSES.map(c => {
                const cfg = RISK_CFG[c.risk];
                const isRes = resolved.has(c.id);
                return (
                  <button
                    key={c.id}
                    onClick={() => !isRes && setSelected(c)}
                    className={`w-full text-left px-5 py-4 transition-colors ${
                      isRes ? "opacity-40 cursor-default" :
                      selected?.id === c.id ? "bg-sky-50 dark:bg-sky-900/10" :
                      "hover:bg-slate-50 dark:hover:bg-neutral-800/50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${cfg.dot}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="font-semibold text-sm text-neutral-900 dark:text-white">{c.title}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${cfg.badge}`}>{cfg.label}</span>
                          {isRes && <span className="text-[10px] text-emerald-500 font-bold">✓ {isUk ? "Вирішено" : "Resolved"}</span>}
                        </div>
                        <div className="text-xs text-neutral-400 dark:text-neutral-500 line-clamp-2">{c.excerpt}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected clause detail */}
          {selected && !resolved.has(selected.id) && (
            <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-slate-200 dark:border-neutral-800 p-5">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${RISK_CFG[selected.risk].badge}`}>
                  {RISK_CFG[selected.risk].label}
                </span>
                <span className="font-bold text-neutral-900 dark:text-white">{selected.title}</span>
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400 mb-3 leading-relaxed">
                <span className="font-semibold text-neutral-700 dark:text-neutral-300">
                  {isUk ? "Виявлено: " : "Finding: "}
                </span>
                {selected.excerpt}
              </div>
              <div className="bg-sky-50 dark:bg-sky-900/10 border border-sky-100 dark:border-sky-900/30 rounded-xl p-3 text-sm text-sky-800 dark:text-sky-300 mb-3">
                <span className="font-semibold">{isUk ? "Рекомендація: " : "Recommendation: "}</span>{selected.rec}
              </div>
              <button
                onClick={() => setResolved(prev => new Set([...prev, selected.id]))}
                className="w-full py-2 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors"
              >
                ✓ {isUk ? "Позначити як вирішено" : "Mark as Resolved"}
              </button>
            </div>
          )}

          {/* AI model info */}
          <div className="bg-slate-100 dark:bg-neutral-900 rounded-2xl border border-slate-200 dark:border-neutral-800 p-4">
            <div className="text-[10px] font-bold uppercase text-neutral-400 dark:text-neutral-500 tracking-wide mb-2">
              {isUk ? "Технологічний стек" : "AI Stack"}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {["GPT-4o", "LangChain", "FastAPI", "PostgreSQL", "Redis", "Next.js"].map(t => (
                <span key={t} className="px-2 py-0.5 rounded-md text-[10px] bg-white dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400 font-medium">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
