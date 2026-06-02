"use client";

import { useState } from "react";

export function DustZeroDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  /* ── Accordion state ── */
  const [expandedAccordion, setExpandedAccordion] = useState<number | null>(null);

  /* ── Stepper state ── */
  const [activePhaserStep, setActivePhaserStep] = useState(0);

  /* ── Calculator state ── */
  const [calcValues, setCalcValues] = useState<{
    type: "apartment" | "house" | "commercial";
    area: number;
    renovation: "cosmetic" | "major" | "newbuild";
    phases: { rough: boolean; clean: boolean; final: boolean };
    windowCount: number;
    ventilation: boolean;
    curtains: boolean;
  }>({
    type: "apartment",
    area: 80,
    renovation: "major",
    phases: { rough: true, clean: true, final: true },
    windowCount: 0,
    ventilation: false,
    curtains: false,
  });

  /* ── Order form state ── */
  const [orderForm, setOrderForm] = useState({
    address: "",
    type: "apartment",
    area: "",
    renovation: "major",
    name: "",
    phone: "",
    comment: "",
  });

  /* ── Price calculation ── */
  const baseRateMap = { apartment: 18, house: 22, commercial: 20 };
  const renovationMultiplier = {
    cosmetic: 1.0,
    major: 1.35,
    newbuild: 1.5,
  };
  const phaseRates = { rough: 0.25, clean: 0.45, final: 0.3 };

  const phaseCount = Object.values(calcValues.phases).filter(Boolean).length;
  const phaseMultiplier =
    (calcValues.phases.rough ? phaseRates.rough : 0) +
    (calcValues.phases.clean ? phaseRates.clean : 0) +
    (calcValues.phases.final ? phaseRates.final : 0);

  let basePrice =
    calcValues.area *
    baseRateMap[calcValues.type] *
    renovationMultiplier[calcValues.renovation] *
    (phaseMultiplier || 0.1);

  if (calcValues.windowCount > 0) basePrice += calcValues.windowCount * 280;
  if (calcValues.ventilation) basePrice += 1200;
  if (calcValues.curtains) basePrice += 800;

  const allThreeDiscount = phaseCount === 3 ? 0.1 : 0;
  const priceMin = Math.round(basePrice * (1 - allThreeDiscount) * 0.9);
  const priceMax = Math.round(basePrice * (1 - allThreeDiscount) * 1.1);

  const durationBase =
    calcValues.type === "commercial"
      ? calcValues.area / 120
      : calcValues.area / 80;
  const durationMin = Math.max(1, Math.round(durationBase * phaseCount * 0.8));
  const durationMax = Math.max(2, Math.round(durationBase * phaseCount * 1.4));

  /* ── Data ── */
  const accordionItems = [
    {
      icon: "💨",
      title: isUk ? "Будівельний пил" : "Construction Dust",
      desc: isUk
        ? "Видалення найдрібніших частинок пилу з усіх поверхонь, включно зі стелею та стінами"
        : "Removal of finest dust particles from all surfaces including ceiling and walls",
    },
    {
      icon: "🧱",
      title: isUk ? "Цементні залишки" : "Cement Residue",
      desc: isUk
        ? "Механічне та хімічне очищення цементних плям із плитки, підлоги та сантехніки"
        : "Mechanical and chemical removal of cement stains from tiles, floors and plumbing",
    },
    {
      icon: "🎨",
      title: isUk ? "Фарба та лак" : "Paint & Varnish",
      desc: isUk
        ? "Зняття крапель фарби зі скла, підлоги, дверей та фурнітури без пошкоджень"
        : "Removing paint drips from glass, floors, doors and hardware without damage",
    },
    {
      icon: "🔧",
      title: isUk ? "Монтажна піна" : "Mounting Foam",
      desc: isUk
        ? "Видалення залишків монтажної піни навколо вікон, дверей та труб"
        : "Removing mounting foam residue around windows, doors and pipes",
    },
    {
      icon: "🪟",
      title: isUk ? "Скло та плитка" : "Glass & Tiles",
      desc: isUk
        ? "Знежирення та полірування до блиску всього скла та керамічної плитки"
        : "Degreasing and polishing all glass and ceramic tiles to a shine",
    },
    {
      icon: "🏠",
      title: isUk ? "Підлогові покриття" : "Floor Coverings",
      desc: isUk
        ? "Очищення паркету, ламінату, плитки та наливної підлоги від сміття та пилу"
        : "Cleaning parquet, laminate, tile and self-leveling floors from debris and dust",
    },
    {
      icon: "🌬️",
      title: isUk ? "Вентиляція" : "Ventilation",
      desc: isUk
        ? "Промивання вентиляційних решіток і каналів від будівельного пилу та залишків"
        : "Flushing ventilation grilles and ducts of construction dust and debris",
    },
    {
      icon: "🔲",
      title: isUk ? "Вікна та рами" : "Windows & Frames",
      desc: isUk
        ? "Повне миття стекол з двох сторін, очищення рам і підвіконників"
        : "Full window washing from both sides, cleaning frames and windowsills",
    },
  ];

  const phases = [
    {
      label: isUk ? "Фаза 1 — Груба" : "Phase 1 — Rough",
      title: isUk ? "Грубе прибирання" : "Rough Cleaning",
      icon: "🏗️",
      color: "#78716C",
      tasks: isUk
        ? [
            "Вивіз великого сміття та будматеріалів",
            "Прибирання будівельного пилу пилососом",
            "Попередня обробка стін та стелі",
            "Підготовка поверхонь до детального очищення",
          ]
        : [
            "Removing large debris and building materials",
            "Vacuuming construction dust",
            "Pre-treatment of walls and ceiling",
            "Preparing surfaces for detailed cleaning",
          ],
    },
    {
      label: isUk ? "Фаза 2 — Чиста" : "Phase 2 — Clean",
      title: isUk ? "Чисте прибирання" : "Clean Cleaning",
      icon: "🧹",
      color: "#4D7C0F",
      tasks: isUk
        ? [
            "Миття стін, плитки та сантехніки",
            "Очищення віконних рам та підвіконників",
            "Видалення цементних плям та фарби",
            "Обробка дверей, ручок та фурнітури",
          ]
        : [
            "Washing walls, tiles and plumbing",
            "Cleaning window frames and windowsills",
            "Removing cement stains and paint",
            "Treating doors, handles and hardware",
          ],
    },
    {
      label: isUk ? "Фаза 3 — Фінальний блиск" : "Phase 3 — Final Sparkle",
      title: isUk ? "Фінальний блиск" : "Final Sparkle",
      icon: "✨",
      color: "#D4AF37",
      tasks: isUk
        ? [
            "Полірування підлоги та скла",
            "Протирання всіх деталей та декору",
            "Миття вікон з обох сторін",
            "Фінальна перевірка — готово до заселення",
          ]
        : [
            "Polishing floors and glass",
            "Wiping all details and decor",
            "Washing windows from both sides",
            "Final inspection — move-in ready",
          ],
    },
  ];

  const galleryPairs = [
    {
      label: isUk ? "Квартира 2-кімн." : "2-room Apartment",
      area: "68 m²",
    },
    {
      label: isUk ? "Приватний будинок" : "Private House",
      area: "145 m²",
    },
    {
      label: isUk ? "Офіс open-space" : "Open-space Office",
      area: "220 m²",
    },
    {
      label: isUk ? "Новобудова студія" : "New Build Studio",
      area: "34 m²",
    },
  ];

  const equipment = [
    {
      icon: "🌀",
      title: isUk ? "Промисловий пилосос" : "Industrial Vacuum",
      desc: isUk
        ? "Потужність 3000 Вт, HEPA H14 фільтр — утримує 99,995% частинок"
        : "3000W power, HEPA H14 filter — captures 99.995% of particles",
    },
    {
      icon: "🧪",
      title: isUk ? "Спеціальна хімія" : "Special Chemicals",
      desc: isUk
        ? "Професійні розчинники та засоби для видалення цементу, фарби та піни"
        : "Professional solvents for removing cement, paint and foam",
    },
    {
      icon: "🔩",
      title: isUk ? "Власне обладнання" : "Own Equipment",
      desc: isUk
        ? "Жодної оренди — власний інструмент у бездоганному стані"
        : "No rentals — our own tools in immaculate condition",
    },
    {
      icon: "🥽",
      title: isUk ? "Засоби захисту" : "Protective Gear",
      desc: isUk
        ? "Повний комплект ЗІЗ для команди та захист меблів і підлог замовника"
        : "Full PPE kit for team plus protection of client furniture and floors",
    },
  ];

  const trustItems = [
    { icon: "⚙️", label: isUk ? "Промислове обладнання" : "Industrial Equipment" },
    { icon: "🧪", label: isUk ? "Спеціальна хімія" : "Special Chemicals" },
    { icon: "⚡", label: isUk ? "Виїзд за 24 год" : "24h Dispatch" },
  ];

  const objTypes: { value: "apartment" | "house" | "commercial"; label: string }[] = [
    { value: "apartment", label: isUk ? "Квартира" : "Apartment" },
    { value: "house", label: isUk ? "Будинок" : "House" },
    { value: "commercial", label: isUk ? "Комерційне" : "Commercial" },
  ];

  const renovationTypes: { value: "cosmetic" | "major" | "newbuild"; label: string }[] = [
    { value: "cosmetic", label: isUk ? "Косметичний" : "Cosmetic" },
    { value: "major", label: isUk ? "Капітальний" : "Major" },
    { value: "newbuild", label: isUk ? "Нова будівля" : "New Build" },
  ];

  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: "#1C1917", color: "#E7E5E4" }}>

      {/* ── NAV ── */}
      <nav
        className="sticky top-0 z-50 border-b"
        style={{ backgroundColor: "#0C0A09", borderColor: "#292524" }}
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl shrink-0">🏗️</span>
            <div>
              <span className="font-black text-lg tracking-tight" style={{ color: "#E7E5E4" }}>
                DUST<span style={{ color: "#4D7C0F" }}>ZERO</span>
              </span>
              <div className="text-xs" style={{ color: "#78716C" }}>
                {isUk ? "Промислове прибирання після ремонту" : "Industrial Post-Construction Cleaning"}
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm" style={{ color: "#A8A29E" }}>
            {(isUk
              ? ["Послуги", "Калькулятор", "Галерея", "Обладнання", "Замовити"]
              : ["Services", "Calculator", "Gallery", "Equipment", "Order"]
            ).map((item) => (
              <span key={item} className="hover:text-white cursor-pointer transition-colors">
                {item}
              </span>
            ))}
          </div>
          <button
            className="text-sm font-bold px-4 py-2 rounded"
            style={{ backgroundColor: "#4D7C0F", color: "#fff" }}
          >
            {isUk ? "Замовити" : "Order Now"}
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative max-w-6xl mx-auto px-4 pt-16 pb-20">
        <div className="text-center mb-10">
          <div
            className="inline-block text-xs font-bold tracking-widest px-4 py-1 rounded-full mb-4 uppercase"
            style={{ backgroundColor: "#292524", color: "#4D7C0F", border: "1px solid #4D7C0F" }}
          >
            {isUk ? "Спеціалізоване прибирання" : "Specialized Post-Construction Cleaning"}
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight" style={{ color: "#E7E5E4" }}>
            {isUk ? "Після ремонту —" : "After Construction —"}
            <br />
            <span style={{ color: "#4D7C0F" }}>
              {isUk ? "до ідеального стану" : "To Perfect Condition"}
            </span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "#A8A29E" }}>
            {isUk
              ? "Видаляємо будівельний пил, цемент, фарбу та піну. Здаємо об'єкт повністю готовим до заселення."
              : "We remove construction dust, cement, paint and foam. We hand over the property fully ready to move in."}
          </p>
        </div>

        {/* Before/After split visual */}
        <div className="flex rounded-xl overflow-hidden border" style={{ borderColor: "#292524", minHeight: 220 }}>
          {/* Before */}
          <div
            className="w-1/2 flex flex-col items-center justify-center p-8 relative"
            style={{
              background: "linear-gradient(135deg, #292524 0%, #1C1917 60%, #3D2A1A 100%)",
            }}
          >
            <div className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: "repeating-linear-gradient(45deg, #78716C 0, #78716C 1px, transparent 0, transparent 50%)",
                backgroundSize: "10px 10px",
              }}
            />
            <span className="text-5xl mb-3 relative z-10">🏚️</span>
            <span
              className="relative z-10 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded"
              style={{ backgroundColor: "#44403C", color: "#A8A29E" }}
            >
              {isUk ? "ДО прибирання" : "BEFORE Cleaning"}
            </span>
            <p className="relative z-10 text-xs mt-3 text-center" style={{ color: "#78716C" }}>
              {isUk
                ? "Пил, цемент, залишки матеріалів"
                : "Dust, cement, material residue"}
            </p>
          </div>

          {/* Divider */}
          <div
            className="w-1 flex items-center justify-center relative z-10"
            style={{ backgroundColor: "#4D7C0F" }}
          >
            <div
              className="absolute w-8 h-8 rounded-full flex items-center justify-center font-black text-xs"
              style={{ backgroundColor: "#4D7C0F", color: "#fff" }}
            >
              VS
            </div>
          </div>

          {/* After */}
          <div
            className="w-1/2 flex flex-col items-center justify-center p-8"
            style={{
              background: "linear-gradient(135deg, #1A2E0A 0%, #1C2D10 60%, #F0FDF4 100%)",
            }}
          >
            <span className="text-5xl mb-3">✨</span>
            <span
              className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded"
              style={{ backgroundColor: "#14532D", color: "#86EFAC" }}
            >
              {isUk ? "ПІСЛЯ прибирання" : "AFTER Cleaning"}
            </span>
            <p className="text-xs mt-3 text-center" style={{ color: "#A8A29E" }}>
              {isUk
                ? "Бездоганна чистота, готово до заселення"
                : "Spotless clean, ready to move in"}
            </p>
          </div>
        </div>

        {/* Trust row */}
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          {trustItems.map((t) => (
            <div
              key={t.label}
              className="flex items-center gap-2 px-4 py-2 rounded-lg"
              style={{ backgroundColor: "#292524", border: "1px solid #44403C" }}
            >
              <span className="text-xl shrink-0">{t.icon}</span>
              <span className="text-sm font-semibold" style={{ color: "#D6D3D1" }}>
                {t.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHAT WE CLEAN — ACCORDION ── */}
      <section
        className="py-16"
        style={{ backgroundColor: "#0C0A09" }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-black mb-2 text-center" style={{ color: "#E7E5E4" }}>
            {isUk ? "Що ми прибираємо" : "What We Clean"}
          </h2>
          <p className="text-center mb-10 text-sm" style={{ color: "#78716C" }}>
            {isUk
              ? "Повний цикл прибирання після будь-якого ремонту"
              : "Full cleaning cycle after any type of renovation"}
          </p>
          <div className="grid gap-2 max-w-3xl mx-auto">
            {accordionItems.map((item, i) => (
              <div
                key={i}
                className="rounded-lg overflow-hidden"
                style={{ border: "1px solid", borderColor: expandedAccordion === i ? "#4D7C0F" : "#292524" }}
              >
                <button
                  className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors"
                  style={{
                    backgroundColor: expandedAccordion === i ? "#1A2E0A" : "#1C1917",
                    color: "#E7E5E4",
                  }}
                  onClick={() => setExpandedAccordion(expandedAccordion === i ? null : i)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl shrink-0">{item.icon}</span>
                    <span className="font-bold">{item.title}</span>
                  </div>
                  <span
                    className="text-lg shrink-0 transition-transform"
                    style={{
                      color: "#4D7C0F",
                      transform: expandedAccordion === i ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    +
                  </span>
                </button>
                {expandedAccordion === i && (
                  <div
                    className="px-5 py-4 text-sm"
                    style={{ backgroundColor: "#141210", color: "#A8A29E" }}
                  >
                    {item.desc}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLEANING PHASES STEPPER ── */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-black mb-2 text-center" style={{ color: "#E7E5E4" }}>
          {isUk ? "Фази прибирання" : "Cleaning Phases"}
        </h2>
        <p className="text-center mb-10 text-sm" style={{ color: "#78716C" }}>
          {isUk ? "Клікніть на фазу для деталей" : "Click a phase for details"}
        </p>

        {/* Step tabs */}
        <div className="flex flex-col md:flex-row gap-2 mb-6">
          {phases.map((phase, i) => (
            <button
              key={i}
              className="flex-1 flex items-center gap-3 px-4 py-3 rounded-lg font-bold text-sm transition-all text-left"
              style={{
                backgroundColor: activePhaserStep === i ? phase.color : "#1C1917",
                color: activePhaserStep === i ? "#fff" : "#78716C",
                border: `2px solid ${activePhaserStep === i ? phase.color : "#292524"}`,
              }}
              onClick={() => setActivePhaserStep(i)}
            >
              <span className="text-2xl shrink-0">{phase.icon}</span>
              <span>{phase.label}</span>
            </button>
          ))}
        </div>

        {/* Active phase detail */}
        <div
          className="rounded-xl p-6"
          style={{
            backgroundColor: "#141210",
            border: `2px solid ${phases[activePhaserStep].color}`,
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{phases[activePhaserStep].icon}</span>
            <div>
              <h3 className="text-xl font-black" style={{ color: "#E7E5E4" }}>
                {phases[activePhaserStep].title}
              </h3>
              <span className="text-xs" style={{ color: phases[activePhaserStep].color }}>
                {isUk ? `Крок ${activePhaserStep + 1} з 3` : `Step ${activePhaserStep + 1} of 3`}
              </span>
            </div>
          </div>
          <ul className="space-y-2">
            {phases[activePhaserStep].tasks.map((task, ti) => (
              <li key={ti} className="flex items-start gap-2 text-sm" style={{ color: "#D6D3D1" }}>
                <span style={{ color: phases[activePhaserStep].color }} className="shrink-0 mt-0.5">✓</span>
                {task}
              </li>
            ))}
          </ul>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-4">
          <button
            className="px-4 py-2 rounded text-sm font-bold disabled:opacity-30"
            style={{ backgroundColor: "#292524", color: "#E7E5E4" }}
            disabled={activePhaserStep === 0}
            onClick={() => setActivePhaserStep((s) => Math.max(0, s - 1))}
          >
            {isUk ? "← Попередня" : "← Previous"}
          </button>

          {/* All-3 discount badge */}
          <div
            className="text-xs font-bold px-4 py-2 rounded-full text-center"
            style={{ backgroundColor: "#1A2E0A", color: "#4D7C0F", border: "1px solid #4D7C0F" }}
          >
            {isUk ? "Замовте всі 3 фази — знижка 10%" : "Order all 3 phases — 10% discount"}
          </div>

          <button
            className="px-4 py-2 rounded text-sm font-bold disabled:opacity-30"
            style={{ backgroundColor: "#292524", color: "#E7E5E4" }}
            disabled={activePhaserStep === phases.length - 1}
            onClick={() => setActivePhaserStep((s) => Math.min(phases.length - 1, s + 1))}
          >
            {isUk ? "Наступна →" : "Next →"}
          </button>
        </div>
      </section>

      {/* ── PROJECT COST CALCULATOR ── */}
      <section
        className="py-16"
        style={{ backgroundColor: "#0C0A09" }}
      >
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-black mb-2 text-center" style={{ color: "#E7E5E4" }}>
            {isUk ? "Калькулятор вартості" : "Project Cost Calculator"}
          </h2>
          <p className="text-center mb-10 text-sm" style={{ color: "#78716C" }}>
            {isUk ? "Отримайте орієнтовну вартість за 30 секунд" : "Get an estimate in 30 seconds"}
          </p>

          <div
            className="rounded-xl p-6 md:p-8 grid md:grid-cols-2 gap-8"
            style={{ backgroundColor: "#1C1917", border: "1px solid #292524" }}
          >
            {/* Left column — inputs */}
            <div className="space-y-6">
              {/* Object type */}
              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: "#A8A29E" }}>
                  {isUk ? "Тип об'єкта" : "Object Type"}
                </label>
                <div className="flex gap-2">
                  {objTypes.map((o) => (
                    <button
                      key={o.value}
                      className="flex-1 py-2 rounded text-xs font-bold transition-all"
                      style={{
                        backgroundColor: calcValues.type === o.value ? "#4D7C0F" : "#292524",
                        color: calcValues.type === o.value ? "#fff" : "#78716C",
                      }}
                      onClick={() => setCalcValues((v) => ({ ...v, type: o.value }))}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Area slider */}
              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: "#A8A29E" }}>
                  {isUk ? `Площа: ${calcValues.area} м²` : `Area: ${calcValues.area} m²`}
                </label>
                <input
                  type="range"
                  min={20}
                  max={500}
                  value={calcValues.area}
                  className="w-full accent-lime-700"
                  onChange={(e) =>
                    setCalcValues((v) => ({ ...v, area: Number(e.target.value) }))
                  }
                />
                <div className="flex justify-between text-xs mt-1" style={{ color: "#57534E" }}>
                  <span>20 m²</span>
                  <span>500 m²</span>
                </div>
              </div>

              {/* Renovation type */}
              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: "#A8A29E" }}>
                  {isUk ? "Тип ремонту" : "Renovation Type"}
                </label>
                <div className="flex gap-2">
                  {renovationTypes.map((r) => (
                    <button
                      key={r.value}
                      className="flex-1 py-2 rounded text-xs font-bold transition-all"
                      style={{
                        backgroundColor: calcValues.renovation === r.value ? "#4D7C0F" : "#292524",
                        color: calcValues.renovation === r.value ? "#fff" : "#78716C",
                      }}
                      onClick={() => setCalcValues((v) => ({ ...v, renovation: r.value }))}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Phases */}
              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: "#A8A29E" }}>
                  {isUk ? "Потрібні фази" : "Required Phases"}
                </label>
                <div className="space-y-2">
                  {(
                    [
                      { key: "rough", label: isUk ? "Фаза 1 — Груба" : "Phase 1 — Rough" },
                      { key: "clean", label: isUk ? "Фаза 2 — Чиста" : "Phase 2 — Clean" },
                      { key: "final", label: isUk ? "Фаза 3 — Фінальний блиск" : "Phase 3 — Final Sparkle" },
                    ] as { key: "rough" | "clean" | "final"; label: string }[]
                  ).map(({ key, label }) => (
                    <label
                      key={key}
                      className="flex items-center gap-2 cursor-pointer text-sm"
                      style={{ color: "#D6D3D1" }}
                    >
                      <input
                        type="checkbox"
                        checked={calcValues.phases[key]}
                        className="accent-lime-700"
                        onChange={(e) =>
                          setCalcValues((v) => ({
                            ...v,
                            phases: { ...v.phases, [key]: e.target.checked },
                          }))
                        }
                      />
                      {label}
                    </label>
                  ))}
                </div>
                {phaseCount === 3 && (
                  <div
                    className="mt-2 text-xs px-3 py-1 rounded"
                    style={{ backgroundColor: "#1A2E0A", color: "#4D7C0F" }}
                  >
                    {isUk ? "✓ Знижка 10% за всі 3 фази" : "✓ 10% discount for all 3 phases"}
                  </div>
                )}
              </div>
            </div>

            {/* Right column — extras + result */}
            <div className="space-y-6">
              {/* Extras */}
              <div>
                <label className="block text-sm font-bold mb-3" style={{ color: "#A8A29E" }}>
                  {isUk ? "Додатково" : "Extras"}
                </label>
                <div className="space-y-3">
                  {/* Window count */}
                  <div className="flex items-center justify-between">
                    <label className="text-sm" style={{ color: "#D6D3D1" }}>
                      {isUk ? "Миття вікон (шт.)" : "Window washing (pcs)"}
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        className="w-7 h-7 rounded font-bold text-sm flex items-center justify-center"
                        style={{ backgroundColor: "#292524", color: "#E7E5E4" }}
                        onClick={() =>
                          setCalcValues((v) => ({ ...v, windowCount: Math.max(0, v.windowCount - 1) }))
                        }
                      >
                        −
                      </button>
                      <span
                        className="w-8 text-center text-sm font-bold"
                        style={{ color: "#E7E5E4" }}
                      >
                        {calcValues.windowCount}
                      </span>
                      <button
                        className="w-7 h-7 rounded font-bold text-sm flex items-center justify-center"
                        style={{ backgroundColor: "#4D7C0F", color: "#fff" }}
                        onClick={() =>
                          setCalcValues((v) => ({ ...v, windowCount: v.windowCount + 1 }))
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Ventilation */}
                  <label className="flex items-center gap-2 cursor-pointer text-sm" style={{ color: "#D6D3D1" }}>
                    <input
                      type="checkbox"
                      checked={calcValues.ventilation}
                      className="accent-lime-700"
                      onChange={(e) =>
                        setCalcValues((v) => ({ ...v, ventilation: e.target.checked }))
                      }
                    />
                    {isUk ? "Чищення вентиляції (+1 200 ₴)" : "Ventilation cleaning (+1 200 UAH)"}
                  </label>

                  {/* Curtains */}
                  <label className="flex items-center gap-2 cursor-pointer text-sm" style={{ color: "#D6D3D1" }}>
                    <input
                      type="checkbox"
                      checked={calcValues.curtains}
                      className="accent-lime-700"
                      onChange={(e) =>
                        setCalcValues((v) => ({ ...v, curtains: e.target.checked }))
                      }
                    />
                    {isUk ? "Прання штор (+800 ₴)" : "Curtain cleaning (+800 UAH)"}
                  </label>
                </div>
              </div>

              {/* Result */}
              <div
                className="rounded-xl p-5 text-center"
                style={{ backgroundColor: "#141210", border: "1px solid #4D7C0F" }}
              >
                <div className="text-xs uppercase tracking-widest mb-2" style={{ color: "#78716C" }}>
                  {isUk ? "Орієнтовна вартість" : "Estimated Cost"}
                </div>
                <div className="text-3xl font-black mb-1" style={{ color: "#4D7C0F" }}>
                  {priceMin.toLocaleString()} – {priceMax.toLocaleString()}
                  <span className="text-lg ml-1">₴</span>
                </div>
                <div className="text-xs mb-3" style={{ color: "#57534E" }}>
                  {isUk
                    ? `Тривалість: ${durationMin}–${durationMax} год`
                    : `Duration: ${durationMin}–${durationMax} hrs`}
                </div>
                {allThreeDiscount > 0 && (
                  <div
                    className="text-xs px-3 py-1 rounded-full inline-block mb-3"
                    style={{ backgroundColor: "#1A2E0A", color: "#4D7C0F" }}
                  >
                    {isUk ? "Включає знижку 10%" : "Includes 10% discount"}
                  </div>
                )}
                <p className="text-xs" style={{ color: "#57534E" }}>
                  {isUk
                    ? "Точна ціна після огляду об'єкта"
                    : "Exact price after site inspection"}
                </p>
              </div>

              <button
                className="w-full py-3 rounded-lg font-black text-sm uppercase tracking-wider transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#4D7C0F", color: "#fff" }}
              >
                {isUk ? "Замовити прибирання" : "Order Cleaning"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── BEFORE/AFTER GALLERY ── */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-black mb-2 text-center" style={{ color: "#E7E5E4" }}>
          {isUk ? "Наші роботи" : "Before / After Gallery"}
        </h2>
        <p className="text-center mb-10 text-sm" style={{ color: "#78716C" }}>
          {isUk ? "Реальні об'єкти нашої команди" : "Real projects by our team"}
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {galleryPairs.map((pair, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden"
              style={{ border: "1px solid #292524" }}
            >
              <div className="flex" style={{ minHeight: 140 }}>
                {/* Before placeholder */}
                <div
                  className="w-1/2 flex flex-col items-center justify-center p-4"
                  style={{
                    background: `linear-gradient(135deg, #3D2A1A 0%, #292524 100%)`,
                  }}
                >
                  <span className="text-2xl mb-1">🏚️</span>
                  <span className="text-xs font-bold uppercase" style={{ color: "#78716C" }}>
                    {isUk ? "До" : "Before"}
                  </span>
                </div>
                {/* After placeholder */}
                <div
                  className="w-1/2 flex flex-col items-center justify-center p-4"
                  style={{
                    background: `linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)`,
                  }}
                >
                  <span className="text-2xl mb-1">✨</span>
                  <span className="text-xs font-bold uppercase" style={{ color: "#15803D" }}>
                    {isUk ? "Після" : "After"}
                  </span>
                </div>
              </div>
              <div
                className="px-4 py-3 flex items-center justify-between"
                style={{ backgroundColor: "#141210" }}
              >
                <span className="text-sm font-bold" style={{ color: "#D6D3D1" }}>
                  {pair.label}
                </span>
                <span
                  className="text-xs px-2 py-0.5 rounded"
                  style={{ backgroundColor: "#292524", color: "#78716C" }}
                >
                  {pair.area}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── EQUIPMENT SECTION ── */}
      <section
        className="py-16"
        style={{ backgroundColor: "#0C0A09" }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-black mb-2 text-center" style={{ color: "#E7E5E4" }}>
            {isUk ? "Наше обладнання" : "Our Equipment"}
          </h2>
          <p className="text-center mb-3 text-sm" style={{ color: "#78716C" }}>
            {isUk
              ? "Власне обладнання, не орендоване"
              : "Our own equipment, not rented"}
          </p>
          <div
            className="inline-flex items-center gap-2 mx-auto mb-10 text-xs px-4 py-1 rounded-full flex justify-center"
            style={{ backgroundColor: "#1A2E0A", color: "#4D7C0F", border: "1px solid #4D7C0F" }}
          >
            <span>✓</span>
            <span>
              {isUk
                ? "Весь інструмент — власний, у бездоганному стані"
                : "All tools are own, in immaculate condition"}
            </span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {equipment.map((eq, i) => (
              <div
                key={i}
                className="rounded-xl p-5 text-center"
                style={{ backgroundColor: "#1C1917", border: "1px solid #292524" }}
              >
                <span className="text-4xl block mb-3">{eq.icon}</span>
                <h3 className="font-black text-sm mb-2" style={{ color: "#E7E5E4" }}>
                  {eq.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: "#78716C" }}>
                  {eq.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ORDER FORM ── */}
      <section className="py-16 max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-black mb-2 text-center" style={{ color: "#E7E5E4" }}>
          {isUk ? "Замовити прибирання" : "Order Cleaning"}
        </h2>
        <p className="text-center mb-10 text-sm" style={{ color: "#78716C" }}>
          {isUk
            ? "Залишіть заявку — ми зателефонуємо протягом 30 хвилин"
            : "Leave a request — we will call back within 30 minutes"}
        </p>

        <div
          className="rounded-xl p-6 md:p-8 space-y-4"
          style={{ backgroundColor: "#141210", border: "1px solid #292524" }}
        >
          {/* Address */}
          <div>
            <label className="block text-xs font-bold mb-1 uppercase tracking-wider" style={{ color: "#78716C" }}>
              {isUk ? "Адреса об'єкта" : "Object Address"}
            </label>
            <input
              type="text"
              value={orderForm.address}
              placeholder={isUk ? "вул. Хрещатик, 1, Київ" : "123 Main St, City"}
              className="w-full px-4 py-3 rounded-lg text-sm outline-none"
              style={{
                backgroundColor: "#1C1917",
                border: "1px solid #292524",
                color: "#E7E5E4",
              }}
              onChange={(e) => setOrderForm((f) => ({ ...f, address: e.target.value }))}
            />
          </div>

          {/* Type & Area row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold mb-1 uppercase tracking-wider" style={{ color: "#78716C" }}>
                {isUk ? "Тип об'єкта" : "Object Type"}
              </label>
              <select
                value={orderForm.type}
                className="w-full px-4 py-3 rounded-lg text-sm outline-none"
                style={{ backgroundColor: "#1C1917", border: "1px solid #292524", color: "#E7E5E4" }}
                onChange={(e) => setOrderForm((f) => ({ ...f, type: e.target.value }))}
              >
                <option value="apartment">{isUk ? "Квартира" : "Apartment"}</option>
                <option value="house">{isUk ? "Будинок" : "House"}</option>
                <option value="commercial">{isUk ? "Комерційне" : "Commercial"}</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold mb-1 uppercase tracking-wider" style={{ color: "#78716C" }}>
                {isUk ? "Площа (м²)" : "Area (m²)"}
              </label>
              <input
                type="number"
                value={orderForm.area}
                placeholder={isUk ? "напр. 80" : "e.g. 80"}
                className="w-full px-4 py-3 rounded-lg text-sm outline-none"
                style={{
                  backgroundColor: "#1C1917",
                  border: "1px solid #292524",
                  color: "#E7E5E4",
                }}
                onChange={(e) => setOrderForm((f) => ({ ...f, area: e.target.value }))}
              />
            </div>
          </div>

          {/* Renovation type */}
          <div>
            <label className="block text-xs font-bold mb-1 uppercase tracking-wider" style={{ color: "#78716C" }}>
              {isUk ? "Тип ремонту" : "Renovation Type"}
            </label>
            <select
              value={orderForm.renovation}
              className="w-full px-4 py-3 rounded-lg text-sm outline-none"
              style={{ backgroundColor: "#1C1917", border: "1px solid #292524", color: "#E7E5E4" }}
              onChange={(e) => setOrderForm((f) => ({ ...f, renovation: e.target.value }))}
            >
              <option value="cosmetic">{isUk ? "Косметичний" : "Cosmetic"}</option>
              <option value="major">{isUk ? "Капітальний" : "Major"}</option>
              <option value="newbuild">{isUk ? "Нова будівля" : "New Build"}</option>
            </select>
          </div>

          {/* Contact row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold mb-1 uppercase tracking-wider" style={{ color: "#78716C" }}>
                {isUk ? "Ваше ім'я" : "Your Name"}
              </label>
              <input
                type="text"
                value={orderForm.name}
                placeholder={isUk ? "Олена" : "Elena"}
                className="w-full px-4 py-3 rounded-lg text-sm outline-none"
                style={{
                  backgroundColor: "#1C1917",
                  border: "1px solid #292524",
                  color: "#E7E5E4",
                }}
                onChange={(e) => setOrderForm((f) => ({ ...f, name: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1 uppercase tracking-wider" style={{ color: "#78716C" }}>
                {isUk ? "Телефон" : "Phone"}
              </label>
              <input
                type="tel"
                value={orderForm.phone}
                placeholder="+38 (050) 000-00-00"
                className="w-full px-4 py-3 rounded-lg text-sm outline-none"
                style={{
                  backgroundColor: "#1C1917",
                  border: "1px solid #292524",
                  color: "#E7E5E4",
                }}
                onChange={(e) => setOrderForm((f) => ({ ...f, phone: e.target.value }))}
              />
            </div>
          </div>

          {/* Comment */}
          <div>
            <label className="block text-xs font-bold mb-1 uppercase tracking-wider" style={{ color: "#78716C" }}>
              {isUk ? "Коментар (необов'язково)" : "Comment (optional)"}
            </label>
            <textarea
              value={orderForm.comment}
              rows={3}
              placeholder={isUk ? "Особливості об'єкта, побажання..." : "Object specifics, preferences..."}
              className="w-full px-4 py-3 rounded-lg text-sm outline-none resize-none"
              style={{
                backgroundColor: "#1C1917",
                border: "1px solid #292524",
                color: "#E7E5E4",
              }}
              onChange={(e) => setOrderForm((f) => ({ ...f, comment: e.target.value }))}
            />
          </div>

          <button
            className="w-full py-4 rounded-lg font-black text-base uppercase tracking-wider transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#4D7C0F", color: "#fff" }}
          >
            {isUk ? "Надіслати заявку" : "Submit Request"}
          </button>

          <p className="text-center text-xs" style={{ color: "#57534E" }}>
            {isUk
              ? "Надсилаючи форму, ви погоджуєтесь з обробкою персональних даних"
              : "By submitting the form you agree to the processing of personal data"}
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="py-10"
        style={{ backgroundColor: "#0C0A09", borderTop: "1px solid #292524" }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="font-black text-xl" style={{ color: "#E7E5E4" }}>
                DUST<span style={{ color: "#4D7C0F" }}>ZERO</span>
              </div>
              <div className="text-xs mt-1" style={{ color: "#57534E" }}>
                {isUk
                  ? "Промислове прибирання після ремонту"
                  : "Industrial Post-Construction Cleaning"}
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-xs" style={{ color: "#78716C" }}>
              {(isUk
                ? ["Послуги", "Калькулятор", "Галерея", "Обладнання", "Контакти"]
                : ["Services", "Calculator", "Gallery", "Equipment", "Contacts"]
              ).map((link) => (
                <span key={link} className="hover:text-white cursor-pointer transition-colors">
                  {link}
                </span>
              ))}
            </div>

            <div className="text-center md:text-right">
              <div className="font-bold text-sm" style={{ color: "#E7E5E4" }}>
                +38 (050) 000-00-00
              </div>
              <div className="text-xs mt-1" style={{ color: "#57534E" }}>
                {isUk ? "Пн–Нд, 7:00–22:00" : "Mon–Sun, 7:00–22:00"}
              </div>
            </div>
          </div>

          <div
            className="mt-8 pt-6 text-center text-xs"
            style={{ borderTop: "1px solid #1C1917", color: "#44403C" }}
          >
            {isUk
              ? "© 2025 DustZero. Усі права захищені."
              : "© 2025 DustZero. All rights reserved."}
          </div>
        </div>
      </footer>
    </div>
  );
}
