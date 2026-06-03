"use client";
import { useState } from "react";
import {
  Ruler, Award, Scale, BarChart3, FileText,
  AlertTriangle, CheckCircle2, Clock, TrendingUp,
} from "lucide-react";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const DOC_ICON: Record<string, React.ElementType> = {
  Drawing: Ruler,
  Certificate: Award,
  Compliance: Scale,
  Engineering: BarChart3,
};

const PROJECTS = [
  { id:"P-041", name:"Kirkstall Road",    units:24, start:0,  len:14, done:38, pm:"R. Hughes", budget:1.24, phase:"Foundation"     },
  { id:"P-038", name:"Chapel Allerton",  units:8,  start:2,  len:7,  done:72, pm:"S. Patel",  budget:0.64, phase:"Superstructure" },
  { id:"P-035", name:"Headingley Mews",  units:12, start:1,  len:6,  done:91, pm:"R. Hughes", budget:0.82, phase:"Fit-Out"         },
  { id:"P-033", name:"Roundhay",         units:6,  start:3,  len:3,  done:98, pm:"T. Walsh",  budget:0.41, phase:"Handover"        },
];

const CIS = [
  { name:"Leeds Groundwork",  trade:"Groundworks",   gross:18400, status:"paid"    },
  { name:"Northern Frames",   trade:"Timber Frame",  gross:42000, status:"pending" },
  { name:"Electra UK",        trade:"Electrical",    gross:9200,  status:"overdue" },
  { name:"PlumbRight Ltd",    trade:"Plumbing",      gross:14600, status:"pending" },
  { name:"Shield Roofing",    trade:"Roofing",       gross:22800, status:"paid"    },
  { name:"SteelFix North",    trade:"Structural",    gross:31500, status:"pending" },
];

const MILESTONES = [
  { project:"Kirkstall Road",   stage:"Stage 1 — Foundations Complete",  contract:280000, invoiced:280000, retention:14000, status:"paid",        due:"15 Feb" },
  { project:"Kirkstall Road",   stage:"Stage 2 — Frame & Superstructure", contract:380000, invoiced:0,      retention:0,     status:"upcoming",    due:"12 Aug" },
  { project:"Chapel Allerton", stage:"Practical Completion",              contract:520000, invoiced:520000, retention:26000, status:"outstanding", due:"01 May" },
  { project:"Chapel Allerton", stage:"Defects Liability Release",         contract:26000,  invoiced:0,      retention:0,     status:"upcoming",    due:"01 Nov" },
  { project:"Headingley Mews", stage:"Practical Completion",              contract:740000, invoiced:740000, retention:37000, status:"outstanding", due:"20 May" },
  { project:"Roundhay",        stage:"Final Account Settlement",          contract:410000, invoiced:410000, retention:0,     status:"outstanding", due:"10 Jun" },
];

const VARIATIONS = [
  { id:"VO-014", project:"Chapel Allerton", desc:"Client-instructed window upgrade (15 units)",   value:12400, submitted:"28 Apr", status:"approved" },
  { id:"VO-015", project:"Headingley Mews", desc:"Acoustic separation — additional layer",        value:3100,  submitted:"12 May", status:"approved" },
  { id:"VO-016", project:"Kirkstall Road",  desc:"Additional drainage run — rear gardens",        value:4200,  submitted:"3 May",  status:"approved" },
  { id:"VO-017", project:"Kirkstall Road",  desc:"Upgraded insulation spec (Part L compliance)",  value:8700,  submitted:"14 May", status:"pending"  },
  { id:"VO-018", project:"Headingley Mews", desc:"EV charging points — 8 units",                  value:9600,  submitted:"1 Jun",  status:"pending"  },
  { id:"VO-019", project:"Roundhay",        desc:"Boundary wall extension — client request",       value:2800,  submitted:"28 May", status:"rejected" },
];

