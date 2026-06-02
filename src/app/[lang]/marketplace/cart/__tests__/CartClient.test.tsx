import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CartClient from "../CartClient";


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
const mockUseCart = {
  items: [] as Array<{ id: string; slug: string; title: string; emoji: string; package: string; price: number }>,
  removeItem: jest.fn(),
  updatePackage: jest.fn(),
  subtotal: 0,
  isHydrated: true,
};

jest.mock("@/hooks/useCart", () => ({
  useCart: () => mockUseCart,
}));

// Mock getNiche
jest.mock("@/lib/data/niches", () => ({
  getNiche: (slug: string) => {
    if (slug === "restaurant") return { priceFrom: 10000 };
    return null;
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
  mockUseCart.items = [];
  mockUseCart.subtotal = 0;
  mockUseCart.isHydrated = true;
});

describe("CartClient", () => {
  it("shows loading skeleton when not hydrated", () => {
    mockUseCart.isHydrated = false;
    const { container } = render(<CartClient />);
    // CartClient renders Skeleton placeholders during hydration
    const skeletons = container.querySelectorAll('[class*="animate-pulse"], [class*="skeleton"]');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("shows empty cart message when no items", () => {
    render(<CartClient />);
    expect(screen.getByText(/ваш кошик порожній/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /перейти до каталогу/i })).toHaveAttribute(
      "href",
      "/uk/marketplace/catalog"
    );
  });

  it("renders cart items with title, emoji, package and price", () => {
    mockUseCart.items = [
      { id: "1", slug: "restaurant", title: "Ресторан", emoji: "🍽", package: "Базовий", price: 10000 },
    ];
    mockUseCart.subtotal = 10000;
    render(<CartClient />);
    expect(screen.getByText("Ресторан")).toBeInTheDocument();
    expect(screen.getByText("🍽")).toBeInTheDocument();
    expect(screen.getByText(/Пакет: Базовий/)).toBeInTheDocument();
  });

  it("calls removeItem when trash button is clicked", () => {
    mockUseCart.items = [
      { id: "42", slug: "restaurant", title: "Ресторан", emoji: "🍽", package: "Базовий", price: 10000 },
    ];
    mockUseCart.subtotal = 10000;
    render(<CartClient />);
    // Find the delete button by its svg icon container
    const buttons = screen.getAllByRole("button");
    const trashBtn = buttons.find((b) => b.querySelector("svg"));
    expect(trashBtn).toBeDefined();
    fireEvent.click(trashBtn!);
    expect(mockUseCart.removeItem).toHaveBeenCalledWith("42");
  });

  it("applies promo code CODENEST10 and shows success message", () => {
    mockUseCart.items = [
      { id: "1", slug: "restaurant", title: "Ресторан", emoji: "🍽", package: "Базовий", price: 10000 },
    ];
    mockUseCart.subtotal = 10000;
    render(<CartClient />);
    fireEvent.change(screen.getByPlaceholderText(/введіть промокод/i), {
      target: { value: "codeworth10" },
    });
    fireEvent.click(screen.getByRole("button", { name: /застосувати/i }));
    expect(screen.getByText(/промокод застосовано — знижка 10%/i)).toBeInTheDocument();
  });

  it("does not apply invalid promo code", () => {
    mockUseCart.items = [
      { id: "1", slug: "restaurant", title: "Ресторан", emoji: "🍽", package: "Базовий", price: 10000 },
    ];
    mockUseCart.subtotal = 10000;
    render(<CartClient />);
    fireEvent.change(screen.getByPlaceholderText(/введіть промокод/i), {
      target: { value: "INVALID" },
    });
    fireEvent.click(screen.getByRole("button", { name: /застосувати/i }));
    expect(screen.queryByText(/промокод застосовано/i)).not.toBeInTheDocument();
  });

  it("shows discount line when promo is applied", () => {
    mockUseCart.items = [
      { id: "1", slug: "restaurant", title: "Ресторан", emoji: "🍽", package: "Базовий", price: 10000 },
    ];
    mockUseCart.subtotal = 10000;
    render(<CartClient />);
    fireEvent.change(screen.getByPlaceholderText(/введіть промокод/i), {
      target: { value: "codeworth10" },
    });
    fireEvent.click(screen.getByRole("button", { name: /застосувати/i }));
    // Both the success message and the discount line contain "знижка 10%"
    expect(screen.getAllByText(/знижка 10%/i).length).toBeGreaterThanOrEqual(1);
  });

  it("calls updatePackage with correct price when package is changed", () => {
    mockUseCart.items = [
      { id: "1", slug: "restaurant", title: "Ресторан", emoji: "🍽", package: "Базовий", price: 10000 },
    ];
    mockUseCart.subtotal = 10000;
    render(<CartClient />);
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "Розширений" } });
    // priceFrom=10000, multiplier for Розширений=1.7 → 17000
    expect(mockUseCart.updatePackage).toHaveBeenCalledWith("1", "Розширений", 17000);
  });

  it("does not call updatePackage if niche not found", () => {
    mockUseCart.items = [
      { id: "1", slug: "unknown-slug", title: "Невідомо", emoji: "❓", package: "Базовий", price: 5000 },
    ];
    mockUseCart.subtotal = 5000;
    render(<CartClient />);
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "Преміум" } });
    expect(mockUseCart.updatePackage).not.toHaveBeenCalled();
  });

  it("shows subtotal and total in mobile totals section", () => {
    mockUseCart.items = [
      { id: "1", slug: "restaurant", title: "Ресторан", emoji: "🍽", package: "Базовий", price: 10000 },
    ];
    mockUseCart.subtotal = 10000;
    render(<CartClient />);
    expect(screen.getByText("Підсумок")).toBeInTheDocument();
    expect(screen.getByText("Разом")).toBeInTheDocument();
  });

  it("renders promo hint text", () => {
    mockUseCart.items = [
      { id: "1", slug: "restaurant", title: "Ресторан", emoji: "🍽", package: "Базовий", price: 10000 },
    ];
    render(<CartClient />);
    expect(screen.getByText(/CODENEST10/)).toBeInTheDocument();
  });
});
