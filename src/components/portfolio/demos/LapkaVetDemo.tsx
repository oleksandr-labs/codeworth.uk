"use client";

import { useState } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    id: "vaccination",
    emoji: "💉",
    nameEn: "Vaccination",
    nameUk: "Вакцинація",
    descEn: "Full vaccination cycle for dogs, cats, and rabbits with international pet passport",
    descUk: "Повний цикл вакцинації для собак, котів та кроликів із міжнародним паспортом",
    price: "від 400 ₴",
    priceEn: "from 400 ₴",
    color: "bg-green-50 border-green-200",
  },
  {
    id: "surgery",
    emoji: "🏥",
    nameEn: "Surgery",
    nameUk: "Хірургія",
    descEn: "Spay/neuter, soft tissue surgery, orthopaedics, tumour removal",
    descUk: "Стерилізація, хірургія м'яких тканин, ортопедія, видалення пухлин",
    price: "від 1 500 ₴",
    priceEn: "from 1 500 ₴",
    color: "bg-emerald-50 border-emerald-200",
  },
  {
    id: "dental",
    emoji: "🦷",
    nameEn: "Dental Care",
    nameUk: "Стоматологія",
    descEn: "Ultrasonic cleaning, extractions, gum treatment under sedation",
    descUk: "Ультразвукове чищення, видалення, лікування ясен під седацією",
    price: "від 900 ₴",
    priceEn: "from 900 ₴",
    color: "bg-yellow-50 border-yellow-200",
  },
  {
    id: "ultrasound",
    emoji: "📡",
    nameEn: "Ultrasound",
    nameUk: "УЗД",
    descEn: "Abdominal and cardiac ultrasound with real-time imaging",
    descUk: "Абдомінальне та кардіологічне УЗД із візуалізацією в реальному часі",
    price: "від 500 ₴",
    priceEn: "from 500 ₴",
    color: "bg-lime-50 border-lime-200",
  },
  {
    id: "xray",
    emoji: "🩻",
    nameEn: "X-Ray",
    nameUk: "Рентген",
    descEn: "Digital X-ray diagnostics for bones, joints, and internal organs",
    descUk: "Цифрова рентген-діагностика кісток, суглобів та внутрішніх органів",
    price: "від 350 ₴",
    priceEn: "from 350 ₴",
    color: "bg-teal-50 border-teal-200",
  },
  {
    id: "lab",
    emoji: "🔬",
    nameEn: "Lab Tests",
    nameUk: "Лабораторні аналізи",
    descEn: "Blood work, urinalysis, cytology, rapid tests — results in 30 min",
    descUk: "Аналіз крові, сечі, цитологія, експрес-тести — результат за 30 хв",
    price: "від 250 ₴",
    priceEn: "from 250 ₴",
    color: "bg-green-50 border-green-300",
  },
  {
    id: "grooming",
    emoji: "✂️",
    nameEn: "Grooming",
    nameUk: "Грумінг",
    descEn: "Bathing, haircut, nail trimming, ear and teeth cleaning",
    descUk: "Купання, стрижка, обрізка кігтів, чищення вух і зубів",
    price: "від 450 ₴",
    priceEn: "from 450 ₴",
    color: "bg-amber-50 border-amber-200",
  },
  {
    id: "hotel",
    emoji: "🏨",
    nameEn: "Pet Hotel",
    nameUk: "Зооготель",
    descEn: "Comfortable boarding with daily walks, feeding, and vet supervision",
    descUk: "Комфортне перебування з щоденними прогулянками, годуванням та наглядом лікаря",
    price: "від 350 ₴/добу",
    priceEn: "from 350 ₴/day",
    color: "bg-yellow-50 border-yellow-300",
  },
];

const VACCINATION_SCHEDULE: Record<
  string,
  {
    labelEn: string;
    labelUk: string;
    milestones: {
      ageEn: string;
      ageUk: string;
      vaccineEn: string;
      vaccineUk: string;
      descEn: string;
      descUk: string;
    }[];
  }
