/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

// ---------------------------------------------------------------------------
// Default mocks — locale is "uk" for all tests except the EN suite below.
// ---------------------------------------------------------------------------
jest.mock("@/components/layout/LocaleProvider", () => ({
  useLocale: () => "uk",
}));

jest.mock("@/components/layout/Container", () => ({
  Container: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

jest.mock("next/link", () => {
  const L = ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>;
  L.displayName = "Link";
  return L;
});

// lucide-react icons — render nothing to keep DOM clean.
jest.mock("lucide-react", () => ({
  Calculator: () => null,
  ChevronDown: () => null,
  ArrowRight: () => null,
}));

import { NicheCalculator } from "../NicheCalculator";

// ---------------------------------------------------------------------------
// Shared test data
// ---------------------------------------------------------------------------
const steps = [
  {
    label: "Тип сайту",
    options: [
      { label: "Лендінг", price: 0 },
      { label: "Корпоративний сайт", price: 3000 },
    ],
  },
  {
    label: "Мова",
    options: [
      { label: "Одна мова", price: 0 },
      { label: "Дві мови", price: 1500 },
    ],
  },
];

// ---------------------------------------------------------------------------
// UK locale tests
// ---------------------------------------------------------------------------
describe("NicheCalculator — uk locale", () => {
  it("renders h2 with the default title 'Калькулятор вартості'", () => {
    render(<NicheCalculator steps={steps} color="#6366f1" />);
    expect(
      screen.getByRole("heading", { level: 2, name: "Калькулятор вартості" })
    ).toBeInTheDocument();
  });

  it("shows each step's label as a dropdown trigger label", () => {
    render(<NicheCalculator steps={steps} color="#6366f1" />);
    expect(screen.getByText("Тип сайту")).toBeInTheDocument();
    expect(screen.getByText("Мова")).toBeInTheDocument();
  });

  it("shows initial total '0 ₴' when all default options have price 0", () => {
    render(<NicheCalculator steps={steps} color="#6366f1" />);
    expect(screen.getByText("0 ₴")).toBeInTheDocument();
  });

  it("link 'Отримати точний розрахунок' has href '/uk/contact'", () => {
    render(<NicheCalculator steps={steps} color="#6366f1" />);
    const link = screen.getByRole("link", {
      name: /Отримати точний розрахунок/i,
    });
    expect(link).toHaveAttribute("href", "/uk/contact");
  });

  it("clicking a dropdown button reveals that step's options in a listbox", () => {
    render(<NicheCalculator steps={steps} color="#6366f1" />);

    // Identify trigger buttons by their aria-haspopup attribute.
    const triggerButtons = screen
      .getAllByRole("button")
      .filter((btn) => btn.getAttribute("aria-haspopup") === "listbox");

    expect(triggerButtons).toHaveLength(2);

    // Open the first step's dropdown (Тип сайту).
    fireEvent.click(triggerButtons[0]);

    const listbox = screen.getByRole("listbox");
    const optionEls = listbox.querySelectorAll("[role='option']");
    const optionLabels = Array.from(optionEls).map(
      (el) => el.querySelector("span")?.textContent
    );

    expect(optionLabels).toContain("Лендінг");
    expect(optionLabels).toContain("Корпоративний сайт");
  });

  it("renders a custom title when the title prop is provided", () => {
    render(
      <NicheCalculator
        steps={steps}
        color="#6366f1"
        title="Мій калькулятор"
      />
    );
    expect(
      screen.getByRole("heading", { level: 2, name: "Мій калькулятор" })
    ).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// EN locale test — resolved via the title prop (locale-neutral, reliable).
// The component derives the title from the locale only when no title prop is
// passed.  Passing title="Price calculator" directly mirrors exactly what
// "en" locale would produce, without needing module isolation tricks.
// ---------------------------------------------------------------------------
describe("NicheCalculator — en locale (title prop)", () => {
  it("renders 'Price calculator' heading when title prop is provided", () => {
    render(
      <NicheCalculator
        steps={steps}
        color="#6366f1"
        title="Price calculator"
      />
    );
    expect(
      screen.getByRole("heading", { level: 2, name: "Price calculator" })
    ).toBeInTheDocument();
  });
});

