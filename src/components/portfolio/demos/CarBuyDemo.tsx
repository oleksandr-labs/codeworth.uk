"use client";

import { useState } from "react";
import { EmojiIcon } from "@/components/ui/EmojiIcon";

export function CarBuyDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  // --- State ---
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedCar, setSelectedCar] = useState<number | null>(null);
  const [compareList, setCompareList] = useState<number[]>([]);
  const [accordionOpen, setAccordionOpen] = useState<string | null>(null);
  const [calcLoan, setCalcLoan] = useState(600000);
  const [calcDown, setCalcDown] = useState(150000);
  const [calcTerm, setCalcTerm] = useState(60);
  const [bookingDone, setBookingDone] = useState(false);
  const [bookingName, setBookingName] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [sellStep, setSellStep] = useState(1);
  const [sellMake, setSellMake] = useState("");
  const [sellModel, setSellModel] = useState("");
  const [sellYear, setSellYear] = useState("");
  const [sellMileage, setSellMileage] = useState("");
  const [sellCondition, setSellCondition] = useState("");
  const [sellName, setSellName] = useState("");
  const [sellPhone, setSellPhone] = useState("");
  const [sellDone, setSellDone] = useState(false);
  const [searchMake, setSearchMake] = useState("");
  const [searchYear, setSearchYear] = useState("");
  const [searchPrice, setSearchPrice] = useState("");
  const [fuelFilter, setFuelFilter] = useState<string>("all");
  const [transmFilter, setTransmFilter] = useState<string>("all");
  const [bodyFilter, setBodyFilter] = useState<string>("all");

  // --- Data ---
  const CARS = [
    {
      id: 0,
      emoji: "🚗",
      name: "Toyota Camry",
      year: 2020,
      mileage: 85000,
      fuel: isUk ? "Бензин" : "Gasoline",
      fuelKey: "gasoline",
      transm: isUk ? "Автомат" : "Automatic",
      transmKey: "auto",
      body: isUk ? "Седан" : "Sedan",
      bodyKey: "sedan",
      price: 695000,
      color: "#1E3A5F",
    },
    {
      id: 1,
      emoji: "🚙",
      name: "Honda CR-V",
      year: 2021,
      mileage: 45000,
      fuel: isUk ? "Бензин" : "Gasoline",
      fuelKey: "gasoline",
      transm: isUk ? "Автомат" : "Automatic",
      transmKey: "auto",
      body: isUk ? "Кросовер" : "Crossover",
      bodyKey: "crossover",
      price: 825000,
      color: "#16A34A",
    },
    {
      id: 2,
      emoji: "🏎️",
      name: "BMW 3 Series",
      year: 2019,
      mileage: 110000,
      fuel: isUk ? "Дизель" : "Diesel",
      fuelKey: "diesel",
      transm: isUk ? "Автомат" : "Automatic",
      transmKey: "auto",
      body: isUk ? "Седан" : "Sedan",
      bodyKey: "sedan",
      price: 745000,
      color: "#1E3A5F",
    },
    {
      id: 3,
      emoji: "🚗",
      name: "Volkswagen Golf",
      year: 2022,
      mileage: 28000,
      fuel: isUk ? "Бензин" : "Gasoline",
      fuelKey: "gasoline",
      transm: isUk ? "Механіка" : "Manual",
      transmKey: "manual",
      body: isUk ? "Хетчбек" : "Hatchback",
      bodyKey: "hatchback",
      price: 520000,
      color: "#16A34A",
    },
    {
      id: 4,
      emoji: "🚙",
      name: "Ford Kuga",
      year: 2021,
      mileage: 62000,
      fuel: isUk ? "Гібрид" : "Hybrid",
      fuelKey: "hybrid",
      transm: isUk ? "Автомат" : "Automatic",
      transmKey: "auto",
      body: isUk ? "Кросовер" : "Crossover",
      bodyKey: "crossover",
      price: 785000,
      color: "#1E3A5F",
    },
    {
      id: 5,
      emoji: "🚗",
      name: "Skoda Octavia",
      year: 2023,
      mileage: 15000,
      fuel: isUk ? "Бензин" : "Gasoline",
      fuelKey: "gasoline",
      transm: isUk ? "Автомат" : "Automatic",
      transmKey: "auto",
      body: isUk ? "Універсал" : "Wagon",
      bodyKey: "wagon",
      price: 645000,
      color: "#16A34A",
    },
  ];

  const INSPECTION_CATEGORIES: { key: string; labelUk: string; labelEn: string; items: { uk: string; en: string }[] }[] = [
    {
      key: "engine",
      labelUk: "Двигун та трансмісія",
      labelEn: "Engine & Transmission",
      items: [
        { uk: "Стан двигуна — без ознак витоку масла", en: "Engine condition — no oil leak signs" },
        { uk: "Компресія циліндрів — у нормі", en: "Cylinder compression — within spec" },
        { uk: "Робота трансмісії — плавне перемикання", en: "Transmission — smooth shifting" },
        { uk: "Стан ременя/ланцюга ГРМ — ОК", en: "Timing belt/chain — OK" },
      ],
    },
    {
      key: "body",
      labelUk: "Кузов та лакофарбове покриття",
      labelEn: "Body & Paint",
      items: [
        { uk: "Перевірка товщини лаку — без прихованих фарбувань", en: "Paint thickness check — no hidden repaints" },
        { uk: "Геометрія кузова — рівна", en: "Body geometry — straight" },
        { uk: "Стан порогів та арок — без іржі", en: "Sills and arches — no rust" },
        { uk: "Цілісність скла — без тріщин", en: "Glass integrity — no cracks" },
      ],
    },
    {
      key: "chassis",
      labelUk: "Ходова частина",
      labelEn: "Suspension & Steering",
      items: [
        { uk: "Амортизатори — без підтікань", en: "Shock absorbers — no leaks" },
        { uk: "Кульові опори — у нормі", en: "Ball joints — within spec" },
        { uk: "Рульові тяги — без люфту", en: "Tie rods — no play" },
        { uk: "Гальмівні диски та колодки — ОК", en: "Brake discs and pads — OK" },
      ],
    },
    {
      key: "electrical",
      labelUk: "Електрика та електроніка",
      labelEn: "Electrical & Electronics",
      items: [
        { uk: "Акумулятор — заряд 87%", en: "Battery — charge 87%" },
        { uk: "OBD-діагностика — 0 активних помилок", en: "OBD diagnostics — 0 active errors" },
        { uk: "Всі датчики — у нормі", en: "All sensors — within spec" },
        { uk: "Мультимедіа та клімат-контроль — ОК", en: "Multimedia & climate — OK" },
      ],
    },
  ];

  const VERIFY_STEPS = [
    {
      emoji: "🔬",
      titleUk: "150-пунктна інспекція",
      titleEn: "150-Point Inspection",
      descUk: "Сертифіковані механіки перевіряють кожен вузол автомобіля — двигун, ходову, кузов, електрику",
      descEn: "Certified mechanics check every component — engine, chassis, body, electrics",
    },
    {
      emoji: "📋",
      titleUk: "Звіт про історію",
      titleEn: "History Report",
      descUk: "Перевірка VIN: ДТП, кількість власників, пробіг за роками, обтяження та штрафи",
      descEn: "VIN check: accidents, owner count, mileage history, liens and fines",
    },
    {
      emoji: "💰",
      titleUk: "Аналіз ринкової ціни",
      titleEn: "Market Price Analysis",
      descUk: "Порівнюємо з 10 000+ схожими оголошеннями — гарантуємо чесну ціну без переплат",
      descEn: "Compared against 10,000+ similar listings — fair price guaranteed, no overpay",
    },
    {
      emoji: "🔄",
      titleUk: "7 днів повернення",
      titleEn: "7-Day Return",
      descUk: "Не задоволені? Повертайте без зайвих питань протягом 7 днів після покупки",
      descEn: "Not satisfied? Return within 7 days of purchase, no questions asked",
    },
  ];

  // --- Filtering ---
  const filteredCars = CARS.filter((car) => {
    if (fuelFilter !== "all" && car.fuelKey !== fuelFilter) return false;
    if (transmFilter !== "all" && car.transmKey !== transmFilter) return false;
    if (bodyFilter !== "all" && car.bodyKey !== bodyFilter) return false;
    if (activeFilter === "under600") return car.price < 600000;
    if (activeFilter === "over750") return car.price >= 750000;
    return true;
  });

  // --- Financing calc ---
  const principal = Math.max(calcLoan - calcDown, 0);
  const monthlyRate = 0.18 / 12;
  const monthlyPayment =
    principal > 0 && calcTerm > 0
      ? Math.round((principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -calcTerm)))
      : 0;

  // --- Helpers ---
  const toggleCompare = (id: number) => {
    setCompareList((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const formatPrice = (p: number) =>
    "₴ " + p.toLocaleString("uk-UA");

  const carDetail = selectedCar !== null ? CARS[selectedCar] : null;

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800">

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0f2744 0%, #1E3A5F 60%, #163d2e 100%)" }}
      >
        {/* subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(255,255,255,.15) 39px,rgba(255,255,255,.15) 40px), repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(255,255,255,.15) 39px,rgba(255,255,255,.15) 40px)",
          }}
        />

        <div className="relative max-w-5xl mx-auto px-4 py-16 text-center">
          {/* Logo / brand */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
            <span className="text-green-400 font-black text-lg">Car</span>
            <span className="text-white font-black text-lg">Buy</span>
            <span className="text-white/50 text-xs ml-1">
              {isUk ? "Авторинок" : "Marketplace"}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">
            {isUk
              ? "Перевірені авто.\nЧесні ціни. Повна довіра."
              : "Verified Cars.\nFair Prices. Full Trust."}
          </h1>
          <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
            {isUk
              ? "Купуйте з упевненістю — кожне авто проходить 150-пунктну перевірку та має повну історію"
              : "Buy with confidence — every car passes a 150-point inspection and comes with full history"}
          </p>

          {/* Search bar */}
          <div className="bg-white rounded-2xl p-3 shadow-2xl max-w-3xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
              <div className="relative">
                <label className="absolute top-1.5 left-3 text-xs text-slate-400 font-medium">
                  {isUk ? "Марка" : "Make"}
                </label>
                <input
                  value={searchMake}
                  onChange={(e) => setSearchMake(e.target.value)}
                  placeholder={isUk ? "Toyota, BMW…" : "Toyota, BMW…"}
                  className="w-full pt-5 pb-2 px-3 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-700 focus:outline-none focus:border-blue-400"
                />
              </div>
              <div className="relative">
                <label className="absolute top-1.5 left-3 text-xs text-slate-400 font-medium">
                  {isUk ? "Рік" : "Year"}
                </label>
                <select
                  value={searchYear}
                  onChange={(e) => setSearchYear(e.target.value)}
                  className="w-full pt-5 pb-2 px-3 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-700 focus:outline-none focus:border-blue-400 appearance-none"
                >
                  <option value="">{isUk ? "Будь-який" : "Any"}</option>
                  {[2023, 2022, 2021, 2020, 2019].map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
              <div className="relative col-span-2">
                <label className="absolute top-1.5 left-3 text-xs text-slate-400 font-medium">
                  {isUk ? "Бюджет" : "Budget"}
                </label>
                <select
                  value={searchPrice}
                  onChange={(e) => {
                    setSearchPrice(e.target.value);
                    setActiveFilter(e.target.value || "all");
                  }}
                  className="w-full pt-5 pb-2 px-3 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-700 focus:outline-none focus:border-blue-400 appearance-none"
                >
                  <option value="">{isUk ? "Будь-який" : "Any"}</option>
                  <option value="under600">{isUk ? "До ₴600 000" : "Under ₴600,000"}</option>
                  <option value="all">{isUk ? "₴600 000 – ₴750 000" : "₴600,000 – ₴750,000"}</option>
                  <option value="over750">{isUk ? "Від ₴750 000" : "Over ₴750,000"}</option>
                </select>
              </div>
            </div>
            <button
              style={{ background: "#16A34A" }}
              className="w-full py-3 rounded-xl text-white font-bold text-sm hover:opacity-90 transition-opacity"
            >
              🔍 {isUk ? "Знайти авто" : "Search Cars"}
            </button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {[
              { icon: "✅", textUk: "1 200+ перевірених авто", textEn: "1,200+ verified cars" },
              { icon: "🔄", textUk: "7 днів повернення", textEn: "7-day return" },
              { icon: "📋", textUk: "Юридично чисті", textEn: "Legally clean" },
              { icon: "🏦", textUk: "Онлайн-кредитування", textEn: "Online financing" },
            ].map((b, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-white"
              >
                <span>{b.icon}</span>
                <span>{isUk ? b.textUk : b.textEn}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CAR CATALOG
      ══════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-4 py-14">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black text-slate-900">
              {isUk ? "Каталог авто" : "Car Catalog"}
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              {isUk
                ? `${filteredCars.length} автомобілів у наявності`
                : `${filteredCars.length} cars available`}
            </p>
          </div>
          {compareList.length > 0 && (
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
              style={{ background: "#1E3A5F" }}
            >
              ⚖️ {isUk ? "Порівнюєте" : "Comparing"}: {compareList.length}
            </div>
          )}
        </div>

        <div className="flex gap-6">
          {/* Sidebar filters */}
          <aside className="hidden md:block w-48 shrink-0">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 sticky top-4">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">
                {isUk ? "Фільтри" : "Filters"}
              </p>

              <div className="mb-4">
                <p className="text-xs font-bold text-slate-600 mb-2">
                  {isUk ? "Паливо" : "Fuel"}
                </p>
                {[
                  { key: "all", labelUk: "Всі", labelEn: "All" },
                  { key: "gasoline", labelUk: "Бензин", labelEn: "Gasoline" },
                  { key: "diesel", labelUk: "Дизель", labelEn: "Diesel" },
                  { key: "hybrid", labelUk: "Гібрид", labelEn: "Hybrid" },
                ].map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setFuelFilter(f.key)}
                    className={`block w-full text-left text-xs px-2 py-1.5 rounded-lg mb-1 transition-colors ${
                      fuelFilter === f.key
                        ? "text-white font-bold"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                    style={fuelFilter === f.key ? { background: "#16A34A" } : {}}
                  >
                    {isUk ? f.labelUk : f.labelEn}
                  </button>
                ))}
              </div>

              <div className="mb-4">
                <p className="text-xs font-bold text-slate-600 mb-2">
                  {isUk ? "Коробка" : "Transmission"}
                </p>
                {[
                  { key: "all", labelUk: "Всі", labelEn: "All" },
                  { key: "auto", labelUk: "Автомат", labelEn: "Automatic" },
                  { key: "manual", labelUk: "Механіка", labelEn: "Manual" },
                ].map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setTransmFilter(f.key)}
                    className={`block w-full text-left text-xs px-2 py-1.5 rounded-lg mb-1 transition-colors ${
                      transmFilter === f.key
                        ? "text-white font-bold"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                    style={transmFilter === f.key ? { background: "#16A34A" } : {}}
                  >
                    {isUk ? f.labelUk : f.labelEn}
                  </button>
                ))}
              </div>

              <div className="mb-4">
                <p className="text-xs font-bold text-slate-600 mb-2">
                  {isUk ? "Тип кузова" : "Body Type"}
                </p>
                {[
                  { key: "all", labelUk: "Всі", labelEn: "All" },
                  { key: "sedan", labelUk: "Седан", labelEn: "Sedan" },
                  { key: "crossover", labelUk: "Кросовер", labelEn: "Crossover" },
                  { key: "hatchback", labelUk: "Хетчбек", labelEn: "Hatchback" },
                  { key: "wagon", labelUk: "Універсал", labelEn: "Wagon" },
                ].map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setBodyFilter(f.key)}
                    className={`block w-full text-left text-xs px-2 py-1.5 rounded-lg mb-1 transition-colors ${
                      bodyFilter === f.key
                        ? "text-white font-bold"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                    style={bodyFilter === f.key ? { background: "#16A34A" } : {}}
                  >
                    {isUk ? f.labelUk : f.labelEn}
                  </button>
                ))}
              </div>

              <div>
                <p className="text-xs font-bold text-slate-600 mb-2">
                  {isUk ? "Ціна" : "Price"}
                </p>
                {[
                  { key: "all", labelUk: "Всі", labelEn: "All" },
                  { key: "under600", labelUk: "До ₴600к", labelEn: "Under ₴600k" },
                  { key: "over750", labelUk: "Від ₴750к", labelEn: "Over ₴750k" },
                ].map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setActiveFilter(f.key)}
                    className={`block w-full text-left text-xs px-2 py-1.5 rounded-lg mb-1 transition-colors ${
                      activeFilter === f.key
                        ? "text-white font-bold"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                    style={activeFilter === f.key ? { background: "#16A34A" } : {}}
                  >
                    {isUk ? f.labelUk : f.labelEn}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Car grid */}
          <div className="flex-1">
            {filteredCars.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center text-slate-400 border border-slate-100">
                🔍 {isUk ? "Авто не знайдено. Спробуйте змінити фільтри." : "No cars found. Try adjusting filters."}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCars.map((car) => {
                  const inCompare = compareList.includes(car.id);
                  const isSelected = selectedCar === car.id;
                  return (
                    <div
                      key={car.id}
                      className={`bg-white rounded-2xl border-2 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer ${
                        isSelected ? "border-green-500" : "border-slate-100"
                      }`}
                      onClick={() => setSelectedCar(isSelected ? null : car.id)}
                    >
                      {/* Photo placeholder */}
                      <div
                        className="h-36 flex items-center justify-center relative"
                        style={{ background: `linear-gradient(135deg, ${car.color}22, ${car.color}44)` }}
                      >
                        <EmojiIcon emoji={car.emoji} className="w-14 h-14" />
                        <div
                          className="absolute top-2 left-2 text-xs text-white font-bold px-2 py-0.5 rounded-full"
                          style={{ background: "#16A34A" }}
                        >
                          ✓ {isUk ? "Перевірено" : "Verified"}
                        </div>
                        {inCompare && (
                          <div
                            className="absolute top-2 right-2 text-xs text-white font-bold px-2 py-0.5 rounded-full"
                            style={{ background: "#1E3A5F" }}
                          >
                            ⚖️
                          </div>
                        )}
                      </div>

                      <div className="p-3">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="font-black text-slate-900 text-sm leading-tight">
                            {car.name}
                          </h3>
                          <span className="text-xs text-slate-400 font-medium">{car.year}</span>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-2">
                          <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                            {car.mileage.toLocaleString()} {isUk ? "км" : "km"}
                          </span>
                          <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                            {car.fuel}
                          </span>
                          <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                            {car.transm}
                          </span>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <span className="font-black text-base" style={{ color: "#1E3A5F" }}>
                            {formatPrice(car.price)}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleCompare(car.id);
                            }}
                            className={`text-xs px-2 py-1 rounded-lg font-semibold border transition-colors ${
                              inCompare
                                ? "bg-slate-800 text-white border-slate-800"
                                : "border-slate-200 text-slate-500 hover:border-slate-400"
                            }`}
                          >
                            {inCompare
                              ? (isUk ? "− Порівняння" : "− Compare")
                              : (isUk ? "+ Порівняти" : "+ Compare")}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FEATURED CAR DETAIL
      ══════════════════════════════════════════ */}
      {carDetail && (
        <section className="max-w-5xl mx-auto px-4 pb-10">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-lg overflow-hidden">
            {/* Header */}
            <div
              className="p-6 flex items-center justify-between"
              style={{ background: "linear-gradient(135deg, #1E3A5F, #163d2e)" }}
            >
              <div className="flex items-center gap-4">
                <EmojiIcon emoji={carDetail.emoji} className="w-14 h-14" />
                <div>
                  <h3 className="text-2xl font-black text-white">{carDetail.name}</h3>
                  <p className="text-white/60 text-sm">
                    {carDetail.year} · {carDetail.body} · {formatPrice(carDetail.price)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCar(null)}
                className="text-white/60 hover:text-white text-xl w-8 h-8 flex items-center justify-center rounded-full bg-white/10"
              >
                ✕
              </button>
            </div>

            <div className="p-6 grid md:grid-cols-2 gap-6">
              {/* Specs table */}
              <div>
                <h4 className="font-black text-slate-800 mb-3 text-sm uppercase tracking-wide">
                  {isUk ? "Характеристики" : "Specifications"}
                </h4>
                <table className="w-full text-sm">
                  <tbody>
                    {[
                      { labelUk: "Рік випуску", labelEn: "Year", value: carDetail.year },
                      { labelUk: "Пробіг", labelEn: "Mileage", value: `${carDetail.mileage.toLocaleString()} ${isUk ? "км" : "km"}` },
                      { labelUk: "Паливо", labelEn: "Fuel", value: carDetail.fuel },
                      { labelUk: "Коробка", labelEn: "Transmission", value: carDetail.transm },
                      { labelUk: "Тип кузова", labelEn: "Body", value: carDetail.body },
                      { labelUk: "Ціна", labelEn: "Price", value: formatPrice(carDetail.price) },
                    ].map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-slate-50" : ""}>
                        <td className="py-2 px-3 text-slate-500 font-medium rounded-l-lg">
                          {isUk ? row.labelUk : row.labelEn}
                        </td>
                        <td className="py-2 px-3 font-bold text-slate-800 rounded-r-lg">
                          {row.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* CarBuy Report */}
                <div
                  className="mt-4 rounded-xl p-4 border"
                  style={{ borderColor: "#16A34A22", background: "#16A34A0a" }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">📋</span>
                    <span className="font-black text-sm" style={{ color: "#16A34A" }}>
                      CarBuy {isUk ? "Звіт" : "Report"}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      { uk: "ДТП", en: "Accidents", value: isUk ? "Не зареєстровано" : "None recorded" },
                      { uk: "Власники", en: "Owners", value: "2" },
                      { uk: "Обтяження", en: "Liens", value: isUk ? "Відсутні" : "None" },
                      { uk: "Штрафи", en: "Fines", value: "0" },
                    ].map((item, i) => (
                      <div key={i} className="bg-white rounded-lg p-2 border border-green-100">
                        <p className="text-slate-400">{isUk ? item.uk : item.en}</p>
                        <p className="font-bold text-slate-800">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Inspection accordion + booking */}
              <div>
                <h4 className="font-black text-slate-800 mb-3 text-sm uppercase tracking-wide">
                  {isUk ? "150-пунктна перевірка" : "150-Point Inspection"}
                </h4>
                <div className="space-y-2 mb-4">
                  {INSPECTION_CATEGORIES.map((cat) => (
                    <div key={cat.key} className="border border-slate-200 rounded-xl overflow-hidden">
                      <button
                        className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 transition-colors text-sm font-bold text-slate-700"
                        onClick={() => setAccordionOpen(accordionOpen === cat.key ? null : cat.key)}
                      >
                        <span>{isUk ? cat.labelUk : cat.labelEn}</span>
                        <span className="text-slate-400">{accordionOpen === cat.key ? "▲" : "▼"}</span>
                      </button>
                      {accordionOpen === cat.key && (
                        <ul className="p-3 space-y-1 bg-white">
                          {cat.items.map((item, j) => (
                            <li key={j} className="flex items-start gap-2 text-xs text-slate-600">
                              <span style={{ color: "#16A34A" }} className="shrink-0 mt-0.5 font-bold">✓</span>
                              {isUk ? item.uk : item.en}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>

                {/* Book test drive */}
                {!bookingDone ? (
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                    <h5 className="font-black text-sm text-slate-800 mb-3">
                      🚗 {isUk ? "Записатись на тест-драйв" : "Book a Test Drive"}
                    </h5>
                    <input
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      placeholder={isUk ? "Ваше ім'я" : "Your name"}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm mb-2 focus:outline-none focus:border-blue-400"
                    />
                    <input
                      value={bookingPhone}
                      onChange={(e) => setBookingPhone(e.target.value)}
                      placeholder={isUk ? "Телефон" : "Phone number"}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm mb-2 focus:outline-none focus:border-blue-400"
                    />
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm mb-3 focus:outline-none focus:border-blue-400 text-slate-600"
                    />
                    <button
                      onClick={() => { if (bookingName && bookingPhone) setBookingDone(true); }}
                      className="w-full py-2.5 rounded-xl text-white font-bold text-sm hover:opacity-90 transition-opacity"
                      style={{ background: "#16A34A" }}
                    >
                      {isUk ? "Підтвердити запис" : "Confirm Booking"}
                    </button>
                  </div>
                ) : (
                  <div
                    className="rounded-xl p-4 text-center"
                    style={{ background: "#16A34A15", border: "1px solid #16A34A44" }}
                  >
                    <div className="text-3xl mb-2">✅</div>
                    <p className="font-black text-slate-800">
                      {isUk ? "Запис підтверджено!" : "Booking confirmed!"}
                    </p>
                    <p className="text-slate-500 text-sm mt-1">
                      {isUk
                        ? "Ми зателефонуємо вам найближчим часом"
                        : "We'll call you shortly to confirm"}
                    </p>
                  </div>
                )}

                {/* Financing CTA */}
                <div
                  className="mt-3 rounded-xl p-3 flex items-center gap-3"
                  style={{ background: "#1E3A5F" }}
                >
                  <span className="text-2xl">🏦</span>
                  <div className="flex-1">
                    <p className="text-white font-bold text-sm">
                      {isUk ? "Кредит від 18% річних" : "Financing from 18% APR"}
                    </p>
                    <p className="text-white/60 text-xs">
                      {isUk ? "Відповідь за 15 хвилин" : "Decision in 15 minutes"}
                    </p>
                  </div>
                  <button className="bg-white text-slate-800 font-bold text-xs px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                    {isUk ? "Розрахувати" : "Calculate"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════
          HOW WE VERIFY
      ══════════════════════════════════════════ */}
      <section style={{ background: "#1E3A5F" }} className="py-14">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-black text-white mb-2">
              {isUk ? "Як ми перевіряємо авто" : "How We Verify Cars"}
            </h2>
            <p className="text-white/60 text-sm max-w-xl mx-auto">
              {isUk
                ? "Кожен автомобіль проходить чотири рівні перевірки перед публікацією"
                : "Every car goes through four verification levels before listing"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {VERIFY_STEPS.map((step, i) => (
              <div
                key={i}
                className="bg-white/10 border border-white/20 rounded-2xl p-5 text-center hover:bg-white/15 transition-colors"
              >
                <div className="mb-3"><EmojiIcon emoji={step.emoji} className="w-10 h-10" /></div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-black text-white shrink-0"
                    style={{ background: "#16A34A" }}
                  >
                    {i + 1}
                  </span>
                  <h3 className="font-black text-white text-sm text-left leading-tight">
                    {isUk ? step.titleUk : step.titleEn}
                  </h3>
                </div>
                <p className="text-white/60 text-xs leading-relaxed">
                  {isUk ? step.descUk : step.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FINANCING CALCULATOR
      ══════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-4 py-14">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-black text-slate-900 mb-2">
              {isUk ? "Кредитний калькулятор" : "Financing Calculator"}
            </h2>
            <p className="text-slate-500 text-sm mb-6">
              {isUk
                ? "Розрахуйте орієнтовний щомісячний платіж за вашим авто"
                : "Estimate your monthly payment for any car"}
            </p>

            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <label className="font-semibold text-slate-700">
                    {isUk ? "Вартість авто" : "Car Price"}
                  </label>
                  <span className="font-black" style={{ color: "#1E3A5F" }}>
                    {formatPrice(calcLoan)}
                  </span>
                </div>
                <input
                  type="range"
                  min={200000}
                  max={1500000}
                  step={25000}
                  value={calcLoan}
                  onChange={(e) => setCalcLoan(Number(e.target.value))}
                  className="w-full accent-green-600"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>₴200к</span><span>₴1.5М</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <label className="font-semibold text-slate-700">
                    {isUk ? "Перший внесок" : "Down Payment"}
                  </label>
                  <span className="font-black" style={{ color: "#1E3A5F" }}>
                    {formatPrice(calcDown)}{" "}
                    <span className="text-slate-400 font-normal">
                      ({calcLoan > 0 ? Math.round((calcDown / calcLoan) * 100) : 0}%)
                    </span>
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={calcLoan}
                  step={10000}
                  value={Math.min(calcDown, calcLoan)}
                  onChange={(e) => setCalcDown(Number(e.target.value))}
                  className="w-full accent-green-600"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>₴0</span><span>{formatPrice(calcLoan)}</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <label className="font-semibold text-slate-700">
                    {isUk ? "Термін" : "Loan Term"}
                  </label>
                  <span className="font-black" style={{ color: "#1E3A5F" }}>
                    {calcTerm} {isUk ? "міс." : "mo."}
                  </span>
                </div>
                <input
                  type="range"
                  min={12}
                  max={84}
                  step={12}
                  value={calcTerm}
                  onChange={(e) => setCalcTerm(Number(e.target.value))}
                  className="w-full accent-green-600"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>12 {isUk ? "міс." : "mo."}</span>
                  <span>84 {isUk ? "міс." : "mo."}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Result */}
          <div className="rounded-3xl p-8 text-center" style={{ background: "linear-gradient(135deg, #1E3A5F, #163d2e)" }}>
            <p className="text-white/60 text-sm mb-2">
              {isUk ? "Щомісячний платіж" : "Monthly Payment"}
            </p>
            <p className="text-5xl font-black text-white mb-1">
              ₴{monthlyPayment.toLocaleString("uk-UA")}
            </p>
            <p className="text-white/40 text-xs mb-6">
              {isUk ? "Орієнтовно · Ставка 18% річних" : "Estimate · Rate 18% APR"}
            </p>

            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { labelUk: "Сума кредиту", labelEn: "Loan", value: formatPrice(principal) },
                { labelUk: "Термін", labelEn: "Term", value: `${calcTerm} ${isUk ? "міс." : "mo."}` },
                { labelUk: "Ставка", labelEn: "Rate", value: "18%" },
              ].map((item, i) => (
                <div key={i} className="bg-white/10 rounded-xl p-2">
                  <p className="text-white/50 text-xs">{isUk ? item.labelUk : item.labelEn}</p>
                  <p className="text-white font-bold text-xs mt-0.5">{item.value}</p>
                </div>
              ))}
            </div>

            <button
              className="w-full py-3 rounded-xl font-black text-slate-900 hover:opacity-90 transition-opacity"
              style={{ background: "#16A34A", color: "white" }}
            >
              {isUk ? "Подати заявку на кредит" : "Apply for Financing"}
            </button>
            <p className="text-white/40 text-xs mt-2">
              {isUk ? "Рішення за 15 хвилин" : "Decision in 15 minutes"}
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SELL YOUR CAR
      ══════════════════════════════════════════ */}
      <section className="bg-slate-100 py-14">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Left: pitch */}
            <div>
              <h2 className="text-2xl font-black text-slate-900 mb-3">
                {isUk ? "Продайте своє авто з CarBuy" : "Sell Your Car with CarBuy"}
              </h2>
              <p className="text-slate-500 text-sm mb-6">
                {isUk
                  ? "Безкоштовна оцінка, оголошення серед 50 000+ покупців, допомога з документами"
                  : "Free valuation, listing to 50,000+ buyers, full paperwork support"}
              </p>
              {[
                { emoji: "💸", textUk: "Безкоштовна оцінка авто", textEn: "Free car valuation" },
                { emoji: "📢", textUk: "Оголошення на топ-позиціях", textEn: "Premium listing placement" },
                { emoji: "🤝", textUk: "Допомога з оформленням угоди", textEn: "Full transaction support" },
                { emoji: "⚡", textUk: "Продаж за 7 днів у середньому", textEn: "Sold in 7 days on average" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 mb-3">
                  <EmojiIcon emoji={item.emoji} className="w-5 h-5" />
                  <span className="text-slate-700 text-sm font-medium">
                    {isUk ? item.textUk : item.textEn}
                  </span>
                </div>
              ))}
            </div>

            {/* Right: form */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              {!sellDone ? (
                <>
                  {/* Step indicator */}
                  <div className="flex items-center gap-2 mb-4">
                    {[1, 2].map((s) => (
                      <div key={s} className="flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black"
                          style={{
                            background: sellStep >= s ? "#1E3A5F" : "#e2e8f0",
                            color: sellStep >= s ? "white" : "#94a3b8",
                          }}
                        >
                          {s}
                        </div>
                        <span className="text-xs text-slate-400">
                          {s === 1
                            ? isUk ? "Авто" : "Car Info"
                            : isUk ? "Контакти" : "Contact"}
                        </span>
                        {s < 2 && <div className="w-6 h-px bg-slate-200" />}
                      </div>
                    ))}
                  </div>

                  {sellStep === 1 && (
                    <div className="space-y-3">
                      <input
                        value={sellMake}
                        onChange={(e) => setSellMake(e.target.value)}
                        placeholder={isUk ? "Марка авто (Toyota, BMW…)" : "Make (Toyota, BMW…)"}
                        className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400"
                      />
                      <input
                        value={sellModel}
                        onChange={(e) => setSellModel(e.target.value)}
                        placeholder={isUk ? "Модель (Camry, X5…)" : "Model (Camry, X5…)"}
                        className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          value={sellYear}
                          onChange={(e) => setSellYear(e.target.value)}
                          placeholder={isUk ? "Рік" : "Year"}
                          className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400"
                        />
                        <input
                          value={sellMileage}
                          onChange={(e) => setSellMileage(e.target.value)}
                          placeholder={isUk ? "Пробіг (км)" : "Mileage (km)"}
                          className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400"
                        />
                      </div>
                      <select
                        value={sellCondition}
                        onChange={(e) => setSellCondition(e.target.value)}
                        className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400 text-slate-600"
                      >
                        <option value="">{isUk ? "Стан авто…" : "Car condition…"}</option>
                        <option value="excellent">{isUk ? "Відмінний" : "Excellent"}</option>
                        <option value="good">{isUk ? "Добрий" : "Good"}</option>
                        <option value="fair">{isUk ? "Задовільний" : "Fair"}</option>
                        <option value="parts">{isUk ? "На запчастини" : "For parts"}</option>
                      </select>
                      <button
                        onClick={() => { if (sellMake && sellModel && sellYear) setSellStep(2); }}
                        className="w-full py-3 rounded-xl font-bold text-white text-sm hover:opacity-90 transition-opacity"
                        style={{ background: "#1E3A5F" }}
                      >
                        {isUk ? "Далі →" : "Next →"}
                      </button>
                    </div>
                  )}

                  {sellStep === 2 && (
                    <div className="space-y-3">
                      <div className="bg-slate-50 rounded-xl p-3 text-sm text-slate-600 border border-slate-200">
                        🚗 <strong>{sellMake} {sellModel}</strong>, {sellYear},{" "}
                        {sellMileage} {isUk ? "км" : "km"}
                      </div>
                      <input
                        value={sellName}
                        onChange={(e) => setSellName(e.target.value)}
                        placeholder={isUk ? "Ваше ім'я" : "Your name"}
                        className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400"
                      />
                      <input
                        value={sellPhone}
                        onChange={(e) => setSellPhone(e.target.value)}
                        placeholder={isUk ? "Номер телефону" : "Phone number"}
                        className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSellStep(1)}
                          className="flex-1 py-3 rounded-xl font-bold text-slate-600 text-sm border border-slate-200 hover:bg-slate-50 transition-colors"
                        >
                          ← {isUk ? "Назад" : "Back"}
                        </button>
                        <button
                          onClick={() => { if (sellName && sellPhone) setSellDone(true); }}
                          className="flex-1 py-3 rounded-xl font-bold text-white text-sm hover:opacity-90 transition-opacity"
                          style={{ background: "#16A34A" }}
                        >
                          {isUk ? "Надіслати" : "Submit"}
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-6">
                  <div className="text-5xl mb-3">🎉</div>
                  <h3 className="font-black text-slate-900 text-lg mb-2">
                    {isUk ? "Заявку отримано!" : "Request received!"}
                  </h3>
                  <p className="text-slate-500 text-sm">
                    {isUk
                      ? "Наш оцінювач зв'яжеться з вами протягом 2 годин"
                      : "Our evaluator will contact you within 2 hours"}
                  </p>
                  <button
                    onClick={() => { setSellDone(false); setSellStep(1); setSellMake(""); setSellModel(""); setSellYear(""); setSellMileage(""); setSellCondition(""); setSellName(""); setSellPhone(""); }}
                    className="mt-4 text-sm text-blue-600 hover:underline"
                  >
                    {isUk ? "Подати ще одну заявку" : "Submit another request"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════ */}
      <footer style={{ background: "#0f2744" }} className="py-10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-1 mb-3">
                <span className="text-green-400 font-black text-xl">Car</span>
                <span className="text-white font-black text-xl">Buy</span>
              </div>
              <p className="text-white/50 text-xs leading-relaxed">
                {isUk
                  ? "Найбільший маркетплейс перевірених авто в Україні"
                  : "Ukraine's largest verified used car marketplace"}
              </p>
            </div>

            {/* Catalog */}
            <div>
              <p className="text-white font-bold text-sm mb-3">
                {isUk ? "Каталог" : "Catalog"}
              </p>
              {[
                { uk: "Седани", en: "Sedans" },
                { uk: "Кросовери", en: "Crossovers" },
                { uk: "Хетчбеки", en: "Hatchbacks" },
                { uk: "Електромобілі", en: "Electric" },
              ].map((item, i) => (
                <p key={i} className="text-white/50 text-xs mb-1.5 hover:text-white/80 cursor-pointer transition-colors">
                  {isUk ? item.uk : item.en}
                </p>
              ))}
            </div>

            {/* Services */}
            <div>
              <p className="text-white font-bold text-sm mb-3">
                {isUk ? "Послуги" : "Services"}
              </p>
              {[
                { uk: "Продати авто", en: "Sell a Car" },
                { uk: "Кредитування", en: "Financing" },
                { uk: "Страхування", en: "Insurance" },
                { uk: "CarBuy Звіт", en: "CarBuy Report" },
              ].map((item, i) => (
                <p key={i} className="text-white/50 text-xs mb-1.5 hover:text-white/80 cursor-pointer transition-colors">
                  {isUk ? item.uk : item.en}
                </p>
              ))}
            </div>

            {/* Contact */}
            <div>
              <p className="text-white font-bold text-sm mb-3">
                {isUk ? "Контакти" : "Contact"}
              </p>
              <p className="text-white/50 text-xs mb-1.5">📞 0 800 500 123</p>
              <p className="text-white/50 text-xs mb-1.5">✉️ hello@carbuy.ua</p>
              <p className="text-white/50 text-xs mb-1.5">
                📍 {isUk ? "Київ, Хрещатик 1" : "Kyiv, Khreshchatyk 1"}
              </p>
              <p className="text-white/50 text-xs">
                🕐 {isUk ? "Пн–Нд, 9:00–21:00" : "Mon–Sun, 9:00–21:00"}
              </p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-white/30 text-xs">
              © 2024 CarBuy. {isUk ? "Всі права захищено." : "All rights reserved."}
            </p>
            <div className="flex gap-4">
              {[
                { uk: "Умови використання", en: "Terms of Use" },
                { uk: "Конфіденційність", en: "Privacy Policy" },
              ].map((item, i) => (
                <span key={i} className="text-white/30 text-xs hover:text-white/60 cursor-pointer transition-colors">
                  {isUk ? item.uk : item.en}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
