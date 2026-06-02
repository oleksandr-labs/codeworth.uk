"use client";

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type MenuTab = "espresso" | "filter" | "signature" | "seasonal";
type EventType = "corporate" | "wedding" | "festival" | "conference" | "cityday";

interface EventFormData {
  type: EventType | "";
  date: string;
  guests: string;
  location: string;
  notes: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const SCHEDULE = [
  { dayEn: "Mon", dayUk: "Пн", locationEn: "TechHub Kyiv, Velyka Vasylkivska 100", locationUk: "ТехХаб Київ, Велика Васильківська 100", time: "08:00–11:00", status: "upcoming" },
  { dayEn: "Tue", dayUk: "Вт", locationEn: "Olimpiyska Metro, Exit B", locationUk: "Метро Олімпійська, Вихід Б", time: "07:30–10:30", status: "upcoming" },
  { dayEn: "Wed", dayUk: "Ср", locationEn: "Podil Market Square", locationUk: "Подільська ринкова площа", time: "08:00–13:00", status: "today" },
  { dayEn: "Thu", dayUk: "Чт", locationEn: "UNIT.City Campus Gate", locationUk: "Ворота кампусу UNIT.City", time: "08:30–11:30", status: "upcoming" },
  { dayEn: "Fri", dayUk: "Пт", locationEn: "Bessarabska Square", locationUk: "Бессарабська площа", time: "07:00–12:00", status: "upcoming" },
  { dayEn: "Sat", dayUk: "Сб", locationEn: "Art Arsenal Park Entrance", locationUk: "Вхід до парку Мистецький Арсенал", time: "09:00–15:00", status: "upcoming" },
  { dayEn: "Sun", dayUk: "Нд", locationEn: "Hydropark Beach North", locationUk: "Гідропарк, Північний Пляж", time: "10:00–16:00", status: "upcoming" },
];

const TICKER_LOCATIONS = [
  { en: "NOW: Podil Market — Pour Over ☕", uk: "ЗАРАЗ: Подільська площа — Пуровер ☕" },
  { en: "NEXT: 14:00 Bessarabska — Cold Brew 🧊", uk: "ДАЛІ: 14:00 Бессарабська — Колд Брю 🧊" },
  { en: "TODAY: 6 stops across Kyiv", uk: "СЬОГОДНІ: 6 зупинок по Києву" },
];

const MENU: Record<MenuTab, { nameEn: string; nameUk: string; descEn: string; descUk: string; price: number }[]> = {
  espresso: [
    { nameEn: "Espresso", nameUk: "Еспресо", descEn: "Double shot, rich and bold", descUk: "Подвійний шот, насичений і сміливий", price: 50 },
    { nameEn: "Americano", nameUk: "Американо", descEn: "Espresso with hot water, clean finish", descUk: "Еспресо з гарячою водою, чисте завершення", price: 60 },
    { nameEn: "Flat White", nameUk: "Флет Вайт", descEn: "Ristretto with silky oat microfoam", descUk: "Рістретто з шовковою вівсяною мікропіною", price: 75 },
    { nameEn: "Latte", nameUk: "Лате", descEn: "Smooth espresso with steamed milk", descUk: "М'який еспресо з паровим молоком", price: 80 },
    { nameEn: "Cappuccino", nameUk: "Капучино", descEn: "Classic thirds: espresso, milk, foam", descUk: "Класичні третини: еспресо, молоко, піна", price: 75 },
    { nameEn: "Cold Brew", nameUk: "Колд Брю", descEn: "18-hour cold-extracted, served over ice", descUk: "18-годинна холодна екстракція, подається з льодом", price: 90 },
  ],
  filter: [
    { nameEn: "Pour Over", nameUk: "Пуровер", descEn: "V60, Ethiopia Yirgacheffe, bright and floral", descUk: "V60, Ефіопія Єргачеф, яскравий і квітковий", price: 85 },
    { nameEn: "Chemex", nameUk: "Кемекс", descEn: "Guatemala Huehuetenango, clean and sweet", descUk: "Гватемала Уеуетенанго, чистий і солодкий", price: 95 },
    { nameEn: "AeroPress", nameUk: "AeroPress", descEn: "Colombia El Paraíso, full body, cherry notes", descUk: "Колумбія Ель Параісо, повне тіло, вишня", price: 80 },
  ],
  signature: [
    { nameEn: "Honey Cinnamon Latte", nameUk: "Лате з медом і корицею", descEn: "Espresso, steamed milk, wildflower honey, cinnamon", descUk: "Еспресо, парне молоко, польовий мед, кориця", price: 95 },
    { nameEn: "Salted Caramel Cold Brew", nameUk: "Колд Брю з солоною карамеллю", descEn: "Cold brew over ice, house salted caramel, cream", descUk: "Колд брю з льодом, домашня солона карамель, вершки", price: 100 },
    { nameEn: "Lavender Oat Latte", nameUk: "Лавандовий вівсяний лате", descEn: "Espresso, oat milk, lavender syrup, edible flowers", descUk: "Еспресо, вівсяне молоко, лавандовий сироп, їстівні квіти", price: 95 },
  ],
  seasonal: [
    { nameEn: "Pumpkin Spice", nameUk: "Гарбузовий Спайс", descEn: "Espresso, pumpkin cream, warm spice blend", descUk: "Еспресо, гарбузовий крем, суміш теплих спецій", price: 90 },
    { nameEn: "Mint Cocoa", nameUk: "М'ятне Какао", descEn: "Rich dark cocoa, peppermint, oat milk foam", descUk: "Насичене темне какао, перцева м'ята, вівсяна піна", price: 85 },
  ],
};

const MENU_TABS: { key: MenuTab; en: string; uk: string }[] = [
  { key: "espresso", en: "Espresso Drinks", uk: "Напої Еспресо" },
  { key: "filter", en: "Filter Coffee", uk: "Фільтрова Кава" },
  { key: "signature", en: "Signature", uk: "Авторські" },
  { key: "seasonal", en: "Seasonal", uk: "Сезонні" },
];

const EVENT_TYPES: { key: EventType; en: string; uk: string; icon: string; descEn: string; descUk: string }[] = [
  { key: "corporate", en: "Corporate", uk: "Корпоратив", icon: "🏢", descEn: "Office parties & team days", descUk: "Офісні свята та тімбілдинги" },
  { key: "wedding", en: "Wedding", uk: "Весілля", icon: "💍", descEn: "Brunch, cocktail & receptions", descUk: "Бранч, коктейлі та прийоми" },
  { key: "festival", en: "Festival", uk: "Фестиваль", icon: "🎪", descEn: "Multi-day outdoor events", descUk: "Багатоденні події просто неба" },
  { key: "conference", en: "Conference", uk: "Конференція", icon: "🎤", descEn: "Coffee breaks & networking zones", descUk: "Кавові перерви та нетворкінг" },
  { key: "cityday", en: "City Day", uk: "День міста", icon: "🎉", descEn: "Public celebrations & street fairs", descUk: "Публічні свята та вуличні ярмарки" },
];

const PACKAGES = [
  {
    keyEn: "2 Hours",
    keyUk: "2 Години",
    priceEn: "from ₴3,500",
    priceUk: "від ₴3 500",
    includesEn: ["1 professional barista", "Espresso machine + grinder", "Up to 200 drinks", "All cups & consumables"],
    includesUk: ["1 професійний баристa", "Кавова машина + кавомолка", "До 200 напоїв", "Всі стаканчики та витратники"],
  },
  {
    keyEn: "4 Hours",
    keyUk: "4 Години",
    priceEn: "from ₴6,500",
    priceUk: "від ₴6 500",
    includesEn: ["2 professional baristas", "Full espresso setup", "Up to 200 drinks + refills", "Branded cup sleeves"],
    includesUk: ["2 професійних баристи", "Повне еспресо-обладнання", "До 200 напоїв + поповнення", "Брендовані манжети для стаканчиків"],
  },
  {
    keyEn: "Full Day",
    keyUk: "Весь День",
    priceEn: "from ₴11,000",
    priceUk: "від ₴11 000",
    includesEn: ["3 baristas in rotation", "Truck + full setup", "Unlimited drinks", "Custom menu + branding"],
    includesUk: ["3 баристи по черзі", "Вантажівка + повне налаштування", "Необмежена кількість напоїв", "Авторське меню + брендинг"],
  },
];

const GALLERY = [
  { bgFrom: "#FDE047", bgTo: "#F59E0B", locationEn: "TechHub Summit 2024", locationUk: "TechHub Саміт 2024", coffeeEn: "Pour Over Bar", coffeeUk: "Бар Пуровер" },
  { bgFrom: "#111111", bgTo: "#374151", locationEn: "Spring Wedding · Kyiv", locationUk: "Весняне весілля · Київ", coffeeEn: "Lavender Latte Station", coffeeUk: "Станція Лавандового Лате" },
  { bgFrom: "#064E3B", bgTo: "#059669", locationEn: "Art Arsenal Festival", locationUk: "Фестиваль Мистецький Арсенал", coffeeEn: "Cold Brew Tower", coffeeUk: "Вежа Колд Брю" },
  { bgFrom: "#7C3AED", bgTo: "#A855F7", locationEn: "DevConf Ukraine 2024", locationUk: "DevConf Україна 2024", coffeeEn: "Espresso Networking Bar", coffeeUk: "Нетворкінг-бар Еспресо" },
  { bgFrom: "#B45309", bgTo: "#D97706", locationEn: "Kyiv City Day 2024", locationUk: "День міста Київ 2024", coffeeEn: "Street Espresso", coffeeUk: "Вуличний Еспресо" },
  { bgFrom: "#BE123C", bgTo: "#E11D48", locationEn: "Winter Market · Podil", locationUk: "Зимовий ярмарок · Поділ", coffeeEn: "Seasonal Spice Menu", coffeeUk: "Сезонне Спайс-Меню" },
];

const TEAM = [
  { nameEn: "Mykola Kovalenko", nameUk: "Микола Коваленко", roleEn: "Head Barista & Founder", roleUk: "Головний баристa і засновник", bioEn: "SCA-certified. 8 years crafting specialty coffee across Kyiv's best cafés before taking it to the streets.", bioUk: "Сертифікований SCA. 8 років готує спешелті-каву в найкращих кав'ярнях Києва, перш ніж вийти на вулиці." },
  { nameEn: "Daryna Shevchuk", nameUk: "Дарина Шевчук", roleEn: "Events & B2B Lead", roleUk: "Керівник подій і B2B", bioEn: "Event logistics pro who ensures every pop-up runs smooth, on time, and on-brand.", bioUk: "Профі з організації подій, яка гарантує, що кожен поп-ап проходить чітко, вчасно та в стилі бренду." },
  { nameEn: "Ivan Bondarenko", nameUk: "Іван Бондаренко", roleEn: "Roast & Origins Specialist", roleUk: "Спеціаліст з обжарювання та походження", bioEn: "Direct-trade relationships with 6 farms in Ethiopia, Colombia and Guatemala. Tastes every lot.", bioUk: "Прямі торговельні відносини з 6 фермами в Ефіопії, Колумбії та Гватемалі. Куштує кожну партію." },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function EspressoBarDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [activeTab, setActiveTab] = useState<MenuTab>("espresso");
  const [activeDay, setActiveDay] = useState<number>(2); // Wednesday = today
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [eventFormData, setEventFormData] = useState<EventFormData>({
    type: "",
    date: "",
    guests: "",
    location: "",
    notes: "",
  });

  const [tickerIdx] = useState(0);

  function handleFormChange(field: keyof EventFormData, value: string) {
    setEventFormData((prev) => ({ ...prev, [field]: value }));
  }

  function handleBookingSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBookingSubmitted(true);
  }

