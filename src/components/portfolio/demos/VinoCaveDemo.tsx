"use client";

import { useState, type CSSProperties } from "react";

// ─── SVG Icons ────────────────────────────────────────────────────────────────

function IconWineGlass({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M8 22h8" />
      <path d="M7 10h10" />
      <path d="M12 15v7" />
      <path d="M12 15A5 5 0 0 0 17 10V3H7v7a5 5 0 0 0 5 5z" />
    </svg>
  );
}

function IconLeaf({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}

function IconCalendar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function IconGlobe({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function IconCheck({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function IconChevron({ className, open }: { className?: string; open?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${className} transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function IconStar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function IconAward({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}

function IconCheese({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 10l9-7 9 7v11H3V10z" />
      <circle cx="10" cy="14" r="1" fill="currentColor" />
      <circle cx="14" cy="11" r="1" fill="currentColor" />
    </svg>
  );
}

// ─── Tasting Profile Component ─────────────────────────────────────────────────

function TastingDots({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-[#D9C5A8] w-16 shrink-0 font-sans">{label}</span>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="w-2.5 h-2.5 rounded-full border"
            style={{
              background: i <= value ? color : "transparent",
              borderColor: i <= value ? color : "#5C3020",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

type Wine = {
  name: string;
  region: string;
  grape: string;
  vintage: number;
  notes: string[];
  body: number;
  tannins: number;
  acidity: number;
  priceGlass: number;
  priceBottle: number;
  badge: string | null;
  pairing: string;
};

const WINES: Record<string, Wine[]> = {
  red: [
    { name: "Barolo Riserva", region: "Piedmont, Italy", grape: "Nebbiolo", vintage: 2019, notes: ["Truffle", "Dried roses", "Tobacco"], body: 5, tannins: 5, acidity: 3, priceGlass: 14, priceBottle: 74, badge: "Staff Pick", pairing: "Truffle Risotto" },
    { name: "Châteauneuf-du-Pape", region: "Southern Rhône, France", grape: "Grenache blend", vintage: 2020, notes: ["Lavender", "Black plum", "Garrigue"], body: 5, tannins: 4, acidity: 3, priceGlass: 16, priceBottle: 89, badge: null, pairing: "Lamb Rack" },
    { name: "Priorat Gran Reserva", region: "Catalonia, Spain", grape: "Garnacha, Cariñena", vintage: 2018, notes: ["Dark slate", "Blackberry", "Mineral"], body: 5, tannins: 5, acidity: 2, priceGlass: 13, priceBottle: 68, badge: "Rare", pairing: "Aged Manchego" },
    { name: "Côtes du Rhône Villages", region: "Northern Rhône, France", grape: "Syrah", vintage: 2022, notes: ["Violets", "Black pepper", "Olive"], body: 3, tannins: 3, acidity: 4, priceGlass: 9, priceBottle: 42, badge: null, pairing: "Charcuterie Board" },
  ],
  white: [
    { name: "Chablis Premier Cru", region: "Burgundy, France", grape: "Chardonnay", vintage: 2021, notes: ["Oyster shell", "Green apple", "Lemon"], body: 2, tannins: 1, acidity: 5, priceGlass: 12, priceBottle: 62, badge: "Staff Pick", pairing: "Oysters Gratin" },
    { name: "Grüner Veltliner Smaragd", region: "Wachau, Austria", grape: "Grüner Veltliner", vintage: 2020, notes: ["White pepper", "Grapefruit", "Herbs"], body: 3, tannins: 1, acidity: 4, priceGlass: 11, priceBottle: 54, badge: null, pairing: "Poached Sea Bass" },
    { name: "Vermentino di Sardegna", region: "Sardinia, Italy", grape: "Vermentino", vintage: 2023, notes: ["Almond blossom", "Peach", "Sea breeze"], body: 2, tannins: 1, acidity: 4, priceGlass: 8, priceBottle: 38, badge: "New", pairing: "Marinated Olives" },
  ],
  rose: [
    { name: "Bandol Rosé", region: "Provence, France", grape: "Mourvèdre", vintage: 2023, notes: ["Strawberry", "Herbs", "Stone"], body: 2, tannins: 1, acidity: 3, priceGlass: 10, priceBottle: 49, badge: "Staff Pick", pairing: "Cheese Board" },
    { name: "Cerasuolo d'Abruzzo", region: "Abruzzo, Italy", grape: "Montepulciano", vintage: 2022, notes: ["Cherry", "Pomegranate", "Spice"], body: 3, tannins: 2, acidity: 4, priceGlass: 8, priceBottle: 36, badge: null, pairing: "Carpaccio" },
  ],
  sparkling: [
    { name: "Champagne Blanc de Blancs", region: "Champagne, France", grape: "Chardonnay", vintage: 2018, notes: ["Brioche", "Lemon curd", "Chalk"], body: 2, tannins: 1, acidity: 5, priceGlass: 18, priceBottle: 95, badge: "Rare", pairing: "Caviar & Blinis" },
    { name: "Franciacorta Satèn", region: "Lombardy, Italy", grape: "Chardonnay", vintage: 2021, notes: ["Cream", "White flowers", "Pear"], body: 2, tannins: 1, acidity: 4, priceGlass: 12, priceBottle: 58, badge: null, pairing: "Oysters on Ice" },
  ],
  orange: [
    { name: "Ramato Pinot Grigio", region: "Friuli, Italy", grape: "Pinot Grigio", vintage: 2022, notes: ["Dried apricot", "Walnut", "Honey"], body: 3, tannins: 3, acidity: 3, priceGlass: 10, priceBottle: 47, badge: "Organic", pairing: "Soft Cheese & Fig" },
    { name: "Rkatsiteli Amber", region: "Kakheti, Georgia", grape: "Rkatsiteli", vintage: 2021, notes: ["Quince", "Beeswax", "Tannic depth"], body: 4, tannins: 4, acidity: 3, priceGlass: 11, priceBottle: 52, badge: "Natural", pairing: "Walnuts & Honey" },
  ],
};

const WINE_TABS: { key: keyof typeof WINES; labelEn: string; labelUk: string }[] = [
  { key: "red", labelEn: "Red", labelUk: "Червоне" },
  { key: "white", labelEn: "White", labelUk: "Біле" },
  { key: "rose", labelEn: "Rosé", labelUk: "Рожеве" },
  { key: "sparkling", labelEn: "Sparkling", labelUk: "Ігристе" },
  { key: "orange", labelEn: "Orange", labelUk: "Оранжеве" },
];

const BADGE_COLORS: Record<string, { bg: string; text: string }> = {
  "Staff Pick": { bg: "#C9952A30", text: "#E8B84A" },
  "Organic":    { bg: "#16653A30", text: "#6EE7A0" },
  "Natural":    { bg: "#16653A30", text: "#6EE7A0" },
  "Rare":       { bg: "#7B1F2E30", text: "#FCA5A5" },
  "New":        { bg: "#1E40AF30", text: "#93C5FD" },
};

const PAIRINGS_EN = [
  { wine: "Barolo Riserva", wineDesc: "Full-bodied, tannic, with truffle and tobacco notes", food: "Truffle Risotto", foodDesc: "Aged carnaroli, winter truffle shavings, Parmigiano Reggiano" },
  { wine: "Chablis Premier Cru", wineDesc: "Crisp, mineral, with oyster shell and lemon notes", food: "Oysters Gratin", foodDesc: "Half-shell oysters, Gruyère cream, golden breadcrumbs" },
  { wine: "Côtes du Rhône", wineDesc: "Medium body, black pepper and olive notes", food: "Charcuterie Board", foodDesc: "Saucisson sec, jambon de Bayonne, cornichons, Dijon mustard" },
];

const PAIRINGS_UK = [
  { wine: "Бароло Різерва", wineDesc: "Повнотілий, танінний, з нотами трюфеля і тютюну", food: "Різотто з трюфелем", foodDesc: "Витриманий карнаролі, стружка зимового трюфеля, Пармезан Реджано" },
  { wine: "Шаблі Прем'є Крю", wineDesc: "Хрустке, мінеральне, з нотами морської раковини і лимона", food: "Устриці Гратен", foodDesc: "Устриці на мушлі, крем з Грюйєром, золотисті панірувальні сухарики" },
  { wine: "Кот-дю-Рон", wineDesc: "Середнє тіло, ноти чорного перцю та оливи", food: "Шаркутері борд", foodDesc: "Сосісон сек, хамон де Байонн, корнішони, діжонська гірчиця" },
];

const SNACKS_EN = [
  { name: "Cheese Board", desc: "Aged Comté, Époisses, Manchego, Roquefort, served with honeycomb & walnuts", price: "£18", emoji: "🧀" },
  { name: "Charcuterie Slate", desc: "Saucisson sec, jambon de Bayonne, bresaola, cornichons, sourdough crisps", price: "£16", emoji: "🥩" },
  { name: "Oysters on Ice", desc: "Six freshly shucked Pacific oysters with mignonette and lemon", price: "£22", emoji: "🦪" },
  { name: "Marinated Olives", desc: "Castelvetrano, Kalamata, Picholine — herbs, citrus, chilli", price: "£7", emoji: "🫒" },
  { name: "Dark Chocolate Slate", desc: "Venezuelan 72%, honeycomb shards, smoked sea salt, raspberries", price: "£9", emoji: "🍫" },
];

const SNACKS_UK = [
  { name: "Сирна дошка", desc: "Витриманий Конте, Єпуас, Манчего, Рокфор, мед та волоські горіхи", price: "£18", emoji: "🧀" },
  { name: "Шаркутері слейт", desc: "Сосісон сек, хамон, брезаола, корнішони, тости із закваски", price: "£16", emoji: "🥩" },
  { name: "Устриці на льоду", desc: "Шість свіжих тихоокеанських устриць з міньйонетом і лимоном", price: "£22", emoji: "🦪" },
  { name: "Мариновані оливки", desc: "Кастельветрано, Каламата, Пішолін — трави, цитрус, чилі", price: "£7", emoji: "🫒" },
  { name: "Темний шоколад", desc: "Венесуела 72%, медова крихта, копчена морська сіль, малина", price: "£9", emoji: "🍫" },
];

const EVENTS_EN = [
  { title: "Barolo vs Amarone Night", subtitle: "Italy's great reds, head to head", date: "Fri 7 May", time: "19:00", spots: 12, price: "₴680" },
  { title: "Georgian Wine Discovery", subtitle: "Kakheti, Kartli, Imereti — one evening", date: "Sat 8 May", time: "18:30", spots: 8, price: "₴590" },
  { title: "Wine & Jazz: Bordeaux", subtitle: "Four Grand Cru Classés, live quartet", date: "Thu 14 May", time: "20:00", spots: 3, price: "₴990" },
  { title: "Natural Wines Masterclass", subtitle: "Biodynamic, organic, skin-contact", date: "Sun 10 May", time: "15:00", spots: 14, price: "₴750" },
];

const EVENTS_UK = [
  { title: "Бароло проти Амароне", subtitle: "Великі червоні Італії — очна зустріч", date: "Пт 7 трав.", time: "19:00", spots: 12, price: "₴680" },
  { title: "Відкриття Грузинського Вина", subtitle: "Кахеті, Карталі, Імереті — один вечір", date: "Сб 8 трав.", time: "18:30", spots: 8, price: "₴590" },
  { title: "Вино та джаз: Бордо", subtitle: "Чотири Гран Крю, живий квартет", date: "Чт 14 трав.", time: "20:00", spots: 3, price: "₴990" },
  { title: "Майстер-клас: Натуральні вина", subtitle: "Біодинамічні, органічні, шкірний контакт", date: "Нд 10 трав.", time: "15:00", spots: 14, price: "₴750" },
];

const SOMMELIERS_EN = [
  {
    name: "Luca Ferrani",
    title: "Head Sommelier",
    credential: "WSET Level 4 Diploma",
    specialty: "Barolo & Burgundy",
    bio: "Born in Asti, Luca grew up among Nebbiolo vines before training in London. Fourteen years behind the cellar door, he has built our core Italian and French collections from scratch. He runs our monthly blind-tasting evenings.",
    initials: "LF",
    country: "🇮🇹",
    tastings: 140,
    labels: 280,
  },
  {
    name: "Nataliya Kovalchuk",
    title: "Cellar Manager",
    credential: "WSET Level 3 — Georgian Wine",
    specialty: "Georgia & Natural Wine",
    bio: "Nataliya discovered qvevri wines during a harvest residency in Kakheti and has not looked back since. She curates our entire Eastern European and natural-wine list, and leads the Georgian Discovery evenings each season.",
    initials: "NK",
    country: "🇬🇪",
    tastings: 80,
    labels: 120,
  },
];

const SOMMELIERS_UK = [
  {
    name: "Лука Феррані",
    title: "Головний Сомельє",
    credential: "WSET Рівень 4 Диплом",
    specialty: "Бароло та Бургундія",
    bio: "Народився в Асті серед виноградників Неббіоло, навчався в Лондоні. Чотирнадцять років у погребі — особисто зібрав нашу італійську та французьку колекції. Веде щомісячні вечори сліпих дегустацій.",
    initials: "ЛФ",
    country: "🇮🇹",
    tastings: 140,
    labels: 280,
  },
  {
    name: "Наталія Ковальчук",
    title: "Менеджер Погребу",
    credential: "WSET Рівень 3 — Грузинське вино",
    specialty: "Грузія та натуральне вино",
    bio: "Відкрила квеврі-вина під час сезону збору врожаю в Кахеті. Відтоді курує весь наш грузинський і натуральний список вин, веде сезонні вечори Грузинського Відкриття.",
    initials: "НК",
    country: "🇬🇪",
    tastings: 80,
    labels: 120,
  },
];

const CLUB_TIERS_EN = [
  {
    name: "Cave Explorer",
    price: "₴890",
    period: "/mo",
    color: "#5C3020",
    textColor: "#E8D0B8",
    perks: [
      "2 glasses of the month — curated by our sommeliers",
      "10% off all bottle purchases",
      "Priority booking for tasting evenings",
      "Monthly tasting notes newsletter",
    ],
    popular: false,
  },
  {
    name: "Cellar Member",
    price: "₴1,890",
    period: "/mo",
    color: "#7B1F2E",
    textColor: "#F5F0E8",
    perks: [
      "1 bottle of the month (Sommelier's selection)",
      "20% off all wine purchases",
      "Free entry to one tasting evening per month",
      "Access to members-only reserve list",
      "Name engraved in the cave guest book",
    ],
    popular: true,
  },
  {
    name: "Connoisseur",
    price: "₴3,490",
    period: "/mo",
    color: "#C9952A",
    textColor: "#1A0E0A",
    perks: [
      "2 bottles of the month — one red, one white",
      "30% off all wine & food",
      "Unlimited tasting evenings — all included",
      "Private cellar tour for two, quarterly",
      "Dedicated sommelier consultations",
      "Early access to rare & allocated wines",
    ],
    popular: false,
  },
];

const CLUB_TIERS_UK = [
  {
    name: "Дослідник Погребу",
    price: "₴890",
    period: "/міс",
    color: "#5C3020",
    textColor: "#E8D0B8",
    perks: [
      "2 бокали місяця — добірка сомельє",
      "10% знижка на всі пляшки",
      "Пріоритетне бронювання дегустаційних вечорів",
      "Щомісячний бюлетень із нотатками дегустацій",
    ],
    popular: false,
  },
  {
    name: "Член Погребу",
    price: "₴1,890",
    period: "/міс",
    color: "#7B1F2E",
    textColor: "#F5F0E8",
    perks: [
      "1 пляшка місяця (вибір сомельє)",
      "20% знижка на всі вина",
      "Безкоштовний вхід на один дегустаційний вечір на місяць",
      "Доступ до закритого списку рідкісних вин",
      "Ваше ім'я у книзі гостей погребу",
    ],
    popular: true,
  },
  {
    name: "Конасьє",
    price: "₴3,490",
    period: "/міс",
    color: "#C9952A",
    textColor: "#1A0E0A",
    perks: [
      "2 пляшки місяця — червоне та біле",
      "30% знижка на вина та їжу",
      "Необмежені дегустаційні вечори — всі включено",
      "Приватна екскурсія по погребу для двох, щоквартально",
      "Персональні консультації з сомельє",
      "Ранній доступ до рідкісних та алокованих вин",
    ],
    popular: false,
  },
];

const SOMMELIER_PICK = WINES.red[0];

const OCCASION_EN = ["Birthday", "Anniversary", "Business dinner", "Just wine"];
const OCCASION_UK = ["День народження", "Річниця", "Ділова вечеря", "Просто вино"];

// ─── Component ────────────────────────────────────────────────────────────────

export function VinoCaveDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [activeTab, setActiveTab] = useState<keyof typeof WINES>("red");
  const [activeOccasion, setActiveOccasion] = useState(0);
  const [reservationData, setReservationData] = useState({ name: "", date: "", time: "", guests: "2" });
  const [reservationDone, setReservationDone] = useState(false);

  const pairings = isUk ? PAIRINGS_UK : PAIRINGS_EN;
  const events = isUk ? EVENTS_UK : EVENTS_EN;
  const snacks = isUk ? SNACKS_UK : SNACKS_EN;
  const occasions = isUk ? OCCASION_UK : OCCASION_EN;
  const sommeliers = isUk ? SOMMELIERS_UK : SOMMELIERS_EN;
  const clubTiers = isUk ? CLUB_TIERS_UK : CLUB_TIERS_EN;

  const accentGold = "#C9952A";
  const accentBurgundy = "#7B1F2E";

  return (
    <div className="bg-[#1A0E0A] font-serif text-[#F5F0E8]">

      {/* ── Hero ── */}
      <section className="bg-linear-to-br from-[#1A0E0A] to-[#2E1208] px-6 pt-16 pb-14">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">

          {/* Left */}
          <div>
            <div className="text-xs tracking-[0.25em] uppercase text-[#C9952A] mb-5 font-sans">
              {isUk ? "Преміум Винний Бар і Погріб" : "Premium Wine Bar & Cave"}
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-5">
              <span className="text-[#F5F0E8]">THE CAVE</span>
              <br />
              <span className="text-[#C9952A]">BELOW</span>
              <br />
              <span className="text-[#F5F0E8] text-3xl font-normal italic">the city</span>
            </h1>
            <p className="text-[#DBC9AC] text-lg leading-relaxed mb-8 max-w-md">
              {isUk
                ? "400+ сортів з 22 країн. 17 метрів під землею. Температура ніколи не перевищує 14°C. Ласкаво просимо до нашого погребу."
                : "400+ labels from 22 countries. 17 metres underground. Temperature never exceeds 14°C. Welcome to our cave."}
            </p>

            <div className="flex gap-3 flex-wrap mb-10">
              <button
                className="px-8 py-3.5 rounded-xl font-bold font-sans text-[15px] cursor-pointer hover:opacity-90 transition-opacity"
                style={{ background: accentBurgundy, color: "#F5F0E8" }}
              >
                {isUk ? "Забронювати стіл" : "Reserve a Table"}
              </button>
              <button
                className="px-7 py-3.5 rounded-xl font-sans text-[15px] cursor-pointer border-2 hover:bg-[#C9952A]/10 transition-colors"
                style={{ borderColor: accentGold, color: accentGold }}
              >
                {isUk ? "Переглянути меню" : "View Wine Menu"}
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 flex-wrap">
              {[
                { num: "400+", label: isUk ? "позицій" : "labels" },
                { num: "22", label: isUk ? "країни" : "countries" },
                { num: "Since 2011", label: isUk ? "відкрито" : "open" },
              ].map((s, i) => (
                <div key={i}>
                  <div className="text-2xl font-bold" style={{ color: accentGold }}>{s.num}</div>
                  <div className="text-xs text-[#BFAA8E] font-sans mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Sommelier's Pick card */}
          <div
            className="rounded-2xl border p-6 w-full max-w-sm mx-auto md:ml-auto shadow-2xl"
            style={{ background: "#231610", borderColor: "#5C3020" }}
          >
            <div className="flex items-center gap-2 mb-5">
              <IconWineGlass className="w-5 h-5" style={{ color: accentGold }} />
              <span className="text-xs font-bold font-sans uppercase tracking-[0.2em]" style={{ color: accentGold }}>
                {isUk ? "Вибір сомельє сьогодні" : "Sommelier's Pick Tonight"}
              </span>
            </div>

            <div className="border-b mb-5 pb-5" style={{ borderColor: "#5C3020" }}>
              <h3 className="text-xl font-bold text-[#F5F0E8] mb-1">{SOMMELIER_PICK.name} {SOMMELIER_PICK.vintage}</h3>
              <div className="flex items-center gap-1.5 text-sm text-[#BFAA8E] font-sans mb-4">
                <IconGlobe className="w-3.5 h-3.5" />
                {SOMMELIER_PICK.region} · {SOMMELIER_PICK.grape}
              </div>
              <div className="space-y-2">
                <TastingDots label={isUk ? "Тіло" : "Body"} value={SOMMELIER_PICK.body} color={accentBurgundy} />
                <TastingDots label={isUk ? "Таніни" : "Tannins"} value={SOMMELIER_PICK.tannins} color={accentBurgundy} />
                <TastingDots label={isUk ? "Кислотність" : "Acidity"} value={SOMMELIER_PICK.acidity} color={accentBurgundy} />
              </div>
            </div>

            <div className="text-sm text-[#D9C5A8] italic font-sans mb-5">
              "{SOMMELIER_PICK.notes.join(" · ")}"
            </div>

            <div className="flex justify-between items-center pt-3 border-t" style={{ borderColor: "#5C3020" }}>
              <div className="text-center">
                <div className="text-xs text-[#BFAA8E] font-sans mb-1">{isUk ? "Бокал" : "Glass"}</div>
                <div className="font-bold text-lg" style={{ color: accentGold }}>£{SOMMELIER_PICK.priceGlass}</div>
              </div>
              <div className="w-px h-8" style={{ background: "#5C3020" }} />
              <div className="text-center">
                <div className="text-xs text-[#BFAA8E] font-sans mb-1">{isUk ? "Пляшка" : "Bottle"}</div>
                <div className="font-bold text-lg" style={{ color: accentGold }}>£{SOMMELIER_PICK.priceBottle}</div>
              </div>
              <button
                className="px-5 py-2 rounded-xl text-sm font-bold font-sans cursor-pointer transition-opacity hover:opacity-80"
                style={{ background: accentBurgundy, color: "#F5F0E8" }}
              >
                {isUk ? "Замовити" : "Order"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Wine Menu ── */}
      <section className="py-16 px-6 bg-[#140B07]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-xs tracking-[0.25em] uppercase font-sans mb-3" style={{ color: accentGold }}>
              {isUk ? "Наша колекція" : "Our collection"}
            </div>
            <h2 className="text-4xl font-bold text-[#F5F0E8]">
              {isUk ? "Меню вин" : "Wine Menu"}
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {WINE_TABS.map(({ key, labelEn, labelUk }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className="px-5 py-2 rounded-xl text-sm font-semibold font-sans cursor-pointer transition-all border"
                style={{
                  background: activeTab === key ? accentBurgundy : "transparent",
                  color: activeTab === key ? "#F5F0E8" : "#D9C5A8",
                  borderColor: activeTab === key ? accentBurgundy : "#5C3020",
                }}
              >
                {isUk ? labelUk : labelEn}
              </button>
            ))}
          </div>

          {/* Wine cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {WINES[activeTab].map((wine, i) => (
              <div
                key={i}
                className="rounded-2xl p-5 border transition-colors"
                style={{ background: "#231610", borderColor: "#5C3020" }}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="font-bold text-[#F5F0E8] text-base">{wine.name} {wine.vintage}</h3>
                      {wine.badge && BADGE_COLORS[wine.badge] && (
                        <span
                          className="text-xs font-bold font-sans px-2 py-0.5 rounded-full"
                          style={{ background: BADGE_COLORS[wine.badge].bg, color: BADGE_COLORS[wine.badge].text }}
                        >
                          {wine.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-[#BFAA8E] font-sans">
                      <IconGlobe className="w-3 h-3" />
                      {wine.region} · {wine.grape}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs text-[#BFAA8E] font-sans">{isUk ? "бокал / пляшка" : "glass / bottle"}</div>
                    <div className="font-bold text-sm mt-0.5" style={{ color: accentGold }}>
                      £{wine.priceGlass} / £{wine.priceBottle}
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 mb-3">
                  <TastingDots label={isUk ? "Тіло" : "Body"} value={wine.body} color={accentBurgundy} />
                  <TastingDots label={isUk ? "Таніни" : "Tannins"} value={wine.tannins} color={accentBurgundy} />
                  <TastingDots label={isUk ? "Кислотність" : "Acidity"} value={wine.acidity} color={accentBurgundy} />
                </div>

                <div className="flex items-center justify-between pt-3 border-t gap-2" style={{ borderColor: "#5C3020" }}>
                  <div className="text-xs text-[#D9C5A8] italic font-sans">{wine.notes.join(" · ")}</div>
                  <div className="flex items-center gap-1 text-xs font-sans shrink-0" style={{ color: accentGold }}>
                    <span>🍽</span>
                    <span>{wine.pairing}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Wine & Food Pairings ── */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs tracking-[0.25em] uppercase font-sans mb-3" style={{ color: accentGold }}>
              {isUk ? "Поєднання" : "Pairings"}
            </div>
            <h2 className="text-4xl font-bold text-[#F5F0E8]">
              {isUk ? "Вино та їжа" : "Wine & Food"}
            </h2>
          </div>
          <div className="flex flex-col gap-6">
            {pairings.map((p, i) => (
              <div
                key={i}
                className="grid md:grid-cols-[1fr_auto_1fr] gap-4 items-center rounded-2xl p-5 border"
                style={{ background: "#231610", borderColor: "#5C3020" }}
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <IconWineGlass className="w-4 h-4" style={{ color: accentGold }} />
                    <span className="font-bold text-[#F5F0E8]">{p.wine}</span>
                  </div>
                  <p className="text-sm text-[#D9C5A8] font-sans">{p.wineDesc}</p>
                </div>
                <div className="text-2xl font-bold text-center" style={{ color: accentGold }}>+</div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-base">🍽</span>
                    <span className="font-bold text-[#F5F0E8]">{p.food}</span>
                  </div>
                  <p className="text-sm text-[#D9C5A8] font-sans">{p.foodDesc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Snacks Menu ── */}
      <section className="py-16 px-6 bg-[#140B07]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs tracking-[0.25em] uppercase font-sans mb-3" style={{ color: accentGold }}>
              {isUk ? "До вина" : "To accompany"}
            </div>
            <h2 className="text-4xl font-bold text-[#F5F0E8]">
              {isUk ? "Закуски" : "Snacks & Bites"}
            </h2>
            <p className="text-[#D9C5A8] font-sans mt-3 max-w-md mx-auto text-sm">
              {isUk
                ? "Невелика кухня, великий смак. Усе підібрано сомельє під нашу карту вин."
                : "A small kitchen, a big table. Every item hand-picked by our sommeliers to complement the wine list."}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {snacks.map((s, i) => (
              <div
                key={i}
                className="rounded-2xl p-5 border flex flex-col gap-3"
                style={{ background: "#231610", borderColor: "#5C3020" }}
              >
                <div className="text-3xl">{s.emoji}</div>
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h3 className="font-bold text-[#F5F0E8]">{s.name}</h3>
                    <span className="font-bold font-sans text-sm shrink-0" style={{ color: accentGold }}>{s.price}</span>
                  </div>
                  <p className="text-sm text-[#D9C5A8] font-sans leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Events ── */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs tracking-[0.25em] uppercase font-sans mb-3" style={{ color: accentGold }}>
              {isUk ? "Майбутні заходи" : "Upcoming events"}
            </div>
            <h2 className="text-4xl font-bold text-[#F5F0E8]">
              {isUk ? "Дегустаційні вечори" : "Tasting Evenings"}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {events.map((ev, i) => (
              <div
                key={i}
                className="rounded-2xl p-5 border flex gap-5 items-start"
                style={{ background: "#231610", borderColor: "#5C3020" }}
              >
                <div
                  className="text-center rounded-xl px-3 py-2 shrink-0"
                  style={{ background: accentBurgundy + "30", minWidth: 60 }}
                >
                  <div className="text-xs font-bold font-sans uppercase" style={{ color: accentGold }}>{ev.date}</div>
                  <div className="text-lg font-extrabold text-[#F5F0E8]">{ev.time}</div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-[#F5F0E8] mb-1">{ev.title}</h3>
                  <p className="text-xs text-[#D9C5A8] font-sans mb-3">{ev.subtitle}</p>
                  <div className="flex items-center justify-between">
                    <div
                      className="flex items-center gap-1.5 text-xs font-sans"
                      style={{ color: ev.spots <= 5 ? "#FCA5A5" : accentGold }}
                    >
                      <IconCalendar className="w-3.5 h-3.5" />
                      {ev.spots} {isUk ? "місць · " : "spots · "}{ev.price}
                    </div>
                    <button
                      className="text-xs font-bold font-sans px-4 py-1.5 rounded-lg cursor-pointer transition-opacity hover:opacity-80"
                      style={{ background: accentBurgundy, color: "#F5F0E8" }}
                    >
                      {isUk ? "Місце" : "Reserve"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cave Story ── */}
      <section className="py-16 px-6 bg-[#140B07]">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <div>
            <div className="text-xs tracking-[0.25em] uppercase font-sans mb-4" style={{ color: accentGold }}>
              {isUk ? "Про нас" : "Our story"}
            </div>
            <h2 className="text-3xl font-bold text-[#F5F0E8] mb-5">
              {isUk ? "Погріб під містом" : "The Cave Beneath the City"}
            </h2>
            <p className="text-[#D9C5A8] font-sans leading-relaxed mb-4">
              {isUk
                ? "17 метрів під вулицями міста. Природна температура 12–14°C цілий рік. Тут не використовують кліматизацію — тут все вже є у природному вигляді."
                : "17 metres below the city streets. Natural temperature 12–14°C year-round. No climate control needed — nature provides it all."}
            </p>
            <p className="text-[#D9C5A8] font-sans leading-relaxed">
              {isUk
                ? "Ми відкрились у 2011 з 40 позиціями і мрією про справжній винний досвід. Сьогодні — понад 400 вин з 22 країн, регулярні дегустації та погріб, що сам говорить за себе."
                : "We opened in 2011 with 40 labels and a dream of a true wine experience. Today — over 400 wines from 22 countries, regular tastings, and a cave that speaks for itself."}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { num: "400+", label: isUk ? "вин у колекції" : "wines in collection" },
              { num: "22", label: isUk ? "країни" : "countries" },
              { num: "2011", label: isUk ? "рік заснування" : "established" },
              { num: "17m", label: isUk ? "під землею" : "underground" },
              { num: "12–14°C", label: isUk ? "температура" : "temperature" },
              { num: "50+", label: isUk ? "подій на рік" : "events per year" },
            ].map((s, i) => (
              <div
                key={i}
                className="rounded-xl p-4 text-center border"
                style={{ background: "#231610", borderColor: "#5C3020" }}
              >
                <div className="font-extrabold text-lg mb-1" style={{ color: accentGold }}>{s.num}</div>
                <div className="text-xs text-[#BFAA8E] font-sans leading-tight">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sommeliers ── */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs tracking-[0.25em] uppercase font-sans mb-3" style={{ color: accentGold }}>
              {isUk ? "Наша команда" : "The team"}
            </div>
            <h2 className="text-4xl font-bold text-[#F5F0E8]">
              {isUk ? "Наші Сомельє" : "Our Sommeliers"}
            </h2>
            <p className="text-[#D9C5A8] font-sans mt-3 max-w-md mx-auto text-sm">
              {isUk
                ? "Два десятиліття виноробного досвіду між двома людьми. Кожна пляшка в нашому погребі — через їхні руки."
                : "Two decades of combined wine experience. Every bottle in our cave has passed through their hands."}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sommeliers.map((s, i) => (
              <div
                key={i}
                className="rounded-2xl p-6 border"
                style={{ background: "#231610", borderColor: "#5C3020" }}
              >
                <div className="flex items-start gap-5 mb-5">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold shrink-0 border-2"
                    style={{ background: accentBurgundy + "40", borderColor: accentBurgundy, color: "#F5F0E8" }}
                  >
                    {s.country}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#F5F0E8] text-lg">{s.name}</h3>
                    <div className="text-sm font-sans mb-1" style={{ color: accentGold }}>{s.title}</div>
                    <div className="flex items-center gap-1.5 text-xs text-[#BFAA8E] font-sans">
                      <IconAward className="w-3.5 h-3.5" />
                      {s.credential}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-[#D9C5A8] font-sans leading-relaxed mb-5">{s.bio}</p>
                <div className="flex gap-4 pt-4 border-t" style={{ borderColor: "#5C3020" }}>
                  <div className="text-center">
                    <div className="font-bold text-[#F5F0E8]">{s.tastings}</div>
                    <div className="text-xs text-[#BFAA8E] font-sans">{isUk ? "дегустацій" : "tastings led"}</div>
                  </div>
                  <div className="w-px" style={{ background: "#5C3020" }} />
                  <div className="text-center">
                    <div className="font-bold text-[#F5F0E8]">{s.labels}</div>
                    <div className="text-xs text-[#BFAA8E] font-sans">{isUk ? "позицій відібрано" : "labels curated"}</div>
                  </div>
                  <div className="w-px" style={{ background: "#5C3020" }} />
                  <div className="text-center flex-1">
                    <div className="font-bold text-[#F5F0E8] text-sm">{s.specialty}</div>
                    <div className="text-xs text-[#BFAA8E] font-sans">{isUk ? "спеціалізація" : "specialty"}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Wine Club ── */}
      <section className="py-16 px-6 bg-[#140B07]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs tracking-[0.25em] uppercase font-sans mb-3" style={{ color: accentGold }}>
              {isUk ? "Членство" : "Membership"}
            </div>
            <h2 className="text-4xl font-bold text-[#F5F0E8]">
              {isUk ? "Клуб Погребу" : "The Cave Club"}
            </h2>
            <p className="text-[#D9C5A8] font-sans mt-3 max-w-md mx-auto text-sm">
              {isUk
                ? "Ексклюзивний доступ до рідкісних вин, подій та сомельє — щомісяця у вашому бокалі."
                : "Exclusive access to rare wines, private events, and your own sommelier — every month in your glass."}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {clubTiers.map((tier, i) => (
              <div
                key={i}
                className="rounded-2xl p-6 border flex flex-col relative"
                style={{
                  background: tier.popular ? "#2E1510" : "#231610",
                  borderColor: tier.color,
                  borderWidth: tier.popular ? 2 : 1,
                }}
              >
                {tier.popular && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold font-sans"
                    style={{ background: accentBurgundy, color: "#F5F0E8" }}
                  >
                    {isUk ? "Найпопулярніше" : "Most Popular"}
                  </div>
                )}
                <div className="mb-5">
                  <h3 className="font-bold text-[#F5F0E8] text-lg mb-1">{tier.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold" style={{ color: tier.color === "#C9952A" ? accentGold : tier.color === "#7B1F2E" ? "#FDA4AF" : "#D9C5A8" }}>
                      {tier.price}
                    </span>
                    <span className="text-sm text-[#BFAA8E] font-sans">{tier.period}</span>
                  </div>
                </div>
                <ul className="flex-1 space-y-2.5 mb-6">
                  {tier.perks.map((perk, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm font-sans">
                      <IconCheck className="w-4 h-4 shrink-0 mt-0.5" style={{ color: tier.color === "#C9952A" ? accentGold : tier.color === "#7B1F2E" ? "#FDA4AF" : "#D9C5A8" } as CSSProperties} />
                      <span className="text-[#D9C5A8]">{perk}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className="w-full py-3 rounded-xl font-bold font-sans text-sm cursor-pointer transition-opacity hover:opacity-80"
                  style={{ background: tier.color, color: tier.textColor }}
                >
                  {isUk ? "Приєднатися" : "Join now"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reservation Form ── */}
      <section className="py-16 px-6">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-xs tracking-[0.25em] uppercase font-sans mb-3" style={{ color: accentGold }}>
              {isUk ? "Онлайн бронювання" : "Reservations"}
            </div>
            <h2 className="text-4xl font-bold text-[#F5F0E8]">
              {isUk ? "Забронювати стіл" : "Reserve a Table"}
            </h2>
          </div>

          {reservationDone ? (
            <div
              className="rounded-2xl p-10 text-center border"
              style={{ background: "#231610", borderColor: "#5C3020" }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{ background: accentBurgundy + "30", border: `2px solid ${accentBurgundy}` }}
              >
                <IconWineGlass className="w-8 h-8" style={{ color: accentGold }} />
              </div>
              <h3 className="text-2xl font-bold text-[#F5F0E8] mb-2">
                {isUk ? "Стіл чекає на вас" : "Your table awaits"}
              </h3>
              <p className="text-[#D9C5A8] font-sans">
                {isUk
                  ? "Підтвердження надійде протягом декількох хвилин. Au revoir!"
                  : "A confirmation will arrive shortly. Au revoir!"}
              </p>
            </div>
          ) : (
            <div
              className="rounded-2xl p-7 border"
              style={{ background: "#231610", borderColor: "#5C3020" }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                {[
                  { key: "name", label: isUk ? "Ваше ім'я" : "Your name", type: "text" },
                  { key: "date", label: isUk ? "Дата" : "Date", type: "date" },
                  { key: "time", label: isUk ? "Час" : "Time", type: "time" },
                  { key: "guests", label: isUk ? "Кількість гостей" : "Guests", type: "number" },
                ].map(({ key, label, type }) => (
                  <div key={key}>
                    <label className="block text-xs uppercase tracking-widest font-sans mb-2" style={{ color: accentGold }}>{label}</label>
                    <input
                      type={type}
                      value={(reservationData as Record<string, string>)[key] ?? ""}
                      onChange={(e) => setReservationData((d) => ({ ...d, [key]: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border text-sm text-[#F5F0E8] font-sans outline-none"
                      style={{ background: "#2E1D14", borderColor: "#5C3020" }}
                    />
                  </div>
                ))}
              </div>

              {/* Occasion */}
              <div className="mb-6">
                <label className="block text-xs uppercase tracking-widest font-sans mb-3" style={{ color: accentGold }}>
                  {isUk ? "Привід" : "Occasion"}
                </label>
                <div className="flex flex-wrap gap-2">
                  {occasions.map((o, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveOccasion(i)}
                      className="px-4 py-2 rounded-xl text-sm font-sans cursor-pointer transition-all border"
                      style={{
                        background: activeOccasion === i ? accentBurgundy : "transparent",
                        color: activeOccasion === i ? "#F5F0E8" : "#D9C5A8",
                        borderColor: activeOccasion === i ? accentBurgundy : "#5C3020",
                      }}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setReservationDone(true)}
                className="w-full py-4 rounded-xl font-bold font-sans text-[#1A0E0A] text-[15px] cursor-pointer hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                style={{ background: accentGold }}
              >
                <IconCheck className="w-5 h-5" />
                {isUk ? "Підтвердити бронювання" : "Confirm Reservation"}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Footer CTA ── */}
      <section className="py-16 px-6 text-center" style={{ background: "#0F0805" }}>
        <div className="max-w-xl mx-auto">
          <div className="w-12 h-px mx-auto mb-6" style={{ background: accentGold }} />
          <h2 className="text-3xl font-bold text-[#F5F0E8] mb-3 italic">
            "Pour yourself a seat."
          </h2>
          <p className="text-[#D9C5A8] font-sans mb-8 leading-relaxed">
            {isUk
              ? "Вул. Верхній Вал 12, Київ · Вт–Нд 17:00–02:00 · +380 44 987 6543"
              : "12 Verkhniy Val St, Kyiv · Tue–Sun 17:00–02:00 · +380 44 987 6543"}
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <button
              className="px-8 py-3.5 rounded-xl font-bold font-sans text-[15px] cursor-pointer hover:opacity-90 transition-opacity"
              style={{ background: accentBurgundy, color: "#F5F0E8" }}
            >
              {isUk ? "Забронювати стіл" : "Reserve a Table"}
            </button>
            <button
              className="px-7 py-3.5 rounded-xl font-sans text-[15px] cursor-pointer border hover:bg-[#C9952A]/5 transition-colors"
              style={{ borderColor: accentGold + "50", color: accentGold }}
            >
              {isUk ? "Переглянути події" : "See Events"}
            </button>
          </div>
          <div className="w-12 h-px mx-auto mt-8" style={{ background: accentGold }} />
        </div>
      </section>

    </div>
  );
}
