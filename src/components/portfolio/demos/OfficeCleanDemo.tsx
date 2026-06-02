"use client";

import { useState } from "react";

export function OfficeCleanDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [activeService, setActiveService] = useState(0);
  const [slaView, setSlaView] = useState<"status" | "table" | "ring">("status");
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    objectType: "",
    area: "",
    floors: "",
    restrooms: "",
    frequency: "",
    specials: [] as string[],
    name: "",
    position: "",
    company: "",
    email: "",
    phone: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  /* ── Services data ── */
  const services = [
    {
      icon: "🏢",
      title: isUk ? "Щоденне прибирання офісів" : "Daily Office Cleaning",
      freq: isUk ? "Щодня, 6–8 ранку" : "Daily, 6–8 AM",
      staff: isUk ? "2–4 прибиральники" : "2–4 cleaners",
      sla: isUk ? "SLA 99.2% — або штраф" : "SLA 99.2% — or penalty",
      desc: isUk
        ? "Прибирання загальних зон, кухні, санвузлів та переговорних до початку робочого дня. Фотозвіт після кожного виїзду."
        : "Common areas, kitchen, restrooms and meeting rooms cleaned before business hours. Photo report after every visit.",
    },
    {
      icon: "🛍️",
      title: isUk ? "ТРЦ та рітейл" : "Mall / Retail Cleaning",
      freq: isUk ? "1–3 рази на день" : "1–3 times/day",
      staff: isUk ? "4–12 прибиральників" : "4–12 cleaners",
      sla: isUk ? "Реакція ≤ 15 хв" : "Response ≤ 15 min",
      desc: isUk
        ? "Обслуговування торгових залів, фудкортів, ескалаторів та паркінгів. Чергове прибирання у години роботи."
        : "Service of trading floors, food courts, escalators and parking areas. On-duty cleaning during operating hours.",
    },
    {
      icon: "🏭",
      title: isUk ? "Виробничі приміщення" : "Industrial Premises",
      freq: isUk ? "За графіком змін" : "Per shift schedule",
      staff: isUk ? "3–8 прибиральників" : "3–8 cleaners",
      sla: isUk ? "Допуск згідно інструктажу" : "Access per safety briefing",
      desc: isUk
        ? "Прибирання цехів, складів та технічних зон. Спецзасоби та сертифіковане обладнання для промислових забруднень."
        : "Workshops, warehouses and technical areas. Special agents and certified equipment for industrial soiling.",
    },
    {
      icon: "🔬",
      title: isUk ? "Генеральне прибирання" : "Scheduled Deep Cleaning",
      freq: isUk ? "Раз на місяць / квартал" : "Monthly / quarterly",
      staff: isUk ? "6–14 прибиральників" : "6–14 cleaners",
      sla: isUk ? "Акт виконаних робіт" : "Work completion act",
      desc: isUk
        ? "Глибоке чищення підлог, меблів, вентиляційних ґрат, плінтусів та важкодоступних зон. Знімаємо, відмиваємо, повертаємо."
        : "Deep cleaning of floors, furniture, vents, skirting boards and hard-to-reach areas. Disassemble, wash, reassemble.",
    },
    {
      icon: "🪟",
      title: isUk ? "Миття вікон і фасадів" : "Window & Facade Washing",
      freq: isUk ? "Сезонно або за заявкою" : "Seasonal or on request",
      staff: isUk ? "Промислові альпіністи" : "Industrial climbers",
      sla: isUk ? "Страхування + допуск" : "Insurance + permits",
      desc: isUk
        ? "Миття вікон зсередини та зовні, фасадне мийне від 2-го поверху. Власна команда альпіністів без посередників."
        : "Interior and exterior window cleaning, facade washing from 2nd floor up. Own rope access team, no subcontractors.",
    },
    {
      icon: "🧪",
      title: isUk ? "Дезінфекція та санітарія" : "Disinfection & Sanitation",
      freq: isUk ? "За потребою / регулярно" : "As needed / regularly",
      staff: isUk ? "Сертифіковані фахівці" : "Certified specialists",
      sla: isUk ? "Протокол обробки + акт" : "Treatment protocol + act",
      desc: isUk
        ? "Туманна та контактна дезінфекція. Хімія Ecolab — ДСТУ сертифікована. Підходить для харчових підприємств і медичних об'єктів."
        : "Fog and contact disinfection. Ecolab chemistry — DSTU certified. Suitable for food enterprises and medical facilities.",
    },
  ];

  /* ── SLA table rows ── */
  const slaRows = [
    { date: "25.03", object: isUk ? "Офіс A, 1200 м²" : "Office A, 1200 m²", status: isUk ? "Виконано" : "Done", time: "06:47", ok: true },
    { date: "26.03", object: isUk ? "ТРЦ Центр, 4500 м²" : "Mall Center, 4500 m²", status: isUk ? "Виконано" : "Done", time: "07:12", ok: true },
    { date: "27.03", object: isUk ? "БЦ Схід, 800 м²" : "BC East, 800 m²", status: isUk ? "Виконано" : "Done", time: "06:58", ok: true },
    { date: "28.03", object: isUk ? "Склад №3, 2100 м²" : "Warehouse #3, 2100 m²", status: isUk ? "Виконано" : "Done", time: "07:30", ok: true },
    { date: "29.03", object: isUk ? "Офіс B, 650 м²" : "Office B, 650 m²", status: isUk ? "В процесі" : "In Progress", time: "06:40", ok: false },
  ];

  /* ── Why Us benefits ── */
  const benefits = [
    {
      icon: "👷",
      title: isUk ? "Власний персонал" : "Own Staff",
      desc: isUk ? "Жодних субпідрядників. 100% наші прибиральники — навчені, перевірені, в уніформі." : "No subcontractors. 100% our cleaners — trained, vetted, uniformed.",
    },
    {
      icon: "🧴",
      title: isUk ? "Власна хімія" : "Own Chemistry",
      desc: isUk ? "Сертифіковані засоби Ecolab. Безпечно для людей, ефективно проти забруднень." : "Ecolab certified agents. Safe for people, effective against soiling.",
    },
    {
      icon: "🛡️",
      title: isUk ? "Страхування" : "Insurance",
      desc: isUk ? "Цивільна відповідальність до 1 000 000 грн. Шкода відшкодовується без судів." : "Civil liability up to 1,000,000 UAH. Damage compensated without court.",
    },
    {
      icon: "📊",
      title: isUk ? "SLA-гарантія" : "SLA Guarantee",
      desc: isUk ? "Закріплений рівень сервісу у договорі. Порушення SLA = фінансовий штраф на нашу користь клієнта." : "Fixed service level in contract. SLA breach = financial penalty in client's favour.",
    },
    {
      icon: "📋",
      title: isUk ? "Звітність" : "Reporting",
      desc: isUk ? "Фотозвіт після кожного виїзду. Щомісячний акт виконаних робіт. Особистий кабінет клієнта." : "Photo report after every visit. Monthly work completion act. Personal client cabinet.",
    },
    {
      icon: "🔒",
      title: isUk ? "NDA та конфіденційність" : "NDA & Confidentiality",
      desc: isUk ? "Угода про нерозголошення в стандартному пакеті. Персонал підписує NDA перед допуском на об'єкт." : "Non-disclosure agreement in standard package. Staff signs NDA before site access.",
    },
  ];

  /* ── Case studies ── */
  const cases = [
    {
      type: isUk ? "Бізнес-центр" : "Business Center",
      area: isUk ? "3 400 м², 9 поверхів" : "3,400 m², 9 floors",
      challenge: isUk ? "Попередній підрядник зривав графік 3 рази на місяць, штраф від орендарів." : "Previous contractor missed schedule 3x/month, tenant penalty clauses triggered.",
      solution: isUk ? "Ввели цілодобове чергове прибирання + фотозвіт кожні 2 години в денний час." : "Introduced 24/7 on-duty cleaning + photo report every 2 hours during daytime.",
      sla: "99.7%",
      period: isUk ? "6 місяців" : "6 months",
    },
    {
      type: isUk ? "ТРЦ" : "Shopping Mall",
      area: isUk ? "18 000 м², 3 поверхи" : "18,000 m², 3 floors",
      challenge: isUk ? "Фудкорт — постійне забруднення, скарги відвідувачів на стан санвузлів." : "Food court — constant soiling, visitor complaints about restroom condition.",
      solution: isUk ? "Виділили 2 спеціалістів виключно для санвузлів та фудкорту з 10:00 до 22:00." : "Dedicated 2 specialists exclusively to restrooms and food court from 10 AM to 10 PM.",
      sla: "99.4%",
      period: isUk ? "14 місяців" : "14 months",
    },
    {
      type: isUk ? "Виробничий склад" : "Production Warehouse",
      area: isUk ? "6 200 м², 1 поверх" : "6,200 m², 1 floor",
      challenge: isUk ? "Промисловий пил і мастила — звичайні засоби не справлялись, слизькі підлоги = ризики ОП." : "Industrial dust and lubricants — standard agents failed, slippery floors = H&S risk.",
      solution: isUk ? "Перейшли на промислову хімію Ecolab, мийна машина Kärcher + антиковзне покриття." : "Switched to Ecolab industrial chemistry, Kärcher scrubber + anti-slip treatment.",
      sla: "99.1%",
      period: isUk ? "8 місяців" : "8 months",
    },
  ];

  /* ── Form helpers ── */
  const objectTypes = [
    { value: "office", label: isUk ? "Офіс" : "Office" },
    { value: "mall", label: isUk ? "ТРЦ / Рітейл" : "Mall / Retail" },
    { value: "industrial", label: isUk ? "Виробництво" : "Industrial" },
    { value: "warehouse", label: isUk ? "Склад" : "Warehouse" },
  ];
  const frequencies = [
    { value: "daily", label: isUk ? "Щодня" : "Daily" },
    { value: "3xweek", label: isUk ? "3 рази на тиждень" : "3× per week" },
    { value: "weekly", label: isUk ? "Щотижнево" : "Weekly" },
    { value: "onetime", label: isUk ? "Разово" : "One-time" },
  ];
  const specialOptions = [
    isUk ? "Дезінфекція" : "Disinfection",
    isUk ? "Миття вікон" : "Window washing",
    isUk ? "Генеральне прибирання" : "Deep cleaning",
    isUk ? "Нічні виїзди" : "Night shifts",
    isUk ? "Прибирання після ремонту" : "Post-renovation cleaning",
    isUk ? "NDA обов'язковий" : "NDA required",
  ];

  function toggleSpecial(opt: string) {
    setFormData((prev) => ({
      ...prev,
      specials: prev.specials.includes(opt)
        ? prev.specials.filter((s) => s !== opt)
        : [...prev.specials, opt],
    }));
  }

  const totalSteps = 5;

  return (
    <div className="font-sans text-sm" style={{ color: "#1E3A5F" }}>
      {/* ── HERO ── */}
      <section
        className="relative flex flex-col md:flex-row min-h-[420px] overflow-hidden rounded-2xl mb-8"
        style={{ background: "#1E3A5F" }}
      >
        {/* Left: visual */}
        <div
          className="shrink-0 w-full md:w-[45%] min-h-[200px] md:min-h-[420px] relative flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #0c2340 0%, #1E3A5F 50%, #0EA5E9 100%)" }}
        >
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.15) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.15) 40px)" }}
          />
          <div className="relative z-10 flex flex-col items-center gap-4 p-6">
            <div className="w-24 h-24 rounded-2xl flex items-center justify-center text-5xl shadow-xl"
              style={{ background: "rgba(14,165,233,0.2)", border: "1.5px solid rgba(14,165,233,0.5)" }}>
              🏢
            </div>
            <div className="flex gap-3 flex-wrap justify-center">
              {["ISO 9001", "Ecolab", "SLA 99.2%"].map((b) => (
                <span key={b} className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ background: "rgba(14,165,233,0.18)", color: "#7dd3fc", border: "1px solid rgba(14,165,233,0.35)" }}>
                  {b}
                </span>
              ))}
            </div>
            {/* Client logo placeholders */}
            <div className="flex gap-3 mt-2 flex-wrap justify-center">
              {["Client A", "Client B", "Client C", "Client D"].map((c) => (
                <div key={c} className="w-14 h-8 rounded-md flex items-center justify-center text-[10px] font-bold"
                  style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" }}>
                  {c}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: text */}
        <div className="flex-1 flex flex-col justify-center p-8 md:p-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4 w-fit"
            style={{ background: "rgba(14,165,233,0.18)", color: "#38bdf8" }}>
            B2B • {isUk ? "Комерційне прибирання" : "Commercial Cleaning"}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold leading-tight text-white mb-4">
            {isUk
              ? "Бездоганна чистота для вашого бізнесу — щодня"
              : "Flawless Cleanliness for Your Business — Every Day"}
          </h1>
          <p className="mb-6 leading-relaxed" style={{ color: "#94a3b8" }}>
            {isUk
              ? "Аутсорсинг прибирання на умовах SLA для офісів, ТРЦ та бізнес-центрів. Фіксований рівень сервісу у договорі — або фінансова відповідальність на нашій стороні."
              : "Cleaning outsourcing on SLA terms for offices, malls and business centres. Fixed service level in contract — or financial liability on our side."}
          </p>

          {/* Trust row */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            {[
              { label: isUk ? "Корпоративних клієнтів" : "Corporate clients", value: "200+" },
              { label: "SLA", value: "99.2%" },
              { label: isUk ? "Власний персонал" : "Own staff", value: "100%" },
              { label: "ISO", value: "9001" },
            ].map((t) => (
              <div key={t.label} className="rounded-lg p-3"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div className="text-xl font-bold text-white">{t.value}</div>
                <div className="text-xs" style={{ color: "#64748b" }}>{t.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="px-5 py-2.5 rounded-xl font-semibold text-white text-sm transition-opacity hover:opacity-90"
              style={{ background: "#0EA5E9" }}>
              {isUk ? "Отримати комерційну пропозицію" : "Get Commercial Proposal"}
            </button>
            <button className="px-5 py-2.5 rounded-xl font-semibold text-sm transition-opacity hover:opacity-80"
              style={{ background: "rgba(255,255,255,0.09)", color: "#e2e8f0", border: "1px solid rgba(255,255,255,0.18)" }}>
              {isUk ? "Завантажити прайс-лист" : "Download Price List"}
            </button>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-1" style={{ color: "#1E3A5F" }}>
          {isUk ? "Послуги для бізнесу" : "Business Services"}
        </h2>
        <p className="text-xs mb-5" style={{ color: "#64748B" }}>
          {isUk ? "Натисніть на картку, щоб дізнатися деталі" : "Click a card to see details"}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
          {services.map((s, i) => (
            <button
              key={i}
              onClick={() => setActiveService(i)}
              className="rounded-xl p-4 text-left transition-all"
              style={{
                background: activeService === i ? "#1E3A5F" : "#f8fafc",
                border: `1.5px solid ${activeService === i ? "#0EA5E9" : "#e2e8f0"}`,
                color: activeService === i ? "#fff" : "#1E3A5F",
              }}
            >
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className="font-semibold text-xs leading-tight">{s.title}</div>
              <div className="text-xs mt-1 opacity-70">{s.freq}</div>
            </button>
          ))}
        </div>
        {/* Detail panel */}
        <div className="rounded-xl p-5" style={{ background: "#f0f9ff", border: "1.5px solid #bae6fd" }}>
          <div className="flex items-start gap-3">
            <span className="text-3xl shrink-0">{services[activeService].icon}</span>
            <div className="flex-1">
              <div className="font-bold text-base mb-1" style={{ color: "#1E3A5F" }}>{services[activeService].title}</div>
              <p className="text-xs leading-relaxed mb-3" style={{ color: "#475569" }}>{services[activeService].desc}</p>
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full font-medium"
                  style={{ background: "#dbeafe", color: "#1d4ed8" }}>
                  🕐 {services[activeService].freq}
                </span>
                <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full font-medium"
                  style={{ background: "#dcfce7", color: "#166534" }}>
                  👤 {services[activeService].staff}
                </span>
                <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full font-medium"
                  style={{ background: "#fef9c3", color: "#713f12" }}>
                  📋 {services[activeService].sla}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SLA DASHBOARD PREVIEW ── */}
      <section className="mb-8 rounded-2xl overflow-hidden" style={{ border: "1.5px solid #e2e8f0" }}>
        <div className="flex items-center justify-between px-5 py-3"
          style={{ background: "#1E3A5F" }}>
          <div className="flex items-center gap-2">
            <span className="text-lg">📊</span>
            <span className="font-bold text-white text-sm">
              {isUk ? "SLA-дашборд клієнта" : "Client SLA Dashboard"}
            </span>
          </div>
          <div className="flex gap-2">
            {(["status", "table", "ring"] as const).map((v) => (
              <button key={v} onClick={() => setSlaView(v)}
                className="px-3 py-1 rounded-lg text-xs font-medium transition-all"
                style={{
                  background: slaView === v ? "#0EA5E9" : "rgba(255,255,255,0.1)",
                  color: slaView === v ? "#fff" : "#94a3b8",
                }}>
                {v === "status" ? (isUk ? "Статус" : "Status") : v === "table" ? (isUk ? "Таблиця" : "Table") : (isUk ? "SLA" : "SLA")}
              </button>
            ))}
          </div>
        </div>

        <div className="p-5" style={{ background: "#f8fafc" }}>
          {slaView === "status" && (
            <div className="space-y-3">
              <div className="text-xs font-semibold mb-2" style={{ color: "#64748B" }}>
                {isUk ? "Сьогодні, 29 березня 2026" : "Today, March 29, 2026"}
              </div>
              {[
                { name: isUk ? "Офіс A — 1200 м²" : "Office A — 1200 m²", status: isUk ? "Виконано" : "Done", time: "06:47", color: "#16a34a", bg: "#dcfce7" },
                { name: isUk ? "БЦ Схід — 800 м²" : "BC East — 800 m²", status: isUk ? "Виконано" : "Done", time: "07:02", color: "#16a34a", bg: "#dcfce7" },
                { name: isUk ? "Офіс B — 650 м²" : "Office B — 650 m²", status: isUk ? "В процесі" : "In Progress", time: "06:40", color: "#d97706", bg: "#fef9c3" },
                { name: isUk ? "Склад №3 — 2100 м²" : "Warehouse #3 — 2100 m²", status: isUk ? "За розкладом" : "Scheduled", time: "20:00", color: "#64748b", bg: "#f1f5f9" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg px-4 py-3"
                  style={{ background: "#fff", border: "1px solid #e2e8f0" }}>
                  <span className="text-xs font-medium" style={{ color: "#1E3A5F" }}>{item.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs" style={{ color: "#94a3b8" }}>{item.time}</span>
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold"
                      style={{ background: item.bg, color: item.color }}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {slaView === "table" && (
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr style={{ color: "#64748B" }}>
                    <th className="text-left pb-2 font-medium">{isUk ? "Дата" : "Date"}</th>
                    <th className="text-left pb-2 font-medium">{isUk ? "Об'єкт" : "Object"}</th>
                    <th className="text-left pb-2 font-medium">{isUk ? "Час старту" : "Start time"}</th>
                    <th className="text-left pb-2 font-medium">{isUk ? "Статус" : "Status"}</th>
                  </tr>
                </thead>
                <tbody>
                  {slaRows.map((row, i) => (
                    <tr key={i} style={{ borderTop: "1px solid #f1f5f9" }}>
                      <td className="py-2 pr-3 text-xs" style={{ color: "#64748b" }}>{row.date}</td>
                      <td className="py-2 pr-3 font-medium" style={{ color: "#1E3A5F" }}>{row.object}</td>
                      <td className="py-2 pr-3" style={{ color: "#64748b" }}>{row.time}</td>
                      <td className="py-2">
                        <span className="px-2 py-0.5 rounded-full font-semibold"
                          style={{
                            background: row.ok ? "#dcfce7" : "#fef9c3",
                            color: row.ok ? "#16a34a" : "#d97706",
                          }}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {slaView === "ring" && (
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Ring visual */}
              <div className="shrink-0 relative w-36 h-36 flex items-center justify-center">
                <svg viewBox="0 0 36 36" className="w-36 h-36 -rotate-90">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#0EA5E9" strokeWidth="3"
                    strokeDasharray="99.4 0.6" strokeLinecap="round" />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-2xl font-bold" style={{ color: "#0EA5E9" }}>99.4%</span>
                  <span className="text-[10px]" style={{ color: "#64748b" }}>SLA</span>
                </div>
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span style={{ color: "#1E3A5F" }}>{isUk ? "Досягнуто" : "Achieved"}</span>
                    <span className="font-bold" style={{ color: "#0EA5E9" }}>99.4%</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: "#e2e8f0" }}>
                    <div className="h-2 rounded-full" style={{ width: "99.4%", background: "#0EA5E9" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span style={{ color: "#1E3A5F" }}>{isUk ? "Ціль за договором" : "Contract target"}</span>
                    <span className="font-bold" style={{ color: "#64748b" }}>99%</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: "#e2e8f0" }}>
                    <div className="h-2 rounded-full" style={{ width: "99%", background: "#94a3b8" }} />
                  </div>
                </div>
                <div className="rounded-lg p-3 mt-2" style={{ background: "#f0f9ff", border: "1px solid #bae6fd" }}>
                  <div className="text-xs font-semibold mb-1" style={{ color: "#0369a1" }}>
                    ✅ {isUk ? "SLA перевиконано на 0.4 п.п." : "SLA exceeded by 0.4 pp."}
                  </div>
                  <div className="text-xs" style={{ color: "#64748b" }}>
                    {isUk ? "Березень 2026 — 143 виїзди, 1 затримка > 15 хв" : "March 2026 — 143 visits, 1 delay > 15 min"}
                  </div>
                </div>
                <button className="w-full py-2 rounded-xl text-xs font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ background: "#1E3A5F" }}>
                  ⬇ {isUk ? "Завантажити акт виконаних робіт" : "Download work completion act"}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── CONTRACT REQUEST FORM ── */}
      <section className="mb-8 rounded-2xl overflow-hidden" style={{ border: "1.5px solid #e2e8f0" }}>
        <div className="px-5 py-4 flex items-center justify-between"
          style={{ background: "#0EA5E9" }}>
          <div>
            <div className="font-bold text-white text-sm">
              {isUk ? "Замовити комерційну пропозицію" : "Request Commercial Proposal"}
            </div>
            <div className="text-xs text-white opacity-80 mt-0.5">
              {isUk ? "КП протягом 24 годин" : "KP within 24 hours"}
            </div>
          </div>
          <div className="text-xs font-semibold px-3 py-1 rounded-full"
            style={{ background: "rgba(255,255,255,0.2)", color: "#fff" }}>
            {isUk ? `Крок ${formStep} з ${totalSteps}` : `Step ${formStep} of ${totalSteps}`}
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1" style={{ background: "#e2e8f0" }}>
          <div className="h-1 transition-all" style={{ width: `${(formStep / totalSteps) * 100}%`, background: "#0EA5E9" }} />
        </div>

        {!formSubmitted ? (
          <div className="p-5" style={{ background: "#f8fafc" }}>
            {formStep === 1 && (
              <div>
                <div className="font-semibold mb-3" style={{ color: "#1E3A5F" }}>
                  {isUk ? "Тип об'єкта" : "Object type"}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {objectTypes.map((o) => (
                    <button key={o.value} onClick={() => setFormData((p) => ({ ...p, objectType: o.value }))}
                      className="py-3 rounded-xl text-sm font-medium transition-all"
                      style={{
                        background: formData.objectType === o.value ? "#1E3A5F" : "#fff",
                        color: formData.objectType === o.value ? "#fff" : "#1E3A5F",
                        border: `1.5px solid ${formData.objectType === o.value ? "#0EA5E9" : "#e2e8f0"}`,
                      }}>
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {formStep === 2 && (
              <div className="space-y-4">
                <div className="font-semibold" style={{ color: "#1E3A5F" }}>
                  {isUk ? "Параметри об'єкта" : "Object parameters"}
                </div>
                {[
                  { key: "area", label: isUk ? "Площа, м²" : "Area, m²", placeholder: isUk ? "напр. 1200" : "e.g. 1200" },
                  { key: "floors", label: isUk ? "Кількість поверхів" : "Number of floors", placeholder: isUk ? "напр. 5" : "e.g. 5" },
                  { key: "restrooms", label: isUk ? "Кількість санвузлів" : "Number of restrooms", placeholder: isUk ? "напр. 8" : "e.g. 8" },
                ].map((f) => (
                  <div key={f.key}>
                    <label className="block text-xs font-medium mb-1" style={{ color: "#64748B" }}>{f.label}</label>
                    <input type="number" placeholder={f.placeholder}
                      value={formData[f.key as keyof typeof formData] as string}
                      onChange={(e) => setFormData((p) => ({ ...p, [f.key]: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                      style={{ background: "#fff", border: "1.5px solid #e2e8f0", color: "#1E3A5F" }} />
                  </div>
                ))}
              </div>
            )}

            {formStep === 3 && (
              <div>
                <div className="font-semibold mb-3" style={{ color: "#1E3A5F" }}>
                  {isUk ? "Частота прибирання" : "Cleaning frequency"}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {frequencies.map((f) => (
                    <button key={f.value} onClick={() => setFormData((p) => ({ ...p, frequency: f.value }))}
                      className="py-3 rounded-xl text-sm font-medium transition-all"
                      style={{
                        background: formData.frequency === f.value ? "#1E3A5F" : "#fff",
                        color: formData.frequency === f.value ? "#fff" : "#1E3A5F",
                        border: `1.5px solid ${formData.frequency === f.value ? "#0EA5E9" : "#e2e8f0"}`,
                      }}>
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {formStep === 4 && (
              <div>
                <div className="font-semibold mb-3" style={{ color: "#1E3A5F" }}>
                  {isUk ? "Додаткові вимоги" : "Special requirements"}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {specialOptions.map((opt) => (
                    <button key={opt} onClick={() => toggleSpecial(opt)}
                      className="py-2 px-3 rounded-xl text-xs font-medium text-left transition-all"
                      style={{
                        background: formData.specials.includes(opt) ? "#1E3A5F" : "#fff",
                        color: formData.specials.includes(opt) ? "#fff" : "#1E3A5F",
                        border: `1.5px solid ${formData.specials.includes(opt) ? "#0EA5E9" : "#e2e8f0"}`,
                      }}>
                      {formData.specials.includes(opt) ? "✓ " : ""}{opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {formStep === 5 && (
              <div className="space-y-3">
                <div className="font-semibold" style={{ color: "#1E3A5F" }}>
                  {isUk ? "Контактні дані" : "Contact information"}
                </div>
                {[
                  { key: "name", label: isUk ? "Ім'я та прізвище" : "Full name", placeholder: isUk ? "Іван Петренко" : "John Smith" },
                  { key: "position", label: isUk ? "Посада" : "Position", placeholder: isUk ? "Офіс-менеджер" : "Office Manager" },
                  { key: "company", label: isUk ? "Компанія" : "Company", placeholder: isUk ? "ТОВ Компанія" : "Ltd Company" },
                  { key: "email", label: "Email", placeholder: "office@company.com" },
                  { key: "phone", label: isUk ? "Телефон" : "Phone", placeholder: "+380 50 000 00 00" },
                ].map((f) => (
                  <div key={f.key}>
                    <label className="block text-xs font-medium mb-1" style={{ color: "#64748B" }}>{f.label}</label>
                    <input type="text" placeholder={f.placeholder}
                      value={formData[f.key as keyof typeof formData] as string}
                      onChange={(e) => setFormData((p) => ({ ...p, [f.key]: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                      style={{ background: "#fff", border: "1.5px solid #e2e8f0", color: "#1E3A5F" }} />
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-between mt-5">
              {formStep > 1 ? (
                <button onClick={() => setFormStep((s) => s - 1)}
                  className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
                  style={{ background: "#fff", color: "#64748b", border: "1.5px solid #e2e8f0" }}>
                  {isUk ? "← Назад" : "← Back"}
                </button>
              ) : <div />}
              {formStep < totalSteps ? (
                <button onClick={() => setFormStep((s) => s + 1)}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ background: "#0EA5E9" }}>
                  {isUk ? "Далі →" : "Next →"}
                </button>
              ) : (
                <button onClick={() => setFormSubmitted(true)}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ background: "#1E3A5F" }}>
                  {isUk ? "Надіслати заявку" : "Submit Request"}
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="p-8 flex flex-col items-center text-center gap-3" style={{ background: "#f8fafc" }}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
              style={{ background: "#dcfce7" }}>✅</div>
            <div className="font-bold text-base" style={{ color: "#1E3A5F" }}>
              {isUk ? "Заявку прийнято!" : "Request received!"}
            </div>
            <div className="text-xs" style={{ color: "#64748B" }}>
              {isUk
                ? "Наш менеджер зв'яжеться з вами протягом 24 годин з комерційною пропозицією."
                : "Our manager will contact you within 24 hours with a commercial proposal."}
            </div>
            <button onClick={() => { setFormSubmitted(false); setFormStep(1); }}
              className="mt-2 text-xs underline" style={{ color: "#0EA5E9" }}>
              {isUk ? "Подати ще одну заявку" : "Submit another request"}
            </button>
          </div>
        )}
      </section>

      {/* ── WHY US ── */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-1" style={{ color: "#1E3A5F" }}>
          {isUk ? "Чому обирають нас" : "Why Choose Us"}
        </h2>
        <p className="text-xs mb-5" style={{ color: "#64748B" }}>
          {isUk ? "6 причин довірити об'єкт нашій команді" : "6 reasons to trust your facility to our team"}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {benefits.map((b, i) => (
            <div key={i} className="rounded-xl p-4"
              style={{ background: "#f8fafc", border: "1.5px solid #e2e8f0" }}>
              <div className="text-2xl mb-2">{b.icon}</div>
              <div className="font-bold text-xs mb-1" style={{ color: "#1E3A5F" }}>{b.title}</div>
              <div className="text-xs leading-relaxed" style={{ color: "#64748B" }}>{b.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CASE STUDIES ── */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-1" style={{ color: "#1E3A5F" }}>
          {isUk ? "Кейси клієнтів" : "Case Studies"}
        </h2>
        <p className="text-xs mb-5" style={{ color: "#64748B" }}>
          {isUk ? "Знеособлені приклади — дані реальних об'єктів" : "Anonymised examples — real facility data"}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cases.map((c, i) => (
            <div key={i} className="rounded-xl overflow-hidden"
              style={{ border: "1.5px solid #e2e8f0" }}>
              <div className="px-4 py-3 flex items-center justify-between"
                style={{ background: "#1E3A5F" }}>
                <div>
                  <div className="font-bold text-white text-xs">{c.type}</div>
                  <div className="text-xs opacity-60 text-white">{c.area}</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold" style={{ color: "#0EA5E9" }}>{c.sla}</div>
                  <div className="text-[10px] text-white opacity-60">SLA</div>
                </div>
              </div>
              <div className="p-4 space-y-3" style={{ background: "#f8fafc" }}>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wide mb-1" style={{ color: "#94a3b8" }}>
                    {isUk ? "Завдання" : "Challenge"}
                  </div>
                  <div className="text-xs leading-relaxed" style={{ color: "#475569" }}>{c.challenge}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wide mb-1" style={{ color: "#94a3b8" }}>
                    {isUk ? "Рішення" : "Solution"}
                  </div>
                  <div className="text-xs leading-relaxed" style={{ color: "#475569" }}>{c.solution}</div>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <div className="px-2 py-0.5 rounded-full text-xs font-bold"
                    style={{ background: "#dcfce7", color: "#16a34a" }}>
                    SLA {c.sla}
                  </div>
                  <div className="text-xs" style={{ color: "#94a3b8" }}>{c.period}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="rounded-2xl px-6 py-5" style={{ background: "#1E3A5F" }}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="font-bold text-white text-base mb-1">OfficeClean Pro</div>
            <div className="text-xs" style={{ color: "#94a3b8" }}>
              {isUk
                ? "Комерційне прибирання на умовах SLA. Ліцензія №2847-КП. ISO 9001:2015."
                : "Commercial cleaning on SLA terms. Licence №2847-CP. ISO 9001:2015."}
            </div>
            <div className="text-xs mt-1" style={{ color: "#64748b" }}>
              {isUk ? "Київ, вул. Ділова 14, оф. 301" : "Kyiv, 14 Business St, office 301"}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-xs font-semibold" style={{ color: "#0EA5E9" }}>+38 (044) 200-30-40</div>
            <div className="text-xs" style={{ color: "#64748b" }}>office@officeclean.pro</div>
            <div className="flex gap-2 mt-2">
              {["ISO 9001", "Ecolab", "SLA"].map((b) => (
                <span key={b} className="px-2 py-0.5 rounded text-[10px] font-semibold"
                  style={{ background: "rgba(14,165,233,0.15)", color: "#38bdf8" }}>
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 pt-4 text-center text-[10px]" style={{ borderTop: "1px solid rgba(255,255,255,0.08)", color: "#64748b" }}>
          © 2026 OfficeClean Pro. {isUk ? "Всі права захищено." : "All rights reserved."}
        </div>
      </footer>
    </div>
  );
}
