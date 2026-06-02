"use client";
import { useState } from "react";

const VILLAS = [
  {
    id: 1,
    name: { en: "Villa Carpathian Dream", uk: "Вілла Карпатська мрія" },
    region: { en: "Carpathians", uk: "Карпати" },
    regionKey: "carpathians",
    capacity: 8,
    bedrooms: 4,
    rating: 4.9,
    price: 8500,
    amenities: { sauna: true, pool: false, fireplace: true, pets: true },
    badge: { en: "Bestseller", uk: "Хіт продажів" },
    color: "#C4956A",
  },
  {
    id: 2,
    name: { en: "Green Hills Estate", uk: "Маєток Зелені Пагорби" },
    region: { en: "Carpathians", uk: "Карпати" },
    regionKey: "carpathians",
    capacity: 12,
    bedrooms: 6,
    rating: 4.8,
    price: 12000,
    amenities: { sauna: true, pool: true, fireplace: true, pets: false },
    badge: null,
    color: "#7A9B7A",
  },
  {
    id: 3,
    name: { en: "Kyiv River Retreat", uk: "Заміський відпочинок Київ" },
    region: { en: "Kyiv Region", uk: "Київська область" },
    regionKey: "kyiv",
    capacity: 6,
    bedrooms: 3,
    rating: 4.7,
    price: 6200,
    amenities: { sauna: false, pool: true, fireplace: false, pets: true },
    badge: null,
    color: "#8B7355",
  },
  {
    id: 4,
    name: { en: "Mountain Pine Lodge", uk: "Гірський сосновий будиночок" },
    region: { en: "Carpathians", uk: "Карпати" },
    regionKey: "carpathians",
    capacity: 10,
    bedrooms: 5,
    rating: 5.0,
    price: 11000,
    amenities: { sauna: true, pool: false, fireplace: true, pets: true },
    badge: { en: "Top Rated", uk: "Топ рейтинг" },
    color: "#6B8E6B",
  },
  {
    id: 5,
    name: { en: "Sunset Vineyard House", uk: "Будинок Заходу Сонця" },
    region: { en: "Kyiv Region", uk: "Київська область" },
    regionKey: "kyiv",
    capacity: 14,
    bedrooms: 7,
    rating: 4.6,
    price: 15000,
    amenities: { sauna: true, pool: true, fireplace: true, pets: false },
    badge: null,
    color: "#B8896A",
  },
  {
    id: 6,
    name: { en: "Forest Fairy Cottage", uk: "Лісова казкова садиба" },
    region: { en: "Carpathians", uk: "Карпати" },
    regionKey: "carpathians",
    capacity: 4,
    bedrooms: 2,
    rating: 4.9,
    price: 4800,
    amenities: { sauna: false, pool: false, fireplace: true, pets: true },
    badge: { en: "Cozy Pick", uk: "Затишний вибір" },
    color: "#9B7B5A",
  },
];

const REVIEWS = [
  {
    name: "Oksana M.",
    stars: 5,
    text: {
      en: "Absolutely magical stay! The villa exceeded all our expectations. Stunning views and top-notch amenities.",
      uk: "Незабутній відпочинок! Вілла перевершила всі очікування. Приголомшливі краєвиди та відмінні зручності.",
    },
    date: "February 2026",
  },
  {
    name: "Ivan K.",
    stars: 5,
    text: {
      en: "Perfect for our family reunion. 14 people, everyone comfortable. The sauna was a highlight!",
      uk: "Ідеально для нашої сімейної зустрічі. 14 людей, всім комфортно. Сауна — окрема насолода!",
    },
    date: "January 2026",
  },
  {
    name: "Maria S.",
    stars: 4,
    text: {
      en: "Beautiful property with great character. Loved the cozy fireplace evenings. Will definitely return.",
      uk: "Чудова садиба з особливою атмосферою. Вечори біля каміна незабутні. Обовʼязково повернемося.",
    },
    date: "December 2025",
  },
];

const VILLA_REVIEWS: Record<
  number,
  { name: string; stars: number; text: { en: string; uk: string } }[]
