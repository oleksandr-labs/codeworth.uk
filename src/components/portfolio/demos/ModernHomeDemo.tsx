"use client";

import { useState } from "react";
import { EmojiIcon } from "@/components/ui/EmojiIcon";

const isUkFn = (lang: string) => lang === "uk";

/* ─── room categories ─── */
const ROOMS = [
  { key: "living", emoji: "🛋️", en: "Living Room", uk: "Вітальня" },
  { key: "bedroom", emoji: "🛏", en: "Bedroom", uk: "Спальня" },
  { key: "kitchen", emoji: "🍽️", en: "Kitchen", uk: "Кухня" },
  { key: "office", emoji: "💼", en: "Office", uk: "Офіс" },
  { key: "decor", emoji: "🌿", en: "Decor", uk: "Декор" },
];

/* ─── products ─── */
const PRODUCTS = [
  {
    id: 1,
    room: "living",
    nameEn: "Fjord Sofa",
    nameUk: "Диван Fjord",
    materialEn: "Linen fabric, oak legs",
    materialUk: "Льняна тканина, дубові ніжки",
    dimensions: "220×90×75 cm",
    colors: ["#C4B5A0", "#8E9E8C", "#D4C4A8"],
    price: 42000,
    descEn: "Clean Scandinavian lines with premium linen upholstery. Solid oak legs add warmth. Available in three natural tones. Modular extension optional.",
    descUk: "Чисті скандинавські лінії з преміальною льняною оббивкою. Суцільні дубові ніжки додають теплоти. Доступний у трьох природних відтінках. Можлива модульна розширення.",
    emoji: "🛋️",
    warrantyEn: "5 years frame, 2 years fabric",
    warrantyUk: "5 років каркас, 2 роки тканина",
  },
  {
    id: 2,
    room: "living",
    nameEn: "Oslo Coffee Table",
    nameUk: "Журнальний стіл Oslo",
    materialEn: "Solid oak, matte steel",
    materialUk: "Суцільний дуб, матова сталь",
    dimensions: "120×60×42 cm",
    colors: ["#C4956A", "#2D2D2D", "#F5F4F0"],
    price: 14500,
    descEn: "Solid oak top with matte black steel frame. Two shelf levels for storage. Pairs perfectly with Fjord Sofa.",
    descUk: "Стільниця з суцільного дуба з матовою чорною сталевою рамою. Два рівні полиць для зберігання. Ідеально поєднується з диваном Fjord.",
    emoji: "🪵",
    warrantyEn: "3 years",
    warrantyUk: "3 роки",
  },
  {
    id: 3,
    room: "bedroom",
    nameEn: "Lund Bed Frame",
    nameUk: "Ліжко Lund",
    materialEn: "White oak, fabric headboard",
    materialUk: "Білий дуб, тканинне узголів'я",
    dimensions: "160×200×90 cm",
    colors: ["#E8E0D4", "#C4B5A0", "#2D2D2D"],
    price: 31000,
    descEn: "Low-profile platform bed with upholstered headboard. White oak slats included. No box spring needed.",
    descUk: "Низькопрофільне ліжко-платформа з м'яким узголів'ям. Білі дубові рейки в комплекті. Матрац-основа не потрібна.",
    emoji: "🛏",
    warrantyEn: "10 years frame",
    warrantyUk: "10 років каркас",
  },
  {
    id: 4,
    room: "bedroom",
    nameEn: "Birk Nightstand",
    nameUk: "Тумбочка Birk",
    materialEn: "Birch veneer, metal pulls",
    materialUk: "Шпон берези, металеві ручки",
    dimensions: "45×38×55 cm",
    colors: ["#D4C8B0", "#A0785A", "#FAF9F7"],
    price: 7800,
    descEn: "Compact nightstand with one drawer and open shelf. Birch veneer with brass or matte black metal pulls.",
    descUk: "Компактна тумбочка з одним ящиком і відкритою полицею. Шпон берези з латунними або матово-чорними металевими ручками.",
    emoji: "🗄️",
    warrantyEn: "3 years",
    warrantyUk: "3 роки",
  },
  {
    id: 5,
    room: "kitchen",
    nameEn: "Stav Dining Table",
    nameUk: "Обідній стіл Stav",
    materialEn: "Solid oak, matte white legs",
    materialUk: "Суцільний дуб, матово-білі ніжки",
    dimensions: "180×90×75 cm",
    colors: ["#C4956A", "#FAF9F7", "#2D2D2D"],
    price: 28000,
    descEn: "Extendable dining table seats 6-8. Solid oak top with a white lacquered steel base. Extensions store underneath.",
    descUk: "Розкладний обідній стіл на 6-8 осіб. Стільниця з суцільного дуба з білою лакованою сталевою основою. Розкладні листи зберігаються знизу.",
    emoji: "🍽️",
    warrantyEn: "5 years",
    warrantyUk: "5 років",
  },
  {
    id: 6,
    room: "kitchen",
    nameEn: "Hald Dining Chair",
    nameUk: "Обідній стілець Hald",
    materialEn: "Velvet seat, beech legs",
    materialUk: "Оксамитове сидіння, букові ніжки",
    dimensions: "47×52×83 cm",
    colors: ["#8E9E8C", "#C4B5A0", "#6B7B8E"],
    price: 5200,
    descEn: "Cushioned velvet seat on solid beech legs. Stackable design. Sold individually or as set of 4.",
    descUk: "М'яке оксамитове сидіння на суцільних букових ніжках. Штабельована конструкція. Продається поодинці або комплектом із 4 шт.",
    emoji: "🪑",
    warrantyEn: "2 years",
    warrantyUk: "2 роки",
  },
  {
    id: 7,
    room: "office",
    nameEn: "Berg Desk",
    nameUk: "Письмовий стіл Berg",
    materialEn: "MDF lacquered, oak details",
    materialUk: "Лакований МДФ, дубові деталі",
    dimensions: "140×65×76 cm",
    colors: ["#FAF9F7", "#C4956A", "#2D2D2D"],
    price: 18500,
    descEn: "Minimalist home office desk with cable management tray and one deep drawer. Oak accent trim.",
    descUk: "Мінімалістичний робочий стіл для домашнього офісу з лотком для кабелів і одним глибоким ящиком. Дубове оздоблення.",
    emoji: "🖥️",
    warrantyEn: "3 years",
    warrantyUk: "3 роки",
  },
  {
    id: 8,
    room: "decor",
    nameEn: "Vik Shelf Set",
    nameUk: "Набір полиць Vik",
    materialEn: "Solid pine, metal brackets",
    materialUk: "Суцільна сосна, металеві кронштейни",
    dimensions: "80×22×4 cm (each)",
    colors: ["#D4B896", "#F5F4F0", "#2D2D2D"],
    price: 4600,
    descEn: "Set of 3 floating shelves in solid pine. Includes hidden wall anchors and matte black or white brackets.",
    descUk: "Набір із 3 навісних полиць із суцільної сосни. У комплекті приховані настінні анкери та матово-чорні або білі кронштейни.",
    emoji: "📦",
    warrantyEn: "2 years",
    warrantyUk: "2 роки",
  },
];

