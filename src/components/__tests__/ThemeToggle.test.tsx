import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeToggle } from "../ui/ThemeToggle";
import { ThemeProvider } from "../ui/ThemeProvider";

jest.mock("next/navigation", () => ({
  useParams: () => ({ lang: "uk" }),
}));

// Mock matchMedia (not available in jsdom)
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Wrap with ThemeProvider
function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe("ThemeToggle", () => {
  it("renders a toggle button", () => {
    renderWithTheme(<ThemeToggle />);
    expect(screen.getByRole("button", { name: /перемкнути тему/i })).toBeInTheDocument();
  });

  it("does not show dropdown initially", () => {
    renderWithTheme(<ThemeToggle />);
    expect(screen.queryByText("Світла")).not.toBeInTheDocument();
    expect(screen.queryByText("Темна")).not.toBeInTheDocument();
  });

  it("opens dropdown on click", () => {
    renderWithTheme(<ThemeToggle />);
    fireEvent.click(screen.getByRole("button", { name: /перемкнути тему/i }));
    expect(screen.getByText("Світла")).toBeInTheDocument();
    expect(screen.getByText("Темна")).toBeInTheDocument();
    expect(screen.getByText("Системна")).toBeInTheDocument();
  });

  it("shows all 3 theme options", () => {
    renderWithTheme(<ThemeToggle />);
    fireEvent.click(screen.getByRole("button", { name: /перемкнути тему/i }));

    const buttons = screen.getAllByRole("button");
    const labels = buttons.map((b) => b.textContent?.trim());
    expect(labels).toContain("Світла");
    expect(labels).toContain("Темна");
    expect(labels).toContain("Системна");
  });

  it("closes dropdown after selecting a theme", () => {
    renderWithTheme(<ThemeToggle />);
    fireEvent.click(screen.getByRole("button", { name: /перемкнути тему/i }));
    expect(screen.getByText("Світла")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Світла"));
    expect(screen.queryByText("Темна")).not.toBeInTheDocument();
  });

  it("sets light theme when 'Світла' is selected", () => {
    renderWithTheme(<ThemeToggle />);
    fireEvent.click(screen.getByRole("button", { name: /перемкнути тему/i }));
    fireEvent.click(screen.getByText("Світла"));

    expect(document.documentElement).not.toHaveClass("dark");
  });

  it("sets dark theme when 'Темна' is selected", () => {
    renderWithTheme(<ThemeToggle />);
    fireEvent.click(screen.getByRole("button", { name: /перемкнути тему/i }));
    fireEvent.click(screen.getByText("Темна"));

    expect(document.documentElement).toHaveClass("dark");
  });

  it("saves theme to localStorage", () => {
    renderWithTheme(<ThemeToggle />);
    fireEvent.click(screen.getByRole("button", { name: /перемкнути тему/i }));
    fireEvent.click(screen.getByText("Темна"));

    expect(localStorage.getItem("Codeworth-theme")).toBe("dark");
  });

  it("accepts custom className", () => {
    const { container } = renderWithTheme(<ThemeToggle className="test-class" />);
    expect(container.firstChild).toHaveClass("test-class");
  });
});
