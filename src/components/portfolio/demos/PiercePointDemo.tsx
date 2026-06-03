"use client";

import { useState } from "react";
import { EmojiIcon } from "@/components/ui/EmojiIcon";

// ─── Data ─────────────────────────────────────────────────────────────────────

const CATEGORIES = ["Ear", "Nose", "Lip", "Brow", "Navel", "Other"];

const EAR_SUBCATS = ["Lobe", "Helix", "Tragus", "Daith", "Industrial"];

const JEWELRY_ITEMS = [
  { id: 1, cat: "Ear", sub: "Lobe", nameEn: "Titanium Flat Back Stud", nameUk: "Титанова плоска застібка", material: "Titanium", price: 480, sizes: ["16G", "18G"], emoji: "💎" },
  { id: 2, cat: "Ear", sub: "Lobe", nameEn: "BVLA Rose Gold Cluster", nameUk: "BVLA золоте гроно", material: "Gold", price: 1850, sizes: ["18G", "20G"], emoji: "🌸" },
  { id: 3, cat: "Ear", sub: "Helix", nameEn: "Titanium Captive Ring", nameUk: "Титанове кільце", material: "Titanium", price: 390, sizes: ["16G", "18G"], emoji: "⭕" },
  { id: 4, cat: "Ear", sub: "Helix", nameEn: "Neometal Opal Cluster", nameUk: "Неометал опал", material: "Titanium", price: 720, sizes: ["18G", "20G"], emoji: "✨" },
  { id: 5, cat: "Ear", sub: "Tragus", nameEn: "Titanium Labret Stud", nameUk: "Титановий лабрет", material: "Titanium", price: 350, sizes: ["16G", "18G"], emoji: "🔘" },
  { id: 6, cat: "Ear", sub: "Daith", nameEn: "Gold Heart Clicker Ring", nameUk: "Золоте серце кільце", material: "Gold", price: 2100, sizes: ["16G"], emoji: "💛" },
  { id: 7, cat: "Ear", sub: "Industrial", nameEn: "Titanium Industrial Bar", nameUk: "Титановий стрижень", material: "Titanium", price: 560, sizes: ["14G"], emoji: "📏" },
  { id: 8, cat: "Nose", sub: "Nostril", nameEn: "Titanium L-Shape Stud", nameUk: "Г-подібна серьга", material: "Titanium", price: 320, sizes: ["18G", "20G"], emoji: "💜" },
  { id: 9, cat: "Nose", sub: "Nostril", nameEn: "BVLA Gold Marquise", nameUk: "BVLA золота маркіза", material: "Gold", price: 2400, sizes: ["18G", "20G"], emoji: "⚜️" },
  { id: 10, cat: "Nose", sub: "Septum", nameEn: "Titanium Clicker Septum", nameUk: "Клікер для перегородки", material: "Titanium", price: 450, sizes: ["14G", "16G"], emoji: "🔄" },
  { id: 11, cat: "Lip", sub: "Medusa", nameEn: "Titanium Threadless Flat Back", nameUk: "Різьбова застібка", material: "Titanium", price: 380, sizes: ["16G", "18G"], emoji: "💠" },
  { id: 12, cat: "Lip", sub: "Labret", nameEn: "Steel Labret with Gem", nameUk: "Сталевий лабрет з каменем", material: "Steel", price: 280, sizes: ["16G", "14G"], emoji: "🩵" },
  { id: 13, cat: "Brow", sub: "Eyebrow", nameEn: "Titanium Curved Barbell", nameUk: "Зігнутий барбел", material: "Titanium", price: 410, sizes: ["16G", "14G"], emoji: "〰️" },
  { id: 14, cat: "Navel", sub: "Navel", nameEn: "Titanium Banana Bell", nameUk: "Бананова серьга", material: "Titanium", price: 430, sizes: ["14G"], emoji: "🫧" },
  { id: 15, cat: "Navel", sub: "Navel", nameEn: "Gold Dangle Navel Ring", nameUk: "Золоте кільце з підвіскою", material: "Gold", price: 1950, sizes: ["14G"], emoji: "🏅" },
  { id: 16, cat: "Other", sub: "Dermal", nameEn: "Titanium Surface Anchor", nameUk: "Титановий якір", material: "Titanium", price: 520, sizes: ["14G"], emoji: "⚓" },
];

