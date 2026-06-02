"use client";
import { useState } from "react";

export function PharmaGoDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const BLUE = "#2563EB";
  const MINT = "#D1FAE5";
  const DARK = "#1E3A5F";
  const LIGHT_BLUE = "#EFF6FF";
  const BLUE_SOFT = "#DBEAFE";

  const [activeSymptom, setActiveSymptom] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [trackingInput, setTrackingInput] = useState("");
  const [trackingStage, setTrackingStage] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"symptom" | "tracking" | "prescription" | "catalog">("symptom");
  const [addedToCart, setAddedToCart] = useState<Set<string>>(new Set());

  type Drug = { name: string; generic: string; form: string; price: string; id: string };

  const symptomDrugs: Record<string, Drug[]> = {
    fever: [
      { id: "f1", name: "Paracetamol 500mg", generic: isUk ? "Парацетамол" : "Paracetamol", form: isUk ? "Таблетки, 20 шт" : "Tablets, 20 pcs", price: "₴85" },
      { id: "f2", name: "Ibuprofen 200mg", generic: isUk ? "Ібупрофен" : "Ibuprofen", form: isUk ? "Таблетки, 24 шт" : "Tablets, 24 pcs", price: "₴95" },
      { id: "f3", name: "Nurofen Express", generic: isUk ? "Ібупрофен лізину" : "Ibuprofen lysine", form: isUk ? "Капсули, 12 шт" : "Capsules, 12 pcs", price: "₴135" },
      { id: "f4", name: "Aspirin 500mg", generic: isUk ? "Ацетилсаліцилова кислота" : "Acetylsalicylic acid", form: isUk ? "Таблетки, 20 шт" : "Tablets, 20 pcs", price: "₴55" },
      { id: "f5", name: "Efferalgan 1000mg", generic: isUk ? "Парацетамол шипучий" : "Paracetamol effervescent", form: isUk ? "Шипучі таблетки, 16 шт" : "Effervescent tablets, 16 pcs", price: "₴160" },
    ],
    cold: [
      { id: "c1", name: "Theraflu Max", generic: isUk ? "Парацетамол + фенілефрин" : "Paracetamol + phenylephrine", form: isUk ? "Порошок для розчину, 10 саше" : "Powder sachets, 10 pcs", price: "₴245" },
      { id: "c2", name: "Fervex", generic: isUk ? "Парацетамол + аскорбінова кислота" : "Paracetamol + ascorbic acid", form: isUk ? "Порошок, 8 саше" : "Powder sachets, 8 pcs", price: "₴195" },
      { id: "c3", name: "Rinazolin 0.1%", generic: isUk ? "Ксилометазолін" : "Xylometazoline", form: isUk ? "Краплі назальні, 10 мл" : "Nasal drops, 10 ml", price: "₴65" },
      { id: "c4", name: "Sinupret Forte", generic: isUk ? "Екстракт трав" : "Herbal extract", form: isUk ? "Таблетки, 50 шт" : "Tablets, 50 pcs", price: "₴275" },
      { id: "c5", name: "Bromhexine 8mg", generic: isUk ? "Бромгексину гідрохлорид" : "Bromhexine HCl", form: isUk ? "Таблетки, 25 шт" : "Tablets, 25 pcs", price: "₴45" },
    ],
    pain: [
      { id: "p1", name: "Ketanov 10mg", generic: isUk ? "Кеторолак" : "Ketorolac", form: isUk ? "Таблетки, 20 шт" : "Tablets, 20 pcs", price: "₴115" },
      { id: "p2", name: "Diklofenак 50mg", generic: isUk ? "Диклофенак натрію" : "Diclofenac sodium", form: isUk ? "Таблетки, 20 шт" : "Tablets, 20 pcs", price: "₴75" },
      { id: "p3", name: "Nimesil 100mg", generic: isUk ? "Німесулід" : "Nimesulide", form: isUk ? "Гранули, 30 саше" : "Granules, 30 sachets", price: "₴185" },
      { id: "p4", name: "Voltaren Emulgel", generic: isUk ? "Диклофенак гель" : "Diclofenac gel", form: isUk ? "Гель 1%, 50 г" : "Gel 1%, 50 g", price: "₴195" },
      { id: "p5", name: "Spazmalgon", generic: isUk ? "Метамізол + спазмолітик" : "Metamizole + spasmolytic", form: isUk ? "Таблетки, 20 шт" : "Tablets, 20 pcs", price: "₴88" },
    ],
    vitamins: [
      { id: "v1", name: "Vitrum", generic: isUk ? "Мультивітамінний комплекс" : "Multivitamin complex", form: isUk ? "Таблетки, 60 шт" : "Tablets, 60 pcs", price: "₴385" },
      { id: "v2", name: "Vitamin C 1000mg", generic: isUk ? "Аскорбінова кислота" : "Ascorbic acid", form: isUk ? "Шипучі таблетки, 20 шт" : "Effervescent tablets, 20 pcs", price: "₴145" },
      { id: "v3", name: "Vitamin D3 5000 IU", generic: isUk ? "Холекальциферол" : "Cholecalciferol", form: isUk ? "Краплі, 10 мл" : "Drops, 10 ml", price: "₴215" },
      { id: "v4", name: "Magne B6 Forte", generic: isUk ? "Магній + вітамін B6" : "Magnesium + Vitamin B6", form: isUk ? "Таблетки, 60 шт" : "Tablets, 60 pcs", price: "₴295" },
      { id: "v5", name: "Omega-3 1000mg", generic: isUk ? "Риб'ячий жир" : "Fish oil", form: isUk ? "Капсули, 60 шт" : "Capsules, 60 pcs", price: "₴320" },
    ],
  };

  const allDrugs: Drug[] = Object.values(symptomDrugs).flat();

  const filteredDrugs = searchQuery.length >= 2
    ? allDrugs.filter(
        (d) =>
          d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.generic.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : activeSymptom
      ? symptomDrugs[activeSymptom] || []
      : [];

  const trackingStages = [
    { label: isUk ? "Отримано" : "Received", icon: "📋" },
    { label: isUk ? "Обробка" : "Processing", icon: "⚙️" },
    { label: isUk ? "Упаковано" : "Packed", icon: "📦" },
    { label: isUk ? "Кур'єр забрав" : "Courier picked up", icon: "🛵" },
    { label: isUk ? "Доставлено" : "Delivered", icon: "✅" },
  ];

  const handleOrder = (id: string) => {
    setAddedToCart((prev) => new Set([...prev, id]));
  };

  const handleTrack = () => {
    if (trackingInput === "12345") {
      setTrackingStage(3);
    } else if (trackingInput.length >= 3) {
      setTrackingStage(1);
    }
  };

  const symptomButtons = [
    { id: "fever", icon: "🤒", label: isUk ? "Температура" : "Fever", color: "#FEF2F2", border: "#FECACA", text: "#DC2626" },
    { id: "cold", icon: "🤧", label: isUk ? "Застуда та грип" : "Cold & Flu", color: "#EFF6FF", border: "#BFDBFE", text: "#2563EB" },
    { id: "pain", icon: "😣", label: isUk ? "Біль" : "Pain", color: "#FFF7ED", border: "#FED7AA", text: "#EA580C" },
    { id: "vitamins", icon: "💊", label: isUk ? "Вітаміни" : "Vitamins", color: "#F0FDF4", border: "#BBF7D0", text: "#16A34A" },
  ];

  const stats = [
    { value: "45-60", unit: isUk ? "хв" : "min", label: isUk ? "Середній час доставки" : "Avg delivery time" },
    { value: "3,200", unit: "+", label: isUk ? "Аптек-партнерів" : "Partner pharmacies" },
    { value: "24/7", unit: "", label: isUk ? "Цілодобово" : "Around the clock" },
    { value: "50+", unit: "", label: isUk ? "Міст покриття" : "Cities covered" },
  ];

  const tabs = [
    { id: "symptom" as const, label: isUk ? "Пошук ліків" : "Drug Search" },
    { id: "tracking" as const, label: isUk ? "Відстеження" : "Tracking" },
    { id: "prescription" as const, label: isUk ? "Рецепт" : "Prescription" },
    { id: "catalog" as const, label: isUk ? "Каталог" : "Catalog" },
  ];

  return (
    <div style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif", background: "#F8FAFF", color: DARK, minHeight: "100vh" }}>
      {/* Hero */}
      <div
        style={{
          background: `linear-gradient(135deg, ${BLUE} 0%, #1D4ED8 40%, #1E40AF 100%)`,
          padding: "52px 32px 44px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Speed lines decoration */}
        <div style={{ position: "absolute", top: 0, right: 0, width: "300px", height: "100%", opacity: 0.08 }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: `${15 + i * 18}%`,
                right: `${i * 12}px`,
                width: "200px",
                height: "2px",
                background: "#fff",
                borderRadius: "2px",
              }}
            />
          ))}
        </div>
        <div style={{ position: "relative", maxWidth: "800px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.25)",
              borderRadius: "20px",
              padding: "6px 16px",
              color: "#BAE6FD",
              fontSize: "13px",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: "20px",
            }}
          >
            <span style={{ width: "8px", height: "8px", background: "#4ADE80", borderRadius: "50%", display: "inline-block" }} />
            {isUk ? "Доставка зараз доступна" : "Delivery available now"}
          </div>
          <h1
            style={{
              fontSize: "clamp(24px, 4.5vw, 42px)",
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.2,
              marginBottom: "18px",
              maxWidth: "620px",
            }}
          >
            {isUk
              ? "Ліки додому за 1 годину. Вдень і вночі."
              : "Medicines home in 1 hour. Day and night."}
          </h1>
          <div
            style={{
              display: "inline-flex",
              flexWrap: "wrap",
              gap: "16px",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: "12px",
              padding: "12px 20px",
            }}
          >
            {[
              { icon: "🏥", text: isUk ? "3 200 аптек-партнерів" : "3,200 partner pharmacies" },
              { icon: "⚡", text: isUk ? "Доставка 45-60 хв" : "Delivery in 45-60 min" },
              { icon: "🕐", text: "24/7" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px", color: "#DBEAFE", fontSize: "13px" }}>
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Express Mode Banner */}
      <div
        style={{
          background: `linear-gradient(90deg, #DC2626 0%, #EF4444 100%)`,
          padding: "14px 24px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <span style={{ fontSize: "20px" }}>🚨</span>
        <p style={{ color: "#fff", fontSize: "15px", fontWeight: 700, margin: 0 }}>
          {isUk
            ? "РЕЖИМ «МНЕ ПОГАНО» — замовте термінову доставку ліків за 5 хвилин"
            : "\"I'M SICK\" EXPRESS MODE — order urgent medicine delivery in 5 minutes"}
        </p>
        <button
          style={{
            background: "#fff", color: "#DC2626", border: "none", borderRadius: "8px",
            padding: "6px 16px", fontSize: "13px", fontWeight: 700, cursor: "pointer",
            flexShrink: 0,
          }}
        >
          {isUk ? "Замовити" : "Order Now"}
        </button>
      </div>

      {/* Nav Tabs */}
      <div style={{ background: "#fff", borderBottom: "2px solid #F1F5F9", padding: "0 24px", overflowX: "auto" }}>
        <div style={{ display: "flex", gap: "4px", minWidth: "max-content" }}>
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                padding: "14px 20px",
                border: "none",
                background: "none",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: activeTab === t.id ? 700 : 400,
                color: activeTab === t.id ? BLUE : "#6B7280",
                borderBottom: activeTab === t.id ? `3px solid ${BLUE}` : "3px solid transparent",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "32px 20px" }}>
        {/* SYMPTOM / DRUG SEARCH TAB */}
        {activeTab === "symptom" && (
          <div>
            <h2 style={{ fontSize: "22px", fontWeight: 700, color: DARK, marginBottom: "8px" }}>
              {isUk ? "Швидкий старт за симптомом" : "Quick Start by Symptom"}
            </h2>
            <p style={{ color: "#6B7280", marginBottom: "24px", fontSize: "14px" }}>
              {isUk ? "Оберіть симптом або введіть назву препарату" : "Select a symptom or type a medicine name"}
            </p>

            {/* Quick symptom buttons */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", marginBottom: "24px" }}>
              {symptomButtons.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setActiveSymptom(activeSymptom === s.id ? null : s.id);
                    setSearchQuery("");
                  }}
                  style={{
                    padding: "16px 20px",
                    border: `2px solid ${activeSymptom === s.id ? s.text : s.border}`,
                    borderRadius: "14px",
                    background: activeSymptom === s.id ? s.color : "#fff",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    transition: "all 0.2s",
                    boxShadow: activeSymptom === s.id ? `0 4px 16px ${s.text}25` : "0 1px 4px rgba(0,0,0,0.05)",
                  }}
                >
                  <span style={{ fontSize: "28px" }}>{s.icon}</span>
                  <span style={{ fontSize: "15px", fontWeight: 700, color: activeSymptom === s.id ? s.text : DARK }}>
                    {s.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Search input */}
            <div style={{ position: "relative", marginBottom: "24px" }}>
              <span
                style={{
                  position: "absolute", left: "14px", top: "50%",
                  transform: "translateY(-50%)", fontSize: "16px",
                }}
              >
                🔍
              </span>
              <input
                type="text"
                placeholder={isUk ? "Пошук: назва або діюча речовина..." : "Search: name or active ingredient..."}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value.length >= 2) setActiveSymptom(null);
                }}
                style={{
                  width: "100%", padding: "13px 14px 13px 44px",
                  border: `2px solid ${searchQuery ? BLUE : "#E5E7EB"}`,
                  borderRadius: "12px", fontSize: "15px", outline: "none",
                  background: "#fff", boxSizing: "border-box",
                  transition: "border-color 0.2s",
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  style={{
                    position: "absolute", right: "12px", top: "50%",
                    transform: "translateY(-50%)", background: "none", border: "none",
                    cursor: "pointer", fontSize: "18px", color: "#9CA3AF",
                  }}
                >
                  ×
                </button>
              )}
            </div>

            {/* Drug results */}
            {filteredDrugs.length > 0 && (
              <div>
                <p style={{ fontSize: "13px", color: "#6B7280", marginBottom: "14px" }}>
                  {isUk ? `Знайдено ${filteredDrugs.length} препарати` : `Found ${filteredDrugs.length} medications`}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {filteredDrugs.map((drug) => (
                    <div
                      key={drug.id}
                      style={{
                        background: "#fff", borderRadius: "14px", padding: "16px 20px",
                        border: `1px solid ${BLUE_SOFT}`,
                        display: "flex", alignItems: "center", gap: "16px",
                        boxShadow: "0 2px 8px rgba(37,99,235,0.06)",
                      }}
                    >
                      <div
                        style={{
                          width: "48px", height: "48px", borderRadius: "12px",
                          background: LIGHT_BLUE, display: "flex", alignItems: "center",
                          justifyContent: "center", fontSize: "22px", flexShrink: 0,
                        }}
                      >
                        💊
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h4 style={{ fontSize: "15px", fontWeight: 700, color: DARK, marginBottom: "2px" }}>{drug.name}</h4>
                        <p style={{ fontSize: "12px", color: "#6B7280", marginBottom: "2px" }}>{drug.generic}</p>
                        <p style={{ fontSize: "12px", color: "#9CA3AF" }}>{drug.form}</p>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <p style={{ fontSize: "20px", fontWeight: 800, color: BLUE, marginBottom: "8px" }}>{drug.price}</p>
                        <button
                          onClick={() => handleOrder(drug.id)}
                          style={{
                            background: addedToCart.has(drug.id) ? "#16A34A" : BLUE,
                            color: "#fff", border: "none", borderRadius: "8px",
                            padding: "8px 16px", fontSize: "13px", fontWeight: 700,
                            cursor: "pointer", transition: "background 0.2s",
                          }}
                        >
                          {addedToCart.has(drug.id)
                            ? (isUk ? "✓ Додано" : "✓ Added")
                            : (isUk ? "Замовити" : "Order")}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!activeSymptom && searchQuery.length < 2 && (
              <div
                style={{
                  textAlign: "center", padding: "32px",
                  background: LIGHT_BLUE, borderRadius: "16px",
                  border: `1px dashed ${BLUE_SOFT}`,
                }}
              >
                <p style={{ color: "#6B7280", fontSize: "15px" }}>
                  {isUk ? "Оберіть симптом або введіть назву препарату" : "Select a symptom or search for a medicine"}
                </p>
              </div>
            )}
          </div>
        )}

        {/* TRACKING TAB */}
        {activeTab === "tracking" && (
          <div>
            <h2 style={{ fontSize: "22px", fontWeight: 700, color: DARK, marginBottom: "8px" }}>
              {isUk ? "Відстеження замовлення" : "Order Tracking"}
            </h2>
            <p style={{ color: "#6B7280", marginBottom: "24px", fontSize: "14px" }}>
              {isUk ? "Введіть номер замовлення для відстеження. Спробуйте: 12345" : "Enter your order number to track. Try: 12345"}
            </p>

            <div style={{ display: "flex", gap: "12px", marginBottom: "32px" }}>
              <input
                type="text"
                placeholder={isUk ? "Номер замовлення..." : "Order number..."}
                value={trackingInput}
                onChange={(e) => setTrackingInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleTrack()}
                style={{
                  flex: 1, padding: "13px 16px",
                  border: `2px solid ${trackingInput ? BLUE : "#E5E7EB"}`,
                  borderRadius: "12px", fontSize: "15px", outline: "none",
                }}
              />
              <button
                onClick={handleTrack}
                style={{
                  background: BLUE, color: "#fff", border: "none", borderRadius: "12px",
                  padding: "13px 24px", fontSize: "15px", fontWeight: 700, cursor: "pointer",
                }}
              >
                {isUk ? "Знайти" : "Track"}
              </button>
            </div>

            {trackingStage !== null && (
              <div
                style={{
                  background: "#fff", borderRadius: "20px", padding: "28px 24px",
                  boxShadow: "0 4px 24px rgba(37,99,235,0.1)",
                  border: `1px solid ${BLUE_SOFT}`,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
                  <div>
                    <p style={{ fontSize: "13px", color: "#6B7280", marginBottom: "2px" }}>
                      {isUk ? "Замовлення" : "Order"} #{trackingInput}
                    </p>
                    <p style={{ fontSize: "16px", fontWeight: 700, color: DARK }}>
                      {isUk ? "Ваше замовлення в дорозі" : "Your order is on its way"}
                    </p>
                  </div>
                  <div
                    style={{
                      background: MINT, color: "#065F46", fontSize: "13px", fontWeight: 700,
                      padding: "6px 14px", borderRadius: "20px",
                    }}
                  >
                    {isUk ? "В дорозі" : "In transit"}
                  </div>
                </div>

                {/* Progress bar */}
                <div style={{ position: "relative", marginBottom: "12px" }}>
                  <div style={{ height: "6px", background: "#E5E7EB", borderRadius: "3px", overflow: "hidden" }}>
                    <div
                      style={{
                        height: "100%",
                        width: `${(trackingStage / (trackingStages.length - 1)) * 100}%`,
                        background: `linear-gradient(90deg, ${BLUE}, #60A5FA)`,
                        borderRadius: "3px",
                        transition: "width 0.8s ease",
                      }}
                    />
                  </div>
                </div>

                {/* Stage dots */}
                <div style={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
                  {trackingStages.map((stage, i) => (
                    <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
                      <div
                        style={{
                          width: "36px", height: "36px", borderRadius: "50%",
                          background: i <= trackingStage ? BLUE : "#E5E7EB",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "16px", marginBottom: "8px",
                          transition: "all 0.3s",
                          boxShadow: i === trackingStage ? `0 0 0 4px ${BLUE}30` : "none",
                        }}
                      >
                        {i <= trackingStage ? stage.icon : "○"}
                      </div>
                      <p
                        style={{
                          fontSize: "10px", textAlign: "center", color: i <= trackingStage ? BLUE : "#9CA3AF",
                          fontWeight: i === trackingStage ? 700 : 400,
                          lineHeight: 1.3,
                        }}
                      >
                        {stage.label}
                      </p>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    marginTop: "24px", padding: "14px 18px",
                    background: LIGHT_BLUE, borderRadius: "12px",
                    display: "flex", alignItems: "center", gap: "12px",
                  }}
                >
                  <span style={{ fontSize: "24px" }}>🛵</span>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: 700, color: DARK, marginBottom: "2px" }}>
                      {isUk ? "Орієнтовний час доставки" : "Estimated delivery time"}
                    </p>
                    <p style={{ fontSize: "16px", fontWeight: 800, color: BLUE }}>
                      {isUk ? "~20 хвилин" : "~20 minutes"}
                    </p>
                  </div>
                  <div style={{ marginLeft: "auto", textAlign: "right" }}>
                    <p style={{ fontSize: "12px", color: "#6B7280" }}>{isUk ? "Кур'єр" : "Courier"}</p>
                    <p style={{ fontSize: "14px", fontWeight: 700, color: DARK }}>Андрій К.</p>
                  </div>
                </div>
              </div>
            )}

            {trackingStage === null && (
              <div
                style={{
                  textAlign: "center", padding: "40px",
                  background: LIGHT_BLUE, borderRadius: "16px",
                  border: `1px dashed ${BLUE_SOFT}`,
                }}
              >
                <div style={{ fontSize: "48px", marginBottom: "12px" }}>📦</div>
                <p style={{ color: "#6B7280", fontSize: "15px" }}>
                  {isUk ? "Введіть номер замовлення, щоб побачити статус" : "Enter order number to see status"}
                </p>
              </div>
            )}
          </div>
        )}

        {/* PRESCRIPTION TAB */}
        {activeTab === "prescription" && (
          <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 700, color: DARK, marginBottom: "8px" }}>
              {isUk ? "Завантажити рецепт" : "Upload Your Prescription"}
            </h2>
            <p style={{ color: "#6B7280", marginBottom: "28px", fontSize: "14px" }}>
              {isUk
                ? "Завантажте фото рецепта і ми підберемо потрібні ліки та доставимо їх"
                : "Upload a photo of your prescription and we'll find and deliver the right medicines"}
            </p>

            {/* Upload area */}
            <div
              style={{
                border: `2px dashed ${BLUE}`,
                borderRadius: "20px",
                padding: "48px 32px",
                textAlign: "center",
                background: LIGHT_BLUE,
                cursor: "pointer",
                marginBottom: "24px",
              }}
            >
              <div style={{ fontSize: "56px", marginBottom: "16px" }}>📄</div>
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: BLUE, marginBottom: "8px" }}>
                {isUk ? "Перетягніть фото рецепта" : "Drag & drop prescription photo"}
              </h3>
              <p style={{ color: "#6B7280", fontSize: "14px", marginBottom: "20px" }}>
                {isUk ? "або натисніть для вибору файлу" : "or click to select file"}
              </p>
              <div
                style={{
                  display: "inline-block",
                  background: BLUE, color: "#fff", padding: "10px 24px",
                  borderRadius: "10px", fontSize: "14px", fontWeight: 700,
                }}
              >
                {isUk ? "Обрати файл" : "Choose File"}
              </div>
              <p style={{ color: "#9CA3AF", fontSize: "12px", marginTop: "12px" }}>
                JPG, PNG, PDF · {isUk ? "Макс. 10 МБ" : "Max 10 MB"}
              </p>
            </div>

            {/* How it works */}
            <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", border: `1px solid ${BLUE_SOFT}` }}>
              <h4 style={{ fontSize: "16px", fontWeight: 700, color: DARK, marginBottom: "16px" }}>
                {isUk ? "Як це працює?" : "How it works?"}
              </h4>
              {[
                { step: "1", text: isUk ? "Завантажте фото або скан рецепта" : "Upload photo or scan of prescription" },
                { step: "2", text: isUk ? "Фармацевт перевірить рецепт протягом 5 хвилин" : "Pharmacist verifies prescription within 5 minutes" },
                { step: "3", text: isUk ? "Оберіть аптеку та оплатіть онлайн" : "Choose pharmacy and pay online" },
                { step: "4", text: isUk ? "Кур'єр доставить ліки протягом 1 години" : "Courier delivers medicines within 1 hour" },
              ].map((item) => (
                <div key={item.step} style={{ display: "flex", gap: "14px", marginBottom: "14px", alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: "28px", height: "28px", borderRadius: "50%",
                      background: BLUE, color: "#fff", display: "flex",
                      alignItems: "center", justifyContent: "center",
                      fontSize: "13px", fontWeight: 700, flexShrink: 0,
                    }}
                  >
                    {item.step}
                  </div>
                  <p style={{ fontSize: "14px", color: "#374151", lineHeight: 1.5, margin: 0 }}>{item.text}</p>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: "16px", padding: "14px 18px",
                background: "#FEF3C7", borderRadius: "12px",
                border: "1px solid #FCD34D",
                display: "flex", gap: "10px", alignItems: "flex-start",
              }}
            >
              <span style={{ fontSize: "18px" }}>⚠️</span>
              <p style={{ fontSize: "13px", color: "#92400E", margin: 0, lineHeight: 1.5 }}>
                {isUk
                  ? "Рецептурні препарати відпускаються тільки за наявності дійсного рецепта лікаря."
                  : "Prescription medications are dispensed only with a valid doctor's prescription."}
              </p>
            </div>
          </div>
        )}

        {/* CATALOG TAB */}
        {activeTab === "catalog" && (
          <div>
            <h2 style={{ fontSize: "22px", fontWeight: 700, color: DARK, marginBottom: "24px" }}>
              {isUk ? "Популярні препарати" : "Popular Medications"}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "16px" }}>
              {allDrugs.slice(0, 12).map((drug) => (
                <div
                  key={drug.id}
                  style={{
                    background: "#fff", borderRadius: "14px", padding: "18px",
                    border: `1px solid ${BLUE_SOFT}`,
                    boxShadow: "0 2px 8px rgba(37,99,235,0.06)",
                  }}
                >
                  <div
                    style={{
                      width: "44px", height: "44px", borderRadius: "12px",
                      background: LIGHT_BLUE, display: "flex", alignItems: "center",
                      justifyContent: "center", fontSize: "22px", marginBottom: "12px",
                    }}
                  >
                    💊
                  </div>
                  <h4 style={{ fontSize: "14px", fontWeight: 700, color: DARK, marginBottom: "4px" }}>{drug.name}</h4>
                  <p style={{ fontSize: "12px", color: "#6B7280", marginBottom: "4px" }}>{drug.generic}</p>
                  <p style={{ fontSize: "11px", color: "#9CA3AF", marginBottom: "14px" }}>{drug.form}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "18px", fontWeight: 800, color: BLUE }}>{drug.price}</span>
                    <button
                      onClick={() => handleOrder(drug.id)}
                      style={{
                        background: addedToCart.has(drug.id) ? "#16A34A" : BLUE,
                        color: "#fff", border: "none", borderRadius: "8px",
                        padding: "7px 12px", fontSize: "12px", fontWeight: 700, cursor: "pointer",
                      }}
                    >
                      {addedToCart.has(drug.id) ? "✓" : (isUk ? "Замовити" : "Order")}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stats Strip */}
        <div
          style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: "16px", marginTop: "40px",
          }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              style={{
                background: "#fff", borderRadius: "16px", padding: "20px",
                textAlign: "center", border: `1px solid ${BLUE_SOFT}`,
                boxShadow: "0 2px 8px rgba(37,99,235,0.06)",
              }}
            >
              <p style={{ fontSize: "30px", fontWeight: 800, color: BLUE, marginBottom: "4px" }}>
                {s.value}
                <span style={{ fontSize: "18px" }}>{s.unit}</span>
              </p>
              <p style={{ fontSize: "13px", color: "#6B7280" }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* App Download CTA */}
        <div
          style={{
            marginTop: "32px",
            background: `linear-gradient(135deg, ${BLUE} 0%, #1D4ED8 100%)`,
            borderRadius: "20px",
            padding: "32px",
            display: "flex",
            gap: "24px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: 1, minWidth: "200px" }}>
            <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#fff", marginBottom: "8px" }}>
              {isUk ? "Завантажте додаток PharmaGo" : "Download the PharmaGo App"}
            </h3>
            <p style={{ color: "#BFDBFE", fontSize: "14px", marginBottom: "20px" }}>
              {isUk ? "Замовляйте ліки ще швидше прямо зі смартфона" : "Order medicines even faster right from your smartphone"}
            </p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              {/* App Store badge mock */}
              <div
                style={{
                  background: "#000", borderRadius: "10px", padding: "10px 16px",
                  display: "flex", alignItems: "center", gap: "10px", cursor: "pointer",
                }}
              >
                <span style={{ fontSize: "22px" }}>🍎</span>
                <div>
                  <p style={{ color: "#9CA3AF", fontSize: "9px", margin: 0, lineHeight: 1 }}>
                    {isUk ? "Завантажити в" : "Download on the"}
                  </p>
                  <p style={{ color: "#fff", fontSize: "14px", fontWeight: 700, margin: 0 }}>App Store</p>
                </div>
              </div>
              {/* Google Play badge mock */}
              <div
                style={{
                  background: "#000", borderRadius: "10px", padding: "10px 16px",
                  display: "flex", alignItems: "center", gap: "10px", cursor: "pointer",
                }}
              >
                <span style={{ fontSize: "22px" }}>▶️</span>
                <div>
                  <p style={{ color: "#9CA3AF", fontSize: "9px", margin: 0, lineHeight: 1 }}>
                    {isUk ? "Доступно в" : "Get it on"}
                  </p>
                  <p style={{ color: "#fff", fontSize: "14px", fontWeight: 700, margin: 0 }}>Google Play</p>
                </div>
              </div>
            </div>
          </div>
          {/* Phone mockup */}
          <div
            style={{
              width: "100px", height: "180px",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "20px",
              border: "3px solid rgba(255,255,255,0.25)",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              gap: "8px", flexShrink: 0,
            }}
          >
            <div style={{ width: "30px", height: "4px", background: "rgba(255,255,255,0.4)", borderRadius: "2px" }} />
            <div
              style={{
                width: "70px", height: "110px", background: "#fff",
                borderRadius: "10px", display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: "6px",
              }}
            >
              <span style={{ fontSize: "24px" }}>💊</span>
              <p style={{ fontSize: "9px", fontWeight: 700, color: BLUE, margin: 0 }}>PharmaGo</p>
              <div style={{ width: "50px", height: "6px", background: BLUE_SOFT, borderRadius: "3px" }} />
              <div style={{ width: "40px", height: "6px", background: BLUE_SOFT, borderRadius: "3px" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Footer strip */}
      <div style={{ background: DARK, padding: "20px 32px", textAlign: "center" }}>
        <p style={{ color: "#93C5FD", fontSize: "13px", margin: 0 }}>
          {isUk
            ? "PharmaGo — ліки вчасно, завжди · Ліцензія МОЗ №12345 · Підтримка 24/7"
            : "PharmaGo — medicines on time, always · MOH License #12345 · Support 24/7"}
        </p>
      </div>
    </div>
  );
}
