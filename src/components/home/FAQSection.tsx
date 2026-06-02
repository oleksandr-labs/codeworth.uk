"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Container } from "@/components/layout/Container";

interface FAQItem {
  q: string;
  a: string;
}

const VISIBLE_COUNT = 3;

export function FAQSection({ items, isUk }: { items: FAQItem[]; isUk: boolean }) {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? items : items.slice(0, VISIBLE_COUNT);
  const hiddenCount = items.length - VISIBLE_COUNT;

  return (
    <section className="py-24 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800">
      <Container>
        <div className="max-w-2xl mx-auto text-center mb-12">
          <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="text-4xl font-heading font-extrabold text-neutral-900 dark:text-white">
            {isUk ? "Часті питання" : "Frequently Asked Questions"}
          </h2>
          <p className="mt-4 text-neutral-500 dark:text-neutral-400">
            {isUk
              ? "Відповіді на найпоширеніші запитання про розробку сайтів та роботу з Codeworth."
              : "Answers to the most common questions about website development and working with Codeworth."}
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {visible.map((item, i) => {
            const open = expanded === i;
            return (
              <div
                key={item.q}
                className="rounded-2xl border border-neutral-100 dark:border-neutral-700 bg-white dark:bg-neutral-800 overflow-hidden"
              >
                <button
                  onClick={() => setExpanded(open ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors"
                  aria-expanded={open}
                >
                  <h3 className="font-heading font-bold text-neutral-900 dark:text-white">{item.q}</h3>
                  {open
                    ? <ChevronUp className="w-5 h-5 text-indigo-500 shrink-0" />
                    : <ChevronDown className="w-5 h-5 text-neutral-400 dark:text-neutral-500 shrink-0" />
                  }
                </button>
                {open && (
                  <div className="px-6 pb-5">
                    <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {hiddenCount > 0 && (
          <div className="max-w-3xl mx-auto mt-6 text-center">
            <button
              onClick={() => setShowAll((v) => !v)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm font-semibold text-neutral-700 dark:text-neutral-300 hover:border-indigo-300 hover:text-indigo-600 dark:hover:border-indigo-500 dark:hover:text-indigo-400 transition-colors"
            >
              {showAll ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  {isUk ? "Згорнути" : "Show less"}
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  {isUk ? `Показати ще ${hiddenCount} питань` : `Show ${hiddenCount} more questions`}
                </>
              )}
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}
