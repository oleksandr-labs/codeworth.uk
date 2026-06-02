"use client";

import { useState } from "react";

/* ── helpers ─────────────────────────────────────────────────────────── */

const t = (isUk: boolean, en: string, uk: string) => (isUk ? uk : en);

/* ── data ────────────────────────────────────────────────────────────── */

interface MealItem {
  emoji: string;
  name: { en: string; uk: string };
  cal: number;
  price: number;
  allergens: string[];
}

interface DayMenu {
  breakfast: MealItem[];
  lunch: MealItem[];
  dinner: MealItem[];
  snack: MealItem[];
}

const ALLERGEN_MAP: Record<string, { emoji: string; en: string; uk: string }> = {
  gluten: { emoji: "🌾", en: "Gluten", uk: "Глютен" },
  dairy: { emoji: "🥛", en: "Dairy", uk: "Молочне" },
  nuts: { emoji: "🥜", en: "Nuts", uk: "Горіхи" },
};

const WEEK_DAYS = [
  { key: "mon", en: "Monday", uk: "Понеділок" },
  { key: "tue", en: "Tuesday", uk: "Вівторок" },
  { key: "wed", en: "Wednesday", uk: "Середа" },
  { key: "thu", en: "Thursday", uk: "Четвер" },
  { key: "fri", en: "Friday", uk: "П'ятниця" },
];

const PLANS = [
  {
    id: "fit",
    emoji: "🏃",
    name: { en: "Fit", uk: "Фіт" },
    cal: 1500,
    price: 280,
    protein: 120,
    carbs: 130,
    fat: 50,
    sample: {
      en: "Egg-white omelette · Grilled chicken salad · Steamed fish & veggies · Greek yogurt",
      uk: "Омлет з білків · Салат з курки-гриль · Риба на парі з овочами · Грецький йогурт",
    },
  },
  {
    id: "balance",
    emoji: "⚖️",
    name: { en: "Balance", uk: "Баланс" },
    cal: 2000,
    price: 350,
    protein: 140,
    carbs: 200,
    fat: 70,
    sample: {
      en: "Avocado toast · Turkey wrap & soup · Salmon bowl · Fruit & nuts",
      uk: "Тост з авокадо · Рол з індичкою та суп · Боул з лососем · Фрукти та горіхи",
    },
  },
  {
    id: "muscle",
    emoji: "💪",
    name: { en: "Muscle", uk: "Масл" },
    cal: 2800,
    price: 420,
    protein: 200,
    carbs: 280,
    fat: 90,
    sample: {
      en: "Protein pancakes · Double chicken & rice · Steak & sweet potato · Protein shake & banana",
      uk: "Протеїнові панкейки · Подвійна курка з рисом · Стейк та батат · Протеїн-шейк та банан",
    },
  },
];

