"use client";
import { useState } from "react";

export function MindSpaceDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [quizStep, setQuizStep] = useState(0); // 0 = not started, 1-5 = questions, 6 = results
  const [answers, setAnswers] = useState<(number | null)[]>([null, null, null, null, null]);
  const [activeSection, setActiveSection] = useState<"home" | "quiz" | "catalog" | "resources">("home");

  const questions = [
    {
      q: isUk ? "Над чим ви хотіли б попрацювати?" : "What would you like to work on?",
      opts: isUk
        ? ["Тривога", "Депресія", "Стосунки", "Самооцінка", "Горе", "Стрес на роботі", "Травма"]
        : ["Anxiety", "Depression", "Relationships", "Self-esteem", "Grief", "Work stress", "Trauma"],
    },
    {
      q: isUk ? "Формат сесій" : "Preferred format",
      opts: isUk ? ["Текстові сесії", "Відеосесії", "Обидва"] : ["Text sessions", "Video sessions", "Both"],
    },
    {
      q: isUk ? "Стать терапевта" : "Therapist gender preference",
      opts: isUk ? ["Не важливо", "Жінка", "Чоловік"] : ["Doesn't matter", "Woman", "Man"],
    },
    {
      q: isUk ? "Мова сесій" : "Session language",
      opts: isUk ? ["Українська", "Англійська", "Обидві"] : ["Ukrainian", "English", "Both"],
    },
    {
      q: isUk ? "Бюджет за сесію" : "Budget per session",
      opts: isUk ? ["До 500 грн", "500–900 грн", "900+ грн"] : ["Under 500 UAH", "500–900 UAH", "900+ UAH"],
    },
  ];

  const psychologists = [
    {
      initials: "АК",
      color: "#C4B5FD",
      name: isUk ? "Анна Ковальчук" : "Anna Kovalchuk",
      creds: isUk ? "МА, когнітивно-поведінкова терапія" : "MA, Cognitive Behavioral Therapy",
      specs: isUk ? ["Тривога", "Депресія", "Травма"] : ["Anxiety", "Depression", "Trauma"],
      exp: isUk ? "8 років" : "8 years",
      rating: 4.9,
      price: isUk ? "від 600 грн" : "from 600 UAH",
      lang: isUk ? "Укр / Англ" : "Ukr / Eng",
    },
    {
      initials: "МД",
      color: "#99F6E4",
      name: isUk ? "Максим Дяченко" : "Maksym Diachenko",
      creds: isUk ? "PhD, гештальт-терапія" : "PhD, Gestalt Therapy",
      specs: isUk ? ["Стосунки", "Самооцінка", "Горе"] : ["Relationships", "Self-esteem", "Grief"],
      exp: isUk ? "12 років" : "12 years",
      rating: 4.8,
      price: isUk ? "від 800 грн" : "from 800 UAH",
      lang: isUk ? "Укр" : "Ukr",
    },
    {
      initials: "ОС",
      color: "#FDE68A",
      name: isUk ? "Оксана Савченко" : "Oksana Savchenko",
      creds: isUk ? "МА, EMDR-терапія" : "MA, EMDR Therapy",
      specs: isUk ? ["Травма", "Тривога", "ПТСР"] : ["Trauma", "Anxiety", "PTSD"],
      exp: isUk ? "10 років" : "10 years",
      rating: 5.0,
      price: isUk ? "від 900 грн" : "from 900 UAH",
      lang: isUk ? "Укр / Англ" : "Ukr / Eng",
    },
    {
      initials: "ВП",
      color: "#FBCFE8",
      name: isUk ? "Василь Петренко" : "Vasyl Petrenko",
      creds: isUk ? "МА, ACT-терапія" : "MA, ACT Therapy",
      specs: isUk ? ["Стрес на роботі", "Вигорання", "Депресія"] : ["Work stress", "Burnout", "Depression"],
      exp: isUk ? "6 років" : "6 years",
      rating: 4.7,
      price: isUk ? "від 500 грн" : "from 500 UAH",
      lang: isUk ? "Укр" : "Ukr",
    },
    {
      initials: "ЛМ",
      color: "#A5F3FC",
      name: isUk ? "Лідія Мороз" : "Lidiia Moroz",
      creds: isUk ? "МА, психодинамічна терапія" : "MA, Psychodynamic Therapy",
      specs: isUk ? ["Горе", "Стосунки", "Самооцінка"] : ["Grief", "Relationships", "Self-esteem"],
      exp: isUk ? "14 років" : "14 years",
      rating: 4.9,
      price: isUk ? "від 700 грн" : "from 700 UAH",
      lang: isUk ? "Укр / Англ" : "Ukr / Eng",
    },
    {
      initials: "РЗ",
      color: "#BBF7D0",
      name: isUk ? "Роман Захаренко" : "Roman Zakharenko",
      creds: isUk ? "МА, схема-терапія" : "MA, Schema Therapy",
      specs: isUk ? ["Самооцінка", "Особистісне зростання", "Стосунки"] : ["Self-esteem", "Personal growth", "Relationships"],
      exp: isUk ? "7 років" : "7 years",
      rating: 4.8,
      price: isUk ? "від 550 грн" : "from 550 UAH",
      lang: isUk ? "Укр" : "Ukr",
    },
  ];

  const matchedResults = [psychologists[0], psychologists[2], psychologists[4]];

  const matchReasons = [
    isUk
      ? "Спеціалізується саме на тому, що ви вказали. Висока кваліфікація і досвід з вашим запитом."
      : "Specializes in exactly what you indicated. Highly qualified with experience in your concern.",
    isUk
      ? "Підходить за форматом і мовою. Відмінні результати з клієнтами зі схожими запитами."
      : "Matches your format and language preferences. Excellent results with clients with similar needs.",
    isUk
      ? "Найвищий рейтинг серед схожих запитів. Доступний у вашому ціновому діапазоні."
      : "Highest rating among similar requests. Available within your budget range.",
  ];

  const resources = [
    {
      icon: "🧘",
      title: isUk ? "Вправи від тривоги" : "Anxiety Exercises",
      desc: isUk
        ? "5 технік, які можна застосувати прямо зараз: дихання 4-7-8, заземлення 5-4-3-2-1 та інші."
        : "5 techniques you can use right now: 4-7-8 breathing, 5-4-3-2-1 grounding, and more.",
      tag: isUk ? "Безкоштовно" : "Free",
      tagColor: "#7C3AED",
    },
    {
      icon: "😴",
      title: isUk ? "Гід зі сну" : "Sleep Guide",
      desc: isUk
        ? "Науково обґрунтовані практики гігієни сну для тих, хто страждає від безсоння або поганого відпочинку."
        : "Evidence-based sleep hygiene practices for those struggling with insomnia or poor rest.",
      tag: isUk ? "PDF + аудіо" : "PDF + audio",
      tagColor: "#0891B2",
    },
    {
      icon: "📓",
      title: isUk ? "Щоденник стресу" : "Stress Journal",
      desc: isUk
        ? "Структуровані підказки для рефлексії, які допомагають відстежувати тригери та патерни."
        : "Structured reflection prompts to help track triggers and patterns.",
      tag: isUk ? "Шаблон" : "Template",
      tagColor: "#059669",
    },
  ];

  const steps = [
    { n: "1", label: isUk ? "Пройдіть тест" : "Take quiz", icon: "🎯" },
    { n: "2", label: isUk ? "Оберіть терапевта" : "Choose therapist", icon: "👤" },
    { n: "3", label: isUk ? "Забронюйте сесію" : "Book session", icon: "📅" },
    { n: "4", label: isUk ? "Починайте зцілення" : "Start healing", icon: "🌱" },
  ];

  const testimonials = [
    {
      text: isUk
        ? "Нарешті знайшла терапевта, з яким мені комфортно. Вже 3 місяці і відчуваю величезний прогрес."
        : "Finally found a therapist I'm comfortable with. 3 months in and I feel huge progress.",
      label: isUk ? "Анонімний клієнт, 28 р." : "Anonymous client, 28 y.o.",
    },
    {
      text: isUk
        ? "Я думав, що онлайн-терапія не для мене. Помилявся. Зручно, конфіденційно, ефективно."
        : "I thought online therapy wasn't for me. I was wrong. Convenient, confidential, effective.",
      label: isUk ? "Анонімний клієнт, 35 р." : "Anonymous client, 35 y.o.",
    },
    {
      text: isUk
        ? "Підбір терапевта зайняв 2 хвилини. Перша сесія зі знижкою дала зрозуміти, чи підходимо ми одне одному."
        : "Matching took 2 minutes. The discounted first session let me see if we were a good fit.",
      label: isUk ? "Анонімний клієнт, 41 р." : "Anonymous client, 41 y.o.",
    },
  ];

  const navItems = [
    { key: "home" as const, label: isUk ? "Головна" : "Home" },
    { key: "quiz" as const, label: isUk ? "Підібрати терапевта" : "Find therapist" },
    { key: "catalog" as const, label: isUk ? "Каталог" : "Catalog" },
    { key: "resources" as const, label: isUk ? "Ресурси" : "Resources" },
  ];

  function handleAnswer(qi: number, ai: number) {
    const next = [...answers];
    next[qi] = ai;
    setAnswers(next);
    if (qi < 4) {
      setQuizStep(qi + 2);
    } else {
      setQuizStep(6);
    }
  }

  return (
    <div style={{ background: "#FAFAFA", minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Crisis Bar */}
      <div style={{ background: "#7C3AED", color: "white", padding: "10px 24px", textAlign: "center", fontSize: 14 }}>
        {isUk
          ? "🆘 Якщо вам зараз погано — телефонуйте: 0800-402-900 (безкоштовно)"
          : "🆘 If you're in crisis right now, call: 0800-402-900 (free)"}
      </div>

      {/* Nav */}
      <nav
        style={{
          background: "white",
          borderBottom: "1px solid #EDE9FE",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          gap: 0,
          overflowX: "auto",
        }}
      >
        <div style={{ fontWeight: 800, color: "#7C3AED", fontSize: 18, paddingRight: 24, flexShrink: 0 }}>
          MindSpace
        </div>
        {navItems.map((n) => (
          <button
            key={n.key}
            onClick={() => { setActiveSection(n.key); if (n.key === "quiz") setQuizStep(1); }}
            style={{
              padding: "14px 16px",
              border: "none",
              borderBottom: activeSection === n.key ? "3px solid #7C3AED" : "3px solid transparent",
              background: "transparent",
              color: activeSection === n.key ? "#7C3AED" : "#6B7280",
              fontWeight: activeSection === n.key ? 700 : 400,
              cursor: "pointer",
              fontSize: 14,
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {n.label}
          </button>
        ))}
      </nav>

      {/* HOME */}
      {activeSection === "home" && (
        <div>
          {/* Hero */}
          <div
            style={{
              background: "linear-gradient(135deg, #EDE9FE 0%, #FAFAFA 60%, #F5F3FF 100%)",
              padding: "64px 24px 56px",
              textAlign: "center",
            }}
          >
            <div style={{ maxWidth: 640, margin: "0 auto" }}>
              <div style={{ fontSize: 52, marginBottom: 16 }}>🧠</div>
              <h1 style={{ fontSize: "clamp(28px,5vw,52px)", fontWeight: 800, color: "#3B0764", lineHeight: 1.15, marginBottom: 18 }}>
                {isUk ? "Ви не самотні. Підтримка поруч." : "You're not alone. Support is near."}
              </h1>
              <p style={{ fontSize: 18, color: "#6D28D9", marginBottom: 28, fontWeight: 500 }}>
                {isUk ? "Онлайн-терапія. Без черг. Конфіденційно." : "Online therapy. No queues. Confidential."}
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <button
                  onClick={() => { setActiveSection("quiz"); setQuizStep(1); }}
                  style={{
                    background: "#7C3AED",
                    color: "white",
                    border: "none",
                    borderRadius: 40,
                    padding: "14px 32px",
                    fontSize: 16,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  {isUk ? "Підібрати терапевта" : "Find my therapist"}
                </button>
                <button
                  onClick={() => setActiveSection("catalog")}
                  style={{
                    background: "white",
                    color: "#7C3AED",
                    border: "2px solid #7C3AED",
                    borderRadius: 40,
                    padding: "14px 32px",
                    fontSize: 16,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  {isUk ? "Переглянути каталог" : "Browse catalog"}
                </button>
              </div>
            </div>
          </div>

          {/* Privacy highlight */}
          <div style={{ background: "#EDE9FE", padding: "20px 24px", textAlign: "center" }}>
            <p style={{ color: "#5B21B6", fontWeight: 600, fontSize: 15, margin: 0 }}>
              🔒 {isUk
                ? "Ніхто не дізнається, що ви отримуєте допомогу. 100% конфіденційно."
                : "No one knows you're getting help. 100% confidential."}
            </p>
          </div>

          {/* How it works */}
          <div style={{ padding: "48px 24px", maxWidth: 800, margin: "0 auto" }}>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "#3B0764", marginBottom: 32, textAlign: "center" }}>
              {isUk ? "Як це працює" : "How It Works"}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 20 }}>
              {steps.map((s, i) => (
                <div
                  key={i}
                  style={{
                    background: "white",
                    borderRadius: 20,
                    padding: "24px 16px",
                    textAlign: "center",
                    boxShadow: "0 2px 12px #7C3AED18",
                  }}
                >
                  <div style={{ fontSize: 32, marginBottom: 8 }}>{s.icon}</div>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: "#7C3AED",
                      color: "white",
                      fontWeight: 800,
                      fontSize: 14,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 10px",
                    }}
                  >
                    {s.n}
                  </div>
                  <div style={{ fontWeight: 600, color: "#3B0764", fontSize: 15 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div style={{ background: "#EDE9FE", padding: "48px 24px" }}>
            <div style={{ maxWidth: 800, margin: "0 auto" }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: "#3B0764", marginBottom: 24, textAlign: "center" }}>
                {isUk ? "Що кажуть клієнти" : "What clients say"}
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16 }}>
                {testimonials.map((t, i) => (
                  <div
                    key={i}
                    style={{
                      background: "white",
                      borderRadius: 16,
                      padding: "24px 20px",
                      boxShadow: "0 2px 8px #7C3AED11",
                    }}
                  >
                    <div style={{ color: "#7C3AED", fontSize: 24, marginBottom: 8 }}>❝</div>
                    <p style={{ color: "#4B5563", fontSize: 14, lineHeight: 1.7, marginBottom: 12 }}>{t.text}</p>
                    <p style={{ color: "#9CA3AF", fontSize: 13, margin: 0 }}>— {t.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* QUIZ */}
      {activeSection === "quiz" && (
        <div style={{ maxWidth: 600, margin: "0 auto", padding: "40px 24px" }}>
          {quizStep === 0 && (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🎯</div>
              <h2 style={{ fontSize: 26, fontWeight: 700, color: "#3B0764", marginBottom: 12 }}>
                {isUk ? "Підбір психолога" : "Psychologist Matching"}
              </h2>
              <p style={{ color: "#6D28D9", marginBottom: 28, fontSize: 15 }}>
                {isUk ? "5 коротких запитань — і ми підберемо трьох найкращих терапевтів для вас." : "5 short questions — and we'll match 3 ideal therapists for you."}
              </p>
              <button
                onClick={() => setQuizStep(1)}
                style={{
                  background: "#7C3AED",
                  color: "white",
                  border: "none",
                  borderRadius: 40,
                  padding: "14px 40px",
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {isUk ? "Почати" : "Start"}
              </button>
            </div>
          )}

          {quizStep >= 1 && quizStep <= 5 && (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28 }}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <div
                    key={n}
                    style={{
                      height: 6,
                      flex: 1,
                      borderRadius: 10,
                      background: n <= quizStep ? "#7C3AED" : "#DDD6FE",
                      transition: "background 0.3s",
                    }}
                  />
                ))}
              </div>
              <p style={{ color: "#9CA3AF", fontSize: 14, marginBottom: 8 }}>
                {isUk ? `Крок ${quizStep} з 5` : `Step ${quizStep} of 5`}
              </p>
              <h3 style={{ fontSize: 22, fontWeight: 700, color: "#3B0764", marginBottom: 20 }}>
                {questions[quizStep - 1].q}
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {questions[quizStep - 1].opts.map((opt, oi) => (
                  <button
                    key={oi}
                    onClick={() => handleAnswer(quizStep - 1, oi)}
                    style={{
                      background: answers[quizStep - 1] === oi ? "#7C3AED" : "white",
                      color: answers[quizStep - 1] === oi ? "white" : "#3B0764",
                      border: `2px solid ${answers[quizStep - 1] === oi ? "#7C3AED" : "#DDD6FE"}`,
                      borderRadius: 14,
                      padding: "14px 20px",
                      fontSize: 15,
                      fontWeight: 500,
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 0.15s",
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {quizStep === 6 && (
            <div>
              <div style={{ textAlign: "center", marginBottom: 32 }}>
                <div style={{ fontSize: 40, marginBottom: 10 }}>✨</div>
                <h2 style={{ fontSize: 24, fontWeight: 700, color: "#3B0764", marginBottom: 8 }}>
                  {isUk ? "Ваші підібрані терапевти" : "Your Matched Therapists"}
                </h2>
                <p style={{ color: "#6D28D9", fontSize: 15 }}>
                  {isUk ? "На основі ваших відповідей ми рекомендуємо:" : "Based on your answers, we recommend:"}
                </p>
              </div>

              {matchedResults.map((p, i) => (
                <div
                  key={i}
                  style={{
                    background: "white",
                    borderRadius: 20,
                    padding: "24px",
                    marginBottom: 16,
                    boxShadow: "0 4px 16px #7C3AED18",
                    border: "1px solid #EDE9FE",
                  }}
                >
                  <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <div
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: "50%",
                        background: p.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 800,
                        fontSize: 18,
                        color: "#3B0764",
                        flexShrink: 0,
                      }}
                    >
                      {p.initials}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
                        <div>
                          <div style={{ fontWeight: 700, color: "#3B0764", fontSize: 17 }}>{p.name}</div>
                          <div style={{ color: "#7C3AED", fontSize: 13, marginTop: 2 }}>{p.creds}</div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontWeight: 700, color: "#7C3AED", fontSize: 15 }}>{p.price}</div>
                          <div style={{ color: "#F59E0B", fontSize: 13 }}>★ {p.rating}</div>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 10 }}>
                        {p.specs.map((s, si) => (
                          <span
                            key={si}
                            style={{
                              background: "#EDE9FE",
                              borderRadius: 20,
                              padding: "3px 10px",
                              fontSize: 12,
                              color: "#7C3AED",
                            }}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                      <div
                        style={{
                          background: "#F5F3FF",
                          borderRadius: 12,
                          padding: "10px 14px",
                          marginTop: 12,
                          fontSize: 13,
                          color: "#5B21B6",
                          lineHeight: 1.5,
                        }}
                      >
                        <strong>{isUk ? "Чому це збіг: " : "Why this match: "}</strong>
                        {matchReasons[i]}
                      </div>
                      <button
                        style={{
                          marginTop: 14,
                          width: "100%",
                          background: "#7C3AED",
                          color: "white",
                          border: "none",
                          borderRadius: 40,
                          padding: "11px 0",
                          fontSize: 14,
                          fontWeight: 700,
                          cursor: "pointer",
                        }}
                      >
                        {isUk ? "Пробна сесія (знижка 50%)" : "Book trial session (50% off)"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div style={{ textAlign: "center", marginTop: 8 }}>
                <button
                  onClick={() => { setAnswers([null,null,null,null,null]); setQuizStep(1); }}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#7C3AED",
                    cursor: "pointer",
                    fontSize: 14,
                    textDecoration: "underline",
                  }}
                >
                  {isUk ? "Пройти знову" : "Retake quiz"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* CATALOG */}
      {activeSection === "catalog" && (
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "40px 24px" }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: "#3B0764", marginBottom: 8, textAlign: "center" }}>
            {isUk ? "Каталог психологів" : "Psychologist Catalog"}
          </h2>
          <p style={{ color: "#6D28D9", textAlign: "center", marginBottom: 28, fontSize: 15 }}>
            {isUk ? "Усі спеціалісти верифіковані та ліцензовані." : "All specialists are verified and licensed."}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: 20 }}>
            {psychologists.map((p, i) => (
              <div
                key={i}
                style={{
                  background: "white",
                  borderRadius: 20,
                  padding: "24px 20px",
                  boxShadow: "0 2px 12px #7C3AED11",
                  border: "1px solid #EDE9FE",
                }}
              >
                <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 14 }}>
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: "50%",
                      background: p.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: 16,
                      color: "#3B0764",
                      flexShrink: 0,
                    }}
                  >
                    {p.initials}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: "#3B0764", fontSize: 15 }}>{p.name}</div>
                    <div style={{ color: "#7C3AED", fontSize: 12, marginTop: 2 }}>{p.creds}</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
                  {p.specs.map((s, si) => (
                    <span
                      key={si}
                      style={{
                        background: "#EDE9FE",
                        borderRadius: 20,
                        padding: "3px 9px",
                        fontSize: 11,
                        color: "#7C3AED",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#6B7280", marginBottom: 10 }}>
                  <span>{isUk ? `Досвід: ${p.exp}` : `Exp: ${p.exp}`}</span>
                  <span style={{ color: "#F59E0B" }}>★ {p.rating}</span>
                </div>
                <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 14 }}>
                  {isUk ? "Мова: " : "Lang: "}{p.lang}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: 700, color: "#7C3AED", fontSize: 15 }}>{p.price}</span>
                  <button
                    style={{
                      background: "#7C3AED",
                      color: "white",
                      border: "none",
                      borderRadius: 40,
                      padding: "8px 18px",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    {isUk ? "Обрати" : "Select"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* RESOURCES */}
      {activeSection === "resources" && (
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "40px 24px" }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: "#3B0764", marginBottom: 8, textAlign: "center" }}>
            {isUk ? "Ресурси для самодопомоги" : "Self-Help Resources"}
          </h2>
          <p style={{ color: "#6D28D9", textAlign: "center", marginBottom: 32, fontSize: 15 }}>
            {isUk
              ? "Безкоштовні матеріали, розроблені нашими психологами."
              : "Free materials created by our psychologists."}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 20, marginBottom: 48 }}>
            {resources.map((r, i) => (
              <div
                key={i}
                style={{
                  background: "white",
                  borderRadius: 20,
                  padding: "28px 22px",
                  boxShadow: "0 2px 12px #7C3AED11",
                  border: "1px solid #EDE9FE",
                }}
              >
                <div style={{ fontSize: 36, marginBottom: 14 }}>{r.icon}</div>
                <div
                  style={{
                    display: "inline-block",
                    background: `${r.tagColor}18`,
                    color: r.tagColor,
                    borderRadius: 20,
                    padding: "3px 10px",
                    fontSize: 12,
                    fontWeight: 600,
                    marginBottom: 10,
                  }}
                >
                  {r.tag}
                </div>
                <h3 style={{ fontWeight: 700, color: "#3B0764", fontSize: 17, marginBottom: 10 }}>{r.title}</h3>
                <p style={{ color: "#6B7280", fontSize: 14, lineHeight: 1.6, marginBottom: 18 }}>{r.desc}</p>
                <button
                  style={{
                    width: "100%",
                    background: "#EDE9FE",
                    color: "#7C3AED",
                    border: "none",
                    borderRadius: 40,
                    padding: "10px 0",
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  {isUk ? "Отримати безкоштовно" : "Get for free"}
                </button>
              </div>
            ))}
          </div>

          <div
            style={{
              background: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)",
              borderRadius: 24,
              padding: "40px 32px",
              textAlign: "center",
              color: "white",
            }}
          >
            <div style={{ fontSize: 36, marginBottom: 12 }}>🔒</div>
            <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>
              {isUk ? "Ваша конфіденційність" : "Your Privacy"}
            </h3>
            <p style={{ fontSize: 15, opacity: 0.9, lineHeight: 1.7, marginBottom: 20, maxWidth: 480, margin: "0 auto 20px" }}>
              {isUk
                ? "Ніхто не дізнається, що ви користуєтесь MindSpace. Всі дані зашифровані. Ми ніколи не ділимось особистою інформацією."
                : "No one will know you're using MindSpace. All data is encrypted. We never share personal information."}
            </p>
            <button
              onClick={() => { setActiveSection("quiz"); setQuizStep(1); }}
              style={{
                background: "white",
                color: "#7C3AED",
                border: "none",
                borderRadius: 40,
                padding: "14px 36px",
                fontSize: 16,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {isUk ? "Знайти свого терапевта" : "Find my therapist"}
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <div
        style={{
          background: "#3B0764",
          color: "white",
          padding: "28px 24px",
          textAlign: "center",
          marginTop: 24,
        }}
      >
        <p style={{ fontWeight: 800, fontSize: 18, margin: "0 0 6px" }}>MindSpace</p>
        <p style={{ color: "#C4B5FD", fontSize: 14, margin: 0 }}>
          {isUk
            ? "Ліцензована онлайн-платформа психологічної допомоги. Всі спеціалісти верифіковані."
            : "Licensed online mental health platform. All specialists are verified."}
        </p>
      </div>
    </div>
  );
}
