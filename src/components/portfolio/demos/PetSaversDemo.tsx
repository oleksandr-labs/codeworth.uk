"use client";

import { useState } from "react";
import { EmojiIcon } from "@/components/ui/EmojiIcon";

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV = [
  { en: "Services", uk: "Послуги" },
  { en: "Pricing", uk: "Ціни" },
  { en: "Team", uk: "Команда" },
  { en: "Location", uk: "Адреса" },
];

const PET_TYPES = [
  { en: "Cat", uk: "Кіт" },
  { en: "Dog", uk: "Пес" },
  { en: "Rabbit", uk: "Кролик" },
  { en: "Other", uk: "Інше" },
];

const SYMPTOMS = [
  { id: "s1", level: "red", en: "🚨 Unconscious or unresponsive", uk: "🚨 Непритомний або не реагує" },
  { id: "s2", level: "red", en: "🚨 Difficulty breathing", uk: "🚨 Утруднене дихання" },
  { id: "s3", level: "red", en: "🚨 Severe bleeding (won't stop)", uk: "🚨 Сильна кровотеча (не зупиняється)" },
  { id: "s4", level: "orange", en: "⚠️ Vomiting repeatedly (3+ times)", uk: "⚠️ Блювання кілька разів (3+)" },
  { id: "s5", level: "orange", en: "⚠️ Cannot stand or walk", uk: "⚠️ Не може стояти або ходити" },
  { id: "s6", level: "orange", en: "⚠️ Ate something toxic (chocolate, medicine)", uk: "⚠️ З'їв щось токсичне (шоколад, ліки)" },
  { id: "s7", level: "yellow", en: "ℹ️ Not eating (12–24 h)", uk: "ℹ️ Не їсть (12–24 год)" },
  { id: "s8", level: "yellow", en: "ℹ️ Limping slightly", uk: "ℹ️ Трохи кульгає" },
  { id: "s9", level: "yellow", en: "ℹ️ Mild cough", uk: "ℹ️ Легкий кашель" },
];

const SERVICES = [
  { emoji: "🚑", en: "Emergency Care", uk: "Невідкладна допомога", descEn: "Immediate stabilisation for critical cases.", descUk: "Негайна стабілізація у критичних випадках." },
  { emoji: "🏠", en: "Home Visit", uk: "Виклик додому", descEn: "A vet comes to you — no extra stress for your pet.", descUk: "Лікар приїжджає до вас — без стресу для тварини." },
  { emoji: "🔪", en: "Surgery", uk: "Хірургія", descEn: "Fully equipped OR available 24/7 for emergencies.", descUk: "Повністю оснащена операційна, доступна цілодобово." },
  { emoji: "🛏️", en: "ICU", uk: "Реанімація", descEn: "Round-the-clock intensive care and monitoring.", descUk: "Цілодобовий інтенсивний догляд і моніторинг." },
];

const PRICING = [
  { en: "Initial emergency exam", uk: "Первинний огляд (ургентний)", range: "350–600 ₴" },
  { en: "IV drip (per session)", uk: "Крапельниця (за сеанс)", range: "400–800 ₴" },
  { en: "X-ray", uk: "Рентген", range: "500–900 ₴" },
  { en: "Ultrasound", uk: "УЗД", range: "600–1 000 ₴" },
  { en: "Emergency surgery", uk: "Екстрена операція", range: "2 500–8 000 ₴" },
  { en: "Home visit call-out", uk: "Виклик додому", range: "700–1 200 ₴" },
];

const TEAM = [
  { name: "Dr. Olena Kovalenko", specEn: "Emergency Medicine", specUk: "Невідкладна медицина", scheduleEn: "Mon–Wed on call", scheduleUk: "Пн–Ср: чергування" },
  { name: "Dr. Mykola Petrenko", specEn: "Surgery", specUk: "Хірургія", scheduleEn: "Thu–Sat on call", scheduleUk: "Чт–Сб: чергування" },
  { name: "Dr. Sofia Yarova", specEn: "Intensive Care", specUk: "Інтенсивна терапія", scheduleEn: "Tue–Thu on call", scheduleUk: "Вт–Чт: чергування" },
  { name: "Dr. Andriy Lysenko", specEn: "Internal Medicine", specUk: "Терапія", scheduleEn: "Fri–Sun on call", scheduleUk: "Пт–Нд: чергування" },
];

// ─── Component ───────────────────────────────────────────────────────────────

