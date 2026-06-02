/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import { NicheReviews } from "../NicheReviews";

jest.mock("@/components/layout/LocaleProvider", () => ({
  useLocale: () => "uk",
}));

jest.mock("@/components/ui/Avatar", () => ({
  Avatar: ({ name }: { name: string }) => <div data-testid="avatar">{name}</div>,
}));

jest.mock("@/components/ui/StarRating", () => ({
  StarRating: ({ value }: { value: number }) => (
    <div data-testid="star-rating">{value}</div>
  ),
}));

describe("NicheReviews", () => {
  it("renders a reviews section heading in Ukrainian", () => {
    render(<NicheReviews slug="restaurant" color="#6366f1" lang="uk" />);
    expect(screen.getByText(/що кажуть наші клієнти/i)).toBeInTheDocument();
  });

  it("renders English heading when lang='en'", () => {
    render(<NicheReviews slug="restaurant" color="#6366f1" lang="en" />);
    expect(screen.getByText(/what our clients say/i)).toBeInTheDocument();
  });

  it("shows 3 reviews", () => {
    render(<NicheReviews slug="restaurant" color="#6366f1" />);
    const avatars = screen.getAllByTestId("avatar");
    expect(avatars).toHaveLength(3);
  });

  it("shows star ratings for each review and summary", () => {
    render(<NicheReviews slug="restaurant" color="#6366f1" />);
    const ratings = screen.getAllByTestId("star-rating");
    // 3 individual + 1 summary = 4 total
    expect(ratings.length).toBeGreaterThanOrEqual(3);
  });

  it("shows reviewer names", () => {
    render(<NicheReviews slug="restaurant" color="#6366f1" />);
    // Avatars rendered with reviewer names
    const avatars = screen.getAllByTestId("avatar");
    avatars.forEach((avatar) => {
      expect(avatar.textContent).toBeTruthy();
    });
  });

  it("shows reviewer roles", () => {
    render(<NicheReviews slug="restaurant" color="#6366f1" />);
    // Each review card has a role like "Власниця бізнесу" etc.
    const text = document.body.textContent ?? "";
    // At least one role from the pool should be present
    expect(text).toMatch(
      /Власниця бізнесу|Підприємець|Директор компанії|ФОП|Власниця студії|Засновник стартапу/
    );
  });

  it("shows review text content", () => {
    render(<NicheReviews slug="restaurant" color="#6366f1" />);
    // Review text contains "Codeworth"
    expect(document.body.textContent).toContain("Codeworth");
  });

  it("shows dates in review cards", () => {
    render(<NicheReviews slug="restaurant" color="#6366f1" />);
    expect(document.body.textContent).toMatch(/2025/);
  });

  it("shows aggregate rating 4.9 / 5", () => {
    render(<NicheReviews slug="restaurant" color="#6366f1" />);
    expect(screen.getByText(/4\.9/)).toBeInTheDocument();
  });

  it("shows project count text in UK", () => {
    render(<NicheReviews slug="restaurant" color="#6366f1" lang="uk" />);
    expect(screen.getByText(/200\+/)).toBeInTheDocument();
  });

  it("shows project count text in EN", () => {
    render(<NicheReviews slug="restaurant" color="#6366f1" lang="en" />);
    expect(screen.getByText(/200\+/)).toBeInTheDocument();
  });

  it("shows English roles when lang='en'", () => {
    render(<NicheReviews slug="restaurant" color="#6366f1" lang="en" />);
    const text = document.body.textContent ?? "";
    expect(text).toMatch(
      /Business Owner|Entrepreneur|Company Director|Sole Trader|Studio Owner|Startup Founder/
    );
  });

  it("different slugs always render 3 reviews", () => {
    const { unmount } = render(<NicheReviews slug="beauty" color="#ec4899" />);
    expect(screen.getAllByTestId("avatar")).toHaveLength(3);
    unmount();
    render(<NicheReviews slug="medical" color="#10b981" />);
    expect(screen.getAllByTestId("avatar")).toHaveLength(3);
  });

  it("renders without crashing when no lang prop is provided (defaults to uk)", () => {
    render(<NicheReviews slug="default" color="#6366f1" />);
    expect(screen.getByText(/що кажуть наші клієнти/i)).toBeInTheDocument();
  });
});
