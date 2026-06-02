"use client";

import { useState } from "react";

interface Props {
  variant: string;
  isUk: boolean;
}

function CleaningCalculator({ isUk }: { isUk: boolean }) {
  const [type, setType] = useState<"apartment" | "office">("apartment");
  const [rooms, setRooms] = useState(2);
  const [extras, setExtras] = useState({ windows: false, fridge: false, oven: false, balcony: false });
  const [cleanType, setCleanType] = useState<"standard" | "general" | "renovation">("standard");

  const basePrice = type === "apartment" ? 450 + rooms * 180 : 600 + rooms * 220;
  const multiplier = cleanType === "general" ? 1.6 : cleanType === "renovation" ? 2.2 : 1;
  const extrasPrice =
    (extras.windows ? 200 : 0) +
    (extras.fridge ? 150 : 0) +
    (extras.oven ? 120 : 0) +
    (extras.balcony ? 180 : 0);
  const total = Math.round(basePrice * multiplier + extrasPrice);

  const toggleExtra = (key: keyof typeof extras) =>
    setExtras((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-neutral-900 dark:text-white mb-2">
        {isUk ? "Калькулятор вартості прибирання" : "Cleaning Service Calculator"}
      </h2>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-8">
        {isUk ? "Тип → кімнати → додатки → миттєва ціна + CTA." : "Type → rooms → add-ons → instant price + CTA."}
      </p>
      <div className="max-w-xl mx-auto bg-sky-50 rounded-3xl p-8 shadow-xl shadow-sky-100">
        {/* Type */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">{isUk ? "Тип приміщення" : "Property type"}</p>
          <div className="grid grid-cols-2 gap-3">
            {(["apartment", "office"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`py-3 rounded-xl border text-sm font-medium transition-all ${
                  type === t
                    ? "border-sky-500 bg-sky-500 text-white"
                    : "border-neutral-200 dark:border-neutral-700 bg-white text-neutral-700 dark:text-neutral-300 hover:border-sky-300"
                }`}
              >
                {t === "apartment" ? (isUk ? "🏠 Квартира" : "🏠 Apartment") : (isUk ? "🏢 Офіс" : "🏢 Office")}
              </button>
            ))}
          </div>
        </div>

        {/* Rooms */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <p className="text-sm font-semibold text-neutral-700">{isUk ? "Кімнат / площа" : "Rooms / area"}</p>
            <p className="text-sm font-bold text-sky-600">{rooms} {isUk ? "кімнати" : "rooms"}</p>
          </div>
          <input
            type="range"
            min={1}
            max={6}
            value={rooms}
            onChange={(e) => setRooms(Number(e.target.value))}
            className="w-full accent-sky-500"
          />
          <div className="flex justify-between text-xs text-neutral-400 mt-1">
            <span>1</span><span>6+</span>
          </div>
        </div>

        {/* Clean type */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">{isUk ? "Тип прибирання" : "Cleaning type"}</p>
          <div className="space-y-2">
            {[
              { id: "standard", label: isUk ? "Стандартне" : "Standard", desc: isUk ? "Пил, пилосос, підлога" : "Dust, vacuum, floors" },
              { id: "general", label: isUk ? "Генеральне ×1.6" : "Deep Clean ×1.6", desc: isUk ? "Повне прибирання з кутами" : "Full clean including corners" },
              { id: "renovation", label: isUk ? "Після ремонту ×2.2" : "Post-reno ×2.2", desc: isUk ? "Будівельний пил, плівка, цемент" : "Construction dust, film, cement" },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setCleanType(opt.id as typeof cleanType)}
                className={`w-full flex items-start gap-3 p-3 rounded-xl border text-left transition-all ${
                  cleanType === opt.id
                    ? "border-sky-500 bg-white"
                    : "border-transparent bg-white/60 hover:border-sky-200"
                }`}
              >
                <div className={`w-4 h-4 rounded-full border-2 mt-0.5 shrink-0 ${cleanType === opt.id ? "border-sky-500 bg-sky-500" : "border-neutral-300"}`} />
                <div>
                  <p className="text-sm font-medium text-neutral-900">{opt.label}</p>
                  <p className="text-xs text-neutral-500">{opt.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Extras */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">{isUk ? "Додаткові послуги" : "Add-ons"}</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { key: "windows", label: isUk ? "🪟 Вікна +200₴" : "🪟 Windows +₴200" },
              { key: "fridge", label: isUk ? "🧊 Холодильник +150₴" : "🧊 Fridge +₴150" },
              { key: "oven", label: isUk ? "🍳 Духовка +120₴" : "🍳 Oven +₴120" },
              { key: "balcony", label: isUk ? "🌿 Балкон +180₴" : "🌿 Balcony +₴180" },
            ].map(({ key, label }) => (
              <label key={key} className="flex items-center gap-2 cursor-pointer bg-white dark:bg-neutral-800 rounded-xl p-3 border border-neutral-100">
                <input
                  type="checkbox"
                  checked={extras[key as keyof typeof extras]}
                  onChange={() => toggleExtra(key as keyof typeof extras)}
                  className="accent-sky-500 w-4 h-4"
                />
                <span className="text-xs text-neutral-700">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Result */}
        <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">{isUk ? "Вартість прибирання" : "Cleaning cost"}</p>
          <p className="text-4xl font-bold text-sky-600 mb-1">{total.toLocaleString("uk-UA")} ₴</p>
          <p className="text-xs text-neutral-400 mb-6">{isUk ? "Фінальна ціна після замірів може відрізнятись" : "Final price may vary after assessment"}</p>
          <button className="w-full py-3 rounded-xl bg-sky-500 text-white font-semibold hover:bg-sky-600 transition-colors">
            {isUk ? "Замовити прибирання" : "Book Cleaning"}
          </button>
        </div>
      </div>
    </div>
  );
}

function ConstructionCalculator({ isUk }: { isUk: boolean }) {
  const [workType, setWorkType] = useState("cosmetic");
  const [area, setArea] = useState(50);
  const [quality, setQuality] = useState("standard");
  const [withMaterials, setWithMaterials] = useState(false);

  const basePrices: Record<string, number> = {
    cosmetic: 800,
    standard: 1400,
    premium: 2200,
    renovation: 3000,
  };
  const qualityMultipliers: Record<string, number> = {
    economy: 0.8,
    standard: 1.0,
    premium: 1.5,
  };

  const labor = Math.round(basePrices[workType] * qualityMultipliers[quality] * area);
  const materials = withMaterials ? Math.round(labor * 0.6) : 0;
  const total = labor + materials;
  const totalMax = Math.round(total * 1.25);

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-neutral-900 dark:text-white mb-2">
        {isUk ? "Калькулятор вартості ремонту" : "Construction Cost Estimator"}
      </h2>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-8">
        {isUk ? "Вид робіт → площа → рівень якості → матеріали → діапазон ціни." : "Work type → area → quality → materials → price range."}
      </p>
      <div className="max-w-xl mx-auto bg-orange-50 rounded-3xl p-8 shadow-xl shadow-orange-100">
        {/* Work type */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">{isUk ? "Вид робіт" : "Work type"}</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: "cosmetic", label: isUk ? "Косметичний" : "Cosmetic" },
              { id: "standard", label: isUk ? "Капітальний" : "Capital" },
              { id: "premium", label: isUk ? "Преміум" : "Premium" },
              { id: "renovation", label: isUk ? "Під ключ" : "Turnkey" },
            ].map((w) => (
              <button
                key={w.id}
                onClick={() => setWorkType(w.id)}
                className={`py-2.5 rounded-xl border text-sm font-medium transition-all ${
                  workType === w.id
                    ? "border-orange-500 bg-orange-500 text-white"
                    : "border-neutral-200 dark:border-neutral-700 bg-white text-neutral-700 dark:text-neutral-300 hover:border-orange-300"
                }`}
              >
                {w.label}
              </button>
            ))}
          </div>
        </div>

        {/* Area */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <p className="text-sm font-semibold text-neutral-700">{isUk ? "Площа" : "Area"}</p>
            <p className="text-sm font-bold text-orange-600">{area} м²</p>
          </div>
          <input
            type="range"
            min={20}
            max={300}
            step={5}
            value={area}
            onChange={(e) => setArea(Number(e.target.value))}
            className="w-full accent-orange-500"
          />
          <div className="flex justify-between text-xs text-neutral-400 mt-1">
            <span>20 м²</span><span>300 м²</span>
          </div>
        </div>

        {/* Quality */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">{isUk ? "Рівень якості" : "Quality level"}</p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "economy", label: isUk ? "Економ" : "Economy" },
              { id: "standard", label: isUk ? "Стандарт" : "Standard" },
              { id: "premium", label: isUk ? "Преміум" : "Premium" },
            ].map((q) => (
              <button
                key={q.id}
                onClick={() => setQuality(q.id)}
                className={`py-2.5 rounded-xl border text-sm font-medium transition-all ${
                  quality === q.id
                    ? "border-orange-500 bg-orange-500 text-white"
                    : "border-neutral-200 dark:border-neutral-700 bg-white text-neutral-700 dark:text-neutral-300 hover:border-orange-300"
                }`}
              >
                {q.label}
              </button>
            ))}
          </div>
        </div>

        {/* Materials */}
        <label className="flex items-center gap-3 mb-8 p-4 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-100 dark:border-neutral-700 cursor-pointer">
          <input
            type="checkbox"
            checked={withMaterials}
            onChange={(e) => setWithMaterials(e.target.checked)}
            className="accent-orange-500 w-4 h-4"
          />
          <div>
            <p className="text-sm font-medium text-neutral-900">{isUk ? "Включити матеріали (+60%)" : "Include materials (+60%)"}</p>
            <p className="text-xs text-neutral-500">{isUk ? "Матеріали підбираємо та закуповуємо ми" : "We source and purchase materials"}</p>
          </div>
        </label>

        {/* Result */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1 text-center">{isUk ? "Орієнтовна вартість" : "Estimated cost"}</p>
          <p className="text-3xl font-bold text-orange-600 text-center mb-1">
            {total.toLocaleString("uk-UA")} – {totalMax.toLocaleString("uk-UA")} ₴
          </p>
          <p className="text-xs text-neutral-400 text-center mb-6">
            {isUk ? "Точна сума після безкоштовного замірів" : "Exact amount after free on-site assessment"}
          </p>
          <button className="w-full py-3 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors">
            {isUk ? "Замовити безкоштовний замір" : "Book Free Assessment"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function CalculatorDemo({ variant, isUk }: Props) {
  if (variant === "construction-calculator") {
    return <ConstructionCalculator isUk={isUk} />;
  }
  return <CleaningCalculator isUk={isUk} />;
}
