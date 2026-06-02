"use client";

import { useState } from "react";

interface Props { lang: string; }

const SERVICES_DATA = [
  {
    id: "spray",
    emoji: "💦",
    gradFrom: "#0ea5e9", gradTo: "#2563eb",
    titleUk: "Авіаційне обприскування",
    titleEn: "Aerial Spraying",
    descUk: "Рівномірне нанесення ЗЗР, фунгіцидів та мікродобрив на будь-який рельєф. Ефективніше за наземну техніку на 30%.",
    descEn: "Even application of crop protection, fungicides and micro-fertilizers on any terrain. 30% more effective than ground equipment.",
    fromUk: "від 280 ₴/га",
    fromEn: "from 280 ₴/ha",
    featUk: ["12 га/год продуктивність", "±0.5 м точність GPS", "Будь-які ЗЗР та добрива", "Звіт після обробки"],
    featEn: ["12 ha/h productivity", "±0.5 m GPS precision", "Any crop protection products", "Post-treatment report"],
  },
  {
    id: "ndvi",
    emoji: "🛰",
    gradFrom: "#16a34a", gradTo: "#84cc16",
    titleUk: "NDVI-моніторинг посівів",
    titleEn: "NDVI Crop Monitoring",
    descUk: "Аналіз здоров'я посівів через мультиспектральні знімки. Виявляємо хворобу, стрес та нестачу живлення за 2–3 дні до видимих симптомів.",
    descEn: "Crop health analysis via multispectral imagery. We detect disease, stress and nutrient deficiency 2–3 days before visible symptoms.",
    fromUk: "від 95 ₴/га",
    fromEn: "from 95 ₴/ha",
    featUk: ["Теплові карти NDVI", "Звіт агронома", "Зони для точкової обробки", "Порівняння динаміки"],
    featEn: ["NDVI heat maps", "Agronomist report", "Zones for targeted treatment", "Trend comparison"],
  },
  {
    id: "map",
    emoji: "🗺",
    gradFrom: "#d97706", gradTo: "#dc2626",
    titleUk: "Картування та 3D-рельєф",
    titleEn: "Mapping & 3D Terrain",
    descUk: "Точні топографічні карти, 3D-моделі та межі ділянок з точністю до 2 см. Формати GeoTIFF, KML, Shapefile для ГІС-систем.",
    descEn: "Precise topographic maps, 3D models and plot boundaries accurate to 2 cm. GeoTIFF, KML, Shapefile for GIS systems.",
    fromUk: "від 150 ₴/га",
    fromEn: "from 150 ₴/ha",
    featUk: ["Точність до 2 см", "GeoTIFF / KML / Shapefile", "3D-модель рельєфу", "Межі та площі ділянок"],
    featEn: ["Accuracy up to 2 cm", "GeoTIFF / KML / Shapefile", "3D terrain model", "Plot boundaries & areas"],
  },
  {
    id: "seed",
    emoji: "🌱",
    gradFrom: "#7c3aed", gradTo: "#2563eb",
    titleUk: "Точна сівба з дрона",
    titleEn: "Precision Drone Seeding",
    descUk: "Норма висіву ±2% від заданої. Ідеально для газонів, рекультивації, залісення та важкодоступних ділянок.",
    descEn: "Seeding rate ±2% from target. Ideal for lawns, recultivation, afforestation and difficult-to-reach plots.",
    fromUk: "від 320 ₴/га",
    fromEn: "from 320 ₴/ha",
    featUk: ["Норма висіву ±2%", "8 га/год продуктивність", "Всі типи насіння", "GPS-карта висіву"],
    featEn: ["Seeding rate ±2%", "8 ha/h productivity", "All seed types", "GPS seeding map"],
  },
];

