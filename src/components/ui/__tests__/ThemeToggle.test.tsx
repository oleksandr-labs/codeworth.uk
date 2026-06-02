/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

const mockSetTheme = jest.fn();

jest.mock("next/navigation", () => ({
  useParams: () => ({ lang: "uk" }),
}));

jest.mock("../ThemeProvider", () => ({
  useTheme: () => ({ theme: "system", setTheme: mockSetTheme }),
}));

jest.mock("lucide-react", () => ({
  Sun: () => <svg data-testid="icon-sun" />,
  Moon: () => <svg data-testid="icon-moon" />,
  Monitor: () => <svg data-testid="icon-monitor" />,
}));

import { ThemeToggle } from "../ThemeToggle";

beforeEach(() => {
  mockSetTheme.mockClear();
});

describe("ThemeToggle", () => {
  it("renders toggle button with Ukrainian aria-label", () => {
    render(<ThemeToggle />);
    expect(screen.getByRole("button", { name: "Перемкнути тему" })).toBeInTheDocument();
  });

  it("opens dropdown with theme options on click", () => {
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole("button", { name: "Перемкнути тему" }));
    expect(screen.getByRole("button", { name: "Світла" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Темна" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Системна" })).toBeInTheDocument();
  });

  it("calls setTheme('light') when Світла is clicked", () => {
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole("button", { name: "Перемкнути тему" }));
    fireEvent.click(screen.getByRole("button", { name: "Світла" }));
    expect(mockSetTheme).toHaveBeenCalledWith("light");
  });

  it("closes dropdown after selecting a theme", () => {
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole("button", { name: "Перемкнути тему" }));
    fireEvent.click(screen.getByRole("button", { name: "Темна" }));
    expect(screen.queryByRole("button", { name: "Темна" })).not.toBeInTheDocument();
  });
});
