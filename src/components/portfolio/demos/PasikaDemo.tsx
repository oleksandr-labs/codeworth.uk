"use client";

import { useState } from "react";

interface Props { lang: string; }

const HONEY_TYPES = [
  {
    id: 1,
    emoji: "🌻",
    ukName: "Соняшниковий мед", enName: "Sunflower Honey",
    ukSubtitle: "Серпень–вересень · Полтавщина", enSubtitle: "August–September · Poltava region",
    ukDesc: "Золотий, з легкою карамельністю. Найпопулярніший у нашій пасіці. Чудово засіває — сигнал чистоти!",
    enDesc: "Golden with a light caramel note. The most popular from our apiary. Crystallises beautifully — a sign of purity!",
    price: 280, volume: "500 г", color: "bg-amber-50 border-amber-200",
    textColor: "text-amber-800", badgeColor: "bg-amber-400 text-amber-900",
    ukTag: "🏆 Бестселер", enTag: "🏆 Bestseller", featured: true,
  },
  {
    id: 2,
    emoji: "🌿",
    ukName: "Гречаний мед", enName: "Buckwheat Honey",
    ukSubtitle: "Липень · Черкащина", enSubtitle: "July · Cherkasy region",
    ukDesc: "Темний, насичений, з пряними нотами. Рекордний вміст заліза та антиоксидантів. Для тих, хто цінує силу.",
    enDesc: "Dark, rich, with spicy notes. Record iron content and antioxidants. For those who value strength.",
    price: 340, volume: "500 г", color: "bg-amber-100 border-amber-300",
    textColor: "text-amber-900", badgeColor: "bg-amber-700 text-white",
    ukTag: "💪 Лікувальний", enTag: "💪 Medicinal", featured: true,
  },
  {
    id: 3,
    emoji: "🌸",
    ukName: "Акацієвий мед", enName: "Acacia Honey",
    ukSubtitle: "Червень · Вінниччина", enSubtitle: "June · Vinnytsia region",
    ukDesc: "Ніжний, прозорий, довго не засіває. Гіпоалергенний — підходить дітям. М'який квітковий аромат.",
    enDesc: "Delicate, clear, stays liquid for a long time. Hypoallergenic — suitable for children. Soft floral aroma.",
    price: 390, volume: "500 г", color: "bg-yellow-50 border-yellow-200",
    textColor: "text-yellow-800", badgeColor: "bg-yellow-400 text-yellow-900",
    ukTag: "👶 Для дітей", enTag: "👶 Kids-safe", featured: false,
  },
  {
    id: 4,
    emoji: "🌲",
    ukName: "Лісовий мед", enName: "Forest Honey",
    ukSubtitle: "Липень–серпень · Карпати", enSubtitle: "July–August · Carpathians",
    ukDesc: "Бурштиновий, із хвойними нотами та смолистим ароматом. Зібраний у заповідних Карпатах.",
    enDesc: "Amber-coloured with conifer notes and a resinous aroma. Collected in protected Carpathian forests.",
    price: 480, volume: "500 г", color: "bg-orange-50 border-orange-200",
    textColor: "text-orange-800", badgeColor: "bg-orange-500 text-white",
    ukTag: "🌲 Карпати", enTag: "🌲 Carpathian", featured: false,
  },
  {
    id: 5,
    emoji: "🪷",
    ukName: "Медовий горіх з прополісом", enName: "Honey Nut with Propolis",
    ukSubtitle: "Лімітована партія · 300 шт", enSubtitle: "Limited batch · 300 jars",
    ukDesc: "Суміш натурального меду, волоського горіха та прополісу. Імунний суперфуд на зиму.",
    enDesc: "Blend of natural honey, walnut, and propolis. Immune superfoods for winter health.",
    price: 520, volume: "400 г", color: "bg-stone-50 border-stone-200",
    textColor: "text-stone-800", badgeColor: "bg-stone-600 text-white",
    ukTag: "⚡ Ліміт", enTag: "⚡ Limited", featured: false,
  },
  {
    id: 6,
    emoji: "🌼",
    ukName: "Різнотрав'я «Полтавський луг»", enName: "Wildflower «Poltava Meadow»",
    ukSubtitle: "Травень–червень · Полтавщина", enSubtitle: "May–June · Poltava region",
    ukDesc: "20+ видів лугових трав у одній банці. Кожного сезону — неповторний смак. Улюбленець гурманів.",
    enDesc: "20+ meadow flower species in one jar. Every season brings a unique flavour. A gourmet favourite.",
    price: 310, volume: "500 г", color: "bg-lime-50 border-lime-200",
    textColor: "text-lime-800", badgeColor: "bg-lime-500 text-lime-900",
    ukTag: "🌈 Різнотрав'я", enTag: "🌈 Wildflower", featured: false,
  },
];

