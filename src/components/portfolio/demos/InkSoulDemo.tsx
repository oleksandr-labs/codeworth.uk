"use client";

import { useState } from "react";
import { EmojiIcon } from "@/components/ui/EmojiIcon";

// ─── Data ────────────────────────────────────────────────────────────────────

const ARTISTS = [
  {
    name: "Дарко",
    nameEn: "Darko",
    specialtyUk: "Blackwork & Dark Art",
    specialtyEn: "Blackwork & Dark Art",
    years: 9,
    sessions: 18,
    portfolioEmoji: ["🖤", "⚫", "🌑"],
  },
  {
    name: "Соня",
    nameEn: "Sonya",
    specialtyUk: "Реалізм та Портрети",
    specialtyEn: "Realism & Portraits",
    years: 7,
    sessions: 14,
    portfolioEmoji: ["👁️", "🐺", "🌹"],
  },
  {
    name: "Рен",
    nameEn: "Ren",
    specialtyUk: "Fine Line & Ботаніка",
    specialtyEn: "Fine Line & Botanicals",
    years: 5,
    sessions: 21,
    portfolioEmoji: ["🌿", "🌸", "🔮"],
  },
  {
    name: "Макс",
    nameEn: "Max",
    specialtyUk: "Геометрія та Дотворк",
    specialtyEn: "Geometric & Dotwork",
    years: 6,
    sessions: 16,
    portfolioEmoji: ["⬡", "🔷", "🌐"],
  },
];

const PORTFOLIO_ITEMS = [
  { id: 1, emoji: "🖤", style: "Blackwork", labelUk: "Чорний Ліс", labelEn: "Dark Forest" },
  { id: 2, emoji: "👁️", style: "Realism", labelUk: "Портрет очей", labelEn: "Eye Portrait" },
  { id: 3, emoji: "🌸", style: "Fine Line", labelUk: "Сакура", labelEn: "Sakura Branch" },
  { id: 4, emoji: "⬡", style: "Geometric", labelUk: "Мандала", labelEn: "Mandala" },
  { id: 5, emoji: "🐉", style: "Japanese", labelUk: "Дракон", labelEn: "Dragon" },
  { id: 6, emoji: "🌊", style: "Watercolor", labelUk: "Хвиля", labelEn: "Wave Splash" },
  { id: 7, emoji: "⚔️", style: "Blackwork", labelUk: "Меч та роза", labelEn: "Sword & Rose" },
  { id: 8, emoji: "🦅", style: "Realism", labelUk: "Орел", labelEn: "Eagle" },
  { id: 9, emoji: "🌙", style: "Fine Line", labelUk: "Місяць та зорі", labelEn: "Moon & Stars" },
];

const STYLE_FILTERS = ["All", "Blackwork", "Realism", "Fine Line", "Geometric", "Japanese", "Watercolor"];

const STYLES_GUIDE = [
  {
    nameUk: "Blackwork",
    nameEn: "Blackwork",
    emoji: "🖤",
    charUk: "Масивні чорні заливки, орнаменти, контрасти",
    charEn: "Bold black fills, ornamental patterns, high contrast",
    bodyUk: "Передпліччя, спина, груди",
    bodyEn: "Forearm, back, chest",
    minSize: "6×6 cm",
    healingUk: "3–4 тижні",
    healingEn: "3–4 weeks",
  },
  {
    nameUk: "Реалізм",
    nameEn: "Realism",
    emoji: "👁️",
    charUk: "Фотографічна деталізація, тіні, об'єм",
    charEn: "Photographic detail, shading, dimensional depth",
    bodyUk: "Плече, стегно, спина",
    bodyEn: "Shoulder, thigh, back",
    minSize: "8×8 cm",
    healingUk: "4–6 тижнів",
    healingEn: "4–6 weeks",
  },
  {
    nameUk: "Fine Line",
    nameEn: "Fine Line",
    emoji: "🌿",
    charUk: "Тонкі лінії, делікатні деталі, мінімалізм",
    charEn: "Delicate lines, intricate details, minimalism",
    bodyUk: "Зап'ясток, ключиця, ребра",
    bodyEn: "Wrist, collarbone, ribs",
    minSize: "3×3 cm",
    healingUk: "2–3 тижні",
    healingEn: "2–3 weeks",
  },
  {
    nameUk: "Геометрія",
    nameEn: "Geometric",
    emoji: "⬡",
    charUk: "Точні форми, лінії, симетрія та дотворк",
    charEn: "Precise shapes, linework, symmetry and dotwork",
    bodyUk: "Передпліччя, плече, шия",
    bodyEn: "Forearm, shoulder, neck",
    minSize: "5×5 cm",
    healingUk: "3–4 тижні",
    healingEn: "3–4 weeks",
  },
  {
    nameUk: "Японський стиль",
    nameEn: "Japanese",
    emoji: "🐉",
    charUk: "Традиційні мотиви, хвилі, квіти, дракони",
    charEn: "Traditional motifs, waves, florals, mythical creatures",
    bodyUk: "Рукав, спина, стегно",
    bodyEn: "Sleeve, full back, thigh",
    minSize: "10×10 cm",
    healingUk: "4–6 тижнів",
    healingEn: "4–6 weeks",
  },
  {
    nameUk: "Акварель",
    nameEn: "Watercolor",
    emoji: "🎨",
    charUk: "Кольорові розводи, м'які переходи, без чіткого контуру",
    charEn: "Color splashes, soft transitions, loose outlines",
    bodyUk: "Плече, лопатка, передпліччя",
    bodyEn: "Shoulder, shoulder blade, forearm",
    minSize: "6×6 cm",
    healingUk: "3–5 тижнів",
    healingEn: "3–5 weeks",
  },
];

