"use client";

import { useState } from "react";

const FABRIC_TABS = [
  { key: "wool", labelEn: "Wool", labelUk: "Вовна" },
  { key: "silk", labelEn: "Silk", labelUk: "Шовк" },
  { key: "cotton", labelEn: "Cotton", labelUk: "Бавовна" },
  { key: "linen", labelEn: "Linen", labelUk: "Льон" },
  { key: "cashmere", labelEn: "Cashmere", labelUk: "Кашемір" },
];

const FABRICS: Record<string, { color: string; nameEn: string; nameUk: string; origin: string; weight: string; careEn: string; careUk: string; charEn: string; charUk: string }[]> = {
  wool: [
    { color: "#4A3728", nameEn: "Loro Piana Super 150s", nameUk: "Loro Piana Super 150s", origin: "Italy", weight: "280g/m²", careEn: "Dry clean only", careUk: "Лише хімчистка", charEn: "Exceptionally fine, lustrous and soft. The pinnacle of suiting wool.", charUk: "Надзвичайно тонка, блискуча та м'яка. Вершина костюмної вовни." },
    { color: "#6B5344", nameEn: "Holland & Sherry Classic", nameUk: "Holland & Sherry Classic", origin: "England", weight: "310g/m²", careEn: "Dry clean only", careUk: "Лише хімчистка", charEn: "Robust English tweed with excellent drape. Timeless and durable.", charUk: "Міцний англійський твід з чудовим драпіруванням. Вічна класика." },
    { color: "#8B7355", nameEn: "Huddersfield Fine Tweed", nameUk: "Huddersfield Fine Tweed", origin: "England", weight: "350g/m²", careEn: "Dry clean only", careUk: "Лише хімчистка", charEn: "Traditional Yorkshire weave, ideal for country suits and blazers.", charUk: "Традиційне йоркширське плетіння, ідеальне для кантрі-костюмів." },
    { color: "#5C4A35", nameEn: "Vitale Barberis Canonico", nameUk: "Vitale Barberis Canonico", origin: "Italy", weight: "260g/m²", careEn: "Dry clean only", careUk: "Лише хімчистка", charEn: "Lightweight summer wool with natural breathability. Perfect for warm seasons.", charUk: "Легка літня вовна з природною повітропроникністю. Ідеальна для теплого сезону." },
    { color: "#3D2E1E", nameEn: "Reda Active Wool", nameUk: "Reda Active Wool", origin: "Italy", weight: "240g/m²", careEn: "Machine wash 30°", careUk: "Машинне прання 30°", charEn: "Performance wool blend with stretch. Resistant to wrinkles and movement-friendly.", charUk: "Перформанс-вовна зі стрейч. Стійка до зморшок, зручна в русі." },
  ],
  silk: [
    { color: "#C9A87C", nameEn: "Charmeuse Silk", nameUk: "Шовк Шармез", origin: "France", weight: "75g/m²", careEn: "Hand wash or dry clean", careUk: "Ручне прання або хімчистка", charEn: "Fluid and luminous with a beautiful drape. Perfect for evening gowns.", charUk: "Текучий та ліскучий з чудовим драпіруванням. Ідеальний для вечірніх суконь." },
    { color: "#D4B896", nameEn: "Dupioni Silk", nameUk: "Дюпіоні", origin: "Italy", weight: "120g/m²", careEn: "Dry clean only", careUk: "Лише хімчистка", charEn: "Crisp texture with natural slubs. Distinctive and structured.", charUk: "Чітка текстура з природними слабами. Виразна та структурована." },
    { color: "#B89A6A", nameEn: "Silk Organza", nameUk: "Шовковий Органза", origin: "France", weight: "40g/m²", careEn: "Dry clean only", careUk: "Лише хімчистка", charEn: "Sheer and stiff. Used for overlays and dramatic bridal pieces.", charUk: "Прозорий та жорсткий. Використовується для накладень та весільних виробів." },
    { color: "#A88960", nameEn: "Ponte Silk", nameUk: "Поnte Шовк", origin: "Italy", weight: "95g/m²", careEn: "Hand wash cold", careUk: "Ручне холодне прання", charEn: "Medium weight with excellent recovery. Versatile for all-day wear.", charUk: "Середня вага з відмінним відновленням. Універсальний для повсякденного носіння." },
  ],
  cotton: [
    { color: "#E8DCC8", nameEn: "Egyptian Giza Cotton", nameUk: "Єгипетська бавовна Гіза", origin: "Egypt", weight: "200g/m²", careEn: "Machine wash 40°", careUk: "Машинне прання 40°", charEn: "Extra-long staple cotton of exceptional softness and strength.", charUk: "Надовговолокниста бавовна виняткової м'якості та міцності." },
    { color: "#D6C9B4", nameEn: "Oxford Weave", nameUk: "Оксфордське плетіння", origin: "England", weight: "180g/m²", careEn: "Machine wash 40°", careUk: "Машинне прання 40°", charEn: "Basket weave texture with casual elegance. Classic shirting fabric.", charUk: "Кошиковий плетінь з невимушеною елегантністю. Класична тканина для сорочок." },
    { color: "#C8B99A", nameEn: "Seersucker", nameUk: "Сирсакер", origin: "France", weight: "160g/m²", careEn: "Machine wash 30°", careUk: "Машинне прання 30°", charEn: "Puckered texture for natural air circulation. Ideal for summer tailoring.", charUk: "Зморщена текстура для природної циркуляції повітря. Ідеальна для літнього пошиву." },
    { color: "#BFB09A", nameEn: "Poplin", nameUk: "Поплін", origin: "Italy", weight: "120g/m²", careEn: "Machine wash 40°", careUk: "Машинне прання 40°", charEn: "Fine and smooth with a subtle sheen. The gold standard for dress shirts.", charUk: "Тонкий та гладкий з тонким блиском. Золотий стандарт для класичних сорочок." },
    { color: "#A89880", nameEn: "Twill Cotton", nameUk: "Твіл бавовняний", origin: "Italy", weight: "220g/m²", careEn: "Machine wash 40°", careUk: "Машинне прання 40°", charEn: "Diagonal weave structure with excellent drape and durability.", charUk: "Діагональна структура плетіння з відмінним драпіруванням та довговічністю." },
  ],
  linen: [
    { color: "#D4C9A8", nameEn: "Belgian Pure Linen", nameUk: "Бельгійський чистий льон", origin: "Belgium", weight: "190g/m²", careEn: "Machine wash 40°", careUk: "Машинне прання 40°", charEn: "The finest linen, grown and woven in Belgium. Crisp, breathable, timeless.", charUk: "Найтонший льон, вирощений і витканий в Бельгії. Чіткий, дихаючий, вічний." },
    { color: "#C8BB98", nameEn: "Irish Linen", nameUk: "Ірландський льон", origin: "Ireland", weight: "210g/m²", careEn: "Machine wash 40°", careUk: "Машинне прання 40°", charEn: "Heritage linen with character. Softens beautifully with each wash.", charUk: "Спадщинний льон з характером. Стає красиво м'якшим з кожним пранням." },
    { color: "#B8A882", nameEn: "Washed Linen", nameUk: "Вимитий льон", origin: "France", weight: "175g/m²", careEn: "Machine wash 30°", careUk: "Машинне прання 30°", charEn: "Pre-washed for a relaxed, lived-in texture. Minimal ironing needed.", charUk: "Попередньо вимитий для розслабленої текстури. Мінімальне прасування." },
    { color: "#A89470", nameEn: "Linen Blend", nameUk: "Суміш льону", origin: "Italy", weight: "195g/m²", careEn: "Machine wash 40°", careUk: "Машинне прання 40°", charEn: "55% linen, 45% cotton. Best of both: breathability with less wrinkling.", charUk: "55% льон, 45% бавовна. Найкраще з обох: повітропроникність з меншим зморщуванням." },
  ],
  cashmere: [
    { color: "#8B6914", nameEn: "Mongolian Grade A", nameUk: "Монгольський Ґрейд А", origin: "Mongolia", weight: "220g/m²", careEn: "Dry clean only", careUk: "Лише хімчистка", charEn: "Ultra-fine 14.5 micron fibres. Incomparable warmth-to-weight ratio.", charUk: "Ультратонкі волокна 14.5 мкм. Незрівнянне співвідношення тепла до ваги." },
    { color: "#9E7A1A", nameEn: "Scottish Cashmere", nameUk: "Шотландський кашемір", origin: "Scotland", weight: "240g/m²", careEn: "Dry clean only", careUk: "Лише хімчистка", charEn: "Woven in the Scottish Borders tradition. Exceptional durability and drape.", charUk: "Витканий у традиції Шотландських кордонів. Виняткова міцність та драпірування." },
    { color: "#7A5C10", nameEn: "Loro Piana Cashmere", nameUk: "Кашемір Loro Piana", origin: "Italy", weight: "200g/m²", careEn: "Dry clean only", careUk: "Лише хімчистка", charEn: "The most coveted cashmere in the world. Silky, light, and endlessly luxurious.", charUk: "Найбажаніший кашемір у світі. Шовковистий, легкий та нескінченно розкішний." },
    { color: "#6B4D0E", nameEn: "Cashmere-Silk Blend", nameUk: "Кашемір-шовк мікс", origin: "Italy", weight: "185g/m²", careEn: "Dry clean only", careUk: "Лише хімчистка", charEn: "70% cashmere, 30% silk. Luminous sheen with cloud-like softness.", charUk: "70% кашемір, 30% шовк. Ліскучий блиск з хмаропобідною м'якістю." },
  ],
};

