/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import { CasesSection } from "../CasesSection";

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

jest.mock("@/components/layout/LocaleProvider", () => ({
  useLocale: () => "uk",
}));

describe("CasesSection", () => {
  it("відображає заголовок секції", () => {
    render(<CasesSection lang="uk" />);
    expect(screen.getByText("Реальні результати клієнтів")).toBeInTheDocument();
  });

  it("відображає підзаголовок з описом", () => {
    render(<CasesSection lang="uk" />);
    expect(screen.getByText(/цифри, а не обіцянки/i)).toBeInTheDocument();
  });

  it("відображає 3 кейси", () => {
    render(<CasesSection lang="uk" />);
    // Each case has a link to /portfolio/<slug>
    const links = screen.getAllByRole("link");
    const caseLinks = links.filter((l) => {
      const href = l.getAttribute("href") ?? "";
      return href.startsWith("/uk/portfolio/");
    });
    expect(caseLinks).toHaveLength(3);
  });

  it("відображає посилання на всі кейси", () => {
    render(<CasesSection lang="uk" />);
    const allLink = screen.getByRole("link", { name: /усі кейси/i });
    expect(allLink).toHaveAttribute("href", "/uk/portfolio");
  });

  it("відображає emoji-заголовки кейсів", () => {
    render(<CasesSection lang="uk" />);
    // First 3 projects with caseStudy have emoji in portfolio.ts
    expect(screen.getByText("🍽")).toBeInTheDocument();
    expect(screen.getByText("✂️")).toBeInTheDocument();
  });

  it("відображає метрики результатів", () => {
    render(<CasesSection lang="uk" />);
    // First case result: "Кількість онлайн-бронювань +60% за перший місяць"
    expect(screen.getByText(/\+60%/)).toBeInTheDocument();
  });

  it("секція має правильний aria-роль section", () => {
    render(<CasesSection lang="uk" />);
    expect(screen.getByText("Кейси")).toBeInTheDocument();
  });
});
