"use client";

import { useState } from "react";

const G = "#16A34A";
const BG = "#F8FAFC";

const CATEGORIES = [
  { key: "heart", emoji: "❤️", en: "Heart", uk: "Серце" },
  { key: "pain", emoji: "💊", en: "Painkillers", uk: "Знеболюючі" },
  { key: "vitamins", emoji: "🌟", en: "Vitamins", uk: "Вітаміни" },
  { key: "kids", emoji: "👶", en: "Children", uk: "Дитячі" },
  { key: "pregnancy", emoji: "🤰", en: "Pregnancy", uk: "Вагітність" },
  { key: "immunity", emoji: "🦠", en: "Immunity", uk: "Імунітет" },
];

type Drug = {
  nameEn: string; nameUk: string;
  genericEn: string; genericUk: string;
  formEn: string; formUk: string;
  price: number; rx: boolean; color: string;
  alts: { nameEn: string; nameUk: string; price: number }[];
};

const DRUGS: Record<string, Drug[]> = {
  heart: [
    { nameEn: "Cardilorin", nameUk: "Кардіолорин", genericEn: "Amlodipine 5mg", genericUk: "Амлодипін 5мг", formEn: "Tablets", formUk: "Таблетки", price: 189, rx: true, color: "#FEE2E2", alts: [{ nameEn: "Norvasc", nameUk: "Норваск", price: 145 }, { nameEn: "Amlovas", nameUk: "Амловас", price: 112 }, { nameEn: "Generic Amlo", nameUk: "Амлодипін generic", price: 78 }] },
    { nameEn: "Betakor", nameUk: "Бетакор", genericEn: "Metoprolol 50mg", genericUk: "Метопролол 50мг", formEn: "Tablets", formUk: "Таблетки", price: 245, rx: true, color: "#FCE7F3", alts: [{ nameEn: "Egilok", nameUk: "Егілок", price: 198 }, { nameEn: "Metoprolol-KV", nameUk: "Метопролол-КВ", price: 156 }, { nameEn: "Corvitol", nameUk: "Корвітол", price: 134 }] },
    { nameEn: "VascuPro", nameUk: "ВаскуПро", genericEn: "Ramipril 10mg", genericUk: "Раміприл 10мг", formEn: "Capsules", formUk: "Капсули", price: 312, rx: true, color: "#E0F2FE", alts: [{ nameEn: "Hartil", nameUk: "Хартіл", price: 265 }, { nameEn: "Tritace", nameUk: "Тритаце", price: 232 }, { nameEn: "Ramipril UA", nameUk: "Раміприл UA", price: 187 }] },
    { nameEn: "OmegaHeart", nameUk: "ОмегаСерце", genericEn: "Omega-3 1000mg", genericUk: "Омега-3 1000мг", formEn: "Capsules", formUk: "Капсули", price: 398, rx: false, color: "#ECFDF5", alts: [{ nameEn: "NaturOmega", nameUk: "НатурОмега", price: 312 }, { nameEn: "Vitomega", nameUk: "Вітомега", price: 278 }, { nameEn: "Fish Oil Plus", nameUk: "Риб'ячий жир+", price: 189 }] },
    { nameEn: "CardioMag", nameUk: "КардіоМаг", genericEn: "Magnesium B6", genericUk: "Магній B6", formEn: "Tablets", formUk: "Таблетки", price: 156, rx: false, color: "#FEF9C3", alts: [{ nameEn: "MagneB6", nameUk: "МагнеВ6", price: 128 }, { nameEn: "Panangin", nameUk: "Панангін", price: 98 }, { nameEn: "Magvit", nameUk: "Магвіт", price: 76 }] },
  ],
  pain: [
    { nameEn: "Analgin Ultra", nameUk: "Аналгін Ультра", genericEn: "Metamizole 500mg", genericUk: "Метамізол 500мг", formEn: "Tablets", formUk: "Таблетки", price: 68, rx: false, color: "#FEF3C7", alts: [{ nameEn: "Baralgin", nameUk: "Баралгін", price: 54 }, { nameEn: "Tempalgin", nameUk: "Темпалгін", price: 42 }, { nameEn: "Metamizole UA", nameUk: "Метамізол UA", price: 31 }] },
    { nameEn: "Ibuklin", nameUk: "Ібуклін", genericEn: "Ibuprofen 400mg", genericUk: "Ібупрофен 400мг", formEn: "Tablets", formUk: "Таблетки", price: 124, rx: false, color: "#E0F2FE", alts: [{ nameEn: "Nurofen", nameUk: "Нурофен", price: 98 }, { nameEn: "Ibuprofen-OZ", nameUk: "Ібупрофен-OZ", price: 67 }, { nameEn: "Dolgit", nameUk: "Долгіт", price: 52 }] },
    { nameEn: "DicloPatch", nameUk: "ДіклоПатч", genericEn: "Diclofenac gel 1%", genericUk: "Диклофенак гель 1%", formEn: "Ointment", formUk: "Мазь", price: 178, rx: false, color: "#F0FDF4", alts: [{ nameEn: "Voltaren", nameUk: "Вольтарен", price: 145 }, { nameEn: "Diklak", nameUk: "Діклак", price: 112 }, { nameEn: "Diclofenac gel", nameUk: "Диклофенак гель", price: 78 }] },
    { nameEn: "Ketomax", nameUk: "Кетомакс", genericEn: "Ketoprofen 100mg", genericUk: "Кетопрофен 100мг", formEn: "Capsules", formUk: "Капсули", price: 234, rx: false, color: "#FEE2E2", alts: [{ nameEn: "Ketanov", nameUk: "Кетанов", price: 198 }, { nameEn: "Profenid", nameUk: "Профенід", price: 167 }, { nameEn: "Ketoprofen UA", nameUk: "Кетопрофен UA", price: 134 }] },
    { nameEn: "Paracetamol Pro", nameUk: "Парацетамол Про", genericEn: "Paracetamol 500mg", genericUk: "Парацетамол 500мг", formEn: "Tablets", formUk: "Таблетки", price: 45, rx: false, color: "#FFF7ED", alts: [{ nameEn: "Panadol", nameUk: "Панадол", price: 38 }, { nameEn: "Efferalgan", nameUk: "Еффералган", price: 32 }, { nameEn: "Para UA", nameUk: "Пара UA", price: 22 }] },
  ],
  vitamins: [
    { nameEn: "VitaMax D3", nameUk: "ВітаМакс D3", genericEn: "Vitamin D3 2000 IU", genericUk: "Вітамін D3 2000 МО", formEn: "Capsules", formUk: "Капсули", price: 312, rx: false, color: "#FEF9C3", alts: [{ nameEn: "AquaDetrim", nameUk: "Аквадетрим", price: 256 }, { nameEn: "Vigantol", nameUk: "Вігантол", price: 198 }, { nameEn: "D3 UA", nameUk: "D3 UA", price: 145 }] },
    { nameEn: "ComplexB", nameUk: "КомплексB", genericEn: "B-Complex", genericUk: "Комплекс вітамінів B", formEn: "Tablets", formUk: "Таблетки", price: 245, rx: false, color: "#FDE68A", alts: [{ nameEn: "Neurobion", nameUk: "Нейробіон", price: 198 }, { nameEn: "Milgamma", nameUk: "Мільгама", price: 167 }, { nameEn: "B-Komplex UA", nameUk: "В-Комплекс UA", price: 123 }] },
    { nameEn: "ZincFort", nameUk: "ЦинкФорт", genericEn: "Zinc 15mg", genericUk: "Цинк 15мг", formEn: "Tablets", formUk: "Таблетки", price: 156, rx: false, color: "#D1FAE5", alts: [{ nameEn: "Zincite", nameUk: "Зінцит", price: 123 }, { nameEn: "Zincteral", nameUk: "Цинктерал", price: 98 }, { nameEn: "Zinc UA", nameUk: "Цинк UA", price: 67 }] },
    { nameEn: "OmegaPure", nameUk: "ОмегаПюр", genericEn: "Omega-3 500mg", genericUk: "Омега-3 500мг", formEn: "Capsules", formUk: "Капсули", price: 289, rx: false, color: "#E0F2FE", alts: [{ nameEn: "Lovaza", nameUk: "Ловаза", price: 234 }, { nameEn: "OmegaMed", nameUk: "ОмегаМед", price: 189 }, { nameEn: "Omega UA", nameUk: "Омега UA", price: 145 }] },
    { nameEn: "IronPlus", nameUk: "ЗалізоПлюс", genericEn: "Ferrous sulfate 325mg", genericUk: "Сульфат заліза 325мг", formEn: "Tablets", formUk: "Таблетки", price: 198, rx: false, color: "#FEE2E2", alts: [{ nameEn: "Sorbifer", nameUk: "Сорбіфер", price: 165 }, { nameEn: "Ferretab", nameUk: "Феретаб", price: 132 }, { nameEn: "Tardyferon", nameUk: "Тардіферон", price: 98 }] },
  ],
  kids: [
    { nameEn: "NuroSyrup", nameUk: "НуроСироп", genericEn: "Ibuprofen syrup 100mg/5ml", genericUk: "Ібупрофен сироп 100мг/5мл", formEn: "Syrup", formUk: "Сироп", price: 145, rx: false, color: "#FDE68A", alts: [{ nameEn: "Nurofen Kids", nameUk: "Нурофен Дитячий", price: 118 }, { nameEn: "Ibufen", nameUk: "Ібуфен", price: 89 }, { nameEn: "Ibuprofen Kids", nameUk: "Ібупрофен Дит.", price: 65 }] },
    { nameEn: "ParaKids", nameUk: "ПараДіти", genericEn: "Paracetamol 250mg supp", genericUk: "Парацетамол 250мг супозиторії", formEn: "Suppositories", formUk: "Свічки", price: 98, rx: false, color: "#E0F2FE", alts: [{ nameEn: "Cefekol", nameUk: "Цефекол", price: 78 }, { nameEn: "Panadol Kids", nameUk: "Панадол Дит.", price: 65 }, { nameEn: "Para supp.", nameUk: "Пара свічки", price: 45 }] },
    { nameEn: "LactoKid", nameUk: "ЛактоДит", genericEn: "Probiotic complex", genericUk: "Пробіотичний комплекс", formEn: "Sachets", formUk: "Саше", price: 312, rx: false, color: "#F0FDF4", alts: [{ nameEn: "Bifiform", nameUk: "Біфіформ", price: 256 }, { nameEn: "Lacidofil", nameUk: "Лацидофіл", price: 198 }, { nameEn: "LB Complex", nameUk: "ЛБ Комплекс", price: 145 }] },
    { nameEn: "VitaKids D3", nameUk: "ВітаДіти D3", genericEn: "Vitamin D3 drops 400 IU", genericUk: "Вітамін D3 краплі 400 МО", formEn: "Drops", formUk: "Краплі", price: 198, rx: false, color: "#FEF9C3", alts: [{ nameEn: "AquaDetrim", nameUk: "Аквадетрим", price: 167 }, { nameEn: "D3 Drops", nameUk: "D3 Краплі", price: 134 }, { nameEn: "Vigantol Kids", nameUk: "Вігантол Дит.", price: 98 }] },
    { nameEn: "AntihisKids", nameUk: "АнтигісДіти", genericEn: "Cetirizine 5mg/5ml", genericUk: "Цетиризин 5мг/5мл", formEn: "Syrup", formUk: "Сироп", price: 156, rx: false, color: "#FCE7F3", alts: [{ nameEn: "Zyrtec Kids", nameUk: "Зіртек Дит.", price: 128 }, { nameEn: "Cetrin syrup", nameUk: "Цетрин сироп", price: 98 }, { nameEn: "Cetirizine kids", nameUk: "Цетиризин дит.", price: 72 }] },
  ],
  pregnancy: [
    { nameEn: "FolicPro", nameUk: "ФолікПро", genericEn: "Folic acid 400mcg", genericUk: "Фолієва кислота 400мкг", formEn: "Tablets", formUk: "Таблетки", price: 89, rx: false, color: "#FDE68A", alts: [{ nameEn: "Folacin", nameUk: "Фолацин", price: 72 }, { nameEn: "Folio", nameUk: "Фоліо", price: 58 }, { nameEn: "Folic UA", nameUk: "Фолієва UA", price: 34 }] },
    { nameEn: "MaternaPlus", nameUk: "МатернаПлюс", genericEn: "Prenatal multivitamins", genericUk: "Пренатальні мультивітаміни", formEn: "Tablets", formUk: "Таблетки", price: 456, rx: false, color: "#FCE7F3", alts: [{ nameEn: "Elevit", nameUk: "Елевіт", price: 389 }, { nameEn: "Pregnavit", nameUk: "Прегнавіт", price: 312 }, { nameEn: "Femibion", nameUk: "Фемібіон", price: 267 }] },
    { nameEn: "IronMama", nameUk: "ЗалізоМама", genericEn: "Iron + folic complex", genericUk: "Залізо + фолієвий комплекс", formEn: "Capsules", formUk: "Капсули", price: 278, rx: false, color: "#FEE2E2", alts: [{ nameEn: "Sorbifer Durules", nameUk: "Сорбіфер Дурулес", price: 234 }, { nameEn: "Ferretab comp", nameUk: "Феретаб комп.", price: 189 }, { nameEn: "Gyno-tardiferon", nameUk: "Гіно-тардіферон", price: 145 }] },
    { nameEn: "CalciMama", nameUk: "КальціМама", genericEn: "Calcium + D3", genericUk: "Кальцій + D3", formEn: "Tablets", formUk: "Таблетки", price: 198, rx: false, color: "#E0F2FE", alts: [{ nameEn: "CalceMIN", nameUk: "КальцеМІН", price: 165 }, { nameEn: "Calcium D3 Nycomed", nameUk: "Кальцій D3 Нікомед", price: 132 }, { nameEn: "Calcimax", nameUk: "Кальцімакс", price: 98 }] },
    { nameEn: "OmegaMama", nameUk: "ОмегаМама", genericEn: "Omega-3 DHA for pregnancy", genericUk: "Омега-3 ДГК для вагітних", formEn: "Capsules", formUk: "Капсули", price: 345, rx: false, color: "#D1FAE5", alts: [{ nameEn: "Prenatal Omega", nameUk: "Пренатал Омега", price: 289 }, { nameEn: "OmegaMom", nameUk: "ОмегаМам", price: 234 }, { nameEn: "DHA Plus", nameUk: "ДГК Плюс", price: 178 }] },
  ],
  immunity: [
    { nameEn: "ImmunoFort", nameUk: "ІмуноФорт", genericEn: "Echinacea 200mg", genericUk: "Ехінацея 200мг", formEn: "Tablets", formUk: "Таблетки", price: 145, rx: false, color: "#D1FAE5", alts: [{ nameEn: "Immunal", nameUk: "Імунал", price: 118 }, { nameEn: "Echinacea UA", nameUk: "Ехінацея UA", price: 89 }, { nameEn: "EchiPlus", nameUk: "ЕхіПлюс", price: 65 }] },
    { nameEn: "VitaC Pro", nameUk: "ВітаC Про", genericEn: "Vitamin C 1000mg", genericUk: "Вітамін C 1000мг", formEn: "Effervescent", formUk: "Шипучі таблетки", price: 178, rx: false, color: "#FEF3C7", alts: [{ nameEn: "Redoxon", nameUk: "Редоксон", price: 145 }, { nameEn: "Cevitol", nameUk: "Цевітол", price: 112 }, { nameEn: "Ascorbic Plus", nameUk: "Аскорбін Плюс", price: 78 }] },
    { nameEn: "ProBioShield", nameUk: "ПробіоЩит", genericEn: "Probiotic + Prebiotics", genericUk: "Пробіотик + Пребіотики", formEn: "Capsules", formUk: "Капсули", price: 345, rx: false, color: "#E0F2FE", alts: [{ nameEn: "Linex Forte", nameUk: "Лінекс Форте", price: 289 }, { nameEn: "Bifidum UA", nameUk: "Біфідум UA", price: 234 }, { nameEn: "Lacto Shield", nameUk: "Лакто Щит", price: 178 }] },
    { nameEn: "ZincImmune", nameUk: "ЦинкІмун", genericEn: "Zinc + Selenium", genericUk: "Цинк + Селен", formEn: "Tablets", formUk: "Таблетки", price: 198, rx: false, color: "#FDE68A", alts: [{ nameEn: "Oligovit", nameUk: "Олігівіт", price: 165 }, { nameEn: "Selzinc Plus", nameUk: "Сельцинк Плюс", price: 134 }, { nameEn: "ZincSel UA", nameUk: "ЦинкСел UA", price: 98 }] },
    { nameEn: "BetaGlucan", nameUk: "БетаГлюкан", genericEn: "Beta-glucan 250mg", genericUk: "Бета-глюкан 250мг", formEn: "Capsules", formUk: "Капсули", price: 267, rx: false, color: "#FCE7F3", alts: [{ nameEn: "Immuno Active", nameUk: "Імуно Актив", price: 218 }, { nameEn: "GlucanForce", nameUk: "ГлюканФорс", price: 178 }, { nameEn: "Beta-G UA", nameUk: "Бета-Г UA", price: 134 }] },
  ],
};

