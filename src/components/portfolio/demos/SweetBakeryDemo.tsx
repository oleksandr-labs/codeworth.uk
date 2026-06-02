"use client";

import { useState } from "react";

/* ───────────── data ───────────── */

const PRODUCTS: Record<string, { emoji: string; nameEn: string; nameUk: string; desc: string; descUk: string; price: number }[]> = {
  bread: [
    { emoji: "🍞", nameEn: "Sourdough Loaf", nameUk: "Хліб на заквасці", desc: "48-hour fermented, crusty outside, airy inside", descUk: "48 годин ферментації, хрустка скоринка, пухкий всередині", price: 85 },
    { emoji: "🥖", nameEn: "French Baguette", nameUk: "Французький батон", desc: "Classic golden baguette, baked fresh every morning", descUk: "Класичний золотистий батон, щоранку свіжий", price: 55 },
    { emoji: "🫓", nameEn: "Ciabatta", nameUk: "Чіабата", desc: "Italian bread with olive oil and sea salt", descUk: "Італійський хліб з оливковою олією та морською сіллю", price: 65 },
    { emoji: "🌾", nameEn: "Whole Grain Rye", nameUk: "Цільнозерновий житній", desc: "Dense, hearty rye with sunflower seeds", descUk: "Густий житній хліб з насінням соняшника", price: 78 },
    { emoji: "🥯", nameEn: "Onion Bagels (3pc)", nameUk: "Бейгли з цибулею (3 шт)", desc: "Boiled and baked, topped with crispy onion", descUk: "Відварені й випечені, з хрусткою цибулею", price: 90 },
  ],
  pastries: [
    { emoji: "🥐", nameEn: "Butter Croissant", nameUk: "Масляний круасан", desc: "Flaky, golden, 72-layer lamination", descUk: "Шаруватий, золотистий, 72 шари тіста", price: 68 },
    { emoji: "🧁", nameEn: "Cinnamon Roll", nameUk: "Булочка з корицею", desc: "Soft dough, cinnamon sugar, cream cheese glaze", descUk: "М'яке тісто, цукор з корицею, глазур з крем-сиру", price: 75 },
    { emoji: "🍩", nameEn: "Filled Doughnut", nameUk: "Пончик з начинкою", desc: "Custard or jam filled, sugar dusted", descUk: "З заварним кремом або джемом, у цукровій пудрі", price: 60 },
    { emoji: "🥮", nameEn: "Danish Pastry", nameUk: "Данська випічка", desc: "Fruit-topped pastry with almond cream", descUk: "Випічка з фруктами та мигдальним кремом", price: 82 },
  ],
  cakes: [
    { emoji: "🎂", nameEn: "Honey Cake (Medovik)", nameUk: "Медовик", desc: "Classic 8-layer honey cake with sour cream", descUk: "Класичний 8-шаровий медовик зі сметаною", price: 680 },
    { emoji: "🍫", nameEn: "Chocolate Truffle Cake", nameUk: "Шоколадний трюфельний торт", desc: "Rich Belgian chocolate with ganache layers", descUk: "Бельгійський шоколад з шарами ганашу", price: 780 },
    { emoji: "🍰", nameEn: "Napoleon", nameUk: "Наполеон", desc: "Puff pastry with vanilla custard cream", descUk: "Листкове тісто з ванільним заварним кремом", price: 620 },
    { emoji: "🫐", nameEn: "Blueberry Cheesecake", nameUk: "Чорничний чізкейк", desc: "New York style with fresh blueberry compote", descUk: "Нью-Йорк стиль зі свіжим чорничним компотом", price: 720 },
    { emoji: "🥕", nameEn: "Carrot Cake", nameUk: "Морквяний торт", desc: "Spiced cake with walnuts and cream cheese frosting", descUk: "Пряний торт з горіхами та кремом з крем-сиру", price: 580 },
  ],
  cookies: [
    { emoji: "🍪", nameEn: "Oatmeal Raisin (6pc)", nameUk: "Вівсяне з родзинками (6 шт)", desc: "Chewy oats with plump raisins and brown sugar", descUk: "Вівсяне печиво з родзинками та коричневим цукром", price: 120 },
    { emoji: "🤎", nameEn: "Double Chocolate (6pc)", nameUk: "Подвійний шоколад (6 шт)", desc: "Dark cocoa dough with chocolate chips", descUk: "Темне какао-тісто з шоколадною крихтою", price: 135 },
    { emoji: "🥜", nameEn: "Peanut Butter (6pc)", nameUk: "Арахісове (6 шт)", desc: "Crunchy peanut butter with sea salt finish", descUk: "Хрустке арахісове з морською сіллю", price: 130 },
    { emoji: "🍋", nameEn: "Lemon Shortbread (8pc)", nameUk: "Лимонне пісочне (8 шт)", desc: "Buttery shortbread with lemon zest", descUk: "Масляне пісочне з лимонною цедрою", price: 110 },
  ],
  seasonal: [
    { emoji: "🎃", nameEn: "Pumpkin Spice Loaf", nameUk: "Гарбузовий хліб зі спеціями", desc: "Limited edition with cinnamon, nutmeg, clove", descUk: "Лімітований із корицею, мускатом, гвоздикою", price: 125 },
    { emoji: "🍒", nameEn: "Cherry Strudel", nameUk: "Штрудель з вишнею", desc: "Thin pastry rolled with sour cherries", descUk: "Тонке тісто з кислою вишнею", price: 145 },
    { emoji: "🌹", nameEn: "Rose Pistachio Baklava", nameUk: "Пахлава з трояндою та фісташкою", desc: "Layers of filo, pistachios, rose syrup", descUk: "Шари філо, фісташки, трояндовий сироп", price: 180 },
    { emoji: "🫛", nameEn: "Matcha Mochi Buns", nameUk: "Булочки моті з матча", desc: "Japanese-inspired chewy buns with matcha glaze", descUk: "Японські тягучі булочки з глазур'ю матча", price: 95 },
  ],
};

