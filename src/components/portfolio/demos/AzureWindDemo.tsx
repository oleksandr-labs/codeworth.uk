"use client";

import { useState } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const PORTS = ["Odesa", "Split (Croatia)", "Athens (Greece)", "Bodrum (Turkey)", "Dubrovnik"];

const INTERESTS_LIST = [
  { id: "swim", labelEn: "Swimming & snorkeling", labelUk: "Плавання та снорклінг" },
  { id: "historic", labelEn: "Historic towns", labelUk: "Історичні міста" },
  { id: "nightlife", labelEn: "Nightlife", labelUk: "Нічне життя" },
  { id: "fishing", labelEn: "Fishing", labelUk: "Рибалка" },
  { id: "coves", labelEn: "Secluded coves", labelUk: "Відокремлені бухти" },
  { id: "gastro", labelEn: "Gastronomy", labelUk: "Гастрономія" },
];

type Route = { day: number; portEn: string; portUk: string; descEn: string; descUk: string };

const ROUTE_PRESETS: Record<string, Route[]> = {
  "Split (Croatia)": [
    { day: 1, portEn: "Split — Arrival & old town", portUk: "Спліт — Прибуття та старе місто", descEn: "Check in at ACI Marina. Explore Diocletian's Palace and waterfront promenade.", descUk: "Реєстрація в ACI Marina. Прогулянка палацом Діоклетіана та набережною." },
    { day: 2, portEn: "Hvar — Lavender island", portUk: "Хвар — Острів лаванди", descEn: "Anchor off Hvar Town. Medieval walls, upscale bars, hidden coves.", descUk: "Стоянка біля Хвара. Середньовічні стіни, вишукані бари, схована бухта." },
    { day: 3, portEn: "Vis — Remote island gem", portUk: "Віс — Незаймана перлина", descEn: "Visit Blue Cave and Stiniva cove. Local wine tasting in the village.", descUk: "Блакитна печера та бухта Стініва. Дегустація місцевого вина у селі." },
    { day: 4, portEn: "Korcula — Medieval walled city", portUk: "Корчула — Місто в мурах", descEn: "Legendary birthplace of Marco Polo. Stroll cobblestone alleys.", descUk: "Легендарне місто народження Марко Поло. Прогулянка бруківковими вуличками." },
    { day: 5, portEn: "Mljet — National park anchorage", portUk: "Млет — Стоянка у нацпарку", descEn: "Sail into the national park lakes. Swim in crystal-clear lagoons.", descUk: "Плавання озерами національного парку. Кришталеві лагуни для купання." },
    { day: 6, portEn: "Dubrovnik — The Pearl of Adriatic", portUk: "Дубровнік — Перлина Адріатики", descEn: "Walk the ancient walls. Sunset from Srđ hill. Farewell dinner.", descUk: "Прогулянка давніми мурами. Захід сонця з пагорба Срдж. Прощальна вечеря." },
  ],
  "Athens (Greece)": [
    { day: 1, portEn: "Athens / Piraeus — Departure", portUk: "Афіни / Піреус — Відправлення", descEn: "Board at Zea Marina. Acropolis visit before casting off.", descUk: "Посадка в Зеа Марина. Відвідайте Акрополь перед відплиттям." },
    { day: 2, portEn: "Hydra — Car-free island", portUk: "Гідра — Безавтомобільний острів", descEn: "No cars on the island. Donkeys, cafes, and classic whitewash architecture.", descUk: "Острів без автомобілів. Осли, кав'ярні та класична білосніжна архітектура." },
    { day: 3, portEn: "Spetses — Elite retreat", portUk: "Спецес — Елітний відпочинок", descEn: "Pine-forested island beloved by Athenian elite. Beach day and taverna.", descUk: "Сосновий острів, улюблений афінською елітою. День на пляжі та таверна." },
    { day: 4, portEn: "Nafplio — Romantic harbor town", portUk: "Нафпліо — Романтичне портове місто", descEn: "First capital of modern Greece. Venetian fortress, cobblestone charm.", descUk: "Перша столиця сучасної Греції. Венеціанський форт, брукована вулиця." },
    { day: 5, portEn: "Monemvasia — Rock fortress", portUk: "Монемвасія — Скельна фортеця", descEn: "Medieval Byzantine town perched on a giant rock. Time travel vibes.", descUk: "Середньовічне візантійське місто на скелі. Відчуття подорожі у часі." },
  ],
  default: [
    { day: 1, portEn: "Departure port — Cast off", portUk: "Порт відправлення — Відплиття", descEn: "Board your yacht, safety briefing, set sail toward open horizon.", descUk: "Посадка на яхту, інструктаж з безпеки, вихід у відкрите море." },
    { day: 2, portEn: "First anchorage — Secluded bay", portUk: "Перша стоянка — Усамітнена бухта", descEn: "Drop anchor in a sheltered cove. Swim, snorkel, enjoy silence.", descUk: "Стоянка в захищеній бухті. Плавання, снорклінг, насолода тишею." },
    { day: 3, portEn: "Coastal town — Culture stop", portUk: "Прибережне місто — Культурна зупинка", descEn: "Wander local markets, taste regional cuisine, visit a fortress.", descUk: "Місцеві ринки, регіональна кухня, відвідання фортеці." },
    { day: 4, portEn: "Island anchorage — Beach day", portUk: "Острівна стоянка — День на пляжі", descEn: "All-day beach, local lunch, sunset aperitivo on deck.", descUk: "Цілий день на пляжі, обід у місцевому ресторані, аперитив на палубі." },
  ],
};

