"use client";
import { useState } from "react";
import { EmojiIcon } from "@/components/ui/EmojiIcon";

export function HopeUADemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [donationStep, setDonationStep] = useState(1);
  const [selectedAmount, setSelectedAmount] = useState(500);
  const [customAmount, setCustomAmount] = useState("");
  const [isMonthly, setIsMonthly] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState("medicine");
  const [selectedPayment, setSelectedPayment] = useState("visa");
  const [confirmed, setConfirmed] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const amounts = [100, 500, 1000, 5000];

  const programs = [
    {
      id: "medicine",
      en: "Medicine",
      uk: "Медицина",
      icon: "💊",
      descEn: "Medicines and medical equipment for hospitals",
      descUk: "Ліки та медичне обладнання для лікарень",
      audienceEn: "Wounded soldiers & civilians",
      audienceUk: "Поранені солдати та цивільні",
      collected: 1_240_000,
      needed: 2_000_000,
    },
    {
      id: "food",
      en: "Food",
      uk: "Їжа",
      icon: "🥫",
      descEn: "Food packages for displaced families",
      descUk: "Продовольчі набори для переміщених сімей",
      audienceEn: "IDPs & frontline communities",
      audienceUk: "ВПО та прифронтові громади",
      collected: 870_000,
      needed: 1_500_000,
    },
    {
      id: "clothing",
      en: "Clothing",
      uk: "Одяг",
      icon: "🧥",
      descEn: "Warm clothing and basic essentials",
      descUk: "Теплий одяг та базові речі першої необхідності",
      audienceEn: "Children & elderly in need",
      audienceUk: "Діти та люди похилого віку",
      collected: 430_000,
      needed: 800_000,
    },
    {
      id: "rebuild",
      en: "Rebuilding",
      uk: "Відновлення",
      icon: "🏗️",
      descEn: "Reconstruction of homes and community buildings",
      descUk: "Відновлення будинків та громадських споруд",
      audienceEn: "War-damaged communities",
      audienceUk: "Постраждалі від війни громади",
      collected: 3_100_000,
      needed: 5_000_000,
    },
    {
      id: "wherever",
      en: "Where needed most",
      uk: "Де потрібно найбільше",
      icon: "🎯",
      descEn: "Allocated to the most urgent current needs",
      descUk: "Спрямовується на найбільш нагальні потреби",
      audienceEn: "All affected Ukrainians",
      audienceUk: "Усі постраждалі українці",
      collected: 5_600_000,
      needed: 10_000_000,
    },
  ];

  const team = [
    {
      name: "Olena Kovalenko",
      roleEn: "Executive Director",
      roleUk: "Виконавчий директор",
      sinceEn: "Since 2022",
      sinceUk: "З 2022 року",
      emoji: "👩‍💼",
    },
    {
      name: "Dmytro Petrenko",
      roleEn: "Head of Logistics",
      roleUk: "Керівник логістики",
      sinceEn: "Since 2022",
      sinceUk: "З 2022 року",
      emoji: "👨‍🔧",
    },
    {
      name: "Iryna Savchenko",
      roleEn: "Medical Programs",
      roleUk: "Медичні програми",
      sinceEn: "Since 2023",
      sinceUk: "З 2023 року",
      emoji: "👩‍⚕️",
    },
    {
      name: "Vasyl Marchenko",
      roleEn: "Finance & Transparency",
      roleUk: "Фінанси та звітність",
      sinceEn: "Since 2023",
      sinceUk: "З 2023 року",
      emoji: "👨‍💻",
    },
  ];

  const howToHelp = [
    {
      icon: "💳",
      titleEn: "Donate",
      titleUk: "Задонатити",
      descEn: "One-time or monthly — every hryvnia matters",
      descUk: "Разово або щомісяця — кожна гривня важлива",
    },
    {
      icon: "🤝",
      titleEn: "Volunteer",
      titleUk: "Стати волонтером",
      descEn: "Join our field or remote volunteer team",
      descUk: "Приєднайся до польової або онлайн-команди",
    },
    {
      icon: "🏢",
      titleEn: "Corporate partnership",
      titleUk: "Корпоративне партнерство",
      descEn: "CSR programs and matched giving",
      descUk: "КСВ-програми та корпоративні внески",
    },
    {
      icon: "📦",
      titleEn: "Donate items",
      titleUk: "Передати речі",
      descEn: "Drop off at our collection points nationwide",
      descUk: "Здайте в пункти збору по всій країні",
    },
  ];

  const mediaLogos = ["BBC", "Reuters", "DW", "Ukrinform", "Suspilne", "RFE/RL"];

  const impactCounters = [
    { valueEn: "12,847", valueUk: "12 847", labelEn: "Families helped", labelUk: "Сімей отримали допомогу", color: "#1D4ED8" },
    { valueEn: "284,000 kg", valueUk: "284 000 кг", labelEn: "Food delivered", labelUk: "Їжі доставлено", color: "#EAB308" },
    { valueEn: "67,400", valueUk: "67 400", labelEn: "Medicines distributed", labelUk: "Ліків розподілено", color: "#F97316" },
    { valueEn: "4,200 m²", valueUk: "4 200 м²", labelEn: "Housing rebuilt", labelUk: "Житла відновлено", color: "#1D4ED8" },
  ];

  const getFinalAmount = () => {
    const custom = parseInt(customAmount, 10);
    return customAmount && !isNaN(custom) ? custom : selectedAmount;
  };

  const handleConfirm = () => {
    setConfirmed(true);
  };

  const resetDonation = () => {
    setConfirmed(false);
    setDonationStep(1);
    setCustomAmount("");
    setSelectedAmount(500);
    setIsMonthly(false);
    setSelectedProgram("medicine");
    setSelectedPayment("visa");
  };

  const selectedProgramData = programs.find((p) => p.id === selectedProgram)!;

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: "#FAFAFA", minHeight: "100vh" }}>
      {/* NAV */}
      <nav style={{ background: "#1D4ED8", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <EmojiIcon emoji="🤍" className="w-8 h-8" />
          <span style={{ color: "#fff", fontWeight: 800, fontSize: 20, letterSpacing: "-0.5px" }}>HopeUA</span>
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          {[isUk ? "Програми" : "Programs", isUk ? "Звіти" : "Reports", isUk ? "Команда" : "Team"].map((item) => (
            <span key={item} style={{ color: "rgba(255,255,255,0.85)", fontSize: 14, cursor: "pointer" }}>{item}</span>
          ))}
          <span style={{ background: "#EAB308", color: "#1C1C1E", padding: "6px 18px", borderRadius: 20, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
            {isUk ? "Допомогти" : "Donate"}
          </span>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ background: "linear-gradient(135deg, #1D4ED8 0%, #1e40af 50%, #1d3a7a 100%)", padding: "64px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0.06, backgroundImage: "radial-gradient(circle at 20% 50%, #EAB308 0%, transparent 50%), radial-gradient(circle at 80% 20%, #F97316 0%, transparent 40%)" }} />
        <div style={{ position: "relative", maxWidth: 720, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(234,179,8,0.2)", border: "1px solid rgba(234,179,8,0.4)", borderRadius: 20, padding: "6px 16px", marginBottom: 24 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#EAB308", display: "inline-block" }} />
            <span style={{ color: "#EAB308", fontSize: 13, fontWeight: 600 }}>
              {isUk ? "Офіційна благодійна організація · Реєстр НПО" : "Official Charity Foundation · NGO Registry"}
            </span>
          </div>
          <h1 style={{ color: "#fff", fontSize: 48, fontWeight: 900, lineHeight: 1.1, marginBottom: 20, letterSpacing: "-1px" }}>
            {isUk ? "Разом ми змінюємо життя" : "Together we change lives"}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 18, lineHeight: 1.6, marginBottom: 32 }}>
            {isUk
              ? "HopeUA допомагає українцям, постраждалим від війни, — медициною, їжею, одягом та відновленням житла."
              : "HopeUA supports war-affected Ukrainians with medicine, food, clothing and housing reconstruction."}
          </p>

          {/* Live counter */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 16, padding: "16px 32px", marginBottom: 32 }}>
            <EmojiIcon emoji="❤️" className="w-8 h-8" />
            <div>
              <div style={{ color: "#EAB308", fontSize: 32, fontWeight: 900, letterSpacing: "-1px" }}>12,847</div>
              <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 14 }}>
                {isUk ? "сімей отримали допомогу" : "families helped so far"}
              </div>
            </div>
            <div style={{ width: 1, height: 48, background: "rgba(255,255,255,0.2)", margin: "0 8px" }} />
            <div>
              <div style={{ color: "#EAB308", fontSize: 32, fontWeight: 900, letterSpacing: "-1px" }}>₴47M+</div>
              <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 14 }}>
                {isUk ? "зібрано та розподілено" : "raised & distributed"}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => document.getElementById("donation-widget")?.scrollIntoView({ behavior: "smooth" })}
              style={{ background: "#EAB308", color: "#1C1C1E", padding: "14px 32px", borderRadius: 12, fontSize: 16, fontWeight: 800, border: "none", cursor: "pointer" }}
            >
              {isUk ? "Задонатити зараз" : "Donate now"}
            </button>
            <button style={{ background: "transparent", color: "#fff", padding: "14px 32px", borderRadius: 12, fontSize: 16, fontWeight: 600, border: "2px solid rgba(255,255,255,0.4)", cursor: "pointer" }}>
              {isUk ? "Дізнатись більше" : "Learn more"}
            </button>
          </div>
        </div>
      </section>

      {/* IMPACT COUNTERS */}
      <section style={{ padding: "48px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: 28, fontWeight: 800, color: "#111", marginBottom: 8 }}>
            {isUk ? "Наш вплив у цифрах" : "Our impact in numbers"}
          </h2>
          <p style={{ textAlign: "center", color: "#6B7280", marginBottom: 36 }}>
            {isUk ? "Реальні результати з лютого 2022 року" : "Real results since February 2022"}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
            {impactCounters.map((counter) => (
              <div key={counter.labelEn} style={{ background: "#F9FAFB", borderRadius: 16, padding: "28px 20px", textAlign: "center", borderTop: `4px solid ${counter.color}` }}>
                <div style={{ fontSize: 36, fontWeight: 900, color: counter.color, marginBottom: 8 }}>
                  {isUk ? counter.valueUk : counter.valueEn}
                </div>
                <div style={{ color: "#374151", fontSize: 14, fontWeight: 600 }}>
                  {isUk ? counter.labelUk : counter.labelEn}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DONATION WIDGET */}
      <section id="donation-widget" style={{ padding: "48px 24px", background: "linear-gradient(135deg, #EFF6FF 0%, #FFF7ED 100%)" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: 28, fontWeight: 800, color: "#111", marginBottom: 8 }}>
            {isUk ? "Зробити внесок" : "Make a donation"}
          </h2>
          <p style={{ textAlign: "center", color: "#6B7280", marginBottom: 32, fontSize: 15 }}>
            {isUk ? "Ваша підтримка рятує життя щодня" : "Your support saves lives every day"}
          </p>

          {confirmed ? (
            <div style={{ background: "#fff", borderRadius: 20, padding: "48px 32px", textAlign: "center", boxShadow: "0 8px 40px rgba(29,78,216,0.12)", border: "2px solid #EAB308" }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
              <h3 style={{ fontSize: 24, fontWeight: 800, color: "#1D4ED8", marginBottom: 12 }}>
                {isUk ? "Дякуємо!" : "Thank you!"}
              </h3>
              <p style={{ color: "#374151", fontSize: 16, lineHeight: 1.6, marginBottom: 8 }}>
                {isUk
                  ? "Сертифікат донора буде надіслано на вашу електронну пошту."
                  : "Certificate of donor will be sent to your email."}
              </p>
              <p style={{ color: "#6B7280", fontSize: 14, marginBottom: 28 }}>
                {isUk ? `Ваш внесок: ₴${getFinalAmount().toLocaleString()} · ${isMonthly ? "Щомісяця" : "Разово"}` : `Your donation: ₴${getFinalAmount().toLocaleString()} · ${isMonthly ? "Monthly" : "One-time"}`}
              </p>
              <button onClick={resetDonation} style={{ background: "#1D4ED8", color: "#fff", padding: "12px 28px", borderRadius: 12, fontSize: 15, fontWeight: 700, border: "none", cursor: "pointer" }}>
                {isUk ? "Зробити ще один внесок" : "Make another donation"}
              </button>
            </div>
          ) : (
            <div style={{ background: "#fff", borderRadius: 20, padding: "32px", boxShadow: "0 8px 40px rgba(29,78,216,0.10)", border: "1px solid #E5E7EB" }}>
              {/* Step indicator */}
              <div style={{ display: "flex", gap: 8, marginBottom: 28, alignItems: "center", justifyContent: "center" }}>
                {[1, 2, 3].map((step) => (
                  <div key={step} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, background: donationStep >= step ? "#1D4ED8" : "#E5E7EB", color: donationStep >= step ? "#fff" : "#9CA3AF" }}>
                      {donationStep > step ? "✓" : step}
                    </div>
                    {step < 3 && <div style={{ width: 40, height: 2, background: donationStep > step ? "#1D4ED8" : "#E5E7EB" }} />}
                  </div>
                ))}
              </div>

              {/* STEP 1 */}
              {donationStep === 1 && (
                <div>
                  <h3 style={{ fontWeight: 700, fontSize: 17, color: "#111", marginBottom: 16 }}>
                    {isUk ? "Крок 1: Оберіть суму" : "Step 1: Select amount"}
                  </h3>
                  {/* Toggle one-time / monthly */}
                  <div style={{ display: "flex", background: "#F3F4F6", borderRadius: 10, padding: 4, marginBottom: 20 }}>
                    {[
                      { val: false, en: "One-time", uk: "Разово" },
                      { val: true, en: "Monthly", uk: "Щомісяця" },
                    ].map((opt) => (
                      <button
                        key={opt.en}
                        onClick={() => setIsMonthly(opt.val)}
                        style={{ flex: 1, padding: "8px 0", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 14, fontWeight: 600, background: isMonthly === opt.val ? "#1D4ED8" : "transparent", color: isMonthly === opt.val ? "#fff" : "#6B7280", transition: "all 0.2s" }}
                      >
                        {isUk ? opt.uk : opt.en}
                      </button>
                    ))}
                  </div>
                  {/* Amount grid */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 16 }}>
                    {amounts.map((amt) => (
                      <button
                        key={amt}
                        onClick={() => { setSelectedAmount(amt); setCustomAmount(""); }}
                        style={{ padding: "12px 4px", borderRadius: 10, border: `2px solid ${selectedAmount === amt && !customAmount ? "#1D4ED8" : "#E5E7EB"}`, background: selectedAmount === amt && !customAmount ? "#EFF6FF" : "#fff", color: selectedAmount === amt && !customAmount ? "#1D4ED8" : "#374151", fontWeight: 700, fontSize: 15, cursor: "pointer" }}
                      >
                        ₴{amt}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    placeholder={isUk ? "Інша сума, ₴" : "Custom amount, ₴"}
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: `2px solid ${customAmount ? "#1D4ED8" : "#E5E7EB"}`, fontSize: 15, outline: "none", boxSizing: "border-box" }}
                  />
                  <button
                    onClick={() => setDonationStep(2)}
                    style={{ width: "100%", marginTop: 20, background: "#1D4ED8", color: "#fff", padding: "14px", borderRadius: 12, fontSize: 16, fontWeight: 700, border: "none", cursor: "pointer" }}
                  >
                    {isUk ? "Далі →" : "Next →"}
                  </button>
                </div>
              )}

              {/* STEP 2 */}
              {donationStep === 2 && (
                <div>
                  <h3 style={{ fontWeight: 700, fontSize: 17, color: "#111", marginBottom: 16 }}>
                    {isUk ? "Крок 2: Оберіть програму" : "Step 2: Select program"}
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
                    {programs.map((prog) => (
                      <button
                        key={prog.id}
                        onClick={() => setSelectedProgram(prog.id)}
                        style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 12, border: `2px solid ${selectedProgram === prog.id ? "#1D4ED8" : "#E5E7EB"}`, background: selectedProgram === prog.id ? "#EFF6FF" : "#fff", cursor: "pointer", textAlign: "left" }}
                      >
                        <EmojiIcon emoji={prog.icon} className="w-8 h-8 shrink-0" />
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 14, color: "#111" }}>{isUk ? prog.uk : prog.en}</div>
                          <div style={{ fontSize: 12, color: "#6B7280" }}>{isUk ? prog.descUk : prog.descEn}</div>
                        </div>
                        {selectedProgram === prog.id && (
                          <span style={{ marginLeft: "auto", color: "#1D4ED8", fontWeight: 700, fontSize: 18 }}>✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <button onClick={() => setDonationStep(1)} style={{ flex: 1, padding: "12px", borderRadius: 12, border: "2px solid #E5E7EB", background: "#fff", color: "#374151", fontWeight: 600, cursor: "pointer", fontSize: 15 }}>
                      {isUk ? "← Назад" : "← Back"}
                    </button>
                    <button onClick={() => setDonationStep(3)} style={{ flex: 2, padding: "12px", borderRadius: 12, background: "#1D4ED8", color: "#fff", fontWeight: 700, border: "none", cursor: "pointer", fontSize: 15 }}>
                      {isUk ? "Далі →" : "Next →"}
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {donationStep === 3 && (
                <div>
                  <h3 style={{ fontWeight: 700, fontSize: 17, color: "#111", marginBottom: 16 }}>
                    {isUk ? "Крок 3: Оплата" : "Step 3: Payment"}
                  </h3>
                  {/* Summary */}
                  <div style={{ background: "#F9FAFB", borderRadius: 12, padding: "14px 16px", marginBottom: 20 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#374151", marginBottom: 6 }}>
                      <span>{isUk ? "Сума:" : "Amount:"}</span>
                      <span style={{ fontWeight: 700 }}>₴{getFinalAmount().toLocaleString()}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#374151", marginBottom: 6 }}>
                      <span>{isUk ? "Тип:" : "Type:"}</span>
                      <span style={{ fontWeight: 700 }}>{isUk ? (isMonthly ? "Щомісяця" : "Разово") : (isMonthly ? "Monthly" : "One-time")}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#374151" }}>
                      <span>{isUk ? "Програма:" : "Program:"}</span>
                      <span style={{ fontWeight: 700 }}>{isUk ? selectedProgramData.uk : selectedProgramData.en}</span>
                    </div>
                  </div>
                  {/* Payment methods */}
                  <p style={{ fontSize: 13, color: "#6B7280", marginBottom: 10 }}>{isUk ? "Спосіб оплати:" : "Payment method:"}</p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 20 }}>
                    {[
                      { id: "visa", label: "Visa", icon: "💳" },
                      { id: "mastercard", label: "MC", icon: "💳" },
                      { id: "liqpay", label: "LiqPay", icon: "🟠" },
                      { id: "swift", label: "SWIFT", icon: "🌐" },
                    ].map((pay) => (
                      <button
                        key={pay.id}
                        onClick={() => setSelectedPayment(pay.id)}
                        style={{ padding: "10px 4px", borderRadius: 10, border: `2px solid ${selectedPayment === pay.id ? "#1D4ED8" : "#E5E7EB"}`, background: selectedPayment === pay.id ? "#EFF6FF" : "#fff", cursor: "pointer", fontSize: 11, fontWeight: 700, color: selectedPayment === pay.id ? "#1D4ED8" : "#374151" }}
                      >
                        <div style={{ marginBottom: 2 }}><EmojiIcon emoji={pay.icon} className="w-5 h-5" /></div>
                        {pay.label}
                      </button>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <button onClick={() => setDonationStep(2)} style={{ flex: 1, padding: "12px", borderRadius: 12, border: "2px solid #E5E7EB", background: "#fff", color: "#374151", fontWeight: 600, cursor: "pointer", fontSize: 15 }}>
                      {isUk ? "← Назад" : "← Back"}
                    </button>
                    <button onClick={handleConfirm} style={{ flex: 2, padding: "12px", borderRadius: 12, background: "#EAB308", color: "#1C1C1E", fontWeight: 800, border: "none", cursor: "pointer", fontSize: 15 }}>
                      {isUk ? `Задонатити ₴${getFinalAmount().toLocaleString()}` : `Donate ₴${getFinalAmount().toLocaleString()}`}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ASSISTANCE PROGRAMS */}
      <section style={{ padding: "48px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: 28, fontWeight: 800, color: "#111", marginBottom: 8 }}>
            {isUk ? "Програми допомоги" : "Assistance programs"}
          </h2>
          <p style={{ textAlign: "center", color: "#6B7280", marginBottom: 36 }}>
            {isUk ? "Цільові напрямки, куди спрямовуються ваші кошти" : "Targeted areas where your funds go"}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {programs.slice(0, 4).map((prog) => {
              const pct = Math.round((prog.collected / prog.needed) * 100);
              return (
                <div key={prog.id} style={{ background: "#F9FAFB", borderRadius: 16, padding: "24px", border: "1px solid #E5E7EB" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                    <EmojiIcon emoji={prog.icon} className="w-8 h-8" />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 16, color: "#111" }}>{isUk ? prog.uk : prog.en}</div>
                      <div style={{ fontSize: 12, color: "#6B7280" }}>{isUk ? prog.audienceUk : prog.audienceEn}</div>
                    </div>
                  </div>
                  <p style={{ fontSize: 13, color: "#374151", marginBottom: 16, lineHeight: 1.5 }}>
                    {isUk ? prog.descUk : prog.descEn}
                  </p>
                  <div style={{ marginBottom: 8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#6B7280", marginBottom: 6 }}>
                      <span>{isUk ? "Зібрано" : "Collected"}: ₴{(prog.collected / 1000).toFixed(0)}K</span>
                      <span>{isUk ? "Ціль" : "Goal"}: ₴{(prog.needed / 1000).toFixed(0)}K</span>
                    </div>
                    <div style={{ height: 8, background: "#E5E7EB", borderRadius: 4, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg, #1D4ED8, #3B82F6)", borderRadius: 4 }} />
                    </div>
                    <div style={{ fontSize: 12, color: "#1D4ED8", fontWeight: 700, marginTop: 4 }}>{pct}%</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW TO HELP */}
      <section style={{ padding: "48px 24px", background: "#F9FAFB" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: 28, fontWeight: 800, color: "#111", marginBottom: 36 }}>
            {isUk ? "Як ви можете допомогти" : "How you can help"}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
            {howToHelp.map((item) => (
              <div key={item.titleEn} style={{ background: "#fff", borderRadius: 16, padding: "28px 20px", textAlign: "center", border: "1px solid #E5E7EB", cursor: "pointer", transition: "all 0.2s" }}>
                <div style={{ marginBottom: 12 }}><EmojiIcon emoji={item.icon} className="w-16 h-16" /></div>
                <div style={{ fontWeight: 700, fontSize: 16, color: "#111", marginBottom: 8 }}>
                  {isUk ? item.titleUk : item.titleEn}
                </div>
                <div style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.5 }}>
                  {isUk ? item.descUk : item.descEn}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRANSPARENCY */}
      <section style={{ padding: "48px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: 28, fontWeight: 800, color: "#111", marginBottom: 8 }}>
            {isUk ? "Прозорість та звітність" : "Transparency & Reporting"}
          </h2>
          <p style={{ textAlign: "center", color: "#6B7280", marginBottom: 40 }}>
            {isUk ? "Ми публікуємо щомісячні фінансові звіти" : "We publish monthly financial reports"}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "center" }}>
            {/* SVG Pie Chart */}
            <div style={{ textAlign: "center" }}>
              <svg viewBox="0 0 200 200" style={{ width: 200, height: 200, margin: "0 auto", display: "block" }}>
                {/* 80% direct aid — #1D4ED8, starts at top (-90deg = -π/2) */}
                <circle cx="100" cy="100" r="70" fill="none" stroke="#1D4ED8" strokeWidth="40" strokeDasharray="351.86 87.96" strokeDashoffset="0" transform="rotate(-90 100 100)" />
                {/* 15% logistics — #EAB308 */}
                <circle cx="100" cy="100" r="70" fill="none" stroke="#EAB308" strokeWidth="40" strokeDasharray="65.97 373.85" strokeDashoffset="-351.86" transform="rotate(-90 100 100)" />
                {/* 5% admin — #F97316 */}
                <circle cx="100" cy="100" r="70" fill="none" stroke="#F97316" strokeWidth="40" strokeDasharray="21.99 417.83" strokeDashoffset="-417.83" transform="rotate(-90 100 100)" />
                <circle cx="100" cy="100" r="50" fill="#fff" />
                <text x="100" y="96" textAnchor="middle" fontSize="20" fontWeight="900" fill="#1D4ED8">80%</text>
                <text x="100" y="114" textAnchor="middle" fontSize="10" fill="#6B7280">{isUk ? "на допомогу" : "direct aid"}</text>
              </svg>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16 }}>
                {[
                  { color: "#1D4ED8", en: "80% Direct aid", uk: "80% Пряма допомога" },
                  { color: "#EAB308", en: "15% Logistics", uk: "15% Логістика" },
                  { color: "#F97316", en: "5% Administration", uk: "5% Адміністрування" },
                ].map((item) => (
                  <div key={item.en} style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
                    <div style={{ width: 12, height: 12, borderRadius: 3, background: item.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: "#374151" }}>{isUk ? item.uk : item.en}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Reports */}
            <div>
              <h3 style={{ fontWeight: 700, fontSize: 18, color: "#111", marginBottom: 16 }}>
                {isUk ? "Щомісячні звіти" : "Monthly reports"}
              </h3>
              {["2026-02", "2026-01", "2025-12", "2025-11"].map((month) => (
                <div key={month} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: "#F9FAFB", borderRadius: 10, marginBottom: 8, border: "1px solid #E5E7EB" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <EmojiIcon emoji="📄" className="w-5 h-5" />
                    <span style={{ fontSize: 14, fontWeight: 600, color: "#111" }}>{isUk ? `Звіт ${month}` : `Report ${month}`}</span>
                  </div>
                  <span style={{ fontSize: 12, color: "#1D4ED8", fontWeight: 600, cursor: "pointer" }}>PDF ↓</span>
                </div>
              ))}
              <div style={{ marginTop: 16, padding: "12px 16px", background: "#EFF6FF", borderRadius: 10, border: "1px solid #BFDBFE" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#1D4ED8" }}>✓ {isUk ? "Аудит PwC Ukraine 2025" : "PwC Ukraine Audit 2025"}</div>
                <div style={{ fontSize: 12, color: "#3B82F6", marginTop: 2 }}>{isUk ? "Перевірено та підтверджено" : "Verified and confirmed"}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section style={{ padding: "48px 24px", background: "#F9FAFB" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: 28, fontWeight: 800, color: "#111", marginBottom: 36 }}>
            {isUk ? "Наша команда" : "Our team"}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
            {team.map((member) => (
              <div key={member.name} style={{ background: "#fff", borderRadius: 16, padding: "24px 20px", textAlign: "center", border: "1px solid #E5E7EB" }}>
                <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg, #1D4ED8, #3B82F6)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                  <EmojiIcon emoji={member.emoji} className="w-14 h-14" />
                </div>
                <div style={{ fontWeight: 700, fontSize: 16, color: "#111", marginBottom: 4 }}>{member.name}</div>
                <div style={{ fontSize: 13, color: "#1D4ED8", fontWeight: 600, marginBottom: 4 }}>
                  {isUk ? member.roleUk : member.roleEn}
                </div>
                <div style={{ fontSize: 12, color: "#9CA3AF" }}>
                  {isUk ? member.sinceUk : member.sinceEn}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEDIA STRIP */}
      <section style={{ padding: "32px 24px", background: "#fff", borderTop: "1px solid #E5E7EB" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ textAlign: "center", fontSize: 13, color: "#9CA3AF", marginBottom: 20, textTransform: "uppercase", letterSpacing: 1 }}>
            {isUk ? "Про нас пишуть" : "As seen in"}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "center", alignItems: "center" }}>
            {mediaLogos.map((logo) => (
              <div key={logo} style={{ padding: "8px 20px", background: "#F3F4F6", borderRadius: 8, fontSize: 14, fontWeight: 800, color: "#6B7280", letterSpacing: 0.5 }}>
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section style={{ background: "#1D4ED8", padding: "48px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <h2 style={{ color: "#fff", fontSize: 28, fontWeight: 800, marginBottom: 12 }}>
            {isUk ? "Україна потребує вас сьогодні" : "Ukraine needs you today"}
          </h2>
          <p style={{ color: "rgba(255,255,255,0.75)", marginBottom: 24, fontSize: 15 }}>
            {isUk ? "Кожна гривня — це конкретна допомога конкретній людині" : "Every hryvnia is direct help to a real person"}
          </p>
          <button
            onClick={resetDonation}
            style={{ background: "#EAB308", color: "#1C1C1E", padding: "14px 36px", borderRadius: 12, fontSize: 16, fontWeight: 800, border: "none", cursor: "pointer" }}
          >
            {isUk ? "Допомогти зараз" : "Help now"}
          </button>
        </div>
      </section>
    </div>
  );
}
