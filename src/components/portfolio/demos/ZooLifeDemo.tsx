"use client";

import { useState } from "react";
import { EmojiIcon } from "@/components/ui/EmojiIcon";

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV = [
  { en: "Shop", uk: "Магазин" },
  { en: "Vet", uk: "Ветклініка" },
  { en: "Grooming", uk: "Грумінг" },
  { en: "Loyalty", uk: "Програма" },
  { en: "Locations", uk: "Адреси" },
];

const QUIZ_PET_TYPES = ["Dog", "Cat", "Rabbit", "Bird", "Fish", "Reptile"];
const QUIZ_PET_TYPES_UK = ["Собака", "Кіт", "Кролик", "Птах", "Риба", "Рептилія"];
const QUIZ_AGES = [
  { en: "Baby (< 1 year)", uk: "Малюк (< 1 року)" },
  { en: "Adult (1–7 years)", uk: "Дорослий (1–7 років)" },
  { en: "Senior (7+ years)", uk: "Старший (7+ років)" },
];
const QUIZ_HEALTH = [
  { en: "Healthy", uk: "Здоровий" },
  { en: "Weight management", uk: "Контроль ваги" },
  { en: "Joint problems", uk: "Проблеми з суглобами" },
  { en: "Sensitive digestion", uk: "Чутливе травлення" },
  { en: "Skin & coat", uk: "Шкіра та шерсть" },
];
const QUIZ_BUDGET = [
  { en: "Economy", uk: "Економ" },
  { en: "Standard", uk: "Стандарт" },
  { en: "Premium", uk: "Преміум" },
];

const FOOD_RESULTS = [
  { nameEn: "ProBalance Active Adult", nameUk: "ProBalance Актив Дорослий", brand: "ProBalance", descEn: "Complete balanced formula with chicken and rice for active adult dogs.", descUk: "Повноцінний збалансований корм із куркою та рисом для активних дорослих собак.", price: "320 ₴ / 3 кг" },
  { nameEn: "GoldenAge Senior Care", nameUk: "GoldenAge Старший", brand: "GoldenAge", descEn: "Low-calorie recipe with glucosamine to support ageing joints.", descUk: "Низькокалорійний рецепт із глюкозаміном для підтримки суглобів.", price: "480 ₴ / 3 кг" },
  { nameEn: "NaturMix Sensitive", nameUk: "NaturMix Делікатний", brand: "NaturMix", descEn: "Single-protein formula for pets with sensitive stomachs.", descUk: "Монобілковий корм для тварин із чутливим шлунком.", price: "540 ₴ / 2 кг" },
];

const SHOP_TABS = [
  { en: "Dog", uk: "Собаки" },
  { en: "Cat", uk: "Коти" },
  { en: "Small animals", uk: "Гризуни" },
  { en: "Birds", uk: "Птахи" },
  { en: "Fish", uk: "Рибки" },
  { en: "Accessories", uk: "Аксесуари" },
];

type Product = { emoji: string; nameEn: string; nameUk: string; typeEn: string; typeUk: string; price: string };

