/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
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

jest.mock("@/components/ui/CountUp", () => ({
  CountUp: ({ end, suffix }: { end: number; suffix: string }) => (
    <span>
      {end}
      {suffix}
    </span>
  ),
}));

import { NicheStats } from "../NicheStats";

// ---------------------------------------------------------------------------
// UK locale tests
// ---------------------------------------------------------------------------
describe("NicheStats — uk locale", () => {
  it("renders 4 stat cards with Ukrainian labels", () => {
    render(<NicheStats color="#6366f1" />);
    expect(screen.getByText("Ніш")).toBeInTheDocument();
    expect(screen.getByText("Проєктів")).toBeInTheDocument();
    expect(screen.getByText("Задоволених")).toBeInTheDocument();
    expect(screen.getByText("Років")).toBeInTheDocument();
  });

  it("renders CountUp values with correct end numbers and suffixes", () => {
    render(<NicheStats color="#6366f1" />);
    // CountUp mock renders `end` + `suffix` as a plain text node.
    expect(screen.getByText("34+")).toBeInTheDocument();
    expect(screen.getByText("500+")).toBeInTheDocument();
    expect(screen.getByText("98%")).toBeInTheDocument();
    expect(screen.getByText("7+")).toBeInTheDocument();
  });

  it("renders all Ukrainian description texts", () => {
    render(<NicheStats color="#6366f1" />);
    expect(screen.getByText("готових рішень для різних бізнесів")).toBeInTheDocument();
    expect(screen.getByText("успішно запущено клієнтам")).toBeInTheDocument();
    expect(
      screen.getByText("клієнтів повертаються знову")
    ).toBeInTheDocument();
    expect(screen.getByText("досвіду у веб-розробці")).toBeInTheDocument();
  });
});

