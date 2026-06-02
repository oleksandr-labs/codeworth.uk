"use client";

import { useState } from "react";

interface Props { lang: string; }

const BOX_ITEMS = [
  { emoji: "🥕", ukName: "Морква Нантська", enName: "Nantes Carrots", weight: "800г", ukField: "Поле №7, Броварський р-н", enField: "Field #7, Brovary district" },
  { emoji: "🥦", ukName: "Броколі", enName: "Broccoli", weight: "500г", ukField: "Поле №12", enField: "Field #12" },
  { emoji: "🥬", ukName: "Шпинат", enName: "Baby Spinach", weight: "300г", ukField: "Теплиця №3", enField: "Greenhouse #3" },
  { emoji: "🍅", ukName: "Томати чері", enName: "Cherry Tomatoes", weight: "400г", ukField: "Теплиця №1", enField: "Greenhouse #1" },
  { emoji: "🥒", ukName: "Огірки", enName: "Cucumbers", weight: "600г", ukField: "Поле №4", enField: "Field #4" },
  { emoji: "🧅", ukName: "Цибуля-порей", enName: "Leek", weight: "400г", ukField: "Поле №9", enField: "Field #9" },
  { emoji: "🌿", ukName: "Кріп та петрушка", enName: "Dill & Parsley", weight: "100г", ukField: "Теплиця №2", enField: "Greenhouse #2" },
  { emoji: "🫑", ukName: "Перець болгарський", enName: "Bell Pepper", weight: "500г", ukField: "Теплиця №1", enField: "Greenhouse #1" },
  { emoji: "🥗", ukName: "Салат Батавія", enName: "Batavia Lettuce", weight: "200г", ukField: "Теплиця №4", enField: "Greenhouse #4" },
  { emoji: "🧄", ukName: "Часник молодий", enName: "Young Garlic", weight: "150г", ukField: "Поле №5", enField: "Field #5" },
];

const RECIPES = [
  {
    emoji: "🥗",
    ukTitle: "Весняний салат з броколі та морквою",
    enTitle: "Spring Broccoli & Carrot Salad",
    ukTime: "15 хв",
    enTime: "15 min",
    difficulty: "easy",
    ukTags: ["броколі", "морква", "шпинат", "часник"],
    enTags: ["broccoli", "carrot", "spinach", "garlic"],
    ukDesc: "Легкий вітамінний салат з хрусткою морквою та свіжою зеленню. Ідеально для весняного детоксу.",
    enDesc: "Light vitamin salad with crunchy carrot and fresh greens. Perfect for spring detox.",
  },
  {
    emoji: "🍲",
    ukTitle: "Томатний суп з перцем та зеленню",
    enTitle: "Tomato Pepper Soup with Fresh Herbs",
    ukTime: "30 хв",
    enTime: "30 min",
    difficulty: "medium",
    ukTags: ["томати", "перець", "цибуля-порей", "кріп"],
    enTags: ["tomatoes", "pepper", "leek", "dill"],
    ukDesc: "Густий ароматний суп зі свіжих томатів та перцю. Подавати з хрустким хлібом.",
    enDesc: "Rich aromatic soup from fresh tomatoes and peppers. Serve with crusty bread.",
  },
  {
    emoji: "🥘",
    ukTitle: "Овочеве рагу в духовці",
    enTitle: "Roasted Vegetable Ratatouille",
    ukTime: "45 хв",
    enTime: "45 min",
    difficulty: "medium",
    ukTags: ["огірки", "морква", "перець", "часник"],
    enTags: ["cucumber", "carrot", "pepper", "garlic"],
    ukDesc: "Класичний французький рататуй з сезонних овочів. Підходить як гарнір або самостійна страва.",
    enDesc: "Classic French ratatouille from seasonal vegetables. Works as side dish or main course.",
  },
  {
    emoji: "🫕",
    ukTitle: "Крем-суп з броколі та вершками",
    enTitle: "Broccoli Cream Soup",
    ukTime: "25 хв",
    enTime: "25 min",
    difficulty: "easy",
    ukTags: ["броколі", "цибуля-порей", "петрушка"],
    enTags: ["broccoli", "leek", "parsley"],
    ukDesc: "Ніжний оксамитовий суп із зеленою броколі та вершками. Швидко і дуже смачно.",
    enDesc: "Velvety smooth soup with green broccoli and cream. Quick and very delicious.",
  },
];

const SEASONS_CHART = [
  { ukN: "Морква", enN: "Carrot", months: [0,1,2,3,4,8,9,10,11], color: "bg-orange-400" },
  { ukN: "Броколі", enN: "Broccoli", months: [2,3,4,8,9,10], color: "bg-green-500" },
  { ukN: "Томати", enN: "Tomatoes", months: [5,6,7,8], color: "bg-red-500" },
  { ukN: "Огірки", enN: "Cucumbers", months: [4,5,6,7,8], color: "bg-green-400" },
  { ukN: "Перець", enN: "Pepper", months: [6,7,8,9], color: "bg-yellow-400" },
  { ukN: "Шпинат", enN: "Spinach", months: [1,2,3,4,8,9,10], color: "bg-emerald-500" },
  { ukN: "Кукурудза", enN: "Corn", months: [6,7,8], color: "bg-yellow-300" },
  { ukN: "Гарбуз", enN: "Pumpkin", months: [8,9,10], color: "bg-orange-500" },
  { ukN: "Буряк", enN: "Beetroot", months: [1,2,3,4,5,8,9,10,11], color: "bg-red-400" },
];

