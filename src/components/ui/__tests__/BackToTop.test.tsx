/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { BackToTop } from "../BackToTop";

jest.mock("next/navigation", () => ({
  useParams: () => ({ lang: "uk" }),
}));

describe("BackToTop", () => {
  beforeEach(() => {
    Object.defineProperty(window, "scrollY", { writable: true, value: 0 });
    window.scrollTo = jest.fn();
  });

  it("не відображається при scrollY = 0", () => {
    render(<BackToTop />);
    expect(screen.queryByRole("button", { name: /повернутись нагору/i })).not.toBeInTheDocument();
  });

  it("відображається після прокрутки більше 400px", () => {
    render(<BackToTop />);
    act(() => {
      Object.defineProperty(window, "scrollY", { writable: true, value: 500 });
      window.dispatchEvent(new Event("scroll"));
    });
    expect(screen.getByRole("button", { name: /повернутись нагору/i })).toBeInTheDocument();
  });

  it("кнопка має правильний aria-label", () => {
    render(<BackToTop />);
    act(() => {
      Object.defineProperty(window, "scrollY", { writable: true, value: 500 });
      window.dispatchEvent(new Event("scroll"));
    });
    expect(screen.getByRole("button", { name: "Повернутись нагору" })).toBeInTheDocument();
  });

  it("клік по кнопці викликає window.scrollTo з top: 0", () => {
    render(<BackToTop />);
    act(() => {
      Object.defineProperty(window, "scrollY", { writable: true, value: 500 });
      window.dispatchEvent(new Event("scroll"));
    });
    fireEvent.click(screen.getByRole("button"));
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });

  it("зникає коли прокрутка < 400px", () => {
    render(<BackToTop />);
    act(() => {
      Object.defineProperty(window, "scrollY", { writable: true, value: 500 });
      window.dispatchEvent(new Event("scroll"));
    });
    expect(screen.getByRole("button")).toBeInTheDocument();
    act(() => {
      Object.defineProperty(window, "scrollY", { writable: true, value: 100 });
      window.dispatchEvent(new Event("scroll"));
    });
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