const PRODUCTS: Record<string, Product[]> = {
  Dog: [
    { emoji: "🥩", nameEn: "Dry food 3 kg", nameUk: "Сухий корм 3 кг", typeEn: "Food", typeUk: "Корм", price: "320 ₴" },
    { emoji: "🦴", nameEn: "Chew bone set", nameUk: "Набір жувальних кісток", typeEn: "Treats", typeUk: "Ласощі", price: "120 ₴" },
    { emoji: "🎾", nameEn: "Tennis ball 3-pack", nameUk: "Тенісні м'ячі 3 шт", typeEn: "Toy", typeUk: "Іграшка", price: "85 ₴" },
    { emoji: "🦮", nameEn: "Adjustable harness", nameUk: "Регульована шлейка", typeEn: "Gear", typeUk: "Спорядження", price: "450 ₴" },
  ],
  Cat: [
    { emoji: "🐟", nameEn: "Wet food pouch 85g", nameUk: "Вологий корм 85г", typeEn: "Food", typeUk: "Корм", price: "38 ₴" },
    { emoji: "🪢", nameEn: "Scratching post", nameUk: "Дряпалка", typeEn: "Furniture", typeUk: "Меблі", price: "680 ₴" },
    { emoji: "🔮", nameEn: "Interactive feather toy", nameUk: "Інтерактивна іграшка-пір'я", typeEn: "Toy", typeUk: "Іграшка", price: "140 ₴" },
    { emoji: "🧴", nameEn: "Cat shampoo 250ml", nameUk: "Шампунь для котів 250мл", typeEn: "Grooming", typeUk: "Грумінг", price: "165 ₴" },
  ],
  "Small animals": [
    { emoji: "🌿", nameEn: "Hay 1 kg", nameUk: "Сіно 1 кг", typeEn: "Food", typeUk: "Корм", price: "95 ₴" },
    { emoji: "🏠", nameEn: "Wooden hideout", nameUk: "Дерев'яний будиночок", typeEn: "Accessory", typeUk: "Аксесуар", price: "280 ₴" },
    { emoji: "🎡", nameEn: "Exercise wheel", nameUk: "Колесо для бігу", typeEn: "Toy", typeUk: "Іграшка", price: "195 ₴" },
    { emoji: "🛏️", nameEn: "Bedding chips 5L", nameUk: "Підстилка-стружка 5л", typeEn: "Bedding", typeUk: "Підстилка", price: "110 ₴" },
  ],
  Birds: [
    { emoji: "🌾", nameEn: "Birdseed mix 1 kg", nameUk: "Мікс зерна 1 кг", typeEn: "Food", typeUk: "Корм", price: "75 ₴" },
    { emoji: "🪜", nameEn: "Wooden perch", nameUk: "Жердинка дерев'яна", typeEn: "Accessory", typeUk: "Аксесуар", price: "60 ₴" },
    { emoji: "🔔", nameEn: "Bell toy", nameUk: "Іграшка-дзвінок", typeEn: "Toy", typeUk: "Іграшка", price: "45 ₴" },
    { emoji: "🪴", nameEn: "Cuttlebone mineral", nameUk: "Сепія мінеральна", typeEn: "Supplement", typeUk: "Добавка", price: "30 ₴" },
  ],
  Fish: [
    { emoji: "🐠", nameEn: "Tropical flake food", nameUk: "Пластівці для тропічних риб", typeEn: "Food", typeUk: "Корм", price: "55 ₴" },
    { emoji: "🌊", nameEn: "Water conditioner 100ml", nameUk: "Кондиціонер для води 100мл", typeEn: "Care", typeUk: "Догляд", price: "90 ₴" },
    { emoji: "🪨", nameEn: "Decorative stones 500g", nameUk: "Декоративний гравій 500г", typeEn: "Decor", typeUk: "Декор", price: "70 ₴" },
    { emoji: "💡", nameEn: "LED aquarium light", nameUk: "LED-лампа для акваріуму", typeEn: "Equipment", typeUk: "Обладнання", price: "450 ₴" },
  ],
  Accessories: [
    { emoji: "🛁", nameEn: "Pet travel bag", nameUk: "Сумка-переноска", typeEn: "Travel", typeUk: "Подорожі", price: "890 ₴" },
    { emoji: "🧹", nameEn: "Lint roller 5-pack", nameUk: "Ролик для шерсті 5 шт", typeEn: "Cleaning", typeUk: "Прибирання", price: "135 ₴" },
    { emoji: "📷", nameEn: "Pet GPS tracker", nameUk: "GPS-трекер для тварин", typeEn: "Safety", typeUk: "Безпека", price: "1 250 ₴" },
    { emoji: "🍽️", nameEn: "Stainless steel bowl set", nameUk: "Набір мисок з нержавіючої сталі", typeEn: "Feeding", typeUk: "Годування", price: "220 ₴" },
  ],
};

const VET_SERVICES = [
  { emoji: "🩺", en: "General Checkup", uk: "Загальний огляд", price: "350 ₴" },
  { emoji: "💉", en: "Vaccination", uk: "Вакцинація", price: "450 ₴" },
  { emoji: "🦷", en: "Dental Cleaning", uk: "Чищення зубів", price: "1 200 ₴" },
  { emoji: "🔪", en: "Minor Surgery", uk: "Мінімальна хірургія", price: "2 000+ ₴" },
];

