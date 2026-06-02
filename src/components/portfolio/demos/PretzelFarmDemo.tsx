"use client";

import { useState } from "react";

/* ───────────── constants ───────────── */

const COLORS = {
  charcoal: "#2C2C2C",
  charcoalLight: "#3D3D3D",
  wheat: "#F2E8D0",
  terra: "#A8450A",
  terraLight: "#D4714A",
  terraDark: "#7A3007",
  cream: "#FAF5EC",
  creamDark: "#F0E8D5",
  border: "#E0D0B0",
  text: "#1A1209",
  muted: "#6B4F2A",
  greenBadge: "#3D6B2C",
};

const MENU: Record<
  string,
  {
    emoji: string;
    nameEn: string;
    nameUk: string;
    weight: string;
    ingredientsEn: string[];
    ingredientsUk: string[];
    price: number;
    organic: boolean;
    popular?: boolean;
  }[]
> = {
  wheat: [
    {
      emoji: "🍞",
      nameEn: "White Country Loaf",
      nameUk: "Білий деревенський хліб",
      weight: "800 g",
      ingredientsEn: ["Flour", "Water", "Sourdough", "Salt"],
      ingredientsUk: ["Борошно", "Вода", "Закваска", "Сіль"],
      price: 85,
      organic: true,
      popular: true,
    },
    {
      emoji: "🫓",
      nameEn: "Brioche Pullman",
      nameUk: "Бріош Пульман",
      weight: "600 g",
      ingredientsEn: ["Flour", "Butter", "Eggs", "Milk", "Yeast", "Salt"],
      ingredientsUk: ["Борошно", "Масло", "Яйця", "Молоко", "Дріжджі", "Сіль"],
      price: 110,
      organic: false,
    },
    {
      emoji: "🌾",
      nameEn: "Spelt & Honey Loaf",
      nameUk: "Спельта з медом",
      weight: "750 g",
      ingredientsEn: ["Spelt flour", "Water", "Honey", "Sourdough", "Salt"],
      ingredientsUk: ["Спельтове борошно", "Вода", "Мед", "Закваска", "Сіль"],
      price: 105,
      organic: true,
    },
  ],
  rye: [
    {
      emoji: "🟫",
      nameEn: "Dark Rye Loaf",
      nameUk: "Темний житній хліб",
      weight: "900 g",
      ingredientsEn: ["Rye flour", "Water", "Sourdough", "Salt", "Caraway"],
      ingredientsUk: ["Житнє борошно", "Вода", "Закваска", "Сіль", "Кмин"],
      price: 92,
      organic: true,
      popular: true,
    },
    {
      emoji: "🍫",
      nameEn: "Rye & Cacao Loaf",
      nameUk: "Жито з какао",
      weight: "800 g",
      ingredientsEn: ["Rye flour", "Water", "Cacao nibs", "Sourdough", "Salt"],
      ingredientsUk: ["Житнє борошно", "Вода", "Какао-крупка", "Закваска", "Сіль"],
      price: 115,
      organic: false,
    },
    {
      emoji: "🫘",
      nameEn: "Borodinsky",
      nameUk: "Бородинський",
      weight: "850 g",
      ingredientsEn: ["Rye flour", "Coriander", "Molasses", "Sourdough"],
      ingredientsUk: ["Житнє борошно", "Коріандр", "Меляса", "Закваска"],
      price: 98,
      organic: true,
    },
  ],
  sourdough: [
    {
      emoji: "🏺",
      nameEn: "Classic Sourdough",
      nameUk: "Класична закваска",
      weight: "900 g",
      ingredientsEn: ["Flour", "Water", "Sourdough (48 h)", "Salt"],
      ingredientsUk: ["Борошно", "Вода", "Закваска (48 год)", "Сіль"],
      price: 120,
      organic: true,
      popular: true,
    },
    {
      emoji: "🧄",
      nameEn: "Roasted Garlic Sourdough",
      nameUk: "Закваска з часником",
      weight: "850 g",
      ingredientsEn: ["Flour", "Water", "Sourdough", "Roasted garlic", "Salt"],
      ingredientsUk: ["Борошно", "Вода", "Закваска", "Смажений часник", "Сіль"],
      price: 135,
      organic: false,
    },
    {
      emoji: "🫚",
      nameEn: "Olive & Thyme Sourdough",
      nameUk: "Маслини та чебрець",
      weight: "850 g",
      ingredientsEn: ["Flour", "Water", "Sourdough", "Olives", "Thyme", "Salt"],
      ingredientsUk: ["Борошно", "Вода", "Закваска", "Маслини", "Чебрець", "Сіль"],
      price: 145,
      organic: true,
    },
  ],
  pretzel: [
    {
      emoji: "🥨",
      nameEn: "Classic Pretzel",
      nameUk: "Класичний претцель",
      weight: "150 g",
      ingredientsEn: ["Flour", "Water", "Yeast", "Lye solution", "Coarse salt"],
      ingredientsUk: ["Борошно", "Вода", "Дріжджі", "Лужний розчин", "Крупна сіль"],
      price: 55,
      organic: false,
      popular: true,
    },
    {
      emoji: "🧀",
      nameEn: "Cheese Pretzel",
      nameUk: "Сирний претцель",
      weight: "170 g",
      ingredientsEn: ["Flour", "Water", "Yeast", "Emmental", "Lye", "Salt"],
      ingredientsUk: ["Борошно", "Вода", "Дріжджі", "Емменталь", "Луг", "Сіль"],
      price: 72,
      organic: false,
    },
    {
      emoji: "🌿",
      nameEn: "Herb Pretzel Sticks",
      nameUk: "Трав'яні палички",
      weight: "120 g",
      ingredientsEn: ["Flour", "Water", "Yeast", "Rosemary", "Lye", "Fleur de sel"],
      ingredientsUk: ["Борошно", "Вода", "Дріжджі", "Розмарин", "Луг", "Fleur de sel"],
      price: 62,
      organic: false,
    },
    {
      emoji: "🤎",
      nameEn: "Dark Malt Pretzel",
      nameUk: "Темний солодовий",
      weight: "160 g",
      ingredientsEn: ["Flour", "Dark malt", "Yeast", "Lye", "Sesame", "Salt"],
      ingredientsUk: ["Борошно", "Темний солод", "Дріжджі", "Луг", "Кунжут", "Сіль"],
      price: 68,
      organic: false,
    },
  ],
  pastry: [
    {
      emoji: "🥐",
      nameEn: "Sourdough Croissant",
      nameUk: "Круасан на заквасці",
      weight: "85 g",
      ingredientsEn: ["Flour", "Butter", "Sourdough", "Milk", "Salt", "Sugar"],
      ingredientsUk: ["Борошно", "Масло", "Закваска", "Молоко", "Сіль", "Цукор"],
      price: 78,
      organic: true,
      popular: true,
    },
    {
      emoji: "🧁",
      nameEn: "Rye Cardamom Bun",
      nameUk: "Житня булка з кардамоном",
      weight: "110 g",
      ingredientsEn: ["Rye flour", "Cardamom", "Butter", "Sourdough", "Honey"],
      ingredientsUk: ["Житнє борошно", "Кардамон", "Масло", "Закваска", "Мед"],
      price: 65,
      organic: true,
    },
    {
      emoji: "🥮",
      nameEn: "Spelt Kouign-Amann",
      nameUk: "Куньяман зі спельти",
      weight: "200 g",
      ingredientsEn: ["Spelt", "Butter", "Sugar", "Sea salt", "Sourdough"],
      ingredientsUk: ["Спельта", "Масло", "Цукор", "Морська сіль", "Закваска"],
      price: 95,
      organic: true,
    },
  ],
  seasonal: [
    {
      emoji: "🌱",
      nameEn: "Spring Nettle Loaf",
      nameUk: "Весняний хліб з кропивою",
      weight: "750 g",
      ingredientsEn: ["Flour", "Young nettles", "Sourdough", "Water", "Salt"],
      ingredientsUk: ["Борошно", "Молода кропива", "Закваска", "Вода", "Сіль"],
      price: 125,
      organic: true,
      popular: true,
    },
    {
      emoji: "🎃",
      nameEn: "Pumpkin Seed Rye",
      nameUk: "Жито з гарбузовим насінням",
      weight: "850 g",
      ingredientsEn: ["Rye flour", "Pumpkin seeds", "Sourdough", "Salt"],
      ingredientsUk: ["Житнє борошно", "Гарбузове насіння", "Закваска", "Сіль"],
      price: 115,
      organic: true,
    },
    {
      emoji: "🍂",
      nameEn: "Walnut & Fig Loaf",
      nameUk: "Волоський горіх та інжир",
      weight: "800 g",
      ingredientsEn: ["Flour", "Walnuts", "Dried figs", "Sourdough", "Salt"],
      ingredientsUk: ["Борошно", "Волоський горіх", "Сухий інжир", "Закваска", "Сіль"],
      price: 145,
      organic: false,
    },
  ],
};

