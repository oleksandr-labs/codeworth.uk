"use client";

import { useState } from "react";

const BLUE = "#2563EB";
const YELLOW = "#FBBF24";

const CAT_TABS = [
  { key: "all", en: "All", uk: "Всі" },
  { key: "it", en: "IT & Tech", uk: "IT та Технології", color: "#2563EB" },
  { key: "design", en: "Design", uk: "Дизайн", color: "#7C3AED" },
  { key: "marketing", en: "Marketing", uk: "Маркетинг", color: "#DB2777" },
  { key: "languages", en: "Languages", uk: "Мови", color: "#059669" },
  { key: "soft", en: "Soft Skills", uk: "Soft Skills", color: "#EA580C" },
];

const LEVELS = [
  { key: "all", en: "All Levels", uk: "Всі рівні" },
  { key: "beginner", en: "Beginner", uk: "Початківець" },
  { key: "intermediate", en: "Intermediate", uk: "Середній" },
  { key: "advanced", en: "Advanced", uk: "Просунутий" },
];

type Course = {
  cat: string; level: string;
  titleEn: string; titleUk: string;
  instructorEn: string; instructorUk: string;
  duration: string; rating: number; students: number;
  price: number; badge: "Bestseller" | "New" | "Free"; bgColor: string;
};

const COURSES: Course[] = [
  { cat: "it", level: "beginner", titleEn: "Python Basics", titleUk: "Python для початківців", instructorEn: "Artem Koval", instructorUk: "Артем Коваль", duration: "24 hrs", rating: 4.9, students: 8420, price: 1499, badge: "Bestseller", bgColor: "#2563EB" },
  { cat: "it", level: "intermediate", titleEn: "React & Next.js", titleUk: "React та Next.js", instructorEn: "Olena Melnyk", instructorUk: "Олена Мельник", duration: "36 hrs", rating: 4.8, students: 5230, price: 1999, badge: "New", bgColor: "#1D4ED8" },
  { cat: "design", level: "beginner", titleEn: "UI/UX Fundamentals", titleUk: "Основи UI/UX", instructorEn: "Daria Savchenko", instructorUk: "Дарія Савченко", duration: "20 hrs", rating: 4.7, students: 6100, price: 1299, badge: "Bestseller", bgColor: "#7C3AED" },
  { cat: "marketing", level: "beginner", titleEn: "Digital Marketing Pro", titleUk: "Цифровий маркетинг", instructorEn: "Ivan Petrenko", instructorUk: "Іван Петренко", duration: "18 hrs", rating: 4.6, students: 4320, price: 0, badge: "Free", bgColor: "#DB2777" },
  { cat: "languages", level: "intermediate", titleEn: "English for IT", titleUk: "Англійська для IT", instructorEn: "Victoria Shevchenko", instructorUk: "Вікторія Шевченко", duration: "30 hrs", rating: 4.8, students: 9870, price: 999, badge: "Bestseller", bgColor: "#059669" },
  { cat: "soft", level: "beginner", titleEn: "Leadership & Teamwork", titleUk: "Лідерство та команда", instructorEn: "Mykola Bondar", instructorUk: "Микола Бондар", duration: "12 hrs", rating: 4.5, students: 3100, price: 799, badge: "New", bgColor: "#EA580C" },
];

const SUCCESS_STORIES = [
  { avatarBg: "#DBEAFE", emoji: "👨‍💻", beforeEn: "Warehouse worker", beforeUk: "Складський працівник", afterEn: "Junior Developer", afterUk: "Junior Developer", salaryEn: "+2.8× salary", salaryUk: "+2.8× зарплата", nameEn: "Dmytro O.", nameUk: "Дмитро О." },
  { avatarBg: "#FCE7F3", emoji: "👩‍🎨", beforeEn: "Cashier", beforeUk: "Касир", afterEn: "UI/UX Designer", afterUk: "UI/UX Дизайнер", salaryEn: "+3.1× salary", salaryUk: "+3.1× зарплата", nameEn: "Oksana B.", nameUk: "Оксана Б." },
  { avatarBg: "#D1FAE5", emoji: "📈", beforeEn: "Sales assistant", beforeUk: "Продавець-консультант", afterEn: "Digital Marketer", afterUk: "Digital Маркетолог", salaryEn: "+2.4× salary", salaryUk: "+2.4× зарплата", nameEn: "Andriy L.", nameUk: "Андрій Л." },
  { avatarBg: "#FEF3C7", emoji: "🛡️", beforeEn: "Accountant", beforeUk: "Бухгалтер", afterEn: "QA Engineer", afterUk: "QA Інженер", salaryEn: "+2.6× salary", salaryUk: "+2.6× зарплата", nameEn: "Natalia V.", nameUk: "Наталія В." },
];

