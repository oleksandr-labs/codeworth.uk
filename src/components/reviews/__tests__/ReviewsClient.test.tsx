/**
 * Tests for ReviewsClient component — platform/rating/service filters,
 * empty state, results count, and clear-all functionality.
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ReviewsClient } from "../ReviewsClient";
import type { Review } from "@/lib/data/reviews";

// Minimal mock reviews covering all filter branches
const MOCK_REVIEWS: Review[] = [
  {
    id: "r1",
    authorName: "Олена Марченко",
    authorRole: "CEO",
    text: "Відмінна робота над сайтом",
    textEn: "Excellent website work",
    rating: 5,
    date: "2026-01-15",
    platform: "google",
    serviceSlug: "website-dev",
    verified: true,
    resultHighlight: "+40% конверсій",
    resultHighlightEn: "+40% conversions",
  },
  {
    id: "r2",
    authorName: "Ігор Петренко",
    authorRole: "CTO",
    text: "Чудовий SEO результат",
    textEn: "Great SEO result",
    rating: 5,
    date: "2026-02-10",
    platform: "clutch",
    serviceSlug: "seo-service",
    verified: true,
  },
  {
    id: "r3",
    authorName: "Maria Smith",
    authorRole: "Owner",
    text: "Good ecommerce store",
    textEn: "Good ecommerce store",
    rating: 4,
    date: "2026-03-05",
    platform: "google",
    serviceSlug: "ecommerce",
    verified: false,
  },
  {
    id: "r4",
    authorName: "Дмитро Коваль",
    authorRole: "Marketing",
    text: "Гарний лендінг",
    textEn: "Nice landing page",
    rating: 5,
    date: "2026-03-20",
    platform: "dou",
    serviceSlug: "landing",
    verified: true,
  },
];

function renderComponent(props?: Partial<Parameters<typeof ReviewsClient>[0]>) {
  return render(
    <ReviewsClient
      reviews={MOCK_REVIEWS}
      lang="uk"
      isUk={true}
      {...props}
    />
  );
}

describe("ReviewsClient", () => {
  describe("initial render", () => {
    it("renders all reviews by default", () => {
      renderComponent();
      expect(screen.getByText("Олена Марченко")).toBeInTheDocument();
      expect(screen.getByText("Ігор Петренко")).toBeInTheDocument();
      expect(screen.getByText("Maria Smith")).toBeInTheDocument();
      expect(screen.getByText("Дмитро Коваль")).toBeInTheDocument();
    });

    it("shows correct results count for all reviews", () => {
      renderComponent();
      expect(screen.getByText(`Показано ${MOCK_REVIEWS.length} з ${MOCK_REVIEWS.length} відгуків`)).toBeInTheDocument();
    });

    it("shows result highlight when present", () => {
      renderComponent();
      expect(screen.getByText("+40% конверсій")).toBeInTheDocument();
    });

    it("renders filter bar with Фільтри label", () => {
      renderComponent();
      expect(screen.getByText("Фільтри")).toBeInTheDocument();
    });

    it("does not show 'Скинути всі' button when no filters active", () => {
      renderComponent();
      expect(screen.queryByText("Скинути всі")).not.toBeInTheDocument();
    });
  });

  describe("platform filter", () => {
    it("filters to google reviews only", () => {
      renderComponent();
      fireEvent.click(screen.getByRole("button", { name: "Google" }));
      // Google reviews: r1 + r3
      expect(screen.getByText("Олена Марченко")).toBeInTheDocument();
      expect(screen.getByText("Maria Smith")).toBeInTheDocument();
      expect(screen.queryByText("Ігор Петренко")).not.toBeInTheDocument();
      expect(screen.queryByText("Дмитро Коваль")).not.toBeInTheDocument();
    });

    it("filters to clutch reviews only", () => {
      renderComponent();
      fireEvent.click(screen.getByRole("button", { name: "Clutch" }));
      expect(screen.getByText("Ігор Петренко")).toBeInTheDocument();
      expect(screen.queryByText("Олена Марченко")).not.toBeInTheDocument();
    });

    it("filters to dou reviews only", () => {
      renderComponent();
      fireEvent.click(screen.getByRole("button", { name: "DOU" }));
      expect(screen.getByText("Дмитро Коваль")).toBeInTheDocument();
      expect(screen.queryByText("Ігор Петренко")).not.toBeInTheDocument();
    });

    it("updates results count after platform filter", () => {
      renderComponent();
      fireEvent.click(screen.getByRole("button", { name: "Google" }));
      expect(screen.getByText("Показано 2 з 4 відгуків")).toBeInTheDocument();
    });
  });

  describe("rating filter", () => {
    it("filters to 5-star reviews only", () => {
      renderComponent();
      fireEvent.click(screen.getByRole("button", { name: "★★★★★" }));
      expect(screen.getByText("Олена Марченко")).toBeInTheDocument();
      expect(screen.getByText("Ігор Петренко")).toBeInTheDocument();
      expect(screen.getByText("Дмитро Коваль")).toBeInTheDocument();
      // rating: 4 review should be hidden
      expect(screen.queryByText("Maria Smith")).not.toBeInTheDocument();
    });

    it("filters to 4+ star reviews (all 4 included)", () => {
      renderComponent();
      fireEvent.click(screen.getByRole("button", { name: "4★ і вище" }));
      expect(screen.getByText("Олена Марченко")).toBeInTheDocument();
      expect(screen.getByText("Maria Smith")).toBeInTheDocument();
      expect(screen.getByText("Показано 4 з 4 відгуків")).toBeInTheDocument();
    });
  });

  describe("service filter", () => {
    it("filters to website-dev reviews", () => {
      renderComponent();
      fireEvent.click(screen.getByRole("button", { name: "Розробка сайтів" }));
      expect(screen.getByText("Олена Марченко")).toBeInTheDocument();
      expect(screen.queryByText("Ігор Петренко")).not.toBeInTheDocument();
      expect(screen.queryByText("Maria Smith")).not.toBeInTheDocument();
    });

    it("filters to seo-service reviews", () => {
      renderComponent();
      fireEvent.click(screen.getByRole("button", { name: "SEO" }));
      expect(screen.getByText("Ігор Петренко")).toBeInTheDocument();
      expect(screen.queryByText("Олена Марченко")).not.toBeInTheDocument();
    });

    it("filters to ecommerce reviews", () => {
      renderComponent();
      fireEvent.click(screen.getByRole("button", { name: "Інтернет-магазин" }));
      expect(screen.getByText("Maria Smith")).toBeInTheDocument();
      expect(screen.queryByText("Дмитро Коваль")).not.toBeInTheDocument();
    });
  });

  describe("empty state", () => {
    it("shows empty state when no reviews match filters", () => {
      renderComponent();
      // Filter by clutch (only 1 review) then also by 4-star only (clutch review is 5 stars → no match)
      fireEvent.click(screen.getByRole("button", { name: "Clutch" }));
      const fourStarBtn = screen.getByRole("button", { name: "★★★★★" });
      // clutch = Ігор (5★) — still matches
      // Try a combination with no match: DOU + ecommerce
      fireEvent.click(screen.getByRole("button", { name: "DOU" }));
      fireEvent.click(screen.getByRole("button", { name: "Інтернет-магазин" }));
      expect(screen.getByText("Немає відгуків за обраними фільтрами")).toBeInTheDocument();
      expect(screen.getByText("Спробуйте скинути фільтри")).toBeInTheDocument();
    });
  });

  describe("clear all filters", () => {
    it("shows Скинути всі when a filter is active", () => {
      renderComponent();
      fireEvent.click(screen.getByRole("button", { name: "Google" }));
      expect(screen.getByText("Скинути всі")).toBeInTheDocument();
    });

    it("resets all filters and shows all reviews", () => {
      renderComponent();
      fireEvent.click(screen.getByRole("button", { name: "Clutch" }));
      expect(screen.queryByText("Дмитро Коваль")).not.toBeInTheDocument();
      fireEvent.click(screen.getByText("Скинути всі"));
      expect(screen.getByText("Дмитро Коваль")).toBeInTheDocument();
      expect(screen.getByText(`Показано ${MOCK_REVIEWS.length} з ${MOCK_REVIEWS.length} відгуків`)).toBeInTheDocument();
    });

    it("hides Скинути всі after reset", () => {
      renderComponent();
      fireEvent.click(screen.getByRole("button", { name: "Google" }));
      fireEvent.click(screen.getByText("Скинути всі"));
      expect(screen.queryByText("Скинути всі")).not.toBeInTheDocument();
    });
  });

  describe("EN locale", () => {
    it("renders English labels when isUk is false", () => {
      renderComponent({ isUk: false });
      expect(screen.getByText("Filters")).toBeInTheDocument();
      expect(screen.getByText(`Showing ${MOCK_REVIEWS.length} of ${MOCK_REVIEWS.length} reviews`)).toBeInTheDocument();
    });

    it("shows English result highlight", () => {
      renderComponent({ isUk: false });
      expect(screen.getByText("+40% conversions")).toBeInTheDocument();
    });

    it("shows 'Clear all' button in EN when filter active", () => {
      renderComponent({ isUk: false });
      fireEvent.click(screen.getByRole("button", { name: "Google" }));
      expect(screen.getByText("Clear all")).toBeInTheDocument();
    });

    it("shows EN empty state message", () => {
      renderComponent({ isUk: false });
      fireEvent.click(screen.getByRole("button", { name: "DOU" }));
      fireEvent.click(screen.getByRole("button", { name: "E-commerce" }));
      expect(screen.getByText("No reviews match the selected filters")).toBeInTheDocument();
    });
  });

  describe("empty reviews array", () => {
    it("shows empty state with no reviews", () => {
      render(<ReviewsClient reviews={[]} lang="uk" isUk={true} />);
      expect(screen.getByText("Немає відгуків за обраними фільтрами")).toBeInTheDocument();
    });
  });
});
