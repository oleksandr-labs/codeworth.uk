"use client";

import { useState } from "react";
import { EmojiIcon } from "@/components/ui/EmojiIcon";

// ─── Data ─────────────────────────────────────────────────────────────────────

type Vibe = "Quiet & Chill" | "Party Hostel" | "Cultural" | "Digital Nomad" | "Family Friendly";

const VIBES: Vibe[] = ["Quiet & Chill", "Party Hostel", "Cultural", "Digital Nomad", "Family Friendly"];

const VIBE_LABELS: Record<Vibe, { en: string; uk: string; emoji: string }> = {
  "Quiet & Chill": { en: "Quiet & Chill", uk: "Спокійна атмосфера", emoji: "🤫" },
  "Party Hostel": { en: "Party Hostel", uk: "Вечіркові", emoji: "🎉" },
  "Cultural": { en: "Cultural", uk: "Культурні", emoji: "🏛️" },
  "Digital Nomad": { en: "Digital Nomad", uk: "Цифровий номад", emoji: "💻" },
  "Family Friendly": { en: "Family Friendly", uk: "Для сімей", emoji: "👨‍👩‍👧" },
};

type Hostel = {
  id: number;
  nameEn: string;
  cityEn: string;
  cityUk: string;
  vibeType: Vibe;
  vibeScore: number;
  priceUah: number;
  badges: string[];
  amenities: string[];
  guestCommentEn: string;
  guestCommentUk: string;
};

const HOSTELS: Hostel[] = [
  {
    id: 1, nameEn: "Cloud Nine Hostel", cityEn: "Lviv, Old Town", cityUk: "Львів, Старе місто",
    vibeType: "Quiet & Chill", vibeScore: 8.8, priceUah: 420,
    badges: ["🔥 Bestseller", "🌿 Eco-friendly"],
    amenities: ["WiFi", "Towels", "Locker", "Breakfast+", "Chill garden"],
    guestCommentEn: "Perfect for solo travelers who want calm and good coffee.", guestCommentUk: "Ідеально для соло-мандрівників, що цінують спокій та каву.",
  },
  {
    id: 2, nameEn: "Neon Wave", cityEn: "Kyiv, Podil", cityUk: "Київ, Поділ",
    vibeType: "Party Hostel", vibeScore: 9.2, priceUah: 380,
    badges: ["🎉 Events", "🔥 Bestseller"],
    amenities: ["Bar", "Rooftop", "Events daily", "Lockers", "WiFi"],
    guestCommentEn: "Met my travel crew here. Best nights of my trip!", guestCommentUk: "Познайомився тут зі своєю командою. Найкращі ночі мандрівки!",
  },
  {
    id: 3, nameEn: "Amber Gate", cityEn: "Lviv, Lychakiv", cityUk: "Львів, Личаків",
    vibeType: "Cultural", vibeScore: 9.0, priceUah: 460,
    badges: ["🏛️ Cultural tours", "☕ Café"],
    amenities: ["City tours", "Library", "Kitchen", "WiFi", "Bike rental"],
    guestCommentEn: "Staff gave us an amazing walking tour. Museum recommendations were spot on.", guestCommentUk: "Персонал провів неймовірну пішу екскурсію. Рекомендації музеїв — влучні.",
  },
  {
    id: 4, nameEn: "Pixel Hub", cityEn: "Kyiv, Center", cityUk: "Київ, Центр",
    vibeType: "Digital Nomad", vibeScore: 9.4, priceUah: 550,
    badges: ["💻 Coworking", "⚡ Fast WiFi"],
    amenities: ["Coworking 24/7", "Dedicated desks", "Monitors", "Standing desks", "Café"],
    guestCommentEn: "Stayed 3 weeks. Best coworking hostel in Ukraine, no contest.", guestCommentUk: "Жив 3 тижні. Найкращий коворкінг-хостел в Україні — без сумнівів.",
  },
  {
    id: 5, nameEn: "Sunny Harbour", cityEn: "Odesa, Prymors'ka", cityUk: "Одеса, Приморська",
    vibeType: "Family Friendly", vibeScore: 8.6, priceUah: 390,
    badges: ["👶 Kids welcome", "🌊 Near beach"],
    amenities: ["Family rooms", "Kids area", "Beach access", "Kitchen", "WiFi"],
    guestCommentEn: "Traveled with two kids — staff was so helpful and the area is safe.", guestCommentUk: "Подорожувала з двома дітьми — персонал дуже помічний, район безпечний.",
  },
];

