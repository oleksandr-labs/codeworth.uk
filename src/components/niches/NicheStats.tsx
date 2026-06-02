"use client";

import { CountUp } from "@/components/ui/CountUp";
import { useLocale } from "@/components/layout/LocaleProvider";

interface StatItem {
  end: number;
  suffix: string;
  label: string;
  description: string;
}

const STATS_UK: StatItem[] = [
  { end: 34, suffix: "+", label: "Ніш", description: "готових рішень для різних бізнесів" },
  { end: 500, suffix: "+", label: "Проєктів", description: "успішно запущено клієнтам" },
  { end: 98, suffix: "%", label: "Задоволених", description: "клієнтів повертаються знову" },
  { end: 7, suffix: "+", label: "Років", description: "досвіду у веб-розробці" },
];

const STATS_EN: StatItem[] = [
  { end: 34, suffix: "+", label: "Niches", description: "ready-made solutions for different businesses" },
  { end: 500, suffix: "+", label: "Projects", description: "successfully launched for clients" },
  { end: 98, suffix: "%", label: "Satisfied", description: "clients return again" },
  { end: 7, suffix: "+", label: "Years", description: "of web development experience" },
];

interface NicheStatsProps {
  color: string;
}

export function NicheStats({ color }: NicheStatsProps) {
  const isUk = useLocale() === "uk";
  const STATS = isUk ? STATS_UK : STATS_EN;
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {STATS.map((stat) => (
        <div
          key={stat.label}
          className="text-center p-6 rounded-2xl bg-white dark:bg-neutral-800/60 border border-neutral-100 dark:border-neutral-700/50 shadow-sm hover:shadow-md transition-shadow"
        >
          <div
            className="text-4xl font-bold font-syne mb-1"
            style={{ color }}
          >
            <CountUp end={stat.end} suffix={stat.suffix} duration={1600} />
          </div>
          <div className="font-semibold text-neutral-800 dark:text-neutral-200 text-sm mb-1">
            {stat.label}
          </div>
          <div className="text-xs text-neutral-500 dark:text-neutral-400 leading-snug">
            {stat.description}
          </div>
        </div>
      ))}
    </div>
  );
}
