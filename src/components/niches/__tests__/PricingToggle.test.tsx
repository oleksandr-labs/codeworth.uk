/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { PricingToggle } from "../PricingToggle";
import type { NichePricingPlan } from "@/lib/data/niches";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...rest}>{children}</a>
  ),
}));

const PLANS: NichePricingPlan[] = [
  {
    name: "Старт",
    description: "Базовий план для малого бізнесу",
    price: "2 990 ₴",
    period: "/міс",
    highlighted: false,
    features: [
      { text: "Лендінг", included: true },
      { text: "Підтримка 24/7", included: false },
    ],
  },
  {
    name: "Бізнес",
    description: "Для середнього бізнесу",
    price: "5 990 ₴",
    period: "/міс",
    highlighted: true,
    features: [
      { text: "До 10 сторінок", included: true },
      { text: "SEO-оптимізація", included: true },
    ],
  },
];

describe("PricingToggle", () => {
  it("renders monthly view by default (not yearly)", () => {
    render(<PricingToggle plans={PLANS} lang="uk" color="#6366f1" />);
    const toggle = screen.getByRole("switch");
    expect(toggle).toHaveAttribute("aria-checked", "false");
  });

  it("toggle button has role='switch' with aria-checked", () => {
    render(<PricingToggle plans={PLANS} lang="uk" color="#6366f1" />);
    const toggle = screen.getByRole("switch");
    expect(toggle).toBeInTheDocument();
    expect(toggle).toHaveAttribute("aria-checked");
  });

  it("click toggle switches to yearly mode", () => {
    render(<PricingToggle plans={PLANS} lang="uk" color="#6366f1" />);
    const toggle = screen.getByRole("switch");
    expect(toggle).toHaveAttribute("aria-checked", "false");
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-checked", "true");
  });

  it("clicking toggle twice returns to monthly mode", () => {
    render(<PricingToggle plans={PLANS} lang="uk" color="#6366f1" />);
    const toggle = screen.getByRole("switch");
    fireEvent.click(toggle);
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-checked", "false");
  });

  it("shows plan titles", () => {
    render(<PricingToggle plans={PLANS} lang="uk" color="#6366f1" />);
    expect(screen.getByText("Старт")).toBeInTheDocument();
    expect(screen.getByText("Бізнес")).toBeInTheDocument();
  });

  it("shows 'Щомісяця' and 'Щорічно' when lang='uk'", () => {
    render(<PricingToggle plans={PLANS} lang="uk" color="#6366f1" />);
    expect(screen.getByText("Щомісяця")).toBeInTheDocument();
    expect(screen.getByText(/Щорічно/)).toBeInTheDocument();
  });

  it("shows 'Monthly' and 'Yearly' when lang='en'", () => {
    render(<PricingToggle plans={PLANS} lang="en" color="#6366f1" />);
    expect(screen.getByText("Monthly")).toBeInTheDocument();
    expect(screen.getByText(/Yearly/)).toBeInTheDocument();
  });

  it("shows plan descriptions", () => {
    render(<PricingToggle plans={PLANS} lang="uk" color="#6366f1" />);
    expect(screen.getByText("Базовий план для малого бізнесу")).toBeInTheDocument();
  });

  it("shows features with included/excluded markers", () => {
    render(<PricingToggle plans={PLANS} lang="uk" color="#6366f1" />);
    expect(screen.getByText("Лендінг")).toBeInTheDocument();
    expect(screen.getByText("Підтримка 24/7")).toBeInTheDocument();
  });

  it("shows contact link for each plan", () => {
    render(<PricingToggle plans={PLANS} lang="uk" color="#6366f1" />);
    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThanOrEqual(2);
    links.forEach((link) => expect(link).toHaveAttribute("href", "/uk/contact"));
  });

  it("shows 'Найпопулярніший' badge on highlighted plan when lang='uk'", () => {
    render(<PricingToggle plans={PLANS} lang="uk" color="#6366f1" />);
    expect(screen.getByText("Найпопулярніший")).toBeInTheDocument();
  });

  it("shows 'Most Popular' badge on highlighted plan when lang='en'", () => {
    render(<PricingToggle plans={PLANS} lang="en" color="#6366f1" />);
    expect(screen.getByText("Most Popular")).toBeInTheDocument();
  });

  it("shows yearly price annotation after switching to yearly", () => {
    render(<PricingToggle plans={PLANS} lang="uk" color="#6366f1" />);
    const toggle = screen.getByRole("switch");
    fireEvent.click(toggle);
    // Should now show "/ рік" annotation
    expect(document.body.textContent).toMatch(/рік/);
  });

  it("shows discount badge '-20%'", () => {
    render(<PricingToggle plans={PLANS} lang="uk" color="#6366f1" />);
    expect(screen.getByText("−20%")).toBeInTheDocument();
  });

  it("shows 'Get Started' CTA for non-highlighted plan when lang='en'", () => {
    render(<PricingToggle plans={PLANS} lang="en" color="#6366f1" />);
    const ctaLinks = screen.getAllByText("Get Started");
    expect(ctaLinks.length).toBeGreaterThanOrEqual(1);
  });

  it("shows 'Обрати план' CTA when lang='uk'", () => {
    render(<PricingToggle plans={PLANS} lang="uk" color="#6366f1" />);
    const ctaLinks = screen.getAllByText("Обрати план");
    expect(ctaLinks.length).toBeGreaterThanOrEqual(1);
  });
});
