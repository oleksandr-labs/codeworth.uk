"use client";

import { useState } from "react";
import { EmojiIcon } from "@/components/ui/EmojiIcon";

const MENU_ITEMS = [
  { id: 1, tab: "espresso", nameUk: "Еспресо", nameEn: "Espresso", descUk: "Класичний подвійний шот Ethiopia Yirgacheffe", descEn: "Classic double shot Ethiopia Yirgacheffe", price: 65, vegan: true, emoji: "☕" },
  { id: 2, tab: "espresso", nameUk: "Флет Уайт", nameEn: "Flat White", descUk: "Ристретто + мікропіна з вівсяного молока", descEn: "Ristretto + oat milk microfoam", price: 95, vegan: true, emoji: "🥛" },
  { id: 3, tab: "espresso", nameUk: "Капучино", nameEn: "Cappuccino", descUk: "Brazil Santos + парне молоко 3.2% або рослинне", descEn: "Brazil Santos + steamed 3.2% milk or plant-based", price: 85, vegan: true, emoji: "☕" },
  { id: 4, tab: "espresso", nameUk: "Авторський латте місяця", nameEn: "Monthly Signature Latte", descUk: "Кокос + лаванда + бразильський натурал", descEn: "Coconut + lavender + Brazilian natural", price: 110, vegan: true, emoji: "🌿", seasonal: true },
  { id: 5, tab: "filter", nameUk: "Pour Over (V60)", nameEn: "Pour Over (V60)", descUk: "Guatemala Huehuetenango, шоколад + карамель", descEn: "Guatemala Huehuetenango, chocolate + caramel", price: 90, vegan: true, emoji: "🫗" },
  { id: 6, tab: "filter", nameUk: "Aeropress", nameEn: "Aeropress", descUk: "Colombia El Paraíso, вишня + квіти", descEn: "Colombia El Paraíso, cherry + flowers", price: 85, vegan: true, emoji: "🔧" },
  { id: 7, tab: "filter", nameUk: "Cold Brew (24г)", nameEn: "Cold Brew (24h)", descUk: "Холодна екстракція, Ethiopia Natural", descEn: "Cold extraction, Ethiopia Natural", price: 105, vegan: true, emoji: "🧊" },
  { id: 8, tab: "tea", nameUk: "Матча Лате", nameEn: "Matcha Latte", descUk: "Ceremonial grade matcha + вівсяне молоко", descEn: "Ceremonial grade matcha + oat milk", price: 95, vegan: true, emoji: "🍵" },
  { id: 9, tab: "tea", nameUk: "Чай бездоганний чай", nameEn: "Loose Leaf Tea", descUk: "Сезонний купаж від нашого чайного сомельє", descEn: "Seasonal blend from our tea sommelier", price: 75, vegan: true, emoji: "🫖" },
  { id: 10, tab: "desserts", nameUk: "Авторський чізкейк", nameEn: "Signature Cheesecake", descUk: "Лимон + лаванда, без борошна", descEn: "Lemon + lavender, flourless", price: 120, vegan: false, emoji: "🍮" },
  { id: 11, tab: "desserts", nameUk: "Корж з карамеллю", nameEn: "Caramel Cookie", descUk: "Домашня випічка, щодня свіжа", descEn: "Homemade, fresh daily", price: 55, vegan: true, emoji: "🍪" },
];

const ORIGINS = [
  { id: "ethiopia", flag: "🇪🇹", nameUk: "Ефіопія", nameEn: "Ethiopia", regionUk: "Єргачеф, Сідама", regionEn: "Yirgacheffe, Sidama", sortUk: "Heirloom Arabica", sortEn: "Heirloom Arabica", notesUk: "Чорниця, жасмин, цитрус", notesEn: "Blueberry, jasmine, citrus", storyUk: "Ми відвідуємо ферму двічі на рік. Кавоварки тут — члени родини, що вирощує каву 5 поколінь.", storyEn: "We visit the farm twice a year. The growers here are a family cultivating coffee for 5 generations." },
  { id: "colombia", flag: "🇨🇴", nameUk: "Колумбія", nameEn: "Colombia", regionUk: "Уїла, Наріньо", regionEn: "Huila, Nariño", sortUk: "Caturra, Castillo", sortEn: "Caturra, Castillo", notesUk: "Вишня, червона слива, квіти", notesEn: "Cherry, red plum, floral", storyUk: "Наш колумбійський партнер Дієго Хімінес вирощує каву на висоті 1900м над рівнем моря.", storyEn: "Our Colombian partner Diego Jiménez grows coffee at 1,900m above sea level." },
  { id: "brazil", flag: "🇧🇷", nameUk: "Бразилія", nameEn: "Brazil", regionUk: "Серрадо Мінейро", regionEn: "Cerrado Mineiro", sortUk: "Yellow Bourbon", sortEn: "Yellow Bourbon", notesUk: "Шоколад, горіх, карамель", notesEn: "Chocolate, nuts, caramel", storyUk: "Класичний бразильський натурал — основа наших еспресо-бленд. Солодкий, збалансований.", storyEn: "Classic Brazilian natural — the backbone of our espresso blends. Sweet and balanced." },
  { id: "guatemala", flag: "🇬🇹", nameUk: "Гватемала", nameEn: "Guatemala", regionUk: "Уеуетенанго", regionEn: "Huehuetenango", sortUk: "Bourbon, Catuai", sortEn: "Bourbon, Catuai", notesUk: "Коричневий цукор, яблуко, чорний чай", notesEn: "Brown sugar, apple, black tea", storyUk: "Вулканічний ґрунт Уеуетенанго дає каві неповторну мінеральну нотку.", storyEn: "The volcanic soil of Huehuetenango gives the coffee a unique mineral note." },
];

