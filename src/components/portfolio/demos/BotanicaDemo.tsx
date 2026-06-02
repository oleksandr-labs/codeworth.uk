"use client";

import { useState } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const FILTER_TABS = [
  { key: "all", en: "All", uk: "Всі" },
  { key: "weddings", en: "Weddings", uk: "Весілля" },
  { key: "corporate", en: "Corporate", uk: "Корпоративні" },
  { key: "interior", en: "Interior", uk: "Інтер'єр" },
  { key: "presentation", en: "Presentation", uk: "Презентація" },
  { key: "private", en: "Private", uk: "Приватні" },
];

const CASES = [
  {
    id: 1,
    nameEn: "Garden Wedding",
    nameUk: "Садове весілля",
    category: "weddings",
    tagEn: "Wedding · 200 guests",
    tagUk: "Весілля · 200 гостей",
    conceptEn: "Rose & eucalyptus theme — lush ceremony arch, table runners, floating candles.",
    conceptUk: "Тема троянди й евкаліпту — пишна арка, раннери на столах, плаваючі свічки.",
    storyEn: "The couple dreamed of a secret garden. We built a 5-metre floral arch from garden roses and eucalyptus, dressed 24 tables with cascading greenery, and scattered 600 white candles through the venue. The result: a living painting.",
    storyUk: "Пара мріяла про таємний сад. Ми збудували п'ятиметрову квіткову арку з садових троянд та евкаліпту, прикрасили 24 столи каскадною зеленню і розставили 600 білих свічок по всьому залу. Результат — живий живопис.",
    heightClass: "h-72",
    bg: "bg-stone-200",
  },
  {
    id: 2,
    nameEn: "Tech Summit 2024",
    nameUk: "Tech Summit 2024",
    category: "corporate",
    tagEn: "Corporate · Conference branding",
    tagUk: "Корпоратив · Брендинг конференції",
    conceptEn: "Conference center branded with structured white & green installations across 6 zones.",
    conceptUk: "Конференц-центр прикрашено структурованими біло-зеленими інсталяціями у 6 зонах.",
    storyEn: "The client needed floristry that matched a tech brand — clean, precise, modern. We created geometric moss panels, minimalist centrepieces and a signature green-wall backdrop for the main stage. Zero clutter, maximum impact.",
    storyUk: "Клієнту була потрібна флористика під стать технологічному бренду — чиста, точна, сучасна. Ми створили геометричні мохові панелі, мінімалістичні центрові композиції та фірмовий зелений фон для головної сцени.",
    heightClass: "h-56",
    bg: "bg-zinc-300",
  },
  {
    id: 3,
    nameEn: "Penthouse Lobby",
    nameUk: "Лобі пентхаусу",
    category: "interior",
    tagEn: "Interior · Monthly subscription",
    tagUk: "Інтер'єр · Місячна підписка",
    conceptEn: "Marble & white flower palette — weekly fresh arrangements in a premium residential lobby.",
    conceptUk: "Палітра мармуру й білих квітів — щотижневі свіжі композиції в преміум-лобі.",
    storyEn: "A luxury residential developer wanted the lobby to feel like a five-star hotel year-round. We designed a signature white-and-stone palette and deliver fresh sculptural arrangements every Monday. Now it is a landmark residents photograph.",
    storyUk: "Преміальний девелопер хотів, щоб лобі нагадувало п'ятизірковий готель цілий рік. Ми розробили фірмову білу палітру й доставляємо свіжі скульптурні композиції щопонеділка.",
    heightClass: "h-80",
    bg: "bg-neutral-200",
  },
  {
    id: 4,
    nameEn: "Product Launch ZARA",
    nameUk: "Презентація ZARA",
    category: "presentation",
    tagEn: "Presentation · Retail installation",
    tagUk: "Презентація · Рітейл-інсталяція",
    conceptEn: "Immersive floral tunnel and podium styling for a flagship retail launch event.",
    conceptUk: "Іммерсивний квітковий тунель і стилізація подіуму для запуску флагманського магазину.",
    storyEn: "ZARA needed floristry as fashion — not decoration. We suspended 2,000 stems overhead to create a floral canopy walk-through, paired with mirrored podiums and editorial arrangements. Press said it was unforgettable.",
    storyUk: "ZARA потребувала флористики як моди — не декору. Ми підвісили 2 000 стебел над головами, створивши квітковий навіс, доповнений дзеркальними подіумами та редакційними композиціями.",
    heightClass: "h-64",
    bg: "bg-stone-300",
  },
  {
    id: 5,
    nameEn: "Private Birthday",
    nameUk: "Приватний день народження",
    category: "private",
    tagEn: "Private · 30 guests · Boho-chic",
    tagUk: "Приватне · 30 гостей · Бохо-шик",
    conceptEn: "Boho-chic palette: pampas grass, dried florals, terracotta candles for 30 guests.",
    conceptUk: "Бохо-шик: памплсова трава, сухоцвіти, теракотові свічки для 30 гостей.",
    storyEn: "A 30th birthday where the guest of honour loves a desert-boho aesthetic. We layered pampas grass, dried protea, dried citrus and terracotta pillar candles on low wooden tables. Every guest called it a photo shoot set.",
    storyUk: "30-річчя, де іменинниця обожнює пустельно-бохо естетику. Ми нашарували памплсову траву, суху протею, сушений цитрус і теракотові свічки на низьких дерев'яних столах.",
    heightClass: "h-60",
    bg: "bg-amber-100",
  },
  {
    id: 6,
    nameEn: "Restaurant Decor",
    nameUk: "Декор ресторану",
    category: "corporate",
    tagEn: "Corporate subscription · Italian restaurant",
    tagUk: "Корпоративна підписка · Італьянський ресторан",
    conceptEn: "Weekly fresh arrangements echoing Italian warmth — olive branches, cream roses, herbs.",
    conceptUk: "Щотижневі свіжі композиції в дусі Італії — гілки оливи, кремові троянди, зелень.",
    storyEn: "An Italian fine-dining restaurant wanted floristry that felt like Tuscany every week. We source olive branches, cream roses, lavender and rosemary to maintain a consistent warm-Mediterranean mood across all 14 tables and the bar.",
    storyUk: "Італьянський ресторан хотів флористики, що щотижня нагадує Тоскану. Ми постачаємо гілки оливи, кремові троянди, лаванду та розмарин для 14 столів і бару.",
    heightClass: "h-72",
    bg: "bg-yellow-100",
  },
];

