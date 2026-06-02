"use client";

import { useState } from "react";

const ANIMALS = [
  {
    emoji: "🐱",
    nameEn: "Peanut",
    nameUk: "Арахіс",
    species: "cat" as const,
    age: "baby" as const,
    ageLabel: "4 months",
    ageLabelUk: "4 місяці",
    waiting: 12,
    temp: "calm" as const,
    storyEn: "Little Peanut was found in a cardboard box near a supermarket on a rainy November night. He was cold, hungry, and scared — but his tiny purr never stopped. He loves being wrapped in a blanket and watching birds from the window.",
    storyUk: "Маленький Арахіс був знайдений у картонній коробці біля супермаркету дощовим листопадом. Він був холодний, голодний і наляканий — але його маленьке муркотіння ніколи не вщухало. Обожнює загортатися в ковдру та спостерігати за птахами з вікна.",
    vaccinated: true, neutered: false, chipped: true,
    traits: ["Gentle", "Quiet", "Lap cat"],
    traitsUk: ["Ласкавий", "Тихий", "Сидить на руках"],
  },
  {
    emoji: "🐶",
    nameEn: "Bruno",
    nameUk: "Бруно",
    species: "dog" as const,
    age: "adult" as const,
    ageLabel: "3 years",
    ageLabelUk: "3 роки",
    waiting: 47,
    temp: "active" as const,
    storyEn: "Bruno was surrendered when his family moved abroad. He is trained, healthy, and brimming with joy. He knows sit, stay, paw, and roll over. Needs daily walks and gives unconditional love in return.",
    storyUk: "Бруно був переданий, коли його сім'я виїхала за кордон. Він вихований, здоровий і сповнений радості. Знає команди сидіти, стояти, лапу і перекинутися. Потребує щоденних прогулянок і дарує безумовну любов у відповідь.",
    vaccinated: true, neutered: true, chipped: true,
    traits: ["Trained", "Energetic", "Great with kids"],
    traitsUk: ["Вихований", "Енергійний", "Добре з дітьми"],
  },
  {
    emoji: "🐱",
    nameEn: "Luna",
    nameUk: "Луна",
    species: "cat" as const,
    age: "young" as const,
    ageLabel: "1.5 years",
    ageLabelUk: "1.5 роки",
    waiting: 29,
    temp: "calm" as const,
    storyEn: "Luna is a silver tabby with soulful green eyes. She was rescued from an abandoned building in winter. Shy at first, but once she trusts you she will follow you everywhere and talk to you in soft chirps.",
    storyUk: "Луна — сіра смугаста кішечка з виразними зеленими очима. Її врятували із закинутої будівлі взимку. Спочатку сором'язлива, але коли вона вам довіряє — ходить за вами скрізь і спілкується тихими цвірінками.",
    vaccinated: true, neutered: true, chipped: false,
    traits: ["Shy at first", "Very affectionate", "Indoor cat"],
    traitsUk: ["Спочатку сором'язлива", "Дуже ласкава", "Домашня"],
  },
  {
    emoji: "🐶",
    nameEn: "Mango",
    nameUk: "Манго",
    species: "dog" as const,
    age: "baby" as const,
    ageLabel: "5 months",
    ageLabelUk: "5 місяців",
    waiting: 8,
    temp: "active" as const,
    storyEn: "Mango is a golden bundle of chaos and love. Found with his litter on the roadside, he is the boldest of the bunch. He needs a patient family ready to invest in training — and he will reward you tenfold.",
    storyUk: "Манго — золотий клубок хаосу та любові. Знайдений разом з пометом на узбіччі дороги, він найсміливіший з усіх. Потребує терплячої родини, готової вкласти зусилля в дресуру — і він відплатить вам сторицею.",
    vaccinated: true, neutered: false, chipped: true,
    traits: ["Playful", "Bold", "Needs training"],
    traitsUk: ["Грайливий", "Сміливий", "Потребує дресури"],
  },
  {
    emoji: "🐱",
    nameEn: "Oliver",
    nameUk: "Олівер",
    species: "cat" as const,
    age: "senior" as const,
    ageLabel: "9 years",
    ageLabelUk: "9 років",
    waiting: 91,
    temp: "calm" as const,
    storyEn: "Oliver is an old gentleman who lost his owner to illness. He is calm, house-trained, and deeply bonded with humans. He sleeps 18 hours a day but gives the most meaningful cuddles of any cat we have known.",
    storyUk: "Олівер — старий джентльмен, який втратив свого господаря через хворобу. Він спокійний, привчений до дому і глибоко прив'язаний до людей. Спить 18 годин на день, але дарує найзначущіші обійми з усіх котів, яких ми знали.",
    vaccinated: true, neutered: true, chipped: true,
    traits: ["Peaceful", "Very bonded", "Low energy"],
    traitsUk: ["Спокійний", "Дуже прив'язаний", "Мало енергії"],
  },
  {
    emoji: "🐶",
    nameEn: "Stella",
    nameUk: "Стелла",
    species: "dog" as const,
    age: "young" as const,
    ageLabel: "2 years",
    ageLabelUk: "2 роки",
    waiting: 34,
    temp: "kids" as const,
    storyEn: "Stella is pure sunshine. She was rescued from a neglectful situation and has blossomed into a confident, joyful dog who adores children. She is house-trained and gets along beautifully with other dogs.",
    storyUk: "Стелла — чисте сонце. Її врятували з недбалих рук, і вона розквітла в впевнену, радісну собаку, яка обожнює дітей. Вона привчена до дому і чудово ладить з іншими собаками.",
    vaccinated: true, neutered: true, chipped: true,
    traits: ["Loves children", "Social", "House-trained"],
    traitsUk: ["Любить дітей", "Товариська", "Привчена до дому"],
  },
  {
    emoji: "🐱",
    nameEn: "Mochi",
    nameUk: "Мочі",
    species: "cat" as const,
    age: "young" as const,
    ageLabel: "8 months",
    ageLabelUk: "8 місяців",
    waiting: 19,
    temp: "active" as const,
    storyEn: "Mochi is a tortoiseshell firecracker. She was the only survivor of her litter and has developed a fierce will to live and play. She will entertain you endlessly with her acrobatics and strong opinions.",
    storyUk: "Мочі — черепашева петарда. Вона була єдиним вижившим з свого помету і виробила неймовірну волю до життя та гри. Вона безкінечно розважатиме вас своєю акробатикою та рішучими думками.",
    vaccinated: true, neutered: false, chipped: true,
    traits: ["Feisty", "Playful", "Independent"],
    traitsUk: ["Запальна", "Грайлива", "Незалежна"],
  },
  {
    emoji: "🐶",
    nameEn: "Rex",
    nameUk: "Рекс",
    species: "dog" as const,
    age: "senior" as const,
    ageLabel: "8 years",
    ageLabelUk: "8 років",
    waiting: 63,
    temp: "calm" as const,
    storyEn: "Rex served as a security dog for seven years before the company closed. He is gentle, obedient, and grateful for every kindness shown. Senior dogs make the most loyal companions — Rex will prove it every single day.",
    storyUk: "Рекс служив охоронним собакою сім років до закриття компанії. Він лагідний, слухняний і вдячний за кожну проявлену доброту. Старші собаки стають найвірнішими компаньйонами — Рекс доводитиме це щодня.",
    vaccinated: true, neutered: true, chipped: true,
    traits: ["Obedient", "Loyal", "Calm"],
    traitsUk: ["Слухняний", "Вірний", "Спокійний"],
  },
];

