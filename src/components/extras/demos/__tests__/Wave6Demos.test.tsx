import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { AnalyticsFunnelDemo } from "../AnalyticsFunnelDemo";
import { MiniShopDemo } from "../MiniShopDemo";

expect.extend(toHaveNoViolations);

describe("AnalyticsFunnelDemo", () => {
  it("renders 3 funnel presets", () => {
    render(<AnalyticsFunnelDemo isUk={true} />);
    expect(screen.getByText(/E-commerce воронка/i)).toBeInTheDocument();
    expect(screen.getByText(/SaaS реєстрація/i)).toBeInTheDocument();
    expect(screen.getByText(/Воронка ліда/i)).toBeInTheDocument();
  });

  it("renders progressbars for each funnel step", () => {
    render(<AnalyticsFunnelDemo isUk={false} />);
    const bars = screen.getAllByRole("progressbar");
    expect(bars.length).toBe(5);
  });

  it("switches funnel preset", () => {
    render(<AnalyticsFunnelDemo isUk={false} />);
    fireEvent.click(screen.getByText("Lead generation funnel"));
    expect(screen.getByText("Ad impressions")).toBeInTheDocument();
  });

  it("shows overall conversion summary", () => {
    render(<AnalyticsFunnelDemo isUk={false} />);
    expect(screen.getByText(/Overall conversion/i)).toBeInTheDocument();
    expect(screen.getByText(/Drop-offs/i)).toBeInTheDocument();
  });

  it("has no a11y violations", async () => {
    const { container } = render(<AnalyticsFunnelDemo isUk={false} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("MiniShopDemo", () => {
  it("renders 6 products initially", () => {
    const { container } = render(<MiniShopDemo isUk={true} />);
    const productCards = container.querySelectorAll("[class*='rounded-xl border']");
    expect(productCards.length).toBeGreaterThanOrEqual(3);
  });

  it("renders category filters", () => {
    render(<MiniShopDemo isUk={true} />);
    expect(screen.getByText("Напої")).toBeInTheDocument();
    expect(screen.getByText("Солодке")).toBeInTheDocument();
    expect(screen.getByText("Снеки")).toBeInTheDocument();
  });

  it("adds product to cart and shows qty controls", () => {
    render(<MiniShopDemo isUk={false} />);
    const addButtons = screen.getAllByRole("button").filter((b) => b.textContent === "+");
    const initialAddCount = addButtons.length;
    expect(initialAddCount).toBeGreaterThan(0);
    fireEvent.click(addButtons[0]);
    // After add, that product card shows Decrease/Increase aria-label buttons
    expect(screen.getByLabelText("Decrease")).toBeInTheDocument();
    expect(screen.getByLabelText("Increase")).toBeInTheDocument();
  });

  it("navigates to cart on cart button click", () => {
    render(<MiniShopDemo isUk={false} />);
    const cartBtn = screen.getByText("Cart");
    fireEvent.click(cartBtn);
    expect(screen.getByText(/Cart is empty/i)).toBeInTheDocument();
  });

  it("filters by category", () => {
    render(<MiniShopDemo isUk={false} />);
    fireEvent.click(screen.getByText("Drinks"));
    expect(screen.getByText("Coffee Beans Espresso")).toBeInTheDocument();
    // Snacks should be filtered out
    expect(screen.queryByText("Granola Mix")).not.toBeInTheDocument();
  });

  it("has no a11y violations", async () => {
    const { container } = render(<MiniShopDemo isUk={false} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
