import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BlogContent } from "../BlogContent";

jest.mock("next/link", () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
  MockLink.displayName = "MockLink";
  return MockLink;
});

jest.mock("@/components/layout/LocaleProvider", () => ({
  useLocale: () => "uk",
}));

jest.mock("@/components/ui/Pagination", () => ({
  Pagination: ({ totalPages, onPageChange }: { totalPages: number; onPageChange: (p: number) => void }) =>
    totalPages > 1 ? (
      <nav aria-label="pagination">
        <button onClick={() => onPageChange(2)}>2</button>
      </nav>
    ) : null,
}));

jest.mock("@/components/ui/NewsletterForm", () => ({
  NewsletterForm: () => <div data-testid="newsletter-form" />,
}));

jest.mock("@/lib/data/blog", () => ({
  BLOG_CATEGORIES: [
    { id: "all", label: { en: "All Articles", uk: "Всі" } },
    { id: "seo", label: { en: "SEO & Promotion", uk: "SEO та просування" }, icon: "🔍" },
    { id: "development", label: { en: "Web Development", uk: "Веб-розробка" }, icon: "🌐" },
  ],
  BLOG_POSTS: [
    {
      slug: "seo-guide",
      title: "Next.js та SEO: повний гід",
      excerpt: "Як налаштувати SEO у Next.js.",
      category: "SEO та просування",
      tags: ["Next.js", "SEO"],
      date: "2024-11-20",
      readTime: 12,
      author: "Олексій Коваленко",
      featured: true,
      emoji: "🚀",
      color: "from-indigo-500 to-violet-600",
    },
    {
      slug: "tailwind-css",
      title: "Tailwind CSS v4: дизайн-система",
      excerpt: "Огляд нових можливостей Tailwind v4.",
      category: "Веб-розробка",
      tags: ["Tailwind", "CSS"],
      date: "2024-11-10",
      readTime: 8,
      author: "Денис Бондаренко",
      featured: false,
      emoji: "🎨",
      color: "from-cyan-400 to-blue-500",
    },
    {
      slug: "ecommerce-next",
      title: "E-commerce на Next.js",
      excerpt: "Огляд підходів до інтернет-магазину.",
      category: "Веб-розробка",
      tags: ["Next.js", "E-commerce"],
      date: "2024-10-15",
      readTime: 10,
      author: "Марина Сидоренко",
      featured: false,
      emoji: "🛒",
      color: "from-emerald-400 to-teal-500",
    },
  ],
}));

describe("BlogContent", () => {
  it("відображає featured-пост", () => {
    render(<BlogContent />);
    expect(screen.getByText("Next.js та SEO: повний гід")).toBeInTheDocument();
  });

  it("показує Головна стаття label для featured", () => {
    render(<BlogContent />);
    expect(screen.getByText("Головна стаття")).toBeInTheDocument();
  });

  it("відображає решту постів (не featured) у сітці", () => {
    render(<BlogContent />);
    expect(screen.getByText("Tailwind CSS v4: дизайн-система")).toBeInTheDocument();
    expect(screen.getByText("E-commerce на Next.js")).toBeInTheDocument();
  });

  it("відображає поле пошуку", () => {
    render(<BlogContent />);
    expect(screen.getByPlaceholderText(/пошук статей/i)).toBeInTheDocument();
  });

  it("відображає кнопки категорій", () => {
    render(<BlogContent />);
    // Buttons include a count badge so accessible name is e.g. "Всі статті 2" — use regex
    expect(screen.getByRole("button", { name: /Всі статті/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /SEO та просування/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Веб-розробка/ })).toBeInTheDocument();
  });

  it("фільтрує за категорією 'Веб-розробка'", () => {
    render(<BlogContent />);
    fireEvent.click(screen.getByRole("button", { name: /Веб-розробка/ }));
    expect(screen.getByText("Tailwind CSS v4: дизайн-система")).toBeInTheDocument();
    // E-commerce post in mock also has category "Веб-розробка" — both should be visible
    expect(screen.getByText("E-commerce на Next.js")).toBeInTheDocument();
    // Featured section (SEO category) should be hidden when a category filter is active
    expect(screen.queryByText("Головна стаття")).not.toBeInTheDocument();
  });

  it("фільтрує за пошуковим запитом", () => {
    render(<BlogContent />);
    fireEvent.change(screen.getByPlaceholderText(/пошук статей/i), { target: { value: "tailwind" } });
    expect(screen.getByText("Tailwind CSS v4: дизайн-система")).toBeInTheDocument();
    expect(screen.queryByText("E-commerce на Next.js")).not.toBeInTheDocument();
  });

  it("фільтрує за тегом у пошуку", () => {
    render(<BlogContent />);
    fireEvent.change(screen.getByPlaceholderText(/пошук статей/i), { target: { value: "E-commerce" } });
    expect(screen.getByText("E-commerce на Next.js")).toBeInTheDocument();
    expect(screen.queryByText("Tailwind CSS v4: дизайн-система")).not.toBeInTheDocument();
  });

  it("показує кнопку очищення при непорожньому запиті", () => {
    render(<BlogContent />);
    fireEvent.change(screen.getByPlaceholderText(/пошук статей/i), { target: { value: "test" } });
    expect(screen.getByRole("button", { name: /очистити пошук/i })).toBeInTheDocument();
  });

  it("кнопка очищення скидає пошук", () => {
    render(<BlogContent />);
    fireEvent.change(screen.getByPlaceholderText(/пошук статей/i), { target: { value: "tailwind" } });
    fireEvent.click(screen.getByRole("button", { name: /очистити пошук/i }));
    expect(screen.getByText("Tailwind CSS v4: дизайн-система")).toBeInTheDocument();
    expect(screen.getByText("E-commerce на Next.js")).toBeInTheDocument();
  });

  it("відображає час читання поста", () => {
    render(<BlogContent />);
    expect(screen.getByText(/8 хв/)).toBeInTheDocument();
  });

  it("посилання на featured пост веде на /blog/[slug]", () => {
    render(<BlogContent />);
    const links = screen.getAllByRole("link", { name: /next.js та seo/i });
    expect(links[0]).toHaveAttribute("href", "/uk/blog/seo-guide");
  });

  it("відображає newsletter-форму", () => {
    render(<BlogContent />);
    expect(screen.getByTestId("newsletter-form")).toBeInTheDocument();
  });
});
