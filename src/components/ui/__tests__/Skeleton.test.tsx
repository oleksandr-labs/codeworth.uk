/**
 * @jest-environment jsdom
 */
import React from "react";
import { render } from "@testing-library/react";
import { Skeleton, SkeletonCard, SkeletonText } from "../Skeleton";

describe("Skeleton", () => {
  it("рендерить div з animate-pulse", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveClass("animate-pulse");
  });

  it("приймає кастомний className", () => {
    const { container } = render(<Skeleton className="h-10 w-full" />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("h-10");
    expect(el.className).toContain("w-full");
  });
});

describe("SkeletonCard", () => {
  it("рендерить декілька skeleton елементів", () => {
    const { container } = render(<SkeletonCard />);
    const skeletons = container.querySelectorAll(".animate-pulse");
    expect(skeletons.length).toBeGreaterThan(1);
  });

  it("має rounded-2xl контейнер", () => {
    const { container } = render(<SkeletonCard />);
    expect((container.firstChild as HTMLElement).className).toContain("rounded-2xl");
  });
});

describe("SkeletonText", () => {
  it("рендерить 3 рядки за замовчуванням", () => {
    const { container } = render(<SkeletonText />);
    const lines = container.querySelectorAll(".animate-pulse");
    expect(lines.length).toBe(3);
  });

  it("рендерить потрібну кількість рядків", () => {
    const { container } = render(<SkeletonText lines={5} />);
    const lines = container.querySelectorAll(".animate-pulse");
    expect(lines.length).toBe(5);
  });

  it("останній рядок коротший (w-3/4)", () => {
    const { container } = render(<SkeletonText lines={3} />);
    const lines = Array.from(container.querySelectorAll(".animate-pulse"));
    expect(lines[lines.length - 1].className).toContain("w-3/4");
  });
});