const FAQ_DATA = [
  {
    qUk: "Що таке CSA і чим це відрізняється від доставки продуктів?",
    qEn: "What is CSA and how is it different from grocery delivery?",
    aUk: "CSA (Community Supported Agriculture) — це коли ви підтримуєте ферму наперед, а ми вирощуємо для вас. На відміну від доставки продуктів із супермаркету, у кошику — виключно сезонне та органічне від нашої ферми, зібране за день до доставки. Ви знаєте конкретне поле, де виросли ваші овочі.",
    aEn: "CSA means you support the farm in advance and we grow specifically for you. Unlike supermarket delivery, the box contains only seasonal, organic produce from our farm, harvested the day before delivery. You know the exact field where your vegetables grew.",
  },
  {
    qUk: "Як часто доставляють кошик і в які дні?",
    qEn: "How often is the box delivered and on which days?",
    aUk: "Доставляємо щотижня (вівторок або п'ятниця) або через тиждень — на ваш вибір при оформленні. Вівторок — для жителів правого берега Києва, п'ятниця — лівий берег та передмістя. День можна змінити у особистому кабінеті.",
    aEn: "We deliver weekly (Tuesday or Friday) or bi-weekly — your choice at signup. Tuesday is for right-bank Kyiv, Friday for left-bank and suburbs. You can change the day in your account.",
  },
  {
    qUk: "Чи можна пропустити тиждень або призупинити підписку?",
    qEn: "Can I skip a week or pause my subscription?",
    aUk: "Так. Пропустити тиждень або поставити паузу можна у особистому кабінеті до середи 18:00 поточного тижня. Пауза — до 4 тижнів без втрати підписки. Кошти за пропущені тижні не списуються.",
    aEn: "Yes. You can skip a week or pause in your account by Wednesday 18:00 of the current week. Pause up to 4 weeks without losing your subscription. No charges for skipped weeks.",
  },
  {
    qUk: "Які розміри кошиків є і скільки це коштує?",
    qEn: "What box sizes are available and what do they cost?",
    aUk: "S (2–3 особи) — 380 ₴/тиж, M (4–5 осіб) — 560 ₴/тиж, L (6+ або запаси) — 780 ₴/тиж. Можна додати яйця, зелень або фрукти. Перший кошик — зі знижкою 15% за промокодом FIRSTBOX.",
    aEn: "S (2–3 people) — 380 ₴/wk, M (4–5 people) — 560 ₴/wk, L (6+ or pantry stocking) — 780 ₴/wk. Optional add-ons: eggs, herbs, or fruit. First box 15% off with promo code FIRSTBOX.",
  },
  {
    qUk: "Як скасувати підписку?",
    qEn: "How do I cancel my subscription?",
    aUk: "Скасувати можна будь-коли у особистому кабінеті → «Моя підписка» → «Скасувати». Скасування до середи — без списання за поточний тиждень. Ми не практикуємо прихованих комісій та складних процедур.",
    aEn: "Cancel anytime in your account → 'My subscription' → 'Cancel'. Cancellation before Wednesday — no charge for current week. No hidden fees or complicated procedures.",
  },
  {
    qUk: "Яка оплата — чи можна безготівково?",
    qEn: "What payment methods are accepted?",
    aUk: "Так, приймаємо карти Visa/Mastercard через LiqPay, а також ФОП-рахунок для юросіб. Оплата щотижня автоматично перед доставкою. Готівку кур'єру не приймаємо.",
    aEn: "Yes, we accept Visa/Mastercard via LiqPay and bank transfer for businesses. Automatic weekly charge before each delivery. No cash on delivery.",
  },
];

