"use client";

import { useState } from "react";

export function CleanProDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  /* ── Price Calculator state ── */
  const [propertyType, setPropertyType] = useState<"apartment" | "house" | "office">("apartment");
  const [area, setArea] = useState(60);
  const [rooms, setRooms] = useState(2);
  const [extras, setExtras] = useState({ windows: false, carpet: false, appliances: false, balcony: false });
  const [eco, setEco] = useState(false);
  const [frequency, setFrequency] = useState<"once" | "weekly" | "biweekly" | "monthly">("once");

  /* ── FAQ state ── */
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  /* ── Calculate price ── */
  const baseRate = propertyType === "house" ? 12 : propertyType === "office" ? 10 : 8;
  let price = area * baseRate + rooms * 120;
  if (extras.windows) price += 350;
  if (extras.carpet) price += 500;
  if (extras.appliances) price += 400;
  if (extras.balcony) price += 250;
  if (eco) price = Math.round(price * 1.15);
  const discountMap = { once: 0, monthly: 0.1, biweekly: 0.15, weekly: 0.2 };
  const discount = discountMap[frequency];
  const finalPrice = Math.round(price * (1 - discount));

  /* ── Data ── */
  const navItems = isUk
    ? ["Послуги", "Ціни", "Про нас", "Відгуки", "Контакти"]
    : ["Services", "Pricing", "About", "Reviews", "Contact"];

  const services = [
    {
      emoji: "🧹",
      title: isUk ? "Регулярне прибирання" : "Regular Cleaning",
      desc: isUk
        ? "Щотижневе або двотижневе прибирання для підтримки чистоти"
        : "Weekly or bi-weekly cleaning to maintain a fresh home",
      price: isUk ? "від 800 ₴" : "from $40",
      duration: isUk ? "2-3 години" : "2-3 hours",
    },
    {
      emoji: "🫧",
      title: isUk ? "Генеральне прибирання" : "Deep Cleaning",
      desc: isUk
        ? "Ретельне очищення кожного куточка вашого дому"
        : "Thorough cleaning of every corner of your home",
      price: isUk ? "від 2000 ₴" : "from $100",
      duration: isUk ? "4-6 годин" : "4-6 hours",
    },
    {
      emoji: "🏗️",
      title: isUk ? "Після ремонту" : "Post-Construction",
      desc: isUk
        ? "Видалення будівельного пилу, залишків клею та фарби"
        : "Removal of construction dust, glue residue and paint",
      price: isUk ? "від 3000 ₴" : "from $150",
      duration: isUk ? "5-8 годин" : "5-8 hours",
    },
    {
      emoji: "🏢",
      title: isUk ? "Офісне прибирання" : "Office Cleaning",
      desc: isUk
        ? "Чисте робоче середовище для продуктивної команди"
        : "Clean workspace for a productive team",
      price: isUk ? "від 1200 ₴" : "from $60",
      duration: isUk ? "2-4 години" : "2-4 hours",
    },
    {
      emoji: "🛋️",
      title: isUk ? "Килими та м'які меблі" : "Carpet & Upholstery",
      desc: isUk
        ? "Глибоке чищення килимів, диванів та крісел"
        : "Deep cleaning of carpets, sofas and armchairs",
      price: isUk ? "від 600 ₴" : "from $30",
      duration: isUk ? "1-3 години" : "1-3 hours",
    },
    {
      emoji: "🪟",
      title: isUk ? "Миття вікон" : "Window Cleaning",
      desc: isUk
        ? "Кристально чисті вікна зсередини та ззовні"
        : "Crystal clear windows inside and out",
      price: isUk ? "від 400 ₴" : "from $20",
      duration: isUk ? "1-2 години" : "1-2 hours",
    },
  ];

  const steps = [
    {
      num: "1",
      emoji: "📱",
      title: isUk ? "Замовте онлайн" : "Book Online",
      desc: isUk ? "Заповніть форму або зателефонуйте нам" : "Fill out the form or give us a call",
    },
    {
      num: "2",
      emoji: "✅",
      title: isUk ? "Ми підтверджуємо" : "We Confirm",
      desc: isUk ? "Узгоджуємо час та деталі" : "We agree on time and details",
    },
    {
      num: "3",
      emoji: "🚐",
      title: isUk ? "Команда приїжджає" : "Team Arrives",
      desc: isUk ? "Професійна команда з обладнанням" : "Professional team with all equipment",
    },
    {
      num: "4",
      emoji: "🏠",
      title: isUk ? "Насолоджуйтесь чистотою" : "Enjoy Clean Home",
      desc: isUk ? "Розслабтесь у бездоганно чистому домі" : "Relax in a spotlessly clean home",
    },
  ];

  const team = [
    {
      name: isUk ? "Олена К." : "Olena K.",
      years: 8,
      spec: isUk ? "Генеральне прибирання" : "Deep Cleaning",
      avatar: "👩‍🔧",
    },
    {
      name: isUk ? "Марія Т." : "Maria T.",
      years: 5,
      spec: isUk ? "Офісне прибирання" : "Office Cleaning",
      avatar: "👩‍💼",
    },
    {
      name: isUk ? "Андрій В." : "Andriy V.",
      years: 6,
      spec: isUk ? "Після ремонту" : "Post-Construction",
      avatar: "👨‍🔧",
    },
  ];

  const reviews = [
    {
      name: isUk ? "Ірина М." : "Iryna M.",
      stars: 5,
      type: isUk ? "Генеральне прибирання" : "Deep Cleaning",
      date: "2026-03-10",
      text: isUk
        ? "Неймовірний результат! Квартира виглядає як нова. Команда працювала швидко та акуратно."
        : "Incredible result! The apartment looks brand new. The team worked quickly and neatly.",
    },
    {
      name: isUk ? "Олексій П." : "Oleksii P.",
      stars: 5,
      type: isUk ? "Після ремонту" : "Post-Construction",
      date: "2026-03-05",
      text: isUk
        ? "Після ремонту залишилося багато пилу. CleanPro впоралися на відмінно!"
        : "Lots of dust remained after renovation. CleanPro handled it perfectly!",
    },
    {
      name: isUk ? "Наталія С." : "Natalia S.",
      stars: 4,
      type: isUk ? "Регулярне прибирання" : "Regular Cleaning",
      date: "2026-02-28",
      text: isUk
        ? "Користуюся послугами вже пів року. Завжди вчасно та якісно."
        : "Been using the service for half a year. Always on time and high quality.",
    },
    {
      name: isUk ? "Дмитро Л." : "Dmytro L.",
      stars: 5,
      type: isUk ? "Офісне прибирання" : "Office Cleaning",
      date: "2026-02-20",
      text: isUk
        ? "Наш офіс завжди бездоганний. Рекомендую для бізнесу!"
        : "Our office is always spotless. Highly recommend for business!",
    },
  ];

  const faqs = [
    {
      q: isUk ? "Яка ваша політика скасування?" : "What is your cancellation policy?",
      a: isUk
        ? "Ви можете скасувати або перенести замовлення безкоштовно за 24 години до запланованого часу. Скасування менше ніж за 24 години може підлягати оплаті у розмірі 50%."
        : "You can cancel or reschedule for free up to 24 hours before the scheduled time. Cancellations less than 24 hours in advance may be subject to a 50% charge.",
    },
    {
      q: isUk ? "Які засоби ви використовуєте?" : "What cleaning products do you use?",
      a: isUk
        ? "Ми використовуємо професійні екологічні засоби, безпечні для дітей та домашніх тварин. За додаткову плату можна обрати повністю органічні засоби."
        : "We use professional eco-friendly products safe for children and pets. For an extra fee, you can choose fully organic products.",
    },
    {
      q: isUk ? "Чи є у вас страхування?" : "Do you have insurance?",
      a: isUk
        ? "Так, усі наші послуги покриваються повним страхуванням. У випадку пошкодження майна ми повністю компенсуємо збитки."
        : "Yes, all our services are covered by full insurance. In case of property damage, we fully compensate the losses.",
    },
    {
      q: isUk ? "Скільки часу займає прибирання?" : "How long does a cleaning take?",
      a: isUk
        ? "Тривалість залежить від типу послуги та площі приміщення. Стандартне прибирання квартири 60 м² займає приблизно 2-3 години."
        : "Duration depends on the service type and area size. A standard 60 m² apartment cleaning takes approximately 2-3 hours.",
    },
    {
      q: isUk ? "Чи потрібно мені бути вдома?" : "Do I need to be home during cleaning?",
      a: isUk
        ? "Ні, це не обов'язково. Ви можете залишити ключі або надати доступ. Усі наші працівники пройшли перевірку та мають рекомендації."
        : "No, it's not required. You can leave keys or provide access. All our employees are background-checked and have references.",
    },
  ];

  const toggleExtra = (key: keyof typeof extras) => {
    setExtras((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans overflow-x-hidden">
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-sky-100">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="text-xl font-bold text-sky-600 shrink-0">✨ CleanPro</div>
          <nav className="hidden md:flex items-center gap-5 text-sm text-gray-600">
            {navItems.map((item) => (
              <span key={item} className="hover:text-sky-600 cursor-pointer transition-colors">
                {item}
              </span>
            ))}
          </nav>
          <div className="flex items-center gap-3 shrink-0">
            <span className="hidden sm:inline-flex items-center gap-1 text-sm bg-sky-50 text-sky-700 px-3 py-1.5 rounded-full">
              📞 {isUk ? "+380 44 123 4567" : "+1 (555) 123-4567"}
            </span>
            <button className="bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors">
              {isUk ? "Замовити прибирання" : "Order Cleaning"}
            </button>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="bg-linear-to-br from-sky-50 via-white to-sky-100 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-lime-100 text-lime-700 text-xs font-semibold px-3 py-1 rounded-full mb-6">
            🌿 {isUk ? "Екологічно чисті засоби" : "Eco-Friendly Products"}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {isUk ? "Чистота без Зусиль" : "Effortless Cleanliness"}
          </h1>
          <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
            {isUk
              ? "Професійне прибирання вашого дому та офісу. Довірте чистоту експертам — ми подбаємо про кожен куточок."
              : "Professional cleaning for your home and office. Trust the experts with cleanliness — we take care of every corner."}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
            <input
              type="text"
              placeholder={isUk ? "Введіть вашу адресу..." : "Enter your address..."}
              className="w-full sm:w-80 px-5 py-3 rounded-full border border-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm"
            />
            <button className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-8 py-3 rounded-full transition-colors text-sm shrink-0">
              {isUk ? "Отримати оцінку" : "Get Estimate"}
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">🛡️ {isUk ? "Застраховано" : "Insured"}</span>
            <span className="flex items-center gap-1.5">🌿 {isUk ? "Екологічно" : "Eco-friendly"}</span>
            <span className="flex items-center gap-1.5">⭐ {isUk ? "Рейтинг 5 зірок" : "5-star rated"}</span>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">
            {isUk ? "Наші послуги" : "Our Services"}
          </h2>
          <p className="text-center text-gray-400 mb-10">
            {isUk ? "Повний спектр професійних клінінгових послуг" : "Full range of professional cleaning services"}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <div
                key={s.title}
                className="border border-sky-100 rounded-2xl p-6 hover:shadow-lg hover:border-sky-200 transition-all group"
              >
                <div className="text-4xl mb-4">{s.emoji}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-sky-600 transition-colors">
                  {s.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4">{s.desc}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold text-sky-600">{s.price}</span>
                  <span className="text-gray-400">⏱ {s.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Price Calculator ── */}
      <section className="py-16 px-4 bg-sky-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">
            {isUk ? "Калькулятор вартості" : "Price Calculator"}
          </h2>
          <p className="text-center text-gray-400 mb-10">
            {isUk ? "Розрахуйте приблизну вартість прибирання" : "Calculate the approximate cleaning cost"}
          </p>

          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 space-y-6">
            {/* Property type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {isUk ? "Тип приміщення" : "Property Type"}
              </label>
              <div className="flex gap-3">
                {(["apartment", "house", "office"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setPropertyType(t)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      propertyType === t
                        ? "bg-sky-500 text-white"
                        : "bg-sky-50 text-gray-600 hover:bg-sky-100"
                    }`}
                  >
                    {t === "apartment"
                      ? isUk ? "🏠 Квартира" : "🏠 Apartment"
                      : t === "house"
                        ? isUk ? "🏡 Будинок" : "🏡 House"
                        : isUk ? "🏢 Офіс" : "🏢 Office"}
                  </button>
                ))}
              </div>
            </div>

            {/* Area */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {isUk ? "Площа (м²)" : "Area (m²)"}: <span className="text-sky-600">{area}</span>
              </label>
              <input
                type="range"
                min={20}
                max={300}
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full accent-sky-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>20 m²</span>
                <span>300 m²</span>
              </div>
            </div>

            {/* Rooms */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {isUk ? "Кількість кімнат" : "Number of Rooms"}
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() => setRooms(n)}
                    className={`w-11 h-11 rounded-xl text-sm font-semibold transition-colors ${
                      rooms === n
                        ? "bg-sky-500 text-white"
                        : "bg-sky-50 text-gray-600 hover:bg-sky-100"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            {/* Extras */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {isUk ? "Додаткові послуги" : "Extra Services"}
              </label>
              <div className="grid grid-cols-2 gap-3">
                {([
                  { key: "windows" as const, label: isUk ? "🪟 Миття вікон" : "🪟 Windows" },
                  { key: "carpet" as const, label: isUk ? "🛋️ Килими" : "🛋️ Carpets" },
                  { key: "appliances" as const, label: isUk ? "🍳 Побутова техніка" : "🍳 Appliances" },
                  { key: "balcony" as const, label: isUk ? "🌅 Балкон" : "🌅 Balcony" },
                ]).map((item) => (
                  <button
                    key={item.key}
                    onClick={() => toggleExtra(item.key)}
                    className={`py-2.5 px-4 rounded-xl text-sm text-left font-medium transition-colors ${
                      extras[item.key]
                        ? "bg-sky-500 text-white"
                        : "bg-sky-50 text-gray-600 hover:bg-sky-100"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Eco toggle */}
            <div
              className="flex items-center justify-between bg-lime-50 border border-lime-200 rounded-xl p-4 cursor-pointer"
              onClick={() => setEco(!eco)}
            >
              <div>
                <span className="text-sm font-semibold text-lime-800">
                  🌿 {isUk ? "Екологічні засоби" : "Eco-Friendly Products"}
                </span>
                <p className="text-xs text-lime-600 mt-0.5">
                  {isUk ? "Безпечні для дітей та тварин (+15%)" : "Safe for kids & pets (+15%)"}
                </p>
              </div>
              <div
                className={`w-12 h-7 rounded-full flex items-center px-1 transition-colors ${
                  eco ? "bg-lime-500" : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    eco ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </div>
            </div>

            {/* Frequency */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {isUk ? "Частота" : "Frequency"}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {([
                  { key: "once" as const, label: isUk ? "Разово" : "One-time", disc: "" },
                  { key: "monthly" as const, label: isUk ? "Щомісяця" : "Monthly", disc: "-10%" },
                  { key: "biweekly" as const, label: isUk ? "Двічі/міс" : "Bi-weekly", disc: "-15%" },
                  { key: "weekly" as const, label: isUk ? "Щотижня" : "Weekly", disc: "-20%" },
                ]).map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setFrequency(f.key)}
                    className={`py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      frequency === f.key
                        ? "bg-sky-500 text-white"
                        : "bg-sky-50 text-gray-600 hover:bg-sky-100"
                    }`}
                  >
                    {f.label}
                    {f.disc && (
                      <span className={`block text-xs mt-0.5 ${frequency === f.key ? "text-sky-100" : "text-lime-600"}`}>
                        {f.disc}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Price display */}
            <div className="bg-linear-to-br from-sky-500 to-sky-600 rounded-2xl p-6 text-center text-white">
              <p className="text-sm opacity-80 mb-1">
                {isUk ? "Приблизна вартість" : "Estimated Price"}
              </p>
              <p className="text-4xl font-bold">
                {isUk ? `${finalPrice} ₴` : `$${finalPrice}`}
              </p>
              {discount > 0 && (
                <p className="text-xs mt-2 opacity-70 line-through">
                  {isUk ? `${price} ₴` : `$${price}`}
                </p>
              )}
              <button className="mt-4 bg-white text-sky-600 font-semibold px-8 py-2.5 rounded-full text-sm hover:bg-sky-50 transition-colors">
                {isUk ? "Замовити зараз" : "Book Now"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">
            {isUk ? "Як це працює" : "How It Works"}
          </h2>
          <p className="text-center text-gray-400 mb-12">
            {isUk ? "Чотири простих кроки до чистоти" : "Four simple steps to a clean space"}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 rounded-full bg-sky-500 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                  {s.num}
                </div>
                <div className="text-3xl mb-2">{s.emoji}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{s.title}</h3>
                <p className="text-sm text-gray-400">{s.desc}</p>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block text-sky-300 text-2xl mt-4">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Before / After ── */}
      <section className="py-16 px-4 bg-sky-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">
            {isUk ? "До та Після" : "Before & After"}
          </h2>
          <p className="text-center text-gray-400 mb-10">
            {isUk ? "Подивіться на різницю" : "See the difference"}
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="relative rounded-2xl overflow-hidden aspect-video bg-gray-300 flex items-center justify-center">
              <div className="absolute inset-0 bg-linear-to-br from-gray-400 to-gray-500 opacity-80" />
              <div className="relative text-center">
                <div className="text-6xl mb-2">😟</div>
                <span className="inline-block bg-black/40 text-white text-sm font-semibold px-4 py-1.5 rounded-full">
                  {isUk ? "До прибирання" : "Before Cleaning"}
                </span>
              </div>
              <div className="absolute top-3 left-3 text-xs bg-red-500 text-white px-2 py-0.5 rounded-full font-semibold">
                {isUk ? "ДО" : "BEFORE"}
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-video bg-sky-200 flex items-center justify-center">
              <div className="absolute inset-0 bg-linear-to-br from-sky-300 to-sky-400 opacity-80" />
              <div className="relative text-center">
                <div className="text-6xl mb-2">✨</div>
                <span className="inline-block bg-white/40 text-white text-sm font-semibold px-4 py-1.5 rounded-full">
                  {isUk ? "Після прибирання" : "After Cleaning"}
                </span>
              </div>
              <div className="absolute top-3 left-3 text-xs bg-lime-500 text-white px-2 py-0.5 rounded-full font-semibold">
                {isUk ? "ПІСЛЯ" : "AFTER"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">
            {isUk ? "Наша професійна команда" : "Our Professional Team"}
          </h2>
          <p className="text-center text-gray-400 mb-10">
            {isUk ? "Досвідчені та перевірені фахівці" : "Experienced and verified professionals"}
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            {team.map((t) => (
              <div
                key={t.name}
                className="text-center bg-sky-50 rounded-2xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="text-5xl mb-3">{t.avatar}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{t.name}</h3>
                <p className="text-sm text-sky-600 font-medium mb-1">{t.spec}</p>
                <p className="text-xs text-gray-400 mb-3">
                  {isUk ? `${t.years} років досвіду` : `${t.years} years experience`}
                </p>
                <span className="inline-flex items-center gap-1 text-xs bg-lime-100 text-lime-700 px-3 py-1 rounded-full font-semibold">
                  ✅ {isUk ? "Верифіковано" : "Verified"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Eco Commitment ── */}
      <section className="py-16 px-4 bg-lime-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-lime-900 mb-3">
            🌍 {isUk ? "Наш екологічний внесок" : "Our Eco Commitment"}
          </h2>
          <p className="text-center text-lime-700 mb-10">
            {isUk ? "Чистота для вашого дому та планети" : "Cleanliness for your home and the planet"}
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 text-center border border-lime-200">
              <div className="text-4xl mb-3">🏅</div>
              <h3 className="font-semibold text-lime-800 mb-2">
                {isUk ? "Сертифіковані засоби" : "Certified Products"}
              </h3>
              <p className="text-sm text-gray-500">
                {isUk
                  ? "Усі засоби мають екологічні сертифікати EU Ecolabel та Green Seal"
                  : "All products carry EU Ecolabel and Green Seal eco certifications"}
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center border border-lime-200">
              <div className="text-4xl mb-3">🧴</div>
              <h3 className="font-semibold text-lime-800 mb-2">
                {isUk ? "Натуральні компоненти" : "Natural Ingredients"}
              </h3>
              <p className="text-sm text-gray-500">
                {isUk
                  ? "Рослинні ПАР, ефірні олії та мінеральні абразиви без хімії"
                  : "Plant-based surfactants, essential oils, and mineral abrasives — no harsh chemicals"}
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center border border-lime-200">
              <div className="text-4xl mb-3">♻️</div>
              <h3 className="font-semibold text-lime-800 mb-2">
                {isUk ? "Зменшення відходів" : "Waste Reduction"}
              </h3>
              <p className="text-sm text-gray-500">
                {isUk
                  ? "На 80% менше одноразового пластику. Використовуємо багаторазові мікрофібри"
                  : "80% less single-use plastic. We use reusable microfiber cloths"}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <span className="bg-lime-100 text-lime-800 text-xs font-semibold px-4 py-2 rounded-full">
              🌱 {isUk ? "Нульові викиди CO₂" : "Zero CO₂ Emissions"}
            </span>
            <span className="bg-lime-100 text-lime-800 text-xs font-semibold px-4 py-2 rounded-full">
              💧 {isUk ? "Економія води на 40%" : "40% Water Savings"}
            </span>
            <span className="bg-lime-100 text-lime-800 text-xs font-semibold px-4 py-2 rounded-full">
              🐾 {isUk ? "Безпечно для тварин" : "Pet Safe"}
            </span>
          </div>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">
            {isUk ? "Відгуки клієнтів" : "Client Reviews"}
          </h2>
          <p className="text-center text-gray-400 mb-10">
            {isUk ? "Що кажуть наші клієнти" : "What our clients say"}
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {reviews.map((r, i) => (
              <div key={i} className="border border-sky-100 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-semibold text-gray-900">{r.name}</p>
                    <p className="text-xs text-sky-500">{r.type}</p>
                  </div>
                  <span className="text-xs text-gray-400">{r.date}</span>
                </div>
                <div className="text-yellow-400 mb-2">
                  {"★".repeat(r.stars)}{"☆".repeat(5 - r.stars)}
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 px-4 bg-sky-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">
            {isUk ? "Часті запитання" : "Frequently Asked Questions"}
          </h2>
          <p className="text-center text-gray-400 mb-10">
            {isUk ? "Відповіді на популярні питання" : "Answers to common questions"}
          </p>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl border border-sky-100 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between gap-4"
                >
                  <span className="font-medium text-gray-800 text-sm">{f.q}</span>
                  <span className="text-sky-500 text-xl shrink-0">
                    {openFaq === i ? "−" : "+"}
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 text-sm text-gray-500 leading-relaxed">{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-gray-900 text-gray-300 py-14 px-4">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="text-xl font-bold text-white mb-3">✨ CleanPro</div>
            <p className="text-sm text-gray-400 leading-relaxed">
              {isUk
                ? "Професійний клінінговий сервіс з 2018 року. Довіряйте чистоту експертам."
                : "Professional cleaning service since 2018. Trust the experts with cleanliness."}
            </p>
            <div className="flex gap-3 mt-4 text-lg">
              <span className="cursor-pointer hover:text-white transition-colors">📘</span>
              <span className="cursor-pointer hover:text-white transition-colors">📸</span>
              <span className="cursor-pointer hover:text-white transition-colors">🐦</span>
              <span className="cursor-pointer hover:text-white transition-colors">▶️</span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-3">{isUk ? "Контакти" : "Contact"}</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <p>📞 {isUk ? "+380 44 123 4567" : "+1 (555) 123-4567"}</p>
              <p>✉️ hello@cleanpro.com</p>
              <p>📍 {isUk ? "вул. Хрещатик 1, Київ" : "123 Main St, New York"}</p>
            </div>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="text-white font-semibold mb-3">
              {isUk ? "Зони обслуговування" : "Service Areas"}
            </h4>
            <div className="space-y-1.5 text-sm text-gray-400">
              {(isUk
                ? ["Центр", "Поділ", "Оболонь", "Печерськ", "Голосіїв", "Дарниця"]
                : ["Manhattan", "Brooklyn", "Queens", "Bronx", "Staten Island", "Jersey City"]
              ).map((area) => (
                <p key={area}>{area}</p>
              ))}
            </div>
          </div>

          {/* Working Hours */}
          <div>
            <h4 className="text-white font-semibold mb-3">
              {isUk ? "Графік роботи" : "Working Hours"}
            </h4>
            <div className="space-y-1.5 text-sm text-gray-400">
              <p>{isUk ? "Пн–Пт: 07:00 – 21:00" : "Mon–Fri: 7:00 AM – 9:00 PM"}</p>
              <p>{isUk ? "Сб: 08:00 – 20:00" : "Sat: 8:00 AM – 8:00 PM"}</p>
              <p>{isUk ? "Нд: 09:00 – 18:00" : "Sun: 9:00 AM – 6:00 PM"}</p>
              <p className="mt-3 text-lime-400 text-xs font-semibold">
                🟢 {isUk ? "Термінове прибирання 24/7" : "Emergency cleaning 24/7"}
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© 2026 CleanPro. {isUk ? "Усі права захищені." : "All rights reserved."}</p>
          <div className="flex gap-4">
            <span className="hover:text-gray-300 cursor-pointer">
              {isUk ? "Політика конфіденційності" : "Privacy Policy"}
            </span>
            <span className="hover:text-gray-300 cursor-pointer">
              {isUk ? "Умови використання" : "Terms of Service"}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
