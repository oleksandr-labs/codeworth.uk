"use client";
import { useState } from "react";
import { EmojiIcon } from "@/components/ui/EmojiIcon";

// ─── Data ────────────────────────────────────────────────────────────────────

const categoryIcons = [
  { key: "lighting", en: "Lighting", uk: "Освітлення", emoji: "💡" },
  { key: "security", en: "Security", uk: "Безпека", emoji: "🔒" },
  { key: "climate", en: "Climate", uk: "Клімат", emoji: "🌡️" },
  { key: "audio", en: "Audio", uk: "Аудіо", emoji: "🔊" },
  { key: "outlets", en: "Smart Plugs", uk: "Розетки", emoji: "🔌" },
  { key: "sensors", en: "Sensors", uk: "Сенсори", emoji: "📡" },
];

const partners = ["Philips Hue", "AQARA", "TP-Link", "Yale", "Sonoff"];

const housingTypes = [
  { key: "studio", en: "Studio", uk: "Студія" },
  { key: "1bed", en: "1-Bedroom", uk: "1-кімнатна" },
  { key: "2bed", en: "2-Bedroom", uk: "2-кімнатна" },
  { key: "house", en: "Private House", uk: "Приватний будинок" },
];

const roomOptions = [
  { key: "living", en: "Living Room", uk: "Вітальня" },
  { key: "kitchen", en: "Kitchen", uk: "Кухня" },
  { key: "bedroom", en: "Bedroom", uk: "Спальня" },
  { key: "bathroom", en: "Bathroom", uk: "Ванна кімната" },
  { key: "hallway", en: "Hallway", uk: "Коридор" },
  { key: "garage", en: "Garage", uk: "Гараж" },
];

const priorityOptions = [
  { key: "security", en: "Security", uk: "Безпека" },
  { key: "comfort", en: "Comfort", uk: "Комфорт" },
  { key: "energy", en: "Energy Saving", uk: "Енергозбереження" },
  { key: "entertainment", en: "Entertainment", uk: "Розваги" },
];

type Product = {
  id: number;
  emoji: string;
  nameEn: string;
  nameUk: string;
  brand: string;
  protocol: "Wi-Fi" | "Zigbee" | "Matter";
  price: number;
  noHub?: boolean;
  ecosystems: string[];
  category: string;
};

