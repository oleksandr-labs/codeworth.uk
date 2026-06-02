import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { PricingContent } from "../PricingContent";

jest.mock("next/link", () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
  MockLink.displayName = "MockLink";
  return MockLink;
});

jest.mock("@/components/layout/LocaleProvider", () => ({
  useLocale: () => "uk",
}));

describe("PricingContent", () => {
  it("відображає перемикач вкладок", () => {
    render(<PricingContent />);
    expect(screen.getByRole("button", { name: /разові послуги/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /щомісячна підписка/i })).toBeInTheDocument();
  });

  it("за замовчуванням активна вкладка 'Разові послуги'", () => {
    render(<PricingContent />);
    expect(screen.getByText(/тарифи розробки/i)).toBeInTheDocument();
  });

  it("відображає 3 тарифи розробки (Starter, Business, Enterprise)", () => {
    render(<PricingContent />);
    expect(screen.getByText("Starter")).toBeInTheDocument();
    expect(screen.getByText("Business")).toBeInTheDocument();
    expect(screen.getByText("Enterprise")).toBeInTheDocument();
  });

  it("відображає ціни тарифів", () => {
    render(<PricingContent />);
    expect(screen.getByText(/15\s*000/)).toBeInTheDocument();
    expect(screen.getByText(/40\s*000/)).toBeInTheDocument();
    expect(screen.getByText(/Індивідуально/i)).toBeInTheDocument();
  });

  it("відображає badge 'Найпопулярніший' для Business", () => {
    render(<PricingContent />);
    expect(screen.getByText(/найпопулярніший/i)).toBeInTheDocument();
  });

  it("кнопки CTA ведуть на /contact", () => {
    render(<PricingContent />);
    const contactLinks = screen.getAllByRole("link", { name: /замовити/i });
    expect(contactLinks.length).toBeGreaterThan(0);
    expect(contactLinks[0].getAttribute("href")).toContain("/contact");
  });

  it("перехід на вкладку 'Щомісячна підписка' показує інший контент", () => {
    render(<PricingContent />);
    fireEvent.click(screen.getByRole("button", { name: /щомісячна підписка/i }));
    // Subscription tab content — DEV_PLANS should be gone
    expect(screen.queryByText("Starter")).not.toBeInTheDocument();
  });

  it("відображає терміни виконання", () => {
    render(<PricingContent />);
    expect(screen.getAllByText(/днів|тижні|тиждень/i).length).toBeGreaterThan(0);
  });

  it("посилання на маркетплейс присутнє у вкладці разових послуг", () => {
    render(<PricingContent />);
    const allLinks = screen.getAllByRole("link");
    const hasMarketplace = allLinks.some((l) => l.getAttribute("href") === "/uk/marketplace");
    expect(hasMarketplace).toBe(true);
  });
});
