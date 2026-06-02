import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CTAForm } from "../CTAForm";

jest.mock("@/components/layout/LocaleProvider", () => ({
  useLocale: () => "uk",
}));

const mockFetch = jest.fn();
global.fetch = mockFetch;

beforeEach(() => {
  jest.clearAllMocks();
  mockFetch.mockResolvedValue({ ok: true });
});

describe("CTAForm", () => {
  it("відображає поля ім'я та контакт", () => {
    render(<CTAForm />);
    expect(screen.getByPlaceholderText(/ваше ім.я/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/телефон або email/i)).toBeInTheDocument();
  });

  it("відображає кнопку відправки", () => {
    render(<CTAForm />);
    expect(screen.getByRole("button", { name: /безкоштовну консультацію/i })).toBeInTheDocument();
  });

  it("має honeypot-поле (приховане від користувача)", () => {
    render(<CTAForm />);
    const honeypot = document.querySelector('input[name="website"]');
    expect(honeypot).toBeInTheDocument();
    expect(honeypot).toHaveClass("hidden");
  });

  it("показує стан loading під час відправки", async () => {
    mockFetch.mockReturnValue(new Promise(() => {})); // never resolves
    render(<CTAForm />);
    fireEvent.submit(screen.getByRole("button", { name: /безкоштовну консультацію/i }).closest("form")!);
    await waitFor(() => {
      expect(screen.getByText(/відправляємо/i)).toBeInTheDocument();
    });
  });

  it("показує success-стан після успішної відправки", async () => {
    render(<CTAForm />);
    const form = screen.getByRole("button").closest("form")!;
    fireEvent.change(screen.getByPlaceholderText(/ваше ім.я/i), { target: { value: "Олег" } });
    fireEvent.change(screen.getByPlaceholderText(/телефон або email/i), { target: { value: "oleg@example.com" } });
    fireEvent.submit(form);
    await waitFor(() => {
      expect(screen.getByText(/заявку отримано/i)).toBeInTheDocument();
    });
  });

  it("показує error-стан при помилці мережі", async () => {
    mockFetch.mockRejectedValue(new Error("network error"));
    render(<CTAForm />);
    fireEvent.submit(screen.getByRole("button").closest("form")!);
    await waitFor(() => {
      expect(screen.getByText(/помилка/i)).toBeInTheDocument();
    });
  });

  it("показує error-стан при не-ok відповіді сервера", async () => {
    mockFetch.mockResolvedValue({ ok: false });
    render(<CTAForm />);
    fireEvent.submit(screen.getByRole("button").closest("form")!);
    await waitFor(() => {
      expect(screen.getByText(/помилка/i)).toBeInTheDocument();
    });
  });

  it("відправляє запит на /api/contact", async () => {
    render(<CTAForm />);
    fireEvent.submit(screen.getByRole("button").closest("form")!);
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        "/api/contact",
        expect.objectContaining({ method: "POST" })
      );
    });
  });

  it("посилання на Політику конфіденційності присутнє", () => {
    render(<CTAForm />);
    expect(screen.getByRole("link", { name: /політикою конфіденційності/i })).toHaveAttribute("href", "/uk/privacy");
  });
});
