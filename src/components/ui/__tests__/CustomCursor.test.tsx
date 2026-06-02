/**
 * @jest-environment jsdom
 */
import React from "react";
import { render } from "@testing-library/react";
import { CustomCursor } from "../CustomCursor";

// Mock requestAnimationFrame
let rafCallbacks: FrameRequestCallback[] = [];
beforeAll(() => {
  jest.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
    rafCallbacks.push(cb);
    return rafCallbacks.length;
  });
  jest.spyOn(window, "cancelAnimationFrame").mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});

beforeEach(() => {
  rafCallbacks = [];
});

function mockMatchMedia(matches: boolean) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockReturnValue({ matches }),
  });
}

describe("CustomCursor", () => {
  it("renders dot and ring elements", () => {
    mockMatchMedia(true);
    const { container } = render(<CustomCursor />);
    const divs = container.querySelectorAll("div");
    expect(divs).toHaveLength(2);
  });

  it("dot element has class custom-cursor", () => {
    mockMatchMedia(true);
    const { container } = render(<CustomCursor />);
    const dot = container.querySelector(".custom-cursor");
    expect(dot).toBeInTheDocument();
  });

  it("ring element has class custom-cursor-ring", () => {
    mockMatchMedia(true);
    const { container } = render(<CustomCursor />);
    const ring = container.querySelector(".custom-cursor-ring");
    expect(ring).toBeInTheDocument();
  });

  it("both elements have aria-hidden=true", () => {
    mockMatchMedia(true);
    const { container } = render(<CustomCursor />);
    const divs = container.querySelectorAll("[aria-hidden='true']");
    expect(divs).toHaveLength(2);
  });

  it("elements become visible (opacity 1) after mount on pointer device", () => {
    mockMatchMedia(true);
    const { container } = render(<CustomCursor />);
    const [dot, ring] = container.querySelectorAll("div");
    expect(dot).toHaveStyle({ opacity: "1" });
    expect(ring).toHaveStyle({ opacity: "1" });
  });

  it("elements stay hidden (opacity 0) on touch-only device", () => {
    mockMatchMedia(false);
    const { container } = render(<CustomCursor />);
    const [dot, ring] = container.querySelectorAll("div");
    expect(dot).toHaveStyle({ opacity: "0" });
    expect(ring).toHaveStyle({ opacity: "0" });
  });

  it("registers mousemove event listener on pointer device", () => {
    mockMatchMedia(true);
    const addEventSpy = jest.spyOn(document, "addEventListener");
    render(<CustomCursor />);
    expect(addEventSpy).toHaveBeenCalledWith("mousemove", expect.any(Function), { passive: true });
    addEventSpy.mockRestore();
  });

  it("registers mouseover event listener on pointer device", () => {
    mockMatchMedia(true);
    const addEventSpy = jest.spyOn(document, "addEventListener");
    render(<CustomCursor />);
    expect(addEventSpy).toHaveBeenCalledWith("mouseover", expect.any(Function), { passive: true });
    addEventSpy.mockRestore();
  });

  it("registers mouseout event listener on pointer device", () => {
    mockMatchMedia(true);
    const addEventSpy = jest.spyOn(document, "addEventListener");
    render(<CustomCursor />);
    expect(addEventSpy).toHaveBeenCalledWith("mouseout", expect.any(Function), { passive: true });
    addEventSpy.mockRestore();
  });

  it("does not register listeners on touch-only device", () => {
    mockMatchMedia(false);
    const addEventSpy = jest.spyOn(document, "addEventListener");
    render(<CustomCursor />);
    expect(addEventSpy).not.toHaveBeenCalledWith("mousemove", expect.any(Function), expect.anything());
    addEventSpy.mockRestore();
  });

  it("removes event listeners on unmount", () => {
    mockMatchMedia(true);
    const removeEventSpy = jest.spyOn(document, "removeEventListener");
    const { unmount } = render(<CustomCursor />);
    unmount();
    expect(removeEventSpy).toHaveBeenCalledWith("mousemove", expect.any(Function));
    expect(removeEventSpy).toHaveBeenCalledWith("mouseover", expect.any(Function));
    expect(removeEventSpy).toHaveBeenCalledWith("mouseout", expect.any(Function));
    removeEventSpy.mockRestore();
  });

  it("cancels animation frame on unmount", () => {
    mockMatchMedia(true);
    const { unmount } = render(<CustomCursor />);
    unmount();
    expect(window.cancelAnimationFrame).toHaveBeenCalled();
  });
});
