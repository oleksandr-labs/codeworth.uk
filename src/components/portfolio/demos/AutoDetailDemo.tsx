"use client";

import { useState } from "react";

export function AutoDetailDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  // --- State ---
  const [activeService, setActiveService] = useState<string>("detailing");
  const [configuratorStep, setConfiguratorStep] = useState<number>(1);
  const [selectedCarType, setSelectedCarType] = useState<string>("");
  const [selectedFilmType, setSelectedFilmType] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("#1a1a2e");
  const [bookingStep, setBookingStep] = useState<number>(1);
  const [bookingData, setBookingData] = useState<{
    service: string;
    make: string;
    model: string;
    year: string;
    date: string;
    time: string;
    name: string;
    phone: string;
    email: string;
  }>({
    service: "",
    make: "",
    model: "",
    year: "",
    date: "",
    time: "",
    name: "",
    phone: "",
    email: "",
  });
  const [bookingDone, setBookingDone] = useState(false);

  // --- Data ---
  const carTypes = [
    { id: "hatchback", label: isUk ? "Хетчбек" : "Hatchback", factor: 1.0 },
    { id: "sedan", label: isUk ? "Седан" : "Sedan", factor: 1.1 },
    { id: "suv", label: "SUV", factor: 1.35 },
    { id: "coupe", label: isUk ? "Купе" : "Coupe", factor: 1.15 },
  ];

  const filmTypes = [
    { id: "matte", label: isUk ? "Матова" : "Matte", factor: 1.0 },
    { id: "gloss", label: isUk ? "Глянець" : "Gloss", factor: 0.95 },
    { id: "satin", label: isUk ? "Сатин" : "Satin", factor: 1.1 },
    { id: "chrome", label: "Chrome", factor: 1.6 },
    { id: "carbon", label: isUk ? "Карбон" : "Carbon", factor: 1.4 },
    { id: "camo", label: isUk ? "Камуфляж" : "Camo", factor: 1.2 },
  ];

  const colorPalette = [
    { hex: "#1a1a1a", name: isUk ? "Чорний" : "Black" },
    { hex: "#2c2c2c", name: isUk ? "Темно-сірий" : "Charcoal" },
    { hex: "#6b6b6b", name: isUk ? "Сірий" : "Gunmetal" },
    { hex: "#C0C0C0", name: isUk ? "Сталевий" : "Silver" },
    { hex: "#e8e8e8", name: isUk ? "Перловий" : "Pearl White" },
    { hex: "#E11D48", name: isUk ? "Червоний" : "Racing Red" },
    { hex: "#7f1d1d", name: isUk ? "Бордо" : "Burgundy" },
    { hex: "#1e3a5f", name: isUk ? "Нічний синій" : "Midnight Blue" },
    { hex: "#0f4c35", name: isUk ? "Смарагдовий" : "British Racing Green" },
    { hex: "#3b1a6b", name: isUk ? "Фіолетовий" : "Phantom Purple" },
    { hex: "#c87533", name: isUk ? "Мідний" : "Copper Bronze" },
    { hex: "#d4af37", name: isUk ? "Золотий" : "Gold" },
  ];

  const baseWrapPrice = 28000;

  const detailingPackages = [
    {
      id: "basic",
      name: isUk ? "Базовий" : "Basic",
      hours: isUk ? "3–4 год" : "3–4 hrs",
      price: isUk ? "від 800 грн" : "from €30",
      color: "#4b5563",
      includes: isUk
        ? ["Зовнішнє миття", "Чистка дисків", "Миття двигуна", "Поліш вікон"]
        : ["Exterior wash", "Rim cleaning", "Engine bay wash", "Window polish"],
    },
    {
      id: "full",
      name: isUk ? "Повний" : "Full",
      hours: isUk ? "6–8 год" : "6–8 hrs",
      price: isUk ? "від 2 400 грн" : "from €90",
      color: "#1e40af",
      includes: isUk
        ? ["Все з Базового", "Хімчистка салону", "Поліровка кузову", "Нанесення воску", "Обробка пластику"]
        : ["All from Basic", "Interior steam clean", "Body polishing", "Wax coating", "Plastic treatment"],
    },
    {
      id: "premium",
      name: "Premium",
      hours: isUk ? "12–16 год" : "12–16 hrs",
      price: isUk ? "від 5 500 грн" : "from €200",
      color: "#7c2d12",
      includes: isUk
        ? ["Все з Повного", "Глинування кузову", "Однокрокова поліровка", "Нанесення кераміки", "Детейлінг хромованих елементів", "Озонування салону"]
        : ["All from Full", "Clay bar treatment", "One-step machine polish", "Ceramic sealant", "Chrome detailing", "Interior ozone treatment"],
    },
  ];

  const services = [
    {
      id: "detailing",
      icon: "✦",
      name: isUk ? "Детейлінг" : "Detailing",
      desc: isUk
        ? "Повне відновлення зовнішнього вигляду та салону автомобіля"
        : "Complete restoration of exterior and interior appearance",
    },
    {
      id: "wrap",
      icon: "◈",
      name: isUk ? "Вінілова плівка" : "Car Wrap",
      desc: isUk
        ? "Повне або часткове обклеювання автомобіля преміальною плівкою"
        : "Full or partial vehicle wrapping with premium vinyl film",
    },
    {
      id: "ppf",
      icon: "◉",
      name: "PPF",
      desc: isUk
        ? "Захисна поліуретанова плівка для захисту лакофарбового покриття"
        : "Clear polyurethane film to protect your paint from damage",
    },
    {
      id: "ceramic",
      icon: "◆",
      name: isUk ? "Кераміка" : "Ceramic",
      desc: isUk
        ? "Нанокерамічне покриття для довготривалого захисту та блиску"
        : "Nano-ceramic coating for long-lasting protection and gloss",
    },
    {
      id: "polish",
      icon: "◇",
      name: isUk ? "Поліровка" : "Polishing",
      desc: isUk
        ? "Усунення подряпин, окислення та повернення первісного блиску"
        : "Scratch removal, oxidation correction and shine restoration",
    },
  ];

  const wrapOptions = [
    {
      type: isUk ? "Повне обклеювання" : "Full Wrap",
      coverage: "100%",
      price: isUk ? "від 22 000 грн" : "from €820",
      desc: isUk ? "Весь кузов + бампери" : "Full body + bumpers",
    },
    {
      type: isUk ? "Часткове обклеювання" : "Partial Wrap",
      coverage: "50–70%",
      price: isUk ? "від 12 000 грн" : "from €450",
      desc: isUk ? "Капот, дах, багажник" : "Hood, roof, trunk",
    },
    {
      type: isUk ? "Акценти" : "Accents",
      coverage: "10–20%",
      price: isUk ? "від 3 500 грн" : "from €130",
      desc: isUk ? "Дзеркала, стійки, спойлер" : "Mirrors, pillars, spoiler",
    },
  ];

  const ppfPackages = [
    {
      zone: isUk ? "Зона удару" : "Impact Zone",
      coverage: isUk ? "Капот, бампер, крила" : "Hood, bumper, fenders",
      price: isUk ? "від 9 500 грн" : "from €360",
    },
    {
      zone: isUk ? "Повний перед" : "Full Front",
      coverage: isUk ? "+ двері, пороги" : "+ doors, sills",
      price: isUk ? "від 18 000 грн" : "from €680",
    },
    {
      zone: isUk ? "Весь кузов" : "Full Body",
      coverage: isUk ? "100% захист" : "100% protection",
      price: isUk ? "від 42 000 грн" : "from €1 580",
    },
  ];

  const ceramicPackages = [
    {
      tier: "Silver",
      duration: isUk ? "2 роки" : "2 years",
      layers: 1,
      price: isUk ? "від 4 500 грн" : "from €170",
      color: "#6b7280",
    },
    {
      tier: "Gold",
      duration: isUk ? "4 роки" : "4 years",
      layers: 2,
      price: isUk ? "від 8 000 грн" : "from €300",
      color: "#d4af37",
    },
    {
      tier: "Platinum",
      duration: isUk ? "7 років" : "7 years",
      layers: 3,
      price: isUk ? "від 14 000 грн" : "from €520",
      color: "#e2e8f0",
    },
  ];

  const polishTypes = [
    {
      name: isUk ? "Корекція 1 крок" : "One-Step Correction",
      desc: isUk ? "Видалення легких подряпин та голограм" : "Remove light scratches and holograms",
      price: isUk ? "від 2 800 грн" : "from €105",
    },
    {
      name: isUk ? "Корекція 2 кроки" : "Two-Step Correction",
      desc: isUk ? "Видалення глибоких подряпин та окислення" : "Deep scratch and oxidation removal",
      price: isUk ? "від 5 200 грн" : "from €195",
    },
    {
      name: isUk ? "Повна реставрація" : "Full Restoration",
      desc: isUk ? "Максимальне відновлення + нанесення захисного покриття" : "Maximum correction + protective coating application",
      price: isUk ? "від 9 000 грн" : "from €340",
    },
  ];

  const beforeAfterPairs = [
    {
      carType: isUk ? "Седан BMW" : "BMW Sedan",
      service: isUk ? "Детейлінг Premium" : "Premium Detailing",
      beforeBg: "#2d2010",
      afterBg: "#1a1a1a",
      beforeLabel: isUk ? "До — забруднений, тьмяний" : "Before — dirty, dull",
      afterLabel: isUk ? "Після — блискучий, чистий" : "After — gleaming, pristine",
      beforeAccent: "#6b5a3e",
      afterAccent: "#C0C0C0",
    },
    {
      carType: isUk ? "SUV Mercedes" : "Mercedes SUV",
      service: isUk ? "PPF — повний перед" : "PPF Full Front",
      beforeBg: "#1a1a2e",
      afterBg: "#0d1b2a",
      beforeLabel: isUk ? "До — вибоїни, сколи" : "Before — chips, stone damage",
      afterLabel: isUk ? "Після — PPF захист" : "After — PPF protected",
      beforeAccent: "#4a3f6b",
      afterAccent: "#3a86ff",
    },
    {
      carType: isUk ? "Купе Porsche" : "Porsche Coupe",
      service: isUk ? "Вінілова плівка — матова" : "Vinyl Wrap — Matte",
      beforeBg: "#1f1108",
      afterBg: "#111111",
      beforeLabel: isUk ? "До — тьмяна фарба" : "Before — faded paint",
      afterLabel: isUk ? "Після — новий образ" : "After — brand new look",
      beforeAccent: "#8b6914",
      afterAccent: "#E11D48",
    },
    {
      carType: isUk ? "Хетчбек Audi" : "Audi Hatchback",
      service: isUk ? "Кераміка Platinum" : "Ceramic Platinum",
      beforeBg: "#1a0a0a",
      afterBg: "#0a0a12",
      beforeLabel: isUk ? "До — окислена фарба" : "Before — oxidized paint",
      afterLabel: isUk ? "Після — кераміка 7 років" : "After — 7-year ceramic",
      beforeAccent: "#7f1d1d",
      afterAccent: "#a855f7",
    },
  ];

  const certificates = [
    {
      brand: "XPEL",
      title: isUk ? "XPEL Сертифікований Інсталятор" : "XPEL Certified Installer",
      desc: isUk ? "Авторизований партнер XPEL для встановлення Ultimate Plus PPF" : "Authorized XPEL partner for Ultimate Plus PPF installation",
      badgeBg: "#0a0a0a",
      badgeBorder: "#E11D48",
    },
    {
      brand: "3M",
      title: isUk ? "3M Авторизований Центр" : "3M Authorized Center",
      desc: isUk ? "Офіційний установник плівок серії 3M 1080 та Scotchgard PPF" : "Official installer of 3M 1080 series and Scotchgard PPF films",
      badgeBg: "#0a0a0a",
      badgeBorder: "#C0C0C0",
    },
    {
      brand: "Ceramic Pro",
      title: isUk ? "Ceramic Pro Сертифікований" : "Ceramic Pro Certified",
      desc: isUk ? "Офіційний аплікатор Ceramic Pro з правом нанесення 9H та Light" : "Official Ceramic Pro applicator certified for 9H and Light coatings",
      badgeBg: "#0a0a0a",
      badgeBorder: "#d4af37",
    },
    {
      brand: "GYEON",
      title: isUk ? "GYEON Авторизований" : "GYEON Authorized",
      desc: isUk ? "Сертифікований партнер GYEON для нанесення кварцових покриттів" : "Certified GYEON partner for quartz coating application",
      badgeBg: "#0a0a0a",
      badgeBorder: "#6b7280",
    },
  ];

  const serviceOptions = isUk
    ? ["Детейлінг Базовий", "Детейлінг Повний", "Детейлінг Premium", "Вінілова плівка", "PPF Захист", "Кераміка", "Поліровка"]
    : ["Basic Detailing", "Full Detailing", "Premium Detailing", "Car Wrap", "PPF Protection", "Ceramic Coating", "Polishing"];

  const timeSlots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

  // --- Computed values ---
  const calcWrapPrice = () => {
    const car = carTypes.find((c) => c.id === selectedCarType);
    const film = filmTypes.find((f) => f.id === selectedFilmType);
    if (!car || !film) return null;
    return Math.round(baseWrapPrice * car.factor * film.factor);
  };

  const wrapEstimate = calcWrapPrice();

  // --- Helpers ---
  const stepLabel = (n: number) =>
    isUk ? `Крок ${n}` : `Step ${n}`;

  const handleBookingInput = (field: string, value: string) => {
    setBookingData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBookingNext = () => {
    if (bookingStep < 4) setBookingStep((s) => s + 1);
    else setBookingDone(true);
  };

  const canProceedConfig = () => {
    if (configuratorStep === 1) return selectedCarType !== "";
    if (configuratorStep === 2) return selectedFilmType !== "";
    if (configuratorStep === 3) return selectedColor !== "";
    return true;
  };

  // ── RENDER ──────────────────────────────────────────────────────────────────
  return (
    <div
      className="w-full min-h-screen font-sans"
      style={{ background: "#0A0A0A", color: "#e5e5e5" }}
    >
      {/* ─── 1. HERO ──────────────────────────────────────────────────────── */}
      <section
        className="relative flex flex-col items-center justify-center min-h-screen px-6 py-24 text-center overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0A0A0A 0%, #111111 50%, #1a0505 100%)",
        }}
      >
        {/* Decorative grid */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(#C0C0C0 1px, transparent 1px), linear-gradient(90deg, #C0C0C0 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Red glow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-20 blur-3xl"
          style={{ background: "#E11D48" }}
        />

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Pre-title */}
          <p
            className="uppercase tracking-[0.3em] text-xs mb-6 font-semibold"
            style={{ color: "#E11D48" }}
          >
            {isUk ? "Преміум Студія Детейлінгу" : "Premium Detailing Studio"}
          </p>

          {/* Main headline */}
          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 tracking-tight">
            {isUk ? (
              <>
                Твоє авто.{" "}
                <span style={{ color: "#E11D48" }}>Ідеальний</span>
                <br />
                стан.
              </>
            ) : (
              <>
                Your Car.{" "}
                <span style={{ color: "#E11D48" }}>Perfect</span>
                <br />
                Condition.
              </>
            )}
          </h1>

          {/* Sub-headline */}
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: "#9ca3af" }}
          >
            {isUk
              ? "Детейлінг · Вінілова плівка · PPF · Кераміка — все в одному місці. Повертаємо автомобілям первісну досконалість."
              : "Detailing · Vinyl Wrap · PPF · Ceramic Coating — all under one roof. We restore cars to factory perfection and beyond."}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4 justify-center mb-14">
            <button
              className="px-8 py-4 rounded font-bold text-sm uppercase tracking-widest transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{ background: "#E11D48", color: "#fff" }}
              onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
            >
              {isUk ? "Записатись зараз" : "Book Now"}
            </button>
            <button
              className="px-8 py-4 rounded font-bold text-sm uppercase tracking-widest border transition-all duration-200 hover:bg-white/5"
              style={{ borderColor: "#C0C0C0", color: "#C0C0C0" }}
              onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
            >
              {isUk ? "Наші послуги" : "Our Services"}
            </button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-6 justify-center">
            {[
              {
                icon: "🏆",
                value: "2 000+",
                label: isUk ? "авто оброблено" : "cars treated",
              },
              {
                icon: "✓",
                value: isUk ? "XPEL / 3M" : "XPEL / 3M",
                label: isUk ? "сертифіковано" : "certified",
              },
              {
                icon: "★",
                value: isUk ? "5 років" : "5 years",
                label: isUk ? "гарантія" : "warranty",
              },
            ].map((b) => (
              <div
                key={b.label}
                className="flex flex-col items-center gap-1 px-6 py-4 rounded-lg border"
                style={{ borderColor: "#2a2a2a", background: "rgba(255,255,255,0.03)" }}
              >
                <span className="text-xl">{b.icon}</span>
                <span
                  className="text-lg font-bold"
                  style={{ color: "#C0C0C0" }}
                >
                  {b.value}
                </span>
                <span className="text-xs uppercase tracking-widest" style={{ color: "#6b7280" }}>
                  {b.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 2. SERVICES ──────────────────────────────────────────────────── */}
      <section id="services" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-12">
            <p className="uppercase tracking-[0.25em] text-xs mb-3" style={{ color: "#E11D48" }}>
              {isUk ? "Послуги" : "Services"}
            </p>
            <h2 className="text-4xl font-black">
              {isUk ? "Що ми робимо" : "What We Do"}
            </h2>
          </div>

          {/* Service tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {services.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveService(s.id)}
                className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                style={
                  activeService === s.id
                    ? { background: "#E11D48", color: "#fff" }
                    : { background: "#1a1a1a", color: "#9ca3af", border: "1px solid #2a2a2a" }
                }
              >
                <span className="mr-2">{s.icon}</span>
                {s.name}
              </button>
            ))}
          </div>

          {/* Service content */}
          <div
            className="rounded-2xl p-8 border"
            style={{ background: "#111111", borderColor: "#1f1f1f" }}
          >
            {/* Detailing */}
            {activeService === "detailing" && (
              <div>
                <p className="text-center mb-8" style={{ color: "#9ca3af" }}>
                  {isUk
                    ? "Обирайте пакет відповідно до потреб вашого автомобіля"
                    : "Choose the package that fits your car's needs"}
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  {detailingPackages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className="rounded-xl p-6 border transition-all duration-200 hover:border-red-600/50"
                      style={{ background: "#0a0a0a", borderColor: "#2a2a2a" }}
                    >
                      <div
                        className="w-10 h-10 rounded-lg mb-4 flex items-center justify-center text-white font-bold text-sm"
                        style={{ background: pkg.color }}
                      >
                        {pkg.id === "basic" ? "B" : pkg.id === "full" ? "F" : "P"}
                      </div>
                      <h3 className="text-xl font-bold mb-1">{pkg.name}</h3>
                      <p className="text-xs mb-3" style={{ color: "#6b7280" }}>
                        {pkg.hours}
                      </p>
                      <p className="text-lg font-bold mb-4" style={{ color: "#E11D48" }}>
                        {pkg.price}
                      </p>
                      <ul className="space-y-2">
                        {pkg.includes.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "#9ca3af" }}>
                            <span style={{ color: "#E11D48" }} className="shrink-0 mt-0.5">✓</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Wrap */}
            {activeService === "wrap" && (
              <div>
                <p className="text-center mb-8" style={{ color: "#9ca3af" }}>
                  {isUk
                    ? "Перетворіть свій автомобіль за допомогою преміальної вінілової плівки"
                    : "Transform your vehicle with premium vinyl film"}
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  {wrapOptions.map((w) => (
                    <div
                      key={w.type}
                      className="rounded-xl p-6 border"
                      style={{ background: "#0a0a0a", borderColor: "#2a2a2a" }}
                    >
                      <div
                        className="text-3xl font-black mb-2"
                        style={{ color: "#E11D48" }}
                      >
                        {w.coverage}
                      </div>
                      <h3 className="text-lg font-bold mb-1">{w.type}</h3>
                      <p className="text-sm mb-4" style={{ color: "#6b7280" }}>
                        {w.desc}
                      </p>
                      <p className="text-base font-bold" style={{ color: "#C0C0C0" }}>
                        {w.price}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="text-center mt-8 text-sm" style={{ color: "#6b7280" }}>
                  {isUk
                    ? "Скористайтесь нашим конфігуратором нижче для розрахунку точної вартості"
                    : "Use our configurator below to calculate your exact quote"}
                </p>
              </div>
            )}

            {/* PPF */}
            {activeService === "ppf" && (
              <div>
                <p className="text-center mb-8" style={{ color: "#9ca3af" }}>
                  {isUk
                    ? "Захист від каменів, подряпин та хімічних пошкоджень — невидимий, але надійний"
                    : "Protection from stone chips, scratches and chemical damage — invisible but bulletproof"}
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  {ppfPackages.map((p) => (
                    <div
                      key={p.zone}
                      className="rounded-xl p-6 border"
                      style={{ background: "#0a0a0a", borderColor: "#2a2a2a" }}
                    >
                      <div
                        className="w-8 h-8 rounded-full mb-4 flex items-center justify-center"
                        style={{ background: "rgba(193,0,56,0.2)", border: "1px solid #E11D48" }}
                      >
                        <span style={{ color: "#E11D48" }} className="text-sm font-bold">
                          ◉
                        </span>
                      </div>
                      <h3 className="text-lg font-bold mb-1">{p.zone}</h3>
                      <p className="text-sm mb-4" style={{ color: "#6b7280" }}>
                        {p.coverage}
                      </p>
                      <p className="text-base font-bold" style={{ color: "#E11D48" }}>
                        {p.price}
                      </p>
                    </div>
                  ))}
                </div>
                <div
                  className="mt-8 rounded-xl p-5 border text-center"
                  style={{ background: "#0d0d0d", borderColor: "#1f1f1f" }}
                >
                  <p className="text-sm" style={{ color: "#9ca3af" }}>
                    {isUk
                      ? "Використовуємо XPEL Ultimate Plus та 3M Scotchgard Pro — найкращі плівки на ринку"
                      : "We use XPEL Ultimate Plus and 3M Scotchgard Pro — the industry's top-rated PPF films"}
                  </p>
                </div>
              </div>
            )}

            {/* Ceramic */}
            {activeService === "ceramic" && (
              <div>
                <p className="text-center mb-8" style={{ color: "#9ca3af" }}>
                  {isUk
                    ? "Нанокерамічне покриття створює скловидний захисний шар на кузові"
                    : "Nano-ceramic coating creates a glass-like protective layer over your paint"}
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  {ceramicPackages.map((c) => (
                    <div
                      key={c.tier}
                      className="rounded-xl p-6 border"
                      style={{
                        background: "#0a0a0a",
                        borderColor: c.color,
                        boxShadow: `0 0 20px ${c.color}20`,
                      }}
                    >
                      <div
                        className="text-2xl font-black mb-4"
                        style={{ color: c.color }}
                      >
                        {c.tier}
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span style={{ color: "#6b7280" }}>
                            {isUk ? "Термін захисту" : "Protection"}
                          </span>
                          <span style={{ color: c.color }}>{c.duration}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span style={{ color: "#6b7280" }}>
                            {isUk ? "Шарів нанесення" : "Layers"}
                          </span>
                          <span style={{ color: "#e5e5e5" }}>{c.layers}</span>
                        </div>
                      </div>
                      <p className="text-lg font-bold" style={{ color: "#E11D48" }}>
                        {c.price}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Polish */}
            {activeService === "polish" && (
              <div>
                <p className="text-center mb-8" style={{ color: "#9ca3af" }}>
                  {isUk
                    ? "Машинна поліровка усуває дефекти лакофарбового покриття і повертає первісний блиск"
                    : "Machine polishing removes paint defects and restores that showroom shine"}
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  {polishTypes.map((p) => (
                    <div
                      key={p.name}
                      className="rounded-xl p-6 border"
                      style={{ background: "#0a0a0a", borderColor: "#2a2a2a" }}
                    >
                      <h3 className="text-lg font-bold mb-2">{p.name}</h3>
                      <p className="text-sm mb-4" style={{ color: "#6b7280" }}>
                        {p.desc}
                      </p>
                      <p className="text-base font-bold" style={{ color: "#E11D48" }}>
                        {p.price}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── 3. VINYL CONFIGURATOR ────────────────────────────────────────── */}
      <section
        id="configurator"
        className="py-20 px-6"
        style={{ background: "#0d0d0d" }}
      >
        <div className="max-w-5xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-14">
            <p className="uppercase tracking-[0.25em] text-xs mb-3" style={{ color: "#E11D48" }}>
              {isUk ? "Конфігуратор" : "Configurator"}
            </p>
            <h2 className="text-4xl font-black">
              {isUk ? "Розрахуй вартість обклеювання" : "Build Your Wrap Quote"}
            </h2>
            <p className="mt-4 text-base" style={{ color: "#6b7280" }}>
              {isUk
                ? "Налаштуй тип авто, плівку та колір — отримай миттєву оцінку вартості"
                : "Select your car type, film, and colour — get an instant price estimate"}
            </p>
          </div>

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mb-12">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (n < configuratorStep || (n === 1) || (n === 2 && selectedCarType) || (n === 3 && selectedFilmType) || n === 4)
                      setConfiguratorStep(n);
                  }}
                  className="w-9 h-9 rounded-full text-sm font-bold transition-all duration-200"
                  style={
                    configuratorStep === n
                      ? { background: "#E11D48", color: "#fff" }
                      : n < configuratorStep
                      ? { background: "#2a2a2a", color: "#C0C0C0" }
                      : { background: "#1a1a1a", color: "#4b5563" }
                  }
                >
                  {n}
                </button>
                {n < 4 && (
                  <div
                    className="w-12 h-0.5 rounded"
                    style={{ background: n < configuratorStep ? "#E11D48" : "#2a2a2a" }}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Left: steps */}
            <div
              className="rounded-2xl p-8 border"
              style={{ background: "#111111", borderColor: "#1f1f1f" }}
            >
              {/* Step 1: Car type */}
              {configuratorStep === 1 && (
                <div>
                  <h3 className="text-xl font-bold mb-6">
                    {stepLabel(1)} — {isUk ? "Тип автомобіля" : "Car Type"}
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {carTypes.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setSelectedCarType(c.id)}
                        className="p-4 rounded-xl border text-left transition-all duration-200"
                        style={
                          selectedCarType === c.id
                            ? { borderColor: "#E11D48", background: "rgba(225,29,72,0.1)" }
                            : { borderColor: "#2a2a2a", background: "#0a0a0a" }
                        }
                      >
                        <div className="text-2xl mb-2">
                          {c.id === "hatchback" ? "🚗" : c.id === "sedan" ? "🚘" : c.id === "suv" ? "🚙" : "🏎️"}
                        </div>
                        <div className="font-semibold text-sm">{c.label}</div>
                        <div className="text-xs mt-1" style={{ color: "#6b7280" }}>
                          ×{c.factor.toFixed(2)}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Film type */}
              {configuratorStep === 2 && (
                <div>
                  <h3 className="text-xl font-bold mb-6">
                    {stepLabel(2)} — {isUk ? "Тип плівки" : "Film Type"}
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {filmTypes.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setSelectedFilmType(f.id)}
                        className="p-4 rounded-xl border text-left transition-all duration-200"
                        style={
                          selectedFilmType === f.id
                            ? { borderColor: "#E11D48", background: "rgba(225,29,72,0.1)" }
                            : { borderColor: "#2a2a2a", background: "#0a0a0a" }
                        }
                      >
                        <div className="font-semibold text-sm">{f.label}</div>
                        <div className="text-xs mt-1" style={{ color: "#6b7280" }}>
                          ×{f.factor.toFixed(2)}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Color palette */}
              {configuratorStep === 3 && (
                <div>
                  <h3 className="text-xl font-bold mb-6">
                    {stepLabel(3)} — {isUk ? "Колір плівки" : "Film Colour"}
                  </h3>
                  <div className="grid grid-cols-4 gap-3">
                    {colorPalette.map((col) => (
                      <button
                        key={col.hex}
                        onClick={() => setSelectedColor(col.hex)}
                        title={col.name}
                        className="relative aspect-square rounded-lg transition-all duration-200"
                        style={{
                          background: col.hex,
                          outline:
                            selectedColor === col.hex
                              ? "3px solid #E11D48"
                              : "2px solid transparent",
                          outlineOffset: "2px",
                        }}
                      >
                        {selectedColor === col.hex && (
                          <span className="absolute inset-0 flex items-center justify-center text-white text-lg">
                            ✓
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                  <p className="mt-4 text-sm" style={{ color: "#6b7280" }}>
                    {colorPalette.find((c) => c.hex === selectedColor)?.name ?? ""}
                  </p>
                </div>
              )}

              {/* Step 4: Summary */}
              {configuratorStep === 4 && (
                <div>
                  <h3 className="text-xl font-bold mb-6">
                    {stepLabel(4)} — {isUk ? "Розрахунок" : "Your Quote"}
                  </h3>
                  {wrapEstimate ? (
                    <div className="space-y-4">
                      <div className="flex justify-between py-2 border-b" style={{ borderColor: "#2a2a2a" }}>
                        <span style={{ color: "#6b7280" }}>{isUk ? "Тип авто" : "Car type"}</span>
                        <span>{carTypes.find((c) => c.id === selectedCarType)?.label}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b" style={{ borderColor: "#2a2a2a" }}>
                        <span style={{ color: "#6b7280" }}>{isUk ? "Тип плівки" : "Film type"}</span>
                        <span>{filmTypes.find((f) => f.id === selectedFilmType)?.label}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b" style={{ borderColor: "#2a2a2a" }}>
                        <span style={{ color: "#6b7280" }}>{isUk ? "Колір" : "Colour"}</span>
                        <span className="flex items-center gap-2">
                          <span
                            className="inline-block w-4 h-4 rounded-full"
                            style={{ background: selectedColor }}
                          />
                          {colorPalette.find((c) => c.hex === selectedColor)?.name}
                        </span>
                      </div>
                      <div className="mt-6 rounded-xl p-6 text-center" style={{ background: "#0a0a0a" }}>
                        <p className="text-sm mb-1" style={{ color: "#6b7280" }}>
                          {isUk ? "Орієнтовна вартість" : "Estimated price from"}
                        </p>
                        <p className="text-4xl font-black" style={{ color: "#E11D48" }}>
                          {wrapEstimate.toLocaleString()} {isUk ? "грн" : "UAH"}
                        </p>
                        <p className="text-xs mt-2" style={{ color: "#4b5563" }}>
                          {isUk
                            ? "Точна ціна після огляду авто"
                            : "Final price after vehicle inspection"}
                        </p>
                      </div>
                      <button
                        className="w-full py-3 rounded-lg font-bold text-sm uppercase tracking-widest mt-2"
                        style={{ background: "#E11D48", color: "#fff" }}
                        onClick={() => {
                          handleBookingInput("service", isUk ? "Вінілова плівка" : "Car Wrap");
                          document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
                        }}
                      >
                        {isUk ? "Записатись на огляд" : "Book an Inspection"}
                      </button>
                    </div>
                  ) : (
                    <p style={{ color: "#6b7280" }}>
                      {isUk
                        ? "Будь ласка, поверніться та заповніть попередні кроки"
                        : "Please go back and complete previous steps"}
                    </p>
                  )}
                </div>
              )}

              {/* Nav buttons */}
              <div className="flex gap-3 mt-8">
                {configuratorStep > 1 && (
                  <button
                    className="px-5 py-2 rounded-lg text-sm border"
                    style={{ borderColor: "#2a2a2a", color: "#9ca3af" }}
                    onClick={() => setConfiguratorStep((s) => s - 1)}
                  >
                    {isUk ? "Назад" : "Back"}
                  </button>
                )}
                {configuratorStep < 4 && (
                  <button
                    className="px-5 py-2 rounded-lg text-sm font-semibold disabled:opacity-40 transition-opacity"
                    style={
                      canProceedConfig()
                        ? { background: "#E11D48", color: "#fff" }
                        : { background: "#2a2a2a", color: "#4b5563" }
                    }
                    disabled={!canProceedConfig()}
                    onClick={() => setConfiguratorStep((s) => s + 1)}
                  >
                    {isUk ? "Далі" : "Next"}
                  </button>
                )}
              </div>
            </div>

            {/* Right: live preview */}
            <div className="flex flex-col gap-4">
              <div
                className="rounded-2xl border overflow-hidden"
                style={{ borderColor: "#1f1f1f" }}
              >
                <div
                  className="h-64 relative transition-all duration-500 flex items-center justify-center"
                  style={{ background: selectedColor }}
                >
                  {/* Car silhouette overlay */}
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-20"
                    style={{ fontSize: "9rem", lineHeight: 1 }}
                  >
                    {selectedCarType === "suv"
                      ? "🚙"
                      : selectedCarType === "coupe"
                      ? "🏎️"
                      : selectedCarType === "sedan"
                      ? "🚘"
                      : "🚗"}
                  </div>
                  {/* Reflection shimmer */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-16 opacity-30"
                    style={{
                      background: `linear-gradient(to top, ${selectedColor}, transparent)`,
                    }}
                  />
                  <div
                    className="relative z-10 text-center px-4 py-2 rounded-lg"
                    style={{ background: "rgba(0,0,0,0.6)" }}
                  >
                    <p className="text-sm font-bold text-white">
                      {carTypes.find((c) => c.id === selectedCarType)?.label ?? (isUk ? "Оберіть авто" : "Select car")}
                    </p>
                    <p className="text-xs" style={{ color: "#9ca3af" }}>
                      {filmTypes.find((f) => f.id === selectedFilmType)?.label ?? (isUk ? "Оберіть плівку" : "Select film")}
                      {selectedColor !== "#1a1a2e" &&
                        ` · ${colorPalette.find((c) => c.hex === selectedColor)?.name ?? ""}`}
                    </p>
                  </div>
                </div>
                <div className="p-4" style={{ background: "#111111" }}>
                  <p className="text-xs text-center" style={{ color: "#4b5563" }}>
                    {isUk ? "Попередній перегляд кольору" : "Colour preview"}
                  </p>
                </div>
              </div>

              {/* Colour swatch info */}
              <div
                className="rounded-xl p-4 border flex items-center gap-4"
                style={{ background: "#111111", borderColor: "#1f1f1f" }}
              >
                <div
                  className="w-12 h-12 rounded-lg shrink-0"
                  style={{ background: selectedColor }}
                />
                <div>
                  <p className="font-semibold text-sm">
                    {colorPalette.find((c) => c.hex === selectedColor)?.name ?? "—"}
                  </p>
                  <p className="text-xs font-mono mt-0.5" style={{ color: "#6b7280" }}>
                    {selectedColor.toUpperCase()}
                  </p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-xs" style={{ color: "#6b7280" }}>
                    {isUk ? "Плівка" : "Film"}
                  </p>
                  <p className="text-sm font-semibold" style={{ color: "#C0C0C0" }}>
                    {filmTypes.find((f) => f.id === selectedFilmType)?.label ?? "—"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. BEFORE / AFTER GALLERY ────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="uppercase tracking-[0.25em] text-xs mb-3" style={{ color: "#E11D48" }}>
              {isUk ? "Галерея" : "Gallery"}
            </p>
            <h2 className="text-4xl font-black">
              {isUk ? "До та Після" : "Before & After"}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {beforeAfterPairs.map((pair) => (
              <div
                key={pair.carType}
                className="rounded-2xl overflow-hidden border"
                style={{ borderColor: "#1f1f1f" }}
              >
                {/* Header */}
                <div
                  className="px-5 py-3 flex justify-between items-center"
                  style={{ background: "#111111" }}
                >
                  <span className="font-bold text-sm">{pair.carType}</span>
                  <span
                    className="text-xs px-2 py-1 rounded-full"
                    style={{ background: "rgba(225,29,72,0.15)", color: "#E11D48" }}
                  >
                    {pair.service}
                  </span>
                </div>

                {/* Before / After panels */}
                <div className="grid grid-cols-2">
                  {/* Before */}
                  <div
                    className="h-40 relative flex flex-col items-center justify-center gap-2"
                    style={{ background: pair.beforeBg }}
                  >
                    {/* Grime effect */}
                    <div
                      className="absolute inset-0 opacity-50"
                      style={{
                        backgroundImage: `radial-gradient(circle at 30% 40%, ${pair.beforeAccent} 0%, transparent 60%), radial-gradient(circle at 70% 70%, ${pair.beforeAccent}80 0%, transparent 50%)`,
                      }}
                    />
                    <div className="relative z-10 text-center px-2">
                      <div className="text-3xl opacity-60">🚗</div>
                      <p
                        className="text-xs mt-1 font-semibold uppercase tracking-wider"
                        style={{ color: "#9ca3af" }}
                      >
                        {isUk ? "До" : "Before"}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: "#6b7280" }}>
                        {pair.beforeLabel}
                      </p>
                    </div>
                  </div>

                  {/* After */}
                  <div
                    className="h-40 relative flex flex-col items-center justify-center gap-2"
                    style={{ background: pair.afterBg }}
                  >
                    {/* Shine effect */}
                    <div
                      className="absolute inset-0 opacity-60"
                      style={{
                        backgroundImage: `radial-gradient(circle at 50% 30%, ${pair.afterAccent}40 0%, transparent 60%), linear-gradient(135deg, ${pair.afterAccent}20 0%, transparent 50%)`,
                      }}
                    />
                    {/* Highlight streak */}
                    <div
                      className="absolute top-2 left-1/4 w-1/2 h-0.5 rounded-full opacity-60"
                      style={{ background: pair.afterAccent }}
                    />
                    <div className="relative z-10 text-center px-2">
                      <div className="text-3xl">✨</div>
                      <p
                        className="text-xs mt-1 font-bold uppercase tracking-wider"
                        style={{ color: "#E11D48" }}
                      >
                        {isUk ? "Після" : "After"}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: pair.afterAccent }}>
                        {pair.afterLabel}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="relative h-1" style={{ background: pair.afterAccent, opacity: 0.4 }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. CERTIFICATES ──────────────────────────────────────────────── */}
      <section
        className="py-20 px-6"
        style={{ background: "#0d0d0d" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="uppercase tracking-[0.25em] text-xs mb-3" style={{ color: "#E11D48" }}>
              {isUk ? "Сертифікати" : "Certifications"}
            </p>
            <h2 className="text-4xl font-black">
              {isUk ? "Офіційні партнери" : "Official Partners"}
            </h2>
            <p className="mt-4" style={{ color: "#6b7280" }}>
              {isUk
                ? "Ми сертифіковані найвідомішими брендами в галузі захисту автомобілів"
                : "We are certified by the most recognized brands in automotive protection"}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {certificates.map((cert) => (
              <div
                key={cert.brand}
                className="rounded-2xl p-6 border text-center flex flex-col items-center gap-3 transition-all duration-200 hover:scale-105"
                style={{
                  background: cert.badgeBg,
                  borderColor: cert.badgeBorder,
                  boxShadow: `0 0 30px ${cert.badgeBorder}20`,
                }}
              >
                {/* Badge icon */}
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black border-2"
                  style={{
                    borderColor: cert.badgeBorder,
                    color: cert.badgeBorder,
                    background: `${cert.badgeBorder}15`,
                  }}
                >
                  ✦
                </div>
                <h3 className="font-black text-lg" style={{ color: cert.badgeBorder }}>
                  {cert.brand}
                </h3>
                <p className="text-xs font-semibold" style={{ color: "#e5e5e5" }}>
                  {cert.title}
                </p>
                <p className="text-xs leading-relaxed" style={{ color: "#6b7280" }}>
                  {cert.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. BOOKING FORM ──────────────────────────────────────────────── */}
      <section id="booking" className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-14">
            <p className="uppercase tracking-[0.25em] text-xs mb-3" style={{ color: "#E11D48" }}>
              {isUk ? "Запис" : "Booking"}
            </p>
            <h2 className="text-4xl font-black">
              {isUk ? "Запишіться на послугу" : "Book a Service"}
            </h2>
          </div>

          {/* Step progress */}
          {!bookingDone && (
            <div className="flex items-center justify-center gap-2 mb-10">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                    style={
                      bookingStep >= n
                        ? { background: "#E11D48", color: "#fff" }
                        : { background: "#1a1a1a", color: "#4b5563" }
                    }
                  >
                    {bookingStep > n ? "✓" : n}
                  </div>
                  {n < 4 && (
                    <div
                      className="w-10 h-0.5 rounded"
                      style={{ background: bookingStep > n ? "#E11D48" : "#2a2a2a" }}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          <div
            className="rounded-2xl p-8 border"
            style={{ background: "#111111", borderColor: "#1f1f1f" }}
          >
            {bookingDone ? (
              /* Success */
              <div className="text-center py-8">
                <div
                  className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl"
                  style={{ background: "rgba(225,29,72,0.15)", border: "2px solid #E11D48" }}
                >
                  ✓
                </div>
                <h3 className="text-2xl font-black mb-3">
                  {isUk ? "Заявку прийнято!" : "Request Received!"}
                </h3>
                <p style={{ color: "#9ca3af" }}>
                  {isUk
                    ? `Дякуємо, ${bookingData.name}! Ми зателефонуємо вам протягом 30 хвилин для підтвердження запису.`
                    : `Thank you, ${bookingData.name}! We'll call you within 30 minutes to confirm your appointment.`}
                </p>
                <button
                  className="mt-8 px-6 py-3 rounded-lg font-semibold text-sm"
                  style={{ background: "#1a1a1a", color: "#C0C0C0", border: "1px solid #2a2a2a" }}
                  onClick={() => {
                    setBookingDone(false);
                    setBookingStep(1);
                    setBookingData({ service: "", make: "", model: "", year: "", date: "", time: "", name: "", phone: "", email: "" });
                  }}
                >
                  {isUk ? "Нове бронювання" : "New Booking"}
                </button>
              </div>
            ) : (
              <div>
                {/* Step 1: Service */}
                {bookingStep === 1 && (
                  <div>
                    <h3 className="text-xl font-bold mb-6">
                      {isUk ? "Оберіть послугу" : "Select a Service"}
                    </h3>
                    <div className="grid gap-2">
                      {serviceOptions.map((svc) => (
                        <button
                          key={svc}
                          onClick={() => handleBookingInput("service", svc)}
                          className="flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-200"
                          style={
                            bookingData.service === svc
                              ? { borderColor: "#E11D48", background: "rgba(225,29,72,0.08)" }
                              : { borderColor: "#2a2a2a", background: "#0a0a0a" }
                          }
                        >
                          <span className="text-sm font-medium">{svc}</span>
                          {bookingData.service === svc && (
                            <span style={{ color: "#E11D48" }}>✓</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Car info */}
                {bookingStep === 2 && (
                  <div>
                    <h3 className="text-xl font-bold mb-6">
                      {isUk ? "Інформація про авто" : "Car Information"}
                    </h3>
                    <div className="space-y-4">
                      {[
                        { field: "make", label: isUk ? "Марка" : "Make", placeholder: isUk ? "напр. BMW" : "e.g. BMW" },
                        { field: "model", label: isUk ? "Модель" : "Model", placeholder: isUk ? "напр. M3" : "e.g. M3" },
                        { field: "year", label: isUk ? "Рік" : "Year", placeholder: "2020" },
                      ].map(({ field, label, placeholder }) => (
                        <div key={field}>
                          <label className="block text-sm font-medium mb-1" style={{ color: "#9ca3af" }}>
                            {label}
                          </label>
                          <input
                            type={field === "year" ? "number" : "text"}
                            placeholder={placeholder}
                            value={bookingData[field as keyof typeof bookingData]}
                            onChange={(e) => handleBookingInput(field, e.target.value)}
                            className="w-full px-4 py-3 rounded-lg text-sm outline-none focus:ring-1 transition-all"
                            style={{
                              background: "#0a0a0a",
                              border: "1px solid #2a2a2a",
                              color: "#e5e5e5",
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: Date & time */}
                {bookingStep === 3 && (
                  <div>
                    <h3 className="text-xl font-bold mb-6">
                      {isUk ? "Дата та час" : "Date & Time"}
                    </h3>
                    <div className="space-y-5">
                      <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: "#9ca3af" }}>
                          {isUk ? "Дата" : "Date"}
                        </label>
                        <input
                          type="date"
                          value={bookingData.date}
                          min={new Date().toISOString().split("T")[0]}
                          onChange={(e) => handleBookingInput("date", e.target.value)}
                          className="w-full px-4 py-3 rounded-lg text-sm outline-none"
                          style={{ background: "#0a0a0a", border: "1px solid #2a2a2a", color: "#e5e5e5" }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: "#9ca3af" }}>
                          {isUk ? "Час" : "Time"}
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {timeSlots.map((t) => (
                            <button
                              key={t}
                              onClick={() => handleBookingInput("time", t)}
                              className="py-2 rounded-lg text-sm font-medium transition-all duration-200"
                              style={
                                bookingData.time === t
                                  ? { background: "#E11D48", color: "#fff" }
                                  : { background: "#0a0a0a", color: "#9ca3af", border: "1px solid #2a2a2a" }
                              }
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Contact */}
                {bookingStep === 4 && (
                  <div>
                    <h3 className="text-xl font-bold mb-6">
                      {isUk ? "Контактні дані" : "Contact Info"}
                    </h3>
                    <div className="space-y-4">
                      {[
                        { field: "name", label: isUk ? "Ім'я" : "Name", type: "text", placeholder: isUk ? "Ваше ім'я" : "Your name" },
                        { field: "phone", label: isUk ? "Телефон" : "Phone", type: "tel", placeholder: "+380 XX XXX XXXX" },
                        { field: "email", label: "Email", type: "email", placeholder: "email@example.com" },
                      ].map(({ field, label, type, placeholder }) => (
                        <div key={field}>
                          <label className="block text-sm font-medium mb-1" style={{ color: "#9ca3af" }}>
                            {label}
                          </label>
                          <input
                            type={type}
                            placeholder={placeholder}
                            value={bookingData[field as keyof typeof bookingData]}
                            onChange={(e) => handleBookingInput(field, e.target.value)}
                            className="w-full px-4 py-3 rounded-lg text-sm outline-none"
                            style={{ background: "#0a0a0a", border: "1px solid #2a2a2a", color: "#e5e5e5" }}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Summary */}
                    <div
                      className="mt-6 p-4 rounded-xl border space-y-2"
                      style={{ background: "#0a0a0a", borderColor: "#1f1f1f" }}
                    >
                      <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#6b7280" }}>
                        {isUk ? "Резюме замовлення" : "Booking Summary"}
                      </p>
                      {[
                        [isUk ? "Послуга" : "Service", bookingData.service],
                        [isUk ? "Авто" : "Car", `${bookingData.make} ${bookingData.model} ${bookingData.year}`],
                        [isUk ? "Дата" : "Date", bookingData.date],
                        [isUk ? "Час" : "Time", bookingData.time],
                      ].map(([k, v]) => (
                        <div key={k} className="flex justify-between text-sm">
                          <span style={{ color: "#6b7280" }}>{k}</span>
                          <span style={{ color: "#C0C0C0" }}>{v || "—"}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex gap-3 mt-8">
                  {bookingStep > 1 && (
                    <button
                      className="px-5 py-2 rounded-lg text-sm border"
                      style={{ borderColor: "#2a2a2a", color: "#9ca3af" }}
                      onClick={() => setBookingStep((s) => s - 1)}
                    >
                      {isUk ? "Назад" : "Back"}
                    </button>
                  )}
                  <button
                    className="flex-1 py-3 rounded-lg font-bold text-sm uppercase tracking-widest"
                    style={{ background: "#E11D48", color: "#fff" }}
                    onClick={handleBookingNext}
                  >
                    {bookingStep === 4
                      ? isUk ? "Підтвердити запис" : "Confirm Booking"
                      : isUk ? "Далі" : "Next"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── 7. FOOTER ────────────────────────────────────────────────────── */}
      <footer
        className="py-12 px-6 border-t"
        style={{ background: "#0A0A0A", borderColor: "#1f1f1f" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-10 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-8 h-8 rounded flex items-center justify-center font-black text-sm"
                  style={{ background: "#E11D48", color: "#fff" }}
                >
                  A
                </div>
                <span className="font-black text-lg tracking-tight">
                  AUTO<span style={{ color: "#E11D48" }}>DETAIL</span>
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "#6b7280" }}>
                {isUk
                  ? "Преміум студія детейлінгу. Детейлінг, вінілова плівка, PPF та кераміка."
                  : "Premium detailing studio. Detailing, vinyl wrap, PPF and ceramic coating."}
              </p>
            </div>

            {/* Contacts */}
            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest mb-4" style={{ color: "#C0C0C0" }}>
                {isUk ? "Контакти" : "Contact"}
              </h4>
              <ul className="space-y-2 text-sm" style={{ color: "#6b7280" }}>
                <li>📍 {isUk ? "вул. Гаражна 12, Київ" : "12 Garage St, Kyiv"}</li>
                <li>📞 +380 44 000 0000</li>
                <li>✉ info@autodetail.ua</li>
                <li>🕐 {isUk ? "Пн–Сб 08:00–20:00" : "Mon–Sat 08:00–20:00"}</li>
              </ul>
            </div>

            {/* Certifications summary */}
            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest mb-4" style={{ color: "#C0C0C0" }}>
                {isUk ? "Сертифікати" : "Certified By"}
              </h4>
              <div className="flex flex-wrap gap-2">
                {["XPEL", "3M", "Ceramic Pro", "GYEON"].map((brand) => (
                  <span
                    key={brand}
                    className="px-3 py-1 rounded-full text-xs font-semibold border"
                    style={{ borderColor: "#2a2a2a", color: "#9ca3af" }}
                  >
                    {brand}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-sm" style={{ color: "#6b7280" }}>
                {isUk ? "Гарантія на всі роботи до 5 років" : "Up to 5-year warranty on all services"}
              </p>
            </div>
          </div>

          <div
            className="pt-6 border-t flex flex-wrap justify-between gap-3 text-xs"
            style={{ borderColor: "#1f1f1f", color: "#4b5563" }}
          >
            <span>
              © {new Date().getFullYear()} AutoDetail.{" "}
              {isUk ? "Всі права захищені." : "All rights reserved."}
            </span>
            <span style={{ color: "#E11D48" }}>
              {isUk ? "Зроблено з ❤ для автолюбителів" : "Made with ❤ for car enthusiasts"}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