const FLEET = [
  { nameEn: "Meridian", type: "Sailing", length: "42 ft", capacity: 6, cabins: 3, year: 2019, emoji: "⛵" },
  { nameEn: "Solaris", type: "Motor", length: "55 ft", capacity: 8, cabins: 4, year: 2021, emoji: "🚤" },
  { nameEn: "Twin Horizon", type: "Catamaran", length: "48 ft", capacity: 10, cabins: 5, year: 2020, emoji: "⛵" },
  { nameEn: "Odyssey", type: "Motor", length: "72 ft", capacity: 12, cabins: 6, year: 2022, emoji: "🛥️" },
];

const SERVICES = [
  { emojiIcon: "👨‍✈️", titleEn: "Charter with Crew", titleUk: "Чартер з командою", descEn: "Captain, chef, and steward included. Just arrive and relax.", descUk: "Капітан, кухар і стюард у вартості. Просто прибудьте та відпочивайте." },
  { emojiIcon: "🧭", titleEn: "Bareboat Charter", titleUk: "Голий чартер", descEn: "For licensed sailors. Full autonomy, your own adventure.", descUk: "Для ліцензованих яхтсменів. Повна автономія, власна пригода." },
  { emojiIcon: "💼", titleEn: "Corporate Events", titleUk: "Корпоративні заходи", descEn: "Team building or client entertainment on the open sea.", descUk: "Тімбілдинг або розваги для клієнтів у відкритому морі." },
  { emojiIcon: "💍", titleEn: "Honeymoon Package", titleUk: "Медовий місяць", descEn: "Curated romantic itinerary, floral decor, private chef dinners.", descUk: "Романтичний маршрут, квіткове оздоблення, приватні вечері від шеф-кухаря." },
];

const DESTINATIONS = [
  { nameEn: "Croatia", nameUk: "Хорватія", seasonEn: "Best: Jun–Sep", seasonUk: "Краще: Чер–Вер", emoji: "🏝️" },
  { nameEn: "Greece", nameUk: "Греція", seasonEn: "Best: May–Oct", seasonUk: "Краще: Тра–Жов", emoji: "🏛️" },
  { nameEn: "Turkey", nameUk: "Туреччина", seasonEn: "Best: Apr–Nov", seasonUk: "Краще: Кві–Лис", emoji: "🕌" },
  { nameEn: "Montenegro", nameUk: "Чорногорія", seasonEn: "Best: Jun–Sep", seasonUk: "Краще: Чер–Вер", emoji: "🏔️" },
  { nameEn: "Black Sea", nameUk: "Чорне море", seasonEn: "Best: Jul–Aug", seasonUk: "Краще: Лип–Сер", emoji: "🌊" },
];