const SERVICES = [
  {
    id: "wedding",
    nameEn: "Wedding Floristry",
    nameUk: "Весільна флористика",
    descEn: "Full-day coverage from ceremony arch to reception tables and bouquet.",
    descUk: "Повне оформлення — від арки церемонії до столів і букету нареченої.",
    formatEn: "On-site setup · 1 lead + 2 assistants",
    formatUk: "Монтаж на місці · 1 флорист + 2 асистенти",
    leadEn: "Booking 3–6 months ahead",
    leadUk: "Бронювання за 3–6 місяців",
    bg: "bg-stone-800",
    accentColor: "text-yellow-400",
  },
  {
    id: "event",
    nameEn: "Event Decoration",
    nameUk: "Декорація заходів",
    descEn: "Conferences, galas, product launches, brand activations.",
    descUk: "Конференції, гала-вечори, презентації, брендові активації.",
    formatEn: "Briefing → concept → delivery → install → breakdown",
    formatUk: "Бриф → концепт → доставка → монтаж → демонтаж",
    leadEn: "2–4 weeks minimum",
    leadUk: "Мінімум 2–4 тижні",
    bg: "bg-neutral-800",
    accentColor: "text-yellow-400",
  },
  {
    id: "subscription",
    nameEn: "Corporate Subscription",
    nameUk: "Корпоративна підписка",
    descEn: "Fresh flowers for offices, hotels and restaurants on a weekly schedule.",
    descUk: "Свіжі квіти для офісів, готелів і ресторанів за щотижневим графіком.",
    formatEn: "Contract · fixed schedule · dedicated florist",
    formatUk: "Контракт · фіксований графік · особистий флорист",
    leadEn: "Start within 1 week",
    leadUk: "Старт протягом 1 тижня",
    bg: "bg-zinc-800",
    accentColor: "text-yellow-400",
  },
  {
    id: "interior",
    nameEn: "Interior Compositions",
    nameUk: "Інтер'єрні композиції",
    descEn: "Lobby, showroom and residential styling with live or preserved botanics.",
    descUk: "Стилізація лобі, шоурумів і житлових просторів — живі або збережені рослини.",
    formatEn: "Design consultation + monthly refresh",
    formatUk: "Дизайн-консультація + щомісячне оновлення",
    leadEn: "2 weeks for first setup",
    leadUk: "2 тижні на перше оформлення",
    bg: "bg-stone-900",
    accentColor: "text-yellow-400",
  },
];

const SUBSCRIPTION_OPTIONS = [
  {
    freq: "1x",
    labelEn: "Once a week",
    labelUk: "Раз на тиждень",
    priceEn: "from ₴2,800 / month",
    priceUk: "від ₴2 800 / місяць",
    detailEn: "1 arrangement per week, up to 3 zones",
    detailUk: "1 композиція на тиждень, до 3 зон",
  },
  {
    freq: "2x",
    labelEn: "Twice a week",
    labelUk: "Двічі на тиждень",
    priceEn: "from ₴4,900 / month",
    priceUk: "від ₴4 900 / місяць",
    detailEn: "2 visits per week, up to 6 zones",
    detailUk: "2 візити на тиждень, до 6 зон",
    highlight: true,
  },
  {
    freq: "3x",
    labelEn: "Three times a week",
    labelUk: "Тричі на тиждень",
    priceEn: "from ₴6,800 / month",
    priceUk: "від ₴6 800 / місяць",
    detailEn: "3 visits per week, unlimited zones",
    detailUk: "3 візити на тиждень, необмежена кількість зон",
  },
];

const CLIENT_LOGOS = [
  { nameEn: "Nova Office Tower", nameUk: "Nova Office Tower", typeEn: "Office", typeUk: "Офіс" },
  { nameEn: "Hotel Grand Kyiv", nameUk: "Hotel Grand Kyiv", typeEn: "Hotel", typeUk: "Готель" },
  { nameEn: "Osteria Milano", nameUk: "Osteria Milano", typeEn: "Restaurant", typeUk: "Ресторан" },
  { nameEn: "Hanza Business Hub", nameUk: "Hanza Business Hub", typeEn: "Office", typeUk: "Офіс" },
  { nameEn: "Maison Rouge", nameUk: "Maison Rouge", typeEn: "Restaurant", typeUk: "Ресторан" },
  { nameEn: "Skyline Residences", nameUk: "Skyline Residences", typeEn: "Residential", typeUk: "Житло" },
];

const WEDDING_EXAMPLES = [
  { nameEn: "Classic White Garden", nameUk: "Класичний білий сад", bg: "bg-stone-200" },
  { nameEn: "Burgundy & Gold Ballroom", nameUk: "Бургундська зала", bg: "bg-red-100" },
  { nameEn: "Boho Meadow Ceremony", nameUk: "Бохо-церемонія на лузі", bg: "bg-amber-100" },
  { nameEn: "Minimalist Arch Studio", nameUk: "Мінімалістична арка", bg: "bg-neutral-200" },
];

