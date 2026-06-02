"use client";

import { useState } from "react";

const GREEN = "#4A7C59";
const YELLOW = "#F5C518";
const CREAM = "#FEF9EF";

const SEASONAL: { month: string; monthUk: string; flowers: string; flowersUk: string }[] = [
  { month: "Jan", monthUk: "Січ", flowers: "Hellebore", flowersUk: "Морозник" },
  { month: "Feb", monthUk: "Лют", flowers: "Snowdrops", flowersUk: "Підсніжники" },
  { month: "Mar", monthUk: "Бер", flowers: "Primroses, Snowdrops", flowersUk: "Первоцвіти, Підсніжники" },
  { month: "Apr", monthUk: "Кві", flowers: "Tulips, Muscari", flowersUk: "Тюльпани, Проліски" },
  { month: "May", monthUk: "Тра", flowers: "Peonies, Poppies", flowersUk: "Півонії, Маки" },
  { month: "Jun", monthUk: "Чер", flowers: "Wildflowers, Cornflowers", flowersUk: "Польові квіти, Волошки" },
  { month: "Jul", monthUk: "Лип", flowers: "Lavender, Chamomile", flowersUk: "Лаванда, Ромашка" },
  { month: "Aug", monthUk: "Сер", flowers: "Sunflowers, Yarrow", flowersUk: "Соняшники, Деревій" },
  { month: "Sep", monthUk: "Вер", flowers: "Asters, Zinnias", flowersUk: "Айстри, Цинії" },
  { month: "Oct", monthUk: "Жов", flowers: "Dahlias, Marigolds", flowersUk: "Жоржини, Чорнобривці" },
  { month: "Nov", monthUk: "Лис", flowers: "Chrysanthemums", flowersUk: "Хризантеми" },
  { month: "Dec", monthUk: "Гру", flowers: "Holly, Hellebore", flowersUk: "Падуб, Морозник" },
];

const CATALOG_TABS = [
  { key: "small", en: "Small · 200–400 UAH", uk: "Малий · 200–400 грн" },
  { key: "medium", en: "Medium · 500–800 UAH", uk: "Середній · 500–800 грн" },
  { key: "large", en: "Large · 900–1500 UAH", uk: "Великий · 900–1500 грн" },
];

const CATALOG: Record<string, { nameEn: string; nameUk: string; descEn: string; descUk: string; price: number }[]> = {
  small: [
    { nameEn: "Meadow Whisper", nameUk: "Шепіт луки", descEn: "Chamomile, cornflowers, wild grasses", descUk: "Ромашки, волошки, польові трави", price: 280 },
    { nameEn: "Poppy Blush", nameUk: "Маковий рум'янець", descEn: "Poppies, baby's breath, yarrow", descUk: "Маки, гіпсофіла, деревій", price: 320 },
    { nameEn: "Spring Handful", nameUk: "Весняна жменька", descEn: "Primroses, muscari, snowdrops", descUk: "Первоцвіти, проліски, підсніжники", price: 240 },
  ],
  medium: [
    { nameEn: "Golden Hour", nameUk: "Золота година", descEn: "Sunflowers, zinnias, grasses", descUk: "Соняшники, цинії, злаки", price: 580 },
    { nameEn: "Lavender Dreams", nameUk: "Лавандові мрії", descEn: "Lavender, echinacea, sage", descUk: "Лаванда, ехінацея, шавлія", price: 650 },
    { nameEn: "Wild Peonies", nameUk: "Дикі півонії", descEn: "Peonies, roses, ferns", descUk: "Півонії, троянди, папороті", price: 750 },
  ],
  large: [
    { nameEn: "Harvest Abundance", nameUk: "Врожайна щедрість", descEn: "Dahlias, asters, sunflowers, grasses", descUk: "Жоржини, айстри, соняшники, злаки", price: 950 },
    { nameEn: "Midsummer Night", nameUk: "Купальська ніч", descEn: "Cornflowers, poppies, chamomile, yarrow", descUk: "Волошки, маки, ромашки, деревій", price: 1100 },
    { nameEn: "Autumn Meadow", nameUk: "Осіння галявина", descEn: "Chrysanthemums, dahlias, marigolds", descUk: "Хризантеми, жоржини, чорнобривці", price: 1400 },
  ],
};

