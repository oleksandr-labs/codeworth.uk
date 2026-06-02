/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, act } from "@testing-library/react";
import { ThemeProvider, useTheme } from "../ThemeProvider";

function ThemeConsumer() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <span data-testid="resolved">{resolvedTheme}</span>
      <button onClick={() => setTheme("dark")}>Set Dark</button>
      <button onClick={() => setTheme("light")}>Set Light</button>
      <button onClick={() => setTheme("system")}>Set System</button>
    </div>
  );
}

// Mock matchMedia
function mockMatchMedia(prefersDark: boolean) {
  const listeners: EventListener[] = [];
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockReturnValue({
      matches: prefersDark,
      addEventListener: jest.fn((event: string, cb: EventListener) => {
        listeners.push(cb);
      }),
      removeEventListener: jest.fn(),
    }),
  });
  return { listeners };
}

describe("ThemeProvider", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
    mockMatchMedia(false);
  });

  it("renders children", () => {
    render(
      <ThemeProvider>
        <span>Child content</span>
      </ThemeProvider>
    );
    expect(screen.getByText("Child content")).toBeInTheDocument();
  });

  it("initializes with system theme by default", () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );
    expect(screen.getByTestId("theme").textContent).toBe("system");
  });

  it("reads stored theme from localStorage on mount", () => {
    localStorage.setItem("Codeworth-theme", "dark");
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );
    act(() => {});
    expect(screen.getByTestId("theme").textContent).toBe("dark");
  });

  it("applies dark class to documentElement when theme is dark", () => {
    localStorage.setItem("Codeworth-theme", "dark");
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );
    act(() => {});
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("removes dark class from documentElement when theme is light", () => {
    document.documentElement.classList.add("dark");
    localStorage.setItem("Codeworth-theme", "light");
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );
    act(() => {});
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("setTheme persists to localStorage", () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );
    act(() => {
      screen.getByText("Set Dark").click();
    });
    expect(localStorage.getItem("Codeworth-theme")).toBe("dark");
  });

  it("setTheme('dark') updates resolvedTheme to dark", () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );
    act(() => {
      screen.getByText("Set Dark").click();
    });
    expect(screen.getByTestId("resolved").textContent).toBe("dark");
  });

  it("setTheme('light') updates resolvedTheme to light", () => {
    localStorage.setItem("Codeworth-theme", "dark");
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );
    act(() => {
      screen.getByText("Set Light").click();
    });
    expect(screen.getByTestId("resolved").textContent).toBe("light");
  });

  it("setTheme('dark') adds dark class to documentElement", () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );
    act(() => {
      screen.getByText("Set Dark").click();
    });
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("setTheme('light') removes dark class from documentElement", () => {
    document.documentElement.classList.add("dark");
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );
    act(() => {
      screen.getByText("Set Light").click();
    });
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("useTheme returns default context values outside provider", () => {
    function Outside() {
      const { theme, resolvedTheme } = useTheme();
      return <span data-testid="outside">{theme}/{resolvedTheme}</span>;
    }
    render(<Outside />);
    expect(screen.getByTestId("outside").textContent).toBe("system/light");
  });

  it("system theme resolves to light when prefers-color-scheme is light", () => {
    mockMatchMedia(false);
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );
    act(() => {});
    expect(screen.getByTestId("resolved").textContent).toBe("light");
  });

  it("system theme resolves to dark when prefers-color-scheme is dark", () => {
    mockMatchMedia(true);
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );
    act(() => {});
    expect(screen.getByTestId("resolved").textContent).toBe("dark");
  });
});
