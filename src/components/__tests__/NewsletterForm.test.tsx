import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NewsletterForm } from "../ui/NewsletterForm";

jest.mock("@/components/layout/LocaleProvider", () => ({
  useLocale: () => "uk",
}));

// Mock fetch globally
const mockFetch = jest.fn();
global.fetch = mockFetch;

beforeEach(() => {
  mockFetch.mockReset();
});

describe("NewsletterForm — inline variant", () => {
  it("renders email input and submit button", () => {
    render(<NewsletterForm />);
    expect(screen.getByPlaceholderText("your@email.com")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /підписатися/i })).toBeInTheDocument();
  });

  it("shows success state after successful submission", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    const user = userEvent.setup();
    render(<NewsletterForm />);

    await user.type(screen.getByPlaceholderText("your@email.com"), "test@example.com");
    await user.click(screen.getByRole("button", { name: /підписатися/i }));

    await waitFor(() => {
      expect(screen.getByText(/Дякуємо/i)).toBeInTheDocument();
    });
  });

  it("shows error message on server error response", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Щось пішло не так" }),
    });

    const user = userEvent.setup();
    render(<NewsletterForm />);

    await user.type(screen.getByPlaceholderText("your@email.com"), "valid@example.com");
    await user.click(screen.getByRole("button", { name: /підписатися/i }));

    await waitFor(() => {
      expect(screen.getByText("Щось пішло не так")).toBeInTheDocument();
    });
  });

  it("shows network error when fetch throws", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    const user = userEvent.setup();
    render(<NewsletterForm />);

    await user.type(screen.getByPlaceholderText("your@email.com"), "test@example.com");
    await user.click(screen.getByRole("button", { name: /підписатися/i }));

    await waitFor(() => {
      expect(screen.getByText(/Помилка мережі/i)).toBeInTheDocument();
    });
  });
});

describe("NewsletterForm — compact variant", () => {
  it("renders compact form with button", () => {
    render(<NewsletterForm variant="compact" />);
    expect(screen.getByPlaceholderText("your@email.com")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /підписатися/i })).toBeInTheDocument();
  });

  it("disables button during loading", async () => {
    // Never resolves
    mockFetch.mockImplementationOnce(() => new Promise(() => {}));

    const user = userEvent.setup();
    render(<NewsletterForm variant="compact" />);

    await user.type(screen.getByPlaceholderText("your@email.com"), "test@example.com");
    await user.click(screen.getByRole("button", { name: /підписатися/i }));

    expect(screen.getByRole("button")).toBeDisabled();
  });
});
