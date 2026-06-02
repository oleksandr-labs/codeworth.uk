"use client";

import { useState } from "react";

export function FunZoneDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  // --- State ---
  const [activeCategory, setActiveCategory] = useState<string>("quests");
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [bookingStep, setBookingStep] = useState<number>(1);
  const [bookingData, setBookingData] = useState<{
    attraction: string;
    date: string;
    slot: string;
    guests: number;
    name: string;
    phone: string;
    email: string;
  }>({
    attraction: "",
    date: "",
    slot: "",
    guests: 2,
    name: "",
    phone: "",
    email: "",
  });
  const [countdownSeconds, setCountdownSeconds] = useState<number>(23 * 60);
  const [selectedDate, setSelectedDate] = useState<number>(0);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [guestCount, setGuestCount] = useState<number>(2);
  const [loyaltyTab, setLoyaltyTab] = useState<"basic" | "silver" | "gold">("basic");
  const [groupForm, setGroupForm] = useState<{ name: string; phone: string; package: string; comment: string }>({
    name: "",
    phone: "",
    package: "birthday",
    comment: "",
  });
  const [contactForm, setContactForm] = useState<{ name: string; phone: string; message: string }>({
    name: "",
    phone: "",
    message: "",
  });
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);

  // --- Countdown tick ---
  // We simulate a live countdown by deriving display from countdownSeconds via a visual only
  const countdownMin = Math.floor(countdownSeconds / 60);
  const countdownSec = countdownSeconds % 60;

  // --- Data ---
  const questRooms = [
    {
      id: "lab-fear",
      name: isUk ? "Лабораторія Страху" : "Lab of Fear",
      genre: isUk ? "Жахи" : "Horror",
      genreColor: "#FF0080",
      themeBg: "linear-gradient(135deg, #1a0010 0%, #3d0020 100%)",
      players: isUk ? "2–6 гравців" : "2–6 players",
      duration: isUk ? "60 хв" : "60 min",
      difficulty: isUk ? "Складно" : "Hard",
      diffColor: "#FF4444",
      exitRate: 23,
      story: isUk
        ? "Вчений-дослідник зник у власній лабораторії. Ви маєте 60 хвилин, щоб знайти антидот і вибратися живими."
        : "A researcher vanished in his own lab. You have 60 minutes to find the antidote and escape alive.",
    },
    {
      id: "pirate",
      name: isUk ? "Скарби Пірата" : "Pirate's Treasure",
      genre: isUk ? "Пригоди" : "Adventure",
      genreColor: "#FFD700",
      themeBg: "linear-gradient(135deg, #1a1200 0%, #3d2a00 100%)",
      players: isUk ? "2–8 гравців" : "2–8 players",
      duration: isUk ? "90 хв" : "90 min",
      difficulty: isUk ? "Легко" : "Easy",
      diffColor: "#44FF88",
      exitRate: 81,
      story: isUk
        ? "Старовинна карта веде вас до острова скарбів. Але пастки капітана Блека все ще чекають на необережних."
        : "An ancient map leads you to a treasure island. But Captain Black's traps still await the careless.",
    },
    {
      id: "manor",
      name: isUk ? "Вбивство в Маєтку" : "Murder at the Manor",
      genre: isUk ? "Детектив" : "Detective",
      genreColor: "#00CFFF",
      themeBg: "linear-gradient(135deg, #001a1f 0%, #003d4a 100%)",
      players: isUk ? "2–6 гравців" : "2–6 players",
      duration: isUk ? "60 хв" : "60 min",
      difficulty: isUk ? "Середньо" : "Medium",
      diffColor: "#FFD700",
      exitRate: 54,
      story: isUk
        ? "Лорд Блекмор мертвий. Усі підозрювані в маєтку. Ви — детектив, якому потрібно розкрити справу до ранку."
        : "Lord Blackmore is dead. All suspects are in the manor. You are the detective who must solve the case by dawn.",
    },
    {
      id: "cyberpunk",
      name: isUk ? "Кіберпанк 2087" : "Cyberpunk 2087",
      genre: isUk ? "Фантастика" : "Sci-Fi",
      genreColor: "#FF0080",
      themeBg: "linear-gradient(135deg, #08001a 0%, #1a003d 100%)",
      players: isUk ? "2–5 гравців" : "2–5 players",
      duration: isUk ? "75 хв" : "75 min",
      difficulty: isUk ? "Складно" : "Hard",
      diffColor: "#FF4444",
      exitRate: 31,
      story: isUk
        ? "Мегакорпорація захопила місто. Ваша команда хакерів має знешкодити ШІ-диктатора зсередини системи."
        : "A megacorp has seized the city. Your hacker team must neutralize the AI dictator from inside the system.",
    },
  ];

  const categories = [
    { id: "quests", label: isUk ? "Квест-кімнати" : "Quest Rooms", icon: "🎯" },
    { id: "bowling", label: isUk ? "Боулінг" : "Bowling", icon: "🎳" },
    { id: "arcade", label: isUk ? "Аркади" : "Arcade", icon: "🕹" },
    { id: "vr", label: "VR", icon: "🥽" },
    { id: "trampoline", label: isUk ? "Батут-Парк" : "Trampoline Park", icon: "🤸" },
  ];

  const otherActivities: Record<string, { id: string; name: string; description: string; price: string }[]> = {
    bowling: [
      {
        id: "bowling-1",
        name: isUk ? "Стандартна Гра" : "Standard Game",
        description: isUk ? "1 година, до 6 гравців, включає взуття" : "1 hour, up to 6 players, shoes included",
        price: "₴380/год",
      },
      {
        id: "bowling-2",
        name: isUk ? "Вечірній Боулінг" : "Evening Bowling",
        description: isUk ? "Неонове освітлення, музика, 2 год" : "Neon lighting, music, 2 hours",
        price: "₴620/год",
      },
      {
        id: "bowling-3",
        name: isUk ? "Дитячий Боулінг" : "Kids Bowling",
        description: isUk ? "Полегшені кулі, пандуси, до 8 дітей" : "Lightweight balls, ramps, up to 8 kids",
        price: "₴280/год",
      },
      {
        id: "bowling-4",
        name: isUk ? "Турнір" : "Tournament",
        description: isUk ? "Змагання 8–16 гравців, призи" : "Competition for 8–16 players, prizes",
        price: "₴1,200",
      },
    ],
    arcade: [
      {
        id: "arcade-1",
        name: isUk ? "Пакет Токенів S" : "Token Pack S",
        description: isUk ? "20 токенів для аркадних автоматів" : "20 tokens for arcade machines",
        price: "₴100",
      },
      {
        id: "arcade-2",
        name: isUk ? "Пакет Токенів M" : "Token Pack M",
        description: isUk ? "50 токенів + 10 бонусних" : "50 tokens + 10 bonus",
        price: "₴220",
      },
      {
        id: "arcade-3",
        name: isUk ? "Пакет Токенів L" : "Token Pack L",
        description: isUk ? "100 токенів + 30 бонусних" : "100 tokens + 30 bonus",
        price: "₴380",
      },
      {
        id: "arcade-4",
        name: isUk ? "День без обмежень" : "Unlimited Day",
        description: isUk ? "Необмежений доступ до аркад, 4 год" : "Unlimited arcade access, 4 hours",
        price: "₴480",
      },
    ],
    vr: [
      {
        id: "vr-1",
        name: isUk ? "VR Пригода (30 хв)" : "VR Adventure (30 min)",
        description: isUk ? "Одиночна або парна сесія" : "Solo or duo session",
        price: "₴320",
      },
      {
        id: "vr-2",
        name: isUk ? "VR Бій (45 хв)" : "VR Battle (45 min)",
        description: isUk ? "Командна битва до 4 гравців" : "Team battle up to 4 players",
        price: "₴560",
      },
      {
        id: "vr-3",
        name: isUk ? "VR Гонки (30 хв)" : "VR Racing (30 min)",
        description: isUk ? "Симулятор гоночного автомобіля" : "Racing car simulator",
        price: "₴280",
      },
      {
        id: "vr-4",
        name: isUk ? "VR Хоррор (45 хв)" : "VR Horror (45 min)",
        description: isUk ? "Занурення в жахіття, 18+" : "Immersive horror, 18+",
        price: "₴400",
      },
    ],
    trampoline: [
      {
        id: "tramp-1",
        name: isUk ? "Стрибки (1 год)" : "Jump Session (1 hr)",
        description: isUk ? "Вільні стрибки на всій арені" : "Free jumping across the full arena",
        price: "₴280",
      },
      {
        id: "tramp-2",
        name: isUk ? "Батут + Піна (1 год)" : "Jump + Foam Pit (1 hr)",
        description: isUk ? "Арена + яма з поролоном" : "Arena + foam pit access",
        price: "₴340",
      },
      {
        id: "tramp-3",
        name: isUk ? "Дитяча Зона (1 год)" : "Kids Zone (1 hr)",
        description: isUk ? "До 12 років, з інструктором" : "Up to age 12, with instructor",
        price: "₴220",
      },
      {
        id: "tramp-4",
        name: isUk ? "Акробатика (45 хв)" : "Acrobatics (45 min)",
        description: isUk ? "З тренером, базові трюки" : "With coach, basic tricks",
        price: "₴460",
      },
    ],
  };

  const timeSlots = ["10:00", "11:30", "13:00", "14:30", "16:00", "17:30", "19:00", "20:30"];
  const occupiedSlots: Record<number, string[]> = {
    0: ["10:00", "13:00", "16:00", "19:00"],
    1: ["11:30", "14:30", "17:30"],
    2: ["10:00", "16:00"],
  };

  const today = new Date();
  const dates = [0, 1, 2].map((i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d;
  });

  const formatDate = (d: Date) =>
    d.toLocaleDateString(isUk ? "uk-UA" : "en-GB", { weekday: "short", month: "short", day: "numeric" });

  // Booking flow attractions
  const attractionOptions = [
    { id: "quest-lab", label: isUk ? "Лабораторія Страху" : "Lab of Fear" },
    { id: "quest-pirate", label: isUk ? "Скарби Пірата" : "Pirate's Treasure" },
    { id: "quest-manor", label: isUk ? "Вбивство в Маєтку" : "Murder at the Manor" },
    { id: "quest-cyber", label: isUk ? "Кіберпанк 2087" : "Cyberpunk 2087" },
    { id: "bowling-std", label: isUk ? "Боулінг (Стандарт)" : "Bowling (Standard)" },
    { id: "vr-adv", label: isUk ? "VR Пригода" : "VR Adventure" },
    { id: "tramp-jump", label: isUk ? "Батут-Парк" : "Trampoline Park" },
  ];

  const selectedRoomData = questRooms.find((r) => r.id === selectedRoom);

  return (
    <div
      style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#08080F", color: "#e8e8f0", minHeight: "100vh" }}
    >
      {/* ================================================================ */}
      {/* 1. HERO */}
      {/* ================================================================ */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          padding: "2rem 1rem",
          textAlign: "center",
        }}
      >
        {/* Neon glow decorations */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "5%",
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,0,128,0.15) 0%, transparent 70%)",
            boxShadow: "0 0 80px 40px rgba(255,0,128,0.12)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "15%",
            right: "8%",
            width: 260,
            height: 260,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,207,255,0.15) 0%, transparent 70%)",
            boxShadow: "0 0 80px 40px rgba(0,207,255,0.12)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "55%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,215,0,0.04) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: "inline-block",
            border: "1px solid #FF0080",
            color: "#FF0080",
            padding: "0.3rem 1rem",
            borderRadius: 999,
            fontSize: "0.75rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: "1.5rem",
            boxShadow: "0 0 12px rgba(255,0,128,0.4)",
          }}
        >
          {isUk ? "Розважальний центр №1 у місті" : "City's #1 Entertainment Center"}
        </div>

        {/* Headline */}
        <h1
          style={{
            fontSize: "clamp(2rem, 6vw, 4.5rem)",
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: "1.5rem",
            maxWidth: 800,
            textShadow: "0 0 40px rgba(255,0,128,0.6), 0 0 80px rgba(0,207,255,0.3)",
          }}
        >
          <span style={{ color: "#FF0080" }}>
            {isUk ? "Незабутні враження" : "Unforgettable Experiences"}
          </span>
          <br />
          <span style={{ color: "#00CFFF" }}>{isUk ? "— тут!" : "— Here!"}</span>
        </h1>

        <p
          style={{
            fontSize: "1.15rem",
            color: "#a0a0c0",
            maxWidth: 560,
            marginBottom: "2.5rem",
            lineHeight: 1.6,
          }}
        >
          {isUk
            ? "Квести, боулінг, аркади, VR та батут-парк — все під одним дахом. Бронюйте прямо зараз!"
            : "Quests, bowling, arcades, VR, and a trampoline park — all under one roof. Book right now!"}
        </p>

        {/* Attraction icons */}
        <div
          style={{
            display: "flex",
            gap: "2rem",
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: "2.5rem",
          }}
        >
          {[
            { icon: "🎯", label: isUk ? "Квести" : "Quests" },
            { icon: "🎳", label: isUk ? "Боулінг" : "Bowling" },
            { icon: "🕹", label: isUk ? "Аркади" : "Arcade" },
            { icon: "🎰", label: isUk ? "Симулятори" : "Simulators" },
          ].map(({ icon, label }) => (
            <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem" }}>
              <div
                style={{
                  fontSize: "2.2rem",
                  width: 64,
                  height: 64,
                  borderRadius: 16,
                  background: "rgba(255,0,128,0.08)",
                  border: "1px solid rgba(255,0,128,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 20px rgba(255,0,128,0.2)",
                }}
              >
                {icon}
              </div>
              <span
                style={{
                  fontSize: "0.8rem",
                  color: "#FF0080",
                  fontWeight: 700,
                  textShadow: "0 0 8px rgba(255,0,128,0.6)",
                  letterSpacing: "0.05em",
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center", marginBottom: "2.5rem" }}>
          <button
            onClick={() => setBookingStep(1)}
            style={{
              background: "#FF0080",
              color: "#fff",
              border: "none",
              padding: "0.9rem 2.2rem",
              borderRadius: 8,
              fontSize: "1rem",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 0 24px rgba(255,0,128,0.6), 0 4px 16px rgba(255,0,128,0.4)",
              letterSpacing: "0.04em",
              transition: "transform 0.15s",
            }}
          >
            {isUk ? "Забронювати Зараз" : "Book Now"}
          </button>
          <button
            onClick={() => setActiveCategory("quests")}
            style={{
              background: "transparent",
              color: "#00CFFF",
              border: "2px solid #00CFFF",
              padding: "0.9rem 2.2rem",
              borderRadius: 8,
              fontSize: "1rem",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 0 16px rgba(0,207,255,0.3)",
              letterSpacing: "0.04em",
            }}
          >
            {isUk ? "Дізнатись Більше" : "Learn More"}
          </button>
        </div>

        {/* Countdown */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.8rem",
            background: "rgba(255,215,0,0.07)",
            border: "1px solid rgba(255,215,0,0.35)",
            borderRadius: 12,
            padding: "0.7rem 1.4rem",
            boxShadow: "0 0 20px rgba(255,215,0,0.15)",
          }}
        >
          <span style={{ fontSize: "1.3rem" }}>⏱</span>
          <span style={{ color: "#ccc", fontSize: "0.9rem" }}>
            {isUk ? "Наступна сесія Квесту: через" : "Next Quest session: in"}
          </span>
          <span
            style={{
              color: "#FFD700",
              fontWeight: 800,
              fontSize: "1.1rem",
              fontVariantNumeric: "tabular-nums",
              textShadow: "0 0 10px rgba(255,215,0,0.7)",
            }}
          >
            {countdownMin}:{countdownSec.toString().padStart(2, "0")}
          </span>
          <button
            onClick={() => setCountdownSeconds((s) => Math.max(0, s - 60))}
            style={{
              background: "rgba(255,215,0,0.15)",
              border: "1px solid rgba(255,215,0,0.3)",
              color: "#FFD700",
              borderRadius: 6,
              padding: "0.2rem 0.6rem",
              fontSize: "0.7rem",
              cursor: "pointer",
            }}
          >
            −1m
          </button>
          <button
            onClick={() => setCountdownSeconds(23 * 60)}
            style={{
              background: "rgba(255,215,0,0.15)",
              border: "1px solid rgba(255,215,0,0.3)",
              color: "#FFD700",
              borderRadius: 6,
              padding: "0.2rem 0.6rem",
              fontSize: "0.7rem",
              cursor: "pointer",
            }}
          >
            ↺
          </button>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 2. ATTRACTIONS GRID */}
      {/* ================================================================ */}
      <section style={{ padding: "4rem 1.5rem", maxWidth: 1100, margin: "0 auto" }}>
        <h2
          style={{
            textAlign: "center",
            fontSize: "clamp(1.6rem, 4vw, 2.5rem)",
            fontWeight: 800,
            marginBottom: "0.5rem",
            color: "#fff",
            textShadow: "0 0 30px rgba(0,207,255,0.4)",
          }}
        >
          {isUk ? "Наші Атракціони" : "Our Attractions"}
        </h2>
        <p style={{ textAlign: "center", color: "#6060a0", marginBottom: "2.5rem" }}>
          {isUk ? "Оберіть свій тип розваги" : "Choose your type of fun"}
        </p>

        {/* Category Tabs */}
        <div
          style={{
            display: "flex",
            gap: "0.6rem",
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: "2.5rem",
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id); setSelectedRoom(null); }}
              style={{
                background: activeCategory === cat.id ? "#FF0080" : "rgba(255,255,255,0.05)",
                color: activeCategory === cat.id ? "#fff" : "#a0a0c0",
                border: activeCategory === cat.id ? "1px solid #FF0080" : "1px solid rgba(255,255,255,0.1)",
                padding: "0.55rem 1.3rem",
                borderRadius: 8,
                fontSize: "0.9rem",
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: activeCategory === cat.id ? "0 0 16px rgba(255,0,128,0.5)" : "none",
                transition: "all 0.2s",
              }}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        {/* Quest Rooms Grid */}
        {activeCategory === "quests" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: "1.2rem",
            }}
          >
            {questRooms.map((room) => (
              <div
                key={room.id}
                style={{
                  background: "#111120",
                  border: `1px solid ${room.genreColor}33`,
                  borderRadius: 16,
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  boxShadow: `0 0 0 rgba(0,0,0,0)`,
                }}
                onClick={() => setSelectedRoom(room.id)}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 24px ${room.genreColor}44`;
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 0 rgba(0,0,0,0)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                }}
              >
                {/* Theme visual */}
                <div
                  style={{
                    height: 110,
                    background: room.themeBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2.8rem",
                    position: "relative",
                  }}
                >
                  {room.id === "lab-fear" && "🧪"}
                  {room.id === "pirate" && "☠️"}
                  {room.id === "manor" && "🔍"}
                  {room.id === "cyberpunk" && "🤖"}
                  <div
                    style={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      background: room.genreColor + "22",
                      border: `1px solid ${room.genreColor}`,
                      color: room.genreColor,
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      padding: "0.2rem 0.5rem",
                      borderRadius: 4,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {room.genre}
                  </div>
                </div>

                <div style={{ padding: "1rem" }}>
                  <h3
                    style={{
                      fontSize: "1rem",
                      fontWeight: 800,
                      color: "#fff",
                      marginBottom: "0.6rem",
                      textShadow: `0 0 10px ${room.genreColor}60`,
                    }}
                  >
                    {room.name}
                  </h3>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.8rem" }}>
                    {[
                      { icon: "👥", val: room.players },
                      { icon: "⏱", val: room.duration },
                    ].map(({ icon, val }) => (
                      <span
                        key={val}
                        style={{
                          fontSize: "0.75rem",
                          color: "#8080a0",
                          background: "rgba(255,255,255,0.05)",
                          padding: "0.2rem 0.5rem",
                          borderRadius: 4,
                        }}
                      >
                        {icon} {val}
                      </span>
                    ))}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "0.8rem",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        color: room.diffColor,
                        textShadow: `0 0 6px ${room.diffColor}80`,
                      }}
                    >
                      ◆ {room.difficulty}
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "#6060a0" }}>
                      {isUk ? "Виходять: " : "Exit: "}
                      <span style={{ color: room.exitRate < 40 ? "#FF4444" : room.exitRate > 70 ? "#44FF88" : "#FFD700", fontWeight: 700 }}>
                        {room.exitRate}%
                      </span>
                    </span>
                  </div>

                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedRoom(room.id); }}
                    style={{
                      width: "100%",
                      background: room.genreColor,
                      color: "#fff",
                      border: "none",
                      padding: "0.55rem",
                      borderRadius: 8,
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      boxShadow: `0 0 12px ${room.genreColor}60`,
                    }}
                  >
                    {isUk ? "Забронювати" : "Book"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Other Category Cards */}
        {activeCategory !== "quests" && otherActivities[activeCategory] && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
              gap: "1.2rem",
            }}
          >
            {otherActivities[activeCategory].map((act) => (
              <div
                key={act.id}
                style={{
                  background: "#111120",
                  border: "1px solid rgba(0,207,255,0.2)",
                  borderRadius: 16,
                  padding: "1.4rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.6rem",
                }}
              >
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#00CFFF", textShadow: "0 0 10px rgba(0,207,255,0.4)" }}>
                  {act.name}
                </h3>
                <p style={{ fontSize: "0.85rem", color: "#7070a0", lineHeight: 1.5, flexGrow: 1 }}>{act.description}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "#FFD700", textShadow: "0 0 8px rgba(255,215,0,0.5)" }}>
                    {act.price}
                  </span>
                  <button
                    style={{
                      background: "rgba(0,207,255,0.1)",
                      border: "1px solid #00CFFF",
                      color: "#00CFFF",
                      padding: "0.35rem 0.9rem",
                      borderRadius: 6,
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    {isUk ? "Обрати" : "Select"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ================================================================ */}
      {/* 3. QUEST ROOM DETAIL */}
      {/* ================================================================ */}
      {selectedRoom && selectedRoomData && (
        <section
          style={{
            padding: "3rem 1.5rem",
            maxWidth: 900,
            margin: "0 auto",
            borderTop: "1px solid rgba(255,0,128,0.15)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap" }}>
            <button
              onClick={() => setSelectedRoom(null)}
              style={{
                background: "transparent",
                border: "1px solid #FF0080",
                color: "#FF0080",
                padding: "0.4rem 1rem",
                borderRadius: 6,
                cursor: "pointer",
                fontSize: "0.85rem",
              }}
            >
              ← {isUk ? "Назад" : "Back"}
            </button>
            <h2
              style={{
                fontSize: "1.8rem",
                fontWeight: 800,
                color: "#fff",
                textShadow: `0 0 20px ${selectedRoomData.genreColor}60`,
              }}
            >
              {selectedRoomData.name}
            </h2>
            <span
              style={{
                color: selectedRoomData.genreColor,
                border: `1px solid ${selectedRoomData.genreColor}`,
                padding: "0.25rem 0.7rem",
                borderRadius: 4,
                fontSize: "0.75rem",
                fontWeight: 700,
                textTransform: "uppercase",
              }}
            >
              {selectedRoomData.genre}
            </span>
          </div>

          {/* Story */}
          <p style={{ color: "#a0a0c0", lineHeight: 1.7, marginBottom: "2rem", fontSize: "1rem", maxWidth: 600 }}>
            {selectedRoomData.story}
          </p>

          {/* Stats */}
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", marginBottom: "2rem" }}>
            {[
              {
                label: isUk ? "Виходять" : "Exit Rate",
                value: `${selectedRoomData.exitRate}%`,
                color:
                  selectedRoomData.exitRate < 40 ? "#FF4444" : selectedRoomData.exitRate > 70 ? "#44FF88" : "#FFD700",
              },
              { label: isUk ? "Середня команда" : "Avg Team", value: "4 " + (isUk ? "ос." : "ppl"), color: "#00CFFF" },
              { label: isUk ? "Рекорд" : "Record Time", value: isUk ? "42 хв" : "42 min", color: "#FFD700" },
              { label: isUk ? "Тривалість" : "Duration", value: selectedRoomData.duration, color: "#FF0080" },
            ].map(({ label, value, color }) => (
              <div
                key={label}
                style={{
                  background: "#111120",
                  border: `1px solid ${color}33`,
                  borderRadius: 12,
                  padding: "1rem 1.4rem",
                  minWidth: 100,
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "1.5rem", fontWeight: 800, color, textShadow: `0 0 10px ${color}60` }}>
                  {value}
                </div>
                <div style={{ fontSize: "0.75rem", color: "#6060a0", marginTop: "0.2rem" }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Photo Gallery (colored divs) */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.6rem", marginBottom: "2rem" }}>
            {[
              { bg: "linear-gradient(135deg, #1a0010 0%, #4a0028 100%)", label: isUk ? "Фото 1" : "Photo 1" },
              { bg: "linear-gradient(135deg, #001a2e 0%, #003a60 100%)", label: isUk ? "Фото 2" : "Photo 2" },
              { bg: "linear-gradient(135deg, #1a1a00 0%, #3a3a00 100%)", label: isUk ? "Фото 3" : "Photo 3" },
              { bg: "linear-gradient(135deg, #0a001a 0%, #20003a 100%)", label: isUk ? "Фото 4" : "Photo 4" },
            ].map(({ bg, label }) => (
              <div
                key={label}
                style={{
                  height: 90,
                  borderRadius: 8,
                  background: bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.75rem",
                  color: "#5050a0",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                {label}
              </div>
            ))}
          </div>

          {/* Date + Time Slot Selector */}
          <h3 style={{ color: "#fff", fontWeight: 700, marginBottom: "1rem" }}>
            {isUk ? "Оберіть дату та час" : "Select Date & Time"}
          </h3>
          <div style={{ display: "flex", gap: "0.6rem", marginBottom: "1rem", flexWrap: "wrap" }}>
            {dates.map((d, i) => (
              <button
                key={i}
                onClick={() => { setSelectedDate(i); setSelectedSlot(null); }}
                style={{
                  background: selectedDate === i ? "#FF0080" : "rgba(255,255,255,0.05)",
                  border: `1px solid ${selectedDate === i ? "#FF0080" : "rgba(255,255,255,0.1)"}`,
                  color: selectedDate === i ? "#fff" : "#a0a0c0",
                  padding: "0.5rem 1.1rem",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  boxShadow: selectedDate === i ? "0 0 12px rgba(255,0,128,0.4)" : "none",
                }}
              >
                {formatDate(d)}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
            {timeSlots.map((slot) => {
              const occupied = (occupiedSlots[selectedDate] || []).includes(slot);
              return (
                <button
                  key={slot}
                  disabled={occupied}
                  onClick={() => setSelectedSlot(slot)}
                  style={{
                    background: occupied
                      ? "rgba(255,255,255,0.03)"
                      : selectedSlot === slot
                      ? "#00CFFF"
                      : "rgba(0,207,255,0.08)",
                    border: `1px solid ${occupied ? "rgba(255,255,255,0.07)" : selectedSlot === slot ? "#00CFFF" : "rgba(0,207,255,0.3)"}`,
                    color: occupied ? "#3a3a5a" : selectedSlot === slot ? "#000" : "#00CFFF",
                    padding: "0.45rem 0.85rem",
                    borderRadius: 6,
                    cursor: occupied ? "not-allowed" : "pointer",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    textDecoration: occupied ? "line-through" : "none",
                    boxShadow: selectedSlot === slot ? "0 0 10px rgba(0,207,255,0.4)" : "none",
                  }}
                >
                  {slot}
                </button>
              );
            })}
          </div>

          {/* Guest count */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <span style={{ color: "#a0a0c0", fontSize: "0.9rem" }}>{isUk ? "Кількість гостей:" : "Guests:"}</span>
            <button
              onClick={() => setGuestCount((g) => Math.max(1, g - 1))}
              style={{
                background: "rgba(255,0,128,0.1)",
                border: "1px solid #FF0080",
                color: "#FF0080",
                width: 32,
                height: 32,
                borderRadius: 6,
                cursor: "pointer",
                fontSize: "1.1rem",
                fontWeight: 700,
              }}
            >
              −
            </button>
            <span style={{ fontSize: "1.2rem", fontWeight: 800, color: "#fff", minWidth: 24, textAlign: "center" }}>
              {guestCount}
            </span>
            <button
              onClick={() => setGuestCount((g) => Math.min(8, g + 1))}
              style={{
                background: "rgba(255,0,128,0.1)",
                border: "1px solid #FF0080",
                color: "#FF0080",
                width: 32,
                height: 32,
                borderRadius: 6,
                cursor: "pointer",
                fontSize: "1.1rem",
                fontWeight: 700,
              }}
            >
              +
            </button>
          </div>

          {/* Contact form */}
          <h3 style={{ color: "#fff", fontWeight: 700, marginBottom: "1rem" }}>
            {isUk ? "Контактні дані" : "Contact Details"}
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem", maxWidth: 400 }}>
            {[
              { key: "name" as const, label: isUk ? "Ім'я" : "Name", placeholder: isUk ? "Ваше ім'я" : "Your name" },
              { key: "phone" as const, label: isUk ? "Телефон" : "Phone", placeholder: "+380 XX XXX XX XX" },
              { key: "message" as const, label: isUk ? "Коментар" : "Comment", placeholder: isUk ? "Особливі побажання..." : "Special requests..." },
            ].map(({ key, label, placeholder }) => (
              <div key={key}>
                <label style={{ display: "block", fontSize: "0.8rem", color: "#6060a0", marginBottom: "0.3rem" }}>
                  {label}
                </label>
                <input
                  type="text"
                  placeholder={placeholder}
                  value={contactForm[key]}
                  onChange={(e) => setContactForm((f) => ({ ...f, [key]: e.target.value }))}
                  style={{
                    width: "100%",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: 8,
                    padding: "0.6rem 0.9rem",
                    color: "#e8e8f0",
                    fontSize: "0.9rem",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            ))}
            <button
              style={{
                background: "#FF0080",
                color: "#fff",
                border: "none",
                padding: "0.75rem",
                borderRadius: 8,
                fontSize: "0.95rem",
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 0 16px rgba(255,0,128,0.5)",
                marginTop: "0.3rem",
              }}
            >
              {isUk ? "Підтвердити Бронювання" : "Confirm Booking"}
            </button>
          </div>
        </section>
      )}

      {/* ================================================================ */}
      {/* 4. GROUP & CORPORATE EVENTS */}
      {/* ================================================================ */}
      <section
        style={{
          padding: "4rem 1.5rem",
          background: "linear-gradient(180deg, #08080F 0%, #0e0a1a 50%, #08080F 100%)",
          borderTop: "1px solid rgba(0,207,255,0.1)",
        }}
      >
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h2
            style={{
              textAlign: "center",
              fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
              fontWeight: 800,
              color: "#fff",
              marginBottom: "0.5rem",
              textShadow: "0 0 30px rgba(0,207,255,0.4)",
            }}
          >
            {isUk ? "Групи та Корпоративи" : "Group & Corporate Events"}
          </h2>
          <p style={{ textAlign: "center", color: "#6060a0", marginBottom: "3rem" }}>
            {isUk ? "Незабутні враження для вашої команди чи компанії" : "Unforgettable experiences for your team or company"}
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
              marginBottom: "3rem",
            }}
          >
            {[
              {
                id: "birthday",
                icon: "🎂",
                title: isUk ? "День Народження" : "Birthday Party",
                price: "₴2,800",
                color: "#FF0080",
                includes: isUk
                  ? ["2 квест-кімнати", "Торт та привітання", "Фотосесія", "Безкоштовне прикраси", "Окремий зал"]
                  : ["2 quest rooms", "Cake & greetings", "Photo session", "Free decorations", "Private hall"],
              },
              {
                id: "corporate",
                icon: "🏆",
                title: isUk ? "Корпоративний Тімбілдінг" : "Corporate Team Building",
                price: "₴8,000",
                color: "#00CFFF",
                includes: isUk
                  ? ["До 30 учасників", "4 квест-кімнати + аркади", "Кейтеринг", "Тренінг-фасилітатор", "Фото/відео звіт"]
                  : ["Up to 30 participants", "4 quest rooms + arcades", "Catering", "Facilitation coach", "Photo/video report"],
              },
              {
                id: "school",
                icon: "🎒",
                title: isUk ? "Шкільна Група" : "School Group",
                price: "₴1,200",
                color: "#FFD700",
                includes: isUk
                  ? ["До 20 дітей", "Квест + аркади", "Безпечна зона", "Інструктор", "Сертифікат кожному"]
                  : ["Up to 20 children", "Quest + arcades", "Safe zone", "Instructor", "Certificate for each"],
              },
            ].map((pkg) => (
              <div
                key={pkg.id}
                style={{
                  background: "#111120",
                  border: `1px solid ${pkg.color}33`,
                  borderRadius: 16,
                  padding: "1.8rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  boxShadow: `0 0 30px ${pkg.color}11`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                  <span style={{ fontSize: "2rem" }}>{pkg.icon}</span>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff" }}>{pkg.title}</h3>
                </div>
                <div
                  style={{
                    fontSize: "1.8rem",
                    fontWeight: 900,
                    color: pkg.color,
                    textShadow: `0 0 12px ${pkg.color}60`,
                  }}
                >
                  {isUk ? "від " : "from "}{pkg.price}
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  {pkg.includes.map((item) => (
                    <li key={item} style={{ fontSize: "0.85rem", color: "#8080a0", display: "flex", gap: "0.5rem" }}>
                      <span style={{ color: pkg.color, flexShrink: 0 }}>✓</span> {item}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setGroupForm((f) => ({ ...f, "package": pkg.id }))}
                  style={{
                    background: pkg.color,
                    color: pkg.id === "school" ? "#000" : "#fff",
                    border: "none",
                    padding: "0.65rem",
                    borderRadius: 8,
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    boxShadow: `0 0 12px ${pkg.color}50`,
                    marginTop: "auto",
                  }}
                >
                  {isUk ? "Обрати Пакет" : "Choose Package"}
                </button>
              </div>
            ))}
          </div>

          {/* Group booking form */}
          <div
            style={{
              background: "#111120",
              border: "1px solid rgba(255,215,0,0.2)",
              borderRadius: 16,
              padding: "2rem",
              maxWidth: 540,
              margin: "0 auto",
            }}
          >
            <h3
              style={{
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "#FFD700",
                marginBottom: "1.2rem",
                textShadow: "0 0 10px rgba(255,215,0,0.4)",
              }}
            >
              {isUk ? "Запит на Групове Бронювання" : "Group Booking Request"}
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              {[
                { key: "name" as const, label: isUk ? "Контактна особа" : "Contact Person", placeholder: isUk ? "Ваше ім'я" : "Your name" },
                { key: "phone" as const, label: isUk ? "Телефон" : "Phone", placeholder: "+380 XX XXX XX XX" },
                { key: "comment" as const, label: isUk ? "Побажання" : "Details", placeholder: isUk ? "Опишіть захід..." : "Describe your event..." },
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "#6060a0", marginBottom: "0.3rem" }}>
                    {label}
                  </label>
                  <input
                    type="text"
                    placeholder={placeholder}
                    value={groupForm[key]}
                    onChange={(e) => setGroupForm((f) => ({ ...f, [key]: e.target.value }))}
                    style={{
                      width: "100%",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: 8,
                      padding: "0.6rem 0.9rem",
                      color: "#e8e8f0",
                      fontSize: "0.9rem",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              ))}
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", color: "#6060a0", marginBottom: "0.3rem" }}>
                  {isUk ? "Пакет" : "Package"}
                </label>
                <select
                  value={groupForm.package}
                  onChange={(e) => setGroupForm((f) => ({ ...f, "package": e.target.value }))}
                  style={{
                    width: "100%",
                    background: "#1a1a2e",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: 8,
                    padding: "0.6rem 0.9rem",
                    color: "#e8e8f0",
                    fontSize: "0.9rem",
                    outline: "none",
                  }}
                >
                  <option value="birthday">{isUk ? "День Народження" : "Birthday Party"}</option>
                  <option value="corporate">{isUk ? "Корпоративний Тімбілдінг" : "Corporate Team Building"}</option>
                  <option value="school">{isUk ? "Шкільна Група" : "School Group"}</option>
                </select>
              </div>
              <button
                style={{
                  background: "#FFD700",
                  color: "#000",
                  border: "none",
                  padding: "0.75rem",
                  borderRadius: 8,
                  fontSize: "0.95rem",
                  fontWeight: 800,
                  cursor: "pointer",
                  boxShadow: "0 0 16px rgba(255,215,0,0.4)",
                }}
              >
                {isUk ? "Надіслати Запит" : "Send Request"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 5. BOOKING FLOW */}
      {/* ================================================================ */}
      <section style={{ padding: "4rem 1.5rem", maxWidth: 700, margin: "0 auto" }}>
        <h2
          style={{
            textAlign: "center",
            fontSize: "clamp(1.5rem, 4vw, 2.2rem)",
            fontWeight: 800,
            color: "#fff",
            marginBottom: "0.5rem",
            textShadow: "0 0 30px rgba(255,0,128,0.4)",
          }}
        >
          {isUk ? "Швидке Бронювання" : "Quick Booking"}
        </h2>
        <p style={{ textAlign: "center", color: "#6060a0", marginBottom: "2rem" }}>
          {isUk ? "4 кроки до вашого ідеального відпочинку" : "4 steps to your perfect entertainment"}
        </p>

        {/* Step indicators */}
        <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginBottom: "2.5rem", flexWrap: "wrap" }}>
          {[
            { n: 1, label: isUk ? "Атракціон" : "Attraction" },
            { n: 2, label: isUk ? "Дата & Час" : "Date & Time" },
            { n: 3, label: isUk ? "Гості" : "Guests" },
            { n: 4, label: isUk ? "Контакти" : "Contact" },
          ].map(({ n, label }) => (
            <button
              key={n}
              onClick={() => setBookingStep(n)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                background: bookingStep === n ? "rgba(255,0,128,0.15)" : "transparent",
                border: `1px solid ${bookingStep >= n ? "#FF0080" : "rgba(255,255,255,0.1)"}`,
                borderRadius: 8,
                padding: "0.45rem 1rem",
                cursor: "pointer",
                color: bookingStep >= n ? "#FF0080" : "#4040a0",
                fontSize: "0.8rem",
                fontWeight: 600,
              }}
            >
              <span
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: bookingStep >= n ? "#FF0080" : "rgba(255,255,255,0.08)",
                  color: bookingStep >= n ? "#fff" : "#4040a0",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  flexShrink: 0,
                }}
              >
                {bookingStep > n ? "✓" : n}
              </span>
              {label}
            </button>
          ))}
        </div>

        {/* Step 1 — Attraction */}
        {bookingStep === 1 && !bookingConfirmed && (
          <div
            style={{
              background: "#111120",
              border: "1px solid rgba(255,0,128,0.2)",
              borderRadius: 16,
              padding: "1.8rem",
            }}
          >
            <h3 style={{ color: "#FF0080", fontWeight: 700, marginBottom: "1.2rem" }}>
              {isUk ? "Оберіть атракціон" : "Choose an attraction"}
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {attractionOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setBookingData((d) => ({ ...d, attraction: opt.id }))}
                  style={{
                    background: bookingData.attraction === opt.id ? "rgba(255,0,128,0.15)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${bookingData.attraction === opt.id ? "#FF0080" : "rgba(255,255,255,0.1)"}`,
                    borderRadius: 8,
                    padding: "0.75rem 1rem",
                    color: bookingData.attraction === opt.id ? "#FF0080" : "#a0a0c0",
                    textAlign: "left",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    transition: "all 0.15s",
                  }}
                >
                  {bookingData.attraction === opt.id ? "✓ " : ""}{opt.label}
                </button>
              ))}
            </div>
            <button
              disabled={!bookingData.attraction}
              onClick={() => setBookingStep(2)}
              style={{
                marginTop: "1.5rem",
                background: bookingData.attraction ? "#FF0080" : "rgba(255,255,255,0.08)",
                color: bookingData.attraction ? "#fff" : "#4040a0",
                border: "none",
                padding: "0.75rem 2rem",
                borderRadius: 8,
                fontSize: "0.95rem",
                fontWeight: 700,
                cursor: bookingData.attraction ? "pointer" : "not-allowed",
                boxShadow: bookingData.attraction ? "0 0 16px rgba(255,0,128,0.4)" : "none",
              }}
            >
              {isUk ? "Далі →" : "Next →"}
            </button>
          </div>
        )}

        {/* Step 2 — Date & Time */}
        {bookingStep === 2 && !bookingConfirmed && (
          <div
            style={{
              background: "#111120",
              border: "1px solid rgba(0,207,255,0.2)",
              borderRadius: 16,
              padding: "1.8rem",
            }}
          >
            <h3 style={{ color: "#00CFFF", fontWeight: 700, marginBottom: "1.2rem" }}>
              {isUk ? "Оберіть дату та час" : "Choose date & time"}
            </h3>
            <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", marginBottom: "1rem" }}>
              {dates.map((d, i) => (
                <button
                  key={i}
                  onClick={() => { setBookingData((bd) => ({ ...bd, date: d.toISOString().split("T")[0], slot: "" })); setSelectedDate(i); }}
                  style={{
                    background: selectedDate === i ? "rgba(0,207,255,0.15)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${selectedDate === i ? "#00CFFF" : "rgba(255,255,255,0.1)"}`,
                    color: selectedDate === i ? "#00CFFF" : "#a0a0c0",
                    padding: "0.5rem 1rem",
                    borderRadius: 8,
                    cursor: "pointer",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                  }}
                >
                  {formatDate(d)}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
              {timeSlots.map((slot) => {
                const occupied = (occupiedSlots[selectedDate] || []).includes(slot);
                return (
                  <button
                    key={slot}
                    disabled={occupied}
                    onClick={() => setBookingData((d) => ({ ...d, slot }))}
                    style={{
                      background: occupied
                        ? "rgba(255,255,255,0.02)"
                        : bookingData.slot === slot
                        ? "#00CFFF"
                        : "rgba(0,207,255,0.07)",
                      border: `1px solid ${occupied ? "rgba(255,255,255,0.05)" : bookingData.slot === slot ? "#00CFFF" : "rgba(0,207,255,0.25)"}`,
                      color: occupied ? "#2a2a4a" : bookingData.slot === slot ? "#000" : "#00CFFF",
                      padding: "0.4rem 0.8rem",
                      borderRadius: 6,
                      cursor: occupied ? "not-allowed" : "pointer",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      textDecoration: occupied ? "line-through" : "none",
                    }}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
            <div style={{ display: "flex", gap: "0.7rem" }}>
              <button
                onClick={() => setBookingStep(1)}
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#6060a0",
                  padding: "0.65rem 1.5rem",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontSize: "0.9rem",
                }}
              >
                ← {isUk ? "Назад" : "Back"}
              </button>
              <button
                disabled={!bookingData.slot}
                onClick={() => setBookingStep(3)}
                style={{
                  background: bookingData.slot ? "#00CFFF" : "rgba(255,255,255,0.08)",
                  color: bookingData.slot ? "#000" : "#4040a0",
                  border: "none",
                  padding: "0.65rem 2rem",
                  borderRadius: 8,
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  cursor: bookingData.slot ? "pointer" : "not-allowed",
                }}
              >
                {isUk ? "Далі →" : "Next →"}
              </button>
            </div>
          </div>
        )}

        {/* Step 3 — Guests */}
        {bookingStep === 3 && !bookingConfirmed && (
          <div
            style={{
              background: "#111120",
              border: "1px solid rgba(255,215,0,0.2)",
              borderRadius: 16,
              padding: "1.8rem",
            }}
          >
            <h3 style={{ color: "#FFD700", fontWeight: 700, marginBottom: "1.2rem" }}>
              {isUk ? "Кількість гостей" : "Number of guests"}
            </h3>
            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "2rem" }}>
              <button
                onClick={() => setBookingData((d) => ({ ...d, guests: Math.max(1, d.guests - 1) }))}
                style={{
                  background: "rgba(255,215,0,0.1)",
                  border: "1px solid #FFD700",
                  color: "#FFD700",
                  width: 44,
                  height: 44,
                  borderRadius: 8,
                  cursor: "pointer",
                  fontSize: "1.4rem",
                  fontWeight: 700,
                }}
              >
                −
              </button>
              <span style={{ fontSize: "2.5rem", fontWeight: 900, color: "#FFD700", minWidth: 50, textAlign: "center", textShadow: "0 0 15px rgba(255,215,0,0.5)" }}>
                {bookingData.guests}
              </span>
              <button
                onClick={() => setBookingData((d) => ({ ...d, guests: Math.min(8, d.guests + 1) }))}
                style={{
                  background: "rgba(255,215,0,0.1)",
                  border: "1px solid #FFD700",
                  color: "#FFD700",
                  width: 44,
                  height: 44,
                  borderRadius: 8,
                  cursor: "pointer",
                  fontSize: "1.4rem",
                  fontWeight: 700,
                }}
              >
                +
              </button>
              <span style={{ color: "#6060a0", fontSize: "0.9rem" }}>
                {isUk ? `гостей (макс. 8)` : `guests (max 8)`}
              </span>
            </div>
            <div style={{ display: "flex", gap: "0.7rem" }}>
              <button
                onClick={() => setBookingStep(2)}
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#6060a0",
                  padding: "0.65rem 1.5rem",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontSize: "0.9rem",
                }}
              >
                ← {isUk ? "Назад" : "Back"}
              </button>
              <button
                onClick={() => setBookingStep(4)}
                style={{
                  background: "#FFD700",
                  color: "#000",
                  border: "none",
                  padding: "0.65rem 2rem",
                  borderRadius: 8,
                  fontSize: "0.95rem",
                  fontWeight: 800,
                  cursor: "pointer",
                  boxShadow: "0 0 14px rgba(255,215,0,0.4)",
                }}
              >
                {isUk ? "Далі →" : "Next →"}
              </button>
            </div>
          </div>
        )}

        {/* Step 4 — Contact */}
        {bookingStep === 4 && !bookingConfirmed && (
          <div
            style={{
              background: "#111120",
              border: "1px solid rgba(255,0,128,0.2)",
              borderRadius: 16,
              padding: "1.8rem",
            }}
          >
            <h3 style={{ color: "#FF0080", fontWeight: 700, marginBottom: "1.2rem" }}>
              {isUk ? "Ваші дані" : "Your details"}
            </h3>

            {/* Summary */}
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 8,
                padding: "1rem",
                marginBottom: "1.2rem",
                fontSize: "0.85rem",
                color: "#8080a0",
                display: "flex",
                flexDirection: "column",
                gap: "0.35rem",
              }}
            >
              <span>🎯 {attractionOptions.find((a) => a.id === bookingData.attraction)?.label || "—"}</span>
              <span>📅 {bookingData.date || "—"} {isUk ? "о" : "at"} {bookingData.slot || "—"}</span>
              <span>👥 {bookingData.guests} {isUk ? "гостей" : "guests"}</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", marginBottom: "1.2rem" }}>
              {[
                { key: "name" as const, label: isUk ? "Ім'я" : "Name", placeholder: isUk ? "Ваше ім'я" : "Your name" },
                { key: "phone" as const, label: isUk ? "Телефон" : "Phone", placeholder: "+380 XX XXX XX XX" },
                { key: "email" as const, label: "Email", placeholder: "email@example.com" },
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "#6060a0", marginBottom: "0.3rem" }}>
                    {label}
                  </label>
                  <input
                    type={key === "email" ? "email" : "text"}
                    placeholder={placeholder}
                    value={bookingData[key]}
                    onChange={(e) => setBookingData((d) => ({ ...d, [key]: e.target.value }))}
                    style={{
                      width: "100%",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: 8,
                      padding: "0.6rem 0.9rem",
                      color: "#e8e8f0",
                      fontSize: "0.9rem",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: "0.7rem" }}>
              <button
                onClick={() => setBookingStep(3)}
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#6060a0",
                  padding: "0.65rem 1.5rem",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontSize: "0.9rem",
                }}
              >
                ← {isUk ? "Назад" : "Back"}
              </button>
              <button
                onClick={() => setBookingConfirmed(true)}
                style={{
                  background: "#FF0080",
                  color: "#fff",
                  border: "none",
                  padding: "0.65rem 2rem",
                  borderRadius: 8,
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 0 16px rgba(255,0,128,0.5)",
                }}
              >
                {isUk ? "Підтвердити ✓" : "Confirm ✓"}
              </button>
            </div>
          </div>
        )}

        {/* Confirmation */}
        {bookingConfirmed && (
          <div
            style={{
              background: "#111120",
              border: "1px solid #44FF88",
              borderRadius: 16,
              padding: "2.5rem",
              textAlign: "center",
              boxShadow: "0 0 30px rgba(68,255,136,0.15)",
            }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎉</div>
            <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#44FF88", marginBottom: "0.5rem", textShadow: "0 0 15px rgba(68,255,136,0.5)" }}>
              {isUk ? "Бронювання підтверджено!" : "Booking Confirmed!"}
            </h3>
            <p style={{ color: "#8080a0", marginBottom: "1.5rem" }}>
              {isUk
                ? "Ми зателефонуємо вам протягом 15 хвилин для підтвердження."
                : "We will call you within 15 minutes to confirm."}
            </p>
            <button
              onClick={() => { setBookingConfirmed(false); setBookingStep(1); setBookingData({ attraction: "", date: "", slot: "", guests: 2, name: "", phone: "", email: "" }); }}
              style={{
                background: "transparent",
                border: "1px solid #44FF88",
                color: "#44FF88",
                padding: "0.65rem 1.8rem",
                borderRadius: 8,
                cursor: "pointer",
                fontSize: "0.9rem",
                fontWeight: 700,
              }}
            >
              {isUk ? "Нове Бронювання" : "New Booking"}
            </button>
          </div>
        )}
      </section>

      {/* ================================================================ */}
      {/* 6. LOYALTY PROGRAM */}
      {/* ================================================================ */}
      <section
        style={{
          padding: "4rem 1.5rem",
          background: "linear-gradient(180deg, #08080F 0%, #0d0818 50%, #08080F 100%)",
          borderTop: "1px solid rgba(255,215,0,0.1)",
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2
            style={{
              textAlign: "center",
              fontSize: "clamp(1.5rem, 4vw, 2.2rem)",
              fontWeight: 800,
              color: "#FFD700",
              marginBottom: "0.3rem",
              textShadow: "0 0 30px rgba(255,215,0,0.4)",
            }}
          >
            {isUk ? "Програма Лояльності" : "Loyalty Program"}
          </h2>
          <p style={{ textAlign: "center", color: "#6060a0", marginBottom: "0.5rem" }}>
            FunCard
          </p>
          <p style={{ textAlign: "center", color: "#5050a0", fontSize: "0.9rem", marginBottom: "2.5rem" }}>
            {isUk
              ? "Накопичуйте бали за кожен візит і отримуйте привілеї"
              : "Earn points on every visit and unlock exclusive perks"}
          </p>

          {/* Tier tabs */}
          <div style={{ display: "flex", gap: "0.6rem", justifyContent: "center", marginBottom: "2rem" }}>
            {(["basic", "silver", "gold"] as const).map((tier) => {
              const colors: Record<typeof tier, string> = { basic: "#a0a0c0", silver: "#C0C0C0", gold: "#FFD700" };
              const labels: Record<typeof tier, string> = {
                basic: "Basic",
                silver: "Silver",
                gold: "Gold",
              };
              return (
                <button
                  key={tier}
                  onClick={() => setLoyaltyTab(tier)}
                  style={{
                    background: loyaltyTab === tier ? `${colors[tier]}22` : "transparent",
                    border: `2px solid ${loyaltyTab === tier ? colors[tier] : "rgba(255,255,255,0.1)"}`,
                    color: loyaltyTab === tier ? colors[tier] : "#4040a0",
                    padding: "0.5rem 1.5rem",
                    borderRadius: 8,
                    cursor: "pointer",
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    boxShadow: loyaltyTab === tier ? `0 0 12px ${colors[tier]}40` : "none",
                  }}
                >
                  {tier === "basic" ? "⚪" : tier === "silver" ? "🥈" : "🥇"} {labels[tier]}
                </button>
              );
            })}
          </div>

          {/* Tier details */}
          {loyaltyTab === "basic" && (
            <div
              style={{
                background: "#111120",
                border: "1px solid rgba(160,160,192,0.3)",
                borderRadius: 16,
                padding: "2rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                <span style={{ fontSize: "2.5rem" }}>⚪</span>
                <div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#a0a0c0" }}>Basic</h3>
                  <p style={{ color: "#5050a0", fontSize: "0.85rem" }}>
                    {isUk ? "Починаючи з першого візиту" : "Starting from your first visit"}
                  </p>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {[
                  { icon: "🎯", text: isUk ? "1 бал за кожні ₴10 витрат" : "1 point per ₴10 spent" },
                  { icon: "🎁", text: isUk ? "Знижка 5% на наступний квест" : "5% discount on next quest" },
                  { icon: "📧", text: isUk ? "Ексклюзивні пропозиції на email" : "Exclusive email offers" },
                  { icon: "🎂", text: isUk ? "Подарунок у день народження" : "Birthday gift" },
                ].map(({ icon, text }) => (
                  <div key={text} style={{ display: "flex", gap: "0.7rem", alignItems: "flex-start" }}>
                    <span>{icon}</span>
                    <span style={{ color: "#8080a0", fontSize: "0.9rem" }}>{text}</span>
                  </div>
                ))}
              </div>
              <div
                style={{
                  marginTop: "1.5rem",
                  background: "rgba(160,160,192,0.06)",
                  border: "1px solid rgba(160,160,192,0.15)",
                  borderRadius: 8,
                  padding: "0.8rem 1rem",
                  fontSize: "0.8rem",
                  color: "#5050a0",
                }}
              >
                {isUk ? "Потрібно для Silver: 500 балів" : "Required for Silver: 500 points"}
              </div>
            </div>
          )}

          {loyaltyTab === "silver" && (
            <div
              style={{
                background: "#111120",
                border: "1px solid rgba(192,192,192,0.4)",
                borderRadius: 16,
                padding: "2rem",
                boxShadow: "0 0 20px rgba(192,192,192,0.08)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                <span style={{ fontSize: "2.5rem" }}>🥈</span>
                <div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#C0C0C0", textShadow: "0 0 10px rgba(192,192,192,0.4)" }}>Silver</h3>
                  <p style={{ color: "#5050a0", fontSize: "0.85rem" }}>
                    {isUk ? "500–1999 накопичених балів" : "500–1999 accumulated points"}
                  </p>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {[
                  { icon: "💎", text: isUk ? "1.5 бали за кожні ₴10 витрат" : "1.5 points per ₴10 spent" },
                  { icon: "🎯", text: isUk ? "Знижка 10% на квести та боулінг" : "10% discount on quests & bowling" },
                  { icon: "⏩", text: isUk ? "Пріоритетне бронювання за 24 год" : "Priority booking 24h in advance" },
                  { icon: "🎁", text: isUk ? "1 безкоштовна аркадна гра/місяць" : "1 free arcade game per month" },
                  { icon: "👥", text: isUk ? "Привілей запросити +1 безплатно" : "Bring a friend free privilege" },
                ].map(({ icon, text }) => (
                  <div key={text} style={{ display: "flex", gap: "0.7rem", alignItems: "flex-start" }}>
                    <span>{icon}</span>
                    <span style={{ color: "#8080a0", fontSize: "0.9rem" }}>{text}</span>
                  </div>
                ))}
              </div>
              <div
                style={{
                  marginTop: "1.5rem",
                  background: "rgba(192,192,192,0.05)",
                  border: "1px solid rgba(192,192,192,0.15)",
                  borderRadius: 8,
                  padding: "0.8rem 1rem",
                  fontSize: "0.8rem",
                  color: "#5050a0",
                }}
              >
                {isUk ? "Потрібно для Gold: 2000 балів" : "Required for Gold: 2000 points"}
              </div>
            </div>
          )}

          {loyaltyTab === "gold" && (
            <div
              style={{
                background: "#111120",
                border: "1px solid rgba(255,215,0,0.4)",
                borderRadius: 16,
                padding: "2rem",
                boxShadow: "0 0 30px rgba(255,215,0,0.1)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                <span style={{ fontSize: "2.5rem" }}>🥇</span>
                <div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#FFD700", textShadow: "0 0 15px rgba(255,215,0,0.5)" }}>Gold</h3>
                  <p style={{ color: "#5050a0", fontSize: "0.85rem" }}>
                    {isUk ? "2000+ накопичених балів" : "2000+ accumulated points"}
                  </p>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {[
                  { icon: "🚀", text: isUk ? "2 бали за кожні ₴10 витрат" : "2 points per ₴10 spent" },
                  { icon: "🎯", text: isUk ? "Знижка 20% на всі атракціони" : "20% discount on all attractions" },
                  { icon: "👑", text: isUk ? "VIP-бронювання без черги" : "VIP booking without queue" },
                  { icon: "🎉", text: isUk ? "Безплатна оренда залу/рік" : "Free hall rental once per year" },
                  { icon: "🤝", text: isUk ? "Персональний менеджер" : "Personal account manager" },
                  { icon: "🎁", text: isUk ? "Ексклюзивні закриті події" : "Exclusive closed events" },
                ].map(({ icon, text }) => (
                  <div key={text} style={{ display: "flex", gap: "0.7rem", alignItems: "flex-start" }}>
                    <span>{icon}</span>
                    <span style={{ color: "#9090b0", fontSize: "0.9rem" }}>{text}</span>
                  </div>
                ))}
              </div>
              <div
                style={{
                  marginTop: "1.5rem",
                  background: "rgba(255,215,0,0.05)",
                  border: "1px solid rgba(255,215,0,0.2)",
                  borderRadius: 8,
                  padding: "0.8rem 1rem",
                  fontSize: "0.8rem",
                  color: "#6060a0",
                  textShadow: "none",
                }}
              >
                {isUk ? "Найвищий статус. Відновлення кожного року при 1000+ балах." : "Top tier status. Renewed each year with 1000+ points."}
              </div>
            </div>
          )}

          {/* FunCard CTA */}
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <button
              style={{
                background: "linear-gradient(135deg, #FF0080 0%, #FFD700 100%)",
                color: "#000",
                border: "none",
                padding: "0.85rem 2.5rem",
                borderRadius: 12,
                fontSize: "1rem",
                fontWeight: 800,
                cursor: "pointer",
                boxShadow: "0 0 24px rgba(255,0,128,0.4), 0 0 40px rgba(255,215,0,0.2)",
                letterSpacing: "0.04em",
              }}
            >
              {isUk ? "Отримати FunCard" : "Get Your FunCard"}
            </button>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 7. FOOTER */}
      {/* ================================================================ */}
      <footer
        style={{
          background: "#060610",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "3rem 1.5rem",
        }}
      >
        <div
          style={{
            maxWidth: 1000,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2rem",
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                fontSize: "1.5rem",
                fontWeight: 900,
                marginBottom: "0.6rem",
                background: "linear-gradient(90deg, #FF0080, #00CFFF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              FunZone
            </div>
            <p style={{ fontSize: "0.85rem", color: "#5050a0", lineHeight: 1.6 }}>
              {isUk
                ? "Найкращий розважальний центр міста. Незабутні емоції для всієї сім'ї!"
                : "The city's best entertainment center. Unforgettable emotions for the whole family!"}
            </p>
          </div>

          {/* Hours */}
          <div>
            <h4
              style={{
                fontSize: "0.85rem",
                fontWeight: 700,
                color: "#FF0080",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "0.8rem",
                textShadow: "0 0 8px rgba(255,0,128,0.4)",
              }}
            >
              {isUk ? "Графік роботи" : "Operating Hours"}
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
              {[
                { day: isUk ? "Пн–Пт" : "Mon–Fri", hours: "10:00–23:00" },
                { day: isUk ? "Субота" : "Saturday", hours: "09:00–24:00" },
                { day: isUk ? "Неділя" : "Sunday", hours: "09:00–23:00" },
              ].map(({ day, hours }) => (
                <div key={day} style={{ display: "flex", justifyContent: "space-between", gap: "1rem", fontSize: "0.85rem" }}>
                  <span style={{ color: "#6060a0" }}>{day}</span>
                  <span style={{ color: "#a0a0c0", fontWeight: 600 }}>{hours}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <h4
              style={{
                fontSize: "0.85rem",
                fontWeight: 700,
                color: "#00CFFF",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "0.8rem",
                textShadow: "0 0 8px rgba(0,207,255,0.4)",
              }}
            >
              {isUk ? "Адреса" : "Location"}
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", fontSize: "0.85rem", color: "#6060a0" }}>
              <span>📍 {isUk ? "вул. Ігрова, 42, Київ" : "42 Game St, Kyiv"}</span>
              <span>📞 +380 44 123 45 67</span>
              <span>✉️ info@funzone.ua</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4
              style={{
                fontSize: "0.85rem",
                fontWeight: 700,
                color: "#FFD700",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "0.8rem",
                textShadow: "0 0 8px rgba(255,215,0,0.4)",
              }}
            >
              {isUk ? "Швидкі посилання" : "Quick Links"}
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              {[
                isUk ? "Квест-кімнати" : "Quest Rooms",
                isUk ? "Боулінг" : "Bowling",
                isUk ? "VR Атракціони" : "VR Attractions",
                isUk ? "Дні народження" : "Birthday Parties",
                isUk ? "Програма FunCard" : "FunCard Program",
              ].map((link) => (
                <a
                  key={link}
                  href="#"
                  style={{
                    color: "#5050a0",
                    textDecoration: "none",
                    fontSize: "0.85rem",
                    transition: "color 0.15s",
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = "#FFD700")}
                  onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = "#5050a0")}
                >
                  → {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            marginTop: "2.5rem",
            paddingTop: "1.5rem",
            textAlign: "center",
            fontSize: "0.8rem",
            color: "#3030a0",
          }}
        >
          © 2026 FunZone.{" "}
          {isUk ? "Всі права захищені." : "All rights reserved."}{" "}
          <span style={{ color: "#FF0080" }}>♥</span>{" "}
          {isUk ? "Зроблено з пристрастю до розваг" : "Made with passion for entertainment"}
        </div>
      </footer>
    </div>
  );
}
