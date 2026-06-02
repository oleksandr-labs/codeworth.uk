"use client";

import { useState } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV = [
  { en: "Configurator", uk: "Конфігуратор" },
  { en: "Calculator", uk: "Калькулятор" },
  { en: "Profiles", uk: "Профілі" },
  { en: "Guarantee", uk: "Гарантія" },
  { en: "Contact", uk: "Контакт" },
];

const WINDOW_TYPES = [
  { en: "Single-sash", uk: "Одностулкове" },
  { en: "Double-sash", uk: "Двостулкове" },
  { en: "Triple-sash", uk: "Тристулкове" },
  { en: "Balcony block", uk: "Балконний блок" },
  { en: "Door", uk: "Двері" },
];

const PROFILES = [
  { nameEn: "PVC 5-chamber", nameUk: "ПВХ 5-камерний", u: 1.3, coeff: 820, descEn: "Standard thermal protection, great value for money.", descUk: "Стандартний захист від холоду, оптимальна ціна." },
  { nameEn: "PVC 7-chamber", nameUk: "ПВХ 7-камерний", u: 1.0, coeff: 1100, descEn: "Enhanced insulation, ideal for Ukrainian winters.", descUk: "Покращена ізоляція, ідеально для українських зим." },
  { nameEn: "Aluminum", nameUk: "Алюмінієвий", u: 0.8, coeff: 1450, descEn: "Premium slim profile, maximum energy efficiency.", descUk: "Тонкий преміум-профіль, максимальна ефективність." },
];

const COLORS = [
  { nameEn: "White", nameUk: "Білий", hex: "#FFFFFF", border: "#D1D5DB" },
  { nameEn: "Anthracite", nameUk: "Антрацит", hex: "#374151", border: "#374151" },
  { nameEn: "Oak", nameUk: "Дуб", hex: "#92400E", border: "#92400E" },
  { nameEn: "Walnut", nameUk: "Горіх", hex: "#451A03", border: "#451A03" },
  { nameEn: "Dark green", nameUk: "Темно-зелений", hex: "#14532D", border: "#14532D" },
  { nameEn: "Gray", nameUk: "Сірий", hex: "#6B7280", border: "#6B7280" },
];

const OPENING_TYPES = [
  { nameEn: "Fixed", nameUk: "Глухе", icon: "fixed" },
  { nameEn: "Turn", nameUk: "Поворотне", icon: "turn" },
  { nameEn: "Turn-tilt", nameUk: "Поворотно-відкидне", icon: "turn-tilt" },
];

const PROFILE_TABLE = [
  { labelEn: "Chambers", labelUk: "Камери", vals: ["5", "7", "7+"] },
  { labelEn: "U-value (W/m²K)", labelUk: "U-значення", vals: ["1.3", "1.0", "0.8"] },
  { labelEn: "Noise reduction (dB)", labelUk: "Шумозаглушення", vals: ["30", "34", "38"] },
  { labelEn: "Price range", labelUk: "Цінова категорія", vals: ["Economy", "Standard", "Premium"] },
  { labelEn: "Best for", labelUk: "Ідеально для", vals: ["Dacha / budget", "Apartment", "House / office"] },
];

const PROFILE_TABLE_UK_VALS = [
  ["5", "7", "7+"],
  ["1.3", "1.0", "0.8"],
  ["30", "34", "38"],
  ["Економ", "Стандарт", "Преміум"],
  ["Дача / бюджет", "Квартира", "Будинок / офіс"],
];

const GUARANTEE_POINTS = [
  { en: "5-year full warranty on all window systems", uk: "5-річна повна гарантія на всі вікна" },
  { en: "Hardware (handles, hinges) replaced free of charge", uk: "Фурнітура замінюється безкоштовно" },
  { en: "Seal integrity guaranteed for 10 years", uk: "Цілісність ущільнювача гарантована 10 років" },
  { en: "Glass unit fog-free guarantee", uk: "Гарантія відсутності запотівання склопакету" },
  { en: "Annual free inspection in year 1", uk: "Безкоштовна перевірка у перший рік" },
];

// ─── SVG Window Preview ───────────────────────────────────────────────────────

