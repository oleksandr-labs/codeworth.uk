"use client";

import { useState } from "react";
import { EmojiIcon } from "@/components/ui/EmojiIcon";

export function AutoProDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [activeService, setActiveService] = useState<string | null>(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState<Set<string>>(new Set());
  const [calcBrand, setCalcBrand] = useState("toyota");
  const [calcService, setCalcService] = useState("oil");
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingService, setBookingService] = useState<string | null>(null);
  const [bookingMake, setBookingMake] = useState("");
  const [bookingYear, setBookingYear] = useState("");
  const [bookingEngine, setBookingEngine] = useState("");
  const [bookingLocation, setBookingLocation] = useState<string | null>(null);
  const [bookingDate, setBookingDate] = useState<string | null>(null);
  const [bookingTime, setBookingTime] = useState<string | null>(null);
  const [bookingName, setBookingName] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingComment, setBookingComment] = useState("");
  const [bookingDone, setBookingDone] = useState(false);
  const [orderTrackerInput, setOrderTrackerInput] = useState("");
  const [orderTrackerResult, setOrderTrackerResult] = useState(false);
  const [activeLocation, setActiveLocation] = useState(0);

  const SERVICES = [
    { id: "to", emoji: "🔩", nameUk: "Технічне обслуговування", nameEn: "Maintenance (TO)", descUk: "Заміна масла, фільтрів, свічок. ТО 15/30/60 тис. км пакети", descEn: "Oil change, filters, spark plugs. 15k/30k/60k km packages", priceFrom: 1200 },
    { id: "tires", emoji: "🛞", nameUk: "Шиномонтаж", nameEn: "Tire Service", descUk: "Монтаж, балансування, зберігання шин", descEn: "Mounting, balancing, tire storage", priceFrom: 350 },
    { id: "brakes", emoji: "🔴", nameUk: "Гальмівна система", nameEn: "Brake System", descUk: "Заміна колодок, дисків, шлангів, прокачка", descEn: "Pad, disc, hose replacement, bleeding", priceFrom: 800 },
    { id: "body", emoji: "🚗", nameUk: "Кузовний ремонт", nameEn: "Body Repair", descUk: "Правка, зварювання, антикорозійна обробка", descEn: "Straightening, welding, anti-corrosion", priceFrom: 2500 },
    { id: "electro", emoji: "⚡", nameUk: "Електрика", nameEn: "Electrical", descUk: "Діагностика, стартери, генератори, сигналізація", descEn: "Diagnostics, starters, alternators, alarms", priceFrom: 600 },
    { id: "detailing", emoji: "✨", nameUk: "Детейлінг", nameEn: "Detailing", descUk: "Хімчистка салону, полірування, нанокераміка", descEn: "Interior cleaning, polishing, nano-ceramic", priceFrom: 2800 },
  ];

  const SYMPTOMS = [
    { id: "sound", labelUk: "Незвичайний звук", labelEn: "Strange noise", servicesUk: "Підшипники, гальма, підвіска", servicesEn: "Bearings, brakes, suspension" },
    { id: "smell", labelUk: "Дивний запах", labelEn: "Strange smell", servicesUk: "Масляна, гальмівна або охолоджуюча система", servicesEn: "Oil, brake or cooling system" },
    { id: "brake", labelUk: "Проблема з гальмами", labelEn: "Brake problem", servicesUk: "Гальмівні колодки, диски, суппорти", servicesEn: "Brake pads, discs, calipers" },
    { id: "start", labelUk: "Не заводиться", labelEn: "Won't start", servicesUk: "Акумулятор, стартер, паливна система", servicesEn: "Battery, starter, fuel system" },
    { id: "pull", labelUk: "Тягне в бік", labelEn: "Pulls to one side", servicesUk: "Розвал-збіжність, шини, рульова рейка", servicesEn: "Wheel alignment, tires, steering rack" },
    { id: "vibration", labelUk: "Вібрація при їзді", labelEn: "Vibration while driving", servicesUk: "Балансування коліс, підвіска, карданний вал", servicesEn: "Wheel balancing, suspension, driveshaft" },
    { id: "leak", labelUk: "Течія рідини", labelEn: "Fluid leak", servicesUk: "Ущільнення, прокладки, шланги", servicesEn: "Seals, gaskets, hoses" },
    { id: "engine", labelUk: "Горить лампочка", labelEn: "Warning light on", servicesUk: "Комп'ютерна діагностика, сенсори", servicesEn: "Computer diagnostics, sensors" },
    { id: "ac", labelUk: "Не працює кондиціонер", labelEn: "AC not working", servicesUk: "Заправка, компресор, фільтр салону", servicesEn: "Recharge, compressor, cabin filter" },
    { id: "suspension", labelUk: "Стук у підвісці", labelEn: "Suspension knock", servicesUk: "Амортизатори, кульові опори, тяги", servicesEn: "Shocks, ball joints, tie rods" },
    { id: "overheat", labelUk: "Перегрів двигуна", labelEn: "Engine overheating", servicesUk: "Система охолодження, термостат, помпа", servicesEn: "Cooling system, thermostat, water pump" },
    { id: "fuel", labelUk: "Великий расход палива", labelEn: "High fuel consumption", servicesUk: "Форсунки, свічки, лямбда-зонд", servicesEn: "Injectors, spark plugs, lambda sensor" },
  ];

  const PRICES: Record<string, Record<string, number>> = {
    toyota: { oil: 1200, brakes: 1800, tires: 400, timing: 4500 },
    bmw: { oil: 2400, brakes: 3200, tires: 600, timing: 8500 },
    vw: { oil: 1600, brakes: 2200, tires: 500, timing: 5500 },
    ford: { oil: 1400, brakes: 2000, tires: 450, timing: 4800 },
    hyundai: { oil: 1300, brakes: 1900, tires: 420, timing: 4200 },
    other: { oil: 1500, brakes: 2100, tires: 480, timing: 5000 },
  };

  const MECHANICS = [
    { emoji: "👨‍🔧", nameUk: "Сергій Майстренко", nameEn: "Serhii Maistrenko", specUk: "Двигун та електрика", specEn: "Engine & Electrical", expUk: "15 років", expEn: "15 years", cert: "Bosch Certified" },
    { emoji: "👨‍🔧", nameUk: "Олег Гнатенко", nameEn: "Oleh Hnatenko", specUk: "Ходова та підвіска", specEn: "Chassis & Suspension", expUk: "12 років", expEn: "12 years", cert: "Toyota Certified" },
    { emoji: "👨‍🔧", nameUk: "Василь Шевченко", nameEn: "Vasyl Shevchenko", specUk: "Кузовний ремонт", specEn: "Body Repair", expUk: "18 років", expEn: "18 years", cert: "PPG Certified" },
    { emoji: "👩‍🔧", nameUk: "Тетяна Борисенко", nameEn: "Tetiana Borysenko", specUk: "Діагностика та електроніка", specEn: "Diagnostics & Electronics", expUk: "10 років", expEn: "10 years", cert: "Delphi Certified" },
  ];

  const LOCATIONS = [
    {
      nameUk: "Дніпро-Центр", nameEn: "Dnipro-Center",
      address: "вул. Гагаріна 22",
      hoursUk: "Пн–Сб 8:00–20:00", hoursEn: "Mon–Sat 8:00–20:00",
      servicesUk: "Повний перелік послуг", servicesEn: "Full services",
      slots: 4,
    },
    {
      nameUk: "Дніпро-Північ", nameEn: "Dnipro-North",
      address: "вул. Титова 45",
      hoursUk: "Пн–Пт 9:00–19:00", hoursEn: "Mon–Fri 9:00–19:00",
      servicesUk: "ТО, шиномонтаж, гальма", servicesEn: "TO, Tires, Brakes",
      slots: 2,
    },
    {
      nameUk: "Дніпро-Південь", nameEn: "Dnipro-South",
      address: "вул. Запорізька 88",
      hoursUk: "Пн–Сб 8:00–20:00", hoursEn: "Mon–Sat 8:00–20:00",
      servicesUk: "Повний перелік послуг", servicesEn: "Full services",
      slots: 6,
    },
  ];

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectedSymptomData = SYMPTOMS.filter((s) => selectedSymptoms.has(s.id));

  const calcPrice = PRICES[calcBrand]?.[calcService] ?? 0;

  const serviceLabels: Record<string, { en: string; uk: string }> = {
    oil: { en: "Oil Change", uk: "Заміна масла" },
    brakes: { en: "Brake Pads", uk: "Гальмівні колодки" },
    tires: { en: "Tire Swap", uk: "Шиномонтаж" },
    timing: { en: "Timing Belt", uk: "Ремінь ГРМ" },
  };

  const brandLabels: Record<string, string> = {
    toyota: "Toyota", bmw: "BMW", vw: "VW", ford: "Ford", hyundai: "Hyundai", other: isUk ? "Інше" : "Other",
  };

  const bookingStepLabel = (n: number) => {
    const labels = isUk
      ? ["Послуга", "Авто", "Локація", "Час", "Контакти"]
      : ["Service", "Car", "Location", "Time", "Contact"];
    return labels[n - 1] ?? "";
  };

  const TRACKER_STEPS = isUk
    ? ["Прийнято", "Діагностика", "В роботі", "Готово", "Видано"]
    : ["Received", "Diagnostics", "In Progress", "Ready", "Delivered"];

  const dates = ["Today / Сьогодні", "Tomorrow / Завтра", "+2 days / Через 2 дні"];
  const times = ["8:00", "10:00", "12:00", "14:00", "16:00"];
  const years = Array.from({ length: 11 }, (_, i) => String(2015 + i));
  const engines = ["1.4", "1.6", "2.0", "2.5", "3.0+"];

  return (
    <div
      className="min-h-screen text-white font-sans"
      style={{
        backgroundColor: "#111111",
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(55,65,81,0.15) 39px, rgba(55,65,81,0.15) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(55,65,81,0.15) 39px, rgba(55,65,81,0.15) 40px)",
      }}
    >
      {/* NAV */}
      <nav className="bg-[#111111] border-b border-zinc-800 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
          <span className="text-xl font-black tracking-wider text-white">
            🔧 <span className="text-[#DC2626]">AutoPro</span>
          </span>
          <div className="flex items-center gap-5 flex-wrap text-sm font-semibold tracking-wide text-zinc-300">
            <a href="#services" className="hover:text-[#DC2626] transition-colors">{isUk ? "Послуги" : "Services"}</a>
            <a href="#booking" className="hover:text-[#DC2626] transition-colors">{isUk ? "Запис" : "Booking"}</a>
            <a href="#diagnostics" className="hover:text-[#DC2626] transition-colors">{isUk ? "Діагностика" : "Diagnostics"}</a>
            <a href="#locations" className="hover:text-[#DC2626] transition-colors">{isUk ? "Локації" : "Locations"}</a>
            <span className="text-[#DC2626] font-black tracking-widest">+38 050 000 00 00</span>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="py-24 px-4 text-center bg-linear-to-br from-[#111111] via-[#1a1a1a] to-[#0d0d0d]">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#DC2626] text-xs font-black tracking-[0.3em] uppercase mb-4">
            {isUk ? "Мережа автосервісів №1 у Дніпрі" : "Dnipro's #1 Auto Service Network"}
          </p>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white leading-tight mb-8">
            {isUk ? "Твоє авто в надійних руках" : "Your Car in Reliable Hands"}
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={() => setBookingStep(1)}
              className="px-8 py-4 bg-[#DC2626] text-white font-black uppercase tracking-widest text-sm hover:bg-red-700 transition-colors"
            >
              {isUk ? "Записатись на сервіс" : "Book Service"}
            </button>
            <button className="px-8 py-4 border-2 border-[#374151] text-zinc-300 font-black uppercase tracking-widest text-sm hover:border-[#DC2626] hover:text-white transition-colors">
              {isUk ? "Розрахувати вартість" : "Calculate Cost"}
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { en: "12-month guarantee", uk: "Гарантія 12 міс" },
              { en: "15 years on market", uk: "15 років досвіду" },
              { en: "50,000+ cars served", uk: "50 000+ авто" },
              { en: "3 locations", uk: "3 точки у місті" },
            ].map((t, i) => (
              <div key={i} className="bg-[#1C1C1E] border border-zinc-800 px-4 py-3 text-center">
                <span className="text-sm font-bold text-zinc-300">{isUk ? t.uk : t.en}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-black uppercase tracking-widest text-white mb-2">
          {isUk ? "Наші послуги" : "Our Services"}
        </h2>
        <div className="w-12 h-1 bg-[#DC2626] mb-10" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((s) => (
            <div key={s.id} className="bg-[#1C1C1E] border border-zinc-800 p-6 flex flex-col gap-3 hover:border-[#DC2626] transition-colors">
              <EmojiIcon emoji={s.emoji} className="w-8 h-8" />
              <h3 className="text-lg font-black text-white uppercase tracking-wide">{isUk ? s.nameUk : s.nameEn}</h3>
              <p className="text-sm text-zinc-400 flex-1">{isUk ? s.descUk : s.descEn}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-[#DC2626] font-black text-sm">
                  {isUk ? `від ${s.priceFrom} ₴` : `from ${s.priceFrom} ₴`}
                </span>
                <button
                  onClick={() => { setActiveService(s.id); setBookingService(s.id); setBookingStep(1); }}
                  className="px-4 py-2 bg-[#DC2626] text-white text-xs font-black uppercase tracking-wider hover:bg-red-700 transition-colors"
                >
                  {isUk ? "Записатись" : "Book"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SYMPTOM DIAGNOSTICS */}
      <section id="diagnostics" className="py-16 px-4 bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black uppercase tracking-widest text-white mb-2">
            {isUk ? "Що не так з вашим авто?" : "What's wrong with your car?"}
          </h2>
          <div className="w-12 h-1 bg-[#DC2626] mb-4" />
          <p className="text-zinc-400 text-sm mb-8">{isUk ? "Оберіть симптоми — підберемо потрібні послуги" : "Select symptoms — we'll match the right services"}</p>
          <div className="flex flex-wrap gap-3 mb-8">
            {SYMPTOMS.map((s) => {
              const active = selectedSymptoms.has(s.id);
              return (
                <button
                  key={s.id}
                  onClick={() => toggleSymptom(s.id)}
                  className={`px-4 py-2 text-sm font-bold uppercase tracking-wide border transition-colors ${
                    active
                      ? "bg-[#DC2626] border-[#DC2626] text-white"
                      : "bg-transparent border-zinc-700 text-zinc-300 hover:border-[#DC2626] hover:text-white"
                  }`}
                >
                  {isUk ? s.labelUk : s.labelEn}
                </button>
              );
            })}
          </div>
          {selectedSymptomData.length > 0 && (
            <div className="bg-[#1C1C1E] border border-[#DC2626] p-6">
              <h3 className="text-lg font-black uppercase tracking-widest text-[#DC2626] mb-4">
                {isUk ? "Рекомендовані послуги" : "Recommended Services"}
              </h3>
              <div className="space-y-3 mb-6">
                {selectedSymptomData.map((s) => (
                  <div key={s.id} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                    <span className="text-white font-bold text-sm">{isUk ? s.labelUk : s.labelEn}:</span>
                    <span className="text-zinc-400 text-sm">{isUk ? s.servicesUk : s.servicesEn}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => { setBookingStep(1); }}
                className="px-6 py-3 bg-[#DC2626] text-white font-black uppercase tracking-widest text-xs hover:bg-red-700 transition-colors"
              >
                {isUk ? "Записатись на діагностику" : "Book Diagnostics"}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calculator" className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-black uppercase tracking-widest text-white mb-2">
          {isUk ? "Калькулятор вартості" : "Service Calculator"}
        </h2>
        <div className="w-12 h-1 bg-[#DC2626] mb-10" />
        <div className="bg-[#1C1C1E] border border-zinc-800 p-8 max-w-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-zinc-400 mb-2">
                {isUk ? "Марка авто" : "Car Brand"}
              </label>
              <select
                value={calcBrand}
                onChange={(e) => setCalcBrand(e.target.value)}
                className="w-full bg-[#111111] border border-zinc-700 text-white px-4 py-3 text-sm font-bold focus:outline-none focus:border-[#DC2626]"
              >
                {Object.entries(brandLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-zinc-400 mb-2">
                {isUk ? "Послуга" : "Service"}
              </label>
              <select
                value={calcService}
                onChange={(e) => setCalcService(e.target.value)}
                className="w-full bg-[#111111] border border-zinc-700 text-white px-4 py-3 text-sm font-bold focus:outline-none focus:border-[#DC2626]"
              >
                {Object.entries(serviceLabels).map(([k, v]) => (
                  <option key={k} value={k}>{isUk ? v.uk : v.en}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="bg-[#111111] border border-zinc-800 p-6 mb-6">
            <div className="text-zinc-400 text-xs uppercase tracking-widest mb-1">{isUk ? "Попередня вартість" : "Estimated Price"}</div>
            <div className="text-4xl font-black text-[#DC2626]">{calcPrice.toLocaleString()} ₴</div>
            <div className="text-zinc-500 text-xs mt-1">
              {brandLabels[calcBrand]} — {isUk ? serviceLabels[calcService].uk : serviceLabels[calcService].en}
            </div>
          </div>
          <p className="text-zinc-500 text-xs mb-6">
            {isUk
              ? "Це попередня оцінка. Остаточна ціна залежить від реального стану авто."
              : "This is a preliminary estimate. Final price depends on actual condition."}
          </p>
          <button
            onClick={() => setBookingStep(1)}
            className="px-6 py-3 bg-[#DC2626] text-white font-black uppercase tracking-widest text-xs hover:bg-red-700 transition-colors"
          >
            {isUk ? "Записатись на цю послугу" : "Book this service"}
          </button>
        </div>
      </section>

      {/* BOOKING WIZARD */}
      <section id="booking" className="py-16 px-4 bg-[#0d0d0d]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black uppercase tracking-widest text-white mb-2">
            {isUk ? "Онлайн-запис" : "Online Booking"}
          </h2>
          <div className="w-12 h-1 bg-[#DC2626] mb-10" />

          {/* Progress bar */}
          {!bookingDone && (
            <div className="flex mb-8 gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <div key={n} className="flex-1 flex flex-col items-center gap-1">
                  <div className={`h-1 w-full transition-colors ${n <= bookingStep ? "bg-[#DC2626]" : "bg-zinc-800"}`} />
                  <span className={`text-xs font-bold uppercase tracking-wider ${n <= bookingStep ? "text-[#DC2626]" : "text-zinc-600"}`}>
                    {bookingStepLabel(n)}
                  </span>
                </div>
              ))}
            </div>
          )}

          {bookingDone ? (
            <div className="bg-[#1C1C1E] border border-[#DC2626] p-8 text-center">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-black uppercase tracking-widest text-white mb-3">
                {isUk ? "Запис прийнято!" : "Booking Confirmed!"}
              </h3>
              <p className="text-zinc-400 text-sm">
                {isUk
                  ? "Підтвердимо через SMS/Telegram протягом 15 хвилин."
                  : "We'll confirm via SMS/Telegram within 15 minutes."}
              </p>
              <button
                onClick={() => { setBookingDone(false); setBookingStep(1); setBookingService(null); }}
                className="mt-6 px-6 py-3 border border-zinc-700 text-zinc-300 text-xs font-black uppercase tracking-widest hover:border-[#DC2626] hover:text-white transition-colors"
              >
                {isUk ? "Новий запис" : "New Booking"}
              </button>
            </div>
          ) : (
            <div className="bg-[#1C1C1E] border border-zinc-800 p-6">
              {/* Step 1 */}
              {bookingStep === 1 && (
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-4">{isUk ? "Оберіть послугу" : "Choose Service"}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {SERVICES.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setBookingService(s.id)}
                        className={`p-4 border text-left transition-colors ${bookingService === s.id ? "border-[#DC2626] bg-[#DC2626]/10" : "border-zinc-700 hover:border-zinc-500"}`}
                      >
                        <div className="mb-2"><EmojiIcon emoji={s.emoji} className="w-7 h-7" /></div>
                        <div className="text-xs font-black text-white uppercase tracking-wide leading-tight">{isUk ? s.nameUk : s.nameEn}</div>
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => bookingService && setBookingStep(2)}
                    disabled={!bookingService}
                    className="mt-6 px-6 py-3 bg-[#DC2626] text-white font-black uppercase tracking-widest text-xs hover:bg-red-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {isUk ? "Далі →" : "Next →"}
                  </button>
                </div>
              )}

              {/* Step 2 */}
              {bookingStep === 2 && (
                <div className="space-y-4">
                  <p className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-4">{isUk ? "Дані автомобіля" : "Car Details"}</p>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">{isUk ? "Марка" : "Make"}</label>
                    <select value={bookingMake} onChange={(e) => setBookingMake(e.target.value)} className="w-full bg-[#111111] border border-zinc-700 text-white px-4 py-3 text-sm font-bold focus:outline-none focus:border-[#DC2626]">
                      <option value="">{isUk ? "Оберіть марку" : "Select make"}</option>
                      {Object.entries(brandLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">{isUk ? "Рік випуску" : "Year"}</label>
                    <select value={bookingYear} onChange={(e) => setBookingYear(e.target.value)} className="w-full bg-[#111111] border border-zinc-700 text-white px-4 py-3 text-sm font-bold focus:outline-none focus:border-[#DC2626]">
                      <option value="">{isUk ? "Оберіть рік" : "Select year"}</option>
                      {years.map((y) => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">{isUk ? "Об'єм двигуна" : "Engine"}</label>
                    <select value={bookingEngine} onChange={(e) => setBookingEngine(e.target.value)} className="w-full bg-[#111111] border border-zinc-700 text-white px-4 py-3 text-sm font-bold focus:outline-none focus:border-[#DC2626]">
                      <option value="">{isUk ? "Оберіть об'єм" : "Select engine"}</option>
                      {engines.map((e) => <option key={e} value={e}>{e}L</option>)}
                    </select>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button onClick={() => setBookingStep(1)} className="px-5 py-3 border border-zinc-700 text-zinc-300 text-xs font-black uppercase tracking-widest hover:border-zinc-500 transition-colors">← {isUk ? "Назад" : "Back"}</button>
                    <button onClick={() => (bookingMake && bookingYear && bookingEngine) && setBookingStep(3)} disabled={!bookingMake || !bookingYear || !bookingEngine} className="px-6 py-3 bg-[#DC2626] text-white font-black uppercase tracking-widest text-xs hover:bg-red-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                      {isUk ? "Далі →" : "Next →"}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {bookingStep === 3 && (
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-4">{isUk ? "Оберіть локацію" : "Choose Location"}</p>
                  <div className="space-y-3">
                    {LOCATIONS.map((loc, i) => (
                      <button
                        key={i}
                        onClick={() => setBookingLocation(String(i))}
                        className={`w-full p-4 border text-left transition-colors ${bookingLocation === String(i) ? "border-[#DC2626] bg-[#DC2626]/10" : "border-zinc-700 hover:border-zinc-500"}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-black text-white uppercase text-sm tracking-wide">{isUk ? loc.nameUk : loc.nameEn}</span>
                          <span className="text-xs text-green-400 font-bold">{loc.slots} {isUk ? "вільних" : "slots"}</span>
                        </div>
                        <div className="text-zinc-400 text-xs mt-1">{loc.address} · {isUk ? loc.hoursUk : loc.hoursEn}</div>
                        <div className="text-zinc-500 text-xs mt-1">{isUk ? loc.servicesUk : loc.servicesEn}</div>
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button onClick={() => setBookingStep(2)} className="px-5 py-3 border border-zinc-700 text-zinc-300 text-xs font-black uppercase tracking-widest hover:border-zinc-500 transition-colors">← {isUk ? "Назад" : "Back"}</button>
                    <button onClick={() => bookingLocation !== null && setBookingStep(4)} disabled={bookingLocation === null} className="px-6 py-3 bg-[#DC2626] text-white font-black uppercase tracking-widest text-xs hover:bg-red-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                      {isUk ? "Далі →" : "Next →"}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4 */}
              {bookingStep === 4 && (
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-4">{isUk ? "Дата та час" : "Date & Time"}</p>
                  <div className="mb-4">
                    <p className="text-xs uppercase tracking-widest text-zinc-500 mb-2">{isUk ? "Дата" : "Date"}</p>
                    <div className="flex gap-2 flex-wrap">
                      {dates.map((d, i) => (
                        <button key={i} onClick={() => setBookingDate(String(i))} className={`px-4 py-2 border text-xs font-bold transition-colors ${bookingDate === String(i) ? "border-[#DC2626] bg-[#DC2626]/10 text-white" : "border-zinc-700 text-zinc-300 hover:border-zinc-500"}`}>
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="text-xs uppercase tracking-widest text-zinc-500 mb-2">{isUk ? "Час" : "Time"}</p>
                    <div className="flex gap-2 flex-wrap">
                      {times.map((t) => (
                        <button key={t} onClick={() => setBookingTime(t)} className={`px-4 py-2 border text-xs font-bold transition-colors ${bookingTime === t ? "border-[#DC2626] bg-[#DC2626]/10 text-white" : "border-zinc-700 text-zinc-300 hover:border-zinc-500"}`}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button onClick={() => setBookingStep(3)} className="px-5 py-3 border border-zinc-700 text-zinc-300 text-xs font-black uppercase tracking-widest hover:border-zinc-500 transition-colors">← {isUk ? "Назад" : "Back"}</button>
                    <button onClick={() => (bookingDate && bookingTime) && setBookingStep(5)} disabled={!bookingDate || !bookingTime} className="px-6 py-3 bg-[#DC2626] text-white font-black uppercase tracking-widest text-xs hover:bg-red-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                      {isUk ? "Далі →" : "Next →"}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 5 */}
              {bookingStep === 5 && (
                <div className="space-y-4">
                  <p className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-4">{isUk ? "Ваші контакти" : "Your Contact"}</p>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">{isUk ? "Ім'я" : "Name"}</label>
                    <input value={bookingName} onChange={(e) => setBookingName(e.target.value)} placeholder={isUk ? "Ваше ім'я" : "Your name"} className="w-full bg-[#111111] border border-zinc-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-[#DC2626] placeholder-zinc-600" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">{isUk ? "Телефон" : "Phone"}</label>
                    <input value={bookingPhone} onChange={(e) => setBookingPhone(e.target.value)} placeholder="+38 0XX XXX XX XX" className="w-full bg-[#111111] border border-zinc-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-[#DC2626] placeholder-zinc-600" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">{isUk ? "Коментар" : "Comment"}</label>
                    <textarea value={bookingComment} onChange={(e) => setBookingComment(e.target.value)} placeholder={isUk ? "Додаткова інформація..." : "Additional info..."} rows={3} className="w-full bg-[#111111] border border-zinc-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-[#DC2626] placeholder-zinc-600 resize-none" />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button onClick={() => setBookingStep(4)} className="px-5 py-3 border border-zinc-700 text-zinc-300 text-xs font-black uppercase tracking-widest hover:border-zinc-500 transition-colors">← {isUk ? "Назад" : "Back"}</button>
                    <button onClick={() => (bookingName && bookingPhone) && setBookingDone(true)} disabled={!bookingName || !bookingPhone} className="px-6 py-3 bg-[#DC2626] text-white font-black uppercase tracking-widest text-xs hover:bg-red-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                      {isUk ? "Підтвердити запис" : "Confirm Booking"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* REPAIR STATUS TRACKER */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-black uppercase tracking-widest text-white mb-2">
          {isUk ? "Статус ремонту" : "Repair Status"}
        </h2>
        <div className="w-12 h-1 bg-[#DC2626] mb-10" />
        <div className="bg-[#1C1C1E] border border-zinc-800 p-8 max-w-2xl">
          <div className="flex gap-3 mb-6">
            <input
              value={orderTrackerInput}
              onChange={(e) => setOrderTrackerInput(e.target.value)}
              placeholder={isUk ? "Введіть номер замовлення" : "Enter order number"}
              className="flex-1 bg-[#111111] border border-zinc-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-[#DC2626] placeholder-zinc-600"
            />
            <button
              onClick={() => orderTrackerInput.trim() && setOrderTrackerResult(true)}
              className="px-6 py-3 bg-[#DC2626] text-white font-black uppercase tracking-widest text-xs hover:bg-red-700 transition-colors shrink-0"
            >
              {isUk ? "Перевірити" : "Check"}
            </button>
          </div>
          {orderTrackerResult && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-zinc-400 text-xs uppercase tracking-widest">{isUk ? "Замовлення" : "Order"} #A2451</span>
                <span className="text-green-400 text-xs font-bold uppercase tracking-wider">
                  {isUk ? "В роботі" : "In Progress"}
                </span>
              </div>
              <div className="flex items-center gap-0 mb-6">
                {TRACKER_STEPS.map((step, i) => {
                  const isDone = i < 2;
                  const isCurrent = i === 2;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black border-2 transition-colors ${isDone ? "bg-[#DC2626] border-[#DC2626] text-white" : isCurrent ? "bg-transparent border-[#DC2626] text-[#DC2626] animate-pulse" : "bg-transparent border-zinc-700 text-zinc-600"}`}>
                        {isDone ? "✓" : i + 1}
                      </div>
                      <div className={`text-xs mt-2 font-bold text-center leading-tight ${isDone || isCurrent ? "text-white" : "text-zinc-600"}`}>{step}</div>
                      {i < TRACKER_STEPS.length - 1 && (
                        <div className={`hidden sm:block absolute`} />
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="bg-[#111111] border border-zinc-800 px-4 py-3 text-sm text-zinc-300">
                ⏱ {isUk ? "Очікуване завершення: Сьогодні о 17:00" : "Estimated completion: Today 17:00"}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* MECHANICS TEAM */}
      <section className="py-16 px-4 bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black uppercase tracking-widest text-white mb-2">
            {isUk ? "Наша команда" : "Our Team"}
          </h2>
          <div className="w-12 h-1 bg-[#DC2626] mb-10" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {MECHANICS.map((m, i) => (
              <div key={i} className="bg-[#1C1C1E] border border-zinc-800 p-6 text-center hover:border-[#DC2626] transition-colors">
                <div className="mb-4"><EmojiIcon emoji={m.emoji} className="w-14 h-14" /></div>
                <h3 className="font-black text-white text-sm uppercase tracking-wide mb-1">{isUk ? m.nameUk : m.nameEn}</h3>
                <p className="text-[#DC2626] text-xs font-bold uppercase tracking-wider mb-2">{isUk ? m.specUk : m.specEn}</p>
                <p className="text-zinc-400 text-xs mb-3">{isUk ? m.expUk : m.expEn} {isUk ? "досвіду" : "experience"}</p>
                <span className="inline-block bg-[#DC2626]/10 border border-[#DC2626]/30 text-[#DC2626] text-xs px-3 py-1 font-bold">{m.cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATIONS */}
      <section id="locations" className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-black uppercase tracking-widest text-white mb-2">
          {isUk ? "Наші локації" : "Our Locations"}
        </h2>
        <div className="w-12 h-1 bg-[#DC2626] mb-10" />
        <div className="flex gap-1 mb-6 flex-wrap">
          {LOCATIONS.map((loc, i) => (
            <button
              key={i}
              onClick={() => setActiveLocation(i)}
              className={`px-5 py-3 text-xs font-black uppercase tracking-widest transition-colors ${activeLocation === i ? "bg-[#DC2626] text-white" : "bg-[#1C1C1E] border border-zinc-700 text-zinc-300 hover:border-zinc-500"}`}
            >
              {isUk ? loc.nameUk : loc.nameEn}
            </button>
          ))}
        </div>
        {(() => {
          const loc = LOCATIONS[activeLocation];
          return (
            <div className="bg-[#1C1C1E] border border-zinc-800 p-8">
              <h3 className="text-xl font-black uppercase tracking-widest text-white mb-6">
                {isUk ? loc.nameUk : loc.nameEn}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="text-xs uppercase tracking-widest text-zinc-500 mb-2">{isUk ? "Адреса" : "Address"}</div>
                  <div className="text-white font-bold">{loc.address}</div>
                  <div className="text-zinc-400 text-sm mt-1">{isUk ? "м. Дніпро" : "Dnipro, Ukraine"}</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-zinc-500 mb-2">{isUk ? "Графік роботи" : "Working Hours"}</div>
                  <div className="text-white font-bold">{isUk ? loc.hoursUk : loc.hoursEn}</div>
                  <div className="text-green-400 text-xs mt-1 font-bold">
                    {loc.slots} {isUk ? "вільних місць" : "open slots today"}
                  </div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-zinc-500 mb-2">{isUk ? "Послуги" : "Services"}</div>
                  <div className="text-white font-bold text-sm">{isUk ? loc.servicesUk : loc.servicesEn}</div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-zinc-800">
                <button className="px-6 py-3 border border-[#374151] text-zinc-300 text-xs font-black uppercase tracking-widest hover:border-[#DC2626] hover:text-white transition-colors">
                  {isUk ? "📍 Як доїхати" : "📍 Get Directions"}
                </button>
              </div>
            </div>
          );
        })()}
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0a0a0a] border-t border-zinc-800 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-black mb-3">
                🔧 <span className="text-[#DC2626]">AutoPro</span>
              </div>
              <p className="text-zinc-500 text-sm">
                {isUk ? "Мережа автосервісів у Дніпрі" : "Auto service network in Dnipro"}
              </p>
              <div className="mt-4 space-y-1">
                <div className="text-[#DC2626] font-black text-sm">+38 050 000 00 00</div>
                <div className="text-zinc-500 text-xs">autopro@service.ua</div>
              </div>
            </div>
            {LOCATIONS.map((loc, i) => (
              <div key={i}>
                <div className="text-xs font-black uppercase tracking-widest text-[#DC2626] mb-3">{isUk ? loc.nameUk : loc.nameEn}</div>
                <div className="text-zinc-400 text-sm mb-1">{loc.address}</div>
                <div className="text-zinc-500 text-xs">{isUk ? loc.hoursUk : loc.hoursEn}</div>
                <div className="text-zinc-600 text-xs mt-1">{isUk ? loc.servicesUk : loc.servicesEn}</div>
              </div>
            ))}
          </div>
          <div className="border-t border-zinc-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-zinc-600 text-xs">© 2025 AutoPro. {isUk ? "Всі права захищені." : "All rights reserved."}</span>
            <div className="flex gap-4 text-xs text-zinc-600">
              <span className="hover:text-zinc-400 cursor-pointer">{isUk ? "Публічна оферта" : "Terms"}</span>
              <span className="hover:text-zinc-400 cursor-pointer">{isUk ? "Конфіденційність" : "Privacy"}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
