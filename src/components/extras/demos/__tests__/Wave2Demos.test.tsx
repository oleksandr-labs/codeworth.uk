import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { CompareDemo } from "../CompareDemo";
import { StickySidebarDemo } from "../StickySidebarDemo";
import { A11yToolbarDemo } from "../A11yToolbarDemo";
import { PrintPdfDemo } from "../PrintPdfDemo";

expect.extend(toHaveNoViolations);

// IntersectionObserver mock for StickySidebar
class IOMock {
  observe() {}
  disconnect() {}
  unobserve() {}
  takeRecords() { return []; }
  root = null;
  rootMargin = "";
  thresholds = [];
}
(global as unknown as { IntersectionObserver: typeof IOMock }).IntersectionObserver = IOMock;

describe("CompareDemo", () => {
  it("renders comparison table with 3 plans", () => {
    render(<CompareDemo isUk={true} />);
    const cells = screen.getAllByRole("columnheader");
    // 1 feature column + 3 plan columns
    expect(cells.length).toBe(4);
  });

  it("toggles differences-only filter", () => {
    render(<CompareDemo isUk={false} />);
    const checkbox = screen.getByRole("checkbox");
    const initialRows = screen.getAllByRole("row").length;
    fireEvent.click(checkbox);
    const afterRows = screen.getAllByRole("row").length;
    expect(afterRows).toBeLessThanOrEqual(initialRows);
  });

  it("has no a11y violations", async () => {
    const { container } = render(<CompareDemo isUk={false} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("StickySidebarDemo", () => {
  it("renders TOC navigation with sections", () => {
    render(<StickySidebarDemo isUk={true} />);
    expect(screen.getAllByRole("link").length).toBeGreaterThanOrEqual(5);
  });

  it("renders for EN locale", () => {
    render(<StickySidebarDemo isUk={false} />);
    expect(screen.getAllByText("Introduction").length).toBeGreaterThan(0);
  });

  it("has no a11y violations", async () => {
    const { container } = render(<StickySidebarDemo isUk={false} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("A11yToolbarDemo", () => {
  it("renders font size presets", () => {
    render(<A11yToolbarDemo isUk={true} />);
    expect(screen.getByText("100%")).toBeInTheDocument();
    expect(screen.getByText("175%")).toBeInTheDocument();
  });

  it("changes font size on preset click", () => {
    render(<A11yToolbarDemo isUk={false} />);
    const btn150 = screen.getByText("150%");
    fireEvent.click(btn150);
    expect(btn150).toHaveAttribute("aria-pressed", "true");
  });

  it("toggles toolbar visibility", () => {
    render(<A11yToolbarDemo isUk={false} />);
    const toggleBtn = screen.getAllByRole("button").find(
      (b) => b.getAttribute("aria-controls") === "a11y-toolbar"
    );
    expect(toggleBtn).toBeDefined();
    if (toggleBtn) {
      fireEvent.click(toggleBtn);
      expect(toggleBtn).toHaveAttribute("aria-expanded", "false");
    }
  });

  it("has no a11y violations", async () => {
    const { container } = render(<A11yToolbarDemo isUk={false} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("PrintPdfDemo", () => {
  it("renders 3 template types", () => {
    render(<PrintPdfDemo isUk={true} />);
    expect(screen.getAllByText(/Рахунок-фактура/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Кейс/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Резюме/i).length).toBeGreaterThan(0);
  });

  it("switches preview on type click", () => {
    render(<PrintPdfDemo isUk={false} />);
    const cvBtn = screen.getByText("CV / Resume");
    fireEvent.click(cvBtn);
    expect(screen.getByText("Oleksiy Kovalenko")).toBeInTheDocument();
  });

  it("shows toast on print/PDF click", () => {
    render(<PrintPdfDemo isUk={false} />);
    const printBtn = screen.getByText("Print");
    fireEvent.click(printBtn);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("has no a11y violations", async () => {
    const { container } = render(<PrintPdfDemo isUk={false} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
