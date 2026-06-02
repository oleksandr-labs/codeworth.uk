"use client";
import { useState } from "react";

const BLOCKS = ["A", "B", "C"] as const;
type Block = (typeof BLOCKS)[number];
type AptType = "Studio" | "1BR" | "2BR" | "3BR";
type AptStatus = "free" | "reserved" | "sold";

interface Apartment {
  num: string;
  area: number;
  price: number;
  status: AptStatus;
}

const APT_DATA: Record<AptType, Apartment[]> = {
  Studio: [
    { num: "1A", area: 32, price: 1_280_000, status: "free" },
    { num: "1B", area: 34, price: 1_360_000, status: "free" },
    { num: "1C", area: 31, price: 1_240_000, status: "reserved" },
  ],
  "1BR": [
    { num: "2A", area: 48, price: 1_920_000, status: "free" },
    { num: "2B", area: 51, price: 2_040_000, status: "sold" },
    { num: "2C", area: 46, price: 1_840_000, status: "free" },
    { num: "2D", area: 53, price: 2_120_000, status: "reserved" },
  ],
  "2BR": [
    { num: "3A", area: 72, price: 2_880_000, status: "free" },
    { num: "3B", area: 78, price: 3_120_000, status: "free" },
    { num: "3C", area: 68, price: 2_720_000, status: "sold" },
  ],
  "3BR": [
    { num: "4A", area: 98, price: 3_920_000, status: "free" },
    { num: "4B", area: 105, price: 4_200_000, status: "reserved" },
  ],
};

const INFRA = [
  { icon: "🏫", en: "School nearby", uk: "Школа поруч", detail: { en: "500m", uk: "500м" } },
  { icon: "🛒", en: "Shopping center", uk: "Торговий центр", detail: { en: "300m", uk: "300м" } },
  { icon: "🚇", en: "Metro 5 min", uk: "Метро 5 хв", detail: { en: "Walk", uk: "Пішки" } },
  { icon: "🌳", en: "Park", uk: "Парк", detail: { en: "200m", uk: "200м" } },
  { icon: "💪", en: "Fitness club", uk: "Фітнес-клуб", detail: { en: "In complex", uk: "У комплексі" } },
  { icon: "🚗", en: "Underground parking", uk: "Підземний паркінг", detail: { en: "800 spaces", uk: "800 місць" } },
];

const TIMELINE = [
  { quarter: "Q1 2024", en: "Foundation", uk: "Фундамент", done: true },
  { quarter: "Q3 2024", en: "Structure", uk: "Конструкція", done: true },
  { quarter: "Q1 2025", en: "Facade", uk: "Фасад", done: true },
  { quarter: "Q3 2025", en: "Interiors", uk: "Внутрішні роботи", done: false },
];

const PROJECTS = [
  { en: "Sunrise Residences", uk: "ЖК Сонячний", year: 2020, units: 240 },
  { en: "Green Valley", uk: "ЖК Зелена Долина", year: 2021, units: 180 },
  { en: "City Heights", uk: "ЖК Міські Висоти", year: 2022, units: 320 },
  { en: "Harbor View", uk: "ЖК Гавань", year: 2023, units: 156 },
  { en: "Metro Plaza", uk: "ЖК Метро Плаза", year: 2024, units: 290 },
];

// 6 rows = floors (simplified), 5 cols = apartment positions
// status: f=free, r=reserved, s=sold
const CHESS_GRID: AptStatus[][] = [
  ["free", "sold", "free", "reserved", "free"],
  ["reserved", "free", "free", "sold", "free"],
  ["free", "free", "reserved", "free", "sold"],
  ["sold", "reserved", "free", "free", "free"],
  ["free", "free", "sold", "reserved", "free"],
  ["free", "reserved", "free", "free", "sold"],
];

function formatPrice(n: number): string {
  return n.toLocaleString("uk-UA");
}