const SPA_SERVICES = [
  {
    emoji: "✨",
    nameUk: "Пілінг тіла",
    nameEn: "Body Peeling",
    descUk: "Глибоке очищення шкіри перед або після татуювання. Солевий або цукровий скраб із ефірними оліями.",
    descEn: "Deep skin cleansing before or after tattooing. Salt or sugar scrub with essential oils.",
    price: "800 грн / 60 min",
    noteUk: "Доступно окремо від сеансу",
    noteEn: "Available separately from session",
  },
  {
    emoji: "🕯️",
    nameUk: "Релаксаційний масаж",
    nameEn: "Relaxation Massage",
    descUk: "Зменшує тривогу перед сеансом. Ароматерапія, теплі олії, повне розслаблення.",
    descEn: "Reduces anxiety before session. Aromatherapy, warm oils, full relaxation.",
    price: "1200 грн / 90 min",
    noteUk: "Рекомендовано за 24 год до татуювання",
    noteEn: "Recommended 24h before tattooing",
  },
  {
    emoji: "💧",
    nameUk: "Живлення шкіри",
    nameEn: "Skin Nourishment",
    descUk: "Зволоження та регенерація після загоєння. Спеціальний протокол для збереження кольору татуювання.",
    descEn: "Hydration and regeneration post-healing. Special protocol to preserve tattoo color.",
    price: "950 грн / 75 min",
    noteUk: "Після повного загоєння (від 4 тижнів)",
    noteEn: "After full healing (from 4 weeks)",
  },
];

const AFTERCARE_STEPS = [
  {
    emoji: "🩹",
    periodUk: "День 1–2",
    periodEn: "Day 1–2",
    titleUk: "Перша допомога",
    titleEn: "First Care",
    stepsUk: ["Залиш плівку на 4–6 годин", "Змий теплою водою без мила", "Нанеси тонкий шар загоювального крему", "НЕ чіпай, не трети"],
    stepsEn: ["Keep wrap on 4–6 hours", "Rinse with warm water, no soap", "Apply thin layer of healing cream", "Do NOT touch or scratch"],
  },
  {
    emoji: "🧴",
    periodUk: "День 3–7",
    periodEn: "Day 3–7",
    titleUk: "Активне загоєння",
    titleEn: "Active Healing",
    stepsUk: ["Мий 2–3 рази на день м'яким милом", "Зволожуй без аромату", "Очікуй лущення — не зривай", "Уникай сонця та водойм"],
    stepsEn: ["Wash 2–3x daily with mild soap", "Moisturize with fragrance-free lotion", "Expect peeling — don't pick", "Avoid sun and pools"],
  },
  {
    emoji: "🌿",
    periodUk: "Тиждень 2–4",
    periodEn: "Week 2–4",
    titleUk: "Відновлення",
    titleEn: "Recovery",
    stepsUk: ["Шкіра може виглядати тьмяно — це нормально", "Продовжуй зволожувати", "Не зривай кірочки", "Можна душ, але не ванна"],
    stepsEn: ["Skin may look dull — this is normal", "Continue moisturizing", "Still no picking", "Shower OK, no baths"],
  },
  {
    emoji: "☀️",
    periodUk: "Місяць 1–3",
    periodEn: "Month 1–3",
    titleUk: "Захист кольору",
    titleEn: "Color Protection",
    stepsUk: ["Наноси SPF 50+ на татуювання на сонці", "Уникай тривалого засмагання", "Татуювання стабілізується", "Можна плавати"],
    stepsEn: ["Apply SPF 50+ on tattoo in sun", "Avoid prolonged tanning", "Tattoo stabilizes", "Swimming is OK now"],
  },
  {
    emoji: "🖤",
    periodUk: "Довготривалий догляд",
    periodEn: "Long-term Care",
    titleUk: "Назавжди яскраве",
    titleEn: "Forever Vibrant",
    stepsUk: ["SPF щоденно", "Зволожуй регулярно", "Уникай різких схуднень/набору", "Підправляй через 1–2 роки за потреби"],
    stepsEn: ["Daily SPF", "Moisturize regularly", "Avoid drastic weight changes", "Touch-up after 1–2 years if needed"],
  },
];

