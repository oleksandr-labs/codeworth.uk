"use client";

import { useState } from "react";

/* ------------------------------------------------------------------ */
/*  SmachnoDemo — Ukrainian restaurant "Смачно"                       */
/* ------------------------------------------------------------------ */

export function SmachnoDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  /* ---- menu tabs state ---- */
  const [activeTab, setActiveTab] = useState(0);

  /* ---- reservation state ---- */
  const [resName, setResName] = useState("");
  const [resPhone, setResPhone] = useState("");
  const [resDate, setResDate] = useState("");
  const [resTime, setResTime] = useState("");
  const [resGuests, setResGuests] = useState(2);
  const [resOccasion, setResOccasion] = useState(false);
  const [resOccasionType, setResOccasionType] = useState("");
  const [resRequests, setResRequests] = useState("");
  const [resConfirmed, setResConfirmed] = useState(false);

  /* ================================================================ */
  /*  DATA                                                            */
  /* ================================================================ */

  const nav = [
    { en: "Menu", uk: "Меню" },
    { en: "About", uk: "Про нас" },
    { en: "Chef", uk: "Шеф-кухар" },
    { en: "Reserve", uk: "Бронювання" },
    { en: "Catering", uk: "Кейтеринг" },
  ];

  const menuTabs = [
    { en: "Starters", uk: "Закуски" },
    { en: "Main Courses", uk: "Основні страви" },
    { en: "Varenyky", uk: "Вареники" },
    { en: "Desserts", uk: "Десерти" },
    { en: "Drinks", uk: "Напої" },
  ];

  const menuItems: {
    emoji: string;
    en: string;
    uk: string;
    descEn: string;
    descUk: string;
    price: number;
    weight: string;
  }[][] = [
    /* Starters */
    [
      { emoji: "🥗", en: "Vinaigrette", uk: "Вінегрет", descEn: "Classic beetroot salad with pickled vegetables", descUk: "Класичний буряковий салат з маринованими овочами", price: 145, weight: "220g" },
      { emoji: "🧈", en: "Salo with Garlic", uk: "Сало з часником", descEn: "Cured pork fatback with garlic and rye bread", descUk: "Засолене сало з часником та житнім хлібом", price: 165, weight: "150g" },
      { emoji: "🐟", en: "Herring under Fur Coat", uk: "Оселедець під шубою", descEn: "Layered salad with herring, beets and mayo", descUk: "Шаровий салат з оселедцем, буряком та майонезом", price: 175, weight: "250g" },
      { emoji: "🍄", en: "Mushroom Julienne", uk: "Жульєн з грибами", descEn: "Baked mushrooms in creamy sauce", descUk: "Запечені гриби у вершковому соусі", price: 155, weight: "180g" },
      { emoji: "🥒", en: "Pickled Assortment", uk: "Асорті солінь", descEn: "House-pickled cucumbers, tomatoes, peppers", descUk: "Домашні мариновані огірки, помідори, перець", price: 130, weight: "200g" },
    ],
    /* Main Courses */
    [
      { emoji: "🍲", en: "Red Borscht", uk: "Червоний борщ", descEn: "Traditional beet soup with pampushky and sour cream", descUk: "Традиційний буряковий суп з пампушками та сметаною", price: 195, weight: "350g" },
      { emoji: "🥬", en: "Holubtsi", uk: "Голубці", descEn: "Cabbage rolls stuffed with rice and pork in tomato sauce", descUk: "Капустяні рулети з рисом та свининою у томатному соусі", price: 225, weight: "300g" },
      { emoji: "🥔", en: "Deruny", uk: "Деруни", descEn: "Crispy potato pancakes with sour cream", descUk: "Хрусткі картопляні млинці зі сметаною", price: 185, weight: "280g" },
      { emoji: "🍖", en: "Chicken Kyiv", uk: "Котлета по-київськи", descEn: "Breaded chicken cutlet with herbed butter", descUk: "Панірована куряча котлета з пряним маслом", price: 265, weight: "250g" },
      { emoji: "🐖", en: "Pork Shashlik", uk: "Свинячий шашлик", descEn: "Marinated pork skewers over charcoal", descUk: "Мариновані свинячі шампури на вугіллі", price: 285, weight: "300g" },
    ],
    /* Varenyky */
    [
      { emoji: "🥟", en: "Varenyky with Potatoes", uk: "Вареники з картоплею", descEn: "Classic dumplings with mashed potato and onion", descUk: "Класичні вареники з картопляним пюре та цибулею", price: 165, weight: "250g" },
      { emoji: "🥟", en: "Varenyky with Cherries", uk: "Вареники з вишнями", descEn: "Sweet dumplings with fresh cherries and sugar", descUk: "Солодкі вареники зі свіжими вишнями та цукром", price: 175, weight: "250g" },
      { emoji: "🥟", en: "Varenyky with Cottage Cheese", uk: "Вареники з сиром", descEn: "Tender dumplings with sweet farmer cheese", descUk: "Ніжні вареники з солодким сиром", price: 165, weight: "250g" },
      { emoji: "🥟", en: "Varenyky with Cabbage", uk: "Вареники з капустою", descEn: "Dumplings stuffed with braised cabbage", descUk: "Вареники з тушкованою капустою", price: 155, weight: "250g" },
      { emoji: "🥟", en: "Varenyky with Mushrooms", uk: "Вареники з грибами", descEn: "Dumplings with forest mushroom filling", descUk: "Вареники з начинкою з лісних грибів", price: 175, weight: "250g" },
    ],
    /* Desserts */
    [
      { emoji: "🥧", en: "Syrniky", uk: "Сирники", descEn: "Pan-fried cottage cheese pancakes with berry jam", descUk: "Смажені сирні оладки з ягідним джемом", price: 145, weight: "200g" },
      { emoji: "🍯", en: "Honey Cake (Medovyk)", uk: "Медовик", descEn: "Multi-layered honey cake with cream", descUk: "Багатошаровий медовий торт з кремом", price: 135, weight: "180g" },
      { emoji: "🍒", en: "Cherry Varennya", uk: "Вишневе варення", descEn: "Homemade cherry preserves with fresh bread", descUk: "Домашнє вишневе варення зі свіжим хлібом", price: 95, weight: "120g" },
      { emoji: "🍩", en: "Pampushky", uk: "Пампушки", descEn: "Fluffy fried doughnuts dusted with sugar", descUk: "Пухкі смажені пончики з цукровою пудрою", price: 110, weight: "150g" },
    ],
    /* Drinks */
    [
      { emoji: "🍺", en: "Uzvar", uk: "Узвар", descEn: "Traditional dried fruit compote", descUk: "Традиційний компот з сухофруктів", price: 65, weight: "300ml" },
      { emoji: "🥛", en: "Ryazhanka", uk: "Ряжанка", descEn: "Fermented baked milk drink", descUk: "Кисломолочний напій з пряженого молока", price: 55, weight: "250ml" },
      { emoji: "🍷", en: "Horilka Sampler", uk: "Дегустація горілки", descEn: "Three Ukrainian horilka varieties with snacks", descUk: "Три сорти української горілки із закусками", price: 245, weight: "3×50ml" },
      { emoji: "☕", en: "Lviv Coffee", uk: "Львівська кава", descEn: "Strong brewed coffee, Lviv style", descUk: "Міцна заварна кава, по-львівськи", price: 75, weight: "200ml" },
      { emoji: "🫖", en: "Herbal Tea", uk: "Трав'яний чай", descEn: "Carpathian herb blend with honey", descUk: "Карпатський трав'яний збір з медом", price: 70, weight: "300ml" },
    ],
  ];

  const timeSlots: string[] = [];
  for (let h = 12; h <= 20; h++) {
    timeSlots.push(`${h}:00`);
    if (h < 21) timeSlots.push(`${h}:30`);
  }

  const cateringPackages = [
    {
      emoji: "🏠",
      en: "Family Dinner",
      uk: "Сімейна вечеря",
      personsEn: "4–6 persons",
      personsUk: "4–6 осіб",
      price: 650,
      items: [
        { en: "Red borscht with pampushky", uk: "Червоний борщ з пампушками" },
        { en: "Varenyky assortment (3 kinds)", uk: "Асорті вареників (3 види)" },
        { en: "Chicken Kyiv", uk: "Котлета по-київськи" },
        { en: "Honey cake", uk: "Медовик" },
        { en: "Uzvar compote", uk: "Узвар" },
      ],
    },
    {
      emoji: "🏢",
      en: "Corporate Event",
      uk: "Корпоративний захід",
      personsEn: "10–30 persons",
      personsUk: "10–30 осіб",
      price: 550,
      items: [
        { en: "Pickled assortment & salo platter", uk: "Асорті солінь та сальна тарілка" },
        { en: "Borscht in bread bowls", uk: "Борщ у хлібних мисках" },
        { en: "Holubtsi & deruny buffet", uk: "Буфет з голубцями та дерунами" },
        { en: "Syrniky & pampushky dessert bar", uk: "Десертний бар: сирники та пампушки" },
        { en: "Horilka sampler station", uk: "Станція дегустації горілки" },
      ],
    },
    {
      emoji: "💒",
      en: "Wedding Feast",
      uk: "Весільний бенкет",
      personsEn: "50+ persons",
      personsUk: "50+ осіб",
      price: 850,
      items: [
        { en: "Full traditional korovai bread ceremony", uk: "Традиційна церемонія з короваєм" },
        { en: "Seven-course Ukrainian banquet", uk: "Семистравовий український бенкет" },
        { en: "Live varenyky making station", uk: "Жива станція ліпки вареників" },
        { en: "Wedding medovyk cake", uk: "Весільний торт-медовик" },
        { en: "Unlimited uzvar & horilka", uk: "Необмежений узвар та горілка" },
      ],
    },
  ];

  const galleryItems = [
    { emoji: "🍲", en: "Red Borscht", uk: "Червоний борщ" },
    { emoji: "🥟", en: "Varenyky Platter", uk: "Тарілка вареників" },
    { emoji: "🥬", en: "Holubtsi", uk: "Голубці" },
    { emoji: "🥔", en: "Golden Deruny", uk: "Золотисті деруни" },
    { emoji: "🍯", en: "Medovyk Cake", uk: "Торт Медовик" },
    { emoji: "🍖", en: "Chicken Kyiv", uk: "Котлета по-київськи" },
  ];

  const reviews = [
    {
      nameEn: "Olena K.",
      nameUk: "Олена К.",
      stars: 5,
      en: "The borscht here is exactly like my grandmother used to make. Warm atmosphere and incredible flavors. Truly a taste of home.",
      uk: "Борщ тут точно такий, як готувала моя бабуся. Тепла атмосфера та неймовірні смаки. Справжній смак дому.",
    },
    {
      nameEn: "James R.",
      nameUk: "Джеймс Р.",
      stars: 5,
      en: "My first experience with Ukrainian cuisine and I'm completely won over. The varenyky with cherries are divine!",
      uk: "Мій перший досвід з українською кухнею — і я повністю підкорений. Вареники з вишнями — це божественно!",
    },
    {
      nameEn: "Mariia S.",
      nameUk: "Марія С.",
      stars: 4,
      en: "Perfect for family celebrations. We had a birthday here and the staff made it truly special. The catering menu is wonderful.",
      uk: "Ідеально для сімейних свят. Ми відзначали день народження тут, і персонал зробив його особливим. Кейтерингове меню чудове.",
    },
  ];

  /* ================================================================ */
  /*  HELPERS                                                         */
  /* ================================================================ */

  const t = (en: string, uk: string) => (isUk ? uk : en);

  const handleReserve = () => {
    if (resName && resPhone && resDate && resTime) {
      setResConfirmed(true);
    }
  };

  /* ================================================================ */
  /*  RENDER                                                          */
  /* ================================================================ */

  return (
    <div className="min-h-screen bg-[#fefce8] text-[#451a03] font-serif">
      {/* ============================================================ */}
      {/*  HEADER                                                      */}
      {/* ============================================================ */}
      <header className="bg-[#7f1d1d] text-[#fefce8] sticky top-0 z-50 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold tracking-wide shrink-0">
            🍲 {isUk ? "Смачно" : "Smachno"}
          </div>

          {/* Nav */}
          <nav className="hidden md:flex gap-6 text-sm uppercase tracking-wider">
            {nav.map((n, i) => (
              <a
                key={i}
                href="#"
                className="hover:text-[#f59e0b] transition-colors"
              >
                {isUk ? n.uk : n.en}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <button className="bg-[#991b1b] hover:bg-[#b91c1c] text-[#fefce8] px-5 py-2 rounded-lg text-sm font-semibold transition-colors border border-[#f59e0b]/30 shrink-0">
            {t("Reserve Table", "Забронювати стіл")}
          </button>
        </div>

        {/* Decorative embroidery border */}
        <div
          className="h-3 w-full"
          style={{
            background:
              "repeating-linear-gradient(90deg, #991b1b 0px, #991b1b 6px, #d97706 6px, #d97706 12px, #f59e0b 12px, #f59e0b 18px, #d97706 18px, #d97706 24px)",
          }}
        />
      </header>

      {/* ============================================================ */}
      {/*  HERO                                                        */}
      {/* ============================================================ */}
      <section className="relative bg-linear-to-br from-[#7f1d1d] via-[#991b1b] to-[#7f1d1d] text-[#fefce8] py-24 overflow-hidden">
        {/* Wheat pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 20px, #f59e0b 20px, #f59e0b 22px)",
          }}
        />

        {/* Decorative top border */}
        <div
          className="absolute top-0 left-0 right-0 h-2"
          style={{
            background:
              "repeating-linear-gradient(90deg, #d97706 0px, #d97706 8px, transparent 8px, transparent 16px, #f59e0b 16px, #f59e0b 24px, transparent 24px, transparent 32px)",
          }}
        />

        <div className="relative max-w-4xl mx-auto text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {t(
              "The Taste of Authentic Ukraine",
              "Смак Справжньої України"
            )}
          </h1>
          <p className="text-lg md:text-xl text-[#fefce8]/80 mb-8 max-w-2xl mx-auto">
            {t(
              "Generations of traditional recipes, crafted with love and the finest local ingredients. Every dish tells a story of Ukrainian heritage.",
              "Покоління традиційних рецептів, створених з любов'ю та найкращими місцевими інгредієнтами. Кожна страва розповідає історію української спадщини."
            )}
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <button className="bg-[#d97706] hover:bg-[#f59e0b] text-[#451a03] px-8 py-3 rounded-lg font-bold text-lg transition-colors">
              {t("View Menu", "Переглянути меню")}
            </button>
            <button className="border-2 border-[#f59e0b] text-[#f59e0b] hover:bg-[#f59e0b]/10 px-8 py-3 rounded-lg font-bold text-lg transition-colors">
              {t("Reserve Table", "Забронювати стіл")}
            </button>
          </div>

          {/* Emoji food row */}
          <div className="flex justify-center gap-4 text-4xl">
            {["🍲", "🥟", "🥧", "🍯", "🥖"].map((e, i) => (
              <span
                key={i}
                className="hover:scale-125 transition-transform cursor-default"
              >
                {e}
              </span>
            ))}
          </div>
        </div>

        {/* Decorative bottom border */}
        <div
          className="absolute bottom-0 left-0 right-0 h-2"
          style={{
            background:
              "repeating-linear-gradient(90deg, #d97706 0px, #d97706 8px, transparent 8px, transparent 16px, #f59e0b 16px, #f59e0b 24px, transparent 24px, transparent 32px)",
          }}
        />
      </section>

      {/* ============================================================ */}
      {/*  MENU                                                        */}
      {/* ============================================================ */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#7f1d1d] mb-3">
            {t("Our Menu", "Наше Меню")}
          </h2>
          <p className="text-center text-[#92400e] mb-10">
            {t(
              "Authentic dishes prepared with centuries-old recipes",
              "Автентичні страви, приготовані за віковими рецептами"
            )}
          </p>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {menuTabs.map((tab, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors ${
                  activeTab === i
                    ? "bg-[#7f1d1d] text-[#fefce8]"
                    : "bg-[#fef3c7] text-[#92400e] hover:bg-[#fde68a]"
                }`}
              >
                {isUk ? tab.uk : tab.en}
              </button>
            ))}
          </div>

          {/* Dishes */}
          <div className="grid gap-4">
            {menuItems[activeTab].map((dish, i) => (
              <div
                key={i}
                className="bg-white/70 border border-[#d97706]/20 rounded-xl p-5 flex items-start gap-4 hover:shadow-md transition-shadow"
              >
                <span className="text-3xl shrink-0">{dish.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-3 flex-wrap">
                    <h3 className="font-bold text-[#7f1d1d] text-lg">
                      {isUk ? dish.uk : dish.en}
                    </h3>
                    <span className="text-[#92400e] text-sm">{dish.weight}</span>
                  </div>
                  <p className="text-[#78350f]/70 text-sm mt-1">
                    {isUk ? dish.descUk : dish.descEn}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <span className="text-xl font-bold text-[#d97706]">
                    {dish.price}
                  </span>
                  <span className="text-[#92400e] text-sm ml-1">
                    {t("UAH", "₴")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Embroidery divider */}
      <div
        className="h-4 w-full"
        style={{
          background:
            "repeating-linear-gradient(90deg, #fefce8 0px, #fefce8 4px, #d97706 4px, #d97706 8px, #7f1d1d 8px, #7f1d1d 12px, #d97706 12px, #d97706 16px)",
        }}
      />

      {/* ============================================================ */}
      {/*  CHEF                                                        */}
      {/* ============================================================ */}
      <section className="py-20 px-4 bg-[#fffbeb]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          {/* Photo placeholder */}
          <div className="w-64 h-80 rounded-2xl bg-linear-to-br from-[#d97706]/20 to-[#7f1d1d]/20 border-4 border-[#d97706]/30 flex flex-col items-center justify-center shrink-0">
            <span className="text-7xl mb-3">👨‍🍳</span>
            <span className="text-[#92400e] text-sm font-medium">
              {t("Photo", "Фото")}
            </span>
          </div>

          {/* Bio */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#7f1d1d] mb-2">
              {t("Our Chef", "Наш Шеф-кухар")}
            </h2>
            <h3 className="text-xl text-[#d97706] font-semibold mb-4">
              {t("Mykola Petrenko", "Микола Петренко")}
            </h3>
            <p className="text-[#78350f]/80 mb-4 leading-relaxed">
              {t(
                "With over 20 years dedicated to Ukrainian cuisine, Chef Mykola Petrenko has traveled every corner of Ukraine — from the Carpathian highlands to the Black Sea coast — to master the regional recipes that make our country's culinary heritage so rich and diverse.",
                "З понад 20-річним досвідом у українській кухні, шеф-кухар Микола Петренко об'їздив кожен куточок України — від Карпатських гір до Чорноморського узбережжя — щоб опанувати регіональні рецепти, які роблять кулінарну спадщину нашої країни такою багатою та різноманітною."
              )}
            </p>
            <p className="text-[#78350f]/80 leading-relaxed">
              {t(
                "His philosophy is simple: use the best local and seasonal ingredients, honor traditional techniques, and put love into every dish. \"Ukrainian cuisine is not just food — it is a story of our land, our people, and our soul,\" he says.",
                "Його філософія проста: використовувати найкращі місцеві та сезонні інгредієнти, шанувати традиційні техніки та вкладати любов у кожну страву. «Українська кухня — це не просто їжа, це історія нашої землі, нашого народу та нашої душі», — каже він."
              )}
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  RESERVATION                                                 */}
      {/* ============================================================ */}
      <section className="py-20 px-4 bg-linear-to-br from-[#7f1d1d] to-[#991b1b] text-[#fefce8]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
            {t("Reserve a Table", "Забронювати Стіл")}
          </h2>
          <p className="text-center text-[#fefce8]/70 mb-10">
            {t(
              "Join us for an unforgettable dining experience",
              "Приєднайтесь до нас для незабутнього гастрономічного досвіду"
            )}
          </p>

          {!resConfirmed ? (
            <div className="bg-[#fefce8]/10 backdrop-blur rounded-2xl p-8 space-y-5 border border-[#f59e0b]/20">
              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1.5 text-[#fde68a]">
                    {t("Your Name", "Ваше ім'я")} *
                  </label>
                  <input
                    type="text"
                    value={resName}
                    onChange={(e) => setResName(e.target.value)}
                    className="w-full rounded-lg bg-[#fefce8]/10 border border-[#f59e0b]/30 px-4 py-2.5 text-[#fefce8] placeholder:text-[#fefce8]/40 focus:outline-none focus:border-[#f59e0b]"
                    placeholder={t("Name", "Ім'я")}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1.5 text-[#fde68a]">
                    {t("Phone", "Телефон")} *
                  </label>
                  <input
                    type="tel"
                    value={resPhone}
                    onChange={(e) => setResPhone(e.target.value)}
                    className="w-full rounded-lg bg-[#fefce8]/10 border border-[#f59e0b]/30 px-4 py-2.5 text-[#fefce8] placeholder:text-[#fefce8]/40 focus:outline-none focus:border-[#f59e0b]"
                    placeholder="+380 ..."
                  />
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1.5 text-[#fde68a]">
                    {t("Date", "Дата")} *
                  </label>
                  <input
                    type="date"
                    value={resDate}
                    onChange={(e) => setResDate(e.target.value)}
                    className="w-full rounded-lg bg-[#fefce8]/10 border border-[#f59e0b]/30 px-4 py-2.5 text-[#fefce8] focus:outline-none focus:border-[#f59e0b]"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1.5 text-[#fde68a]">
                    {t("Time", "Час")} *
                  </label>
                  <select
                    value={resTime}
                    onChange={(e) => setResTime(e.target.value)}
                    className="w-full rounded-lg bg-[#fefce8]/10 border border-[#f59e0b]/30 px-4 py-2.5 text-[#fefce8] focus:outline-none focus:border-[#f59e0b]"
                  >
                    <option value="" className="text-[#451a03]">
                      {t("Select time", "Оберіть час")}
                    </option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot} className="text-[#451a03]">
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Guests */}
              <div>
                <label className="block text-sm mb-1.5 text-[#fde68a]">
                  {t("Number of Guests", "Кількість гостей")}: {resGuests}
                </label>
                <input
                  type="range"
                  min={1}
                  max={12}
                  value={resGuests}
                  onChange={(e) => setResGuests(Number(e.target.value))}
                  className="w-full accent-[#f59e0b]"
                />
                <div className="flex justify-between text-xs text-[#fefce8]/50 mt-1">
                  <span>1</span>
                  <span>6</span>
                  <span>12</span>
                </div>
              </div>

              {/* Occasion */}
              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={resOccasion}
                    onChange={(e) => setResOccasion(e.target.checked)}
                    className="w-5 h-5 rounded accent-[#f59e0b]"
                  />
                  <span className="text-sm">
                    {t("Special occasion?", "Особливий привід?")}
                  </span>
                </label>
                {resOccasion && (
                  <div className="mt-3 flex gap-3 flex-wrap">
                    {[
                      { en: "🎂 Birthday", uk: "🎂 День народження" },
                      { en: "💍 Anniversary", uk: "💍 Річниця" },
                      { en: "🎉 Other", uk: "🎉 Інше" },
                    ].map((oc, i) => (
                      <button
                        key={i}
                        onClick={() =>
                          setResOccasionType(isUk ? oc.uk : oc.en)
                        }
                        className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
                          resOccasionType === (isUk ? oc.uk : oc.en)
                            ? "bg-[#f59e0b] text-[#451a03]"
                            : "bg-[#fefce8]/10 hover:bg-[#fefce8]/20"
                        }`}
                      >
                        {isUk ? oc.uk : oc.en}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Requests */}
              <div>
                <label className="block text-sm mb-1.5 text-[#fde68a]">
                  {t("Special Requests", "Особливі побажання")}
                </label>
                <textarea
                  value={resRequests}
                  onChange={(e) => setResRequests(e.target.value)}
                  rows={3}
                  className="w-full rounded-lg bg-[#fefce8]/10 border border-[#f59e0b]/30 px-4 py-2.5 text-[#fefce8] placeholder:text-[#fefce8]/40 focus:outline-none focus:border-[#f59e0b] resize-none"
                  placeholder={t(
                    "Dietary needs, seating preferences...",
                    "Дієтичні потреби, побажання щодо місця..."
                  )}
                />
              </div>

              {/* Submit */}
              <button
                onClick={handleReserve}
                className="w-full bg-[#d97706] hover:bg-[#f59e0b] text-[#451a03] py-3.5 rounded-lg font-bold text-lg transition-colors"
              >
                {t("Confirm Reservation", "Підтвердити бронювання")}
              </button>
            </div>
          ) : (
            /* Confirmation */
            <div className="bg-[#fefce8]/10 backdrop-blur rounded-2xl p-10 text-center border border-[#f59e0b]/20">
              <span className="text-6xl block mb-4">✅</span>
              <h3 className="text-2xl font-bold mb-3">
                {t("Reservation Confirmed!", "Бронювання підтверджено!")}
              </h3>
              <p className="text-[#fefce8]/80 mb-6">
                {t(
                  `Thank you, ${resName}! We look forward to welcoming you on ${resDate} at ${resTime} for ${resGuests} guest${resGuests > 1 ? "s" : ""}.`,
                  `Дякуємо, ${resName}! Чекаємо на вас ${resDate} о ${resTime} на ${resGuests} ${resGuests === 1 ? "особу" : resGuests < 5 ? "особи" : "осіб"}.`
                )}
              </p>
              <p className="text-sm text-[#fde68a]">
                {t(
                  "A confirmation SMS will be sent to your phone.",
                  "SMS-підтвердження буде надіслано на ваш телефон."
                )}
              </p>
              <button
                onClick={() => {
                  setResConfirmed(false);
                  setResName("");
                  setResPhone("");
                  setResDate("");
                  setResTime("");
                  setResGuests(2);
                  setResOccasion(false);
                  setResOccasionType("");
                  setResRequests("");
                }}
                className="mt-6 px-6 py-2 rounded-lg border border-[#f59e0b]/40 text-sm hover:bg-[#fefce8]/10 transition-colors"
              >
                {t("Make Another Reservation", "Зробити ще одне бронювання")}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CATERING                                                    */}
      {/* ============================================================ */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#7f1d1d] mb-3">
            {t("Catering Packages", "Кейтеринг-пакети")}
          </h2>
          <p className="text-center text-[#92400e] mb-12">
            {t(
              "Bring the taste of Smachno to your event",
              "Принесіть смак Смачно на ваш захід"
            )}
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {cateringPackages.map((pkg, i) => (
              <div
                key={i}
                className={`rounded-2xl p-6 border-2 ${
                  i === 2
                    ? "border-[#d97706] bg-linear-to-br from-[#fef3c7] to-[#fffbeb] shadow-lg"
                    : "border-[#d97706]/20 bg-white/60"
                }`}
              >
                <span className="text-4xl block mb-3">{pkg.emoji}</span>
                <h3 className="text-xl font-bold text-[#7f1d1d] mb-1">
                  {isUk ? pkg.uk : pkg.en}
                </h3>
                <p className="text-sm text-[#92400e] mb-4">
                  {isUk ? pkg.personsUk : pkg.personsEn}
                </p>

                <ul className="space-y-2 mb-6">
                  {pkg.items.map((item, j) => (
                    <li
                      key={j}
                      className="text-sm text-[#78350f]/80 flex items-start gap-2"
                    >
                      <span className="text-[#d97706] mt-0.5">◆</span>
                      {isUk ? item.uk : item.en}
                    </li>
                  ))}
                </ul>

                <div className="border-t border-[#d97706]/20 pt-4">
                  <span className="text-2xl font-bold text-[#d97706]">
                    {pkg.price}
                  </span>
                  <span className="text-[#92400e] text-sm ml-1">
                    {t("UAH / person", "₴ / особа")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Embroidery divider */}
      <div
        className="h-4 w-full"
        style={{
          background:
            "repeating-linear-gradient(90deg, #fefce8 0px, #fefce8 4px, #991b1b 4px, #991b1b 8px, #d97706 8px, #d97706 12px, #991b1b 12px, #991b1b 16px)",
        }}
      />

      {/* ============================================================ */}
      {/*  GALLERY                                                     */}
      {/* ============================================================ */}
      <section className="py-20 px-4 bg-[#fffbeb]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#7f1d1d] mb-10">
            {t("From Our Kitchen", "З Нашої Кухні")}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryItems.map((item, i) => (
              <div
                key={i}
                className="aspect-square rounded-xl bg-linear-to-br from-[#d97706]/15 via-[#f59e0b]/10 to-[#7f1d1d]/10 border border-[#d97706]/20 flex flex-col items-center justify-center hover:shadow-lg transition-shadow cursor-pointer group"
              >
                <span className="text-5xl md:text-6xl group-hover:scale-110 transition-transform">
                  {item.emoji}
                </span>
                <span className="text-sm text-[#92400e] font-medium mt-3">
                  {isUk ? item.uk : item.en}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  REVIEWS                                                     */}
      {/* ============================================================ */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#7f1d1d] mb-10">
            {t("What Our Guests Say", "Що кажуть наші гості")}
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((rev, i) => (
              <div
                key={i}
                className="bg-white/70 border border-[#d97706]/20 rounded-2xl p-6"
              >
                {/* Stars */}
                <div className="text-[#f59e0b] text-lg mb-3">
                  {"★".repeat(rev.stars)}
                  {"☆".repeat(5 - rev.stars)}
                </div>

                <p className="text-[#78350f]/80 text-sm leading-relaxed mb-4 italic">
                  &ldquo;{isUk ? rev.uk : rev.en}&rdquo;
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#d97706]/20 flex items-center justify-center text-lg">
                    👤
                  </div>
                  <span className="font-semibold text-[#7f1d1d]">
                    {isUk ? rev.nameUk : rev.nameEn}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FOOTER                                                      */}
      {/* ============================================================ */}
      <footer className="bg-[#7f1d1d] text-[#fefce8]">
        {/* Embroidery border top */}
        <div
          className="h-3 w-full"
          style={{
            background:
              "repeating-linear-gradient(90deg, #d97706 0px, #d97706 6px, #f59e0b 6px, #f59e0b 12px, #d97706 12px, #d97706 18px, #991b1b 18px, #991b1b 24px)",
          }}
        />

        <div className="max-w-6xl mx-auto px-4 py-14">
          <div className="grid md:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="text-2xl font-bold mb-3">
                🍲 {isUk ? "Смачно" : "Smachno"}
              </div>
              <p className="text-[#fefce8]/60 text-sm leading-relaxed">
                {t(
                  "Traditional Ukrainian cuisine since 2010. Authentic recipes, local ingredients, warm hospitality.",
                  "Традиційна українська кухня з 2010 року. Автентичні рецепти, місцеві інгредієнти, тепле гостинність."
                )}
              </p>
            </div>

            {/* Address */}
            <div>
              <h4 className="font-bold text-[#f59e0b] mb-3 uppercase text-sm tracking-wider">
                {t("Address", "Адреса")}
              </h4>
              <p className="text-[#fefce8]/70 text-sm leading-relaxed">
                📍 {t(
                  "12 Khreshchatyk Street, Kyiv, Ukraine, 01001",
                  "вул. Хрещатик, 12, Київ, Україна, 01001"
                )}
              </p>
              <p className="text-[#fefce8]/70 text-sm mt-2">
                📞 +380 44 123 4567
              </p>
              <p className="text-[#fefce8]/70 text-sm mt-1">
                ✉️ hello@smachno.ua
              </p>
            </div>

            {/* Hours */}
            <div>
              <h4 className="font-bold text-[#f59e0b] mb-3 uppercase text-sm tracking-wider">
                {t("Working Hours", "Години роботи")}
              </h4>
              <div className="text-[#fefce8]/70 text-sm space-y-1.5">
                <p>
                  {t("Mon–Thu:", "Пн–Чт:")} 12:00 – 22:00
                </p>
                <p>
                  {t("Fri–Sat:", "Пт–Сб:")} 12:00 – 23:00
                </p>
                <p>
                  {t("Sunday:", "Неділя:")} 11:00 – 21:00
                </p>
              </div>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-bold text-[#f59e0b] mb-3 uppercase text-sm tracking-wider">
                {t("Follow Us", "Стежте за нами")}
              </h4>
              <div className="flex gap-3">
                {[
                  { icon: "📘", label: "Facebook" },
                  { icon: "📸", label: "Instagram" },
                  { icon: "🐦", label: "Twitter" },
                  { icon: "📺", label: "YouTube" },
                ].map((s, i) => (
                  <a
                    key={i}
                    href="#"
                    title={s.label}
                    className="w-10 h-10 rounded-full bg-[#991b1b] hover:bg-[#b91c1c] flex items-center justify-center text-lg transition-colors"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-[#fefce8]/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-[#fefce8]/50 text-sm">
              {t(
                "Traditional Ukrainian cuisine since 2010",
                "Традиційна українська кухня з 2010 року"
              )}
            </p>
            <p className="text-[#fefce8]/40 text-xs">
              &copy; 2010–2026 {isUk ? "Смачно" : "Smachno"}.{" "}
              {t("All rights reserved.", "Всі права захищені.")}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
