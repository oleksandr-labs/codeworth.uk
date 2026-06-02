"use client";

import { useState } from "react";
import {
  ChefHat,
  Ruler,
  Palette,
  Package,
  Star,
  Phone,
  ArrowRight,
  Check,
  Layers,
  Truck,
  Wrench,
  MessageSquare,
  Clock,
  Gem,
  Crown,
  Sparkles,
} from "lucide-react";

/* ─── kitchen style gallery ─── */
const KITCHEN_STYLES = [
  {
    key: "modern",
    nameEn: "Modern",
    nameUk: "Модерн",
    bg: "#2A2A2A",
    accent: "#D4A853",
    descEn: "Handleless fronts, integrated appliances, sleek surfaces. For those who value precision and clean geometry.",
    descUk: "Безручкові фасади, вбудована техніка, гладкі поверхні. Для тих, хто цінує точність і чисту геометрію.",
    features: ["handleless", "matte", "LED"],
  },
  {
    key: "classic",
    nameEn: "Classic",
    nameUk: "Класика",
    bg: "#3A3228",
    accent: "#C9A96E",
    descEn: "Framed facades, natural stone countertops, brass hardware. Timeless elegance with artisan details.",
    descUk: "Рамкові фасади, стільниці з натурального каменю, латунна фурнітура. Позачасова елегантність з майстерними деталями.",
    features: ["framed", "stone", "brass"],
  },
  {
    key: "loft",
    nameEn: "Loft",
    nameUk: "Лофт",
    bg: "#33302C",
    accent: "#B87333",
    descEn: "Exposed textures, open shelving, metal accents. Raw urban character with industrial warmth.",
    descUk: "Відкриті текстури, відкриті полиці, металеві акценти. Необроблений урбаністичний характер з індустріальним теплом.",
    features: ["metal", "open", "concrete"],
  },
  {
    key: "minimalist",
    nameEn: "Minimalist",
    nameUk: "Мінімалізм",
    bg: "#2D2D2D",
    accent: "#A8996E",
    descEn: "Monochrome palette, hidden storage, zero visual noise. Maximum space, minimum distraction.",
    descUk: "Монохромна палітра, приховані сховища, нульовий візуальний шум. Максимум простору, мінімум відволікання.",
    features: ["hidden", "mono", "flush"],
  },
];

/* ─── configurator options ─── */
const MATERIALS = [
  { key: "mdf-matt", en: "MDF Matte", uk: "МДФ матовий", color: "#4A4A4A" },
  { key: "mdf-gloss", en: "MDF Gloss", uk: "МДФ глянець", color: "#6B6B6B" },
  { key: "solid-oak", en: "Solid Oak", uk: "Масив дуба", color: "#A0785A" },
  { key: "fenix", en: "Fenix NTM", uk: "Fenix NTM", color: "#3A3A3A" },
];

const FACADE_COLORS = [
  { key: "charcoal", en: "Charcoal", uk: "Антрацит", hex: "#333333" },
  { key: "ivory", en: "Ivory", uk: "Слонова кістка", hex: "#F5F0E8" },
  { key: "sage", en: "Sage Green", uk: "Оливковий", hex: "#8A9A7B" },
  { key: "navy", en: "Navy Blue", uk: "Темно-синій", hex: "#2C3E5A" },
  { key: "walnut", en: "Walnut", uk: "Горіх", hex: "#5C3D2E" },
  { key: "white", en: "Snow White", uk: "Білосніжний", hex: "#FAFAFA" },
];

const COUNTERTOPS = [
  { key: "quartz-white", en: "White Quartz", uk: "Білий кварц", hex: "#E8E4DE", priceAdd: 0 },
  { key: "quartz-dark", en: "Dark Quartz", uk: "Темний кварц", hex: "#3A3632", priceAdd: 2500 },
  { key: "granite", en: "Black Granite", uk: "Чорний граніт", hex: "#1A1A1A", priceAdd: 4800 },
  { key: "marble", en: "Carrara Marble", uk: "Каррарський мармур", hex: "#E0D8CE", priceAdd: 8200 },
  { key: "oak-solid", en: "Solid Oak", uk: "Масив дуба", hex: "#B8945A", priceAdd: 3200 },
];

