"use client";

import { useState } from "react";
import { EmojiIcon } from "@/components/ui/EmojiIcon";

// ─── Data ────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    id: "vaccination",
    emoji: "💉",
    nameUk: "Вакцинація",
    nameEn: "Vaccination",
    descUk: "Планові щеплення, паспорт тварини, міжнародний сертифікат",
    descEn: "Scheduled vaccines, pet passport, international certificate",
    priceFrom: "від 350 ₴",
    priceFromEn: "from 350 ₴",
    color: "bg-teal-50 border-teal-200",
  },
  {
    id: "surgery",
    emoji: "🏥",
    nameUk: "Хірургія",
    nameEn: "Surgery",
    descUk: "Стерилізація, кастрація, загальна хірургія, ортопедія",
    descEn: "Spay, neuter, general surgery, orthopaedics",
    priceFrom: "від 1 200 ₴",
    priceFromEn: "from 1 200 ₴",
    color: "bg-blue-50 border-blue-200",
  },
  {
    id: "dentistry",
    emoji: "🦷",
    nameUk: "Стоматологія",
    nameEn: "Dentistry",
    descUk: "Чищення зубів, видалення, лікування ясен під наркозом",
    descEn: "Dental cleaning, extraction, gum treatment under anaesthesia",
    priceFrom: "від 900 ₴",
    priceFromEn: "from 900 ₴",
    color: "bg-purple-50 border-purple-200",
  },
  {
    id: "diagnostics",
    emoji: "🔬",
    nameUk: "Діагностика",
    nameEn: "Diagnostics",
    descUk: "УЗД, рентген, аналізи крові, ЕКГ, ендоскопія",
    descEn: "Ultrasound, X-ray, blood tests, ECG, endoscopy",
    priceFrom: "від 250 ₴",
    priceFromEn: "from 250 ₴",
    color: "bg-amber-50 border-amber-200",
  },
  {
    id: "grooming",
    emoji: "✂️",
    nameUk: "Грумінг",
    nameEn: "Grooming",
    descUk: "Стрижка, купання, чищення вух, стрижка кігтів",
    descEn: "Haircut, bathing, ear cleaning, nail trimming",
    priceFrom: "від 400 ₴",
    priceFromEn: "from 400 ₴",
    color: "bg-pink-50 border-pink-200",
  },
  {
    id: "online",
    emoji: "💻",
    nameUk: "Онлайн-консультація",
    nameEn: "Online Consultation",
    descUk: "Відеодзвінок з ветеринаром, швидка відповідь у чаті",
    descEn: "Video call with a vet, quick chat response",
    priceFrom: "від 200 ₴",
    priceFromEn: "from 200 ₴",
    color: "bg-green-50 border-green-200",
  },
];

const DOCTORS = [
  {
    name: "Олена Кравченко",
    nameEn: "Olena Kravchenko",
    specUk: "Терапевт, хірург",
    specEn: "Therapist, Surgeon",
    years: 12,
    animals: ["🐶", "🐱", "🐰"],
    bioUk: "Кандидат ветеринарних наук. Спеціалізується на м'якотканинній хірургії.",
    bioEn: "PhD in Veterinary Sciences. Specialises in soft-tissue surgery.",
  },
  {
    name: "Максим Бондар",
    nameEn: "Maksym Bondar",
    specUk: "Кардіолог, УЗД-діагност",
    specEn: "Cardiologist, Ultrasound Specialist",
    years: 8,
    animals: ["🐶", "🐱"],
    bioUk: "Понад 500 проведених ехокардіографій. Член Європейської асоціації ветеринарних кардіологів.",
    bioEn: "Over 500 echocardiographies performed. Member of the European Veterinary Cardiology Society.",
  },
  {
    name: "Наталія Лисенко",
    nameEn: "Nataliia Lysenko",
    specUk: "Стоматолог, дерматолог",
    specEn: "Dentist, Dermatologist",
    years: 6,
    animals: ["🐶", "🐱", "🦜", "🐇"],
    bioUk: "Сертифікований ветеринарний стоматолог. Консультує з питань шкіри та алергій.",
    bioEn: "Certified veterinary dentist. Consults on skin conditions and allergies.",
  },
];

