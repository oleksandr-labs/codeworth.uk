"use client";

import { useState } from "react";

interface Props { lang: string; }

const WINES = [
  {
    id: 1, emoji: "🍷",
    ukName: "Каберне Совіньон «Нічна зірка»", enName: "Cabernet Sauvignon «Night Star»",
    ukType: "Червоне сухе", enType: "Red Dry",
    ukGrape: "Каберне Совіньон 100%", enGrape: "Cabernet Sauvignon 100%",
    year: 2022, alcohol: "14.2%", price: 680,
    ukDesc: "Оксамитові таніни, чорна смородина, кедр. Витримка 18 місяців у французьких дубових бочках.",
    enDesc: "Velvety tannins, blackcurrant, cedar. Aged 18 months in French oak barrels.",
    ukScore: "94 балів · Wine Spectator UA", enScore: "94 pts · Wine Spectator UA",
    category: "red", featured: true,
  },
  {
    id: 2, emoji: "🥂",
    ukName: "Рислінг «Золотий схил»", enName: "Riesling «Golden Slope»",
    ukType: "Біле сухе", enType: "White Dry",
    ukGrape: "Рислінг 100%", enGrape: "Riesling 100%",
    year: 2023, alcohol: "12.5%", price: 540,
    ukDesc: "Цитрусова свіжість, персик, мінеральний фініш. Ідеально до морепродуктів.",
    enDesc: "Citrus freshness, peach, mineral finish. Perfect pairing with seafood.",
    ukScore: "91 балів · Ukrainian Wine Award", enScore: "91 pts · Ukrainian Wine Award",
    category: "white", featured: false,
  },
  {
    id: 3, emoji: "🌹",
    ukName: "Розе «Літня прогулянка»", enName: "Rosé «Summer Walk»",
    ukType: "Рожеве сухе", enType: "Rosé Dry",
    ukGrape: "Піно Нуар 70%, Гренаш 30%", enGrape: "Pinot Noir 70%, Grenache 30%",
    year: 2023, alcohol: "12.0%", price: 490,
    ukDesc: "Полуниця, малина, квітковий аромат. Легке та освіжаюче — для особливих моментів.",
    enDesc: "Strawberry, raspberry, floral notes. Light and refreshing — for special moments.",
    ukScore: "90 балів · Kyiv Wine Festival", enScore: "90 pts · Kyiv Wine Festival",
    category: "rose", featured: false,
  },
  {
    id: 4, emoji: "🍇",
    ukName: "Мерло «Бархатний берег»", enName: "Merlot «Velvet Shore»",
    ukType: "Червоне напівсухе", enType: "Red Semi-Dry",
    ukGrape: "Мерло 85%, Каберне Фран 15%", enGrape: "Merlot 85%, Cabernet Franc 15%",
    year: 2021, alcohol: "13.8%", price: 760,
    ukDesc: "М'який характер, слива, шоколад, ваніль. Флагман колекції Reserve.",
    enDesc: "Soft character, plum, chocolate, vanilla. The flagship of the Reserve collection.",
    ukScore: "96 балів · Decanter World Wine Awards", enScore: "96 pts · Decanter World Wine Awards",
    category: "red", featured: true,
  },
  {
    id: 5, emoji: "✨",
    ukName: "Шардоне «Туманний ранок»", enName: "Chardonnay «Misty Morning»",
    ukType: "Біле сухе витримане", enType: "Oaked White Dry",
    ukGrape: "Шардоне 100%", enGrape: "Chardonnay 100%",
    year: 2022, alcohol: "13.5%", price: 620,
    ukDesc: "Топлене масло, зелене яблуко, ваніль. 12 місяців витримки у бочках Бургундії.",
    enDesc: "Butter, green apple, vanilla. 12 months aged in Burgundy barrels.",
    ukScore: "93 балів · Mundus Vini", enScore: "93 pts · Mundus Vini",
    category: "white", featured: false,
  },
  {
    id: 6, emoji: "🫧",
    ukName: "Ігристе «Перлина Херсону»", enName: "Sparkling «Pearl of Kherson»",
    ukType: "Ігристе брют", enType: "Sparkling Brut",
    ukGrape: "Шардоне 60%, Піно Нуар 40%", enGrape: "Chardonnay 60%, Pinot Noir 40%",
    year: 2023, alcohol: "11.5%", price: 890,
    ukDesc: "Дрібні бульбашки, зелене яблуко, тост. Метод традиційний (champenoise).",
    enDesc: "Fine bubbles, green apple, brioche toast. Traditional method (champenoise).",
    ukScore: "95 балів · Effervescents du Monde", enScore: "95 pts · Effervescents du Monde",
    category: "sparkling", featured: true,
  },
];

