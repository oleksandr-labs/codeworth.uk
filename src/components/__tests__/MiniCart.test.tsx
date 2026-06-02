import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MiniCart } from "../ui/MiniCart";

// Mock next/link
jest.mock("next/link", () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

let mockLocale = "uk";
jest.mock("@/components/layout/LocaleProvider", () => ({
  useLocale: () => mockLocale,
}));

const mockRemoveItem = jest.fn();
let mockCartState = {
  items: [] as { id: string; title: string; emoji: string; package: string; price: number }[],
  count: 0,
  subtotal: 0,
  removeItem: mockRemoveItem,
  isHydrated: true,
};

jest.mock("../../hooks/useCart", () => ({
  useCart: () => mockCartState,
}));

beforeEach(() => {
  mockLocale = "uk";
  mockRemoveItem.mockReset();
  mockCartState = {
    items: [],
    count: 0,
    subtotal: 0,
    removeItem: mockRemoveItem,
    isHydrated: true,
  };
});

describe("MiniCart", () => {
  it("renders cart button when hydrated", () => {
    render(<MiniCart />);
    expect(screen.getByRole("button", { name: /кошик/i })).toBeInTheDocument();
  });

  it("renders placeholder (no button) when not hydrated", () => {
    mockCartState.isHydrated = false;
    render(<MiniCart />);
    expect(screen.queryByRole("button", { name: /кошик/i })).not.toBeInTheDocument();
  });

  it("does not show count badge when cart is empty", () => {
    render(<MiniCart />);
    // Badge should not be present
    expect(screen.queryByText("0")).not.toBeInTheDocument();
  });

  it("shows count badge when items are in cart", () => {
    mockCartState.count = 2;
    mockCartState.items = [
      { id: "1", title: "Ресторан", emoji: "🍽", package: "Базовий", price: 9500 },
      { id: "2", title: "Салон краси", emoji: "💇", package: "Розширений", price: 13600 },
    ];
    render(<MiniCart />);
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("shows '9+' badge when count exceeds 9", () => {
    mockCartState.count = 15;
    render(<MiniCart />);
    expect(screen.getByText("9+")).toBeInTheDocument();
  });

  it("opens dropdown on button click", () => {
    render(<MiniCart />);
    expect(screen.queryByText("Кошик порожній")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /кошик/i }));
    expect(screen.getByText("Кошик порожній")).toBeInTheDocument();
  });

  it("shows empty state with catalog link when no items", () => {
    render(<MiniCart />);
    fireEvent.click(screen.getByRole("button", { name: /кошик/i }));

    expect(screen.getByText("Кошик порожній")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /перейти до каталогу/i })).toHaveAttribute(
      "href",
      "/uk/marketplace/catalog"
    );
  });

  it("shows items in dropdown when cart has products", () => {
    mockCartState.count = 1;
    mockCartState.items = [
      { id: "1", title: "Ресторан / Кафе", emoji: "🍽", package: "Розширений", price: 13600 },
    ];
    mockCartState.subtotal = 13600;

    render(<MiniCart />);
    fireEvent.click(screen.getByRole("button", { name: /кошик/i }));

    expect(screen.getByText("Ресторан / Кафе")).toBeInTheDocument();
    expect(screen.getByText("Розширений")).toBeInTheDocument();
  });

  it("shows checkout link when cart has items", () => {
    mockCartState.count = 1;
    mockCartState.items = [
      { id: "1", title: "Ресторан", emoji: "🍽", package: "Базовий", price: 9500 },
    ];
    mockCartState.subtotal = 9500;

    render(<MiniCart />);
    fireEvent.click(screen.getByRole("button", { name: /кошик/i }));

    expect(screen.getByRole("link", { name: /оформити замовлення/i })).toHaveAttribute(
      "href",
      "/uk/marketplace/checkout"
    );
  });

  it("calls removeItem when remove button is clicked", () => {
    mockCartState.count = 1;
    mockCartState.items = [
      { id: "item-1", title: "Ресторан", emoji: "🍽", package: "Базовий", price: 9500 },
    ];

    render(<MiniCart />);
    fireEvent.click(screen.getByRole("button", { name: /кошик/i }));
    fireEvent.click(screen.getByRole("button", { name: /видалити ресторан/i }));

    expect(mockRemoveItem).toHaveBeenCalledWith("item-1");
  });

  it("closes dropdown on close button click", () => {
    render(<MiniCart />);
    fireEvent.click(screen.getByRole("button", { name: /кошик/i }));
    expect(screen.getByText("Кошик порожній")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /закрити кошик/i }));
    expect(screen.queryByText("Кошик порожній")).not.toBeInTheDocument();
  });

  it("has accessible aria-label with item count", () => {
    mockCartState.count = 3;
    render(<MiniCart />);
    expect(screen.getByRole("button", { name: "Кошик — 3 товарів" })).toBeInTheDocument();
  });

  it("uses 'товар' for singular count", () => {
    mockCartState.count = 1;
    render(<MiniCart />);
    expect(screen.getByRole("button", { name: "Кошик — 1 товар" })).toBeInTheDocument();
  });
});

describe("MiniCart (EN locale)", () => {
  beforeEach(() => {
    mockLocale = "en";
  });

  it("renders cart button with English aria-label", () => {
    render(<MiniCart />);
    expect(screen.getByRole("button", { name: /cart/i })).toBeInTheDocument();
  });

  it("shows empty cart text in English", () => {
    render(<MiniCart />);
    fireEvent.click(screen.getByRole("button", { name: /cart/i }));
    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
  });

  it("displays package name in English via PACKAGE_DISPLAY map", () => {
    mockCartState.count = 1;
    mockCartState.items = [
      { id: "1", title: "Restaurant", emoji: "🍽", package: "Базовий", price: 8000 },
    ];
    mockCartState.subtotal = 8000;
    render(<MiniCart />);
    fireEvent.click(screen.getByRole("button", { name: /cart/i }));
    expect(screen.getByText("Basic")).toBeInTheDocument();
    expect(screen.queryByText("Базовий")).not.toBeInTheDocument();
  });

  it("displays Extended package in English", () => {
    mockCartState.count = 1;
    mockCartState.items = [
      { id: "1", title: "Salon", emoji: "💇", package: "Розширений", price: 13600 },
    ];
    render(<MiniCart />);
    fireEvent.click(screen.getByRole("button", { name: /cart/i }));
    expect(screen.getByText("Extended")).toBeInTheDocument();
  });

  it("displays Premium package in English", () => {
    mockCartState.count = 1;
    mockCartState.items = [
      { id: "1", title: "Shop", emoji: "🛍", package: "Преміум", price: 20000 },
    ];
    render(<MiniCart />);
    fireEvent.click(screen.getByRole("button", { name: /cart/i }));
    expect(screen.getByText("Premium")).toBeInTheDocument();
  });

  it("shows checkout link in English", () => {
    mockCartState.count = 1;
    mockCartState.items = [
      { id: "1", title: "Test", emoji: "🍽", package: "Базовий", price: 5000 },
    ];
    render(<MiniCart />);
    fireEvent.click(screen.getByRole("button", { name: /cart/i }));
    expect(screen.getByRole("link", { name: /checkout/i })).toBeInTheDocument();
  });
});
