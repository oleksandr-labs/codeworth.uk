"use client";
import { useState } from "react";

export function CoupleSpaceDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [ratings, setRatings] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0]);
  const [showResult, setShowResult] = useState(false);
  const [expandedExercise, setExpandedExercise] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"test" | "services" | "therapists" | "book">("test");
  const [bookForm, setBookForm] = useState({ partner1: "", partner2: "", phone: "", time: "", concern: "" });
  const [bookSent, setBookSent] = useState(false);

  const statements = isUk
    ? [
        "Ми рідко критикуємо характер одне одного",
        "Ми не захищаємось під час конфліктів",
        "Ми не замовкаємо під час суперечок",
        "Ми не ставимося одне до одного з презирством",
        "Ми щиро святкуємо успіхи одне одного",
        "Ми цікавимося щоденним життям одне одного",
        "У нас є спільні ритуали та сенс",
        "Ми вирішуємо конфлікти до ескалації",
      ]
    : [
        "We rarely criticize each other's character",
        "We don't get defensive during conflicts",
        "We don't stonewall (go silent) during arguments",
        "We don't treat each other with contempt",
        "We celebrate each other's successes genuinely",
        "We maintain interest in each other's daily life",
        "We have shared meaning and rituals",
        "We repair conflicts before they escalate",
      ];

  const totalScore = ratings.reduce((a, b) => a + b, 0);
  const allRated = ratings.every((r) => r > 0);

  function getResult() {
    if (totalScore >= 35)
      return {
        label: isUk ? "Міцні стосунки — продовжуйте їх плекати" : "Strong relationship — keep nurturing it",
        color: "#16a34a",
        cta: isUk ? "Забронювати сесію для підтримки" : "Book a couples session",
        urgent: false,
      };
    if (totalScore >= 25)
      return {
        label: isUk ? "Добра основа з точками росту" : "Good foundation with growth areas",
        color: "#ca8a04",
        cta: isUk ? "Забронювати сесію для пари" : "Book a couples session",
        urgent: false,
      };
    if (totalScore >= 15)
      return {
        label: isUk ? "Деякі тривожні патерни — рекомендована терапія" : "Some concerning patterns — therapy recommended",
        color: "#ea580c",
        cta: isUk ? "Забронювати сесію для пари" : "Book a couples session",
        urgent: false,
      };
    return {
      label: isUk ? "Потрібна термінова увага — терапія пар допоможе" : "Urgent attention needed — couples therapy can help",
      color: "#dc2626",
      cta: isUk ? "Забронювати термінову консультацію" : "Book urgent consultation",
      urgent: true,
    };
  }

  const services = [
    {
      icon: "💑",
      title: isUk ? "Терапія пар" : "Couples Therapy",
      desc: isUk
        ? "Метод Готтмана — науково обґрунтований підхід для глибокого розуміння та відновлення зв'язку."
        : "Gottman Method — evidence-based approach for deep understanding and reconnecting.",
      format: isUk ? "Онлайн / Офлайн" : "Online / Offline",
      price: isUk ? "від 1 800 грн" : "from 1 800 UAH",
    },
    {
      icon: "👨‍👩‍👧",
      title: isUk ? "Сімейне консультування" : "Family Counseling",
      desc: isUk
        ? "Системний підхід — працюємо з усією сімейною динамікою, включаючи дітей та покоління."
        : "Systems approach — working with entire family dynamics including children and generations.",
      format: isUk ? "Офлайн / Онлайн" : "Offline / Online",
      price: isUk ? "від 2 200 грн" : "from 2 200 UAH",
    },
    {
      icon: "⚖️",
      title: isUk ? "Медіація при розлученні" : "Divorce Mediation",
      desc: isUk
        ? "Допомагаємо знайти рішення без суду — особливо важливо, коли є діти."
        : "We help reach solutions without court — especially important when children are involved.",
      format: isUk ? "Конфіденційно, офлайн" : "Confidential, offline",
      price: isUk ? "від 3 000 грн" : "from 3 000 UAH",
    },
  ];

  const therapists = [
    {
      name: isUk ? "Олена Марченко" : "Olena Marchenko",
      method: isUk ? "Метод Готтмана" : "Gottman Method",
      exp: isUk ? "12 років" : "12 years",
      slot: isUk ? "Завтра, 14:00" : "Tomorrow, 2:00 PM",
      initials: "ОМ",
      color: "#F9A8D4",
    },
    {
      name: isUk ? "Дмитро Коваль" : "Dmytro Koval",
      method: "EFT",
      exp: isUk ? "8 років" : "8 years",
      slot: isUk ? "Чт, 18:00" : "Thu, 6:00 PM",
      initials: "ДК",
      color: "#FCA5A5",
    },
    {
      name: isUk ? "Наталія Бойко" : "Natalia Boiko",
      method: "Imago",
      exp: isUk ? "15 років" : "15 years",
      slot: isUk ? "Пн, 10:00" : "Mon, 10:00 AM",
      initials: "НБ",
      color: "#FDBA74",
    },
    {
      name: isUk ? "Сергій Литвин" : "Serhii Lytvyn",
      method: isUk ? "Сімейні системи" : "Family Systems",
      exp: isUk ? "10 років" : "10 years",
      slot: isUk ? "Ср, 16:00" : "Wed, 4:00 PM",
      initials: "СЛ",
      color: "#A5F3FC",
    },
  ];

  const exercises = [
    {
      title: isUk ? "36 запитань" : "The 36 Questions",
      desc: isUk
        ? "Науково доведений спосіб поглибити близькість за 90 хвилин."
        : "Scientifically proven way to deepen intimacy in 90 minutes.",
      detail: isUk
        ? "Задавайте одне одному три серії запитань — від легких до глибоких. Дослідження Артура Арона показало, що ці питання створюють близькість між незнайомцями та зміцнюють пари. Приклади: «Якби ти міг запросити будь-кого на вечерю, хто б це був?», «Які твої найбільші страхи?»"
        : "Ask each other three sets of questions — from light to deep. Arthur Aron's research showed these questions create closeness between strangers and strengthen couples. Examples: 'If you could invite anyone to dinner, who would it be?', 'What are your biggest fears?'",
    },
    {
      title: isUk ? "Щоденний ритуал check-in" : "Daily Check-in Ritual",
      desc: isUk ? "5 хвилин на день для підтримки емоційного зв'язку." : "5 minutes a day to maintain emotional connection.",
      detail: isUk
        ? "Кожного вечора запитуйте одне одного: «Що було найкращим у твоєму дні?», «Що було найскладнішим?», «Що тобі потрібно від мене сьогодні ввечері?» Без телефонів, в тиші, обличчям до обличчя."
        : "Each evening ask each other: 'What was the best part of your day?', 'What was the hardest?', 'What do you need from me tonight?' No phones, in quiet, face to face.",
    },
    {
      title: isUk ? "Практика вдячності" : "Appreciation Practice",
      desc: isUk ? "Щодня знаходьте одну конкретну річ для вдячності." : "Each day find one specific thing to appreciate.",
      detail: isUk
        ? "Замість «дякую за все» — будьте конкретними: «Я вдячний/-на тобі за те, що сьогодні вранці ти помітив/-ла, що я втомлений/-а, і приніс/-ла мені каву». Конкретність робить вдячність значущою та будує позитивні спогади."
        : "Instead of 'thanks for everything' — be specific: 'I appreciate you for noticing I was tired this morning and bringing me coffee.' Specificity makes gratitude meaningful and builds positive memories.",
    },
  ];

  const tabs = [
    { key: "test" as const, label: isUk ? "Тест" : "Test" },
    { key: "services" as const, label: isUk ? "Послуги" : "Services" },
    { key: "therapists" as const, label: isUk ? "Терапевти" : "Therapists" },
    { key: "book" as const, label: isUk ? "Запис" : "Book" },
  ];

  const result = getResult();

  return (
    <div style={{ background: "#FFF1F2", minHeight: "100vh", fontFamily: "'Georgia', serif" }}>
      {/* Hero */}
      <div
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #FFF1F2 0%, #FDFAF7 50%, #FFE4E6 100%)", padding: "60px 24px 48px" }}
      >
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🌸</div>
          <h1 style={{ fontSize: "clamp(28px,5vw,48px)", fontWeight: 700, color: "#7F1D1D", lineHeight: 1.2, marginBottom: 16 }}>
            {isUk ? "Ваші стосунки заслуговують уваги" : "Your relationship deserves attention"}
          </h1>
          <p style={{ fontSize: 18, color: "#9F6450", marginBottom: 20 }}>
            {isUk
              ? "Терапія пар. Сімейне консультування. Медіація."
              : "Couples therapy. Family counseling. Mediation."}
          </p>
          <div
            style={{
              display: "inline-block",
              background: "#FDFAF7",
              border: "1px solid #F9A8D4",
              borderRadius: 40,
              padding: "10px 24px",
              color: "#C2614A",
              fontSize: 15,
            }}
          >
            {isUk
              ? "Перша сесія — без зобов'язань. Просто розмова."
              : "First session — no obligations. Just a conversation."}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: "#FDFAF7", borderBottom: "1px solid #FECDD3", padding: "0 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", gap: 0 }}>
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              style={{
                padding: "14px 20px",
                border: "none",
                borderBottom: activeTab === t.key ? "3px solid #C2614A" : "3px solid transparent",
                background: "transparent",
                color: activeTab === t.key ? "#C2614A" : "#9CA3AF",
                fontWeight: activeTab === t.key ? 700 : 400,
                cursor: "pointer",
                fontSize: 15,
                transition: "all 0.2s",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px 24px" }}>
        {/* TAB: Relationship Test */}
        {activeTab === "test" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <h2 style={{ fontSize: 26, fontWeight: 700, color: "#7F1D1D", marginBottom: 8 }}>
                {isUk ? "Тест здоров'я стосунків" : "Relationship Health Test"}
              </h2>
              <p style={{ color: "#9F6450", fontSize: 15 }}>
                {isUk
                  ? "Натхненний методом Готтмана. Оцініть кожне твердження від 1 (зовсім не так) до 5 (так завжди)."
                  : "Inspired by the Gottman Method. Rate each statement from 1 (not at all) to 5 (always true)."}
              </p>
            </div>

            {!showResult ? (
              <div>
                {statements.map((stmt, i) => (
                  <div
                    key={i}
                    style={{
                      background: "#FDFAF7",
                      borderRadius: 16,
                      padding: "20px 24px",
                      marginBottom: 16,
                      border: ratings[i] > 0 ? "1px solid #FECDD3" : "1px solid #F3E8E8",
                      transition: "border-color 0.2s",
                    }}
                  >
                    <p style={{ color: "#44201A", fontWeight: 600, marginBottom: 14, fontSize: 15 }}>
                      {i + 1}. {stmt}
                    </p>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      {[1, 2, 3, 4, 5].map((v) => (
                        <button
                          key={v}
                          onClick={() => {
                            const next = [...ratings];
                            next[i] = v;
                            setRatings(next);
                          }}
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            border: "2px solid",
                            borderColor: ratings[i] === v ? "#C2614A" : "#FECDD3",
                            background: ratings[i] === v ? "#C2614A" : "white",
                            color: ratings[i] === v ? "white" : "#C2614A",
                            fontWeight: 700,
                            cursor: "pointer",
                            fontSize: 15,
                            transition: "all 0.15s",
                            flexShrink: 0,
                          }}
                        >
                          {v}
                        </button>
                      ))}
                      <span style={{ marginLeft: 8, color: "#9CA3AF", fontSize: 13 }}>
                        {ratings[i] === 1
                          ? isUk ? "Зовсім не так" : "Not at all"
                          : ratings[i] === 5
                          ? isUk ? "Завжди так" : "Always true"
                          : ratings[i] > 0
                          ? `${ratings[i]}/5`
                          : isUk ? "Оцініть" : "Rate it"}
                      </span>
                    </div>
                  </div>
                ))}

                <div style={{ textAlign: "center", marginTop: 24 }}>
                  <div style={{ marginBottom: 12, color: "#9F6450", fontSize: 14 }}>
                    {isUk ? `Оцінено: ${ratings.filter((r) => r > 0).length} / 8` : `Rated: ${ratings.filter((r) => r > 0).length} / 8`}
                  </div>
                  <button
                    onClick={() => allRated && setShowResult(true)}
                    style={{
                      background: allRated ? "#C2614A" : "#E5BAB4",
                      color: "white",
                      border: "none",
                      borderRadius: 40,
                      padding: "14px 36px",
                      fontSize: 16,
                      fontWeight: 700,
                      cursor: allRated ? "pointer" : "not-allowed",
                      transition: "background 0.2s",
                    }}
                  >
                    {isUk ? "Переглянути результат" : "See My Result"}
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    background: "#FDFAF7",
                    borderRadius: 24,
                    padding: "40px 32px",
                    border: `2px solid ${result.color}22`,
                    marginBottom: 24,
                  }}
                >
                  <div style={{ fontSize: 56, marginBottom: 12 }}>
                    {totalScore >= 35 ? "💚" : totalScore >= 25 ? "💛" : totalScore >= 15 ? "🧡" : "❤️‍🩹"}
                  </div>
                  <div style={{ fontSize: 40, fontWeight: 800, color: result.color, marginBottom: 8 }}>
                    {totalScore} / 40
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 600, color: "#44201A", marginBottom: 16 }}>
                    {result.label}
                  </div>
                  <div
                    style={{
                      background: `${result.color}11`,
                      borderRadius: 12,
                      padding: "16px 24px",
                      marginBottom: 24,
                      color: "#7F1D1D",
                      fontSize: 15,
                      lineHeight: 1.6,
                    }}
                  >
                    {totalScore >= 35
                      ? isUk
                        ? "Ваші стосунки мають міцну основу. Продовжуйте інвестувати в них — навіть найкращі пари виграють від підтримки."
                        : "Your relationship has a strong foundation. Continue investing in it — even the best couples benefit from support."
                      : totalScore >= 25
                      ? isUk
                        ? "У вас є хороша основа. Кілька сесій допоможуть зміцнити слабкі місця та запобігти майбутнім конфліктам."
                        : "You have a good foundation. A few sessions can strengthen weak spots and prevent future conflicts."
                      : totalScore >= 15
                      ? isUk
                        ? "Деякі патерни вказують на зони, де потрібна увага. Терапія пар може суттєво змінити динаміку."
                        : "Some patterns indicate areas needing attention. Couples therapy can significantly shift the dynamic."
                      : isUk
                      ? "Ці результати вказують на серйозні труднощі. Не чекайте — чим раніше ви звернетесь, тим більше шансів на відновлення."
                      : "These results indicate serious difficulties. Don't wait — the sooner you reach out, the greater the chance of recovery."}
                  </div>
                  <button
                    onClick={() => setActiveTab("book")}
                    style={{
                      background: result.color,
                      color: "white",
                      border: "none",
                      borderRadius: 40,
                      padding: "14px 36px",
                      fontSize: 16,
                      fontWeight: 700,
                      cursor: "pointer",
                      marginBottom: 12,
                    }}
                  >
                    {result.cta}
                  </button>
                  <br />
                  <button
                    onClick={() => { setRatings([0,0,0,0,0,0,0,0]); setShowResult(false); }}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#9F6450",
                      cursor: "pointer",
                      fontSize: 14,
                      textDecoration: "underline",
                    }}
                  >
                    {isUk ? "Пройти знову" : "Take again"}
                  </button>
                </div>
              </div>
            )}

            {/* Free Exercises */}
            <div style={{ marginTop: 48 }}>
              <h3 style={{ fontSize: 22, fontWeight: 700, color: "#7F1D1D", marginBottom: 8 }}>
                {isUk ? "Безкоштовні вправи для пар" : "Free Exercises for Couples"}
              </h3>
              <p style={{ color: "#9F6450", marginBottom: 20, fontSize: 15 }}>
                {isUk ? "Практики, які можна спробувати вже сьогодні." : "Practices you can try today."}
              </p>
              {exercises.map((ex, i) => (
                <div
                  key={i}
                  style={{
                    background: "#FDFAF7",
                    borderRadius: 16,
                    marginBottom: 12,
                    border: "1px solid #FECDD3",
                    overflow: "hidden",
                  }}
                >
                  <button
                    onClick={() => setExpandedExercise(expandedExercise === i ? null : i)}
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "18px 24px",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, color: "#44201A", fontSize: 16 }}>{ex.title}</div>
                      <div style={{ color: "#9F6450", fontSize: 14, marginTop: 4 }}>{ex.desc}</div>
                    </div>
                    <span style={{ color: "#C2614A", fontSize: 20, flexShrink: 0, marginLeft: 12 }}>
                      {expandedExercise === i ? "−" : "+"}
                    </span>
                  </button>
                  {expandedExercise === i && (
                    <div style={{ padding: "0 24px 20px", color: "#7F1D1D", fontSize: 15, lineHeight: 1.7 }}>
                      {ex.detail}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: Services */}
        {activeTab === "services" && (
          <div>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "#7F1D1D", marginBottom: 24, textAlign: "center" }}>
              {isUk ? "Наші послуги" : "Our Services"}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 20 }}>
              {services.map((s, i) => (
                <div
                  key={i}
                  style={{
                    background: "#FDFAF7",
                    borderRadius: 20,
                    padding: "28px 24px",
                    border: "1px solid #FECDD3",
                  }}
                >
                  <div style={{ fontSize: 36, marginBottom: 12 }}>{s.icon}</div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: "#44201A", marginBottom: 10 }}>{s.title}</h3>
                  <p style={{ color: "#9F6450", fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>{s.desc}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <span
                      style={{
                        display: "inline-block",
                        background: "#FFF1F2",
                        borderRadius: 20,
                        padding: "4px 12px",
                        color: "#C2614A",
                        fontSize: 13,
                        width: "fit-content",
                      }}
                    >
                      {s.format}
                    </span>
                    <span style={{ fontWeight: 700, color: "#C2614A", fontSize: 16 }}>{s.price}</span>
                  </div>
                  <button
                    onClick={() => setActiveTab("book")}
                    style={{
                      marginTop: 16,
                      width: "100%",
                      background: "#C2614A",
                      color: "white",
                      border: "none",
                      borderRadius: 40,
                      padding: "10px 0",
                      cursor: "pointer",
                      fontWeight: 600,
                      fontSize: 14,
                    }}
                  >
                    {isUk ? "Дізнатись більше" : "Learn more"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: Therapists */}
        {activeTab === "therapists" && (
          <div>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "#7F1D1D", marginBottom: 8, textAlign: "center" }}>
              {isUk ? "Наші терапевти" : "Our Therapists"}
            </h2>
            <p style={{ color: "#9F6450", textAlign: "center", marginBottom: 28, fontSize: 15 }}>
              {isUk ? "Сертифіковані спеціалісти з досвідом роботи з парами." : "Certified specialists experienced in couples work."}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 20 }}>
              {therapists.map((t, i) => (
                <div
                  key={i}
                  style={{
                    background: "#FDFAF7",
                    borderRadius: 20,
                    padding: "24px 20px",
                    border: "1px solid #FECDD3",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: "50%",
                      background: t.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 14px",
                      fontSize: 22,
                      fontWeight: 700,
                      color: "#44201A",
                    }}
                  >
                    {t.initials}
                  </div>
                  <div style={{ fontWeight: 700, color: "#44201A", fontSize: 16, marginBottom: 6 }}>{t.name}</div>
                  <div
                    style={{
                      background: "#FFF1F2",
                      borderRadius: 20,
                      padding: "3px 10px",
                      display: "inline-block",
                      fontSize: 12,
                      color: "#C2614A",
                      marginBottom: 8,
                    }}
                  >
                    {t.method}
                  </div>
                  <div style={{ color: "#9F6450", fontSize: 13, marginBottom: 12 }}>
                    {isUk ? `Досвід: ${t.exp}` : `Experience: ${t.exp}`}
                  </div>
                  <div
                    style={{
                      background: "#FFF1F2",
                      borderRadius: 10,
                      padding: "8px 12px",
                      fontSize: 13,
                      color: "#44201A",
                      marginBottom: 14,
                    }}
                  >
                    {isUk ? "Найближча сесія:" : "Next slot:"} <strong>{t.slot}</strong>
                  </div>
                  <button
                    onClick={() => setActiveTab("book")}
                    style={{
                      width: "100%",
                      background: "#C2614A",
                      color: "white",
                      border: "none",
                      borderRadius: 40,
                      padding: "9px 0",
                      cursor: "pointer",
                      fontWeight: 600,
                      fontSize: 14,
                    }}
                  >
                    {isUk ? "Записатись" : "Book session"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: Book */}
        {activeTab === "book" && (
          <div style={{ maxWidth: 520, margin: "0 auto" }}>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "#7F1D1D", marginBottom: 8, textAlign: "center" }}>
              {isUk ? "Запис для обох партнерів" : "Book for Both Partners"}
            </h2>
            <p style={{ color: "#9F6450", textAlign: "center", marginBottom: 28, fontSize: 15 }}>
              {isUk
                ? "Заповніть форму — ми зв'яжемось протягом 2 годин."
                : "Fill out the form — we'll reach out within 2 hours."}
            </p>
            {bookSent ? (
              <div
                style={{
                  background: "#FDFAF7",
                  borderRadius: 20,
                  padding: "40px 32px",
                  textAlign: "center",
                  border: "1px solid #FECDD3",
                }}
              >
                <div style={{ fontSize: 48, marginBottom: 16 }}>🌸</div>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: "#44201A", marginBottom: 10 }}>
                  {isUk ? "Дякуємо!" : "Thank you!"}
                </h3>
                <p style={{ color: "#9F6450", fontSize: 15 }}>
                  {isUk
                    ? "Ми отримали ваш запит і зв'яжемось з вами найближчим часом."
                    : "We've received your request and will contact you shortly."}
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setBookSent(true); }}
                style={{
                  background: "#FDFAF7",
                  borderRadius: 20,
                  padding: "32px 28px",
                  border: "1px solid #FECDD3",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                {[
                  { key: "partner1" as const, label: isUk ? "Ім'я партнера 1" : "Partner 1 name" },
                  { key: "partner2" as const, label: isUk ? "Ім'я партнера 2" : "Partner 2 name" },
                  { key: "phone" as const, label: isUk ? "Телефон" : "Phone" },
                  { key: "time" as const, label: isUk ? "Зручний час" : "Preferred time" },
                ].map((f) => (
                  <div key={f.key}>
                    <label style={{ display: "block", color: "#44201A", fontWeight: 600, marginBottom: 6, fontSize: 14 }}>
                      {f.label}
                    </label>
                    <input
                      value={bookForm[f.key]}
                      onChange={(e) => setBookForm({ ...bookForm, [f.key]: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: 12,
                        border: "1px solid #FECDD3",
                        fontSize: 15,
                        outline: "none",
                        background: "white",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                ))}
                <div>
                  <label style={{ display: "block", color: "#44201A", fontWeight: 600, marginBottom: 6, fontSize: 14 }}>
                    {isUk ? "З чим хочете попрацювати?" : "What would you like to work on?"}
                  </label>
                  <textarea
                    value={bookForm.concern}
                    onChange={(e) => setBookForm({ ...bookForm, concern: e.target.value })}
                    rows={3}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: 12,
                      border: "1px solid #FECDD3",
                      fontSize: 15,
                      outline: "none",
                      background: "white",
                      resize: "vertical",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    background: "#C2614A",
                    color: "white",
                    border: "none",
                    borderRadius: 40,
                    padding: "14px 0",
                    fontSize: 16,
                    fontWeight: 700,
                    cursor: "pointer",
                    marginTop: 4,
                  }}
                >
                  {isUk ? "Надіслати запит" : "Send Request"}
                </button>
                <p style={{ textAlign: "center", color: "#9CA3AF", fontSize: 13, margin: 0 }}>
                  {isUk ? "Конфіденційно. Без зобов'язань." : "Confidential. No obligations."}
                </p>
              </form>
            )}
          </div>
        )}
      </div>

      {/* Footer strip */}
      <div style={{ background: "#FDFAF7", borderTop: "1px solid #FECDD3", padding: "20px 24px", textAlign: "center" }}>
        <p style={{ color: "#C2614A", fontWeight: 700, fontSize: 16, margin: 0 }}>CoupleSpace</p>
        <p style={{ color: "#9CA3AF", fontSize: 13, marginTop: 4 }}>
          {isUk
            ? "Ліцензовані психотерапевти. Конфіденційно та безпечно."
            : "Licensed psychotherapists. Confidential and safe."}
        </p>
      </div>
    </div>
  );
}
