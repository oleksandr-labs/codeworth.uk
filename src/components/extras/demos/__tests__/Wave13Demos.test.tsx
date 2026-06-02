import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { EcomMultivendorDemo } from "../EcomMultivendorDemo";
import { EcomB2bDemo } from "../EcomB2bDemo";
import { IntCrmDemo } from "../IntCrmDemo";
import { MktWelcomeSeriesDemo } from "../MktWelcomeSeriesDemo";

expect.extend(toHaveNoViolations);

describe("EcomMultivendorDemo", () => {
  it("renders 6 vendor cards", () => {
    render(<EcomMultivendorDemo isUk={true} />);
    expect(screen.getByText("Atelier Maria")).toBeInTheDocument();
    expect(screen.getByText("Carpathian Honey")).toBeInTheDocument();
    expect(screen.getByText("Lviv Wood Studio")).toBeInTheDocument();
  });

  it("opens vendor page on click", () => {
    render(<EcomMultivendorDemo isUk={false} />);
    fireEvent.click(screen.getByText("Atelier Maria"));
    expect(screen.getByText(/All vendors/i)).toBeInTheDocument();
  });

  it("filters vendors by search", () => {
    render(<EcomMultivendorDemo isUk={false} />);
    fireEvent.change(screen.getByLabelText("Search"), { target: { value: "Lviv" } });
    expect(screen.getByText("Lviv Wood Studio")).toBeInTheDocument();
    expect(screen.queryByText("Atelier Maria")).not.toBeInTheDocument();
  });

  it("has no a11y violations", async () => {
    const { container } = render(<EcomMultivendorDemo isUk={false} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("EcomB2bDemo", () => {
  it("renders 2 products with tier pricing", () => {
    render(<EcomB2bDemo isUk={true} />);
    expect(screen.getByText("Преміум кава 1кг")).toBeInTheDocument();
    expect(screen.getByText("Корпоративна чашка")).toBeInTheDocument();
  });

  it("renders 3 payment method radios", () => {
    render(<EcomB2bDemo isUk={false} />);
    expect(screen.getByText(/Card.*now/i)).toBeInTheDocument();
    expect(screen.getByText(/Net 30/i)).toBeInTheDocument();
    expect(screen.getByText(/Net 60/i)).toBeInTheDocument();
  });

  it("disables checkout when company info empty", () => {
    render(<EcomB2bDemo isUk={false} />);
    const btn = screen.getByText(/Issue invoice/i).closest("button");
    expect(btn).toBeDisabled();
  });

  it("enables checkout when company filled", () => {
    render(<EcomB2bDemo isUk={false} />);
    fireEvent.change(screen.getByLabelText(/Company/i), { target: { value: "Test LLC" } });
    fireEvent.change(screen.getByLabelText(/VAT/i), { target: { value: "GB123456" } });
    const btn = screen.getByText(/Issue invoice/i).closest("button");
    expect(btn).not.toBeDisabled();
  });

  it("has no a11y violations", async () => {
    const { container } = render(<EcomB2bDemo isUk={false} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("IntCrmDemo", () => {
  it("renders 5 stage columns", () => {
    render(<IntCrmDemo isUk={true} />);
    expect(screen.getByText("Новий")).toBeInTheDocument();
    expect(screen.getByText(/Виграно/i)).toBeInTheDocument();
  });

  it("renders connected Bitrix24 status", () => {
    render(<IntCrmDemo isUk={false} />);
    expect(screen.getByText("Bitrix24")).toBeInTheDocument();
    expect(screen.getByText(/Connected/i)).toBeInTheDocument();
  });

  it("syncs and adds a new lead", () => {
    jest.useFakeTimers();
    render(<IntCrmDemo isUk={false} />);
    fireEvent.click(screen.getByText("Sync"));
    jest.advanceTimersByTime(1500);
    jest.useRealTimers();
  });

  it("has no a11y violations", async () => {
    const { container } = render(<IntCrmDemo isUk={false} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("MktWelcomeSeriesDemo", () => {
  it("renders 4 timeline buttons", () => {
    render(<MktWelcomeSeriesDemo isUk={true} />);
    expect(screen.getAllByText("Одразу").length).toBeGreaterThan(0);
    expect(screen.getAllByText("День 2").length).toBeGreaterThan(0);
    expect(screen.getAllByText("День 5").length).toBeGreaterThan(0);
    expect(screen.getAllByText("День 8").length).toBeGreaterThan(0);
  });

  it("switches active email", () => {
    render(<MktWelcomeSeriesDemo isUk={false} />);
    fireEvent.click(screen.getAllByText("Day 5")[0]);
    expect(screen.getAllByText(/Case study/i).length).toBeGreaterThan(0);
  });

  it("renders open + click rate progressbars", () => {
    render(<MktWelcomeSeriesDemo isUk={false} />);
    const bars = screen.getAllByRole("progressbar");
    expect(bars.length).toBeGreaterThanOrEqual(2);
  });

  it("has no a11y violations", async () => {
    const { container } = render(<MktWelcomeSeriesDemo isUk={false} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
