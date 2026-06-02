"use client";

import { useState } from "react";
import { Users, Phone, Mail, Calendar, ArrowRight, Plus, RefreshCw } from "lucide-react";

interface Props {
  variant?: string;
  isUk: boolean;
}

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: "form" | "chat" | "phone";
  stage: "new" | "contacted" | "qualified" | "proposal" | "won";
  value: number;
  createdAt: string;
}

const INITIAL_LEADS: Lead[] = [
  { id: "1", name: "Andriy Petrov", email: "a@foodco.ua", phone: "+380 50 123 4567", source: "form", stage: "new", value: 25000, createdAt: "2026-05-04 10:32" },
  { id: "2", name: "Sarah Williams", email: "sarah@beauty.uk", phone: "+44 20 7946 0958", source: "chat", stage: "contacted", value: 18000, createdAt: "2026-05-04 09:14" },
  { id: "3", name: "Daria Kovalenko", email: "daria@startup.io", phone: "+380 67 891 2345", source: "form", stage: "qualified", value: 45000, createdAt: "2026-05-03 14:42" },
  { id: "4", name: "Mike Thompson", email: "mike@retail.uk", phone: "+44 161 234 5678", source: "phone", stage: "proposal", value: 32000, createdAt: "2026-05-02 11:15" },
  { id: "5", name: "Olha Bondarenko", email: "olha@cafe.ua", phone: "+380 93 555 1212", source: "form", stage: "won", value: 12000, createdAt: "2026-05-01 16:28" },
];

const STAGES = [
  { id: "new", labelEn: "New", labelUk: "Новий", color: "bg-neutral-400" },
  { id: "contacted", labelEn: "Contacted", labelUk: "Зв'язалися", color: "bg-blue-500" },
  { id: "qualified", labelEn: "Qualified", labelUk: "Кваліфікований", color: "bg-indigo-500" },
  { id: "proposal", labelEn: "Proposal", labelUk: "Пропозиція", color: "bg-amber-500" },
  { id: "won", labelEn: "Won", labelUk: "Виграно", color: "bg-emerald-500" },
];

const SOURCES = { form: "📝", chat: "💬", phone: "📞" };

export function IntCrmDemo({ isUk }: Props) {
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState("2026-05-04 10:34");

  const fmt = (uah: number) => isUk ? `${uah.toLocaleString("uk-UA")} ₴` : `£${Math.round(uah / 40)}`;

  const advance = (id: string) => {
    setLeads((ls) => ls.map((l) => {
      if (l.id !== id) return l;
      const idx = STAGES.findIndex((s) => s.id === l.stage);
      const next = STAGES[Math.min(idx + 1, STAGES.length - 1)];
      return { ...l, stage: next.id as Lead["stage"] };
    }));
  };

  const sync = () => {
    setSyncing(true);
    setTimeout(() => {
      // Simulate a new lead from CRM
      const newLead: Lead = {
        id: `${leads.length + 1}`,
        name: "New Lead from CRM",
        email: "new@example.com",
        phone: "+380 ...",
        source: "form",
        stage: "new",
        value: Math.floor(Math.random() * 30000) + 10000,
        createdAt: new Date().toISOString().slice(0, 16).replace("T", " "),
      };
      setLeads((ls) => [newLead, ...ls]);
      setLastSync(new Date().toISOString().slice(0, 16).replace("T", " "));
      setSyncing(false);
    }, 1200);
  };

  const totalPipeline = leads.reduce((s, l) => s + l.value, 0);
  const wonValue = leads.filter((l) => l.stage === "won").reduce((s, l) => s + l.value, 0);

  return (
    <div className="space-y-6">
      {/* Status bar */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-4 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-neutral-500 uppercase tracking-wider">Bitrix24</p>
            <p className="text-sm font-bold text-emerald-600">● {isUk ? "Підключено" : "Connected"}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div>
            <p className="text-xs text-neutral-500 uppercase">{isUk ? "Лідів" : "Leads"}</p>
            <p className="font-bold text-neutral-900 tabular-nums">{leads.length}</p>
          </div>
          <div>
            <p className="text-xs text-neutral-500 uppercase">{isUk ? "Pipeline" : "Pipeline"}</p>
            <p className="font-bold text-indigo-700 tabular-nums">{fmt(totalPipeline)}</p>
          </div>
          <div>
            <p className="text-xs text-neutral-500 uppercase">{isUk ? "Закрито" : "Won"}</p>
            <p className="font-bold text-emerald-600 tabular-nums">{fmt(wonValue)}</p>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2 text-xs text-neutral-500">
          <span>{isUk ? "Остання синхр.:" : "Last sync:"} {lastSync}</span>
          <button
            onClick={sync}
            disabled={syncing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 disabled:bg-neutral-300 transition-colors"
          >
            <RefreshCw className={`w-3 h-3 ${syncing ? "animate-spin" : ""}`} />
            {syncing ? (isUk ? "Синхронізація..." : "Syncing...") : (isUk ? "Синхр." : "Sync")}
          </button>
        </div>
      </div>

      {/* Pipeline columns */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
        {STAGES.map((stage) => {
          const stageLeads = leads.filter((l) => l.stage === stage.id);
          return (
            <div key={stage.id} className="rounded-xl border border-neutral-200 bg-neutral-50 overflow-hidden">
              <div className={`px-3 py-2 ${stage.color} text-white flex items-center justify-between`}>
                <span className="font-semibold text-sm">{isUk ? stage.labelUk : stage.labelEn}</span>
                <span className="px-1.5 py-0.5 rounded-full bg-white/20 text-xs font-bold tabular-nums">{stageLeads.length}</span>
              </div>
              <div className="p-2 space-y-2 min-h-[120px]">
                {stageLeads.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => advance(l.id)}
                    disabled={l.stage === "won"}
                    className="w-full text-left p-2 rounded-md bg-white border border-neutral-200 hover:border-indigo-300 hover:shadow-sm transition-all disabled:opacity-60 disabled:cursor-default group"
                  >
                    <p className="font-semibold text-neutral-900 text-xs leading-tight mb-0.5 flex items-center gap-1">
                      <span>{SOURCES[l.source]}</span>
                      <span className="truncate">{l.name}</span>
                    </p>
                    <p className="text-[10px] text-neutral-500 tabular-nums truncate">{l.email}</p>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-xs font-bold text-indigo-700 tabular-nums">{fmt(l.value)}</span>
                      {l.stage !== "won" && (
                        <ArrowRight className="w-3 h-3 text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </div>
                  </button>
                ))}
                {stageLeads.length === 0 && (
                  <p className="text-xs text-neutral-400 text-center py-3">—</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-sm text-neutral-500">
        {isUk
          ? "Інтеграція з Bitrix24 / HubSpot / Pipedrive: автоматичний імпорт лідів з форм, webhook → CRM API, статус-синхронізація, retry on failure."
          : "Bitrix24 / HubSpot / Pipedrive integration: auto-import leads from forms, webhook → CRM API, status sync, retry on failure."}
      </p>
    </div>
  );
}