const PRICE_TABS = [
  { id: "dogs", labelUk: "Собаки 🐶", labelEn: "Dogs 🐶" },
  { id: "cats", labelUk: "Коти 🐱", labelEn: "Cats 🐱" },
  { id: "other", labelUk: "Інші 🐾", labelEn: "Other 🐾" },
];

const PRICES: Record<string, { nameUk: string; nameEn: string; price: string }[]> = {
  dogs: [
    { nameUk: "Первинний огляд", nameEn: "Initial examination", price: "350 ₴" },
    { nameUk: "Повторний огляд", nameEn: "Follow-up examination", price: "200 ₴" },
    { nameUk: "Вакцинація (комплексна)", nameEn: "Vaccination (complex)", price: "550–950 ₴" },
    { nameUk: "Стерилізація (сука)", nameEn: "Spay (female)", price: "від 2 800 ₴" },
    { nameUk: "Кастрація (пес)", nameEn: "Neuter (male)", price: "від 1 200 ₴" },
    { nameUk: "УЗД черевної порожнини", nameEn: "Abdominal ultrasound", price: "450 ₴" },
    { nameUk: "Загальний аналіз крові", nameEn: "Complete blood count", price: "280 ₴" },
    { nameUk: "Грумінг (стрижка)", nameEn: "Grooming (haircut)", price: "від 600 ₴" },
  ],
  cats: [
    { nameUk: "Первинний огляд", nameEn: "Initial examination", price: "300 ₴" },
    { nameUk: "Повторний огляд", nameEn: "Follow-up examination", price: "180 ₴" },
    { nameUk: "Вакцинація (комплексна)", nameEn: "Vaccination (complex)", price: "450–750 ₴" },
    { nameUk: "Стерилізація (кішка)", nameEn: "Spay (female)", price: "від 1 800 ₴" },
    { nameUk: "Кастрація (кіт)", nameEn: "Neuter (male)", price: "від 900 ₴" },
    { nameUk: "УЗД черевної порожнини", nameEn: "Abdominal ultrasound", price: "400 ₴" },
    { nameUk: "Загальний аналіз крові", nameEn: "Complete blood count", price: "260 ₴" },
    { nameUk: "Грумінг (купання)", nameEn: "Grooming (bathing)", price: "від 400 ₴" },
  ],
  other: [
    { nameUk: "Огляд кролика / гризуна", nameEn: "Rabbit / rodent examination", price: "280 ₴" },
    { nameUk: "Огляд птаха", nameEn: "Bird examination", price: "300 ₴" },
    { nameUk: "Огляд рептилії", nameEn: "Reptile examination", price: "350 ₴" },
    { nameUk: "Вакцинація (кролик)", nameEn: "Vaccination (rabbit)", price: "420 ₴" },
    { nameUk: "Аналіз крові", nameEn: "Blood test", price: "від 320 ₴" },
    { nameUk: "Хірургічне втручання", nameEn: "Surgical procedure", price: "від 1 500 ₴" },
  ],
};

const TESTIMONIALS = [
  {
    ownerUk: "Марина С.",
    ownerEn: "Maryna S.",
    petUk: "Золотистий ретривер Барні, 4 роки",
    petEn: "Golden retriever Barney, 4 years",
    textUk: "Барні нещодавно переніс операцію у PetCare. Команда була надзвичайно уважною, і він одужав набагато швидше, ніж ми очікували. Дуже вдячні!",
    textEn: "Barney recently had surgery at PetCare. The team was incredibly attentive and he recovered much faster than we expected. So grateful!",
    emoji: "🐕",
    stars: 5,
  },
  {
    ownerUk: "Андрій К.",
    ownerEn: "Andrii K.",
    petUk: "Британська кішка Луна, 2 роки",
    petEn: "British shorthair Luna, 2 years",
    textUk: "Онлайн-консультація врятувала нас від зайвої паніки. Лікар одразу зрозумів проблему і призначив лікування. Зручно та професійно!",
    textEn: "The online consultation saved us from unnecessary panic. The vet immediately understood the problem and prescribed treatment. Convenient and professional!",
    emoji: "🐈",
    stars: 5,
  },
  {
    ownerUk: "Тетяна В.",
    ownerEn: "Tetiana V.",
    petUk: "Папуга Рікі, 3 роки",
    petEn: "Parrot Ricky, 3 years",
    textUk: "Нарешті знайшла клініку, де вміють працювати з птахами! Рікі пройшов повне обстеження. Дуже задоволена рівнем сервісу.",
    textEn: "Finally found a clinic that knows how to work with birds! Ricky had a full check-up. Very pleased with the level of service.",
    emoji: "🦜",
    stars: 5,
  },
];

