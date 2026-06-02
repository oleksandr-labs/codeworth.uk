"use client";
import { useState } from "react";

type Priority = "High" | "Medium" | "Low";
type Column = "todo" | "inprogress" | "review" | "done";

interface Task {
  id: number;
  title: string;
  assignee: string;
  color: string;
  priority: Priority;
  tag: string;
  column: Column;
}

const PRIORITY_STYLE: Record<Priority, { bg: string; color: string; labelUk: string }> = {
  High: { bg: "#FEE2E2", color: "#DC2626", labelUk: "Високий" },
  Medium: { bg: "#FEF3C7", color: "#D97706", labelUk: "Середній" },
  Low: { bg: "#DCFCE7", color: "#16A34A", labelUk: "Низький" },
};

const AVATAR_COLORS = ["#2563EB", "#7C3AED", "#DB2777", "#0D9488", "#EA580C", "#16A34A"];

const INITIAL_TASKS: Task[] = [
  { id: 1, title: "Design system audit", assignee: "AM", color: AVATAR_COLORS[0], priority: "High", tag: "Design", column: "todo" },
  { id: 2, title: "API rate limiting", assignee: "DK", color: AVATAR_COLORS[1], priority: "High", tag: "Backend", column: "todo" },
  { id: 3, title: "Onboarding flow", assignee: "IV", color: AVATAR_COLORS[2], priority: "Medium", tag: "Product", column: "inprogress" },
  { id: 4, title: "Performance dashboard", assignee: "MS", color: AVATAR_COLORS[3], priority: "Medium", tag: "Frontend", column: "inprogress" },
  { id: 5, title: "Mobile responsive fix", assignee: "AH", color: AVATAR_COLORS[4], priority: "Low", tag: "Frontend", column: "review" },
  { id: 6, title: "Security audit", assignee: "VP", color: AVATAR_COLORS[5], priority: "High", tag: "Infra", column: "review" },
  { id: 7, title: "Email notifications", assignee: "NK", color: AVATAR_COLORS[0], priority: "Low", tag: "Backend", column: "done" },
  { id: 8, title: "User analytics", assignee: "RM", color: AVATAR_COLORS[1], priority: "Medium", tag: "Product", column: "done" },
];

const COLUMN_ORDER: Column[] = ["todo", "inprogress", "review", "done"];

const INTEGRATIONS = ["Slack", "GitHub", "Figma", "Google Drive", "Notion", "Zoom", "Linear", "Jira"];

const COMPARISON = [
  { feature: "Free tier", featureUk: "Безкоштовний план", taskflow: true, jira: false, trello: true, asana: true },
  { feature: "Kanban + List + Timeline", featureUk: "Kanban + Список + Timeline", taskflow: true, jira: true, trello: false, asana: true },
  { feature: "Native time tracking", featureUk: "Власний облік часу", taskflow: true, jira: false, trello: false, asana: false },
  { feature: "SOC2 certified", featureUk: "Сертифікат SOC2", taskflow: true, jira: true, trello: false, asana: true },
  { feature: "AI task suggestions", featureUk: "AI підказки завдань", taskflow: true, jira: false, trello: false, asana: false },
];

