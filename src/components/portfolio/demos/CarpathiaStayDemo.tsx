"use client";

import { useState } from "react";

/* ──────────────────────── types ──────────────────────── */

interface Room {
  id: string;
  icon: string;
  nameEn: string;
  nameUk: string;
  capacity: number;
  price: number;
  features: string[];
  featuresUk: string[];
}

interface Activity {
  icon: string;
  nameEn: string;
  nameUk: string;
  descEn: string;
  descUk: string;
  season: "summer" | "winter" | "year-round";
}

interface SpaService {
  icon: string;
  nameEn: string;
  nameUk: string;
  descEn: string;
  descUk: string;
  price: number;
}

interface Dish {
  icon: string;
  nameEn: string;
  nameUk: string;
  descEn: string;
  descUk: string;
}

interface Testimonial {
  nameEn: string;
  nameUk: string;
  textEn: string;
  textUk: string;
  stars: number;
  seasonEn: string;
  seasonUk: string;
}

/* ──────────────────────── data ──────────────────────── */

const rooms: Room[] = [
  {
    id: "standard",
    icon: "🛏️",
    nameEn: "Standard Room",
    nameUk: "Стандартний номер",
    capacity: 2,
    price: 1200,
    features: [
      "Queen-size bed",
      "Mountain view window",
      "Private bathroom",
      "Free Wi-Fi",
    ],
    featuresUk: [
      "Двоспальне ліжко",
      "Вікно з видом на гори",
      "Власна ванна кімната",
      "Безкоштовний Wi-Fi",
    ],
  },
  {
    id: "deluxe",
    icon: "🏔️",
    nameEn: "Deluxe Mountain View",
    nameUk: "Делюкс з видом на гори",
    capacity: 2,
    price: 2200,
    features: [
      "King-size bed",
      "Panoramic balcony",
      "Mini-bar",
      "Fireplace",
      "Luxury bathroom",
    ],
    featuresUk: [
      "Ліжко King-size",
      "Панорамний балкон",
      "Міні-бар",
      "Камін",
      "Розкішна ванна кімната",
    ],
  },
  {
    id: "family",
    icon: "👨‍👩‍👧‍👦",
    nameEn: "Family Suite",
    nameUk: "Сімейний люкс",
    capacity: 4,
    price: 3200,
    features: [
      "Two bedrooms",
      "Living area",
      "Kitchenette",
      "Kids play corner",
      "Two bathrooms",
    ],
    featuresUk: [
      "Дві спальні",
      "Вітальня",
      "Кухонний куточок",
      "Дитячий ігровий куточок",
      "Дві ванні кімнати",
    ],
  },
  {
    id: "chalet",
    icon: "🏡",
    nameEn: "Premium Chalet",
    nameUk: "Преміум шале",
    capacity: 6,
    price: 5500,
    features: [
      "Private chalet",
      "Hot tub",
      "Full kitchen",
      "Sauna",
      "Garden terrace",
      "Fireplace lounge",
    ],
    featuresUk: [
      "Окреме шале",
      "Гаряча ванна",
      "Повноцінна кухня",
      "Сауна",
      "Тераса з садом",
      "Лаунж з каміном",
    ],
  },
];

const activities: Activity[] = [
  {
    icon: "🥾",
    nameEn: "Hiking",
    nameUk: "Піші походи",
    descEn: "Explore scenic trails through ancient beech forests and alpine meadows with experienced guides.",
    descUk: "Досліджуйте мальовничі стежки крізь старовинні букові ліси та альпійські луки з досвідченими провідниками.",
    season: "summer",
  },
  {
    icon: "⛷️",
    nameEn: "Skiing",
    nameUk: "Катання на лижах",
    descEn: "Hit the slopes at nearby ski resorts with equipment rental and shuttle service included.",
    descUk: "Катайтесь на схилах найближчих курортів з прокатом обладнання та трансфером.",
    season: "winter",
  },
  {
    icon: "🐴",
    nameEn: "Horseback Riding",
    nameUk: "Верхова їзда",
    descEn: "Ride Hutsul horses through mountain valleys and along crystal-clear streams.",
    descUk: "Їздіть на гуцульських конях через гірські долини та вздовж кришталево чистих потоків.",
    season: "year-round",
  },
  {
    icon: "🎣",
    nameEn: "Fishing",
    nameUk: "Рибалка",
    descEn: "Try your luck catching trout in pristine mountain rivers and secluded forest lakes.",
    descUk: "Спробуйте зловити форель у чистих гірських річках та затишних лісових озерах.",
    season: "summer",
  },
  {
    icon: "🍄",
    nameEn: "Mushroom Picking",
    nameUk: "Збір грибів",
    descEn: "Join guided foraging trips through lush forests — learn to identify local mushroom varieties.",
    descUk: "Приєднуйтесь до походів за грибами — навчіться розрізняти місцеві сорти грибів.",
    season: "summer",
  },
  {
    icon: "🚵",
    nameEn: "Mountain Biking",
    nameUk: "Гірський велосипед",
    descEn: "Tackle challenging trails and scenic routes with professional mountain bikes available for rent.",
    descUk: "Долайте складні маршрути та мальовничі траси на професійних гірських велосипедах.",
    season: "year-round",
  },
];

