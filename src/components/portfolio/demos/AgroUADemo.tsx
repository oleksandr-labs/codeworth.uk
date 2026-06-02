"use client";

import { useState } from "react";

interface Props { lang: string; }

const PRODUCTS = [
  { id: 1, nameUk: "Соняшникова олія холодного віджиму", nameEn: "Cold-Pressed Sunflower Oil", catUk: "Олійні", catEn: "Oil Crops", retail: "85 ₴/л", wholesale: "62 ₴/л", organic: true, status: "available", emoji: "🌻", weight: "1 л / 5 л" },
  { id: 2, nameUk: "Пшениця м'яка (1 клас)", nameEn: "Premium Soft Wheat", catUk: "Зернові", catEn: "Grain", retail: "28 ₴/кг", wholesale: "19 ₴/кг", organic: false, status: "available", emoji: "🌾", weight: "від 50 кг" },
  { id: 3, nameUk: "Гречка фермерська непропарена", nameEn: "Farm Unroasted Buckwheat", catUk: "Зернові", catEn: "Grain", retail: "95 ₴/кг", wholesale: "71 ₴/кг", organic: true, status: "available", emoji: "🫘", weight: "500 г / 1 кг" },
  { id: 4, nameUk: "Томати сорт Хейрлум", nameEn: "Heirloom Tomatoes", catUk: "Овочі", catEn: "Vegetables", retail: "120 ₴/кг", wholesale: "88 ₴/кг", organic: true, status: "available", emoji: "🍅", weight: "від 1 кг" },
  { id: 5, nameUk: "Борошно пшеничне вищий ґатунок", nameEn: "Premium Wheat Flour", catUk: "Переробка", catEn: "Processed", retail: "45 ₴/кг", wholesale: "31 ₴/кг", organic: false, status: "available", emoji: "🌰", weight: "2 кг / 10 кг" },
  { id: 6, nameUk: "Яблука Голден Делішес", nameEn: "Golden Delicious Apples", catUk: "Фрукти", catEn: "Fruits", retail: "65 ₴/кг", wholesale: "47 ₴/кг", organic: true, status: "soon", emoji: "🍎", weight: "від 5 кг" },
  { id: 7, nameUk: "Кукурудза цукрова", nameEn: "Sweet Corn", catUk: "Овочі", catEn: "Vegetables", retail: "18 ₴/шт", wholesale: "11 ₴/шт", organic: false, status: "ended", emoji: "🌽", weight: "поштучно" },
  { id: 8, nameUk: "Ріпакова олія", nameEn: "Rapeseed Oil", catUk: "Олійні", catEn: "Oil Crops", retail: "78 ₴/л", wholesale: "55 ₴/л", organic: false, status: "available", emoji: "🫙", weight: "1 л / 5 л" },
];

const HARVEST = [
  { ukName: "Ріпак", enName: "Rapeseed", start: 5, end: 6, color: "bg-yellow-400" },
  { ukName: "Пшениця", enName: "Wheat", start: 6, end: 7, color: "bg-amber-500" },
  { ukName: "Гречка", enName: "Buckwheat", start: 7, end: 8, color: "bg-orange-400" },
  { ukName: "Кукурудза", enName: "Corn", start: 7, end: 9, color: "bg-yellow-300" },
  { ukName: "Соняшник", enName: "Sunflower", start: 8, end: 10, color: "bg-yellow-500" },
  { ukName: "Яблука", enName: "Apples", start: 8, end: 9, color: "bg-red-400" },
  { ukName: "Томати", enName: "Tomatoes", start: 6, end: 8, color: "bg-red-500" },
];

