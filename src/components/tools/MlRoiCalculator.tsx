"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft, Check, RefreshCw } from "lucide-react";

interface Props {
  isUk: boolean;
}

type ProblemType = "fraud" | "churn" | "demand" | "nlp" | "vision" | "mlops";
type DataReadiness = "raw" | "partial" | "clean";
type Deployment = "poc" | "production" | "enterprise";
type Timeline = "fast" | "standard" | "extended";

const BASE_PRICES_GBP: Record<ProblemType, [number, number]> = {
  fraud:      [5000,  9000],
  churn:      [4000,  7500],
  demand:     [5500,  9000],
  nlp:        [4500,  8000],
  vision:     [7000, 14000],
  mlops:      [3000,  6000],
};

const DATA_MULT: Record<DataReadiness, number> = {
  raw:     1.4,
  partial: 1.1,
  clean:   1.0,
};

const DEPLOY_MULT: Record<Deployment, number> = {
  poc:        1.0,
  production: 1.8,
  enterprise: 2.5,
};

const TIMELINE_MULT: Record<Timeline, number> = {
  fast:     1.3,
  standard: 1.0,
  extended: 0.9,
};

const ROI_ESTIMATES: Record<ProblemType, { uk: string; en: string }> = {
  fraud:  { uk: "3–8× ROI протягом 12 міс.",   en: "3–8× ROI within 12 months" },
  churn:  { uk: "2–5× ROI протягом 12 міс.",   en: "2–5× ROI within 12 months" },
  demand: { uk: "4–10× ROI протягом 18 міс.",  en: "4–10× ROI within 18 months" },
  nlp:    { uk: "2–4× ROI протягом 12 міс.",   en: "2–4× ROI within 12 months" },
  vision: { uk: "3–7× ROI протягом 18 міс.",   en: "3–7× ROI within 18 months" },
  mlops:  { uk: "Скорочення ML-витрат на 20–40% на рік", en: "20–40% annual ML infrastructure savings" },
};