const PROCESS_STEPS = [
  {
    num: "01",
    titleEn: "Initial Consultation",
    titleUk: "Перша консультація",
    timeEn: "60 min",
    timeUk: "60 хв",
    descEn: "We discuss your needs, lifestyle, and occasions. Browse fabric samples together and explore silhouette references. No obligation — just conversation.",
    descUk: "Обговорюємо ваші потреби, стиль життя та події. Разом переглядаємо зразки тканин та силуети. Без зобов'язань — лише розмова.",
  },
  {
    num: "02",
    titleEn: "Measurement Session",
    titleUk: "Зняття мірок",
    timeEn: "45 min",
    timeUk: "45 хв",
    descEn: "Over 40 precise body measurements taken by hand. We note posture, asymmetries, and movement preferences to ensure the garment moves with you.",
    descUk: "Понад 40 точних мірок знімаються вручну. Фіксуємо поставу, асиметрію та переваги руху, щоб виріб рухався разом з вами.",
  },
  {
    num: "03",
    titleEn: "Pattern Creation",
    titleUk: "Створення викрійки",
    timeEn: "1–2 weeks",
    timeUk: "1–2 тижні",
    descEn: "A unique pattern is drafted entirely for your measurements. No blocks or shortcuts — every line is drawn specifically for your body.",
    descUk: "Унікальна викрійка розробляється виключно за вашими мірками. Без блоків та скорочень — кожна лінія намальована спеціально для вашого тіла.",
  },
  {
    num: "04",
    titleEn: "First Fitting",
    titleUk: "Перша примірка",
    timeEn: "45 min",
    timeUk: "45 хв",
    descEn: "The basted garment is fitted on your body. We assess balance, ease, and proportion — making chalk marks for all needed refinements.",
    descUk: "Зметаний виріб надягається на вас. Оцінюємо баланс, свободу та пропорції — робимо крейдяні позначки для всіх потрібних виправлень.",
  },
  {
    num: "05",
    titleEn: "Refinements",
    titleUk: "Доопрацювання",
    timeEn: "1–2 weeks",
    timeUk: "1–2 тижні",
    descEn: "All adjustments from the fitting are meticulously executed. Additional fittings scheduled if complex changes are required. Buttonholes hand-stitched.",
    descUk: "Всі виправлення з примірки ретельно виконуються. Додаткові примірки призначаються при складних змінах. Петлі зшиваються вручну.",
  },
  {
    num: "06",
    titleEn: "Final Fitting & Delivery",
    titleUk: "Фінальна примірка та видача",
    timeEn: "30 min",
    timeUk: "30 хв",
    descEn: "The finished garment is presented. Final minor tweaks made on the spot. Delivered in a cedar-lined garment bag with care card.",
    descUk: "Готовий виріб представляється. Фінальні дрібні правки прямо на місці. Видається у торбинці на підкладці з кедру з карткою по догляду.",
  },
];

