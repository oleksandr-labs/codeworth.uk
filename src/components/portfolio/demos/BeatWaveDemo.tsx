"use client";

import { useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Event {
  id: number;
  name: string;
  nameUk: string;
  date: string;
  dateUk: string;
  location: string;
  locationUk: string;
  genre: string;
  genreUk: string;
  price: string;
  status?: string;
  statusColor?: string;
  month: "this" | "next" | "later";
  color: string;
}

interface TicketTier {
  id: string;
  name: string;
  nameUk: string;
  price: string;
  sold: boolean;
  amenities: string[];
  amenitiesUk: string[];
  color: string;
}

interface Artist {
  id: number;
  name: string;
  genre: string;
  genreUk: string;
  bio: string;
  bioUk: string;
  stage: string;
  stageUk: string;
  time: string;
  day: number;
  color: string;
  setlist: string[];
}

interface CartItem {
  tier: string;
  tierUk: string;
  qty: number;
  price: number;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const EVENTS: Event[] = [
  {
    id: 1,
    name: "BeatWave Festival",
    nameUk: "BeatWave Festival",
    date: "Jul 19–20",
    dateUk: "19–20 лип",
    location: "Kyiv, Atlas Weekend Area",
    locationUk: "Київ, Atlas Weekend Area",
    genre: "Electronic",
    genreUk: "Електронна",
    price: "₴1,200",
    status: "⚡ Last tickets",
    statusColor: "#FFAA00",
    month: "this",
    color: "#00D4FF",
  },
  {
    id: 2,
    name: "СКРЯБІН Tribute Night",
    nameUk: "СКРЯБІН Tribute Night",
    date: "Aug 3",
    dateUk: "3 серп",
    location: "Lviv, Palats Sportu",
    locationUk: "Львів, Палац Спорту",
    genre: "Rock",
    genreUk: "Рок",
    price: "₴480",
    status: "🆕 Just announced",
    statusColor: "#39FF14",
    month: "next",
    color: "#BF00FF",
  },
  {
    id: 3,
    name: "DakhaBrakha Live",
    nameUk: "DakhaBrakha Live",
    date: "Jul 28",
    dateUk: "28 лип",
    location: "Odesa, Philharmonic",
    locationUk: "Одеса, Філармонія",
    genre: "World",
    genreUk: "World",
    price: "₴680",
    status: undefined,
    statusColor: undefined,
    month: "this",
    color: "#FF6B35",
  },
  {
    id: 4,
    name: "SoundWave Outdoor",
    nameUk: "SoundWave Outdoor",
    date: "Aug 10",
    dateUk: "10 серп",
    location: "Dnipro, City Beach",
    locationUk: "Дніпро, Міський Пляж",
    genre: "House",
    genreUk: "Хаус",
    price: "₴890",
    status: undefined,
    statusColor: undefined,
    month: "next",
    color: "#00D4FF",
  },
  {
    id: 5,
    name: "Jazz in Mystetsky",
    nameUk: "Jazz у Мистецькому",
    date: "Aug 15",
    dateUk: "15 серп",
    location: "Kyiv, Mystetsky Arsenal",
    locationUk: "Київ, Мистецький Арсенал",
    genre: "Jazz",
    genreUk: "Джаз",
    price: "₴750",
    status: undefined,
    statusColor: undefined,
    month: "next",
    color: "#FFD700",
  },
  {
    id: 6,
    name: "Hardkiss World Tour",
    nameUk: "Hardkiss World Tour",
    date: "Sep 5",
    dateUk: "5 вер",
    location: "Kharkiv, Arena",
    locationUk: "Харків, Арена",
    genre: "Electronic",
    genreUk: "Електронна",
    price: "₴950",
    status: "🔥 Sold Out",
    statusColor: "#FF3366",
    month: "later",
    color: "#BF00FF",
  },
];

const TICKET_TIERS: TicketTier[] = [
  {
    id: "early",
    name: "Early Bird",
    nameUk: "Ранній птах",
    price: "₴750",
    sold: true,
    color: "#555",
    amenities: ["General access", "2 days", "Festival map"],
    amenitiesUk: ["Загальний доступ", "2 дні", "Карта фестивалю"],
  },
  {
    id: "regular",
    name: "Regular",
    nameUk: "Стандарт",
    price: "₴1,200",
    sold: false,
    color: "#00D4FF",
    amenities: ["General access", "2 days", "Festival map", "App access"],
    amenitiesUk: [
      "Загальний доступ",
      "2 дні",
      "Карта фестивалю",
      "Доступ до додатку",
    ],
  },
  {
    id: "vip",
    name: "VIP",
    nameUk: "VIP",
    price: "₴3,500",
    sold: false,
    color: "#BF00FF",
    amenities: [
      "VIP zone",
      "2 days",
      "Backstage pass",
      "Welcome drink",
      "Dedicated entry",
    ],
    amenitiesUk: [
      "VIP-зона",
      "2 дні",
      "Бекстейдж-пропуск",
      "Вітальний напій",
      "Окремий вхід",
    ],
  },
  {
    id: "vvip",
    name: "VVIP",
    nameUk: "VVIP",
    price: "₴8,900",
    sold: false,
    color: "#39FF14",
    amenities: [
      "VVIP lounge",
      "2 days",
      "Artist meet & greet",
      "Full hospitality",
      "Limo transfer",
      "Exclusive merch",
    ],
    amenitiesUk: [
      "VVIP-лаунж",
      "2 дні",
      "Зустріч з артистами",
      "Повний сервіс",
      "Трансфер лімузином",
      "Ексклюзивний мерч",
    ],
  },
];

const ARTISTS: Artist[] = [
  {
    id: 1,
    name: "ARTBAT",
    genre: "Melodic Techno",
    genreUk: "Мелодік Техно",
    bio: "Ukrainian DJ duo known for their unique blend of melodic and driving techno. World-class festival headliners.",
    bioUk:
      "Українське DJ-дуо, відоме неповторним поєднанням мелодійного та драйвового техно. Хедлайнери світових фестивалів.",
    stage: "Main Stage",
    stageUk: "Головна сцена",
    time: "23:00",
    day: 1,
    color: "#00D4FF",
    setlist: ["Closer", "Spectrum", "Upperground", "Age of Love (edit)"],
  },
  {
    id: 2,
    name: "Monolink",
    genre: "Techno / Electronic",
    genreUk: "Техно / Електронна",
    bio: "Berlin-based multi-instrumentalist merging live performance with electronic production.",
    bioUk:
      "Берлінський мульти-інструменталіст, який поєднує живий виступ з електронним продакшном.",
    stage: "Main Stage",
    stageUk: "Головна сцена",
    time: "21:00",
    day: 1,
    color: "#BF00FF",
    setlist: ["Return to Nowhere", "Hail the Sun", "Black To White", "Father"],
  },
  {
    id: 3,
    name: "Charlotte de Witte",
    genre: "Techno",
    genreUk: "Техно",
    bio: "Belgian techno titan. Raw, stripped-back and relentless sets that move massive crowds.",
    bioUk:
      "Бельгійська техно-титанка. Сирі, мінімалістичні та невпинні сети, що рухають тисячні натовпи.",
    stage: "Warehouse Stage",
    stageUk: "Warehouse-сцена",
    time: "02:00",
    day: 2,
    color: "#39FF14",
    setlist: ["Sgat", "Doppler", "Parabola", "In Utero"],
  },
  {
    id: 4,
    name: "Solomun",
    genre: "Deep House / Techno",
    genreUk: "Діп-хаус / Техно",
    bio: "Bosnian-German DJ and record label owner renowned for marathon sets and emotional music selections.",
    bioUk:
      "Боснійсько-німецький DJ та власник лейблу, відомий марафонськими сетами та емоційним добором музики.",
    stage: "Main Stage",
    stageUk: "Головна сцена",
    time: "00:00",
    day: 2,
    color: "#FF6B35",
    setlist: [
      "Customer Is King",
      "Mucho Bien",
      "Tamo Daleko (edit)",
      "Nobody Is Not Loved",
    ],
  },
  {
    id: 5,
    name: "HVOB",
    genre: "Electronic / Pop",
    genreUk: "Електронна / Поп",
    bio: "Austrian electronic duo crafting melancholic soundscapes with hypnotic vocals and analog synths.",
    bioUk:
      "Австрійське електронне дуо, що творить меланхолійні звукові пейзажі з гіпнотичним вокалом та аналоговими синтезаторами.",
    stage: "Forest Stage",
    stageUk: "Лісова сцена",
    time: "19:00",
    day: 1,
    color: "#FFD700",
    setlist: ["Fog", "Lover", "Cats", "Lox"],
  },
  {
    id: 6,
    name: "Nastia",
    genre: "Techno",
    genreUk: "Техно",
    bio: "Ukrainian DJ and promoter, founder of Cxema club nights. Icon of Ukrainian underground.",
    bioUk:
      "Українська DJ та промоутерка, засновниця Cxema. Ікона українського андерграунду.",
    stage: "Warehouse Stage",
    stageUk: "Warehouse-сцена",
    time: "00:00",
    day: 1,
    color: "#00D4FF",
    setlist: ["Red Bull Mix 2022 opener", "Concept 431", "Dark Entries", "Shake"],
  },
  {
    id: 7,
    name: "Reinier Zonneveld",
    genre: "Techno",
    genreUk: "Техно",
    bio: "Dutch live act pushing peak-time industrial techno with explosive energy.",
    bioUk:
      "Нідерландський live-act, що подає індастріал-техно пікового часу з вибуховою енергією.",
    stage: "Main Stage",
    stageUk: "Головна сцена",
    time: "22:00",
    day: 2,
    color: "#BF00FF",
    setlist: ["Suckerpunch", "People Dance", "Baas van het Dorp", "Trancemaster"],
  },
  {
    id: 8,
    name: "ANNA",
    genre: "Techno / Electronic",
    genreUk: "Техно / Електронна",
    bio: "Brazilian powerhouse with a reputation for energy-driven techno sets at the world's finest clubs.",
    bioUk:
      "Бразильська техно-зірка з репутацією енергійних сетів у найкращих клубах світу.",
    stage: "Warehouse Stage",
    stageUk: "Warehouse-сцена",
    time: "03:00",
    day: 2,
    color: "#39FF14",
    setlist: ["No Tomorrow", "Liberdade", "Presence", "Burn In Flames"],
  },
];

const DAY1_SCHEDULE = [
  { time: "16:00", artist: "Opening Act", stage: "Forest Stage", color: "#555" },
  { time: "18:00", artist: "Local DJs", stage: "Warehouse Stage", color: "#444" },
  { time: "19:00", artist: "HVOB", stage: "Forest Stage", color: "#FFD700" },
  { time: "21:00", artist: "Monolink", stage: "Main Stage", color: "#BF00FF" },
  { time: "23:00", artist: "ARTBAT", stage: "Main Stage", color: "#00D4FF" },
  { time: "00:00", artist: "Nastia", stage: "Warehouse Stage", color: "#00D4FF" },
  { time: "02:00", artist: "b2b Closing", stage: "Forest Stage", color: "#555" },
];

const DAY2_SCHEDULE = [
  { time: "16:00", artist: "Warm-up DJs", stage: "Forest Stage", color: "#444" },
  { time: "18:00", artist: "Local Heroes", stage: "Main Stage", color: "#555" },
  { time: "19:00", artist: "Special Guest", stage: "Warehouse Stage", color: "#FF6B35" },
  { time: "21:00", artist: "Solomun", stage: "Main Stage", color: "#FF6B35" },
  { time: "22:00", artist: "Reinier Zonneveld", stage: "Main Stage", color: "#BF00FF" },
  { time: "00:00", artist: "Charlotte de Witte", stage: "Warehouse Stage", color: "#39FF14" },
  { time: "03:00", artist: "ANNA", stage: "Warehouse Stage", color: "#39FF14" },
];

const GENRES_EN = ["All", "Electronic", "Rock", "Hip-Hop", "Jazz", "Alternative"];
const GENRES_UK = ["Всі", "Електронна", "Рок", "Хіп-хоп", "Джаз", "Альтернатива"];

// ─── Countdown helpers ───────────────────────────────────────────────────────

function getCountdown(targetDate: Date) {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, mins: 0, secs: 0 };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);
  return { days, hours, mins, secs };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

// ─── Shared Components ───────────────────────────────────────────────────────

function NeonText({
  children,
  color = "#00D4FF",
  className = "",
}: {
  children: React.ReactNode;
  color?: string;
  className?: string;
}) {
  return (
    <span
      className={className}
      style={{
        color,
        textShadow: `0 0 10px ${color}, 0 0 30px ${color}80, 0 0 60px ${color}40`,
      }}
    >
      {children}
    </span>
  );
}

function GlowButton({
  children,
  color = "#00D4FF",
  onClick,
  disabled = false,
  small = false,
}: {
  children: React.ReactNode;
  color?: string;
  onClick?: () => void;
  disabled?: boolean;
  small?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        border: `2px solid ${disabled ? "#444" : color}`,
        color: disabled ? "#666" : color,
        boxShadow: disabled ? "none" : `0 0 12px ${color}60, inset 0 0 12px ${color}10`,
        background: disabled ? "#1a1a1a" : `${color}10`,
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 0.2s",
        padding: small ? "6px 16px" : "12px 28px",
        borderRadius: "4px",
        fontWeight: 700,
        fontSize: small ? "0.75rem" : "0.9rem",
        letterSpacing: "0.1em",
        textTransform: "uppercase" as const,
        fontFamily: "inherit",
      }}
    >
      {children}
    </button>
  );
}

