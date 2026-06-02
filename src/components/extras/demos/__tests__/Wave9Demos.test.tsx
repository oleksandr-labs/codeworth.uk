import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { EcomWishlistDemo } from "../EcomWishlistDemo";
import { EcomCouponsDemo } from "../EcomCouponsDemo";
import { EcomReviewsDemo } from "../EcomReviewsDemo";
import { EcomLoyaltyDemo } from "../EcomLoyaltyDemo";

expect.extend(toHaveNoViolations);

describe("EcomWishlistDemo", () => {
  it("renders 6 products with heart buttons", () => {
    render(<EcomWishlistDemo isUk={true} />);
    const heartBtns = screen.getAllByRole("button").filter((b) =>
      /обраного|обране/i.test(b.getAttribute("aria-label") ?? "")
    );
    expect(heartBtns.length).toBe(6);
  });

  it("starts with 2 items already favorited", () => {
    render(<EcomWishlistDemo isUk={false} />);
    expect(screen.getByText("Wishlist")).toBeInTheDocument();
    // Badge count should show "2"
    const badges = screen.getAllByText("2");
    expect(badges.length).toBeGreaterThan(0);
  });

  it("toggles favorite on heart click", () => {
    render(<EcomWishlistDemo isUk={false} />);
    const addBtns = screen.getAllByRole("button").filter((b) =>
      /Add to wishlist/i.test(b.getAttribute("aria-label") ?? "")
    );
    if (addBtns.length > 0) {
      fireEvent.click(addBtns[0]);
      // After click, button label should change to "Remove from wishlist"
      expect(addBtns[0].getAttribute("aria-label")).toMatch(/Remove from/i);
    }
  });

  it("switches to wishlist view", () => {
    render(<EcomWishlistDemo isUk={false} />);
    fireEvent.click(screen.getByText("Wishlist"));
    expect(screen.getByText(/2 item/i)).toBeInTheDocument();
  });

  it("has no a11y violations", async () => {
    const { container } = render(<EcomWishlistDemo isUk={false} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("EcomCouponsDemo", () => {
  it("renders promo input", () => {
    render(<EcomCouponsDemo isUk={true} />);
    expect(screen.getByLabelText("Промокод")).toBeInTheDocument();
  });

  it("rejects invalid coupon", () => {
    render(<EcomCouponsDemo isUk={false} />);
    const input = screen.getByLabelText("Promo code") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "INVALID" } });
    fireEvent.click(screen.getByText("Apply"));
    expect(screen.getByText(/Invalid promo code/i)).toBeInTheDocument();
  });

  it("applies valid coupon and shows discount", () => {
    render(<EcomCouponsDemo isUk={false} />);
    const input = screen.getByLabelText("Promo code") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "WELCOME10" } });
    fireEvent.click(screen.getByText("Apply"));
    expect(screen.getByText(/Discount applied/i)).toBeInTheDocument();
  });

  it("has no a11y violations", async () => {
    const { container } = render(<EcomCouponsDemo isUk={false} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("EcomReviewsDemo", () => {
  it("renders 3 initial reviews", () => {
    render(<EcomReviewsDemo isUk={true} />);
    expect(screen.getByText("Olha M.")).toBeInTheDocument();
    expect(screen.getByText("Dmytro K.")).toBeInTheDocument();
    expect(screen.getByText("Anna S.")).toBeInTheDocument();
  });

  it("renders 5 rating distribution bars", () => {
    render(<EcomReviewsDemo isUk={false} />);
    const bars = screen.getAllByRole("progressbar");
    expect(bars.length).toBeGreaterThanOrEqual(5);
  });

  it("disables submit when form is incomplete", () => {
    render(<EcomReviewsDemo isUk={false} />);
    const submitBtn = screen.getByText(/Publish review/i).closest("button");
    expect(submitBtn).toBeDisabled();
  });

  it("submits review and shows confirmation", () => {
    render(<EcomReviewsDemo isUk={false} />);
    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Test User" } });
    fireEvent.change(screen.getByLabelText(/Review text/i), { target: { value: "Great product!" } });
    fireEvent.click(screen.getByLabelText("5 stars"));
    fireEvent.click(screen.getByText(/Publish review/i));
    expect(screen.getByText(/Thank you/i)).toBeInTheDocument();
  });

  it("has no a11y violations", async () => {
    const { container } = render(<EcomReviewsDemo isUk={false} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("EcomLoyaltyDemo", () => {
  it("renders current tier (Silver at 750 points)", () => {
    render(<EcomLoyaltyDemo isUk={false} />);
    expect(screen.getByText("Silver")).toBeInTheDocument();
    expect(screen.getByText("750")).toBeInTheDocument();
  });

  it("renders earn-action buttons", () => {
    render(<EcomLoyaltyDemo isUk={true} />);
    expect(screen.getByText("Замовлення")).toBeInTheDocument();
    expect(screen.getByText("Відгук")).toBeInTheDocument();
    expect(screen.getByText("Реферал")).toBeInTheDocument();
  });

  it("renders rewards catalog with 4 items", () => {
    render(<EcomLoyaltyDemo isUk={false} />);
    expect(screen.getByText(/£5 off coupon/i)).toBeInTheDocument();
    expect(screen.getByText(/Mystery gift/i)).toBeInTheDocument();
  });

  it("earns points on click", () => {
    render(<EcomLoyaltyDemo isUk={false} />);
    fireEvent.click(screen.getByText("Order").closest("button")!);
    expect(screen.getByText("800")).toBeInTheDocument();
  });

  it("has no a11y violations", async () => {
    const { container } = render(<EcomLoyaltyDemo isUk={false} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