> = {
  dog: {
    labelEn: "🐕 Dog",
    labelUk: "🐕 Собака",
    milestones: [
      {
        ageEn: "8 weeks",
        ageUk: "8 тижнів",
        vaccineEn: "DHPPi + Lepto",
        vaccineUk: "DHPPi + Лепто",
        descEn: "First combo vaccine: distemper, hepatitis, parvovirus, parainfluenza, leptospirosis",
        descUk: "Перша комплексна вакцина: чума, гепатит, парвовірус, парагрип, лептоспіроз",
      },
      {
        ageEn: "12 weeks",
        ageUk: "12 тижнів",
        vaccineEn: "DHPPi + Lepto (booster)",
        vaccineUk: "DHPPi + Лепто (ревакцинація)",
        descEn: "Booster shot to strengthen immunity, can add rabies vaccine",
        descUk: "Повторне щеплення для зміцнення імунітету, можна додати вакцину від сказу",
      },
      {
        ageEn: "6 months",
        ageUk: "6 місяців",
        vaccineEn: "Rabies",
        vaccineUk: "Сказ",
        descEn: "Mandatory rabies vaccination, required for pet passport",
        descUk: "Обов'язкова вакцинація від сказу, потрібна для паспорта тварини",
      },
      {
        ageEn: "1 year",
        ageUk: "1 рік",
        vaccineEn: "DHPPi + Lepto + Rabies",
        vaccineUk: "DHPPi + Лепто + Сказ",
        descEn: "Annual comprehensive booster for full protection",
        descUk: "Щорічна комплексна ревакцинація для повного захисту",
      },
      {
        ageEn: "Annual",
        ageUk: "Щорічно",
        vaccineEn: "Full combo + Rabies",
        vaccineUk: "Повний комплекс + Сказ",
        descEn: "Yearly booster to maintain lifelong immunity",
        descUk: "Щорічне підтримуюче щеплення для збереження імунітету на все життя",
      },
    ],
  },
  cat: {
    labelEn: "🐈 Cat",
    labelUk: "🐈 Кіт",
    milestones: [
      {
        ageEn: "8 weeks",
        ageUk: "8 тижнів",
        vaccineEn: "FVRCP",
        vaccineUk: "FVRCP",
        descEn: "Feline viral rhinotracheitis, calicivirus, panleukopenia",
        descUk: "Вірусний ринотрахеїт, каліцівірус, панлейкопенія",
      },
      {
        ageEn: "12 weeks",
        ageUk: "12 тижнів",
        vaccineEn: "FVRCP (booster) + FeLV",
        vaccineUk: "FVRCP (ревакцинація) + FeLV",
        descEn: "Booster plus feline leukemia virus vaccine",
        descUk: "Ревакцинація плюс вакцина від лейкемії котів",
      },
      {
        ageEn: "6 months",
        ageUk: "6 місяців",
        vaccineEn: "Rabies",
        vaccineUk: "Сказ",
        descEn: "Rabies vaccine, mandatory for travel documents",
        descUk: "Вакцина від сказу, обов'язкова для документів на подорож",
      },
      {
        ageEn: "1 year",
        ageUk: "1 рік",
        vaccineEn: "FVRCP + Rabies",
        vaccineUk: "FVRCP + Сказ",
        descEn: "Full annual booster for indoor and outdoor cats",
        descUk: "Повна щорічна ревакцинація для домашніх і вуличних котів",
      },
      {
        ageEn: "Annual",
        ageUk: "Щорічно",
        vaccineEn: "FVRCP + Rabies",
        vaccineUk: "FVRCP + Сказ",
        descEn: "Maintain immunity with yearly vaccination",
        descUk: "Підтримка імунітету щорічною вакцинацією",
      },
    ],
  },
  rabbit: {
    labelEn: "🐰 Rabbit",
    labelUk: "🐰 Кролик",
    milestones: [
      {
        ageEn: "8 weeks",
        ageUk: "8 тижнів",
        vaccineEn: "Myxomatosis",
        vaccineUk: "Міксоматоз",
        descEn: "Protection against myxomatosis, a serious viral disease",
        descUk: "Захист від міксоматозу — серйозного вірусного захворювання",
      },
      {
        ageEn: "12 weeks",
        ageUk: "12 тижнів",
        vaccineEn: "RHDV1 + RHDV2",
        vaccineUk: "RHDV1 + RHDV2",
        descEn: "Rabbit haemorrhagic disease vaccine — both strains",
        descUk: "Вакцина від геморагічної хвороби кроликів — обидва штами",
      },
      {
        ageEn: "6 months",
        ageUk: "6 місяців",
        vaccineEn: "Myxo + RHDV (booster)",
        vaccineUk: "Міксо + RHDV (ревакцинація)",
        descEn: "Combined booster for maximum protection",
        descUk: "Комбінована ревакцинація для максимального захисту",
      },
      {
        ageEn: "1 year",
        ageUk: "1 рік",
        vaccineEn: "Full combo booster",
        vaccineUk: "Повна комплексна ревакцинація",
        descEn: "Annual comprehensive vaccination renewal",
        descUk: "Щорічне оновлення комплексної вакцинації",
      },
      {
        ageEn: "Annual",
        ageUk: "Щорічно",
        vaccineEn: "Myxo + RHDV combo",
        vaccineUk: "Міксо + RHDV комплекс",
        descEn: "Yearly booster — essential for outdoor and indoor rabbits",
        descUk: "Щорічна ревакцинація — необхідна для домашніх і вуличних кроликів",
      },
    ],
  },
};