const PRODUCT_TABS: { key: string; en: string; uk: string }[] = [
  { key: "bread", en: "Bread", uk: "Хліб" },
  { key: "pastries", en: "Pastries", uk: "Випічка" },
  { key: "cakes", en: "Cakes", uk: "Торти" },
  { key: "cookies", en: "Cookies", uk: "Печиво" },
  { key: "seasonal", en: "Seasonal", uk: "Сезонне" },
];

const CAKE_SIZES = [
  { label: '6"', serves: "6-8", price: 600 },
  { label: '8"', serves: "10-14", price: 850 },
  { label: '10"', serves: "16-22", price: 1100 },
  { label: '12"', serves: "24-30", price: 1400 },
];

const CAKE_FLAVORS = [
  { en: "Vanilla", uk: "Ванільний", extra: 0 },
  { en: "Chocolate", uk: "Шоколадний", extra: 0 },
  { en: "Red Velvet", uk: "Червоний оксамит", extra: 80 },
  { en: "Carrot", uk: "Морквяний", extra: 60 },
  { en: "Lemon", uk: "Лимонний", extra: 40 },
];

const CAKE_FILLINGS = [
  { en: "Buttercream", uk: "Вершковий крем", extra: 0 },
  { en: "Ganache", uk: "Ганаш", extra: 100 },
  { en: "Cream Cheese", uk: "Крем-сир", extra: 60 },
  { en: "Fruit", uk: "Фруктовий", extra: 80 },
];

const CAKE_DECORATIONS = [
  { en: "Minimalist", uk: "Мінімалізм", extra: 0 },
  { en: "Floral", uk: "Квітковий", extra: 150 },
  { en: "Themed", uk: "Тематичний", extra: 200 },
  { en: "Naked", uk: "Відкритий", extra: 0 },
];

const DAILY_SPECIALS = [
  { emoji: "🥐", nameEn: "Almond Croissant", nameUk: "Мигдальний круасан", price: 85, badgeEn: "Until sold out!", badgeUk: "Поки є в наявності!" },
  { emoji: "🍞", nameEn: "Olive Rosemary Focaccia", nameUk: "Фокача з оливками та розмарином", price: 110, badgeEn: "Until sold out!", badgeUk: "Поки є в наявності!" },
  { emoji: "🧁", nameEn: "Maple Pecan Muffin", nameUk: "Мафін з кленовим сиропом та пеканом", price: 72, badgeEn: "Until sold out!", badgeUk: "Поки є в наявності!" },
];

const SOURDOUGH_STEPS = [
  { emoji: "🥣", stepEn: "Mix", stepUk: "Замішати", descEn: "Flour, water, salt and our 8-year-old sourdough starter", descUk: "Борошно, вода, сіль та наша 8-річна закваска" },
  { emoji: "⏳", stepEn: "Rise", stepUk: "Підійти", descEn: "48 hours of slow cold fermentation for deep flavor", descUk: "48 годин повільної холодної ферментації для глибокого смаку" },
  { emoji: "🤲", stepEn: "Shape", stepUk: "Сформувати", descEn: "Hand-shaped by our bakers with care and precision", descUk: "Вручну формуємо з турботою та точністю" },
  { emoji: "🔥", stepEn: "Bake", stepUk: "Випекти", descEn: "Stone oven at 250°C for the perfect golden crust", descUk: "Кам'яна піч при 250°C для ідеальної золотистої скоринки" },
];

