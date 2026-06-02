"use client";

import { useState } from "react";
import { Search, MessageCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { EmptyState } from "@/components/ui/EmptyState";
import { useLocale } from "@/components/layout/LocaleProvider";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQSection {
  id: string;
  title: string;
  items: FAQItem[];
}

interface Props {
  sections: FAQSection[];
}

export function FAQContent({ sections }: Props) {
  const lang = useLocale();
  const isUk = lang === "uk";
  const [query, setQuery] = useState("");

  const searchResults = query.trim()
    ? sections.flatMap((s) =>
        s.items
          .filter(
            (item) =>
              item.q.toLowerCase().includes(query.toLowerCase()) ||
              item.a.toLowerCase().includes(query.toLowerCase())
          )
          .map((item) => ({ ...item, section: s.title }))
      )
    : null;

  return (
    <>
      {/* Search */}
      <div className="max-w-xl mx-auto mb-12">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isUk ? "Пошук у FAQ..." : "Search FAQ..."}
            className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all placeholder:text-neutral-400 text-neutral-900"
          />
        </div>
      </div>

      <div className="max-w-3xl mx-auto space-y-16">
        {searchResults !== null ? (
          /* Search results */
          searchResults.length === 0 ? (
            <div className="text-center py-12 text-neutral-400">
              <EmptyState variant="search" size={120} className="mb-3" />
              <p>{isUk ? `Нічого не знайдено за запитом «${query}».` : `Nothing found for "${query}".`}</p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
                {isUk
                  ? `Знайдено: ${searchResults.length} результат${searchResults.length !== 1 ? "и" : ""}`
                  : `Found: ${searchResults.length} result${searchResults.length !== 1 ? "s" : ""}`}
              </p>
              {searchResults.map((item, i) => (
                <details
                  key={i}
                  className="group p-6 rounded-2xl border border-neutral-100 dark:border-neutral-700 open:border-indigo-100 open:shadow-sm transition-all"
                >
                  <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                    <div>
                      <span className="text-xs text-indigo-500 font-medium mb-1 block">{item.section}</span>
                      <h3 className="font-heading font-bold text-neutral-900 dark:text-white group-open:text-indigo-700 transition-colors">
                        {item.q}
                      </h3>
                    </div>
                    <span className="text-neutral-400 group-open:text-indigo-600 group-open:rotate-180 transition-transform shrink-0 mt-0.5">▼</span>
                  </summary>
                  <p className="mt-4 text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          )
        ) : (
          /* Full sections view */
          sections.map((section) => (
            <div key={section.id} id={section.id}>
              <h2 className="text-2xl font-heading font-extrabold text-neutral-900 dark:text-white mb-6 pb-3 border-b border-neutral-100">
                {section.title}
              </h2>
              <div className="space-y-4">
                {section.items.map((item, i) => (
                  <details
                    key={i}
                    className="group p-6 rounded-2xl border border-neutral-100 dark:border-neutral-700 open:border-indigo-100 open:shadow-sm transition-all"
                  >
                    <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                      <h3 className="font-heading font-bold text-neutral-900 dark:text-white group-open:text-indigo-700 transition-colors">
                        {item.q}
                      </h3>
                      <span className="text-neutral-400 group-open:text-indigo-600 group-open:rotate-180 transition-transform shrink-0 mt-0.5">▼</span>
                    </summary>
                    <p className="mt-4 text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          ))
        )}

        {/* Not found CTA */}
        <div className="p-8 rounded-2xl bg-indigo-50 border border-indigo-100 text-center">
          <MessageCircle className="w-10 h-10 text-indigo-500 mx-auto mb-3" />
          <h3 className="text-xl font-heading font-bold text-neutral-900 dark:text-white mb-2">{isUk ? "Не знайшли відповідь?" : "Didn't find an answer?"}</h3>
          <p className="text-neutral-600 dark:text-neutral-300 mb-5 text-sm">
            {isUk ? "Напишіть нам у Telegram або на email — відповімо протягом 2 годин." : "Message us on Telegram or email — we'll reply within 2 hours."}
          </p>
          <Link
            href={`/${lang}/contact`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
          >
            {isUk ? "Написати нам" : "Contact us"}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </>
  );
}