const PORTFOLIO_ITEMS = [
  { id: 1, type: "suit", typeEn: "Men's Suit", typeUk: "Чоловічий костюм", fabricEn: "Navy Super 120s Wool", fabricUk: "Темно-синя вовна Super 120s", occasionEn: "Business", occasionUk: "Бізнес", color: "#1A2744", emoji: "🤵" },
  { id: 2, type: "dress", typeEn: "Evening Gown", typeUk: "Вечірня сукня", fabricEn: "Ivory Charmeuse Silk", fabricUk: "Кремовий шовк шармез", occasionEn: "Wedding", occasionUk: "Весілля", color: "#F0EAD8", emoji: "👗" },
  { id: 3, type: "jacket", typeEn: "Sport Jacket", typeUk: "Спортивний жакет", fabricEn: "Herringbone Tweed", fabricUk: "Твід ялинка", occasionEn: "Casual", occasionUk: "Повсякденний", color: "#5C4A35", emoji: "🧥" },
  { id: 4, type: "suit", typeEn: "Three-Piece Suit", typeUk: "Трійка", fabricEn: "Charcoal Flannel", fabricUk: "Антрацит фланель", occasionEn: "Formal", occasionUk: "Урочистий", color: "#3A3A3A", emoji: "🤵" },
  { id: 5, type: "dress", typeEn: "Cocktail Dress", typeUk: "Коктейльна сукня", fabricEn: "Burgundy Dupioni Silk", fabricUk: "Бордовий дюпіоні", occasionEn: "Event", occasionUk: "Захід", color: "#6B1A2A", emoji: "👗" },
  { id: 6, type: "jacket", typeEn: "Dinner Jacket", typeUk: "Смокінговий жакет", fabricEn: "Midnight Blue Wool-Silk", fabricUk: "Опівнічний синій вовна-шовк", occasionEn: "Black Tie", occasionUk: "Чорна краватка", color: "#0D1B2A", emoji: "🧥" },
  { id: 7, type: "suit", typeEn: "Summer Suit", typeUk: "Літній костюм", fabricEn: "Stone Linen-Cotton", fabricUk: "Камінний льон-бавовна", occasionEn: "Wedding", occasionUk: "Весілля", color: "#C8B99A", emoji: "🤵" },
  { id: 8, type: "dress", typeEn: "Wedding Gown", typeUk: "Весільна сукня", fabricEn: "Ivory Silk Organza", fabricUk: "Кремова шовкова органза", occasionEn: "Wedding", occasionUk: "Весілля", color: "#FAF8F3", emoji: "👰" },
];

const PORTFOLIO_FILTERS = [
  { key: "all", labelEn: "All Works", labelUk: "Всі роботи" },
  { key: "suit", labelEn: "Suits", labelUk: "Костюми" },
  { key: "dress", labelEn: "Dresses", labelUk: "Сукні" },
  { key: "jacket", labelEn: "Jackets", labelUk: "Жакети" },
];

const CORPORATE_PACKAGES = [
  {
    nameEn: "Startup",
    nameUk: "Стартап",
    rangeEn: "5–15 pieces",
    rangeUk: "5–15 виробів",
    priceEn: "From ₴4,500/piece",
    priceUk: "Від ₴4,500/виріб",
    featuresEn: ["Standard fabric selection", "2 fabric options", "Basic branding (buttons, label)", "6-week lead time"],
    featuresUk: ["Стандартний вибір тканин", "2 варіанти тканин", "Базовий брендинг (ґудзики, лейбл)", "Термін виготовлення 6 тижнів"],
  },
  {
    nameEn: "Corporate",
    nameUk: "Корпоратив",
    rangeEn: "15–50 pieces",
    rangeUk: "15–50 виробів",
    priceEn: "From ₴3,800/piece",
    priceUk: "Від ₴3,800/виріб",
    featuresEn: ["Extended fabric selection", "4 fabric options", "Custom branding & lining", "Priority 5-week lead time", "Dedicated account manager"],
    featuresUk: ["Розширений вибір тканин", "4 варіанти тканин", "Кастомний брендинг та підкладка", "Пріоритет 5 тижнів", "Виділений менеджер"],
    highlighted: true,
  },
  {
    nameEn: "Enterprise",
    nameUk: "Ентерпрайз",
    rangeEn: "50+ pieces",
    rangeUk: "50+ виробів",
    priceEn: "Custom quote",
    priceUk: "Індивідуальна ціна",
    featuresEn: ["Full fabric library access", "Unlimited options", "Full custom branding", "4-week express lead time", "On-site fittings available", "Annual refresh program"],
    featuresUk: ["Повний доступ до бібліотеки тканин", "Необмежені варіанти", "Повний кастомний брендинг", "Експрес 4 тижні", "Примірки на місці", "Щорічна програма оновлення"],
  },
];

