"use client";

import { useState } from "react";
import { ArrowRight, RefreshCw } from "lucide-react";

type Variant = "fraud" | "churn" | "maintenance";

interface Props {
  isUk: boolean;
  variant: Variant;
}

interface FieldConfig {
  id: string;
  labelUk: string;
  labelEn: string;
  unit: string;
  default: number;
  min: number;
  max: number;
  step: number;
}

interface VariantConfig {
  icon: string;
  titleUk: string;
  titleEn: string;
  introUk: string;
  introEn: string;
  fields: FieldConfig[];
  // (values in field order) -> { currentLoss, savings, netSavings, roi }
  compute: (v: Record<string, number>) => {
    baseline: number;
    savings: number;
    solutionCost: number;
    netSavings: number;
    roiMultiple: number;
  };
  baselineLabelUk: string;
  baselineLabelEn: string;
  savingsLabelUk: string;
  savingsLabelEn: string;
}

const VARIANTS: Record<Variant, VariantConfig> = {
  fraud: {
    icon: "🛡️",
    titleUk: "Калькулятор економії від ML fraud detection",
    titleEn: "ML Fraud Detection Savings Calculator",
    introUk: "Вкажіть параметри вашого бізнесу, щоб оцінити потенційну економію від впровадження ML-детекції шахрайства.",
    introEn: "Enter your business parameters to estimate potential savings from deploying ML fraud detection.",
    fields: [
      { id: "volume", labelUk: "Річний обсяг транзакцій (£)", labelEn: "Annual transaction volume (£)", unit: "£", default: 50_000_000, min: 100_000, max: 2_000_000_000, step: 100_000 },
      { id: "lossRate", labelUk: "Поточний рівень втрат від шахрайства (%)", labelEn: "Current fraud loss rate (%)", unit: "%", default: 0.3, min: 0.01, max: 5, step: 0.01 },
      { id: "reduction", labelUk: "Очікуване скорочення втрат з ML (%)", labelEn: "Expected loss reduction with ML (%)", unit: "%", default: 40, min: 5, max: 80, step: 5 },
      { id: "cost", labelUk: "Річна вартість ML-рішення (£)", labelEn: "Annual ML solution cost (£)", unit: "£", default: 60_000, min: 5_000, max: 2_000_000, step: 5_000 },
    ],
    compute: (v) => {
      const baseline = v.volume * (v.lossRate / 100);
      const savings = baseline * (v.reduction / 100);
      const netSavings = savings - v.cost;
      const roiMultiple = v.cost > 0 ? savings / v.cost : 0;
      return { baseline, savings, solutionCost: v.cost, netSavings, roiMultiple };
    },
    baselineLabelUk: "Поточні річні втрати від шахрайства",
    baselineLabelEn: "Current annual fraud losses",
    savingsLabelUk: "Очікувана річна економія",
    savingsLabelEn: "Expected annual savings",
  },
  churn: {
    icon: "📉",
    titleUk: "Калькулятор ROI прогнозування відтоку",
    titleEn: "Churn Prediction ROI Calculator",
    introUk: "Вкажіть параметри клієнтської бази, щоб оцінити ROI від впровадження ML-прогнозування відтоку.",
    introEn: "Enter your customer base parameters to estimate ROI from deploying ML churn prediction.",
    fields: [
      { id: "customers", labelUk: "Кількість активних клієнтів", labelEn: "Number of active customers", unit: "", default: 5_000, min: 50, max: 1_000_000, step: 50 },
      { id: "arpu", labelUk: "Середній річний дохід з клієнта (£)", labelEn: "Average annual revenue per customer (£)", unit: "£", default: 1_200, min: 10, max: 500_000, step: 10 },
      { id: "churnRate", labelUk: "Поточний річний churn rate (%)", labelEn: "Current annual churn rate (%)", unit: "%", default: 15, min: 1, max: 60, step: 1 },
      { id: "reduction", labelUk: "Очікуване скорочення відтоку з ML (%)", labelEn: "Expected churn reduction with ML (%)", unit: "%", default: 20, min: 5, max: 60, step: 5 },
      { id: "cost", labelUk: "Річна вартість ML-рішення (£)", labelEn: "Annual ML solution cost (£)", unit: "£", default: 40_000, min: 5_000, max: 2_000_000, step: 5_000 },
    ],
    compute: (v) => {
      const churnedCustomers = v.customers * (v.churnRate / 100);
      const baseline = churnedCustomers * v.arpu;
      const savedCustomers = churnedCustomers * (v.reduction / 100);
      const savings = savedCustomers * v.arpu;
      const netSavings = savings - v.cost;
      const roiMultiple = v.cost > 0 ? savings / v.cost : 0;
      return { baseline, savings, solutionCost: v.cost, netSavings, roiMultiple };
    },
    baselineLabelUk: "Поточні річні втрати доходу від відтоку",
    baselineLabelEn: "Current annual revenue lost to churn",
    savingsLabelUk: "Очікувана врятована виручка на рік",
    savingsLabelEn: "Expected revenue saved per year",
  },
  maintenance: {
    icon: "⚙️",
    titleUk: "Калькулятор економії від предиктивного обслуговування",
    titleEn: "Predictive Maintenance Savings Calculator",
    introUk: "Вкажіть параметри вашого обладнання, щоб оцінити економію на простоях завдяки предиктивному обслуговуванню.",
    introEn: "Enter your equipment parameters to estimate downtime savings from predictive maintenance.",
    fields: [
      { id: "machines", labelUk: "Кількість одиниць обладнання/машин", labelEn: "Number of machines / assets", unit: "", default: 25, min: 1, max: 5_000, step: 1 },
      { id: "downtimeHours", labelUk: "Непланові простої на машину на рік (год.)", labelEn: "Unplanned downtime per machine per year (hours)", unit: "год.", default: 120, min: 1, max: 2_000, step: 1 },
      { id: "costPerHour", labelUk: "Вартість простою за годину (£)", labelEn: "Downtime cost per hour (£)", unit: "£", default: 800, min: 10, max: 100_000, step: 10 },
      { id: "reduction", labelUk: "Очікуване скорочення простоїв (%)", labelEn: "Expected downtime reduction (%)", unit: "%", default: 30, min: 5, max: 70, step: 5 },
      { id: "cost", labelUk: "Річна вартість рішення моніторингу (£)", labelEn: "Annual monitoring solution cost (£)", unit: "£", default: 50_000, min: 5_000, max: 2_000_000, step: 5_000 },
    ],
    compute: (v) => {
      const baseline = v.machines * v.downtimeHours * v.costPerHour;
      const savings = baseline * (v.reduction / 100);
      const netSavings = savings - v.cost;
      const roiMultiple = v.cost > 0 ? savings / v.cost : 0;
      return { baseline, savings, solutionCost: v.cost, netSavings, roiMultiple };
    },
    baselineLabelUk: "Поточна річна вартість непланових простоїв",
    baselineLabelEn: "Current annual cost of unplanned downtime",
    savingsLabelUk: "Очікувана річна економія",
    savingsLabelEn: "Expected annual savings",
  },
};

