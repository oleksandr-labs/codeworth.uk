"use client";
import { useState } from "react";

export function LittleMomentsDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [activeSection, setActiveSection] = useState<"hero" | "milestones" | "gallery" | "guide" | "testimonials" | "booking">("hero");
  const [activeMilestone, setActiveMilestone] = useState(0);
  const [openTip, setOpenTip] = useState<number | null>(null);
  const [bookingName, setBookingName] = useState("");
  const [bookingAge, setBookingAge] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingDates, setBookingDates] = useState("");
  const [bookingSession, setBookingSession] = useState("");
  const [bookingDone, setBookingDone] = useState(false);

  const pastelBg = ["#FDDDE6", "#D1FAE5", "#FEFCE8", "#FEF3C7", "#E0E7FF", "#FCE7F3"];
  const pastelText = ["#9F1239", "#065F46", "#92400E", "#78350F", "#3730A3", "#86198F"];

  const milestones = [
    {
      emoji: "🍼",
      title: isUk ? "Новонароджений" : "Newborn",
      subtitle: isUk ? "перші 14 днів" : "first 14 days",
      price: "3 200 UAH",
      duration: isUk ? "2 години" : "2 hours",
      photos: 40,
      description: isUk
        ? "Перші дні — найніжніші та найцінніші. Ми створюємо теплі, художні знімки вашого малюка у безпечних позах із лялечковими реквізитами."
        : "The first days are the most tender and precious. We create warm, artistic shots of your baby in safe poses with beautiful newborn props.",
      includes: isUk
        ? ["Студія + реквізит включено", "Безпечні новонароджені пози", "Різні кольорові фони", "40 оброблених фото", "Онлайн-галерея 6 місяців"]
        : ["Studio + props included", "Safe newborn poses", "Various colour backdrops", "40 edited photos", "Online gallery 6 months"],
    },
    {
      emoji: "👶",
      title: isUk ? "3 місяці" : "Baby 3 months",
      subtitle: isUk ? "перші посмішки" : "first smiles",
      price: "2 400 UAH",
      duration: isUk ? "1.5 години" : "1.5 hours",
      photos: 30,
      description: isUk
        ? "Малюк уже посміхається! Цей вік такий короткий. Знімаємо в студії або на природі — як вам до вподоби."
        : "Baby smiles already! This age is so fleeting. We shoot in the studio or outdoors — whichever you prefer.",
      includes: isUk
        ? ["Студія або натура", "Реквізит включено", "30 оброблених фото", "Онлайн-галерея"]
        : ["Studio or outdoor", "Props included", "30 edited photos", "Online gallery"],
    },
    {
      emoji: "🌿",
      title: isUk ? "6 місяців" : "Baby 6 months",
      subtitle: isUk ? "сидить і розвивається" : "sitting & discovering",
      price: "2 400 UAH",
      duration: isUk ? "1.5 години" : "1.5 hours",
      photos: 30,
      description: isUk
        ? "Малюк вже сидить і активно пізнає світ. Яскравий, грайливий настрій і справжні емоції."
        : "Baby sits and explores the world. Bright, playful mood and genuine emotions.",
      includes: isUk
        ? ["Студія або природа", "Ігровий реквізит", "30 оброблених фото", "Онлайн-галерея"]
        : ["Studio or nature", "Play props", "30 edited photos", "Online gallery"],
    },
    {
      emoji: "🎂",
      title: isUk ? "1 рік / Cake Smash" : "1 Year / Cake Smash",
      subtitle: isUk ? "перший день народження" : "first birthday",
      price: "2 800 UAH",
      duration: isUk ? "2 години" : "2 hours",
      photos: 40,
      description: isUk
        ? "Перший день народження — особлива подія! Торт, декор, мильні бульбашки та щирий сміх. Все включено."
        : "First birthday is a special event! Cake, decor, bubbles and genuine laughter. Everything included.",
      includes: isUk
        ? ["Торт + декор включено", "2 образи", "40 оброблених фото", "Онлайн-галерея", "Оцифрування відео до 1 хв"]
        : ["Cake + decor included", "2 outfits", "40 edited photos", "Online gallery", "1 min video clip"],
    },
    {
      emoji: "👨‍👩‍👧",
      title: isUk ? "Родинна сесія" : "Family Session",
      subtitle: isUk ? "до 6 осіб" : "up to 6 people",
      price: "3 000 UAH",
      duration: isUk ? "2 години" : "2 hours",
      photos: 50,
      description: isUk
        ? "Вся сім'я разом — найкраща картина. Студія або вулиця, легка атмосфера та щирі моменти."
        : "The whole family together — the best picture. Studio or outdoor, easy atmosphere and genuine moments.",
      includes: isUk
        ? ["До 6 осіб", "Студія або вулиця", "50 оброблених фото", "Онлайн-галерея", "Родинний портрет у подарунок"]
        : ["Up to 6 people", "Studio or outdoor", "50 edited photos", "Online gallery", "Family portrait gift print"],
    },
    {
      emoji: "🤰",
      title: isUk ? "Вагітність" : "Maternity",
      subtitle: isUk ? "очікування дива" : "awaiting a miracle",
      price: "2 200 UAH",
      duration: isUk ? "1.5 години" : "1.5 hours",
      photos: 30,
      description: isUk
        ? "Вагітність — особливий час краси та очікування. Ніжна, художня зйомка з живою квітковою композицією."
        : "Pregnancy is a special time of beauty and anticipation. Tender, artistic shoot with fresh floral arrangements.",
      includes: isUk
        ? ["Студія + квіти включено", "2 образи", "30 оброблених фото", "Онлайн-галерея"]
        : ["Studio + florals included", "2 outfits", "30 edited photos", "Online gallery"],
    },
  ];

  const galleryCards = [
    { name: isUk ? "Аріна, 8 днів" : "Baby Arina, 8 days", bg: "#FDDDE6", text: "#9F1239" },
    { name: isUk ? "Родина Ковальських" : "Kovalsky Family", bg: "#D1FAE5", text: "#065F46" },
    { name: isUk ? "Cake Smash — День народження Льоші" : "Cake Smash — Liosha Birthday", bg: "#FEF3C7", text: "#78350F" },
    { name: isUk ? "Нікіта, 3 місяці" : "Nikita, 3 months", bg: "#FEFCE8", text: "#92400E" },
    { name: isUk ? "Вагітність Аліни" : "Alina Maternity", bg: "#FCE7F3", text: "#86198F" },
    { name: isUk ? "Соня, 6 місяців" : "Sonya, 6 months", bg: "#E0E7FF", text: "#3730A3" },
    { name: isUk ? "Маленький Олег, 10 днів" : "Baby Oleg, 10 days", bg: "#FEE2E2", text: "#991B1B" },
    { name: isUk ? "Родина Лисенків — весна" : "Lysenko Family — spring", bg: "#ECFDF5", text: "#064E3B" },
  ];

  const tips = [
    {
      title: isUk ? "Температура кімнати" : "Room temperature",
      text: isUk
        ? "Малюку має бути тепло і комфортно. Ми підтримуємо температуру близько 26°C у студії протягом зйомки."
        : "Baby should be warm and comfortable. We maintain around 26°C in the studio during the session.",
    },
    {
      title: isUk ? "Годування перед зйомкою" : "Feed before the session",
      text: isUk
        ? "Нагодуйте малюка прямо перед від'їздом. Ситий і сонний малюк — ідеальна модель."
        : "Feed the baby right before leaving home. A full and sleepy baby is the perfect model.",
    },
    {
      title: isUk ? "Відсутність лаку на нігтях" : "No nail polish",
      text: isUk
        ? "Для більш природних і ніжних фотографій просимо не фарбувати нігті мами напередодні зйомки."
        : "For more natural and tender photos, please avoid nail polish for mum on the day of the shoot.",
    },
    {
      title: isUk ? "Одяг нейтральних кольорів" : "Neutral-coloured clothing",
      text: isUk
        ? "Оберіть пастельні або нейтральні кольори для одягу всієї родини. Це підкреслить красу малюка."
        : "Choose pastel or neutral colours for the whole family. This lets baby's beauty shine through.",
    },
    {
      title: isUk ? "Зберіть речі малюка" : "Bring baby essentials",
      text: isUk
        ? "Пелюшки, пустушка, улюблена іграшка — все, що заспокоює малюка. Краще взяти зайве, ніж не вистачить."
        : "Nappies, dummy, favourite toy — anything that soothes baby. Better to pack more than run short.",
    },
  ];

  const testimonials = [
    {
      name: "Оксана Мельник",
      text: isUk
        ? "Зйомка новонародженої Аріни перевершила всі очікування. Фотограф була такою ніжною і терплячою. Ми плакали від щастя, коли побачили готові фото!"
        : "The newborn session for baby Arina exceeded all our expectations. The photographer was so gentle and patient. We cried with joy when we saw the finished photos!",
      session: isUk ? "Новонароджений, 12 днів" : "Newborn, 12 days",
    },
    {
      name: "Роман і Юля Коваль",
      text: isUk
        ? "Cake Smash для Даніела вийшов приголомшливим! Торт, декор, бульбашки — все було продумано до деталей. Рекомендуємо всім батькам!"
        : "The Cake Smash for Daniel turned out stunning! The cake, decor, bubbles — everything was thought through to the last detail. We recommend it to all parents!",
      session: isUk ? "Cake Smash, 1 рік" : "Cake Smash, 1 year",
    },
    {
      name: "Катерина Лисенко",
      text: isUk
        ? "Родинна сесія стала нашою традицією. Вже третій рік поспіль приходимо і кожного разу отримуємо неймовірні фотографії та емоції."
        : "The family session has become our tradition. Third year in a row and every time we get incredible photos and emotions.",
      session: isUk ? "Родинна сесія" : "Family Session",
    },
  ];

  const nav = [
    { id: "hero", label: isUk ? "Головна" : "Home" },
    { id: "milestones", label: isUk ? "Пакети" : "Packages" },
    { id: "gallery", label: isUk ? "Галерея" : "Gallery" },
    { id: "guide", label: isUk ? "Підготовка" : "Preparation" },
    { id: "testimonials", label: isUk ? "Відгуки" : "Reviews" },
    { id: "booking", label: isUk ? "Бронювання" : "Booking" },
  ] as const;

  return (
    <div style={{ background: "#FFFAF9", color: "#3D2B1F", fontFamily: "'Georgia', serif", minHeight: "100vh" }}>
      {/* NAV */}
      <nav style={{ background: "#FDDDE6", borderBottom: "1px solid #F9C8D9", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: "#9F1239", fontStyle: "italic" }}>Little Moments</span>
          <div style={{ display: "flex", gap: 20 }}>
            {nav.map((n) => (
              <button
                key={n.id}
                onClick={() => setActiveSection(n.id)}
                style={{
                  background: "none",
                  border: "none",
                  color: activeSection === n.id ? "#9F1239" : "#C47A8A",
                  cursor: "pointer",
                  fontSize: 13,
                  fontStyle: "italic",
                  borderBottom: activeSection === n.id ? "1px solid #9F1239" : "1px solid transparent",
                  padding: "4px 0",
                }}
              >
                {n.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>

        {/* HERO */}
        {activeSection === "hero" && (
          <section style={{ paddingTop: 64, paddingBottom: 80 }}>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <p style={{ fontSize: 13, letterSpacing: "0.2em", color: "#C47A8A", marginBottom: 16 }}>
                {isUk ? "НІЖНА ФОТОГРАФІЯ НОВОНАРОДЖЕНИХ І РОДИНИ" : "TENDER NEWBORN & FAMILY PHOTOGRAPHY"}
              </p>
              <h1 style={{ fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 400, fontStyle: "italic", color: "#9F1239", lineHeight: 1.1, marginBottom: 20 }}>
                {isUk ? "Маленькі моменти,\nвеликі спогади" : "Little moments,\nbig memories"}
              </h1>
              <p style={{ fontSize: 18, color: "#7D5A50", maxWidth: 520, margin: "0 auto 40px" }}>
                {isUk
                  ? "Ми зберігаємо найперші і найніжніші миттєвості вашого малюка з любов'ю та мистецтвом."
                  : "We preserve the very first and most tender moments of your baby with love and artistry."}
              </p>
              <button
                onClick={() => setActiveSection("booking")}
                style={{ background: "#F472B6", color: "#fff", border: "none", padding: "16px 40px", fontSize: 15, fontStyle: "italic", cursor: "pointer", borderRadius: 2 }}
              >
                {isUk ? "Забронювати сесію" : "Book a Session"}
              </button>
            </div>

            {/* Overlapping cards */}
            <div style={{ display: "flex", justifyContent: "center", gap: 0, position: "relative", height: 280 }}>
              {[
                { bg: "#FDDDE6", text: isUk ? "Новонароджений Арсеній, 7 днів" : "Newborn Arseniy, 7 days", rot: "-6deg", left: "calc(50% - 260px)", zIndex: 1 },
                { bg: "#D1FAE5", text: isUk ? "Cake Smash — 1 рік" : "Cake Smash — 1 year", rot: "0deg", left: "calc(50% - 120px)", zIndex: 3 },
                { bg: "#FEF3C7", text: isUk ? "Родина Мельник — весна" : "Melnyk Family — spring", rot: "5deg", left: "calc(50% + 20px)", zIndex: 2 },
              ].map((card, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: card.left,
                    top: 0,
                    width: 200,
                    height: 260,
                    background: card.bg,
                    borderRadius: 4,
                    transform: `rotate(${card.rot})`,
                    zIndex: card.zIndex,
                    display: "flex",
                    alignItems: "flex-end",
                    padding: 16,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                  }}
                >
                  <p style={{ fontSize: 13, color: "#5A3040", fontStyle: "italic", lineHeight: 1.4 }}>{card.text}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* MILESTONES */}
        {activeSection === "milestones" && (
          <section style={{ paddingTop: 64, paddingBottom: 64 }}>
            <h2 style={{ fontSize: 36, fontWeight: 400, fontStyle: "italic", color: "#9F1239", marginBottom: 8 }}>
              {isUk ? "Пакети для кожного моменту" : "Packages for Every Milestone"}
            </h2>
            <p style={{ color: "#7D5A50", marginBottom: 40 }}>
              {isUk ? "Оберіть вік і дізнайтесь деталі" : "Select an age and explore the details"}
            </p>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40 }}>
              {milestones.map((m, i) => (
                <button
                  key={i}
                  onClick={() => setActiveMilestone(i)}
                  style={{
                    padding: "10px 18px",
                    background: activeMilestone === i ? pastelBg[i] : "transparent",
                    border: `2px solid ${activeMilestone === i ? pastelText[i] : "#E8C5D0"}`,
                    color: activeMilestone === i ? pastelText[i] : "#7D5A50",
                    borderRadius: 24,
                    fontSize: 14,
                    cursor: "pointer",
                    fontStyle: "italic",
                    fontWeight: activeMilestone === i ? 700 : 400,
                  }}
                >
                  {m.emoji} {m.title}
                </button>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
              <div style={{ background: pastelBg[activeMilestone], borderRadius: 8, padding: 40, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>{milestones[activeMilestone].emoji}</div>
                  <h3 style={{ fontSize: 28, fontWeight: 400, fontStyle: "italic", color: pastelText[activeMilestone], marginBottom: 4 }}>
                    {milestones[activeMilestone].title}
                  </h3>
                  <p style={{ fontSize: 14, color: pastelText[activeMilestone], opacity: 0.7, marginBottom: 20 }}>
                    {milestones[activeMilestone].subtitle}
                  </p>
                  <p style={{ color: "#5A3040", lineHeight: 1.8, fontSize: 15 }}>
                    {milestones[activeMilestone].description}
                  </p>
                </div>
                <div style={{ marginTop: 32 }}>
                  <div style={{ fontSize: 36, fontWeight: 700, color: pastelText[activeMilestone] }}>
                    {milestones[activeMilestone].price}
                  </div>
                  <div style={{ fontSize: 13, color: "#7D5A50", marginTop: 4 }}>
                    {milestones[activeMilestone].duration} · {milestones[activeMilestone].photos} {isUk ? "фото" : "photos"}
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div style={{ background: "#fff", borderRadius: 8, padding: 28, border: "1px solid #F9C8D9" }}>
                  <h4 style={{ fontSize: 16, color: "#9F1239", fontStyle: "italic", marginBottom: 16 }}>
                    {isUk ? "Що включено:" : "What is included:"}
                  </h4>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {milestones[activeMilestone].includes.map((item) => (
                      <li key={item} style={{ display: "flex", gap: 10, marginBottom: 12, color: "#5A3040", fontSize: 14 }}>
                        <span style={{ color: "#F472B6", flexShrink: 0, marginTop: 2 }}>✿</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() => setActiveSection("booking")}
                  style={{ background: "#F472B6", color: "#fff", border: "none", padding: "16px", fontSize: 15, cursor: "pointer", borderRadius: 4, fontStyle: "italic" }}
                >
                  {isUk ? "Забронювати цю сесію" : "Book this session"}
                </button>
                <div style={{ background: "#FEF3C7", borderRadius: 8, padding: 20, border: "1px solid #FDE68A", textAlign: "center" }}>
                  <div style={{ fontSize: 14, color: "#78350F", fontWeight: 700, marginBottom: 4 }}>
                    {isUk ? "Усі 5 milestone-пакети — знижка 25%" : "All 5 milestone bundle — save 25%"}
                  </div>
                  <div style={{ fontSize: 12, color: "#92400E" }}>
                    {isUk ? "Збережіть кожен важливий момент першого року" : "Save every important moment of the first year"}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* GALLERY */}
        {activeSection === "gallery" && (
          <section style={{ paddingTop: 64, paddingBottom: 64 }}>
            <h2 style={{ fontSize: 36, fontWeight: 400, fontStyle: "italic", color: "#9F1239", marginBottom: 8 }}>
              {isUk ? "Наші роботи" : "Our Work"}
            </h2>
            <p style={{ color: "#7D5A50", marginBottom: 40 }}>
              {isUk ? "Кожна дитина — окремий всесвіт" : "Every child is a universe of their own"}
            </p>
            <div style={{ columns: 3, columnGap: 12 }}>
              {galleryCards.map((card, i) => {
                const heights = [200, 260, 180, 300, 220, 180, 240, 200];
                return (
                  <div
                    key={i}
                    style={{
                      background: card.bg,
                      height: heights[i],
                      marginBottom: 12,
                      breakInside: "avoid",
                      borderRadius: 6,
                      padding: 16,
                      display: "flex",
                      alignItems: "flex-end",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <div style={{ position: "absolute", top: 12, right: 12, fontSize: 20 }}>
                      {["🌸", "🌿", "🎂", "🌼", "💐", "🦋", "⭐", "🌱"][i]}
                    </div>
                    <p style={{ fontSize: 13, color: card.text, fontStyle: "italic", lineHeight: 1.4 }}>{card.name}</p>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* GUIDE */}
        {activeSection === "guide" && (
          <section style={{ paddingTop: 64, paddingBottom: 64, maxWidth: 720 }}>
            <h2 style={{ fontSize: 36, fontWeight: 400, fontStyle: "italic", color: "#9F1239", marginBottom: 8 }}>
              {isUk ? "Як підготуватись до зйомки" : "How to Prepare for the Session"}
            </h2>
            <p style={{ color: "#7D5A50", marginBottom: 48 }}>
              {isUk ? "5 порад для ідеального результату" : "5 tips for a perfect result"}
            </p>
            {tips.map((tip, i) => (
              <div key={i} style={{ marginBottom: 12, borderRadius: 8, overflow: "hidden" }}>
                <button
                  onClick={() => setOpenTip(openTip === i ? null : i)}
                  style={{
                    width: "100%",
                    background: pastelBg[i],
                    border: "none",
                    padding: "20px 24px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                    <span style={{ fontSize: 20, color: pastelText[i], fontWeight: 700, minWidth: 28 }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span style={{ fontSize: 16, color: pastelText[i], fontStyle: "italic" }}>{tip.title}</span>
                  </div>
                  <span style={{ color: pastelText[i], fontSize: 18 }}>{openTip === i ? "↑" : "↓"}</span>
                </button>
                {openTip === i && (
                  <div style={{ background: "#fff", padding: "20px 24px 20px 68px", borderLeft: `3px solid ${pastelBg[i]}`, color: "#5A3040", fontSize: 15, lineHeight: 1.8 }}>
                    {tip.text}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {/* TESTIMONIALS */}
        {activeSection === "testimonials" && (
          <section style={{ paddingTop: 64, paddingBottom: 64 }}>
            <h2 style={{ fontSize: 36, fontWeight: 400, fontStyle: "italic", color: "#9F1239", marginBottom: 48 }}>
              {isUk ? "Відгуки батьків" : "Parent Reviews"}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
              {testimonials.map((t, i) => (
                <div key={i} style={{ background: pastelBg[i], borderRadius: 12, padding: 32 }}>
                  <div style={{ fontSize: 32, marginBottom: 16 }}>{"★★★★★"}</div>
                  <p style={{ fontSize: 15, color: "#5A3040", lineHeight: 1.8, fontStyle: "italic", marginBottom: 24 }}>
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: pastelText[i] }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: "#7D5A50", marginTop: 4 }}>{t.session}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* BOOKING */}
        {activeSection === "booking" && (
          <section style={{ paddingTop: 64, paddingBottom: 64, maxWidth: 600 }}>
            <h2 style={{ fontSize: 36, fontWeight: 400, fontStyle: "italic", color: "#9F1239", marginBottom: 8 }}>
              {isUk ? "Забронювати сесію" : "Book a Session"}
            </h2>
            <p style={{ color: "#7D5A50", marginBottom: 40 }}>
              {isUk ? "Залиште контакти — ми зв'яжемося протягом кількох годин" : "Leave your details — we will be in touch within a few hours"}
            </p>

            {bookingDone ? (
              <div style={{ textAlign: "center", padding: "48px", background: "#FDDDE6", borderRadius: 12 }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🌸</div>
                <h3 style={{ fontSize: 24, fontStyle: "italic", color: "#9F1239", marginBottom: 12 }}>
                  {isUk ? "Дякуємо!" : "Thank you!"}
                </h3>
                <p style={{ color: "#7D5A50" }}>
                  {isUk ? "Ми зв'яжемося з вами дуже скоро" : "We will be in touch very soon"}
                </p>
                <button
                  onClick={() => { setBookingDone(false); setBookingName(""); setBookingAge(""); setBookingPhone(""); setBookingDates(""); setBookingSession(""); }}
                  style={{ marginTop: 24, background: "#F472B6", color: "#fff", border: "none", padding: "12px 28px", fontSize: 14, cursor: "pointer", borderRadius: 4, fontStyle: "italic" }}
                >
                  {isUk ? "Нове бронювання" : "New booking"}
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {[
                  { label: isUk ? "Ваше ім'я" : "Your name", val: bookingName, set: setBookingName, type: "text" },
                  { label: isUk ? "Вік малюка" : "Baby age", val: bookingAge, set: setBookingAge, type: "text" },
                  { label: isUk ? "Телефон" : "Phone number", val: bookingPhone, set: setBookingPhone, type: "tel" },
                  { label: isUk ? "Бажані дати" : "Preferred dates", val: bookingDates, set: setBookingDates, type: "text" },
                ].map((f) => (
                  <div key={f.label}>
                    <label style={{ fontSize: 13, color: "#9F1239", fontStyle: "italic", display: "block", marginBottom: 6 }}>{f.label}</label>
                    <input
                      type={f.type}
                      value={f.val}
                      onChange={(e) => f.set(e.target.value)}
                      style={{ width: "100%", background: "#fff", border: "1px solid #F9C8D9", color: "#3D2B1F", padding: "12px 16px", fontSize: 15, outline: "none", borderRadius: 4, boxSizing: "border-box" }}
                    />
                  </div>
                ))}
                <div>
                  <label style={{ fontSize: 13, color: "#9F1239", fontStyle: "italic", display: "block", marginBottom: 6 }}>
                    {isUk ? "Тип сесії" : "Session type"}
                  </label>
                  <select
                    value={bookingSession}
                    onChange={(e) => setBookingSession(e.target.value)}
                    style={{ width: "100%", background: "#fff", border: "1px solid #F9C8D9", color: "#3D2B1F", padding: "12px 16px", fontSize: 15, outline: "none", borderRadius: 4, boxSizing: "border-box" }}
                  >
                    <option value="">{isUk ? "Оберіть..." : "Select..."}</option>
                    {milestones.map((m) => (
                      <option key={m.title} value={m.title}>{m.emoji} {m.title}</option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={() => setBookingDone(true)}
                  style={{ background: "#F472B6", color: "#fff", border: "none", padding: "16px", fontSize: 16, cursor: "pointer", borderRadius: 4, fontStyle: "italic", marginTop: 8 }}
                >
                  {isUk ? "Надіслати запит" : "Send Request"}
                </button>
              </div>
            )}
          </section>
        )}

      </div>
    </div>
  );
}