/* ─── pricing tiers ─── */
const PRICING_TIERS = [
  {
    key: "standard",
    nameEn: "Standard",
    nameUk: "Стандарт",
    priceEn: "from $4,200",
    priceUk: "від 170 000 грн",
    descEn: "Quality kitchen with proven materials",
    descUk: "Якісна кухня з перевіреними матеріалами",
    features: [
      { en: "MDF matte facades", uk: "Фасади МДФ матові" },
      { en: "Quartz countertop", uk: "Стільниця з кварцу" },
      { en: "Blum hinges", uk: "Петлі Blum" },
      { en: "Standard LED lighting", uk: "Стандартне LED-освітлення" },
      { en: "2-year warranty", uk: "Гарантія 2 роки" },
      { en: "Free delivery in Kyiv", uk: "Безкоштовна доставка по Києву" },
    ],
  },
  {
    key: "premium",
    nameEn: "Premium",
    nameUk: "Преміум",
    priceEn: "from $7,800",
    priceUk: "від 320 000 грн",
    descEn: "Elevated design with premium hardware",
    descUk: "Вишуканий дизайн з преміальною фурнітурою",
    features: [
      { en: "Fenix NTM or solid wood facades", uk: "Фасади Fenix NTM або масив" },
      { en: "Natural stone countertop", uk: "Стільниця з натурального каменю" },
      { en: "Blum Legrabox drawers", uk: "Ящики Blum Legrabox" },
      { en: "Integrated LED system", uk: "Інтегрована LED-система" },
      { en: "5-year warranty", uk: "Гарантія 5 років" },
      { en: "3D project visualization", uk: "3D-візуалізація проєкту" },
      { en: "Personal designer", uk: "Персональний дизайнер" },
    ],
  },
  {
    key: "luxury",
    nameEn: "Luxury",
    nameUk: "Люкс",
    priceEn: "from $14,500",
    priceUk: "від 590 000 грн",
    descEn: "Bespoke kitchen, fully custom",
    descUk: "Індивідуальна кухня, повністю на замовлення",
    features: [
      { en: "Any material combination", uk: "Будь-яка комбінація матеріалів" },
      { en: "Marble or exotic stone top", uk: "Мармур або екзотичний камінь" },
      { en: "Fully concealed push-open", uk: "Повністю прихований push-open" },
      { en: "Smart home integration", uk: "Інтеграція Smart Home" },
      { en: "Lifetime warranty on body", uk: "Довічна гарантія на корпус" },
      { en: "Architect supervision", uk: "Авторський нагляд архітектора" },
      { en: "VIP after-service", uk: "VIP післяпродажне обслуговування" },
      { en: "Priority production", uk: "Пріоритетне виробництво" },
    ],
  },
];

/* ─── process steps ─── */
const PROCESS_STEPS = [
  {
    key: "consult",
    en: "Consultation",
    uk: "Консультація",
    descEn: "We visit your space, discuss your style, take measurements, and define the project scope together.",
    descUk: "Ми відвідуємо ваш простір, обговорюємо стиль, знімаємо заміри та разом визначаємо обсяг проєкту.",
    days: "1-2",
  },
  {
    key: "design",
    en: "Design & 3D",
    uk: "Дизайн та 3D",
    descEn: "Our designer creates a detailed 3D model. You approve every detail before production begins.",
    descUk: "Наш дизайнер створює детальну 3D-модель. Ви затверджуєте кожну деталь до початку виробництва.",
    days: "5-7",
  },
  {
    key: "production",
    en: "Production",
    uk: "Виробництво",
    descEn: "Precision manufacturing at our Kyiv facility using CNC machinery and hand-finishing techniques.",
    descUk: "Точне виробництво на нашому підприємстві у Києві з використанням ЧПК та ручного фінішування.",
    days: "21-30",
  },
  {
    key: "delivery",
    en: "Delivery",
    uk: "Доставка",
    descEn: "Careful packaging and delivery to your address. We handle logistics from factory to your doorstep.",
    descUk: "Ретельне пакування та доставка на вашу адресу. Ми беремо логістику від фабрики до вашого порогу.",
    days: "1-3",
  },
  {
    key: "install",
    en: "Installation",
    uk: "Монтаж",
    descEn: "Professional team installs your kitchen, connects appliances, and ensures everything works perfectly.",
    descUk: "Професійна бригада монтує кухню, підключає техніку та переконується, що все працює бездоганно.",
    days: "2-4",
  },
];