/* ─── lookbook setups ─── */
const LOOKBOOK = [
  {
    key: "nordic",
    titleEn: "Nordic Living",
    titleUk: "Скандинавська вітальня",
    emoji: "🛋️",
    bg: "#F0EDE8",
    items: [1, 2],
    noteEn: "Fjord Sofa + Oslo Coffee Table — warm linen meets solid oak.",
    noteUk: "Диван Fjord + Стіл Oslo — тепле льняне поєднання з суцільним дубом.",
  },
  {
    key: "cozy",
    titleEn: "Cozy Bedroom",
    titleUk: "Затишна спальня",
    emoji: "🛏",
    bg: "#EDE8E3",
    items: [3, 4],
    noteEn: "Lund Bed Frame + Birk Nightstand — restful minimalism.",
    noteUk: "Ліжко Lund + Тумбочка Birk — спокійний мінімалізм.",
  },
  {
    key: "kitchen",
    titleEn: "Minimalist Kitchen",
    titleUk: "Мінімалістична кухня",
    emoji: "🍽️",
    bg: "#EAE7E2",
    items: [5, 6],
    noteEn: "Stav Dining Table + Hald Chairs — clean lines for shared meals.",
    noteUk: "Стіл Stav + Стільці Hald — чисті лінії для спільних трапез.",
  },
  {
    key: "office",
    titleEn: "Home Office",
    titleUk: "Домашній офіс",
    emoji: "💼",
    bg: "#E8E5E0",
    items: [7, 8],
    noteEn: "Berg Desk + Vik Shelves — productive and serene.",
    noteUk: "Стіл Berg + Полиці Vik — продуктивно і спокійно.",
  },
];

/* ─── materials ─── */
const MATERIALS = [
  {
    nameEn: "Oak Wood",
    nameUk: "Дерево дуб",
    emoji: "🪵",
    swatches: ["#C4956A", "#A0785A", "#D4B896", "#8B6344"],
    careEn: "Wipe with damp cloth. Oil annually with natural wood oil. Avoid prolonged sun exposure.",
    careUk: "Протирайте вологою тканиною. Раз на рік обробляйте натуральним деревним маслом. Уникайте тривалого впливу сонця.",
  },
  {
    nameEn: "Metal Frame",
    nameUk: "Металевий каркас",
    emoji: "⚙️",
    swatches: ["#2D2D2D", "#8C8C8C", "#C8C8C8", "#B8A080"],
    careEn: "Wipe with dry cloth. Polish with metal cleaner if needed. Keep away from moisture to prevent rust.",
    careUk: "Протирайте сухою тканиною. За потреби полірувати засобом для металу. Тримайте подалі від вологи.",
  },
  {
    nameEn: "Fabric Upholstery",
    nameUk: "Тканинна оббивка",
    emoji: "🧵",
    swatches: ["#C4B5A0", "#8E9E8C", "#9EA8B4", "#B8A0A0"],
    careEn: "Vacuum regularly. Spot clean with mild detergent. Professional clean annually.",
    careUk: "Регулярно пилосость. Плями видаляти м'яким миючим засобом. Раз на рік — професійне чищення.",
  },
  {
    nameEn: "Velvet",
    nameUk: "Оксамит",
    emoji: "✨",
    swatches: ["#6B5B7B", "#4A6B5A", "#7B5B4A", "#5B6B7B"],
    careEn: "Brush gently with velvet brush. Avoid water stains. Steam clean for best results.",
    careUk: "Обережно чистіть щіткою для оксамиту. Уникайте водяних плям. Для найкращого результату — парова чистка.",
  },
];

