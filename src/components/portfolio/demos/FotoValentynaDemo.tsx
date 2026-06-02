"use client";

import { useState } from "react";

// ─── Data ───────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: "all", en: "All", uk: "Усі" },
  { id: "weddings", en: "Weddings", uk: "Весілля" },
  { id: "portraits", en: "Portraits", uk: "Портрети" },
  { id: "fashion", en: "Fashion", uk: "Мода" },
  { id: "events", en: "Events", uk: "Заходи" },
  { id: "architecture", en: "Architecture", uk: "Архітектура" },
];

const PHOTOS = [
  { id: 1, cat: "weddings", emoji: "💒", color: "#e8e0d8", en: "First Dance", uk: "Перший танець" },
  { id: 2, cat: "weddings", emoji: "💐", color: "#f0e8df", en: "Bridal Bouquet", uk: "Букет нареченої" },
  { id: 3, cat: "portraits", emoji: "👤", color: "#d8d0c8", en: "Studio Portrait", uk: "Студійний портрет" },
  { id: 4, cat: "fashion", emoji: "👗", color: "#e0d8d0", en: "Editorial Look", uk: "Редакційний образ" },
  { id: 5, cat: "portraits", emoji: "🖼️", color: "#ddd5cd", en: "Natural Light", uk: "Природне світло" },
  { id: 6, cat: "events", emoji: "🎉", color: "#e5ddd5", en: "Gala Night", uk: "Гала-вечір" },
  { id: 7, cat: "architecture", emoji: "🏛️", color: "#d5d0cb", en: "Modern Lines", uk: "Сучасні лінії" },
  { id: 8, cat: "weddings", emoji: "💍", color: "#ebe3db", en: "Ring Detail", uk: "Деталь кільця" },
  { id: 9, cat: "fashion", emoji: "📸", color: "#dfd7cf", en: "Backstage", uk: "За лаштунками" },
  { id: 10, cat: "events", emoji: "🎶", color: "#e3dbd3", en: "Concert Vibes", uk: "Атмосфера концерту" },
  { id: 11, cat: "architecture", emoji: "🌆", color: "#d0cbc6", en: "Urban Geometry", uk: "Міська геометрія" },
  { id: 12, cat: "portraits", emoji: "✨", color: "#e8e3de", en: "Golden Hour", uk: "Золота година" },
];

const SERVICES = [
  {
    en: "Portrait Session",
    uk: "Портретна сесія",
    duration: { en: "1 hour", uk: "1 година" },
    deliverables: { en: "30 retouched photos", uk: "30 ретушованих фото" },
    price: "$150 – $300",
    descEn: "Intimate studio or outdoor session capturing your personality. Includes professional styling consultation and multiple outfit changes.",
    descUk: "Камерна студійна чи вулична зйомка, що розкриває вашу особистість. Включає консультацію стиліста та кілька змін образу.",
    icon: "👤",
  },
  {
    en: "Wedding Day",
    uk: "Весільний день",
    duration: { en: "Full day (10-12h)", uk: "Повний день (10-12 год)" },
    deliverables: { en: "500+ retouched photos", uk: "500+ ретушованих фото" },
    price: "$2,000 – $4,500",
    descEn: "Comprehensive coverage from morning preparations to the last dance. Second shooter included. Premium album design available.",
    descUk: "Повне покриття від ранкових зборів до останнього танцю. Другий фотограф включено. Дизайн преміум-альбому за бажанням.",
    icon: "💒",
  },
  {
    en: "Fashion / Commercial",
    uk: "Фешн / Комерційна",
    duration: { en: "Half day (4-5h)", uk: "Пів дня (4-5 год)" },
    deliverables: { en: "50+ retouched images", uk: "50+ ретушованих зображень" },
    price: "$800 – $2,000",
    descEn: "Editorial and commercial shoots for brands, designers, and magazines. Includes mood board creation, creative direction, and post-production.",
    descUk: "Редакційні та комерційні зйомки для брендів, дизайнерів і журналів. Включає розробку мудборду, креативну режисуру та постобробку.",
    icon: "👗",
  },
  {
    en: "Event Coverage",
    uk: "Зйомка подій",
    duration: { en: "3-8 hours", uk: "3-8 годин" },
    deliverables: { en: "200+ photos", uk: "200+ фото" },
    price: "$500 – $1,500",
    descEn: "Professional coverage of corporate events, galas, product launches, and private celebrations. Quick turnaround available.",
    descUk: "Професійне покриття корпоративних подій, гала-вечорів, презентацій продуктів і приватних святкувань. Можлива термінова обробка.",
    icon: "🎉",
  },
];