const CATERING_PACKAGES = [
  {
    emoji: "💼",
    nameEn: "Corporate Breakfast",
    nameUk: "Корпоративний сніданок",
    descEn: "Assorted pastries, mini sandwiches, fresh juice. Perfect for morning meetings.",
    descUk: "Асорті випічки, міні-сендвічі, свіжий сік. Ідеально для ранкових нарад.",
    priceEn: "from 250 ₴/person",
    priceUk: "від 250 ₴/особа",
    minEn: "Min. 10 people",
    minUk: "Мін. 10 осіб",
  },
  {
    emoji: "💒",
    nameEn: "Wedding Dessert Table",
    nameUk: "Весільний десертний стіл",
    descEn: "Custom cake + dessert bar with macarons, eclairs, tarts and petit fours.",
    descUk: "Торт на замовлення + десертний бар з макаронами, еклерами, тартами та петі-фур.",
    priceEn: "from 8,000 ₴",
    priceUk: "від 8 000 ₴",
    minEn: "Min. 30 guests",
    minUk: "Мін. 30 гостей",
  },
  {
    emoji: "🎈",
    nameEn: "Birthday Party Box",
    nameUk: "Коробка для дня народження",
    descEn: "Themed cake, cupcakes, cookies, cake pops. All decorated to your theme.",
    descUk: "Тематичний торт, капкейки, печиво, кейк-попси. Все оформлено під вашу тему.",
    priceEn: "from 3,500 ₴",
    priceUk: "від 3 500 ₴",
    minEn: "For 10-20 people",
    minUk: "На 10-20 осіб",
  },
];

const REVIEWS = [
  {
    nameEn: "Olena M.", nameUk: "Олена М.", emoji: "⭐⭐⭐⭐⭐",
    productEn: "Sourdough Loaf", productUk: "Хліб на заквасці",
    textEn: "The best sourdough in Kyiv, hands down! I've been ordering every week for the past year. The crust is perfectly crunchy and the inside is so airy.",
    textUk: "Найкращий хліб на заквасці в Києві, без сумнівів! Замовляю щотижня вже рік. Скоринка ідеально хрустка, а всередині такий повітряний.",
  },
  {
    nameEn: "Dmytro K.", nameUk: "Дмитро К.", emoji: "⭐⭐⭐⭐⭐",
    productEn: "Honey Cake (Medovik)", productUk: "Медовик",
    textEn: "Ordered a Medovik for my mom's birthday — she said it was even better than grandma's recipe. The layers were so moist and perfectly balanced. Will order again!",
    textUk: "Замовив медовик на день народження мами — вона сказала, що навіть кращий за бабусин рецепт. Шари такі вологі та ідеально збалансовані. Замовлю ще!",
  },
  {
    nameEn: "Anna S.", nameUk: "Анна С.", emoji: "⭐⭐⭐⭐⭐",
    productEn: "Wedding Dessert Table", productUk: "Весільний десертний стіл",
    textEn: "Sweet Bakery did the dessert table for our wedding and it was STUNNING. Guests couldn't stop raving about the eclairs and the custom cake was a dream.",
    textUk: "Sweet Bakery зробили десертний стіл для нашого весілля і це було ПРИГОЛОМШЛИВО. Гості не могли перестати хвалити еклери, а торт на замовлення — мрія.",
  },
];

const NAV = [
  { en: "Products", uk: "Продукція", href: "#products" },
  { en: "Custom Cakes", uk: "Торти на замовлення", href: "#custom" },
  { en: "About", uk: "Про нас", href: "#about" },
  { en: "Order", uk: "Замовити", href: "#order" },
  { en: "Contact", uk: "Контакти", href: "#contact" },
];

/* ───────────── component ───────────── */

