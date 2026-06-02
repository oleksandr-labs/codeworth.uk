"use client";

import { useState } from "react";

const STYLES = ["Всі", "Realism", "Geometric", "Watercolor", "Blackwork", "Fine Line"];
const STYLES_EN = ["All", "Realism", "Geometric", "Watercolor", "Blackwork", "Fine Line"];

const GALLERY = [
  { id: 1, nameUk: "Тигр у реалізмі", nameEn: "Tiger Realism", style: "Realism", artistUk: "Олексій", artistEn: "Alex" },
  { id: 2, nameUk: "Портрет очей", nameEn: "Eye Portrait", style: "Realism", artistUk: "Олексій", artistEn: "Alex" },
  { id: 3, nameUk: "Вовк реалізм", nameEn: "Wolf Realism", style: "Realism", artistUk: "Олексій", artistEn: "Alex" },
  { id: 4, nameUk: "Мандала", nameEn: "Mandala", style: "Geometric", artistUk: "Марина", artistEn: "Marina" },
  { id: 5, nameUk: "Сакральна геометрія", nameEn: "Sacred Geometry", style: "Geometric", artistUk: "Марина", artistEn: "Marina" },
  { id: 6, nameUk: "Геометричний лев", nameEn: "Geometric Lion", style: "Geometric", artistUk: "Марина", artistEn: "Marina" },
  { id: 7, nameUk: "Акварельний кіт", nameEn: "Watercolor Cat", style: "Watercolor", artistUk: "Марина", artistEn: "Marina" },
  { id: 8, nameUk: "Весняна гілка", nameEn: "Spring Branch", style: "Watercolor", artistUk: "Соня", artistEn: "Sonya" },
  { id: 9, nameUk: "Чорний дракон", nameEn: "Black Dragon", style: "Blackwork", artistUk: "Дмитро", artistEn: "Dima" },
  { id: 10, nameUk: "Чорний орнамент", nameEn: "Black Ornament", style: "Blackwork", artistUk: "Дмитро", artistEn: "Dima" },
  { id: 11, nameUk: "Тонка гілка", nameEn: "Fine Branch", style: "Fine Line", artistUk: "Дмитро", artistEn: "Dima" },
  { id: 12, nameUk: "Мінімалізм", nameEn: "Minimalism", style: "Fine Line", artistUk: "Соня", artistEn: "Sonya" },
];

const GALLERY_EMOJIS: Record<string, string> = {
  Realism: "🐯",
  Geometric: "⬡",
  Watercolor: "🌸",
  Blackwork: "🖤",
  "Fine Line": "🌿",
};

const ARTISTS = [
  {
    initials: "ОВ",
    nameUk: "Олексій",
    nameEn: "Alex",
    specUk: ["Реалізм"],
    specEn: ["Realism"],
    years: 8,
    emoji: "🎨",
  },
  {
    initials: "МК",
    nameUk: "Марина",
    nameEn: "Marina",
    specUk: ["Геометрія", "Акварель"],
    specEn: ["Geometric", "Watercolor"],
    years: 5,
    emoji: "✏️",
  },
  {
    initials: "ДС",
    nameUk: "Дмитро",
    nameEn: "Dima",
    specUk: ["Блекворк", "Fine Line"],
    specEn: ["Blackwork", "Fine Line"],
    years: 6,
    emoji: "🖊️",
  },
  {
    initials: "СП",
    nameUk: "Соня",
    nameEn: "Sonya",
    specUk: ["Всі стилі"],
    specEn: ["All styles"],
    years: 4,
    emoji: "🌹",
  },
];