const PROCESS_STEPS = [
  {
    num: "01",
    en: "Consultation",
    uk: "Консультація",
    descEn: "We discuss your vision, preferences, and create a detailed plan for your perfect shoot.",
    descUk: "Обговорюємо вашу візію, побажання та створюємо детальний план ідеальної зйомки.",
  },
  {
    num: "02",
    en: "Photoshoot",
    uk: "Зйомка",
    descEn: "The creative session where we bring the concept to life with professional equipment and direction.",
    descUk: "Творча сесія, де ми втілюємо концепцію з професійним обладнанням та режисурою.",
  },
  {
    num: "03",
    en: "Editing",
    uk: "Обробка",
    descEn: "Careful selection, color grading, and retouching to ensure every image meets the highest standard.",
    descUk: "Ретельний відбір, кольорокорекція та ретуш для відповідності найвищим стандартам.",
  },
  {
    num: "04",
    en: "Delivery",
    uk: "Доставка",
    descEn: "Your polished gallery delivered via private online gallery with download and sharing options.",
    descUk: "Ваша готова галерея доступна через приватну онлайн-галерею із завантаженням і поширенням.",
  },
];

const JOURNAL = [
  {
    date: "Mar 12, 2026",
    en: "The Art of Natural Light in Wedding Photography",
    uk: "Мистецтво природного світла у весільній фотографії",
    excerptEn: "Understanding how golden hour transforms ordinary moments into extraordinary memories. Tips from eight years behind the lens.",
    excerptUk: "Як золота година перетворює звичайні моменти на надзвичайні спогади. Поради з восьми років за об'єктивом.",
  },
  {
    date: "Feb 28, 2026",
    en: "Behind the Scenes: Vogue Ukraine Editorial",
    uk: "За лаштунками: редакційна зйомка для Vogue Ukraine",
    excerptEn: "A look into the creative process of our latest editorial shoot — from mood boards to the final spread.",
    excerptUk: "Погляд на творчий процес нашої останньої редакційної зйомки — від мудборду до фінальної публікації.",
  },
  {
    date: "Feb 10, 2026",
    en: "Choosing the Perfect Location for Your Portrait Session",
    uk: "Як обрати ідеальну локацію для портретної сесії",
    excerptEn: "From urban backdrops to serene nature spots — how the right setting tells your story better than words ever could.",
    excerptUk: "Від міських декорацій до спокійних природних куточків — як правильне тло розповідає вашу історію краще за слова.",
  },
];

const TESTIMONIALS = [
  {
    nameEn: "Olena & Taras",
    nameUk: "Олена і Тарас",
    typeEn: "Wedding",
    typeUk: "Весілля",
    textEn: "Valentyna captured every emotion of our day — tears, laughter, the quiet glances. The photos feel like a film. We relive that day every time we look at them.",
    textUk: "Валентина зловила кожну емоцію нашого дня — сльози, сміх, тихі погляди. Фотографії — як фільм. Ми переживаємо той день щоразу, коли їх дивимось.",
  },
  {
    nameEn: "Anastasia K.",
    nameUk: "Анастасія К.",
    typeEn: "Fashion Editorial",
    typeUk: "Фешн-редакційна",
    textEn: "Working with Valentyna is effortless. She has an incredible eye for composition and makes you feel completely at ease in front of the camera.",
    textUk: "Працювати з Валентиною — легко. Вона має неймовірне відчуття композиції та створює повний комфорт перед камерою.",
  },
  {
    nameEn: "Ihor M., CEO",
    nameUk: "Ігор М., CEO",
    typeEn: "Corporate Event",
    typeUk: "Корпоративна подія",
    textEn: "Professional, discreet, and the results speak for themselves. Our annual gala photos were featured in three industry publications.",
    textUk: "Професійно, делікатно, а результат говорить сам за себе. Наші фото з річного гала потрапили у три галузеві видання.",
  },
];