/* ─── reviews ─── */
const REVIEWS = [
  {
    nameEn: "Olena M.",
    nameUk: "Олена М.",
    productEn: "Fjord Sofa",
    productUk: "Диван Fjord",
    rating: 5,
    textEn: "The sofa is even more beautiful in person. The linen is soft and breathable, and the oak legs aged perfectly after six months. My living room finally feels like a magazine page.",
    textUk: "Диван ще красивіший наживо. Льон м'який і повітропроникний, а дубові ніжки прекрасно постаріли через шість місяців. Моя вітальня нарешті виглядає як зі сторінки журналу.",
    resultEn: "Nordic-style open-plan living room with warm wooden flooring.",
    resultUk: "Скандинавська відкрита вітальня з теплою дерев'яною підлогою.",
  },
  {
    nameEn: "Andriy K.",
    nameUk: "Андрій К.",
    productEn: "Lund Bed Frame",
    productUk: "Ліжко Lund",
    rating: 5,
    textEn: "Assembly was surprisingly quick with the included instructions. The bed is sturdy and the headboard fabric is premium quality. Birk nightstand matches perfectly.",
    textUk: "Збірка зайняла набагато менше часу, ніж очікував. Ліжко міцне, тканина узголів'я преміальна. Тумбочка Birk підходить ідеально.",
    resultEn: "Calm bedroom in beige and white tones with morning light.",
    resultUk: "Спокійна спальня у бежево-білих тонах з ранковим світлом.",
  },
  {
    nameEn: "Mariya T.",
    nameUk: "Марія Т.",
    productEn: "Stav Dining Table",
    productUk: "Обідній стіл Stav",
    rating: 5,
    textEn: "We used the free consultation service and the designer helped us choose exactly the right size. The table extends beautifully when we have guests.",
    textUk: "Скористалися безкоштовною консультацією — дизайнер допоміг вибрати ідеальний розмір. Стіл чудово розкладається, коли в нас гості.",
    resultEn: "Bright Kyiv apartment kitchen with plants and warm light.",
    resultUk: "Світла київська квартира-кухня з рослинами та теплим світлом.",
  },
];

/* ─── delivery options ─── */
const DELIVERY_OPTIONS = [
  { key: "standard", en: "Free Standard (2–3 weeks)", uk: "Безкоштовна стандартна (2–3 тижні)", price: 0 },
  { key: "express", en: "Express (1 week) — ₴499", uk: "Експрес (1 тиждень) — ₴499", price: 499 },
  { key: "assembly", en: "Express + Assembly — ₴799", uk: "Експрес + Збірка — ₴799", price: 799 },
];

/* ─── budget ranges ─── */
const BUDGETS = [
  { en: "Under ₴10,000", uk: "До ₴10 000" },
  { en: "₴10,000 – ₴30,000", uk: "₴10 000 – ₴30 000" },
  { en: "₴30,000 – ₴80,000", uk: "₴30 000 – ₴80 000" },
  { en: "Over ₴80,000", uk: "Понад ₴80 000" },
];

/* ─── styles ─── */
const STYLES = [
  { en: "Scandinavian", uk: "Скандинавський" },
  { en: "Minimalist", uk: "Мінімалізм" },
  { en: "Industrial", uk: "Індустріальний" },
  { en: "Japandi", uk: "Японді" },
  { en: "Classic", uk: "Класичний" },
];

