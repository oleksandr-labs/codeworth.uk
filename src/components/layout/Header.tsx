"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ArrowRight, Rocket } from "lucide-react";
import { EmojiIcon } from "@/components/ui/EmojiIcon";
import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LogoWordmark } from "@/components/ui/Logo";
import { SERVICES_DATA, getServiceLocalized } from "@/lib/data/services";
import { analytics } from "@/lib/analytics";

const NAV_LINKS_UK = [
  { label: "Послуги", href: "/services" },
  { label: "Портфоліо", href: "/portfolio" },
  { label: "Ціни", href: "/pricing" },
  { label: "Блог", href: "/blog" },
  { label: "Про нас", href: "/about" },
];

const NAV_LINKS_EN = [
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

const LANGUAGES = [
  { code: "en", flag: "🇬🇧", label: "English" },
  { code: "uk", flag: "🇺🇦", label: "Українська" },
];

export function Header() {
  const params = useParams();
  const pathname = usePathname();
  const lang = (params?.lang as string) ?? "en";
  const NAV_LINKS = lang === "uk" ? NAV_LINKS_UK : NAV_LINKS_EN;

  const lp = (path: string) => lang === "en" ? (path || "/") : `/${lang}${path}`;

  const pathWithoutLocale = pathname.replace(new RegExp(`^/(en|uk)`), "") || "/";
  const enPath = pathWithoutLocale || "/";
  const ukPath = `/uk${pathWithoutLocale}`;

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const servicesTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const solutionsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const servicesButtonRef = useRef<HTMLButtonElement>(null);
  const langMenuRef = useRef<HTMLDivElement>(null);

  const openServices = () => {
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    setServicesOpen(true);
  };
  const closeServices = () => {
    servicesTimeoutRef.current = setTimeout(() => setServicesOpen(false), 150);
  };
  const openSolutions = () => {
    if (solutionsTimeoutRef.current) clearTimeout(solutionsTimeoutRef.current);
    setSolutionsOpen(true);
  };
  const closeSolutions = () => {
    solutionsTimeoutRef.current = setTimeout(() => setSolutionsOpen(false), 150);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!servicesOpen && !solutionsOpen && !isMobileOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (servicesOpen) { setServicesOpen(false); servicesButtonRef.current?.focus(); }
        if (solutionsOpen) setSolutionsOpen(false);
        if (isMobileOpen) setIsMobileOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [servicesOpen, solutionsOpen, isMobileOpen]);

  // Close lang menu on outside click
  useEffect(() => {
    if (!langMenuOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [langMenuOpen]);

  const desktopLinks = NAV_LINKS.filter(
    (l) => l.href !== "/services"
  );

  const currentLang = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/85 dark:bg-neutral-950/85 backdrop-blur-md border-b",
        isScrolled
          ? "border-neutral-200/60 dark:border-neutral-800/60 shadow-sm"
          : "border-transparent"
      )}
    >
      <Container>
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href={lp("/")} className="group hover:opacity-90 transition-opacity">
            <LogoWordmark size={36} />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {/* Services mega-menu dropdown */}
            <div className="relative" onMouseEnter={openServices} onMouseLeave={closeServices}>
              <button
                ref={servicesButtonRef}
                aria-expanded={servicesOpen}
                aria-haspopup="true"
                aria-controls="services-menu"
                onClick={() => setServicesOpen((v) => !v)}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-all duration-150"
              >
                {lang === "uk" ? "Послуги" : "Services"}
                <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", servicesOpen && "rotate-180")} />
              </button>
              {servicesOpen && (
                <div
                  id="services-menu"
                  role="menu"
                  className="absolute top-full left-0 mt-1 w-120 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-700 shadow-2xl shadow-neutral-900/10 p-4 z-50"
                >
                  <div className="grid grid-cols-2 gap-1 mb-3">
                    {SERVICES_DATA.map((s) => {
                      const sl = lang === "uk" ? s : (getServiceLocalized(s.slug, lang) ?? s);
                      const SIcon = s.icon;
                      return (
                        <Link
                          key={s.slug}
                          href={lp(`/services/${s.slug}`)}
                          role="menuitem"
                          onClick={() => setServicesOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-colors group"
                        >
                          <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", s.bg)}>
                            <SIcon className={cn("w-4 h-4", s.iconColor)} />
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-medium text-neutral-800 dark:text-neutral-200 group-hover:text-indigo-700 dark:group-hover:text-indigo-400 truncate transition-colors">
                              {sl.shortTitle}
                            </div>
                            <div className="text-xs text-neutral-400">{lang === "uk" ? "від" : "from"} {sl.priceFrom}</div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                  <div className="border-t border-neutral-100 dark:border-neutral-800 pt-3 space-y-1">
                    <div className="flex items-center justify-between">
                      <Link
                        href={lp("/extras")}
                        onClick={() => setServicesOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-violet-700 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/30 transition-colors"
                      >
                        ⚡ {lang === "uk" ? "Доробки та модулі" : "Add-ons & Modules"}
                      </Link>
                      <Link
                        href={lp("/services")}
                        onClick={() => setServicesOpen(false)}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-colors"
                      >
                        {lang === "uk" ? "Всі послуги" : "All services"}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                    <div className="flex gap-1 pt-1">
                      <Link
                        href={lp("/ai")}
                        onClick={() => setServicesOpen(false)}
                        className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-indigo-700 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-colors"
                      >
                        🤖 AI Solutions
                      </Link>
                      <Link
                        href={lp("/ml")}
                        onClick={() => setServicesOpen(false)}
                        className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-violet-700 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/30 transition-colors"
                      >
                        📊 ML Solutions
                      </Link>
                    </div>
                    <div className="flex gap-1">
                      <Link
                        href={lp("/compare")}
                        onClick={() => setServicesOpen(false)}
                        className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                      >
                        ⚖️ {lang === "uk" ? "Порівняти рішення" : "Compare solutions"}
                      </Link>
                      <Link
                        href={lp("/resources")}
                        onClick={() => setServicesOpen(false)}
                        className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                      >
                        📚 {lang === "uk" ? "Ресурси" : "Resources"}
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Remaining desktop links */}
            {desktopLinks.map((link) => (
              <Link
                key={link.href}
                href={lp(link.href)}
                className="px-3 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-all duration-150"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />

            {/* Language dropdown */}
            <div ref={langMenuRef} className="relative">
              <button
                onClick={() => setLangMenuOpen((v) => !v)}
                aria-expanded={langMenuOpen}
                aria-haspopup="listbox"
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-all duration-150"
              >
                <span className="text-base leading-none">{currentLang.flag}</span>
                <span className="uppercase text-xs font-semibold tracking-wide">{lang}</span>
                <ChevronDown className={cn("w-3 h-3 transition-transform duration-200", langMenuOpen && "rotate-180")} />
              </button>
              {langMenuOpen && (
                <div
                  role="listbox"
                  className="absolute right-0 top-full mt-1.5 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-xl shadow-neutral-900/10 py-1 min-w-[160px] z-50"
                >
                  {LANGUAGES.map((l) => (
                    <Link
                      key={l.code}
                      href={l.code === "en" ? enPath : ukPath}
                      role="option"
                      aria-selected={lang === l.code}
                      onClick={() => {
                        setLangMenuOpen(false);
                        if (lang !== l.code) analytics.languageSwitch(lang, l.code);
                      }}
                      className={cn(
                        "flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors hover:bg-indigo-50 dark:hover:bg-indigo-950/50",
                        lang === l.code
                          ? "text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50/60 dark:bg-indigo-950/30"
                          : "text-neutral-700 dark:text-neutral-300"
                      )}
                    >
                      <span className="text-base leading-none">{l.flag}</span>
                      {l.label}
                      {lang === l.code && <span className="ml-auto text-indigo-500 dark:text-indigo-400">✓</span>}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href={lp("/contact")}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl bg-linear-to-r from-indigo-600 to-indigo-700 text-white hover:from-indigo-700 hover:to-indigo-800 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-200 hover:-translate-y-0.5"
            >
              <Rocket className="w-3.5 h-3.5" />
              {lang === "uk" ? "Безкоштовна консультація" : "Free consultation"}
            </Link>
          </div>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center gap-1">
            <ThemeToggle />
            {/* Mobile lang toggle (simple, no dropdown) */}
            <Link
              href={lang === "en" ? ukPath : enPath}
              title={lang === "uk" ? "Switch to English" : "Перейти на українську"}
              className="flex items-center gap-1 p-2 rounded-lg text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-sm"
              onClick={() => analytics.languageSwitch(lang, lang === "en" ? "uk" : "en")}
            >
              <span className="text-base leading-none">{lang === "en" ? "🇺🇦" : "🇬🇧"}</span>
            </Link>
            <button
              className="p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label={isMobileOpen ? (lang === "uk" ? "Закрити меню" : "Close menu") : (lang === "uk" ? "Відкрити меню" : "Open menu")}
              aria-expanded={isMobileOpen}
              aria-controls="mobile-menu"
            >
              {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile menu */}
      {isMobileOpen && (
        <div id="mobile-menu" className="md:hidden bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800 shadow-lg">
          <Container className="py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={lp(link.href)}
                className="px-4 py-3 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 rounded-xl transition-all"
                onClick={() => setIsMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 mt-2 flex flex-col gap-2">
              {/* Language options in mobile menu */}
              <div className="flex gap-2">
                {LANGUAGES.map((l) => (
                  <Link
                    key={l.code}
                    href={l.code === "en" ? enPath : ukPath}
                    onClick={() => {
                      setIsMobileOpen(false);
                      if (lang !== l.code) analytics.languageSwitch(lang, l.code);
                    }}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm rounded-xl border transition-colors",
                      lang === l.code
                        ? "border-indigo-300 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-400 font-semibold"
                        : "border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:border-indigo-200 dark:hover:border-indigo-800"
                    )}
                  >
                    <span className="text-base leading-none">{l.flag}</span>
                    {l.label}
                  </Link>
                ))}
              </div>
              <Link
                href={lp("/contact")}
                className="block text-center px-5 py-3 text-sm font-semibold rounded-xl bg-linear-to-r from-indigo-600 to-indigo-700 text-white"
                onClick={() => setIsMobileOpen(false)}
              >
                {lang === "uk" ? "Отримати консультацію" : "Get a consultation"}
              </Link>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