const allProducts: Product[] = [
  // Lighting
  { id: 1, emoji: "💡", nameEn: "Philips Hue Starter Kit", nameUk: "Стартовий набір Philips Hue", brand: "Philips Hue", protocol: "Zigbee", price: 4200, noHub: false, ecosystems: ["Google Home", "Amazon Alexa", "Apple HomeKit", "Matter"], category: "lighting" },
  { id: 2, emoji: "🌈", nameEn: "AQARA LED Strip T1", nameUk: "Світлодіодна стрічка AQARA T1", brand: "AQARA", protocol: "Zigbee", price: 890, noHub: false, ecosystems: ["Google Home", "Apple HomeKit", "Matter"], category: "lighting" },
  { id: 3, emoji: "💡", nameEn: "Sonoff Smart Bulb E27", nameUk: "Розумна лампа Sonoff E27", brand: "Sonoff", protocol: "Wi-Fi", price: 320, noHub: true, ecosystems: ["Google Home", "Amazon Alexa"], category: "lighting" },
  { id: 4, emoji: "🔆", nameEn: "Yeelight Ceiling Light", nameUk: "Стельовий світильник Yeelight", brand: "Yeelight", protocol: "Wi-Fi", price: 1450, noHub: true, ecosystems: ["Google Home", "Amazon Alexa", "Apple HomeKit"], category: "lighting" },
  { id: 5, emoji: "💡", nameEn: "AQARA Bulb T1M E27", nameUk: "Лампа AQARA T1M E27", brand: "AQARA", protocol: "Matter", price: 680, noHub: true, ecosystems: ["Google Home", "Amazon Alexa", "Apple HomeKit", "Matter"], category: "lighting" },
  { id: 6, emoji: "🌟", nameEn: "Sonoff ZBMINI L2", nameUk: "Реле Sonoff ZBMINI L2", brand: "Sonoff", protocol: "Zigbee", price: 450, noHub: false, ecosystems: ["Google Home", "Amazon Alexa"], category: "lighting" },
  // Security
  { id: 7, emoji: "🚪", nameEn: "AQARA Door Sensor P2", nameUk: "Датчик дверей AQARA P2", brand: "AQARA", protocol: "Matter", price: 650, noHub: true, ecosystems: ["Google Home", "Amazon Alexa", "Apple HomeKit", "Matter"], category: "security" },
  { id: 8, emoji: "📷", nameEn: "TP-Link Kasa Camera EC70", nameUk: "Камера TP-Link Kasa EC70", brand: "TP-Link", protocol: "Wi-Fi", price: 2100, noHub: true, ecosystems: ["Google Home", "Amazon Alexa"], category: "security" },
  { id: 9, emoji: "🔐", nameEn: "Yale Smart Lock Assure SL", nameUk: "Розумний замок Yale Assure SL", brand: "Yale", protocol: "Matter", price: 8900, noHub: true, ecosystems: ["Google Home", "Amazon Alexa", "Apple HomeKit", "Matter"], category: "security" },
  { id: 10, emoji: "👁️", nameEn: "AQARA Motion Sensor P1", nameUk: "Датчик руху AQARA P1", brand: "AQARA", protocol: "Zigbee", price: 780, noHub: false, ecosystems: ["Google Home", "Apple HomeKit", "Matter"], category: "security" },
  { id: 11, emoji: "🚨", nameEn: "Sonoff SNZB-03P Motion", nameUk: "Датчик руху Sonoff SNZB-03P", brand: "Sonoff", protocol: "Zigbee", price: 420, noHub: false, ecosystems: ["Google Home", "Amazon Alexa"], category: "security" },
  { id: 12, emoji: "📹", nameEn: "TP-Link Tapo C500 Outdoor", nameUk: "Вулична камера TP-Link Tapo C500", brand: "TP-Link", protocol: "Wi-Fi", price: 1650, noHub: true, ecosystems: ["Google Home"], category: "security" },
  // Climate
  { id: 13, emoji: "🌡️", nameEn: "Tado Smart Thermostat V3+", nameUk: "Розумний термостат Tado V3+", brand: "Tado", protocol: "Wi-Fi", price: 4500, noHub: true, ecosystems: ["Google Home", "Amazon Alexa", "Apple HomeKit"], category: "climate" },
  { id: 14, emoji: "🌡️", nameEn: "AQARA Temperature Sensor TH-S02D", nameUk: "Датчик температури AQARA TH-S02D", brand: "AQARA", protocol: "Zigbee", price: 420, noHub: false, ecosystems: ["Google Home", "Apple HomeKit", "Matter"], category: "climate" },
  { id: 15, emoji: "💨", nameEn: "Dyson Purifier Hot+Cool Link", nameUk: "Очищувач повітря Dyson Hot+Cool Link", brand: "Dyson", protocol: "Wi-Fi", price: 12500, noHub: true, ecosystems: ["Google Home", "Amazon Alexa", "Apple HomeKit"], category: "climate" },
  { id: 16, emoji: "❄️", nameEn: "Sonoff SNZB-02D Temp & Humidity", nameUk: "Датчик вологості Sonoff SNZB-02D", brand: "Sonoff", protocol: "Zigbee", price: 360, noHub: false, ecosystems: ["Google Home", "Amazon Alexa"], category: "climate" },
  { id: 17, emoji: "🌬️", nameEn: "AQARA TVOC Air Quality Monitor", nameUk: "Монітор якості повітря AQARA TVOC", brand: "AQARA", protocol: "Zigbee", price: 980, noHub: false, ecosystems: ["Google Home", "Apple HomeKit"], category: "climate" },
  { id: 18, emoji: "🔥", nameEn: "Tado Smart Radiator Valve V3+", nameUk: "Термоголовка Tado V3+", brand: "Tado", protocol: "Wi-Fi", price: 2800, noHub: true, ecosystems: ["Google Home", "Amazon Alexa", "Apple HomeKit"], category: "climate" },
  // Audio
  { id: 19, emoji: "🔊", nameEn: "Sonos Era 100", nameUk: "Колонка Sonos Era 100", brand: "Sonos", protocol: "Wi-Fi", price: 9200, noHub: true, ecosystems: ["Google Home", "Amazon Alexa", "Apple HomeKit"], category: "audio" },
  { id: 20, emoji: "🎵", nameEn: "Google Nest Audio", nameUk: "Колонка Google Nest Audio", brand: "Google", protocol: "Wi-Fi", price: 3400, noHub: true, ecosystems: ["Google Home", "Matter"], category: "audio" },
  { id: 21, emoji: "🎙️", nameEn: "Amazon Echo (4th Gen)", nameUk: "Колонка Amazon Echo 4", brand: "Amazon", protocol: "Wi-Fi", price: 2900, noHub: true, ecosystems: ["Amazon Alexa", "Matter"], category: "audio" },
  { id: 22, emoji: "🔊", nameEn: "Sonos Roam SL", nameUk: "Портативна колонка Sonos Roam SL", brand: "Sonos", protocol: "Wi-Fi", price: 4800, noHub: true, ecosystems: ["Google Home", "Amazon Alexa", "Apple HomeKit"], category: "audio" },
  { id: 23, emoji: "🎶", nameEn: "Apple HomePod mini", nameUk: "Колонка Apple HomePod mini", brand: "Apple", protocol: "Wi-Fi", price: 5200, noHub: true, ecosystems: ["Apple HomeKit", "Matter"], category: "audio" },
  { id: 24, emoji: "🔈", nameEn: "Amazon Echo Dot (5th Gen)", nameUk: "Колонка Amazon Echo Dot 5", brand: "Amazon", protocol: "Wi-Fi", price: 1600, noHub: true, ecosystems: ["Amazon Alexa", "Matter"], category: "audio" },
  // Smart Plugs
  { id: 25, emoji: "🔌", nameEn: "Sonoff S26R2 Smart Plug", nameUk: "Розумна розетка Sonoff S26R2", brand: "Sonoff", protocol: "Wi-Fi", price: 280, noHub: true, ecosystems: ["Google Home", "Amazon Alexa"], category: "outlets" },
  { id: 26, emoji: "🔌", nameEn: "TP-Link Kasa EP25 Energy", nameUk: "Розетка TP-Link Kasa EP25", brand: "TP-Link", protocol: "Wi-Fi", price: 620, noHub: true, ecosystems: ["Google Home", "Amazon Alexa", "Matter"], category: "outlets" },
  { id: 27, emoji: "🔌", nameEn: "AQARA Smart Plug H2", nameUk: "Розумна розетка AQARA H2", brand: "AQARA", protocol: "Matter", price: 480, noHub: true, ecosystems: ["Google Home", "Amazon Alexa", "Apple HomeKit", "Matter"], category: "outlets" },
  { id: 28, emoji: "⚡", nameEn: "Sonoff ZBMINIL3 Zigbee", nameUk: "Реле Sonoff ZBMINIL3 Zigbee", brand: "Sonoff", protocol: "Zigbee", price: 390, noHub: false, ecosystems: ["Google Home", "Amazon Alexa"], category: "outlets" },
  { id: 29, emoji: "🔌", nameEn: "TP-Link Tapo P115 Mini", nameUk: "Міні-розетка TP-Link Tapo P115", brand: "TP-Link", protocol: "Wi-Fi", price: 450, noHub: true, ecosystems: ["Google Home", "Amazon Alexa", "Matter"], category: "outlets" },
  { id: 30, emoji: "⚡", nameEn: "AQARA Dual Relay Module T2", nameUk: "Подвійне реле AQARA T2", brand: "AQARA", protocol: "Zigbee", price: 720, noHub: false, ecosystems: ["Google Home", "Apple HomeKit", "Matter"], category: "outlets" },
];

