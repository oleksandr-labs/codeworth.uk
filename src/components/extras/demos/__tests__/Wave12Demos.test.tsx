import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { EcomReturnsDemo } from "../EcomReturnsDemo";
import { EcomInventoryDemo } from "../EcomInventoryDemo";
import { EcomSubscriptionDemo } from "../EcomSubscriptionDemo";
import { EcomInvoiceGenDemo } from "../EcomInvoiceGenDemo";

expect.extend(toHaveNoViolations);

describe("EcomReturnsDemo", () => {
  it("starts with order selection", () => {
    render(<EcomReturnsDemo isUk={true} />);
    expect(screen.getByText(/Оберіть замовлення/i)).toBeInTheDocument();
  });

  it("advances through wizard stages", () => {
    render(<EcomReturnsDemo isUk={false} />);
    // Stage 1: select order
    fireEvent.click(screen.getByText("ORD-2026-00184"));
    expect(screen.getByText(/What do you want to return/i)).toBeInTheDocument();
  });

  it("disables ineligible items", () => {
    render(<EcomReturnsDemo isUk={false} />);
    fireEvent.click(screen.getByText("ORD-2026-00179"));
    const checkboxes = screen.getAllByRole("checkbox");
    // Second item (sport socks) is not returnable
    expect(checkboxes[1]).toBeDisabled();
  });

  it("has no a11y violations", async () => {
    const { container } = render(<EcomReturnsDemo isUk={false} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("EcomInventoryDemo", () => {
  it("renders KPI cards", () => {
    render(<EcomInventoryDemo isUk={true} />);
    expect(screen.getByText(/Всього SKU/i)).toBeInTheDocument();
    expect(screen.getByText(/Закінчуються/i)).toBeInTheDocument();
    expect(screen.getByText(/Закінчилось/i)).toBeInTheDocument();
  });

  it("filters by out-of-stock", () => {
    render(<EcomInventoryDemo isUk={false} />);
    fireEvent.click(screen.getByText(/Out of stock/i).closest("button")!);
    // Only T-Shirt has stock=0
    expect(screen.getByText(/T-Shirt — White — L/i)).toBeInTheDocument();
  });

  it("searches by SKU", () => {
    render(<EcomInventoryDemo isUk={false} />);
    const search = screen.getByLabelText("Search") as HTMLInputElement;
    fireEvent.change(search, { target: { value: "WC-CAM" } });
    expect(screen.getByText(/Wool Coat/i)).toBeInTheDocument();
  });

  it("has no a11y violations", async () => {
    const { container } = render(<EcomInventoryDemo isUk={false} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("EcomSubscriptionDemo", () => {
  it("renders 3 plans", () => {
    render(<EcomSubscriptionDemo isUk={true} />);
    expect(screen.getByText("Місячна")).toBeInTheDocument();
    expect(screen.getByText("Квартальна")).toBeInTheDocument();
    expect(screen.getByText("Річна")).toBeInTheDocument();
  });

  it("highlights popular plan", () => {
    render(<EcomSubscriptionDemo isUk={false} />);
    expect(screen.getByText("POPULAR")).toBeInTheDocument();
  });

  it("subscribes and shows management portal", () => {
    render(<EcomSubscriptionDemo isUk={false} />);
    fireEvent.click(screen.getByText(/Subscribe for/i));
    expect(screen.getByText(/Subscription active/i)).toBeInTheDocument();
  });

  it("toggles pause/resume", () => {
    render(<EcomSubscriptionDemo isUk={false} />);
    fireEvent.click(screen.getByText(/Subscribe for/i));
    fireEvent.click(screen.getByText("Pause"));
    expect(screen.getByText("Resume")).toBeInTheDocument();
  });

  it("has no a11y violations", async () => {
    const { container } = render(<EcomSubscriptionDemo isUk={false} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("EcomInvoiceGenDemo", () => {
  it("renders invoice preview by default", () => {
    render(<EcomInvoiceGenDemo isUk={true} />);
    expect(screen.getByText("INV-2026-00184")).toBeInTheDocument();
  });

  it("renders 3 template options", () => {
    render(<EcomInvoiceGenDemo isUk={false} />);
    expect(screen.getByText("Professional")).toBeInTheDocument();
    expect(screen.getByText("Minimal")).toBeInTheDocument();
    expect(screen.getByText("Corporate")).toBeInTheDocument();
  });

  it("switches to HTML view", () => {
    const { container } = render(<EcomInvoiceGenDemo isUk={false} />);
    fireEvent.click(screen.getByText("HTML"));
    // HTML view renders <pre> code block
    const pre = container.querySelector("pre");
    expect(pre).toBeInTheDocument();
    expect(pre?.textContent).toContain("PDFKit");
  });

  it("shows downloaded confirmation", () => {
    render(<EcomInvoiceGenDemo isUk={false} />);
    fireEvent.click(screen.getByText(/Download PDF/i));
    expect(screen.getByText(/✓ Downloaded/i)).toBeInTheDocument();
  });

  it("has no a11y violations", async () => {
    const { container } = render(<EcomInvoiceGenDemo isUk={false} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
