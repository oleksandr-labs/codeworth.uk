"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, MessageCircle } from "lucide-react";

interface Props {
  lang: string;
  serviceName: string;
}

export function ServiceStickyCta({ lang, serviceName }: Props) {
  const isUk = lang === "uk";
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.body.scrollHeight - window.innerHeight;
      if (total > 0 && scrolled / total > 0.45) {
        setVisible(true);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible || dismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-white dark:bg-neutral-900 border-t border-gray-200 dark:border-neutral-700 shadow-2xl shadow-black/10 safe-area-pb">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center shrink-0">
            <MessageCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
              {isUk
                ? `Цікавить «${serviceName}»?`
                : `Interested in ${serviceName}?`}
            </p>
            <p className="text-xs text-gray-500 dark:text-neutral-400 dark:text-gray-400 dark:text-neutral-500 hidden sm:block">
              {isUk ? "Отримайте безкоштовну консультацію за 24 год" : "Get a free consultation within 24 hours"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href={`/${lang}/contact`}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-colors whitespace-nowrap"
          >
            {isUk ? "Замовити консультацію" : "Book a Free Call"}
          </Link>
          <button
            onClick={() => setDismissed(true)}
            aria-label={isUk ? "Закрити" : "Dismiss"}
            className="p-2 text-gray-400 dark:text-neutral-500 hover:text-gray-600 dark:text-neutral-300 dark:hover:text-gray-300 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