type FormatFeature = { en: string; uk: string };

const FORMATS: { key: string; titleEn: string; titleUk: string; priceEn: string; priceUk: string; color: string; features: FormatFeature[]; highlight: boolean }[] = [
  {
    key: "self",
    titleEn: "Self-paced",
    titleUk: "Самостійно",
    priceEn: "from ₴799/mo",
    priceUk: "від ₴799/міс",
    color: "#F8FAFC",
    highlight: false,
    features: [
      { en: "Video lectures", uk: "Відеолекції" },
      { en: "Assignments", uk: "Завдання" },
      { en: "Certificate", uk: "Сертифікат" },
      { en: "Community chat", uk: "Чат спільноти" },
    ],
  },
  {
    key: "mentor",
    titleEn: "With Mentor",
    titleUk: "З ментором",
    priceEn: "from ₴1,999/mo",
    priceUk: "від ₴1 999/міс",
    color: BLUE,
    highlight: true,
    features: [
      { en: "Everything in Self-paced", uk: "Все з Самостійного" },
      { en: "Weekly group calls", uk: "Щотижневі групові дзвінки" },
      { en: "Code review", uk: "Перевірка коду" },
      { en: "Job assistance", uk: "Допомога з пошуком роботи" },
    ],
  },
  {
    key: "oneone",
    titleEn: "1-on-1 Mentorship",
    titleUk: "1-на-1 Менторство",
    priceEn: "from ₴4,999/mo",
    priceUk: "від ₴4 999/міс",
    color: "#F8FAFC",
    highlight: false,
    features: [
      { en: "Everything with Mentor", uk: "Все з ментором" },
      { en: "Personal sessions 2×/week", uk: "Особисті сесії 2×/тиждень" },
      { en: "Custom curriculum", uk: "Індивідуальна програма" },
      { en: "Career coaching", uk: "Кар'єрний коучинг" },
    ],
  },
];

const EMPLOYERS = ["Google", "Sigma", "Intellias", "EPAM", "GlobalLogic", "SoftServe"];

