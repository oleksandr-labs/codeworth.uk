"use client";

import { useState } from "react";

interface Props {
  isUk: boolean;
}

type DataType = "tabular" | "image" | "text" | "timeseries";
type TaskType = "classification" | "regression" | "clustering" | "forecasting";

interface Verdict {
  status: "good" | "marginal" | "insufficient";
  title_en: string;
  title_uk: string;
  message_en: string;
  message_uk: string;
  tip_en: string;
  tip_uk: string;
}

function getVerdict(
  dataType: DataType,
  taskType: TaskType,
  rows: number,
  features: number,
  labeledPct: number
): Verdict {
  const labeled = Math.round((rows * labeledPct) / 100);

  let minRows = 1000;
  if (dataType === "image") minRows = 500;
  if (dataType === "text") minRows = 200;
  if (dataType === "timeseries") minRows = 365;

  if (taskType === "regression") minRows = Math.round(minRows * 0.8);
  if (taskType === "clustering") minRows = Math.round(minRows * 0.5);

  const ratio = labeled / minRows;
  const featureRatio = rows / Math.max(features, 1);

  if (ratio >= 3 && featureRatio >= 20) {
    return {
      status: "good",
      title_en: "Your dataset is ready for ML",
      title_uk: "Ваш датасет готовий для ML",
      message_en: `${labeled.toLocaleString()} labelled samples is solid for ${taskType}. With ${features} features and ${rows.toLocaleString()} total rows, you have good signal-to-noise conditions.`,
      message_uk: `${labeled.toLocaleString()} розмічених зразків — добре для задачі ${taskType}. З ${features} ознаками та ${rows.toLocaleString()} рядками умови сигнал/шум хороші.`,
      tip_en: "Consider a train/val/test split of 70/15/15 and start with a baseline model.",
      tip_uk: "Рекомендуємо розбивку 70/15/15 для навчання/валідації/тесту та почати з базової моделі.",
    };
  }

  if (ratio >= 1 && featureRatio >= 10) {
    return {
      status: "marginal",
      title_en: "Dataset is borderline — augmentation advised",
      title_uk: "Датасет на межі — потрібна аугментація",
      message_en: `${labeled.toLocaleString()} labelled samples may be enough, but results could be noisy. Consider data augmentation, transfer learning, or collecting more samples.`,
      message_uk: `${labeled.toLocaleString()} розмічених зразків може бути достатньо, але результати можуть бути шумними. Розгляньте аугментацію даних або transfer learning.`,
      tip_en: "Cross-validation with 5-fold splits will give you more reliable estimates with this data volume.",
      tip_uk: "5-fold cross-validation дасть надійніші оцінки при такому обсязі даних.",
    };
  }

  return {
    status: "insufficient",
    title_en: "More data needed before ML",
    title_uk: "Потрібно більше даних перед ML",
    message_en: `${labeled.toLocaleString()} labelled samples is below the recommended minimum of ${minRows.toLocaleString()} for ${taskType} on ${dataType} data. ML models will likely overfit.`,
    message_uk: `${labeled.toLocaleString()} розмічених зразків нижче рекомендованого мінімуму ${minRows.toLocaleString()} для ${taskType} на даних типу ${dataType}. Модель, ймовірно, перенавчиться.`,
    tip_en: "Options: use a simpler rule-based system, apply transfer learning, or collect more labelled data first.",
    tip_uk: "Варіанти: використати просту rule-based систему, застосувати transfer learning, або спочатку зібрати більше розмічених даних.",
  };
}