const SAFETY_CARDS = [
  { emojiIcon: "🔬", titleEn: "Autoclave Sterilization", titleUk: "Стерилізація автоклавом", descEn: "Class B autoclave sterilizes all reusable tools at 134°C.", descUk: "Автоклав класу B стерилізує всі інструменти при 134°C." },
  { emojiIcon: "💉", titleEn: "Single-Use Needles", titleUk: "Одноразові голки", descEn: "Every needle is opened fresh in front of you and disposed after.", descUk: "Кожна голка відкривається при клієнті та утилізується після." },
  { emojiIcon: "🏅", titleEn: "Medical-Grade Titanium", titleUk: "Медичний титан", descEn: "We use only G23 implant-grade titanium, ASTM F136 certified.", descUk: "Використовуємо лише титан G23 імплантного класу, ASTM F136." },
  { emojiIcon: "🧹", titleEn: "Clean Room Certified", titleUk: "Чиста кімната", descEn: "Procedure area meets clinical hygiene standards.", descUk: "Зона процедур відповідає клінічним стандартам гігієни." },
];

const PORTFOLIO_TILES = [
  { id: 1, label: "Ear Constellation", labelUk: "Сузір'я вуха", emoji: "✨" },
  { id: 2, label: "Nostril Stud", labelUk: "Ніздря", emoji: "💜" },
  { id: 3, label: "Septum Ring", labelUk: "Перегородка", emoji: "🔄" },
  { id: 4, label: "Helix Curve", labelUk: "Хелікс", emoji: "🌙" },
  { id: 5, label: "Industrial Bar", labelUk: "Індастріал", emoji: "📏" },
  { id: 6, label: "Daith Ring", labelUk: "Дейс", emoji: "💛" },
  { id: 7, label: "Brow Curve", labelUk: "Бров", emoji: "〰️" },
  { id: 8, label: "Navel Dangle", labelUk: "Пупок", emoji: "🫧" },
];

const AFTERCARE = [
  { titleEn: "Saline solution rinse", titleUk: "Промивання сольовим розчином", bodyEn: "Spray sterile 0.9% NaCl solution 2× daily for the first 4 weeks. Do not use alcohol or hydrogen peroxide.", bodyUk: "Обробляйте стерильним розчином NaCl 0.9% двічі на день перших 4 тижні. Не використовуйте спирт або перекис." },
  { titleEn: "Hands off policy", titleUk: "Не чіпайте руками", bodyEn: "Touch only with freshly washed hands. Resist rotating or sliding jewelry — it disrupts healing.", bodyUk: "Торкайтесь лише чистими руками. Не крутіть та не переміщуйте прикраси — це заважає загоєнню." },
  { titleEn: "Avoid submersion", titleUk: "Уникайте занурення", bodyEn: "No pools, saunas, or open water for at least 6 weeks. Shower is fine — just rinse after.", bodyUk: "Жодних басейнів, саун та відкритої води щонайменше 6 тижнів. Душ — нормально, просто промийте після." },
  { titleEn: "Sleep position awareness", titleUk: "Положення під час сну", bodyEn: "Use a travel pillow for ear piercings to avoid pressure. Change pillowcases every 2 days.", bodyUk: "Використовуйте подушку з отвором для пірсингу вуха. Міняйте наволочку кожні 2 дні." },
  { titleEn: "Signs of infection", titleUk: "Ознаки інфекції", bodyEn: "Redness, swelling and clear discharge in week 1 are normal. Yellow or green pus, excessive pain — contact us immediately.", bodyUk: "Почервоніння, набряк і прозорі виділення на першому тижні — нормально. Жовтий або зелений гній, сильний біль — негайно зв'яжіться з нами." },
];

const PIERCE_TYPES = ["Ear Lobe", "Helix", "Tragus", "Daith", "Industrial", "Nostril", "Septum", "Medusa", "Labret", "Eyebrow", "Navel", "Dermal"];

// ─── Component ────────────────────────────────────────────────────────────────