> = {
  1: [
    {
      name: "Andriy P.",
      stars: 5,
      text: {
        en: "The most beautiful villa in the Carpathians. Highly recommend!",
        uk: "Найкраща вілла в Карпатах. Дуже рекомендую!",
      },
    },
    {
      name: "Lena V.",
      stars: 5,
      text: {
        en: "Wonderful sauna and fireplace. We did not want to leave.",
        uk: "Чудова сауна та камін. Не хотілося їхати.",
      },
    },
    {
      name: "Serhiy M.",
      stars: 4,
      text: {
        en: "Great views, clean and well-maintained. Perfect weekend escape.",
        uk: "Гарні краєвиди, чисто та доглянуто. Чудовий відпочинок.",
      },
    },
  ],
};

const UNAVAILABLE_DAYS = [3, 4, 5, 12, 13, 18, 19, 20, 27, 28];

export function LaCasaDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [selectedVilla, setSelectedVilla] = useState<number | null>(null);
  const [filterRegion, setFilterRegion] = useState("all");
  const [filterGuests, setFilterGuests] = useState("all");
  const [filterSauna, setFilterSauna] = useState(false);
  const [filterPool, setFilterPool] = useState(false);
  const [filterFireplace, setFilterFireplace] = useState(false);
  const [filterPets, setFilterPets] = useState(false);
  const [checkIn, setCheckIn] = useState<number | null>(null);
  const [checkOut, setCheckOut] = useState<number | null>(null);
  const [guests, setGuests] = useState(4);
  const [pickingFor, setPickingFor] = useState<"in" | "out" | null>(null);

  const bg = "#F8F4EF";
  const accent = "#B87A5A";
  const green = "#5A7A5A";
  const dark = "#2A1F16";
  const card = "#FFFFFF";

  const t = {
    hero: isUk ? "Знайдіть свою ідеальну заміську садибу" : "Find Your Perfect Villa Retreat",
    heroSub: isUk
      ? "Преміальні вілли та котеджі по всій Україні"
      : "Premium villas and cottages across Ukraine",
    destination: isUk ? "Напрямок" : "Destination",
    checkIn: isUk ? "Заїзд" : "Check-in",
    checkOut: isUk ? "Виїзд" : "Check-out",
    guestsLabel: isUk ? "Гості" : "Guests",
    search: isUk ? "Шукати" : "Search",
    trust1: isUk ? "48 садиб" : "48 properties",
    trust2: isUk ? "4.9★ середній рейтинг" : "4.9★ avg rating",
    trust3: isUk ? "2 400+ бронювань" : "2,400+ bookings",
    filter: isUk ? "Фільтри" : "Filters",
    all: isUk ? "Всі" : "All",
    carpathians: isUk ? "Карпати" : "Carpathians",
    kyivRegion: isUk ? "Київська обл." : "Kyiv Region",
    sauna: isUk ? "Сауна" : "Sauna",
    pool: isUk ? "Басейн" : "Pool",
    fireplace: isUk ? "Камін" : "Fireplace",
    petsOk: isUk ? "З тваринами" : "Pets OK",
    priceFrom: isUk ? "від" : "from",
    night: isUk ? "ніч" : "night",
    capacity: isUk ? "до" : "up to",
    persons: isUk ? "ос." : "guests",
    viewVilla: isUk ? "Детальніше" : "View Villa",
    back: isUk ? "← Назад до каталогу" : "← Back to catalog",
    availability: isUk ? "Перевірка доступності та ціна" : "Availability & Price Calculator",
    selectCheckIn: isUk ? "Оберіть дату заїзду" : "Select check-in date",
    selectCheckOut: isUk ? "Оберіть дату виїзду" : "Select check-out date",
    nights: isUk ? "ночей" : "nights",
    pricePerNight: isUk ? "Ціна за ніч" : "Price per night",
    totalPrice: isUk ? "Всього" : "Total",
    book: isUk ? "Забронювати цю віллу" : "Book this villa",
    unavailable: isUk ? "Недоступно" : "Unavailable",
    amenities: isUk ? "Зручності" : "Amenities",
    houseRules: isUk ? "Правила будинку" : "House Rules",
    reviews: isUk ? "Відгуки" : "Reviews",
    description: isUk ? "Опис" : "Description",
    rule1: isUk ? "Заїзд після 15:00" : "Check-in after 15:00",
    rule2: isUk ? "Виїзд до 12:00" : "Check-out before 12:00",
    rule3: isUk ? "Без вечірок" : "No parties",
    rule4: isUk ? "Тиша після 22:00" : "Quiet after 22:00",
    guestReviews: isUk ? "Відгуки гостей" : "Guest Reviews",
    pickDate: isUk ? "Оберіть дату" : "Pick a date",
    cancelPick: isUk ? "Скасувати" : "Cancel",
    uah: "UAH",
  };

  const filteredVillas = VILLAS.filter((v) => {
    if (filterRegion !== "all" && v.regionKey !== filterRegion) return false;
    if (filterGuests !== "all") {
      const g = parseInt(filterGuests);
      if (filterGuests === "10+" && v.capacity < 10) return false;
      if (filterGuests !== "10+" && v.capacity < g) return false;
    }
    if (filterSauna && !v.amenities.sauna) return false;
    if (filterPool && !v.amenities.pool) return false;
    if (filterFireplace && !v.amenities.fireplace) return false;
    if (filterPets && !v.amenities.pets) return false;
    return true;
  });

  const villa = selectedVilla !== null ? VILLAS.find((v) => v.id === selectedVilla) : null;
  const nights =
    checkIn !== null && checkOut !== null && checkOut > checkIn ? checkOut - checkIn : null;
  const pricePerNight = villa ? villa.price : 0;
  const totalPrice = nights !== null ? nights * pricePerNight : null;

  const handleDayClick = (day: number) => {
    if (UNAVAILABLE_DAYS.includes(day)) return;
    if (pickingFor === "in") {
      setCheckIn(day);
      if (checkOut !== null && checkOut <= day) setCheckOut(null);
      setPickingFor(null);
    } else if (pickingFor === "out") {
      if (checkIn !== null && day <= checkIn) return;
      setCheckOut(day);
      setPickingFor(null);
    }
  };

  const pillStyle = (active: boolean): React.CSSProperties => ({
    padding: "6px 14px",
    borderRadius: "20px",
    border: `1.5px solid ${active ? accent : "#D4C4B4"}`,
    background: active ? accent : "transparent",
    color: active ? "#fff" : dark,
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: active ? 600 : 400,
    transition: "all 0.2s",
  });

  const checkboxStyle = (active: boolean): React.CSSProperties => ({
    padding: "6px 14px",
    borderRadius: "20px",
    border: `1.5px solid ${active ? green : "#D4C4B4"}`,
    background: active ? green : "transparent",
    color: active ? "#fff" : dark,
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: active ? 600 : 400,
    transition: "all 0.2s",
  });

  return (
    <div style={{ background: bg, color: dark, fontFamily: "Georgia, serif", minHeight: "100vh" }}>
      {/* HERO */}
      <div
        style={{
          background: `linear-gradient(135deg, ${dark} 0%, #4A3020 60%, #6B4C30 100%)`,
          padding: "48px 24px 40px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 70% 50%, rgba(184,122,90,0.18) 0%, transparent 70%)",
          }}
        />
        <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative" }}>
          <div
            style={{
              display: "inline-block",
              background: "rgba(184,122,90,0.25)",
              border: "1px solid rgba(184,122,90,0.5)",
              borderRadius: "20px",
              padding: "4px 16px",
              color: "#E8C9A8",
              fontSize: "12px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            La Casa
          </div>
          <h1
            style={{ color: "#F8F4EF", fontSize: "clamp(24px, 4vw, 38px)", fontWeight: 700, marginBottom: "8px" }}
          >
            {t.hero}
          </h1>
          <p style={{ color: "#C4A882", fontSize: "16px", marginBottom: "28px" }}>{t.heroSub}</p>

          {/* Search bar */}
          <div
            style={{
              background: "rgba(248,244,239,0.97)",
              borderRadius: "14px",
              padding: "16px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: "12px",
              alignItems: "end",
            }}
          >
            {[
              { label: t.destination, placeholder: isUk ? "Карпати, Київ..." : "Carpathians, Kyiv..." },
              { label: t.checkIn, placeholder: isUk ? "Дата заїзду" : "Check-in date" },
              { label: t.checkOut, placeholder: isUk ? "Дата виїзду" : "Check-out date" },
              { label: t.guestsLabel, placeholder: isUk ? "2 гості" : "2 guests" },
            ].map((f) => (
              <div key={f.label}>
                <div style={{ fontSize: "11px", color: "#8B6B4A", fontWeight: 600, marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  {f.label}
                </div>
                <input
                  readOnly
                  defaultValue={f.placeholder}
                  style={{
                    width: "100%",
                    border: "none",
                    borderBottom: `1.5px solid #D4C4B4`,
                    background: "transparent",
                    padding: "6px 0",
                    fontSize: "14px",
                    color: dark,
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            ))}
            <button
              style={{
                background: accent,
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                padding: "12px 20px",
                fontSize: "14px",
                fontWeight: 700,
                cursor: "pointer",
                letterSpacing: "0.5px",
              }}
            >
              {t.search}
            </button>
          </div>

          {/* Trust badges */}
          <div style={{ display: "flex", gap: "24px", marginTop: "20px", flexWrap: "wrap" }}>
            {[t.trust1, t.trust2, t.trust3].map((trust) => (
              <div key={trust} style={{ color: "#C4A882", fontSize: "13px", display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ color: accent }}>✓</span> {trust}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 24px" }}>
        {/* DETAIL VIEW */}
        {villa ? (
          <div>
            <button
              onClick={() => { setSelectedVilla(null); setCheckIn(null); setCheckOut(null); setPickingFor(null); }}
              style={{ background: "none", border: "none", color: accent, cursor: "pointer", fontSize: "14px", fontWeight: 600, marginBottom: "24px", padding: 0 }}
            >
              {t.back}
            </button>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
              {/* Photo placeholder */}
              <div
                style={{
                  background: `linear-gradient(135deg, ${villa.color} 0%, ${dark} 100%)`,
                  borderRadius: "16px",
                  minHeight: "260px",
                  display: "flex",
                  alignItems: "flex-end",
                  padding: "20px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontSize: "56px", opacity: 0.2 }}>🏡</div>
                <div>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: "20px" }}>{isUk ? villa.name.uk : villa.name.en}</div>
                  <div style={{ color: "rgba(255,255,255,0.75)", fontSize: "13px" }}>{isUk ? villa.region.uk : villa.region.en}</div>
                </div>
              </div>

              {/* Info */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                  <span style={{ fontSize: "22px", fontWeight: 700 }}>{isUk ? villa.name.uk : villa.name.en}</span>
                  <span style={{ background: "#FFF3E0", color: accent, borderRadius: "8px", padding: "2px 10px", fontSize: "12px", fontWeight: 700 }}>★ {villa.rating}</span>
                </div>
                <div style={{ color: green, fontWeight: 600, marginBottom: "16px" }}>{isUk ? villa.region.uk : villa.region.en}</div>

                <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#5A4A3A", marginBottom: "16px" }}>
                  {isUk
                    ? `Розкішна ${villa.bedrooms}-кімнатна вілла з панорамними видами. Ідеально для сімей та компаній до ${villa.capacity} осіб. Повністю обладнана кухня, Wi-Fi, кондиціонер.`
                    : `A luxurious ${villa.bedrooms}-bedroom villa with panoramic views. Perfect for families and groups up to ${villa.capacity} guests. Fully equipped kitchen, Wi-Fi, air conditioning.`}
                </p>

                <div style={{ fontSize: "13px", color: "#5A4A3A" }}>
                  <div style={{ fontWeight: 700, marginBottom: "8px", color: dark }}>{t.amenities}</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
                    {[
                      { icon: "🛏️", label: isUk ? `${villa.bedrooms} спальні` : `${villa.bedrooms} bedrooms` },
                      { icon: "👥", label: isUk ? `до ${villa.capacity} осіб` : `up to ${villa.capacity} guests` },
                      { icon: "🔥", label: t.sauna, active: villa.amenities.sauna },
                      { icon: "🏊", label: t.pool, active: villa.amenities.pool },
                      { icon: "🪵", label: t.fireplace, active: villa.amenities.fireplace },
                      { icon: "🐕", label: t.petsOk, active: villa.amenities.pets },
                    ].map((a) => (
                      <div key={a.label} style={{ display: "flex", alignItems: "center", gap: "6px", opacity: a.active === false ? 0.4 : 1 }}>
                        <span>{a.icon}</span>
                        <span style={{ textDecoration: a.active === false ? "line-through" : "none" }}>{a.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* House rules */}
            <div style={{ background: card, borderRadius: "14px", padding: "20px", marginTop: "24px", border: "1px solid #EAE0D5" }}>
              <div style={{ fontWeight: 700, fontSize: "15px", marginBottom: "12px", color: dark }}>{t.houseRules}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {[t.rule1, t.rule2, t.rule3, t.rule4].map((r) => (
                  <span key={r} style={{ background: "#F8F4EF", border: "1px solid #E0D0C0", borderRadius: "8px", padding: "6px 14px", fontSize: "13px" }}>{r}</span>
                ))}
              </div>
            </div>

            {/* Availability Calculator */}
            <div style={{ background: card, borderRadius: "14px", padding: "24px", marginTop: "24px", border: `1.5px solid ${accent}22` }}>
              <div style={{ fontWeight: 700, fontSize: "17px", marginBottom: "20px", color: dark }}>{t.availability}</div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
                {(["in", "out"] as const).map((type) => {
                  const isIn = type === "in";
                  const val = isIn ? checkIn : checkOut;
                  return (
                    <div key={type}>
                      <div style={{ fontSize: "12px", fontWeight: 700, color: accent, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px" }}>
                        {isIn ? t.selectCheckIn : t.selectCheckOut}
                      </div>
                      <button
                        onClick={() => setPickingFor(pickingFor === type ? null : type)}
                        style={{
                          width: "100%",
                          padding: "10px 14px",
                          border: `1.5px solid ${pickingFor === type ? accent : "#D4C4B4"}`,
                          borderRadius: "8px",
                          background: val ? `${accent}11` : "transparent",
                          color: val ? dark : "#9B8B7B",
                          cursor: "pointer",
                          textAlign: "left",
                          fontSize: "14px",
                          fontWeight: val ? 600 : 400,
                        }}
                      >
                        {val ? `${isUk ? "Квітень" : "April"} ${val}, 2026` : t.pickDate}
                      </button>

                      {pickingFor === type && (
                        <div style={{ marginTop: "8px", background: bg, borderRadius: "10px", padding: "12px", border: "1px solid #D4C4B4" }}>
                          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px" }}>
                            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                              const unavail = UNAVAILABLE_DAYS.includes(day);
                              const isSelected = (isIn && checkIn === day) || (!isIn && checkOut === day);
                              const isDisabled = !isIn && checkIn !== null && day <= checkIn;
                              return (
                                <button
                                  key={day}
                                  onClick={() => handleDayClick(day)}
                                  disabled={unavail || isDisabled}
                                  style={{
                                    padding: "6px 2px",
                                    border: "none",
                                    borderRadius: "6px",
                                    background: isSelected ? accent : unavail || isDisabled ? "#E8E0D8" : "#fff",
                                    color: isSelected ? "#fff" : unavail || isDisabled ? "#B0A090" : dark,
                                    cursor: unavail || isDisabled ? "not-allowed" : "pointer",
                                    fontSize: "12px",
                                    fontWeight: isSelected ? 700 : 400,
                                    textDecoration: unavail ? "line-through" : "none",
                                  }}
                                >
                                  {day}
                                </button>
                              );
                            })}
                          </div>
                          <button
                            onClick={() => setPickingFor(null)}
                            style={{ marginTop: "8px", background: "none", border: "none", color: accent, cursor: "pointer", fontSize: "12px" }}
                          >
                            {t.cancelPick}
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Guests slider */}
              <div style={{ marginBottom: "20px" }}>
                <div style={{ fontSize: "12px", fontWeight: 700, color: accent, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px" }}>
                  {t.guestsLabel}: <span style={{ color: dark }}>{guests}</span>
                </div>
                <input
                  type="range"
                  min={2}
                  max={20}
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  style={{ width: "100%", accentColor: accent }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#9B8B7B" }}>
                  <span>2</span><span>20</span>
                </div>
              </div>

              {/* Price summary */}
              {nights !== null && totalPrice !== null ? (
                <div style={{ background: `${accent}0D`, border: `1px solid ${accent}33`, borderRadius: "10px", padding: "16px", marginBottom: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px" }}>
                    <span>{nights} {t.nights}</span>
                    <span>{nights} × {pricePerNight.toLocaleString()} {t.uah}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px" }}>
                    <span>{t.pricePerNight}</span>
                    <span style={{ fontWeight: 600 }}>{pricePerNight.toLocaleString()} {t.uah}</span>
                  </div>
                  <div style={{ borderTop: "1px solid #D4C4B4", paddingTop: "10px", display: "flex", justifyContent: "space-between", fontSize: "16px", fontWeight: 700, color: dark }}>
                    <span>{t.totalPrice}</span>
                    <span style={{ color: accent }}>{totalPrice.toLocaleString()} {t.uah}</span>
                  </div>
                </div>
              ) : (
                <div style={{ background: "#F8F4EF", borderRadius: "10px", padding: "14px", marginBottom: "16px", textAlign: "center", color: "#9B8B7B", fontSize: "13px" }}>
                  {isUk ? "Оберіть дати для розрахунку вартості" : "Select dates to calculate price"}
                </div>
              )}

              <button
                style={{
                  width: "100%",
                  background: accent,
                  color: "#fff",
                  border: "none",
                  borderRadius: "10px",
                  padding: "14px",
                  fontSize: "15px",
                  fontWeight: 700,
                  cursor: "pointer",
                  letterSpacing: "0.5px",
                }}
              >
                {t.book}
              </button>
            </div>

            {/* Villa reviews */}
            <div style={{ marginTop: "24px" }}>
              <div style={{ fontWeight: 700, fontSize: "17px", marginBottom: "16px", color: dark }}>{t.reviews}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {(VILLA_REVIEWS[villa.id] || REVIEWS.slice(0, 3)).map((rev, idx) => (
                  <div key={idx} style={{ background: card, borderRadius: "12px", padding: "16px", border: "1px solid #EAE0D5" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                      <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: accent, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "13px" }}>
                        {rev.name[0]}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: "14px" }}>{rev.name}</div>
                        <div style={{ color: "#F0A830", fontSize: "12px" }}>{"★".repeat(rev.stars)}</div>
                      </div>
                    </div>
                    <p style={{ fontSize: "13px", color: "#5A4A3A", lineHeight: 1.6, margin: 0 }}>
                      {isUk ? rev.text.uk : rev.text.en}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* FILTER BAR */}
            <div style={{ background: card, borderRadius: "14px", padding: "16px 20px", marginBottom: "24px", border: "1px solid #EAE0D5" }}>
              <div style={{ fontSize: "13px", fontWeight: 700, color: dark, marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>{t.filter}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
                {/* Region */}
                {[
                  { key: "all", label: t.all },
                  { key: "carpathians", label: t.carpathians },
                  { key: "kyiv", label: t.kyivRegion },
                ].map((r) => (
                  <button key={r.key} onClick={() => setFilterRegion(r.key)} style={pillStyle(filterRegion === r.key)}>{r.label}</button>
                ))}
                <div style={{ width: "1px", height: "24px", background: "#D4C4B4" }} />
                {/* Guests */}
                {["all", "2", "4", "6", "8", "10+"].map((g) => (
                  <button key={g} onClick={() => setFilterGuests(g)} style={pillStyle(filterGuests === g)}>
                    {g === "all" ? t.all : `${g} ${t.persons}`}
                  </button>
                ))}
                <div style={{ width: "1px", height: "24px", background: "#D4C4B4" }} />
                {/* Amenities */}
                <button onClick={() => setFilterSauna(!filterSauna)} style={checkboxStyle(filterSauna)}>🔥 {t.sauna}</button>
                <button onClick={() => setFilterPool(!filterPool)} style={checkboxStyle(filterPool)}>🏊 {t.pool}</button>
                <button onClick={() => setFilterFireplace(!filterFireplace)} style={checkboxStyle(filterFireplace)}>🪵 {t.fireplace}</button>
                <button onClick={() => setFilterPets(!filterPets)} style={checkboxStyle(filterPets)}>🐕 {t.petsOk}</button>
              </div>
              <div style={{ marginTop: "8px", fontSize: "12px", color: "#9B8B7B" }}>
                {isUk ? `Знайдено: ${filteredVillas.length} садиб` : `Found: ${filteredVillas.length} properties`}
              </div>
            </div>

            {/* VILLA CATALOG */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "20px" }}>
              {filteredVillas.map((v) => (
                <div
                  key={v.id}
                  onClick={() => setSelectedVilla(v.id)}
                  style={{
                    background: card,
                    borderRadius: "16px",
                    overflow: "hidden",
                    border: "1px solid #EAE0D5",
                    cursor: "pointer",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    boxShadow: "0 2px 12px rgba(42,31,22,0.07)",
                  }}
                >
                  {/* Photo */}
                  <div
                    style={{
                      background: `linear-gradient(135deg, ${v.color} 0%, ${dark} 100%)`,
                      height: "160px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    <span style={{ fontSize: "44px", opacity: 0.35 }}>🏡</span>
                    {v.badge && (
                      <div style={{
                        position: "absolute",
                        top: "12px",
                        left: "12px",
                        background: accent,
                        color: "#fff",
                        borderRadius: "8px",
                        padding: "3px 10px",
                        fontSize: "11px",
                        fontWeight: 700,
                        letterSpacing: "0.3px",
                      }}>
                        {isUk ? v.badge.uk : v.badge.en}
                      </div>
                    )}
                    <div style={{
                      position: "absolute",
                      bottom: "12px",
                      right: "12px",
                      background: "rgba(255,255,255,0.9)",
                      borderRadius: "8px",
                      padding: "3px 10px",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: dark,
                    }}>
                      ★ {v.rating}
                    </div>
                  </div>

                  <div style={{ padding: "16px" }}>
                    <div style={{ fontWeight: 700, fontSize: "15px", marginBottom: "4px" }}>{isUk ? v.name.uk : v.name.en}</div>
                    <div style={{ fontSize: "12px", color: green, marginBottom: "10px" }}>{isUk ? v.region.uk : v.region.en}</div>

                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "12px" }}>
                      <span style={{ fontSize: "12px", color: "#5A4A3A" }}>🛏️ {v.bedrooms}</span>
                      <span style={{ fontSize: "12px", color: "#5A4A3A" }}>👥 {t.capacity} {v.capacity} {t.persons}</span>
                      {v.amenities.sauna && <span style={{ fontSize: "12px", color: "#5A4A3A" }}>🔥</span>}
                      {v.amenities.pool && <span style={{ fontSize: "12px", color: "#5A4A3A" }}>🏊</span>}
                      {v.amenities.fireplace && <span style={{ fontSize: "12px", color: "#5A4A3A" }}>🪵</span>}
                      {v.amenities.pets && <span style={{ fontSize: "12px", color: "#5A4A3A" }}>🐕</span>}
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div>
                        <span style={{ fontSize: "11px", color: "#9B8B7B" }}>{t.priceFrom} </span>
                        <span style={{ fontWeight: 700, fontSize: "16px", color: accent }}>{v.price.toLocaleString()}</span>
                        <span style={{ fontSize: "11px", color: "#9B8B7B" }}> {t.uah}/{t.night}</span>
                      </div>
                      <button
                        style={{
                          background: accent,
                          color: "#fff",
                          border: "none",
                          borderRadius: "8px",
                          padding: "7px 14px",
                          fontSize: "12px",
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        {t.viewVilla}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredVillas.length === 0 && (
              <div style={{ textAlign: "center", padding: "48px", color: "#9B8B7B" }}>
                <div style={{ fontSize: "40px", marginBottom: "12px" }}>🏡</div>
                <div style={{ fontSize: "16px" }}>
                  {isUk ? "Не знайдено садиб за вашими фільтрами" : "No properties match your filters"}
                </div>
              </div>
            )}

            {/* TESTIMONIALS */}
            <div style={{ marginTop: "48px" }}>
              <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "6px", color: dark }}>
                {t.guestReviews}
              </h2>
              <div style={{ width: "48px", height: "3px", background: accent, borderRadius: "2px", marginBottom: "24px" }} />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "16px" }}>
                {REVIEWS.map((rev, idx) => (
                  <div key={idx} style={{ background: card, borderRadius: "14px", padding: "20px", border: "1px solid #EAE0D5", boxShadow: "0 2px 12px rgba(42,31,22,0.06)" }}>
                    <div style={{ color: "#F0A830", fontSize: "16px", marginBottom: "10px" }}>{"★".repeat(rev.stars)}</div>
                    <p style={{ fontSize: "13px", color: "#5A4A3A", lineHeight: 1.7, marginBottom: "14px" }}>
                      &ldquo;{isUk ? rev.text.uk : rev.text.en}&rdquo;
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: `linear-gradient(135deg, ${accent}, ${green})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700 }}>
                        {rev.name[0]}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: "13px" }}>{rev.name}</div>
                        <div style={{ fontSize: "11px", color: "#9B8B7B" }}>{rev.date}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