const DEALS = [
  { nameEn: "Neon Wave", cityEn: "Kyiv", originalUah: 380, discountPct: 30, nightsLeft: 2, emoji: "🎉" },
  { nameEn: "Cloud Nine", cityEn: "Lviv", originalUah: 420, discountPct: 20, nightsLeft: 5, emoji: "🤫" },
  { nameEn: "Amber Gate", cityEn: "Lviv", originalUah: 460, discountPct: 15, nightsLeft: 3, emoji: "🏛️" },
];

const CITY_GUIDES = [
  { cityEn: "Lviv", cityUk: "Львів", tipEn: "Skip tourist cafés — try Pid Oryekhom on Virmenska.", tipUk: "Оминайте туристичні кафе — спробуйте Під Горіхом на Вірменській.", emoji: "🏰" },
  { cityEn: "Kyiv", cityUk: "Київ", tipEn: "Podil neighborhood has the best nightlife AND cafés.", tipUk: "Поділ — найкраще нічне життя І найкращі кафе.", emoji: "🏙️" },
  { cityEn: "Odesa", cityUk: "Одеса", tipEn: "Lanzheron beach > Arcadia. Quieter, locals go there.", tipUk: "Пляж Ланжерон > Аркадія. Тихіше, місцеві там відпочивають.", emoji: "🌊" },
  { cityEn: "Kharkiv", cityUk: "Харків", tipEn: "Freedom Square is massive — great free outdoor events.", tipUk: "Майдан Свободи величезний — чудові безкоштовні заходи просто неба.", emoji: "🎭" },
];

