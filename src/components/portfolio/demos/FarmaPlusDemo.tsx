"use client";

import { useState } from "react";
import { EmojiIcon } from "@/components/ui/EmojiIcon";

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV = [
  { en: "Catalog", uk: "Каталог" },
  { en: "Prescriptions", uk: "Рецепти" },
  { en: "Delivery", uk: "Доставка" },
  { en: "Pharmacies", uk: "Аптеки" },
  { en: "Contact", uk: "Контакти" },
];

const CATEGORIES = [
  { id: "pain", en: "Pain Relief", uk: "Знеболювальні", emoji: "💊" },
  { id: "vitamins", en: "Vitamins", uk: "Вітаміни", emoji: "🌿" },
  { id: "cold", en: "Cold & Flu", uk: "Застуда та грип", emoji: "🤧" },
  { id: "digestive", en: "Digestive", uk: "Травлення", emoji: "🫄" },
  { id: "skincare", en: "Skincare", uk: "Догляд за шкірою", emoji: "🧴" },
  { id: "firstaid", en: "First Aid", uk: "Перша допомога", emoji: "🩹" },
];

interface Product {
  id: number;
  nameEn: string;
  nameUk: string;
  descEn: string;
  descUk: string;
  dosage: string;
  price: number;
  rx: boolean;
  emoji: string;
  category: string;
}

