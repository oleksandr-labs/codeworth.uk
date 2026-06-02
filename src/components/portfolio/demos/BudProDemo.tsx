"use client";
import { useState } from "react";

const SERVICES = [
  { id: "turnkey", emoji: "🏠", nameUk: "Будівництво під ключ", nameEn: "Turnkey Construction", descUk: "Від фундаменту до здачі. Проєкт, матеріали, роботи.", descEn: "Foundation to handover. Design, materials, works.", priceUk: "від 4 500 ₴/м²", priceEn: "from 4,500 ₴/m²" },
  { id: "apartment", emoji: "🔨", nameUk: "Ремонт квартир", nameEn: "Apartment Renovation", descUk: "Косметичний / Стандарт / Преміум. Здаємо в термін.", descEn: "Cosmetic / Standard / Premium. On-time delivery.", priceUk: "від 1 200 ₴/м²", priceEn: "from 1,200 ₴/m²" },
  { id: "commercial", emoji: "🏢", nameUk: "Комерційні приміщення", nameEn: "Commercial Spaces", descUk: "Офіси, магазини, кафе. Дизайн-проєкт та виконання.", descEn: "Offices, shops, cafes. Design and execution.", priceUk: "від 2 200 ₴/м²", priceEn: "from 2,200 ₴/m²" },
  { id: "landscape", emoji: "🌿", nameUk: "Ландшафтний дизайн", nameEn: "Landscape Design", descUk: "Доріжки, альтанки, газон, освітлення ділянки.", descEn: "Pathways, gazebos, lawn, site lighting.", priceUk: "від 800 ₴/м²", priceEn: "from 800 ₴/m²" },
];

