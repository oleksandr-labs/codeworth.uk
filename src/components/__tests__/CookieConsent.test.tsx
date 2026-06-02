import React from "react";
import { render, screen, act, fireEvent, waitFor } from "@testing-library/react";
import CookieConsent from "../ui/CookieConsent";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();
Object.defineProperty(window, "localStorage", { value: localStorageMock, writable: true });

// Mock next/link
jest.mock("next/link", () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

jest.mock("next/navigation", () => ({
  useParams: () => ({ lang: "uk" }),
}));

beforeEach(() => {
  localStorageMock.clear();
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

describe("CookieConsent", () => {
  it("does not render immediately (has delay)", () => {
    render(<CookieConsent />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders after 800ms delay when no consent saved", async () => {
    render(<CookieConsent />);
    act(() => {
      jest.advanceTimersByTime(800);
    });
    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
  });

  it("does not appear when consent already saved in localStorage", () => {
    localStorageMock.setItem("Codeworth_cookie_consent", JSON.stringify({ necessary: true, analytics: false, marketing: false, savedAt: Date.now() }));
    render(<CookieConsent />);
    act(() => {
      jest.advanceTimersByTime(800);
    });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("shows 'Прийняти всі' button", async () => {
    render(<CookieConsent />);
    act(() => { jest.advanceTimersByTime(800); });
    await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());
    expect(screen.getByRole("button", { name: "Прийняти всі" })).toBeInTheDocument();
  });

  it("shows 'Відхилити' button", async () => {
    render(<CookieConsent />);
    act(() => { jest.advanceTimersByTime(800); });
    await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());
    expect(screen.getByRole("button", { name: "Відхилити" })).toBeInTheDocument();
  });

  it("saves 'accept all' to localStorage and hides dialog", async () => {
    render(<CookieConsent />);
    act(() => { jest.advanceTimersByTime(800); });
    await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());

    fireEvent.click(screen.getByRole("button", { name: "Прийняти всі" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    const saved = JSON.parse(localStorageMock.getItem("Codeworth_cookie_consent") ?? "null");
    expect(saved.analytics).toBe(true);
    expect(saved.marketing).toBe(true);
    expect(saved.necessary).toBe(true);
  });

  it("saves 'reject all' to localStorage and hides dialog", async () => {
    render(<CookieConsent />);
    act(() => { jest.advanceTimersByTime(800); });
    await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());

    fireEvent.click(screen.getByRole("button", { name: "Відхилити" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    const saved = JSON.parse(localStorageMock.getItem("Codeworth_cookie_consent") ?? "null");
    expect(saved.analytics).toBe(false);
    expect(saved.marketing).toBe(false);
    expect(saved.necessary).toBe(true);
  });

  it("closes on X button click", async () => {
    render(<CookieConsent />);
    act(() => { jest.advanceTimersByTime(800); });
    await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());

    fireEvent.click(screen.getByRole("button", { name: /відхилити всі та закрити/i }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("expands settings when 'Налаштувати' is clicked", async () => {
    render(<CookieConsent />);
    act(() => { jest.advanceTimersByTime(800); });
    await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());

    fireEvent.click(screen.getByRole("button", { name: /налаштувати/i }));

    expect(screen.getByText("Аналітика")).toBeInTheDocument();
    expect(screen.getByText("Маркетинг")).toBeInTheDocument();
  });

  it("shows 'Зберегти' button in expanded mode", async () => {
    render(<CookieConsent />);
    act(() => { jest.advanceTimersByTime(800); });
    await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());

    fireEvent.click(screen.getByRole("button", { name: /налаштувати/i }));
    expect(screen.getByRole("button", { name: "Зберегти" })).toBeInTheDocument();
  });

  it("saves custom preferences when 'Зберегти' is clicked", async () => {
    render(<CookieConsent />);
    act(() => { jest.advanceTimersByTime(800); });
    await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());

    fireEvent.click(screen.getByRole("button", { name: /налаштувати/i }));
    fireEvent.click(screen.getByLabelText("Аналітика"));
    fireEvent.click(screen.getByRole("button", { name: "Зберегти" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    const saved = JSON.parse(localStorageMock.getItem("Codeworth_cookie_consent") ?? "null");
    expect(saved.analytics).toBe(true);
    expect(saved.marketing).toBe(false);
  });
});
