"use client";

import { useState } from "react";

interface Props {
  variant: string;
  isUk: boolean;
}

const IT_VACANCIES = [
  { id: 1, title: "Frontend Developer", titleUk: "Frontend розробник", dept: "Engineering", deptUk: "Розробка", type: "Remote", typeUk: "Дистанційно", salary: "$2,500–4,000", exp: "2+ years", expUk: "2+ роки", tags: ["React", "TypeScript", "Next.js"] },
  { id: 2, title: "UI/UX Designer", titleUk: "UI/UX Дизайнер", dept: "Design", deptUk: "Дизайн", type: "Hybrid", typeUk: "Гібрид", salary: "$1,800–2,800", exp: "1+ years", expUk: "1+ рік", tags: ["Figma", "Prototyping", "Research"] },
  { id: 3, title: "Backend Developer", titleUk: "Backend розробник", dept: "Engineering", deptUk: "Розробка", type: "Remote", typeUk: "Дистанційно", salary: "$3,000–5,000", exp: "3+ years", expUk: "3+ роки", tags: ["Node.js", "PostgreSQL", "Docker"] },
  { id: 4, title: "Project Manager", titleUk: "Проєктний менеджер", dept: "Management", deptUk: "Менеджмент", type: "Office", typeUk: "Офіс", salary: "$2,000–3,200", exp: "2+ years", expUk: "2+ роки", tags: ["Agile", "Jira", "Scrum"] },
  { id: 5, title: "QA Engineer", titleUk: "QA інженер", dept: "Engineering", deptUk: "Розробка", type: "Remote", typeUk: "Дистанційно", salary: "$1,500–2,500", exp: "1+ years", expUk: "1+ рік", tags: ["Selenium", "Cypress", "API Testing"] },
  { id: 6, title: "DevOps Engineer", titleUk: "DevOps інженер", dept: "Infrastructure", deptUk: "Інфраструктура", type: "Hybrid", typeUk: "Гібрид", salary: "$3,500–5,500", exp: "3+ years", expUk: "3+ роки", tags: ["AWS", "Kubernetes", "CI/CD"] },
];