function fmtGbp(n: number) {
  return `£${Math.round(n / 100) * 100 < 1000
    ? Math.round(n / 100) * 100
    : Math.round(n / 500) * 500
  }`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function MlRoiCalculator({ isUk }: Props) {
  const [step, setStep]             = useState(0);
  const [problem, setProblem]       = useState<ProblemType | null>(null);
  const [data, setData]             = useState<DataReadiness | null>(null);
  const [deploy, setDeploy]         = useState<Deployment | null>(null);
  const [timeline, setTimeline]     = useState<Timeline | null>(null);

  const t = isUk
    ? {
        stepLabels: ["Задача", "Дані", "Деплой", "Терміни", "Результат"],
        step1Title: "Яку ML-задачу ви хочете вирішити?",
        step2Title: "Який стан ваших даних?",
        step3Title: "Який тип розгортання потрібен?",
        step4Title: "Які терміни реалізації?",
        problems: [
          { id: "fraud",  label: "Fraud Detection",       desc: "Виявлення шахрайства в транзакціях, страхових вимогах", icon: "🛡️" },
          { id: "churn",  label: "Churn Prediction",      desc: "Прогноз відтоку клієнтів та ризик дострокового розриву",  icon: "📉" },
          { id: "demand", label: "Demand Forecasting",    desc: "Прогнозування попиту, запасів, виробництва",              icon: "📦" },
          { id: "nlp",    label: "NLP / RAG",             desc: "Чат-боти, аналіз документів, класифікація тексту",        icon: "💬" },
          { id: "vision", label: "Computer Vision",       desc: "Контроль якості, детекція об'єктів, OCR",                 icon: "👁️" },
          { id: "mlops",  label: "MLOps / Моніторинг",   desc: "Пайплайни, реєстр моделей, drift-моніторинг",             icon: "⚙️" },
        ],
        dataStates: [
          { id: "raw",     label: "Сирі дані",             desc: "Неопрацьовані логи, CSV без очищення — потрібна підготовка", icon: "🗄️" },
          { id: "partial", label: "Частково підготовлені", desc: "Є базова обробка, але потрібна feature engineering",        icon: "🔧" },
          { id: "clean",   label: "Чисті та розмічені",    desc: "Дані підготовлені, є train/test split або мітки",           icon: "✅" },
        ],
        deployTypes: [
          { id: "poc",        label: "PoC / Демо",       desc: "Перевірка гіпотези — Jupyter, Streamlit, внутрішнє demo",      icon: "🔬" },
          { id: "production", label: "Production API",   desc: "FastAPI endpoint, Docker, CI/CD, інтеграція з ERP/CRM",        icon: "🚀" },
          { id: "enterprise", label: "Enterprise",       desc: "Regulated: FCA / NHS DSPT compliance, model governance, SLA",  icon: "🏛️" },
        ],
        timelineTypes: [
          { id: "fast",     label: "4 тижні",    desc: "Пріоритетний спринт (+30% rush)",    icon: "⚡" },
          { id: "standard", label: "8–12 тижнів", desc: "Стандартний темп",                   icon: "📅" },
          { id: "extended", label: "3–6 місяців", desc: "Розширений проєкт, більше фаз (-10%)", icon: "🛠️" },
        ],
        next: "Далі →",
        back: "← Назад",
        calculate: "Розрахувати →",
        restart: "Порахувати ще раз",
        resultTitle: "Орієнтовна вартість ML-проєкту",
        resultSub: "Уточнюється на безкоштовній консультації після аналізу даних",
        labelBase: "Базова ML-розробка",
        labelData: "Підготовка та інжиніринг даних",
        labelDeploy: "Production deployment",
        labelRush: "Rush-надбавка",
        labelTotal: "Разом",
        labelRoi: "Очікуваний ROI",
        cta: "Отримати детальний proposal",
        ctaSub: "Безкоштовна консультація · Без зобов'язань",
      }
    : {
        stepLabels: ["Problem", "Data", "Deploy", "Timeline", "Result"],
        step1Title: "What ML problem do you want to solve?",
        step2Title: "What is the state of your data?",
        step3Title: "What deployment type do you need?",
        step4Title: "What is your target timeline?",
        problems: [
          { id: "fraud",  label: "Fraud Detection",      desc: "Detect fraud in transactions, insurance claims, payments",   icon: "🛡️" },
          { id: "churn",  label: "Churn Prediction",     desc: "Predict customer churn and early contract termination risk", icon: "📉" },
          { id: "demand", label: "Demand Forecasting",   desc: "Forecast demand, inventory, production schedules",           icon: "📦" },
          { id: "nlp",    label: "NLP / RAG",            desc: "Chatbots, document analysis, text classification",           icon: "💬" },
          { id: "vision", label: "Computer Vision",      desc: "Quality control, object detection, OCR",                     icon: "👁️" },
          { id: "mlops",  label: "MLOps / Monitoring",  desc: "Pipelines, model registry, drift monitoring",                icon: "⚙️" },
        ],
        dataStates: [
          { id: "raw",     label: "Raw Data",            desc: "Unprocessed logs, CSVs without cleaning — preparation needed", icon: "🗄️" },
          { id: "partial", label: "Partially Prepared",  desc: "Basic processing done, but feature engineering needed",        icon: "🔧" },
          { id: "clean",   label: "Clean & Labelled",    desc: "Data is prepared with train/test split or labels ready",       icon: "✅" },
        ],
        deployTypes: [
          { id: "poc",        label: "PoC / Demo",      desc: "Hypothesis validation — Jupyter, Streamlit, internal demo",     icon: "🔬" },
          { id: "production", label: "Production API",  desc: "FastAPI endpoint, Docker, CI/CD, ERP/CRM integration",          icon: "🚀" },
          { id: "enterprise", label: "Enterprise",      desc: "Regulated: FCA / NHS DSPT compliance, model governance, SLA",   icon: "🏛️" },
        ],
        timelineTypes: [
          { id: "fast",     label: "4 Weeks",      desc: "Priority sprint (+30% rush fee)",           icon: "⚡" },
          { id: "standard", label: "8–12 Weeks",   desc: "Standard pace",                             icon: "📅" },
          { id: "extended", label: "3–6 Months",   desc: "Extended project, multiple phases (−10%)",  icon: "🛠️" },
        ],
        next: "Next →",
        back: "← Back",
        calculate: "Calculate →",
        restart: "Calculate Again",
        resultTitle: "Estimated ML Project Cost",
        resultSub: "Confirmed after a free consultation and data review",
        labelBase: "Core ML development",
        labelData: "Data preparation & engineering",
        labelDeploy: "Production deployment",
        labelRush: "Rush fee",
        labelTotal: "Total",
        labelRoi: "Expected ROI",
        cta: "Get a Detailed Proposal",
        ctaSub: "Free consultation · No commitment",
      };

  function calcPrice() {
    if (!problem || !data || !deploy || !timeline) return null;
    const [bMin, bMax] = BASE_PRICES_GBP[problem];
    const dm = DATA_MULT[data];
    const pm = DEPLOY_MULT[deploy];
    const tm = TIMELINE_MULT[timeline];

    const baseMin = Math.round((bMin * dm) / 500) * 500;
    const baseMax = Math.round((bMax * dm) / 500) * 500;
    const deployAdd = pm > 1 ? Math.round((bMin * dm * (pm - 1)) / 500) * 500 : 0;
    const deployAddMax = pm > 1 ? Math.round((bMax * dm * (pm - 1)) / 500) * 500 : 0;
    const rushAdd = tm > 1 ? Math.round((bMin * dm * pm * (tm - 1)) / 500) * 500 : 0;
    const rushAddMax = tm > 1 ? Math.round((bMax * dm * pm * (tm - 1)) / 500) * 500 : 0;
    const total = baseMin + deployAdd + rushAdd;
    const totalMax = baseMax + deployAddMax + rushAddMax;
    return { baseMin, baseMax, deployAdd, deployAddMax, rushAdd, rushAddMax, total, totalMax };
  }

  const price = step === 4 ? calcPrice() : null;
  const progressWidth = `${(step / 4) * 100}%`;

  const btnBase = "inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-colors";
  const btnPrimary = `${btnBase} bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed`;
  const btnSecondary = `${btnBase} border border-neutral-200 dark:border-neutral-700 bg-white text-neutral-700 hover:border-neutral-300`;

  function OptionButton({ id, label, desc, icon, selected, onClick }: { id: string; label: string; desc: string; icon: string; selected: boolean; onClick: () => void }) {
    return (
      <button
        onClick={onClick}
        className={`flex items-start gap-3 p-4 rounded-2xl border-2 text-left transition-all ${
          selected
            ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
            : "border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-blue-300"
        }`}
      >
        <span className="text-2xl shrink-0">{icon}</span>
        <div className="flex-1">
          <p className="font-semibold text-sm text-neutral-900 dark:text-white">{label}</p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">{desc}</p>
        </div>
        {selected && <Check className="w-4 h-4 text-blue-600 ml-auto shrink-0 mt-0.5" />}
      </button>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {t.stepLabels.map((label, i) => (
            <span key={i} className={`text-xs font-semibold ${i <= step ? "text-blue-600" : "text-neutral-400"}`}>
              {i + 1}. {label}
            </span>
          ))}
        </div>
        <div className="h-2 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
          <div className="h-full bg-linear-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500" style={{ width: progressWidth }} />
        </div>
      </div>

      {/* Step 0: Problem type */}
      {step === 0 && (
        <div>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-6">{t.step1Title}</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {t.problems.map((p) => (
              <OptionButton key={p.id} id={p.id} label={p.label} desc={p.desc} icon={p.icon} selected={problem === p.id} onClick={() => setProblem(p.id as ProblemType)} />
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <button onClick={() => setStep(1)} disabled={!problem} className={btnPrimary}>
              {t.next} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 1: Data readiness */}
      {step === 1 && (
        <div>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-6">{t.step2Title}</h2>
          <div className="space-y-3">
            {t.dataStates.map((d) => (
              <OptionButton key={d.id} id={d.id} label={d.label} desc={d.desc} icon={d.icon} selected={data === d.id} onClick={() => setData(d.id as DataReadiness)} />
            ))}
          </div>
          <div className="mt-6 flex justify-between">
            <button onClick={() => setStep(0)} className={btnSecondary}><ArrowLeft className="w-4 h-4" /> {t.back}</button>
            <button onClick={() => setStep(2)} disabled={!data} className={btnPrimary}>{t.next} <ArrowRight className="w-4 h-4" /></button>
          </div>
        </div>
      )}

      {/* Step 2: Deployment */}
      {step === 2 && (
        <div>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-6">{t.step3Title}</h2>
          <div className="space-y-3">
            {t.deployTypes.map((d) => (
              <OptionButton key={d.id} id={d.id} label={d.label} desc={d.desc} icon={d.icon} selected={deploy === d.id} onClick={() => setDeploy(d.id as Deployment)} />
            ))}
          </div>
          <div className="mt-6 flex justify-between">
            <button onClick={() => setStep(1)} className={btnSecondary}><ArrowLeft className="w-4 h-4" /> {t.back}</button>
            <button onClick={() => setStep(3)} disabled={!deploy} className={btnPrimary}>{t.next} <ArrowRight className="w-4 h-4" /></button>
          </div>
        </div>
      )}

      {/* Step 3: Timeline */}
      {step === 3 && (
        <div>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-6">{t.step4Title}</h2>
          <div className="space-y-3">
            {t.timelineTypes.map((tl) => (
              <OptionButton key={tl.id} id={tl.id} label={tl.label} desc={tl.desc} icon={tl.icon} selected={timeline === tl.id} onClick={() => setTimeline(tl.id as Timeline)} />
            ))}
          </div>
          <div className="mt-6 flex justify-between">
            <button onClick={() => setStep(2)} className={btnSecondary}><ArrowLeft className="w-4 h-4" /> {t.back}</button>
            <button onClick={() => setStep(4)} disabled={!timeline} className={btnPrimary}>
              {t.calculate} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Result */}
      {step === 4 && price && problem && (
        <div>
          <div className="text-center mb-8">
            <span className="text-5xl block mb-3">📊</span>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">{t.resultTitle}</h2>
            <p className="text-sm text-neutral-500">{t.resultSub}</p>
          </div>

          {/* Price Range */}
          <div className="bg-linear-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-center mb-6 text-white">
            <p className="text-blue-200 text-sm mb-2">{isUk ? "Діапазон вартості проєкту" : "Project cost range"}</p>
            <p className="text-4xl font-extrabold tabular-nums tracking-tight">
              {fmtGbp(price.total)} — {fmtGbp(price.totalMax)}
            </p>
            <p className="text-blue-200 text-xs mt-2">
              {isUk ? "На основі обраних параметрів" : "Based on selected parameters"}
            </p>
          </div>

          {/* Breakdown */}
          <div className="space-y-3 mb-6">
            <div className="flex justify-between py-3 border-b border-neutral-100 dark:border-neutral-700 text-sm">
              <span className="text-neutral-600">{t.labelBase}</span>
              <span className="font-semibold">{fmtGbp(price.baseMin)} — {fmtGbp(price.baseMax)}</span>
            </div>
            {price.deployAdd > 0 && (
              <div className="flex justify-between py-3 border-b border-neutral-100 dark:border-neutral-700 text-sm">
                <span className="text-neutral-600">{t.labelDeploy}</span>
                <span className="font-semibold">+{fmtGbp(price.deployAdd)} — +{fmtGbp(price.deployAddMax)}</span>
              </div>
            )}
            {price.rushAdd > 0 && (
              <div className="flex justify-between py-3 border-b border-neutral-100 dark:border-neutral-700 text-sm">
                <span className="text-amber-600">{t.labelRush}</span>
                <span className="font-semibold text-amber-600">+{fmtGbp(price.rushAdd)} — +{fmtGbp(price.rushAddMax)}</span>
              </div>
            )}
            <div className="flex justify-between py-3 border-b border-neutral-100 dark:border-neutral-700 text-base font-bold">
              <span className="text-neutral-900 dark:text-white">{t.labelTotal}</span>
              <span className="text-blue-600">{fmtGbp(price.total)} — {fmtGbp(price.totalMax)}</span>
            </div>
            <div className="flex justify-between py-3 text-sm">
              <span className="text-neutral-600">{t.labelRoi}</span>
              <span className="font-semibold text-green-600">{isUk ? ROI_ESTIMATES[problem].uk : ROI_ESTIMATES[problem].en}</span>
            </div>
          </div>

          <div className="text-center space-y-3">
            <a
              href={`/${isUk ? "uk" : "en"}/contact`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
            >
              {t.cta} <ArrowRight className="w-4 h-4" />
            </a>
            <p className="text-xs text-neutral-400">{t.ctaSub}</p>
            <button
              onClick={() => { setStep(0); setProblem(null); setData(null); setDeploy(null); setTimeline(null); }}
              className="flex items-center gap-2 mx-auto text-xs text-neutral-500 hover:text-neutral-700 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" /> {t.restart}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
