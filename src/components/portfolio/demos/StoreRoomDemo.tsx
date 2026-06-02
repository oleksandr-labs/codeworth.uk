"use client";

import { useState } from "react";

export function StoreRoomDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  /* ── Calculator state ── */
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [roomSize, setRoomSize] = useState("studio");
  const [calcDone, setCalcDone] = useState(false);

  /* ── Booking flow ── */
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);
  const [startDate, setStartDate] = useState("");
  const [duration, setDuration] = useState("1");
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [bookingDone, setBookingDone] = useState(false);

  /* ── Floor plan ── */
  const [hoveredUnit, setHoveredUnit] = useState<string | null>(null);
  const [floorPlanUnit, setFloorPlanUnit] = useState<string | null>(null);

  /* ── Business form ── */
  const [bizName, setBizName] = useState("");
  const [bizContact, setBizContact] = useState("");
  const [bizSize, setBizSize] = useState("m");
  const [bizSent, setBizSent] = useState(false);

  /* ── Active section ── */
  const [activeSection, setActiveSection] = useState<"catalog" | "calculator" | "floorplan" | "booking" | "business">("catalog");

  /* ─────────────── DATA ─────────────── */

  const TRUST = [
    { icon: "🔒", en: "24/7 CCTV", uk: "Відеоспостереження 24/7" },
    { icon: "🌡️", en: "Climate Control", uk: "Клімат-контроль" },
    { icon: "🚪", en: "24/7 Access", uk: "Доступ 24/7" },
    { icon: "🏦", en: "Insurance Included", uk: "Страхування включено" },
  ];

  const ITEMS = [
    { id: "furniture", en: "Furniture", uk: "Меблі", weight: 3 },
    { id: "electronics", en: "Electronics", uk: "Електроніка", weight: 2 },
    { id: "archive", en: "Archive documents", uk: "Архівні документи", weight: 1 },
    { id: "bicycles", en: "Bicycles", uk: "Велосипеди", weight: 2 },
    { id: "business", en: "Business goods", uk: "Бізнес-товари", weight: 3 },
    { id: "personal", en: "Personal items", uk: "Особисті речі", weight: 1 },
  ];

  const ROOM_SIZES = [
    { id: "studio", en: "Studio", uk: "Студія", points: 1 },
    { id: "1br", en: "1 Bedroom", uk: "1-кімнатна", points: 2 },
    { id: "2br", en: "2 Bedrooms", uk: "2-кімнатна", points: 3 },
    { id: "3br", en: "3 Bedrooms", uk: "3-кімнатна", points: 4 },
    { id: "house", en: "House", uk: "Будинок", points: 5 },
  ];

  const UNIT_SIZES = [
    { id: "xs", label: "XS", area: "2 m²", price: 320, en: "Documents, boxes", uk: "Документи, коробки", minPoints: 0, icon: "📦" },
    { id: "s", label: "S", area: "4 m²", price: 580, en: "1-room contents", uk: "Вміст 1 кімнати", minPoints: 2, icon: "🗃️" },
    { id: "m", label: "M", area: "8 m²", price: 980, en: "2-room apartment", uk: "2-кімнатна квартира", minPoints: 3, icon: "🏠" },
    { id: "l", label: "L", area: "15 m²", price: 1600, en: "Full apartment + car parts", uk: "Повна квартира + запчастини", minPoints: 5, icon: "🏗️" },
    { id: "xl", label: "XL", area: "30 m²", price: 2800, en: "House, business stock", uk: "Будинок, бізнес-запаси", minPoints: 7, icon: "🏭" },
  ];

  const UNITS: { id: string; size: string; floor: number; price: number; available: boolean }[] = [
    { id: "A01", size: "XS", floor: 1, price: 320, available: true },
    { id: "A02", size: "XS", floor: 1, price: 320, available: false },
    { id: "A03", size: "S", floor: 1, price: 580, available: true },
    { id: "A04", size: "S", floor: 1, price: 580, available: true },
    { id: "B01", size: "M", floor: 1, price: 980, available: false },
    { id: "B02", size: "M", floor: 2, price: 980, available: true },
    { id: "B03", size: "L", floor: 2, price: 1600, available: true },
    { id: "C01", size: "XL", floor: 3, price: 2800, available: false },
  ];

  /* ─────────────── LOGIC ─────────────── */

  const toggleItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
    setCalcDone(false);
  };

  const calcScore = () => {
    const itemScore = selectedItems.reduce((acc, id) => {
      const item = ITEMS.find((i) => i.id === id);
      return acc + (item?.weight ?? 0);
    }, 0);
    const roomScore = ROOM_SIZES.find((r) => r.id === roomSize)?.points ?? 1;
    return itemScore + roomScore;
  };

  const getRecommended = () => {
    const score = calcScore();
    return UNIT_SIZES.slice().reverse().find((u) => score >= u.minPoints) ?? UNIT_SIZES[0];
  };

  const recommended = calcDone ? getRecommended() : null;

  const floorPlanUnitData = UNITS.find((u) => u.id === floorPlanUnit);

  /* ─────────────── COLORS ─────────────── */
  const C = {
    bg: "#1F2937",
    orange: "#F97316",
    steel: "#E5E7EB",
    white: "#FFFFFF",
    card: "#374151",
    muted: "#9CA3AF",
    green: "#22C55E",
    dark2: "#111827",
  };

  const navItems = [
    { id: "catalog", en: "Units", uk: "Бокси" },
    { id: "calculator", en: "Size Calculator", uk: "Калькулятор" },
    { id: "floorplan", en: "Floor Plan", uk: "План поверху" },
    { id: "booking", en: "Book Now", uk: "Замовити" },
    { id: "business", en: "For Business", uk: "Для бізнесу" },
  ] as const;

  /* ─────────────── RENDER ─────────────── */
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: C.bg, color: C.white, minHeight: "100vh" }}>

      {/* NAVBAR */}
      <nav style={{ background: C.dark2, borderBottom: `1px solid #374151` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, background: C.orange, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>📦</div>
            <span style={{ fontWeight: 700, fontSize: 20, letterSpacing: "-0.5px" }}>
              {isUk ? "StoreRoom" : "StoreRoom"}
            </span>
            <span style={{ fontSize: 11, background: "#374151", color: C.muted, borderRadius: 4, padding: "2px 8px", letterSpacing: 1 }}>
              {isUk ? "СХОВИЩЕ" : "STORAGE"}
            </span>
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {navItems.map((n) => (
              <button
                key={n.id}
                onClick={() => setActiveSection(n.id)}
                style={{
                  background: activeSection === n.id ? C.orange : "transparent",
                  color: activeSection === n.id ? C.white : C.muted,
                  border: "none",
                  borderRadius: 6,
                  padding: "6px 14px",
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all .2s",
                }}
              >
                {isUk ? n.uk : n.en}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ background: `linear-gradient(135deg, ${C.dark2} 0%, #1a2332 100%)`, padding: "64px 24px 48px", textAlign: "center", borderBottom: `3px solid ${C.orange}` }}>
        <div style={{ display: "inline-block", background: C.orange, color: C.white, borderRadius: 4, padding: "4px 12px", fontSize: 12, fontWeight: 700, letterSpacing: 2, marginBottom: 16 }}>
          {isUk ? "НАДІЙНЕ ЗБЕРІГАННЯ" : "SECURE SELF-STORAGE"}
        </div>
        <h1 style={{ fontSize: 42, fontWeight: 800, margin: "0 0 16px", lineHeight: 1.2 }}>
          {isUk ? "Ваші речі у безпеці" : "Your belongings,"}
          <br />
          <span style={{ color: C.orange }}>{isUk ? "поруч і завжди доступні" : "safe & always accessible"}</span>
        </h1>
        <p style={{ color: C.muted, fontSize: 17, maxWidth: 540, margin: "0 auto 32px" }}>
          {isUk
            ? "Оренда індивідуальних боксів від 2 до 30 м². Без довгострокових зобов'язань."
            : "Rent individual storage units from 2 to 30 m². No long-term commitment required."}
        </p>
        {/* Trust row */}
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 12 }}>
          {TRUST.map((t) => (
            <div key={t.en} style={{ display: "flex", alignItems: "center", gap: 8, background: "#1F2937", border: "1px solid #374151", borderRadius: 8, padding: "10px 18px" }}>
              <span style={{ fontSize: 18 }}>{t.icon}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: C.steel }}>{isUk ? t.uk : t.en}</span>
            </div>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>

        {/* ── UNIT CATALOG ── */}
        {activeSection === "catalog" && (
          <div>
            <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
              {isUk ? "Доступні бокси" : "Available Units"}
            </h2>
            <p style={{ color: C.muted, marginBottom: 28 }}>
              {isUk ? "Оберіть бокс та забронюйте онлайн за 2 хвилини" : "Choose a unit and book online in 2 minutes"}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
              {UNITS.map((u) => {
                const sizeData = UNIT_SIZES.find((s) => s.label === u.size);
                return (
                  <div
                    key={u.id}
                    onClick={() => {
                      if (u.available) {
                        setSelectedUnit(u.id);
                        setActiveSection("booking");
                        setBookingStep(1);
                      }
                    }}
                    style={{
                      background: C.card,
                      borderRadius: 12,
                      padding: 20,
                      border: `2px solid ${u.available ? "#374151" : "#374151"}`,
                      cursor: u.available ? "pointer" : "default",
                      opacity: u.available ? 1 : 0.65,
                      transition: "border-color .2s, transform .2s",
                      position: "relative",
                      overflow: "hidden",
                    }}
                    onMouseEnter={(e) => {
                      if (u.available) (e.currentTarget as HTMLDivElement).style.borderColor = C.orange;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = "#374151";
                    }}
                  >
                    <div style={{ position: "absolute", top: 12, right: 12 }}>
                      <span style={{
                        background: u.available ? "#14532d" : "#374151",
                        color: u.available ? C.green : C.muted,
                        borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 700
                      }}>
                        {u.available ? (isUk ? "ВІЛЬНИЙ" : "AVAILABLE") : (isUk ? "ЗАЙНЯТИЙ" : "OCCUPIED")}
                      </span>
                    </div>
                    <div style={{ fontSize: 32, marginBottom: 8 }}>{sizeData?.icon ?? "📦"}</div>
                    <div style={{ fontSize: 24, fontWeight: 800, color: C.orange }}>{u.id}</div>
                    <div style={{ fontSize: 14, color: C.muted, marginBottom: 8 }}>
                      {isUk ? "Поверх" : "Floor"} {u.floor} · {u.size} · {sizeData?.area}
                    </div>
                    <div style={{ fontSize: 12, color: C.steel, marginBottom: 12 }}>
                      {isUk ? sizeData?.uk : sizeData?.en}
                    </div>
                    <div style={{ borderTop: "1px solid #4B5563", paddingTop: 12 }}>
                      <span style={{ fontSize: 20, fontWeight: 800, color: C.white }}>
                        ₴{u.price}
                      </span>
                      <span style={{ fontSize: 12, color: C.muted }}>/{isUk ? "міс" : "mo"}</span>
                    </div>
                    {u.available && (
                      <button style={{ marginTop: 12, width: "100%", background: C.orange, border: "none", borderRadius: 8, color: C.white, padding: "8px 0", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
                        {isUk ? "Забронювати" : "Book Now"}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── SIZE CALCULATOR ── */}
        {activeSection === "calculator" && (
          <div>
            <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
              {isUk ? "Калькулятор розміру боксу" : "Unit Size Calculator"}
            </h2>
            <p style={{ color: C.muted, marginBottom: 28 }}>
              {isUk ? "Дайте відповідь на 2 питання — ми підберемо ідеальний бокс" : "Answer 2 questions — we'll find the perfect unit for you"}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
              {/* Left */}
              <div>
                <div style={{ background: C.card, borderRadius: 12, padding: 24, marginBottom: 20 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: C.orange }}>
                    {isUk ? "1. Що будете зберігати?" : "1. What will you store?"}
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {ITEMS.map((item) => {
                      const checked = selectedItems.includes(item.id);
                      return (
                        <label key={item.id} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                          <div
                            onClick={() => toggleItem(item.id)}
                            style={{
                              width: 20, height: 20, borderRadius: 4,
                              border: `2px solid ${checked ? C.orange : "#4B5563"}`,
                              background: checked ? C.orange : "transparent",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              cursor: "pointer", flexShrink: 0,
                            }}
                          >
                            {checked && <span style={{ color: C.white, fontSize: 12, fontWeight: 700 }}>✓</span>}
                          </div>
                          <span style={{ fontSize: 14, color: checked ? C.white : C.muted }}>
                            {isUk ? item.uk : item.en}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div style={{ background: C.card, borderRadius: 12, padding: 24 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: C.orange }}>
                    {isUk ? "2. Скільки кімнат переїжджаєте?" : "2. How many rooms are you moving from?"}
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {ROOM_SIZES.map((r) => (
                      <label key={r.id} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                        <div
                          onClick={() => { setRoomSize(r.id); setCalcDone(false); }}
                          style={{
                            width: 18, height: 18, borderRadius: "50%",
                            border: `2px solid ${roomSize === r.id ? C.orange : "#4B5563"}`,
                            background: roomSize === r.id ? C.orange : "transparent",
                            cursor: "pointer", flexShrink: 0,
                          }}
                        />
                        <span style={{ fontSize: 14, color: roomSize === r.id ? C.white : C.muted }}>
                          {isUk ? r.uk : r.en}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setCalcDone(true)}
                  style={{
                    marginTop: 20, width: "100%", background: C.orange, border: "none",
                    borderRadius: 10, color: C.white, padding: "14px 0", fontWeight: 700,
                    fontSize: 16, cursor: "pointer",
                  }}
                >
                  {isUk ? "Розрахувати розмір" : "Calculate Size"}
                </button>
              </div>

              {/* Right — result */}
              <div>
                {!calcDone ? (
                  <div style={{ background: C.card, borderRadius: 12, padding: 32, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "2px dashed #4B5563" }}>
                    <div style={{ fontSize: 48, marginBottom: 16 }}>📐</div>
                    <p style={{ color: C.muted, textAlign: "center", fontSize: 15 }}>
                      {isUk ? "Заповніть форму зліва та натисніть «Розрахувати»" : "Fill in the form on the left and click Calculate"}
                    </p>
                  </div>
                ) : recommended && (
                  <div>
                    <div style={{ background: `linear-gradient(135deg, #1a2332 0%, ${C.card} 100%)`, border: `2px solid ${C.orange}`, borderRadius: 16, padding: 28, marginBottom: 16, textAlign: "center" }}>
                      <div style={{ fontSize: 60, marginBottom: 12 }}>{recommended.icon}</div>
                      <div style={{ color: C.orange, fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>
                        {isUk ? "РЕКОМЕНДОВАНИЙ РОЗМІР" : "RECOMMENDED SIZE"}
                      </div>
                      <div style={{ fontSize: 52, fontWeight: 900, lineHeight: 1 }}>{recommended.label}</div>
                      <div style={{ fontSize: 22, color: C.orange, fontWeight: 700, margin: "4px 0" }}>{recommended.area}</div>
                      <p style={{ color: C.muted, fontSize: 14, margin: "12px 0" }}>
                        {isUk ? recommended.uk : recommended.en}
                      </p>
                      <div style={{ background: C.dark2, borderRadius: 10, padding: "14px 20px", marginTop: 16 }}>
                        <span style={{ fontSize: 30, fontWeight: 800 }}>₴{recommended.price}</span>
                        <span style={{ color: C.muted, fontSize: 14 }}>/{isUk ? "місяць" : "month"}</span>
                      </div>
                    </div>
                    {/* What fits */}
                    <div style={{ background: C.card, borderRadius: 12, padding: 20, marginBottom: 16 }}>
                      <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12, color: C.steel }}>
                        {isUk ? "Що поміщається:" : "What fits inside:"}
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                        {(recommended.id === "xs" ? ["📄 Documents", "🗃️ 10–20 boxes", "🎿 Sports gear", "💻 Electronics"] :
                          recommended.id === "s" ? ["🛋️ Sofa", "📺 TV", "🗄️ Filing cabinet", "📦 30+ boxes"] :
                          recommended.id === "m" ? ["🛏️ Bedroom set", "🍽️ Kitchen items", "🚲 Bicycle × 2", "📦 60+ boxes"] :
                          recommended.id === "l" ? ["🛋️ Full living room", "🍽️ Full kitchen", "🏍️ Motorcycle", "📦 100+ boxes"] :
                          ["🚗 Car", "🏠 Full house", "🏭 Business stock", "📦 200+ boxes"]
                        ).map((item, i) => (
                          <div key={i} style={{ background: C.dark2, borderRadius: 6, padding: "6px 10px", fontSize: 12, color: C.muted }}>{item}</div>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        const unit = UNITS.find((u) => u.size === recommended.label && u.available);
                        if (unit) { setSelectedUnit(unit.id); setActiveSection("booking"); setBookingStep(1); }
                      }}
                      style={{ width: "100%", background: C.orange, border: "none", borderRadius: 10, color: C.white, padding: "14px 0", fontWeight: 700, fontSize: 16, cursor: "pointer" }}
                    >
                      {isUk ? "Забронювати цей розмір" : "Book This Size"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── FLOOR PLAN ── */}
        {activeSection === "floorplan" && (
          <div>
            <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
              {isUk ? "Інтерактивний план поверху" : "Interactive Floor Plan"}
            </h2>
            <p style={{ color: C.muted, marginBottom: 28 }}>
              {isUk ? "Натисніть на бокс для перегляду деталей" : "Click on a unit to see its details"}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24 }}>
              {/* SVG Floor plan */}
              <div style={{ background: C.card, borderRadius: 16, padding: 24 }}>
                <div style={{ fontSize: 13, color: C.muted, marginBottom: 16, display: "flex", gap: 20 }}>
                  <span>
                    <span style={{ display: "inline-block", width: 14, height: 14, background: "#22C55E", borderRadius: 3, marginRight: 6, verticalAlign: "middle" }} />
                    {isUk ? "Вільний" : "Available"}
                  </span>
                  <span>
                    <span style={{ display: "inline-block", width: 14, height: 14, background: "#4B5563", borderRadius: 3, marginRight: 6, verticalAlign: "middle" }} />
                    {isUk ? "Зайнятий" : "Occupied"}
                  </span>
                  <span>
                    <span style={{ display: "inline-block", width: 14, height: 14, background: C.orange, borderRadius: 3, marginRight: 6, verticalAlign: "middle" }} />
                    {isUk ? "Обраний" : "Selected"}
                  </span>
                </div>
                <svg viewBox="0 0 560 380" style={{ width: "100%", borderRadius: 10, background: C.dark2 }}>
                  {/* Building outline */}
                  <rect x="20" y="20" width="520" height="340" rx="8" fill="none" stroke="#374151" strokeWidth="2" />
                  {/* Aisle */}
                  <rect x="220" y="20" width="120" height="340" fill="#1a2332" />
                  <text x="280" y="200" textAnchor="middle" fill="#4B5563" fontSize="12" fontFamily="sans-serif">
                    {isUk ? "ПРОХІД" : "AISLE"}
                  </text>
                  {/* Floor label */}
                  <text x="280" y="15" textAnchor="middle" fill="#6B7280" fontSize="11" fontFamily="sans-serif">
                    {isUk ? "ПОВЕРХ 1" : "FLOOR 1"}
                  </text>
                  {/* Left side units */}
                  {[
                    { id: "A01", x: 30, y: 30, w: 80, h: 60 },
                    { id: "A02", x: 30, y: 100, w: 80, h: 60 },
                    { id: "A03", x: 30, y: 170, w: 80, h: 90 },
                    { id: "A04", x: 30, y: 270, w: 80, h: 70 },
                    { id: "B01", x: 120, y: 30, w: 90, h: 130 },
                    { id: "B02", x: 120, y: 170, w: 90, h: 100 },
                  ].map((cell) => {
                    const unit = UNITS.find((u) => u.id === cell.id);
                    const isSelected = floorPlanUnit === cell.id;
                    const isHovered = hoveredUnit === cell.id;
                    const fill = isSelected ? C.orange : isHovered && unit?.available ? "#16a34a" : unit?.available ? "#166534" : "#374151";
                    return (
                      <g
                        key={cell.id}
                        onClick={() => setFloorPlanUnit(cell.id)}
                        onMouseEnter={() => setHoveredUnit(cell.id)}
                        onMouseLeave={() => setHoveredUnit(null)}
                        style={{ cursor: "pointer" }}
                      >
                        <rect x={cell.x} y={cell.y} width={cell.w} height={cell.h} rx="4" fill={fill} stroke={isSelected ? "#FB923C" : "#1F2937"} strokeWidth="2" />
                        <text x={cell.x + cell.w / 2} y={cell.y + cell.h / 2 - 6} textAnchor="middle" fill={C.white} fontSize="11" fontFamily="sans-serif" fontWeight="bold">{cell.id}</text>
                        <text x={cell.x + cell.w / 2} y={cell.y + cell.h / 2 + 8} textAnchor="middle" fill={unit?.available ? "#86efac" : "#9CA3AF"} fontSize="9" fontFamily="sans-serif">{unit?.size}</text>
                      </g>
                    );
                  })}
                  {/* Right side units */}
                  {[
                    { id: "B03", x: 350, y: 30, w: 100, h: 160 },
                    { id: "C01", x: 460, y: 30, w: 70, h: 300 },
                  ].map((cell) => {
                    const unit = UNITS.find((u) => u.id === cell.id);
                    const isSelected = floorPlanUnit === cell.id;
                    const isHovered = hoveredUnit === cell.id;
                    const fill = isSelected ? C.orange : isHovered && unit?.available ? "#16a34a" : unit?.available ? "#166534" : "#374151";
                    return (
                      <g
                        key={cell.id}
                        onClick={() => setFloorPlanUnit(cell.id)}
                        onMouseEnter={() => setHoveredUnit(cell.id)}
                        onMouseLeave={() => setHoveredUnit(null)}
                        style={{ cursor: "pointer" }}
                      >
                        <rect x={cell.x} y={cell.y} width={cell.w} height={cell.h} rx="4" fill={fill} stroke={isSelected ? "#FB923C" : "#1F2937"} strokeWidth="2" />
                        <text x={cell.x + cell.w / 2} y={cell.y + cell.h / 2 - 6} textAnchor="middle" fill={C.white} fontSize="11" fontFamily="sans-serif" fontWeight="bold">{cell.id}</text>
                        <text x={cell.x + cell.w / 2} y={cell.y + cell.h / 2 + 8} textAnchor="middle" fill={unit?.available ? "#86efac" : "#9CA3AF"} fontSize="9" fontFamily="sans-serif">{unit?.size}</text>
                      </g>
                    );
                  })}
                  {/* Entrance marker */}
                  <rect x="240" y="350" width="80" height="10" rx="3" fill={C.orange} />
                  <text x="280" y="365" textAnchor="middle" fill={C.orange} fontSize="10" fontFamily="sans-serif">{isUk ? "ВХІД" : "ENTRANCE"}</text>
                </svg>
              </div>

              {/* Unit details panel */}
              <div style={{ background: C.card, borderRadius: 16, padding: 24 }}>
                {!floorPlanUnit ? (
                  <div style={{ textAlign: "center", paddingTop: 60 }}>
                    <div style={{ fontSize: 48, marginBottom: 12 }}>👆</div>
                    <p style={{ color: C.muted, fontSize: 14 }}>
                      {isUk ? "Натисніть на бокс на плані" : "Click a unit on the floor plan"}
                    </p>
                  </div>
                ) : floorPlanUnitData && (
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                      <h3 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>{floorPlanUnitData.id}</h3>
                      <span style={{
                        background: floorPlanUnitData.available ? "#14532d" : "#374151",
                        color: floorPlanUnitData.available ? C.green : C.muted,
                        borderRadius: 20, padding: "4px 12px", fontSize: 12, fontWeight: 700
                      }}>
                        {floorPlanUnitData.available ? (isUk ? "ВІЛЬНИЙ" : "FREE") : (isUk ? "ЗАЙНЯТИЙ" : "OCCUPIED")}
                      </span>
                    </div>
                    {[
                      { label: isUk ? "Розмір" : "Size", value: floorPlanUnitData.size },
                      { label: isUk ? "Площа" : "Area", value: UNIT_SIZES.find((s) => s.label === floorPlanUnitData.size)?.area ?? "—" },
                      { label: isUk ? "Поверх" : "Floor", value: String(floorPlanUnitData.floor) },
                      { label: isUk ? "Ціна" : "Price", value: `₴${floorPlanUnitData.price}/${isUk ? "міс" : "mo"}` },
                    ].map((row) => (
                      <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #374151" }}>
                        <span style={{ color: C.muted, fontSize: 13 }}>{row.label}</span>
                        <span style={{ fontWeight: 600, fontSize: 14 }}>{row.value}</span>
                      </div>
                    ))}
                    <div style={{ marginTop: 16, background: C.dark2, borderRadius: 8, padding: 12, fontSize: 12, color: C.muted }}>
                      {isUk
                        ? UNIT_SIZES.find((s) => s.label === floorPlanUnitData.size)?.uk
                        : UNIT_SIZES.find((s) => s.label === floorPlanUnitData.size)?.en}
                    </div>
                    {floorPlanUnitData.available && (
                      <button
                        onClick={() => { setSelectedUnit(floorPlanUnitData.id); setActiveSection("booking"); setBookingStep(1); }}
                        style={{ marginTop: 20, width: "100%", background: C.orange, border: "none", borderRadius: 10, color: C.white, padding: "12px 0", fontWeight: 700, fontSize: 15, cursor: "pointer" }}
                      >
                        {isUk ? "Забронювати цей бокс" : "Book This Unit"}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── BOOKING FLOW ── */}
        {activeSection === "booking" && (
          <div style={{ maxWidth: 700, margin: "0 auto" }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
              {isUk ? "Бронювання боксу" : "Book a Storage Unit"}
            </h2>
            {/* Step indicators */}
            <div style={{ display: "flex", gap: 8, marginBottom: 32 }}>
              {[1, 2, 3, 4].map((step) => {
                const labels = isUk
                  ? ["Обрати бокс", "Дати", "Дані", "Оплата"]
                  : ["Select Unit", "Dates", "Details", "Payment"];
                return (
                  <div key={step} style={{ flex: 1, textAlign: "center" }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: "50%",
                      background: bookingStep >= step ? C.orange : "#374151",
                      color: bookingStep >= step ? C.white : C.muted,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: 700, fontSize: 14, margin: "0 auto 6px",
                    }}>{step}</div>
                    <div style={{ fontSize: 11, color: bookingStep >= step ? C.steel : C.muted }}>{labels[step - 1]}</div>
                  </div>
                );
              })}
            </div>

            {bookingDone ? (
              <div style={{ background: C.card, borderRadius: 16, padding: 40, textAlign: "center", border: `2px solid ${C.green}` }}>
                <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
                <h3 style={{ fontSize: 24, fontWeight: 700, color: C.green, marginBottom: 8 }}>
                  {isUk ? "Бронювання підтверджено!" : "Booking Confirmed!"}
                </h3>
                <p style={{ color: C.muted }}>
                  {isUk
                    ? `Бокс ${selectedUnit} заброньовано. Деталі надіслано на ${clientEmail}`
                    : `Unit ${selectedUnit} is booked. Details sent to ${clientEmail}`}
                </p>
                <button
                  onClick={() => { setBookingDone(false); setBookingStep(1); setSelectedUnit(null); setActiveSection("catalog"); }}
                  style={{ marginTop: 24, background: C.orange, border: "none", borderRadius: 8, color: C.white, padding: "12px 32px", fontWeight: 700, cursor: "pointer" }}
                >
                  {isUk ? "До каталогу" : "Back to Catalog"}
                </button>
              </div>
            ) : (
              <div style={{ background: C.card, borderRadius: 16, padding: 32 }}>
                {/* Step 1: Select unit */}
                {bookingStep === 1 && (
                  <div>
                    <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>
                      {isUk ? "Оберіть бокс" : "Select a Unit"}
                    </h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {UNITS.filter((u) => u.available).map((u) => {
                        const sizeData = UNIT_SIZES.find((s) => s.label === u.size);
                        return (
                          <div
                            key={u.id}
                            onClick={() => setSelectedUnit(u.id)}
                            style={{
                              padding: "14px 18px", borderRadius: 10, cursor: "pointer",
                              border: `2px solid ${selectedUnit === u.id ? C.orange : "#4B5563"}`,
                              background: selectedUnit === u.id ? "#422006" : C.dark2,
                              display: "flex", justifyContent: "space-between", alignItems: "center",
                            }}
                          >
                            <div>
                              <span style={{ fontWeight: 700, marginRight: 12 }}>{u.id}</span>
                              <span style={{ color: C.muted, fontSize: 13 }}>{u.size} · {sizeData?.area} · {isUk ? "Поверх" : "Floor"} {u.floor}</span>
                            </div>
                            <span style={{ fontWeight: 700, color: C.orange }}>₴{u.price}/{isUk ? "міс" : "mo"}</span>
                          </div>
                        );
                      })}
                    </div>
                    <button
                      disabled={!selectedUnit}
                      onClick={() => setBookingStep(2)}
                      style={{ marginTop: 24, width: "100%", background: selectedUnit ? C.orange : "#4B5563", border: "none", borderRadius: 10, color: C.white, padding: "14px 0", fontWeight: 700, fontSize: 15, cursor: selectedUnit ? "pointer" : "not-allowed" }}
                    >
                      {isUk ? "Далі →" : "Next →"}
                    </button>
                  </div>
                )}

                {/* Step 2: Dates */}
                {bookingStep === 2 && (
                  <div>
                    <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>
                      {isUk ? "Дата початку та тривалість" : "Start Date & Duration"}
                    </h3>
                    <div style={{ marginBottom: 16 }}>
                      <label style={{ display: "block", color: C.muted, fontSize: 13, marginBottom: 6 }}>{isUk ? "Дата початку" : "Start Date"}</label>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        style={{ width: "100%", background: C.dark2, border: "1px solid #4B5563", borderRadius: 8, padding: "10px 14px", color: C.white, fontSize: 15, boxSizing: "border-box" }}
                      />
                    </div>
                    <div style={{ marginBottom: 20 }}>
                      <label style={{ display: "block", color: C.muted, fontSize: 13, marginBottom: 6 }}>{isUk ? "Тривалість (місяців)" : "Duration (months)"}</label>
                      <select
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        style={{ width: "100%", background: C.dark2, border: "1px solid #4B5563", borderRadius: 8, padding: "10px 14px", color: C.white, fontSize: 15 }}
                      >
                        {["1", "2", "3", "6", "12"].map((m) => (
                          <option key={m} value={m}>{m} {isUk ? "міс." : "mo."}</option>
                        ))}
                      </select>
                    </div>
                    {startDate && (
                      <div style={{ background: C.dark2, borderRadius: 8, padding: 14, marginBottom: 16, fontSize: 13, color: C.muted }}>
                        {isUk ? "Орієнтовна вартість:" : "Estimated cost:"}{" "}
                        <span style={{ color: C.white, fontWeight: 700 }}>
                          ₴{(UNITS.find((u) => u.id === selectedUnit)?.price ?? 0) * Number(duration)}
                        </span>
                      </div>
                    )}
                    <div style={{ display: "flex", gap: 12 }}>
                      <button onClick={() => setBookingStep(1)} style={{ flex: 1, background: "#374151", border: "none", borderRadius: 10, color: C.steel, padding: "14px 0", fontWeight: 600, cursor: "pointer" }}>
                        {isUk ? "← Назад" : "← Back"}
                      </button>
                      <button
                        disabled={!startDate}
                        onClick={() => setBookingStep(3)}
                        style={{ flex: 2, background: startDate ? C.orange : "#4B5563", border: "none", borderRadius: 10, color: C.white, padding: "14px 0", fontWeight: 700, cursor: startDate ? "pointer" : "not-allowed" }}
                      >
                        {isUk ? "Далі →" : "Next →"}
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Personal info */}
                {bookingStep === 3 && (
                  <div>
                    <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>
                      {isUk ? "Особисті дані" : "Personal Information"}
                    </h3>
                    {[
                      { label: isUk ? "Ім'я та прізвище" : "Full Name", value: clientName, setter: setClientName, type: "text" },
                      { label: isUk ? "Телефон" : "Phone", value: clientPhone, setter: setClientPhone, type: "tel" },
                      { label: "Email", value: clientEmail, setter: setClientEmail, type: "email" },
                    ].map((field) => (
                      <div key={field.label} style={{ marginBottom: 16 }}>
                        <label style={{ display: "block", color: C.muted, fontSize: 13, marginBottom: 6 }}>{field.label}</label>
                        <input
                          type={field.type}
                          value={field.value}
                          onChange={(e) => field.setter(e.target.value)}
                          style={{ width: "100%", background: C.dark2, border: "1px solid #4B5563", borderRadius: 8, padding: "10px 14px", color: C.white, fontSize: 15, boxSizing: "border-box" }}
                        />
                      </div>
                    ))}
                    <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                      <button onClick={() => setBookingStep(2)} style={{ flex: 1, background: "#374151", border: "none", borderRadius: 10, color: C.steel, padding: "14px 0", fontWeight: 600, cursor: "pointer" }}>
                        {isUk ? "← Назад" : "← Back"}
                      </button>
                      <button
                        disabled={!clientName || !clientPhone || !clientEmail}
                        onClick={() => setBookingStep(4)}
                        style={{ flex: 2, background: (clientName && clientPhone && clientEmail) ? C.orange : "#4B5563", border: "none", borderRadius: 10, color: C.white, padding: "14px 0", fontWeight: 700, cursor: (clientName && clientPhone && clientEmail) ? "pointer" : "not-allowed" }}
                      >
                        {isUk ? "Далі →" : "Next →"}
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 4: Payment */}
                {bookingStep === 4 && (
                  <div>
                    <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>
                      {isUk ? "Підтвердження та оплата" : "Confirm & Pay"}
                    </h3>
                    <div style={{ background: C.dark2, borderRadius: 10, padding: 18, marginBottom: 20 }}>
                      {[
                        { k: isUk ? "Бокс" : "Unit", v: selectedUnit ?? "—" },
                        { k: isUk ? "Початок" : "Start", v: startDate },
                        { k: isUk ? "Тривалість" : "Duration", v: `${duration} ${isUk ? "міс." : "mo."}` },
                        { k: isUk ? "Клієнт" : "Client", v: clientName },
                        { k: isUk ? "Всього" : "Total", v: `₴${(UNITS.find((u) => u.id === selectedUnit)?.price ?? 0) * Number(duration)}` },
                      ].map((row) => (
                        <div key={row.k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #374151" }}>
                          <span style={{ color: C.muted, fontSize: 13 }}>{row.k}</span>
                          <span style={{ fontWeight: 600 }}>{row.v}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
                      {["💳 Card", "🏦 Bank", "📱 Apple Pay"].map((pm) => (
                        <div key={pm} style={{ flex: 1, background: "#374151", borderRadius: 8, padding: "10px 6px", textAlign: "center", fontSize: 12, cursor: "pointer" }}>{pm}</div>
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: 12 }}>
                      <button onClick={() => setBookingStep(3)} style={{ flex: 1, background: "#374151", border: "none", borderRadius: 10, color: C.steel, padding: "14px 0", fontWeight: 600, cursor: "pointer" }}>
                        {isUk ? "← Назад" : "← Back"}
                      </button>
                      <button
                        onClick={() => setBookingDone(true)}
                        style={{ flex: 2, background: C.green, border: "none", borderRadius: 10, color: C.white, padding: "14px 0", fontWeight: 700, fontSize: 15, cursor: "pointer" }}
                      >
                        {isUk ? "Підтвердити та оплатити" : "Confirm & Pay"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── FOR BUSINESS ── */}
        {activeSection === "business" && (
          <div>
            <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
              {isUk ? "Рішення для бізнесу" : "Business Solutions"}
            </h2>
            <p style={{ color: C.muted, marginBottom: 32 }}>
              {isUk ? "Корпоративні умови для компаній, що зберігають товари, обладнання або документи" : "Corporate terms for businesses storing goods, equipment, or documents"}
            </p>
            {/* Benefits grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 40 }}>
              {[
                { icon: "💼", en: "Dedicated manager", uk: "Особистий менеджер", descEn: "Single point of contact for all your units", descUk: "Єдина точка контакту для всіх боксів" },
                { icon: "💰", en: "Corporate rates", uk: "Корпоративні ставки", descEn: "Discounts from 15% for 3+ units", descUk: "Знижки від 15% від 3+ боксів" },
                { icon: "📄", en: "Monthly invoicing", uk: "Щомісячні рахунки", descEn: "Consolidated invoice for accounting", descUk: "Зведений рахунок для бухгалтерії" },
                { icon: "🔑", en: "Multi-user access", uk: "Доступ для команди", descEn: "Up to 10 access cards per account", descUk: "До 10 карток доступу на акаунт" },
                { icon: "📦", en: "Goods in/out service", uk: "Прийом/видача товарів", descEn: "Staff handles receiving and dispatch", descUk: "Персонал приймає та видає товари" },
                { icon: "📊", en: "Stock reporting", uk: "Звітність по запасах", descEn: "Monthly inventory reports", descUk: "Щомісячні звіти по залишках" },
              ].map((b) => (
                <div key={b.en} style={{ background: C.card, borderRadius: 12, padding: 20 }}>
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{b.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{isUk ? b.uk : b.en}</div>
                  <div style={{ color: C.muted, fontSize: 13 }}>{isUk ? b.descUk : b.descEn}</div>
                </div>
              ))}
            </div>

            {/* Corporate rates form */}
            <div style={{ background: C.card, borderRadius: 16, padding: 32, maxWidth: 600 }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>
                {isUk ? "Запит на корпоративні умови" : "Request Corporate Terms"}
              </h3>
              {bizSent ? (
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
                  <p style={{ color: C.green, fontWeight: 600 }}>{isUk ? "Запит відправлено! Зв'яжемося протягом 2 годин." : "Request sent! We'll contact you within 2 hours."}</p>
                </div>
              ) : (
                <>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                    <div>
                      <label style={{ display: "block", color: C.muted, fontSize: 12, marginBottom: 4 }}>{isUk ? "Назва компанії" : "Company Name"}</label>
                      <input value={bizName} onChange={(e) => setBizName(e.target.value)} style={{ width: "100%", background: C.dark2, border: "1px solid #4B5563", borderRadius: 8, padding: "9px 12px", color: C.white, fontSize: 14, boxSizing: "border-box" }} />
                    </div>
                    <div>
                      <label style={{ display: "block", color: C.muted, fontSize: 12, marginBottom: 4 }}>{isUk ? "Контактна особа" : "Contact Person"}</label>
                      <input value={bizContact} onChange={(e) => setBizContact(e.target.value)} style={{ width: "100%", background: C.dark2, border: "1px solid #4B5563", borderRadius: 8, padding: "9px 12px", color: C.white, fontSize: 14, boxSizing: "border-box" }} />
                    </div>
                  </div>
                  <div style={{ marginBottom: 20 }}>
                    <label style={{ display: "block", color: C.muted, fontSize: 12, marginBottom: 4 }}>{isUk ? "Необхідний розмір боксу" : "Required Unit Size"}</label>
                    <select value={bizSize} onChange={(e) => setBizSize(e.target.value)} style={{ width: "100%", background: C.dark2, border: "1px solid #4B5563", borderRadius: 8, padding: "9px 12px", color: C.white, fontSize: 14 }}>
                      {UNIT_SIZES.map((s) => (
                        <option key={s.id} value={s.id}>{s.label} — {s.area} — ₴{s.price}/{isUk ? "міс" : "mo"}</option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={() => { if (bizName && bizContact) setBizSent(true); }}
                    style={{ width: "100%", background: C.orange, border: "none", borderRadius: 10, color: C.white, padding: "13px 0", fontWeight: 700, fontSize: 15, cursor: "pointer" }}
                  >
                    {isUk ? "Відправити запит" : "Send Request"}
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div style={{ background: C.dark2, borderTop: "1px solid #374151", padding: "24px", textAlign: "center", marginTop: 40 }}>
        <p style={{ color: C.muted, fontSize: 13, margin: 0 }}>
          © 2025 StoreRoom · {isUk ? "Надійне зберігання для всіх" : "Reliable storage for everyone"} · +380 44 000 0000
        </p>
      </div>
    </div>
  );
}
