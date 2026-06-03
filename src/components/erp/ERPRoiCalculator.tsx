"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, TrendingDown, Banknote, Clock, Building2 } from "lucide-react";

interface Props {
  lang: string;
}

export function ERPRoiCalculator({ lang }: Props) {
  const isUk = lang === "uk";

  const [staff,     setStaff]     = useState(12);
  const [adminHrs,  setAdminHrs]  = useState(8);
  const [hourly,    setHourly]    = useState(18);
  const [locations, setLocations] = useState(3);

  const lp = (p: string) => lang === "en" ? p : `/${lang}${p}`;

  const annualAdminCost   = staff * adminHrs * hourly * 52;
  const estimatedSaving   = Math.round(annualAdminCost * 0.68);
  const projectCost       = locations <= 2 ? 2999 : locations <= 4 ? 3999 : locations <= 7 ? 4999 : 5999;
  const paybackMonths     = Math.ceil((projectCost / (estimatedSaving / 12)));

  const fmt = (n: number) =>
    isUk
      ? `£${n.toLocaleString("en-GB")}`
      : `£${n.toLocaleString("en-GB")}`;

  const SLIDER_CLASS =
    "w-full h-1.5 rounded-full bg-indigo-100 dark:bg-indigo-950 accent-indigo-600 cursor-pointer";

  return (
    <section className="py-20 bg-indigo-50 dark:bg-indigo-950/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-3">
            {isUk ? "Калькулятор ROI" : "ROI Calculator"}
          </p>
          <h2 className="text-3xl font-heading font-extrabold text-neutral-900 dark:text-white">
            {isUk
              ? "Скільки ви зараз витрачаєте на ручну роботу?"
              : "How much are manual processes costing you?"}
          </h2>
          <p className="mt-3 text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto">
            {isUk
              ? "Введіть дані свого бізнесу — побачите річну вартість ручних процесів і скільки може заощадити кастомна ERP."
              : "Enter your numbers to see the real annual cost of manual work — and how much a custom ERP could save you."}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Inputs */}
          <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 space-y-6">
            <h3 className="font-heading font-bold text-neutral-900 dark:text-white text-sm uppercase tracking-wider">
              {isUk ? "Ваш бізнес" : "Your business"}
            </h3>

            {[
              {
                icon: Building2,
                label: { en: "Number of locations / sites", uk: "Кількість точок / локацій" },
                value: locations, min: 1, max: 20, step: 1,
                display: locations.toString(),
                setter: (v: number) => setLocations(v),
              },
              {
                icon: Clock,
                label: { en: "Staff spending time on admin tasks", uk: "Співробітників, що витрачають час на адмін" },
                value: staff, min: 1, max: 100, step: 1,
                display: staff.toString(),
                setter: (v: number) => setStaff(v),
              },
              {
                icon: Clock,
                label: { en: "Average admin hours per person per week", uk: "Середня кількість адмін-годин на людину/тиждень" },
                value: adminHrs, min: 1, max: 40, step: 1,
                display: `${adminHrs}h`,
                setter: (v: number) => setAdminHrs(v),
              },
              {
                icon: Banknote,
                label: { en: "Average hourly staff cost (£)", uk: "Середня вартість години праці (£)" },
                value: hourly, min: 10, max: 60, step: 1,
                display: `£${hourly}`,
                setter: (v: number) => setHourly(v),
              },
            ].map((s) => (
              <div key={isUk ? s.label.uk : s.label.en}>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-2">
                    <s.icon className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                    {isUk ? s.label.uk : s.label.en}
                  </label>
                  <span className="text-sm font-bold text-indigo-700 dark:text-indigo-300 tabular-nums min-w-10 text-right">
                    {s.display}
                  </span>
                </div>
                <input
                  type="range"
                  min={s.min} max={s.max} step={s.step}
                  value={s.value}
                  onChange={(e) => s.setter(Number(e.target.value))}
                  className={SLIDER_CLASS}
                />
                <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
                  <span>{s.min}</span><span>{s.max}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Output */}
          <div className="flex flex-col gap-4">
            {/* Main result */}
            <div className="bg-neutral-900 dark:bg-neutral-950 rounded-2xl p-6 text-white flex-1">
              <p className="text-xs text-neutral-500 uppercase tracking-wider mb-5">
                {isUk ? "Ваш розрахунок" : "Your numbers"}
              </p>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-400">
                    {isUk ? "Вартість ручних процесів/рік" : "Annual manual process cost"}
                  </span>
                  <span className="text-xl font-black text-red-400 tabular-nums">{fmt(annualAdminCost)}</span>
                </div>

                <div className="h-px bg-neutral-800" />

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-neutral-300 font-medium">
                      {isUk ? "Потенційна економія з ERP" : "Potential ERP savings"}
                    </span>
                    <span className="block text-[10px] text-neutral-600 mt-0.5">
                      {isUk ? "68% автоматизація на основі наших кейсів" : "68% automation based on our case studies"}
                    </span>
                  </div>
                  <span className="text-2xl font-black text-emerald-400 tabular-nums">{fmt(estimatedSaving)}</span>
                </div>

                <div className="h-px bg-neutral-800" />

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 rounded-xl p-3 text-center">
                    <div className="text-xs text-neutral-500 mb-1">
                      {isUk ? "Орієнтовна вартість ERP" : "ERP investment"}
                    </div>
                    <div className="text-lg font-black text-white tabular-nums">{fmt(projectCost)}</div>
                  </div>
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 text-center">
                    <div className="text-xs text-emerald-400/70 mb-1">
                      {isUk ? "Окупність" : "Payback period"}
                    </div>
                    <div className="text-lg font-black text-emerald-400 tabular-nums">
                      {paybackMonths} {isUk ? "міс" : "mo"}
                    </div>
                  </div>
                </div>

                {/* Bar visualisation */}
                <div className="pt-2 space-y-2">
                  <div>
                    <div className="flex justify-between text-[10px] text-neutral-600 mb-1">
                      <span>{isUk ? "Поточні витрати" : "Current cost"}</span>
                      <span className="text-red-400">{fmt(annualAdminCost)}/yr</span>
                    </div>
                    <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                      <div className="h-2 bg-red-500/60 rounded-full w-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] text-neutral-600 mb-1">
                      <span>{isUk ? "Залишкові витрати після ERP" : "After ERP"}</span>
                      <span className="text-emerald-400">{fmt(annualAdminCost - estimatedSaving)}/yr</span>
                    </div>
                    <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-2 bg-emerald-500/60 rounded-full transition-all duration-300"
                        style={{ width: `${Math.round(((annualAdminCost - estimatedSaving) / annualAdminCost) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-indigo-600 rounded-2xl p-5 text-white">
              <div className="flex items-start gap-3">
                <TrendingDown className="w-5 h-5 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold text-sm">
                    {isUk
                      ? `Ваш бізнес може заощадити ${fmt(estimatedSaving)} щорічно`
                      : `Your business could save ${fmt(estimatedSaving)} every year`}
                  </p>
                  <p className="text-indigo-200 text-xs mt-1">
                    {isUk
                      ? "Безкоштовний discovery-дзвінок — отримайте точну оцінку під ваш процес."
                      : "Free discovery call — get a precise estimate tailored to your processes."}
                  </p>
                </div>
              </div>
              <Link
                href={lp("/contact?source=roi-calc")}
                className="mt-4 flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white text-indigo-700 font-semibold text-sm hover:bg-indigo-50 transition-colors"
              >
                {isUk ? "Отримати безкоштовну оцінку" : "Get a free estimate"}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <p className="text-[10px] text-neutral-400 text-center">
              {isUk
                ? "* Оцінка базована на реальних кейсах клієнтів. Точна економія залежить від конкретних процесів."
                : "* Estimate based on real client outcomes. Actual savings depend on your specific processes."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
