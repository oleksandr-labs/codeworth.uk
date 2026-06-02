import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { AnalyticsLookerDemo } from "../AnalyticsLookerDemo";
import { HotjarDemo } from "../HotjarDemo";
import { AbTestDemo } from "../AbTestDemo";

expect.extend(toHaveNoViolations);

describe("AnalyticsLookerDemo", () => {
  it("renders 4 KPI cards", () => {
    render(<AnalyticsLookerDemo isUk={true} />);
    expect(screen.getByText("Користувачі")).toBeInTheDocument();
    expect(screen.getByText("Сесії")).toBeInTheDocument();
    expect(screen.getByText("Конверсії")).toBeInTheDocument();
    expect(screen.getByText("Дохід")).toBeInTheDocument();
  });

  it("renders 3 time range buttons", () => {
    render(<AnalyticsLookerDemo isUk={false} />);
    expect(screen.getByText(/Last 7 days/i)).toBeInTheDocument();
    expect(screen.getByText(/Last 30 days/i)).toBeInTheDocument();
    expect(screen.getByText(/Last 90 days/i)).toBeInTheDocument();
  });

  it("switches range", () => {
    render(<AnalyticsLookerDemo isUk={false} />);
    fireEvent.click(screen.getByText(/Last 90 days/i));
    expect(screen.getByText(/142,180/)).toBeInTheDocument();
  });

  it("renders traffic sources progressbars", () => {
    render(<AnalyticsLookerDemo isUk={false} />);
    const bars = screen.getAllByRole("progressbar");
    expect(bars.length).toBeGreaterThanOrEqual(5);
  });

  it("has no a11y violations", async () => {
    const { container } = render(<AnalyticsLookerDemo isUk={false} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("HotjarDemo", () => {
  it("renders 3 view mode buttons", () => {
    render(<HotjarDemo isUk={true} />);
    expect(screen.getByText("Клік-карта")).toBeInTheDocument();
    expect(screen.getByText("Глибина скролу")).toBeInTheDocument();
    expect(screen.getByText(/Rage clicks/i)).toBeInTheDocument();
  });

  it("switches to scroll mode", () => {
    render(<HotjarDemo isUk={false} />);
    fireEvent.click(screen.getByText("Scroll depth"));
    expect(screen.getByText(/Scroll map/i)).toBeInTheDocument();
  });

  it("switches to rage clicks mode", () => {
    render(<HotjarDemo isUk={false} />);
    fireEvent.click(screen.getByText(/Rage clicks/i));
    expect(screen.getByText(/rage clicks need attention/i)).toBeInTheDocument();
  });

  it("has no a11y violations", async () => {
    const { container } = render(<HotjarDemo isUk={false} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("AbTestDemo", () => {
  it("renders 2 variants", () => {
    render(<AbTestDemo isUk={true} />);
    // Control + Variant labels
    expect(screen.getByText("Контроль")).toBeInTheDocument();
    expect(screen.getByText("Варіант")).toBeInTheDocument();
  });

  it("shows winner badge when uplift > 5%", () => {
    render(<AbTestDemo isUk={false} />);
    expect(screen.getByText(/Winner/i)).toBeInTheDocument();
  });

  it("switches between tests", () => {
    render(<AbTestDemo isUk={false} />);
    fireEvent.click(screen.getByText(/Hero headline/i));
    expect(screen.getByText(/Sites that convert/i)).toBeInTheDocument();
  });

  it("displays uplift percentage", () => {
    render(<AbTestDemo isUk={false} />);
    // Uplift should be visible in summary banner
    const upliftBanner = screen.getByText(/Statistically significant/i);
    expect(upliftBanner).toBeInTheDocument();
  });

  it("has no a11y violations", async () => {
    const { container } = render(<AbTestDemo isUk={false} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