const BREW_METHODS = {
  aeropress: {
    nameUk: "AeroPress", nameEn: "AeroPress",
    coffeeUk: "15г", coffeeEn: "15g",
    waterUk: "200мл 85°C", waterEn: "200ml 85°C",
    timeUk: "1:30 хв", timeEn: "1:30 min",
    grindUk: "Середній", grindEn: "Medium",
    stepsUk: ["Нагрій AeroPress окропом.", "Всип 15г меленої кави.", "Додай 200мл води 85°C.", "Перемішай 10 секунд.", "Натискай поршень 30 секунд.", "Розбав водою за смаком."],
    stepsEn: ["Rinse AeroPress with hot water.", "Add 15g of ground coffee.", "Pour 200ml water at 85°C.", "Stir for 10 seconds.", "Press plunger for 30 seconds.", "Dilute with water to taste."],
    emoji: "🔧"
  },
  v60: {
    nameUk: "Pour Over V60", nameEn: "Pour Over V60",
    coffeeUk: "18г", coffeeEn: "18g",
    waterUk: "300мл 93°C", waterEn: "300ml 93°C",
    timeUk: "3:00 хв", timeEn: "3:00 min",
    grindUk: "Середньо-великий", grindEn: "Medium-coarse",
    stepsUk: ["Змочи фільтр гарячою водою.", "Всип 18г кави.", "Попереднє зволоження 30г, чекай 30 сек.", "Рівномірно вливай воду по спіралі.", "Час заварювання — 3 хвилини.", "Насолоджуйся!"],
    stepsEn: ["Rinse paper filter with hot water.", "Add 18g of ground coffee.", "Bloom with 30g water, wait 30 sec.", "Pour water in a spiral motion.", "Total brew time — 3 minutes.", "Enjoy!"],
    emoji: "🫗"
  },
  frenchpress: {
    nameUk: "French Press", nameEn: "French Press",
    coffeeUk: "30г", coffeeEn: "30g",
    waterUk: "500мл 95°C", waterEn: "500ml 95°C",
    timeUk: "4:00 хв", timeEn: "4:00 min",
    grindUk: "Крупний", grindEn: "Coarse",
    stepsUk: ["Нагрій французький прес.", "Всип 30г крупного помолу.", "Залий 500мл води 95°C.", "Перемішай один раз.", "Закрий кришкою, чекай 4 хв.", "Повільно натисни поршень — пий!"],
    stepsEn: ["Preheat the French press.", "Add 30g coarsely ground coffee.", "Pour 500ml water at 95°C.", "Stir once.", "Cover, steep 4 minutes.", "Press slowly — drink!"],
    emoji: "🫙"
  },
  chemex: {
    nameUk: "Chemex", nameEn: "Chemex",
    coffeeUk: "42г", coffeeEn: "42g",
    waterUk: "700мл 94°C", waterEn: "700ml 94°C",
    timeUk: "4:30 хв", timeEn: "4:30 min",
    grindUk: "Середньо-великий", grindEn: "Medium-coarse",
    stepsUk: ["Встанови та змочи фільтр.", "Всип 42г кави.", "Попереднє зволоження 80г, 45 сек.", "Лий воду трьома порціями.", "Повний час заварювання — 4:30.", "Результат: чистий, прозорий смак."],
    stepsEn: ["Place and rinse Chemex filter.", "Add 42g of ground coffee.", "Bloom with 80g water, 45 sec.", "Pour in three additions.", "Total brew time — 4:30.", "Result: clean, transparent flavor."],
    emoji: "⚗️"
  }
};