export function DatasetCalculator({ isUk }: Props) {
  const [dataType, setDataType] = useState<DataType>("tabular");
  const [taskType, setTaskType] = useState<TaskType>("classification");
  const [rows, setRows] = useState(5000);
  const [features, setFeatures] = useState(20);
  const [labeledPct, setLabeledPct] = useState(80);
  const [verdict, setVerdict] = useState<Verdict | null>(null);

  const dataTypes: { id: DataType; en: string; uk: string; emoji: string }[] = [
    { id: "tabular", en: "Tabular / CSV", uk: "Таблиця / CSV", emoji: "📋" },
    { id: "image", en: "Images", uk: "Зображення", emoji: "🖼️" },
    { id: "text", en: "Text / NLP", uk: "Текст / NLP", emoji: "📝" },
    { id: "timeseries", en: "Time Series", uk: "Часові ряди", emoji: "📈" },
  ];

  const taskTypes: { id: TaskType; en: string; uk: string }[] = [
    { id: "classification", en: "Classification", uk: "Класифікація" },
    { id: "regression", en: "Regression", uk: "Регресія" },
    { id: "clustering", en: "Clustering", uk: "Кластеризація" },
    { id: "forecasting", en: "Forecasting", uk: "Прогнозування" },
  ];

  function handleCheck() {
    setVerdict(getVerdict(dataType, taskType, rows, features, labeledPct));
  }

  const verdictColors = {
    good: { bg: "bg-emerald-50", border: "border-emerald-200", title: "text-emerald-700", dot: "bg-emerald-500" },
    marginal: { bg: "bg-amber-50", border: "border-amber-200", title: "text-amber-700", dot: "bg-amber-400" },
    insufficient: { bg: "bg-red-50", border: "border-red-200", title: "text-red-700", dot: "bg-red-500" },
  };

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-neutral-900 dark:text-white mb-2">
        {isUk ? "Чи вистачає у вас даних для ML?" : "Do You Have Enough Data for ML?"}
      </h2>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-8">
        {isUk
          ? "Введіть параметри вашого датасету — отримайте миттєву оцінку готовності до машинного навчання."
          : "Enter your dataset parameters and get an instant ML readiness assessment."}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-3 uppercase tracking-wide">
              {isUk ? "1. Тип даних" : "1. Data type"}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {dataTypes.map((dt) => (
                <button
                  key={dt.id}
                  onClick={() => { setDataType(dt.id); setVerdict(null); }}
                  className={`flex items-center gap-2.5 px-3 py-3 rounded-xl text-sm font-medium transition-all border-2 ${
                    dataType === dt.id
                      ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                      : "border-transparent bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200"
                  }`}
                >
                  <span>{dt.emoji}</span>
                  <span>{isUk ? dt.uk : dt.en}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-3 uppercase tracking-wide">
              {isUk ? "2. Задача ML" : "2. ML task"}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {taskTypes.map((tt) => (
                <button
                  key={tt.id}
                  onClick={() => { setTaskType(tt.id); setVerdict(null); }}
                  className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-all border-2 ${
                    taskType === tt.id
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-transparent bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200"
                  }`}
                >
                  {isUk ? tt.uk : tt.en}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2 uppercase tracking-wide">
              {isUk ? `3. Рядків у датасеті: ${rows.toLocaleString()}` : `3. Dataset rows: ${rows.toLocaleString()}`}
            </label>
            <input
              type="range"
              min={100}
              max={100000}
              step={100}
              value={rows}
              onChange={(e) => { setRows(Number(e.target.value)); setVerdict(null); }}
              className="w-full accent-indigo-600"
            />
            <div className="flex justify-between text-xs text-neutral-400 mt-1">
              <span>100</span><span>10k</span><span>50k</span><span>100k</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2 uppercase tracking-wide">
                {isUk ? `Ознак: ${features}` : `Features: ${features}`}
              </label>
              <input
                type="range"
                min={1}
                max={200}
                step={1}
                value={features}
                onChange={(e) => { setFeatures(Number(e.target.value)); setVerdict(null); }}
                className="w-full accent-indigo-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2 uppercase tracking-wide">
                {isUk ? `Розмічено: ${labeledPct}%` : `Labelled: ${labeledPct}%`}
              </label>
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={labeledPct}
                onChange={(e) => { setLabeledPct(Number(e.target.value)); setVerdict(null); }}
                className="w-full accent-indigo-600"
              />
            </div>
          </div>

          <button
            onClick={handleCheck}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-base hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-100"
          >
            {isUk ? "🔍 Перевірити готовність датасету" : "🔍 Check Dataset Readiness"}
          </button>
        </div>

        {/* Result */}
        <div className="flex flex-col">
          {!verdict ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center bg-neutral-50 dark:bg-neutral-900 rounded-3xl p-8 text-neutral-400 border border-neutral-100 dark:border-neutral-700 min-h-[320px]">
              <span className="text-5xl mb-4">📊</span>
              <p className="text-sm font-medium text-neutral-500">
                {isUk ? "Результат з'явиться тут" : "Your result will appear here"}
              </p>
              <p className="text-xs mt-1">
                {isUk ? "Налаштуйте параметри та натисніть «Перевірити»" : "Set parameters and click Check"}
              </p>
            </div>
          ) : (
            <div className={`flex-1 rounded-3xl p-6 border-2 ${verdictColors[verdict.status].bg} ${verdictColors[verdict.status].border}`}>
              <div className="flex items-center gap-2 mb-4">
                <span className={`w-3 h-3 rounded-full ${verdictColors[verdict.status].dot}`} />
                <h3 className={`font-heading font-bold text-lg ${verdictColors[verdict.status].title}`}>
                  {isUk ? verdict.title_uk : verdict.title_en}
                </h3>
              </div>
              <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
                {isUk ? verdict.message_uk : verdict.message_en}
              </p>
              <div className="p-4 bg-white/70 rounded-xl border border-white">
                <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1">
                  {isUk ? "💡 Рекомендація" : "💡 Recommendation"}
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {isUk ? verdict.tip_uk : verdict.tip_en}
                </p>
              </div>

              {/* Stats summary */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                {[
                  {
                    label: isUk ? "Всього рядків" : "Total rows",
                    value: rows.toLocaleString(),
                  },
                  {
                    label: isUk ? "Розмічено" : "Labelled",
                    value: Math.round((rows * labeledPct) / 100).toLocaleString(),
                  },
                  {
                    label: isUk ? "Ознак" : "Features",
                    value: features,
                  },
                  {
                    label: isUk ? "Рядків / ознаку" : "Rows / feature",
                    value: Math.round(rows / Math.max(features, 1)).toLocaleString(),
                  },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-white/60 rounded-xl p-3 text-center">
                    <div className="text-lg font-heading font-bold text-neutral-800">{value}</div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