const HOW_STEPS = [
  { emoji: "🔍", en: "Search", uk: "Пошук", descEn: "Find by name or symptom", descUk: "Знайдіть за назвою або симптомом" },
  { emoji: "🛒", en: "Add to cart", uk: "У кошик", descEn: "Select quantity and add", descUk: "Оберіть кількість та додайте" },
  { emoji: "🚀", en: "Delivery in 2h", uk: "Доставка за 2 год", descEn: "Right to your door", descUk: "Прямо до вашої двері" },
];

const PHARMACIES = [
  { en: "Khreshchatyk 22", uk: "Хрещатик 22", hours: "08:00–22:00", inStock: true },
  { en: "Lesya Ukrainka Blvd 10", uk: "Бул. Лесі Українки 10", hours: "09:00–21:00", inStock: true },
  { en: "Peremohy Ave 56", uk: "Пр. Перемоги 56", hours: "08:00–20:00", inStock: false },
];

export function AptekaDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [openAlt, setOpenAlt] = useState<number | null>(null);
  const [countdown] = useState({ h: "03", m: "47", s: "22" });

  const currentDrugs = activeCategory ? DRUGS[activeCategory] ?? [] : [];

  return (
    <div style={{ background: BG, fontFamily: "'Inter', 'Helvetica Neue', sans-serif", color: "#1E293B" }} className="min-h-screen">

      {/* NAV */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #E2E8F0" }} className="px-6 py-3 flex items-center justify-between">
        <span style={{ color: G, fontSize: 20, fontWeight: 800, letterSpacing: -0.5 }}>Apteka<span style={{ color: "#1E293B" }}>.ua</span></span>
        <div className="flex gap-4 text-sm text-slate-600">
          <span className="cursor-pointer hover:text-green-600">{isUk ? "Каталог" : "Catalog"}</span>
          <span className="cursor-pointer hover:text-green-600">{isUk ? "Аптеки" : "Pharmacies"}</span>
          <span className="cursor-pointer hover:text-green-600">{isUk ? "Рецепт" : "Prescription"}</span>
        </div>
        <button style={{ background: G, color: "#fff", border: "none", padding: "8px 18px", borderRadius: 8, fontSize: 14, cursor: "pointer" }}>
          🛒 {isUk ? "Кошик" : "Cart"}
        </button>
      </nav>

      {/* DEAL BANNER */}
      <div style={{ background: "linear-gradient(90deg, #15803D, #16A34A)", color: "#fff", padding: "10px 24px", textAlign: "center", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
        <span>🌟 {isUk ? "-20% на вітаміни" : "-20% on vitamins"}</span>
        <span style={{ background: "rgba(0,0,0,0.25)", padding: "4px 12px", borderRadius: 20, fontWeight: 700, fontFamily: "monospace", fontSize: 15 }}>
          {countdown.h}:{countdown.m}:{countdown.s}
        </span>
        <span>{isUk ? "До кінця акції" : "Until end of sale"}</span>
      </div>

      {/* HERO SEARCH */}
      <section style={{ background: "#fff", borderBottom: "1px solid #E2E8F0", padding: "40px 24px" }}>
        <h1 style={{ textAlign: "center", fontSize: 28, fontWeight: 800, marginBottom: 8, color: "#0F172A" }}>
          {isUk ? "Ліки та товари для здоров'я" : "Medicines & Health Products"}
        </h1>
        <p style={{ textAlign: "center", color: "#64748B", marginBottom: 28, fontSize: 15 }}>
          {isUk ? "Доставка за 2 години по всій Україні" : "Delivery in 2 hours across Ukraine"}
        </p>
        <div style={{ maxWidth: 600, margin: "0 auto", position: "relative" }}>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isUk ? "Пошук за назвою ліків або симптомом..." : "Search by medicine name or symptom..."}
            style={{ width: "100%", border: `2px solid ${G}`, borderRadius: 12, padding: "14px 140px 14px 18px", fontSize: 16, outline: "none", boxSizing: "border-box" }}
          />
          <button style={{ position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)", background: G, color: "#fff", border: "none", padding: "10px 20px", borderRadius: 8, fontSize: 14, cursor: "pointer" }}>
            {isUk ? "Знайти" : "Search"}
          </button>
        </div>

        {/* Category quick buttons */}
        <div className="flex justify-center gap-2 flex-wrap mt-5">
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              onClick={() => setActiveCategory(activeCategory === c.key ? null : c.key)}
              style={{
                background: activeCategory === c.key ? G : "#F1F5F9",
                color: activeCategory === c.key ? "#fff" : "#475569",
                border: "none",
                padding: "8px 16px",
                borderRadius: 20,
                fontSize: 13,
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              {c.emoji} {isUk ? c.uk : c.en}
            </button>
          ))}
        </div>
      </section>

      {/* DRUG RESULTS */}
      {activeCategory && (
        <section style={{ padding: "24px", borderBottom: "1px solid #E2E8F0" }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: "#0F172A" }}>
            {CATEGORIES.find((c) => c.key === activeCategory)?.emoji}{" "}
            {isUk ? CATEGORIES.find((c) => c.key === activeCategory)?.uk : CATEGORIES.find((c) => c.key === activeCategory)?.en}
          </h2>
          <div className="grid grid-cols-1 gap-4" style={{ maxWidth: 700, margin: "0 auto" }}>
            {currentDrugs.map((d, i) => (
              <div key={d.nameEn} style={{ background: "#fff", borderRadius: 12, border: "1px solid #E2E8F0", overflow: "hidden" }}>
                <div style={{ display: "flex", gap: 16, padding: "16px", alignItems: "center" }}>
                  {/* Icon */}
                  <div style={{ width: 56, height: 56, borderRadius: 10, background: d.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>
                    💊
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                      <span style={{ fontWeight: 700, fontSize: 15 }}>{isUk ? d.nameUk : d.nameEn}</span>
                      <span style={{ fontSize: 12, padding: "2px 8px", borderRadius: 10, background: d.rx ? "#FEE2E2" : "#DCFCE7", color: d.rx ? "#DC2626" : "#15803D" }}>
                        {d.rx ? (isUk ? "🔴 Рецепт" : "🔴 Rx required") : (isUk ? "🟢 Без рецепту" : "🟢 No Rx")}
                      </span>
                    </div>
                    <div style={{ color: "#64748B", fontSize: 13 }}>{isUk ? d.genericUk : d.genericEn} · {isUk ? d.formUk : d.formEn}</div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 18, color: G }}>₴{d.price}</div>
                    <button style={{ background: G, color: "#fff", border: "none", padding: "6px 14px", borderRadius: 8, fontSize: 13, cursor: "pointer", marginTop: 4 }}>
                      {isUk ? "Купити" : "Buy"}
                    </button>
                  </div>
                </div>
                <div style={{ borderTop: "1px solid #F1F5F9", padding: "8px 16px" }}>
                  <button
                    onClick={() => setOpenAlt(openAlt === i ? null : i)}
                    style={{ background: "none", border: "none", color: "#64748B", fontSize: 13, cursor: "pointer", padding: 0 }}
                  >
                    {openAlt === i ? "▲" : "▼"} {isUk ? "Дешевші аналоги" : "Alternatives"}
                  </button>
                  {openAlt === i && (
                    <div className="flex gap-3 flex-wrap mt-3">
                      {d.alts.map((a) => (
                        <div key={a.nameEn} style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 8, padding: "8px 12px", fontSize: 13 }}>
                          <div style={{ fontWeight: 600 }}>{isUk ? a.nameUk : a.nameEn}</div>
                          <div style={{ color: G, fontWeight: 700 }}>₴{a.price}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* HOW TO ORDER */}
      <section style={{ padding: "40px 24px", borderBottom: "1px solid #E2E8F0", background: "#fff" }}>
        <h2 style={{ textAlign: "center", fontSize: 20, fontWeight: 700, marginBottom: 28, color: "#0F172A" }}>
          {isUk ? "Як замовити" : "How to Order"}
        </h2>
        <div className="grid grid-cols-3 gap-6" style={{ maxWidth: 560, margin: "0 auto" }}>
          {HOW_STEPS.map((s, i) => (
            <div key={s.en} style={{ textAlign: "center" }}>
              <div style={{ width: 52, height: 52, background: "#DCFCE7", borderRadius: "50%", margin: "0 auto 10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>{s.emoji}</div>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>
                <span style={{ color: G }}>{i + 1}. </span>{isUk ? s.uk : s.en}
              </div>
              <div style={{ color: "#64748B", fontSize: 12 }}>{isUk ? s.descUk : s.descEn}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PHARMACIES */}
      <section style={{ padding: "40px 24px", borderBottom: "1px solid #E2E8F0" }}>
        <h2 style={{ textAlign: "center", fontSize: 20, fontWeight: 700, marginBottom: 24, color: "#0F172A" }}>
          📍 {isUk ? "Наші аптеки" : "Our Pharmacies"}
        </h2>
        <div className="grid grid-cols-1 gap-4" style={{ maxWidth: 560, margin: "0 auto" }}>
          {PHARMACIES.map((p) => (
            <div key={p.en} style={{ background: "#fff", borderRadius: 12, border: "1px solid #E2E8F0", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>🏥 {isUk ? p.uk : p.en}</div>
                <div style={{ color: "#64748B", fontSize: 13 }}>🕐 {p.hours}</div>
              </div>
              <span style={{ background: p.inStock ? "#DCFCE7" : "#FEE2E2", color: p.inStock ? "#15803D" : "#DC2626", fontSize: 12, padding: "4px 12px", borderRadius: 20, fontWeight: 600 }}>
                {p.inStock ? (isUk ? "В наявності" : "In stock") : (isUk ? "Немає" : "Out of stock")}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* UPLOAD PRESCRIPTION */}
      <section style={{ padding: "40px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 560, margin: "0 auto", background: "#F0FDF4", border: `2px dashed ${G}`, borderRadius: 16, padding: "28px 32px", textAlign: "center" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📋</div>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0F172A", marginBottom: 8 }}>
            {isUk ? "Завантажити рецепт" : "Upload Prescription"}
          </h3>
          <p style={{ color: "#64748B", fontSize: 14, marginBottom: 20 }}>
            {isUk
              ? "Сфотографуйте рецепт та надішліть нам — ми підберемо потрібні ліки"
              : "Take a photo of your prescription and send it — we'll find the right medicines"}
          </p>
          <button style={{ background: G, color: "#fff", border: "none", padding: "12px 28px", borderRadius: 10, fontSize: 15, cursor: "pointer" }}>
            {isUk ? "Обрати файл або фото" : "Choose file or photo"}
          </button>
          <div style={{ color: "#94A3B8", fontSize: 12, marginTop: 12 }}>
            {isUk ? "JPG, PNG, PDF — до 10 МБ" : "JPG, PNG, PDF — up to 10 MB"}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#0F172A", color: "#94A3B8", textAlign: "center", padding: "16px 24px", fontSize: 13 }}>
        © 2025 Apteka.ua · {isUk ? "Ліцензія МОЗ UA/123/2025" : "License MOH UA/123/2025"}
      </footer>
    </div>
  );
}