const DONATION_PURPOSES_EN = ["Food & nutrition", "Veterinary care", "Neutering program", "Where needed most"];
const DONATION_PURPOSES_UK = ["Корм та харчування", "Ветеринарна допомога", "Програма стерилізації", "Де найбільше потрібно"];

const PIE_SLICES = [
  { pct: 60, color: "#0D9488", labelEn: "Food 60%", labelUk: "Корм 60%" },
  { pct: 25, color: "#F59E0B", labelEn: "Vet 25%", labelUk: "Вет. допомога 25%" },
  { pct: 10, color: "#6EE7B7", labelEn: "Neutering 10%", labelUk: "Стерилізація 10%" },
  { pct: 5, color: "#FCD34D", labelEn: "Admin 5%", labelUk: "Адмін 5%" },
];

function buildPieSegments() {
  const cx = 80, cy = 80, r = 70;
  let cumulative = 0;
  return PIE_SLICES.map((slice) => {
    const startAngle = (cumulative / 100) * 2 * Math.PI - Math.PI / 2;
    cumulative += slice.pct;
    const endAngle = (cumulative / 100) * 2 * Math.PI - Math.PI / 2;
    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);
    const large = slice.pct > 50 ? 1 : 0;
    return { d: `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`, color: slice.color };
  });
}