const DOCTORS = [
  {
    emoji: "👩‍⚕️",
    nameEn: "Dr. Iryna Bondarenko",
    nameUk: "Лікар Ірина Бондаренко",
    specEn: "Surgery & Orthopaedics",
    specUk: "Хірургія та ортопедія",
    eduEn: "NUBiP of Ukraine, 12 years experience",
    eduUk: "НУБіП України, 12 років досвіду",
    animalsEn: "Dogs, cats, rabbits",
    animalsUk: "Собаки, коти, кролики",
  },
  {
    emoji: "👨‍⚕️",
    nameEn: "Dr. Oleksandr Tkachuk",
    nameUk: "Лікар Олександр Ткачук",
    specEn: "Internal Medicine & Therapy",
    specUk: "Терапія та внутрішні хвороби",
    eduEn: "Lviv National University, 9 years experience",
    eduUk: "Львівський національний університет, 9 років досвіду",
    animalsEn: "Dogs, cats, guinea pigs",
    animalsUk: "Собаки, коти, морські свинки",
  },
  {
    emoji: "👩‍⚕️",
    nameEn: "Dr. Nataliia Shevchenko",
    nameUk: "Лікар Наталія Шевченко",
    specEn: "Dermatology & Allergology",
    specUk: "Дерматологія та алергологія",
    eduEn: "Kharkiv State Veterinary Academy, 7 years experience",
    eduUk: "Харківська державна ветеринарна академія, 7 років досвіду",
    animalsEn: "Dogs, cats, ferrets",
    animalsUk: "Собаки, коти, тхори",
  },
  {
    emoji: "👨‍⚕️",
    nameEn: "Dr. Dmytro Melnyk",
    nameUk: "Лікар Дмитро Мельник",
    specEn: "Exotic Animals",
    specUk: "Екзотичні тварини",
    eduEn: "Bila Tserkva NAU, 6 years experience",
    eduUk: "Білоцерківський НАУ, 6 років досвіду",
    animalsEn: "Parrots, turtles, reptiles, rabbits",
    animalsUk: "Папуги, черепахи, рептилії, кролики",
  },
];

const PHARMACY = [
  {
    emoji: "🛡️",
    nameEn: "Antiparasitics",
    nameUk: "Антипаразитарні засоби",
    descEn: "Flea, tick, and worm treatments for all pets",
    descUk: "Засоби від бліх, кліщів та гельмінтів для всіх тварин",
    priceEn: "120–650 ₴",
    priceUk: "120–650 ₴",
  },
  {
    emoji: "💊",
    nameEn: "Vitamins & Supplements",
    nameUk: "Вітаміни та добавки",
    descEn: "Joint support, coat health, immunity boosters",
    descUk: "Підтримка суглобів, здоров'я шерсті, зміцнення імунітету",
    priceEn: "180–900 ₴",
    priceUk: "180–900 ₴",
  },
  {
    emoji: "🍖",
    nameEn: "Premium Pet Food",
    nameUk: "Преміум корм",
    descEn: "Veterinary diets, hypoallergenic and grain-free options",
    descUk: "Ветеринарні дієти, гіпоалергенні та безглютенові варіанти",
    priceEn: "350–2 400 ₴",
    priceUk: "350–2 400 ₴",
  },
  {
    emoji: "🧴",
    nameEn: "Hygiene Products",
    nameUk: "Засоби гігієни",
    descEn: "Shampoos, ear cleaners, dental sprays, eye drops",
    descUk: "Шампуні, засоби для вух, спреї для зубів, краплі для очей",
    priceEn: "95–480 ₴",
    priceUk: "95–480 ₴",
  },
  {
    emoji: "🧸",
    nameEn: "Toys & Enrichment",
    nameUk: "Іграшки та розваги",
    descEn: "Interactive toys, chew items, puzzle feeders",
    descUk: "Інтерактивні іграшки, жувальні предмети, кормушки-головоломки",
    priceEn: "80–600 ₴",
    priceUk: "80–600 ₴",
  },
  {
    emoji: "🧳",
    nameEn: "Carriers & Travel",
    nameUk: "Переноски та подорожі",
    descEn: "IATA-approved carriers, car harnesses, travel bowls",
    descUk: "Переноски IATA, автомобільні шлейки, дорожні миски",
    priceEn: "450–3 200 ₴",
    priceUk: "450–3 200 ₴",
  },
];