  const todayEntry = SCHEDULE[activeDay];

  // ─── Hero ──────────────────────────────────────────────────────────────────

  return (
    <div className="font-sans bg-[#111111] text-white min-h-screen overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative bg-[#FDE047] text-[#111111] overflow-hidden">
        {/* Street-art diagonal accent */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg, #111 0px, #111 2px, transparent 2px, transparent 24px)",
          }}
        />

        <div className="relative max-w-5xl mx-auto px-4 pt-16 pb-12">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-[#111111] text-[#FDE047] text-xs font-bold uppercase tracking-widest px-4 py-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#FDE047] animate-pulse shrink-0" />
            {isUk ? "Мобільна кав'ярня · Київ" : "Mobile Coffee Truck · Kyiv"}
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-7xl font-black uppercase leading-none tracking-tighter mb-4">
            {isUk ? (
              <>
                Кава,<br />
                <span className="text-[#111111] bg-[#111111] text-[#FDE047] px-2">що знаходить</span><br />
                тебе
              </>
            ) : (
              <>
                Coffee<br />
                <span className="bg-[#111111] text-[#FDE047] px-2">That Finds</span><br />
                You
              </>
            )}
          </h1>

          {/* Sub */}
          <p className="text-lg sm:text-xl font-medium max-w-xl mt-6 mb-8 leading-relaxed">
            {isUk
              ? "Спешелті-кава прямо до вашого офісу, на фестиваль або корпоратив. Ми приїжджаємо — ви насолоджуєтесь."
              : "Specialty coffee delivered to your office, festival or corporate event. We drive up — you enjoy."}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mb-10">
            <button className="bg-[#111111] text-[#FDE047] font-black uppercase tracking-wide px-6 py-3 text-sm hover:bg-[#222] transition-colors">
              {isUk ? "Де ми зараз?" : "Where Are We Now?"}
            </button>
            <button className="bg-transparent border-2 border-[#111111] text-[#111111] font-black uppercase tracking-wide px-6 py-3 text-sm hover:bg-[#111111] hover:text-[#FDE047] transition-colors">
              {isUk ? "Забронювати для події" : "Book Us for Event"}
            </button>
          </div>

          {/* Live ticker */}
          <div className="bg-[#111111] text-[#FDE047] px-4 py-3 flex items-center gap-3 text-sm font-bold max-w-lg">
            <span className="w-2 h-2 rounded-full bg-[#FDE047] animate-pulse shrink-0" />
            <span className="truncate">
              {isUk ? TICKER_LOCATIONS[tickerIdx].uk : TICKER_LOCATIONS[tickerIdx].en}
            </span>
          </div>
        </div>

        {/* Bottom jagged edge */}
        <div className="w-full h-8 bg-[#111111]" style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 100%)" }} />
      </section>