type ConfigData = {
  housing: string;
  rooms: string[];
  priority: string;
  budget: number;
};

type RecommendedItem = {
  room: string;
  roomUk: string;
  products: { nameEn: string; nameUk: string; price: number }[];
};

function getRecommendations(config: ConfigData): RecommendedItem[] {
  const { rooms, priority, budget } = config;
  const recs: RecommendedItem[] = [];

  const roomMap: Record<string, { en: string; uk: string }> = {
    living: { en: "Living Room", uk: "Вітальня" },
    kitchen: { en: "Kitchen", uk: "Кухня" },
    bedroom: { en: "Bedroom", uk: "Спальня" },
    bathroom: { en: "Bathroom", uk: "Ванна кімната" },
    hallway: { en: "Hallway", uk: "Коридор" },
    garage: { en: "Garage", uk: "Гараж" },
  };

  const securityProducts = [
    { nameEn: "AQARA Door Sensor P2", nameUk: "Датчик дверей AQARA P2", price: 650 },
    { nameEn: "TP-Link Kasa Camera EC70", nameUk: "Камера TP-Link Kasa EC70", price: 2100 },
    { nameEn: "Yale Smart Lock Assure SL", nameUk: "Розумний замок Yale Assure SL", price: 8900 },
  ];
  const comfortProducts = [
    { nameEn: "Philips Hue Starter Kit", nameUk: "Стартовий набір Philips Hue", price: 4200 },
    { nameEn: "Tado Smart Thermostat V3+", nameUk: "Розумний термостат Tado V3+", price: 4500 },
    { nameEn: "Sonos Era 100", nameUk: "Колонка Sonos Era 100", price: 9200 },
  ];
  const energyProducts = [
    { nameEn: "Sonoff S26R2 Smart Plug", nameUk: "Розумна розетка Sonoff S26R2", price: 280 },
    { nameEn: "TP-Link Kasa EP25 Energy", nameUk: "Розетка TP-Link Kasa EP25", price: 620 },
    { nameEn: "AQARA Temperature Sensor TH-S02D", nameUk: "Датчик температури AQARA TH-S02D", price: 420 },
  ];
  const entertainmentProducts = [
    { nameEn: "Google Nest Audio", nameUk: "Колонка Google Nest Audio", price: 3400 },
    { nameEn: "Yeelight Ceiling Light", nameUk: "Стельовий світильник Yeelight", price: 1450 },
    { nameEn: "Amazon Echo (4th Gen)", nameUk: "Колонка Amazon Echo 4", price: 2900 },
  ];

  const priorityMap: Record<string, { nameEn: string; nameUk: string; price: number }[]> = {
    security: securityProducts,
    comfort: comfortProducts,
    energy: energyProducts,
    entertainment: entertainmentProducts,
  };

  const chosen = priorityMap[priority] || comfortProducts;
  let remaining = budget;

  for (const roomKey of rooms.slice(0, 4)) {
    const room = roomMap[roomKey];
    if (!room) continue;
    const affordable = chosen.filter((p) => p.price <= remaining * 0.4);
    if (affordable.length === 0) continue;
    const picked = affordable.slice(0, 2);
    picked.forEach((p) => { remaining -= p.price; });
    recs.push({ room: room.en, roomUk: room.uk, products: picked });
  }
  return recs;
}

const starterKits = [
  {
    nameEn: "Security Starter",
    nameUk: "Стартовий пакет безпеки",
    price: 8900,
    emoji: "🔒",
    descEn: "Perfect for first-time smart home owners",
    descUk: "Ідеально для першого розумного дому",
    items: [
      { en: "Yale Smart Lock Assure SL", uk: "Розумний замок Yale Assure SL" },
      { en: "AQARA Door Sensor P2 × 2", uk: "Датчик дверей AQARA P2 × 2" },
      { en: "TP-Link Kasa Camera EC70", uk: "Камера TP-Link Kasa EC70" },
      { en: "AQARA Motion Sensor P1", uk: "Датчик руху AQARA P1" },
    ],
  },
  {
    nameEn: "Comfort Bundle",
    nameUk: "Пакет комфорту",
    price: 15500,
    emoji: "🏠",
    descEn: "Smart lighting, climate & audio for everyday comfort",
    descUk: "Освітлення, клімат та аудіо для щоденного комфорту",
    items: [
      { en: "Philips Hue Starter Kit", uk: "Стартовий набір Philips Hue" },
      { en: "Tado Smart Thermostat V3+", uk: "Розумний термостат Tado V3+" },
      { en: "Google Nest Audio × 2", uk: "Колонка Google Nest Audio × 2" },
      { en: "Sonoff Smart Bulb E27 × 4", uk: "Розумна лампа Sonoff E27 × 4" },
      { en: "AQARA Temperature Sensor", uk: "Датчик температури AQARA" },
    ],
  },
  {
    nameEn: "Full Smart Home",
    nameUk: "Повний розумний дім",
    price: 45000,
    emoji: "⚡",
    descEn: "Complete automation for your entire home",
    descUk: "Повна автоматизація для всього будинку",
    items: [
      { en: "Everything in Comfort Bundle", uk: "Все з пакету Комфорту" },
      { en: "Yale Smart Lock Assure SL", uk: "Розумний замок Yale" },
      { en: "TP-Link Cameras × 2", uk: "Камери TP-Link × 2" },
      { en: "Dyson Purifier Hot+Cool Link", uk: "Очищувач Dyson Hot+Cool Link" },
      { en: "Sonos Era 100 × 2", uk: "Колонка Sonos Era 100 × 2" },
      { en: "Smart Plugs × 6", uk: "Розумні розетки × 6" },
      { en: "AQARA Hub M3", uk: "Хаб AQARA M3" },
    ],
  },
];

