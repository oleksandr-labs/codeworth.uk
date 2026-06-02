/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, act } from "@testing-library/react";
import { FadeIn } from "../FadeIn";

const mockObserve = jest.fn();
const mockUnobserve = jest.fn();
const mockDisconnect = jest.fn();
let intersectionCallback: (entries: { isIntersecting: boolean }[]) => void;

beforeEach(() => {
  mockObserve.mockClear();
  mockUnobserve.mockClear();
  mockDisconnect.mockClear();
  window.IntersectionObserver = jest.fn().mockImplementation((cb) => {
    intersectionCallback = cb;
    return { observe: mockObserve, unobserve: mockUnobserve, disconnect: mockDisconnect };
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("FadeIn", () => {
  it("рендерить дочірні елементи", () => {
    render(<FadeIn><p>Контент</p></FadeIn>);
    expect(screen.getByText("Контент")).toBeInTheDocument();
  });

  it("обгортає в div з класом 'reveal'", () => {
    const { container } = render(<FadeIn>Test</FadeIn>);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("reveal");
  });

  it("додає reveal-delay клас коли delay > 0", () => {
    const { container } = render(<FadeIn delay={2}>Test</FadeIn>);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("reveal-delay-2");
  });

  it("не додає reveal-delay клас коли delay=0", () => {
    const { container } = render(<FadeIn delay={0}>Test</FadeIn>);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).not.toContain("reveal-delay");
  });

  it("додає клас 'is-visible' коли елемент видимий", () => {
    const { container } = render(<FadeIn>Test</FadeIn>);
    const wrapper = container.firstChild as HTMLElement;
    act(() => {
      intersectionCallback([{ isIntersecting: true }]);
    });
    expect(wrapper.className).toContain("is-visible");
  });

  it("не додає 'is-visible' коли isIntersecting=false", () => {
    const { container } = render(<FadeIn>Test</FadeIn>);
    const wrapper = container.firstChild as HTMLElement;
    act(() => {
      intersectionCallback([{ isIntersecting: false }]);
    });
    expect(wrapper.className).not.toContain("is-visible");
  });

  it("відключає observer при анмаунті", () => {
    const { unmount } = render(<FadeIn>Test</FadeIn>);
    unmount();
    expect(mockDisconnect).toHaveBeenCalled();
  });

  it("приймає кастомний className", () => {
    const { container } = render(<FadeIn className="custom-fade">Test</FadeIn>);
    expect((container.firstChild as HTMLElement).className).toContain("custom-fade");
  });
});