const TABS = [
  { key: "wheat", en: "Wheat", uk: "Пшениця" },
  { key: "rye", en: "Rye", uk: "Жито" },
  { key: "sourdough", en: "Sourdough", uk: "Закваска" },
  { key: "pretzel", en: "Pretzel", uk: "Претцель" },
  { key: "pastry", en: "Pastry", uk: "Випічка" },
  { key: "seasonal", en: "Seasonal", uk: "Сезонне" },
];

const PLANS = [
  {
    key: "small",
    en: "Small",
    uk: "Малий",
    descEn: "1 loaf / week",
    descUk: "1 буханка / тиждень",
    price: 280,
  },
  {
    key: "family",
    en: "Family",
    uk: "Сімейний",
    descEn: "2 loaves / week",
    descUk: "2 буханки / тиждень",
    price: 520,
  },
  {
    key: "gourmet",
    en: "Gourmet",
    uk: "Гурман",
    descEn: "2 loaves + pastry / week",
    descUk: "2 буханки + випічка / тиждень",
    price: 720,
  },
];

const DAYS = [
  { key: "mon", en: "Mon", uk: "Пн" },
  { key: "wed", en: "Wed", uk: "Ср" },
  { key: "fri", en: "Fri", uk: "Пт" },
  { key: "sat", en: "Sat", uk: "Сб" },
];

const PROCESS_TIMELINE = [
  {
    time: "Mon 20:00",
    timeUk: "Пн 20:00",
    en: "Grain soaking",
    uk: "Замочування зерна",
    icon: "🌾",
  },
  {
    time: "Mon 22:00",
    timeUk: "Пн 22:00",
    en: "Sourdough activation",
    uk: "Активація закваски «Маруся»",
    icon: "🏺",
  },
  {
    time: "Tue 02:00",
    timeUk: "Вт 02:00",
    en: "Dough mixing & folding",
    uk: "Замішування та складання",
    icon: "🤲",
  },
  {
    time: "Tue 04:30",
    timeUk: "Вт 04:30",
    en: "Shaping & proofing",
    uk: "Формування та розстойка",
    icon: "🔲",
  },
  {
    time: "Tue 06:00",
    timeUk: "Вт 06:00",
    en: "Fresh from the oven",
    uk: "Гарячий з печі",
    icon: "🔥",
  },
];

