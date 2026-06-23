export interface NicheVariant {
  title: string;
  emoji: string;
  description: string;
}

export interface NicheHighlight {
  icon: string;
  title: string;
  description: string;
}

export interface NichePromotion {
  title: string;
  discount: string;
  description: string;
  icon: string;
  tag?: string; // e.g. "Постійно", "Нові клієнти"
}

export interface NicheTeamMember {
  name: string;
  role: string;
  experience: string;
  emoji: string;
  specializations?: string[];
}

export interface NicheCalculatorStep {
  label: string;
  options: { label: string; price: number }[];
}

export interface NicheProcessStep {
  title: string;
  description: string;
  icon: string;
  duration?: string; // e.g. "1–2 дні", "30 хв"
}

export interface NichePricingFeature {
  text: string;
  included: boolean;
}

export interface NichePricingPlan {
  name: string;
  price: string;         // e.g. "від 500 ₴/міс" or "за запитом"
  period?: string;       // e.g. "/міс", "/рік"
  description: string;
  features: NichePricingFeature[];
  highlighted?: boolean; // "Most Popular" badge
  cta?: string;          // override CTA text
}

export interface NicheTrustStat {
  value: string;
  label: string;
  icon: string;
}

export interface NichePropertyListing {
  id: string;
  title: string;          // "3-кімнатна квартира, 87 м²"
  type: string;           // "Квартира" | "Будинок" | "Комерція"
  price: string;          // "1 850 000 ₴"
  area: string;           // "87 м²"
  rooms?: number;         // 3
  floor?: string;         // "5/9"
  district: string;       // "Голосіїво, Київ"
  tags?: string[];        // ["Новобудова", "Ремонт"]
  gradient: string;       // Tailwind gradient
  icon: string;           // emoji
  badge?: string;         // "Новинка" | "Знижка" | "Популярне"
  badgeColor?: string;    // Tailwind color class
}

export interface NicheCourseCard {
  id: string;
  title: string;          // "Веб-розробка з нуля: HTML, CSS, JavaScript"
  instructor: string;     // "Олег Мартиненко"
  category: string;       // "Програмування" | "Дизайн" | "Маркетинг" | etc.
  level: string;          // "Початківець" | "Середній" | "Просунутий"
  price: string;          // "4 200 ₴"
  originalPrice?: string; // "5 800 ₴"
  rating: string;         // "4.8"
  studentsCount: string;  // "1 240 студентів"
  lessonsCount: number;   // 48
  duration: string;       // "12 тижнів"
  icon: string;           // emoji
  gradient: string;       // Tailwind gradient
  badge?: string;         // "Популярний" | "Новий" | "Безкоштовно" | "Топ курс"
  badgeColor?: string;    // Tailwind bg-* class
  tags?: string[];        // ["Сертифікат", "Практика", "Живі вебінари"]
}

export interface NicheScheduleItem {
  id: string;
  title: string;          // "Йога для початківців"
  trainer: string;        // "Тетяна Коваль"
  category: string;       // "Йога" | "Зумба" | "Бокс" | "Пілатес" | etc.
  day: string;            // "Понеділок" | "Середа" | "П'ятниця" | etc.
  time: string;           // "09:00"
  duration: string;       // "60 хв"
  spots: number;          // total spots
  spotsLeft: number;      // remaining spots
  icon: string;           // emoji
  gradient: string;       // Tailwind gradient
  badge?: string;         // "Хіт" | "Нове" | "Лише 2 місця"
  badgeColor?: string;    // Tailwind bg-* class
}

export interface NicheRoomCard {
  id: string;
  title: string;          // "Номер Делюкс з видом на море"
  type: string;           // "Стандарт" | "Делюкс" | "Люкс" | "Сімейний"
  pricePerNight: string;  // "3 200 ₴/ніч"
  capacity: number;       // max guests
  area?: string;          // "28 м²"
  amenities: string[];    // ["Wi-Fi", "Кондиціонер", "Сніданок включено"]
  icon: string;           // emoji
  gradient: string;       // Tailwind gradient
  badge?: string;         // "Популярне" | "Останній" | "Знижка"
  badgeColor?: string;    // Tailwind bg-* class
}

export interface NicheProjectCard {
  id: string;
  title: string;          // "Ремонт 2-кімнатної квартири під ключ"
  category: string;       // "Квартира" | "Будинок" | "Офіс" | "Комерція" | "Фасад"
  area: string;           // "68 м²"
  duration: string;       // "45 днів"
  description: string;    // short project description
  gradient: string;       // Tailwind gradient
  icon: string;           // emoji
  badge?: string;         // "Завершено" | "В роботі" | "Топ проєкт"
  badgeColor?: string;    // Tailwind bg-* class
  tags?: string[];        // ["Дизайн-проєкт", "Без виселення", "Turnkey"]
}

