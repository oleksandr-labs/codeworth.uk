"use client";

import { useState } from "react";

const STYLES = [
  { id: 1, tab: "haircuts", nameUk: "Fade з текстурою", nameEn: "Textured Fade", time: "45 хв / 45 min", price: 350, beforeEmoji: "🧔", afterEmoji: "💈" },
  { id: 2, tab: "haircuts", nameUk: "Класична стрижка", nameEn: "Classic Cut", time: "40 хв / 40 min", price: 280, beforeEmoji: "👦", afterEmoji: "🤵" },
  { id: 3, tab: "haircuts", nameUk: "Undercut", nameEn: "Undercut", time: "50 хв / 50 min", price: 380, beforeEmoji: "🧒", afterEmoji: "😎" },
  { id: 4, tab: "haircuts", nameUk: "Crew cut", nameEn: "Crew Cut", time: "35 хв / 35 min", price: 250, beforeEmoji: "👦", afterEmoji: "💼" },
  { id: 5, tab: "beard", nameUk: "Моделювання бороди", nameEn: "Beard Design", time: "40 хв / 40 min", price: 320, beforeEmoji: "🧔‍♂️", afterEmoji: "🤴" },
  { id: 6, tab: "beard", nameUk: "Королівство гоління", nameEn: "Royal Shave", time: "60 хв / 60 min", price: 450, beforeEmoji: "😐", afterEmoji: "✨" },
  { id: 7, tab: "beard", nameUk: "Стрижка бороди", nameEn: "Beard Trim", time: "25 хв / 25 min", price: 180, beforeEmoji: "🧔", afterEmoji: "👔" },
  { id: 8, tab: "combo", nameUk: "Стрижка + Борода", nameEn: "Haircut + Beard", time: "75 хв / 75 min", price: 550, beforeEmoji: "🧔‍♂️", afterEmoji: "🤵" },
  { id: 9, tab: "combo", nameUk: "Fade + Борода + Догляд", nameEn: "Fade + Beard + Care", time: "90 хв / 90 min", price: 720, beforeEmoji: "👦", afterEmoji: "🤴" },
  { id: 10, tab: "classic", nameUk: "Консервативна стрижка", nameEn: "Conservative Cut", time: "40 хв / 40 min", price: 300, beforeEmoji: "👴", afterEmoji: "👨‍💼" },
  { id: 11, tab: "classic", nameUk: "Прямий пробір", nameEn: "Side Part", time: "45 хв / 45 min", price: 320, beforeEmoji: "🙎‍♂️", afterEmoji: "🧑‍💼" },
  { id: 12, tab: "modern", nameUk: "Texturized Quiff", nameEn: "Texturized Quiff", time: "55 хв / 55 min", price: 420, beforeEmoji: "👦", afterEmoji: "🌟" },
  { id: 13, tab: "modern", nameUk: "French Crop", nameEn: "French Crop", time: "40 хв / 40 min", price: 350, beforeEmoji: "🧒", afterEmoji: "😏" },
  { id: 14, tab: "modern", nameUk: "Caesar Cut", nameEn: "Caesar Cut", time: "35 хв / 35 min", price: 280, beforeEmoji: "👦", afterEmoji: "⚡" },
  { id: 15, tab: "modern", nameUk: "Buzz + Fade", nameEn: "Buzz + Fade", time: "30 хв / 30 min", price: 240, beforeEmoji: "🙂", afterEmoji: "🔥" },
];

const BARBERS = [
  { id: 1, emoji: "✂️", nameUk: "Олексій Гордієнко", nameEn: "Oleksii Hordiienko", specUk: "Fade · Beard · Modern", specEn: "Fade · Beard · Modern", expUk: "8 років", expEn: "8 years", rating: 4.9, reviews: 312 },
  { id: 2, emoji: "💈", nameUk: "Дмитро Савченко", nameEn: "Dmytro Savchenko", specUk: "Classic · Side part", specEn: "Classic · Side part", expUk: "12 років", expEn: "12 years", rating: 5.0, reviews: 198 },
  { id: 3, emoji: "✂️", nameUk: "Ярослав Мороз", nameEn: "Yaroslav Moroz", specUk: "Royal Shave · Combo", specEn: "Royal Shave · Combo", expUk: "6 років", expEn: "6 years", rating: 4.8, reviews: 245 },
  { id: 4, emoji: "💈", nameUk: "Артем Петренко", nameEn: "Artem Petrenko", specUk: "Texture · Quiff", specEn: "Texture · Quiff", expUk: "5 років", expEn: "5 years", rating: 4.9, reviews: 167 },
  { id: 5, emoji: "✂️", nameUk: "Іван Коваленко", nameEn: "Ivan Kovalenko", specUk: "Beard design · Fade", specEn: "Beard design · Fade", expUk: "9 років", expEn: "9 years", rating: 4.8, reviews: 289 },
  { id: 6, emoji: "💈", nameUk: "Сашко Бондаренко", nameEn: "Sashko Bondarenko", specUk: "Buzz · Crop", specEn: "Buzz · Crop", expUk: "4 роки", expEn: "4 years", rating: 4.7, reviews: 134 },
];