/* ────────────────────────────────────── */
export function ModernHomeDemo({ lang }: { lang: string }) {
  const isUk = isUkFn(lang);

  const [activeRoom, setActiveRoom] = useState<string>("living");
  const [selectedProduct, setSelectedProduct] = useState<(typeof PRODUCTS)[0] | null>(null);
  const [selectedColor, setSelectedColor] = useState<number>(0);
  const [cart, setCart] = useState<{ id: number; qty: number }[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [delivery, setDelivery] = useState("standard");
  const [consultRoom, setConsultRoom] = useState("");
  const [consultStyle, setConsultStyle] = useState("");
  const [consultBudget, setConsultBudget] = useState("");
  const [consultName, setConsultName] = useState("");
  const [consultEmail, setConsultEmail] = useState("");
  const [consultPhone, setConsultPhone] = useState("");
  const [consultSent, setConsultSent] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const t = (en: string, uk: string) => (isUk ? uk : en);

  const addToCart = (id: number, name: string) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === id);
      if (exists) return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { id, qty: 1 }];
    });
    setNotification(t(`${name} added to cart`, `${name} додано до кошика`));
    setTimeout(() => setNotification(null), 2000);
  };

  const addLookToCart = (productIds: number[]) => {
    productIds.forEach((id) => {
      const p = PRODUCTS.find((x) => x.id === id);
      if (p) addToCart(id, isUk ? p.nameUk : p.nameEn);
    });
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const deliveryPrice = DELIVERY_OPTIONS.find((d) => d.key === delivery)?.price ?? 0;
  const cartSubtotal = cart.reduce((s, i) => {
    const p = PRODUCTS.find((x) => x.id === i.id);
    return s + (p?.price ?? 0) * i.qty;
  }, 0);
  const cartTotal = cartSubtotal + deliveryPrice;

  const filteredProducts = PRODUCTS.filter((p) => p.room === activeRoom);
  const activeRoomData = ROOMS.find((r) => r.key === activeRoom);

  /* ─── photo placeholder helper ─── */
  const PhotoPlaceholder = ({
    h = "h-48",
    label,
    warm = true,
  }: {
    h?: string;
    label?: string;
    warm?: boolean;
  }) => (
    <div
      className={`${h} w-full rounded-xl flex items-center justify-center text-xs font-medium tracking-wide ${
        warm
          ? "bg-linear-to-br from-[#F0EDE8] via-[#E8E2D8] to-[#DDD5C8] text-[#A0785A]"
          : "bg-linear-to-br from-[#EDE8E3] via-[#E3DDD8] to-[#D8D0C8] text-[#8B6B50]"
      }`}
    >
      {label ?? t("Lifestyle photo", "Фото інтер'єру")}
    </div>
  );

  return (
    <div className="min-h-screen font-sans bg-[#FAF9F7] text-[#2D2D2D]">
      {/* ── Notification toast ── */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 bg-[#2D2D2D] text-white text-sm px-4 py-2 rounded-lg shadow-lg">
          ✓ {notification}
        </div>
      )}

      {/* ══════════════════════════════
          1. HEADER
      ══════════════════════════════ */}
      <header className="bg-[#FAF9F7] border-b border-[#EDE8E3] sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-6">
          {/* Logo */}
          <span className="text-xl font-semibold tracking-tight shrink-0">
            🛋️ ModernHome
          </span>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-5 text-sm text-[#5C5C5C] flex-1">
            {ROOMS.map((r) => (
              <button
                key={r.key}
                onClick={() => setActiveRoom(r.key)}
                className={`hover:text-[#2D2D2D] transition-colors ${
                  activeRoom === r.key ? "text-[#C4956A] font-medium" : ""
                }`}
              >
                {t(r.en, r.uk)}
              </button>
            ))}
          </nav>

          {/* Search */}
          <div className="flex items-center gap-2 bg-[#F5F4F0] rounded-lg px-3 py-2 text-sm text-[#8C8C8C] shrink-0">
            🔍 <span className="hidden sm:inline">{t("Search furniture…", "Пошук меблів…")}</span>
          </div>

          {/* Consultation CTA */}
          <button className="hidden md:inline text-xs border border-[#C4956A] text-[#C4956A] rounded-lg px-3 py-2 hover:bg-[#C4956A] hover:text-white transition-colors shrink-0">
            {t("Free Consultation", "Безкоштовна консультація")}
          </button>

          {/* Cart */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative shrink-0 text-xl"
          >
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#C4956A] text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* ══════════════════════════════
          2. HERO
      ══════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-4 pt-12 pb-8">
        <div className="relative rounded-2xl overflow-hidden">
          <PhotoPlaceholder h="h-80" label={t("Warm interior lifestyle photo", "Фото теплого інтер'єру")} />
          <div className="absolute inset-0 bg-linear-to-br from-black/30 to-transparent flex flex-col justify-end p-8">
            <h1 className="text-3xl md:text-4xl font-semibold text-white leading-tight mb-2">
              {t("Make Your Home Special", "Зроби Свій Дім Особливим")}
            </h1>
            <p className="text-white/80 text-base mb-6">
              {t(
                "Scandinavian furniture crafted for everyday living.",
                "Скандинавські меблі для щоденного комфорту."
              )}
            </p>
            {/* Room pills */}
            <div className="flex flex-wrap gap-2">
              {ROOMS.map((r) => (
                <button
                  key={r.key}
                  onClick={() => setActiveRoom(r.key)}
                  className={`text-sm px-4 py-2 rounded-full border transition-colors ${
                    activeRoom === r.key
                      ? "bg-[#C4956A] border-[#C4956A] text-white"
                      : "bg-white/20 border-white/40 text-white hover:bg-white/30"
                  }`}
                >
                  <EmojiIcon emoji={r.emoji} className="w-4 h-4 inline-block align-middle mr-1" />{t(r.en, r.uk)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          3. ROOM NAVIGATOR
      ══════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-xl font-semibold">
            <EmojiIcon emoji={activeRoomData?.emoji ?? ""} className="w-4 h-4 inline-block align-middle mr-1" />{t(activeRoomData?.en ?? "", activeRoomData?.uk ?? "")}
          </h2>
          <span className="text-sm text-[#8C8C8C]">
            {filteredProducts.length} {t("items", "товарів")}
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Inspiration image */}
          <div>
            <PhotoPlaceholder
              h="h-56"
              label={t(
                `${activeRoomData?.en} inspiration`,
                `Натхнення — ${activeRoomData?.uk}`
              )}
            />
            <p className="text-xs text-[#8C8C8C] mt-2 text-center">
              {t("Room Inspiration", "Натхнення для кімнати")}
            </p>
          </div>

          {/* Featured items list */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-[#5C5C5C] mb-3">
              {t("Featured for this room", "Рекомендовано для цієї кімнати")}
            </p>
            {filteredProducts.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setSelectedProduct(p);
                  setSelectedColor(0);
                }}
                className="w-full flex items-center gap-3 p-3 bg-[#F5F4F0] hover:bg-[#EDE8E3] rounded-xl transition-colors text-left"
              >
                <EmojiIcon emoji={p.emoji} className="w-7 h-7" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{isUk ? p.nameUk : p.nameEn}</div>
                  <div className="text-xs text-[#8C8C8C]">{p.dimensions}</div>
                </div>
                <div className="text-sm font-semibold text-[#C4956A] shrink-0">
                  ₴{p.price.toLocaleString()}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          4. PRODUCT CATALOG
      ══════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-4 py-8 bg-[#F5F4F0] rounded-2xl">
        <h2 className="text-xl font-semibold mb-6">{t("Product Catalog", "Каталог продуктів")}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRODUCTS.map((p) => (
            <div
              key={p.id}
              className="bg-[#FAF9F7] rounded-2xl overflow-hidden border border-[#EDE8E3] hover:shadow-md transition-shadow"
            >
              <PhotoPlaceholder h="h-36" label={isUk ? p.nameUk : p.nameEn} />
              <div className="p-4">
                <h3 className="font-semibold text-sm mb-0.5">{isUk ? p.nameUk : p.nameEn}</h3>
                <p className="text-xs text-[#8C8C8C] mb-1">{isUk ? p.materialUk : p.materialEn}</p>
                <p className="text-xs text-[#A0785A] mb-3">{p.dimensions}</p>

                {/* Color swatches */}
                <div className="flex gap-1.5 mb-3">
                  {p.colors.map((c, i) => (
                    <span
                      key={i}
                      className="w-4 h-4 rounded-full border border-white shadow-sm shrink-0"
                      style={{ backgroundColor: c }}
                      title={c}
                    />
                  ))}
                  <span className="text-xs text-[#8C8C8C] ml-1">{p.colors.length} {t("colors", "кольори")}</span>
                </div>

                <div className="font-bold text-[#C4956A] mb-3">₴{p.price.toLocaleString()}</div>

                <div className="flex gap-2">
                  <button
                    onClick={() => addToCart(p.id, isUk ? p.nameUk : p.nameEn)}
                    className="flex-1 bg-[#2D2D2D] text-white text-xs py-2 rounded-lg hover:bg-[#C4956A] transition-colors"
                  >
                    {t("Add to Cart", "До кошика")}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedProduct(p);
                      setSelectedColor(0);
                    }}
                    className="px-3 py-2 border border-[#EDE8E3] text-xs rounded-lg hover:bg-[#F5F4F0] transition-colors"
                  >
                    {t("View", "Деталі")}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════
          5. PRODUCT DETAIL MODAL
      ══════════════════════════════ */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-[#FAF9F7] rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold">
                {isUk ? selectedProduct.nameUk : selectedProduct.nameEn}
              </h2>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-[#8C8C8C] hover:text-[#2D2D2D] text-xl shrink-0"
              >
                ✕
              </button>
            </div>

            <PhotoPlaceholder h="h-48" label={isUk ? selectedProduct.nameUk : selectedProduct.nameEn} />

            <p className="text-sm text-[#5C5C5C] mt-4 mb-4 leading-relaxed">
              {isUk ? selectedProduct.descUk : selectedProduct.descEn}
            </p>

            {/* Dimensions table */}
            <div className="bg-[#F5F4F0] rounded-xl p-4 mb-4">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-[#8C8C8C] mb-2">
                {t("Dimensions", "Розміри")}
              </h3>
              <div className="grid grid-cols-3 gap-2 text-center">
                {selectedProduct.dimensions.split("×").map((d, i) => (
                  <div key={i} className="bg-white rounded-lg py-2">
                    <div className="text-sm font-semibold">{d.replace(/[^0-9]/g, "")} cm</div>
                    <div className="text-xs text-[#8C8C8C]">
                      {["H", "W", "D"][i] ?? i}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Material */}
            <div className="mb-4">
              <span className="text-xs font-semibold uppercase tracking-wide text-[#8C8C8C]">
                {t("Material", "Матеріал")}:{" "}
              </span>
              <span className="text-sm">
                {isUk ? selectedProduct.materialUk : selectedProduct.materialEn}
              </span>
            </div>

            {/* Color swatches */}
            <div className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#8C8C8C] mb-2">
                {t("Available Colors", "Доступні кольори")}
              </p>
              <div className="flex gap-3">
                {selectedProduct.colors.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(i)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor === i ? "border-[#C4956A] scale-110" : "border-white shadow"
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
              <p className="text-xs text-[#8C8C8C] mt-1">
                {t("Selected", "Обрано")}: {selectedProduct.colors[selectedColor]}
              </p>
            </div>

            {/* Delivery & warranty */}
            <div className="grid grid-cols-2 gap-3 mb-5 text-sm">
              <div className="bg-[#F5F4F0] rounded-xl p-3">
                <div className="text-xs font-semibold text-[#8C8C8C] mb-1">🚚 {t("Delivery", "Доставка")}</div>
                <div className="text-xs">{t("Standard 2–3 weeks / Express 1 week", "Стандарт 2–3 тижні / Експрес 1 тиждень")}</div>
              </div>
              <div className="bg-[#F5F4F0] rounded-xl p-3">
                <div className="text-xs font-semibold text-[#8C8C8C] mb-1">🛡️ {t("Warranty", "Гарантія")}</div>
                <div className="text-xs">{isUk ? selectedProduct.warrantyUk : selectedProduct.warrantyEn}</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-[#C4956A]">
                ₴{selectedProduct.price.toLocaleString()}
              </span>
              <button
                onClick={() => {
                  addToCart(selectedProduct.id, isUk ? selectedProduct.nameUk : selectedProduct.nameEn);
                  setSelectedProduct(null);
                }}
                className="bg-[#2D2D2D] text-white px-6 py-3 rounded-xl text-sm hover:bg-[#C4956A] transition-colors"
              >
                {t("Add to Cart", "До кошика")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════
          6. INTERIOR LOOKBOOK
      ══════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-xl font-semibold mb-2">{t("Interior Lookbook", "Каталог інтер'єрів")}</h2>
        <p className="text-sm text-[#8C8C8C] mb-6">
          {t("Complete room setups — shop the whole look at once.", "Готові інтер'єри — додайте все одним кліком.")}
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {LOOKBOOK.map((look) => {
            const lookProducts = look.items.map((id) => PRODUCTS.find((p) => p.id === id)!).filter(Boolean);
            return (
              <div key={look.key} className="rounded-2xl overflow-hidden border border-[#EDE8E3] bg-[#FAF9F7]">
                <div
                  className="h-36 flex items-center justify-center"
                  style={{ backgroundColor: look.bg }}
                >
                  <EmojiIcon emoji={look.emoji} className="w-10 h-10" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm mb-1">
                    {isUk ? look.titleUk : look.titleEn}
                  </h3>
                  <p className="text-xs text-[#8C8C8C] mb-3">
                    {isUk ? look.noteUk : look.noteEn}
                  </p>
                  <ul className="space-y-1 mb-4">
                    {lookProducts.map((p) => (
                      <li key={p.id} className="text-xs text-[#5C5C5C] flex justify-between">
                        <span>{isUk ? p.nameUk : p.nameEn}</span>
                        <span className="text-[#C4956A]">₴{p.price.toLocaleString()}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => addLookToCart(look.items)}
                    className="w-full bg-[#C4956A] text-white text-xs py-2 rounded-xl hover:bg-[#A0785A] transition-colors"
                  >
                    {t("Shop This Look", "Купити цей стиль")}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════
          7. MATERIAL & COLOR GUIDE
      ══════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-4 py-8 bg-[#F5F4F0] rounded-2xl">
        <h2 className="text-xl font-semibold mb-2">{t("Material & Color Guide", "Гід по матеріалах і кольорах")}</h2>
        <p className="text-sm text-[#8C8C8C] mb-6">
          {t("Understanding our materials helps you make the right choice.", "Розуміння матеріалів допоможе вам зробити правильний вибір.")}
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {MATERIALS.map((m) => (
            <div key={m.nameEn} className="bg-[#FAF9F7] rounded-2xl p-5 border border-[#EDE8E3]">
              <div className="mb-2"><EmojiIcon emoji={m.emoji} className="w-8 h-8" /></div>
              <h3 className="font-semibold text-sm mb-3">{isUk ? m.nameUk : m.nameEn}</h3>
              {/* Swatches */}
              <div className="flex gap-2 mb-3">
                {m.swatches.map((c, i) => (
                  <span
                    key={i}
                    className="w-6 h-6 rounded-full border border-white shadow-sm shrink-0"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
              <p className="text-xs text-[#5C5C5C] leading-relaxed">
                🧹 {isUk ? m.careUk : m.careEn}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════
          8. CART
      ══════════════════════════════ */}
      {cartOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/40"
          onClick={() => setCartOpen(false)}
        >
          <div
            className="bg-[#FAF9F7] w-full max-w-sm h-full overflow-y-auto p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">🛒 {t("Cart", "Кошик")}</h2>
              <button onClick={() => setCartOpen(false)} className="text-[#8C8C8C] text-xl">✕</button>
            </div>

            {cart.length === 0 ? (
              <p className="text-sm text-[#8C8C8C] text-center py-10">
                {t("Your cart is empty", "Кошик порожній")}
              </p>
            ) : (
              <>
                <div className="space-y-3 mb-6">
                  {cart.map((item) => {
                    const p = PRODUCTS.find((x) => x.id === item.id)!;
                    if (!p) return null;
                    return (
                      <div key={item.id} className="flex items-center gap-3 bg-[#F5F4F0] rounded-xl p-3">
                        <EmojiIcon emoji={p.emoji} className="w-5 h-5" />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">{isUk ? p.nameUk : p.nameEn}</div>
                          <div className="text-xs text-[#8C8C8C]">
                            {item.qty} × ₴{p.price.toLocaleString()}
                          </div>
                        </div>
                        <div className="text-sm font-semibold text-[#C4956A] shrink-0">
                          ₴{(p.price * item.qty).toLocaleString()}
                        </div>
                        <button
                          onClick={() => setCart((prev) => prev.filter((i) => i.id !== item.id))}
                          className="text-[#C4956A] text-xs shrink-0 ml-1"
                        >
                          ✕
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Delivery options */}
                <div className="mb-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#8C8C8C] mb-2">
                    🚚 {t("Delivery", "Доставка")}
                  </p>
                  {DELIVERY_OPTIONS.map((d) => (
                    <label key={d.key} className="flex items-center gap-2 text-sm mb-2 cursor-pointer">
                      <input
                        type="radio"
                        name="delivery"
                        value={d.key}
                        checked={delivery === d.key}
                        onChange={() => setDelivery(d.key)}
                        className="accent-[#C4956A]"
                      />
                      <span>{isUk ? d.uk : d.en}</span>
                    </label>
                  ))}
                </div>

                {/* Totals */}
                <div className="border-t border-[#EDE8E3] pt-4 space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#8C8C8C]">{t("Subtotal", "Підсумок")}</span>
                    <span>₴{cartSubtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#8C8C8C]">{t("Delivery", "Доставка")}</span>
                    <span>{deliveryPrice === 0 ? t("Free", "Безкоштовно") : `₴${deliveryPrice}`}</span>
                  </div>
                  <div className="flex justify-between font-bold text-base">
                    <span>{t("Total", "Разом")}</span>
                    <span className="text-[#C4956A]">₴{cartTotal.toLocaleString()}</span>
                  </div>
                </div>

                <button className="w-full bg-[#2D2D2D] text-white py-3 rounded-xl hover:bg-[#C4956A] transition-colors text-sm font-medium">
                  {t("Checkout", "Оформити замовлення")}
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* ══════════════════════════════
          9. DESIGN CONSULTATION
      ══════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-[#2D2D2D] text-white rounded-2xl p-8">
          <h2 className="text-xl font-semibold mb-1">
            🎨 {t("Free Design Consultation", "Безкоштовна дизайн-консультація")}
          </h2>
          <p className="text-white/70 text-sm mb-6">
            {t(
              "30-minute session with our interior specialist — no obligation.",
              "30 хвилин з нашим фахівцем з інтер'єру — без зобов'язань."
            )}
          </p>

          {consultSent ? (
            <div className="text-center py-6">
              <div className="text-4xl mb-3">✅</div>
              <p className="text-white font-medium">
                {t("Thank you! We'll contact you within 24h.", "Дякуємо! Зв'яжемося з вами протягом 24 год.")}
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setConsultSent(true);
              }}
              className="grid md:grid-cols-2 gap-4"
            >
              {/* Room type */}
              <div>
                <label className="block text-xs text-white/60 mb-1">{t("Room type", "Тип кімнати")}</label>
                <select
                  value={consultRoom}
                  onChange={(e) => setConsultRoom(e.target.value)}
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white"
                >
                  <option value="">{t("Select room…", "Оберіть кімнату…")}</option>
                  {ROOMS.map((r) => (
                    <option key={r.key} value={r.key}>{t(r.en, r.uk)}</option>
                  ))}
                </select>
              </div>

              {/* Style */}
              <div>
                <label className="block text-xs text-white/60 mb-1">{t("Current style", "Поточний стиль")}</label>
                <select
                  value={consultStyle}
                  onChange={(e) => setConsultStyle(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white"
                >
                  <option value="">{t("Select style…", "Оберіть стиль…")}</option>
                  {STYLES.map((s) => (
                    <option key={s.en} value={s.en}>{isUk ? s.uk : s.en}</option>
                  ))}
                </select>
              </div>

              {/* Budget */}
              <div>
                <label className="block text-xs text-white/60 mb-1">{t("Budget range", "Бюджет")}</label>
                <select
                  value={consultBudget}
                  onChange={(e) => setConsultBudget(e.target.value)}
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white"
                >
                  <option value="">{t("Select budget…", "Оберіть бюджет…")}</option>
                  {BUDGETS.map((b) => (
                    <option key={b.en} value={b.en}>{isUk ? b.uk : b.en}</option>
                  ))}
                </select>
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs text-white/60 mb-1">{t("Your name", "Ваше ім'я")}</label>
                <input
                  type="text"
                  value={consultName}
                  onChange={(e) => setConsultName(e.target.value)}
                  required
                  placeholder={t("Anna", "Анна")}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs text-white/60 mb-1">{t("Email", "Email")}</label>
                <input
                  type="email"
                  value={consultEmail}
                  onChange={(e) => setConsultEmail(e.target.value)}
                  required
                  placeholder="anna@example.com"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs text-white/60 mb-1">{t("Phone", "Телефон")}</label>
                <input
                  type="tel"
                  value={consultPhone}
                  onChange={(e) => setConsultPhone(e.target.value)}
                  placeholder="+380 XX XXX XXXX"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30"
                />
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="bg-[#C4956A] text-white px-8 py-3 rounded-xl text-sm font-medium hover:bg-[#A0785A] transition-colors"
                >
                  {t("Book Free Consultation", "Записатися на консультацію")}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* ══════════════════════════════
          10. REVIEWS
      ══════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold mb-6">{t("Customer Reviews", "Відгуки клієнтів")}</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {REVIEWS.map((r, i) => (
            <div key={i} className="bg-[#F5F4F0] rounded-2xl p-5">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="font-semibold text-sm">{isUk ? r.nameUk : r.nameEn}</div>
                  <div className="text-xs text-[#C4956A]">{isUk ? r.productUk : r.productEn}</div>
                </div>
                <div className="text-sm">{"⭐".repeat(r.rating)}</div>
              </div>
              <p className="text-sm text-[#5C5C5C] leading-relaxed mb-3">
                "{isUk ? r.textUk : r.textEn}"
              </p>
              <div className="bg-[#EDE8E3] rounded-xl p-3 text-xs text-[#8C8C8C]">
                📸 {isUk ? r.resultUk : r.resultEn}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════
          11. FOOTER
      ══════════════════════════════ */}
      <footer className="bg-[#2D2D2D] text-white mt-8">
        <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="text-lg font-semibold mb-2">🛋️ ModernHome</div>
            <p className="text-white/60 text-xs leading-relaxed">
              {t(
                "Scandinavian furniture for Ukrainian homes. Quality crafted to last generations.",
                "Скандинавські меблі для українських домівок. Якість, що служить поколінням."
              )}
            </p>
          </div>

          {/* Showroom */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-white/50 mb-3">
              📍 {t("Kyiv Showroom", "Шоурум у Києві")}
            </h3>
            <p className="text-xs text-white/70 leading-relaxed">
              вул. Хрещатик 22, Київ<br />
              {t("Mon–Sun: 10:00 – 20:00", "Пн–Нд: 10:00 – 20:00")}<br />
              +380 44 123 4567
            </p>
          </div>

          {/* Delivery */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-white/50 mb-3">
              🚚 {t("Delivery Zones", "Зони доставки")}
            </h3>
            <ul className="text-xs text-white/70 space-y-1">
              <li>✓ {t("Kyiv & Kyiv Region", "Київ та Київська область")}</li>
              <li>✓ {t("Lviv, Kharkiv, Odesa", "Львів, Харків, Одеса")}</li>
              <li>✓ {t("All Ukraine (Nova Poshta)", "Вся Україна (Нова Пошта)")}</li>
              <li>✓ {t("Assembly service available", "Послуга збірки доступна")}</li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-white/50 mb-3">
              🔧 {t("Services", "Послуги")}
            </h3>
            <ul className="text-xs text-white/70 space-y-1">
              <li>🪛 {t("Furniture Assembly", "Збірка меблів")}</li>
              <li>🎨 {t("Interior Consultation", "Консультація з інтер'єру")}</li>
              <li>📐 {t("Custom Orders", "Індивідуальні замовлення")}</li>
              <li>🔄 {t("30-day Returns", "Повернення протягом 30 днів")}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 py-4 px-4 max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-white/40 text-xs">© 2025 ModernHome. {t("All rights reserved.", "Всі права захищені.")}</p>
          <p className="text-white/40 text-xs">
            {t("Made with ❤️ in Kyiv", "Зроблено з ❤️ у Києві")}
          </p>
        </div>
      </footer>
    </div>
  );
}