const REVIEWS = [
  {
    name: "Андрій В.",
    nameEn: "Thomas R.",
    text: "Беру «Класичну закваску» кожного тижня вже 8 місяців. Смак незмінний — і це найкраще, що можна сказати про хліб.",
    textEn: "I've been getting the Classic Sourdough every week for 8 months. The taste never changes — that's the highest praise for a bread.",
    rating: 5,
  },
  {
    name: "Тетяна М.",
    nameEn: "Sarah L.",
    text: "Підписка — найкраще рішення. П'ятниця тепер асоціюється з запахом свіжого хліба і доброго ранку.",
    textEn: "The subscription was the best decision. Friday now means the smell of fresh bread and a good morning.",
    rating: 5,
  },
  {
    name: "Ресторан «Зерно»",
    nameEn: "The Grain Table",
    text: "Замовляємо 40 буханок щотижня для нашого ресторану. Стабільна якість, точна доставка, все як домовились.",
    textEn: "We order 40 loaves weekly for our restaurant. Consistent quality, precise delivery — exactly as agreed.",
    rating: 5,
  },
];

const SUB_BENEFITS = [
  { icon: "🎁", en: "First box — 10% off", uk: "Перша коробка — знижка 10%" },
  { icon: "🚚", en: "Free delivery always", uk: "Безкоштовна доставка завжди" },
  { icon: "🔀", en: "Change bread weekly", uk: "Змінюйте хліб щотижня" },
  { icon: "⏸️", en: "Pause any time", uk: "Пауза в будь-який момент" },
];

const MARQUEE_ITEMS = [
  { icon: "🌾", en: "Farm grain", uk: "Фермерське зерно" },
  { icon: "🏺", en: "7-year starter", uk: "Закваска 7 років" },
  { icon: "🔥", en: "Stone oven", uk: "Кам'яна піч" },
  { icon: "📦", en: "No additives", uk: "Без добавок" },
  { icon: "🚚", en: "Free delivery", uk: "Безкоштовна доставка" },
  { icon: "🤝", en: "40+ partners", uk: "40+ партнерів" },
];

function fmtPrice(uah: number, isUk: boolean): string {
  if (isUk) return `${uah} ₴`;
  return `£${Math.ceil(uah / 40 / 5) * 5}`;
}

function fmtPriceWeek(uah: number, isUk: boolean): string {
  if (isUk) return `${uah} ₴/тиж`;
  return `£${Math.ceil(uah / 40 / 5) * 5}/wk`;
}

/* ───────────── component ───────────── */

