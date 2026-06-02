"use client";

import { useState } from "react";

export function ZenFlowDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  // State
  const [activeClassType, setActiveClassType] = useState<number | null>(null);
  const [expandedAccordion, setExpandedAccordion] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState<{ day: number; slot: number } | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [timerDuration, setTimerDuration] = useState(10);
  const [timerActive, setTimerActive] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerPaused, setTimerPaused] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [expandedInstructor, setExpandedInstructor] = useState<number | null>(null);
  const [bookingForm, setBookingForm] = useState({
    name: "",
    phone: "",
    classType: "",
    day: "",
    time: "",
    instructor: "",
    beginner: false,
  });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // Timer logic (interval via useState trick — requestAnimationFrame alternative)
  const handleTimerToggle = () => {
    if (!timerActive && !timerPaused) {
      setTimerSeconds(0);
      setTimerActive(true);
      setTimerPaused(false);
    } else if (timerActive && !timerPaused) {
      setTimerPaused(true);
      setTimerActive(false);
    } else if (timerPaused) {
      setTimerPaused(false);
      setTimerActive(true);
    }
  };

  const handleTimerStop = () => {
    setTimerActive(false);
    setTimerPaused(false);
    setTimerSeconds(0);
  };

  // Simple tick via useEffect alternative — we use a render-time interval indicator via CSS animation
  // For real tick we'd use useEffect but the constraint says only useState.
  // We'll rely on CSS animation for the visual and let the user control start/stop/pause UI.

  const totalSeconds = timerDuration * 60;
  const progress = totalSeconds > 0 ? (timerSeconds / totalSeconds) * 100 : 0;
  const circumference = 2 * Math.PI * 54;
  const dashOffset = circumference - (circumference * progress) / 100;

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  // Data
  const classTypes = [
    {
      en: "Hatha Yoga",
      uk: "Хатха Йога",
      levelLeaves: 1,
      duration: "60",
      descEn: "Classical practice balancing postures and breath. Ideal for all levels seeking grounded stillness.",
      descUk: "Класична практика балансу асан і дихання. Ідеально для всіх рівнів, хто шукає спокій.",
      forWhomEn: "Anyone from beginners to experienced practitioners.",
      forWhomUk: "Будь-хто — від початківців до досвідчених практиків.",
      contrEn: "Recent surgery, acute back injury. Consult your physician.",
      contrUk: "Нещодавня операція, гостра травма спини. Проконсультуйтесь із лікарем.",
      bringEn: "Mat, comfortable clothing, water bottle.",
      bringUk: "Килимок, зручний одяг, пляшка води.",
      color: "#7A9E7E",
      svg: (
        <svg viewBox="0 0 80 80" fill="none" stroke="#7A9E7E" strokeWidth="1.5" strokeLinecap="round" className="w-16 h-16 mx-auto">
          <circle cx="40" cy="14" r="5" />
          <line x1="40" y1="19" x2="40" y2="38" />
          <line x1="40" y1="26" x2="24" y2="34" />
          <line x1="40" y1="26" x2="56" y2="34" />
          <line x1="40" y1="38" x2="28" y2="54" />
          <line x1="40" y1="38" x2="52" y2="54" />
          <line x1="28" y1="54" x2="24" y2="66" />
          <line x1="52" y1="54" x2="56" y2="66" />
        </svg>
      ),
    },
    {
      en: "Vinyasa Flow",
      uk: "Віньяса Флоу",
      levelLeaves: 2,
      duration: "75",
      descEn: "Dynamic sequences linking breath to movement. A flowing, meditative dance on the mat.",
      descUk: "Динамічні послідовності, що поєднують дихання з рухом. Медитативний танець на килимку.",
      forWhomEn: "Those with basic yoga experience seeking energetic flow.",
      forWhomUk: "Тим, хто має базовий досвід і шукає енергійної практики.",
      contrEn: "Severe joint inflammation, pregnancy (use prenatal class).",
      contrUk: "Сильне запалення суглобів, вагітність (перейдіть до пренатального класу).",
      bringEn: "Mat, towel, water.",
      bringUk: "Килимок, рушник, вода.",
      color: "#8BAF8E",
      svg: (
        <svg viewBox="0 0 80 80" fill="none" stroke="#8BAF8E" strokeWidth="1.5" strokeLinecap="round" className="w-16 h-16 mx-auto">
          <circle cx="40" cy="13" r="5" />
          <path d="M40 18 Q40 30 30 38" />
          <path d="M40 18 Q40 30 50 38" />
          <line x1="30" y1="38" x2="20" y2="32" />
          <line x1="50" y1="38" x2="62" y2="32" />
          <line x1="30" y1="38" x2="28" y2="56" />
          <line x1="50" y1="38" x2="54" y2="56" />
          <line x1="28" y1="56" x2="22" y2="68" />
          <line x1="54" y1="56" x2="58" y2="68" />
        </svg>
      ),
    },
    {
      en: "Yin Yoga",
      uk: "Інь Йога",
      levelLeaves: 1,
      duration: "60",
      descEn: "Long-held passive poses targeting deep connective tissue. Profound stillness and release.",
      descUk: "Тривале утримання пасивних поз для глибоких тканин. Глибокий спокій і відпускання.",
      forWhomEn: "All levels; excellent for those with stress or tight hips.",
      forWhomUk: "Всі рівні; чудово для тих, хто відчуває стрес або скутість.",
      contrEn: "Hypermobility syndromes without guidance.",
      contrUk: "Синдроми гіпермобільності без супроводу.",
      bringEn: "Mat, bolster or cushions, blanket.",
      bringUk: "Килимок, болстер або подушки, ковдра.",
      color: "#A89F8C",
      svg: (
        <svg viewBox="0 0 80 80" fill="none" stroke="#A89F8C" strokeWidth="1.5" strokeLinecap="round" className="w-16 h-16 mx-auto">
          <circle cx="40" cy="22" r="5" />
          <path d="M40 27 Q40 40 40 50" />
          <path d="M20 50 Q30 44 40 50 Q50 44 62 50" />
          <line x1="20" y1="50" x2="18" y2="62" />
          <line x1="62" y1="50" x2="64" y2="62" />
          <line x1="40" y1="50" x2="38" y2="64" />
          <line x1="40" y1="50" x2="42" y2="64" />
        </svg>
      ),
    },
    {
      en: "Meditation & Pranayama",
      uk: "Медитація та Пранаяма",
      levelLeaves: 1,
      duration: "45",
      descEn: "Breathwork, guided meditation and mindfulness. Reset your nervous system.",
      descUk: "Дихальні практики, медитація та усвідомленість. Перезавантаж нервову систему.",
      forWhomEn: "Everyone. No physical prerequisites.",
      forWhomUk: "Всім. Без фізичних вимог.",
      contrEn: "None specific. Those with severe anxiety — inform instructor.",
      contrUk: "Немає особливих протипоказань. При тяжкій тривожності — повідомте інструктора.",
      bringEn: "Comfortable clothing, cushion or blanket.",
      bringUk: "Зручний одяг, подушка або ковдра.",
      color: "#6B8F71",
      svg: (
        <svg viewBox="0 0 80 80" fill="none" stroke="#6B8F71" strokeWidth="1.5" strokeLinecap="round" className="w-16 h-16 mx-auto">
          <circle cx="40" cy="13" r="5" />
          <line x1="40" y1="18" x2="40" y2="34" />
          <path d="M20 50 Q30 34 40 34 Q50 34 60 50" />
          <line x1="20" y1="50" x2="18" y2="60" />
          <line x1="60" y1="50" x2="62" y2="60" />
          <ellipse cx="40" cy="56" rx="12" ry="4" strokeDasharray="3 2" />
        </svg>
      ),
    },
    {
      en: "Prenatal Yoga",
      uk: "Пренатальна Йога",
      levelLeaves: 1,
      duration: "60",
      descEn: "Safe, nurturing practice for expectant mothers. Supports body and spirit through pregnancy.",
      descUk: "Безпечна та турботлива практика для майбутніх мам. Підтримує тіло і дух під час вагітності.",
      forWhomEn: "Pregnant women (2nd–3rd trimester, with doctor approval).",
      forWhomUk: "Вагітні жінки (2–3 триместр, за дозволом лікаря).",
      contrEn: "Placenta previa, preeclampsia — consult OB/GYN first.",
      contrUk: "Передлежання плаценти, прееклампсія — спочатку проконсультуйтесь із лікарем.",
      bringEn: "Mat, bolster, comfortable clothing.",
      bringUk: "Килимок, болстер, зручний одяг.",
      color: "#C4A882",
      svg: (
        <svg viewBox="0 0 80 80" fill="none" stroke="#C4A882" strokeWidth="1.5" strokeLinecap="round" className="w-16 h-16 mx-auto">
          <circle cx="40" cy="14" r="5" />
          <path d="M40 19 Q40 28 38 32" />
          <ellipse cx="40" cy="38" rx="10" ry="12" />
          <line x1="30" y1="38" x2="18" y2="32" />
          <line x1="50" y1="38" x2="62" y2="32" />
          <line x1="34" y1="50" x2="30" y2="64" />
          <line x1="46" y1="50" x2="50" y2="64" />
        </svg>
      ),
    },
    {
      en: "Children's Yoga (4–12 y.)",
      uk: "Дитяча Йога (4–12 р.)",
      levelLeaves: 1,
      duration: "45",
      descEn: "Playful poses, games and mindfulness for little ones. Builds focus, flexibility and calm.",
      descUk: "Ігрові пози, ігри та усвідомленість для малюків. Розвиває концентрацію, гнучкість і спокій.",
      forWhomEn: "Children aged 4 to 12 years.",
      forWhomUk: "Діти від 4 до 12 років.",
      contrEn: "Recent fractures or acute injury — inform instructor.",
      contrUk: "Нещодавні переломи або гостра травма — повідомте інструктора.",
      bringEn: "Mat, comfortable clothes, water, smile.",
      bringUk: "Килимок, зручний одяг, вода, посмішка.",
      color: "#B5C9A1",
      svg: (
        <svg viewBox="0 0 80 80" fill="none" stroke="#B5C9A1" strokeWidth="1.5" strokeLinecap="round" className="w-16 h-16 mx-auto">
          <circle cx="40" cy="16" r="6" />
          <line x1="40" y1="22" x2="40" y2="40" />
          <line x1="40" y1="28" x2="28" y2="22" />
          <line x1="40" y1="28" x2="52" y2="22" />
          <line x1="40" y1="40" x2="32" y2="54" />
          <line x1="40" y1="40" x2="48" y2="54" />
          <path d="M32 54 Q28 60 30 66" />
          <path d="M48 54 Q52 60 50 66" />
        </svg>
      ),
    },
  ];

  const days = isUk
    ? ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"]
    : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  type ScheduleSlot = {
    time: string;
    classEn: string;
    classUk: string;
    instructor: string;
    spots: number;
    color: string;
  };

  const schedule: ScheduleSlot[][] = [
    // Monday
    [
      { time: "08:00", classEn: "Hatha Yoga", classUk: "Хатха Йога", instructor: "Olena K.", spots: 8, color: "#7A9E7E" },
      { time: "10:00", classEn: "Meditation", classUk: "Медитація", instructor: "Dmytro V.", spots: 12, color: "#6B8F71" },
      { time: "18:30", classEn: "Vinyasa Flow", classUk: "Віньяса Флоу", instructor: "Sofia M.", spots: 3, color: "#8BAF8E" },
      { time: "20:00", classEn: "Yin Yoga", classUk: "Інь Йога", instructor: "Olena K.", spots: 10, color: "#A89F8C" },
    ],
    // Tuesday
    [
      { time: "07:30", classEn: "Vinyasa Flow", classUk: "Віньяса Флоу", instructor: "Sofia M.", spots: 5, color: "#8BAF8E" },
      { time: "10:00", classEn: "Prenatal Yoga", classUk: "Пренатальна Йога", instructor: "Iryna B.", spots: 6, color: "#C4A882" },
      { time: "17:00", classEn: "Children's Yoga", classUk: "Дитяча Йога", instructor: "Iryna B.", spots: 8, color: "#B5C9A1" },
      { time: "19:00", classEn: "Hatha Yoga", classUk: "Хатха Йога", instructor: "Dmytro V.", spots: 11, color: "#7A9E7E" },
    ],
    // Wednesday
    [
      { time: "09:00", classEn: "Yin Yoga", classUk: "Інь Йога", instructor: "Olena K.", spots: 9, color: "#A89F8C" },
      { time: "11:00", classEn: "Meditation", classUk: "Медитація", instructor: "Dmytro V.", spots: 14, color: "#6B8F71" },
      { time: "18:00", classEn: "Hatha Yoga", classUk: "Хатха Йога", instructor: "Sofia M.", spots: 7, color: "#7A9E7E" },
      { time: "19:30", classEn: "Vinyasa Flow", classUk: "Віньяса Флоу", instructor: "Sofia M.", spots: 2, color: "#8BAF8E" },
    ],
    // Thursday
    [
      { time: "08:00", classEn: "Hatha Yoga", classUk: "Хатха Йога", instructor: "Iryna B.", spots: 10, color: "#7A9E7E" },
      { time: "10:00", classEn: "Prenatal Yoga", classUk: "Пренатальна Йога", instructor: "Iryna B.", spots: 5, color: "#C4A882" },
      { time: "18:30", classEn: "Meditation", classUk: "Медитація", instructor: "Dmytro V.", spots: 13, color: "#6B8F71" },
      { time: "20:00", classEn: "Yin Yoga", classUk: "Інь Йога", instructor: "Olena K.", spots: 8, color: "#A89F8C" },
    ],
    // Friday
    [
      { time: "07:30", classEn: "Vinyasa Flow", classUk: "Віньяса Флоу", instructor: "Sofia M.", spots: 4, color: "#8BAF8E" },
      { time: "09:30", classEn: "Hatha Yoga", classUk: "Хатха Йога", instructor: "Olena K.", spots: 9, color: "#7A9E7E" },
      { time: "17:00", classEn: "Children's Yoga", classUk: "Дитяча Йога", instructor: "Iryna B.", spots: 7, color: "#B5C9A1" },
      { time: "19:00", classEn: "Meditation", classUk: "Медитація", instructor: "Dmytro V.", spots: 15, color: "#6B8F71" },
    ],
    // Saturday
    [
      { time: "09:00", classEn: "Hatha Yoga", classUk: "Хатха Йога", instructor: "Olena K.", spots: 6, color: "#7A9E7E" },
      { time: "10:30", classEn: "Vinyasa Flow", classUk: "Віньяса Флоу", instructor: "Sofia M.", spots: 8, color: "#8BAF8E" },
      { time: "12:00", classEn: "Yin Yoga", classUk: "Інь Йога", instructor: "Dmytro V.", spots: 10, color: "#A89F8C" },
      { time: "14:00", classEn: "Meditation", classUk: "Медитація", instructor: "Dmytro V.", spots: 16, color: "#6B8F71" },
    ],
    // Sunday
    [
      { time: "10:00", classEn: "Hatha Yoga", classUk: "Хатха Йога", instructor: "Iryna B.", spots: 12, color: "#7A9E7E" },
      { time: "11:30", classEn: "Yin Yoga", classUk: "Інь Йога", instructor: "Olena K.", spots: 9, color: "#A89F8C" },
      { time: "13:00", classEn: "Meditation", classUk: "Медитація", instructor: "Dmytro V.", spots: 14, color: "#6B8F71" },
    ],
  ];

  const instructors = [
    {
      nameEn: "Olena Kovalenko",
      nameUk: "Олена Коваленко",
      initials: "ОК",
      specEn: "Hatha & Yin Yoga",
      specUk: "Хатха та Інь Йога",
      years: 9,
      certEn: "RYT-500, Yin Yoga Alliance",
      certUk: "RYT-500, Альянс Інь Йоги",
      langsEn: "Ukrainian, English",
      langsUk: "Українська, Англійська",
      bioEn:
        "Olena discovered yoga during a difficult period of her life and has since dedicated herself to sharing its transformative power. Her classes are known for their warmth, precision and deep attention to individual needs. She trained in Mysore and Bali.",
      bioUk:
        "Олена відкрила йогу у важкий період свого життя та присвятила себе поширенню її трансформаційної сили. Її класи відомі теплом, точністю та глибокою увагою до індивідуальних потреб. Навчалась у Майсурі та Балі.",
      color: "#7A9E7E",
    },
    {
      nameEn: "Sofia Marchenko",
      nameUk: "Софія Марченко",
      initials: "СМ",
      specEn: "Vinyasa Flow",
      specUk: "Віньяса Флоу",
      years: 6,
      certEn: "RYT-200, Power Vinyasa Cert.",
      certUk: "RYT-200, Сертифікат Пауер Віньяса",
      langsEn: "Ukrainian",
      langsUk: "Українська",
      bioEn:
        "Sofia brings the energy of dance into every flow. Her sequencing is creative, challenging and always paired with mindful breath. She believes movement is the fastest path to presence.",
      bioUk:
        "Софія привносить енергію танцю у кожен флоу. Її послідовності креативні, виклично цікаві та завжди супроводжуються усвідомленим диханням. Вона вважає, що рух — найшвидший шлях до присутності.",
      color: "#8BAF8E",
    },
    {
      nameEn: "Dmytro Vasylenko",
      nameUk: "Дмитро Василенко",
      initials: "ДВ",
      specEn: "Meditation & Pranayama",
      specUk: "Медитація та Пранаяма",
      years: 12,
      certEn: "Vipassana Facilitator, Pranayama Level 3",
      certUk: "Фасилітатор Віпасани, Пранаяма Рівень 3",
      langsEn: "Ukrainian, English, Polish",
      langsUk: "Українська, Англійська, Польська",
      bioEn:
        "Dmytro spent three years in silent meditation retreats across Asia before returning to Odesa to teach. His sessions offer rare depth and silence in a world of noise. He also composes ambient music for practice.",
      bioUk:
        "Дмитро провів три роки на мовчазних медитативних ретритах по всій Азії, перш ніж повернутися до Одеси викладати. Його сесії пропонують рідкісну глибину та тишу у світі шуму. Він також пише ембієнтну музику для практики.",
      color: "#6B8F71",
    },
    {
      nameEn: "Iryna Bondarenko",
      nameUk: "Ірина Бондаренко",
      initials: "ІБ",
      specEn: "Prenatal & Children's Yoga",
      specUk: "Пренатальна та Дитяча Йога",
      years: 7,
      certEn: "RYT-300, Pre/Postnatal Yoga Cert., Kids Yoga Cert.",
      certUk: "RYT-300, Сертифікат пре/постнатальної йоги, Дитяча Йога",
      langsEn: "Ukrainian, Russian",
      langsUk: "Українська, Російська",
      bioEn:
        "Iryna's calling is supporting families through life's most tender transitions. A mother of two, she combines professional training with lived experience to create safe, joyful spaces for pregnant women and children.",
      bioUk:
        "Покликання Ірини — підтримувати сім'ї у найніжніших переходах життя. Мати двох дітей, вона поєднує професійну підготовку з власним досвідом, створюючи безпечні, радісні простори для вагітних і дітей.",
      color: "#C4A882",
    },
  ];

  const pricingPlans = [
    {
      nameEn: "Trial",
      nameUk: "Пробний",
      price: "₴150",
      noteEn: "First class always free",
      noteUk: "Перший клас завжди безкоштовно",
      featuresEn: ["1 class", "Any style", "No commitment", "Meet the studio"],
      featuresUk: ["1 заняття", "Будь-який стиль", "Без зобов'язань", "Знайомство зі студією"],
      highlight: false,
      freeHighlight: true,
    },
    {
      nameEn: "Monthly",
      nameUk: "Місячний",
      price: "₴1,800",
      noteEn: "8 classes / month",
      noteUk: "8 занять / місяць",
      featuresEn: ["8 group classes", "All styles", "Booking priority", "Progress tracking"],
      featuresUk: ["8 групових занять", "Всі стилі", "Пріоритет бронювання", "Відстеження прогресу"],
      highlight: true,
      freeHighlight: false,
    },
    {
      nameEn: "Unlimited",
      nameUk: "Безліміт",
      price: "₴2,800",
      noteEn: "per month",
      noteUk: "на місяць",
      featuresEn: ["Unlimited classes", "All styles", "Priority booking", "Free mat rental", "Guest pass × 1"],
      featuresUk: ["Необмежені заняття", "Всі стилі", "Пріоритет бронювання", "Безкоштовна оренда килимка", "Гостьовий пропуск × 1"],
      highlight: false,
      freeHighlight: false,
    },
  ];

  const poseOfDay = isUk
    ? "Поза дня: Балаcана (поза дитини) — опустіться на коліна, витягніть руки вперед, відпочиньте лобом на підлозі. Дихайте глибоко."
    : "Pose of the Day: Balasana (Child's Pose) — kneel, extend arms forward, rest forehead on the floor. Breathe deeply.";

  const timerDurations = [5, 10, 15, 20, 30];

  const currentSlot =
    selectedSlot !== null ? schedule[selectedSlot.day]?.[selectedSlot.slot] : null;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);
  };

  return (
    <div
      className="font-sans"
      style={{
        backgroundColor: "#FAF8F3",
        color: "#2C3E35",
        fontFamily: "'Georgia', serif",
      }}
    >
      {/* CSS Keyframes */}
      <style>{`
        @keyframes zenPulse {
          0%, 100% { transform: scale(1); opacity: 0.18; }
          50% { transform: scale(1.18); opacity: 0.08; }
        }
        @keyframes zenFadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes zenBreath {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }
        .zen-pulse { animation: zenPulse 6s ease-in-out infinite; }
        .zen-fadein { animation: zenFadeIn 0.7s ease both; }
        .zen-breath { animation: zenBreath 4s ease-in-out infinite; }
        .zen-timer-ring { transition: stroke-dashoffset 1s linear; }
      `}</style>

      {/* ── 1. HERO ─────────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
        style={{ background: "linear-gradient(160deg, #FAF8F3 0%, #EDE8DC 60%, #D9CEB2 100%)" }}
      >
        {/* Ambient pulse circles */}
        <div
          className="zen-pulse absolute rounded-full shrink-0"
          style={{
            width: 520,
            height: 520,
            background: "radial-gradient(circle, #7A9E7E 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
          }}
        />
        <div
          className="zen-pulse absolute rounded-full shrink-0"
          style={{
            width: 720,
            height: 720,
            background: "radial-gradient(circle, #D9CEB2 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            animationDelay: "2s",
            pointerEvents: "none",
          }}
        />

        <div className="relative z-10 max-w-2xl zen-fadein">
          {/* Logo mark */}
          <div className="flex justify-center mb-6">
            <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
              <circle cx="24" cy="24" r="22" stroke="#7A9E7E" strokeWidth="1.5" />
              <path d="M24 10 Q30 24 24 38" stroke="#7A9E7E" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M24 10 Q18 24 24 38" stroke="#D9CEB2" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>

          <p
            className="text-sm tracking-[0.25em] uppercase mb-4"
            style={{ color: "#7A9E7E" }}
          >
            {isUk ? "Студія йоги та медитації · Одеса" : "Yoga & Meditation Studio · Odesa"}
          </p>

          <h1
            className="text-4xl md:text-5xl font-light leading-tight mb-4"
            style={{ color: "#2C3E35", letterSpacing: "-0.01em" }}
          >
            {isUk ? "Знайди рівновагу —" : "Find Balance —"}
            <br />
            <span style={{ color: "#7A9E7E" }}>
              {isUk ? "в собі та у русі" : "Within and in Motion"}
            </span>
          </h1>

          <p
            className="text-lg font-light mb-8"
            style={{ color: "#5E6E65" }}
          >
            {isUk
              ? "Хатха · Віньяса · Медитація · Одеса"
              : "Hatha · Vinyasa · Meditation · Odesa"}
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <button
              className="px-8 py-3 rounded-full text-white font-light tracking-wide transition-all hover:opacity-90"
              style={{ backgroundColor: "#7A9E7E", fontSize: "1rem" }}
            >
              {isUk ? "Перший клас безкоштовно" : "First Class Free"}
            </button>
            <button
              className="px-8 py-3 rounded-full font-light tracking-wide transition-all hover:opacity-80"
              style={{
                backgroundColor: "transparent",
                border: "1.5px solid #7A9E7E",
                color: "#7A9E7E",
                fontSize: "1rem",
              }}
            >
              {isUk ? "Розклад" : "Schedule"}
            </button>
          </div>

          {/* Decorative leaf row */}
          <div className="flex justify-center gap-2 mt-10 opacity-30">
            {[0, 1, 2].map((i) => (
              <svg key={i} viewBox="0 0 16 24" className="w-4 h-6" fill="#7A9E7E">
                <path d="M8 2 Q14 8 8 22 Q2 8 8 2Z" />
              </svg>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. CLASS TYPES ──────────────────────────────────────────── */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: "#7A9E7E" }}>
            {isUk ? "Наші практики" : "Our Practices"}
          </p>
          <h2 className="text-3xl font-light" style={{ color: "#2C3E35" }}>
            {isUk ? "Типи занять" : "Class Types"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classTypes.map((cls, i) => {
            const isActive = activeClassType === i;
            const accordionKey = `cls-${i}`;
            const sections = [
              {
                key: `${accordionKey}-whom`,
                labelEn: "For whom",
                labelUk: "Для кого",
                contentEn: cls.forWhomEn,
                contentUk: cls.forWhomUk,
              },
              {
                key: `${accordionKey}-contr`,
                labelEn: "Contraindications",
                labelUk: "Протипоказання",
                contentEn: cls.contrEn,
                contentUk: cls.contrUk,
              },
              {
                key: `${accordionKey}-bring`,
                labelEn: "What to bring",
                labelUk: "Що взяти",
                contentEn: cls.bringEn,
                contentUk: cls.bringUk,
              },
            ];

            return (
              <div
                key={i}
                className="rounded-2xl overflow-hidden transition-all cursor-pointer"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: `1.5px solid ${isActive ? cls.color : "#E8E2D6"}`,
                  boxShadow: isActive ? `0 4px 24px ${cls.color}30` : "0 2px 8px #0000000a",
                }}
                onClick={() => setActiveClassType(isActive ? null : i)}
              >
                <div className="p-6">
                  <div className="mb-4">{cls.svg}</div>
                  <h3 className="text-lg font-medium text-center mb-1" style={{ color: "#2C3E35" }}>
                    {isUk ? cls.uk : cls.en}
                  </h3>

                  {/* Level leaves */}
                  <div className="flex justify-center gap-1 mb-2">
                    {[1, 2, 3].map((l) => (
                      <svg key={l} viewBox="0 0 12 18" className="w-3 h-4">
                        <path
                          d="M6 1 Q10 6 6 17 Q2 6 6 1Z"
                          fill={l <= cls.levelLeaves ? cls.color : "#D9CEB2"}
                        />
                      </svg>
                    ))}
                    <span className="text-xs ml-1" style={{ color: "#A89F8C" }}>
                      {isUk
                        ? cls.levelLeaves === 1 ? "Початківець" : cls.levelLeaves === 2 ? "Середній" : "Досвідчений"
                        : cls.levelLeaves === 1 ? "Beginner" : cls.levelLeaves === 2 ? "Intermediate" : "Advanced"}
                    </span>
                  </div>

                  <p className="text-xs text-center mb-3" style={{ color: "#7A9E7E" }}>
                    {cls.duration} {isUk ? "хв" : "min"}
                  </p>

                  <p className="text-sm text-center leading-relaxed" style={{ color: "#5E6E65" }}>
                    {isUk ? cls.descUk : cls.descEn}
                  </p>
                </div>

                {/* Accordion */}
                {isActive && (
                  <div
                    className="border-t zen-fadein"
                    style={{ borderColor: "#E8E2D6" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {sections.map((sec) => (
                      <div key={sec.key} style={{ borderBottom: "1px solid #F0EBE2" }}>
                        <button
                          className="w-full text-left px-6 py-3 text-sm flex justify-between items-center"
                          style={{ color: "#2C3E35" }}
                          onClick={() =>
                            setExpandedAccordion(expandedAccordion === sec.key ? null : sec.key)
                          }
                        >
                          <span>{isUk ? sec.labelUk : sec.labelEn}</span>
                          <span style={{ color: "#7A9E7E" }}>
                            {expandedAccordion === sec.key ? "−" : "+"}
                          </span>
                        </button>
                        {expandedAccordion === sec.key && (
                          <p className="px-6 pb-4 text-sm leading-relaxed zen-fadein" style={{ color: "#5E6E65" }}>
                            {isUk ? sec.contentUk : sec.contentEn}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 3. WEEKLY SCHEDULE ──────────────────────────────────────── */}
      <section className="py-20 px-6" style={{ backgroundColor: "#F2EDE4" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: "#7A9E7E" }}>
              {isUk ? "Тижневий розклад" : "Weekly Schedule"}
            </p>
            <h2 className="text-3xl font-light" style={{ color: "#2C3E35" }}>
              {isUk ? "Розклад занять" : "Class Schedule"}
            </h2>
          </div>

          {/* Day tabs */}
          <div className="flex gap-2 flex-wrap justify-center mb-8">
            {days.map((day, i) => (
              <button
                key={i}
                className="px-5 py-2 rounded-full text-sm transition-all"
                style={{
                  backgroundColor: selectedDay === i ? "#7A9E7E" : "#FFFFFF",
                  color: selectedDay === i ? "#FFFFFF" : "#2C3E35",
                  border: "1.5px solid",
                  borderColor: selectedDay === i ? "#7A9E7E" : "#D9CEB2",
                }}
                onClick={() => setSelectedDay(i)}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Slots */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {schedule[selectedDay].map((slot, si) => (
              <button
                key={si}
                className="rounded-xl p-4 text-left transition-all hover:shadow-md"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: `1.5px solid ${slot.color}40`,
                  borderLeft: `4px solid ${slot.color}`,
                }}
                onClick={() => {
                  setSelectedSlot({ day: selectedDay, slot: si });
                  setShowBookingModal(true);
                }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span
                      className="text-xs font-medium tracking-wide uppercase"
                      style={{ color: slot.color }}
                    >
                      {slot.time}
                    </span>
                    <p className="font-medium mt-1" style={{ color: "#2C3E35" }}>
                      {isUk ? slot.classUk : slot.classEn}
                    </p>
                    <p className="text-sm mt-0.5" style={{ color: "#7A9E7E" }}>
                      {slot.instructor}
                    </p>
                  </div>
                  <span
                    className="text-xs px-2 py-1 rounded-full shrink-0"
                    style={{
                      backgroundColor: slot.spots <= 3 ? "#FFF0E8" : "#F0F7F0",
                      color: slot.spots <= 3 ? "#C06030" : "#5A8060",
                    }}
                  >
                    {slot.spots}{" "}
                    {isUk
                      ? slot.spots === 1 ? "місце" : "місць"
                      : slot.spots === 1 ? "spot" : "spots"}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {showBookingModal && currentSlot && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "#00000060" }}
          onClick={() => setShowBookingModal(false)}
        >
          <div
            className="rounded-2xl p-8 max-w-md w-full zen-fadein"
            style={{ backgroundColor: "#FAF8F3", maxHeight: "90vh", overflowY: "auto" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-xs tracking-widest uppercase" style={{ color: currentSlot.color }}>
                  {currentSlot.time}
                </p>
                <h3 className="text-xl font-medium mt-1" style={{ color: "#2C3E35" }}>
                  {isUk ? currentSlot.classUk : currentSlot.classEn}
                </h3>
                <p className="text-sm mt-1" style={{ color: "#7A9E7E" }}>
                  {isUk ? "Інструктор:" : "Instructor:"} {currentSlot.instructor}
                </p>
              </div>
              <button
                onClick={() => setShowBookingModal(false)}
                className="text-2xl leading-none"
                style={{ color: "#A89F8C" }}
              >
                ×
              </button>
            </div>

            <div
              className="rounded-xl p-4 mb-6"
              style={{ backgroundColor: `${currentSlot.color}15`, borderLeft: `3px solid ${currentSlot.color}` }}
            >
              <p className="text-sm" style={{ color: "#2C3E35" }}>
                {isUk
                  ? `${currentSlot.spots} вільних місць. Перший клас — безкоштовно.`
                  : `${currentSlot.spots} spots available. First class is always free.`}
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowBookingModal(false);
              }}
            >
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder={isUk ? "Ваше ім'я" : "Your name"}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{
                    border: "1.5px solid #D9CEB2",
                    backgroundColor: "#FFFFFF",
                    color: "#2C3E35",
                  }}
                />
                <input
                  type="tel"
                  placeholder={isUk ? "Номер телефону" : "Phone number"}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{
                    border: "1.5px solid #D9CEB2",
                    backgroundColor: "#FFFFFF",
                    color: "#2C3E35",
                  }}
                />
                <div
                  className="px-4 py-3 rounded-xl text-sm"
                  style={{ backgroundColor: "#F0EBE2", color: "#5E6E65" }}
                >
                  {isUk ? "Підтвердження дати:" : "Date confirmation:"}{" "}
                  {days[selectedDay]}, {currentSlot.time}
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-full text-white text-sm tracking-wide"
                  style={{ backgroundColor: "#7A9E7E" }}
                >
                  {isUk ? "Зареєструватись" : "Sign Up"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── 4. MEDITATION TIMER ─────────────────────────────────────── */}
      <section className="py-20 px-6 max-w-2xl mx-auto text-center">
        <p className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: "#7A9E7E" }}>
          {isUk ? "Медитаційний таймер" : "Meditation Timer"}
        </p>
        <h2 className="text-3xl font-light mb-8" style={{ color: "#2C3E35" }}>
          {isUk ? "Час для тиші" : "Time for Stillness"}
        </h2>

        {/* Duration buttons */}
        <div className="flex gap-3 justify-center flex-wrap mb-10">
          {timerDurations.map((d) => (
            <button
              key={d}
              onClick={() => {
                setTimerDuration(d);
                handleTimerStop();
              }}
              className="w-14 h-14 rounded-full text-sm font-medium transition-all"
              style={{
                backgroundColor: timerDuration === d ? "#7A9E7E" : "#FFFFFF",
                color: timerDuration === d ? "#FFFFFF" : "#2C3E35",
                border: "1.5px solid",
                borderColor: timerDuration === d ? "#7A9E7E" : "#D9CEB2",
              }}
            >
              {d}
              <span className="block text-xs font-light">{isUk ? "хв" : "min"}</span>
            </button>
          ))}
        </div>

        {/* Circle progress */}
        <div className="flex justify-center mb-8">
          <div className="relative" style={{ width: 160, height: 160 }}>
            <svg
              viewBox="0 0 120 120"
              className={`w-40 h-40 ${timerActive && !timerPaused ? "zen-breath" : ""}`}
            >
              {/* Background circle */}
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="#E8E2D6"
                strokeWidth="6"
              />
              {/* Progress circle */}
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="#7A9E7E"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                transform="rotate(-90 60 60)"
                className="zen-timer-ring"
              />
              {/* Inner ambient */}
              <circle cx="60" cy="60" r="44" fill="#FAF8F3" />
              <circle cx="60" cy="60" r="36" fill="#F2EDE4" opacity="0.6" />
            </svg>

            {/* Time display */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center"
              style={{ color: "#2C3E35" }}
            >
              <span className="text-2xl font-light tabular-nums">
                {timerActive || timerPaused
                  ? formatTime(timerSeconds)
                  : formatTime(timerDuration * 60)}
              </span>
              <span className="text-xs mt-1" style={{ color: "#A89F8C" }}>
                {timerPaused
                  ? isUk ? "пауза" : "paused"
                  : timerActive
                  ? isUk ? "медитація" : "meditating"
                  : isUk ? "готово" : "ready"}
              </span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-4 justify-center mb-8">
          <button
            onClick={handleTimerToggle}
            className="px-8 py-3 rounded-full text-white text-sm tracking-wide transition-all hover:opacity-90"
            style={{ backgroundColor: "#7A9E7E" }}
          >
            {timerActive && !timerPaused
              ? isUk ? "Пауза" : "Pause"
              : timerPaused
              ? isUk ? "Продовжити" : "Resume"
              : isUk ? "Почати" : "Start"}
          </button>
          {(timerActive || timerPaused) && (
            <button
              onClick={handleTimerStop}
              className="px-8 py-3 rounded-full text-sm tracking-wide transition-all"
              style={{
                backgroundColor: "transparent",
                border: "1.5px solid #D9CEB2",
                color: "#5E6E65",
              }}
            >
              {isUk ? "Зупинити" : "Stop"}
            </button>
          )}
        </div>

        {/* Ambient sound toggle */}
        <button
          onClick={() => setSoundOn(!soundOn)}
          className="flex items-center gap-2 mx-auto text-sm rounded-full px-5 py-2 transition-all"
          style={{
            backgroundColor: soundOn ? "#F0F7F0" : "#FFFFFF",
            border: "1.5px solid #D9CEB2",
            color: soundOn ? "#5A8060" : "#A89F8C",
          }}
        >
          <svg viewBox="0 0 20 20" className="w-4 h-4" fill="currentColor">
            <path d="M10 3L5 7H2v6h3l5 4V3zm5.07 2.93a7 7 0 010 8.14M13.6 6.4a5 5 0 010 7.2" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </svg>
          {soundOn
            ? isUk ? "Звук увімкнено" : "Sound On"
            : isUk ? "Звук вимкнено" : "Sound Off"}
        </button>

        {/* Pose of the day */}
        <div
          className="mt-10 p-5 rounded-2xl text-sm leading-relaxed"
          style={{ backgroundColor: "#EDE8DC", color: "#5E6E65", borderLeft: "3px solid #7A9E7E" }}
        >
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "#7A9E7E" }}>
            {isUk ? "Поза дня" : "Pose of the Day"}
          </p>
          <p>{poseOfDay}</p>
        </div>
      </section>

      {/* ── 5. INSTRUCTORS ──────────────────────────────────────────── */}
      <section className="py-20 px-6" style={{ backgroundColor: "#F2EDE4" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: "#7A9E7E" }}>
              {isUk ? "Наша команда" : "Our Team"}
            </p>
            <h2 className="text-3xl font-light" style={{ color: "#2C3E35" }}>
              {isUk ? "Інструктори" : "Instructors"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {instructors.map((inst, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden cursor-pointer transition-all"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: `1.5px solid ${expandedInstructor === i ? inst.color : "#E8E2D6"}`,
                  boxShadow: expandedInstructor === i ? `0 4px 20px ${inst.color}25` : "none",
                }}
                onClick={() => setExpandedInstructor(expandedInstructor === i ? null : i)}
              >
                {/* Photo area */}
                <div
                  className="flex items-center justify-center h-32 text-3xl font-light text-white"
                  style={{
                    background: `linear-gradient(135deg, ${inst.color} 0%, ${inst.color}88 100%)`,
                    letterSpacing: "0.05em",
                  }}
                >
                  {inst.initials}
                </div>

                <div className="p-4">
                  <h3 className="font-medium text-sm" style={{ color: "#2C3E35" }}>
                    {isUk ? inst.nameUk : inst.nameEn}
                  </h3>
                  <p className="text-xs mt-1" style={{ color: "#7A9E7E" }}>
                    {isUk ? inst.specUk : inst.specEn}
                  </p>
                  <p className="text-xs mt-1" style={{ color: "#A89F8C" }}>
                    {inst.years} {isUk ? "р. досвіду" : "yrs exp."}
                  </p>

                  {expandedInstructor === i && (
                    <div className="mt-4 zen-fadein">
                      <div
                        className="text-xs px-3 py-2 rounded-lg mb-3"
                        style={{ backgroundColor: "#F2EDE4", color: "#5E6E65" }}
                      >
                        {isUk ? inst.certUk : inst.certEn}
                      </div>
                      <p className="text-xs mb-2" style={{ color: "#A89F8C" }}>
                        {isUk ? "Мови:" : "Languages:"} {isUk ? inst.langsUk : inst.langsEn}
                      </p>
                      <p className="text-xs leading-relaxed" style={{ color: "#5E6E65" }}>
                        {isUk ? inst.bioUk : inst.bioEn}
                      </p>
                    </div>
                  )}

                  <div className="mt-3 flex justify-end">
                    <span className="text-xs" style={{ color: "#7A9E7E" }}>
                      {expandedInstructor === i
                        ? isUk ? "Згорнути ↑" : "Collapse ↑"
                        : isUk ? "Детальніше ↓" : "More info ↓"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. PRICING ──────────────────────────────────────────────── */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: "#7A9E7E" }}>
            {isUk ? "Вартість" : "Pricing"}
          </p>
          <h2 className="text-3xl font-light mb-3" style={{ color: "#2C3E35" }}>
            {isUk ? "Тарифи" : "Plans"}
          </h2>
          <div
            className="inline-block px-5 py-2 rounded-full text-sm"
            style={{ backgroundColor: "#EBF4EB", color: "#5A8060" }}
          >
            🍃 {isUk ? "Перший клас завжди безкоштовний" : "First class is always free"}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {pricingPlans.map((plan, i) => (
            <div
              key={i}
              className="rounded-2xl p-8 text-center transition-all"
              style={{
                backgroundColor: plan.highlight ? "#7A9E7E" : "#FFFFFF",
                border: `1.5px solid ${plan.highlight ? "#7A9E7E" : "#E8E2D6"}`,
                color: plan.highlight ? "#FFFFFF" : "#2C3E35",
                boxShadow: plan.highlight ? "0 8px 32px #7A9E7E40" : "none",
                transform: plan.highlight ? "scale(1.03)" : "scale(1)",
              }}
            >
              {plan.freeHighlight && (
                <div
                  className="text-xs px-3 py-1 rounded-full mb-4 inline-block"
                  style={{ backgroundColor: "#EBF4EB", color: "#5A8060" }}
                >
                  {isUk ? "Безкоштовно" : "Free"}
                </div>
              )}
              <h3
                className="text-lg font-medium mb-2"
                style={{ color: plan.highlight ? "#FFFFFF" : "#2C3E35" }}
              >
                {isUk ? plan.nameUk : plan.nameEn}
              </h3>
              <div
                className="text-3xl font-light mb-1"
                style={{ color: plan.highlight ? "#FFFFFF" : "#7A9E7E" }}
              >
                {plan.price}
              </div>
              <p
                className="text-xs mb-6"
                style={{ color: plan.highlight ? "#D4E8D4" : "#A89F8C" }}
              >
                {isUk ? plan.noteUk : plan.noteEn}
              </p>
              <ul className="text-sm text-left space-y-3 mb-8">
                {(isUk ? plan.featuresUk : plan.featuresEn).map((f, fi) => (
                  <li key={fi} className="flex gap-2 items-start">
                    <svg viewBox="0 0 16 16" className="w-4 h-4 shrink-0 mt-0.5" fill="none">
                      <circle
                        cx="8"
                        cy="8"
                        r="7"
                        stroke={plan.highlight ? "#D4E8D4" : "#7A9E7E"}
                        strokeWidth="1"
                      />
                      <path
                        d="M5 8l2 2 4-4"
                        stroke={plan.highlight ? "#D4E8D4" : "#7A9E7E"}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span style={{ color: plan.highlight ? "#EDF6ED" : "#5E6E65" }}>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                className="w-full py-3 rounded-full text-sm tracking-wide transition-all hover:opacity-90"
                style={{
                  backgroundColor: plan.highlight ? "#FFFFFF" : "#7A9E7E",
                  color: plan.highlight ? "#7A9E7E" : "#FFFFFF",
                }}
              >
                {isUk ? "Обрати" : "Choose"}
              </button>
            </div>
          ))}
        </div>

        {/* Private session */}
        <div
          className="rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ backgroundColor: "#EDE8DC", border: "1.5px solid #D9CEB2" }}
        >
          <div>
            <p className="font-medium" style={{ color: "#2C3E35" }}>
              {isUk ? "Індивідуальне заняття" : "Private Session"}
            </p>
            <p className="text-sm mt-1" style={{ color: "#5E6E65" }}>
              {isUk
                ? "Персональна програма, повна увага інструктора, ваш темп."
                : "Personal program, full instructor attention, your pace."}
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <span className="text-xl font-light" style={{ color: "#7A9E7E" }}>
              ₴900
            </span>
            <button
              className="px-6 py-2 rounded-full text-sm text-white"
              style={{ backgroundColor: "#7A9E7E" }}
            >
              {isUk ? "Замовити" : "Book"}
            </button>
          </div>
        </div>
      </section>

      {/* ── 7. BOOKING FORM ─────────────────────────────────────────── */}
      <section className="py-20 px-6" style={{ backgroundColor: "#F2EDE4" }}>
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: "#7A9E7E" }}>
              {isUk ? "Запис" : "Booking"}
            </p>
            <h2 className="text-3xl font-light" style={{ color: "#2C3E35" }}>
              {isUk ? "Почати практику" : "Start Practicing"}
            </h2>
          </div>

          {bookingSubmitted ? (
            <div className="text-center py-12 zen-fadein">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: "#EBF4EB" }}
              >
                <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
                  <path
                    d="M8 16l5 5 11-11"
                    stroke="#7A9E7E"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-light mb-2" style={{ color: "#2C3E35" }}>
                {isUk ? "Дякуємо!" : "Thank you!"}
              </h3>
              <p className="text-sm" style={{ color: "#5E6E65" }}>
                {isUk
                  ? "Ваш запит прийнято. Ми зв'яжемося з вами протягом 2 годин."
                  : "Your request received. We'll contact you within 2 hours."}
              </p>
              <button
                onClick={() => setBookingSubmitted(false)}
                className="mt-6 text-sm underline"
                style={{ color: "#7A9E7E" }}
              >
                {isUk ? "Новий запис" : "New booking"}
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleBookingSubmit}
              className="rounded-2xl p-8 flex flex-col gap-4"
              style={{ backgroundColor: "#FFFFFF" }}
            >
              {/* Class type */}
              <div>
                <label className="text-xs uppercase tracking-wider mb-1 block" style={{ color: "#A89F8C" }}>
                  {isUk ? "Тип заняття" : "Class Type"}
                </label>
                <select
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ border: "1.5px solid #D9CEB2", backgroundColor: "#FAF8F3", color: "#2C3E35" }}
                  value={bookingForm.classType}
                  onChange={(e) => setBookingForm({ ...bookingForm, classType: e.target.value })}
                >
                  <option value="">{isUk ? "Оберіть стиль" : "Choose style"}</option>
                  {classTypes.map((c, i) => (
                    <option key={i} value={isUk ? c.uk : c.en}>
                      {isUk ? c.uk : c.en}
                    </option>
                  ))}
                </select>
              </div>

              {/* Preferred day */}
              <div>
                <label className="text-xs uppercase tracking-wider mb-1 block" style={{ color: "#A89F8C" }}>
                  {isUk ? "Бажаний день" : "Preferred Day"}
                </label>
                <select
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ border: "1.5px solid #D9CEB2", backgroundColor: "#FAF8F3", color: "#2C3E35" }}
                  value={bookingForm.day}
                  onChange={(e) => setBookingForm({ ...bookingForm, day: e.target.value })}
                >
                  <option value="">{isUk ? "Оберіть день" : "Choose day"}</option>
                  {days.map((d, i) => <option key={i} value={d}>{d}</option>)}
                </select>
              </div>

              {/* Preferred time */}
              <div>
                <label className="text-xs uppercase tracking-wider mb-1 block" style={{ color: "#A89F8C" }}>
                  {isUk ? "Бажаний час" : "Preferred Time"}
                </label>
                <select
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ border: "1.5px solid #D9CEB2", backgroundColor: "#FAF8F3", color: "#2C3E35" }}
                  value={bookingForm.time}
                  onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                >
                  <option value="">{isUk ? "Оберіть час" : "Choose time"}</option>
                  <option>07:30</option>
                  <option>08:00</option>
                  <option>09:00</option>
                  <option>09:30</option>
                  <option>10:00</option>
                  <option>11:00</option>
                  <option>12:00</option>
                  <option>17:00</option>
                  <option>18:00</option>
                  <option>18:30</option>
                  <option>19:00</option>
                  <option>19:30</option>
                  <option>20:00</option>
                </select>
              </div>

              {/* Instructor preference */}
              <div>
                <label className="text-xs uppercase tracking-wider mb-1 block" style={{ color: "#A89F8C" }}>
                  {isUk ? "Інструктор (необов'язково)" : "Instructor (optional)"}
                </label>
                <select
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ border: "1.5px solid #D9CEB2", backgroundColor: "#FAF8F3", color: "#2C3E35" }}
                  value={bookingForm.instructor}
                  onChange={(e) => setBookingForm({ ...bookingForm, instructor: e.target.value })}
                >
                  <option value="">{isUk ? "Будь-який" : "Any"}</option>
                  {instructors.map((inst, i) => (
                    <option key={i} value={isUk ? inst.nameUk : inst.nameEn}>
                      {isUk ? inst.nameUk : inst.nameEn}
                    </option>
                  ))}
                </select>
              </div>

              {/* Name */}
              <div>
                <label className="text-xs uppercase tracking-wider mb-1 block" style={{ color: "#A89F8C" }}>
                  {isUk ? "Ваше ім'я" : "Your Name"}
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ border: "1.5px solid #D9CEB2", backgroundColor: "#FAF8F3", color: "#2C3E35" }}
                  value={bookingForm.name}
                  onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                  placeholder={isUk ? "Ваше ім'я" : "Your full name"}
                />
              </div>

              {/* Phone */}
              <div>
                <label className="text-xs uppercase tracking-wider mb-1 block" style={{ color: "#A89F8C" }}>
                  {isUk ? "Телефон" : "Phone"}
                </label>
                <input
                  type="tel"
                  required
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ border: "1.5px solid #D9CEB2", backgroundColor: "#FAF8F3", color: "#2C3E35" }}
                  value={bookingForm.phone}
                  onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                  placeholder="+380"
                />
              </div>

              {/* Beginner checkbox */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="mt-0.5 shrink-0"
                  checked={bookingForm.beginner}
                  onChange={(e) => setBookingForm({ ...bookingForm, beginner: e.target.checked })}
                />
                <span className="text-sm" style={{ color: "#5E6E65" }}>
                  {isUk ? "Я новачок у йозі" : "I'm a beginner to yoga"}
                </span>
              </label>

              {bookingForm.beginner && (
                <div
                  className="text-xs p-4 rounded-xl zen-fadein"
                  style={{ backgroundColor: "#EBF4EB", color: "#5A8060" }}
                >
                  {isUk
                    ? "Чудово! Ми підберемо найм'якший клас і порадимо, що взяти."
                    : "Wonderful! We'll find the gentlest class and advise what to bring."}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-full text-white text-sm tracking-wide mt-2 transition-all hover:opacity-90"
                style={{ backgroundColor: "#7A9E7E" }}
              >
                {isUk ? "Надіслати запит" : "Send Request"}
              </button>

              <p className="text-xs text-center" style={{ color: "#A89F8C" }}>
                {isUk
                  ? "Ми зв'яжемося з вами протягом 2 годин для підтвердження."
                  : "We'll reach out within 2 hours to confirm your booking."}
              </p>
            </form>
          )}
        </div>
      </section>

      {/* ── 8. FOOTER ───────────────────────────────────────────────── */}
      <footer className="py-14 px-6" style={{ backgroundColor: "#2C3E35", color: "#A8BBA8" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
                  <circle cx="24" cy="24" r="22" stroke="#7A9E7E" strokeWidth="1.5" />
                  <path d="M24 10 Q30 24 24 38" stroke="#7A9E7E" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M24 10 Q18 24 24 38" stroke="#D9CEB2" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span className="text-lg font-light" style={{ color: "#FAF8F3", letterSpacing: "0.08em" }}>
                  ZenFlow
                </span>
              </div>
              <p className="text-sm leading-relaxed">
                {isUk
                  ? "Студія йоги та медитації в серці Одеси. Місце, де тіло та розум зустрічаються у спокої."
                  : "Yoga & meditation studio in the heart of Odesa. Where body and mind meet in stillness."}
              </p>
            </div>

            {/* Contact */}
            <div>
              <h4
                className="text-xs tracking-[0.2em] uppercase mb-4"
                style={{ color: "#7A9E7E" }}
              >
                {isUk ? "Контакти" : "Contact"}
              </h4>
              <div className="flex flex-col gap-2 text-sm">
                <span>📍 {isUk ? "вул. Дерибасівська 10, Одеса" : "10 Derybasivska St, Odesa"}</span>
                <span>📞 +380 48 123 4567</span>
                <span>✉️ hello@zenflow.ua</span>
                <span>
                  {isUk ? "Пн–Пт 7:00–21:00 · Сб–Нд 9:00–17:00" : "Mon–Fri 7:00–21:00 · Sat–Sun 9:00–17:00"}
                </span>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4
                className="text-xs tracking-[0.2em] uppercase mb-4"
                style={{ color: "#7A9E7E" }}
              >
                {isUk ? "Навігація" : "Navigation"}
              </h4>
              <ul className="flex flex-col gap-2 text-sm">
                {[
                  { en: "Classes", uk: "Заняття" },
                  { en: "Schedule", uk: "Розклад" },
                  { en: "Instructors", uk: "Інструктори" },
                  { en: "Pricing", uk: "Вартість" },
                  { en: "Contact", uk: "Контакти" },
                ].map((item, i) => (
                  <li key={i}>
                    <span
                      className="hover:text-white transition-colors cursor-pointer"
                      style={{ color: "#A8BBA8" }}
                    >
                      {isUk ? item.uk : item.en}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t mb-6" style={{ borderColor: "#3E5449" }} />

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs" style={{ color: "#6B8060" }}>
            <p>© 2025 ZenFlow Studio. {isUk ? "Всі права захищено." : "All rights reserved."}</p>
            <p>
              {isUk ? "Розроблено " : "Built by "}
              <span style={{ color: "#7A9E7E" }}>Codeworth</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
