"use client";

import { useEffect, useState } from "react";
import { List, ChevronRight } from "lucide-react";

interface Props {
  variant?: string;
  isUk: boolean;
}

const SECTIONS = [
  { id: "intro", titleEn: "Introduction", titleUk: "Вступ" },
  { id: "why", titleEn: "Why It Matters", titleUk: "Чому це важливо" },
  { id: "how", titleEn: "How It Works", titleUk: "Як це працює" },
  { id: "examples", titleEn: "Real Examples", titleUk: "Реальні приклади" },
  { id: "summary", titleEn: "Summary", titleUk: "Підсумок" },
];

const LOREM = {
  intro: { en: "This article walks through what sticky sidebars are and how to use them effectively in long-form content.", uk: "Стаття пояснює, що таке sticky sidebar та як ефективно використовувати їх у довгому контенті." },
  why: { en: "Sticky sidebars keep navigation in view, reducing scroll fatigue and improving reading flow by up to 35%.", uk: "Sticky sidebar тримає навігацію у видимості, зменшуючи втому від скролу на 35%." },
  how: { en: "Pure CSS with position: sticky combined with IntersectionObserver for active-section highlighting.", uk: "Чистий CSS з position: sticky плюс IntersectionObserver для підсвічування активної секції." },
  examples: { en: "Used by Stripe Docs, GitHub Docs, MDN — all proven UX patterns at scale.", uk: "Використовується у Stripe Docs, GitHub Docs, MDN — перевірені UX-патерни." },
  summary: { en: "Sticky sidebars work best when content is >1500 words and has clear hierarchical sections.", uk: "Sticky sidebar найкраще працює для контенту >1500 слів з чіткою ієрархією." },
};

export function StickySidebarDemo({ isUk }: Props) {
  const [active, setActive] = useState("intro");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );

    SECTIONS.forEach((s) => {
      const el = document.getElementById(`section-${s.id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="space-y-6">
      <p className="text-sm text-neutral-500">
        {isUk
          ? "Прокрутіть контент справа — TOC зліва підсвічує активну секцію."
          : "Scroll content on the right — left TOC highlights the active section."}
      </p>

      <div className="rounded-2xl border border-neutral-200 bg-white overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          {/* Sticky TOC */}
          <aside className="md:col-span-4 lg:col-span-3 bg-neutral-50 p-5 border-b md:border-b-0 md:border-r border-neutral-200">
            <div className="md:sticky md:top-4">
              <div className="flex items-center gap-2 mb-3 text-xs uppercase tracking-wider text-neutral-500 font-semibold">
                <List className="w-3.5 h-3.5" />
                {isUk ? "Зміст" : "Contents"}
              </div>
              <nav className="space-y-1">
                {SECTIONS.map((s) => (
                  <a
                    key={s.id}
                    href={`#section-${s.id}`}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm transition-all ${
                      active === s.id
                        ? "bg-indigo-600 text-white font-semibold"
                        : "text-neutral-600 hover:bg-indigo-50"
                    }`}
                  >
                    {active === s.id && <ChevronRight className="w-3.5 h-3.5 shrink-0" />}
                    {isUk ? s.titleUk : s.titleEn}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Scrollable content */}
          <main className="md:col-span-8 lg:col-span-9 max-h-[500px] overflow-y-auto p-6">
            {SECTIONS.map((s) => (
              <section key={s.id} id={`section-${s.id}`} className="mb-12 scroll-mt-4">
                <h3 className="text-xl font-bold text-neutral-900 mb-3">
                  {isUk ? s.titleUk : s.titleEn}
                </h3>
                <p className="text-neutral-600 leading-relaxed mb-3">
                  {isUk ? LOREM[s.id as keyof typeof LOREM].uk : LOREM[s.id as keyof typeof LOREM].en}
                </p>
                <p className="text-neutral-500 leading-relaxed text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </section>
            ))}
          </main>
        </div>
      </div>
    </div>
  );
}