function CountdownBlock({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div
      className="flex flex-col items-center"
      style={{
        background: "#0a0a0a",
        border: "1px solid #00D4FF40",
        borderRadius: "6px",
        padding: "12px 20px",
        minWidth: "72px",
        boxShadow: "0 0 20px #00D4FF20",
      }}
    >
      <span
        style={{
          fontSize: "2.4rem",
          fontWeight: 900,
          color: "#00D4FF",
          textShadow: "0 0 20px #00D4FF, 0 0 40px #00D4FF80",
          fontVariantNumeric: "tabular-nums",
          lineHeight: 1,
          fontFamily: "inherit",
        }}
      >
        {pad(value)}
      </span>
      <span
        style={{
          fontSize: "0.65rem",
          letterSpacing: "0.2em",
          color: "#ffffff60",
          marginTop: "4px",
          textTransform: "uppercase" as const,
        }}
      >
        {label}
      </span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function BeatWaveDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  // State
  const [activeFilter, setActiveFilter] = useState<"this" | "next" | "all">("all");
  const [activeGenre, setActiveGenre] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [ticketTier, setTicketTier] = useState<string>("");
  const [ticketQty, setTicketQty] = useState(1);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [purchaseStep, setPurchaseStep] = useState<
    "catalog" | "cart" | "checkout" | "success"
  >("catalog");
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [countdownTime, setCountdownTime] = useState(() =>
    getCountdown(new Date("2025-07-19T12:00:00"))
  );
  const [activeDay, setActiveDay] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

  // Countdown interval
  useState(() => {
    const target = new Date("2025-07-19T12:00:00");
    const iv = setInterval(() => {
      setCountdownTime(getCountdown(target));
    }, 1000);
    return () => clearInterval(iv);
  });

  // Filtered events
  const filteredEvents = EVENTS.filter((e) => {
    const monthOk = activeFilter === "all" || e.month === activeFilter;
    const genreEn = isUk ? GENRES_UK[GENRES_EN.indexOf(activeGenre)] ?? activeGenre : activeGenre;
    const genreOk =
      activeGenre === "All" ||
      activeGenre === "Всі" ||
      e.genre.toLowerCase().includes(activeGenre.toLowerCase()) ||
      e.genreUk.toLowerCase().includes(genreEn?.toLowerCase() ?? "");
    return monthOk && genreOk;
  });

  // Cart total
  const cartTotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);

  function handleAddToCart() {
    if (!ticketTier) return;
    const tier = TICKET_TIERS.find((t) => t.id === ticketTier);
    if (!tier || tier.sold) return;
    const priceNum = parseInt(tier.price.replace(/[₴,]/g, ""));
    setCartItems((prev) => {
      const existing = prev.find((i) => i.tier === tier.name);
      if (existing) {
        return prev.map((i) =>
          i.tier === tier.name ? { ...i, qty: i.qty + ticketQty } : i
        );
      }
      return [
        ...prev,
        { tier: tier.name, tierUk: tier.nameUk, qty: ticketQty, price: priceNum },
      ];
    });
    setPurchaseStep("cart");
  }

  // ─── HERO ────────────────────────────────────────────────────────────────

  function renderHero() {
    return (
      <section
        style={{
          minHeight: "100vh",
          background: "#000000",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 24px",
        }}
      >
        {/* Grain texture overlay */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
            pointerEvents: "none",
            opacity: 0.35,
          }}
        />
        {/* Glow blobs */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "-100px",
            left: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, #00D4FF18 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            bottom: "-80px",
            right: "-80px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, #BF00FF18 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: "600px",
            height: "200px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse, #39FF1408 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Neon dot decorations */}
        {[
          { top: "12%", left: "8%", c: "#00D4FF", s: 8 },
          { top: "22%", left: "85%", c: "#BF00FF", s: 5 },
          { top: "72%", left: "6%", c: "#39FF14", s: 6 },
          { top: "80%", left: "90%", c: "#00D4FF", s: 4 },
          { top: "45%", left: "92%", c: "#39FF14", s: 7 },
          { top: "55%", left: "3%", c: "#BF00FF", s: 5 },
        ].map((dot, i) => (
          <div
            key={i}
            aria-hidden
            style={{
              position: "absolute",
              top: dot.top,
              left: dot.left,
              width: dot.s,
              height: dot.s,
              borderRadius: "50%",
              background: dot.c,
              boxShadow: `0 0 ${dot.s * 3}px ${dot.c}, 0 0 ${dot.s * 6}px ${dot.c}80`,
              pointerEvents: "none",
            }}
          />
        ))}

        {/* Content */}
        <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          {/* Tag */}
          <div
            style={{
              display: "inline-block",
              border: "1px solid #00D4FF60",
              color: "#00D4FF",
              fontSize: "0.7rem",
              letterSpacing: "0.3em",
              padding: "6px 18px",
              marginBottom: "32px",
              textTransform: "uppercase",
              boxShadow: "0 0 12px #00D4FF30",
            }}
          >
            {isUk ? "Офіційний демо-сайт" : "Official demo site"}
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: "clamp(3rem, 12vw, 9rem)",
              fontWeight: 900,
              letterSpacing: "-0.02em",
              lineHeight: 0.9,
              textTransform: "uppercase",
              margin: "0 0 16px",
              fontStretch: "condensed",
            }}
          >
            <NeonText color="#00D4FF">
              {isUk ? "ВІДЧУЙ" : "FEEL"}
            </NeonText>
            <br />
            <span style={{ color: "#ffffff" }}>{isUk ? "КОЖЕН" : "EVERY"}</span>
            <br />
            <NeonText color="#39FF14">{isUk ? "БІТ" : "BEAT"}</NeonText>
          </h1>

          {/* Festival name */}
          <p
            style={{
              fontSize: "clamp(0.85rem, 2vw, 1.1rem)",
              letterSpacing: "0.3em",
              color: "#ffffff80",
              textTransform: "uppercase",
              marginBottom: "8px",
            }}
          >
            BeatWave Festival 2025
          </p>
          <p
            style={{
              fontSize: "clamp(0.8rem, 1.5vw, 0.95rem)",
              letterSpacing: "0.2em",
              color: "#BF00FF",
              textShadow: "0 0 12px #BF00FF",
              marginBottom: "48px",
              textTransform: "uppercase",
            }}
          >
            {isUk ? "19–20 липня · Київ" : "July 19–20 · Kyiv"}
          </p>

          {/* Countdown */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: "48px",
            }}
          >
            <CountdownBlock
              label={isUk ? "днів" : "days"}
              value={countdownTime.days}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                color: "#00D4FF80",
                fontSize: "2rem",
                fontWeight: 900,
              }}
            >
              :
            </div>
            <CountdownBlock
              label={isUk ? "год" : "hours"}
              value={countdownTime.hours}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                color: "#00D4FF80",
                fontSize: "2rem",
                fontWeight: 900,
              }}
            >
              :
            </div>
            <CountdownBlock
              label={isUk ? "хв" : "min"}
              value={countdownTime.mins}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                color: "#00D4FF80",
                fontSize: "2rem",
                fontWeight: 900,
              }}
            >
              :
            </div>
            <CountdownBlock
              label={isUk ? "сек" : "sec"}
              value={countdownTime.secs}
            />
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <GlowButton
              color="#00D4FF"
              onClick={() => {
                setSelectedEvent(EVENTS[0]);
                setPurchaseStep("catalog");
              }}
            >
              {isUk ? "Придбати квитки" : "Buy Tickets"}
            </GlowButton>
            <GlowButton
              color="#BF00FF"
              onClick={() => {
                setSelectedEvent(EVENTS[0]);
              }}
            >
              {isUk ? "Лайн-ап" : "Line-up"}
            </GlowButton>
          </div>

          {/* Scroll hint */}
          <div
            style={{
              marginTop: "60px",
              color: "#ffffff30",
              fontSize: "0.7rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
            }}
          >
            {isUk ? "↓ гортати" : "↓ scroll"}
          </div>
        </div>
      </section>
    );
  }

  // ─── EVENTS CATALOG ──────────────────────────────────────────────────────

  function renderCatalog() {
    const genres = isUk ? GENRES_UK : GENRES_EN;

    return (
      <section style={{ background: "#050505", padding: "80px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          {/* Header */}
          <h2
            style={{
              fontSize: "clamp(1.8rem, 5vw, 3rem)",
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "#fff",
              marginBottom: "8px",
            }}
          >
            <NeonText color="#00D4FF">
              {isUk ? "Найближчі події" : "Upcoming Events"}
            </NeonText>
          </h2>
          <p style={{ color: "#ffffff50", marginBottom: "40px", fontSize: "0.9rem" }}>
            {isUk ? "Знайди свій ідеальний захід" : "Find your perfect event"}
          </p>

          {/* Filter tabs */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              marginBottom: "20px",
            }}
          >
            {(
              [
                { key: "this", en: "This Month", uk: "Цей місяць" },
                { key: "next", en: "Next Month", uk: "Наступний місяць" },
                { key: "all", en: "All", uk: "Всі" },
              ] as const
            ).map(({ key, en, uk }) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                style={{
                  padding: "8px 20px",
                  border: `1px solid ${activeFilter === key ? "#00D4FF" : "#333"}`,
                  background: activeFilter === key ? "#00D4FF15" : "transparent",
                  color: activeFilter === key ? "#00D4FF" : "#ffffff60",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "0.8rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  boxShadow:
                    activeFilter === key ? "0 0 12px #00D4FF40" : "none",
                  transition: "all 0.2s",
                  fontFamily: "inherit",
                }}
              >
                {isUk ? uk : en}
              </button>
            ))}
          </div>

          {/* Genre chips */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              marginBottom: "40px",
            }}
          >
            {genres.map((g, i) => {
              const isActive =
                activeGenre === g ||
                activeGenre === GENRES_EN[i] ||
                (isUk && activeGenre === GENRES_EN[i] && g === GENRES_UK[i]);
              const active =
                activeGenre === g ||
                (!isUk && activeGenre === g) ||
                (isUk && GENRES_UK[GENRES_EN.indexOf(activeGenre)] === g);
              return (
                <button
                  key={g}
                  onClick={() => setActiveGenre(g)}
                  style={{
                    padding: "5px 14px",
                    border: `1px solid ${active || isActive ? "#BF00FF" : "#2a2a2a"}`,
                    background:
                      active || isActive ? "#BF00FF15" : "transparent",
                    color:
                      active || isActive ? "#BF00FF" : "#ffffff40",
                    borderRadius: "100px",
                    cursor: "pointer",
                    fontSize: "0.75rem",
                    boxShadow:
                      active || isActive ? "0 0 10px #BF00FF40" : "none",
                    transition: "all 0.2s",
                    fontFamily: "inherit",
                  }}
                >
                  {g}
                </button>
              );
            })}
          </div>

          {/* Cards grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "24px",
            }}
          >
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                onClick={() => {
                  setSelectedEvent(event);
                  setPurchaseStep("catalog");
                }}
                style={{
                  background: "#0a0a0a",
                  border: `1px solid ${event.color}30`,
                  borderRadius: "8px",
                  overflow: "hidden",
                  cursor: "pointer",
                  boxShadow: `0 0 24px ${event.color}15`,
                  transition: "all 0.25s",
                  position: "relative",
                }}
              >
                {/* Poster div */}
                <div
                  style={{
                    height: "160px",
                    background: `linear-gradient(135deg, ${event.color}30 0%, #000 60%, ${event.color}10 100%)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      background: `radial-gradient(circle, ${event.color}60, ${event.color}10)`,
                      boxShadow: `0 0 40px ${event.color}80`,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: `linear-gradient(to bottom, transparent 50%, #0a0a0a)`,
                    }}
                  />
                </div>

                <div style={{ padding: "20px" }}>
                  {/* Status badge */}
                  {event.status && (
                    <div
                      style={{
                        display: "inline-block",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        letterSpacing: "0.05em",
                        color: event.statusColor,
                        border: `1px solid ${event.statusColor}60`,
                        borderRadius: "4px",
                        padding: "3px 10px",
                        marginBottom: "12px",
                        boxShadow: `0 0 8px ${event.statusColor}30`,
                      }}
                    >
                      {event.status}
                    </div>
                  )}

                  {/* Name */}
                  <h3
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 800,
                      color: "#fff",
                      marginBottom: "8px",
                      letterSpacing: "0.03em",
                    }}
                  >
                    {isUk ? event.nameUk : event.name}
                  </h3>

                  {/* Date + Location */}
                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: event.color,
                      marginBottom: "4px",
                      textShadow: `0 0 8px ${event.color}60`,
                    }}
                  >
                    📅 {isUk ? event.dateUk : event.date}
                  </p>
                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: "#ffffff60",
                      marginBottom: "16px",
                    }}
                  >
                    📍 {isUk ? event.locationUk : event.location}
                  </p>

                  {/* Genre badge + Price */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#ffffff40",
                        border: "1px solid #333",
                        borderRadius: "4px",
                        padding: "3px 10px",
                      }}
                    >
                      {isUk ? event.genreUk : event.genre}
                    </span>
                    <span
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: 800,
                        color: "#fff",
                      }}
                    >
                      {isUk ? "від " : "from "}
                      <NeonText color={event.color}>{event.price}</NeonText>
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {filteredEvents.length === 0 && (
              <div
                style={{
                  gridColumn: "1/-1",
                  textAlign: "center",
                  color: "#ffffff30",
                  padding: "60px",
                  fontSize: "1rem",
                  letterSpacing: "0.1em",
                }}
              >
                {isUk ? "Подій не знайдено" : "No events found"}
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // ─── FEATURED EVENT PAGE ─────────────────────────────────────────────────

  function renderFeaturedEvent() {
    if (!selectedEvent) return null;

    const isBeatWave = selectedEvent.id === 1;

    return (
      <section style={{ background: "#030303", padding: "0" }}>
        {/* Event Hero */}
        <div
          style={{
            minHeight: "60vh",
            background: `linear-gradient(135deg, #000 0%, ${selectedEvent.color}20 50%, #000 100%)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "80px 24px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(ellipse at center, ${selectedEvent.color}15 0%, transparent 60%)`,
              pointerEvents: "none",
            }}
          />
          <button
            onClick={() => setSelectedEvent(null)}
            style={{
              position: "absolute",
              top: "24px",
              left: "24px",
              background: "transparent",
              border: "1px solid #ffffff30",
              color: "#ffffff70",
              cursor: "pointer",
              padding: "8px 16px",
              borderRadius: "4px",
              fontSize: "0.8rem",
              letterSpacing: "0.1em",
              fontFamily: "inherit",
            }}
          >
            ← {isUk ? "Назад" : "Back"}
          </button>

          <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
            <h2
              style={{
                fontSize: "clamp(2rem, 8vw, 5rem)",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "#fff",
                textShadow: `0 0 40px ${selectedEvent.color}60`,
                marginBottom: "16px",
              }}
            >
              {isUk ? selectedEvent.nameUk : selectedEvent.name}
            </h2>
            <p
              style={{
                fontSize: "1rem",
                color: selectedEvent.color,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: "8px",
                textShadow: `0 0 12px ${selectedEvent.color}`,
              }}
            >
              {isUk ? selectedEvent.dateUk : selectedEvent.date}
            </p>
            <p
              style={{
                color: "#ffffff60",
                marginBottom: "40px",
                letterSpacing: "0.1em",
              }}
            >
              📍 {isUk ? selectedEvent.locationUk : selectedEvent.location}
            </p>

            {isBeatWave && (
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  marginBottom: "24px",
                }}
              >
                <CountdownBlock
                  label={isUk ? "днів" : "days"}
                  value={countdownTime.days}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "#00D4FF80",
                    fontSize: "2rem",
                    fontWeight: 900,
                  }}
                >
                  :
                </div>
                <CountdownBlock
                  label={isUk ? "год" : "hrs"}
                  value={countdownTime.hours}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "#00D4FF80",
                    fontSize: "2rem",
                    fontWeight: 900,
                  }}
                >
                  :
                </div>
                <CountdownBlock
                  label={isUk ? "хв" : "min"}
                  value={countdownTime.mins}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "#00D4FF80",
                    fontSize: "2rem",
                    fontWeight: 900,
                  }}
                >
                  :
                </div>
                <CountdownBlock
                  label={isUk ? "сек" : "sec"}
                  value={countdownTime.secs}
                />
              </div>
            )}
          </div>
        </div>

        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "60px 24px" }}>
          {/* Lineup */}
          {isBeatWave && (
            <>
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#fff",
                  marginBottom: "32px",
                }}
              >
                <NeonText color="#BF00FF">
                  {isUk ? "Лайн-ап" : "Line-up"}
                </NeonText>
              </h3>

              {/* Artist scroll */}
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  overflowX: "auto",
                  paddingBottom: "16px",
                  marginBottom: "60px",
                }}
              >
                {ARTISTS.map((artist) => (
                  <div
                    key={artist.id}
                    onClick={() => setSelectedArtist(artist)}
                    style={{
                      flexShrink: 0,
                      width: "150px",
                      background: "#0a0a0a",
                      border: `1px solid ${artist.color}40`,
                      borderRadius: "8px",
                      overflow: "hidden",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      boxShadow: `0 0 16px ${artist.color}15`,
                    }}
                  >
                    {/* Avatar */}
                    <div
                      style={{
                        height: "120px",
                        background: `linear-gradient(135deg, ${artist.color}40, #000)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          width: "60px",
                          height: "60px",
                          borderRadius: "50%",
                          background: `radial-gradient(circle, ${artist.color}80, ${artist.color}20)`,
                          boxShadow: `0 0 20px ${artist.color}80`,
                        }}
                      />
                    </div>
                    <div style={{ padding: "12px" }}>
                      <p
                        style={{
                          fontWeight: 800,
                          fontSize: "0.85rem",
                          color: "#fff",
                          marginBottom: "4px",
                        }}
                      >
                        {artist.name}
                      </p>
                      <p
                        style={{
                          fontSize: "0.7rem",
                          color: artist.color,
                          marginBottom: "4px",
                        }}
                      >
                        {isUk ? artist.genreUk : artist.genre}
                      </p>
                      <p style={{ fontSize: "0.7rem", color: "#ffffff40" }}>
                        {isUk ? `День ${artist.day}` : `Day ${artist.day}`} · {artist.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Schedule grid */}
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#fff",
                  marginBottom: "24px",
                }}
              >
                <NeonText color="#39FF14">
                  {isUk ? "Розклад" : "Schedule"}
                </NeonText>
              </h3>

              {/* Day tabs */}
              <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
                {([1, 2] as const).map((d) => (
                  <button
                    key={d}
                    onClick={() => setActiveDay(d)}
                    style={{
                      padding: "10px 24px",
                      border: `1px solid ${activeDay === d ? "#39FF14" : "#333"}`,
                      background: activeDay === d ? "#39FF1415" : "transparent",
                      color: activeDay === d ? "#39FF14" : "#ffffff50",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      fontSize: "0.8rem",
                      boxShadow: activeDay === d ? "0 0 12px #39FF1440" : "none",
                      transition: "all 0.2s",
                      fontFamily: "inherit",
                    }}
                  >
                    {isUk ? `День ${d}` : `Day ${d}`}
                  </button>
                ))}
              </div>

              <div style={{ marginBottom: "60px" }}>
                {(activeDay === 1 ? DAY1_SCHEDULE : DAY2_SCHEDULE).map(
                  (slot, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        padding: "14px 0",
                        borderBottom: "1px solid #ffffff10",
                      }}
                    >
                      <span
                        style={{
                          fontWeight: 800,
                          fontSize: "0.9rem",
                          color: slot.color !== "#444" && slot.color !== "#555"
                            ? slot.color
                            : "#ffffff40",
                          minWidth: "52px",
                          textShadow:
                            slot.color !== "#444" && slot.color !== "#555"
                              ? `0 0 8px ${slot.color}60`
                              : "none",
                        }}
                      >
                        {slot.time}
                      </span>
                      <div
                        style={{
                          width: "4px",
                          height: "4px",
                          borderRadius: "50%",
                          background:
                            slot.color !== "#444" && slot.color !== "#555"
                              ? slot.color
                              : "#333",
                        }}
                      />
                      <span
                        style={{
                          fontWeight:
                            slot.color !== "#444" && slot.color !== "#555"
                              ? 800
                              : 400,
                          color:
                            slot.color !== "#444" && slot.color !== "#555"
                              ? "#fff"
                              : "#ffffff50",
                          flex: 1,
                        }}
                      >
                        {slot.artist}
                      </span>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          color: "#ffffff40",
                          letterSpacing: "0.1em",
                        }}
                      >
                        {slot.stage}
                      </span>
                    </div>
                  )
                )}
              </div>
            </>
          )}

          {/* Ticket Tiers */}
          <h3
            style={{
              fontSize: "1.5rem",
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#fff",
              marginBottom: "32px",
            }}
          >
            <NeonText color="#00D4FF">
              {isUk ? "Квитки" : "Tickets"}
            </NeonText>
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
              gap: "20px",
              marginBottom: "60px",
            }}
          >
            {TICKET_TIERS.map((tier) => (
              <div
                key={tier.id}
                onClick={() => !tier.sold && setTicketTier(tier.id)}
                style={{
                  background: "#0a0a0a",
                  border: `2px solid ${ticketTier === tier.id
                    ? tier.color
                    : tier.sold
                      ? "#222"
                      : `${tier.color}40`}`,
                  borderRadius: "8px",
                  padding: "24px",
                  cursor: tier.sold ? "not-allowed" : "pointer",
                  opacity: tier.sold ? 0.5 : 1,
                  boxShadow:
                    ticketTier === tier.id
                      ? `0 0 24px ${tier.color}40`
                      : "none",
                  transition: "all 0.2s",
                  position: "relative",
                }}
              >
                {tier.sold && (
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      fontSize: "0.65rem",
                      letterSpacing: "0.1em",
                      color: "#FF3366",
                      border: "1px solid #FF336660",
                      borderRadius: "4px",
                      padding: "2px 8px",
                    }}
                  >
                    SOLD OUT
                  </div>
                )}
                <p
                  style={{
                    fontSize: "0.7rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: tier.sold ? "#555" : tier.color,
                    marginBottom: "8px",
                  }}
                >
                  {isUk ? tier.nameUk : tier.name}
                </p>
                <p
                  style={{
                    fontSize: "1.8rem",
                    fontWeight: 900,
                    color: tier.sold ? "#444" : "#fff",
                    marginBottom: "16px",
                    textShadow:
                      !tier.sold ? `0 0 20px ${tier.color}40` : "none",
                  }}
                >
                  {tier.price}
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {(isUk ? tier.amenitiesUk : tier.amenities).map((a) => (
                    <li
                      key={a}
                      style={{
                        fontSize: "0.78rem",
                        color: tier.sold ? "#444" : "#ffffff70",
                        padding: "4px 0",
                        borderBottom: "1px solid #ffffff08",
                      }}
                    >
                      <span style={{ color: tier.sold ? "#333" : tier.color, marginRight: "8px" }}>✓</span>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Quantity + Add to cart */}
          {ticketTier && (
            <div
              style={{
                background: "#0a0a0a",
                border: "1px solid #00D4FF30",
                borderRadius: "8px",
                padding: "32px",
                display: "flex",
                gap: "24px",
                alignItems: "center",
                flexWrap: "wrap",
                marginBottom: "60px",
                boxShadow: "0 0 30px #00D4FF10",
              }}
            >
              <div>
                <p style={{ color: "#ffffff60", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "8px" }}>
                  {isUk ? "Кількість" : "Quantity"}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <button
                    onClick={() => setTicketQty((q) => Math.max(1, q - 1))}
                    style={{
                      width: "36px",
                      height: "36px",
                      border: "1px solid #333",
                      background: "transparent",
                      color: "#fff",
                      cursor: "pointer",
                      borderRadius: "4px",
                      fontSize: "1.2rem",
                      fontFamily: "inherit",
                    }}
                  >
                    −
                  </button>
                  <span style={{ fontSize: "1.4rem", fontWeight: 800, color: "#00D4FF", minWidth: "24px", textAlign: "center" }}>
                    {ticketQty}
                  </span>
                  <button
                    onClick={() => setTicketQty((q) => Math.min(6, q + 1))}
                    style={{
                      width: "36px",
                      height: "36px",
                      border: "1px solid #333",
                      background: "transparent",
                      color: "#fff",
                      cursor: "pointer",
                      borderRadius: "4px",
                      fontSize: "1.2rem",
                      fontFamily: "inherit",
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ color: "#ffffff60", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "4px" }}>
                  {isUk ? "Підсумок" : "Subtotal"}
                </p>
                <p style={{ fontSize: "1.8rem", fontWeight: 900, color: "#fff" }}>
                  ₴
                  {(
                    parseInt(
                      (TICKET_TIERS.find((t) => t.id === ticketTier)?.price ?? "0").replace(
                        /[₴,]/g,
                        ""
                      )
                    ) * ticketQty
                  ).toLocaleString()}
                </p>
              </div>
              <GlowButton color="#00D4FF" onClick={handleAddToCart}>
                {isUk ? "Додати до кошика" : "Add to Cart"}
              </GlowButton>
            </div>
          )}

          {/* Location info */}
          <div
            style={{
              background: "#0a0a0a",
              border: "1px solid #ffffff10",
              borderRadius: "8px",
              padding: "32px",
            }}
          >
            <h4
              style={{
                fontSize: "1rem",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#fff",
                marginBottom: "16px",
              }}
            >
              <NeonText color="#39FF14">
                {isUk ? "Локація" : "Location"}
              </NeonText>
            </h4>
            <p style={{ color: "#ffffff80", marginBottom: "8px", fontSize: "0.9rem" }}>
              📍 {isUk ? selectedEvent.locationUk : selectedEvent.location}
            </p>
            <p style={{ color: "#ffffff40", fontSize: "0.85rem", lineHeight: 1.6 }}>
              {isUk
                ? "Двері відчиняються о 14:00. Рекомендуємо приїхати завчасно. Парковка доступна поруч. Метро: ст. Лівобережна (10 хв пішки)."
                : "Doors open at 14:00. We recommend arriving early. Parking available nearby. Metro: Livoberezhna station (10 min walk)."}
            </p>
          </div>
        </div>
      </section>
    );
  }

  // ─── CART & CHECKOUT ─────────────────────────────────────────────────────

  function renderCart() {
    if (purchaseStep === "success") {
      return (
        <section
          style={{
            background: "#000",
            minHeight: "60vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "80px 24px",
          }}
        >
          <div
            style={{
              textAlign: "center",
              maxWidth: "480px",
              background: "#0a0a0a",
              border: "1px solid #39FF1440",
              borderRadius: "12px",
              padding: "60px 40px",
              boxShadow: "0 0 60px #39FF1420",
            }}
          >
            {/* QR placeholder */}
            <div
              style={{
                width: "160px",
                height: "160px",
                background: "#fff",
                margin: "0 auto 32px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.7rem",
                color: "#000",
                letterSpacing: "0.1em",
              }}
            >
              {/* QR mock grid */}
              <div
                style={{
                  width: "120px",
                  height: "120px",
                  backgroundImage:
                    "repeating-linear-gradient(0deg, #000 0, #000 8px, transparent 8px, transparent 16px), repeating-linear-gradient(90deg, #000 0, #000 8px, transparent 8px, transparent 16px)",
                  backgroundSize: "16px 16px",
                }}
              />
            </div>

            <NeonText color="#39FF14">
              <p style={{ fontSize: "1.8rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>
                {isUk ? "Успіх!" : "Success!"}
              </p>
            </NeonText>
            <p style={{ color: "#ffffff60", marginBottom: "24px", lineHeight: 1.6, fontSize: "0.9rem" }}>
              {isUk
                ? "Ваші квитки надіслані на email. Збережіть QR-код для входу на захід."
                : "Your tickets have been sent to your email. Save this QR code for event entry."}
            </p>
            <GlowButton
              color="#00D4FF"
              onClick={() => {
                setPurchaseStep("catalog");
                setCartItems([]);
                setTicketTier("");
                setTicketQty(1);
                setFormData({ name: "", email: "", phone: "" });
              }}
            >
              {isUk ? "На головну" : "Back to events"}
            </GlowButton>
          </div>
        </section>
      );
    }

    if (purchaseStep === "checkout") {
      return (
        <section style={{ background: "#000", padding: "80px 24px" }}>
          <div style={{ maxWidth: "520px", margin: "0 auto" }}>
            <button
              onClick={() => setPurchaseStep("cart")}
              style={{
                background: "transparent",
                border: "1px solid #333",
                color: "#ffffff60",
                cursor: "pointer",
                padding: "8px 16px",
                borderRadius: "4px",
                fontSize: "0.8rem",
                marginBottom: "32px",
                letterSpacing: "0.1em",
                fontFamily: "inherit",
              }}
            >
              ← {isUk ? "Назад до кошика" : "Back to cart"}
            </button>

            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#fff",
                marginBottom: "32px",
              }}
            >
              <NeonText color="#00D4FF">
                {isUk ? "Оформлення" : "Checkout"}
              </NeonText>
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                { key: "name", label: isUk ? "Ім'я та прізвище" : "Full name", type: "text", placeholder: isUk ? "Іван Петренко" : "John Doe" },
                { key: "email", label: "Email", type: "email", placeholder: "you@example.com" },
                { key: "phone", label: isUk ? "Телефон" : "Phone", type: "tel", placeholder: "+380 xx xxx xx xx" },
              ].map(({ key, label, type, placeholder }) => (
                <div key={key}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.75rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "#ffffff60",
                      marginBottom: "8px",
                    }}
                  >
                    {label}
                  </label>
                  <input
                    type={type}
                    value={formData[key as keyof typeof formData]}
                    onChange={(e) =>
                      setFormData((f) => ({ ...f, [key]: e.target.value }))
                    }
                    placeholder={placeholder}
                    style={{
                      width: "100%",
                      background: "#0a0a0a",
                      border: "1px solid #333",
                      borderRadius: "4px",
                      padding: "12px 16px",
                      color: "#fff",
                      fontSize: "0.9rem",
                      outline: "none",
                      fontFamily: "inherit",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: "32px",
                padding: "20px",
                background: "#0a0a0a",
                border: "1px solid #ffffff10",
                borderRadius: "8px",
                marginBottom: "24px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ color: "#ffffff60", fontSize: "0.85rem" }}>
                  {isUk ? "Сума" : "Subtotal"}
                </span>
                <span style={{ color: "#fff", fontWeight: 700 }}>
                  ₴{cartTotal.toLocaleString()}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#ffffff60", fontSize: "0.85rem" }}>
                  {isUk ? "Комісія сервісу" : "Service fee"}
                </span>
                <span style={{ color: "#fff", fontWeight: 700 }}>
                  ₴{Math.round(cartTotal * 0.05).toLocaleString()}
                </span>
              </div>
              <div
                style={{
                  borderTop: "1px solid #ffffff15",
                  marginTop: "12px",
                  paddingTop: "12px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ color: "#fff", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.85rem" }}>
                  {isUk ? "Разом" : "Total"}
                </span>
                <NeonText color="#00D4FF">
                  <span style={{ fontSize: "1.2rem", fontWeight: 900 }}>
                    ₴{Math.round(cartTotal * 1.05).toLocaleString()}
                  </span>
                </NeonText>
              </div>
            </div>

            <GlowButton
              color="#00D4FF"
              onClick={() => setPurchaseStep("success")}
            >
              {isUk ? "Оплатити" : "Pay now"}
            </GlowButton>
          </div>
        </section>
      );
    }

    if (purchaseStep === "cart" && cartItems.length > 0) {
      return (
        <section style={{ background: "#000", padding: "80px 24px" }}>
          <div style={{ maxWidth: "640px", margin: "0 auto" }}>
            <button
              onClick={() => setPurchaseStep("catalog")}
              style={{
                background: "transparent",
                border: "1px solid #333",
                color: "#ffffff60",
                cursor: "pointer",
                padding: "8px 16px",
                borderRadius: "4px",
                fontSize: "0.8rem",
                marginBottom: "32px",
                letterSpacing: "0.1em",
                fontFamily: "inherit",
              }}
            >
              ← {isUk ? "Продовжити покупки" : "Continue shopping"}
            </button>

            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#fff",
                marginBottom: "32px",
              }}
            >
              <NeonText color="#00D4FF">
                {isUk ? "Кошик" : "Cart"}
              </NeonText>
            </h3>

            {cartItems.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "20px 0",
                  borderBottom: "1px solid #ffffff10",
                  gap: "16px",
                }}
              >
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 800, color: "#fff", marginBottom: "4px" }}>
                    BeatWave Festival — {isUk ? item.tierUk : item.tier}
                  </p>
                  <p style={{ color: "#ffffff50", fontSize: "0.8rem" }}>
                    {isUk ? `${item.qty} квит.` : `${item.qty} ticket${item.qty > 1 ? "s" : ""}`} × ₴{item.price.toLocaleString()}
                  </p>
                </div>
                <div style={{ fontWeight: 900, fontSize: "1.1rem", color: "#00D4FF" }}>
                  ₴{(item.price * item.qty).toLocaleString()}
                </div>
                <button
                  onClick={() =>
                    setCartItems((prev) => prev.filter((_, idx) => idx !== i))
                  }
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#FF3366",
                    cursor: "pointer",
                    fontSize: "1.1rem",
                    padding: "4px",
                    fontFamily: "inherit",
                  }}
                >
                  ×
                </button>
              </div>
            ))}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "20px 0",
                marginBottom: "32px",
              }}
            >
              <span style={{ fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#fff" }}>
                {isUk ? "Разом" : "Total"}
              </span>
              <NeonText color="#00D4FF">
                <span style={{ fontSize: "1.4rem", fontWeight: 900 }}>
                  ₴{cartTotal.toLocaleString()}
                </span>
              </NeonText>
            </div>

            <GlowButton
              color="#00D4FF"
              onClick={() => setPurchaseStep("checkout")}
            >
              {isUk ? "Перейти до оплати" : "Proceed to checkout"}
            </GlowButton>
          </div>
        </section>
      );
    }

    return null;
  }

  // ─── ARTIST PAGE ─────────────────────────────────────────────────────────

  function renderArtistPage() {
    if (!selectedArtist) return null;
    const a = selectedArtist;

    return (
      <section style={{ background: "#000", padding: "0" }}>
        {/* Artist hero */}
        <div
          style={{
            background: `linear-gradient(135deg, #000 0%, ${a.color}25 50%, #000 100%)`,
            padding: "80px 24px 60px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(ellipse at center, ${a.color}12 0%, transparent 60%)`,
              pointerEvents: "none",
            }}
          />
          <button
            onClick={() => setSelectedArtist(null)}
            style={{
              background: "transparent",
              border: "1px solid #ffffff30",
              color: "#ffffff70",
              cursor: "pointer",
              padding: "8px 16px",
              borderRadius: "4px",
              fontSize: "0.8rem",
              marginBottom: "40px",
              letterSpacing: "0.1em",
              display: "block",
              fontFamily: "inherit",
            }}
          >
            ← {isUk ? "Назад до лайн-апу" : "Back to lineup"}
          </button>

          <div
            style={{
              position: "relative",
              zIndex: 1,
              display: "flex",
              gap: "40px",
              alignItems: "center",
              flexWrap: "wrap",
              maxWidth: "1100px",
              margin: "0 auto",
            }}
          >
            {/* Avatar */}
            <div
              style={{
                width: "160px",
                height: "160px",
                borderRadius: "50%",
                background: `radial-gradient(circle, ${a.color}60, ${a.color}10)`,
                boxShadow: `0 0 60px ${a.color}60`,
                flexShrink: 0,
              }}
            />
            <div>
              <h2
                style={{
                  fontSize: "clamp(2rem, 6vw, 4rem)",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  color: "#fff",
                  textShadow: `0 0 40px ${a.color}60`,
                  marginBottom: "8px",
                }}
              >
                {a.name}
              </h2>
              <p
                style={{
                  color: a.color,
                  fontSize: "1rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                  textShadow: `0 0 12px ${a.color}`,
                }}
              >
                {isUk ? a.genreUk : a.genre}
              </p>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <span
                  style={{
                    fontSize: "0.8rem",
                    color: "#ffffff60",
                    border: "1px solid #333",
                    borderRadius: "4px",
                    padding: "4px 12px",
                  }}
                >
                  🎤 {isUk ? a.stageUk : a.stage}
                </span>
                <span
                  style={{
                    fontSize: "0.8rem",
                    color: a.color,
                    border: `1px solid ${a.color}40`,
                    borderRadius: "4px",
                    padding: "4px 12px",
                  }}
                >
                  ⏰ {a.time}
                </span>
                <span
                  style={{
                    fontSize: "0.8rem",
                    color: "#ffffff60",
                    border: "1px solid #333",
                    borderRadius: "4px",
                    padding: "4px 12px",
                  }}
                >
                  {isUk ? `День ${a.day}` : `Day ${a.day}`}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "60px 24px" }}>
          {/* Bio */}
          <div style={{ marginBottom: "48px" }}>
            <h3
              style={{
                fontSize: "1rem",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "#ffffff60",
                marginBottom: "16px",
              }}
            >
              {isUk ? "Про артиста" : "About"}
            </h3>
            <p style={{ color: "#ffffff80", lineHeight: 1.7, fontSize: "1rem", maxWidth: "700px" }}>
              {isUk ? a.bioUk : a.bio}
            </p>
          </div>

          {/* Setlist */}
          <div style={{ marginBottom: "48px" }}>
            <h3
              style={{
                fontSize: "1rem",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "#ffffff60",
                marginBottom: "16px",
              }}
            >
              <NeonText color={a.color}>
                {isUk ? "Сетліст" : "Setlist"}
              </NeonText>
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {a.setlist.map((track, i) => (
                <div
                  key={track}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "12px 0",
                    borderBottom: "1px solid #ffffff08",
                  }}
                >
                  <span style={{ color: "#ffffff20", minWidth: "24px", fontSize: "0.85rem" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span style={{ color: "#fff", fontWeight: 600, fontSize: "0.95rem" }}>
                    {track}
                  </span>
                  <span
                    style={{
                      marginLeft: "auto",
                      color: a.color,
                      fontSize: "0.8rem",
                    }}
                  >
                    ♪
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Past performance photos */}
          <div>
            <h3
              style={{
                fontSize: "1rem",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "#ffffff60",
                marginBottom: "16px",
              }}
            >
              {isUk ? "Фото виступів" : "Past Performances"}
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "12px",
              }}
            >
              {[
                { bg: `linear-gradient(135deg, ${a.color}40, #000)`, label: isUk ? "Берлін 2024" : "Berlin 2024" },
                { bg: `linear-gradient(225deg, ${a.color}30, #111)`, label: isUk ? "Барселона 2024" : "Barcelona 2024" },
                { bg: `linear-gradient(45deg, #000, ${a.color}35)`, label: isUk ? "Амстердам 2023" : "Amsterdam 2023" },
              ].map((photo) => (
                <div
                  key={photo.label}
                  style={{
                    height: "120px",
                    background: photo.bg,
                    borderRadius: "6px",
                    display: "flex",
                    alignItems: "flex-end",
                    padding: "10px",
                    border: `1px solid ${a.color}20`,
                  }}
                >
                  <span style={{ fontSize: "0.7rem", color: "#ffffff60", letterSpacing: "0.05em" }}>
                    {photo.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ─── FOOTER ──────────────────────────────────────────────────────────────

  function renderFooter() {
    return (
      <footer
        style={{
          background: "#000",
          borderTop: "1px solid #ffffff10",
          padding: "60px 24px 32px",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "40px",
              marginBottom: "48px",
            }}
          >
            {/* Brand */}
            <div>
              <div style={{ marginBottom: "16px" }}>
                <NeonText color="#00D4FF">
                  <span style={{ fontSize: "1.5rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    Beat
                  </span>
                </NeonText>
                <NeonText color="#39FF14">
                  <span style={{ fontSize: "1.5rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    Wave
                  </span>
                </NeonText>
              </div>
              <p style={{ color: "#ffffff40", fontSize: "0.85rem", lineHeight: 1.6 }}>
                {isUk
                  ? "Найбільший електронний фестиваль України."
                  : "Ukraine's largest electronic music festival."}
              </p>
            </div>

            {/* Links */}
            <div>
              <p style={{ color: "#ffffff40", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "16px" }}>
                {isUk ? "Навігація" : "Navigate"}
              </p>
              {[
                { en: "Events", uk: "Події" },
                { en: "Artists", uk: "Артисти" },
                { en: "Tickets", uk: "Квитки" },
                { en: "About", uk: "Про нас" },
              ].map(({ en, uk }) => (
                <p key={en} style={{ marginBottom: "8px" }}>
                  <span
                    style={{
                      color: "#ffffff50",
                      fontSize: "0.85rem",
                      cursor: "pointer",
                      transition: "color 0.2s",
                    }}
                  >
                    {isUk ? uk : en}
                  </span>
                </p>
              ))}
            </div>

            {/* Social */}
            <div>
              <p style={{ color: "#ffffff40", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "16px" }}>
                {isUk ? "Соцмережі" : "Social"}
              </p>
              {[
                { name: "Instagram", color: "#BF00FF", icon: "📸" },
                { name: "TikTok", color: "#00D4FF", icon: "🎵" },
                { name: "Facebook", color: "#39FF14", icon: "📘" },
                { name: "YouTube", color: "#FF3366", icon: "▶️" },
                { name: "Telegram", color: "#00D4FF", icon: "✈️" },
              ].map((s) => (
                <p key={s.name} style={{ marginBottom: "8px" }}>
                  <span
                    style={{
                      color: s.color,
                      fontSize: "0.85rem",
                      cursor: "pointer",
                      textShadow: `0 0 8px ${s.color}60`,
                    }}
                  >
                    {s.icon} {s.name}
                  </span>
                </p>
              ))}
            </div>

            {/* Newsletter */}
            <div>
              <p style={{ color: "#ffffff40", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "16px" }}>
                {isUk ? "Підписка" : "Newsletter"}
              </p>
              <p style={{ color: "#ffffff50", fontSize: "0.8rem", marginBottom: "12px", lineHeight: 1.5 }}>
                {isUk ? "Отримуй анонси першим" : "Get announcements first"}
              </p>
              <div style={{ display: "flex", gap: "8px" }}>
                <input
                  type="email"
                  placeholder="Email"
                  style={{
                    flex: 1,
                    background: "#0a0a0a",
                    border: "1px solid #333",
                    borderRadius: "4px",
                    padding: "10px 12px",
                    color: "#fff",
                    fontSize: "0.8rem",
                    outline: "none",
                    fontFamily: "inherit",
                    minWidth: 0,
                  }}
                />
                <GlowButton color="#00D4FF" small>
                  →
                </GlowButton>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            style={{
              borderTop: "1px solid #ffffff08",
              paddingTop: "24px",
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <p style={{ color: "#ffffff20", fontSize: "0.75rem" }}>
              © 2025 BeatWave Festival.{" "}
              {isUk ? "Всі права захищені." : "All rights reserved."}
            </p>
            <p style={{ color: "#ffffff20", fontSize: "0.75rem" }}>
              {isUk ? "Демо-сайт від " : "Demo by "}
              <span style={{ color: "#00D4FF40" }}>Codeworth</span>
            </p>
          </div>
        </div>
      </footer>
    );
  }

  // ─── RENDER ───────────────────────────────────────────────────────────────

  return (
    <div
      style={{
        fontFamily:
          "'Arial Black', 'Impact', 'Haettenschweiler', 'Franklin Gothic Bold', sans-serif",
        background: "#000",
        color: "#fff",
        minHeight: "100vh",
      }}
    >
      {/* Artist page overlay */}
      {selectedArtist ? (
        <>
          {renderArtistPage()}
          {renderFooter()}
        </>
      ) : (
        <>
          {/* Hero always visible */}
          {renderHero()}

          {/* Cart / checkout flow */}
          {purchaseStep !== "catalog" && renderCart()}

          {/* Featured event (if selected) */}
          {selectedEvent && purchaseStep === "catalog" && renderFeaturedEvent()}

          {/* Events catalog */}
          {renderCatalog()}

          {renderFooter()}
        </>
      )}
    </div>
  );
}
