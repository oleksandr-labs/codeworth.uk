"use client";

import { useState } from "react";

export function EstateUADemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [typeFilter, setTypeFilter] = useState("all");
  const [districtFilter, setDistrictFilter] = useState("all");
  const [budgetFilter, setBudgetFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedProperty, setSelectedProperty] = useState<number | null>(null);
  const [viewingFormOpen, setViewingFormOpen] = useState(false);
  const [viewingDate, setViewingDate] = useState("tomorrow");
  const [mortgagePrice, setMortgagePrice] = useState(150000);
  const [mortgageDown, setMortgageDown] = useState(20);
  const [mortgageTerm, setMortgageTerm] = useState(15);

  const properties = [
    { id: 1, type: "apartment", district: "pechersk", budget: "200k+", nameUk: "Апартаменти у ЖК «Резиденція»", nameEn: "Apartments in 'Residentia' Complex", emoji: "🏙️", rooms: 3, area: 112, floor: "8/16", price: 285000, priceUah: 10830000, status: "sale", tag: "premium" },
    { id: 2, type: "apartment", district: "shevchenkivskyi", budget: "100-200k", nameUk: "Квартира біля Золотих Воріт", nameEn: "Apartment near Golden Gate", emoji: "🏛️", rooms: 2, area: 78, floor: "5/9", price: 145000, priceUah: 5510000, status: "sale", tag: "popular" },
    { id: 3, type: "house", district: "holosiivskyi", budget: "200k+", nameUk: "Будинок з садом у Голосіївському", nameEn: "House with Garden in Holosiivskyi", emoji: "🏡", rooms: 5, area: 230, floor: "2 floors", price: 420000, priceUah: 15960000, status: "sale", tag: "exclusive" },
    { id: 4, type: "apartment", district: "obolon", budget: "50-100k", nameUk: "Смарт-квартира «Оболонь Рів'єра»", nameEn: "Smart apartment 'Obolon Riviera'", emoji: "🌊", rooms: 1, area: 38, floor: "12/25", price: 68000, priceUah: 2584000, status: "sale", tag: null },
    { id: 5, type: "commercial", district: "pechersk", budget: "200k+", nameUk: "Офіс класу A, Печерськ", nameEn: "Class A Office, Pechersk", emoji: "🏢", rooms: null, area: 320, floor: "4/12", price: 890000, priceUah: 33820000, status: "sale", tag: "investment" },
    { id: 6, type: "apartment", district: "podil", budget: "100-200k", nameUk: "Лофт-апартаменти на Подолі", nameEn: "Loft Apartments in Podil", emoji: "🏗️", rooms: 2, area: 95, floor: "3/6", price: 165000, priceUah: 6270000, status: "sale", tag: "new" },
    { id: 7, type: "apartment", district: "shevchenkivskyi", budget: "50-100k", nameUk: "Квартира на Хрещатику", nameEn: "Apartment on Khreshchatyk", emoji: "🌳", rooms: 2, area: 65, floor: "4/7", price: 98000, priceUah: 3724000, status: "rent", tag: null },
    { id: 8, type: "house", district: "holosiivskyi", budget: "100-200k", nameUk: "Таунхаус у Феофанія-Парк", nameEn: "Townhouse at Feofania Park", emoji: "🌲", rooms: 4, area: 165, floor: "3 floors", price: 175000, priceUah: 6650000, status: "sale", tag: "popular" },
    { id: 9, type: "apartment", district: "obolon", budget: "50-100k", nameUk: "1-кімнатна, вид на Дніпро", nameEn: "1-room, Dnipro river view", emoji: "🌅", rooms: 1, area: 42, floor: "18/24", price: 72000, priceUah: 2736000, status: "sale", tag: null },
    { id: 10, type: "commercial", district: "podil", budget: "50-100k", nameUk: "Торгове приміщення на Андріївському", nameEn: "Retail space on Andriivskyi", emoji: "🛍️", rooms: null, area: 85, floor: "1/3", price: 89000, priceUah: 3382000, status: "sale", tag: null },
    { id: 11, type: "land", district: "holosiivskyi", budget: "50-100k", nameUk: "Ділянка 15 сотих, Голосіїв", nameEn: "Land plot 15 acres, Holosiiv", emoji: "🌿", rooms: null, area: 1500, floor: "—", price: 55000, priceUah: 2090000, status: "sale", tag: null },
    { id: 12, type: "apartment", district: "pechersk", budget: "100-200k", nameUk: "2-кімнатна, Бесарабська пл.", nameEn: "2-room, Bessarabska sq.", emoji: "⭐", rooms: 2, area: 82, floor: "6/10", price: 135000, priceUah: 5130000, status: "sale", tag: "popular" },
  ];

  const agents = [
    { name: "Олег Мороз", nameEn: "Oleh Moroz", spec: "Pechersk & Luxury", deals: 340, exp: 12, emoji: "👨‍💼" },
    { name: "Юлія Ткаченко", nameEn: "Yuliia Tkachenko", spec: "New Builds", deals: 215, exp: 8, emoji: "👩‍💼" },
    { name: "Андрій Семенов", nameEn: "Andrii Semenov", spec: "Commercial Real Estate", deals: 180, exp: 10, emoji: "🧑‍💼" },
    { name: "Олена Бойко", nameEn: "Olena Boiko", spec: "Suburbs & Houses", deals: 290, exp: 14, emoji: "👩‍💼" },
  ];

  const districtLabels: Record<string, { en: string; uk: string }> = {
    pechersk: { en: "Pechersk", uk: "Печерськ" },
    shevchenkivskyi: { en: "Shevchenkivskyi", uk: "Шевченківський" },
    obolon: { en: "Obolon", uk: "Оболонь" },
    podil: { en: "Podil", uk: "Поділ" },
    holosiivskyi: { en: "Holosiivskyi", uk: "Голосіївський" },
  };

  const typeLabels: Record<string, { en: string; uk: string }> = {
    apartment: { en: "Apartment", uk: "Квартира" },
    house: { en: "House", uk: "Будинок" },
    commercial: { en: "Commercial", uk: "Комерційна" },
    land: { en: "Land", uk: "Земля" },
  };

  const tagStyles: Record<string, string> = {
    premium: "bg-amber-100 text-amber-800",
    exclusive: "bg-amber-100 text-amber-800",
    popular: "bg-teal-100 text-teal-800",
    new: "bg-green-100 text-green-800",
    investment: "bg-purple-100 text-purple-800",
  };

  const tagLabels: Record<string, { en: string; uk: string }> = {
    premium: { en: "Premium", uk: "Преміум" },
    exclusive: { en: "Exclusive", uk: "Ексклюзив" },
    popular: { en: "Popular", uk: "Популярне" },
    new: { en: "New", uk: "Нове" },
    investment: { en: "Investment", uk: "Інвестиція" },
  };

  const filteredProperties = properties.filter((p) => {
    if (typeFilter !== "all" && p.type !== typeFilter) return false;
    if (districtFilter !== "all" && p.district !== districtFilter) return false;
    if (budgetFilter !== "all" && p.budget !== budgetFilter) return false;
    if (statusFilter !== "all" && p.status !== statusFilter) return false;
    return true;
  });

  const activeProperty = properties.find((p) => p.id === selectedProperty) ?? null;

  const loanAmount = mortgagePrice * (1 - mortgageDown / 100);
  const monthlyRate = 8.5 / 100 / 12;
  const numPayments = mortgageTerm * 12;
  const monthlyPayment =
    monthlyRate > 0
      ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
        (Math.pow(1 + monthlyRate, numPayments) - 1)
      : loanAmount / numPayments;
  const totalPaid = monthlyPayment * numPayments;
  const totalInterest = totalPaid - loanAmount;

  const fmt = (n: number) =>
    "$" + Math.round(n).toLocaleString("en-US");

  const amenities = [
    { en: "Parking", uk: "Паркінг" },
    { en: "Elevator", uk: "Ліфт" },
    { en: "Security", uk: "Охорона" },
    { en: "Intercom", uk: "Домофон" },
    { en: "CCTV", uk: "Відеоспостереження" },
    { en: "Concierge", uk: "Консьєрж" },
  ];

  const getAmenities = (id: number) => amenities.filter((_, i) => (id + i) % 3 !== 0);

  const propDesc = (p: typeof properties[0]) => {
    if (isUk) {
      return `Чудовий об'єкт у районі ${districtLabels[p.district]?.uk ?? p.district}. Загальна площа ${p.area} м², ${p.rooms ? `${p.rooms} кімнати, ` : ""}поверх ${p.floor}. Ідеально для проживання або інвестицій — розташований у затишному місці з розвинутою інфраструктурою.`;
    }
    return `Outstanding property in the ${districtLabels[p.district]?.en ?? p.district} district. Total area ${p.area} m², ${p.rooms ? `${p.rooms} rooms, ` : ""}floor ${p.floor}. Perfect for living or investment — situated in a well-connected neighbourhood with full infrastructure.`;
  };

  const filterBtn = (active: boolean) =>
    `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${active ? "bg-indigo-600 text-white" : "bg-white text-slate-700 border border-slate-200 hover:border-indigo-300"}`;

  const selectCls = "px-3 py-1.5 rounded-lg text-sm border border-slate-200 bg-white text-slate-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-300";

  return (
    <div className="font-sans bg-slate-50 text-slate-900 min-h-screen">

      {/* NAV */}
      <nav style={{ backgroundColor: "#0F172A" }} className="sticky top-0 z-40 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <span className="text-white font-bold text-lg shrink-0">🏢 EstateUA</span>
          <div className="hidden md:flex items-center gap-6 text-sm text-slate-300">
            <a href="#properties" className="hover:text-white transition-colors">{isUk ? "Об'єкти" : "Properties"}</a>
            <a href="#" className="hover:text-white transition-colors">{isUk ? "Послуги" : "Services"}</a>
            <a href="#agents" className="hover:text-white transition-colors">{isUk ? "Команда" : "Team"}</a>
            <a href="#valuation" className="hover:text-white transition-colors">{isUk ? "Оцінка" : "Valuation"}</a>
          </div>
          <a href="tel:+380441234567" className="text-indigo-400 font-semibold text-sm shrink-0 hover:text-indigo-300 transition-colors">+380 44 123-45-67</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ backgroundColor: "#0F172A" }} className="px-6 pt-16 pb-14">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
            {isUk ? "Знайдіть свою ідеальну нерухомість" : "Find Your Perfect Property"}
          </h1>
          <p className="text-slate-400 text-lg mb-10">
            {isUk
              ? "15 років досвіду. 2 000+ успішних угод. Київ та Україна."
              : "15 years of expertise. 2,000+ successful deals. Kyiv & Ukraine."}
          </p>

          {/* Search bar */}
          <div className="bg-white rounded-2xl p-3 flex flex-wrap gap-2 items-center shadow-xl mb-8">
            <select className="flex-1 min-w-[130px] px-3 py-2.5 rounded-xl text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 text-slate-700">
              <option value="">{isUk ? "Квартира" : "Apartment"}</option>
              <option value="">{isUk ? "Будинок" : "House"}</option>
              <option value="">{isUk ? "Комерційна" : "Commercial"}</option>
              <option value="">{isUk ? "Земля" : "Land"}</option>
            </select>
            <select className="flex-1 min-w-[140px] px-3 py-2.5 rounded-xl text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 text-slate-700">
              <option value="">{isUk ? "Печерськ" : "Pechersk"}</option>
              <option value="">{isUk ? "Шевченківський" : "Shevchenkivskyi"}</option>
              <option value="">{isUk ? "Оболонь" : "Obolon"}</option>
              <option value="">{isUk ? "Поділ" : "Podil"}</option>
              <option value="">{isUk ? "Голосіївський" : "Holosiivskyi"}</option>
            </select>
            <select className="flex-1 min-w-[120px] px-3 py-2.5 rounded-xl text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 text-slate-700">
              <option value="">{isUk ? "до 50к $" : "up to $50k"}</option>
              <option value="">50–100k $</option>
              <option value="">100–200k $</option>
              <option value="">200k $+</option>
            </select>
            <button className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors cursor-pointer shrink-0">
              {isUk ? "Шукати" : "Search"}
            </button>
          </div>

          {/* Counters */}
          <div className="flex justify-center gap-10 flex-wrap">
            {[
              { val: "2,000+", label: isUk ? "угод закрито" : "deals closed" },
              { val: "12", label: isUk ? "районів Києва" : "Kyiv districts" },
              { val: "4.9★", label: isUk ? "середня оцінка" : "avg rating" },
            ].map((c) => (
              <div key={c.label} className="text-center">
                <div className="text-3xl font-bold text-white">{c.val}</div>
                <div className="text-slate-400 text-sm mt-1">{c.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROPERTIES */}
      <section id="properties" className="px-6 py-14 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{isUk ? "Каталог об'єктів" : "Properties Catalog"}</h2>
          <p className="text-slate-500 mb-8">{isUk ? `Знайдено: ${filteredProperties.length} об'єктів` : `Found: ${filteredProperties.length} properties`}</p>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-8 items-center">
            <div className="flex gap-2 flex-wrap">
              {["all", "apartment", "house", "commercial", "land"].map((t) => (
                <button key={t} className={filterBtn(typeFilter === t)} onClick={() => setTypeFilter(t)}>
                  {t === "all" ? (isUk ? "Всі" : "All") : (isUk ? typeLabels[t]?.uk : typeLabels[t]?.en)}
                </button>
              ))}
            </div>
            <select className={selectCls} value={districtFilter} onChange={(e) => setDistrictFilter(e.target.value)}>
              <option value="all">{isUk ? "Всі райони" : "All districts"}</option>
              {Object.entries(districtLabels).map(([key, val]) => (
                <option key={key} value={key}>{isUk ? val.uk : val.en}</option>
              ))}
            </select>
            <select className={selectCls} value={budgetFilter} onChange={(e) => setBudgetFilter(e.target.value)}>
              <option value="all">{isUk ? "Будь-який бюджет" : "Any budget"}</option>
              <option value="50-100k">$50k–$100k</option>
              <option value="100-200k">$100k–$200k</option>
              <option value="200k+">$200k+</option>
            </select>
            <div className="flex gap-2">
              {["all", "sale", "rent"].map((s) => (
                <button key={s} className={filterBtn(statusFilter === s)} onClick={() => setStatusFilter(s)}>
                  {s === "all" ? (isUk ? "Всі" : "All") : s === "sale" ? (isUk ? "Продаж" : "Sale") : (isUk ? "Оренда" : "Rent")}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                {/* Card header */}
                <div className="bg-indigo-50 p-6 flex items-start justify-between">
                  <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-3xl shrink-0">
                    {p.emoji}
                  </div>
                  {p.tag && (
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tagStyles[p.tag] ?? ""}`}>
                      {isUk ? tagLabels[p.tag]?.uk : tagLabels[p.tag]?.en}
                    </span>
                  )}
                </div>
                {/* Card body */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-semibold text-slate-900 mb-3 leading-snug">
                    {isUk ? p.nameUk : p.nameEn}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full">{p.area} m²</span>
                    {p.rooms && <span className="text-xs px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full">{p.rooms} {isUk ? "кімн." : "rooms"}</span>}
                    <span className="text-xs px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full">{isUk ? "Пов." : "Fl."} {p.floor}</span>
                    <span className="text-xs px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full">{isUk ? districtLabels[p.district]?.uk : districtLabels[p.district]?.en}</span>
                  </div>
                  <div className="mt-auto">
                    <div className="font-bold text-xl text-slate-900">${p.price.toLocaleString("en-US")}</div>
                    <div className="text-sm text-slate-400 mb-4">₴{p.priceUah.toLocaleString("uk-UA")}</div>
                    <button
                      className="w-full py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors cursor-pointer"
                      onClick={() => { setSelectedProperty(p.id); setViewingFormOpen(false); }}
                    >
                      {isUk ? "Переглянути" : "View details"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProperties.length === 0 && (
            <div className="text-center py-16 text-slate-400">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-lg">{isUk ? "Об'єктів не знайдено. Змініть фільтри." : "No properties found. Try different filters."}</p>
            </div>
          )}
        </div>
      </section>

      {/* PROPERTY MODAL */}
      {activeProperty && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-8 overflow-y-auto" style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl relative">
            <button
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer text-lg font-bold"
              onClick={() => { setSelectedProperty(null); setViewingFormOpen(false); }}
            >×</button>

            {/* Modal hero */}
            <div className="bg-indigo-50 rounded-t-3xl p-8 flex flex-col items-center text-center">
              <div className="text-7xl mb-4">{activeProperty.emoji}</div>
              {activeProperty.tag && (
                <span className={`text-xs font-semibold px-3 py-1.5 rounded-full mb-3 ${tagStyles[activeProperty.tag] ?? ""}`}>
                  {isUk ? tagLabels[activeProperty.tag]?.uk : tagLabels[activeProperty.tag]?.en}
                </span>
              )}
              <h2 className="text-2xl font-bold text-slate-900 leading-snug">
                {isUk ? activeProperty.nameUk : activeProperty.nameEn}
              </h2>
            </div>

            <div className="p-7">
              {/* Description */}
              <div className="mb-6">
                <h3 className="font-semibold text-slate-900 mb-2">{isUk ? "Про об'єкт" : "About this property"}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{propDesc(activeProperty)}</p>
              </div>

              {/* Key features */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { label: isUk ? "Площа" : "Area", val: `${activeProperty.area} m²` },
                  { label: isUk ? "Кімнати" : "Rooms", val: activeProperty.rooms ? String(activeProperty.rooms) : "—" },
                  { label: isUk ? "Поверх" : "Floor", val: activeProperty.floor },
                  { label: isUk ? "Район" : "District", val: isUk ? districtLabels[activeProperty.district]?.uk : districtLabels[activeProperty.district]?.en },
                  { label: isUk ? "Статус" : "Status", val: activeProperty.status === "sale" ? (isUk ? "Продаж" : "Sale") : (isUk ? "Оренда" : "Rent") },
                  { label: isUk ? "Тип" : "Type", val: isUk ? typeLabels[activeProperty.type]?.uk : typeLabels[activeProperty.type]?.en },
                ].map((f) => (
                  <div key={f.label} className="bg-slate-50 rounded-xl p-3 text-center">
                    <div className="text-xs text-slate-400 mb-1">{f.label}</div>
                    <div className="text-sm font-semibold text-slate-800">{f.val}</div>
                  </div>
                ))}
              </div>

              {/* Amenities */}
              <div className="mb-6">
                <h3 className="font-semibold text-slate-900 mb-3">{isUk ? "Зручності" : "Included amenities"}</h3>
                <div className="flex flex-wrap gap-2">
                  {getAmenities(activeProperty.id).map((a) => (
                    <span key={a.en} className="flex items-center gap-1 text-sm px-3 py-1.5 bg-green-50 text-green-700 rounded-full">
                      <span className="text-green-500">✓</span> {isUk ? a.uk : a.en}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="flex items-end gap-3 mb-6 p-4 bg-indigo-50 rounded-2xl">
                <div>
                  <div className="text-3xl font-bold text-indigo-700">${activeProperty.price.toLocaleString("en-US")}</div>
                  <div className="text-slate-500 text-sm">₴{activeProperty.priceUah.toLocaleString("uk-UA")}</div>
                </div>
              </div>

              {/* CTA */}
              {!viewingFormOpen ? (
                <button
                  className="w-full py-3.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors cursor-pointer"
                  onClick={() => setViewingFormOpen(true)}
                >
                  {isUk ? "Записатись на перегляд" : "Schedule viewing"}
                </button>
              ) : (
                <div className="border border-indigo-200 rounded-2xl p-5 bg-indigo-50">
                  <h3 className="font-semibold text-slate-900 mb-4">{isUk ? "Запис на перегляд" : "Request a viewing"}</h3>
                  <div className="flex flex-col gap-3">
                    <input className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" placeholder={isUk ? "Ваше ім'я" : "Your name"} />
                    <input className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" placeholder={isUk ? "Телефон" : "Phone number"} />
                    <div className="flex flex-col gap-2">
                      <span className="text-sm text-slate-600 font-medium">{isUk ? "Зручний час:" : "Preferred date:"}</span>
                      <div className="flex gap-3 flex-wrap">
                        {[
                          { val: "tomorrow", en: "Tomorrow", uk: "Завтра" },
                          { val: "week", en: "This week", uk: "Цього тижня" },
                          { val: "contact", en: "Contact me", uk: "Зв'яжіться зі мною" },
                        ].map((opt) => (
                          <label key={opt.val} className="flex items-center gap-1.5 text-sm text-slate-700 cursor-pointer">
                            <input type="radio" name="viewDate" value={opt.val} checked={viewingDate === opt.val} onChange={() => setViewingDate(opt.val)} className="accent-indigo-600" />
                            {isUk ? opt.uk : opt.en}
                          </label>
                        ))}
                      </div>
                    </div>
                    <button className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors cursor-pointer text-sm">
                      {isUk ? "Надіслати запит" : "Send request"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MORTGAGE CALCULATOR */}
      <section id="calculator" style={{ backgroundColor: "#0F172A" }} className="px-6 py-14">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-2">{isUk ? "Іпотечний калькулятор" : "Mortgage Calculator"}</h2>
          <p className="text-slate-400 mb-10">{isUk ? "Розрахуйте щомісячний платіж за іпотекою" : "Calculate your monthly mortgage payment"}</p>

          <div className="bg-slate-800 rounded-2xl p-6 mb-6">
            <label className="block text-slate-300 text-sm font-medium mb-2">
              {isUk ? "Вартість нерухомості:" : "Property price:"} <span className="text-indigo-400 font-bold">{fmt(mortgagePrice)}</span>
            </label>
            <input
              type="range" min={30000} max={500000} step={5000}
              value={mortgagePrice}
              onChange={(e) => setMortgagePrice(Number(e.target.value))}
              className="w-full accent-indigo-500 mb-6"
            />

            <div className="mb-6">
              <p className="text-slate-300 text-sm font-medium mb-3">{isUk ? "Перший внесок:" : "Down payment:"}</p>
              <div className="flex gap-2 flex-wrap">
                {[20, 30, 40, 50].map((d) => (
                  <button key={d} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${mortgageDown === d ? "bg-indigo-600 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"}`} onClick={() => setMortgageDown(d)}>{d}%</button>
                ))}
              </div>
            </div>

            <div className="mb-2">
              <p className="text-slate-300 text-sm font-medium mb-3">{isUk ? "Термін кредиту:" : "Loan term:"}</p>
              <div className="flex gap-2 flex-wrap">
                {[5, 10, 15, 20, 25].map((y) => (
                  <button key={y} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${mortgageTerm === y ? "bg-indigo-600 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"}`} onClick={() => setMortgageTerm(y)}>{y} {isUk ? "р." : "yr"}</button>
                ))}
              </div>
            </div>

            <p className="text-slate-500 text-xs mt-3">{isUk ? "Фіксована ставка: 8.5% річних" : "Fixed rate: 8.5% p.a."}</p>
          </div>

          {/* Results */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: isUk ? "Сума кредиту" : "Loan amount", val: fmt(loanAmount) },
              { label: isUk ? "Щомісяця" : "Monthly payment", val: fmt(monthlyPayment) },
              { label: isUk ? "Всього сплачено" : "Total paid", val: fmt(totalPaid) },
              { label: isUk ? "Переплата" : "Total interest", val: fmt(totalInterest) },
            ].map((r) => (
              <div key={r.label} className="bg-slate-800 rounded-2xl p-4 text-center">
                <div className="text-indigo-400 font-bold text-xl">{r.val}</div>
                <div className="text-slate-400 text-xs mt-1">{r.label}</div>
              </div>
            ))}
          </div>

          <button className="w-full py-3.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors cursor-pointer">
            {isUk ? "Отримати консультацію" : "Get mortgage advice"}
          </button>
        </div>
      </section>

      {/* AGENTS */}
      <section id="agents" className="px-6 py-14 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{isUk ? "Наша команда" : "Our Team"}</h2>
          <p className="text-slate-500 mb-10">{isUk ? "Досвідчені агенти, яким можна довіряти" : "Experienced agents you can trust"}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {agents.map((a) => (
              <div key={a.nameEn} className="bg-slate-50 rounded-2xl p-6 text-center border border-slate-100 hover:border-indigo-200 transition-colors">
                <div className="text-5xl mb-3">{a.emoji}</div>
                <h3 className="font-bold text-slate-900 mb-0.5">{isUk ? a.name : a.nameEn}</h3>
                <p className="text-sm text-indigo-600 font-medium mb-4">{a.spec}</p>
                <div className="flex justify-center gap-4 text-sm text-slate-500 mb-5">
                  <span><span className="font-semibold text-slate-800">{a.deals}</span> {isUk ? "угод" : "deals"}</span>
                  <span><span className="font-semibold text-slate-800">{a.exp}</span> {isUk ? "р. досвіду" : "yr exp"}</span>
                </div>
                <button className="w-full py-2.5 border-2 border-indigo-600 text-indigo-600 rounded-xl text-sm font-semibold hover:bg-indigo-600 hover:text-white transition-colors cursor-pointer">
                  {isUk ? "Зв'язатись" : "Contact agent"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUATION */}
      <section id="valuation" className="px-6 py-14 bg-slate-50">
        <div className="max-w-xl mx-auto">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">{isUk ? "Безкоштовна оцінка нерухомості" : "Free property valuation"}</h2>
            <p className="text-slate-500 text-sm mb-7">{isUk ? "Отримайте реальну вартість вашого об'єкта від наших експертів" : "Get the real market value of your property from our experts"}</p>
            <div className="flex flex-col gap-4">
              <select className="px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-300">
                <option value="">{isUk ? "Тип нерухомості" : "Property type"}</option>
                <option>{isUk ? "Квартира" : "Apartment"}</option>
                <option>{isUk ? "Будинок" : "House"}</option>
                <option>{isUk ? "Комерційна" : "Commercial"}</option>
                <option>{isUk ? "Земля" : "Land"}</option>
              </select>
              <input className="px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" placeholder={isUk ? "Площа, м²" : "Area, m²"} />
              <select className="px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-300">
                <option value="">{isUk ? "Район" : "District"}</option>
                {Object.entries(districtLabels).map(([key, val]) => (
                  <option key={key} value={key}>{isUk ? val.uk : val.en}</option>
                ))}
              </select>
              <input className="px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" placeholder={isUk ? "Ваше ім'я" : "Your name"} />
              <input className="px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" placeholder={isUk ? "Телефон" : "Phone number"} />
              <button className="py-3.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors cursor-pointer">
                {isUk ? "Отримати оцінку" : "Get Valuation"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ backgroundColor: "#0F172A" }} className="px-6 py-10">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-8 justify-between items-start">
          <div>
            <div className="text-white font-bold text-lg mb-2">🏢 EstateUA</div>
            <p className="text-slate-400 text-sm mb-1">{isUk ? "Київ, Інститутська 24" : "Kyiv, Instytutska 24"}</p>
            <p className="text-slate-400 text-sm mb-1">+380 44 123-45-67</p>
            <p className="text-slate-400 text-sm">info@estateua.com</p>
          </div>
          <div className="flex flex-col gap-2 text-slate-400 text-sm">
            <a href="#properties" className="hover:text-white transition-colors">{isUk ? "Об'єкти" : "Properties"}</a>
            <a href="#agents" className="hover:text-white transition-colors">{isUk ? "Команда" : "Team"}</a>
            <a href="#calculator" className="hover:text-white transition-colors">{isUk ? "Калькулятор" : "Calculator"}</a>
            <a href="#valuation" className="hover:text-white transition-colors">{isUk ? "Оцінка" : "Valuation"}</a>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 border border-slate-700 rounded-xl">
            <span className="text-green-400 text-lg">✓</span>
            <span className="text-slate-300 text-xs">{isUk ? "Ліцензія АМКУ №4821" : "License AMCU #4821"}</span>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-slate-800 text-slate-600 text-xs text-center">
          © 2024 EstateUA. {isUk ? "Всі права захищено." : "All rights reserved."}
        </div>
      </footer>

    </div>
  );
}
