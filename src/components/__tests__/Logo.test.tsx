import React from "react";
import { render, screen } from "@testing-library/react";
import { LogoIcon, LogoWordmark } from "../ui/Logo";

describe("LogoIcon", () => {
  it("renders an SVG", () => {
    const { container } = render(<LogoIcon />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("has aria-label 'Codeworth'", () => {
    render(<LogoIcon />);
    expect(screen.getByLabelText("Codeworth")).toBeInTheDocument();
  });

  it("uses default size 36", () => {
    const { container } = render(<LogoIcon />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", "36");
    expect(svg).toHaveAttribute("height", "36");
  });

  it("accepts custom size", () => {
    const { container } = render(<LogoIcon size={48} />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", "48");
    expect(svg).toHaveAttribute("height", "48");
  });

  it("accepts custom className", () => {
    const { container } = render(<LogoIcon className="my-class" />);
    expect(container.querySelector("svg")).toHaveClass("my-class");
  });
});

describe("LogoWordmark", () => {
  it("renders Codeworth text", () => {
    render(<LogoWordmark />);
    expect(screen.getByText("Code")).toBeInTheDocument();
    expect(screen.getByText("Nest")).toBeInTheDocument();
  });

  it("renders the LogoIcon inside", () => {
    const { container } = render(<LogoWordmark />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders as a span element", () => {
    const { container } = render(<LogoWordmark />);
    expect(container.firstChild?.nodeName).toBe("SPAN");
  });

  it("accepts custom size for the icon", () => {
    const { container } = render(<LogoWordmark size={24} />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", "24");
  });
});
