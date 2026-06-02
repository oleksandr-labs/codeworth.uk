"use client";
import { useState } from "react";

export function GreenPlateDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  // Macro calculator state
  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState(30);
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [activity, setActivity] = useState("moderate");
  const [goal, setGoal] = useState("maintain");
  const [macroResult, setMacroResult] = useState<{
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
    suggestedPlan: string;
  } | null>(null);

  // Subscription state
  const [selectedPlan, setSelectedPlan] = useState("balance");
  const [selectedDiet, setSelectedDiet] = useState("classic");
  const [activeSection, setActiveSection] = useState<"hero" | "calculator" | "menu" | "plans" | "steps">("hero");

  const activityMultipliers: Record<string, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryactive: 1.9,
  };

  function calculateMacros() {
    const bmr =
      gender === "male"
        ? 10 * weight + 6.25 * height - 5 * age + 5
        : 10 * weight + 6.25 * height - 5 * age - 161;
    const tdee = bmr * (activityMultipliers[activity] ?? 1.55);
    let calories = tdee;
    if (goal === "lose") calories = tdee - 400;
    if (goal === "gain") calories = tdee + 300;
    calories = Math.round(calories);
    const protein = Math.round((calories * 0.3) / 4);
    const fat = Math.round((calories * 0.25) / 9);
    const carbs = Math.round((calories * 0.45) / 4);
    let suggestedPlan = "balance";
    if (calories < 1600) suggestedPlan = "light";
    if (calories > 2400) suggestedPlan = "full";
    setMacroResult({ calories, protein, fat, carbs, suggestedPlan });
    setSelectedPlan(suggestedPlan);
    setActiveSection("plans");
  }

  const plans = [
    {
      id: "light",
      en: "Light",
      uk: "Легкий",
      meals: 5,
      priceWeek: 890,
      pricePerMeal: 180,
      badge: null,
    },
    {
      id: "balance",
      en: "Balance",
      uk: "Баланс",
      meals: 10,
      priceWeek: 1590,
      pricePerMeal: 159,
      badge: isUk ? "Найпопулярніший" : "Most Popular",
    },
    {
      id: "full",
      en: "Full",
      uk: "Повний",
      meals: 14,
      priceWeek: 2090,
      pricePerMeal: 149,
      badge: null,
    },
  ];

  const diets = [
    { id: "classic", en: "Classic", uk: "Класичний" },
    { id: "vegetarian", en: "Vegetarian", uk: "Вегетаріанський" },
    { id: "vegan", en: "Vegan", uk: "Веганський" },
    { id: "glutenfree", en: "Gluten-free", uk: "Без глютену" },
    { id: "keto", en: "Keto", uk: "Кето" },
  ];

  const weekMenu: {
    day: string;
    dayUk: string;
    meals: { name: string; nameUk: string; cal: number; p: number; f: number; c: number; tags: string[] }[];
  }[] = [
    {
      day: "Mon",
      dayUk: "Пн",
      meals: [
        { name: "Oat porridge, berries", nameUk: "Вівсянка з ягодами", cal: 340, p: 14, f: 8, c: 52, tags: ["V"] },
        { name: "Grilled chicken bowl", nameUk: "Боул з куркою гриль", cal: 490, p: 38, f: 14, c: 42, tags: ["GF"] },
        { name: "Lentil soup", nameUk: "Суп з сочевиці", cal: 310, p: 18, f: 6, c: 44, tags: ["VG", "GF"] },
      ],
    },
    {
      day: "Tue",
      dayUk: "Вт",
      meals: [
        { name: "Eggs & avocado toast", nameUk: "Яйця з авокадо", cal: 380, p: 18, f: 22, c: 28, tags: ["V"] },
        { name: "Salmon with quinoa", nameUk: "Лосось з кіноа", cal: 520, p: 42, f: 18, c: 38, tags: ["GF"] },
        { name: "Veggie stir fry", nameUk: "Смажені овочі", cal: 290, p: 12, f: 10, c: 36, tags: ["VG"] },
      ],
    },
    {
      day: "Wed",
      dayUk: "Ср",
      meals: [
        { name: "Greek yogurt parfait", nameUk: "Парфе з йогурту", cal: 320, p: 16, f: 6, c: 48, tags: ["V"] },
        { name: "Turkey & sweet potato", nameUk: "Індичка з бататом", cal: 510, p: 40, f: 12, c: 50, tags: ["GF"] },
        { name: "Tomato basil soup", nameUk: "Суп томат-базилік", cal: 270, p: 8, f: 10, c: 34, tags: ["VG", "GF"] },
      ],
    },
    {
      day: "Thu",
      dayUk: "Чт",
      meals: [
        { name: "Smoothie bowl", nameUk: "Смузі-боул", cal: 360, p: 12, f: 8, c: 60, tags: ["VG", "GF"] },
        { name: "Beef & broccoli", nameUk: "Яловичина з брокколі", cal: 530, p: 44, f: 20, c: 30, tags: ["GF"] },
        { name: "Chickpea curry", nameUk: "Каррі з нуту", cal: 400, p: 16, f: 14, c: 52, tags: ["VG", "GF"] },
      ],
    },
    {
      day: "Fri",
      dayUk: "Пт",
      meals: [
        { name: "Chia pudding", nameUk: "Пудинг із чіа", cal: 310, p: 10, f: 14, c: 36, tags: ["VG", "GF"] },
        { name: "Tuna salad wrap", nameUk: "Рол з тунцем", cal: 460, p: 36, f: 12, c: 44, tags: [] },
        { name: "Pumpkin cream soup", nameUk: "Крем-суп із гарбуза", cal: 280, p: 8, f: 10, c: 38, tags: ["VG", "GF"] },
      ],
    },
  ];

  const tagColors: Record<string, string> = {
    V: "#16A34A",
    VG: "#65A30D",
    GF: "#CA8A04",
    K: "#7C3AED",
  };

  const navItems = [
    { id: "hero", en: "Home", uk: "Головна" },
    { id: "calculator", en: "Calculator", uk: "Калькулятор" },
    { id: "menu", en: "Menu", uk: "Меню" },
    { id: "plans", en: "Plans", uk: "Плани" },
    { id: "steps", en: "How It Works", uk: "Як це працює" },
  ] as const;

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#FEF9EE", minHeight: "100vh" }}>
      {/* Header */}
      <header
        style={{
          background: "#16A34A",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
          boxShadow: "0 2px 8px rgba(22,163,74,0.3)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              background: "#84CC16",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
            }}
          >
            🥗
          </div>
          <span style={{ color: "#fff", fontWeight: 700, fontSize: 20, letterSpacing: -0.5 }}>
            GreenPlate
          </span>
        </div>
        <nav style={{ display: "flex", gap: 4 }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              style={{
                background: activeSection === item.id ? "#84CC16" : "transparent",
                color: activeSection === item.id ? "#14532D" : "#D1FAE5",
                border: "none",
                borderRadius: 8,
                padding: "6px 12px",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {isUk ? item.uk : item.en}
            </button>
          ))}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "#D1FAE5", fontSize: 13 }}>⭐ 4.9/5</span>
          <span style={{ color: "#84CC16", fontSize: 13, fontWeight: 600 }}>
            {isUk ? "8 200 підписників" : "8,200 subscribers"}
          </span>
        </div>
      </header>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>

        {/* HERO SECTION */}
        {activeSection === "hero" && (
          <div>
            {/* Hero Banner */}
            <div
              style={{
                background: "linear-gradient(135deg, #16A34A 0%, #84CC16 100%)",
                borderRadius: 24,
                padding: "56px 48px",
                color: "#fff",
                marginBottom: 40,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  right: -40,
                  top: -40,
                  width: 300,
                  height: 300,
                  background: "rgba(255,255,255,0.08)",
                  borderRadius: "50%",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  right: 80,
                  bottom: -80,
                  width: 200,
                  height: 200,
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: "50%",
                }}
              />
              <div style={{ position: "relative", zIndex: 1, maxWidth: 600 }}>
                <div
                  style={{
                    display: "inline-block",
                    background: "rgba(255,255,255,0.2)",
                    borderRadius: 20,
                    padding: "4px 14px",
                    fontSize: 13,
                    fontWeight: 600,
                    marginBottom: 16,
                  }}
                >
                  {isUk ? "🌿 Здорове харчування" : "🌿 Healthy eating made easy"}
                </div>
                <h1 style={{ fontSize: 42, fontWeight: 800, marginBottom: 16, lineHeight: 1.2 }}>
                  {isUk ? "Здорова їжа — прямо до вашої кухні" : "Fresh meals delivered to your kitchen"}
                </h1>
                <p style={{ fontSize: 18, opacity: 0.9, marginBottom: 28, lineHeight: 1.6 }}>
                  {isUk
                    ? "Щотижневий раціон зі свіжих продуктів. Без готування. Просто розігрій і їж."
                    : "Weekly meal plans with fresh ingredients. No cooking. Just heat and eat."}
                </p>
                <div style={{ display: "flex", gap: 12 }}>
                  <button
                    onClick={() => setActiveSection("calculator")}
                    style={{
                      background: "#fff",
                      color: "#16A34A",
                      border: "none",
                      borderRadius: 12,
                      padding: "14px 28px",
                      fontSize: 16,
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    {isUk ? "Розрахувати КБЖУ" : "Calculate Macros"}
                  </button>
                  <button
                    onClick={() => setActiveSection("plans")}
                    style={{
                      background: "transparent",
                      color: "#fff",
                      border: "2px solid rgba(255,255,255,0.6)",
                      borderRadius: 12,
                      padding: "14px 28px",
                      fontSize: 16,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    {isUk ? "Переглянути плани" : "See Plans"}
                  </button>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 40 }}>
              {[
                { val: "8,200+", en: "Active subscribers", uk: "Активних підписників" },
                { val: "4.9/5", en: "Average rating", uk: "Середній рейтинг" },
                { val: "35+", en: "Dishes weekly", uk: "Страв щотижня" },
                { val: "3 yrs", en: "On the market", uk: "На ринку" },
              ].map((s) => (
                <div
                  key={s.val}
                  style={{
                    background: "#fff",
                    borderRadius: 16,
                    padding: "20px",
                    textAlign: "center",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                  }}
                >
                  <div style={{ fontSize: 28, fontWeight: 800, color: "#16A34A" }}>{s.val}</div>
                  <div style={{ fontSize: 13, color: "#6B7280", marginTop: 4 }}>{isUk ? s.uk : s.en}</div>
                </div>
              ))}
            </div>

            {/* How it works */}
            <div
              style={{
                background: "#fff",
                borderRadius: 20,
                padding: "32px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              }}
            >
              <h2 style={{ fontSize: 24, fontWeight: 700, color: "#14532D", marginBottom: 28, textAlign: "center" }}>
                {isUk ? "Як це працює" : "How It Works"}
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
                {[
                  {
                    step: "1",
                    icon: "📋",
                    en: "Choose Your Plan",
                    uk: "Оберіть план",
                    desc_en: "Pick a subscription that fits your goals and dietary needs",
                    desc_uk: "Виберіть підписку, яка відповідає вашим цілям",
                  },
                  {
                    step: "2",
                    icon: "👨‍🍳",
                    en: "We Cook For You",
                    uk: "Ми готуємо",
                    desc_en: "Our chefs prepare fresh meals from locally sourced ingredients",
                    desc_uk: "Наші шефи готують зі свіжих місцевих продуктів",
                  },
                  {
                    step: "3",
                    icon: "🚚",
                    en: "We Deliver Weekly",
                    uk: "Щотижнева доставка",
                    desc_en: "Get your meals delivered every Monday morning, ready to heat",
                    desc_uk: "Отримайте страви щопонеділка вранці, готові до розігріву",
                  },
                ].map((item) => (
                  <div key={item.step} style={{ textAlign: "center", padding: "16px" }}>
                    <div
                      style={{
                        width: 64,
                        height: 64,
                        background: "linear-gradient(135deg, #DCFCE7, #D9F99D)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 28,
                        margin: "0 auto 16px",
                      }}
                    >
                      {item.icon}
                    </div>
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        background: "#16A34A",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        fontSize: 12,
                        fontWeight: 700,
                        margin: "0 auto 10px",
                      }}
                    >
                      {item.step}
                    </div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: "#14532D", marginBottom: 8 }}>
                      {isUk ? item.uk : item.en}
                    </h3>
                    <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.5 }}>
                      {isUk ? item.desc_uk : item.desc_en}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MACRO CALCULATOR SECTION */}
        {activeSection === "calculator" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <h2 style={{ fontSize: 32, fontWeight: 800, color: "#14532D", marginBottom: 8 }}>
                {isUk ? "Калькулятор КБЖУ" : "Macro Calculator"}
              </h2>
              <p style={{ color: "#6B7280", fontSize: 16 }}>
                {isUk
                  ? "Розрахуйте свою денну норму калорій та підберіть ідеальний план"
                  : "Calculate your daily calorie needs and find the perfect meal plan"}
              </p>
            </div>

            <div
              style={{
                background: "#fff",
                borderRadius: 24,
                padding: "36px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                marginBottom: 32,
              }}
            >
              {/* Gender */}
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#374151", marginBottom: 10 }}>
                  {isUk ? "Стать" : "Gender"}
                </label>
                <div style={{ display: "flex", gap: 12 }}>
                  {(["male", "female"] as const).map((g) => (
                    <button
                      key={g}
                      onClick={() => setGender(g)}
                      style={{
                        flex: 1,
                        padding: "12px",
                        borderRadius: 12,
                        border: `2px solid ${gender === g ? "#16A34A" : "#E5E7EB"}`,
                        background: gender === g ? "#DCFCE7" : "#fff",
                        color: gender === g ? "#14532D" : "#6B7280",
                        fontWeight: 600,
                        fontSize: 15,
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                    >
                      {g === "male" ? (isUk ? "♂ Чоловік" : "♂ Male") : isUk ? "♀ Жінка" : "♀ Female"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Age / Weight / Height */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 24 }}>
                {[
                  { label_en: "Age", label_uk: "Вік", val: age, setter: setAge, min: 18, max: 70, unit: isUk ? "років" : "yrs" },
                  { label_en: "Weight", label_uk: "Вага", val: weight, setter: setWeight, min: 40, max: 150, unit: "kg" },
                  { label_en: "Height", label_uk: "Зріст", val: height, setter: setHeight, min: 140, max: 220, unit: "cm" },
                ].map((field) => (
                  <div key={field.label_en}>
                    <label
                      style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#374151", marginBottom: 8 }}
                    >
                      {isUk ? field.label_uk : field.label_en}
                    </label>
                    <div style={{ position: "relative" }}>
                      <input
                        type="number"
                        min={field.min}
                        max={field.max}
                        value={field.val}
                        onChange={(e) => field.setter(Number(e.target.value))}
                        style={{
                          width: "100%",
                          padding: "10px 48px 10px 16px",
                          border: "2px solid #E5E7EB",
                          borderRadius: 10,
                          fontSize: 16,
                          fontWeight: 600,
                          color: "#111827",
                          outline: "none",
                          boxSizing: "border-box",
                        }}
                      />
                      <span
                        style={{
                          position: "absolute",
                          right: 12,
                          top: "50%",
                          transform: "translateY(-50%)",
                          fontSize: 12,
                          color: "#9CA3AF",
                          fontWeight: 500,
                        }}
                      >
                        {field.unit}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Activity */}
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#374151", marginBottom: 8 }}>
                  {isUk ? "Рівень активності" : "Activity Level"}
                </label>
                <select
                  value={activity}
                  onChange={(e) => setActivity(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "2px solid #E5E7EB",
                    borderRadius: 10,
                    fontSize: 15,
                    color: "#374151",
                    background: "#fff",
                    cursor: "pointer",
                  }}
                >
                  <option value="sedentary">{isUk ? "Малорухливий (без спорту)" : "Sedentary (no exercise)"}</option>
                  <option value="light">{isUk ? "Легка активність (1-3 дні/тиж)" : "Light (1-3 days/week)"}</option>
                  <option value="moderate">{isUk ? "Помірна активність (3-5 днів/тиж)" : "Moderate (3-5 days/week)"}</option>
                  <option value="active">{isUk ? "Висока активність (6-7 днів/тиж)" : "Active (6-7 days/week)"}</option>
                  <option value="veryactive">{isUk ? "Дуже висока (двічі на день)" : "Very Active (twice a day)"}</option>
                </select>
              </div>

              {/* Goal */}
              <div style={{ marginBottom: 32 }}>
                <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#374151", marginBottom: 10 }}>
                  {isUk ? "Ваша мета" : "Your Goal"}
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                  {[
                    { id: "lose", en: "🔥 Lose Weight", uk: "🔥 Схуднути" },
                    { id: "maintain", en: "⚖️ Maintain", uk: "⚖️ Підтримувати вагу" },
                    { id: "gain", en: "💪 Gain Muscle", uk: "💪 Набрати м'язи" },
                  ].map((g) => (
                    <button
                      key={g.id}
                      onClick={() => setGoal(g.id)}
                      style={{
                        padding: "14px",
                        borderRadius: 12,
                        border: `2px solid ${goal === g.id ? "#16A34A" : "#E5E7EB"}`,
                        background: goal === g.id ? "#DCFCE7" : "#FAFAFA",
                        color: goal === g.id ? "#14532D" : "#6B7280",
                        fontWeight: 600,
                        fontSize: 14,
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                    >
                      {isUk ? g.uk : g.en}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={calculateMacros}
                style={{
                  width: "100%",
                  padding: "16px",
                  background: "linear-gradient(135deg, #16A34A, #84CC16)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 14,
                  fontSize: 17,
                  fontWeight: 700,
                  cursor: "pointer",
                  letterSpacing: 0.3,
                  boxShadow: "0 4px 14px rgba(22,163,74,0.4)",
                }}
              >
                {isUk ? "Розрахувати КБЖУ →" : "Calculate My Macros →"}
              </button>
            </div>

            {/* Result */}
            {macroResult && (
              <div
                style={{
                  background: "linear-gradient(135deg, #14532D 0%, #166534 100%)",
                  borderRadius: 24,
                  padding: "32px",
                  color: "#fff",
                  marginBottom: 24,
                }}
              >
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24, textAlign: "center" }}>
                  {isUk ? "Ваша денна норма" : "Your Daily Targets"}
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: 16,
                    marginBottom: 24,
                  }}
                >
                  {[
                    { label: isUk ? "Калорії" : "Calories", val: macroResult.calories, unit: isUk ? "ккал" : "kcal", color: "#84CC16" },
                    { label: isUk ? "Білки" : "Protein", val: macroResult.protein, unit: "g", color: "#34D399" },
                    { label: isUk ? "Жири" : "Fat", val: macroResult.fat, unit: "g", color: "#FCD34D" },
                    { label: isUk ? "Вуглеводи" : "Carbs", val: macroResult.carbs, unit: "g", color: "#F9A8D4" },
                  ].map((m) => (
                    <div
                      key={m.label}
                      style={{
                        background: "rgba(255,255,255,0.1)",
                        borderRadius: 16,
                        padding: "20px",
                        textAlign: "center",
                        borderTop: `3px solid ${m.color}`,
                      }}
                    >
                      <div style={{ fontSize: 32, fontWeight: 800, color: m.color }}>{m.val}</div>
                      <div style={{ fontSize: 12, opacity: 0.7, marginTop: 2 }}>{m.unit}</div>
                      <div style={{ fontSize: 13, fontWeight: 600, marginTop: 6 }}>{m.label}</div>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    background: "rgba(132, 204, 22, 0.2)",
                    borderRadius: 12,
                    padding: "16px 20px",
                    border: "1px solid rgba(132, 204, 22, 0.4)",
                    textAlign: "center",
                  }}
                >
                  <span style={{ fontSize: 15, fontWeight: 600 }}>
                    {isUk ? "Рекомендований план: " : "Recommended plan: "}
                  </span>
                  <span style={{ fontSize: 15, color: "#84CC16", fontWeight: 700, textTransform: "uppercase" }}>
                    {macroResult.suggestedPlan === "light"
                      ? isUk ? "Легкий" : "Light"
                      : macroResult.suggestedPlan === "balance"
                      ? isUk ? "Баланс" : "Balance"
                      : isUk ? "Повний" : "Full"}
                    {" "}— {isUk ? "ідеально для вашої мети!" : "perfect for your goal!"}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* WEEKLY MENU SECTION */}
        {activeSection === "menu" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <h2 style={{ fontSize: 32, fontWeight: 800, color: "#14532D", marginBottom: 8 }}>
                {isUk ? "Меню на тиждень" : "Weekly Menu"}
              </h2>
              <p style={{ color: "#6B7280" }}>
                {isUk ? "Свіже меню кожного тижня від наших шефів" : "Fresh weekly menu from our chefs"}
              </p>
            </div>

            {/* Diet filter */}
            <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
              {diets.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDiet(d.id)}
                  style={{
                    padding: "8px 18px",
                    borderRadius: 20,
                    border: `2px solid ${selectedDiet === d.id ? "#16A34A" : "#D1FAE5"}`,
                    background: selectedDiet === d.id ? "#16A34A" : "#fff",
                    color: selectedDiet === d.id ? "#fff" : "#16A34A",
                    fontWeight: 600,
                    fontSize: 14,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {isUk ? d.uk : d.en}
                </button>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
              {weekMenu.map((day) => (
                <div
                  key={day.day}
                  style={{
                    background: "#fff",
                    borderRadius: 16,
                    overflow: "hidden",
                    boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                  }}
                >
                  <div
                    style={{
                      background: "linear-gradient(135deg, #16A34A, #84CC16)",
                      padding: "10px 14px",
                      textAlign: "center",
                    }}
                  >
                    <span style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>
                      {isUk ? day.dayUk : day.day}
                    </span>
                  </div>
                  <div style={{ padding: "12px" }}>
                    {day.meals.map((meal, idx) => (
                      <div
                        key={idx}
                        style={{
                          padding: "10px",
                          background: "#F9FBF9",
                          borderRadius: 10,
                          marginBottom: idx < day.meals.length - 1 ? 8 : 0,
                        }}
                      >
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#111827", marginBottom: 4, lineHeight: 1.3 }}>
                          {isUk ? meal.nameUk : meal.name}
                        </div>
                        <div style={{ fontSize: 11, color: "#6B7280", marginBottom: 6 }}>
                          {meal.cal} {isUk ? "ккал" : "kcal"} · {isUk ? `Б${meal.p}` : `P${meal.p}`}/{isUk ? `Ж${meal.f}` : `F${meal.f}`}/{isUk ? `В${meal.c}` : `C${meal.c}`}g
                        </div>
                        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                          {meal.tags.map((tag) => (
                            <span
                              key={tag}
                              style={{
                                fontSize: 10,
                                fontWeight: 700,
                                padding: "2px 6px",
                                borderRadius: 6,
                                background: `${tagColors[tag] ?? "#6B7280"}22`,
                                color: tagColors[tag] ?? "#6B7280",
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PLANS SECTION */}
        {activeSection === "plans" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <h2 style={{ fontSize: 32, fontWeight: 800, color: "#14532D", marginBottom: 8 }}>
                {isUk ? "Плани підписки" : "Subscription Plans"}
              </h2>
              <p style={{ color: "#6B7280" }}>
                {isUk ? "Обирайте кількість страв на тиждень" : "Choose the number of meals per week"}
              </p>
            </div>

            {/* Diet filter */}
            <div style={{ display: "flex", gap: 8, marginBottom: 28, justifyContent: "center" }}>
              {diets.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDiet(d.id)}
                  style={{
                    padding: "7px 16px",
                    borderRadius: 20,
                    border: `2px solid ${selectedDiet === d.id ? "#16A34A" : "#D1FAE5"}`,
                    background: selectedDiet === d.id ? "#16A34A" : "#fff",
                    color: selectedDiet === d.id ? "#fff" : "#16A34A",
                    fontWeight: 600,
                    fontSize: 13,
                    cursor: "pointer",
                  }}
                >
                  {isUk ? d.uk : d.en}
                </button>
              ))}
            </div>

            {macroResult && (
              <div
                style={{
                  background: "#DCFCE7",
                  border: "1px solid #86EFAC",
                  borderRadius: 12,
                  padding: "14px 20px",
                  marginBottom: 24,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <span style={{ fontSize: 18 }}>🎯</span>
                <span style={{ fontSize: 14, color: "#14532D", fontWeight: 600 }}>
                  {isUk
                    ? `На основі вашого КБЖУ (${macroResult.calories} ккал/день) ми рекомендуємо план нижче`
                    : `Based on your macros (${macroResult.calories} kcal/day) we highlighted the best plan below`}
                </span>
              </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 40 }}>
              {plans.map((plan) => {
                const isSelected = selectedPlan === plan.id;
                const isRecommended = macroResult?.suggestedPlan === plan.id;
                return (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id)}
                    style={{
                      background: isSelected ? "linear-gradient(135deg, #16A34A, #166534)" : "#fff",
                      borderRadius: 20,
                      padding: "28px",
                      cursor: "pointer",
                      border: `3px solid ${isSelected ? "#16A34A" : isRecommended ? "#84CC16" : "#E5E7EB"}`,
                      position: "relative",
                      boxShadow: isSelected ? "0 8px 24px rgba(22,163,74,0.3)" : "0 1px 6px rgba(0,0,0,0.06)",
                      transition: "all 0.25s",
                    }}
                  >
                    {plan.badge && (
                      <div
                        style={{
                          position: "absolute",
                          top: -14,
                          left: "50%",
                          transform: "translateX(-50%)",
                          background: "#84CC16",
                          color: "#14532D",
                          fontSize: 12,
                          fontWeight: 700,
                          padding: "4px 14px",
                          borderRadius: 20,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {plan.badge}
                      </div>
                    )}
                    {isRecommended && !isSelected && (
                      <div
                        style={{
                          position: "absolute",
                          top: -14,
                          right: 20,
                          background: "#FEF9C3",
                          color: "#713F12",
                          fontSize: 11,
                          fontWeight: 700,
                          padding: "3px 10px",
                          borderRadius: 20,
                        }}
                      >
                        {isUk ? "✨ Ваш вибір" : "✨ Your match"}
                      </div>
                    )}
                    <h3
                      style={{
                        fontSize: 22,
                        fontWeight: 800,
                        color: isSelected ? "#fff" : "#14532D",
                        marginBottom: 4,
                      }}
                    >
                      {isUk ? plan.uk : plan.en}
                    </h3>
                    <p style={{ fontSize: 14, color: isSelected ? "#BBF7D0" : "#6B7280", marginBottom: 20 }}>
                      {plan.meals} {isUk ? "страв/тиждень" : "meals/week"}
                    </p>
                    <div style={{ marginBottom: 20 }}>
                      <span
                        style={{
                          fontSize: 36,
                          fontWeight: 800,
                          color: isSelected ? "#84CC16" : "#16A34A",
                        }}
                      >
                        {plan.priceWeek.toLocaleString()}
                      </span>
                      <span style={{ fontSize: 14, color: isSelected ? "#BBF7D0" : "#9CA3AF", marginLeft: 4 }}>
                        {isUk ? "грн/тиждень" : "UAH/week"}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        color: isSelected ? "#D1FAE5" : "#6B7280",
                        marginBottom: 20,
                      }}
                    >
                      {plan.pricePerMeal} {isUk ? "грн/страва" : "UAH/meal"}
                    </div>
                    <button
                      style={{
                        width: "100%",
                        padding: "12px",
                        borderRadius: 12,
                        border: "none",
                        background: isSelected ? "#84CC16" : "#DCFCE7",
                        color: isSelected ? "#14532D" : "#16A34A",
                        fontWeight: 700,
                        fontSize: 14,
                        cursor: "pointer",
                      }}
                    >
                      {isSelected
                        ? isUk ? "✓ Обрано" : "✓ Selected"
                        : isUk ? "Обрати план" : "Choose Plan"}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* 4-step subscription flow */}
            <div
              style={{
                background: "#fff",
                borderRadius: 20,
                padding: "28px",
                boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
              }}
            >
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#14532D", marginBottom: 20 }}>
                {isUk ? "Оформлення підписки" : "Subscription Flow"}
              </h3>
              <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
                {[
                  { en: "Choose Plan", uk: "Оберіть план", icon: "📋" },
                  { en: "Customize Exclusions", uk: "Виключення продуктів", icon: "⚙️" },
                  { en: "Delivery Address", uk: "Адреса доставки", icon: "📍" },
                  { en: "Payment", uk: "Оплата", icon: "💳" },
                ].map((step, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                    <div style={{ flex: 1, textAlign: "center" }}>
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: "50%",
                          background: idx === 0 ? "#16A34A" : "#E5E7EB",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 20,
                          margin: "0 auto 8px",
                        }}
                      >
                        {step.icon}
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>
                        {isUk ? step.uk : step.en}
                      </div>
                    </div>
                    {idx < 3 && (
                      <div style={{ width: 32, height: 2, background: "#E5E7EB", flexShrink: 0 }} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* HOW IT WORKS SECTION */}
        {activeSection === "steps" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <h2 style={{ fontSize: 32, fontWeight: 800, color: "#14532D", marginBottom: 8 }}>
                {isUk ? "Як працює GreenPlate" : "How GreenPlate Works"}
              </h2>
              <p style={{ color: "#6B7280", fontSize: 16 }}>
                {isUk ? "Три прості кроки до здорового харчування" : "Three simple steps to healthy eating"}
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }}>
              {/* Steps */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  {
                    num: "01",
                    icon: "📋",
                    en: "Choose Your Plan",
                    uk: "Оберіть план",
                    desc_en: "Select a subscription plan that matches your nutritional goals and dietary preferences. Use our macro calculator to find the perfect fit.",
                    desc_uk: "Оберіть план підписки, що відповідає вашим харчовим цілям та уподобанням. Використайте наш калькулятор КБЖУ.",
                    color: "#16A34A",
                  },
                  {
                    num: "02",
                    icon: "👨‍🍳",
                    en: "We Cook Fresh",
                    uk: "Ми готуємо свіже",
                    desc_en: "Our professional chefs prepare your meals fresh every Sunday using locally sourced, organic ingredients. No preservatives, no compromises.",
                    desc_uk: "Наші шеф-кухарі готують ваші страви щонеділі зі свіжих місцевих органічних продуктів. Без консервантів.",
                    color: "#84CC16",
                  },
                  {
                    num: "03",
                    icon: "🚚",
                    en: "We Deliver Weekly",
                    uk: "Доставляємо щотижня",
                    desc_en: "Every Monday morning your meals arrive at your door in eco-friendly insulated packaging. Ready to heat in 3 minutes.",
                    desc_uk: "Щопонеділка вранці ваші страви прибувають до дверей в екологічній упаковці. Готові за 3 хвилини в мікрохвильовій печі.",
                    color: "#16A34A",
                  },
                ].map((step) => (
                  <div
                    key={step.num}
                    style={{
                      background: "#fff",
                      borderRadius: 16,
                      padding: "24px",
                      display: "flex",
                      gap: 16,
                      boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                      borderLeft: `4px solid ${step.color}`,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 32,
                        flexShrink: 0,
                        width: 56,
                        height: 56,
                        background: `${step.color}18`,
                        borderRadius: 14,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {step.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: step.color, marginBottom: 4 }}>
                        {isUk ? "КРОК " : "STEP "}{step.num}
                      </div>
                      <h3 style={{ fontSize: 17, fontWeight: 700, color: "#111827", marginBottom: 6 }}>
                        {isUk ? step.uk : step.en}
                      </h3>
                      <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.6 }}>
                        {isUk ? step.desc_uk : step.desc_en}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social proof */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div
                  style={{
                    background: "linear-gradient(135deg, #16A34A, #84CC16)",
                    borderRadius: 20,
                    padding: "28px",
                    color: "#fff",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: 48, marginBottom: 8 }}>⭐</div>
                  <div style={{ fontSize: 56, fontWeight: 800 }}>4.9</div>
                  <div style={{ fontSize: 15, opacity: 0.9, marginBottom: 16 }}>
                    {isUk ? "середній рейтинг" : "average rating"}
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 700 }}>8,200+</div>
                  <div style={{ fontSize: 14, opacity: 0.9 }}>
                    {isUk ? "щасливих підписників" : "happy subscribers"}
                  </div>
                </div>

                {[
                  {
                    name: "Olena K.",
                    en: "Lost 8 kg in 2 months without any effort. The food is genuinely delicious!",
                    uk: "Скинула 8 кг за 2 місяці без зусиль. Їжа справді смачна!",
                    stars: 5,
                  },
                  {
                    name: "Dmytro V.",
                    en: "Perfect for a busy schedule. I never have to think about what to eat.",
                    uk: "Ідеально для зайнятого графіку. Більше не думаю що їсти.",
                    stars: 5,
                  },
                ].map((review) => (
                  <div
                    key={review.name}
                    style={{
                      background: "#fff",
                      borderRadius: 16,
                      padding: "20px",
                      boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                    }}
                  >
                    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          background: "#DCFCE7",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 18,
                          flexShrink: 0,
                        }}
                      >
                        👤
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 14, color: "#111827", marginBottom: 2 }}>
                          {review.name}
                        </div>
                        <div style={{ color: "#F59E0B", fontSize: 12, marginBottom: 6 }}>
                          {"★".repeat(review.stars)}
                        </div>
                        <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.5 }}>
                          "{isUk ? review.uk : review.en}"
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer
        style={{
          background: "#14532D",
          color: "#BBF7D0",
          padding: "24px",
          textAlign: "center",
          marginTop: 32,
        }}
      >
        <div style={{ fontSize: 14, marginBottom: 4 }}>
          <strong style={{ color: "#84CC16" }}>GreenPlate</strong> —{" "}
          {isUk ? "здорові страви з доставкою по Києву" : "healthy meals delivered in Kyiv"}
        </div>
        <div style={{ fontSize: 12, opacity: 0.6 }}>
          {isUk ? "Демо-версія для Codeworth" : "Demo component for Codeworth"}
        </div>
      </footer>
    </div>
  );
}
