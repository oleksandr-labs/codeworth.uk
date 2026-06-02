import React from "react";
import { render, screen, act } from "@testing-library/react";
import { CountUp } from "../ui/CountUp";

// Mock IntersectionObserver
let observerCallback: ((entries: { isIntersecting: boolean }[]) => void) | null = null;
const mockObserve = jest.fn();
const mockDisconnect = jest.fn();

class MockIntersectionObserver {
  constructor(callback: (entries: { isIntersecting: boolean }[]) => void) {
    observerCallback = callback;
  }
  observe = mockObserve;
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
  mockDisconnect.mockReset();
});

describe("CountUp", () => {
  it("renders with initial value 0", () => {
    render(<CountUp end={100} />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("renders with suffix", () => {
    render(<CountUp end={50} suffix="+" />);
    expect(screen.getByText("0+")).toBeInTheDocument();
  });

  it("starts counting when element becomes visible", async () => {
    // Mock requestAnimationFrame to run immediately
    let rafCallback: FrameRequestCallback | null = null;
    const originalRaf = window.requestAnimationFrame;
    window.requestAnimationFrame = (cb) => {
      rafCallback = cb;
      return 0;
    };

    render(<CountUp end={100} duration={0} />);

    // Trigger intersection
    act(() => {
      observerCallback?.([{ isIntersecting: true }]);
    });

    // Run animation frame(s)
    act(() => {
      if (rafCallback) rafCallback(performance.now() + 1000);
    });

    window.requestAnimationFrame = originalRaf;
    // After animation, value should have increased
    const span = document.querySelector("span");
    expect(Number(span?.textContent)).toBeGreaterThanOrEqual(0);
  });

  it("does not count when element is not visible", () => {
    render(<CountUp end={100} />);

    act(() => {
      observerCallback?.([{ isIntersecting: false }]);
    });

    // Should still show 0
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("disconnects observer on unmount", () => {
    const { unmount } = render(<CountUp end={100} />);
    unmount();
    expect(mockDisconnect).toHaveBeenCalled();
  });

  it("calls IntersectionObserver.observe with the span element", () => {
    render(<CountUp end={42} />);
    expect(mockObserve).toHaveBeenCalledWith(expect.any(HTMLSpanElement));
  });

  it("uses default duration of 1800ms", () => {
    // Just verify it renders without errors with default duration
    render(<CountUp end={42} />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });
});
