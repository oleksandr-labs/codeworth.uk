import React from "react";
import { render, screen, act } from "@testing-library/react";
import { FadeIn } from "../ui/FadeIn";

// Mock IntersectionObserver
let observerCallback: ((entries: { isIntersecting: boolean }[]) => void) | null = null;
const mockObserve = jest.fn();
const mockUnobserve = jest.fn();
const mockDisconnect = jest.fn();

class MockIntersectionObserver {
  constructor(callback: (entries: { isIntersecting: boolean }[]) => void) {
    observerCallback = callback;
  }
  observe = mockObserve;
  unobserve = mockUnobserve;
  disconnect = mockDisconnect;
}

beforeAll(() => {
  Object.defineProperty(window, "IntersectionObserver", {
    value: MockIntersectionObserver,
    writable: true,
    configurable: true,
  });
});

beforeEach(() => {
  observerCallback = null;
  mockObserve.mockReset();
  mockUnobserve.mockReset();
  mockDisconnect.mockReset();
});

describe("FadeIn", () => {
  it("renders children", () => {
    render(<FadeIn><p>Hello</p></FadeIn>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("has 'reveal' class by default", () => {
    const { container } = render(<FadeIn>content</FadeIn>);
    expect(container.firstChild).toHaveClass("reveal");
  });

  it("does not have 'is-visible' class initially", () => {
    const { container } = render(<FadeIn>content</FadeIn>);
    expect(container.firstChild).not.toHaveClass("is-visible");
  });

  it("adds 'is-visible' class when element becomes visible", () => {
    const { container } = render(<FadeIn>content</FadeIn>);

    act(() => {
      observerCallback?.([{ isIntersecting: true }]);
    });

    expect(container.firstChild).toHaveClass("is-visible");
  });

  it("does not add 'is-visible' when not intersecting", () => {
    const { container } = render(<FadeIn>content</FadeIn>);

    act(() => {
      observerCallback?.([{ isIntersecting: false }]);
    });

    expect(container.firstChild).not.toHaveClass("is-visible");
  });

  it("unobserves after becoming visible (fires once)", () => {
    render(<FadeIn>content</FadeIn>);

    act(() => {
      observerCallback?.([{ isIntersecting: true }]);
    });

    expect(mockUnobserve).toHaveBeenCalled();
  });

  it("accepts custom className", () => {
    const { container } = render(<FadeIn className="my-class">content</FadeIn>);
    expect(container.firstChild).toHaveClass("my-class");
    expect(container.firstChild).toHaveClass("reveal");
  });

  it("adds delay class when delay > 0", () => {
    const { container } = render(<FadeIn delay={2}>content</FadeIn>);
    expect(container.firstChild).toHaveClass("reveal-delay-2");
  });

  it("does not add delay class when delay is 0 (default)", () => {
    const { container } = render(<FadeIn>content</FadeIn>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).not.toMatch(/reveal-delay/);
  });

  it("disconnects observer on unmount", () => {
    const { unmount } = render(<FadeIn>content</FadeIn>);
    unmount();
    expect(mockDisconnect).toHaveBeenCalled();
  });
});
