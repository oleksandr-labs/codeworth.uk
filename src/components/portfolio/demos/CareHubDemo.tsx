"use client";
import { useState, useMemo } from "react";
import {
  Calendar, Users, Package, ShieldCheck,
  Search, X, ChevronDown, ChevronUp,
  AlertTriangle, CheckCircle2, Clock,
} from "lucide-react";
import { EmojiIcon } from "@/components/ui/EmojiIcon";

// ── Data ──────────────────────────────────────────────────────────────

const PRACTITIONERS = [
  { name:"Dr A. Patel",     role:"GP"              },
  { name:"Dr S. Okafor",    role:"GP"              },
  { name:"Physio J. Brown", role:"Physiotherapist" },
  { name:"Nurse T. Evans",  role:"Practice Nurse"  },
];
const PRACT_HEADER = ["bg-sky-600","bg-blue-600","bg-purple-600","bg-teal-600"];
const PRACT_TEXT   = ["text-sky-800","text-blue-800","text-purple-800","text-teal-800"];

const DAYS  = ["Mon 2 Jun","Tue 3 Jun","Wed 4 Jun","Thu 5 Jun","Fri 6 Jun"];
const SLOTS = ["09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00"];

type ApptStatus = "attended"|"scheduled"|"cancelled"|"dna";
interface Appt { time:string; pract:number; patient:string; type:string; status:ApptStatus; nhs:string; }