const RISKS = [
  { id:"R-04", desc:"Material price inflation (structural timber)",        impact:"high",   likelihood:"medium", owner:"R. Hughes", rag:"amber", mitigation:"Fixed-price frame contract locked to Aug 2025"        },
  { id:"R-07", desc:"Planning condition discharge delay — Kirkstall Rd",   impact:"high",   likelihood:"low",    owner:"T. Walsh",  rag:"green", mitigation:"Pre-app agreed; discharge application submitted 2 Jun" },
  { id:"R-11", desc:"Labour availability — bricklayers (Q3 peak)",         impact:"medium", likelihood:"medium", owner:"S. Patel",  rag:"amber", mitigation:"Secondary subcontractor sourced and priced"            },
  { id:"R-14", desc:"Ground contamination risk — Roundhay site",           impact:"medium", likelihood:"low",    owner:"T. Walsh",  rag:"green", mitigation:"Phase 2 ESA complete; clean certificate received"      },
];

// Billing milestones per project for modal
const PROJECT_BILLING: Record<string, { stage:string; contract:number; status:string; due:string }[]> = {
  "P-041": [
    { stage:"Stage 1 — Foundations",     contract:280000, status:"paid",        due:"15 Feb" },
    { stage:"Stage 2 — Superstructure",  contract:380000, status:"upcoming",    due:"12 Aug" },
    { stage:"Practical Completion",      contract:420000, status:"upcoming",    due:"30 Mar 26" },
    { stage:"Retention Release",         contract:62000,  status:"upcoming",    due:"30 Sep 26" },
  ],
  "P-038": [
    { stage:"Practical Completion",      contract:520000, status:"outstanding", due:"01 May" },
    { stage:"Defects Release",           contract:26000,  status:"upcoming",    due:"01 Nov" },
  ],
  "P-035": [
    { stage:"Practical Completion",      contract:740000, status:"outstanding", due:"20 May" },
    { stage:"Retention Release",         contract:37000,  status:"upcoming",    due:"20 Nov" },
  ],
  "P-033": [
    { stage:"Final Account",             contract:410000, status:"outstanding", due:"10 Jun" },
  ],
};

const PROJECT_DETAIL: Record<string, {
  phases:{en:string;uk:string;done:boolean}[];
  docs:{name:string;type:string;ok:boolean}[];
}> = {
  "P-041": {
    phases:[
      { en:"Site setup & enabling",        uk:"Підготовка майданчика",  done:true  },
      { en:"Foundations & substructure",   uk:"Фундамент",              done:true  },
      { en:"Superstructure",               uk:"Суперструктура",         done:false },
      { en:"Roof & weathertight",          uk:"Покрівля",               done:false },
      { en:"Fit-out & handover",           uk:"Оздоблення та здача",    done:false },
    ],
    docs:[
      { name:"Planning Approval",          type:"Planning",    ok:true  },
      { name:"Foundation Drawing v4.1",    type:"Drawing",     ok:true  },
      { name:"Building Regs Notice",       type:"Compliance",  ok:false },
    ],
  },
  "P-038": {
    phases:[
      { en:"Foundations",                  uk:"Фундамент",              done:true  },
      { en:"Timber frame erection",        uk:"Монтаж каркаса",         done:true  },
      { en:"Roof & cladding",              uk:"Покрівля та фасад",      done:false },
      { en:"First fix M&E",               uk:"Перший фікс інженерки",  done:false },
    ],
    docs:[
      { name:"Structural Calc v2.3",       type:"Engineering", ok:true  },
      { name:"SAP Energy Assessment",      type:"Compliance",  ok:true  },
    ],
  },
};

const DEFAULT_DETAIL = {
  phases:[
    { en:"Mobilisation",  uk:"Мобілізація",   done:true  },
    { en:"Build phase",   uk:"Будівництво",   done:true  },
    { en:"Finishing",     uk:"Оздоблення",    done:false },
  ],
  docs:[
    { name:"Planning Approval", type:"Planning",     ok:true },
    { name:"EPC Certificate",   type:"Certificate",  ok:true },
  ],
};

const RAG_STYLE: Record<string,string> = {
  red:   "bg-red-500/15 text-red-400 border-red-500/30",
  amber: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  green: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
};
const RAG_DOT: Record<string,string> = {
  red:   "bg-red-500",
  amber: "bg-amber-400",
  green: "bg-emerald-400",
};

const STATUS_STYLE = (s:string) =>
  s==="paid"        ? "bg-emerald-500/15 text-emerald-400" :
  s==="outstanding" ? "bg-red-500/15 text-red-400"         :
  s==="pending"     ? "bg-amber-500/15 text-amber-400"     :
  s==="approved"    ? "bg-emerald-500/15 text-emerald-400" :
  s==="rejected"    ? "bg-red-500/15 text-red-400"         :
                      "bg-stone-700/40 text-stone-400";

