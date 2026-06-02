"use client";

import { useState } from "react";
import { MessageCircle, Phone, Mail, Send } from "lucide-react";

interface Props {
  variant?: string;
  isUk: boolean;
}

const CHANNELS = [
  { icon: <Send className="w-4 h-4" />, label: { en: "Telegram", uk: "Telegram" }, bg: "bg-sky-500 hover:bg-sky-600", shadow: "shadow-sky-300/50" },
  { icon: <MessageCircle className="w-4 h-4" />, label: { en: "Viber", uk: "Viber" }, bg: "bg-violet-500 hover:bg-violet-600", shadow: "shadow-violet-300/50" },
  { icon: <Phone className="w-4 h-4" />, label: { en: "WhatsApp", uk: "WhatsApp" }, bg: "bg-emerald-500 hover:bg-emerald-600", shadow: "shadow-emerald-300/50" },
  { icon: <Mail className="w-4 h-4" />, label: { en: "Email", uk: "Email" }, bg: "bg-rose-500 hover:bg-rose-600", shadow: "shadow-rose-300/50" },
];

export function FabClusterDemo({ isUk }: Props) {
  const [open, setOpen] = useState(false);
  const [clicked, setClicked] = useState<string | null>(null);

  function handleClick(label: string) {
    setClicked(label);
    setTimeout(() => { setClicked(null); setOpen(false); }, 1500);
  }

  return (
    <div className="relative w-full min-h-[480px] bg-neutral-50 dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-700 overflow-hidden flex flex-col items-center justify-center">
      {/* Background hint */}
      <div className="text-center px-8 max-w-sm">
        <span className="text-5xl block mb-4">📲</span>
        <h3 className="font-heading text-xl font-bold text-neutral-800 dark:text-neutral-200 mb-2">
          {isUk ? "FAB Cluster — кнопки зв'язку" : "FAB Cluster — Contact Buttons"}
        </h3>
        <p className="text-neutral-500 dark:text-neutral-400 text-sm">
          {isUk
            ? "Натисніть зелену кнопку в куті → розгортається кластер каналів зв'язку."
            : "Click the green button in the corner → contact channel cluster expands."}
        </p>
      </div>

      {/* Page content placeholder */}
      <div className="mt-6 w-full max-w-xs mx-auto space-y-2 px-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-3 bg-neutral-200 rounded-full" style={{ width: `${90 - i * 10}%` }} />
        ))}
      </div>

      {/* Success toast */}
      {clicked && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-neutral-900 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
          {isUk ? `Відкривається ${clicked}...` : `Opening ${clicked}...`}
        </div>
      )}

      {/* FAB Cluster */}
      <div className="absolute bottom-6 right-6 flex flex-col items-end gap-2">
        {/* Channel buttons */}
        <div className={`flex flex-col items-end gap-2 transition-all duration-300 ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
          {CHANNELS.map((ch, i) => (
            <button
              key={i}
              onClick={() => handleClick(isUk ? ch.label.uk : ch.label.en)}
              className={`flex items-center gap-2 ${ch.bg} text-white rounded-full shadow-lg ${ch.shadow} px-3 py-2 text-sm font-semibold transition-all hover:scale-105`}
              style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
            >
              <span className="text-xs">{isUk ? ch.label.uk : ch.label.en}</span>
              {ch.icon}
            </button>
          ))}
        </div>

        {/* Main FAB button */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close" : "Contact us"}
          className={`w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-xl shadow-green-300/50 flex items-center justify-center transition-all duration-300 ${open ? "rotate-45" : "rotate-0"}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            className="w-6 h-6"
          >
            <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Label */}
      <div className="absolute bottom-9 right-24 text-xs text-neutral-400 font-medium">
        {isUk ? "Зв'язатися" : "Contact us"}
      </div>
    </div>
  );
}