const ALL_APPTS: Record<number, Appt[]> = {
  0:[
    { time:"09:00", pract:0, patient:"M. Williams",  type:"Initial consult",          status:"attended",  nhs:"943 476 1028" },
    { time:"09:00", pract:1, patient:"R. Thompson",  type:"Hypertension review",      status:"attended",  nhs:"712 354 8821" },
    { time:"09:30", pract:2, patient:"K. Davis",     type:"Physio assessment",        status:"attended",  nhs:"334 127 9945" },
    { time:"09:30", pract:3, patient:"P. Jones",     type:"Flu vaccination",          status:"attended",  nhs:"881 204 6673" },
    { time:"10:00", pract:0, patient:"L. Sharma",    type:"Blood results review",     status:"attended",  nhs:"528 947 3312" },
    { time:"10:00", pract:1, patient:"H. Patel",     type:"Chronic disease review",   status:"attended",  nhs:"456 892 1234" },
    { time:"10:30", pract:2, patient:"E. Wilson",    type:"Physio session",           status:"cancelled", nhs:"667 123 8890" },
    { time:"10:30", pract:3, patient:"F. Green",     type:"Dressing change",          status:"attended",  nhs:"775 341 2219" },
    { time:"11:00", pract:0, patient:"A. Brown",     type:"Mental health review",     status:"attended",  nhs:"213 784 5562" },
    { time:"11:00", pract:1, patient:"B. Evans",     type:"New patient registration", status:"attended",  nhs:"632 815 4401" },
    { time:"11:30", pract:2, patient:"C. Murray",    type:"Physio follow-up",         status:"attended",  nhs:"889 012 3346" },
    { time:"11:30", pract:3, patient:"D. Osei",      type:"Wound care",               status:"dna",       nhs:"145 678 9923" },
    { time:"14:00", pract:0, patient:"D. Taylor",    type:"New patient reg.",         status:"scheduled", nhs:"901 567 3348" },
    { time:"14:00", pract:1, patient:"C. Roberts",   type:"Diabetes review",          status:"scheduled", nhs:"448 290 7765" },
    { time:"14:30", pract:2, patient:"N. Singh",     type:"Physio session",           status:"scheduled", nhs:"187 634 9923" },
    { time:"14:30", pract:3, patient:"G. Murphy",    type:"Smear test",               status:"scheduled", nhs:"844 219 6678" },
    { time:"15:00", pract:0, patient:"O. Clarke",    type:"COPD review",              status:"scheduled", nhs:"523 976 1145" },
    { time:"15:30", pract:1, patient:"S. Khan",      type:"Referral follow-up",       status:"scheduled", nhs:"299 843 5572" },
    { time:"16:00", pract:2, patient:"T. Obi",       type:"Physio discharge",         status:"scheduled", nhs:"744 128 9934" },
    { time:"16:30", pract:3, patient:"J. Walsh",     type:"INR blood test",           status:"scheduled", nhs:"381 567 2213" },
  ],
  1:[
    { time:"09:00", pract:0, patient:"V. Patel",   type:"Annual review",       status:"scheduled", nhs:"621 234 8891" },
    { time:"09:30", pract:1, patient:"W. Lee",     type:"Follow-up",           status:"scheduled", nhs:"445 789 3312" },
    { time:"10:00", pract:2, patient:"X. Ahmed",   type:"Physio session",      status:"scheduled", nhs:"887 012 5567" },
    { time:"10:30", pract:3, patient:"Y. Brown",   type:"Travel vaccination",  status:"scheduled", nhs:"112 345 7789" },
    { time:"14:00", pract:0, patient:"Z. Singh",   type:"Blood pressure",      status:"scheduled", nhs:"556 781 2234" },
    { time:"14:30", pract:2, patient:"A. Chen",    type:"Physio initial",      status:"scheduled", nhs:"223 890 6645" },
  ],
  2:[
    { time:"09:30", pract:0, patient:"B. Torres",  type:"Skin check",          status:"scheduled", nhs:"778 456 1123" },
    { time:"10:00", pract:2, patient:"C. Adeyemi", type:"Physio assessment",   status:"scheduled", nhs:"334 567 8890" },
    { time:"11:00", pract:3, patient:"D. Kim",     type:"Wound care",          status:"scheduled", nhs:"990 123 4456" },
    { time:"14:30", pract:1, patient:"E. Osei",    type:"Diabetes review",     status:"scheduled", nhs:"667 234 5578" },
    { time:"15:00", pract:0, patient:"F. Müller",  type:"Mental health",       status:"scheduled", nhs:"445 890 7723" },
  ],
  3:[
    { time:"09:00", pract:0, patient:"G. Santos",  type:"Initial consult",     status:"scheduled", nhs:"112 678 9934" },
    { time:"09:30", pract:3, patient:"H. Ivanova", type:"Immunisation",        status:"scheduled", nhs:"889 345 6612" },
    { time:"10:30", pract:1, patient:"I. Nkosi",   type:"Chronic pain review", status:"scheduled", nhs:"556 012 3345" },
    { time:"14:00", pract:2, patient:"J. López",   type:"Physio session 4",    status:"scheduled", nhs:"223 789 1156" },
    { time:"15:30", pract:0, patient:"K. Hussein",  type:"Referral follow-up", status:"scheduled", nhs:"778 456 8823" },
  ],
  4:[
    { time:"09:00", pract:1, patient:"L. Dube",    type:"Blood results",       status:"scheduled", nhs:"112 901 5578" },
    { time:"10:00", pract:2, patient:"M. Chávez",  type:"Physio final",        status:"scheduled", nhs:"889 678 2234" },
    { time:"11:00", pract:0, patient:"N. Yamamoto",type:"Annual check",        status:"scheduled", nhs:"556 345 9945" },
    { time:"14:00", pract:3, patient:"O. Mwangi",  type:"Antenatal",           status:"scheduled", nhs:"223 012 6612" },
    { time:"15:00", pract:1, patient:"P. Dubois",  type:"Hypertension",        status:"scheduled", nhs:"890 789 3323" },
  ],
};

const PATIENTS = [
  { id:"P-001", name:"M. Williams",  nhs:"943 476 1028", dob:"12 Mar 1975", lastVisit:"Today",    consent:"full",    phone:"07712 345678", site:"Bristol Central" },
  { id:"P-002", name:"R. Thompson",  nhs:"712 354 8821", dob:"03 Jul 1962", lastVisit:"Today",    consent:"full",    phone:"07834 567890", site:"Bristol Central" },
  { id:"P-003", name:"L. Sharma",    nhs:"528 947 3312", dob:"29 Nov 1988", lastVisit:"Today",    consent:"partial", phone:"07945 234567", site:"Clifton"         },
  { id:"P-004", name:"K. Davis",     nhs:"334 127 9945", dob:"17 Sep 2001", lastVisit:"Today",    consent:"full",    phone:"07623 890123", site:"Redland"         },
  { id:"P-005", name:"P. Jones",     nhs:"881 204 6673", dob:"05 Feb 1956", lastVisit:"Today",    consent:"expired", phone:"07856 012345", site:"Bristol Central" },
  { id:"P-006", name:"H. Patel",     nhs:"456 892 1234", dob:"22 Jun 1978", lastVisit:"Today",    consent:"full",    phone:"07534 678901", site:"Southville"      },
  { id:"P-007", name:"E. Wilson",    nhs:"667 123 8890", dob:"08 Dec 1995", lastVisit:"21 May",   consent:"full",    phone:"07789 234567", site:"Clifton"         },
  { id:"P-008", name:"A. Brown",     nhs:"213 784 5562", dob:"14 Apr 1983", lastVisit:"Today",    consent:"full",    phone:"07912 345678", site:"Bristol Central" },
  { id:"P-009", name:"D. Taylor",    nhs:"901 567 3348", dob:"31 Jan 1990", lastVisit:"New",      consent:"pending", phone:"07645 890123", site:"Redland"         },
  { id:"P-010", name:"S. Khan",      nhs:"299 843 5572", dob:"19 Aug 1969", lastVisit:"15 Apr",   consent:"full",    phone:"07423 567890", site:"Bristol Central" },
];