const DAILY_MENU: Record<string, DayMenu> = {
  mon: {
    breakfast: [
      { emoji: "🥣", name: { en: "Oatmeal & Berries", uk: "Вівсянка з ягодами" }, cal: 320, price: 89, allergens: ["gluten"] },
      { emoji: "🥑", name: { en: "Avocado Toast", uk: "Тост з авокадо" }, cal: 380, price: 109, allergens: ["gluten"] },
      { emoji: "🍳", name: { en: "Egg-White Omelette", uk: "Білковий омлет" }, cal: 250, price: 95, allergens: ["dairy"] },
    ],
    lunch: [
      { emoji: "🥗", name: { en: "Grilled Chicken Salad", uk: "Салат з курки-гриль" }, cal: 420, price: 149, allergens: [] },
      { emoji: "🍲", name: { en: "Lentil Soup & Bread", uk: "Суп з сочевиці та хліб" }, cal: 380, price: 129, allergens: ["gluten"] },
      { emoji: "🥙", name: { en: "Turkey Wrap", uk: "Рол з індичкою" }, cal: 450, price: 139, allergens: ["gluten", "dairy"] },
    ],
    dinner: [
      { emoji: "🐟", name: { en: "Steamed Salmon & Veggies", uk: "Лосось на парі з овочами" }, cal: 480, price: 189, allergens: [] },
      { emoji: "🍗", name: { en: "Herb Chicken & Quinoa", uk: "Курка з травами та кіноа" }, cal: 520, price: 169, allergens: [] },
      { emoji: "🥘", name: { en: "Veggie Curry & Rice", uk: "Овочеве карі з рисом" }, cal: 440, price: 145, allergens: [] },
    ],
    snack: [
      { emoji: "🍎", name: { en: "Fruit Bowl", uk: "Фруктова миска" }, cal: 150, price: 69, allergens: [] },
      { emoji: "🥜", name: { en: "Trail Mix", uk: "Горіхова суміш" }, cal: 220, price: 79, allergens: ["nuts"] },
    ],
  },
  tue: {
    breakfast: [
      { emoji: "🥞", name: { en: "Protein Pancakes", uk: "Протеїнові панкейки" }, cal: 360, price: 99, allergens: ["gluten", "dairy"] },
      { emoji: "🫐", name: { en: "Smoothie Bowl", uk: "Смузі-боул" }, cal: 290, price: 109, allergens: ["nuts"] },
      { emoji: "🧇", name: { en: "Whole-Grain Waffle", uk: "Цільнозернова вафля" }, cal: 340, price: 95, allergens: ["gluten"] },
    ],
    lunch: [
      { emoji: "🍱", name: { en: "Bento Box", uk: "Бенто-бокс" }, cal: 500, price: 159, allergens: [] },
      { emoji: "🥒", name: { en: "Greek Salad & Hummus", uk: "Грецький салат і хумус" }, cal: 350, price: 125, allergens: [] },
      { emoji: "🌯", name: { en: "Falafel Wrap", uk: "Рол з фалафелем" }, cal: 420, price: 135, allergens: ["gluten"] },
    ],
    dinner: [
      { emoji: "🥩", name: { en: "Lean Steak & Sweet Potato", uk: "Стейк та батат" }, cal: 560, price: 199, allergens: [] },
      { emoji: "🍝", name: { en: "Zucchini Pasta & Pesto", uk: "Паста з кабачків та песто" }, cal: 380, price: 149, allergens: ["nuts"] },
      { emoji: "🐔", name: { en: "Chicken Stir-Fry", uk: "Курка стір-фрай" }, cal: 460, price: 159, allergens: [] },
    ],
    snack: [
      { emoji: "🥛", name: { en: "Greek Yogurt & Honey", uk: "Грецький йогурт з медом" }, cal: 180, price: 65, allergens: ["dairy"] },
      { emoji: "🍌", name: { en: "Banana & Peanut Butter", uk: "Банан з арахісовою пастою" }, cal: 250, price: 75, allergens: ["nuts"] },
    ],
  },
  wed: {
    breakfast: [
      { emoji: "🍳", name: { en: "Veggie Omelette", uk: "Овочевий омлет" }, cal: 310, price: 99, allergens: ["dairy"] },
      { emoji: "🥐", name: { en: "Whole-Grain Croissant", uk: "Цільнозерновий круасан" }, cal: 350, price: 89, allergens: ["gluten", "dairy"] },
      { emoji: "🥤", name: { en: "Green Smoothie", uk: "Зелений смузі" }, cal: 220, price: 85, allergens: [] },
    ],
    lunch: [
      { emoji: "🍛", name: { en: "Chickpea Curry Bowl", uk: "Боул з нутовим карі" }, cal: 460, price: 139, allergens: [] },
      { emoji: "🥗", name: { en: "Tuna Nicoise Salad", uk: "Салат Нісуаз з тунцем" }, cal: 410, price: 155, allergens: [] },
      { emoji: "🥖", name: { en: "Avocado & Shrimp Toast", uk: "Тост з авокадо та креветками" }, cal: 390, price: 145, allergens: ["gluten"] },
    ],
    dinner: [
      { emoji: "🍣", name: { en: "Poke Bowl", uk: "Поке-боул" }, cal: 490, price: 179, allergens: [] },
      { emoji: "🥘", name: { en: "Turkey Meatballs & Bulgur", uk: "Фрикадельки з індички та булгур" }, cal: 530, price: 165, allergens: ["gluten"] },
      { emoji: "🐟", name: { en: "Cod & Roasted Veggies", uk: "Тріска з печеними овочами" }, cal: 430, price: 175, allergens: [] },
    ],
    snack: [
      { emoji: "🥕", name: { en: "Veggie Sticks & Hummus", uk: "Овочеві палички з хумусом" }, cal: 160, price: 65, allergens: [] },
      { emoji: "🫒", name: { en: "Olives & Cheese Plate", uk: "Оливки та сирна тарілка" }, cal: 200, price: 85, allergens: ["dairy"] },
    ],
  },
  thu: {
    breakfast: [
      { emoji: "🥣", name: { en: "Chia Pudding & Mango", uk: "Чіа-пудинг з манго" }, cal: 280, price: 99, allergens: [] },
      { emoji: "🍳", name: { en: "Scrambled Eggs & Spinach", uk: "Скрембл зі шпинатом" }, cal: 300, price: 95, allergens: ["dairy"] },
      { emoji: "🥑", name: { en: "Acai Bowl", uk: "Асаї-боул" }, cal: 340, price: 115, allergens: ["nuts"] },
    ],
    lunch: [
      { emoji: "🍲", name: { en: "Minestrone & Focaccia", uk: "Мінестроне та фокача" }, cal: 430, price: 135, allergens: ["gluten"] },
      { emoji: "🥗", name: { en: "Quinoa & Roasted Veg Salad", uk: "Салат з кіноа та печеними овочами" }, cal: 390, price: 145, allergens: [] },
      { emoji: "🌮", name: { en: "Fish Taco Bowl", uk: "Тако-боул з рибою" }, cal: 470, price: 155, allergens: [] },
    ],
    dinner: [
      { emoji: "🍗", name: { en: "Lemon Herb Chicken", uk: "Курка з лимоном та травами" }, cal: 500, price: 165, allergens: [] },
      { emoji: "🥘", name: { en: "Stuffed Bell Peppers", uk: "Фаршировані перці" }, cal: 420, price: 149, allergens: [] },
      { emoji: "🐟", name: { en: "Grilled Trout & Asparagus", uk: "Форель-гриль зі спаржею" }, cal: 460, price: 185, allergens: [] },
    ],
    snack: [
      { emoji: "🍫", name: { en: "Dark Chocolate & Almonds", uk: "Чорний шоколад та мигдаль" }, cal: 210, price: 75, allergens: ["nuts", "dairy"] },
      { emoji: "🍎", name: { en: "Apple & Cinnamon Chips", uk: "Яблучні чипси з корицею" }, cal: 130, price: 59, allergens: [] },
    ],
  },
  fri: {
    breakfast: [
      { emoji: "🥞", name: { en: "Banana Oat Pancakes", uk: "Бананово-вівсяні панкейки" }, cal: 370, price: 99, allergens: ["gluten"] },
      { emoji: "🫐", name: { en: "Berry Parfait", uk: "Ягідний парфе" }, cal: 300, price: 105, allergens: ["dairy"] },
      { emoji: "🥑", name: { en: "Smashed Avo & Poached Egg", uk: "Авокадо-тост з яйцем-пашот" }, cal: 400, price: 119, allergens: ["gluten"] },
    ],
    lunch: [
      { emoji: "🍱", name: { en: "Buddha Bowl", uk: "Будда-боул" }, cal: 480, price: 149, allergens: [] },
      { emoji: "🥗", name: { en: "Caesar with Grilled Shrimp", uk: "Цезар з креветками-гриль" }, cal: 420, price: 165, allergens: ["gluten", "dairy"] },
      { emoji: "🍛", name: { en: "Sweet Potato Dal", uk: "Дал з бататом" }, cal: 400, price: 129, allergens: [] },
    ],
    dinner: [
      { emoji: "🥩", name: { en: "Grass-Fed Beef & Broccoli", uk: "Яловичина з броколі" }, cal: 540, price: 195, allergens: [] },
      { emoji: "🐟", name: { en: "Mediterranean Sea Bass", uk: "Середземноморський сібас" }, cal: 470, price: 189, allergens: [] },
      { emoji: "🍝", name: { en: "Whole-Wheat Pasta Primavera", uk: "Цільнозернова паста Прімавера" }, cal: 430, price: 155, allergens: ["gluten", "dairy"] },
    ],
    snack: [
      { emoji: "🥤", name: { en: "Protein Shake", uk: "Протеїновий шейк" }, cal: 200, price: 79, allergens: ["dairy"] },
      { emoji: "🥕", name: { en: "Carrot Cake Energy Balls", uk: "Енергетичні кульки «Морквяний торт»" }, cal: 180, price: 69, allergens: ["nuts"] },
    ],
  },
};

