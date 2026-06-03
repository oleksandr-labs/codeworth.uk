"use client";
import { useState } from "react";
import { EmojiIcon } from "@/components/ui/EmojiIcon";

const experiences = [
  { id: 1, emoji: "🧟", nameUk: "Resident Evil: VR Edition", nameEn: "Resident Evil: VR Edition", genre: "horror", age: "18+", mode: "solo", duration: 30, price: 250, rating: 4.9, reviews: 342, difficultyUk: "Жорстке", difficultyEn: "Intense" },
  { id: 2, emoji: "🚀", nameUk: "Mars Colony 2150", nameEn: "Mars Colony 2150", genre: "space", age: "12+", mode: "solo", duration: 45, price: 320, rating: 4.8, reviews: 198, difficultyUk: "Середнє", difficultyEn: "Medium" },
  { id: 3, emoji: "🗡️", nameUk: "Knights of the Round Table", nameEn: "Knights of the Round Table", genre: "adventure", age: "12+", mode: "multiplayer", duration: 60, price: 480, rating: 4.9, reviews: 256, difficultyUk: "Легке", difficultyEn: "Easy" },
  { id: 4, emoji: "⚽", nameUk: "VR Football Pro", nameEn: "VR Football Pro", genre: "sports", age: "6+", mode: "multiplayer", duration: 30, price: 200, rating: 4.7, reviews: 145, difficultyUk: "Легке", difficultyEn: "Easy" },
  { id: 5, emoji: "🤖", nameUk: "Blade Runner: Origins", nameEn: "Blade Runner: Origins", genre: "scifi", age: "16+", mode: "solo", duration: 45, price: 350, rating: 4.9, reviews: 89, difficultyUk: "Середнє", difficultyEn: "Medium" },
  { id: 6, emoji: "🦄", nameUk: "Unicorn Dream World", nameEn: "Unicorn Dream World", genre: "kids", age: "6+", mode: "multiplayer", duration: 25, price: 180, rating: 5.0, reviews: 412, difficultyUk: "Легке", difficultyEn: "Easy" },
  { id: 7, emoji: "👻", nameUk: "Haunted Mansion VR", nameEn: "Haunted Mansion VR", genre: "horror", age: "18+", mode: "multiplayer", duration: 60, price: 560, rating: 4.8, reviews: 167, difficultyUk: "Жорстке", difficultyEn: "Intense" },
  { id: 8, emoji: "🌊", nameUk: "Deep Sea Explorer", nameEn: "Deep Sea Explorer", genre: "adventure", age: "12+", mode: "solo", duration: 30, price: 240, rating: 4.7, reviews: 203, difficultyUk: "Легке", difficultyEn: "Easy" },
  { id: 9, emoji: "🏔️", nameUk: "Everest Summit Challenge", nameEn: "Everest Summit Challenge", genre: "sports", age: "12+", mode: "solo", duration: 45, price: 300, rating: 4.8, reviews: 134, difficultyUk: "Складне", difficultyEn: "Hard" },
  { id: 10, emoji: "🛸", nameUk: "Galactic Wars: Squadron", nameEn: "Galactic Wars: Squadron", genre: "space", age: "12+", mode: "multiplayer", duration: 60, price: 520, rating: 4.9, reviews: 278, difficultyUk: "Середнє", difficultyEn: "Medium" },
  { id: 11, emoji: "🐉", nameUk: "Dragon Rider Fantasy", nameEn: "Dragon Rider Fantasy", genre: "adventure", age: "6+", mode: "solo", duration: 35, price: 260, rating: 4.8, reviews: 319, difficultyUk: "Легке", difficultyEn: "Easy" },
  { id: 12, emoji: "🎮", nameUk: "Beat Saber Championship", nameEn: "Beat Saber Championship", genre: "sports", age: "6+", mode: "solo", duration: 25, price: 190, rating: 4.7, reviews: 445, difficultyUk: "Середнє", difficultyEn: "Medium" },
];

const genres = [
  { key: "all", en: "All", uk: "Всі" },
  { key: "horror", en: "Horror 🧟", uk: "Жахи 🧟" },
  { key: "adventure", en: "Adventure 🗡️", uk: "Пригоди 🗡️" },
  { key: "sports", en: "Sports ⚽", uk: "Спорт ⚽" },
  { key: "space", en: "Space 🚀", uk: "Космос 🚀" },
  { key: "scifi", en: "SciFi 🤖", uk: "Фантастика 🤖" },
  { key: "kids", en: "Kids 🦄", uk: "Дитячі 🦄" },
];

