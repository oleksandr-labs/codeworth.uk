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
    LifeBuoy: icon("LifeBuoy"),
    Utensils: icon("Utensils"),
    Scissors: icon("Scissors"),
    Stethoscope: icon("Stethoscope"),
    ShoppingBag: icon("ShoppingBag"),
    Star: icon("Star"),
    ChevronLeft: icon("ChevronLeft"),
    ChevronRight: icon("ChevronRight"),
  };
});

import { BlogPreviewSection } from "../BlogPreviewSection";
import { ClientLogosSection } from "../ClientLogosSection";
import { HowWeWorkSection } from "../HowWeWorkSection";
import { MarketplaceTeaser } from "../MarketplaceTeaser";
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
      screen.getByText("Корисний контент про веб-розробку, SEO та маркетинг.")
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
    expect(screen.getByText("SSL & HTTPS")).toBeInTheDocument();
    expect(screen.getByText("Lighthouse 90+")).toBeInTheDocument();
    expect(screen.getByText("24/7 підтримка")).toBeInTheDocument();
    expect(screen.getByText("LCP < 2.5с")).toBeInTheDocument();
  });

  it("shows the trusted-companies tagline", () => {
    render(<ClientLogosSection lang="uk" />);
    expect(
      screen.getByText("Нам довіряють компанії по всій Україні")
    ).toBeInTheDocument();
  });

  it("renders all 12 client logo entries", () => {
    render(<ClientLogosSection lang="uk" />);
    expect(screen.getByText("Beauty Room")).toBeInTheDocument();
    expect(screen.getByText("GreenFarm")).toBeInTheDocument();
    // Total count: 12 named clients
    const clients = [
      "Beauty Room", "TechCargo", "Sweet Bakery", "FitLife Club",
      "MedCenter+", "LexPro Law", "InvoiceFlow", "AutoFix",
      "KidSpace", "GreenFarm", "ModaUA", "BudPro",
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
    expect(screen.getByText("Як ми працюємо")).toBeInTheDocument();
    expect(screen.getByText("Процес")).toBeInTheDocument();
  });

  it("renders all 5 step titles", () => {
    render(<HowWeWorkSection lang="uk" />);
    expect(screen.getByText("Брифінг та аналіз")).toBeInTheDocument();
    expect(screen.getByText("Дизайн")).toBeInTheDocument();
    expect(screen.getByText("Розробка")).toBeInTheDocument();
    expect(screen.getByText("Здача та запуск")).toBeInTheDocument();
    expect(screen.getByText("Підтримка")).toBeInTheDocument();
  });

  it("CTA link points to /uk/contact", () => {
    render(<HowWeWorkSection lang="uk" />);
    const cta = screen.getByRole("link", { name: /почати проєкт/i });
    expect(cta).toHaveAttribute("href", "/uk/contact");
  });
});

// ─────────────────────────────────────────────
// MarketplaceTeaser
// ─────────────────────────────────────────────
describe("MarketplaceTeaser", () => {
  it("renders without error", () => {
    const { container } = render(<MarketplaceTeaser lang="uk" />);
    expect(container).toBeTruthy();
  });

  it("shows Ukrainian heading copy", () => {
    render(<MarketplaceTeaser lang="uk" />);
    expect(screen.getByText(/Маркетплейс готових рішень/i)).toBeInTheDocument();
    expect(screen.getByText("Готові рішення для")).toBeInTheDocument();
    expect(screen.getByText("вашого бізнесу")).toBeInTheDocument();
  });

  it("renders all 4 niche cards", () => {
    render(<MarketplaceTeaser lang="uk" />);
    expect(screen.getByText("Ресторан / Кафе")).toBeInTheDocument();
    expect(screen.getByText("Салон краси")).toBeInTheDocument();
    expect(screen.getByText("Медична клініка")).toBeInTheDocument();
    expect(screen.getByText("Інтернет-магазин")).toBeInTheDocument();
  });

  it("Browse marketplace and extras links point to correct localized hrefs", () => {
    render(<MarketplaceTeaser lang="uk" />);
    const marketplaceLink = screen.getByRole("link", { name: /дивитися маркетплейс/i });
    expect(marketplaceLink).toHaveAttribute("href", "/uk/marketplace");

    const extrasLink = screen.getByRole("link", { name: /доробки та модулі/i });
    expect(extrasLink).toHaveAttribute("href", "/uk/extras");
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
    expect(screen.getByText("Відгуки клієнтів")).toBeInTheDocument();
    expect(screen.getByText("Нам довіряють")).toBeInTheDocument();
    expect(screen.getByText("85+ компаній")).toBeInTheDocument();
  });

  it("renders the first page of 3 testimonial cards", () => {
    render(<TestimonialsSection />);
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(3);
    // First testimonial on page 0
    expect(screen.getByText("Олена Коваль")).toBeInTheDocument();
  });

  it("navigates to the next page when Next button is clicked", () => {
    render(<TestimonialsSection />);
    const nextBtn = screen.getByRole("button", { name: /наступні відгуки/i });
    fireEvent.click(nextBtn);
    // Second page shows testimonials 4–6
    expect(screen.getByText("Андрій Мельник")).toBeInTheDocument();
  });
});
