import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "../contact/ContactForm";

jest.mock("@/components/layout/LocaleProvider", () => ({
  useLocale: () => "uk",
}));

// Mock fetch globally
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useSearchParams: () => ({
    get: () => null,
  }),
}));

beforeEach(() => {
  mockFetch.mockReset();
});

describe("ContactForm", () => {
  it("renders name and contact inputs", () => {
    render(<ContactForm />);
    expect(screen.getByPlaceholderText("Іван Петренко")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/hello@company/i)).toBeInTheDocument();
  });

  it("renders service and budget selects", () => {
    render(<ContactForm />);
    expect(screen.getByText("Оберіть послугу")).toBeInTheDocument();
    expect(screen.getByText("Оберіть діапазон")).toBeInTheDocument();
  });

  it("renders privacy checkbox and submit button", () => {
    render(<ContactForm />);
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Відправити заявку/i })).toBeInTheDocument();
  });

  it("shows success state after successful submission", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByPlaceholderText("Іван Петренко"), "Іван");
    await user.type(
      screen.getByPlaceholderText(/hello@company/i),
      "ivan@example.com"
    );
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: /Відправити заявку/i }));

    await waitFor(() => {
      expect(screen.getByText(/Заявку отримано/i)).toBeInTheDocument();
    });
  });

  it("shows error message on server error", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Щось пішло не так" }),
    });

    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByPlaceholderText("Іван Петренко"), "Іван");
    await user.type(
      screen.getByPlaceholderText(/hello@company/i),
      "ivan@example.com"
    );
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: /Відправити заявку/i }));

    await waitFor(() => {
      expect(screen.getByText("Щось пішло не так")).toBeInTheDocument();
    });
  });

  it("shows network error when fetch throws", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByPlaceholderText("Іван Петренко"), "Іван");
    await user.type(
      screen.getByPlaceholderText(/hello@company/i),
      "ivan@example.com"
    );
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: /Відправити заявку/i }));

    await waitFor(() => {
      expect(screen.getByText(/Мережева помилка/i)).toBeInTheDocument();
    });
  });

  it("disables submit button while loading", async () => {
    mockFetch.mockImplementationOnce(() => new Promise(() => {}));

    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByPlaceholderText("Іван Петренко"), "Іван");
    await user.type(
      screen.getByPlaceholderText(/hello@company/i),
      "ivan@example.com"
    );
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: /Відправити заявку/i }));

    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("shows 'send another' button after success and returns to form", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByPlaceholderText("Іван Петренко"), "Іван");
    await user.type(
      screen.getByPlaceholderText(/hello@company/i),
      "ivan@example.com"
    );
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: /Відправити заявку/i }));

    await waitFor(() =>
      expect(screen.getByText(/Відправити ще одну заявку/i)).toBeInTheDocument()
    );

    await user.click(screen.getByText(/Відправити ще одну заявку/i));
    expect(screen.getByRole("button", { name: /Відправити заявку/i })).toBeInTheDocument();
  });
});
