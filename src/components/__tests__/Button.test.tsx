import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "../ui/Button";

jest.mock("next/link", () => {
  return function MockLink({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  };
});

describe("Button", () => {
  it("renders children text", () => {
    render(<Button>Замовити</Button>);
    expect(screen.getByText("Замовити")).toBeInTheDocument();
  });

  it("renders as <button> by default", () => {
    render(<Button>Click</Button>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renders as <a> when href is provided", () => {
    render(<Button href="/contact">Зв'язатися</Button>);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/contact");
  });

  it("calls onClick handler", async () => {
    const handler = jest.fn();
    render(<Button onClick={handler}>Click me</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("applies primary variant classes by default", () => {
    render(<Button variant="primary">Primary</Button>);
    const btn = screen.getByRole("button");
    expect(btn.className).toMatch(/indigo/);
  });

  it("applies custom className", () => {
    render(<Button className="extra-class">Button</Button>);
    expect(screen.getByRole("button")).toHaveClass("extra-class");
  });

  it("is accessible (has visible text)", () => {
    render(<Button>Детальніше</Button>);
    expect(screen.getByRole("button", { name: "Детальніше" })).toBeInTheDocument();
  });

  it("renders with size prop without errors", () => {
    expect(() =>
      render(<Button size="lg">Large Button</Button>)
    ).not.toThrow();
    expect(() =>
      render(<Button size="sm">Small Button</Button>)
    ).not.toThrow();
  });
});
