"use client";

import { useState, useRef } from "react";
import { Calculator, ChevronDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";
import type { NicheCalculatorStep } from "@/lib/data/niches";
import { useLocale } from "@/components/layout/LocaleProvider";

interface NicheCalculatorProps {
  steps: NicheCalculatorStep[];
  color: string;
  title?: string;
}

export function NicheCalculator({ steps, color, title }: NicheCalculatorProps) {
  const lang = useLocale();
  const isUk = lang === "uk";
  const resolvedTitle = title ?? (isUk ? "Калькулятор вартості" : "Price calculator");
  const [selections, setSelections] = useState<number[]>(Array(steps.length).fill(0));
  const [open, setOpen] = useState<number | null>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const total = steps.reduce((sum, step, i) => sum + step.options[selections[i]].price, 0);

  function select(stepIdx: number, optionIdx: number) {
    setSelections((prev) => {
      const next = [...prev];
      next[stepIdx] = optionIdx;
      return next;
    });
    setOpen(null);
  }

  return (
    <section className="py-20 bg-white dark:bg-neutral-900">
      <Container className="max-w-3xl">
        <div className="text-center mb-10">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5"
            style={{ backgroundColor: color + "20" }}
          >
            <Calculator className="w-7 h-7" style={{ color }} />
          </div>
          <h2 className="text-3xl font-bold font-syne text-neutral-900 dark:text-white mb-3">
            {resolvedTitle}
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400">
            {isUk ? "Оберіть параметри — отримайте орієнтовну вартість миттєво" : "Select parameters — get an estimated price instantly"}
          </p>
        </div>

        <div className="bg-neutral-50 dark:bg-neutral-900 dark:bg-neutral-800/60 rounded-3xl border border-neutral-100 dark:border-neutral-700 /50 overflow-hidden">
          {/* Steps */}
          <div className="p-6 md:p-8 space-y-4">
            {steps.map((step, stepIdx) => {
              const selected = step.options[selections[stepIdx]];
              const isOpen = open === stepIdx;
              const listboxId = `calc-listbox-${stepIdx}`;

              return (
                <div key={step.label} className="relative">
                  <label
                    id={`calc-label-${stepIdx}`}
                    className="text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-1.5 block"
                  >
                    {step.label}
                  </label>
                  {/* Dropdown trigger */}
                  <button
                    ref={(el) => { triggerRefs.current[stepIdx] = el; }}
                    onClick={() => setOpen(isOpen ? null : stepIdx)}
                    onKeyDown={(e) => {
                      if (e.key === "Escape" && isOpen) { e.preventDefault(); setOpen(null); }
                      if ((e.key === "ArrowDown" || e.key === " " || e.key === "Enter") && !isOpen) {
                        e.preventDefault(); setOpen(stepIdx);
                      }
                    }}
                    aria-expanded={isOpen}
                    aria-haspopup="listbox"
                    aria-controls={listboxId}
                    aria-labelledby={`calc-label-${stepIdx}`}
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-3.5 rounded-xl border-2 text-left transition-all bg-white dark:bg-neutral-700/80",
                      isOpen ? "shadow-md" : "border-neutral-200 dark:border-neutral-600 hover:border-neutral-300 dark:hover:border-neutral-500"
                    )}
                    style={isOpen ? { borderColor: color } : {}}
                  >
                    <span className="font-medium text-neutral-900 dark:text-white text-sm">
                      {selected.label}
                    </span>
                    <div className="flex items-center gap-3 shrink-0 ml-3">
                      {selected.price > 0 && (
                        <span className="text-sm font-semibold" style={{ color }}>
                          +{selected.price.toLocaleString("uk-UA")} ₴
                        </span>
                      )}
                      <ChevronDown className={cn("w-4 h-4 text-neutral-400 transition-transform", isOpen && "rotate-180")} />
                    </div>
                  </button>

                  {/* Dropdown options */}
                  {isOpen && (
                    <ul
                      id={listboxId}
                      role="listbox"
                      aria-labelledby={`calc-label-${stepIdx}`}
                      className="absolute z-10 top-full left-0 right-0 mt-1 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-lg overflow-hidden"
                    >
                      {step.options.map((opt, optIdx) => (
                        <li
                          key={opt.label}
                          role="option"
                          aria-selected={selections[stepIdx] === optIdx}
                          onClick={() => select(stepIdx, optIdx)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") { e.preventDefault(); select(stepIdx, optIdx); }
                            if (e.key === "Escape") { e.preventDefault(); setOpen(null); triggerRefs.current[stepIdx]?.focus(); }
                            if (e.key === "ArrowDown") { e.preventDefault(); const next = document.getElementById(`calc-listbox-${stepIdx}`)?.querySelectorAll("[role=option]")?.[optIdx + 1] as HTMLElement | undefined; next?.focus(); }
                            if (e.key === "ArrowUp") { e.preventDefault(); const prev = document.getElementById(`calc-listbox-${stepIdx}`)?.querySelectorAll("[role=option]")?.[optIdx - 1] as HTMLElement | undefined; prev?.focus(); }
                          }}
                          tabIndex={0}
                          className={cn(
                            "flex items-center justify-between px-4 py-3 text-sm text-left transition-colors cursor-pointer",
                            selections[stepIdx] === optIdx
                              ? "font-semibold"
                              : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-700/50"
                          )}
                          style={selections[stepIdx] === optIdx ? { color, backgroundColor: color + "10" } : {}}
                        >
                          <span>{opt.label}</span>
                          <span className={cn("text-xs font-medium", opt.price > 0 ? "" : "text-neutral-400")}>
                            {opt.price > 0 ? `+${opt.price.toLocaleString("uk-UA")} ₴` : (isUk ? "включено" : "included")}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>

          {/* Result */}
          <div
            className="px-6 md:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-5 border-t border-neutral-100 dark:border-neutral-700 /50"
            style={{ background: `linear-gradient(135deg, ${color}12 0%, ${color}06 100%)` }}
          >
            <div>
              <div className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">
                {isUk ? "Орієнтовна вартість:" : "Estimated price:"}
              </div>
              <div className="text-4xl font-bold font-syne" style={{ color }}>
                {total.toLocaleString("uk-UA")} ₴
              </div>
              <div className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">
                * {isUk ? "Фінальна ціна може відрізнятись після огляду" : "Final price may vary after review"}
              </div>
            </div>
            <a
              href={`/${lang}/contact`}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white whitespace-nowrap transition-opacity hover:opacity-90"
              style={{ backgroundColor: color }}
            >
              {isUk ? "Отримати точний розрахунок" : "Get an exact quote"}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