const PROJECTS = [
  { id: 1, type: "apartment", year: 2025, emoji: "🏙️", nameUk: "3-кімнатна квартира, Львів", nameEn: "3-room apartment, Lviv", areaUk: "85 м²", areaEn: "85 m²", levelUk: "Преміум", levelEn: "Premium", daysUk: "45 днів", daysEn: "45 days", budgetUk: "680 000 ₴", budgetEn: "680,000 ₴", beforeEmoji: "🏚️", afterEmoji: "🏠" },
  { id: 2, type: "house", year: 2025, emoji: "🏡", nameUk: "Будинок 200 м², Брюховичі", nameEn: "200 m² house, Briukhovychi", areaUk: "200 м²", areaEn: "200 m²", levelUk: "Преміум під ключ", levelEn: "Premium turnkey", daysUk: "180 днів", daysEn: "180 days", budgetUk: "2 800 000 ₴", budgetEn: "2,800,000 ₴", beforeEmoji: "🏗️", afterEmoji: "🏡" },
  { id: 3, type: "commercial", year: 2024, emoji: "☕", nameUk: "Кав'ярня 60 м², центр Львова", nameEn: "60 m² café, Lviv centre", areaUk: "60 м²", areaEn: "60 m²", levelUk: "Дизайн + виконання", levelEn: "Design + execution", daysUk: "35 днів", daysEn: "35 days", budgetUk: "420 000 ₴", budgetEn: "420,000 ₴", beforeEmoji: "🏛️", afterEmoji: "☕" },
  { id: 4, type: "apartment", year: 2024, emoji: "🛋️", nameUk: "Студія 38 м², ЖК Варшавський", nameEn: "38 m² studio, Varshavskyi", areaUk: "38 м²", areaEn: "38 m²", levelUk: "Стандарт", levelEn: "Standard", daysUk: "28 днів", daysEn: "28 days", budgetUk: "175 000 ₴", budgetEn: "175,000 ₴", beforeEmoji: "🧱", afterEmoji: "🛋️" },
  { id: 5, type: "commercial", year: 2024, emoji: "💼", nameUk: "Офіс 150 м², IT-компанія", nameEn: "150 m² office, IT company", areaUk: "150 м²", areaEn: "150 m²", levelUk: "Преміум", levelEn: "Premium", daysUk: "60 днів", daysEn: "60 days", budgetUk: "1 200 000 ₴", budgetEn: "1,200,000 ₴", beforeEmoji: "🏢", afterEmoji: "💼" },
  { id: 6, type: "apartment", year: 2023, emoji: "🌟", nameUk: "2-кімнатна з дизайном, Сихів", nameEn: "2-room designer apt, Sykhiv", areaUk: "65 м²", areaEn: "65 m²", levelUk: "Преміум", levelEn: "Premium", daysUk: "52 дні", daysEn: "52 days", budgetUk: "490 000 ₴", budgetEn: "490,000 ₴", beforeEmoji: "🏗️", afterEmoji: "🌟" },
  { id: 7, type: "house", year: 2023, emoji: "🌲", nameUk: "Котедж 130 м², Рясне", nameEn: "130 m² cottage, Riasne", areaUk: "130 м²", areaEn: "130 m²", levelUk: "Стандарт", levelEn: "Standard", daysUk: "120 днів", daysEn: "120 days", budgetUk: "1 200 000 ₴", budgetEn: "1,200,000 ₴", beforeEmoji: "🌾", afterEmoji: "🌲" },
  { id: 8, type: "commercial", year: 2025, emoji: "💄", nameUk: "Салон краси 80 м²", nameEn: "80 m² beauty salon", areaUk: "80 м²", areaEn: "80 m²", levelUk: "Преміум дизайн", levelEn: "Premium design", daysUk: "40 днів", daysEn: "40 days", budgetUk: "560 000 ₴", budgetEn: "560,000 ₴", beforeEmoji: "🔨", afterEmoji: "💄" },
  { id: 9, type: "apartment", year: 2025, emoji: "🖼️", nameUk: "4-кімнатна, капітальний ремонт", nameEn: "4-room, full renovation", areaUk: "120 м²", areaEn: "120 m²", levelUk: "Стандарт+", levelEn: "Standard+", daysUk: "70 днів", daysEn: "70 days", budgetUk: "680 000 ₴", budgetEn: "680,000 ₴", beforeEmoji: "🏚️", afterEmoji: "🖼️" },
  { id: 10, type: "apartment", year: 2023, emoji: "🍷", nameUk: "Квартира з вином у Рятівничому", nameEn: "Wine-inspired apartment", areaUk: "75 м²", areaEn: "75 m²", levelUk: "Преміум", levelEn: "Premium", daysUk: "55 днів", daysEn: "55 days", budgetUk: "580 000 ₴", budgetEn: "580,000 ₴", beforeEmoji: "🧱", afterEmoji: "🍷" },
  { id: 11, type: "house", year: 2024, emoji: "🏊", nameUk: "Будинок з басейном 280 м²", nameEn: "House with pool 280 m²", areaUk: "280 м²", areaEn: "280 m²", levelUk: "Преміум під ключ", levelEn: "Premium turnkey", daysUk: "240 днів", daysEn: "240 days", budgetUk: "4 200 000 ₴", budgetEn: "4,200,000 ₴", beforeEmoji: "🏗️", afterEmoji: "🏊" },
  { id: 12, type: "commercial", year: 2023, emoji: "🍕", nameUk: "Піцерія 120 м², Франківськ", nameEn: "120 m² pizzeria, Frankivsk", areaUk: "120 м²", areaEn: "120 m²", levelUk: "Стандарт", levelEn: "Standard", daysUk: "45 днів", daysEn: "45 days", budgetUk: "540 000 ₴", budgetEn: "540,000 ₴", beforeEmoji: "🏛️", afterEmoji: "🍕" },
];

const TEAM = [
  { emoji: "👷", nameUk: "Роман Яременко", nameEn: "Roman Yaremenko", roleUk: "Головний архітектор", roleEn: "Chief Architect", expUk: "15 років", expEn: "15 years" },
  { emoji: "🔨", nameUk: "Богдан Ковальчук", nameEn: "Bohdan Kovalchuk", roleUk: "Прораб", roleEn: "Site Manager", expUk: "12 років", expEn: "12 years" },
  { emoji: "🎨", nameUk: "Оксана Левченко", nameEn: "Oksana Levchenko", roleUk: "Дизайнер інтер'єру", roleEn: "Interior Designer", expUk: "10 років", expEn: "10 years" },
];

