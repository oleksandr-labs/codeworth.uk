"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Calculator } from "lucide-react";
import { useLocale } from "@/components/layout/LocaleProvider";

const PROJECT_TYPES_UK = [
  { id: "poc", label: "PoC / Proof of Concept", base: 1800 },
  { id: "production-ml", label: "Production ML-модель", base: 4500 },
  { id: "nlp", label: "Кастомна NLP-система", base: 6500 },
  { id: "cv", label: "Комп'ютерний зір (CV)", base: 7000 },
  { id: "enterprise", label: "Enterprise ML-платформа", base: 12000 },
];

const PROJECT_TYPES_EN = [
  { id: "poc", label: "PoC / Proof of Concept", base: 1800 },
  { id: "production-ml", label: "Production ML Model", base: 4500 },
  { id: "nlp", label: "Custom NLP System", base: 6500 },
  { id: "cv", label: "Computer Vision System", base: 7000 },
  { id: "enterprise", label: "Enterprise ML Platform", base: 12000 },
];

const FEATURES_UK = [
  { id: "labelling", label: "Data labelling & annotation", price: 800 },
  { id: "mlops", label: "MLOps pipeline setup", price: 1500 },
  { id: "ab-testing", label: "A/B model testing", price: 600 },
  { id: "xai", label: "Model explainability (XAI)", price: 800 },
  { id: "onprem", label: "On-prem deployment", price: 1200 },
  { id: "api", label: "Real-time inference API", price: 700 },
  { id: "retraining", label: "Retraining automation", price: 1000 },
  { id: "dashboard", label: "Custom reporting dashboard", price: 900 },
];

const FEATURES_EN = [
  { id: "labelling", label: "Data labelling & annotation", price: 800 },
  { id: "mlops", label: "MLOps pipeline setup", price: 1500 },
  { id: "ab-testing", label: "A/B model testing", price: 600 },
  { id: "xai", label: "Model explainability (XAI)", price: 800 },
  { id: "onprem", label: "On-prem deployment", price: 1200 },
  { id: "api", label: "Real-time inference API", price: 700 },
  { id: "retraining", label: "Retraining automation", price: 1000 },
  { id: "dashboard", label: "Custom reporting dashboard", price: 900 },
];

const SUPPORT_PLANS_UK = [
  { id: "none", label: "Без підтримки", price: 0 },
  { id: "basic", label: "Basic MLOps (£800/міс)", price: 800 },
  { id: "pro", label: "Professional (£1,500/міс)", price: 1500 },
  { id: "enterprise", label: "Enterprise (custom)", price: 0 },
];

const SUPPORT_PLANS_EN = [
  { id: "none", label: "No MLOps support", price: 0 },
  { id: "basic", label: "Basic MLOps (£800/mo)", price: 800 },
  { id: "pro", label: "Professional (£1,500/mo)", price: 1500 },
  { id: "enterprise", label: "Enterprise (custom)", price: 0 },
];

function formatPrice(n: number, _isUk: boolean) {
  return "£" + n.toLocaleString("en-GB");
}