const PRODUCTS: Product[] = [
  // Pain Relief
  { id: 1, nameEn: "Ibuprofen 400mg", nameUk: "Ібупрофен 400мг", descEn: "Anti-inflammatory pain relief tablets", descUk: "Протизапальні знеболювальні таблетки", dosage: "1-2 tablets / 8h", price: 89, rx: false, emoji: "💊", category: "pain" },
  { id: 2, nameEn: "Paracetamol 500mg", nameUk: "Парацетамол 500мг", descEn: "Fever and mild pain relief", descUk: "Від жару та легкого болю", dosage: "1-2 tablets / 6h", price: 45, rx: false, emoji: "💊", category: "pain" },
  { id: 3, nameEn: "Diclofenac Gel 50g", nameUk: "Диклофенак гель 50г", descEn: "Topical anti-inflammatory gel", descUk: "Протизапальний гель місцевої дії", dosage: "Apply 2-3x daily", price: 125, rx: false, emoji: "🧴", category: "pain" },
  { id: 4, nameEn: "Nimesulide 100mg", nameUk: "Німесулід 100мг", descEn: "Strong pain & inflammation relief", descUk: "Сильне знеболення та зняття запалення", dosage: "1 tablet / 12h", price: 72, rx: true, emoji: "💊", category: "pain" },
  { id: 5, nameEn: "No-Spa 40mg", nameUk: "Но-шпа 40мг", descEn: "Smooth muscle antispasmodic", descUk: "Спазмолітик гладкої мускулатури", dosage: "1-2 tablets / 8h", price: 98, rx: false, emoji: "💊", category: "pain" },
  { id: 6, nameEn: "Ketanov 10mg", nameUk: "Кетанов 10мг", descEn: "Prescription-strength analgesic", descUk: "Сильний рецептурний анальгетик", dosage: "1 tablet / 6h", price: 65, rx: true, emoji: "💉", category: "pain" },

  // Vitamins
  { id: 7, nameEn: "Vitamin D3 2000 IU", nameUk: "Вітамін D3 2000 МО", descEn: "Supports bones and immunity", descUk: "Підтримує кістки та імунітет", dosage: "1 capsule daily", price: 185, rx: false, emoji: "☀️", category: "vitamins" },
  { id: 8, nameEn: "Vitamin C 1000mg", nameUk: "Вітамін С 1000мг", descEn: "Immune system booster", descUk: "Зміцнення імунної системи", dosage: "1 tablet daily", price: 145, rx: false, emoji: "🍊", category: "vitamins" },
  { id: 9, nameEn: "Omega-3 Fish Oil", nameUk: "Омега-3 Риб'ячий жир", descEn: "Heart and brain health support", descUk: "Підтримка серця та мозку", dosage: "2 capsules daily", price: 265, rx: false, emoji: "🐟", category: "vitamins" },
  { id: 10, nameEn: "Magnesium B6", nameUk: "Магній B6", descEn: "Reduces fatigue and stress", descUk: "Знижує втому та стрес", dosage: "2 tablets daily", price: 155, rx: false, emoji: "🌿", category: "vitamins" },
  { id: 11, nameEn: "Iron + Folic Acid", nameUk: "Залізо + Фолієва кислота", descEn: "Prevents anemia, supports blood", descUk: "Запобігає анемії, підтримує кров", dosage: "1 tablet daily", price: 120, rx: false, emoji: "🩸", category: "vitamins" },
  { id: 12, nameEn: "Multivitamin Complex", nameUk: "Мультивітамінний комплекс", descEn: "Daily essential vitamins & minerals", descUk: "Щоденні вітаміни та мінерали", dosage: "1 tablet daily", price: 210, rx: false, emoji: "💊", category: "vitamins" },

  // Cold & Flu
  { id: 13, nameEn: "Coldrex MaxGrip", nameUk: "Колдрекс МаксГрип", descEn: "Cold & flu symptom relief powder", descUk: "Порошок від симптомів застуди", dosage: "1 sachet / 6h", price: 135, rx: false, emoji: "🤧", category: "cold" },
  { id: 14, nameEn: "Throat Spray Tantum", nameUk: "Спрей для горла Тантум", descEn: "Anti-inflammatory throat spray", descUk: "Протизапальний спрей для горла", dosage: "4-8 sprays / 3h", price: 175, rx: false, emoji: "💨", category: "cold" },
  { id: 15, nameEn: "Nasal Drops Aqua Maris", nameUk: "Краплі Аква Маріс", descEn: "Saline nasal wash drops", descUk: "Сольові краплі для носа", dosage: "2-3 drops per nostril", price: 95, rx: false, emoji: "💧", category: "cold" },
  { id: 16, nameEn: "Ambroxol Syrup", nameUk: "Амброксол сироп", descEn: "Expectorant cough syrup", descUk: "Відхаркувальний сироп від кашлю", dosage: "10ml / 8h", price: 85, rx: false, emoji: "🍯", category: "cold" },
  { id: 17, nameEn: "Oseltamivir 75mg", nameUk: "Осельтамівір 75мг", descEn: "Antiviral flu treatment", descUk: "Противірусний препарат від грипу", dosage: "1 capsule / 12h", price: 420, rx: true, emoji: "💊", category: "cold" },
  { id: 18, nameEn: "Cough Lozenges Strepsils", nameUk: "Пастилки Стрепсілс", descEn: "Sore throat antiseptic lozenges", descUk: "Антисептичні пастилки від горла", dosage: "1 lozenge / 3h", price: 110, rx: false, emoji: "🍬", category: "cold" },

  // Digestive
  { id: 19, nameEn: "Mezym Forte 10000", nameUk: "Мезим Форте 10000", descEn: "Digestive enzyme supplement", descUk: "Ферментний препарат для травлення", dosage: "1-2 tablets with meal", price: 135, rx: false, emoji: "💊", category: "digestive" },
  { id: 20, nameEn: "Smecta Powder", nameUk: "Смекта порошок", descEn: "Anti-diarrheal adsorbent", descUk: "Протидіарейний адсорбент", dosage: "1 sachet / 8h", price: 95, rx: false, emoji: "📦", category: "digestive" },
  { id: 21, nameEn: "Linex Probiotic", nameUk: "Лінекс пробіотик", descEn: "Restores gut microflora", descUk: "Відновлює мікрофлору кишківника", dosage: "2 capsules / 8h", price: 225, rx: false, emoji: "🦠", category: "digestive" },
  { id: 22, nameEn: "Omeprazole 20mg", nameUk: "Омепразол 20мг", descEn: "Acid reflux & ulcer treatment", descUk: "Лікування рефлюксу та виразки", dosage: "1 capsule before breakfast", price: 78, rx: true, emoji: "💊", category: "digestive" },
  { id: 23, nameEn: "Activated Charcoal", nameUk: "Активоване вугілля", descEn: "Detox & anti-bloating adsorbent", descUk: "Детокс та адсорбент від здуття", dosage: "4-6 tablets as needed", price: 25, rx: false, emoji: "⚫", category: "digestive" },
  { id: 24, nameEn: "Espumizan 40mg", nameUk: "Еспумізан 40мг", descEn: "Anti-gas & bloating relief", descUk: "Від газоутворення та здуття", dosage: "2 capsules / 8h", price: 165, rx: false, emoji: "💨", category: "digestive" },

  // Skincare
  { id: 25, nameEn: "Panthenol Cream 5%", nameUk: "Пантенол крем 5%", descEn: "Skin healing & moisturizing cream", descUk: "Загоювальний та зволожувальний крем", dosage: "Apply 2-3x daily", price: 95, rx: false, emoji: "🧴", category: "skincare" },
  { id: 26, nameEn: "Cetaphil Gentle Cleanser", nameUk: "Цетафіл ніжний очищувач", descEn: "Sensitive skin facial wash", descUk: "Засіб для чутливої шкіри обличчя", dosage: "Use morning & evening", price: 285, rx: false, emoji: "🫧", category: "skincare" },
  { id: 27, nameEn: "La Roche-Posay SPF50+", nameUk: "La Roche-Posay SPF50+", descEn: "High protection sunscreen", descUk: "Сонцезахисний крем високого захисту", dosage: "Apply before sun exposure", price: 395, rx: false, emoji: "☀️", category: "skincare" },
  { id: 28, nameEn: "Hydrocortisone 1%", nameUk: "Гідрокортизон 1%", descEn: "Anti-itch & eczema cream", descUk: "Крем від свербежу та екземи", dosage: "Thin layer 1-2x daily", price: 65, rx: true, emoji: "🧴", category: "skincare" },
  { id: 29, nameEn: "Bioderma Micellar Water", nameUk: "Біодерма міцелярна вода", descEn: "Gentle makeup remover", descUk: "Ніжний засіб для зняття макіяжу", dosage: "Use as needed", price: 245, rx: false, emoji: "💧", category: "skincare" },
  { id: 30, nameEn: "Retinol Serum 0.5%", nameUk: "Ретинол сироватка 0.5%", descEn: "Anti-aging night serum", descUk: "Антивікова нічна сироватка", dosage: "3-4 drops at night", price: 320, rx: false, emoji: "✨", category: "skincare" },

  // First Aid
  { id: 31, nameEn: "Sterile Bandage 7x14cm", nameUk: "Стерильний бинт 7x14см", descEn: "Medical-grade sterile bandage", descUk: "Стерильний бинт медичного класу", dosage: "As needed", price: 28, rx: false, emoji: "🩹", category: "firstaid" },
  { id: 32, nameEn: "Chlorhexidine 0.05%", nameUk: "Хлоргексидин 0.05%", descEn: "Antiseptic wound disinfectant", descUk: "Антисептик для дезінфекції ран", dosage: "Apply to wound", price: 35, rx: false, emoji: "🧪", category: "firstaid" },
  { id: 33, nameEn: "Adhesive Plasters Pack", nameUk: "Набір пластирів", descEn: "Assorted waterproof plasters", descUk: "Асортимент водостійких пластирів", dosage: "Apply as needed", price: 55, rx: false, emoji: "🩹", category: "firstaid" },
  { id: 34, nameEn: "Digital Thermometer", nameUk: "Цифровий термометр", descEn: "Fast & accurate body thermometer", descUk: "Швидкий і точний термометр для тіла", dosage: "1 min measurement", price: 145, rx: false, emoji: "🌡️", category: "firstaid" },
  { id: 35, nameEn: "Elastic Compression Band", nameUk: "Еластичний компресійний бинт", descEn: "Support wrap for sprains & strains", descUk: "Підтримка при розтягненнях", dosage: "Wrap as needed", price: 68, rx: false, emoji: "🤕", category: "firstaid" },
  { id: 36, nameEn: "First Aid Kit Complete", nameUk: "Аптечка повна комплектація", descEn: "Essential home first aid kit", descUk: "Домашня аптечка першої допомоги", dosage: "Keep at home", price: 385, rx: false, emoji: "🧳", category: "firstaid" },
];

