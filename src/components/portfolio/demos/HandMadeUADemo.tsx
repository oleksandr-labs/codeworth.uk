"use client";

import { useState } from "react";
import { EmojiIcon } from "@/components/ui/EmojiIcon";

/* ───────────────────── data ───────────────────── */

const WORKSHOPS = [
  {
    id: 1,
    emoji: "🏺",
    nameEn: "Ceramics & Pottery",
    nameUk: "Кераміка та гончарство",
    descEn: "Learn hand-building and wheel-throwing techniques to create unique ceramic pieces.",
    descUk: "Навчіться техніці ручного ліплення та гончарного кола для створення унікальних виробів.",
    duration: "3h",
    difficulty: "beginner",
    price: 850,
    maxParticipants: 8,
    nextDate: "2026-04-05",
  },
  {
    id: 2,
    emoji: "🪢",
    nameEn: "Macramé",
    nameUk: "Макраме",
    descEn: "Master knotting patterns to craft wall hangings, plant holders, and accessories.",
    descUk: "Опануйте техніку плетіння для створення панно, кашпо та аксесуарів.",
    duration: "2.5h",
    difficulty: "beginner",
    price: 650,
    maxParticipants: 10,
    nextDate: "2026-04-08",
  },
  {
    id: 3,
    emoji: "🕯️",
    nameEn: "Candle Making",
    nameUk: "Виготовлення свічок",
    descEn: "Pour, scent, and decorate handmade soy candles in beautiful containers.",
    descUk: "Заливайте, ароматизуйте та декоруйте соєві свічки у красивих ємностях.",
    duration: "2h",
    difficulty: "beginner",
    price: 550,
    maxParticipants: 12,
    nextDate: "2026-04-03",
  },
  {
    id: 4,
    emoji: "🎨",
    nameEn: "Watercolor Painting",
    nameUk: "Акварельний живопис",
    descEn: "Explore watercolor washes, wet-on-wet, and botanical illustration techniques.",
    descUk: "Дослідіть техніки заливок, мокрим по мокрому та ботанічної ілюстрації.",
    duration: "3h",
    difficulty: "intermediate",
    price: 750,
    maxParticipants: 8,
    nextDate: "2026-04-10",
  },
  {
    id: 5,
    emoji: "🪡",
    nameEn: "Embroidery",
    nameUk: "Вишивка",
    descEn: "Traditional and modern embroidery stitches on hoops, clothing, and accessories.",
    descUk: "Традиційні та сучасні стібки вишивки на п'яльцях, одязі та аксесуарах.",
    duration: "2.5h",
    difficulty: "intermediate",
    price: 700,
    maxParticipants: 10,
    nextDate: "2026-04-12",
  },
  {
    id: 6,
    emoji: "🧼",
    nameEn: "Soap Making",
    nameUk: "Мило ручної роботи",
    descEn: "Cold-process soap with natural oils, herbs, and essential oils for beautiful bars.",
    descUk: "Холодне мило з натуральними оліями, травами та ефірними маслами.",
    duration: "2h",
    difficulty: "beginner",
    price: 600,
    maxParticipants: 10,
    nextDate: "2026-04-06",
  },
];

const PRODUCTS = [
  { id: 1, emoji: "🏺", nameEn: "Ceramic Bowl", nameUk: "Керамічна миска", price: 480 },
  { id: 2, emoji: "🪢", nameEn: "Macramé Wall Hanging", nameUk: "Макраме панно", price: 920 },
  { id: 3, emoji: "🕯️", nameEn: "Candles Set (3 pcs)", nameUk: "Набір свічок (3 шт)", price: 350 },
  { id: 4, emoji: "🪡", nameEn: "Embroidered Shirt", nameUk: "Вишиванка", price: 1800 },
  { id: 5, emoji: "🧼", nameEn: "Soap Gift Box", nameUk: "Подарунковий набір мила", price: 420 },
  { id: 6, emoji: "🖼️", nameEn: "Watercolor Print", nameUk: "Акварельний принт", price: 560 },
  { id: 7, emoji: "🧶", nameEn: "Knitted Scarf", nameUk: "В'язаний шарф", price: 680 },
  { id: 8, emoji: "📔", nameEn: "Leather Journal", nameUk: "Шкіряний журнал", price: 750 },
];

