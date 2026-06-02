"use client";
import { useState } from "react";

type Mode = "seeker" | "employer";

const JOB_CARDS = [
  { title: "Касир", titleEn: "Cashier", company: "Сільпо", city: "Kyiv", salary: "18,000 ₴", category: "Retail" },
  { title: "Кур'єр", titleEn: "Courier", company: "Nova Post", city: "Lviv", salary: "22,000 ₴", category: "Logistics" },
  { title: "Офіціант", titleEn: "Waiter", company: "Kanapa", city: "Kyiv", salary: "16,000 ₴", category: "HoReCa" },
  { title: "Оператор складу", titleEn: "Warehouse Operator", company: "Rozetka", city: "Odesa", salary: "20,000 ₴", category: "Logistics" },
  { title: "Адміністратор", titleEn: "Administrator", company: "Monobank", city: "Dnipro", salary: "25,000 ₴", category: "Office" },
];

const TESTIMONIALS = [
  { name: "Olena K.", role: "seeker", text: "Found a job in 3 days! Amazing service.", textUk: "Знайшла роботу за 3 дні! Чудовий сервіс." },
  { name: "Dmytro S.", role: "seeker", text: "Great support, helped me switch careers.", textUk: "Відмінна підтримка, допомогли змінити кар'єру." },
  { name: "Iryna M.", role: "employer", text: "Hired 12 workers in one week. Highly recommend.", textUk: "Найняли 12 працівників за тиждень. Рекомендую." },
  { name: "Vadym P.", role: "employer", text: "Reliable platform, quality candidates always.", textUk: "Надійна платформа, якісні кандидати завжди." },
];

