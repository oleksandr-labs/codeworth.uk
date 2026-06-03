"use client";
import { useState } from "react";

const JOB = {
  title:  "Senior React Developer",
  company:"FinoTech Solutions",
  location:"London, UK (Hybrid)",
  salary: "£65,000 – £80,000",
  must:  ["React 5+ years", "TypeScript", "REST APIs", "Agile/Scrum"],
  nice:  ["Next.js", "GraphQL", "AWS", "Jest / Cypress"],
};

const CANDIDATES = [
  { id: 1, name: "James Whitfield", role: "Senior Frontend Dev",  exp: 7, score: 94, status: "strong" as const,  matches: ["React 7y", "TypeScript", "REST APIs", "Next.js", "Agile"], flags: [],                            location: "London"              },
  { id: 2, name: "Priya Sharma",    role: "Full-Stack Engineer",  exp: 5, score: 88, status: "strong" as const,  matches: ["React 5y", "TypeScript", "REST APIs", "Agile"],             flags: ["GraphQL missing"],           location: "Manchester (remote)" },
  { id: 3, name: "Aisha Oyelaran",  role: "Frontend Lead",        exp: 8, score: 85, status: "strong" as const,  matches: ["React 8y", "TypeScript", "Agile", "AWS"],                   flags: ["REST APIs limited"],         location: "Bristol (hybrid)"    },
  { id: 4, name: "Mei-Lin Zhang",   role: "Frontend Architect",   exp: 9, score: 91, status: "strong" as const,  matches: ["React 9y", "TypeScript", "Next.js", "GraphQL", "Agile"],    flags: ["Over-experienced?"],         location: "Edinburgh (remote)"  },
  { id: 5, name: "Tom Kaczmarek",   role: "React Developer",      exp: 4, score: 71, status: "good"   as const,  matches: ["React 4y", "REST APIs", "Agile"],                            flags: ["TypeScript < 1y", "No AWS"], location: "Warsaw (relocation?)" },
  { id: 6, name: "Chris Donnelly",  role: "JavaScript Engineer",  exp: 3, score: 52, status: "weak"   as const,  matches: ["React 3y"],                                                 flags: ["No TypeScript", "No Agile", "Below threshold"], location: "Glasgow" },
];

