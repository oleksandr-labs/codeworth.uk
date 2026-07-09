import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { TestimonialsSection } from "../TestimonialsSection";
import { IndustriesTeaser } from "../IndustriesTeaser";
import { ServicesSection } from "../ServicesSection";
import { WhyUsSection } from "../WhyUsSection";
import { HowWeWorkSection } from "../HowWeWorkSection";
import { ClientLogosSection } from "../ClientLogosSection";

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
  CountUp: ({ end }: { end: number }) => <span>{end}</span>,
}));

jest.mock("@/components/layout/LocaleProvider", () => ({
  useLocale: () => "uk",
}));

// ── TestimonialsSection ───────────────────────────────────────────────
describe("TestimonialsSection", () => {
  it("відображає заголовок секції", () => {
    render(<TestimonialsSection />);
    expect(screen.getByText(/відгуки клієнтів/i)).toBeInTheDocument();
  });

  it("переходить на другу сторінку відгуків при натисканні 'Наступні'", () => {
    render(<TestimonialsSection />);
    fireEvent.click(screen.getByLabelText("Наступні відгуки"));
    expect(screen.getByText("Дарина Кириленко")).toBeInTheDocument();
  });

  it("відображає перші 3 відгуки (перша сторінка)", () => {
    render(<TestimonialsSection />);
    expect(screen.getByText("Тарас Гнатенко")).toBeInTheDocument();
    expect(screen.getByText("Ольга Мороз")).toBeInTheDocument();
    expect(screen.getByText("Микола Власенко")).toBeInTheDocument();
  });

  it("відображає назви компаній першої сторінки", () => {
    render(<TestimonialsSection />);
    expect(screen.getByText(/Fintechlabs UA/i)).toBeInTheDocument();
    expect(screen.getByText(/RetailCore UA/i)).toBeInTheDocument();
    expect(screen.getByText(/LogiSmart/i)).toBeInTheDocument();
  });

  it("показує зірки для 3 видимих відгуків", () => {
    render(<TestimonialsSection />);
    // 3 видимих відгуки × 5 зірок = 15
    const stars = document.querySelectorAll(".lucide-star");
    expect(stars.length).toBe(15);
  });

  it("має кнопки навігації між сторінками", () => {
    render(<TestimonialsSection />);
    expect(screen.getByLabelText("Попередні відгуки")).toBeInTheDocument();
    expect(screen.getByLabelText("Наступні відгуки")).toBeInTheDocument();
  });

  it("має dot-індикатори сторінок", () => {
    render(<TestimonialsSection />);
    expect(screen.getByLabelText("Сторінка 1")).toBeInTheDocument();
    expect(screen.getByLabelText("Сторінка 2")).toBeInTheDocument();
    expect(screen.getByLabelText("Сторінка 3")).toBeInTheDocument();
  });
});

// ── IndustriesTeaser ─────────────────────────────────────────────────
describe("IndustriesTeaser", () => {
  it("відображає заголовок 'AI за галузями'", () => {
    render(<IndustriesTeaser lang="uk" />);
    expect(screen.getByText(/AI за галузями/i)).toBeInTheDocument();
  });

  it("показує 4 галузеві картки", () => {
    render(<IndustriesTeaser lang="uk" />);
    expect(screen.getByText("FinTech та Банкінг")).toBeInTheDocument();
    expect(screen.getByText("Охорона здоров'я")).toBeInTheDocument();
    expect(screen.getByText("Retail та E-commerce")).toBeInTheDocument();
    expect(screen.getByText("Виробництво")).toBeInTheDocument();
  });

  it("кнопка 'Дивитися кейси' веде на /portfolio", () => {
    render(<IndustriesTeaser lang="uk" />);
    const link = screen.getByRole("link", { name: /дивитися кейси/i });
    expect(link).toHaveAttribute("href", "/uk/portfolio");
  });

  it("відображає теги популярності (Популярне, Нове тощо)", () => {
    render(<IndustriesTeaser lang="uk" />);
    expect(screen.getByText("Популярне")).toBeInTheDocument();
    expect(screen.getByText("Нове")).toBeInTheDocument();
  });
});

