"use client";

import { useState } from "react";

export function ConfHubDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  // --- State ---
  const [activeDay, setActiveDay] = useState<1 | 2>(1);
  const [activeTrack, setActiveTrack] = useState<string>("all");
  const [topicFilter, setTopicFilter] = useState<string>("all");
  const [selectedSpeaker, setSelectedSpeaker] = useState<number | null>(null);
  const [mySchedule, setMySchedule] = useState<string[]>([]);
  const [regStep, setRegStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [regData, setRegData] = useState({
    ticketType: "",
    name: "",
    company: "",
    position: "",
    email: "",
    phone: "",
  });
  const [workshopSelections, setWorkshopSelections] = useState<string[]>([]);
  const [showScheduleSidebar, setShowScheduleSidebar] = useState(false);
  const [speakerTrackFilter, setSpeakerTrackFilter] = useState<string>("all");
  const [addedFeedback, setAddedFeedback] = useState<string | null>(null);
  const [pdfFeedback, setPdfFeedback] = useState(false);
  const [calExportFeedback, setCalExportFeedback] = useState(false);
  const [paySuccess, setPaySuccess] = useState(false);

  // --- Data ---
  const tracks = [
    { id: "main", label: isUk ? "Головна зала" : "Main Hall" },
    { id: "hallA", label: isUk ? "Зала A" : "Hall A" },
    { id: "hallB", label: isUk ? "Зала B" : "Hall B" },
    { id: "workshop", label: isUk ? "Воркшоп" : "Workshop" },
  ];

  const topics = [
    { id: "all", label: isUk ? "Всі теми" : "All Topics" },
    { id: "tech", label: isUk ? "Технології" : "Tech" },
    { id: "business", label: isUk ? "Бізнес" : "Business" },
    { id: "marketing", label: isUk ? "Маркетинг" : "Marketing" },
    { id: "leadership", label: isUk ? "Лідерство" : "Leadership" },
  ];

  type BadgeType = "Keynote" | "Panel" | "Workshop" | "Break";

  interface Slot {
    id: string;
    time: string;
    topic: string;
    speaker: string;
    type: BadgeType;
    topicCat: string;
    track: string;
    topicUk: string;
  }

  const schedule: Record<1 | 2, Slot[]> = {
    1: [
      { id: "d1-1", time: "09:00", topic: "Opening Keynote: Future of Business", topicUk: "Відкриття: Майбутнє бізнесу", speaker: "Anna Kovalenko", type: "Keynote", topicCat: "business", track: "main" },
      { id: "d1-2", time: "09:00", topic: "AI Tools for Growth Teams", topicUk: "AI-інструменти для команд зростання", speaker: "Dmytro Petrenko", type: "Panel", topicCat: "tech", track: "hallA" },
      { id: "d1-3", time: "09:00", topic: "Brand Positioning Workshop", topicUk: "Воркшоп з позиціонування бренду", speaker: "Olena Bondar", type: "Workshop", topicCat: "marketing", track: "workshop" },
      { id: "d1-4", time: "10:30", topic: "Coffee Break", topicUk: "Кава-пауза", speaker: "", type: "Break", topicCat: "all", track: "main" },
      { id: "d1-5", time: "11:00", topic: "Scaling Without Losing Culture", topicUk: "Масштабування без втрати культури", speaker: "Maksym Sydorenko", type: "Keynote", topicCat: "leadership", track: "main" },
      { id: "d1-6", time: "11:00", topic: "Product-Led Growth", topicUk: "Зростання через продукт", speaker: "Inna Marchenko", type: "Panel", topicCat: "business", track: "hallA" },
      { id: "d1-7", time: "11:00", topic: "DevOps Maturity Model", topicUk: "Модель зрілості DevOps", speaker: "Vasyl Kravchenko", type: "Panel", topicCat: "tech", track: "hallB" },
      { id: "d1-8", time: "13:00", topic: "Lunch Break", topicUk: "Обідня перерва", speaker: "", type: "Break", topicCat: "all", track: "main" },
      { id: "d1-9", time: "14:00", topic: "Leadership in Crisis", topicUk: "Лідерство в кризу", speaker: "Tetiana Voloshyn", type: "Keynote", topicCat: "leadership", track: "main" },
      { id: "d1-10", time: "14:00", topic: "Performance Marketing 2025", topicUk: "Перфоманс-маркетинг 2025", speaker: "Ruslan Fedorenko", type: "Panel", topicCat: "marketing", track: "hallA" },
      { id: "d1-11", time: "14:00", topic: "Data-Driven Decision Making", topicUk: "Рішення на основі даних", speaker: "Yulia Ostapenko", type: "Workshop", topicCat: "tech", track: "workshop" },
      { id: "d1-12", time: "16:00", topic: "Day 1 Wrap-Up & Networking", topicUk: "Підсумки дня 1 та нетворкінг", speaker: "Anna Kovalenko", type: "Keynote", topicCat: "business", track: "main" },
    ],
    2: [
      { id: "d2-1", time: "09:30", topic: "The Future of Work: Remote & Hybrid", topicUk: "Майбутнє праці: Remote та Hybrid", speaker: "Serhiy Lysenko", type: "Keynote", topicCat: "leadership", track: "main" },
      { id: "d2-2", time: "09:30", topic: "Go-to-Market for B2B SaaS", topicUk: "GTM-стратегія для B2B SaaS", speaker: "Nataliya Hrytsenko", type: "Panel", topicCat: "business", track: "hallA" },
      { id: "d2-3", time: "09:30", topic: "Cybersecurity Essentials", topicUk: "Основи кібербезпеки", speaker: "Andriy Koval", type: "Panel", topicCat: "tech", track: "hallB" },
      { id: "d2-4", time: "11:00", topic: "Coffee Break", topicUk: "Кава-пауза", speaker: "", type: "Break", topicCat: "all", track: "main" },
      { id: "d2-5", time: "11:30", topic: "Fundraising in 2025", topicUk: "Залучення інвестицій у 2025", speaker: "Iryna Savchenko", type: "Keynote", topicCat: "business", track: "main" },
      { id: "d2-6", time: "11:30", topic: "Content Marketing That Converts", topicUk: "Контент-маркетинг, який конвертує", speaker: "Oleksiy Bondarenko", type: "Panel", topicCat: "marketing", track: "hallA" },
      { id: "d2-7", time: "11:30", topic: "Pitch Workshop: Your 5-Min Story", topicUk: "Воркшоп: Ваша 5-хвилинна історія", speaker: "Maryna Tkachuk", type: "Workshop", topicCat: "leadership", track: "workshop" },
      { id: "d2-8", time: "13:00", topic: "Lunch Break", topicUk: "Обідня перерва", speaker: "", type: "Break", topicCat: "all", track: "main" },
      { id: "d2-9", time: "14:00", topic: "Closing Keynote: Shaping the Market", topicUk: "Закриття: Формуємо ринок", speaker: "Anna Kovalenko", type: "Keynote", topicCat: "business", track: "main" },
      { id: "d2-10", time: "14:00", topic: "Social Media Strategy Panel", topicUk: "Панель: Стратегія в соцмережах", speaker: "Daria Kuznetsova", type: "Panel", topicCat: "marketing", track: "hallA" },
      { id: "d2-11", time: "14:00", topic: "Tech Startup Demo Stage", topicUk: "Демо-сцена для стартапів", speaker: "Multiple Speakers", type: "Panel", topicCat: "tech", track: "hallB" },
      { id: "d2-12", time: "16:30", topic: "Closing Ceremony & Awards", topicUk: "Церемонія закриття та нагороди", speaker: "Anna Kovalenko", type: "Keynote", topicCat: "all", track: "main" },
    ],
  };

  interface Speaker {
    id: number;
    name: string;
    title: string;
    titleUk: string;
    company: string;
    topic: string;
    topicUk: string;
    bio: string;
    bioUk: string;
    initials: string;
    track: string;
    scheduleTime: string;
    scheduleHall: string;
    color: string;
  }

  const speakers: Speaker[] = [
    { id: 1, name: "Anna Kovalenko", title: "CEO", titleUk: "Генеральний директор", company: "FutureGroup", topic: "Business Strategy", topicUk: "Бізнес-стратегія", bio: "Anna has 15 years leading high-growth companies across Eastern Europe. She founded FutureGroup in 2015 and scaled it to 500+ employees.", bioUk: "Анна має 15 років досвіду керівництва компаніями зі швидким зростанням по всій Східній Європі. Вона заснувала FutureGroup у 2015 році.", initials: "AK", track: "main", scheduleTime: "09:00", scheduleHall: isUk ? "Головна зала" : "Main Hall", color: "#1D4ED8" },
    { id: 2, name: "Dmytro Petrenko", title: "CTO", titleUk: "Технічний директор", company: "TechScale UA", topic: "AI & Growth", topicUk: "AI та зростання", bio: "Dmytro leads engineering at TechScale UA, specializing in AI-powered tools for marketing and growth teams.", bioUk: "Дмитро очолює інженерний відділ TechScale UA, спеціалізуючись на AI-інструментах.", initials: "DP", track: "hallA", scheduleTime: "09:00", scheduleHall: isUk ? "Зала A" : "Hall A", color: "#0F766E" },
    { id: 3, name: "Olena Bondar", title: "Brand Strategist", titleUk: "Бренд-стратег", company: "Bondar Agency", topic: "Brand & Marketing", topicUk: "Бренд та маркетинг", bio: "Olena is a brand strategist with 10 years of experience helping Ukrainian companies build strong market presence.", bioUk: "Олена — бренд-стратег з 10-річним досвідом допомоги українським компаніям.", initials: "OB", track: "workshop", scheduleTime: "09:00", scheduleHall: isUk ? "Воркшоп" : "Workshop", color: "#1D4ED8" },
    { id: 4, name: "Maksym Sydorenko", title: "Founder & CEO", titleUk: "Засновник та CEO", company: "GrowthOS", topic: "Leadership & Culture", topicUk: "Лідерство та культура", bio: "Maksym built GrowthOS from 0 to $10M ARR while maintaining a 95% employee retention rate through intentional culture-building.", bioUk: "Максим побудував GrowthOS від нуля до $10M ARR зберігаючи 95% утримання співробітників.", initials: "MS", track: "main", scheduleTime: "11:00", scheduleHall: isUk ? "Головна зала" : "Main Hall", color: "#0F766E" },
    { id: 5, name: "Inna Marchenko", title: "VP Product", titleUk: "Віце-президент з продукту", company: "SaaSify", topic: "Product Strategy", topicUk: "Продуктова стратегія", bio: "Inna leads product at SaaSify, where she pioneered the product-led growth model that tripled their user acquisition.", bioUk: "Інна очолює продукт у SaaSify, де впровадила PLG-модель.", initials: "IM", track: "hallA", scheduleTime: "11:00", scheduleHall: isUk ? "Зала A" : "Hall A", color: "#1D4ED8" },
    { id: 6, name: "Vasyl Kravchenko", title: "DevOps Lead", titleUk: "Лід DevOps", company: "CloudNative UA", topic: "DevOps & Infrastructure", topicUk: "DevOps та інфраструктура", bio: "Vasyl is a DevOps architect who has helped 30+ companies reach CI/CD maturity and reduce deployment time by 80%.", bioUk: "Василь — DevOps-архітектор, який допоміг 30+ компаніям досягти зрілості CI/CD.", initials: "VK", track: "hallB", scheduleTime: "11:00", scheduleHall: isUk ? "Зала B" : "Hall B", color: "#0F766E" },
    { id: 7, name: "Tetiana Voloshyn", title: "Executive Coach", titleUk: "Виконавчий коуч", company: "Leaders Circle", topic: "Leadership Under Pressure", topicUk: "Лідерство під тиском", bio: "Tetiana coaches C-suite executives on resilience and decision-making in times of uncertainty and organizational crisis.", bioUk: "Тетяна коучить топ-менеджерів з питань стійкості та прийняття рішень.", initials: "TV", track: "main", scheduleTime: "14:00", scheduleHall: isUk ? "Головна зала" : "Main Hall", color: "#1D4ED8" },
    { id: 8, name: "Ruslan Fedorenko", title: "Head of Performance", titleUk: "Керівник перфоманс-відділу", company: "MediaBurst", topic: "Performance Marketing", topicUk: "Перфоманс-маркетинг", bio: "Ruslan manages $5M+ in annual ad spend at MediaBurst, with a track record of 3x ROAS across retail and SaaS verticals.", bioUk: "Руслан керує рекламним бюджетом $5M+ у MediaBurst з показником 3x ROAS.", initials: "RF", track: "hallA", scheduleTime: "14:00", scheduleHall: isUk ? "Зала A" : "Hall A", color: "#0F766E" },
    { id: 9, name: "Yulia Ostapenko", title: "Data Scientist", titleUk: "Датасаєнтист", company: "Insight Analytics", topic: "Data & Analytics", topicUk: "Дані та аналітика", bio: "Yulia builds data pipelines and BI dashboards that turn raw business data into actionable growth insights.", bioUk: "Юлія будує пайплайни даних та BI-дашборди, що перетворюють бізнес-дані на інсайти.", initials: "YO", track: "workshop", scheduleTime: "14:00", scheduleHall: isUk ? "Воркшоп" : "Workshop", color: "#1D4ED8" },
    { id: 10, name: "Serhiy Lysenko", title: "Chief People Officer", titleUk: "Директор з персоналу", company: "HybridWork Co.", topic: "Future of Work", topicUk: "Майбутнє праці", bio: "Serhiy shapes remote and hybrid work culture at HybridWork Co., a company fully distributed across 12 countries.", bioUk: "Сергій формує культуру дистанційної та гібридної роботи у компанії HybridWork Co.", initials: "SL", track: "main", scheduleTime: "09:30", scheduleHall: isUk ? "Головна зала" : "Main Hall", color: "#0F766E" },
    { id: 11, name: "Iryna Savchenko", title: "Partner", titleUk: "Партнер", company: "Horizon Ventures", topic: "Startup Funding", topicUk: "Фінансування стартапів", bio: "Iryna has invested in 40+ Ukrainian and CEE startups at Horizon Ventures, with 5 exits over the last 4 years.", bioUk: "Ірина інвестувала у 40+ українських та CEE-стартапів у Horizon Ventures.", initials: "IS", track: "main", scheduleTime: "11:30", scheduleHall: isUk ? "Головна зала" : "Main Hall", color: "#1D4ED8" },
    { id: 12, name: "Maryna Tkachuk", title: "Storytelling Coach", titleUk: "Коуч зі сторітелінгу", company: "Pitch Studio", topic: "Pitch & Communication", topicUk: "Пітч та комунікація", bio: "Maryna has coached 200+ founders to tell their story in 5 minutes or less. Her clients have raised over $120M combined.", bioUk: "Марина навчила 200+ засновників розповідати свою історію за 5 хвилин. Її клієнти залучили понад $120M.", initials: "MT", track: "workshop", scheduleTime: "11:30", scheduleHall: isUk ? "Воркшоп" : "Workshop", color: "#0F766E" },
  ];

  const workshopsData = [
    { id: "ws1", title: isUk ? "Побудова бренд-ідентичності" : "Building Brand Identity", host: "Olena Bondar", seats: 20, taken: 14 },
    { id: "ws2", title: isUk ? "Рішення на основі даних" : "Data-Driven Decisions", host: "Yulia Ostapenko", seats: 25, taken: 19 },
    { id: "ws3", title: isUk ? "Пітч вашої 5-хвилинної історії" : "Pitch Your 5-Min Story", host: "Maryna Tkachuk", seats: 30, taken: 22 },
  ];

  const ticketTypes = [
    {
      id: "delegate",
      label: isUk ? "Делегат" : "Delegate",
      price: "₴2,800",
      includes: isUk
        ? ["Всі пленарні сесії", "Доступ до 2 воркшопів", "Обіди та кава-паузи", "Нетворкінг-вечеря", "Матеріали конференції", "Сертифікат учасника"]
        : ["All plenary sessions", "Access to 2 workshops", "Lunches & coffee breaks", "Networking dinner", "Conference materials", "Attendance certificate"],
    },
    {
      id: "startup",
      label: isUk ? "Стартап" : "Startup",
      price: "₴1,400",
      includes: isUk
        ? ["Всі пленарні сесії", "1 воркшоп на вибір", "Кава-паузи", "Стартап-нетворкінг", "Доступ до стенду"]
        : ["All plenary sessions", "1 workshop of choice", "Coffee breaks", "Startup networking", "Booth area access"],
    },
    {
      id: "online",
      label: isUk ? "Онлайн" : "Online",
      price: "₴480",
      includes: isUk
        ? ["Трансляція всіх сесій", "Записи після події", "Онлайн Q&A", "Цифрові матеріали"]
        : ["Live stream of all sessions", "Post-event recordings", "Online Q&A access", "Digital materials"],
    },
  ];

  // --- Helpers ---
  const badgeStyle = (type: BadgeType) => {
    if (type === "Keynote") return "bg-blue-100 text-blue-800 border border-blue-200";
    if (type === "Panel") return "bg-teal-100 text-teal-800 border border-teal-200";
    if (type === "Workshop") return "bg-green-100 text-green-800 border border-green-200";
    return "bg-gray-100 dark:bg-neutral-800 text-gray-500 dark:text-neutral-400 border border-gray-200";
  };

  const badgeLabel = (type: BadgeType) => {
    if (!isUk) return type;
    if (type === "Keynote") return "Кейнот";
    if (type === "Panel") return "Панель";
    if (type === "Workshop") return "Воркшоп";
    return "Перерва";
  };

  const filteredSlots = schedule[activeDay].filter((s) => {
    const trackOk = activeTrack === "all" || s.track === activeTrack;
    const topicOk = topicFilter === "all" || s.topicCat === topicFilter;
    return trackOk && topicOk;
  });

  const filteredSpeakers = speakers.filter(
    (sp) => speakerTrackFilter === "all" || sp.track === speakerTrackFilter
  );

  const toggleMySchedule = (slotId: string, slotLabel: string) => {
    setMySchedule((prev) =>
      prev.includes(slotId) ? prev.filter((id) => id !== slotId) : [...prev, slotId]
    );
    setAddedFeedback(slotLabel);
    setTimeout(() => setAddedFeedback(null), 2000);
  };

  const removeFromSchedule = (slotId: string) => {
    setMySchedule((prev) => prev.filter((id) => id !== slotId));
  };

  const allSlots = [...schedule[1], ...schedule[2]];
  const mySlots = allSlots.filter((s) => mySchedule.includes(s.id));

  const handleRegNext = () => {
    if (regStep < 4) setRegStep((prev) => (prev + 1) as 1 | 2 | 3 | 4 | 5);
  };
  const handleRegBack = () => {
    if (regStep > 1) setRegStep((prev) => (prev - 1) as 1 | 2 | 3 | 4 | 5);
  };

  const handlePay = () => {
    setPaySuccess(true);
    setRegStep(5);
  };

  const toggleWorkshop = (wsId: string) => {
    setWorkshopSelections((prev) =>
      prev.includes(wsId) ? prev.filter((id) => id !== wsId) : [...prev, wsId]
    );
  };

  // countdown — fixed to event date (Sep 15, 2025 — already past; shown as 0 for demo)
  const countdown = { days: 0, hours: 0, mins: 0, secs: 0 };

  return (
    <div className="font-sans text-gray-900 dark:text-white bg-[#F1F5F9] min-h-screen">

      {/* ── HEADER ─────────────────────────────────────────────── */}
      <header className="bg-[#1D4ED8] text-white px-6 py-3 flex items-center justify-between sticky top-0 z-40 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-white/20 flex items-center justify-center text-xs font-bold tracking-tight">CH</div>
          <span className="font-semibold text-sm tracking-wide">ConfHub Digital Forum 2025</span>
        </div>
        <nav className="hidden md:flex items-center gap-5 text-sm">
          <a href="#program" className="text-white/80 hover:text-white transition-colors">{isUk ? "Програма" : "Program"}</a>
          <a href="#speakers" className="text-white/80 hover:text-white transition-colors">{isUk ? "Спікери" : "Speakers"}</a>
          <a href="#register" className="text-white/80 hover:text-white transition-colors">{isUk ? "Реєстрація" : "Register"}</a>
          <a href="#venue" className="text-white/80 hover:text-white transition-colors">{isUk ? "Місце" : "Venue"}</a>
        </nav>
        <button
          onClick={() => setShowScheduleSidebar(true)}
          className="relative bg-white/10 hover:bg-white/20 transition-colors text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          {isUk ? "Мій розклад" : "My Schedule"}
          {mySchedule.length > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-[#0F766E] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {mySchedule.length}
            </span>
          )}
        </button>
      </header>

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="grid md:grid-cols-2 min-h-[520px]">
        {/* Left — blue panel */}
        <div className="bg-linear-to-br from-[#1D4ED8] to-[#1e40af] flex flex-col justify-center px-10 py-16 text-white">
          <div className="text-xs font-semibold uppercase tracking-widest text-blue-200 mb-4">
            {isUk ? "Київ · 15–16 вересня 2025" : "Kyiv · September 15–16, 2025"}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
            {isUk ? "Конференція,\nяка формує ринок" : "The Conference\nThat Shapes the Market"}
          </h1>
          <div className="flex flex-wrap gap-4 mb-8">
            {[
              { n: "400+", l: isUk ? "учасників" : "attendees" },
              { n: "30", l: isUk ? "спікерів" : "speakers" },
              { n: "4", l: isUk ? "треки" : "tracks" },
            ].map((stat) => (
              <div key={stat.l} className="bg-white/10 rounded-lg px-4 py-3 text-center min-w-[80px]">
                <div className="text-2xl font-bold">{stat.n}</div>
                <div className="text-blue-200 text-xs mt-0.5">{stat.l}</div>
              </div>
            ))}
          </div>
          {/* Countdown */}
          <div className="mb-8">
            <p className="text-blue-200 text-xs mb-2 uppercase tracking-wider">
              {isUk ? "Зворотний відлік" : "Countdown"}
            </p>
            <div className="flex gap-3">
              {[
                { v: countdown.days, l: isUk ? "дн" : "d" },
                { v: countdown.hours, l: isUk ? "год" : "h" },
                { v: countdown.mins, l: isUk ? "хв" : "m" },
                { v: countdown.secs, l: isUk ? "с" : "s" },
              ].map((u) => (
                <div key={u.l} className="bg-white/10 rounded px-3 py-2 text-center min-w-[44px]">
                  <span className="text-xl font-mono font-bold">{String(u.v).padStart(2, "0")}</span>
                  <div className="text-blue-300 text-[10px]">{u.l}</div>
                </div>
              ))}
            </div>
            <p className="text-blue-300 text-xs mt-2">{isUk ? "* Демо: відлік завершено" : "* Demo: countdown complete"}</p>
          </div>
          {/* CTA */}
          <div className="flex gap-3 flex-wrap">
            <a href="#register" className="bg-white text-[#1D4ED8] font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-blue-50 transition-colors">
              {isUk ? "Зареєструватись" : "Register"}
            </a>
            <a href="#program" className="border border-white/40 text-white font-medium text-sm px-5 py-2.5 rounded-lg hover:bg-white/10 transition-colors">
              {isUk ? "Переглянути програму" : "View Program"}
            </a>
          </div>
        </div>

        {/* Right — info panel */}
        <div className="bg-white flex flex-col justify-center px-10 py-16">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">ConfHub Digital Forum 2025</h2>
          <p className="text-gray-500 dark:text-neutral-400 text-sm mb-6">
            {isUk
              ? "Найбільша бізнес-конференція для лідерів ринку, засновників і топ-менеджерів України."
              : "The leading business conference for market leaders, founders, and senior executives in Ukraine."}
          </p>
          <div className="space-y-3 mb-8">
            {[
              { icon: "📅", label: isUk ? "Дата" : "Date", val: isUk ? "15–16 вересня 2025" : "September 15–16, 2025" },
              { icon: "📍", label: isUk ? "Місце" : "Location", val: "UNIT.City Innovation Campus, Kyiv" },
              { icon: "🕘", label: isUk ? "Початок" : "Starts", val: "09:00" },
              { icon: "🎤", label: isUk ? "Формат" : "Format", val: isUk ? "Офлайн + онлайн-трансляція" : "In-person + live stream" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                <span className="text-base shrink-0 mt-0.5">{item.icon}</span>
                <div>
                  <span className="text-xs font-medium text-gray-400 dark:text-neutral-500 uppercase tracking-wide">{item.label}</span>
                  <p className="text-sm text-gray-800 dark:text-neutral-200 font-medium">{item.val}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Sponsors */}
          <div>
            <p className="text-xs font-medium text-gray-400 dark:text-neutral-500 uppercase tracking-widest mb-3">
              {isUk ? "Спонсори" : "Sponsors"}
            </p>
            <div className="flex flex-wrap gap-2">
              {["TechScale UA", "GrowthOS", "Horizon Ventures", "MediaBurst", "CloudNative UA"].map((s) => (
                <span key={s} className="bg-[#F1F5F9] text-gray-600 dark:text-neutral-300 text-xs font-medium px-3 py-1.5 rounded-full border border-gray-200">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROGRAM ────────────────────────────────────────────── */}
      <section id="program" className="max-w-7xl mx-auto px-4 py-14">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{isUk ? "Програма" : "Program"}</h2>
            <p className="text-gray-500 dark:text-neutral-400 text-sm mt-1">ConfHub Digital Forum 2025</p>
          </div>
          <button
            onClick={() => { setPdfFeedback(true); setTimeout(() => setPdfFeedback(false), 2000); }}
            className="flex items-center gap-2 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-gray-700 dark:text-neutral-300 text-sm px-4 py-2 rounded-lg hover:bg-gray-50 dark:bg-neutral-900 transition-colors shadow-sm"
          >
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            {pdfFeedback ? (isUk ? "Завантажується..." : "Downloading...") : (isUk ? "Завантажити PDF" : "Download PDF")}
          </button>
        </div>

        {/* Day tabs */}
        <div className="flex gap-2 mb-6">
          {([1, 2] as const).map((d) => (
            <button
              key={d}
              onClick={() => setActiveDay(d)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${activeDay === d ? "bg-[#1D4ED8] text-white shadow" : "bg-white text-gray-600 dark:text-neutral-300 border border-gray-200 dark:border-neutral-700 hover:bg-gray-50"}`}
            >
              {isUk ? `День ${d} · ${d === 1 ? "15 вер" : "16 вер"}` : `Day ${d} · Sep ${d === 1 ? "15" : "16"}`}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          {/* Track filter */}
          <div className="flex gap-1.5 flex-wrap">
            <button
              onClick={() => setActiveTrack("all")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${activeTrack === "all" ? "bg-[#0F766E] text-white" : "bg-white border border-gray-200 dark:border-neutral-700 text-gray-600 dark:text-neutral-300 hover:bg-gray-50"}`}
            >
              {isUk ? "Всі зали" : "All Halls"}
            </button>
            {tracks.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTrack(t.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${activeTrack === t.id ? "bg-[#0F766E] text-white" : "bg-white border border-gray-200 dark:border-neutral-700 text-gray-600 dark:text-neutral-300 hover:bg-gray-50"}`}
              >
                {t.label}
              </button>
            ))}
          </div>
          {/* Topic filter */}
          <div className="flex gap-1.5 flex-wrap ml-auto">
            {topics.map((t) => (
              <button
                key={t.id}
                onClick={() => setTopicFilter(t.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${topicFilter === t.id ? "bg-[#1D4ED8] text-white" : "bg-white border border-gray-200 dark:border-neutral-700 text-gray-600 dark:text-neutral-300 hover:bg-gray-50"}`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Schedule grid */}
        <div className="space-y-2">
          {filteredSlots.length === 0 && (
            <p className="text-gray-400 dark:text-neutral-500 text-sm py-8 text-center">
              {isUk ? "Немає сесій за вибраними фільтрами" : "No sessions match the selected filters"}
            </p>
          )}
          {filteredSlots.map((slot) => (
            <div
              key={slot.id}
              className={`bg-white rounded-xl border border-gray-100 dark:border-neutral-700 shadow-sm p-4 flex flex-col sm:flex-row sm:items-center gap-3 ${slot.type === "Break" ? "opacity-60" : ""}`}
            >
              <div className="shrink-0 w-14 text-center">
                <span className="text-sm font-mono font-bold text-[#1D4ED8]">{slot.time}</span>
              </div>
              <div className="shrink-0">
                <span className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full ${badgeStyle(slot.type)}`}>
                  {badgeLabel(slot.type)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                  {isUk ? slot.topicUk : slot.topic}
                </p>
                {slot.speaker && (
                  <p className="text-gray-400 dark:text-neutral-500 text-xs mt-0.5">{slot.speaker}</p>
                )}
                <p className="text-gray-300 text-[10px] mt-0.5">
                  {tracks.find((t) => t.id === slot.track)?.label}
                </p>
              </div>
              {slot.type !== "Break" && (
                <button
                  onClick={() => toggleMySchedule(slot.id, isUk ? slot.topicUk : slot.topic)}
                  className={`shrink-0 text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                    mySchedule.includes(slot.id)
                      ? "bg-[#0F766E] text-white"
                      : "bg-[#F1F5F9] text-gray-600 dark:text-neutral-300 hover:bg-blue-50 hover:text-[#1D4ED8]"
                  }`}
                >
                  {mySchedule.includes(slot.id)
                    ? (isUk ? "✓ Додано" : "✓ Added")
                    : (isUk ? "+ До розкладу" : "+ Add to schedule")}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Added feedback toast */}
        {addedFeedback && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#0F766E] text-white text-sm px-5 py-2.5 rounded-xl shadow-lg z-50 pointer-events-none">
            {isUk ? `Додано: ${addedFeedback}` : `Added: ${addedFeedback}`}
          </div>
        )}
      </section>

      {/* ── SPEAKERS ───────────────────────────────────────────── */}
      <section id="speakers" className="bg-white py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{isUk ? "Спікери" : "Speakers"}</h2>
              <p className="text-gray-500 dark:text-neutral-400 text-sm mt-1">{isUk ? "30 лідерів ринку" : "30 market leaders"}</p>
            </div>
            <div className="md:ml-auto flex gap-1.5 flex-wrap">
              <button
                onClick={() => setSpeakerTrackFilter("all")}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${speakerTrackFilter === "all" ? "bg-[#1D4ED8] text-white" : "bg-[#F1F5F9] border border-gray-200 dark:border-neutral-700 text-gray-600 dark:text-neutral-300 hover:bg-gray-50"}`}
              >
                {isUk ? "Всі" : "All"}
              </button>
              {tracks.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSpeakerTrackFilter(t.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${speakerTrackFilter === t.id ? "bg-[#1D4ED8] text-white" : "bg-[#F1F5F9] border border-gray-200 dark:border-neutral-700 text-gray-600 dark:text-neutral-300 hover:bg-gray-50"}`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredSpeakers.map((sp) => (
              <button
                key={sp.id}
                onClick={() => setSelectedSpeaker(selectedSpeaker === sp.id ? null : sp.id)}
                className={`text-left rounded-xl border p-4 transition-all hover:shadow-md ${selectedSpeaker === sp.id ? "border-[#1D4ED8] shadow-md bg-blue-50" : "border-gray-100 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-gray-200"}`}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-bold mb-3 mx-auto"
                  style={{ backgroundColor: sp.color }}
                >
                  {sp.initials}
                </div>
                <p className="font-semibold text-gray-900 dark:text-white text-xs text-center leading-tight">{sp.name}</p>
                <p className="text-gray-400 dark:text-neutral-500 text-[11px] text-center mt-0.5">{isUk ? sp.titleUk : sp.title}</p>
                <p className="text-[#1D4ED8] text-[11px] text-center font-medium">{sp.company}</p>
              </button>
            ))}
          </div>

          {/* Speaker detail */}
          {selectedSpeaker !== null && (() => {
            const sp = speakers.find((s) => s.id === selectedSpeaker);
            if (!sp) return null;
            return (
              <div className="mt-6 bg-[#F1F5F9] rounded-2xl p-6 border border-gray-100 dark:border-neutral-700 flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center md:items-start gap-3 shrink-0">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold"
                    style={{ backgroundColor: sp.color }}
                  >
                    {sp.initials}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{sp.name}</p>
                    <p className="text-gray-500 dark:text-neutral-400 text-sm">{isUk ? sp.titleUk : sp.title} · {sp.company}</p>
                  </div>
                  <div className="flex gap-2">
                    {["LinkedIn", "Twitter"].map((soc) => (
                      <span key={soc} className="bg-white border border-gray-200 dark:border-neutral-700 text-gray-500 dark:text-neutral-400 text-xs px-3 py-1.5 rounded-lg cursor-pointer hover:text-[#1D4ED8] hover:border-[#1D4ED8] transition-colors">
                        {soc}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{isUk ? sp.topicUk : sp.topic}</h3>
                  <p className="text-gray-600 dark:text-neutral-300 text-sm leading-relaxed mb-4">{isUk ? sp.bioUk : sp.bio}</p>
                  <div className="bg-white rounded-lg px-4 py-3 inline-flex items-center gap-2 border border-gray-100 dark:border-neutral-700 text-sm">
                    <svg className="w-4 h-4 text-[#0F766E]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    <span className="text-gray-600">
                      {isUk ? "У розкладі о" : "In schedule at"} <strong>{sp.scheduleTime}</strong>, {sp.scheduleHall}
                    </span>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* ── REGISTRATION ───────────────────────────────────────── */}
      <section id="register" className="max-w-4xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">{isUk ? "Реєстрація" : "Registration"}</h2>
        <p className="text-gray-500 dark:text-neutral-400 text-sm text-center mb-8">
          {isUk ? "Зареєструйтесь на ConfHub Digital Forum 2025" : "Register for ConfHub Digital Forum 2025"}
        </p>

        {/* Progress */}
        {regStep < 5 && (
          <div className="flex items-center justify-center gap-1 mb-8">
            {([1, 2, 3, 4] as const).map((s) => (
              <div key={s} className="flex items-center gap-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  regStep === s ? "bg-[#1D4ED8] text-white" : regStep > s ? "bg-[#0F766E] text-white" : "bg-gray-200 text-gray-400"
                }`}>
                  {regStep > s ? "✓" : s}
                </div>
                {s < 4 && <div className={`w-8 h-0.5 ${regStep > s ? "bg-[#0F766E]" : "bg-gray-200"}`} />}
              </div>
            ))}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 dark:border-neutral-700 p-6 md:p-8">

          {/* Step 1 — Ticket type */}
          {regStep === 1 && (
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-1">{isUk ? "Крок 1: Тип квитка" : "Step 1: Ticket Type"}</h3>
              <p className="text-gray-400 dark:text-neutral-500 text-sm mb-5">{isUk ? "Оберіть категорію учасника" : "Choose your participant category"}</p>
              <div className="grid md:grid-cols-3 gap-4">
                {ticketTypes.map((tt) => (
                  <button
                    key={tt.id}
                    onClick={() => setRegData((prev) => ({ ...prev, ticketType: tt.id }))}
                    className={`text-left rounded-xl border-2 p-5 transition-all ${
                      regData.ticketType === tt.id ? "border-[#1D4ED8] bg-blue-50" : "border-gray-100 dark:border-neutral-700 hover:border-gray-200"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="font-bold text-gray-900">{tt.label}</span>
                      <span className="text-[#1D4ED8] font-bold text-lg">{tt.price}</span>
                    </div>
                    <ul className="space-y-1.5">
                      {tt.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs text-gray-600">
                          <span className="text-[#0F766E] font-bold mt-0.5 shrink-0">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </button>
                ))}
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={handleRegNext}
                  disabled={!regData.ticketType}
                  className="bg-[#1D4ED8] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  {isUk ? "Далі →" : "Next →"}
                </button>
              </div>
            </div>
          )}

          {/* Step 2 — Participant details */}
          {regStep === 2 && (
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-1">{isUk ? "Крок 2: Дані учасника" : "Step 2: Participant Details"}</h3>
              <p className="text-gray-400 dark:text-neutral-500 text-sm mb-5">{isUk ? "Заповніть контактну інформацію" : "Fill in your contact information"}</p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { key: "name", label: isUk ? "Ім'я та прізвище" : "Full Name", type: "text", placeholder: isUk ? "Ім'я Прізвище" : "First Last" },
                  { key: "company", label: isUk ? "Компанія" : "Company", type: "text", placeholder: isUk ? "Назва компанії" : "Company name" },
                  { key: "position", label: isUk ? "Посада" : "Position", type: "text", placeholder: isUk ? "CEO / Product Manager / ..." : "CEO / Product Manager / ..." },
                  { key: "email", label: "Email", type: "email", placeholder: "you@company.com" },
                  { key: "phone", label: isUk ? "Телефон" : "Phone", type: "tel", placeholder: "+380 XX XXX XX XX" },
                ].map((field) => (
                  <div key={field.key} className={field.key === "phone" ? "md:col-span-2" : ""}>
                    <label className="block text-xs font-medium text-gray-600 dark:text-neutral-300 mb-1.5">{field.label}</label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={regData[field.key as keyof typeof regData]}
                      onChange={(e) => setRegData((prev) => ({ ...prev, [field.key]: e.target.value }))}
                      className="w-full border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1D4ED8] focus:ring-1 focus:ring-[#1D4ED8] transition-colors"
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-6">
                <button onClick={handleRegBack} className="text-gray-500 dark:text-neutral-400 hover:text-gray-700 dark:text-neutral-300 text-sm px-4 py-2.5 rounded-lg border border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:bg-neutral-900 transition-colors">
                  ← {isUk ? "Назад" : "Back"}
                </button>
                <button
                  onClick={handleRegNext}
                  disabled={!regData.name || !regData.email}
                  className="bg-[#1D4ED8] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  {isUk ? "Далі →" : "Next →"}
                </button>
              </div>
            </div>
          )}

          {/* Step 3 — Workshop selection */}
          {regStep === 3 && (
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-1">{isUk ? "Крок 3: Вибір воркшопів" : "Step 3: Workshop Selection"}</h3>
              <p className="text-gray-400 dark:text-neutral-500 text-sm mb-5">
                {isUk ? "Оберіть воркшопи, які вас цікавлять" : "Choose the workshops you would like to attend"}
              </p>
              <div className="space-y-3">
                {workshopsData.map((ws) => {
                  const left = ws.seats - ws.taken;
                  const pct = (ws.taken / ws.seats) * 100;
                  return (
                    <button
                      key={ws.id}
                      onClick={() => toggleWorkshop(ws.id)}
                      className={`w-full text-left rounded-xl border-2 p-4 transition-all ${
                        workshopSelections.includes(ws.id) ? "border-[#0F766E] bg-teal-50" : "border-gray-100 dark:border-neutral-700 hover:border-gray-200"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white text-sm">{ws.title}</p>
                          <p className="text-gray-400 dark:text-neutral-500 text-xs mt-0.5">{ws.host}</p>
                        </div>
                        <div className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs ${
                          workshopSelections.includes(ws.id) ? "bg-[#0F766E] border-[#0F766E] text-white" : "border-gray-300"
                        }`}>
                          {workshopSelections.includes(ws.id) ? "✓" : ""}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-gray-100 dark:bg-neutral-800 rounded-full h-1.5 overflow-hidden">
                          <div className="bg-[#0F766E] h-full rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-xs text-gray-500 dark:text-neutral-400 shrink-0">
                          {left} {isUk ? "місць залишилось" : "seats left"}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
              <div className="flex justify-between mt-6">
                <button onClick={handleRegBack} className="text-gray-500 dark:text-neutral-400 hover:text-gray-700 dark:text-neutral-300 text-sm px-4 py-2.5 rounded-lg border border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:bg-neutral-900 transition-colors">
                  ← {isUk ? "Назад" : "Back"}
                </button>
                <button onClick={handleRegNext} className="bg-[#1D4ED8] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
                  {isUk ? "Далі →" : "Next →"}
                </button>
              </div>
            </div>
          )}

          {/* Step 4 — Payment summary */}
          {regStep === 4 && !paySuccess && (
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-1">{isUk ? "Крок 4: Оплата" : "Step 4: Payment"}</h3>
              <p className="text-gray-400 dark:text-neutral-500 text-sm mb-5">{isUk ? "Перевірте та оплатіть" : "Review and pay"}</p>
              <div className="bg-[#F1F5F9] rounded-xl p-5 mb-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{isUk ? "Тип квитка" : "Ticket type"}</span>
                  <span className="font-semibold text-gray-900">
                    {ticketTypes.find((t) => t.id === regData.ticketType)?.label}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{isUk ? "Учасник" : "Participant"}</span>
                  <span className="font-semibold text-gray-900">{regData.name || "—"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{isUk ? "Email" : "Email"}</span>
                  <span className="font-semibold text-gray-900">{regData.email || "—"}</span>
                </div>
                {workshopSelections.length > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{isUk ? "Воркшопи" : "Workshops"}</span>
                    <span className="font-semibold text-gray-900">{workshopSelections.length}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 dark:border-neutral-700 pt-3 flex justify-between">
                  <span className="font-bold text-gray-900">{isUk ? "Всього" : "Total"}</span>
                  <span className="font-bold text-[#1D4ED8] text-lg">
                    {ticketTypes.find((t) => t.id === regData.ticketType)?.price}
                  </span>
                </div>
              </div>
              {/* Mock card input */}
              <div className="space-y-3 mb-6">
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-neutral-300 mb-1.5">{isUk ? "Номер картки" : "Card Number"}</label>
                  <input readOnly value="•••• •••• •••• ••••" className="w-full border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2.5 text-sm text-gray-400 dark:text-neutral-500 bg-gray-50 dark:bg-neutral-900 cursor-not-allowed" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 dark:text-neutral-300 mb-1.5">{isUk ? "Термін дії" : "Expiry"}</label>
                    <input readOnly value="MM / YY" className="w-full border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2.5 text-sm text-gray-400 dark:text-neutral-500 bg-gray-50 dark:bg-neutral-900 cursor-not-allowed" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 dark:text-neutral-300 mb-1.5">CVV</label>
                    <input readOnly value="•••" className="w-full border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2.5 text-sm text-gray-400 dark:text-neutral-500 bg-gray-50 dark:bg-neutral-900 cursor-not-allowed" />
                  </div>
                </div>
                <p className="text-[11px] text-gray-400">{isUk ? "* Демо: платіж симульований" : "* Demo: payment is simulated"}</p>
              </div>
              <div className="flex justify-between">
                <button onClick={handleRegBack} className="text-gray-500 dark:text-neutral-400 hover:text-gray-700 dark:text-neutral-300 text-sm px-4 py-2.5 rounded-lg border border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:bg-neutral-900 transition-colors">
                  ← {isUk ? "Назад" : "Back"}
                </button>
                <button onClick={handlePay} className="bg-[#0F766E] text-white px-8 py-2.5 rounded-lg text-sm font-bold hover:bg-teal-700 transition-colors shadow-sm">
                  {isUk ? "Оплатити" : "Pay Now"}
                </button>
              </div>
            </div>
          )}

          {/* Step 5 — Success */}
          {regStep === 5 && paySuccess && (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-5">
                <svg className="w-8 h-8 text-[#0F766E]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {isUk ? "Реєстрацію підтверджено!" : "Registration Confirmed!"}
              </h3>
              <p className="text-gray-500 dark:text-neutral-400 text-sm mb-6">
                {isUk
                  ? `Дякуємо, ${regData.name || "учаснику"}! Підтвердження надіслано на ${regData.email || "вашу пошту"}.`
                  : `Thank you, ${regData.name || "participant"}! Confirmation sent to ${regData.email || "your email"}.`}
              </p>
              {/* QR placeholder */}
              <div className="inline-flex flex-col items-center bg-[#F1F5F9] rounded-2xl p-6 border border-gray-200 dark:border-neutral-700 mb-6">
                <div className="w-28 h-28 bg-white dark:bg-neutral-800 border-2 border-gray-200 dark:border-neutral-700 rounded-xl flex flex-col items-center justify-center gap-2 mb-3">
                  <div className="grid grid-cols-3 gap-0.5">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div key={i} className={`w-3 h-3 rounded-[2px] ${[0,1,3,4,5,7,8].includes(i) ? "bg-gray-800" : "bg-white"}`} />
                    ))}
                  </div>
                  <span className="text-[9px] text-gray-400">QR</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-neutral-400 font-mono">CHF2025-{Math.random().toString(36).slice(2, 8).toUpperCase()}</p>
                <p className="text-[11px] text-gray-400 dark:text-neutral-500 mt-1">{isUk ? "Ваш квиток" : "Your ticket"}</p>
              </div>
              <div>
                <button
                  onClick={() => { setRegStep(1); setRegData({ ticketType: "", name: "", company: "", position: "", email: "", phone: "" }); setWorkshopSelections([]); setPaySuccess(false); }}
                  className="text-[#1D4ED8] text-sm font-medium hover:underline"
                >
                  {isUk ? "Зареєструвати ще одного учасника" : "Register another participant"}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── VENUE ──────────────────────────────────────────────── */}
      <section id="venue" className="bg-white py-14">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{isUk ? "Місце проведення та логістика" : "Venue & Logistics"}</h2>
          <p className="text-gray-500 dark:text-neutral-400 text-sm mb-8">{isUk ? "Все, що потрібно знати для підготовки до приїзду" : "Everything you need to plan your visit"}</p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Venue card */}
            <div className="bg-[#F1F5F9] rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#1D4ED8] rounded-xl flex items-center justify-center text-white text-lg shrink-0">🏛</div>
                <div>
                  <h3 className="font-bold text-gray-900">UNIT.City Innovation Campus</h3>
                  <p className="text-gray-400 dark:text-neutral-500 text-xs">{isUk ? "вул. Дорогожицька 3, Київ" : "3 Dorohozhytska St, Kyiv"}</p>
                </div>
              </div>
              <div className="space-y-2.5">
                {[
                  { icon: "👥", label: isUk ? "Місткість" : "Capacity", val: "600+" },
                  { icon: "🅿️", label: isUk ? "Парковка" : "Parking", val: isUk ? "200 місць на майданчику" : "200 spots on-site" },
                  { icon: "♿", label: isUk ? "Доступність" : "Accessibility", val: isUk ? "Повна доступність для маломобільних" : "Fully accessible" },
                  { icon: "📶", label: "WiFi", val: isUk ? "Безкоштовний Wi-Fi 1 Гбіт/с" : "Free 1 Gbps WiFi" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 text-sm">
                    <span className="text-base shrink-0">{item.icon}</span>
                    <span className="text-gray-500">{item.label}:</span>
                    <span className="text-gray-800 dark:text-neutral-200 font-medium">{item.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* How to get there */}
            <div className="bg-[#F1F5F9] rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">{isUk ? "Як дістатись" : "How to Get There"}</h3>
              <div className="space-y-3">
                {[
                  { icon: "🚇", how: isUk ? "Метро: ст. Дорогожичі (3 хв пішки)" : "Metro: Dorohozhychi station (3 min walk)" },
                  { icon: "🚌", how: isUk ? "Автобус: маршрути 18, 62, 114" : "Bus: routes 18, 62, 114" },
                  { icon: "🚕", how: isUk ? "Таксі: Uber/Bolt — близько 15 хв з центру" : "Taxi: Uber/Bolt — ~15 min from city centre" },
                  { icon: "🚗", how: isUk ? "Автомобіль: через просп. Перемоги" : "Car: via Peremohy Avenue" },
                ].map((item) => (
                  <div key={item.how} className="flex items-start gap-3 text-sm">
                    <span className="text-base shrink-0 mt-0.5">{item.icon}</span>
                    <span className="text-gray-700">{item.how}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hotels */}
            <div className="bg-[#F1F5F9] rounded-2xl p-6 md:col-span-2">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">{isUk ? "Рекомендовані готелі" : "Suggested Hotels"}</h3>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { name: "Intercontinental Kyiv", dist: isUk ? "2.1 км від місця" : "2.1 km from venue", stars: "★★★★★" },
                  { name: "Premier Palace Hotel", dist: isUk ? "3.0 км від місця" : "3.0 km from venue", stars: "★★★★★" },
                  { name: "ibis Kyiv City Centre", dist: isUk ? "1.8 км від місця" : "1.8 km from venue", stars: "★★★" },
                ].map((h) => (
                  <div key={h.name} className="bg-white rounded-xl border border-gray-100 dark:border-neutral-700 p-4">
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{h.name}</p>
                    <p className="text-yellow-500 text-xs mt-0.5">{h.stars}</p>
                    <p className="text-gray-400 dark:text-neutral-500 text-xs mt-1">{h.dist}</p>
                    <p className="text-[#1D4ED8] text-xs mt-1 font-medium cursor-pointer hover:underline">
                      {isUk ? "Забронювати →" : "Book →"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────── */}
      <footer className="bg-[#1D4ED8] text-white py-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded bg-white/20 flex items-center justify-center text-xs font-bold">CH</div>
                <span className="font-bold text-sm">ConfHub Digital Forum</span>
              </div>
              <p className="text-blue-200 text-sm leading-relaxed">
                {isUk
                  ? "Щорічна конференція для лідерів бізнесу та технологій."
                  : "The annual conference for business and technology leaders."}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3 text-blue-100 uppercase tracking-wider">{isUk ? "Минулі видання" : "Past Editions"}</h4>
              <div className="space-y-2">
                {[
                  { year: "2024", att: "320", sp: "24" },
                  { year: "2023", att: "250", sp: "18" },
                  { year: "2022", att: "180", sp: "14" },
                ].map((ed) => (
                  <div key={ed.year} className="flex items-center gap-3 text-sm">
                    <span className="text-blue-200 font-mono w-10">{ed.year}</span>
                    <span className="text-white/70">
                      {ed.att} {isUk ? "учасників" : "attendees"} · {ed.sp} {isUk ? "спікерів" : "speakers"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3 text-blue-100 uppercase tracking-wider">{isUk ? "Контакти" : "Contact"}</h4>
              <div className="space-y-2 text-sm text-blue-200">
                <p>hello@confhub.ua</p>
                <p>+380 44 XXX XX XX</p>
                <p>{isUk ? "пн–пт 09:00–18:00" : "Mon–Fri 09:00–18:00"}</p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-blue-300">
            <span>© 2025 ConfHub Digital Forum. {isUk ? "Всі права захищені." : "All rights reserved."}</span>
            <div className="flex gap-4">
              <span className="cursor-pointer hover:text-white transition-colors">{isUk ? "Умови використання" : "Terms"}</span>
              <span className="cursor-pointer hover:text-white transition-colors">{isUk ? "Конфіденційність" : "Privacy"}</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ── MY SCHEDULE SIDEBAR ────────────────────────────────── */}
      {showScheduleSidebar && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/30" onClick={() => setShowScheduleSidebar(false)} />
          <div className="w-full max-w-sm bg-white h-full overflow-y-auto shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-neutral-700 bg-[#1D4ED8] text-white">
              <h3 className="font-bold text-sm">{isUk ? "Мій розклад" : "My Schedule"}</h3>
              <button onClick={() => setShowScheduleSidebar(false)} className="text-white/70 hover:text-white text-lg leading-none">✕</button>
            </div>
            <div className="flex-1 p-5">
              {mySlots.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <div className="text-3xl mb-3">📅</div>
                  <p className="text-sm">{isUk ? "Ваш розклад порожній" : "Your schedule is empty"}</p>
                  <p className="text-xs mt-1">{isUk ? "Додайте сесії з програми" : "Add sessions from the program"}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {mySlots.map((slot) => (
                    <div key={slot.id} className="bg-[#F1F5F9] rounded-xl p-4 flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 dark:text-white text-xs leading-tight">
                          {isUk ? slot.topicUk : slot.topic}
                        </p>
                        {slot.speaker && <p className="text-gray-400 dark:text-neutral-500 text-[11px] mt-0.5">{slot.speaker}</p>}
                        <p className="text-[#1D4ED8] text-[11px] font-mono mt-0.5">
                          {slot.time} · {tracks.find((t) => t.id === slot.track)?.label}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromSchedule(slot.id)}
                        className="text-gray-300 hover:text-red-400 transition-colors text-sm shrink-0"
                        aria-label={isUk ? "Видалити" : "Remove"}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {mySlots.length > 0 && (
              <div className="p-5 border-t border-gray-100">
                <button
                  onClick={() => { setCalExportFeedback(true); setTimeout(() => setCalExportFeedback(false), 2000); }}
                  className="w-full bg-[#0F766E] text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-teal-700 transition-colors"
                >
                  {calExportFeedback
                    ? (isUk ? "Експортується..." : "Exporting...")
                    : (isUk ? "Експортувати в календар" : "Export to Calendar")}
                </button>
                <p className="text-[11px] text-gray-400 dark:text-neutral-500 text-center mt-2">{isUk ? "* Демо: мок-дія" : "* Demo: mock action"}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