const BEANS = [
  { id: 1, nameUk: "Ethiopia Yirgacheffe Natural", nameEn: "Ethiopia Yirgacheffe Natural", originId: "ethiopia", flag: "🇪🇹", roastUk: "Світле", roastEn: "Light", notesUk: "Чорниця, жасмин, цитрус", notesEn: "Blueberry, jasmine, citrus", price250: 290, price500: 540, price1000: 980, emoji: "🫐" },
  { id: 2, nameUk: "Colombia El Paraíso Washed", nameEn: "Colombia El Paraíso Washed", originId: "colombia", flag: "🇨🇴", roastUk: "Світло-середнє", roastEn: "Light-medium", notesUk: "Вишня, квіти, рожевий перець", notesEn: "Cherry, floral, pink pepper", price250: 320, price500: 600, price1000: 1100, emoji: "🍒" },
  { id: 3, nameUk: "Brazil Santos Natural", nameEn: "Brazil Santos Natural", originId: "brazil", flag: "🇧🇷", roastUk: "Середнє", roastEn: "Medium", notesUk: "Горіх, шоколад, карамель", notesEn: "Nuts, chocolate, caramel", price250: 240, price500: 450, price1000: 820, emoji: "🍫" },
  { id: 4, nameUk: "Guatemala Huehuetenango", nameEn: "Guatemala Huehuetenango", originId: "guatemala", flag: "🇬🇹", roastUk: "Середнє", roastEn: "Medium", notesUk: "Коричневий цукор, яблуко, чай", notesEn: "Brown sugar, apple, tea", price250: 270, price500: 510, price1000: 920, emoji: "🍎" },
];

type MenuTab = "espresso" | "filter" | "tea" | "desserts";
type BrewMethod = "aeropress" | "v60" | "frenchpress" | "chemex";
type ShopTab = "beans" | "equipment" | "subscription";
type Grind = "whole" | "ground";
type SubSize = "250" | "500" | "1000";