export function PriceCalculator() {
  const lang = useLocale();
  const isUk = lang === "uk";
  const lp = (path: string) => `/${lang}${path}`;
  const PROJECT_TYPES = isUk ? PROJECT_TYPES_UK : PROJECT_TYPES_EN;
  const FEATURES = isUk ? FEATURES_UK : FEATURES_EN;
  const SUPPORT_PLANS = isUk ? SUPPORT_PLANS_UK : SUPPORT_PLANS_EN;
  const [projectType, setProjectType] = useState(PROJECT_TYPES[0].id);
  const [features, setFeatures] = useState<Set<string>>(new Set());
  const [support, setSupport] = useState("none");

  const selectedType = PROJECT_TYPES.find((p) => p.id === projectType)!;
  const selectedSupport = SUPPORT_PLANS.find((s) => s.id === support)!;

  const featuresTotal = useMemo(() =>
    FEATURES.filter((f) => features.has(f.id)).reduce((sum, f) => sum + f.price, 0),
    [features, FEATURES]
  );

  const projectTotal = selectedType.base + featuresTotal;
  const monthlySupport = selectedSupport.price;
  const isEnterpriseSupport = support === "enterprise";

  function toggleFeature(id: string) {
    setFeatures((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <section className="py-24 bg-indigo-50 dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-sm font-semibold">
            <Calculator className="w-4 h-4" />
            {isUk ? "Калькулятор ML-проєкту" : "ML Project Calculator"}
          </div>
          <h2 className="text-4xl font-heading font-extrabold text-neutral-900 dark:text-white mb-4">
            {isUk ? "Розрахуйте орієнтовну вартість" : "Estimate your ML project cost"}
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400">
            {isUk
              ? "Орієнтовна вартість. Точна ціна визначається після безкоштовної консультації та аудиту даних."
              : "Estimated price. Exact cost is determined after a free consultation and data audit."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Left: Configurator */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step 1: Project type */}
            <div>
              <p className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mb-4">
                {isUk ? "1. Тип ML-проєкту" : "1. ML project type"}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PROJECT_TYPES.map((pt) => (
                  <button
                    key={pt.id}
                    onClick={() => setProjectType(pt.id)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl border text-left text-sm transition-all ${
                      projectType === pt.id
                        ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-semibold"
                        : "border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-indigo-200 hover:bg-white"
                    }`}
                  >
                    <span>{pt.label}</span>
                    <span className="text-xs text-neutral-400 ml-2 shrink-0">
                      {isUk ? "від" : "from"} {formatPrice(pt.base, isUk)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Add-ons */}
            <div>
              <p className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mb-4">
                {isUk ? "2. Додаткові компоненти" : "2. Add-on components"}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {FEATURES.map((f) => {
                  const selected = features.has(f.id);
                  return (
                    <button
                      key={f.id}
                      onClick={() => toggleFeature(f.id)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl border text-left text-sm transition-all ${
                        selected
                          ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-medium"
                          : "border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-indigo-200"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${selected ? "bg-indigo-600 border-indigo-600" : "border-neutral-300"}`}>
                          {selected && <span className="text-white text-xs leading-none">✓</span>}
                        </span>
                        {f.label}
                      </div>
                      <span className="text-xs text-neutral-400 ml-2 shrink-0">+{formatPrice(f.price, isUk)}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: MLOps Retainer */}
            <div>
              <p className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mb-4">
                {isUk ? "3. MLOps-підтримка після деплою" : "3. Post-deploy MLOps support"}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {SUPPORT_PLANS.map((sp) => (
                  <button
                    key={sp.id}
                    onClick={() => setSupport(sp.id)}
                    className={`px-4 py-3 rounded-xl border text-left text-sm transition-all ${
                      support === sp.id
                        ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-semibold"
                        : "border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-indigo-200"
                    }`}
                  >
                    {sp.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Result */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-lg shadow-neutral-200/40 overflow-hidden">
              <div className="p-6 bg-indigo-600 text-white">
                <p className="text-sm font-medium opacity-80 mb-1">
                  {isUk ? "Орієнтовна вартість" : "Estimated price"}
                </p>
                <div className="text-4xl font-sans font-extrabold tabular-nums tracking-tight">
                  {formatPrice(projectTotal, isUk)}
                </div>
                {monthlySupport > 0 && (
                  <p className="text-sm opacity-80 mt-2">
                    + {formatPrice(monthlySupport, isUk)}/{isUk ? "міс MLOps" : "mo MLOps"}
                  </p>
                )}
                {isEnterpriseSupport && (
                  <p className="text-sm opacity-80 mt-2">
                    + {isUk ? "Enterprise MLOps — індивідуально" : "Enterprise MLOps — custom quote"}
                  </p>
                )}
              </div>

              <div className="p-6 space-y-3 text-sm">
                <div className="flex justify-between text-neutral-700 dark:text-neutral-300">
                  <span>{selectedType.label}</span>
                  <span className="font-medium">{formatPrice(selectedType.base, isUk)}</span>
                </div>
                {FEATURES.filter((f) => features.has(f.id)).map((f) => (
                  <div key={f.id} className="flex justify-between text-neutral-600 dark:text-neutral-400">
                    <span>{f.label}</span>
                    <span>+{formatPrice(f.price, isUk)}</span>
                  </div>
                ))}
                {features.size > 0 && (
                  <div className="flex justify-between font-semibold text-neutral-800 dark:text-neutral-200 pt-3 border-t border-neutral-100 dark:border-neutral-700">
                    <span>{isUk ? "Разом" : "Total"}</span>
                    <span>{formatPrice(projectTotal, isUk)}</span>
                  </div>
                )}
              </div>

              <div className="px-6 pb-6">
                <Link
                  href={lp(`/contact?service=${encodeURIComponent(selectedType.label)}&budget=${encodeURIComponent(formatPrice(projectTotal, isUk))}`)}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
                >
                  {isUk ? "Замовити безкоштовну консультацію" : "Book a free consultation"}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <p className="text-xs text-neutral-400 text-center mt-3">
                  {isUk ? "Безкоштовна консультація без зобов'язань" : "Free consultation, no obligations"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
