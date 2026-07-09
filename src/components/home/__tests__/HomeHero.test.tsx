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
  const L = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
  L.displayName = "Link";
  return L;
});

jest.mock("next/image", () => {
  const I = ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />;
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
    global.IntersectionObserver = jest.fn(() => mockObserver) as unknown as typeof IntersectionObserver;
  });

  it("renders without errors", () => {
    expect(() => render(<HeroSection />)).not.toThrow();
  });

  it("shows the UK badge text", () => {
    render(<HeroSection />);
    expect(screen.getByText(/UK ML-компанія/i)).toBeInTheDocument();
    expect(screen.getByText(/Безкоштовна консультація/i)).toBeInTheDocument();
  });

  it("shows the UK heading text", () => {
    render(<HeroSection />);
    expect(screen.getByText(/AI для/i)).toBeInTheDocument();
    expect(screen.getByText(/у вашому бізнесі/i)).toBeInTheDocument();
  });

  it("shows the subheading with Codeworth name", () => {
    render(<HeroSection />);
    expect(screen.getByText(/ML-компанія для UK бізнесу/i)).toBeInTheDocument();
  });

  it("renders CTA buttons linking to /uk/contact and /uk/portfolio", () => {
    render(<HeroSection />);
    const consultationLink = screen.getByRole("link", { name: /отримати консультацію/i });
    expect(consultationLink).toHaveAttribute("href", "/uk/contact");

    const portfolioLink = screen.getByRole("link", { name: /дивитися рішення/i });
    expect(portfolioLink).toHaveAttribute("href", "/uk/portfolio");
  });

  it("renders all four stat labels", () => {
    render(<HeroSection />);
    expect(screen.getByText("ML-моделей")).toBeInTheDocument();
    expect(screen.getByText("Галузей")).toBeInTheDocument();
    expect(screen.getByText("Роки в ML")).toBeInTheDocument();
    expect(screen.getByText("Середній ROI")).toBeInTheDocument();
  });

  it("renders stat values via CountUp mock", () => {
    render(<HeroSection />);
    expect(screen.getByText("80+")).toBeInTheDocument();
    expect(screen.getByText("340%")).toBeInTheDocument();
  });

  it("renders all tech stack logos", () => {
    render(<HeroSection />);
    expect(screen.getByText("Python")).toBeInTheDocument();
    expect(screen.getByText("PyTorch")).toBeInTheDocument();
    expect(screen.getByText("TensorFlow")).toBeInTheDocument();
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
    expect(screen.getByText("Machine Learning")).toBeInTheDocument();
    expect(screen.getByText("NLP")).toBeInTheDocument();
    expect(screen.getByText("Computer Vision")).toBeInTheDocument();
  });

  it("service links point to real SERVICES_DATA slugs (regression: previously 404'd on ml-models/fraud-detection/ai-chatbots/ai-consulting)", () => {
    render(<ServicesSection lang="en" />);
    const mlLink = screen.getByRole("link", { name: /machine learning/i });
    expect(mlLink).toHaveAttribute("href", "/en/services/machine-learning");
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
    expect(screen.getByText("Rapid Prototyping")).toBeInTheDocument();
    expect(screen.getByText("Production-Ready Models")).toBeInTheDocument();
    expect(screen.getByText("Data Privacy First")).toBeInTheDocument();
  });

  it("renders all six reason cards", () => {
    render(<WhyUsSection lang="en" />);
    const reasonTitles = [
      "Rapid Prototyping",
      "Production-Ready Models",
      "Data Privacy First",
      "Measurable ROI",
      "MLOps from Day One",
      "Partnership, Not a Deal",
    ];
    reasonTitles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it("shows the 'because ML actually delivers ROI' tagline", () => {
    render(<WhyUsSection lang="en" />);
    expect(screen.getByText(/because ML actually delivers ROI/i)).toBeInTheDocument();
  });
});