const STOCK = [
  { name:"Nitrile gloves (L)",       cat:"PPE",            qty:240, reorder:100, status:"ok",       supplier:"MedSupply UK"          },
  { name:"Nitrile gloves (M)",       cat:"PPE",            qty:82,  reorder:100, status:"low",      supplier:"MedSupply UK"          },
  { name:"Wound dressing 10×10 cm",  cat:"Wound care",     qty:34,  reorder:50,  status:"low",      supplier:"Smith & Nephew"        },
  { name:"22G IV Cannulae",          cat:"IV / Injection", qty:12,  reorder:30,  status:"critical", supplier:"BD Medical"            },
  { name:"Insulin syringes 1 ml",    cat:"IV / Injection", qty:156, reorder:50,  status:"ok",       supplier:"BD Medical"            },
  { name:"BP cuff disposable",       cat:"Diagnostics",    qty:8,   reorder:20,  status:"critical", supplier:"Welch Allyn"           },
  { name:"ECG electrodes",           cat:"Diagnostics",    qty:220, reorder:100, status:"ok",       supplier:"3M Medical"            },
  { name:"Urine test strips",        cat:"Diagnostics",    qty:18,  reorder:30,  status:"low",      supplier:"Siemens Healthineers"  },
  { name:"Surgical face masks",      cat:"PPE",            qty:430, reorder:200, status:"ok",       supplier:"MedSupply UK"          },
  { name:"Alcohol hand gel 500 ml",  cat:"Hygiene",        qty:67,  reorder:40,  status:"ok",       supplier:"Purell"                },
];

const CQC_DOMAINS = [
  {
    id:"safe", label:"Safe", emoji:"🛡️",
    status:"good", score:88, lastReview:"12 Feb 2025", evidence:8, pending:2,
    items:[
      { text:"Medicines management policy",          ok:true  },
      { text:"Infection control audit Q1 2025",      ok:true  },
      { text:"Safeguarding training — all staff",    ok:true  },
      { text:"Fire safety certificate (all sites)",  ok:true  },
      { text:"DBS checks — all clinical staff",      ok:true  },
      { text:"Medical emergency equipment log",      ok:false },
      { text:"Significant event log (current)",      ok:false },
    ],
  },
  {
    id:"effective", label:"Effective", emoji:"📊",
    status:"good", score:91, lastReview:"20 Mar 2025", evidence:11, pending:0,
    items:[
      { text:"Clinical audit reports 2024/25", ok:true },
      { text:"QOF achievement evidence",       ok:true },
      { text:"Referral pathway documents",     ok:true },
      { text:"NICE guideline compliance log",  ok:true },
      { text:"Staff appraisal records",        ok:true },
    ],
  },
  {
    id:"caring", label:"Caring", emoji:"💚",
    status:"outstanding", score:96, lastReview:"20 Mar 2025", evidence:7, pending:0,
    items:[
      { text:"Patient satisfaction survey Q4 2024",   ok:true },
      { text:"Complaints log & resolutions",           ok:true },
      { text:"Friends & Family Test results",          ok:true },
      { text:"Patient feedback display — all sites",   ok:true },
    ],
  },
  {
    id:"responsive", label:"Responsive", emoji:"⚡",
    status:"requires-improvement", score:71, lastReview:"12 Feb 2025", evidence:6, pending:4,
    items:[
      { text:"Access & appointment policy",      ok:true  },
      { text:"DNA (did-not-attend) policy",      ok:true  },
      { text:"Translation services agreement",   ok:false },
      { text:"Complaints response SLA records",  ok:false },
      { text:"Out-of-hours signposting audit",   ok:false },
      { text:"Extended hours evidence",          ok:false },
    ],
  },
  {
    id:"well-led", label:"Well-led", emoji:"🏆",
    status:"good", score:85, lastReview:"12 Feb 2025", evidence:9, pending:1,
    items:[
      { text:"Business continuity plan",         ok:true  },
      { text:"Staff meeting minutes (6 months)", ok:true  },
      { text:"Information governance policy",    ok:true  },
      { text:"Risk register (current)",          ok:true  },
      { text:"Staff survey results 2024",        ok:false },
    ],
  },
];