export interface NicheCarCard {
  id: string;
  make: string;           // "Toyota" | "BMW" | "Volkswagen" | etc.
  model: string;          // "Camry" | "X5" | "Golf" | etc.
  year: number;           // 2023
  price: string;          // "1 240 000 ₴"
  mileage?: string;       // "12 000 км" | "0 км (нове)"
  fuelType: string;       // "Бензин" | "Дизель" | "Електро" | "Гібрид"
  bodyType: string;       // "Седан" | "Позашляховик" | "Хетчбек" | "Кросовер"
  engine?: string;        // "2.5 AT, 249 к.с."
  gradient: string;       // Tailwind gradient
  icon: string;           // emoji
  badge?: string;         // "Нове" | "Популярне" | "SALE" | "Електро"
  badgeColor?: string;    // Tailwind bg-* class
  tags?: string[];        // ["Кредит від 0%", "Офіційна гарантія"]
}

export interface NicheTechProduct {
  id: string;
  name: string;           // "iPhone 16 Pro"
  brand: string;          // "Apple" | "Samsung" | etc.
  category: string;       // "Смартфони" | "Ноутбуки" | "Телевізори" | etc.
  price: string;          // "54 999 ₴"
  originalPrice?: string; // "62 999 ₴" — shown as strikethrough for sale items
  specs: string[];        // ["6.3\" Super Retina XDR", "A18 Pro chip", "48 MP камера"]
  icon: string;           // emoji
  gradient: string;       // Tailwind gradient for card header
  badge?: string;         // "Новинка" | "SALE" | "Хіт" | "Розстрочка 0%"
  badgeColor?: string;    // Tailwind bg-* class
  tags?: string[];        // ["Офіційна гарантія", "Є в наявності"]
}

export interface NicheJobCard {
  id: string;
  title: string;          // "Frontend Developer"
  company: string;        // "Tech Corp"
  salary: string;         // "80 000 – 120 000 ₴"
  location: string;       // "Київ / Remote"
  type: string;           // "Повна зайнятість" | "Часткова" | "Фріланс" | "Стажування"
  experience: string;     // "2+ роки" | "Без досвіду" | "Senior"
  icon: string;           // emoji
  gradient: string;       // Tailwind gradient
  badge?: string;         // "Гаряча вакансія" | "Нова" | "Remote"
  badgeColor?: string;
  tags?: string[];        // ["React", "TypeScript", "Agile"]
}

export interface NicheProductCard {
  id: string;
  name: string;           // "Пальто оверсайз беж"
  category: string;       // "Верхній одяг" | "Сукні" | "Джинси" | etc.
  price: string;          // "3 200 ₴"
  originalPrice?: string; // "4 500 ₴" — shown as strikethrough for sale items
  sizes: string[];        // ["XS", "S", "M", "L"] | ["25", "26", "27"]
  icon: string;           // emoji
  gradient: string;       // Tailwind gradient for card header
  tags?: string[];        // ["Унісекс", "Натуральна тканина"]
  badge?: string;         // "NEW" | "SALE" | "Bestseller" | "Останні"
  badgeColor?: string;    // Tailwind bg-* class
}

export interface NicheMenuItem {
  id: string;
  name: string;           // "Карпаччо з лосося"
  category: string;       // "Закуска" | "Суп" | "Основне" | "Десерт" | "Напій"
  description: string;    // short dish description
  price: string;          // "380 ₴"
  weight?: string;        // "180 г" | "300 мл"
  calories?: string;      // "220 ккал"
  icon: string;           // emoji
  gradient: string;       // Tailwind gradient for card header
  tags?: string[];        // ["Веганське", "Гостре", "Без глютену"]
  badge?: string;         // "Хіт" | "Нове" | "Шеф радить"
  badgeColor?: string;    // Tailwind bg-* class
}

