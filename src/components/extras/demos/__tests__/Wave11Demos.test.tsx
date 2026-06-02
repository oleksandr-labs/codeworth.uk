import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { EcomProductPageDemo } from "../EcomProductPageDemo";
import { EcomBackInStockDemo } from "../EcomBackInStockDemo";
import { EcomAbandonedCartDemo } from "../EcomAbandonedCartDemo";
import { EcomRecentlyViewedDemo } from "../EcomRecentlyViewedDemo";

expect.extend(toHaveNoViolations);

describe("EcomProductPageDemo", () => {
  it("renders product name and brand", () => {
    render(<EcomProductPageDemo isUk={true} />);
    expect(screen.getByText("MAISON D'ARIA")).toBeInTheDocument();
    expect(screen.getByText(/Преміум вовняне пальто/i)).toBeInTheDocument();
  });

  it("renders 4 color swatches", () => {
    render(<EcomProductPageDemo isUk={true} />);
    expect(screen.getByLabelText("Кемел")).toBeInTheDocument();
    expect(screen.getByLabelText("Темно-синій")).toBeInTheDocument();
    expect(screen.getByLabelText("Чорний")).toBeInTheDocument();
    expect(screen.getByLabelText("Бордо")).toBeInTheDocument();
  });

  it("disables out-of-stock size variant", () => {
    render(<EcomProductPageDemo isUk={false} />);
    // L-camel is 0 stock by default
    const lButton = screen.getByText("L").closest("button");
    expect(lButton).toBeDisabled();
  });

  it("adds to cart and shows success", () => {
    render(<EcomProductPageDemo isUk={false} />);
    fireEvent.click(screen.getByText(/Add to cart/i).closest("button")!);
    expect(screen.getByText(/Added!/i)).toBeInTheDocument();
  });

  it("toggles favorite", () => {
    render(<EcomProductPageDemo isUk={false} />);
    const favBtn = screen.getByLabelText(/Add to favorites/i);
    fireEvent.click(favBtn);
    expect(favBtn).toHaveAttribute("aria-pressed", "true");
  });

  it("has no a11y violations", async () => {
    const { container } = render(<EcomProductPageDemo isUk={false} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("EcomBackInStockDemo", () => {
  it("renders out-of-stock badge", () => {
    render(<EcomBackInStockDemo isUk={true} />);
    expect(screen.getByText(/Немає в наявності/i)).toBeInTheDocument();
  });

  it("renders 3 channel toggle buttons", () => {
    render(<EcomBackInStockDemo isUk={false} />);
    const emailBtn = screen.getAllByText("Email").find((el) => el.tagName !== "INPUT");
    expect(emailBtn).toBeDefined();
    expect(screen.getByText("SMS")).toBeInTheDocument();
    expect(screen.getByText("Telegram")).toBeInTheDocument();
  });

  it("disables submit when email is empty", () => {
    render(<EcomBackInStockDemo isUk={false} />);
    const submitBtn = screen.getByText(/Notify me/i).closest("button");
    expect(submitBtn).toBeDisabled();
  });

  it("subscribes and shows confirmation", () => {
    render(<EcomBackInStockDemo isUk={false} />);
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "test@example.com" } });
    fireEvent.click(screen.getByText(/Notify me/i).closest("button")!);
    expect(screen.getByText(/Cancel subscription/i)).toBeInTheDocument();
  });

  it("has no a11y violations", async () => {
    const { container } = render(<EcomBackInStockDemo isUk={false} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("EcomAbandonedCartDemo", () => {
  it("renders 3 sequence buttons", () => {
    render(<EcomAbandonedCartDemo isUk={false} />);
    expect(screen.getByText("+1h")).toBeInTheDocument();
    expect(screen.getByText("+24h")).toBeInTheDocument();
    expect(screen.getByText("+72h")).toBeInTheDocument();
  });

  it("switches sequence and shows different subject", () => {
    render(<EcomAbandonedCartDemo isUk={false} />);
    fireEvent.click(screen.getByText("+24h"));
    expect(screen.getByText(/10% off/i)).toBeInTheDocument();
  });

  it("renders stats progressbars", () => {
    render(<EcomAbandonedCartDemo isUk={false} />);
    const bars = screen.getAllByRole("progressbar");
    expect(bars.length).toBeGreaterThanOrEqual(3);
  });

  it("has no a11y violations", async () => {
    const { container } = render(<EcomAbandonedCartDemo isUk={false} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("EcomRecentlyViewedDemo", () => {
  it("renders 8 viewed products", () => {
    render(<EcomRecentlyViewedDemo isUk={true} />);
    // Count == 8 is shown as badge
    expect(screen.getByText("8")).toBeInTheDocument();
  });

  it("removes item on X click", () => {
    render(<EcomRecentlyViewedDemo isUk={false} />);
    const removeBtns = screen.getAllByLabelText("Remove from history");
    expect(removeBtns.length).toBe(8);
    fireEvent.click(removeBtns[0]);
    expect(screen.getByText("7")).toBeInTheDocument();
  });

  it("clears all items", () => {
    render(<EcomRecentlyViewedDemo isUk={false} />);
    fireEvent.click(screen.getByText("Clear all"));
    expect(screen.getByText(/View history is empty/i)).toBeInTheDocument();
  });

  it("restores demo from empty state", () => {
    render(<EcomRecentlyViewedDemo isUk={false} />);
    fireEvent.click(screen.getByText("Clear all"));
    fireEvent.click(screen.getByText(/Restore demo/i));
    expect(screen.getByText("8")).toBeInTheDocument();
  });

  it("has no a11y violations", async () => {
    const { container } = render(<EcomRecentlyViewedDemo isUk={false} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