export function PretzelFarmDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [activeTab, setActiveTab] = useState("wheat");
  const [selectedPlan, setSelectedPlan] = useState("family");
  const [selectedDay, setSelectedDay] = useState("fri");
  const [breadChoice, setBreadChoice] = useState<"fixed" | "trust">("trust");
  const [subscribed, setSubscribed] = useState(false);

  const currentPlan = PLANS.find((p) => p.key === selectedPlan) ?? PLANS[1];

  const address = isUk ? "вул. Хліборобська, 7, Київ 04080" : "7 Mill Lane, Bristol BS3 4TP";
  const phone = isUk ? "+38 (050) 765-43-21" : "+44 117 456 7890";

  return (
    <div
      style={{ backgroundColor: COLORS.wheat, color: COLORS.text, fontFamily: "'Georgia', serif", minHeight: "100vh" }}
    >
      {/* ── Hero ── */}
      <div style={{ backgroundColor: COLORS.charcoal }} className="relative overflow-hidden">
        {/* Subtle grain texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, #F2E8D0 0px, #F2E8D0 1px, transparent 1px, transparent 8px), repeating-linear-gradient(90deg, #F2E8D0 0px, #F2E8D0 1px, transparent 1px, transparent 8px)",
          }}
        />
        {/* Terra top accent gradient */}
        <div
          style={{
            height: 4,
            background: `linear-gradient(90deg, ${COLORS.terraDark}, ${COLORS.terra}, ${COLORS.terraLight})`,
          }}
        />

        <div className="relative px-6 pt-10 pb-12">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">

            {/* Left: text column */}
            <div className="flex-1 max-w-2xl">
              <div className="flex items-center gap-3 mb-5">
                <div style={{ height: 1, flex: 1, maxWidth: 40, backgroundColor: "rgba(168,69,10,0.5)" }} />
                <p
                  style={{ color: COLORS.terraLight, letterSpacing: "0.35em" }}
                  className="text-xs uppercase font-bold shrink-0"
                >
                  {isUk ? "Ремісничий хліб з ферми" : "Artisan Farm Bakery"}
                </p>
                <div style={{ height: 1, flex: 1, maxWidth: 40, backgroundColor: "rgba(168,69,10,0.5)" }} />
              </div>

              <h1
                className="text-6xl font-bold mb-3"
                style={{ color: COLORS.wheat, letterSpacing: "-0.02em" }}
              >
                PretzelFarm
              </h1>
              <p style={{ color: "rgba(242,232,208,0.55)" }} className="text-lg mb-5 italic">
                {isUk ? "Живе тісто. Дикі дріжджі. Чесний хліб." : "Living dough. Wild yeast. Honest bread."}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {[
                  { en: "7+ years sourdough «Marusia»", uk: "7+ років закваска «Маруся»" },
                  { en: "100% no additives", uk: "100% без добавок" },
                  { en: "Farm sourced within 50 km", uk: "Пряма закупка 50 км" },
                ].map((s) => (
                  <span
                    key={s.en}
                    style={{
                      backgroundColor: "rgba(168,69,10,0.2)",
                      border: `1px solid rgba(168,69,10,0.4)`,
                      color: COLORS.terraLight,
                      borderRadius: 22,
                      padding: "5px 15px",
                      fontSize: 12,
                    }}
                  >
                    ✓ {isUk ? s.uk : s.en}
                  </span>
                ))}
              </div>

              {/* Bake timer */}
              <div
                style={{
                  backgroundColor: "rgba(242,232,208,0.05)",
                  border: `1px solid ${COLORS.terra}`,
                  borderRadius: 14,
                  display: "inline-flex",
                  gap: 20,
                  padding: "14px 24px",
                  alignItems: "center",
                }}
              >
                <div>
                  <p
                    style={{ color: COLORS.terraLight, fontSize: 10, letterSpacing: "0.15em" }}
                    className="uppercase mb-0.5"
                  >
                    {isUk ? "Наступна випічка" : "Next bake"}
                  </p>
                  <p style={{ color: COLORS.wheat }} className="text-lg font-bold">
                    06:00 — {isUk ? "через 4 год 20 хв" : "in 4h 20min"}
                  </p>
                </div>
                <div style={{ width: 1, height: 36, backgroundColor: "rgba(242,232,208,0.15)" }} />
                <div>
                  <p
                    style={{ color: COLORS.terraLight, fontSize: 10, letterSpacing: "0.15em" }}
                    className="uppercase mb-0.5"
                  >
                    {isUk ? "Сьогодні гарячий" : "Today's fresh"}
                  </p>
                  <p style={{ color: COLORS.wheat }} className="text-sm font-semibold">
                    {isUk ? "Закваска · Жито · Спельта" : "Sourdough · Rye · Spelt"}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: decorative sourdough jar element — hidden on mobile */}
            <div className="hidden md:flex shrink-0 flex-col items-center gap-3">
              {/* Concentric circles decoration */}
              <div
                style={{
                  position: "relative",
                  width: 200,
                  height: 200,
                }}
              >
                {[200, 160, 120, 80].map((size, i) => (
                  <div
                    key={size}
                    style={{
                      position: "absolute",
                      top: (200 - size) / 2,
                      left: (200 - size) / 2,
                      width: size,
                      height: size,
                      borderRadius: "50%",
                      border: `1.5px solid rgba(168,69,10,${0.12 + i * 0.1})`,
                    }}
                  />
                ))}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                  }}
                >
                  <div
                    style={{
                      width: 96,
                      height: 96,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${COLORS.terra} 0%, ${COLORS.terraDark} 100%)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 48,
                      boxShadow: `0 8px 32px rgba(168,69,10,0.5)`,
                    }}
                  >
                    🏺
                  </div>
                </div>
              </div>
              <div
                style={{
                  backgroundColor: "rgba(168,69,10,0.15)",
                  border: `1px solid rgba(168,69,10,0.35)`,
                  borderRadius: 10,
                  padding: "6px 16px",
                  textAlign: "center",
                }}
              >
                <p style={{ color: COLORS.terraLight, fontSize: 11, fontWeight: 700 }}>
                  {isUk ? "Закваска «Маруся»" : "Starter «Marusia»"}
                </p>
                <p style={{ color: "rgba(242,232,208,0.4)", fontSize: 10 }}>Est. 2018</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats Strip / Marquee ── */}
      <div
        style={{
          backgroundColor: COLORS.creamDark,
          borderTop: `1px solid ${COLORS.border}`,
          borderBottom: `1px solid ${COLORS.border}`,
          overflow: "hidden",
        }}
        className="px-0 py-3"
      >
        <div className="flex gap-0 items-center overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              style={{
                color: COLORS.terra,
                fontSize: 12,
                fontWeight: 700,
                whiteSpace: "nowrap",
                padding: "0 20px",
                borderRight: `1px solid ${COLORS.border}`,
                flexShrink: 0,
              }}
            >
              {item.icon} {isUk ? item.uk : item.en}
            </span>
          ))}
        </div>
      </div>

      {/* ── Маруся Story ── */}
      <div className="px-4 py-16 max-w-3xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Text */}
          <div>
            <p style={{ color: COLORS.terra, letterSpacing: "0.25em" }} className="text-xs uppercase font-bold mb-2">
              {isUk ? "Серце нашого хліба" : "The heart of our bread"}
            </p>
            <h2 style={{ color: COLORS.charcoal }} className="text-2xl font-bold mb-4 leading-snug">
              {isUk ? "Закваска «Маруся» — їй вже 7 років" : "«Marusia» Sourdough — 7 years old"}
            </h2>
            <p style={{ color: COLORS.muted }} className="text-sm leading-relaxed mb-4">
              {isUk
                ? "У 2018 році засновник Олексій Бондаренко вивів першу закваску з пшениці та дикого меду. Маруся — живий організм: вона росте, дихає і кожен день надає хлібу неповторний смак і аромат."
                : "In 2018, founder Oleksiy Bondarenko cultivated the first starter from wheat and wild honey. Marusia is a living organism: she grows, breathes and gives the bread its unique taste and aroma every single day."}
            </p>
            <p style={{ color: COLORS.muted }} className="text-sm leading-relaxed mb-6">
              {isUk
                ? "Закваска ніколи не спала більше 12 годин. Олексій бере її з собою навіть у відпустку."
                : "The starter has never slept more than 12 hours. Oleksiy even takes her on holiday."}
            </p>
            <blockquote
              style={{ borderLeft: `4px solid ${COLORS.terra}`, paddingLeft: 16, margin: 0 }}
            >
              <p style={{ color: COLORS.charcoal }} className="text-sm italic leading-relaxed mb-1">
                {isUk
                  ? "«Хліб — це дзеркало часу. Якщо поспішати, він це відчує.»"
                  : "«Bread is a mirror of time. If you rush, it will feel it.»"}
              </p>
              <cite
                style={{
                  color: COLORS.terra,
                  fontSize: 11,
                  fontStyle: "normal",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                }}
              >
                — {isUk ? "Олексій Бондаренко, засновник" : "Oleksiy Bondarenko, founder"}
              </cite>
            </blockquote>
          </div>

          {/* Right: dramatic jar composition */}
          <div className="relative flex flex-col gap-3">
            {/* Tall full-height jar placeholder */}
            <div
              style={{
                background: `linear-gradient(160deg, #C4A882 0%, #8B6914 100%)`,
                borderRadius: 20,
                minHeight: 260,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-end",
                paddingBottom: 24,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Background texture */}
              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, #fff 0px, #fff 1px, transparent 1px, transparent 12px)",
                }}
              />
              <span className="text-7xl relative z-10">🏺</span>
              <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 12, fontWeight: 600, marginTop: 8, position: "relative", zIndex: 1 }}>
                {isUk ? "Закваска «Маруся», 2018–" : "Starter «Marusia», 2018–"}
              </span>
              {/* Est. badge */}
              <div
                style={{
                  position: "absolute",
                  top: 14,
                  right: 14,
                  backgroundColor: COLORS.terra,
                  borderRadius: 8,
                  padding: "5px 10px",
                  zIndex: 2,
                }}
              >
                <span style={{ color: "#fff", fontSize: 10, fontWeight: 700 }}>Est. 2018</span>
              </div>
            </div>

            {/* Two smaller cards below */}
            <div className="grid grid-cols-2 gap-3">
              <div
                style={{
                  background: "linear-gradient(135deg, #6B4F2A 0%, #3D2910 100%)",
                  borderRadius: 14,
                  minHeight: 90,
                }}
                className="flex flex-col items-center justify-center gap-1"
              >
                <span className="text-3xl">🌾</span>
                <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 10 }}>
                  {isUk ? "Ферма Полісся" : "Polissia Farm"}
                </span>
              </div>
              <div
                style={{
                  background: "linear-gradient(135deg, #7A3007 0%, #A8450A 100%)",
                  borderRadius: 14,
                  minHeight: 90,
                }}
                className="flex flex-col items-center justify-center gap-1"
              >
                <span className="text-3xl">🔥</span>
                <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 10 }}>
                  {isUk ? "Піч 250°C" : "Oven 250°C"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Menu ── */}
      <div
        style={{
          backgroundColor: COLORS.creamDark,
          borderTop: `1px solid ${COLORS.border}`,
          borderBottom: `1px solid ${COLORS.border}`,
        }}
        className="px-4 py-12"
      >
        <div className="max-w-3xl mx-auto">
          <h2 style={{ color: COLORS.terra }} className="text-2xl font-bold mb-1 text-center">
            {isUk ? "Наш Хліб" : "Our Bread"}
          </h2>
          <p style={{ color: COLORS.muted }} className="text-sm text-center mb-7">
            {isUk ? "Борошно, вода, сіль — і час. Ніяких добавок." : "Flour, water, salt — and time. No additives."}
          </p>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-7">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  backgroundColor: activeTab === tab.key ? COLORS.terra : COLORS.cream,
                  color: activeTab === tab.key ? "#fff" : COLORS.muted,
                  border: `1px solid ${activeTab === tab.key ? COLORS.terra : COLORS.border}`,
                  borderRadius: 8,
                  padding: "6px 20px",
                  fontSize: 13,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontWeight: activeTab === tab.key ? 700 : 400,
                  transition: "all 0.15s",
                }}
              >
                {isUk ? tab.uk : tab.en}
              </button>
            ))}
          </div>

          {/* 2-col product card grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(MENU[activeTab] ?? []).map((item) => (
              <div
                key={item.nameEn}
                style={{
                  backgroundColor: COLORS.cream,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 16,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                {/* Gradient image header with emoji */}
                <div
                  style={{
                    height: 120,
                    background: `linear-gradient(135deg, #E8D8B8 0%, #C8A870 100%)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <span style={{ fontSize: 52 }}>{item.emoji}</span>
                  {/* Weight badge */}
                  <span
                    style={{
                      position: "absolute",
                      bottom: 8,
                      right: 10,
                      backgroundColor: "rgba(0,0,0,0.3)",
                      color: "rgba(255,255,255,0.9)",
                      borderRadius: 6,
                      padding: "2px 8px",
                      fontSize: 10,
                      fontWeight: 600,
                    }}
                  >
                    {item.weight}
                  </span>
                  {/* Corner badges */}
                  {item.popular && (
                    <span
                      style={{
                        position: "absolute",
                        top: 10,
                        left: 10,
                        backgroundColor: COLORS.terra,
                        color: "#fff",
                        borderRadius: 6,
                        padding: "3px 9px",
                        fontSize: 9,
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                      }}
                    >
                      {isUk ? "ХІТ" : "HIT"}
                    </span>
                  )}
                  {item.organic && (
                    <span
                      style={{
                        position: "absolute",
                        top: item.popular ? 30 : 10,
                        left: 10,
                        backgroundColor: COLORS.greenBadge,
                        color: "#fff",
                        borderRadius: 6,
                        padding: "3px 9px",
                        fontSize: 9,
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                      }}
                    >
                      {isUk ? "ЕКО" : "ECO"}
                    </span>
                  )}
                </div>

                {/* Card body */}
                <div className="p-4">
                  <p style={{ color: COLORS.terra }} className="font-bold text-sm mb-2">
                    {isUk ? item.nameUk : item.nameEn}
                  </p>

                  {/* Ingredient chips */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {(isUk ? item.ingredientsUk : item.ingredientsEn).map((ing) => (
                      <span
                        key={ing}
                        style={{
                          backgroundColor: COLORS.creamDark,
                          border: `1px solid ${COLORS.border}`,
                          color: COLORS.muted,
                          borderRadius: 20,
                          padding: "2px 9px",
                          fontSize: 10,
                        }}
                      >
                        {ing}
                      </span>
                    ))}
                  </div>

                  <p style={{ color: COLORS.terra }} className="text-base font-bold">
                    {fmtPrice(item.price, isUk)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Process Timeline ── */}
      <div style={{ backgroundColor: COLORS.charcoal }} className="px-4 py-14">
        <div className="max-w-2xl mx-auto">
          <p
            style={{ color: COLORS.terraLight, letterSpacing: "0.25em" }}
            className="text-xs uppercase font-bold text-center mb-1"
          >
            {isUk ? "Наш процес" : "Our process"}
          </p>
          <h2 style={{ color: COLORS.wheat }} className="text-xl font-bold text-center mb-2">
            {isUk ? "Від зерна до столу — 10+ годин" : "From grain to table — 10+ hours"}
          </h2>
          <p style={{ color: "rgba(242,232,208,0.4)" }} className="text-xs text-center mb-10">
            {isUk ? "Скорочень немає. Ніколи." : "No shortcuts. Ever."}
          </p>

          <div className="relative">
            <div
              className="absolute left-5 top-5 bottom-5 w-px"
              style={{ backgroundColor: COLORS.terra, opacity: 0.35 }}
            />
            <div className="flex flex-col gap-6">
              {PROCESS_TIMELINE.map((step, idx) => (
                <div key={step.en} className="flex items-start gap-4 relative">
                  <div
                    style={{
                      backgroundColor:
                        idx === PROCESS_TIMELINE.length - 1
                          ? COLORS.terra
                          : COLORS.charcoalLight,
                      border: `2px solid ${COLORS.terra}`,
                      borderRadius: "50%",
                      width: 42,
                      height: 42,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      fontSize: 17,
                      zIndex: 1,
                    }}
                  >
                    {step.icon}
                  </div>
                  <div className="pt-2">
                    <p style={{ color: COLORS.terraLight }} className="text-xs font-bold">
                      {isUk ? step.timeUk : step.time}
                    </p>
                    <p style={{ color: COLORS.wheat }} className="text-sm mt-0.5">
                      {isUk ? step.uk : step.en}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Corporate Orders ── */}
      <div className="px-4 py-14 max-w-3xl mx-auto">
        <div
          style={{
            background: `linear-gradient(135deg, ${COLORS.charcoal} 0%, #1A1209 100%)`,
            borderRadius: 22,
            overflow: "hidden",
            border: `1px solid ${COLORS.terra}`,
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
          }}
          className="relative"
        >
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(-45deg, #F2E8D0 0px, #F2E8D0 1px, transparent 1px, transparent 12px)",
            }}
          />
          <div className="relative p-8">
            <div className="flex flex-col sm:flex-row gap-6 items-center">
              {/* Text */}
              <div className="flex-1">
                <p
                  style={{ color: COLORS.terraLight, letterSpacing: "0.2em" }}
                  className="text-xs uppercase font-bold mb-2"
                >
                  {isUk ? "Для бізнесу" : "For business"}
                </p>
                <h3 style={{ color: COLORS.wheat }} className="text-xl font-bold mb-3">
                  {isUk ? "Корпоративні Замовлення" : "Corporate Orders"}
                </h3>
                <p style={{ color: "rgba(242,232,208,0.6)" }} className="text-sm mb-5 leading-relaxed">
                  {isUk
                    ? "Ресторани, кафе, офіси, готелі — доставляємо щотижня за фіксованим графіком. Спеціальні ціни від 20 буханок/тиждень."
                    : "Restaurants, cafés, offices, hotels — we deliver weekly on a fixed schedule. Special pricing from 20 loaves/week."}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {[
                    { en: "From 20 loaves/wk", uk: "Від 20 буханок/тиж" },
                    { en: "Contract pricing", uk: "Контрактні ціни" },
                    { en: "Fixed delivery", uk: "Фіксована доставка" },
                  ].map((b) => (
                    <span
                      key={b.en}
                      style={{
                        backgroundColor: "rgba(168,69,10,0.3)",
                        border: "1px solid rgba(168,69,10,0.5)",
                        color: COLORS.terraLight,
                        borderRadius: 22,
                        padding: "5px 14px",
                        fontSize: 12,
                      }}
                    >
                      {isUk ? b.uk : b.en}
                    </span>
                  ))}
                </div>
                <div className="flex gap-6">
                  {[
                    { num: "40+", label: isUk ? "партнерів" : "partners" },
                    { num: "600", label: isUk ? "буханок/тиж" : "loaves/wk" },
                  ].map((s) => (
                    <div key={s.num}>
                      <p style={{ color: COLORS.terra }} className="text-3xl font-bold">{s.num}</p>
                      <p style={{ color: "rgba(242,232,208,0.4)" }} className="text-xs">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: styled kitchen/restaurant visual circle */}
              <div
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, rgba(168,69,10,0.3) 0%, rgba(168,69,10,0.1) 100%)`,
                  border: `2px solid rgba(168,69,10,0.4)`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 4,
                  flexShrink: 0,
                }}
              >
                <span style={{ fontSize: 36 }}>🍽️</span>
                <span style={{ color: COLORS.terraLight, fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", textAlign: "center" }}>
                  {isUk ? "Ресторани" : "Restaurants"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Customer Reviews ── */}
      <div
        style={{
          backgroundColor: COLORS.creamDark,
          borderTop: `1px solid ${COLORS.border}`,
          borderBottom: `1px solid ${COLORS.border}`,
        }}
        className="px-4 py-14"
      >
        <div className="max-w-3xl mx-auto">
          <h2 style={{ color: COLORS.terra }} className="text-2xl font-bold text-center mb-10">
            {isUk ? "Наші клієнти кажуть" : "Our customers say"}
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {REVIEWS.map((r) => {
              const displayName = isUk ? r.name : r.nameEn;
              const initials = displayName
                .replace(/[«»"]/g, "")
                .split(/[\s.]+/)
                .filter(Boolean)
                .slice(0, 2)
                .map((w) => w[0])
                .join("")
                .toUpperCase();
              return (
                <div
                  key={r.name}
                  style={{
                    backgroundColor: COLORS.cream,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: 18,
                    boxShadow: "0 2px 12px rgba(168,69,10,0.06)",
                  }}
                  className="p-6 flex flex-col items-center text-center"
                >
                  {/* Avatar */}
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${COLORS.terra} 0%, ${COLORS.terraDark} 100%)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 12,
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>{initials}</span>
                  </div>
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <span key={i} style={{ color: COLORS.terra }} className="text-base">
                        ★
                      </span>
                    ))}
                  </div>
                  <p style={{ color: COLORS.text }} className="text-sm leading-relaxed mb-4 italic flex-1">
                    &ldquo;{isUk ? r.text : r.textEn}&rdquo;
                  </p>
                  <p style={{ color: COLORS.terra }} className="text-sm font-bold">
                    {displayName}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Subscription ── */}
      <div className="px-4 py-14 max-w-2xl mx-auto">
        <p
          style={{ color: COLORS.terra, letterSpacing: "0.25em" }}
          className="text-xs uppercase font-bold text-center mb-1"
        >
          {isUk ? "Щотижнева доставка" : "Weekly delivery"}
        </p>
        <h2 style={{ color: COLORS.terra }} className="text-2xl font-bold text-center mb-1">
          {isUk ? "Підписка «Твій Хліб»" : '"Your Bread" Subscription'}
        </h2>
        <p style={{ color: COLORS.muted }} className="text-sm text-center mb-8">
          {isUk ? "Свіжий хліб до дверей щотижня" : "Fresh bread delivered to your door weekly"}
        </p>

        {/* Benefits row */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 mb-8">
          {SUB_BENEFITS.map((b) => (
            <div
              key={b.en}
              style={{
                backgroundColor: COLORS.cream,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 12,
                padding: "14px 10px",
                textAlign: "center",
              }}
            >
              <div className="text-2xl mb-1">{b.icon}</div>
              <p style={{ color: COLORS.muted, fontSize: 11 }}>{isUk ? b.uk : b.en}</p>
            </div>
          ))}
        </div>

        {/* Plans — distinct visual treatment per plan */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 mb-6">
          {PLANS.map((plan) => {
            const isSelected = selectedPlan === plan.key;
            const planStyles: Record<string, { bg: string; text: string; badge?: string; badgeBg?: string }> = {
              small: {
                bg: isSelected ? "#FEF9F0" : COLORS.cream,
                text: COLORS.terra,
              },
              family: {
                bg: isSelected ? COLORS.terra : COLORS.cream,
                text: isSelected ? "#fff" : COLORS.terra,
                badge: isUk ? "ПОПУЛЯРНИЙ" : "POPULAR",
                badgeBg: "#F59E0B",
              },
              gourmet: {
                bg: isSelected ? COLORS.charcoal : COLORS.cream,
                text: isSelected ? COLORS.wheat : COLORS.terra,
                badge: isUk ? "ПРЕМІУМ" : "PREMIUM",
                badgeBg: COLORS.terraDark,
              },
            };
            const s = planStyles[plan.key];
            return (
              <button
                key={plan.key}
                onClick={() => setSelectedPlan(plan.key)}
                style={{
                  backgroundColor: s.bg,
                  border: `2px solid ${isSelected ? "transparent" : COLORS.border}`,
                  borderRadius: 16,
                  padding: "20px 14px",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  textAlign: "center",
                  position: "relative",
                  boxShadow: isSelected ? "0 6px 20px rgba(0,0,0,0.15)" : "none",
                  transition: "all 0.15s",
                  overflow: "hidden",
                }}
              >
                {s.badge && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      backgroundColor: s.badgeBg,
                      padding: "3px 0",
                    }}
                  >
                    <span style={{ color: "#fff", fontSize: 9, fontWeight: 700, letterSpacing: "0.15em" }}>
                      {s.badge}
                    </span>
                  </div>
                )}
                <div style={{ marginTop: s.badge ? 12 : 0 }}>
                  <p
                    style={{ color: s.text }}
                    className="font-bold text-base"
                  >
                    {isUk ? plan.uk : plan.en}
                  </p>
                  <p
                    style={{ color: isSelected ? (plan.key === "gourmet" ? "rgba(242,232,208,0.6)" : "rgba(255,255,255,0.7)") : COLORS.muted }}
                    className="text-xs mt-1"
                  >
                    {isUk ? plan.descUk : plan.descEn}
                  </p>
                  <p
                    style={{ color: isSelected ? (plan.key === "gourmet" ? COLORS.wheat : "#fff") : COLORS.terra }}
                    className="text-xl font-bold mt-2"
                  >
                    {fmtPriceWeek(plan.price, isUk)}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Delivery day */}
        <div
          style={{ backgroundColor: COLORS.cream, border: `1px solid ${COLORS.border}`, borderRadius: 14 }}
          className="p-5 mb-4"
        >
          <p style={{ color: COLORS.terra }} className="font-semibold text-sm mb-3">
            {isUk ? "День доставки" : "Delivery day"}
          </p>
          <div className="flex gap-2 flex-wrap">
            {DAYS.map((day) => (
              <button
                key={day.key}
                onClick={() => setSelectedDay(day.key)}
                style={{
                  backgroundColor: selectedDay === day.key ? COLORS.terra : "transparent",
                  color: selectedDay === day.key ? "#fff" : COLORS.muted,
                  border: `1.5px solid ${selectedDay === day.key ? COLORS.terra : COLORS.border}`,
                  borderRadius: 8,
                  padding: "8px 22px",
                  fontSize: 13,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontWeight: 600,
                  transition: "all 0.15s",
                }}
              >
                {isUk ? day.uk : day.en}
              </button>
            ))}
          </div>
        </div>

        {/* Bread choice */}
        <div
          style={{ backgroundColor: COLORS.cream, border: `1px solid ${COLORS.border}`, borderRadius: 14 }}
          className="p-5 mb-6"
        >
          <p style={{ color: COLORS.terra }} className="font-semibold text-sm mb-3">
            {isUk ? "Вибір хліба" : "Bread choice"}
          </p>
          <div className="flex gap-3 flex-wrap">
            {(
              [
                { key: "fixed", en: "Fixed selection", uk: "Моя добірка" },
                { key: "trust", en: "Trust the baker", uk: "Довіряю пекарю" },
              ] as const
            ).map((opt) => (
              <button
                key={opt.key}
                onClick={() => setBreadChoice(opt.key)}
                style={{
                  backgroundColor: breadChoice === opt.key ? COLORS.terra : "transparent",
                  color: breadChoice === opt.key ? "#fff" : COLORS.muted,
                  border: `1.5px solid ${breadChoice === opt.key ? COLORS.terra : COLORS.border}`,
                  borderRadius: 8,
                  padding: "8px 22px",
                  fontSize: 13,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "all 0.15s",
                }}
              >
                {isUk ? opt.uk : opt.en}
              </button>
            ))}
          </div>
          {breadChoice === "trust" && (
            <p style={{ color: COLORS.muted }} className="text-xs mt-3">
              {isUk
                ? "Щотижня пекар підбирає для вас найкращий сезонний хліб"
                : "Each week the baker selects the best seasonal loaf for you"}
            </p>
          )}
        </div>

        {/* Summary + subscribe */}
        {!subscribed ? (
          <div
            style={{ backgroundColor: COLORS.charcoal, borderRadius: 16 }}
            className="p-7 text-center"
          >
            <p style={{ color: "rgba(242,232,208,0.45)" }} className="text-xs mb-1">
              {isUk ? "Ваш план" : "Your plan"}
            </p>
            <p style={{ color: COLORS.wheat }} className="font-bold text-xl mb-1">
              {isUk ? currentPlan.uk : currentPlan.en} — {fmtPriceWeek(currentPlan.price, isUk)}
            </p>
            <p style={{ color: "rgba(242,232,208,0.35)" }} className="text-xs mb-6">
              {isUk
                ? `Доставка по ${DAYS.find((d) => d.key === selectedDay)?.uk} · ${breadChoice === "trust" ? "Довіряю пекарю" : "Моя добірка"}`
                : `Delivered ${DAYS.find((d) => d.key === selectedDay)?.en} · ${breadChoice === "trust" ? "Trust the baker" : "Fixed selection"}`}
            </p>
            <button
              onClick={() => setSubscribed(true)}
              style={{
                backgroundColor: COLORS.terra,
                color: "#fff",
                border: "none",
                borderRadius: 10,
                padding: "14px 40px",
                fontSize: 14,
                cursor: "pointer",
                fontFamily: "inherit",
                fontWeight: 700,
                letterSpacing: "0.05em",
                boxShadow: "0 4px 16px rgba(168,69,10,0.45)",
              }}
            >
              {isUk ? "Підписатися →" : "Subscribe Now →"}
            </button>
          </div>
        ) : (
          <div
            style={{ backgroundColor: "#F0FDF4", border: "1px solid #86EFAC", borderRadius: 16 }}
            className="p-7 text-center"
          >
            <div className="text-4xl mb-3">🥖</div>
            <p className="font-bold text-green-800 text-lg mb-1">
              {isUk ? "Підписку оформлено!" : "Subscription confirmed!"}
            </p>
            <p className="text-green-700 text-sm">
              {isUk
                ? "Перший хліб доставимо до вашого наступного обраного дня"
                : "First loaf arrives on your next selected day"}
            </p>
          </div>
        )}
      </div>

      {/* ── Footer ── */}
      <div
        style={{ backgroundColor: COLORS.charcoal, borderTop: `3px solid ${COLORS.terra}` }}
        className="px-4 py-10"
      >
        <div className="max-w-3xl mx-auto grid grid-cols-1 gap-8 sm:grid-cols-3 mb-8">
          {/* Brand */}
          <div>
            <h3 style={{ color: COLORS.wheat }} className="font-bold text-lg mb-2">
              PretzelFarm
            </h3>
            <p style={{ color: "rgba(242,232,208,0.4)" }} className="text-xs leading-relaxed">
              {isUk
                ? "Ремісничий хліб з живим тістом і серцем."
                : "Artisan bread with living dough and heart."}
            </p>
          </div>
          {/* Hours */}
          <div>
            <h4 style={{ color: COLORS.terra }} className="font-semibold text-sm mb-3">
              {isUk ? "Пікап і доставка" : "Pickup & delivery"}
            </h4>
            <p style={{ color: "rgba(242,232,208,0.5)" }} className="text-xs mb-1">
              {isUk ? "Пн–Сб: 06:00 – 13:00" : "Mon–Sat: 06:00 – 13:00"}
            </p>
            <p style={{ color: "rgba(242,232,208,0.5)" }} className="text-xs">
              {isUk ? "Нд: тільки доставка" : "Sun: delivery only"}
            </p>
          </div>
          {/* Contact */}
          <div>
            <h4 style={{ color: COLORS.terra }} className="font-semibold text-sm mb-3">
              {isUk ? "Контакти" : "Contact"}
            </h4>
            <p style={{ color: "rgba(242,232,208,0.5)" }} className="text-xs mb-1">{address}</p>
            <p style={{ color: "rgba(242,232,208,0.5)" }} className="text-xs">{phone}</p>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(242,232,208,0.08)" }} className="pt-5 text-center">
          <p style={{ color: "rgba(242,232,208,0.2)" }} className="text-xs">
            © 2024 PretzelFarm · {isUk ? "Зроблено з любов'ю і Марусею" : "Made with love and Marusia"}
          </p>
        </div>
      </div>
    </div>
  );
}