const REVIEWS = [
  {
    name: "Olena K.",
    plan: { en: "Fit Plan", uk: "План Фіт" },
    rating: 5,
    text: {
      en: "Lost 4 kg in 3 weeks! The meals are delicious and I never feel hungry. Best healthy delivery I've tried.",
      uk: "Скинула 4 кг за 3 тижні! Їжа смачна, і я ніколи не відчуваю голод. Найкраща здорова доставка.",
    },
    emoji: "🏃‍♀️",
  },
  {
    name: "Dmytro S.",
    plan: { en: "Muscle Plan", uk: "План Масл" },
    rating: 5,
    text: {
      en: "Perfect macros for my training schedule. High-quality protein in every meal. Gained lean muscle without meal prepping!",
      uk: "Ідеальні макроси для моїх тренувань. Якісний протеїн у кожній страві. Набрав м'язову масу без готування!",
    },
    emoji: "💪",
  },
  {
    name: "Iryna M.",
    plan: { en: "Balance Plan", uk: "План Баланс" },
    rating: 4,
    text: {
      en: "Great variety every week. Love the fresh ingredients and portion sizes. Delivery is always on time.",
      uk: "Чудова різноманітність щотижня. Люблю свіжі інгредієнти та розміри порцій. Доставка завжди вчасно.",
    },
    emoji: "⚖️",
  },
];

