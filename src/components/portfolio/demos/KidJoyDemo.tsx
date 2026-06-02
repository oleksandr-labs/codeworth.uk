"use client";
import { useState } from "react";

export function KidJoyDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";
  const [activeAge, setActiveAge] = useState("all");
  const [activeDay, setActiveDay] = useState(0);
  const [selectedClub, setSelectedClub] = useState<number | null>(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingData, setBookingData] = useState({ name: "", childName: "", age: "", phone: "", club: "", time: "" });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  const ageGroups = [
    { id: "all", label: isUk ? "Усі" : "All" },
    { id: "3-5", label: isUk ? "3–5 років" : "Ages 3–5" },
    { id: "6-8", label: isUk ? "6–8 років" : "Ages 6–8" },
    { id: "9-12", label: isUk ? "9–12 років" : "Ages 9–12" },
    { id: "teen", label: isUk ? "Підлітки" : "Teens 13+" },
  ];

  const clubs = [
    { id: 1, emoji: "🎨", nameUk: "Малювання", nameEn: "Drawing", age: "3-5", count: 8, price: 1800, color: "#FCD34D" },
    { id: 2, emoji: "🎭", nameUk: "Театр", nameEn: "Theater", age: "6-8", count: 10, price: 2000, color: "#FB923C" },
    { id: 3, emoji: "💃", nameUk: "Танці", nameEn: "Dance", age: "6-8", count: 12, price: 2200, color: "#F472B6" },
    { id: 4, emoji: "🤸", nameUk: "Гімнастика", nameEn: "Gymnastics", age: "3-5", count: 8, price: 2400, color: "#34D399" },
    { id: 5, emoji: "🧠", nameUk: "Логіка та шахи", nameEn: "Logic & Chess", age: "6-8", count: 10, price: 1600, color: "#818CF8" },
    { id: 6, emoji: "🎵", nameUk: "Вокал", nameEn: "Vocal", age: "9-12", count: 6, price: 2600, color: "#38BDF8" },
    { id: 7, emoji: "💻", nameUk: "Програмування", nameEn: "Coding", age: "teen", count: 8, price: 3200, color: "#22D3EE" },
    { id: 8, emoji: "🌍", nameUk: "Англійська", nameEn: "English", age: "3-5", count: 10, price: 2800, color: "#A78BFA" },
  ];

  const filtered = activeAge === "all" ? clubs : clubs.filter(c => c.age === activeAge);

  const days = [
    isUk ? "Пн" : "Mon", isUk ? "Вт" : "Tue", isUk ? "Ср" : "Wed",
    isUk ? "Чт" : "Thu", isUk ? "Пт" : "Fri", isUk ? "Сб" : "Sat",
  ];

  const schedule = [
    [
      { time: "09:00", clubId: 8, color: "#A78BFA" },
      { time: "10:00", clubId: 1, color: "#FCD34D" },
      { time: "16:00", clubId: 4, color: "#34D399" },
      { time: "17:00", clubId: 7, color: "#22D3EE" },
    ],
    [
      { time: "10:00", clubId: 3, color: "#F472B6" },
      { time: "15:00", clubId: 5, color: "#818CF8" },
      { time: "17:00", clubId: 6, color: "#38BDF8" },
    ],
    [
      { time: "09:00", clubId: 8, color: "#A78BFA" },
      { time: "11:00", clubId: 2, color: "#FB923C" },
      { time: "16:00", clubId: 1, color: "#FCD34D" },
      { time: "17:30", clubId: 7, color: "#22D3EE" },
    ],
    [
      { time: "10:00", clubId: 4, color: "#34D399" },
      { time: "15:00", clubId: 5, color: "#818CF8" },
      { time: "17:00", clubId: 3, color: "#F472B6" },
    ],
    [
      { time: "09:00", clubId: 8, color: "#A78BFA" },
      { time: "10:00", clubId: 6, color: "#38BDF8" },
      { time: "16:00", clubId: 2, color: "#FB923C" },
      { time: "17:30", clubId: 7, color: "#22D3EE" },
    ],
    [
      { time: "10:00", clubId: 1, color: "#FCD34D" },
      { time: "11:00", clubId: 4, color: "#34D399" },
      { time: "12:00", clubId: 5, color: "#818CF8" },
      { time: "13:00", clubId: 3, color: "#F472B6" },
    ],
  ];

  const reviews = [
    { parent: isUk ? "Олена К." : "Olena K.", text: isUk ? "Донька в захваті від танців! Після KidJoy стала впевненішою." : "Daughter loves dancing! After KidJoy she became more confident." },
    { parent: isUk ? "Андрій В." : "Andriy V.", text: isUk ? "Сину 8 років, ходить на програмування і логіку. Уже написав першу гру!" : "Son is 8, attends coding and logic. Already wrote his first game!" },
    { parent: isUk ? "Марія С." : "Mariia S.", text: isUk ? "Три дитини — і всі ходять сюди. Різновікові групи та чудові викладачі." : "Three kids — all go here. Mixed-age groups and wonderful teachers." },
  ];

  const clubById = (id: number) => clubs.find(c => c.id === id);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", background: "#FFFBF0", minHeight: "100vh" }}>
      {/* Nav */}
      <nav style={{ background: "#8B5CF6", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
        <div style={{ color: "#fff", fontWeight: 900, fontSize: 22 }}>KidJoy ⭐</div>
        <div style={{ display: "flex", gap: 16 }}>
          {[isUk ? "Гуртки" : "Clubs", isUk ? "Розклад" : "Schedule", isUk ? "Ціни" : "Prices"].map(l => (
            <span key={l} style={{ color: "#fff", fontSize: 14, cursor: "pointer", fontWeight: 600 }}>{l}</span>
          ))}
          <button style={{ background: "#FCD34D", color: "#1a1a1a", border: "none", borderRadius: 20, padding: "6px 16px", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>
            {isUk ? "Пробне заняття" : "Trial Lesson"}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg,#8B5CF6,#FB923C)", padding: "60px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 10, left: "10%", fontSize: 40, opacity: 0.3 }}>⭐</div>
        <div style={{ position: "absolute", top: 30, right: "15%", fontSize: 30, opacity: 0.3 }}>🌈</div>
        <div style={{ position: "absolute", bottom: 10, left: "20%", fontSize: 35, opacity: 0.3 }}>🎉</div>
        <div style={{ fontSize: 56, marginBottom: 8 }}>🎪</div>
        <h1 style={{ color: "#fff", fontSize: 36, fontWeight: 900, margin: "0 0 12px" }}>
          {isUk ? "Тут дітки ростуть щасливими!" : "Kids Grow Happy Here!"}
        </h1>
        <p style={{ color: "rgba(255,255,255,0.9)", fontSize: 18, marginBottom: 24 }}>
          {isUk ? "Гуртки, творчість та розвиток для дітей 3–16 років у Одесі" : "Clubs, creativity and development for kids aged 3–16 in Odesa"}
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button style={{ background: "#FCD34D", color: "#1a1a1a", border: "none", borderRadius: 30, padding: "14px 28px", fontWeight: 800, fontSize: 16, cursor: "pointer" }}>
            🎁 {isUk ? "Записати на пробне!" : "Book Trial Lesson!"}
          </button>
          <button style={{ background: "rgba(255,255,255,0.2)", color: "#fff", border: "2px solid #fff", borderRadius: 30, padding: "14px 28px", fontWeight: 700, fontSize: 16, cursor: "pointer" }}>
            {isUk ? "Усі гуртки" : "All Clubs"}
          </button>
        </div>
        <div style={{ marginTop: 24, color: "rgba(255,255,255,0.9)", fontSize: 14 }}>
          ⭐ 4.9 · {isUk ? "520 відгуків щасливих батьків" : "520 reviews from happy parents"}
        </div>
      </div>

      {/* Age filter + Clubs */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, textAlign: "center", marginBottom: 8, color: "#1a1a1a" }}>
          {isUk ? "Наші гуртки" : "Our Clubs"}
        </h2>
        <p style={{ textAlign: "center", color: "#666", marginBottom: 24 }}>
          {isUk ? "Оберіть вік дитини, щоб побачити підходящі гуртки" : "Select your child's age to see suitable clubs"}
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 32 }}>
          {ageGroups.map(ag => (
            <button key={ag.id} onClick={() => setActiveAge(ag.id)} style={{
              padding: "8px 20px", borderRadius: 20, border: "2px solid",
              borderColor: activeAge === ag.id ? "#8B5CF6" : "#ddd",
              background: activeAge === ag.id ? "#8B5CF6" : "#fff",
              color: activeAge === ag.id ? "#fff" : "#555",
              fontWeight: 700, cursor: "pointer", fontSize: 14,
            }}>{ag.label}</button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 20 }}>
          {filtered.map(club => (
            <div key={club.id} onClick={() => setSelectedClub(club.id === selectedClub ? null : club.id)}
              style={{ background: "#fff", borderRadius: 20, padding: 20, cursor: "pointer", border: `3px solid ${club.id === selectedClub ? club.color : "transparent"}`, boxShadow: "0 4px 12px rgba(0,0,0,0.08)", transition: "all 0.2s" }}>
              <div style={{ fontSize: 40, marginBottom: 8 }}>{club.emoji}</div>
              <h3 style={{ fontWeight: 800, fontSize: 18, margin: "0 0 6px", color: "#1a1a1a" }}>
                {isUk ? club.nameUk : club.nameEn}
              </h3>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
                <span style={{ background: club.color + "33", color: "#333", borderRadius: 10, padding: "2px 10px", fontSize: 12, fontWeight: 600 }}>
                  {isUk ? `${club.age} р.` : `Ages ${club.age}`}
                </span>
                <span style={{ background: "#f5f5f5", color: "#555", borderRadius: 10, padding: "2px 10px", fontSize: 12 }}>
                  {club.count} {isUk ? "дітей" : "kids"}
                </span>
              </div>
              <div style={{ fontWeight: 800, fontSize: 20, color: club.color }}>₴{club.price.toLocaleString()}/міс</div>
              <div style={{ marginTop: 8, fontSize: 12, color: "#22c55e", fontWeight: 600 }}>
                🎁 {isUk ? "Перше заняття безкоштовно" : "First lesson free"}
              </div>
              {selectedClub === club.id && (
                <button onClick={e => { e.stopPropagation(); setBookingData(d => ({ ...d, club: isUk ? club.nameUk : club.nameEn })); }}
                  style={{ marginTop: 12, width: "100%", padding: "10px", background: club.color, border: "none", borderRadius: 12, fontWeight: 800, cursor: "pointer", color: "#1a1a1a" }}>
                  {isUk ? "Записатись" : "Sign Up"}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Schedule */}
      <div style={{ background: "#fff", padding: "40px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, textAlign: "center", marginBottom: 24, color: "#1a1a1a" }}>
            📅 {isUk ? "Розклад занять" : "Class Schedule"}
          </h2>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 24, flexWrap: "wrap" }}>
            {days.map((d, i) => (
              <button key={i} onClick={() => setActiveDay(i)} style={{
                padding: "8px 16px", borderRadius: 12, border: "none", fontWeight: 700, cursor: "pointer", fontSize: 14,
                background: activeDay === i ? "#8B5CF6" : "#f5f5f5",
                color: activeDay === i ? "#fff" : "#555",
              }}>{d}</button>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {schedule[activeDay].map((slot, i) => {
              const club = clubById(slot.clubId);
              if (!club) return null;
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "12px 16px", borderRadius: 14, background: slot.color + "20", borderLeft: `4px solid ${slot.color}` }}>
                  <div style={{ fontWeight: 800, fontSize: 16, minWidth: 50 }}>{slot.time}</div>
                  <div style={{ fontSize: 24 }}>{club.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700 }}>{isUk ? club.nameUk : club.nameEn}</div>
                    <div style={{ fontSize: 12, color: "#666" }}>{isUk ? `${club.age} років · ${club.count} місць` : `Ages ${club.age} · ${club.count} spots`}</div>
                  </div>
                  <button style={{ background: slot.color, border: "none", borderRadius: 10, padding: "6px 14px", fontWeight: 700, cursor: "pointer", color: "#1a1a1a", fontSize: 13 }}>
                    {isUk ? "Записатись" : "Sign Up"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Booking form */}
      <div style={{ background: "linear-gradient(135deg,#8B5CF6,#3B82F6)", padding: "50px 24px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", background: "#fff", borderRadius: 24, padding: 40 }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, textAlign: "center", marginBottom: 6, color: "#1a1a1a" }}>
            🎁 {isUk ? "Записати на пробне заняття" : "Book a Trial Lesson"}
          </h2>
          <p style={{ textAlign: "center", color: "#22c55e", fontWeight: 700, marginBottom: 24 }}>
            {isUk ? "Перше заняття — БЕЗКОШТОВНО!" : "First lesson — FREE!"}
          </p>
          {bookingSubmitted ? (
            <div style={{ textAlign: "center", padding: "30px 0" }}>
              <div style={{ fontSize: 60 }}>🎉</div>
              <h3 style={{ fontWeight: 800, color: "#8B5CF6", marginBottom: 8 }}>
                {isUk ? "Ура! Записано!" : "Hooray! Booked!"}
              </h3>
              <p style={{ color: "#555" }}>
                {isUk ? "Ми зателефонуємо вам найближчим часом для підтвердження." : "We'll call you shortly to confirm."}
              </p>
            </div>
          ) : (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {[
                  { key: "name", label: isUk ? "Ваше ім'я" : "Your name", type: "text" },
                  { key: "childName", label: isUk ? "Ім'я дитини" : "Child's name", type: "text" },
                  { key: "age", label: isUk ? "Вік дитини" : "Child's age", type: "text" },
                  { key: "phone", label: isUk ? "Телефон" : "Phone", type: "tel" },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ display: "block", fontWeight: 600, marginBottom: 4, fontSize: 13 }}>{f.label}</label>
                    <input type={f.type} value={bookingData[f.key as keyof typeof bookingData]}
                      onChange={e => setBookingData(d => ({ ...d, [f.key]: e.target.value }))}
                      style={{ width: "100%", padding: "10px 12px", border: "2px solid #e5e7eb", borderRadius: 10, fontSize: 14, boxSizing: "border-box", outline: "none" }} />
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 14 }}>
                <label style={{ display: "block", fontWeight: 600, marginBottom: 4, fontSize: 13 }}>{isUk ? "Оберіть гурток" : "Select Club"}</label>
                <select value={bookingData.club} onChange={e => setBookingData(d => ({ ...d, club: e.target.value }))}
                  style={{ width: "100%", padding: "10px 12px", border: "2px solid #e5e7eb", borderRadius: 10, fontSize: 14, background: "#fff", outline: "none" }}>
                  <option value="">{isUk ? "— Оберіть —" : "— Select —"}</option>
                  {clubs.map(c => <option key={c.id} value={isUk ? c.nameUk : c.nameEn}>{c.emoji} {isUk ? c.nameUk : c.nameEn}</option>)}
                </select>
              </div>
              <button onClick={() => setBookingSubmitted(true)}
                style={{ width: "100%", marginTop: 20, padding: "14px", background: "#8B5CF6", color: "#fff", border: "none", borderRadius: 14, fontWeight: 800, fontSize: 16, cursor: "pointer" }}>
                {isUk ? "🎁 Записати безкоштовно!" : "🎁 Book for Free!"}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Reviews */}
      <div style={{ padding: "40px 24px", maxWidth: 900, margin: "0 auto" }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, textAlign: "center", marginBottom: 24 }}>
          💬 {isUk ? "Відгуки батьків" : "Parent Reviews"}
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20 }}>
          {reviews.map((r, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 10px rgba(0,0,0,0.07)" }}>
              <div style={{ fontSize: 20, marginBottom: 8 }}>{"⭐".repeat(5)}</div>
              <p style={{ color: "#444", fontSize: 14, lineHeight: 1.6, margin: "0 0 12px" }}>"{r.text}"</p>
              <div style={{ fontWeight: 700, color: "#8B5CF6" }}>{r.parent}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: "#8B5CF6", padding: "30px 24px", textAlign: "center", color: "#fff" }}>
        <div style={{ fontWeight: 900, fontSize: 20, marginBottom: 8 }}>KidJoy ⭐</div>
        <p style={{ opacity: 0.8, fontSize: 14 }}>
          {isUk ? "вул. Дерибасівська 12, Одеса · Пн–Пт 9:00–20:00, Сб 10:00–18:00" : "12 Derybasivska St, Odesa · Mon–Fri 9:00–20:00, Sat 10:00–18:00"}
        </p>
        <p style={{ opacity: 0.7, fontSize: 12, marginTop: 8 }}>© 2025 KidJoy. {isUk ? "Всі права захищені." : "All rights reserved."}</p>
      </div>
    </div>
  );
}
