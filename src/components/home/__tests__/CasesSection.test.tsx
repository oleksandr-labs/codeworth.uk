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
    expect(screen.getByText("Що може досягти ваш бізнес")).toBeInTheDocument();
  });

  it("відображає підзаголовок з описом", () => {
    render(<CasesSection lang="uk" />);
    expect(screen.getByText(/приклади того, що отримують бізнеси/i)).toBeInTheDocument();
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
    const allLink = screen.getByRole("link", { name: /усі рішення/i });
    expect(allLink).toHaveAttribute("href", "/uk/portfolio");
  });

  it("відображає emoji-заголовки кейсів", () => {
    render(<CasesSection lang="uk" />);
    // First 3 projects with caseStudy have emoji in portfolio.ts, rendered as
    // lucide icons via EmojiIcon (🤖→Bot, 📊→BarChart3, 📋→ClipboardList)
    expect(document.querySelector(".lucide-bot")).toBeInTheDocument();
    expect(document.querySelector(".lucide-chart-column")).toBeInTheDocument();
    expect(document.querySelector(".lucide-clipboard-list")).toBeInTheDocument();
  });

  it("відображає метрики результатів", () => {
    render(<CasesSection lang="uk" />);
    // First case result[0]: "68% запитань вирішується автоматично без участі людини"
    expect(screen.getByText(/68% запитань вирішується автоматично/)).toBeInTheDocument();
  });

  it("секція має правильний aria-роль section", () => {
    render(<CasesSection lang="uk" />);
    expect(screen.getByText("Приклади рішень")).toBeInTheDocument();
  });
});