export function SweetBakeryDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  /* product tabs */
  const [activeTab, setActiveTab] = useState("bread");
  /* cake builder */
  const [cakeSize, setCakeSize] = useState(0);
  const [cakeFlavor, setCakeFlavor] = useState(0);
  const [cakeFilling, setCakeFilling] = useState(0);
  const [cakeDecor, setCakeDecor] = useState(0);
  const [cakeMsg, setCakeMsg] = useState("");
  const [cakeDate, setCakeDate] = useState("");
  const [cakeConfirmed, setCakeConfirmed] = useState(false);
  /* order form */
  const [deliveryMode, setDeliveryMode] = useState<"delivery" | "pickup">("delivery");
  const [orderName, setOrderName] = useState("");
  const [orderPhone, setOrderPhone] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [orderNotes, setOrderNotes] = useState("");
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  /* mobile nav */
  const [mobileNav, setMobileNav] = useState(false);

  const cakeTotal =
    CAKE_SIZES[cakeSize].price +
    CAKE_FLAVORS[cakeFlavor].extra +
    CAKE_FILLINGS[cakeFilling].extra +
    CAKE_DECORATIONS[cakeDecor].extra;

  /* ───────── render ───────── */
  return (
    <div className="min-h-screen bg-[#fffbeb] text-[#78350f] font-sans">
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 bg-[#fffbeb]/95 backdrop-blur border-b border-[#fdba74]/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
          <a href="#" className="text-xl font-bold tracking-tight flex items-center gap-1.5">
            <span className="text-2xl">🥐</span>
            <span className="text-[#78350f]">Sweet Bakery</span>
          </a>

          {/* desktop nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#92400e]">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-[#78350f] transition-colors">
                {isUk ? n.uk : n.en}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#order"
              className="hidden sm:inline-flex items-center gap-1.5 bg-[#fb923c] hover:bg-[#f97316] text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors"
            >
              🛒 {isUk ? "Замовити онлайн" : "Order Online"}
            </a>
            {/* mobile burger */}
            <button
              onClick={() => setMobileNav(!mobileNav)}
              className="md:hidden text-2xl leading-none"
              aria-label="Menu"
            >
              {mobileNav ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* mobile dropdown */}
        {mobileNav && (
          <div className="md:hidden border-t border-[#fdba74]/40 bg-[#fffbeb] px-4 pb-4">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setMobileNav(false)}
                className="block py-2 text-[#92400e] hover:text-[#78350f] text-sm font-medium"
              >
                {isUk ? n.uk : n.en}
              </a>
            ))}
            <a
              href="#order"
              onClick={() => setMobileNav(false)}
              className="mt-2 block text-center bg-[#fb923c] text-white text-sm font-semibold px-5 py-2 rounded-full"
            >
              🛒 {isUk ? "Замовити онлайн" : "Order Online"}
            </a>
          </div>
        )}
      </header>

      {/* ── Hero ── */}
      <section className="bg-linear-to-br from-[#fdba74] via-[#fef3c7] to-[#fb923c] py-20 md:py-28 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-5xl mb-4">🍞</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#78350f] leading-tight mb-4">
            {isUk ? "Свіжа Випічка Щодня" : "Fresh Baked Daily"}
          </h1>
          <p className="text-lg md:text-xl text-[#92400e] mb-6 max-w-xl mx-auto">
            {isUk
              ? "Ремісничий хліб на заквасці, здобна випічка та торти на замовлення. Традиції, яким ви можете довіряти з 2015 року."
              : "Artisan sourdough bread, fine pastries, and custom cakes. Traditions you can trust since 2015."}
          </p>
          <div className="flex justify-center gap-3 text-3xl mb-8">
            {["🥐", "🍞", "🧁", "🎂", "🥖", "🍰"].map((e) => (
              <span key={e} className="hover:scale-125 transition-transform cursor-default">{e}</span>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="#products"
              className="bg-[#78350f] hover:bg-[#92400e] text-white font-semibold px-7 py-3 rounded-full transition-colors"
            >
              {isUk ? "Переглянути продукцію" : "Browse Products"}
            </a>
            <a
              href="#custom"
              className="bg-white/80 hover:bg-white text-[#78350f] font-semibold px-7 py-3 rounded-full border border-[#78350f]/20 transition-colors"
            >
              {isUk ? "Торт на замовлення" : "Custom Cake"}
            </a>
          </div>
        </div>
      </section>

      {/* ── Products (tabbed) ── */}
      <section id="products" className="py-16 md:py-20 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-[#78350f] mb-2">
          {isUk ? "Наша продукція" : "Our Products"}
        </h2>
        <p className="text-center text-[#92400e] mb-8">
          {isUk ? "Все випікається щодня з натуральних інгредієнтів" : "Everything baked daily from natural ingredients"}
        </p>

        {/* tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {PRODUCT_TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                activeTab === t.key
                  ? "bg-[#78350f] text-white"
                  : "bg-[#fef3c7] text-[#92400e] hover:bg-[#fdba74]/50"
              }`}
            >
              {isUk ? t.uk : t.en}
            </button>
          ))}
        </div>

        {/* items grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PRODUCTS[activeTab].map((p, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-[#fdba74]/30 p-5 flex flex-col hover:shadow-lg hover:shadow-[#fdba74]/20 transition-shadow"
            >
              <div className="flex items-start gap-3 mb-3">
                <span className="text-3xl shrink-0">{p.emoji}</span>
                <div>
                  <h3 className="font-bold text-[#78350f]">{isUk ? p.nameUk : p.nameEn}</h3>
                  <p className="text-sm text-[#92400e]/80">{isUk ? p.descUk : p.desc}</p>
                </div>
              </div>
              <div className="mt-auto flex items-center justify-between pt-3 border-t border-[#fef3c7]">
                <span className="font-bold text-[#78350f]">{p.price} ₴</span>
                <button className="bg-[#fb923c] hover:bg-[#f97316] text-white text-xs font-semibold px-4 py-1.5 rounded-full transition-colors">
                  {isUk ? "До кошика" : "Add to Cart"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Custom Cake Builder ── */}
      <section id="custom" className="bg-linear-to-br from-[#fef3c7] to-[#fffbeb] py-16 md:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#78350f] mb-2">
            🎂 {isUk ? "Конструктор торта" : "Custom Cake Builder"}
          </h2>
          <p className="text-center text-[#92400e] mb-10">
            {isUk ? "Створіть торт вашої мрії за 5 кроків" : "Build your dream cake in 5 steps"}
          </p>

          {cakeConfirmed ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-[#fdba74]/30">
              <p className="text-5xl mb-4">🎉</p>
              <h3 className="text-2xl font-bold text-[#78350f] mb-2">
                {isUk ? "Замовлення підтверджено!" : "Order Confirmed!"}
              </h3>
              <p className="text-[#92400e] mb-4">
                {isUk
                  ? "Ми зв'яжемося з вами протягом 2 годин для підтвердження деталей."
                  : "We will contact you within 2 hours to confirm details."}
              </p>
              <button
                onClick={() => setCakeConfirmed(false)}
                className="bg-[#78350f] hover:bg-[#92400e] text-white font-semibold px-6 py-2.5 rounded-full transition-colors"
              >
                {isUk ? "Створити ще один" : "Build Another"}
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#fdba74]/30 space-y-8">
              {/* Step 1: Size */}
              <div>
                <h3 className="font-bold text-[#78350f] mb-1">
                  {isUk ? "Крок 1: Розмір" : "Step 1: Size"}
                </h3>
                <p className="text-sm text-[#92400e]/70 mb-3">
                  {isUk ? "Оберіть діаметр торта" : "Choose cake diameter"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {CAKE_SIZES.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => setCakeSize(i)}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-colors ${
                        cakeSize === i
                          ? "bg-[#78350f] text-white border-[#78350f]"
                          : "bg-[#fef3c7] text-[#92400e] border-[#fdba74]/30 hover:bg-[#fdba74]/30"
                      }`}
                    >
                      {s.label} — {s.serves} {isUk ? "порцій" : "servings"} ({s.price} ₴)
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Flavor */}
              <div>
                <h3 className="font-bold text-[#78350f] mb-1">
                  {isUk ? "Крок 2: Смак" : "Step 2: Flavor"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {CAKE_FLAVORS.map((f, i) => (
                    <button
                      key={i}
                      onClick={() => setCakeFlavor(i)}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-colors ${
                        cakeFlavor === i
                          ? "bg-[#78350f] text-white border-[#78350f]"
                          : "bg-[#fef3c7] text-[#92400e] border-[#fdba74]/30 hover:bg-[#fdba74]/30"
                      }`}
                    >
                      {isUk ? f.uk : f.en}
                      {f.extra > 0 && ` (+${f.extra} ₴)`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Filling */}
              <div>
                <h3 className="font-bold text-[#78350f] mb-1">
                  {isUk ? "Крок 3: Начинка" : "Step 3: Filling"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {CAKE_FILLINGS.map((f, i) => (
                    <button
                      key={i}
                      onClick={() => setCakeFilling(i)}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-colors ${
                        cakeFilling === i
                          ? "bg-[#78350f] text-white border-[#78350f]"
                          : "bg-[#fef3c7] text-[#92400e] border-[#fdba74]/30 hover:bg-[#fdba74]/30"
                      }`}
                    >
                      {isUk ? f.uk : f.en}
                      {f.extra > 0 && ` (+${f.extra} ₴)`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 4: Decoration */}
              <div>
                <h3 className="font-bold text-[#78350f] mb-1">
                  {isUk ? "Крок 4: Декор" : "Step 4: Decoration"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {CAKE_DECORATIONS.map((d, i) => (
                    <button
                      key={i}
                      onClick={() => setCakeDecor(i)}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-colors ${
                        cakeDecor === i
                          ? "bg-[#78350f] text-white border-[#78350f]"
                          : "bg-[#fef3c7] text-[#92400e] border-[#fdba74]/30 hover:bg-[#fdba74]/30"
                      }`}
                    >
                      {isUk ? d.uk : d.en}
                      {d.extra > 0 && ` (+${d.extra} ₴)`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 5: Message & Date */}
              <div>
                <h3 className="font-bold text-[#78350f] mb-1">
                  {isUk ? "Крок 5: Напис та дата" : "Step 5: Message & Date"}
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={cakeMsg}
                    onChange={(e) => setCakeMsg(e.target.value)}
                    placeholder={isUk ? "Напис на торті (необов'язково)" : "Cake message (optional)"}
                    className="w-full border border-[#fdba74]/40 rounded-xl px-4 py-2.5 text-sm bg-[#fffbeb] placeholder:text-[#92400e]/40 focus:outline-none focus:ring-2 focus:ring-[#fb923c]/50"
                  />
                  <input
                    type="date"
                    value={cakeDate}
                    onChange={(e) => setCakeDate(e.target.value)}
                    className="w-full border border-[#fdba74]/40 rounded-xl px-4 py-2.5 text-sm bg-[#fffbeb] text-[#78350f] focus:outline-none focus:ring-2 focus:ring-[#fb923c]/50"
                  />
                </div>
              </div>

              {/* Total & Confirm */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#fef3c7]">
                <div className="text-center sm:text-left">
                  <p className="text-sm text-[#92400e]">{isUk ? "Загальна вартість:" : "Total price:"}</p>
                  <p className="text-3xl font-extrabold text-[#78350f]">{cakeTotal} ₴</p>
                </div>
                <button
                  onClick={() => setCakeConfirmed(true)}
                  className="bg-[#fb923c] hover:bg-[#f97316] text-white font-bold px-8 py-3 rounded-full text-lg transition-colors"
                >
                  🎂 {isUk ? "Підтвердити замовлення" : "Confirm Order"}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Daily Specials ── */}
      <section className="py-16 md:py-20 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-[#78350f] mb-2">
          🔥 {isUk ? "Свіже сьогодні" : "Today's Fresh"}
        </h2>
        <p className="text-center text-[#92400e] mb-10">
          {isUk ? "Спеціальна випічка на сьогодні — поспішайте!" : "Today's special bakes — hurry up!"}
        </p>
        <div className="grid sm:grid-cols-3 gap-5">
          {DAILY_SPECIALS.map((s, i) => (
            <div
              key={i}
              className="relative bg-linear-to-br from-[#fdba74]/20 to-[#fef3c7] rounded-2xl border border-[#fdba74]/40 p-6 text-center hover:shadow-lg hover:shadow-[#fdba74]/20 transition-shadow"
            >
              <span className="absolute -top-3 right-4 bg-[#78350f] text-white text-xs font-bold px-3 py-1 rounded-full">
                {isUk ? s.badgeUk : s.badgeEn}
              </span>
              <p className="text-4xl mb-3">{s.emoji}</p>
              <h3 className="font-bold text-[#78350f] mb-1">{isUk ? s.nameUk : s.nameEn}</h3>
              <p className="text-xl font-extrabold text-[#fb923c] mb-3">{s.price} ₴</p>
              <button className="bg-[#78350f] hover:bg-[#92400e] text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors">
                {isUk ? "Замовити" : "Order Now"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="bg-[#78350f] text-[#fef3c7] py-16 md:py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2">
            🏠 {isUk ? "Наша історія" : "Our Story"}
          </h2>
          <p className="text-center text-[#fdba74] mb-10 max-w-2xl mx-auto">
            {isUk
              ? "Sweet Bakery — це сімейна пекарня, заснована у 2015 році в Києві. Ми починали з маленької кухні та однієї мрії: робити хліб, який об'єднує людей. Сьогодні ми випікаємо понад 500 виробів щодня, використовуючи лише місцеві інгредієнти найвищої якості."
              : "Sweet Bakery is a family bakery founded in 2015 in Kyiv. We started with a small kitchen and one dream: to make bread that brings people together. Today we bake over 500 items daily using only the highest quality local ingredients."}
          </p>

          {/* Sourdough process */}
          <h3 className="text-xl font-bold text-center text-[#fdba74] mb-6">
            {isUk ? "Як народжується наш хліб" : "How Our Bread Is Born"}
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {SOURDOUGH_STEPS.map((s, i) => (
              <div key={i} className="bg-[#92400e]/60 rounded-2xl p-5 text-center">
                <p className="text-3xl mb-2">{s.emoji}</p>
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#fdba74] text-[#78350f] text-sm font-bold mb-2">
                  {i + 1}
                </div>
                <h4 className="font-bold text-white mb-1">{isUk ? s.stepUk : s.stepEn}</h4>
                <p className="text-sm text-[#fef3c7]/80">{isUk ? s.descUk : s.descEn}</p>
              </div>
            ))}
          </div>

          {/* commitment */}
          <div className="bg-[#92400e]/40 rounded-2xl p-6 md:p-8 text-center max-w-2xl mx-auto">
            <p className="text-3xl mb-3">🌾</p>
            <h3 className="font-bold text-white mb-2">
              {isUk ? "Місцеві інгредієнти" : "Local Ingredients"}
            </h3>
            <p className="text-sm text-[#fef3c7]/80">
              {isUk
                ? "Борошно з українських млинів, яйця від фермерів Київщини, масло з Карпат. Ми підтримуємо локальних виробників і мінімізуємо вуглецевий слід."
                : "Flour from Ukrainian mills, eggs from Kyiv region farms, butter from the Carpathians. We support local producers and minimize our carbon footprint."}
            </p>
          </div>
        </div>
      </section>

      {/* ── Wholesale / Events ── */}
      <section className="py-16 md:py-20 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-[#78350f] mb-2">
          🎉 {isUk ? "Кейтеринг та події" : "Catering & Events"}
        </h2>
        <p className="text-center text-[#92400e] mb-10">
          {isUk ? "Солодкі рішення для будь-якої нагоди" : "Sweet solutions for every occasion"}
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {CATERING_PACKAGES.map((c, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-[#fdba74]/30 p-6 flex flex-col hover:shadow-lg hover:shadow-[#fdba74]/20 transition-shadow"
            >
              <p className="text-4xl mb-3">{c.emoji}</p>
              <h3 className="text-lg font-bold text-[#78350f] mb-2">{isUk ? c.nameUk : c.nameEn}</h3>
              <p className="text-sm text-[#92400e]/80 mb-4">{isUk ? c.descUk : c.descEn}</p>
              <div className="mt-auto pt-4 border-t border-[#fef3c7]">
                <p className="font-bold text-[#fb923c] text-lg">{isUk ? c.priceUk : c.priceEn}</p>
                <p className="text-xs text-[#92400e]/60">{isUk ? c.minUk : c.minEn}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="bg-[#fef3c7] py-16 md:py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#78350f] mb-2">
            💬 {isUk ? "Відгуки клієнтів" : "Customer Reviews"}
          </h2>
          <p className="text-center text-[#92400e] mb-10">
            {isUk ? "Що кажуть наші клієнти" : "What our customers say"}
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-[#fdba74]/30">
                <p className="text-sm mb-3">{r.emoji}</p>
                <p className="text-sm text-[#92400e] mb-4 italic leading-relaxed">
                  &ldquo;{isUk ? r.textUk : r.textEn}&rdquo;
                </p>
                <div className="pt-3 border-t border-[#fef3c7]">
                  <p className="font-bold text-[#78350f] text-sm">{isUk ? r.nameUk : r.nameEn}</p>
                  <p className="text-xs text-[#92400e]/60">
                    {isUk ? "Продукт" : "Product"}: {isUk ? r.productUk : r.productEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Order Form ── */}
      <section id="order" className="py-16 md:py-20 px-4 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-[#78350f] mb-2">
          📦 {isUk ? "Оформити замовлення" : "Place an Order"}
        </h2>
        <p className="text-center text-[#92400e] mb-10">
          {isUk ? "Доставка або самовивіз — як зручніше" : "Delivery or pickup — whatever suits you"}
        </p>

        {orderSubmitted ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-[#fdba74]/30">
            <p className="text-5xl mb-4">✅</p>
            <h3 className="text-2xl font-bold text-[#78350f] mb-2">
              {isUk ? "Замовлення отримано!" : "Order Received!"}
            </h3>
            <p className="text-[#92400e] mb-4">
              {isUk
                ? "Ми зв'яжемося з вами найближчим часом для підтвердження."
                : "We will contact you shortly to confirm."}
            </p>
            <button
              onClick={() => {
                setOrderSubmitted(false);
                setOrderName("");
                setOrderPhone("");
                setOrderDate("");
                setOrderNotes("");
              }}
              className="bg-[#78350f] hover:bg-[#92400e] text-white font-semibold px-6 py-2.5 rounded-full transition-colors"
            >
              {isUk ? "Нове замовлення" : "New Order"}
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#fdba74]/30 space-y-6">
            {/* Delivery / Pickup toggle */}
            <div>
              <p className="font-bold text-[#78350f] mb-2">{isUk ? "Спосіб отримання" : "Receiving Method"}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setDeliveryMode("delivery")}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-colors ${
                    deliveryMode === "delivery"
                      ? "bg-[#78350f] text-white border-[#78350f]"
                      : "bg-[#fef3c7] text-[#92400e] border-[#fdba74]/30 hover:bg-[#fdba74]/30"
                  }`}
                >
                  🚚 {isUk ? "Доставка" : "Delivery"}
                </button>
                <button
                  onClick={() => setDeliveryMode("pickup")}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-colors ${
                    deliveryMode === "pickup"
                      ? "bg-[#78350f] text-white border-[#78350f]"
                      : "bg-[#fef3c7] text-[#92400e] border-[#fdba74]/30 hover:bg-[#fdba74]/30"
                  }`}
                >
                  🏪 {isUk ? "Самовивіз" : "Pickup"}
                </button>
              </div>
              {deliveryMode === "pickup" && (
                <p className="text-xs text-[#92400e]/60 mt-2">
                  📍 {isUk ? "вул. Хрещатик, 10, Київ (7:00–20:00)" : "10 Khreschatyk St, Kyiv (7:00–20:00)"}
                </p>
              )}
            </div>

            {/* Product selection hint */}
            <div className="bg-[#fef3c7] rounded-xl p-4">
              <p className="text-sm text-[#92400e]">
                💡 {isUk
                  ? "Оберіть продукти з каталогу вище або напишіть ваше замовлення в коментарі нижче."
                  : "Select products from the catalog above or describe your order in the notes below."}
              </p>
            </div>

            {/* Contact fields */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#78350f] mb-1">
                  {isUk ? "Ваше ім'я" : "Your Name"}
                </label>
                <input
                  type="text"
                  value={orderName}
                  onChange={(e) => setOrderName(e.target.value)}
                  placeholder={isUk ? "Ім'я та прізвище" : "Full name"}
                  className="w-full border border-[#fdba74]/40 rounded-xl px-4 py-2.5 text-sm bg-[#fffbeb] placeholder:text-[#92400e]/40 focus:outline-none focus:ring-2 focus:ring-[#fb923c]/50"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#78350f] mb-1">
                  {isUk ? "Телефон" : "Phone"}
                </label>
                <input
                  type="tel"
                  value={orderPhone}
                  onChange={(e) => setOrderPhone(e.target.value)}
                  placeholder="+380 XX XXX XX XX"
                  className="w-full border border-[#fdba74]/40 rounded-xl px-4 py-2.5 text-sm bg-[#fffbeb] placeholder:text-[#92400e]/40 focus:outline-none focus:ring-2 focus:ring-[#fb923c]/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#78350f] mb-1">
                {isUk ? "Бажана дата" : "Preferred Date"}
              </label>
              <input
                type="date"
                value={orderDate}
                onChange={(e) => setOrderDate(e.target.value)}
                className="w-full border border-[#fdba74]/40 rounded-xl px-4 py-2.5 text-sm bg-[#fffbeb] text-[#78350f] focus:outline-none focus:ring-2 focus:ring-[#fb923c]/50"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#78350f] mb-1">
                {isUk ? "Коментар до замовлення" : "Order Notes"}
              </label>
              <textarea
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                rows={3}
                placeholder={isUk ? "Опишіть ваше замовлення, побажання, алергії..." : "Describe your order, preferences, allergies..."}
                className="w-full border border-[#fdba74]/40 rounded-xl px-4 py-2.5 text-sm bg-[#fffbeb] placeholder:text-[#92400e]/40 focus:outline-none focus:ring-2 focus:ring-[#fb923c]/50 resize-none"
              />
            </div>

            <button
              onClick={() => setOrderSubmitted(true)}
              className="w-full bg-[#fb923c] hover:bg-[#f97316] text-white font-bold py-3 rounded-full text-lg transition-colors"
            >
              📦 {isUk ? "Надіслати замовлення" : "Submit Order"}
            </button>
          </div>
        )}
      </section>

      {/* ── Footer ── */}
      <footer id="contact" className="bg-[#78350f] text-[#fef3c7] py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div>
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-1.5">
                <span className="text-xl">🥐</span> Sweet Bakery
              </h3>
              <p className="text-sm text-[#fdba74]/80">
                {isUk
                  ? "Сімейна пекарня в серці Києва. Свіжа випічка щодня з 2015 року."
                  : "Family bakery in the heart of Kyiv. Fresh baked daily since 2015."}
              </p>
            </div>

            {/* Address */}
            <div>
              <h4 className="font-bold text-white mb-3">{isUk ? "Адреса" : "Address"}</h4>
              <p className="text-sm text-[#fdba74]/80">
                {isUk ? "вул. Хрещатик, 10" : "10 Khreschatyk St"}<br />
                {isUk ? "Київ, 01001" : "Kyiv, 01001"}<br />
                {isUk ? "Україна" : "Ukraine"}
              </p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-white mb-3">{isUk ? "Контакти" : "Contact"}</h4>
              <p className="text-sm text-[#fdba74]/80">
                📞 +380 44 123 45 67<br />
                📧 hello@sweetbakery.ua<br />
                📱 @sweetbakery_ua
              </p>
            </div>

            {/* Hours */}
            <div>
              <h4 className="font-bold text-white mb-3">{isUk ? "Графік роботи" : "Working Hours"}</h4>
              <p className="text-sm text-[#fdba74]/80">
                {isUk ? "Пн–Нд: 7:00 – 20:00" : "Mon–Sun: 7:00 – 20:00"}<br />
                {isUk ? "Без вихідних" : "Open every day"}<br />
                {isUk ? "🥐 Свіжий хліб з 7:00" : "🥐 Fresh bread from 7:00"}
              </p>
            </div>
          </div>

          <div className="border-t border-[#92400e] pt-6 text-center">
            <p className="text-sm text-[#fdba74]/60">
              &copy; 2015–2026 Sweet Bakery UA. {isUk ? "Усі права захищені." : "All rights reserved."}
            </p>
            <p className="text-xs text-[#fdba74]/40 mt-1">
              {isUk ? "Випечено з ❤️ у Києві" : "Baked with ❤️ in Kyiv"}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
