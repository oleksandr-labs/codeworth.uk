"use client";
import { useState } from "react";

export function RoboTechDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";
  const [activeCourse, setActiveCourse] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("courses");
  const [trialForm, setTrialForm] = useState({ name: "", childName: "", age: "", email: "", phone: "", course: "" });
  const [trialSubmitted, setTrialSubmitted] = useState(false);
  const [activeProject, setActiveProject] = useState<number | null>(null);

  const courses = [
    {
      id: 1, emoji: "🤖", color: "#3B82F6",
      titleUk: "Початкова Робототехніка", titleEn: "Beginner Robotics",
      ageUk: "7–10 років", ageEn: "Ages 7–10",
      levelUk: "Початківець", levelEn: "Beginner",
      durationUk: "8 місяців", durationEn: "8 months",
      price: 2800,
      descUk: "Збирання роботів на платформі LEGO Mindstorms. Базові принципи механіки та програмування.",
      descEn: "Building robots on LEGO Mindstorms platform. Basic mechanics and programming principles.",
      topics: isUk
        ? ["Основи механіки", "Базове програмування", "Датчики та сенсори", "Проєкт: перший робот"]
        : ["Mechanics basics", "Basic programming", "Sensors", "Project: first robot"],
    },
    {
      id: 2, emoji: "💻", color: "#22D3EE",
      titleUk: "Scratch Програмування", titleEn: "Scratch Programming",
      ageUk: "7–11 років", ageEn: "Ages 7–11",
      levelUk: "Початківець", levelEn: "Beginner",
      durationUk: "6 місяців", durationEn: "6 months",
      price: 2400,
      descUk: "Візуальне програмування Scratch. Анімації, ігри, інтерактивні казки.",
      descEn: "Visual programming with Scratch. Animations, games, interactive stories.",
      topics: isUk
        ? ["Алгоритми та цикли", "Ігрова логіка", "Анімації", "Проєкт: власна гра"]
        : ["Algorithms & loops", "Game logic", "Animations", "Project: your own game"],
    },
    {
      id: 3, emoji: "⚙️", color: "#A78BFA",
      titleUk: "Arduino та Електроніка", titleEn: "Arduino & Electronics",
      ageUk: "11–15 років", ageEn: "Ages 11–15",
      levelUk: "Середній", levelEn: "Intermediate",
      durationUk: "10 місяців", durationEn: "10 months",
      price: 3200,
      descUk: "Програмування мікроконтролерів Arduino. Схеми, датчики, IoT-проєкти.",
      descEn: "Programming Arduino microcontrollers. Circuits, sensors, IoT projects.",
      topics: isUk
        ? ["Основи електроніки", "Програмування C++", "Датчики та LCD", "IoT проєкт"]
        : ["Electronics basics", "C++ programming", "Sensors & LCD", "IoT project"],
    },
    {
      id: 4, emoji: "🐍", color: "#34D399",
      titleUk: "Python та AI", titleEn: "Python & AI",
      ageUk: "13–17 років", ageEn: "Ages 13–17",
      levelUk: "Просунутий", levelEn: "Advanced",
      durationUk: "12 місяців", durationEn: "12 months",
      price: 3800,
      descUk: "Програмування Python, основи машинного навчання, комп'ютерний зір.",
      descEn: "Python programming, machine learning basics, computer vision.",
      topics: isUk
        ? ["Синтаксис Python", "Аналіз даних", "ML моделі", "AI проєкт"]
        : ["Python syntax", "Data analysis", "ML models", "AI project"],
    },
    {
      id: 5, emoji: "🚁", color: "#FB923C",
      titleUk: "Автономні Дрони", titleEn: "Autonomous Drones",
      ageUk: "12–17 років", ageEn: "Ages 12–17",
      levelUk: "Середній", levelEn: "Intermediate",
      durationUk: "8 місяців", durationEn: "8 months",
      price: 4200,
      descUk: "Програмування дронів DJI Tello. Автономні місії, навігація.",
      descEn: "Programming DJI Tello drones. Autonomous missions, navigation.",
      topics: isUk
        ? ["Основи польоту", "Програмування місій", "Computer vision", "Змагання WRO"]
        : ["Flight basics", "Mission programming", "Computer vision", "WRO competition"],
    },
    {
      id: 6, emoji: "🏆", color: "#FCD34D",
      titleUk: "Підготовка до Олімпіад", titleEn: "Olympiad Prep",
      ageUk: "12–17 років", ageEn: "Ages 12–17",
      levelUk: "Просунутий", levelEn: "Advanced",
      durationUk: "По сезону", durationEn: "Seasonal",
      price: 4800,
      descUk: "Підготовка до WRO, олімпіади з інформатики, хакатонів.",
      descEn: "Preparation for WRO, informatics olympiads, hackathons.",
      topics: isUk
        ? ["Алгоритми змагань", "Командна робота", "Стратегія WRO", "Mock competitions"]
        : ["Competition algorithms", "Teamwork", "WRO strategy", "Mock competitions"],
    },
  ];

  const projects = [
    { id: 1, emoji: "🤖", nameUk: "Робот-сортувальник", nameEn: "Sorting Robot", authorUk: "Максим Г., 12 р.", authorEn: "Maxim G., age 12", descUk: "Сортує кольорові блоки за допомогою сенсорів кольору", descEn: "Sorts colored blocks using color sensors", color: "#3B82F6" },
    { id: 2, emoji: "🎮", nameUk: "2D Пригодницька гра", nameEn: "2D Adventure Game", authorUk: "Аліна В., 10 р.", authorEn: "Alina V., age 10", descUk: "Повноцінна гра на Scratch з 5 рівнями та власною музикою", descEn: "Full Scratch game with 5 levels and custom music", color: "#22D3EE" },
    { id: 3, emoji: "🌡️", nameUk: "Метеостанція Arduino", nameEn: "Arduino Weather Station", authorUk: "Ігор Т., 14 р.", authorEn: "Igor T., age 14", descUk: "Моніторить температуру, вологість та тиск, передає дані на LCD", descEn: "Monitors temp, humidity and pressure, sends data to LCD", color: "#A78BFA" },
    { id: 4, emoji: "🚦", nameUk: "Розумний Перехрестя", nameEn: "Smart Intersection", authorUk: "Тетяна С., 13 р.", authorEn: "Tetiana S., age 13", descUk: "Arduino-керований перехрестя з адаптивним часом сигналів", descEn: "Arduino-controlled intersection with adaptive signal timing", color: "#34D399" },
  ];

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", background: "#0F172A", minHeight: "100vh", color: "#fff" }}>
      {/* Nav */}
      <nav style={{ background: "rgba(15,23,42,0.95)", borderBottom: "1px solid rgba(59,130,246,0.3)", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60, position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ fontWeight: 900, fontSize: 20, color: "#3B82F6" }}>🤖 RoboTech <span style={{ color: "#22D3EE" }}>Kids</span></div>
        <div style={{ display: "flex", gap: 20 }}>
          {(["courses", "projects", "trial"] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              background: "none", border: "none", cursor: "pointer", fontWeight: 700, fontSize: 14,
              color: activeTab === tab ? "#22D3EE" : "#94a3b8",
              borderBottom: activeTab === tab ? "2px solid #22D3EE" : "2px solid transparent",
              paddingBottom: 2,
            }}>
              {tab === "courses" ? (isUk ? "Курси" : "Courses") : tab === "projects" ? (isUk ? "Проєкти учнів" : "Student Projects") : (isUk ? "Пробне заняття" : "Trial Lesson")}
            </button>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <div style={{ padding: "70px 24px 50px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 20% 50%, rgba(59,130,246,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(34,211,238,0.1) 0%, transparent 50%)" }} />
        <div style={{ position: "relative" }}>
          <div style={{ display: "inline-flex", gap: 16, marginBottom: 24, flexWrap: "wrap", justifyContent: "center" }}>
            {["🏆 15 WRO перемог", "200+ проєктів", "8 курсів"].map(b => (
              <span key={b} style={{ background: "rgba(59,130,246,0.2)", border: "1px solid rgba(59,130,246,0.4)", borderRadius: 20, padding: "4px 14px", fontSize: 13, color: "#93c5fd" }}>{b}</span>
            ))}
          </div>
          <h1 style={{ fontSize: 40, fontWeight: 900, margin: "0 0 16px", lineHeight: 1.2 }}>
            {isUk ? "Де діти будують" : "Where Kids Build"}<br />
            <span style={{ background: "linear-gradient(90deg,#3B82F6,#22D3EE)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {isUk ? "майбутнє своїми руками" : "the Future with Their Own Hands"}
            </span>
          </h1>
          <p style={{ color: "#94a3b8", fontSize: 18, maxWidth: 600, margin: "0 auto 32px" }}>
            {isUk ? "Робототехніка. Програмування. Електроніка. Вік 7–17." : "Robotics. Programming. Electronics. Ages 7–17."}
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => setActiveTab("trial")} style={{ background: "#3B82F6", color: "#fff", border: "none", borderRadius: 12, padding: "14px 28px", fontWeight: 800, fontSize: 16, cursor: "pointer" }}>
              {isUk ? "🎯 Пробне заняття" : "🎯 Trial Lesson"}
            </button>
            <button onClick={() => setActiveTab("courses")} style={{ background: "transparent", color: "#22D3EE", border: "2px solid #22D3EE", borderRadius: 12, padding: "14px 28px", fontWeight: 700, fontSize: 16, cursor: "pointer" }}>
              {isUk ? "Переглянути курси" : "View Courses"}
            </button>
          </div>
        </div>
      </div>

      {/* Courses */}
      {activeTab === "courses" && (
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 60px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: 20 }}>
            {courses.map(course => (
              <div key={course.id} onClick={() => setActiveCourse(course.id === activeCourse ? null : course.id)}
                style={{ background: "rgba(255,255,255,0.05)", border: `2px solid ${course.id === activeCourse ? course.color : "rgba(255,255,255,0.1)"}`, borderRadius: 16, padding: 24, cursor: "pointer", transition: "all 0.2s" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <div style={{ fontSize: 36 }}>{course.emoji}</div>
                  <div>
                    <h3 style={{ fontWeight: 800, margin: 0, color: course.color }}>{isUk ? course.titleUk : course.titleEn}</h3>
                    <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 2 }}>{isUk ? course.ageUk : course.ageEn} · {isUk ? course.durationUk : course.durationEn}</div>
                  </div>
                </div>
                <p style={{ color: "#cbd5e1", fontSize: 14, lineHeight: 1.6, margin: "0 0 16px" }}>
                  {isUk ? course.descUk : course.descEn}
                </p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontWeight: 800, fontSize: 18, color: course.color }}>₴{course.price}/міс</div>
                  <span style={{ background: course.color + "33", color: course.color, borderRadius: 8, padding: "3px 10px", fontSize: 12, fontWeight: 600 }}>{isUk ? course.levelUk : course.levelEn}</span>
                </div>
                {activeCourse === course.id && (
                  <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                    <div style={{ fontWeight: 700, fontSize: 13, color: "#94a3b8", marginBottom: 8 }}>
                      {isUk ? "Що вивчимо:" : "What you'll learn:"}
                    </div>
                    {course.topics.map((t, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, fontSize: 14 }}>
                        <span style={{ color: course.color }}>✓</span> {t}
                      </div>
                    ))}
                    <button onClick={e => { e.stopPropagation(); setActiveTab("trial"); setTrialForm(f => ({ ...f, course: isUk ? course.titleUk : course.titleEn })); }}
                      style={{ marginTop: 14, width: "100%", padding: "10px", background: course.color, border: "none", borderRadius: 10, fontWeight: 800, cursor: "pointer", color: "#fff" }}>
                      {isUk ? "Записатись на пробне" : "Book Trial Lesson"}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {activeTab === "projects" && (
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "20px 24px 60px" }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, textAlign: "center", marginBottom: 8 }}>
            🏆 {isUk ? "Проєкти наших учнів" : "Our Students' Projects"}
          </h2>
          <p style={{ textAlign: "center", color: "#94a3b8", marginBottom: 32 }}>
            {isUk ? "Реальні роботи, зроблені дітьми під час навчання" : "Real projects built by kids during their studies"}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 20 }}>
            {projects.map(p => (
              <div key={p.id} onClick={() => setActiveProject(p.id === activeProject ? null : p.id)}
                style={{ background: "rgba(255,255,255,0.05)", border: `2px solid ${activeProject === p.id ? p.color : "rgba(255,255,255,0.1)"}`, borderRadius: 16, padding: 24, cursor: "pointer" }}>
                <div style={{ fontSize: 48, textAlign: "center", marginBottom: 12 }}>{p.emoji}</div>
                <h3 style={{ fontWeight: 800, color: p.color, margin: "0 0 6px", textAlign: "center" }}>{isUk ? p.nameUk : p.nameEn}</h3>
                <div style={{ textAlign: "center", color: "#94a3b8", fontSize: 13, marginBottom: 10 }}>{isUk ? p.authorUk : p.authorEn}</div>
                <p style={{ color: "#cbd5e1", fontSize: 14, textAlign: "center" }}>{isUk ? p.descUk : p.descEn}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Trial form */}
      {activeTab === "trial" && (
        <div style={{ maxWidth: 600, margin: "0 auto", padding: "20px 24px 60px" }}>
          <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(59,130,246,0.3)", borderRadius: 20, padding: 36 }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, textAlign: "center", marginBottom: 6 }}>
              🎯 {isUk ? "Пробне заняття" : "Trial Lesson"}
            </h2>
            <p style={{ textAlign: "center", color: "#22D3EE", marginBottom: 24, fontWeight: 700 }}>
              {isUk ? "Перше заняття безкоштовно!" : "First lesson is free!"}
            </p>
            {trialSubmitted ? (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{ fontSize: 50 }}>✅</div>
                <h3 style={{ color: "#22D3EE", marginTop: 12 }}>{isUk ? "Заявку отримано!" : "Application received!"}</h3>
                <p style={{ color: "#94a3b8" }}>{isUk ? "Зв'яжемось протягом 2 годин." : "We'll reach out within 2 hours."}</p>
              </div>
            ) : (
              <div style={{ display: "grid", gap: 14 }}>
                {[
                  { key: "name", label: isUk ? "Ваше ім'я (батько/мама)" : "Parent's name", type: "text" },
                  { key: "childName", label: isUk ? "Ім'я дитини" : "Child's name", type: "text" },
                  { key: "age", label: isUk ? "Вік дитини" : "Child's age", type: "text" },
                  { key: "email", label: "Email", type: "email" },
                  { key: "phone", label: isUk ? "Телефон" : "Phone", type: "tel" },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ display: "block", fontWeight: 600, marginBottom: 4, fontSize: 13, color: "#94a3b8" }}>{f.label}</label>
                    <input type={f.type} value={trialForm[f.key as keyof typeof trialForm]}
                      onChange={e => setTrialForm(d => ({ ...d, [f.key]: e.target.value }))}
                      style={{ width: "100%", padding: "10px 12px", border: "1px solid rgba(59,130,246,0.3)", borderRadius: 10, fontSize: 14, background: "rgba(255,255,255,0.05)", color: "#fff", boxSizing: "border-box", outline: "none" }} />
                  </div>
                ))}
                <div>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: 4, fontSize: 13, color: "#94a3b8" }}>{isUk ? "Оберіть курс" : "Select course"}</label>
                  <select value={trialForm.course} onChange={e => setTrialForm(d => ({ ...d, course: e.target.value }))}
                    style={{ width: "100%", padding: "10px 12px", border: "1px solid rgba(59,130,246,0.3)", borderRadius: 10, fontSize: 14, background: "#1e293b", color: "#fff", outline: "none" }}>
                    <option value="">{isUk ? "— Оберіть —" : "— Select —"}</option>
                    {courses.map(c => <option key={c.id} value={isUk ? c.titleUk : c.titleEn}>{c.emoji} {isUk ? c.titleUk : c.titleEn}</option>)}
                  </select>
                </div>
                <button onClick={() => setTrialSubmitted(true)}
                  style={{ padding: "14px", background: "#3B82F6", color: "#fff", border: "none", borderRadius: 12, fontWeight: 800, fontSize: 16, cursor: "pointer", marginTop: 4 }}>
                  {isUk ? "Записати безкоштовно" : "Book for Free"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{ background: "rgba(255,255,255,0.03)", borderTop: "1px solid rgba(59,130,246,0.2)", padding: "24px", textAlign: "center", color: "#64748b", fontSize: 13 }}>
        🤖 RoboTech Kids · {isUk ? "просп. Перемоги 22, Київ · robotech.ua · +38 044 000 0000" : "22 Peremohy Ave, Kyiv · robotech.ua · +38 044 000 0000"}
      </div>
    </div>
  );
}
