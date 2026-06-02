"use client";
import { useState } from "react";

export function LensLightDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [activeSection, setActiveSection] = useState<"hero" | "gallery" | "services" | "booking" | "about" | "faq">("hero");
  const [activeCategory, setActiveCategory] = useState(0);
  const [bookingStep, setBookingStep] = useState(0);
  const [sessionType, setSessionType] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [bookingDone, setBookingDone] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMsg, setContactMsg] = useState("");

  const categories = isUk
    ? ["Весілля", "Портрет", "Родина", "Editorial", "Комерція"]
    : ["Wedding", "Portrait", "Family", "Editorial", "Commercial"];

  const sessionTypes = isUk
    ? ["Весілля", "Портрет", "Родина", "Комерція"]
    : ["Wedding", "Portrait", "Family", "Commercial"];

  const galleryItems = [
    { label: isUk ? "Весілля Аніти та Олега" : "Anita & Oleh Wedding", ratio: "4/5" },
    { label: isUk ? "Портрет — Марія" : "Portrait — Maria", ratio: "1/1" },
    { label: isUk ? "Сім'я Ковальських" : "Kovalsky Family", ratio: "3/2" },
    { label: isUk ? "Весілля у Лавці" : "Lavka Wedding" , ratio: "2/3" },
    { label: isUk ? "Дитячий портрет" : "Child Portrait", ratio: "1/1" },
    { label: isUk ? "Комерція — Lume Brand" : "Commercial — Lume Brand", ratio: "16/9" },
  ];

  const services = [
    {
      title: isUk ? "Весільна зйомка" : "Wedding Shoot",
      subtitle: isUk ? "2 дні зйомки" : "2-day coverage",
      price: "5 800 UAH",
      includes: isUk
        ? ["Підготовка та виїзна реєстрація", "Повний день зйомки", "200+ оброблених фото", "Онлайн-галерея", "Друк 10 фото"]
        : ["Preparations & ceremony", "Full wedding day", "200+ edited photos", "Online gallery", "10 prints"],
    },
    {
      title: isUk ? "Портретна сесія" : "Portrait Session",
      subtitle: isUk ? "2 години" : "2 hours",
      price: "1 200 UAH",
      includes: isUk
        ? ["2 локації на вибір", "3 образи", "40 оброблених фото", "Онлайн-галерея"]
        : ["2 locations", "3 outfits", "40 edited photos", "Online gallery"],
    },
    {
      title: isUk ? "Родинна сесія" : "Family Session",
      subtitle: isUk ? "1.5 години" : "1.5 hours",
      price: "1 800 UAH",
      includes: isUk
        ? ["До 6 осіб", "2 локації", "50 оброблених фото", "Онлайн-галерея"]
        : ["Up to 6 people", "2 locations", "50 edited photos", "Online gallery"],
    },
    {
      title: isUk ? "Комерційна зйомка" : "Commercial Shoot",
      subtitle: isUk ? "1 день" : "1 day",
      price: "4 500 UAH",
      includes: isUk
        ? ["Студія або локація", "Стиліст за запитом", "100+ фото", "RAW-файли", "Ретуш"]
        : ["Studio or location", "Stylist on request", "100+ photos", "RAW files", "Retouching"],
    },
  ];

  const faqItems = [
    {
      q: isUk ? "Як зарезервувати дату?" : "How do I reserve a date?",
      a: isUk
        ? "Заповніть форму бронювання або напишіть у WhatsApp. Дата закріплюється після передоплати 30%."
        : "Fill in the booking form or message via WhatsApp. The date is confirmed after a 30% deposit.",
    },
    {
      q: isUk ? "Скільки фото я отримаю?" : "How many photos will I receive?",
      a: isUk
        ? "Кількість фото залежить від пакету. Всі фото — оброблені, без водяних знаків."
        : "The number depends on the package. All photos are edited and watermark-free.",
    },
    {
      q: isUk ? "Коли буде готова галерея?" : "When will the gallery be ready?",
      a: isUk
        ? "Стандартний термін — 2-3 тижні після зйомки. Термінова обробка — за домовленістю."
        : "Standard delivery is 2–3 weeks after the shoot. Rush editing available upon request.",
    },
    {
      q: isUk ? "Чи працюєте ви в інших містах?" : "Do you work in other cities?",
      a: isUk
        ? "Так, виїжджаємо по всій Україні. Витрати на відрядження обговорюються окремо."
        : "Yes, we travel across Ukraine. Travel costs are discussed separately.",
    },
    {
      q: isUk ? "Що якщо погода підведе?" : "What if the weather is bad?",
      a: isUk
        ? "Для зовнішніх зйомок завжди є запасна дата без додаткової оплати."
        : "For outdoor sessions, a backup date is always included at no extra cost.",
    },
  ];

  const availableDates = ["5", "7", "8", "12", "14", "19", "21", "22", "26", "28"];
  const allDays = Array.from({ length: 30 }, (_, i) => String(i + 1));

  const nav = [
    { id: "hero", label: isUk ? "Головна" : "Home" },
    { id: "gallery", label: isUk ? "Портфоліо" : "Portfolio" },
    { id: "services", label: isUk ? "Послуги" : "Services" },
    { id: "booking", label: isUk ? "Бронювання" : "Booking" },
    { id: "about", label: isUk ? "Про мене" : "About" },
    { id: "faq", label: "FAQ" },
  ] as const;

  return (
    <div style={{ background: "#000", color: "#fff", fontFamily: "'Helvetica Neue', sans-serif", minHeight: "100vh" }}>
      {/* NAV */}
      <nav style={{ borderBottom: "1px solid #1a1a1a", position: "sticky", top: 0, background: "#000", zIndex: 50 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
          <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: "0.08em" }}>LENS&LIGHT</span>
          <div style={{ display: "flex", gap: 24 }}>
            {nav.map((n) => (
              <button
                key={n.id}
                onClick={() => setActiveSection(n.id)}
                style={{
                  background: "none",
                  border: "none",
                  color: activeSection === n.id ? "#F59E0B" : "#888",
                  cursor: "pointer",
                  fontSize: 13,
                  letterSpacing: "0.05em",
                  padding: "4px 0",
                  borderBottom: activeSection === n.id ? "1px solid #F59E0B" : "1px solid transparent",
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
          <section style={{ minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: 80, paddingBottom: 80 }}>
            <p style={{ fontSize: 12, letterSpacing: "0.25em", color: "#555", marginBottom: 24 }}>
              {isUk ? "ФОТОГРАФ — КИЇВ" : "PHOTOGRAPHER — KYIV"}
            </p>
            <h1 style={{ fontSize: "clamp(40px, 7vw, 88px)", fontWeight: 300, lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: 32 }}>
              Olena<br />Kovalenko
            </h1>
            <p style={{ fontSize: "clamp(16px, 2.5vw, 26px)", color: "#666", fontWeight: 300, letterSpacing: "0.12em", marginBottom: 48 }}>
              Moments. Stories. Forever.
            </p>
            <div style={{ display: "flex", gap: 16 }}>
              <button
                onClick={() => setActiveSection("booking")}
                style={{ background: "#F59E0B", color: "#000", border: "none", padding: "14px 32px", fontSize: 14, fontWeight: 600, letterSpacing: "0.08em", cursor: "pointer" }}
              >
                {isUk ? "ЗАБРОНЮВАТИ СЕСІЮ" : "BOOK A SESSION"}
              </button>
              <button
                onClick={() => setActiveSection("gallery")}
                style={{ background: "none", color: "#fff", border: "1px solid #333", padding: "14px 32px", fontSize: 14, letterSpacing: "0.08em", cursor: "pointer" }}
              >
                {isUk ? "ПЕРЕГЛЯНУТИ РОБОТИ" : "VIEW PORTFOLIO"}
              </button>
            </div>
            <div style={{ marginTop: 80, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, maxWidth: 600 }}>
              {[
                { num: "340+", label: isUk ? "Весіль" : "Weddings" },
                { num: "1200+", label: isUk ? "Сесій" : "Sessions" },
                { num: "8", label: isUk ? "Років" : "Years" },
              ].map((s) => (
                <div key={s.label} style={{ borderLeft: "2px solid #F59E0B", paddingLeft: 16 }}>
                  <div style={{ fontSize: 28, fontWeight: 700 }}>{s.num}</div>
                  <div style={{ fontSize: 12, color: "#666", letterSpacing: "0.1em" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* GALLERY */}
        {activeSection === "gallery" && (
          <section style={{ paddingTop: 64, paddingBottom: 64 }}>
            <h2 style={{ fontSize: 36, fontWeight: 300, letterSpacing: "-0.02em", marginBottom: 40 }}>
              {isUk ? "Портфоліо" : "Portfolio"}
            </h2>
            <div style={{ display: "flex", gap: 8, marginBottom: 40, flexWrap: "wrap" }}>
              {categories.map((cat, i) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(i)}
                  style={{
                    background: activeCategory === i ? "#F59E0B" : "transparent",
                    color: activeCategory === i ? "#000" : "#888",
                    border: `1px solid ${activeCategory === i ? "#F59E0B" : "#333"}`,
                    padding: "8px 20px",
                    fontSize: 13,
                    letterSpacing: "0.05em",
                    cursor: "pointer",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 3 }}>
              {galleryItems.map((item, i) => {
                const heights = [280, 220, 180, 260, 200, 240];
                return (
                  <div
                    key={i}
                    style={{
                      background: `hsl(${i * 15}, 5%, ${8 + i * 2}%)`,
                      height: heights[i],
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      padding: 16,
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.85))" }} />
                    <div style={{ position: "relative" }}>
                      <div style={{ fontSize: 10, color: "#F59E0B", letterSpacing: "0.15em", marginBottom: 4 }}>
                        {categories[activeCategory]}
                      </div>
                      <div style={{ fontSize: 14, color: "#fff", fontWeight: 300 }}>{item.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* SERVICES */}
        {activeSection === "services" && (
          <section style={{ paddingTop: 64, paddingBottom: 64 }}>
            <h2 style={{ fontSize: 36, fontWeight: 300, letterSpacing: "-0.02em", marginBottom: 12 }}>
              {isUk ? "Послуги та ціни" : "Services & Pricing"}
            </h2>
            <p style={{ color: "#666", marginBottom: 48 }}>
              {isUk ? "Прозоре ціноутворення. Без прихованих доплат." : "Transparent pricing. No hidden fees."}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 2 }}>
              {services.map((svc) => (
                <div key={svc.title} style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", padding: 32 }}>
                  <div style={{ fontSize: 11, color: "#F59E0B", letterSpacing: "0.2em", marginBottom: 8 }}>{svc.subtitle}</div>
                  <h3 style={{ fontSize: 22, fontWeight: 400, marginBottom: 8 }}>{svc.title}</h3>
                  <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>{svc.price}</div>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {svc.includes.map((item) => (
                      <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8, color: "#aaa", fontSize: 14 }}>
                        <span style={{ color: "#F59E0B", marginTop: 2, flexShrink: 0 }}>—</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setActiveSection("booking")}
                    style={{ marginTop: 24, background: "none", color: "#F59E0B", border: "1px solid #F59E0B", padding: "10px 24px", fontSize: 13, letterSpacing: "0.08em", cursor: "pointer" }}
                  >
                    {isUk ? "ЗАБРОНЮВАТИ" : "BOOK NOW"}
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* BOOKING */}
        {activeSection === "booking" && (
          <section style={{ paddingTop: 64, paddingBottom: 64, maxWidth: 700 }}>
            <h2 style={{ fontSize: 36, fontWeight: 300, letterSpacing: "-0.02em", marginBottom: 8 }}>
              {isUk ? "Бронювання сесії" : "Book a Session"}
            </h2>
            <div style={{ display: "flex", gap: 0, marginBottom: 48, marginTop: 32 }}>
              {[1, 2, 3, 4].map((s) => (
                <div key={s} style={{ display: "flex", alignItems: "center" }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%",
                    background: bookingStep + 1 >= s ? "#F59E0B" : "#1a1a1a",
                    color: bookingStep + 1 >= s ? "#000" : "#555",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 13, fontWeight: 700,
                  }}>{s}</div>
                  {s < 4 && <div style={{ width: 48, height: 1, background: bookingStep + 1 > s ? "#F59E0B" : "#1a1a1a" }} />}
                </div>
              ))}
            </div>

            {bookingDone ? (
              <div style={{ textAlign: "center", padding: "64px 0" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
                <h3 style={{ fontSize: 24, fontWeight: 300, marginBottom: 12 }}>
                  {isUk ? "Запит надіслано!" : "Request Sent!"}
                </h3>
                <p style={{ color: "#888" }}>
                  {isUk ? "Зв'яжемося з вами протягом 2 годин" : "We'll contact you within 2 hours"}
                </p>
                <button
                  onClick={() => { setBookingDone(false); setBookingStep(0); setSessionType(""); setSelectedDate(""); setTimeSlot(""); setContactName(""); setContactPhone(""); setContactEmail(""); setContactMsg(""); }}
                  style={{ marginTop: 32, background: "none", color: "#F59E0B", border: "1px solid #F59E0B", padding: "10px 24px", fontSize: 13, cursor: "pointer" }}
                >
                  {isUk ? "Нове бронювання" : "New Booking"}
                </button>
              </div>
            ) : (
              <>
                {/* Step 1 */}
                {bookingStep === 0 && (
                  <div>
                    <h3 style={{ fontSize: 20, fontWeight: 300, marginBottom: 24 }}>
                      {isUk ? "Тип сесії" : "Session Type"}
                    </h3>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
                      {sessionTypes.map((t) => (
                        <button
                          key={t}
                          onClick={() => setSessionType(t)}
                          style={{
                            padding: "24px 16px",
                            background: sessionType === t ? "#F59E0B" : "#0a0a0a",
                            border: `1px solid ${sessionType === t ? "#F59E0B" : "#2a2a2a"}`,
                            color: sessionType === t ? "#000" : "#fff",
                            fontSize: 16, fontWeight: sessionType === t ? 600 : 300,
                            cursor: "pointer", textAlign: "left",
                          }}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => sessionType && setBookingStep(1)}
                      disabled={!sessionType}
                      style={{ marginTop: 32, background: sessionType ? "#F59E0B" : "#1a1a1a", color: sessionType ? "#000" : "#555", border: "none", padding: "14px 40px", fontSize: 14, fontWeight: 600, cursor: sessionType ? "pointer" : "default", letterSpacing: "0.08em" }}
                    >
                      {isUk ? "ДАЛІ" : "NEXT"}
                    </button>
                  </div>
                )}

                {/* Step 2 */}
                {bookingStep === 1 && (
                  <div>
                    <h3 style={{ fontSize: 20, fontWeight: 300, marginBottom: 8 }}>
                      {isUk ? "Оберіть дату — Квітень 2026" : "Select Date — April 2026"}
                    </h3>
                    <p style={{ fontSize: 12, color: "#555", marginBottom: 24, letterSpacing: "0.05em" }}>
                      {isUk ? "Виділені дати — доступні для бронювання" : "Highlighted dates are available"}
                    </p>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, maxWidth: 420 }}>
                      {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
                        <div key={d} style={{ textAlign: "center", fontSize: 11, color: "#555", padding: "4px 0" }}>{d}</div>
                      ))}
                      {allDays.map((day) => {
                        const avail = availableDates.includes(day);
                        return (
                          <button
                            key={day}
                            onClick={() => avail && setSelectedDate(day)}
                            style={{
                              padding: "8px 4px",
                              background: selectedDate === day ? "#F59E0B" : avail ? "#1a1a0a" : "transparent",
                              border: `1px solid ${selectedDate === day ? "#F59E0B" : avail ? "#3a3a1a" : "#111"}`,
                              color: selectedDate === day ? "#000" : avail ? "#F59E0B" : "#333",
                              fontSize: 13,
                              cursor: avail ? "pointer" : "default",
                              fontWeight: avail ? 600 : 400,
                            }}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                    <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
                      <button onClick={() => setBookingStep(0)} style={{ background: "none", color: "#888", border: "1px solid #333", padding: "12px 24px", fontSize: 13, cursor: "pointer" }}>
                        {isUk ? "НАЗАД" : "BACK"}
                      </button>
                      <button
                        onClick={() => selectedDate && setBookingStep(2)}
                        disabled={!selectedDate}
                        style={{ background: selectedDate ? "#F59E0B" : "#1a1a1a", color: selectedDate ? "#000" : "#555", border: "none", padding: "12px 40px", fontSize: 14, fontWeight: 600, cursor: selectedDate ? "pointer" : "default", letterSpacing: "0.08em" }}
                      >
                        {isUk ? "ДАЛІ" : "NEXT"}
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3 */}
                {bookingStep === 2 && (
                  <div>
                    <h3 style={{ fontSize: 20, fontWeight: 300, marginBottom: 24 }}>
                      {isUk ? "Час зйомки" : "Session Time"}
                    </h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 360 }}>
                      {[
                        { id: "morning", label: isUk ? "Ранок — 10:00" : "Morning — 10:00", sub: isUk ? "м'яке природне світло" : "soft natural light" },
                        { id: "afternoon", label: isUk ? "День — 13:00" : "Afternoon — 13:00", sub: isUk ? "яскраве денне світло" : "bright daylight" },
                        { id: "evening", label: isUk ? "Вечір — 16:00" : "Evening — 16:00", sub: isUk ? "золота година" : "golden hour" },
                      ].map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setTimeSlot(t.id)}
                          style={{
                            padding: "20px 24px",
                            background: timeSlot === t.id ? "#F59E0B" : "#0a0a0a",
                            border: `1px solid ${timeSlot === t.id ? "#F59E0B" : "#2a2a2a"}`,
                            color: timeSlot === t.id ? "#000" : "#fff",
                            cursor: "pointer", textAlign: "left",
                          }}
                        >
                          <div style={{ fontSize: 16, fontWeight: timeSlot === t.id ? 600 : 400 }}>{t.label}</div>
                          <div style={{ fontSize: 12, color: timeSlot === t.id ? "#000" : "#666", marginTop: 4 }}>{t.sub}</div>
                        </button>
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
                      <button onClick={() => setBookingStep(1)} style={{ background: "none", color: "#888", border: "1px solid #333", padding: "12px 24px", fontSize: 13, cursor: "pointer" }}>
                        {isUk ? "НАЗАД" : "BACK"}
                      </button>
                      <button
                        onClick={() => timeSlot && setBookingStep(3)}
                        disabled={!timeSlot}
                        style={{ background: timeSlot ? "#F59E0B" : "#1a1a1a", color: timeSlot ? "#000" : "#555", border: "none", padding: "12px 40px", fontSize: 14, fontWeight: 600, cursor: timeSlot ? "pointer" : "default", letterSpacing: "0.08em" }}
                      >
                        {isUk ? "ДАЛІ" : "NEXT"}
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 4 */}
                {bookingStep === 3 && (
                  <div>
                    <h3 style={{ fontSize: 20, fontWeight: 300, marginBottom: 8 }}>
                      {isUk ? "Контактні дані" : "Contact Details"}
                    </h3>
                    <div style={{ display: "grid", gap: 4, fontSize: 12, color: "#555", marginBottom: 24 }}>
                      <span>{isUk ? "Тип:" : "Type:"} <span style={{ color: "#F59E0B" }}>{sessionType}</span></span>
                      <span>{isUk ? "Дата: 0" : "Date: "}4.{selectedDate}.2026 — {timeSlot === "morning" ? "10:00" : timeSlot === "afternoon" ? "13:00" : "16:00"}</span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                      {[
                        { label: isUk ? "Ваше ім'я" : "Your Name", val: contactName, set: setContactName, type: "text" },
                        { label: isUk ? "Телефон" : "Phone", val: contactPhone, set: setContactPhone, type: "tel" },
                        { label: "Email", val: contactEmail, set: setContactEmail, type: "email" },
                      ].map((f) => (
                        <div key={f.label}>
                          <label style={{ fontSize: 12, color: "#666", letterSpacing: "0.08em", display: "block", marginBottom: 6 }}>{f.label}</label>
                          <input
                            type={f.type}
                            value={f.val}
                            onChange={(e) => f.set(e.target.value)}
                            style={{ width: "100%", background: "#0a0a0a", border: "1px solid #2a2a2a", color: "#fff", padding: "12px 16px", fontSize: 15, outline: "none", boxSizing: "border-box" }}
                          />
                        </div>
                      ))}
                      <div>
                        <label style={{ fontSize: 12, color: "#666", letterSpacing: "0.08em", display: "block", marginBottom: 6 }}>
                          {isUk ? "Побажання" : "Message"}
                        </label>
                        <textarea
                          value={contactMsg}
                          onChange={(e) => setContactMsg(e.target.value)}
                          rows={4}
                          style={{ width: "100%", background: "#0a0a0a", border: "1px solid #2a2a2a", color: "#fff", padding: "12px 16px", fontSize: 15, outline: "none", resize: "vertical", boxSizing: "border-box" }}
                        />
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
                      <button onClick={() => setBookingStep(2)} style={{ background: "none", color: "#888", border: "1px solid #333", padding: "12px 24px", fontSize: 13, cursor: "pointer" }}>
                        {isUk ? "НАЗАД" : "BACK"}
                      </button>
                      <button
                        onClick={() => setBookingDone(true)}
                        style={{ background: "#F59E0B", color: "#000", border: "none", padding: "14px 40px", fontSize: 14, fontWeight: 700, cursor: "pointer", letterSpacing: "0.08em" }}
                      >
                        {isUk ? "ЗАБРОНЮВАТИ СЕСІЮ" : "BOOK SESSION"}
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </section>
        )}

        {/* ABOUT */}
        {activeSection === "about" && (
          <section style={{ paddingTop: 64, paddingBottom: 64 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>
              <div style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", aspectRatio: "3/4", display: "flex", alignItems: "flex-end", padding: 24 }}>
                <div>
                  <div style={{ fontSize: 11, color: "#F59E0B", letterSpacing: "0.2em", marginBottom: 8 }}>PHOTOGRAPHER</div>
                  <div style={{ fontSize: 20, fontWeight: 300 }}>Olena Kovalenko</div>
                </div>
              </div>
              <div>
                <h2 style={{ fontSize: 36, fontWeight: 300, letterSpacing: "-0.02em", marginBottom: 24 }}>
                  {isUk ? "Про мене" : "About Me"}
                </h2>
                <p style={{ color: "#888", lineHeight: 1.8, marginBottom: 20, fontSize: 15 }}>
                  {isUk
                    ? "Я — весільний і портретний фотограф із Києва. 8 років я допомагаю парам та родинам зберігати найцінніші моменти. Мій стиль — жива, природна фотографія без надмірних фільтрів."
                    : "I am a wedding and portrait photographer from Kyiv. For 8 years I have helped couples and families preserve their most precious moments. My style is live, natural photography without excessive filters."}
                </p>
                <p style={{ color: "#888", lineHeight: 1.8, marginBottom: 32, fontSize: 15 }}>
                  {isUk
                    ? "Кожна сесія для мене — це не просто робота, а співпраця. Я завжди знаходжу час, щоб познайомитись з клієнтом і зрозуміти, що для нього важливо."
                    : "Every session for me is not just work, but a collaboration. I always take time to get to know each client and understand what matters to them."}
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
                  {[
                    { n: "340+", l: isUk ? "Весіль" : "Weddings" },
                    { n: "1200+", l: isUk ? "Сесій" : "Sessions" },
                    { n: "98%", l: isUk ? "Задоволені клієнти" : "Satisfied clients" },
                  ].map((s) => (
                    <div key={s.l} style={{ borderTop: "1px solid #1a1a1a", paddingTop: 16 }}>
                      <div style={{ fontSize: 24, fontWeight: 700, color: "#F59E0B" }}>{s.n}</div>
                      <div style={{ fontSize: 12, color: "#666" }}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        {activeSection === "faq" && (
          <section style={{ paddingTop: 64, paddingBottom: 64, maxWidth: 720 }}>
            <h2 style={{ fontSize: 36, fontWeight: 300, letterSpacing: "-0.02em", marginBottom: 48 }}>FAQ</h2>
            {faqItems.map((item, i) => (
              <div key={i} style={{ borderBottom: "1px solid #1a1a1a" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: "100%", background: "none", border: "none", color: "#fff", padding: "20px 0", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", textAlign: "left" }}
                >
                  <span style={{ fontSize: 16, fontWeight: 300 }}>{item.q}</span>
                  <span style={{ color: "#F59E0B", fontSize: 20, flexShrink: 0, marginLeft: 16 }}>{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <div style={{ paddingBottom: 20, color: "#888", fontSize: 15, lineHeight: 1.8 }}>{item.a}</div>
                )}
              </div>
            ))}
          </section>
        )}

      </div>
    </div>
  );
}
