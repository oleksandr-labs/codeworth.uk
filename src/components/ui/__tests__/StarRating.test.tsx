/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { StarRating, RatingBars } from "../StarRating";

jest.mock("@/components/layout/LocaleProvider", () => ({
  useLocale: () => "uk",
}));

describe("StarRating", () => {
  it("рендерить 5 зірок за замовчуванням", () => {
    render(<StarRating value={3} readonly />);
    expect(screen.getAllByRole("button").length).toBe(5);
  });

  it("aria-label показує поточний рейтинг", () => {
    render(<StarRating value={4} readonly />);
    expect(screen.getByRole("img", { name: /рейтинг: 4 з 5/i })).toBeInTheDocument();
  });

  it("в readonly-режимі кнопки задізейблені", () => {
    render(<StarRating value={3} readonly />);
    screen.getAllByRole("button").forEach((btn) => {
      expect(btn).toBeDisabled();
    });
  });

  it("в інтерактивному режимі кнопки не задізейблені", () => {
    render(<StarRating value={3} onChange={jest.fn()} />);
    screen.getAllByRole("button").forEach((btn) => {
      expect(btn).not.toBeDisabled();
    });
  });

  it("клік по зірці викликає onChange з правильним значенням", () => {
    const onChange = jest.fn();
    render(<StarRating value={0} onChange={onChange} />);
    fireEvent.click(screen.getByRole("button", { name: /4 зір/i }));
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it("showValue відображає числовий рейтинг", () => {
    render(<StarRating value={4.5} readonly showValue />);
    expect(screen.getByText("4.5")).toBeInTheDocument();
  });

  it("reviewCount відображає кількість відгуків", () => {
    render(<StarRating value={5} readonly reviewCount={42} />);
    expect(screen.getByText(/42/)).toBeInTheDocument();
  });

  it("підтримує кастомний max", () => {
    render(<StarRating value={3} max={10} readonly />);
    expect(screen.getAllByRole("button").length).toBe(10);
    expect(screen.getByRole("img", { name: /рейтинг: 3 з 10/i })).toBeInTheDocument();
  });
});

describe("RatingBars", () => {
  const dist = { 5: 10, 4: 3, 3: 2, 2: 1, 1: 0 } as Record<1 | 2 | 3 | 4 | 5, number>;

  it("рендерить рядки для 5 оцінок", () => {
    const { container } = render(<RatingBars distribution={dist} total={16} />);
    // Finds spans with star-label numbers — there should be 5 row groups
    const rows = container.querySelectorAll(".flex.items-center.gap-2");
    expect(rows.length).toBe(5);
  });

  it("відображає кількість 10 для 5-зіркового рейтингу", () => {
    render(<RatingBars distribution={dist} total={16} />);
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("відображає нуль для оцінки без відгуків", () => {
    render(<RatingBars distribution={dist} total={16} />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });
});
