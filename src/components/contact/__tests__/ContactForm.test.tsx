import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ContactForm } from "../ContactForm";

jest.mock("@/components/layout/LocaleProvider", () => ({
  useLocale: () => "uk",
}));

const mockGet = jest.fn().mockReturnValue(null);
jest.mock("next/navigation", () => ({
  useSearchParams: () => ({ get: mockGet }),
}));

global.fetch = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  mockGet.mockReturnValue(null);
  (global.fetch as jest.Mock).mockResolvedValue({
    ok: true,
    json: async () => ({ ok: true }),
  });
});

describe("ContactForm — UK locale", () => {
  it("renders all form fields", () => {
    render(<ContactForm />);
    expect(screen.getByPlaceholderText(/Іван Петренко/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/hello@company/)).toBeInTheDocument();
    expect(screen.getByText(/Тип послуги/)).toBeInTheDocument();
    expect(screen.getByText(/Бюджет проєкту/)).toBeInTheDocument();
    expect(screen.getByText(/Опис проєкту/)).toBeInTheDocument();
    expect(screen.getByText(/Відправити заявку/)).toBeInTheDocument();
  });

  it("renders UK service options", () => {
    render(<ContactForm />);
    expect(screen.getByText("Розробка сайту")).toBeInTheDocument();
    expect(screen.getByText("Інтернет-магазин")).toBeInTheDocument();
    expect(screen.getByText("SEO-просування")).toBeInTheDocument();
  });

  it("renders UK budget options", () => {
    render(<ContactForm />);
    expect(screen.getByText("До 10 000 грн")).toBeInTheDocument();
    expect(screen.getByText("Поки не визначився")).toBeInTheDocument();
  });

  it("renders privacy policy checkbox link", () => {
    render(<ContactForm />);
    expect(screen.getByText(/Політикою конфіденційності/)).toBeInTheDocument();
  });

  it("submit button is disabled while loading", async () => {
    (global.fetch as jest.Mock).mockImplementation(
      () => new Promise(() => {}) // never resolves
    );
    render(<ContactForm />);
    const nameInput = screen.getByPlaceholderText(/Іван Петренко/);
    const contactInput = screen.getByPlaceholderText(/hello@company/);
    const privacy = screen.getByRole("checkbox");

    fireEvent.change(nameInput, { target: { value: "Тест" } });
    fireEvent.change(contactInput, { target: { value: "test@test.ua" } });
    fireEvent.click(privacy);

    const btn = screen.getByRole("button", { name: /Відправити заявку/ });
    fireEvent.click(btn);

    await waitFor(() => {
      expect(screen.getByText(/Відправляємо/)).toBeInTheDocument();
    });
    expect(btn).toBeDisabled();
  });

  it("shows success state after successful submission", async () => {
    render(<ContactForm />);
    fireEvent.change(screen.getByPlaceholderText(/Іван Петренко/), { target: { value: "Тест Тестенко" } });
    fireEvent.change(screen.getByPlaceholderText(/hello@company/), { target: { value: "test@test.ua" } });
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: /Відправити заявку/ }));

    await waitFor(() => {
      expect(screen.getByText(/Заявку отримано/)).toBeInTheDocument();
    });
    expect(screen.getByText(/Зв'яжемося протягом 2 годин/)).toBeInTheDocument();
  });

  it("shows error message on API failure", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: async () => ({ error: "Помилка сервера" }),
    });
    render(<ContactForm />);
    fireEvent.change(screen.getByPlaceholderText(/Іван Петренко/), { target: { value: "Тест" } });
    fireEvent.change(screen.getByPlaceholderText(/hello@company/), { target: { value: "test@test.ua" } });
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: /Відправити заявку/ }));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
      expect(screen.getByText("Помилка сервера")).toBeInTheDocument();
    });
  });

  it("shows network error message on fetch rejection", async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error("Network failed"));
    render(<ContactForm />);
    fireEvent.change(screen.getByPlaceholderText(/Іван Петренко/), { target: { value: "Тест" } });
    fireEvent.change(screen.getByPlaceholderText(/hello@company/), { target: { value: "test@test.ua" } });
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: /Відправити заявку/ }));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
      expect(screen.getByText(/Мережева помилка/)).toBeInTheDocument();
    });
  });

  it("can reset form after success via 'Send another request' button", async () => {
    render(<ContactForm />);
    fireEvent.change(screen.getByPlaceholderText(/Іван Петренко/), { target: { value: "Тест" } });
    fireEvent.change(screen.getByPlaceholderText(/hello@company/), { target: { value: "t@t.ua" } });
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: /Відправити заявку/ }));

    await waitFor(() => {
      expect(screen.getByText(/Заявку отримано/)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/Відправити ще одну заявку/));
    expect(screen.getByPlaceholderText(/Іван Петренко/)).toBeInTheDocument();
  });

  it("sends correct payload to /api/contact", async () => {
    render(<ContactForm />);
    fireEvent.change(screen.getByPlaceholderText(/Іван Петренко/), { target: { value: "Анна Ковальчук" } });
    fireEvent.change(screen.getByPlaceholderText(/hello@company/), { target: { value: "anna@ua.com" } });
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: /Відправити заявку/ }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/contact",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
        })
      );
    });
    const body = JSON.parse((global.fetch as jest.Mock).mock.calls[0][1].body);
    expect(body.name).toBe("Анна Ковальчук");
    expect(body.contact).toBe("anna@ua.com");
  });
});

describe("ContactForm — extra search param", () => {
  it("pre-fills service and message when extra param is present", () => {
    mockGet.mockImplementation((key: string) => {
      if (key === "extra") return "Telegram+Bot";
      if (key === "subject") return "Telegram+Bot";
      return null;
    });
    render(<ContactForm />);
    expect(screen.getByText("Доробка / Модуль")).toBeInTheDocument();
    const textarea = screen.getByPlaceholderText(/Розкажіть про ваш бізнес/);
    expect((textarea as HTMLTextAreaElement).value).toContain("Хочу замовити");
  });
});