// ── Style maps ────────────────────────────────────────────────────────

const APPT_CELL: Record<ApptStatus,string> = {
  attended:  "bg-sky-50 border-sky-200",
  scheduled: "bg-slate-50 border-slate-200",
  cancelled: "bg-red-50 border-red-100 opacity-60",
  dna:       "bg-amber-50 border-amber-200",
};
const APPT_DOT: Record<ApptStatus,string> = {
  attended:  "bg-sky-500",
  scheduled: "bg-slate-400",
  cancelled: "bg-red-400",
  dna:       "bg-amber-400",
};
const APPT_LABEL: Record<ApptStatus,string> = {
  attended:  "Attended",
  scheduled: "Scheduled",
  cancelled: "Cancelled",
  dna:       "Did not attend",
};
const CONSENT_STYLE: Record<string,string> = {
  full:    "bg-emerald-100 text-emerald-700",
  partial: "bg-amber-100 text-amber-700",
  expired: "bg-red-100 text-red-700",
  pending: "bg-blue-100 text-blue-700",
};
const STOCK_STYLE: Record<string,string> = {
  ok:       "bg-emerald-100 text-emerald-700",
  low:      "bg-amber-100 text-amber-700",
  critical: "bg-red-100 text-red-700",
};
const CQC_BADGE: Record<string,string> = {
  outstanding:            "bg-purple-100 text-purple-700 border-purple-200",
  good:                   "bg-emerald-100 text-emerald-700 border-emerald-200",
  "requires-improvement": "bg-amber-100 text-amber-700 border-amber-200",
  inadequate:             "bg-red-100 text-red-700 border-red-200",
};
const CQC_BAR: Record<string,string> = {
  outstanding:            "bg-purple-500",
  good:                   "bg-emerald-500",
  "requires-improvement": "bg-amber-400",
  inadequate:             "bg-red-500",
};

// ── Component ─────────────────────────────────────────────────────────

