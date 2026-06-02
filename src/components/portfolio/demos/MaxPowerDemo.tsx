"use client";

import { useState } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV = [
  { en: "Programs", uk: "Програми" },
  { en: "Results", uk: "Результати" },
  { en: "About", uk: "Про тренера" },
  { en: "Contact", uk: "Контакт" },
];

const PROGRAMS = [
  {
    icon: "💪",
    nameEn: "Fat Burn",
    nameUk: "Спалювання жиру",
    weeks: 12,
    sessions: 3,
    price: "2 800 ₴/mo",
    goalEn: "Lose body fat and build lean muscle simultaneously through metabolic conditioning.",
    goalUk: "Зменшити жирову масу та зміцнити м'язи через метаболічне тренування.",
    includesEn: ["Personal training", "Nutrition plan", "Progress tracking", "Body composition measurements"],
    includesUk: ["Персональні тренування", "План харчування", "Відстеження прогресу", "Вимірювання складу тіла"],
    sampleWeek: [
      { day: "Monday", workout: "HIIT Metabolic Circuit" },
      { day: "Wednesday", workout: "Full-Body Strength + Cardio Finisher" },
      { day: "Friday", workout: "Tabata + Core Blast" },
    ],
    sampleWeekUk: [
      { day: "Понеділок", workout: "HIIT Метаболічна схема" },
      { day: "Середа", workout: "Силовий + Кардіо-фінішер" },
      { day: "П'ятниця", workout: "Tabata + Робота з пресом" },
    ],
  },
  {
    icon: "🏋️",
    nameEn: "Muscle Gain",
    nameUk: "Набір маси",
    weeks: 16,
    sessions: 4,
    price: "3 200 ₴/mo",
    goalEn: "Maximize lean muscle hypertrophy with progressive overload and optimised nutrition.",
    goalUk: "Максимальна гіпертрофія м'язів через прогресивне навантаження та харчування.",
    includesEn: ["Personal training", "Nutrition plan", "Progress tracking", "Body composition measurements"],
    includesUk: ["Персональні тренування", "План харчування", "Відстеження прогресу", "Вимірювання складу тіла"],
    sampleWeek: [
      { day: "Monday", workout: "Push Day — Chest / Shoulders / Triceps" },
      { day: "Tuesday", workout: "Pull Day — Back / Biceps" },
      { day: "Thursday", workout: "Leg Day — Quads / Hamstrings / Glutes" },
      { day: "Saturday", workout: "Upper Power + Accessory Work" },
    ],
    sampleWeekUk: [
      { day: "Понеділок", workout: "Жим — Груди / Плечі / Трицепс" },
      { day: "Вівторок", workout: "Тяга — Спина / Біцепс" },
      { day: "Четвер", workout: "Ноги — Квадрицепси / Сідниці" },
      { day: "Субота", workout: "Силове верхнє + Ізоляція" },
    ],
  },
  {
    icon: "⚡",
    nameEn: "Athletic Performance",
    nameUk: "Спортивна підготовка",
    weeks: 20,
    sessions: 5,
    price: "3 800 ₴/mo",
    goalEn: "Develop speed, power, agility and sport-specific conditioning for competitive athletes.",
    goalUk: "Розвиток швидкості, потужності та витривалості для спортсменів.",
    includesEn: ["Personal training", "Nutrition plan", "Progress tracking", "Body composition measurements"],
    includesUk: ["Персональні тренування", "План харчування", "Відстеження прогресу", "Вимірювання складу тіла"],
    sampleWeek: [
      { day: "Monday", workout: "Speed & Plyometrics" },
      { day: "Tuesday", workout: "Olympic Lifting Foundation" },
      { day: "Wednesday", workout: "Conditioning & Endurance" },
      { day: "Friday", workout: "Strength & Power Complex" },
      { day: "Saturday", workout: "Sport-Specific Drills" },
    ],
    sampleWeekUk: [
      { day: "Понеділок", workout: "Швидкість та Пліометрика" },
      { day: "Вівторок", workout: "Олімпійський підйом" },
      { day: "Середа", workout: "Кондиція та Витривалість" },
      { day: "П'ятниця", workout: "Сила та Потужність" },
      { day: "Субота", workout: "Спеціальні вправи" },
    ],
  },
];

