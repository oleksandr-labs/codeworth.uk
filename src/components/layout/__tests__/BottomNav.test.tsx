/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import { BottomNav } from "../BottomNav";

// ── Next.js mocks ────────────────────────────────────────────────────────────
jest.mock("next/navigation", () => ({
  usePathname: jest.fn().mockReturnValue("/"),
  useParams: () => ({ lang: "uk" }),
}));

jest.mock("next/link", () => {
  const MockLink = ({ children, href, ...props }: { children: React.ReactNode; href: string; [k: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  );
  MockLink.displayName = "MockLink";
  return MockLink;
});

// ── Cart mock ─────────────────────────────────────────────────────────────────
const mockUseCart = jest.fn(() => ({ count: 0 }));
jest.mock("@/hooks/useCart", () => ({
  useCart: () => mockUseCart(),
}));

// Helper to set the pathname mock
function setPathname(path: string) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  (require("next/navigation").usePathname as jest.Mock).mockReturnValue(path);
}

beforeEach(() => {
  setPathname("/uk");
  mockUseCart.mockReturnValue({ count: 0 });
});

describe("BottomNav", () => {
  it("рендерить 5 навігаційних елементів", () => {
    render(<BottomNav />);
    expect(screen.getByText("Головна")).toBeInTheDocument();
    expect(screen.getByText("Послуги")).toBeInTheDocument();
    expect(screen.getByText("Маркетплейс")).toBeInTheDocument();
    expect(screen.getByText("Блог")).toBeInTheDocument();
    expect(screen.getByText("Контакти")).toBeInTheDocument();
  });

  it("nav має правильний aria-label", () => {
    render(<BottomNav />);
    expect(screen.getByRole("navigation", { name: "Мобільна навігація" })).toBeInTheDocument();
  });

  it("активна сторінка має aria-current=page", () => {
    setPathname("/uk");
    render(<BottomNav />);
    const homeLink = screen.getByRole("link", { name: /головна/i });
    expect(homeLink).toHaveAttribute("aria-current", "page");
  });

  it("неактивні елементи не мають aria-current", () => {
    setPathname("/uk");
    render(<BottomNav />);
    const servicesLink = screen.getByRole("link", { name: /послуги/i });
    expect(servicesLink).not.toHaveAttribute("aria-current");
  });

  it("активна адреса /services позначає Послуги активними", () => {
    setPathname("/uk/services");
    render(<BottomNav />);
    const servicesLink = screen.getByRole("link", { name: /послуги/i });
    expect(servicesLink).toHaveAttribute("aria-current", "page");
  });

  it("активна адреса /services/website-dev також позначає Послуги (startsWith)", () => {
    setPathname("/uk/services/website-dev");
    render(<BottomNav />);
    const servicesLink = screen.getByRole("link", { name: /послуги/i });
    expect(servicesLink).toHaveAttribute("aria-current", "page");
  });

  it("не показує cart badge коли count = 0", () => {
    render(<BottomNav />);
    expect(screen.queryByText("0")).not.toBeInTheDocument();
  });

  it("показує cart badge коли є товари в кошику", () => {
    mockUseCart.mockReturnValue({ count: 3 });
    render(<BottomNav />);
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("показує 9+ коли count > 9", () => {
    mockUseCart.mockReturnValue({ count: 12 });
    render(<BottomNav />);
    expect(screen.getByText("9+")).toBeInTheDocument();
  });
});