const FARMS = [
  { name: { en: "Sunny Fields Farm", uk: "Ферма «Сонячні Поля»" }, emoji: "🌻", desc: { en: "Organic vegetables & greens", uk: "Органічні овочі та зелень" } },
  { name: { en: "Golden Grain Co.", uk: "«Золоте Зерно»" }, emoji: "🌾", desc: { en: "Whole grains & legumes", uk: "Цільні зерна та бобові" } },
  { name: { en: "Green Valley Dairy", uk: "«Зелена Долина»" }, emoji: "🐄", desc: { en: "Grass-fed dairy & eggs", uk: "Молочні продукти та яйця" } },
  { name: { en: "Ocean Fresh", uk: "«Океан Фреш»" }, emoji: "🐟", desc: { en: "Sustainably caught seafood", uk: "Риба та морепродукти" } },
];

const STEPS = [
  { emoji: "📋", title: { en: "Choose Plan", uk: "Оберіть план" }, desc: { en: "Pick the plan that matches your goals and lifestyle", uk: "Оберіть план, що відповідає вашим цілям" } },
  { emoji: "🎨", title: { en: "Customize Menu", uk: "Налаштуйте меню" }, desc: { en: "Swap meals, exclude allergens, set preferences", uk: "Замінюйте страви, виключайте алергени" } },
  { emoji: "👨‍🍳", title: { en: "We Cook Fresh", uk: "Ми готуємо свіже" }, desc: { en: "Our chefs prepare your meals daily from local ingredients", uk: "Наші шефи готують щодня зі свіжих інгредієнтів" } },
  { emoji: "🚚", title: { en: "Delivered to Your Door", uk: "Доставка до дверей" }, desc: { en: "Chilled meals arrive every morning before 8 AM", uk: "Охолоджені страви прибувають щоранку до 8:00" } },
];

/* ── cart item type ───────────────────────────────────────────────────── */

interface CartItem {
  id: string;
  emoji: string;
  name: string;
  cal: number;
  price: number;
  qty: number;
  protein: number;
}

/* ── component ───────────────────────────────────────────────────────── */