const TEAM = [
  {
    nameEn: "Kateryna Melnyk",
    nameUk: "Катерина Мельник",
    roleEn: "Lead Florist & Founder",
    roleUk: "Провідний флорист та засновниця",
    bioEn: "12 years creating floral art. Trained in Amsterdam and Kyiv. Passionate about making every space feel alive.",
    bioUk: "12 років у флористичному мистецтві. Навчалася в Амстердамі та Києві. Вірить, що кожен простір може дихати.",
    bg: "bg-stone-300",
  },
  {
    nameEn: "Oleksiy Bondar",
    nameUk: "Олексій Бондар",
    roleEn: "Senior Florist",
    roleUk: "Старший флорист",
    bioEn: "Specialist in large-scale installations and corporate projects. Former stage designer turned floral architect.",
    bioUk: "Спеціаліст з масштабних інсталяцій і корпоративних проєктів. Колишній сценограф, нині квітковий архітектор.",
    bg: "bg-zinc-300",
  },
  {
    nameEn: "Daryna Savchuk",
    nameUk: "Дарина Савчук",
    roleEn: "Wedding & Events Specialist",
    roleUk: "Спеціаліст з весіль та подій",
    bioEn: "Over 80 weddings delivered. Obsessed with the perfect bouquet and the bride's reaction.",
    bioUk: "Понад 80 весіль. Закохана в ідеальний букет і реакцію нареченої.",
    bg: "bg-neutral-300",
  },
];