export function EduProDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";
  const [catFilter, setCatFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");
  const [rotatingLabel] = useState(0);

  const heroLabels = [
    { en: "Python Developer", uk: "Python Developer" },
    { en: "UX Designer", uk: "UX Дизайнер" },
    { en: "Digital Marketer", uk: "Digital Маркетолог" },
  ];

  const filteredCourses = COURSES.filter(
    (c) =>
      (catFilter === "all" || c.cat === catFilter) &&
      (levelFilter === "all" || c.level === levelFilter)
  );

  return (
    <div style={{ background: "#FFFFFF", fontFamily: "'Inter', 'Helvetica Neue', sans-serif", color: "#1E293B" }} className="min-h-screen">

      {/* NAV */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #E2E8F0", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ color: BLUE, fontSize: 20, fontWeight: 800, letterSpacing: -0.5 }}>Edu<span style={{ color: YELLOW }}>Pro</span></span>
        <div className="flex gap-4 text-sm text-slate-600">
          <span className="cursor-pointer hover:text-blue-600">{isUk ? "Курси" : "Courses"}</span>
          <span className="cursor-pointer hover:text-blue-600">{isUk ? "Формати" : "Formats"}</span>
          <span className="cursor-pointer hover:text-blue-600">{isUk ? "Блог" : "Blog"}</span>
        </div>
        <button style={{ background: BLUE, color: "#fff", border: "none", padding: "8px 18px", borderRadius: 8, fontSize: 14, cursor: "pointer" }}>
          {isUk ? "Почати безкоштовно" : "Start free"}
        </button>
      </nav>

      {/* HERO */}
      <section style={{ background: "linear-gradient(135deg, #EFF6FF 0%, #F0FDF4 100%)", padding: "52px 24px", textAlign: "center", borderBottom: "1px solid #E2E8F0" }}>
        <div style={{ fontSize: 13, color: BLUE, fontWeight: 600, marginBottom: 12, letterSpacing: 1, textTransform: "uppercase" }}>
          {isUk ? "14 днів безкоштовно" : "14 days free trial"}
        </div>
        <h1 style={{ fontSize: 34, fontWeight: 800, color: "#0F172A", lineHeight: 1.2, marginBottom: 12, maxWidth: 560, margin: "0 auto 12px" }}>
          {isUk ? "Опануй нову навичку за 3 місяці" : "Master a new skill in 3 months"}
        </h1>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
          {heroLabels.map((l, i) => (
            <span
              key={l.en}
              style={{
                background: i === rotatingLabel ? BLUE : "#E2E8F0",
                color: i === rotatingLabel ? "#fff" : "#64748B",
                padding: "6px 16px",
                borderRadius: 20,
                fontSize: 14,
                fontWeight: i === rotatingLabel ? 700 : 400,
                transition: "all 0.3s",
              }}
            >
              {isUk ? l.uk : l.en}
            </span>
          ))}
        </div>
        <div className="flex justify-center gap-6 flex-wrap mb-8" style={{ fontSize: 14 }}>
          <span style={{ color: "#0F172A", fontWeight: 600 }}>🎓 {isUk ? "12 000+ випускників" : "12,000+ graduates"}</span>
          <span style={{ color: "#0F172A", fontWeight: 600 }}>💼 {isUk ? "87% знайшли роботу" : "87% found jobs"}</span>
          <span style={{ color: "#0F172A", fontWeight: 600 }}>📈 {isUk ? "3.2× зростання зарплати" : "3.2× salary growth"}</span>
        </div>
        <button style={{ background: BLUE, color: "#fff", border: "none", padding: "14px 36px", borderRadius: 10, fontSize: 16, cursor: "pointer", fontWeight: 700, marginRight: 12 }}>
          {isUk ? "Почати безкоштовно" : "Start free"}
        </button>
        <button style={{ background: "transparent", color: BLUE, border: `2px solid ${BLUE}`, padding: "13px 28px", borderRadius: 10, fontSize: 15, cursor: "pointer" }}>
          {isUk ? "Переглянути курси" : "Browse courses"}
        </button>
      </section>

      {/* GAMIFIED DASHBOARD */}
      <section style={{ padding: "40px 24px", borderBottom: "1px solid #E2E8F0", background: "#F8FAFC" }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, textAlign: "center", color: "#0F172A" }}>
          🎮 {isUk ? "Ваше навчання" : "Your Learning"}
        </h2>
        <div style={{ maxWidth: 620, margin: "0 auto", background: "#fff", borderRadius: 16, border: "1px solid #E2E8F0", padding: "24px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
          {/* Profile row */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#DBEAFE", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>👤</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>Dmytro K.</div>
              <div style={{ color: "#64748B", fontSize: 13 }}>
                🏅 1,240 XP · 🔥 {isUk ? "12 днів поспіль" : "12 days in a row"}
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
              <span style={{ fontWeight: 600 }}>Python Basics</span>
              <span style={{ color: BLUE, fontWeight: 700 }}>67%</span>
            </div>
            <div style={{ background: "#E2E8F0", borderRadius: 8, height: 10, overflow: "hidden" }}>
              <div style={{ width: "67%", background: `linear-gradient(90deg, ${BLUE}, #60A5FA)`, height: "100%", borderRadius: 8 }} />
            </div>
          </div>

          {/* Badges */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#64748B", marginBottom: 8 }}>{isUk ? "Досягнення" : "Achievements"}</div>
            <div className="flex gap-3 flex-wrap">
              <span style={{ background: "#DBEAFE", color: BLUE, padding: "6px 14px", borderRadius: 20, fontSize: 13, fontWeight: 600 }}>🎯 {isUk ? "Перший урок" : "First lesson"}</span>
              <span style={{ background: "#FEF3C7", color: "#92400E", padding: "6px 14px", borderRadius: 20, fontSize: 13, fontWeight: 600 }}>⭐ {isUk ? "5 уроків" : "5 lessons"}</span>
              <span style={{ background: "#D1FAE5", color: "#065F46", padding: "6px 14px", borderRadius: 20, fontSize: 13, fontWeight: 600 }}>🏆 {isUk ? "Модуль завершено" : "Module complete"}</span>
            </div>
          </div>

          {/* Next lesson */}
          <div style={{ background: "#EFF6FF", borderRadius: 10, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14, color: BLUE }}>▶ {isUk ? "Наступний урок" : "Next lesson"}</div>
              <div style={{ fontSize: 13, color: "#0F172A", marginTop: 3 }}>
                {isUk ? "Модуль 4: Функції — 15 хв" : "Module 4: Functions — 15 min"}
              </div>
            </div>
            <button style={{ background: BLUE, color: "#fff", border: "none", padding: "8px 18px", borderRadius: 8, fontSize: 13, cursor: "pointer", flexShrink: 0 }}>
              {isUk ? "Почати" : "Start"}
            </button>
          </div>
        </div>
      </section>

      {/* COURSE CATALOG */}
      <section style={{ padding: "40px 24px", borderBottom: "1px solid #E2E8F0" }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, textAlign: "center", color: "#0F172A" }}>
          {isUk ? "Каталог курсів" : "Course Catalog"}
        </h2>

        {/* Category filters */}
        <div className="flex gap-2 flex-wrap justify-center mb-4">
          {CAT_TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setCatFilter(t.key)}
              style={{
                background: catFilter === t.key ? (t.color ?? BLUE) : "#F1F5F9",
                color: catFilter === t.key ? "#fff" : "#475569",
                border: "none",
                padding: "7px 16px",
                borderRadius: 20,
                fontSize: 13,
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              {isUk ? t.uk : t.en}
            </button>
          ))}
        </div>

        {/* Level filters */}
        <div className="flex gap-2 flex-wrap justify-center mb-6">
          {LEVELS.map((l) => (
            <button
              key={l.key}
              onClick={() => setLevelFilter(l.key)}
              style={{
                background: levelFilter === l.key ? "#0F172A" : "transparent",
                color: levelFilter === l.key ? "#fff" : "#94A3B8",
                border: "1px solid #CBD5E1",
                padding: "5px 14px",
                borderRadius: 20,
                fontSize: 12,
                cursor: "pointer",
              }}
            >
              {isUk ? l.uk : l.en}
            </button>
          ))}
        </div>

        {/* Course cards */}
        <div className="grid grid-cols-1 gap-4" style={{ maxWidth: 700, margin: "0 auto" }}>
          {filteredCourses.length === 0 ? (
            <div style={{ textAlign: "center", color: "#94A3B8", padding: "32px 0" }}>
              {isUk ? "Курсів не знайдено" : "No courses found"}
            </div>
          ) : (
            filteredCourses.map((c) => (
              <div key={c.titleEn} style={{ background: "#fff", borderRadius: 14, border: "1px solid #E2E8F0", overflow: "hidden", display: "flex", gap: 0 }}>
                {/* Cover */}
                <div style={{ width: 80, background: c.bgColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, flexShrink: 0 }}>
                  🖥️
                </div>
                <div style={{ padding: "14px 16px", flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                    <div>
                      <span style={{
                        background: c.badge === "Bestseller" ? YELLOW : c.badge === "New" ? "#DCFCE7" : "#E0F2FE",
                        color: c.badge === "Bestseller" ? "#92400E" : c.badge === "New" ? "#15803D" : "#1D4ED8",
                        fontSize: 11,
                        padding: "2px 8px",
                        borderRadius: 8,
                        fontWeight: 700,
                        marginBottom: 6,
                        display: "inline-block",
                      }}>
                        {c.badge === "Bestseller" ? (isUk ? "Хіт" : "Bestseller") : c.badge === "New" ? (isUk ? "Нове" : "New") : (isUk ? "Безкоштовно" : "Free")}
                      </span>
                      <div style={{ fontWeight: 700, fontSize: 15, color: "#0F172A" }}>{isUk ? c.titleUk : c.titleEn}</div>
                      <div style={{ color: "#64748B", fontSize: 12, marginTop: 2 }}>{isUk ? c.instructorUk : c.instructorEn} · {c.duration}</div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontWeight: 800, fontSize: 17, color: c.price === 0 ? "#15803D" : "#0F172A" }}>
                        {c.price === 0 ? (isUk ? "Безкоштовно" : "Free") : `₴${c.price}`}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                    <div style={{ fontSize: 12, color: "#64748B" }}>
                      ★ {c.rating} · {c.students.toLocaleString()} {isUk ? "учнів" : "students"}
                    </div>
                    <button style={{ background: BLUE, color: "#fff", border: "none", padding: "6px 16px", borderRadius: 8, fontSize: 13, cursor: "pointer" }}>
                      {isUk ? "Записатись" : "Enroll"}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* SUCCESS STORIES */}
      <section style={{ padding: "40px 24px", background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24, textAlign: "center", color: "#0F172A" }}>
          🌟 {isUk ? "Успіхи наших студентів" : "Student Success Stories"}
        </h2>
        <div className="grid grid-cols-2 gap-4" style={{ maxWidth: 640, margin: "0 auto" }}>
          {SUCCESS_STORIES.map((s) => (
            <div key={s.nameEn} style={{ background: "#fff", borderRadius: 14, border: "1px solid #E2E8F0", padding: "18px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: s.avatarBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{s.emoji}</div>
                <span style={{ fontWeight: 700, fontSize: 14 }}>{isUk ? s.nameUk : s.nameEn}</span>
              </div>
              <div style={{ fontSize: 12, color: "#64748B", marginBottom: 4 }}>
                {isUk ? s.beforeUk : s.beforeEn} →
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: BLUE, marginBottom: 8 }}>
                {isUk ? s.afterUk : s.afterEn}
              </div>
              <div style={{ background: "#F0FDF4", color: "#15803D", fontSize: 13, fontWeight: 700, padding: "4px 12px", borderRadius: 20, display: "inline-block" }}>
                {isUk ? s.salaryUk : s.salaryEn}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FORMAT COMPARISON */}
      <section style={{ padding: "40px 24px", borderBottom: "1px solid #E2E8F0" }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24, textAlign: "center", color: "#0F172A" }}>
          {isUk ? "Формати навчання" : "Learning Formats"}
        </h2>
        <div className="grid grid-cols-3 gap-4" style={{ maxWidth: 680, margin: "0 auto" }}>
          {FORMATS.map((f) => (
            <div
              key={f.key}
              style={{
                background: f.highlight ? BLUE : f.color,
                color: f.highlight ? "#fff" : "#1E293B",
                borderRadius: 14,
                padding: "20px 16px",
                border: f.highlight ? "none" : "1px solid #E2E8F0",
                position: "relative",
              }}
            >
              {f.highlight && (
                <div style={{ position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)", background: YELLOW, color: "#92400E", fontSize: 11, fontWeight: 700, padding: "2px 12px", borderRadius: 10 }}>
                  {isUk ? "Популярний" : "Popular"}
                </div>
              )}
              <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 6 }}>{isUk ? f.titleUk : f.titleEn}</div>
              <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 16, color: f.highlight ? YELLOW : BLUE }}>{isUk ? f.priceUk : f.priceEn}</div>
              <div className="flex flex-col gap-2">
                {f.features.map((feat) => (
                  <div key={feat.en} style={{ display: "flex", alignItems: "flex-start", gap: 6, fontSize: 13 }}>
                    <span style={{ color: f.highlight ? YELLOW : "#15803D", fontWeight: 700, flexShrink: 0 }}>✓</span>
                    <span style={{ opacity: 0.9 }}>{isUk ? feat.uk : feat.en}</span>
                  </div>
                ))}
              </div>
              <button style={{
                marginTop: 18,
                background: f.highlight ? "#fff" : BLUE,
                color: f.highlight ? BLUE : "#fff",
                border: "none",
                padding: "10px 0",
                borderRadius: 8,
                fontSize: 13,
                cursor: "pointer",
                fontWeight: 600,
                width: "100%",
              }}>
                {isUk ? "Обрати" : "Choose"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* EMPLOYER LOGOS */}
      <section style={{ padding: "32px 24px", background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
        <div style={{ textAlign: "center", color: "#94A3B8", fontSize: 13, marginBottom: 16 }}>
          {isUk ? "Наші випускники працюють у" : "Our graduates work at"}
        </div>
        <div className="flex justify-center gap-6 flex-wrap">
          {EMPLOYERS.map((e) => (
            <div key={e} style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 10, padding: "10px 20px", fontWeight: 700, color: "#64748B", fontSize: 14 }}>
              {e}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "52px 24px", background: `linear-gradient(135deg, ${BLUE} 0%, #1D4ED8 100%)`, textAlign: "center" }}>
        <h2 style={{ fontSize: 26, fontWeight: 800, color: "#fff", marginBottom: 8 }}>
          {isUk ? "Розпочни безкоштовно сьогодні" : "Start free today"}
        </h2>
        <p style={{ color: "#BFDBFE", fontSize: 15, marginBottom: 28 }}>
          {isUk ? "14 днів без оплати · Скасування будь-коли" : "14-day trial · Cancel anytime"}
        </p>
        <button style={{ background: YELLOW, color: "#92400E", border: "none", padding: "14px 40px", borderRadius: 10, fontSize: 16, cursor: "pointer", fontWeight: 800 }}>
          {isUk ? "Почати безкоштовно" : "Start free — 14 days"}
        </button>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#0F172A", color: "#94A3B8", textAlign: "center", padding: "16px 24px", fontSize: 13 }}>
        © 2025 EduPro Academy · {isUk ? "Навчання, що змінює кар'єру" : "Learning that changes careers"}
      </footer>
    </div>
  );
}