const REVIEWS = [
  { name: "Olena Marchenko", nameUk: "Олена Марченко", project: "Apartment renovation", projectUk: "Ремонт квартири", stars: 5, year: 2025, text: "BudPro renovated our apartment in 45 days perfectly. Photo reports every week — we saw every stage from abroad. Highly recommend!", textUk: "BudPro зробили ремонт нашої квартири ідеально за 45 днів. Щотижневі фото-звіти — ми бачили кожен етап з-за кордону. Рекомендуємо!" },
  { name: "Andriy Kovalenko", nameUk: "Андрій Коваленко", project: "Turnkey house", projectUk: "Будинок під ключ", stars: 5, year: 2025, text: "Built our 200 m² home in Briukhovychi on schedule. Every material choice was agreed with us. The result exceeded expectations.", textUk: "Збудували наш будинок 200 м² у Брюховичах точно в термін. Кожен вибір матеріалів погоджували з нами. Результат перевершив очікування." },
  { name: "Sofia Petrenko", nameUk: "Софія Петренко", project: "Commercial — café", projectUk: "Комерція — кав'ярня", stars: 5, year: 2024, text: "Our café opened on time thanks to BudPro. The team is professional and the cost matched the estimate exactly.", textUk: "Наша кав'ярня відкрилась вчасно завдяки BudPro. Команда професійна, вартість відповідала кошторису точно." },
  { name: "Mykhailo Bondarenko", nameUk: "Михайло Бондаренко", project: "Office renovation", projectUk: "Ремонт офісу", stars: 4, year: 2024, text: "Great quality, clean site management. Only small delay at finish stage but team communicated proactively and resolved everything.", textUk: "Чудова якість, чистота на об'єкті. Лише невелика затримка на фінальному етапі, але команда комунікувала і все вирішила." },
  { name: "Iryna Lysenko", nameUk: "Ірина Лисенко", project: "2-room apartment", projectUk: "2-кімнатна квартира", stars: 5, year: 2023, text: "Worked with BudPro twice. Second renovation was even better than the first. Roman and the crew are top-level professionals.", textUk: "Двічі працювали з BudPro. Другий ремонт ще кращий за перший. Роман та команда — фахівці найвищого рівня." },
];

const PROCESS_STEPS = [
  { enTitle: "Application & free consultation", ukTitle: "Заявка та безкоштовна консультація", enDesc: "Contact us by phone or form. Our manager calls back within 30 minutes and answers all questions.", ukDesc: "Зв'яжіться з нами по телефону або через форму. Менеджер передзвонює протягом 30 хвилин і відповідає на всі питання." },
  { enTitle: "Site visit & measurement (free)", ukTitle: "Виїзд та замір (безкоштовно)", enDesc: "Our specialist visits your site, measures all surfaces and documents the scope of work.", ukDesc: "Наш фахівець виїжджає на об'єкт, вимірює всі поверхні та фіксує обсяг робіт." },
  { enTitle: "Estimate within 3 days", ukTitle: "Кошторис протягом 3 днів", enDesc: "You receive a detailed estimate with material list and labour breakdown. No hidden fees.", ukDesc: "Ви отримуєте детальний кошторис із переліком матеріалів та розбивкою робіт. Без прихованих платежів." },
  { enTitle: "Contract & prepayment", ukTitle: "Договір та передоплата", enDesc: "We sign a fixed-price contract with deadlines and warranty terms. Prepayment 30%.", ukDesc: "Підписуємо договір з фіксованою ціною, термінами та умовами гарантії. Передоплата 30%." },
  { enTitle: "Works with weekly photo reports", ukTitle: "Виконання з фото-звітом щотижня", enDesc: "Construction in progress with weekly photo updates sent to your messenger. Full transparency.", ukDesc: "Виконання робіт із щотижневими фото у ваш месенджер. Повна прозорість процесу." },
  { enTitle: "Handover + 3-year warranty", ukTitle: "Здача + гарантія 3 роки", enDesc: "Final walkthrough, snag list clearance, and handover documents. 3-year warranty on all works.", ukDesc: "Фінальний огляд, усунення зауважень та акт здачі. Гарантія на всі роботи 3 роки." },
];

