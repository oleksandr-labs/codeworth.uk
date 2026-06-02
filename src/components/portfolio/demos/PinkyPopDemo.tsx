"use client";

import { useState } from "react";

export function PinkyPopDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  // --- State ---
  const [nailShape, setNailShape] = useState("Almond");
  const [nailLength, setNailLength] = useState("Medium");
  const [nailColor, setNailColor] = useState("#E91E8C");
  const [decorations, setDecorations] = useState<string[]>([]);
  const [activeGalleryFilter, setActiveGalleryFilter] = useState("All");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [masterNote, setMasterNote] = useState("");
  const [bookingData, setBookingData] = useState({
    name: "",
    phone: "",
    master: "",
    service: "",
    date: "",
    time: "",
  });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // --- Nail Builder Data ---
  const nailShapes = [
    { id: "Almond", label: isUk ? "Мигдаль" : "Almond" },
    { id: "Square", label: isUk ? "Квадрат" : "Square" },
    { id: "Oval", label: isUk ? "Овал" : "Oval" },
    { id: "Ballerina", label: isUk ? "Балерина" : "Ballerina" },
    { id: "Stiletto", label: isUk ? "Стілет" : "Stiletto" },
  ];

  const nailLengths = [
    { id: "Short", label: isUk ? "Короткі" : "Short" },
    { id: "Medium", label: isUk ? "Середні" : "Medium" },
    { id: "Long", label: isUk ? "Довгі" : "Long" },
  ];

  const colorSwatches = [
    "#E91E8C", "#9C27B0", "#F5F03A", "#FF4081",
    "#FF6D00", "#00E5FF", "#76FF03", "#FFFFFF",
    "#111111", "#C62828", "#AD1457", "#6A1B9A",
  ];

  const decorationOptions = [
    { id: "Rhinestones", label: isUk ? "Стрази" : "Rhinestones" },
    { id: "Foil", label: isUk ? "Фольга" : "Foil" },
    { id: "3D", label: isUk ? "3D елементи" : "3D Elements" },
    { id: "Ombre", label: isUk ? "Омбре" : "Ombre" },
    { id: "Art", label: isUk ? "Розпис" : "Nail Art" },
  ];

  const toggleDecoration = (id: string) => {
    setDecorations((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  const buildMasterNote = () => {
    const shapeLabel = nailShapes.find((s) => s.id === nailShape)?.label ?? nailShape;
    const lengthLabel = nailLengths.find((l) => l.id === nailLength)?.label ?? nailLength;
    const decorLabel = decorations
      .map((d) => decorationOptions.find((o) => o.id === d)?.label ?? d)
      .join(", ");
    if (isUk) {
      setMasterNote(
        `Форма: ${shapeLabel} | Довжина: ${lengthLabel} | Колір: ${nailColor}${decorLabel ? ` | Декор: ${decorLabel}` : ""}`
      );
    } else {
      setMasterNote(
        `Shape: ${shapeLabel} | Length: ${lengthLabel} | Color: ${nailColor}${decorLabel ? ` | Decorations: ${decorLabel}` : ""}`
      );
    }
  };

  // --- Gallery Data ---
  const galleryFilters = [
    { id: "All", label: isUk ? "Усі" : "All" },
    { id: "French", label: "French" },
    { id: "Ombre", label: isUk ? "Омбре" : "Ombré" },
    { id: "3D", label: "3D" },
    { id: "Minimalism", label: isUk ? "Мінімалізм" : "Minimalism" },
    { id: "Seasonal", label: isUk ? "Сезонне" : "Seasonal" },
    { id: "Festive", label: isUk ? "Святкове" : "Festive" },
  ];

  const galleryCards = [
    { id: 1, bg: "#E91E8C", category: "French", tag: isUk ? "Класичний French" : "Classic French" },
    { id: 2, bg: "#9C27B0", category: "Ombre", tag: isUk ? "Фіолетове омбре" : "Purple Ombré" },
    { id: 3, bg: "#F5F03A", category: "Minimalism", tag: isUk ? "Жовтий мінімалізм" : "Yellow Minimal" },
    { id: 4, bg: "#FF4081", category: "3D", tag: isUk ? "3D квіти" : "3D Flowers" },
    { id: 5, bg: "#FF6D00", category: "Festive", tag: isUk ? "Святкові вогні" : "Festive Lights" },
    { id: 6, bg: "#00E5FF", category: "Seasonal", tag: isUk ? "Літній аквамарин" : "Summer Aqua" },
    { id: 7, bg: "#C62828", category: "Festive", tag: isUk ? "Новорічне" : "New Year" },
    { id: 8, bg: "#AD1457", category: "French", tag: isUk ? "Рожевий French" : "Pink French" },
    { id: 9, bg: "#6A1B9A", category: "Ombre", tag: isUk ? "Фантастичне омбре" : "Fantasy Ombré" },
  ];

  const filteredCards =
    activeGalleryFilter === "All"
      ? galleryCards
      : galleryCards.filter((c) => c.category === activeGalleryFilter);

  // --- Price Calculator ---
  const serviceOptions = [
    { id: "Manicure", label: isUk ? "Манікюр" : "Manicure", price: 350 },
    { id: "Pedicure", label: isUk ? "Педикюр" : "Pedicure", price: 450 },
    { id: "Extensions", label: isUk ? "Нарощування" : "Extensions", price: 700 },
    { id: "Design", label: isUk ? "Дизайн" : "Design", price: 200 },
  ];

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const totalPrice = serviceOptions
    .filter((s) => selectedServices.includes(s.id))
    .reduce((sum, s) => sum + s.price, 0);

  // --- Masters ---
  const masters = [
    {
      name: "Аліна К.",
      experience: isUk ? "5 років досвіду" : "5 years experience",
      specialty: isUk ? "3D дизайн та ліплення" : "3D Design & Sculpting",
      emoji: "💅",
    },
    {
      name: "Вікторія М.",
      experience: isUk ? "7 років досвіду" : "7 years experience",
      specialty: isUk ? "Омбре та градієнти" : "Ombré & Gradients",
      emoji: "✨",
    },
    {
      name: "Дарина Г.",
      experience: isUk ? "3 роки досвіду" : "3 years experience",
      specialty: isUk ? "Мінімалізм та French" : "Minimalism & French",
      emoji: "🌸",
    },
  ];

  // --- Booking ---
  const handleBookingChange = (field: string, value: string) => {
    setBookingData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);
  };

  // --- Nail Preview Shape clip-path helper ---
  const getNailClipPath = (shape: string) => {
    switch (shape) {
      case "Almond": return "ellipse(45% 60% at 50% 60%)";
      case "Square": return "inset(5% 10% 0% 10% round 4px)";
      case "Oval": return "ellipse(40% 55% at 50% 55%)";
      case "Ballerina": return "polygon(20% 100%, 80% 100%, 70% 0%, 30% 0%)";
      case "Stiletto": return "polygon(30% 100%, 70% 100%, 55% 0%, 45% 0%)";
      default: return "ellipse(45% 60% at 50% 60%)";
    }
  };

  const fingerWidths = ["w-7", "w-9", "w-10", "w-9", "w-7"];
  const fingerHeights = ["h-20", "h-24", "h-28", "h-26", "h-22"];

  return (
    <div className="font-sans bg-[#111111] text-white min-h-screen overflow-hidden">

      {/* =========================================
          HERO SECTION
      ========================================= */}
      <section className="relative bg-linear-to-br from-[#E91E8C] to-[#9C27B0] py-20 px-6 overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-[-60px] right-[-60px] w-64 h-64 rounded-full bg-[#F5F03A] opacity-20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-40px] left-[-40px] w-48 h-48 rounded-full bg-white opacity-10 blur-2xl pointer-events-none" />

        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-block bg-[#F5F03A] text-[#111111] text-xs font-black uppercase tracking-widest px-4 py-1 rounded-full mb-6">
            ✦ Y2K NAIL STUDIO ✦
          </div>
          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-4 drop-shadow-xl">
            {isUk ? "Нігті, що говорять за вас" : "Nails That Speak For You"}
          </h1>
          <p className="text-lg md:text-xl font-medium text-white/80 mb-8">
            {isUk
              ? "Дизайн, що підкорює. Якість, що залишається."
              : "Designs that conquer. Quality that lasts."}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <button className="bg-[#F5F03A] text-[#111111] font-black text-base px-8 py-3 rounded-full hover:scale-105 transition-transform shadow-lg">
              {isUk ? "Записатися" : "Book Now"}
            </button>
            <button className="border-2 border-white text-white font-black text-base px-8 py-3 rounded-full hover:bg-white hover:text-[#9C27B0] transition-colors">
              {isUk ? "Переглянути роботи" : "View Work"}
            </button>
          </div>

          {/* Marquee */}
          <div className="overflow-hidden whitespace-nowrap">
            <div
              className="inline-block text-[#F5F03A] font-bold text-sm tracking-wide"
              style={{ animation: "marquee 18s linear infinite" }}
            >
              #NailArt &nbsp;✦&nbsp; #Y2KVibes &nbsp;✦&nbsp; #GlitterNails &nbsp;✦&nbsp; #3DNails &nbsp;✦&nbsp; #PinkyPop &nbsp;✦&nbsp; #NailsOfTheDay &nbsp;✦&nbsp; #GelNails &nbsp;✦&nbsp; #ChromeNails &nbsp;✦&nbsp; #NailArt &nbsp;✦&nbsp; #Y2KVibes &nbsp;✦&nbsp; #GlitterNails &nbsp;✦&nbsp; #3DNails &nbsp;✦&nbsp; #PinkyPop &nbsp;✦&nbsp; #NailsOfTheDay &nbsp;✦&nbsp;
            </div>
          </div>
        </div>
        <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      </section>

      {/* =========================================
          NAIL DESIGN BUILDER
      ========================================= */}
      <section className="py-16 px-6 bg-[#1a0a1a]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[#F5F03A] text-xs font-black uppercase tracking-widest">
              ✦ {isUk ? "Конструктор дизайну" : "Design Builder"} ✦
            </span>
            <h2 className="text-4xl font-black mt-2">
              {isUk ? "Створи свій ідеальний манікюр" : "Build Your Perfect Manicure"}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Steps */}
            <div className="space-y-8">

              {/* Step 1: Shape */}
              <div>
                <p className="text-[#E91E8C] font-black text-xs uppercase tracking-widest mb-3">
                  {isUk ? "Крок 1 — Форма нігтів" : "Step 1 — Nail Shape"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {nailShapes.map((shape) => (
                    <button
                      key={shape.id}
                      onClick={() => setNailShape(shape.id)}
                      className={`px-4 py-2 rounded-full text-sm font-bold border-2 transition-all ${
                        nailShape === shape.id
                          ? "bg-[#E91E8C] border-[#E91E8C] text-white"
                          : "border-[#E91E8C]/40 text-white/70 hover:border-[#E91E8C]"
                      }`}
                    >
                      {shape.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Length */}
              <div>
                <p className="text-[#9C27B0] font-black text-xs uppercase tracking-widest mb-3">
                  {isUk ? "Крок 2 — Довжина" : "Step 2 — Length"}
                </p>
                <div className="flex gap-3">
                  {nailLengths.map((len) => (
                    <button
                      key={len.id}
                      onClick={() => setNailLength(len.id)}
                      className={`px-5 py-2 rounded-full text-sm font-bold border-2 transition-all ${
                        nailLength === len.id
                          ? "bg-[#9C27B0] border-[#9C27B0] text-white"
                          : "border-[#9C27B0]/40 text-white/70 hover:border-[#9C27B0]"
                      }`}
                    >
                      {len.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Color */}
              <div>
                <p className="text-[#F5F03A] font-black text-xs uppercase tracking-widest mb-3">
                  {isUk ? "Крок 3 — Базовий колір" : "Step 3 — Base Color"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {colorSwatches.map((color) => (
                    <button
                      key={color}
                      onClick={() => setNailColor(color)}
                      style={{ backgroundColor: color }}
                      className={`w-9 h-9 rounded-full border-4 transition-transform hover:scale-110 ${
                        nailColor === color
                          ? "border-[#F5F03A] scale-125"
                          : "border-transparent"
                      }`}
                      aria-label={color}
                    />
                  ))}
                </div>
              </div>

              {/* Step 4: Decorations */}
              <div>
                <p className="text-[#FF4081] font-black text-xs uppercase tracking-widest mb-3">
                  {isUk ? "Крок 4 — Декорації" : "Step 4 — Decorations"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {decorationOptions.map((dec) => (
                    <label
                      key={dec.id}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border-2 cursor-pointer transition-all ${
                        decorations.includes(dec.id)
                          ? "bg-[#FF4081] border-[#FF4081] text-white"
                          : "border-[#FF4081]/40 text-white/70 hover:border-[#FF4081]"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={decorations.includes(dec.id)}
                        onChange={() => toggleDecoration(dec.id)}
                      />
                      {dec.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Show to Master button */}
              <button
                onClick={buildMasterNote}
                className="w-full bg-linear-to-br from-[#E91E8C] to-[#9C27B0] text-white font-black py-4 rounded-2xl text-base hover:opacity-90 transition-opacity shadow-lg"
              >
                💅 {isUk ? "Показати майстру" : "Show to Master"}
              </button>

              {masterNote && (
                <div className="bg-[#F5F03A] text-[#111111] rounded-2xl p-4 font-bold text-sm break-words">
                  ✦ {masterNote}
                </div>
              )}
            </div>

            {/* Nail Preview */}
            <div className="flex flex-col items-center justify-center">
              <p className="text-white/50 text-xs uppercase tracking-widest mb-6">
                {isUk ? "Попередній перегляд" : "Preview"}
              </p>
              {/* Stylized hand */}
              <div className="relative flex items-end justify-center gap-1 h-40">
                {fingerWidths.map((fw, i) => (
                  <div key={i} className={`relative ${fw} ${fingerHeights[i]} flex flex-col justify-start`}>
                    {/* Nail tip */}
                    <div
                      className="w-full shrink-0 transition-all duration-300"
                      style={{
                        height: nailLength === "Short" ? "28%" : nailLength === "Medium" ? "40%" : "55%",
                        backgroundColor: nailColor,
                        clipPath: getNailClipPath(nailShape),
                        boxShadow: `0 0 12px ${nailColor}88`,
                      }}
                    />
                    {/* Finger body */}
                    <div className="flex-1 bg-[#FDDCD4] rounded-b-full" />
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <span className="text-white/40 text-xs">
                  {nailShapes.find((s) => s.id === nailShape)?.label} ·{" "}
                  {nailLengths.find((l) => l.id === nailLength)?.label}
                </span>
              </div>
              {decorations.length > 0 && (
                <div className="mt-3 flex flex-wrap justify-center gap-1">
                  {decorations.map((d) => (
                    <span key={d} className="bg-[#E91E8C]/20 border border-[#E91E8C] text-[#E91E8C] text-xs px-2 py-0.5 rounded-full font-bold">
                      {decorationOptions.find((o) => o.id === d)?.label}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          GALLERY
      ========================================= */}
      <section className="py-16 px-6 bg-[#111111]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[#E91E8C] text-xs font-black uppercase tracking-widest">
              ✦ {isUk ? "Галерея" : "Gallery"} ✦
            </span>
            <h2 className="text-4xl font-black mt-2">
              {isUk ? "Наші роботи" : "Our Work"}
            </h2>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {galleryFilters.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveGalleryFilter(f.id)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                  activeGalleryFilter === f.id
                    ? "bg-[#E91E8C] text-white"
                    : "bg-white/10 text-white/60 hover:bg-white/20"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filteredCards.map((card) => (
              <div
                key={card.id}
                className="relative group rounded-3xl overflow-hidden aspect-square cursor-pointer"
                style={{ backgroundColor: card.bg }}
              >
                {/* Pattern overlay */}
                <div className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 60%)",
                  }}
                />
                {/* Tag */}
                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  {card.tag}
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#111111]/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-[#F5F03A] font-black text-sm text-center px-4">
                    {isUk ? "Замовити цей дизайн" : "Order this design"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          TREND OF THE WEEK
      ========================================= */}
      <section className="py-12 px-6 bg-linear-to-br from-[#9C27B0] to-[#E91E8C]">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-8">
          {/* Featured nail preview */}
          <div className="shrink-0 w-32 h-32 rounded-3xl flex items-center justify-center text-6xl shadow-2xl"
            style={{ backgroundColor: "#F5F03A" }}>
            💅
          </div>
          <div>
            <span className="bg-[#111111] text-[#F5F03A] text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full">
              ✦ {isUk ? "Тренд тижня" : "Trend of the Week"}
            </span>
            <h3 className="text-3xl font-black mt-3 mb-2">
              {isUk ? "Хромовий омбре-мигдаль" : "Chrome Ombré Almond"}
            </h3>
            <p className="text-white/80 text-base leading-relaxed">
              {isUk
                ? "Блискучий хром із плавним переходом від рожевого до фіолетового — абсолютний хіт сезону! Ідеально для тих, хто хоче виділятися. Доступний у нас в будь-який день тижня."
                : "Shiny chrome with a seamless gradient from pink to purple — the absolute hit of the season! Perfect for those who want to stand out. Available any day of the week."}
            </p>
            <button className="mt-4 bg-[#F5F03A] text-[#111111] font-black px-6 py-2 rounded-full hover:scale-105 transition-transform">
              {isUk ? "Хочу такий!" : "I want this!"}
            </button>
          </div>
        </div>
      </section>

      {/* =========================================
          PRICE CALCULATOR
      ========================================= */}
      <section className="py-16 px-6 bg-[#1a0a1a]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[#F5F03A] text-xs font-black uppercase tracking-widest">
              ✦ {isUk ? "Калькулятор ціни" : "Price Calculator"} ✦
            </span>
            <h2 className="text-4xl font-black mt-2">
              {isUk ? "Порахуй свій візит" : "Calculate Your Visit"}
            </h2>
          </div>

          <div className="bg-[#111111] rounded-3xl p-8 space-y-4">
            {serviceOptions.map((svc) => (
              <label
                key={svc.id}
                className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  selectedServices.includes(svc.id)
                    ? "border-[#E91E8C] bg-[#E91E8C]/10"
                    : "border-white/10 hover:border-white/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="w-5 h-5 accent-[#E91E8C]"
                    checked={selectedServices.includes(svc.id)}
                    onChange={() => toggleService(svc.id)}
                  />
                  <span className="font-bold text-base">{svc.label}</span>
                </div>
                <span className="text-[#F5F03A] font-black text-base">
                  {svc.price} {isUk ? "грн" : "UAH"}
                </span>
              </label>
            ))}

            <div className="pt-4 border-t-2 border-white/10 flex items-center justify-between">
              <span className="text-white/60 font-bold">
                {isUk ? "Разом:" : "Total:"}
              </span>
              <span className="text-3xl font-black text-[#F5F03A]">
                {totalPrice} {isUk ? "грн" : "UAH"}
              </span>
            </div>

            {totalPrice === 0 && (
              <p className="text-center text-white/30 text-sm">
                {isUk ? "Оберіть послуги вище" : "Select services above"}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* =========================================
          MASTERS
      ========================================= */}
      <section className="py-16 px-6 bg-[#111111]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[#9C27B0] text-xs font-black uppercase tracking-widest">
              ✦ {isUk ? "Наші майстри" : "Our Masters"} ✦
            </span>
            <h2 className="text-4xl font-black mt-2">
              {isUk ? "Команда PinkyPop" : "PinkyPop Team"}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {masters.map((master, i) => (
              <div
                key={i}
                className="bg-[#1a0a1a] rounded-3xl p-6 text-center border-2 border-white/5 hover:border-[#E91E8C]/40 transition-colors group"
              >
                <div className="w-20 h-20 rounded-full bg-linear-to-br from-[#E91E8C] to-[#9C27B0] flex items-center justify-center text-4xl mx-auto mb-4 group-hover:scale-110 transition-transform">
                  {master.emoji}
                </div>
                <h3 className="font-black text-xl mb-1">{master.name}</h3>
                <p className="text-[#E91E8C] text-sm font-bold mb-2">{master.experience}</p>
                <p className="text-white/50 text-sm">{master.specialty}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          BOOKING FORM
      ========================================= */}
      <section className="py-16 px-6 bg-[#1a0a1a]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[#E91E8C] text-xs font-black uppercase tracking-widest">
              ✦ {isUk ? "Онлайн запис" : "Book Online"} ✦
            </span>
            <h2 className="text-4xl font-black mt-2">
              {isUk ? "Запишіться до майстра" : "Book Your Appointment"}
            </h2>
          </div>

          {bookingSubmitted ? (
            <div className="bg-linear-to-br from-[#E91E8C] to-[#9C27B0] rounded-3xl p-10 text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-black mb-2">
                {isUk ? "Запис підтверджено!" : "Booking Confirmed!"}
              </h3>
              <p className="text-white/80">
                {isUk
                  ? `${bookingData.name}, ми чекаємо вас! Підтвердження надіслано на ${bookingData.phone}.`
                  : `${bookingData.name}, we can't wait to see you! Confirmation sent to ${bookingData.phone}.`}
              </p>
              <button
                onClick={() => { setBookingSubmitted(false); setBookingData({ name: "", phone: "", master: "", service: "", date: "", time: "" }); }}
                className="mt-6 bg-[#F5F03A] text-[#111111] font-black px-6 py-2 rounded-full hover:scale-105 transition-transform"
              >
                {isUk ? "Новий запис" : "New Booking"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-white/60 text-xs font-bold uppercase tracking-widest mb-2" htmlFor="pk-name">
                    {isUk ? "Ваше ім'я" : "Your Name"}
                  </label>
                  <input
                    id="pk-name"
                    type="text"
                    required
                    value={bookingData.name}
                    onChange={(e) => handleBookingChange("name", e.target.value)}
                    placeholder={isUk ? "Аліна" : "Alice"}
                    className="w-full bg-[#111111] border-2 border-white/10 rounded-2xl px-4 py-3 text-white font-bold placeholder:text-white/20 focus:border-[#E91E8C] focus:outline-none transition-colors"
                  />
                </div>
                {/* Phone */}
                <div>
                  <label className="block text-white/60 text-xs font-bold uppercase tracking-widest mb-2" htmlFor="pk-phone">
                    {isUk ? "Телефон" : "Phone"}
                  </label>
                  <input
                    id="pk-phone"
                    type="tel"
                    required
                    value={bookingData.phone}
                    onChange={(e) => handleBookingChange("phone", e.target.value)}
                    placeholder="+380 __ ___ ____"
                    className="w-full bg-[#111111] border-2 border-white/10 rounded-2xl px-4 py-3 text-white font-bold placeholder:text-white/20 focus:border-[#E91E8C] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Master */}
                <div>
                  <label className="block text-white/60 text-xs font-bold uppercase tracking-widest mb-2" htmlFor="pk-master">
                    {isUk ? "Майстер" : "Master"}
                  </label>
                  <select
                    id="pk-master"
                    required
                    value={bookingData.master}
                    onChange={(e) => handleBookingChange("master", e.target.value)}
                    className="w-full bg-[#111111] border-2 border-white/10 rounded-2xl px-4 py-3 text-white font-bold focus:border-[#E91E8C] focus:outline-none transition-colors"
                  >
                    <option value="">{isUk ? "Оберіть майстра" : "Choose master"}</option>
                    {masters.map((m, i) => (
                      <option key={i} value={m.name}>{m.name}</option>
                    ))}
                    <option value="any">{isUk ? "Будь-який вільний" : "Any available"}</option>
                  </select>
                </div>
                {/* Service */}
                <div>
                  <label className="block text-white/60 text-xs font-bold uppercase tracking-widest mb-2" htmlFor="pk-service">
                    {isUk ? "Послуга" : "Service"}
                  </label>
                  <select
                    id="pk-service"
                    required
                    value={bookingData.service}
                    onChange={(e) => handleBookingChange("service", e.target.value)}
                    className="w-full bg-[#111111] border-2 border-white/10 rounded-2xl px-4 py-3 text-white font-bold focus:border-[#E91E8C] focus:outline-none transition-colors"
                  >
                    <option value="">{isUk ? "Оберіть послугу" : "Choose service"}</option>
                    {serviceOptions.map((s) => (
                      <option key={s.id} value={s.id}>{s.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Date */}
                <div>
                  <label className="block text-white/60 text-xs font-bold uppercase tracking-widest mb-2" htmlFor="pk-date">
                    {isUk ? "Дата" : "Date"}
                  </label>
                  <input
                    id="pk-date"
                    type="date"
                    required
                    value={bookingData.date}
                    onChange={(e) => handleBookingChange("date", e.target.value)}
                    className="w-full bg-[#111111] border-2 border-white/10 rounded-2xl px-4 py-3 text-white font-bold focus:border-[#E91E8C] focus:outline-none transition-colors"
                  />
                </div>
                {/* Time */}
                <div>
                  <label className="block text-white/60 text-xs font-bold uppercase tracking-widest mb-2" htmlFor="pk-time">
                    {isUk ? "Час" : "Time"}
                  </label>
                  <select
                    id="pk-time"
                    required
                    value={bookingData.time}
                    onChange={(e) => handleBookingChange("time", e.target.value)}
                    className="w-full bg-[#111111] border-2 border-white/10 rounded-2xl px-4 py-3 text-white font-bold focus:border-[#E91E8C] focus:outline-none transition-colors"
                  >
                    <option value="">{isUk ? "Оберіть час" : "Choose time"}</option>
                    {["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"].map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-linear-to-br from-[#E91E8C] to-[#9C27B0] text-white font-black py-4 rounded-2xl text-base hover:opacity-90 transition-opacity shadow-xl mt-2"
              >
                💅 {isUk ? "Підтвердити запис" : "Confirm Booking"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* =========================================
          FOOTER
      ========================================= */}
      <footer className="bg-[#0a000a] py-10 px-6 border-t-2 border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="text-2xl font-black">
                <span className="text-[#E91E8C]">Pinky</span>
                <span className="text-[#F5F03A]">Pop</span>
                <span className="text-white"> 💅</span>
              </div>
              <p className="text-white/30 text-sm mt-1">
                {isUk ? "Студія нейл-арту" : "Nail Art Studio"}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-sm font-bold text-white/40">
              <a href="#" className="hover:text-[#E91E8C] transition-colors">
                {isUk ? "Галерея" : "Gallery"}
              </a>
              <a href="#" className="hover:text-[#E91E8C] transition-colors">
                {isUk ? "Ціни" : "Prices"}
              </a>
              <a href="#" className="hover:text-[#E91E8C] transition-colors">
                {isUk ? "Майстри" : "Masters"}
              </a>
              <a href="#" className="hover:text-[#E91E8C] transition-colors">
                {isUk ? "Запис" : "Booking"}
              </a>
              <a href="#" className="hover:text-[#E91E8C] transition-colors">
                Instagram
              </a>
            </div>

            <div className="text-center md:text-right">
              <p className="text-white/30 text-xs">
                {isUk ? "Демо-компонент Codeworth" : "Codeworth demo component"}
              </p>
              <p className="text-white/20 text-xs mt-0.5">© 2026 PinkyPop</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {["#NailArt", "#Y2KVibes", "#GlitterNails", "#PinkyPop", "#NailsOfTheDay", "#GelNails"].map((tag) => (
              <span key={tag} className="bg-white/5 text-white/30 text-xs px-3 py-1 rounded-full font-bold">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