const ages = [
  { key: "all", en: "All", uk: "Всі" },
  { key: "6+", en: "6+", uk: "6+" },
  { key: "12+", en: "12+", uk: "12+" },
  { key: "18+", en: "18+", uk: "18+" },
];

const modes = [
  { key: "all", en: "All", uk: "Всі" },
  { key: "solo", en: "Solo", uk: "Соло" },
  { key: "multiplayer", en: "Multiplayer", uk: "Мульти" },
];

const navLinks = [
  { href: "#experiences", en: "Experiences", uk: "Досвіди" },
  { href: "#multiplayer", en: "Multiplayer", uk: "Мультиплеєр" },
  { href: "#booking", en: "Booking", uk: "Бронювання" },
];

const faqItems = [
  { en: "Will I get motion sickness?", uk: "Чи не буде погано?", answerEn: "Most users adapt quickly. We recommend starting with shorter, lower-intensity sessions. Our staff will guide you through comfort settings.", answerUk: "Більшість адаптуються швидко. Рекомендуємо починати з коротших сесій. Наш персонал налаштує комфортні параметри." },
  { en: "Minimum age?", uk: "Мінімальний вік?", answerEn: "From 6 years old for kids experiences. Some intense simulations require 16+ or 18+. Age restrictions are clearly marked on each experience.", answerUk: "Від 6 років для дитячих досвідів. Деякі інтенсивні симуляції — від 16+ або 18+. Вікові обмеження позначені на кожному досвіді." },
  { en: "What to wear?", uk: "Що одягнути?", answerEn: "Comfortable, casual clothing. Avoid loose scarves or jewelry that may interfere with headset equipment. Closed-toe shoes recommended.", answerUk: "Зручний одяг. Уникайте довгих шарфів або прикрас, що можуть заважати шолому. Рекомендується закрите взуття." },
  { en: "How are headsets sanitized?", uk: "Як дезінфікуються шоломи?", answerEn: "Every headset is fully sanitized between sessions using UV-C light and medical-grade disinfectant wipes. Hygiene is our top priority.", answerUk: "Кожен шолом повністю дезінфікується між сесіями: UV-C-світло та медичні дезінфікуючі серветки. Гігієна — наш пріоритет." },
  { en: "Can I bring food?", uk: "Можна їжу?", answerEn: "Light snacks are welcome in our lounge area. No food inside the VR zones themselves to protect the equipment.", answerUk: "Легкі закуски дозволені в зоні відпочинку. Всередині VR-зон їжа заборонена для захисту обладнання." },
  { en: "Is it suitable for beginners?", uk: "Підходить для новачків?", answerEn: "Absolutely! Many experiences are designed for first-timers. Our staff provides full onboarding and will help you get comfortable.", answerUk: "Звичайно! Багато досвідів розроблені для новачків. Персонал проведе повний інструктаж і допоможе освоїтись." },
];

const roles = [
  { emoji: "👑", en: "Leader", uk: "Лідер" },
  { emoji: "🎯", en: "Sniper", uk: "Снайпер" },
  { emoji: "💊", en: "Medic", uk: "Медик" },
  { emoji: "👁️", en: "Scout", uk: "Розвідник" },
  { emoji: "🔧", en: "Engineer", uk: "Інженер" },
  { emoji: "🌟", en: "Rookie", uk: "Новачок" },
];

const timeSlots = ["10:00", "11:30", "13:00", "14:30", "16:00", "17:30", "19:00", "20:30", "22:00"];
const durations = [30, 60, 90];

