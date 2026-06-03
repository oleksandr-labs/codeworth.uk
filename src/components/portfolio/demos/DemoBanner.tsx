"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * Floating chrome for full-screen portfolio demos.
 * Sits bottom-left (clear of demos that use bottom-right, e.g. AgencyDesk timer).
 * Gives the visitor a way out (back to the case study) + a conversion CTA.
 */
export function DemoBanner({ lang, slug }: { lang: string; slug: string }) {
  const [open, setOpen] = useState(true);
  const isUk = lang === "uk";
  const casePath = lang === "en" ? `/portfolio/${slug}` : `/${lang}/portfolio/${slug}`;
  const contactPath = lang === "en" ? `/contact` : `/${lang}/contact`;

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 left-4 z-[60] w-10 h-10 rounded-full bg-neutral-900/90 text-white text-lg shadow-xl backdrop-blur flex items-center justify-center hover:bg-neutral-800 transition-colors"
        aria-label={isUk ? "Показати панель демо" : "Show demo bar"}
      >
        ℹ
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-[60] flex items-center gap-2 bg-neutral-900/90 text-white rounded-2xl shadow-2xl backdrop-blur px-3 py-2 border border-white/10 max-w-[calc(100vw-2rem)]">
      <span className="text-[10px] uppercase tracking-widest text-white/40 hidden sm:inline px-1">
        {isUk ? "Демо Codeworth" : "Codeworth demo"}
      </span>
      <Link
        href={casePath}
        className="text-xs font-medium px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors whitespace-nowrap"
      >
        ← {isUk ? "До кейсу" : "Case study"}
      </Link>
      <Link
        href={contactPath}
        className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 transition-colors whitespace-nowrap"
      >
        {isUk ? "Замовити подібну систему" : "Order a system like this"}
      </Link>
      <button
        onClick={() => setOpen(false)}
        className="w-6 h-6 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors text-sm flex items-center justify-center"
        aria-label={isUk ? "Згорнути" : "Dismiss"}
      >
        ✕
      </button>
    </div>
  );
}