export function OrganicBoxDemo({ lang }: Props) {
  const isUk = lang === "uk";
  const [subStep, setSubStep] = useState(1);
  const [sub, setSub] = useState({ size: "", freq: "", extras: [] as string[], address: "", name: "", email: "" });
  const [subDone, setSubDone] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [showAccount, setShowAccount] = useState(false);
  const [accountTab, setAccountTab] = useState<"sub" | "history" | "address">("sub");

  const months = isUk
    ? ["Сiч","Лют","Бер","Квіт","Трав","Черв","Лип","Серп","Вер","Жовт","Лист","Груд"]
    : ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ── NAV ── */}
      <header className="sticky top-0 z-50 bg-white/96 backdrop-blur border-b border-stone-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-green-600 flex items-center justify-center text-white font-black text-[16px]">🥬</div>
            <div className="leading-none">
              <p className="font-black text-green-900 text-[17px]">OrganicBox</p>
              <p className="text-[10px] text-orange-500 font-bold uppercase tracking-wider">CSA · Київ</p>
            </div>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-[13px] font-medium text-stone-600">
            <a href="#thisweek" className="hover:text-green-700 transition-colors">{isUk ? "Кошик тижня" : "This Week"}</a>
            <a href="#subscribe" className="hover:text-green-700 transition-colors">{isUk ? "Підписка" : "Subscribe"}</a>
            <a href="#recipes" className="hover:text-green-700 transition-colors">{isUk ? "Рецепти" : "Recipes"}</a>
            <a href="#calendar" className="hover:text-green-700 transition-colors">{isUk ? "Сезони" : "Seasons"}</a>
            <a href="#faq" className="hover:text-green-700 transition-colors">FAQ</a>
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowAccount(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 border border-stone-200 hover:border-green-400 text-stone-600 hover:text-green-700 text-[13px] font-medium rounded-xl transition-colors">
              <span>👤</span> {isUk ? "Кабінет" : "Account"}
            </button>
            <a href="#subscribe"
              className="hidden sm:block px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-[13px] font-bold rounded-xl transition-colors">
              {isUk ? "🧺 Підписатись" : "🧺 Subscribe"}
            </a>
            <button onClick={() => setMobileNav(!mobileNav)} className="md:hidden p-2 text-stone-500">☰</button>
          </div>
        </div>
        {mobileNav && (
          <div className="md:hidden bg-white dark:bg-neutral-800 border-t border-stone-100 px-5 py-3 flex flex-col gap-3 text-sm text-stone-600">
            {(isUk ? ["Кошик тижня","Підписка","Рецепти","Сезони","FAQ","Кабінет"] : ["This Week","Subscribe","Recipes","Seasons","FAQ","Account"]).map((l, i) => (
              i === 5
                ? <button key={l} onClick={() => { setShowAccount(true); setMobileNav(false); }} className="text-left hover:text-green-700">{l}</button>
                : <a key={l} href="#" onClick={() => setMobileNav(false)} className="hover:text-green-700">{l}</a>
            ))}
          </div>
        )}
      </header>

      {/* ── HERO — bright DTC brand style (HelloFresh / Oddbox) ── */}
      <section className="bg-[#FDFCF7] border-b border-stone-200">
        {/* Top accent bar */}
        <div className="w-full bg-green-700 py-2 px-5 text-center text-[12px] text-white font-semibold tracking-wide">
          {isUk
            ? "🌱 Перший кошик зі знижкою 15% — промокод FIRSTBOX"
            : "🌱 First box 15% off — promo code FIRSTBOX"}
        </div>

        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 sm:py-20 grid lg:grid-cols-[1fr_440px] gap-10 xl:gap-16 items-center">
          {/* LEFT: text */}
          <div>
            {/* Organic badge */}
            <div className="inline-flex items-center gap-2 bg-orange-100 border border-orange-300 text-orange-700 text-[11px] font-bold px-3.5 py-1.5 rounded-full mb-7 tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              {isUk ? "Органічний сертифікат UA-BIO · Київ" : "Organic Certificate UA-BIO · Kyiv"}
            </div>

            <h1 className="text-[46px] sm:text-[64px] font-black text-stone-900 leading-[1.0] mb-6" style={{ letterSpacing: "-0.03em" }}>
              {isUk
                ? <><span className="text-green-700">Органічні</span><br />овочі від ферми<br /><span className="relative inline-block"><span className="relative z-10 text-stone-900">щотижня</span><span className="absolute bottom-1 left-0 w-full h-4 bg-orange-300/60 -z-0 rounded" /></span></>
                : <><span className="text-green-700">Organic</span><br />vegetables from<br /><span className="relative inline-block"><span className="relative z-10 text-stone-900">farm weekly</span><span className="absolute bottom-1 left-0 w-full h-4 bg-orange-300/60 -z-0 rounded" /></span></>}
            </h1>

            <p className="text-stone-500 text-[17px] leading-relaxed mb-8 max-w-lg">
              {isUk
                ? "Сезонний кошик зібраний вранці — у вас увечері. Без пестицидів, без посередників, з рецептами під кожен вміст."
                : "Seasonal box harvested in the morning — at your door by evening. No pesticides, no middlemen, recipes included."}
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <a href="#subscribe"
                className="px-7 py-4 bg-green-700 hover:bg-green-800 text-white font-black rounded-2xl text-[15px] transition-colors shadow-lg shadow-green-900/20">
                {isUk ? "🧺 Підписатись зараз" : "🧺 Subscribe now"}
              </a>
              <a href="#thisweek"
                className="px-7 py-4 border-2 border-stone-300 hover:border-orange-400 bg-white text-stone-700 hover:text-orange-600 font-bold rounded-2xl text-[15px] transition-all">
                {isUk ? "Що в кошику?" : "What's in the box?"}
              </a>
            </div>

            {/* Trust strip */}
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {[
                { icon: "✅", t: isUk ? "Органічний сертифікат" : "Organic certified" },
                { icon: "🚚", t: isUk ? "Доставка Вт і Пт" : "Delivery Tue & Fri" },
                { icon: "⏸", t: isUk ? "Легко поставити на паузу" : "Easy pause/cancel" },
                { icon: "🌾", t: isUk ? "Від ферми напряму" : "Direct from farm" },
              ].map(f => (
                <span key={f.t} className="flex items-center gap-1.5 text-[13px] text-stone-500 font-medium">
                  <span>{f.icon}</span>{f.t}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT: vivid green box-preview card */}
          <div className="relative">
            {/* Main card — green background */}
            <div className="bg-green-700 rounded-3xl overflow-hidden shadow-2xl">
              {/* Header */}
              <div className="px-6 pt-6 pb-4 flex items-center justify-between">
                <div>
                  <p className="text-green-200 text-[11px] font-bold uppercase tracking-widest mb-0.5">
                    {isUk ? "Кошик цього тижня" : "This week's box"}
                  </p>
                  <p className="text-white font-black text-[18px]">{isUk ? "Розмір M · 4–5 осіб" : "Size M · 4–5 people"}</p>
                </div>
                <div className="bg-orange-400 text-white text-[11px] font-black px-3 py-1.5 rounded-full uppercase tracking-wide">
                  {isUk ? "24–30 бер" : "Mar 24–30"}
                </div>
              </div>

              {/* Veg grid */}
              <div className="grid grid-cols-5 gap-2 px-5 pb-4">
                {BOX_ITEMS.slice(0, 10).map((item, i) => (
                  <div key={i} className="bg-green-600/50 hover:bg-green-500/60 transition-colors rounded-xl py-2.5 text-center cursor-default group">
                    <div className="text-[22px] group-hover:scale-110 transition-transform">{item.emoji}</div>
                    <p className="text-[9px] text-green-200 mt-1 leading-tight px-0.5">{isUk ? item.ukName.split(" ")[0] : item.enName.split(" ")[0]}</p>
                    <p className="text-[8px] text-green-300/70">{item.weight}</p>
                  </div>
                ))}
              </div>

              {/* Surprise of the week */}
              <div className="mx-5 mb-4 bg-orange-400/20 border border-orange-300/30 rounded-2xl p-3 flex items-center gap-3">
                <span className="text-2xl">🧄</span>
                <div>
                  <p className="text-orange-200 text-[10px] font-bold uppercase tracking-wide">{isUk ? "Сюрприз тижня" : "Week's surprise"}</p>
                  <p className="text-white font-semibold text-[13px]">{isUk ? "Часник молодий · Поле №5" : "Young Garlic · Field #5"}</p>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-white/10 px-5 py-4 flex items-center justify-between">
                <div>
                  <p className="text-green-300 text-[11px] font-bold">{isUk ? "Розмір M · щотижня" : "Size M · weekly"}</p>
                  <p className="text-white font-black text-[22px]">560 ₴ <span className="text-green-300 text-[14px] font-normal">{isUk ? "/ кошик" : "/ box"}</span></p>
                </div>
                <a href="#subscribe"
                  className="px-5 py-3 bg-orange-500 hover:bg-orange-400 text-white font-black rounded-2xl text-[14px] transition-colors shadow-lg">
                  {isUk ? "Хочу цей!" : "I want this!"}
                </a>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-white dark:bg-neutral-800 border-2 border-orange-400 rounded-2xl px-3.5 py-2.5 shadow-lg text-center">
              <p className="text-orange-500 font-black text-[20px] leading-none">350</p>
              <p className="text-stone-500 text-[10px] font-semibold leading-snug">{isUk ? "родин вже\nпідписані" : "families\nsubscribed"}</p>
            </div>
          </div>
        </div>

        {/* Stats band — orange bottom */}
        <div className="bg-orange-500">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { n: "350", l: isUk ? "Підписників" : "Subscribers" },
              { n: "100%", l: isUk ? "Органічне" : "Organic" },
              { n: "0", l: isUk ? "Посередників" : "Middlemen" },
              { n: "2019", l: isUk ? "Рік заснування" : "Founded" },
            ].map(s => (
              <div key={s.l} className="text-center">
                <p className="text-white font-black text-[22px] leading-none">{s.n}</p>
                <p className="text-orange-100 text-[11px] font-semibold uppercase tracking-wide mt-0.5">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
        <h2 className="text-[32px] font-black text-green-950 text-center mb-12">{isUk ? "Як це працює?" : "How it works?"}</h2>
        <div className="grid sm:grid-cols-4 gap-6 relative">
          <div className="absolute top-6 left-[12%] right-[12%] h-0.5 bg-linear-to-r from-green-200 via-orange-200 to-green-200 hidden sm:block" />
          {[
            { n: "01", emoji: "🧺", ukT: "Обираєш кошик", enT: "Choose your box", ukD: "S, M або L — залежно від розміру родини та апетиту", enD: "S, M or L — depending on household size and appetite" },
            { n: "02", emoji: "🌱", ukT: "Ферма збирає", enT: "Farm harvests", ukD: "Щотижня — свіжі сезонні культури прямо з грядки", enD: "Every week — fresh seasonal crops straight from the bed" },
            { n: "03", emoji: "🚚", ukT: "Доставляємо", enT: "We deliver", ukD: "Вівторок або п'ятниця — до дверей або пункту самовивозу", enD: "Tuesday or Friday — to door or pickup point" },
            { n: "04", emoji: "👨‍🍳", ukT: "Готуєш", enT: "You cook", ukD: "Рецепти під вміст кожного кошика — на email та у застосунку", enD: "Recipes for every box — by email and in app" },
          ].map(s => (
            <div key={s.n} className="text-center relative z-10">
              <div className="w-12 h-12 rounded-full bg-white dark:bg-neutral-800 border-2 border-green-200 shadow-md flex items-center justify-center text-2xl mx-auto mb-3">
                {s.emoji}
              </div>
              <p className="font-black text-green-900 mb-1.5 text-[15px]">{isUk ? s.ukT : s.enT}</p>
              <p className="text-stone-500 text-[12px] leading-relaxed">{isUk ? s.ukD : s.enD}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── THIS WEEK'S BOX ── */}
      <section id="thisweek" className="bg-linear-to-br from-green-50 to-orange-50 border-y border-green-100 py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
            <div>
              <p className="text-orange-500 text-[11px] font-bold uppercase tracking-widest mb-2">{isUk ? "24–30 березня 2026" : "March 24–30, 2026"}</p>
              <h2 className="text-[32px] font-black text-green-950">{isUk ? "Кошик цього тижня" : "This Week's Box"}</h2>
              <p className="text-stone-500 text-sm mt-1">{isUk ? "Розмір M · 10 позицій · ~5 кг" : "Size M · 10 items · ~5 kg"}</p>
            </div>
            <div className="bg-orange-100 border-2 border-orange-300 rounded-2xl px-5 py-3 text-center">
              <p className="text-[11px] text-orange-500 font-bold uppercase tracking-wide">{isUk ? "🎉 Сюрприз тижня" : "🎉 Week surprise"}</p>
              <p className="font-black text-orange-700 text-[17px]">{isUk ? "Часник молодий" : "Young Garlic"}</p>
              <p className="text-[11px] text-orange-500">{isUk ? "вперше цього сезону!" : "first of the season!"}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-12">
            {BOX_ITEMS.map((item, i) => (
              <div key={i} className="bg-white border border-green-100 rounded-2xl p-4 text-center shadow-sm hover:shadow-md transition-all group">
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">{item.emoji}</div>
                <p className="font-semibold text-stone-900 text-[13px] leading-tight mb-1">{isUk ? item.ukName : item.enName}</p>
                <p className="text-[11px] text-stone-400 mb-1">{item.weight}</p>
                <p className="text-[10px] text-green-600">📍 {isUk ? item.ukField : item.enField}</p>
              </div>
            ))}
          </div>

          {/* Subscribe CTA */}
          <div className="bg-green-700 rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-5">
            <div>
              <h3 className="font-black text-white text-[22px] mb-1">{isUk ? "Хочете такий кошик щотижня?" : "Want this box every week?"}</h3>
              <p className="text-green-200 text-[14px]">{isUk ? "Оформіть підписку і отримуйте свіжі органічні овочі без зусиль" : "Subscribe and get fresh organic vegetables effortlessly"}</p>
            </div>
            <a href="#subscribe"
              className="shrink-0 px-7 py-4 bg-orange-500 hover:bg-orange-400 text-white font-black rounded-2xl text-[15px] transition-colors whitespace-nowrap">
              {isUk ? "Підписатись" : "Subscribe now"}
            </a>
          </div>
        </div>
      </section>

      {/* ── SUBSCRIPTION PLANS ── */}
      <section id="subscribe" className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
        <p className="text-orange-500 text-[11px] font-bold uppercase tracking-widest mb-3">{isUk ? "Плани" : "Plans"}</p>
        <h2 className="text-[34px] font-black text-green-950 mb-2">{isUk ? "Оберіть свій кошик" : "Choose your box"}</h2>
        <p className="text-stone-500 mb-10">{isUk ? "Щотижня або через тиждень — як вам зручно" : "Every week or bi-weekly — whatever suits you"}</p>

        <div className="grid sm:grid-cols-3 gap-6 mb-14">
          {[
            { size: "S", ukDesc: "2–3 особи", enDesc: "2–3 people", ukItems: "8–10 позицій · ~3 кг", enItems: "8–10 items · ~3 kg", ukPrice: "720 ₴/тиж", enPrice: "720 ₴/week", color: "border-stone-200 hover:border-green-400", btn: "bg-stone-100 hover:bg-stone-200 text-stone-800", badge: null },
            { size: "M", ukDesc: "4–5 осіб", enDesc: "4–5 people", ukItems: "10–12 позицій · ~5 кг", enItems: "10–12 items · ~5 kg", ukPrice: "980 ₴/тиж", enPrice: "980 ₴/week", color: "border-green-500 ring-2 ring-green-200", btn: "bg-green-600 hover:bg-green-700 text-white shadow-lg", badge: isUk ? "Найпопулярніший" : "Most popular" },
            { size: "L", ukDesc: "6+ або запаси", enDesc: "6+ or stocking up", ukItems: "14–16 позицій · ~8 кг", enItems: "14–16 items · ~8 kg", ukPrice: "1 340 ₴/тиж", enPrice: "1,340 ₴/week", color: "border-orange-300 hover:border-orange-500", btn: "bg-orange-500 hover:bg-orange-600 text-white", badge: null },
          ].map(p => (
            <div key={p.size} className={`rounded-3xl border-2 ${p.color} p-8 relative transition-all`}>
              {p.badge && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[11px] bg-green-600 text-white font-bold px-3.5 py-1 rounded-full whitespace-nowrap">{p.badge}</span>
              )}
              <p className="font-black text-[52px] text-green-950 leading-none mb-2">{p.size}</p>
              <p className="text-stone-500 text-[14px] mb-1">{isUk ? p.ukDesc : p.enDesc}</p>
              <p className="text-stone-400 text-[12px] mb-5">{isUk ? p.ukItems : p.enItems}</p>
              <p className="font-black text-green-700 text-[22px] mb-6">{isUk ? p.ukPrice : p.enPrice}</p>
              <button className={`w-full py-3 rounded-2xl font-bold text-[14px] transition-colors ${p.btn}`}
                onClick={() => { setSub(d => ({ ...d, size: p.size })); setSubStep(1); document.getElementById('subform')?.scrollIntoView({ behavior: 'smooth' }); }}>
                {isUk ? "Обрати" : "Choose"}
              </button>
            </div>
          ))}
        </div>

        {/* Subscription form */}
        <div id="subform" className="bg-linear-to-br from-green-50 to-emerald-50 border border-green-200 rounded-3xl p-8 max-w-2xl mx-auto">
          {subDone ? (
            <div className="text-center py-10">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="font-black text-green-900 text-[26px] mb-2">{isUk ? "Підписку оформлено!" : "Subscription confirmed!"}</h3>
              <p className="text-stone-500 mb-1">{isUk ? `Кошик ${sub.size}` : `Box ${sub.size}`} · {sub.freq === "weekly" ? (isUk ? "Щотижнева доставка" : "Weekly delivery") : (isUk ? "Через тиждень" : "Bi-weekly")}</p>
              <p className="text-green-600 font-semibold text-[14px]">{isUk ? "Перший кошик — наступного вівторка 🥕" : "First box arrives next Tuesday 🥕"}</p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-6">
                {[1,2,3].map(s => (
                  <div key={s} className="flex items-center gap-2 flex-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-black shrink-0 ${s < subStep ? "bg-green-600 text-white" : s === subStep ? "bg-green-600 text-white ring-4 ring-green-200" : "bg-stone-200 text-stone-400"}`}>
                      {s < subStep ? "✓" : s}
                    </div>
                    <span className="text-[12px] text-stone-500 hidden sm:block">
                      {isUk ? ["Кошик", "Частота + Доп.", "Контакти"][s-1] : ["Box size", "Frequency + Extras", "Contact"][s-1]}
                    </span>
                    {s < 3 && <div className={`flex-1 h-0.5 ${s < subStep ? "bg-green-500" : "bg-stone-200"}`} />}
                  </div>
                ))}
              </div>

              {subStep === 1 && (
                <div>
                  <h3 className="font-black text-green-900 text-[20px] mb-5">{isUk ? "Розмір кошика" : "Box size"}</h3>
                  <div className="space-y-3">
                    {["S","M","L"].map(sz => (
                      <button key={sz} onClick={() => setSub(d => ({ ...d, size: sz }))}
                        className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${sub.size === sz ? "border-green-500 bg-green-50" : "border-stone-200 bg-white dark:bg-neutral-800 hover:border-green-300"}`}>
                        <div className={`w-10 h-10 rounded-xl font-black text-[18px] flex items-center justify-center shrink-0 ${sub.size === sz ? "bg-green-600 text-white" : "bg-stone-100 text-stone-600"}`}>{sz}</div>
                        <div>
                          <p className="font-bold text-stone-900">{sz === "S" ? (isUk ? "Маленький · 2–3 особи · 720 ₴/тиж" : "Small · 2–3 people · 720 ₴/week") : sz === "M" ? (isUk ? "Середній · 4–5 осіб · 980 ₴/тиж ⭐" : "Medium · 4–5 people · 980 ₴/week ⭐") : (isUk ? "Великий · 6+ осіб · 1 340 ₴/тиж" : "Large · 6+ people · 1,340 ₴/week")}</p>
                          <p className="text-[12px] text-stone-400">{sz === "S" ? (isUk ? "8–10 позицій, ~3 кг" : "8–10 items, ~3 kg") : sz === "M" ? (isUk ? "10–12 позицій, ~5 кг" : "10–12 items, ~5 kg") : (isUk ? "14–16 позицій, ~8 кг" : "14–16 items, ~8 kg")}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {subStep === 2 && (
                <div>
                  <h3 className="font-black text-green-900 text-[20px] mb-5">{isUk ? "Частота та додатки" : "Frequency & add-ons"}</h3>
                  <div className="space-y-3 mb-6">
                    {[{ id: "weekly", ukL: "Щотижня 🌿", enL: "Every week 🌿", ukN: "Максимально свіже", enN: "Freshest possible" }, { id: "biweekly", ukL: "Через тиждень", enL: "Every two weeks", ukN: "Більший кошик рідше", enN: "Larger box less often" }].map(opt => (
                      <button key={opt.id} onClick={() => setSub(d => ({ ...d, freq: opt.id }))}
                        className={`w-full flex items-center gap-3 p-4 rounded-2xl border-2 transition-all ${sub.freq === opt.id ? "border-green-500 bg-green-50" : "border-stone-200 bg-white dark:bg-neutral-800 hover:border-green-300"}`}>
                        <div className={`w-5 h-5 rounded-full border-2 shrink-0 ${sub.freq === opt.id ? "border-green-500 bg-green-500" : "border-stone-300"}`} />
                        <div>
                          <p className="font-bold text-stone-900 text-[14px]">{isUk ? opt.ukL : opt.enL}</p>
                          <p className="text-[12px] text-stone-400">{isUk ? opt.ukN : opt.enN}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                  <p className="text-[12px] font-bold text-stone-500 uppercase tracking-wide mb-3">{isUk ? "Додати до кошика:" : "Add to box:"}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {(isUk ? ["+ Яйця (10 шт)", "+ Мікрозелень", "+ Сезонні фрукти", "+ Свіжа зелень"] : ["+ Eggs (10 pcs)", "+ Microgreens", "+ Seasonal fruits", "+ Fresh herbs"]).map(e => (
                      <button key={e} onClick={() => setSub(d => ({ ...d, extras: d.extras.includes(e) ? d.extras.filter(x => x !== e) : [...d.extras, e] }))}
                        className={`py-2.5 px-3 rounded-xl border text-[13px] font-medium transition-all ${sub.extras.includes(e) ? "border-orange-400 bg-orange-50 text-orange-700" : "border-stone-200 bg-white text-stone-600 hover:border-stone-300"}`}>
                        {e}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {subStep === 3 && (
                <div>
                  <h3 className="font-black text-green-900 text-[20px] mb-5">{isUk ? "Контактні дані" : "Contact details"}</h3>
                  <div className="space-y-3 mb-5">
                    <input type="text" value={sub.name} onChange={e => setSub(d => ({ ...d, name: e.target.value }))}
                      placeholder={isUk ? "Ваше ім'я" : "Your name"}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-green-400" />
                    <input type="email" value={sub.email} onChange={e => setSub(d => ({ ...d, email: e.target.value }))}
                      placeholder="Email"
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-green-400" />
                    <input type="text" value={sub.address} onChange={e => setSub(d => ({ ...d, address: e.target.value }))}
                      placeholder={isUk ? "Адреса доставки (вул., буд., кв.)" : "Delivery address (str., bld., apt.)"}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-green-400" />
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-[12px] text-green-700">
                    <p className="font-semibold mb-0.5">{isUk ? "Ваше замовлення:" : "Your order:"}</p>
                    <p>Кошик {sub.size || "—"} · {sub.freq === "weekly" ? (isUk ? "Щотижня" : "Weekly") : sub.freq === "biweekly" ? (isUk ? "Через тиждень" : "Bi-weekly") : "—"}{sub.extras.length > 0 ? ` · ${sub.extras.join(", ")}` : ""}</p>
                  </div>
                </div>
              )}

              <div className="flex gap-3 mt-6">
                {subStep > 1 && (
                  <button onClick={() => setSubStep(s => s - 1)}
                    className="px-5 py-3 rounded-2xl border border-stone-200 text-stone-600 text-[13px] font-semibold hover:bg-stone-50 transition-colors">
                    ← {isUk ? "Назад" : "Back"}
                  </button>
                )}
                <button onClick={() => { if (subStep < 3) setSubStep(s => s + 1); else setSubDone(true); }}
                  className="flex-1 py-3 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-black text-[14px] transition-colors">
                  {subStep < 3 ? (isUk ? "Далі →" : "Next →") : (isUk ? "Оформити підписку" : "Confirm subscription")}
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── RECIPES ── */}
      <section id="recipes" className="bg-orange-50 border-y border-orange-100 py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <p className="text-orange-500 text-[11px] font-bold uppercase tracking-widest mb-3">{isUk ? "Що приготувати" : "What to cook"}</p>
          <h2 className="text-[34px] font-black text-green-950 mb-2">{isUk ? "Рецепти цього тижня" : "This week's recipes"}</h2>
          <p className="text-stone-500 mb-10">{isUk ? "Підібрані спеціально під вміст вашого кошика" : "Matched specifically to your box contents"}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {RECIPES.map((r, i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl transition-all group cursor-pointer">
                <div className={`h-32 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform ${i % 2 === 0 ? "bg-linear-to-br from-green-50 to-emerald-100" : "bg-linear-to-br from-orange-50 to-amber-100"}`}>
                  {r.emoji}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${r.difficulty === "easy" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                      {r.difficulty === "easy" ? (isUk ? "Легко" : "Easy") : (isUk ? "Середньо" : "Medium")}
                    </span>
                    <span className="text-[11px] text-stone-400">⏱ {isUk ? r.ukTime : r.enTime}</span>
                  </div>
                  <h3 className="font-bold text-stone-900 text-[14px] leading-snug mb-3">{isUk ? r.ukTitle : r.enTitle}</h3>
                  <p className="text-stone-500 text-[12px] leading-relaxed mb-3">{isUk ? r.ukDesc : r.enDesc}</p>
                  <div className="flex flex-wrap gap-1">
                    {(isUk ? r.ukTags : r.enTags).map(t => (
                      <span key={t} className="text-[10px] bg-green-50 text-green-700 px-2 py-0.5 rounded-full">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEASONAL CALENDAR ── */}
      <section id="calendar" className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
        <p className="text-green-600 text-[11px] font-bold uppercase tracking-widest mb-3">{isUk ? "Протягом року" : "Throughout the year"}</p>
        <h2 className="text-[34px] font-black text-green-950 mb-2">{isUk ? "Сезонний календар" : "Seasonal Calendar"}</h2>
        <p className="text-stone-500 mb-10">{isUk ? "Що і коли потрапляє у ваш кошик" : "What goes into your box and when"}</p>

        <div className="overflow-x-auto">
          <div className="min-w-170">
            <div className="grid gap-1.5 mb-3" style={{ gridTemplateColumns: "110px repeat(12, 1fr)" }}>
              <div />
              {months.map((m, i) => (
                <div key={m} className={`text-center text-[11px] font-semibold py-2 rounded-lg ${i === 2 ? "bg-orange-500 text-white" : "text-stone-500 bg-stone-100"}`}>{m}</div>
              ))}
            </div>
            <div className="space-y-2">
              {SEASONS_CHART.map(s => (
                <div key={s.ukN} className="grid gap-1.5 items-center" style={{ gridTemplateColumns: "110px repeat(12, 1fr)" }}>
                  <span className="text-stone-600 text-[12px] font-medium">{isUk ? s.ukN : s.enN}</span>
                  {Array.from({ length: 12 }, (_, i) => (
                    <div key={i} className={`h-7 rounded-md ${s.months.includes(i) ? `${s.color} opacity-90` : "bg-stone-100"} ${i === 2 && s.months.includes(i) ? "ring-2 ring-orange-400" : ""}`} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className="text-[11px] text-stone-400 mt-4">
          <span className="inline-block w-3 h-3 rounded bg-orange-400 mr-1 align-middle" />
          {isUk ? "Березень (поточний місяць) підсвічено" : "March (current month) highlighted"}
        </p>
      </section>

      {/* ── ABOUT FARM ── */}
      <section id="farm" className="bg-green-950 py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-green-400 text-[11px] font-bold uppercase tracking-widest mb-3">{isUk ? "Наша ферма" : "Our farm"}</p>
              <h2 className="text-[34px] font-bold text-white mb-5 leading-tight">{isUk ? "Чому ми обрали модель CSA" : "Why we chose the CSA model"}</h2>
              <p className="text-green-200/80 leading-relaxed mb-6">
                {isUk
                  ? "CSA (Community Supported Agriculture) — це коли ви підтримуєте ферму наперед, а ми вирощуємо для вас конкретно. Немає оптових посередників, немає залишків, немає хімії для «товарного вигляду»."
                  : "CSA (Community Supported Agriculture) means you support the farm in advance, and we grow specifically for you. No wholesale middlemen, no surplus, no chemicals for 'marketable appearance'."}
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { n: "6 га", l: isUk ? "органічних теплиць" : "organic greenhouses" },
                  { n: "28 км", l: isUk ? "від Київа" : "from Kyiv" },
                  { n: "7 людей", l: isUk ? "команда ферми" : "farm team" },
                  { n: "UA-BIO", l: isUk ? "органічний сертифікат" : "organic certificate" },
                ].map(s => (
                  <div key={s.l} className="bg-green-900/60 rounded-2xl px-4 py-3">
                    <p className="font-black text-[22px] text-orange-300">{s.n}</p>
                    <p className="text-[11px] text-green-400 mt-0.5">{s.l}</p>
                  </div>
                ))}
              </div>
              <div className="bg-green-900/50 rounded-2xl px-5 py-4">
                <p className="text-[12px] text-green-300 font-mono">📍 49.8789° N, 30.5275° E</p>
                <p className="text-green-400 text-[12px] mt-1">{isUk ? "Фастівський р-н, Київська обл." : "Fastiv district, Kyiv region"}</p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { textUk: "Вже 2 роки отримуємо кошик щотижня. Якість завжди різна — залежно від сезону, але завжди смачно. Особливо люблю сюрпризи тижня!", textEn: "We've been getting the weekly box for 2 years. Quality always varies by season, but always delicious. Love the weekly surprises!", nameUk: "Олена, 2 дорослих + дитина", nameEn: "Olena, 2 adults + child", stars: 5 },
                { textUk: "Нарешті знайшла постачальника органічної зелені для нашого кейтерингу. Ціна чесна, якість висока, документи є.", textEn: "Finally found an organic greens supplier for our catering. Fair price, high quality, all documents available.", nameUk: "Надія, кейтеринг-компанія", nameEn: "Nadia, catering company", stars: 5 },
              ].map((r, i) => (
                <div key={i} className="bg-green-900/50 border border-green-800 rounded-2xl p-5">
                  <div className="flex gap-0.5 mb-3">{[...Array(r.stars)].map((_, j) => <span key={j} className="text-orange-400 text-sm">★</span>)}</div>
                  <p className="text-green-200/80 text-[13px] leading-relaxed mb-3 italic">"{isUk ? r.textUk : r.textEn}"</p>
                  <p className="text-green-400 text-[12px] font-semibold">{isUk ? r.nameUk : r.nameEn}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-20 bg-stone-50">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <p className="text-green-600 text-[11px] font-bold uppercase tracking-widest mb-3 text-center">{isUk ? "Відповіді на питання" : "Common questions"}</p>
          <h2 className="text-[34px] font-bold text-stone-900 mb-10 text-center">{isUk ? "FAQ" : "FAQ"}</h2>
          <div className="space-y-3">
            {FAQ_DATA.map((item, i) => (
              <div key={i} className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-stone-50 transition-colors">
                  <span className="font-semibold text-stone-900 text-[15px] leading-snug">{isUk ? item.qUk : item.qEn}</span>
                  <span className={`text-[20px] shrink-0 transition-transform duration-200 ${faqOpen === i ? "rotate-45" : ""} text-green-600`}>+</span>
                </button>
                {faqOpen === i && (
                  <div className="px-6 pb-5 border-t border-stone-100">
                    <p className="text-stone-600 text-[14px] leading-relaxed pt-4">{isUk ? item.aUk : item.aEn}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <p className="text-stone-500 text-[14px] mb-4">{isUk ? "Ще є запитання?" : "Still have questions?"}</p>
            <a href="#subscribe" className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold text-[14px] rounded-2xl transition-colors">
              ✉️ {isUk ? "Написати нам" : "Contact us"}
            </a>
          </div>
        </div>
      </section>

      {/* ── ACCOUNT MODAL ── */}
      {showAccount && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowAccount(false)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center justify-between px-7 py-5 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-green-500 to-orange-400 flex items-center justify-center text-white font-black text-[15px]">О</div>
                <div>
                  <p className="font-bold text-stone-900 text-[15px]">{isUk ? "Олена Коваленко" : "Olena Kovalenko"}</p>
                  <p className="text-[12px] text-stone-400">olena@gmail.com</p>
                </div>
              </div>
              <button onClick={() => setShowAccount(false)} className="text-stone-400 hover:text-stone-700 text-[22px] font-light">×</button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-stone-100 px-7">
              {([
                { key: "sub", ukL: "Моя підписка", enL: "My subscription" },
                { key: "history", ukL: "Кошики", enL: "Box history" },
                { key: "address", ukL: "Адреса", enL: "Address" },
              ] as const).map(t => (
                <button key={t.key} onClick={() => setAccountTab(t.key)}
                  className={`px-4 py-3.5 text-[13px] font-semibold border-b-2 transition-colors -mb-px ${accountTab === t.key ? "border-green-600 text-green-700" : "border-transparent text-stone-400 hover:text-stone-600"}`}>
                  {isUk ? t.ukL : t.enL}
                </button>
              ))}
            </div>

            <div className="px-7 py-6">
              {/* Tab: Subscription */}
              {accountTab === "sub" && (
                <div className="space-y-5">
                  <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-2xl">
                    <span className="w-3 h-3 rounded-full bg-green-500 shrink-0 animate-pulse" />
                    <div>
                      <p className="font-semibold text-green-900 text-[14px]">{isUk ? "Підписка активна" : "Subscription active"}</p>
                      <p className="text-[12px] text-green-600">{isUk ? "Наступна доставка: вівторок, 1 квітня" : "Next delivery: Tuesday, April 1"}</p>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {[
                      { lUk: "Розмір кошика", lEn: "Box size", v: "M (4–5 осіб)" },
                      { lUk: "Частота", lEn: "Frequency", v: isUk ? "Щотижня" : "Weekly" },
                      { lUk: "День доставки", lEn: "Delivery day", v: isUk ? "Вівторок" : "Tuesday" },
                    ].map(d => (
                      <div key={d.lUk} className="bg-stone-50 rounded-2xl p-4">
                        <p className="text-[11px] text-stone-400 uppercase tracking-wide mb-1 font-semibold">{isUk ? d.lUk : d.lEn}</p>
                        <p className="font-bold text-stone-900 text-[15px]">{d.v}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-stone-900 text-[14px]">{isUk ? "Кошик тижня (1–7 квіт)" : "This week's box (Apr 1–7)"}</p>
                      <p className="text-[12px] text-stone-500 mt-0.5">{isUk ? "Морква, броколі, шпинат, томати, огірки, зелень..." : "Carrot, broccoli, spinach, tomatoes, cucumbers, herbs..."}</p>
                    </div>
                    <span className="text-[11px] font-bold bg-orange-500 text-white px-3 py-1 rounded-full shrink-0 ml-3">{isUk ? "560 ₴" : "560 ₴"}</span>
                  </div>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <button className="px-5 py-2.5 border border-stone-200 hover:border-stone-400 text-stone-600 text-[13px] font-medium rounded-xl transition-colors">
                      ⏸ {isUk ? "Пауза на 2 тижні" : "Pause 2 weeks"}
                    </button>
                    <button className="px-5 py-2.5 border border-stone-200 hover:border-stone-400 text-stone-600 text-[13px] font-medium rounded-xl transition-colors">
                      ✏️ {isUk ? "Змінити розмір" : "Change size"}
                    </button>
                    <button className="px-5 py-2.5 border border-red-200 hover:border-red-400 text-red-500 text-[13px] font-medium rounded-xl transition-colors">
                      {isUk ? "Скасувати підписку" : "Cancel subscription"}
                    </button>
                  </div>
                </div>
              )}

              {/* Tab: History */}
              {accountTab === "history" && (
                <div className="space-y-3">
                  {[
                    { date: isUk ? "25 берез 2025" : "Mar 25, 2025", items: isUk ? "Морква, броколі, шпинат, томати +7" : "Carrot, broccoli, spinach, tomatoes +7", price: "560 ₴", rating: 5 },
                    { date: isUk ? "18 берез 2025" : "Mar 18, 2025", items: isUk ? "Огірки, перець, цибуля-порей, часник +6" : "Cucumbers, pepper, leek, garlic +6", price: "560 ₴", rating: 5 },
                    { date: isUk ? "11 берез 2025" : "Mar 11, 2025", items: isUk ? "Буряк, капуста, петрушка, морква +5" : "Beetroot, cabbage, parsley, carrot +5", price: "560 ₴", rating: 4 },
                    { date: isUk ? "4 берез 2025" : "Mar 4, 2025", items: isUk ? "Шпинат, броколі, часник, помідори +6" : "Spinach, broccoli, garlic, tomatoes +6", price: "560 ₴", rating: 5 },
                  ].map((box, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 border border-stone-100 rounded-2xl hover:bg-stone-50 transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-xl shrink-0">🧺</div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-stone-900 text-[13px]">{box.date}</p>
                        <p className="text-[12px] text-stone-400 truncate">{box.items}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-bold text-stone-900 text-[13px]">{box.price}</p>
                        <div className="flex gap-0.5 justify-end mt-0.5">{[...Array(box.rating)].map((_, j) => <span key={j} className="text-orange-400 text-[10px]">★</span>)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab: Address */}
              {accountTab === "address" && (
                <div className="space-y-4">
                  <div className="p-5 border-2 border-green-400 bg-green-50 rounded-2xl">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-stone-900 text-[14px]">🏠 {isUk ? "Основна адреса" : "Primary address"}</p>
                      <span className="text-[11px] font-bold bg-green-600 text-white px-2.5 py-0.5 rounded-full">{isUk ? "Активна" : "Active"}</span>
                    </div>
                    <p className="text-stone-700 text-[13px]">{isUk ? "м. Київ, вул. Велика Васильківська, 72, кв. 15" : "Kyiv, Velyka Vasylkivska St, 72, apt 15"}</p>
                    <p className="text-stone-400 text-[12px] mt-1">{isUk ? "Доставка: вівторок 14:00–18:00" : "Delivery: Tuesday 14:00–18:00"}</p>
                  </div>
                  <div className="p-5 border border-stone-200 rounded-2xl">
                    <p className="font-semibold text-stone-900 text-[14px] mb-2">🏢 {isUk ? "Робоча адреса" : "Work address"}</p>
                    <p className="text-stone-500 text-[13px]">{isUk ? "м. Київ, просп. Перемоги, 26, офіс 304" : "Kyiv, Peremohy Ave, 26, office 304"}</p>
                    <button className="mt-3 text-[12px] text-green-600 hover:text-green-800 font-semibold">{isUk ? "Зробити основною" : "Set as primary"}</button>
                  </div>
                  <button className="w-full py-3 border-2 border-dashed border-stone-200 hover:border-green-400 text-stone-400 hover:text-green-600 text-[13px] font-medium rounded-2xl transition-colors">
                    + {isUk ? "Додати адресу" : "Add address"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── FOOTER ── */}
      <footer className="bg-green-950">
        {/* Newsletter band */}
        <div className="border-b border-green-900/60">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-white font-bold text-[18px] mb-1">
                {isUk ? "📬 Анонс кошика щотижня на пошту" : "📬 Weekly box preview to your inbox"}
              </p>
              <p className="text-green-400 text-[13px]">
                {isUk ? "Що всередині + рецепти до вмісту — кожного понеділка" : "What's inside + recipes for contents — every Monday"}
              </p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <input
                type="email"
                placeholder={isUk ? "ваша@пошта.ua" : "your@email.com"}
                className="flex-1 sm:w-64 px-4 py-2.5 rounded-xl bg-green-900 border border-green-700 text-white text-[13px] placeholder-green-600 focus:outline-none focus:border-orange-400"
              />
              <button className="px-5 py-2.5 bg-orange-500 hover:bg-orange-400 text-white font-bold text-[13px] rounded-xl transition-colors shrink-0">
                {isUk ? "Підписатись" : "Subscribe"}
              </button>
            </div>
          </div>
        </div>

        {/* Main grid */}
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-green-600 flex items-center justify-center text-[20px]">🥬</div>
              <div>
                <p className="font-black text-white text-[18px] leading-none">OrganicBox</p>
                <p className="text-[10px] text-orange-400 font-bold uppercase tracking-widest mt-0.5">CSA · {isUk ? "Київ" : "Kyiv"}</p>
              </div>
            </div>
            <p className="text-green-500 text-[13px] leading-relaxed mb-5">
              {isUk
                ? "Органічна ферма CSA з 2019 року. 350+ родин-підписників. Доставка по Київу вівторок і п'ятниця. Без пестицидів, без посередників."
                : "Organic CSA farm since 2019. 350+ subscriber families. Delivery in Kyiv on Tuesday and Friday. No pesticides, no middlemen."}
            </p>
            <div className="flex flex-wrap gap-2">
              {["UA-BIO", isUk ? "350 підписників" : "350 subscribers", isUk ? "Засн. 2019" : "Est. 2019"].map(b => (
                <span key={b} className="text-[10px] font-bold bg-green-900 border border-green-800 text-green-400 px-2.5 py-1 rounded-lg">{b}</span>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-white font-semibold text-[13px] mb-4 uppercase tracking-wider">{isUk ? "Навігація" : "Navigation"}</p>
            <ul className="space-y-2.5 text-[13px]">
              {(isUk
                ? ["🧺 Кошик тижня", "📋 Оформити підписку", "🍳 Рецепти", "📅 Сезонний календар", "🌿 Наша ферма", "❓ FAQ"]
                : ["🧺 This Week's Box", "📋 Subscribe", "🍳 Recipes", "📅 Seasonal Calendar", "🌿 Our Farm", "❓ FAQ"]
              ).map(l => (
                <li key={l}><a href="#" className="text-green-500 hover:text-orange-300 transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Subscription info */}
          <div>
            <p className="text-white font-semibold text-[13px] mb-4 uppercase tracking-wider">{isUk ? "Підписка" : "Subscription"}</p>
            <ul className="space-y-2.5 text-[13px] text-green-500">
              <li className="flex justify-between">
                <span>S — {isUk ? "2–3 особи" : "2–3 people"}</span>
                <span className="text-white font-bold">380 ₴/{isUk ? "тиж" : "wk"}</span>
              </li>
              <li className="flex justify-between">
                <span>M — {isUk ? "4–5 осіб" : "4–5 people"}</span>
                <span className="text-white font-bold">560 ₴/{isUk ? "тиж" : "wk"}</span>
              </li>
              <li className="flex justify-between">
                <span>L — {isUk ? "6+ осіб" : "6+ people"}</span>
                <span className="text-white font-bold">780 ₴/{isUk ? "тиж" : "wk"}</span>
              </li>
            </ul>
            <div className="mt-5 bg-orange-500/10 border border-orange-500/30 rounded-xl px-4 py-3">
              <p className="text-orange-300 text-[12px] font-semibold">{isUk ? "🎁 Перший кошик −15%" : "🎁 First box −15%"}</p>
              <p className="text-orange-400/70 text-[11px] mt-0.5">{isUk ? "Промокод: FIRSTBOX" : "Promo code: FIRSTBOX"}</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white font-semibold text-[13px] mb-4 uppercase tracking-wider">{isUk ? "Контакти" : "Contacts"}</p>
            <ul className="space-y-3 text-[13px] text-green-500">
              <li className="flex items-start gap-2.5">
                <span className="shrink-0 mt-0.5">📍</span>
                <span>{isUk ? "Фастівський р-н, Київська обл. (ферма)" : "Fastiv district, Kyiv region (farm)"}</span>
              </li>
              <li className="flex items-center gap-2.5"><span>📞</span> <a href="tel:+380672345678" className="hover:text-white transition-colors">+38 (067) 234-56-78</a></li>
              <li className="flex items-center gap-2.5"><span>✉️</span> <a href="mailto:hello@organicbox.com.ua" className="hover:text-white transition-colors">hello@organicbox.com.ua</a></li>
              <li className="flex items-center gap-2.5"><span>🚚</span> <span className="text-orange-400 font-medium">{isUk ? "Доставка Вт та Пт по Києву" : "Delivery Tue & Fri in Kyiv"}</span></li>
            </ul>
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
            <div className="flex items-center gap-4">
              <p className="text-[12px] text-green-800">© 2025 OrganicBox. {isUk ? "Всі права захищено." : "All rights reserved."}</p>
              {/* Payment icons */}
              <div className="flex gap-1.5">
                {["💳 Visa", "💳 MC", "LiqPay"].map(p => (
                  <span key={p} className="text-[10px] font-bold bg-green-900 border border-green-800 text-green-700 px-2 py-0.5 rounded">{p}</span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-5 text-[12px] text-green-800">
              <a href="#" className="hover:text-green-600 transition-colors">{isUk ? "Умови підписки" : "Subscription terms"}</a>
              <a href="#" className="hover:text-green-600 transition-colors">{isUk ? "Конфіденційність" : "Privacy"}</a>
              <span className="text-green-900">|</span>
              <span className="text-green-900">{isUk ? "Демо — портфоліо Codeworth" : "Demo — Codeworth portfolio"}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