const PHARMACIES = [
  {
    id: 1,
    nameEn: "FarmaPlus Central",
    nameUk: "ФармаПлюс Центральна",
    addressEn: "12 Khreschatyk St, Kyiv",
    addressUk: "вул. Хрещатик, 12, Київ",
    phone: "+380 44 123-45-67",
    open: "08:00",
    close: "22:00",
  },
  {
    id: 2,
    nameEn: "FarmaPlus Obolon",
    nameUk: "ФармаПлюс Оболонь",
    addressEn: "5 Obolonsky Ave, Kyiv",
    addressUk: "просп. Оболонський, 5, Київ",
    phone: "+380 44 234-56-78",
    open: "08:00",
    close: "21:00",
  },
  {
    id: 3,
    nameEn: "FarmaPlus Podil",
    nameUk: "ФармаПлюс Поділ",
    addressEn: "28 Sahaidachnoho St, Kyiv",
    addressUk: "вул. Сагайдачного, 28, Київ",
    phone: "+380 44 345-67-89",
    open: "09:00",
    close: "20:00",
  },
  {
    id: 4,
    nameEn: "FarmaPlus Livoberezhna",
    nameUk: "ФармаПлюс Лівобережна",
    addressEn: "15 Revutsky St, Kyiv",
    addressUk: "вул. Ревуцького, 15, Київ",
    phone: "+380 44 456-78-90",
    open: "07:00",
    close: "23:00",
  },
];

