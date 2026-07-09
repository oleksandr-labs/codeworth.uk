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
    expect(screen.getByText(/розрахуйте орієнтовну вартість/i)).toBeInTheDocument();
  });

  it("відображає всі типи ML-проєктів", () => {
    render(<PriceCalculator />);
    expect(screen.getByRole("button", { name: /PoC \/ Proof of Concept/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Production ML-модель/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Кастомна NLP-система/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Комп'ютерний зір/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Enterprise ML-платформа/i })).toBeInTheDocument();
  });

  it("початкова ціна відповідає базовій вартості PoC (£1,800)", () => {
    render(<PriceCalculator />);
    expect(screen.getAllByText(/£1,800/).length).toBeGreaterThan(0);
  });

  it("зміна типу проєкту оновлює ціну", () => {
    render(<PriceCalculator />);
    fireEvent.click(screen.getByRole("button", { name: /Production ML-модель/i }));
    expect(screen.getAllByText(/£4,500/).length).toBeGreaterThan(0);
  });

  it("відображає список додаткових компонентів", () => {
    render(<PriceCalculator />);
    expect(screen.getByText(/Data labelling & annotation/i)).toBeInTheDocument();
    expect(screen.getByText(/MLOps pipeline setup/i)).toBeInTheDocument();
    expect(screen.getByText(/On-prem deployment/i)).toBeInTheDocument();
  });

  it("додавання компонента збільшує загальну вартість", () => {
    render(<PriceCalculator />);
    // Initial price: £1,800 (PoC), after adding Data labelling (+£800) = £2,600
    fireEvent.click(screen.getByRole("button", { name: /Data labelling & annotation/i }));
    expect(screen.getAllByText(/£2,600/).length).toBeGreaterThan(0);
  });

  it("повторне натискання на компонент прибирає його і ціну", () => {
    render(<PriceCalculator />);
    const featureBtn = screen.getByRole("button", { name: /Data labelling & annotation/i });
    fireEvent.click(featureBtn); // додати
    fireEvent.click(featureBtn); // прибрати
    expect(screen.getAllByText(/£1,800/).length).toBeGreaterThan(0);
  });

  it("відображає плани MLOps-підтримки", () => {
    render(<PriceCalculator />);
    expect(screen.getByRole("button", { name: /Без підтримки/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Basic MLOps/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Professional/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Enterprise \(custom\)/i })).toBeInTheDocument();
  });

  it("вибір плану Professional показує щомісячну вартість MLOps", () => {
    render(<PriceCalculator />);
    fireEvent.click(screen.getByRole("button", { name: /^Professional/i }));
    expect(screen.getByText(/£1,500\/міс MLOps/i)).toBeInTheDocument();
  });

  it("'Без підтримки' не показує щомісячну вартість", () => {
    render(<PriceCalculator />);
    fireEvent.click(screen.getByRole("button", { name: /^Professional/i }));
    fireEvent.click(screen.getByRole("button", { name: /^Без підтримки/i }));
    expect(screen.queryByText(/\/міс MLOps/i)).not.toBeInTheDocument();
  });

  it("кнопка 'Замовити безкоштовну консультацію' веде на /contact", () => {
    render(<PriceCalculator />);
    const link = screen.getByRole("link", { name: /замовити безкоштовну консультацію/i });
    expect(link.getAttribute("href")).toContain("/contact");
  });

  it("посилання консультації містить тип проєкту і бюджет", () => {
    render(<PriceCalculator />);
    const link = screen.getByRole("link", { name: /замовити безкоштовну консультацію/i });
    const href = link.getAttribute("href") ?? "";
    expect(href).toContain("service=");
    expect(href).toContain("budget=");
  });

  it("після вибору кількох компонентів показує рядок 'Разом'", () => {
    render(<PriceCalculator />);
    fireEvent.click(screen.getByRole("button", { name: /Data labelling & annotation/i }));
    expect(screen.getByText(/разом/i)).toBeInTheDocument();
  });
});
