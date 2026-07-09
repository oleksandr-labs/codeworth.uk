import React from "react";
import { render, screen } from "@testing-library/react";
import { PricingContent } from "../PricingContent";

jest.mock("@/components/layout/LocaleProvider", () => ({
  useLocale: () => "uk",
}));

describe("PricingContent", () => {
  it("відображає заголовок розділу тарифів на ML-розробку", () => {
    render(<PricingContent />);
    expect(screen.getByRole("heading", { name: /тарифи на ml-розробку/i })).toBeInTheDocument();
  });

  it("відображає 5 тарифних планів", () => {
    render(<PricingContent />);
    expect(screen.getByText("Data Readiness Audit")).toBeInTheDocument();
    expect(screen.getByText("Proof of Concept")).toBeInTheDocument();
    expect(screen.getByText("LLM & RAG Quick Start")).toBeInTheDocument();
    expect(screen.getByText("Production ML")).toBeInTheDocument();
    expect(screen.getByText("Enterprise / MLOps")).toBeInTheDocument();
  });

  it("відображає ціни тарифів", () => {
    render(<PricingContent />);
    expect(screen.getByText("£950")).toBeInTheDocument();
    expect(screen.getByText("£1,800")).toBeInTheDocument();
    expect(screen.getByText("від £4,500")).toBeInTheDocument();
    expect(screen.getByText(/Індивідуально/i)).toBeInTheDocument();
  });

  it("відображає badge 'Найпопулярніший' для Production ML", () => {
    render(<PricingContent />);
    expect(screen.getByText(/найпопулярніший/i)).toBeInTheDocument();
  });

  it("кнопки CTA ведуть на /contact", () => {
    render(<PricingContent />);
    const links = screen.getAllByRole("link");
    const contactLinks = links.filter((a) => (a.getAttribute("href") || "").includes("/contact"));
    expect(contactLinks.length).toBeGreaterThan(0);
  });

  it("відображає терміни виконання", () => {
    render(<PricingContent />);
    expect(screen.getAllByText(/термін/i).length).toBeGreaterThan(0);
  });

  it("відображає розділ MLOps Ретейнер з окремою ціною та CTA", () => {
    render(<PricingContent />);
    expect(screen.getByRole("heading", { name: /mlops ретейнер/i })).toBeInTheDocument();
    expect(screen.getByText("from £800")).toBeInTheDocument();
    const link = screen.getByRole("link", { name: /підключити ретейнер/i });
    expect(link).toHaveAttribute("href", expect.stringContaining("/contact"));
  });
});