export function PetSaversDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [petType, setPetType] = useState<string | null>(null);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [showResult, setShowResult] = useState(false);

  const toggleSymptom = (id: string) =>
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

  const selected = SYMPTOMS.filter((s) => checked[s.id]);

  const getUrgency = () => {
    if (selected.some((s) => s.level === "red")) return "red";
    if (selected.some((s) => s.level === "orange")) return "orange";
    if (selected.length > 0) return "yellow";
    return null;
  };

  const urgency = getUrgency();

  const resultMsg = {
    red: {
      en: "GO IMMEDIATELY — call first: 0800-XXX-XXX",
      uk: "ЇДЬТЕ НЕГАЙНО — спочатку зателефонуйте: 0800-XXX-XXX",
    },
    orange: {
      en: "Visit tonight — don't wait until morning",
      uk: "Приїжджайте сьогодні ввечері — не чекайте до ранку",
    },
    yellow: {
      en: "Can wait until regular clinic hours, but call to consult",
      uk: "Можна почекати до робочого часу, але зателефонуйте для консультації",
    },
  };

  const urgencyBg: Record<string, string> = { red: "#B91C1C", orange: "#EA580C", yellow: "#CA8A04" };

  return (
    <div style={{ fontFamily: "Inter, sans-serif", background: "#FFFFFF", color: "#1F2937" }}>
      {/* Emergency Banner */}
      <div style={{ background: "#B91C1C", color: "#fff", padding: "10px 20px", textAlign: "center", fontSize: 14, fontWeight: 700 }}>
        🚨 {isUk ? "Екстрена допомога? Телефонуйте зараз:" : "Emergency? Call now:"} 0800-XXX-XXX ({isUk ? "Безкоштовно, 24/7" : "Free, 24/7"})
      </div>

      {/* Nav */}
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 32px", borderBottom: "1px solid #E5E7EB", background: "#fff", position: "sticky", top: 0, zIndex: 50 }}>
        <span style={{ fontWeight: 800, fontSize: 20, color: "#B91C1C", letterSpacing: "-0.5px" }}>PetSavers</span>
        <div style={{ display: "flex", gap: 24 }}>
          {NAV.map((n) => (
            <a key={n.en} href="#" style={{ fontSize: 14, color: "#1F2937", textDecoration: "none", fontWeight: 500 }}>
              {isUk ? n.uk : n.en}
            </a>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section style={{ background: "#1F2937", color: "#fff", padding: "64px 32px", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "#B91C1C", color: "#fff", fontSize: 12, fontWeight: 700, letterSpacing: 2, padding: "4px 12px", borderRadius: 4, marginBottom: 20, textTransform: "uppercase" }}>
          24/7
        </div>
        <h1 style={{ fontSize: 42, fontWeight: 900, margin: "0 0 16px", lineHeight: 1.15 }}>
          {isUk ? "24/7. Завжди відкриті для вашого улюбленця." : "24/7. Always open for your pet."}
        </h1>
        <p style={{ fontSize: 18, color: "#D1D5DB", marginBottom: 32 }}>
          {isUk ? "Ветеринарна клініка швидкої допомоги. Без вихідних. Без ночей." : "Emergency veterinary clinic. No days off. No nights off."}
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="tel:0800000000" style={{ background: "#B91C1C", color: "#fff", padding: "14px 32px", borderRadius: 8, fontWeight: 700, fontSize: 18, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>
            📞 0800-XXX-XXX
          </a>
          <button style={{ background: "transparent", border: "2px solid #fff", color: "#fff", padding: "14px 28px", borderRadius: 8, fontWeight: 600, fontSize: 15, cursor: "pointer" }}>
            {isUk ? "Виклик ветеринара додому" : "Call a vet to your home"}
          </button>
        </div>
      </section>

      {/* Symptom Router */}
      <section style={{ padding: "48px 32px", maxWidth: 700, margin: "0 auto" }}>
        <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 8, color: "#1F2937" }}>
          {isUk ? "Чи потрібно їхати ЗАРАЗ?" : "Do I need to go NOW?"}
        </h2>
        <p style={{ color: "#6B7280", marginBottom: 24, fontSize: 14 }}>
          {isUk ? "Оберіть тип тварини та симптоми" : "Select pet type and symptoms"}
        </p>

        <div style={{ marginBottom: 20 }}>
          <p style={{ fontWeight: 600, marginBottom: 10, fontSize: 14 }}>{isUk ? "Тип тварини:" : "Pet type:"}</p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {PET_TYPES.map((p) => (
              <button
                key={p.en}
                onClick={() => setPetType(p.en)}
                style={{ padding: "8px 18px", borderRadius: 20, border: `2px solid ${petType === p.en ? "#B91C1C" : "#E5E7EB"}`, background: petType === p.en ? "#B91C1C" : "#fff", color: petType === p.en ? "#fff" : "#1F2937", fontWeight: 600, fontSize: 14, cursor: "pointer" }}
              >
                {isUk ? p.uk : p.en}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <p style={{ fontWeight: 600, marginBottom: 10, fontSize: 14 }}>{isUk ? "Симптоми (можна кілька):" : "Symptoms (multiple):"}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {SYMPTOMS.map((s) => {
              const borderColor = s.level === "red" ? "#FCA5A5" : s.level === "orange" ? "#FDBA74" : "#FDE68A";
              const bg = checked[s.id] ? (s.level === "red" ? "#FEF2F2" : s.level === "orange" ? "#FFF7ED" : "#FEFCE8") : "#fff";
              return (
                <label key={s.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", border: `1px solid ${borderColor}`, borderRadius: 8, background: bg, cursor: "pointer" }}>
                  <input type="checkbox" checked={!!checked[s.id]} onChange={() => toggleSymptom(s.id)} style={{ width: 16, height: 16, accentColor: "#B91C1C", flexShrink: 0 }} />
                  <span style={{ fontSize: 14 }}>{isUk ? s.uk : s.en}</span>
                </label>
              );
            })}
          </div>
        </div>

        <button
          onClick={() => setShowResult(true)}
          disabled={!petType || selected.length === 0}
          style={{ background: "#B91C1C", color: "#fff", border: "none", padding: "14px 32px", borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: petType && selected.length > 0 ? "pointer" : "not-allowed", opacity: petType && selected.length > 0 ? 1 : 0.5, width: "100%" }}
        >
          {isUk ? "Дізнатися результат" : "Get recommendation"}
        </button>

        {showResult && urgency && (
          <div style={{ marginTop: 20, background: urgencyBg[urgency], color: "#fff", padding: "20px 24px", borderRadius: 10, fontWeight: 700, fontSize: 17, textAlign: "center" }}>
            {isUk ? resultMsg[urgency as keyof typeof resultMsg].uk : resultMsg[urgency as keyof typeof resultMsg].en}
          </div>
        )}
      </section>

      {/* Services */}
      <section style={{ padding: "48px 32px", background: "#F9FAFB" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 8 }}>{isUk ? "Послуги" : "Services"}</h2>
          <p style={{ color: "#6B7280", marginBottom: 28, fontSize: 14 }}>{isUk ? "Всі послуги доступні 24 години на добу, 7 днів на тиждень" : "All services available 24 hours a day, 7 days a week"}</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
            {SERVICES.map((svc) => (
              <div key={svc.en} style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, padding: "24px 20px", position: "relative" }}>
                <div style={{ position: "absolute", top: 12, right: 12, background: "#B91C1C", color: "#fff", fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 20 }}>24h</div>
                <div style={{ marginBottom: 10 }}><EmojiIcon emoji={svc.emoji} className="w-14 h-14" /></div>
                <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{isUk ? svc.uk : svc.en}</h3>
                <p style={{ color: "#6B7280", fontSize: 13, lineHeight: 1.5 }}>{isUk ? svc.descUk : svc.descEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section style={{ padding: "48px 32px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 6 }}>{isUk ? "Прозорі ціни" : "Transparent Pricing"}</h2>
          <p style={{ color: "#6B7280", fontSize: 14, marginBottom: 24 }}>{isUk ? "Ніяких прихованих нічних надбавок" : "No hidden night surcharges"}</p>
          <div style={{ border: "1px solid #E5E7EB", borderRadius: 10, overflow: "hidden" }}>
            {PRICING.map((row, i) => (
              <div key={row.en} style={{ display: "flex", justifyContent: "space-between", padding: "14px 20px", background: i % 2 === 0 ? "#fff" : "#F9FAFB", borderBottom: i < PRICING.length - 1 ? "1px solid #E5E7EB" : "none" }}>
                <span style={{ fontSize: 14, color: "#374151" }}>{isUk ? row.uk : row.en}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#B91C1C" }}>{row.range}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: "48px 32px", background: "#F9FAFB" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 28 }}>{isUk ? "Наша команда" : "Our Team"}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
            {TEAM.map((doc) => (
              <div key={doc.name} style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, padding: "20px", textAlign: "center" }}>
                <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#1F2937", margin: "0 auto 14px", display: "flex", alignItems: "center", justifyContent: "center" }}><EmojiIcon emoji="🩺" className="w-10 h-10" /></div>
                <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{doc.name}</h3>
                <p style={{ color: "#B91C1C", fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{isUk ? doc.specUk : doc.specEn}</p>
                <p style={{ color: "#9CA3AF", fontSize: 12 }}>{isUk ? doc.scheduleUk : doc.scheduleEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section style={{ padding: "48px 32px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 20 }}>{isUk ? "Як нас знайти" : "How to find us"}</h2>
          <div style={{ background: "#1F2937", borderRadius: 10, height: 180, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, color: "#9CA3AF", fontSize: 14 }}>
            🗺️ {isUk ? "Карта (заглушка)" : "Map placeholder"}
          </div>
          <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{isUk ? "вул. Хрещатик, 42, Київ" : "42 Khreshchatyk St, Kyiv"}</p>
          <p style={{ color: "#6B7280", fontSize: 14 }}>{isUk ? "Орієнтир: навпроти ЦУМу, вхід зі сторони парку" : "Landmark: opposite TsUM department store, entrance from the park side"}</p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#1F2937", color: "#9CA3AF", padding: "24px 32px", textAlign: "center", fontSize: 13 }}>
        © 2025 PetSavers · {isUk ? "Невідкладна ветеринарна допомога 24/7" : "Emergency Veterinary Care 24/7"}
      </footer>
    </div>
  );
}