const CALC_PRICES: Record<string, Record<string, [number, number]>> = {
  apartment: { cosmetic: [1200, 1800], standard: [2500, 3500], premium: [5000, 8000] },
  office: { standard: [2200, 3200], premium: [4500, 6500] },
  house: { standard: [4500, 6000], premium: [8000, 14000] },
};

const TYPE_LABELS = [
  { value: "all", en: "All", uk: "Всі" },
  { value: "apartment", en: "Apartment", uk: "Квартира" },
  { value: "house", en: "House", uk: "Будинок" },
  { value: "commercial", en: "Commercial", uk: "Комерція" },
];

const YEAR_LABELS = [
  { value: "all", en: "All", uk: "Всі" },
  { value: "2025", en: "2025", uk: "2025" },
  { value: "2024", en: "2024", uk: "2024" },
  { value: "2023", en: "2023", uk: "2023" },
];

export function BudProDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [calcType, setCalcType] = useState("apartment");
  const [calcArea, setCalcArea] = useState(80);
  const [calcLevel, setCalcLevel] = useState("standard");
  const [typeFilter, setTypeFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [estimateSubmitted, setEstimateSubmitted] = useState(false);
  const [formData, setFormData] = useState({ service: "apartment", area: "", name: "", phone: "" });

  const calcKey = calcLevel in (CALC_PRICES[calcType] || {}) ? calcLevel : Object.keys(CALC_PRICES[calcType] || {})[0];
  const priceRange = CALC_PRICES[calcType]?.[calcKey] ?? [0, 0];
  const totalMin = priceRange[0] * calcArea;
  const totalMax = priceRange[1] * calcArea;

  const filteredProjects = PROJECTS.filter((p) => {
    const typeMatch = typeFilter === "all" || p.type === typeFilter;
    const yearMatch = yearFilter === "all" || p.year === Number(yearFilter);
    return typeMatch && yearMatch;
  });

  const calcLevels: Record<string, { en: string; uk: string }[]> = {
    apartment: [{ en: "Cosmetic", uk: "Косметичний" }, { en: "Standard", uk: "Стандарт" }, { en: "Premium", uk: "Преміум" }],
    office: [{ en: "Standard", uk: "Стандарт" }, { en: "Premium", uk: "Преміум" }],
    house: [{ en: "Standard", uk: "Стандарт" }, { en: "Premium", uk: "Преміум" }],
  };
  const calcLevelKeys: Record<string, string[]> = {
    apartment: ["cosmetic", "standard", "premium"],
    office: ["standard", "premium"],
    house: ["standard", "premium"],
  };

  return (
    <div className="bg-[#1C1C1E] min-h-screen font-sans text-white">
      {/* Nav */}
      <nav className="bg-[#1C1C1E] border-b border-[#2C2C2E] sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <span className="text-xl font-black tracking-tight">🏗️ BudPro</span>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">
            <a href="#services" className="hover:text-white transition-colors">{isUk ? "Послуги" : "Services"}</a>
            <a href="#portfolio" className="hover:text-white transition-colors">{isUk ? "Портфоліо" : "Portfolio"}</a>
            <a href="#process" className="hover:text-white transition-colors">{isUk ? "Процес" : "Process"}</a>
            <a href="#calculator" className="hover:text-white transition-colors">{isUk ? "Калькулятор" : "Calculator"}</a>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#E8650A] font-bold text-sm hidden sm:block">+38 (067) 123-45-67</span>
            <button className="bg-[#E8650A] text-white text-xs font-bold px-4 py-2 rounded hover:bg-[#d05a08] transition-colors">
              {isUk ? "Зателефонувати" : "Call"}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-[#1C1C1E] pt-16 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap gap-3 mb-8">
            {[
              isUk ? "✅ 10 років" : "✅ 10 years",
              isUk ? "✅ 350+ об'єктів" : "✅ 350+ projects",
              isUk ? "✅ Гарантія 3 роки" : "✅ 3-year warranty",
            ].map((chip) => (
              <span key={chip} className="bg-[#E8650A]/20 border border-[#E8650A]/40 text-[#E8650A] text-sm font-semibold px-4 py-1.5 rounded-full">
                {chip}
              </span>
            ))}
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase leading-none tracking-tight mb-8 text-white">
            {isUk ? (
              <>Будуємо.<br />Ремонтуємо.<br /><span className="text-[#E8650A]">Гарантуємо.</span></>
            ) : (
              <>We Build.<br />We Renovate.<br /><span className="text-[#E8650A]">We Guarantee.</span></>
            )}
          </h1>
          <div className="flex flex-wrap gap-4 mb-10">
            <a href="#calculator">
              <button className="bg-[#E8650A] text-white font-bold px-8 py-4 rounded text-base hover:bg-[#d05a08] transition-colors">
                {isUk ? "Розрахувати вартість" : "Calculate Cost"}
              </button>
            </a>
            <a href="#portfolio">
              <button className="border-2 border-white text-white font-bold px-8 py-4 rounded text-base hover:bg-white hover:text-[#1C1C1E] transition-colors">
                {isUk ? "Переглянути об'єкти" : "View Projects"}
              </button>
            </a>
          </div>
          <div className="border-t border-[#2C2C2E] pt-6 text-sm text-[#6B7280] font-medium tracking-wide">
            Lviv-based · All Ukraine · Free estimate · Material sourcing included
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 px-4 bg-[#111113]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black uppercase mb-12 text-white">
            {isUk ? "Наші послуги" : "Our Services"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVICES.map((s) => (
              <div key={s.id} className="bg-[#252525] border-t-4 border-[#E8650A] rounded-lg p-6 flex flex-col gap-3">
                <div className="text-4xl">{s.emoji}</div>
                <h3 className="text-xl font-black text-white uppercase">{isUk ? s.nameUk : s.nameEn}</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed">{isUk ? s.descUk : s.descEn}</p>
                <div className="text-[#E8650A] font-black text-lg mt-auto">{isUk ? s.priceUk : s.priceEn}</div>
                <button className="mt-2 border border-[#E8650A] text-[#E8650A] font-bold text-sm px-4 py-2 rounded hover:bg-[#E8650A] hover:text-white transition-colors self-start">
                  {isUk ? "Отримати кошторис" : "Get Quote"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section id="calculator" className="py-20 px-4 bg-[#1C1C1E]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-black uppercase mb-3 text-white">
            {isUk ? "Калькулятор вартості" : "Cost Calculator"}
          </h2>
          <p className="text-[#6B7280] mb-10">{isUk ? "Розрахуйте орієнтовну вартість ремонту онлайн" : "Get an estimated renovation cost online"}</p>
          <div className="bg-[#252525] border border-[#2C2C2E] rounded-xl p-8 flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#6B7280] uppercase mb-2">{isUk ? "Тип робіт" : "Work Type"}</label>
                <select
                  value={calcType}
                  onChange={(e) => { setCalcType(e.target.value); setCalcLevel(calcLevelKeys[e.target.value][0]); }}
                  className="w-full bg-[#1C1C1E] border border-[#3C3C3E] text-white rounded px-3 py-2 text-sm"
                >
                  <option value="apartment">{isUk ? "Ремонт квартири" : "Apartment Renovation"}</option>
                  <option value="office">{isUk ? "Офіс" : "Office"}</option>
                  <option value="house">{isUk ? "Будинок під ключ" : "Turnkey Build"}</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#6B7280] uppercase mb-2">{isUk ? "Площа (м²)" : "Area (m²)"}</label>
                <input
                  type="number"
                  min={20}
                  max={500}
                  value={calcArea}
                  onChange={(e) => setCalcArea(Math.max(20, Math.min(500, Number(e.target.value))))}
                  className="w-full bg-[#1C1C1E] border border-[#3C3C3E] text-white rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#6B7280] uppercase mb-2">{isUk ? "Рівень оздоблення" : "Finish Level"}</label>
                <select
                  value={calcLevel}
                  onChange={(e) => setCalcLevel(e.target.value)}
                  className="w-full bg-[#1C1C1E] border border-[#3C3C3E] text-white rounded px-3 py-2 text-sm"
                >
                  {calcLevelKeys[calcType].map((key, i) => (
                    <option key={key} value={key}>
                      {isUk ? calcLevels[calcType][i].uk : calcLevels[calcType][i].en}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="bg-[#1C1C1E] rounded-lg p-6 border border-[#E8650A]/30">
              <div className="text-xs font-bold text-[#6B7280] uppercase mb-2">{isUk ? "Орієнтовна вартість" : "Estimated Range"}</div>
              <div className="text-4xl font-black text-[#E8650A]">
                {totalMin.toLocaleString()} – {totalMax.toLocaleString()} ₴
              </div>
              <div className="text-sm text-[#6B7280] mt-2">
                {priceRange[0].toLocaleString()} – {priceRange[1].toLocaleString()} ₴/м² × {calcArea} м²
              </div>
            </div>
            <p className="text-xs text-[#6B7280]">
              {isUk
                ? "* Точна вартість визначається після безкоштовного виїзного заміру фахівця"
                : "* Exact cost determined after free site measurement by our specialist"}
            </p>
            <a href="#estimate">
              <button className="bg-[#E8650A] text-white font-black px-6 py-3 rounded hover:bg-[#d05a08] transition-colors text-sm uppercase tracking-wide w-full sm:w-auto">
                {isUk ? "Замовити безкоштовний замір" : "Order Free Estimate"}
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="py-20 px-4 bg-[#111113]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black uppercase mb-10 text-white">{isUk ? "Портфоліо" : "Project Portfolio"}</h2>
          <div className="flex flex-wrap gap-6 mb-8">
            <div className="flex flex-wrap gap-2">
              {TYPE_LABELS.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setTypeFilter(t.value)}
                  className={`text-xs font-bold px-4 py-2 rounded transition-colors ${typeFilter === t.value ? "bg-[#E8650A] text-white" : "bg-[#252525] text-[#6B7280] hover:text-white border border-[#3C3C3E]"}`}
                >
                  {isUk ? t.uk : t.en}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {YEAR_LABELS.map((y) => (
                <button
                  key={y.value}
                  onClick={() => setYearFilter(y.value)}
                  className={`text-xs font-bold px-4 py-2 rounded transition-colors ${yearFilter === y.value ? "bg-[#E8650A] text-white" : "bg-[#252525] text-[#6B7280] hover:text-white border border-[#3C3C3E]"}`}
                >
                  {isUk ? y.uk : y.en}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((p) => (
              <div key={p.id} className="bg-[#252525] border border-[#2C2C2E] rounded-lg overflow-hidden">
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-[#E8650A]/20 flex items-center justify-center text-2xl shrink-0">
                      {p.emoji}
                    </div>
                    <div>
                      <h3 className="font-black text-white text-sm leading-tight">{isUk ? p.nameUk : p.nameEn}</h3>
                      <span className="text-[#E8650A] text-xs font-bold uppercase">{p.type} · {p.year}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-4 bg-[#1C1C1E] rounded-lg py-3 mb-4 text-2xl">
                    <span title="Before">{p.beforeEmoji}</span>
                    <span className="text-[#6B7280] text-sm font-bold">→</span>
                    <span title="After">{p.afterEmoji}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-[#1C1C1E] text-[#6B7280] text-xs px-2 py-1 rounded">{isUk ? p.areaUk : p.areaEn}</span>
                    <span className="bg-[#1C1C1E] text-[#6B7280] text-xs px-2 py-1 rounded">{isUk ? p.daysUk : p.daysEn}</span>
                    <span className="bg-[#E8650A]/10 text-[#E8650A] text-xs px-2 py-1 rounded font-bold">{isUk ? p.budgetUk : p.budgetEn}</span>
                  </div>
                  <button
                    onClick={() => setExpandedProject(expandedProject === p.id ? null : p.id)}
                    className="w-full border border-[#3C3C3E] text-[#6B7280] text-xs font-bold py-2 rounded hover:border-[#E8650A] hover:text-[#E8650A] transition-colors"
                  >
                    {expandedProject === p.id ? (isUk ? "Згорнути" : "Collapse") : (isUk ? "Детальніше" : "View Details")}
                  </button>
                </div>
                {expandedProject === p.id && (
                  <div className="border-t border-[#2C2C2E] bg-[#1C1C1E] px-5 py-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-[#6B7280]">{isUk ? "Рівень" : "Level"}</span><span className="text-white font-bold">{isUk ? p.levelUk : p.levelEn}</span></div>
                      <div className="flex justify-between"><span className="text-[#6B7280]">{isUk ? "Площа" : "Area"}</span><span className="text-white font-bold">{isUk ? p.areaUk : p.areaEn}</span></div>
                      <div className="flex justify-between"><span className="text-[#6B7280]">{isUk ? "Тривалість" : "Duration"}</span><span className="text-white font-bold">{isUk ? p.daysUk : p.daysEn}</span></div>
                      <div className="flex justify-between"><span className="text-[#6B7280]">{isUk ? "Бюджет" : "Budget"}</span><span className="text-[#E8650A] font-black">{isUk ? p.budgetUk : p.budgetEn}</span></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          {filteredProjects.length === 0 && (
            <p className="text-[#6B7280] text-center py-12">{isUk ? "Об'єктів не знайдено" : "No projects found"}</p>
          )}
        </div>
      </section>

      {/* Process */}
      <section id="process" className="py-20 px-4 bg-[#1C1C1E]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-black uppercase mb-12 text-white">{isUk ? "Як ми працюємо" : "How We Work"}</h2>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[#E8650A]/30" />
            <div className="flex flex-col gap-10">
              {PROCESS_STEPS.map((step, i) => (
                <div key={i} className="flex gap-6 relative">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-[#E8650A] flex items-center justify-center text-white font-black text-lg z-10">
                    {i + 1}
                  </div>
                  <div className="pt-1">
                    <h3 className="font-black text-white text-lg mb-1">{isUk ? step.ukTitle : step.enTitle}</h3>
                    <p className="text-[#6B7280] text-sm leading-relaxed">{isUk ? step.ukDesc : step.enDesc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4 bg-[#111113]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black uppercase mb-12 text-white">{isUk ? "Наша команда" : "Our Team"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {TEAM.map((member) => (
              <div key={member.nameEn} className="bg-[#252525] border border-[#2C2C2E] rounded-lg p-6 text-center">
                <div className="text-5xl mb-4">{member.emoji}</div>
                <h3 className="text-white font-black text-lg">{isUk ? member.nameUk : member.nameEn}</h3>
                <p className="text-[#E8650A] text-sm font-bold mt-1">{isUk ? member.roleUk : member.roleEn}</p>
                <p className="text-[#6B7280] text-sm mt-2">{isUk ? `Досвід: ${member.expUk}` : `Experience: ${member.expEn}`}</p>
              </div>
            ))}
          </div>
          <div>
            <h3 className="text-lg font-black text-white mb-4 uppercase">{isUk ? "Ліцензії та партнери" : "Certificates & Partners"}</h3>
            <div className="flex flex-wrap gap-3">
              {["SBU Licensed", "DNAOP Certified", "Knauf Partner", "Ceresit Partner", "Weber Partner"].map((badge) => (
                <span key={badge} className="bg-[#252525] border border-[#E8650A]/30 text-[#E8650A] text-xs font-bold px-4 py-2 rounded">
                  ✓ {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 px-4 bg-[#1C1C1E]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black uppercase mb-12 text-white">{isUk ? "Відгуки клієнтів" : "Client Reviews"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <div key={i} className="bg-[#252525] border border-[#2C2C2E] rounded-lg p-6 flex flex-col gap-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-black text-white">{isUk ? r.nameUk : r.name}</p>
                    <p className="text-[#6B7280] text-xs mt-0.5">{isUk ? r.projectUk : r.project} · {r.year}</p>
                  </div>
                  <div className="text-[#E8650A] text-sm font-bold">{"★".repeat(r.stars)}</div>
                </div>
                <p className="text-[#6B7280] text-sm leading-relaxed">{isUk ? r.textUk : r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Estimate Form */}
      <section id="estimate" className="py-20 px-4 bg-[#E8650A]/10 border-t border-b border-[#E8650A]/20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-black uppercase mb-3 text-white">
            {isUk ? "Замовити безкоштовний замір" : "Get a Free Estimate"}
          </h2>
          <p className="text-[#6B7280] mb-10">
            {isUk ? "Заповніть форму — ми передзвонимо протягом 30 хвилин" : "Fill the form — we call back within 30 minutes"}
          </p>
          {estimateSubmitted ? (
            <div className="bg-[#252525] border border-[#E8650A] rounded-xl p-10">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-2xl font-black text-white mb-2">{isUk ? "Заявку отримано!" : "Request Received!"}</h3>
              <p className="text-[#6B7280]">{isUk ? "Менеджер передзвонить вам протягом 30 хвилин." : "Our manager will call you back within 30 minutes."}</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setEstimateSubmitted(true); }}
              className="bg-[#252525] border border-[#2C2C2E] rounded-xl p-8 flex flex-col gap-4 text-left"
            >
              <div>
                <label className="block text-xs font-bold text-[#6B7280] uppercase mb-2">{isUk ? "Тип послуги" : "Service Type"}</label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full bg-[#1C1C1E] border border-[#3C3C3E] text-white rounded px-3 py-2 text-sm"
                >
                  <option value="apartment">{isUk ? "Ремонт квартири" : "Apartment Renovation"}</option>
                  <option value="house">{isUk ? "Будинок під ключ" : "Turnkey House"}</option>
                  <option value="commercial">{isUk ? "Комерційне приміщення" : "Commercial Space"}</option>
                  <option value="landscape">{isUk ? "Ландшафтний дизайн" : "Landscape Design"}</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#6B7280] uppercase mb-2">{isUk ? "Площа (м²)" : "Area (m²)"}</label>
                <input
                  type="number"
                  placeholder={isUk ? "Наприклад: 75" : "e.g. 75"}
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="w-full bg-[#1C1C1E] border border-[#3C3C3E] text-white rounded px-3 py-2 text-sm placeholder-[#4B5563]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#6B7280] uppercase mb-2">{isUk ? "Ваше ім'я" : "Your Name"}</label>
                  <input
                    type="text"
                    required
                    placeholder={isUk ? "Ім'я" : "Name"}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#1C1C1E] border border-[#3C3C3E] text-white rounded px-3 py-2 text-sm placeholder-[#4B5563]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#6B7280] uppercase mb-2">{isUk ? "Телефон" : "Phone"}</label>
                  <input
                    type="tel"
                    required
                    placeholder="+38 (0__) ___-__-__"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#1C1C1E] border border-[#3C3C3E] text-white rounded px-3 py-2 text-sm placeholder-[#4B5563]"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-[#E8650A] text-white font-black px-6 py-4 rounded hover:bg-[#d05a08] transition-colors uppercase tracking-wide text-sm mt-2"
              >
                {isUk ? "Замовити безкоштовний замір" : "Order Free Estimate"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#111113] border-t border-[#2C2C2E] py-14 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="text-2xl font-black mb-3">🏗️ BudPro</div>
            <p className="text-[#6B7280] text-sm leading-relaxed">
              {isUk
                ? "Будівельна компанія у Львові. Якісно. Вчасно. З гарантією."
                : "Construction company in Lviv. Quality. On time. With warranty."}
            </p>
          </div>
          <div>
            <h4 className="text-white font-black uppercase text-sm mb-4">{isUk ? "Контакти" : "Contact"}</h4>
            <div className="space-y-2 text-sm text-[#6B7280]">
              <p>📍 {isUk ? "Львів, Під Дубом 7б" : "Lviv, Pid Dubom 7b"}</p>
              <p>📞 <span className="text-[#E8650A] font-bold">+38 (067) 123-45-67</span></p>
              <p>✉️ info@budpro.lviv.ua</p>
            </div>
          </div>
          <div>
            <h4 className="text-white font-black uppercase text-sm mb-4">{isUk ? "Графік роботи" : "Working Hours"}</h4>
            <div className="space-y-2 text-sm text-[#6B7280]">
              <p>{isUk ? "Пн–Пт: 8:00 – 18:00" : "Mon–Fri: 8:00 – 18:00"}</p>
              <p>{isUk ? "Сб: 9:00 – 15:00" : "Sat: 9:00 – 15:00"}</p>
              <p>{isUk ? "Нд: вихідний" : "Sun: closed"}</p>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-[#2C2C2E] text-center text-xs text-[#6B7280]">
          © 2025 BudPro. {isUk ? "Всі права захищені." : "All rights reserved."}
        </div>
      </footer>
    </div>
  );
}