const PIE_SEGMENTS = buildPieSegments();

export function PawFundDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [speciesFilter, setSpeciesFilter] = useState<"all" | "cat" | "dog">("all");
  const [ageFilter, setAgeFilter] = useState<"all" | "baby" | "young" | "adult" | "senior">("all");
  const [tempFilter, setTempFilter] = useState<"all" | "active" | "calm" | "kids">("all");
  const [selectedAnimal, setSelectedAnimal] = useState<number | null>(null);
  const [donationAmt, setDonationAmt] = useState<number | null>(100);
  const [customAmt, setCustomAmt] = useState("");
  const [donationType, setDonationType] = useState<"once" | "monthly">("once");
  const [donationPurpose, setDonationPurpose] = useState(0);
  const [donationDone, setDonationDone] = useState(false);
  const [fosterForm, setFosterForm] = useState({ name: "", phone: "", housing: "", experience: "" });
  const [fosterSent, setFosterSent] = useState(false);

  const colors = {
    teal: "#0D9488",
    tealDark: "#0A7A6F",
    tealLight: "#CCFBF1",
    orange: "#F59E0B",
    orangeLight: "#FEF3C7",
    bg: "#FFFBF7",
    card: "#FFFFFF",
    muted: "#6B7280",
    border: "#E5E7EB",
    text: "#1F2937",
  };

  const filtered = ANIMALS.filter((a) => {
    if (speciesFilter !== "all" && a.species !== speciesFilter) return false;
    if (ageFilter !== "all" && a.age !== ageFilter) return false;
    if (tempFilter !== "all" && a.temp !== tempFilter) return false;
    return true;
  });

  const animal = selectedAnimal !== null ? ANIMALS[selectedAnimal] : null;

  const purposes = isUk ? DONATION_PURPOSES_UK : DONATION_PURPOSES_EN;

  const effectiveAmt = donationAmt ?? (parseInt(customAmt) || 0);
  const impactText = () => {
    if (effectiveAmt >= 500) return isUk ? "Оплачує ветеринарний огляд для 2 тварин" : "Covers a vet check-up for 2 animals";
    if (effectiveAmt >= 300) return isUk ? "Забезпечує корм на місяць для 3 котів" : "Feeds 3 cats for a full month";
    if (effectiveAmt >= 100) return isUk ? "Забезпечує 10 днів корму для однієї тварини" : "Provides 10 days of food for one animal";
    return isUk ? "Кожна гривня важлива!" : "Every hryvnia matters!";
  };

  return (
    <div style={{ background: colors.bg, fontFamily: "'Inter', 'Segoe UI', sans-serif", color: colors.text }}>
      {/* Hero */}
      <section
        style={{
          background: `linear-gradient(135deg, ${colors.teal} 0%, #0f766e 100%)`,
          padding: "64px 24px 52px",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ fontSize: 13, letterSpacing: 3, color: "#6EE7B7", marginBottom: 16, textTransform: "uppercase" }}>
            PawFund
          </div>
          <h1 style={{ fontSize: 40, fontWeight: 800, lineHeight: 1.2, margin: "0 0 16px" }}>
            {isUk ? "Кожна пухнаста душа заслуговує на дім" : "Every fluffy soul deserves a home"}
          </h1>
          <p style={{ fontSize: 17, color: "#A7F3D0", lineHeight: 1.7, marginBottom: 28 }}>
            {isUk
              ? "Ми рятуємо, лікуємо та знаходимо люблячі сім'ї для бездомних котів і собак по всій Україні."
              : "We rescue, heal, and find loving families for homeless cats and dogs across Ukraine."}
          </p>
          {/* Live counter */}
          <div
            style={{
              background: "rgba(255,255,255,0.12)",
              borderRadius: 16,
              padding: "16px 24px",
              display: "inline-block",
              marginBottom: 32,
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <span style={{ color: "#FEF3C7", fontWeight: 700, fontSize: 16 }}>
              {isUk ? "Зараз у порятунку:" : "Currently in rescue:"}
            </span>{" "}
            <span style={{ fontWeight: 800, fontSize: 18, color: "#FCD34D" }}>47 {isUk ? "котів" : "cats"}</span>
            {" + "}
            <span style={{ fontWeight: 800, fontSize: 18, color: "#FCD34D" }}>23 {isUk ? "собаки" : "dogs"}</span>
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => setDonationDone(false)}
              style={{
                background: colors.orange,
                color: "#fff",
                border: "none",
                borderRadius: 12,
                padding: "14px 32px",
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              {isUk ? "💛 Допомогти" : "💛 Donate"}
            </button>
            <button
              style={{
                background: "rgba(255,255,255,0.15)",
                color: "#fff",
                border: "2px solid rgba(255,255,255,0.5)",
                borderRadius: 12,
                padding: "14px 28px",
                fontSize: 15,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              {isUk ? "🐾 Взяти тварину" : "🐾 Adopt a pet"}
            </button>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div
        style={{
          background: colors.orange,
          padding: "14px 24px",
          textAlign: "center",
          color: "#fff",
          fontSize: 14,
          fontWeight: 600,
        }}
      >
        🏠 {isUk ? "Цього місяця 34 тварини знайшли домівку" : "This month 34 animals found homes"} &nbsp;•&nbsp;
        💉 {isUk ? "182 вакцинації проведено" : "182 vaccinations given"} &nbsp;•&nbsp;
        ✂️ {isUk ? "57 стерилізацій" : "57 neutering procedures"}
      </div>

      {/* Adoption Catalog */}
      <section style={{ padding: "56px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: colors.text, marginBottom: 8 }}>
          {isUk ? "Знайдіть свого компаньйона" : "Find Your Companion"}
        </h2>
        <p style={{ color: colors.muted, marginBottom: 32, fontSize: 15 }}>
          {isUk ? "Кожен з них мріє про вас" : "Every one of them is dreaming of you"}
        </p>

        {/* Filters */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 32 }}>
          {/* Species */}
          <div style={{ display: "flex", gap: 4, background: colors.border, borderRadius: 10, padding: 3 }}>
            {(["all", "cat", "dog"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setSpeciesFilter(f)}
                style={{
                  background: speciesFilter === f ? colors.teal : "transparent",
                  color: speciesFilter === f ? "#fff" : colors.muted,
                  border: "none",
                  borderRadius: 8,
                  padding: "8px 16px",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "all 0.2s",
                }}
              >
                {f === "all" ? isUk ? "Всі" : "All" : f === "cat" ? isUk ? "🐱 Коти" : "🐱 Cats" : isUk ? "🐶 Собаки" : "🐶 Dogs"}
              </button>
            ))}
          </div>
          {/* Age */}
          <div style={{ display: "flex", gap: 4, background: colors.border, borderRadius: 10, padding: 3 }}>
            {(["all", "baby", "young", "adult", "senior"] as const).map((f) => {
              const labels: Record<string, string> = { all: isUk ? "Будь-який вік" : "Any age", baby: isUk ? "Малюк" : "Baby", young: isUk ? "Молодий" : "Young", adult: isUk ? "Дорослий" : "Adult", senior: isUk ? "Старший" : "Senior" };
              return (
                <button
                  key={f}
                  onClick={() => setAgeFilter(f)}
                  style={{
                    background: ageFilter === f ? colors.orange : "transparent",
                    color: ageFilter === f ? "#fff" : colors.muted,
                    border: "none",
                    borderRadius: 8,
                    padding: "8px 14px",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "all 0.2s",
                  }}
                >
                  {labels[f]}
                </button>
              );
            })}
          </div>
          {/* Temperament */}
          <div style={{ display: "flex", gap: 4, background: colors.border, borderRadius: 10, padding: 3 }}>
            {(["all", "active", "calm", "kids"] as const).map((f) => {
              const labels: Record<string, string> = { all: isUk ? "Темперамент" : "Temperament", active: isUk ? "Активний" : "Active", calm: isUk ? "Спокійний" : "Calm", kids: isUk ? "З дітьми" : "Good with kids" };
              return (
                <button
                  key={f}
                  onClick={() => setTempFilter(f)}
                  style={{
                    background: tempFilter === f ? "#7C3AED" : "transparent",
                    color: tempFilter === f ? "#fff" : colors.muted,
                    border: "none",
                    borderRadius: 8,
                    padding: "8px 14px",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "all 0.2s",
                  }}
                >
                  {labels[f]}
                </button>
              );
            })}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px 24px", color: colors.muted, fontSize: 16 }}>
            {isUk ? "Немає тварин за цими фільтрами. Спробуйте інші!" : "No animals match these filters. Try different ones!"}
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20 }}>
            {filtered.map((a, idx) => {
              const globalIdx = ANIMALS.indexOf(a);
              return (
                <div
                  key={globalIdx}
                  style={{
                    background: colors.card,
                    borderRadius: 20,
                    overflow: "hidden",
                    border: `1px solid ${colors.border}`,
                    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                >
                  {/* Photo area */}
                  <div
                    style={{
                      background: a.species === "cat" ? "#FFF0F6" : "#EFF6FF",
                      height: 120,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 60,
                      position: "relative",
                    }}
                  >
                    {a.emoji}
                    <span
                      style={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        background: colors.orange,
                        color: "#fff",
                        borderRadius: 20,
                        padding: "3px 10px",
                        fontSize: 11,
                        fontWeight: 700,
                      }}
                    >
                      {isUk ? `Чекає ${a.waiting} днів` : `Waiting ${a.waiting} days`}
                    </span>
                  </div>
                  <div style={{ padding: "16px 16px 20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                      <div style={{ fontWeight: 800, fontSize: 17, color: colors.text }}>
                        {isUk ? a.nameUk : a.nameEn}
                      </div>
                      <span
                        style={{
                          background: a.species === "cat" ? "#FFF0F6" : "#EFF6FF",
                          color: a.species === "cat" ? "#BE185D" : "#1D4ED8",
                          fontSize: 11,
                          fontWeight: 700,
                          borderRadius: 6,
                          padding: "2px 8px",
                        }}
                      >
                        {a.species === "cat" ? isUk ? "Кіт" : "Cat" : isUk ? "Пес" : "Dog"}
                      </span>
                    </div>
                    <div style={{ fontSize: 13, color: colors.muted, marginBottom: 12 }}>
                      {isUk ? a.ageLabelUk : a.ageLabel}
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 14 }}>
                      {(isUk ? a.traitsUk : a.traits).map((t, ti) => (
                        <span
                          key={ti}
                          style={{
                            background: colors.tealLight,
                            color: colors.tealDark,
                            borderRadius: 6,
                            padding: "2px 8px",
                            fontSize: 11,
                            fontWeight: 600,
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => setSelectedAnimal(globalIdx)}
                      style={{
                        width: "100%",
                        background: colors.teal,
                        color: "#fff",
                        border: "none",
                        borderRadius: 10,
                        padding: "10px",
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: "pointer",
                        fontFamily: "inherit",
                        transition: "background 0.2s",
                      }}
                    >
                      {isUk ? "🐾 Познайомитися" : "🐾 Meet me"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Animal Modal */}
      {animal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
          }}
          onClick={() => setSelectedAnimal(null)}
        >
          <div
            style={{
              background: colors.card,
              borderRadius: 24,
              maxWidth: 560,
              width: "100%",
              padding: "32px 28px",
              position: "relative",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedAnimal(null)}
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                background: colors.border,
                border: "none",
                borderRadius: "50%",
                width: 32,
                height: 32,
                cursor: "pointer",
                fontSize: 16,
                fontFamily: "inherit",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ✕
            </button>
            <div style={{ textAlign: "center", fontSize: 72, marginBottom: 12 }}>{animal.emoji}</div>
            <h3 style={{ textAlign: "center", fontSize: 26, fontWeight: 800, color: colors.text, margin: "0 0 4px" }}>
              {isUk ? animal.nameUk : animal.nameEn}
            </h3>
            <p style={{ textAlign: "center", color: colors.muted, fontSize: 14, marginBottom: 20 }}>
              {isUk ? animal.ageLabelUk : animal.ageLabel} &nbsp;•&nbsp;
              {animal.species === "cat" ? isUk ? "Кіт" : "Cat" : isUk ? "Пес" : "Dog"}
            </p>
            <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.7, marginBottom: 20 }}>
              {isUk ? animal.storyUk : animal.storyEn}
            </p>
            {/* Status chips */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
              {[
                { key: "vaccinated", labelEn: "Vaccinated", labelUk: "Вакцинований" },
                { key: "neutered", labelEn: "Neutered", labelUk: "Стерилізований" },
                { key: "chipped", labelEn: "Microchipped", labelUk: "Чіпований" },
              ].map(({ key, labelEn, labelUk }) => {
                const active = animal[key as "vaccinated" | "neutered" | "chipped"];
                return (
                  <span
                    key={key}
                    style={{
                      background: active ? colors.tealLight : "#F3F4F6",
                      color: active ? colors.tealDark : colors.muted,
                      borderRadius: 20,
                      padding: "6px 14px",
                      fontSize: 13,
                      fontWeight: 600,
                    }}
                  >
                    {active ? "✓" : "✗"} {isUk ? labelUk : labelEn}
                  </span>
                );
              })}
            </div>
            <button
              style={{
                width: "100%",
                background: colors.orange,
                color: "#fff",
                border: "none",
                borderRadius: 12,
                padding: "14px",
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              {isUk ? "💛 Подати заявку на усиновлення" : "💛 Apply to Adopt"}
            </button>
          </div>
        </div>
      )}

      {/* Donation Section */}
      <section style={{ background: `linear-gradient(135deg, ${colors.tealLight} 0%, ${colors.orangeLight} 100%)`, padding: "56px 24px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: 28, fontWeight: 800, color: colors.text, marginBottom: 8 }}>
            {isUk ? "Ваша допомога рятує життя" : "Your Donation Saves Lives"}
          </h2>
          <p style={{ textAlign: "center", color: colors.muted, marginBottom: 36, fontSize: 15 }}>
            {isUk ? "Навіть маленький внесок має значення кожного дня" : "Even a small contribution matters every single day"}
          </p>

          {donationDone ? (
            <div style={{ background: "#fff", borderRadius: 20, padding: 40, textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🐾💛</div>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: colors.teal, margin: "0 0 8px" }}>
                {isUk ? "Дякуємо за вашу доброту!" : "Thank you for your kindness!"}
              </h3>
              <p style={{ color: colors.muted, fontSize: 15 }}>
                {isUk ? `${effectiveAmt} грн підуть безпосередньо на допомогу тваринам.` : `${effectiveAmt} UAH will go directly to help animals.`}
              </p>
            </div>
          ) : (
            <div style={{ background: "#fff", borderRadius: 20, padding: "32px 28px" }}>
              {/* One-time / Monthly */}
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
                <div style={{ background: colors.border, borderRadius: 10, padding: 3, display: "flex", gap: 4 }}>
                  {(["once", "monthly"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setDonationType(t)}
                      style={{
                        background: donationType === t ? colors.teal : "transparent",
                        color: donationType === t ? "#fff" : colors.muted,
                        border: "none",
                        borderRadius: 8,
                        padding: "10px 24px",
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: "pointer",
                        fontFamily: "inherit",
                        transition: "all 0.2s",
                      }}
                    >
                      {t === "once" ? isUk ? "Разово" : "One-time" : isUk ? "Щомісяця" : "Monthly"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount shortcuts */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginBottom: 16 }}>
                {[50, 100, 300, 500].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => { setDonationAmt(amt); setCustomAmt(""); }}
                    style={{
                      background: donationAmt === amt ? colors.orange : colors.orangeLight,
                      color: donationAmt === amt ? "#fff" : "#92400E",
                      border: "none",
                      borderRadius: 10,
                      padding: "12px 20px",
                      fontSize: 15,
                      fontWeight: 700,
                      cursor: "pointer",
                      fontFamily: "inherit",
                      transition: "all 0.2s",
                    }}
                  >
                    {amt} ₴
                  </button>
                ))}
                <input
                  type="number"
                  placeholder={isUk ? "Інша сума" : "Custom"}
                  value={customAmt}
                  onChange={(e) => { setCustomAmt(e.target.value); setDonationAmt(null); }}
                  style={{
                    width: 100,
                    padding: "12px 14px",
                    borderRadius: 10,
                    border: `2px solid ${donationAmt === null && customAmt ? colors.orange : colors.border}`,
                    fontSize: 14,
                    fontFamily: "inherit",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Impact text */}
              <div
                style={{
                  background: colors.tealLight,
                  borderRadius: 10,
                  padding: "12px 16px",
                  fontSize: 14,
                  color: colors.tealDark,
                  fontWeight: 600,
                  textAlign: "center",
                  marginBottom: 20,
                }}
              >
                💚 {impactText()}
              </div>

              {/* Purpose */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 13, color: colors.muted, marginBottom: 10, fontWeight: 600 }}>
                  {isUk ? "Призначення:" : "Purpose:"}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {purposes.map((p, i) => (
                    <button
                      key={i}
                      onClick={() => setDonationPurpose(i)}
                      style={{
                        background: donationPurpose === i ? colors.teal : "#F9FAFB",
                        color: donationPurpose === i ? "#fff" : colors.muted,
                        border: `1px solid ${donationPurpose === i ? colors.teal : colors.border}`,
                        borderRadius: 8,
                        padding: "8px 14px",
                        fontSize: 13,
                        cursor: "pointer",
                        fontFamily: "inherit",
                        fontWeight: 600,
                        transition: "all 0.2s",
                      }}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setDonationDone(true)}
                style={{
                  width: "100%",
                  background: colors.orange,
                  color: "#fff",
                  border: "none",
                  borderRadius: 12,
                  padding: "16px",
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                {isUk ? `💛 Задонатити ${effectiveAmt || "..."}  ₴` : `💛 Donate ${effectiveAmt || "..."} UAH`}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Transparency Pie */}
      <section style={{ padding: "56px 24px", maxWidth: 860, margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", fontSize: 28, fontWeight: 800, color: colors.text, marginBottom: 8 }}>
          {isUk ? "Як ми витрачаємо кошти" : "How We Spend Funds"}
        </h2>
        <p style={{ textAlign: "center", color: colors.muted, marginBottom: 40, fontSize: 15 }}>
          {isUk ? "Повна прозорість — ви маєте право знати" : "Full transparency — you deserve to know"}
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 48, flexWrap: "wrap" }}>
          <svg width="160" height="160" viewBox="0 0 160 160">
            {PIE_SEGMENTS.map((seg, i) => (
              <path key={i} d={seg.d} fill={seg.color} />
            ))}
          </svg>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {PIE_SLICES.map((slice, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 16, height: 16, borderRadius: 4, background: slice.color, flexShrink: 0 }} />
                <span style={{ fontSize: 15, fontWeight: 600, color: colors.text }}>
                  {isUk ? slice.labelUk : slice.labelEn}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Foster Family */}
      <section style={{ background: colors.tealLight, padding: "56px 24px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: 28, fontWeight: 800, color: colors.text, marginBottom: 8 }}>
            {isUk ? "Стати тимчасовою сім'єю" : "Become a Foster Family"}
          </h2>
          <p style={{ textAlign: "center", color: colors.muted, marginBottom: 12, fontSize: 15 }}>
            {isUk
              ? "Тимчасовий дім = шанс на усиновлення. Ви не мусите тримати тварину назавжди — але ваша турбота рятує їх."
              : "A temporary home = a chance for adoption. You don't have to keep them forever — but your care saves them."}
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 14, marginBottom: 36 }}>
            {[
              { icon: "🏠", en: "All equipment provided", uk: "Все обладнання надається" },
              { icon: "💊", en: "Vet care fully covered", uk: "Ветеринарна допомога повністю покривається" },
              { icon: "📞", en: "24/7 team support", uk: "Підтримка команди 24/7" },
              { icon: "💛", en: "Help choose the adopter", uk: "Допомагаєте обрати майбутнього хазяїна" },
            ].map((b, i) => (
              <div
                key={i}
                style={{
                  background: "#fff",
                  borderRadius: 14,
                  padding: "16px 14px",
                  textAlign: "center",
                  border: `1px solid ${colors.border}`,
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 8 }}>{b.icon}</div>
                <div style={{ fontSize: 13, color: colors.text, fontWeight: 600 }}>{isUk ? b.uk : b.en}</div>
              </div>
            ))}
          </div>

          {fosterSent ? (
            <div style={{ background: "#fff", borderRadius: 20, padding: 40, textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🐾</div>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: colors.teal, margin: "0 0 8px" }}>
                {isUk ? "Дякуємо! Ми зв'яжемося з вами найближчим часом." : "Thank you! We'll reach out very soon."}
              </h3>
            </div>
          ) : (
            <div style={{ background: "#fff", borderRadius: 20, padding: "28px 24px" }}>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: colors.text, marginBottom: 20 }}>
                {isUk ? "Заявка на тимчасовий догляд" : "Foster Application"}
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 14, marginBottom: 14 }}>
                {[
                  { key: "name", label: isUk ? "Ваше ім'я" : "Your name", type: "text" },
                  { key: "phone", label: isUk ? "Телефон" : "Phone", type: "tel" },
                  { key: "housing", label: isUk ? "Тип житла" : "Housing type (house/apt)", type: "text" },
                  { key: "experience", label: isUk ? "Досвід з тваринами" : "Experience with pets", type: "text" },
                ].map(({ key, label, type }) => (
                  <div key={key}>
                    <label style={{ fontSize: 12, color: colors.muted, display: "block", marginBottom: 6 }}>{label}</label>
                    <input
                      type={type}
                      value={fosterForm[key as keyof typeof fosterForm]}
                      onChange={(e) => setFosterForm((f) => ({ ...f, [key]: e.target.value }))}
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        borderRadius: 8,
                        border: `1px solid ${colors.border}`,
                        fontSize: 14,
                        fontFamily: "inherit",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={() => setFosterSent(true)}
                style={{
                  background: colors.teal,
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  padding: "12px 28px",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                {isUk ? "Надіслати заявку" : "Submit Application"}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Footer CTA */}
      <section
        style={{
          background: colors.teal,
          padding: "48px 24px",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <div style={{ fontSize: 40, marginBottom: 12 }}>🐾</div>
        <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 10 }}>
          {isUk ? "Разом ми можемо більше" : "Together we can do more"}
        </h2>
        <p style={{ color: "#A7F3D0", fontSize: 15, marginBottom: 24 }}>
          {isUk ? "Поширте наш сайт — кожен репост може привести тваринку до її домівки." : "Share our site — every repost can bring an animal to its home."}
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            style={{ background: "#fff", color: colors.teal, border: "none", borderRadius: 12, padding: "12px 28px", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
          >
            {isUk ? "Поширити" : "Share"}
          </button>
          <button
            style={{ background: colors.orange, color: "#fff", border: "none", borderRadius: 12, padding: "12px 28px", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
          >
            {isUk ? "💛 Допомогти зараз" : "💛 Donate Now"}
          </button>
        </div>
      </section>
    </div>
  );
}
