/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MiniCart } from "../MiniCart";

jest.mock("next/link", () => {
  const MockLink = ({ children, href, onClick }: { children: React.ReactNode; href: string; onClick?: () => void }) => (
    <a href={href} onClick={onClick}>{children}</a>
  );
  MockLink.displayName = "MockLink";
  return MockLink;
});

let mockLocale = "uk";
jest.mock("@/components/layout/LocaleProvider", () => ({
  useLocale: () => mockLocale,
}));

const mockRemoveItem = jest.fn();

// Default mock: hydrated, empty cart
const mockUseCart = {
  items: [] as { id: string; title: string; emoji: string; package: string; price: number }[],
  count: 0,
  subtotal: 0,
  removeItem: mockRemoveItem,
  isHydrated: true,
};

jest.mock("@/hooks/useCart", () => ({
  useCart: () => mockUseCart,
}));

beforeEach(() => {
  mockLocale = "uk";
  jest.clearAllMocks();
  mockUseCart.items = [];
  mockUseCart.count = 0;
  mockUseCart.subtotal = 0;
  mockUseCart.isHydrated = true;
});

describe("MiniCart", () => {
  it("відображає кнопку кошика", () => {
    render(<MiniCart />);
    expect(screen.getByRole("button", { name: /кошик/i })).toBeInTheDocument();
  });

  it("не показує дроп-даун за замовчуванням", () => {
    render(<MiniCart />);
    expect(screen.queryByText("Кошик порожній")).not.toBeInTheDocument();
  });

  it("клік відкриває дроп-даун", () => {
    render(<MiniCart />);
    fireEvent.click(screen.getByRole("button", { name: /кошик/i }));
    expect(screen.getByText("Кошик порожній")).toBeInTheDocument();
  });

  it("порожній кошик показує посилання на каталог", () => {
    render(<MiniCart />);
    fireEvent.click(screen.getByRole("button", { name: /кошик/i }));
    expect(screen.getByRole("link", { name: /каталог/i })).toHaveAttribute("href", "/uk/marketplace/catalog");
  });

  it("показує badge з кількістю товарів", () => {
    mockUseCart.count = 3;
    render(<MiniCart />);
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("badge показує '9+' якщо більше 9 товарів", () => {
    mockUseCart.count = 12;
    render(<MiniCart />);
    expect(screen.getByText("9+")).toBeInTheDocument();
  });

  it("відображає товари у відкритому кошику", () => {
    mockUseCart.items = [
      { id: "p1", title: "Ресторан / Кафе", emoji: "🍽", package: "Базовий", price: 8000 },
    ];
    mockUseCart.count = 1;
    mockUseCart.subtotal = 8000;
    render(<MiniCart />);
    fireEvent.click(screen.getByRole("button", { name: /кошик/i }));
    expect(screen.getByText("Ресторан / Кафе")).toBeInTheDocument();
    expect(screen.getByText("Базовий")).toBeInTheDocument();
  });

  it("кнопка 'Видалити' викликає removeItem", () => {
    mockUseCart.items = [
      { id: "p1", title: "Ресторан / Кафе", emoji: "🍽", package: "Базовий", price: 8000 },
    ];
    mockUseCart.count = 1;
    render(<MiniCart />);
    fireEvent.click(screen.getByRole("button", { name: /кошик/i }));
    fireEvent.click(screen.getByRole("button", { name: /видалити Ресторан/i }));
    expect(mockRemoveItem).toHaveBeenCalledWith("p1");
  });

  it("кнопка закрити ховає дроп-даун", () => {
    render(<MiniCart />);
    fireEvent.click(screen.getByRole("button", { name: /кошик/i }));
    fireEvent.click(screen.getByRole("button", { name: /закрити кошик/i }));
    expect(screen.queryByText("Кошик порожній")).not.toBeInTheDocument();
  });

  it("показує посилання 'Оформити замовлення' коли є товари", () => {
    mockUseCart.items = [
      { id: "p1", title: "Тест", emoji: "🍽", package: "Базовий", price: 5000 },
    ];
    mockUseCart.count = 1;
    render(<MiniCart />);
    fireEvent.click(screen.getByRole("button", { name: /кошик/i }));
    expect(screen.getByRole("link", { name: /оформити замовлення/i })).toHaveAttribute("href", "/uk/marketplace/checkout");
  });

  it("без гідрації рендерить лише іконку без badge", () => {
    mockUseCart.isHydrated = false;
    mockUseCart.count = 5;
    render(<MiniCart />);
    expect(screen.queryByRole("button", { name: /кошик/i })).not.toBeInTheDocument();
    expect(screen.queryByText("5")).not.toBeInTheDocument();
  });

  it("PACKAGE_DISPLAY показує 'Базовий' в UK локалі", () => {
    mockUseCart.items = [
      { id: "p1", title: "Ресторан", emoji: "🍽", package: "Базовий", price: 8000 },
    ];
    mockUseCart.count = 1;
    render(<MiniCart />);
    fireEvent.click(screen.getByRole("button", { name: /кошик/i }));
    expect(screen.getByText("Базовий")).toBeInTheDocument();
  });
});

describe("MiniCart (EN locale)", () => {
  beforeEach(() => {
    mockLocale = "en";
    mockUseCart.items = [];
    mockUseCart.count = 0;
    mockUseCart.subtotal = 0;
    mockUseCart.isHydrated = true;
  });

  it("renders English cart button", () => {
    render(<MiniCart />);
    expect(screen.getByRole("button", { name: /cart/i })).toBeInTheDocument();
  });

  it("PACKAGE_DISPLAY shows 'Basic' for Базовий in EN locale", () => {
    mockUseCart.items = [
      { id: "p1", title: "Restaurant", emoji: "🍽", package: "Базовий", price: 8000 },
    ];
    mockUseCart.count = 1;
    render(<MiniCart />);
    fireEvent.click(screen.getByRole("button", { name: /cart/i }));
    expect(screen.getByText("Basic")).toBeInTheDocument();
    expect(screen.queryByText("Базовий")).not.toBeInTheDocument();
  });

  it("PACKAGE_DISPLAY shows 'Extended' for Розширений in EN locale", () => {
    mockUseCart.items = [
      { id: "p1", title: "Salon", emoji: "💇", package: "Розширений", price: 13600 },
    ];
    mockUseCart.count = 1;
    render(<MiniCart />);
    fireEvent.click(screen.getByRole("button", { name: /cart/i }));
    expect(screen.getByText("Extended")).toBeInTheDocument();
  });

  it("PACKAGE_DISPLAY shows 'Premium' for Преміум in EN locale", () => {
    mockUseCart.items = [
      { id: "p1", title: "Shop", emoji: "🛍", package: "Преміум", price: 20000 },
    ];
    mockUseCart.count = 1;
    render(<MiniCart />);
    fireEvent.click(screen.getByRole("button", { name: /cart/i }));
    expect(screen.getByText("Premium")).toBeInTheDocument();
  });
});