const EMERGENCY_SIGNS_UK = [
  "Втрата свідомості або судоми",
  "Труднощі з диханням / задуха",
  "Сильна кровотеча",
  "Підозра на перелом кістки",
  "Отруєння або проковтування сторонніх предметів",
  "Блювота / діарея з кров'ю",
  "Травма після ДТП",
  "Раптова втрата координації",
];

const EMERGENCY_SIGNS_EN = [
  "Loss of consciousness or seizures",
  "Difficulty breathing / choking",
  "Severe bleeding",
  "Suspected bone fracture",
  "Poisoning or swallowed foreign object",
  "Vomiting / diarrhoea with blood",
  "Injury after road accident",
  "Sudden loss of coordination",
];

const PET_EMOJIS = ["🐶", "🐱", "🐰", "🦜", "🐹", "🐾", "🐕", "🐈"];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function StarRating({ count }: { count: number }) {
  return (
    <span className="text-orange-400 text-sm">
      {"★".repeat(count)}{"☆".repeat(5 - count)}
    </span>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export function PetCareDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  // Appointment form state
  const [step, setStep] = useState(1);
  const [petType, setPetType] = useState("");
  const [petName, setPetName] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [bookingDone, setBookingDone] = useState(false);

  // Prices tab state
  const [priceTab, setPriceTab] = useState("dogs");

  const totalSteps = 4;
  const progressPct = ((step - 1) / (totalSteps - 1)) * 100;

  function handleBook() {
    setBookingDone(true);
  }

  function resetBooking() {
    setStep(1);
    setPetType("");
    setPetName("");
    setSelectedService("");
    setSelectedDate("");
    setSelectedTime("");
    setOwnerName("");
    setOwnerPhone("");
    setBookingDone(false);
  }

  const timeSlots = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
  const fakeDates = [
    { value: "2026-03-30", labelUk: "Пн, 30 берез.", labelEn: "Mon, Mar 30" },
    { value: "2026-03-31", labelUk: "Вт, 31 берез.", labelEn: "Tue, Mar 31" },
    { value: "2026-04-01", labelUk: "Ср, 1 квіт.", labelEn: "Wed, Apr 1" },
    { value: "2026-04-02", labelUk: "Чт, 2 квіт.", labelEn: "Thu, Apr 2" },
    { value: "2026-04-03", labelUk: "Пт, 3 квіт.", labelEn: "Fri, Apr 3" },
    { value: "2026-04-05", labelUk: "Сб, 5 квіт.", labelEn: "Sat, Apr 5" },
  ];

  return (
    <div className="font-sans text-gray-800 dark:text-neutral-200 bg-white min-h-screen">

      {/* ── HEADER ── */}
      <header className="bg-white border-b border-teal-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between flex-wrap gap-2">
          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <EmojiIcon emoji="🐾" className="w-7 h-7" />
            <div>
              <div className="font-bold text-teal-700 text-lg leading-tight">PetCare</div>
              <div className="text-xs text-teal-500 leading-tight">
                {isUk ? "Ветеринарна Клініка" : "Vet Clinic"}
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-gray-600">
            {[
              { uk: "Послуги", en: "Services" },
              { uk: "Лікарі", en: "Doctors" },
              { uk: "Ціни", en: "Prices" },
              { uk: "Екстрена допомога", en: "Emergency" },
              { uk: "Контакти", en: "Contacts" },
            ].map((item) => (
              <a
                key={item.en}
                href="#"
                className="hover:text-teal-600 transition-colors"
              >
                {isUk ? item.uk : item.en}
              </a>
            ))}
          </nav>

          {/* Emergency badge */}
          <div className="shrink-0 flex items-center gap-2 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow">
            <EmojiIcon emoji="🚨" className="w-5 h-5 animate-pulse" />
            {isUk ? "Екстрена допомога: 24/7" : "Emergency: 24/7"}
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="bg-linear-to-br from-teal-500 via-teal-600 to-teal-700 text-white py-20 px-4 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-teal-400 rounded-full opacity-20 -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-400 rounded-full opacity-10 translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Pet emoji row */}
          <div className="flex justify-center gap-3 mb-8 flex-wrap">
            {PET_EMOJIS.map((em, i) => (
              <span key={i} style={{ animation: `bounce 1.4s ease-in-out ${i * 0.15}s infinite alternate` }} className="inline-block">
                <EmojiIcon emoji={em} className="w-8 h-8" />
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 drop-shadow">
            {isUk
              ? "Турбуємось про Ваших Улюбленців"
              : "We Care for Your Beloved Pets"}
          </h1>
          <p className="text-teal-100 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            {isUk
              ? "Сучасна ветеринарна клініка з досвідченими лікарями. Ваш улюбленець заслуговує найкращої допомоги."
              : "A modern veterinary clinic with experienced doctors. Your pet deserves the best care."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold px-8 py-3.5 rounded-full shadow-lg transition-colors text-base">
              {isUk ? "📅 Записатись на прийом" : "📅 Book Appointment"}
            </button>
            <button className="bg-white text-teal-700 hover:bg-teal-50 font-bold px-8 py-3.5 rounded-full shadow-lg transition-colors text-base border border-white/50">
              📞 {isUk ? "Екстрений дзвінок" : "Emergency Call"}
            </button>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-teal-100">
            <span>✅ {isUk ? "Понад 5 000 вдячних пацієнтів" : "Over 5,000 happy patients"}</span>
            <span>✅ {isUk ? "15 років досвіду" : "15 years of experience"}</span>
            <span>✅ {isUk ? "Сучасне обладнання" : "Modern equipment"}</span>
          </div>
        </div>

        <style>{`
          @keyframes bounce {
            from { transform: translateY(0); }
            to   { transform: translateY(-12px); }
          }
        `}</style>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-teal-700 mb-2">
            {isUk ? "Наші Послуги" : "Our Services"}
          </h2>
          <p className="text-center text-gray-500 dark:text-neutral-400 mb-10">
            {isUk
              ? "Повний спектр ветеринарної допомоги для вашого улюбленця"
              : "Full range of veterinary care for your pet"}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((svc) => (
              <div
                key={svc.id}
                className={`rounded-2xl border p-6 flex flex-col gap-3 hover:shadow-md transition-shadow ${svc.color}`}
              >
                <EmojiIcon emoji={svc.emoji} className="w-10 h-10" />
                <h3 className="font-bold text-gray-800 dark:text-neutral-200 text-lg">
                  {isUk ? svc.nameUk : svc.nameEn}
                </h3>
                <p className="text-gray-600 dark:text-neutral-300 text-sm flex-1">
                  {isUk ? svc.descUk : svc.descEn}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-teal-700 font-semibold text-sm">
                    {isUk ? svc.priceFrom : svc.priceFromEn}
                  </span>
                  <button className="text-xs bg-teal-600 hover:bg-teal-700 text-white px-3 py-1.5 rounded-full transition-colors">
                    {isUk ? "Детальніше" : "Learn more"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APPOINTMENT BOOKING ── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-teal-700 mb-2">
            {isUk ? "Запис на Прийом" : "Book an Appointment"}
          </h2>
          <p className="text-center text-gray-500 dark:text-neutral-400 mb-8">
            {isUk
              ? "Заповніть форму і ми підтвердимо ваш запис"
              : "Fill in the form and we will confirm your booking"}
          </p>

          <div className="bg-teal-50 rounded-3xl border border-teal-100 p-8 shadow-sm">
            {bookingDone ? (
              <div className="text-center py-8">
                <div className="mb-4"><EmojiIcon emoji="🎉" className="w-16 h-16" /></div>
                <h3 className="text-2xl font-bold text-teal-700 mb-2">
                  {isUk ? "Запис підтверджено!" : "Booking Confirmed!"}
                </h3>
                <p className="text-gray-600 dark:text-neutral-300 mb-6">
                  {isUk
                    ? `${ownerName}, ми зателефонуємо вам на ${ownerPhone} для підтвердження деталей.`
                    : `${ownerName}, we will call you on ${ownerPhone} to confirm the details.`}
                </p>
                <button
                  onClick={resetBooking}
                  className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 py-2.5 rounded-full transition-colors"
                >
                  {isUk ? "Новий запис" : "New booking"}
                </button>
              </div>
            ) : (
              <>
                {/* Progress bar */}
                <div className="mb-8">
                  <div className="flex justify-between text-xs text-gray-500 dark:text-neutral-400 mb-1.5">
                    <span>
                      {isUk ? `Крок ${step} з ${totalSteps}` : `Step ${step} of ${totalSteps}`}
                    </span>
                    <span>{Math.round(progressPct)}%</span>
                  </div>
                  <div className="h-2 bg-teal-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-teal-500 rounded-full transition-all duration-500"
                      style={{ width: `${progressPct === 0 ? 10 : progressPct}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-2">
                    {[
                      { uk: "Тварина", en: "Pet" },
                      { uk: "Послуга", en: "Service" },
                      { uk: "Час", en: "Time" },
                      { uk: "Контакти", en: "Contact" },
                    ].map((s, i) => (
                      <span
                        key={i}
                        className={`text-xs font-medium ${step === i + 1 ? "text-teal-700" : "text-gray-400"}`}
                      >
                        {isUk ? s.uk : s.en}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Step 1: Pet type + name */}
                {step === 1 && (
                  <div className="space-y-5">
                    <h3 className="font-bold text-teal-700 text-lg">
                      {isUk ? "🐾 Ваша тварина" : "🐾 Your Pet"}
                    </h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">
                        {isUk ? "Тип тварини" : "Pet type"}
                      </label>
                      <div className="flex gap-3 flex-wrap">
                        {[
                          { value: "dog", labelUk: "🐶 Собака", labelEn: "🐶 Dog" },
                          { value: "cat", labelUk: "🐱 Кіт", labelEn: "🐱 Cat" },
                          { value: "other", labelUk: "🐾 Інша", labelEn: "🐾 Other" },
                        ].map((pt) => (
                          <button
                            key={pt.value}
                            onClick={() => setPetType(pt.value)}
                            className={`px-5 py-2.5 rounded-full border-2 font-medium text-sm transition-colors ${
                              petType === pt.value
                                ? "bg-teal-600 border-teal-600 text-white"
                                : "bg-white border-teal-200 text-gray-700 dark:text-neutral-300 hover:border-teal-400"
                            }`}
                          >
                            {isUk ? pt.labelUk : pt.labelEn}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1">
                        {isUk ? "Кличка тварини" : "Pet name"}
                      </label>
                      <input
                        type="text"
                        value={petName}
                        onChange={(e) => setPetName(e.target.value)}
                        placeholder={isUk ? "Наприклад: Барсик" : "E.g.: Buddy"}
                        className="w-full border border-teal-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500"
                      />
                    </div>
                    <button
                      onClick={() => step < totalSteps && setStep(step + 1)}
                      disabled={!petType || !petName.trim()}
                      className="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-colors"
                    >
                      {isUk ? "Далі →" : "Next →"}
                    </button>
                  </div>
                )}

                {/* Step 2: Service selection */}
                {step === 2 && (
                  <div className="space-y-5">
                    <h3 className="font-bold text-teal-700 text-lg">
                      {isUk ? "🩺 Оберіть послугу" : "🩺 Choose a service"}
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                      {SERVICES.map((svc) => (
                        <button
                          key={svc.id}
                          onClick={() => setSelectedService(svc.id)}
                          className={`flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-colors ${
                            selectedService === svc.id
                              ? "bg-teal-600 border-teal-600 text-white"
                              : "bg-white border-teal-100 hover:border-teal-300"
                          }`}
                        >
                          <EmojiIcon emoji={svc.emoji} className="w-5 h-5 shrink-0" />
                          <span className="font-medium text-sm">
                            {isUk ? svc.nameUk : svc.nameEn}
                          </span>
                          <span className={`ml-auto text-xs shrink-0 ${selectedService === svc.id ? "text-teal-200" : "text-gray-400"}`}>
                            {isUk ? svc.priceFrom : svc.priceFromEn}
                          </span>
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setStep(step - 1)}
                        className="flex-1 border border-teal-200 text-teal-600 font-bold py-3 rounded-xl hover:bg-teal-50 transition-colors"
                      >
                        ← {isUk ? "Назад" : "Back"}
                      </button>
                      <button
                        onClick={() => setStep(step + 1)}
                        disabled={!selectedService}
                        className="flex-1 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-colors"
                      >
                        {isUk ? "Далі →" : "Next →"}
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Date & time */}
                {step === 3 && (
                  <div className="space-y-5">
                    <h3 className="font-bold text-teal-700 text-lg">
                      {isUk ? "📅 Дата та час" : "📅 Date & Time"}
                    </h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">
                        {isUk ? "Оберіть дату" : "Choose a date"}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {fakeDates.map((d) => (
                          <button
                            key={d.value}
                            onClick={() => setSelectedDate(d.value)}
                            className={`px-4 py-2 rounded-xl border-2 text-sm font-medium transition-colors ${
                              selectedDate === d.value
                                ? "bg-teal-600 border-teal-600 text-white"
                                : "bg-white border-teal-200 text-gray-700 dark:text-neutral-300 hover:border-teal-400"
                            }`}
                          >
                            {isUk ? d.labelUk : d.labelEn}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">
                        {isUk ? "Оберіть час" : "Choose a time"}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {timeSlots.map((t) => (
                          <button
                            key={t}
                            onClick={() => setSelectedTime(t)}
                            className={`px-4 py-2 rounded-xl border-2 text-sm font-medium transition-colors ${
                              selectedTime === t
                                ? "bg-orange-500 border-orange-500 text-white"
                                : "bg-white border-orange-200 text-gray-700 dark:text-neutral-300 hover:border-orange-400"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setStep(step - 1)}
                        className="flex-1 border border-teal-200 text-teal-600 font-bold py-3 rounded-xl hover:bg-teal-50 transition-colors"
                      >
                        ← {isUk ? "Назад" : "Back"}
                      </button>
                      <button
                        onClick={() => setStep(step + 1)}
                        disabled={!selectedDate || !selectedTime}
                        className="flex-1 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-colors"
                      >
                        {isUk ? "Далі →" : "Next →"}
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 4: Contact info */}
                {step === 4 && (
                  <div className="space-y-5">
                    <h3 className="font-bold text-teal-700 text-lg">
                      {isUk ? "👤 Ваші контакти" : "👤 Your Contact Info"}
                    </h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1">
                        {isUk ? "Ваше ім'я" : "Your name"}
                      </label>
                      <input
                        type="text"
                        value={ownerName}
                        onChange={(e) => setOwnerName(e.target.value)}
                        placeholder={isUk ? "Ім'я та прізвище" : "Full name"}
                        className="w-full border border-teal-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1">
                        {isUk ? "Номер телефону" : "Phone number"}
                      </label>
                      <input
                        type="tel"
                        value={ownerPhone}
                        onChange={(e) => setOwnerPhone(e.target.value)}
                        placeholder="+380 XX XXX XX XX"
                        className="w-full border border-teal-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500"
                      />
                    </div>

                    {/* Summary */}
                    <div className="bg-teal-100 rounded-xl p-4 text-sm space-y-1 text-gray-700">
                      <div className="font-semibold text-teal-700 mb-2">
                        {isUk ? "📋 Ваш запис:" : "📋 Your booking:"}
                      </div>
                      <div>🐾 {petName} ({petType === "dog" ? (isUk ? "Собака" : "Dog") : petType === "cat" ? (isUk ? "Кіт" : "Cat") : (isUk ? "Інша" : "Other")})</div>
                      <div>🩺 {isUk ? SERVICES.find(s => s.id === selectedService)?.nameUk : SERVICES.find(s => s.id === selectedService)?.nameEn}</div>
                      <div>📅 {fakeDates.find(d => d.value === selectedDate)?.[isUk ? "labelUk" : "labelEn"]} {isUk ? "о" : "at"} {selectedTime}</div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setStep(step - 1)}
                        className="flex-1 border border-teal-200 text-teal-600 font-bold py-3 rounded-xl hover:bg-teal-50 transition-colors"
                      >
                        ← {isUk ? "Назад" : "Back"}
                      </button>
                      <button
                        onClick={handleBook}
                        disabled={!ownerName.trim() || !ownerPhone.trim()}
                        className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-colors"
                      >
                        ✅ {isUk ? "Записатись" : "Book Now"}
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── DOCTORS ── */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-teal-700 mb-2">
            {isUk ? "Наші Лікарі" : "Our Doctors"}
          </h2>
          <p className="text-center text-gray-500 dark:text-neutral-400 mb-10">
            {isUk
              ? "Досвідчені спеціалісти, які щиро люблять тварин"
              : "Experienced specialists who genuinely love animals"}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DOCTORS.map((doc) => (
              <div
                key={doc.name}
                className="bg-white rounded-2xl border border-teal-100 p-6 text-center hover:shadow-md transition-shadow"
              >
                {/* Avatar placeholder */}
                <div className="w-24 h-24 rounded-full bg-linear-to-br from-teal-100 to-teal-200 flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-md">
                  <EmojiIcon emoji="👩‍⚕️" className="w-10 h-10" />
                </div>
                <h3 className="font-bold text-gray-800 dark:text-neutral-200 text-lg mb-0.5">
                  {isUk ? doc.name : doc.nameEn}
                </h3>
                <div className="text-teal-600 text-sm font-medium mb-1">
                  {isUk ? doc.specUk : doc.specEn}
                </div>
                <div className="text-xs text-gray-400 dark:text-neutral-500 mb-3">
                  {isUk ? `${doc.years} років досвіду` : `${doc.years} years of experience`}
                </div>
                <p className="text-gray-600 dark:text-neutral-300 text-sm mb-4">
                  {isUk ? doc.bioUk : doc.bioEn}
                </p>
                <div className="flex justify-center gap-1.5 flex-wrap">
                  {doc.animals.map((a, i) => (
                    <EmojiIcon key={i} emoji={a} className="w-5 h-5" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EMERGENCY ── */}
      <section className="py-16 px-4 bg-linear-to-br from-red-600 to-orange-500 text-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="mb-3"><EmojiIcon emoji="🚨" className="w-14 h-14" /></div>
            <h2 className="text-4xl font-extrabold mb-2 drop-shadow">
              {isUk ? "Екстрена допомога 24/7" : "Emergency Care 24/7"}
            </h2>
            <p className="text-red-100 text-lg">
              {isUk
                ? "Ми завжди на зв'язку. Не зволікайте — кожна хвилина важлива."
                : "We are always available. Do not delay — every minute counts."}
            </p>
          </div>

          {/* Phone */}
          <div className="text-center mb-10">
            <a
              href="tel:+380800123456"
              className="inline-block bg-white text-red-600 font-extrabold text-3xl md:text-4xl px-10 py-5 rounded-2xl shadow-xl hover:bg-red-50 transition-colors tracking-wide"
            >
              📞 0 800 123 456
            </a>
            <div className="mt-2 text-red-200 text-sm">
              {isUk ? "Безкоштовно по Україні" : "Free call within Ukraine"}
            </div>
          </div>

          {/* Emergency signs */}
          <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/20">
            <h3 className="font-bold text-lg mb-4">
              ⚠️ {isUk ? "Коли негайно дзвонити?" : "When to call immediately?"}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(isUk ? EMERGENCY_SIGNS_UK : EMERGENCY_SIGNS_EN).map((sign, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-orange-300 shrink-0 mt-0.5">•</span>
                  <span>{sign}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICES ── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-teal-700 mb-2">
            {isUk ? "Ціни на Послуги" : "Service Prices"}
          </h2>
          <p className="text-center text-gray-500 dark:text-neutral-400 mb-8">
            {isUk
              ? "Прозоре ціноутворення без прихованих доплат"
              : "Transparent pricing with no hidden fees"}
          </p>

          {/* Tabs */}
          <div className="flex gap-2 justify-center mb-6 flex-wrap">
            {PRICE_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setPriceTab(tab.id)}
                className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-colors ${
                  priceTab === tab.id
                    ? "bg-teal-600 text-white shadow-md"
                    : "bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-200"
                }`}
              >
                {isUk ? tab.labelUk : tab.labelEn}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="rounded-2xl border border-teal-100 overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-teal-600 text-white">
                  <th className="text-left px-5 py-3 font-semibold">
                    {isUk ? "Послуга" : "Service"}
                  </th>
                  <th className="text-right px-5 py-3 font-semibold">
                    {isUk ? "Вартість" : "Price"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {PRICES[priceTab].map((row, i) => (
                  <tr
                    key={i}
                    className={i % 2 === 0 ? "bg-white" : "bg-teal-50"}
                  >
                    <td className="px-5 py-3 text-gray-700">
                      {isUk ? row.nameUk : row.nameEn}
                    </td>
                    <td className="px-5 py-3 text-right text-teal-700 font-semibold">
                      {row.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-center text-xs text-gray-400 dark:text-neutral-500 mt-4">
            {isUk
              ? "* Ціни орієнтовні. Остаточна вартість визначається після огляду."
              : "* Prices are indicative. Final cost is determined after examination."}
          </p>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-teal-700 mb-2">
            {isUk ? "Відгуки Власників" : "Owner Reviews"}
          </h2>
          <p className="text-center text-gray-500 dark:text-neutral-400 mb-10">
            {isUk ? "Що кажуть наші клієнти" : "What our clients say"}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-teal-100 p-6 hover:shadow-md transition-shadow"
              >
                {/* Pet photo placeholder */}
                <div className="w-16 h-16 rounded-full bg-linear-to-br from-orange-100 to-orange-200 flex items-center justify-center mb-4 border-4 border-white shadow">
                  <EmojiIcon emoji={t.emoji} className="w-8 h-8" />
                </div>
                <StarRating count={t.stars} />
                <p className="text-gray-600 dark:text-neutral-300 text-sm mt-3 mb-4 leading-relaxed">
                  "{isUk ? t.textUk : t.textEn}"
                </p>
                <div className="border-t border-gray-100 dark:border-neutral-700 pt-3">
                  <div className="font-semibold text-gray-800 dark:text-neutral-200 text-sm">
                    {isUk ? t.ownerUk : t.ownerEn}
                  </div>
                  <div className="text-xs text-teal-500 mt-0.5">
                    {isUk ? t.petUk : t.petEn}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-teal-800 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <EmojiIcon emoji="🐾" className="w-7 h-7" />
                <div>
                  <div className="font-bold text-lg">PetCare</div>
                  <div className="text-teal-300 text-xs">
                    {isUk ? "Ветеринарна Клініка" : "Vet Clinic"}
                  </div>
                </div>
              </div>
              <p className="text-teal-300 text-sm">
                {isUk
                  ? "Ваш надійний партнер у турботі про здоров'я вашого улюбленця."
                  : "Your trusted partner in caring for your pet's health."}
              </p>
            </div>

            {/* Address */}
            <div>
              <h4 className="font-bold mb-3 text-teal-100">
                📍 {isUk ? "Адреса" : "Address"}
              </h4>
              <p className="text-teal-300 text-sm">
                {isUk
                  ? "м. Київ, вул. Лісова 24, офіс 5"
                  : "Kyiv, Lisova St. 24, office 5"}
              </p>
              <p className="text-teal-300 text-sm mt-1">
                {isUk ? "Метро: Лісова (450 м)" : "Metro: Lisova (450 m)"}
              </p>
            </div>

            {/* Phones */}
            <div>
              <h4 className="font-bold mb-3 text-teal-100">
                📞 {isUk ? "Телефони" : "Phones"}
              </h4>
              <div className="space-y-1 text-sm">
                <div className="text-white font-semibold">0 800 123 456</div>
                <div className="text-teal-300 text-xs">
                  {isUk ? "Безкоштовно 24/7" : "Free 24/7"}
                </div>
                <div className="text-white mt-2">+38 (044) 456 78 90</div>
                <div className="text-teal-300 text-xs">
                  {isUk ? "Адміністратор" : "Reception"}
                </div>
              </div>
            </div>

            {/* Hours */}
            <div>
              <h4 className="font-bold mb-3 text-teal-100">
                🕐 {isUk ? "Графік роботи" : "Working Hours"}
              </h4>
              <div className="space-y-1 text-sm text-teal-300">
                <div className="flex justify-between gap-4">
                  <span>{isUk ? "Пн – Пт" : "Mon – Fri"}</span>
                  <span className="text-white font-medium">08:00 – 20:00</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span>{isUk ? "Субота" : "Saturday"}</span>
                  <span className="text-white font-medium">09:00 – 17:00</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span>{isUk ? "Неділя" : "Sunday"}</span>
                  <span className="text-red-300 font-medium">
                    {isUk ? "Тільки екстрено" : "Emergency only"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-teal-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-teal-400">
            <span>© 2026 PetCare Vet Clinic. {isUk ? "Усі права захищені." : "All rights reserved."}</span>
            <span>{isUk ? "Розроблено з ❤️ для ваших улюбленців" : "Made with ❤️ for your pets"}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