const PROCESS_STEPS = [
  { stepEn: "Inquiry", stepUk: "Запит", descEn: "Tell us your dates, destination, and group size.", descUk: "Повідомте дати, маршрут і кількість гостей." },
  { stepEn: "Proposal", stepUk: "Пропозиція", descEn: "We match you with the ideal vessel and itinerary.", descUk: "Підбираємо ідеальне судно та маршрут." },
  { stepEn: "Contract", stepUk: "Договір", descEn: "Transparent agreement, flexible terms.", descUk: "Прозора угода, гнучкі умови." },
  { stepEn: "Briefing", stepUk: "Інструктаж", descEn: "Pre-departure call with captain and crew.", descUk: "Дзвінок з капітаном та командою перед відплиттям." },
  { stepEn: "Charter", stepUk: "Чартер", descEn: "Cast off. Your horizon awaits.", descUk: "Відпливаємо. Ваш горизонт чекає." },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function AzureWindDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const NAVY = "#0C1B33";
  const GOLD = "#C9A84C";
  const PEARL = "#F8F5EE";
  const TEAL = "#0D7377";
  const CARD_BG = "#112240";
  const BORDER = "#1e3a5f";

  const [startPort, setStartPort] = useState("Split (Croatia)");
  const [duration, setDuration] = useState("7 days");
  const [yachtType, setYachtType] = useState("Sailing");
  const [interests, setInterests] = useState<Set<string>>(new Set(["swim", "historic"]));
  const [routeVisible, setRouteVisible] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formDates, setFormDates] = useState("");
  const [formParty, setFormParty] = useState("");
  const [formSent, setFormSent] = useState(false);
  const [enquireYacht, setEnquireYacht] = useState<string | null>(null);

  const toggleInterest = (id: string) => {
    setInterests((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const routeData = ROUTE_PRESETS[startPort] ?? ROUTE_PRESETS["default"];
  const displayedRoute = duration === "7 days" ? routeData.slice(0, 4) : duration === "10 days" ? routeData.slice(0, 5) : routeData;

  return (
    <div style={{ background: NAVY, color: PEARL, fontFamily: "Georgia, 'Times New Roman', serif", minHeight: "100vh" }}>

      {/* Hero */}
      <div style={{ background: `linear-gradient(180deg, #060e1c 0%, ${NAVY} 100%)`, padding: "64px 32px 40px", textAlign: "center", borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ display: "inline-block", color: GOLD, fontSize: 11, fontWeight: 700, letterSpacing: 4, marginBottom: 20, textTransform: "uppercase", fontFamily: "system-ui, sans-serif" }}>
          — AzureWind Yacht Charter —
        </div>
        <h1 style={{ fontSize: 44, fontWeight: 400, color: PEARL, margin: "0 0 16px", letterSpacing: 1, lineHeight: 1.2 }}>
          {isUk ? "Відкритий обрій. Лише для вас." : "Open horizon. Only for you."}
        </h1>
        <p style={{ fontSize: 16, color: "#a8b8cc", maxWidth: 440, margin: "0 auto 32px", lineHeight: 1.7, fontFamily: "system-ui, sans-serif" }}>
          {isUk ? "Ексклюзивні яхтові маршрути Середземномор'ям і Чорним морем." : "Exclusive yacht routes across the Mediterranean and Black Sea."}
        </p>
        {/* Fleet ticker */}
        <div style={{ background: GOLD, color: NAVY, fontSize: 12, fontWeight: 700, padding: "10px 32px", letterSpacing: 4, textTransform: "uppercase", fontFamily: "system-ui, sans-serif" }}>
          Mediterranean · Croatia · Greece · Turkey · Black Sea
        </div>
      </div>

      <div style={{ maxWidth: 980, margin: "0 auto", padding: "0 16px" }}>

        {/* Route Builder */}
        <section style={{ padding: "52px 0 32px" }}>
          <h2 style={{ fontSize: 28, fontWeight: 400, color: PEARL, marginBottom: 8, textAlign: "center" }}>
            {isUk ? "Побудуйте свій маршрут" : "Build Your Route"}
          </h2>
          <p style={{ textAlign: "center", color: "#7a9bbf", fontSize: 14, marginBottom: 32, fontFamily: "system-ui, sans-serif" }}>
            {isUk ? "Персоналізований маршрут за вашими уподобаннями" : "A personalised itinerary tailored to your preferences"}
          </p>

          <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 28, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {/* Start port */}
            <div>
              <label style={{ display: "block", fontSize: 11, color: GOLD, marginBottom: 8, textTransform: "uppercase", letterSpacing: 2, fontFamily: "system-ui, sans-serif" }}>
                {isUk ? "Порт відправлення" : "Start Port"}
              </label>
              <select value={startPort} onChange={(e) => { setStartPort(e.target.value); setRouteVisible(false); }}
                style={{ width: "100%", background: NAVY, border: `1px solid ${BORDER}`, color: PEARL, borderRadius: 8, padding: "10px 12px", fontSize: 13, fontFamily: "system-ui, sans-serif" }}>
                {PORTS.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            {/* Duration */}
            <div>
              <label style={{ display: "block", fontSize: 11, color: GOLD, marginBottom: 8, textTransform: "uppercase", letterSpacing: 2, fontFamily: "system-ui, sans-serif" }}>
                {isUk ? "Тривалість" : "Duration"}
              </label>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["7 days", "10 days", "14 days", "Custom"].map((d) => (
                  <button key={d} onClick={() => setDuration(d)}
                    style={{ padding: "8px 14px", borderRadius: 6, border: `1px solid ${duration === d ? GOLD : BORDER}`, background: duration === d ? `${GOLD}20` : "transparent", color: duration === d ? GOLD : "#7a9bbf", fontSize: 12, cursor: "pointer", fontFamily: "system-ui, sans-serif" }}>
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Yacht type */}
            <div>
              <label style={{ display: "block", fontSize: 11, color: GOLD, marginBottom: 8, textTransform: "uppercase", letterSpacing: 2, fontFamily: "system-ui, sans-serif" }}>
                {isUk ? "Тип яхти" : "Yacht Type"}
              </label>
              <div style={{ display: "flex", gap: 10 }}>
                {["Sailing", "Motor", "Catamaran"].map((t) => (
                  <label key={t} style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontSize: 13, color: PEARL, fontFamily: "system-ui, sans-serif" }}>
                    <input type="radio" name="yachttype" value={t} checked={yachtType === t} onChange={() => setYachtType(t)} style={{ accentColor: GOLD }} />
                    {t}
                  </label>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div>
              <label style={{ display: "block", fontSize: 11, color: GOLD, marginBottom: 8, textTransform: "uppercase", letterSpacing: 2, fontFamily: "system-ui, sans-serif" }}>
                {isUk ? "Інтереси" : "Interests"}
              </label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {INTERESTS_LIST.map((i) => (
                  <label key={i.id} style={{ display: "flex", alignItems: "center", gap: 5, cursor: "pointer", fontSize: 12, color: PEARL, fontFamily: "system-ui, sans-serif", padding: "4px 10px", border: `1px solid ${interests.has(i.id) ? TEAL : BORDER}`, borderRadius: 20, background: interests.has(i.id) ? `${TEAL}30` : "transparent" }}>
                    <input type="checkbox" checked={interests.has(i.id)} onChange={() => toggleInterest(i.id)} style={{ accentColor: TEAL, marginRight: 2 }} />
                    {isUk ? i.labelUk : i.labelEn}
                  </label>
                ))}
              </div>
            </div>

            <div style={{ gridColumn: "1/-1" }}>
              <button onClick={() => setRouteVisible(true)}
                style={{ background: GOLD, color: NAVY, border: "none", borderRadius: 10, padding: "14px 32px", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "system-ui, sans-serif", letterSpacing: 1 }}>
                {isUk ? "Показати маршрут" : "Show Suggested Route"}
              </button>
            </div>
          </div>

          {/* Route result */}
          {routeVisible && (
            <div style={{ marginTop: 24 }}>
              <h3 style={{ fontSize: 18, fontWeight: 400, color: GOLD, marginBottom: 16 }}>
                {isUk ? `Маршрут з ${startPort}` : `Suggested Route from ${startPort}`}
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {displayedRoute.map((stop, idx) => (
                  <div key={idx} style={{ display: "flex", gap: 16, paddingBottom: 20 }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <div style={{ width: 32, height: 32, borderRadius: "50%", background: GOLD, color: NAVY, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, flexShrink: 0, fontFamily: "system-ui, sans-serif" }}>{stop.day}</div>
                      {idx < displayedRoute.length - 1 && <div style={{ width: 1, flex: 1, background: BORDER, marginTop: 4 }} />}
                    </div>
                    <div style={{ paddingTop: 4, paddingBottom: idx < displayedRoute.length - 1 ? 0 : 0 }}>
                      <div style={{ fontWeight: 700, color: PEARL, fontSize: 14, marginBottom: 4 }}>{isUk ? stop.portUk : stop.portEn}</div>
                      <div style={{ fontSize: 13, color: "#7a9bbf", lineHeight: 1.5, fontFamily: "system-ui, sans-serif" }}>{isUk ? stop.descUk : stop.descEn}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => setInquiryOpen(true)}
                style={{ marginTop: 8, background: "transparent", color: GOLD, border: `1px solid ${GOLD}`, borderRadius: 8, padding: "11px 24px", fontSize: 13, cursor: "pointer", fontFamily: "system-ui, sans-serif" }}>
                {isUk ? "Запитати цей маршрут" : "Request this itinerary"}
              </button>
            </div>
          )}

          {/* Inquiry form */}
          {inquiryOpen && (
            <div style={{ marginTop: 24, background: CARD_BG, border: `1px solid ${GOLD}40`, borderRadius: 14, padding: 24 }}>
              {formSent ? (
                <div style={{ textAlign: "center", padding: 20 }}>
                  <div style={{ fontSize: 36, marginBottom: 12 }}>⚓</div>
                  <div style={{ color: GOLD, fontWeight: 700, fontSize: 18 }}>{isUk ? "Запит надіслано!" : "Inquiry sent!"}</div>
                  <div style={{ color: "#7a9bbf", fontSize: 13, marginTop: 8, fontFamily: "system-ui, sans-serif" }}>{isUk ? "Зв'яжемося протягом 24 годин." : "We'll be in touch within 24 hours."}</div>
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  {[
                    { label: isUk ? "Ваше ім'я" : "Name", val: formName, set: setFormName, placeholder: isUk ? "Ім'я та прізвище" : "Full name" },
                    { label: "Email", val: formEmail, set: setFormEmail, placeholder: "your@email.com" },
                    { label: isUk ? "Бажані дати" : "Preferred Dates", val: formDates, set: setFormDates, placeholder: "DD.MM — DD.MM" },
                    { label: isUk ? "Кількість гостей" : "Party Size", val: formParty, set: setFormParty, placeholder: "2–12" },
                  ].map((f) => (
                    <div key={f.label}>
                      <label style={{ display: "block", fontSize: 11, color: GOLD, marginBottom: 6, textTransform: "uppercase", letterSpacing: 1, fontFamily: "system-ui, sans-serif" }}>{f.label}</label>
                      <input value={f.val} onChange={(e) => f.set(e.target.value)} placeholder={f.placeholder}
                        style={{ width: "100%", background: NAVY, border: `1px solid ${BORDER}`, color: PEARL, borderRadius: 8, padding: "10px 12px", fontSize: 13, boxSizing: "border-box", fontFamily: "system-ui, sans-serif" }} />
                    </div>
                  ))}
                  <div style={{ gridColumn: "1/-1" }}>
                    <button onClick={() => setFormSent(true)}
                      style={{ background: GOLD, color: NAVY, border: "none", borderRadius: 8, padding: "13px 28px", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "system-ui, sans-serif" }}>
                      {isUk ? "Надіслати запит" : "Send Inquiry"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Fleet */}
        <section style={{ padding: "32px 0" }}>
          <h2 style={{ fontSize: 26, fontWeight: 400, color: PEARL, marginBottom: 24, textAlign: "center" }}>
            {isUk ? "Наш флот" : "Our Fleet"}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 16 }}>
            {FLEET.map((yacht) => (
              <div key={yacht.nameEn} style={{ background: CARD_BG, border: `1px solid ${enquireYacht === yacht.nameEn ? GOLD : BORDER}`, borderRadius: 14, padding: 22, textAlign: "center" }}>
                <div style={{ fontSize: 40, marginBottom: 10 }}>{yacht.emoji}</div>
                <div style={{ fontWeight: 700, color: PEARL, fontSize: 16, marginBottom: 4 }}>{yacht.nameEn}</div>
                <div style={{ color: GOLD, fontSize: 11, marginBottom: 14, textTransform: "uppercase", letterSpacing: 2, fontFamily: "system-ui, sans-serif" }}>{yacht.type}</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 16 }}>
                  {[
                    [isUk ? "Довжина" : "Length", yacht.length],
                    [isUk ? "Гості" : "Capacity", `${yacht.capacity} pax`],
                    [isUk ? "Каюти" : "Cabins", yacht.cabins],
                    [isUk ? "Рік" : "Year", yacht.year],
                  ].map(([k, v]) => (
                    <div key={String(k)} style={{ background: `${NAVY}80`, borderRadius: 6, padding: "6px 8px" }}>
                      <div style={{ fontSize: 10, color: "#7a9bbf", fontFamily: "system-ui, sans-serif" }}>{k}</div>
                      <div style={{ fontSize: 13, color: PEARL, fontWeight: 600, fontFamily: "system-ui, sans-serif" }}>{v}</div>
                    </div>
                  ))}
                </div>
                <button onClick={() => setEnquireYacht(yacht.nameEn)}
                  style={{ width: "100%", background: "transparent", border: `1px solid ${GOLD}`, color: GOLD, borderRadius: 8, padding: "9px", fontSize: 13, cursor: "pointer", fontFamily: "system-ui, sans-serif" }}>
                  {isUk ? "Дізнатися ціну" : "Enquire"}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Services */}
        <section style={{ padding: "32px 0" }}>
          <h2 style={{ fontSize: 26, fontWeight: 400, color: PEARL, marginBottom: 24, textAlign: "center" }}>
            {isUk ? "Послуги" : "Services"}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
            {SERVICES.map((s) => (
              <div key={s.titleEn} style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{s.emojiIcon}</div>
                <div style={{ fontWeight: 700, color: GOLD, fontSize: 14, marginBottom: 6 }}>{isUk ? s.titleUk : s.titleEn}</div>
                <div style={{ fontSize: 12, color: "#7a9bbf", lineHeight: 1.5, fontFamily: "system-ui, sans-serif" }}>{isUk ? s.descUk : s.descEn}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Destinations */}
        <section style={{ padding: "32px 0" }}>
          <h2 style={{ fontSize: 26, fontWeight: 400, color: PEARL, marginBottom: 24, textAlign: "center" }}>
            {isUk ? "Напрямки" : "Destinations"}
          </h2>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            {DESTINATIONS.map((d) => (
              <div key={d.nameEn} style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "18px 24px", textAlign: "center", minWidth: 130 }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>{d.emoji}</div>
                <div style={{ fontWeight: 700, color: PEARL, fontSize: 15 }}>{isUk ? d.nameUk : d.nameEn}</div>
                <div style={{ fontSize: 11, color: TEAL, marginTop: 4, fontFamily: "system-ui, sans-serif" }}>{isUk ? d.seasonUk : d.seasonEn}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section style={{ padding: "32px 0 52px" }}>
          <h2 style={{ fontSize: 26, fontWeight: 400, color: PEARL, marginBottom: 28, textAlign: "center" }}>
            {isUk ? "Як це працює" : "How It Works"}
          </h2>
          <div style={{ display: "flex", gap: 0, flexWrap: "wrap", justifyContent: "center" }}>
            {PROCESS_STEPS.map((step, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 0 }}>
                <div style={{ textAlign: "center", padding: "0 12px", maxWidth: 130 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: i === 0 ? GOLD : BORDER, color: i === 0 ? NAVY : PEARL, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 15, margin: "0 auto 10px", fontFamily: "system-ui, sans-serif" }}>{i + 1}</div>
                  <div style={{ fontWeight: 700, color: PEARL, fontSize: 13, marginBottom: 4 }}>{isUk ? step.stepUk : step.stepEn}</div>
                  <div style={{ fontSize: 11, color: "#7a9bbf", lineHeight: 1.4, fontFamily: "system-ui, sans-serif" }}>{isUk ? step.descUk : step.descEn}</div>
                </div>
                {i < PROCESS_STEPS.length - 1 && <div style={{ width: 32, height: 1, background: BORDER, flexShrink: 0 }} />}
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
