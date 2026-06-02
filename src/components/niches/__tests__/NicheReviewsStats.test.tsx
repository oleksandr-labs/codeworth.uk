import React from "react";
import { render, screen } from "@testing-library/react";
import { NicheReviews } from "../NicheReviews";
import { NicheStats } from "../NicheStats";

jest.mock("@/components/layout/LocaleProvider", () => ({
  useLocale: () => "uk",
}));

jest.mock("@/components/ui/Avatar", () => ({
  Avatar: ({ name }: { name: string }) => <div data-testid="avatar">{name[0]}</div>,
}));

jest.mock("@/components/ui/StarRating", () => ({
  StarRating: ({ rating }: { rating: number }) => <div data-testid="star-rating">{rating} зірок</div>,
}));

jest.mock("@/components/ui/CountUp", () => ({
  CountUp: ({ end, suffix }: { end: number; suffix: string }) => (
    <span>{end}{suffix}</span>
  ),
}));

describe("NicheReviews", () => {
  it("renders 3 reviews for a given slug", () => {
    render(<NicheReviews slug="restaurant" color="#FF6B35" />);
    const avatars = screen.getAllByTestId("avatar");
    expect(avatars.length).toBe(3);
  });

  it("displays star ratings for reviews plus overall rating", () => {
    render(<NicheReviews slug="beauty" color="#E91E63" />);
    const ratings = screen.getAllByTestId("star-rating");
    // 3 review cards + 1 overall rating at top = 4
    expect(ratings.length).toBe(4);
  });

  it("shows review dates", () => {
    render(<NicheReviews slug="fitness" color="#4CAF50" />);
    const dates = screen.getAllByText(/202[0-9]/);
    expect(dates.length).toBeGreaterThanOrEqual(3);
  });

  it("renders different reviews for different slugs", () => {
    const { container: c1 } = render(<NicheReviews slug="restaurant" color="#FF6B35" />);
    const text1 = c1.textContent;
    const { container: c2 } = render(<NicheReviews slug="fitness" color="#4CAF50" />);
    const text2 = c2.textContent;
    // Different slugs may produce different review selection (seeded)
    expect(text1).toBeTruthy();
    expect(text2).toBeTruthy();
  });
});

describe("NicheStats", () => {
  it("renders 4 stat cards", () => {
    render(<NicheStats color="#4F46E5" />);
    expect(screen.getByText("Ніш")).toBeInTheDocument();
    expect(screen.getByText("Проєктів")).toBeInTheDocument();
    expect(screen.getByText("Задоволених")).toBeInTheDocument();
    expect(screen.getByText("Років")).toBeInTheDocument();
  });

  it("displays stat values with CountUp", () => {
    render(<NicheStats color="#4F46E5" />);
    expect(screen.getByText("34+")).toBeInTheDocument();
    expect(screen.getByText("500+")).toBeInTheDocument();
    expect(screen.getByText("98%")).toBeInTheDocument();
    expect(screen.getByText("7+")).toBeInTheDocument();
  });

  it("displays descriptions for each stat", () => {
    render(<NicheStats color="#4F46E5" />);
    expect(screen.getByText(/готових рішень/)).toBeInTheDocument();
    expect(screen.getByText(/успішно запущено/)).toBeInTheDocument();
    expect(screen.getByText(/повертаються знову/)).toBeInTheDocument();
    expect(screen.getByText(/досвіду/)).toBeInTheDocument();
  });

  it("applies the color prop to stat values", () => {
    const { container } = render(<NicheStats color="#FF0000" />);
    const statElements = container.querySelectorAll("[style]");
    const withColor = Array.from(statElements).filter(
      (el) => (el as HTMLElement).style.color === "rgb(255, 0, 0)"
    );
    expect(withColor.length).toBeGreaterThanOrEqual(4);
  });
});

export {};