const GIFT_SETS = [
  {
    id: 1, emoji: "🎁",
    ukName: "Подарунковий набір «Весна»", enName: "Gift set «Spring»",
    ukDesc: "3 банки меду (акація, різнотрав'я, соняшник) + дерев'яна ложка", enDesc: "3 honey jars (acacia, wildflower, sunflower) + wooden honey spoon",
    price: 980, ukTag: "Хіт продажів", enTag: "Top seller",
    color: "bg-amber-400",
  },
  {
    id: 2, emoji: "👑",
    ukName: "Набір «Преміум Карпати»", enName: "«Premium Carpathian» set",
    ukDesc: "Лісовий + гречаний мед, прополісна настойка, бджолиний пилок, крафтова коробка",
    enDesc: "Forest + buckwheat honey, propolis tincture, bee pollen, craft wooden box",
    price: 1750, ukTag: "Для VIP", enTag: "For VIP",
    color: "bg-amber-700",
  },
  {
    id: 3, emoji: "❤️",
    ukName: "Набір «Здоров'я» × 5 видів", enName: "«Health» set × 5 types",
    ukDesc: "Соняшниковий, гречаний, акацієвий, лісовий + медовий горіх — усе в одному", enDesc: "Sunflower, buckwheat, acacia, forest + honey nut — all in one set",
    price: 1350, ukTag: "Для родини", enTag: "Family set",
    color: "bg-orange-500",
  },
];

const MONTHS_UA = ["Січ", "Лют", "Бер", "Кві", "Тра", "Чер", "Лип", "Сер", "Вер", "Жов", "Лис", "Гру"];
const MONTHS_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const HARVEST_CAL = [
  { ukName: "Акація", enName: "Acacia", months: [5, 6], emoji: "🌸" },
  { ukName: "Різнотрав'я", enName: "Wildflower", months: [4, 5, 6], emoji: "🌼" },
  { ukName: "Гречка", enName: "Buckwheat", months: [6, 7], emoji: "🌿" },
  { ukName: "Соняшник", enName: "Sunflower", months: [7, 8], emoji: "🌻" },
  { ukName: "Лісовий", enName: "Forest", months: [6, 7, 8], emoji: "🌲" },
];

