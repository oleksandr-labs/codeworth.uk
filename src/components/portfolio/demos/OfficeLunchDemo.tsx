"use client";
import { useState } from "react";

type MealOption = { id: string; en: string; uk: string; cal: number; isVeg: boolean; isGF: boolean };
type Employee = {
  id: number;
  name: string;
  position: string;
  positionUk: string;
  meals: Record<string, string>;
};

const MEAL_OPTIONS: Record<string, MealOption[]> = {
  Mon: [
    { id: "m1", en: "Chicken breast & rice", uk: "Куряча грудка з рисом", cal: 480, isVeg: false, isGF: true },
    { id: "m2", en: "Lentil soup + bread", uk: "Суп з сочевиці + хліб", cal: 350, isVeg: true, isGF: false },
    { id: "m3", en: "Caesar salad + protein", uk: "Салат Цезар + білок", cal: 420, isVeg: false, isGF: false },
  ],
  Tue: [
    { id: "t1", en: "Beef goulash & pasta", uk: "Гуляш з яловичини + паста", cal: 560, isVeg: false, isGF: false },
    { id: "t2", en: "Veggie Buddha bowl", uk: "Боул з овочами", cal: 380, isVeg: true, isGF: true },
    { id: "t3", en: "Salmon fillet & greens", uk: "Філе лосося з зеленню", cal: 490, isVeg: false, isGF: true },
  ],
  Wed: [
    { id: "w1", en: "Turkey & buckwheat", uk: "Індичка з гречкою", cal: 470, isVeg: false, isGF: true },
    { id: "w2", en: "Caprese + grain bowl", uk: "Капрезе + зерновий боул", cal: 360, isVeg: true, isGF: false },
    { id: "w3", en: "Pork tenderloin & veg", uk: "Свинина з овочами", cal: 520, isVeg: false, isGF: true },
  ],
  Thu: [
    { id: "th1", en: "Chicken wrap", uk: "Рол з куркою", cal: 440, isVeg: false, isGF: false },
    { id: "th2", en: "Falafel & hummus", uk: "Фалафель + хумус", cal: 400, isVeg: true, isGF: true },
    { id: "th3", en: "Tuna & quinoa salad", uk: "Салат з тунцем і кіноа", cal: 410, isVeg: false, isGF: true },
  ],
  Fri: [
    { id: "f1", en: "BBQ chicken & corn", uk: "Курка BBQ + кукурудза", cal: 500, isVeg: false, isGF: true },
    { id: "f2", en: "Pesto pasta vegetarian", uk: "Паста з песто (вегетаріанська)", cal: 430, isVeg: true, isGF: false },
    { id: "f3", en: "Grilled fish & salad", uk: "Риба гриль + салат", cal: 390, isVeg: false, isGF: true },
  ],
};

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"] as const;
const DAYS_UK: Record<string, string> = { Mon: "Пн", Tue: "Вт", Wed: "Ср", Thu: "Чт", Fri: "Пт" };

const INITIAL_EMPLOYEES: Employee[] = [
  { id: 1, name: "Anna Kovalenko", position: "HR Manager", positionUk: "HR-менеджер", meals: { Mon: "m1", Tue: "t2", Wed: "w2", Thu: "th2", Fri: "f2" } },
  { id: 2, name: "Dmytro Shevchenko", position: "Developer", positionUk: "Розробник", meals: { Mon: "m3", Tue: "t1", Wed: "w1", Thu: "th1", Fri: "f1" } },
  { id: 3, name: "Olena Bondarenko", position: "Designer", positionUk: "Дизайнер", meals: { Mon: "m2", Tue: "t2", Wed: "w2", Thu: "th2", Fri: "f2" } },
  { id: 4, name: "Maxym Hrytsenko", position: "Sales Lead", positionUk: "Менеджер з продажу", meals: { Mon: "m1", Tue: "t3", Wed: "w3", Thu: "th3", Fri: "f3" } },
  { id: 5, name: "Iryna Moroz", position: "Accountant", positionUk: "Бухгалтер", meals: { Mon: "m2", Tue: "t2", Wed: "w2", Thu: "th2", Fri: "f2" } },
  { id: 6, name: "Serhii Savchenko", position: "CTO", positionUk: "Технічний директор", meals: { Mon: "m3", Tue: "t3", Wed: "w1", Thu: "th1", Fri: "f1" } },
  { id: 7, name: "Natalia Petrenko", position: "Marketing", positionUk: "Маркетинг", meals: { Mon: "m1", Tue: "t1", Wed: "w3", Thu: "th3", Fri: "f3" } },
  { id: 8, name: "Viktor Lysenko", position: "DevOps", positionUk: "DevOps-інженер", meals: { Mon: "m3", Tue: "t1", Wed: "w3", Thu: "th1", Fri: "f1" } },
];

