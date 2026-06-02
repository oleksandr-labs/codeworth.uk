"use client";

import { useState, type CSSProperties } from "react";

// ─── SVG Icons ────────────────────────────────────────────────────────────────

function IconLock({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function IconKey({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <circle cx="7.5" cy="15.5" r="5.5" />
      <path d="m21 2-9.6 9.6" />
      <path d="m15.5 7.5 3 3L22 7l-3-3" />
    </svg>
  );
}

function IconClock({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function IconUsers({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconFlame({ className, filled, style }: { className?: string; filled?: boolean; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );
}

function IconStar({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function IconCheck({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function IconBolt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function IconShield({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function IconTrophy({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
    </svg>
  );
}

function IconChevron({ className, open }: { className?: string; open?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${className} transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const ROOMS_EN = [
  {
    id: "mystery",
    name: "Mystery Manor",
    genre: "Mystery",
    desc: "A 19th-century mansion hides a dark secret. Uncover the family's forbidden past before the ghost returns at midnight.",
    expects: ["Decipher coded letters and hidden diaries", "Solve a working mechanical clock puzzle", "Navigate a room that isn't what it seems"],
    duration: 60, groupMin: 2, groupMax: 6, difficulty: 3, price: 350,
    accentColor: "#F59E0B", cardBg: "#2D2416", borderColor: "#78490B", ageLimit: null, successRate: 42,
  },
  {
    id: "scifi",
    name: "Sci-Fi Lab",
    genre: "Sci-Fi",
    desc: "The AI has gone rogue. You have 75 minutes to shut down the reactor before the containment fails and the city goes dark.",
    expects: ["Hack terminal sequences under time pressure", "Rewire the reactor control panel", "Decode the AI's override password"],
    duration: 75, groupMin: 2, groupMax: 8, difficulty: 4, price: 400,
    accentColor: "#38BDF8", cardBg: "#0C1F2E", borderColor: "#0369A1", ageLimit: null, successRate: 28,
  },
  {
    id: "horror",
    name: "Horror Asylum",
    genre: "Horror",
    desc: "Abandoned in 1987. The patients are still here. And so is the doctor. Find the exit — if you can.",
    expects: ["Explore darkened corridors with a flashlight", "Uncover what really happened in Ward 6", "Face actor-operated jump scares (optional)"],
    duration: 60, groupMin: 3, groupMax: 6, difficulty: 5, price: 420,
    accentColor: "#EF4444", cardBg: "#2D0C0C", borderColor: "#991B1B", ageLimit: 18, successRate: 17,
  },
  {
    id: "adventure",
    name: "Adventure Cave",
    genre: "Adventure",
    desc: "Deep in the mountains, a legendary treasure awaits. Ideal for beginners, families, and first-timers.",
    expects: ["Decode an ancient map step by step", "Open a series of physical combination locks", "Work together — every person has a role"],
    duration: 60, groupMin: 2, groupMax: 8, difficulty: 2, price: 300,
    accentColor: "#10B981", cardBg: "#0D2116", borderColor: "#065F46", ageLimit: null, successRate: 61,
  },
];

const ROOMS_UK = [
  {
    id: "mystery",
    name: "Маєток Загадок",
    genre: "Містика",
    desc: "Особняк 19 століття приховує заборонену таємницю роду. Розкрийте її до того, як опівночі повернеться привид.",
    expects: ["Розшифруйте закодовані листи та щоденники", "Вирішіть головоломку з механічним годинником", "Пройдіть кімнату, що не є тим, чим здається"],
    duration: 60, groupMin: 2, groupMax: 6, difficulty: 3, price: 350,
    accentColor: "#F59E0B", cardBg: "#2D2416", borderColor: "#78490B", ageLimit: null, successRate: 42,
  },
  {
    id: "scifi",
    name: "Лабораторія X-7",
    genre: "Наукова фантастика",
    desc: "ШІ вийшов з-під контролю. 75 хвилин щоб зупинити реактор до критичного розпаду та врятувати місто.",
    expects: ["Зламайте термінальні послідовності під тиском", "Перемонтуйте панель управління реактором", "Розшифруйте пароль перевизначення ШІ"],
    duration: 75, groupMin: 2, groupMax: 8, difficulty: 4, price: 400,
    accentColor: "#38BDF8", cardBg: "#0C1F2E", borderColor: "#0369A1", ageLimit: null, successRate: 28,
  },
  {
    id: "horror",
    name: "Психлікарня",
    genre: "Жахи",
    desc: "Покинута у 1987. Пацієнти досі тут. І лікар теж. Знайдіть вихід — якщо зможете.",
    expects: ["Досліджуйте темні коридори з ліхтариком", "Дізнайтесь що насправді сталося у Відділенні 6", "Зіткнутись з актором-жахачем (за бажанням)"],
    duration: 60, groupMin: 3, groupMax: 6, difficulty: 5, price: 420,
    accentColor: "#EF4444", cardBg: "#2D0C0C", borderColor: "#991B1B", ageLimit: 18, successRate: 17,
  },
  {
    id: "adventure",
    name: "Скарб Карпат",
    genre: "Пригода",
    desc: "У глибині гір чекає легендарний скарб. Ідеально для початківців, сімей та перших спроб.",
    expects: ["Розшифруйте стародавню карту крок за кроком", "Відкрийте серію комбінаційних замків", "Кожен у команді має роль"],
    duration: 60, groupMin: 2, groupMax: 8, difficulty: 2, price: 300,
    accentColor: "#10B981", cardBg: "#0D2116", borderColor: "#065F46", ageLimit: null, successRate: 61,
  },
];

const TODAY_SLOTS = [
  { time: "14:00", roomId: "mystery", spots: 2 },
  { time: "15:30", roomId: "scifi", spots: 3 },
  { time: "17:00", roomId: "horror", spots: 0 },
  { time: "18:30", roomId: "adventure", spots: 1 },
  { time: "20:00", roomId: "mystery", spots: 4 },
];

const LEADERBOARD_EN = [
  { room: "Mystery Manor", color: "#F59E0B", records: [
    { rank: 1, team: "The Sherlock Six", time: "32:18", date: "Apr 2025" },
    { rank: 2, team: "Brainwave Trio", time: "38:44", date: "Mar 2025" },
    { rank: 3, team: "Detective Club", time: "41:02", date: "Feb 2025" },
  ]},
  { room: "Sci-Fi Lab", color: "#38BDF8", records: [
    { rank: 1, team: "Null Pointers", time: "44:51", date: "Apr 2025" },
    { rank: 2, team: "Team Override", time: "52:33", date: "Mar 2025" },
    { rank: 3, team: "Byte Force", time: "57:16", date: "Apr 2025" },
  ]},
  { room: "Horror Asylum", color: "#EF4444", records: [
    { rank: 1, team: "The Brave Fools", time: "53:07", date: "Mar 2025" },
    { rank: 2, team: "Night Owls", time: "55:42", date: "Feb 2025" },
    { rank: 3, team: "No Fear Club", time: "58:30", date: "Apr 2025" },
  ]},
  { room: "Adventure Cave", color: "#10B981", records: [
    { rank: 1, team: "The Scout Family", time: "28:54", date: "Apr 2025" },
    { rank: 2, team: "Gold Diggers", time: "31:10", date: "Apr 2025" },
    { rank: 3, team: "Weekend Warriors", time: "33:48", date: "Mar 2025" },
  ]},
];

const LEADERBOARD_UK = [
  { room: "Маєток Загадок", color: "#F59E0B", records: [
    { rank: 1, team: "Шерлоки", time: "32:18", date: "Квіт. 2025" },
    { rank: 2, team: "Мозковий штурм", time: "38:44", date: "Бер. 2025" },
    { rank: 3, team: "Клуб детективів", time: "41:02", date: "Лют. 2025" },
  ]},
  { room: "Лабораторія X-7", color: "#38BDF8", records: [
    { rank: 1, team: "Null Pointers", time: "44:51", date: "Квіт. 2025" },
    { rank: 2, team: "Команда Override", time: "52:33", date: "Бер. 2025" },
    { rank: 3, team: "Byte Force", time: "57:16", date: "Квіт. 2025" },
  ]},
  { room: "Психлікарня", color: "#EF4444", records: [
    { rank: 1, team: "Відважні Дурні", time: "53:07", date: "Бер. 2025" },
    { rank: 2, team: "Нічні Сови", time: "55:42", date: "Лют. 2025" },
    { rank: 3, team: "Без Страху", time: "58:30", date: "Квіт. 2025" },
  ]},
  { room: "Скарб Карпат", color: "#10B981", records: [
    { rank: 1, team: "Сімейний Загін", time: "28:54", date: "Квіт. 2025" },
    { rank: 2, team: "Золоті Шукачі", time: "31:10", date: "Квіт. 2025" },
    { rank: 3, team: "Вікендові Бійці", time: "33:48", date: "Бер. 2025" },
  ]},
];

const GAMEMASTERS_EN = [
  { name: "Vadym K.", nickname: "The Architect", room: "Mystery Manor", desc: "Creator of Mystery Manor. Obsessed with narrative puzzles and Victorian locks. Has guided over 4,000 groups and will never reveal the final secret.", initials: "VK", color: "#F59E0B" },
  { name: "Olena P.", nickname: "The Engineer", room: "Sci-Fi Lab", desc: "Built every prop in the Lab by hand. Former electrical engineer. Explains the reactor mechanics with disturbing enthusiasm.", initials: "OP", color: "#38BDF8" },
  { name: "Bohdan S.", nickname: "The Warden", room: "Horror Asylum", desc: "Runs the Asylum. Players sometimes forget he's an actor. Has 3 different sinister laughs and once made a grown man cry (he's proud of it).", initials: "BS", color: "#EF4444" },
];

const GAMEMASTERS_UK = [
  { name: "Вадим К.", nickname: "Архітектор", room: "Маєток Загадок", desc: "Автор Маєтку. Одержимий наративними головоломками і вікторіанськими замками. Провів понад 4,000 груп і ніколи не розкриє фінальну таємницю.", initials: "ВК", color: "#F59E0B" },
  { name: "Олена П.", nickname: "Інженер", room: "Лабораторія X-7", desc: "Власноруч побудувала кожен реквізит у Лабораторії. Колишній електроінженер. Пояснює механіку реактора з тривожним ентузіазмом.", initials: "ОП", color: "#38BDF8" },
  { name: "Богдан С.", nickname: "Наглядач", room: "Психлікарня", desc: "Керує Психлікарнею. Гравці іноді забувають, що він актор. Має 3 різні зловісні сміхи і одного разу налякав дорослого чоловіка до сліз (він пишається цим).", initials: "БС", color: "#EF4444" },
];

const PACKAGES_EN = [
  { name: "Birthday Party", desc: "One room of your choice, a decorated lounge, a surprise cake, and a group photo.", features: ["1 room (60 min)", "Decorated lounge area", "Birthday cake", "Group photo"], price: "from ₴1,500", popular: false, color: "#F59E0B" },
  { name: "Corporate Team", desc: "Two rooms simultaneously — who escapes faster? Debrief session included.", features: ["2 rooms simultaneously", "Team score comparison", "Facilitator debriefing", "Certificate"], price: "from ₴3,500", popular: true, color: "#7C3AED" },
  { name: "Champion League", desc: "All four rooms, tournament format with live scoring. Medals for the victors.", features: ["4 rooms tournament", "Live scoreboard", "Medals & trophies", "Catering included"], price: "from ₴6,000", popular: false, color: "#10B981" },
];

const PACKAGES_UK = [
  { name: "День Народження", desc: "Одна кімната на вибір, прикрашений лаунж, святковий торт і групове фото.", features: ["1 кімната (60 хв)", "Прикрашений лаунж", "Торт", "Групове фото"], price: "від ₴1,500", popular: false, color: "#F59E0B" },
  { name: "Корпоратив", desc: "Дві кімнати одночасно — хто вибереться швидше? Сесія дебрифінгу включена.", features: ["2 кімнати одночасно", "Порівняння результатів", "Дебрифінг з фасилітатором", "Сертифікат"], price: "від ₴3,500", popular: true, color: "#7C3AED" },
  { name: "Чемпіонська Ліга", desc: "Всі чотири кімнати, турнірний формат з онлайн-табло. Медалі переможцям.", features: ["4 кімнати турнір", "Онлайн табло", "Медалі і кубки", "Кейтеринг включено"], price: "від ₴6,000", popular: false, color: "#10B981" },
];

const FAQ_EN = [
  { q: "Can I bring children?", a: "Adventure Cave is family-friendly (ages 8+). Mystery Manor suits teens (12+). Sci-Fi Lab is 14+. Horror Asylum is strictly 18+ and involves actor-operated scares." },
  { q: "What happens if we get completely stuck?", a: "Each room includes 3 hint tokens. Your game master monitors progress on camera and can offer a nudge through the speaker — without spoiling the puzzle logic." },
  { q: "How many people is ideal?", a: "Most rooms work best with 3–4 players: enough minds for parallel puzzles, but not so many that everyone fights over the same clue. Adventure Cave scales well to 8." },
  { q: "Do I need physical strength or fitness?", a: "No. Our puzzles are purely mental challenges. No crawling, climbing, or physical exertion is required. All rooms are fully accessible." },
  { q: "Can we book a private session?", a: "Yes — all bookings are private. You'll never share a room with strangers. Each session is exclusively for your group." },
  { q: "What should we wear?", a: "Whatever you're comfortable in. Closed-toe shoes are recommended. Horror Asylum players often choose not to wear their best outfit." },
];

const FAQ_UK = [
  { q: "Чи можна привести дітей?", a: "Скарб Карпат — для сімей (від 8 років). Маєток Загадок підходить підліткам (від 12). Лабораторія X-7 — від 14. Психлікарня суворо 18+ і містить актора-жахача." },
  { q: "Що якщо ми повністю застрягнемо?", a: "У кожній кімнаті є 3 жетони підказки. Ваш гейм-майстер спостерігає за прогресом через камеру і може дати натяк через динамік — не розкриваючи логіку головоломки." },
  { q: "Скільки людей оптимально?", a: "Більшість кімнат найкраще працює з 3–4 гравцями: достатньо розумів для паралельних загадок, але не забагато щоб битись над одним ключем. Скарб Карпат добре масштабується до 8." },
  { q: "Потрібна фізична сила або витривалість?", a: "Ні. Наші головоломки — виключно розумові завдання. Ніяких повзань, лазінь або фізичних навантажень. Усі кімнати повністю доступні." },
  { q: "Чи можна замовити приватний сеанс?", a: "Так — всі бронювання є приватними. Ви ніколи не ділитимете кімнату з чужими. Кожна сесія — виключно для вашої групи." },
  { q: "Що одягнути?", a: "Те, в чому вам зручно. Рекомендуємо закрите взуття. Гравці Психлікарні часто воліють не одягати свій найкращий одяг." },
];

const REVIEWS_EN = [
  { name: "Oleksiy M.", roomId: "mystery", stars: 5, text: "Escaped in 51 minutes — barely! The last puzzle was genuinely clever. Brought my team of 5 and we were hooked from the first clue.", initials: "OM", color: "#F59E0B" },
  { name: "Sophie K.", roomId: "scifi", stars: 5, text: "Didn't escape but had the best time of our lives. The atmosphere in Sci-Fi Lab is stunning — felt like a real film set. Coming back next week.", initials: "SK", color: "#38BDF8" },
  { name: "Dmytro & Oksana", roomId: "horror", stars: 5, text: "18+ horror was exactly what we wanted for our anniversary. Yes, it's terrifying. Yes, we screamed. Yes, 10/10 recommend.", initials: "DO", color: "#EF4444" },
  { name: "Anna V.", roomId: "adventure", stars: 5, text: "Brought our kids (10 and 13) to Adventure Cave. Perfect difficulty — they solved three puzzles before the adults did. We'll be back!", initials: "AV", color: "#10B981" },
];

const REVIEWS_UK = [
  { name: "Олексій М.", roomId: "mystery", stars: 5, text: "Вибрались за 51 хвилину — ледь-ледь! Остання загадка була справді геніальна. Привів команду з 5 людей, всі були в захваті.", initials: "ОМ", color: "#F59E0B" },
  { name: "Соня К.", roomId: "scifi", stars: 5, text: "Не вибрались, але провели найкращий час у житті. Атмосфера в Лабораторії X-7 приголомшлива — відчуття справжнього кінознімального майданчика.", initials: "СК", color: "#38BDF8" },
  { name: "Дмитро та Оксана", roomId: "horror", stars: 5, text: "18+ жахи — саме те, що ми хотіли на річницю. Так, це страшно. Так, ми кричали. Так, 10/10 рекомендую.", initials: "ДО", color: "#EF4444" },
  { name: "Анна В.", roomId: "adventure", stars: 5, text: "Привела дітей (10 і 13 років) до Скарбу Карпат. Вони вирішили три загадки раніше за дорослих. Повернемось!", initials: "АВ", color: "#10B981" },
];

const HOW_EN = [
  { step: "01", title: "Book Online", desc: "Choose your mission, pick a date and time, select team size. Done in under two minutes. Instant confirmation.", Icon: IconLock },
  { step: "02", title: "Arrive & Gear Up", desc: "Come 10 minutes early. Your game master briefs you on the story, the rules, and the hint system. Then the clock starts.", Icon: IconUsers },
  { step: "03", title: "Escape!", desc: "60–75 minutes to solve puzzles, uncover clues, and find the exit. Your time is recorded on the leaderboard.", Icon: IconKey },
];

const HOW_UK = [
  { step: "01", title: "Бронюйте Онлайн", desc: "Оберіть місію, дату і час, розмір групи. Готово за дві хвилини. Миттєве підтвердження.", Icon: IconLock },
  { step: "02", title: "Приходьте й Готуйтесь", desc: "Приходьте за 10 хвилин. Гейм-майстер пояснює сюжет, правила та систему підказок. Потім починається відлік.", Icon: IconUsers },
  { step: "03", title: "Вибирайтесь!", desc: "60–75 хвилин для розгадування загадок і знаходження виходу. Ваш час потрапляє на таблицю рекордів.", Icon: IconKey },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function DifficultyFlames({ level, accentColor }: { level: number; accentColor: string }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <IconFlame key={i} filled={i <= level} className="w-4 h-4"
          style={{ color: i <= level ? accentColor : "#4B4570" } as CSSProperties} />
      ))}
    </div>
  );
}

const RANK_MEDALS = ["🥇", "🥈", "🥉"];

// ─── Component ────────────────────────────────────────────────────────────────

export function EscapeQuestDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const rooms = isUk ? ROOMS_UK : ROOMS_EN;
  const leaderboard = isUk ? LEADERBOARD_UK : LEADERBOARD_EN;
  const gamemasters = isUk ? GAMEMASTERS_UK : GAMEMASTERS_EN;
  const packages = isUk ? PACKAGES_UK : PACKAGES_EN;
  const faq = isUk ? FAQ_UK : FAQ_EN;
  const reviews = isUk ? REVIEWS_UK : REVIEWS_EN;
  const how = isUk ? HOW_UK : HOW_EN;

  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [activeLbRoom, setActiveLbRoom] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [bookingData, setBookingData] = useState<Record<string, string>>({ date: "", time: "", size: "3", name: "", phone: "" });
  const [bookingDone, setBookingDone] = useState(false);

  const getRoomById = (id: string) => rooms.find((r) => r.id === id);

  return (
    <div className="bg-[#0D0B1A] text-white font-sans">

      {/* ── Hero ── */}
      <section className="bg-linear-to-br from-[#0D0B1A] to-[#1a1040] px-6 pt-16 pb-14">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs tracking-[0.3em] uppercase text-violet-400 mb-5 font-medium">
              {isUk ? "Квест-кімнати у центрі міста" : "Escape rooms in the city centre"}
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-none mb-5 uppercase">
              <span className="text-white">{isUk ? "Обери" : "Choose"}</span>
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-400 to-amber-400">
                {isUk ? "свою місію" : "your mission"}
              </span>
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-md">
              {isUk
                ? "4 кімнати. 4 жанри. Від 60 хвилин до виходу — або провалу. Ти готовий?"
                : "4 rooms. 4 genres. 60 minutes to escape — or fail. Are you ready?"}
            </p>
            <div className="flex gap-3 flex-wrap">
              <button className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white rounded-xl px-7 py-3.5 text-[15px] font-bold cursor-pointer transition-colors">
                <IconBolt className="w-4 h-4" />
                {isUk ? "Забронювати зараз" : "Book Now"}
              </button>
              <button className="bg-transparent text-violet-300 border border-violet-600 hover:border-violet-400 hover:text-violet-200 rounded-xl px-6 py-3.5 text-[15px] font-semibold cursor-pointer transition-colors">
                {isUk ? "Перегляд кімнат" : "View Rooms"}
              </button>
            </div>
            <div className="flex gap-8 mt-10 flex-wrap">
              {[
                { num: "4", label: isUk ? "кімнати" : "rooms" },
                { num: "15,000+", label: isUk ? "гравців" : "players" },
                { num: "4.9★", label: isUk ? "рейтинг" : "rating" },
                { num: "3", label: isUk ? "підказки" : "hints/game" },
              ].map((s, i) => (
                <div key={i}>
                  <div className="text-2xl font-extrabold text-amber-400">{s.num}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Slots card */}
          <div className="bg-[#1E1B2E] rounded-2xl border border-amber-700/40 p-6 w-full max-w-sm mx-auto md:ml-auto shadow-2xl">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-amber-400 text-sm font-bold tracking-wider uppercase">
                {isUk ? "Вільні слоти сьогодні" : "Today's Open Slots"}
              </span>
            </div>
            <div className="space-y-2 mb-5">
              {TODAY_SLOTS.map((slot, i) => {
                const room = getRoomById(slot.roomId);
                const full = slot.spots === 0;
                return (
                  <div key={i} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border ${full ? "border-[#2D2845] opacity-50" : "bg-[#2D2845] border-[#4A4570] hover:border-violet-600 cursor-pointer"}`}>
                    <span className="text-sm font-bold text-amber-400 w-12 flex-shrink-0">{slot.time}</span>
                    <span className="text-sm text-white flex-1">{room?.name}</span>
                    {full
                      ? <span className="text-xs text-red-400 font-bold">{isUk ? "ЗАЙНЯТО" : "FULL"}</span>
                      : <span className="text-xs font-bold" style={{ color: room?.accentColor }}>{slot.spots} {isUk ? "міст" : "left"}</span>
                    }
                  </div>
                );
              })}
            </div>
            <button className="w-full bg-amber-500 hover:bg-amber-400 text-[#0D0B1A] font-bold rounded-xl py-3 text-sm cursor-pointer transition-colors flex items-center justify-center gap-2">
              <IconBolt className="w-4 h-4" />
              {isUk ? "Швидке бронювання" : "Quick Book"}
            </button>
          </div>
        </div>
      </section>

      {/* ── Rooms ── */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs tracking-[0.3em] uppercase text-violet-400 mb-3">{isUk ? "Вибери свою кімнату" : "Pick your room"}</div>
            <h2 className="text-4xl font-extrabold text-white uppercase tracking-tight">{isUk ? "Місії" : "The Missions"}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="rounded-2xl p-6 border-2 transition-all cursor-pointer"
                style={{ background: room.cardBg, borderColor: selectedRoom === room.id ? room.accentColor : room.borderColor + "99" }}
                onClick={() => setSelectedRoom(room.id === selectedRoom ? null : room.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide" style={{ background: room.accentColor + "30", color: room.accentColor }}>{room.genre}</span>
                      {room.ageLimit && (
                        <span className="text-xs font-bold px-2 py-1 rounded-full bg-red-900/50 text-red-300 flex items-center gap-1">
                          <IconShield className="w-3 h-3" />{room.ageLimit}+
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-extrabold text-white">{room.name}</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-extrabold" style={{ color: room.accentColor }}>₴{room.price}</div>
                    <div className="text-xs text-slate-400">{isUk ? "за групу" : "per group"}</div>
                  </div>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed mb-4">{room.desc}</p>

                {/* What to expect */}
                <ul className="space-y-1.5 mb-5">
                  {room.expects.map((e, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="mt-0.5 flex-shrink-0" style={{ color: room.accentColor }}>▸</span>
                      {e}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-5 mb-4 flex-wrap">
                  <div className="flex items-center gap-1.5 text-sm text-slate-200">
                    <IconClock className="w-4 h-4" style={{ color: room.accentColor } as CSSProperties} />
                    {room.duration} {isUk ? "хв" : "min"}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-slate-200">
                    <IconUsers className="w-4 h-4" style={{ color: room.accentColor } as CSSProperties} />
                    {room.groupMin}–{room.groupMax} {isUk ? "осіб" : "people"}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-200">
                    <span>{isUk ? "Склад.:" : "Diff:"}</span>
                    <DifficultyFlames level={room.difficulty} accentColor={room.accentColor} />
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-5">
                  <div className="flex-1 h-1.5 bg-[#4B4570] rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${room.successRate}%`, background: room.accentColor }} />
                  </div>
                  <span className="text-xs text-slate-400 whitespace-nowrap">{room.successRate}% {isUk ? "вибрались" : "escape rate"}</span>
                </div>

                <button
                  className="w-full py-2.5 rounded-xl text-sm font-bold cursor-pointer transition-all"
                  style={{ background: selectedRoom === room.id ? room.accentColor : "transparent", color: selectedRoom === room.id ? "#0D0B1A" : room.accentColor, border: `2px solid ${room.accentColor}` }}
                >
                  {selectedRoom === room.id ? (isUk ? "✓ Обрано" : "✓ Selected") : (isUk ? "Обрати цю місію" : "Choose this mission")}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Leaderboard ── */}
      <section className="py-16 px-6 bg-[#13112A]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-xs tracking-[0.3em] uppercase text-violet-400 mb-3">{isUk ? "Зал слави" : "Hall of fame"}</div>
            <h2 className="text-4xl font-extrabold text-white uppercase tracking-tight flex items-center justify-center gap-3">
              <IconTrophy className="w-9 h-9 text-amber-400" />
              {isUk ? "Таблиця рекордів" : "Leaderboard"}
            </h2>
          </div>
          {/* Room tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {leaderboard.map((lb, i) => (
              <button
                key={i}
                onClick={() => setActiveLbRoom(i)}
                className="px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer transition-all border"
                style={{
                  background: activeLbRoom === i ? lb.color + "25" : "transparent",
                  color: activeLbRoom === i ? lb.color : "#94A3B8",
                  borderColor: activeLbRoom === i ? lb.color : "#3D3556",
                }}
              >
                {lb.room}
              </button>
            ))}
          </div>
          {/* Records */}
          <div className="max-w-lg mx-auto space-y-3">
            {leaderboard[activeLbRoom].records.map((rec, i) => (
              <div key={i} className="flex items-center gap-4 bg-[#1E1B2E] rounded-xl px-5 py-4 border border-[#2D2845]">
                <span className="text-2xl flex-shrink-0">{RANK_MEDALS[i]}</span>
                <div className="flex-1">
                  <div className="font-bold text-white text-sm">{rec.team}</div>
                  <div className="text-xs text-slate-400">{rec.date}</div>
                </div>
                <div className="text-xl font-extrabold" style={{ color: leaderboard[activeLbRoom].color }}>{rec.time}</div>
              </div>
            ))}
            <p className="text-center text-xs text-slate-500 pt-2">
              {isUk ? "Часи вказані у форматі хв:сек" : "Times shown in min:sec format"}
            </p>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs tracking-[0.3em] uppercase text-violet-400 mb-3">{isUk ? "Процес" : "Process"}</div>
            <h2 className="text-4xl font-extrabold text-white uppercase tracking-tight">{isUk ? "Як це працює" : "How It Works"}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {how.map(({ step, title, desc, Icon }) => (
              <div key={step} className="text-center px-4">
                <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6">
                  <div className="absolute inset-0 rounded-full bg-violet-900/40 border border-violet-700" />
                  <Icon className="w-9 h-9 text-violet-300 relative z-10" />
                  <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-amber-500 text-[#0D0B1A] text-xs font-extrabold flex items-center justify-center">
                    {step.replace("0", "")}
                  </span>
                </div>
                <h3 className="text-lg font-extrabold text-white mb-2 uppercase tracking-wide">{title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Game Masters ── */}
      <section className="py-16 px-6 bg-[#13112A]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs tracking-[0.3em] uppercase text-violet-400 mb-3">{isUk ? "Команда" : "The team"}</div>
            <h2 className="text-4xl font-extrabold text-white uppercase tracking-tight">{isUk ? "Гейм-майстри" : "Game Masters"}</h2>
            <p className="text-slate-300 mt-3 max-w-lg mx-auto text-sm">
              {isUk ? "Вони побудували кімнати. Вони знають усі секрети. Вони спостерігають." : "They built the rooms. They know every secret. They are watching."}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {gamemasters.map((gm, i) => (
              <div key={i} className="bg-[#1E1B2E] rounded-2xl p-6 border border-[#2D2845]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-base text-[#0D0B1A] flex-shrink-0" style={{ background: gm.color }}>
                    {gm.initials}
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">{gm.name}</div>
                    <div className="text-xs font-bold" style={{ color: gm.color }}>"{gm.nickname}"</div>
                  </div>
                </div>
                <div className="text-xs text-violet-300 font-semibold mb-2 uppercase tracking-wide">{gm.room}</div>
                <p className="text-slate-300 text-sm leading-relaxed">{gm.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Group Packages ── */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs tracking-[0.3em] uppercase text-violet-400 mb-3">{isUk ? "Групові пропозиції" : "Group offers"}</div>
            <h2 className="text-4xl font-extrabold text-white uppercase tracking-tight">{isUk ? "Пакети" : "Packages"}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {packages.map((pkg, i) => (
              <div key={i} className="rounded-2xl p-6 border-2 relative" style={{ background: "#1E1B2E", borderColor: pkg.popular ? pkg.color : "#2D2845" }}>
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-[#0D0B1A] whitespace-nowrap" style={{ background: pkg.color }}>
                    {isUk ? "Популярний" : "Most Popular"}
                  </div>
                )}
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: pkg.color + "25" }}>
                  <IconKey className="w-5 h-5" style={{ color: pkg.color } as CSSProperties} />
                </div>
                <h3 className="text-lg font-extrabold text-white mb-2">{pkg.name}</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-5">{pkg.desc}</p>
                <ul className="space-y-2 mb-6">
                  {pkg.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-slate-200">
                      <IconCheck className="w-4 h-4 flex-shrink-0" style={{ color: pkg.color } as CSSProperties} />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="text-xl font-extrabold mb-4" style={{ color: pkg.color }}>{pkg.price}</div>
                <button className="w-full py-2.5 rounded-xl text-sm font-bold cursor-pointer transition-all text-[#0D0B1A]" style={{ background: pkg.color }}>
                  {isUk ? "Замовити пакет" : "Get Package"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 px-6 bg-[#13112A]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-xs tracking-[0.3em] uppercase text-violet-400 mb-3">{isUk ? "Питання та відповіді" : "Questions & answers"}</div>
            <h2 className="text-4xl font-extrabold text-white uppercase tracking-tight">{isUk ? "Часті питання" : "FAQ"}</h2>
          </div>
          <div className="space-y-2">
            {faq.map((item, i) => (
              <div key={i} className="rounded-xl border overflow-hidden transition-colors" style={{ background: "#1E1B2E", borderColor: openFaq === i ? "#7C3AED" : "#2D2845" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-5 py-4 text-left flex justify-between items-center gap-3 cursor-pointer font-semibold text-white text-sm bg-transparent border-none"
                >
                  <span>{item.q}</span>
                  <IconChevron open={openFaq === i} className="w-5 h-5 text-violet-400 flex-shrink-0" />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-sm text-slate-300 leading-relaxed border-t border-[#2D2845]">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Booking Form ── */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-xs tracking-[0.3em] uppercase text-violet-400 mb-3">{isUk ? "Онлайн бронювання" : "Online booking"}</div>
            <h2 className="text-4xl font-extrabold text-white uppercase tracking-tight">{isUk ? "Забронювати" : "Book Your Room"}</h2>
          </div>

          {bookingDone ? (
            <div className="bg-[#1E1B2E] rounded-2xl border border-violet-700 p-10 text-center">
              <div className="w-20 h-20 rounded-full bg-violet-900/40 border border-violet-600 flex items-center justify-center mx-auto mb-5">
                <IconKey className="w-10 h-10 text-amber-400" />
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-2 uppercase">{isUk ? "Місію прийнято!" : "Mission Accepted!"}</h3>
              <p className="text-slate-300">
                {isUk ? "Підтвердження надійде на ваш телефон. Приходьте за 10 хвилин до початку." : "Confirmation will be sent to your phone. Arrive 10 minutes before your slot."}
              </p>
            </div>
          ) : (
            <div className="bg-[#1E1B2E] rounded-2xl border border-[#2D2845] p-7">
              <div className="mb-6">
                <label className="block text-xs uppercase tracking-widest text-violet-400 mb-3 font-semibold">{isUk ? "Оберіть кімнату" : "Select room"}</label>
                <div className="grid grid-cols-2 gap-2">
                  {rooms.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setBookingData((d) => ({ ...d, room: r.id }))}
                      className="text-left px-3 py-2.5 rounded-xl border text-sm font-semibold cursor-pointer transition-all"
                      style={{ borderColor: bookingData.room === r.id ? r.accentColor : "#4A4570", background: bookingData.room === r.id ? r.accentColor + "20" : "transparent", color: bookingData.room === r.id ? r.accentColor : "#CBD5E1" }}
                    >
                      {r.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {[
                  { key: "date", label: isUk ? "Дата" : "Date", type: "date" },
                  { key: "time", label: isUk ? "Час" : "Time", type: "time" },
                  { key: "name", label: isUk ? "Ваше ім'я" : "Your name", type: "text" },
                  { key: "phone", label: isUk ? "Телефон" : "Phone", type: "tel" },
                ].map(({ key, label, type }) => (
                  <div key={key}>
                    <label className="block text-xs uppercase tracking-widest text-violet-400 mb-2 font-semibold">{label}</label>
                    <input
                      type={type}
                      value={bookingData[key] ?? ""}
                      onChange={(e) => setBookingData((d) => ({ ...d, [key]: e.target.value }))}
                      className="w-full bg-[#2D2845] border border-[#4A4570] rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-violet-500"
                    />
                  </div>
                ))}
              </div>

              <div className="mb-6">
                <label className="block text-xs uppercase tracking-widest text-violet-400 mb-3 font-semibold">{isUk ? "Кількість людей" : "Group size"}</label>
                <div className="flex gap-2 flex-wrap">
                  {["2", "3", "4", "5", "6", "7", "8"].map((n) => (
                    <button
                      key={n}
                      onClick={() => setBookingData((d) => ({ ...d, size: n }))}
                      className="w-10 h-10 rounded-xl text-sm font-bold cursor-pointer transition-all border"
                      style={{ background: bookingData.size === n ? "#7C3AED" : "transparent", borderColor: bookingData.size === n ? "#7C3AED" : "#4A4570", color: bookingData.size === n ? "#fff" : "#CBD5E1" }}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setBookingDone(true)}
                className="w-full py-4 rounded-xl font-extrabold text-[15px] uppercase tracking-widest cursor-pointer bg-linear-to-r from-violet-600 to-violet-800 hover:from-violet-500 hover:to-violet-700 text-white flex items-center justify-center gap-2"
              >
                <IconBolt className="w-5 h-5" />
                {isUk ? "Підтвердити бронювання" : "Confirm Booking"}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="py-16 px-6 bg-[#13112A]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs tracking-[0.3em] uppercase text-violet-400 mb-3">{isUk ? "Відгуки гравців" : "Player reviews"}</div>
            <h2 className="text-4xl font-extrabold text-white uppercase tracking-tight">{isUk ? "Хто вибрався?" : "Who Escaped?"}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {reviews.map((r, i) => {
              const room = getRoomById(r.roomId);
              return (
                <div key={i} className="bg-[#1E1B2E] rounded-2xl p-6 border border-[#2D2845]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-[#0D0B1A] flex-shrink-0" style={{ background: r.color }}>{r.initials}</div>
                    <div>
                      <div className="font-bold text-white text-sm">{r.name}</div>
                      <div className="text-xs font-semibold" style={{ color: room?.accentColor }}>{room?.name}</div>
                    </div>
                    <div className="ml-auto flex gap-0.5">
                      {[...Array(r.stars)].map((_, j) => <IconStar key={j} className="w-3.5 h-3.5 text-amber-400" />)}
                    </div>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed italic">"{r.text}"</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Footer CTA ── */}
      <section className="py-16 px-6 bg-linear-to-br from-violet-900/50 to-[#0D0B1A]">
        <div className="max-w-xl mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-6">
            <IconKey className="w-8 h-8 text-amber-400" />
          </div>
          <h2 className="text-3xl font-extrabold text-white uppercase tracking-tight mb-3">
            {isUk ? "Готовий прийняти виклик?" : "Ready to Accept the Challenge?"}
          </h2>
          <p className="text-slate-300 mb-8 leading-relaxed">
            {isUk ? "Вул. Хрещатик 22, Київ · Пн–Нд 10:00–23:00 · +380 44 123 4567" : "22 Khreshchatyk St, Kyiv · Mon–Sun 10:00–23:00 · +380 44 123 4567"}
          </p>
          <button className="bg-amber-500 hover:bg-amber-400 text-[#0D0B1A] font-extrabold rounded-xl px-10 py-4 text-[15px] uppercase tracking-widest cursor-pointer transition-colors">
            {isUk ? "Вибрати місію" : "Choose Your Mission"}
          </button>
        </div>
      </section>

    </div>
  );
}
