import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CheckoutForm from "../CheckoutForm";

jest.mock("@/components/layout/LocaleProvider", () => ({
  useLocale: () => "uk",
}));

// Mock next/link
jest.mock("next/link", () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
  MockLink.displayName = "MockLink";
  return MockLink;
});

// Mock useCart
const mockClearCart = jest.fn();
const mockUseCart = {
  items: [{ id: "1", slug: "restaurant", title: "Ресторан", package: "Розширений", price: 13600 }],
  subtotal: 13600,
  clearCart: mockClearCart,
};

jest.mock("@/hooks/useCart", () => ({
  useCart: () => mockUseCart,
}));

// Mock fetch
global.fetch = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  (global.fetch as jest.Mock).mockResolvedValue({
    ok: true,
    json: async () => ({ orderId: "CN-ABC123" }),
  });
});

describe("CheckoutForm", () => {
  it("renders step 1 with personal data fields", () => {
    render(<CheckoutForm />);
    expect(screen.getByText("Особисті дані")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Олег")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Коваленко")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("oleg@company.ua")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("+380 67 000 00 00")).toBeInTheDocument();
  });

  it("shows 'Далі →' button on step 1", () => {
    render(<CheckoutForm />);
    expect(screen.getByRole("button", { name: "Далі →" })).toBeInTheDocument();
  });

  it("does not show back button on step 1", () => {
    render(<CheckoutForm />);
    expect(screen.queryByRole("button", { name: /назад/i })).not.toBeInTheDocument();
  });

  it("advances to step 2 on form submit", () => {
    render(<CheckoutForm />);
    fireEvent.submit(screen.getByRole("button", { name: "Далі →" }).closest("form")!);
    expect(screen.getByText("Деталі проєкту")).toBeInTheDocument();
  });

  it("shows back button on step 2", () => {
    render(<CheckoutForm />);
    fireEvent.submit(screen.getByRole("button", { name: "Далі →" }).closest("form")!);
    expect(screen.getByRole("button", { name: /назад/i })).toBeInTheDocument();
  });

  it("goes back to step 1 when back button is clicked on step 2", () => {
    render(<CheckoutForm />);
    fireEvent.submit(screen.getByRole("button", { name: "Далі →" }).closest("form")!);
    fireEvent.click(screen.getByRole("button", { name: /назад/i }));
    expect(screen.getByText("Особисті дані")).toBeInTheDocument();
  });

  it("advances to step 3 (payment) after step 2", () => {
    render(<CheckoutForm />);
    // Step 1 → 2
    fireEvent.submit(screen.getByRole("button", { name: "Далі →" }).closest("form")!);
    // Step 2 → 3
    fireEvent.submit(screen.getByRole("button", { name: "Далі →" }).closest("form")!);
    expect(screen.getByRole("heading", { name: "Оплата" })).toBeInTheDocument();
  });

  it("shows payment methods on step 3", () => {
    render(<CheckoutForm />);
    fireEvent.submit(screen.getByRole("button", { name: "Далі →" }).closest("form")!);
    fireEvent.submit(screen.getByRole("button", { name: "Далі →" }).closest("form")!);
    expect(screen.getByText("Банківська картка")).toBeInTheDocument();
    expect(screen.getByText("LiqPay")).toBeInTheDocument();
    expect(screen.getByText(/рахунок/i)).toBeInTheDocument();
  });

  it("submit button is disabled without agreement on step 3", () => {
    render(<CheckoutForm />);
    fireEvent.submit(screen.getByRole("button", { name: "Далі →" }).closest("form")!);
    fireEvent.submit(screen.getByRole("button", { name: "Далі →" }).closest("form")!);
    expect(screen.getByRole("button", { name: /оформити замовлення/i })).toBeDisabled();
  });

  it("enables submit after checking agreement checkbox", () => {
    render(<CheckoutForm />);
    fireEvent.submit(screen.getByRole("button", { name: "Далі →" }).closest("form")!);
    fireEvent.submit(screen.getByRole("button", { name: "Далі →" }).closest("form")!);
    fireEvent.click(screen.getByRole("checkbox"));
    expect(screen.getByRole("button", { name: /оформити замовлення/i })).not.toBeDisabled();
  });

  it("submits order and shows success screen", async () => {
    render(<CheckoutForm />);
    fireEvent.submit(screen.getByRole("button", { name: "Далі →" }).closest("form")!);
    fireEvent.submit(screen.getByRole("button", { name: "Далі →" }).closest("form")!);
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.submit(screen.getByRole("button", { name: /оформити замовлення/i }).closest("form")!);

    await waitFor(() =>
      expect(screen.getByText(/дякуємо за замовлення/i)).toBeInTheDocument()
    );
    expect(mockClearCart).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith(
      "/api/order",
      expect.objectContaining({ method: "POST" })
    );
  });

  it("shows order ID in success screen", async () => {
    render(<CheckoutForm />);
    fireEvent.submit(screen.getByRole("button", { name: "Далі →" }).closest("form")!);
    fireEvent.submit(screen.getByRole("button", { name: "Далі →" }).closest("form")!);
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.submit(screen.getByRole("button", { name: /оформити замовлення/i }).closest("form")!);

    await waitFor(() =>
      expect(screen.getByText(/#CN-ABC123/)).toBeInTheDocument()
    );
  });

  it("shows error message when API returns error", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: async () => ({ error: "Помилка сервера" }),
    });
    render(<CheckoutForm />);
    fireEvent.submit(screen.getByRole("button", { name: "Далі →" }).closest("form")!);
    fireEvent.submit(screen.getByRole("button", { name: "Далі →" }).closest("form")!);
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.submit(screen.getByRole("button", { name: /оформити замовлення/i }).closest("form")!);

    await waitFor(() =>
      expect(screen.getByText(/помилка сервера/i)).toBeInTheDocument()
    );
  });

  it("shows network error message on fetch failure", async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error("Network error"));
    render(<CheckoutForm />);
    fireEvent.submit(screen.getByRole("button", { name: "Далі →" }).closest("form")!);
    fireEvent.submit(screen.getByRole("button", { name: "Далі →" }).closest("form")!);
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.submit(screen.getByRole("button", { name: /оформити замовлення/i }).closest("form")!);

    await waitFor(() =>
      expect(screen.getByText(/мережева помилка/i)).toBeInTheDocument()
    );
  });

  it("step indicator shows 3 steps", () => {
    render(<CheckoutForm />);
    expect(screen.getByText("Дані")).toBeInTheDocument();
    expect(screen.getByText("Проєкт")).toBeInTheDocument();
    expect(screen.getByText("Оплата")).toBeInTheDocument();
  });
});
