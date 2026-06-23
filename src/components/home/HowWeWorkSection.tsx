import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { FileSearch, Database, Code2, Rocket, Activity, ArrowRight } from "lucide-react";

const STEPS_UK = [
  {
    number: "01",
    icon: FileSearch,
    title: "Discovery та аудит даних",
    description: "Аналізуємо бізнес-задачу, дані та KPI. Перевіряємо feasibility, обираємо підхід і складаємо roadmap з фіксованою ціною.",
    duration: "1–2 тижні",
    color: "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-900",
  },
  {
    number: "02",
    icon: Database,
    title: "Підготовка даних",
    description: "Збір, очищення, feature engineering та формування навчальних датасетів. EDA та валідація якості.",
    duration: "2–4 тижні",
    color: "bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 border-violet-100 dark:border-violet-900",
  },
  {
    number: "03",
    icon: Code2,
    title: "Навчання та оцінка",
    description: "Тренуємо та валідуємо моделі, порівнюємо підходи, обираємо найкращу архітектуру за вашими метриками.",
    duration: "2–6 тижнів",
    color: "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Деплой та інтеграція",
    description: "Упаковуємо модель у Docker, підключаємо REST API, налаштовуємо CI/CD та моніторинг дрейфу.",
    duration: "1–3 тижні",
    color: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900",
  },
  {
    number: "05",
    icon: Activity,
    title: "Моніторинг та перенавчання",
    description: "Відстежуємо деградацію якості, автоматично ребілдуємо при дрейфі даних і додаємо нові фічі.",
    duration: "Ongoing",
    color: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-900",
  },
];

const STEPS_EN = [
  {
    number: "01",
    icon: FileSearch,
    title: "Discovery & Data Audit",
    description: "We analyse the business objective, data and KPIs. Feasibility check, approach selection and a fixed-price roadmap.",
    duration: "1–2 weeks",
    color: "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-900",
  },
  {
    number: "02",
    icon: Database,
    title: "Data Preparation",
    description: "Collection, cleaning, feature engineering and training dataset creation. EDA and quality validation.",
    duration: "2–4 weeks",
    color: "bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 border-violet-100 dark:border-violet-900",
  },
  {
    number: "03",
    icon: Code2,
    title: "Model Training & Evaluation",
    description: "We train and validate models, compare approaches and select the best architecture for your metrics.",
    duration: "2–6 weeks",
    color: "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Deployment & Integration",
    description: "Model packaging in Docker, REST API endpoint, CI/CD pipeline and drift monitoring setup.",
    duration: "1–3 weeks",
    color: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900",
  },
  {
    number: "05",
    icon: Activity,
    title: "Monitoring & Retraining",
    description: "We track model quality degradation and automatically retrain on data drift or when new features are added.",
    duration: "Ongoing",
    color: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-900",
  },
];

export function HowWeWorkSection({ lang }: { lang: string }) {
  const isUk = lang === "uk";
  const STEPS = isUk ? STEPS_UK : STEPS_EN;

  return (
    <section className="py-24 bg-neutral-50 dark:bg-neutral-900">
      <Container>
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
            {isUk ? "Процес" : "Process"}
          </p>
          <h2 className="text-4xl lg:text-5xl font-heading font-extrabold text-neutral-900 dark:text-white">
            {isUk ? "Як ми будуємо ML-рішення" : "How we build ML solutions"}
          </h2>
          <p className="mt-4 text-lg text-neutral-500 dark:text-neutral-400">
            {isUk
              ? "Від аудиту даних до продакшн-деплою. Прозорий процес без магії."
              : "From data audit to production deployment. A transparent process, no magic."}
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical connector line (desktop) */}
          <div className="hidden lg:block absolute left-[calc(50%-1px)] top-8 bottom-8 w-0.5 bg-neutral-200 dark:bg-neutral-700" />

          <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-1 lg:gap-0">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={step.number}
                  className={`relative flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-0 ${isLeft ? "lg:flex-row" : "lg:flex-row-reverse"}`}
                >
                  {/* Content side */}
                  <div className={`flex-1 ${isLeft ? "lg:pr-16 lg:text-right" : "lg:pl-16 lg:text-left"}`}>
                    <div className={`inline-flex items-start lg:${isLeft ? "justify-end" : "justify-start"} gap-4 ${isLeft ? "flex-row-reverse lg:flex-row" : ""}`}>
                      <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 ${step.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">{step.number}</div>
                        <h3 className="text-xl font-heading font-bold text-neutral-900 dark:text-white mb-2">{step.title}</h3>
                        <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed max-w-xs">{step.description}</p>
                        <span className="inline-block mt-2 px-3 py-1 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-medium text-neutral-500 dark:text-neutral-400">
                          ⏱ {step.duration}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Center circle */}
                  <div className="hidden lg:flex w-10 h-10 rounded-full bg-white dark:bg-neutral-800 border-2 border-indigo-200 dark:border-indigo-700 items-center justify-center shrink-0 z-10 shadow-sm">
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold text-xs">{step.number}</span>
                  </div>

                  {/* Empty side */}
                  <div className="hidden lg:block flex-1" />
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            href={`/${lang}/contact`}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
          >
            {isUk ? "Почати ML-проєкт" : "Start an ML project"}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