export function StaffProDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [mode, setMode] = useState<Mode>("seeker");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [applyingId, setApplyingId] = useState<number | null>(null);
  const [applicantName, setApplicantName] = useState("");
  const [applicantPhone, setApplicantPhone] = useState("");
  const [appliedIds, setAppliedIds] = useState<number[]>([]);

  // Employer form
  const [jobTitle, setJobTitle] = useState("");
  const [jobCategory, setJobCategory] = useState("");
  const [jobCity, setJobCity] = useState("");
  const [jobSalary, setJobSalary] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobExp, setJobExp] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobContact, setJobContact] = useState("");
  const [jobPosted, setJobPosted] = useState(false);

  const categories = ["HoReCa", "Retail", "Logistics", "Manufacturing", "Office"];
  const cities = ["Kyiv", "Lviv", "Odesa", "Dnipro", "Kharkiv"];

  const filteredJobs = JOB_CARDS.filter((j) => {
    const nameMatch = isUk ? j.title.toLowerCase().includes(searchQuery.toLowerCase()) : j.titleEn.toLowerCase().includes(searchQuery.toLowerCase());
    const cityMatch = !selectedCity || j.city === selectedCity;
    const catMatch = !selectedCategory || j.category === selectedCategory;
    return nameMatch && cityMatch && catMatch;
  });

  const handleApply = (idx: number) => {
    setAppliedIds((prev) => [...prev, idx]);
    setApplyingId(null);
    setApplicantName("");
    setApplicantPhone("");
  };

  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    setJobPosted(true);
  };

  const inputStyle: React.CSSProperties = {
    background: "#fff",
    border: "1px solid #CBD5E1",
    borderRadius: 8,
    padding: "10px 14px",
    fontSize: 14,
    color: "#0F172A",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  };

  return (
    <div style={{ background: "#F1F5F9", color: "#0F172A", fontFamily: "'Inter', sans-serif", minHeight: "100vh" }}>
      {/* NAV */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #E2E8F0", padding: "0 24px" }} className="flex items-center justify-between h-16">
        <span style={{ fontWeight: 800, fontSize: 20 }}>
          <span style={{ color: "#0EA5E9" }}>Staff</span><span style={{ color: "#FBBF24" }}>Pro</span>
        </span>
        <div className="hidden md:flex gap-6 text-sm text-slate-500">
          {[isUk ? "Вакансії" : "Jobs", isUk ? "Компанії" : "Companies", isUk ? "Поради" : "Advice"].map((l) => (
            <span key={l} style={{ cursor: "pointer" }}>{l}</span>
          ))}
        </div>
        <button style={{ background: "#0EA5E9", color: "#fff", borderRadius: 8, padding: "8px 18px", fontWeight: 700, fontSize: 13, border: "none", cursor: "pointer" }}>
          {isUk ? "Розмістити вакансію" : "Post a Job"}
        </button>
      </nav>

      {/* HERO */}
      <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 200 }}>
        <div style={{ background: "#0EA5E9", padding: "48px 32px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <h1 style={{ fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 800, color: "#fff", marginBottom: 8, lineHeight: 1.2 }}>
            {isUk ? "Знайди роботу" : "Find Work"}
          </h1>
          <p style={{ color: "#BAE6FD", fontSize: 14 }}>{isUk ? "800+ активних вакансій" : "800+ active jobs"}</p>
        </div>
        <div style={{ background: "#0F172A", padding: "48px 32px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <h1 style={{ fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 800, color: "#fff", marginBottom: 8, lineHeight: 1.2 }}>
            {isUk ? "Знайди людей" : "Find People"}
          </h1>
          <p style={{ color: "#94A3B8", fontSize: 14 }}>{isUk ? "120 компаній-партнерів" : "120 partner companies"}</p>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: "#FBBF24", padding: "24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", gap: 32, justifyContent: "center", flexWrap: "wrap" }}>
          {[
            { v: "5,200", l: isUk ? "розміщень" : "placements" },
            { v: "120", l: isUk ? "компаній" : "companies" },
            { v: "8", l: isUk ? "років" : "years" },
            { v: "800+", l: isUk ? "вакансій" : "active jobs" },
          ].map((s) => (
            <div key={s.v} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#0F172A" }}>{s.v}</div>
              <div style={{ fontSize: 12, color: "#78350F" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* MODE TOGGLE */}
      <section style={{ padding: "40px 24px 0" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", background: "#fff", border: "1px solid #E2E8F0", borderRadius: 10, padding: 4, marginBottom: 32 }}>
            {(["seeker", "employer"] as Mode[]).map((m) => (
              <button key={m} onClick={() => setMode(m)}
                style={{ padding: "10px 24px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 14, transition: "all 0.2s",
                  background: mode === m ? "#0EA5E9" : "transparent",
                  color: mode === m ? "#fff" : "#64748B" }}>
                {m === "seeker" ? (isUk ? "Шукаю роботу" : "Find a job") : (isUk ? "Шукаю працівників" : "Find employees")}
              </button>
            ))}
          </div>

          {/* JOB SEEKER */}
          {mode === "seeker" && (
            <div>
              {/* Search bar */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: 12, marginBottom: 24 }}>
                <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={isUk ? "Назва посади..." : "Job title..."} style={inputStyle} />
                <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} style={{ ...inputStyle, width: "auto" }}>
                  <option value="">{isUk ? "Місто" : "City"}</option>
                  {cities.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} style={{ ...inputStyle, width: "auto" }}>
                  <option value="">{isUk ? "Категорія" : "Category"}</option>
                  {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Job cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 40 }}>
                {filteredJobs.map((job, idx) => (
                  <div key={idx} style={{ background: "#fff", borderRadius: 12, padding: 20, border: "1px solid #E2E8F0", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 16 }}>{isUk ? job.title : job.titleEn}</div>
                      <div style={{ fontSize: 13, color: "#64748B", marginTop: 2 }}>{job.company} · {job.city}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <span style={{ fontWeight: 700, color: "#0EA5E9", fontSize: 16 }}>{job.salary}</span>
                      {appliedIds.includes(idx) ? (
                        <span style={{ background: "#DCFCE7", color: "#16A34A", borderRadius: 6, padding: "8px 16px", fontSize: 13, fontWeight: 600 }}>✓ {isUk ? "Відправлено" : "Applied"}</span>
                      ) : applyingId === idx ? (
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                          <input value={applicantName} onChange={(e) => setApplicantName(e.target.value)} placeholder={isUk ? "Ваше ім'я" : "Your name"} style={{ ...inputStyle, width: 130 }} />
                          <input value={applicantPhone} onChange={(e) => setApplicantPhone(e.target.value)} placeholder={isUk ? "Телефон" : "Phone"} style={{ ...inputStyle, width: 120 }} />
                          <button onClick={() => handleApply(idx)} style={{ background: "#0EA5E9", color: "#fff", border: "none", borderRadius: 6, padding: "10px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                            {isUk ? "Надіслати CV" : "Send CV"}
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => setApplyingId(idx)} style={{ background: "#0EA5E9", color: "#fff", border: "none", borderRadius: 8, padding: "8px 20px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
                          {isUk ? "Відгукнутись" : "Apply"}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {filteredJobs.length === 0 && (
                  <div style={{ textAlign: "center", color: "#94A3B8", padding: 32 }}>{isUk ? "Вакансій не знайдено" : "No jobs found"}</div>
                )}
              </div>
            </div>
          )}

          {/* EMPLOYER */}
          {mode === "employer" && (
            <div style={{ maxWidth: 580 }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>
                {isUk ? "Розмістіть вакансію за 5 хвилин" : "Post a job in 5 minutes"}
              </h2>
              <p style={{ color: "#64748B", fontSize: 14, marginBottom: 24 }}>
                {isUk ? "Ваша вакансія побачать тисячі кандидатів" : "Thousands of candidates will see your job"}
              </p>
              {jobPosted ? (
                <div style={{ background: "#F0FDF4", border: "1px solid #86EFAC", borderRadius: 12, padding: 32, textAlign: "center" }}>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>🎉</div>
                  <h3 style={{ fontWeight: 700, color: "#16A34A", fontSize: 18 }}>{isUk ? "Вакансію опубліковано!" : "Job posted successfully!"}</h3>
                  <p style={{ color: "#64748B", fontSize: 14, marginTop: 8 }}>{isUk ? "Кандидати побачать її вже сьогодні." : "Candidates will see it today."}</p>
                </div>
              ) : (
                <form onSubmit={handlePostJob} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <input value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} placeholder={isUk ? "Назва посади *" : "Position title *"} required style={inputStyle} />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <select value={jobCategory} onChange={(e) => setJobCategory(e.target.value)} required style={inputStyle}>
                      <option value="">{isUk ? "Категорія *" : "Category *"}</option>
                      {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <select value={jobCity} onChange={(e) => setJobCity(e.target.value)} required style={inputStyle}>
                      <option value="">{isUk ? "Місто *" : "City *"}</option>
                      {cities.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <input value={jobSalary} onChange={(e) => setJobSalary(e.target.value)} placeholder={isUk ? "Зарплата (₴)" : "Salary (₴)"} style={inputStyle} />
                    <select value={jobType} onChange={(e) => setJobType(e.target.value)} style={inputStyle}>
                      <option value="">{isUk ? "Тип зайнятості" : "Employment type"}</option>
                      <option>{isUk ? "Повна" : "Full-time"}</option>
                      <option>{isUk ? "Часткова" : "Part-time"}</option>
                      <option>{isUk ? "Тимчасова" : "Temporary"}</option>
                    </select>
                  </div>
                  <input value={jobExp} onChange={(e) => setJobExp(e.target.value)} placeholder={isUk ? "Досвід (наприклад: від 1 року)" : "Required experience (e.g. 1+ year)"} style={inputStyle} />
                  <textarea value={jobDesc} onChange={(e) => setJobDesc(e.target.value)} placeholder={isUk ? "Опис вакансії..." : "Job description..."} rows={4} style={{ ...inputStyle, resize: "vertical" }} />
                  <input value={jobContact} onChange={(e) => setJobContact(e.target.value)} placeholder={isUk ? "Контакт (email або телефон) *" : "Contact (email or phone) *"} required style={inputStyle} />
                  <button type="submit" style={{ background: "#0EA5E9", color: "#fff", border: "none", borderRadius: 8, padding: 14, fontWeight: 800, fontSize: 15, cursor: "pointer" }}>
                    {isUk ? "Опублікувати вакансію" : "Post Job"}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "64px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 32, textAlign: "center" }}>{isUk ? "Відгуки" : "Testimonials"}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
            {TESTIMONIALS.map((t) => (
              <div key={t.name} style={{ background: "#fff", borderRadius: 12, padding: 20, border: "1px solid #E2E8F0" }}>
                <div style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "center" }}>
                  <div style={{ width: 38, height: 38, borderRadius: "50%", background: t.role === "seeker" ? "#BAE6FD" : "#FEF3C7", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, color: t.role === "seeker" ? "#0369A1" : "#92400E", flexShrink: 0 }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: "#94A3B8" }}>{t.role === "seeker" ? (isUk ? "Шукач роботи" : "Job Seeker") : (isUk ? "Роботодавець" : "Employer")}</div>
                  </div>
                </div>
                <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.5, margin: 0 }}>"{isUk ? t.textUk : t.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#0F172A", color: "#94A3B8", padding: "32px 24px", textAlign: "center", fontSize: 13 }}>
        <span style={{ fontWeight: 700 }}><span style={{ color: "#0EA5E9" }}>Staff</span><span style={{ color: "#FBBF24" }}>Pro</span></span> &copy; 2024 · {isUk ? "Ваш партнер у підборі персоналу" : "Your staffing partner"}
      </footer>
    </div>
  );
}