const reviews = [
  { name: "Олексій М.", rating: 5, textEn: "Installed the full kit in one day. Everything works flawlessly with Google Home.", textUk: "Встановили повний набір за один день. Все бездоганно працює з Google Home.", city: "Kyiv" },
  { name: "Ірина Д.", rating: 5, textEn: "The configurator helped me choose exactly what I needed for my apartment.", textUk: "Конфігуратор допоміг обрати саме те, що потрібно для моєї квартири.", city: "Lviv" },
  { name: "Тарас К.", rating: 4, textEn: "Great selection of Zigbee devices. Delivery was fast and packaging excellent.", textUk: "Чудовий вибір Zigbee пристроїв. Доставка швидка, пакування чудове.", city: "Odesa" },
  { name: "Марія Ш.", rating: 5, textEn: "The installation team was professional. My home is now fully automated.", textUk: "Команда монтажу — справжні професіонали. Мій дім повністю автоматизований.", city: "Kharkiv" },
];

const ecosystems = ["Google Home", "Amazon Alexa", "Apple HomeKit", "Matter", "No hub"];

const protocolColors: Record<string, string> = {
  "Wi-Fi": "bg-blue-500/20 text-blue-300 border border-blue-500/30",
  Zigbee: "bg-purple-500/20 text-purple-300 border border-purple-500/30",
  Matter: "bg-teal-500/20 text-teal-300 border border-teal-500/30",
};

// ─── Component ───────────────────────────────────────────────────────────────