const CASES_DATA = [
  {
    cropUk: "Пшениця · 850 га · Полтавська обл.",
    cropEn: "Wheat · 850 ha · Poltava region",
    problemUk: "Масовий спалах листкової іржі у фазі колосіння. Потрібна термінова обробка впродовж 2 днів.",
    problemEn: "Mass leaf rust outbreak at heading stage. Urgent treatment needed within 2 days.",
    solutionUk: "Обприскування фунгіцидом 4-ма дронами T50 за 18 годин на всій площі.",
    solutionEn: "Fungicide spraying with 4 T50 drones across entire area in 18 hours.",
    r1: "+31%", l1Uk: "до врожайності", l1En: "yield increase",
    r2: "680 000 ₴", l2Uk: "збережено", l2En: "saved",
    color: "from-amber-600 to-yellow-700",
  },
  {
    cropUk: "Соняшник · 320 га · Вінницька обл.",
    cropEn: "Sunflower · 320 ha · Vinnytsia region",
    problemUk: "NDVI показав нерівномірний розвиток: 40% поля відставало через нестачу азоту.",
    problemEn: "NDVI revealed uneven development: 40% of field lagging due to nitrogen deficiency.",
    solutionUk: "Точкове внесення мікродобрив дроном по NDVI-зонам. Пропрацьовано лише проблемні ділянки.",
    solutionEn: "Targeted micro-fertilizer application by drone on NDVI-identified zones only.",
    r1: "94%", l1Uk: "однорідність посівів", l1En: "crop uniformity",
    r2: "4.2×", l2Uk: "ROI за сезон", l2En: "season ROI",
    color: "from-orange-600 to-red-700",
  },
  {
    cropUk: "Кукурудза · 1 200 га · Черкаська обл.",
    cropEn: "Corn · 1,200 ha · Cherkasy region",
    problemUk: "Агрохолдинг орендував нові землі — потрібне точне картування меж і рельєфу для агрономічного плану.",
    problemEn: "Agro-holding leased new lands — precise boundary and terrain mapping needed for agronomic planning.",
    solutionUk: "3D-картування JOUAV CW-30E за 3 дні. Виявлено 18 га без зрошення та 3 км потрібних дренажних ліній.",
    solutionEn: "3D mapping by JOUAV CW-30E in 3 days. Detected 18 ha without irrigation and 3 km of needed drainage.",
    r1: "18 га", l1Uk: "виявлено без зрошення", l1En: "detected without irrigation",
    r2: "220 000 ₴", l2Uk: "економія/рік", l2En: "savings/year",
    color: "from-teal-700 to-green-800",
  },
  {
    cropUk: "Ріпак · 480 га · Харківська обл.",
    cropEn: "Rapeseed · 480 ha · Kharkiv region",
    problemUk: "Нерівномірні сходи ріпаку на 30% площі. Класичний підсів наземною технікою на 480 га — від 4 тижнів.",
    problemEn: "Uneven rapeseed emergence on 30% of field. Conventional ground reseeding across 480 ha — 4+ weeks.",
    solutionUk: "Точна підсівна сівба T40 по NDVI-карті розріджених ділянок. Вся площа перекрита за 2 дні.",
    solutionEn: "Precision T40 reseeding following NDVI sparse-patch map. Entire area covered in 2 days.",
    r1: "98%", l1Uk: "рівномірність сходів", l1En: "emergence uniformity",
    r2: "2 дні", l2Uk: "замість 4 тижнів", l2En: "vs 4 weeks traditional",
    color: "from-yellow-600 to-lime-700",
  },
  {
    cropUk: "Соя · 650 га · Хмельницька обл.",
    cropEn: "Soybean · 650 ha · Khmelnytskyi region",
    problemUk: "Фермер вперше орендував великий масив — потрібні точні межі, рельєф та зони кислотності для агроплану.",
    problemEn: "Farmer leased large block for the first time — precise boundaries, terrain, acidity zones needed for planning.",
    solutionUk: "NDVI-моніторинг + 3D-картування Matrice 350 RTK. Виявлено 4 зони підтоплення та кислі ділянки.",
    solutionEn: "NDVI monitoring + 3D mapping with Matrice 350 RTK. Detected 4 waterlogging zones and acid patches.",
    r1: "4 зони", l1Uk: "підтоплення виявлено", l1En: "waterlogging found",
    r2: "340 000 ₴", l2Uk: "попереджених втрат", l2En: "losses prevented",
    color: "from-green-700 to-emerald-800",
  },
  {
    cropUk: "Яблуневий сад · 90 га · Вінницька обл.",
    cropEn: "Apple orchard · 90 ha · Vinnytsia region",
    problemUk: "Обробка саду між рядами наземним обприскувачем — надто тривала та неможлива на крутих ділянках.",
    problemEn: "Ground sprayer treatment between orchard rows was too slow and impossible on steep terrain.",
    solutionUk: "Авіаційна обробка T50 між рядами висотою 3 м. Увесь сад — за 8 год, 3 рази на сезон без персоналу.",
    solutionEn: "T50 aerial spraying between 3m rows. Full orchard in 8 hours, 3 times per season without extra staff.",
    r1: "−65%", l1Uk: "часу на обробку", l1En: "treatment time saved",
    r2: "3×", l2Uk: "за сезон, без персоналу", l2En: "per season, staff-free",
    color: "from-red-700 to-rose-800",
  },
];