export function AgroUADemo({ lang }: Props) {
  const isUk = lang === "uk";
  const [catFilter, setCatFilter] = useState("all");
  const [organicOnly, setOrganicOnly] = useState(false);
  const [b2bOpen, setB2bOpen] = useState(false);
  const [b2bDone, setB2bDone] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  const months = isUk
    ? ["Січ", "Лют", "Бер", "Квіт", "Трав", "Черв", "Лип", "Серп", "Вер", "Жовт", "Лист", "Груд"]
    : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const cats = isUk
    ? [{ key: "all", label: "Все" }, { key: "Зернові", label: "Зернові" }, { key: "Олійні", label: "Олійні" }, { key: "Овочі", label: "Овочі" }, { key: "Фрукти", label: "Фрукти" }, { key: "Переробка", label: "Переробка" }]
    : [{ key: "all", label: "All" }, { key: "Grain", label: "Grain" }, { key: "Oil Crops", label: "Oil Crops" }, { key: "Vegetables", label: "Vegetables" }, { key: "Fruits", label: "Fruits" }, { key: "Processed", label: "Processed" }];

  const filtered = PRODUCTS.filter(p => {
    const cat = isUk ? p.catUk : p.catEn;
    const catOk = catFilter === "all" || cat === catFilter;
    return catOk && (!organicOnly || p.organic);
  });

  return (
    <div className="min-h-screen font-sans bg-[#fefce8]" style={{ fontFamily: "'Georgia', serif" }}>

      {/* ── NAVIGATION ── */}
      <header className="sticky top-0 z-50 bg-[#fefce8]/96 backdrop-blur-sm border-b border-amber-200/60">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
          <a href="#" className="flex items-center gap-2.5 shrink-0">
            <span className="text-2xl">🌾</span>
            <div className="leading-none">
              <p className="font-bold text-green-900 text-[17px] tracking-tight">AgroUA</p>
              <p className="text-[10px] text-amber-700 font-medium tracking-wide uppercase">{isUk ? "Органічна ферма" : "Organic Farm"}</p>
            </div>
          </a>
          <nav className="hidden md:flex items-center gap-7 text-[13px] font-medium text-stone-700">
            <a href="#catalog" className="hover:text-green-800 transition-colors">{isUk ? "Продукція" : "Products"}</a>
            <a href="#calendar" className="hover:text-green-800 transition-colors">{isUk ? "Сезони" : "Seasons"}</a>
            <a href="#transparency" className="hover:text-green-800 transition-colors">{isUk ? "Наша ферма" : "Our Farm"}</a>
            <a href="#b2b" className="hover:text-green-800 transition-colors">{isUk ? "Оптовим" : "Wholesale"}</a>
            <a href="#reviews" className="hover:text-green-800 transition-colors">{isUk ? "Відгуки" : "Reviews"}</a>
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={() => setB2bOpen(true)}
              className="hidden sm:block px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-[13px] font-semibold rounded-xl transition-colors shadow-sm">
              {isUk ? "Оптовий запит" : "Wholesale inquiry"}
            </button>
            <button onClick={() => setNavOpen(!navOpen)} className="md:hidden p-2 text-stone-700">☰</button>
          </div>
        </div>
        {navOpen && (
          <div className="md:hidden bg-[#fefce8] border-t border-amber-200 px-5 py-3 flex flex-col gap-3 text-sm">
            {(isUk ? ["Продукція", "Сезони", "Наша ферма", "Оптовим", "Відгуки"] : ["Products", "Seasons", "Our Farm", "Wholesale", "Reviews"]).map(l => (
              <a key={l} href="#" onClick={() => setNavOpen(false)} className="text-stone-700 hover:text-green-800">{l}</a>
            ))}
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-linear-to-br from-green-950 via-green-900 to-amber-950" />
        <div className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }} />
        {/* Decorative circles */}
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute top-10 right-1/3 w-64 h-64 rounded-full bg-green-400/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-green-700/40 border border-green-500/30 text-green-200 text-[11px] font-bold px-3 py-1.5 rounded-full mb-6 tracking-wide uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              {isUk ? "Органічний сертифікат UA-BIO-109 · Полтавська обл." : "Organic Certificate UA-BIO-109 · Poltava Region"}
            </div>

            <h1 className="text-[42px] sm:text-[58px] font-bold text-white leading-[1.1] mb-5">
              {isUk ? <>Чесна їжа від<br /><span className="text-amber-300">чесних фермерів</span></> : <>Honest food from<br /><span className="text-amber-300">honest farmers</span></>}
            </h1>
            <p className="text-green-100/80 text-[17px] leading-relaxed mb-8 max-w-xl">
              {isUk
                ? "Вирощуємо без хімії з 2015 року. Понад 1\u202f200 га органічних угідь. Прямий продаж — роздрібний та оптовий."
                : "Chemical-free farming since 2015. Over 1,200 ha of certified organic fields. Direct retail and wholesale sales."}
            </p>
            <div className="flex flex-wrap gap-3 mb-12">
              <a href="#catalog"
                className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-white font-bold rounded-2xl text-[14px] transition-colors shadow-lg shadow-amber-900/30">
                {isUk ? "Замовити продукцію" : "Browse & order"}
              </a>
              <button onClick={() => setB2bOpen(true)}
                className="px-6 py-3.5 border border-white/25 hover:border-white/50 bg-white/10 text-white font-semibold rounded-2xl text-[14px] transition-all">
                {isUk ? "Оптовим покупцям →" : "Wholesale buyers →"}
              </button>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-8 pt-8 border-t border-white/15">
              {[
                { num: "1 200 га", lbl: isUk ? "органічних угідь" : "organic fields" },
                { num: "47", lbl: isUk ? "культур на рік" : "crops per year" },
                { num: "120+", lbl: isUk ? "оптових партнерів" : "wholesale partners" },
                { num: "2015", lbl: isUk ? "рік заснування" : "founded" },
              ].map(s => (
                <div key={s.lbl}>
                  <p className="text-2xl font-bold text-amber-300">{s.num}</p>
                  <p className="text-[11px] text-green-400/80 mt-0.5 uppercase tracking-wide">{s.lbl}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="relative h-12">
          <svg viewBox="0 0 1440 48" className="absolute bottom-0 w-full" preserveAspectRatio="none">
            <path d="M0 48 L0 24 Q360 0 720 24 Q1080 48 1440 24 L1440 48 Z" fill="#fefce8" />
          </svg>
        </div>
      </section>

      {/* ── PRODUCT CATALOG ── */}
      <section id="catalog" className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10">
          <div>
            <p className="text-amber-600 text-[11px] font-bold uppercase tracking-widest mb-2">{isUk ? "Пряма з поля" : "Straight from the field"}</p>
            <h2 className="text-[32px] font-bold text-green-950">{isUk ? "Наша продукція" : "Our Products"}</h2>
            <p className="text-stone-500 mt-1.5 text-sm">{isUk ? "Без посередників — від фермера напряму до вас" : "No middlemen — direct from farmer to you"}</p>
          </div>
          <label className="flex items-center gap-2.5 cursor-pointer shrink-0">
            <div onClick={() => setOrganicOnly(v => !v)}
              className={`w-11 h-6 rounded-full transition-colors ${organicOnly ? "bg-green-600" : "bg-stone-300"} relative`}>
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white dark:bg-neutral-800 shadow transition-transform ${organicOnly ? "translate-x-6" : "translate-x-1"}`} />
            </div>
            <span className="text-sm font-medium text-stone-700">{isUk ? "Тільки BIO" : "Only Organic"}</span>
          </label>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {cats.map(c => (
            <button key={c.key} onClick={() => setCatFilter(c.key)}
              className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all border ${
                catFilter === c.key
                  ? "bg-green-800 text-white border-green-800 shadow-md"
                  : "border-amber-200 text-stone-600 hover:border-green-400 bg-white"
              }`}>
              {c.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map(p => (
            <div key={p.id}
              className={`bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group ${p.status === "ended" ? "opacity-55" : ""}`}>
              {/* Visual top */}
              <div className={`h-32 flex items-center justify-center text-6xl relative ${
                p.status === "available" ? "bg-linear-to-br from-amber-50 to-green-50" :
                p.status === "soon" ? "bg-linear-to-br from-sky-50 to-indigo-50" :
                "bg-stone-100"
              }`}>
                {p.emoji}
                {p.organic && (
                  <span className="absolute top-3 right-3 text-[10px] bg-green-600 text-white font-bold px-2 py-0.5 rounded-full">BIO</span>
                )}
              </div>
              <div className="p-4">
                <p className="text-[10px] text-amber-600 font-bold uppercase tracking-wide mb-1">{isUk ? p.catUk : p.catEn}</p>
                <h3 className="font-semibold text-stone-900 text-[14px] leading-snug mb-1.5">{isUk ? p.nameUk : p.nameEn}</h3>
                <p className="text-[11px] text-stone-400 mb-3">⚖️ {p.weight}</p>
                {p.status === "available" ? (
                  <div>
                    <div className="flex items-baseline justify-between mb-3">
                      <span className="font-bold text-green-700 text-[15px]">{p.retail}</span>
                      <span className="text-[11px] text-stone-400">{isUk ? "Гурт: " : "Wholesale: "}<span className="font-medium text-stone-600">{p.wholesale}</span></span>
                    </div>
                    <button className="w-full py-2 bg-green-700 hover:bg-green-800 text-white text-[12px] font-semibold rounded-xl transition-colors opacity-0 group-hover:opacity-100">
                      {isUk ? "Замовити" : "Order"}
                    </button>
                  </div>
                ) : p.status === "soon" ? (
                  <span className="inline-block text-[12px] font-semibold text-sky-600 bg-sky-50 border border-sky-200 px-3 py-1 rounded-xl">
                    {isUk ? "🌱 Незабаром" : "🌱 Coming soon"}
                  </span>
                ) : (
                  <span className="text-[12px] text-stone-400 font-medium">{isUk ? "Сезон завершено" : "Season ended"}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SEASONAL CALENDAR ── */}
      <section id="calendar" className="bg-green-950 py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <p className="text-green-400 text-[11px] font-bold uppercase tracking-widest mb-3">{isUk ? "Що і коли" : "What & when"}</p>
          <h2 className="text-[32px] font-bold text-white mb-2">{isUk ? "Сезонний календар урожаю" : "Harvest Season Calendar"}</h2>
          <p className="text-green-400/70 text-sm mb-10">{isUk ? "Що є зараз і що з'явиться найближчим часом на нашій фермі" : "What's available now and what's coming soon on our farm"}</p>

          <div className="overflow-x-auto">
            <div className="min-w-170">
              {/* Headers */}
              <div className="grid gap-1.5 mb-2" style={{ gridTemplateColumns: "130px repeat(12, 1fr)" }}>
                <div />
                {months.map((m, i) => (
                  <div key={m} className={`text-center text-[11px] font-semibold py-2 rounded-lg ${i === 2 ? "bg-amber-500 text-white" : "text-green-500"}`}>{m}</div>
                ))}
              </div>
              {/* Rows */}
              <div className="space-y-2">
                {HARVEST.map(h => (
                  <div key={h.ukName} className="grid gap-1.5 items-center" style={{ gridTemplateColumns: "130px repeat(12, 1fr)" }}>
                    <span className="text-green-200 text-[12px] font-medium">{isUk ? h.ukName : h.enName}</span>
                    {Array.from({ length: 12 }, (_, i) => (
                      <div key={i} className={`h-7 rounded-md transition-opacity ${
                        i >= h.start && i <= h.end ? `${h.color} shadow-sm` : "bg-green-900/50"
                      } ${i === 2 && i >= h.start && i <= h.end ? "ring-2 ring-white/60" : ""}`} />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-5 mt-8 pt-6 border-t border-green-800">
            <div className="flex items-center gap-2 text-[12px] text-green-400">
              <span className="w-3 h-3 rounded bg-amber-500 inline-block" />
              {isUk ? "Поточний місяць" : "Current month"}
            </div>
            <div className="flex items-center gap-2 text-[12px] text-green-400">
              <span className="w-3 h-3 rounded bg-yellow-400 inline-block" />
              {isUk ? "Сезон культури" : "Crop in season"}
            </div>
            <button className="ml-auto px-4 py-2 border border-green-600 text-green-300 text-[13px] font-semibold rounded-xl hover:bg-green-800 transition-colors">
              {isUk ? "📧 Отримувати сповіщення" : "📧 Get harvest alerts"}
            </button>
          </div>
        </div>
      </section>

      {/* ── FROM FIELD TO TABLE ── */}
      <section id="transparency" className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-amber-600 text-[11px] font-bold uppercase tracking-widest mb-3">{isUk ? "Прозорість" : "Transparency"}</p>
            <h2 className="text-[34px] font-bold text-green-950 mb-5 leading-tight">
              {isUk ? "Від поля до вашого столу" : "From our field to your table"}
            </h2>
            <p className="text-stone-600 leading-relaxed mb-8">
              {isUk
                ? "Ми не ховаємо нічого. Кожне поле — з GPS-координатами. Кожна партія — з якісним посвідченням. Наш органічний сертифікат — у відкритому доступі."
                : "We hide nothing. Every field has GPS coordinates. Every batch has a quality certificate. Our organic certificate is publicly accessible."}
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {[
                { icon: "🌱", titleUk: "Без синтетики", titleEn: "No synthetics", descUk: "Жодних пестицидів та ГМО — лише природні добрива та сівозміна", descEn: "No pesticides or GMO — natural fertilizers and crop rotation only" },
                { icon: "💧", titleUk: "Крапельне зрошення", titleEn: "Drip irrigation", descUk: "Економія 40% води порівняно з дощуванням", descEn: "40% water savings compared to sprinkler irrigation" },
                { icon: "🔄", titleUk: "7-пільна сівозміна", titleEn: "7-field rotation", descUk: "Відновлення ґрунту без хімічних добрив", descEn: "Soil regeneration without chemical fertilizers" },
                { icon: "📍", titleUk: "GPS-координати", titleEn: "GPS coordinates", descUk: "Кожне поле на карті — перевірте самі", descEn: "Every field on map — verify yourself" },
              ].map(f => (
                <div key={f.icon} className="flex gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-4">
                  <span className="text-2xl shrink-0">{f.icon}</span>
                  <div>
                    <p className="font-semibold text-stone-900 text-[13px]">{isUk ? f.titleUk : f.titleEn}</p>
                    <p className="text-[11px] text-stone-500 mt-0.5 leading-relaxed">{isUk ? f.descUk : f.descEn}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {/* Map mockup */}
            <div className="bg-linear-to-br from-green-100 to-amber-100 rounded-3xl p-6 border border-green-200">
              <div className="bg-[#e8ead8] rounded-2xl h-44 relative overflow-hidden mb-4">
                <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.07) 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
                <div className="absolute inset-0 flex items-center"><div className="h-px bg-white/70 w-full" /></div>
                <div className="absolute inset-0 flex justify-center"><div className="w-px bg-white/70 h-full" /></div>
                <div className="absolute" style={{ top: "30%", left: "35%" }}>
                  <div className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center text-white text-sm shadow-lg">📍</div>
                  <div className="bg-white rounded-xl shadow-lg px-3 py-1.5 mt-1 text-[11px] whitespace-nowrap">
                    <p className="font-bold text-green-800">{isUk ? "Поле №3 · 145 га" : "Field #3 · 145 ha"}</p>
                    <p className="text-stone-500 font-mono">49.5876° N, 34.2314° E</p>
                  </div>
                </div>
                <div className="absolute" style={{ top: "55%", left: "58%" }}>
                  <div className="w-7 h-7 rounded-full bg-amber-600 flex items-center justify-center text-white text-xs shadow">📍</div>
                </div>
              </div>
              <p className="text-[12px] text-green-700 font-semibold">📍 {isUk ? "Полтавська обл., Великобагачанський р-н" : "Poltava region, Velykobahachansky district"}</p>
            </div>

            {/* Certificates */}
            <div className="bg-green-950 rounded-3xl p-6 text-white">
              <p className="text-green-400 text-[11px] font-bold uppercase tracking-widest mb-4">{isUk ? "Сертифікати" : "Certificates"}</p>
              <div className="space-y-3">
                {[
                  { badge: "UA-BIO-109", lbl: isUk ? "Органічне виробництво" : "Organic production", sub: isUk ? "Дійсний до 12.2026" : "Valid until 12.2026" },
                  { badge: "HACCP", lbl: isUk ? "Харчова безпека" : "Food safety standard", sub: isUk ? "ISO 22000:2018" : "ISO 22000:2018" },
                  { badge: "УКРСЕПРО", lbl: isUk ? "Відповідність ДСТУ" : "DSTU conformity", sub: isUk ? "Всі зернові культури" : "All grain crops" },
                ].map(c => (
                  <div key={c.badge} className="flex items-center gap-3 bg-green-900/60 rounded-xl px-4 py-3">
                    <span className="text-[11px] font-bold bg-amber-500 text-white px-2.5 py-1 rounded-full shrink-0 whitespace-nowrap">{c.badge}</span>
                    <div>
                      <p className="text-white text-[13px] font-semibold">{c.lbl}</p>
                      <p className="text-green-400 text-[11px]">{c.sub}</p>
                    </div>
                    <span className="ml-auto text-green-400 text-[11px]">PDF →</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── B2B ── */}
      <section id="b2b" className="bg-amber-50 border-y border-amber-200 py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-amber-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">B2B</span>
              <h2 className="text-[34px] font-bold text-green-950 mb-4 leading-tight">
                {isUk ? "Оптові поставки для бізнесу" : "Wholesale supply for business"}
              </h2>
              <p className="text-stone-600 leading-relaxed mb-6">
                {isUk
                  ? "Постачаємо ресторанам, мережам супермаркетів, переробним підприємствам та фермерським ринкам. Стабільна якість, щомісячні договори, всі документи."
                  : "We supply restaurants, supermarket chains, processing plants, and farmers' markets. Consistent quality, monthly contracts, full documentation."}
              </p>
              <div className="space-y-3 mb-8">
                {[
                  { icon: "📦", textUk: "Мінімальна партія: 500 кг зерна / 100 л олії", textEn: "Minimum order: 500 kg grain / 100 L oil" },
                  { icon: "📋", textUk: "Фітосанітарний сертифікат + якісне посвідчення", textEn: "Phytosanitary certificate + quality declaration" },
                  { icon: "🚚", textUk: "Власна доставка по Полтавській обл., Нова Пошта по Україні", textEn: "Own delivery in Poltava region, Nova Poshta nationwide" },
                  { icon: "💳", textUk: "Оплата: безготівкова, відстрочка для постійних партнерів", textEn: "Payment: bank transfer, deferred for regular partners" },
                ].map(f => (
                  <div key={f.icon} className="flex items-center gap-3 text-[13px] text-stone-700">
                    <span className="text-lg shrink-0">{f.icon}</span>
                    <span>{isUk ? f.textUk : f.textEn}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => setB2bOpen(true)}
                className="px-6 py-3.5 bg-green-800 hover:bg-green-900 text-white font-bold rounded-2xl text-[14px] transition-colors shadow-md">
                {isUk ? "Відправити оптовий запит" : "Send wholesale inquiry"}
              </button>
            </div>

            {/* Partners logos mockup */}
            <div className="bg-white rounded-3xl border border-amber-200 p-8">
              <p className="text-[11px] font-bold uppercase tracking-widest text-stone-400 mb-5">{isUk ? "Вже з нами" : "Already working with us"}</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { nameUk: "Ресторан «Смачно»", nameEn: "Restaurant Smachno", typeUk: "HoReCa, Полтава", typeEn: "HoReCa, Poltava" },
                  { nameUk: "Варус Маркет", nameEn: "Varus Market", typeUk: "Мережа супермаркетів", typeEn: "Supermarket chain" },
                  { nameUk: "Мелітопольські ковбаси", nameEn: "Melitopol Sausages", typeUk: "М'ясопереробка", typeEn: "Meat processing" },
                  { nameUk: "ФОП Коваленко", nameEn: "FOP Kovalenko", typeUk: "Хлібопекарня, Харків", typeEn: "Bakery, Kharkiv" },
                ].map(p => (
                  <div key={p.nameUk} className="bg-amber-50/70 border border-amber-200 rounded-2xl p-3">
                    <p className="font-semibold text-[13px] text-stone-800">{isUk ? p.nameUk : p.nameEn}</p>
                    <p className="text-[11px] text-stone-400 mt-0.5">{isUk ? p.typeUk : p.typeEn}</p>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-stone-400 mt-4 text-center">{isUk ? "+ 116 партнерів по всій Україні" : "+ 116 partners across Ukraine"}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section id="reviews" className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
        <p className="text-amber-600 text-[11px] font-bold uppercase tracking-widest mb-3">{isUk ? "Відгуки" : "Testimonials"}</p>
        <h2 className="text-[32px] font-bold text-green-950 mb-10">{isUk ? "Про нас говорять" : "What people say"}</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { stars: 5, textUk: "Вже 2 роки постачаємо борошно AgroUA в нашу пекарню. Якість стабільна, завжди вчасно, документи в порядку. Рекомендую всім хто шукає надійного постачальника зерна.", textEn: "We've sourced AgroUA flour for 2 years. Consistent quality, always on time, docs in order. Highly recommend to anyone looking for a reliable grain supplier.", nameUk: "Олексій Руденко", nameEn: "Oleksiy Rudenko", roleUk: "Директор пекарні «Хліб & Сіль»", roleEn: "Director, Khlib & Sil Bakery", type: "B2B" },
            { stars: 5, textUk: "Нарешті знайшла гречку без хімії! Замовляємо щотижня. Діти їдять із задоволенням, я знаю що вони їдять — і це головне. Дякую фермерам за чесність.", textEn: "Finally found chemical-free buckwheat! Weekly orders. Kids love it and I know exactly what they're eating — that's what matters.", nameUk: "Марина Вересень", nameEn: "Maryna Veresen", roleUk: "Мама трьох дітей, Полтава", roleEn: "Mother of three, Poltava", type: "B2C" },
            { stars: 5, textUk: "AgroUA — наш основний постачальник соняшникової олії вже три сезони. Обсяги від 5 тонн, ціни узгоджуємо завчасно, якість висока. Найголовніше — завжди є сертифікати.", textEn: "AgroUA is our main sunflower oil supplier for three seasons. 5+ ton batches, prices agreed in advance, high quality. Most importantly — certificates always available.", nameUk: "Тетяна Бойко", nameEn: "Tetiana Boiko", roleUk: "Менеджер із закупівель, Варус", roleEn: "Procurement manager, Varus", type: "B2B" },
          ].map((r, i) => (
            <div key={i} className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-0.5">{[...Array(r.stars)].map((_, j) => <span key={j} className="text-amber-400 text-sm">★</span>)}</div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${r.type === "B2B" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}>{r.type}</span>
              </div>
              <p className="text-stone-600 text-[13px] leading-relaxed mb-5 italic">"{isUk ? r.textUk : r.textEn}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
                <div className="w-9 h-9 rounded-full bg-linear-to-br from-amber-400 to-green-600 flex items-center justify-center text-white font-bold text-sm">
                  {(isUk ? r.nameUk : r.nameEn)[0]}
                </div>
                <div>
                  <p className="font-bold text-stone-900 text-[13px]">{isUk ? r.nameUk : r.nameEn}</p>
                  <p className="text-stone-400 text-[11px]">{isUk ? r.roleUk : r.roleEn}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-green-950">
        {/* CTA band */}
        <div className="border-b border-green-900/60">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-white font-bold text-[20px] mb-1">{isUk ? "Хочете стати оптовим партнером?" : "Want to become a wholesale partner?"}</p>
              <p className="text-green-400 text-[14px]">{isUk ? "Стабільні поставки · Всі документи · Від 500 кг" : "Stable supply · Full documentation · From 500 kg"}</p>
            </div>
            <button onClick={() => setB2bOpen(true)}
              className="shrink-0 px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-white font-bold rounded-2xl text-[14px] transition-colors shadow-lg shadow-amber-900/30">
              {isUk ? "Надіслати оптовий запит" : "Send wholesale inquiry"}
            </button>
          </div>
        </div>

        {/* Main grid */}
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="text-3xl">🌾</span>
              <div>
                <p className="font-bold text-white text-[18px] leading-none">AgroUA</p>
                <p className="text-[10px] text-amber-500 font-bold uppercase tracking-widest mt-0.5">{isUk ? "Органічна ферма" : "Organic Farm"}</p>
              </div>
            </div>
            <p className="text-green-500 text-[13px] leading-relaxed mb-5">
              {isUk
                ? "Вирощуємо без хімії з 2015 року. 1\u202f200 га органічних угідь у Полтавській обл. Пряма B2C і B2B торгівля."
                : "Chemical-free farming since 2015. 1,200 ha of organic fields in Poltava region. Direct B2C and B2B sales."}
            </p>
            {/* Cert badges */}
            <div className="flex flex-wrap gap-2">
              {["UA-BIO-109", "HACCP", "ISO 22000"].map(b => (
                <span key={b} className="text-[10px] font-bold bg-green-900 border border-green-700 text-green-300 px-2.5 py-1 rounded-lg">{b}</span>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <p className="text-white font-semibold text-[13px] mb-4 uppercase tracking-wider">{isUk ? "Продукція" : "Products"}</p>
            <ul className="space-y-2.5 text-[13px]">
              {(isUk
                ? ["🌻 Соняшникова олія", "🌾 Пшениця та борошно", "🫘 Гречка фермерська", "🍅 Овочі та фрукти", "🌽 Кукурудза", "🫙 Ріпакова олія"]
                : ["🌻 Sunflower oil", "🌾 Wheat & flour", "🫘 Farm buckwheat", "🍅 Vegetables & fruit", "🌽 Corn", "🫙 Rapeseed oil"]
              ).map(l => (
                <li key={l}><a href="#catalog" className="text-green-400 hover:text-amber-300 transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <p className="text-white font-semibold text-[13px] mb-4 uppercase tracking-wider">{isUk ? "Про нас" : "About"}</p>
            <ul className="space-y-2.5 text-[13px]">
              {(isUk
                ? ["🗓 Сезонний календар", "🛡 Сертифікати органіки", "📦 Умови B2B-поставок", "📍 Наша ферма (GPS)", "⭐ Відгуки клієнтів"]
                : ["🗓 Harvest calendar", "🛡 Organic certificates", "📦 B2B delivery terms", "📍 Our farm (GPS)", "⭐ Client reviews"]
              ).map(l => (
                <li key={l}><a href="#" className="text-green-400 hover:text-amber-300 transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white font-semibold text-[13px] mb-4 uppercase tracking-wider">{isUk ? "Контакти" : "Contacts"}</p>
            <ul className="space-y-3 text-[13px] text-green-400">
              <li className="flex items-start gap-2.5">
                <span className="shrink-0 mt-0.5">📍</span>
                <span>{isUk ? "с. Велика Рублівка, Великобагачанський р-н, Полтавська обл." : "v. Velyka Rublivka, Velykobahachansky district, Poltava region"}</span>
              </li>
              <li className="flex items-center gap-2.5"><span>📞</span> <a href="tel:+380501234567" className="hover:text-white transition-colors">+38 (050) 123-45-67</a></li>
              <li className="flex items-center gap-2.5"><span>✉️</span> <a href="mailto:info@agroua.com.ua" className="hover:text-white transition-colors">info@agroua.com.ua</a></li>
              <li className="flex items-center gap-2.5"><span>🕐</span> <span>{isUk ? "Пн–Пт 8:00–18:00" : "Mon–Fri 8:00–18:00"}</span></li>
            </ul>
            {/* Social */}
            <div className="flex gap-3 mt-5">
              {[
                { icon: "📘", label: "Facebook" },
                { icon: "📸", label: "Instagram" },
                { icon: "✈️", label: "Telegram" },
              ].map(s => (
                <a key={s.label} href="#" title={s.label}
                  className="w-9 h-9 rounded-xl bg-green-900 hover:bg-green-800 border border-green-800 flex items-center justify-center text-[16px] transition-colors">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-green-900/60">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[12px] text-green-800">© 2025 AgroUA. {isUk ? "Всі права захищено." : "All rights reserved."}</p>
            <div className="flex items-center gap-5 text-[12px] text-green-700">
              <a href="#" className="hover:text-green-500 transition-colors">{isUk ? "Умови використання" : "Terms"}</a>
              <a href="#" className="hover:text-green-500 transition-colors">{isUk ? "Конфіденційність" : "Privacy"}</a>
              <span className="text-green-900">|</span>
              <span className="text-green-800">{isUk ? "Демо — портфоліо Codeworth" : "Demo — Codeworth portfolio"}</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ── B2B MODAL ── */}
      {b2bOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setB2bOpen(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            {b2bDone ? (
              <div className="text-center py-6">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="font-bold text-xl text-green-900 mb-2">{isUk ? "Запит надіслано!" : "Request sent!"}</h3>
                <p className="text-stone-500 text-sm">{isUk ? "Менеджер зв'яжеться з вами протягом 1 робочого дня" : "Our manager will contact you within 1 business day"}</p>
                <button onClick={() => { setB2bOpen(false); setB2bDone(false); }} className="mt-5 px-6 py-2.5 bg-green-800 text-white rounded-xl font-semibold text-sm">OK</button>
              </div>
            ) : (
              <>
                <h3 className="font-bold text-[20px] text-green-900 mb-1">{isUk ? "Оптовий запит" : "Wholesale Inquiry"}</h3>
                <p className="text-stone-400 text-sm mb-6">{isUk ? "Мінімальна партія: 500 кг / 100 л · Всі документи надаємо" : "Min order: 500 kg / 100 L · Full documentation provided"}</p>
                <div className="space-y-3 mb-5">
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" placeholder={isUk ? "Компанія" : "Company"} className="px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-green-400" />
                    <input type="text" placeholder={isUk ? "ЄДРПОУ" : "Tax ID"} className="px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-green-400" />
                  </div>
                  <select className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-green-400 text-stone-600">
                    <option>{isUk ? "Оберіть продукцію" : "Select product"}</option>
                    {PRODUCTS.map(p => <option key={p.id}>{isUk ? p.nameUk : p.nameEn}</option>)}
                  </select>
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" placeholder={isUk ? "Обсяг (кг/л)" : "Volume (kg/L)"} className="px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-green-400" />
                    <input type="tel" placeholder={isUk ? "Телефон" : "Phone"} className="px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-green-400" />
                  </div>
                  <textarea rows={2} placeholder={isUk ? "Коментар (терміни, умови доставки...)" : "Comment (timeline, delivery terms...)"} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-green-400 resize-none" />
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setB2bOpen(false)} className="flex-1 py-3 rounded-xl border border-stone-200 text-stone-600 text-sm font-medium hover:bg-stone-50 transition-colors">
                    {isUk ? "Скасувати" : "Cancel"}
                  </button>
                  <button onClick={() => setB2bDone(true)} className="flex-1 py-3 rounded-xl bg-green-800 hover:bg-green-900 text-white text-sm font-bold transition-colors">
                    {isUk ? "Надіслати" : "Send inquiry"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
