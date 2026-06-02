import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "../LoginForm";

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

const mockPush = jest.fn();
const mockReplace = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush, replace: mockReplace }),
}));

const mockLogin = jest.fn();
jest.mock("@/hooks/useAuth", () => ({
  useAuth: () => ({
    login: mockLogin,
    isAuthenticated: false,
    isLoading: false,
  }),
}));

beforeEach(() => {
  jest.clearAllMocks();
  mockLogin.mockResolvedValue({ success: true });
});

describe("LoginForm", () => {
  it("відображає поле email", () => {
    render(<LoginForm />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  it("відображає поле пароль", () => {
    render(<LoginForm />);
    expect(screen.getByLabelText("Пароль", { selector: "input" })).toBeInTheDocument();
  });

  it("відображає кнопку 'Увійти'", () => {
    render(<LoginForm />);
    expect(screen.getByRole("button", { name: /увійти/i })).toBeInTheDocument();
  });

  it("показує демо-дані", () => {
    render(<LoginForm />);
    expect(screen.getByText(/demo@codeworth.uk/i)).toBeInTheDocument();
    expect(screen.getByText(/demo123/i)).toBeInTheDocument();
  });

  it("показує помилку якщо email порожній", async () => {
    const { container } = render(<LoginForm />);
    fireEvent.submit(container.querySelector("form")!);
    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(/введіть email/i);
    });
  });

  it("показує помилку якщо пароль порожній", async () => {
    const { container } = render(<LoginForm />);
    fireEvent.change(screen.getByLabelText("Email", { selector: "input" }), { target: { value: "test@test.com" } });
    fireEvent.submit(container.querySelector("form")!);
    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(/введіть пароль/i);
    });
  });

  it("викликає login з email та паролем при сабміті", async () => {
    const { container } = render(<LoginForm />);
    fireEvent.change(screen.getByLabelText("Email", { selector: "input" }), { target: { value: "demo@codeworth.uk" } });
    fireEvent.change(screen.getByLabelText("Пароль", { selector: "input" }), { target: { value: "demo123" } });
    fireEvent.submit(container.querySelector("form")!);
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith("demo@codeworth.uk", "demo123");
    });
  });

  it("редіректить на /marketplace/account після успішного входу", async () => {
    const { container } = render(<LoginForm />);
    fireEvent.change(screen.getByLabelText("Email", { selector: "input" }), { target: { value: "demo@codeworth.uk" } });
    fireEvent.change(screen.getByLabelText("Пароль", { selector: "input" }), { target: { value: "demo123" } });
    fireEvent.submit(container.querySelector("form")!);
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/uk/marketplace/account");
    });
  });

  it("показує помилку при невдалому вході", async () => {
    mockLogin.mockResolvedValue({ success: false, error: "Невірний пароль" });
    const { container } = render(<LoginForm />);
    fireEvent.change(screen.getByLabelText("Email", { selector: "input" }), { target: { value: "wrong@test.com" } });
    fireEvent.change(screen.getByLabelText("Пароль", { selector: "input" }), { target: { value: "badpass" } });
    fireEvent.submit(container.querySelector("form")!);
    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(/невірний пароль/i);
    });
  });

  it("кнопка тоглу пароля перемикає тип поля", () => {
    render(<LoginForm />);
    const passwordInput = screen.getByLabelText("Пароль", { selector: "input" });
    expect(passwordInput).toHaveAttribute("type", "password");
    fireEvent.click(screen.getByRole("button", { name: /показати пароль/i }));
    expect(passwordInput).toHaveAttribute("type", "text");
    fireEvent.click(screen.getByRole("button", { name: /сховати пароль/i }));
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("посилання 'Зверніться до нас' веде на /contact", () => {
    render(<LoginForm />);
    expect(screen.getByRole("link", { name: /зверніться до нас/i })).toHaveAttribute("href", "/uk/contact");
  });
});