const TRANSFORMATIONS = [
  { name: "Dmytro K.", age: 28, goalEn: "Fat loss", goalUk: "Схуднення", resultEn: "−18 kg in 4 months", resultUk: "−18 кг за 4 місяці", quoteEn: "I never believed I could do it. Max proved me wrong.", quoteUk: "Я не вірив, що зможу. Макс довів протилежне." },
  { name: "Olena S.", age: 34, goalEn: "Muscle gain", goalUk: "Набір маси", resultEn: "+8 kg muscle in 6 months", resultUk: "+8 кг м'язів за 6 місяців", quoteEn: "Best investment I've ever made in myself.", quoteUk: "Найкраща інвестиція у себе за весь час." },
  { name: "Ivan P.", age: 22, goalEn: "Athletic performance", goalUk: "Спортивна форма", resultEn: "40 m sprint: −0.4 s", resultUk: "Спринт 40м: −0.4 с", quoteEn: "My speed improved beyond what I thought possible.", quoteUk: "Мої показники зросли понад усі очікування." },
  { name: "Natalia V.", age: 41, goalEn: "Body recomposition", goalUk: "Рекомпозиція", resultEn: "−10 kg fat / +5 kg muscle", resultUk: "−10 кг жиру / +5 кг м'язів", quoteEn: "At 40 I'm in the best shape of my life.", quoteUk: "У 40 я в найкращій формі свого життя." },
];

const CERTIFICATIONS = [
  { en: "NSCA Certified Strength & Conditioning Specialist", uk: "NSCA Спеціаліст з силової підготовки" },
  { en: "Precision Nutrition Level 2 Coach", uk: "Precision Nutrition Рівень 2" },
  { en: "FMS Level 2 — Functional Movement Systems", uk: "FMS Рівень 2 — Функціональний рух" },
];

const PHILOSOPHY = [
  { en: "Science over hype — every program is evidence-based.", uk: "Наука, а не хайп — кожна програма науково обґрунтована." },
  { en: "Consistency beats intensity — sustainable habits win.", uk: "Стабільність важливіша за інтенсивність." },
  { en: "Mindset first — physical transformation follows mental shift.", uk: "Спочатку мислення — тіло змінюється за розумом." },
];

// ─── Component ───────────────────────────────────────────────────────────────