export function BuildTrackDemo({ lang }: { lang:string }) {
  const [hovered, setHovered]       = useState<string|null>(null);
  const [openId,  setOpenId]        = useState<string|null>(null);
  const [modalTab, setModalTab]     = useState<"progress"|"billing">("progress");
  const isUk  = lang === "uk";
  const colW  = 100 / 12;
  const cisTotal    = CIS.reduce((s,c) => s + c.gross * 0.2, 0);
  const voApproved  = VARIATIONS.filter(v => v.status==="approved").reduce((s,v)=>s+v.value,0);
  const voPending   = VARIATIONS.filter(v => v.status==="pending").reduce((s,v)=>s+v.value,0);
  const openProject = PROJECTS.find(p => p.id===openId);
  const openDetail  = openId ? (PROJECT_DETAIL[openId] ?? DEFAULT_DETAIL) : null;
  const openBilling = openId ? (PROJECT_BILLING[openId] ?? []) : [];

  return (
    <div className="min-h-screen bg-neutral-900 text-stone-100 font-sans">

      {/* ── HERO BANNER ── */}
      <div className="bg-linear-to-r from-amber-600 to-amber-500 px-8 py-6">
        <div className="flex items-end justify-between max-w-6xl mx-auto flex-wrap gap-4">
          <div>
            <div className="text-amber-900/70 text-xs font-bold uppercase tracking-[0.2em]">Construction ERP</div>
            <h1 className="text-4xl font-black text-white tracking-tight">
              BuildTrack<span className="text-amber-900/50 text-lg ml-2">/ Leeds</span>
            </h1>
          </div>
          <div className="flex gap-6 flex-wrap text-white">
            {[
              { v:"4",     l: isUk ? "проєкти"       : "live projects"    },
              { v:"£3.1M", l: isUk ? "портфель"      : "portfolio value"  },
              { v:"12",    l: isUk ? "субпідряди"    : "subcontractors"   },
              { v:"£22.6k",l: isUk ? "CIS до HMRC"   : "CIS due HMRC"     },
              { v:"£28.5k",l: isUk ? "VO схвалено"   : "VOs approved"     },
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

        {/* ── GANTT TIMELINE ── */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-6 bg-amber-500 rounded-full" />
            <h2 className="font-black text-lg uppercase tracking-wide">
              {isUk ? "Програма робіт 2025" : "2025 Build Programme"}
            </h2>
          </div>

          <div className="flex border-b border-stone-700 pb-2 mb-1 pl-44">
            {MONTHS.map((m,i) => (
              <div key={m} className={`text-[10px] text-center flex-1 font-mono ${i===5?"text-amber-400 font-bold":"text-stone-500"}`}>{m}</div>
            ))}
          </div>

          <div className="space-y-2 relative">
            <div className="absolute top-0 bottom-0 w-px bg-amber-500/40 z-10" style={{left:`calc(11rem + ${5.5*colW}%)`}}>
              <div className="absolute -top-1 -translate-x-1/2 w-2 h-2 bg-amber-500 rounded-full" />
            </div>
            {PROJECTS.map(p => (
              <div key={p.id} className="flex items-center group" onMouseEnter={()=>setHovered(p.id)} onMouseLeave={()=>setHovered(null)}>
                <div className="w-44 pr-4 shrink-0">
                  <div className="text-sm font-bold text-stone-100">{p.name}</div>
                  <div className="text-[10px] text-stone-500">{p.units} units · {p.pm}</div>
                </div>
                <div className="flex-1 relative h-9">
                  <button
                    onClick={()=>{ setOpenId(p.id); setModalTab("progress"); }}
                    className="absolute h-9 rounded-md bg-stone-800 border border-stone-700 hover:border-amber-500 overflow-hidden flex items-center transition-colors cursor-pointer"
                    style={{left:`${p.start*colW}%`,width:`${p.len*colW}%`}}
                  >
                    <div className="absolute inset-y-0 left-0 bg-linear-to-r from-amber-600 to-amber-500 transition-all" style={{width:`${p.done}%`}} />
                    <span className="relative z-10 text-[10px] font-bold px-2 text-white whitespace-nowrap">{p.phase} · {p.done}%</span>
                  </button>
                  {hovered===p.id && (
                    <div className="absolute -top-8 left-0 bg-stone-950 border border-amber-500/40 rounded-lg px-3 py-1 text-[10px] z-20 whitespace-nowrap" style={{left:`${p.start*colW}%`}}>
                      £{p.budget}M · {isUk?"завершення":"due"} {MONTHS[Math.min(11,p.start+p.len-1)]}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-stone-600 mt-3 pl-44">
            {isUk ? "Клікніть на бар для деталей проєкту та рахунків" : "Click a bar to open project details and milestone billing"}
          </p>
        </section>

        {/* ── CIS + COST BARS ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* CIS payments */}
          <section>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-6 bg-amber-500 rounded-full" />
              <h2 className="font-black text-lg uppercase tracking-wide">{isUk?"CIS Виплати":"CIS Payments"}</h2>
            </div>
            <div className="space-y-2">
              {CIS.map(c => {
                const cis = c.gross*0.2;
                const net = c.gross-cis;
                return (
                  <div key={c.name} className="bg-stone-900 rounded-lg border border-stone-800 p-3 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm">{c.name}</div>
                      <div className="text-[10px] text-stone-500">{c.trade}</div>
                    </div>
                    <div className="flex items-center gap-3 text-right">
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
                      <span className={`text-[9px] px-2 py-1 rounded font-bold uppercase ${STATUS_STYLE(c.status)}`}>{c.status}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 bg-amber-500/10 border border-amber-500/30 rounded-lg px-4 py-2.5 flex justify-between text-sm">
              <span className="text-amber-200">{isUk?"Сума CIS до HMRC (19 Jul):":"Total CIS due HMRC (19 Jul):"}</span>
              <span className="font-black text-amber-400">£{cisTotal.toLocaleString()}</span>
            </div>
          </section>

          {/* Cost breakdown */}
          <section>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-6 bg-amber-500 rounded-full" />
              <h2 className="font-black text-lg uppercase tracking-wide">{isUk?"Бюджет — Kirkstall Rd":"Cost Tracker — Kirkstall Rd"}</h2>
            </div>
            <div className="bg-stone-900 rounded-xl border border-stone-800 p-5 space-y-4">
              {[
                { l:isUk?"Земляні роботи":"Groundworks",        spent:142, total:160  },
                { l:isUk?"Каркас":"Frame & structure",           spent:218, total:340  },
                { l:isUk?"Покрівля":"Roofing",                   spent:0,   total:120  },
                { l:isUk?"Інженерні мережі":"M&E services",      spent:84,  total:280  },
                { l:isUk?"Оздоблення":"Fit-out & finishes",      spent:27,  total:340  },
              ].map(c => {
                const pct = Math.round((c.spent/c.total)*100);
                const over = pct>85;
                return (
                  <div key={c.l}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-stone-300">{c.l}</span>
                      <span className={`font-mono ${over?"text-amber-400":"text-stone-500"}`}>£{c.spent}k / £{c.total}k</span>
                    </div>
                    <div className="h-2.5 bg-stone-800 rounded-full overflow-hidden">
                      <div className={`h-2.5 rounded-full ${over?"bg-linear-to-r from-amber-600 to-red-500":"bg-linear-to-r from-amber-600 to-amber-400"}`} style={{width:`${pct}%`}} />
                    </div>
                  </div>
                );
              })}
              <div className="border-t border-stone-800 pt-3 flex justify-between">
                <span className="text-sm text-stone-400">{isUk?"Витрачено / Бюджет":"Spent / Budget"}</span>
                <span className="font-black"><span className="text-amber-400">£471k</span> <span className="text-stone-600">/ £1.24M</span></span>
              </div>
              <div className="text-[10px] text-stone-600">{isUk?"⚠ Земляні роботи вище 85% бюджету":"⚠ Groundworks approaching budget ceiling"}</div>
            </div>
          </section>

        </div>

        {/* ── MILESTONE BILLING ── */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-amber-500 rounded-full" />
              <h2 className="font-black text-lg uppercase tracking-wide">{isUk?"Рахунки та Утримання":"Milestone Billing & Retention"}</h2>
            </div>
            <div className="flex gap-4 text-right">
              <div>
                <div className="text-[10px] text-stone-500 uppercase">{isUk?"Не оплачено":"Outstanding"}</div>
                <div className="text-lg font-black text-red-400">
                  £{MILESTONES.filter(m=>m.status==="outstanding").reduce((s,m)=>s+m.invoiced,0).toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-stone-500 uppercase">{isUk?"Утримання":"Retention held"}</div>
                <div className="text-lg font-black text-amber-400">
                  £{MILESTONES.reduce((s,m)=>s+(m.retention??0),0).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-stone-900 rounded-xl border border-stone-800 overflow-hidden">
            <div className="grid grid-cols-[1fr_2fr_auto_auto_auto_auto] text-[10px] text-stone-500 uppercase font-bold px-4 py-2.5 border-b border-stone-800 gap-4">
              <span>{isUk?"Проєкт":"Project"}</span>
              <span>{isUk?"Етап":"Stage"}</span>
              <span className="text-right">{isUk?"Контракт":"Contract"}</span>
              <span className="text-right">{isUk?"Утримання":"Retention"}</span>
              <span>{isUk?"Строк":"Due"}</span>
              <span>{isUk?"Статус":"Status"}</span>
            </div>
            {MILESTONES.map((m,i) => (
              <div key={i} className={`grid grid-cols-[1fr_2fr_auto_auto_auto_auto] px-4 py-3 gap-4 items-center border-b border-stone-800/60 ${i%2===0?"":"bg-stone-800/20"}`}>
                <span className="text-xs font-bold text-stone-300 truncate">{m.project}</span>
                <span className="text-xs text-stone-400 truncate">{m.stage}</span>
                <span className="text-xs font-mono text-stone-200 text-right">£{m.contract.toLocaleString()}</span>
                <span className="text-xs font-mono text-amber-400/80 text-right">{m.retention ? `£${m.retention.toLocaleString()}` : "—"}</span>
                <span className="text-[10px] text-stone-500 font-mono whitespace-nowrap">{m.due}</span>
                <span className={`text-[10px] px-2 py-1 rounded font-bold uppercase whitespace-nowrap ${STATUS_STYLE(m.status)}`}>{m.status}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── VARIATION ORDERS + RISK REGISTER ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Variation Orders */}
          <section>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-6 bg-amber-500 rounded-full" />
              <h2 className="font-black text-lg uppercase tracking-wide">{isUk?"Варіації (VO)":"Variation Orders"}</h2>
            </div>
            <div className="bg-stone-900 rounded-xl border border-stone-800 overflow-hidden">
              {VARIATIONS.map((v,i) => (
                <div key={v.id} className={`flex items-start gap-3 px-4 py-3 border-b border-stone-800/60 ${i%2===0?"":"bg-stone-800/20"}`}>
                  <div className="font-mono text-[10px] text-stone-500 pt-0.5 w-14 shrink-0">{v.id}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-stone-300 leading-snug">{v.desc}</div>
                    <div className="text-[10px] text-stone-600 mt-0.5">{v.project} · {v.submitted}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-black text-stone-100">£{v.value.toLocaleString()}</div>
                    <span className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase ${STATUS_STYLE(v.status)}`}>{v.status}</span>
                  </div>
                </div>
              ))}
              <div className="px-4 py-3 flex justify-between border-t border-stone-700 text-xs">
                <div className="space-y-0.5">
                  <div className="text-stone-500">{isUk?"Схвалено:":"Approved:"} <span className="text-emerald-400 font-bold">£{voApproved.toLocaleString()}</span></div>
                  <div className="text-stone-500">{isUk?"Очікує:":"Pending:"} <span className="text-amber-400 font-bold">£{voPending.toLocaleString()}</span></div>
                </div>
                <div className="text-right">
                  <div className="text-stone-500 text-[10px] uppercase">{isUk?"Загальний VO":"Total VO value"}</div>
                  <div className="text-lg font-black text-stone-100">£{(voApproved+voPending).toLocaleString()}</div>
                </div>
              </div>
            </div>
          </section>

          {/* Risk Register */}
          <section>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-6 bg-amber-500 rounded-full" />
              <h2 className="font-black text-lg uppercase tracking-wide">{isUk?"Реєстр Ризиків":"Risk Register"}</h2>
            </div>
            <div className="space-y-2.5">
              {RISKS.map(r => (
                <div key={r.id} className="bg-stone-900 border border-stone-800 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 w-2.5 h-2.5 rounded-full shrink-0 ${RAG_DOT[r.rag]}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-[10px] text-stone-500">{r.id}</span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded border font-bold uppercase ${RAG_STYLE[r.rag]}`}>
                          {r.impact} impact
                        </span>
                        <span className="text-[9px] text-stone-600">/{r.likelihood} likelihood</span>
                      </div>
                      <div className="text-sm text-stone-200 font-medium leading-snug">{r.desc}</div>
                      <div className="text-[10px] text-stone-500 mt-1.5">
                        <span className="text-stone-600">{isUk?"Захід:":"Mitigation:"}</span> {r.mitigation}
                      </div>
                    </div>
                    <div className="text-[10px] text-stone-600 shrink-0">{r.owner}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-4 text-[10px]">
              {[{c:"green",l:isUk?"Під контролем":"Controlled"},{c:"amber",l:isUk?"Моніторинг":"Monitor"},{c:"red",l:isUk?"Дія":"Action"}].map(x=>(
                <div key={x.c} className="flex items-center gap-1.5 text-stone-500">
                  <div className={`w-2 h-2 rounded-full ${RAG_DOT[x.c]}`} />
                  {x.l}
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>

      {/* ── PROJECT MODAL ── */}
      {openProject && openDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={()=>setOpenId(null)}>
          <div className="absolute inset-0 bg-black/60" />
          <div onClick={e=>e.stopPropagation()} className="relative bg-neutral-900 border border-amber-500/30 rounded-2xl w-full max-w-lg max-h-[88vh] overflow-y-auto shadow-2xl">

            {/* Modal header */}
            <div className="bg-linear-to-r from-amber-600 to-amber-500 px-5 py-4 flex items-start justify-between sticky top-0">
              <div>
                <div className="font-mono text-[10px] text-amber-900/70">{openProject.id}</div>
                <h3 className="font-black text-white text-lg">{openProject.name}</h3>
                <div className="text-amber-100 text-xs">{openProject.units} units · PM {openProject.pm} · £{openProject.budget}M</div>
              </div>
              <button onClick={()=>setOpenId(null)} className="w-7 h-7 rounded-lg bg-black/20 text-white hover:bg-black/30 transition-colors flex items-center justify-center">✕</button>
            </div>

            {/* Modal tabs */}
            <div className="flex border-b border-stone-800 bg-stone-950">
              {[
                { id:"progress", label: isUk?"Прогрес":"Progress" },
                { id:"billing",  label: isUk?"Рахунки":"Billing"  },
              ].map(t => (
                <button
                  key={t.id}
                  onClick={()=>setModalTab(t.id as "progress"|"billing")}
                  className={`flex-1 py-3 text-sm font-bold uppercase tracking-wide transition-colors ${modalTab===t.id?"text-amber-400 border-b-2 border-amber-400":"text-stone-500 hover:text-stone-300"}`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="p-5 space-y-5">

              {modalTab==="progress" && (
                <>
                  {/* Overall progress */}
                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-stone-400">{isUk?"Загальне завершення":"Overall completion"}</span>
                      <span className="font-bold text-amber-400">{openProject.done}%</span>
                    </div>
                    <div className="h-2.5 bg-stone-800 rounded-full overflow-hidden">
                      <div className="h-2.5 bg-linear-to-r from-amber-600 to-amber-400 rounded-full" style={{width:`${openProject.done}%`}} />
                    </div>
                  </div>

                  {/* Phase checklist */}
                  <div>
                    <div className="text-xs font-black uppercase tracking-wide text-stone-300 mb-2">{isUk?"Фази робіт":"Build phases"}</div>
                    <div className="space-y-1.5">
                      {openDetail.phases.map((ph,i) => (
                        <div key={i} className="flex items-center gap-2.5">
                          <div className={`w-4 h-4 rounded flex items-center justify-center text-[9px] ${ph.done?"bg-amber-500 text-white":"border border-stone-600"}`}>{ph.done?"✓":""}</div>
                          <span className={`text-sm ${ph.done?"text-stone-500 line-through":"text-stone-200"}`}>{isUk?ph.uk:ph.en}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Document Vault */}
                  <div>
                    <div className="text-xs font-black uppercase tracking-wide text-stone-300 mb-2">{isUk?"Документи проєкту":"Document Vault"}</div>
                    <div className="space-y-1.5">
                      {openDetail.docs.map(d => (
                        <div key={d.name} className="flex items-center justify-between bg-stone-900 border border-stone-800 rounded-lg px-3 py-2">
                          <div className="flex items-center gap-2.5">
                            {(()=>{ const Ic=DOC_ICON[d.type]??FileText; return <Ic className="w-4 h-4 text-stone-400" strokeWidth={1.75} />; })()}
                            <div>
                              <div className="text-sm text-stone-100">{d.name}</div>
                              <div className="text-[10px] text-stone-500">{d.type}</div>
                            </div>
                          </div>
                          {d.ok
                            ? <span className="text-[10px] bg-emerald-500/15 text-emerald-400 px-2 py-1 rounded font-bold flex items-center gap-1"><CheckCircle2 className="w-3 h-3" />{isUk?"Затв.":"Approved"}</span>
                            : <span className="text-[10px] bg-amber-500/15 text-amber-400 px-2 py-1 rounded font-bold flex items-center gap-1"><Clock className="w-3 h-3" />{isUk?"Очікує":"Pending"}</span>}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Linked VOs */}
                  {VARIATIONS.filter(v=>v.project===openProject.name).length>0 && (
                    <div>
                      <div className="text-xs font-black uppercase tracking-wide text-stone-300 mb-2">{isUk?"Варіації проєкту":"Project Variations"}</div>
                      <div className="space-y-1.5">
                        {VARIATIONS.filter(v=>v.project===openProject.name).map(v=>(
                          <div key={v.id} className="flex items-center justify-between bg-stone-900 border border-stone-800 rounded-lg px-3 py-2">
                            <div>
                              <div className="text-xs text-stone-200">{v.desc}</div>
                              <div className="text-[10px] text-stone-500">{v.id} · {v.submitted}</div>
                            </div>
                            <div className="text-right shrink-0 ml-3">
                              <div className="text-sm font-black">£{v.value.toLocaleString()}</div>
                              <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${STATUS_STYLE(v.status)}`}>{v.status}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {modalTab==="billing" && (
                <>
                  <div className="text-xs font-black uppercase tracking-wide text-stone-300 mb-3">{isUk?"Etapes та Рахунки":"Milestone Billing Schedule"}</div>
                  {openBilling.length===0 ? (
                    <div className="text-stone-500 text-sm text-center py-6">{isUk?"Немає даних":"No billing schedule available"}</div>
                  ) : (
                    <div className="space-y-2.5">
                      {openBilling.map((b,i) => (
                        <div key={i} className="bg-stone-900 border border-stone-800 rounded-xl p-4">
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-sm text-stone-200 font-medium pr-4">{b.stage}</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase shrink-0 ${STATUS_STYLE(b.status)}`}>{b.status}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="text-xs text-stone-500">{isUk?"Строк:":"Due:"} <span className="text-stone-400">{b.due}</span></div>
                            <div className="text-lg font-black text-stone-100">£{b.contract.toLocaleString()}</div>
                          </div>
                          {b.status==="outstanding" && (
                            <div className="mt-2.5 flex items-center gap-1.5 text-[10px] text-red-400 bg-red-500/10 rounded-lg px-3 py-1.5">
                              <AlertTriangle className="w-3 h-3 shrink-0" />
                              {isUk?"Рахунок виставлено — очікуємо оплату":"Invoice issued — awaiting client payment"}
                            </div>
                          )}
                          {b.status==="upcoming" && (
                            <div className="mt-2.5 flex items-center gap-1.5 text-[10px] text-stone-500 bg-stone-800/60 rounded-lg px-3 py-1.5">
                              <TrendingUp className="w-3 h-3 shrink-0" />
                              {isUk?"Рахунок виставляється при досягненні етапу":"Invoice raised on milestone completion"}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl px-4 py-3 flex justify-between text-sm">
                    <span className="text-amber-200">{isUk?"Загалом по контракту:":"Total contract value:"}</span>
                    <span className="font-black text-amber-400">£{openBilling.reduce((s,b)=>s+b.contract,0).toLocaleString()}</span>
                  </div>
                </>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