const HEALTH_TIPS = [
  {
    emoji: "🤧",
    titleEn: "Seasonal Flu Prevention",
    titleUk: "Профілактика сезонного грипу",
    descEn: "Wash hands regularly, get vaccinated, boost your immune system with Vitamin C and D. Avoid crowded places during peak flu season and ventilate your home daily.",
    descUk: "Регулярно мийте руки, вакцинуйтесь, зміцнюйте імунітет вітамінами C та D. Уникайте натовпів у пік сезону грипу та щодня провітрюйте оселю.",
    tag: { en: "Prevention", uk: "Профілактика" },
  },
  {
    emoji: "☀️",
    titleEn: "Vitamin D in Winter",
    titleUk: "Вітамін D взимку",
    descEn: "In Ukraine, over 80% of people lack Vitamin D in winter. Consider supplementation of 2000-4000 IU daily. Consult your pharmacist for the right dosage.",
    descUk: "В Україні понад 80% людей відчувають дефіцит вітаміну D взимку. Розгляньте прийом 2000-4000 МО щодня. Проконсультуйтесь з фармацевтом щодо дозування.",
    tag: { en: "Wellness", uk: "Здоров'я" },
  },
  {
    emoji: "💊",
    titleEn: "Proper Medication Storage",
    titleUk: "Правильне зберігання ліків",
    descEn: "Store medicines in a cool, dry place away from sunlight. Check expiry dates monthly. Never share prescription medications. Keep medicines out of reach of children.",
    descUk: "Зберігайте ліки у прохолодному сухому місці без сонячного світла. Щомісяця перевіряйте терміни придатності. Ніколи не діліться рецептурними ліками.",
    tag: { en: "Safety", uk: "Безпека" },
  },
];

const DELIVERY_OPTIONS = [
  {
    emoji: "🚀",
    nameEn: "Express Delivery",
    nameUk: "Експрес-доставка",
    timeEn: "Within 2 hours",
    timeUk: "Протягом 2 годин",
    price: 99,
    descEn: "Available in Kyiv central districts. Order before 20:00.",
    descUk: "Доступна в центральних районах Києва. Замовлення до 20:00.",
  },
  {
    emoji: "📦",
    nameEn: "Standard Delivery",
    nameUk: "Стандартна доставка",
    timeEn: "Same day",
    timeUk: "В день замовлення",
    price: 49,
    descEn: "All Kyiv districts. Order before 16:00 for same-day delivery.",
    descUk: "Усі райони Києва. Замовлення до 16:00 для доставки в той самий день.",
  },
  {
    emoji: "🎁",
    nameEn: "Free Delivery",
    nameUk: "Безкоштовна доставка",
    timeEn: "1-2 business days",
    timeUk: "1-2 робочих дні",
    price: 0,
    descEn: "Free for orders over 500 UAH. All Kyiv districts covered.",
    descUk: "Безкоштовно для замовлень від 500 грн. Усі райони Києва.",
  },
];