const REVIEWS = [
  {
    stars: 5,
    textUk: "Дарко — геній. Blackwork-рукав, який я мріяв роками. Студія — атмосфера на рівні арт-галереї.",
    textEn: "Darko is a genius. The blackwork sleeve I'd been dreaming of for years. The studio feels like an art gallery.",
    authorUk: "Олег К.",
    authorEn: "Oleg K.",
    styleUk: "Blackwork",
    styleEn: "Blackwork",
  },
  {
    stars: 5,
    textUk: "Соня зробила реалістичний портрет мого пса. Я плакала. Це не татуювання — це живопис на шкірі.",
    textEn: "Sonya made a realistic portrait of my dog. I cried. This is not a tattoo — it's painting on skin.",
    authorUk: "Аліна В.",
    authorEn: "Alina V.",
    styleUk: "Реалізм",
    styleEn: "Realism",
  },
  {
    stars: 5,
    textUk: "Fine line від Рен — найделікатніша робота, яку я бачила. Місяць і зорі на ключиці. Ідеально.",
    textEn: "Fine line by Ren — the most delicate work I've ever seen. Moon and stars on the collarbone. Perfect.",
    authorUk: "Марина Л.",
    authorEn: "Maryna L.",
    styleUk: "Fine Line",
    styleEn: "Fine Line",
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

export function InkSoulDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [activeFilter, setActiveFilter] = useState("All");
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    artist: "",
    style: "",
    reference: "",
    placement: "",
    timeline: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const filteredItems =
    activeFilter === "All"
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.style === activeFilter);

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormSubmitted(true);
  }

  return (
    <div className="bg-[#0A0A0A] text-[#F5F5F0] font-sans min-h-screen">

      {/* ── 1. HEADER / NAVBAR ─────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-[#0A0A0A]/95 backdrop-blur border-b border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <span className="text-xl font-black tracking-[0.3em] uppercase text-[#F5F5F0]">
            🖋️ INK &amp; SOUL
          </span>
          <nav className="hidden md:flex items-center gap-8">
            {[
              isUk ? "Майстри" : "Artists",
              isUk ? "Портфоліо" : "Portfolio",
              isUk ? "Стилі" : "Styles",
              "SPA",
              isUk ? "Контакт" : "Contact",
            ].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs tracking-[0.15em] uppercase text-[#888] hover:text-[#F5F5F0] transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>
          <button className="bg-[#881337] hover:bg-[#9f1239] text-white text-xs font-semibold tracking-[0.1em] uppercase px-5 py-2.5 transition-colors shrink-0">
            {isUk ? "Записатись на консультацію" : "Book Consultation"}
          </button>
        </div>
      </header>

      {/* ── 2. HERO ────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-32 overflow-hidden">
        {/* atmospheric background layers */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#1a0008_0%,_#0A0A0A_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#881337_0%,_transparent_40%)] opacity-10 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="text-[#881337] text-xs tracking-[0.4em] uppercase mb-8 font-medium">
            {isUk ? "— Київ, з 2015 —" : "— Kyiv, since 2015 —"}
          </p>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-6 text-[#F5F5F0]">
            {isUk ? "Мистецтво що" : "Art That"}
            <br />
            <span className="relative inline-block">
              {isUk ? "Залишається Назавжди" : "Lasts Forever"}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-linear-to-br from-[#881337] to-[#9f1239]" />
            </span>
          </h1>

          <p className="text-[#888] text-sm tracking-[0.3em] uppercase mt-6 mb-12">
            Tattoo &nbsp;•&nbsp; SPA &nbsp;•&nbsp; Body Art
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="bg-[#881337] hover:bg-[#9f1239] text-white font-semibold tracking-[0.1em] uppercase text-xs px-10 py-4 transition-colors">
              {isUk ? "Переглянути Портфоліо" : "View Portfolio"}
            </button>
            <button className="border border-[#333] hover:border-[#881337] text-[#888] hover:text-[#F5F5F0] font-semibold tracking-[0.1em] uppercase text-xs px-10 py-4 transition-colors">
              {isUk ? "Наші Майстри" : "Meet the Artists"}
            </button>
          </div>

          <div className="mt-20 text-[#444] text-2xl animate-bounce">↓</div>
        </div>
      </section>

      {/* ── 3. ARTISTS ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#080808]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <p className="text-[#881337] text-xs tracking-[0.4em] uppercase mb-3">
              {isUk ? "Команда" : "The Team"}
            </p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#F5F5F0] uppercase">
              {isUk ? "Наші Майстри" : "Our Artists"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ARTISTS.map((artist) => (
              <div
                key={artist.name}
                className="bg-[#0F0F0F] border border-[#1a1a1a] p-6 hover:border-[#881337]/50 transition-colors group"
              >
                {/* avatar placeholder */}
                <div className="w-16 h-16 bg-[#881337]/10 border border-[#881337]/20 flex items-center justify-center text-3xl mb-5">
                  🖋️
                </div>

                <h3 className="text-lg font-black tracking-wider uppercase text-[#F5F5F0] mb-1">
                  {isUk ? artist.name : artist.nameEn}
                </h3>
                <p className="text-[#881337] text-xs tracking-[0.1em] uppercase mb-4">
                  {isUk ? artist.specialtyUk : artist.specialtyEn}
                </p>

                <div className="flex items-center gap-3 mb-5">
                  <span className="text-[#555] text-xs">
                    {artist.years} {isUk ? "р. досвіду" : "yrs exp"}
                  </span>
                  <span className="w-px h-3 bg-[#333]" />
                  <span className="bg-[#881337]/20 text-[#9f1239] text-xs px-2 py-0.5 font-medium">
                    {artist.sessions} {isUk ? "сеансів/міс" : "sessions/mo"}
                  </span>
                </div>

                <div className="flex gap-2 mb-5">
                  {artist.portfolioEmoji.map((emoji, i) => (
                    <div
                      key={i}
                      className="w-12 h-12 bg-[#0A0A0A] border border-[#222] flex items-center justify-center"
                    >
                      <EmojiIcon emoji={emoji} className="w-5 h-5" />
                    </div>
                  ))}
                </div>

                <button className="w-full border border-[#881337]/40 hover:bg-[#881337] text-[#881337] hover:text-white text-xs font-semibold tracking-[0.1em] uppercase py-2.5 transition-colors">
                  {isUk ? `Записатись до ${artist.name}` : `Book with ${artist.nameEn}`}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. PORTFOLIO GALLERY ───────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-[#881337] text-xs tracking-[0.4em] uppercase mb-3">
              {isUk ? "Роботи" : "Work"}
            </p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#F5F5F0] uppercase">
              {isUk ? "Портфоліо" : "Portfolio Gallery"}
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            {STYLE_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`text-xs tracking-[0.1em] uppercase px-4 py-2 border transition-colors ${
                  activeFilter === f
                    ? "bg-[#881337] border-[#881337] text-white"
                    : "border-[#333] text-[#666] hover:border-[#881337]/50 hover:text-[#F5F5F0]"
                }`}
              >
                {f === "All" ? (isUk ? "Всі" : "All") : f}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="relative aspect-square bg-[#0F0F0F] border border-[#1a1a1a] flex flex-col items-center justify-center cursor-pointer overflow-hidden group"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <EmojiIcon emoji={item.emoji} className="w-14 h-14 transition-transform group-hover:scale-110" />
                {/* crimson overlay on hover */}
                <div
                  className={`absolute inset-0 bg-[#881337]/80 flex flex-col items-center justify-center transition-opacity duration-300 ${
                    hoveredItem === item.id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <p className="text-white font-black tracking-[0.1em] uppercase text-sm mb-1">
                    {isUk ? item.labelUk : item.labelEn}
                  </p>
                  <p className="text-white/70 text-xs tracking-[0.1em] uppercase">
                    {item.style}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-16 text-[#444] text-sm">
              {isUk ? "Немає робіт у цьому стилі" : "No items in this style"}
            </div>
          )}
        </div>
      </section>

      {/* ── 5. STYLES GUIDE ────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#080808]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <p className="text-[#881337] text-xs tracking-[0.4em] uppercase mb-3">
              {isUk ? "Знання" : "Knowledge"}
            </p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#F5F5F0] uppercase">
              {isUk ? "Гід по Стилях" : "Tattoo Styles Guide"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {STYLES_GUIDE.map((style) => (
              <div
                key={style.nameEn}
                className="bg-[#0A0A0A] border border-[#1a1a1a] p-6 hover:border-[#881337]/30 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <EmojiIcon emoji={style.emoji} className="w-7 h-7" />
                  <h3 className="font-black tracking-[0.1em] uppercase text-[#F5F5F0]">
                    {isUk ? style.nameUk : style.nameEn}
                  </h3>
                </div>

                <p className="text-[#888] text-sm leading-relaxed mb-5">
                  {isUk ? style.charUk : style.charEn}
                </p>

                <div className="space-y-2 border-t border-[#1a1a1a] pt-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#555] uppercase tracking-wide">
                      {isUk ? "Тіло" : "Placement"}
                    </span>
                    <span className="text-[#888]">{isUk ? style.bodyUk : style.bodyEn}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[#555] uppercase tracking-wide">
                      {isUk ? "Мін. розмір" : "Min size"}
                    </span>
                    <span className="text-[#F5F5F0] font-medium">{style.minSize}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[#555] uppercase tracking-wide">
                      {isUk ? "Загоєння" : "Healing"}
                    </span>
                    <span className="text-[#881337] font-medium">
                      {isUk ? style.healingUk : style.healingEn}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. CONSULTATION FORM ───────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#0A0A0A]">
        <div className="max-w-2xl mx-auto">
          <div className="mb-12 text-center">
            <p className="text-[#881337] text-xs tracking-[0.4em] uppercase mb-3">
              {isUk ? "Перший крок" : "First Step"}
            </p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#F5F5F0] uppercase">
              {isUk ? "Запит на Консультацію" : "Consultation Request"}
            </h2>
            <p className="text-[#555] text-sm mt-4">
              {isUk
                ? "Не бронювання — спочатку поспілкуємось, обговоримо ідею"
                : "Not a direct booking — we'll talk first, discuss your idea"}
            </p>
          </div>

          {formSubmitted ? (
            <div className="bg-[#0F0F0F] border border-[#881337]/40 p-10 text-center">
              <div className="text-5xl mb-6">🖤</div>
              <h3 className="text-xl font-black tracking-[0.1em] uppercase text-[#F5F5F0] mb-3">
                {isUk ? "Запит отримано" : "Request Received"}
              </h3>
              <p className="text-[#888] text-sm leading-relaxed">
                {isUk
                  ? "Ми зв'яжемося з вами протягом 24 годин для узгодження консультації."
                  : "We'll reach out within 24 hours to arrange your consultation."}
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleFormSubmit}
              className="bg-[#0F0F0F] border border-[#1a1a1a] p-8 space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs tracking-[0.1em] uppercase text-[#555] mb-2">
                    {isUk ? "Ім'я *" : "Name *"}
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-[#222] text-[#F5F5F0] px-4 py-3 text-sm focus:outline-none focus:border-[#881337] transition-colors"
                    placeholder={isUk ? "Ваше ім'я" : "Your name"}
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-[0.1em] uppercase text-[#555] mb-2">
                    {isUk ? "Телефон *" : "Phone *"}
                  </label>
                  <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-[#222] text-[#F5F5F0] px-4 py-3 text-sm focus:outline-none focus:border-[#881337] transition-colors"
                    placeholder="+380"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs tracking-[0.1em] uppercase text-[#555] mb-2">
                    {isUk ? "Майстер" : "Preferred Artist"}
                  </label>
                  <select
                    value={formData.artist}
                    onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-[#222] text-[#888] px-4 py-3 text-sm focus:outline-none focus:border-[#881337] transition-colors"
                  >
                    <option value="">{isUk ? "Не важливо" : "No preference"}</option>
                    {ARTISTS.map((a) => (
                      <option key={a.name} value={a.name}>
                        {isUk ? a.name : a.nameEn} — {isUk ? a.specialtyUk : a.specialtyEn}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs tracking-[0.1em] uppercase text-[#555] mb-2">
                    {isUk ? "Стиль" : "Style Interest"}
                  </label>
                  <select
                    value={formData.style}
                    onChange={(e) => setFormData({ ...formData, style: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-[#222] text-[#888] px-4 py-3 text-sm focus:outline-none focus:border-[#881337] transition-colors"
                  >
                    <option value="">{isUk ? "Оберіть стиль" : "Select style"}</option>
                    {STYLE_FILTERS.filter((f) => f !== "All").map((f) => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs tracking-[0.1em] uppercase text-[#555] mb-2">
                  {isUk ? "Опис референсу / ідеї" : "Reference / Idea Description"}
                </label>
                <textarea
                  rows={4}
                  value={formData.reference}
                  onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-[#222] text-[#F5F5F0] px-4 py-3 text-sm focus:outline-none focus:border-[#881337] transition-colors resize-none"
                  placeholder={
                    isUk
                      ? "Опишіть вашу ідею, референси, символіку..."
                      : "Describe your idea, references, symbolism..."
                  }
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs tracking-[0.1em] uppercase text-[#555] mb-2">
                    {isUk ? "Місце на тілі" : "Body Placement"}
                  </label>
                  <input
                    type="text"
                    value={formData.placement}
                    onChange={(e) => setFormData({ ...formData, placement: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-[#222] text-[#F5F5F0] px-4 py-3 text-sm focus:outline-none focus:border-[#881337] transition-colors"
                    placeholder={isUk ? "Напр. передпліччя" : "e.g. forearm"}
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-[0.1em] uppercase text-[#555] mb-2">
                    {isUk ? "Бажані терміни" : "Preferred Timeline"}
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-[#222] text-[#888] px-4 py-3 text-sm focus:outline-none focus:border-[#881337] transition-colors"
                  >
                    <option value="">{isUk ? "Оберіть" : "Select"}</option>
                    <option value="1m">{isUk ? "До 1 місяця" : "Within 1 month"}</option>
                    <option value="3m">{isUk ? "1–3 місяці" : "1–3 months"}</option>
                    <option value="flex">{isUk ? "Гнучко" : "Flexible"}</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#881337] hover:bg-[#9f1239] text-white font-black tracking-[0.2em] uppercase text-sm py-4 transition-colors mt-2"
              >
                {isUk ? "Надіслати Запит" : "Request Consultation"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── 7. SPA SECTION ─────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#080808]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <p className="text-[#881337] text-xs tracking-[0.4em] uppercase mb-3">
              {isUk ? "Додатково" : "Wellness"}
            </p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#F5F5F0] uppercase">
              SPA {isUk ? "Послуги" : "Services"}
            </h2>
            <p className="text-[#555] text-sm mt-3">
              {isUk
                ? "Підготовка та відновлення шкіри — до і після сеансу"
                : "Skin preparation and recovery — before and after your session"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SPA_SERVICES.map((svc) => (
              <div
                key={svc.nameEn}
                className="bg-[#0A0A0A] border border-[#1a1a1a] p-7 hover:border-[#881337]/40 transition-colors"
              >
                <EmojiIcon emoji={svc.emoji} className="w-8 h-8 mb-5" />
                <h3 className="font-black tracking-[0.1em] uppercase text-[#F5F5F0] mb-3">
                  {isUk ? svc.nameUk : svc.nameEn}
                </h3>
                <p className="text-[#777] text-sm leading-relaxed mb-5">
                  {isUk ? svc.descUk : svc.descEn}
                </p>
                <div className="border-t border-[#1a1a1a] pt-4 flex items-center justify-between">
                  <span className="text-[#881337] font-bold text-sm">{svc.price}</span>
                </div>
                <p className="text-[#444] text-xs mt-2 italic">
                  * {isUk ? svc.noteUk : svc.noteEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. AFTERCARE GUIDE ─────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <p className="text-[#881337] text-xs tracking-[0.4em] uppercase mb-3">
              {isUk ? "Догляд" : "Aftercare"}
            </p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#F5F5F0] uppercase">
              {isUk ? "Догляд після Татуювання" : "Aftercare Guide"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {AFTERCARE_STEPS.map((step) => (
              <div
                key={step.periodEn}
                className="bg-[#0F0F0F] border border-[#1a1a1a] p-5 hover:border-[#881337]/30 transition-colors"
              >
                <EmojiIcon emoji={step.emoji} className="w-8 h-8 mb-4" />
                <p className="text-[#881337] text-xs tracking-[0.1em] uppercase font-semibold mb-1">
                  {isUk ? step.periodUk : step.periodEn}
                </p>
                <h3 className="font-black text-sm tracking-wide uppercase text-[#F5F5F0] mb-4">
                  {isUk ? step.titleUk : step.titleEn}
                </h3>
                <ul className="space-y-2">
                  {(isUk ? step.stepsUk : step.stepsEn).map((s, i) => (
                    <li key={i} className="text-[#666] text-xs leading-relaxed flex gap-2">
                      <span className="text-[#881337] shrink-0">—</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. REVIEWS ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#080808]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <p className="text-[#881337] text-xs tracking-[0.4em] uppercase mb-3">
              {isUk ? "Відгуки" : "Reviews"}
            </p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#F5F5F0] uppercase">
              {isUk ? "Що Кажуть Клієнти" : "What Clients Say"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {REVIEWS.map((review, i) => (
              <div
                key={i}
                className="bg-[#0A0A0A] border border-[#1a1a1a] p-7 hover:border-[#881337]/30 transition-colors"
              >
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: review.stars }).map((_, si) => (
                    <span key={si} className="text-[#881337] text-sm">★</span>
                  ))}
                </div>
                <p className="text-[#888] text-sm leading-relaxed italic mb-6">
                  "{isUk ? review.textUk : review.textEn}"
                </p>
                <div className="border-t border-[#1a1a1a] pt-4 flex items-center justify-between">
                  <span className="font-bold text-sm text-[#F5F5F0]">
                    {isUk ? review.authorUk : review.authorEn}
                  </span>
                  <span className="text-[#881337] text-xs tracking-[0.05em] uppercase">
                    {isUk ? review.styleUk : review.styleEn}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. FOOTER ─────────────────────────────────────────────────────── */}
      <footer className="bg-[#050505] border-t border-[#111] py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <span className="text-xl font-black tracking-[0.3em] uppercase text-[#F5F5F0] block mb-4">
                🖋️ INK &amp; SOUL
              </span>
              <p className="text-[#444] text-sm leading-relaxed max-w-xs">
                {isUk
                  ? "Преміальна тату-студія та SPA у серці Києва. Мистецтво, яке залишається назавжди."
                  : "Premium tattoo studio & SPA in the heart of Kyiv. Art that lasts forever."}
              </p>
              <p className="text-[#881337] text-xs tracking-[0.2em] uppercase mt-4 font-semibold">
                {isUk ? "Тільки за записом" : "Only by appointment"}
              </p>
            </div>

            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-[#555] mb-4">
                {isUk ? "Контакти" : "Contact"}
              </p>
              <div className="space-y-2 text-sm text-[#666]">
                <p>📍 {isUk ? "вул. Велика Васильківська, 50, Київ" : "50 Velyka Vasylkivska St, Kyiv"}</p>
                <p>📞 +38 (044) 000-00-00</p>
                <p>📸 @inkandsoul.kyiv</p>
              </div>
            </div>

            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-[#555] mb-4">
                {isUk ? "Години роботи" : "Hours"}
              </p>
              <div className="space-y-1 text-sm text-[#666]">
                <p>{isUk ? "Пн–Пт: 11:00–20:00" : "Mon–Fri: 11:00–20:00"}</p>
                <p>{isUk ? "Сб–Нд: 12:00–18:00" : "Sat–Sun: 12:00–18:00"}</p>
                <p className="text-[#444] text-xs mt-3">
                  {isUk ? "Сеанси — за записом" : "Sessions by appointment"}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-[#111] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#333]">
            <p>© 2025 Ink &amp; Soul. {isUk ? "Всі права захищені." : "All rights reserved."}</p>
            <p className="text-[#881337]/60 tracking-[0.15em] uppercase">
              {isUk ? "Тільки за записом" : "By appointment only"}
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