export interface NicheData {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  metaDescription: string;
  titleSeo?: string;        // Custom SEO title template (replaces auto-generated)
  schemaType?: string;      // Schema.org @type override (e.g. "AutoRepair", "Bakery")
  emoji: string;
  category: string;
  color: string;
  gradient: string;
  heroImage?: string;
  features: string[];
  highlights?: NicheHighlight[]; // Key selling points with icons
  pages: string[];
  tech: string[];
  priceFrom: number;
  deliveryDays: number;
  complexity: "simple" | "medium" | "complex";
  tags: string[];
  sampleSections: string[];
  heroTitle?: string;       // Specific H1 for the niche hero section
  ctaPrimary?: string;      // Primary CTA button text in hero
  mockServices?: { name: string; price: string; duration?: string; icon: string }[];
  openingHours?: string;    // Mock opening hours
  phone?: string;           // Mock demo phone number
  address?: string;         // Mock demo address
  variants?: NicheVariant[];   // Subcategory variants shown on demo page
  promotions?: NichePromotion[];    // Special offers / deals section
  team?: NicheTeamMember[];         // Team / masters profiles section
  bookingForm?: boolean;            // Show multi-step booking form section
  calculatorSteps?: NicheCalculatorStep[]; // Interactive price calculator steps
  processSteps?: NicheProcessStep[];         // "Як це працює" numbered steps
  pricingPlans?: NichePricingPlan[];        // Pricing tiers comparison table
  trustStats?: NicheTrustStat[];           // Trust/social-proof stats (e.g. "200+ клієнтів")
  nicheFaq?: { q: string; a: string }[];   // Niche-specific FAQ items (appended to generic)
  propertyListings?: NichePropertyListing[]; // Mock property/listing cards (real estate demo)
  billingToggle?: boolean;                   // Show monthly/yearly pricing toggle (SaaS demo)
  bmiCalculator?: boolean;                   // Show BMI calculator section (fitness demo)
  menuItems?: NicheMenuItem[];               // Mock menu/dish cards (restaurant demo)
  productCards?: NicheProductCard[];         // Mock product catalog cards (fashion/shop demo)
  catalogHeading?: string;                   // Override default "Нова колекція" section title
  catalogSubtitle?: string;                  // Override default catalog section subtitle
  techProducts?: NicheTechProduct[];         // Mock tech product cards (electronics demo)
  courseCards?: NicheCourseCard[];           // Mock course catalog cards (education demo)
  courseHeading?: string;                    // Override default "Популярні курси" heading
  scheduleItems?: NicheScheduleItem[];       // Mock class schedule (fitness demo)
  scheduleHeading?: string;                  // Override default "Розклад групових тренувань" heading
  roomCards?: NicheRoomCard[];              // Mock hotel room cards (travel demo)
  carCards?: NicheCarCard[];               // Mock car catalog cards (auto/dealership demo)
  projectCards?: NicheProjectCard[];        // Mock project portfolio cards (construction demo)
  projectsHeading?: string;                 // Override default "Реалізовані проєкти" heading
  jobCards?: NicheJobCard[];               // Mock job listing cards (recruitment demo)
  previewImage?: string;                   // Screenshot/thumbnail of the niche demo (for marketplace cards)
  marketplaceSlug?: string;               // Explicit marketplace product slug if differs from niche slug
}

export const NICHE_CATEGORIES = [
  "Їжа та гостинність",
  "Краса та здоров'я",
  "Будівництво та нерухомість",
  "Освіта та консалтинг",
  "Авто та логістика",
  "E-commerce та ритейл",
  "Креатив та розваги",
  "IT та SaaS",
  "Здоров'я та розвиток",
  "Дитяча та сімейна",
  "Виробництво та хенд-мейд",
  "Бізнес-послуги",
  "Агробізнес та AgriTech",
];

export const NICHES_DATA: NicheData[] = [];

export function getNiche(slug: string): NicheData | undefined {
  return NICHES_DATA.find((n) => n.slug === slug);
}

export const COMPLEXITY_LABELS_NICHE: Record<string, string> = {
  simple: "Простий",
  medium: "Середній",
  complex: "Складний",
};

// Category name UK→EN mapping
export const NICHE_CATEGORY_EN: Record<string, string> = {
  "Їжа та гостинність": "Food & Hospitality",
  "Краса та здоров'я": "Beauty & Health",
  "Будівництво та нерухомість": "Construction & Real Estate",
  "Освіта та консалтинг": "Education & Consulting",
  "Авто та логістика": "Auto & Logistics",
  "E-commerce та ритейл": "E-commerce & Retail",
  "Креатив та розваги": "Creative & Entertainment",
  "IT та SaaS": "IT & SaaS",
  "Здоров'я та розвиток": "Health & Wellness",
  "Дитяча та сімейна": "Children & Family",
  "Виробництво та хенд-мейд": "Production & Handmade",
  "Бізнес-послуги": "Business Services",
  "Агробізнес та AgriTech": "Agribusiness & AgriTech",
};

// EN locale overrides — key fields translated for the EN locale
const NICHES_EN: Record<string, Partial<NicheData>> = {};

export function getNicheLocalized(slug: string, lang: string): NicheData | undefined {
  const n = NICHES_DATA.find((n) => n.slug === slug);
  if (!n) return undefined;
  if (lang === "en" && NICHES_EN[slug]) {
    return { ...n, ...NICHES_EN[slug] } as NicheData;
  }
  return n;
}