export function PiercePointDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [activeCategory, setActiveCategory] = useState("Ear");
  const [activeEarSub, setActiveEarSub] = useState("Lobe");
  const [materialFilter, setMaterialFilter] = useState("All");
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  const [openAftercare, setOpenAftercare] = useState<number | null>(null);
  const [bookingType, setBookingType] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingName, setBookingName] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingSent, setBookingSent] = useState(false);

  const BG = "#0F0F0F";
  const ACCENT = "#A855F7";
  const SAND = "#D4D4D4";
  const CARD_BG = "#1A1A1A";
  const BORDER = "#2A2A2A";

  const filteredItems = JEWELRY_ITEMS.filter((item) => {
    const catMatch = item.cat === activeCategory;
    const subMatch = activeCategory !== "Ear" || item.sub === activeEarSub;
    const matMatch = materialFilter === "All" || item.material === materialFilter;
    return catMatch && subMatch && matMatch;
  });

  const selectedProduct = selectedItem !== null ? JEWELRY_ITEMS.find((j) => j.id === selectedItem) : null;

  const toggleWishlist = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div style={{ background: BG, color: SAND, fontFamily: "system-ui, sans-serif", minHeight: "100vh" }}>

      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #0F0F0F 0%, #1a0a2e 100%)", padding: "60px 32px 48px", textAlign: "center", borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ display: "inline-block", background: ACCENT, color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: 3, padding: "4px 16px", borderRadius: 2, marginBottom: 20, textTransform: "uppercase" }}>
          PiercePoint Studio
        </div>
        <h1 style={{ fontSize: 40, fontWeight: 800, color: "#fff", margin: "0 0 16px", letterSpacing: -1, lineHeight: 1.15 }}>
          {isUk ? "Пірсинг як ювелірне мистецтво" : "Piercing as jewelry art"}
        </h1>
        <p style={{ fontSize: 17, color: SAND, maxWidth: 480, margin: "0 auto 24px", opacity: 0.85 }}>
          {isUk ? "Стерильно. Безпечно. Преміальні прикраси." : "Sterile. Safe. Premium jewelry."}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
          {["✓ Licensed piercer", "✓ Autoclave every time", "✓ G23 Titanium jewelry"].map((t) => (
            <span key={t} style={{ background: "#1A1A1A", border: `1px solid ${ACCENT}30`, color: ACCENT, fontSize: 12, padding: "6px 14px", borderRadius: 20 }}>{t}</span>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 16px" }}>

        {/* Safety Cards */}
        <section style={{ padding: "48px 0 32px" }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 24 }}>
            {isUk ? "Медична безпека" : "Medical Safety"}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
            {SAFETY_CARDS.map((c) => (
              <div key={c.titleEn} style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 20 }}>
                <div style={{ marginBottom: 10 }}><EmojiIcon emoji={c.emojiIcon} className="w-10 h-10" /></div>
                <div style={{ fontWeight: 700, color: ACCENT, fontSize: 14, marginBottom: 6 }}>{isUk ? c.titleUk : c.titleEn}</div>
                <div style={{ fontSize: 12, color: SAND, opacity: 0.75, lineHeight: 1.5 }}>{isUk ? c.descUk : c.descEn}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Jewelry Catalog */}
        <section style={{ padding: "32px 0" }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 20 }}>
            {isUk ? "Каталог прикрас" : "Jewelry Catalog"}
          </h2>

          {/* Category tabs */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => { setActiveCategory(cat); setActiveEarSub("Lobe"); setSelectedItem(null); }}
                style={{ padding: "8px 18px", borderRadius: 20, border: `1px solid ${activeCategory === cat ? ACCENT : BORDER}`, background: activeCategory === cat ? ACCENT : "transparent", color: activeCategory === cat ? "#fff" : SAND, fontSize: 13, cursor: "pointer", fontWeight: 600 }}>
                {cat}
              </button>
            ))}
          </div>

          {/* Ear sub-tabs */}
          {activeCategory === "Ear" && (
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
              {EAR_SUBCATS.map((sub) => (
                <button key={sub} onClick={() => { setActiveEarSub(sub); setSelectedItem(null); }}
                  style={{ padding: "5px 14px", borderRadius: 20, border: `1px solid ${activeEarSub === sub ? "#fff" : BORDER}`, background: "transparent", color: activeEarSub === sub ? "#fff" : "#888", fontSize: 12, cursor: "pointer" }}>
                  {sub}
                </button>
              ))}
            </div>
          )}

          {/* Material filter */}
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 20 }}>
            <span style={{ fontSize: 12, color: "#888" }}>{isUk ? "Матеріал:" : "Material:"}</span>
            {["All", "Titanium", "Gold", "Steel"].map((m) => (
              <button key={m} onClick={() => setMaterialFilter(m)}
                style={{ padding: "4px 12px", borderRadius: 12, border: `1px solid ${materialFilter === m ? ACCENT : BORDER}`, background: materialFilter === m ? `${ACCENT}20` : "transparent", color: materialFilter === m ? ACCENT : "#888", fontSize: 12, cursor: "pointer" }}>
                {m}
              </button>
            ))}
          </div>

          {/* Product grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 14 }}>
            {filteredItems.map((item) => (
              <div key={item.id} onClick={() => setSelectedItem(item.id)}
                style={{ background: CARD_BG, border: `1px solid ${selectedItem === item.id ? ACCENT : BORDER}`, borderRadius: 12, padding: 16, cursor: "pointer", transition: "border-color .2s" }}>
                <div style={{ textAlign: "center", marginBottom: 10 }}><EmojiIcon emoji={item.emoji} className="w-14 h-14" /></div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{isUk ? item.nameUk : item.nameEn}</div>
                <div style={{ fontSize: 11, color: ACCENT, marginBottom: 6 }}>{item.material}</div>
                <div style={{ fontSize: 11, color: "#888", marginBottom: 10 }}>{item.sizes.join(" / ")}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: SAND, fontWeight: 700, fontSize: 14 }}>₴{item.price}</span>
                  <button onClick={(e) => toggleWishlist(item.id, e)}
                    style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: wishlist.has(item.id) ? "#ef4444" : "#555", padding: 0 }}>
                    {wishlist.has(item.id) ? "❤️" : "🤍"}
                  </button>
                </div>
              </div>
            ))}
            {filteredItems.length === 0 && (
              <div style={{ gridColumn: "1/-1", textAlign: "center", color: "#555", padding: 40, fontSize: 14 }}>
                {isUk ? "Немає товарів за цим фільтром" : "No items match this filter"}
              </div>
            )}
          </div>

          {/* Product detail panel */}
          {selectedProduct && (
            <div style={{ marginTop: 24, background: "#1a0a2e", border: `1px solid ${ACCENT}50`, borderRadius: 16, padding: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontSize: 11, color: ACCENT, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, marginBottom: 8 }}>{selectedProduct.material} · {selectedProduct.sub}</div>
                  <h3 style={{ fontSize: 20, color: "#fff", fontWeight: 800, margin: "0 0 8px" }}>{isUk ? selectedProduct.nameUk : selectedProduct.nameEn}</h3>
                  <div style={{ fontSize: 12, color: SAND, marginBottom: 12, opacity: 0.8 }}>
                    {isUk ? "Доступні розміри:" : "Available sizes:"} {selectedProduct.sizes.join(", ")}
                  </div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: ACCENT, marginBottom: 16 }}>₴{selectedProduct.price}</div>
                  <button style={{ background: ACCENT, color: "#fff", border: "none", borderRadius: 8, padding: "12px 24px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
                    {isUk ? "Записатися з цією прикрасою" : "Book piercing with this jewelry"}
                  </button>
                </div>
                <div><EmojiIcon emoji={selectedProduct.emoji} className="w-16 h-16" /></div>
              </div>
            </div>
          )}
        </section>

        {/* Portfolio grid */}
        <section style={{ padding: "32px 0" }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 20 }}>
            {isUk ? "Портфоліо" : "Portfolio"}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            {PORTFOLIO_TILES.map((tile) => (
              <div key={tile.id} style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 10, aspectRatio: "1", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <div><EmojiIcon emoji={tile.emoji} className="w-14 h-14" /></div>
                <div style={{ fontSize: 11, color: SAND, opacity: 0.7, textAlign: "center", padding: "0 8px" }}>{isUk ? tile.labelUk : tile.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Aftercare */}
        <section style={{ padding: "32px 0" }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 20 }}>
            {isUk ? "Догляд після пірсингу" : "Aftercare Guide"}
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {AFTERCARE.map((step, i) => (
              <div key={i} style={{ background: CARD_BG, border: `1px solid ${openAftercare === i ? ACCENT + "60" : BORDER}`, borderRadius: 10, overflow: "hidden" }}>
                <button onClick={() => setOpenAftercare(openAftercare === i ? null : i)}
                  style={{ width: "100%", background: "none", border: "none", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", color: "#fff" }}>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>
                    <span style={{ color: ACCENT, marginRight: 10 }}>0{i + 1}</span>
                    {isUk ? step.titleUk : step.titleEn}
                  </span>
                  <span style={{ color: ACCENT, fontSize: 18 }}>{openAftercare === i ? "−" : "+"}</span>
                </button>
                {openAftercare === i && (
                  <div style={{ padding: "0 20px 16px", fontSize: 13, color: SAND, opacity: 0.8, lineHeight: 1.6 }}>
                    {isUk ? step.bodyUk : step.bodyEn}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Booking */}
        <section style={{ padding: "32px 0 48px" }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 20 }}>
            {isUk ? "Запис на процедуру" : "Book a Session"}
          </h2>
          {bookingSent ? (
            <div style={{ background: `${ACCENT}20`, border: `1px solid ${ACCENT}`, borderRadius: 12, padding: 32, textAlign: "center" }}>
              <div style={{ marginBottom: 12 }}><EmojiIcon emoji="✅" className="w-14 h-14" /></div>
              <div style={{ fontWeight: 700, color: "#fff", fontSize: 18 }}>{isUk ? "Запит надіслано!" : "Booking request sent!"}</div>
              <div style={{ color: SAND, fontSize: 13, marginTop: 8, opacity: 0.8 }}>{isUk ? "Підтвердимо протягом години." : "We'll confirm within the hour."}</div>
            </div>
          ) : (
            <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 14, padding: 28, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ gridColumn: "1/-1" }}>
                <label style={{ display: "block", fontSize: 12, color: "#888", marginBottom: 6 }}>{isUk ? "Тип пірсингу" : "Piercing Type"}</label>
                <select value={bookingType} onChange={(e) => setBookingType(e.target.value)}
                  style={{ width: "100%", background: "#111", border: `1px solid ${BORDER}`, color: SAND, borderRadius: 8, padding: "10px 12px", fontSize: 13 }}>
                  <option value="">{isUk ? "Оберіть..." : "Select..."}</option>
                  {PIERCE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              {[
                { label: isUk ? "Дата" : "Date", val: bookingDate, set: setBookingDate, placeholder: "DD.MM.YYYY" },
                { label: isUk ? "Ваше ім'я" : "Your Name", val: bookingName, set: setBookingName, placeholder: isUk ? "Ім'я" : "Name" },
              ].map((f) => (
                <div key={f.label}>
                  <label style={{ display: "block", fontSize: 12, color: "#888", marginBottom: 6 }}>{f.label}</label>
                  <input value={f.val} onChange={(e) => f.set(e.target.value)} placeholder={f.placeholder}
                    style={{ width: "100%", background: "#111", border: `1px solid ${BORDER}`, color: SAND, borderRadius: 8, padding: "10px 12px", fontSize: 13, boxSizing: "border-box" }} />
                </div>
              ))}
              <div>
                <label style={{ display: "block", fontSize: 12, color: "#888", marginBottom: 6 }}>{isUk ? "Телефон" : "Phone"}</label>
                <input value={bookingPhone} onChange={(e) => setBookingPhone(e.target.value)} placeholder="+380"
                  style={{ width: "100%", background: "#111", border: `1px solid ${BORDER}`, color: SAND, borderRadius: 8, padding: "10px 12px", fontSize: 13, boxSizing: "border-box" }} />
              </div>
              <div style={{ gridColumn: "1/-1" }}>
                <button onClick={() => setBookingSent(true)} disabled={!bookingType || !bookingDate || !bookingName}
                  style={{ width: "100%", background: ACCENT, color: "#fff", border: "none", borderRadius: 10, padding: "14px", fontWeight: 700, fontSize: 15, cursor: bookingType && bookingDate && bookingName ? "pointer" : "not-allowed", opacity: bookingType && bookingDate && bookingName ? 1 : 0.5 }}>
                  {isUk ? "Підтвердити запис" : "Confirm Booking"}
                </button>
              </div>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
