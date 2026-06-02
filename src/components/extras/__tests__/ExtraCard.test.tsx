import React from "react";
import { render, screen } from "@testing-library/react";
import { ExtraCard } from "../ExtraCard";
import type { Extra } from "@/lib/data/extras";

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

const BASE_EXTRA: Extra = {
  id: "chatbot",
  title: "Telegram-бот для замовлень",
  description: "Автоматизація прийому замовлень через Telegram.",
  emoji: "🤖",
  tags: ["Telegram", "Автоматизація"],
  priceFrom: 4000,
  deliveryDays: 3,
  category: "features",
  isNew: false,
  isPopular: false,
  hasDemo: false,
};

describe("ExtraCard", () => {
  it("відображає назву", () => {
    render(<ExtraCard extra={BASE_EXTRA} />);
    expect(screen.getByText("Telegram-бот для замовлень")).toBeInTheDocument();
  });

  it("відображає опис", () => {
    render(<ExtraCard extra={BASE_EXTRA} />);
    expect(screen.getByText(/Автоматизація прийому замовлень/i)).toBeInTheDocument();
  });

  it("відображає emoji", () => {
    render(<ExtraCard extra={BASE_EXTRA} />);
    expect(screen.getByText("🤖")).toBeInTheDocument();
  });

  it("відображає теги", () => {
    render(<ExtraCard extra={BASE_EXTRA} />);
    expect(screen.getByText("Telegram")).toBeInTheDocument();
    expect(screen.getByText("Автоматизація")).toBeInTheDocument();
  });

  it("відображає ціну 'Від' (UK locale → ₴)", () => {
    render(<ExtraCard extra={BASE_EXTRA} />);
    expect(screen.getByText(/4\s*000\s*₴/)).toBeInTheDocument();
  });

  it("відображає кількість днів доставки", () => {
    render(<ExtraCard extra={BASE_EXTRA} />);
    expect(screen.getByText(/3\s*д\./)).toBeInTheDocument();
  });

  it("посилання веде на /contact з правильними параметрами", () => {
    render(<ExtraCard extra={BASE_EXTRA} />);
    const link = screen.getByRole("link", { name: /замовити/i });
    expect(link.getAttribute("href")).toContain("/contact");
    expect(link.getAttribute("href")).toContain("extra=chatbot");
  });

  it("не показує badge 'New' якщо isNew=false", () => {
    render(<ExtraCard extra={BASE_EXTRA} />);
    expect(screen.queryByText("New")).not.toBeInTheDocument();
  });

  it("показує badge 'New' якщо isNew=true", () => {
    render(<ExtraCard extra={{ ...BASE_EXTRA, isNew: true }} />);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("показує badge 'Популярне' якщо isPopular=true", () => {
    render(<ExtraCard extra={{ ...BASE_EXTRA, isPopular: true }} />);
    expect(screen.getByText("Популярне")).toBeInTheDocument();
  });

  it("не показує badge 'Популярне' якщо isPopular=false", () => {
    render(<ExtraCard extra={BASE_EXTRA} />);
    expect(screen.queryByText("Популярне")).not.toBeInTheDocument();
  });
});
