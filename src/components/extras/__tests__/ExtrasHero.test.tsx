import React from "react";
import { render, screen } from "@testing-library/react";
import { ExtrasHero } from "../ExtrasHero";

jest.mock("@/components/layout/LocaleProvider", () => ({
  useLocale: () => "uk",
}));

jest.mock("next/link", () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
  MockLink.displayName = "MockLink";
  return MockLink;
});

jest.mock("@/lib/data/extras", () => ({
  EXTRAS: [
    { id: "chatbot", title: "Telegram-бот", isPopular: true, isNew: false, category: "features", priceFrom: 4000, deliveryDays: 3, tags: [], emoji: "🤖", description: "" },
    { id: "seo-audit", title: "SEO-аудит", isPopular: true, isNew: false, category: "pages", priceFrom: 2000, deliveryDays: 2, tags: [], emoji: "📊", description: "" },
    { id: "chat-widget", title: "Чат-віджет", isPopular: false, isNew: true, category: "features", priceFrom: 800, deliveryDays: 1, tags: [], emoji: "💬", description: "" },
  ],
  EXTRA_CATEGORIES: [
    { value: "pages", label: "Сторінки", emoji: "📄" },
    { value: "features", label: "Функціонал", emoji: "⚙️" },
  ],
}));

describe("ExtrasHero", () => {
  it("відображає заголовок 'Доробки та модулі'", () => {
    render(<ExtrasHero lang="uk" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/доробки та/i);
  });

  it("показує загальну кількість доробок", () => {
    render(<ExtrasHero lang="uk" />);
    // Badge: "3 готових рішень", stats: "3+"
    expect(screen.getByText(/готових рішень/i)).toBeInTheDocument();
  });

  it("показує кількість популярних доробок", () => {
    render(<ExtrasHero lang="uk" />);
    expect(screen.getByText(/популярних доробок/i)).toBeInTheDocument();
  });

  it("показує мінімальну вартість", () => {
    render(<ExtrasHero lang="uk" />);
    expect(screen.getByText(/від 800 ₴/)).toBeInTheDocument();
  });

  it("показує строк виконання", () => {
    render(<ExtrasHero lang="uk" />);
    expect(screen.getByText(/1–14 днів/i)).toBeInTheDocument();
  });

  it("відображає категорії доробок", () => {
    render(<ExtrasHero lang="uk" />);
    expect(screen.getByText(/сторінки/i)).toBeInTheDocument();
    expect(screen.getByText(/функціонал/i)).toBeInTheDocument();
  });

  it("кнопка CTA веде на /contact", () => {
    render(<ExtrasHero lang="uk" />);
    const link = screen.getByRole("link", { name: /не знайшли потрібне/i });
    expect(link).toHaveAttribute("href", "/uk/contact");
  });

  it("відображає опис секції", () => {
    render(<ExtrasHero lang="uk" />);
    expect(screen.getByText(/вже маєте сайт/i)).toBeInTheDocument();
  });
});
