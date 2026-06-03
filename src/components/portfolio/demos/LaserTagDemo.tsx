"use client";
import { useState } from "react";
import { EmojiIcon } from "@/components/ui/EmojiIcon";

const scenarios = [
  {
    id: 1,
    emoji: "🚩",
    nameEn: "Capture the Flag",
    nameUk: "Захопи прапор",
    difficulty: 3,
    teamSize: "6–20",
    duration: 20,
    descEn: "Two teams fight to capture the enemy flag and return it to base while protecting their own. Classic tactical warfare.",
    descUk: "Дві команди борються за прапор суперника та захищають власний. Класична тактична битва.",
    tagEn: "TEAM TACTICAL",
    tagUk: "КОМАНДНА ТАКТИКА",
  },
  {
    id: 2,
    emoji: "💀",
    nameEn: "Team Deathmatch",
    nameUk: "Командна сутичка",
    difficulty: 4,
    teamSize: "4–30",
    duration: 15,
    descEn: "Pure combat. Eliminate opponents to earn points for your squad. The most eliminations wins the battle.",
    descUk: "Чистий бій. Нейтралізуй суперників і заробляй очки для загону. Найбільше влучань — перемога.",
    tagEn: "PURE COMBAT",
    tagUk: "ЧИСТИЙ БІЙ",
  },
  {
    id: 3,
    emoji: "🛡️",
    nameEn: "VIP Protection",
    nameUk: "Захист VIP",
    difficulty: 5,
    teamSize: "8–24",
    duration: 25,
    descEn: "One team escorts the VIP across the arena. The other hunts them down. Strategy, formation, and sacrifice.",
    descUk: "Одна команда супроводжує VIP через арену. Інша — полює. Стратегія, формація, жертовність.",
    tagEn: "HIGH STAKES",
    tagUk: "ВИСОКА СТАВКА",
  },
  {
    id: 4,
    emoji: "🧟",
    nameEn: "Zombie Survival",
    nameUk: "Виживання від зомбі",
    difficulty: 5,
    teamSize: "6–20",
    duration: 20,
    descEn: "Survivors must last until evacuation while zombie players respawn and multiply. Fear is your worst enemy.",
    descUk: "Вижи до евакуації, поки зомбі воскресають і множаться. Страх — твій найгірший ворог.",
    tagEn: "SURVIVAL",
    tagUk: "ВИЖИВАННЯ",
  },
];

const packages = [
  {
    id: "basic",
    nameEn: "BASIC",
    nameUk: "БАЗОВИЙ",
    price: 299,
    gamesEn: "1 Game Session",
    gamesUk: "1 ігрова сесія",
    duration: 20,
    color: "#4d7c0f",
    popular: false,
    includedEn: ["Laser tagger + vest", "1 game (20 min)", "Basic briefing", "Lockers"],
    includedUk: ["Лазерний тагер + жилет", "1 гра (20 хв)", "Базовий брифінг", "Камери схову"],
  },
  {
    id: "pro",
    nameEn: "PRO",
    nameUk: "ПРО",
    price: 699,
    gamesEn: "3 Game Sessions",
    gamesUk: "3 ігрові сесії",
    duration: 60,
    color: "#ea580c",
    popular: true,
    includedEn: ["Laser tagger + vest", "3 games (60 min total)", "Tactical briefing", "Lockers", "Scenario choice", "Team photo"],
    includedUk: ["Лазерний тагер + жилет", "3 гри (60 хв загалом)", "Тактичний брифінг", "Камери схову", "Вибір сценарію", "Командне фото"],
  },
  {
    id: "ultimate",
    nameEn: "ULTIMATE",
    nameUk: "УЛЬТИМЕЙТ",
    price: 1299,
    gamesEn: "5 Game Sessions",
    gamesUk: "5 ігрових сесій",
    duration: 120,
    color: "#dc2626",
    popular: false,
    includedEn: ["Full tactical gear kit", "5 games (120 min)", "Private briefing room", "Lockers", "All scenarios", "Video highlight reel", "Stats dashboard", "Commander badge"],
    includedUk: ["Повний набір тактичного спорядження", "5 ігор (120 хв)", "Приватна кімната брифінгу", "Камери схову", "Всі сценарії", "Відеохайлайти", "Дашборд статистики", "Нашивка командира"],
  },
];

const timeSlots = ["10:00", "11:30", "13:00", "14:30", "16:00", "17:30", "19:00", "20:30", "22:00"];

const leaderboard = [
  { rank: 1, callsign: "GHOST_X", wins: 142, accuracy: 89, emoji: "🥇" },
  { rank: 2, callsign: "VIPER_7", wins: 118, accuracy: 84, emoji: "🥈" },
  { rank: 3, callsign: "WRAITH", wins: 97, accuracy: 91, emoji: "🥉" },
  { rank: 4, callsign: "NOMAD_9", wins: 85, accuracy: 77, emoji: "🎯" },
  { rank: 5, callsign: "SHADOW_K", wins: 71, accuracy: 82, emoji: "🎯" },
];

const testimonials = [
  {
    nameEn: "Alex M. — Team Lead, TechCorp",
    nameUk: "Олексій М. — тімлід, TechCorp",
    textEn: "Best team building we've ever done. 18 people, 3 scenarios, zero complaints. Already booked the next one.",
    textUk: "Найкращий тімбілдинг у нашій практиці. 18 людей, 3 сценарії, нуль скарг. Вже забронювали наступний.",
  },
  {
    nameEn: "Olena K. — HR Manager, FinGroup",
    nameUk: "Олена К. — HR-менеджер, FinGroup",
    textEn: "Everyone from interns to senior managers was completely invested. LaserTag Arena delivered on every promise.",
    textUk: "Від стажистів до топ-менеджерів — всі були повністю залучені. LaserTag Arena виконала кожну обіцянку.",
  },
  {
    nameEn: "Dmytro P. — Birthday boy, 30 years",
    nameUk: "Дмитро П. — іменинник, 30 років",
    textEn: "My 30th birthday celebration was legendary. The VIP Protection scenario with 16 friends? Unforgettable.",
    textUk: "Мій 30-й день народження став легендарним. Сценарій «Захист VIP» із 16 друзями? Незабутньо.",
  },
];