const PAIRINGS = [
  { emoji: "🧀", ukFood: "Витримані сири", enFood: "Aged Cheeses", ukWine: "Каберне Совіньон", enWine: "Cabernet Sauvignon" },
  { emoji: "🦞", ukFood: "Морепродукти", enFood: "Seafood", ukWine: "Рислінг, Шардоне", enWine: "Riesling, Chardonnay" },
  { emoji: "🥩", ukFood: "М'ясо гриль", enFood: "Grilled Meat", ukWine: "Мерло Reserve", enWine: "Merlot Reserve" },
  { emoji: "🍓", ukFood: "Фруктові десерти", enFood: "Fruit Desserts", ukWine: "Розе «Літня прогулянка»", enWine: "Rosé «Summer Walk»" },
];

const AWARDS = [
  { score: "96", comp: "Decanter WWA 2024", wine: "Merlot Reserve" },
  { score: "95", comp: "Effervescents du Monde", wine: "Sparkling Brut" },
  { score: "94", comp: "Wine Spectator UA", wine: "Cab. Sauvignon" },
  { score: "Gold", comp: "Kyiv Wine Festival 2024", wine: "Rosé Collection" },
];

export function VynohradDemo({ lang }: Props) {
  const isUk = lang === "uk";
  const [activeFilter, setActiveFilter] = useState<"all" | "red" | "white" | "rose" | "sparkling">("all");
  const [showTasting, setShowTasting] = useState(false);
  const [selectedWine, setSelectedWine] = useState<number | null>(null);
  const [mobileNav, setMobileNav] = useState(false);

  const filtered = activeFilter === "all" ? WINES : WINES.filter(w => w.category === activeFilter);

  return (
    <div className="min-h-screen bg-[#0F0209] text-white font-sans overflow-x-hidden">

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-50 bg-[#0F0209]/95 backdrop-blur border-b border-white/5">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🍇</span>
            <div>
              <span className="font-black text-[15px] text-white tracking-tight">VYNOHRAD</span>
              <span className="text-[#C9A96E] text-[11px] font-semibold ml-1.5 tracking-widest uppercase">Estate</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-[13px] font-semibold text-white/70">
            {(isUk
              ? ["Вина", "Терруар", "Дегустація", "Нагороди", "Поєднання", "Магазин"]
              : ["Wines", "Terroir", "Tasting", "Awards", "Pairing", "Shop"]
            ).map(l => (
              <a key={l} href="#" className="hover:text-[#C9A96E] transition-colors">{l}</a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowTasting(true)}
              className="hidden md:block px-4 py-2 bg-[#8B1A3C] hover:bg-[#A01F47] text-white text-[12px] font-bold rounded-xl transition-colors border border-[#C9A96E]/30">
              {isUk ? "Забронювати дегустацію" : "Book Tasting"}
            </button>
            <button className="md:hidden" onClick={() => setMobileNav(!mobileNav)}>
              <span className="text-xl text-white/70">☰</span>
            </button>
          </div>
        </div>

        {mobileNav && (
          <div className="md:hidden bg-[#150310] border-t border-white/5 px-5 py-4 flex flex-col gap-3 text-[14px] text-white/80">
            {(isUk
              ? ["Вина", "Терруар", "Дегустація", "Нагороди", "Поєднання", "Магазин"]
              : ["Wines", "Terroir", "Tasting", "Awards", "Pairing", "Shop"]
            ).map(l => (
              <a key={l} href="#" onClick={() => setMobileNav(false)} className="hover:text-[#C9A96E]">{l}</a>
            ))}
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        {/* Decorative grape/vine SVG background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-20 left-10 text-[200px] rotate-12 select-none">🍇</div>
          <div className="absolute bottom-10 right-10 text-[160px] -rotate-12 select-none">🍷</div>
        </div>

        <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-24 pb-20 grid lg:grid-cols-2 gap-16 items-center relative">
          {/* LEFT */}
          <div>
            <div className="inline-flex items-center gap-2 border border-[#C9A96E]/40 text-[#C9A96E] text-[11px] font-bold px-4 py-2 rounded-full mb-8 tracking-widest uppercase bg-[#C9A96E]/5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] animate-pulse" />
              {isUk ? "Виноробня · Херсонська обл. · з 1998" : "Winery · Kherson Region · est. 1998"}
            </div>

            <h1 className="text-[52px] sm:text-[72px] font-black leading-[0.95] mb-8 tracking-tight">
              <span className="text-white italic">{isUk ? "Вино —" : "Wine —"}</span>
              <br />
              <span className="text-[#C9A96E]">{isUk ? "це душа" : "the soul"}</span>
              <br />
              <span className="text-white/50">{isUk ? "нашого терруару" : "of our terroir"}</span>
            </h1>

            <p className="text-white/50 text-[16px] leading-relaxed mb-10 max-w-md">
              {isUk
                ? "25 років на південних схилах Херсонщини. 120 гектарів виноградників, 14 сортів, ручний збір. Кожна пляшка — це рік нашої праці під відкритим небом."
                : "25 years on the southern slopes of Kherson. 120 hectares of vineyards, 14 varietals, hand-harvested. Each bottle is a year of our labour under the open sky."}
            </p>

            <div className="flex flex-wrap gap-3 mb-12">
              <a href="#wines"
                className="px-7 py-4 bg-[#8B1A3C] hover:bg-[#A01F47] text-white font-black rounded-2xl text-[14px] transition-colors border border-[#C9A96E]/20 shadow-lg shadow-[#8B1A3C]/40">
                {isUk ? "🍷 Переглянути колекцію" : "🍷 Explore collection"}
              </a>
              <button
                onClick={() => setShowTasting(true)}
                className="px-7 py-4 border border-white/20 hover:border-[#C9A96E]/60 text-white/80 hover:text-[#C9A96E] font-bold rounded-2xl text-[14px] transition-all">
                {isUk ? "Забронювати дегустацію" : "Book a tasting"}
              </button>
            </div>

            {/* Mini stats */}
            <div className="flex flex-wrap gap-8">
              {[
                { n: "120", l: isUk ? "га виноградника" : "ha vineyard" },
                { n: "14", l: isUk ? "сортів" : "varietals" },
                { n: "24", l: isUk ? "нагороди" : "awards" },
                { n: "1998", l: isUk ? "рік заснування" : "established" },
              ].map(s => (
                <div key={s.l}>
                  <p className="text-[#C9A96E] font-black text-[26px] leading-none">{s.n}</p>
                  <p className="text-white/40 text-[11px] font-semibold uppercase tracking-wide mt-0.5">{s.l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: featured wine mockup card */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm">
              {/* Main card */}
              <div className="bg-gradient-to-b from-[#2E0A1A] to-[#1A0510] rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                {/* Top label zone */}
                <div className="px-7 pt-8 pb-6 border-b border-white/5">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-[#C9A96E] text-[10px] font-bold uppercase tracking-widest mb-1">
                        {isUk ? "Колекція Reserve" : "Reserve Collection"}
                      </p>
                      <p className="text-white font-black text-[18px] leading-snug max-w-[160px]">
                        {isUk ? "Мерло «Бархатний берег»" : "Merlot «Velvet Shore»"}
                      </p>
                    </div>
                    <div className="bg-[#C9A96E] text-[#0F0209] text-[11px] font-black px-2.5 py-1 rounded-lg">
                      96 pts
                    </div>
                  </div>
                  <div className="text-[56px] text-center py-4 select-none">🍷</div>
                </div>
                {/* Details */}
                <div className="px-7 py-5 grid grid-cols-2 gap-3 border-b border-white/5">
                  {[
                    { l: isUk ? "Урожай" : "Vintage", v: "2021" },
                    { l: isUk ? "Алкоголь" : "Alcohol", v: "13.8%" },
                    { l: isUk ? "Виноград" : "Grape", v: "Merlot 85%" },
                    { l: isUk ? "Витримка" : "Aging", v: "18 міс / mo" },
                  ].map(d => (
                    <div key={d.l} className="bg-white/5 rounded-xl px-3 py-2.5">
                      <p className="text-white/40 text-[10px] uppercase tracking-wide">{d.l}</p>
                      <p className="text-white font-bold text-[13px] mt-0.5">{d.v}</p>
                    </div>
                  ))}
                </div>
                {/* Price + CTA */}
                <div className="px-7 py-5 flex items-center justify-between">
                  <div>
                    <p className="text-white/40 text-[11px]">{isUk ? "Роздрібна ціна" : "Retail price"}</p>
                    <p className="text-white font-black text-[24px] leading-none">760 ₴</p>
                  </div>
                  <button className="px-5 py-3 bg-[#8B1A3C] hover:bg-[#A01F47] text-white font-black rounded-2xl text-[13px] transition-colors border border-[#C9A96E]/20">
                    {isUk ? "До кошика" : "Add to cart"}
                  </button>
                </div>
              </div>
              {/* Decanter badge */}
              <div className="absolute -top-3 -left-3 bg-[#C9A96E] text-[#0F0209] text-[10px] font-black px-3 py-2 rounded-xl shadow-lg text-center rotate-[-3deg]">
                <p className="text-[16px] leading-none">🏆</p>
                <p className="uppercase tracking-wide mt-0.5">Decanter</p>
                <p>WWA 2024</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── AWARDS BAND ── */}
      <div className="bg-[#C9A96E] py-4">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-wrap justify-around gap-3">
          {AWARDS.map(a => (
            <div key={a.comp} className="text-center">
              <p className="text-[#0F0209] font-black text-[22px] leading-none">{a.score}</p>
              <p className="text-[#0F0209]/70 text-[10px] font-bold uppercase tracking-wide">{a.comp}</p>
              <p className="text-[#0F0209]/50 text-[9px]">{a.wine}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── WINE CATALOG ── */}
      <section id="wines" className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
        <div className="text-center mb-12">
          <p className="text-[#C9A96E] text-[11px] font-bold uppercase tracking-widest mb-3">
            {isUk ? "Колекція 2024–2025" : "Collection 2024–2025"}
          </p>
          <h2 className="text-[38px] font-black text-white leading-tight">
            {isUk ? "Наші вина" : "Our Wines"}
          </h2>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {([
            { k: "all", ukL: "Усі", enL: "All" },
            { k: "red", ukL: "🍷 Червоні", enL: "🍷 Red" },
            { k: "white", ukL: "🥂 Білі", enL: "🥂 White" },
            { k: "rose", ukL: "🌹 Рожеві", enL: "🌹 Rosé" },
            { k: "sparkling", ukL: "🫧 Ігристі", enL: "🫧 Sparkling" },
          ] as const).map(f => (
            <button
              key={f.k}
              onClick={() => setActiveFilter(f.k)}
              className={`px-4 py-2 rounded-xl text-[13px] font-semibold transition-all ${
                activeFilter === f.k
                  ? "bg-[#8B1A3C] text-white border border-[#C9A96E]/30"
                  : "border border-white/10 text-white/50 hover:border-white/30 hover:text-white/80"
              }`}
            >
              {isUk ? f.ukL : f.enL}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(wine => (
            <div
              key={wine.id}
              onClick={() => setSelectedWine(selectedWine === wine.id ? null : wine.id)}
              className={`bg-[#150310] border rounded-2xl overflow-hidden cursor-pointer transition-all ${
                wine.featured ? "border-[#C9A96E]/40" : "border-white/5 hover:border-white/15"
              }`}>
              {wine.featured && (
                <div className="bg-[#C9A96E]/10 border-b border-[#C9A96E]/20 px-4 py-2 flex items-center gap-2">
                  <span className="text-[10px] text-[#C9A96E] font-bold uppercase tracking-widest">
                    ⭐ {isUk ? "Топ вибір" : "Top pick"}
                  </span>
                </div>
              )}
              <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-[44px]">{wine.emoji}</span>
                  <div className="text-right">
                    <p className="text-[#C9A96E] font-black text-[20px]">{wine.price} ₴</p>
                    <p className="text-white/40 text-[11px]">{isUk ? "за пляшку" : "per bottle"}</p>
                  </div>
                </div>
                <p className="text-[#C9A96E] text-[10px] font-bold uppercase tracking-wide mb-1">
                  {isUk ? wine.ukType : wine.enType} · {wine.year}
                </p>
                <h3 className="text-white font-black text-[16px] leading-snug mb-2">
                  {isUk ? wine.ukName : wine.enName}
                </h3>
                <p className="text-white/50 text-[12px] leading-relaxed mb-3">
                  {isUk ? wine.ukDesc : wine.enDesc}
                </p>

                {selectedWine === wine.id && (
                  <div className="bg-white/5 rounded-xl p-3 mb-3 border border-white/5">
                    <div className="grid grid-cols-2 gap-2 text-[11px] mb-2">
                      <div><span className="text-white/40">{isUk ? "Виноград:" : "Grape:"}</span><br /><span className="text-white/80 font-semibold">{isUk ? wine.ukGrape : wine.enGrape}</span></div>
                      <div><span className="text-white/40">{isUk ? "Алкоголь:" : "Alcohol:"}</span><br /><span className="text-white/80 font-semibold">{wine.alcohol}</span></div>
                    </div>
                    <p className="text-[#C9A96E] text-[10px] font-semibold">🏆 {isUk ? wine.ukScore : wine.enScore}</p>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <button className="flex-1 py-2.5 bg-[#8B1A3C] hover:bg-[#A01F47] text-white font-bold text-[12px] rounded-xl transition-colors">
                    {isUk ? "До кошика" : "Add to cart"}
                  </button>
                  <button className="py-2.5 px-3 border border-white/10 hover:border-[#C9A96E]/40 text-white/50 hover:text-[#C9A96E] rounded-xl text-[12px] transition-all">
                    {selectedWine === wine.id ? "▲" : "▼"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TERROIR STORY ── */}
      <section className="bg-[#150310] border-y border-white/5 py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#C9A96E] text-[11px] font-bold uppercase tracking-widest mb-4">
              {isUk ? "Наш терруар" : "Our Terroir"}
            </p>
            <h2 className="text-[38px] font-black text-white leading-tight mb-6">
              {isUk ? "Південні схили\nХерсонщини" : "Southern slopes\nof Kherson"}
            </h2>
            <p className="text-white/50 text-[15px] leading-relaxed mb-8">
              {isUk
                ? "Чорноземи та супіщані ґрунти, 2 800 годин сонця на рік, вітри з моря — ідеальне поєднання для виноградарства. Ми не перевантажуємо ґрунт хімією: тільки органічні добрива та ручний збір у серпні–жовтні."
                : "Chernozem and sandy loam soils, 2,800 hours of sun per year, sea breezes — ideal conditions for viticulture. We do not overload the soil with chemicals: only organic fertilizers and hand harvesting from August to October."}
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { emoji: "☀️", ukT: "2800 год сонця/рік", enT: "2800 hrs sun/year" },
                { emoji: "🌬️", ukT: "Морський бриз", enT: "Sea breeze" },
                { emoji: "🌱", ukT: "Органічне землеробство", enT: "Organic farming" },
                { emoji: "✋", ukT: "Ручний збір", enT: "Hand harvested" },
              ].map(f => (
                <div key={f.ukT} className="flex items-center gap-3 bg-white/5 rounded-xl p-3.5 border border-white/5">
                  <span className="text-2xl">{f.emoji}</span>
                  <p className="text-white/70 font-semibold text-[13px]">{isUk ? f.ukT : f.enT}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Vineyard data card */}
          <div className="bg-[#0F0209] rounded-3xl border border-white/10 p-7 shadow-2xl">
            <p className="text-[#C9A96E] text-[11px] font-bold uppercase tracking-widest mb-5">
              {isUk ? "Карта виноградника" : "Vineyard map"}
            </p>
            <div className="grid grid-cols-3 gap-2 mb-6">
              {[
                { emoji: "🍇", ukN: "Ділянка A\n(Каберне)", enN: "Plot A\n(Cabernet)", ha: "42 га", color: "bg-[#3D0B1F]" },
                { emoji: "🥂", ukN: "Ділянка B\n(Рислінг)", enN: "Plot B\n(Riesling)", ha: "35 га", color: "bg-[#0F2E3D]" },
                { emoji: "✨", ukN: "Ділянка C\n(Шардоне)", enN: "Plot C\n(Chardonnay)", ha: "28 га", color: "bg-[#1E2B0A]" },
                { emoji: "🌹", ukN: "Ділянка D\n(Піно Нуар)", enN: "Plot D\n(Pinot Noir)", ha: "15 га", color: "bg-[#2E0D2E]" },
                { emoji: "🍷", ukN: "Ділянка E\n(Мерло)", enN: "Plot E\n(Merlot)", ha: "0 га", color: "bg-[#3D1500]" },
                { emoji: "🌿", ukN: "Резерв\n(молоді кущі)", enN: "Reserve\n(new vines)", ha: "12 га", color: "bg-white/5" },
              ].map((p, i) => (
                <div key={i} className={`${p.color} rounded-xl p-2.5 text-center border border-white/5`}>
                  <p className="text-xl mb-1">{p.emoji}</p>
                  <p className="text-white/60 text-[9px] leading-tight whitespace-pre-line">{isUk ? p.ukN : p.enN}</p>
                  <p className="text-[#C9A96E] font-bold text-[11px] mt-1">{p.ha}</p>
                </div>
              ))}
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
              <p className="text-white/30 text-[10px] uppercase tracking-wide mb-1">
                {isUk ? "GPS координати виноробні" : "Winery GPS coordinates"}
              </p>
              <p className="text-white/70 font-mono text-[13px]">46.6354° N, 32.6169° E</p>
              <p className="text-white/40 text-[11px] mt-1">
                {isUk ? "Херсонська обл., Нова Каховка р-н" : "Kherson Region, Nova Kakhovka district"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOD PAIRING ── */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
        <div className="text-center mb-12">
          <p className="text-[#C9A96E] text-[11px] font-bold uppercase tracking-widest mb-3">
            {isUk ? "Гастрономія" : "Gastronomy"}
          </p>
          <h2 className="text-[34px] font-black text-white">
            {isUk ? "Ідеальне поєднання" : "Perfect Pairing"}
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PAIRINGS.map(p => (
            <div key={p.ukFood} className="bg-[#150310] border border-white/5 hover:border-[#C9A96E]/30 rounded-2xl p-5 text-center transition-all">
              <span className="text-[44px] block mb-3">{p.emoji}</span>
              <p className="text-white font-bold text-[14px] mb-1">{isUk ? p.ukFood : p.enFood}</p>
              <p className="text-[#C9A96E] text-[12px] font-semibold">+ {isUk ? p.ukWine : p.enWine}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TASTING CTA ── */}
      <section className="bg-gradient-to-r from-[#8B1A3C] via-[#6B1230] to-[#4A0E22] py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 text-center">
          <p className="text-[#C9A96E] text-[11px] font-bold uppercase tracking-widest mb-4">
            {isUk ? "Запрошуємо до виноробні" : "Visit our winery"}
          </p>
          <h2 className="text-[38px] font-black text-white mb-4">
            {isUk ? "Дегустаційний зал відкритий\nщосуботи 11:00–18:00" : "Tasting room open\nevery Saturday 11:00–18:00"}
          </h2>
          <p className="text-white/60 text-[15px] mb-8 max-w-lg mx-auto">
            {isUk
              ? "Екскурсія по виноградниках, дегустація 6 вин з сомельє, гастрономічне поєднання. Мінімальна група 2 особи."
              : "Vineyard tour, tasting of 6 wines with a sommelier, gastronomic pairing. Minimum group of 2."}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => setShowTasting(true)}
              className="px-8 py-4 bg-[#C9A96E] hover:bg-[#DBB980] text-[#0F0209] font-black rounded-2xl text-[15px] transition-colors shadow-lg shadow-[#C9A96E]/30">
              {isUk ? "🥂 Забронювати місце" : "🥂 Reserve a spot"}
            </button>
            <button className="px-8 py-4 border-2 border-white/30 hover:border-white/60 text-white font-bold rounded-2xl text-[15px] transition-all">
              {isUk ? "1 200 ₴ / особу" : "1,200 ₴ / person"}
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#0A0108] border-t border-white/5 py-10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🍇</span>
            <span className="font-black text-white/80 text-[14px]">VYNOHRAD Estate</span>
            <span className="text-white/20 text-[12px] ml-2">
              {isUk ? "© 2025 · Херсонська обл." : "© 2025 · Kherson Region"}
            </span>
          </div>
          <p className="text-white/20 text-[11px] text-center">
            {isUk
              ? "🔞 Лише для осіб від 18 років. Зловживання алкоголем шкодить здоров'ю."
              : "🔞 For persons over 18 only. Alcohol abuse is harmful to health."}
          </p>
        </div>
      </footer>

      {/* ── TASTING BOOKING MODAL ── */}
      {showTasting && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#150310] border border-[#C9A96E]/30 rounded-3xl p-7 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-black text-[20px]">
                {isUk ? "Бронювання дегустації" : "Tasting Reservation"}
              </h3>
              <button onClick={() => setShowTasting(false)} className="text-white/40 hover:text-white text-xl">✕</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-[#C9A96E] text-[11px] font-bold uppercase tracking-wide block mb-2">
                  {isUk ? "Ваше ім'я" : "Your name"}
                </label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-[14px] placeholder-white/30 focus:border-[#C9A96E]/50 outline-none" placeholder={isUk ? "Іван Коваленко" : "Ivan Kovalenko"} />
              </div>
              <div>
                <label className="text-[#C9A96E] text-[11px] font-bold uppercase tracking-wide block mb-2">
                  {isUk ? "Дата та час" : "Date & time"}
                </label>
                <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-[14px] focus:border-[#C9A96E]/50 outline-none">
                  <option value="">{isUk ? "Обрати суботу" : "Choose Saturday"}</option>
                  <option>10.05.2025 · 11:00</option>
                  <option>17.05.2025 · 14:00</option>
                  <option>24.05.2025 · 11:00</option>
                </select>
              </div>
              <div>
                <label className="text-[#C9A96E] text-[11px] font-bold uppercase tracking-wide block mb-2">
                  {isUk ? "Кількість осіб" : "Number of guests"}
                </label>
                <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-[14px] focus:border-[#C9A96E]/50 outline-none">
                  <option>2 {isUk ? "особи" : "guests"}</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5+</option>
                </select>
              </div>
              <button className="w-full py-4 bg-[#8B1A3C] hover:bg-[#A01F47] text-white font-black rounded-2xl text-[15px] transition-colors border border-[#C9A96E]/20 mt-2">
                {isUk ? "Підтвердити бронювання" : "Confirm reservation"}
              </button>
              <p className="text-white/30 text-[11px] text-center">
                {isUk ? "1 200 ₴/особу · Передоплата 50%" : "1,200 ₴/person · 50% prepayment"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
