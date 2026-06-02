"use client";

import { useState } from "react";

export function CeramicaDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  // --- State ---
  const [activeCollection, setActiveCollection] = useState<number>(0);
  const [selectedProduct, setSelectedProduct] = useState<null | {
    name: string;
    material: string;
    price: string;
    limited: string;
    description: string;
    care: string;
    color: string;
  }>(null);
  const [activeSlot, setActiveSlot] = useState<{ day: string; time: string } | null>(null);
  const [bookingType, setBookingType] = useState<string>("wheel");
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [bookingData, setBookingData] = useState({
    date: "",
    guests: "1",
    name: "",
    phone: "",
    wishes: "",
  });
  const [enrollCourse, setEnrollCourse] = useState<number | null>(null);
  const [enrollData, setEnrollData] = useState({ name: "", phone: "" });
  const [enrollSubmitted, setEnrollSubmitted] = useState(false);
  const [giftAmount, setGiftAmount] = useState<string>("500");
  const [giftSubmitted, setGiftSubmitted] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");

  // --- Collections data ---
  const collections = [
    {
      name: isUk ? "Ранкова тиша" : "Morning Silence",
      products: [
        {
          name: isUk ? "Сніданкова миска" : "Breakfast bowl",
          material: isUk ? "Шамот, матова глазур" : "Chamotte, matte glaze",
          price: "₴680",
          limited: isUk ? "Обмежено: 5 шт." : "Limited: 5 pcs",
          description: isUk
            ? "Ручна робота, кожна — унікальна. Підходить для злаків, супу, фруктів. Діаметр 16 см."
            : "Handmade, each piece is unique. Perfect for cereals, soup, fruit. Diameter 16 cm.",
          care: isUk ? "Можна мити у посудомийній машині. Не використовувати в мікрохвильовій печі." : "Dishwasher safe. Not microwave safe.",
          color: "bg-[#D4C4B0]",
        },
        {
          name: isUk ? "Набір кавових чашок" : "Coffee cup set",
          material: isUk ? "Фарфор, матова глазур" : "Porcelain, matte glaze",
          price: "₴950",
          limited: isUk ? "Обмежено: 3 шт." : "Limited: 3 pcs",
          description: isUk
            ? "Набір з 2 чашок, кожна 200 мл. Ідеально для ранкової кави або еспресо."
            : "Set of 2 cups, 200 ml each. Ideal for morning coffee or espresso.",
          care: isUk ? "Ручне миття рекомендовано. Не підходить для мікрохвильової печі." : "Hand washing recommended. Not microwave safe.",
          color: "bg-[#C4B8A8]",
        },
        {
          name: isUk ? "Глечик для молока" : "Milk jug",
          material: isUk ? "Шамот, прозора глазур" : "Chamotte, clear glaze",
          price: "₴520",
          limited: isUk ? "Обмежено: 7 шт." : "Limited: 7 pcs",
          description: isUk
            ? "Місткість 300 мл. Зручна ручка, акуратний носик. Відмінно поєднується з набором чашок."
            : "Capacity 300 ml. Comfortable handle, neat spout. Pairs perfectly with cup sets.",
          care: isUk ? "Ручне миття. Не залишати молоко довше 24 годин." : "Hand wash. Do not leave milk for more than 24 hours.",
          color: "bg-[#E0D4C4]",
        },
        {
          name: isUk ? "Тарілка для хліба" : "Bread plate",
          material: isUk ? "Теракота, матова глазур" : "Terracotta, matte glaze",
          price: "₴480",
          limited: isUk ? "Обмежено: 4 шт." : "Limited: 4 pcs",
          description: isUk
            ? "Плоска тарілка 22 см. Рустикальний вигляд, природна текстура теракоти."
            : "Flat plate 22 cm. Rustic look, natural terracotta texture.",
          care: isUk ? "Ручне миття. Уникати тривалого замочування." : "Hand wash. Avoid prolonged soaking.",
          color: "bg-[#C4836A]",
        },
      ],
    },
    {
      name: isUk ? "Осінній ліс" : "Autumn Forest",
      products: [
        {
          name: isUk ? "Кухоль" : "Mug",
          material: isUk ? "Шамот, матова глазур" : "Chamotte, matte glaze",
          price: "₴420",
          limited: isUk ? "Обмежено: 8 шт." : "Limited: 8 pcs",
          description: isUk
            ? "Кухоль 350 мл з широкою ручкою. Приємний у руці, зберігає тепло."
            : "350 ml mug with a wide handle. Comfortable to hold, retains warmth.",
          care: isUk ? "Посудомийна машина дозволена. Не мікрохвильова." : "Dishwasher safe. Not microwave safe.",
          color: "bg-[#8B6914]",
        },
        {
          name: isUk ? "Суп-миска" : "Soup bowl",
          material: isUk ? "Фарфор, кольорова глазур" : "Porcelain, colored glaze",
          price: "₴550",
          limited: isUk ? "Обмежено: 6 шт." : "Limited: 6 pcs",
          description: isUk
            ? "Глибока миска 600 мл. Теплі осінні тони, ручний розпис."
            : "Deep bowl 600 ml. Warm autumn tones, hand-painted.",
          care: isUk ? "Ручне миття для збереження розпису." : "Hand wash to preserve the painting.",
          color: "bg-[#A07840]",
        },
        {
          name: isUk ? "Чайний сервіз" : "Tea set",
          material: isUk ? "Кераміка, матова глазур" : "Ceramics, matte glaze",
          price: "₴1 200",
          limited: isUk ? "Обмежено: 2 шт." : "Limited: 2 pcs",
          description: isUk
            ? "Сервіз на 4 особи: чайник 800 мл + 4 чашки по 150 мл. Осінній розпис."
            : "Set for 4: 800 ml teapot + 4 cups of 150 ml. Autumn painting.",
          care: isUk ? "Тільки ручне миття. Не кидати в посудомийну." : "Hand wash only. Not dishwasher safe.",
          color: "bg-[#6B4226]",
        },
        {
          name: isUk ? "Маленька ваза" : "Vase small",
          material: isUk ? "Шамот, прозора глазур" : "Chamotte, clear glaze",
          price: "₴680",
          limited: isUk ? "Обмежено: 5 шт." : "Limited: 5 pcs",
          description: isUk
            ? "Висота 18 см. Підходить для польових квітів або сухоцвітів."
            : "Height 18 cm. Perfect for wildflowers or dried flowers.",
          care: isUk ? "Протирати вологою ганчіркою." : "Wipe with a damp cloth.",
          color: "bg-[#9E7B50]",
        },
      ],
    },
    {
      name: isUk ? "Узбережжя" : "Seaside",
      products: [
        {
          name: isUk ? "Глечик для води" : "Water jug",
          material: isUk ? "Кераміка, синя глазур" : "Ceramics, blue glaze",
          price: "₴750",
          limited: isUk ? "Обмежено: 4 шт." : "Limited: 4 pcs",
          description: isUk
            ? "Глечик 1.2 л. Морські тони, прохолодна синьо-біла глазур."
            : "1.2 L jug. Sea tones, cool blue-white glaze.",
          care: isUk ? "Можна мити в посудомийній. Не морозильник." : "Dishwasher safe. Not freezer safe.",
          color: "bg-[#5B8DB8]",
        },
        {
          name: isUk ? "Салатниця" : "Salad bowl",
          material: isUk ? "Фарфор, синьо-біла глазур" : "Porcelain, blue-white glaze",
          price: "₴890",
          limited: isUk ? "Обмежено: 3 шт." : "Limited: 3 pcs",
          description: isUk
            ? "Велика миска 28 см. Ручний розпис хвилями. Стає прикрасою столу."
            : "Large 28 cm bowl. Hand-painted with waves. A centerpiece for any table.",
          care: isUk ? "Ручне миття для збереження декору." : "Hand wash to preserve the decor.",
          color: "bg-[#4A7EA0]",
        },
        {
          name: isUk ? "Рибна тарілка" : "Fish plate",
          material: isUk ? "Теракота, прозора глазур" : "Terracotta, clear glaze",
          price: "₴480",
          limited: isUk ? "Обмежено: 6 шт." : "Limited: 6 pcs",
          description: isUk
            ? "Тарілка у формі риби, 24 см. Декоративна або для подачі закусок."
            : "Fish-shaped plate, 24 cm. Decorative or for serving appetizers.",
          care: isUk ? "Ручне миття. Не для гарячих страв." : "Hand wash. Not for hot dishes.",
          color: "bg-[#7AAECC]",
        },
        {
          name: isUk ? "Чашка з блюдцем" : "Cup with saucer",
          material: isUk ? "Кераміка, морська глазур" : "Ceramics, sea glaze",
          price: "₴620",
          limited: isUk ? "Обмежено: 5 шт." : "Limited: 5 pcs",
          description: isUk
            ? "Чашка 200 мл + блюдце. Морська тематика, зелено-синій градієнт."
            : "200 ml cup + saucer. Sea theme, blue-green gradient.",
          care: isUk ? "Ручне миття. Не мікрохвильова." : "Hand wash. Not microwave safe.",
          color: "bg-[#3D8B8B]",
        },
      ],
    },
  ];

  // --- Wheel sessions schedule ---
  const schedule = [
    {
      day: isUk ? "Вт" : "Tue",
      fullDay: isUk ? "Вівторок" : "Tuesday",
      times: ["10:00", "14:00", "18:00"],
    },
    {
      day: isUk ? "Чт" : "Thu",
      fullDay: isUk ? "Четвер" : "Thursday",
      times: ["10:00", "14:00"],
    },
    {
      day: isUk ? "Сб" : "Sat",
      fullDay: isUk ? "Субота" : "Saturday",
      times: ["10:00", "12:00", "14:00", "16:00"],
    },
    {
      day: isUk ? "Нд" : "Sun",
      fullDay: isUk ? "Неділя" : "Sunday",
      times: ["11:00", "14:00"],
    },
  ];

  // --- Courses data ---
  const courses = [
    {
      title: isUk ? "Початківець" : "Beginner",
      sessions: isUk ? "8 занять" : "8 sessions",
      includes: isUk
        ? ["Ліплення на крузі", "Глазурування", "Випалювання", "Усі матеріали включено"]
        : ["Wheel throwing", "Glazing", "Firing", "All materials included"],
      price: "₴3 200",
      desc: isUk
        ? "Ідеально для тих, хто ніколи не тримав глину в руках. Від нуля до першого виробу."
        : "Perfect for those who have never touched clay. From zero to your first piece.",
      color: "bg-[#E8DDD0]",
      accent: "#C4836A",
    },
    {
      title: isUk ? "Просунутий" : "Advanced",
      sessions: isUk ? "6 занять" : "6 sessions",
      includes: isUk
        ? ["Декоративні техніки", "Ангоб та розпис", "Складні форми", "Індивідуальний підхід"]
        : ["Decorative techniques", "Engobe & painting", "Complex shapes", "Individual approach"],
      price: "₴2 800",
      desc: isUk
        ? "Для тих, хто вже вміє ліпити. Поглиблення технік і авторський стиль."
        : "For those who already know the basics. Deepen techniques and find your style.",
      color: "bg-[#DDD4C8]",
      accent: "#8B5E3C",
    },
    {
      title: isUk ? "Дитячий клас" : "Children's Class",
      sessions: isUk ? "Щосуботи, 10:00–11:30" : "Every Saturday, 10:00–11:30",
      includes: isUk
        ? ["Вік 6–12 років", "Ліплення руками", "Розфарбовування", "Безпечні матеріали"]
        : ["Ages 6–12", "Hand molding", "Coloring", "Safe materials"],
      price: "₴380 / " + (isUk ? "заняття" : "session"),
      desc: isUk
        ? "Суботня студія для дітей. Творчість, гра і перший досвід з глиною."
        : "Saturday studio for kids. Creativity, play, and a first experience with clay.",
      color: "bg-[#F0E8DF]",
      accent: "#C4836A",
    },
  ];

  // --- Gift amounts ---
  const giftAmounts = ["500", "1000", "1500", "2000"];

  // --- Handlers ---
  function handleBookingSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBookingSubmitted(true);
  }

  function handleEnrollSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEnrollSubmitted(true);
  }

  function handleAddToCart(name: string) {
    setCartItems((prev) => [...prev, name]);
  }

  function handleGiftSubmit(e: React.FormEvent) {
    e.preventDefault();
    setGiftSubmitted(true);
  }

  // --- Nav sections ---
  const navItems = [
    { id: "hero", label: isUk ? "Головна" : "Home" },
    { id: "shop", label: isUk ? "Колекції" : "Collections" },
    { id: "sessions", label: isUk ? "Сесії" : "Sessions" },
    { id: "courses", label: isUk ? "Курси" : "Courses" },
    { id: "kintsugi", label: "Kintsugi" },
    { id: "gifts", label: isUk ? "Сертифікати" : "Gift Cards" },
    { id: "booking", label: isUk ? "Бронювання" : "Book" },
  ];

  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: "#F9F5F0", color: "#2C1A0E" }}>
      {/* NAV */}
      <nav
        className="sticky top-0 z-50 border-b"
        style={{ backgroundColor: "#F9F5F0", borderColor: "#E8DDD0" }}
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <span className="font-bold text-lg tracking-wide" style={{ color: "#C4836A" }}>
            {isUk ? "Ceramica Studio" : "Ceramica Studio"}
          </span>
          <div className="hidden md:flex gap-5 text-sm">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className="transition-colors hover:opacity-80"
                style={{
                  color: activeSection === item.id ? "#C4836A" : "#6B4226",
                  fontWeight: activeSection === item.id ? 600 : 400,
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
          {cartItems.length > 0 && (
            <div
              className="text-xs px-2 py-1 rounded-full font-medium"
              style={{ backgroundColor: "#C4836A", color: "#F9F5F0" }}
            >
              {isUk ? `Кошик: ${cartItems.length}` : `Cart: ${cartItems.length}`}
            </div>
          )}
        </div>
        {/* Mobile nav */}
        <div className="md:hidden flex gap-2 px-4 pb-2 overflow-x-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className="shrink-0 text-xs px-3 py-1 rounded-full border transition-all"
              style={{
                backgroundColor: activeSection === item.id ? "#C4836A" : "transparent",
                color: activeSection === item.id ? "#F9F5F0" : "#6B4226",
                borderColor: "#C4836A",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* ===== HERO ===== */}
      {activeSection === "hero" && (
        <section
          className="relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #E8DDD0 0%, #F9F5F0 60%, #EDE0D4 100%)" }}
        >
          {/* Organic shape decorations */}
          <div
            className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-20 pointer-events-none"
            style={{ background: "radial-gradient(circle, #C4836A 0%, transparent 70%)", transform: "translate(30%, -30%)" }}
          />
          <div
            className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10 pointer-events-none"
            style={{ background: "radial-gradient(circle, #8B5E3C 0%, transparent 70%)", transform: "translate(-30%, 30%)" }}
          />

          <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-36">
            <div className="max-w-2xl">
              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-full mb-8"
                style={{ backgroundColor: "#E8DDD0", color: "#8B5E3C", border: "1px solid #C4836A" }}
              >
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: "#C4836A" }}
                />
                {isUk ? "Наступний вільний слот: Субота, 14:00" : "Next available slot: Saturday, 14:00"}
              </div>

              <h1
                className="text-4xl md:text-6xl font-bold leading-tight mb-6"
                style={{ color: "#2C1A0E" }}
              >
                {isUk ? "Кераміка, зроблена з паузою" : "Ceramics Made with Pause"}
              </h1>

              <p className="text-lg md:text-xl mb-10 leading-relaxed" style={{ color: "#6B4226" }}>
                {isUk
                  ? "Ручна кераміка. Сесії на крузі. Студія в Києві."
                  : "Handmade Pottery. Wheel Sessions. Studio in Kyiv."}
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setActiveSection("sessions")}
                  className="px-8 py-4 rounded-full font-semibold text-sm transition-all hover:opacity-90 hover:shadow-lg"
                  style={{ backgroundColor: "#C4836A", color: "#F9F5F0" }}
                >
                  {isUk ? "Забронювати сесію на крузі" : "Book a Wheel Session"}
                </button>
                <button
                  onClick={() => setActiveSection("shop")}
                  className="px-8 py-4 rounded-full font-semibold text-sm transition-all hover:opacity-90"
                  style={{ backgroundColor: "transparent", color: "#6B4226", border: "1.5px solid #C4836A" }}
                >
                  {isUk ? "Переглянути колекцію" : "View Collection"}
                </button>
              </div>
            </div>

            {/* Decorative pottery shapes */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-6 opacity-60">
              <div
                className="w-24 h-32 rounded-t-full"
                style={{ backgroundColor: "#C4836A", borderRadius: "50% 50% 30% 30% / 60% 60% 40% 40%" }}
              />
              <div
                className="w-16 h-20 rounded-full"
                style={{ backgroundColor: "#D4A88A", margin: "0 auto" }}
              />
              <div
                className="w-28 h-6"
                style={{ backgroundColor: "#B8795E", borderRadius: "50%", margin: "0 auto" }}
              />
            </div>
          </div>

          {/* Bottom wave */}
          <div className="h-16 relative overflow-hidden">
            <svg viewBox="0 0 1440 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 w-full">
              <path d="M0,32 C360,64 1080,0 1440,32 L1440,64 L0,64 Z" fill="#F9F5F0" />
            </svg>
          </div>
        </section>
      )}

      {/* ===== SHOP / COLLECTIONS ===== */}
      {activeSection === "shop" && (
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: "#2C1A0E" }}>
              {isUk ? "Наші Колекції" : "Our Collections"}
            </h2>
            <p className="text-base" style={{ color: "#6B4226" }}>
              {isUk ? "Кожен виріб — ручна робота, кожен унікальний." : "Every piece is handmade and one of a kind."}
            </p>
          </div>

          {/* Collection tabs */}
          <div className="flex gap-3 mb-10 flex-wrap justify-center">
            {collections.map((col, i) => (
              <button
                key={i}
                onClick={() => { setActiveCollection(i); setSelectedProduct(null); }}
                className="px-6 py-2.5 rounded-full text-sm font-medium transition-all"
                style={{
                  backgroundColor: activeCollection === i ? "#C4836A" : "#E8DDD0",
                  color: activeCollection === i ? "#F9F5F0" : "#6B4226",
                  border: "1.5px solid",
                  borderColor: activeCollection === i ? "#C4836A" : "#D4C4B0",
                }}
              >
                {col.name}
              </button>
            ))}
          </div>

          {/* Product grid */}
          {!selectedProduct && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {collections[activeCollection].products.map((product, i) => (
                <div
                  key={i}
                  className="rounded-2xl overflow-hidden cursor-pointer group transition-all hover:shadow-lg"
                  style={{ backgroundColor: "#F9F5F0", border: "1px solid #E8DDD0" }}
                  onClick={() => setSelectedProduct(product)}
                >
                  {/* Color placeholder */}
                  <div
                    className={`${product.color} w-full h-40 relative flex items-center justify-center transition-transform group-hover:scale-105`}
                  >
                    <div
                      className="w-16 h-20 rounded-t-full opacity-40"
                      style={{ backgroundColor: "rgba(255,255,255,0.3)", borderRadius: "50% 50% 30% 30% / 60% 60% 40% 40%" }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-sm mb-1" style={{ color: "#2C1A0E" }}>
                      {product.name}
                    </h3>
                    <p className="text-xs mb-2" style={{ color: "#8B6914" }}>
                      {product.material}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm" style={{ color: "#C4836A" }}>
                        {product.price}
                      </span>
                    </div>
                    <div
                      className="mt-2 text-xs px-2 py-0.5 rounded-full inline-block"
                      style={{ backgroundColor: "#E8DDD0", color: "#6B4226" }}
                    >
                      {product.limited}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Product detail view */}
          {selectedProduct && (
            <div
              className="rounded-2xl p-6 md:p-10 max-w-2xl mx-auto"
              style={{ backgroundColor: "#F9F5F0", border: "1px solid #E8DDD0" }}
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="mb-6 text-sm flex items-center gap-1 hover:opacity-70 transition-opacity"
                style={{ color: "#8B5E3C" }}
              >
                ← {isUk ? "Назад до колекції" : "Back to collection"}
              </button>
              <div
                className={`${selectedProduct.color} w-full h-48 rounded-xl mb-6 flex items-center justify-center`}
              >
                <div
                  className="w-20 h-28 opacity-40"
                  style={{ backgroundColor: "rgba(255,255,255,0.3)", borderRadius: "50% 50% 30% 30% / 60% 60% 40% 40%" }}
                />
              </div>
              <div
                className="inline-block text-xs px-3 py-1 rounded-full mb-3"
                style={{ backgroundColor: "#E8DDD0", color: "#6B4226" }}
              >
                {selectedProduct.limited}
              </div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: "#2C1A0E" }}>
                {selectedProduct.name}
              </h2>
              <p className="text-sm mb-1" style={{ color: "#8B6914" }}>
                {selectedProduct.material}
              </p>
              <p className="text-xl font-bold mb-4" style={{ color: "#C4836A" }}>
                {selectedProduct.price}
              </p>
              <p className="text-sm mb-4 leading-relaxed" style={{ color: "#4A2E1A" }}>
                {selectedProduct.description}
              </p>
              <div
                className="rounded-xl p-4 mb-6 text-sm"
                style={{ backgroundColor: "#E8DDD0" }}
              >
                <p className="font-semibold mb-1" style={{ color: "#6B4226" }}>
                  {isUk ? "Догляд:" : "Care:"}
                </p>
                <p style={{ color: "#4A2E1A" }}>{selectedProduct.care}</p>
              </div>
              <button
                onClick={() => handleAddToCart(selectedProduct.name)}
                className="w-full py-3 rounded-full font-semibold text-sm transition-all hover:opacity-90"
                style={{ backgroundColor: "#C4836A", color: "#F9F5F0" }}
              >
                {cartItems.includes(selectedProduct.name)
                  ? (isUk ? "Додано ✓" : "Added ✓")
                  : (isUk ? "Замовити" : "Order")}
              </button>
            </div>
          )}
        </section>
      )}

      {/* ===== WHEEL SESSIONS ===== */}
      {activeSection === "sessions" && (
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: "#2C1A0E" }}>
              {isUk ? "Сесії на гончарному крузі" : "Pottery Wheel Sessions"}
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "#6B4226" }}>
              {isUk
                ? "Ви підете з власним виробом. Ідеально для побачення, подарунка або дня народження."
                : "You'll leave with your own piece. Perfect for a date, gift, or birthday."}
            </p>
          </div>

          {/* Session info cards */}
          <div className="grid md:grid-cols-3 gap-5 mb-12">
            {[
              {
                icon: "⏱",
                title: isUk ? "2 години" : "2 hours",
                desc: isUk ? "1 сесія на крузі" : "1 session on the pottery wheel",
              },
              {
                icon: "👥",
                title: isUk ? "1–2 особи" : "1–2 people",
                desc: isUk ? "Все включено: глина, глазур, випалювання" : "Everything included: clay, glaze, firing",
              },
              {
                icon: "🎁",
                title: isUk ? "Ваш виріб" : "Your piece",
                desc: isUk ? "Ідеально для побачення / подарунка / дня народження" : "Perfect for a date / gift / birthday",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-2xl p-6 text-center"
                style={{ backgroundColor: "#E8DDD0" }}
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-base mb-1" style={{ color: "#2C1A0E" }}>
                  {item.title}
                </h3>
                <p className="text-sm" style={{ color: "#6B4226" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Schedule */}
          <div
            className="rounded-2xl p-6 md:p-8 mb-8"
            style={{ backgroundColor: "#F9F5F0", border: "1px solid #E8DDD0" }}
          >
            <h3 className="font-bold text-lg mb-6" style={{ color: "#2C1A0E" }}>
              {isUk ? "Розклад сесій" : "Session Schedule"}
            </h3>
            <div className="space-y-4">
              {schedule.map((day, di) => (
                <div key={di}>
                  <p className="text-sm font-semibold mb-2" style={{ color: "#6B4226" }}>
                    {day.fullDay}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {day.times.map((time) => {
                      const isSelected =
                        activeSlot?.day === day.fullDay && activeSlot?.time === time;
                      return (
                        <button
                          key={time}
                          onClick={() => setActiveSlot({ day: day.fullDay, time })}
                          className="px-4 py-1.5 rounded-full text-sm transition-all"
                          style={{
                            backgroundColor: isSelected ? "#C4836A" : "#E8DDD0",
                            color: isSelected ? "#F9F5F0" : "#6B4226",
                            border: "1px solid",
                            borderColor: isSelected ? "#C4836A" : "#D4C4B0",
                          }}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            {activeSlot && (
              <div
                className="mt-5 text-sm px-4 py-3 rounded-xl font-medium"
                style={{ backgroundColor: "#E8DDD0", color: "#6B4226" }}
              >
                {isUk
                  ? `Обрано: ${activeSlot.day}, ${activeSlot.time}`
                  : `Selected: ${activeSlot.day}, ${activeSlot.time}`}
                {" — "}
                <button
                  onClick={() => setActiveSection("booking")}
                  className="underline hover:opacity-70"
                  style={{ color: "#C4836A" }}
                >
                  {isUk ? "Перейти до бронювання" : "Proceed to booking"}
                </button>
              </div>
            )}
          </div>

          {/* Price */}
          <div className="text-center">
            <div
              className="inline-block text-3xl font-bold mb-2"
              style={{ color: "#C4836A" }}
            >
              ₴900
            </div>
            <p className="text-sm" style={{ color: "#6B4226" }}>
              {isUk ? "за сесію / все включено" : "per session / everything included"}
            </p>
            <button
              onClick={() => setActiveSection("booking")}
              className="mt-4 px-8 py-3 rounded-full font-semibold text-sm hover:opacity-90 transition-all"
              style={{ backgroundColor: "#C4836A", color: "#F9F5F0" }}
            >
              {isUk ? "Забронювати" : "Book Now"}
            </button>
          </div>
        </section>
      )}

      {/* ===== COURSES ===== */}
      {activeSection === "courses" && (
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: "#2C1A0E" }}>
              {isUk ? "Курси кераміки" : "Pottery Courses"}
            </h2>
            <p className="text-base" style={{ color: "#6B4226" }}>
              {isUk ? "Навчання з нуля до майстерності." : "Learning from zero to mastery."}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {courses.map((course, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden"
                style={{ border: "1px solid #E8DDD0" }}
              >
                <div
                  className={`${course.color} p-6`}
                  style={{ borderBottom: `3px solid ${course.accent}` }}
                >
                  <h3 className="font-bold text-xl mb-1" style={{ color: "#2C1A0E" }}>
                    {course.title}
                  </h3>
                  <p className="text-xs font-medium mb-3" style={{ color: course.accent }}>
                    {course.sessions}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "#4A2E1A" }}>
                    {course.desc}
                  </p>
                </div>
                <div className="bg-white p-6">
                  <ul className="space-y-2 mb-4">
                    {course.includes.map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm" style={{ color: "#4A2E1A" }}>
                        <span style={{ color: course.accent }}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg" style={{ color: "#C4836A" }}>
                      {course.price}
                    </span>
                    <button
                      onClick={() => { setEnrollCourse(i); setEnrollSubmitted(false); setEnrollData({ name: "", phone: "" }); }}
                      className="px-4 py-2 rounded-full text-xs font-semibold hover:opacity-90 transition-all"
                      style={{ backgroundColor: course.accent, color: "#F9F5F0" }}
                    >
                      {isUk ? "Записатись" : "Enroll"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Enrollment form */}
          {enrollCourse !== null && (
            <div
              className="max-w-md mx-auto rounded-2xl p-6"
              style={{ backgroundColor: "#F9F5F0", border: "1px solid #E8DDD0" }}
            >
              <h3 className="font-bold text-base mb-4" style={{ color: "#2C1A0E" }}>
                {isUk
                  ? `Запис на курс: ${courses[enrollCourse].title}`
                  : `Enroll: ${courses[enrollCourse].title}`}
              </h3>
              {enrollSubmitted ? (
                <div className="text-center py-6">
                  <div className="text-3xl mb-3">🌿</div>
                  <p className="font-semibold mb-1" style={{ color: "#2C1A0E" }}>
                    {isUk ? "Дякуємо! Ми зв\'яжемось із вами." : "Thank you! We'll be in touch."}
                  </p>
                  <button
                    onClick={() => { setEnrollCourse(null); setEnrollSubmitted(false); }}
                    className="mt-3 text-sm underline"
                    style={{ color: "#C4836A" }}
                  >
                    {isUk ? "Закрити" : "Close"}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleEnrollSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium mb-1" style={{ color: "#6B4226" }}>
                      {isUk ? "Ім\'я" : "Name"}
                    </label>
                    <input
                      type="text"
                      required
                      value={enrollData.name}
                      onChange={(e) => setEnrollData((d) => ({ ...d, name: e.target.value }))}
                      className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
                      style={{ backgroundColor: "#E8DDD0", border: "1px solid #D4C4B0", color: "#2C1A0E" }}
                      placeholder={isUk ? "Ваше ім\'я" : "Your name"}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1" style={{ color: "#6B4226" }}>
                      {isUk ? "Телефон" : "Phone"}
                    </label>
                    <input
                      type="tel"
                      required
                      value={enrollData.phone}
                      onChange={(e) => setEnrollData((d) => ({ ...d, phone: e.target.value }))}
                      className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
                      style={{ backgroundColor: "#E8DDD0", border: "1px solid #D4C4B0", color: "#2C1A0E" }}
                      placeholder="+380"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-full font-semibold text-sm hover:opacity-90 transition-all"
                    style={{ backgroundColor: "#C4836A", color: "#F9F5F0" }}
                  >
                    {isUk ? "Записатись" : "Enroll Now"}
                  </button>
                </form>
              )}
            </div>
          )}
        </section>
      )}

      {/* ===== KINTSUGI ===== */}
      {activeSection === "kintsugi" && (
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              {/* Decorative broken/restored pot */}
              <div
                className="rounded-3xl p-10 flex items-center justify-center"
                style={{ backgroundColor: "#E8DDD0", minHeight: 280 }}
              >
                <div className="relative">
                  <div
                    className="w-32 h-40 mx-auto"
                    style={{
                      background: "radial-gradient(ellipse at 50% 80%, #C4836A 0%, #8B5E3C 100%)",
                      borderRadius: "50% 50% 40% 40% / 60% 60% 40% 40%",
                    }}
                  />
                  {/* Gold crack lines */}
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 128 160"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M64,20 L55,60 L70,100 L60,145" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M55,60 L35,75" stroke="#D4AF37" strokeWidth="1" strokeLinecap="round" />
                    <path d="M70,100 L90,115" stroke="#D4AF37" strokeWidth="1" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <div
                className="text-xs font-semibold tracking-widest uppercase mb-4"
                style={{ color: "#C4836A" }}
              >
                {isUk ? "Відновлення золотом" : "Repair with Gold"}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#2C1A0E" }}>
                {isUk ? "Кінцуґі — мистецтво відновлення" : "Kintsugi — The Art of Repair"}
              </h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "#4A2E1A" }}>
                {isUk
                  ? "Wabi-sabi — японська філософія краси у недосконалості. Тріщина — не кінець, а нова частина історії предмета. Золото не ховає пошкодження — воно підкреслює його."
                  : "Wabi-sabi — the Japanese philosophy of beauty in imperfection. A crack is not an end, but a new part of the object's story. Gold doesn't hide the damage — it highlights it."}
              </p>
              <p className="text-sm leading-relaxed mb-6 font-medium" style={{ color: "#C4836A" }}>
                {isUk
                  ? "Принесіть свою улюблену розбиту річ — ми відновимо її золотом."
                  : "Bring your favorite broken piece — we'll restore it with gold."}
              </p>

              <div
                className="rounded-2xl p-5 mb-6"
                style={{ backgroundColor: "#E8DDD0" }}
              >
                <h3 className="font-semibold text-sm mb-3" style={{ color: "#2C1A0E" }}>
                  {isUk ? "Формат майстер-класу" : "Workshop Format"}
                </h3>
                <ul className="space-y-2">
                  {[
                    isUk ? "Одна сесія, 3 години" : "Single session, 3 hours",
                    isUk ? "Ваш предмет + матеріали (лак уруші + золото)" : "Your item + materials (urushi lacquer + gold)",
                    isUk ? "Пояснення філософії та техніки" : "Philosophy and technique explained",
                    isUk ? "Групи до 6 осіб" : "Groups up to 6 people",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm" style={{ color: "#4A2E1A" }}>
                      <span style={{ color: "#D4AF37" }}>◆</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <blockquote
                className="border-l-4 pl-4 italic text-sm mb-6"
                style={{ borderColor: "#D4AF37", color: "#6B4226" }}
              >
                {isUk ? "«Тріснуте — не зіпсоване.»" : '"Cracked doesn\'t mean ruined."'}
              </blockquote>

              <div className="flex items-center gap-4">
                <div>
                  <div className="font-bold text-xl" style={{ color: "#C4836A" }}>
                    ₴1 200
                  </div>
                  <div className="text-xs" style={{ color: "#6B4226" }}>
                    {isUk ? "за сесію" : "per session"}
                  </div>
                </div>
                <button
                  onClick={() => setActiveSection("booking")}
                  className="px-6 py-3 rounded-full font-semibold text-sm hover:opacity-90 transition-all"
                  style={{ backgroundColor: "#C4836A", color: "#F9F5F0" }}
                >
                  {isUk ? "Записатись" : "Book Workshop"}
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== GIFT CERTIFICATES ===== */}
      {activeSection === "gifts" && (
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: "#2C1A0E" }}>
              {isUk ? "Подарункові сертифікати" : "Gift Certificates"}
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "#6B4226" }}>
              {isUk
                ? "Ідеальний подарунок для того, у кого є все."
                : "The perfect gift for someone who has everything."}
            </p>
          </div>

          {giftSubmitted ? (
            <div
              className="max-w-md mx-auto rounded-2xl p-10 text-center"
              style={{ backgroundColor: "#E8DDD0" }}
            >
              <div className="text-4xl mb-4">🎁</div>
              <h3 className="font-bold text-lg mb-2" style={{ color: "#2C1A0E" }}>
                {isUk ? "Сертифікат замовлено!" : "Certificate ordered!"}
              </h3>
              <p className="text-sm" style={{ color: "#6B4226" }}>
                {isUk
                  ? "Ми зв\'яжемось із вами для підтвердження."
                  : "We'll contact you to confirm."}
              </p>
              <button
                onClick={() => setGiftSubmitted(false)}
                className="mt-4 text-sm underline"
                style={{ color: "#C4836A" }}
              >
                {isUk ? "Замовити ще" : "Order another"}
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-10 max-w-3xl mx-auto">
              {/* Amount selection */}
              <div
                className="rounded-2xl p-6"
                style={{ backgroundColor: "#F9F5F0", border: "1px solid #E8DDD0" }}
              >
                <h3 className="font-semibold text-base mb-4" style={{ color: "#2C1A0E" }}>
                  {isUk ? "Обрати суму" : "Choose amount"}
                </h3>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {giftAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setGiftAmount(amount)}
                      className="py-3 rounded-xl text-sm font-semibold transition-all"
                      style={{
                        backgroundColor: giftAmount === amount ? "#C4836A" : "#E8DDD0",
                        color: giftAmount === amount ? "#F9F5F0" : "#6B4226",
                      }}
                    >
                      ₴{amount}
                    </button>
                  ))}
                </div>
                <div
                  className="rounded-xl p-4 text-sm"
                  style={{ backgroundColor: "#E8DDD0" }}
                >
                  <p style={{ color: "#6B4226" }}>
                    {isUk
                      ? "Або вкажіть конкретну послугу: сесія, курс, кінцуґі."
                      : "Or specify a service: session, course, kintsugi."}
                  </p>
                </div>
              </div>

              {/* Gift form */}
              <form
                onSubmit={handleGiftSubmit}
                className="rounded-2xl p-6 space-y-4"
                style={{ backgroundColor: "#F9F5F0", border: "1px solid #E8DDD0" }}
              >
                <h3 className="font-semibold text-base" style={{ color: "#2C1A0E" }}>
                  {isUk ? "Ваші дані" : "Your details"}
                </h3>
                {[
                  { label: isUk ? "Ім\'я" : "Name", type: "text", placeholder: isUk ? "Ваше ім\'я" : "Your name" },
                  { label: isUk ? "Телефон" : "Phone", type: "tel", placeholder: "+380" },
                  { label: isUk ? "Email" : "Email", type: "email", placeholder: "email@example.com" },
                ].map((field, i) => (
                  <div key={i}>
                    <label className="block text-xs font-medium mb-1" style={{ color: "#6B4226" }}>
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      required
                      className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
                      style={{ backgroundColor: "#E8DDD0", border: "1px solid #D4C4B0", color: "#2C1A0E" }}
                      placeholder={field.placeholder}
                    />
                  </div>
                ))}
                <div
                  className="text-center pt-1 font-bold text-lg"
                  style={{ color: "#C4836A" }}
                >
                  {isUk ? `Сума: ₴${giftAmount}` : `Amount: ₴${giftAmount}`}
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-full font-semibold text-sm hover:opacity-90 transition-all"
                  style={{ backgroundColor: "#C4836A", color: "#F9F5F0" }}
                >
                  {isUk ? "Замовити сертифікат" : "Order Certificate"}
                </button>
              </form>
            </div>
          )}
        </section>
      )}

      {/* ===== COMBINED BOOKING FORM ===== */}
      {activeSection === "booking" && (
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: "#2C1A0E" }}>
              {isUk ? "Бронювання" : "Book a Session"}
            </h2>
            <p className="text-base" style={{ color: "#6B4226" }}>
              {isUk ? "Оберіть послугу та зручний час." : "Choose a service and a convenient time."}
            </p>
          </div>

          {bookingSubmitted ? (
            <div
              className="max-w-md mx-auto rounded-2xl p-10 text-center"
              style={{ backgroundColor: "#E8DDD0" }}
            >
              <div className="text-4xl mb-4">🌿</div>
              <h3 className="font-bold text-xl mb-2" style={{ color: "#2C1A0E" }}>
                {isUk ? "Дякуємо за бронювання!" : "Booking received!"}
              </h3>
              <p className="text-sm mb-1" style={{ color: "#6B4226" }}>
                {isUk ? `Послуга: ${bookingType === "wheel" ? "Сесія на крузі" : bookingType === "kintsugi" ? "Кінцуґі" : "Курс"}` : `Service: ${bookingType === "wheel" ? "Wheel Session" : bookingType === "kintsugi" ? "Kintsugi" : "Course"}`}
              </p>
              {bookingData.date && (
                <p className="text-sm mb-1" style={{ color: "#6B4226" }}>
                  {isUk ? `Дата: ${bookingData.date}` : `Date: ${bookingData.date}`}
                </p>
              )}
              <p className="text-sm" style={{ color: "#6B4226" }}>
                {isUk ? "Ми зв\'яжемось із вами найближчим часом." : "We'll contact you shortly."}
              </p>
              <button
                onClick={() => { setBookingSubmitted(false); setBookingData({ date: "", guests: "1", name: "", phone: "", wishes: "" }); }}
                className="mt-5 text-sm underline"
                style={{ color: "#C4836A" }}
              >
                {isUk ? "Нове бронювання" : "New booking"}
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleBookingSubmit}
              className="max-w-lg mx-auto rounded-2xl p-6 md:p-8 space-y-5"
              style={{ backgroundColor: "#F9F5F0", border: "1px solid #E8DDD0" }}
            >
              {/* Service type */}
              <div>
                <label className="block text-xs font-semibold mb-2" style={{ color: "#6B4226" }}>
                  {isUk ? "Тип послуги" : "Service type"}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "wheel", label: isUk ? "Сесія" : "Session" },
                    { id: "kintsugi", label: "Kintsugi" },
                    { id: "course", label: isUk ? "Курс" : "Course" },
                  ].map((type) => (
                    <button
                      type="button"
                      key={type.id}
                      onClick={() => setBookingType(type.id)}
                      className="py-2.5 rounded-xl text-sm font-medium transition-all"
                      style={{
                        backgroundColor: bookingType === type.id ? "#C4836A" : "#E8DDD0",
                        color: bookingType === type.id ? "#F9F5F0" : "#6B4226",
                      }}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: "#6B4226" }}>
                  {isUk ? "Бажана дата" : "Preferred date"}
                </label>
                <input
                  type="date"
                  required
                  value={bookingData.date}
                  onChange={(e) => setBookingData((d) => ({ ...d, date: e.target.value }))}
                  className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
                  style={{ backgroundColor: "#E8DDD0", border: "1px solid #D4C4B0", color: "#2C1A0E" }}
                />
              </div>

              {/* Guests */}
              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: "#6B4226" }}>
                  {isUk ? "Кількість гостей" : "Number of guests"}
                </label>
                <select
                  value={bookingData.guests}
                  onChange={(e) => setBookingData((d) => ({ ...d, guests: e.target.value }))}
                  className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
                  style={{ backgroundColor: "#E8DDD0", border: "1px solid #D4C4B0", color: "#2C1A0E" }}
                >
                  {["1", "2", "3", "4", "5", "6"].map((n) => (
                    <option key={n} value={n}>
                      {n} {isUk ? (n === "1" ? "особа" : "особи") : (n === "1" ? "person" : "people")}
                    </option>
                  ))}
                </select>
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: "#6B4226" }}>
                  {isUk ? "Ваше ім\'я" : "Your name"}
                </label>
                <input
                  type="text"
                  required
                  value={bookingData.name}
                  onChange={(e) => setBookingData((d) => ({ ...d, name: e.target.value }))}
                  className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
                  style={{ backgroundColor: "#E8DDD0", border: "1px solid #D4C4B0", color: "#2C1A0E" }}
                  placeholder={isUk ? "Ім\'я та прізвище" : "Full name"}
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: "#6B4226" }}>
                  {isUk ? "Телефон" : "Phone"}
                </label>
                <input
                  type="tel"
                  required
                  value={bookingData.phone}
                  onChange={(e) => setBookingData((d) => ({ ...d, phone: e.target.value }))}
                  className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
                  style={{ backgroundColor: "#E8DDD0", border: "1px solid #D4C4B0", color: "#2C1A0E" }}
                  placeholder="+380"
                />
              </div>

              {/* Special wishes */}
              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: "#6B4226" }}>
                  {isUk ? "Побажання" : "Special wishes"}
                </label>
                <textarea
                  value={bookingData.wishes}
                  onChange={(e) => setBookingData((d) => ({ ...d, wishes: e.target.value }))}
                  rows={3}
                  className="w-full rounded-xl px-4 py-2.5 text-sm outline-none resize-none"
                  style={{ backgroundColor: "#E8DDD0", border: "1px solid #D4C4B0", color: "#2C1A0E" }}
                  placeholder={isUk ? "Особливі побажання або питання..." : "Any special wishes or questions..."}
                />
              </div>

              {activeSlot && (
                <div
                  className="text-xs px-3 py-2 rounded-lg"
                  style={{ backgroundColor: "#E8DDD0", color: "#6B4226" }}
                >
                  {isUk
                    ? `Обраний слот: ${activeSlot.day}, ${activeSlot.time}`
                    : `Selected slot: ${activeSlot.day}, ${activeSlot.time}`}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-full font-bold text-sm hover:opacity-90 transition-all"
                style={{ backgroundColor: "#C4836A", color: "#F9F5F0" }}
              >
                {isUk ? "Підтвердити бронювання" : "Confirm Booking"}
              </button>
            </form>
          )}
        </section>
      )}

      {/* ===== FOOTER ===== */}
      <footer
        className="mt-auto"
        style={{ backgroundColor: "#2C1A0E", color: "#E8DDD0" }}
      >
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="font-bold text-xl mb-3" style={{ color: "#C4836A" }}>
                Ceramica Studio
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "#B8A898" }}>
                {isUk
                  ? "Гончарна студія в Києві. Ручна кераміка, навчання та відновлення."
                  : "Pottery studio in Kyiv. Handmade ceramics, workshops, and restoration."}
              </p>
            </div>

            {/* Links */}
            <div>
              <h3 className="font-semibold text-sm mb-3" style={{ color: "#D4C4B0" }}>
                {isUk ? "Послуги" : "Services"}
              </h3>
              <ul className="space-y-2">
                {[
                  { id: "sessions", label: isUk ? "Сесії на крузі" : "Wheel Sessions" },
                  { id: "courses", label: isUk ? "Курси" : "Courses" },
                  { id: "kintsugi", label: isUk ? "Кінцуґі" : "Kintsugi" },
                  { id: "gifts", label: isUk ? "Сертифікати" : "Gift Cards" },
                ].map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveSection(item.id)}
                      className="text-sm hover:opacity-80 transition-opacity"
                      style={{ color: "#B8A898" }}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold text-sm mb-3" style={{ color: "#D4C4B0" }}>
                {isUk ? "Контакти" : "Contact"}
              </h3>
              <ul className="space-y-2 text-sm" style={{ color: "#B8A898" }}>
                <li>📍 {isUk ? "Київ, вул. Гончарна, 12" : "Kyiv, Honcharna St, 12"}</li>
                <li>📞 +380 44 123 4567</li>
                <li>✉️ hello@ceramica.studio</li>
                <li>
                  {isUk
                    ? "Вт–Нд: 10:00–20:00"
                    : "Tue–Sun: 10:00–20:00"}
                </li>
              </ul>
            </div>
          </div>

          <div
            className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs"
            style={{ borderTop: "1px solid #3D2A1A", color: "#8B7060" }}
          >
            <span>© 2026 Ceramica Studio. {isUk ? "Всі права захищено." : "All rights reserved."}</span>
            <span>
              {isUk
                ? "Зроблено з паузою і глиною."
                : "Made with pause and clay."}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
