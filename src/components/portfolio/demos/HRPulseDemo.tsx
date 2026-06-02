"use client";
import { useState } from "react";

type SortKey = "name" | "department" | "salary";
type SortDir = "asc" | "desc";

const EMPLOYEES = [
  { id: 1, initials: "OB", name: "Olena Bondarenko", position: "HR Manager", department: "HR", status: "Active", salary: 42000 },
  { id: 2, initials: "DK", name: "Dmytro Kovalenko", position: "Software Engineer", department: "Tech", status: "Active", salary: 85000 },
  { id: 3, initials: "IV", name: "Iryna Vasylenko", position: "Accountant", department: "Finance", status: "On leave", salary: 38000 },
  { id: 4, initials: "MS", name: "Mykola Savchenko", position: "Product Manager", department: "Product", status: "Active", salary: 72000 },
  { id: 5, initials: "AH", name: "Anna Holovatenko", position: "Designer", department: "Design", status: "Probation", salary: 45000 },
  { id: 6, initials: "VP", name: "Vasyl Petrenko", position: "DevOps Engineer", department: "Tech", status: "Active", salary: 90000 },
  { id: 7, initials: "NK", name: "Natalia Kravchenko", position: "Marketing Lead", department: "Marketing", status: "Active", salary: 55000 },
  { id: 8, initials: "RM", name: "Roman Moroz", position: "Sales Manager", department: "Sales", status: "On leave", salary: 48000 },
];

const AVATAR_COLORS: Record<string, string> = {
  HR: "#0D9488",
  Tech: "#2563EB",
  Finance: "#D97706",
  Product: "#7C3AED",
  Design: "#DB2777",
  Marketing: "#EA580C",
  Sales: "#16A34A",
};

const STATUS_CONFIG: Record<string, { bg: string; color: string; label: string; labelUk: string }> = {
  Active: { bg: "#DCFCE7", color: "#15803D", label: "Active", labelUk: "Активний" },
  "On leave": { bg: "#FEF9C3", color: "#A16207", label: "On leave", labelUk: "У відпустці" },
  Probation: { bg: "#DBEAFE", color: "#1D4ED8", label: "Probation", labelUk: "Випробування" },
};

const FEATURES = [
  { icon: "👤", title: "Employee records", titleUk: "Картки співробітників" },
  { icon: "💰", title: "Payroll calculation", titleUk: "Розрахунок зарплати" },
  { icon: "🏖", title: "Leave management", titleUk: "Управління відпустками" },
  { icon: "🏢", title: "Org chart", titleUk: "Організаційна схема" },
  { icon: "📊", title: "Reports", titleUk: "Звіти та аналітика" },
  { icon: "⚖️", title: "KZpP compliance", titleUk: "Відповідність КЗпП" },
];