/* ─── testimonials ─── */
const TESTIMONIALS = [
  {
    nameEn: "Iryna & Oleksandr",
    nameUk: "Ірина та Олександр",
    locationEn: "Pechersk, Kyiv",
    locationUk: "Печерськ, Київ",
    rating: 5,
    textEn: "We dreamed of a white minimalist kitchen for years. KitchenLab delivered exactly that — from the first meeting to the final screw, everything was flawless. The push-open drawers still amaze our guests.",
    textUk: "Ми мріяли про білу мінімалістичну кухню роками. KitchenLab реалізували саме це — від першої зустрічі до останнього гвинтика все було бездоганно. Push-open ящики досі вражають наших гостей.",
    tierEn: "Luxury tier",
    tierUk: "Пакет Люкс",
  },
  {
    nameEn: "Dmytro K.",
    nameUk: "Дмитро К.",
    locationEn: "Obolon, Kyiv",
    locationUk: "Оболонь, Київ",
    rating: 5,
    textEn: "The loft-style kitchen they built for my open-plan apartment is the centerpiece of every gathering. The combination of concrete-look facades with brass accents is stunning. Completed in just 5 weeks.",
    textUk: "Кухня в стилі лофт, яку вони зробили для моєї квартири-студії, стала центром кожної вечірки. Поєднання фасадів під бетон з латунними акцентами — вражаюче. Виконали за 5 тижнів.",
    tierEn: "Premium tier",
    tierUk: "Пакет Преміум",
  },
  {
    nameEn: "Natalia S.",
    nameUk: "Наталія С.",
    locationEn: "Pozniaky, Kyiv",
    locationUk: "Позняки, Київ",
    rating: 5,
    textEn: "Best value for a standard package I've seen in Kyiv. The MDF quality is excellent, Blum hardware works smoothly, and the quartz countertop looks premium. Would recommend to anyone renovating.",
    textUk: "Найкраще співвідношення ціна-якість серед стандартних пакетів у Києві. Якість МДФ відмінна, фурнітура Blum працює плавно, а стільниця з кварцу виглядає преміально. Рекомендую всім, хто робить ремонт.",
    tierEn: "Standard tier",
    tierUk: "Пакет Стандарт",
  },
];