const HEALTH_TIPS = [
  {
    emoji: "🦷",
    titleEn: "Dental Health Matters",
    titleUk: "Здоров'я зубів — це важливо",
    descEn:
      "80% of pets over 3 years have dental disease. Brush teeth weekly and schedule annual dental cleanings to prevent painful infections.",
    descUk:
      "80% домашніх тварин старше 3 років мають захворювання зубів. Чистіть зуби щотижня та плануйте щорічне професійне чищення.",
    tagEn: "Dental Care",
    tagUk: "Догляд за зубами",
  },
  {
    emoji: "🥗",
    titleEn: "Nutrition by Life Stage",
    titleUk: "Харчування за віком",
    descEn:
      "Puppies need 2–3x more calories per kilo than adults. Switch to senior food at age 7+ for large breeds. Consult your vet for a personalised diet plan.",
    descUk:
      "Цуценятам потрібно у 2–3 рази більше калорій на кг, ніж дорослим. Переходьте на корм для старших від 7 років для великих порід. Зверніться до лікаря для персонального плану.",
    tagEn: "Nutrition",
    tagUk: "Харчування",
  },
  {
    emoji: "🏃",
    titleEn: "Exercise for Every Pet",
    titleUk: "Активність для кожного улюбленця",
    descEn:
      "Dogs need 30–60 min of activity daily. Cats benefit from 15 min of interactive play. Regular exercise prevents obesity and reduces anxiety.",
    descUk:
      "Собакам потрібно 30–60 хв активності щодня. Котам корисні 15 хв інтерактивної гри. Регулярні вправи запобігають ожирінню та зменшують тривожність.",
    tagEn: "Exercise",
    tagUk: "Активність",
  },
];

const REVIEWS = [
  {
    nameEn: "Olha K.",
    nameUk: "Ольга К.",
    petEn: "Barsyk, 4-year-old cat",
    petUk: "Барсик, кіт 4 роки",
    textEn:
      "Barsyk was terrified of vets, but Dr. Shevchenko was so gentle that he actually purred during the exam! The clinic is clean, modern, and the staff truly care about animals.",
    textUk:
      "Барсик жахливо боявся лікарів, але Наталія Шевченко була настільки ніжною, що він навіть муркотів під час огляду! Клініка чиста, сучасна, а персонал справді дбає про тварин.",
    rating: 5,
  },
  {
    nameEn: "Andriy M.",
    nameUk: "Андрій М.",
    petEn: "Rex, 6-year-old German Shepherd",
    petUk: "Рекс, німецька вівчарка 6 років",
    textEn:
      "Rex needed knee surgery and Dr. Bondarenko did an amazing job. Recovery was smooth, and follow-up visits were thorough. Highly recommend their surgical team!",
    textUk:
      "Рексу потрібна була операція на коліно, і Ірина Бондаренко зробила чудову роботу. Відновлення пройшло гладко, а контрольні візити були ретельними. Дуже рекомендую їхню хірургічну команду!",
    rating: 5,
  },
  {
    nameEn: "Svitlana T.",
    nameUk: "Світлана Т.",
    petEn: "Kesha, 2-year-old parrot",
    petUk: "Кеша, папуга 2 роки",
    textEn:
      "Finding a vet for exotic birds is hard, but Dr. Melnyk is a true expert. He diagnosed Kesha's feather issue quickly and prescribed an effective treatment. We'll be back!",
    textUk:
      "Знайти лікаря для екзотичних птахів складно, але Дмитро Мельник — справжній експерт. Він швидко діагностував проблему з пір'ям Кеші та призначив ефективне лікування. Ми повернемось!",
    rating: 5,
  },
];

const NAV_ITEMS = [
  { en: "Services", uk: "Послуги" },
  { en: "Doctors", uk: "Лікарі" },
  { en: "Vaccination", uk: "Вакцинація" },
  { en: "Pharmacy", uk: "Аптека" },
  { en: "Contact", uk: "Контакти" },
];

const PET_TYPES_FORM = [
  { valueEn: "Dog", valueUk: "Собака", emoji: "🐕" },
  { valueEn: "Cat", valueUk: "Кіт", emoji: "🐈" },
  { valueEn: "Rabbit", valueUk: "Кролик", emoji: "🐰" },
  { valueEn: "Bird", valueUk: "Птах", emoji: "🦜" },
  { valueEn: "Turtle", valueUk: "Черепаха", emoji: "🐢" },
  { valueEn: "Other", valueUk: "Інше", emoji: "🐾" },
];

