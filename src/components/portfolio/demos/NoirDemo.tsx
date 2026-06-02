"use client";

import { useState } from "react";

// ─── Data ───────────────────────────────────────────────────────────────────

const TASTING_COURSES = [
  { num: "I", nameUk: "Тартар з яловичини Wagyu", nameEn: "Wagyu Beef Tartare", descUk: "Вагю А5, трюфельне масло, жовток перепілки, мікро-зелень з власного саду", descEn: "A5 Wagyu, truffle oil, quail egg yolk, micro greens from our garden", allergens: "Яйця, гірчиця", wine: "Сancannon Blanc de Blancs 2021, Loire", wineNoteUk: "Мінеральна свіжість шампанського підкреслює жирність вагю", wineNoteEn: "Mineral freshness of the sparkling cuts through the richness of wagyu", prepUk: "М'ясо ручного рубання, маринується 20 хвилин. Подається на льоду.", prepEn: "Hand-chopped, marinated 20 minutes. Served on ice." },
  { num: "II", nameUk: "Крем-суп з білих трюфелів", nameEn: "White Truffle Velouté", descUk: "Білий трюфель Alba, вершки 36%, пармезан 36 місяців, трюфельна олія", descEn: "Alba white truffle, 36% cream, 36-month Parmesan, truffle oil", allergens: "Молочні продукти, глютен", wine: "Meursault Premier Cru 2020, Burgundy", wineNoteUk: "Burgundy Chardonnay підсилює ореховий тон трюфелю", wineNoteEn: "Burgundy Chardonnay amplifies the nutty notes of truffle", prepUk: "Варим 4 години на повільному вогні. Трюфель додається перед подачею.", prepEn: "Slow-cooked for 4 hours. Truffle added tableside." },
  { num: "III", nameUk: "Морський гребінець із пастернаком", nameEn: "Scallop & Parsnip", descUk: "Королівський гребінець Saint-Jacques, пюре з пастернаку, пінка з сидру, ікра", descEn: "Saint-Jacques royal scallop, parsnip purée, cider foam, caviar", allergens: "Молюски, риба", wine: "Pouilly-Fumé 2022, Loire", wineNoteUk: "Цитрусова свіжість Loire Sauvignon Blanc — ідеальна пара до морепродуктів", wineNoteEn: "Citrus freshness of Loire Sauvignon Blanc is the ideal seafood pairing", prepUk: "Гребінець обсмажується 90 секунд з кожного боку на вершковому маслі.", prepEn: "Scallop seared 90 seconds per side in clarified butter." },
  { num: "IV", nameUk: "Качина грудка конфі", nameEn: "Duck Confit", descUk: "Качина грудка LPQ, конфіт 12 годин, соус з вишні та портвейну, поленто", descEn: "LPQ duck breast, 12-hour confit, cherry-port sauce, polenta", allergens: "Глютен, сульфіти", wine: "Pinot Noir 2019, Burgundy", wineNoteUk: "Бургундський Pinot Noir розкриває глибину качиного жиру і вишні", wineNoteEn: "Burgundy Pinot Noir reveals the depth of duck fat and cherry", prepUk: "Маринується 24 години. Конфіт при 68°C.", prepEn: "Marinated 24 hours. Confit at 68°C." },
  { num: "V", nameUk: "Ягнятина Мілле-Фей", nameEn: "Lamb Mille-Feuille", descUk: "Рібка ягняти, хрустка тісто, руккола, помідори конфі, соус з розмарину", descEn: "Lamb rack, puff pastry crust, rocket, confit tomatoes, rosemary jus", allergens: "Глютен, молочні продукти", wine: "Château Pichon Baron 2018, Pauillac", wineNoteUk: "Потужний Bordeaux Cabernet Sauvignon гармонує зі смаженою ягнятиною", wineNoteEn: "Bold Bordeaux Cab Sauv harmonises with roasted lamb", prepUk: "Ягня вирощене на фермі Карпати. Тісто — ручна листкова пастеризація.", prepEn: "Lamb from Carpathian farm. Pastry — hand-laminated puff." },
  { num: "VI", nameUk: "Сирна тарілка", nameEn: "Cheese Selection", descUk: "5 сирів: Comté 18М, Époisses, Manchego, Saint-Marcellin, Ukrainian raw-milk. Фруктовий чатні, горіхи", descEn: "5 cheeses: Comté 18M, Époisses, Manchego, Saint-Marcellin, Ukrainian raw-milk. Fruit chutney, nuts", allergens: "Молочні продукти, горіхи", wine: "Sauternes 2017, Bordeaux", wineNoteUk: "Солодке Sauternes — класичний партнер для м'яких і блакитних сирів", wineNoteEn: "Sweet Sauternes is the classic partner for soft and blue cheeses", prepUk: "Сири витримуються до оптимальної температури 16°C.", prepEn: "Cheeses tempered to optimal 16°C." },
  { num: "VII", nameUk: "Шоколадне суфле Valrhona", nameEn: "Valrhona Chocolate Soufflé", descUk: "Темний шоколад 72%, ванільне морозиво, зів'яле листя золота, малиновий coulis", descEn: "72% dark chocolate, vanilla ice cream, gold leaf, raspberry coulis", allergens: "Яйця, молочні продукти, глютен", wine: "Vintage Port 2011, Douro", wineNoteUk: "Vitange Port підкреслює глибину темного шоколаду і малини", wineNoteEn: "Vintage Port accentuates the depth of dark chocolate and raspberry", prepUk: "Суфле готується 14 хвилин після замовлення. Не чекайте!", prepEn: "Soufflé takes 14 minutes after ordering. Don't wait!" },
];

