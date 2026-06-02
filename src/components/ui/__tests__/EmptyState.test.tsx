/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import { EmptyState } from "../EmptyState";

describe("EmptyState", () => {
  it("renders generic variant by default", () => {
    const { container } = render(<EmptyState />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("renders search variant", () => {
    const { container } = render(<EmptyState variant="search" />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    // Search illustration has a magnifying glass circle
    const circles = container.querySelectorAll("circle");
    expect(circles.length).toBeGreaterThan(0);
  });

  it("renders cart variant", () => {
    const { container } = render(<EmptyState variant="cart" />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    // Cart has wheel circles
    const circles = container.querySelectorAll("circle");
    expect(circles.length).toBeGreaterThan(0);
  });

  it("renders generic variant explicitly", () => {
    const { container } = render(<EmptyState variant="generic" />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("applies custom size to SVG", () => {
    const { container } = render(<EmptyState size={120} />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", "120");
    expect(svg).toHaveAttribute("height", "120");
  });

  it("applies default size of 160 when not specified", () => {
    const { container } = render(<EmptyState />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", "160");
    expect(svg).toHaveAttribute("height", "160");
  });

  it("applies custom className to wrapper div", () => {
    const { container } = render(<EmptyState className="my-custom-class" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("my-custom-class");
  });

  it("wrapper div always has flex justify-center", () => {
    const { container } = render(<EmptyState />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("flex");
    expect(wrapper.className).toContain("justify-center");
  });

  it("SVG has aria-hidden=true for accessibility", () => {
    const { container } = render(<EmptyState variant="search" />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });

  it("cart SVG has aria-hidden=true", () => {
    const { container } = render(<EmptyState variant="cart" />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });

  it("generic SVG has aria-hidden=true", () => {
    const { container } = render(<EmptyState variant="generic" />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });

  it("renders only one SVG per variant", () => {
    const { container } = render(<EmptyState variant="search" />);
    const svgs = container.querySelectorAll("svg");
    expect(svgs).toHaveLength(1);
  });
});
