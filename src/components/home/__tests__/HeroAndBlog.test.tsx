import React from "react";
import { render, screen } from "@testing-library/react";
import { HeroSection } from "../HeroSection";
import { BlogPreviewSection } from "../BlogPreviewSection";

jest.mock("next/link", () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
  MockLink.displayName = "MockLink";
  return MockLink;
});

jest.mock("@/components/layout/Container", () => ({
  Container: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock("@/components/ui/CountUp", () => ({
  CountUp: ({ end, suffix }: { end: number; suffix?: string }) => (
    <span>{end}{suffix}</span>
  ),
}));

jest.mock("@/components/ui/Button", () => ({
  Button: ({ children, href }: { children: React.ReactNode; href?: string }) => (
    <a href={href}>{children}</a>
  ),
}));

jest.mock("@/components/layout/LocaleProvider", () => ({
  useLocale: () => "uk",
}));

jest.mock("@/lib/data/blog", () => ({
  BLOG_POSTS: [
    {
      slug: "seo-tips",
      title: "SEO поради для бізнесу",
      excerpt: "Основи SEO для малого бізнесу",
      category: "SEO",
      date: "2026-01-15",
      readTime: 5,
      color: "from-indigo-400 to-indigo-600",
      emoji: "🔍",
      featured: false,
      tags: ["SEO", "бізнес"],
    },
    {
      slug: "nextjs-guide",
      title: "Next.js для початківців",
      excerpt: "Починаємо з Next.js App Router",
      category: "Розробка",
      date: "2026-01-20",
      readTime: 8,
      color: "from-blue-400 to-blue-600",
      emoji: "⚡",
      featured: false,
      tags: ["Next.js"],
    },
    {
      slug: "ux-design",
      title: "UX дизайн для конверсій",
      excerpt: "Як дизайн впливає на продажі",
      category: "Дизайн",
      date: "2026-02-01",
      readTime: 6,
      color: "from-pink-400 to-pink-600",
      emoji: "🎨",
      featured: false,
      tags: ["UX", "дизайн"],
    },
  ],
}));

// ── HeroSection ────────────────────────────────────────────────────────
describe("HeroSection", () => {
  it("відображає головний заголовок", () => {
    render(<HeroSection />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("відображає статистику — 120+ проєктів", () => {
    render(<HeroSection />);
    expect(screen.getByText(/120\+/)).toBeInTheDocument();
  });

  it("відображає статистику — клієнтів і роки роботи", () => {
    render(<HeroSection />);
    expect(screen.getAllByText(/проєктів/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/клієнтів/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/роки роботи/i)).toBeInTheDocument();
  });

  it("кнопка 'Отримати консультацію' веде на /contact", () => {
    render(<HeroSection />);
    const link = screen.getByRole("link", { name: /отримати консультацію/i });
    expect(link).toHaveAttribute("href", "/uk/contact");
  });

  it("кнопка 'Дивитися портфоліо' веде на /portfolio", () => {
    render(<HeroSection />);
    const link = screen.getByRole("link", { name: /дивитися портфоліо/i });
    expect(link).toHaveAttribute("href", "/uk/portfolio");
  });

  it("відображає технологічний стек", () => {
    render(<HeroSection />);
    expect(screen.getByText("Next.js")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Tailwind")).toBeInTheDocument();
  });

  it("містить badge про прийом нових проєктів", () => {
    render(<HeroSection />);
    expect(screen.getByText(/приймаємо нові проєкти/i)).toBeInTheDocument();
  });
});

// ── BlogPreviewSection ─────────────────────────────────────────────────
describe("BlogPreviewSection", () => {
  it("відображає заголовок секції 'Останні статті'", () => {
    render(<BlogPreviewSection lang="uk" />);
    expect(screen.getByText(/останні статті/i)).toBeInTheDocument();
  });

  it("відображає 3 останніх пости", () => {
    render(<BlogPreviewSection lang="uk" />);
    expect(screen.getByText("SEO поради для бізнесу")).toBeInTheDocument();
    expect(screen.getByText("Next.js для початківців")).toBeInTheDocument();
    expect(screen.getByText("UX дизайн для конверсій")).toBeInTheDocument();
  });

  it("кожен пост веде на відповідний slug", () => {
    render(<BlogPreviewSection lang="uk" />);
    const seoLink = screen.getByRole("link", { name: /SEO поради для бізнесу/i });
    expect(seoLink).toHaveAttribute("href", "/uk/blog/seo-tips");
  });

  it("посилання 'Читати всі' веде на /blog", () => {
    render(<BlogPreviewSection lang="uk" />);
    expect(screen.getByRole("link", { name: /читати всі/i })).toHaveAttribute("href", "/uk/blog");
  });

  it("відображає категорії постів", () => {
    render(<BlogPreviewSection lang="uk" />);
    expect(screen.getByText("SEO")).toBeInTheDocument();
    expect(screen.getByText("Розробка")).toBeInTheDocument();
    expect(screen.getByText("Дизайн")).toBeInTheDocument();
  });
});