      {/* ── WHERE WE ARE TODAY ── */}
      <section className="bg-[#111111] py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[#FDE047] text-xs font-bold uppercase tracking-widest">
                {isUk ? "Розклад" : "Schedule"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase mt-1">
                {isUk ? "Де ми сьогодні" : "Where We Are Today"}
              </h2>
            </div>
            <div className="text-sm text-gray-400 dark:text-neutral-500 max-w-xs text-right">
              {isUk
                ? "Підпишіться на Telegram або email, щоб отримувати розклад щотижня"
                : "Subscribe via Telegram or email to get the weekly schedule"}
            </div>
          </div>

          {/* Day tabs */}
          <div className="flex gap-1 flex-wrap mb-6">
            {SCHEDULE.map((day, idx) => (
              <button
                key={idx}
                onClick={() => setActiveDay(idx)}
                className={[
                  "px-4 py-2 text-sm font-bold uppercase tracking-wide transition-colors",
                  activeDay === idx
                    ? "bg-[#FDE047] text-[#111111]"
                    : day.status === "today"
                    ? "bg-[#222] text-[#FDE047] border border-[#FDE047]"
                    : "bg-[#1A1A1A] text-gray-400 dark:text-neutral-500 hover:bg-[#222] hover:text-white",
                ].join(" ")}
              >
                {isUk ? day.dayUk : day.dayEn}
                {day.status === "today" && (
                  <span className="ml-1 text-[9px] align-super">{isUk ? "●" : "●"}</span>
                )}
              </button>
            ))}
          </div>

          {/* Selected day detail */}
          <div className="bg-[#1A1A1A] border-l-4 border-[#FDE047] p-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
              <div>
                <div className="text-[#FDE047] text-xs font-bold uppercase tracking-widest mb-1">
                  {todayEntry.status === "today"
                    ? isUk ? "Сьогодні" : "Today"
                    : isUk ? "Заплановано" : "Upcoming"}
                </div>
                <div className="text-xl font-bold">
                  {isUk ? todayEntry.locationUk : todayEntry.locationEn}
                </div>
                <div className="text-gray-400 dark:text-neutral-500 mt-1">{todayEntry.time}</div>
              </div>
              {todayEntry.status === "today" && (
                <div className="flex items-center gap-2 bg-[#FDE047] text-[#111111] px-4 py-2 font-bold text-sm shrink-0">
                  <span className="w-2 h-2 rounded-full bg-[#111111] animate-pulse shrink-0" />
                  {isUk ? "Активно зараз" : "Active Now"}
                </div>
              )}
            </div>
          </div>

          {/* Weekly table */}
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#333]">
                  <th className="text-left py-2 pr-4 text-[#FDE047] font-bold uppercase tracking-wide text-xs">
                    {isUk ? "День" : "Day"}
                  </th>
                  <th className="text-left py-2 pr-4 text-[#FDE047] font-bold uppercase tracking-wide text-xs">
                    {isUk ? "Локація" : "Location"}
                  </th>
                  <th className="text-left py-2 pr-4 text-[#FDE047] font-bold uppercase tracking-wide text-xs">
                    {isUk ? "Час" : "Time"}
                  </th>
                  <th className="text-left py-2 text-[#FDE047] font-bold uppercase tracking-wide text-xs">
                    {isUk ? "Статус" : "Status"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {SCHEDULE.map((day, idx) => (
                  <tr
                    key={idx}
                    className={[
                      "border-b border-[#1E1E1E] cursor-pointer transition-colors",
                      activeDay === idx ? "bg-[#1E1E1E]" : "hover:bg-[#161616]",
                    ].join(" ")}
                    onClick={() => setActiveDay(idx)}
                  >
                    <td className="py-3 pr-4 font-bold text-white">
                      {isUk ? day.dayUk : day.dayEn}
                    </td>
                    <td className="py-3 pr-4 text-gray-300 text-xs">
                      {isUk ? day.locationUk : day.locationEn}
                    </td>
                    <td className="py-3 pr-4 text-gray-400">{day.time}</td>
                    <td className="py-3">
                      {day.status === "today" ? (
                        <span className="bg-[#FDE047] text-[#111111] text-xs font-bold px-2 py-0.5 uppercase">
                          {isUk ? "Сьогодні" : "Today"}
                        </span>
                      ) : (
                        <span className="text-gray-500 dark:text-neutral-400 text-xs uppercase">
                          {isUk ? "Заплановано" : "Upcoming"}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Office CTA */}
          <div className="mt-8 bg-[#FDE047] text-[#111111] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="font-black text-lg uppercase">
                {isUk ? "Ми приїдемо до вашого офісу" : "Ask Us to Come to Your Office"}
              </div>
              <div className="text-sm mt-1">
                {isUk
                  ? "Мінімальне замовлення 50 порцій. Без доставки у межах Києва."
                  : "Minimum 50 drinks. Free delivery within Kyiv."}
              </div>
            </div>
            <button className="bg-[#111111] text-[#FDE047] font-black uppercase tracking-wide px-6 py-3 text-sm hover:bg-[#222] transition-colors shrink-0">
              {isUk ? "Написати нам" : "Get in Touch"}
            </button>
          </div>
        </div>
      </section>

      {/* ── MENU ── */}
      <section className="bg-[#0D0D0D] py-16">
        <div className="max-w-5xl mx-auto px-4">
          <span className="text-[#FDE047] text-xs font-bold uppercase tracking-widest">
            {isUk ? "Що варимо" : "What We Brew"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase mt-1 mb-8">
            {isUk ? "Меню" : "Menu"}
          </h2>

          {/* Tabs */}
          <div className="flex gap-1 flex-wrap mb-8">
            {MENU_TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={[
                  "px-5 py-2 text-sm font-bold uppercase tracking-wide transition-colors",
                  activeTab === tab.key
                    ? "bg-[#FDE047] text-[#111111]"
                    : "bg-[#1A1A1A] text-gray-400 dark:text-neutral-500 hover:text-white hover:bg-[#222]",
                ].join(" ")}
              >
                {isUk ? tab.uk : tab.en}
              </button>
            ))}
          </div>

          {/* Items grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {MENU[activeTab].map((item, idx) => (
              <div
                key={idx}
                className="bg-[#1A1A1A] border border-[#2A2A2A] p-5 flex justify-between items-start gap-4 hover:border-[#FDE047] transition-colors"
              >
                <div className="flex-1">
                  <div className="font-bold text-white text-base">
                    {isUk ? item.nameUk : item.nameEn}
                  </div>
                  <div className="text-gray-400 dark:text-neutral-500 text-sm mt-1">
                    {isUk ? item.descUk : item.descEn}
                  </div>
                </div>
                <div className="text-[#FDE047] font-black text-lg shrink-0">₴{item.price}</div>
              </div>
            ))}
          </div>

          {/* Plant milk note */}
          <div className="mt-6 flex items-center gap-3 text-sm text-gray-400">
            <span className="text-[#FDE047] font-bold shrink-0">✓</span>
            {isUk
              ? "Рослинне молоко (вівсяне, мигдальне, кокосове) — за стандартом, без доплати"
              : "Plant milk (oat, almond, coconut) available as standard — no extra charge"}
          </div>
        </div>
      </section>

      {/* ── POP-UP FOR EVENTS (B2B) ── */}
      <section className="bg-[#111111] py-16">
        <div className="max-w-5xl mx-auto px-4">
          <span className="text-[#FDE047] text-xs font-bold uppercase tracking-widest">
            {isUk ? "Для бізнесу" : "For Business"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase mt-1 mb-2">
            {isUk ? "Поп-ап для подій" : "Pop-Up for Events"}
          </h2>
          <p className="text-gray-400 dark:text-neutral-500 mb-10 max-w-xl">
            {isUk
              ? "Ми привозимо все необхідне: баристу, машину, обладнання. Ваші гості отримують кав'ярню преміум-класу будь-де."
              : "We bring everything: barista, machine, equipment. Your guests get a premium coffee experience anywhere."}
          </p>

          {/* Event type cards */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-12">
            {EVENT_TYPES.map((ev) => (
              <button
                key={ev.key}
                onClick={() =>
                  setEventFormData((prev) => ({ ...prev, type: ev.key }))
                }
                className={[
                  "p-4 text-center border transition-colors",
                  eventFormData.type === ev.key
                    ? "bg-[#FDE047] text-[#111111] border-[#FDE047]"
                    : "bg-[#1A1A1A] text-white border-[#2A2A2A] hover:border-[#FDE047]",
                ].join(" ")}
              >
                <div className="text-2xl mb-2">{ev.icon}</div>
                <div className="font-bold text-sm uppercase">
                  {isUk ? ev.uk : ev.en}
                </div>
                <div
                  className={[
                    "text-xs mt-1",
                    eventFormData.type === ev.key ? "text-[#111]" : "text-gray-400",
                  ].join(" ")}
                >
                  {isUk ? ev.descUk : ev.descEn}
                </div>
              </button>
            ))}
          </div>

          {/* Format packages */}
          <h3 className="text-xl font-black uppercase mb-6 text-[#FDE047]">
            {isUk ? "Формати" : "Format Packages"}
          </h3>
          <div className="grid sm:grid-cols-3 gap-4 mb-12">
            {PACKAGES.map((pkg, idx) => (
              <div
                key={idx}
                className={[
                  "border p-6",
                  idx === 2
                    ? "border-[#FDE047] bg-[#1A1A00]"
                    : "border-[#2A2A2A] bg-[#1A1A1A]",
                ].join(" ")}
              >
                {idx === 2 && (
                  <div className="text-[10px] font-black uppercase tracking-widest bg-[#FDE047] text-[#111] px-2 py-0.5 inline-block mb-3">
                    {isUk ? "Популярний" : "Most Popular"}
                  </div>
                )}
                <div className="text-2xl font-black text-white mb-1">
                  {isUk ? pkg.keyUk : pkg.keyEn}
                </div>
                <div className="text-[#FDE047] font-bold mb-4">
                  {isUk ? pkg.priceUk : pkg.priceEn}
                </div>
                <ul className="space-y-2">
                  {(isUk ? pkg.includesUk : pkg.includesEn).map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="text-[#FDE047] mt-0.5 shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Booking form */}
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] p-8">
            <h3 className="text-xl font-black uppercase mb-6">
              {isUk ? "Замовити подію" : "Book an Event"}
            </h3>

            {bookingSubmitted ? (
              <div className="bg-[#FDE047] text-[#111111] p-6 text-center">
                <div className="text-2xl font-black uppercase mb-2">
                  {isUk ? "Заявку отримано!" : "Request Received!"}
                </div>
                <div className="text-sm">
                  {isUk
                    ? "Ми зв'яжемося з вами протягом 2 годин."
                    : "We will get back to you within 2 hours."}
                </div>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="grid sm:grid-cols-2 gap-4">
                {/* Event type */}
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wide text-[#FDE047] block mb-2">
                    {isUk ? "Тип події" : "Event Type"}
                  </label>
                  <select
                    value={eventFormData.type}
                    onChange={(e) => handleFormChange("type", e.target.value)}
                    className="w-full bg-[#111111] border border-[#333] text-white px-4 py-3 text-sm focus:border-[#FDE047] outline-none"
                  >
                    <option value="">{isUk ? "Оберіть тип події" : "Select event type"}</option>
                    {EVENT_TYPES.map((ev) => (
                      <option key={ev.key} value={ev.key}>
                        {isUk ? ev.uk : ev.en}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wide text-[#FDE047] block mb-2">
                    {isUk ? "Дата" : "Date"}
                  </label>
                  <input
                    type="date"
                    value={eventFormData.date}
                    onChange={(e) => handleFormChange("date", e.target.value)}
                    className="w-full bg-[#111111] border border-[#333] text-white px-4 py-3 text-sm focus:border-[#FDE047] outline-none"
                  />
                </div>

                {/* Guest count */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wide text-[#FDE047] block mb-2">
                    {isUk ? "Кількість гостей" : "Guest Count"}
                  </label>
                  <input
                    type="number"
                    placeholder={isUk ? "напр. 150" : "e.g. 150"}
                    value={eventFormData.guests}
                    onChange={(e) => handleFormChange("guests", e.target.value)}
                    className="w-full bg-[#111111] border border-[#333] text-white px-4 py-3 text-sm focus:border-[#FDE047] outline-none placeholder:text-gray-600"
                  />
                </div>

                {/* Location */}
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wide text-[#FDE047] block mb-2">
                    {isUk ? "Адреса події" : "Event Location"}
                  </label>
                  <input
                    type="text"
                    placeholder={isUk ? "Адреса або назва майданчика" : "Address or venue name"}
                    value={eventFormData.location}
                    onChange={(e) => handleFormChange("location", e.target.value)}
                    className="w-full bg-[#111111] border border-[#333] text-white px-4 py-3 text-sm focus:border-[#FDE047] outline-none placeholder:text-gray-600"
                  />
                </div>

                {/* Notes */}
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wide text-[#FDE047] block mb-2">
                    {isUk ? "Додаткові побажання" : "Additional Notes"}
                  </label>
                  <textarea
                    rows={3}
                    placeholder={isUk ? "Особливі вимоги, меню, брендинг..." : "Special requirements, menu, branding..."}
                    value={eventFormData.notes}
                    onChange={(e) => handleFormChange("notes", e.target.value)}
                    className="w-full bg-[#111111] border border-[#333] text-white px-4 py-3 text-sm focus:border-[#FDE047] outline-none placeholder:text-gray-600 dark:text-neutral-300 resize-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="bg-[#FDE047] text-[#111111] font-black uppercase tracking-wide px-8 py-4 text-sm hover:bg-[#FBBF24] transition-colors w-full sm:w-auto"
                  >
                    {isUk ? "Надіслати заявку" : "Submit Request"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="bg-[#0D0D0D] py-16">
        <div className="max-w-5xl mx-auto px-4">
          <span className="text-[#FDE047] text-xs font-bold uppercase tracking-widest">
            {isUk ? "Наші роботи" : "Our Work"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase mt-1 mb-8">
            {isUk ? "Галерея подій" : "Event Gallery"}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {GALLERY.map((item, idx) => (
              <div
                key={idx}
                className="aspect-square relative overflow-hidden group"
                style={{
                  background: `linear-gradient(135deg, ${item.bgFrom}, ${item.bgTo})`,
                }}
              >
                {/* Diagonal stripe overlay */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: "repeating-linear-gradient(45deg, rgba(0,0,0,0.3) 0px, rgba(0,0,0,0.3) 1px, transparent 1px, transparent 14px)",
                  }}
                />
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-3">
                  <div className="bg-[#111111] bg-opacity-85 p-2">
                    <div className="text-white font-bold text-xs leading-tight">
                      {isUk ? item.locationUk : item.locationEn}
                    </div>
                    <div className="text-[#FDE047] text-xs mt-0.5">
                      {isUk ? item.coffeeUk : item.coffeeEn}
                    </div>
                  </div>
                </div>
                {/* Coffee icon */}
                <div className="absolute top-3 right-3 text-2xl opacity-60 group-hover:opacity-100 transition-opacity">
                  ☕
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="bg-[#111111] py-16">
        <div className="max-w-5xl mx-auto px-4">
          <span className="text-[#FDE047] text-xs font-bold uppercase tracking-widest">
            {isUk ? "Про нас" : "About Us"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase mt-1 mb-4">
            {isUk ? "Люди та кава" : "People & Coffee"}
          </h2>
          <p className="text-gray-400 dark:text-neutral-500 max-w-2xl mb-12 leading-relaxed">
            {isUk
              ? "Ми починали як одна кавова точка на Подолі. Сьогодні наш трак об'їжджає Київ щодня, а наші баристи працювали з чемпіонами бариста з усього світу. Зерна ми купуємо напряму у фермерів Ефіопії, Колумбії та Гватемали."
              : "We started as a single coffee spot in Podil. Today our truck covers Kyiv daily, and our baristas have trained with barista champions from around the world. We source beans directly from farms in Ethiopia, Colombia, and Guatemala."}
          </p>

          {/* Team */}
          <h3 className="text-xl font-black uppercase mb-6 text-[#FDE047]">
            {isUk ? "Команда" : "Our Team"}
          </h3>
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            {TEAM.map((member, idx) => (
              <div key={idx} className="bg-[#1A1A1A] border border-[#2A2A2A] p-6">
                {/* Avatar placeholder */}
                <div
                  className="w-14 h-14 mb-4 flex items-center justify-center text-2xl font-black text-[#111111]"
                  style={{ background: "#FDE047" }}
                >
                  {(isUk ? member.nameUk : member.nameEn).charAt(0)}
                </div>
                <div className="font-black text-white text-base mb-0.5">
                  {isUk ? member.nameUk : member.nameEn}
                </div>
                <div className="text-[#FDE047] text-xs font-bold uppercase tracking-wide mb-3">
                  {isUk ? member.roleUk : member.roleEn}
                </div>
                <div className="text-gray-400 dark:text-neutral-500 text-sm leading-relaxed">
                  {isUk ? member.bioUk : member.bioEn}
                </div>
              </div>
            ))}
          </div>

          {/* Coffee sourcing story */}
          <div className="border-l-4 border-[#FDE047] pl-6 py-2">
            <div className="text-[#FDE047] font-black text-sm uppercase tracking-wide mb-2">
              {isUk ? "Наш підхід до зерна" : "Our Sourcing Philosophy"}
            </div>
            <p className="text-gray-300 text-sm leading-relaxed max-w-2xl">
              {isUk
                ? "Ми не купуємо зерно на бірж. Кожна партія — це прямий контракт з фермою. Ми платимо вище ринкової ціни, відвідуємо ферми особисто і знаємо імена тих, хто виростив вашу каву."
                : "We do not buy coffee on commodity markets. Every lot is a direct contract with a farm. We pay above market price, visit farms in person, and know the names of the people who grew your coffee."}
            </p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#FDE047] text-[#111111] py-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid sm:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="font-black text-2xl uppercase tracking-tighter mb-2">
                Espresso Bar
              </div>
              <div className="text-sm font-bold mb-4">
                {isUk ? "Мобільна кав'ярня · Київ" : "Mobile Coffee Truck · Kyiv"}
              </div>
              <div className="text-xs">
                {isUk
                  ? "Спешелті-кава там, де ви є"
                  : "Specialty coffee wherever you are"}
              </div>
            </div>

            {/* Contact */}
            <div>
              <div className="font-black uppercase text-sm tracking-wide mb-3">
                {isUk ? "Контакти" : "Contact"}
              </div>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="tel:+380441234567" className="hover:underline font-medium">
                    +38 (044) 123-45-67
                  </a>
                </li>
                <li>
                  <a href="mailto:hello@espresso-bar.kyiv" className="hover:underline">
                    hello@espresso-bar.kyiv
                  </a>
                </li>
                <li className="text-[#111111]">
                  {isUk ? "Telegram: @espressobarkyiv" : "Telegram: @espressobarkyiv"}
                </li>
              </ul>
            </div>

            {/* Links */}
            <div>
              <div className="font-black uppercase text-sm tracking-wide mb-3">
                {isUk ? "Навігація" : "Navigation"}
              </div>
              <ul className="space-y-2 text-sm">
                {[
                  { en: "Schedule", uk: "Розклад" },
                  { en: "Menu", uk: "Меню" },
                  { en: "Events", uk: "Події" },
                  { en: "Gallery", uk: "Галерея" },
                  { en: "About", uk: "Про нас" },
                ].map((link, i) => (
                  <li key={i}>
                    <button className="hover:underline font-medium text-left">
                      {isUk ? link.uk : link.en}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-[#111111] border-opacity-20 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs">
            <div>
              © 2024 Espresso Bar.{" "}
              {isUk ? "Всі права захищено." : "All rights reserved."}
            </div>
            <div className="flex gap-4">
              <button className="hover:underline">
                {isUk ? "Умови використання" : "Terms of Use"}
              </button>
              <button className="hover:underline">
                {isUk ? "Конфіденційність" : "Privacy Policy"}
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