export function VirtualZoneDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [activeGenre, setActiveGenre] = useState("all");
  const [ageFilter, setAgeFilter] = useState("all");
  const [modeFilter, setModeFilter] = useState("all");
  const [selectedExperience, setSelectedExperience] = useState<typeof experiences[0] | null>(null);
  const [passportCompleted, setPassportCompleted] = useState<Set<number>>(new Set([1, 2, 3, 4, 5]));
  const [bookingStep, setBookingStep] = useState(1);
  const [playerCount, setPlayerCount] = useState(1);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDuration, setSelectedDuration] = useState(60);
  const [bookingDone, setBookingDone] = useState(false);

  const filtered = experiences.filter((e) => {
    if (activeGenre !== "all" && e.genre !== activeGenre) return false;
    if (ageFilter !== "all" && e.age !== ageFilter) return false;
    if (modeFilter !== "all" && e.mode !== modeFilter) return false;
    return true;
  });

  const togglePassport = (id: number) => {
    setPassportCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const handleBook = () => {
    setBookingDone(true);
    setTimeout(() => { setBookingDone(false); setBookingStep(1); setPlayerCount(1); setSelectedTime(""); }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#050510] text-white font-sans overflow-x-hidden">
      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-[#050510]/95 backdrop-blur-md border-b border-violet-900/30">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xl font-bold">
            <span>🥽</span>
            <span className="text-white">Virtual</span>
            <span className="text-[#7C3AED]">Zone</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-cyan-400 hover:text-[#7C3AED] transition-colors">
                {isUk ? l.uk : l.en}
              </a>
            ))}
          </div>
          <button className="px-4 py-2 rounded-lg bg-[#7C3AED] text-sm font-semibold shadow-[0_0_20px_rgba(124,58,237,0.5)] hover:shadow-[0_0_30px_rgba(124,58,237,0.8)] transition-all">
            {isUk ? "Забронювати сесію" : "Book Session"}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-violet-950/40 via-[#050510] to-cyan-950/30 pointer-events-none" />
        <div className="absolute top-10 left-10 text-4xl opacity-20 animate-pulse">🥽</div>
        <div className="absolute top-1/4 right-8 text-3xl opacity-15 animate-pulse" style={{ animationDelay: "0.5s" }}>🎮</div>
        <div className="absolute bottom-1/3 left-16 text-3xl opacity-20 animate-pulse" style={{ animationDelay: "1s" }}>🚀</div>
        <div className="absolute bottom-1/4 right-20 text-4xl opacity-15 animate-pulse" style={{ animationDelay: "1.5s" }}>⚡</div>
        <div className="absolute top-1/2 left-4 text-2xl opacity-10 animate-pulse" style={{ animationDelay: "0.8s" }}>🥽</div>

        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-700/50 text-violet-400 text-xs mb-6 bg-violet-950/30">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse inline-block" />
            {isUk ? "Нове покоління VR розваг" : "Next-generation VR entertainment"}
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className="text-white">{isUk ? "Виходь за межі" : "Break the limits"}</span>
            <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#7C3AED] to-[#06B6D4]">
              {isUk ? "реального" : "of reality"}
            </span>
          </h1>
          <p className="text-lg text-gray-400 dark:text-neutral-500 mb-8 max-w-2xl mx-auto">
            {isUk ? "30+ VR-досвідів. Одиночні та мультиплеєр. Київ." : "30+ VR experiences. Solo & multiplayer. Kyiv."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
            <a href="#booking">
              <button className="px-8 py-3 rounded-xl bg-[#7C3AED] font-bold text-lg shadow-[0_0_20px_rgba(124,58,237,0.5)] hover:shadow-[0_0_40px_rgba(124,58,237,0.8)] transition-all">
                {isUk ? "Забронювати VR сесію" : "Book VR Session"}
              </button>
            </a>
            <a href="#experiences">
              <button className="px-8 py-3 rounded-xl border-2 border-[#06B6D4] text-[#06B6D4] font-bold text-lg hover:bg-cyan-900/20 transition-all">
                {isUk ? "Обрати досвід" : "Choose Experience"}
              </button>
            </a>
          </div>
          <div className="grid grid-cols-3 gap-6 max-w-xl mx-auto">
            {[
              { en: "30 experiences", uk: "30 досвідів", icon: "🥽" },
              { en: "Up to 6 players", uk: "до 6 гравців", icon: "👥" },
              { en: "5★ / 800+ visitors", uk: "5★ / 800+ відвідувачів", icon: "⭐" },
            ].map((s) => (
              <div key={s.en} className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                <div className="mb-1"><EmojiIcon emoji={s.icon} className="w-7 h-7" /></div>
                <div className="text-sm font-semibold text-white">{isUk ? s.uk : s.en}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE CATALOG */}
      <section id="experiences" className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black mb-2 text-center">
          {isUk ? "Каталог VR Досвідів" : "VR Experience Catalog"}
        </h2>
        <p className="text-gray-400 dark:text-neutral-500 text-center mb-10">
          {isUk ? "Оберіть пригоду, що вас захоплює" : "Find the adventure that captures you"}
        </p>

        {/* Filters */}
        <div className="space-y-3 mb-10">
          <div className="flex flex-wrap gap-2 justify-center">
            {genres.map((g) => (
              <button key={g.key} onClick={() => setActiveGenre(g.key)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${activeGenre === g.key ? "bg-[#7C3AED] border-[#7C3AED] text-white shadow-[0_0_12px_rgba(124,58,237,0.5)]" : "border-violet-800/50 text-gray-400 dark:text-neutral-500 hover:border-violet-600"}`}>
                {isUk ? g.uk : g.en}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="text-xs text-gray-500 dark:text-neutral-400 self-center mr-1">{isUk ? "Вік:" : "Age:"}</span>
            {ages.map((a) => (
              <button key={a.key} onClick={() => setAgeFilter(a.key)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${ageFilter === a.key ? "bg-[#06B6D4] border-[#06B6D4] text-[#050510]" : "border-cyan-900/50 text-gray-400 dark:text-neutral-500 hover:border-cyan-600"}`}>
                {isUk ? a.uk : a.en}
              </button>
            ))}
            <span className="text-xs text-gray-500 dark:text-neutral-400 self-center ml-3 mr-1">{isUk ? "Режим:" : "Mode:"}</span>
            {modes.map((m) => (
              <button key={m.key} onClick={() => setModeFilter(m.key)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${modeFilter === m.key ? "bg-[#06B6D4] border-[#06B6D4] text-[#050510]" : "border-cyan-900/50 text-gray-400 dark:text-neutral-500 hover:border-cyan-600"}`}>
                {isUk ? m.uk : m.en}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((exp) => (
            <div key={exp.id}
              className="bg-[#0A0A1A] rounded-2xl p-5 border border-violet-900/30 hover:border-[#7C3AED] hover:shadow-[0_0_20px_rgba(124,58,237,0.2)] transition-all group cursor-pointer"
              onClick={() => setSelectedExperience(exp)}>
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 rounded-xl bg-violet-900/30 flex items-center justify-center shrink-0">
                  <EmojiIcon emoji={exp.emoji} className="w-8 h-8" />
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-violet-900/40 text-violet-300 border border-violet-800/50">
                    {exp.age}
                  </span>
                  <span className="text-xs text-gray-500">
                    {exp.mode === "solo" ? "👤 Solo" : "👥 Multi"}
                  </span>
                </div>
              </div>
              <h3 className="font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">
                {isUk ? exp.nameUk : exp.nameEn}
              </h3>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-900/30 text-cyan-400 border border-cyan-900/50">
                  {genres.find((g) => g.key === exp.genre)?.[isUk ? "uk" : "en"] ?? exp.genre}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-400">
                  ⏱ {exp.duration} min
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-400">
                  {isUk ? exp.difficultyUk : exp.difficultyEn}
                </span>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div>
                  <div className="text-lg font-black text-white">{exp.price} ₴</div>
                  <div className="text-xs text-yellow-400">★ {exp.rating} <span className="text-gray-500">({exp.reviews})</span></div>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); setSelectedExperience(exp); }}
                  className="px-4 py-2 rounded-lg bg-[#06B6D4]/10 border border-[#06B6D4]/50 text-[#06B6D4] text-sm font-semibold hover:bg-[#06B6D4]/20 transition-all">
                  {isUk ? "Забронювати" : "Book Now"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EXPERIENCE DETAIL MODAL */}
      {selectedExperience && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedExperience(null)}>
          <div className="bg-[#0A0A1A] border border-[#7C3AED] rounded-2xl max-w-lg w-full p-6 shadow-[0_0_40px_rgba(124,58,237,0.3)] max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-xl bg-violet-900/30 flex items-center justify-center">
                  <EmojiIcon emoji={selectedExperience.emoji} className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">{isUk ? selectedExperience.nameUk : selectedExperience.nameEn}</h3>
                  <div className="text-yellow-400 text-sm">★ {selectedExperience.rating} ({selectedExperience.reviews} {isUk ? "відгуків" : "reviews"})</div>
                </div>
              </div>
              <button onClick={() => setSelectedExperience(null)} className="text-gray-500 dark:text-neutral-400 hover:text-white text-2xl leading-none">×</button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-5">
              {[
                { label: isUk ? "Вік" : "Age", value: selectedExperience.age },
                { label: isUk ? "Тривалість" : "Duration", value: `${selectedExperience.duration} min` },
                { label: isUk ? "Режим" : "Mode", value: selectedExperience.mode === "solo" ? (isUk ? "Соло 👤" : "Solo 👤") : (isUk ? "Мульти 👥" : "Multi 👥") },
                { label: isUk ? "Складність" : "Difficulty", value: isUk ? selectedExperience.difficultyUk : selectedExperience.difficultyEn },
              ].map((item) => (
                <div key={item.label} className="bg-white/5 rounded-xl p-3">
                  <div className="text-xs text-gray-500 dark:text-neutral-400 mb-0.5">{item.label}</div>
                  <div className="text-sm font-semibold text-white">{item.value}</div>
                </div>
              ))}
            </div>

            <div className="mb-5">
              <h4 className="text-sm font-bold text-violet-400 mb-2">{isUk ? "Що на вас чекає" : "What to expect"}</h4>
              <ul className="space-y-1.5">
                {[
                  isUk ? "Повне занурення у фотореалістичний світ" : "Full immersion in a photorealistic world",
                  isUk ? "Тактильний зворотній зв'язок від контролерів" : "Haptic feedback from advanced controllers",
                  isUk ? "Підтримка команди на протязі всієї сесії" : "Staff support throughout the entire session",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="text-[#06B6D4] mt-0.5 shrink-0">▸</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-white/10 pt-4">
              <h4 className="text-sm font-bold text-white mb-3">{isUk ? "Швидке бронювання" : "Quick booking"}</h4>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="text-xs text-gray-400 dark:text-neutral-500 mb-1 block">{isUk ? "Дата" : "Date"}</label>
                  <input type="date" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-violet-500 outline-none" />
                </div>
                <div>
                  <label className="text-xs text-gray-400 dark:text-neutral-500 mb-1 block">{isUk ? "Кількість гравців" : "Players"}</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-violet-500 outline-none">
                    {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n} className="bg-[#0A0A1A]">{n}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <input type="text" placeholder={isUk ? "Ім'я" : "Name"} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:border-violet-500 outline-none" />
                <input type="tel" placeholder={isUk ? "Телефон" : "Phone"} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:border-violet-500 outline-none" />
              </div>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-black text-white">{selectedExperience.price} ₴</div>
                <button
                  onClick={() => setSelectedExperience(null)}
                  className="px-6 py-2.5 rounded-xl bg-[#7C3AED] font-bold shadow-[0_0_20px_rgba(124,58,237,0.5)] hover:shadow-[0_0_30px_rgba(124,58,237,0.8)] transition-all">
                  {isUk ? "Підтвердити" : "Confirm"} 🥽
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MULTIPLAYER SECTION */}
      <section id="multiplayer" className="py-20 px-4 bg-linear-to-br from-violet-950/20 via-[#050510] to-cyan-950/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-2">
            {isUk ? "Збери команду" : "Bring your squad"}
          </h2>
          <p className="text-gray-400 dark:text-neutral-500 text-center mb-12">
            {isUk ? "Ідеально для: Тімбілдинг, День народження, Вечір з друзями" : "Perfect for: Team building, Birthday, Friends night"}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: "👥", en: "Up to 6 players", uk: "до 6 гравців", descEn: "Full squad enters the same virtual world together", descUk: "Вся команда заходить в один віртуальний світ" },
              { icon: "🌐", en: "Same virtual space", uk: "Один простір", descEn: "Share every moment in real-time immersive environment", descUk: "Кожен момент — разом у реальному часі" },
              { icon: "🎖️", en: "Team roles", uk: "Командні ролі", descEn: "Each player gets a unique role and special abilities", descUk: "Кожен гравець отримує унікальну роль і здібності" },
            ].map((card) => (
              <div key={card.en} className="bg-[#0A0A1A] rounded-2xl p-6 border border-violet-900/30 text-center hover:border-violet-600 transition-all">
                <div className="mb-3"><EmojiIcon emoji={card.icon} className="w-10 h-10" /></div>
                <h3 className="text-lg font-bold text-white mb-2">{isUk ? card.uk : card.en}</h3>
                <p className="text-sm text-gray-400">{isUk ? card.descUk : card.descEn}</p>
              </div>
            ))}
          </div>
          <div className="bg-[#0A0A1A] rounded-2xl p-6 border border-violet-900/30 mb-8">
            <h3 className="text-lg font-bold text-center text-violet-400 mb-5">{isUk ? "Командні ролі" : "Team Roles"}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {roles.map((r) => (
                <div key={r.en} className="bg-violet-950/30 rounded-xl p-3 text-center border border-violet-900/30 hover:border-violet-500 transition-all">
                  <div className="mb-1"><EmojiIcon emoji={r.emoji} className="w-7 h-7" /></div>
                  <div className="text-xs font-semibold text-white">{isUk ? r.uk : r.en}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center">
            <a href="#booking">
              <button className="px-8 py-3 rounded-xl bg-[#7C3AED] font-bold text-lg shadow-[0_0_20px_rgba(124,58,237,0.5)] hover:shadow-[0_0_40px_rgba(124,58,237,0.8)] transition-all">
                {isUk ? "Забронювати для групи" : "Book for your group"}
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* VR PASSPORT */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-2">
            {isUk ? "Ваш VR-паспорт" : "Your VR Passport"}
          </h2>
          <p className="text-gray-400 dark:text-neutral-500 text-center mb-4">
            {isUk ? "Зібери всі 30 → статус VR Master" : "Collect all 30 → VR Master status"}
          </p>
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-3 flex-1 max-w-xs bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-[#7C3AED] to-[#06B6D4] rounded-full transition-all duration-500"
                style={{ width: `${(passportCompleted.size / 30) * 100}%` }} />
            </div>
            <span className="text-sm font-bold text-violet-400">{passportCompleted.size} / 30 {isUk ? "досвідів" : "experiences"}</span>
          </div>
          <div className="grid grid-cols-6 sm:grid-cols-10 gap-2 mb-6">
            {Array.from({ length: 30 }, (_, i) => i + 1).map((id) => {
              const exp = experiences.find((e) => e.id === id);
              const done = passportCompleted.has(id);
              return (
                <button key={id} onClick={() => togglePassport(id)}
                  className={`aspect-square rounded-lg flex items-center justify-center text-xl transition-all ${done ? "bg-violet-900/50 border border-violet-500 shadow-[0_0_10px_rgba(124,58,237,0.4)]" : "bg-white/5 border border-white/10 hover:border-violet-700"}`}>
                  {exp ? <EmojiIcon emoji={exp.emoji} className="w-5 h-5 inline-block align-middle" /> : <span className="text-xs text-gray-600">{id}</span>}
                </button>
              );
            })}
          </div>
          {passportCompleted.size === 30 && (
            <div className="text-center py-4 px-6 bg-violet-900/30 rounded-2xl border border-violet-500 shadow-[0_0_30px_rgba(124,58,237,0.4)]">
              <div className="text-3xl mb-1">🏆</div>
              <div className="text-lg font-black text-white">{isUk ? "Ви — VR Master!" : "You are a VR Master!"}</div>
            </div>
          )}
          <p className="text-center text-xs text-gray-500 dark:text-neutral-400 mt-3">{isUk ? "Натисніть на значок, щоб відмітити досвід" : "Click a badge to mark an experience as completed"}</p>
        </div>
      </section>

      {/* BOOKING FLOW */}
      <section id="booking" className="py-20 px-4 bg-linear-to-br from-[#050510] via-violet-950/10 to-[#050510]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-2">
            {isUk ? "Забронювати сесію" : "Book a Session"}
          </h2>
          <p className="text-gray-400 dark:text-neutral-500 text-center mb-8">
            {isUk ? "4 кроки до нової реальності" : "4 steps to a new reality"}
          </p>

          {/* Steps indicator */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${bookingStep >= s ? "bg-[#7C3AED] border-[#7C3AED] text-white shadow-[0_0_12px_rgba(124,58,237,0.5)]" : "border-white/20 text-gray-500"}`}>{s}</div>
                {s < 4 && <div className={`w-10 h-0.5 ${bookingStep > s ? "bg-[#7C3AED]" : "bg-white/10"}`} />}
              </div>
            ))}
          </div>

          <div className="bg-[#0A0A1A] rounded-2xl p-6 border border-violet-900/30 shadow-[0_0_30px_rgba(124,58,237,0.1)]">
            {bookingDone ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🥽</div>
                <div className="text-2xl font-black text-white mb-2">{isUk ? "Побачимось у VR!" : "See you in VR!"}</div>
                <div className="text-[#06B6D4]">{isUk ? "Бронювання підтверджено" : "Booking confirmed"}</div>
              </div>
            ) : (
              <>
                {bookingStep === 1 && (
                  <div>
                    <h3 className="text-lg font-bold text-white mb-4">{isUk ? "Крок 1: Оберіть досвід" : "Step 1: Choose experience"}</h3>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {experiences.slice(0, 6).map((exp) => (
                        <button key={exp.id}
                          className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500 hover:bg-violet-900/20 transition-all text-left">
                          <EmojiIcon emoji={exp.emoji} className="w-5 h-5" />
                          <span className="text-xs text-white font-medium truncate">{isUk ? exp.nameUk : exp.nameEn}</span>
                        </button>
                      ))}
                    </div>
                    <button className="w-full py-3 rounded-xl border border-dashed border-violet-700 text-violet-400 text-sm hover:bg-violet-900/10 transition-all mb-4">
                      ✨ {isUk ? "Порадьте самі" : "Surprise me"}
                    </button>
                    <button onClick={() => setBookingStep(2)} className="w-full py-3 rounded-xl bg-[#7C3AED] font-bold shadow-[0_0_15px_rgba(124,58,237,0.4)] hover:shadow-[0_0_25px_rgba(124,58,237,0.7)] transition-all">
                      {isUk ? "Далі →" : "Next →"}
                    </button>
                  </div>
                )}
                {bookingStep === 2 && (
                  <div>
                    <h3 className="text-lg font-bold text-white mb-4">{isUk ? "Крок 2: Дата та час" : "Step 2: Date & Time"}</h3>
                    <input type="date" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white mb-4 focus:border-violet-500 outline-none" />
                    <div className="mb-4">
                      <div className="text-sm text-gray-400 dark:text-neutral-500 mb-2">{isUk ? "Тривалість" : "Duration"}</div>
                      <div className="flex gap-2">
                        {durations.map((d) => (
                          <button key={d} onClick={() => setSelectedDuration(d)}
                            className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-all ${selectedDuration === d ? "bg-violet-700 border-violet-500 text-white" : "border-white/10 text-gray-400 dark:text-neutral-500 hover:border-violet-700"}`}>
                            {d} min
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="mb-5">
                      <div className="text-sm text-gray-400 dark:text-neutral-500 mb-2">{isUk ? "Доступний час" : "Available times"}</div>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map((t) => (
                          <button key={t} onClick={() => setSelectedTime(t)}
                            className={`py-2 rounded-lg border text-sm transition-all ${selectedTime === t ? "bg-[#06B6D4] border-[#06B6D4] text-[#050510] font-bold" : "border-white/10 text-gray-400 dark:text-neutral-500 hover:border-cyan-700"}`}>
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => setBookingStep(1)} className="flex-1 py-3 rounded-xl border border-white/10 text-gray-400 dark:text-neutral-500 hover:border-white/30 transition-all">{isUk ? "← Назад" : "← Back"}</button>
                      <button onClick={() => setBookingStep(3)} className="flex-1 py-3 rounded-xl bg-[#7C3AED] font-bold shadow-[0_0_15px_rgba(124,58,237,0.4)] transition-all">{isUk ? "Далі →" : "Next →"}</button>
                    </div>
                  </div>
                )}
                {bookingStep === 3 && (
                  <div>
                    <h3 className="text-lg font-bold text-white mb-4">{isUk ? "Крок 3: Гравці" : "Step 3: Players"}</h3>
                    <div className="flex items-center justify-center gap-6 mb-6 py-4 bg-white/5 rounded-xl">
                      <button onClick={() => setPlayerCount(Math.max(1, playerCount - 1))}
                        className="w-10 h-10 rounded-full border border-violet-700 text-white hover:bg-violet-900/30 text-xl font-bold transition-all">−</button>
                      <span className="text-4xl font-black text-white">{playerCount}</span>
                      <button onClick={() => setPlayerCount(Math.min(6, playerCount + 1))}
                        className="w-10 h-10 rounded-full border border-violet-700 text-white hover:bg-violet-900/30 text-xl font-bold transition-all">+</button>
                    </div>
                    <div className="text-center text-sm text-gray-400 dark:text-neutral-500 mb-6">{isUk ? `${playerCount} гравець${playerCount > 1 ? "ів" : ""}` : `${playerCount} player${playerCount > 1 ? "s" : ""}`}</div>
                    {Array.from({ length: playerCount }, (_, i) => (
                      <input key={i} type="text" placeholder={`${isUk ? "Ім'я гравця" : "Player name"} ${i + 1} (${isUk ? "необов'язково" : "optional"})`}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:border-violet-500 outline-none mb-2" />
                    ))}
                    <div className="flex gap-3 mt-4">
                      <button onClick={() => setBookingStep(2)} className="flex-1 py-3 rounded-xl border border-white/10 text-gray-400 dark:text-neutral-500 hover:border-white/30 transition-all">{isUk ? "← Назад" : "← Back"}</button>
                      <button onClick={() => setBookingStep(4)} className="flex-1 py-3 rounded-xl bg-[#7C3AED] font-bold shadow-[0_0_15px_rgba(124,58,237,0.4)] transition-all">{isUk ? "Далі →" : "Next →"}</button>
                    </div>
                  </div>
                )}
                {bookingStep === 4 && (
                  <div>
                    <h3 className="text-lg font-bold text-white mb-4">{isUk ? "Крок 4: Контакти" : "Step 4: Contact"}</h3>
                    <input type="text" placeholder={isUk ? "Ваше ім'я" : "Your name"} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-violet-500 outline-none mb-3" />
                    <input type="tel" placeholder={isUk ? "Телефон" : "Phone"} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-violet-500 outline-none mb-6" />
                    <div className="flex gap-3">
                      <button onClick={() => setBookingStep(3)} className="flex-1 py-3 rounded-xl border border-white/10 text-gray-400 dark:text-neutral-500 hover:border-white/30 transition-all">{isUk ? "← Назад" : "← Back"}</button>
                      <button onClick={handleBook} className="flex-1 py-3 rounded-xl bg-[#7C3AED] font-bold shadow-[0_0_20px_rgba(124,58,237,0.5)] hover:shadow-[0_0_30px_rgba(124,58,237,0.8)] transition-all">
                        {isUk ? "Підтвердити 🥽" : "Confirm 🥽"}
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 max-w-3xl mx-auto">
        <h2 className="text-3xl font-black text-center mb-10">FAQ</h2>
        <div className="space-y-3">
          {faqItems.map((item, i) => (
            <div key={i} className="bg-[#0A0A1A] rounded-xl border border-violet-900/30 hover:border-violet-700/50 transition-all overflow-hidden">
              <button
                className="w-full px-5 py-4 flex items-center justify-between text-left"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span className="font-semibold text-white">{isUk ? item.uk : item.en}</span>
                <span className={`text-[#7C3AED] text-xl font-bold transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span>
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4 text-sm text-gray-400 dark:text-neutral-500 border-t border-white/5 pt-3">
                  {isUk ? item.answerUk : item.answerEn}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#030308] border-t border-violet-900/20 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xl font-bold mb-3">
                <span>🥽</span>
                <span className="text-white">Virtual</span>
                <span className="text-[#7C3AED]">Zone</span>
              </div>
              <p className="text-sm text-gray-500">{isUk ? "Нове покоління VR розваг у серці Києва" : "Next-generation VR entertainment in the heart of Kyiv"}</p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#06B6D4] mb-3">{isUk ? "Контакти" : "Contact"}</h4>
              <p className="text-sm text-gray-400 dark:text-neutral-500 mb-1">📍 {isUk ? "Київ, Хрещатик 10" : "Kyiv, Khreshchatyk 10"}</p>
              <p className="text-sm text-gray-400 dark:text-neutral-500 mb-1">🕙 10:00–23:00</p>
              <p className="text-sm text-[#06B6D4]">📞 +380 44 123 4567</p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#7C3AED] mb-3">{isUk ? "Навігація" : "Navigation"}</h4>
              <div className="space-y-1.5">
                {navLinks.map((l) => (
                  <a key={l.href} href={l.href} className="block text-sm text-gray-400 dark:text-neutral-500 hover:text-violet-400 transition-colors">
                    {isUk ? l.uk : l.en}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 pt-6 text-center text-xs text-gray-600">
            © 2026 VirtualZone. {isUk ? "Всі права захищено." : "All rights reserved."}
          </div>
        </div>
      </footer>
    </div>
  );
}