const HARVEST_TODAY = [
  { emoji: "🌸", nameEn: "Garden Peony", nameUk: "Садова півонія", descEn: "Last blooms of the season — tender pink, large heads", descUk: "Останні квіти сезону — ніжно-рожеві, великі суцвіття" },
  { emoji: "💙", nameEn: "Cornflower", nameUk: "Волошка", descEn: "Bright blue meadow cornflowers, freshly cut this morning", descUk: "Яскраво-сині польові волошки, зрізані сьогодні вранці" },
  { emoji: "☀️", nameEn: "Mini Sunflower", nameUk: "Міні-соняшник", descEn: "Cheerful small-headed sunflowers, perfect for bouquets", descUk: "Веселі дрібноголові соняшники, ідеальні для букетів" },
];

const ECO_PRINCIPLES = [
  { emoji: "🚫", en: "No plastic film", uk: "Без пластикової плівки" },
  { emoji: "🌿", en: "No floral foam", uk: "Без флористичної піни" },
  { emoji: "🚲", en: "Bike delivery in city center", uk: "Доставка велосипедом у центрі" },
  { emoji: "🌱", en: "No pesticides certificate", uk: "Сертифікат без пестицидів" },
];

const SIZES = [
  { key: "S", en: "S · 300 UAH", uk: "S · 300 грн", price: 300 },
  { key: "M", en: "M · 500 UAH", uk: "M · 500 грн", price: 500 },
  { key: "L", en: "L · 800 UAH", uk: "L · 800 грн", price: 800 },
  { key: "XL", en: "XL · 1,200 UAH", uk: "XL · 1 200 грн", price: 1200 },
];

const DELIVERY_TIMES = [
  { key: "asap", en: "As early as possible", uk: "Якомога раніше" },
  { key: "noon", en: "By noon", uk: "До обіду" },
  { key: "evening", en: "By evening", uk: "До вечора" },
];