const ARTISTS = [
  {
    emoji: "👩‍🎨",
    nameEn: "Oksana Petrenko",
    nameUk: "Оксана Петренко",
    craftEn: "Ceramics & Pottery",
    craftUk: "Кераміка та гончарство",
    years: 12,
    bioEn:
      "Oksana discovered pottery during her studies in Kyiv and never looked back. Her work blends traditional Ukrainian motifs with contemporary minimalism.",
    bioUk:
      "Оксана відкрила для себе гончарство під час навчання в Києві. Її роботи поєднують традиційні українські мотиви з сучасним мінімалізмом.",
    featuredEn: "Award-winning Trypillian-inspired dinnerware collection",
    featuredUk: "Колекція посуду за мотивами трипільської культури",
  },
  {
    emoji: "🧑‍🎨",
    nameEn: "Dmytro Koval",
    nameUk: "Дмитро Коваль",
    craftEn: "Leather & Bookbinding",
    craftUk: "Шкіряна справа та палітурка",
    years: 8,
    bioEn:
      "A former architect, Dmytro brings structural precision to leather craft. Each journal is hand-stitched with linen thread and finished with beeswax.",
    bioUk:
      "Колишній архітектор, Дмитро привносить структурну точність у шкіряну справу. Кожен журнал зшитий вручну лляною ниткою.",
    featuredEn: "Hand-tooled leather journal with Carpathian mountain motifs",
    featuredUk: "Шкіряний журнал з карпатськими мотивами ручного тиснення",
  },
  {
    emoji: "👩‍🎨",
    nameEn: "Iryna Savchenko",
    nameUk: "Ірина Савченко",
    craftEn: "Embroidery & Textile Art",
    craftUk: "Вишивка та текстильне мистецтво",
    years: 15,
    bioEn:
      "Iryna preserves centuries-old embroidery patterns from the Poltava region while teaching the next generation of textile artists.",
    bioUk:
      "Ірина зберігає вікові візерунки вишивки Полтавщини, навчаючи наступне покоління текстильних художників.",
    featuredEn: "Museum-exhibited traditional Poltava rushnyky collection",
    featuredUk: "Музейна колекція традиційних полтавських рушників",
  },
];

const STEPS = [
  { emoji: "🌿", titleEn: "Raw Materials", titleUk: "Сировина", descEn: "Sourced locally and ethically — clay, wool, beeswax, natural dyes", descUk: "Місцеві та етичні матеріали — глина, вовна, бджолиний віск, натуральні барвники" },
  { emoji: "🤲", titleEn: "Crafting", titleUk: "Створення", descEn: "Shaped by hand with care, patience, and generations of knowledge", descUk: "Створено руками з турботою, терпінням та знаннями поколінь" },
  { emoji: "✨", titleEn: "Finishing", titleUk: "Оздоблення", descEn: "Glazed, polished, and perfected — every detail matters", descUk: "Глазуровано, відполіровано та вдосконалено — кожна деталь має значення" },
  { emoji: "🎁", titleEn: "Your Hands", titleUk: "У ваших руках", descEn: "Wrapped with love and delivered to bring joy into your home", descUk: "Загорнуто з любов'ю та доставлено, щоб принести радість у ваш дім" },
];

const GIFT_CARDS = [
  {
    amount: 500,
    emoji: "🎀",
    includesEn: ["1 beginner workshop", "Small handmade gift", "Personalized card"],
    includesUk: ["1 майстер-клас для початківців", "Невеликий подарунок ручної роботи", "Персоналізована листівка"],
  },
  {
    amount: 1000,
    emoji: "🎁",
    includesEn: ["Any single workshop", "Handmade gift set", "Personalized card", "Hot drink & snack"],
    includesUk: ["Будь-який майстер-клас", "Набір подарунків ручної роботи", "Персоналізована листівка", "Гарячий напій та перекус"],
  },
  {
    amount: 2000,
    emoji: "👑",
    includesEn: ["2 workshops of choice", "Premium gift box", "Personalized card", "Full refreshments", "10% shop discount"],
    includesUk: ["2 майстер-класи на вибір", "Преміум подарунковий набір", "Персоналізована листівка", "Повне частування", "Знижка 10% у магазині"],
  },
];

