"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { NicheScheduleItem } from "@/lib/data/niches";

interface ScheduleFilterProps {
  items: NicheScheduleItem[];
  lang: string;
  color: string;
}

export function ScheduleFilter({ items, lang, color }: ScheduleFilterProps) {
  const isUk = lang === "uk";

  // Derive ordered unique days from the data
  const days = useMemo(() => {
    const seen = new Set<string>();
    const ordered: string[] = [];
    for (const item of items) {
      if (!seen.has(item.day)) {
        seen.add(item.day);
        ordered.push(item.day);
      }
    }
    return [isUk ? "Всі" : "All", ...ordered];
  }, [items, isUk]);

  // Derive unique categories from data
  const categories = useMemo(() => {
    const unique = Array.from(new Set(items.map((i) => i.category)));
    return [isUk ? "Всі" : "All", ...unique];
  }, [items, isUk]);

  const [activeDay, setActiveDay] = useState(days[0]);
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const allDay = isUk ? "Всі" : "All";
      const allCat = isUk ? "Всі" : "All";
      const dayMatch = activeDay === allDay || item.day === activeDay;
      const catMatch = activeCategory === allCat || item.category === activeCategory;
      return dayMatch && catMatch;
    });
  }, [items, activeDay, activeCategory, isUk]);

  const spotsColor = (left: number, total: number) => {
    const ratio = left / total;
    if (ratio <= 0.2) return "#dc2626";
    if (ratio <= 0.5) return "#d97706";
    return "#16a34a";
  };

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col gap-3 mb-8">
        {/* Day chips */}
        <div className="flex flex-wrap gap-2">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
              style={
                activeDay === day
                  ? { backgroundColor: color, color: "#fff" }
                  : { backgroundColor: "transparent", border: `1.5px solid ${color}`, color }
              }
            >
              {day}
            </button>
          ))}
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-neutral-500 dark:text-neutral-400 mr-1">
            {isUk ? "Напрям:" : "Type:"}
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
              style={
                activeCategory === cat
                  ? { backgroundColor: color, color: "#fff" }
                  : { backgroundColor: "rgba(0,0,0,0.04)", color: "currentColor", border: "1.5px solid #e5e7eb" }
              }
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-neutral-400 dark:text-neutral-500 mb-6">
        {isUk
          ? `Занять: ${filtered.length}`
          : `${filtered.length} class${filtered.length !== 1 ? "es" : ""}`}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-neutral-400 dark:text-neutral-500">
          <div className="text-5xl mb-4">🗓️</div>
          <p className="text-lg font-medium mb-2">
            {isUk ? "Занять не знайдено" : "No classes found"}
          </p>
          <button
            onClick={() => { setActiveDay(days[0]); setActiveCategory(categories[0]); }}
            className="mt-2 text-sm underline"
            style={{ color }}
          >
            {isUk ? "Скинути фільтри" : "Reset filters"}
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {filtered.map((item) => {
            const sc = spotsColor(item.spotsLeft, item.spots);
            return (
              <div
                key={item.id}
                className="group flex bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-700/50 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                {/* Colored left stripe */}
                <div className={`w-2 shrink-0 bg-linear-to-b ${item.gradient}`} />

                <div className="flex flex-col flex-1 p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <h3 className="font-semibold text-sm text-neutral-900 dark:text-white leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-xs text-neutral-400 dark:text-neutral-500">
                          {item.trainer}
                        </p>
                      </div>
                    </div>
                    {item.badge && (
                      <span className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full text-white ${item.badgeColor ?? "bg-neutral-500"}`}>
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400 mb-3">
                    <span>📅 {item.day}</span>
                    <span>🕐 {item.time}</span>
                    <span>⏱ {item.duration}</span>
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold" style={{ color: sc }}>
                      {item.spotsLeft > 0
                        ? (isUk ? `${item.spotsLeft} місць з ${item.spots}` : `${item.spotsLeft}/${item.spots} spots`)
                        : (isUk ? "Немає місць" : "Full")}
                    </span>
                    <Link
                      href={`/${lang}/contact`}
                      className="text-[11px] font-semibold px-3 py-1.5 rounded-lg text-white transition-opacity hover:opacity-90"
                      style={{ backgroundColor: item.spotsLeft > 0 ? color : "#9ca3af" }}
                    >
                      {isUk ? "Записатись" : "Book"}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
