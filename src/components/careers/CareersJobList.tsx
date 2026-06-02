"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { MapPin, Clock, Briefcase, ArrowRight } from "lucide-react";
import type { JobPosting } from "@/lib/data/careers";

type DeptFilter = "all" | string;
type FormatFilter = "all" | "remote" | "hybrid";

function deriveFormat(locationUk: string): "remote" | "hybrid" {
  return locationUk.includes("/") ? "hybrid" : "remote";
}

interface CareersJobListProps {
  jobs: JobPosting[];
  lang: string;
  isUk: boolean;
}

export function CareersJobList({ jobs, lang, isUk }: CareersJobListProps) {
  const [dept, setDept] = useState<DeptFilter>("all");
  const [format, setFormat] = useState<FormatFilter>("all");

  const departments = useMemo(() => {
    const seen = new Set<string>();
    jobs.forEach((j) => {
      const name = isUk ? j.departmentUk : j.departmentEn;
      seen.add(name);
    });
    return Array.from(seen);
  }, [jobs, isUk]);

  const filtered = useMemo(() => {
    return jobs.filter((j) => {
      const jobDept = isUk ? j.departmentUk : j.departmentEn;
      if (dept !== "all" && jobDept !== dept) return false;
      if (format !== "all" && deriveFormat(j.locationUk) !== format) return false;
      return true;
    });
  }, [jobs, dept, format, isUk]);

  const btnBase =
    "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border";
  const btnActive = "bg-indigo-600 text-white border-indigo-600";
  const btnInactive = "bg-white text-gray-600 dark:text-neutral-300 border-gray-200 dark:border-neutral-700 hover:border-indigo-300 hover:text-indigo-600";

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Department filter */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-gray-500 dark:text-neutral-400 shrink-0">
            {isUk ? "Відділ:" : "Dept:"}
          </span>
          <button
            onClick={() => setDept("all")}
            className={`${btnBase} ${dept === "all" ? btnActive : btnInactive}`}
          >
            {isUk ? "Всі" : "All"}
          </button>
          {departments.map((d) => (
            <button
              key={d}
              onClick={() => setDept(d)}
              className={`${btnBase} ${dept === d ? btnActive : btnInactive}`}
            >
              {d}
            </button>
          ))}
        </div>

        {/* Format filter */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-gray-500 dark:text-neutral-400 shrink-0">
            {isUk ? "Формат:" : "Format:"}
          </span>
          {(
            [
              { value: "all", labelUk: "Всі", labelEn: "All" },
              { value: "remote", labelUk: "Remote", labelEn: "Remote" },
              { value: "hybrid", labelUk: "Гібрид", labelEn: "Hybrid" },
            ] as const
          ).map(({ value, labelUk, labelEn }) => (
            <button
              key={value}
              onClick={() => setFormat(value)}
              className={`${btnBase} ${format === value ? btnActive : btnInactive}`}
            >
              {isUk ? labelUk : labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Heading with live count */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {isUk ? "Відкриті вакансії" : "Open Positions"} ({filtered.length})
      </h2>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <Briefcase className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-lg">
            {isUk
              ? "За вашими фільтрами вакансій не знайдено"
              : "No positions found for your filters"}
          </p>
          <button
            onClick={() => { setDept("all"); setFormat("all"); }}
            className="mt-4 text-indigo-600 hover:underline text-sm font-medium"
          >
            {isUk ? "Скинути фільтри" : "Reset filters"}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((job) => (
            <Link
              key={job.slug}
              href={`/${lang}/careers/${job.slug}`}
              className="block bg-white dark:bg-neutral-800 rounded-2xl p-6 border border-gray-200 dark:border-neutral-700 hover:border-indigo-300 hover:shadow-md transition-all group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-700 transition-colors">
                      {isUk ? job.titleUk : job.titleEn}
                    </h3>
                    {job.isUrgent && (
                      <span className="text-xs font-medium bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                        {isUk ? "Терміново" : "Urgent"}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      {isUk ? job.departmentUk : job.departmentEn}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {isUk ? job.locationUk : job.locationEn}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {isUk ? job.typeUk : job.typeEn}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {job.salaryMin.toLocaleString()} – {job.salaryMax.toLocaleString()}{" "}
                      {job.currency}
                    </p>
                    <p className="text-xs text-gray-400">
                      {isUk ? "на місяць" : "per month"}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-indigo-500 transition-colors shrink-0" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