export function HRPulseDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [showModal, setShowModal] = useState(false);
  const [annual, setAnnual] = useState(false);

  const [newName, setNewName] = useState("");
  const [newPosition, setNewPosition] = useState("");
  const [newDept, setNewDept] = useState("");
  const [newSalary, setNewSalary] = useState("");
  const [employees, setEmployees] = useState(EMPLOYEES);

  const plans = [
    {
      name: "Starter",
      price: 499,
      priceAnnual: 399,
      limit: isUk ? "до 10 співробітників" : "up to 10 employees",
      features: [isUk ? "Картки" : "Records", isUk ? "Розрахунок" : "Payroll", isUk ? "Відпустки" : "Leave"],
    },
    {
      name: "Business",
      price: 1499,
      priceAnnual: 1199,
      limit: isUk ? "10–100 співробітників" : "10–100 employees",
      features: [isUk ? "Все у Starter" : "All Starter", isUk ? "Орг схема" : "Org chart", isUk ? "Звіти" : "Reports"],
    },
    {
      name: "Enterprise",
      price: 0,
      priceAnnual: 0,
      limit: isUk ? "Індивідуально" : "Custom",
      features: [isUk ? "Все у Business" : "All Business", "SLA", isUk ? "Виділений менеджер" : "Dedicated manager"],
    },
  ];

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
  };

  const filtered = [...employees]
    .filter((e) => e.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const av: string | number = sortKey === "salary" ? a.salary : sortKey === "name" ? a.name : a.department;
      const bv: string | number = sortKey === "salary" ? b.salary : sortKey === "name" ? b.name : b.department;
      if (typeof av === "string" && typeof bv === "string") {
        return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
      }
      return sortDir === "asc" ? (av as number) - (bv as number) : (bv as number) - (av as number);
    });

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    const initials = newName.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
    setEmployees((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        initials,
        name: newName,
        position: newPosition,
        department: newDept || "HR",
        status: "Probation",
        salary: parseInt(newSalary) || 0,
      },
    ]);
    setNewName(""); setNewPosition(""); setNewDept(""); setNewSalary("");
    setShowModal(false);
  };

  const thStyle: React.CSSProperties = {
    padding: "12px 16px",
    textAlign: "left",
    fontSize: 12,
    color: "#0D9488",
    fontWeight: 700,
    cursor: "pointer",
    userSelect: "none",
    whiteSpace: "nowrap",
  };

  const tdStyle: React.CSSProperties = { padding: "14px 16px", fontSize: 14, verticalAlign: "middle" };

  const inputStyle: React.CSSProperties = {
    background: "#F0FDFA",
    border: "1px solid #99F6E4",
    borderRadius: 8,
    padding: "10px 14px",
    fontSize: 14,
    color: "#0F3835",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  };

  const activeCount = employees.filter((e) => e.status === "Active").length;
  const onLeaveCount = employees.filter((e) => e.status === "On leave").length;

  return (
    <div style={{ background: "#FAFCFC", color: "#0F3835", fontFamily: "'Inter', sans-serif", minHeight: "100vh" }}>
      {/* NAV */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #CCFBF1", padding: "0 24px" }} className="flex items-center justify-between h-16">
        <span style={{ fontWeight: 800, fontSize: 20 }}>
          <span style={{ color: "#0D9488" }}>HR</span><span style={{ color: "#0F3835" }}>Pulse</span>
        </span>
        <div className="hidden md:flex gap-6 text-sm" style={{ color: "#64748B" }}>
          {[isUk ? "Функції" : "Features", isUk ? "Тарифи" : "Pricing", isUk ? "Інтеграції" : "Integrations"].map((l) => (
            <span key={l} style={{ cursor: "pointer" }}>{l}</span>
          ))}
        </div>
        <button style={{ background: "#0D9488", color: "#fff", borderRadius: 8, padding: "8px 18px", fontWeight: 700, fontSize: 13, border: "none", cursor: "pointer" }}>
          {isUk ? "Спробувати безкоштовно" : "Try free"}
        </button>
      </nav>

      {/* HERO */}
      <section style={{ padding: "64px 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center", maxWidth: 1000, margin: "0 auto" }}>
        <div>
          <div style={{ display: "inline-block", background: "#CCFBF1", borderRadius: 100, padding: "4px 14px", fontSize: 11, color: "#0D9488", fontWeight: 700, marginBottom: 20, letterSpacing: 0.5 }}>
            {isUk ? "HR & РОЗРАХУНОК ЗАРПЛАТИ" : "HR & PAYROLL SAAS"}
          </div>
          <h1 style={{ fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 800, lineHeight: 1.15, marginBottom: 16, color: "#0F3835" }}>
            {isUk ? "HR та зарплата — без Excel та помилок" : "HR & Payroll — without Excel and mistakes"}
          </h1>
          <p style={{ color: "#5EAAA0", fontSize: 16, marginBottom: 28, lineHeight: 1.6 }}>
            {isUk ? "Автоматизуйте кадровий облік і нарахування зарплат у кілька кліків." : "Automate HR records and payroll in a few clicks."}
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button style={{ background: "#0D9488", color: "#fff", borderRadius: 8, padding: "12px 24px", fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer" }}>
              {isUk ? "Безкоштовно 30 днів" : "Free 30 days"}
            </button>
            <button style={{ background: "transparent", border: "1px solid #0D9488", color: "#0D9488", borderRadius: 8, padding: "12px 24px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
              {isUk ? "Дивитись демо" : "Watch demo"}
            </button>
          </div>
        </div>
        {/* Mock browser */}
        <div style={{ background: "#fff", border: "1px solid #CCFBF1", borderRadius: 12, overflow: "hidden", boxShadow: "0 8px 32px rgba(13,148,136,0.1)" }}>
          <div style={{ background: "#F0FDFA", borderBottom: "1px solid #CCFBF1", padding: "10px 16px", display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FCA5A5" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FDE68A" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#86EFAC" }} />
            <div style={{ flex: 1, background: "#CCFBF1", borderRadius: 4, height: 20, marginLeft: 8 }} />
          </div>
          <div style={{ padding: 16 }}>
            <div style={{ display: "flex", gap: 12, justifyContent: "space-between", marginBottom: 12 }}>
              {[
                { v: activeCount, l: isUk ? "Активних" : "Active" },
                { v: employees.length, l: isUk ? "Всього" : "Total" },
                { v: onLeaveCount, l: isUk ? "У відпустці" : "On leave" },
              ].map((s) => (
                <div key={s.l} style={{ background: "#F0FDFA", borderRadius: 8, padding: "10px 16px", textAlign: "center", flex: 1 }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: "#0D9488" }}>{s.v}</div>
                  <div style={{ fontSize: 11, color: "#5EAAA0" }}>{s.l}</div>
                </div>
              ))}
            </div>
            <div style={{ position: "relative", height: 6, background: "#F0FDFA", borderRadius: 3 }}>
              <div style={{ position: "absolute", inset: 0, width: `${(activeCount / employees.length) * 100}%`, background: "#0D9488", borderRadius: 3 }} />
            </div>
            <div style={{ fontSize: 11, color: "#5EAAA0", marginTop: 6, textAlign: "right" }}>
              {Math.round((activeCount / employees.length) * 100)}% {isUk ? "активних" : "active"}
            </div>
          </div>
        </div>
      </section>

      {/* EMPLOYEE TABLE */}
      <section style={{ background: "#F0FDFA", padding: "64px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0F3835" }}>
              {isUk ? "Список співробітників" : "Employee List"}{" "}
              <span style={{ color: "#0D9488", fontSize: 16 }}>({filtered.length})</span>
            </h2>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={isUk ? "Пошук..." : "Search..."} style={{ ...inputStyle, width: 200 }} />
              <button onClick={() => setShowModal(true)} style={{ background: "#0D9488", color: "#fff", border: "none", borderRadius: 8, padding: "10px 18px", fontWeight: 700, fontSize: 13, cursor: "pointer", whiteSpace: "nowrap" }}>
                + {isUk ? "Додати" : "Add employee"}
              </button>
            </div>
          </div>
          <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #CCFBF1", overflow: "hidden" }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #F0FDFA" }}>
                    <th style={thStyle}>{isUk ? "Аватар" : "Avatar"}</th>
                    <th style={thStyle} onClick={() => handleSort("name")}>
                      {isUk ? "Ім'я" : "Name"} {sortKey === "name" ? (sortDir === "asc" ? "↑" : "↓") : ""}
                    </th>
                    <th style={thStyle}>{isUk ? "Посада" : "Position"}</th>
                    <th style={thStyle} onClick={() => handleSort("department")}>
                      {isUk ? "Відділ" : "Department"} {sortKey === "department" ? (sortDir === "asc" ? "↑" : "↓") : ""}
                    </th>
                    <th style={thStyle}>{isUk ? "Статус" : "Status"}</th>
                    <th style={thStyle} onClick={() => handleSort("salary")}>
                      {isUk ? "Зарплата" : "Salary"} {sortKey === "salary" ? (sortDir === "asc" ? "↑" : "↓") : ""}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((emp) => {
                    const st = STATUS_CONFIG[emp.status] ?? STATUS_CONFIG["Active"];
                    const avatarColor = AVATAR_COLORS[emp.department] ?? "#0D9488";
                    return (
                      <tr key={emp.id} style={{ borderBottom: "1px solid #F0FDFA" }}>
                        <td style={tdStyle}>
                          <div style={{ width: 36, height: 36, borderRadius: "50%", background: avatarColor, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13 }}>
                            {emp.initials}
                          </div>
                        </td>
                        <td style={{ ...tdStyle, fontWeight: 600 }}>{emp.name}</td>
                        <td style={{ ...tdStyle, color: "#64748B", fontSize: 13 }}>{emp.position}</td>
                        <td style={tdStyle}>
                          <span style={{ background: "#F0FDFA", color: "#0D9488", borderRadius: 4, padding: "3px 8px", fontSize: 12, fontWeight: 600 }}>{emp.department}</span>
                        </td>
                        <td style={tdStyle}>
                          <span style={{ background: st.bg, color: st.color, borderRadius: 100, padding: "4px 10px", fontSize: 12, fontWeight: 600 }}>
                            {isUk ? st.labelUk : st.label}
                          </span>
                        </td>
                        <td style={{ ...tdStyle, fontWeight: 700, color: "#0D9488" }}>{emp.salary.toLocaleString()} ₴</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: "64px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, textAlign: "center", marginBottom: 8 }}>{isUk ? "Можливості" : "Features"}</h2>
          <p style={{ textAlign: "center", color: "#5EAAA0", fontSize: 14, marginBottom: 36 }}>
            {isUk ? "Все необхідне для HR в одному місці" : "Everything you need for HR in one place"}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 }}>
            {FEATURES.map((f) => (
              <div key={f.title} style={{ background: "#fff", border: "1px solid #CCFBF1", borderRadius: 12, padding: 20, textAlign: "center" }}>
                <div style={{ fontSize: 30, marginBottom: 10 }}>{f.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#0F3835" }}>{isUk ? f.titleUk : f.title}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 24, background: "#0D9488", borderRadius: 10, padding: "14px 20px", display: "flex", gap: 12, alignItems: "center" }}>
            <span style={{ fontSize: 20 }}>⚖️</span>
            <span style={{ color: "#fff", fontWeight: 600, fontSize: 14 }}>
              {isUk ? "Оновлено відповідно до трудового законодавства України 2024" : "Updated for Ukrainian labor laws 2024"}
            </span>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section style={{ background: "#F0FDFA", padding: "64px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>{isUk ? "Тарифи" : "Pricing"}</h2>
          <div style={{ display: "inline-flex", background: "#fff", border: "1px solid #CCFBF1", borderRadius: 8, padding: 4, marginBottom: 32 }}>
            {[false, true].map((a) => (
              <button key={String(a)} onClick={() => setAnnual(a)}
                style={{ padding: "8px 20px", borderRadius: 6, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13, background: annual === a ? "#0D9488" : "transparent", color: annual === a ? "#fff" : "#64748B" }}>
                {a ? (isUk ? "Річний −20%" : "Annual −20%") : (isUk ? "Щомісячний" : "Monthly")}
              </button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
            {plans.map((p, i) => (
              <div key={p.name} style={{ background: "#fff", border: `1px solid ${i === 1 ? "#0D9488" : "#CCFBF1"}`, borderRadius: 12, padding: 24, position: "relative" }}>
                {i === 1 && (
                  <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "#0D9488", color: "#fff", borderRadius: 100, padding: "3px 12px", fontSize: 11, fontWeight: 700, whiteSpace: "nowrap" }}>
                    {isUk ? "Популярний" : "Popular"}
                  </div>
                )}
                <h3 style={{ fontWeight: 800, fontSize: 18, marginBottom: 4 }}>{p.name}</h3>
                <div style={{ fontSize: 28, fontWeight: 900, color: "#0D9488", marginBottom: 4 }}>
                  {p.price === 0 ? (isUk ? "Дізнатись" : "Contact us") : `${annual ? p.priceAnnual : p.price} ₴`}
                </div>
                {p.price > 0 && <div style={{ fontSize: 12, color: "#94A3B8", marginBottom: 12 }}>{isUk ? "/ місяць" : "/ month"}</div>}
                <div style={{ fontSize: 12, color: "#5EAAA0", marginBottom: 16 }}>{p.limit}</div>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px", fontSize: 13, color: "#475569" }}>
                  {p.features.map((f) => <li key={f} style={{ padding: "4px 0" }}>✓ {f}</li>)}
                </ul>
                <button style={{ width: "100%", background: i === 1 ? "#0D9488" : "#F0FDFA", color: i === 1 ? "#fff" : "#0D9488", border: `1px solid ${i === 1 ? "#0D9488" : "#CCFBF1"}`, borderRadius: 8, padding: "10px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
                  {isUk ? "Почати" : "Get started"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ADD EMPLOYEE MODAL */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(15,56,53,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50, padding: 24 }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: 32, width: "100%", maxWidth: 440, boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
            <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 20, color: "#0F3835" }}>{isUk ? "Додати співробітника" : "Add Employee"}</h3>
            <form onSubmit={handleAddEmployee} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder={isUk ? "Повне ім'я *" : "Full name *"} required style={inputStyle} />
              <input value={newPosition} onChange={(e) => setNewPosition(e.target.value)} placeholder={isUk ? "Посада *" : "Position *"} required style={inputStyle} />
              <input value={newDept} onChange={(e) => setNewDept(e.target.value)} placeholder={isUk ? "Відділ" : "Department"} style={inputStyle} />
              <input value={newSalary} onChange={(e) => setNewSalary(e.target.value)} placeholder={isUk ? "Зарплата (₴)" : "Salary (₴)"} type="number" style={inputStyle} />
              <div style={{ display: "flex", gap: 12 }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, background: "#F0FDFA", border: "1px solid #CCFBF1", borderRadius: 8, padding: "12px", fontWeight: 600, fontSize: 14, cursor: "pointer", color: "#0D9488" }}>
                  {isUk ? "Скасувати" : "Cancel"}
                </button>
                <button type="submit" style={{ flex: 1, background: "#0D9488", border: "none", borderRadius: 8, padding: "12px", fontWeight: 700, fontSize: 14, cursor: "pointer", color: "#fff" }}>
                  {isUk ? "Додати" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #CCFBF1", padding: "32px 24px", textAlign: "center", color: "#5EAAA0", fontSize: 13 }}>
        <span style={{ fontWeight: 800, color: "#0F3835" }}><span style={{ color: "#0D9488" }}>HR</span>Pulse</span> &copy; 2024 ·{" "}
        {isUk ? "HR та розрахунок зарплати для бізнесу" : "HR & Payroll for business"}
      </footer>
    </div>
  );
}