const FLASH = [
  { nameUk: "Череп і троянда", nameEn: "Skull rose", size: "10×8cm", original: 1200, sale: 840, styleUk: "Блекворк", styleEn: "Blackwork" },
  { nameUk: "Змія і кинджал", nameEn: "Snake dagger", size: "8×12cm", original: 1500, sale: 1050, styleUk: "Реалізм", styleEn: "Realism" },
  { nameUk: "Метелик", nameEn: "Moth", size: "6×6cm", original: 800, sale: 560, styleUk: "Fine Line", styleEn: "Fine Line" },
  { nameUk: "Японський короп", nameEn: "Japanese koi", size: "12×15cm", original: 2500, sale: 1750, styleUk: "Японський", styleEn: "Japanese" },
  { nameUk: "Геометричний вовк", nameEn: "Geometric wolf", size: "10×10cm", original: 1800, sale: 1260, styleUk: "Геометрія", styleEn: "Geometric" },
  { nameUk: "Тонка квітка", nameEn: "Fine line flower", size: "5×8cm", original: 700, sale: 490, styleUk: "Fine Line", styleEn: "Fine Line" },
];

const NAV_LINKS_UK = ["Галерея", "Майстри", "Ціни", "Запис"];
const NAV_LINKS_EN = ["Gallery", "Artists", "Prices", "Book"];

