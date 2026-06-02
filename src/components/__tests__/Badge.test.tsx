import { render, screen } from "@testing-library/react";
import { Badge } from "../ui/Badge";

describe("Badge", () => {
  it("renders children text", () => {
    render(<Badge>Новий</Badge>);
    expect(screen.getByText("Новий")).toBeInTheDocument();
  });

  it("renders as span element", () => {
    const { container } = render(<Badge>Test</Badge>);
    expect(container.querySelector("span")).toBeInTheDocument();
  });

  it("applies default variant classes", () => {
    render(<Badge>Default</Badge>);
    const badge = screen.getByText("Default");
    expect(badge.className).toMatch(/bg-neutral-100/);
    expect(badge.className).toMatch(/text-neutral-700/);
  });

  it("applies success variant classes", () => {
    render(<Badge variant="success">Активний</Badge>);
    const badge = screen.getByText("Активний");
    expect(badge.className).toMatch(/bg-emerald-100/);
    expect(badge.className).toMatch(/text-emerald-700/);
  });

  it("applies error variant classes", () => {
    render(<Badge variant="error">Помилка</Badge>);
    const badge = screen.getByText("Помилка");
    expect(badge.className).toMatch(/bg-red-100/);
    expect(badge.className).toMatch(/text-red-700/);
  });

  it("applies warning variant classes", () => {
    render(<Badge variant="warning">Попередження</Badge>);
    const badge = screen.getByText("Попередження");
    expect(badge.className).toMatch(/bg-amber-100/);
    expect(badge.className).toMatch(/text-amber-700/);
  });

  it("applies hot variant classes", () => {
    render(<Badge variant="hot">Хіт</Badge>);
    const badge = screen.getByText("Хіт");
    expect(badge.className).toMatch(/bg-red-500/);
    expect(badge.className).toMatch(/text-white/);
  });

  it("applies new variant classes", () => {
    render(<Badge variant="new">New</Badge>);
    const badge = screen.getByText("New");
    expect(badge.className).toMatch(/bg-indigo-600/);
    expect(badge.className).toMatch(/text-white/);
  });

  it("applies custom className", () => {
    render(<Badge className="custom-class">Test</Badge>);
    expect(screen.getByText("Test")).toHaveClass("custom-class");
  });

  it("always applies rounded-full and text-xs", () => {
    render(<Badge>Test</Badge>);
    const badge = screen.getByText("Test");
    expect(badge.className).toMatch(/rounded-full/);
    expect(badge.className).toMatch(/text-xs/);
  });
});