export function UrbanParkDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [nightMode, setNightMode] = useState(false);
  const [block, setBlock] = useState<Block>("A");
  const [aptType, setAptType] = useState<AptType>("1BR");
  const [floor, setFloor] = useState(5);
  const [bookingApt, setBookingApt] = useState<Apartment | null>(null);
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formTime, setFormTime] = useState("");
  const [formSent, setFormSent] = useState(false);
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number } | null>(null);

  const bg = nightMode ? "#0F1311" : "#F2F4F3";
  const cardBg = nightMode ? "#1A2120" : "#FFFFFF";
  const textColor = nightMode ? "#E8EDEC" : "#1A1F1E";
  const subColor = nightMode ? "#8A9896" : "#5A6360";
  const accent = "#2E7D6B";
  const accentLight = "#3DA48E";
  const borderColor = nightMode ? "#2A3533" : "#E2E8E6";

  const t = {
    hero: isUk ? "Urban Park — де місто дихає" : "Urban Park — where the city breathes",
    heroSub: isUk
      ? "Бізнес-клас · 3 блоки · Підземний паркінг · Здача Q4 2026"
      : "Business class · 3 blocks · Underground parking · Delivery Q4 2026",
    readiness: isUk ? "Готовність: 74%" : "Readiness: 74%",
    dayNight: isUk ? (nightMode ? "☀️ День" : "🌙 Ніч") : nightMode ? "☀️ Day" : "🌙 Night",
    floorPlan: isUk ? "Підбір квартири" : "Apartment Selector",
    step1: isUk ? "Крок 1: Блок" : "Step 1: Building",
    step2: isUk ? "Крок 2: Тип" : "Step 2: Type",
    step3: isUk ? "Крок 3: Поверх" : "Step 3: Floor",
    step4: isUk ? "Доступні квартири" : "Available Apartments",
    floorLabel: isUk ? "Поверх" : "Floor",
    area: isUk ? "Площа" : "Area",
    price: isUk ? "Ціна" : "Price",
    status: isUk ? "Статус" : "Status",
    free: isUk ? "Вільна" : "Free",
    reserved: isUk ? "Броньовано" : "Reserved",
    sold: isUk ? "Продано" : "Sold",
    bookViewing: isUk ? "Записатися на перегляд" : "Book viewing",
    chess: isUk ? "Шахматка квартир" : "Apartment Chess Board",
    infra: isUk ? "Інфраструктура" : "Infrastructure",
    progress: isUk ? "Хід будівництва" : "Construction Progress",
    developer: isUk ? "Забудовник" : "Developer",
    devName: isUk ? "УРБАН ДЕВЕЛОПМЕНТ ГРУП" : "URBAN DEVELOPMENT GROUP",
    devDesc: isUk
      ? "Більше 12 років на ринку нерухомості. Понад 1 500 зданих квартир. Всі проекти завершено в строк."
      : "12+ years in real estate. 1,500+ delivered apartments. All projects completed on schedule.",
    projects: isUk ? "Завершені проекти" : "Completed Projects",
    certs: isUk ? "Сертифікати" : "Certifications",
    formTitle: isUk ? "Записатися на перегляд" : "Book a Viewing",
    nameLabel: isUk ? "Ваше ім'я" : "Your Name",
    phoneLabel: isUk ? "Телефон" : "Phone",
    timeLabel: isUk ? "Зручний час" : "Preferred Time",
    send: isUk ? "Надіслати" : "Submit",
    cancel: isUk ? "Скасувати" : "Cancel",
    thankYou: isUk ? "Дякуємо! Ми зателефонуємо вам." : "Thank you! We will call you.",
    units: isUk ? "квартир" : "units",
    studioLabel: "Studio",
    apt1BR: "1BR",
    apt2BR: "2BR",
    apt3BR: "3BR",
    uah: isUk ? "грн" : "UAH",
  };

  const statusColor = (s: AptStatus) =>
    s === "free" ? "#2E7D6B" : s === "reserved" ? "#D4A017" : "#9A9A9A";
  const statusLabel = (s: AptStatus) =>
    s === "free" ? t.free : s === "reserved" ? t.reserved : t.sold;

  const apartments = APT_DATA[aptType];

  const btnBase: React.CSSProperties = {
    padding: "8px 18px",
    borderRadius: "8px",
    border: `1.5px solid ${borderColor}`,
    background: "transparent",
    color: textColor,
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 500,
    transition: "all 0.2s",
  };

  const btnActive: React.CSSProperties = {
    ...btnBase,
    background: accent,
    border: `1.5px solid ${accent}`,
    color: "#fff",
    fontWeight: 700,
  };

  return (
    <div style={{ background: bg, color: textColor, fontFamily: "'Inter', 'Segoe UI', sans-serif", minHeight: "100vh", transition: "background 0.4s, color 0.3s" }}>
      {/* HERO */}
      <div
        style={{
          background: nightMode
            ? "linear-gradient(135deg, #0A0F0E 0%, #0F1A17 60%, #0D1F1A 100%)"
            : "linear-gradient(135deg, #1A1F1E 0%, #2A3533 60%, #1F2E2B 100%)",
          padding: "48px 24px 44px",
          position: "relative",
          overflow: "hidden",
          transition: "background 0.4s",
        }}
      >
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 65% 40%, rgba(46,125,107,0.15) 0%, transparent 65%)" }} />

        <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <div style={{ display: "inline-block", background: "rgba(46,125,107,0.2)", border: "1px solid rgba(46,125,107,0.4)", borderRadius: "20px", padding: "4px 16px", color: "#7ECBBF", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "16px" }}>
                Urban Park
              </div>
              <h1 style={{ color: "#F0F5F4", fontSize: "clamp(22px, 4vw, 36px)", fontWeight: 800, marginBottom: "8px", letterSpacing: "-0.5px" }}>
                {t.hero}
              </h1>
              <p style={{ color: "#7ECBBF", fontSize: "14px", marginBottom: "28px" }}>{t.heroSub}</p>
            </div>
            <button
              onClick={() => setNightMode(!nightMode)}
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "10px",
                padding: "10px 18px",
                color: "#E0EDEB",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: 600,
                flexShrink: 0,
                whiteSpace: "nowrap",
              }}
            >
              {t.dayNight}
            </button>
          </div>

          {/* Progress bar */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ color: "#A8C5C0", fontSize: "13px", fontWeight: 600 }}>{t.readiness}</span>
              <span style={{ color: accentLight, fontSize: "13px", fontWeight: 700 }}>74%</span>
            </div>
            <div style={{ height: "8px", background: "rgba(255,255,255,0.1)", borderRadius: "4px", overflow: "hidden" }}>
              <div style={{ width: "74%", height: "100%", background: `linear-gradient(90deg, ${accent}, ${accentLight})`, borderRadius: "4px", transition: "width 1s ease" }} />
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 24px" }}>
        {/* FLOOR PLAN SELECTOR */}
        <section style={{ background: cardBg, borderRadius: "16px", padding: "24px", marginBottom: "28px", border: `1px solid ${borderColor}`, boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
          <h2 style={{ fontSize: "18px", fontWeight: 800, marginBottom: "24px", color: textColor, letterSpacing: "-0.3px" }}>{t.floorPlan}</h2>

          {/* Step 1 */}
          <div style={{ marginBottom: "20px" }}>
            <div style={{ fontSize: "11px", fontWeight: 700, color: accent, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>{t.step1}</div>
            <div style={{ display: "flex", gap: "8px" }}>
              {BLOCKS.map((b) => (
                <button key={b} onClick={() => setBlock(b)} style={block === b ? btnActive : btnBase}>
                  {isUk ? `Блок ${b}` : `Block ${b}`}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2 */}
          <div style={{ marginBottom: "20px" }}>
            <div style={{ fontSize: "11px", fontWeight: 700, color: accent, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>{t.step2}</div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {(["Studio", "1BR", "2BR", "3BR"] as AptType[]).map((tp) => (
                <button key={tp} onClick={() => setAptType(tp)} style={aptType === tp ? btnActive : btnBase}>{tp}</button>
              ))}
            </div>
          </div>

          {/* Step 3 */}
          <div style={{ marginBottom: "24px" }}>
            <div style={{ fontSize: "11px", fontWeight: 700, color: accent, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>
              {t.step3}: <span style={{ color: textColor }}>{floor}</span>
            </div>
            <input
              type="range"
              min={1}
              max={24}
              value={floor}
              onChange={(e) => setFloor(Number(e.target.value))}
              style={{ width: "100%", accentColor: accent }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: subColor, marginTop: "4px" }}>
              <span>1</span><span>24</span>
            </div>
          </div>

          {/* Step 4 */}
          <div>
            <div style={{ fontSize: "11px", fontWeight: 700, color: accent, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "12px" }}>
              {t.step4} — {isUk ? `Блок ${block}` : `Block ${block}`}, {t.floorLabel} {floor}, {aptType}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {apartments.map((apt) => (
                <div
                  key={apt.num}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 16px",
                    borderRadius: "10px",
                    border: `1px solid ${borderColor}`,
                    background: apt.status === "sold" ? (nightMode ? "#1A1A1A" : "#F5F5F5") : (nightMode ? "#1A2423" : "#F7FFFE"),
                    opacity: apt.status === "sold" ? 0.6 : 1,
                    flexWrap: "wrap",
                    gap: "8px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: statusColor(apt.status) + "22", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "13px", color: statusColor(apt.status) }}>
                      {apt.num}
                    </div>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: 600, color: textColor }}>{apt.area} m²</div>
                      <div style={{ fontSize: "12px", color: subColor }}>{t.floorLabel} {floor} · {aptType}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "15px", fontWeight: 700, color: textColor }}>{formatPrice(apt.price)} {t.uah}</div>
                      <div style={{ display: "inline-block", background: statusColor(apt.status) + "22", color: statusColor(apt.status), borderRadius: "6px", padding: "2px 8px", fontSize: "11px", fontWeight: 700 }}>
                        {statusLabel(apt.status)}
                      </div>
                    </div>
                    {apt.status !== "sold" && (
                      <button
                        onClick={() => { setBookingApt(apt); setFormSent(false); }}
                        style={{
                          background: apt.status === "free" ? accent : "transparent",
                          border: `1.5px solid ${apt.status === "free" ? accent : "#D4A017"}`,
                          color: apt.status === "free" ? "#fff" : "#D4A017",
                          borderRadius: "8px",
                          padding: "8px 14px",
                          cursor: "pointer",
                          fontSize: "12px",
                          fontWeight: 700,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {t.bookViewing}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BOOKING FORM MODAL */}
        {bookingApt && (
          <div style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
            padding: "16px",
          }}>
            <div style={{ background: cardBg, borderRadius: "16px", padding: "28px", width: "100%", maxWidth: "400px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
              {formSent ? (
                <div style={{ textAlign: "center", padding: "16px 0" }}>
                  <div style={{ fontSize: "44px", marginBottom: "12px" }}>✅</div>
                  <div style={{ fontSize: "17px", fontWeight: 700, color: accent, marginBottom: "8px" }}>{t.thankYou}</div>
                  <div style={{ color: subColor, fontSize: "13px", marginBottom: "20px" }}>
                    {isUk ? `Квартира: ${bookingApt.num}, ${bookingApt.area} м²` : `Apartment: ${bookingApt.num}, ${bookingApt.area} m²`}
                  </div>
                  <button
                    onClick={() => { setBookingApt(null); setFormName(""); setFormPhone(""); setFormTime(""); }}
                    style={{ ...btnActive, padding: "10px 28px" }}
                  >
                    OK
                  </button>
                </div>
              ) : (
                <>
                  <div style={{ fontWeight: 800, fontSize: "17px", marginBottom: "4px", color: textColor }}>{t.formTitle}</div>
                  <div style={{ color: subColor, fontSize: "13px", marginBottom: "20px" }}>
                    {isUk ? `Квартира ${bookingApt.num} · ${bookingApt.area} м² · ${formatPrice(bookingApt.price)} ${t.uah}` : `Apt ${bookingApt.num} · ${bookingApt.area} m² · ${formatPrice(bookingApt.price)} ${t.uah}`}
                  </div>

                  {[
                    { label: t.nameLabel, val: formName, set: setFormName, type: "text" },
                    { label: t.phoneLabel, val: formPhone, set: setFormPhone, type: "tel" },
                    { label: t.timeLabel, val: formTime, set: setFormTime, type: "text" },
                  ].map((f) => (
                    <div key={f.label} style={{ marginBottom: "14px" }}>
                      <label style={{ fontSize: "12px", fontWeight: 600, color: subColor, display: "block", marginBottom: "6px" }}>{f.label}</label>
                      <input
                        type={f.type}
                        value={f.val}
                        onChange={(e) => f.set(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "10px 12px",
                          border: `1.5px solid ${borderColor}`,
                          borderRadius: "8px",
                          background: "transparent",
                          color: textColor,
                          fontSize: "14px",
                          outline: "none",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>
                  ))}

                  <div style={{ display: "flex", gap: "10px", marginTop: "4px" }}>
                    <button
                      onClick={() => {
                        if (formName && formPhone) setFormSent(true);
                      }}
                      style={{ ...btnActive, flex: 1, padding: "11px" }}
                    >
                      {t.send}
                    </button>
                    <button
                      onClick={() => setBookingApt(null)}
                      style={{ ...btnBase, flex: 1, padding: "11px" }}
                    >
                      {t.cancel}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* CHESS BOARD */}
        <section style={{ background: cardBg, borderRadius: "16px", padding: "24px", marginBottom: "28px", border: `1px solid ${borderColor}` }}>
          <h2 style={{ fontSize: "18px", fontWeight: 800, marginBottom: "8px", color: textColor }}>{t.chess}</h2>
          <div style={{ display: "flex", gap: "16px", marginBottom: "16px", flexWrap: "wrap" }}>
            {(["free", "reserved", "sold"] as AptStatus[]).map((s) => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "14px", height: "14px", borderRadius: "3px", background: statusColor(s) }} />
                <span style={{ fontSize: "12px", color: subColor }}>{statusLabel(s)}</span>
              </div>
            ))}
          </div>

          <div style={{ position: "relative", display: "inline-block" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {CHESS_GRID.map((row, rowIdx) => (
                <div key={rowIdx} style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                  <span style={{ fontSize: "10px", color: subColor, width: "24px", textAlign: "right", marginRight: "4px" }}>
                    {CHESS_GRID.length - rowIdx}
                  </span>
                  {row.map((status, colIdx) => {
                    const isHovered = hoveredCell?.row === rowIdx && hoveredCell?.col === colIdx;
                    return (
                      <div
                        key={colIdx}
                        onMouseEnter={() => setHoveredCell({ row: rowIdx, col: colIdx })}
                        onMouseLeave={() => setHoveredCell(null)}
                        style={{
                          width: "36px",
                          height: "28px",
                          borderRadius: "5px",
                          background: statusColor(status),
                          opacity: isHovered ? 1 : status === "sold" ? 0.45 : 0.8,
                          cursor: status !== "sold" ? "pointer" : "default",
                          transition: "opacity 0.15s, transform 0.15s",
                          transform: isHovered ? "scale(1.15)" : "scale(1)",
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {isHovered && (
                          <div style={{
                            position: "absolute",
                            bottom: "calc(100% + 6px)",
                            left: "50%",
                            transform: "translateX(-50%)",
                            background: nightMode ? "#2A3533" : "#1A1F1E",
                            color: "#fff",
                            borderRadius: "6px",
                            padding: "4px 8px",
                            fontSize: "11px",
                            whiteSpace: "nowrap",
                            zIndex: 10,
                            pointerEvents: "none",
                          }}>
                            {`${CHESS_GRID.length - rowIdx}-${colIdx + 1} · ${statusLabel(status)}`}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: "4px", marginTop: "4px", paddingLeft: "32px" }}>
              {["A", "B", "C", "D", "E"].map((l) => (
                <div key={l} style={{ width: "36px", textAlign: "center", fontSize: "10px", color: subColor }}>{l}</div>
              ))}
            </div>
          </div>
        </section>

        {/* CONSTRUCTION TIMELINE */}
        <section style={{ background: cardBg, borderRadius: "16px", padding: "24px", marginBottom: "28px", border: `1px solid ${borderColor}` }}>
          <h2 style={{ fontSize: "18px", fontWeight: 800, marginBottom: "24px", color: textColor }}>{t.progress}</h2>
          <div style={{ position: "relative" }}>
            {/* Line */}
            <div style={{ position: "absolute", top: "20px", left: "20px", right: "20px", height: "2px", background: borderColor }} />
            <div style={{ position: "absolute", top: "20px", left: "20px", width: "75%", height: "2px", background: accent }} />

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px", position: "relative" }}>
              {TIMELINE.map((item, idx) => (
                <div key={idx} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
                  <div style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: item.done ? accent : (nightMode ? "#2A3533" : "#E8EDEC"),
                    border: `3px solid ${item.done ? accent : borderColor}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: item.done ? "#fff" : subColor,
                    fontSize: "16px",
                    fontWeight: 700,
                    zIndex: 1,
                    position: "relative",
                    flexShrink: 0,
                  }}>
                    {item.done ? "✓" : idx + 1}
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "11px", fontWeight: 700, color: item.done ? accent : subColor, marginBottom: "3px" }}>{item.quarter}</div>
                    <div style={{ fontSize: "13px", fontWeight: 600, color: textColor }}>{isUk ? item.uk : item.en}</div>
                    <div style={{
                      marginTop: "6px",
                      width: "52px",
                      height: "40px",
                      background: item.done
                        ? `linear-gradient(135deg, ${accent}33, ${accent}11)`
                        : (nightMode ? "#1A2423" : "#F2F4F3"),
                      borderRadius: "6px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "18px",
                      margin: "6px auto 0",
                    }}>
                      {item.done ? "🏗️" : "📋"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INFRASTRUCTURE */}
        <section style={{ marginBottom: "28px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: 800, marginBottom: "16px", color: textColor }}>{t.infra}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "12px" }}>
            {INFRA.map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: cardBg,
                  borderRadius: "12px",
                  padding: "18px 14px",
                  border: `1px solid ${borderColor}`,
                  textAlign: "center",
                  transition: "border-color 0.2s",
                }}
              >
                <div style={{ fontSize: "28px", marginBottom: "8px" }}>{item.icon}</div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: textColor, marginBottom: "4px" }}>{isUk ? item.uk : item.en}</div>
                <div style={{ fontSize: "12px", color: accent, fontWeight: 600 }}>{isUk ? item.detail.uk : item.detail.en}</div>
              </div>
            ))}
          </div>
        </section>

        {/* DEVELOPER */}
        <section style={{ background: cardBg, borderRadius: "16px", padding: "24px", border: `1px solid ${borderColor}` }}>
          <h2 style={{ fontSize: "18px", fontWeight: 800, marginBottom: "20px", color: textColor }}>{t.developer}</h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "14px" }}>
                <div style={{ width: "52px", height: "52px", borderRadius: "12px", background: `linear-gradient(135deg, ${accent}, #1A5A4C)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" }}>
                  🏢
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: "14px", letterSpacing: "0.5px", color: textColor }}>{t.devName}</div>
                  <div style={{ fontSize: "12px", color: accent, fontWeight: 600 }}>
                    {isUk ? "Засновано 2012" : "Founded 2012"}
                  </div>
                </div>
              </div>
              <p style={{ fontSize: "13px", color: subColor, lineHeight: 1.7 }}>{t.devDesc}</p>

              <div style={{ display: "flex", gap: "8px", marginTop: "14px", flexWrap: "wrap" }}>
                {[
                  { icon: "🏆", label: isUk ? "Нагороди" : "Awards" },
                  { icon: "📋", label: isUk ? "ISO 9001" : "ISO 9001" },
                  { icon: "✅", label: isUk ? "Ліцензія" : "License" },
                ].map((c) => (
                  <div key={c.label} style={{ background: `${accent}11`, border: `1px solid ${accent}33`, borderRadius: "8px", padding: "6px 12px", fontSize: "12px", display: "flex", alignItems: "center", gap: "4px", color: textColor }}>
                    {c.icon} {c.label}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize: "13px", fontWeight: 700, color: textColor, marginBottom: "12px" }}>{t.projects}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {PROJECTS.map((proj, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", borderRadius: "8px", background: nightMode ? "#1A2423" : "#F7FFFE", border: `1px solid ${borderColor}` }}>
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: 600, color: textColor }}>{isUk ? proj.uk : proj.en}</div>
                      <div style={{ fontSize: "11px", color: subColor }}>{proj.year}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "13px", fontWeight: 700, color: accent }}>{proj.units}</div>
                      <div style={{ fontSize: "10px", color: subColor }}>{t.units}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