const SESSION_TYPES = [
  { en: "Portrait Session", uk: "Портретна сесія" },
  { en: "Wedding", uk: "Весілля" },
  { en: "Fashion / Commercial", uk: "Фешн / Комерційна" },
  { en: "Event Coverage", uk: "Зйомка подій" },
  { en: "Other", uk: "Інше" },
];

// ─── Component ──────────────────────────────────────────────────────────────

export function FotoValentynaDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    sessionType: "",
    date: "",
    message: "",
  });

  const filteredPhotos =
    activeCategory === "all"
      ? PHOTOS
      : PHOTOS.filter((p) => p.cat === activeCategory);

  const openLightbox = (id: number) => setLightbox(id);
  const closeLightbox = () => setLightbox(null);

  const navigateLightbox = (dir: number) => {
    if (lightbox === null) return;
    const idx = filteredPhotos.findIndex((p) => p.id === lightbox);
    const next = (idx + dir + filteredPhotos.length) % filteredPhotos.length;
    setLightbox(filteredPhotos[next].id);
  };

  const currentPhoto = PHOTOS.find((p) => p.id === lightbox);

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#111] font-sans">
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#fafafa]/95 backdrop-blur-sm border-b border-[#111]/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a
            href="#"
            className="text-xl tracking-[0.35em] font-serif font-light text-[#111]"
          >
            VALENTYNA
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {(isUk
              ? ["Портфоліо", "Про мене", "Послуги", "Журнал", "Контакт"]
              : ["Portfolio", "About", "Services", "Journal", "Contact"]
            ).map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs tracking-[0.15em] uppercase text-[#111]/60 hover:text-[#111] transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-[#111] p-2"
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label="Menu"
          >
            {mobileMenu ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenu && (
          <div className="md:hidden bg-[#fafafa] border-t border-[#111]/5 px-6 py-6 space-y-4">
            {(isUk
              ? ["Портфоліо", "Про мене", "Послуги", "Журнал", "Контакт"]
              : ["Portfolio", "About", "Services", "Journal", "Contact"]
            ).map((item) => (
              <a
                key={item}
                href="#"
                className="block text-sm tracking-[0.15em] uppercase text-[#111]/70 hover:text-[#111]"
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center pt-16 px-6">
        <div className="absolute inset-0 bg-linear-to-br from-[#fafafa] via-[#f5f0eb] to-[#fafafa]" />
        <div className="relative z-10 max-w-3xl">
          <p className="text-xs tracking-[0.3em] uppercase text-[#d4a574] mb-6">
            {isUk ? "Фотостудія Валентина" : "Fotostudio Valentyna"}
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light leading-tight text-[#111] mb-6">
            {isUk
              ? "Ловлю Емоції, Створюю Мистецтво"
              : "Capturing Emotions, Creating Art"}
          </h1>
          <p className="text-sm sm:text-base text-[#111]/50 max-w-md mx-auto leading-relaxed">
            {isUk
              ? "Фотографія, яка розповідає вашу історію з елегантністю та автентичністю"
              : "Photography that tells your story with elegance and authenticity"}
          </p>
        </div>
        <div className="relative z-10 mt-16 animate-bounce text-[#111]/30 text-2xl">
          ↓
        </div>
      </section>

      {/* ── Portfolio Gallery ───────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.3em] uppercase text-[#d4a574] mb-3">
            {isUk ? "Роботи" : "Selected Work"}
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-light text-[#111]">
            {isUk ? "Портфоліо" : "Portfolio"}
          </h2>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs tracking-[0.1em] uppercase rounded-full border transition-all ${
                activeCategory === cat.id
                  ? "bg-[#111] text-white border-[#111]"
                  : "bg-transparent text-[#111]/50 border-[#111]/15 hover:border-[#111]/40 hover:text-[#111]/80"
              }`}
            >
              {isUk ? cat.uk : cat.en}
            </button>
          ))}
        </div>

        {/* Photo grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {filteredPhotos.map((photo) => (
            <button
              key={photo.id}
              onClick={() => openLightbox(photo.id)}
              className="group relative aspect-[4/5] overflow-hidden rounded-sm"
              style={{ backgroundColor: photo.color }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl mb-2 opacity-40 group-hover:opacity-70 transition-opacity">
                  {photo.emoji}
                </span>
                <span className="text-[10px] tracking-[0.1em] uppercase text-[#111]/40 group-hover:text-[#111]/70 transition-colors">
                  {isUk ? photo.uk : photo.en}
                </span>
              </div>
              <div className="absolute inset-0 bg-[#111]/0 group-hover:bg-[#111]/5 transition-colors" />
            </button>
          ))}
        </div>
      </section>

      {/* ── Lightbox Modal ──────────────────────────────────────────────── */}
      {lightbox !== null && currentPhoto && (
        <div
          className="fixed inset-0 z-[100] bg-[#111]/90 flex items-center justify-center p-6"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white/60 hover:text-white text-xl transition-colors"
            >
              ✕
            </button>

            {/* Image area */}
            <div
              className="aspect-[4/5] rounded-sm flex flex-col items-center justify-center"
              style={{ backgroundColor: currentPhoto.color }}
            >
              <span className="text-7xl mb-4 opacity-50">
                {currentPhoto.emoji}
              </span>
              <span className="text-sm tracking-[0.15em] uppercase text-[#111]/50">
                {isUk ? currentPhoto.uk : currentPhoto.en}
              </span>
              <span className="text-xs text-[#111]/30 mt-2 capitalize">
                {currentPhoto.cat}
              </span>
            </div>

            {/* Nav arrows */}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => navigateLightbox(-1)}
                className="text-white/50 hover:text-white text-sm tracking-wider transition-colors"
              >
                ← {isUk ? "Попередня" : "Previous"}
              </button>
              <button
                onClick={() => navigateLightbox(1)}
                className="text-white/50 hover:text-white text-sm tracking-wider transition-colors"
              >
                {isUk ? "Наступна" : "Next"} →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── About ───────────────────────────────────────────────────────── */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-[#d4a574] mb-3">
                {isUk ? "Знайомство" : "The Artist"}
              </p>
              <h2 className="text-3xl sm:text-4xl font-serif font-light text-[#111] mb-8">
                {isUk ? "Про Валентину" : "About Valentyna"}
              </h2>
              <div className="space-y-4 text-sm leading-relaxed text-[#111]/60">
                <p>
                  {isUk
                    ? "Вже понад 8 років я створюю фотографії, які стають не просто зображеннями, а справжніми історіями. Моя філософія — знаходити красу в щирих емоціях, природному світлі та моментах, які зазвичай залишаються непоміченими."
                    : "For over 8 years, I have been creating photographs that become not just images, but true stories. My philosophy is finding beauty in genuine emotions, natural light, and moments that usually go unnoticed."}
                </p>
                <p>
                  {isUk
                    ? "Мій підхід — мінімалістичний та елегантний. Я вірю, що найкращі фотографії народжуються, коли людина почувається комфортно і вільно. Жодної штучності — лише ви, світло та мистецтво."
                    : "My approach is minimalist and elegant. I believe the best photographs are born when a person feels comfortable and free. No artificiality — just you, light, and art."}
                </p>
                <p>
                  {isUk
                    ? "Мої роботи публікувались у Vogue Ukraine, Harper's Bazaar, та Elle. Лауреат International Photography Awards 2024 та WPPI Silver Award."
                    : "My work has been published in Vogue Ukraine, Harper's Bazaar, and Elle. Recipient of the International Photography Awards 2024 and WPPI Silver Award."}
                </p>
              </div>
              <div className="flex gap-8 mt-8">
                <div>
                  <span className="block text-2xl font-serif text-[#111]">8+</span>
                  <span className="text-[10px] tracking-[0.15em] uppercase text-[#111]/40">
                    {isUk ? "Років досвіду" : "Years experience"}
                  </span>
                </div>
                <div>
                  <span className="block text-2xl font-serif text-[#111]">500+</span>
                  <span className="text-[10px] tracking-[0.15em] uppercase text-[#111]/40">
                    {isUk ? "Проєктів" : "Projects"}
                  </span>
                </div>
                <div>
                  <span className="block text-2xl font-serif text-[#111]">12</span>
                  <span className="text-[10px] tracking-[0.15em] uppercase text-[#111]/40">
                    {isUk ? "Нагород" : "Awards"}
                  </span>
                </div>
              </div>
            </div>

            {/* Portrait placeholder */}
            <div className="aspect-[3/4] rounded-sm bg-linear-to-br from-[#e8e0d8] to-[#d4a574]/20 flex items-center justify-center">
              <div className="text-center">
                <span className="text-6xl opacity-30">📷</span>
                <p className="text-[10px] tracking-[0.15em] uppercase text-[#111]/30 mt-4">
                  {isUk ? "Портрет фотографа" : "Photographer portrait"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.3em] uppercase text-[#d4a574] mb-3">
            {isUk ? "Що я пропоную" : "What I Offer"}
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-light text-[#111]">
            {isUk ? "Послуги" : "Services"}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {SERVICES.map((service) => (
            <div
              key={service.en}
              className="border border-[#111]/8 rounded-sm p-8 hover:border-[#d4a574]/40 transition-colors group"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="text-3xl">{service.icon}</span>
                  <h3 className="text-lg font-serif text-[#111] mt-3">
                    {isUk ? service.uk : service.en}
                  </h3>
                </div>
                <span className="text-sm font-serif text-[#d4a574]">
                  {service.price}
                </span>
              </div>

              <p className="text-sm text-[#111]/50 leading-relaxed mb-6">
                {isUk ? service.descUk : service.descEn}
              </p>

              <div className="flex flex-wrap gap-4 text-[10px] tracking-[0.1em] uppercase text-[#111]/40 mb-6">
                <span>
                  ◷ {isUk ? service.duration.uk : service.duration.en}
                </span>
                <span>
                  ◈ {isUk ? service.deliverables.uk : service.deliverables.en}
                </span>
              </div>

              <button className="text-xs tracking-[0.15em] uppercase text-[#111] border-b border-[#111]/20 pb-0.5 hover:border-[#d4a574] hover:text-[#d4a574] transition-colors">
                {isUk ? "Запитати" : "Inquire"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── Process Timeline ────────────────────────────────────────────── */}
      <section className="bg-white py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.3em] uppercase text-[#d4a574] mb-3">
              {isUk ? "Як це працює" : "How It Works"}
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-light text-[#111]">
              {isUk ? "Процес" : "Process"}
            </h2>
          </div>

          {/* Desktop horizontal timeline */}
          <div className="hidden md:block">
            <div className="flex items-start">
              {PROCESS_STEPS.map((step, i) => (
                <div key={step.num} className="flex-1 relative text-center px-4">
                  {/* Connector line */}
                  {i < PROCESS_STEPS.length - 1 && (
                    <div className="absolute top-3 left-[calc(50%+12px)] right-0 h-px bg-[#111]/10" />
                  )}
                  {i > 0 && (
                    <div className="absolute top-3 right-[calc(50%+12px)] left-0 h-px bg-[#111]/10" />
                  )}

                  {/* Dot */}
                  <div className="relative inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#111] text-white text-[10px] font-mono mb-5">
                    {step.num}
                  </div>

                  <h3 className="text-sm font-serif text-[#111] mb-2">
                    {isUk ? step.uk : step.en}
                  </h3>
                  <p className="text-xs text-[#111]/40 leading-relaxed">
                    {isUk ? step.descUk : step.descEn}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile vertical timeline */}
          <div className="md:hidden space-y-8">
            {PROCESS_STEPS.map((step, i) => (
              <div key={step.num} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="shrink-0 w-7 h-7 rounded-full bg-[#111] text-white text-[10px] font-mono flex items-center justify-center">
                    {step.num}
                  </div>
                  {i < PROCESS_STEPS.length - 1 && (
                    <div className="w-px flex-1 bg-[#111]/10 mt-2" />
                  )}
                </div>
                <div className="pb-6">
                  <h3 className="text-sm font-serif text-[#111] mb-1">
                    {isUk ? step.uk : step.en}
                  </h3>
                  <p className="text-xs text-[#111]/40 leading-relaxed">
                    {isUk ? step.descUk : step.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Journal ─────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.3em] uppercase text-[#d4a574] mb-3">
            {isUk ? "Блог" : "Latest Stories"}
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-light text-[#111]">
            {isUk ? "Журнал" : "Journal"}
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-8">
          {JOURNAL.map((article, i) => (
            <article key={i} className="group">
              {/* Placeholder image */}
              <div className="aspect-[16/10] rounded-sm bg-[#e8e0d8] mb-5 flex items-center justify-center">
                <span className="text-3xl opacity-30">📝</span>
              </div>
              <p className="text-[10px] tracking-[0.15em] uppercase text-[#111]/30 mb-2">
                {article.date}
              </p>
              <h3 className="text-base font-serif text-[#111] mb-3 leading-snug group-hover:text-[#d4a574] transition-colors">
                {isUk ? article.uk : article.en}
              </h3>
              <p className="text-xs text-[#111]/40 leading-relaxed mb-4">
                {isUk ? article.excerptUk : article.excerptEn}
              </p>
              <a
                href="#"
                className="text-[10px] tracking-[0.15em] uppercase text-[#d4a574] hover:text-[#111] transition-colors"
              >
                {isUk ? "Читати далі" : "Read More"} →
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* ── Testimonials ────────────────────────────────────────────────── */}
      <section className="bg-[#111] text-white py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.3em] uppercase text-[#d4a574] mb-3">
              {isUk ? "Відгуки" : "Kind Words"}
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-light">
              {isUk ? "Що кажуть клієнти" : "Testimonials"}
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="border border-white/10 rounded-sm p-8"
              >
                <span className="text-2xl text-[#d4a574] opacity-40 block mb-4">
                  &ldquo;
                </span>
                <p className="text-sm text-white/60 leading-relaxed mb-6">
                  {isUk ? t.textUk : t.textEn}
                </p>
                <div>
                  <p className="text-sm text-white/90">
                    {isUk ? t.nameUk : t.nameEn}
                  </p>
                  <p className="text-[10px] tracking-[0.1em] uppercase text-[#d4a574]/60 mt-1">
                    {isUk ? t.typeUk : t.typeEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Instagram Feed ──────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-xs tracking-[0.3em] uppercase text-[#d4a574] mb-3">
              @valentyna.photo
            </p>
            <h2 className="text-2xl font-serif font-light text-[#111]">
              Instagram
            </h2>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {[
              { bg: "#e8e0d8", emoji: "📸" },
              { bg: "#ddd5cd", emoji: "📸" },
              { bg: "#e3dbd3", emoji: "📸" },
              { bg: "#d8d0c8", emoji: "📸" },
              { bg: "#ebe3db", emoji: "📸" },
              { bg: "#dfd7cf", emoji: "📸" },
            ].map((item, i) => (
              <div
                key={i}
                className="aspect-square rounded-sm flex items-center justify-center group cursor-pointer relative overflow-hidden"
                style={{ backgroundColor: item.bg }}
              >
                <span className="text-2xl opacity-30 group-hover:opacity-60 transition-opacity">
                  {item.emoji}
                </span>
                <div className="absolute inset-0 bg-[#111]/0 group-hover:bg-[#111]/5 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ─────────────────────────────────────────────────────── */}
      <section className="bg-white py-24">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.3em] uppercase text-[#d4a574] mb-3">
              {isUk ? "Зв'яжіться зі мною" : "Get in Touch"}
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-light text-[#111]">
              {isUk ? "Контакт" : "Contact"}
            </h2>
            <p className="text-sm text-[#111]/40 mt-4">
              {isUk
                ? "Розкажіть про вашу зйомку — я відповім протягом 24 годин"
                : "Tell me about your shoot — I will respond within 24 hours"}
            </p>
          </div>

          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              alert(isUk ? "Дякую! Запит надіслано." : "Thank you! Inquiry sent.");
            }}
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-[#111]/40 mb-2">
                  {isUk ? "Ім'я" : "Name"}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full border border-[#111]/10 rounded-sm px-4 py-3 text-sm bg-transparent focus:border-[#d4a574] focus:outline-none transition-colors"
                  placeholder={isUk ? "Ваше ім'я" : "Your name"}
                />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-[#111]/40 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full border border-[#111]/10 rounded-sm px-4 py-3 text-sm bg-transparent focus:border-[#d4a574] focus:outline-none transition-colors"
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-[#111]/40 mb-2">
                  {isUk ? "Тип зйомки" : "Session Type"}
                </label>
                <select
                  value={formData.sessionType}
                  onChange={(e) =>
                    setFormData({ ...formData, sessionType: e.target.value })
                  }
                  className="w-full border border-[#111]/10 rounded-sm px-4 py-3 text-sm bg-transparent focus:border-[#d4a574] focus:outline-none transition-colors appearance-none"
                >
                  <option value="">
                    {isUk ? "Оберіть тип" : "Select type"}
                  </option>
                  {SESSION_TYPES.map((st) => (
                    <option key={st.en} value={st.en}>
                      {isUk ? st.uk : st.en}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-[#111]/40 mb-2">
                  {isUk ? "Бажана дата" : "Preferred Date"}
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full border border-[#111]/10 rounded-sm px-4 py-3 text-sm bg-transparent focus:border-[#d4a574] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] tracking-[0.15em] uppercase text-[#111]/40 mb-2">
                {isUk ? "Повідомлення" : "Message"}
              </label>
              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                rows={5}
                className="w-full border border-[#111]/10 rounded-sm px-4 py-3 text-sm bg-transparent focus:border-[#d4a574] focus:outline-none transition-colors resize-none"
                placeholder={
                  isUk
                    ? "Розкажіть про вашу ідеальну зйомку..."
                    : "Tell me about your ideal shoot..."
                }
              />
            </div>

            <div className="text-center pt-4">
              <button
                type="submit"
                className="inline-block bg-[#111] text-white text-xs tracking-[0.2em] uppercase px-10 py-4 rounded-sm hover:bg-[#d4a574] transition-colors"
              >
                {isUk ? "Надіслати запит" : "Send Inquiry"}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="border-t border-[#111]/5 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <p className="text-sm tracking-[0.25em] font-serif text-[#111]">
                VALENTYNA
              </p>
              <p className="text-[10px] tracking-[0.1em] uppercase text-[#111]/30 mt-1">
                {isUk ? "Київ, Україна" : "Kyiv, Ukraine"}
              </p>
            </div>

            <div className="flex gap-6">
              {["Instagram", "Pinterest", "Behance"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-[10px] tracking-[0.15em] uppercase text-[#111]/30 hover:text-[#d4a574] transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>

            <p className="text-[10px] tracking-[0.1em] text-[#111]/25">
              &copy; 2026 Valentyna.{" "}
              {isUk ? "Усі права захищено." : "All rights reserved."}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
