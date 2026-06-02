"use client";

import { useState } from "react";
import {
  Baby,
  BookOpen,
  Music,
  Palette,
  Clock,
  Star,
  Phone,
  Users,
  Calendar,
  ArrowRight,
  Check,
  MapPin,
  MessageCircle,
  GraduationCap,
  Heart,
  Sparkles,
} from "lucide-react";

export function SmartKidsDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [bookingStep, setBookingStep] = useState(1);
  const [selectedAge, setSelectedAge] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [contactData, setContactData] = useState({ name: "", phone: "", email: "" });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [activeDay, setActiveDay] = useState(0);

  const programs = [
    { id: "baby", emoji: "👶", icon: Baby, nameEn: "Baby Club", nameUk: "Бебі Клуб", ageEn: "1–2 years", ageUk: "1–2 роки", color: "#F59E0B", bg: "#FEF3C7", descEn: "Sensory play, motor skills, first socialization with parents present", descUk: "Сенсорні ігри, моторика, перша соціалізація разом з батьками" },
    { id: "toddler", emoji: "🧸", icon: Heart, nameEn: "Toddlers", nameUk: "Тоддлери", ageEn: "2–3 years", ageUk: "2–3 роки", color: "#F97316", bg: "#FFEDD5", descEn: "Speech development, creative play, learning independence", descUk: "Розвиток мовлення, творчі ігри, навчання самостійності" },
    { id: "preschool", emoji: "📚", icon: BookOpen, nameEn: "Preschool", nameUk: "Дошкільнята", ageEn: "3–5 years", ageUk: "3–5 років", color: "#8B5CF6", bg: "#EDE9FE", descEn: "Reading readiness, math basics, science experiments", descUk: "Підготовка до читання, основи математики, наукові експерименти" },
    { id: "art", emoji: "🎨", icon: Palette, nameEn: "Art Studio", nameUk: "Арт Студія", ageEn: "3–7 years", ageUk: "3–7 років", color: "#EC4899", bg: "#FCE7F3", descEn: "Drawing, sculpting, collage, creative expression", descUk: "Малювання, ліплення, колаж, творче самовираження" },
    { id: "music", emoji: "🎵", icon: Music, nameEn: "Music & Movement", nameUk: "Музика і Рух", ageEn: "2–6 years", ageUk: "2–6 років", color: "#06B6D4", bg: "#CFFAFE", descEn: "Rhythm, singing, dance, musical instruments for kids", descUk: "Ритміка, спів, танці, музичні інструменти для малюків" },
    { id: "speech", emoji: "💬", icon: MessageCircle, nameEn: "Speech Therapy", nameUk: "Логопед", ageEn: "2–7 years", ageUk: "2–7 років", color: "#10B981", bg: "#D1FAE5", descEn: "Individual & group sessions, articulation, speech development", descUk: "Індивідуальні та групові заняття, артикуляція, розвиток мовлення" },
  ];

  const days = [
    isUk ? "Пн" : "Mon", isUk ? "Вт" : "Tue", isUk ? "Ср" : "Wed",
    isUk ? "Чт" : "Thu", isUk ? "Пт" : "Fri", isUk ? "Сб" : "Sat",
  ];

  const schedule: { time: string; programId: string }[][] = [
    [{ time: "09:00", programId: "baby" }, { time: "10:30", programId: "toddler" }, { time: "15:00", programId: "preschool" }, { time: "16:30", programId: "art" }],
    [{ time: "09:30", programId: "music" }, { time: "11:00", programId: "speech" }, { time: "15:00", programId: "toddler" }, { time: "16:30", programId: "preschool" }],
    [{ time: "09:00", programId: "baby" }, { time: "10:30", programId: "art" }, { time: "15:00", programId: "music" }, { time: "16:30", programId: "speech" }],
    [{ time: "09:30", programId: "toddler" }, { time: "11:00", programId: "preschool" }, { time: "15:00", programId: "baby" }, { time: "16:30", programId: "art" }],
    [{ time: "09:00", programId: "music" }, { time: "10:30", programId: "speech" }, { time: "15:00", programId: "preschool" }, { time: "16:30", programId: "toddler" }],
    [{ time: "10:00", programId: "baby" }, { time: "11:30", programId: "art" }, { time: "13:00", programId: "music" }],
  ];

  const plans = [
    { nameEn: "Explorer", nameUk: "Відкриття", price: 2400, sessionsEn: "8 sessions / month", sessionsUk: "8 занять / місяць", featuresEn: ["2 sessions per week", "One program of choice", "Learning materials included"], featuresUk: ["2 заняття на тиждень", "Одна програма на вибір", "Навчальні матеріали включено"], popular: false },
    { nameEn: "Adventurer", nameUk: "Дослідник", price: 3800, sessionsEn: "12 sessions / month", sessionsUk: "12 занять / місяць", featuresEn: ["3 sessions per week", "Two programs of choice", "Learning materials included", "Monthly progress report"], featuresUk: ["3 заняття на тиждень", "Дві програми на вибір", "Навчальні матеріали включено", "Щомісячний звіт прогресу"], popular: true },
    { nameEn: "Champion", nameUk: "Чемпіон", price: 5200, sessionsEn: "20 sessions / month", sessionsUk: "20 занять / місяць", featuresEn: ["5 sessions per week", "All programs included", "Learning materials included", "Weekly progress report", "Individual speech therapy session"], featuresUk: ["5 занять на тиждень", "Усі програми включено", "Навчальні матеріали включено", "Щотижневий звіт прогресу", "Індивідуальне заняття з логопедом"], popular: false },
  ];

  const teachers = [
    { nameEn: "Oksana Melnyk", nameUk: "Оксана Мельник", roleEn: "Head Teacher & Founder", roleUk: "Головний педагог та засновниця", specEn: "Montessori certified, 12 years experience", specUk: "Сертифікований Монтессорі-педагог, 12 років досвіду", emoji: "👩‍🏫" },
    { nameEn: "Iryna Bondarenko", nameUk: "Ірина Бондаренко", roleEn: "Speech Therapist", roleUk: "Логопед", specEn: "PhD in Speech Pathology, sensory integration", specUk: "Кандидат наук з логопедії, сенсорна інтеграція", emoji: "👩‍⚕️" },
    { nameEn: "Dmytro Shevchenko", nameUk: "Дмитро Шевченко", roleEn: "Music & Movement Teacher", roleUk: "Викладач музики та ритміки", specEn: "Conservatory graduate, Orff method specialist", specUk: "Випускник консерваторії, спеціаліст методу Орфа", emoji: "🎶" },
    { nameEn: "Mariia Kovalchuk", nameUk: "Марія Ковальчук", roleEn: "Art Studio Teacher", roleUk: "Викладач арт-студії", specEn: "Fine arts degree, child art therapy certified", specUk: "Диплом з образотворчого мистецтва, сертифікована арт-терапія", emoji: "🎨" },
  ];

  const reviews = [
    { parentEn: "Anna T.", parentUk: "Анна Т.", childEn: "Son, 3 years", childUk: "Син, 3 роки", textEn: "We started in Baby Club at 1.5 years and stayed. My son now reads at 3! The teachers are incredible and truly love children.", textUk: "Почали ходити в Бебі Клуб з 1,5 років і залишились. Син вже читає в 3! Педагоги неймовірні і справді люблять дітей." },
    { parentEn: "Viktor K.", parentUk: "Віктор К.", childEn: "Daughter, 5 years", childUk: "Донька, 5 років", textEn: "The Art Studio is magic. My daughter creates such artwork I frame it and hang on the wall. Great environment and methodology.", textUk: "Арт Студія — це магія. Донька створює такі роботи, що я вставляю їх в рамки і вішаю на стіну. Чудова атмосфера і методика." },
    { parentEn: "Nataliia S.", parentUk: "Наталія С.", childEn: "Twins, 2 years", childUk: "Двійнята, 2 роки", textEn: "Having twins makes everything harder, but SmartKids handles it perfectly. Both kids love going there. The speech therapist works wonders.", textUk: "З двійнятами все складніше, але SmartKids справляється ідеально. Обидвоє малюків обожнюють ходити. Логопед творить дива." },
    { parentEn: "Oleh M.", parentUk: "Олег М.", childEn: "Son, 6 years", childUk: "Син, 6 років", textEn: "Best preparation for school ever. My son is confident, social, and already knows basic math. Worth every hryvnia!", textUk: "Найкраща підготовка до школи. Син впевнений, соціальний, вже знає основи математики. Варті кожної гривні!" },
  ];

  const trialDates = [
    { dateEn: "Monday, April 6", dateUk: "Понеділок, 6 квітня", time: "10:00" },
    { dateEn: "Wednesday, April 8", dateUk: "Середа, 8 квітня", time: "10:00" },
    { dateEn: "Friday, April 10", dateUk: "П'ятниця, 10 квітня", time: "15:00" },
    { dateEn: "Saturday, April 11", dateUk: "Субота, 11 квітня", time: "11:00" },
  ];

  const programById = (id: string) => programs.find((p) => p.id === id);

  const handleBookingSubmit = () => {
    setBookingSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-amber-50" style={{ fontFamily: "system-ui, sans-serif" }}>
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 h-[60px]" style={{ background: "#F59E0B" }}>
        <div className="text-white font-black text-xl flex items-center gap-2">
          <Sparkles className="w-5 h-5" /> SmartKids
        </div>
        <div className="flex items-center gap-4">
          {[
            isUk ? "Програми" : "Programs",
            isUk ? "Розклад" : "Schedule",
            isUk ? "Ціни" : "Pricing",
          ].map((item) => (
            <span key={item} className="text-white text-sm font-semibold cursor-pointer hover:opacity-80">
              {item}
            </span>
          ))}
          <button className="bg-white text-amber-600 border-none rounded-full px-4 py-1.5 font-bold text-sm cursor-pointer hover:bg-amber-50">
            {isUk ? "Пробне заняття" : "Trial Lesson"}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div
        className="text-center relative overflow-hidden py-16 px-6"
        style={{ background: "linear-gradient(135deg, #F59E0B, #F97316, #8B5CF6)" }}
      >
        <div className="absolute top-4 left-[8%] text-5xl opacity-25">🌟</div>
        <div className="absolute top-8 right-[12%] text-4xl opacity-25">🧒</div>
        <div className="absolute bottom-4 left-[18%] text-4xl opacity-25">🎈</div>
        <div className="absolute bottom-8 right-[8%] text-5xl opacity-25">🌈</div>
        <div className="text-6xl mb-3">👶🧒👧</div>
        <h1 className="text-white text-4xl font-black m-0 mb-3">
          {isUk ? "SmartKids — Центр Раннього Розвитку" : "SmartKids — Early Development Center"}
        </h1>
        <p className="text-white/90 text-lg mb-2">
          {isUk
            ? "Де маленькі стають великими! Розвиток дітей від 1 до 7 років у Львові"
            : "Where little ones grow big! Development for children ages 1–7 in Lviv"}
        </p>
        <div className="flex items-center justify-center gap-2 text-white/80 text-sm mb-6">
          <MapPin className="w-4 h-4" />
          {isUk ? "вул. Франка 28, Львів" : "28 Franka St, Lviv"}
        </div>
        <div className="flex gap-3 justify-center flex-wrap">
          <button className="bg-white text-amber-600 border-none rounded-full px-7 py-3.5 font-extrabold text-base cursor-pointer hover:bg-amber-50 flex items-center gap-2">
            <Baby className="w-5 h-5" />
            {isUk ? "Записати на пробне!" : "Book a Trial Lesson!"}
          </button>
          <button className="bg-white/20 text-white border-2 border-white rounded-full px-7 py-3.5 font-bold text-base cursor-pointer hover:bg-white/30">
            {isUk ? "Наші програми" : "Our Programs"}
          </button>
        </div>
        <div className="mt-6 flex justify-center gap-8 flex-wrap">
          {[
            { icon: Star, label: isUk ? "4.9 рейтинг" : "4.9 rating" },
            { icon: Users, label: isUk ? "350+ випускників" : "350+ graduates" },
            { icon: GraduationCap, label: isUk ? "6 програм" : "6 programs" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-2 text-white/90 text-sm font-semibold">
              <s.icon className="w-4 h-4" /> {s.label}
            </div>
          ))}
        </div>
      </div>

      {/* Programs */}
      <div className="max-w-[1100px] mx-auto px-6 py-12">
        <h2 className="text-3xl font-extrabold text-center mb-2 text-gray-900">
          {isUk ? "Наші програми" : "Our Programs"}
        </h2>
        <p className="text-center text-gray-500 mb-8">
          {isUk
            ? "6 напрямків для гармонійного розвитку вашої дитини"
            : "6 directions for your child's harmonious development"}
        </p>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-5">
          {programs.map((prog) => (
            <div
              key={prog.id}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              style={{ borderTop: `4px solid ${prog.color}` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{ background: prog.bg }}
                >
                  {prog.emoji}
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-gray-900 m-0">
                    {isUk ? prog.nameUk : prog.nameEn}
                  </h3>
                  <span className="text-xs font-semibold" style={{ color: prog.color }}>
                    {isUk ? prog.ageUk : prog.ageEn}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed m-0">
                {isUk ? prog.descUk : prog.descEn}
              </p>
              <div className="mt-4 flex items-center gap-1 text-sm font-bold cursor-pointer" style={{ color: prog.color }}>
                {isUk ? "Детальніше" : "Learn more"} <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Schedule */}
      <div className="bg-white py-12 px-6">
        <div className="max-w-[1000px] mx-auto">
          <h2 className="text-2xl font-extrabold text-center mb-2 text-gray-900 flex items-center justify-center gap-2">
            <Calendar className="w-6 h-6 text-amber-500" />
            {isUk ? "Розклад занять" : "Weekly Schedule"}
          </h2>
          <p className="text-center text-gray-500 mb-6">
            {isUk ? "Оберіть зручний день" : "Choose a convenient day"}
          </p>
          <div className="flex gap-2 justify-center mb-6 flex-wrap">
            {days.map((d, i) => (
              <button
                key={i}
                onClick={() => setActiveDay(i)}
                className="px-4 py-2 rounded-xl border-none font-bold cursor-pointer text-sm transition-colors"
                style={{
                  background: activeDay === i ? "#F59E0B" : "#F5F5F4",
                  color: activeDay === i ? "#fff" : "#555",
                }}
              >
                {d}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            {schedule[activeDay].map((slot, i) => {
              const prog = programById(slot.programId);
              if (!prog) return null;
              return (
                <div
                  key={i}
                  className="flex items-center gap-4 px-4 py-3 rounded-2xl"
                  style={{ background: prog.bg, borderLeft: `4px solid ${prog.color}` }}
                >
                  <div className="font-extrabold text-base min-w-[50px]">
                    <Clock className="w-4 h-4 inline mr-1 opacity-60" />
                    {slot.time}
                  </div>
                  <div className="text-2xl">{prog.emoji}</div>
                  <div className="flex-1">
                    <div className="font-bold text-gray-900">{isUk ? prog.nameUk : prog.nameEn}</div>
                    <div className="text-xs text-gray-500">{isUk ? prog.ageUk : prog.ageEn}</div>
                  </div>
                  <button
                    className="border-none rounded-xl px-3.5 py-1.5 font-bold cursor-pointer text-sm text-white"
                    style={{ background: prog.color }}
                  >
                    {isUk ? "Записатись" : "Sign Up"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="max-w-[1000px] mx-auto px-6 py-12">
        <h2 className="text-2xl font-extrabold text-center mb-2 text-gray-900">
          {isUk ? "Абонементи" : "Pricing Plans"}
        </h2>
        <p className="text-center text-gray-500 mb-8">
          {isUk ? "Обирайте зручний формат відвідування" : "Choose a convenient attendance format"}
        </p>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
          {plans.map((plan, i) => (
            <div
              key={i}
              className="rounded-2xl p-7 relative"
              style={{
                background: plan.popular
                  ? "linear-gradient(135deg, #F59E0B, #F97316)"
                  : "#fff",
                color: plan.popular ? "#fff" : "#1a1a1a",
                boxShadow: plan.popular
                  ? "0 8px 30px rgba(245,158,11,0.3)"
                  : "0 2px 12px rgba(0,0,0,0.07)",
                border: plan.popular ? "none" : "2px solid #f5f5f4",
              }}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                  {isUk ? "Популярний" : "Popular"}
                </div>
              )}
              <h3 className="font-extrabold text-xl mb-1">{isUk ? plan.nameUk : plan.nameEn}</h3>
              <div className="text-sm opacity-80 mb-4">{isUk ? plan.sessionsUk : plan.sessionsEn}</div>
              <div className="text-4xl font-black mb-4">
                ₴{plan.price.toLocaleString()}
                <span className="text-base font-semibold opacity-70">/{isUk ? "міс" : "mo"}</span>
              </div>
              <ul className="list-none p-0 m-0 mb-6 flex flex-col gap-2">
                {(isUk ? plan.featuresUk : plan.featuresEn).map((f, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm">
                    <Check
                      className="w-4 h-4 mt-0.5 shrink-0"
                      style={{ color: plan.popular ? "#fff" : "#10B981" }}
                    />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                className="w-full py-3 border-none rounded-xl font-extrabold cursor-pointer text-base"
                style={{
                  background: plan.popular ? "#fff" : "#F59E0B",
                  color: plan.popular ? "#F59E0B" : "#fff",
                }}
              >
                {isUk ? "Обрати" : "Choose"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Teachers */}
      <div className="bg-white py-12 px-6">
        <div className="max-w-[1000px] mx-auto">
          <h2 className="text-2xl font-extrabold text-center mb-2 text-gray-900 flex items-center justify-center gap-2">
            <Users className="w-6 h-6 text-purple-500" />
            {isUk ? "Наші педагоги" : "Our Teachers"}
          </h2>
          <p className="text-center text-gray-500 mb-8">
            {isUk
              ? "Досвідчені спеціалісти, які люблять свою справу"
              : "Experienced specialists who love what they do"}
          </p>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-5">
            {teachers.map((t, i) => (
              <div key={i} className="bg-amber-50 rounded-2xl p-6 text-center">
                <div className="text-5xl mb-3">{t.emoji}</div>
                <h3 className="font-extrabold text-base text-gray-900 mb-1">
                  {isUk ? t.nameUk : t.nameEn}
                </h3>
                <div className="text-amber-600 font-bold text-sm mb-2">
                  {isUk ? t.roleUk : t.roleEn}
                </div>
                <p className="text-gray-500 text-xs leading-relaxed m-0">
                  {isUk ? t.specUk : t.specEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="max-w-[1000px] mx-auto px-6 py-12">
        <h2 className="text-2xl font-extrabold text-center mb-2 text-gray-900 flex items-center justify-center gap-2">
          <MessageCircle className="w-6 h-6 text-amber-500" />
          {isUk ? "Відгуки батьків" : "Parent Reviews"}
        </h2>
        <p className="text-center text-gray-500 mb-8">
          {isUk ? "Що кажуть про нас" : "What parents say about us"}
        </p>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-5">
          {reviews.map((r, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex gap-0.5 text-amber-400 mb-3">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed m-0 mb-4">
                &ldquo;{isUk ? r.textUk : r.textEn}&rdquo;
              </p>
              <div className="font-bold text-gray-900 text-sm">{isUk ? r.parentUk : r.parentEn}</div>
              <div className="text-xs text-gray-400">{isUk ? r.childUk : r.childEn}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Trial Lesson Booking (Multi-step) */}
      <div className="py-14 px-6" style={{ background: "linear-gradient(135deg, #F59E0B, #8B5CF6)" }}>
        <div className="max-w-[560px] mx-auto bg-white rounded-3xl p-10">
          <h2 className="text-2xl font-extrabold text-center mb-1 text-gray-900">
            🎁 {isUk ? "Записати на пробне заняття" : "Book a Trial Lesson"}
          </h2>
          <p className="text-center text-green-500 font-bold mb-6">
            {isUk ? "Перше заняття — БЕЗКОШТОВНО!" : "First lesson — FREE!"}
          </p>

          {/* Progress indicators */}
          {!bookingSubmitted && (
            <div className="flex items-center justify-center gap-2 mb-8">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{
                      background: bookingStep >= step ? "#F59E0B" : "#E5E7EB",
                      color: bookingStep >= step ? "#fff" : "#999",
                    }}
                  >
                    {bookingStep > step ? <Check className="w-4 h-4" /> : step}
                  </div>
                  {step < 4 && (
                    <div
                      className="w-8 h-0.5"
                      style={{ background: bookingStep > step ? "#F59E0B" : "#E5E7EB" }}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {bookingSubmitted ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="font-extrabold text-2xl text-amber-500 mb-2">
                {isUk ? "Ура! Записано!" : "Hooray! Booked!"}
              </h3>
              <p className="text-gray-500">
                {isUk
                  ? "Ми зателефонуємо вам найближчим часом для підтвердження."
                  : "We'll call you shortly to confirm your trial lesson."}
              </p>
            </div>
          ) : (
            <>
              {/* Step 1: Child's age */}
              {bookingStep === 1 && (
                <div>
                  <h3 className="font-bold text-base text-gray-700 mb-4 text-center">
                    <Baby className="w-5 h-5 inline mr-1 text-amber-500" />
                    {isUk ? "Скільки років дитині?" : "How old is your child?"}
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    {["1", "2", "3", "4", "5", "6"].map((age) => (
                      <button
                        key={age}
                        onClick={() => {
                          setSelectedAge(age);
                          setBookingStep(2);
                        }}
                        className="py-4 rounded-xl border-2 font-bold text-lg cursor-pointer transition-colors"
                        style={{
                          background: selectedAge === age ? "#FEF3C7" : "#fff",
                          borderColor: selectedAge === age ? "#F59E0B" : "#E5E7EB",
                          color: "#1a1a1a",
                        }}
                      >
                        {age} {isUk ? (age === "1" ? "рік" : age < "5" ? "роки" : "років") : (age === "1" ? "year" : "years")}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Select program */}
              {bookingStep === 2 && (
                <div>
                  <h3 className="font-bold text-base text-gray-700 mb-4 text-center">
                    <BookOpen className="w-5 h-5 inline mr-1 text-amber-500" />
                    {isUk ? "Оберіть програму" : "Choose a program"}
                  </h3>
                  <div className="flex flex-col gap-3">
                    {programs.map((prog) => (
                      <button
                        key={prog.id}
                        onClick={() => {
                          setSelectedProgram(prog.id);
                          setBookingStep(3);
                        }}
                        className="flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer text-left transition-colors"
                        style={{
                          background: selectedProgram === prog.id ? prog.bg : "#fff",
                          borderColor: selectedProgram === prog.id ? prog.color : "#E5E7EB",
                        }}
                      >
                        <span className="text-2xl">{prog.emoji}</span>
                        <div>
                          <div className="font-bold text-sm text-gray-900">
                            {isUk ? prog.nameUk : prog.nameEn}
                          </div>
                          <div className="text-xs text-gray-500">{isUk ? prog.ageUk : prog.ageEn}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setBookingStep(1)}
                    className="mt-4 text-sm text-gray-400 font-semibold cursor-pointer bg-transparent border-none hover:text-gray-600"
                  >
                    ← {isUk ? "Назад" : "Back"}
                  </button>
                </div>
              )}

              {/* Step 3: Select date */}
              {bookingStep === 3 && (
                <div>
                  <h3 className="font-bold text-base text-gray-700 mb-4 text-center">
                    <Calendar className="w-5 h-5 inline mr-1 text-amber-500" />
                    {isUk ? "Оберіть дату" : "Choose a date"}
                  </h3>
                  <div className="flex flex-col gap-3">
                    {trialDates.map((d, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setSelectedDate(isUk ? d.dateUk : d.dateEn);
                          setBookingStep(4);
                        }}
                        className="flex items-center justify-between p-3.5 rounded-xl border-2 cursor-pointer transition-colors"
                        style={{
                          background: selectedDate === (isUk ? d.dateUk : d.dateEn) ? "#FEF3C7" : "#fff",
                          borderColor: selectedDate === (isUk ? d.dateUk : d.dateEn) ? "#F59E0B" : "#E5E7EB",
                        }}
                      >
                        <span className="font-semibold text-sm text-gray-800">
                          {isUk ? d.dateUk : d.dateEn}
                        </span>
                        <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> {d.time}
                        </span>
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setBookingStep(2)}
                    className="mt-4 text-sm text-gray-400 font-semibold cursor-pointer bg-transparent border-none hover:text-gray-600"
                  >
                    ← {isUk ? "Назад" : "Back"}
                  </button>
                </div>
              )}

              {/* Step 4: Contact info */}
              {bookingStep === 4 && (
                <div>
                  <h3 className="font-bold text-base text-gray-700 mb-4 text-center">
                    <Phone className="w-5 h-5 inline mr-1 text-amber-500" />
                    {isUk ? "Ваші контакти" : "Your contact info"}
                  </h3>
                  <div className="flex flex-col gap-3.5">
                    {[
                      { key: "name", label: isUk ? "Ім'я батька / матері" : "Parent's name", type: "text" },
                      { key: "phone", label: isUk ? "Телефон" : "Phone", type: "tel" },
                      { key: "email", label: "Email", type: "email" },
                    ].map((f) => (
                      <div key={f.key}>
                        <label className="block font-semibold text-sm text-gray-700 mb-1">{f.label}</label>
                        <input
                          type={f.type}
                          value={contactData[f.key as keyof typeof contactData]}
                          onChange={(e) =>
                            setContactData((d) => ({ ...d, [f.key]: e.target.value }))
                          }
                          className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-amber-400"
                          style={{ boxSizing: "border-box" }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Summary */}
                  <div className="mt-5 bg-amber-50 rounded-xl p-4 text-sm">
                    <div className="font-bold text-gray-700 mb-2">{isUk ? "Підсумок:" : "Summary:"}</div>
                    <div className="text-gray-600">
                      👶 {isUk ? "Вік" : "Age"}: {selectedAge} {isUk ? "р." : "y.o."} &nbsp;·&nbsp;{" "}
                      {programById(selectedProgram)?.emoji}{" "}
                      {isUk
                        ? programById(selectedProgram)?.nameUk
                        : programById(selectedProgram)?.nameEn}{" "}
                      &nbsp;·&nbsp; 📅 {selectedDate}
                    </div>
                  </div>

                  <button
                    onClick={handleBookingSubmit}
                    className="w-full mt-5 py-3.5 border-none rounded-xl font-extrabold text-base cursor-pointer text-white"
                    style={{ background: "#F59E0B" }}
                  >
                    🎁 {isUk ? "Записати безкоштовно!" : "Book for Free!"}
                  </button>
                  <button
                    onClick={() => setBookingStep(3)}
                    className="mt-3 text-sm text-gray-400 font-semibold cursor-pointer bg-transparent border-none hover:text-gray-600"
                  >
                    ← {isUk ? "Назад" : "Back"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-8 px-6 text-white" style={{ background: "#F59E0B" }}>
        <div className="font-black text-xl mb-2 flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5" /> SmartKids
        </div>
        <p className="opacity-90 text-sm mb-1">
          {isUk
            ? "вул. Франка 28, Львів · Пн–Пт 9:00–19:00, Сб 10:00–15:00"
            : "28 Franka St, Lviv · Mon–Fri 9:00–19:00, Sat 10:00–15:00"}
        </p>
        <p className="opacity-80 text-sm">
          <Phone className="w-3.5 h-3.5 inline mr-1" />
          +380 (32) 255-33-44
        </p>
        <p className="opacity-70 text-xs mt-3">
          © 2026 SmartKids. {isUk ? "Всі права захищені." : "All rights reserved."}
        </p>
      </div>
    </div>
  );
}