const spaServices: SpaService[] = [
  {
    icon: "🧖",
    nameEn: "Carpathian Sauna",
    nameUk: "Карпатська сауна",
    descEn: "Traditional wood-fired sauna with aromatic pine and juniper essential oils.",
    descUk: "Традиційна дров'яна сауна з ароматичними ефірними оліями сосни та ялівцю.",
    price: 450,
  },
  {
    icon: "♨️",
    nameEn: "Mountain Hot Tub",
    nameUk: "Гірська гаряча ванна",
    descEn: "Open-air wooden hot tub with panoramic mountain views — perfect after a day of hiking.",
    descUk: "Відкрита дерев'яна купіль з панорамним видом на гори — ідеально після дня походів.",
    price: 600,
  },
  {
    icon: "💆",
    nameEn: "Relaxation Massage",
    nameUk: "Релаксаційний масаж",
    descEn: "Full-body massage using locally sourced herbal oils and traditional Carpathian techniques.",
    descUk: "Масаж усього тіла з використанням місцевих трав'яних олій та карпатських технік.",
    price: 800,
  },
  {
    icon: "🌿",
    nameEn: "Herbal Bath",
    nameUk: "Трав'яна ванна",
    descEn: "Soothing bath infused with wild Carpathian herbs — chamomile, mint, and thyme.",
    descUk: "Заспокійлива ванна з дикими карпатськими травами — ромашкою, м'ятою та чебрецем.",
    price: 550,
  },
];

const dishes: Dish[] = [
  {
    icon: "🥘",
    nameEn: "Banosh with Brynza",
    nameUk: "Банош з бринзою",
    descEn: "Traditional Hutsul cornmeal porridge served with sheep cheese and sour cream.",
    descUk: "Традиційна гуцульська кукурудзяна каша з овечою бринзою та сметаною.",
  },
  {
    icon: "🍲",
    nameEn: "Mushroom Yushka",
    nameUk: "Грибна юшка",
    descEn: "Rich forest mushroom soup with root vegetables and fresh herbs.",
    descUk: "Наваристий суп із лісових грибів з кореневими овочами та свіжими травами.",
  },
  {
    icon: "🥩",
    nameEn: "Grilled Trout",
    nameUk: "Форель на грилі",
    descEn: "Freshly caught mountain trout grilled over open fire with lemon and herbs.",
    descUk: "Свіжоспіймана гірська форель на відкритому вогні з лимоном та травами.",
  },
  {
    icon: "🫕",
    nameEn: "Hutsul Deruny",
    nameUk: "Гуцульські деруни",
    descEn: "Crispy potato pancakes stuffed with wild mushrooms and served with garlic sauce.",
    descUk: "Хрусткі картопляні деруни з дикими грибами та часниковим соусом.",
  },
  {
    icon: "🧀",
    nameEn: "Carpathian Cheese Board",
    nameUk: "Карпатська сирна дошка",
    descEn: "Assortment of local mountain cheeses with honey, nuts, and fresh bread.",
    descUk: "Асорті місцевих гірських сирів з медом, горіхами та свіжим хлібом.",
  },
  {
    icon: "🫐",
    nameEn: "Berry Varenyky",
    nameUk: "Вареники з ягодами",
    descEn: "Handmade dumplings filled with wild blueberries, served with sweet sour cream.",
    descUk: "Вареники ручної роботи з дикою чорницею, подані з солодкою сметаною.",
  },
];

