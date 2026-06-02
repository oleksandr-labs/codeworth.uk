"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { GLOSSARY_TERMS, GLOSSARY_CATEGORIES, type GlossaryCategory } from "@/lib/data/glossary";
import { Search, ArrowRight } from "lucide-react";

interface Props {
  lang: string;
  isUk: boolean;
}

export function GlossaryClient({ lang, isUk }: Props) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<GlossaryCategory | "all">("all");

  const filtered = useMemo(() => {
    return GLOSSARY_TERMS.filter((t) => {
      const matchCat = activeCategory === "all" || t.category === activeCategory;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        t.termUk.toLowerCase().includes(q) ||
        t.termEn.toLowerCase().includes(q) ||
        t.shortDescription.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [search, activeCategory]);

  const heading = isUk
    ? "Глосарій веб-розробки та цифрового маркетингу"
    : "Web Development & Digital Marketing Glossary";
  const subheading = isUk
    ? "60+ ключових термінів: SEO, API, CMS, Core Web Vitals, PWA та багато іншого. Зрозуміло — без жаргону."
    : "60+ key terms: SEO, API, CMS, Core Web Vitals, PWA, and more. Clear explanations — no jargon.";

  return (
    <main>
      {/* Hero */}
      <section className="bg-linear-to-br from-indigo-900 via-indigo-800 to-purple-900 py-16 sm:py-20">
        <Container>
          <nav className="mb-6 text-sm text-indigo-300" aria-label="Breadcrumb">
            <Link href={`/${lang}`} className="hover:text-white transition-colors">
              {isUk ? "Головна" : "Home"}
            </Link>
            <span className="mx-2">›</span>
            <span className="text-white">{isUk ? "Глосарій" : "Glossary"}</span>
          </nav>
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">{heading}</h1>
            <p className="text-indigo-200 text-lg mb-8">{subheading}</p>
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={isUk ? "Пошук терміну…" : "Search term…"}
                aria-label={isUk ? "Пошук терміну" : "Search term"}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-base"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Category filters */}
      <section className="bg-white border-b sticky top-0 z-10">
        <Container>
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide" role="tablist" aria-label={isUk ? "Категорії" : "Categories"}>
            <button
              role="tab"
              aria-selected={activeCategory === "all"}
              onClick={() => setActiveCategory("all")}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === "all"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {isUk ? "Всі" : "All"} ({GLOSSARY_TERMS.length})
            </button>
            {GLOSSARY_CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                role="tab"
                aria-selected={activeCategory === cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  activeCategory === cat.value
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat.emoji} {isUk ? cat.label : cat.labelEn}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Terms grid */}
      <section className="py-12 bg-gray-50 min-h-100">
        <Container>
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-500" role="status">
              {isUk ? "Нічого не знайдено" : "No results found"}
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-6" role="status" aria-live="polite">
                {isUk ? `Знайдено ${filtered.length} термінів` : `Found ${filtered.length} terms`}
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((term) => {
                  const catMeta = GLOSSARY_CATEGORIES.find((c) => c.value === term.category);
                  return (
                    <Link
                      key={term.slug}
                      href={`/${lang}/glossary/${term.slug}`}
                      className="bg-white rounded-xl p-5 border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                          {catMeta?.emoji} {isUk ? catMeta?.label : catMeta?.labelEn}
                        </span>
                        <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-500 transition-colors shrink-0" aria-hidden="true" />
                      </div>
                      <h2 className="font-semibold text-gray-900 mb-1 group-hover:text-indigo-700 transition-colors">
                        {term.termUk}
                      </h2>
                      {term.termEn !== term.termUk && (
                        <p className="text-xs text-gray-400 mb-2">{term.termEn}</p>
                      )}
                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">{term.shortDescription}</p>
                    </Link>
                  );
                })}
              </div>
            </>
          )}
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 bg-indigo-600">
        <Container>
          <div className="text-center text-white">
            <h2 className="text-2xl font-bold mb-3">
              {isUk ? "Потрібна консультація фахівця?" : "Need Expert Consultation?"}
            </h2>
            <p className="text-indigo-200 mb-6 max-w-lg mx-auto">
              {isUk
                ? "Codeworth реалізує все, про що написано в цьому глосарії — від SSG та Schema.org до PWA та AI-інтеграцій."
                : "Codeworth implements everything in this glossary — from SSG and Schema.org to PWA and AI integrations."}
            </p>
            <Link
              href={`/${lang}/contact`}
              className="inline-flex items-center gap-2 bg-white text-indigo-600 font-semibold px-8 py-3 rounded-xl hover:bg-indigo-50 transition-colors"
            >
              {isUk ? "Безкоштовна консультація" : "Free Consultation"}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
