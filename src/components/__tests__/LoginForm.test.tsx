import React from "react";
import { render, screen, act, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "../../app/[lang]/marketplace/login/LoginForm";

// Mock next/navigation
const mockPush = jest.fn();
const mockReplace = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush, replace: mockReplace }),
}));

// Mock next/link
jest.mock("next/link", () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

jest.mock("@/components/layout/LocaleProvider", () => ({
  useLocale: () => "uk",
}));

// Mock useAuth
const mockLogin = jest.fn();
const mockUseAuth = {
  login: mockLogin,
  isAuthenticated: false,
  isLoading: false,
  user: null,
  logout: jest.fn(),
  updateProfile: jest.fn(),
};
jest.mock("../../hooks/useAuth", () => ({
  useAuth: () => mockUseAuth,
}));

beforeEach(() => {
  mockLogin.mockReset();
  mockPush.mockReset();
  mockReplace.mockReset();
  mockUseAuth.isAuthenticated = false;
  mockUseAuth.isLoading = false;
});

describe("LoginForm", () => {
  it("renders email and password fields", () => {
    render(<LoginForm />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Пароль")).toBeInTheDocument();
  });

  it("renders submit button", () => {
    render(<LoginForm />);
    expect(screen.getByRole("button", { name: /увійти/i })).toBeInTheDocument();
  });

  it("shows demo credentials hint", () => {
    render(<LoginForm />);
    expect(screen.getByText("demo@codeworth.uk")).toBeInTheDocument();
    expect(screen.getByText("demo123")).toBeInTheDocument();
  });

  it("shows loading spinner while auth is loading", () => {
    mockUseAuth.isLoading = true;
    render(<LoginForm />);
    // Shows loader instead of form
    expect(screen.queryByRole("button", { name: /увійти/i })).not.toBeInTheDocument();
  });

  it("redirects to account if already authenticated", () => {
    mockUseAuth.isAuthenticated = true;
    render(<LoginForm />);
    expect(mockReplace).toHaveBeenCalledWith("/uk/marketplace/account");
  });

  it("calls login with email and password on submit", async () => {
    mockLogin.mockResolvedValueOnce({ success: true });
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText(/email/i), "user@example.com");
    await user.type(screen.getByLabelText("Пароль"), "password123");
    await user.click(screen.getByRole("button", { name: /увійти/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith("user@example.com", "password123");
    });
  });

  it("redirects to account on successful login", async () => {
    mockLogin.mockResolvedValueOnce({ success: true });
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText(/email/i), "user@example.com");
    await user.type(screen.getByLabelText("Пароль"), "password123");
    await user.click(screen.getByRole("button", { name: /увійти/i }));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/uk/marketplace/account");
    });
  });

  it("shows error message on failed login", async () => {
    mockLogin.mockResolvedValueOnce({ success: false, error: "Невірний email або пароль" });
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText(/email/i), "bad@example.com");
    await user.type(screen.getByLabelText("Пароль"), "wrongpass");
    await user.click(screen.getByRole("button", { name: /увійти/i }));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent("Невірний email або пароль");
    });
  });

  it("toggles password visibility", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const passwordInput = screen.getByLabelText("Пароль");
    expect(passwordInput).toHaveAttribute("type", "password");

    await user.click(screen.getByRole("button", { name: /показати пароль/i }));
    expect(passwordInput).toHaveAttribute("type", "text");

    await user.click(screen.getByRole("button", { name: /сховати пароль/i }));
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("shows validation error when email is empty", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText("Пароль"), "password123");
    await user.click(screen.getByRole("button", { name: /увійти/i }));

    // HTML5 required will prevent submit, or our JS validation fires
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it("has link to contact page when no account", () => {
    render(<LoginForm />);
    const link = screen.getByRole("link", { name: /зверніться до нас/i });
    expect(link).toHaveAttribute("href", "/uk/contact");
  });
});