export function WildFieldDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";
  const [catalogTab, setCatalogTab] = useState("small");
  const [selectedSize, setSelectedSize] = useState("M");
  const [addCard, setAddCard] = useState(false);
  const [deliveryTime, setDeliveryTime] = useState("asap");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [ordered, setOrdered] = useState(false);
  const [showSeason, setShowSeason] = useState(false);

  const sizeObj = SIZES.find((s) => s.key === selectedSize)!;
  const total = sizeObj.price + (addCard ? 50 : 0);

  const handleOrder = () => {
    if (name && phone && address) setOrdered(true);
  };

  return (
    <div style={{ background: CREAM, fontFamily: "'Georgia', serif", color: "#2D2D2D" }} className="min-h-screen">

      {/* NAV */}
      <nav style={{ background: GREEN }} className="px-6 py-3 flex items-center justify-between">
        <span style={{ color: YELLOW, fontSize: 20, fontWeight: 700, letterSpacing: 1 }}>🌾 WildField</span>
        <div className="flex gap-4 text-sm" style={{ color: CREAM }}>
          <span className="cursor-pointer hover:underline">{isUk ? "Каталог" : "Catalog"}</span>
          <span className="cursor-pointer hover:underline">{isUk ? "Сезон" : "Season"}</span>
          <span className="cursor-pointer hover:underline">{isUk ? "Доставка" : "Delivery"}</span>
        </div>
      </nav>

      {/* HERO */}
      <section className="px-6 py-12 text-center" style={{ borderBottom: `3px dashed ${GREEN}` }}>
        <div style={{ fontSize: 13, color: GREEN, fontStyle: "italic", marginBottom: 8 }}>
          {isUk ? "Пряме з поля · Сезонне · Натуральне" : "Straight from the field · Seasonal · Natural"}
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: GREEN, lineHeight: 1.2, marginBottom: 12 }}>
          {isUk ? "Квіти з поля — прямо до вас" : "Flowers from the field — straight to you"}
        </h1>
        <p style={{ color: "#555", fontSize: 15, marginBottom: 24, maxWidth: 480, margin: "0 auto 24px" }}>
          {isUk
            ? "Сезонні. Без хімії. У крафтовому пакуванні."
            : "Seasonal. Chemical-free. In kraft packaging."}
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <button
            style={{ background: GREEN, color: CREAM, border: "none", padding: "12px 28px", borderRadius: 4, fontSize: 15, cursor: "pointer", fontFamily: "inherit" }}
            onClick={() => document.getElementById("wf-surprise")?.scrollIntoView({ behavior: "smooth" })}
          >
            {isUk ? "Замовити букет" : "Order bouquet"}
          </button>
          <button
            style={{ background: "transparent", color: GREEN, border: `2px solid ${GREEN}`, padding: "12px 28px", borderRadius: 4, fontSize: 15, cursor: "pointer", fontFamily: "inherit" }}
            onClick={() => setShowSeason(!showSeason)}
          >
            {isUk ? "Що зараз цвіте?" : "What's in season?"}
          </button>
        </div>
      </section>

      {/* SEASONAL CALENDAR */}
      {showSeason && (
        <section className="px-6 py-8" style={{ background: "#F0EDE4", borderBottom: `3px dashed ${GREEN}` }}>
          <h2 style={{ color: GREEN, fontSize: 20, fontWeight: 700, marginBottom: 16, textAlign: "center" }}>
            {isUk ? "Сезонний календар" : "Seasonal Calendar"}
          </h2>
          <div className="grid grid-cols-3 gap-3" style={{ maxWidth: 600, margin: "0 auto" }}>
            {SEASONAL.map((m) => (
              <div key={m.month} style={{ background: CREAM, border: `1px solid ${GREEN}30`, borderRadius: 8, padding: "10px 12px" }}>
                <div style={{ fontWeight: 700, color: GREEN, fontSize: 13, marginBottom: 4 }}>
                  {isUk ? m.monthUk : m.month}
                </div>
                <div style={{ fontSize: 12, color: "#555" }}>{isUk ? m.flowersUk : m.flowers}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TODAY'S HARVEST */}
      <section className="px-6 py-8" style={{ borderBottom: `3px dashed ${GREEN}` }}>
        <h2 style={{ color: GREEN, fontSize: 20, fontWeight: 700, marginBottom: 4, textAlign: "center" }}>
          🌿 {isUk ? "Сьогоднішній врожай" : "Today's Harvest"}
        </h2>
        <p style={{ textAlign: "center", color: "#666", fontSize: 13, marginBottom: 20 }}>
          {isUk ? "Зрізано сьогодні вранці о 6:30" : "Cut this morning at 6:30"}
        </p>
        <div className="grid grid-cols-1 gap-4" style={{ maxWidth: 640, margin: "0 auto" }}>
          {HARVEST_TODAY.map((f) => (
            <div key={f.nameEn} style={{ background: CREAM, border: `1px solid ${GREEN}40`, borderRadius: 10, padding: "14px 18px", display: "flex", gap: 16, alignItems: "center" }}>
              <span style={{ fontSize: 32 }}>{f.emoji}</span>
              <div>
                <div style={{ fontWeight: 700, color: GREEN }}>{isUk ? f.nameUk : f.nameEn}</div>
                <div style={{ fontSize: 13, color: "#666" }}>{isUk ? f.descUk : f.descEn}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATALOG */}
      <section className="px-6 py-8" style={{ borderBottom: `3px dashed ${GREEN}` }}>
        <h2 style={{ color: GREEN, fontSize: 20, fontWeight: 700, marginBottom: 16, textAlign: "center" }}>
          {isUk ? "Каталог букетів" : "Bouquet Catalog"}
        </h2>
        <div className="flex justify-center gap-2 flex-wrap mb-6">
          {CATALOG_TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setCatalogTab(t.key)}
              style={{
                background: catalogTab === t.key ? GREEN : "transparent",
                color: catalogTab === t.key ? CREAM : GREEN,
                border: `2px solid ${GREEN}`,
                padding: "8px 16px",
                borderRadius: 20,
                fontSize: 13,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              {isUk ? t.uk : t.en}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-4" style={{ maxWidth: 640, margin: "0 auto" }}>
          {CATALOG[catalogTab].map((b) => (
            <div key={b.nameEn} style={{ background: CREAM, border: `1px solid ${GREEN}30`, borderRadius: 10, padding: "16px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 700, color: "#2D2D2D", marginBottom: 4 }}>{isUk ? b.nameUk : b.nameEn}</div>
                <div style={{ fontSize: 12, color: "#777", marginBottom: 8 }}>{isUk ? b.descUk : b.descEn}</div>
                <div className="flex gap-2">
                  <span style={{ background: GREEN, color: CREAM, fontSize: 11, padding: "2px 8px", borderRadius: 10 }}>🌿 Eco</span>
                  <span style={{ background: "#8B6F47", color: CREAM, fontSize: 11, padding: "2px 8px", borderRadius: 10 }}>📦 Kraft</span>
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: GREEN }}>₴{b.price}</div>
                <button style={{ background: YELLOW, color: "#2D2D2D", border: "none", padding: "6px 14px", borderRadius: 4, fontSize: 12, cursor: "pointer", marginTop: 6, fontFamily: "inherit" }}>
                  {isUk ? "Обрати" : "Select"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FLORAL SURPRISE */}
      <section id="wf-surprise" className="px-6 py-8" style={{ background: "#F0EDE4", borderBottom: `3px dashed ${GREEN}` }}>
        <h2 style={{ color: GREEN, fontSize: 22, fontWeight: 700, marginBottom: 4, textAlign: "center" }}>
          🌺 {isUk ? "Флористичний сюрприз" : "Floral Surprise"}
        </h2>
        <p style={{ textAlign: "center", color: "#666", fontSize: 13, marginBottom: 24 }}>
          {isUk
            ? "Флорист обере найкраще з ранкового врожаю сьогодні"
            : "Florist will pick the best of today's morning harvest"}
        </p>

        {ordered ? (
          <div style={{ background: GREEN, color: CREAM, borderRadius: 12, padding: 24, textAlign: "center", maxWidth: 480, margin: "0 auto" }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>🌸</div>
            <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>
              {isUk ? "Ваш сюрприз замовлено!" : "Your floral surprise is ordered!"}
            </div>
            <div style={{ fontSize: 14, opacity: 0.9 }}>
              {isUk
                ? "Флорист підбере найсвіжіші квіти спеціально для вас."
                : "Florist will pick the freshest blooms for you."}
            </div>
          </div>
        ) : (
          <div style={{ maxWidth: 480, margin: "0 auto", background: CREAM, borderRadius: 12, padding: 24, border: `1px solid ${GREEN}30` }}>
            {/* Size */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontWeight: 700, marginBottom: 8, color: GREEN }}>{isUk ? "Розмір" : "Size"}</div>
              <div className="flex gap-2 flex-wrap">
                {SIZES.map((s) => (
                  <button
                    key={s.key}
                    onClick={() => setSelectedSize(s.key)}
                    style={{
                      background: selectedSize === s.key ? GREEN : "transparent",
                      color: selectedSize === s.key ? CREAM : GREEN,
                      border: `2px solid ${GREEN}`,
                      padding: "8px 14px",
                      borderRadius: 8,
                      fontSize: 13,
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    {isUk ? s.uk : s.en}
                  </button>
                ))}
              </div>
            </div>

            {/* Card add-on */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontSize: 14 }}>
                <input type="checkbox" checked={addCard} onChange={(e) => setAddCard(e.target.checked)} />
                {isUk ? "Додати крафтову листівку (+50 грн)" : "Add craft card (+50 UAH)"}
              </label>
            </div>

            {/* Delivery time */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontWeight: 700, marginBottom: 8, color: GREEN }}>{isUk ? "Час доставки" : "Delivery time"}</div>
              <div className="flex flex-col gap-2">
                {DELIVERY_TIMES.map((d) => (
                  <label key={d.key} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontSize: 14 }}>
                    <input type="radio" name="delivery" value={d.key} checked={deliveryTime === d.key} onChange={() => setDeliveryTime(d.key)} />
                    {isUk ? d.uk : d.en}
                  </label>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="flex flex-col gap-3 mb-4">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={isUk ? "Ваше ім'я" : "Your name"}
                style={{ border: `1px solid ${GREEN}60`, borderRadius: 6, padding: "10px 12px", fontSize: 14, fontFamily: "inherit", background: CREAM }}
              />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={isUk ? "Номер телефону" : "Phone number"}
                style={{ border: `1px solid ${GREEN}60`, borderRadius: 6, padding: "10px 12px", fontSize: 14, fontFamily: "inherit", background: CREAM }}
              />
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder={isUk ? "Адреса доставки" : "Delivery address"}
                style={{ border: `1px solid ${GREEN}60`, borderRadius: 6, padding: "10px 12px", fontSize: 14, fontFamily: "inherit", background: CREAM }}
              />
            </div>

            <div className="flex justify-between items-center">
              <span style={{ fontWeight: 700, fontSize: 18, color: GREEN }}>₴{total}</span>
              <button
                onClick={handleOrder}
                style={{ background: GREEN, color: CREAM, border: "none", padding: "12px 24px", borderRadius: 8, fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}
              >
                {isUk ? "Замовити сюрприз" : "Order my surprise"}
              </button>
            </div>
          </div>
        )}
      </section>

      {/* ECO PRINCIPLES */}
      <section className="px-6 py-8" style={{ borderBottom: `3px dashed ${GREEN}` }}>
        <h2 style={{ color: GREEN, fontSize: 20, fontWeight: 700, marginBottom: 16, textAlign: "center" }}>
          {isUk ? "Наші еко-принципи" : "Our Eco Principles"}
        </h2>
        <div className="grid grid-cols-2 gap-4" style={{ maxWidth: 520, margin: "0 auto" }}>
          {ECO_PRINCIPLES.map((p) => (
            <div key={p.en} style={{ background: CREAM, border: `1px solid ${GREEN}30`, borderRadius: 10, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 24 }}>{p.emoji}</span>
              <span style={{ fontSize: 13, color: "#333" }}>{isUk ? p.uk : p.en}</span>
            </div>
          ))}
        </div>
      </section>

      {/* DELIVERY INFO */}
      <section className="px-6 py-8">
        <h2 style={{ color: GREEN, fontSize: 20, fontWeight: 700, marginBottom: 16, textAlign: "center" }}>
          {isUk ? "Доставка" : "Delivery"}
        </h2>
        <div className="grid grid-cols-1 gap-3" style={{ maxWidth: 480, margin: "0 auto" }}>
          <div style={{ background: CREAM, border: `1px solid ${GREEN}30`, borderRadius: 10, padding: "14px 18px" }}>
            <span style={{ fontWeight: 700, color: GREEN }}>🌅 {isUk ? "Ранній самовивіз" : "Morning pickup"}</span>
            <div style={{ fontSize: 13, color: "#666", marginTop: 4 }}>6:30 – 9:00</div>
          </div>
          <div style={{ background: CREAM, border: `1px solid ${GREEN}30`, borderRadius: 10, padding: "14px 18px" }}>
            <span style={{ fontWeight: 700, color: GREEN }}>🚲 {isUk ? "Доставка по місту" : "City delivery"}</span>
            <div style={{ fontSize: 13, color: "#666", marginTop: 4 }}>{isUk ? "До 14:00" : "Before 14:00"}</div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: GREEN, color: CREAM, textAlign: "center", padding: "16px 24px", fontSize: 13 }}>
        © 2025 WildField · {isUk ? "Квіти з поля з любов'ю" : "Field flowers with love"}
      </footer>
    </div>
  );
}