const REVIEWS = [
  { nameUk: "Андрій К.", nameEn: "Andrii K.", textUk: "Олексій зробив ідеальний fade — рівний та природний. Записуюсь тільки до нього.", textEn: "Oleksii made a perfect fade — clean and natural. Book him exclusively now.", rating: 5, serviceUk: "Fade + Борода", serviceEn: "Fade + Beard" },
  { nameUk: "Максим Т.", nameEn: "Maksym T.", textUk: "Королівство гоління — реально розкіш. Гаряче рушник, кремова піна, бритва. Рекомендую.", textEn: "Royal shave is genuinely luxurious. Hot towel, creamy foam, straight razor. Must try.", rating: 5, serviceUk: "Королівство гоління", serviceEn: "Royal Shave" },
  { nameUk: "Ілля С.", nameEn: "Illia S.", textUk: "Атмосфера — половина задоволення. Інтер'єр, музика, кава. Приходжу щотижня.", textEn: "The atmosphere is half the pleasure. Interior, music, coffee. Come weekly.", rating: 5, serviceUk: "Класична стрижка", serviceEn: "Classic Cut" },
  { nameUk: "Євген Р.", nameEn: "Yevhen R.", textUk: "Дмитро — майстер класики. Пробір ідеальний, вкладка тримає весь день.", textEn: "Dmytro is a classic master. Side part perfect, hold lasts all day.", rating: 5, serviceUk: "Side Part", serviceEn: "Side Part" },
  { nameUk: "Роман В.", nameEn: "Roman V.", textUk: "Loyalty card — чудова ідея. Вже 4 штампи, наступного разу безкоштовна стрижка!", textEn: "Loyalty card is a great idea. 4 stamps already, next visit is free!", rating: 5, serviceUk: "Стрижка + Борода", serviceEn: "Haircut + Beard" },
];

const STYLE_TABS = [
  { key: "haircuts", labelEn: "Haircuts", labelUk: "Стрижки" },
  { key: "beard", labelEn: "Beard", labelUk: "Борода" },
  { key: "combo", labelEn: "Combo", labelUk: "Комбо" },
  { key: "classic", labelEn: "Classic", labelUk: "Класика" },
  { key: "modern", labelEn: "Modern", labelUk: "Сучасне" },
];

const SERVICES = [
  { keyEn: "Haircut", keyUk: "Стрижка", priceLabel: "from 250₴ / від 250₴" },
  { keyEn: "Beard", keyUk: "Борода", priceLabel: "from 180₴ / від 180₴" },
  { keyEn: "Haircut + Beard", keyUk: "Стрижка + Борода", priceLabel: "from 450₴ / від 450₴" },
  { keyEn: "Royal Shave", keyUk: "Королівство гоління", priceLabel: "450₴" },
];

const DATE_OPTIONS = ["Tomorrow / Завтра", "+2 days / +2 дні", "+3 days / +3 дні"];
const TIME_SLOTS = ["10:00", "11:00", "13:00", "15:00", "17:00", "18:00"];
const BUSY_SLOTS = ["11:00", "17:00"];

function StarRating({ rating, color = "#C8A96E" }: { rating: number; color?: string }) {
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} style={{ color: s <= Math.round(rating) ? color : "#4a4040", fontSize: "0.75rem" }}>★</span>
      ))}
    </span>
  );
}

function SimpleQR() {
  const grid = Array.from({ length: 7 }, (_, r) =>
    Array.from({ length: 7 }, (_, c) => {
      if ((r < 2 && c < 2) || (r < 2 && c > 4) || (r > 4 && c < 2)) return true;
      if (r === 3 && c % 2 === 0) return true;
      if (c === 3 && r % 2 === 0) return true;
      return Math.random() > 0.55;
    })
  );
  return (
    <div className="inline-flex flex-col gap-0.5 p-2 rounded" style={{ background: "#F2EDE4" }}>
      {grid.map((row, r) => (
        <div key={r} className="flex gap-0.5">
          {row.map((filled, c) => (
            <div key={c} style={{ width: 6, height: 6, background: filled ? "#141010" : "transparent", borderRadius: 1 }} />
          ))}
        </div>
      ))}
    </div>
  );
}

