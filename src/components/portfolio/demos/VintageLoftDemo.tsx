"use client";

import { useState } from "react";

export function VintageLoftDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  // ── State ──────────────────────────────────────────────────────────────────
  const [activeCategoryTab, setActiveCategoryTab] = useState(0);
  const [activeFilter, setActiveFilter] = useState<{
    era: string;
    size: string;
    price: string;
  }>({ era: "all", size: "all", price: "all" });
  const [selectedItem, setSelectedItem] = useState<null | (typeof allItems)[0]>(
    null
  );
  const [cartItems, setCartItems] = useState<(typeof allItems)[0][]>([]);
  const [countdownTime] = useState(() => {
    const now = new Date();
    const nextFriday = new Date(now);
    const day = now.getDay();
    const daysUntilFriday = day === 5 ? 7 : (5 - day + 7) % 7 || 7;
    nextFriday.setDate(now.getDate() + daysUntilFriday);
    nextFriday.setHours(10, 0, 0, 0);
    const diff = Math.max(0, nextFriday.getTime() - now.getTime());
    const totalMins = Math.floor(diff / 60000);
    return {
      days: Math.floor(totalMins / 1440),
      hours: Math.floor((totalMins % 1440) / 60),
      mins: totalMins % 60,
    };
  });
  const [emailInput, setEmailInput] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [sellFormData, setSellFormData] = useState({
    description: "",
    contact: "",
  });
  const [sellSubmitted, setSellSubmitted] = useState(false);
  const [activeLook, setActiveLook] = useState(0);

  // ── Data ───────────────────────────────────────────────────────────────────
  const newInItems = [
    {
      id: 1,
      nameEn: "Levi's 501",
      nameUk: "Levi's 501",
      era: "1990s",
      size: "W30 L32",
      measurements: "Waist 76cm, Length 100cm",
      measurementsUk: "Талія 76см, Довжина 100см",
      price: 1850,
      status: "available",
      color: "#6B7C93",
      storyEn:
        "Found at a Berlin flea market. Original red tab intact, classic straight cut.",
      storyUk:
        "Знайдено на берлінському блошиному ринку. Оригінальна червона нашивка збережена.",
      condition: "Very Good",
      category: 3,
    },
    {
      id: 2,
      nameEn: "Wool Coat Vintage",
      nameUk: "Вовняне пальто Vintage",
      era: "1970s",
      size: "M",
      measurements: "Chest 96cm, Length 110cm",
      measurementsUk: "Груди 96см, Довжина 110см",
      price: 3200,
      status: "available",
      color: "#8B7355",
      storyEn:
        "A real 70s statement piece from a Lviv estate sale. Camel wool, fully lined.",
      storyUk:
        "Справжній стейтмент 70-х з маєтку у Львові. Вовна кемел, повна підкладка.",
      condition: "Excellent",
      category: 0,
    },
    {
      id: 3,
      nameEn: "Floral Midi Dress",
      nameUk: "Квіткова міді-сукня",
      era: "Y2K",
      size: "S",
      measurements: "Bust 84cm, Waist 68cm, Length 95cm",
      measurementsUk: "Груди 84см, Талія 68см, Довжина 95см",
      price: 1200,
      status: "available",
      color: "#C4956A",
      storyEn:
        "Y2K maximalism at its finest. Bold print, flutter sleeves, slip lining.",
      storyUk:
        "Y2K максималізм у кращому вигляді. Яскравий принт, рюші, підкладка.",
      condition: "Very Good",
      category: 1,
    },
    {
      id: 4,
      nameEn: "Nike Windbreaker",
      nameUk: "Nike Windbreaker",
      era: "1990s",
      size: "L",
      measurements: "Chest 108cm, Length 68cm",
      measurementsUk: "Груди 108см, Довжина 68см",
      price: 2100,
      status: "sold",
      color: "#4A6741",
      storyEn:
        "Iconic 90s Nike pullover windbreaker. Original colorway, logo embroidered.",
      storyUk:
        "Культовий пуловер-вітровка Nike 90-х. Оригінальний колір, вишитий логотип.",
      condition: "Good",
      category: 0,
    },
    {
      id: 5,
      nameEn: "Denim Jacket",
      nameUk: "Джинсова куртка",
      era: "1980s",
      size: "M",
      measurements: "Chest 100cm, Length 56cm",
      measurementsUk: "Груди 100см, Довжина 56см",
      price: 1650,
      status: "available",
      color: "#5B7FA6",
      storyEn:
        "Acid-washed 80s denim with original pin patches. Collected in Odesa.",
      storyUk:
        "Кислотний денім 80-х з оригінальними значками. Зібрано в Одесі.",
      condition: "Good",
      category: 0,
    },
    {
      id: 6,
      nameEn: "Silk Blouse",
      nameUk: "Шовкова блузка",
      era: "1980s",
      size: "S",
      measurements: "Bust 88cm, Length 62cm",
      measurementsUk: "Груди 88см, Довжина 62см",
      price: 980,
      status: "available",
      color: "#D4A5A5",
      storyEn:
        "Ivory silk blouse with dramatic bow. Found in a Kyiv family wardrobe.",
      storyUk: "Шовкова блузка кольору слонової кістки з бантом. Знайдено в Києві.",
      condition: "Excellent",
      category: 2,
    },
    {
      id: 7,
      nameEn: "Platform Boots",
      nameUk: "Платформа Черевики",
      era: "Y2K",
      size: "EU 38",
      measurements: "Heel 5cm, Shaft 28cm",
      measurementsUk: "Підбор 5см, Голяшка 28см",
      price: 2400,
      status: "available",
      color: "#2C2C2C",
      storyEn:
        "Chunky Y2K platforms in black faux leather. Never worn, original box.",
      storyUk: "Масивні платформи Y2K зі штучної шкіри. Не одягалися, оригінальна коробка.",
      condition: "Excellent",
      category: 4,
    },
    {
      id: 8,
      nameEn: "Corduroy Blazer",
      nameUk: "Вельветовий блейзер",
      era: "1970s",
      size: "L",
      measurements: "Chest 104cm, Length 72cm, Shoulder 46cm",
      measurementsUk: "Груди 104см, Довжина 72см, Плечі 46см",
      price: 1900,
      status: "available",
      color: "#7B5E3C",
      storyEn:
        "Rich brown corduroy blazer with elbow patches. A professor's jacket with soul.",
      storyUk: "Коричневий вельветовий блейзер з латками на ліктях. Піджак із душею.",
      condition: "Very Good",
      category: 0,
    },
  ];

  const allItems = newInItems;

  const categories = [
    { en: "Outerwear", uk: "Верхній одяг" },
    { en: "Dresses", uk: "Сукні" },
    { en: "Blouses", uk: "Блузки" },
    { en: "Jeans", uk: "Джинси" },
    { en: "Footwear", uk: "Взуття" },
    { en: "Accessories", uk: "Аксесуари" },
    { en: "90s Menswear", uk: "Чоловічий одяг 90-х" },
  ];

  const eras = ["all", "1970s", "1980s", "1990s", "Y2K"];
  const sizes = ["all", "XS", "S", "M", "L", "W30", "EU 38"];
  const prices = ["all", "under1000", "1000-2000", "over2000"];

  const filteredCatalog = allItems.filter((item) => {
    const eraOk =
      activeFilter.era === "all" || item.era === activeFilter.era;
    const sizeOk =
      activeFilter.size === "all" || item.size.includes(activeFilter.size);
    const priceOk =
      activeFilter.price === "all" ||
      (activeFilter.price === "under1000" && item.price < 1000) ||
      (activeFilter.price === "1000-2000" &&
        item.price >= 1000 &&
        item.price <= 2000) ||
      (activeFilter.price === "over2000" && item.price > 2000);
    const categoryMatch = item.category === activeCategoryTab;
    return eraOk && sizeOk && priceOk && categoryMatch;
  });

  const looks = [
    {
      titleEn: "The Kyiv Intellectual",
      titleUk: "Київський інтелектуал",
      descEn:
        "Corduroy meets silk in a 70s-80s fusion for gallery openings and bookshop browsing.",
      descUk:
        "Вельвет зустрічає шовк у злитті 70-80-х для галерейних відкриттів і книгарень.",
      pieces: [1, 8, 6],
    },
    {
      titleEn: "Friday Drop Energy",
      titleUk: "Енергія п'ятничного дропу",
      descEn:
        "90s icons stacked together — the drop pick that sells out by noon.",
      descUk: "Ікони 90-х разом — дроп-пік, що розлітається до обіду.",
      pieces: [1, 4, 5],
    },
    {
      titleEn: "Y2K Revival",
      titleUk: "Y2K Ревайвл",
      descEn:
        "Maximum nostalgia, zero apologies. Dress up or down, always loud.",
      descUk: "Максимальна ностальгія, нуль вибачень. З будь-чим, завжди яскраво.",
      pieces: [3, 7],
    },
  ];

  const processSteps = [
    {
      num: "01",
      en: "Send us photos of your item via the form below.",
      uk: "Надішліть фото речі через форму нижче.",
    },
    {
      num: "02",
      en: "We evaluate condition, era, and fit for our store.",
      uk: "Ми оцінюємо стан, епоху та відповідність нашому магазину.",
    },
    {
      num: "03",
      en: "Bring the item to our Kyiv drop-off point.",
      uk: "Привезіть річ до нашого пункту прийому в Києві.",
    },
    {
      num: "04",
      en: "Get cash or store credit on the spot.",
      uk: "Отримайте готівку або кредит магазину одразу.",
    },
  ];

  const criteria = [
    {
      en: "Era: pre-2005, ideally 60s–90s",
      uk: "Епоха: до 2005 р., ідеально 60-ті–90-ті",
    },
    {
      en: "Condition: Good or better, no major damage",
      uk: "Стан: хороший або кращий, без серйозних пошкоджень",
    },
    {
      en: "Brands: Levi's, Wrangler, Nike, Adidas, vintage designer",
      uk: "Бренди: Levi's, Wrangler, Nike, Adidas, вінтажний дизайнер",
    },
    {
      en: "Unique pieces: hand-knit, embroidered, rare prints",
      uk: "Унікальні речі: в'язані, вишиті, рідкісні принти",
    },
  ];

  // ── Helpers ────────────────────────────────────────────────────────────────
  const addToCart = (item: (typeof allItems)[0]) => {
    if (item.status === "sold") return;
    setCartItems((prev) => {
      if (prev.find((c) => c.id === item.id)) return prev;
      return [...prev, item];
    });
    setCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((c) => c.id !== id));
  };

  const cartTotal = cartItems.reduce((s, i) => s + i.price, 0);

  const priceLabel = (p: string) => {
    if (p === "all") return isUk ? "Всі ціни" : "All prices";
    if (p === "under1000") return isUk ? "до ₴1000" : "Under ₴1000";
    if (p === "1000-2000") return "₴1000–₴2000";
    return isUk ? "від ₴2000" : "Over ₴2000";
  };

  const conditionColor = (c: string) => {
    if (c === "Excellent") return "#4D7C0F";
    if (c === "Very Good") return "#B45309";
    return "#78716C";
  };

  // ── Grain style (reusable) ─────────────────────────────────────────────────
  const grainFilter =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")";

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div
      className="relative min-h-screen font-serif text-[#2C1A0E] overflow-x-hidden"
      style={{ backgroundColor: "#F5E6C3" }}
    >
      {/* Global grain overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-30"
        style={{
          backgroundImage: grainFilter,
          backgroundRepeat: "repeat",
          mixBlendMode: "multiply",
        }}
      />

      {/* ── HEADER ── */}
      <header
        className="relative z-20 flex items-center justify-between px-6 py-4 border-b"
        style={{ borderColor: "#B45309", backgroundColor: "#F5E6C3" }}
      >
        <div>
          <div
            className="text-2xl font-black tracking-widest uppercase"
            style={{ color: "#B45309" }}
          >
            VINTAGE LOFT
          </div>
          <div
            className="text-xs tracking-[0.3em] uppercase"
            style={{ color: "#4D7C0F" }}
          >
            {isUk ? "Київ · Вінтаж · Секонд-хенд" : "Kyiv · Vintage · Secondhand"}
          </div>
        </div>

        <nav className="hidden md:flex gap-6 text-sm tracking-widest uppercase font-semibold">
          {[
            { en: "New In", uk: "Новинки" },
            { en: "Catalog", uk: "Каталог" },
            { en: "Lookbook", uk: "Лукбук" },
            { en: "Sell To Us", uk: "Здати речі" },
          ].map((l) => (
            <span
              key={l.en}
              className="cursor-pointer hover:opacity-70 transition-opacity"
              style={{ color: "#2C1A0E" }}
            >
              {isUk ? l.uk : l.en}
            </span>
          ))}
        </nav>

        <button
          onClick={() => setCartOpen(!cartOpen)}
          className="relative flex items-center gap-2 px-4 py-2 text-sm font-bold tracking-wider uppercase transition-opacity hover:opacity-80"
          style={{
            backgroundColor: "#B45309",
            color: "#F5E6C3",
            borderRadius: "2px",
          }}
        >
          <span>&#128722;</span>
          <span>{isUk ? "Кошик" : "Cart"}</span>
          {cartItems.length > 0 && (
            <span
              className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center text-xs font-black rounded-full"
              style={{ backgroundColor: "#4D7C0F", color: "#fff" }}
            >
              {cartItems.length}
            </span>
          )}
        </button>
      </header>

      {/* ── CART SLIDE-OUT ── */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setCartOpen(false)}
          />
          <div
            className="relative z-10 w-full max-w-sm h-full flex flex-col shadow-2xl"
            style={{ backgroundColor: "#F5E6C3" }}
          >
            <div
              className="flex items-center justify-between p-4 border-b"
              style={{ borderColor: "#B45309" }}
            >
              <h2
                className="text-lg font-black tracking-widest uppercase"
                style={{ color: "#B45309" }}
              >
                {isUk ? "Кошик" : "Your Cart"}
              </h2>
              <button
                onClick={() => setCartOpen(false)}
                className="text-2xl leading-none hover:opacity-60"
                style={{ color: "#2C1A0E" }}
              >
                ×
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
              {cartItems.length === 0 ? (
                <p
                  className="text-sm italic text-center mt-8"
                  style={{ color: "#78716C" }}
                >
                  {isUk ? "Кошик порожній" : "Your cart is empty"}
                </p>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 border-b pb-3"
                    style={{ borderColor: "#E8D5B0" }}
                  >
                    <div
                      className="w-12 h-12 shrink-0 rounded"
                      style={{ backgroundColor: item.color, opacity: 0.8 }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold truncate">
                        {isUk ? item.nameUk : item.nameEn}
                      </div>
                      <div className="text-xs" style={{ color: "#78716C" }}>
                        {item.era} · {item.size}
                      </div>
                      <div
                        className="text-sm font-black"
                        style={{ color: "#B45309" }}
                      >
                        ₴{item.price.toLocaleString()}
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-lg leading-none hover:opacity-60 shrink-0"
                      style={{ color: "#B45309" }}
                    >
                      ×
                    </button>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div
                className="p-4 border-t"
                style={{ borderColor: "#B45309" }}
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold tracking-wider uppercase text-sm">
                    {isUk ? "Разом" : "Total"}
                  </span>
                  <span
                    className="text-xl font-black"
                    style={{ color: "#B45309" }}
                  >
                    ₴{cartTotal.toLocaleString()}
                  </span>
                </div>
                <button
                  className="w-full py-3 text-sm font-black tracking-widest uppercase transition-opacity hover:opacity-80"
                  style={{
                    backgroundColor: "#B45309",
                    color: "#F5E6C3",
                    borderRadius: "2px",
                  }}
                >
                  {isUk ? "Оформити замовлення" : "Checkout"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── ITEM DETAIL MODAL ── */}
      {selectedItem && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSelectedItem(null)}
          />
          <div
            className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded shadow-2xl"
            style={{ backgroundColor: "#F5E6C3" }}
          >
            <div className="flex flex-col md:flex-row gap-0">
              {/* Photo */}
              <div
                className="md:w-2/5 h-64 md:h-auto shrink-0 flex items-center justify-center relative"
                style={{ backgroundColor: selectedItem.color, minHeight: 260 }}
              >
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: grainFilter,
                    backgroundRepeat: "repeat",
                  }}
                />
                <span
                  className="text-6xl font-black opacity-20 select-none"
                  style={{ color: "#F5E6C3" }}
                >
                  VL
                </span>
                <span
                  className="absolute top-3 left-3 text-xs font-bold px-2 py-1 rounded"
                  style={{ backgroundColor: "#F5E6C3", color: "#B45309" }}
                >
                  {selectedItem.era}
                </span>
              </div>

              {/* Details */}
              <div className="flex-1 p-6">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="float-right text-2xl leading-none hover:opacity-60"
                  style={{ color: "#B45309" }}
                >
                  ×
                </button>

                <h2 className="text-2xl font-black mb-1" style={{ color: "#B45309" }}>
                  {isUk ? selectedItem.nameUk : selectedItem.nameEn}
                </h2>

                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded"
                    style={{
                      backgroundColor: conditionColor(selectedItem.condition),
                      color: "#fff",
                    }}
                  >
                    {isUk
                      ? selectedItem.condition === "Excellent"
                        ? "Відмінний"
                        : selectedItem.condition === "Very Good"
                        ? "Дуже хороший"
                        : "Хороший"
                      : selectedItem.condition}
                  </span>
                  <span className="text-xs" style={{ color: "#78716C" }}>
                    {isUk ? "Стан" : "Condition"}
                  </span>
                </div>

                <p className="text-sm leading-relaxed mb-4 italic" style={{ color: "#5C3D1E" }}>
                  &ldquo;{isUk ? selectedItem.storyUk : selectedItem.storyEn}&rdquo;
                </p>

                {/* Measurements table */}
                <div className="mb-4">
                  <div
                    className="text-xs font-black tracking-widest uppercase mb-2"
                    style={{ color: "#B45309" }}
                  >
                    {isUk ? "Виміри" : "Measurements"}
                  </div>
                  <div
                    className="text-sm p-3 rounded font-mono"
                    style={{ backgroundColor: "#EDD9A3", color: "#2C1A0E" }}
                  >
                    {isUk ? selectedItem.measurementsUk : selectedItem.measurements}
                  </div>
                </div>

                {/* Care */}
                <div className="mb-4">
                  <div
                    className="text-xs font-black tracking-widest uppercase mb-2"
                    style={{ color: "#B45309" }}
                  >
                    {isUk ? "Догляд" : "Care"}
                  </div>
                  <div className="text-xs" style={{ color: "#78716C" }}>
                    {isUk
                      ? "Делікатне прання 30°C · Не відбілювати · Прасувати через тканину"
                      : "Gentle wash 30°C · No bleach · Iron on reverse"}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div
                    className="text-3xl font-black"
                    style={{ color: "#B45309" }}
                  >
                    ₴{selectedItem.price.toLocaleString()}
                  </div>
                  {selectedItem.status === "sold" ? (
                    <span
                      className="px-6 py-3 text-sm font-black tracking-widest uppercase rounded"
                      style={{
                        backgroundColor: "#E8D5B0",
                        color: "#78716C",
                      }}
                    >
                      {isUk ? "Продано" : "Sold Out"}
                    </span>
                  ) : (
                    <button
                      onClick={() => addToCart(selectedItem)}
                      className="px-6 py-3 text-sm font-black tracking-widest uppercase transition-opacity hover:opacity-80"
                      style={{
                        backgroundColor: "#B45309",
                        color: "#F5E6C3",
                        borderRadius: "2px",
                      }}
                    >
                      {isUk ? "В кошик" : "Add to Cart"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── SECTION 1: HERO ── */}
      <section className="relative z-10 overflow-hidden">
        <div
          className="relative min-h-[520px] flex flex-col items-center justify-center text-center px-6 py-20"
          style={{
            background:
              "linear-gradient(135deg, #B45309 0%, #7C3A0A 40%, #2C1A0E 100%)",
          }}
        >
          {/* Grain on hero */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: grainFilter,
              backgroundRepeat: "repeat",
              mixBlendMode: "overlay",
            }}
          />
          {/* Editorial scan-line effect */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
            }}
          />

          <div className="relative z-10 max-w-3xl mx-auto">
            <div
              className="inline-block text-xs font-black tracking-[0.4em] uppercase px-4 py-1 mb-6"
              style={{
                border: "1px solid #F5E6C3",
                color: "#F5E6C3",
                opacity: 0.7,
              }}
            >
              {isUk ? "Київ, з 2019 року" : "Kyiv, Est. 2019"}
            </div>

            <h1
              className="text-4xl md:text-6xl font-black leading-tight mb-4"
              style={{ color: "#F5E6C3" }}
            >
              {isUk
                ? "Одяг із душею."
                : "Clothing with Soul."}
              <br />
              <span style={{ color: "#F5E6C3", opacity: 0.75 }}>
                {isUk
                  ? "Нові знахідки щоп'ятниці."
                  : "New Finds Every Friday."}
              </span>
            </h1>

            <p
              className="text-lg mb-8 tracking-wide"
              style={{ color: "#F5E6C3", opacity: 0.8 }}
            >
              {isUk
                ? "Куровані вінтаж і секонд-хенд. Київ."
                : "Curated vintage & secondhand. Kyiv."}
            </p>

            {/* Countdown */}
            <div className="flex items-center justify-center gap-1 mb-10">
              <span
                className="text-xs tracking-widest uppercase mr-3"
                style={{ color: "#F5E6C3", opacity: 0.6 }}
              >
                {isUk ? "Наступний дроп:" : "Next drop:"}
              </span>
              {[
                { v: countdownTime.days, l: isUk ? "д" : "d" },
                { v: countdownTime.hours, l: isUk ? "г" : "h" },
                { v: countdownTime.mins, l: isUk ? "хв" : "m" },
              ].map((u, i) => (
                <span key={i} className="flex items-baseline gap-0.5">
                  <span
                    className="text-3xl font-black tabular-nums"
                    style={{ color: "#F5E6C3" }}
                  >
                    {String(u.v).padStart(2, "0")}
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: "#F5E6C3", opacity: 0.5 }}
                  >
                    {u.l}
                  </span>
                  {i < 2 && (
                    <span
                      className="text-xl font-black mx-1"
                      style={{ color: "#F5E6C3", opacity: 0.4 }}
                    >
                      :
                    </span>
                  )}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                className="px-8 py-3 text-sm font-black tracking-widest uppercase transition-opacity hover:opacity-80"
                style={{
                  backgroundColor: "#B45309",
                  color: "#F5E6C3",
                  border: "2px solid #F5E6C3",
                  borderRadius: "2px",
                }}
              >
                {isUk ? "Нові надходження" : "New Arrivals"}
              </button>
              <button
                className="px-8 py-3 text-sm font-black tracking-widest uppercase transition-opacity hover:opacity-80"
                style={{
                  backgroundColor: "transparent",
                  color: "#F5E6C3",
                  border: "2px solid #F5E6C3",
                  borderRadius: "2px",
                }}
              >
                {isUk ? "Здати речі" : "Sell To Us"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: NEW IN ── */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div
                className="text-xs font-black tracking-[0.4em] uppercase mb-2"
                style={{ color: "#4D7C0F" }}
              >
                {isUk ? "Щоп'ятнична поставка" : "Friday Drop"}
              </div>
              <h2
                className="text-3xl md:text-4xl font-black"
                style={{ color: "#B45309" }}
              >
                {isUk ? "Нові надходження" : "New In"}
              </h2>
            </div>

            {/* Countdown badge */}
            <div
              className="flex items-center gap-3 px-5 py-3 rounded"
              style={{ backgroundColor: "#EDD9A3" }}
            >
              <span
                className="text-xs font-bold tracking-widest uppercase"
                style={{ color: "#78716C" }}
              >
                {isUk ? "Наступний дроп:" : "Next drop:"}
              </span>
              <span
                className="text-xl font-black tabular-nums"
                style={{ color: "#B45309" }}
              >
                {String(countdownTime.days).padStart(2, "0")}d{" "}
                {String(countdownTime.hours).padStart(2, "0")}h{" "}
                {String(countdownTime.mins).padStart(2, "0")}m
              </span>
            </div>
          </div>

          {/* Items grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {newInItems.map((item) => (
              <div
                key={item.id}
                className="cursor-pointer group"
                onClick={() => setSelectedItem(item)}
              >
                {/* Photo */}
                <div
                  className="relative aspect-[3/4] mb-3 overflow-hidden"
                  style={{ backgroundColor: item.color }}
                >
                  <div
                    className="absolute inset-0 opacity-25 group-hover:opacity-10 transition-opacity"
                    style={{
                      backgroundImage: grainFilter,
                      backgroundRepeat: "repeat",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className="text-4xl font-black opacity-15 select-none"
                      style={{ color: "#F5E6C3" }}
                    >
                      VL
                    </span>
                  </div>
                  {/* Era badge */}
                  <span
                    className="absolute top-2 left-2 text-xs font-black px-2 py-0.5"
                    style={{ backgroundColor: "#B45309", color: "#F5E6C3" }}
                  >
                    {item.era}
                  </span>
                  {/* Status */}
                  {item.status === "sold" && (
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
                    >
                      <span
                        className="text-sm font-black tracking-widest uppercase px-3 py-1"
                        style={{
                          backgroundColor: "#F5E6C3",
                          color: "#2C1A0E",
                        }}
                      >
                        {isUk ? "Продано" : "Sold Out"}
                      </span>
                    </div>
                  )}
                  {/* Hover add */}
                  {item.status === "available" && (
                    <div className="absolute inset-0 flex items-end justify-center p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(item);
                        }}
                        className="w-full py-2 text-xs font-black tracking-widest uppercase"
                        style={{
                          backgroundColor: "#B45309",
                          color: "#F5E6C3",
                        }}
                      >
                        {isUk ? "В кошик" : "Add to Cart"}
                      </button>
                    </div>
                  )}
                </div>

                <div className="text-sm font-bold mb-0.5">
                  {isUk ? item.nameUk : item.nameEn}
                </div>
                <div className="text-xs mb-1" style={{ color: "#78716C" }}>
                  {item.size}
                </div>
                <div
                  className="text-sm font-black"
                  style={{ color: "#B45309" }}
                >
                  ₴{item.price.toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          {/* Email subscription */}
          <div
            className="rounded p-8 text-center"
            style={{ backgroundColor: "#EDD9A3" }}
          >
            <h3
              className="text-xl font-black tracking-wider mb-2"
              style={{ color: "#B45309" }}
            >
              {isUk ? "Дізнайтесь першими" : "Be the first to know"}
            </h3>
            <p className="text-sm mb-5" style={{ color: "#78716C" }}>
              {isUk
                ? "Сповіщення про п'ятничний дроп прямо на пошту."
                : "Friday drop alerts straight to your inbox."}
            </p>
            {emailSubmitted ? (
              <p
                className="font-black tracking-widest uppercase"
                style={{ color: "#4D7C0F" }}
              >
                {isUk ? "Ви в списку!" : "You're on the list!"}
              </p>
            ) : (
              <form
                className="flex flex-col sm:flex-row gap-2 max-w-sm mx-auto"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (emailInput) setEmailSubmitted(true);
                }}
              >
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder={isUk ? "ваша@пошта.com" : "your@email.com"}
                  required
                  className="flex-1 px-4 py-2 text-sm border outline-none"
                  style={{
                    backgroundColor: "#F5E6C3",
                    borderColor: "#B45309",
                    color: "#2C1A0E",
                  }}
                />
                <button
                  type="submit"
                  className="px-6 py-2 text-sm font-black tracking-widest uppercase transition-opacity hover:opacity-80"
                  style={{
                    backgroundColor: "#B45309",
                    color: "#F5E6C3",
                    borderRadius: "2px",
                  }}
                >
                  {isUk ? "Підписатись" : "Subscribe"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: CATALOG ── */}
      <section
        className="relative z-10 py-16 px-6"
        style={{ backgroundColor: "#EDD9A3" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <div
              className="text-xs font-black tracking-[0.4em] uppercase mb-2"
              style={{ color: "#4D7C0F" }}
            >
              {isUk ? "Каталог" : "Catalog"}
            </div>
            <h2
              className="text-3xl md:text-4xl font-black"
              style={{ color: "#B45309" }}
            >
              {isUk ? "Перегляд за категорією" : "Browse by Category"}
            </h2>
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setActiveCategoryTab(i)}
                className="px-4 py-2 text-xs font-black tracking-widest uppercase transition-all"
                style={{
                  backgroundColor:
                    activeCategoryTab === i ? "#B45309" : "transparent",
                  color: activeCategoryTab === i ? "#F5E6C3" : "#B45309",
                  border: "2px solid #B45309",
                  borderRadius: "2px",
                }}
              >
                {isUk ? cat.uk : cat.en}
              </button>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-8">
            {/* Era filter */}
            <div>
              <label
                className="block text-xs font-black tracking-widest uppercase mb-1"
                style={{ color: "#78716C" }}
              >
                {isUk ? "Епоха" : "Era"}
              </label>
              <div className="flex gap-1">
                {eras.map((era) => (
                  <button
                    key={era}
                    onClick={() =>
                      setActiveFilter((f) => ({ ...f, era }))
                    }
                    className="px-3 py-1 text-xs font-bold transition-all"
                    style={{
                      backgroundColor:
                        activeFilter.era === era ? "#4D7C0F" : "#F5E6C3",
                      color: activeFilter.era === era ? "#fff" : "#4D7C0F",
                      border: "1px solid #4D7C0F",
                    }}
                  >
                    {era === "all" ? (isUk ? "Всі" : "All") : era}
                  </button>
                ))}
              </div>
            </div>

            {/* Size filter */}
            <div>
              <label
                className="block text-xs font-black tracking-widest uppercase mb-1"
                style={{ color: "#78716C" }}
              >
                {isUk ? "Розмір" : "Size"}
              </label>
              <div className="flex flex-wrap gap-1">
                {sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() =>
                      setActiveFilter((f) => ({ ...f, size: sz }))
                    }
                    className="px-3 py-1 text-xs font-bold transition-all"
                    style={{
                      backgroundColor:
                        activeFilter.size === sz ? "#B45309" : "#F5E6C3",
                      color: activeFilter.size === sz ? "#fff" : "#B45309",
                      border: "1px solid #B45309",
                    }}
                  >
                    {sz === "all" ? (isUk ? "Всі" : "All") : sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Price filter */}
            <div>
              <label
                className="block text-xs font-black tracking-widest uppercase mb-1"
                style={{ color: "#78716C" }}
              >
                {isUk ? "Ціна" : "Price"}
              </label>
              <div className="flex flex-wrap gap-1">
                {prices.map((p) => (
                  <button
                    key={p}
                    onClick={() =>
                      setActiveFilter((f) => ({ ...f, price: p }))
                    }
                    className="px-3 py-1 text-xs font-bold transition-all"
                    style={{
                      backgroundColor:
                        activeFilter.price === p ? "#2C1A0E" : "#F5E6C3",
                      color: activeFilter.price === p ? "#F5E6C3" : "#2C1A0E",
                      border: "1px solid #2C1A0E",
                    }}
                  >
                    {priceLabel(p)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Items */}
          {filteredCatalog.length === 0 ? (
            <div
              className="text-center py-16 text-sm italic"
              style={{ color: "#78716C" }}
            >
              {isUk
                ? "Немає результатів для цих фільтрів."
                : "No items match these filters."}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {filteredCatalog.map((item) => (
                <div
                  key={item.id}
                  className="cursor-pointer group"
                  onClick={() => setSelectedItem(item)}
                >
                  <div
                    className="relative aspect-[3/4] mb-3 overflow-hidden"
                    style={{ backgroundColor: item.color }}
                  >
                    <div
                      className="absolute inset-0 opacity-25 group-hover:opacity-10 transition-opacity"
                      style={{
                        backgroundImage: grainFilter,
                        backgroundRepeat: "repeat",
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span
                        className="text-4xl font-black opacity-15 select-none"
                        style={{ color: "#F5E6C3" }}
                      >
                        VL
                      </span>
                    </div>
                    <span
                      className="absolute top-2 left-2 text-xs font-black px-2 py-0.5"
                      style={{ backgroundColor: "#B45309", color: "#F5E6C3" }}
                    >
                      {item.era}
                    </span>
                    {item.status === "sold" && (
                      <div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
                      >
                        <span
                          className="text-sm font-black tracking-widest uppercase px-3 py-1"
                          style={{
                            backgroundColor: "#F5E6C3",
                            color: "#2C1A0E",
                          }}
                        >
                          {isUk ? "Продано" : "Sold Out"}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="text-sm font-bold mb-0.5">
                    {isUk ? item.nameUk : item.nameEn}
                  </div>
                  <div className="text-xs mb-1" style={{ color: "#78716C" }}>
                    {item.size} ·{" "}
                    {isUk ? item.measurementsUk : item.measurements}
                  </div>
                  <div className="text-xs italic mb-1" style={{ color: "#78716C" }}>
                    &ldquo;{isUk ? item.storyUk : item.storyEn}&rdquo;
                  </div>
                  <div
                    className="text-sm font-black"
                    style={{ color: "#B45309" }}
                  >
                    ₴{item.price.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── SECTION 5: SELL TO US ── */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 text-center">
            <div
              className="text-xs font-black tracking-[0.4em] uppercase mb-2"
              style={{ color: "#4D7C0F" }}
            >
              {isUk ? "Консигнація" : "Consignment"}
            </div>
            <h2
              className="text-3xl md:text-4xl font-black mb-3"
              style={{ color: "#B45309" }}
            >
              {isUk
                ? "Ми куруємо кожну річ"
                : "We curate every piece"}
            </h2>
            <p className="text-sm max-w-xl mx-auto" style={{ color: "#78716C" }}>
              {isUk
                ? "Vintage Loft — не звалище. Кожна річ проходить відбір. Ось що ми приймаємо."
                : "Vintage Loft is not a dump. Every piece passes curation. Here's what we accept."}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* What we accept */}
            <div
              className="p-6 rounded"
              style={{ backgroundColor: "#EDD9A3" }}
            >
              <h3
                className="text-lg font-black tracking-wider uppercase mb-4"
                style={{ color: "#B45309" }}
              >
                {isUk ? "Що ми приймаємо" : "What we accept"}
              </h3>
              <ul className="space-y-3">
                {criteria.map((c, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span
                      className="shrink-0 font-black mt-0.5"
                      style={{ color: "#4D7C0F" }}
                    >
                      ✓
                    </span>
                    <span>{isUk ? c.uk : c.en}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* How it works */}
            <div>
              <h3
                className="text-lg font-black tracking-wider uppercase mb-4"
                style={{ color: "#B45309" }}
              >
                {isUk ? "Як це працює" : "How it works"}
              </h3>
              <ol className="space-y-4">
                {processSteps.map((step) => (
                  <li key={step.num} className="flex gap-4 items-start">
                    <span
                      className="text-3xl font-black leading-none shrink-0 tabular-nums"
                      style={{ color: "#B45309", opacity: 0.3 }}
                    >
                      {step.num}
                    </span>
                    <p className="text-sm pt-1">
                      {isUk ? step.uk : step.en}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Submission form */}
          {sellSubmitted ? (
            <div
              className="text-center p-10 rounded"
              style={{ backgroundColor: "#EDD9A3" }}
            >
              <div
                className="text-4xl font-black mb-2"
                style={{ color: "#4D7C0F" }}
              >
                ✓
              </div>
              <p className="font-black tracking-widest uppercase text-sm" style={{ color: "#4D7C0F" }}>
                {isUk
                  ? "Отримали! Зв'яжемося протягом 48 годин."
                  : "Received! We'll be in touch within 48 hours."}
              </p>
            </div>
          ) : (
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setSellSubmitted(true);
              }}
            >
              <div>
                <label
                  className="block text-xs font-black tracking-widest uppercase mb-1"
                  style={{ color: "#78716C" }}
                >
                  {isUk ? "Опис речі" : "Item description"}
                </label>
                <textarea
                  rows={4}
                  value={sellFormData.description}
                  onChange={(e) =>
                    setSellFormData((f) => ({
                      ...f,
                      description: e.target.value,
                    }))
                  }
                  placeholder={
                    isUk
                      ? "Тип, бренд, стан, розмір, епоха..."
                      : "Type, brand, condition, size, era..."
                  }
                  required
                  className="w-full px-4 py-3 text-sm border outline-none resize-none"
                  style={{
                    backgroundColor: "#F5E6C3",
                    borderColor: "#B45309",
                    color: "#2C1A0E",
                  }}
                />
              </div>
              <div
                className="p-4 text-sm rounded"
                style={{ backgroundColor: "#EDD9A3", color: "#78716C" }}
              >
                📷{" "}
                {isUk
                  ? "Після відправки форми ми надішлемо адресу для фото."
                  : "After submitting, we'll send you an address to send photos to."}
              </div>
              <div>
                <label
                  className="block text-xs font-black tracking-widest uppercase mb-1"
                  style={{ color: "#78716C" }}
                >
                  {isUk ? "Контакт (телефон або email)" : "Contact (phone or email)"}
                </label>
                <input
                  type="text"
                  value={sellFormData.contact}
                  onChange={(e) =>
                    setSellFormData((f) => ({
                      ...f,
                      contact: e.target.value,
                    }))
                  }
                  placeholder={isUk ? "+380..." : "+380 or email"}
                  required
                  className="w-full px-4 py-3 text-sm border outline-none"
                  style={{
                    backgroundColor: "#F5E6C3",
                    borderColor: "#B45309",
                    color: "#2C1A0E",
                  }}
                />
              </div>
              <button
                type="submit"
                className="px-8 py-3 text-sm font-black tracking-widest uppercase transition-opacity hover:opacity-80"
                style={{
                  backgroundColor: "#B45309",
                  color: "#F5E6C3",
                  borderRadius: "2px",
                }}
              >
                {isUk ? "Надіслати заявку" : "Submit"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── SECTION 6: LOOKBOOK ── */}
      <section
        className="relative z-10 py-16 px-6"
        style={{ backgroundColor: "#2C1A0E" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 text-center">
            <div
              className="text-xs font-black tracking-[0.4em] uppercase mb-2"
              style={{ color: "#4D7C0F" }}
            >
              {isUk ? "Стилізація" : "Styling"}
            </div>
            <h2
              className="text-3xl md:text-4xl font-black"
              style={{ color: "#F5E6C3" }}
            >
              {isUk ? "Лукбук" : "Lookbook"}
            </h2>
          </div>

          {/* Look tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {looks.map((look, i) => (
              <button
                key={i}
                onClick={() => setActiveLook(i)}
                className="px-5 py-2 text-xs font-black tracking-widest uppercase transition-all"
                style={{
                  backgroundColor:
                    activeLook === i ? "#B45309" : "transparent",
                  color: activeLook === i ? "#F5E6C3" : "#B45309",
                  border: "2px solid #B45309",
                  borderRadius: "2px",
                }}
              >
                {isUk ? look.titleUk : look.titleEn}
              </button>
            ))}
          </div>

          {/* Active look */}
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Visual */}
            <div className="grid grid-cols-2 gap-2">
              {looks[activeLook].pieces.map((pieceId) => {
                const piece = allItems.find((it) => it.id === pieceId);
                if (!piece) return null;
                return (
                  <div
                    key={pieceId}
                    className={`relative overflow-hidden cursor-pointer ${
                      looks[activeLook].pieces.length === 2
                        ? "col-span-1 aspect-[3/4]"
                        : looks[activeLook].pieces.indexOf(pieceId) === 0
                        ? "col-span-2 aspect-[2/1]"
                        : "aspect-square"
                    }`}
                    style={{ backgroundColor: piece.color }}
                    onClick={() => setSelectedItem(piece)}
                  >
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: grainFilter,
                        backgroundRepeat: "repeat",
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span
                        className="text-3xl font-black opacity-15 select-none"
                        style={{ color: "#F5E6C3" }}
                      >
                        VL
                      </span>
                    </div>
                    <span
                      className="absolute bottom-2 left-2 text-xs font-black px-2 py-0.5"
                      style={{ backgroundColor: "#F5E6C3", color: "#B45309" }}
                    >
                      {isUk ? piece.nameUk : piece.nameEn}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Look info */}
            <div>
              <h3
                className="text-2xl font-black mb-3"
                style={{ color: "#F5E6C3" }}
              >
                {isUk
                  ? looks[activeLook].titleUk
                  : looks[activeLook].titleEn}
              </h3>
              <p className="text-sm mb-6 leading-relaxed italic" style={{ color: "#B45309" }}>
                {isUk
                  ? looks[activeLook].descUk
                  : looks[activeLook].descEn}
              </p>

              <div
                className="text-xs font-black tracking-widest uppercase mb-3"
                style={{ color: "#78716C" }}
              >
                {isUk ? "Речі з цього луку" : "Pieces in this look"}
              </div>
              <ul className="space-y-3">
                {looks[activeLook].pieces.map((pieceId) => {
                  const piece = allItems.find((it) => it.id === pieceId);
                  if (!piece) return null;
                  return (
                    <li
                      key={pieceId}
                      className="flex items-center justify-between text-sm border-b pb-2 cursor-pointer hover:opacity-70 transition-opacity"
                      style={{ borderColor: "#3C2512", color: "#F5E6C3" }}
                      onClick={() => setSelectedItem(piece)}
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full shrink-0"
                          style={{ backgroundColor: piece.color }}
                        />
                        {isUk ? piece.nameUk : piece.nameEn}
                      </span>
                      <span style={{ color: "#B45309" }} className="font-black">
                        ₴{piece.price.toLocaleString()}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <button
                className="mt-6 px-6 py-2 text-xs font-black tracking-widest uppercase transition-opacity hover:opacity-80"
                style={{
                  backgroundColor: "#B45309",
                  color: "#F5E6C3",
                  borderRadius: "2px",
                }}
                onClick={() => {
                  const first = allItems.find(
                    (it) => it.id === looks[activeLook].pieces[0]
                  );
                  if (first) setSelectedItem(first);
                }}
              >
                {isUk ? "Переглянути речі" : "Shop the Look"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="relative z-10 border-t py-10 px-6"
        style={{ backgroundColor: "#F5E6C3", borderColor: "#B45309" }}
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div
              className="text-xl font-black tracking-widest uppercase mb-2"
              style={{ color: "#B45309" }}
            >
              VINTAGE LOFT
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#78716C" }}>
              {isUk
                ? "Куровані вінтажні та секонд-хенд речі. Нові поставки щоп'ятниці. Київ, з 2019 року."
                : "Curated vintage & secondhand. New drops every Friday. Kyiv, Est. 2019."}
            </p>
            <div className="flex gap-4">
              {["Instagram", "Telegram"].map((s) => (
                <span
                  key={s}
                  className="text-xs font-bold tracking-widest uppercase cursor-pointer hover:opacity-60 transition-opacity"
                  style={{ color: "#B45309" }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <div
              className="text-xs font-black tracking-widest uppercase mb-3"
              style={{ color: "#78716C" }}
            >
              {isUk ? "Магазин" : "Shop"}
            </div>
            <ul className="space-y-2">
              {[
                { en: "New In", uk: "Новинки" },
                { en: "Catalog", uk: "Каталог" },
                { en: "Lookbook", uk: "Лукбук" },
                { en: "Sell To Us", uk: "Здати речі" },
              ].map((l) => (
                <li
                  key={l.en}
                  className="text-sm cursor-pointer hover:opacity-60 transition-opacity"
                  style={{ color: "#2C1A0E" }}
                >
                  {isUk ? l.uk : l.en}
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <div
              className="text-xs font-black tracking-widest uppercase mb-3"
              style={{ color: "#78716C" }}
            >
              {isUk ? "Інформація" : "Info"}
            </div>
            <ul className="space-y-2">
              {[
                { en: "About Us", uk: "Про нас" },
                { en: "Shipping & Returns", uk: "Доставка та повернення" },
                { en: "Size Guide", uk: "Таблиця розмірів" },
                { en: "Contact", uk: "Контакти" },
              ].map((l) => (
                <li
                  key={l.en}
                  className="text-sm cursor-pointer hover:opacity-60 transition-opacity"
                  style={{ color: "#2C1A0E" }}
                >
                  {isUk ? l.uk : l.en}
                </li>
              ))}
            </ul>
            <div
              className="mt-4 text-xs"
              style={{ color: "#78716C" }}
            >
              {isUk
                ? "Київ, Україна · hello@vintageloft.ua"
                : "Kyiv, Ukraine · hello@vintageloft.ua"}
            </div>
          </div>
        </div>

        <div
          className="max-w-6xl mx-auto mt-8 pt-6 border-t flex flex-col sm:flex-row justify-between items-center gap-2 text-xs"
          style={{ borderColor: "#E8D5B0", color: "#78716C" }}
        >
          <span>© 2024 Vintage Loft. {isUk ? "Всі права захищено." : "All rights reserved."}</span>
          <span className="italic">
            {isUk
              ? "Демо-версія — створено Codeworth"
              : "Demo version — built by Codeworth"}
          </span>
        </div>
      </footer>
    </div>
  );
}
