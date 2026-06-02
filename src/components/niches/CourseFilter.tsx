"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { NicheCourseCard } from "@/lib/data/niches";

interface CourseFilterProps {
  courses: NicheCourseCard[];
  lang: string;
  color: string;
}

const LEVELS_UK = ["Всі рівні", "Початківець", "Середній", "Просунутий"];
const LEVELS_EN = ["All levels", "Beginner", "Intermediate", "Advanced"];

// Map EN level labels used in data (stored in Ukrainian) to EN filter labels
const LEVEL_MAP_UK_TO_EN: Record<string, string> = {
  "Початківець": "Beginner",
  "Середній": "Intermediate",
  "Просунутий": "Advanced",
};

export function CourseFilter({ courses, lang, color }: CourseFilterProps) {
  const isUk = lang === "uk";
  const levels = isUk ? LEVELS_UK : LEVELS_EN;

  const categories = useMemo(() => {
    const unique = Array.from(new Set(courses.map((c) => c.category)));
    return [isUk ? "Всі" : "All", ...unique];
  }, [courses, isUk]);

  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [activeLevel, setActiveLevel] = useState(levels[0]);

  const filtered = useMemo(() => {
    return courses.filter((course) => {
      const catAll = isUk ? "Всі" : "All";
      const catMatch = activeCategory === catAll || course.category === activeCategory;

      const lvlAll = isUk ? "Всі рівні" : "All levels";
      let lvlMatch = activeLevel === lvlAll;
      if (!lvlMatch) {
        if (isUk) {
          lvlMatch = course.level === activeLevel;
        } else {
          // Data stored in Ukrainian, filter label is English
          const ukLevel = Object.entries(LEVEL_MAP_UK_TO_EN).find(
            ([, en]) => en === activeLevel
          )?.[0];
          lvlMatch = course.level === ukLevel || course.level === activeLevel;
        }
      }

      return catMatch && lvlMatch;
    });
  }, [courses, activeCategory, activeLevel, isUk]);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col gap-3 mb-8">
        {/* Category chips */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
              style={
                activeCategory === cat
                  ? { backgroundColor: color, color: "#fff" }
                  : { backgroundColor: "transparent", border: `1.5px solid ${color}`, color }
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Level chips */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-neutral-500 dark:text-neutral-400 mr-1">
            {isUk ? "Рівень:" : "Level:"}
          </span>
          {levels.map((lvl) => (
            <button
              key={lvl}
              onClick={() => setActiveLevel(lvl)}
              className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
              style={
                activeLevel === lvl
                  ? { backgroundColor: color, color: "#fff" }
                  : { backgroundColor: "rgba(0,0,0,0.04)", color: "currentColor", border: "1.5px solid #e5e7eb" }
              }
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-neutral-400 dark:text-neutral-500 mb-6">
        {isUk
          ? `Курсів: ${filtered.length}`
          : `${filtered.length} course${filtered.length !== 1 ? "s" : ""}`}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-neutral-400 dark:text-neutral-500">
          <div className="text-5xl mb-4">📚</div>
          <p className="text-lg font-medium mb-2">
            {isUk ? "Курсів не знайдено" : "No courses found"}
          </p>
          <button
            onClick={() => { setActiveCategory(categories[0]); setActiveLevel(levels[0]); }}
            className="mt-2 text-sm underline"
            style={{ color }}
          >
            {isUk ? "Скинути фільтри" : "Reset filters"}
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {filtered.map((course) => (
            <div
              key={course.id}
              className="group flex flex-col bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-700/50 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div className={`relative h-32 bg-linear-to-br ${course.gradient} flex items-center justify-center`}>
                <span className="text-5xl opacity-90">{course.icon}</span>
                {course.badge && (
                  <span className={`absolute top-2 left-2 ${course.badgeColor ?? "bg-neutral-700"} text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full`}>
                    {course.badge}
                  </span>
                )}
                <span className="absolute top-2 right-2 bg-black/40 text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
                  {course.category}
                </span>
              </div>

              <div className="flex flex-col flex-1 p-4">
                <p className="text-[10px] text-neutral-400 dark:text-neutral-500 font-medium mb-1">
                  {course.level} · {course.duration}
                </p>
                <h3 className="font-semibold text-sm text-neutral-900 dark:text-white mb-2 leading-snug flex-1">
                  {course.title}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">
                  👤 {course.instructor}
                </p>

                <div className="flex items-center gap-3 text-[11px] text-neutral-500 dark:text-neutral-400 mb-3">
                  <span>⭐ {course.rating}</span>
                  <span>📚 {course.lessonsCount} {isUk ? "уроків" : "lessons"}</span>
                </div>
                <p className="text-[10px] text-neutral-400 dark:text-neutral-500 mb-2">
                  👥 {course.studentsCount}
                </p>

                {course.tags && course.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {course.tags.map((tag) => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-auto flex items-center justify-between gap-2">
                  <div className="flex flex-col">
                    <span className="text-base font-bold font-syne" style={{ color }}>
                      {course.price}
                    </span>
                    {course.originalPrice && (
                      <span className="text-xs text-neutral-400 line-through">
                        {course.originalPrice}
                      </span>
                    )}
                  </div>
                  <Link
                    href={`/${lang}/contact`}
                    className="text-[11px] font-semibold px-3 py-1.5 rounded-lg border transition-colors shrink-0"
                    style={{ borderColor: color, color }}
                  >
                    {isUk ? "Записатись" : "Sign Up"}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
