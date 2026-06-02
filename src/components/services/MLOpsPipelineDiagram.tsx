"use client";

import { useState } from "react";

interface Props {
  isUk: boolean;
}

const STAGES = [
  {
    id: "data",
    en: "Data Ingestion",
    uk: "Збір даних",
    desc_en: "Raw data from databases, APIs, IoT sensors and data lakes",
    desc_uk: "Сирі дані з БД, API, IoT-датчиків та data lake",
    icon: "🗄️",
    color: "#6366f1",
    bg: "#eef2ff",
  },
  {
    id: "train",
    en: "Model Training",
    uk: "Навчання моделі",
    desc_en: "Feature engineering, hyperparameter tuning, cross-validation",
    desc_uk: "Feature engineering, підбір гіперпараметрів, крос-валідація",
    icon: "🧠",
    color: "#8b5cf6",
    bg: "#f5f3ff",
  },
  {
    id: "validate",
    en: "Validation",
    uk: "Валідація",
    desc_en: "A/B testing, shadow mode, bias detection, SHAP explainability",
    desc_uk: "A/B тести, shadow mode, виявлення упередженості, SHAP",
    icon: "✅",
    color: "#059669",
    bg: "#ecfdf5",
  },
  {
    id: "deploy",
    en: "Deployment",
    uk: "Розгортання",
    desc_en: "Containerised REST API via Docker + FastAPI, auto-scaling on AWS",
    desc_uk: "Контейнеризований REST API через Docker + FastAPI, auto-scaling",
    icon: "🚀",
    color: "#0ea5e9",
    bg: "#f0f9ff",
  },
  {
    id: "monitor",
    en: "Monitoring",
    uk: "Моніторинг",
    desc_en: "Real-time performance, data drift alerts, Grafana dashboards",
    desc_uk: "Продуктивність у реальному часі, сповіщення про drift, Grafana",
    icon: "📊",
    color: "#f59e0b",
    bg: "#fffbeb",
  },
  {
    id: "retrain",
    en: "Auto-Retrain",
    uk: "Авто-Перенавчання",
    desc_en: "Triggered by drift threshold; pipeline loops back to training",
    desc_uk: "Запускається при перевищенні порогу drift; цикл повертається до навчання",
    icon: "🔄",
    color: "#ec4899",
    bg: "#fdf4ff",
  },
];

export function MLOpsPipelineDiagram({ isUk }: Props) {
  const [active, setActive] = useState<string | null>(null);

  const activeStage = STAGES.find((s) => s.id === active);

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-neutral-900 dark:text-white mb-2">
        {isUk ? "MLOps Pipeline — як це працює" : "MLOps Pipeline — How It Works"}
      </h2>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-8">
        {isUk
          ? "Натисніть на будь-який етап щоб дізнатись більше. Цикл від даних до авто-перенавчання в продакшені."
          : "Click any stage to learn more. Full cycle from raw data to auto-retraining in production."}
      </p>

      {/* Pipeline stages */}
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-0 mb-8 overflow-x-auto pb-2">
        {STAGES.map((stage, i) => (
          <div key={stage.id} className="flex items-center shrink-0">
            <button
              onClick={() => setActive(active === stage.id ? null : stage.id)}
              style={{
                borderColor: active === stage.id ? stage.color : "transparent",
                backgroundColor: active === stage.id ? stage.bg : "#f9fafb",
              }}
              className={`flex flex-col items-center gap-1.5 px-4 py-3 rounded-2xl border-2 transition-all hover:shadow-md min-w-[100px] ${
                active === stage.id ? "shadow-md scale-105" : "hover:bg-neutral-100"
              }`}
            >
              <span className="text-2xl">{stage.icon}</span>
              <span
                className="text-xs font-bold text-center leading-tight"
                style={{ color: active === stage.id ? stage.color : "#374151" }}
              >
                {isUk ? stage.uk : stage.en}
              </span>
            </button>
            {i < STAGES.length - 1 && (
              <div className="hidden sm:flex items-center mx-1 text-neutral-300">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10 L16 10 M12 6 L16 10 L12 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
            {i < STAGES.length - 1 && (
              <div className="sm:hidden flex flex-col items-center text-neutral-300 my-1">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <path d="M10 4 L10 16 M6 12 L10 16 L14 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </div>
        ))}
        {/* Loop arrow back to Data */}
        <div className="hidden sm:flex items-center mx-1 text-pink-300">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M4 12 Q4 4 12 4 Q20 4 20 12 Q20 20 12 20 Q8 20 6 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M4 16 L4 12 L8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Detail panel */}
      <div className="min-h-[100px]">
        {activeStage ? (
          <div
            className="p-5 rounded-2xl border-2 transition-all"
            style={{ borderColor: activeStage.color + "44", backgroundColor: activeStage.bg }}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{activeStage.icon}</span>
              <h3 className="font-heading font-bold text-neutral-900">
                {isUk ? activeStage.uk : activeStage.en}
              </h3>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
              {isUk ? activeStage.desc_uk : activeStage.desc_en}
            </p>
          </div>
        ) : (
          <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-700 text-center text-sm text-neutral-400">
            {isUk ? "👆 Натисніть на етап для деталей" : "👆 Click a stage for details"}
          </div>
        )}
      </div>

      {/* Tech row */}
      <div className="mt-6 pt-5 border-t border-neutral-100">
        <p className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-3">
          {isUk ? "Технологічний стек MLOps" : "MLOps Tech Stack"}
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            "Python", "FastAPI", "Docker", "MLflow",
            "Airflow", "Grafana", "AWS SageMaker", "PostgreSQL",
          ].map((t) => (
            <span
              key={t}
              className="px-3 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