function fmtGbp(n: number) {
  const rounded = Math.round(n);
  return `£${rounded.toLocaleString("en-GB")}`;
}

export function IndustrySavingsCalculator({ isUk, variant }: Props) {
  const config = VARIANTS[variant];
  const [values, setValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(config.fields.map((f) => [f.id, f.default]))
  );
  const [showResult, setShowResult] = useState(false);

  const result = config.compute(values);

  const t = isUk
    ? {
        calculate: "Розрахувати →",
        restart: "Порахувати ще раз",
        resultTitle: "Результат розрахунку",
        labelSolutionCost: "Вартість рішення",
        labelNet: "Чиста економія (рік 1)",
        labelRoi: "ROI (кратність)",
        cta: "Обговорити проєкт з нашою командою",
        ctaSub: "Безкоштовна консультація · Без зобов'язань",
        note: "Орієнтовний розрахунок на основі введених даних. Точні цифри уточнюються на безкоштовній консультації після аналізу ваших даних.",
      }
    : {
        calculate: "Calculate →",
        restart: "Calculate Again",
        resultTitle: "Calculation Result",
        labelSolutionCost: "Solution cost",
        labelNet: "Net savings (year 1)",
        labelRoi: "ROI (multiple)",
        cta: "Discuss the project with our team",
        ctaSub: "Free consultation · No commitment",
        note: "Indicative estimate based on your inputs. Exact figures are confirmed in a free consultation after reviewing your data.",
      };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <span className="text-5xl block mb-3">{config.icon}</span>
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
          {isUk ? config.titleUk : config.titleEn}
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {isUk ? config.introUk : config.introEn}
        </p>
      </div>

      {!showResult && (
        <div className="space-y-5">
          {config.fields.map((f) => (
            <div key={f.id}>
              <div className="flex justify-between items-baseline mb-1.5">
                <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-200">
                  {isUk ? f.labelUk : f.labelEn}
                </label>
                <span className="text-sm font-bold text-blue-600 tabular-nums">
                  {f.unit === "£" ? fmtGbp(values[f.id]) : `${values[f.id]}${f.unit ? ` ${f.unit}` : ""}`}
                </span>
              </div>
              <input
                type="range"
                min={f.min}
                max={f.max}
                step={f.step}
                value={values[f.id]}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, [f.id]: Number(e.target.value) }))
                }
                className="w-full accent-blue-600"
              />
            </div>
          ))}
          <div className="pt-2 flex justify-end">
            <button
              onClick={() => setShowResult(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              {t.calculate} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {showResult && (
        <div>
          <div className="bg-linear-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-center mb-6 text-white">
            <p className="text-blue-200 text-sm mb-2">
              {isUk ? config.savingsLabelUk : config.savingsLabelEn}
            </p>
            <p className="text-4xl font-extrabold tabular-nums tracking-tight">
              {fmtGbp(result.savings)}
            </p>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between py-3 border-b border-neutral-100 dark:border-neutral-700 text-sm">
              <span className="text-neutral-600 dark:text-neutral-300">
                {isUk ? config.baselineLabelUk : config.baselineLabelEn}
              </span>
              <span className="font-semibold">{fmtGbp(result.baseline)}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-neutral-100 dark:border-neutral-700 text-sm">
              <span className="text-neutral-600 dark:text-neutral-300">{t.labelSolutionCost}</span>
              <span className="font-semibold">{fmtGbp(result.solutionCost)}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-neutral-100 dark:border-neutral-700 text-base font-bold">
              <span className="text-neutral-900 dark:text-white">{t.labelNet}</span>
              <span className="text-blue-600">{fmtGbp(result.netSavings)}</span>
            </div>
            <div className="flex justify-between py-3 text-sm">
              <span className="text-neutral-600 dark:text-neutral-300">{t.labelRoi}</span>
              <span className="font-semibold text-green-600">{result.roiMultiple.toFixed(1)}×</span>
            </div>
          </div>

          <p className="text-xs text-neutral-400 text-center mb-6">{t.note}</p>

          <div className="text-center space-y-3">
            <a
              href={`/${isUk ? "uk" : "en"}/contact`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
            >
              {t.cta} <ArrowRight className="w-4 h-4" />
            </a>
            <p className="text-xs text-neutral-400">{t.ctaSub}</p>
            <button
              onClick={() => setShowResult(false)}
              className="flex items-center gap-2 mx-auto text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" /> {t.restart}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