const PRICE_PER_MEAL = 150;

export function OfficeLunchDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);
  const [filter, setFilter] = useState<"all" | "veg" | "gf">("all");
  const [confirmed, setConfirmed] = useState(false);
  const [activeSection, setActiveSection] = useState<"hero" | "dashboard" | "menu" | "plans" | "enterprise">("hero");
  const [enterpriseForm, setEnterpriseForm] = useState({ company: "", size: "", contact: "" });
  const [formSent, setFormSent] = useState(false);

  function getMeal(dayKey: string, mealId: string): MealOption | undefined {
    return MEAL_OPTIONS[dayKey]?.find((m) => m.id === mealId);
  }

  function updateMeal(empId: number, day: string, mealId: string) {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === empId ? { ...emp, meals: { ...emp.meals, [day]: mealId } } : emp
      )
    );
    setConfirmed(false);
  }

  function getWeekTotal(emp: Employee): number {
    return DAYS.reduce((sum, day) => {
      const meal = getMeal(day, emp.meals[day]);
      return sum + (meal?.cal ?? 0);
    }, 0);
  }

  function matchesFilter(emp: Employee): boolean {
    if (filter === "all") return true;
    return DAYS.every((day) => {
      const meal = getMeal(day, emp.meals[day]);
      if (!meal) return false;
      if (filter === "veg") return meal.isVeg;
      if (filter === "gf") return meal.isGF;
      return true;
    });
  }

  const visibleEmployees = employees.filter(matchesFilter);
  const totalCost = employees.length * DAYS.length * PRICE_PER_MEAL;

  const plans = [
    {
      id: "starter",
      en: "Starter",
      uk: "Стартер",
      people_en: "Up to 20 people",
      people_uk: "До 20 осіб",
      price: 145,
      features_en: ["Daily delivery", "3 menu options/day", "Dietary tags", "Email support"],
      features_uk: ["Щоденна доставка", "3 страви на день", "Дієтичні мітки", "Підтримка по email"],
    },
    {
      id: "business",
      en: "Business",
      uk: "Бізнес",
      people_en: "20 – 100 people",
      people_uk: "20 – 100 осіб",
      price: 135,
      badge: isUk ? "Найпопулярніший" : "Most Popular",
      features_en: ["Daily delivery", "5 menu options/day", "HR dashboard", "Priority support", "Monthly reporting"],
      features_uk: ["Щоденна доставка", "5 страв на день", "HR-дашборд", "Пріоритетна підтримка", "Щомісячні звіти"],
    },
    {
      id: "enterprise",
      en: "Enterprise",
      uk: "Корпоратив",
      people_en: "100+ people",
      people_uk: "100+ осіб",
      price: null,
      features_en: ["Custom delivery schedule", "Branded packaging", "Dedicated account manager", "Full API access", "SLA 99.5%"],
      features_uk: ["Гнучкий графік доставки", "Брендована упаковка", "Персональний менеджер", "Повний доступ API", "SLA 99.5%"],
    },
  ];

  const navItems = [
    { id: "hero", en: "Overview", uk: "Огляд" },
    { id: "dashboard", en: "HR Dashboard", uk: "HR Дашборд" },
    { id: "menu", en: "Menu", uk: "Меню" },
    { id: "plans", en: "Plans", uk: "Плани" },
    { id: "enterprise", en: "Enterprise", uk: "Корпоратив" },
  ] as const;

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#F8FAFC", minHeight: "100vh" }}>
      {/* Header */}
      <header
        style={{
          background: "#2563EB",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
          boxShadow: "0 2px 8px rgba(37,99,235,0.3)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              background: "#fff",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
            }}
          >
            🍽️
          </div>
          <span style={{ color: "#fff", fontWeight: 700, fontSize: 20, letterSpacing: -0.5 }}>
            OfficeLunch
          </span>
        </div>
        <nav style={{ display: "flex", gap: 4 }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              style={{
                background: activeSection === item.id ? "rgba(255,255,255,0.2)" : "transparent",
                color: "#fff",
                border: activeSection === item.id ? "1px solid rgba(255,255,255,0.4)" : "1px solid transparent",
                borderRadius: 8,
                padding: "6px 12px",
                fontSize: 13,
                fontWeight: activeSection === item.id ? 700 : 500,
                cursor: "pointer",
              }}
            >
              {isUk ? item.uk : item.en}
            </button>
          ))}
        </nav>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 13 }}>500+ {isUk ? "компаній" : "companies"}</span>
          <button
            style={{
              background: "#16A34A",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "8px 16px",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {isUk ? "Замовити демо" : "Book Demo"}
          </button>
        </div>
      </header>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}>

        {/* HERO SECTION */}
        {activeSection === "hero" && (
          <div>
            {/* Hero */}
            <div
              style={{
                background: "linear-gradient(135deg, #1E40AF 0%, #2563EB 60%, #3B82F6 100%)",
                borderRadius: 24,
                padding: "56px 48px",
                color: "#fff",
                marginBottom: 32,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  right: -60,
                  top: -60,
                  width: 320,
                  height: 320,
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: "50%",
                }}
              />
              <div style={{ position: "relative", zIndex: 1, maxWidth: 640 }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "rgba(255,255,255,0.15)",
                    borderRadius: 20,
                    padding: "5px 14px",
                    fontSize: 13,
                    fontWeight: 600,
                    marginBottom: 20,
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      background: "#4ADE80",
                      borderRadius: "50%",
                      display: "inline-block",
                    }}
                  />
                  {isUk ? "B2B корпоративне харчування" : "B2B Corporate Catering"}
                </div>
                <h1 style={{ fontSize: 40, fontWeight: 800, marginBottom: 16, lineHeight: 1.2 }}>
                  {isUk
                    ? "Смачні обіди для вашої команди — щодня"
                    : "Tasty meals for your team — every day"}
                </h1>
                <p style={{ fontSize: 17, opacity: 0.85, marginBottom: 32, lineHeight: 1.6 }}>
                  {isUk
                    ? "Корпоративне харчування з доставкою до офісу. HR-дашборд, облік вподобань, прозора звітність."
                    : "Corporate lunch delivery to your office. HR dashboard, dietary tracking, transparent reporting."}
                </p>
                <div style={{ display: "flex", gap: 12 }}>
                  <button
                    onClick={() => setActiveSection("dashboard")}
                    style={{
                      background: "#fff",
                      color: "#2563EB",
                      border: "none",
                      borderRadius: 12,
                      padding: "14px 28px",
                      fontSize: 15,
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    {isUk ? "Відкрити HR Дашборд" : "Open HR Dashboard"}
                  </button>
                  <button
                    onClick={() => setActiveSection("plans")}
                    style={{
                      background: "transparent",
                      color: "#fff",
                      border: "2px solid rgba(255,255,255,0.5)",
                      borderRadius: 12,
                      padding: "14px 28px",
                      fontSize: 15,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    {isUk ? "Переглянути плани" : "View Plans"}
                  </button>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 32 }}>
              {[
                { val: "500+", en: "Companies trust us", uk: "Компаній нам довіряють" },
                { val: "15,000", en: "Lunches per day", uk: "Обідів на день" },
                { val: "SLA 99.5%", en: "Delivery reliability", uk: "Надійність доставки" },
              ].map((s) => (
                <div
                  key={s.val}
                  style={{
                    background: "#fff",
                    borderRadius: 16,
                    padding: "24px",
                    textAlign: "center",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                    borderTop: "3px solid #2563EB",
                  }}
                >
                  <div style={{ fontSize: 30, fontWeight: 800, color: "#2563EB", marginBottom: 4 }}>{s.val}</div>
                  <div style={{ fontSize: 14, color: "#6B7280" }}>{isUk ? s.uk : s.en}</div>
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
              <h2 style={{ fontSize: 22, fontWeight: 700, color: "#1E3A8A", marginBottom: 28, textAlign: "center" }}>
                {isUk ? "Як це працює" : "How It Works"}
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
                {[
                  {
                    step: "1",
                    icon: "👥",
                    en: "HR Registers",
                    uk: "HR реєструється",
                    desc_en: "HR sets up the company account and invites employees",
                    desc_uk: "HR налаштовує акаунт та запрошує команду",
                  },
                  {
                    step: "2",
                    icon: "🗂️",
                    en: "Employees Choose",
                    uk: "Команда обирає",
                    desc_en: "Each person selects meals by Thursday noon",
                    desc_uk: "Кожен обирає страви до четверга в обід",
                  },
                  {
                    step: "3",
                    icon: "✅",
                    en: "HR Confirms",
                    uk: "HR підтверджує",
                    desc_en: "HR reviews and confirms the weekly order in one click",
                    desc_uk: "HR переглядає і підтверджує замовлення одним кліком",
                  },
                  {
                    step: "4",
                    icon: "🕧",
                    en: "Delivery at 12:30",
                    uk: "Доставка о 12:30",
                    desc_en: "Fresh lunches arrive at your office door at 12:30 sharp",
                    desc_uk: "Свіжі обіди доставляємо рівно о 12:30 до офісу",
                  },
                ].map((item) => (
                  <div key={item.step} style={{ textAlign: "center" }}>
                    <div
                      style={{
                        width: 56,
                        height: 56,
                        background: "#EFF6FF",
                        borderRadius: 14,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 24,
                        margin: "0 auto 12px",
                      }}
                    >
                      {item.icon}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: "#2563EB",
                        marginBottom: 4,
                        textTransform: "uppercase",
                        letterSpacing: 0.5,
                      }}
                    >
                      {isUk ? "КРОК " : "STEP "}{item.step}
                    </div>
                    <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1E3A8A", marginBottom: 6 }}>
                      {isUk ? item.uk : item.en}
                    </h3>
                    <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.5 }}>
                      {isUk ? item.desc_uk : item.desc_en}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* HR DASHBOARD SECTION */}
        {activeSection === "dashboard" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <div>
                <h2 style={{ fontSize: 26, fontWeight: 800, color: "#1E3A8A", marginBottom: 4 }}>
                  {isUk ? "HR Дашборд — Управління замовленнями" : "HR Dashboard — Order Manager"}
                </h2>
                <p style={{ color: "#6B7280", fontSize: 14 }}>
                  {isUk
                    ? "Тиждень: 31 берез. – 4 квіт. 2026 · Дедлайн підтвердження: четвер 12:00"
                    : "Week: Mar 31 – Apr 4, 2026 · Confirmation deadline: Thursday 12:00"}
                </p>
              </div>
              <button
                onClick={() => setConfirmed(true)}
                style={{
                  background: confirmed ? "#16A34A" : "#2563EB",
                  color: "#fff",
                  border: "none",
                  borderRadius: 12,
                  padding: "12px 24px",
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: confirmed
                    ? "0 4px 12px rgba(22,163,74,0.35)"
                    : "0 4px 12px rgba(37,99,235,0.35)",
                  transition: "all 0.2s",
                }}
              >
                {confirmed
                  ? isUk ? "✓ Підтверджено!" : "✓ Confirmed!"
                  : isUk ? "Підтвердити тижневе замовлення" : "Confirm Weekly Order"}
              </button>
            </div>

            {/* Summary stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
              {[
                { val: `${employees.length}`, en: "Team members", uk: "Членів команди", color: "#2563EB" },
                { val: `${DAYS.length}`, en: "Working days", uk: "Робочих днів", color: "#7C3AED" },
                { val: `${PRICE_PER_MEAL} UAH`, en: "Per meal", uk: "За страву", color: "#D97706" },
                { val: `${totalCost.toLocaleString()} UAH`, en: "Week total", uk: "Сума за тиждень", color: "#16A34A" },
              ].map((s) => (
                <div
                  key={s.en}
                  style={{
                    background: "#fff",
                    borderRadius: 14,
                    padding: "18px 20px",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                    borderLeft: `4px solid ${s.color}`,
                  }}
                >
                  <div style={{ fontSize: 24, fontWeight: 800, color: s.color, marginBottom: 2 }}>{s.val}</div>
                  <div style={{ fontSize: 13, color: "#6B7280" }}>{isUk ? s.uk : s.en}</div>
                </div>
              ))}
            </div>

            {/* Filter */}
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              {([
                { id: "all", en: "Show All", uk: "Усі" },
                { id: "veg", en: "Vegetarian Only", uk: "Тільки вегетаріанці" },
                { id: "gf", en: "Gluten-Free Only", uk: "Без глютену" },
              ] as const).map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  style={{
                    padding: "7px 16px",
                    borderRadius: 8,
                    border: `1px solid ${filter === f.id ? "#2563EB" : "#E5E7EB"}`,
                    background: filter === f.id ? "#EFF6FF" : "#fff",
                    color: filter === f.id ? "#2563EB" : "#6B7280",
                    fontWeight: filter === f.id ? 700 : 500,
                    fontSize: 13,
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  {isUk ? f.uk : f.en}
                </button>
              ))}
              <span style={{ marginLeft: "auto", fontSize: 13, color: "#9CA3AF", alignSelf: "center" }}>
                {isUk
                  ? `Показано ${visibleEmployees.length} з ${employees.length} співробітників`
                  : `Showing ${visibleEmployees.length} of ${employees.length} employees`}
              </span>
            </div>

            {/* Table */}
            <div
              style={{
                background: "#fff",
                borderRadius: 16,
                boxShadow: "0 1px 6px rgba(0,0,0,0.07)",
                overflow: "hidden",
              }}
            >
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 900 }}>
                  <thead>
                    <tr style={{ background: "#1E3A8A" }}>
                      <th
                        style={{
                          padding: "14px 16px",
                          textAlign: "left",
                          color: "#fff",
                          fontSize: 13,
                          fontWeight: 600,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {isUk ? "Співробітник" : "Employee"}
                      </th>
                      <th
                        style={{
                          padding: "14px 12px",
                          textAlign: "left",
                          color: "#93C5FD",
                          fontSize: 12,
                          fontWeight: 500,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {isUk ? "Посада" : "Position"}
                      </th>
                      {DAYS.map((day) => (
                        <th
                          key={day}
                          style={{
                            padding: "14px 10px",
                            textAlign: "center",
                            color: "#BFDBFE",
                            fontSize: 12,
                            fontWeight: 600,
                            whiteSpace: "nowrap",
                            minWidth: 140,
                          }}
                        >
                          {isUk ? DAYS_UK[day] : day}
                        </th>
                      ))}
                      <th
                        style={{
                          padding: "14px 12px",
                          textAlign: "center",
                          color: "#BFDBFE",
                          fontSize: 12,
                          fontWeight: 600,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {isUk ? "Ккал/тиж" : "Kcal/wk"}
                      </th>
                      <th
                        style={{
                          padding: "14px 12px",
                          textAlign: "center",
                          color: "#BFDBFE",
                          fontSize: 12,
                          fontWeight: 600,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {isUk ? "Сума" : "Total"}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleEmployees.map((emp, idx) => {
                      const weekCal = getWeekTotal(emp);
                      const weekCost = DAYS.length * PRICE_PER_MEAL;
                      return (
                        <tr
                          key={emp.id}
                          style={{
                            background: idx % 2 === 0 ? "#fff" : "#F8FAFC",
                            borderBottom: "1px solid #F1F5F9",
                          }}
                        >
                          <td style={{ padding: "12px 16px", whiteSpace: "nowrap" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                              <div
                                style={{
                                  width: 32,
                                  height: 32,
                                  borderRadius: "50%",
                                  background: `hsl(${(emp.id * 47) % 360}, 60%, 88%)`,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: 13,
                                  fontWeight: 700,
                                  color: `hsl(${(emp.id * 47) % 360}, 50%, 30%)`,
                                  flexShrink: 0,
                                }}
                              >
                                {emp.name.split(" ").map((n) => n[0]).join("")}
                              </div>
                              <span style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>
                                {emp.name}
                              </span>
                            </div>
                          </td>
                          <td style={{ padding: "12px", whiteSpace: "nowrap" }}>
                            <span style={{ fontSize: 12, color: "#6B7280" }}>
                              {isUk ? emp.positionUk : emp.position}
                            </span>
                          </td>
                          {DAYS.map((day) => {
                            const currentMealId = emp.meals[day];
                            const dayOptions = MEAL_OPTIONS[day] ?? [];
                            const currentMeal = getMeal(day, currentMealId);
                            return (
                              <td key={day} style={{ padding: "8px 10px", textAlign: "center" }}>
                                <select
                                  value={currentMealId}
                                  onChange={(e) => updateMeal(emp.id, day, e.target.value)}
                                  style={{
                                    width: "100%",
                                    padding: "5px 6px",
                                    border: "1px solid #E5E7EB",
                                    borderRadius: 6,
                                    fontSize: 11,
                                    color: "#374151",
                                    background: currentMeal?.isVeg ? "#F0FDF4" : currentMeal?.isGF ? "#FEFCE8" : "#fff",
                                    cursor: "pointer",
                                  }}
                                >
                                  {dayOptions.map((opt) => (
                                    <option key={opt.id} value={opt.id}>
                                      {isUk ? opt.uk : opt.en} ({opt.cal})
                                    </option>
                                  ))}
                                </select>
                              </td>
                            );
                          })}
                          <td style={{ padding: "12px", textAlign: "center" }}>
                            <span style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>
                              {weekCal.toLocaleString()}
                            </span>
                          </td>
                          <td style={{ padding: "12px", textAlign: "center" }}>
                            <span
                              style={{
                                fontSize: 13,
                                fontWeight: 700,
                                color: "#16A34A",
                                background: "#F0FDF4",
                                padding: "3px 8px",
                                borderRadius: 6,
                              }}
                            >
                              {weekCost} {isUk ? "грн" : "UAH"}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr style={{ background: "#EFF6FF", borderTop: "2px solid #BFDBFE" }}>
                      <td
                        colSpan={2}
                        style={{
                          padding: "12px 16px",
                          fontSize: 13,
                          fontWeight: 700,
                          color: "#1E3A8A",
                        }}
                      >
                        {isUk ? "Разом по команді:" : "Team Total:"}
                      </td>
                      {DAYS.map((day) => {
                        const dayTotal = employees.reduce((sum, emp) => {
                          const meal = getMeal(day, emp.meals[day]);
                          return sum + (meal?.cal ?? 0);
                        }, 0);
                        return (
                          <td
                            key={day}
                            style={{
                              padding: "12px 10px",
                              textAlign: "center",
                              fontSize: 12,
                              color: "#3B82F6",
                              fontWeight: 600,
                            }}
                          >
                            {dayTotal} {isUk ? "ккал" : "kcal"}
                          </td>
                        );
                      })}
                      <td style={{ padding: "12px", textAlign: "center" }} />
                      <td
                        style={{
                          padding: "12px",
                          textAlign: "center",
                          fontSize: 15,
                          fontWeight: 800,
                          color: "#16A34A",
                        }}
                      >
                        {totalCost.toLocaleString()} {isUk ? "грн" : "UAH"}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {confirmed && (
              <div
                style={{
                  marginTop: 16,
                  background: "#F0FDF4",
                  border: "1px solid #86EFAC",
                  borderRadius: 12,
                  padding: "16px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <span style={{ fontSize: 24 }}>✅</span>
                <div>
                  <div style={{ fontWeight: 700, color: "#14532D", fontSize: 15 }}>
                    {isUk ? "Замовлення підтверджено!" : "Order Confirmed!"}
                  </div>
                  <div style={{ fontSize: 13, color: "#16A34A" }}>
                    {isUk
                      ? `${employees.length} обідів × 5 днів × ${PRICE_PER_MEAL} грн = ${totalCost.toLocaleString()} грн. Доставка о 12:30.`
                      : `${employees.length} people × 5 days × ${PRICE_PER_MEAL} UAH = ${totalCost.toLocaleString()} UAH. Delivery at 12:30.`}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* WEEKLY MENU SECTION */}
        {activeSection === "menu" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: "#1E3A8A", marginBottom: 8 }}>
                {isUk ? "Меню на тиждень" : "Weekly Menu"}
              </h2>
              <p style={{ color: "#6B7280" }}>
                {isUk ? "3 варіанти обіду на кожен день" : "3 lunch options for every day"}
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14 }}>
              {DAYS.map((day) => (
                <div
                  key={day}
                  style={{
                    background: "#fff",
                    borderRadius: 16,
                    overflow: "hidden",
                    boxShadow: "0 1px 6px rgba(0,0,0,0.07)",
                  }}
                >
                  <div
                    style={{
                      background: "#2563EB",
                      padding: "10px 14px",
                      textAlign: "center",
                    }}
                  >
                    <span style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>
                      {isUk ? DAYS_UK[day] : day}
                    </span>
                  </div>
                  <div style={{ padding: "12px" }}>
                    {(MEAL_OPTIONS[day] ?? []).map((meal, idx) => (
                      <div
                        key={meal.id}
                        style={{
                          padding: "10px 12px",
                          background: meal.isVeg ? "#F0FDF4" : meal.isGF ? "#FEFCE8" : "#F8FAFC",
                          borderRadius: 10,
                          marginBottom: idx < 2 ? 8 : 0,
                          borderLeft: `3px solid ${meal.isVeg ? "#16A34A" : meal.isGF ? "#CA8A04" : "#2563EB"}`,
                        }}
                      >
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#111827", marginBottom: 5, lineHeight: 1.3 }}>
                          {isUk ? meal.uk : meal.en}
                        </div>
                        <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 6 }}>
                          {meal.cal} {isUk ? "ккал" : "kcal"}
                        </div>
                        <div style={{ display: "flex", gap: 4 }}>
                          {meal.isVeg && (
                            <span
                              style={{
                                fontSize: 10,
                                fontWeight: 700,
                                padding: "2px 6px",
                                borderRadius: 4,
                                background: "#DCFCE7",
                                color: "#16A34A",
                              }}
                            >
                              {isUk ? "ВЕГ" : "VEG"}
                            </span>
                          )}
                          {meal.isGF && (
                            <span
                              style={{
                                fontSize: 10,
                                fontWeight: 700,
                                padding: "2px 6px",
                                borderRadius: 4,
                                background: "#FEF9C3",
                                color: "#92400E",
                              }}
                            >
                              GF
                            </span>
                          )}
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
              <h2 style={{ fontSize: 28, fontWeight: 800, color: "#1E3A8A", marginBottom: 8 }}>
                {isUk ? "Корпоративні плани" : "Corporate Plans"}
              </h2>
              <p style={{ color: "#6B7280" }}>
                {isUk ? "Від малих команд до великих корпорацій" : "From small teams to large enterprises"}
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  style={{
                    background: plan.id === "business" ? "linear-gradient(135deg, #1E40AF, #2563EB)" : "#fff",
                    borderRadius: 20,
                    padding: "32px 28px",
                    boxShadow:
                      plan.id === "business"
                        ? "0 8px 28px rgba(37,99,235,0.35)"
                        : "0 1px 6px rgba(0,0,0,0.07)",
                    border: plan.id === "business" ? "none" : "1px solid #E5E7EB",
                    position: "relative",
                  }}
                >
                  {plan.badge && (
                    <div
                      style={{
                        position: "absolute",
                        top: -14,
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "#F59E0B",
                        color: "#fff",
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
                  <h3
                    style={{
                      fontSize: 22,
                      fontWeight: 800,
                      color: plan.id === "business" ? "#fff" : "#1E3A8A",
                      marginBottom: 4,
                    }}
                  >
                    {isUk ? plan.uk : plan.en}
                  </h3>
                  <p
                    style={{
                      fontSize: 14,
                      color: plan.id === "business" ? "#BFDBFE" : "#6B7280",
                      marginBottom: 24,
                    }}
                  >
                    {isUk ? plan.people_uk : plan.people_en}
                  </p>
                  {plan.price ? (
                    <div style={{ marginBottom: 24 }}>
                      <span
                        style={{
                          fontSize: 40,
                          fontWeight: 800,
                          color: plan.id === "business" ? "#93C5FD" : "#2563EB",
                        }}
                      >
                        {plan.price}
                      </span>
                      <span
                        style={{
                          fontSize: 14,
                          color: plan.id === "business" ? "#BFDBFE" : "#9CA3AF",
                          marginLeft: 4,
                        }}
                      >
                        {isUk ? "грн/обід" : "UAH/meal"}
                      </span>
                    </div>
                  ) : (
                    <div style={{ marginBottom: 24 }}>
                      <span style={{ fontSize: 22, fontWeight: 700, color: "#1E3A8A" }}>
                        {isUk ? "Індивідуальна ціна" : "Custom pricing"}
                      </span>
                    </div>
                  )}
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px 0" }}>
                    {(isUk ? plan.features_uk : plan.features_en).map((f) => (
                      <li
                        key={f}
                        style={{
                          fontSize: 14,
                          color: plan.id === "business" ? "#DBEAFE" : "#374151",
                          padding: "6px 0",
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          borderBottom: `1px solid ${plan.id === "business" ? "rgba(255,255,255,0.1)" : "#F3F4F6"}`,
                        }}
                      >
                        <span style={{ color: plan.id === "business" ? "#4ADE80" : "#16A34A", fontWeight: 700 }}>
                          ✓
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => plan.id === "enterprise" && setActiveSection("enterprise")}
                    style={{
                      width: "100%",
                      padding: "13px",
                      borderRadius: 12,
                      border: "none",
                      background:
                        plan.id === "business"
                          ? "#fff"
                          : plan.id === "enterprise"
                          ? "#2563EB"
                          : "#EFF6FF",
                      color:
                        plan.id === "business"
                          ? "#1E40AF"
                          : plan.id === "enterprise"
                          ? "#fff"
                          : "#2563EB",
                      fontWeight: 700,
                      fontSize: 14,
                      cursor: "pointer",
                    }}
                  >
                    {plan.id === "enterprise"
                      ? isUk ? "Зв'язатися з менеджером" : "Contact Manager"
                      : isUk ? "Обрати план" : "Choose Plan"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ENTERPRISE SECTION */}
        {activeSection === "enterprise" && (
          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: "#1E3A8A", marginBottom: 8 }}>
                {isUk ? "Корпоративний запит" : "Enterprise Inquiry"}
              </h2>
              <p style={{ color: "#6B7280", fontSize: 15 }}>
                {isUk
                  ? "Для компаній з 100+ співробітниками — індивідуальні умови та персональний менеджер"
                  : "For teams of 100+ — custom terms and a dedicated account manager"}
              </p>
            </div>

            {!formSent ? (
              <div
                style={{
                  background: "#fff",
                  borderRadius: 20,
                  padding: "36px",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                }}
              >
                <div style={{ marginBottom: 20 }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#374151",
                      marginBottom: 8,
                    }}
                  >
                    {isUk ? "Назва компанії" : "Company Name"}
                  </label>
                  <input
                    type="text"
                    placeholder={isUk ? "Наприклад: Ukr Industries LLC" : "e.g. Acme Corp"}
                    value={enterpriseForm.company}
                    onChange={(e) => setEnterpriseForm((prev) => ({ ...prev, company: e.target.value }))}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: "2px solid #E5E7EB",
                      borderRadius: 10,
                      fontSize: 15,
                      outline: "none",
                      boxSizing: "border-box",
                      color: "#111827",
                    }}
                  />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#374151",
                      marginBottom: 8,
                    }}
                  >
                    {isUk ? "Розмір команди" : "Team Size"}
                  </label>
                  <select
                    value={enterpriseForm.size}
                    onChange={(e) => setEnterpriseForm((prev) => ({ ...prev, size: e.target.value }))}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: "2px solid #E5E7EB",
                      borderRadius: 10,
                      fontSize: 15,
                      color: "#374151",
                      background: "#fff",
                    }}
                  >
                    <option value="">{isUk ? "Оберіть розмір..." : "Select size..."}</option>
                    <option value="100-200">100 – 200</option>
                    <option value="200-500">200 – 500</option>
                    <option value="500+">500+</option>
                  </select>
                </div>
                <div style={{ marginBottom: 28 }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#374151",
                      marginBottom: 8,
                    }}
                  >
                    {isUk ? "Контактна особа (ім'я та телефон)" : "Contact Person (name & phone)"}
                  </label>
                  <input
                    type="text"
                    placeholder={isUk ? "Ірина Коваль, +380 50 000 00 00" : "Jane Smith, +380 50 000 00 00"}
                    value={enterpriseForm.contact}
                    onChange={(e) => setEnterpriseForm((prev) => ({ ...prev, contact: e.target.value }))}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: "2px solid #E5E7EB",
                      borderRadius: 10,
                      fontSize: 15,
                      outline: "none",
                      boxSizing: "border-box",
                      color: "#111827",
                    }}
                  />
                </div>
                <button
                  onClick={() => {
                    if (enterpriseForm.company && enterpriseForm.size && enterpriseForm.contact) {
                      setFormSent(true);
                    }
                  }}
                  style={{
                    width: "100%",
                    padding: "15px",
                    background: "linear-gradient(135deg, #1E40AF, #2563EB)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 12,
                    fontSize: 16,
                    fontWeight: 700,
                    cursor: "pointer",
                    boxShadow: "0 4px 14px rgba(37,99,235,0.4)",
                  }}
                >
                  {isUk ? "Надіслати запит →" : "Submit Inquiry →"}
                </button>

                <div
                  style={{
                    marginTop: 20,
                    padding: "14px 18px",
                    background: "#F0FDF4",
                    borderRadius: 10,
                    display: "flex",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: 18 }}>⚡</span>
                  <span style={{ fontSize: 13, color: "#14532D" }}>
                    {isUk
                      ? "Менеджер зв'яжеться з вами протягом 2 годин у робочий час"
                      : "A manager will contact you within 2 business hours"}
                  </span>
                </div>
              </div>
            ) : (
              <div
                style={{
                  background: "#fff",
                  borderRadius: 20,
                  padding: "48px 36px",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 56, marginBottom: 20 }}>✅</div>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: "#14532D", marginBottom: 12 }}>
                  {isUk ? "Запит отримано!" : "Inquiry Received!"}
                </h3>
                <p style={{ fontSize: 15, color: "#6B7280", lineHeight: 1.6, maxWidth: 400, margin: "0 auto 24px" }}>
                  {isUk
                    ? `Дякуємо, ${enterpriseForm.company}! Ваш персональний менеджер зв'яжеться з вами найближчим часом.`
                    : `Thank you, ${enterpriseForm.company}! Your account manager will be in touch very soon.`}
                </p>
                <button
                  onClick={() => { setFormSent(false); setEnterpriseForm({ company: "", size: "", contact: "" }); }}
                  style={{
                    padding: "12px 24px",
                    background: "#EFF6FF",
                    color: "#2563EB",
                    border: "none",
                    borderRadius: 10,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {isUk ? "Надіслати інший запит" : "Submit another inquiry"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer
        style={{
          background: "#1E3A8A",
          color: "#BFDBFE",
          padding: "24px",
          textAlign: "center",
          marginTop: 40,
        }}
      >
        <div style={{ fontSize: 14, marginBottom: 4 }}>
          <strong style={{ color: "#fff" }}>OfficeLunch</strong> —{" "}
          {isUk ? "корпоративне харчування для бізнесу в Україні" : "corporate catering for businesses in Ukraine"}
        </div>
        <div style={{ fontSize: 12, opacity: 0.5 }}>
          {isUk ? "Демо-версія для Codeworth" : "Demo component for Codeworth"}
        </div>
      </footer>
    </div>
  );
}
