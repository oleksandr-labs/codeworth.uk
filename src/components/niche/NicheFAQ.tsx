"use client";

import { useState } from "react";
import { BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import { Container } from "@/components/layout/Container";

interface NicheFAQItem {
  question: string;
  questionUk: string;
  answer: string;
  answerUk: string;
}

const VISIBLE_COUNT = 3;

export function NicheFAQ({
  items,
  isUk,
  accentColor = "text-violet-400",
}: {
  items: NicheFAQItem[];
  isUk: boolean;
  accentColor?: string;
}) {
  const [expanded, setExpanded] = useState<number | null>(0);
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? items : items.slice(0, VISIBLE_COUNT);
  const hiddenCount = items.length - VISIBLE_COUNT;

  return (
    <section className="py-16 bg-slate-900">
      <Container>
        <h2 className="text-3xl font-bold text-white mb-10">
          {isUk ? "Часті запитання" : "FAQ"}
        </h2>
        <div className="max-w-3xl space-y-4">
          {visible.map((f, i) => {
            const open = expanded === i;
            return (
              <div key={i} className="rounded-xl border border-slate-700 bg-slate-800/50 overflow-hidden">
                <button
                  onClick={() => setExpanded(open ? null : i)}
                  className="w-full flex items-start justify-between gap-3 p-6 text-left"
                  aria-expanded={open}
                >
                  <h3 className="font-semibold text-white flex items-start gap-2">
                    <BookOpen className={`w-4 h-4 ${accentColor} shrink-0 mt-0.5`} />
                    {isUk ? f.questionUk : f.question}
                  </h3>
                  {open
                    ? <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" />
                    : <ChevronDown className="w-5 h-5 text-slate-500 shrink-0" />}
                </button>
                {open && (
                  <p className="text-slate-300 text-sm leading-relaxed px-6 pb-6">
                    {isUk ? f.answerUk : f.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {hiddenCount > 0 && (
          <div className="max-w-3xl mt-6">
            <button
              onClick={() => setShowAll((v) => !v)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-700 bg-slate-800/50 text-sm font-semibold text-slate-300 hover:border-violet-500 hover:text-white transition-colors"
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