const testimonials: Testimonial[] = [
  {
    nameEn: "Olena & Dmytro",
    nameUk: "Олена та Дмитро",
    textEn:
      "An unforgettable winter escape! The chalet was incredibly cozy, and waking up to snow-covered mountains was magical. The spa was the perfect way to unwind after skiing.",
    textUk:
      "Незабутній зимовий відпочинок! Шале було неймовірно затишним, а прокидатися з видом на засніжені гори — чарівно. Спа — ідеальний спосіб розслабитись після катання на лижах.",
    stars: 5,
    seasonEn: "Winter 2025",
    seasonUk: "Зима 2025",
  },
  {
    nameEn: "The Kovalenko Family",
    nameUk: "Родина Коваленків",
    textEn:
      "Perfect family getaway! The kids loved the horseback riding and mushroom picking. The family suite had everything we needed. We will definitely be coming back next summer.",
    textUk:
      "Ідеальний сімейний відпочинок! Діти були в захваті від верхової їзди та збору грибів. Сімейний люкс мав все необхідне. Обов'язково повернемось наступного літа.",
    stars: 5,
    seasonEn: "Summer 2025",
    seasonUk: "Літо 2025",
  },
  {
    nameEn: "Marcus & Sophia",
    nameUk: "Маркус та Софія",
    textEn:
      "We traveled from Germany specifically for this hotel, and it exceeded all expectations. The restaurant serves the best traditional Carpathian food we have ever tasted. Truly a hidden gem.",
    textUk:
      "Ми приїхали з Німеччини спеціально до цього готелю, і він перевершив усі очікування. Ресторан подає найкращу карпатську кухню, яку ми коли-небудь куштували. Справжня перлина.",
    stars: 4,
    seasonEn: "Autumn 2025",
    seasonUk: "Осінь 2025",
  },
];

const galleryItems = [
  { icon: "🏔️", labelEn: "Mountain Panorama", labelUk: "Панорама гір" },
  { icon: "🌲", labelEn: "Forest Trails", labelUk: "Лісові стежки" },
  { icon: "🏡", labelEn: "Premium Chalet", labelUk: "Преміум шале" },
  { icon: "♨️", labelEn: "Outdoor Hot Tub", labelUk: "Купіль на природі" },
  { icon: "🍽️", labelEn: "Restaurant", labelUk: "Ресторан" },
  { icon: "🌅", labelEn: "Sunrise View", labelUk: "Світанок у горах" },
  { icon: "❄️", labelEn: "Winter Magic", labelUk: "Зимова казка" },
  { icon: "🦌", labelEn: "Wildlife", labelUk: "Дика природа" },
];

/* ──────────────────────── helpers ──────────────────────── */