const GALLERY_ITEMS = [
  { emoji: "🥩", titleUk: "Тартар з вагю", titleEn: "Wagyu tartare" },
  { emoji: "🍜", titleUk: "Трюфельний велюте", titleEn: "Truffle velouté" },
  { emoji: "🥂", titleUk: "Sommelier pairing", titleEn: "Sommelier pairing" },
  { emoji: "🦪", titleUk: "Гребінець Saint-Jacques", titleEn: "Saint-Jacques scallop" },
  { emoji: "🦆", titleUk: "Качине конфі", titleEn: "Duck confit" },
  { emoji: "🍮", titleUk: "Шоколадне суфле", titleEn: "Chocolate soufflé" },
  { emoji: "🍷", titleUk: "Sommelier selection", titleEn: "Wine selection" },
  { emoji: "🌿", titleUk: "Мікро-зелень зі саду", titleEn: "Garden micro greens" },
  { emoji: "🧀", titleUk: "Сирна тарілка", titleEn: "Cheese selection" },
];

const REVIEWS = [
  { nameUk: "Олена К., журналіст", nameEn: "Olena K., journalist", textUk: "Найкраще fine dining у Києві. Chef's Table — незабутній досвід, шеф готує прямо перед тобою.", textEn: "Best fine dining in Kyiv. Chef's Table — unforgettable, the chef cooks right in front of you.", mediaUk: "Їжа. Люди. Місця", mediaEn: "Food. People. Places" },
  { nameUk: "Артем В., CEO", nameEn: "Artem V., CEO", textUk: "Wine pairing — відкриття. Сомельє пояснив кожне вино так, що я закохався у Burgundy Pinot Noir.", textEn: "Wine pairing was a revelation. Sommelier explained each wine so well, I fell in love with Burgundy Pinot Noir.", mediaUk: "Kyiv Food Guide", mediaEn: "Kyiv Food Guide" },
  { nameUk: "Ірина М., архітектор", nameEn: "Iryna M., architect", textUk: "Забронювала приватний кабінет на річницю. Ідеальний вечір — від амб'янсу до останнього курсу.", textEn: "Booked the private room for anniversary. Perfect evening — from ambiance to the final course.", mediaUk: "Vogue Ukraine", mediaEn: "Vogue Ukraine" },
  { nameUk: "Михайло Л., гастрокритик", nameEn: "Mykhailo L., gastro critic", textUk: "5 із 5. Рівень, що конкурує з кращими ресторанами Парижа. Шеф — справжній художник.", textEn: "5 out of 5. A level that competes with the best Parisian restaurants. The chef is a true artist.", mediaUk: "Ресторанний Рейтинг UA", mediaEn: "Restaurant Rating UA" },
];

const ALA_CARTE = {
  startersUk: "Закуски",
  startersEn: "Starters",
  mainsUk: "Основні страви",
  mainsEn: "Main Courses",
  dessertsUk: "Десерти",
  dessertsEn: "Desserts",
  items: [
    { cat: "starters", nameUk: "Фуа-гра з бріошем", nameEn: "Foie Gras & Brioche", price: 680 },
    { cat: "starters", nameUk: "Устриці Gillardeau №2 (3 шт.)", nameEn: "Gillardeau Oysters #2 (3 pcs)", price: 490 },
    { cat: "starters", nameUk: "Burrata з трюфелем", nameEn: "Burrata & Truffle", price: 390 },
    { cat: "starters", nameUk: "Карпаччо з оленини", nameEn: "Venison Carpaccio", price: 520 },
    { cat: "mains", nameUk: "Рибайо з кісткою (400 г)", nameEn: "Bone-in Ribeye (400 g)", price: 1480 },
    { cat: "mains", nameUk: "Палтус з сальсою верде", nameEn: "Halibut with Salsa Verde", price: 890 },
    { cat: "mains", nameUk: "Ризото з трюфелем та пармезаном", nameEn: "Truffle & Parmesan Risotto", price: 720 },
    { cat: "mains", nameUk: "Телятина Міланезе", nameEn: "Veal Milanese", price: 980 },
    { cat: "desserts", nameUk: "Крем-брюле з лавандою", nameEn: "Lavender Crème Brûlée", price: 280 },
    { cat: "desserts", nameUk: "Тарт Татен з кальвадосом", nameEn: "Tarte Tatin & Calvados", price: 310 },
    { cat: "desserts", nameUk: "Cheese selection (3 сири)", nameEn: "Cheese Selection (3)", price: 420 },
    { cat: "desserts", nameUk: "Петіфур асорті", nameEn: "Petits Fours Assortment", price: 220 },
  ],
};