const GALLERY_EMOJI = ["🏺", "🧶", "🕯️", "🎨", "🪡", "🧼", "🪢", "📔"];

const BOOKING_DATES = ["2026-04-05", "2026-04-12", "2026-04-19"];

/* ───────────────────── component ───────────────────── */

export function HandMadeUADemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  /* cart */
  const [cartCount, setCartCount] = useState(0);

  /* booking */
  const [bookingWorkshop, setBookingWorkshop] = useState(0);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingParticipants, setBookingParticipants] = useState(1);
  const [bookingGift, setBookingGift] = useState(false);
  const [bookingName, setBookingName] = useState("");
  const [bookingEmail, setBookingEmail] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  /* newsletter */
  const [nlEmail, setNlEmail] = useState("");
  const [nlDone, setNlDone] = useState(false);

  const selectedWs = WORKSHOPS.find((w) => w.id === bookingWorkshop);
  const bookingTotal =
    (selectedWs ? selectedWs.price * bookingParticipants : 0) +
    (bookingGift ? 100 : 0);

  const t = (en: string, uk: string) => (isUk ? uk : en);

  /* ─── render ─── */
  return (
    <div className="min-h-screen bg-[#fffbeb] text-[#92400e] font-sans">
      {/* ============ HEADER ============ */}
      <header className="sticky top-0 z-30 bg-[#fffbeb]/95 backdrop-blur border-b border-[#c2410c]/15">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          {/* logo */}
          <div className="shrink-0 flex items-center gap-2">
            <EmojiIcon emoji="🧶" className="w-7 h-7" />
            <span className="text-xl font-bold tracking-tight text-[#c2410c]">
              HandMadeUA
            </span>
            <span className="hidden sm:inline text-xs text-[#92400e]/60 ml-1">
              Craft Workshop
            </span>
          </div>

          {/* nav */}
          <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-[#92400e]/80">
            <a href="#workshops" className="hover:text-[#c2410c] transition-colors">
              {t("Workshops", "Майстер-класи")}
            </a>
            <a href="#products" className="hover:text-[#c2410c] transition-colors">
              {t("Products", "Продукція")}
            </a>
            <a href="#artists" className="hover:text-[#c2410c] transition-colors">
              {t("Artists", "Майстри")}
            </a>
            <a href="#about" className="hover:text-[#c2410c] transition-colors">
              {t("About", "Про нас")}
            </a>
            <a href="#contact" className="hover:text-[#c2410c] transition-colors">
              {t("Contact", "Контакти")}
            </a>
          </nav>

          <div className="flex items-center gap-3">
            {/* cart counter */}
            <span className="relative cursor-pointer" title={t("Cart", "Кошик")}>
              <EmojiIcon emoji="🛒" className="w-5 h-5 inline-block align-middle" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-[#c2410c] text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </span>
            {/* CTA */}
            <a
              href="#booking"
              className="hidden sm:inline-flex px-4 py-2 bg-[#c2410c] text-white rounded-full text-sm font-semibold hover:bg-[#ea580c] transition-colors"
            >
              {t("Book Workshop", "Записатися")}
            </a>
          </div>
        </div>
      </header>

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-linear-to-br from-[#fef3c7] via-[#fffbeb] to-[#fef3c7]">
        {/* decorative emoji */}
        <div className="absolute inset-0 pointer-events-none select-none opacity-10">
          <EmojiIcon emoji="🧶" className="w-10 h-10 absolute top-6 left-[10%]" />
          <EmojiIcon emoji="🎨" className="w-10 h-10 absolute top-20 right-[15%]" />
          <EmojiIcon emoji="🏺" className="w-10 h-10 absolute bottom-16 left-[20%]" />
          <EmojiIcon emoji="🪡" className="w-10 h-10 absolute top-32 left-[50%]" />
          <EmojiIcon emoji="✂️" className="w-10 h-10 absolute bottom-8 right-[25%]" />
          <EmojiIcon emoji="🕯️" className="w-10 h-10 absolute top-10 left-[70%]" />
          <EmojiIcon emoji="🧼" className="w-10 h-10 absolute bottom-28 right-[10%]" />
          <EmojiIcon emoji="🪢" className="w-10 h-10 absolute bottom-10 left-[45%]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 py-24 sm:py-32 text-center">
          <p className="text-[#ea580c] font-medium tracking-widest uppercase text-sm mb-4">
            {t("Handcrafted in Ukraine", "Створено в Україні")}
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif italic font-bold text-[#92400e] leading-tight mb-6">
            {t("Made with Love and Soul", "Створено з Любов'ю та Душею")}
          </h1>
          <p className="text-lg sm:text-xl text-[#92400e]/70 max-w-2xl mx-auto mb-10">
            {t(
              "Discover the joy of handmade crafts. Join our workshops, shop unique artisan products, and support local Ukrainian makers.",
              "Відкрийте радість ручної роботи. Приєднуйтесь до майстер-класів, обирайте унікальні вироби та підтримуйте українських майстрів."
            )}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#workshops"
              className="px-8 py-3 bg-[#c2410c] text-white rounded-full font-semibold hover:bg-[#ea580c] transition-colors text-base"
            >
              {t("View Workshops", "Переглянути майстер-класи")}
            </a>
            <a
              href="#products"
              className="px-8 py-3 border-2 border-[#c2410c] text-[#c2410c] rounded-full font-semibold hover:bg-[#c2410c] hover:text-white transition-colors text-base"
            >
              {t("Shop Handmade", "Магазин")}
            </a>
          </div>
        </div>
      </section>

      {/* ============ WORKSHOPS CATALOG ============ */}
      <section id="workshops" className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-3xl sm:text-4xl font-serif italic font-bold text-[#92400e] text-center mb-3">
          {t("Our Workshops", "Наші майстер-класи")}
        </h2>
        <p className="text-center text-[#92400e]/60 mb-12 max-w-xl mx-auto">
          {t(
            "Hands-on classes taught by experienced artisans. All materials included.",
            "Практичні заняття від досвідчених майстрів. Усі матеріали включені."
          )}
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WORKSHOPS.map((ws) => (
            <div
              key={ws.id}
              className="bg-white border border-[#c2410c]/10 rounded-2xl p-6 flex flex-col hover:shadow-lg hover:shadow-[#c2410c]/5 transition-shadow"
            >
              <div className="mb-3"><EmojiIcon emoji={ws.emoji} className="w-10 h-10" /></div>
              <h3 className="text-lg font-bold text-[#92400e] mb-1">
                {isUk ? ws.nameUk : ws.nameEn}
              </h3>
              <p className="text-sm text-[#92400e]/60 mb-4 flex-1">
                {isUk ? ws.descUk : ws.descEn}
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs text-[#92400e]/70 mb-4">
                <span>⏱ {ws.duration}</span>
                <span>
                  📊{" "}
                  {ws.difficulty === "beginner"
                    ? t("Beginner", "Початковий")
                    : t("Intermediate", "Середній")}
                </span>
                <span>👥 {t(`Max ${ws.maxParticipants}`, `Макс ${ws.maxParticipants}`)}</span>
                <span>📅 {ws.nextDate}</span>
              </div>

              <div className="flex items-center justify-between mt-auto">
                <span className="text-xl font-bold text-[#c2410c]">₴{ws.price}</span>
                <a
                  href="#booking"
                  onClick={() => setBookingWorkshop(ws.id)}
                  className="px-4 py-2 bg-[#c2410c] text-white rounded-full text-sm font-semibold hover:bg-[#ea580c] transition-colors"
                >
                  {t("Book Seat", "Забронювати")}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ BOOKING ============ */}
      <section id="booking" className="bg-linear-to-br from-[#fef3c7] to-[#fffbeb] py-20">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-serif italic font-bold text-[#92400e] text-center mb-3">
            {t("Book a Workshop", "Забронювати майстер-клас")}
          </h2>
          <p className="text-center text-[#92400e]/60 mb-10">
            {t("Reserve your spot in just a few steps.", "Забронюйте місце за кілька кроків.")}
          </p>

          {bookingConfirmed ? (
            <div className="bg-white border border-[#65a30d]/30 rounded-2xl p-8 text-center">
              <div className="mb-4"><EmojiIcon emoji="🎉" className="w-14 h-14" /></div>
              <h3 className="text-2xl font-bold text-[#65a30d] mb-2">
                {t("Booking Confirmed!", "Бронювання підтверджено!")}
              </h3>
              <p className="text-[#92400e]/70 mb-6">
                {t(
                  "We've sent the details to your email. See you at the workshop!",
                  "Деталі надіслано на вашу електронну пошту. Чекаємо на майстер-класі!"
                )}
              </p>
              <button
                onClick={() => {
                  setBookingConfirmed(false);
                  setBookingWorkshop(0);
                  setBookingDate("");
                  setBookingParticipants(1);
                  setBookingGift(false);
                  setBookingName("");
                  setBookingEmail("");
                  setBookingPhone("");
                }}
                className="px-6 py-2 border-2 border-[#c2410c] text-[#c2410c] rounded-full font-semibold hover:bg-[#c2410c] hover:text-white transition-colors"
              >
                {t("Book Another", "Нове бронювання")}
              </button>
            </div>
          ) : (
            <div className="bg-white border border-[#c2410c]/10 rounded-2xl p-6 sm:p-8 space-y-6">
              {/* workshop select */}
              <div>
                <label className="block text-sm font-semibold text-[#92400e] mb-1">
                  {t("Select Workshop", "Оберіть майстер-клас")}
                </label>
                <select
                  value={bookingWorkshop}
                  onChange={(e) => setBookingWorkshop(Number(e.target.value))}
                  className="w-full border border-[#c2410c]/20 rounded-lg px-3 py-2 text-sm bg-white text-[#92400e] focus:outline-none focus:ring-2 focus:ring-[#c2410c]/30"
                >
                  <option value={0}>{t("-- Choose --", "-- Обрати --")}</option>
                  {WORKSHOPS.map((ws) => (
                    <option key={ws.id} value={ws.id}>
                      {ws.emoji} {isUk ? ws.nameUk : ws.nameEn} — ₴{ws.price}
                    </option>
                  ))}
                </select>
              </div>

              {/* date */}
              <div>
                <label className="block text-sm font-semibold text-[#92400e] mb-1">
                  {t("Pick a Date", "Оберіть дату")}
                </label>
                <div className="flex flex-wrap gap-2">
                  {BOOKING_DATES.map((d) => (
                    <button
                      key={d}
                      onClick={() => setBookingDate(d)}
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                        bookingDate === d
                          ? "bg-[#c2410c] text-white border-[#c2410c]"
                          : "border-[#c2410c]/20 text-[#92400e] hover:border-[#c2410c]/50"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* participants */}
              <div>
                <label className="block text-sm font-semibold text-[#92400e] mb-1">
                  {t("Participants", "Кількість учасників")}
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setBookingParticipants(Math.max(1, bookingParticipants - 1))}
                    className="w-9 h-9 rounded-full border border-[#c2410c]/20 text-[#c2410c] font-bold hover:bg-[#c2410c]/5 transition-colors"
                  >
                    −
                  </button>
                  <span className="text-lg font-bold text-[#92400e] w-6 text-center">
                    {bookingParticipants}
                  </span>
                  <button
                    onClick={() => setBookingParticipants(Math.min(4, bookingParticipants + 1))}
                    className="w-9 h-9 rounded-full border border-[#c2410c]/20 text-[#c2410c] font-bold hover:bg-[#c2410c]/5 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* gift packaging */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={bookingGift}
                  onChange={(e) => setBookingGift(e.target.checked)}
                  className="w-5 h-5 accent-[#c2410c]"
                />
                <span className="text-sm text-[#92400e]">
                  🎁 {t("Add gift packaging (+₴100)", "Додати подарункову упаковку (+₴100)")}
                </span>
              </label>

              {/* contact */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#92400e] mb-1">
                    {t("Name", "Ім'я")}
                  </label>
                  <input
                    type="text"
                    value={bookingName}
                    onChange={(e) => setBookingName(e.target.value)}
                    placeholder={t("Your name", "Ваше ім'я")}
                    className="w-full border border-[#c2410c]/20 rounded-lg px-3 py-2 text-sm bg-white text-[#92400e] placeholder:text-[#92400e]/30 focus:outline-none focus:ring-2 focus:ring-[#c2410c]/30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#92400e] mb-1">
                    {t("Phone", "Телефон")}
                  </label>
                  <input
                    type="tel"
                    value={bookingPhone}
                    onChange={(e) => setBookingPhone(e.target.value)}
                    placeholder="+380..."
                    className="w-full border border-[#c2410c]/20 rounded-lg px-3 py-2 text-sm bg-white text-[#92400e] placeholder:text-[#92400e]/30 focus:outline-none focus:ring-2 focus:ring-[#c2410c]/30"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#92400e] mb-1">Email</label>
                <input
                  type="email"
                  value={bookingEmail}
                  onChange={(e) => setBookingEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full border border-[#c2410c]/20 rounded-lg px-3 py-2 text-sm bg-white text-[#92400e] placeholder:text-[#92400e]/30 focus:outline-none focus:ring-2 focus:ring-[#c2410c]/30"
                />
              </div>

              {/* total */}
              <div className="flex items-center justify-between border-t border-[#c2410c]/10 pt-4">
                <div>
                  <p className="text-xs text-[#92400e]/50">{t("Total", "Разом")}</p>
                  <p className="text-2xl font-bold text-[#c2410c]">₴{bookingTotal}</p>
                </div>
                <button
                  disabled={!bookingWorkshop || !bookingDate || !bookingName || !bookingEmail}
                  onClick={() => setBookingConfirmed(true)}
                  className="px-6 py-3 bg-[#c2410c] text-white rounded-full font-semibold hover:bg-[#ea580c] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {t("Confirm Booking", "Підтвердити бронювання")}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ============ PRODUCTS ============ */}
      <section id="products" className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-3xl sm:text-4xl font-serif italic font-bold text-[#92400e] text-center mb-3">
          {t("Handmade Products", "Вироби ручної роботи")}
        </h2>
        <p className="text-center text-[#92400e]/60 mb-12 max-w-xl mx-auto">
          {t(
            "Each piece is unique, crafted by our artisans with care and intention.",
            "Кожен виріб унікальний, створений нашими майстрами з турботою та натхненням."
          )}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {PRODUCTS.map((p) => (
            <div
              key={p.id}
              className="bg-white border border-[#c2410c]/10 rounded-2xl p-5 flex flex-col items-center text-center hover:shadow-lg hover:shadow-[#c2410c]/5 transition-shadow"
            >
              <div className="mb-3"><EmojiIcon emoji={p.emoji} className="w-14 h-14" /></div>
              <h3 className="text-sm font-bold text-[#92400e] mb-1">
                {isUk ? p.nameUk : p.nameEn}
              </h3>
              <p className="text-lg font-bold text-[#c2410c] mb-4">₴{p.price}</p>
              <button
                onClick={() => setCartCount((c) => c + 1)}
                className="mt-auto px-4 py-2 border-2 border-[#c2410c] text-[#c2410c] rounded-full text-xs font-semibold hover:bg-[#c2410c] hover:text-white transition-colors"
              >
                {t("Add to Cart", "У кошик")}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ============ ARTISTS ============ */}
      <section id="artists" className="bg-linear-to-br from-[#fef3c7] to-[#fffbeb] py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-serif italic font-bold text-[#92400e] text-center mb-3">
            {t("Meet the Artists", "Познайомтесь з майстрами")}
          </h2>
          <p className="text-center text-[#92400e]/60 mb-12 max-w-xl mx-auto">
            {t(
              "The talented hands behind every piece in our workshop.",
              "Талановиті руки, що стоять за кожним виробом нашої майстерні."
            )}
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {ARTISTS.map((a, i) => (
              <div
                key={i}
                className="bg-white border border-[#c2410c]/10 rounded-2xl p-6 text-center"
              >
                <div className="mb-3"><EmojiIcon emoji={a.emoji} className="w-14 h-14" /></div>
                <h3 className="text-lg font-bold text-[#92400e]">
                  {isUk ? a.nameUk : a.nameEn}
                </h3>
                <p className="text-sm text-[#c2410c] font-medium mb-1">
                  {isUk ? a.craftUk : a.craftEn}
                </p>
                <p className="text-xs text-[#92400e]/50 mb-3">
                  {t(`${a.years} years of practice`, `${a.years} років практики`)}
                </p>
                <p className="text-sm text-[#92400e]/70 mb-4">
                  {isUk ? a.bioUk : a.bioEn}
                </p>
                <div className="bg-[#fef3c7] rounded-xl p-3">
                  <p className="text-xs text-[#92400e]/50 mb-1">
                    {t("Featured work", "Відомий виріб")}
                  </p>
                  <p className="text-sm font-semibold text-[#92400e]">
                    {isUk ? a.featuredUk : a.featuredEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section id="about" className="max-w-5xl mx-auto px-4 py-20">
        <h2 className="text-3xl sm:text-4xl font-serif italic font-bold text-[#92400e] text-center mb-3">
          {t("From Raw Material to Masterpiece", "Від сировини до шедевру")}
        </h2>
        <p className="text-center text-[#92400e]/60 mb-14 max-w-xl mx-auto">
          {t(
            "Every handmade piece follows a journey of care and craftsmanship.",
            "Кожен виріб проходить шлях турботи та майстерності."
          )}
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((s, i) => (
            <div key={i} className="text-center">
              <div className="mb-4"><EmojiIcon emoji={s.emoji} className="w-14 h-14" /></div>
              <div className="text-xs text-[#c2410c] font-bold mb-1">
                {t("Step", "Крок")} {i + 1}
              </div>
              <h3 className="text-lg font-bold text-[#92400e] mb-2">
                {isUk ? s.titleUk : s.titleEn}
              </h3>
              <p className="text-sm text-[#92400e]/60">
                {isUk ? s.descUk : s.descEn}
              </p>
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block text-[#c2410c]/30 text-2xl mt-4">→</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ============ GIFT CERTIFICATES ============ */}
      <section className="bg-linear-to-br from-[#fef3c7] to-[#fffbeb] py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-serif italic font-bold text-[#92400e] text-center mb-3">
            {t("Gift Certificates", "Подарункові сертифікати")}
          </h2>
          <p className="text-center text-[#92400e]/60 mb-12 max-w-xl mx-auto">
            {t(
              "Give the gift of creativity. Perfect for any occasion.",
              "Подаруйте творчість. Ідеально для будь-якого приводу."
            )}
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {GIFT_CARDS.map((gc, i) => (
              <div
                key={i}
                className={`bg-white border rounded-2xl p-6 text-center ${
                  i === 1
                    ? "border-[#c2410c] shadow-lg shadow-[#c2410c]/10 scale-105"
                    : "border-[#c2410c]/10"
                }`}
              >
                <div className="mb-3"><EmojiIcon emoji={gc.emoji} className="w-10 h-10" /></div>
                <p className="text-3xl font-bold text-[#c2410c] mb-4">₴{gc.amount}</p>
                <ul className="text-sm text-[#92400e]/70 space-y-2 mb-6 text-left">
                  {(isUk ? gc.includesUk : gc.includesEn).map((item, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <span className="text-[#65a30d] shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <button className="w-full px-4 py-2 border-2 border-[#c2410c] text-[#c2410c] rounded-full text-sm font-semibold hover:bg-[#c2410c] hover:text-white transition-colors">
                  {t("Buy Certificate", "Купити сертифікат")}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ GALLERY ============ */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl sm:text-4xl font-serif italic font-bold text-[#92400e] text-center mb-3">
          {t("Gallery", "Галерея")}
        </h2>
        <p className="text-center text-[#92400e]/60 mb-12">
          {t("A glimpse into our workshop world.", "Погляд у світ нашої майстерні.")}
        </p>

        <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
          {GALLERY_EMOJI.map((emoji, i) => {
            const heights = ["h-40", "h-56", "h-48", "h-64", "h-44", "h-52", "h-60", "h-36"];
            return (
              <div
                key={i}
                className={`${heights[i]} bg-linear-to-br from-[#fef3c7] to-[#fde68a] rounded-2xl flex items-center justify-center border border-[#c2410c]/10 break-inside-avoid`}
              >
                <EmojiIcon emoji={emoji} className="w-14 h-14" />
              </div>
            );
          })}
        </div>
      </section>

      {/* ============ NEWSLETTER ============ */}
      <section className="bg-[#92400e] py-16">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif italic font-bold text-[#fef3c7] mb-3">
            {t("Get Workshop Updates", "Отримуйте новини")}
          </h2>
          <p className="text-[#fef3c7]/70 mb-8">
            {t(
              "Be the first to know about new workshops, products, and special offers.",
              "Дізнавайтесь першими про нові майстер-класи, продукцію та спеціальні пропозиції."
            )}
          </p>

          {nlDone ? (
            <div className="bg-[#65a30d]/20 border border-[#65a30d]/40 rounded-full px-6 py-3 text-[#fef3c7] font-medium">
              ✓ {t("You're subscribed! Welcome aboard.", "Ви підписані! Ласкаво просимо.")}
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={nlEmail}
                onChange={(e) => setNlEmail(e.target.value)}
                placeholder={t("Your email address", "Ваша електронна пошта")}
                className="flex-1 px-5 py-3 rounded-full bg-white/10 border border-[#fef3c7]/20 text-[#fef3c7] placeholder:text-[#fef3c7]/40 focus:outline-none focus:ring-2 focus:ring-[#fef3c7]/30"
              />
              <button
                onClick={() => nlEmail && setNlDone(true)}
                className="px-8 py-3 bg-[#c2410c] text-white rounded-full font-semibold hover:bg-[#ea580c] transition-colors shrink-0"
              >
                {t("Subscribe", "Підписатися")}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer id="contact" className="bg-[#78350f] text-[#fef3c7] py-16">
        <div className="max-w-6xl mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <EmojiIcon emoji="🧶" className="w-7 h-7" />
              <span className="text-xl font-bold">HandMadeUA</span>
            </div>
            <p className="text-sm text-[#fef3c7]/60 leading-relaxed">
              {t(
                "A creative space where tradition meets modern craft. Made with love in Ukraine.",
                "Творчий простір, де традиції зустрічаються з сучасною майстерністю. Зроблено з любов'ю в Україні."
              )}
            </p>
          </div>

          {/* address */}
          <div>
            <h4 className="font-bold mb-3">{t("Visit Us", "Завітайте")}</h4>
            <div className="text-sm text-[#fef3c7]/60 space-y-2">
              <p>📍 {t("12 Yaroslaviv Val St.", "вул. Ярославів Вал, 12")}</p>
              <p>{t("Kyiv, Ukraine 01034", "Київ, Україна 01034")}</p>
              <p>📞 +380 44 123 4567</p>
              <p>✉️ hello@handmadeua.com</p>
            </div>
          </div>

          {/* hours */}
          <div>
            <h4 className="font-bold mb-3">{t("Workshop Hours", "Графік роботи")}</h4>
            <div className="text-sm text-[#fef3c7]/60 space-y-1">
              <p>{t("Mon – Fri: 10:00 – 20:00", "Пн – Пт: 10:00 – 20:00")}</p>
              <p>{t("Sat: 10:00 – 18:00", "Сб: 10:00 – 18:00")}</p>
              <p>{t("Sun: 11:00 – 17:00", "Нд: 11:00 – 17:00")}</p>
            </div>
          </div>

          {/* social */}
          <div>
            <h4 className="font-bold mb-3">{t("Follow Us", "Слідкуйте")}</h4>
            <div className="text-sm text-[#fef3c7]/60 space-y-2">
              <p>
                <a href="#" className="hover:text-[#fef3c7] transition-colors">
                  📸 Instagram
                </a>
              </p>
              <p>
                <a href="#" className="hover:text-[#fef3c7] transition-colors">
                  📘 Facebook
                </a>
              </p>
              <p>
                <a href="#" className="hover:text-[#fef3c7] transition-colors">
                  📌 Pinterest
                </a>
              </p>
              <p>
                <a href="#" className="hover:text-[#fef3c7] transition-colors">
                  🛒 Etsy Shop
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 mt-12 pt-8 border-t border-[#fef3c7]/10 text-center text-xs text-[#fef3c7]/40">
          <p>
            &copy; 2026 HandMadeUA. {t("All rights reserved.", "Усі права захищено.")}{" "}
            {t("Crafted with", "Створено з")} ❤️ {t("in Kyiv", "у Києві")}
          </p>
        </div>
      </footer>
    </div>
  );
}