function seasonBadge(season: string, isUk: boolean) {
  const map: Record<string, { labelEn: string; labelUk: string; color: string }> = {
    summer: { labelEn: "Summer", labelUk: "Літо", color: "bg-green-700 text-green-100" },
    winter: { labelEn: "Winter", labelUk: "Зима", color: "bg-blue-700 text-blue-100" },
    "year-round": {
      labelEn: "Year-round",
      labelUk: "Цілий рік",
      color: "bg-amber-700 text-amber-100",
    },
  };
  const s = map[season];
  if (!s) return null;
  return (
    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${s.color}`}>
      {isUk ? s.labelUk : s.labelEn}
    </span>
  );
}

function stars(count: number) {
  return "★".repeat(count) + "☆".repeat(5 - count);
}

/* ──────────────────────── component ──────────────────────── */

export function CarpathiaStayDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  /* booking widget state */
  const [selectedRoom, setSelectedRoom] = useState("standard");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [nights, setNights] = useState(1);
  const [booked, setBooked] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);

  const currentRoom = rooms.find((r) => r.id === selectedRoom) ?? rooms[0];
  const totalPrice = currentRoom.price * nights;

  const t = {
    navRooms: isUk ? "Номери" : "Rooms",
    navActivities: isUk ? "Активності" : "Activities",
    navSpa: isUk ? "Спа" : "Spa",
    navRestaurant: isUk ? "Ресторан" : "Restaurant",
    navGallery: isUk ? "Галерея" : "Gallery",
    navBook: isUk ? "Забронювати" : "Book Now",
    heroTitle: isUk
      ? "Відпочинок у Серці Карпат"
      : "Retreat in the Heart of the Carpathians",
    heroSub: isUk
      ? "Зануртесь у тишу первозданної природи, де карпатські ліси зустрічають безкрайнє небо. Ваш притулок спокою та гармонії чекає."
      : "Immerse yourself in the silence of pristine nature, where Carpathian forests meet the endless sky. Your sanctuary of peace and harmony awaits.",
    checkIn: isUk ? "Заїзд" : "Check-in",
    checkOut: isUk ? "Виїзд" : "Check-out",
    guests: isUk ? "Гості" : "Guests",
    checkAvail: isUk ? "Перевірити наявність" : "Check Availability",
    roomsTitle: isUk ? "Наші номери" : "Our Rooms",
    roomsSub: isUk
      ? "Від затишних стандартних номерів до розкішних приватних шале"
      : "From cozy standard rooms to luxurious private chalets",
    perNight: isUk ? "/ ніч" : "/ night",
    bookBtn: isUk ? "Забронювати" : "Book",
    capacityLabel: isUk ? "місць" : "guests",
    features: isUk ? "Зручності" : "Features",
    bookingTitle: isUk ? "Бронювання" : "Booking",
    selectRoom: isUk ? "Оберіть номер" : "Select Room",
    nightsLabel: isUk ? "Ночей" : "Nights",
    total: isUk ? "Всього" : "Total",
    confirmBook: isUk ? "Підтвердити бронювання" : "Confirm Booking",
    bookingConfirmed: isUk ? "Бронювання підтверджено!" : "Booking Confirmed!",
    bookingThank: isUk
      ? "Дякуємо! Ми надішлемо підтвердження на вашу електронну пошту."
      : "Thank you! We will send a confirmation to your email.",
    newBooking: isUk ? "Нове бронювання" : "New Booking",
    activitiesTitle: isUk ? "Активності та розваги" : "Activities & Adventures",
    activitiesSub: isUk
      ? "Відкрийте магію Карпат у кожну пору року"
      : "Discover the magic of the Carpathians in every season",
    spaTitle: isUk ? "Спа та відновлення" : "Spa & Wellness",
    spaSub: isUk
      ? "Відновіть тіло та душу з нашими автентичними карпатськими спа-процедурами"
      : "Restore your body and soul with our authentic Carpathian spa treatments",
    from: isUk ? "від" : "from",
    restaurantTitle: isUk ? "Ресторан" : "Restaurant",
    restaurantSub: isUk
      ? "Від ферми до столу — автентична карпатська кухня"
      : "Farm-to-table — authentic Carpathian cuisine",
    restaurantDesc: isUk
      ? "Наш шеф-кухар використовує лише місцеві фермерські продукти, свіжі гірські трави та традиційні гуцульські рецепти, передані з покоління в покоління."
      : "Our chef uses only local farm produce, fresh mountain herbs, and traditional Hutsul recipes passed down through generations.",
    seeMenu: isUk ? "Переглянути повне меню" : "See Full Menu",
    galleryTitle: isUk ? "Галерея" : "Gallery",
    gallerySub: isUk
      ? "Загляньте у світ CarpathiaStay"
      : "A glimpse into the CarpathiaStay world",
    testimonialsTitle: isUk ? "Відгуки гостей" : "Guest Reviews",
    testimonialsSub: isUk
      ? "Що кажуть наші гості про свій відпочинок"
      : "What our guests say about their stay",
    locationTitle: isUk ? "Як дістатися" : "How to Get Here",
    locationSub: isUk
      ? "CarpathiaStay розташований у серці Українських Карпат"
      : "CarpathiaStay is located in the heart of the Ukrainian Carpathians",
    fromKyiv: isUk ? "Зі Києва" : "From Kyiv",
    fromLviv: isUk ? "Зі Львова" : "From Lviv",
    fromIF: isUk ? "З Івано-Франківська" : "From Ivano-Frankivsk",
    kyivDesc: isUk
      ? "~600 км, 7-8 год на авто або нічний потяг до Яремче"
      : "~600 km, 7-8 hrs by car or overnight train to Yaremche",
    lvivDesc: isUk
      ? "~270 км, 3-4 год на авто або автобус"
      : "~270 km, 3-4 hrs by car or bus",
    ifDesc: isUk
      ? "~90 км, 1.5 год на авто, трансфер від готелю"
      : "~90 km, 1.5 hrs by car, hotel shuttle available",
    gps: isUk ? "GPS координати" : "GPS Coordinates",
    footerContact: isUk ? "Контакти" : "Contact",
    footerAddress: isUk
      ? "с. Поляниця, Яремчанська громада, Івано-Франківська обл., Україна"
      : "Polianytsia village, Yaremche community, Ivano-Frankivsk region, Ukraine",
    footerGroup: isUk
      ? "Частина Ukrainian Hospitality Group"
      : "Part of Ukrainian Hospitality Group",
    footerRights: isUk ? "Усі права захищені" : "All rights reserved",
    signatureDishes: isUk ? "Фірмові страви" : "Signature Dishes",
  };

  /* ──────── render ──────── */

  return (
    <div className="min-h-screen bg-[#fefce8] text-stone-800" style={{ fontFamily: "system-ui, sans-serif" }}>
      {/* ═══════ HEADER ═══════ */}
      <header className="sticky top-0 z-30 border-b border-green-900/20 bg-[#14532d] text-green-50 shadow-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2 text-xl font-bold tracking-wide" style={{ fontFamily: "Georgia, serif" }}>
            <span className="text-2xl">🏔️</span> CarpathiaStay
          </div>

          {/* desktop nav */}
          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            {[t.navRooms, t.navActivities, t.navSpa, t.navRestaurant, t.navGallery].map((item) => (
              <span key={item} className="cursor-pointer transition-colors hover:text-amber-300">
                {item}
              </span>
            ))}
            <button className="rounded-lg bg-[#92400e] px-4 py-2 font-semibold text-amber-50 shadow transition-colors hover:bg-[#a16207]">
              {t.navBook}
            </button>
          </nav>

          {/* mobile burger */}
          <button className="text-2xl md:hidden" onClick={() => setMobileNav(!mobileNav)}>
            {mobileNav ? "✕" : "☰"}
          </button>
        </div>

        {/* mobile dropdown */}
        {mobileNav && (
          <div className="flex flex-col gap-3 border-t border-green-800 bg-[#14532d] px-6 py-4 md:hidden">
            {[t.navRooms, t.navActivities, t.navSpa, t.navRestaurant, t.navGallery].map((item) => (
              <span key={item} className="cursor-pointer text-sm hover:text-amber-300">
                {item}
              </span>
            ))}
            <button className="mt-1 rounded-lg bg-[#92400e] px-4 py-2 text-sm font-semibold text-amber-50">
              {t.navBook}
            </button>
          </div>
        )}
      </header>

      {/* ═══════ HERO ═══════ */}
      <section className="relative overflow-hidden bg-linear-to-br from-[#14532d] via-[#166534] to-[#14532d] px-4 py-24 text-center text-green-50 md:py-36">
        {/* decorative emojis */}
        <div className="pointer-events-none absolute inset-0 select-none overflow-hidden opacity-10 text-[8rem] leading-none">
          <span className="absolute left-[5%] top-[10%]">🏔️</span>
          <span className="absolute right-[8%] top-[5%]">🌲</span>
          <span className="absolute left-[15%] bottom-[10%]">⛰️</span>
          <span className="absolute right-[12%] bottom-[15%]">🏔️</span>
          <span className="absolute left-[50%] top-[2%]">🌿</span>
        </div>

        <div className="relative mx-auto max-w-3xl">
          <h1
            className="mb-6 text-4xl font-bold leading-tight tracking-tight md:text-6xl"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {t.heroTitle}
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-green-100/90 md:text-xl">
            {t.heroSub}
          </p>

          {/* search bar */}
          <div className="mx-auto flex max-w-2xl flex-col items-stretch gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur-sm sm:flex-row sm:items-end">
            <label className="flex flex-1 flex-col text-left text-xs font-semibold text-green-200">
              {t.checkIn}
              <input
                type="date"
                className="mt-1 rounded-lg bg-white/20 px-3 py-2 text-sm text-white placeholder-green-300 outline-none focus:ring-2 focus:ring-amber-400"
              />
            </label>
            <label className="flex flex-1 flex-col text-left text-xs font-semibold text-green-200">
              {t.checkOut}
              <input
                type="date"
                className="mt-1 rounded-lg bg-white/20 px-3 py-2 text-sm text-white placeholder-green-300 outline-none focus:ring-2 focus:ring-amber-400"
              />
            </label>
            <label className="flex w-24 shrink-0 flex-col text-left text-xs font-semibold text-green-200">
              {t.guests}
              <input
                type="number"
                min={1}
                max={10}
                defaultValue={2}
                className="mt-1 rounded-lg bg-white/20 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-amber-400"
              />
            </label>
            <button className="shrink-0 rounded-lg bg-[#92400e] px-5 py-2.5 text-sm font-bold text-amber-50 shadow-lg transition-colors hover:bg-[#a16207]">
              {t.checkAvail}
            </button>
          </div>
        </div>
      </section>

      {/* ═══════ ROOMS ═══════ */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-[#14532d] md:text-4xl" style={{ fontFamily: "Georgia, serif" }}>
            {t.roomsTitle}
          </h2>
          <p className="text-stone-600">{t.roomsSub}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-green-900/10 bg-white shadow-md transition-shadow hover:shadow-xl"
            >
              {/* image placeholder */}
              <div className="flex h-44 items-center justify-center bg-linear-to-br from-[#166534] to-[#14532d] text-6xl">
                {room.icon}
              </div>

              <div className="flex flex-1 flex-col p-5">
                {/* capacity badge */}
                <span className="mb-2 inline-block w-fit rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800">
                  👤 {room.capacity} {t.capacityLabel}
                </span>

                <h3 className="mb-1 text-lg font-bold text-[#14532d]" style={{ fontFamily: "Georgia, serif" }}>
                  {isUk ? room.nameUk : room.nameEn}
                </h3>

                <p className="mb-3 text-xs font-semibold text-stone-500">{t.features}:</p>
                <ul className="mb-4 flex-1 space-y-1 text-sm text-stone-600">
                  {(isUk ? room.featuresUk : room.features).map((f, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="mt-0.5 text-green-700">✓</span> {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex items-end justify-between">
                  <div>
                    <span className="text-2xl font-bold text-[#92400e]">₴{room.price}</span>
                    <span className="text-sm text-stone-500"> {t.perNight}</span>
                  </div>
                  <button className="rounded-lg bg-[#14532d] px-4 py-2 text-sm font-semibold text-green-50 transition-colors hover:bg-[#166534]">
                    {t.bookBtn}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════ BOOKING WIDGET ═══════ */}
      <section className="bg-[#14532d] px-4 py-20">
        <div className="mx-auto max-w-2xl">
          <h2
            className="mb-8 text-center text-3xl font-bold text-green-50 md:text-4xl"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {t.bookingTitle}
          </h2>

          {booked ? (
            <div className="rounded-2xl bg-white/10 p-10 text-center backdrop-blur-sm">
              <div className="mb-4 text-5xl">✅</div>
              <h3 className="mb-2 text-2xl font-bold text-amber-300" style={{ fontFamily: "Georgia, serif" }}>
                {t.bookingConfirmed}
              </h3>
              <p className="mb-2 text-green-100">{t.bookingThank}</p>
              <p className="mb-6 text-sm text-green-200">
                {isUk ? currentRoom.nameUk : currentRoom.nameEn} — {nights}{" "}
                {isUk ? (nights === 1 ? "ніч" : "ночей") : (nights === 1 ? "night" : "nights")} — ₴{totalPrice}
              </p>
              <button
                onClick={() => {
                  setBooked(false);
                  setNights(1);
                }}
                className="rounded-lg bg-[#92400e] px-6 py-2.5 font-semibold text-amber-50 transition-colors hover:bg-[#a16207]"
              >
                {t.newBooking}
              </button>
            </div>
          ) : (
            <div className="space-y-6 rounded-2xl bg-white/10 p-8 backdrop-blur-sm">
              {/* room select */}
              <label className="block text-sm font-semibold text-green-200">
                {t.selectRoom}
                <select
                  value={selectedRoom}
                  onChange={(e) => setSelectedRoom(e.target.value)}
                  className="mt-1 block w-full rounded-lg bg-white/20 px-3 py-2.5 text-white outline-none focus:ring-2 focus:ring-amber-400"
                >
                  {rooms.map((r) => (
                    <option key={r.id} value={r.id} className="text-stone-800">
                      {isUk ? r.nameUk : r.nameEn} — ₴{r.price} {t.perNight}
                    </option>
                  ))}
                </select>
              </label>

              {/* dates row */}
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-semibold text-green-200">
                  {t.checkIn}
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="mt-1 block w-full rounded-lg bg-white/20 px-3 py-2.5 text-white outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </label>
                <label className="block text-sm font-semibold text-green-200">
                  {t.checkOut}
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="mt-1 block w-full rounded-lg bg-white/20 px-3 py-2.5 text-white outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </label>
              </div>

              {/* guests + nights */}
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-semibold text-green-200">
                  {t.guests}
                  <input
                    type="number"
                    min={1}
                    max={currentRoom.capacity}
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="mt-1 block w-full rounded-lg bg-white/20 px-3 py-2.5 text-white outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </label>
                <label className="block text-sm font-semibold text-green-200">
                  {t.nightsLabel}
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={nights}
                    onChange={(e) => setNights(Math.max(1, Number(e.target.value)))}
                    className="mt-1 block w-full rounded-lg bg-white/20 px-3 py-2.5 text-white outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </label>
              </div>

              {/* total */}
              <div className="flex items-center justify-between rounded-xl bg-white/5 p-4">
                <span className="text-lg font-semibold text-green-100">{t.total}</span>
                <span className="text-3xl font-bold text-amber-300">₴{totalPrice.toLocaleString()}</span>
              </div>

              <button
                onClick={() => setBooked(true)}
                className="w-full rounded-xl bg-[#92400e] py-3.5 text-lg font-bold text-amber-50 shadow-lg transition-colors hover:bg-[#a16207]"
              >
                {t.confirmBook}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ═══════ ACTIVITIES ═══════ */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-[#14532d] md:text-4xl" style={{ fontFamily: "Georgia, serif" }}>
            {t.activitiesTitle}
          </h2>
          <p className="text-stone-600">{t.activitiesSub}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activities.map((act, i) => (
            <div
              key={i}
              className="group rounded-2xl border border-green-900/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="text-4xl">{act.icon}</span>
                <div>
                  <h3 className="text-lg font-bold text-[#14532d]" style={{ fontFamily: "Georgia, serif" }}>
                    {isUk ? act.nameUk : act.nameEn}
                  </h3>
                  {seasonBadge(act.season, isUk)}
                </div>
              </div>
              <p className="text-sm leading-relaxed text-stone-600">
                {isUk ? act.descUk : act.descEn}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════ SPA ═══════ */}
      <section className="bg-linear-to-br from-[#92400e] via-[#a16207] to-[#92400e] px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold text-amber-50 md:text-4xl" style={{ fontFamily: "Georgia, serif" }}>
              {t.spaTitle}
            </h2>
            <p className="text-amber-100/80">{t.spaSub}</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {spaServices.map((spa, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white/15 p-6 backdrop-blur-sm transition-colors hover:bg-white/25"
              >
                <div className="mb-3 text-4xl">{spa.icon}</div>
                <h3 className="mb-2 text-lg font-bold text-amber-50" style={{ fontFamily: "Georgia, serif" }}>
                  {isUk ? spa.nameUk : spa.nameEn}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-amber-100/80">
                  {isUk ? spa.descUk : spa.descEn}
                </p>
                <p className="text-sm font-semibold text-amber-200">
                  {t.from} <span className="text-lg font-bold">₴{spa.price}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ RESTAURANT ═══════ */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-[#14532d] md:text-4xl" style={{ fontFamily: "Georgia, serif" }}>
            {t.restaurantTitle}
          </h2>
          <p className="text-stone-600">{t.restaurantSub}</p>
        </div>

        <div className="mb-10 mx-auto max-w-2xl rounded-2xl border border-amber-200 bg-amber-50 p-6 text-center">
          <span className="mb-2 inline-block text-3xl">🌾</span>
          <p className="text-sm leading-relaxed text-stone-700">{t.restaurantDesc}</p>
        </div>

        <h3
          className="mb-6 text-center text-xl font-bold text-[#92400e]"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {t.signatureDishes}
        </h3>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {dishes.map((dish, i) => (
            <div
              key={i}
              className="flex items-start gap-4 rounded-xl border border-green-900/10 bg-white p-5 shadow-sm"
            >
              <span className="shrink-0 text-3xl">{dish.icon}</span>
              <div>
                <h4 className="font-bold text-[#14532d]">{isUk ? dish.nameUk : dish.nameEn}</h4>
                <p className="mt-1 text-sm leading-relaxed text-stone-600">
                  {isUk ? dish.descUk : dish.descEn}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button className="rounded-xl border-2 border-[#14532d] px-8 py-3 font-semibold text-[#14532d] transition-colors hover:bg-[#14532d] hover:text-green-50">
            {t.seeMenu}
          </button>
        </div>
      </section>

      {/* ═══════ GALLERY ═══════ */}
      <section className="bg-[#166534] px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold text-green-50 md:text-4xl" style={{ fontFamily: "Georgia, serif" }}>
              {t.galleryTitle}
            </h2>
            <p className="text-green-100/70">{t.gallerySub}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {galleryItems.map((item, i) => {
              const tall = i === 0 || i === 5;
              return (
                <div
                  key={i}
                  className={`group flex flex-col items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm transition-colors hover:bg-white/20 ${
                    tall ? "row-span-2 min-h-[16rem]" : "min-h-[10rem]"
                  }`}
                >
                  <span className="mb-2 text-5xl transition-transform group-hover:scale-110">
                    {item.icon}
                  </span>
                  <span className="text-sm font-medium text-green-100">
                    {isUk ? item.labelUk : item.labelEn}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════ TESTIMONIALS ═══════ */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-[#14532d] md:text-4xl" style={{ fontFamily: "Georgia, serif" }}>
            {t.testimonialsTitle}
          </h2>
          <p className="text-stone-600">{t.testimonialsSub}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((rev, i) => (
            <div
              key={i}
              className="rounded-2xl border border-green-900/10 bg-white p-6 shadow-sm"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-lg text-amber-500">{stars(rev.stars)}</span>
                <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800">
                  {isUk ? rev.seasonUk : rev.seasonEn}
                </span>
              </div>
              <p className="mb-4 text-sm italic leading-relaxed text-stone-600">
                &ldquo;{isUk ? rev.textUk : rev.textEn}&rdquo;
              </p>
              <p className="text-sm font-bold text-[#14532d]">— {isUk ? rev.nameUk : rev.nameEn}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════ LOCATION ═══════ */}
      <section className="bg-linear-to-br from-[#14532d] to-[#166534] px-4 py-20 text-green-50">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold md:text-4xl" style={{ fontFamily: "Georgia, serif" }}>
              {t.locationTitle}
            </h2>
            <p className="text-green-100/70">{t.locationSub}</p>
          </div>

          {/* map placeholder */}
          <div className="mx-auto mb-10 flex h-52 max-w-xl items-center justify-center rounded-2xl bg-white/10 text-6xl backdrop-blur-sm">
            🗺️
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { icon: "🚗", title: t.fromKyiv, desc: t.kyivDesc },
              { icon: "🚌", title: t.fromLviv, desc: t.lvivDesc },
              { icon: "🚐", title: t.fromIF, desc: t.ifDesc },
            ].map((route, i) => (
              <div key={i} className="rounded-xl bg-white/10 p-5 text-center backdrop-blur-sm">
                <div className="mb-2 text-3xl">{route.icon}</div>
                <h4 className="mb-1 font-bold text-amber-300">{route.title}</h4>
                <p className="text-sm text-green-100/80">{route.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-green-200">
              📍 {t.gps}: <span className="font-mono font-bold text-amber-300">48.4507° N, 24.5081° E</span>
            </p>
          </div>
        </div>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="border-t border-green-900/10 bg-[#14532d] px-4 py-12 text-green-100">
        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* brand */}
          <div>
            <div className="mb-3 text-xl font-bold text-green-50" style={{ fontFamily: "Georgia, serif" }}>
              🏔️ CarpathiaStay
            </div>
            <p className="text-sm leading-relaxed text-green-200/70">{t.footerGroup}</p>
          </div>

          {/* contact */}
          <div>
            <h4 className="mb-3 font-bold text-green-50">{t.footerContact}</h4>
            <ul className="space-y-2 text-sm text-green-200/70">
              <li>📞 +380 34 234 5678</li>
              <li>✉️ info@carpathiastay.ua</li>
              <li>🌐 carpathiastay.ua</li>
            </ul>
          </div>

          {/* address */}
          <div>
            <h4 className="mb-3 font-bold text-green-50">📍 {isUk ? "Адреса" : "Address"}</h4>
            <p className="text-sm leading-relaxed text-green-200/70">{t.footerAddress}</p>
          </div>

          {/* socials */}
          <div>
            <h4 className="mb-3 font-bold text-green-50">{isUk ? "Соціальні мережі" : "Social Media"}</h4>
            <div className="flex gap-3 text-2xl">
              <span className="cursor-pointer transition-opacity hover:opacity-70" title="Instagram">📸</span>
              <span className="cursor-pointer transition-opacity hover:opacity-70" title="Facebook">👥</span>
              <span className="cursor-pointer transition-opacity hover:opacity-70" title="YouTube">🎬</span>
              <span className="cursor-pointer transition-opacity hover:opacity-70" title="TikTok">🎵</span>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-7xl border-t border-green-800 pt-6 text-center text-xs text-green-300/50">
          © 2026 CarpathiaStay. {t.footerRights}.
        </div>
      </footer>
    </div>
  );
}