const DRONES_DATA = [
  { model: "DJI Agras T50", payload: "50 кг / 50 kg", area: "22 га/год / 22 ha/h", tag: "Обприскування / Spraying", emoji: "🚁", badge: "flagship" },
  { model: "DJI Agras T40", payload: "40 кг / 40 kg", area: "18 га/год / 18 ha/h", tag: "Обприскування + Сівба / Spraying + Seeding", emoji: "🚁", badge: null },
  { model: "DJI Matrice 350 RTK", payload: "2.7 кг / 2.7 kg", area: "Моніторинг / Monitoring", tag: "NDVI + Картування / NDVI + Mapping", emoji: "✈️", badge: null },
  { model: "JOUAV CW-30E", payload: "5 кг / 5 kg", area: "10 000 га/день / 10,000 ha/day", tag: "Масштабне картування / Large mapping", emoji: "✈️", badge: "max range" },
];

export function AgroDroneDemo({ lang }: Props) {
  const isUk = lang === "uk";
  const [calcArea, setCalcArea] = useState(300);
  const [calcService, setCalcService] = useState("spray");
  const [formOpen, setFormOpen] = useState(false);
  const [formDone, setFormDone] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);

  const PRICES: Record<string, number> = { spray: 280, ndvi: 95, map: 150, seed: 320 };
  const TRAD: Record<string, number> = { spray: 390, ndvi: 0, map: 0, seed: 430 };
  const drone = PRICES[calcService] * calcArea;
  const trad = TRAD[calcService] * calcArea;

  return (
    <div className="min-h-screen bg-slate-950 text-white" style={{ fontFamily: "'Inter', 'system-ui', sans-serif" }}>

      {/* ── NAV ── */}
      <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 shrink-0">
            <span className="text-[22px]">🚁</span>
            <div className="leading-none">
              <span className="font-black text-white text-[17px] tracking-tight">AgroDrone</span>
              <span className="text-lime-400 font-bold text-[17px] tracking-tight"> TECH</span>
            </div>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-[13px] font-medium text-slate-400">
            <a href="#services" className="hover:text-white transition-colors">{isUk ? "Послуги" : "Services"}</a>
            <a href="#calculator" className="hover:text-white transition-colors">{isUk ? "Калькулятор" : "Calculator"}</a>
            <a href="#cases" className="hover:text-white transition-colors">{isUk ? "Кейси" : "Cases"}</a>
            <a href="#fleet" className="hover:text-white transition-colors">{isUk ? "Флот" : "Fleet"}</a>
            <a href="#certs" className="hover:text-white transition-colors">{isUk ? "Ліцензії" : "Licenses"}</a>
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={() => setFormOpen(true)}
              className="hidden sm:block px-4 py-2 bg-lime-500 hover:bg-lime-400 text-slate-950 text-[13px] font-bold rounded-xl transition-colors">
              {isUk ? "Отримати кошторис" : "Get estimate"}
            </button>
            <button onClick={() => setMobileNav(!mobileNav)} className="md:hidden p-2 text-slate-400">☰</button>
          </div>
        </div>
        {mobileNav && (
          <div className="md:hidden bg-slate-900 border-t border-slate-800 px-5 py-3 flex flex-col gap-3 text-sm text-slate-300">
            {(isUk ? ["Послуги","Калькулятор","Кейси","Флот","Ліцензії"] : ["Services","Calculator","Cases","Fleet","Licenses"]).map(l => (
              <a key={l} href="#" onClick={() => setMobileNav(false)} className="hover:text-white">{l}</a>
            ))}
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(132,204,22,0.15),transparent)]" />
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
          {/* Trust badges */}
          <div className="flex flex-wrap gap-2 mb-8">
            {[
              isUk ? "✓ 200 000+ га оброблено" : "✓ 200,000+ ha treated",
              isUk ? "✓ Ліцензія ДАСУ" : "✓ DASU Licensed",
              isUk ? "✓ 15 дронів у парку" : "✓ Fleet of 15 drones",
            ].map(b => (
              <span key={b} className="text-[12px] font-semibold bg-slate-800/80 border border-slate-700 text-slate-300 px-3.5 py-1.5 rounded-full">{b}</span>
            ))}
          </div>

          <div className="max-w-3xl">
            <h1 className="text-[46px] sm:text-[64px] font-black text-white leading-[1.05] tracking-tight mb-6">
              {isUk
                ? <>{`Сучасний захист`}<br /><span className="text-lime-400">{`врожаю з повітря`}</span></>
                : <>{"Modern crop"}<br /><span className="text-lime-400">{"protection from the air"}</span></>}
            </h1>
            <p className="text-slate-400 text-[17px] leading-relaxed mb-8 max-w-2xl">
              {isUk
                ? "Обприскування · NDVI-моніторинг · Картування · Сівба. Від 50 га. Виїжджаємо у будь-яку область."
                : "Spraying · NDVI monitoring · Mapping · Seeding. From 50 ha. We work in any region."}
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#calculator"
                className="px-7 py-4 bg-lime-500 hover:bg-lime-400 text-slate-950 font-black rounded-2xl text-[15px] transition-colors shadow-xl shadow-lime-500/20">
                {isUk ? "Розрахувати вартість" : "Calculate cost"}
              </a>
              <a href="#cases"
                className="px-7 py-4 border border-slate-700 hover:border-slate-500 bg-slate-900 text-white font-semibold rounded-2xl text-[15px] transition-all">
                {isUk ? "Переглянути кейси" : "View case studies"}
              </a>
            </div>
          </div>

          {/* Big stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mt-16 pt-10 border-t border-slate-800">
            {[
              { num: "200 000+", lbl: isUk ? "га оброблено" : "ha treated" },
              { num: "15", lbl: isUk ? "дронів у парку" : "drones in fleet" },
              { num: "3", lbl: isUk ? "роки на ринку" : "years on market" },
              { num: "98.7%", lbl: isUk ? "виконано вчасно" : "completed on time" },
            ].map(s => (
              <div key={s.lbl} className="bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4">
                <p className="text-[28px] font-black text-lime-400">{s.num}</p>
                <p className="text-slate-500 text-[12px] mt-0.5 uppercase tracking-wide">{s.lbl}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
        <p className="text-lime-400 text-[11px] font-bold uppercase tracking-widest mb-3">{isUk ? "Що ми робимо" : "What we do"}</p>
        <h2 className="text-[34px] font-bold text-white mb-2">{isUk ? "Послуги" : "Services"}</h2>
        <p className="text-slate-400 text-sm mb-12">{isUk ? "Кожна послуга — з детальним звітом та GPS-документацією" : "Every service includes a detailed report and GPS documentation"}</p>

        <div className="grid sm:grid-cols-2 gap-6">
          {SERVICES_DATA.map(s => (
            <div key={s.id} className="group bg-slate-900 border border-slate-800 hover:border-slate-600 rounded-3xl p-7 transition-all hover:shadow-2xl hover:shadow-slate-900/50">
              <div className="w-14 h-14 rounded-2xl mb-5 flex items-center justify-center text-2xl shadow-lg"
                style={{ background: `linear-gradient(135deg, ${s.gradFrom}, ${s.gradTo})` }}>
                {s.emoji}
              </div>
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="font-bold text-white text-[18px] leading-tight">{isUk ? s.titleUk : s.titleEn}</h3>
                <span className="text-lime-400 font-bold text-[14px] shrink-0">{isUk ? s.fromUk : s.fromEn}</span>
              </div>
              <p className="text-slate-400 text-[13px] leading-relaxed mb-5">{isUk ? s.descUk : s.descEn}</p>
              <ul className="space-y-1.5">
                {(isUk ? s.featUk : s.featEn).map(f => (
                  <li key={f} className="flex items-center gap-2 text-[12px] text-slate-300">
                    <span className="text-lime-500 shrink-0">✓</span>{f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="bg-slate-900/50 border-y border-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <h2 className="text-[28px] font-bold text-white mb-10 text-center">{isUk ? "Як проходить робота" : "How the process works"}</h2>
          <div className="grid sm:grid-cols-4 gap-6 relative">
            <div className="absolute top-5 left-[12%] right-[12%] h-px bg-slate-700 hidden sm:block" />
            {[
              { n: "01", titleUk: "Заявка", titleEn: "Request", descUk: "Залишаєте запит — передзвонюємо за 4 год. у робочий час", descEn: "Submit request — callback within 4 hours" },
              { n: "02", titleUk: "Огляд поля", titleEn: "Field inspection", descUk: "Безкоштовний виїзд агронома, узгодження плану", descEn: "Free agronomist visit, plan agreement" },
              { n: "03", titleUk: "Виліт", titleEn: "Flight", descUk: "Проводимо обробку за узгодженим графіком", descEn: "We execute treatment on agreed schedule" },
              { n: "04", titleUk: "Звіт", titleEn: "Report", descUk: "GPS-звіт + карта покриття + рекомендації агронома", descEn: "GPS report + coverage map + agronomist recommendations" },
            ].map(step => (
              <div key={step.n} className="text-center relative z-10">
                <div className="w-10 h-10 rounded-full bg-lime-500 text-slate-950 font-black text-[14px] flex items-center justify-center mx-auto mb-3">{step.n}</div>
                <p className="font-bold text-white text-[15px] mb-1.5">{isUk ? step.titleUk : step.titleEn}</p>
                <p className="text-slate-500 text-[12px] leading-relaxed">{isUk ? step.descUk : step.descEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CALCULATOR ── */}
      <section id="calculator" className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-lime-400 text-[11px] font-bold uppercase tracking-widest mb-3">{isUk ? "Онлайн розрахунок" : "Online calculator"}</p>
            <h2 className="text-[34px] font-bold text-white mb-4">{isUk ? "Калькулятор вартості" : "Cost Calculator"}</h2>
            <p className="text-slate-400 text-[14px] leading-relaxed mb-8">
              {isUk
                ? "Порівняйте вартість дронової обробки з наземною технікою і побачте реальну економію."
                : "Compare drone treatment cost with ground equipment and see actual savings."}
            </p>

            <div className="space-y-6">
              {/* Area slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-[12px] font-semibold text-slate-400 uppercase tracking-wide">{isUk ? "Площа поля" : "Field area"}</label>
                  <span className="text-lime-400 font-bold">{calcArea} {isUk ? "га" : "ha"}</span>
                </div>
                <input type="range" min={50} max={2000} step={25} value={calcArea} onChange={e => setCalcArea(+e.target.value)}
                  className="w-full accent-lime-500 h-2" />
                <div className="flex justify-between text-[11px] text-slate-600 mt-1">
                  <span>50 {isUk ? "га" : "ha"}</span><span>2 000 {isUk ? "га" : "ha"}</span>
                </div>
              </div>

              {/* Service */}
              <div>
                <label className="text-[12px] font-semibold text-slate-400 uppercase tracking-wide mb-3 block">{isUk ? "Послуга" : "Service"}</label>
                <div className="grid grid-cols-2 gap-2">
                  {SERVICES_DATA.map(s => (
                    <button key={s.id} onClick={() => setCalcService(s.id)}
                      className={`py-3 px-3 rounded-xl border text-[13px] font-medium transition-all text-left ${calcService === s.id ? "border-lime-500 bg-lime-500/10 text-lime-300" : "border-slate-700 text-slate-400 hover:border-slate-600"}`}>
                      {s.emoji} {isUk ? s.titleUk : s.titleEn}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Result card */}
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8">
            <p className="text-slate-400 text-[12px] uppercase tracking-widest mb-6 font-semibold">{isUk ? "Ваш розрахунок" : "Your estimate"}</p>
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between bg-slate-800 rounded-2xl px-5 py-4">
                <div>
                  <p className="text-slate-400 text-[12px] mb-0.5">{isUk ? "Дронова обробка" : "Drone treatment"}</p>
                  <p className="text-[13px] text-slate-300">{calcArea} {isUk ? "га" : "ha"} × {PRICES[calcService]} ₴</p>
                </div>
                <p className="text-3xl font-black text-lime-400">{drone.toLocaleString("uk-UA")} ₴</p>
              </div>
              {trad > 0 && (
                <div className="flex items-center justify-between bg-slate-800/50 rounded-2xl px-5 py-4 opacity-60">
                  <div>
                    <p className="text-slate-500 text-[12px] mb-0.5">{isUk ? "Наземна техніка" : "Ground equipment"}</p>
                    <p className="text-[13px] text-slate-500">{calcArea} {isUk ? "га" : "ha"} × {TRAD[calcService]} ₴</p>
                  </div>
                  <p className="text-2xl font-black text-slate-500 line-through">{trad.toLocaleString("uk-UA")} ₴</p>
                </div>
              )}
            </div>
            {trad > 0 && (
              <div className="bg-lime-500/10 border border-lime-500/30 rounded-2xl px-5 py-4 mb-6">
                <p className="text-[12px] text-lime-400 font-semibold mb-1">{isUk ? "💰 Ваша економія:" : "💰 Your savings:"}</p>
                <p className="text-2xl font-black text-lime-400">{(trad - drone).toLocaleString("uk-UA")} ₴ / {isUk ? "сезон" : "season"}</p>
              </div>
            )}
            <button onClick={() => setFormOpen(true)}
              className="w-full py-4 bg-lime-500 hover:bg-lime-400 text-slate-950 font-black rounded-2xl text-[15px] transition-colors">
              {isUk ? "Отримати точний кошторис" : "Get precise quote"}
            </button>
            <p className="text-slate-600 text-[11px] text-center mt-3">{isUk ? "Безкоштовний виїзд агронома на поле" : "Free agronomist field visit included"}</p>
          </div>
        </div>
      </section>

      {/* ── CASES ── */}
      <section id="cases" className="bg-slate-900/40 border-y border-slate-800 py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <p className="text-lime-400 text-[11px] font-bold uppercase tracking-widest mb-3">{isUk ? "Реальні результати" : "Real results"}</p>
          <h2 className="text-[34px] font-bold text-white mb-10">{isUk ? "Кейси клієнтів" : "Client cases"}</h2>
          <div className="space-y-6">
            {CASES_DATA.map((c, i) => (
              <div key={i} className={`rounded-3xl bg-linear-to-br ${c.color} p-8`}>
                <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-center">
                  <div>
                    <p className="text-white/60 text-[11px] font-bold uppercase tracking-widest mb-2">{isUk ? `Кейс ${i+1}` : `Case ${i+1}`}</p>
                    <h3 className="text-white font-bold text-[20px] mb-4">{isUk ? c.cropUk : c.cropEn}</h3>
                    <div className="grid sm:grid-cols-2 gap-3 text-[13px]">
                      <div className="bg-black/20 rounded-xl p-3">
                        <p className="text-white/60 mb-1 text-[11px] uppercase font-semibold">{isUk ? "Завдання" : "Challenge"}</p>
                        <p className="text-white/90">{isUk ? c.problemUk : c.problemEn}</p>
                      </div>
                      <div className="bg-black/20 rounded-xl p-3">
                        <p className="text-white/60 mb-1 text-[11px] uppercase font-semibold">{isUk ? "Рішення" : "Solution"}</p>
                        <p className="text-white/90">{isUk ? c.solutionUk : c.solutionEn}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex lg:flex-col gap-4 shrink-0">
                    <div className="bg-white/20 backdrop-blur rounded-2xl px-6 py-4 text-center min-w-[120px]">
                      <p className="font-black text-white text-[26px]">{c.r1}</p>
                      <p className="text-white/70 text-[11px] mt-0.5">{isUk ? c.l1Uk : c.l1En}</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur rounded-2xl px-6 py-4 text-center min-w-[120px]">
                      <p className="font-black text-white text-[26px]">{c.r2}</p>
                      <p className="text-white/70 text-[11px] mt-0.5">{isUk ? c.l2Uk : c.l2En}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FLEET ── */}
      <section id="fleet" className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
        <p className="text-lime-400 text-[11px] font-bold uppercase tracking-widest mb-3">{isUk ? "Техніка" : "Equipment"}</p>
        <h2 className="text-[34px] font-bold text-white mb-10">{isUk ? "Наш флот" : "Our fleet"}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {DRONES_DATA.map(d => (
            <div key={d.model} className="bg-slate-900 border border-slate-800 hover:border-slate-600 rounded-3xl p-6 transition-all">
              {d.badge && (
                <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full mb-3 inline-block ${d.badge === "flagship" ? "bg-lime-500 text-slate-950" : "bg-slate-700 text-slate-300"}`}>
                  {d.badge}
                </span>
              )}
              <div className="text-4xl mb-4">{d.emoji}</div>
              <h3 className="font-bold text-white text-[15px] mb-4">{d.model}</h3>
              <div className="space-y-2 text-[12px]">
                <div className="flex justify-between">
                  <span className="text-slate-500">{isUk ? "Вантаж" : "Payload"}</span>
                  <span className="text-lime-400 font-semibold">{isUk ? d.payload.split(" / ")[0] : d.payload.split(" / ")[1]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{isUk ? "Продуктивність" : "Coverage"}</span>
                  <span className="text-white font-semibold">{isUk ? d.area.split(" / ")[0] : d.area.split(" / ")[1]}</span>
                </div>
                <div className="pt-2 border-t border-slate-800 text-slate-400">
                  {isUk ? d.tag.split(" / ")[0] : d.tag.split(" / ")[1]}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 bg-slate-900 border border-lime-500/25 rounded-2xl px-6 py-4 flex items-center gap-3">
          <span className="text-2xl">🔧</span>
          <p className="text-[13px] text-slate-300">
            {isUk
              ? "Власна сервісна база у Вінниці. Обслуговуємо всі дрони самостійно — максимум 2 тижні простою на плановий ТО."
              : "Our own service facility in Vinnytsia. In-house maintenance — max 2 weeks downtime for scheduled service."}
          </p>
        </div>
      </section>

      {/* ── CERTS ── */}
      <section id="certs" className="bg-slate-900/50 border-y border-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <p className="text-lime-400 text-[11px] font-bold uppercase tracking-widest mb-3">{isUk ? "Легальність" : "Compliance"}</p>
          <h2 className="text-[28px] font-bold text-white mb-8">{isUk ? "Ліцензії та сертифікати" : "Licenses & Certificates"}</h2>
          <div className="grid sm:grid-cols-4 gap-4">
            {[
              { badge: "ДАСУ", titleUk: "Ліцензія на авіаційні роботи", titleEn: "Aviation works license", noteUk: "Держ. авіаційна служба України", noteEn: "State Aviation Service of Ukraine" },
              { badge: "ISO", titleUk: "Система менеджменту якості", titleEn: "Quality management system", noteUk: "ISO 9001:2015", noteEn: "ISO 9001:2015" },
              { badge: "ДСТУ", titleUk: "Відповідність нормативам", titleEn: "Regulatory compliance", noteUk: "Хімічна обробка рослин", noteEn: "Plant chemical treatment" },
              { badge: "АГ-СТРАХ", titleUk: "Страхування відповідальності", titleEn: "Liability insurance", noteUk: "Покриття 10 млн ₴", noteEn: "Coverage: 10M ₴" },
            ].map(c => (
              <div key={c.badge} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                <span className="text-[11px] font-black bg-lime-500 text-slate-950 px-3 py-1 rounded-full inline-block mb-3">{c.badge}</span>
                <p className="font-semibold text-white text-[14px] mb-1">{isUk ? c.titleUk : c.titleEn}</p>
                <p className="text-slate-500 text-[12px]">{isUk ? c.noteUk : c.noteEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FOOTER ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 text-center">
          <h2 className="text-[36px] font-black text-white mb-4">
            {isUk ? "Готові захистити ваш урожай?" : "Ready to protect your harvest?"}
          </h2>
          <p className="text-slate-400 mb-8">{isUk ? "Безкоштовний виїзд агронома на поле. Відповідь протягом 4 годин." : "Free agronomist field visit. Response within 4 hours."}</p>
          <button onClick={() => setFormOpen(true)}
            className="px-10 py-4 bg-lime-500 hover:bg-lime-400 text-slate-950 font-black rounded-2xl text-[16px] transition-colors shadow-2xl shadow-lime-500/20">
            {isUk ? "Залишити заявку" : "Submit request"}
          </button>
        </div>
      </section>

      <footer className="bg-slate-950 border-t border-slate-800">
        {/* Main grid */}
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="text-[22px]">🚁</span>
              <div className="leading-none">
                <span className="font-black text-white text-[18px] tracking-tight">AgroDrone</span>
                <span className="text-lime-400 font-black text-[18px] tracking-tight"> TECH</span>
              </div>
            </div>
            <p className="text-slate-500 text-[13px] leading-relaxed mb-5">
              {isUk
                ? "Агродронові послуги для фермерів та агрохолдингів. 15 дронів, ліцензія ДАСУ, 200\u202f000+ га досвіду. Працюємо по всій Україні."
                : "Agri-drone services for farmers and agro-holdings. 15 drones, DASU license, 200,000+ ha experience. Operating nationwide."}
            </p>
            {/* Trust badges */}
            <div className="flex flex-wrap gap-2">
              {[
                { uk: "✓ Ліц. ДАСУ", en: "✓ DASU Lic." },
                { uk: "✓ 15 дронів", en: "✓ 15 drones" },
                { uk: "✓ 3 роки", en: "✓ 3 years" },
              ].map(b => (
                <span key={b.uk} className="text-[10px] font-bold bg-slate-800 border border-slate-700 text-slate-300 px-2.5 py-1 rounded-lg">{isUk ? b.uk : b.en}</span>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="text-white font-semibold text-[13px] mb-4 uppercase tracking-wider">{isUk ? "Послуги" : "Services"}</p>
            <ul className="space-y-2.5 text-[13px]">
              {(isUk
                ? ["💦 Авіаційне обприскування — від 280 ₴/га", "🛰 NDVI-моніторинг — від 95 ₴/га", "🗺 3D-картування — від 150 ₴/га", "🌱 Точна сівба — від 320 ₴/га"]
                : ["💦 Aerial spraying — from 280 ₴/ha", "🛰 NDVI monitoring — from 95 ₴/ha", "🗺 3D mapping — from 150 ₴/ha", "🌱 Precision seeding — from 320 ₴/ha"]
              ).map(l => (
                <li key={l}><a href="#services" className="text-slate-400 hover:text-lime-400 transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-white font-semibold text-[13px] mb-4 uppercase tracking-wider">{isUk ? "Компанія" : "Company"}</p>
            <ul className="space-y-2.5 text-[13px]">
              {(isUk
                ? ["🧮 Калькулятор вартості", "📋 Кейси клієнтів (6)", "🚁 Наш флот", "📄 Ліцензії та сертифікати", "📞 Запит на послугу"]
                : ["🧮 Cost calculator", "📋 Client cases (6)", "🚁 Our fleet", "📄 Licenses & certificates", "📞 Request service"]
              ).map(l => (
                <li key={l}><a href="#" className="text-slate-400 hover:text-lime-400 transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white font-semibold text-[13px] mb-4 uppercase tracking-wider">{isUk ? "Контакти" : "Contacts"}</p>
            <ul className="space-y-3 text-[13px] text-slate-400">
              <li className="flex items-start gap-2.5">
                <span className="shrink-0 mt-0.5">📍</span>
                <span>{isUk ? "м. Вінниця, вул. Агрономічна, 14, офіс 203" : "Vinnytsia, Ahronomichna St, 14, office 203"}</span>
              </li>
              <li className="flex items-center gap-2.5"><span>📞</span> <a href="tel:+380634567890" className="hover:text-white transition-colors">+38 (063) 456-78-90</a></li>
              <li className="flex items-center gap-2.5"><span>✉️</span> <a href="mailto:info@agrodrone.ua" className="hover:text-white transition-colors">info@agrodrone.ua</a></li>
              <li className="flex items-start gap-2.5">
                <span className="shrink-0 mt-0.5">⚡</span>
                <span className="text-lime-500 font-medium">{isUk ? "Відповідь протягом 4 годин у робочий час" : "Response within 4 hours during business hours"}</span>
              </li>
            </ul>
            <div className="flex gap-3 mt-5">
              {[
                { icon: "📘", label: "Facebook" },
                { icon: "📸", label: "Instagram" },
                { icon: "✈️", label: "Telegram" },
                { icon: "▶️", label: "YouTube" },
              ].map(s => (
                <a key={s.label} href="#" title={s.label}
                  className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-[16px] transition-colors">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[12px] text-slate-700">© 2025 AgroDrone Tech. {isUk ? "Всі права захищено." : "All rights reserved."}</p>
            <div className="flex items-center gap-5 text-[12px] text-slate-700">
              <a href="#" className="hover:text-slate-500 transition-colors">{isUk ? "Умови використання" : "Terms"}</a>
              <a href="#" className="hover:text-slate-500 transition-colors">{isUk ? "Конфіденційність" : "Privacy"}</a>
              <span className="text-slate-800">|</span>
              <span className="text-slate-800">{isUk ? "Демо — портфоліо Codeworth" : "Demo — Codeworth portfolio"}</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ── FORM MODAL ── */}
      {formOpen && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setFormOpen(false)}>
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            {formDone ? (
              <div className="text-center py-4">
                <div className="text-5xl mb-3">✅</div>
                <h3 className="font-bold text-white text-xl mb-2">{isUk ? "Запит надіслано!" : "Request sent!"}</h3>
                <p className="text-slate-400 text-sm">{isUk ? "Передзвонимо протягом 4 год. у робочий час" : "We'll call back within 4 business hours"}</p>
                <button onClick={() => { setFormOpen(false); setFormDone(false); }} className="mt-5 px-6 py-2.5 bg-lime-500 text-slate-950 font-bold rounded-xl text-sm">OK</button>
              </div>
            ) : (
              <>
                <h3 className="font-bold text-white text-[20px] mb-1">{isUk ? "Запит на послугу" : "Service request"}</h3>
                <p className="text-slate-400 text-sm mb-6">{isUk ? "Приїдемо на безкоштовний огляд поля" : "Free field inspection included"}</p>
                <div className="space-y-3">
                  <input type="text" placeholder={isUk ? "Компанія або ПІБ" : "Company or name"}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-lime-500 placeholder-slate-500" />
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" placeholder={isUk ? "Культура" : "Crop"}
                      className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-lime-500 placeholder-slate-500" />
                    <input type="text" placeholder={isUk ? "Площа, га" : "Area, ha"}
                      className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-lime-500 placeholder-slate-500" />
                  </div>
                  <input type="text" placeholder={isUk ? "Область / район" : "Region / district"}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-lime-500 placeholder-slate-500" />
                  <input type="tel" placeholder="+38 (0__) ___-__-__"
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-lime-500 placeholder-slate-500" />
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setFormOpen(false)} className="flex-1 py-3 rounded-xl border border-slate-700 text-slate-400 text-sm hover:bg-slate-800 transition-colors">
                    {isUk ? "Скасувати" : "Cancel"}
                  </button>
                  <button onClick={() => setFormDone(true)} className="flex-1 py-3 rounded-xl bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold text-sm transition-colors">
                    {isUk ? "Надіслати" : "Send"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