export function SmartHomeDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [activeCategory, setActiveCategory] = useState<string>("lighting");
  const [configuratorStep, setConfiguratorStep] = useState<number>(1);
  const [configData, setConfigData] = useState<ConfigData>({
    housing: "",
    rooms: [],
    priority: "",
    budget: 30000,
  });
  const [cartItems, setCartItems] = useState<number[]>([]);
  const [activeEcosystem, setActiveEcosystem] = useState<string>("Google Home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showResult, setShowResult] = useState(false);

  const [filterProtocol, setFilterProtocol] = useState("All");
  const [filterBrand, setFilterBrand] = useState("All");
  const [filterEco, setFilterEco] = useState("All");
  const [filterMaxPrice, setFilterMaxPrice] = useState(15000);

  const categoryProducts = allProducts.filter((p) => p.category === activeCategory);

  const filteredProducts = categoryProducts.filter((p) => {
    if (filterProtocol !== "All" && p.protocol !== filterProtocol) return false;
    if (filterBrand !== "All" && p.brand !== filterBrand) return false;
    if (filterEco !== "All" && !p.ecosystems.includes(filterEco)) return false;
    if (p.price > filterMaxPrice) return false;
    return true;
  });

  const compatibleIds =
    activeEcosystem === "No hub"
      ? allProducts.filter((p) => p.noHub).map((p) => p.id)
      : allProducts.filter((p) => p.ecosystems.includes(activeEcosystem)).map((p) => p.id);

  const recommendations = showResult ? getRecommendations(configData) : [];
  const totalRec = recommendations.reduce((acc, r) => acc + r.products.reduce((a, p) => a + p.price, 0), 0);

  const brandsInCategory = Array.from(new Set(categoryProducts.map((p) => p.brand)));

  function toggleRoom(key: string) {
    setConfigData((prev) => ({
      ...prev,
      rooms: prev.rooms.includes(key)
        ? prev.rooms.filter((r) => r !== key)
        : [...prev.rooms, key],
    }));
  }

  function addAllToCart() {
    const ids = recommendations.flatMap((r) => {
      return allProducts
        .filter((p) => r.products.some((rp) => rp.nameEn === p.nameEn))
        .map((p) => p.id);
    });
    setCartItems((prev) => Array.from(new Set([...prev, ...ids])));
  }

  function addToCart(id: number) {
    setCartItems((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  }

  const stepComplete =
    (configuratorStep === 1 && configData.housing !== "") ||
    (configuratorStep === 2 && configData.rooms.length > 0) ||
    (configuratorStep === 3 && configData.priority !== "") ||
    configuratorStep === 4;

  return (
    <div className="bg-[#0F172A] text-white font-sans min-h-screen">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-linear-to-br from-[#0F172A] via-[#0F2040] to-[#0F172A] pt-20 pb-16 px-6">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#10B981]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981] text-sm font-medium mb-6">
            <span>⚡</span>
            <span>{isUk ? "IoT · Розумний дім · Автоматизація" : "IoT · Smart Home · Automation"}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 leading-tight">
            {isUk ? "Зберемо вашу" : "Build Your"}
            <span className="text-[#10B981]"> {isUk ? "Розумну Оселю" : "Smart Home"}</span>
          </h1>
          <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
            {isUk
              ? "Найкращі IoT пристрої, сумісні з Google Home, Alexa та HomeKit. Підбір, доставка, встановлення."
              : "The best IoT devices compatible with Google Home, Alexa and HomeKit. Selection, delivery, installation."}
          </p>

          {/* Category icons */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categoryIcons.map((c) => (
              <button
                key={c.key}
                onClick={() => { setActiveCategory(c.key); }}
                className={`flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl border transition-all ${
                  activeCategory === c.key
                    ? "bg-[#10B981]/15 border-[#10B981]/50 text-[#10B981]"
                    : "bg-slate-800/60 border-slate-700/50 text-slate-300 hover:border-[#10B981]/30"
                }`}
              >
                <EmojiIcon emoji={c.emoji} className="w-7 h-7" />
                <span className="text-xs font-medium">{isUk ? c.uk : c.en}</span>
              </button>
            ))}
          </div>

          {/* Partner logos */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <span className="text-slate-500 text-sm self-center mr-2">
              {isUk ? "Партнери:" : "Partners:"}
            </span>
            {partners.map((p) => (
              <span key={p} className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-sm font-medium">
                {p}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => { setConfiguratorStep(1); setShowResult(false); document.getElementById("configurator")?.scrollIntoView({ behavior: "smooth" }); }}
              className="px-7 py-3 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white font-semibold transition-colors shadow-lg shadow-[#10B981]/20"
            >
              {isUk ? "Налаштувати розумний дім" : "Configure Smart Home"}
            </button>
            <button
              onClick={() => { document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" }); }}
              className="px-7 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-semibold transition-colors"
            >
              {isUk ? "Переглянути каталог" : "Browse Catalog"}
            </button>
          </div>
        </div>
      </section>

      {/* ── Smart Home Configurator ──────────────────────────────────────── */}
      <section id="configurator" className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-2">
          {isUk ? "Конфігуратор розумного дому" : "Smart Home Configurator"}
        </h2>
        <p className="text-slate-400 text-center mb-8">
          {isUk ? "4 кроки — і ми підберемо пристрої саме для вас" : "4 steps and we'll recommend devices just for you"}
        </p>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <button
                onClick={() => { if (s < configuratorStep) { setConfiguratorStep(s); setShowResult(false); } }}
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                  configuratorStep === s
                    ? "bg-[#10B981] border-[#10B981] text-white"
                    : s < configuratorStep
                    ? "bg-[#10B981]/20 border-[#10B981]/50 text-[#10B981] cursor-pointer"
                    : "bg-slate-800 border-slate-700 text-slate-500"
                }`}
              >
                {s < configuratorStep ? "✓" : s}
              </button>
              {s < 4 && <div className={`w-12 h-0.5 ${s < configuratorStep ? "bg-[#10B981]/50" : "bg-slate-700"}`} />}
            </div>
          ))}
        </div>

        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 md:p-8">
          {/* Step 1 */}
          {configuratorStep === 1 && (
            <div>
              <h3 className="text-xl font-semibold mb-1">{isUk ? "Крок 1: Тип житла" : "Step 1: Housing Type"}</h3>
              <p className="text-slate-400 text-sm mb-6">{isUk ? "Оберіть тип вашого житла" : "Select your housing type"}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {housingTypes.map((h) => (
                  <button
                    key={h.key}
                    onClick={() => setConfigData((prev) => ({ ...prev, housing: h.key }))}
                    className={`p-4 rounded-xl border-2 text-center transition-all ${
                      configData.housing === h.key
                        ? "border-[#10B981] bg-[#10B981]/10 text-[#10B981]"
                        : "border-slate-600 bg-slate-800/40 text-slate-300 hover:border-slate-500"
                    }`}
                  >
                    <EmojiIcon emoji={h.key === "studio" ? "🏢" : h.key === "1bed" ? "🏠" : h.key === "2bed" ? "🏡" : "🏘️"} className="w-7 h-7 block mb-2" />
                    <span className="text-sm font-medium">{isUk ? h.uk : h.en}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2 */}
          {configuratorStep === 2 && (
            <div>
              <h3 className="text-xl font-semibold mb-1">{isUk ? "Крок 2: Кімнати для автоматизації" : "Step 2: Rooms to Automate"}</h3>
              <p className="text-slate-400 text-sm mb-6">{isUk ? "Оберіть кімнати (можна кілька)" : "Select rooms to automate (multiple allowed)"}</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {roomOptions.map((r) => (
                  <label key={r.key} className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    configData.rooms.includes(r.key)
                      ? "border-[#10B981] bg-[#10B981]/10"
                      : "border-slate-600 bg-slate-800/40 hover:border-slate-500"
                  }`}>
                    <input
                      type="checkbox"
                      checked={configData.rooms.includes(r.key)}
                      onChange={() => toggleRoom(r.key)}
                      className="w-4 h-4 accent-[#10B981]"
                    />
                    <span className="text-sm font-medium">{isUk ? r.uk : r.en}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Step 3 */}
          {configuratorStep === 3 && (
            <div>
              <h3 className="text-xl font-semibold mb-1">{isUk ? "Крок 3: Пріоритет" : "Step 3: Priority"}</h3>
              <p className="text-slate-400 text-sm mb-6">{isUk ? "Що для вас найважливіше?" : "What matters most to you?"}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {priorityOptions.map((p) => {
                  const icons: Record<string, string> = { security: "🔒", comfort: "🛋️", energy: "⚡", entertainment: "🎵" };
                  return (
                    <label key={p.key} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      configData.priority === p.key
                        ? "border-[#10B981] bg-[#10B981]/10"
                        : "border-slate-600 bg-slate-800/40 hover:border-slate-500"
                    }`}>
                      <input
                        type="radio"
                        name="priority"
                        value={p.key}
                        checked={configData.priority === p.key}
                        onChange={() => setConfigData((prev) => ({ ...prev, priority: p.key }))}
                        className="w-4 h-4 accent-[#10B981]"
                      />
                      <EmojiIcon emoji={icons[p.key]} className="w-5 h-5" />
                      <span className="font-medium">{isUk ? p.uk : p.en}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 4 */}
          {configuratorStep === 4 && !showResult && (
            <div>
              <h3 className="text-xl font-semibold mb-1">{isUk ? "Крок 4: Бюджет" : "Step 4: Budget"}</h3>
              <p className="text-slate-400 text-sm mb-6">{isUk ? "Вкажіть ваш бюджет" : "Set your budget"}</p>
              <div className="space-y-6">
                <div className="flex items-center justify-between text-sm text-slate-400 mb-1">
                  <span>₴5,000</span>
                  <span className="text-xl font-bold text-[#10B981]">₴{configData.budget.toLocaleString()}</span>
                  <span>₴150,000</span>
                </div>
                <input
                  type="range"
                  min={5000}
                  max={150000}
                  step={1000}
                  value={configData.budget}
                  onChange={(e) => setConfigData((prev) => ({ ...prev, budget: Number(e.target.value) }))}
                  className="w-full h-2 bg-slate-600 rounded-full appearance-none cursor-pointer accent-[#10B981]"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {[10000, 25000, 50000, 100000].map((v) => (
                    <button
                      key={v}
                      onClick={() => setConfigData((prev) => ({ ...prev, budget: v }))}
                      className={`px-3 py-1 rounded-full text-sm border transition-all ${
                        configData.budget === v
                          ? "bg-[#10B981]/20 border-[#10B981]/50 text-[#10B981]"
                          : "border-slate-600 text-slate-400 hover:border-slate-500"
                      }`}
                    >
                      ₴{v.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Result */}
          {showResult && (
            <div>
              <h3 className="text-xl font-semibold mb-4">{isUk ? "Рекомендовані пристрої" : "Recommended Devices"}</h3>
              {recommendations.length === 0 ? (
                <p className="text-slate-400">{isUk ? "Збільшіть бюджет або оберіть більше кімнат." : "Increase your budget or select more rooms."}</p>
              ) : (
                <div className="space-y-4">
                  {recommendations.map((rec, i) => (
                    <div key={i} className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                      <h4 className="font-semibold text-[#10B981] mb-2">{isUk ? rec.roomUk : rec.room}</h4>
                      <ul className="space-y-1.5">
                        {rec.products.map((prod, j) => (
                          <li key={j} className="flex items-center justify-between text-sm">
                            <span className="text-slate-300">{isUk ? prod.nameUk : prod.nameEn}</span>
                            <span className="text-white font-medium">₴{prod.price.toLocaleString()}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-700">
                    <span className="font-bold text-lg">{isUk ? "Разом:" : "Total:"} <span className="text-[#10B981]">₴{totalRec.toLocaleString()}</span></span>
                    <button
                      onClick={addAllToCart}
                      className="px-5 py-2 bg-[#10B981] hover:bg-[#059669] text-white rounded-xl font-semibold text-sm transition-colors"
                    >
                      {isUk ? "Додати все до кошика" : "Add all to cart"}
                    </button>
                  </div>
                  {cartItems.length > 0 && (
                    <p className="text-sm text-[#10B981] mt-1">
                      {isUk ? `У кошику: ${cartItems.length} товарів` : `Cart: ${cartItems.length} items`}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Navigation */}
          {!showResult && (
            <div className="flex justify-between mt-8">
              <button
                onClick={() => configuratorStep > 1 && setConfiguratorStep((s) => s - 1)}
                disabled={configuratorStep === 1}
                className="px-5 py-2 rounded-xl border border-slate-600 text-slate-300 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                {isUk ? "Назад" : "Back"}
              </button>
              <button
                disabled={!stepComplete}
                onClick={() => {
                  if (configuratorStep < 4) setConfiguratorStep((s) => s + 1);
                  else setShowResult(true);
                }}
                className="px-5 py-2 rounded-xl bg-[#10B981] hover:bg-[#059669] disabled:opacity-30 disabled:cursor-not-allowed text-white font-semibold transition-colors"
              >
                {configuratorStep < 4 ? (isUk ? "Далі" : "Next") : (isUk ? "Отримати рекомендації" : "Get Recommendations")}
              </button>
            </div>
          )}
          {showResult && (
            <button
              onClick={() => { setShowResult(false); setConfiguratorStep(1); setConfigData({ housing: "", rooms: [], priority: "", budget: 30000 }); }}
              className="mt-6 text-sm text-slate-400 hover:text-[#10B981] transition-colors"
            >
              {isUk ? "← Почати знову" : "← Start over"}
            </button>
          )}
        </div>
      </section>

      {/* ── Product Catalog ──────────────────────────────────────────────── */}
      <section id="catalog" className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-2">{isUk ? "Каталог товарів" : "Product Catalog"}</h2>
        <p className="text-slate-400 text-center mb-8">{isUk ? "Понад 100 сумісних пристроїв для розумного дому" : "100+ compatible smart home devices"}</p>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {[
            { key: "lighting", en: "💡 Lighting", uk: "💡 Освітлення" },
            { key: "security", en: "🔒 Security", uk: "🔒 Безпека" },
            { key: "climate", en: "🌡️ Climate", uk: "🌡️ Клімат" },
            { key: "audio", en: "🔊 Audio", uk: "🔊 Аудіо" },
            { key: "outlets", en: "🔌 Smart Plugs", uk: "🔌 Розетки" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveCategory(tab.key)}
              className={`px-5 py-2 rounded-full font-medium text-sm transition-all ${
                activeCategory === tab.key
                  ? "bg-[#10B981] text-white shadow-lg shadow-[#10B981]/20"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
              }`}
            >
              {isUk ? tab.uk : tab.en}
            </button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filter sidebar */}
          <aside className="shrink-0 w-full md:w-56 bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 space-y-5 h-fit">
            <h3 className="font-semibold text-sm text-slate-300 uppercase tracking-wide">{isUk ? "Фільтри" : "Filters"}</h3>

            {/* Protocol */}
            <div>
              <p className="text-xs text-slate-400 mb-2">{isUk ? "Протокол" : "Protocol"}</p>
              {["All", "Wi-Fi", "Zigbee", "Matter"].map((proto) => (
                <label key={proto} className="flex items-center gap-2 mb-1 cursor-pointer">
                  <input type="radio" name="protocol" value={proto} checked={filterProtocol === proto} onChange={() => setFilterProtocol(proto)} className="accent-[#10B981]" />
                  <span className="text-sm text-slate-300">{proto === "All" ? (isUk ? "Всі" : "All") : proto}</span>
                </label>
              ))}
            </div>

            {/* Brand */}
            <div>
              <p className="text-xs text-slate-400 mb-2">{isUk ? "Бренд" : "Brand"}</p>
              <select
                value={filterBrand}
                onChange={(e) => setFilterBrand(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-2 py-1.5 text-sm text-slate-200"
              >
                <option value="All">{isUk ? "Всі" : "All"}</option>
                {brandsInCategory.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>

            {/* Price range */}
            <div>
              <p className="text-xs text-slate-400 mb-1">{isUk ? "Макс. ціна" : "Max Price"}</p>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>₴0</span>
                <span className="text-[#10B981] font-semibold">₴{filterMaxPrice.toLocaleString()}</span>
              </div>
              <input
                type="range" min={500} max={15000} step={500}
                value={filterMaxPrice}
                onChange={(e) => setFilterMaxPrice(Number(e.target.value))}
                className="w-full accent-[#10B981]"
              />
            </div>

            {/* Ecosystem */}
            <div>
              <p className="text-xs text-slate-400 mb-2">{isUk ? "Екосистема" : "Ecosystem"}</p>
              {["All", "Google Home", "Amazon Alexa", "Apple HomeKit", "Matter"].map((eco) => (
                <label key={eco} className="flex items-center gap-2 mb-1 cursor-pointer">
                  <input type="radio" name="filterEco" value={eco} checked={filterEco === eco} onChange={() => setFilterEco(eco)} className="accent-[#10B981]" />
                  <span className="text-xs text-slate-300">{eco === "All" ? (isUk ? "Всі" : "All") : eco}</span>
                </label>
              ))}
            </div>
          </aside>

          {/* Product grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center text-slate-400 py-16">{isUk ? "Нічого не знайдено. Спробуйте інші фільтри." : "No products found. Try different filters."}</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map((prod) => {
                  const inCart = cartItems.includes(prod.id);
                  const isCompatible = compatibleIds.includes(prod.id);
                  return (
                    <div
                      key={prod.id}
                      onClick={() => setSelectedProduct(selectedProduct?.id === prod.id ? null : prod)}
                      className={`bg-slate-800/60 border rounded-2xl p-4 cursor-pointer transition-all hover:shadow-lg ${
                        selectedProduct?.id === prod.id
                          ? "border-[#10B981] shadow-[#10B981]/20"
                          : isCompatible
                          ? "border-[#10B981]/30 hover:border-[#10B981]/60"
                          : "border-slate-700 hover:border-slate-600 opacity-70"
                      }`}
                    >
                      <div className="mb-2"><EmojiIcon emoji={prod.emoji} className="w-8 h-8" /></div>
                      <h4 className="font-semibold text-sm mb-0.5 leading-tight">
                        {isUk ? prod.nameUk : prod.nameEn}
                      </h4>
                      <p className="text-xs text-slate-400 mb-2">{prod.brand}</p>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${protocolColors[prod.protocol]}`}>
                          {prod.protocol}
                        </span>
                        {prod.noHub && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/25 font-medium">
                            {isUk ? "Без хабу" : "No hub"}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#10B981]">₴{prod.price.toLocaleString()}</span>
                        <button
                          onClick={(e) => { e.stopPropagation(); addToCart(prod.id); }}
                          className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                            inCart
                              ? "bg-[#10B981] text-white"
                              : "bg-slate-700 hover:bg-slate-600 text-slate-200"
                          }`}
                        >
                          {inCart ? (isUk ? "✓ Додано" : "✓ Added") : (isUk ? "+ Кошик" : "+ Cart")}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {cartItems.length > 0 && (
              <div className="mt-6 flex items-center justify-between bg-[#10B981]/10 border border-[#10B981]/30 rounded-xl px-5 py-3">
                <span className="text-[#10B981] font-medium text-sm">
                  {isUk ? `🛒 У кошику: ${cartItems.length} товарів` : `🛒 Cart: ${cartItems.length} items`}
                </span>
                <button
                  onClick={() => setCartItems([])}
                  className="text-xs text-slate-400 hover:text-red-400 transition-colors"
                >
                  {isUk ? "Очистити" : "Clear"}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Starter Kits ─────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-2">{isUk ? "Стартові набори" : "Starter Kits"}</h2>
        <p className="text-slate-400 text-center mb-10">{isUk ? "Готові рішення — просто підключи і користуйся" : "Ready-made solutions — plug in and enjoy"}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {starterKits.map((kit, i) => (
            <div
              key={i}
              className={`relative rounded-2xl border p-6 flex flex-col ${
                i === 2
                  ? "bg-linear-to-br from-[#10B981]/10 to-slate-800/80 border-[#10B981]/40"
                  : "bg-slate-800/50 border-slate-700/50"
              }`}
            >
              {i === 2 && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-[#10B981] text-white text-xs font-bold rounded-full">
                  {isUk ? "Популярний" : "Popular"}
                </span>
              )}
              <div className="mb-3"><EmojiIcon emoji={kit.emoji} className="w-8 h-8" /></div>
              <h3 className="font-bold text-lg mb-1">{isUk ? kit.nameUk : kit.nameEn}</h3>
              <p className="text-slate-400 text-sm mb-4">{isUk ? kit.descUk : kit.descEn}</p>
              <ul className="space-y-1.5 mb-5 flex-1">
                {kit.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-[#10B981] shrink-0 mt-0.5">✓</span>
                    {isUk ? item.uk : item.en}
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-[#10B981]">₴{kit.price.toLocaleString()}</span>
                <button className="px-4 py-2 bg-[#10B981] hover:bg-[#059669] text-white text-sm font-semibold rounded-xl transition-colors">
                  {isUk ? "Замовити" : "Order"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Compatibility Checker ────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-2">{isUk ? "Перевірка сумісності" : "Compatibility Checker"}</h2>
        <p className="text-slate-400 text-center mb-8">{isUk ? "Оберіть вашу екосистему — побачите сумісні пристрої" : "Select your ecosystem to see compatible devices"}</p>

        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {ecosystems.map((eco) => (
            <button
              key={eco}
              onClick={() => setActiveEcosystem(eco)}
              className={`px-5 py-2.5 rounded-xl border font-medium text-sm transition-all ${
                activeEcosystem === eco
                  ? "bg-[#10B981] border-[#10B981] text-white shadow-lg shadow-[#10B981]/20"
                  : "bg-slate-800 border-slate-600 text-slate-300 hover:border-[#10B981]/40"
              }`}
            >
              {eco === "No hub" ? (isUk ? "Без хабу" : "No hub") : eco}
            </button>
          ))}
        </div>

        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5">
          <p className="text-sm text-slate-400 mb-4">
            {isUk
              ? `Сумісно з ${activeEcosystem === "No hub" ? "«Без хабу»" : activeEcosystem}: ${compatibleIds.length} пристроїв`
              : `Compatible with ${activeEcosystem}: ${compatibleIds.length} devices`}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {allProducts.slice(0, 12).map((prod) => {
              const compat = compatibleIds.includes(prod.id);
              return (
                <div
                  key={prod.id}
                  className={`rounded-xl p-3 border text-center transition-all ${
                    compat
                      ? "bg-[#10B981]/10 border-[#10B981]/40 text-white"
                      : "bg-slate-800/40 border-slate-700/30 text-slate-500 opacity-50"
                  }`}
                >
                  <div className="mb-1"><EmojiIcon emoji={prod.emoji} className="w-5 h-5" /></div>
                  <p className="text-xs font-medium leading-tight">{isUk ? prod.nameUk : prod.nameEn}</p>
                  {compat && <span className="text-[#10B981] text-xs">✓</span>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Reviews & Trust ──────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-2">{isUk ? "Відгуки клієнтів" : "Customer Reviews"}</h2>
        <p className="text-slate-400 text-center mb-10">{isUk ? "Понад 2,400 задоволених клієнтів по всій Україні" : "Over 2,400 happy customers across Ukraine"}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
          {reviews.map((r, i) => (
            <div key={i} className="bg-slate-800/50 border border-slate-700/40 rounded-2xl p-5">
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, j) => (
                  <span key={j} className={j < r.rating ? "text-amber-400" : "text-slate-600"}>★</span>
                ))}
              </div>
              <p className="text-slate-300 text-sm mb-3 italic">&ldquo;{isUk ? r.textUk : r.textEn}&rdquo;</p>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="font-semibold text-slate-200">{r.name}</span>
                <span>·</span>
                <span>{r.city}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-slate-800/50 border border-slate-700/40 rounded-2xl p-5 text-center">
            <div className="mb-3"><EmojiIcon emoji="🔧" className="w-10 h-10" /></div>
            <h3 className="font-bold mb-1">{isUk ? "Послуга монтажу" : "Installation Service"}</h3>
            <p className="text-slate-400 text-sm">{isUk ? "Сертифіковані фахівці встановлять всі пристрої вдома. від ₴1,500." : "Certified specialists install all devices at your home. From ₴1,500."}</p>
          </div>
          <div className="bg-[#10B981]/10 border border-[#10B981]/30 rounded-2xl p-5 text-center">
            <div className="mb-3"><EmojiIcon emoji="🛡️" className="w-10 h-10" /></div>
            <h3 className="font-bold mb-1">{isUk ? "Гарантія 3 роки" : "3-Year Warranty"}</h3>
            <p className="text-slate-400 text-sm">{isUk ? "На весь асортимент. Безкоштовний сервіс та заміна." : "On all products. Free service and replacement."}</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/40 rounded-2xl p-5 text-center">
            <div className="mb-3"><EmojiIcon emoji="🚚" className="w-10 h-10" /></div>
            <h3 className="font-bold mb-1">{isUk ? "Доставка по Україні" : "Delivery Across Ukraine"}</h3>
            <p className="text-slate-400 text-sm">{isUk ? "Нова Пошта / Укрпошта. Від ₴3,500 — безкоштовно." : "Nova Post / Ukrposhta. Free for orders over ₴3,500."}</p>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="bg-slate-900/80 border-t border-slate-800 px-6 py-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <EmojiIcon emoji="🏠" className="w-7 h-7" />
              <span className="font-bold text-lg tracking-tight">SmartHome<span className="text-[#10B981]">UA</span></span>
            </div>
            <p className="text-slate-400 text-sm max-w-xs">
              {isUk ? "Ваш партнер у побудові розумного дому в Україні." : "Your smart home partner in Ukraine."}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 text-sm">
            <div>
              <h4 className="font-semibold mb-2 text-slate-200">{isUk ? "Каталог" : "Catalog"}</h4>
              <ul className="space-y-1 text-slate-400">
                <li>{isUk ? "Освітлення" : "Lighting"}</li>
                <li>{isUk ? "Безпека" : "Security"}</li>
                <li>{isUk ? "Клімат" : "Climate"}</li>
                <li>{isUk ? "Аудіо" : "Audio"}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-slate-200">{isUk ? "Підтримка" : "Support"}</h4>
              <ul className="space-y-1 text-slate-400">
                <li>{isUk ? "Інструкції" : "Guides"}</li>
                <li>{isUk ? "Сумісність" : "Compatibility"}</li>
                <li>{isUk ? "Монтаж" : "Installation"}</li>
                <li>{isUk ? "Контакти" : "Contact"}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-5xl mx-auto mt-8 pt-4 border-t border-slate-800 text-center text-slate-500 text-xs">
          © 2026 SmartHomeUA — {isUk ? "Демо-компонент Codeworth" : "Codeworth Demo Component"}
        </div>
      </footer>
    </div>
  );
}
