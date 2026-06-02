/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import { HeroSection } from "../HeroSection";
import { ServicesSection } from "../ServicesSection";
import { WhyUsSection } from "../WhyUsSection";

// ── Global mocks ─────────────────────────────────────────────────────────────

jest.mock("next/link", () => {
  const L = ({ children, href }: any) => <a href={href}>{children}</a>;
  L.displayName = "Link";
  return L;
});

jest.mock("next/image", () => {
  const I = ({ src, alt }: any) => <img src={src} alt={alt} />;
  I.displayName = "Image";
  return I;
});

jest.mock("@/components/layout/LocaleProvider", () => ({
  useLocale: () => "uk",
}));

jest.mock("@/components/layout/Container", () => ({
  Container: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// CountUp uses IntersectionObserver + requestAnimationFrame — replace with simple output
jest.mock("@/components/ui/CountUp", () => ({
  CountUp: ({ end, suffix = "" }: { end: number; suffix?: string }) => (
    <span>{end}{suffix}</span>
  ),
}));

// Button may use next/link internally — its mock is covered by the next/link mock above
jest.mock("@/components/ui/Button", () => ({
  Button: ({ children, href }: { children: React.ReactNode; href?: string }) =>
    href ? <a href={href}>{children}</a> : <button>{children}</button>,
}));

// ── HeroSection ──────────────────────────────────────────────────────────────

describe("HeroSection", () => {
  beforeEach(() => {
    // IntersectionObserver is not available in jsdom
    const mockObserver = {
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    };
    (global as any).IntersectionObserver = jest.fn(() => mockObserver);
  });

  it("renders without errors", () => {
    expect(() => render(<HeroSection />)).not.toThrow();
  });

  it("shows the UK badge text", () => {
    render(<HeroSection />);
    expect(screen.getByText(/приймаємо нові проєкти/i)).toBeInTheDocument();
  });

  it("shows the UK heading text", () => {
    render(<HeroSection />);
    expect(screen.getByText(/розробка/i)).toBeInTheDocument();
    expect(screen.getByText(/для вашого бізнесу/i)).toBeInTheDocument();
  });

  it("shows the subheading with Codeworth name", () => {
    render(<HeroSection />);
    expect(screen.getByText(/Codeworth/i)).toBeInTheDocument();
  });

  it("renders CTA buttons linking to /uk/contact and /uk/portfolio", () => {
    render(<HeroSection />);
    const consultationLink = screen.getByRole("link", { name: /отримати консультацію/i });
    expect(consultationLink).toHaveAttribute("href", "/uk/contact");

    const portfolioLink = screen.getByRole("link", { name: /дивитися портфоліо/i });
    expect(portfolioLink).toHaveAttribute("href", "/uk/portfolio");
  });

  it("renders all four stat labels", () => {
    render(<HeroSection />);
    expect(screen.getByText("Проєктів")).toBeInTheDocument();
    expect(screen.getByText("Клієнтів")).toBeInTheDocument();
    expect(screen.getByText("Роки роботи")).toBeInTheDocument();
    expect(screen.getByText("Задоволені")).toBeInTheDocument();
  });

  it("renders stat values via CountUp mock", () => {
    render(<HeroSection />);
    expect(screen.getByText("120+")).toBeInTheDocument();
    expect(screen.getByText("98%")).toBeInTheDocument();
  });

  it("renders all tech stack logos", () => {
    render(<HeroSection />);
    expect(screen.getByText("Next.js")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("PostgreSQL")).toBeInTheDocument();
  });

  it("renders the scroll indicator", () => {
    render(<HeroSection />);
    expect(screen.getByText(/скрол/i)).toBeInTheDocument();
  });
});

// ── ServicesSection (EN locale) ───────────────────────────────────────────────

describe("ServicesSection — EN locale", () => {
  it("renders without errors", () => {
    expect(() => render(<ServicesSection lang="en" />)).not.toThrow();
  });

  it("shows 'Our Services' heading in English", () => {
    render(<ServicesSection lang="en" />);
    expect(screen.getByText(/our services/i)).toBeInTheDocument();
  });

  it("shows English service titles", () => {
    render(<ServicesSection lang="en" />);
    expect(screen.getByText("Website Development")).toBeInTheDocument();
    expect(screen.getByText("Online Stores")).toBeInTheDocument();
    expect(screen.getByText("SEO Promotion")).toBeInTheDocument();
  });

  it("service links use /en/ prefix", () => {
    render(<ServicesSection lang="en" />);
    const webDevLink = screen.getByRole("link", { name: /website development/i });
    expect(webDevLink).toHaveAttribute("href", "/en/services/website-dev");
  });

  it("shows 'View all services' CTA in English", () => {
    render(<ServicesSection lang="en" />);
    const link = screen.getByRole("link", { name: /view all services/i });
    expect(link).toHaveAttribute("href", "/en/services");
  });
});

// ── WhyUsSection (EN locale) ──────────────────────────────────────────────────

describe("WhyUsSection — EN locale", () => {
  it("renders without errors", () => {
    expect(() => render(<WhyUsSection lang="en" />)).not.toThrow();
  });

  it("shows 'Why Codeworth' heading in English", () => {
    render(<WhyUsSection lang="en" />);
    expect(screen.getByText(/why Codeworth/i)).toBeInTheDocument();
  });

  it("shows English reason titles", () => {
    render(<WhyUsSection lang="en" />);
    expect(screen.getByText("Fast Launch")).toBeInTheDocument();
    expect(screen.getByText("Premium Design")).toBeInTheDocument();
    expect(screen.getByText("Quality Guarantee")).toBeInTheDocument();
  });

  it("renders all six reason cards", () => {
    render(<WhyUsSection lang="en" />);
    const reasonTitles = [
      "Fast Launch",
      "Premium Design",
      "SEO from Day One",
      "Security & Reliability",
      "Quality Guarantee",
      "Partnership, Not a Deal",
    ];
    reasonTitles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it("shows the 'because we deliver' tagline", () => {
    render(<WhyUsSection lang="en" />);
    expect(screen.getByText(/because we deliver/i)).toBeInTheDocument();
  });
});
