import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
import { BackToTop } from "../ui/BackToTop";

jest.mock("next/navigation", () => ({
  useParams: () => ({ lang: "uk" }),
}));

// Helper to simulate scroll position
function setScrollY(value: number) {
  Object.defineProperty(window, "scrollY", { value, writable: true, configurable: true });
  window.dispatchEvent(new Event("scroll"));
}

describe("BackToTop", () => {
  beforeEach(() => {
    Object.defineProperty(window, "scrollY", { value: 0, writable: true, configurable: true });
  });

  it("is not visible initially when scrollY is 0", () => {
    render(<BackToTop />);
    expect(screen.queryByRole("button", { name: /повернутись нагору/i })).not.toBeInTheDocument();
  });

  it("becomes visible when scrollY > 400", () => {
    render(<BackToTop />);
    act(() => {
      setScrollY(500);
    });
    expect(screen.getByRole("button", { name: /повернутись нагору/i })).toBeInTheDocument();
  });

  it("hides again when scrollY drops to 0", () => {
    render(<BackToTop />);
    act(() => {
      setScrollY(500);
    });
    expect(screen.getByRole("button", { name: /повернутись нагору/i })).toBeInTheDocument();
    act(() => {
      setScrollY(0);
    });
    expect(screen.queryByRole("button", { name: /повернутись нагору/i })).not.toBeInTheDocument();
  });

  it("calls window.scrollTo when clicked", () => {
    const scrollToMock = jest.fn();
    window.scrollTo = scrollToMock;

    render(<BackToTop />);
    act(() => {
      setScrollY(500);
    });

    fireEvent.click(screen.getByRole("button", { name: /повернутись нагору/i }));
    expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });

  it("has aria-label for accessibility", () => {
    render(<BackToTop />);
    act(() => {
      setScrollY(500);
    });
    const btn = screen.getByRole("button", { name: /повернутись нагору/i });
    expect(btn).toHaveAttribute("aria-label", "Повернутись нагору");
  });

  it("removes scroll listener on unmount", () => {
    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");
    const { unmount } = render(<BackToTop />);
    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith("scroll", expect.any(Function));
    removeEventListenerSpy.mockRestore();
  });
});
