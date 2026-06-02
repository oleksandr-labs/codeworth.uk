import { render, screen } from "@testing-library/react";
import { Skeleton, SkeletonCard, SkeletonText } from "../ui/Skeleton";

describe("Skeleton", () => {
  it("renders a div with animate-pulse", () => {
    const { container } = render(<Skeleton />);
    const el = container.firstChild as HTMLElement;
    expect(el.tagName).toBe("DIV");
    expect(el.className).toMatch(/animate-pulse/);
  });

  it("applies custom className", () => {
    const { container } = render(<Skeleton className="h-10 w-full" />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toMatch(/h-10/);
    expect(el.className).toMatch(/w-full/);
  });

  it("applies rounded-lg by default", () => {
    const { container } = render(<Skeleton />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toMatch(/rounded-lg/);
  });
});

describe("SkeletonCard", () => {
  it("renders without crashing", () => {
    expect(() => render(<SkeletonCard />)).not.toThrow();
  });

  it("renders multiple skeleton elements", () => {
    const { container } = render(<SkeletonCard />);
    const skeletons = container.querySelectorAll(".animate-pulse");
    expect(skeletons.length).toBeGreaterThan(1);
  });
});

describe("SkeletonText", () => {
  it("renders 3 lines by default", () => {
    const { container } = render(<SkeletonText />);
    const lines = container.querySelectorAll(".animate-pulse");
    expect(lines.length).toBe(3);
  });

  it("renders custom number of lines", () => {
    const { container } = render(<SkeletonText lines={5} />);
    const lines = container.querySelectorAll(".animate-pulse");
    expect(lines.length).toBe(5);
  });

  it("renders 1 line", () => {
    const { container } = render(<SkeletonText lines={1} />);
    const lines = container.querySelectorAll(".animate-pulse");
    expect(lines.length).toBe(1);
  });
});