const TABLE_TYPES = [
  { id: "main", labelUk: "Основний зал", labelEn: "Main Hall", descUk: "Елегантна атмосфера, 2–8 осіб", descEn: "Elegant atmosphere, 2–8 guests" },
  { id: "chefs", labelUk: "Chef's Table", labelEn: "Chef's Table", descUk: "Відкрита кухня, max 6 осіб", descEn: "Open kitchen view, max 6 guests" },
  { id: "private", labelUk: "Приватний кабінет", labelEn: "Private Room", descUk: "Повна приватність, 4–12 осіб", descEn: "Full privacy, 4–12 guests" },
];

// ─── Component ───────────────────────────────────────────────────────────────

export function NoirDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [reservationOpen, setReservationOpen] = useState(false);
  const [reservationStep, setReservationStep] = useState(1);
  const [reservationData, setReservationData] = useState({
    date: "",
    time: "19:00",
    guests: 2,
    tableType: "main",
    notes: "",
    name: "",
    phone: "",
  });
  const [reservationConfirmed, setReservationConfirmed] = useState(false);
  const [activeCourse, setActiveCourse] = useState<number | null>(null);
  const [wineOnly, setWineOnly] = useState(false);
  const [menuTab, setMenuTab] = useState<"tasting" | "ala-carte">("tasting");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = {
    reserve: isUk ? "Зарезервувати стіл" : "Reserve a Table",
    tasting: isUk ? "Дегустаційне меню (7 курсів)" : "Tasting Menu (7 courses)",
    alaCarte: isUk ? "À la carte" : "À la carte",
    heroHeading: isUk ? "Вечір, який запам'ятається" : "An Evening to Remember",
    heroSub: isUk ? "Авторська кухня · 7 курсів · Sommelier pairing" : "Signature cuisine · 7 courses · Sommelier pairing",
    tastingMenu: isUk ? "Дегустаційне меню" : "Tasting Menu",
    wineToggle: isUk ? "Показати тільки вина" : "Wines only",
    sommelier: isUk ? "Sommelier & Wine Pairing" : "Sommelier & Wine Pairing",
    chef: isUk ? "Шеф-кухар" : "Executive Chef",
    gallery: isUk ? "Галерея" : "Gallery",
    reviews: isUk ? "Відгуки" : "Reviews",
    prepDetails: isUk ? "Деталі приготування" : "Preparation details",
    winePairing: isUk ? "Wine pairing" : "Wine pairing",
    pairWith: isUk ? "Пара до:" : "Paired with:",
    allergens: isUk ? "Алергени:" : "Allergens:",
    reserveBtn: isUk ? "Зарезервувати" : "Reserve",
    deposit: isUk ? "Депозит 500 ₴/особу" : "Deposit 500 ₴/person",
    hours: isUk ? "Години роботи 19:00 – 23:00" : "Hours 19:00 – 23:00",
    dress: isUk ? "Дрес-код: smart casual" : "Dress code: smart casual",
    next: isUk ? "Далі" : "Next",
    back: isUk ? "Назад" : "Back",
    confirm: isUk ? "Підтвердити" : "Confirm",
    confirmed: isUk ? "Резервацію підтверджено" : "Reservation confirmed",
    dateLabel: isUk ? "Дата" : "Date",
    timeLabel: isUk ? "Час" : "Time",
    guestsLabel: isUk ? "Гості" : "Guests",
    tableLabel: isUk ? "Тип столу" : "Table type",
    notesLabel: isUk ? "Побажання" : "Special requests",
    nameLabel: isUk ? "Ім'я" : "Name",
    phoneLabel: isUk ? "Телефон" : "Phone",
    bookingSummary: isUk ? "Деталі резервації" : "Booking summary",
    starters: isUk ? ALA_CARTE.startersUk : ALA_CARTE.startersEn,
    mains: isUk ? ALA_CARTE.mainsUk : ALA_CARTE.mainsEn,
    desserts: isUk ? ALA_CARTE.dessertsUk : ALA_CARTE.dessertsEn,
    chefQuote: isUk
      ? "«Кожна страва — це спогад, який ще не відбувся»"
      : "«Every dish is a memory yet to be made»",
    chefBio: isUk
      ? "Олександр Петренко провів 8 років у Парижі та Барселоні, навчаючись у майстрів мишленівської кухні. Після 15 років кар'єри він повернувся до Києва, щоб створити власний ресторан — місце, де українська ідентичність зустрічається з найвищими стандартами haute cuisine."
      : "Oleksandr Petrenko spent 8 years in Paris and Barcelona studying under Michelin-starred masters. After a 15-year career, he returned to Kyiv to create his own restaurant — a place where Ukrainian identity meets the highest standards of haute cuisine.",
    priceNote: isUk
      ? "3 200 ₴ / особу · з wine pairing 4 800 ₴"
      : "3 200 ₴ / person · with wine pairing 4 800 ₴",
  };

  const openReservation = () => {
    setReservationOpen(true);
    setReservationStep(1);
    setReservationConfirmed(false);
  };

  const handleConfirm = () => {
    if (reservationStep < 4) {
      setReservationStep(reservationStep + 1);
    } else {
      setReservationConfirmed(true);
    }
  };

  const selectedTable = TABLE_TYPES.find((t) => t.id === reservationData.tableType);

  return (
    <div className="relative bg-[#080808] text-stone-300 font-sans overflow-hidden">

      {/* ── Sticky Nav ── */}
      <nav className="sticky top-0 z-40 bg-[#080808] border-b border-amber-900/30">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-serif italic text-amber-400 text-2xl tracking-widest">NOIR</span>

          <ul className="hidden md:flex gap-8 text-xs uppercase tracking-widest text-stone-400">
            {[
              { href: "#menu", label: isUk ? "Меню" : "Menu" },
              { href: "#sommelier", label: "Sommelier" },
              { href: "#reservation", label: isUk ? "Резервація" : "Reservation" },
              { href: "#chef", label: isUk ? "Шеф" : "Chef" },
              { href: "#gallery", label: isUk ? "Галерея" : "Gallery" },
            ].map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-amber-400 transition-colors">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <button
              onClick={openReservation}
              className="hidden md:inline-flex items-center gap-2 border border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-black transition-colors text-xs uppercase tracking-widest px-4 py-2"
            >
              {t.reserve}
            </button>
            <button
              className="md:hidden text-stone-400 hover:text-amber-400 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              <span className="text-xl">{mobileMenuOpen ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-[#080808] border-t border-amber-900/20 px-6 py-4 flex flex-col gap-4">
            {[
              { href: "#menu", label: isUk ? "Меню" : "Menu" },
              { href: "#sommelier", label: "Sommelier" },
              { href: "#reservation", label: isUk ? "Резервація" : "Reservation" },
              { href: "#chef", label: isUk ? "Шеф" : "Chef" },
              { href: "#gallery", label: isUk ? "Галерея" : "Gallery" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs uppercase tracking-widest text-stone-400 hover:text-amber-400 transition-colors"
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={() => { setMobileMenuOpen(false); openReservation(); }}
              className="border border-amber-500 text-amber-400 text-xs uppercase tracking-widest px-4 py-2 w-full"
            >
              {t.reserve}
            </button>
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Decorative gold particles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-1 h-1 bg-amber-400 rounded-full opacity-50" style={{ top: "18%", left: "12%" }} />
          <div className="absolute w-0.5 h-0.5 bg-amber-400 rounded-full opacity-30" style={{ top: "35%", left: "28%" }} />
          <div className="absolute w-1 h-1 bg-amber-400 rounded-full opacity-40" style={{ top: "55%", left: "8%" }} />
          <div className="absolute w-0.5 h-0.5 bg-amber-400 rounded-full opacity-60" style={{ top: "72%", left: "20%" }} />
          <div className="absolute w-1 h-1 bg-amber-400 rounded-full opacity-35" style={{ top: "25%", right: "14%" }} />
          <div className="absolute w-0.5 h-0.5 bg-amber-400 rounded-full opacity-50" style={{ top: "42%", right: "30%" }} />
          <div className="absolute w-1 h-1 bg-amber-400 rounded-full opacity-45" style={{ top: "65%", right: "10%" }} />
          <div className="absolute w-0.5 h-0.5 bg-amber-400 rounded-full opacity-25" style={{ top: "80%", right: "25%" }} />
          <div className="absolute w-1 h-1 bg-amber-400 rounded-full opacity-40" style={{ top: "10%", left: "50%" }} />
          <div className="absolute w-0.5 h-0.5 bg-amber-400 rounded-full opacity-30" style={{ top: "88%", left: "55%" }} />
          <div className="absolute w-1 h-1 bg-amber-400 rounded-full opacity-20" style={{ top: "48%", left: "45%" }} />
          <div className="absolute w-0.5 h-0.5 bg-amber-400 rounded-full opacity-55" style={{ top: "62%", left: "70%" }} />
        </div>

        {/* Thin gold top line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-linear-to-br from-amber-400/60 to-transparent" />

        <p className="text-amber-400/70 tracking-[0.4em] text-xs uppercase mb-8">
          {isUk ? "Київ · з 2018" : "Kyiv · since 2018"}
        </p>

        <h1 className="font-serif text-[56px] md:text-[88px] font-normal italic text-amber-50 leading-none mb-6 max-w-3xl">
          {t.heroHeading}
        </h1>

        <p className="text-amber-400/70 tracking-[0.3em] text-xs uppercase mb-12">
          {t.heroSub}
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={openReservation}
            className="border border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-black transition-colors text-xs uppercase tracking-widest px-8 py-3"
          >
            {t.reserve}
          </button>
          <a
            href="#menu"
            className="border border-stone-700 text-stone-400 hover:border-amber-900 hover:text-stone-200 transition-colors text-xs uppercase tracking-widest px-8 py-3"
          >
            {isUk ? "Дегустаційне меню" : "Tasting Menu"}
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-xs tracking-widest text-amber-400/60 uppercase">
            {isUk ? "Гортати" : "Scroll"}
          </span>
          <div className="w-px h-10 bg-linear-to-br from-amber-400/60 to-transparent" />
        </div>
      </section>

      {/* ── Menu Section ── */}
      <section id="menu" className="bg-zinc-950 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-amber-400/60 tracking-[0.3em] text-xs uppercase text-center mb-3">
            {isUk ? "Наша кухня" : "Our kitchen"}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-amber-50 text-center mb-10">
            {isUk ? "Меню" : "Menu"}
          </h2>

          {/* Tab switcher */}
          <div className="flex border border-amber-900/40 mb-10 max-w-sm mx-auto">
            {(["tasting", "ala-carte"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setMenuTab(tab)}
                className={`flex-1 py-2.5 text-xs uppercase tracking-widest transition-colors ${
                  menuTab === tab
                    ? "bg-amber-500 text-black"
                    : "text-stone-400 hover:text-amber-400"
                }`}
              >
                {tab === "tasting" ? t.tasting : t.alaCarte}
              </button>
            ))}
          </div>

          {menuTab === "tasting" && (
            <>
              <p className="text-center text-amber-400 text-sm tracking-wider mb-10 italic font-serif">
                {t.priceNote}
              </p>
              <div className="space-y-2">
                {TASTING_COURSES.map((course, idx) => {
                  const isOpen = activeCourse === idx;
                  return (
                    <div key={idx} className="border border-amber-900/30 bg-zinc-900/50">
                      <button
                        className="w-full flex items-start gap-5 px-6 py-5 text-left group"
                        onClick={() => setActiveCourse(isOpen ? null : idx)}
                      >
                        <span className="font-serif italic text-amber-400 text-lg w-8 shrink-0 mt-0.5">
                          {course.num}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="font-serif text-amber-50 text-base group-hover:text-amber-300 transition-colors">
                            {isUk ? course.nameUk : course.nameEn}
                          </p>
                          <p className="text-stone-500 text-xs mt-1 leading-relaxed">
                            {isUk ? course.descUk : course.descEn}
                          </p>
                        </div>
                        <span className="text-amber-400/50 text-sm shrink-0 ml-2">
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>

                      {isOpen && (
                        <div className="px-6 pb-6 pt-0 border-t border-amber-900/20 grid md:grid-cols-2 gap-6">
                          <div>
                            <p className="text-xs uppercase tracking-widest text-amber-400/60 mb-2">
                              {t.prepDetails}
                            </p>
                            <p className="text-stone-300 text-sm leading-relaxed">
                              {isUk ? course.prepUk : course.prepEn}
                            </p>
                            <p className="text-stone-600 text-xs mt-3">
                              {t.allergens} {course.allergens}
                            </p>
                          </div>
                          <div className="bg-zinc-800/60 border border-amber-900/20 p-4">
                            <p className="text-xs uppercase tracking-widest text-amber-400/60 mb-2">
                              {t.winePairing}
                            </p>
                            <p className="font-serif italic text-amber-300 text-sm mb-2">
                              {course.wine}
                            </p>
                            <p className="text-stone-400 text-xs leading-relaxed">
                              {isUk ? course.wineNoteUk : course.wineNoteEn}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {menuTab === "ala-carte" && (
            <div className="space-y-10">
              {(["starters", "mains", "desserts"] as const).map((cat) => (
                <div key={cat}>
                  <h3 className="font-serif text-xl text-amber-400 border-b border-amber-900/30 pb-3 mb-5">
                    {t[cat]}
                  </h3>
                  <div className="space-y-3">
                    {ALA_CARTE.items
                      .filter((item) => item.cat === cat)
                      .map((item, i) => (
                        <div key={i} className="flex justify-between items-baseline gap-4">
                          <span className="text-stone-300 text-sm">
                            {isUk ? item.nameUk : item.nameEn}
                          </span>
                          <span className="text-amber-400 text-sm shrink-0">{item.price} ₴</span>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Sommelier Section ── */}
      <section id="sommelier" className="bg-[#080808] py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-amber-400/60 tracking-[0.3em] text-xs uppercase text-center mb-3">
            {isUk ? "Наш сомельє" : "Our sommelier"}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-amber-50 text-center mb-6">
            {t.sommelier}
          </h2>

          <div className="flex justify-center mb-10">
            <button
              onClick={() => setWineOnly(!wineOnly)}
              className={`flex items-center gap-3 border text-xs uppercase tracking-widest px-5 py-2.5 transition-colors ${
                wineOnly
                  ? "border-amber-500 bg-amber-500 text-black"
                  : "border-amber-900/50 text-stone-400 hover:border-amber-500 hover:text-amber-400"
              }`}
            >
              <span className={`w-3 h-3 rounded-full border ${wineOnly ? "bg-black border-black" : "border-amber-500"}`} />
              {t.wineToggle}
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TASTING_COURSES.map((course, idx) => (
              <div key={idx} className="bg-zinc-900 border border-amber-900/30 p-5">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-xl shrink-0">🍷</span>
                  <div>
                    <p className="font-serif italic text-amber-300 text-sm leading-snug">
                      {course.wine}
                    </p>
                  </div>
                </div>
                {!wineOnly && (
                  <>
                    <p className="text-xs text-stone-500 uppercase tracking-widest mb-2">
                      {t.pairWith} {isUk ? course.nameUk : course.nameEn}
                    </p>
                    <p className="text-stone-400 text-xs leading-relaxed">
                      {isUk ? course.wineNoteUk : course.wineNoteEn}
                    </p>
                  </>
                )}
                <div className="mt-3 pt-3 border-t border-amber-900/20">
                  <span className="text-amber-400/60 text-xs font-serif italic">
                    {isUk ? `Курс ${course.num}` : `Course ${course.num}`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reservation Section ── */}
      <section id="reservation" className="bg-zinc-900 py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-amber-400/60 tracking-[0.3em] text-xs uppercase mb-3">
            {isUk ? "Забронюйте місце" : "Book your seat"}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-amber-50 mb-2">
            {isUk ? "Зарезервувати стіл" : "Reserve a Table"}
          </h2>
          <div className="flex justify-center mb-10">
            <div className="h-px w-24 bg-amber-500/60" />
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {[
              { icon: "💳", label: t.deposit },
              { icon: "🕐", label: t.hours },
              { icon: "👔", label: t.dress },
            ].map((item, i) => (
              <div key={i} className="border border-amber-900/30 p-5">
                <span className="text-2xl block mb-2">{item.icon}</span>
                <p className="text-stone-400 text-xs leading-relaxed">{item.label}</p>
              </div>
            ))}
          </div>

          <button
            onClick={openReservation}
            className="border border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-black transition-colors text-sm uppercase tracking-widest px-10 py-4"
          >
            {t.reserveBtn}
          </button>
        </div>
      </section>

      {/* ── Chef Section ── */}
      <section id="chef" className="bg-[#080808] py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-amber-400/60 tracking-[0.3em] text-xs uppercase text-center mb-3">
            {t.chef}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-amber-50 text-center mb-12">
            {isUk ? "Шеф Олександр Петренко" : "Chef Oleksandr Petrenko"}
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center">
              <div className="text-[80px] mb-4">👨‍🍳</div>
              <blockquote className="font-serif italic text-amber-200 text-xl md:text-2xl leading-relaxed">
                {t.chefQuote}
              </blockquote>
            </div>
            <div>
              <p className="text-stone-300 text-sm leading-relaxed mb-8">
                {t.chefBio}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "🏆", label: isUk ? "Найкращий ресторан України 2023" : "Best Restaurant Ukraine 2023" },
                  { icon: "⭐", label: isUk ? "Рейтинг #1 Fine Dining Kyiv" : "Rating #1 Fine Dining Kyiv" },
                  { icon: "🌍", label: isUk ? "Top 50 Eastern Europe 2024" : "Top 50 Eastern Europe 2024" },
                  { icon: "🎖", label: isUk ? "San Pellegrino Emerging Chef" : "San Pellegrino Emerging Chef" },
                ].map((award, i) => (
                  <div key={i} className="border border-amber-900/30 p-4">
                    <span className="text-lg block mb-1">{award.icon}</span>
                    <p className="text-stone-400 text-xs leading-snug">{award.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Gallery Section ── */}
      <section id="gallery" className="bg-zinc-950 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-amber-400/60 tracking-[0.3em] text-xs uppercase text-center mb-3">
            {isUk ? "Наші страви" : "Our dishes"}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-amber-50 text-center mb-12">
            {t.gallery}
          </h2>

          <div className="grid grid-cols-3 gap-3">
            {GALLERY_ITEMS.map((item, i) => (
              <div
                key={i}
                className="relative aspect-square bg-zinc-900 border border-amber-900/20 flex items-center justify-center group cursor-pointer overflow-hidden"
              >
                <span className="text-4xl transition-transform group-hover:scale-110 duration-300">
                  {item.emoji}
                </span>
                <div className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/10 transition-colors duration-300 flex items-end p-3">
                  <p className="text-amber-200 text-xs font-serif italic opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {isUk ? item.titleUk : item.titleEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews Section ── */}
      <section className="bg-[#080808] py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-amber-400/60 tracking-[0.3em] text-xs uppercase text-center mb-3">
            {isUk ? "Що кажуть гості" : "What guests say"}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-amber-50 text-center mb-12">
            {t.reviews}
          </h2>

          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            {REVIEWS.map((rev, i) => (
              <div key={i} className="border border-amber-900/30 p-6 bg-zinc-900/30">
                <span className="font-serif text-5xl text-amber-400/30 leading-none block mb-3">"</span>
                <p className="font-serif italic text-stone-300 text-sm leading-relaxed mb-5">
                  {isUk ? rev.textUk : rev.textEn}
                </p>
                <div className="border-t border-amber-900/20 pt-4">
                  <p className="text-amber-400 text-xs tracking-wide">
                    {isUk ? rev.nameUk : rev.nameEn}
                  </p>
                  <p className="text-stone-600 text-xs italic">
                    {isUk ? rev.mediaUk : rev.mediaEn}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-amber-400/60 text-sm tracking-wider font-serif italic">
            5.0 ★ · {isUk ? "94 відгуки · Рейтинг #1 Fine Dining Kyiv 2025" : "94 reviews · Rating #1 Fine Dining Kyiv 2025"}
          </p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-zinc-950 border-t border-amber-900/20 py-12 px-6">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-10 mb-10">
          <div>
            <span className="font-serif italic text-amber-400 text-2xl tracking-widest block mb-3">
              NOIR
            </span>
            <p className="text-stone-500 text-xs leading-relaxed">
              {isUk
                ? "Найвишуканіший досвід fine dining у Києві. Авторська кухня, sommelier pairing, незабутній вечір."
                : "Kyiv's most refined fine dining experience. Signature cuisine, sommelier pairing, unforgettable evenings."}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-amber-400/60 mb-4">
              {isUk ? "Навігація" : "Navigation"}
            </p>
            <ul className="space-y-2 text-xs text-stone-500">
              {[
                { href: "#menu", label: isUk ? "Меню" : "Menu" },
                { href: "#sommelier", label: "Sommelier" },
                { href: "#reservation", label: isUk ? "Резервація" : "Reservation" },
                { href: "#chef", label: isUk ? "Шеф" : "Chef" },
                { href: "#gallery", label: isUk ? "Галерея" : "Gallery" },
              ].map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="hover:text-amber-400 transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-amber-400/60 mb-4">
              {isUk ? "Контакти" : "Contacts"}
            </p>
            <ul className="space-y-2 text-xs text-stone-500">
              <li>{isUk ? "вул. Хрещатик 12, Київ" : "12 Khreshchatyk St, Kyiv"}</li>
              <li>+380 44 000 00 00</li>
              <li>{isUk ? "Пн–Нд: 19:00 – 23:00" : "Mon–Sun: 19:00 – 23:00"}</li>
              <li>
                <a href="mailto:reserve@noir.ua" className="hover:text-amber-400 transition-colors">
                  reserve@noir.ua
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-amber-900/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-stone-700 text-xs">© 2025 NOIR. {isUk ? "Всі права захищені." : "All rights reserved."}</p>
          <p className="text-stone-700 text-xs">
            {isUk ? "Розроблено" : "Developed by"}{" "}
            <span className="text-amber-900">Codeworth</span>
          </p>
        </div>
      </footer>

      {/* ── Reservation Modal ── */}
      {reservationOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
          onClick={(e) => { if (e.target === e.currentTarget) setReservationOpen(false); }}
        >
          <div className="bg-zinc-900 border border-amber-900/30 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-amber-900/20">
              <span className="font-serif italic text-amber-400 tracking-widest">NOIR</span>
              <div className="flex items-center gap-4">
                {!reservationConfirmed && (
                  <span className="text-stone-600 text-xs">
                    {isUk ? `Крок ${reservationStep} / 4` : `Step ${reservationStep} / 4`}
                  </span>
                )}
                <button
                  onClick={() => setReservationOpen(false)}
                  className="text-stone-500 hover:text-amber-400 transition-colors text-lg"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="px-6 py-6">
              {reservationConfirmed ? (
                <div className="text-center py-6">
                  <div className="text-4xl mb-4">✓</div>
                  <h3 className="font-serif text-xl text-amber-50 mb-2">{t.confirmed}</h3>
                  <p className="text-stone-400 text-sm mb-6">
                    {isUk
                      ? "Ми надішлемо підтвердження на ваш телефон."
                      : "We will send confirmation to your phone."}
                  </p>
                  <div className="border border-amber-900/30 p-5 text-left space-y-2 mb-6">
                    <p className="text-xs uppercase tracking-widest text-amber-400/60 mb-3">{t.bookingSummary}</p>
                    <p className="text-stone-300 text-sm">{t.dateLabel}: <span className="text-amber-300">{reservationData.date}</span></p>
                    <p className="text-stone-300 text-sm">{t.timeLabel}: <span className="text-amber-300">{reservationData.time}</span></p>
                    <p className="text-stone-300 text-sm">{t.guestsLabel}: <span className="text-amber-300">{reservationData.guests}</span></p>
                    <p className="text-stone-300 text-sm">
                      {t.tableLabel}: <span className="text-amber-300">
                        {isUk ? selectedTable?.labelUk : selectedTable?.labelEn}
                      </span>
                    </p>
                    {reservationData.name && (
                      <p className="text-stone-300 text-sm">{t.nameLabel}: <span className="text-amber-300">{reservationData.name}</span></p>
                    )}
                  </div>
                  <button
                    onClick={() => setReservationOpen(false)}
                    className="border border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-black transition-colors text-xs uppercase tracking-widest px-8 py-3"
                  >
                    {isUk ? "Закрити" : "Close"}
                  </button>
                </div>
              ) : (
                <>
                  {/* Step progress */}
                  <div className="flex gap-1 mb-6">
                    {[1, 2, 3, 4].map((s) => (
                      <div
                        key={s}
                        className={`flex-1 h-0.5 transition-colors ${s <= reservationStep ? "bg-amber-500" : "bg-zinc-700"}`}
                      />
                    ))}
                  </div>

                  {/* Step 1: Date / Time / Guests */}
                  {reservationStep === 1 && (
                    <div className="space-y-5">
                      <h3 className="font-serif text-lg text-amber-50 mb-1">
                        {isUk ? "Оберіть дату та час" : "Choose date & time"}
                      </h3>
                      <div>
                        <label className="text-xs uppercase tracking-widest text-amber-400/60 block mb-2">{t.dateLabel}</label>
                        <input
                          type="text"
                          placeholder="DD.MM.YYYY"
                          value={reservationData.date}
                          onChange={(e) => setReservationData({ ...reservationData, date: e.target.value })}
                          className="w-full bg-zinc-800 border border-amber-900/40 text-stone-200 text-sm px-4 py-3 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs uppercase tracking-widest text-amber-400/60 block mb-2">{t.timeLabel}</label>
                        <select
                          value={reservationData.time}
                          onChange={(e) => setReservationData({ ...reservationData, time: e.target.value })}
                          className="w-full bg-zinc-800 border border-amber-900/40 text-stone-200 text-sm px-4 py-3 focus:outline-none focus:border-amber-500"
                        >
                          {["19:00", "19:30", "20:00", "20:30", "21:00"].map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs uppercase tracking-widest text-amber-400/60 block mb-2">{t.guestsLabel}</label>
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => setReservationData({ ...reservationData, guests: Math.max(2, reservationData.guests - 1) })}
                            className="w-9 h-9 border border-amber-900/40 text-amber-400 hover:bg-amber-500/10 transition-colors"
                          >
                            −
                          </button>
                          <span className="font-serif text-amber-50 text-lg w-8 text-center">{reservationData.guests}</span>
                          <button
                            onClick={() => setReservationData({ ...reservationData, guests: Math.min(10, reservationData.guests + 1) })}
                            className="w-9 h-9 border border-amber-900/40 text-amber-400 hover:bg-amber-500/10 transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Table type */}
                  {reservationStep === 2 && (
                    <div className="space-y-4">
                      <h3 className="font-serif text-lg text-amber-50 mb-1">{t.tableLabel}</h3>
                      {TABLE_TYPES.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => setReservationData({ ...reservationData, tableType: type.id })}
                          className={`w-full border p-4 text-left transition-colors ${
                            reservationData.tableType === type.id
                              ? "border-amber-500 bg-amber-500/10"
                              : "border-amber-900/30 hover:border-amber-700"
                          }`}
                        >
                          <p className="font-serif text-amber-50 text-sm mb-1">
                            {isUk ? type.labelUk : type.labelEn}
                          </p>
                          <p className="text-stone-500 text-xs">
                            {isUk ? type.descUk : type.descEn}
                          </p>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Step 3: Notes */}
                  {reservationStep === 3 && (
                    <div>
                      <h3 className="font-serif text-lg text-amber-50 mb-4">{t.notesLabel}</h3>
                      <textarea
                        rows={5}
                        placeholder={isUk ? "Алергії, святкування, особливі побажання..." : "Allergies, celebrations, special requests..."}
                        value={reservationData.notes}
                        onChange={(e) => setReservationData({ ...reservationData, notes: e.target.value })}
                        className="w-full bg-zinc-800 border border-amber-900/40 text-stone-200 text-sm px-4 py-3 focus:outline-none focus:border-amber-500 resize-none"
                      />
                    </div>
                  )}

                  {/* Step 4: Name + phone + summary */}
                  {reservationStep === 4 && (
                    <div className="space-y-5">
                      <h3 className="font-serif text-lg text-amber-50 mb-1">
                        {isUk ? "Контактна інформація" : "Contact information"}
                      </h3>
                      <div>
                        <label className="text-xs uppercase tracking-widest text-amber-400/60 block mb-2">{t.nameLabel}</label>
                        <input
                          type="text"
                          value={reservationData.name}
                          onChange={(e) => setReservationData({ ...reservationData, name: e.target.value })}
                          className="w-full bg-zinc-800 border border-amber-900/40 text-stone-200 text-sm px-4 py-3 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs uppercase tracking-widest text-amber-400/60 block mb-2">{t.phoneLabel}</label>
                        <input
                          type="tel"
                          value={reservationData.phone}
                          onChange={(e) => setReservationData({ ...reservationData, phone: e.target.value })}
                          className="w-full bg-zinc-800 border border-amber-900/40 text-stone-200 text-sm px-4 py-3 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                      <div className="border border-amber-900/20 p-4 space-y-2 bg-zinc-800/40">
                        <p className="text-xs uppercase tracking-widest text-amber-400/60 mb-3">{t.bookingSummary}</p>
                        <p className="text-stone-400 text-xs">{t.dateLabel}: <span className="text-stone-200">{reservationData.date}</span></p>
                        <p className="text-stone-400 text-xs">{t.timeLabel}: <span className="text-stone-200">{reservationData.time}</span></p>
                        <p className="text-stone-400 text-xs">{t.guestsLabel}: <span className="text-stone-200">{reservationData.guests}</span></p>
                        <p className="text-stone-400 text-xs">
                          {t.tableLabel}: <span className="text-stone-200">
                            {isUk ? selectedTable?.labelUk : selectedTable?.labelEn}
                          </span>
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Modal footer actions */}
                  <div className="flex gap-3 mt-8">
                    {reservationStep > 1 && (
                      <button
                        onClick={() => setReservationStep(reservationStep - 1)}
                        className="border border-stone-700 text-stone-400 hover:border-amber-900 transition-colors text-xs uppercase tracking-widest px-5 py-3"
                      >
                        {t.back}
                      </button>
                    )}
                    <button
                      onClick={handleConfirm}
                      className="flex-1 bg-amber-500 text-black hover:bg-amber-400 transition-colors text-xs uppercase tracking-widest py-3 font-medium"
                    >
                      {reservationStep === 4 ? t.confirm : t.next}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