const REVIEWS = [
  {
    nameEn: "Olena M.",
    nameUk: "Олена М.",
    rating: 5,
    textEn: "Ordered prescription medication at 10 AM, received by noon. The pharmacist called to confirm dosage. Excellent service and truly professional approach!",
    textUk: "Замовила рецептурні ліки о 10 ранку, отримала до полудня. Фармацевт подзвонив, щоб підтвердити дозування. Чудовий сервіс і справді професійний підхід!",
  },
  {
    nameEn: "Dmytro K.",
    nameUk: "Дмитро К.",
    rating: 5,
    textEn: "I buy vitamins for the whole family here. Prices are lower than at our local pharmacy, and the delivery is always on time. Highly recommend FarmaPlus!",
    textUk: "Купую тут вітаміни для всієї родини. Ціни нижчі, ніж у нашій районній аптеці, а доставка завжди вчасна. Дуже рекомендую ФармаПлюс!",
  },
  {
    nameEn: "Iryna S.",
    nameUk: "Ірина С.",
    rating: 4,
    textEn: "The prescription upload feature saved me so much time. Instead of going to the pharmacy, I just sent a photo. Medicine was at my door in 3 hours.",
    textUk: "Функція завантаження рецепта заощадила мені стільки часу. Замість походу в аптеку, просто відправила фото. Ліки були під дверима через 3 години.",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isPharmacyOpen(open: string, close: string): boolean {
  const now = 14; // fake current time: 14:00
  const o = parseInt(open.split(":")[0], 10);
  const c = parseInt(close.split(":")[0], 10);
  return now >= o && now < c;
}

// ─── Component ───────────────────────────────────────────────────────────────

interface CartItem {
  product: Product;
  qty: number;
}

export function FarmaPlusDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [headerSearch, setHeaderSearch] = useState("");
  const [heroSearch, setHeroSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("pain");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const subtotal = cart.reduce((s, i) => s + i.product.price * i.qty, 0);
  const deliveryFee = subtotal >= 500 ? 0 : 49;

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i,
        );
      }
      return [...prev, { product, qty: 1 }];
    });
  };

  const updateQty = (productId: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.product.id === productId ? { ...i, qty: i.qty + delta } : i,
        )
        .filter((i) => i.qty > 0),
    );
  };

  const filteredProducts = PRODUCTS.filter(
    (p) => p.category === activeCategory,
  );

  return (
    <div className="min-h-screen bg-white text-gray-800 dark:text-neutral-200 font-sans">
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <header className="bg-white border-b border-gray-200 dark:border-neutral-700 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4 flex-wrap">
          <span className="text-xl font-bold text-green-600 shrink-0">
            💊 FarmaPlus
          </span>

          <nav className="hidden md:flex items-center gap-4 text-sm">
            {NAV.map((n) => (
              <button
                key={n.en}
                className="text-gray-600 dark:text-neutral-300 hover:text-green-600 transition-colors"
              >
                {isUk ? n.uk : n.en}
              </button>
            ))}
          </nav>

          <div className="flex-1 min-w-[140px] max-w-xs ml-auto">
            <input
              type="text"
              value={headerSearch}
              onChange={(e) => setHeaderSearch(e.target.value)}
              placeholder={isUk ? "Пошук ліків..." : "Search medicines..."}
              className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <button
            onClick={() => setShowCart(!showCart)}
            className="relative text-gray-600 dark:text-neutral-300 hover:text-green-600 transition-colors shrink-0"
            aria-label="Cart"
          >
            <span className="text-xl">🛒</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </button>

          <button className="bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-1.5 rounded-lg transition-colors shrink-0">
            {isUk ? "Замовити" : "Order Now"}
          </button>
        </div>
      </header>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="bg-linear-to-br from-white via-green-50 to-blue-50 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-block bg-green-100 text-green-700 text-sm font-semibold px-4 py-1 rounded-full mb-6">
            ✚ {isUk ? "Ліцензована мережа аптек" : "Licensed Pharmacy Network"}
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
            {isUk
              ? "Ваша Здорова Аптека Онлайн"
              : "Your Healthy Pharmacy Online"}
          </h1>
          <p className="text-lg text-gray-600 dark:text-neutral-300 mb-8 max-w-2xl mx-auto">
            {isUk
              ? "Понад 5 000 медичних товарів з доставкою по Києву. Рецептурні та безрецептурні препарати від перевірених постачальників."
              : "Over 5,000 medical products delivered across Kyiv. Prescription and OTC medicines from verified suppliers."}
          </p>

          <div className="flex items-center max-w-lg mx-auto mb-10">
            <input
              type="text"
              value={heroSearch}
              onChange={(e) => setHeroSearch(e.target.value)}
              placeholder={
                isUk ? "Назва ліків або симптом..." : "Medicine name or symptom..."
              }
              className="flex-1 px-4 py-3 border border-gray-300 rounded-l-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-r-xl transition-colors shrink-0">
              {isUk ? "Знайти" : "Find Medicine"}
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            {[
              {
                emoji: "✅",
                en: "Licensed Pharmacy",
                uk: "Ліцензована аптека",
              },
              { emoji: "🚀", en: "24h Delivery", uk: "Доставка за 24г" },
              { emoji: "💊", en: "5,000+ Products", uk: "5 000+ товарів" },
            ].map((b) => (
              <span
                key={b.en}
                className="bg-white border border-green-200 text-green-700 px-4 py-2 rounded-full font-medium shadow-sm"
              >
                <EmojiIcon emoji={b.emoji} className="w-4 h-4 inline-block align-middle mr-1" />
                {isUk ? b.uk : b.en}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Product Catalog ─────────────────────────────────────────────── */}
      <section className="py-16 bg-white dark:bg-neutral-950">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
            💊 {isUk ? "Каталог Медикаментів" : "Medicine Catalog"}
          </h2>
          <p className="text-center text-gray-500 dark:text-neutral-400 mb-8">
            {isUk
              ? "Оберіть категорію та додайте потрібне до кошика"
              : "Choose a category and add what you need to your cart"}
          </p>

          {/* Category tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat.id
                    ? "bg-green-500 text-white shadow-md"
                    : "bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-neutral-300 hover:bg-green-100 hover:text-green-700"
                }`}
              >
                <EmojiIcon emoji={cat.emoji} className="w-4 h-4 inline-block align-middle mr-1" />{isUk ? cat.uk : cat.en}
              </button>
            ))}
          </div>

          {/* Products grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="border border-gray-200 dark:border-neutral-700 rounded-xl p-5 hover:shadow-lg transition-shadow bg-white"
              >
                <div className="flex items-start justify-between mb-3">
                  <EmojiIcon emoji={p.emoji} className="w-8 h-8" />
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      p.rx
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {p.rx ? "Rx" : "OTC"}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                  {isUk ? p.nameUk : p.nameEn}
                </h3>
                <p className="text-sm text-gray-500 dark:text-neutral-400 mb-2">
                  {isUk ? p.descUk : p.descEn}
                </p>
                <p className="text-xs text-gray-400 dark:text-neutral-500 mb-3">
                  {isUk ? "Дозування" : "Dosage"}: {p.dosage}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-green-600">
                    {p.price} ₴
                  </span>
                  <button
                    onClick={() => addToCart(p)}
                    className="bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-3 py-1.5 rounded-lg transition-colors"
                  >
                    {isUk ? "В кошик" : "Add to Cart"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cart ────────────────────────────────────────────────────────── */}
      {showCart && (
        <section className="py-12 bg-green-50 border-y border-green-200">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              🛒 {isUk ? "Кошик" : "Shopping Cart"}
            </h2>

            {cart.length === 0 ? (
              <p className="text-gray-500 dark:text-neutral-400 text-center py-8">
                {isUk ? "Кошик порожній" : "Your cart is empty"}
              </p>
            ) : (
              <>
                <div className="space-y-3 mb-6">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center gap-4 bg-white dark:bg-neutral-800 rounded-xl p-4 border border-gray-200"
                    >
                      <EmojiIcon emoji={item.product.emoji} className="w-7 h-7 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 dark:text-white truncate">
                          {isUk ? item.product.nameUk : item.product.nameEn}
                        </p>
                        <p className="text-sm text-gray-500">
                          {item.product.price} ₴ ×{" "}
                          {item.qty}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => updateQty(item.product.id, -1)}
                          className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 dark:text-neutral-300 font-bold text-sm flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="text-sm font-bold w-6 text-center">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item.product.id, 1)}
                          className="w-7 h-7 rounded-full bg-green-200 hover:bg-green-300 text-green-700 font-bold text-sm flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-bold text-green-600 shrink-0 w-20 text-right">
                        {item.product.price * item.qty} ₴
                      </span>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-neutral-300 mb-2">
                    <span>{isUk ? "Товари" : "Subtotal"}</span>
                    <span>{subtotal} ₴</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 dark:text-neutral-300 mb-3">
                    <span>{isUk ? "Доставка" : "Delivery"}</span>
                    <span>
                      {deliveryFee === 0 ? (
                        <span className="text-green-600 font-semibold">
                          {isUk ? "Безкоштовно" : "Free"}
                        </span>
                      ) : (
                        `${deliveryFee} ₴`
                      )}
                    </span>
                  </div>
                  {subtotal > 0 && subtotal < 500 && (
                    <p className="text-xs text-gray-400 dark:text-neutral-500 mb-3">
                      {isUk
                        ? `Ще ${500 - subtotal} ₴ до безкоштовної доставки`
                        : `${500 - subtotal} ₴ more for free delivery`}
                    </p>
                  )}
                  <div className="border-t border-gray-200 dark:border-neutral-700 pt-3 flex justify-between items-center">
                    <span className="font-bold text-lg text-gray-900">
                      {isUk ? "Разом" : "Total"}
                    </span>
                    <span className="font-bold text-xl text-green-600">
                      {subtotal + deliveryFee} ₴
                    </span>
                  </div>
                  <button className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition-colors">
                    {isUk ? "Оформити замовлення" : "Checkout"}
                  </button>
                </div>
              </>
            )}
          </div>
        </section>
      )}

      {/* ── Prescription Upload ─────────────────────────────────────────── */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white mb-3">
            📋 {isUk ? "Завантаження Рецепту" : "Prescription Upload"}
          </h2>
          <p className="text-center text-gray-500 dark:text-neutral-400 mb-10 max-w-2xl mx-auto">
            {isUk
              ? "Замовляйте рецептурні ліки онлайн — просто завантажте фото рецепта"
              : "Order prescription medicines online — simply upload a photo of your prescription"}
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                emoji: "📸",
                titleEn: "Upload Photo",
                titleUk: "Завантажте фото",
                descEn: "Take a clear photo of your prescription and upload it through our secure form. We accept JPG, PNG and PDF formats.",
                descUk: "Зробіть чітке фото рецепта та завантажте через захищену форму. Приймаємо JPG, PNG та PDF формати.",
              },
              {
                step: "2",
                emoji: "🔍",
                titleEn: "Pharmacist Review",
                titleUk: "Перевірка фармацевтом",
                descEn: "Our licensed pharmacist reviews your prescription within 1 hour and verifies medication, dosage and interactions.",
                descUk: "Наш ліцензований фармацевт перевіряє рецепт протягом 1 години та верифікує препарат, дозування і взаємодії.",
              },
              {
                step: "3",
                emoji: "📦",
                titleEn: "Fast Delivery",
                titleUk: "Швидка доставка",
                descEn: "Once verified, your medication is packed and dispatched. Track your order in real-time until it arrives at your door.",
                descUk: "Після перевірки ваші ліки пакуються та відправляються. Відстежуйте замовлення в реальному часі до дверей.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="bg-white rounded-xl p-6 border border-blue-200 text-center shadow-sm"
              >
                <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-3">
                  {s.step}
                </div>
                <EmojiIcon emoji={s.emoji} className="w-8 h-8 block mb-3" />
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  {isUk ? s.titleUk : s.titleEn}
                </h3>
                <p className="text-sm text-gray-500">
                  {isUk ? s.descUk : s.descEn}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-white dark:bg-neutral-800 rounded-xl p-6 border border-blue-200 text-center">
            <p className="text-sm text-gray-600 dark:text-neutral-300 mb-4">
              {isUk
                ? "Перетягніть фото рецепта сюди або натисніть для вибору файлу"
                : "Drag your prescription photo here or click to select a file"}
            </p>
            <div className="border-2 border-dashed border-green-300 rounded-xl py-10 mb-4 bg-green-50/50">
              <span className="text-4xl block mb-2">📎</span>
              <p className="text-sm text-gray-400">
                JPG, PNG, PDF — {isUk ? "до 10 МБ" : "up to 10 MB"}
              </p>
            </div>
            <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-2.5 rounded-lg transition-colors">
              {isUk ? "Завантажити рецепт" : "Upload Prescription"}
            </button>
          </div>
        </div>
      </section>

      {/* ── Pharmacy Locator ────────────────────────────────────────────── */}
      <section className="py-16 bg-white dark:bg-neutral-950">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
            📍 {isUk ? "Наші Аптеки" : "Our Pharmacies"}
          </h2>
          <p className="text-center text-gray-500 dark:text-neutral-400 mb-10">
            {isUk
              ? "Завітайте до найближчої аптеки мережі FarmaPlus"
              : "Visit the nearest FarmaPlus pharmacy"}
          </p>

          <div className="grid sm:grid-cols-2 gap-5">
            {PHARMACIES.map((ph) => {
              const open = isPharmacyOpen(ph.open, ph.close);
              return (
                <div
                  key={ph.id}
                  className="border border-gray-200 dark:border-neutral-700 rounded-xl p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-gray-900">
                      {isUk ? ph.nameUk : ph.nameEn}
                    </h3>
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full shrink-0 ${
                        open
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {open
                        ? isUk
                          ? "Відчинено"
                          : "Open now"
                        : isUk
                          ? "Зачинено"
                          : "Closed"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-neutral-400 mb-2">
                    📍 {isUk ? ph.addressUk : ph.addressEn}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-neutral-400 mb-2">
                    🕐 {ph.open} — {ph.close}
                  </p>
                  <p className="text-sm text-gray-500">📞 {ph.phone}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Health Corner ───────────────────────────────────────────────── */}
      <section className="py-16 bg-green-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
            🩺 {isUk ? "Куточок Здоров'я" : "Health Corner"}
          </h2>
          <p className="text-center text-gray-500 dark:text-neutral-400 mb-10">
            {isUk
              ? "Корисні поради від наших фармацевтів"
              : "Useful tips from our pharmacists"}
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {HEALTH_TIPS.map((tip) => (
              <article
                key={tip.titleEn}
                className="bg-white rounded-xl p-6 border border-green-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <EmojiIcon emoji={tip.emoji} className="w-8 h-8 block mb-3" />
                <span className="text-xs font-semibold text-green-600 bg-green-100 px-2.5 py-0.5 rounded-full">
                  {isUk ? tip.tag.uk : tip.tag.en}
                </span>
                <h3 className="font-bold text-gray-900 dark:text-white mt-3 mb-2">
                  {isUk ? tip.titleUk : tip.titleEn}
                </h3>
                <p className="text-sm text-gray-500 dark:text-neutral-400 leading-relaxed">
                  {isUk ? tip.descUk : tip.descEn}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Delivery Info ───────────────────────────────────────────────── */}
      <section className="py-16 bg-white dark:bg-neutral-950">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
            🚚 {isUk ? "Доставка" : "Delivery Options"}
          </h2>
          <p className="text-center text-gray-500 dark:text-neutral-400 mb-10">
            {isUk
              ? "Обирайте зручний спосіб отримання замовлення"
              : "Choose the delivery method that suits you best"}
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {DELIVERY_OPTIONS.map((opt) => (
              <div
                key={opt.nameEn}
                className={`rounded-xl p-6 border text-center shadow-sm ${
                  opt.price === 0
                    ? "bg-green-50 border-green-300 ring-2 ring-green-200"
                    : "bg-white border-gray-200"
                }`}
              >
                <EmojiIcon emoji={opt.emoji} className="w-8 h-8 block mb-3" />
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                  {isUk ? opt.nameUk : opt.nameEn}
                </h3>
                <p className="text-sm text-green-600 font-semibold mb-2">
                  {isUk ? opt.timeUk : opt.timeEn}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {opt.price === 0 ? (
                    <span className="text-green-600">
                      {isUk ? "Безкоштовно" : "Free"}
                    </span>
                  ) : (
                    `${opt.price} ₴`
                  )}
                </p>
                <p className="text-sm text-gray-500">
                  {isUk ? opt.descUk : opt.descEn}
                </p>
                {opt.price === 0 && (
                  <p className="mt-3 text-xs font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full inline-block">
                    {isUk ? "Замовлення від 500 ₴" : "Orders over 500 ₴"}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 bg-blue-50 rounded-xl p-5 border border-blue-200">
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">
              📍 {isUk ? "Зони покриття" : "Coverage Zones"}
            </h3>
            <p className="text-sm text-gray-600">
              {isUk
                ? "Експрес-доставка: Шевченківський, Печерський, Голосіївський райони. Стандартна доставка: усі райони Києва. Безкоштовна доставка: усі райони Києва при замовленні від 500 ₴."
                : "Express delivery: Shevchenkivskyi, Pecherskyi, Holosiivskyi districts. Standard delivery: all Kyiv districts. Free delivery: all Kyiv districts for orders over 500 UAH."}
            </p>
          </div>
        </div>
      </section>

      {/* ── Reviews ─────────────────────────────────────────────────────── */}
      <section className="py-16 bg-green-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
            ⭐ {isUk ? "Відгуки Клієнтів" : "Customer Reviews"}
          </h2>
          <p className="text-center text-gray-500 dark:text-neutral-400 mb-10">
            {isUk
              ? "Що кажуть наші клієнти про FarmaPlus"
              : "What our customers say about FarmaPlus"}
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r) => (
              <div
                key={r.nameEn}
                className="bg-white rounded-xl p-6 border border-green-200 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">{"⭐".repeat(r.rating)}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-neutral-300 leading-relaxed mb-4 italic">
                  &ldquo;{isUk ? r.textUk : r.textEn}&rdquo;
                </p>
                <p className="text-sm font-bold text-gray-900">
                  {isUk ? r.nameUk : r.nameEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <span className="text-xl font-bold text-white block mb-3">
                💊 FarmaPlus
              </span>
              <p className="text-sm text-gray-400 dark:text-neutral-500 mb-3">
                {isUk
                  ? "Мережа аптек — ваш надійний партнер у здоров'ї з 2015 року."
                  : "Pharmacy network — your trusted health partner since 2015."}
              </p>
              <p className="text-xs text-gray-500">
                {isUk
                  ? "Ліцензія МОЗ України № АГ-2015-003478"
                  : "License MOH Ukraine No. AG-2015-003478"}
              </p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-white mb-3">
                {isUk ? "Контакти" : "Contact"}
              </h4>
              <p className="text-sm text-gray-400 dark:text-neutral-500 mb-1">
                📞 0-800-300-100 ({isUk ? "безкоштовно" : "toll-free"})
              </p>
              <p className="text-sm text-gray-400 dark:text-neutral-500 mb-1">
                ✉️ info@farmaplus.ua
              </p>
              <p className="text-sm text-gray-400">
                📍 {isUk ? "м. Київ, Україна" : "Kyiv, Ukraine"}
              </p>
            </div>

            {/* Delivery Zones */}
            <div>
              <h4 className="font-bold text-white mb-3">
                {isUk ? "Зони доставки" : "Delivery Zones"}
              </h4>
              <ul className="text-sm text-gray-400 dark:text-neutral-500 space-y-1">
                <li>
                  {isUk
                    ? "Шевченківський район"
                    : "Shevchenkivskyi district"}
                </li>
                <li>
                  {isUk ? "Печерський район" : "Pecherskyi district"}
                </li>
                <li>
                  {isUk ? "Голосіївський район" : "Holosiivskyi district"}
                </li>
                <li>
                  {isUk ? "Оболонський район" : "Obolonskyi district"}
                </li>
                <li>
                  {isUk
                    ? "Лівобережний район"
                    : "Livoberezhna district"}
                </li>
              </ul>
            </div>

            {/* Hours */}
            <div>
              <h4 className="font-bold text-white mb-3">
                {isUk ? "Графік роботи" : "Working Hours"}
              </h4>
              <p className="text-sm text-gray-400 dark:text-neutral-500 mb-1">
                {isUk ? "Пн — Пт: 08:00 — 22:00" : "Mon — Fri: 08:00 — 22:00"}
              </p>
              <p className="text-sm text-gray-400 dark:text-neutral-500 mb-1">
                {isUk ? "Сб: 09:00 — 20:00" : "Sat: 09:00 — 20:00"}
              </p>
              <p className="text-sm text-gray-400 dark:text-neutral-500 mb-3">
                {isUk ? "Нд: 10:00 — 18:00" : "Sun: 10:00 — 18:00"}
              </p>
              <p className="text-xs text-gray-500">
                {isUk
                  ? "Онлайн замовлення — цілодобово"
                  : "Online orders — 24/7"}
              </p>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p>
              &copy; 2015–2026 FarmaPlus.{" "}
              {isUk ? "Усі права захищені." : "All rights reserved."}
            </p>
            <p>
              {isUk
                ? "Ліцензована аптека з 2015 року. Самолікування може бути шкідливим."
                : "Licensed pharmacy since 2015. Self-medication can be harmful."}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