/* ────────────────────────────────────── */
export function KitchenLabDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  /* configurator state */
  const [configStep, setConfigStep] = useState(0);
  const [selectedMaterial, setSelectedMaterial] = useState(MATERIALS[0].key);
  const [selectedColor, setSelectedColor] = useState(FACADE_COLORS[0].key);
  const [selectedCountertop, setSelectedCountertop] = useState(COUNTERTOPS[0].key);

  /* gallery state */
  const [activeStyle, setActiveStyle] = useState("modern");

  /* booking form state */
  const [bookingName, setBookingName] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingMessage, setBookingMessage] = useState("");
  const [bookingTier, setBookingTier] = useState("premium");
  const [bookingSent, setBookingSent] = useState(false);

  const t = (en: string, uk: string) => (isUk ? uk : en);

  const configSteps = [
    { en: "Material", uk: "Матеріал" },
    { en: "Facade Color", uk: "Колір фасаду" },
    { en: "Countertop", uk: "Стільниця" },
  ];

  const currentStyle = KITCHEN_STYLES.find((s) => s.key === activeStyle)!;
  const currentCountertop = COUNTERTOPS.find((c) => c.key === selectedCountertop)!;
  const currentMaterial = MATERIALS.find((m) => m.key === selectedMaterial)!;
  const currentFacadeColor = FACADE_COLORS.find((c) => c.key === selectedColor)!;

  const tierIcons: Record<string, React.ReactNode> = {
    standard: <Package className="w-5 h-5" />,
    premium: <Gem className="w-5 h-5" />,
    luxury: <Crown className="w-5 h-5" />,
  };

  const processIcons = [
    <MessageSquare key="c" className="w-5 h-5" />,
    <Ruler key="d" className="w-5 h-5" />,
    <Wrench key="p" className="w-5 h-5" />,
    <Truck key="t" className="w-5 h-5" />,
    <Layers key="i" className="w-5 h-5" />,
  ];

  /* ─── placeholder helper ─── */
  const PhotoPlaceholder = ({ h = "h-48", label }: { h?: string; label?: string }) => (
    <div
      className={`${h} w-full rounded-xl flex items-center justify-center text-xs font-medium tracking-wide bg-gradient-to-br from-[#2A2A2A] via-[#333] to-[#1A1A1A] text-[#D4A853]/70`}
    >
      {label ?? t("Kitchen interior photo", "Фото інтер'єру кухні")}
    </div>
  );

  return (
    <div className="min-h-screen font-sans bg-[#1C1C1C] text-[#E8E4DE]">
      {/* ══════════════════════════════
          1. HEADER
      ══════════════════════════════ */}
      <header className="bg-[#1C1C1C]/95 backdrop-blur-sm border-b border-[#D4A853]/20 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ChefHat className="w-6 h-6 text-[#D4A853]" />
            <span className="text-xl font-semibold tracking-tight text-white">
              KitchenLab
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-[#A0A0A0]">
            <span className="hover:text-[#D4A853] transition-colors cursor-pointer">
              {t("Styles", "Стилі")}
            </span>
            <span className="hover:text-[#D4A853] transition-colors cursor-pointer">
              {t("Configurator", "Конфігуратор")}
            </span>
            <span className="hover:text-[#D4A853] transition-colors cursor-pointer">
              {t("Pricing", "Ціни")}
            </span>
            <span className="hover:text-[#D4A853] transition-colors cursor-pointer">
              {t("Reviews", "Відгуки")}
            </span>
          </nav>
          <button className="flex items-center gap-2 bg-[#D4A853] text-[#1C1C1C] text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#E4B863] transition-colors">
            <Phone className="w-4 h-4" />
            {t("Book a Visit", "Записатися")}
          </button>
        </div>
      </header>

      {/* ══════════════════════════════
          2. HERO
      ══════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-4 pt-16 pb-12">
        <div className="relative rounded-2xl overflow-hidden">
          <PhotoPlaceholder
            h="h-[420px]"
            label={t("Luxury kitchen showroom panorama", "Панорама шоуруму дизайнерських кухонь")}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C] via-[#1C1C1C]/40 to-transparent flex flex-col justify-end p-8 md:p-12">
            <div className="inline-flex items-center gap-2 text-[#D4A853] text-xs font-semibold uppercase tracking-widest mb-3">
              <Sparkles className="w-4 h-4" />
              {t("Custom Kitchen Studio", "Студія дизайнерських кухонь")}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-3">
              {t("Kitchens That Define", "Кухні, що визначають")}
              <br />
              {t("Your Lifestyle", "Ваш стиль життя")}
            </h1>
            <p className="text-[#A0A0A0] text-base md:text-lg max-w-xl mb-8">
              {t(
                "Bespoke kitchen design, premium materials, European craftsmanship. From concept to installation in Kyiv.",
                "Індивідуальний дизайн кухонь, преміальні матеріали, європейська майстерність. Від концепції до монтажу у Києві."
              )}
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-[#D4A853]">
                <Check className="w-4 h-4" /> {t("Free 3D Design", "Безкоштовний 3D-дизайн")}
              </div>
              <div className="flex items-center gap-2 text-sm text-[#D4A853]">
                <Check className="w-4 h-4" /> {t("Own Production", "Власне виробництво")}
              </div>
              <div className="flex items-center gap-2 text-sm text-[#D4A853]">
                <Check className="w-4 h-4" /> {t("5-week Lead Time", "Терміни від 5 тижнів")}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          3. KITCHEN STYLES GALLERY
      ══════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            {t("Kitchen Styles", "Стилі кухонь")}
          </h2>
          <p className="text-[#A0A0A0] text-sm">
            {t("Explore our signature collections", "Ознайомтесь з нашими колекціями")}
          </p>
        </div>

        {/* Style tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {KITCHEN_STYLES.map((style) => (
            <button
              key={style.key}
              onClick={() => setActiveStyle(style.key)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeStyle === style.key
                  ? "bg-[#D4A853] text-[#1C1C1C]"
                  : "bg-[#2A2A2A] text-[#A0A0A0] hover:text-white border border-[#3A3A3A]"
              }`}
            >
              {t(style.nameEn, style.nameUk)}
            </button>
          ))}
        </div>

        {/* Active style showcase */}
        <div className="grid md:grid-cols-2 gap-6 rounded-2xl overflow-hidden bg-[#222] border border-[#333] p-6">
          <div>
            <PhotoPlaceholder
              h="h-72"
              label={t(`${currentStyle.nameEn} kitchen interior`, `Інтер'єр кухні ${currentStyle.nameUk}`)}
            />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-xl font-bold text-white mb-3">
              {t(currentStyle.nameEn, currentStyle.nameUk)}
            </h3>
            <p className="text-[#A0A0A0] text-sm leading-relaxed mb-5">
              {t(currentStyle.descEn, currentStyle.descUk)}
            </p>
            <div className="flex flex-wrap gap-2 mb-5">
              {currentStyle.features.map((f) => (
                <span
                  key={f}
                  className="bg-[#2A2A2A] border border-[#D4A853]/30 text-[#D4A853] text-xs px-3 py-1 rounded-full"
                >
                  {f}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <div
                className="w-10 h-10 rounded-lg border border-[#444]"
                style={{ backgroundColor: currentStyle.bg }}
                title={t("Base tone", "Базовий тон")}
              />
              <div
                className="w-10 h-10 rounded-lg border border-[#444]"
                style={{ backgroundColor: currentStyle.accent }}
                title={t("Accent", "Акцент")}
              />
            </div>
          </div>
        </div>

        {/* Style thumbnails grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {KITCHEN_STYLES.map((style) => (
            <button
              key={style.key}
              onClick={() => setActiveStyle(style.key)}
              className={`rounded-xl overflow-hidden border transition-all ${
                activeStyle === style.key
                  ? "border-[#D4A853] ring-1 ring-[#D4A853]/50"
                  : "border-[#333] hover:border-[#555]"
              }`}
            >
              <div
                className="h-24 flex items-center justify-center text-xs font-medium tracking-wide"
                style={{ backgroundColor: style.bg, color: style.accent }}
              >
                {t(style.nameEn, style.nameUk)}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════
          4. 3D CONFIGURATOR
      ══════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            <Palette className="w-6 h-6 inline-block mr-2 text-[#D4A853]" />
            {t("3D Kitchen Configurator", "3D-конфігуратор кухні")}
          </h2>
          <p className="text-[#A0A0A0] text-sm">
            {t(
              "Build your dream kitchen step by step",
              "Створіть кухню мрії крок за кроком"
            )}
          </p>
        </div>

        <div className="bg-[#222] border border-[#333] rounded-2xl overflow-hidden">
          {/* Step indicators */}
          <div className="flex border-b border-[#333]">
            {configSteps.map((step, i) => (
              <button
                key={i}
                onClick={() => setConfigStep(i)}
                className={`flex-1 py-4 text-sm font-medium text-center transition-all relative ${
                  configStep === i
                    ? "text-[#D4A853] bg-[#2A2A2A]"
                    : i < configStep
                      ? "text-[#7A7A7A]"
                      : "text-[#5A5A5A]"
                }`}
              >
                <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs mr-2 ${
                  i < configStep
                    ? "bg-[#D4A853] text-[#1C1C1C]"
                    : configStep === i
                      ? "bg-[#D4A853]/20 text-[#D4A853] border border-[#D4A853]"
                      : "bg-[#333] text-[#666]"
                }`}>
                  {i < configStep ? <Check className="w-3 h-3" /> : i + 1}
                </span>
                {t(step.en, step.uk)}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2">
            {/* Preview */}
            <div className="p-6 flex flex-col items-center justify-center border-r border-[#333]">
              <div className="w-full h-64 rounded-xl bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] flex flex-col items-center justify-center gap-4 border border-[#333]">
                <Ruler className="w-8 h-8 text-[#D4A853]/50" />
                <p className="text-xs text-[#666] text-center px-4">
                  {t("3D preview will render here", "3D-попередній перегляд відображатиметься тут")}
                </p>
                {/* Material swatches */}
                <div className="flex gap-3 mt-2">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-8 h-8 rounded-lg border border-[#555]" style={{ backgroundColor: currentMaterial.color }} />
                    <span className="text-[10px] text-[#666]">{t("Facade", "Фасад")}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-8 h-8 rounded-lg border border-[#555]" style={{ backgroundColor: currentFacadeColor.hex }} />
                    <span className="text-[10px] text-[#666]">{t("Color", "Колір")}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-8 h-8 rounded-lg border border-[#555]" style={{ backgroundColor: currentCountertop.hex }} />
                    <span className="text-[10px] text-[#666]">{t("Top", "Стільниця")}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step content */}
            <div className="p-6">
              {/* Step 0: Material */}
              {configStep === 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {t("Choose Facade Material", "Оберіть матеріал фасаду")}
                  </h3>
                  <p className="text-xs text-[#888] mb-5">
                    {t("This determines durability and feel", "Від цього залежить довговічність та тактильність")}
                  </p>
                  <div className="space-y-3">
                    {MATERIALS.map((mat) => (
                      <button
                        key={mat.key}
                        onClick={() => setSelectedMaterial(mat.key)}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
                          selectedMaterial === mat.key
                            ? "border-[#D4A853] bg-[#D4A853]/10"
                            : "border-[#333] hover:border-[#555]"
                        }`}
                      >
                        <div className="w-10 h-10 rounded-lg border border-[#555] shrink-0" style={{ backgroundColor: mat.color }} />
                        <span className="text-sm font-medium text-white">{t(mat.en, mat.uk)}</span>
                        {selectedMaterial === mat.key && <Check className="w-4 h-4 text-[#D4A853] ml-auto" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 1: Color */}
              {configStep === 1 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {t("Choose Facade Color", "Оберіть колір фасаду")}
                  </h3>
                  <p className="text-xs text-[#888] mb-5">
                    {t("Sets the mood for your entire kitchen", "Визначає настрій всієї кухні")}
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    {FACADE_COLORS.map((clr) => (
                      <button
                        key={clr.key}
                        onClick={() => setSelectedColor(clr.key)}
                        className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
                          selectedColor === clr.key
                            ? "border-[#D4A853] bg-[#D4A853]/10"
                            : "border-[#333] hover:border-[#555]"
                        }`}
                      >
                        <div
                          className="w-12 h-12 rounded-lg border border-[#555]"
                          style={{ backgroundColor: clr.hex }}
                        />
                        <span className="text-xs text-[#A0A0A0]">{t(clr.en, clr.uk)}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Countertop */}
              {configStep === 2 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {t("Choose Countertop", "Оберіть стільницю")}
                  </h3>
                  <p className="text-xs text-[#888] mb-5">
                    {t("The surface you'll touch every day", "Поверхня, якої ви торкатиметесь щодня")}
                  </p>
                  <div className="space-y-3">
                    {COUNTERTOPS.map((ct) => (
                      <button
                        key={ct.key}
                        onClick={() => setSelectedCountertop(ct.key)}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
                          selectedCountertop === ct.key
                            ? "border-[#D4A853] bg-[#D4A853]/10"
                            : "border-[#333] hover:border-[#555]"
                        }`}
                      >
                        <div className="w-10 h-10 rounded-lg border border-[#555] shrink-0" style={{ backgroundColor: ct.hex }} />
                        <div className="flex-1">
                          <span className="text-sm font-medium text-white">{t(ct.en, ct.uk)}</span>
                          {ct.priceAdd > 0 && (
                            <span className="block text-xs text-[#D4A853]">
                              +{ct.priceAdd.toLocaleString()} {t("UAH/m", "грн/м")}
                            </span>
                          )}
                        </div>
                        {selectedCountertop === ct.key && <Check className="w-4 h-4 text-[#D4A853] ml-auto" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setConfigStep(Math.max(0, configStep - 1))}
                  className={`text-sm px-4 py-2 rounded-lg border border-[#444] text-[#A0A0A0] hover:text-white transition-colors ${
                    configStep === 0 ? "opacity-30 pointer-events-none" : ""
                  }`}
                >
                  {t("Back", "Назад")}
                </button>
                <button
                  onClick={() => setConfigStep(Math.min(2, configStep + 1))}
                  className="flex items-center gap-2 text-sm px-5 py-2 rounded-lg bg-[#D4A853] text-[#1C1C1C] font-medium hover:bg-[#E4B863] transition-colors"
                >
                  {configStep === 2 ? t("Get Quote", "Отримати пропозицію") : t("Next", "Далі")}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Summary bar */}
          <div className="border-t border-[#333] px-6 py-4 flex flex-wrap items-center gap-4 text-xs text-[#888] bg-[#1E1E1E]">
            <span>
              <span className="text-[#D4A853]">{t("Material", "Матеріал")}:</span>{" "}
              {t(currentMaterial.en, currentMaterial.uk)}
            </span>
            <span className="text-[#333]">|</span>
            <span>
              <span className="text-[#D4A853]">{t("Color", "Колір")}:</span>{" "}
              {t(currentFacadeColor.en, currentFacadeColor.uk)}
            </span>
            <span className="text-[#333]">|</span>
            <span>
              <span className="text-[#D4A853]">{t("Countertop", "Стільниця")}:</span>{" "}
              {t(currentCountertop.en, currentCountertop.uk)}
            </span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          5. PRICING TIERS
      ══════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            {t("Pricing", "Ціни")}
          </h2>
          <p className="text-[#A0A0A0] text-sm">
            {t("Transparent pricing for every budget", "Прозорі ціни для будь-якого бюджету")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PRICING_TIERS.map((tier) => {
            const isPopular = tier.key === "premium";
            return (
              <div
                key={tier.key}
                className={`rounded-2xl border p-6 flex flex-col transition-all ${
                  isPopular
                    ? "border-[#D4A853] bg-[#D4A853]/5 ring-1 ring-[#D4A853]/30 scale-[1.02]"
                    : "border-[#333] bg-[#222]"
                }`}
              >
                {isPopular && (
                  <div className="text-[#D4A853] text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-1">
                    <Star className="w-3 h-3" /> {t("Most Popular", "Найпопулярніший")}
                  </div>
                )}
                <div className="flex items-center gap-2 mb-2 text-[#D4A853]">
                  {tierIcons[tier.key]}
                  <h3 className="text-lg font-bold text-white">{t(tier.nameEn, tier.nameUk)}</h3>
                </div>
                <p className="text-xs text-[#888] mb-4">{t(tier.descEn, tier.descUk)}</p>
                <div className="text-2xl font-bold text-white mb-5">
                  {t(tier.priceEn, tier.priceUk)}
                </div>
                <ul className="space-y-2.5 mb-6 flex-1">
                  {tier.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#C0C0C0]">
                      <Check className="w-4 h-4 text-[#D4A853] shrink-0 mt-0.5" />
                      {t(f.en, f.uk)}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    setBookingTier(tier.key);
                    setBookingSent(false);
                  }}
                  className={`w-full py-3 rounded-xl text-sm font-medium transition-colors ${
                    isPopular
                      ? "bg-[#D4A853] text-[#1C1C1C] hover:bg-[#E4B863]"
                      : "bg-[#333] text-white hover:bg-[#444]"
                  }`}
                >
                  {t("Request Quote", "Отримати пропозицію")}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════
          6. PROCESS / HOW WE WORK
      ══════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-white mb-2">
            {t("How We Work", "Як ми працюємо")}
          </h2>
          <p className="text-[#A0A0A0] text-sm">
            {t("Five clear steps from idea to your dream kitchen", "П'ять чітких кроків від ідеї до кухні мрії")}
          </p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4A853]/30 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {PROCESS_STEPS.map((step, i) => (
              <div key={step.key} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#222] border border-[#D4A853]/40 flex items-center justify-center text-[#D4A853] mb-4 relative z-10">
                  {processIcons[i]}
                </div>
                <h4 className="text-sm font-semibold text-white mb-1">
                  {t(step.en, step.uk)}
                </h4>
                <p className="text-xs text-[#888] leading-relaxed mb-2">
                  {t(step.descEn, step.descUk)}
                </p>
                <span className="inline-flex items-center gap-1 text-[10px] text-[#D4A853] bg-[#D4A853]/10 px-2 py-1 rounded-full">
                  <Clock className="w-3 h-3" />
                  {step.days} {t("days", "днів")}
                </span>
              </div>
            ))}
          </div>

          {/* Total timeline */}
          <div className="mt-8 text-center">
            <span className="text-sm text-[#A0A0A0]">
              {t("Total timeline:", "Загальний термін:")}{" "}
              <span className="text-[#D4A853] font-semibold">
                {t("30-46 days from consultation to ready kitchen", "30-46 днів від консультації до готової кухні")}
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          7. TESTIMONIALS
      ══════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            {t("Client Stories", "Історії клієнтів")}
          </h2>
          <p className="text-[#A0A0A0] text-sm">
            {t("What our clients say about their kitchens", "Що кажуть клієнти про свої кухні")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((rev, i) => (
            <div key={i} className="bg-[#222] border border-[#333] rounded-2xl p-6">
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: rev.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-[#D4A853] text-[#D4A853]" />
                ))}
              </div>
              <p className="text-sm text-[#C0C0C0] leading-relaxed mb-5 italic">
                &ldquo;{t(rev.textEn, rev.textUk)}&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-white">{t(rev.nameEn, rev.nameUk)}</div>
                  <div className="text-xs text-[#888]">{t(rev.locationEn, rev.locationUk)}</div>
                </div>
                <span className="text-[10px] bg-[#D4A853]/10 text-[#D4A853] px-2 py-1 rounded-full">
                  {t(rev.tierEn, rev.tierUk)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════
          8. CONTACT / BOOKING FORM
      ══════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-[#222] border border-[#333] rounded-2xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Info panel */}
            <div className="p-8 bg-gradient-to-br from-[#2A2A2A] to-[#1E1E1E] flex flex-col justify-center">
              <div className="flex items-center gap-2 text-[#D4A853] mb-4">
                <ChefHat className="w-6 h-6" />
                <span className="text-lg font-bold text-white">KitchenLab</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">
                {t("Book a Free Consultation", "Запишіться на безкоштовну консультацію")}
              </h2>
              <p className="text-sm text-[#A0A0A0] mb-6 leading-relaxed">
                {t(
                  "Visit our showroom or schedule a home visit. Our designer will help you define the style, materials, and budget for your perfect kitchen.",
                  "Відвідайте наш шоурум або замовте виїзний замір. Наш дизайнер допоможе визначити стиль, матеріали та бюджет для вашої ідеальної кухні."
                )}
              </p>
              <div className="space-y-3 text-sm text-[#C0C0C0]">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#D4A853]" />
                  +380 44 123 45 67
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#D4A853]" />
                  {t("Mon-Sat 10:00-19:00", "Пн-Сб 10:00-19:00")}
                </div>
                <div className="flex items-center gap-3">
                  <Layers className="w-4 h-4 text-[#D4A853]" />
                  {t("Showroom: 15 Mechnikova St, Kyiv", "Шоурум: вул. Мечникова 15, Київ")}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="p-8">
              {bookingSent ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-[#D4A853]/20 flex items-center justify-center mb-4">
                    <Check className="w-8 h-8 text-[#D4A853]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {t("Thank You!", "Дякуємо!")}
                  </h3>
                  <p className="text-sm text-[#A0A0A0]">
                    {t(
                      "We will contact you within 2 hours to schedule your consultation.",
                      "Ми зв'яжемося з вами протягом 2 годин для узгодження консультації."
                    )}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {t("Your Details", "Ваші дані")}
                  </h3>

                  {/* Name */}
                  <div>
                    <label className="block text-xs text-[#888] mb-1">{t("Name", "Ім'я")} *</label>
                    <input
                      type="text"
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      placeholder={t("Your full name", "Ваше повне ім'я")}
                      className="w-full bg-[#1C1C1C] border border-[#333] rounded-lg px-4 py-2.5 text-sm text-white placeholder-[#555] focus:border-[#D4A853] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs text-[#888] mb-1">{t("Phone", "Телефон")} *</label>
                    <input
                      type="tel"
                      value={bookingPhone}
                      onChange={(e) => setBookingPhone(e.target.value)}
                      placeholder="+380"
                      className="w-full bg-[#1C1C1C] border border-[#333] rounded-lg px-4 py-2.5 text-sm text-white placeholder-[#555] focus:border-[#D4A853] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Tier select */}
                  <div>
                    <label className="block text-xs text-[#888] mb-1">{t("Package", "Пакет")}</label>
                    <div className="flex gap-2">
                      {PRICING_TIERS.map((tier) => (
                        <button
                          key={tier.key}
                          onClick={() => setBookingTier(tier.key)}
                          className={`flex-1 py-2 text-xs rounded-lg border transition-all ${
                            bookingTier === tier.key
                              ? "border-[#D4A853] bg-[#D4A853]/10 text-[#D4A853]"
                              : "border-[#333] text-[#888] hover:border-[#555]"
                          }`}
                        >
                          {t(tier.nameEn, tier.nameUk)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs text-[#888] mb-1">{t("Message", "Повідомлення")}</label>
                    <textarea
                      value={bookingMessage}
                      onChange={(e) => setBookingMessage(e.target.value)}
                      rows={3}
                      placeholder={t(
                        "Tell us about your kitchen project...",
                        "Розкажіть про ваш проєкт кухні..."
                      )}
                      className="w-full bg-[#1C1C1C] border border-[#333] rounded-lg px-4 py-2.5 text-sm text-white placeholder-[#555] focus:border-[#D4A853] focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    onClick={() => {
                      if (bookingName.trim() && bookingPhone.trim()) {
                        setBookingSent(true);
                      }
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-[#D4A853] text-[#1C1C1C] font-medium py-3 rounded-xl hover:bg-[#E4B863] transition-colors"
                  >
                    {t("Book Consultation", "Записатися на консультацію")}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[10px] text-[#555] text-center">
                    {t(
                      "By submitting, you agree to our privacy policy. No spam, ever.",
                      "Надсилаючи, ви погоджуєтесь з політикою конфіденційності. Жодного спаму."
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          9. FOOTER
      ══════════════════════════════ */}
      <footer className="border-t border-[#333] mt-8">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[#888] text-sm">
            <ChefHat className="w-4 h-4 text-[#D4A853]" />
            <span>KitchenLab</span>
            <span className="text-[#444]">|</span>
            <span>{t("Custom Kitchen Studio, Kyiv", "Студія дизайнерських кухонь, Київ")}</span>
          </div>
          <p className="text-xs text-[#555]">
            {t(
              "This is a demo website created by Codeworth",
              "Це демо-сайт, створений Codeworth"
            )}
          </p>
        </div>
      </footer>
    </div>
  );
}