export function CareHubDemo({ lang }: { lang: string }) {
  const [tab,          setTab]         = useState<"calendar"|"patients"|"stock"|"cqc">("calendar");
  const [day,          setDay]         = useState(0);
  const [openAppt,     setOpenAppt]    = useState<Appt | null>(null);
  const [openPatient,  setOpenPatient] = useState<typeof PATIENTS[0] | null>(null);
  const [expandedCqc,  setExpandedCqc]= useState<string | null>(null);
  const [search,       setSearch]      = useState("");
  const [ordered,      setOrdered]     = useState<Set<string>>(new Set());
  const isUk = lang === "uk";

  const dayAppts   = ALL_APPTS[day] ?? [];
  const attended   = ALL_APPTS[0].filter(a => a.status === "attended").length;
  const totalToday = ALL_APPTS[0].length;
  const critCount  = STOCK.filter(s => s.status === "critical").length;
  const lowCount   = STOCK.filter(s => s.status === "low").length;
  const cqcAvg     = Math.round(CQC_DOMAINS.reduce((s,d) => s + d.score, 0) / CQC_DOMAINS.length);

  const filteredPatients = useMemo(
    () => PATIENTS.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) || p.nhs.includes(search)
    ),
    [search],
  );

  function apptAt(slot: string, pi: number): Appt | undefined {
    return dayAppts.find(a => a.time === slot && a.pract === pi);
  }

  const TABS = [
    { id:"calendar", label: isUk ? "Розклад"  : "Calendar",  Icon: Calendar    },
    { id:"patients", label: isUk ? "Пацієнти" : "Patients",  Icon: Users       },
    { id:"stock",    label: isUk ? "Запаси"   : "Stock",     Icon: Package     },
    { id:"cqc",      label: "CQC",                           Icon: ShieldCheck },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">

      {/* ── TOP BAR ── */}
      <div className="bg-linear-to-r from-sky-600 to-blue-700 text-white px-6 py-5">
        <div className="max-w-6xl mx-auto flex items-end justify-between flex-wrap gap-4">
          <div>
            <div className="text-sky-200 text-[10px] font-bold uppercase tracking-[0.2em]">Healthcare ERP</div>
            <h1 className="text-3xl font-black tracking-tight">
              CareHub <span className="text-sky-300 font-normal text-lg">/ BrightCare Clinics</span>
            </h1>
            <div className="text-sky-200 text-xs mt-0.5">Bristol Central · Clifton · Redland · Southville</div>
          </div>
          <div className="flex gap-6 flex-wrap">
            {[
              { v:`${totalToday}`,            l: isUk ? "прийомів"        : "appointments today" },
              { v:`${attended}/${totalToday}`, l: isUk ? "виконано"        : "completed"          },
              { v:`${critCount + lowCount}`,   l: isUk ? "stock alerts"    : "stock alerts"       },
              { v:`${cqcAvg}%`,               l: isUk ? "CQC готовність"  : "CQC readiness"      },
            ].map(s => (
              <div key={s.l} className="text-right">
                <div className="text-2xl font-black">{s.v}</div>
                <div className="text-[10px] text-sky-200 uppercase tracking-wide">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── TAB NAV ── */}
      <div className="bg-white border-b border-gray-200 px-6 sticky top-0 z-20 shadow-sm">
        <div className="max-w-6xl mx-auto flex">
          {TABS.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-2 px-5 py-3.5 text-sm font-semibold border-b-2 transition-colors ${
                tab === id ? "border-sky-600 text-sky-600" : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6">

        {/* ── CALENDAR ── */}
        {tab === "calendar" && (
          <div>
            {/* Day selector */}
            <div className="flex gap-2 mb-5 flex-wrap">
              {DAYS.map((d, i) => (
                <button
                  key={d}
                  onClick={() => setDay(i)}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                    day === i
                      ? "bg-sky-600 text-white"
                      : "bg-white border border-gray-200 text-gray-600 hover:border-sky-300"
                  }`}
                >
                  {d}
                  {i === 0 && (
                    <span className="ml-1.5 text-[9px] font-bold bg-sky-500/30 text-sky-200 rounded px-1 py-0.5 uppercase">Today</span>
                  )}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-auto shadow-sm">
              {/* Header */}
              <div className="grid grid-cols-[4rem_1fr_1fr_1fr_1fr] min-w-160">
                <div className="bg-gray-50 border-b border-r border-gray-200 h-12" />
                {PRACTITIONERS.map((p, i) => (
                  <div key={p.name} className={`${PRACT_HEADER[i]} text-white px-3 py-2.5 border-b ${i<3?"border-r border-white/20":""}`}>
                    <div className="text-xs font-bold">{p.name}</div>
                    <div className="text-[10px] opacity-80">{p.role}</div>
                  </div>
                ))}
              </div>

              {/* Slot rows */}
              <div className="min-w-160">
                {SLOTS.map((slot, si) => (
                  <div key={slot}>
                    {/* Lunch divider */}
                    {slot === "14:00" && (
                      <div className="grid grid-cols-[4rem_1fr_1fr_1fr_1fr] bg-gray-50 border-y border-gray-200 py-1">
                        <div className="px-2 text-[10px] font-bold text-gray-400 uppercase flex items-center">Lunch</div>
                        {[0,1,2,3].map(i=><div key={i} className={i<3?"border-r border-gray-200":""} />)}
                      </div>
                    )}
                    <div className={`grid grid-cols-[4rem_1fr_1fr_1fr_1fr] ${si<SLOTS.length-1?"border-b border-gray-100":""}`}>
                      <div className="flex items-center px-2 border-r border-gray-100 h-12">
                        <span className="text-[11px] font-mono text-gray-400">{slot}</span>
                      </div>
                      {[0,1,2,3].map(pi => {
                        const appt = apptAt(slot, pi);
                        return (
                          <div key={pi} className={`p-1 ${pi<3?"border-r border-gray-100":""} h-12`}>
                            {appt ? (
                              <button
                                onClick={() => setOpenAppt(appt)}
                                className={`w-full h-full rounded-lg border px-2 py-1 text-left text-[11px] transition-all hover:shadow-sm hover:brightness-95 ${APPT_CELL[appt.status]}`}
                              >
                                <div className="flex items-center gap-1 mb-0.5">
                                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${APPT_DOT[appt.status]}`} />
                                  <span className={`font-bold truncate ${PRACT_TEXT[pi]}`}>{appt.patient}</span>
                                </div>
                                <div className="text-gray-500 truncate text-[10px]">{appt.type}</div>
                              </button>
                            ) : (
                              <div className="h-full rounded-lg border border-dashed border-gray-100" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4 mt-3 flex-wrap text-[11px] text-gray-500">
              {(["attended","scheduled","cancelled","dna"] as ApptStatus[]).map(s => (
                <div key={s} className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${APPT_DOT[s]}`} />
                  {APPT_LABEL[s]}
                </div>
              ))}
              <span className="text-gray-400 ml-2">
                {isUk ? "· клікніть на прийом для деталей" : "· click an appointment to view details"}
              </span>
            </div>
          </div>
        )}

        {/* ── PATIENTS ── */}
        {tab === "patients" && (
          <div>
            <div className="relative mb-5">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={isUk ? "Пошук за ім'ям або NHS номером…" : "Search by name or NHS number…"}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-sky-400 shadow-sm"
              />
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="grid grid-cols-[1fr_auto_auto_auto_auto] px-4 py-2.5 border-b border-gray-200 text-[10px] font-bold text-gray-400 uppercase gap-4">
                <span>{isUk?"Пацієнт":"Patient"}</span>
                <span>NHS #</span>
                <span>{isUk?"Дата народж.":"DOB"}</span>
                <span>{isUk?"Остання вiзита":"Last visit"}</span>
                <span>GDPR</span>
              </div>
              {filteredPatients.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => setOpenPatient(p)}
                  className={`w-full grid grid-cols-[1fr_auto_auto_auto_auto] px-4 py-3 gap-4 items-center border-b border-gray-100 hover:bg-sky-50 transition-colors text-left ${i%2===0?"":"bg-gray-50/50"}`}
                >
                  <div>
                    <div className="font-semibold text-sm text-gray-800">{p.name}</div>
                    <div className="text-[10px] text-gray-400">{p.site}</div>
                  </div>
                  <span className="font-mono text-xs text-gray-500 whitespace-nowrap">{p.nhs}</span>
                  <span className="text-xs text-gray-500 whitespace-nowrap">{p.dob}</span>
                  <span className={`text-xs whitespace-nowrap ${p.lastVisit==="New"?"text-sky-600 font-semibold":"text-gray-500"}`}>{p.lastVisit}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold capitalize whitespace-nowrap ${CONSENT_STYLE[p.consent]}`}>{p.consent}</span>
                </button>
              ))}
              {filteredPatients.length === 0 && (
                <div className="text-center py-10 text-gray-400 text-sm">{isUk?"Не знайдено":"No patients found"}</div>
              )}
            </div>
          </div>
        )}

        {/* ── STOCK ── */}
        {tab === "stock" && (
          <div>
            <div className="flex gap-3 mb-5 flex-wrap">
              {[
                { count:STOCK.filter(s=>s.status==="critical").length, label:"Critical",  cls:"bg-red-100 text-red-700"         },
                { count:STOCK.filter(s=>s.status==="low").length,      label:"Low stock", cls:"bg-amber-100 text-amber-700"     },
                { count:STOCK.filter(s=>s.status==="ok").length,       label:"OK",        cls:"bg-emerald-100 text-emerald-700" },
              ].map(c => (
                <div key={c.label} className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold ${c.cls}`}>
                  <span className="text-lg font-black">{c.count}</span>{c.label}
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="grid grid-cols-[2fr_1fr_auto_auto_1.5fr_auto] px-4 py-2.5 border-b border-gray-200 text-[10px] font-bold text-gray-400 uppercase gap-4">
                <span>{isUk?"Матеріал":"Item"}</span>
                <span>{isUk?"Категорія":"Category"}</span>
                <span className="text-right">{isUk?"Кіл.":"Qty"}</span>
                <span className="text-right">{isUk?"Мін.":"Reorder"}</span>
                <span>{isUk?"Постачальник":"Supplier"}</span>
                <span>{isUk?"Статус":"Status"}</span>
              </div>
              {STOCK.map((item, i) => (
                <div key={item.name} className={`grid grid-cols-[2fr_1fr_auto_auto_1.5fr_auto] px-4 py-3 gap-4 items-center border-b border-gray-100 ${i%2===0?"":"bg-gray-50/50"}`}>
                  <div className="font-medium text-sm text-gray-800 truncate">{item.name}</div>
                  <div className="text-xs text-gray-500">{item.cat}</div>
                  <div className={`text-sm font-black text-right ${item.status==="critical"?"text-red-600":item.status==="low"?"text-amber-600":"text-gray-700"}`}>{item.qty}</div>
                  <div className="text-xs text-gray-400 text-right font-mono">{item.reorder}</div>
                  <div className="text-xs text-gray-500 truncate">{item.supplier}</div>
                  <div className="flex items-center gap-2 whitespace-nowrap">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${STOCK_STYLE[item.status]}`}>{item.status}</span>
                    {(item.status==="critical"||item.status==="low") && (
                      ordered.has(item.name) ? (
                        <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />{isUk?"PO відправлено":"PO sent"}
                        </span>
                      ) : (
                        <button
                          onClick={() => setOrdered(prev => new Set([...prev, item.name]))}
                          className="text-[10px] px-2 py-0.5 bg-sky-600 text-white rounded-full font-bold hover:bg-sky-700 transition-colors"
                        >
                          {isUk?"Замовити":"Order"}
                        </button>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── CQC ── */}
        {tab === "cqc" && (
          <div className="space-y-3">
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm flex items-center justify-between flex-wrap gap-4 mb-2">
              <div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">
                  {isUk?"Загальна готовність CQC":"Overall CQC Readiness"}
                </div>
                <div className="text-4xl font-black text-sky-600">{cqcAvg}%</div>
              </div>
              <div className="text-xs text-gray-400 max-w-xs">
                {isUk
                  ? "5 ключових областей. Клікніть для перегляду доказів."
                  : "5 key lines of enquiry. Click each domain to review evidence checklist."}
              </div>
            </div>
            {CQC_DOMAINS.map(d => (
              <div key={d.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                <button
                  className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  onClick={() => setExpandedCqc(expandedCqc===d.id ? null : d.id)}
                >
                  <div className="flex items-center gap-3 text-left">
                    <EmojiIcon emoji={d.emoji} className="w-7 h-7" />
                    <div>
                      <div className="font-bold text-gray-800">{d.label}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">
                        {isUk?"Остання перевірка":"Last review"}: {d.lastReview}
                        <span className="text-emerald-600 ml-2">{d.evidence} {isUk?"доказів":"evidence"}</span>
                        {d.pending>0 && <span className="text-amber-500 ml-1">· {d.pending} {isUk?"очікує":"pending"}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="hidden sm:flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${CQC_BAR[d.status]}`} style={{width:`${d.score}%`}} />
                      </div>
                      <span className="text-sm font-bold text-gray-600">{d.score}%</span>
                    </div>
                    <span className={`text-[10px] px-2.5 py-1 rounded-full border font-semibold capitalize ${CQC_BADGE[d.status]}`}>
                      {d.status.replace(/-/g," ")}
                    </span>
                    {expandedCqc===d.id
                      ? <ChevronUp className="w-4 h-4 text-gray-400" />
                      : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </div>
                </button>
                {expandedCqc===d.id && (
                  <div className="border-t border-gray-100 px-5 py-4 space-y-2">
                    {d.items.map((item, ii) => (
                      <div key={ii} className="flex items-center gap-3">
                        {item.ok
                          ? <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          : <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />}
                        <span className={`text-sm ${item.ok?"text-gray-700":"text-amber-700"}`}>{item.text}</span>
                        {!item.ok && (
                          <span className="ml-auto text-[10px] bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full font-bold shrink-0 whitespace-nowrap">
                            {isUk?"Потрібна дія":"Action needed"}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

      </div>

      {/* ── APPOINTMENT MODAL ── */}
      {openAppt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setOpenAppt(null)}>
          <div className="absolute inset-0 bg-black/40" />
          <div onClick={e => e.stopPropagation()} className="relative bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
            <div className={`px-5 py-4 border-b border-gray-200 ${APPT_CELL[openAppt.status]}`}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`w-2 h-2 rounded-full ${APPT_DOT[openAppt.status]}`} />
                    <span className="text-xs font-bold text-gray-500 uppercase">{APPT_LABEL[openAppt.status]}</span>
                  </div>
                  <h3 className="font-black text-gray-800 text-lg">{openAppt.patient}</h3>
                  <div className="text-xs text-gray-500">NHS {openAppt.nhs}</div>
                </div>
                <button onClick={() => setOpenAppt(null)} className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { l:isUk?"Лікар":"Practitioner",   v:PRACTITIONERS[openAppt.pract]?.name ?? "—" },
                  { l:isUk?"Час":"Time",              v:openAppt.time                               },
                  { l:isUk?"Тип":"Type",              v:openAppt.type                               },
                  { l:isUk?"День":"Day",               v:DAYS[day]                                   },
                ].map(row => (
                  <div key={row.l}>
                    <div className="text-[10px] font-bold text-gray-400 uppercase">{row.l}</div>
                    <div className="text-sm text-gray-800 font-medium">{row.v}</div>
                  </div>
                ))}
              </div>
              <div className="bg-sky-50 border border-sky-100 rounded-xl px-4 py-3 text-xs text-sky-700">
                <span className="font-bold">GDPR:</span>{" "}
                {isUk ? "Згода пацієнта підтверджена · Дані зашифровано" : "Patient consent verified · Data encrypted at rest"}
              </div>
              {openAppt.status === "scheduled" && (
                <div className="flex gap-2">
                  <button className="flex-1 py-2 bg-emerald-600 text-white text-sm font-bold rounded-xl hover:bg-emerald-700 transition-colors">
                    {isUk?"Позначити виконаним":"Mark attended"}
                  </button>
                  <button className="flex-1 py-2 bg-gray-100 text-gray-600 text-sm font-bold rounded-xl hover:bg-gray-200 transition-colors">
                    {isUk?"Скасувати":"Cancel appt"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── PATIENT MODAL ── */}
      {openPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setOpenPatient(null)}>
          <div className="absolute inset-0 bg-black/40" />
          <div onClick={e => e.stopPropagation()} className="relative bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
            <div className="bg-linear-to-r from-sky-600 to-blue-700 px-5 py-4 text-white flex items-start justify-between">
              <div>
                <div className="text-sky-200 text-[10px] font-bold uppercase">Patient record</div>
                <h3 className="font-black text-lg">{openPatient.name}</h3>
                <div className="text-sky-200 text-xs">NHS {openPatient.nhs}</div>
              </div>
              <button onClick={() => setOpenPatient(null)} className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { l:isUk?"Дата народж.":"DOB",          v:openPatient.dob       },
                  { l:isUk?"Остання вiзита":"Last visit",  v:openPatient.lastVisit },
                  { l:isUk?"Телефон":"Phone",              v:openPatient.phone     },
                  { l:isUk?"Клініка":"Site",               v:openPatient.site      },
                ].map(row => (
                  <div key={row.l}>
                    <div className="text-[10px] font-bold text-gray-400 uppercase">{row.l}</div>
                    <div className="text-sm text-gray-800">{row.v}</div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                <div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase">GDPR Consent</div>
                  <span className={`text-xs font-bold capitalize px-2 py-0.5 rounded-full mt-1 inline-block ${CONSENT_STYLE[openPatient.consent]}`}>
                    {openPatient.consent}
                  </span>
                </div>
                {openPatient.consent==="expired" && (
                  <button className="text-xs bg-sky-600 text-white px-3 py-1.5 rounded-lg font-bold hover:bg-sky-700 transition-colors">
                    {isUk?"Поновити":"Renew consent"}
                  </button>
                )}
                {openPatient.consent==="pending" && (
                  <div className="flex items-center gap-1 text-xs text-amber-600">
                    <Clock className="w-3.5 h-3.5" />
                    {isUk?"Очікує підпис":"Awaiting signature"}
                  </div>
                )}
                {openPatient.consent==="full" && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