// ─── Component ───────────────────────────────────────────────────────────────

export function LapkaVetDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [vaccPet, setVaccPet] = useState<"dog" | "cat" | "rabbit">("dog");
  const [vaccMilestone, setVaccMilestone] = useState<number | null>(null);
  const [formPetType, setFormPetType] = useState("");
  const [formPetName, setFormPetName] = useState("");
  const [formService, setFormService] = useState("");
  const [formDate, setFormDate] = useState("");
  const [formOwner, setFormOwner] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formSent, setFormSent] = useState(false);

  const schedule = VACCINATION_SCHEDULE[vaccPet];

  return (
    <div className="min-h-screen bg-white text-gray-800 dark:text-neutral-200 font-sans">
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <header className="bg-white border-b border-green-100 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🐾</span>
            <span className="text-xl font-bold text-green-700">
              {isUk ? "Лапка" : "Lapka Vet"}
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-gray-600">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.en}
                className="hover:text-green-600 transition-colors"
              >
                {isUk ? item.uk : item.en}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <span className="bg-red-100 text-red-700 text-xs font-bold px-2.5 py-1 rounded-full shrink-0">
              🚨 {isUk ? "Екстрено 24/7" : "Emergency 24/7"}
            </span>
            <button className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
              {isUk ? "Записатись" : "Book Visit"}
            </button>
          </div>
        </div>
      </header>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="bg-linear-to-br from-green-50 via-yellow-50 to-white py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="text-5xl md:text-6xl mb-6 tracking-wider">
            🐕 🐈 🐹 🐰 🦜 🐢
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-green-800 mb-4 leading-tight">
            {isUk
              ? "Ваш Улюбленець Заслуговує Найкращого"
              : "Your Pet Deserves the Best"}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-neutral-300 max-w-2xl mx-auto mb-10">
            {isUk
              ? "Сучасна ветеринарна клініка з повним спектром послуг, турботливими лікарями та цілодобовою підтримкою"
              : "Modern full-service veterinary clinic with caring doctors and round-the-clock support"}
          </p>

          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {[
              {
                valueEn: "5 000+",
                valueUk: "5 000+",
                labelEn: "Happy patients",
                labelUk: "Щасливих пацієнтів",
                emoji: "🐾",
              },
              {
                valueEn: "8",
                valueUk: "8",
                labelEn: "Experienced vets",
                labelUk: "Досвідчених лікарів",
                emoji: "👩‍⚕️",
              },
              {
                valueEn: "24/7",
                valueUk: "24/7",
                labelEn: "Emergency care",
                labelUk: "Екстрена допомога",
                emoji: "🏥",
              },
            ].map((stat) => (
              <div key={stat.labelEn} className="text-center">
                <span className="text-2xl">{stat.emoji}</span>
                <p className="text-2xl md:text-3xl font-bold text-green-700 mt-1">
                  {isUk ? stat.valueUk : stat.valueEn}
                </p>
                <p className="text-sm text-gray-500">
                  {isUk ? stat.labelUk : stat.labelEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ────────────────────────────────────────────────────── */}
      <section className="py-16 bg-white dark:bg-neutral-950">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-green-800 mb-2">
            {isUk ? "Наші послуги" : "Our Services"}
          </h2>
          <p className="text-center text-gray-500 dark:text-neutral-400 mb-10">
            {isUk
              ? "Повний спектр ветеринарної допомоги під одним дахом"
              : "Full range of veterinary care under one roof"}
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.map((s) => (
              <div
                key={s.id}
                className={`rounded-xl border p-5 ${s.color} hover:shadow-md transition-shadow`}
              >
                <span className="text-3xl">{s.emoji}</span>
                <h3 className="font-bold text-gray-800 dark:text-neutral-200 mt-3 mb-1">
                  {isUk ? s.nameUk : s.nameEn}
                </h3>
                <p className="text-sm text-gray-600 dark:text-neutral-300 mb-3">
                  {isUk ? s.descUk : s.descEn}
                </p>
                <p className="text-sm font-semibold text-green-700">
                  {isUk ? s.price : s.priceEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vaccination Calendar ────────────────────────────────────────── */}
      <section className="py-16 bg-linear-to-br from-green-50 to-yellow-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-green-800 mb-2">
            💉 {isUk ? "Календар вакцинації" : "Vaccination Calendar"}
          </h2>
          <p className="text-center text-gray-500 dark:text-neutral-400 mb-8">
            {isUk
              ? "Оберіть тип тварини та дізнайтесь рекомендований графік щеплень"
              : "Select your pet type and see the recommended vaccination schedule"}
          </p>

          {/* Pet type tabs */}
          <div className="flex justify-center gap-3 mb-8">
            {(["dog", "cat", "rabbit"] as const).map((pet) => (
              <button
                key={pet}
                onClick={() => {
                  setVaccPet(pet);
                  setVaccMilestone(null);
                }}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                  vaccPet === pet
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-white text-gray-600 dark:text-neutral-300 border border-green-200 hover:border-green-400"
                }`}
              >
                {isUk ? schedule.labelUk : VACCINATION_SCHEDULE[pet].labelEn}
              </button>
            ))}
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Line */}
            <div className="hidden md:block absolute top-6 left-0 right-0 h-0.5 bg-green-200" />

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-2">
              {VACCINATION_SCHEDULE[vaccPet].milestones.map((m, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <button
                    onClick={() =>
                      setVaccMilestone(vaccMilestone === i ? null : i)
                    }
                    className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      vaccMilestone === i
                        ? "bg-green-600 text-white ring-4 ring-green-200 scale-110"
                        : "bg-white text-green-700 border-2 border-green-300 hover:border-green-500"
                    }`}
                  >
                    {i + 1}
                  </button>
                  <p className="text-xs font-semibold text-green-700 mt-2">
                    {isUk ? m.ageUk : m.ageEn}
                  </p>

                  {vaccMilestone === i && (
                    <div className="mt-3 bg-white dark:bg-neutral-800 rounded-xl border border-green-200 shadow-lg p-4 text-left w-full max-w-xs">
                      <p className="font-bold text-green-800 text-sm mb-1">
                        {isUk ? m.vaccineUk : m.vaccineEn}
                      </p>
                      <p className="text-xs text-gray-600">
                        {isUk ? m.descUk : m.descEn}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <p className="text-center text-xs text-gray-400 dark:text-neutral-500 mt-8">
            {isUk
              ? "⚕️ Графік може змінюватись — проконсультуйтесь з лікарем"
              : "⚕️ Schedule may vary — consult your veterinarian"}
          </p>
        </div>
      </section>

      {/* ── Doctors ─────────────────────────────────────────────────────── */}
      <section className="py-16 bg-white dark:bg-neutral-950">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-green-800 mb-2">
            {isUk ? "Наші лікарі" : "Our Doctors"}
          </h2>
          <p className="text-center text-gray-500 dark:text-neutral-400 mb-10">
            {isUk
              ? "Досвідчені спеціалісти, які люблять тварин"
              : "Experienced specialists who truly love animals"}
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {DOCTORS.map((d) => (
              <div
                key={d.nameEn}
                className="bg-green-50 rounded-xl border border-green-100 p-5 text-center hover:shadow-md transition-shadow"
              >
                <span className="text-4xl">{d.emoji}</span>
                <h3 className="font-bold text-gray-800 dark:text-neutral-200 mt-3 mb-1">
                  {isUk ? d.nameUk : d.nameEn}
                </h3>
                <p className="text-sm font-semibold text-green-600 mb-2">
                  {isUk ? d.specUk : d.specEn}
                </p>
                <p className="text-xs text-gray-500 dark:text-neutral-400 mb-2">
                  🎓 {isUk ? d.eduUk : d.eduEn}
                </p>
                <p className="text-xs text-gray-400">
                  🐾 {isUk ? d.animalsUk : d.animalsEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pet Pharmacy ────────────────────────────────────────────────── */}
      <section className="py-16 bg-linear-to-br from-yellow-50 to-green-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-green-800 mb-2">
            💊 {isUk ? "Зооаптека" : "Pet Pharmacy"}
          </h2>
          <p className="text-center text-gray-500 dark:text-neutral-400 mb-10">
            {isUk
              ? "Все необхідне для здоров'я та комфорту вашого улюбленця"
              : "Everything your pet needs for health and comfort"}
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PHARMACY.map((p) => (
              <div
                key={p.nameEn}
                className="bg-white rounded-xl border border-yellow-200 p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl shrink-0">{p.emoji}</span>
                  <div>
                    <h3 className="font-bold text-gray-800 dark:text-neutral-200 mb-1">
                      {isUk ? p.nameUk : p.nameEn}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-neutral-300 mb-2">
                      {isUk ? p.descUk : p.descEn}
                    </p>
                    <p className="text-sm font-semibold text-green-700">
                      {isUk ? p.priceUk : p.priceEn}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pet Health Tips ─────────────────────────────────────────────── */}
      <section className="py-16 bg-white dark:bg-neutral-950">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-green-800 mb-2">
            📚 {isUk ? "Поради для здоров'я" : "Pet Health Tips"}
          </h2>
          <p className="text-center text-gray-500 dark:text-neutral-400 mb-10">
            {isUk
              ? "Корисні статті від наших лікарів"
              : "Helpful articles from our veterinarians"}
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {HEALTH_TIPS.map((tip) => (
              <div
                key={tip.titleEn}
                className="bg-linear-to-br from-green-50 to-yellow-50 rounded-xl border border-green-100 p-6 hover:shadow-md transition-shadow"
              >
                <span className="text-3xl">{tip.emoji}</span>
                <span className="inline-block ml-2 text-xs font-semibold bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-full">
                  {isUk ? tip.tagUk : tip.tagEn}
                </span>
                <h3 className="font-bold text-gray-800 dark:text-neutral-200 mt-3 mb-2">
                  {isUk ? tip.titleUk : tip.titleEn}
                </h3>
                <p className="text-sm text-gray-600 dark:text-neutral-300 leading-relaxed">
                  {isUk ? tip.descUk : tip.descEn}
                </p>
                <button className="mt-4 text-sm font-semibold text-green-600 hover:text-green-800 transition-colors">
                  {isUk ? "Читати далі →" : "Read more →"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews ─────────────────────────────────────────────────────── */}
      <section className="py-16 bg-green-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-green-800 mb-10">
            ⭐ {isUk ? "Відгуки клієнтів" : "Client Reviews"}
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r) => (
              <div
                key={r.nameEn}
                className="bg-white rounded-xl border border-green-100 p-6 shadow-sm"
              >
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">
                      ⭐
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-600 dark:text-neutral-300 leading-relaxed mb-4 italic">
                  &ldquo;{isUk ? r.textUk : r.textEn}&rdquo;
                </p>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-neutral-200 text-sm">
                    {isUk ? r.nameUk : r.nameEn}
                  </p>
                  <p className="text-xs text-green-600">
                    🐾 {isUk ? r.petUk : r.petEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Booking Form ────────────────────────────────────────────────── */}
      <section className="py-16 bg-white dark:bg-neutral-950">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-green-800 mb-2">
            📋 {isUk ? "Запис на прийом" : "Book a Visit"}
          </h2>
          <p className="text-center text-gray-500 dark:text-neutral-400 mb-8">
            {isUk
              ? "Заповніть форму — ми зв'яжемось протягом 30 хвилин"
              : "Fill in the form — we will contact you within 30 minutes"}
          </p>

          {formSent ? (
            <div className="text-center bg-green-50 rounded-xl border border-green-200 p-8">
              <span className="text-5xl">✅</span>
              <h3 className="text-xl font-bold text-green-700 mt-4 mb-2">
                {isUk ? "Дякуємо за запис!" : "Thank you for booking!"}
              </h3>
              <p className="text-gray-600">
                {isUk
                  ? "Наш адміністратор зв'яжеться з вами найближчим часом"
                  : "Our administrator will contact you shortly"}
              </p>
              <button
                onClick={() => {
                  setFormSent(false);
                  setFormPetType("");
                  setFormPetName("");
                  setFormService("");
                  setFormDate("");
                  setFormOwner("");
                  setFormPhone("");
                }}
                className="mt-4 text-sm text-green-600 hover:text-green-800 font-semibold"
              >
                {isUk ? "← Новий запис" : "← New booking"}
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setFormSent(true);
              }}
              className="bg-green-50 rounded-xl border border-green-100 p-6 md:p-8 space-y-5"
            >
              {/* Pet type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-neutral-300 mb-2">
                  {isUk ? "Тип тварини" : "Pet Type"}
                </label>
                <div className="flex flex-wrap gap-2">
                  {PET_TYPES_FORM.map((pt) => (
                    <button
                      type="button"
                      key={pt.valueEn}
                      onClick={() =>
                        setFormPetType(isUk ? pt.valueUk : pt.valueEn)
                      }
                      className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                        formPetType === (isUk ? pt.valueUk : pt.valueEn)
                          ? "bg-green-600 text-white border-green-600"
                          : "bg-white text-gray-600 dark:text-neutral-300 border-green-200 hover:border-green-400"
                      }`}
                    >
                      {pt.emoji} {isUk ? pt.valueUk : pt.valueEn}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pet name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-neutral-300 mb-1">
                  {isUk ? "Ім'я улюбленця" : "Pet Name"}
                </label>
                <input
                  type="text"
                  value={formPetName}
                  onChange={(e) => setFormPetName(e.target.value)}
                  placeholder={isUk ? "Барсик, Рекс, Кеша..." : "Barsyk, Rex, Kesha..."}
                  className="w-full border border-green-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
                />
              </div>

              {/* Service */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-neutral-300 mb-1">
                  {isUk ? "Послуга" : "Service"}
                </label>
                <select
                  value={formService}
                  onChange={(e) => setFormService(e.target.value)}
                  className="w-full border border-green-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
                >
                  <option value="">
                    {isUk ? "Оберіть послугу..." : "Select a service..."}
                  </option>
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.emoji} {isUk ? s.nameUk : s.nameEn}
                    </option>
                  ))}
                </select>
              </div>

              {/* Preferred date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-neutral-300 mb-1">
                  {isUk ? "Бажана дата" : "Preferred Date"}
                </label>
                <input
                  type="date"
                  value={formDate}
                  onChange={(e) => setFormDate(e.target.value)}
                  className="w-full border border-green-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
                />
              </div>

              {/* Owner name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-neutral-300 mb-1">
                  {isUk ? "Ваше ім'я" : "Your Name"}
                </label>
                <input
                  type="text"
                  value={formOwner}
                  onChange={(e) => setFormOwner(e.target.value)}
                  placeholder={isUk ? "Прізвище та ім'я" : "Full name"}
                  className="w-full border border-green-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-neutral-300 mb-1">
                  {isUk ? "Телефон" : "Phone"}
                </label>
                <input
                  type="tel"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  placeholder="+380 __ ___ __ __"
                  className="w-full border border-green-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors text-sm"
              >
                {isUk ? "Записатись на прийом" : "Book Appointment"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="bg-green-900 text-green-100 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🐾</span>
                <span className="text-xl font-bold text-white">
                  {isUk ? "Ветклініка «Лапка»" : "Lapka Veterinary Clinic"}
                </span>
              </div>
              <p className="text-sm text-green-300 leading-relaxed">
                {isUk
                  ? "Сучасна ветеринарна клініка з турботою про кожного пацієнта. Працюємо для вас та ваших улюбленців."
                  : "Modern veterinary clinic with care for every patient. We work for you and your beloved pets."}
              </p>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-bold text-white mb-4">
                {isUk ? "Контакти" : "Contact"}
              </h3>
              <ul className="space-y-2 text-sm text-green-300">
                <li>
                  📍{" "}
                  {isUk
                    ? "вул. Зелена, 24, Київ, 01001"
                    : "24 Zelena St, Kyiv, 01001"}
                </li>
                <li>📞 +380 (44) 123-45-67</li>
                <li>
                  🚨{" "}
                  <span className="text-red-300 font-semibold">
                    {isUk ? "Екстрена лінія" : "Emergency"}: +380 (44) 123-45-00
                  </span>
                </li>
                <li>
                  ✉️ info@lapka-vet.ua
                </li>
              </ul>
            </div>

            {/* Hours & Social */}
            <div>
              <h3 className="font-bold text-white mb-4">
                {isUk ? "Графік роботи" : "Working Hours"}
              </h3>
              <ul className="space-y-2 text-sm text-green-300">
                <li>
                  🕐{" "}
                  {isUk
                    ? "Пн–Пт: 08:00 — 20:00"
                    : "Mon–Fri: 08:00 — 20:00"}
                </li>
                <li>
                  🕐{" "}
                  {isUk
                    ? "Сб–Нд: 09:00 — 18:00"
                    : "Sat–Sun: 09:00 — 18:00"}
                </li>
                <li>
                  🚨{" "}
                  <span className="text-yellow-300">
                    {isUk
                      ? "Екстрена допомога — цілодобово"
                      : "Emergency — 24/7"}
                  </span>
                </li>
              </ul>
              <div className="flex gap-3 mt-4">
                {["📘 Facebook", "📸 Instagram", "💬 Telegram"].map((s) => (
                  <button
                    key={s}
                    className="text-xs bg-green-800 hover:bg-green-700 px-3 py-1.5 rounded-full transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-green-800 mt-8 pt-6 text-center text-xs text-green-500">
            © 2026 {isUk ? "Ветклініка «Лапка»" : "Lapka Veterinary Clinic"}.{" "}
            {isUk ? "Усі права захищені." : "All rights reserved."}
          </div>
        </div>
      </footer>
    </div>
  );
}
