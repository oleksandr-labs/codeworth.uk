/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import CookieConsent from "../CookieConsent";

jest.mock("next/navigation", () => ({
  useParams: () => ({ lang: "uk" }),
}));

jest.mock("next/link", () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
  MockLink.displayName = "MockLink";
  return MockLink;
});

const COOKIE_KEY = "Codeworth_cookie_consent";

beforeEach(() => {
  localStorage.clear();
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

describe("CookieConsent", () => {
  it("не показується одразу (є затримка 800мс)", () => {
    render(<CookieConsent />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("показується після 800мс якщо немає збережених налаштувань", async () => {
    render(<CookieConsent />);
    act(() => { jest.advanceTimersByTime(800); });
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("не показується якщо є збережені налаштування в localStorage", () => {
    localStorage.setItem(COOKIE_KEY, JSON.stringify({ necessary: true, analytics: true, marketing: false, savedAt: Date.now() }));
    render(<CookieConsent />);
    act(() => { jest.advanceTimersByTime(1000); });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("кнопка 'Прийняти всі' зберігає всі дозволи і ховає банер", () => {
    render(<CookieConsent />);
    act(() => { jest.advanceTimersByTime(800); });
    fireEvent.click(screen.getByRole("button", { name: /прийняти всі/i }));
    const saved = JSON.parse(localStorage.getItem(COOKIE_KEY)!);
    expect(saved.analytics).toBe(true);
    expect(saved.marketing).toBe(true);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("кнопка 'Відхилити' зберігає лише необхідні cookies", () => {
    render(<CookieConsent />);
    act(() => { jest.advanceTimersByTime(800); });
    // In collapsed state there are two "відхилити"-matching buttons; pick the one without aria-label (the visible button)
    const buttons = screen.getAllByRole("button", { name: /відхилити/i });
    const rejectBtn = buttons.find((b) => !b.getAttribute("aria-label"))!;
    fireEvent.click(rejectBtn);
    const saved = JSON.parse(localStorage.getItem(COOKIE_KEY)!);
    expect(saved.analytics).toBe(false);
    expect(saved.marketing).toBe(false);
  });

  it("кнопка закриття відхиляє всі і ховає банер", () => {
    render(<CookieConsent />);
    act(() => { jest.advanceTimersByTime(800); });
    fireEvent.click(screen.getByRole("button", { name: /відхилити всі та закрити/i }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("'Налаштувати' розгортає деталі", () => {
    render(<CookieConsent />);
    act(() => { jest.advanceTimersByTime(800); });
    fireEvent.click(screen.getByRole("button", { name: /налаштувати/i }));
    expect(screen.getByText("Необхідні")).toBeInTheDocument();
    expect(screen.getByText("Аналітика")).toBeInTheDocument();
    expect(screen.getByText("Маркетинг")).toBeInTheDocument();
  });

  it("посилання 'Детальніше' веде на /privacy", () => {
    render(<CookieConsent />);
    act(() => { jest.advanceTimersByTime(800); });
    const link = screen.getByRole("link", { name: /детальніше/i });
    expect(link).toHaveAttribute("href", "/uk/privacy");
  });

  it("у розгорнутому стані є кнопка 'Зберегти' для кастомних налаштувань", () => {
    render(<CookieConsent />);
    act(() => { jest.advanceTimersByTime(800); });
    fireEvent.click(screen.getByRole("button", { name: /налаштувати/i }));
    expect(screen.getByRole("button", { name: /зберегти/i })).toBeInTheDocument();
  });
});
