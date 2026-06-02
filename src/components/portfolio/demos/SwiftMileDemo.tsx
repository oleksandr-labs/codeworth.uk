"use client";

import { useState } from "react";

export function SwiftMileDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  /* ── Price calculator state ── */
  const [fromZone, setFromZone] = useState("center");
  const [toZone, setToZone] = useState("rightbank");
  const [pkgSize, setPkgSize] = useState("s");
  const [timing, setTiming] = useState("now");
  const [addFragile, setAddFragile] = useState(false);
  const [addFloor, setAddFloor] = useState(false);
  const [addReturn, setAddReturn] = useState(false);
  const [addWait, setAddWait] = useState(false);
  const [calcResult, setCalcResult] = useState(false);

  /* ── Tracker state ── */
  const [trackInput, setTrackInput] = useState("");
  const [trackResult, setTrackResult] = useState(false);

  /* ── Business form ── */
  const [bizCompany, setBizCompany] = useState("");
  const [bizEmail, setBizEmail] = useState("");
  const [bizVolume, setBizVolume] = useState("50-200");
  const [bizSent, setBizSent] = useState(false);

  /* ── Active nav ── */
  const [activeSection, setActiveSection] = useState<"home" | "calculator" | "tariffs" | "tracker" | "fleet" | "business">("home");

  /* ─────────────── DATA ─────────────── */

  const ZONES = [
    { id: "center", en: "Center", uk: "Центр" },
    { id: "rightbank", en: "Right Bank", uk: "Правий берег" },
    { id: "leftbank", en: "Left Bank", uk: "Лівий берег" },
    { id: "suburbs", en: "Suburbs", uk: "Передмістя" },
  ];

  const PACKAGES = [
    { id: "s", label: "S", en: "up to 3 kg", uk: "до 3 кг", baseMulti: 1 },
    { id: "m", label: "M", en: "up to 10 kg", uk: "до 10 кг", baseMulti: 1.4 },
    { id: "l", label: "L", en: "up to 25 kg", uk: "до 25 кг", baseMulti: 1.8 },
    { id: "xl", label: "XL", en: "Furniture", uk: "Меблі", baseMulti: 2.8 },
  ];

  const TIMINGS = [
    { id: "now", en: "Right Now", uk: "Прямо зараз", surcharge: 1.2, timeEn: "~45 min", timeUk: "~45 хв" },
    { id: "scheduled", en: "Scheduled", uk: "Запланована", surcharge: 1.0, timeEn: "As planned", timeUk: "За графіком" },
    { id: "eod", en: "By End of Day", uk: "До кінця дня", surcharge: 0.85, timeEn: "Before 20:00", timeUk: "До 20:00" },
  ];

  /* Base prices table: from × to (center, rightbank, leftbank, suburbs) */
  const BASE_PRICES: Record<string, Record<string, number>> = {
    center:    { center: 80,  rightbank: 120, leftbank: 140, suburbs: 200 },
    rightbank: { center: 120, rightbank: 90,  leftbank: 160, suburbs: 220 },
    leftbank:  { center: 140, rightbank: 160, leftbank: 90,  suburbs: 230 },
    suburbs:   { center: 200, rightbank: 220, leftbank: 230, suburbs: 150 },
  };

  const TRACK_STAGES = [
    { id: 1, en: "Accepted", uk: "Прийнято", icon: "📋", time: "14:02" },
    { id: 2, en: "Sorting", uk: "Сортування", icon: "🏭", time: "14:18" },
    { id: 3, en: "On the Way", uk: "В дорозі", icon: "🛵", time: "14:35" },
    { id: 4, en: "Arrived", uk: "Прибуло", icon: "📍", time: "15:10" },
    { id: 5, en: "Delivered", uk: "Доставлено", icon: "✅", time: "15:22" },
  ];

  const DEMO_TRACK_STAGE = 3; // courier is currently "On the Way"

  const FLEET = [
    {
      icon: "🚲",
      en: "Bicycle",
      uk: "Велосипед",
      capacityEn: "Up to 10 kg · Up to 40×30×30 cm",
      capacityUk: "До 10 кг · До 40×30×30 см",
      timeEn: "25–40 min",
      timeUk: "25–40 хв",
      note: "CO₂-free, city center",
    },
    {
      icon: "🏍️",
      en: "Motorcycle",
      uk: "Мотоцикл",
      capacityEn: "Up to 25 kg · Up to 60×50×50 cm",
      capacityUk: "До 25 кг · До 60×50×50 см",
      timeEn: "30–50 min",
      timeUk: "30–50 хв",
      note: "City + suburbs",
    },
    {
      icon: "🚐",
      en: "Van (up to 1t)",
      uk: "Мікроавтобус (до 1 т)",
      capacityEn: "Up to 1000 kg · Full load",
      capacityUk: "До 1000 кг · Повне завантаження",
      timeEn: "60–90 min",
      timeUk: "60–90 хв",
      note: "Furniture & business cargo",
    },
  ];

  const BIZ_BENEFITS = [
    { icon: "🔗", en: "REST API integration", uk: "REST API інтеграція", descEn: "Connect your shop/WMS in 15 minutes", descUk: "Підключіть магазин/WMS за 15 хвилин" },
    { icon: "📉", en: "Volume discounts", uk: "Знижки за обсяг", descEn: "From -10% at 50 deliveries/month", descUk: "Від -10% при 50 доставках/місяць" },
    { icon: "📊", en: "Merchant dashboard", uk: "Дашборд мерчанта", descEn: "Live stats, analytics & returns", descUk: "Статистика, аналітика та повернення" },
    { icon: "🧾", en: "Auto invoicing", uk: "Авто-виставлення рахунків", descEn: "Daily or monthly reconciliation", descUk: "Щоденна або щомісячна звірка" },
    { icon: "🎯", en: "Dedicated SLA", uk: "Виділений SLA", descEn: "98% on-time guarantee", descUk: "Гарантія 98% вчасних доставок" },
    { icon: "🛡️", en: "Cargo insurance", uk: "Страхування вантажу", descEn: "Up to ₴50,000 per shipment", descUk: "До ₴50,000 на відправлення" },
  ];

  /* ─────────────── CALC LOGIC ─────────────── */

  const computePrice = () => {
    const base = BASE_PRICES[fromZone]?.[toZone] ?? 120;
    const pkgMul = PACKAGES.find((p) => p.id === pkgSize)?.baseMulti ?? 1;
    const timeMul = TIMINGS.find((t) => t.id === timing)?.surcharge ?? 1;
    let price = base * pkgMul * timeMul;
    if (addFragile) price *= 1.2;
    if (addFloor) price += 50;
    if (addReturn) price *= 1.5;
    if (addWait) price += 40;
    return Math.round(price);
  };

  const computeTime = () => TIMINGS.find((t) => t.id === timing)?.[isUk ? "timeUk" : "timeEn"] ?? "~45 min";

  /* ─────────────── COLORS ─────────────── */
  const C = {
    orange: "#EA580C",
    orangeLight: "#FB923C",
    white: "#FFFFFF",
    charcoal: "#111827",
    card: "#1F2937",
    muted: "#9CA3AF",
    steel: "#E5E7EB",
    green: "#22C55E",
    border: "#374151",
  };

  const navItems = [
    { id: "home", en: "Home", uk: "Головна" },
    { id: "calculator", en: "Price Calc", uk: "Калькулятор" },
    { id: "tariffs", en: "Tariffs", uk: "Тарифи" },
    { id: "tracker", en: "Track", uk: "Відстежити" },
    { id: "fleet", en: "Fleet", uk: "Транспорт" },
    { id: "business", en: "For Business", uk: "Бізнесу" },
  ] as const;

  /* ─────────────── RENDER ─────────────── */
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: C.charcoal, color: C.white, minHeight: "100vh" }}>

      {/* NAVBAR */}
      <nav style={{ background: C.charcoal, borderBottom: `1px solid ${C.border}`, position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 62 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ background: C.orange, borderRadius: 8, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🛵</div>
            <span style={{ fontWeight: 800, fontSize: 20, letterSpacing: "-0.5px" }}>SwiftMile</span>
          </div>
          <div style={{ display: "flex", gap: 2 }}>
            {navItems.map((n) => (
              <button
                key={n.id}
                onClick={() => setActiveSection(n.id)}
                style={{
                  background: activeSection === n.id ? C.orange : "transparent",
                  color: activeSection === n.id ? C.white : C.muted,
                  border: "none", borderRadius: 6, padding: "6px 13px",
                  fontSize: 13, fontWeight: 500, cursor: "pointer",
                }}
              >
                {isUk ? n.uk : n.en}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO — visible only on home */}
      {activeSection === "home" && (
        <div style={{ background: `linear-gradient(135deg, ${C.charcoal} 0%, #1a0f00 50%, ${C.charcoal} 100%)`, padding: "72px 24px 60px", textAlign: "center", borderBottom: `3px solid ${C.orange}` }}>
          <div style={{ display: "inline-block", background: "#7c2d12", color: C.orangeLight, borderRadius: 20, padding: "4px 14px", fontSize: 12, fontWeight: 700, letterSpacing: 2, marginBottom: 20 }}>
            {isUk ? "МІСЬКА ДОСТАВКА" : "CITY DELIVERY"}
          </div>
          <h1 style={{ fontSize: 44, fontWeight: 900, lineHeight: 1.15, margin: "0 0 20px", maxWidth: 640, marginLeft: "auto", marginRight: "auto" }}>
            {isUk ? "Міська доставка —" : "City delivery —"}
            <br />
            <span style={{ color: C.orange }}>
              {isUk ? "від дверей до дверей за 2 години" : "door to door in 2 hours"}
            </span>
          </h1>
          <p style={{ color: C.muted, fontSize: 17, maxWidth: 520, margin: "0 auto 40px" }}>
            {isUk
              ? "Кур'єри по всьому місту. Відстеження в реальному часі. Гарантована доставка."
              : "Couriers across the city. Real-time tracking. Guaranteed delivery."}
          </p>
          {/* Live counters */}
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 36 }}>
            {[
              { icon: "🛵", value: "847", label: isUk ? "кур'єрів онлайн" : "couriers online" },
              { icon: "⏱️", value: "1:45h", label: isUk ? "середній час" : "avg. time" },
              { icon: "📦", value: "23,450", label: isUk ? "доставок сьогодні" : "deliveries today" },
            ].map((stat) => (
              <div key={stat.label} style={{ background: "#1a0f00", border: `1px solid #7c2d12`, borderRadius: 12, padding: "16px 28px", textAlign: "center" }}>
                <div style={{ fontSize: 22, marginBottom: 4 }}>{stat.icon}</div>
                <div style={{ fontSize: 24, fontWeight: 900, color: C.orange }}>{stat.value}</div>
                <div style={{ fontSize: 12, color: C.muted }}>{stat.label}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
            <button
              onClick={() => setActiveSection("calculator")}
              style={{ background: C.orange, border: "none", borderRadius: 10, color: C.white, padding: "14px 32px", fontWeight: 700, fontSize: 16, cursor: "pointer" }}
            >
              {isUk ? "Розрахувати ціну" : "Get a Price"}
            </button>
            <button
              onClick={() => setActiveSection("tracker")}
              style={{ background: "transparent", border: `2px solid ${C.border}`, borderRadius: 10, color: C.muted, padding: "14px 32px", fontWeight: 600, fontSize: 16, cursor: "pointer" }}
            >
              {isUk ? "Відстежити посилку" : "Track a Parcel"}
            </button>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>

        {/* ── HOME: service cards ── */}
        {activeSection === "home" && (
          <div>
            <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 24 }}>
              {isUk ? "Чому SwiftMile?" : "Why SwiftMile?"}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
              {[
                { icon: "⚡", en: "Express Delivery", uk: "Експрес-доставка", descEn: "Picked up and delivered in under 2 hours", descUk: "Забрали та доставили менш ніж за 2 години" },
                { icon: "📍", en: "Live Tracking", uk: "Відстеження онлайн", descEn: "Watch your courier move in real time", descUk: "Стежте за рухом кур'єра в реальному часі" },
                { icon: "💰", en: "Fixed Prices", uk: "Фіксовані ціни", descEn: "No hidden fees, price shown upfront", descUk: "Без прихованих платежів, ціна одразу" },
                { icon: "🔒", en: "Insured Cargo", uk: "Застрахований вантаж", descEn: "Every shipment covered up to ₴50,000", descUk: "Кожне відправлення до ₴50,000" },
                { icon: "🌙", en: "Night Delivery", uk: "Нічна доставка", descEn: "Available until midnight every day", descUk: "Доступна до півночі щодня" },
                { icon: "🔄", en: "Easy Returns", uk: "Легкі повернення", descEn: "One click return from the app", descUk: "Повернення одним кліком" },
              ].map((s) => (
                <div key={s.en} style={{ background: C.card, borderRadius: 12, padding: 20, border: `1px solid ${C.border}` }}>
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{s.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{isUk ? s.uk : s.en}</div>
                  <div style={{ color: C.muted, fontSize: 13 }}>{isUk ? s.descUk : s.descEn}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── PRICE CALCULATOR ── */}
        {activeSection === "calculator" && (
          <div>
            <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
              {isUk ? "Калькулятор вартості" : "Delivery Price Calculator"}
            </h2>
            <p style={{ color: C.muted, marginBottom: 28 }}>
              {isUk ? "Вкажіть параметри доставки — отримайте точну ціну" : "Enter delivery parameters to get an exact price"}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
              {/* Left: inputs */}
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {/* From / To */}
                <div style={{ background: C.card, borderRadius: 12, padding: 20 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14, color: C.orange }}>
                    {isUk ? "Звідки / Куди" : "From / To Zone"}
                  </h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div>
                      <label style={{ display: "block", color: C.muted, fontSize: 12, marginBottom: 5 }}>{isUk ? "Зона відправлення" : "From"}</label>
                      <select value={fromZone} onChange={(e) => { setFromZone(e.target.value); setCalcResult(false); }} style={{ width: "100%", background: "#111827", border: `1px solid ${C.border}`, borderRadius: 8, padding: "9px 12px", color: C.white, fontSize: 14 }}>
                        {ZONES.map((z) => <option key={z.id} value={z.id}>{isUk ? z.uk : z.en}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ display: "block", color: C.muted, fontSize: 12, marginBottom: 5 }}>{isUk ? "Зона доставки" : "To"}</label>
                      <select value={toZone} onChange={(e) => { setToZone(e.target.value); setCalcResult(false); }} style={{ width: "100%", background: "#111827", border: `1px solid ${C.border}`, borderRadius: 8, padding: "9px 12px", color: C.white, fontSize: 14 }}>
                        {ZONES.map((z) => <option key={z.id} value={z.id}>{isUk ? z.uk : z.en}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Package size */}
                <div style={{ background: C.card, borderRadius: 12, padding: 20 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14, color: C.orange }}>
                    {isUk ? "Розмір посилки" : "Package Size"}
                  </h3>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
                    {PACKAGES.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => { setPkgSize(p.id); setCalcResult(false); }}
                        style={{
                          background: pkgSize === p.id ? "#7c2d12" : "#111827",
                          border: `2px solid ${pkgSize === p.id ? C.orange : C.border}`,
                          borderRadius: 10, padding: "10px 6px", textAlign: "center", cursor: "pointer",
                        }}
                      >
                        <div style={{ fontWeight: 800, fontSize: 18, color: pkgSize === p.id ? C.orange : C.white }}>{p.label}</div>
                        <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>{isUk ? p.uk : p.en}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timing */}
                <div style={{ background: C.card, borderRadius: 12, padding: 20 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14, color: C.orange }}>
                    {isUk ? "Час доставки" : "Delivery Timing"}
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {TIMINGS.map((t) => (
                      <label key={t.id} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", padding: "8px 12px", borderRadius: 8, background: timing === t.id ? "#7c2d12" : "transparent", border: `1px solid ${timing === t.id ? C.orange : C.border}` }}>
                        <div
                          onClick={() => { setTiming(t.id); setCalcResult(false); }}
                          style={{ width: 16, height: 16, borderRadius: "50%", border: `2px solid ${timing === t.id ? C.orange : "#4B5563"}`, background: timing === t.id ? C.orange : "transparent", flexShrink: 0, cursor: "pointer" }}
                        />
                        <div>
                          <span style={{ fontSize: 14, fontWeight: 500 }}>{isUk ? t.uk : t.en}</span>
                          {t.surcharge !== 1 && (
                            <span style={{ marginLeft: 8, fontSize: 11, color: t.surcharge > 1 ? "#FCA5A5" : "#86efac" }}>
                              {t.surcharge > 1 ? `+${Math.round((t.surcharge - 1) * 100)}%` : `-${Math.round((1 - t.surcharge) * 100)}%`}
                            </span>
                          )}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Extra options */}
                <div style={{ background: C.card, borderRadius: 12, padding: 20 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14, color: C.orange }}>
                    {isUk ? "Додаткові послуги" : "Additional Options"}
                  </h3>
                  {[
                    { state: addFragile, setter: setAddFragile, en: "Fragile items (+20%)", uk: "Крихкий вантаж (+20%)" },
                    { state: addFloor, setter: setAddFloor, en: "Floor delivery (+₴50)", uk: "Підйом на поверх (+₴50)" },
                    { state: addReturn, setter: setAddReturn, en: "Return delivery (×1.5)", uk: "Зворотна доставка (×1.5)" },
                    { state: addWait, setter: setAddWait, en: "Courier waits (+₴40)", uk: "Кур'єр чекає (+₴40)" },
                  ].map((opt) => (
                    <label key={opt.en} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", marginBottom: 10 }}>
                      <div
                        onClick={() => { opt.setter(!opt.state); setCalcResult(false); }}
                        style={{ width: 18, height: 18, borderRadius: 4, border: `2px solid ${opt.state ? C.orange : "#4B5563"}`, background: opt.state ? C.orange : "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}
                      >
                        {opt.state && <span style={{ color: C.white, fontSize: 11, fontWeight: 700 }}>✓</span>}
                      </div>
                      <span style={{ fontSize: 13, color: opt.state ? C.white : C.muted }}>{isUk ? opt.uk : opt.en}</span>
                    </label>
                  ))}
                </div>

                <button
                  onClick={() => setCalcResult(true)}
                  style={{ background: C.orange, border: "none", borderRadius: 10, color: C.white, padding: "14px 0", fontWeight: 700, fontSize: 16, cursor: "pointer" }}
                >
                  {isUk ? "Розрахувати" : "Calculate Price"}
                </button>
              </div>

              {/* Right: result */}
              <div>
                {!calcResult ? (
                  <div style={{ background: C.card, borderRadius: 16, padding: 40, textAlign: "center", border: `2px dashed ${C.border}`, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ fontSize: 56, marginBottom: 16 }}>🛵</div>
                    <p style={{ color: C.muted, fontSize: 15 }}>
                      {isUk ? "Заповніть форму та натисніть «Розрахувати»" : "Fill in the form and click Calculate"}
                    </p>
                  </div>
                ) : (
                  <div>
                    <div style={{ background: `linear-gradient(135deg, #7c2d12 0%, #1a0f00 100%)`, border: `2px solid ${C.orange}`, borderRadius: 16, padding: 28, textAlign: "center", marginBottom: 16 }}>
                      <div style={{ color: C.orangeLight, fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>
                        {isUk ? "ВАРТІСТЬ ДОСТАВКИ" : "DELIVERY PRICE"}
                      </div>
                      <div style={{ fontSize: 56, fontWeight: 900, lineHeight: 1 }}>₴{computePrice()}</div>
                      <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 16 }}>
                        <div style={{ textAlign: "center" }}>
                          <div style={{ color: C.muted, fontSize: 11 }}>{isUk ? "ЧАС" : "TIME"}</div>
                          <div style={{ fontWeight: 700, fontSize: 16, color: C.orangeLight }}>{computeTime()}</div>
                        </div>
                        <div style={{ textAlign: "center" }}>
                          <div style={{ color: C.muted, fontSize: 11 }}>{isUk ? "СТРАХОВКА" : "INSURANCE"}</div>
                          <div style={{ fontWeight: 700, fontSize: 16, color: C.green }}>✓</div>
                        </div>
                      </div>
                    </div>
                    {/* Breakdown */}
                    <div style={{ background: C.card, borderRadius: 12, padding: 18, marginBottom: 16 }}>
                      <div style={{ fontWeight: 700, fontSize: 13, color: C.muted, marginBottom: 12 }}>
                        {isUk ? "ДЕТАЛІ РОЗРАХУНКУ" : "PRICE BREAKDOWN"}
                      </div>
                      {[
                        { label: isUk ? "Базова ставка" : "Base rate", value: `₴${BASE_PRICES[fromZone]?.[toZone] ?? 120}` },
                        { label: isUk ? "Розмір посилки" : "Package size", value: PACKAGES.find((p) => p.id === pkgSize)?.label ?? "" },
                        { label: isUk ? "Тайминг" : "Timing", value: TIMINGS.find((t) => t.id === timing)?.[isUk ? "uk" : "en"] ?? "" },
                        ...(addFragile ? [{ label: isUk ? "Крихкий" : "Fragile", value: "+20%" }] : []),
                        ...(addFloor ? [{ label: isUk ? "Підйом" : "Floor delivery", value: "+₴50" }] : []),
                        ...(addReturn ? [{ label: isUk ? "Повернення" : "Return", value: "×1.5" }] : []),
                        ...(addWait ? [{ label: isUk ? "Очікування" : "Courier waits", value: "+₴40" }] : []),
                      ].map((row) => (
                        <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #374151", fontSize: 13 }}>
                          <span style={{ color: C.muted }}>{row.label}</span>
                          <span style={{ color: C.steel }}>{row.value}</span>
                        </div>
                      ))}
                    </div>
                    <button style={{ width: "100%", background: C.orange, border: "none", borderRadius: 10, color: C.white, padding: "14px 0", fontWeight: 700, fontSize: 16, cursor: "pointer" }}>
                      {isUk ? "Замовити доставку" : "Order Now"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── TARIFF GRID ── */}
        {activeSection === "tariffs" && (
          <div>
            <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
              {isUk ? "Тарифна сітка" : "Zone Tariff Grid"}
            </h2>
            <p style={{ color: C.muted, marginBottom: 28 }}>
              {isUk ? "Базові ціни (₴) для посилки S. Для більших розмірів застосовується множник." : "Base prices (₴) for size S parcel. Multiplier applied for larger sizes."}
            </p>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", background: C.card, borderRadius: 12, overflow: "hidden" }}>
                <thead>
                  <tr style={{ background: "#374151" }}>
                    <th style={{ padding: "14px 18px", textAlign: "left", fontSize: 13, color: C.muted, fontWeight: 600 }}>
                      {isUk ? "ЗВІДКИ / КУДИ" : "FROM / TO"}
                    </th>
                    {ZONES.map((z) => (
                      <th key={z.id} style={{ padding: "14px 18px", textAlign: "center", fontSize: 13, color: C.orange, fontWeight: 700 }}>
                        {isUk ? z.uk : z.en}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ZONES.map((rowZone, ri) => (
                    <tr key={rowZone.id} style={{ background: ri % 2 === 0 ? C.card : "#263244" }}>
                      <td style={{ padding: "12px 18px", fontWeight: 700, fontSize: 14, color: C.orangeLight }}>
                        {isUk ? rowZone.uk : rowZone.en}
                      </td>
                      {ZONES.map((colZone) => {
                        const price = BASE_PRICES[rowZone.id]?.[colZone.id] ?? 0;
                        const isSame = rowZone.id === colZone.id;
                        return (
                          <td key={colZone.id} style={{ padding: "12px 18px", textAlign: "center", fontSize: 15, fontWeight: isSame ? 400 : 700, color: isSame ? C.muted : C.white }}>
                            {isSame ? "—" : `₴${price}`}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Size multipliers */}
            <h3 style={{ fontSize: 18, fontWeight: 700, marginTop: 36, marginBottom: 16 }}>
              {isUk ? "Множники за розміром" : "Size Multipliers"}
            </h3>
            <div style={{ display: "flex", gap: 12 }}>
              {PACKAGES.map((p) => (
                <div key={p.id} style={{ flex: 1, background: C.card, borderRadius: 10, padding: 16, textAlign: "center", border: `1px solid ${C.border}` }}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: C.orange }}>{p.label}</div>
                  <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>{isUk ? p.uk : p.en}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: C.white, marginTop: 8 }}>×{p.baseMulti}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TRACKER ── */}
        {activeSection === "tracker" && (
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
              {isUk ? "Відстеження відправлення" : "Shipment Tracker"}
            </h2>
            <p style={{ color: C.muted, marginBottom: 24 }}>
              {isUk ? "Введіть номер відстеження для перегляду статусу" : "Enter tracking number to see status"}
            </p>
            <div style={{ display: "flex", gap: 10, marginBottom: 32 }}>
              <input
                value={trackInput}
                onChange={(e) => { setTrackInput(e.target.value); setTrackResult(false); }}
                placeholder={isUk ? "Наприклад: SM-2024-38291" : "e.g. SM-2024-38291"}
                style={{ flex: 1, background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 16px", color: C.white, fontSize: 15 }}
              />
              <button
                onClick={() => { if (trackInput.length >= 3) setTrackResult(true); }}
                style={{ background: C.orange, border: "none", borderRadius: 10, color: C.white, padding: "12px 24px", fontWeight: 700, cursor: "pointer", fontSize: 15 }}
              >
                {isUk ? "Знайти" : "Track"}
              </button>
            </div>

            {/* Demo hint */}
            {!trackResult && (
              <div style={{ background: "#1a0f00", border: `1px solid #7c2d12`, borderRadius: 10, padding: "12px 16px", marginBottom: 24, fontSize: 13, color: C.muted }}>
                {isUk ? "💡 Введіть будь-який номер для демонстрації" : "💡 Enter any tracking number to see demo data"}
              </div>
            )}

            {trackResult && (
              <div style={{ background: C.card, borderRadius: 16, padding: 28, border: `1px solid ${C.border}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
                  <div>
                    <div style={{ fontSize: 12, color: C.muted, marginBottom: 4 }}>{isUk ? "НОМЕР ВІДСТЕЖЕННЯ" : "TRACKING NUMBER"}</div>
                    <div style={{ fontWeight: 700, fontSize: 17 }}>{trackInput.toUpperCase()}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 12, color: C.muted, marginBottom: 4 }}>{isUk ? "СТАТУС" : "STATUS"}</div>
                    <div style={{ fontWeight: 700, color: C.orange, fontSize: 15 }}>
                      {isUk ? TRACK_STAGES[DEMO_TRACK_STAGE - 1].uk : TRACK_STAGES[DEMO_TRACK_STAGE - 1].en}
                    </div>
                  </div>
                </div>

                {/* 5-stage progress */}
                <div style={{ position: "relative", marginBottom: 32 }}>
                  {/* Track line */}
                  <div style={{ position: "absolute", top: 22, left: "10%", right: "10%", height: 3, background: C.border, borderRadius: 2, zIndex: 0 }} />
                  <div style={{ position: "absolute", top: 22, left: "10%", width: `${((DEMO_TRACK_STAGE - 1) / 4) * 80}%`, height: 3, background: C.orange, borderRadius: 2, zIndex: 1 }} />
                  {/* Stages */}
                  <div style={{ display: "flex", justifyContent: "space-between", position: "relative", zIndex: 2 }}>
                    {TRACK_STAGES.map((stage) => {
                      const done = stage.id < DEMO_TRACK_STAGE;
                      const current = stage.id === DEMO_TRACK_STAGE;
                      return (
                        <div key={stage.id} style={{ textAlign: "center", flex: 1 }}>
                          <div style={{
                            width: 44, height: 44, borderRadius: "50%", margin: "0 auto 8px",
                            background: done ? C.orange : current ? "#7c2d12" : "#374151",
                            border: `3px solid ${done || current ? C.orange : C.border}`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 18,
                            boxShadow: current ? `0 0 0 4px rgba(234,88,12,0.3)` : "none",
                          }}>
                            {done ? "✓" : stage.icon}
                          </div>
                          <div style={{ fontSize: 11, fontWeight: current ? 700 : 400, color: done || current ? C.white : C.muted }}>
                            {isUk ? stage.uk : stage.en}
                          </div>
                          {(done || current) && (
                            <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>{stage.time}</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Delivery details */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {[
                    { label: isUk ? "Відправник" : "Sender", value: isUk ? "Київ, Центр" : "Kyiv, Center" },
                    { label: isUk ? "Одержувач" : "Recipient", value: isUk ? "Оболонь, к. 45" : "Obolon, apt. 45" },
                    { label: isUk ? "Кур'єр" : "Courier", value: "Dmytro K. ⭐ 4.9" },
                    { label: isUk ? "Очікується о" : "ETA", value: "15:40–15:55" },
                  ].map((row) => (
                    <div key={row.label} style={{ background: "#111827", borderRadius: 8, padding: "10px 14px" }}>
                      <div style={{ fontSize: 11, color: C.muted, marginBottom: 3 }}>{row.label}</div>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{row.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── FLEET ── */}
        {activeSection === "fleet" && (
          <div>
            <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
              {isUk ? "Наш транспортний парк" : "Our Fleet"}
            </h2>
            <p style={{ color: C.muted, marginBottom: 32 }}>
              {isUk ? "Правильний транспорт для кожного типу вантажу" : "The right vehicle for every cargo type"}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
              {FLEET.map((v) => (
                <div key={v.en} style={{ background: C.card, borderRadius: 16, padding: 28, border: `1px solid ${C.border}`, textAlign: "center" }}>
                  <div style={{ fontSize: 52, marginBottom: 16 }}>{v.icon}</div>
                  <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 6 }}>{isUk ? v.uk : v.en}</h3>
                  <div style={{ color: C.muted, fontSize: 13, marginBottom: 10 }}>{isUk ? v.capacityUk : v.capacityEn}</div>
                  <div style={{ display: "inline-block", background: "#7c2d12", color: C.orangeLight, borderRadius: 20, padding: "4px 14px", fontSize: 12, fontWeight: 700, marginBottom: 12 }}>
                    {isUk ? v.timeUk : v.timeEn}
                  </div>
                  <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 12, marginTop: 4, color: C.muted, fontSize: 12 }}>
                    {v.note}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── FOR BUSINESS ── */}
        {activeSection === "business" && (
          <div>
            <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
              {isUk ? "SwiftMile для бізнесу" : "SwiftMile for Business"}
            </h2>
            <p style={{ color: C.muted, marginBottom: 32 }}>
              {isUk ? "API, дашборд та корпоративні умови для e-commerce та рітейлу" : "API, dashboard & corporate terms for e-commerce and retail"}
            </p>
            {/* Benefits */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 40 }}>
              {BIZ_BENEFITS.map((b) => (
                <div key={b.en} style={{ background: C.card, borderRadius: 12, padding: 20, border: `1px solid ${C.border}` }}>
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{b.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{isUk ? b.uk : b.en}</div>
                  <div style={{ color: C.muted, fontSize: 13 }}>{isUk ? b.descUk : b.descEn}</div>
                </div>
              ))}
            </div>

            {/* Volume discounts table */}
            <div style={{ background: C.card, borderRadius: 12, padding: 24, marginBottom: 32 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>
                {isUk ? "Знижки за обсягом" : "Volume Discounts"}
              </h3>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    {[isUk ? "Доставок/міс" : "Deliveries/mo", isUk ? "Знижка" : "Discount", isUk ? "Менеджер" : "Manager", "SLA"].map((h) => (
                      <th key={h} style={{ padding: "10px 14px", textAlign: "left", color: C.muted, fontSize: 12, fontWeight: 600, borderBottom: `1px solid ${C.border}` }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { range: "1–49", disc: "—", mgr: isUk ? "Стандарт" : "Standard", sla: "95%" },
                    { range: "50–200", disc: "-10%", mgr: isUk ? "Виділений" : "Dedicated", sla: "97%" },
                    { range: "201–1000", disc: "-20%", mgr: isUk ? "Старший" : "Senior", sla: "98%" },
                    { range: "1000+", disc: "-30%", mgr: isUk ? "Корпоративний" : "Enterprise", sla: "99%" },
                  ].map((row, i) => (
                    <tr key={row.range} style={{ background: i % 2 === 0 ? "transparent" : "#263244" }}>
                      <td style={{ padding: "10px 14px", fontWeight: 600, fontSize: 14 }}>{row.range}</td>
                      <td style={{ padding: "10px 14px", color: row.disc === "—" ? C.muted : C.green, fontWeight: 700 }}>{row.disc}</td>
                      <td style={{ padding: "10px 14px", color: C.muted, fontSize: 13 }}>{row.mgr}</td>
                      <td style={{ padding: "10px 14px", color: C.orangeLight, fontWeight: 600 }}>{row.sla}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Dashboard mockup */}
            <div style={{ background: "#0d1117", border: `1px solid ${C.border}`, borderRadius: 16, padding: 24, marginBottom: 32 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>
                  {isUk ? "Дашборд мерчанта — превью" : "Merchant Dashboard — Preview"}
                </h3>
                <span style={{ background: "#14532d", color: C.green, borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700 }}>LIVE</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 16 }}>
                {[
                  { label: isUk ? "Всього сьогодні" : "Total Today", value: "142", change: "+12%" },
                  { label: isUk ? "Доставлено" : "Delivered", value: "128", change: "90.1%" },
                  { label: isUk ? "В дорозі" : "In Transit", value: "14", change: "" },
                  { label: isUk ? "Середній час" : "Avg Time", value: "1:52h", change: "" },
                ].map((stat) => (
                  <div key={stat.label} style={{ background: C.card, borderRadius: 8, padding: 14 }}>
                    <div style={{ fontSize: 11, color: C.muted, marginBottom: 4 }}>{stat.label}</div>
                    <div style={{ fontSize: 22, fontWeight: 800 }}>{stat.value}</div>
                    {stat.change && <div style={{ fontSize: 11, color: C.green, marginTop: 2 }}>{stat.change}</div>}
                  </div>
                ))}
              </div>
              {/* Mini bar chart */}
              <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 64 }}>
                {[40, 65, 50, 80, 55, 90, 75, 100, 70, 85, 60, 95, 80, 100].map((h, i) => (
                  <div key={i} style={{ flex: 1, height: `${h}%`, background: i === 13 ? C.orange : "#374151", borderRadius: "3px 3px 0 0" }} />
                ))}
              </div>
              <div style={{ fontSize: 10, color: C.muted, marginTop: 4, textAlign: "right" }}>
                {isUk ? "Доставки за останні 14 днів" : "Deliveries over last 14 days"}
              </div>
            </div>

            {/* Sign up form */}
            <div style={{ background: C.card, borderRadius: 16, padding: 32, maxWidth: 560 }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>
                {isUk ? "Підключити API / Корпоративний акаунт" : "Connect API / Enterprise Account"}
              </h3>
              {bizSent ? (
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>🚀</div>
                  <p style={{ color: C.green, fontWeight: 600 }}>
                    {isUk ? "Заявку отримано! Менеджер зв'яжеться протягом 1 години." : "Request received! A manager will contact you within 1 hour."}
                  </p>
                </div>
              ) : (
                <>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                    <div>
                      <label style={{ display: "block", color: C.muted, fontSize: 12, marginBottom: 5 }}>{isUk ? "Компанія" : "Company"}</label>
                      <input value={bizCompany} onChange={(e) => setBizCompany(e.target.value)} style={{ width: "100%", background: "#111827", border: `1px solid ${C.border}`, borderRadius: 8, padding: "9px 12px", color: C.white, fontSize: 14, boxSizing: "border-box" }} />
                    </div>
                    <div>
                      <label style={{ display: "block", color: C.muted, fontSize: 12, marginBottom: 5 }}>Email</label>
                      <input value={bizEmail} onChange={(e) => setBizEmail(e.target.value)} type="email" style={{ width: "100%", background: "#111827", border: `1px solid ${C.border}`, borderRadius: 8, padding: "9px 12px", color: C.white, fontSize: 14, boxSizing: "border-box" }} />
                    </div>
                  </div>
                  <div style={{ marginBottom: 20 }}>
                    <label style={{ display: "block", color: C.muted, fontSize: 12, marginBottom: 5 }}>
                      {isUk ? "Очікуваний обсяг (доставок/міс)" : "Expected volume (deliveries/mo)"}
                    </label>
                    <select value={bizVolume} onChange={(e) => setBizVolume(e.target.value)} style={{ width: "100%", background: "#111827", border: `1px solid ${C.border}`, borderRadius: 8, padding: "9px 12px", color: C.white, fontSize: 14 }}>
                      {["1–49", "50–200", "201–1000", "1000+"].map((v) => <option key={v} value={v}>{v}</option>)}
                    </select>
                  </div>
                  <button
                    onClick={() => { if (bizCompany && bizEmail) setBizSent(true); }}
                    style={{ width: "100%", background: C.orange, border: "none", borderRadius: 10, color: C.white, padding: "13px 0", fontWeight: 700, fontSize: 15, cursor: "pointer" }}
                  >
                    {isUk ? "Відправити заявку" : "Submit Request"}
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div style={{ background: "#0d1117", borderTop: `1px solid ${C.border}`, padding: "24px", textAlign: "center", marginTop: 40 }}>
        <p style={{ color: C.muted, fontSize: 13, margin: 0 }}>
          © 2025 SwiftMile · {isUk ? "Доставка по всьому місту" : "City-wide delivery"} · hello@swiftmile.ua
        </p>
      </div>
    </div>
  );
}