export function GoodFoodDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  /* state */
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activeDay, setActiveDay] = useState("mon");
  const [excludedAllergens, setExcludedAllergens] = useState<string[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  /* nutrition calculator */
  const [calcHeight, setCalcHeight] = useState(170);
  const [calcWeight, setCalcWeight] = useState(70);
  const [calcGoal, setCalcGoal] = useState<"lose" | "maintain" | "gain">("maintain");
  const [calcActivity, setCalcActivity] = useState<"low" | "moderate" | "high">("moderate");

  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);
  const cartSubtotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCalories = cartItems.reduce((s, i) => s + i.cal * i.qty, 0);
  const cartProtein = cartItems.reduce((s, i) => s + i.protein * i.qty, 0);
  const deliveryFee = cartSubtotal >= 500 ? 0 : 49;
  const discount = promoApplied ? Math.round(cartSubtotal * 0.1) : 0;
  const cartTotal = cartSubtotal + deliveryFee - discount;

  /* helpers */
  const addToCart = (item: MealItem) => {
    const id = `${item.name.en}-${item.cal}`;
    const name = t(isUk, item.name.en, item.name.uk);
    setCartItems((prev) => {
      const existing = prev.find((c) => c.id === id);
      if (existing) return prev.map((c) => (c.id === id ? { ...c, qty: c.qty + 1 } : c));
      return [...prev, { id, emoji: item.emoji, name, cal: item.cal, price: item.price, qty: 1, protein: Math.round(item.cal * 0.12) }];
    });
  };

  const removeFromCart = (id: string) => setCartItems((prev) => prev.filter((c) => c.id !== id));
  const updateQty = (id: string, delta: number) =>
    setCartItems((prev) => prev.map((c) => (c.id === id ? { ...c, qty: Math.max(1, c.qty + delta) } : c)));

  const toggleAllergen = (key: string) =>
    setExcludedAllergens((prev) => (prev.includes(key) ? prev.filter((a) => a !== key) : [...prev, key]));

  const filterMeals = (meals: MealItem[]) =>
    meals.filter((m) => !m.allergens.some((a) => excludedAllergens.includes(a)));

  const dayMenu = DAILY_MENU[activeDay];

  /* nutrition calculator logic */
  const bmr = 10 * calcWeight + 6.25 * calcHeight - 5 * 28 + 5;
  const activityFactor = calcActivity === "low" ? 1.2 : calcActivity === "moderate" ? 1.55 : 1.9;
  const tdee = Math.round(bmr * activityFactor);
  const recommended = calcGoal === "lose" ? tdee - 400 : calcGoal === "gain" ? tdee + 400 : tdee;
  const suggestedPlan = recommended <= 1700 ? "fit" : recommended <= 2400 ? "balance" : "muscle";

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* ── header ─────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-green-100">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
          <span className="text-xl font-bold text-green-600">🥗 GoodFood</span>

          <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
            <span className="hover:text-green-600 cursor-pointer">{t(isUk, "Menu", "Меню")}</span>
            <span className="hover:text-green-600 cursor-pointer">{t(isUk, "How It Works", "Як це працює")}</span>
            <span className="hover:text-green-600 cursor-pointer">{t(isUk, "Plans", "Плани")}</span>
            <span className="hover:text-green-600 cursor-pointer">{t(isUk, "Reviews", "Відгуки")}</span>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowCart(!showCart)}
              className="relative text-2xl cursor-pointer"
              aria-label={t(isUk, "Cart", "Кошик")}
            >
              🛒
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-orange-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors cursor-pointer">
              {t(isUk, "Order Now", "Замовити")}
            </button>
          </div>
        </div>
      </header>

      {/* ── hero ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-linear-to-br from-green-50 via-white to-orange-50 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
              {t(isUk, "Healthy Food Delivered", "Здорова Їжа з Доставкою")}
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-lg">
              {t(
                isUk,
                "Balanced meals, fresh ingredients, and perfect macros — delivered to your door every day.",
                "Збалансовані страви, свіжі інгредієнти та ідеальні макроси — щодня до ваших дверей."
              )}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto md:mx-0">
              <input
                type="text"
                placeholder={t(isUk, "Your delivery address…", "Ваша адреса доставки…")}
                className="flex-1 px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
              />
              <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full transition-colors shrink-0 cursor-pointer">
                {t(isUk, "See Menu", "Дивитися меню")}
              </button>
            </div>
          </div>
          <div className="flex-1 text-center text-6xl md:text-8xl leading-relaxed select-none" aria-hidden="true">
            🥗🥙🥑
            <br />
            🍱🥤🫑
          </div>
        </div>
      </section>

      {/* ── weekly meal plans ────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-2">{t(isUk, "Weekly Meal Plans", "Тижневі плани харчування")}</h2>
          <p className="text-center text-gray-500 mb-10">{t(isUk, "Choose a plan that fits your goals", "Оберіть план під ваші цілі")}</p>

          <div className="grid md:grid-cols-3 gap-6">
            {PLANS.map((plan) => (
              <div
                key={plan.id}
                className="border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-shadow bg-linear-to-br from-white to-green-50"
              >
                <div className="text-4xl mb-3">{plan.emoji}</div>
                <h3 className="text-xl font-bold text-green-700">{t(isUk, plan.name.en, plan.name.uk)}</h3>
                <p className="text-sm text-gray-500 mt-1">{plan.cal} {t(isUk, "cal / day", "ккал / день")}</p>

                <div className="mt-4 flex gap-3 text-center text-xs">
                  <div className="flex-1 bg-green-100 rounded-lg py-2">
                    <div className="font-bold text-green-700">{plan.protein}g</div>
                    <div className="text-gray-500">{t(isUk, "Protein", "Білки")}</div>
                  </div>
                  <div className="flex-1 bg-orange-100 rounded-lg py-2">
                    <div className="font-bold text-orange-600">{plan.carbs}g</div>
                    <div className="text-gray-500">{t(isUk, "Carbs", "Вуглеводи")}</div>
                  </div>
                  <div className="flex-1 bg-yellow-100 rounded-lg py-2">
                    <div className="font-bold text-yellow-600">{plan.fat}g</div>
                    <div className="text-gray-500">{t(isUk, "Fat", "Жири")}</div>
                  </div>
                </div>

                <p className="mt-4 text-sm text-gray-600 italic">{t(isUk, plan.sample.en, plan.sample.uk)}</p>

                <div className="mt-5 flex items-end justify-between">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-sm text-gray-500 ml-1">{t(isUk, "₴/day", "₴/день")}</span>
                  </div>
                  <button className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors cursor-pointer">
                    {t(isUk, "Start Plan", "Обрати план")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── daily menu (interactive) ─────────────────────────────── */}
      <section className="py-16 bg-green-50/50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-2">{t(isUk, "Daily Menu", "Щоденне меню")}</h2>
          <p className="text-center text-gray-500 mb-8">
            {t(isUk, "Pick your meals for each day", "Обирайте страви на кожен день")}
          </p>

          {/* day tabs */}
          <div className="flex justify-center gap-2 mb-6 flex-wrap">
            {WEEK_DAYS.map((day) => (
              <button
                key={day.key}
                onClick={() => setActiveDay(day.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                  activeDay === day.key
                    ? "bg-green-600 text-white"
                    : "bg-white text-gray-600 hover:bg-green-100 border border-gray-200"
                }`}
              >
                {t(isUk, day.en, day.uk)}
              </button>
            ))}
          </div>

          {/* allergen filter */}
          <div className="flex justify-center gap-3 mb-8 flex-wrap">
            <span className="text-sm font-medium text-gray-500">{t(isUk, "Exclude:", "Виключити:")}</span>
            {Object.entries(ALLERGEN_MAP).map(([key, info]) => (
              <button
                key={key}
                onClick={() => toggleAllergen(key)}
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer border ${
                  excludedAllergens.includes(key)
                    ? "bg-red-100 text-red-700 border-red-300"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                }`}
              >
                {info.emoji} {t(isUk, info.en, info.uk)}
              </button>
            ))}
          </div>

          {/* meal categories */}
          {(["breakfast", "lunch", "dinner", "snack"] as const).map((mealType) => {
            const meals = filterMeals(dayMenu[mealType]);
            const labels: Record<string, { en: string; uk: string }> = {
              breakfast: { en: "🌅 Breakfast", uk: "🌅 Сніданок" },
              lunch: { en: "☀️ Lunch", uk: "☀️ Обід" },
              dinner: { en: "🌙 Dinner", uk: "🌙 Вечеря" },
              snack: { en: "🍏 Snack", uk: "🍏 Перекус" },
            };
            return (
              <div key={mealType} className="mb-8">
                <h3 className="text-lg font-bold mb-3 text-gray-800">
                  {t(isUk, labels[mealType].en, labels[mealType].uk)}
                </h3>
                {meals.length === 0 ? (
                  <p className="text-sm text-gray-400 italic">
                    {t(isUk, "No options match your filters", "Немає варіантів за вашими фільтрами")}
                  </p>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {meals.map((meal, idx) => (
                      <div
                        key={idx}
                        className="bg-white rounded-xl p-4 flex items-start gap-3 border border-gray-100 hover:shadow-md transition-shadow"
                      >
                        <span className="text-3xl shrink-0">{meal.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm truncate">{t(isUk, meal.name.en, meal.name.uk)}</h4>
                          <div className="flex items-center gap-2 mt-1 flex-wrap">
                            <span className="text-xs text-gray-500">{meal.cal} {t(isUk, "cal", "ккал")}</span>
                            {meal.allergens.map((a) => (
                              <span key={a} className="text-xs bg-yellow-50 text-yellow-700 px-1.5 py-0.5 rounded" title={ALLERGEN_MAP[a]?.en}>
                                {ALLERGEN_MAP[a]?.emoji}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <span className="font-bold text-green-700 text-sm">{meal.price} ₴</span>
                            <button
                              onClick={() => addToCart(meal)}
                              className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold px-3 py-1 rounded-full transition-colors cursor-pointer"
                            >
                              {t(isUk, "Add to Cart", "Додати")}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── cart panel ────────────────────────────────────────────── */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/30" onClick={() => setShowCart(false)} />
          <div className="relative w-full max-w-md bg-white h-full overflow-y-auto shadow-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">🛒 {t(isUk, "Your Cart", "Ваш кошик")}</h2>
              <button onClick={() => setShowCart(false)} className="text-2xl text-gray-400 hover:text-gray-600 cursor-pointer">✕</button>
            </div>

            {cartItems.length === 0 ? (
              <p className="text-gray-400 text-center py-12">{t(isUk, "Cart is empty", "Кошик порожній")}</p>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                      <span className="text-2xl shrink-0">{item.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{item.name}</h4>
                        <p className="text-xs text-gray-500">{item.cal} {t(isUk, "cal", "ккал")} · ~{item.protein}g {t(isUk, "protein", "білка")}</p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button onClick={() => updateQty(item.id, -1)} className="w-6 h-6 rounded-full bg-gray-200 text-xs font-bold cursor-pointer">−</button>
                        <span className="text-sm font-semibold w-5 text-center">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="w-6 h-6 rounded-full bg-gray-200 text-xs font-bold cursor-pointer">+</button>
                      </div>
                      <span className="text-sm font-bold text-green-700 shrink-0">{item.price * item.qty} ₴</span>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 text-lg cursor-pointer">✕</button>
                    </div>
                  ))}
                </div>

                {/* dietary summary */}
                <div className="bg-green-50 rounded-xl p-4 mb-6">
                  <h4 className="font-semibold text-sm mb-2 text-green-700">{t(isUk, "Dietary Summary", "Дієтична інформація")}</h4>
                  <div className="flex gap-4 text-xs">
                    <div className="text-center">
                      <div className="font-bold text-lg text-gray-900">{cartCalories}</div>
                      <div className="text-gray-500">{t(isUk, "cal", "ккал")}</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg text-gray-900">{cartProtein}g</div>
                      <div className="text-gray-500">{t(isUk, "protein", "білка")}</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg text-gray-900">{cartItems.length}</div>
                      <div className="text-gray-500">{t(isUk, "items", "страв")}</div>
                    </div>
                  </div>
                </div>

                {/* promo */}
                <div className="flex gap-2 mb-6">
                  <input
                    type="text"
                    value={promo}
                    onChange={(e) => { setPromo(e.target.value); setPromoApplied(false); }}
                    placeholder={t(isUk, "Promo code", "Промокод")}
                    className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                  <button
                    onClick={() => { if (promo.trim().length > 0) setPromoApplied(true); }}
                    className="bg-green-100 text-green-700 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-green-200 transition-colors cursor-pointer"
                  >
                    {t(isUk, "Apply", "Застосувати")}
                  </button>
                </div>
                {promoApplied && (
                  <p className="text-xs text-green-600 mb-4">✅ {t(isUk, "10% discount applied!", "Знижка 10% застосована!")}</p>
                )}

                {/* totals */}
                <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">{t(isUk, "Subtotal", "Підсумок")}</span>
                    <span className="font-medium">{cartSubtotal} ₴</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">{t(isUk, "Delivery", "Доставка")}</span>
                    <span className="font-medium">{deliveryFee === 0 ? t(isUk, "Free", "Безкоштовно") : `${deliveryFee} ₴`}</span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>{t(isUk, "Discount", "Знижка")}</span>
                      <span>−{discount} ₴</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-100">
                    <span>{t(isUk, "Total", "Разом")}</span>
                    <span className="text-green-700">{cartTotal} ₴</span>
                  </div>
                </div>

                <button className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-full transition-colors cursor-pointer">
                  {t(isUk, "Checkout", "Оформити замовлення")} →
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── nutrition calculator ──────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-2">{t(isUk, "Nutrition Calculator", "Калькулятор харчування")}</h2>
          <p className="text-center text-gray-500 mb-10">
            {t(isUk, "Find your ideal daily calories and plan", "Визначте ідеальну добову калорійність та план")}
          </p>

          <div className="bg-linear-to-br from-green-50 to-orange-50 rounded-2xl p-6 md:p-8">
            <div className="grid sm:grid-cols-2 gap-6">
              {/* height */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t(isUk, "Height (cm)", "Зріст (см)")}</label>
                <input
                  type="range"
                  min={140}
                  max={210}
                  value={calcHeight}
                  onChange={(e) => setCalcHeight(Number(e.target.value))}
                  className="w-full accent-green-600"
                />
                <span className="text-sm font-bold text-green-700">{calcHeight} {t(isUk, "cm", "см")}</span>
              </div>

              {/* weight */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t(isUk, "Weight (kg)", "Вага (кг)")}</label>
                <input
                  type="range"
                  min={40}
                  max={150}
                  value={calcWeight}
                  onChange={(e) => setCalcWeight(Number(e.target.value))}
                  className="w-full accent-green-600"
                />
                <span className="text-sm font-bold text-green-700">{calcWeight} {t(isUk, "kg", "кг")}</span>
              </div>

              {/* goal */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t(isUk, "Goal", "Ціль")}</label>
                <div className="flex gap-2">
                  {(["lose", "maintain", "gain"] as const).map((g) => {
                    const labels: Record<string, { en: string; uk: string }> = {
                      lose: { en: "Lose", uk: "Схуднути" },
                      maintain: { en: "Maintain", uk: "Підтримати" },
                      gain: { en: "Gain", uk: "Набрати" },
                    };
                    return (
                      <button
                        key={g}
                        onClick={() => setCalcGoal(g)}
                        className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                          calcGoal === g ? "bg-green-600 text-white" : "bg-white text-gray-600 border border-gray-200"
                        }`}
                      >
                        {t(isUk, labels[g].en, labels[g].uk)}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* activity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t(isUk, "Activity Level", "Рівень активності")}</label>
                <div className="flex gap-2">
                  {(["low", "moderate", "high"] as const).map((a) => {
                    const labels: Record<string, { en: string; uk: string }> = {
                      low: { en: "Low", uk: "Низький" },
                      moderate: { en: "Moderate", uk: "Середній" },
                      high: { en: "High", uk: "Високий" },
                    };
                    return (
                      <button
                        key={a}
                        onClick={() => setCalcActivity(a)}
                        className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                          calcActivity === a ? "bg-orange-500 text-white" : "bg-white text-gray-600 border border-gray-200"
                        }`}
                      >
                        {t(isUk, labels[a].en, labels[a].uk)}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* result */}
            <div className="mt-8 text-center bg-white rounded-xl p-6 border border-green-200">
              <p className="text-sm text-gray-500 mb-1">{t(isUk, "Recommended Daily Intake", "Рекомендована добова норма")}</p>
              <p className="text-4xl font-extrabold text-green-700">{recommended} <span className="text-lg font-medium text-gray-500">{t(isUk, "cal", "ккал")}</span></p>
              <p className="mt-3 text-sm text-gray-600">
                {t(isUk, "We recommend the", "Ми рекомендуємо план")}{" "}
                <span className="font-bold text-orange-600">
                  {PLANS.find((p) => p.id === suggestedPlan)
                    ? t(isUk, PLANS.find((p) => p.id === suggestedPlan)!.name.en, PLANS.find((p) => p.id === suggestedPlan)!.name.uk)
                    : ""}
                </span>{" "}
                {t(isUk, "plan for your goals.", "для ваших цілей.")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── how it works ─────────────────────────────────────────── */}
      <section className="py-16 bg-green-50/50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">{t(isUk, "How It Works", "Як це працює")}</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step, idx) => (
              <div key={idx} className="text-center bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-4xl mb-3">{step.emoji}</div>
                <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-green-600 text-white text-xs font-bold mb-3">
                  {idx + 1}
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{t(isUk, step.title.en, step.title.uk)}</h3>
                <p className="text-sm text-gray-500">{t(isUk, step.desc.en, step.desc.uk)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ingredients sourcing ─────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-2">{t(isUk, "100% Fresh, Local Ingredients", "100% свіжі, місцеві інгредієнти")}</h2>
          <p className="text-gray-500 mb-10">{t(isUk, "We partner with trusted local farms", "Ми співпрацюємо з перевіреними місцевими фермами")}</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FARMS.map((farm, idx) => (
              <div key={idx} className="bg-linear-to-br from-green-50 to-white rounded-2xl p-6 border border-green-100 hover:shadow-md transition-shadow">
                <div className="text-4xl mb-3">{farm.emoji}</div>
                <h3 className="font-bold text-gray-900">{t(isUk, farm.name.en, farm.name.uk)}</h3>
                <p className="text-sm text-gray-500 mt-1">{t(isUk, farm.desc.en, farm.desc.uk)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── reviews ──────────────────────────────────────────────── */}
      <section className="py-16 bg-green-50/50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">{t(isUk, "What Our Clients Say", "Що кажуть наші клієнти")}</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((review, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{review.emoji}</span>
                  <div>
                    <h4 className="font-bold text-gray-900">{review.name}</h4>
                    <p className="text-xs text-orange-600 font-medium">{t(isUk, review.plan.en, review.plan.uk)}</p>
                  </div>
                </div>
                <div className="text-yellow-400 text-sm mb-2">
                  {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{t(isUk, review.text.en, review.text.uk)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── footer ───────────────────────────────────────────────── */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-6xl mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* brand */}
          <div>
            <span className="text-xl font-bold text-white">🥗 GoodFood</span>
            <p className="text-sm mt-2 text-gray-400">
              {t(isUk, "Healthy meals, delivered daily.", "Здорова їжа, щодня до дверей.")}
            </p>
            <div className="flex gap-3 mt-4 text-lg">
              <span className="cursor-pointer hover:text-white" title="Instagram">📸</span>
              <span className="cursor-pointer hover:text-white" title="Facebook">👍</span>
              <span className="cursor-pointer hover:text-white" title="Telegram">✈️</span>
              <span className="cursor-pointer hover:text-white" title="TikTok">🎵</span>
            </div>
          </div>

          {/* contact */}
          <div>
            <h4 className="font-bold text-white mb-3">{t(isUk, "Contact", "Контакти")}</h4>
            <p className="text-sm">📞 +380 44 123 45 67</p>
            <p className="text-sm mt-1">📧 hello@goodfood.ua</p>
            <p className="text-sm mt-1">⏰ 08:00 – 22:00</p>
          </div>

          {/* delivery zones */}
          <div>
            <h4 className="font-bold text-white mb-3">{t(isUk, "Delivery Zones", "Зони доставки")}</h4>
            <ul className="text-sm space-y-1">
              <li>{t(isUk, "Kyiv — city center", "Київ — центр міста")}</li>
              <li>{t(isUk, "Kyiv — suburbs", "Київ — передмістя")}</li>
              <li>{t(isUk, "Brovary", "Бровари")}</li>
              <li>{t(isUk, "Irpin & Bucha", "Ірпінь та Буча")}</li>
            </ul>
          </div>

          {/* allergen info */}
          <div>
            <h4 className="font-bold text-white mb-3">{t(isUk, "Allergen Info", "Алергени")}</h4>
            <ul className="text-sm space-y-1">
              <li>🌾 {t(isUk, "Gluten-free options available", "Є безглютенові варіанти")}</li>
              <li>🥛 {t(isUk, "Dairy-free options available", "Є безлактозні варіанти")}</li>
              <li>🥜 {t(isUk, "Nut-free options available", "Є варіанти без горіхів")}</li>
              <li>🌿 {t(isUk, "Vegan meals marked", "Веганські страви позначені")}</li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 mt-10 pt-6 border-t border-gray-800 text-center text-xs text-gray-500">
          © 2026 GoodFood — {t(isUk, "Healthy Food Delivery", "Доставка Здорової Їжі")} · {t(isUk, "Demo by", "Демо від")}{" "}
          <span className="text-green-400 font-medium">Codeworth</span>
        </div>
      </footer>
    </div>
  );
}
