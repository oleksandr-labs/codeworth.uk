import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import GlobalError from "../[lang]/error";

jest.mock("next/link", () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
  MockLink.displayName = "MockLink";
  return MockLink;
});

jest.mock("@/components/layout/LocaleProvider", () => ({
  useLocale: () => "uk",
}));

jest.mock("@/components/layout/Header", () => ({
  Header: () => <header data-testid="header" />,
}));
jest.mock("@/components/layout/Footer", () => ({
  Footer: () => <footer data-testid="footer" />,
}));
jest.mock("@/components/layout/Container", () => ({
  Container: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

const mockReset = jest.fn();
const baseError = new Error("Test error");

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("GlobalError (error.tsx)", () => {
  it("відображає заголовок помилки", () => {
    render(<GlobalError error={baseError} reset={mockReset} />);
    expect(screen.getByRole("heading", { name: /щось пішло не так/i })).toBeInTheDocument();
  });

  it("відображає кнопку 'Спробувати знову'", () => {
    render(<GlobalError error={baseError} reset={mockReset} />);
    expect(screen.getByRole("button", { name: /спробувати знову/i })).toBeInTheDocument();
  });

  it("клік 'Спробувати знову' викликає reset", () => {
    render(<GlobalError error={baseError} reset={mockReset} />);
    fireEvent.click(screen.getByRole("button", { name: /спробувати знову/i }));
    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it("відображає посилання 'На головну'", () => {
    render(<GlobalError error={baseError} reset={mockReset} />);
    expect(screen.getByRole("link", { name: /на головну/i })).toHaveAttribute("href", "/uk");
  });

  it("показує error.digest якщо є", () => {
    const errorWithDigest = Object.assign(new Error("err"), { digest: "abc123" });
    render(<GlobalError error={errorWithDigest} reset={mockReset} />);
    expect(screen.getByText(/abc123/i)).toBeInTheDocument();
  });

  it("не показує digest-блок якщо digest відсутній", () => {
    render(<GlobalError error={baseError} reset={mockReset} />);
    expect(screen.queryByText(/Error ID:/i)).not.toBeInTheDocument();
  });

  it("логує помилку в console.error", () => {
    render(<GlobalError error={baseError} reset={mockReset} />);
    expect(console.error).toHaveBeenCalledWith(baseError);
  });
});
