/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, act } from "@testing-library/react";
import { CountUp } from "../CountUp";

// Mock IntersectionObserver
const mockObserve = jest.fn();
const mockDisconnect = jest.fn();
let intersectionCallback: (entries: { isIntersecting: boolean }[]) => void;

beforeEach(() => {
  mockObserve.mockClear();
  mockDisconnect.mockClear();
  window.IntersectionObserver = jest.fn().mockImplementation((cb) => {
    intersectionCallback = cb;
    return { observe: mockObserve, disconnect: mockDisconnect };
  });
  // Mock requestAnimationFrame to run synchronously
  jest.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
    cb(performance.now() + 2000); // simulate time passed
    return 0;
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("CountUp", () => {
  it("спочатку показує 0", () => {
    render(<CountUp end={100} />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("показує suffix разом з числом", () => {
    render(<CountUp end={50} suffix="+" />);
    // Initially 0+
    expect(screen.getByText(/\+/)).toBeInTheDocument();
  });

  it("запускає анімацію коли елемент видимий (isIntersecting=true)", () => {
    render(<CountUp end={100} />);
    act(() => {
      intersectionCallback([{ isIntersecting: true }]);
    });
    // After rAF mock runs with large time delta, value should reach end
    expect(screen.getByText("100")).toBeInTheDocument();
  });

  it("не запускає анімацію повторно якщо вже started", () => {
    render(<CountUp end={100} />);
    act(() => {
      intersectionCallback([{ isIntersecting: true }]);
    });
    const rafCallCount = (window.requestAnimationFrame as jest.Mock).mock.calls.length;
    act(() => {
      intersectionCallback([{ isIntersecting: true }]);
    });
    // rAF should not be called again
    expect((window.requestAnimationFrame as jest.Mock).mock.calls.length).toBe(rafCallCount);
  });

  it("відключає IntersectionObserver при анмаунті", () => {
    const { unmount } = render(<CountUp end={100} />);
    unmount();
    expect(mockDisconnect).toHaveBeenCalled();
  });

  it("відображає правильний suffix після анімації", () => {
    render(<CountUp end={200} suffix=" проєктів" />);
    act(() => {
      intersectionCallback([{ isIntersecting: true }]);
    });
    expect(screen.getByText("200 проєктів")).toBeInTheDocument();
  });
});