const LOCATIONS = [
  { nameEn: "ZooLife Prymiska", nameUk: "ZooLife Приміська", addr: "вул. Приміська, 14", hours: "08:00–21:00", servicesEn: ["Shop", "Vet", "Grooming"], servicesUk: ["Магазин", "Ветклініка", "Грумінг"] },
  { nameEn: "ZooLife Center", nameUk: "ZooLife Центр", addr: "вул. Дерибасівська, 7", hours: "09:00–20:00", servicesEn: ["Shop", "Vet"], servicesUk: ["Магазин", "Ветклініка"] },
  { nameEn: "ZooLife Kotovskogo", nameUk: "ZooLife Котовського", addr: "пр. Котовського, 55", hours: "09:00–21:00", servicesEn: ["Shop", "Grooming", "Pet hotel"], servicesUk: ["Магазин", "Грумінг", "Готель"] },
];

// ─── Component ───────────────────────────────────────────────────────────────

export function ZooLifeDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  // Quiz state
  const [qPet, setQPet] = useState<number | null>(null);
  const [qAge, setQAge] = useState<number | null>(null);
  const [qHealth, setQHealth] = useState<number | null>(null);
  const [qBudget, setQBudget] = useState<number | null>(null);
  const [quizDone, setQuizDone] = useState(false);

  // Shop state
  const [activeTab, setActiveTab] = useState(0);
  const [cart, setCart] = useState<Record<string, number>>({});

  const cartTotal = Object.values(cart).reduce((a, b) => a + b, 0);

  const addToCart = (key: string) => setCart((prev) => ({ ...prev, [key]: (prev[key] || 0) + 1 }));

  const tabKey = SHOP_TABS[activeTab].en;
  const tabProducts = PRODUCTS[tabKey] || [];

  const quizReady = qPet !== null && qAge !== null && qHealth !== null && qBudget !== null;

  return (
    <div style={{ fontFamily: "Inter, sans-serif", background: "#F9FAFB", color: "#111827" }}>
      {/* Nav */}
      <nav style={{ background: "#0D9488", padding: "14px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
        <span style={{ fontWeight: 800, fontSize: 20, color: "#fff", letterSpacing: "-0.5px" }}>ZooLife 🐾</span>
        <div style={{ display: "flex", gap: 20 }}>
          {NAV.map((n) => (
            <a key={n.en} href="#" style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", textDecoration: "none", fontWeight: 500 }}>{isUk ? n.uk : n.en}</a>
          ))}
        </div>
        <div style={{ position: "relative", cursor: "pointer" }}>
          <span style={{ fontSize: 22 }}>🛒</span>
          {cartTotal > 0 && (
            <span style={{ position: "absolute", top: -6, right: -8, background: "#FCD34D", color: "#111827", fontSize: 11, fontWeight: 800, borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>{cartTotal}</span>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #0D9488 0%, #0F766E 100%)", color: "#fff", padding: "56px 32px", textAlign: "center" }}>
        <h1 style={{ fontSize: 38, fontWeight: 900, margin: "0 0 12px", lineHeight: 1.2 }}>
          {isUk ? "Все для вашого улюбленця — під одним дахом" : "Everything for your pet — under one roof"}
        </h1>
        <p style={{ color: "rgba(255,255,255,0.8)", marginBottom: 28, fontSize: 16 }}>
          {isUk ? "3 магазини в Одесі" : "3 stores in Odesa"}
        </p>
        <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap", marginBottom: 28 }}>
          {[{ icon: "🛒", en: "Shop", uk: "Магазин" }, { icon: "💉", en: "Vet", uk: "Ветклініка" }, { icon: "✂️", en: "Grooming", uk: "Грумінг" }, { icon: "🏨", en: "Pet hotel", uk: "Готель" }].map((s) => (
            <div key={s.en} style={{ background: "rgba(255,255,255,0.15)", padding: "10px 20px", borderRadius: 30, fontSize: 14, fontWeight: 600 }}>{s.icon} {isUk ? s.uk : s.en}</div>
          ))}
        </div>
        <button style={{ background: "#FCD34D", color: "#111827", border: "none", padding: "13px 30px", borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
          {isUk ? "Перейти до каталогу" : "Browse catalogue"}
        </button>
      </section>

      {/* Food Advisor Quiz */}
      <section style={{ padding: "48px 32px", maxWidth: 720, margin: "0 auto" }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>{isUk ? "Підбір корму" : "Food Advisor"}</h2>
        <p style={{ color: "#6B7280", fontSize: 14, marginBottom: 28 }}>{isUk ? "Знайдіть ідеальний корм для вашого улюбленця" : "Find the right food for your pet"}</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <p style={{ fontWeight: 600, fontSize: 13, marginBottom: 8, color: "#374151" }}>{isUk ? "1. Тип тварини" : "1. Pet type"}</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {QUIZ_PET_TYPES.map((p, i) => (
                <button key={p} onClick={() => setQPet(i)} style={{ padding: "7px 16px", borderRadius: 20, border: `2px solid ${qPet === i ? "#0D9488" : "#E5E7EB"}`, background: qPet === i ? "#0D9488" : "#fff", color: qPet === i ? "#fff" : "#374151", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
                  {isUk ? QUIZ_PET_TYPES_UK[i] : p}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontWeight: 600, fontSize: 13, marginBottom: 8, color: "#374151" }}>{isUk ? "2. Вік" : "2. Age"}</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {QUIZ_AGES.map((a, i) => (
                <button key={a.en} onClick={() => setQAge(i)} style={{ padding: "7px 16px", borderRadius: 20, border: `2px solid ${qAge === i ? "#0D9488" : "#E5E7EB"}`, background: qAge === i ? "#0D9488" : "#fff", color: qAge === i ? "#fff" : "#374151", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
                  {isUk ? a.uk : a.en}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontWeight: 600, fontSize: 13, marginBottom: 8, color: "#374151" }}>{isUk ? "3. Стан здоров'я" : "3. Health concern"}</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {QUIZ_HEALTH.map((h, i) => (
                <button key={h.en} onClick={() => setQHealth(i)} style={{ padding: "7px 16px", borderRadius: 20, border: `2px solid ${qHealth === i ? "#0D9488" : "#E5E7EB"}`, background: qHealth === i ? "#0D9488" : "#fff", color: qHealth === i ? "#fff" : "#374151", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
                  {isUk ? h.uk : h.en}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontWeight: 600, fontSize: 13, marginBottom: 8, color: "#374151" }}>{isUk ? "4. Бюджет" : "4. Budget"}</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {QUIZ_BUDGET.map((b, i) => (
                <button key={b.en} onClick={() => setQBudget(i)} style={{ padding: "7px 16px", borderRadius: 20, border: `2px solid ${qBudget === i ? "#0D9488" : "#E5E7EB"}`, background: qBudget === i ? "#0D9488" : "#fff", color: qBudget === i ? "#fff" : "#374151", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
                  {isUk ? b.uk : b.en}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button onClick={() => setQuizDone(true)} disabled={!quizReady} style={{ marginTop: 24, background: "#0D9488", color: "#fff", border: "none", padding: "13px 28px", borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: quizReady ? "pointer" : "not-allowed", opacity: quizReady ? 1 : 0.5 }}>
          {isUk ? "Підібрати корм" : "Find food"}
        </button>

        {quizDone && (
          <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 14 }}>
            <p style={{ fontWeight: 700, fontSize: 16, color: "#0D9488" }}>{isUk ? "Рекомендації для вас:" : "Recommended for you:"}</p>
            {FOOD_RESULTS.map((f) => (
              <div key={f.nameEn} style={{ background: "#fff", border: "1px solid #D1FAE5", borderRadius: 10, padding: "16px 18px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{isUk ? f.nameUk : f.nameEn}</p>
                  <p style={{ color: "#0D9488", fontSize: 12, fontWeight: 600, marginBottom: 4 }}>{f.brand}</p>
                  <p style={{ color: "#6B7280", fontSize: 13 }}>{isUk ? f.descUk : f.descEn}</p>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <p style={{ fontWeight: 800, fontSize: 15, color: "#0D9488", marginBottom: 8 }}>{f.price}</p>
                  <button style={{ background: "#FCD34D", color: "#111827", border: "none", padding: "7px 14px", borderRadius: 6, fontWeight: 700, fontSize: 12, cursor: "pointer" }}>
                    {isUk ? "У кошик" : "Add to cart"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Shop Catalog */}
      <section style={{ padding: "48px 32px", background: "#fff" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 20 }}>{isUk ? "Каталог" : "Shop Catalog"}</h2>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
            {SHOP_TABS.map((t, i) => (
              <button key={t.en} onClick={() => setActiveTab(i)} style={{ padding: "8px 18px", borderRadius: 20, border: "none", background: activeTab === i ? "#0D9488" : "#F3F4F6", color: activeTab === i ? "#fff" : "#374151", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
                {isUk ? t.uk : t.en}
              </button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: 16 }}>
            {tabProducts.map((p) => {
              const key = `${tabKey}-${p.nameEn}`;
              return (
                <div key={p.nameEn} style={{ background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: 10, padding: "16px", textAlign: "center" }}>
                  <div style={{ marginBottom: 8 }}><EmojiIcon emoji={p.emoji} className="w-14 h-14" /></div>
                  <p style={{ fontWeight: 700, fontSize: 13, marginBottom: 2 }}>{isUk ? p.nameUk : p.nameEn}</p>
                  <p style={{ color: "#9CA3AF", fontSize: 11, marginBottom: 8 }}>{isUk ? p.typeUk : p.typeEn}</p>
                  <p style={{ fontWeight: 800, fontSize: 15, color: "#0D9488", marginBottom: 10 }}>{p.price}</p>
                  <button onClick={() => addToCart(key)} style={{ background: "#0D9488", color: "#fff", border: "none", padding: "7px 16px", borderRadius: 6, fontWeight: 600, fontSize: 12, cursor: "pointer", width: "100%" }}>
                    {cart[key] ? `✓ ${cart[key]}` : (isUk ? "У кошик" : "Add to cart")}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Vet Services */}
      <section style={{ padding: "48px 32px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 20 }}>{isUk ? "Ветеринарні послуги" : "Vet Services"}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
            {VET_SERVICES.map((s) => (
              <div key={s.en} style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, padding: "20px", textAlign: "center" }}>
                <div style={{ marginBottom: 8 }}><EmojiIcon emoji={s.emoji} className="w-14 h-14" /></div>
                <h3 style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{isUk ? s.uk : s.en}</h3>
                <p style={{ color: "#0D9488", fontWeight: 700, marginBottom: 12 }}>{s.price}</p>
                <button style={{ background: "#F9FAFB", border: "1px solid #0D9488", color: "#0D9488", padding: "7px 14px", borderRadius: 6, fontWeight: 600, fontSize: 12, cursor: "pointer" }}>
                  {isUk ? "Записатися" : "Book now"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Loyalty */}
      <section style={{ padding: "40px 32px", background: "#FCD34D" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>{isUk ? "Програма лояльності «Лапки»" : "Paws Loyalty Program"}</h2>
          <p style={{ fontSize: 14, marginBottom: 20 }}>{isUk ? "Заробляйте бали за кожну покупку та обмінюйте на знижки" : "Earn points on every purchase and redeem for discounts"}</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            {[{ en: "1 ₴ = 1 point", uk: "1 ₴ = 1 бал" }, { en: "100 pts = 10 ₴ off", uk: "100 балів = 10 ₴ знижки" }, { en: "Birthday bonus: ×2 pts", uk: "День народження: ×2 бали" }].map((item) => (
              <div key={item.en} style={{ background: "rgba(255,255,255,0.7)", padding: "10px 18px", borderRadius: 20, fontSize: 13, fontWeight: 700 }}>🐾 {isUk ? item.uk : item.en}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section style={{ padding: "48px 32px", background: "#fff" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 20 }}>{isUk ? "Наші магазини в Одесі" : "Our Odesa Stores"}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 16 }}>
            {LOCATIONS.map((loc) => (
              <div key={loc.nameEn} style={{ background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: 10, padding: "20px" }}>
                <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 4, color: "#0D9488" }}>{isUk ? loc.nameUk : loc.nameEn}</h3>
                <p style={{ fontSize: 13, color: "#374151", marginBottom: 4 }}>📍 {loc.addr}</p>
                <p style={{ fontSize: 13, color: "#6B7280", marginBottom: 10 }}>🕐 {loc.hours}</p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {(isUk ? loc.servicesUk : loc.servicesEn).map((s) => (
                    <span key={s} style={{ background: "#D1FAE5", color: "#065F46", fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 10 }}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#0D9488", color: "rgba(255,255,255,0.8)", padding: "24px 32px", textAlign: "center", fontSize: 13 }}>
        © 2025 ZooLife · {isUk ? "Зоомагазин + Ветклініка · Одеса" : "Pet shop + Vet clinic · Odesa"}
      </footer>
    </div>
  );
}
