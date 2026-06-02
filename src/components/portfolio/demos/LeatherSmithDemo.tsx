"use client";

import { useState } from "react";

export function LeatherSmithDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  // --- State ---
  const [activeCategory, setActiveCategory] = useState("wallets");
  const [selectedProduct, setSelectedProduct] = useState<null | {
    id: string;
    name: string;
    nameUk: string;
    leather: string;
    leatherUk: string;
    price: number;
    fullGrain: boolean;
    category: string;
    colorBg: string;
  }>(null);
  const [monogramText, setMonogramText] = useState("");
  const [monogramFont, setMonogramFont] = useState<"serif" | "sans" | "script">("serif");
  const [monogramPosition, setMonogramPosition] = useState<"corner" | "center" | "strap">("corner");
  const [customForm, setCustomForm] = useState({
    itemType: "wallet",
    color: "#8B4513",
    size: "",
    details: "",
    monogram: "",
    deadline: "",
    budget: "",
  });
  const [repairForm, setRepairForm] = useState({
    problem: "",
    contact: "",
  });
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [activeNav, setActiveNav] = useState("hero");
  const [customOrderSent, setCustomOrderSent] = useState(false);
  const [repairSent, setRepairSent] = useState(false);

  // --- Products ---
  type Product = {
    id: string;
    name: string;
    nameUk: string;
    leather: string;
    leatherUk: string;
    price: number;
    fullGrain: boolean;
    category: string;
    colorBg: string;
  };

  const products: Product[] = [
    // Wallets
    { id: "w1", name: "Full-Grain Bifold", nameUk: "Біфолд Full-Grain", leather: "Full-grain cognac", leatherUk: "Повнозерниста когнак", price: 1850, fullGrain: true, category: "wallets", colorBg: "#6B3410" },
    { id: "w2", name: "Cardholder Slim", nameUk: "Тонкий картхолдер", leather: "Nappa black", leatherUk: "Наппа чорна", price: 980, fullGrain: false, category: "wallets", colorBg: "#1A1A18" },
    { id: "w3", name: "Trifold Cognac", nameUk: "Трифолд Когнак", leather: "Full-grain cognac", leatherUk: "Повнозерниста когнак", price: 2100, fullGrain: true, category: "wallets", colorBg: "#8B4513" },
    { id: "w4", name: "Zip Wallet", nameUk: "Гаманець на блискавці", leather: "Vegetable-tanned", leatherUk: "Рослинне дублення", price: 2400, fullGrain: true, category: "wallets", colorBg: "#7A3B10" },
    // Belts
    { id: "b1", name: "Classic 35mm", nameUk: "Класичний 35мм", leather: "Full-grain black", leatherUk: "Повнозерниста чорна", price: 1200, fullGrain: true, category: "belts", colorBg: "#1A1A18" },
    { id: "b2", name: "Braided Belt", nameUk: "Плетений ремінь", leather: "Vegetable-tanned", leatherUk: "Рослинне дублення", price: 1450, fullGrain: false, category: "belts", colorBg: "#9B5523" },
    { id: "b3", name: "Double-Buckle", nameUk: "Подвійна пряжка", leather: "Full-grain cognac", leatherUk: "Повнозерниста когнак", price: 1680, fullGrain: true, category: "belts", colorBg: "#8B4513" },
    { id: "b4", name: "Skinny 20mm", nameUk: "Вузький 20мм", leather: "Nappa tan", leatherUk: "Наппа тан", price: 980, fullGrain: false, category: "belts", colorBg: "#A0622A" },
    // Bags
    { id: "bag1", name: "Messenger Cognac", nameUk: "Месенджер Когнак", leather: "Full-grain cognac", leatherUk: "Повнозерниста когнак", price: 4800, fullGrain: true, category: "bags", colorBg: "#8B4513" },
    { id: "bag2", name: "Laptop Sleeve", nameUk: "Чохол для ноутбука", leather: "Full-grain black", leatherUk: "Повнозерниста чорна", price: 2200, fullGrain: true, category: "bags", colorBg: "#1A1A18" },
    { id: "bag3", name: "Tote Minimal", nameUk: "Мінімал Тоут", leather: "Vegetable-tanned", leatherUk: "Рослинне дублення", price: 3600, fullGrain: false, category: "bags", colorBg: "#9B5523" },
    { id: "bag4", name: "Crossbody Dark", nameUk: "Кросбоді Темний", leather: "Full-grain black", leatherUk: "Повнозерниста чорна", price: 3200, fullGrain: true, category: "bags", colorBg: "#252520" },
    // Key Holders
    { id: "k1", name: "Key Fold 4-ring", nameUk: "Ключниця 4-кільця", leather: "Full-grain cognac", leatherUk: "Повнозерниста когнак", price: 680, fullGrain: true, category: "keyholders", colorBg: "#8B4513" },
    { id: "k2", name: "Key Pouch", nameUk: "Ключний пауч", leather: "Nappa black", leatherUk: "Наппа чорна", price: 550, fullGrain: false, category: "keyholders", colorBg: "#1A1A18" },
    { id: "k3", name: "Smart Key Holder", nameUk: "Смарт ключниця", leather: "Vegetable-tanned", leatherUk: "Рослинне дублення", price: 720, fullGrain: false, category: "keyholders", colorBg: "#9B5523" },
    { id: "k4", name: "Carabiner Key", nameUk: "Карабін ключниця", leather: "Full-grain black", leatherUk: "Повнозерниста чорна", price: 890, fullGrain: true, category: "keyholders", colorBg: "#252520" },
    // Card Holders
    { id: "c1", name: "Business Slim", nameUk: "Бізнес Слім", leather: "Full-grain black", leatherUk: "Повнозерниста чорна", price: 750, fullGrain: true, category: "cardholders", colorBg: "#1A1A18" },
    { id: "c2", name: "Cognac 6-card", nameUk: "Когнак 6-карт", leather: "Full-grain cognac", leatherUk: "Повнозерниста когнак", price: 820, fullGrain: true, category: "cardholders", colorBg: "#8B4513" },
    { id: "c3", name: "Magnetic Close", nameUk: "На магніті", leather: "Nappa brown", leatherUk: "Наппа коричнева", price: 690, fullGrain: false, category: "cardholders", colorBg: "#6B3410" },
    { id: "c4", name: "RFID Shield", nameUk: "RFID захист", leather: "Full-grain black", leatherUk: "Повнозерниста чорна", price: 950, fullGrain: true, category: "cardholders", colorBg: "#252520" },
    // Laptop Accessories
    { id: "l1", name: "MacBook Sleeve 14\"", nameUk: "Чохол MacBook 14\"", leather: "Full-grain cognac", leatherUk: "Повнозерниста когнак", price: 2400, fullGrain: true, category: "laptop", colorBg: "#8B4513" },
    { id: "l2", name: "Desk Mat Large", nameUk: "Настільний мат великий", leather: "Vegetable-tanned", leatherUk: "Рослинне дублення", price: 1800, fullGrain: false, category: "laptop", colorBg: "#9B5523" },
    { id: "l3", name: "Cable Organizer", nameUk: "Органайзер кабелів", leather: "Nappa black", leatherUk: "Наппа чорна", price: 480, fullGrain: false, category: "laptop", colorBg: "#1A1A18" },
    { id: "l4", name: "Laptop Stand Pad", nameUk: "Підставка-накладка", leather: "Full-grain black", leatherUk: "Повнозерниста чорна", price: 1650, fullGrain: true, category: "laptop", colorBg: "#252520" },
  ];

  const categories = [
    { id: "wallets", label: isUk ? "Гаманці" : "Wallets" },
    { id: "belts", label: isUk ? "Ремені" : "Belts" },
    { id: "bags", label: isUk ? "Сумки" : "Bags" },
    { id: "keyholders", label: isUk ? "Ключниці" : "Key Holders" },
    { id: "cardholders", label: isUk ? "Картхолдери" : "Card Holders" },
    { id: "laptop", label: isUk ? "Аксесуари для ноутбука" : "Laptop Accessories" },
  ];

  const filteredProducts = products.filter((p) => p.category === activeCategory);

  const leatherColors = [
    { hex: "#1A1A18", label: isUk ? "Чорний" : "Black" },
    { hex: "#8B4513", label: isUk ? "Когнак" : "Cognac" },
    { hex: "#6B3410", label: isUk ? "Темно-коричневий" : "Dark Brown" },
    { hex: "#C9A84C", label: isUk ? "Пісочний" : "Sand" },
    { hex: "#9B5523", label: isUk ? "Тан" : "Tan" },
    { hex: "#5C3317", label: isUk ? "Шоколадний" : "Chocolate" },
    { hex: "#3B1F0D", label: isUk ? "Еспресо" : "Espresso" },
    { hex: "#D2B48C", label: isUk ? "Натуральний" : "Natural" },
  ];

  const navItems = [
    { id: "hero", label: isUk ? "Головна" : "Home" },
    { id: "shop", label: isUk ? "Магазин" : "Shop" },
    { id: "monogram", label: isUk ? "Монограми" : "Monograms" },
    { id: "custom", label: isUk ? "Замовлення" : "Custom Orders" },
    { id: "repair", label: isUk ? "Ремонт" : "Repair" },
    { id: "about", label: isUk ? "Про нас" : "About" },
  ];

  const fontStyles: Record<"serif" | "sans" | "script", string> = {
    serif: "font-serif tracking-widest",
    sans: "font-sans tracking-[0.3em] font-light",
    script: "font-serif italic tracking-wide",
  };

  const fontLabels: Record<"serif" | "sans" | "script", string> = {
    serif: isUk ? "Класична засічка" : "Classic Serif",
    sans: isUk ? "Модерн без засічок" : "Modern Sans",
    script: isUk ? "Скрипт" : "Script",
  };

  const customOrderExamples = [
    {
      title: isUk ? "Портфель для архітектора" : "Architect's Portfolio Bag",
      desc: isUk
        ? "Full-grain чорна шкіра, 3 відділення A3, латунні замки, монограма «АМ»"
        : "Full-grain black leather, 3 A3 compartments, brass locks, monogram 'AM'",
      time: isUk ? "3 тижні" : "3 weeks",
    },
    {
      title: isUk ? "Весільний комплект" : "Wedding Set",
      desc: isUk
        ? "Ремінь + картхолдер + ключниця когнак. Однакова монограма на кожному предметі"
        : "Belt + cardholder + key holder in cognac. Matching monogram on each item",
      time: isUk ? "2 тижні" : "2 weeks",
    },
    {
      title: isUk ? "Сумка для художника" : "Artist's Carry-All",
      desc: isUk
        ? "Натуральна шкіра рослинного дублення, широкий ремінь, кишені для пензлів"
        : "Natural vegetable-tanned leather, wide strap, brush pockets",
      time: isUk ? "5 тижнів" : "5 weeks",
    },
  ];

  const repairServices = [
    { icon: "🧵", label: isUk ? "Прошивка та стібки" : "Stitching & Thread" },
    { icon: "🔩", label: isUk ? "Замки та фурнітура" : "Clasps & Hardware" },
    { icon: "🪡", label: isUk ? "Підкладка та оздоблення" : "Lining & Finishing" },
    { icon: "🧴", label: isUk ? "Чищення та догляд" : "Cleaning & Care" },
    { icon: "🎨", label: isUk ? "Фарбування та реставрація" : "Dyeing & Restoration" },
    { icon: "📐", label: isUk ? "Зміна розміру та підгонка" : "Resizing & Adjustments" },
  ];

  const scrollToSection = (id: string) => {
    setActiveNav(id);
    const el = document.getElementById(`ls-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // --- Render ---
  return (
    <div className="w-full font-serif" style={{ background: "#111110", color: "#E8E0D5" }}>
      {/* NAV */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b"
        style={{ background: "#1A1A18", borderColor: "#2A2A25" }}
      >
        <div className="flex items-center gap-3">
          <span
            className="text-2xl font-bold tracking-[0.15em] uppercase"
            style={{ color: "#C9A84C" }}
          >
            LeatherSmith
          </span>
          <span className="hidden sm:block text-xs tracking-widest uppercase" style={{ color: "#7A6A55" }}>
            {isUk ? "Майстерня" : "Workshop"}
          </span>
        </div>
        <div className="flex items-center gap-1 sm:gap-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="hidden sm:block text-xs uppercase tracking-widest px-2 py-1 transition-colors"
              style={{
                color: activeNav === item.id ? "#C9A84C" : "#9A8A75",
              }}
            >
              {item.label}
            </button>
          ))}
          <button
            className="relative flex items-center gap-1.5 text-xs px-3 py-1.5 rounded"
            style={{ background: "#2A2A25", color: "#C9A84C" }}
          >
            <span>🛒</span>
            {cartItems.length > 0 && (
              <span
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold"
                style={{ background: "#C9A84C", color: "#1A1A18" }}
              >
                {cartItems.length}
              </span>
            )}
            <span className="hidden sm:inline">{isUk ? "Кошик" : "Cart"}</span>
          </button>
        </div>
      </nav>

      {/* ── 1. HERO ── */}
      <section
        id="ls-hero"
        className="relative flex flex-col items-center justify-center text-center px-6 py-24 overflow-hidden"
        style={{ background: "#111110", minHeight: "85vh" }}
      >
        {/* Background texture strip */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background:
              "repeating-linear-gradient(135deg, #8B4513 0px, #8B4513 1px, transparent 1px, transparent 40px)",
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <p
            className="text-xs uppercase tracking-[0.4em] mb-6"
            style={{ color: "#C9A84C" }}
          >
            {isUk ? "Ручна робота · Натуральна шкіра" : "Handcrafted · Full-Grain Leather"}
          </p>
          <h1
            className="text-5xl sm:text-7xl font-bold leading-[1.05] tracking-tight mb-6"
            style={{ color: "#E8E0D5" }}
          >
            {isUk ? (
              <>
                Шкіра, що{" "}
                <span style={{ color: "#C9A84C" }}>старіє красиво</span>
              </>
            ) : (
              <>
                Leather That{" "}
                <span style={{ color: "#C9A84C" }}>Ages Beautifully</span>
              </>
            )}
          </h1>
          <p className="text-lg sm:text-xl mb-10" style={{ color: "#9A8A75" }}>
            {isUk
              ? "Шкіряні вироби ручної роботи. Персоналізація. Ремонт."
              : "Artisan Leather Goods. Personalization. Repair."}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <button
              onClick={() => scrollToSection("shop")}
              className="px-8 py-4 text-sm uppercase tracking-widest font-bold transition-all"
              style={{ background: "#C9A84C", color: "#1A1A18" }}
            >
              {isUk ? "Переглянути колекцію" : "View Collection"}
            </button>
            <button
              onClick={() => scrollToSection("custom")}
              className="px-8 py-4 text-sm uppercase tracking-widest border transition-all"
              style={{ borderColor: "#C9A84C", color: "#C9A84C" }}
            >
              {isUk ? "Замовити індивідуальне" : "Order Custom"}
            </button>
          </div>
          <div
            className="inline-flex flex-col sm:flex-row items-center gap-3 px-6 py-3 text-xs tracking-wide"
            style={{ background: "#1A1A18", color: "#9A8A75", border: "1px solid #2A2A25" }}
          >
            <span>✓ {isUk ? "Тільки full-grain шкіра" : "Full-grain leather only"}</span>
            <span className="hidden sm:block" style={{ color: "#3A3A35" }}>·</span>
            <span>✓ {isUk ? "Кожен стібок — вручну" : "Every stitch by hand"}</span>
          </div>
        </div>
        {/* Decorative bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #111110)" }}
        />
      </section>

      {/* ── 2. SHOP ── */}
      <section id="ls-shop" className="px-4 sm:px-8 py-20" style={{ background: "#111110" }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-[0.4em] mb-3" style={{ color: "#C9A84C" }}>
            {isUk ? "Колекція" : "Collection"}
          </p>
          <h2 className="text-4xl font-bold mb-10" style={{ color: "#E8E0D5" }}>
            {isUk ? "Магазин" : "Shop"}
          </h2>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setSelectedProduct(null);
                }}
                className="px-4 py-2 text-xs uppercase tracking-widest transition-all"
                style={
                  activeCategory === cat.id
                    ? { background: "#C9A84C", color: "#1A1A18", fontWeight: 700 }
                    : { background: "#1A1A18", color: "#9A8A75", border: "1px solid #2A2A25" }
                }
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Product Detail View */}
          {selectedProduct ? (
            <div
              className="rounded-sm p-6 sm:p-8"
              style={{ background: "#1A1A18", border: "1px solid #2A2A25" }}
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-xs uppercase tracking-widest mb-6 flex items-center gap-2"
                style={{ color: "#C9A84C" }}
              >
                ← {isUk ? "Назад до колекції" : "Back to collection"}
              </button>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Photos */}
                <div className="flex flex-col gap-3">
                  <div
                    className="w-full rounded-sm"
                    style={{ background: selectedProduct.colorBg, height: "280px" }}
                  />
                  <div className="grid grid-cols-3 gap-2">
                    {["Side", "Detail", "Open"].map((angle) => (
                      <div
                        key={angle}
                        className="rounded-sm flex items-end justify-start p-2"
                        style={{ background: selectedProduct.colorBg, height: "80px", opacity: 0.8 }}
                      >
                        <span className="text-[9px] uppercase tracking-wider" style={{ color: "#C9A84C" }}>
                          {isUk
                            ? angle === "Side"
                              ? "Збоку"
                              : angle === "Detail"
                              ? "Деталь"
                              : "Відкритий"
                            : angle}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Info */}
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "#C9A84C" }}>
                      {isUk ? selectedProduct.leatherUk : selectedProduct.leather}
                    </p>
                    <h3 className="text-3xl font-bold mb-2" style={{ color: "#E8E0D5" }}>
                      {isUk ? selectedProduct.nameUk : selectedProduct.name}
                    </h3>
                    <p className="text-2xl font-bold" style={{ color: "#C9A84C" }}>
                      ₴{selectedProduct.price.toLocaleString()}
                    </p>
                  </div>

                  {selectedProduct.fullGrain && (
                    <div
                      className="inline-flex items-center gap-2 px-3 py-1.5 text-xs"
                      style={{ background: "#2A1A0A", color: "#C9A84C", border: "1px solid #4A2A10" }}
                    >
                      ✦ {isUk ? "Стає кращим з часом" : "Gets better with age"}
                    </div>
                  )}

                  {/* Leather story */}
                  <div
                    className="p-4 rounded-sm"
                    style={{ background: "#111110", border: "1px solid #2A2A25" }}
                  >
                    <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#7A6A55" }}>
                      {isUk ? "Ця річ:" : "This item:"}
                    </p>
                    <div className="flex flex-col gap-1.5">
                      {[
                        { icon: "⏱", text: isUk ? "4 години роботи" : "4 hours of work" },
                        { icon: "✦", text: isUk ? "3 кроки патинування" : "3 patina steps" },
                        { icon: "🧵", text: isUk ? "120 стібків" : "120 stitches" },
                      ].map((item) => (
                        <p key={item.text} className="text-sm flex items-center gap-2" style={{ color: "#9A8A75" }}>
                          <span>{item.icon}</span> {item.text}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Add Monogram */}
                  <div
                    className="p-4 rounded-sm"
                    style={{ background: "#1E1510", border: "1px solid #4A2A10" }}
                  >
                    <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "#C9A84C" }}>
                      + {isUk ? "Додати монограму" : "Add Monogram"} — ₴150
                    </p>
                    <p className="text-xs" style={{ color: "#7A6A55" }}>
                      {isUk
                        ? "Персоналізуйте свій виріб ініціалами або коротким словом"
                        : "Personalize your item with initials or a short word"}
                    </p>
                    <button
                      onClick={() => scrollToSection("monogram")}
                      className="mt-2 text-xs uppercase tracking-widest"
                      style={{ color: "#C9A84C" }}
                    >
                      {isUk ? "Налаштувати →" : "Configure →"}
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      setCartItems((prev) =>
                        prev.includes(selectedProduct.id)
                          ? prev
                          : [...prev, selectedProduct.id]
                      );
                    }}
                    className="w-full py-4 text-sm uppercase tracking-widest font-bold transition-all"
                    style={{ background: "#C9A84C", color: "#1A1A18" }}
                  >
                    {cartItems.includes(selectedProduct.id)
                      ? isUk
                        ? "✓ Додано до кошика"
                        : "✓ Added to Cart"
                      : isUk
                      ? "Додати до кошика"
                      : "Add to Cart"}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Product Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {filteredProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className="text-left flex flex-col group"
                  style={{ background: "#1A1A18", border: "1px solid #2A2A25" }}
                >
                  {/* Photo */}
                  <div
                    className="relative w-full flex flex-col justify-end p-3"
                    style={{ background: product.colorBg, height: "200px" }}
                  >
                    {product.fullGrain && (
                      <span
                        className="absolute top-3 right-3 text-[9px] uppercase tracking-widest px-2 py-1"
                        style={{ background: "#C9A84C", color: "#1A1A18", fontWeight: 700 }}
                      >
                        {isUk ? "Кращає з часом" : "Gets better with age"}
                      </span>
                    )}
                  </div>
                  {/* Info */}
                  <div className="p-4 flex flex-col gap-1 flex-1">
                    <p className="text-[10px] uppercase tracking-widest" style={{ color: "#7A6A55" }}>
                      {isUk ? product.leatherUk : product.leather}
                    </p>
                    <p className="text-base font-bold leading-snug" style={{ color: "#E8E0D5" }}>
                      {isUk ? product.nameUk : product.name}
                    </p>
                    <p className="text-lg font-bold mt-auto pt-2" style={{ color: "#C9A84C" }}>
                      ₴{product.price.toLocaleString()}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── 3. MONOGRAMS ── */}
      <section
        id="ls-monogram"
        className="px-4 sm:px-8 py-20"
        style={{ background: "#141412" }}
      >
        <div className="max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-[0.4em] mb-3" style={{ color: "#C9A84C" }}>
            {isUk ? "Персоналізація" : "Personalization"}
          </p>
          <h2 className="text-4xl font-bold mb-3" style={{ color: "#E8E0D5" }}>
            {isUk ? "Монограми" : "Monograms"}
          </h2>
          <p className="text-sm mb-10" style={{ color: "#7A6A55" }}>
            {isUk
              ? "Ідеальний подарунок для нього — монограма + подарункова упаковка"
              : "Perfect gift for him — monogram + gift packaging"}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Controls */}
            <div className="flex flex-col gap-6">
              {/* Text input */}
              <div>
                <label
                  className="block text-xs uppercase tracking-widest mb-2"
                  style={{ color: "#9A8A75" }}
                >
                  {isUk ? "Текст монограми (1–3 символи або слово)" : "Monogram text (1–3 chars or short word)"}
                </label>
                <input
                  type="text"
                  value={monogramText}
                  onChange={(e) => setMonogramText(e.target.value.slice(0, 8))}
                  placeholder={isUk ? "напр. АМ або ALEX" : "e.g. AM or ALEX"}
                  maxLength={8}
                  className="w-full px-4 py-3 text-sm outline-none"
                  style={{
                    background: "#1A1A18",
                    border: "1px solid #3A3A35",
                    color: "#E8E0D5",
                  }}
                />
              </div>

              {/* Font selection */}
              <div>
                <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#9A8A75" }}>
                  {isUk ? "Стиль шрифту" : "Font Style"}
                </p>
                <div className="flex flex-col gap-2">
                  {(["serif", "sans", "script"] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setMonogramFont(f)}
                      className="flex items-center justify-between px-4 py-3 text-sm transition-all"
                      style={
                        monogramFont === f
                          ? { background: "#2A1A0A", border: "1px solid #C9A84C", color: "#C9A84C" }
                          : { background: "#1A1A18", border: "1px solid #2A2A25", color: "#9A8A75" }
                      }
                    >
                      <span>{fontLabels[f]}</span>
                      <span
                        className={fontStyles[f]}
                        style={{ fontSize: "1.1rem", color: monogramFont === f ? "#C9A84C" : "#5A5A50" }}
                      >
                        AB
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Position */}
              <div>
                <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#9A8A75" }}>
                  {isUk ? "Розміщення" : "Position"}
                </p>
                <div className="flex gap-2">
                  {(["corner", "center", "strap"] as const).map((pos) => (
                    <button
                      key={pos}
                      onClick={() => setMonogramPosition(pos)}
                      className="flex-1 py-2 text-xs uppercase tracking-wider transition-all"
                      style={
                        monogramPosition === pos
                          ? { background: "#C9A84C", color: "#1A1A18", fontWeight: 700 }
                          : { background: "#1A1A18", border: "1px solid #2A2A25", color: "#7A6A55" }
                      }
                    >
                      {pos === "corner"
                        ? isUk
                          ? "Кут"
                          : "Corner"
                        : pos === "center"
                        ? isUk
                          ? "Центр"
                          : "Center"
                        : isUk
                        ? "Ремінь"
                        : "Strap"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price note */}
              <div
                className="p-4"
                style={{ background: "#1E1510", border: "1px solid #4A2A10" }}
              >
                <p className="text-sm font-bold" style={{ color: "#C9A84C" }}>
                  + ₴150 {isUk ? "за виріб" : "per item"}
                </p>
                <p className="text-xs mt-1" style={{ color: "#7A6A55" }}>
                  {isUk
                    ? "Включено: монограма + подарункова упаковка"
                    : "Includes: monogram + gift packaging"}
                </p>
              </div>
            </div>

            {/* Preview */}
            <div className="flex flex-col gap-4">
              <p className="text-xs uppercase tracking-widest" style={{ color: "#9A8A75" }}>
                {isUk ? "Попередній перегляд" : "Preview"}
              </p>
              <div
                className="flex items-center justify-center rounded-sm relative"
                style={{ background: "#8B4513", height: "280px" }}
              >
                {/* Leather texture overlay */}
                <div
                  className="absolute inset-0 opacity-20 rounded-sm"
                  style={{
                    background:
                      "repeating-linear-gradient(45deg, #6B3410 0px, #6B3410 1px, transparent 1px, transparent 8px)",
                  }}
                />
                {/* Monogram display */}
                <div
                  className="relative z-10 flex flex-col items-center gap-2"
                  style={{
                    position: "absolute",
                    top: monogramPosition === "corner" ? "16px" : monogramPosition === "center" ? "50%" : "auto",
                    bottom: monogramPosition === "strap" ? "16px" : "auto",
                    left: monogramPosition === "corner" ? "16px" : monogramPosition === "center" ? "50%" : "50%",
                    transform:
                      monogramPosition === "center"
                        ? "translate(-50%, -50%)"
                        : monogramPosition === "strap"
                        ? "translateX(-50%)"
                        : "none",
                  }}
                >
                  <span
                    className={`${fontStyles[monogramFont]} text-4xl`}
                    style={{ color: "#C9A84C", textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}
                  >
                    {monogramText || (isUk ? "АМ" : "AM")}
                  </span>
                </div>
              </div>
              <p className="text-xs text-center" style={{ color: "#5A5A50" }}>
                {isUk
                  ? `Шрифт: ${fontLabels[monogramFont]} · Позиція: ${
                      monogramPosition === "corner"
                        ? "Кут"
                        : monogramPosition === "center"
                        ? "Центр"
                        : "Ремінь"
                    }`
                  : `Font: ${fontLabels[monogramFont]} · Position: ${monogramPosition.charAt(0).toUpperCase() + monogramPosition.slice(1)}`}
              </p>
              <button
                onClick={() => scrollToSection("custom")}
                className="w-full py-3 text-sm uppercase tracking-widest font-bold"
                style={{ background: "#C9A84C", color: "#1A1A18" }}
              >
                {isUk ? "Замовити з монограмою" : "Order with Monogram"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. CUSTOM ORDERS ── */}
      <section id="ls-custom" className="px-4 sm:px-8 py-20" style={{ background: "#111110" }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-xs uppercase tracking-[0.4em] mb-3" style={{ color: "#C9A84C" }}>
            {isUk ? "Індивідуальне" : "Bespoke"}
          </p>
          <h2 className="text-4xl font-bold mb-3" style={{ color: "#E8E0D5" }}>
            {isUk ? "Індивідуальні замовлення" : "Custom Orders"}
          </h2>
          <p className="text-sm mb-4" style={{ color: "#7A6A55" }}>
            {isUk
              ? "Термін виготовлення: 2–5 тижнів залежно від складності"
              : "Production time: 2–5 weeks depending on complexity"}
          </p>

          {customOrderSent ? (
            <div
              className="p-8 text-center rounded-sm"
              style={{ background: "#1A1A18", border: "1px solid #4A2A10" }}
            >
              <p className="text-3xl mb-3">✦</p>
              <p className="text-xl font-bold mb-2" style={{ color: "#C9A84C" }}>
                {isUk ? "Запит отримано" : "Request Received"}
              </p>
              <p className="text-sm" style={{ color: "#9A8A75" }}>
                {isUk
                  ? "Ми зв'яжемося з вами протягом 24 годин для обговорення деталей."
                  : "We will contact you within 24 hours to discuss the details."}
              </p>
              <button
                onClick={() => setCustomOrderSent(false)}
                className="mt-6 text-xs uppercase tracking-widest"
                style={{ color: "#C9A84C" }}
              >
                {isUk ? "Нове замовлення" : "New Order"}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Form */}
              <div
                className="p-6 rounded-sm flex flex-col gap-5"
                style={{ background: "#1A1A18", border: "1px solid #2A2A25" }}
              >
                {/* Item type */}
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: "#9A8A75" }}>
                    {isUk ? "Тип виробу" : "Item Type"}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { v: "wallet", l: isUk ? "Гаманець" : "Wallet" },
                      { v: "belt", l: isUk ? "Ремінь" : "Belt" },
                      { v: "bag", l: isUk ? "Сумка" : "Bag" },
                      { v: "other", l: isUk ? "Інше" : "Other" },
                    ].map((opt) => (
                      <button
                        key={opt.v}
                        onClick={() => setCustomForm((prev) => ({ ...prev, itemType: opt.v }))}
                        className="px-4 py-2 text-xs uppercase tracking-wider transition-all"
                        style={
                          customForm.itemType === opt.v
                            ? { background: "#C9A84C", color: "#1A1A18", fontWeight: 700 }
                            : { background: "#111110", border: "1px solid #2A2A25", color: "#7A6A55" }
                        }
                      >
                        {opt.l}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color swatches */}
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: "#9A8A75" }}>
                    {isUk ? "Колір шкіри" : "Leather Color"}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {leatherColors.map((c) => (
                      <button
                        key={c.hex}
                        onClick={() => setCustomForm((prev) => ({ ...prev, color: c.hex }))}
                        title={c.label}
                        className="w-8 h-8 rounded-full transition-all shrink-0"
                        style={{
                          background: c.hex,
                          outline:
                            customForm.color === c.hex ? `2px solid #C9A84C` : `2px solid transparent`,
                          outlineOffset: "2px",
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-xs mt-1" style={{ color: "#5A5A50" }}>
                    {leatherColors.find((c) => c.hex === customForm.color)?.label}
                  </p>
                </div>

                {/* Size */}
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: "#9A8A75" }}>
                    {isUk ? "Розмір / довжина (необов'язково)" : "Size / Length (optional)"}
                  </label>
                  <input
                    type="text"
                    value={customForm.size}
                    onChange={(e) => setCustomForm((prev) => ({ ...prev, size: e.target.value }))}
                    placeholder={isUk ? "напр. 115 см, або стандарт" : "e.g. 115 cm, or standard"}
                    className="w-full px-4 py-2.5 text-sm outline-none"
                    style={{ background: "#111110", border: "1px solid #3A3A35", color: "#E8E0D5" }}
                  />
                </div>

                {/* Special details */}
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: "#9A8A75" }}>
                    {isUk ? "Деталі (кишені, блискавки тощо)" : "Details (pockets, zippers, etc.)"}
                  </label>
                  <textarea
                    value={customForm.details}
                    onChange={(e) => setCustomForm((prev) => ({ ...prev, details: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-2.5 text-sm outline-none resize-none"
                    style={{ background: "#111110", border: "1px solid #3A3A35", color: "#E8E0D5" }}
                  />
                </div>

                {/* Monogram */}
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: "#9A8A75" }}>
                    {isUk ? "Монограма (необов'язково, +₴150)" : "Monogram (optional, +₴150)"}
                  </label>
                  <input
                    type="text"
                    value={customForm.monogram}
                    onChange={(e) => setCustomForm((prev) => ({ ...prev, monogram: e.target.value.slice(0, 8) }))}
                    maxLength={8}
                    className="w-full px-4 py-2.5 text-sm outline-none"
                    style={{ background: "#111110", border: "1px solid #3A3A35", color: "#E8E0D5" }}
                  />
                </div>

                {/* Deadline + Budget */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: "#9A8A75" }}>
                      {isUk ? "Термін" : "Deadline"}
                    </label>
                    <input
                      type="date"
                      value={customForm.deadline}
                      onChange={(e) => setCustomForm((prev) => ({ ...prev, deadline: e.target.value }))}
                      className="w-full px-3 py-2.5 text-sm outline-none"
                      style={{ background: "#111110", border: "1px solid #3A3A35", color: "#E8E0D5" }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: "#9A8A75" }}>
                      {isUk ? "Бюджет (₴)" : "Budget (₴)"}
                    </label>
                    <input
                      type="text"
                      value={customForm.budget}
                      onChange={(e) => setCustomForm((prev) => ({ ...prev, budget: e.target.value }))}
                      placeholder="₴"
                      className="w-full px-3 py-2.5 text-sm outline-none"
                      style={{ background: "#111110", border: "1px solid #3A3A35", color: "#E8E0D5" }}
                    />
                  </div>
                </div>

                <button
                  onClick={() => setCustomOrderSent(true)}
                  className="w-full py-4 text-sm uppercase tracking-widest font-bold mt-2"
                  style={{ background: "#C9A84C", color: "#1A1A18" }}
                >
                  {isUk ? "Надіслати запит" : "Send Request"}
                </button>
              </div>

              {/* Previous examples */}
              <div className="flex flex-col gap-5">
                <p className="text-xs uppercase tracking-widest" style={{ color: "#9A8A75" }}>
                  {isUk ? "Попередні роботи" : "Previous Custom Orders"}
                </p>
                {customOrderExamples.map((ex, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-sm"
                    style={{ background: "#1A1A18", border: "1px solid #2A2A25" }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-base font-bold" style={{ color: "#E8E0D5" }}>
                        {ex.title}
                      </p>
                      <span className="text-xs shrink-0 ml-3" style={{ color: "#C9A84C" }}>
                        {ex.time}
                      </span>
                    </div>
                    <p className="text-sm" style={{ color: "#7A6A55" }}>
                      {ex.desc}
                    </p>
                  </div>
                ))}
                <div
                  className="p-4"
                  style={{ background: "#1E1510", border: "1px solid #4A2A10" }}
                >
                  <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "#C9A84C" }}>
                    ⏱ {isUk ? "Час виготовлення" : "Production Time"}
                  </p>
                  <p className="text-sm" style={{ color: "#9A8A75" }}>
                    {isUk ? "2–5 тижнів залежно від складності виробу" : "2–5 weeks depending on item complexity"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── 5. REPAIR & RESTORATION ── */}
      <section id="ls-repair" className="px-4 sm:px-8 py-20" style={{ background: "#141412" }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-xs uppercase tracking-[0.4em] mb-3" style={{ color: "#C9A84C" }}>
            {isUk ? "Відновлення" : "Restoration"}
          </p>
          <h2 className="text-4xl font-bold mb-3" style={{ color: "#E8E0D5" }}>
            {isUk ? "Ремонт та реставрація" : "Repair & Restoration"}
          </h2>
          <p className="text-sm mb-10" style={{ color: "#7A6A55" }}>
            {isUk
              ? "Оцінка після огляду — безкоштовно"
              : "Assessment after inspection — free"}
          </p>

          {/* What we repair */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
            {repairServices.map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-3 p-4 rounded-sm"
                style={{ background: "#1A1A18", border: "1px solid #2A2A25" }}
              >
                <span className="text-xl shrink-0">{s.icon}</span>
                <p className="text-sm" style={{ color: "#9A8A75" }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* Repair form */}
          {repairSent ? (
            <div
              className="p-8 text-center rounded-sm"
              style={{ background: "#1A1A18", border: "1px solid #4A2A10" }}
            >
              <p className="text-3xl mb-3">✦</p>
              <p className="text-xl font-bold mb-2" style={{ color: "#C9A84C" }}>
                {isUk ? "Запит надіслано" : "Request Sent"}
              </p>
              <p className="text-sm" style={{ color: "#9A8A75" }}>
                {isUk
                  ? "Ми зв'яжемося з вами після безкоштовної оцінки."
                  : "We will contact you after the free assessment."}
              </p>
              <button
                onClick={() => setRepairSent(false)}
                className="mt-6 text-xs uppercase tracking-widest"
                style={{ color: "#C9A84C" }}
              >
                {isUk ? "Ще один запит" : "Another Request"}
              </button>
            </div>
          ) : (
            <div
              className="p-6 sm:p-8 rounded-sm max-w-2xl"
              style={{ background: "#1A1A18", border: "1px solid #2A2A25" }}
            >
              <p className="text-sm uppercase tracking-widest mb-5" style={{ color: "#9A8A75" }}>
                {isUk ? "Запит на ремонт" : "Repair Request"}
              </p>
              {/* Photo upload note */}
              <div
                className="flex items-center gap-3 p-4 mb-5 rounded-sm"
                style={{ background: "#111110", border: "1px dashed #3A3A35" }}
              >
                <span className="text-2xl">📷</span>
                <p className="text-sm" style={{ color: "#7A6A55" }}>
                  {isUk
                    ? "Надішліть фото виробу після заповнення форми (Telegram / Instagram)"
                    : "Send photos of the item after submitting (Telegram / Instagram)"}
                </p>
              </div>
              {/* Problem description */}
              <div className="mb-4">
                <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: "#9A8A75" }}>
                  {isUk ? "Опис проблеми" : "Problem Description"}
                </label>
                <textarea
                  value={repairForm.problem}
                  onChange={(e) => setRepairForm((prev) => ({ ...prev, problem: e.target.value }))}
                  rows={4}
                  placeholder={
                    isUk
                      ? "Опишіть що потребує ремонту, вік виробу, матеріал..."
                      : "Describe what needs repair, item age, material..."
                  }
                  className="w-full px-4 py-3 text-sm outline-none resize-none"
                  style={{ background: "#111110", border: "1px solid #3A3A35", color: "#E8E0D5" }}
                />
              </div>
              {/* Contact */}
              <div className="mb-5">
                <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: "#9A8A75" }}>
                  {isUk ? "Контакт (телефон або Instagram)" : "Contact (phone or Instagram)"}
                </label>
                <input
                  type="text"
                  value={repairForm.contact}
                  onChange={(e) => setRepairForm((prev) => ({ ...prev, contact: e.target.value }))}
                  placeholder={isUk ? "+38 або @instagram" : "+38 or @instagram"}
                  className="w-full px-4 py-2.5 text-sm outline-none"
                  style={{ background: "#111110", border: "1px solid #3A3A35", color: "#E8E0D5" }}
                />
              </div>
              <div
                className="flex items-center gap-2 mb-5 p-3"
                style={{ background: "#1E1510", border: "1px solid #4A2A10" }}
              >
                <span style={{ color: "#C9A84C" }}>✓</span>
                <p className="text-xs" style={{ color: "#9A8A75" }}>
                  {isUk
                    ? "Оцінка після огляду — безкоштовно"
                    : "Assessment after inspection — free"}
                </p>
              </div>
              <button
                onClick={() => setRepairSent(true)}
                className="w-full py-4 text-sm uppercase tracking-widest font-bold"
                style={{ background: "#C9A84C", color: "#1A1A18" }}
              >
                {isUk ? "Надіслати запит" : "Submit Request"}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── 6. ABOUT ── */}
      <section id="ls-about" className="px-4 sm:px-8 py-20" style={{ background: "#111110" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Master photo placeholder */}
          <div className="relative">
            <div
              className="w-full rounded-sm"
              style={{ background: "#1A1A18", height: "420px" }}
            >
              <div
                className="absolute inset-0 rounded-sm opacity-30"
                style={{
                  background:
                    "repeating-linear-gradient(45deg, #8B4513 0px, #8B4513 1px, transparent 1px, transparent 20px)",
                }}
              />
              <div className="absolute bottom-6 left-6">
                <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "#C9A84C" }}>
                  {isUk ? "Майстер" : "Master Craftsman"}
                </p>
                <p className="text-2xl font-bold" style={{ color: "#E8E0D5" }}>
                  {isUk ? "Максим Коваль" : "Maxim Koval"}
                </p>
                <p className="text-sm" style={{ color: "#7A6A55" }}>
                  {isUk ? "17 років у ремеслі" : "17 years in the craft"}
                </p>
              </div>
            </div>
          </div>

          {/* Story */}
          <div className="flex flex-col gap-6">
            <p className="text-xs uppercase tracking-[0.4em]" style={{ color: "#C9A84C" }}>
              {isUk ? "Наша історія" : "Our Story"}
            </p>
            <h2 className="text-4xl font-bold leading-tight" style={{ color: "#E8E0D5" }}>
              {isUk
                ? "Речі, що переживають десятиліття"
                : "Things that outlast decades"}
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "#9A8A75" }}>
              {isUk
                ? "Майстерня LeatherSmith заснована 2007 року у Львові. Ми віримо: справжній виріб зі шкіри не старіє — він набуває характеру. Кожна сумка, гаманець, ремінь — це діалог між руками майстра і матеріалом, що живе."
                : "LeatherSmith workshop was founded in 2007 in Lviv. We believe a true leather piece doesn't age — it acquires character. Every bag, wallet, belt is a dialogue between a craftsman's hands and a living material."}
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "#9A8A75" }}>
              {isUk
                ? "Ми не гонимося за кількістю. Щотижня — 15–20 виробів. Кожен — з іменем майстра на підкладці. Тільки full-grain шкіра першого сорту, тільки ручна прошивка сідельним методом, тільки латунна фурнітура."
                : "We don't chase volume. 15–20 items per week. Each has the craftsman's name inside. Only first-grade full-grain leather, only hand saddle-stitching, only brass hardware."}
            </p>
            <blockquote
              className="border-l-2 pl-6 py-2 text-lg font-bold italic leading-snug"
              style={{ borderColor: "#C9A84C", color: "#C9A84C" }}
            >
              {isUk
                ? "«Ми говоримо мовою речей, що залишаються назавжди»"
                : '"We speak the language of things that last"'}
            </blockquote>
            <div className="flex gap-8 pt-2">
              {[
                { num: "17+", label: isUk ? "Років досвіду" : "Years of craft" },
                { num: "3 200+", label: isUk ? "Виробів зроблено" : "Items crafted" },
                { num: "100%", label: isUk ? "Ручна робота" : "By hand" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold" style={{ color: "#C9A84C" }}>
                    {stat.num}
                  </p>
                  <p className="text-xs uppercase tracking-wider" style={{ color: "#5A5A50" }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. FOOTER ── */}
      <footer
        className="px-4 sm:px-8 py-12 border-t"
        style={{ background: "#0D0D0B", borderColor: "#1A1A18" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">
            {/* Brand */}
            <div>
              <p className="text-xl font-bold tracking-[0.15em] uppercase mb-2" style={{ color: "#C9A84C" }}>
                LeatherSmith
              </p>
              <p className="text-xs leading-relaxed" style={{ color: "#5A5A50" }}>
                {isUk
                  ? "Майстерня ручних шкіряних виробів. Львів, Україна."
                  : "Artisan leather workshop. Lviv, Ukraine."}
              </p>
            </div>
            {/* Links */}
            <div>
              <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "#7A6A55" }}>
                {isUk ? "Навігація" : "Navigation"}
              </p>
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-left text-xs transition-colors"
                    style={{ color: "#5A5A50" }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
            {/* Contact */}
            <div>
              <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "#7A6A55" }}>
                {isUk ? "Контакти" : "Contact"}
              </p>
              <div className="flex flex-col gap-2 text-xs" style={{ color: "#5A5A50" }}>
                <p>Instagram: @leathersmith.ua</p>
                <p>Telegram: @leathersmith</p>
                <p>{isUk ? "Пн–Сб: 10:00–19:00" : "Mon–Sat: 10:00–19:00"}</p>
                <p>{isUk ? "Львів, вул. Шевська 12" : "12 Shevska St, Lviv"}</p>
              </div>
            </div>
          </div>
          <div
            className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t text-xs"
            style={{ borderColor: "#1A1A18", color: "#3A3A35" }}
          >
            <p>© 2007–2026 LeatherSmith.</p>
            <p style={{ color: "#C9A84C", opacity: 0.5 }}>
              {isUk ? "Речі, що переживають десятиліття." : "Things that outlast decades."}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
