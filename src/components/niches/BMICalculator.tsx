"use client";

import { useState } from "react";
import { EmojiIcon } from "@/components/ui/EmojiIcon";

interface BMICalculatorProps {
  lang: string;
  color: string;
}

interface BMICategory {
  label: string;
  range: string;
  color: string;
  bg: string;
  emoji: string;
  tip: string;
}

const CATEGORIES_UK: BMICategory[] = [
  { label: "Недостатня вага", range: "< 18.5", color: "#0ea5e9", bg: "#e0f2fe", emoji: "⚡", tip: "Рекомендується збільшити калорійність раціону та силові тренування." },
  { label: "Нормальна вага", range: "18.5 – 24.9", color: "#16a34a", bg: "#dcfce7", emoji: "✅", tip: "Чудово! Підтримуйте поточний ритм тренувань та харчування." },
  { label: "Надмірна вага", range: "25 – 29.9", color: "#d97706", bg: "#fef3c7", emoji: "⚠️", tip: "Рекомендуються кардіо-тренування 3-4 рази на тиждень та корекція дієти." },
  { label: "Ожиріння I ступеня", range: "30 – 34.9", color: "#ea580c", bg: "#ffedd5", emoji: "🔔", tip: "Зверніться до лікаря та тренера для складання безпечної програми." },
  { label: "Ожиріння II+ ступеня", range: "≥ 35", color: "#dc2626", bg: "#fee2e2", emoji: "❗", tip: "Необхідна консультація лікаря перед початком тренувань." },
];

const CATEGORIES_EN: BMICategory[] = [
  { label: "Underweight", range: "< 18.5", color: "#0ea5e9", bg: "#e0f2fe", emoji: "⚡", tip: "Increase caloric intake and incorporate strength training." },
  { label: "Normal weight", range: "18.5 – 24.9", color: "#16a34a", bg: "#dcfce7", emoji: "✅", tip: "Great! Maintain your current training and nutrition habits." },
  { label: "Overweight", range: "25 – 29.9", color: "#d97706", bg: "#fef3c7", emoji: "⚠️", tip: "Consider cardio 3-4 times a week and diet adjustments." },
  { label: "Obesity Class I", range: "30 – 34.9", color: "#ea580c", bg: "#ffedd5", emoji: "🔔", tip: "Consult a doctor and trainer for a safe exercise program." },
  { label: "Obesity Class II+", range: "≥ 35", color: "#dc2626", bg: "#fee2e2", emoji: "❗", tip: "Medical consultation required before starting any exercise program." },
];

function getCategory(bmi: number, isUk: boolean): BMICategory {
  const cats = isUk ? CATEGORIES_UK : CATEGORIES_EN;
  if (bmi < 18.5) return cats[0];
  if (bmi < 25) return cats[1];
  if (bmi < 30) return cats[2];
  if (bmi < 35) return cats[3];
  return cats[4];
}

export function BMICalculator({ lang, color }: BMICalculatorProps) {
  const isUk = lang === "uk";
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const bmi =
    weight && height && Number(height) > 0
      ? Number(weight) / Math.pow(Number(height) / 100, 2)
      : null;

  const category = bmi !== null ? getCategory(bmi, isUk) : null;
  const categories = isUk ? CATEGORIES_UK : CATEGORIES_EN;

  return (
    <section className="py-20 bg-white dark:bg-neutral-900">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold font-syne text-neutral-900 dark:text-white mb-3">
            {isUk ? "Калькулятор ІМТ" : "BMI Calculator"}
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm max-w-xl mx-auto">
            {isUk
              ? "Індекс маси тіла — простий спосіб оцінити відповідність ваги та зросту. Введіть свої показники нижче."
              : "Body Mass Index is a quick way to assess whether your weight is healthy for your height."}
          </p>
        </div>

        {/* Inputs */}
        <div className="bg-neutral-50 dark:bg-neutral-900 dark:bg-neutral-800/60 rounded-2xl border border-neutral-100 dark:border-neutral-700 /50 p-6 mb-6">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                {isUk ? "Вага (кг)" : "Weight (kg)"}
              </label>
              <input
                type="number"
                min="30"
                max="300"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder={isUk ? "напр. 75" : "e.g. 75"}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm focus:outline-none focus:ring-2 transition-all"
                style={{ "--tw-ring-color": color } as React.CSSProperties}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                {isUk ? "Зріст (см)" : "Height (cm)"}
              </label>
              <input
                type="number"
                min="100"
                max="250"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder={isUk ? "напр. 175" : "e.g. 175"}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm focus:outline-none focus:ring-2 transition-all"
                style={{ "--tw-ring-color": color } as React.CSSProperties}
              />
            </div>
          </div>

          {/* Result */}
          {bmi !== null && category ? (
            <div
              className="rounded-xl p-5 flex items-start gap-4"
              style={{ backgroundColor: category.bg }}
            >
              <EmojiIcon emoji={category.emoji} className="w-8 h-8 shrink-0" />
              <div className="flex-1">
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-4xl font-black font-syne" style={{ color: category.color }}>
                    {bmi.toFixed(1)}
                  </span>
                  <span className="text-lg font-semibold" style={{ color: category.color }}>
                    {category.label}
                  </span>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">
                  {category.tip}
                </p>
              </div>
            </div>
          ) : (
            <div className="rounded-xl p-5 bg-neutral-100 dark:bg-neutral-800 dark:bg-neutral-700/40 text-center text-neutral-400 dark:text-neutral-500 text-sm">
              {isUk
                ? "Введіть вагу та зріст, щоб побачити результат"
                : "Enter your weight and height to see the result"}
            </div>
          )}
        </div>

        {/* BMI scale legend */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {categories.map((cat) => (
            <div
              key={cat.label}
              className="flex items-center gap-3 p-3 rounded-xl"
              style={{
                backgroundColor:
                  category?.label === cat.label ? cat.bg : "transparent",
                outline:
                  category?.label === cat.label
                    ? `1.5px solid ${cat.color}`
                    : "none",
              }}
            >
              <EmojiIcon emoji={cat.emoji} className="w-5 h-5 shrink-0" />
              <div>
                <div className="text-xs font-semibold" style={{ color: cat.color }}>
                  {cat.label}
                </div>
                <div className="text-xs text-neutral-400 dark:text-neutral-500">
                  {isUk ? "ІМТ" : "BMI"} {cat.range}
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-neutral-400 dark:text-neutral-500 mt-6">
          {isUk
            ? "ІМТ — орієнтовний показник. Для точної оцінки проконсультуйтесь із тренером або лікарем."
            : "BMI is an approximate indicator. For an accurate assessment, consult a trainer or doctor."}
        </p>
      </div>
    </section>
  );
}