export function LordCutDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [activeStyleTab, setActiveStyleTab] = useState("haircuts");
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedService, setSelectedService] = useState("");
  const [selectedBarber, setSelectedBarber] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [bookingDone, setBookingDone] = useState(false);
  const [loyaltyStamps, setLoyaltyStamps] = useState(2);

  const filteredStyles = STYLES.filter((s) => s.tab === activeStyleTab);

  function handleBookNow() {
    const el = document.getElementById("booking");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  function handleSelectStyle(style: typeof STYLES[0]) {
    setSelectedService(isUk ? style.nameUk : style.nameEn);
    setBookingStep(1);
    const el = document.getElementById("booking");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  function handleConfirm() {
    if (clientName.trim() && clientPhone.trim()) {
      setBookingDone(true);
    }
  }

  function resetBooking() {
    setBookingStep(1);
    setSelectedService("");
    setSelectedBarber(null);
    setSelectedDate("");
    setSelectedTime("");
    setClientName("");
    setClientPhone("");
    setBookingDone(false);
  }

  function addStamp() {
    if (loyaltyStamps < 5) setLoyaltyStamps((n) => n + 1);
  }

  const selectedBarberData = BARBERS.find((b) => b.id === selectedBarber);

  return (
    <div style={{ background: "#141010", color: "#F2EDE4", fontFamily: "Georgia, serif", minHeight: "100vh" }}>

      {/* NAV */}
      <nav style={{ background: "#141010", borderBottom: "1px solid #2a2020" }} className="sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-serif text-xl font-bold tracking-wide" style={{ color: "#F2EDE4" }}>
            ✂️ Lord &amp; Cut
          </span>
          <div className="hidden md:flex items-center gap-6 text-sm" style={{ color: "#b0a898" }}>
            <a href="#styles" style={{ color: "#b0a898", textDecoration: "none" }} className="hover:text-[#F2EDE4] transition-colors">
              {isUk ? "Стилі" : "Styles"}
            </a>
            <a href="#barbers" style={{ color: "#b0a898", textDecoration: "none" }} className="hover:text-[#F2EDE4] transition-colors">
              {isUk ? "Барбери" : "Barbers"}
            </a>
            <a href="#booking" style={{ color: "#b0a898", textDecoration: "none" }} className="hover:text-[#F2EDE4] transition-colors">
              {isUk ? "Записатись" : "Book"}
            </a>
            <button
              onClick={handleBookNow}
              className="px-4 py-2 rounded text-sm font-semibold transition-opacity hover:opacity-80"
              style={{ background: "#8B5E3C", color: "#F2EDE4" }}
            >
              {isUk ? "Записатись" : "Book Now"}
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ background: "linear-gradient(135deg, #141010 0%, #1C1010 50%, #141010 100%)", borderBottom: "1px solid #2a2020" }} className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-3 text-xs tracking-[0.3em] uppercase" style={{ color: "#8B5E3C" }}>
            — Premium Barbershop —
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-bold italic mb-6 leading-tight" style={{ color: "#F2EDE4" }}>
            {isUk ? "Стиль — це звичка. Зроби її правильно." : "Style is a habit. Make it right."}
          </h1>
          <p className="text-lg mb-10" style={{ color: "#b0a898" }}>
            {isUk ? "Стрижки · Гоління · Борода · Дніпро" : "Haircuts · Shaving · Beard care · Dnipro"}
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <button
              onClick={handleBookNow}
              className="px-8 py-3 rounded font-semibold text-base transition-opacity hover:opacity-80"
              style={{ background: "#8B5E3C", color: "#F2EDE4" }}
            >
              {isUk ? "Записатись" : "Book Now"}
            </button>
            <a
              href="#styles"
              className="px-8 py-3 rounded font-semibold text-base transition-opacity hover:opacity-80 inline-block"
              style={{ border: "1.5px solid #F2EDE4", color: "#F2EDE4", textDecoration: "none" }}
            >
              {isUk ? "Наші роботи" : "Our Work"}
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { val: isUk ? "6 барберів" : "6 barbers", label: isUk ? "Майстри" : "Masters" },
              { val: "3,000+", label: isUk ? "Клієнтів" : "Clients" },
              { val: "4.9★", label: isUk ? "Рейтинг" : "Rating" },
              { val: isUk ? "З 2015" : "Since 2015", label: isUk ? "Досвід" : "Experience" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-serif text-2xl font-bold mb-1" style={{ color: "#C8A96E" }}>{stat.val}</div>
                <div className="text-xs tracking-wider uppercase" style={{ color: "#7a6a5a" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STYLE CATALOG */}
      <section id="styles" className="py-16 px-6" style={{ background: "#141010" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: "#8B5E3C" }}>— Catalog —</div>
            <h2 className="font-serif text-3xl font-bold" style={{ color: "#F2EDE4" }}>
              {isUk ? "Стилі та послуги" : "Styles & Services"}
            </h2>
          </div>
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {STYLE_TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveStyleTab(tab.key)}
                className="px-5 py-2 rounded text-sm font-semibold transition-all"
                style={{
                  background: activeStyleTab === tab.key ? "#8B5E3C" : "#1C1818",
                  color: activeStyleTab === tab.key ? "#F2EDE4" : "#9a8878",
                  border: activeStyleTab === tab.key ? "1px solid #8B5E3C" : "1px solid #2a2020",
                }}
              >
                {isUk ? tab.labelUk : tab.labelEn}
              </button>
            ))}
          </div>
          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredStyles.map((style) => (
              <div
                key={style.id}
                className="rounded-xl overflow-hidden"
                style={{ background: "#1C1818", border: "1px solid #2e2626" }}
              >
                {/* Before / After */}
                <div className="flex h-24">
                  <div className="flex-1 flex flex-col items-center justify-center gap-1" style={{ background: "#161212", borderRight: "1px solid #2e2626" }}>
                    <span style={{ fontSize: "2rem", filter: "grayscale(100%)", opacity: 0.6 }}>{style.beforeEmoji}</span>
                    <span className="text-xs" style={{ color: "#5a4a3a" }}>Before</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center justify-center gap-1" style={{ background: "#1C1818" }}>
                    <span style={{ fontSize: "2rem" }}>{style.afterEmoji}</span>
                    <span className="text-xs" style={{ color: "#C8A96E" }}>After</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-serif font-bold text-sm mb-2" style={{ color: "#F2EDE4" }}>
                    {isUk ? style.nameUk : style.nameEn}
                  </h3>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs px-2 py-0.5 rounded" style={{ background: "#241e1e", color: "#8B5E3C" }}>
                      {style.time.split(" / ")[isUk ? 0 : 1]}
                    </span>
                    <span className="font-bold text-sm" style={{ color: "#C8A96E" }}>{style.price}₴</span>
                  </div>
                  <button
                    onClick={() => handleSelectStyle(style)}
                    className="w-full py-1.5 rounded text-xs font-semibold transition-opacity hover:opacity-80"
                    style={{ background: "#2a1e14", color: "#C8A96E", border: "1px solid #3a2a1a" }}
                  >
                    {isUk ? "Обрати цей стиль" : "Choose this style"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BARBERS */}
      <section id="barbers" className="py-16 px-6" style={{ background: "#111010", borderTop: "1px solid #2a2020" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: "#8B5E3C" }}>— Masters —</div>
            <h2 className="font-serif text-3xl font-bold" style={{ color: "#F2EDE4" }}>
              {isUk ? "Наші барбери" : "Our Barbers"}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BARBERS.map((barber) => (
              <div
                key={barber.id}
                className="rounded-xl p-5"
                style={{ background: "#1C1818", border: "1px solid #2e2626" }}
              >
                <div className="flex items-center gap-4 mb-3">
                  <div
                    className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                    style={{ background: "#2a1e14", border: "2px solid #8B5E3C" }}
                  >
                    {barber.emoji}
                  </div>
                  <div>
                    <div className="font-serif font-bold text-base" style={{ color: "#F2EDE4" }}>
                      {isUk ? barber.nameUk : barber.nameEn}
                    </div>
                    <div className="text-xs" style={{ color: "#8B5E3C" }}>
                      {isUk ? barber.specUk : barber.specEn}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs px-2 py-0.5 rounded" style={{ background: "#241e1e", color: "#9a8878" }}>
                    {isUk ? barber.expUk : barber.expEn}
                  </span>
                  <div className="flex items-center gap-1">
                    <StarRating rating={barber.rating} />
                    <span className="text-xs ml-1" style={{ color: "#7a6a5a" }}>({barber.reviews})</span>
                  </div>
                </div>
                <div className="text-xs mb-3" style={{ color: "#5a5050" }}>
                  {isUk ? "Найближчий час: сьогодні 15:00" : "Next available: Today 15:00"}
                </div>
                <button
                  onClick={() => { setSelectedBarber(barber.id); setBookingStep(1); handleBookNow(); }}
                  className="w-full py-2 rounded text-xs font-semibold transition-opacity hover:opacity-80"
                  style={{ background: "#8B5E3C", color: "#F2EDE4" }}
                >
                  {isUk ? "Записатись" : "Book"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section id="booking" className="py-16 px-6" style={{ background: "#141010", borderTop: "1px solid #2a2020" }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: "#8B5E3C" }}>— Reserve —</div>
            <h2 className="font-serif text-3xl font-bold" style={{ color: "#F2EDE4" }}>
              {isUk ? "Онлайн-запис" : "Online Booking"}
            </h2>
          </div>

          {bookingDone ? (
            <div className="rounded-2xl p-10 text-center" style={{ background: "#1C1818", border: "1px solid #8B5E3C" }}>
              <div className="text-5xl mb-4">✂️</div>
              <h3 className="font-serif text-2xl font-bold mb-3" style={{ color: "#C8A96E" }}>
                {isUk ? "Запис підтверджено!" : "Booking Confirmed!"}
              </h3>
              <div className="text-sm mb-6 space-y-1" style={{ color: "#b0a898" }}>
                <div>{isUk ? "Послуга:" : "Service:"} <span style={{ color: "#F2EDE4" }}>{selectedService}</span></div>
                {selectedBarberData && (
                  <div>{isUk ? "Барбер:" : "Barber:"} <span style={{ color: "#F2EDE4" }}>{isUk ? selectedBarberData.nameUk : selectedBarberData.nameEn}</span></div>
                )}
                <div>{isUk ? "Дата:" : "Date:"} <span style={{ color: "#F2EDE4" }}>{selectedDate}</span></div>
                <div>{isUk ? "Час:" : "Time:"} <span style={{ color: "#F2EDE4" }}>{selectedTime}</span></div>
                <div>{isUk ? "Ім'я:" : "Name:"} <span style={{ color: "#F2EDE4" }}>{clientName}</span></div>
              </div>
              <p className="text-xs mb-6" style={{ color: "#6a5a4a" }}>
                {isUk ? "Ми надішлемо нагадування на ваш номер." : "We'll send a reminder to your phone."}
              </p>
              <button
                onClick={resetBooking}
                className="px-6 py-2 rounded text-sm font-semibold transition-opacity hover:opacity-80"
                style={{ background: "#2a1e14", color: "#C8A96E", border: "1px solid #3a2a1a" }}
              >
                {isUk ? "Новий запис" : "New booking"}
              </button>
            </div>
          ) : (
            <div className="rounded-2xl overflow-hidden" style={{ background: "#1C1818", border: "1px solid #2e2626" }}>
              {/* Step indicators */}
              <div className="flex" style={{ borderBottom: "1px solid #2e2626" }}>
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className="flex-1 py-3 text-center text-xs font-semibold"
                    style={{
                      background: bookingStep === step ? "#8B5E3C" : bookingStep > step ? "#2a1e14" : "transparent",
                      color: bookingStep === step ? "#F2EDE4" : bookingStep > step ? "#C8A96E" : "#5a4a3a",
                      borderRight: step < 4 ? "1px solid #2e2626" : "none",
                    }}
                  >
                    {step}. {isUk
                      ? ["Послуга", "Барбер", "Час", "Дані"][step - 1]
                      : ["Service", "Barber", "Time", "Info"][step - 1]}
                  </div>
                ))}
              </div>

              <div className="p-6">
                {/* Step 1: Service */}
                {bookingStep === 1 && (
                  <div>
                    <h3 className="font-serif text-lg mb-4" style={{ color: "#F2EDE4" }}>
                      {isUk ? "Оберіть послугу" : "Choose a service"}
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                      {SERVICES.map((svc) => (
                        <button
                          key={svc.keyEn}
                          onClick={() => setSelectedService(isUk ? svc.keyUk : svc.keyEn)}
                          className="flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all"
                          style={{
                            background: selectedService === (isUk ? svc.keyUk : svc.keyEn) ? "#2a1e14" : "#221c1c",
                            border: selectedService === (isUk ? svc.keyUk : svc.keyEn) ? "1px solid #8B5E3C" : "1px solid #2e2626",
                            color: "#F2EDE4",
                          }}
                        >
                          <span className="font-semibold text-sm">{isUk ? svc.keyUk : svc.keyEn}</span>
                          <span className="text-xs" style={{ color: "#C8A96E" }}>{svc.priceLabel.split(" / ")[isUk ? 1 : 0] || svc.priceLabel}</span>
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => selectedService && setBookingStep(2)}
                      disabled={!selectedService}
                      className="mt-5 w-full py-3 rounded-lg font-semibold text-sm transition-opacity"
                      style={{ background: selectedService ? "#8B5E3C" : "#2a1e14", color: "#F2EDE4", opacity: selectedService ? 1 : 0.5 }}
                    >
                      {isUk ? "Далі →" : "Next →"}
                    </button>
                  </div>
                )}

                {/* Step 2: Barber */}
                {bookingStep === 2 && (
                  <div>
                    <h3 className="font-serif text-lg mb-4" style={{ color: "#F2EDE4" }}>
                      {isUk ? "Оберіть барбера" : "Choose a barber"}
                    </h3>
                    <button
                      onClick={() => setSelectedBarber(null)}
                      className="w-full mb-3 py-2 rounded-lg text-sm font-semibold transition-all"
                      style={{
                        background: selectedBarber === null ? "#2a1e14" : "#221c1c",
                        border: selectedBarber === null ? "1px solid #8B5E3C" : "1px solid #2e2626",
                        color: "#F2EDE4",
                      }}
                    >
                      {isUk ? "Будь-який барбер" : "Any barber"}
                    </button>
                    <div className="grid grid-cols-2 gap-2 mb-5">
                      {BARBERS.map((barber) => (
                        <button
                          key={barber.id}
                          onClick={() => setSelectedBarber(barber.id)}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-all"
                          style={{
                            background: selectedBarber === barber.id ? "#2a1e14" : "#221c1c",
                            border: selectedBarber === barber.id ? "1px solid #8B5E3C" : "1px solid #2e2626",
                          }}
                        >
                          <span style={{ fontSize: "1.2rem" }}>{barber.emoji}</span>
                          <div>
                            <div className="text-xs font-semibold" style={{ color: "#F2EDE4" }}>
                              {isUk ? barber.nameUk.split(" ")[0] : barber.nameEn.split(" ")[0]}
                            </div>
                            <div className="text-xs" style={{ color: "#C8A96E" }}>{barber.rating}★</div>
                          </div>
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => setBookingStep(1)} className="flex-1 py-2 rounded-lg text-sm font-semibold" style={{ background: "#221c1c", color: "#9a8878", border: "1px solid #2e2626" }}>
                        ← {isUk ? "Назад" : "Back"}
                      </button>
                      <button onClick={() => setBookingStep(3)} className="flex-1 py-2 rounded-lg text-sm font-semibold transition-opacity hover:opacity-80" style={{ background: "#8B5E3C", color: "#F2EDE4" }}>
                        {isUk ? "Далі →" : "Next →"}
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Date & Time */}
                {bookingStep === 3 && (
                  <div>
                    <h3 className="font-serif text-lg mb-4" style={{ color: "#F2EDE4" }}>
                      {isUk ? "Оберіть дату та час" : "Choose date & time"}
                    </h3>
                    <div className="mb-5">
                      <div className="text-xs uppercase tracking-wider mb-2" style={{ color: "#7a6a5a" }}>{isUk ? "Дата" : "Date"}</div>
                      <div className="flex gap-2">
                        {DATE_OPTIONS.map((d) => {
                          const label = isUk ? d.split(" / ")[1] : d.split(" / ")[0];
                          return (
                            <button
                              key={d}
                              onClick={() => setSelectedDate(label)}
                              className="flex-1 py-2 rounded-lg text-xs font-semibold transition-all"
                              style={{
                                background: selectedDate === label ? "#8B5E3C" : "#221c1c",
                                color: selectedDate === label ? "#F2EDE4" : "#9a8878",
                                border: selectedDate === label ? "1px solid #8B5E3C" : "1px solid #2e2626",
                              }}
                            >
                              {label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <div className="mb-5">
                      <div className="text-xs uppercase tracking-wider mb-2" style={{ color: "#7a6a5a" }}>{isUk ? "Час" : "Time"}</div>
                      <div className="grid grid-cols-3 gap-2">
                        {TIME_SLOTS.map((slot) => {
                          const busy = BUSY_SLOTS.includes(slot);
                          return (
                            <button
                              key={slot}
                              onClick={() => !busy && setSelectedTime(slot)}
                              disabled={busy}
                              className="py-2 rounded-lg text-sm font-semibold transition-all"
                              style={{
                                background: selectedTime === slot ? "#8B5E3C" : busy ? "#1a1616" : "#221c1c",
                                color: selectedTime === slot ? "#F2EDE4" : busy ? "#3a3030" : "#9a8878",
                                border: selectedTime === slot ? "1px solid #8B5E3C" : "1px solid #2e2626",
                                cursor: busy ? "not-allowed" : "pointer",
                                textDecoration: busy ? "line-through" : "none",
                              }}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                      <div className="mt-2 text-xs" style={{ color: "#5a4a3a" }}>
                        {isUk ? "Сірі слоти — зайняті" : "Gray slots — unavailable"}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => setBookingStep(2)} className="flex-1 py-2 rounded-lg text-sm font-semibold" style={{ background: "#221c1c", color: "#9a8878", border: "1px solid #2e2626" }}>
                        ← {isUk ? "Назад" : "Back"}
                      </button>
                      <button
                        onClick={() => selectedDate && selectedTime && setBookingStep(4)}
                        disabled={!selectedDate || !selectedTime}
                        className="flex-1 py-2 rounded-lg text-sm font-semibold transition-opacity"
                        style={{ background: "#8B5E3C", color: "#F2EDE4", opacity: selectedDate && selectedTime ? 1 : 0.5 }}
                      >
                        {isUk ? "Далі →" : "Next →"}
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 4: Contact Info */}
                {bookingStep === 4 && (
                  <div>
                    <h3 className="font-serif text-lg mb-4" style={{ color: "#F2EDE4" }}>
                      {isUk ? "Ваші дані" : "Your details"}
                    </h3>
                    <div className="space-y-4 mb-5">
                      <div>
                        <label className="block text-xs mb-1" style={{ color: "#7a6a5a" }}>
                          {isUk ? "Ім'я" : "Name"}
                        </label>
                        <input
                          type="text"
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          placeholder={isUk ? "Ваше ім'я" : "Your name"}
                          className="w-full px-4 py-2 rounded-lg text-sm outline-none"
                          style={{ background: "#221c1c", border: "1px solid #2e2626", color: "#F2EDE4" }}
                        />
                      </div>
                      <div>
                        <label className="block text-xs mb-1" style={{ color: "#7a6a5a" }}>
                          {isUk ? "Телефон" : "Phone"}
                        </label>
                        <input
                          type="tel"
                          value={clientPhone}
                          onChange={(e) => setClientPhone(e.target.value)}
                          placeholder="+380 __"
                          className="w-full px-4 py-2 rounded-lg text-sm outline-none"
                          style={{ background: "#221c1c", border: "1px solid #2e2626", color: "#F2EDE4" }}
                        />
                      </div>
                    </div>
                    {/* Summary */}
                    <div className="rounded-lg p-4 mb-5 text-sm space-y-1" style={{ background: "#1a1414", border: "1px solid #2a2020" }}>
                      <div style={{ color: "#7a6a5a" }}>{isUk ? "Послуга:" : "Service:"} <span style={{ color: "#F2EDE4" }}>{selectedService}</span></div>
                      <div style={{ color: "#7a6a5a" }}>{isUk ? "Дата:" : "Date:"} <span style={{ color: "#F2EDE4" }}>{selectedDate}</span></div>
                      <div style={{ color: "#7a6a5a" }}>{isUk ? "Час:" : "Time:"} <span style={{ color: "#F2EDE4" }}>{selectedTime}</span></div>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => setBookingStep(3)} className="flex-1 py-2 rounded-lg text-sm font-semibold" style={{ background: "#221c1c", color: "#9a8878", border: "1px solid #2e2626" }}>
                        ← {isUk ? "Назад" : "Back"}
                      </button>
                      <button
                        onClick={handleConfirm}
                        disabled={!clientName.trim() || !clientPhone.trim()}
                        className="flex-1 py-2 rounded-lg text-sm font-semibold transition-opacity hover:opacity-80"
                        style={{ background: "#8B5E3C", color: "#F2EDE4", opacity: clientName.trim() && clientPhone.trim() ? 1 : 0.5 }}
                      >
                        {isUk ? "Підтвердити ✓" : "Confirm ✓"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* LOYALTY CARD */}
      <section className="py-16 px-6" style={{ background: "#0e0c0c", borderTop: "1px solid #2a2020" }}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: "#8B5E3C" }}>— Members —</div>
          <h2 className="font-serif text-3xl font-bold mb-2" style={{ color: "#F2EDE4" }}>Lord &amp; Cut Club</h2>
          <p className="text-sm mb-8" style={{ color: "#7a6a5a" }}>
            {isUk ? "5 відвідувань → 1 безкоштовна стрижка" : "5 visits → 1 free haircut"}
          </p>
          <div className="rounded-2xl p-8 mx-auto max-w-sm mb-6" style={{ background: "#1C1818", border: "2px solid #3a2a1a" }}>
            <div className="flex items-center justify-between mb-6">
              <span className="font-serif font-bold text-lg" style={{ color: "#C8A96E" }}>✂️ Lord &amp; Cut</span>
              <SimpleQR />
            </div>
            <div className="flex justify-center gap-3 mb-4">
              {[1, 2, 3, 4, 5].map((stamp) => (
                <div
                  key={stamp}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold"
                  style={{
                    background: stamp <= loyaltyStamps ? "#8B5E3C" : "#241e1e",
                    border: stamp <= loyaltyStamps ? "2px solid #C8A96E" : "2px solid #2e2626",
                    color: stamp <= loyaltyStamps ? "#F2EDE4" : "#3a3030",
                  }}
                >
                  {stamp <= loyaltyStamps ? "✂️" : stamp}
                </div>
              ))}
            </div>
            <div className="text-xs mb-4" style={{ color: "#7a6a5a" }}>
              {loyaltyStamps}/5 {isUk ? "відвідувань" : "visits"}
            </div>
            {loyaltyStamps >= 5 ? (
              <div className="font-serif font-bold" style={{ color: "#C8A96E" }}>
                🎉 {isUk ? "Безкоштовна стрижка зароблена!" : "Free haircut earned!"}
              </div>
            ) : (
              <button
                onClick={addStamp}
                className="px-4 py-1.5 rounded text-xs font-semibold transition-opacity hover:opacity-80"
                style={{ background: "#2a1e14", color: "#C8A96E", border: "1px solid #3a2a1a" }}
              >
                + {isUk ? "Додати штамп (демо)" : "Add stamp (demo)"}
              </button>
            )}
          </div>
          <p className="text-sm font-semibold" style={{ color: "#C8A96E" }}>
            {isUk ? "Отримати картку — безкоштовно при першому візиті" : "Get your card — free at first visit"}
          </p>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-16 px-6" style={{ background: "#141010", borderTop: "1px solid #2a2020" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: "#8B5E3C" }}>— About —</div>
            <h2 className="font-serif text-3xl font-bold" style={{ color: "#F2EDE4" }}>
              {isUk ? "Про нас" : "About Us"}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div className="text-center">
              <div className="font-serif text-4xl font-bold mb-2" style={{ color: "#C8A96E" }}>
                {isUk ? "З 2015" : "Since 2015"}
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "#9a8878" }}>
                {isUk
                  ? "Дев'ять років ми вдосконалюємо майстерність, зберігаючи традиції класичного барберингу."
                  : "Nine years refining our craft, preserving the traditions of classic barbering."}
              </p>
            </div>
            <div className="text-center">
              <div className="font-serif text-4xl font-bold mb-2" style={{ color: "#C8A96E" }}>
                {isUk ? "Філософія" : "Philosophy"}
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "#9a8878" }}>
                {isUk
                  ? "Стрижка — це більше ніж послуга. Це ритуал, де деталі мають значення, а час — твій."
                  : "A haircut is more than a service. It's a ritual where details matter and the time is yours."}
              </p>
            </div>
            <div className="text-center">
              <div className="font-serif text-4xl font-bold mb-2" style={{ color: "#C8A96E" }}>
                {isUk ? "Команда" : "Team"}
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "#9a8878" }}>
                {isUk
                  ? "Шість майстрів, кожен з власним підходом. Разом — найкраще місце для справжнього чоловіка."
                  : "Six masters, each with their own approach. Together — the finest place for a real man."}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {["Wahl Professional", "Andis Certified", "BarberEVO Member"].map((cert) => (
              <span
                key={cert}
                className="px-4 py-2 rounded-full text-xs font-semibold"
                style={{ background: "#1C1818", border: "1px solid #3a2a1a", color: "#C8A96E" }}
              >
                {cert}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-16 px-6" style={{ background: "#0e0c0c", borderTop: "1px solid #2a2020" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: "#8B5E3C" }}>— Reviews —</div>
            <h2 className="font-serif text-3xl font-bold mb-2" style={{ color: "#F2EDE4" }}>
              {isUk ? "Що кажуть клієнти" : "What clients say"}
            </h2>
            <div className="flex items-center justify-center gap-2">
              <StarRating rating={5} />
              <span className="font-serif text-xl font-bold" style={{ color: "#C8A96E" }}>4.9</span>
              <span className="text-sm" style={{ color: "#7a6a5a" }}>/ 5.0</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {REVIEWS.map((review, i) => (
              <div
                key={i}
                className="rounded-xl p-6"
                style={{ background: "#1C1818", border: "1px solid #2e2626" }}
              >
                <div className="font-serif text-3xl mb-3" style={{ color: "#3a2a1a" }}>"</div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#b0a898" }}>
                  {isUk ? review.textUk : review.textEn}
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-serif font-bold text-sm" style={{ color: "#F2EDE4" }}>
                      {isUk ? review.nameUk : review.nameEn}
                    </div>
                    <div className="text-xs" style={{ color: "#8B5E3C" }}>
                      {isUk ? review.serviceUk : review.serviceEn}
                    </div>
                  </div>
                  <StarRating rating={review.rating} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#0a0808", borderTop: "1px solid #2a2020" }} className="py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-8">
            <div>
              <div className="font-serif text-2xl font-bold mb-2" style={{ color: "#F2EDE4" }}>✂️ Lord &amp; Cut</div>
              <div className="text-sm" style={{ color: "#7a6a5a" }}>
                {isUk ? "Преміум барбершоп · Дніпро" : "Premium Barbershop · Dnipro"}
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
              <div>
                <div className="font-semibold mb-2" style={{ color: "#9a8878" }}>{isUk ? "Адреса" : "Address"}</div>
                <div style={{ color: "#6a5a4a" }}>
                  {isUk ? "Дніпро, Гагаріна 12" : "Dnipro, Haharina 12"}
                </div>
              </div>
              <div>
                <div className="font-semibold mb-2" style={{ color: "#9a8878" }}>{isUk ? "Години" : "Hours"}</div>
                <div style={{ color: "#6a5a4a" }}>
                  <div>{isUk ? "Пн–Сб: 10:00–21:00" : "Mon–Sat: 10:00–21:00"}</div>
                  <div>{isUk ? "Нд: 10:00–19:00" : "Sun: 10:00–19:00"}</div>
                </div>
              </div>
              <div>
                <div className="font-semibold mb-2" style={{ color: "#9a8878" }}>{isUk ? "Посилання" : "Links"}</div>
                <div className="space-y-1">
                  {[
                    { href: "#styles", label: isUk ? "Стилі" : "Styles" },
                    { href: "#barbers", label: isUk ? "Барбери" : "Barbers" },
                    { href: "#booking", label: isUk ? "Запис" : "Book" },
                  ].map((link) => (
                    <div key={link.href}>
                      <a href={link.href} style={{ color: "#8B5E3C", textDecoration: "none" }} className="hover:text-[#C8A96E] transition-colors text-xs">
                        {link.label}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div style={{ borderTop: "1px solid #1e1a1a", paddingTop: "1.5rem", color: "#3a3030" }} className="text-center text-xs">
            © {new Date().getFullYear()} Lord &amp; Cut. {isUk ? "Всі права захищені." : "All rights reserved."}
          </div>
        </div>
      </footer>

    </div>
  );
}