export function InkCityDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [activeFilter, setActiveFilter] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    artist: "",
    style: "",
    reference: "",
    date: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const filters = isUk ? STYLES : STYLES_EN;

  const filteredGallery =
    activeFilter === 0
      ? GALLERY
      : GALLERY.filter((item) => item.style === STYLES_EN[activeFilter]);

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-stone-300 font-sans">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-zinc-950/95 backdrop-blur border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🖋</span>
            <span className="text-xl font-bold tracking-widest text-white uppercase">InkCity</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {(isUk ? NAV_LINKS_UK : NAV_LINKS_EN).map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm tracking-wide text-stone-400 hover:text-white transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button className="hidden md:inline-flex px-5 py-2 rounded-lg bg-rose-500 hover:bg-rose-600 transition-colors text-white text-sm font-semibold tracking-wide">
              {isUk ? "Записатись" : "Book Now"}
            </button>
            <button
              className="md:hidden text-stone-400 hover:text-white"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-zinc-900 border-t border-zinc-800 px-4 py-4 flex flex-col gap-4">
            {(isUk ? NAV_LINKS_UK : NAV_LINKS_EN).map((link) => (
              <a key={link} href="#" className="text-stone-400 hover:text-white text-sm tracking-wide">
                {link}
              </a>
            ))}
            <button className="w-full px-5 py-2 rounded-lg bg-rose-500 hover:bg-rose-600 transition-colors text-white text-sm font-semibold">
              {isUk ? "Записатись" : "Book Now"}
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section
        className="relative overflow-hidden py-28 sm:py-36 px-4"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 40%, #18181b 0%, #09090b 100%)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 20% 50%, rgba(244,63,94,0.12) 0%, transparent 55%), radial-gradient(circle at 80% 20%, rgba(244,63,94,0.08) 0%, transparent 50%)",
          }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="text-rose-500 text-xs tracking-[0.3em] uppercase mb-6 font-semibold">
            {isUk ? "Дніпро · З 2016 року" : "Dnipro · Since 2016"}
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-none tracking-tight mb-6">
            {isUk ? "Мистецтво на твоїй шкірі" : "Art on Your Skin"}
          </h1>
          <p className="text-stone-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            {isUk
              ? "InkCity — преміум тату-студія в Дніпрі. Реалізм, геометрія, блекворк і fine line від майстрів з 4+ роками досвіду. Твоя ідея — наше мистецтво."
              : "InkCity — a premium tattoo studio in Dnipro. Realism, geometric, blackwork and fine line by artists with 4+ years of experience. Your idea — our art."}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-8 py-3 rounded-xl bg-rose-500 hover:bg-rose-600 transition-colors text-white font-bold tracking-wide text-sm shadow-lg shadow-rose-900/40">
              {isUk ? "Записатись на Консультацію" : "Book a Consultation"}
            </button>
            <button className="px-8 py-3 rounded-xl border border-zinc-700 hover:border-rose-500 hover:text-rose-400 transition-colors text-stone-300 font-semibold text-sm">
              {isUk ? "Переглянути Галерею" : "View Gallery"}
            </button>
          </div>
          <div className="mt-14 flex flex-wrap gap-8 justify-center">
            {[
              { numUk: "8+", numEn: "8+", labelUk: "Років досвіду", labelEn: "Years of experience" },
              { numUk: "2 000+", numEn: "2 000+", labelUk: "Тату виконано", labelEn: "Tattoos done" },
              { numUk: "4", numEn: "4", labelUk: "Майстри", labelEn: "Artists" },
              { numUk: "100%", numEn: "100%", labelUk: "Стерильність", labelEn: "Sterility" },
            ].map((stat) => (
              <div key={stat.labelEn} className="text-center">
                <p className="text-3xl font-black text-white">{isUk ? stat.numUk : stat.numEn}</p>
                <p className="text-stone-500 text-xs tracking-wide mt-1">{isUk ? stat.labelUk : stat.labelEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STYLE FILTER GALLERY */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-rose-500 text-xs tracking-[0.3em] uppercase font-semibold mb-3">
              {isUk ? "Портфоліо" : "Portfolio"}
            </p>
            <h2 className="text-4xl font-black text-white">
              {isUk ? "Наші Роботи" : "Our Work"}
            </h2>
          </div>

          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {filters.map((f, i) => (
              <button
                key={f}
                onClick={() => setActiveFilter(i)}
                className={`px-5 py-2 rounded-full text-sm font-semibold tracking-wide transition-all ${
                  activeFilter === i
                    ? "bg-rose-500 text-white shadow-lg shadow-rose-900/40"
                    : "bg-zinc-900 text-stone-400 hover:text-white border border-zinc-800"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredGallery.map((item) => (
              <div
                key={item.id}
                className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-rose-500/40 transition-colors group"
              >
                <div className="h-40 flex items-center justify-center text-6xl bg-zinc-800 group-hover:bg-zinc-700/80 transition-colors">
                  {GALLERY_EMOJIS[item.style] ?? "🖋"}
                </div>
                <div className="p-3">
                  <p className="text-white text-sm font-semibold leading-tight mb-2">
                    {isUk ? item.nameUk : item.nameEn}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-400 text-xs font-medium">
                      {item.style}
                    </span>
                    <span className="text-stone-500 text-xs">
                      {isUk ? item.artistUk : item.artistEn}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ARTIST PROFILES */}
      <section className="py-20 px-4 bg-zinc-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-rose-500 text-xs tracking-[0.3em] uppercase font-semibold mb-3">
              {isUk ? "Команда" : "Team"}
            </p>
            <h2 className="text-4xl font-black text-white">
              {isUk ? "Наші Майстри" : "Our Artists"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ARTISTS.map((artist) => (
              <div
                key={artist.nameEn}
                className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 flex flex-col items-center text-center hover:border-rose-500/30 transition-colors"
              >
                <div className="w-20 h-20 rounded-full bg-zinc-800 border-2 border-rose-500/40 flex items-center justify-center text-3xl mb-4 shadow-lg">
                  {artist.emoji}
                </div>
                <h3 className="text-white font-bold text-lg mb-1">
                  {isUk ? artist.nameUk : artist.nameEn}
                </h3>
                <p className="text-stone-500 text-xs mb-4">
                  {isUk
                    ? `${artist.years} ${artist.years === 1 ? "рік" : artist.years < 5 ? "роки" : "років"} досвіду`
                    : `${artist.years} yr${artist.years !== 1 ? "s" : ""} experience`}
                </p>
                <div className="flex flex-wrap gap-1.5 justify-center mb-5">
                  {(isUk ? artist.specUk : artist.specEn).map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-400 text-xs font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <a
                  href="#"
                  className="mt-auto w-full py-2 rounded-lg border border-rose-500/50 text-rose-400 hover:bg-rose-500 hover:text-white transition-all text-sm font-semibold"
                >
                  {isUk
                    ? `Записатись до ${artist.nameUk}`
                    : `Book with ${artist.nameEn}`}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FLASH SALE */}
      <section className="py-20 px-4 bg-rose-950/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold tracking-widest uppercase mb-4">
              {isUk ? "Обмежена пропозиція" : "Limited offer"}
            </span>
            <h2 className="text-4xl font-black text-white mb-3">
              {isUk ? "Flash-розпродаж" : "Flash Sale"}
            </h2>
            <p className="text-stone-400 max-w-xl mx-auto text-sm leading-relaxed">
              {isUk
                ? "Закрий вільні слоти — флеш зі знижкою 30%. Готові ескізи, без очікування."
                : "Fill open slots — flash designs at 30% off. Ready sketches, no wait time."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FLASH.map((item) => (
              <div
                key={item.nameEn}
                className="bg-zinc-900 rounded-2xl border border-rose-500/20 p-5 hover:border-rose-500/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-white font-bold text-base leading-tight">
                      {isUk ? item.nameUk : item.nameEn}
                    </h3>
                    <p className="text-stone-500 text-xs mt-0.5">{item.size}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-400 text-xs font-medium whitespace-nowrap">
                    {isUk ? item.styleUk : item.styleEn}
                  </span>
                </div>
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-2xl font-black text-rose-400">{item.sale}₴</span>
                  <span className="text-stone-600 text-sm line-through">{item.original}₴</span>
                  <span className="ml-auto text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                    −30%
                  </span>
                </div>
                <button className="w-full py-2 rounded-xl bg-rose-500 hover:bg-rose-600 transition-colors text-white text-sm font-bold tracking-wide">
                  {isUk ? "Забронювати Flash" : "Book Flash"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING FORM */}
      <section className="py-20 px-4 bg-zinc-900">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-rose-500 text-xs tracking-[0.3em] uppercase font-semibold mb-3">
              {isUk ? "Консультація" : "Consultation"}
            </p>
            <h2 className="text-4xl font-black text-white">
              {isUk ? "Запис на Консультацію" : "Book a Consultation"}
            </h2>
            <p className="text-stone-500 text-sm mt-3">
              {isUk
                ? "Безкоштовно, без зобов'язань. Обговоримо ідею та підберемо майстра."
                : "Free, no obligations. We'll discuss your idea and match you with an artist."}
            </p>
          </div>

          {submitted ? (
            <div className="bg-zinc-800 rounded-2xl border border-rose-500/30 p-10 text-center">
              <div className="text-5xl mb-4">🖋</div>
              <h3 className="text-white text-2xl font-black mb-2">
                {isUk ? "Заявку прийнято!" : "Request Received!"}
              </h3>
              <p className="text-stone-400 text-sm">
                {isUk
                  ? "Ми зв'яжемося з вами протягом 2 годин для підтвердження."
                  : "We'll contact you within 2 hours to confirm your booking."}
              </p>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", artist: "", style: "", reference: "", date: "" }); }}
                className="mt-6 px-6 py-2 rounded-xl border border-zinc-600 text-stone-400 hover:text-white hover:border-rose-500 transition-colors text-sm"
              >
                {isUk ? "Нова заявка" : "New request"}
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-zinc-800/60 rounded-2xl border border-zinc-700 p-6 sm:p-8 flex flex-col gap-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-stone-400 text-xs font-semibold tracking-wide uppercase">
                    {isUk ? "Ваше ім'я" : "Your Name"}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleFormChange}
                    required
                    placeholder={isUk ? "Як вас звати?" : "Your name"}
                    className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm placeholder-stone-600 focus:outline-none focus:border-rose-500 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-stone-400 text-xs font-semibold tracking-wide uppercase">
                    {isUk ? "Телефон" : "Phone"}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleFormChange}
                    required
                    placeholder="+380 XX XXX XX XX"
                    className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm placeholder-stone-600 focus:outline-none focus:border-rose-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-stone-400 text-xs font-semibold tracking-wide uppercase">
                    {isUk ? "Майстер" : "Artist"}
                  </label>
                  <select
                    name="artist"
                    value={form.artist}
                    onChange={handleFormChange}
                    className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-500 transition-colors text-white appearance-none"
                  >
                    <option value="" className="text-stone-500">
                      {isUk ? "Не важливо" : "No preference"}
                    </option>
                    {ARTISTS.map((a) => (
                      <option key={a.nameEn} value={a.nameEn} className="text-white">
                        {isUk ? a.nameUk : a.nameEn}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-stone-400 text-xs font-semibold tracking-wide uppercase">
                    {isUk ? "Стиль" : "Style"}
                  </label>
                  <select
                    name="style"
                    value={form.style}
                    onChange={handleFormChange}
                    className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-500 transition-colors text-white appearance-none"
                  >
                    <option value="" className="text-stone-500">
                      {isUk ? "Оберіть стиль" : "Choose style"}
                    </option>
                    {["Realism", "Geometric", "Watercolor", "Blackwork", "Fine Line"].map((s) => (
                      <option key={s} value={s} className="text-white">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-stone-400 text-xs font-semibold tracking-wide uppercase">
                  {isUk ? "Опис ідеї / референс" : "Idea description / reference"}
                </label>
                <textarea
                  name="reference"
                  value={form.reference}
                  onChange={handleFormChange}
                  rows={4}
                  placeholder={
                    isUk
                      ? "Опишіть свою ідею: сюжет, розмір, місце на тілі, посилання на референс..."
                      : "Describe your idea: subject, size, placement, reference links..."
                  }
                  className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm placeholder-stone-600 focus:outline-none focus:border-rose-500 transition-colors resize-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-stone-400 text-xs font-semibold tracking-wide uppercase">
                  {isUk ? "Бажана дата" : "Preferred date"}
                </label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleFormChange}
                  className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-rose-500 transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-rose-500 hover:bg-rose-600 transition-colors text-white font-black tracking-wide text-base shadow-lg shadow-rose-900/30 mt-2"
              >
                {isUk ? "Записатись" : "Book Now"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-zinc-950 border-t border-zinc-800 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">🖋</span>
                <span className="text-lg font-black tracking-widest text-white uppercase">InkCity</span>
              </div>
              <p className="text-stone-500 text-xs leading-relaxed">
                {isUk
                  ? "Преміум тату-студія та пірсинг у Дніпрі. Мистецтво, якому можна довіряти."
                  : "Premium tattoo studio & piercing in Dnipro. Art you can trust."}
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm tracking-wide uppercase mb-4">
                {isUk ? "Адреса" : "Address"}
              </h4>
              <p className="text-stone-500 text-sm leading-relaxed">
                {isUk ? "вул. Артема, 12, офіс 3" : "12 Artyoma St., office 3"}
                <br />
                {isUk ? "Дніпро, Україна" : "Dnipro, Ukraine"}
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm tracking-wide uppercase mb-4">
                {isUk ? "Години роботи" : "Working Hours"}
              </h4>
              <p className="text-stone-500 text-sm leading-relaxed">
                {isUk ? "Пн–Нд: 10:00–20:00" : "Mon–Sun: 10:00–20:00"}
                <br />
                <span className="text-emerald-500 text-xs font-semibold">
                  {isUk ? "Зараз відкрито" : "Open now"}
                </span>
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm tracking-wide uppercase mb-4">
                {isUk ? "Контакти" : "Contact"}
              </h4>
              <div className="flex flex-col gap-2">
                <a href="tel:+380501234567" className="text-stone-500 hover:text-rose-400 transition-colors text-sm">
                  +38 (050) 123-45-67
                </a>
                <div className="flex gap-3 mt-2">
                  <a
                    href="#"
                    className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-rose-500 flex items-center justify-center text-stone-400 hover:text-rose-400 transition-colors text-base"
                    aria-label="Instagram"
                  >
                    📷
                  </a>
                  <a
                    href="#"
                    className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-rose-500 flex items-center justify-center text-stone-400 hover:text-rose-400 transition-colors text-base"
                    aria-label="TikTok"
                  >
                    🎵
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-stone-600 text-xs">
              © 2024 InkCity.{" "}
              {isUk ? "Всі права захищені." : "All rights reserved."}
            </p>
            <p className="text-stone-700 text-xs">
              {isUk
                ? "Стерильне обладнання · Сертифіковані майстри"
                : "Sterile equipment · Certified artists"}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