export function PasikaDemo({ lang }: Props) {
  const isUk = lang === "uk";
  const [activeTab, setActiveTab] = useState<"honey" | "gifts">("honey");
  const [mobileNav, setMobileNav] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const months = isUk ? MONTHS_UA : MONTHS_EN;

  return (
    <div className="min-h-screen bg-[#FFFBF0] text-amber-950 font-sans overflow-x-hidden">

      {/* ── TOP PROMO BAR ── */}
      <div className="w-full bg-amber-800 py-2 px-5 text-center text-[12px] text-amber-100 font-semibold tracking-wide">
        🍯 {isUk
          ? "Безкоштовна доставка від 800 ₴ · Нова Пошта по всій Україні"
          : "Free delivery from 800 ₴ · Nova Post across Ukraine"}
      </div>

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-50 bg-[#FFFBF0]/95 backdrop-blur border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-amber-400 rounded-full flex items-center justify-center text-lg shadow-sm">🐝</div>
            <div>
              <span className="font-black text-[17px] text-amber-900 tracking-tight">Пасіка</span>
              <span className="text-amber-500 font-bold text-[15px]">Мед</span>
              <p className="text-amber-700/60 text-[9px] font-semibold uppercase tracking-widest -mt-0.5">
                {isUk ? "з 2003 · Полтавщина" : "since 2003 · Poltava"}
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-7 text-[13px] font-semibold text-amber-700/70">
            {(isUk
              ? ["Наш мед", "Подарунки", "Пасіка", "Здоров'я", "Доставка", "Контакти"]
              : ["Our Honey", "Gift Sets", "Apiary", "Health", "Delivery", "Contact"]
            ).map(l => (
              <a key={l} href="#" className="hover:text-amber-800 transition-colors">{l}</a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCart(!showCart)}
              className="relative px-4 py-2 bg-amber-400 hover:bg-amber-500 text-amber-900 text-[13px] font-bold rounded-xl transition-colors shadow-sm">
              🛒 {isUk ? "Кошик" : "Cart"}
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-800 text-white text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center px-1">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="md:hidden ml-1" onClick={() => setMobileNav(!mobileNav)}>
              <span className="text-amber-700 text-xl">☰</span>
            </button>
          </div>
        </div>
        {mobileNav && (
          <div className="md:hidden bg-amber-50 border-t border-amber-200 px-5 py-4 flex flex-col gap-3 text-[14px] text-amber-800">
            {(isUk
              ? ["Наш мед", "Подарунки", "Пасіка", "Здоров'я", "Доставка", "Контакти"]
              : ["Our Honey", "Gift Sets", "Apiary", "Health", "Delivery", "Contact"]
            ).map(l => (
              <a key={l} href="#" onClick={() => setMobileNav(false)} className="hover:text-amber-600">{l}</a>
            ))}
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-amber-50 via-[#FFFBF0] to-orange-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-20 grid lg:grid-cols-[440px_1fr] gap-12 xl:gap-20 items-center">

          {/* LEFT: large honey jar visual */}
          <div className="flex justify-center">
            <div className="relative w-80 h-80">
              {/* Large jar mockup */}
              <div className="absolute inset-0 bg-amber-100 rounded-[50%_50%_40%_40%/40%_40%_60%_60%] border-4 border-amber-200 shadow-2xl shadow-amber-300/40 flex flex-col items-center justify-center">
                <span className="text-[100px] select-none drop-shadow-md">🍯</span>
                <p className="font-black text-amber-800 text-[14px] mt-2">500 г · 100% натур.</p>
              </div>
              {/* Floating badges */}
              <div className="absolute top-4 -right-4 bg-amber-400 border-2 border-amber-200 rounded-2xl px-3 py-2 shadow-lg text-center rotate-6">
                <p className="text-amber-900 font-black text-[18px] leading-none">22+</p>
                <p className="text-amber-800 text-[10px] font-bold">{isUk ? "роки досвіду" : "yrs exp."}</p>
              </div>
              <div className="absolute bottom-6 -left-6 bg-white border-2 border-amber-200 rounded-2xl px-3 py-2 shadow-md rotate-[-4deg]">
                <p className="text-amber-700 font-black text-[13px]">🐝 180 {isUk ? "вуликів" : "hives"}</p>
              </div>
              <div className="absolute top-1/2 -right-8 bg-amber-800 text-white rounded-full w-14 h-14 flex flex-col items-center justify-center shadow-lg">
                <p className="font-black text-[16px] leading-none">BIO</p>
                <p className="text-[8px] text-amber-200">cert.</p>
              </div>
            </div>
          </div>

          {/* RIGHT: text */}
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-100 border border-amber-300 text-amber-700 text-[11px] font-bold px-3.5 py-1.5 rounded-full mb-7 tracking-widest uppercase">
              <span>🐝</span>
              {isUk ? "Сімейна пасіка · Полтавщина · з 2003" : "Family apiary · Poltava Region · since 2003"}
            </div>

            <h1 className="text-[48px] sm:text-[64px] font-black text-amber-900 leading-[0.95] mb-6" style={{ letterSpacing: "-0.02em" }}>
              {isUk
                ? <><span className="text-amber-600">Справжній</span><br />мед від бджоляра<br /><span className="text-amber-400">Петра Савченка</span></>
                : <><span className="text-amber-600">Real honey</span><br />from beekeeper<br /><span className="text-amber-400">Petro Savchenko</span></>}
            </h1>

            <p className="text-amber-800/60 text-[16px] leading-relaxed mb-8 max-w-lg">
              {isUk
                ? "Ніяких підігрівань, домішок, сиропу — тільки чистий мед зібраний вручну у Полтавській та Черкаській областях. Від вулика до вашого столу."
                : "No heating, additives, or syrup — pure honey hand-collected in Poltava and Cherkasy regions. From hive to your table."}
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <a href="#honey"
                className="px-7 py-4 bg-amber-400 hover:bg-amber-500 text-amber-900 font-black rounded-2xl text-[15px] transition-colors shadow-lg shadow-amber-300/40">
                {isUk ? "🍯 Купити мед" : "🍯 Buy honey"}
              </a>
              <a href="#gifts"
                className="px-7 py-4 border-2 border-amber-300 hover:border-amber-500 bg-white text-amber-700 hover:text-amber-900 font-bold rounded-2xl text-[15px] transition-all">
                {isUk ? "🎁 Подарункові набори" : "🎁 Gift sets"}
              </a>
            </div>

            {/* Trust row */}
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {[
                { i: "✅", t: isUk ? "BIO-сертифікат" : "BIO certified" },
                { i: "🔬", t: isUk ? "Лабораторний аналіз" : "Lab tested" },
                { i: "🚚", t: isUk ? "Нова Пошта" : "Nova Post delivery" },
                { i: "↩️", t: isUk ? "Повернення 14 днів" : "14-day returns" },
              ].map(f => (
                <span key={f.t} className="flex items-center gap-1.5 text-[12px] text-amber-700/70 font-medium">
                  <span>{f.i}</span>{f.t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAND ── */}
      <div className="bg-amber-800">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { n: "180", l: isUk ? "вуликів" : "hives" },
            { n: "6", l: isUk ? "видів меду" : "honey types" },
            { n: "2003", l: isUk ? "рік заснування" : "established" },
            { n: "4 200+", l: isUk ? "задоволених клієнтів" : "happy customers" },
          ].map(s => (
            <div key={s.l} className="text-center">
              <p className="text-amber-100 font-black text-[24px] leading-none">{s.n}</p>
              <p className="text-amber-300 text-[11px] font-semibold uppercase tracking-wide mt-0.5">{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── PRODUCTS ── */}
      <section id="honey" className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
        {/* Tab switch */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-12">
          <div>
            <p className="text-amber-500 text-[11px] font-bold uppercase tracking-widest mb-2">
              {isUk ? "Прямо з пасіки" : "Straight from the apiary"}
            </p>
            <h2 className="text-[34px] font-black text-amber-900">
              {isUk ? "Що у нас є?" : "What we offer"}
            </h2>
          </div>
          <div className="flex gap-2">
            {(["honey", "gifts"] as const).map(t => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`px-5 py-2.5 rounded-xl font-bold text-[13px] transition-all ${
                  activeTab === t
                    ? "bg-amber-400 text-amber-900 shadow-md"
                    : "border border-amber-200 text-amber-600 hover:border-amber-400"
                }`}>
                {t === "honey" ? (isUk ? "🍯 Мед" : "🍯 Honey") : (isUk ? "🎁 Подарунки" : "🎁 Gifts")}
              </button>
            ))}
          </div>
        </div>

        {activeTab === "honey" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {HONEY_TYPES.map(h => (
              <div key={h.id} className={`${h.color} border-2 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-amber-200/60 transition-all`}>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${h.badgeColor}`}>
                      {isUk ? h.ukTag : h.enTag}
                    </div>
                    <span className="text-[42px]">{h.emoji}</span>
                  </div>
                  <h3 className={`font-black text-[17px] leading-snug mb-1 ${h.textColor}`}>
                    {isUk ? h.ukName : h.enName}
                  </h3>
                  <p className="text-amber-600/70 text-[11px] font-semibold mb-2">
                    {isUk ? h.ukSubtitle : h.enSubtitle}
                  </p>
                  <p className="text-amber-800/60 text-[12px] leading-relaxed mb-4">
                    {isUk ? h.ukDesc : h.enDesc}
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`font-black text-[22px] leading-none ${h.textColor}`}>{h.price} ₴</p>
                      <p className="text-amber-600/60 text-[11px]">{h.volume}</p>
                    </div>
                    <button
                      onClick={() => setCartCount(c => c + 1)}
                      className="px-4 py-2.5 bg-amber-800 hover:bg-amber-900 text-white font-bold rounded-xl text-[13px] transition-colors shadow-sm">
                      {isUk ? "+ В кошик" : "+ Add"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "gifts" && (
          <div id="gifts" className="grid sm:grid-cols-3 gap-6">
            {GIFT_SETS.map(g => (
              <div key={g.id} className="bg-white border-2 border-amber-200 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-amber-200/60 transition-all">
                <div className={`${g.color} h-32 flex items-center justify-center text-[64px]`}>
                  {g.emoji}
                </div>
                <div className="p-5">
                  <div className="inline-block bg-amber-100 text-amber-700 text-[10px] font-bold px-2.5 py-1 rounded-full mb-3 uppercase tracking-wide">
                    {isUk ? g.ukTag : g.enTag}
                  </div>
                  <h3 className="font-black text-amber-900 text-[16px] mb-2">
                    {isUk ? g.ukName : g.enName}
                  </h3>
                  <p className="text-amber-700/60 text-[12px] leading-relaxed mb-4">
                    {isUk ? g.ukDesc : g.enDesc}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="font-black text-amber-800 text-[22px]">{g.price.toLocaleString("uk-UA")} ₴</p>
                    <button
                      onClick={() => setCartCount(c => c + 1)}
                      className="px-4 py-2.5 bg-amber-400 hover:bg-amber-500 text-amber-900 font-bold rounded-xl text-[13px] transition-colors">
                      {isUk ? "🎁 Замовити" : "🎁 Order"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── APIARY STORY ── */}
      <section className="bg-amber-50 border-y border-amber-200 py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-16 items-center">
          {/* Beekeeper card */}
          <div className="bg-white border-2 border-amber-200 rounded-3xl p-7 shadow-md">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-16 h-16 bg-amber-200 rounded-full flex items-center justify-center text-3xl shadow-sm">👨‍🌾</div>
              <div>
                <h3 className="font-black text-amber-900 text-[18px]">
                  {isUk ? "Петро Савченко" : "Petro Savchenko"}
                </h3>
                <p className="text-amber-600 text-[12px] font-semibold">
                  {isUk ? "Бджоляр · 22 роки досвіду" : "Beekeeper · 22 years experience"}
                </p>
              </div>
            </div>
            <blockquote className="text-amber-800/70 text-[15px] leading-relaxed italic border-l-4 border-amber-400 pl-4 mb-5">
              {isUk
                ? "«Мій батько почав пасіку у 1980-х. Я продовжую справу — з повагою до бджіл, природи і людей, яким надсилаю мед.»"
                : "«My father started the apiary in the 1980s. I continue the craft — with respect for the bees, nature, and the people I send honey to.»"}
            </blockquote>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { n: "180", l: isUk ? "вуликів" : "hives" },
                { n: "6", l: isUk ? "регіони" : "regions" },
                { n: "22", l: isUk ? "роки" : "years" },
              ].map(s => (
                <div key={s.l} className="bg-amber-50 rounded-xl py-3 border border-amber-100">
                  <p className="text-amber-600 font-black text-[20px] leading-none">{s.n}</p>
                  <p className="text-amber-500 text-[10px] font-semibold uppercase tracking-wide mt-0.5">{s.l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Story text */}
          <div>
            <p className="text-amber-500 text-[11px] font-bold uppercase tracking-widest mb-4">
              {isUk ? "Наша пасіка" : "Our Apiary"}
            </p>
            <h2 className="text-[36px] font-black text-amber-900 leading-tight mb-5">
              {isUk ? "Ми не виробляємо мед — ми його бережемо" : "We don't manufacture honey — we protect it"}
            </h2>
            <p className="text-amber-800/60 text-[15px] leading-relaxed mb-6">
              {isUk
                ? "Жодних цукрових підгодовувань, антибіотиків чи підігрівання. Бджоли кочують разом з нами від Полтавщини до Карпат — слідом за цвітінням. Це складніше й дорожче, але тільки так виходить справжній мед."
                : "No sugar feeds, antibiotics, or heating. The bees migrate with us from Poltava to the Carpathians — following the blooms. It's harder and more expensive, but it's the only way to get real honey."}
            </p>
            <div className="space-y-3">
              {[
                { i: "🧪", uk: "Кожна партія перевіряється в акредитованій лабораторії", en: "Every batch tested in an accredited lab" },
                { i: "🌿", uk: "Пасіки розташовані далеко від полів з хімобробкою", en: "Apiaries located far from chemically-treated fields" },
                { i: "🏺", uk: "Упаковка у скляні банки без нагрівання", en: "Packaged in glass jars without heating" },
                { i: "📜", uk: "BIO-сертифікат UA-BIO-047 з 2018 року", en: "BIO certificate UA-BIO-047 since 2018" },
              ].map(f => (
                <div key={f.uk} className="flex items-start gap-3">
                  <span className="text-xl mt-0.5 flex-shrink-0">{f.i}</span>
                  <p className="text-amber-800/70 text-[14px]">{isUk ? f.uk : f.en}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HARVEST CALENDAR ── */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
        <div className="text-center mb-10">
          <p className="text-amber-500 text-[11px] font-bold uppercase tracking-widest mb-3">
            {isUk ? "Коли збирається мед?" : "When is honey harvested?"}
          </p>
          <h2 className="text-[32px] font-black text-amber-900">
            {isUk ? "Сезонний календар збору" : "Seasonal Harvest Calendar"}
          </h2>
        </div>

        <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl overflow-hidden">
          {/* Month headers */}
          <div className="grid grid-cols-[100px_1fr] border-b border-amber-200">
            <div className="px-4 py-3" />
            <div className="grid grid-cols-12">
              {months.map(m => (
                <div key={m} className="text-center text-[10px] font-bold text-amber-600 uppercase py-2.5 border-l border-amber-200">
                  {m}
                </div>
              ))}
            </div>
          </div>
          {/* Rows */}
          {HARVEST_CAL.map((h, i) => (
            <div key={h.ukName} className={`grid grid-cols-[100px_1fr] ${i < HARVEST_CAL.length - 1 ? "border-b border-amber-200" : ""}`}>
              <div className="px-4 py-3 flex items-center gap-2 border-r border-amber-200">
                <span className="text-[18px]">{h.emoji}</span>
                <p className="text-[11px] font-bold text-amber-800">{isUk ? h.ukName : h.enName}</p>
              </div>
              <div className="grid grid-cols-12">
                {Array.from({ length: 12 }, (_, mi) => (
                  <div
                    key={mi}
                    className={`border-l border-amber-200 py-3 ${h.months.includes(mi + 1) ? "bg-amber-400/50" : ""}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HEALTH BENEFITS ── */}
      <section className="bg-amber-800 py-16">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <h2 className="text-[28px] font-black text-white text-center mb-10">
            {isUk ? "Чому натуральний мед?" : "Why natural honey?"}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { emoji: "💪", uk: "Природний антибіотик", en: "Natural antibiotic", ukD: "Перекис водню та флавоноїди борються з бактеріями", enD: "Hydrogen peroxide and flavonoids fight bacteria" },
              { emoji: "🛡️", uk: "Підтримка імунітету", en: "Immune support", ukD: "Антиоксиданти захищають клітини від вільних радикалів", enD: "Antioxidants protect cells from free radicals" },
              { emoji: "⚡", uk: "Швидка енергія", en: "Quick energy", ukD: "Фруктоза та глюкоза — чиста природна енергія", enD: "Fructose and glucose — clean natural energy" },
              { emoji: "😴", uk: "Кращий сон", en: "Better sleep", ukD: "Ложка меду перед сном підвищує рівень серотоніну", enD: "A spoonful before bed raises serotonin levels" },
            ].map(b => (
              <div key={b.uk} className="bg-white/10 rounded-2xl p-5 border border-white/10">
                <span className="text-[36px] block mb-3">{b.emoji}</span>
                <h3 className="text-white font-bold text-[15px] mb-2">{isUk ? b.uk : b.en}</h3>
                <p className="text-amber-200/60 text-[12px] leading-relaxed">{isUk ? b.ukD : b.enD}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
        <h2 className="text-[28px] font-black text-amber-900 text-center mb-10">
          {isUk ? "Відгуки покупців" : "Customer reviews"}
        </h2>
        <div className="grid sm:grid-cols-3 gap-5">
          {[
            { name: isUk ? "Олена В., Київ" : "Olena V., Kyiv", stars: 5, text: isUk ? "Купую гречаний мед вже 3-й рік поспіль. Смак і якість незмінні — справжній продукт без підробок." : "I've been buying buckwheat honey for 3 years now. Taste and quality are consistent — genuine product." },
            { name: isUk ? "Андрій К., Харків" : "Andriy K., Kharkiv", stars: 5, text: isUk ? "Замовив набір «Преміум» у подарунок на день народження. Пакування чудове, мед — смачний. Усі в захваті!" : "Ordered the Premium set as a birthday gift. Beautiful packaging, delicious honey. Everyone loved it!" },
            { name: isUk ? "Марина Л., Львів" : "Maryna L., Lviv", stars: 5, text: isUk ? "Акацієвий рекомендую для дітей — м'який, без гіркоти. Дочка їсть замість цукру в чаї :)" : "Recommend acacia honey for children — mild, no bitterness. My daughter uses it instead of sugar in tea :)" },
          ].map(r => (
            <div key={r.name} className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-5">
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: r.stars }).map((_, i) => (
                  <span key={i} className="text-amber-400">★</span>
                ))}
              </div>
              <p className="text-amber-800/70 text-[13px] leading-relaxed mb-3 italic">{r.text}</p>
              <p className="text-amber-600 font-bold text-[12px]">— {r.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-amber-900 border-t border-amber-800 py-10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center">🐝</div>
            <div>
              <p className="font-black text-white text-[14px]">{isUk ? "Пасіка Мед" : "Pasika Honey"}</p>
              <p className="text-amber-300/60 text-[10px]">© 2025 · {isUk ? "Полтавська обл." : "Poltava Region"}</p>
            </div>
          </div>
          <div className="flex gap-6 text-[12px] text-amber-300/60">
            <a href="#" className="hover:text-amber-200">{isUk ? "Умови доставки" : "Delivery terms"}</a>
            <a href="#" className="hover:text-amber-200">{isUk ? "Повернення" : "Returns"}</a>
            <a href="#" className="hover:text-amber-200">{isUk ? "Контакти" : "Contact"}</a>
          </div>
          <p className="text-amber-300/40 text-[11px]">
            📞 {isUk ? "+38 (050) 123-45-67" : "+38 (050) 123-45-67"}
          </p>
        </div>
      </footer>

      {/* ── CART PANEL ── */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white border-2 border-amber-200 rounded-3xl p-6 w-full max-w-sm shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-black text-amber-900 text-[18px]">🛒 {isUk ? "Ваш кошик" : "Your cart"}</h3>
              <button onClick={() => setShowCart(false)} className="text-amber-400 hover:text-amber-700 text-xl font-bold">✕</button>
            </div>
            {cartCount === 0
              ? <p className="text-amber-600/60 text-[14px] text-center py-6">{isUk ? "Кошик порожній 🍯" : "Cart is empty 🍯"}</p>
              : (
                <div>
                  <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 mb-4">
                    <p className="text-amber-800 text-[13px]">
                      {isUk ? `Додано ${cartCount} товарів` : `${cartCount} item${cartCount > 1 ? "s" : ""} added`}
                    </p>
                  </div>
                  <button className="w-full py-3.5 bg-amber-400 hover:bg-amber-500 text-amber-900 font-black rounded-2xl text-[14px] transition-colors">
                    {isUk ? "Оформити замовлення" : "Checkout"}
                  </button>
                </div>
              )
            }
          </div>
        </div>
      )}
    </div>
  );
}