const EVENT_TYPES = [
  { key: "wedding", en: "Wedding", uk: "Весілля" },
  { key: "corporate", en: "Corporate Event", uk: "Корпоративний захід" },
  { key: "birthday", en: "Birthday / Private", uk: "День народження / Приватне" },
  { key: "presentation", en: "Product Launch / Presentation", uk: "Запуск продукту / Презентація" },
  { key: "interior", en: "Interior Styling", uk: "Стилізація інтер'єру" },
  { key: "other", en: "Other", uk: "Інше" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function BotanicaDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedCase, setSelectedCase] = useState<number | null>(null);
  const [activeCasePhoto, setActiveCasePhoto] = useState(0);

  const [weddingForm, setWeddingForm] = useState({
    name: "",
    phone: "",
    date: "",
    budget: "",
  });
  const [weddingSubmitted, setWeddingSubmitted] = useState(false);

  const [corporateForm, setCorporateForm] = useState({
    company: "",
    area: "",
    frequency: "1x",
    contact: "",
  });
  const [corporateSubmitted, setCorporateSubmitted] = useState(false);

  const [inquiryForm, setInquiryForm] = useState({
    eventType: "",
    scale: "",
    budget: "",
    date: "",
    vision: "",
    contact: "",
  });
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  const filteredCases =
    activeFilter === "all"
      ? CASES
      : CASES.filter((c) => c.category === activeFilter);

  const openCase = CASES.find((c) => c.id === selectedCase) ?? null;

  const casePhotoLabels = isUk
    ? ["До", "Монтаж 1", "Монтаж 2", "Результат"]
    : ["Before", "Setup 1", "Setup 2", "Result"];

  const casePhotoBgs = ["bg-stone-300", "bg-zinc-200", "bg-neutral-300", "bg-stone-200"];

  return (
    <div
      className="min-h-screen font-sans"
      style={{ backgroundColor: "#FAF7F2", color: "#111111" }}
    >
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        className="relative flex flex-col items-center justify-center min-h-screen text-center overflow-hidden"
        style={{ backgroundColor: "#111111", color: "#FAF7F2" }}
      >
        {/* Background photo placeholder */}
        <div
          className="absolute inset-0 opacity-20"
          style={{ backgroundColor: "#B8860B" }}
        />

        <div className="relative z-10 px-6 max-w-4xl mx-auto flex flex-col items-center">
          {/* Brand name */}
          <p
            className="text-xs tracking-[0.4em] uppercase mb-6"
            style={{ color: "#B8860B" }}
          >
            {isUk ? "Флористична студія" : "Floral Studio"}
          </p>
          <h1 className="text-5xl sm:text-7xl font-thin tracking-widest uppercase mb-8" style={{ letterSpacing: "0.15em" }}>
            BOTANICA<br />
            <span style={{ color: "#B8860B" }}>STUDIO</span>
          </h1>
          <p className="text-lg sm:text-xl font-light tracking-wide mb-12 max-w-xl opacity-80">
            {isUk
              ? "Флористичний дизайн для подій і просторів"
              : "Floral Design for Events and Spaces"}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <button
              onClick={() =>
                document
                  .getElementById("botanica-inquiry")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-8 py-3 text-sm tracking-widest uppercase transition-opacity hover:opacity-80"
              style={{ backgroundColor: "#B8860B", color: "#FAF7F2" }}
            >
              {isUk ? "Обговорити проєкт" : "Discuss a Project"}
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("botanica-portfolio")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-8 py-3 text-sm tracking-widest uppercase border transition-opacity hover:opacity-70"
              style={{ borderColor: "#FAF7F2", color: "#FAF7F2" }}
            >
              {isUk ? "Переглянути портфоліо" : "View Portfolio"}
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 flex flex-col items-center gap-2 opacity-40">
          <div className="w-px h-16 bg-current" />
          <span className="text-xs tracking-widest uppercase">
            {isUk ? "Гортати" : "Scroll"}
          </span>
        </div>
      </section>

      {/* ── Portfolio / Cases ─────────────────────────────────────────────── */}
      <section id="botanica-portfolio" className="py-24 px-6" style={{ backgroundColor: "#FAF7F2" }}>
        <div className="max-w-6xl mx-auto">
          <p
            className="text-xs tracking-[0.35em] uppercase mb-3"
            style={{ color: "#B8860B" }}
          >
            {isUk ? "Кейси" : "Cases"}
          </p>
          <h2 className="text-4xl font-thin tracking-wide mb-10">
            {isUk ? "Портфоліо робіт" : "Our Portfolio"}
          </h2>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-12">
            {FILTER_TABS.map((tab) => {
              const active = activeFilter === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveFilter(tab.key)}
                  className="px-5 py-2 text-xs tracking-widest uppercase border transition-all"
                  style={
                    active
                      ? { backgroundColor: "#111111", color: "#FAF7F2", borderColor: "#111111" }
                      : { backgroundColor: "transparent", color: "#111111", borderColor: "#111111" }
                  }
                >
                  {isUk ? tab.uk : tab.en}
                </button>
              );
            })}
          </div>

          {/* Masonry-style grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredCases.map((c) => (
              <div
                key={c.id}
                className="break-inside-avoid cursor-pointer group"
                onClick={() => {
                  setSelectedCase(c.id);
                  setActiveCasePhoto(0);
                }}
              >
                {/* Photo div */}
                <div
                  className={`w-full ${c.heightClass} ${c.bg} relative overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]`}
                >
                  <div
                    className="absolute inset-0 flex items-end p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ backgroundColor: "rgba(17,17,17,0.5)" }}
                  >
                    <div className="p-4 text-white">
                      <p className="text-xs tracking-widest uppercase mb-1">
                        {isUk ? c.tagUk : c.tagEn}
                      </p>
                    </div>
                  </div>
                  <div
                    className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: "#B8860B" }}
                  >
                    <span className="text-white text-xs">+</span>
                  </div>
                </div>
                {/* Caption */}
                <div className="pt-4 pb-2">
                  <h3 className="text-sm font-medium tracking-wide uppercase mb-1">
                    {isUk ? c.nameUk : c.nameEn}
                  </h3>
                  <p className="text-xs opacity-60 leading-relaxed">
                    {isUk ? c.conceptUk : c.conceptEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Case Detail Modal ─────────────────────────────────────────────── */}
      {openCase && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
          style={{ backgroundColor: "rgba(17,17,17,0.85)" }}
          onClick={() => setSelectedCase(null)}
        >
          <div
            className="relative w-full max-w-3xl my-8 p-8"
            style={{ backgroundColor: "#FAF7F2", color: "#111111" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              className="absolute top-4 right-4 text-xs tracking-widest uppercase opacity-50 hover:opacity-100"
              onClick={() => setSelectedCase(null)}
            >
              {isUk ? "Закрити" : "Close"} ✕
            </button>

            <p
              className="text-xs tracking-[0.35em] uppercase mb-2"
              style={{ color: "#B8860B" }}
            >
              {isUk ? openCase.tagUk : openCase.tagEn}
            </p>
            <h2 className="text-3xl font-thin tracking-wide mb-2">
              {isUk ? openCase.nameUk : openCase.nameEn}
            </h2>
            <p className="text-sm opacity-60 mb-6">
              {isUk ? openCase.conceptUk : openCase.conceptEn}
            </p>
            <p className="text-sm leading-relaxed mb-8 max-w-xl">
              {isUk ? openCase.storyUk : openCase.storyEn}
            </p>

            {/* 4-photo tabs */}
            <div className="flex gap-2 mb-4">
              {casePhotoLabels.map((label, i) => (
                <button
                  key={i}
                  onClick={() => setActiveCasePhoto(i)}
                  className="flex-1 py-2 text-xs tracking-widest uppercase border transition-all"
                  style={
                    activeCasePhoto === i
                      ? { backgroundColor: "#111111", color: "#FAF7F2", borderColor: "#111111" }
                      : { backgroundColor: "transparent", color: "#111111", borderColor: "#111111" }
                  }
                >
                  {label}
                </button>
              ))}
            </div>
            <div
              className={`w-full h-56 ${casePhotoBgs[activeCasePhoto]} flex items-center justify-center mb-8`}
            >
              <span className="text-xs tracking-widest opacity-40 uppercase">
                {casePhotoLabels[activeCasePhoto]}
              </span>
            </div>

            <button
              onClick={() => {
                setSelectedCase(null);
                document
                  .getElementById("botanica-inquiry")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-3 text-xs tracking-widest uppercase transition-opacity hover:opacity-80"
              style={{ backgroundColor: "#B8860B", color: "#FAF7F2" }}
            >
              {isUk ? "Замовити схоже" : "Order Similar"}
            </button>
          </div>
        </div>
      )}

      {/* ── Services ──────────────────────────────────────────────────────── */}
      <section
        className="py-24 px-6"
        style={{ backgroundColor: "#111111", color: "#FAF7F2" }}
      >
        <div className="max-w-6xl mx-auto">
          <p
            className="text-xs tracking-[0.35em] uppercase mb-3"
            style={{ color: "#B8860B" }}
          >
            {isUk ? "Що ми робимо" : "What We Do"}
          </p>
          <h2 className="text-4xl font-thin tracking-wide mb-16">
            {isUk ? "Послуги студії" : "Studio Services"}
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            {SERVICES.map((s) => (
              <div
                key={s.id}
                className={`${s.bg} p-8 flex flex-col gap-4 group`}
              >
                {/* Editorial photo placeholder */}
                <div
                  className="w-full h-40 opacity-30"
                  style={{ backgroundColor: "#B8860B" }}
                />
                <h3 className={`text-lg font-light tracking-widest uppercase ${s.accentColor}`}>
                  {isUk ? s.nameUk : s.nameEn}
                </h3>
                <p className="text-sm opacity-70 leading-relaxed">
                  {isUk ? s.descUk : s.descEn}
                </p>
                <div className="border-t border-white/10 pt-4 flex flex-col gap-1">
                  <p className="text-xs opacity-50 tracking-wide">
                    {isUk ? "Формат:" : "Format:"}{" "}
                    <span className="opacity-90">{isUk ? s.formatUk : s.formatEn}</span>
                  </p>
                  <p className="text-xs opacity-50 tracking-wide">
                    {isUk ? "Бронювання:" : "Lead time:"}{" "}
                    <span className="opacity-90">{isUk ? s.leadUk : s.leadEn}</span>
                  </p>
                </div>
                <button
                  onClick={() =>
                    document
                      .getElementById("botanica-inquiry")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="mt-auto self-start px-6 py-2 text-xs tracking-widest uppercase border transition-opacity hover:opacity-70"
                  style={{ borderColor: "#B8860B", color: "#B8860B" }}
                >
                  {isUk ? "Дізнатись про ціну" : "Inquire About Price"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Corporate Subscription ────────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ backgroundColor: "#FAF7F2" }}>
        <div className="max-w-5xl mx-auto">
          <p
            className="text-xs tracking-[0.35em] uppercase mb-3"
            style={{ color: "#B8860B" }}
          >
            B2B
          </p>
          <h2 className="text-4xl font-thin tracking-wide mb-4">
            {isUk ? "Корпоративна підписка" : "Corporate Subscription"}
          </h2>
          <p className="text-sm opacity-60 mb-12 max-w-lg">
            {isUk
              ? "Свіжі квіти для вашого офісу кожного тижня. Єдиний флорист, стабільний стиль, простий контракт."
              : "Fresh flowers for your office every week. Dedicated florist, consistent style, easy contract."}
          </p>

          {/* Subscription options */}
          <div className="grid sm:grid-cols-3 gap-4 mb-14">
            {SUBSCRIPTION_OPTIONS.map((opt) => (
              <div
                key={opt.freq}
                className="border p-6 flex flex-col gap-3"
                style={
                  opt.highlight
                    ? { borderColor: "#B8860B", backgroundColor: "#111111", color: "#FAF7F2" }
                    : { borderColor: "#111111" }
                }
              >
                <span
                  className="text-xs tracking-widest uppercase"
                  style={{ color: opt.highlight ? "#B8860B" : "#B8860B" }}
                >
                  {opt.freq}
                </span>
                <h3 className="text-base font-light">
                  {isUk ? opt.labelUk : opt.labelEn}
                </h3>
                <p className="text-lg font-thin" style={{ color: "#B8860B" }}>
                  {isUk ? opt.priceUk : opt.priceEn}
                </p>
                <p className="text-xs opacity-60">
                  {isUk ? opt.detailUk : opt.detailEn}
                </p>
                {opt.highlight && (
                  <span className="text-xs tracking-widest uppercase" style={{ color: "#B8860B" }}>
                    {isUk ? "Популярний вибір" : "Most popular"}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Benefits */}
          <div className="grid sm:grid-cols-3 gap-6 mb-14">
            {[
              {
                en: "Dedicated florist",
                uk: "Персональний флорист",
                descEn: "The same professional learns your space and taste.",
                descUk: "Один фахівець знає ваш простір і смак.",
              },
              {
                en: "Consistent style",
                uk: "Стабільний стиль",
                descEn: "Your brand palette and aesthetic, every visit.",
                descUk: "Ваша палітра та естетика — кожного візиту.",
              },
              {
                en: "Easy contract",
                uk: "Простий контракт",
                descEn: "Monthly or annual. Pause or cancel with 2 weeks notice.",
                descUk: "Помісячно або щорічно. Пауза чи скасування за 2 тижні.",
              },
            ].map((b, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div
                  className="w-8 h-px mb-2"
                  style={{ backgroundColor: "#B8860B" }}
                />
                <h4 className="text-sm font-medium tracking-wide">
                  {isUk ? b.uk : b.en}
                </h4>
                <p className="text-xs opacity-60 leading-relaxed">
                  {isUk ? b.descUk : b.descEn}
                </p>
              </div>
            ))}
          </div>

          {/* Client logos */}
          <h3 className="text-xs tracking-[0.35em] uppercase mb-6 opacity-50">
            {isUk ? "Наші клієнти" : "Our clients"}
          </h3>
          <div className="flex flex-wrap gap-3 mb-14">
            {CLIENT_LOGOS.map((logo, i) => (
              <div
                key={i}
                className="px-4 py-2 border text-xs tracking-wide flex flex-col items-center gap-0.5"
                style={{ borderColor: "#111111" }}
              >
                <span className="font-medium">{logo.nameEn}</span>
                <span className="opacity-50" style={{ fontSize: "10px" }}>
                  {isUk ? logo.typeUk : logo.typeEn}
                </span>
              </div>
            ))}
          </div>

          {/* Corporate lead form */}
          <div
            className="p-8"
            style={{ backgroundColor: "#111111", color: "#FAF7F2" }}
          >
            <h3 className="text-lg font-thin tracking-wide mb-6" style={{ color: "#B8860B" }}>
              {isUk ? "Залишити заявку" : "Get a Quote"}
            </h3>
            {corporateSubmitted ? (
              <p className="text-sm opacity-70">
                {isUk
                  ? "Дякуємо! Ми зв'яжемось з вами протягом 4 годин."
                  : "Thank you! We will respond within 4 hours."}
              </p>
            ) : (
              <form
                className="grid sm:grid-cols-2 gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setCorporateSubmitted(true);
                }}
              >
                <input
                  type="text"
                  placeholder={isUk ? "Компанія" : "Company"}
                  value={corporateForm.company}
                  onChange={(e) =>
                    setCorporateForm({ ...corporateForm, company: e.target.value })
                  }
                  className="px-4 py-3 text-sm bg-transparent border outline-none"
                  style={{ borderColor: "#B8860B", color: "#FAF7F2" }}
                  required
                />
                <input
                  type="text"
                  placeholder={isUk ? "Площа офісу (м²)" : "Office area (m²)"}
                  value={corporateForm.area}
                  onChange={(e) =>
                    setCorporateForm({ ...corporateForm, area: e.target.value })
                  }
                  className="px-4 py-3 text-sm bg-transparent border outline-none"
                  style={{ borderColor: "#B8860B", color: "#FAF7F2" }}
                />
                <select
                  value={corporateForm.frequency}
                  onChange={(e) =>
                    setCorporateForm({ ...corporateForm, frequency: e.target.value })
                  }
                  className="px-4 py-3 text-sm bg-transparent border outline-none"
                  style={{ borderColor: "#B8860B", color: "#FAF7F2" }}
                >
                  <option value="1x" style={{ backgroundColor: "#111111" }}>
                    {isUk ? "Раз на тиждень" : "Once a week"}
                  </option>
                  <option value="2x" style={{ backgroundColor: "#111111" }}>
                    {isUk ? "Двічі на тиждень" : "Twice a week"}
                  </option>
                  <option value="3x" style={{ backgroundColor: "#111111" }}>
                    {isUk ? "Тричі на тиждень" : "Three times a week"}
                  </option>
                </select>
                <input
                  type="text"
                  placeholder={isUk ? "Контакт (телефон або email)" : "Contact (phone or email)"}
                  value={corporateForm.contact}
                  onChange={(e) =>
                    setCorporateForm({ ...corporateForm, contact: e.target.value })
                  }
                  className="px-4 py-3 text-sm bg-transparent border outline-none"
                  style={{ borderColor: "#B8860B", color: "#FAF7F2" }}
                  required
                />
                <button
                  type="submit"
                  className="sm:col-span-2 py-3 text-xs tracking-widest uppercase transition-opacity hover:opacity-80"
                  style={{ backgroundColor: "#B8860B", color: "#FAF7F2" }}
                >
                  {isUk ? "Надіслати заявку" : "Submit Inquiry"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── Wedding Floristry ─────────────────────────────────────────────── */}
      <section
        className="py-24 px-6"
        style={{ backgroundColor: "#1a1714", color: "#FAF7F2" }}
      >
        <div className="max-w-5xl mx-auto">
          <p
            className="text-xs tracking-[0.35em] uppercase mb-3"
            style={{ color: "#B8860B" }}
          >
            {isUk ? "Весілля" : "Weddings"}
          </p>
          <h2 className="text-4xl font-thin tracking-wide mb-4">
            {isUk ? "Весільна флористика" : "Wedding Floristry"}
          </h2>
          <p className="text-sm opacity-60 mb-10 max-w-lg">
            {isUk
              ? "Мінімальне весільне замовлення ₴15,000. Церемоніальна арка, столи, букет нареченої, декор церемонії, бутоньєрка."
              : "Minimum wedding order ₴15,000. Ceremony arch, tables, bouquet, ceremony decor, boutonniere."}
          </p>

          {/* Elements list */}
          <div className="flex flex-wrap gap-3 mb-12">
            {[
              { en: "Ceremony Arch", uk: "Церемоніальна арка" },
              { en: "Table Arrangements", uk: "Столові композиції" },
              { en: "Bridal Bouquet", uk: "Букет нареченої" },
              { en: "Ceremony Decor", uk: "Декор церемонії" },
              { en: "Boutonniere", uk: "Бутоньєрка" },
            ].map((el, i) => (
              <span
                key={i}
                className="px-4 py-1.5 text-xs tracking-wide border"
                style={{ borderColor: "#B8860B", color: "#B8860B" }}
              >
                {isUk ? el.uk : el.en}
              </span>
            ))}
          </div>

          {/* Wedding portfolio grid */}
          <div className="grid sm:grid-cols-2 gap-4 mb-14">
            {WEDDING_EXAMPLES.map((ex, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div
                  className={`w-full h-48 ${ex.bg} flex items-end`}
                >
                  <div
                    className="w-full px-4 py-2"
                    style={{ backgroundColor: "rgba(17,17,17,0.6)" }}
                  >
                    <p className="text-xs text-white tracking-wide">
                      {isUk ? ex.nameUk : ex.nameEn}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Wedding consultation form */}
          <div className="border p-8" style={{ borderColor: "#B8860B" }}>
            <h3 className="text-lg font-thin tracking-wide mb-6" style={{ color: "#B8860B" }}>
              {isUk ? "Забронювати весільну консультацію" : "Book Wedding Consultation"}
            </h3>
            {weddingSubmitted ? (
              <p className="text-sm opacity-70">
                {isUk
                  ? "Дякуємо! Ми зв'яжемось з вами протягом 4 годин."
                  : "Thank you! We will respond within 4 hours."}
              </p>
            ) : (
              <form
                className="grid sm:grid-cols-2 gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setWeddingSubmitted(true);
                }}
              >
                <input
                  type="text"
                  placeholder={isUk ? "Ваше ім'я" : "Your name"}
                  value={weddingForm.name}
                  onChange={(e) =>
                    setWeddingForm({ ...weddingForm, name: e.target.value })
                  }
                  className="px-4 py-3 text-sm bg-transparent border outline-none"
                  style={{ borderColor: "#B8860B", color: "#FAF7F2" }}
                  required
                />
                <input
                  type="tel"
                  placeholder={isUk ? "Телефон" : "Phone"}
                  value={weddingForm.phone}
                  onChange={(e) =>
                    setWeddingForm({ ...weddingForm, phone: e.target.value })
                  }
                  className="px-4 py-3 text-sm bg-transparent border outline-none"
                  style={{ borderColor: "#B8860B", color: "#FAF7F2" }}
                  required
                />
                <input
                  type="date"
                  placeholder={isUk ? "Дата весілля" : "Wedding date"}
                  value={weddingForm.date}
                  onChange={(e) =>
                    setWeddingForm({ ...weddingForm, date: e.target.value })
                  }
                  className="px-4 py-3 text-sm bg-transparent border outline-none"
                  style={{ borderColor: "#B8860B", color: "#FAF7F2" }}
                />
                <select
                  value={weddingForm.budget}
                  onChange={(e) =>
                    setWeddingForm({ ...weddingForm, budget: e.target.value })
                  }
                  className="px-4 py-3 text-sm bg-transparent border outline-none"
                  style={{ borderColor: "#B8860B", color: "#FAF7F2" }}
                >
                  <option value="" style={{ backgroundColor: "#1a1714" }}>
                    {isUk ? "Бюджет" : "Budget"}
                  </option>
                  <option value="15-30k" style={{ backgroundColor: "#1a1714" }}>
                    ₴15,000 – ₴30,000
                  </option>
                  <option value="30-60k" style={{ backgroundColor: "#1a1714" }}>
                    ₴30,000 – ₴60,000
                  </option>
                  <option value="60k+" style={{ backgroundColor: "#1a1714" }}>
                    ₴60,000+
                  </option>
                </select>
                <button
                  type="submit"
                  className="sm:col-span-2 py-3 text-xs tracking-widest uppercase transition-opacity hover:opacity-80"
                  style={{ backgroundColor: "#B8860B", color: "#FAF7F2" }}
                >
                  {isUk ? "Надіслати" : "Book Consultation"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── About Studio ──────────────────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ backgroundColor: "#FAF7F2" }}>
        <div className="max-w-5xl mx-auto">
          <p
            className="text-xs tracking-[0.35em] uppercase mb-3"
            style={{ color: "#B8860B" }}
          >
            {isUk ? "Про нас" : "About"}
          </p>
          <h2 className="text-4xl font-thin tracking-wide mb-4">
            {isUk ? "Студія Botanica" : "Botanica Studio"}
          </h2>
          <p className="text-sm opacity-60 mb-16 max-w-lg">
            {isUk
              ? "Кожна композиція — унікальний витвір мистецтва."
              : "Every arrangement is a unique art piece."}
          </p>

          {/* Team */}
          <div className="grid sm:grid-cols-3 gap-8 mb-14">
            {TEAM.map((member, i) => (
              <div key={i} className="flex flex-col gap-4">
                <div className={`w-full h-64 ${member.bg}`} />
                <div>
                  <h3 className="text-sm font-medium tracking-wide">
                    {isUk ? member.nameUk : member.nameEn}
                  </h3>
                  <p
                    className="text-xs tracking-wide mb-2"
                    style={{ color: "#B8860B" }}
                  >
                    {isUk ? member.roleUk : member.roleEn}
                  </p>
                  <p className="text-xs opacity-60 leading-relaxed">
                    {isUk ? member.bioUk : member.bioEn}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Studio address */}
          <div
            className="flex items-start gap-4 p-6 border"
            style={{ borderColor: "#B8860B" }}
          >
            <div
              className="w-px h-12 shrink-0"
              style={{ backgroundColor: "#B8860B" }}
            />
            <div>
              <p className="text-xs tracking-widest uppercase mb-1 opacity-50">
                {isUk ? "Адреса студії" : "Studio Address"}
              </p>
              <p className="text-sm">
                {isUk
                  ? "вул. Хрещатик 22, Київ · вт–нд 10:00–19:00"
                  : "22 Khreshchatyk St, Kyiv · Tue–Sun 10:00–19:00"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Project Inquiry Form ───────────────────────────────────────────── */}
      <section
        id="botanica-inquiry"
        className="py-24 px-6"
        style={{ backgroundColor: "#111111", color: "#FAF7F2" }}
      >
        <div className="max-w-3xl mx-auto">
          <p
            className="text-xs tracking-[0.35em] uppercase mb-3"
            style={{ color: "#B8860B" }}
          >
            {isUk ? "Контакт" : "Contact"}
          </p>
          <h2 className="text-4xl font-thin tracking-wide mb-4">
            {isUk ? "Запит на проєкт" : "Project Inquiry"}
          </h2>
          <p className="text-sm opacity-50 mb-12">
            {isUk
              ? "Ми відповімо протягом 4 годин."
              : "We'll respond within 4 hours."}
          </p>

          {inquirySubmitted ? (
            <div className="border p-10 text-center" style={{ borderColor: "#B8860B" }}>
              <p
                className="text-lg font-thin tracking-wide mb-2"
                style={{ color: "#B8860B" }}
              >
                {isUk ? "Дякуємо за запит!" : "Thank you for your inquiry!"}
              </p>
              <p className="text-sm opacity-60">
                {isUk
                  ? "Ми зв'яжемось з вами протягом 4 годин."
                  : "We'll respond within 4 hours."}
              </p>
            </div>
          ) : (
            <form
              className="flex flex-col gap-5"
              onSubmit={(e) => {
                e.preventDefault();
                setInquirySubmitted(true);
              }}
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <select
                  value={inquiryForm.eventType}
                  onChange={(e) =>
                    setInquiryForm({ ...inquiryForm, eventType: e.target.value })
                  }
                  className="px-4 py-3 text-sm bg-transparent border outline-none"
                  style={{ borderColor: "#B8860B", color: "#FAF7F2" }}
                  required
                >
                  <option value="" style={{ backgroundColor: "#111111" }}>
                    {isUk ? "Тип події" : "Event type"}
                  </option>
                  {EVENT_TYPES.map((et) => (
                    <option
                      key={et.key}
                      value={et.key}
                      style={{ backgroundColor: "#111111" }}
                    >
                      {isUk ? et.uk : et.en}
                    </option>
                  ))}
                </select>

                <select
                  value={inquiryForm.scale}
                  onChange={(e) =>
                    setInquiryForm({ ...inquiryForm, scale: e.target.value })
                  }
                  className="px-4 py-3 text-sm bg-transparent border outline-none"
                  style={{ borderColor: "#B8860B", color: "#FAF7F2" }}
                >
                  <option value="" style={{ backgroundColor: "#111111" }}>
                    {isUk ? "Масштаб" : "Scale"}
                  </option>
                  <option value="intimate" style={{ backgroundColor: "#111111" }}>
                    {isUk ? "Камерний (до 30 осіб)" : "Intimate (up to 30 guests)"}
                  </option>
                  <option value="medium" style={{ backgroundColor: "#111111" }}>
                    {isUk ? "Середній (30–150 осіб)" : "Medium (30–150 guests)"}
                  </option>
                  <option value="large" style={{ backgroundColor: "#111111" }}>
                    {isUk ? "Великий (150+ осіб)" : "Large (150+ guests)"}
                  </option>
                </select>

                <select
                  value={inquiryForm.budget}
                  onChange={(e) =>
                    setInquiryForm({ ...inquiryForm, budget: e.target.value })
                  }
                  className="px-4 py-3 text-sm bg-transparent border outline-none"
                  style={{ borderColor: "#B8860B", color: "#FAF7F2" }}
                >
                  <option value="" style={{ backgroundColor: "#111111" }}>
                    {isUk ? "Орієнтовний бюджет" : "Budget range"}
                  </option>
                  <option value="under15k" style={{ backgroundColor: "#111111" }}>
                    {isUk ? "До ₴15,000" : "Under ₴15,000"}
                  </option>
                  <option value="15-50k" style={{ backgroundColor: "#111111" }}>
                    ₴15,000 – ₴50,000
                  </option>
                  <option value="50-100k" style={{ backgroundColor: "#111111" }}>
                    ₴50,000 – ₴100,000
                  </option>
                  <option value="100k+" style={{ backgroundColor: "#111111" }}>
                    ₴100,000+
                  </option>
                </select>

                <input
                  type="date"
                  value={inquiryForm.date}
                  onChange={(e) =>
                    setInquiryForm({ ...inquiryForm, date: e.target.value })
                  }
                  className="px-4 py-3 text-sm bg-transparent border outline-none"
                  style={{ borderColor: "#B8860B", color: "#FAF7F2" }}
                />
              </div>

              <textarea
                rows={4}
                placeholder={
                  isUk
                    ? "Опишіть ваше бачення — стиль, кольори, настрій..."
                    : "Describe your vision — style, colours, mood..."
                }
                value={inquiryForm.vision}
                onChange={(e) =>
                  setInquiryForm({ ...inquiryForm, vision: e.target.value })
                }
                className="px-4 py-3 text-sm bg-transparent border outline-none resize-none"
                style={{ borderColor: "#B8860B", color: "#FAF7F2" }}
              />

              <input
                type="text"
                placeholder={
                  isUk
                    ? "Контакт (телефон або email)"
                    : "Contact (phone or email)"
                }
                value={inquiryForm.contact}
                onChange={(e) =>
                  setInquiryForm({ ...inquiryForm, contact: e.target.value })
                }
                className="px-4 py-3 text-sm bg-transparent border outline-none"
                style={{ borderColor: "#B8860B", color: "#FAF7F2" }}
                required
              />

              <button
                type="submit"
                className="py-4 text-xs tracking-widest uppercase transition-opacity hover:opacity-80"
                style={{ backgroundColor: "#B8860B", color: "#FAF7F2" }}
              >
                {isUk ? "Надіслати запит" : "Send Inquiry"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer
        className="py-12 px-6"
        style={{ backgroundColor: "#0a0908", color: "#FAF7F2" }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-1">
            <span
              className="text-sm tracking-[0.3em] uppercase font-light"
              style={{ color: "#B8860B" }}
            >
              BOTANICA STUDIO
            </span>
            <span className="text-xs opacity-40">
              {isUk
                ? "Флористичний дизайн для подій і просторів"
                : "Floral Design for Events and Spaces"}
            </span>
          </div>
          <div className="flex gap-8 text-xs opacity-40 tracking-widest uppercase">
            <button
              onClick={() =>
                document
                  .getElementById("botanica-portfolio")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="hover:opacity-80 transition-opacity"
            >
              {isUk ? "Портфоліо" : "Portfolio"}
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("botanica-inquiry")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="hover:opacity-80 transition-opacity"
            >
              {isUk ? "Контакт" : "Contact"}
            </button>
          </div>
          <div className="text-xs opacity-30">
            © 2025 Botanica Studio
          </div>
        </div>
      </footer>
    </div>
  );
}