export function LaserTagDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [activeSection, setActiveSection] = useState("scenarios");
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [groupSize, setGroupSize] = useState(6);
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [bookingDone, setBookingDone] = useState(false);
  const [activeZone, setActiveZone] = useState<string | null>(null);

  const navItems = [
    { key: "scenarios", en: "Game Scenarios", uk: "Сценарії" },
    { key: "map", en: "Arena Map", uk: "Карта арени" },
    { key: "book", en: "Book", uk: "Бронювання" },
    { key: "prices", en: "Prices", uk: "Ціни" },
    { key: "birthday", en: "Birthday", uk: "Свята" },
    { key: "leaderboard", en: "Leaderboard", uk: "Рейтинг" },
  ];

  const zones = [
    { id: "alpha", label: isUk ? "Зона Альфа" : "Alpha Zone", color: "#4d7c0f", top: "8%", left: "6%", width: "30%", height: "38%" },
    { id: "beta", label: isUk ? "Зона Бета" : "Beta Zone", color: "#1d4ed8", top: "8%", left: "64%", width: "30%", height: "38%" },
    { id: "command", label: isUk ? "Командний пост" : "Command Post", color: "#ea580c", top: "30%", left: "38%", width: "24%", height: "18%" },
    { id: "respawnA", label: isUk ? "Рестарт А" : "Respawn A", color: "#365314", top: "54%", left: "6%", width: "16%", height: "14%" },
    { id: "respawnB", label: isUk ? "Рестарт Б" : "Respawn B", color: "#1e3a8a", top: "54%", left: "78%", width: "16%", height: "14%" },
    { id: "corridor", label: isUk ? "Коридор" : "Corridor", color: "#292524", top: "48%", left: "28%", width: "44%", height: "8%" },
    { id: "bunker", label: isUk ? "Бункер" : "Bunker", color: "#78350f", top: "62%", left: "36%", width: "28%", height: "20%" },
  ];

  const handleBookingSubmit = () => {
    if (bookingStep < 4) {
      setBookingStep(bookingStep + 1);
    } else {
      setBookingDone(true);
    }
  };

  const canProceed = () => {
    if (bookingStep === 1) return selectedDate !== "" && selectedTime !== "";
    if (bookingStep === 2) return groupSize >= 2 && selectedScenario !== null;
    if (bookingStep === 3) return selectedPackage !== null;
    if (bookingStep === 4) return contactName.trim() !== "" && contactPhone.trim() !== "";
    return false;
  };

  return (
    <div
      style={{ fontFamily: "'Arial', sans-serif", background: "#0c0a09", color: "#e7e5e4", minHeight: "100vh", overflow: "hidden" }}
    >
      {/* HEADER */}
      <header style={{ background: "#0c0a09", borderBottom: "2px solid #365314", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 16px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 22 }}>⚡</span>
            <span
              style={{
                fontWeight: 900,
                fontSize: 18,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#f97316",
                textShadow: "0 0 12px #ea580c88",
              }}
            >
              LASER TAG ARENA
            </span>
          </div>
          {/* Nav */}
          <nav style={{ display: "flex", gap: 20, alignItems: "center" }}>
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveSection(item.key)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: activeSection === item.key ? "#f97316" : "#a8a29e",
                  fontWeight: 700,
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  borderBottom: activeSection === item.key ? "2px solid #f97316" : "2px solid transparent",
                  paddingBottom: 2,
                  transition: "color 0.2s",
                }}
              >
                {isUk ? item.uk : item.en}
              </button>
            ))}
            <button
              onClick={() => setActiveSection("book")}
              style={{
                background: "#ea580c",
                color: "#fff",
                border: "none",
                borderRadius: 4,
                padding: "8px 18px",
                fontWeight: 900,
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                cursor: "pointer",
                boxShadow: "0 0 14px #ea580c66",
              }}
            >
              {isUk ? "ЗАБРОНЮВАТИ" : "BOOK NOW"}
            </button>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section
        style={{
          position: "relative",
          background: "#0c0a09",
          padding: "80px 16px 64px",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        {/* Neon glow orbs */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "10%",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "radial-gradient(circle, #4d7c0f44 0%, transparent 70%)",
            filter: "blur(40px)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "10%",
            right: "8%",
            width: 280,
            height: 280,
            borderRadius: "50%",
            background: "radial-gradient(circle, #ea580c33 0%, transparent 70%)",
            filter: "blur(40px)",
            pointerEvents: "none",
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: "inline-block",
            background: "#1c1917",
            border: "1px solid #4d7c0f",
            borderRadius: 4,
            padding: "4px 16px",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.15em",
            color: "#86efac",
            marginBottom: 24,
            textTransform: "uppercase",
          }}
        >
          {isUk ? "🎯 ТАКТИЧНИЙ ЛАЗЕРНИЙ БІЙ" : "🎯 TACTICAL LASER COMBAT"}
        </div>

        <h1
          style={{
            fontSize: 52,
            fontWeight: 900,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            lineHeight: 1.1,
            marginBottom: 16,
            color: "#fafaf9",
            textShadow: "0 0 30px #ea580c66, 0 0 60px #ea580c33",
          }}
        >
          {isUk ? "УВІЙДИ В" : "ENTER THE"}
          <br />
          <span style={{ color: "#f97316", textShadow: "0 0 20px #f97316aa" }}>
            {isUk ? "ЗОНУ БОЮ" : "BATTLE ZONE"}
          </span>
        </h1>

        <p
          style={{
            color: "#a8a29e",
            fontSize: 16,
            maxWidth: 560,
            margin: "0 auto 32px",
            lineHeight: 1.7,
          }}
        >
          {isUk
            ? "Реальні тактичні битви. Командна стратегія. Адреналін на максимумі — арена 1200 м² чекає на тебе."
            : "Real tactical battles. Team strategy. Maximum adrenaline — a 1200 m² arena awaits you."}
        </p>

        {/* Countdown */}
        <div
          style={{
            display: "inline-flex",
            gap: 8,
            background: "#1c1917",
            border: "1px solid #365314",
            borderRadius: 8,
            padding: "12px 24px",
            marginBottom: 32,
            alignItems: "center",
          }}
        >
          <span style={{ color: "#86efac", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            {isUk ? "⏱ НАСТУПНА СЕСІЯ:" : "⏱ NEXT SESSION:"}
          </span>
          {["00", "47", "32"].map((val, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  background: "#0c0a09",
                  border: "1px solid #4d7c0f",
                  borderRadius: 4,
                  padding: "4px 12px",
                  fontWeight: 900,
                  fontSize: 22,
                  color: "#f97316",
                  fontFamily: "monospace",
                  boxShadow: "0 0 8px #4d7c0f44",
                }}
              >
                {val}
              </div>
              {i < 2 && <span style={{ color: "#4d7c0f", fontWeight: 900, fontSize: 20 }}>:</span>}
            </div>
          ))}
          <span style={{ color: "#78716c", fontSize: 11, letterSpacing: "0.08em" }}>
            {isUk ? "ГОД : ХВ : СЕК" : "HH : MM : SS"}
          </span>
        </div>

        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => setActiveSection("book")}
            style={{
              background: "#ea580c",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              padding: "14px 36px",
              fontWeight: 900,
              fontSize: 14,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              cursor: "pointer",
              boxShadow: "0 0 20px #ea580c77",
            }}
          >
            {isUk ? "⚡ ЗАБРОНЮВАТИ БІЙ" : "⚡ BOOK BATTLE"}
          </button>
          <button
            onClick={() => setActiveSection("scenarios")}
            style={{
              background: "transparent",
              color: "#86efac",
              border: "2px solid #4d7c0f",
              borderRadius: 6,
              padding: "14px 36px",
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            {isUk ? "🎯 СЦЕНАРІЇ" : "🎯 VIEW SCENARIOS"}
          </button>
        </div>

        {/* Stats strip */}
        <div style={{ display: "flex", gap: 0, justifyContent: "center", marginTop: 48, flexWrap: "wrap" }}>
          {[
            { num: "1200", labelEn: "m² Arena", labelUk: "м² Арена" },
            { num: "4", labelEn: "Battle Scenarios", labelUk: "Сценарії бою" },
            { num: "30", labelEn: "Max Players", labelUk: "Макс. гравців" },
            { num: "15K+", labelEn: "Missions Played", labelUk: "Місій зіграно" },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                padding: "16px 32px",
                borderLeft: i > 0 ? "1px solid #292524" : "none",
                textAlign: "center",
              }}
            >
              <div style={{ fontWeight: 900, fontSize: 28, color: "#f97316", letterSpacing: "0.04em" }}>{stat.num}</div>
              <div style={{ fontSize: 11, color: "#78716c", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 2 }}>
                {isUk ? stat.labelUk : stat.labelEn}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 16px 80px" }}>

        {/* GAME SCENARIOS */}
        {activeSection === "scenarios" && (
          <div>
            <SectionHeader
              en="GAME SCENARIOS"
              uk="СЦЕНАРІЇ БОЮ"
              subEn="Choose your battlefield. Every scenario demands different tactics."
              subUk="Обери своє поле бою. Кожен сценарій вимагає різної тактики."
              isUk={isUk}
            />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginTop: 32 }}>
              {scenarios.map((sc) => (
                <div
                  key={sc.id}
                  style={{
                    background: "#1c1917",
                    border: "1px solid #292524",
                    borderRadius: 8,
                    padding: 24,
                    position: "relative",
                    overflow: "hidden",
                    transition: "border-color 0.2s",
                    borderTop: "3px solid #4d7c0f",
                  }}
                >
                  {/* Tag */}
                  <div
                    style={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      background: "#0c0a09",
                      border: "1px solid #365314",
                      borderRadius: 3,
                      padding: "2px 8px",
                      fontSize: 9,
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      color: "#86efac",
                      textTransform: "uppercase",
                    }}
                  >
                    {isUk ? sc.tagUk : sc.tagEn}
                  </div>

                  <div style={{ marginBottom: 12 }}><EmojiIcon emoji={sc.emoji} className="w-10 h-10" /></div>
                  <h3 style={{ fontWeight: 900, fontSize: 16, letterSpacing: "0.08em", textTransform: "uppercase", color: "#fafaf9", marginBottom: 8 }}>
                    {isUk ? sc.nameUk : sc.nameEn}
                  </h3>

                  {/* Difficulty */}
                  <div style={{ display: "flex", gap: 4, alignItems: "center", marginBottom: 12 }}>
                    <span style={{ fontSize: 10, color: "#78716c", textTransform: "uppercase", letterSpacing: "0.1em", marginRight: 4 }}>
                      {isUk ? "СКЛАДНІСТЬ:" : "DIFFICULTY:"}
                    </span>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} style={{ color: star <= sc.difficulty ? "#f97316" : "#292524", fontSize: 14 }}>★</span>
                    ))}
                  </div>

                  {/* Meta */}
                  <div style={{ display: "flex", gap: 16, marginBottom: 14 }}>
                    <span style={{ fontSize: 11, color: "#a8a29e" }}>
                      👥 {sc.teamSize} {isUk ? "грав." : "players"}
                    </span>
                    <span style={{ fontSize: 11, color: "#a8a29e" }}>
                      ⏱ {sc.duration} {isUk ? "хв" : "min"}
                    </span>
                  </div>

                  <p style={{ fontSize: 13, color: "#78716c", lineHeight: 1.6, margin: 0 }}>
                    {isUk ? sc.descUk : sc.descEn}
                  </p>

                  <button
                    onClick={() => { setSelectedScenario(sc.id.toString()); setActiveSection("book"); setBookingStep(2); }}
                    style={{
                      marginTop: 16,
                      background: "transparent",
                      border: "1px solid #4d7c0f",
                      borderRadius: 4,
                      padding: "8px 16px",
                      color: "#86efac",
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      width: "100%",
                    }}
                  >
                    {isUk ? "ВИБРАТИ СЦЕНАРІЙ" : "SELECT SCENARIO"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ARENA MAP */}
        {activeSection === "map" && (
          <div>
            <SectionHeader
              en="ARENA MAP"
              uk="КАРТА АРЕНИ"
              subEn="Study the battlefield. Know the zones. Plan your tactics."
              subUk="Вивчи поле бою. Знай зони. Плануй тактику."
              isUk={isUk}
            />
            <div style={{ display: "flex", gap: 24, marginTop: 32, flexWrap: "wrap" }}>
              {/* Map */}
              <div
                style={{
                  flex: "1 1 480px",
                  background: "#1c1917",
                  border: "2px solid #292524",
                  borderRadius: 8,
                  position: "relative",
                  height: 420,
                  overflow: "hidden",
                }}
              >
                {/* Grid overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: "linear-gradient(#365314 1px, transparent 1px), linear-gradient(90deg, #365314 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                    opacity: 0.12,
                  }}
                />
                {/* Compass */}
                <div style={{ position: "absolute", top: 12, right: 12, background: "#0c0a09", border: "1px solid #365314", borderRadius: "50%", width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, zIndex: 10 }}>
                  🧭
                </div>
                {/* Scale */}
                <div style={{ position: "absolute", bottom: 12, right: 12, background: "#0c0a09", border: "1px solid #292524", borderRadius: 4, padding: "2px 10px", fontSize: 9, color: "#78716c", letterSpacing: "0.08em", zIndex: 10 }}>
                  {isUk ? "МАСШТАБ 1:50" : "SCALE 1:50"}
                </div>

                {/* Outer wall */}
                <div style={{ position: "absolute", inset: "4%", border: "2px solid #4d7c0f", borderRadius: 6, opacity: 0.5 }} />

                {/* Zones */}
                {zones.map((zone) => (
                  <div
                    key={zone.id}
                    onClick={() => setActiveZone(activeZone === zone.id ? null : zone.id)}
                    style={{
                      position: "absolute",
                      top: zone.top,
                      left: zone.left,
                      width: zone.width,
                      height: zone.height,
                      background: zone.color,
                      opacity: activeZone === zone.id ? 0.9 : 0.55,
                      borderRadius: 4,
                      border: activeZone === zone.id ? "2px solid #f97316" : "1px solid rgba(255,255,255,0.1)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "opacity 0.2s, border 0.2s",
                      boxShadow: activeZone === zone.id ? `0 0 16px ${zone.color}88` : "none",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 9,
                        fontWeight: 900,
                        color: "#fff",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        textAlign: "center",
                        textShadow: "0 1px 4px rgba(0,0,0,0.8)",
                        padding: "2px 4px",
                      }}
                    >
                      {zone.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Zone legend */}
              <div style={{ flex: "1 1 220px", display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#78716c", marginBottom: 8 }}>
                  {isUk ? "ЛЕГЕНДА ЗОНИ" : "ZONE LEGEND"}
                </div>
                {zones.map((zone) => (
                  <div
                    key={zone.id}
                    onClick={() => setActiveZone(activeZone === zone.id ? null : zone.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      background: activeZone === zone.id ? "#292524" : "transparent",
                      border: "1px solid",
                      borderColor: activeZone === zone.id ? "#4d7c0f" : "#292524",
                      borderRadius: 6,
                      padding: "10px 14px",
                      cursor: "pointer",
                      transition: "background 0.2s",
                    }}
                  >
                    <div style={{ width: 14, height: 14, borderRadius: 3, background: zone.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: "#e7e5e4", fontWeight: 600 }}>{zone.label}</span>
                  </div>
                ))}
                <div style={{ marginTop: 12, background: "#1c1917", border: "1px solid #365314", borderRadius: 6, padding: 14 }}>
                  <div style={{ fontSize: 11, color: "#86efac", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>
                    💡 {isUk ? "ТАКТИЧНА ПОРАДА" : "TACTICAL TIP"}
                  </div>
                  <p style={{ fontSize: 12, color: "#a8a29e", lineHeight: 1.6, margin: 0 }}>
                    {isUk
                      ? "Командний пост у центрі — ключ до контролю арени. Хто тримає пост, диктує темп бою."
                      : "The central Command Post is the key to arena control. Who holds the post dictates the battle's pace."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* BOOKING */}
        {activeSection === "book" && (
          <div>
            <SectionHeader
              en="BOOK YOUR BATTLE"
              uk="ЗАБРОНЮЙ БІЙ"
              subEn="4 steps. Lock in your squad. Gear up."
              subUk="4 кроки. Збери загін. Готуйся до бою."
              isUk={isUk}
            />

            {bookingDone ? (
              <div
                style={{
                  textAlign: "center",
                  background: "#1c1917",
                  border: "2px solid #4d7c0f",
                  borderRadius: 12,
                  padding: "56px 32px",
                  marginTop: 32,
                  boxShadow: "0 0 40px #4d7c0f33",
                }}
              >
                <div style={{ fontSize: 56, marginBottom: 16 }}>⚡</div>
                <h3 style={{ fontWeight: 900, fontSize: 24, letterSpacing: "0.1em", textTransform: "uppercase", color: "#f97316", marginBottom: 8 }}>
                  {isUk ? "БІЙ ЗАБРОНЬОВАНО!" : "BATTLE CONFIRMED!"}
                </h3>
                <p style={{ color: "#a8a29e", fontSize: 15, marginBottom: 24 }}>
                  {isUk
                    ? `Підтвердження надіслано на ваш номер. Прибудь за 20 хв до початку, ${contactName}.`
                    : `Confirmation sent to your number. Arrive 20 min early, ${contactName}.`}
                </p>
                <button
                  onClick={() => { setBookingDone(false); setBookingStep(1); setSelectedDate(""); setSelectedTime(""); setSelectedScenario(null); setSelectedPackage(null); setContactName(""); setContactPhone(""); }}
                  style={{ background: "#ea580c", color: "#fff", border: "none", borderRadius: 6, padding: "12px 28px", fontWeight: 900, fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}
                >
                  {isUk ? "НОВЕ БРОНЮВАННЯ" : "NEW BOOKING"}
                </button>
              </div>
            ) : (
              <div style={{ marginTop: 32 }}>
                {/* Progress bar */}
                <div style={{ display: "flex", gap: 0, marginBottom: 32 }}>
                  {[1, 2, 3, 4].map((step) => (
                    <div key={step} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: "50%",
                          background: step < bookingStep ? "#4d7c0f" : step === bookingStep ? "#ea580c" : "#292524",
                          border: step === bookingStep ? "2px solid #f97316" : "2px solid transparent",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 900,
                          fontSize: 13,
                          color: "#fff",
                          boxShadow: step === bookingStep ? "0 0 12px #ea580c77" : "none",
                          zIndex: 2,
                        }}
                      >
                        {step < bookingStep ? "✓" : step}
                      </div>
                      <div style={{ fontSize: 9, color: step === bookingStep ? "#f97316" : "#78716c", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 6, fontWeight: 700 }}>
                        {isUk
                          ? ["ДАТА/ЧАС", "ЗАГІН", "ПАКЕТ", "КОНТАКТ"][step - 1]
                          : ["DATE/TIME", "SQUAD", "PACKAGE", "CONTACT"][step - 1]}
                      </div>
                      {step < 4 && (
                        <div style={{ position: "absolute", top: 18, left: "50%", width: "100%", height: 2, background: step < bookingStep ? "#4d7c0f" : "#292524", zIndex: 1 }} />
                      )}
                    </div>
                  ))}
                </div>

                {/* Step 1: Date & Time */}
                {bookingStep === 1 && (
                  <div style={{ background: "#1c1917", border: "1px solid #292524", borderRadius: 8, padding: 28 }}>
                    <h4 style={{ fontWeight: 900, fontSize: 14, letterSpacing: "0.12em", textTransform: "uppercase", color: "#f97316", marginBottom: 20 }}>
                      {isUk ? "01 — ОБЕРІТЬ ДАТУ" : "01 — SELECT DATE"}
                    </h4>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16, marginBottom: 24 }}>
                      <div>
                        <label style={{ display: "block", fontSize: 11, color: "#78716c", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
                          {isUk ? "ДАТА" : "DATE"}
                        </label>
                        <input
                          type="date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          style={{ background: "#0c0a09", border: "1px solid #365314", borderRadius: 4, padding: "10px 14px", color: "#e7e5e4", fontSize: 14, width: "100%", boxSizing: "border-box" }}
                        />
                      </div>
                    </div>
                    <h4 style={{ fontWeight: 900, fontSize: 14, letterSpacing: "0.12em", textTransform: "uppercase", color: "#f97316", marginBottom: 16 }}>
                      {isUk ? "ЧАС СЕСІЇ" : "SESSION TIME"}
                    </h4>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))", gap: 10 }}>
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setSelectedTime(slot)}
                          style={{
                            background: selectedTime === slot ? "#ea580c" : "#0c0a09",
                            border: selectedTime === slot ? "2px solid #f97316" : "1px solid #292524",
                            borderRadius: 4,
                            padding: "12px 8px",
                            color: selectedTime === slot ? "#fff" : "#a8a29e",
                            fontWeight: 700,
                            fontSize: 14,
                            cursor: "pointer",
                            letterSpacing: "0.06em",
                            boxShadow: selectedTime === slot ? "0 0 10px #ea580c66" : "none",
                          }}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Group size + scenario */}
                {bookingStep === 2 && (
                  <div style={{ background: "#1c1917", border: "1px solid #292524", borderRadius: 8, padding: 28 }}>
                    <h4 style={{ fontWeight: 900, fontSize: 14, letterSpacing: "0.12em", textTransform: "uppercase", color: "#f97316", marginBottom: 20 }}>
                      {isUk ? "02 — РОЗМІР ЗАГОНУ ТА СЦЕНАРІЙ" : "02 — SQUAD SIZE & SCENARIO"}
                    </h4>
                    {/* Group size */}
                    <div style={{ marginBottom: 28 }}>
                      <label style={{ display: "block", fontSize: 11, color: "#78716c", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>
                        {isUk ? `КІЛЬКІСТЬ ГРАВЦІВ: ${groupSize}` : `NUMBER OF PLAYERS: ${groupSize}`}
                      </label>
                      <input
                        type="range"
                        min={2}
                        max={30}
                        value={groupSize}
                        onChange={(e) => setGroupSize(Number(e.target.value))}
                        style={{ width: "100%", accentColor: "#ea580c" }}
                      />
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#78716c", marginTop: 4 }}>
                        <span>2</span>
                        <span>30</span>
                      </div>
                    </div>
                    {/* Scenario choice */}
                    <label style={{ display: "block", fontSize: 11, color: "#78716c", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>
                      {isUk ? "СЦЕНАРІЙ" : "SCENARIO"}
                    </label>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
                      {scenarios.map((sc) => (
                        <button
                          key={sc.id}
                          onClick={() => setSelectedScenario(sc.id.toString())}
                          style={{
                            background: selectedScenario === sc.id.toString() ? "#1a2e0a" : "#0c0a09",
                            border: selectedScenario === sc.id.toString() ? "2px solid #4d7c0f" : "1px solid #292524",
                            borderRadius: 6,
                            padding: "14px 16px",
                            textAlign: "left",
                            cursor: "pointer",
                            boxShadow: selectedScenario === sc.id.toString() ? "0 0 12px #4d7c0f44" : "none",
                          }}
                        >
                          <div style={{ marginBottom: 6 }}><EmojiIcon emoji={sc.emoji} className="w-8 h-8" /></div>
                          <div style={{ fontWeight: 700, fontSize: 12, color: selectedScenario === sc.id.toString() ? "#86efac" : "#e7e5e4", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                            {isUk ? sc.nameUk : sc.nameEn}
                          </div>
                          <div style={{ fontSize: 11, color: "#78716c", marginTop: 4 }}>
                            ⏱ {sc.duration} {isUk ? "хв" : "min"}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: Package */}
                {bookingStep === 3 && (
                  <div style={{ background: "#1c1917", border: "1px solid #292524", borderRadius: 8, padding: 28 }}>
                    <h4 style={{ fontWeight: 900, fontSize: 14, letterSpacing: "0.12em", textTransform: "uppercase", color: "#f97316", marginBottom: 20 }}>
                      {isUk ? "03 — ОБЕРІТЬ ПАКЕТ" : "03 — CHOOSE PACKAGE"}
                    </h4>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
                      {packages.map((pkg) => (
                        <div
                          key={pkg.id}
                          onClick={() => setSelectedPackage(pkg.id)}
                          style={{
                            background: selectedPackage === pkg.id ? "#111" : "#0c0a09",
                            border: `2px solid ${selectedPackage === pkg.id ? pkg.color : "#292524"}`,
                            borderRadius: 8,
                            padding: 20,
                            cursor: "pointer",
                            position: "relative",
                            boxShadow: selectedPackage === pkg.id ? `0 0 16px ${pkg.color}55` : "none",
                          }}
                        >
                          {pkg.popular && (
                            <div
                              style={{
                                position: "absolute",
                                top: -10,
                                left: "50%",
                                transform: "translateX(-50%)",
                                background: pkg.color,
                                color: "#fff",
                                fontSize: 9,
                                fontWeight: 900,
                                letterSpacing: "0.12em",
                                padding: "3px 12px",
                                borderRadius: 12,
                                textTransform: "uppercase",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {isUk ? "ПОПУЛЯРНЕ" : "POPULAR"}
                            </div>
                          )}
                          <div style={{ fontWeight: 900, fontSize: 16, letterSpacing: "0.1em", color: pkg.color, marginBottom: 4, textTransform: "uppercase" }}>
                            {isUk ? pkg.nameUk : pkg.nameEn}
                          </div>
                          <div style={{ fontWeight: 900, fontSize: 28, color: "#fafaf9", marginBottom: 4 }}>
                            ₴{pkg.price}
                          </div>
                          <div style={{ fontSize: 11, color: "#78716c", marginBottom: 16 }}>
                            {isUk ? pkg.gamesUk : pkg.gamesEn}
                          </div>
                          {(isUk ? pkg.includedUk : pkg.includedEn).map((item, i) => (
                            <div key={i} style={{ fontSize: 12, color: "#a8a29e", display: "flex", alignItems: "flex-start", gap: 6, marginBottom: 6 }}>
                              <span style={{ color: "#4d7c0f", flexShrink: 0 }}>✓</span>
                              {item}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 4: Contact */}
                {bookingStep === 4 && (
                  <div style={{ background: "#1c1917", border: "1px solid #292524", borderRadius: 8, padding: 28, maxWidth: 480 }}>
                    <h4 style={{ fontWeight: 900, fontSize: 14, letterSpacing: "0.12em", textTransform: "uppercase", color: "#f97316", marginBottom: 20 }}>
                      {isUk ? "04 — КОНТАКТНІ ДАНІ" : "04 — CONTACT DETAILS"}
                    </h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                      <div>
                        <label style={{ display: "block", fontSize: 11, color: "#78716c", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
                          {isUk ? "ІМ'Я КОМАНДИРА" : "COMMANDER NAME"}
                        </label>
                        <input
                          type="text"
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder={isUk ? "Ваше ім'я" : "Your name"}
                          style={{ background: "#0c0a09", border: "1px solid #365314", borderRadius: 4, padding: "10px 14px", color: "#e7e5e4", fontSize: 14, width: "100%", boxSizing: "border-box" }}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: 11, color: "#78716c", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
                          {isUk ? "ТЕЛЕФОН" : "PHONE"}
                        </label>
                        <input
                          type="tel"
                          value={contactPhone}
                          onChange={(e) => setContactPhone(e.target.value)}
                          placeholder="+380..."
                          style={{ background: "#0c0a09", border: "1px solid #365314", borderRadius: 4, padding: "10px 14px", color: "#e7e5e4", fontSize: 14, width: "100%", boxSizing: "border-box" }}
                        />
                      </div>
                      {/* Summary */}
                      <div style={{ background: "#0c0a09", border: "1px solid #292524", borderRadius: 6, padding: 16 }}>
                        <div style={{ fontSize: 11, color: "#78716c", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>
                          {isUk ? "ПІДСУМОК ЗАМОВЛЕННЯ" : "ORDER SUMMARY"}
                        </div>
                        {[
                          { labelEn: "Date", labelUk: "Дата", val: selectedDate },
                          { labelEn: "Time", labelUk: "Час", val: selectedTime },
                          { labelEn: "Players", labelUk: "Гравці", val: groupSize.toString() },
                          { labelEn: "Scenario", labelUk: "Сценарій", val: scenarios.find((s) => s.id.toString() === selectedScenario)?.[isUk ? "nameUk" : "nameEn"] || "—" },
                          { labelEn: "Package", labelUk: "Пакет", val: packages.find((p) => p.id === selectedPackage)?.[isUk ? "nameUk" : "nameEn"] || "—" },
                        ].map((row, i) => (
                          <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
                            <span style={{ color: "#78716c" }}>{isUk ? row.labelUk : row.labelEn}:</span>
                            <span style={{ color: "#e7e5e4", fontWeight: 600 }}>{row.val}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation buttons */}
                <div style={{ display: "flex", gap: 12, marginTop: 24, justifyContent: "space-between" }}>
                  {bookingStep > 1 && (
                    <button
                      onClick={() => setBookingStep(bookingStep - 1)}
                      style={{ background: "transparent", border: "1px solid #292524", borderRadius: 6, padding: "12px 24px", color: "#a8a29e", fontWeight: 700, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}
                    >
                      {isUk ? "← НАЗАД" : "← BACK"}
                    </button>
                  )}
                  <button
                    onClick={handleBookingSubmit}
                    disabled={!canProceed()}
                    style={{
                      background: canProceed() ? "#ea580c" : "#292524",
                      color: canProceed() ? "#fff" : "#78716c",
                      border: "none",
                      borderRadius: 6,
                      padding: "12px 32px",
                      fontWeight: 900,
                      fontSize: 12,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      cursor: canProceed() ? "pointer" : "not-allowed",
                      boxShadow: canProceed() ? "0 0 16px #ea580c55" : "none",
                      marginLeft: "auto",
                    }}
                  >
                    {bookingStep === 4 ? (isUk ? "⚡ ПІДТВЕРДИТИ БІЙ" : "⚡ CONFIRM BATTLE") : (isUk ? "ДАЛІ →" : "NEXT →")}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* PRICES */}
        {activeSection === "prices" && (
          <div>
            <SectionHeader
              en="PACKAGES & PRICING"
              uk="ПАКЕТИ ТА ЦІНИ"
              subEn="No hidden fees. Full tactical experience. Every time."
              subUk="Без прихованих платежів. Повний тактичний досвід. Щоразу."
              isUk={isUk}
            />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, marginTop: 32 }}>
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  style={{
                    background: "#1c1917",
                    border: `2px solid ${pkg.popular ? pkg.color : "#292524"}`,
                    borderRadius: 10,
                    padding: 28,
                    position: "relative",
                    boxShadow: pkg.popular ? `0 0 24px ${pkg.color}33` : "none",
                  }}
                >
                  {pkg.popular && (
                    <div
                      style={{
                        position: "absolute",
                        top: -12,
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: pkg.color,
                        color: "#fff",
                        fontSize: 9,
                        fontWeight: 900,
                        letterSpacing: "0.14em",
                        padding: "4px 16px",
                        borderRadius: 12,
                        textTransform: "uppercase",
                        whiteSpace: "nowrap",
                      }}
                    >
                      ⭐ {isUk ? "НАЙПОПУЛЯРНІШИЙ" : "MOST POPULAR"}
                    </div>
                  )}

                  <div style={{ textAlign: "center", marginBottom: 20 }}>
                    <div style={{ fontWeight: 900, fontSize: 20, letterSpacing: "0.14em", color: pkg.color, textTransform: "uppercase", marginBottom: 8 }}>
                      {isUk ? pkg.nameUk : pkg.nameEn}
                    </div>
                    <div style={{ fontWeight: 900, fontSize: 44, color: "#fafaf9" }}>
                      ₴{pkg.price}
                    </div>
                    <div style={{ fontSize: 12, color: "#78716c", marginTop: 4 }}>
                      {isUk ? pkg.gamesUk : pkg.gamesEn} · {pkg.duration} {isUk ? "хв" : "min"}
                    </div>
                  </div>

                  <div style={{ borderTop: "1px solid #292524", paddingTop: 20 }}>
                    {(isUk ? pkg.includedUk : pkg.includedEn).map((item, i) => (
                      <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
                        <span style={{ color: pkg.color, fontWeight: 700, flexShrink: 0 }}>✓</span>
                        <span style={{ fontSize: 13, color: "#a8a29e" }}>{item}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => { setSelectedPackage(pkg.id); setActiveSection("book"); setBookingStep(3); }}
                    style={{
                      marginTop: 20,
                      width: "100%",
                      background: pkg.popular ? pkg.color : "transparent",
                      border: `2px solid ${pkg.color}`,
                      borderRadius: 6,
                      padding: "12px 0",
                      color: pkg.popular ? "#fff" : pkg.color,
                      fontWeight: 900,
                      fontSize: 12,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      boxShadow: pkg.popular ? `0 0 16px ${pkg.color}44` : "none",
                    }}
                  >
                    {isUk ? "ВИБРАТИ ПАКЕТ" : "SELECT PACKAGE"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BIRTHDAY / CORPORATE */}
        {activeSection === "birthday" && (
          <div>
            <SectionHeader
              en="BIRTHDAY & CORPORATE"
              uk="ДНІ НАРОДЖЕННЯ ТА КОРПОРАТИВИ"
              subEn="Make it legendary. Private bookings for groups of 8–100."
              subUk="Зроби це легендарним. Приватні бронювання для груп 8–100 осіб."
              isUk={isUk}
            />

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginTop: 32 }}>
              {/* Birthday card */}
              <div style={{ background: "#1c1917", border: "1px solid #292524", borderTop: "3px solid #ea580c", borderRadius: 8, padding: 24 }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>🎂</div>
                <h3 style={{ fontWeight: 900, fontSize: 16, textTransform: "uppercase", letterSpacing: "0.1em", color: "#f97316", marginBottom: 12 }}>
                  {isUk ? "ДЕНЬ НАРОДЖЕННЯ" : "BIRTHDAY PARTY"}
                </h3>
                <p style={{ fontSize: 13, color: "#a8a29e", lineHeight: 1.7, marginBottom: 16 }}>
                  {isUk
                    ? "Організуємо незабутнє свято. Особистий ведучий, декорації у військовому стилі, іменинний кекс, фото та відео."
                    : "We organize an unforgettable celebration. Personal host, military-style decor, birthday cake, photos & video."}
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px" }}>
                  {(isUk
                    ? ["Від 8 гравців", "Приватний зал для брифінгу", "Ведучий на весь час", "Іменинний торт", "Відеохайлайти", "Медаль іменинника"]
                    : ["From 8 players", "Private briefing room", "Dedicated host throughout", "Birthday cake", "Video highlights", "Birthday champion medal"]
                  ).map((item, i) => (
                    <li key={i} style={{ display: "flex", gap: 8, fontSize: 13, color: "#a8a29e", marginBottom: 8 }}>
                      <span style={{ color: "#ea580c" }}>▶</span> {item}
                    </li>
                  ))}
                </ul>
                <div style={{ background: "#0c0a09", border: "1px solid #ea580c44", borderRadius: 6, padding: "10px 14px", fontSize: 13, color: "#f97316", fontWeight: 700, textAlign: "center" }}>
                  {isUk ? "від ₴2500 / подія" : "from ₴2500 / event"}
                </div>
              </div>

              {/* Corporate card */}
              <div style={{ background: "#1c1917", border: "1px solid #292524", borderTop: "3px solid #4d7c0f", borderRadius: 8, padding: 24 }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>🏢</div>
                <h3 style={{ fontWeight: 900, fontSize: 16, textTransform: "uppercase", letterSpacing: "0.1em", color: "#86efac", marginBottom: 12 }}>
                  {isUk ? "КОРПОРАТИВ / ТІМБІЛДИНГ" : "CORPORATE / TEAM BUILDING"}
                </h3>
                <p style={{ fontSize: 13, color: "#a8a29e", lineHeight: 1.7, marginBottom: 16 }}>
                  {isUk
                    ? "Тімбілдинг нового рівня. Реальна командна динаміка. Ніхто не залишається осторонь — ні директор, ні стажист."
                    : "Next-level team building. Real team dynamics. Nobody sits out — not the CEO, not the intern."}
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px" }}>
                  {(isUk
                    ? ["До 100 учасників", "Фасилітатор тімбілдингу", "Звіт з аналізом команди", "Зона кейтерингу", "Корпоративні нашивки", "Командний рейтинг"]
                    : ["Up to 100 participants", "Team-building facilitator", "Team analysis report", "Catering area", "Corporate patches", "Team leaderboard"]
                  ).map((item, i) => (
                    <li key={i} style={{ display: "flex", gap: 8, fontSize: 13, color: "#a8a29e", marginBottom: 8 }}>
                      <span style={{ color: "#4d7c0f" }}>▶</span> {item}
                    </li>
                  ))}
                </ul>
                <div style={{ background: "#0c0a09", border: "1px solid #4d7c0f44", borderRadius: 6, padding: "10px 14px", fontSize: 13, color: "#86efac", fontWeight: 700, textAlign: "center" }}>
                  {isUk ? "від ₴500 / особа" : "from ₴500 / person"}
                </div>
              </div>
            </div>

            {/* Testimonials */}
            <div style={{ marginTop: 40 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#78716c", marginBottom: 20 }}>
                {isUk ? "💬 ВІДГУКИ КЛІЄНТІВ" : "💬 CLIENT TESTIMONIALS"}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
                {testimonials.map((t, i) => (
                  <div key={i} style={{ background: "#1c1917", border: "1px solid #292524", borderRadius: 8, padding: 20 }}>
                    <div style={{ color: "#ea580c", fontSize: 20, marginBottom: 12 }}>❝</div>
                    <p style={{ fontSize: 13, color: "#a8a29e", lineHeight: 1.7, marginBottom: 14, fontStyle: "italic" }}>
                      {isUk ? t.textUk : t.textEn}
                    </p>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#86efac", letterSpacing: "0.04em" }}>
                      — {isUk ? t.nameUk : t.nameEn}
                    </div>
                    <div style={{ display: "flex", gap: 2, marginTop: 8 }}>
                      {[1, 2, 3, 4, 5].map((s) => <span key={s} style={{ color: "#f97316", fontSize: 12 }}>★</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* LEADERBOARD */}
        {activeSection === "leaderboard" && (
          <div>
            <SectionHeader
              en="HALL OF LEGENDS"
              uk="ЗАЛ ЛЕГЕНД"
              subEn="Top operatives. Ranked by wins. The best of the best."
              subUk="Найкращі оперативники. Рейтинг за перемогами. Еліта арени."
              isUk={isUk}
            />
            <div style={{ marginTop: 32, maxWidth: 600 }}>
              {/* Header row */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "40px 1fr 80px 80px",
                  gap: 0,
                  background: "#0c0a09",
                  border: "1px solid #292524",
                  borderRadius: "6px 6px 0 0",
                  padding: "10px 16px",
                }}
              >
                {[isUk ? "РАНГ" : "RANK", isUk ? "ПОЗИВНИЙ" : "CALLSIGN", isUk ? "ПЕРЕМОГИ" : "WINS", isUk ? "ТОЧНІСТЬ" : "ACCURACY"].map((h, i) => (
                  <div key={i} style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#78716c" }}>
                    {h}
                  </div>
                ))}
              </div>

              {leaderboard.map((player, i) => (
                <div
                  key={player.rank}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "40px 1fr 80px 80px",
                    gap: 0,
                    background: i % 2 === 0 ? "#1c1917" : "#161312",
                    border: "1px solid #292524",
                    borderTop: "none",
                    padding: "14px 16px",
                    alignItems: "center",
                    borderRadius: i === leaderboard.length - 1 ? "0 0 6px 6px" : 0,
                  }}
                >
                  <div><EmojiIcon emoji={player.emoji} className="w-5 h-5" /></div>
                  <div>
                    <div style={{ fontWeight: 900, fontSize: 14, letterSpacing: "0.1em", color: player.rank <= 3 ? "#f97316" : "#e7e5e4" }}>
                      {player.callsign}
                    </div>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: "#86efac" }}>{player.wins}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ flex: 1, background: "#292524", borderRadius: 4, height: 6, overflow: "hidden" }}>
                      <div style={{ width: `${player.accuracy}%`, height: "100%", background: player.accuracy >= 85 ? "#4d7c0f" : "#ea580c", borderRadius: 4 }} />
                    </div>
                    <span style={{ fontSize: 12, color: "#a8a29e", minWidth: 32 }}>{player.accuracy}%</span>
                  </div>
                </div>
              ))}

              <div style={{ marginTop: 20, background: "#1c1917", border: "1px solid #365314", borderRadius: 6, padding: 16, textAlign: "center" }}>
                <div style={{ fontSize: 12, color: "#86efac", fontWeight: 700, marginBottom: 4 }}>
                  🎯 {isUk ? "ВАШЕ МІСЦЕ В РЕЙТИНГУ?" : "YOUR RANK AWAITS?"}
                </div>
                <p style={{ fontSize: 12, color: "#78716c", margin: "0 0 12px" }}>
                  {isUk ? "Зіграй і потрап до топ-5. Кожна сесія зараховується." : "Play and enter the top 5. Every session counts."}
                </p>
                <button
                  onClick={() => setActiveSection("book")}
                  style={{ background: "#4d7c0f", color: "#fff", border: "none", borderRadius: 4, padding: "8px 20px", fontWeight: 700, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}
                >
                  {isUk ? "ПОЧАТИ ЗАРАЗ" : "START NOW"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer style={{ background: "#0c0a09", borderTop: "2px solid #1c1917", padding: "40px 16px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {/* Top row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32, marginBottom: 32 }}>
            {/* Brand */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <span style={{ fontSize: 20 }}>⚡</span>
                <span style={{ fontWeight: 900, fontSize: 15, letterSpacing: "0.12em", textTransform: "uppercase", color: "#f97316" }}>
                  LASER TAG ARENA
                </span>
              </div>
              <p style={{ fontSize: 12, color: "#78716c", lineHeight: 1.7 }}>
                {isUk
                  ? "Тактичний лазерний бій для тих, хто хоче більше, ніж просто гру."
                  : "Tactical laser combat for those who want more than just a game."}
              </p>
              <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                {["📘", "📸", "▶️", "🐦"].map((icon, i) => (
                  <div key={i} style={{ width: 32, height: 32, background: "#1c1917", border: "1px solid #292524", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, cursor: "pointer" }}>
                    {icon}
                  </div>
                ))}
              </div>
            </div>

            {/* HQ Info */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#ea580c", marginBottom: 14 }}>
                🏴 {isUk ? "ТАКТИЧНИЙ ШТАБ" : "TACTICAL HQ"}
              </div>
              {[
                { icon: "📍", en: "14 Heroiv Ave, Kyiv, 01001", uk: "просп. Героїв, 14, Київ, 01001" },
                { icon: "📞", en: "+380 44 123 4567", uk: "+380 44 123 4567" },
                { icon: "✉️", en: "ops@lasertagarena.ua", uk: "ops@lasertagarena.ua" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 14 }}>{item.icon}</span>
                  <span style={{ fontSize: 13, color: "#a8a29e" }}>{isUk ? item.uk : item.en}</span>
                </div>
              ))}
            </div>

            {/* Hours */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#ea580c", marginBottom: 14 }}>
                ⏰ {isUk ? "ГОДИНИ РОБОТИ" : "HOURS OF OPERATION"}
              </div>
              {[
                { dayEn: "Mon – Fri", dayUk: "Пн – Пт", hours: "10:00 – 22:00" },
                { dayEn: "Saturday", dayUk: "Субота", hours: "09:00 – 23:00" },
                { dayEn: "Sunday", dayUk: "Неділя", hours: "09:00 – 21:00" },
              ].map((row, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 8 }}>
                  <span style={{ color: "#78716c" }}>{isUk ? row.dayUk : row.dayEn}</span>
                  <span style={{ color: "#86efac", fontWeight: 600 }}>{row.hours}</span>
                </div>
              ))}
              <div style={{ marginTop: 12, background: "#1c1917", border: "1px solid #4d7c0f44", borderRadius: 4, padding: "6px 12px", fontSize: 11, color: "#86efac", textAlign: "center" }}>
                🟢 {isUk ? "ЗАРАЗ ВІДКРИТО" : "NOW OPEN"}
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div style={{ borderTop: "1px solid #1c1917", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <div style={{ fontSize: 11, color: "#44403c", letterSpacing: "0.08em" }}>
              © 2024 LASER TAG ARENA. {isUk ? "Всі права захищено." : "All rights reserved."}
            </div>
            <div style={{ fontSize: 11, color: "#44403c", letterSpacing: "0.06em" }}>
              {isUk ? "ТАКТИКА · КОМАНДНА РОБОТА · АДРЕНАЛІН" : "TACTICS · TEAMWORK · ADRENALINE"}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Helper component
function SectionHeader({
  en, uk, subEn, subUk, isUk,
}: {
  en: string; uk: string; subEn: string; subUk: string; isUk: boolean;
}) {
  return (
    <div style={{ textAlign: "center", marginBottom: 8 }}>
      <div
        style={{
          display: "inline-block",
          background: "#1c1917",
          border: "1px solid #365314",
          borderRadius: 4,
          padding: "3px 14px",
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: "0.18em",
          color: "#86efac",
          textTransform: "uppercase",
          marginBottom: 14,
        }}
      >
        ▌ LASER TAG ARENA
      </div>
      <h2
        style={{
          fontWeight: 900,
          fontSize: 32,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#fafaf9",
          textShadow: "0 0 20px #ea580c33",
          marginBottom: 12,
        }}
      >
        {isUk ? uk : en}
      </h2>
      <p style={{ fontSize: 14, color: "#78716c", maxWidth: 520, margin: "0 auto" }}>
        {isUk ? subUk : subEn}
      </p>
    </div>
  );
}