export function TaskFlowDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [showAddInput, setShowAddInput] = useState(false);
  const [pricingAnnual, setPricingAnnual] = useState(false);

  const getColumnLabel = (col: Column): string => {
    const labels: Record<Column, { en: string; uk: string }> = {
      todo: { en: "To Do", uk: "До виконання" },
      inprogress: { en: "In Progress", uk: "В роботі" },
      review: { en: "Review", uk: "На огляді" },
      done: { en: "Done", uk: "Готово" },
    };
    return isUk ? labels[col].uk : labels[col].en;
  };

  const moveTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const idx = COLUMN_ORDER.indexOf(t.column);
        if (idx < COLUMN_ORDER.length - 1) return { ...t, column: COLUMN_ORDER[idx + 1] };
        return t;
      })
    );
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const newTask: Task = {
      id: Date.now(),
      title: newTaskTitle.trim(),
      assignee: "ME",
      color: AVATAR_COLORS[tasks.length % AVATAR_COLORS.length],
      priority: "Medium",
      tag: "Task",
      column: "todo",
    };
    setTasks((prev) => [...prev, newTask]);
    setNewTaskTitle("");
    setShowAddInput(false);
  };

  const pricing = [
    {
      name: isUk ? "Безкоштовний" : "Free",
      price: 0,
      priceAnnual: 0,
      limit: isUk ? "до 5 користувачів" : "up to 5 users",
      features: [isUk ? "Необмежені задачі" : "Unlimited tasks", isUk ? "Базовий Kanban" : "Basic Kanban", "5 GB"],
    },
    {
      name: "Pro",
      price: 15,
      priceAnnual: 12,
      limit: isUk ? "/ користувач / міс" : "/ user / mo",
      features: [isUk ? "Все у Free" : "All Free", isUk ? "Часовий облік" : "Time tracking", isUk ? "Пріоритетна підтримка" : "Priority support"],
    },
    {
      name: "Business",
      price: 25,
      priceAnnual: 20,
      limit: isUk ? "/ користувач / міс" : "/ user / mo",
      features: [isUk ? "Все у Pro" : "All Pro", "SOC2", isUk ? "SAML SSO" : "SAML SSO"],
    },
  ];

  const colBg: Record<Column, string> = {
    todo: "#F8FAFC",
    inprogress: "#EFF6FF",
    review: "#FFFBEB",
    done: "#F0FDF4",
  };

  const colBorder: Record<Column, string> = {
    todo: "#E2E8F0",
    inprogress: "#BFDBFE",
    review: "#FDE68A",
    done: "#BBF7D0",
  };

  const colCount = (col: Column) => tasks.filter((t) => t.column === col).length;

  return (
    <div style={{ background: "#FFFFFF", color: "#0F172A", fontFamily: "'Inter', sans-serif", minHeight: "100vh" }}>
      {/* NAV */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #E2E8F0", padding: "0 24px" }} className="flex items-center justify-between h-16">
        <span style={{ fontWeight: 800, fontSize: 20 }}>
          <span style={{ color: "#2563EB" }}>Task</span><span style={{ color: "#0F172A" }}>Flow</span>
        </span>
        <div className="hidden md:flex gap-6 text-sm" style={{ color: "#64748B" }}>
          {[isUk ? "Функції" : "Features", isUk ? "Тарифи" : "Pricing", isUk ? "Команди" : "Teams"].map((l) => (
            <span key={l} style={{ cursor: "pointer" }}>{l}</span>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={{ background: "transparent", border: "1px solid #E2E8F0", color: "#0F172A", borderRadius: 8, padding: "8px 16px", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
            {isUk ? "Увійти" : "Log in"}
          </button>
          <button style={{ background: "#2563EB", color: "#fff", borderRadius: 8, padding: "8px 18px", fontWeight: 700, fontSize: 13, border: "none", cursor: "pointer" }}>
            {isUk ? "Спробувати" : "Get started"}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ padding: "64px 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center", maxWidth: 1100, margin: "0 auto" }}>
        <div>
          <div style={{ display: "inline-block", background: "#EFF6FF", borderRadius: 100, padding: "4px 14px", fontSize: 11, color: "#2563EB", fontWeight: 700, marginBottom: 20, letterSpacing: 0.5 }}>
            {isUk ? "УПРАВЛІННЯ ПРОЄКТАМИ" : "PROJECT MANAGEMENT SAAS"}
          </div>
          <h1 style={{ fontSize: "clamp(26px, 3.5vw, 44px)", fontWeight: 800, lineHeight: 1.1, marginBottom: 16, color: "#0F172A" }}>
            {isUk ? "Проєкти під контролем." : "Projects under control."}<br />
            <span style={{ color: "#2563EB" }}>{isUk ? "Команда в синхроні." : "Team in sync."}</span>
          </h1>
          <p style={{ color: "#64748B", fontSize: 16, marginBottom: 28, lineHeight: 1.6 }}>
            {isUk ? "Kanban, списки, часовий облік — все в одному місці для вашої команди." : "Kanban, lists, time tracking — all in one place for your team."}
          </p>
          <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
            <button style={{ background: "#2563EB", color: "#fff", borderRadius: 8, padding: "12px 24px", fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer" }}>
              {isUk ? "Безкоштовно" : "Start for free"}
            </button>
            <button style={{ background: "transparent", border: "1px solid #E2E8F0", color: "#0F172A", borderRadius: 8, padding: "12px 24px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
              {isUk ? "Демо" : "Watch demo"}
            </button>
          </div>
          <div style={{ display: "flex", gap: 20, fontSize: 13, color: "#64748B", flexWrap: "wrap" }}>
            <span>⭐ {isUk ? "12,000+ команд" : "12,000+ teams"}</span>
            <span>⭐ 4.8 G2</span>
            <span>🔒 SOC2</span>
          </div>
        </div>
        {/* Mock kanban preview */}
        <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 14, padding: 16, boxShadow: "0 8px 32px rgba(37,99,235,0.08)" }}>
          <div style={{ background: "#fff", borderBottom: "1px solid #E2E8F0", borderRadius: "10px 10px 0 0", padding: "10px 14px", display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FCA5A5" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FDE68A" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#86EFAC" }} />
            <div style={{ marginLeft: 8, fontSize: 12, color: "#64748B", fontWeight: 600 }}>TaskFlow — Sprint 14</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
            {COLUMN_ORDER.map((col) => (
              <div key={col} style={{ background: colBg[col], border: `1px solid ${colBorder[col]}`, borderRadius: 8, padding: 8 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#64748B", marginBottom: 6, textTransform: "uppercase" }}>{getColumnLabel(col)}</div>
                {tasks.filter((t) => t.column === col).slice(0, 2).map((t) => (
                  <div key={t.id} style={{ background: "#fff", borderRadius: 6, padding: "6px 8px", marginBottom: 4, fontSize: 10, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
                    <div style={{ color: "#0F172A", fontWeight: 600, lineHeight: 1.3, marginBottom: 4 }}>{t.title}</div>
                    <div style={{ width: 18, height: 18, borderRadius: "50%", background: t.color, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 8, color: "#fff", fontWeight: 700 }}>{t.assignee}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE KANBAN */}
      <section style={{ background: "#EFF6FF", padding: "64px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>{isUk ? "Інтерактивна дошка" : "Interactive Board"}</h2>
              <p style={{ color: "#64748B", fontSize: 13 }}>{isUk ? "Натисніть на задачу, щоб перемістити її на крок вперед" : "Click a task to move it one step forward"}</p>
            </div>
            <button onClick={() => setShowAddInput((v) => !v)} style={{ background: "#2563EB", color: "#fff", border: "none", borderRadius: 8, padding: "10px 18px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
              + {isUk ? "Нова задача" : "Add task"}
            </button>
          </div>

          {showAddInput && (
            <form onSubmit={addTask} style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
              <input
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder={isUk ? "Назва задачі..." : "Task title..."}
                autoFocus
                style={{ flex: 1, minWidth: 200, background: "#fff", border: "1px solid #BFDBFE", borderRadius: 8, padding: "10px 14px", fontSize: 14, color: "#0F172A", outline: "none" }}
              />
              <button type="submit" style={{ background: "#2563EB", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
                {isUk ? "Додати" : "Add"}
              </button>
              <button type="button" onClick={() => setShowAddInput(false)} style={{ background: "transparent", border: "1px solid #E2E8F0", color: "#64748B", borderRadius: 8, padding: "10px 16px", fontSize: 14, cursor: "pointer" }}>
                {isUk ? "Скасувати" : "Cancel"}
              </button>
            </form>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {COLUMN_ORDER.map((col) => (
              <div key={col}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <span style={{ fontWeight: 700, fontSize: 14, color: "#0F172A" }}>{getColumnLabel(col)}</span>
                  <span style={{ background: "#E2E8F0", color: "#64748B", borderRadius: 100, padding: "2px 8px", fontSize: 12, fontWeight: 700 }}>{colCount(col)}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {tasks.filter((t) => t.column === col).map((task) => {
                    const pStyle = PRIORITY_STYLE[task.priority];
                    const isDone = task.column === "done";
                    return (
                      <div
                        key={task.id}
                        onClick={() => !isDone && moveTask(task.id)}
                        style={{
                          background: "#fff",
                          border: "1px solid #E2E8F0",
                          borderRadius: 10,
                          padding: 14,
                          cursor: isDone ? "default" : "pointer",
                          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                          transition: "box-shadow 0.15s",
                          opacity: isDone ? 0.75 : 1,
                        }}
                      >
                        <div style={{ fontWeight: 600, fontSize: 14, color: "#0F172A", marginBottom: 10, lineHeight: 1.3 }}>{task.title}</div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                            <div style={{ width: 26, height: 26, borderRadius: "50%", background: task.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, flexShrink: 0 }}>
                              {task.assignee}
                            </div>
                            <span style={{ background: "#F1F5F9", color: "#64748B", borderRadius: 4, padding: "2px 7px", fontSize: 11, fontWeight: 600 }}>{task.tag}</span>
                          </div>
                          <span style={{ background: pStyle.bg, color: pStyle.color, borderRadius: 100, padding: "3px 8px", fontSize: 11, fontWeight: 700 }}>
                            {isUk ? pStyle.labelUk : task.priority}
                          </span>
                        </div>
                        {!isDone && (
                          <div style={{ marginTop: 8, fontSize: 11, color: "#93C5FD" }}>
                            → {isUk ? "Натисни, щоб перемістити" : "Click to advance"}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section style={{ padding: "64px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8, textAlign: "center" }}>{isUk ? "Порівняння" : "How we compare"}</h2>
          <p style={{ textAlign: "center", color: "#64748B", fontSize: 14, marginBottom: 36 }}>
            {isUk ? "TaskFlow проти популярних альтернатив" : "TaskFlow vs. popular alternatives"}
          </p>
          <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 12, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#F8FAFC" }}>
                  <th style={{ padding: "14px 20px", textAlign: "left", fontSize: 13, fontWeight: 700, color: "#0F172A" }}>{isUk ? "Функція" : "Feature"}</th>
                  {["TaskFlow", "Jira", "Trello", "Asana"].map((tool) => (
                    <th key={tool} style={{ padding: "14px 16px", textAlign: "center", fontSize: 13, fontWeight: 700, color: tool === "TaskFlow" ? "#2563EB" : "#64748B" }}>{tool}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr key={row.feature} style={{ borderTop: "1px solid #F1F5F9", background: i % 2 === 0 ? "#fff" : "#FAFBFC" }}>
                    <td style={{ padding: "12px 20px", fontSize: 14, fontWeight: 500 }}>{isUk ? row.featureUk : row.feature}</td>
                    {[row.taskflow, row.jira, row.trello, row.asana].map((val, ci) => (
                      <td key={ci} style={{ padding: "12px 16px", textAlign: "center" }}>
                        {val
                          ? <span style={{ color: ci === 0 ? "#2563EB" : "#16A34A", fontSize: 16 }}>✓</span>
                          : <span style={{ color: "#CBD5E1", fontSize: 16 }}>✗</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section style={{ background: "#EFF6FF", padding: "64px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>{isUk ? "Тарифи" : "Pricing"}</h2>
          <div style={{ display: "inline-flex", background: "#fff", border: "1px solid #BFDBFE", borderRadius: 8, padding: 4, marginBottom: 32 }}>
            {[false, true].map((a) => (
              <button key={String(a)} onClick={() => setPricingAnnual(a)}
                style={{ padding: "8px 20px", borderRadius: 6, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13, background: pricingAnnual === a ? "#2563EB" : "transparent", color: pricingAnnual === a ? "#fff" : "#64748B" }}>
                {a ? (isUk ? "Річний −20%" : "Annual −20%") : (isUk ? "Щомісячний" : "Monthly")}
              </button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
            {pricing.map((p, i) => (
              <div key={p.name} style={{ background: "#fff", border: `1px solid ${i === 1 ? "#2563EB" : "#BFDBFE"}`, borderRadius: 12, padding: 24, position: "relative" }}>
                {i === 1 && (
                  <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "#2563EB", color: "#fff", borderRadius: 100, padding: "3px 12px", fontSize: 11, fontWeight: 700, whiteSpace: "nowrap" }}>
                    {isUk ? "Найпопулярніший" : "Most popular"}
                  </div>
                )}
                <h3 style={{ fontWeight: 800, fontSize: 18, marginBottom: 4 }}>{p.name}</h3>
                <div style={{ fontSize: 30, fontWeight: 900, color: "#2563EB", marginBottom: 4 }}>
                  {p.price === 0 ? (isUk ? "Безкоштовно" : "Free") : `$${pricingAnnual ? p.priceAnnual : p.price}`}
                </div>
                <div style={{ fontSize: 12, color: "#94A3B8", marginBottom: 16 }}>{p.limit}</div>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px", fontSize: 13, color: "#475569" }}>
                  {p.features.map((f) => <li key={f} style={{ padding: "4px 0" }}>✓ {f}</li>)}
                </ul>
                <button style={{ width: "100%", background: i === 1 ? "#2563EB" : "#EFF6FF", color: i === 1 ? "#fff" : "#2563EB", border: `1px solid ${i === 1 ? "#2563EB" : "#BFDBFE"}`, borderRadius: 8, padding: "10px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
                  {isUk ? "Почати" : "Get started"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTEGRATIONS */}
      <section style={{ padding: "64px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>{isUk ? "Інтеграції" : "Integrations"}</h2>
          <p style={{ color: "#64748B", fontSize: 14, marginBottom: 32 }}>{isUk ? "Підключайте улюблені інструменти" : "Connect your favorite tools"}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center" }}>
            {INTEGRATIONS.map((tool) => (
              <div key={tool} style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 10, padding: "12px 20px", fontWeight: 600, fontSize: 14, color: "#0F172A", display: "flex", alignItems: "center", gap: 8, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
                <span style={{ width: 24, height: 24, borderRadius: 6, background: "#EFF6FF", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>
                  {tool[0]}
                </span>
                {tool}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section style={{ background: "#0F172A", padding: "48px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", gap: 32, justifyContent: "center", flexWrap: "wrap", textAlign: "center" }}>
          {[
            { v: "12,000+", l: isUk ? "Команд" : "Teams" },
            { v: "4.8★", l: "G2" },
            { v: "SOC2", l: isUk ? "Сертифікований" : "Certified" },
            { v: "99.9%", l: isUk ? "Аптайм" : "Uptime" },
          ].map((s) => (
            <div key={s.v}>
              <div style={{ fontSize: 32, fontWeight: 900, color: "#2563EB" }}>{s.v}</div>
              <div style={{ fontSize: 13, color: "#94A3B8", marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #E2E8F0", padding: "32px 24px", textAlign: "center", color: "#94A3B8", fontSize: 13 }}>
        <span style={{ fontWeight: 800, color: "#0F172A" }}><span style={{ color: "#2563EB" }}>Task</span>Flow</span> &copy; 2024 ·{" "}
        {isUk ? "Управління проєктами для сучасних команд" : "Project management for modern teams"}
      </footer>
    </div>
  );
}
