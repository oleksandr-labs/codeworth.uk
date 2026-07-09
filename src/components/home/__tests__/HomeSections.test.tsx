/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

// Standard mocks
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

jest.mock("next/image", () => {
  const MockImage = ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  );
  MockImage.displayName = "MockImage";
  return MockImage;
});

// Mock Container to render children directly
jest.mock("@/components/layout/Container", () => ({
  Container: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock lucide-react icons to avoid SVG rendering issues
jest.mock("lucide-react", () => {
  const icon = (name: string) => {
    const Icon = () => <svg data-testid={`icon-${name}`} />;
    Icon.displayName = name;
    return Icon;
  };
  return {
    ArrowRight: icon("ArrowRight"),
    Clock: icon("Clock"),
    Shield: icon("Shield"),
    Award: icon("Award"),
    Zap: icon("Zap"),
    FileSearch: icon("FileSearch"),
    Palette: icon("Palette"),
    Code2: icon("Code2"),
    Rocket: icon("Rocket"),
    Database: icon("Database"),
    Activity: icon("Activity"),
    LifeBuoy: icon("LifeBuoy"),
    Utensils: icon("Utensils"),
    Scissors: icon("Scissors"),
    Stethoscope: icon("Stethoscope"),
    ShoppingBag: icon("ShoppingBag"),
    ShoppingCart: icon("ShoppingCart"),
    Banknote: icon("Banknote"),
    Building2: icon("Building2"),
    Star: icon("Star"),
    ChevronLeft: icon("ChevronLeft"),
    ChevronRight: icon("ChevronRight"),
  };
});

import { BlogPreviewSection } from "../BlogPreviewSection";
import { ClientLogosSection } from "../ClientLogosSection";
import { HowWeWorkSection } from "../HowWeWorkSection";
import { IndustriesTeaser } from "../IndustriesTeaser";
import { TestimonialsSection } from "../TestimonialsSection";

// ─────────────────────────────────────────────
// BlogPreviewSection
// ─────────────────────────────────────────────
describe("BlogPreviewSection", () => {
  it("renders without error", () => {
    const { container } = render(<BlogPreviewSection lang="uk" />);
    expect(container).toBeTruthy();
  });

  it("shows Ukrainian heading and label", () => {
    render(<BlogPreviewSection lang="uk" />);
    expect(screen.getByText("Блог")).toBeInTheDocument();
    expect(screen.getByText("Останні статті")).toBeInTheDocument();
  });

  it("shows subtitle copy", () => {
    render(<BlogPreviewSection lang="uk" />);
    expect(
      screen.getByText("Корисний контент про ML, AI та підготовку даних.")
    ).toBeInTheDocument();
  });

  it("renders 'Читати всі' links that point to /uk/blog", () => {
    render(<BlogPreviewSection lang="uk" />);
    // Both desktop and mobile versions of the link are rendered
    const links = screen.getAllByRole("link", { name: /читати всі|всі статті/i });
    links.forEach((link) => expect(link).toHaveAttribute("href", "/uk/blog"));
  });
});

// ─────────────────────────────────────────────
// ClientLogosSection
// ─────────────────────────────────────────────
describe("ClientLogosSection", () => {
  it("renders without error", () => {
    const { container } = render(<ClientLogosSection lang="uk" />);
    expect(container).toBeTruthy();
  });

  it("shows trust-badge labels for Ukrainian locale", () => {
    render(<ClientLogosSection lang="uk" />);
    expect(screen.getByText("F1 Score > 0.92")).toBeInTheDocument();
    expect(screen.getByText("GDPR & ISO 27001")).toBeInTheDocument();
    expect(screen.getByText("< 100ms inference")).toBeInTheDocument();
    expect(screen.getByText("MLOps 24/7")).toBeInTheDocument();
  });

  it("shows the trusted-companies tagline", () => {
    render(<ClientLogosSection lang="uk" />);
    expect(
      screen.getByText("Компанії, що довіряють нашим ML-рішенням")
    ).toBeInTheDocument();
  });

  it("renders all 12 client logo entries", () => {
    render(<ClientLogosSection lang="uk" />);
    expect(screen.getByText("Fintechlabs")).toBeInTheDocument();
    expect(screen.getByText("AgroTrack")).toBeInTheDocument();
    // Total count: 12 named clients
    const clients = [
      "Fintechlabs", "RetailCore", "HealthDesk", "LogiSmart",
      "ShopIQ", "AgroTrack", "DocuFlow", "SecureID",
      "MarketBoost", "TriageAI", "VoiceIQ", "ContentForge",
    ];
    clients.forEach((name) => expect(screen.getByText(name)).toBeInTheDocument());
  });
});

// ─────────────────────────────────────────────
// HowWeWorkSection
// ─────────────────────────────────────────────
describe("HowWeWorkSection", () => {
  it("renders without error", () => {
    const { container } = render(<HowWeWorkSection lang="uk" />);
    expect(container).toBeTruthy();
  });

  it("shows Ukrainian section heading", () => {
    render(<HowWeWorkSection lang="uk" />);
    expect(screen.getByText("Як ми будуємо ML-рішення")).toBeInTheDocument();
    expect(screen.getByText("Процес")).toBeInTheDocument();
  });

  it("renders all 5 step titles", () => {
    render(<HowWeWorkSection lang="uk" />);
    expect(screen.getByText("Discovery та аудит даних")).toBeInTheDocument();
    expect(screen.getByText("Підготовка даних")).toBeInTheDocument();
    expect(screen.getByText("Навчання та оцінка")).toBeInTheDocument();
    expect(screen.getByText("Деплой та інтеграція")).toBeInTheDocument();
    expect(screen.getByText("Моніторинг та перенавчання")).toBeInTheDocument();
  });

  it("CTA link points to /uk/contact", () => {
    render(<HowWeWorkSection lang="uk" />);
    const cta = screen.getByRole("link", { name: /почати ml-проєкт/i });
    expect(cta).toHaveAttribute("href", "/uk/contact");
  });
});

// ─────────────────────────────────────────────
// IndustriesTeaser
// ─────────────────────────────────────────────
describe("IndustriesTeaser", () => {
  it("renders without error", () => {
    const { container } = render(<IndustriesTeaser lang="uk" />);
    expect(container).toBeTruthy();
  });

  it("shows Ukrainian heading copy", () => {
    render(<IndustriesTeaser lang="uk" />);
    expect(screen.getByText(/AI за галузями/i)).toBeInTheDocument();
    expect(screen.getByText(/AI\/ML рішення для/i)).toBeInTheDocument();
    expect(screen.getByText("вашої галузі")).toBeInTheDocument();
  });

  it("renders all 4 industry cards", () => {
    render(<IndustriesTeaser lang="uk" />);
    expect(screen.getByText("FinTech та Банкінг")).toBeInTheDocument();
    expect(screen.getByText("Охорона здоров'я")).toBeInTheDocument();
    expect(screen.getByText("Retail та E-commerce")).toBeInTheDocument();
    expect(screen.getByText("Виробництво")).toBeInTheDocument();
  });

  it("Browse case studies link points to correct localized href", () => {
    render(<IndustriesTeaser lang="uk" />);
    const casesLink = screen.getByRole("link", { name: /дивитися кейси/i });
    expect(casesLink).toHaveAttribute("href", "/uk/portfolio");
  });
});

// ─────────────────────────────────────────────
// TestimonialsSection
// ─────────────────────────────────────────────
describe("TestimonialsSection", () => {
  it("renders without error", () => {
    const { container } = render(<TestimonialsSection />);
    expect(container).toBeTruthy();
  });

  it("shows Ukrainian heading", () => {
    render(<TestimonialsSection />);
    expect(screen.getAllByText("Відгуки клієнтів").length).toBeGreaterThan(0);
    expect(screen.getByText(/Довіряють/)).toBeInTheDocument();
    expect(screen.getByText("ML-команди")).toBeInTheDocument();
  });

  it("renders the first page of 3 testimonial cards", () => {
    render(<TestimonialsSection />);
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(3);
    // First testimonial on page 0
    expect(screen.getByText("Тарас Гнатенко")).toBeInTheDocument();
  });

  it("navigates to the next page when Next button is clicked", () => {
    render(<TestimonialsSection />);
    const nextBtn = screen.getByRole("button", { name: /наступні відгуки/i });
    fireEvent.click(nextBtn);
    // Second page shows testimonials 4–6
    expect(screen.getByText("Дарина Кириленко")).toBeInTheDocument();
  });
});