function WindowSVG({ typeIdx, colorHex, openIdx }: { typeIdx: number; colorHex: string; openIdx: number }) {
  const sashes = typeIdx === 0 ? 1 : typeIdx === 1 ? 2 : typeIdx === 2 ? 3 : typeIdx === 3 ? 2 : 1;
  const isDoor = typeIdx === 4;
  const frameW = 160;
  const frameH = isDoor ? 200 : 130;
  const stroke = colorHex === "#FFFFFF" ? "#94A3B8" : colorHex;
  const fill = colorHex === "#FFFFFF" ? "#EFF6FF" : `${colorHex}22`;
  const sashW = Math.floor((frameW - 10) / sashes);

  return (
    <svg width={frameW + 20} height={frameH + 20} viewBox={`0 0 ${frameW + 20} ${frameH + 20}`}>
      <rect x={5} y={5} width={frameW} height={frameH} rx={3} fill={fill} stroke={stroke} strokeWidth={6} />
      {Array.from({ length: sashes }).map((_, i) => {
        const x = 10 + i * sashW;
        return (
          <rect key={i} x={x} y={10} width={sashW - 4} height={frameH - 14} rx={2} fill="none" stroke={stroke} strokeWidth={3} strokeDasharray={openIdx === 0 ? "0" : "0"} />
        );
      })}
      {openIdx === 1 && (
        <line x1={10} y1={frameH / 2 + 5} x2={frameW - 10} y2={10} stroke="#1A5FA8" strokeWidth={2} strokeDasharray="4,3" />
      )}
      {openIdx === 2 && (
        <>
          <line x1={10} y1={frameH / 2 + 5} x2={frameW - 10} y2={10} stroke="#1A5FA8" strokeWidth={2} strokeDasharray="4,3" />
          <line x1={frameW / 2 + 5} y1={10} x2={frameW - 10} y2={frameH - 10} stroke="#1A5FA8" strokeWidth={2} strokeDasharray="4,3" />
        </>
      )}
    </svg>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export function WinTechDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  // Configurator state
  const [step, setStep] = useState(0);
  const [typeIdx, setTypeIdx] = useState<number | null>(null);
  const [width, setWidth] = useState(1200);
  const [height, setHeight] = useState(1400);
  const [profileIdx, setProfileIdx] = useState<number | null>(null);
  const [colorIdx, setColorIdx] = useState<number | null>(null);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [ordered, setOrdered] = useState(false);

  // Heat savings calculator state
  const [calcArea, setCalcArea] = useState(10);
  const [calcProfileIdx, setCalcProfileIdx] = useState(0);

  // Measurement form
  const [mAddr, setMAddr] = useState("");
  const [mPhone, setMPhone] = useState("");
  const [mTime, setMTime] = useState("");
  const [mSent, setMSent] = useState(false);

  const steps = [
    { en: "Type", uk: "Тип" },
    { en: "Dimensions", uk: "Розміри" },
    { en: "Profile", uk: "Профіль" },
    { en: "Color", uk: "Колір" },
    { en: "Opening", uk: "Відкривання" },
  ];

  const canAdvance = [
    typeIdx !== null,
    true,
    profileIdx !== null,
    colorIdx !== null,
    openIdx !== null,
  ];

  const price = profileIdx !== null
    ? Math.round((width / 1000) * (height / 1000) * PROFILES[profileIdx].coeff)
    : null;

  const uValue = PROFILES[calcProfileIdx].u;
  const savingsPerM2 = (1.3 - uValue) * calcArea * 180;
  const estimatedSavings = Math.round(savingsPerM2 * 12);

  return (
    <div style={{ fontFamily: "Inter, sans-serif", background: "#FFFFFF", color: "#1A2332" }}>
      {/* Nav */}
      <nav style={{ background: "#1A5FA8", padding: "14px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
        <span style={{ fontWeight: 800, fontSize: 20, color: "#fff", letterSpacing: "-0.5px" }}>WinTech</span>
        <div style={{ display: "flex", gap: 22 }}>
          {NAV.map((n) => (
            <a key={n.en} href="#" style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", textDecoration: "none", fontWeight: 500 }}>{isUk ? n.uk : n.en}</a>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #1A5FA8 0%, #1E3A5F 100%)", color: "#fff", padding: "60px 32px", textAlign: "center" }}>
        <h1 style={{ fontSize: 38, fontWeight: 900, margin: "0 0 16px", lineHeight: 1.2 }}>
          {isUk ? "Вікна, що зберігають тепло — і радують погляд" : "Windows that keep warmth — and please the eye"}
        </h1>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginTop: 28 }}>
          {[
            { en: "15,000+ installed", uk: "15 000+ встановлено" },
            { en: "5-year warranty", uk: "5-річна гарантія" },
            { en: "Free measurement", uk: "Безкоштовний замір" },
            { en: "1-day installation", uk: "Монтаж за 1 день" },
          ].map((t) => (
            <div key={t.en} style={{ background: "rgba(255,255,255,0.15)", padding: "8px 18px", borderRadius: 20, fontSize: 13, fontWeight: 600 }}>
              ✓ {isUk ? t.uk : t.en}
            </div>
          ))}
        </div>
      </section>

      {/* Configurator */}
      <section style={{ padding: "56px 32px", background: "#F0F4F8" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 8 }}>{isUk ? "Конфігуратор вікон" : "Window Configurator"}</h2>
          <p style={{ color: "#64748B", fontSize: 14, marginBottom: 28 }}>{isUk ? "5 кроків до ідеального вікна" : "5 steps to your perfect window"}</p>

          {/* Step progress */}
          <div style={{ display: "flex", gap: 0, marginBottom: 32 }}>
            {steps.map((s, i) => (
              <div key={s.en} onClick={() => i < step || canAdvance[i - 1] !== false ? setStep(i) : undefined} style={{ flex: 1, textAlign: "center", cursor: "pointer" }}>
                <div style={{ height: 4, background: i <= step ? "#1A5FA8" : "#CBD5E1", marginBottom: 6, transition: "background 0.2s" }} />
                <span style={{ fontSize: 11, fontWeight: i === step ? 700 : 500, color: i === step ? "#1A5FA8" : "#94A3B8", textTransform: "uppercase", letterSpacing: 0.5 }}>
                  {i + 1}. {isUk ? s.uk : s.en}
                </span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 28, alignItems: "flex-start", flexWrap: "wrap" }}>
            {/* Main config panel */}
            <div style={{ flex: "1 1 380px", background: "#fff", borderRadius: 12, padding: "28px", border: "1px solid #E2E8F0", minWidth: 0 }}>
              {step === 0 && (
                <div>
                  <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 14 }}>{isUk ? "Оберіть тип вікна:" : "Select window type:"}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {WINDOW_TYPES.map((t, i) => (
                      <button key={t.en} onClick={() => setTypeIdx(i)} style={{ padding: "12px 16px", borderRadius: 8, border: `2px solid ${typeIdx === i ? "#1A5FA8" : "#E2E8F0"}`, background: typeIdx === i ? "#EFF6FF" : "#fff", color: typeIdx === i ? "#1A5FA8" : "#374151", fontWeight: typeIdx === i ? 700 : 500, fontSize: 14, cursor: "pointer", textAlign: "left" }}>
                        {isUk ? t.uk : t.en}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 1 && (
                <div>
                  <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 16 }}>{isUk ? "Введіть розміри (мм):" : "Enter dimensions (mm):"}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      <span style={{ fontSize: 13, color: "#64748B", fontWeight: 600 }}>{isUk ? "Ширина (500–2500 мм)" : "Width (500–2500 mm)"}</span>
                      <input type="number" min={500} max={2500} value={width} onChange={(e) => setWidth(Number(e.target.value))} style={{ border: "1px solid #CBD5E1", borderRadius: 6, padding: "10px 12px", fontSize: 15, fontWeight: 700, color: "#1A2332", outline: "none" }} />
                    </label>
                    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      <span style={{ fontSize: 13, color: "#64748B", fontWeight: 600 }}>{isUk ? "Висота (500–2500 мм)" : "Height (500–2500 mm)"}</span>
                      <input type="number" min={500} max={2500} value={height} onChange={(e) => setHeight(Number(e.target.value))} style={{ border: "1px solid #CBD5E1", borderRadius: 6, padding: "10px 12px", fontSize: 15, fontWeight: 700, color: "#1A2332", outline: "none" }} />
                    </label>
                    <p style={{ color: "#94A3B8", fontSize: 13 }}>{isUk ? "Площа:" : "Area:"} <strong>{((width / 1000) * (height / 1000)).toFixed(2)} м²</strong></p>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 14 }}>{isUk ? "Оберіть профіль:" : "Select profile:"}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {PROFILES.map((p, i) => (
                      <button key={p.nameEn} onClick={() => setProfileIdx(i)} style={{ padding: "14px 16px", borderRadius: 8, border: `2px solid ${profileIdx === i ? "#1A5FA8" : "#E2E8F0"}`, background: profileIdx === i ? "#EFF6FF" : "#fff", cursor: "pointer", textAlign: "left" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                          <span style={{ fontWeight: 700, fontSize: 14, color: profileIdx === i ? "#1A5FA8" : "#1A2332" }}>{isUk ? p.nameUk : p.nameEn}</span>
                          <span style={{ fontSize: 12, background: "#DBEAFE", color: "#1A5FA8", padding: "2px 8px", borderRadius: 10, fontWeight: 700 }}>U={p.u}</span>
                        </div>
                        <p style={{ fontSize: 12, color: "#64748B", margin: 0 }}>{isUk ? p.descUk : p.descEn}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 14 }}>{isUk ? "Оберіть колір:" : "Select color:"}</p>
                  <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                    {COLORS.map((c, i) => (
                      <div key={c.nameEn} onClick={() => setColorIdx(i)} style={{ cursor: "pointer", textAlign: "center" }}>
                        <div style={{ width: 44, height: 44, borderRadius: "50%", background: c.hex, border: `3px solid ${colorIdx === i ? "#1A5FA8" : c.border}`, boxShadow: colorIdx === i ? "0 0 0 3px #BFDBFE" : "none", margin: "0 auto 6px" }} />
                        <span style={{ fontSize: 11, color: "#374151", fontWeight: colorIdx === i ? 700 : 400 }}>{isUk ? c.nameUk : c.nameEn}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 14 }}>{isUk ? "Тип відкривання:" : "Opening type:"}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {OPENING_TYPES.map((o, i) => (
                      <button key={o.nameEn} onClick={() => setOpenIdx(i)} style={{ padding: "12px 16px", borderRadius: 8, border: `2px solid ${openIdx === i ? "#1A5FA8" : "#E2E8F0"}`, background: openIdx === i ? "#EFF6FF" : "#fff", color: openIdx === i ? "#1A5FA8" : "#374151", fontWeight: openIdx === i ? 700 : 500, fontSize: 14, cursor: "pointer", textAlign: "left" }}>
                        {isUk ? o.nameUk : o.nameEn}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
                {step > 0 && (
                  <button onClick={() => setStep((s) => s - 1)} style={{ flex: 1, padding: "11px", border: "1px solid #CBD5E1", borderRadius: 8, background: "#fff", fontWeight: 600, fontSize: 14, cursor: "pointer", color: "#374151" }}>
                    ← {isUk ? "Назад" : "Back"}
                  </button>
                )}
                {step < 4 ? (
                  <button onClick={() => canAdvance[step] && setStep((s) => s + 1)} disabled={!canAdvance[step]} style={{ flex: 1, padding: "11px", borderRadius: 8, background: canAdvance[step] ? "#1A5FA8" : "#CBD5E1", border: "none", color: "#fff", fontWeight: 700, fontSize: 14, cursor: canAdvance[step] ? "pointer" : "not-allowed" }}>
                    {isUk ? "Далі" : "Next"} →
                  </button>
                ) : (
                  <button onClick={() => setOrdered(true)} disabled={!canAdvance[4]} style={{ flex: 1, padding: "11px", borderRadius: 8, background: canAdvance[4] ? "#1A5FA8" : "#CBD5E1", border: "none", color: "#fff", fontWeight: 700, fontSize: 14, cursor: canAdvance[4] ? "pointer" : "not-allowed" }}>
                    {isUk ? "Замовити" : "Order"}
                  </button>
                )}
              </div>

              {ordered && (
                <div style={{ marginTop: 16, background: "#DCFCE7", border: "1px solid #86EFAC", borderRadius: 8, padding: "14px", color: "#166534", fontWeight: 700, textAlign: "center", fontSize: 14 }}>
                  ✓ {isUk ? "Замовлення прийнято! Зв'яжемось протягом дня." : "Order received! We'll contact you today."}
                </div>
              )}
            </div>

            {/* Live preview */}
            <div style={{ flex: "0 0 220px", background: "#fff", borderRadius: 12, padding: "24px", border: "1px solid #E2E8F0", textAlign: "center" }}>
              <p style={{ fontWeight: 700, fontSize: 13, marginBottom: 14, color: "#64748B", textTransform: "uppercase", letterSpacing: 0.5 }}>{isUk ? "Попередній перегляд" : "Preview"}</p>
              <WindowSVG typeIdx={typeIdx ?? 1} colorHex={colorIdx !== null ? COLORS[colorIdx].hex : "#FFFFFF"} openIdx={openIdx ?? 0} />
              {price !== null && (
                <div style={{ marginTop: 16 }}>
                  <p style={{ color: "#64748B", fontSize: 12, marginBottom: 2 }}>{isUk ? "Орієнтовна ціна:" : "Estimated price:"}</p>
                  <p style={{ fontWeight: 900, fontSize: 22, color: "#1A5FA8" }}>{price.toLocaleString("uk-UA")} ₴</p>
                  <p style={{ fontSize: 11, color: "#94A3B8" }}>{isUk ? "Без монтажу" : "Excl. installation"}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Heat savings calculator */}
      <section style={{ padding: "56px 32px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 8 }}>{isUk ? "Калькулятор економії тепла" : "Heat Savings Calculator"}</h2>
          <p style={{ color: "#64748B", fontSize: 14, marginBottom: 24 }}>{isUk ? "Скільки можна заощадити на опаленні?" : "How much can you save on heating?"}</p>
          <div style={{ background: "#F0F4F8", borderRadius: 12, padding: "28px" }}>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 20 }}>
              <label style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>{isUk ? "Площа вікон (м²)" : "Window area (m²)"}</span>
                <input type="number" min={1} max={100} value={calcArea} onChange={(e) => setCalcArea(Number(e.target.value))} style={{ border: "1px solid #CBD5E1", borderRadius: 6, padding: "10px", fontSize: 15, fontWeight: 700, background: "#fff", outline: "none" }} />
              </label>
              <label style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>{isUk ? "Профіль" : "Profile"}</span>
                <select value={calcProfileIdx} onChange={(e) => setCalcProfileIdx(Number(e.target.value))} style={{ border: "1px solid #CBD5E1", borderRadius: 6, padding: "10px", fontSize: 14, background: "#fff", outline: "none" }}>
                  {PROFILES.map((p, i) => (
                    <option key={p.nameEn} value={i}>{isUk ? p.nameUk : p.nameEn} (U={p.u})</option>
                  ))}
                </select>
              </label>
            </div>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <div style={{ flex: 1, background: "#fff", borderRadius: 8, padding: "16px", border: "1px solid #BFDBFE", textAlign: "center" }}>
                <p style={{ fontSize: 12, color: "#64748B", marginBottom: 4 }}>{isUk ? "U-значення" : "U-value"}</p>
                <p style={{ fontWeight: 900, fontSize: 24, color: "#1A5FA8" }}>{uValue}</p>
                <p style={{ fontSize: 11, color: "#94A3B8" }}>W/m²K</p>
              </div>
              <div style={{ flex: 1, background: "#fff", borderRadius: 8, padding: "16px", border: "1px solid #BBF7D0", textAlign: "center" }}>
                <p style={{ fontSize: 12, color: "#64748B", marginBottom: 4 }}>{isUk ? "Економія на рік" : "Annual savings"}</p>
                <p style={{ fontWeight: 900, fontSize: 24, color: "#15803D" }}>{estimatedSavings > 0 ? `~${estimatedSavings.toLocaleString("uk-UA")} ₴` : "—"}</p>
                <p style={{ fontSize: 11, color: "#94A3B8" }}>{isUk ? "порівняно зі старими" : "vs old windows"}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profile comparison */}
      <section style={{ padding: "48px 32px", background: "#F0F4F8" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 24 }}>{isUk ? "Порівняння профілів" : "Profile Comparison"}</h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: 10, overflow: "hidden", fontSize: 14 }}>
              <thead>
                <tr style={{ background: "#1A5FA8", color: "#fff" }}>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 700 }}>{isUk ? "Характеристика" : "Characteristic"}</th>
                  {PROFILES.map((p) => (
                    <th key={p.nameEn} style={{ padding: "12px 16px", textAlign: "center", fontWeight: 700 }}>{isUk ? p.nameUk : p.nameEn}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PROFILE_TABLE.map((row, ri) => (
                  <tr key={row.labelEn} style={{ background: ri % 2 === 0 ? "#fff" : "#F8FAFC" }}>
                    <td style={{ padding: "11px 16px", fontWeight: 600, color: "#374151" }}>{isUk ? row.labelUk : row.labelEn}</td>
                    {(isUk ? PROFILE_TABLE_UK_VALS[ri] : row.vals).map((v, vi) => (
                      <td key={vi} style={{ padding: "11px 16px", textAlign: "center", color: "#1A2332" }}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Guarantee */}
      <section style={{ padding: "48px 32px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 20 }}>{isUk ? "Гарантія 5 років" : "5-Year Guarantee"}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {GUARANTEE_POINTS.map((g) => (
              <div key={g.en} style={{ display: "flex", gap: 12, padding: "12px 16px", background: "#F0F4F8", borderRadius: 8 }}>
                <span style={{ color: "#1A5FA8", fontWeight: 800, flexShrink: 0 }}>✓</span>
                <span style={{ fontSize: 14 }}>{isUk ? g.uk : g.en}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free measurement CTA */}
      <section style={{ padding: "48px 32px", background: "#1A5FA8" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: "#fff", marginBottom: 8 }}>{isUk ? "Безкоштовний замір" : "Free Measurement"}</h2>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, marginBottom: 24 }}>{isUk ? "Наш фахівець приїде та зробить точний замір безкоштовно" : "Our specialist will visit and take precise measurements at no cost"}</p>
          {!mSent ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <input value={mAddr} onChange={(e) => setMAddr(e.target.value)} placeholder={isUk ? "Адреса" : "Address"} style={{ padding: "11px 14px", borderRadius: 8, border: "none", fontSize: 14, outline: "none" }} />
              <input value={mPhone} onChange={(e) => setMPhone(e.target.value)} placeholder={isUk ? "Телефон" : "Phone"} style={{ padding: "11px 14px", borderRadius: 8, border: "none", fontSize: 14, outline: "none" }} />
              <input value={mTime} onChange={(e) => setMTime(e.target.value)} placeholder={isUk ? "Зручний час (напр. Пн, 10:00–14:00)" : "Preferred time (e.g. Mon, 10:00–14:00)"} style={{ padding: "11px 14px", borderRadius: 8, border: "none", fontSize: 14, outline: "none" }} />
              <button onClick={() => mAddr && mPhone && setMSent(true)} style={{ background: "#FFF", color: "#1A5FA8", border: "none", padding: "13px", borderRadius: 8, fontWeight: 800, fontSize: 15, cursor: "pointer" }}>
                {isUk ? "Замовити замір" : "Request measurement"}
              </button>
            </div>
          ) : (
            <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 10, padding: "20px", color: "#fff", fontWeight: 700, fontSize: 16 }}>
              ✓ {isUk ? "Заявку прийнято! Зателефонуємо для підтвердження." : "Request received! We'll call to confirm."}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#1A2332", color: "rgba(255,255,255,0.4)", padding: "24px 32px", textAlign: "center", fontSize: 13 }}>
        © 2025 WinTech · {isUk ? "Виробник вікон та дверей" : "Window & Door Manufacturer"}
      </footer>
    </div>
  );
}