const STATUS_CFG = {
  strong: { badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400", label: { en: "Strong fit",   uk: "Відмінний" } },
  good:   { badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",         label: { en: "Good fit",    uk: "Підходить" } },
  weak:   { badge: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",                 label: { en: "Weak fit",    uk: "Слабкий"   } },
};

function scoreBg(s: number) {
  if (s >= 85) return "bg-emerald-500";
  if (s >= 70) return "bg-amber-500";
  return "bg-red-400";
}

export function TalentScanDemo({ lang }: { lang: string }) {
  const [selected, setSelected] = useState<typeof CANDIDATES[0]>(CANDIDATES[3]);
  const [shortlisted, setShortlisted] = useState<Set<number>>(new Set([1, 4]));
  const [rejected,    setRejected]    = useState<Set<number>>(new Set([6]));
  const isUk = lang === "uk";
  const L = isUk ? "uk" : "en";

  const shortlist = (id: number) => {
    setShortlisted(p => new Set([...p, id]));
    setRejected(p => { const n = new Set(p); n.delete(id); return n; });
  };
  const reject = (id: number) => {
    setRejected(p => new Set([...p, id]));
    setShortlisted(p => { const n = new Set(p); n.delete(id); return n; });
  };

  const ranked = [...CANDIDATES].sort((a, b) => b.score - a.score);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 font-sans text-neutral-900 dark:text-white">

      {/* ── HEADER ── */}
      <header className="h-14 bg-white dark:bg-neutral-900 border-b border-slate-200 dark:border-neutral-800 flex items-center px-5 gap-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center text-white text-[11px] font-black">TS</div>
          <span className="font-black text-lg tracking-tight">TalentScan</span>
          <span className="text-violet-400 text-xs font-semibold">AI Screening</span>
        </div>
        <div className="flex-1" />
        <div className="hidden sm:flex items-center gap-6 text-xs">
          {[
            { label: isUk ? "Кандидатів"  : "Screened",    value: CANDIDATES.length,           color: "text-neutral-700 dark:text-neutral-200" },
            { label: isUk ? "Шортліст"    : "Shortlisted",  value: shortlisted.size,             color: "text-emerald-600" },
            { label: isUk ? "Strong fit"  : "Strong fit",   value: CANDIDATES.filter(c => c.status === "strong").length, color: "text-violet-600" },
            { label: isUk ? "AI час"      : "AI time",      value: "38s",                        color: "text-amber-600"  },
          ].map(s => (
            <div key={s.label} className="text-center">
              <div className={`text-xl font-black leading-none ${s.color}`}>{s.value}</div>
              <div className="text-[10px] text-neutral-400 uppercase tracking-wide mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </header>

      {/* ── BODY ── */}
      <div className="max-w-7xl mx-auto p-5 grid grid-cols-1 lg:grid-cols-[280px_1fr_300px] gap-5">

        {/* JOB SPEC */}
        <aside className="bg-white dark:bg-neutral-900 rounded-2xl border border-slate-200 dark:border-neutral-800 p-5 h-fit">
          <div className="text-[10px] text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-3">{isUk ? "Активна вакансія" : "Active Job"}</div>
          <div className="font-black text-base leading-tight mb-1">{JOB.title}</div>
          <div className="text-sm text-neutral-500 dark:text-neutral-400">{JOB.company}</div>
          <div className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5 mb-1">{JOB.location}</div>
          <div className="text-sm font-bold text-violet-600 dark:text-violet-400 mb-4">{JOB.salary}</div>

          <div className="mb-3">
            <div className="text-[10px] font-bold uppercase text-neutral-400 tracking-wide mb-2">{isUk ? "Обов'язкові" : "Must Have"}</div>
            <div className="flex flex-wrap gap-1.5">
              {JOB.must.map(s => (
                <span key={s} className="px-2 py-0.5 rounded-md text-xs bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-400 font-medium">{s}</span>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase text-neutral-400 tracking-wide mb-2">{isUk ? "Бажані" : "Nice to Have"}</div>
            <div className="flex flex-wrap gap-1.5">
              {JOB.nice.map(s => (
                <span key={s} className="px-2 py-0.5 rounded-md text-xs bg-slate-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">{s}</span>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-neutral-800 space-y-1 text-xs text-neutral-400 dark:text-neutral-500">
            <div>📥 {CANDIDATES.length} {isUk ? "заявок отримано" : "applications received"}</div>
            <div>⚡ {isUk ? "AI обробив за 38 сек" : "AI screened in 38 seconds"}</div>
            <div>📊 {isUk ? "Модель: spaCy + GPT-4o" : "Model: spaCy + GPT-4o"}</div>
          </div>
        </aside>

        {/* CANDIDATE LIST */}
        <main className="space-y-3">
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-bold text-neutral-900 dark:text-white">{isUk ? "Кандидати — рейтинг AI" : "Candidates — AI Ranked"}</h2>
            <span className="text-xs text-neutral-400">{isUk ? "Клікніть для деталей" : "Click for details"}</span>
          </div>

          {ranked.map(c => {
            const isShortlisted = shortlisted.has(c.id);
            const isRejected    = rejected.has(c.id);
            const cfg           = STATUS_CFG[c.status];
            return (
              <button
                key={c.id}
                onClick={() => setSelected(c)}
                className={`w-full text-left bg-white dark:bg-neutral-900 rounded-2xl border-2 p-4 transition-all hover:shadow-md ${
                  selected.id === c.id ? "border-violet-400 dark:border-violet-600 shadow-md" :
                  isRejected           ? "border-neutral-100 dark:border-neutral-800 opacity-45" :
                                         "border-slate-100 dark:border-neutral-800"
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Score circle */}
                  <div className={`w-14 h-14 rounded-full ${scoreBg(c.score)} flex items-center justify-center text-white shrink-0`}>
                    <div className="text-center leading-none">
                      <div className="text-xl font-black">{c.score}</div>
                      <div className="text-[9px] opacity-75">/100</div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <span className="font-bold text-neutral-900 dark:text-white">{c.name}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${cfg.badge}`}>{cfg.label[L]}</span>
                      {isShortlisted && <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">✓ {isUk ? "Шортліст" : "Shortlisted"}</span>}
                    </div>
                    <div className="text-sm text-neutral-500 dark:text-neutral-400 truncate">{c.role} · {c.exp}y · {c.location}</div>
                    <div className="flex gap-1 mt-2 flex-wrap">
                      {c.matches.slice(0, 4).map(m => (
                        <span key={m} className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400">✓ {m}</span>
                      ))}
                      {c.flags[0] && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400">⚠ {c.flags[0]}</span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-1.5 shrink-0">
                    {!isShortlisted && !isRejected && (
                      <button
                        onClick={e => { e.stopPropagation(); shortlist(c.id); }}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors whitespace-nowrap"
                      >
                        + {isUk ? "Шортліст" : "Shortlist"}
                      </button>
                    )}
                    {isShortlisted && (
                      <div className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-xs font-semibold text-center">✓</div>
                    )}
                    {!isRejected && (
                      <button
                        onClick={e => { e.stopPropagation(); reject(c.id); }}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-neutral-700 text-neutral-400 text-xs hover:bg-slate-50 dark:hover:bg-neutral-800 transition-colors"
                      >
                        {isUk ? "Відхилити" : "Reject"}
                      </button>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </main>

        {/* CANDIDATE DETAIL */}
        <aside className="bg-white dark:bg-neutral-900 rounded-2xl border border-slate-200 dark:border-neutral-800 p-5 h-fit sticky top-20">
          {/* Score + name */}
          <div className="flex items-start gap-3 mb-5">
            <div className={`w-12 h-12 rounded-xl ${scoreBg(selected.score)} flex items-center justify-center text-white font-black text-xl shrink-0`}>
              {selected.score}
            </div>
            <div>
              <div className="font-bold text-neutral-900 dark:text-white leading-tight">{selected.name}</div>
              <div className="text-sm text-neutral-500 dark:text-neutral-400">{selected.role} · {selected.exp}y</div>
              <div className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5">{selected.location}</div>
            </div>
          </div>

          {/* AI breakdown */}
          <div className="mb-4">
            <div className="text-[10px] font-bold uppercase text-neutral-400 tracking-wide mb-2">
              {isUk ? "AI аналіз відповідності" : "AI Match Breakdown"}
            </div>
            <div className="space-y-2">
              {[
                { label: isUk ? "Технічні навички" : "Tech skills",   pct: Math.min(100, Math.round(selected.matches.length / JOB.must.length * 100 + 10)) },
                { label: isUk ? "Досвід"           : "Experience",     pct: Math.min(100, Math.round(selected.exp / 7 * 100)) },
                { label: isUk ? "Локація"          : "Location",       pct: selected.location.includes("London") ? 100 : selected.location.includes("remote") || selected.location.includes("hybrid") ? 85 : 50 },
              ].map(row => (
                <div key={row.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-neutral-500 dark:text-neutral-400">{row.label}</span>
                    <span className="font-semibold text-neutral-700 dark:text-neutral-300">{row.pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-100 dark:bg-neutral-800 overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${row.pct >= 85 ? "bg-emerald-500" : row.pct >= 65 ? "bg-amber-400" : "bg-red-400"}`} style={{ width: `${row.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Matched skills */}
          <div className="mb-4">
            <div className="text-[10px] font-bold uppercase text-neutral-400 tracking-wide mb-2">{isUk ? "Навички ✓" : "Matched Skills"}</div>
            <div className="flex flex-wrap gap-1.5">
              {selected.matches.map(m => (
                <span key={m} className="px-2 py-0.5 rounded-md text-xs bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 font-medium">✓ {m}</span>
              ))}
            </div>
          </div>

          {/* Red flags */}
          {selected.flags.length > 0 && (
            <div className="mb-4">
              <div className="text-[10px] font-bold uppercase text-red-400 tracking-wide mb-2">⚠ Red Flags</div>
              <div className="space-y-1">
                {selected.flags.map(f => (
                  <div key={f} className="text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/10 px-3 py-1.5 rounded-lg">{f}</div>
                ))}
              </div>
            </div>
          )}

          {/* AI verdict */}
          <div className={`p-3 rounded-xl text-sm font-medium mb-4 ${
            selected.score >= 85 ? "bg-emerald-50 dark:bg-emerald-900/15 text-emerald-800 dark:text-emerald-300" :
            selected.score >= 70 ? "bg-amber-50 dark:bg-amber-900/15 text-amber-800 dark:text-amber-300" :
                                   "bg-red-50 dark:bg-red-900/15 text-red-700 dark:text-red-300"
          }`}>
            {selected.score >= 85
              ? (isUk ? "🎯 Відмінний кандидат — рекомендовано до інтерв'ю" : "🎯 Strong fit — recommend for interview")
              : selected.score >= 70
              ? (isUk ? "✅ Підходить — розглянути після топ-кандидатів" : "✅ Good fit — review after top candidates")
              : (isUk ? "⚠ Не відповідає ключовим вимогам" : "⚠ Doesn't meet key requirements")}
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-2">
            {!shortlisted.has(selected.id) ? (
              <button onClick={() => shortlist(selected.id)} className="w-full py-2.5 rounded-xl bg-violet-600 text-white font-semibold text-sm hover:bg-violet-700 transition-colors">
                + {isUk ? "Додати в шортліст" : "Add to Shortlist"}
              </button>
            ) : (
              <div className="w-full py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 font-semibold text-sm text-center">
                ✓ {isUk ? "У шортлісті" : "In Shortlist"}
              </div>
            )}
            <button className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 text-sm hover:bg-slate-50 dark:hover:bg-neutral-800 transition-colors">
              {isUk ? "Запросити на інтерв'ю" : "Schedule Interview"}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