const SERVICE_OPTIONS_EN = ["Men's Suit", "Women's Dress", "Corporate Uniform", "Jacket", "Alterations"];
const SERVICE_OPTIONS_UK = ["Чоловічий костюм", "Жіноча сукня", "Корпоративна форма", "Жакет", "Підгонка"];
const OCCASION_OPTIONS_EN = ["Wedding", "Business", "Casual", "Evening Event", "Corporate"];
const OCCASION_OPTIONS_UK = ["Весілля", "Бізнес", "Повсякденний", "Вечірній захід", "Корпоратив"];
const FABRIC_PREF_EN = ["Wool", "Silk", "Cotton", "Linen", "Cashmere", "No preference"];
const FABRIC_PREF_UK = ["Вовна", "Шовк", "Бавовна", "Льон", "Кашемір", "Без переваги"];

export function AtelierModaDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [activeTab, setActiveTab] = useState("wool");
  const [portfolioFilter, setPortfolioFilter] = useState("all");
  const [form, setForm] = useState({
    service: "",
    occasion: "",
    fabric: "",
    date: "",
    name: "",
    phone: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const filteredPortfolio =
    portfolioFilter === "all"
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((p) => p.type === portfolioFilter);

  const currentFabrics = FABRICS[activeTab] ?? [];

  function handleFormChange(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div
      className="w-full font-serif"
      style={{ backgroundColor: "#F8F5F0", color: "#2C1810" }}
    >
      {/* ── HEADER ── */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{ backgroundColor: "#FAFAF8", borderColor: "#E8E0D5" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xl">✂️</span>
            <span
              className="text-sm font-sans font-semibold tracking-[0.25em] uppercase"
              style={{ color: "#2C1810" }}
            >
              ATELIER MODA
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {[
              isUk ? "Портфоліо" : "Portfolio",
              isUk ? "Послуги" : "Services",
              isUk ? "Тканини" : "Fabrics",
              isUk ? "Процес" : "Process",
              isUk ? "Корпоратив" : "Corporate",
              isUk ? "Контакти" : "Contact",
            ].map((item) => (
              <a
                key={item}
                href="#"
                className="font-sans text-xs tracking-widest uppercase transition-colors hover:opacity-60"
                style={{ color: "#2C1810" }}
              >
                {item}
              </a>
            ))}
          </nav>
          <button
            className="font-sans text-xs tracking-widest uppercase px-5 py-2.5 transition-opacity hover:opacity-80"
            style={{ backgroundColor: "#B87333", color: "#FAFAF8" }}
          >
            {isUk ? "Записатись" : "Book a Fitting"}
          </button>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="max-w-7xl mx-auto px-6 py-28 md:py-40">
        <p
          className="font-sans text-xs tracking-[0.3em] uppercase mb-8"
          style={{ color: "#B87333" }}
        >
          Lviv · {isUk ? "Заснований у" : "Since"} 2010
        </p>
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[1.05] mb-10"
          style={{ color: "#2C1810" }}
        >
          {isUk ? (
            <>
              Індивідуальний
              <br />
              Пошив.
            </>
          ) : (
            <>
              Bespoke
              <br />
              Tailoring.
          </>
          )}
        </h1>
        <p
          className="text-lg md:text-xl font-sans font-light mb-12 max-w-xl leading-relaxed"
          style={{ color: "#6B5344" }}
        >
          {isUk
            ? "Кожен виріб — унікальний. Від першої зустрічі до готового вбрання: 3–6 тижнів."
            : "Every garment is unique. From first meeting to finished garment: 3–6 weeks."}
        </p>
        <div className="flex flex-wrap gap-4">
          <button
            className="font-sans text-xs tracking-widest uppercase px-8 py-4 transition-opacity hover:opacity-80"
            style={{ backgroundColor: "#2C1810", color: "#FAFAF8" }}
          >
            {isUk ? "Замовити консультацію" : "Book a Consultation"}
          </button>
          <button
            className="font-sans text-xs tracking-widest uppercase px-8 py-4 border transition-opacity hover:opacity-70"
            style={{ borderColor: "#2C1810", color: "#2C1810" }}
          >
            {isUk ? "Переглянути роботи" : "View Portfolio"}
          </button>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section
        className="py-24"
        style={{ backgroundColor: "#F0EAE0" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <p
            className="font-sans text-xs tracking-[0.3em] uppercase mb-4"
            style={{ color: "#B87333" }}
          >
            {isUk ? "Послуги" : "Services"}
          </p>
          <h2 className="text-3xl md:text-4xl font-serif mb-16" style={{ color: "#2C1810" }}>
            {isUk ? "Що ми шиємо" : "What We Create"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px" style={{ backgroundColor: "#D8D0C8" }}>
            {[
              {
                emoji: "🤵",
                titleEn: "Men's Suits",
                titleUk: "Чоловічі костюми",
                priceEn: "From ₴15,000",
                priceUk: "Від ₴15,000",
                descEn: "Full bespoke construction. Single or double-breasted, two or three-piece. Every seam stitched to your exact measurements.",
                descUk: "Повний беспок-крій. Однобортний або двобортний, двійка чи трійка. Кожен шов зшивається за вашими точними мірками.",
              },
              {
                emoji: "👗",
                titleEn: "Women's Dresses",
                titleUk: "Жіночі сукні",
                priceEn: "From ₴8,000",
                priceUk: "Від ₴8,000",
                descEn: "Bridal, cocktail, evening or everyday. We work closely with you to create silhouettes that celebrate your form.",
                descUk: "Весільні, коктейльні, вечірні або повсякденні. Ми тісно співпрацюємо з вами для створення силуетів, що підкреслюють вашу форму.",
              },
              {
                emoji: "👔",
                titleEn: "Corporate Uniforms",
                titleUk: "Корпоративна форма",
                priceEn: "From ₴5,000/piece",
                priceUk: "Від ₴5,000/виріб",
                descEn: "Branded workwear tailored to your team. Consistent quality, professional image, custom details.",
                descUk: "Фірмовий одяг для вашої команди. Послідовна якість, професійний образ, кастомні деталі.",
              },
              {
                emoji: "✂️",
                titleEn: "Alterations",
                titleUk: "Підгонка та ремонт",
                priceEn: "From ₴500",
                priceUk: "Від ₴500",
                descEn: "Precise alterations for existing garments. We bring beloved pieces back to a perfect fit.",
                descUk: "Точна підгонка для наявного одягу. Повертаємо улюбленим речам ідеальну посадку.",
              },
            ].map((s) => (
              <div
                key={s.titleEn}
                className="p-8 md:p-10 flex flex-col gap-5"
                style={{ backgroundColor: "#FAFAF8" }}
              >
                <span className="text-3xl">{s.emoji}</span>
                <div>
                  <h3 className="text-lg font-serif mb-1" style={{ color: "#2C1810" }}>
                    {isUk ? s.titleUk : s.titleEn}
                  </h3>
                  <p
                    className="font-sans text-xs tracking-widest uppercase"
                    style={{ color: "#B87333" }}
                  >
                    {isUk ? s.priceUk : s.priceEn}
                  </p>
                </div>
                <p className="font-sans text-sm leading-relaxed" style={{ color: "#6B5344" }}>
                  {isUk ? s.descUk : s.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FABRIC JOURNAL ── */}
      <section className="py-24" style={{ backgroundColor: "#F8F5F0" }}>
        <div className="max-w-7xl mx-auto px-6">
          <p
            className="font-sans text-xs tracking-[0.3em] uppercase mb-4"
            style={{ color: "#B87333" }}
          >
            {isUk ? "Тканини" : "Fabric Journal"}
          </p>
          <h2 className="text-3xl md:text-4xl font-serif mb-12" style={{ color: "#2C1810" }}>
            {isUk ? "Наші матеріали" : "Our Materials"}
          </h2>

          {/* Tabs */}
          <div className="flex flex-wrap gap-0 mb-12 border-b" style={{ borderColor: "#D8D0C8" }}>
            {FABRIC_TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="font-sans text-xs tracking-widest uppercase px-6 py-3 transition-colors border-b-2 -mb-px"
                style={{
                  borderBottomColor: activeTab === tab.key ? "#B87333" : "transparent",
                  color: activeTab === tab.key ? "#B87333" : "#6B5344",
                }}
              >
                {isUk ? tab.labelUk : tab.labelEn}
              </button>
            ))}
          </div>

          {/* Fabric swatches */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {currentFabrics.map((fabric) => (
              <div key={fabric.nameEn} className="group">
                <div
                  className="w-full aspect-square mb-4 rounded-sm transition-transform group-hover:scale-[1.02]"
                  style={{ backgroundColor: fabric.color }}
                />
                <h4 className="font-serif text-sm mb-1" style={{ color: "#2C1810" }}>
                  {fabric.nameEn}
                </h4>
                <p
                  className="font-sans text-xs tracking-wider uppercase mb-2"
                  style={{ color: "#B87333" }}
                >
                  {fabric.origin} · {fabric.weight}
                </p>
                <p className="font-sans text-xs leading-relaxed mb-1" style={{ color: "#6B5344" }}>
                  {isUk ? fabric.charUk : fabric.charEn}
                </p>
                <p className="font-sans text-xs" style={{ color: "#9C8870" }}>
                  🧺 {isUk ? fabric.careUk : fabric.careEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BESPOKE PROCESS ── */}
      <section className="py-24" style={{ backgroundColor: "#2C1810" }}>
        <div className="max-w-7xl mx-auto px-6">
          <p
            className="font-sans text-xs tracking-[0.3em] uppercase mb-4"
            style={{ color: "#B87333" }}
          >
            {isUk ? "Процес" : "The Process"}
          </p>
          <h2
            className="text-3xl md:text-4xl font-serif mb-16"
            style={{ color: "#F8F5F0" }}
          >
            {isUk ? "Від мірки до вироку" : "From Measure to Masterpiece"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {PROCESS_STEPS.map((step) => (
              <div key={step.num} className="flex flex-col gap-4">
                <div className="flex items-start gap-4">
                  <span
                    className="font-sans text-3xl font-light leading-none shrink-0"
                    style={{ color: "#B87333" }}
                  >
                    {step.num}
                  </span>
                  <div>
                    <h3 className="font-serif text-lg mb-1" style={{ color: "#F8F5F0" }}>
                      {isUk ? step.titleUk : step.titleEn}
                    </h3>
                    <p
                      className="font-sans text-xs tracking-widest uppercase"
                      style={{ color: "#B87333" }}
                    >
                      ⏱ {isUk ? step.timeUk : step.timeEn}
                    </p>
                  </div>
                </div>
                <p className="font-sans text-sm leading-relaxed" style={{ color: "#C8B99A" }}>
                  {isUk ? step.descUk : step.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO GALLERY ── */}
      <section className="py-24" style={{ backgroundColor: "#F8F5F0" }}>
        <div className="max-w-7xl mx-auto px-6">
          <p
            className="font-sans text-xs tracking-[0.3em] uppercase mb-4"
            style={{ color: "#B87333" }}
          >
            {isUk ? "Портфоліо" : "Portfolio"}
          </p>
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <h2 className="text-3xl md:text-4xl font-serif" style={{ color: "#2C1810" }}>
              {isUk ? "Наші роботи" : "Selected Works"}
            </h2>
            <div className="flex flex-wrap gap-2">
              {PORTFOLIO_FILTERS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setPortfolioFilter(f.key)}
                  className="font-sans text-xs tracking-widest uppercase px-4 py-2 border transition-colors"
                  style={{
                    borderColor: portfolioFilter === f.key ? "#2C1810" : "#D8D0C8",
                    backgroundColor: portfolioFilter === f.key ? "#2C1810" : "transparent",
                    color: portfolioFilter === f.key ? "#FAFAF8" : "#6B5344",
                  }}
                >
                  {isUk ? f.labelUk : f.labelEn}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredPortfolio.map((item) => (
              <div key={item.id} className="group cursor-pointer">
                <div
                  className="aspect-[3/4] flex flex-col items-center justify-center gap-2 mb-3 transition-transform group-hover:scale-[1.02]"
                  style={{ backgroundColor: item.color }}
                >
                  <span className="text-4xl">{item.emoji}</span>
                </div>
                <h4 className="font-serif text-sm mb-0.5" style={{ color: "#2C1810" }}>
                  {isUk ? item.typeUk : item.typeEn}
                </h4>
                <p className="font-sans text-xs mb-1" style={{ color: "#6B5344" }}>
                  {isUk ? item.fabricUk : item.fabricEn}
                </p>
                <span
                  className="inline-block font-sans text-xs tracking-widest uppercase px-2 py-0.5"
                  style={{ backgroundColor: "#F0EAE0", color: "#B87333" }}
                >
                  {isUk ? item.occasionUk : item.occasionEn}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CORPORATE ORDERS ── */}
      <section className="py-24" style={{ backgroundColor: "#F0EAE0" }}>
        <div className="max-w-7xl mx-auto px-6">
          <p
            className="font-sans text-xs tracking-[0.3em] uppercase mb-4"
            style={{ color: "#B87333" }}
          >
            {isUk ? "Корпоративним клієнтам" : "Corporate"}
          </p>
          <div className="flex flex-wrap items-end justify-between gap-6 mb-16">
            <h2 className="text-3xl md:text-4xl font-serif max-w-md" style={{ color: "#2C1810" }}>
              {isUk ? "Корпоративний одяг для вашої команди" : "Bespoke Workwear for Your Team"}
            </h2>
            <p className="font-sans text-sm max-w-xs leading-relaxed" style={{ color: "#6B5344" }}>
              {isUk
                ? "Від 5 до 500+ виробів. Фірмовий одяг, що відображає цінності вашого бренду."
                : "From 5 to 500+ pieces. Branded garments that embody your company values."}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: "#D8D0C8" }}>
            {CORPORATE_PACKAGES.map((pkg) => (
              <div
                key={pkg.nameEn}
                className="p-8 md:p-10 flex flex-col gap-6"
                style={{
                  backgroundColor: pkg.highlighted ? "#2C1810" : "#FAFAF8",
                }}
              >
                <div>
                  <h3
                    className="font-serif text-2xl mb-1"
                    style={{ color: pkg.highlighted ? "#F8F5F0" : "#2C1810" }}
                  >
                    {isUk ? pkg.nameUk : pkg.nameEn}
                  </h3>
                  <p
                    className="font-sans text-xs tracking-widest uppercase"
                    style={{ color: "#B87333" }}
                  >
                    {isUk ? pkg.rangeUk : pkg.rangeEn}
                  </p>
                </div>
                <p
                  className="font-serif text-xl"
                  style={{ color: pkg.highlighted ? "#F8F5F0" : "#2C1810" }}
                >
                  {isUk ? pkg.priceUk : pkg.priceEn}
                </p>
                <ul className="flex flex-col gap-2">
                  {(isUk ? pkg.featuresUk : pkg.featuresEn).map((f) => (
                    <li
                      key={f}
                      className="font-sans text-sm flex items-start gap-2"
                      style={{ color: pkg.highlighted ? "#C8B99A" : "#6B5344" }}
                    >
                      <span style={{ color: "#B87333" }}>—</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className="mt-auto font-sans text-xs tracking-widest uppercase px-6 py-3 border transition-opacity hover:opacity-70"
                  style={{
                    borderColor: pkg.highlighted ? "#B87333" : "#2C1810",
                    color: pkg.highlighted ? "#B87333" : "#2C1810",
                  }}
                >
                  {isUk ? "Отримати цінову пропозицію" : "Get a Custom Quote"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT MASTER ── */}
      <section className="py-24" style={{ backgroundColor: "#F8F5F0" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div
              className="aspect-[4/5] flex flex-col items-center justify-end p-10"
              style={{ backgroundColor: "#3D2314" }}
            >
              <span className="text-7xl mb-6">🧵</span>
              <p
                className="font-sans text-xs tracking-widest uppercase text-center"
                style={{ color: "#B87333" }}
              >
                {isUk ? "Майстер · Засновник" : "Master Tailor · Founder"}
              </p>
              <p className="font-serif text-2xl text-center mt-2" style={{ color: "#F8F5F0" }}>
                {isUk ? "Роман Ковальчук" : "Roman Kovalchuk"}
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <p
                className="font-sans text-xs tracking-[0.3em] uppercase"
                style={{ color: "#B87333" }}
              >
                {isUk ? "Про майстра" : "About the Master"}
              </p>
              <h2 className="text-3xl md:text-4xl font-serif" style={{ color: "#2C1810" }}>
                {isUk ? "15 років. Мілан. Кохання до ремесла." : "15 Years. Milan. A Love of Craft."}
              </h2>
              <p className="font-sans text-sm leading-relaxed" style={{ color: "#6B5344" }}>
                {isUk
                  ? "Роман Ковальчук розпочав свій шлях у Львові, де навчився основам кравецтва у свого батька. Подальше навчання у Міланській академії моди відкрило йому мову європейського крою. Понад 15 років досвіду, сотні виробів і незмінне переконання: одяг повинен бути другою шкірою."
                  : "Roman Kovalchuk began his journey in Lviv, learning the fundamentals of tailoring from his father. Further training at Milan's fashion academy opened his eyes to the language of European cutting. Over 15 years of experience, hundreds of garments, and an unwavering belief: clothing should be a second skin."}
              </p>
              <blockquote
                className="font-serif text-lg italic border-l-2 pl-6"
                style={{ borderColor: "#B87333", color: "#3D2314" }}
              >
                {isUk
                  ? "«Я не просто шию — я слухаю людину і перекладаю її на мову тканини.»"
                  : "\"I don't just sew — I listen to a person and translate them into the language of fabric.\""}
              </blockquote>
              <div className="flex flex-wrap gap-6 pt-2">
                {[
                  { numEn: "15+", labelEn: "Years Experience", labelUk: "Років досвіду" },
                  { numEn: "800+", labelEn: "Garments Made", labelUk: "Виробів зшито" },
                  { numEn: "3", labelEn: "Awards", labelUk: "Нагороди" },
                ].map((stat) => (
                  <div key={stat.numEn}>
                    <p className="font-serif text-2xl" style={{ color: "#B87333" }}>{stat.numEn}</p>
                    <p className="font-sans text-xs tracking-wider uppercase" style={{ color: "#6B5344" }}>
                      {isUk ? stat.labelUk : stat.labelEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOOKING FORM ── */}
      <section className="py-24" style={{ backgroundColor: "#3D2314" }}>
        <div className="max-w-3xl mx-auto px-6">
          <p
            className="font-sans text-xs tracking-[0.3em] uppercase mb-4"
            style={{ color: "#B87333" }}
          >
            {isUk ? "Запис" : "Book a Fitting"}
          </p>
          <h2 className="text-3xl md:text-4xl font-serif mb-12" style={{ color: "#F8F5F0" }}>
            {isUk ? "Записатись на консультацію" : "Schedule a Consultation"}
          </h2>
          {submitted ? (
            <div className="text-center py-16 flex flex-col items-center gap-6">
              <span className="text-5xl">✉️</span>
              <h3 className="font-serif text-2xl" style={{ color: "#F8F5F0" }}>
                {isUk ? "Дякуємо!" : "Thank You!"}
              </h3>
              <p className="font-sans text-sm" style={{ color: "#C8B99A" }}>
                {isUk
                  ? "Ми зв'яжемось з вами протягом 24 годин для підтвердження зустрічі."
                  : "We will contact you within 24 hours to confirm your appointment."}
              </p>
              <button
                className="font-sans text-xs tracking-widest uppercase px-6 py-3 border transition-opacity hover:opacity-70 mt-2"
                style={{ borderColor: "#B87333", color: "#B87333" }}
                onClick={() => { setSubmitted(false); setForm({ service: "", occasion: "", fabric: "", date: "", name: "", phone: "" }); }}
              >
                {isUk ? "Нова заявка" : "New Request"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-xs tracking-widest uppercase" style={{ color: "#C8B99A" }}>
                    {isUk ? "Тип послуги" : "Service Type"}
                  </label>
                  <select
                    value={form.service}
                    onChange={(e) => handleFormChange("service", e.target.value)}
                    required
                    className="font-sans text-sm px-4 py-3 border-0 border-b outline-none bg-transparent"
                    style={{ borderColor: "#6B5344", color: "#F8F5F0" }}
                  >
                    <option value="" style={{ color: "#2C1810" }}>—</option>
                    {(isUk ? SERVICE_OPTIONS_UK : SERVICE_OPTIONS_EN).map((o) => (
                      <option key={o} value={o} style={{ color: "#2C1810" }}>{o}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-xs tracking-widest uppercase" style={{ color: "#C8B99A" }}>
                    {isUk ? "Привід" : "Occasion"}
                  </label>
                  <select
                    value={form.occasion}
                    onChange={(e) => handleFormChange("occasion", e.target.value)}
                    required
                    className="font-sans text-sm px-4 py-3 border-0 border-b outline-none bg-transparent"
                    style={{ borderColor: "#6B5344", color: "#F8F5F0" }}
                  >
                    <option value="" style={{ color: "#2C1810" }}>—</option>
                    {(isUk ? OCCASION_OPTIONS_UK : OCCASION_OPTIONS_EN).map((o) => (
                      <option key={o} value={o} style={{ color: "#2C1810" }}>{o}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-xs tracking-widest uppercase" style={{ color: "#C8B99A" }}>
                    {isUk ? "Перевага тканини" : "Fabric Preference"}
                  </label>
                  <select
                    value={form.fabric}
                    onChange={(e) => handleFormChange("fabric", e.target.value)}
                    className="font-sans text-sm px-4 py-3 border-0 border-b outline-none bg-transparent"
                    style={{ borderColor: "#6B5344", color: "#F8F5F0" }}
                  >
                    <option value="" style={{ color: "#2C1810" }}>—</option>
                    {(isUk ? FABRIC_PREF_UK : FABRIC_PREF_EN).map((o) => (
                      <option key={o} value={o} style={{ color: "#2C1810" }}>{o}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-xs tracking-widest uppercase" style={{ color: "#C8B99A" }}>
                    {isUk ? "Бажана дата" : "Preferred Date"}
                  </label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => handleFormChange("date", e.target.value)}
                    required
                    className="font-sans text-sm px-4 py-3 border-0 border-b outline-none bg-transparent"
                    style={{ borderColor: "#6B5344", color: "#F8F5F0" }}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-xs tracking-widest uppercase" style={{ color: "#C8B99A" }}>
                    {isUk ? "Ваше ім'я" : "Your Name"}
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => handleFormChange("name", e.target.value)}
                    required
                    placeholder={isUk ? "Ім'я та прізвище" : "Full name"}
                    className="font-sans text-sm px-4 py-3 border-0 border-b outline-none bg-transparent placeholder-opacity-40"
                    style={{ borderColor: "#6B5344", color: "#F8F5F0" }}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-xs tracking-widest uppercase" style={{ color: "#C8B99A" }}>
                    {isUk ? "Телефон" : "Phone"}
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => handleFormChange("phone", e.target.value)}
                    required
                    placeholder="+380 __ ___ ____"
                    className="font-sans text-sm px-4 py-3 border-0 border-b outline-none bg-transparent"
                    style={{ borderColor: "#6B5344", color: "#F8F5F0" }}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-4 font-sans text-xs tracking-widest uppercase px-8 py-4 transition-opacity hover:opacity-80 self-start"
                style={{ backgroundColor: "#B87333", color: "#FAFAF8" }}
              >
                {isUk ? "Надіслати заявку" : "Request Appointment"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="py-16"
        style={{ backgroundColor: "#2C1810" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span>✂️</span>
                <span
                  className="font-sans text-xs tracking-[0.25em] uppercase"
                  style={{ color: "#F8F5F0" }}
                >
                  ATELIER MODA
                </span>
              </div>
              <p className="font-sans text-xs leading-relaxed" style={{ color: "#9C8870" }}>
                {isUk
                  ? "Індивідуальний пошив у Львові. Кожен виріб — унікальний."
                  : "Bespoke tailoring in Lviv. Every garment unique."}
              </p>
              <p
                className="font-serif text-xs italic"
                style={{ color: "#B87333" }}
              >
                {isUk ? "Зшито з турботою" : "Handcrafted with care"}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <p
                className="font-sans text-xs tracking-widest uppercase mb-2"
                style={{ color: "#B87333" }}
              >
                {isUk ? "Адреса" : "Location"}
              </p>
              <p className="font-sans text-xs leading-relaxed" style={{ color: "#9C8870" }}>
                📍 {isUk ? "вул. Шевченка, 14, Львів, 79000" : "14 Shevchenka St, Lviv, 79000"}
              </p>
              <p className="font-sans text-xs" style={{ color: "#9C8870" }}>
                📞 +38 (067) 123 45 67
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <p
                className="font-sans text-xs tracking-widest uppercase mb-2"
                style={{ color: "#B87333" }}
              >
                {isUk ? "Години роботи" : "Hours"}
              </p>
              <p className="font-sans text-xs" style={{ color: "#9C8870" }}>
                🗓 {isUk ? "Пн–Сб · за записом" : "Mon–Sat · By Appointment"}
              </p>
              <p className="font-sans text-xs" style={{ color: "#9C8870" }}>
                {isUk ? "Нд · вихідний" : "Sun · Closed"}
              </p>
              <p className="font-sans text-xs mt-2" style={{ color: "#9C8870" }}>
                {isUk ? "Перша консультація — безкоштовно" : "First consultation complimentary"}
              </p>
            </div>
          </div>
          <div
            className="pt-8 border-t flex flex-wrap items-center justify-between gap-4"
            style={{ borderColor: "#3D2314" }}
          >
            <p className="font-sans text-xs" style={{ color: "#6B5344" }}>
              © 2010–2026 Atelier Moda.{" "}
              {isUk ? "Всі права захищені." : "All rights reserved."}
            </p>
            <p className="font-sans text-xs" style={{ color: "#6B5344" }}>
              {isUk ? "Кравецтво — це мистецтво." : "Tailoring is an art."}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