export function BrewCoDemo({ lang }: { lang: string }) {
  const uk = lang === "uk";

  const [menuTab, setMenuTab] = useState<MenuTab>("espresso");
  const [originActive, setOriginActive] = useState<string | null>(null);
  const [brewMethod, setBrewMethod] = useState<BrewMethod>("aeropress");
  const [shopTab, setShopTab] = useState<ShopTab>("beans");
  const [grind, setGrind] = useState<Grind>("whole");
  const [stampCount, setStampCount] = useState(5);
  const [cartItems, setCartItems] = useState<{ id: number; qty: number }[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [subscriptionSize, setSubscriptionSize] = useState<SubSize>("250");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [originMapHovered, setOriginMapHovered] = useState<string | null>(null);

  const t = {
    nav: { menu: uk ? "Меню" : "Menu", beans: uk ? "Зерно" : "Beans", brew: uk ? "Brew Guide" : "Brew Guide", about: uk ? "Про нас" : "About" },
    findUs: uk ? "де нас знайти" : "find us",
    cart: uk ? "Кошик" : "Cart",
    heroOpen: uk ? "☕ Відчини: Пн–Нд 8:00–22:00" : "☕ Open: Mon–Sun 8:00–22:00",
    heroTitle: uk ? "Кава, що змушує відчути різницю" : "Coffee that makes you feel the difference",
    heroSub: uk ? "Specialty-зерно від перевірених фермерів. Свіже обсмажування. Бариста, що знає своє діло." : "Specialty beans from trusted farmers. Fresh roasting. Baristas who know their craft.",
    heroCtaMenu: uk ? "Переглянути меню" : "View menu",
    heroCtaFind: uk ? "Де нас знайти" : "Find us",
    heroStrip: uk ? "Specialty coffee · Свіже обсмажування · Origin traceable · SCA certified" : "Specialty coffee · Fresh roasting · Origin traceable · SCA certified",
    menuTitle: uk ? "Меню" : "Menu",
    tabs: {
      espresso: uk ? "Еспресо" : "Espresso",
      filter: uk ? "Фільтр" : "Filter",
      tea: uk ? "Чай" : "Tea",
      desserts: uk ? "Десерти" : "Desserts",
    },
    vegan: uk ? "Веган" : "Vegan",
    seasonal: uk ? "Сезонне" : "Seasonal",
    originTitle: uk ? "Ми знаємо звідки наша кава" : "We know where our coffee comes from",
    originSub: uk ? "Натисни на країну, щоб дізнатись більше" : "Click a country to learn more",
    region: uk ? "Регіон" : "Region",
    variety: uk ? "Сорт" : "Variety",
    notes: uk ? "Смакові ноти" : "Tasting notes",
    story: uk ? "Наша історія" : "Our story",
    brewTitle: uk ? "Завари вдома як бариста" : "Brew at home like a barista",
    brewSub: uk ? "Покрокові рецепти для чотирьох методів заварювання" : "Step-by-step recipes for four brewing methods",
    coffee: uk ? "Кава" : "Coffee",
    water: uk ? "Вода" : "Water",
    time: uk ? "Час" : "Time",
    grindLabel: uk ? "Помел" : "Grind",
    steps: uk ? "Кроки" : "Steps",
    shopTitle: uk ? "Купити зерно" : "Buy Beans",
    shopSub: uk ? "Свіже обсмажування щотижня. Доставка по всій Україні." : "Fresh roasting weekly. Delivery across Ukraine.",
    wholeBean: uk ? "Цілозернове" : "Whole bean",
    ground: uk ? "Мелене" : "Ground",
    roast: uk ? "Обсмаження" : "Roast",
    addToCart: uk ? "Додати" : "Add",
    subscriptionCta: uk ? "☕ Підписка на зерно від 890₴/міс" : "☕ Bean subscription from 890₴/mo",
    subscriptionSub: uk ? "Обирай зерно, частоту та помел. Ми привеземо до дверей." : "Choose beans, frequency and grind. We deliver to your door.",
    subscribe: uk ? "Підписатися" : "Subscribe",
    loyaltyTitle: uk ? "Картка лояльності" : "Loyalty Card",
    loyaltySub: uk ? "1 покупка = 1 штамп · 8 штампів = будь-який напій безкоштовно" : "1 purchase = 1 stamp · 8 stamps = any drink free",
    stampsLeft: (n: number) => uk ? `До безкоштовної кави: ${n} штамп${n === 1 ? "" : "ів"}` : `To free coffee: ${n} stamp${n === 1 ? "" : "s"}`,
    registerCard: uk ? "Зареєструвати картку" : "Register card",
    addStamp: uk ? "+ Штамп" : "+ Stamp",
    reset: uk ? "Скинути" : "Reset",
    aboutTitle: uk ? "Про нас" : "About us",
    aboutSub: uk ? "Ми — команда ентузіастів спешіалті-кави у центрі міста." : "We are a team of specialty coffee enthusiasts in the city center.",
    aboutBody: uk
      ? "Brew & Co засновано у 2019 році. Ми відвідуємо ферми особисто, контролюємо обсмажування та навчаємо бариста за стандартами SCA. Наша мета — щоб кожна чашка була маленькою пригодою."
      : "Brew & Co was founded in 2019. We visit farms personally, control roasting, and train baristas to SCA standards. Our goal is for every cup to be a small adventure.",
    cuppings: uk ? "Записатися на каппінг" : "Join a cupping",
    values: uk
      ? ["Specialty only", "Свіже обсмажування", "Прозорі origins"]
      : ["Specialty only", "Fresh roasting", "Transparent origins"],
    footerLinks: uk ? ["Меню", "Зерно", "Brew Guide", "Про нас", "Контакти"] : ["Menu", "Beans", "Brew Guide", "About", "Contacts"],
    address: uk ? "вул. Кавова 7, Київ" : "7 Coffee St, Kyiv",
    hours: uk ? "Пн–Нд: 8:00–22:00" : "Mon–Sun: 8:00–22:00",
    copyright: uk ? "© 2024 Brew & Co. Усі права захищено." : "© 2024 Brew & Co. All rights reserved.",
    cartTitle: uk ? "Кошик" : "Cart",
    cartEmpty: uk ? "Кошик порожній" : "Cart is empty",
    checkout: uk ? "Оформити замовлення" : "Checkout",
    close: uk ? "Закрити" : "Close",
    total: uk ? "Разом" : "Total",
    remove: uk ? "Видалити" : "Remove",
  };

  const filteredMenu = MENU_ITEMS.filter((item) => item.tab === menuTab);
  const activeOrigin = ORIGINS.find((o) => o.id === originActive) ?? null;
  const activeMethod = BREW_METHODS[brewMethod];

  function getBeanPrice(bean: typeof BEANS[0]) {
    if (subscriptionSize === "250") return bean.price250;
    if (subscriptionSize === "500") return bean.price500;
    return bean.price1000;
  }

  function addBeanToCart(beanId: number) {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === beanId);
      if (existing) return prev.map((i) => i.id === beanId ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { id: beanId, qty: 1 }];
    });
  }

  function removeFromCart(beanId: number) {
    setCartItems((prev) => prev.filter((i) => i.id !== beanId));
  }

  const cartTotal = cartItems.reduce((sum, ci) => {
    const bean = BEANS.find((b) => b.id === ci.id);
    return sum + (bean ? getBeanPrice(bean) * ci.qty : 0);
  }, 0);

  const cartCount = cartItems.reduce((sum, ci) => sum + ci.qty, 0);

  const menuTabOrder: MenuTab[] = ["espresso", "filter", "tea", "desserts"];
  const brewMethodOrder: BrewMethod[] = ["aeropress", "v60", "frenchpress", "chemex"];

  return (
    <div className="font-sans text-amber-950 bg-[#FEF9F0] min-h-screen">

      {/* ── STICKY NAV ── */}
      <nav className="sticky top-0 z-40 bg-[#FEF9F0] border-b border-amber-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <div>
              <div className="font-serif text-2xl font-bold leading-none">
                Brew <span className="text-amber-700">&</span> Co
              </div>
              <div className="text-[9px] tracking-widest uppercase text-amber-600 font-medium">☕ Specialty Coffee</div>
            </div>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-amber-800">
            <a href="#menu" className="hover:text-amber-600 transition-colors">{t.nav.menu}</a>
            <a href="#shop" className="hover:text-amber-600 transition-colors">{t.nav.beans}</a>
            <a href="#brew" className="hover:text-amber-600 transition-colors">{t.nav.brew}</a>
            <a href="#about" className="hover:text-amber-600 transition-colors">{t.nav.about}</a>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3 shrink-0">
            <a href="#about" className="hidden sm:block text-xs text-amber-700 underline underline-offset-2 hover:text-amber-900">
              {t.findUs}
            </a>
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-1.5 bg-amber-800 hover:bg-amber-700 text-amber-50 text-sm font-medium px-3 py-1.5 rounded-full transition-colors"
            >
              🛒 {t.cart}
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-orange-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              className="md:hidden p-2 text-amber-800"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FEF9F0] border-t border-amber-100 px-4 py-3 flex flex-col gap-3 text-sm font-medium text-amber-800">
            {([["#menu", t.nav.menu], ["#shop", t.nav.beans], ["#brew", t.nav.brew], ["#about", t.nav.about]] as [string, string][]).map(([href, label]) => (
              <a key={href} href={href} onClick={() => setMobileMenuOpen(false)} className="hover:text-amber-600">{label}</a>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="bg-linear-to-br from-amber-50 via-orange-50 to-yellow-50 py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <span className="inline-block bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
              {t.heroOpen}
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-amber-900 leading-tight mb-4">
              {t.heroTitle}
            </h1>
            <p className="text-amber-700 text-lg leading-relaxed mb-8 max-w-md">
              {t.heroSub}
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#menu" className="bg-amber-800 hover:bg-amber-700 text-amber-50 font-semibold px-6 py-3 rounded-full transition-colors">
                {t.heroCtaMenu}
              </a>
              <a href="#about" className="border border-amber-400 text-amber-800 hover:bg-amber-100 font-semibold px-6 py-3 rounded-full transition-colors">
                {t.heroCtaFind}
              </a>
            </div>
          </div>

          {/* Right — 2×2 bean cards */}
          <div className="grid grid-cols-2 gap-3">
            {ORIGINS.map((origin) => (
              <div key={origin.id} className="bg-white border border-amber-200 rounded-2xl p-4 shadow-sm">
                <EmojiIcon emoji={origin.flag} className="w-8 h-8 mb-2" />
                <div className="font-serif font-semibold text-amber-900 text-sm mb-1">
                  {uk ? origin.nameUk : origin.nameEn}
                </div>
                <div className="text-xs text-amber-600">{uk ? origin.notesUk : origin.notesEn}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Strip */}
        <div className="max-w-6xl mx-auto mt-12 border-t border-amber-200 pt-6 text-center text-sm text-amber-600 tracking-wide">
          {t.heroStrip}
        </div>
      </section>

      {/* ── MENU ── */}
      <section id="menu" className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-amber-900 mb-2">{t.menuTitle}</h2>
          <p className="text-amber-600 mb-8 text-sm">{t.heroSub}</p>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {menuTabOrder.map((tab) => (
              <button
                key={tab}
                onClick={() => setMenuTab(tab)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  menuTab === tab
                    ? "bg-amber-800 text-amber-50"
                    : "bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200"
                }`}
              >
                {t.tabs[tab]}
              </button>
            ))}
          </div>

          {/* Items grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMenu.map((item) => (
              <div key={item.id} className="border border-amber-200 rounded-2xl p-5 bg-[#FEF9F0] relative">
                {(item as { seasonal?: boolean }).seasonal && (
                  <span className="absolute top-3 right-3 bg-orange-100 text-orange-700 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide">
                    {t.seasonal}
                  </span>
                )}
                <EmojiIcon emoji={item.emoji} className="w-8 h-8 mb-3" />
                <div className="font-serif font-semibold text-amber-900 text-base mb-1">
                  {uk ? item.nameUk : item.nameEn}
                </div>
                <p className="text-xs text-amber-700 mb-3 leading-relaxed">
                  {uk ? item.descUk : item.descEn}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-900">{item.price}₴</span>
                  <div className="flex gap-1.5">
                    {item.vegan && (
                      <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full font-medium">🌿 {t.vegan}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ORIGIN MAP ── */}
      <section id="origin" className="bg-[#FEF9F0] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-amber-900 mb-2">{t.originTitle}</h2>
          <p className="text-amber-600 mb-8 text-sm">{t.originSub}</p>

          {/* Country grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {ORIGINS.map((origin) => {
              const isActive = originActive === origin.id;
              const isHovered = originMapHovered === origin.id;
              return (
                <button
                  key={origin.id}
                  onClick={() => setOriginActive(isActive ? null : origin.id)}
                  onMouseEnter={() => setOriginMapHovered(origin.id)}
                  onMouseLeave={() => setOriginMapHovered(null)}
                  className={`p-5 rounded-2xl border text-left transition-all ${
                    isActive
                      ? "bg-amber-800 text-amber-50 border-amber-800 shadow-lg"
                      : isHovered
                      ? "bg-amber-100 border-amber-300"
                      : "bg-white border-amber-200 hover:bg-amber-50"
                  }`}
                >
                  <EmojiIcon emoji={origin.flag} className="w-10 h-10 mb-2" />
                  <div className={`font-serif font-semibold text-base ${isActive ? "text-amber-50" : "text-amber-900"}`}>
                    {uk ? origin.nameUk : origin.nameEn}
                  </div>
                  <div className={`text-xs mt-1 ${isActive ? "text-amber-200" : "text-amber-600"}`}>
                    {uk ? origin.regionUk : origin.regionEn}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Story card */}
          {activeOrigin && (
            <div className="bg-white border border-amber-200 rounded-2xl p-6 shadow-sm">
              <div className="flex flex-wrap gap-8">
                <EmojiIcon emoji={activeOrigin.flag} className="w-14 h-14" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif text-2xl font-bold text-amber-900 mb-4">
                    {uk ? activeOrigin.nameUk : activeOrigin.nameEn}
                  </h3>
                  <div className="grid sm:grid-cols-3 gap-4 mb-5">
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-amber-500 font-semibold mb-1">{t.region}</div>
                      <div className="text-sm text-amber-900 font-medium">{uk ? activeOrigin.regionUk : activeOrigin.regionEn}</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-amber-500 font-semibold mb-1">{t.variety}</div>
                      <div className="text-sm text-amber-900 font-medium">{uk ? activeOrigin.sortUk : activeOrigin.sortEn}</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-amber-500 font-semibold mb-1">{t.notes}</div>
                      <div className="text-sm text-amber-900 font-medium">{uk ? activeOrigin.notesUk : activeOrigin.notesEn}</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-amber-500 font-semibold mb-2">{t.story}</div>
                    <p className="text-amber-800 text-sm leading-relaxed">{uk ? activeOrigin.storyUk : activeOrigin.storyEn}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── BREW GUIDE ── */}
      <section id="brew" className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-amber-900 mb-2">{t.brewTitle}</h2>
          <p className="text-amber-600 mb-8 text-sm">{t.brewSub}</p>

          {/* Method tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {brewMethodOrder.map((method) => {
              const m = BREW_METHODS[method];
              return (
                <button
                  key={method}
                  onClick={() => setBrewMethod(method)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                    brewMethod === method
                      ? "bg-amber-800 text-amber-50"
                      : "bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200"
                  }`}
                >
                  <EmojiIcon emoji={m.emoji} className="w-5 h-5 inline-block align-middle" />
                  <span>{uk ? m.nameUk : m.nameEn}</span>
                </button>
              );
            })}
          </div>

          {/* Method detail */}
          <div className="bg-[#FEF9F0] border border-amber-200 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <EmojiIcon emoji={activeMethod.emoji} className="w-10 h-10" />
              <h3 className="font-serif text-2xl font-bold text-amber-900">
                {uk ? activeMethod.nameUk : activeMethod.nameEn}
              </h3>
            </div>

            {/* Parameters table */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {[
                { label: t.coffee, value: uk ? activeMethod.coffeeUk : activeMethod.coffeeEn },
                { label: t.water, value: uk ? activeMethod.waterUk : activeMethod.waterEn },
                { label: t.time, value: uk ? activeMethod.timeUk : activeMethod.timeEn },
                { label: t.grindLabel, value: uk ? activeMethod.grindUk : activeMethod.grindEn },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white border border-amber-200 rounded-xl p-4 text-center">
                  <div className="text-[10px] uppercase tracking-widest text-amber-500 font-semibold mb-1">{label}</div>
                  <div className="font-bold text-amber-900 text-sm">{value}</div>
                </div>
              ))}
            </div>

            {/* Steps */}
            <div>
              <div className="text-xs uppercase tracking-widest text-amber-500 font-semibold mb-3">{t.steps}</div>
              <ol className="space-y-2">
                {(uk ? activeMethod.stepsUk : activeMethod.stepsEn).map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-amber-800">
                    <span className="shrink-0 w-6 h-6 bg-amber-800 text-amber-50 rounded-full flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ── BEAN SHOP ── */}
      <section id="shop" className="bg-[#FEF9F0] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-amber-900 mb-1">{t.shopTitle}</h2>
              <p className="text-amber-600 text-sm">{t.shopSub}</p>
            </div>
            {/* Grind toggle */}
            <div className="flex items-center gap-1 bg-amber-100 rounded-full p-1">
              {(["whole", "ground"] as Grind[]).map((g) => (
                <button
                  key={g}
                  onClick={() => setGrind(g)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    grind === g ? "bg-amber-800 text-amber-50" : "text-amber-700 hover:bg-amber-200"
                  }`}
                >
                  {g === "whole" ? t.wholeBean : t.ground}
                </button>
              ))}
            </div>
          </div>

          {/* Size selector */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-sm text-amber-700 font-medium mr-1">г:</span>
            {(["250", "500", "1000"] as SubSize[]).map((size) => (
              <button
                key={size}
                onClick={() => setSubscriptionSize(size)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                  subscriptionSize === size
                    ? "bg-amber-800 text-amber-50 border-amber-800"
                    : "border-amber-300 text-amber-800 hover:bg-amber-100"
                }`}
              >
                {size}г
              </button>
            ))}
          </div>

          {/* Bean cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {BEANS.map((bean) => {
              const origin = ORIGINS.find((o) => o.id === bean.originId);
              const price = getBeanPrice(bean);
              const inCart = cartItems.find((ci) => ci.id === bean.id);
              return (
                <div key={bean.id} className="bg-white border border-amber-200 rounded-2xl p-5 flex flex-col">
                  <EmojiIcon emoji={bean.emoji} className="w-10 h-10 mb-3" />
                  <div className="font-serif font-semibold text-amber-900 text-sm mb-1 leading-snug">
                    {uk ? bean.nameUk : bean.nameEn}
                  </div>
                  {origin && (
                    <div className="text-xs text-amber-600 mb-2">
                      {origin.flag} {uk ? origin.nameUk : origin.nameEn}
                    </div>
                  )}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-amber-100 text-amber-800 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                      {uk ? bean.roastUk : bean.roastEn}
                    </span>
                    {grind === "ground" && (
                      <span className="bg-orange-100 text-orange-700 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                        {t.ground}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-amber-700 mb-4 flex-1 leading-relaxed">
                    {uk ? bean.notesUk : bean.notesEn}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="font-bold text-amber-900">{price}₴</span>
                    <button
                      onClick={() => addBeanToCart(bean.id)}
                      className={`text-sm font-medium px-4 py-1.5 rounded-full transition-colors ${
                        inCart
                          ? "bg-green-100 text-green-700 border border-green-200"
                          : "bg-amber-800 hover:bg-amber-700 text-amber-50"
                      }`}
                    >
                      {inCart ? `✓ ×${inCart.qty}` : t.addToCart}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Subscription CTA */}
          <div className="bg-amber-900 text-amber-50 rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="font-serif text-xl font-bold mb-1">{t.subscriptionCta}</div>
              <p className="text-amber-300 text-sm">{t.subscriptionSub}</p>
            </div>
            <button className="bg-amber-50 text-amber-900 font-semibold px-6 py-3 rounded-full hover:bg-white transition-colors shrink-0">
              {t.subscribe}
            </button>
          </div>
        </div>
      </section>

      {/* ── LOYALTY ── */}
      <section className="bg-amber-900 text-amber-50 py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl font-bold mb-2">{t.loyaltyTitle}</h2>
          <p className="text-amber-300 text-sm mb-8">{t.loyaltySub}</p>

          {/* Stamp card */}
          <div className="bg-amber-800 rounded-2xl p-6 mb-6 inline-block w-full max-w-md">
            <div className="flex justify-center gap-3 mb-4">
              {Array.from({ length: 8 }, (_, i) => (
                <div
                  key={i}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-lg border-2 transition-all ${
                    i < stampCount
                      ? "bg-amber-50 border-amber-50 text-amber-900"
                      : "bg-transparent border-amber-600 text-amber-600"
                  }`}
                >
                  {i < stampCount ? "☕" : "○"}
                </div>
              ))}
            </div>
            <div className="text-amber-200 text-sm font-medium">
              {stampCount >= 8
                ? (uk ? "🎉 Вітаємо! Твій напій безкоштовно!" : "🎉 Congratulations! Your drink is free!")
                : t.stampsLeft(8 - stampCount)}
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <button
              onClick={() => setStampCount((s) => Math.min(8, s + 1))}
              className="bg-amber-50 text-amber-900 font-semibold px-5 py-2 rounded-full hover:bg-white transition-colors text-sm"
            >
              {t.addStamp}
            </button>
            <button
              onClick={() => setStampCount(0)}
              className="border border-amber-600 text-amber-200 font-medium px-5 py-2 rounded-full hover:bg-amber-800 transition-colors text-sm"
            >
              {t.reset}
            </button>
            <button className="bg-orange-600 hover:bg-orange-500 text-white font-semibold px-5 py-2 rounded-full transition-colors text-sm">
              {t.registerCard}
            </button>
          </div>
        </div>
      </section>

      {/* ── ABOUT / BARISTA ── */}
      <section id="about" className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Emoji photo area */}
          <div className="bg-linear-to-br from-amber-50 to-orange-50 rounded-3xl p-10 text-center border border-amber-200">
            <div className="text-7xl mb-4">👩‍🍳☕🧑‍🍳</div>
            <div className="font-serif text-xl font-bold text-amber-900 mb-2">
              {uk ? "Наша команда" : "Our Team"}
            </div>
            <div className="text-sm text-amber-600">{uk ? "5 бариста · 1 обсмажувальник · 2 засновника" : "5 baristas · 1 roaster · 2 founders"}</div>
          </div>

          {/* Text */}
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-amber-900 mb-3">{t.aboutTitle}</h2>
            <p className="text-amber-700 mb-4 leading-relaxed">{t.aboutBody}</p>

            {/* Values */}
            <div className="flex flex-wrap gap-2 mb-6">
              {t.values.map((v) => (
                <span key={v} className="bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1.5 rounded-full">
                  {v}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="bg-amber-800 hover:bg-amber-700 text-amber-50 font-semibold px-6 py-3 rounded-full transition-colors text-sm">
                {t.cuppings}
              </button>
              <a href="#origin" className="border border-amber-300 text-amber-800 hover:bg-amber-50 font-medium px-6 py-3 rounded-full transition-colors text-sm">
                {uk ? "Наші джерела" : "Our origins"}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-amber-950 text-amber-200 py-12 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 mb-10">
          {/* Logo column */}
          <div>
            <div className="font-serif text-2xl font-bold text-amber-50 mb-1">
              Brew <span className="text-amber-600">&</span> Co
            </div>
            <div className="text-[10px] tracking-widest uppercase text-amber-500 mb-4">☕ Specialty Coffee</div>
            <p className="text-sm text-amber-400 leading-relaxed">
              {uk ? "Specialty-кава у серці міста." : "Specialty coffee in the heart of the city."}
            </p>
          </div>

          {/* Links */}
          <div>
            <div className="text-xs uppercase tracking-widest text-amber-500 font-semibold mb-4">
              {uk ? "Навігація" : "Navigation"}
            </div>
            <ul className="space-y-2">
              {t.footerLinks.map((link) => (
                <li key={link}>
                  <a href="#menu" className="text-sm text-amber-300 hover:text-amber-50 transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Address */}
          <div>
            <div className="text-xs uppercase tracking-widest text-amber-500 font-semibold mb-4">
              {uk ? "Контакти" : "Contact"}
            </div>
            <div className="space-y-2 text-sm text-amber-300">
              <div>📍 {t.address}</div>
              <div>🕐 {t.hours}</div>
              <div>📞 +380 44 123 45 67</div>
              <div className="flex gap-3 pt-1">
                <span className="cursor-pointer hover:text-amber-50 transition-colors">Instagram</span>
                <span className="cursor-pointer hover:text-amber-50 transition-colors">Facebook</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto border-t border-amber-900 pt-6 text-center text-xs text-amber-600">
          {t.copyright}
        </div>
      </footer>

      {/* ── MINI CART ── */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setCartOpen(false)}
          />

          {/* Panel */}
          <div className="relative bg-white w-full sm:w-96 max-h-[90vh] flex flex-col rounded-t-2xl sm:rounded-2xl sm:mr-4 sm:mb-4 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-amber-100">
              <h3 className="font-serif text-lg font-bold text-amber-900">{t.cartTitle}</h3>
              <button
                onClick={() => setCartOpen(false)}
                className="text-amber-600 hover:text-amber-900 text-sm font-medium"
              >
                {t.close}
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {cartItems.length === 0 ? (
                <p className="text-amber-600 text-sm text-center py-8">{t.cartEmpty}</p>
              ) : (
                cartItems.map((ci) => {
                  const bean = BEANS.find((b) => b.id === ci.id);
                  if (!bean) return null;
                  const price = getBeanPrice(bean);
                  return (
                    <div key={ci.id} className="flex items-center gap-3 bg-amber-50 border border-amber-100 rounded-xl p-3">
                      <EmojiIcon emoji={bean.emoji} className="w-7 h-7 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-amber-900 truncate">
                          {uk ? bean.nameUk : bean.nameEn}
                        </div>
                        <div className="text-xs text-amber-600">{price}₴ × {ci.qty} = {price * ci.qty}₴</div>
                      </div>
                      <button
                        onClick={() => removeFromCart(ci.id)}
                        className="text-xs text-red-400 hover:text-red-600 shrink-0"
                      >
                        {t.remove}
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="px-5 py-4 border-t border-amber-100">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold text-amber-900">{t.total}</span>
                  <span className="font-bold text-amber-900 text-lg">{cartTotal}₴</span>
                </div>
                <button className="w-full bg-amber-800 hover:bg-amber-700 text-amber-50 font-semibold py-3 rounded-full transition-colors">
                  {t.checkout}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
