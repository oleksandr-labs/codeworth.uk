/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import { LogoIcon, LogoWordmark } from "../Logo";

describe("LogoIcon", () => {
  it("рендерить SVG з aria-label='Codeworth'", () => {
    render(<LogoIcon />);
    expect(screen.getByLabelText("Codeworth")).toBeInTheDocument();
  });

  it("застосовує дефолтний розмір 36", () => {
    const { container } = render(<LogoIcon />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", "36");
    expect(svg).toHaveAttribute("height", "36");
  });

  it("приймає кастомний розмір", () => {
    const { container } = render(<LogoIcon size={48} />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", "48");
    expect(svg).toHaveAttribute("height", "48");
  });
});

describe("LogoWordmark", () => {
  it("відображає текст 'Code' та 'Nest'", () => {
    render(<LogoWordmark />);
    expect(screen.getByText("Code")).toBeInTheDocument();
    expect(screen.getByText("Nest")).toBeInTheDocument();
  });

  it("містить SVG логотип (LogoIcon)", () => {
    const { container } = render(<LogoWordmark />);
    expect(container.querySelector("svg")).not.toBeNull();
  });

  it("приймає кастомний className", () => {
    const { container } = render(<LogoWordmark className="my-logo" />);
    expect((container.firstChild as HTMLElement).className).toContain("my-logo");
  });
});