const TRAVELERS = [
  { initials: "MA", flag: "🇩🇪", nameEn: "Marco, Germany", dateEn: "Mar 28 – Apr 4", dateUk: "28 бер – 4 кві" },
  { initials: "SL", flag: "🇵🇱", nameEn: "Sofia, Poland", dateEn: "Mar 29 – Apr 2", dateUk: "29 бер – 2 кві" },
  { initials: "JB", flag: "🇺🇸", nameEn: "Jake, USA", dateEn: "Mar 30 – Apr 7", dateUk: "30 бер – 7 кві" },
  { initials: "AK", flag: "🇰🇷", nameEn: "Areum, Korea", dateEn: "Mar 29 – Apr 3", dateUk: "29 бер – 3 кві" },
  { initials: "LP", flag: "🇫🇷", nameEn: "Léa, France", dateEn: "Mar 31 – Apr 5", dateUk: "31 бер – 5 кві" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function BedHopperDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const ORANGE = "#F97316";
  const WHITE = "#FFFFFF";
  const CHARCOAL = "#1F2937";
  const LIME = "#A3E635";
  const CARD_BG = "#111827";
  const BORDER = "#374151";
  const LIGHT_BG = "#F9FAFB";

  const [city, setCity] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [travelers, setTravelers] = useState("2");
  const [roomType, setRoomType] = useState("Either");
  const [activeVibe, setActiveVibe] = useState<Vibe>("Party Hostel");
  const [expandedHostel, setExpandedHostel] = useState<number | null>(null);
  const [bookingName, setBookingName] = useState("");
  const [bookingEmail, setBookingEmail] = useState("");
  const [bookingSent, setBookingSent] = useState<number | null>(null);

  const filteredHostels = HOSTELS.filter((h) => h.vibeType === activeVibe);

  return (
    <div style={{ background: LIGHT_BG, color: CHARCOAL, fontFamily: "system-ui, sans-serif", minHeight: "100vh" }}>

      {/* Hero */}
      <div style={{ background: CHARCOAL, padding: "48px 24px 36px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        {/* Decorative blobs */}
        <div style={{ position: "absolute", top: -30, left: -30, width: 160, height: 160, borderRadius: "50%", background: `${ORANGE}30`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -20, right: -20, width: 120, height: 120, borderRadius: "50%", background: `${LIME}25`, pointerEvents: "none" }} />

        <div style={{ display: "inline-block", background: ORANGE, color: WHITE, fontSize: 11, fontWeight: 800, letterSpacing: 3, padding: "4px 16px", borderRadius: 20, marginBottom: 18, textTransform: "uppercase" }}>
          BedHopper
        </div>
        <h1 style={{ fontSize: 42, fontWeight: 900, color: WHITE, margin: "0 0 14px", letterSpacing: -1 }}>
          {isUk ? "Подорожуй більше, витрачай менше" : "Travel more, spend less"}
        </h1>
        <p style={{ fontSize: 16, color: "#9CA3AF", maxWidth: 420, margin: "0 auto 28px" }}>
          {isUk ? "Найкращі хостели за вайбом, не лише за ціною." : "Best hostels by vibe, not just price."}
        </p>

        {/* Live counters */}
        <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
          {[
            { n: "2,340", label: isUk ? "мандрівників онлайн" : "travelers online", color: LIME },
            { n: "180", label: isUk ? "хостелів" : "hostels", color: ORANGE },
            { n: "42", label: isUk ? "міста" : "cities", color: "#60A5FA" },
          ].map((c) => (
            <div key={c.n} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 26, fontWeight: 900, color: c.color }}>{c.n}</div>
              <div style={{ fontSize: 12, color: "#9CA3AF" }}>{c.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 980, margin: "0 auto", padding: "0 16px" }}>

        {/* Search bar */}
        <div style={{ background: WHITE, borderRadius: 16, boxShadow: "0 4px 20px rgba(0,0,0,0.08)", padding: 20, marginTop: -20, position: "relative", zIndex: 10 }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 12, marginBottom: 14 }}>
            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#6B7280", marginBottom: 4, textTransform: "uppercase" }}>
                {isUk ? "Місто" : "City"}
              </label>
              <input value={city} onChange={(e) => setCity(e.target.value)} placeholder={isUk ? "Куди їдете?" : "Where to?"}
                style={{ width: "100%", border: `1.5px solid ${BORDER}`, borderRadius: 8, padding: "9px 12px", fontSize: 14, boxSizing: "border-box", outline: "none" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#6B7280", marginBottom: 4, textTransform: "uppercase" }}>
                {isUk ? "Заїзд" : "Check-in"}
              </label>
              <input value={checkIn} onChange={(e) => setCheckIn(e.target.value)} placeholder="DD.MM"
                style={{ width: "100%", border: `1.5px solid ${BORDER}`, borderRadius: 8, padding: "9px 12px", fontSize: 14, boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#6B7280", marginBottom: 4, textTransform: "uppercase" }}>
                {isUk ? "Виїзд" : "Check-out"}
              </label>
              <input value={checkOut} onChange={(e) => setCheckOut(e.target.value)} placeholder="DD.MM"
                style={{ width: "100%", border: `1.5px solid ${BORDER}`, borderRadius: 8, padding: "9px 12px", fontSize: 14, boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#6B7280", marginBottom: 4, textTransform: "uppercase" }}>
                {isUk ? "Гості" : "Travelers"}
              </label>
              <input value={travelers} onChange={(e) => setTravelers(e.target.value)} placeholder="2"
                style={{ width: "100%", border: `1.5px solid ${BORDER}`, borderRadius: 8, padding: "9px 12px", fontSize: 14, boxSizing: "border-box" }} />
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#6B7280" }}>{isUk ? "Тип кімнати:" : "Room:"}</span>
            {["Dorm", "Private", "Either"].map((r) => (
              <button key={r} onClick={() => setRoomType(r)}
                style={{ padding: "6px 14px", borderRadius: 20, border: `1.5px solid ${roomType === r ? ORANGE : BORDER}`, background: roomType === r ? ORANGE : WHITE, color: roomType === r ? WHITE : CHARCOAL, fontSize: 12, cursor: "pointer", fontWeight: 600 }}>
                {r}
              </button>
            ))}
            <button style={{ marginLeft: "auto", background: ORANGE, color: WHITE, border: "none", borderRadius: 10, padding: "10px 24px", fontWeight: 800, fontSize: 14, cursor: "pointer" }}>
              {isUk ? "Знайти" : "Search"}
            </button>
          </div>
        </div>

        {/* Today's deals */}
        <section style={{ padding: "36px 0 20px" }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: CHARCOAL, marginBottom: 16 }}>
            {isUk ? "Знижки сьогодні" : "Today's Deals"} 🔥
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
            {DEALS.map((deal) => (
              <div key={deal.nameEn} style={{ background: WHITE, border: `2px solid ${ORANGE}30`, borderRadius: 14, padding: 18, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 12, right: 12, background: ORANGE, color: WHITE, fontSize: 11, fontWeight: 800, padding: "3px 10px", borderRadius: 20 }}>
                  -{deal.discountPct}%
                </div>
                <div style={{ marginBottom: 8 }}><EmojiIcon emoji={deal.emoji} className="w-10 h-10" /></div>
                <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 2 }}>{deal.nameEn}</div>
                <div style={{ color: "#6B7280", fontSize: 12, marginBottom: 10 }}>{deal.cityEn}</div>
                <div style={{ display: "flex", gap: 8, alignItems: "baseline" }}>
                  <span style={{ textDecoration: "line-through", color: "#9CA3AF", fontSize: 13 }}>₴{deal.originalUah}</span>
                  <span style={{ color: ORANGE, fontWeight: 800, fontSize: 18 }}>₴{Math.round(deal.originalUah * (1 - deal.discountPct / 100))}</span>
                </div>
                <div style={{ fontSize: 11, color: "#EF4444", fontWeight: 700, marginTop: 6 }}>
                  {isUk ? `Залишилось ${deal.nightsLeft} ночі` : `${deal.nightsLeft} nights left`}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Vibe Filter + Hostel cards */}
        <section style={{ padding: "20px 0" }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: CHARCOAL, marginBottom: 16 }}>
            {isUk ? "Фільтр за вайбом" : "Vibe Filter"}
          </h2>
          <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
            {VIBES.map((v) => (
              <button key={v} onClick={() => { setActiveVibe(v); setExpandedHostel(null); }}
                style={{ padding: "8px 16px", borderRadius: 20, border: `2px solid ${activeVibe === v ? ORANGE : BORDER}`, background: activeVibe === v ? ORANGE : WHITE, color: activeVibe === v ? WHITE : CHARCOAL, fontSize: 13, cursor: "pointer", fontWeight: 700 }}>
                <EmojiIcon emoji={VIBE_LABELS[v].emoji} className="w-4 h-4 inline-block align-middle mr-1" />{isUk ? VIBE_LABELS[v].uk : VIBE_LABELS[v].en}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {filteredHostels.map((hostel) => (
              <div key={hostel.id} style={{ background: WHITE, border: `2px solid ${expandedHostel === hostel.id ? ORANGE : "#E5E7EB"}`, borderRadius: 14, overflow: "hidden" }}>
                <div onClick={() => setExpandedHostel(expandedHostel === hostel.id ? null : hostel.id)}
                  style={{ padding: 18, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                  <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                    <div style={{ width: 52, height: 52, borderRadius: 10, background: `${ORANGE}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <EmojiIcon emoji={VIBE_LABELS[hostel.vibeType].emoji} className="w-10 h-10" />
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 2 }}>{hostel.nameEn}</div>
                      <div style={{ color: "#6B7280", fontSize: 13 }}>{isUk ? hostel.cityUk : hostel.cityEn}</div>
                      <div style={{ display: "flex", gap: 6, marginTop: 6, flexWrap: "wrap" }}>
                        {hostel.badges.map((b) => (
                          <span key={b} style={{ background: `${LIME}40`, color: "#374151", fontSize: 11, padding: "2px 8px", borderRadius: 10, fontWeight: 600 }}>{b}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ background: CHARCOAL, color: WHITE, fontSize: 14, fontWeight: 800, padding: "4px 10px", borderRadius: 8, marginBottom: 4 }}>
                      {hostel.vibeScore} ★
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 900, color: ORANGE }}>₴{hostel.priceUah}</div>
                    <div style={{ fontSize: 11, color: "#9CA3AF" }}>{isUk ? "/ніч" : "/night"}</div>
                  </div>
                </div>

                {/* Expanded view */}
                {expandedHostel === hostel.id && (
                  <div style={{ borderTop: `1px solid #F3F4F6`, padding: 20 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 13, color: CHARCOAL, marginBottom: 8 }}>
                          {isUk ? "Зручності" : "Amenities"}
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                          {hostel.amenities.map((a) => (
                            <span key={a} style={{ background: "#F3F4F6", color: CHARCOAL, fontSize: 12, padding: "4px 10px", borderRadius: 8 }}>✓ {a}</span>
                          ))}
                        </div>
                        <div style={{ marginTop: 16, background: `${LIME}20`, border: `1px solid ${LIME}`, borderRadius: 10, padding: 12 }}>
                          <div style={{ fontSize: 11, fontWeight: 700, color: "#4B5563", marginBottom: 4 }}>
                            {isUk ? "💬 Гість про хостел:" : "💬 Recent guest:"}
                          </div>
                          <div style={{ fontSize: 13, color: CHARCOAL, fontStyle: "italic", lineHeight: 1.5 }}>
                            "{isUk ? hostel.guestCommentUk : hostel.guestCommentEn}"
                          </div>
                        </div>
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 13, color: CHARCOAL, marginBottom: 8 }}>
                          {isUk ? "Забронювати" : "Book Now"}
                        </div>
                        {bookingSent === hostel.id ? (
                          <div style={{ background: `${LIME}30`, border: `1px solid ${LIME}`, borderRadius: 10, padding: 16, textAlign: "center" }}>
                            <div style={{ fontSize: 28, marginBottom: 8 }}>🎉</div>
                            <div style={{ fontWeight: 800, color: CHARCOAL }}>{isUk ? "Бронювання надіслано!" : "Booking sent!"}</div>
                          </div>
                        ) : (
                          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                            {[
                              { label: isUk ? "Ім'я" : "Name", val: bookingName, set: setBookingName, ph: isUk ? "Ваше ім'я" : "Your name" },
                              { label: "Email", val: bookingEmail, set: setBookingEmail, ph: "email@example.com" },
                            ].map((f) => (
                              <div key={f.label}>
                                <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#6B7280", marginBottom: 4 }}>{f.label}</label>
                                <input value={f.val} onChange={(e) => f.set(e.target.value)} placeholder={f.ph}
                                  style={{ width: "100%", border: `1.5px solid ${BORDER}`, borderRadius: 8, padding: "8px 10px", fontSize: 13, boxSizing: "border-box" }} />
                              </div>
                            ))}
                            <button onClick={() => setBookingSent(hostel.id)} disabled={!bookingName || !bookingEmail}
                              style={{ background: ORANGE, color: WHITE, border: "none", borderRadius: 10, padding: "11px", fontWeight: 800, fontSize: 14, cursor: bookingName && bookingEmail ? "pointer" : "not-allowed", opacity: bookingName && bookingEmail ? 1 : 0.5 }}>
                              {isUk ? "Підтвердити бронювання" : "Confirm Booking"}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {filteredHostels.length === 0 && (
              <div style={{ textAlign: "center", color: "#9CA3AF", padding: 48 }}>
                {isUk ? "Немає хостелів для цього вайбу" : "No hostels for this vibe"}
              </div>
            )}
          </div>
        </section>

        {/* City Guides */}
        <section style={{ padding: "28px 0" }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: CHARCOAL, marginBottom: 16 }}>
            {isUk ? "Путівники містами" : "City Guides"} 🗺️
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 14 }}>
            {CITY_GUIDES.map((g) => (
              <div key={g.cityEn} style={{ background: WHITE, border: `1px solid #E5E7EB`, borderRadius: 14, padding: 18 }}>
                <div style={{ marginBottom: 8 }}><EmojiIcon emoji={g.emoji} className="w-14 h-14" /></div>
                <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 6 }}>{isUk ? g.cityUk : g.cityEn}</div>
                <div style={{ fontSize: 12, color: "#4B5563", lineHeight: 1.5, borderLeft: `3px solid ${ORANGE}`, paddingLeft: 10 }}>
                  {isUk ? g.tipUk : g.tipEn}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Who's staying */}
        <section style={{ padding: "28px 0 48px" }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: CHARCOAL, marginBottom: 6 }}>
            {isUk ? "Хто зупиняється цього тижня" : "Who's staying there this week"} 👥
          </h2>
          <p style={{ color: "#9CA3AF", fontSize: 13, marginBottom: 18 }}>
            {isUk ? "Реальні мандрівники прямо зараз" : "Real travelers right now"}
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {TRAVELERS.map((t) => (
              <div key={t.initials} style={{ background: WHITE, border: `1px solid #E5E7EB`, borderRadius: 14, padding: "14px 18px", display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: `linear-gradient(135deg, ${ORANGE}, #fb923c)`, color: WHITE, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, flexShrink: 0 }}>
                  {t.initials}
                </div>
                <div>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <EmojiIcon emoji={t.flag} className="w-8 h-8" />
                    <span style={{ fontWeight: 700, fontSize: 13 }}>{t.nameEn}</span>
                  </div>
                  <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2 }}>{isUk ? t.dateUk : t.dateEn}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