function ITVacancyPage({ isUk }: { isUk: boolean }) {
  const [dept, setDept] = useState("All");
  const [type, setType] = useState("All");
  const [selected, setSelected] = useState<number | null>(null);
  const [applied, setApplied] = useState(false);

  const depts = isUk
    ? ["Всі", "Розробка", "Дизайн", "Менеджмент", "Інфраструктура"]
    : ["All", "Engineering", "Design", "Management", "Infrastructure"];
  const types = isUk
    ? ["Всі", "Дистанційно", "Гібрид", "Офіс"]
    : ["All", "Remote", "Hybrid", "Office"];

  const filtered = IT_VACANCIES.filter((v) => {
    const deptMatch = dept === "All" || dept === "Всі" || (isUk ? v.deptUk : v.dept) === dept;
    const typeMatch = type === "All" || type === "Всі" || (isUk ? v.typeUk : v.type) === type;
    return deptMatch && typeMatch;
  });

  const selectedVacancy = IT_VACANCIES.find((v) => v.id === selected);

  if (applied && selectedVacancy) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="font-heading text-2xl font-bold text-neutral-900 dark:text-white mb-2">
          {isUk ? "Резюме надіслано!" : "Application sent!"}
        </h3>
        <p className="text-neutral-500 dark:text-neutral-400 mb-2">
          {isUk ? `Вакансія: ${selectedVacancy.titleUk}` : `Position: ${selectedVacancy.title}`}
        </p>
        <p className="text-neutral-400 text-sm mb-8">
          {isUk ? "HR-менеджер зв'яжеться з вами протягом 3 робочих днів." : "Our HR manager will contact you within 3 business days."}
        </p>
        <button onClick={() => { setApplied(false); setSelected(null); }}
          className="px-6 py-2.5 rounded-xl bg-violet-600 text-white font-semibold">
          {isUk ? "Переглянути інші вакансії" : "Browse other positions"}
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-neutral-900 dark:text-white mb-2">
        {isUk ? "Вакансії — IT компанія" : "Job Board — IT Company"}
      </h2>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-8">
        {isUk ? "Фільтр за відділом та форматом, картки вакансій, модальна форма відгуку." : "Filter by department & type, vacancy cards, modal application form."}
      </p>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {depts.map((d) => (
            <button key={d} onClick={() => setDept(d)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${dept === d ? "bg-violet-600 text-white" : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-violet-50"}`}>
              {d}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {types.map((t) => (
            <button key={t} onClick={() => setType(t)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${type === t ? "bg-violet-600 text-white" : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-violet-50"}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-neutral-400 mb-4">
        {isUk ? `Знайдено: ${filtered.length} вакансій` : `Found: ${filtered.length} positions`}
      </p>

      {/* Vacancy cards */}
      <div className="space-y-3">
        {filtered.map((v) => (
          <div key={v.id}
            className="bg-white rounded-2xl border border-neutral-200 dark:border-neutral-700 p-5 hover:border-violet-300 hover:shadow-md transition-all cursor-pointer"
            onClick={() => setSelected(v.id)}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-neutral-900">{isUk ? v.titleUk : v.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    (isUk ? v.typeUk : v.type) === (isUk ? "Дистанційно" : "Remote") ? "bg-green-100 text-green-700" :
                    (isUk ? v.typeUk : v.type) === (isUk ? "Гібрид" : "Hybrid") ? "bg-blue-100 text-blue-700" :
                    "bg-amber-100 text-amber-700"
                  }`}>
                    {isUk ? v.typeUk : v.type}
                  </span>
                </div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">{isUk ? v.deptUk : v.dept} · {isUk ? v.expUk : v.exp}</p>
                <div className="flex flex-wrap gap-1.5">
                  {v.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 bg-violet-50 text-violet-700 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="shrink-0 text-right">
                <p className="font-bold text-violet-700 text-sm">{v.salary}</p>
                <p className="text-xs text-neutral-400">{isUk ? "на місяць" : "per month"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selected && selectedVacancy && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-heading text-xl font-bold text-neutral-900 dark:text-white mb-1">
              {isUk ? selectedVacancy.titleUk : selectedVacancy.title}
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">{selectedVacancy.salary} · {isUk ? selectedVacancy.expUk : selectedVacancy.exp}</p>
            <div className="space-y-3 mb-6">
              <input type="text" placeholder={isUk ? "Ваше ім'я *" : "Your name *"}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 focus:border-violet-400 focus:outline-none text-sm" />
              <input type="email" placeholder={isUk ? "Email *" : "Email *"}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 focus:border-violet-400 focus:outline-none text-sm" />
              <input type="url" placeholder={isUk ? "Посилання на резюме / LinkedIn" : "CV link / LinkedIn"}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 focus:border-violet-400 focus:outline-none text-sm" />
              <textarea rows={2} placeholder={isUk ? "Коротко про себе..." : "Brief about yourself..."}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 focus:border-violet-400 focus:outline-none text-sm resize-none" />
            </div>
            <div className="flex gap-3">
              <button onClick={() => setSelected(null)}
                className="flex-1 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 text-sm font-semibold hover:bg-neutral-50 dark:hover:bg-neutral-800 dark:bg-neutral-900 transition-colors">
                {isUk ? "Скасувати" : "Cancel"}
              </button>
              <button onClick={() => setApplied(true)}
                className="flex-1 py-3 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 transition-colors">
                {isUk ? "Надіслати" : "Apply"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const RETAIL_VACANCIES = [
  { id: 1, city: "Київ", cityEn: "Kyiv", title: "Продавець-консультант", titleEn: "Sales Consultant", salary: "18 000–24 000 ₴", schedule: "5/2", exp: "без досвіду", expEn: "no experience" },
  { id: 2, city: "Львів", cityEn: "Lviv", title: "Касир", titleEn: "Cashier", salary: "16 000–20 000 ₴", schedule: "2/2", exp: "без досвіду", expEn: "no experience" },
  { id: 3, city: "Харків", cityEn: "Kharkiv", title: "Адміністратор магазину", titleEn: "Store Administrator", salary: "22 000–30 000 ₴", schedule: "5/2", exp: "від 1 року", expEn: "1+ year" },
  { id: 4, city: "Одеса", cityEn: "Odesa", title: "Менеджер зі складу", titleEn: "Warehouse Manager", salary: "20 000–26 000 ₴", schedule: "2/2", exp: "від 6 міс", expEn: "6+ months" },
  { id: 5, city: "Дніпро", cityEn: "Dnipro", title: "Вантажник", titleEn: "Loader", salary: "18 000–22 000 ₴", schedule: "2/2", exp: "без досвіду", expEn: "no experience" },
];

function RetailVacancyPage({ isUk }: { isUk: boolean }) {
  const [city, setCity] = useState("All");
  const [applied, setApplied] = useState<number | null>(null);

  const cities = isUk ? ["Всі міста", "Київ", "Львів", "Харків", "Одеса", "Дніпро"] : ["All cities", "Kyiv", "Lviv", "Kharkiv", "Odesa", "Dnipro"];

  const filtered = RETAIL_VACANCIES.filter((v) =>
    city === "All" || city === "Всі міста" || (isUk ? v.city : v.cityEn) === city
  );

  if (applied !== null) {
    const v = RETAIL_VACANCIES.find((x) => x.id === applied);
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">✅</div>
        <h3 className="font-heading text-2xl font-bold text-neutral-900 dark:text-white mb-2">
          {isUk ? "Заявку надіслано!" : "Application sent!"}
        </h3>
        <p className="text-neutral-500 dark:text-neutral-400 mb-8">
          {isUk ? `Вакансія: ${v?.title} (${v?.city})` : `Position: ${v?.titleEn} (${v?.cityEn})`}
        </p>
        <button onClick={() => setApplied(null)}
          className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold">
          {isUk ? "Назад до вакансій" : "Back to vacancies"}
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-neutral-900 dark:text-white mb-2">
        {isUk ? "Вакансії — Роздрібна мережа" : "Job Board — Retail Chain"}
      </h2>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-8">
        {isUk ? "Фільтр за містом, компактні картки, швидкий відгук в один клік." : "City filter, compact cards, quick one-click application."}
      </p>

      {/* City tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {cities.map((c) => (
          <button key={c} onClick={() => setCity(c)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${city === c ? "bg-emerald-600 text-white" : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-emerald-50"}`}>
            {c}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((v) => (
          <div key={v.id} className="bg-white rounded-2xl border border-neutral-200 dark:border-neutral-700 p-5 flex items-center justify-between gap-4 hover:border-emerald-300 transition-all">
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs text-neutral-400">📍 {isUk ? v.city : v.cityEn}</span>
                <span className="text-xs text-neutral-300">·</span>
                <span className="text-xs text-neutral-400">🕐 {v.schedule}</span>
              </div>
              <h3 className="font-semibold text-neutral-900">{isUk ? v.title : v.titleEn}</h3>
              <p className="text-sm text-neutral-500">{isUk ? v.exp : v.expEn}</p>
            </div>
            <div className="shrink-0 text-right">
              <p className="font-bold text-emerald-700 text-sm mb-2">{v.salary}</p>
              <button onClick={() => setApplied(v.id)}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors whitespace-nowrap">
                {isUk ? "Відгукнутись" : "Apply now"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function VacancyDemo({ variant, isUk }: Props) {
  if (variant === "retail-vacancy") return <RetailVacancyPage isUk={isUk} />;
  return <ITVacancyPage isUk={isUk} />;
}