export function MaxPowerDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [activeProgram, setActiveProgram] = useState(0);
  const [openAccordion, setOpenAccordion] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formLevel, setFormLevel] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const prog = PROGRAMS[activeProgram];

  const fitnessLevels = isUk
    ? ["Початківець", "Середній рівень", "Просунутий", "Спортсмен"]
    : ["Beginner", "Intermediate", "Advanced", "Athlete"];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#0D0D0D", color: "#FFFFFF", minHeight: "100vh" }}>
      {/* Nav */}
      <nav style={{ padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #1F1F1F", position: "sticky", top: 0, zIndex: 50, background: "#0D0D0D" }}>
        <span style={{ fontWeight: 900, fontSize: 22, color: "#FF5A1F", letterSpacing: "-1px", textTransform: "uppercase" }}>MaxPower</span>
        <div style={{ display: "flex", gap: 24 }}>
          {NAV.map((n) => (
            <a key={n.en} href="#" style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", textDecoration: "none", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>{isUk ? n.uk : n.en}</a>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: "80px 32px 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #FF5A1F11 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ display: "inline-block", background: "#FF5A1F", color: "#fff", fontSize: 11, fontWeight: 800, letterSpacing: 3, padding: "5px 14px", borderRadius: 4, marginBottom: 24, textTransform: "uppercase" }}>
          {isUk ? "Персональний тренер" : "Personal Trainer"}
        </div>
        <h1 style={{ fontSize: 52, fontWeight: 900, margin: "0 0 16px", lineHeight: 1.05, textTransform: "uppercase", letterSpacing: "-1px" }}>
          {isUk ? "Трансформація\nпочинається сьогодні" : "Transformation\nstarts today"}
        </h1>
        <p style={{ fontSize: 17, color: "rgba(255,255,255,0.6)", marginBottom: 36, maxWidth: 480, margin: "0 auto 36px" }}>
          {isUk ? "8 років досвіду. 147 клієнтів. 94% досягли мети." : "8 years experience. 147 clients. 94% achieved their goal."}
        </p>
        <div style={{ display: "flex", gap: 40, justifyContent: "center", flexWrap: "wrap", marginBottom: 44 }}>
          {[{ n: "147", labelEn: "Clients", labelUk: "Клієнтів" }, { n: "94%", labelEn: "Achieved goal", labelUk: "Досягли мети" }, { n: "8", labelEn: "Years exp.", labelUk: "Років досвіду" }].map((s) => (
            <div key={s.n} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 36, fontWeight: 900, color: "#FF5A1F" }}>{s.n}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: 1 }}>{isUk ? s.labelUk : s.labelEn}</div>
            </div>
          ))}
        </div>
        {/* Countdown */}
        <div style={{ display: "inline-block", border: "1px solid #FF5A1F44", background: "#FF5A1F11", padding: "12px 24px", borderRadius: 8, marginBottom: 32 }}>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, marginRight: 8 }}>{isUk ? "Набір у групу закривається через:" : "Next group enrollment closes in:"}</span>
          <span style={{ color: "#FF5A1F", fontWeight: 800, fontSize: 16 }}>3 {isUk ? "дні" : "days"} 14 {isUk ? "год" : "hours"}</span>
        </div>
        <br />
        <button onClick={() => setShowForm(true)} style={{ background: "#FF5A1F", color: "#fff", border: "none", padding: "16px 40px", borderRadius: 6, fontWeight: 800, fontSize: 16, cursor: "pointer", textTransform: "uppercase", letterSpacing: 1 }}>
          {isUk ? "Почати зараз" : "Start now"}
        </button>
      </section>

      {/* Programs */}
      <section style={{ padding: "56px 32px", background: "#111111" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontSize: 28, fontWeight: 900, marginBottom: 28, textTransform: "uppercase", letterSpacing: "-0.5px" }}>{isUk ? "Програми тренувань" : "Training Programs"}</h2>
          <div style={{ display: "flex", gap: 12, marginBottom: 28 }}>
            {PROGRAMS.map((p, i) => (
              <button key={p.nameEn} onClick={() => { setActiveProgram(i); setOpenAccordion(false); setShowForm(false); }} style={{ flex: 1, padding: "12px 8px", borderRadius: 6, border: `2px solid ${activeProgram === i ? "#FF5A1F" : "#2A2A2A"}`, background: activeProgram === i ? "#FF5A1F" : "transparent", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer", textAlign: "center" }}>
                {p.icon} {isUk ? p.nameUk : p.nameEn}
              </button>
            ))}
          </div>

          <div style={{ background: "#1A1A1A", borderRadius: 10, padding: "28px", border: "1px solid #2A2A2A" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16, marginBottom: 20 }}>
              <div>
                <h3 style={{ fontWeight: 800, fontSize: 22, marginBottom: 4 }}>{prog.icon} {isUk ? prog.nameUk : prog.nameEn}</h3>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, maxWidth: 520 }}>{isUk ? prog.goalUk : prog.goalEn}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ color: "#FF5A1F", fontWeight: 900, fontSize: 22 }}>{prog.price}</div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 20, marginBottom: 20, flexWrap: "wrap" }}>
              <div style={{ background: "#FF5A1F22", padding: "8px 14px", borderRadius: 6 }}><span style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>{isUk ? "Тривалість:" : "Duration:"}</span> <span style={{ fontWeight: 700, fontSize: 14 }}>{prog.weeks} {isUk ? "тижнів" : "weeks"}</span></div>
              <div style={{ background: "#FF5A1F22", padding: "8px 14px", borderRadius: 6 }}><span style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>{isUk ? "Тренувань/тиж:" : "Sessions/wk:"}</span> <span style={{ fontWeight: 700, fontSize: 14 }}>{prog.sessions}</span></div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 }}>{isUk ? "Включено:" : "What's included:"}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {(isUk ? prog.includesUk : prog.includesEn).map((item) => (
                  <span key={item} style={{ background: "#222", border: "1px solid #333", padding: "5px 12px", borderRadius: 20, fontSize: 13 }}>✓ {item}</span>
                ))}
              </div>
            </div>

            {/* Accordion */}
            <button onClick={() => setOpenAccordion((v) => !v)} style={{ display: "flex", alignItems: "center", gap: 8, background: "transparent", border: "1px solid #333", color: "rgba(255,255,255,0.7)", padding: "10px 16px", borderRadius: 6, fontSize: 13, cursor: "pointer", marginBottom: openAccordion ? 12 : 0, width: "100%", justifyContent: "space-between" }}>
              <span>{isUk ? "Приклад тижня" : "Sample week"}</span>
              <span style={{ color: "#FF5A1F" }}>{openAccordion ? "▲" : "▼"}</span>
            </button>
            {openAccordion && (
              <div style={{ background: "#0D0D0D", borderRadius: 6, padding: "14px 16px", marginBottom: 16 }}>
                {(isUk ? prog.sampleWeekUk : prog.sampleWeek).map((d) => (
                  <div key={d.day} style={{ display: "flex", gap: 12, padding: "7px 0", borderBottom: "1px solid #1F1F1F" }}>
                    <span style={{ color: "#FF5A1F", fontWeight: 700, fontSize: 13, minWidth: 90, flexShrink: 0 }}>{d.day}</span>
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.75)" }}>{d.workout}</span>
                  </div>
                ))}
              </div>
            )}

            <button onClick={() => setShowForm(true)} style={{ background: "#FF5A1F", color: "#fff", border: "none", padding: "13px 28px", borderRadius: 6, fontWeight: 800, fontSize: 14, cursor: "pointer", textTransform: "uppercase", letterSpacing: 0.5 }}>
              {isUk ? "Розпочати цю програму" : "Start this program"}
            </button>
          </div>

          {showForm && !submitted && (
            <div style={{ marginTop: 24, background: "#1A1A1A", borderRadius: 10, padding: "28px", border: "1px solid #333" }}>
              <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 20 }}>{isUk ? "Залиш заявку" : "Quick application"}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <input value={formName} onChange={(e) => setFormName(e.target.value)} placeholder={isUk ? "Ваше ім'я" : "Your name"} style={{ background: "#0D0D0D", border: "1px solid #333", borderRadius: 6, padding: "11px 14px", color: "#fff", fontSize: 14, outline: "none" }} />
                <input value={formPhone} onChange={(e) => setFormPhone(e.target.value)} placeholder={isUk ? "Телефон" : "Phone"} style={{ background: "#0D0D0D", border: "1px solid #333", borderRadius: 6, padding: "11px 14px", color: "#fff", fontSize: 14, outline: "none" }} />
                <select value={formLevel} onChange={(e) => setFormLevel(e.target.value)} style={{ background: "#0D0D0D", border: "1px solid #333", borderRadius: 6, padding: "11px 14px", color: formLevel ? "#fff" : "#888", fontSize: 14, outline: "none" }}>
                  <option value="">{isUk ? "Рівень підготовки" : "Current fitness level"}</option>
                  {fitnessLevels.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
                <button onClick={() => setSubmitted(true)} style={{ background: "#FF5A1F", color: "#fff", border: "none", padding: "13px", borderRadius: 6, fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
                  {isUk ? "Відправити заявку" : "Submit application"}
                </button>
              </div>
            </div>
          )}
          {submitted && (
            <div style={{ marginTop: 24, background: "#FF5A1F22", border: "1px solid #FF5A1F44", borderRadius: 10, padding: "20px", textAlign: "center", color: "#FF5A1F", fontWeight: 700 }}>
              {isUk ? "✓ Заявку отримано! Зв'яжуся з вами протягом 24 годин." : "✓ Application received! I'll contact you within 24 hours."}
            </div>
          )}
        </div>
      </section>

      {/* Transformations */}
      <section style={{ padding: "56px 32px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontSize: 28, fontWeight: 900, marginBottom: 6, textTransform: "uppercase", letterSpacing: "-0.5px" }}>{isUk ? "Реальні результати" : "Real Transformations"}</h2>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, marginBottom: 28, fontStyle: "italic" }}>{isUk ? "* Результати індивідуальні та можуть відрізнятися" : "* Individual results may vary"}</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
            {TRANSFORMATIONS.map((t) => (
              <div key={t.name} style={{ background: "#111", border: "1px solid #222", borderRadius: 10, padding: "20px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "#FF5A1F" }} />
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#222", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 12 }}>💪</div>
                <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{t.name}, {t.age}</p>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginBottom: 8 }}>{isUk ? t.goalUk : t.goalEn}</p>
                <p style={{ color: "#FF5A1F", fontWeight: 800, fontSize: 15, marginBottom: 10 }}>{isUk ? t.resultUk : t.resultEn}</p>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, fontStyle: "italic", lineHeight: 1.5 }}>"{isUk ? t.quoteUk : t.quoteEn}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section style={{ padding: "56px 32px", background: "#111" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <h2 style={{ fontSize: 28, fontWeight: 900, marginBottom: 24, textTransform: "uppercase" }}>{isUk ? "Про тренера" : "About the Trainer"}</h2>
          <div style={{ display: "flex", gap: 28, alignItems: "flex-start", flexWrap: "wrap" }}>
            <div style={{ width: 100, height: 100, borderRadius: "50%", background: "#222", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, flexShrink: 0, border: "3px solid #FF5A1F" }}>💪</div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontWeight: 800, fontSize: 20, marginBottom: 4 }}>Max Bondarenko</h3>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, marginBottom: 16 }}>{isUk ? "Персональний тренер · 8 років досвіду" : "Personal Trainer · 8 years experience"}</p>
              <div style={{ marginBottom: 16 }}>
                {CERTIFICATIONS.map((c) => (
                  <div key={c.en} style={{ display: "flex", gap: 8, marginBottom: 6, fontSize: 13, color: "rgba(255,255,255,0.7)" }}>
                    <span style={{ color: "#FF5A1F", flexShrink: 0 }}>▸</span>
                    <span>{isUk ? c.uk : c.en}</span>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 12, textTransform: "uppercase", letterSpacing: 1 }}>{isUk ? "Філософія тренувань:" : "Training philosophy:"}</p>
              {PHILOSOPHY.map((p, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, fontSize: 14, color: "rgba(255,255,255,0.75)" }}>
                  <span style={{ color: "#FF5A1F", fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                  <span>{isUk ? p.uk : p.en}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#000", color: "rgba(255,255,255,0.3)", padding: "24px 32px", textAlign: "center", fontSize: 13 }}>
        © 2025 MaxPower Training · {isUk ? "Персональні тренування" : "Personal Training"}
      </footer>
    </div>
  );
}