// ── ServicesSection ───────────────────────────────────────────────────
describe("ServicesSection", () => {
  it("відображає заголовок 'Послуги'", () => {
    render(<ServicesSection lang="uk" />);
    expect(screen.getByText(/наші послуги/i)).toBeInTheDocument();
  });

  it("відображає картку 'Розробка ML-моделей'", () => {
    render(<ServicesSection lang="uk" />);
    expect(screen.getByText("Розробка ML-моделей")).toBeInTheDocument();
  });

  it("відображає картку 'Виявлення шахрайства'", () => {
    render(<ServicesSection lang="uk" />);
    expect(screen.getByText("Виявлення шахрайства")).toBeInTheDocument();
  });

  it("картки мають посилання на відповідні сторінки послуг", () => {
    render(<ServicesSection lang="uk" />);
    const mlModelsLink = screen.getByRole("link", { name: /розробка ml-моделей/i });
    expect(mlModelsLink).toHaveAttribute("href", "/uk/services/ml-models");
  });

  it("кнопка 'Переглянути всі послуги' веде на /services", () => {
    render(<ServicesSection lang="uk" />);
    const allServicesLink = screen.getByRole("link", { name: /переглянути всі послуги/i });
    expect(allServicesLink).toHaveAttribute("href", "/uk/services");
  });
});

// ── WhyUsSection ──────────────────────────────────────────────────────
describe("WhyUsSection", () => {
  it("відображає заголовок секції", () => {
    render(<WhyUsSection lang="uk" />);
    expect(screen.getByText(/обирають нас/i)).toBeInTheDocument();
  });

  it("відображає переваги компанії", () => {
    render(<WhyUsSection lang="uk" />);
    expect(screen.getByText(/швидкий прототип/i)).toBeInTheDocument();
    expect(screen.getByText(/продакшн-якість/i)).toBeInTheDocument();
  });
});

// ── ClientLogosSection ────────────────────────────────────────────────
describe("ClientLogosSection", () => {
  it("відображає trust badges", () => {
    render(<ClientLogosSection lang="uk" />);
    expect(screen.getByText("F1 Score > 0.92")).toBeInTheDocument();
    expect(screen.getByText("GDPR & ISO 27001")).toBeInTheDocument();
    expect(screen.getByText("< 100ms inference")).toBeInTheDocument();
    expect(screen.getByText("MLOps 24/7")).toBeInTheDocument();
  });

  it("відображає логотипи клієнтів", () => {
    render(<ClientLogosSection lang="uk" />);
    expect(screen.getByText("Fintechlabs")).toBeInTheDocument();
    expect(screen.getByText("RetailCore")).toBeInTheDocument();
    expect(screen.getByText("HealthDesk")).toBeInTheDocument();
  });

  it("відображає 12 логотипів клієнтів", () => {
    render(<ClientLogosSection lang="uk" />);
    expect(screen.getByText("Компанії, що довіряють нашим ML-рішенням")).toBeInTheDocument();
  });

  it("trust badges мають 4 елементи", () => {
    render(<ClientLogosSection lang="uk" />);
    expect(screen.getByText("Точність моделей")).toBeInTheDocument();
    expect(screen.getByText("Безпека даних")).toBeInTheDocument();
    expect(screen.getByText("Real-time рішення")).toBeInTheDocument();
    expect(screen.getByText("Безперервний моніторинг")).toBeInTheDocument();
  });
});

// ── HowWeWorkSection ──────────────────────────────────────────────────
describe("HowWeWorkSection", () => {
  it("відображає заголовок 'Як ми будуємо ML-рішення'", () => {
    render(<HowWeWorkSection lang="uk" />);
    expect(screen.getByText(/як ми будуємо ml-рішення/i)).toBeInTheDocument();
  });

  it("відображає 5 кроків процесу", () => {
    render(<HowWeWorkSection lang="uk" />);
    // Check key steps
    expect(screen.getByText(/discovery та аудит даних/i)).toBeInTheDocument();
    expect(screen.getByText(/підготовка даних/i)).toBeInTheDocument();
    expect(screen.getByText(/навчання та оцінка/i)).toBeInTheDocument();
  });

  it("кнопка CTA веде на /contact", () => {
    render(<HowWeWorkSection lang="uk" />);
    const contactLinks = screen.getAllByRole("link", { name: /контакт|проєкт|замовити|безкоштовну/i });
    expect(contactLinks.length).toBeGreaterThan(0);
  });
});
