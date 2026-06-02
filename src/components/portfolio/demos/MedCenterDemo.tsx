"use client";

import { useState } from "react";

// ─── SVG Icons ────────────────────────────────────────────────────────────────

function IconHeart({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function IconBrain({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9.5 2a2.5 2.5 0 0 1 5 0c2.76 0 5 2.24 5 5 0 .95-.27 1.83-.72 2.59A4 4 0 0 1 20 13a4 4 0 0 1-4 4h-.5v2.5a1 1 0 0 1-2 0V17h-3a4 4 0 0 1-4-4 4 4 0 0 1 1.22-2.89A5 5 0 0 1 7 7c0-2.76 1.12-5 2.5-5z" />
    </svg>
  );
}

function IconBone({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="6.5" cy="6.5" r="2.5" />
      <circle cx="17.5" cy="6.5" r="2.5" />
      <circle cx="6.5" cy="17.5" r="2.5" />
      <circle cx="17.5" cy="17.5" r="2.5" />
      <path d="M8.5 8.5l7 7M15.5 8.5l-7 7" />
    </svg>
  );
}

function IconBaby({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="7" r="4" />
      <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
    </svg>
  );
}

function IconStomach({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M8 2c0 4-4 4-4 8s3 6 8 6 8-3 8-6-4-4-4-8" />
      <path d="M8 16v6" />
      <path d="M16 16v6" />
    </svg>
  );
}

function IconEye({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function IconDna({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2 15c6.667-6 13.333 0 20-6" />
      <path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993" />
      <path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993" />
      <path d="m17 6-2.5-2.5" />
      <path d="m14 8-1-1" />
      <path d="m7 18 2.5 2.5" />
      <path d="m3.5 14.5.5.5" />
      <path d="m20 9 .5.5" />
    </svg>
  );
}

function IconSkin({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <circle cx="9" cy="10" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="10" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconCheck({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function IconChevron({ open, className = "w-5 h-5" }: { open: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${open ? "rotate-180" : ""} ${className}`}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function IconShield({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function IconCalendar({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function IconFlask({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 3h6v11l3.2 5.3A2 2 0 0 1 16.5 22h-9a2 2 0 0 1-1.7-2.7L9 14V3z" />
      <line x1="6" y1="16" x2="18" y2="16" />
    </svg>
  );
}

// ─── Data ────────────────────────────────────────────────────────────────────

const DEPARTMENTS = [
  { id: "cardiology",     Icon: IconHeart,   nameEn: "Cardiology",        nameUk: "Кардіологія",        descEn: "Heart and cardiovascular diagnostics, treatment and prevention",          descUk: "Діагностика, лікування та профілактика захворювань серця і судин",     color: "bg-rose-50 border-rose-200 group-hover:border-rose-300",   iconColor: "bg-rose-100 text-rose-600" },
  { id: "neurology",      Icon: IconBrain,   nameEn: "Neurology",         nameUk: "Неврологія",         descEn: "Brain, spinal cord and peripheral nervous system disorders",              descUk: "Захворювання головного, спинного мозку та периферичної нервової системи", color: "bg-purple-50 border-purple-200 group-hover:border-purple-300", iconColor: "bg-purple-100 text-purple-600" },
  { id: "orthopedics",    Icon: IconBone,    nameEn: "Orthopedics",        nameUk: "Ортопедія",          descEn: "Bones, joints, ligaments and musculoskeletal system care",                descUk: "Лікування кісток, суглобів, зв'язок та опорно-рухового апарату",       color: "bg-amber-50 border-amber-200 group-hover:border-amber-300", iconColor: "bg-amber-100 text-amber-600" },
  { id: "pediatrics",     Icon: IconBaby,    nameEn: "Pediatrics",         nameUk: "Педіатрія",          descEn: "Comprehensive healthcare for infants, children and adolescents",         descUk: "Комплексна медична допомога для немовлят, дітей та підлітків",         color: "bg-pink-50 border-pink-200 group-hover:border-pink-300",   iconColor: "bg-pink-100 text-pink-600" },
  { id: "gastro",         Icon: IconStomach, nameEn: "Gastroenterology",   nameUk: "Гастроентерологія",  descEn: "Digestive system, stomach, liver and intestinal disorders",               descUk: "Захворювання шлунково-кишкового тракту, печінки та кишечника",         color: "bg-green-50 border-green-200 group-hover:border-green-300", iconColor: "bg-green-100 text-green-600" },
  { id: "ophthalmology",  Icon: IconEye,     nameEn: "Ophthalmology",      nameUk: "Офтальмологія",      descEn: "Eye exams, vision correction and ocular disease treatment",              descUk: "Перевірка зору, корекція та лікування очних захворювань",             color: "bg-sky-50 border-sky-200 group-hover:border-sky-300",     iconColor: "bg-sky-100 text-sky-600" },
  { id: "endocrinology",  Icon: IconDna,     nameEn: "Endocrinology",      nameUk: "Ендокринологія",     descEn: "Hormonal disorders, thyroid gland and diabetes management",              descUk: "Гормональні порушення, щитовидна залоза, лікування діабету",          color: "bg-indigo-50 border-indigo-200 group-hover:border-indigo-300", iconColor: "bg-indigo-100 text-indigo-600" },
  { id: "dermatology",    Icon: IconSkin,    nameEn: "Dermatology",        nameUk: "Дерматологія",       descEn: "Skin, hair and nail conditions, cosmetic dermatology",                   descUk: "Захворювання шкіри, волосся та нігтів, косметична дерматологія",      color: "bg-orange-50 border-orange-200 group-hover:border-orange-300", iconColor: "bg-orange-100 text-orange-600" },
];

const DOCTORS = [
  { id: 1, initials: "ОК", nameEn: "Dr. Olena Kovalenko, MD", nameUk: "Др. Олена Коваленко, MD", titleEn: "Chief Cardiologist, PhD", titleUk: "Головний кардіолог, к.м.н.", dept: "cardiology",    years: 18, langsEn: "Ukrainian, English, German",  langsUk: "Українська, Англійська, Німецька",  color: "bg-rose-100 text-rose-700" },
  { id: 2, initials: "АШ", nameEn: "Dr. Andriy Shevchuk, MD", nameUk: "Др. Андрій Шевчук, MD",   titleEn: "Neurologist, PhD",         titleUk: "Невролог, к.м.н.",          dept: "neurology",     years: 12, langsEn: "Ukrainian, English",           langsUk: "Українська, Англійська",            color: "bg-purple-100 text-purple-700" },
  { id: 3, initials: "ІБ", nameEn: "Dr. Iryna Bondar, MD",    nameUk: "Др. Ірина Бондар, MD",    titleEn: "Pediatrician",             titleUk: "Педіатр",                   dept: "pediatrics",    years: 15, langsEn: "Ukrainian, English, Polish",  langsUk: "Українська, Англійська, Польська",  color: "bg-pink-100 text-pink-700" },
  { id: 4, initials: "МТ", nameEn: "Dr. Mykola Tkachenko, MD",nameUk: "Др. Микола Ткаченко, MD", titleEn: "Orthopedic Surgeon, PhD",  titleUk: "Хірург-ортопед, к.м.н.",    dept: "orthopedics",   years: 20, langsEn: "Ukrainian, English",           langsUk: "Українська, Англійська",            color: "bg-amber-100 text-amber-700" },
  { id: 5, initials: "НЛ", nameEn: "Dr. Natalia Lysenko, MD", nameUk: "Др. Наталія Лисенко, MD", titleEn: "Gastroenterologist",       titleUk: "Гастроентеролог",           dept: "gastro",        years: 10, langsEn: "Ukrainian, English, French",  langsUk: "Українська, Англійська, Французька",color: "bg-green-100 text-green-700" },
  { id: 6, initials: "ВМ", nameEn: "Dr. Viktor Moroz, MD",    nameUk: "Др. Віктор Мороз, MD",    titleEn: "Ophthalmologist, PhD",     titleUk: "Офтальмолог, к.м.н.",       dept: "ophthalmology", years: 14, langsEn: "Ukrainian, English",           langsUk: "Українська, Англійська",            color: "bg-sky-100 text-sky-700" },
];

const CHECKUP_PACKAGES = [
  {
    id: "basic",
    nameEn: "Basic Checkup",
    nameUk: "Базовий Чекап",
    price: "₴ 2 500",
    badge: "",
    badgeColor: "",
    ring: false,
    itemsEn: ["General blood test", "Urinalysis", "Blood glucose level", "ECG", "Therapist consultation", "Blood pressure monitoring"],
    itemsUk: ["Загальний аналіз крові", "Аналіз сечі", "Рівень цукру в крові", "ЕКГ", "Консультація терапевта", "Моніторинг артеріального тиску"],
  },
  {
    id: "comprehensive",
    nameEn: "Comprehensive Checkup",
    nameUk: "Комплексний Чекап",
    price: "₴ 5 500",
    badge: "Popular",
    badgeColor: "bg-teal-600 text-white",
    ring: true,
    itemsEn: ["All Basic tests", "Thyroid panel (TSH, T3, T4)", "Liver function test", "Kidney function test", "Lipid profile", "Abdominal ultrasound", "Chest X-ray", "Cardiologist consultation"],
    itemsUk: ["Всі базові аналізи", "Щитовидна панель (ТТГ, Т3, Т4)", "Печінкові проби", "Ниркові проби", "Ліпідний профіль", "УЗД черевної порожнини", "Рентген грудної клітки", "Консультація кардіолога"],
  },
  {
    id: "premium",
    nameEn: "Premium Checkup",
    nameUk: "Преміум Чекап",
    price: "₴ 9 900",
    badge: "VIP",
    badgeColor: "bg-amber-500 text-white",
    ring: false,
    itemsEn: ["All Comprehensive tests", "Tumor markers panel", "Hormonal profile", "MRI brain scan", "Echocardiography", "Colonoscopy", "Gastroscopy", "Full ophthalmology exam", "Personal health report"],
    itemsUk: ["Всі комплексні аналізи", "Панель онкомаркерів", "Гормональний профіль", "МРТ головного мозку", "Ехокардіографія", "Колоноскопія", "Гастроскопія", "Повний офтальмологічний огляд", "Персональний звіт про здоров'я"],
  },
];

const BODY_AREAS = [
  { id: "head",    emoji: "🧠", nameEn: "Head",    nameUk: "Голова",        symptomsEn: ["Headache / Migraine", "Dizziness", "Vision problems", "Memory issues", "Ear pain"],       symptomsUk: ["Головний біль / Мігрень", "Запаморочення", "Проблеми із зором", "Проблеми з пам'яттю", "Біль у вухах"],         deptEn: "Neurology or Ophthalmology", deptUk: "Неврологія або Офтальмологія" },
  { id: "chest",   emoji: "❤️", nameEn: "Chest",   nameUk: "Грудна клітка", symptomsEn: ["Chest pain", "Shortness of breath", "Heart palpitations", "Cough", "High BP"],          symptomsUk: ["Біль у грудях", "Задишка", "Прискорене серцебиття", "Кашель", "Високий тиск"],                                deptEn: "Cardiology",                 deptUk: "Кардіологія" },
  { id: "abdomen", emoji: "🤢", nameEn: "Abdomen", nameUk: "Живіт",         symptomsEn: ["Stomach pain", "Nausea / Vomiting", "Bloating", "Acid reflux", "Appetite changes"],    symptomsUk: ["Біль у шлунку", "Нудота / Блювання", "Здуття", "Печія", "Зміни апетиту"],                                    deptEn: "Gastroenterology",           deptUk: "Гастроентерологія" },
  { id: "limbs",   emoji: "🦵", nameEn: "Limbs",   nameUk: "Кінцівки",      symptomsEn: ["Joint pain", "Swelling", "Numbness / Tingling", "Limited mobility", "Weakness"],        symptomsUk: ["Біль у суглобах", "Набряки", "Оніміння / Поколювання", "Обмежена рухливість", "Слабкість"],                  deptEn: "Orthopedics",               deptUk: "Ортопедія" },
  { id: "back",    emoji: "🔙", nameEn: "Back",    nameUk: "Спина",         symptomsEn: ["Lower back pain", "Upper back pain", "Sciatica", "Stiffness", "Posture issues"],         symptomsUk: ["Біль у попереку", "Біль у верхній частині спини", "Ішіас", "Скутість", "Проблеми з поставою"],              deptEn: "Orthopedics or Neurology",  deptUk: "Ортопедія або Неврологія" },
  { id: "general", emoji: "🌡️", nameEn: "General", nameUk: "Загальне",      symptomsEn: ["Fatigue", "Fever", "Weight changes", "Sleep problems", "Skin issues"],                  symptomsUk: ["Втома", "Підвищена температура", "Зміна ваги", "Проблеми зі сном", "Проблеми зі шкірою"],                  deptEn: "Endocrinology or Dermatology", deptUk: "Ендокринологія або Дерматологія" },
];

const INSURANCE = [
  { name: "UNIQA",             direct: true },
  { name: "PZU Україна",       direct: true },
  { name: "INGO",              direct: true },
  { name: "Arsenal Insurance", direct: true },
  { name: "Universalna",       direct: false },
  { name: "TAS Insurance",     direct: false },
  { name: "Allianz Ukraine",   direct: false },
  { name: "Euroins Ukraine",   direct: false },
];

const REVIEWS = [
  { nameEn: "Anna M.",    nameUk: "Анна М.",    deptEn: "Cardiology — Dr. Kovalenko", deptUk: "Кардіологія — Др. Коваленко", rating: 5, textEn: "Dr. Kovalenko took her time to explain everything about my condition. After three months of treatment my results improved dramatically. Outstanding cardiologist!", textUk: "Др. Коваленко приділила час, щоб пояснити все про мій стан. Через три місяці результати значно покращились. Видатний кардіолог!" },
  { nameEn: "Dmytro K.",  nameUk: "Дмитро К.", deptEn: "Orthopedics — Dr. Tkachenko",deptUk: "Ортопедія — Др. Ткаченко",   rating: 5, textEn: "Had knee surgery with Dr. Tkachenko. The entire process from consultation to recovery was smooth. Back to sports in 4 months!", textUk: "Мав операцію на коліні у Др. Ткаченка. Весь процес від консультації до відновлення пройшов чудово. Повернувся до спорту за 4 місяці!" },
  { nameEn: "Oksana V.",  nameUk: "Оксана В.", deptEn: "Pediatrics — Dr. Bondar",    deptUk: "Педіатрія — Др. Бондар",     rating: 5, textEn: "We bring both our children here. Dr. Bondar is wonderful with kids — patient, gentle and thorough. The pediatric wing is colorful and welcoming.", textUk: "Ми приводимо обох дітей сюди. Др. Бондар чудово працює з дітьми — терпляча, ніжна і ретельна. Педіатричне відділення яскраве та привітне." },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function MedCenterDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [deptFilter, setDeptFilter] = useState("all");
  const filteredDoctors = deptFilter === "all" ? DOCTORS : DOCTORS.filter((d) => d.dept === deptFilter);

  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const activeArea = BODY_AREAS.find((a) => a.id === selectedArea);

  const [labId, setLabId] = useState("");
  const [labDob, setLabDob] = useState("");
  const [labMsg, setLabMsg] = useState("");

  const t = {
    nav:         isUk ? ["Відділення", "Лікарі", "Чекап", "Контакти"] : ["Departments", "Doctors", "Checkups", "Contact"],
    bookAppt:    isUk ? "Записатися" : "Book Appointment",
    emergency:   isUk ? "Екстрена" : "Emergency",
    heroH:       isUk ? "Ваше Здоров'я — Наш Пріоритет" : "Your Health — Our Priority",
    heroP:       isUk ? "Сучасна медицина з індивідуальним підходом. Понад 50 висококваліфікованих лікарів, передове обладнання та повний спектр медичних послуг для вашої родини." : "Modern medicine with a personalized approach. Over 50 highly qualified doctors, cutting-edge equipment and a full range of medical services for your family.",
    heroCta1:    isUk ? "Записатись на прийом" : "Schedule Appointment",
    heroCta2:    isUk ? "Наші відділення" : "Our Departments",
    deptTitle:   isUk ? "Наші Відділення" : "Our Departments",
    deptSub:     isUk ? "Повний спектр медичних послуг під одним дахом" : "Full range of medical services under one roof",
    viewDoctors: isUk ? "Переглянути лікарів" : "View Doctors",
    docTitle:    isUk ? "Наші Лікарі" : "Our Doctors",
    docSub:      isUk ? "Команда досвідчених фахівців, які дбають про ваше здоров'я" : "A team of experienced specialists who care about your health",
    allDepts:    isUk ? "Всі відділення" : "All Departments",
    yearsExp:    isUk ? "р. досвіду" : "yrs exp.",
    langs:       isUk ? "Мови" : "Languages",
    book:        isUk ? "Записатися" : "Book",
    checkupTitle:isUk ? "Пакети Чекапів" : "Health Checkup Packages",
    checkupSub:  isUk ? "Регулярний медичний огляд — найкраща інвестиція у ваше здоров'я" : "Regular health screening is the best investment in your well-being",
    choose:      isUk ? "Обрати пакет" : "Choose Package",
    symptomTitle:isUk ? "Перевірка Симптомів" : "Symptom Checker",
    symptomSub:  isUk ? "Оберіть область тіла, щоб побачити симптоми і рекомендованого спеціаліста" : "Select a body area to see common symptoms and recommended specialist",
    commonSymp:  isUk ? "Поширені симптоми" : "Common Symptoms",
    recoDept:    isUk ? "Рекомендоване відділення" : "Recommended Department",
    bookSpec:    isUk ? "Записатися до спеціаліста" : "Book with Specialist",
    insTitle:    isUk ? "Страхові партнери" : "Insurance Partners",
    insSub:      isUk ? "Ми працюємо з провідними страховими компаніями України" : "We work with leading insurance companies in Ukraine",
    directBill:  isUk ? "Пряме виставлення рахунків" : "Direct Billing",
    labTitle:    isUk ? "Результати Аналізів Онлайн" : "Lab Results Online",
    labSub:      isUk ? "Отримайте результати аналізів, не виходячи з дому" : "Access your test results from the comfort of your home",
    labIdPh:     isUk ? "Номер направлення" : "Referral Number",
    labDobPh:    isUk ? "Дата народження" : "Date of Birth",
    labBtn:      isUk ? "Переглянути результати" : "View Results",
    revTitle:    isUk ? "Відгуки Пацієнтів" : "Patient Reviews",
    revSub:      isUk ? "Що кажуть наші пацієнти про якість медичної допомоги" : "What our patients say about the quality of care",
    contactTitle:isUk ? "Контакти" : "Contact Us",
    contactSub:  isUk ? "Два сучасних медичних центри у вашому місті" : "Two modern medical centers in your city",
    loc1:        isUk ? "Центральне відділення" : "Central Branch",
    loc2:        isUk ? "Західне відділення" : "West Branch",
    addr1:       isUk ? "вул. Хрещатик, 22, Київ" : "22 Khreshchatyk St, Kyiv",
    addr2:       isUk ? "просп. Перемоги, 105, Київ" : "105 Peremohy Ave, Kyiv",
    workHours:   isUk ? "Графік роботи" : "Working Hours",
    monFri:      isUk ? "Пн–Пт: 08:00–20:00" : "Mon–Fri: 08:00–20:00",
    sat:         isUk ? "Сб: 09:00–17:00" : "Sat: 09:00–17:00",
    sun:         isUk ? "Нд: 10:00–15:00" : "Sun: 10:00–15:00",
    emrHours:    isUk ? "Екстрена допомога: 24/7" : "Emergency: 24/7",
    footerDesc:  isUk ? "МедЦентр «Здоров'я» — сучасний багатопрофільний медичний центр з понад 15-річним досвідом надання якісних медичних послуг." : "MedCenter \"Health\" — a modern multidisciplinary medical center with over 15 years of experience providing quality healthcare.",
    accred:      isUk ? "Акредитація" : "Accreditation",
    rights:      isUk ? "Усі права захищені" : "All rights reserved",
  };

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" className="w-4 h-4">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <span className="text-base font-bold text-slate-900 leading-tight">
              {isUk ? "МедЦентр Здоров'я" : "MedCenter Health"}
            </span>
          </div>

          <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
            {t.nav.map((n) => (
              <button key={n} onClick={() => scrollTo(n.toLowerCase())} className="hover:text-teal-600 transition-colors">
                {n}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-xs font-bold text-red-600 bg-red-50 border border-red-100 px-2 py-1 rounded-lg">
              {t.emergency}: 103
            </span>
            <button className="bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
              {t.bookAppt}
            </button>
          </div>
        </div>
      </header>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-teal-50/60 via-white to-slate-50/40" />
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-teal-100 text-teal-700 text-xs font-bold px-3 py-1.5 rounded-full mb-5 uppercase tracking-wider">
              {isUk ? "Багатопрофільний медичний центр" : "Multidisciplinary Medical Center"}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-4">
              {t.heroH}
            </h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg">
              {t.heroP}
            </p>
            <div className="flex flex-wrap gap-3 mb-12">
              <button onClick={() => scrollTo("booking")} className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-lg shadow-teal-200/60">
                {t.heroCta1}
              </button>
              <button onClick={() => scrollTo("departments")} className="border-2 border-teal-600 text-teal-600 hover:bg-teal-50 font-semibold px-6 py-3 rounded-lg transition-colors">
                {t.heroCta2}
              </button>
            </div>
            <div className="flex flex-wrap gap-8">
              {[
                { val: "15+",  labelUk: "Відділень",     labelEn: "Departments" },
                { val: "50+",  labelUk: "Лікарів",       labelEn: "Doctors" },
                { val: "10K+", labelUk: "Пацієнтів/рік", labelEn: "Patients/yr" },
              ].map((s) => (
                <div key={s.val}>
                  <div className="text-3xl font-extrabold text-teal-600">{s.val}</div>
                  <div className="text-sm text-slate-500">{isUk ? s.labelUk : s.labelEn}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero dashboard card */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 max-w-sm ml-auto">
              {/* Weekly stats */}
              <div className="flex items-center justify-between mb-5 pb-5 border-b border-slate-100">
                <div>
                  <div className="text-xs text-slate-400 uppercase tracking-wide mb-1">{isUk ? "Цього тижня" : "This week"}</div>
                  <div className="text-3xl font-extrabold text-slate-900">284</div>
                  <div className="text-sm text-teal-600 font-medium">{isUk ? "записів на прийом" : "appointments"}</div>
                </div>
                <div className="w-14 h-14 rounded-xl bg-teal-50 flex items-center justify-center">
                  <IconCalendar className="w-7 h-7 text-teal-600" />
                </div>
              </div>
              {/* Dept list */}
              <div className="space-y-3 mb-5">
                {[
                  { Icon: IconHeart,   nameUk: "Кардіологія",  nameEn: "Cardiology",  slots: 12, color: "text-rose-500 bg-rose-50" },
                  { Icon: IconBrain,   nameUk: "Неврологія",   nameEn: "Neurology",   slots: 8,  color: "text-purple-500 bg-purple-50" },
                  { Icon: IconBaby,    nameUk: "Педіатрія",    nameEn: "Pediatrics",  slots: 15, color: "text-pink-500 bg-pink-50" },
                ].map(({ Icon, nameUk, nameEn, slots, color }) => (
                  <div key={nameEn} className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium text-slate-700">{isUk ? nameUk : nameEn}</span>
                    </div>
                    <span className="text-xs text-teal-600 font-semibold bg-teal-50 px-2 py-0.5 rounded-full">
                      {slots} {isUk ? "слотів" : "slots"}
                    </span>
                  </div>
                ))}
              </div>
              {/* Emergency */}
              <div className="bg-red-50 border border-red-100 rounded-lg px-3 py-2.5 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-red-700 text-xs font-bold">{isUk ? "Екстрена допомога: 24/7 · 103" : "Emergency: 24/7 · 103"}</span>
              </div>
            </div>
            <div className="flex gap-2 mt-3 justify-end">
              {["ISO 9001", "МОЗ Ліцензія", "UNIQA Partner"].map((b) => (
                <span key={b} className="bg-white border border-slate-200 shadow-sm rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-600">
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Departments ──────────────────────────────────────────────────── */}
      <section id="departments" className="bg-slate-50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">{t.deptTitle}</h2>
            <p className="text-slate-500">{t.deptSub}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {DEPARTMENTS.map((d) => (
              <div key={d.id} className={`rounded-xl border p-5 ${d.color} hover:shadow-md transition-all group cursor-default`}>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${d.iconColor}`}>
                  <d.Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 mb-1.5">{isUk ? d.nameUk : d.nameEn}</h3>
                <p className="text-sm text-slate-600 mb-3 leading-relaxed">{isUk ? d.descUk : d.descEn}</p>
                <button className="text-teal-700 text-sm font-semibold hover:underline">{t.viewDoctors} →</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Doctors ──────────────────────────────────────────────────────── */}
      <section id="doctors" className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">{t.docTitle}</h2>
            <p className="text-slate-500">{t.docSub}</p>
          </div>

          {/* Department filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              onClick={() => setDeptFilter("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${deptFilter === "all" ? "bg-teal-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
            >
              {t.allDepts}
            </button>
            {DEPARTMENTS.map((d) => (
              <button
                key={d.id}
                onClick={() => setDeptFilter(d.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${deptFilter === d.id ? "bg-teal-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
              >
                {isUk ? d.nameUk : d.nameEn}
              </button>
            ))}
          </div>

          {/* Doctor cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doc) => {
              const dept = DEPARTMENTS.find((d) => d.id === doc.dept);
              return (
                <div key={doc.id} className="border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-teal-200 transition-all bg-white">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-base font-bold shrink-0 ${doc.color}`}>
                      {doc.initials}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{isUk ? doc.nameUk : doc.nameEn}</h4>
                      <p className="text-sm text-teal-600 font-medium">{isUk ? doc.titleUk : doc.titleEn}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-slate-600 mb-5">
                    <div className="flex justify-between">
                      <span className="text-slate-400">{isUk ? "Відділення" : "Department"}</span>
                      <span className="font-medium text-slate-900">{isUk ? dept?.nameUk : dept?.nameEn}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">{isUk ? "Досвід" : "Experience"}</span>
                      <span className="font-medium text-slate-900">{doc.years} {t.yearsExp}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">{t.langs}</span>
                      <span className="font-medium text-slate-900 text-right">{isUk ? doc.langsUk : doc.langsEn}</span>
                    </div>
                  </div>
                  <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm">
                    {t.book}
                  </button>
                </div>
              );
            })}
          </div>

          {filteredDoctors.length === 0 && (
            <p className="text-center text-slate-400 py-10">
              {isUk ? "Лікарі у цьому відділенні скоро з'являться" : "Doctors in this department coming soon"}
            </p>
          )}
        </div>
      </section>

      {/* ── Checkup Packages ─────────────────────────────────────────────── */}
      <section className="bg-slate-50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">{t.checkupTitle}</h2>
            <p className="text-slate-500">{t.checkupSub}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {CHECKUP_PACKAGES.map((pkg) => (
              <div key={pkg.id} className={`rounded-2xl border-2 p-6 flex flex-col relative bg-white transition-shadow hover:shadow-lg ${pkg.ring ? "border-teal-500 shadow-md shadow-teal-100" : "border-slate-200"}`}>
                {pkg.badge && (
                  <span className={`absolute -top-3 right-5 text-xs font-bold px-3 py-1 rounded-full ${pkg.badgeColor}`}>
                    {pkg.badge}
                  </span>
                )}
                <h3 className="text-xl font-bold text-slate-900 mb-1">{isUk ? pkg.nameUk : pkg.nameEn}</h3>
                <div className={`text-3xl font-extrabold mb-4 ${pkg.ring ? "text-teal-600" : "text-slate-900"}`}>{pkg.price}</div>
                <ul className="space-y-2.5 mb-6 flex-1">
                  {(isUk ? pkg.itemsUk : pkg.itemsEn).map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                      <span className="text-emerald-500 mt-0.5 shrink-0"><IconCheck className="w-4 h-4" /></span>
                      {item}
                    </li>
                  ))}
                </ul>
                <button className={`w-full font-semibold py-3 rounded-lg transition-colors ${pkg.ring ? "bg-teal-600 hover:bg-teal-700 text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-800"}`}>
                  {t.choose}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Symptom Checker ──────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">{t.symptomTitle}</h2>
            <p className="text-slate-500 max-w-xl mx-auto">{t.symptomSub}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Body map */}
            <div className="grid grid-cols-3 gap-3">
              {BODY_AREAS.map((area) => (
                <button
                  key={area.id}
                  onClick={() => setSelectedArea(selectedArea === area.id ? null : area.id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${selectedArea === area.id ? "border-teal-500 bg-teal-50 shadow-md" : "border-slate-200 bg-white hover:border-teal-300"}`}
                >
                  <span className="text-3xl">{area.emoji}</span>
                  <span className="text-xs font-medium text-slate-700">{isUk ? area.nameUk : area.nameEn}</span>
                </button>
              ))}
            </div>
            {/* Results panel */}
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 min-h-70 flex flex-col">
              {activeArea ? (
                <>
                  <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <span>{activeArea.emoji}</span>
                    {isUk ? activeArea.nameUk : activeArea.nameEn}
                  </h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">{t.commonSymp}:</p>
                  <ul className="space-y-1.5 mb-5">
                    {(isUk ? activeArea.symptomsUk : activeArea.symptomsEn).map((s, i) => (
                      <li key={i} className="text-sm text-slate-700 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                  <div className="bg-teal-50 border border-teal-200 rounded-lg p-3 mb-4">
                    <p className="text-sm text-teal-800">
                      <span className="font-bold">{t.recoDept}:</span>{" "}
                      {isUk ? activeArea.deptUk : activeArea.deptEn}
                    </p>
                  </div>
                  <button className="mt-auto w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm">
                    {t.bookSpec}
                  </button>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-center">
                  <div>
                    <div className="w-16 h-16 rounded-full bg-teal-50 border-2 border-teal-100 flex items-center justify-center mx-auto mb-3">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-8 h-8 text-teal-400">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                      </svg>
                    </div>
                    <p className="text-sm text-slate-400">
                      {isUk ? "Оберіть область тіла зліва, щоб побачити симптоми та рекомендації" : "Select a body area on the left to view symptoms and recommendations"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Insurance ────────────────────────────────────────────────────── */}
      <section className="bg-slate-50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">{t.insTitle}</h2>
            <p className="text-slate-500">{t.insSub}</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {INSURANCE.map((ins) => (
              <div key={ins.name} className="bg-white border border-slate-200 rounded-xl p-4 text-center hover:shadow-md hover:border-teal-200 transition-all">
                <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center mx-auto mb-3">
                  <IconShield className="w-5 h-5 text-teal-600" />
                </div>
                <p className="font-semibold text-slate-900 text-sm mb-1">{ins.name}</p>
                {ins.direct && (
                  <span className="inline-block text-xs bg-emerald-100 text-emerald-700 font-semibold px-2 py-0.5 rounded-full">
                    {t.directBill}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Lab Results ──────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-xl mx-auto px-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-teal-50 flex items-center justify-center mx-auto mb-4">
            <IconFlask className="w-8 h-8 text-teal-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-3">{t.labTitle}</h2>
          <p className="text-slate-500 mb-8">{t.labSub}</p>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <div className="space-y-3 mb-4">
              <input
                type="text"
                value={labId}
                onChange={(e) => { setLabId(e.target.value); setLabMsg(""); }}
                placeholder={t.labIdPh}
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all bg-white"
              />
              <input
                type="text"
                value={labDob}
                onChange={(e) => { setLabDob(e.target.value); setLabMsg(""); }}
                placeholder={t.labDobPh}
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all bg-white"
              />
            </div>
            <button
              onClick={() => setLabMsg(isUk ? "Демо-режим: результати з'являться у вашому особистому кабінеті" : "Demo mode: results will appear in your personal account")}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm"
            >
              {t.labBtn}
            </button>
            {labMsg && (
              <p className="mt-3 text-sm text-teal-700 bg-teal-50 rounded-lg p-3 border border-teal-100">
                {labMsg}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── Reviews ──────────────────────────────────────────────────────── */}
      <section className="bg-slate-50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">{t.revTitle}</h2>
            <p className="text-slate-500">{t.revSub}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md hover:border-teal-200 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-base font-bold text-teal-700 shrink-0">
                    {(isUk ? r.nameUk : r.nameEn).charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{isUk ? r.nameUk : r.nameEn}</p>
                    <p className="text-xs text-slate-500">{isUk ? r.deptUk : r.deptEn}</p>
                  </div>
                </div>
                <div className="text-amber-400 text-sm mb-3">{"★".repeat(r.rating)}</div>
                <p className="text-sm text-slate-600 leading-relaxed">&ldquo;{isUk ? r.textUk : r.textEn}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ──────────────────────────────────────────────────────── */}
      <section id="contact" className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">{t.contactTitle}</h2>
            <p className="text-slate-500">{t.contactSub}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {[
              { label: t.loc1, addr: t.addr1, phone: "+380 (44) 123-45-67", email: "central@medcenter-health.ua", color: "bg-teal-600", accentBg: "bg-teal-50" },
              { label: t.loc2, addr: t.addr2, phone: "+380 (44) 765-43-21", email: "west@medcenter-health.ua",    color: "bg-teal-500", accentBg: "bg-teal-50" },
            ].map((loc) => (
              <div key={loc.label} className="border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                <div className={`${loc.accentBg} h-36 flex items-center justify-center relative overflow-hidden`}>
                  <div className={`w-20 h-20 rounded-2xl ${loc.color} flex items-center justify-center shadow-lg`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div className="absolute inset-0 opacity-5">
                    <div className="w-full h-full" style={{ backgroundImage: "radial-gradient(circle, #0d9488 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-slate-900 mb-2">{loc.label}</h3>
                  <p className="text-sm text-slate-600 mb-1">{loc.addr}</p>
                  <p className="text-sm text-slate-600 mb-1">{loc.phone}</p>
                  <p className="text-sm text-teal-600 font-medium">{loc.email}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 max-w-lg mx-auto text-center">
            <h3 className="font-bold text-slate-900 mb-3 text-lg">🕐 {t.workHours}</h3>
            <div className="space-y-1.5 text-sm text-slate-600">
              <p>{t.monFri}</p>
              <p>{t.sat}</p>
              <p>{t.sun}</p>
              <p className="text-red-600 font-bold mt-3">{t.emrHours}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="bg-slate-900 text-slate-400 py-14 px-4">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" className="w-4 h-4">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <p className="text-base font-bold text-white">{isUk ? "МедЦентр Здоров'я" : "MedCenter Health"}</p>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">{t.footerDesc}</p>
            <p className="mt-3 text-red-400 font-bold text-sm">103 — {isUk ? "Екстрена допомога" : "Emergency"}</p>
          </div>
          <div>
            <p className="font-semibold text-white mb-4">{isUk ? "Відділення" : "Departments"}</p>
            <ul className="space-y-2 text-sm">
              {DEPARTMENTS.slice(0, 6).map((d) => (
                <li key={d.id} className="hover:text-white transition-colors cursor-pointer">{isUk ? d.nameUk : d.nameEn}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold text-white mb-4">{isUk ? "Послуги" : "Services"}</p>
            <ul className="space-y-2 text-sm">
              {[
                isUk ? "Консультації" : "Consultations",
                isUk ? "Діагностика" : "Diagnostics",
                isUk ? "Лабораторія" : "Laboratory",
                isUk ? "Хірургія" : "Surgery",
                isUk ? "Реабілітація" : "Rehabilitation",
                isUk ? "Чекап-програми" : "Checkup Programs",
              ].map((s) => (
                <li key={s} className="hover:text-white transition-colors cursor-pointer">{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold text-white mb-4">{isUk ? "Інформація" : "Information"}</p>
            <ul className="space-y-2 text-sm">
              {[
                isUk ? "Про нас" : "About Us",
                isUk ? "Вакансії" : "Careers",
                isUk ? "Страхові партнери" : "Insurance Partners",
                isUk ? "Новини" : "News",
                isUk ? "Конфіденційність" : "Privacy Policy",
              ].map((s) => (
                <li key={s} className="hover:text-white transition-colors cursor-pointer">{s}</li>
              ))}
            </ul>
            <div className="mt-5 bg-teal-900/50 border border-teal-700 rounded-lg px-3 py-1.5 inline-block">
              <span className="text-xs text-teal-300">{t.accred}: ISO 9001:2015</span>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>&copy; 2026 {isUk ? "МедЦентр «Здоров'я»" : "MedCenter \"Health\""}. {t.rights}.</p>
          <p>{isUk ? "Ліцензія МОЗ України №12345" : "License MOH Ukraine #12345"}</p>
        </div>
      </footer>
    </div>
  );
}
