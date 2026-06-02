import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { EcomFlashSaleDemo } from "../EcomFlashSaleDemo";
import { EcomUpsellDemo } from "../EcomUpsellDemo";
import { EcomTrackingDemo } from "../EcomTrackingDemo";
import { EcomGiftCardDemo } from "../EcomGiftCardDemo";

expect.extend(toHaveNoViolations);

describe("EcomFlashSaleDemo", () => {
  it("renders flash sale banner", () => {
    render(<EcomFlashSaleDemo isUk={true} />);
    expect(screen.getAllByText(/Flash-розпродаж/i).length).toBeGreaterThan(0);
  });

  it("renders 4 sale items", () => {
    render(<EcomFlashSaleDemo isUk={false} />);
    const buyButtons = screen.getAllByRole("button").filter((b) =>
      /Buy now/i.test(b.textContent ?? "")
    );
    expect(buyButtons.length).toBe(4);
  });

  it("adds item to cart on Buy now click", () => {
    render(<EcomFlashSaleDemo isUk={false} />);
    const buyBtn = screen.getAllByText(/Buy now/i)[0].closest("button")!;
    fireEvent.click(buyBtn);
    expect(screen.getAllByText(/Added/i).length).toBeGreaterThan(0);
  });

  it("has no a11y violations", async () => {
    const { container } = render(<EcomFlashSaleDemo isUk={false} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("EcomUpsellDemo", () => {
  it("renders bundle view by default with FBT heading", () => {
    render(<EcomUpsellDemo isUk={true} />);
    expect(screen.getByText(/Часто купують разом/i)).toBeInTheDocument();
  });

  it("switches to cross-sell carousel", () => {
    render(<EcomUpsellDemo isUk={false} />);
    fireEvent.click(screen.getByText(/Cross-sell carousel/i));
    expect(screen.getByText(/You might also like/i)).toBeInTheDocument();
  });

  it("toggles items in bundle", () => {
    render(<EcomUpsellDemo isUk={false} />);
    const checkboxes = screen.getAllByRole("checkbox");
    const initialChecked = checkboxes.filter((c) => (c as HTMLInputElement).checked).length;
    fireEvent.click(checkboxes[1]);
    const afterChecked = screen.getAllByRole("checkbox").filter((c) => (c as HTMLInputElement).checked).length;
    expect(afterChecked).not.toBe(initialChecked);
  });

  it("has no a11y violations", async () => {
    const { container } = render(<EcomUpsellDemo isUk={false} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("EcomTrackingDemo", () => {
  it("loads default tracking number", () => {
    render(<EcomTrackingDemo isUk={true} />);
    expect(screen.getByText("59000000000")).toBeInTheDocument();
  });

  it("renders 5-stage progress stepper", () => {
    render(<EcomTrackingDemo isUk={false} />);
    expect(screen.getByText("Created")).toBeInTheDocument();
    expect(screen.getByText("Delivered")).toBeInTheDocument();
  });

  it("shows error on invalid tracking number", () => {
    render(<EcomTrackingDemo isUk={false} />);
    const input = screen.getByLabelText("Tracking number") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "INVALID" } });
    fireEvent.click(screen.getByText(/^Track$/));
    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });

  it("loads alternate tracking number", () => {
    render(<EcomTrackingDemo isUk={false} />);
    const input = screen.getByLabelText("Tracking number") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "20450001234" } });
    fireEvent.click(screen.getByText(/^Track$/));
    expect(screen.getAllByText("20450001234").length).toBeGreaterThan(0);
  });

  it("has no a11y violations", async () => {
    const { container } = render(<EcomTrackingDemo isUk={false} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("EcomGiftCardDemo", () => {
  it("renders 4 design buttons", () => {
    render(<EcomGiftCardDemo isUk={true} />);
    expect(screen.getByLabelText("День народження")).toBeInTheDocument();
    expect(screen.getByLabelText("Свято")).toBeInTheDocument();
  });

  it("renders 5 amount presets", () => {
    render(<EcomGiftCardDemo isUk={false} />);
    expect(screen.getByText(/£13$/)).toBeInTheDocument(); // 500/40
    expect(screen.getByText(/£250$/)).toBeInTheDocument(); // 10000/40
  });

  it("switches design on click", () => {
    render(<EcomGiftCardDemo isUk={false} />);
    fireEvent.click(screen.getByLabelText("Love"));
    expect(screen.getByLabelText("Love")).toHaveAttribute("aria-pressed", "true");
  });

  it("disables buy button when recipient is empty", () => {
    render(<EcomGiftCardDemo isUk={false} />);
    const buyBtn = screen.getByText(/Buy for/i).closest("button");
    expect(buyBtn).toBeDisabled();
  });

  it("enables buy when recipient filled", () => {
    render(<EcomGiftCardDemo isUk={false} />);
    fireEvent.change(screen.getByLabelText("Recipient email"), {
      target: { value: "test@example.com" },
    });
    const buyBtn = screen.getByText(/Buy for/i).closest("button");
    expect(buyBtn).not.toBeDisabled();
  });

  it("has no a11y violations", async () => {
    const { container } = render(<EcomGiftCardDemo isUk={false} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
