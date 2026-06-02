import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { PriceCalculator } from "../PriceCalculator";

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

describe("PriceCalculator", () => {
  it("відображає заголовок калькулятора", () => {
    render(<PriceCalculator />);
    expect(screen.getByText(/розрахуйте вартість проєкту/i)).toBeInTheDocument();
  });

  it("відображає всі типи проєктів", () => {
    render(<PriceCalculator />);
    expect(screen.getByRole("button", { name: /лендінг/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /корпоративний сайт/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /інтернет-магазин/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /портал/i })).toBeInTheDocument();
  });

  it("початкова ціна відповідає базовій вартості лендінгу (8 000 грн)", () => {
    render(<PriceCalculator />);
    expect(screen.getAllByText(/8[\s\u00a0]*000\s*₴/).length).toBeGreaterThan(0);
  });

  it("зміна типу проєкту оновлює ціну", () => {
    render(<PriceCalculator />);
    fireEvent.click(screen.getByRole("button", { name: /корпоративний сайт/i }));
    expect(screen.getAllByText(/20[\s\u00a0]*000\s*₴/).length).toBeGreaterThan(0);
  });

  it("відображає список додаткових функцій", () => {
    render(<PriceCalculator />);
    expect(screen.getByText(/CMS/i)).toBeInTheDocument();
    expect(screen.getByText(/SEO-оптимізація/i)).toBeInTheDocument();
    expect(screen.getByText(/блог/i)).toBeInTheDocument();
  });

  it("додавання функції збільшує загальну вартість", () => {
    render(<PriceCalculator />);
    // Initial price: 8000 (landing), after adding CMS (+5000) = 13000
    fireEvent.click(screen.getByRole("button", { name: /CMS/i }));
    expect(screen.getAllByText(/13[\s\u00a0]*000\s*₴/).length).toBeGreaterThan(0);
  });

  it("повторне натискання на функцію прибирає її і ціну", () => {
    render(<PriceCalculator />);
    const cmsBtn = screen.getByRole("button", { name: /CMS/i });
    fireEvent.click(cmsBtn); // додати
    fireEvent.click(cmsBtn); // прибрати
    expect(screen.getAllByText(/8[\s\u00a0]*000\s*₴/).length).toBeGreaterThan(0);
  });

  it("відображає плани підтримки", () => {
    render(<PriceCalculator />);
    expect(screen.getByRole("button", { name: /без підтримки/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /lite/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /pro/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /full/i })).toBeInTheDocument();
  });

  it("вибір плану підтримки показує щомісячну вартість", () => {
    render(<PriceCalculator />);
    fireEvent.click(screen.getByRole("button", { name: /^Pro/i }));
    expect(screen.getByText(/7[\s\u00a0]*000\s*₴\/місяць/i)).toBeInTheDocument();
  });

  it("'Без підтримки' не показує щомісячну вартість", () => {
    render(<PriceCalculator />);
    fireEvent.click(screen.getByRole("button", { name: /^Pro/i }));
    fireEvent.click(screen.getByRole("button", { name: /без підтримки/i }));
    expect(screen.queryByText(/\/місяць/i)).not.toBeInTheDocument();
  });

  it("кнопка 'Замовити консультацію' веде на /contact", () => {
    render(<PriceCalculator />);
    const link = screen.getByRole("link", { name: /замовити консультацію/i });
    expect(link.getAttribute("href")).toContain("/contact");
  });

  it("посилання консультації містить тип проєкту і бюджет", () => {
    render(<PriceCalculator />);
    const link = screen.getByRole("link", { name: /замовити консультацію/i });
    const href = link.getAttribute("href") ?? "";
    expect(href).toContain("service=");
    expect(href).toContain("budget=");
  });

  it("після вибору кількох функцій показує рядок 'Разом'", () => {
    render(<PriceCalculator />);
    fireEvent.click(screen.getByRole("button", { name: /CMS/i }));
    expect(screen.getByText(/разом/i)).toBeInTheDocument();
  });
});
