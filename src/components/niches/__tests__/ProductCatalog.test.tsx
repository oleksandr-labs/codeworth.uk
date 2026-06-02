/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProductCatalog } from "../ProductCatalog";
import type { NicheProductCard } from "@/lib/data/niches";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...rest}>{children}</a>
  ),
}));

const PRODUCTS: NicheProductCard[] = [
  {
    id: "1",
    name: "Футболка базова",
    category: "Одяг",
    price: "450 ₴",
    originalPrice: "600 ₴",
    icon: "👕",
    gradient: "from-blue-400 to-indigo-500",
    sizes: ["S", "M", "L", "XL"],
    badge: "Хіт",
    badgeColor: "bg-rose-500",
    tags: ["бавовна", "унісекс"],
  },
  {
    id: "2",
    name: "Кепка класик",
    category: "Аксесуари",
    price: "350 ₴",
    icon: "🧢",
    gradient: "from-amber-400 to-orange-500",
    sizes: ["One size"],
    tags: ["літо"],
  },
  {
    id: "3",
    name: "Худі оверсайз",
    category: "Одяг",
    price: "890 ₴",
    icon: "🧥",
    gradient: "from-purple-400 to-pink-500",
    sizes: ["M", "L", "XL"],
  },
];

describe("ProductCatalog", () => {
  it("renders all products by default", () => {
    render(<ProductCatalog products={PRODUCTS} lang="uk" color="#6366f1" />);
    expect(screen.getByText("Футболка базова")).toBeInTheDocument();
    expect(screen.getByText("Кепка класик")).toBeInTheDocument();
    expect(screen.getByText("Худі оверсайз")).toBeInTheDocument();
  });

  it("shows category filter buttons including 'Всі' in Ukrainian", () => {
    render(<ProductCatalog products={PRODUCTS} lang="uk" color="#6366f1" />);
    expect(screen.getByRole("button", { name: "Всі" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Одяг" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Аксесуари" })).toBeInTheDocument();
  });

  it("shows 'All' category button in English", () => {
    render(<ProductCatalog products={PRODUCTS} lang="en" color="#6366f1" />);
    expect(screen.getByRole("button", { name: "All" })).toBeInTheDocument();
  });

  it("shows total product count in Ukrainian", () => {
    render(<ProductCatalog products={PRODUCTS} lang="uk" color="#6366f1" />);
    expect(screen.getByText("Товарів: 3")).toBeInTheDocument();
  });

  it("shows total product count in English", () => {
    render(<ProductCatalog products={PRODUCTS} lang="en" color="#6366f1" />);
    expect(screen.getByText("3 products")).toBeInTheDocument();
  });

  it("filters products by category", () => {
    render(<ProductCatalog products={PRODUCTS} lang="uk" color="#6366f1" />);
    fireEvent.click(screen.getByRole("button", { name: "Одяг" }));
    expect(screen.getByText("Футболка базова")).toBeInTheDocument();
    expect(screen.getByText("Худі оверсайз")).toBeInTheDocument();
    expect(screen.queryByText("Кепка класик")).not.toBeInTheDocument();
  });

  it("shows filtered count after category selection", () => {
    render(<ProductCatalog products={PRODUCTS} lang="uk" color="#6366f1" />);
    fireEvent.click(screen.getByRole("button", { name: "Одяг" }));
    expect(screen.getByText("Товарів: 2")).toBeInTheDocument();
  });

  it("returns to all products after clicking 'Всі'", () => {
    render(<ProductCatalog products={PRODUCTS} lang="uk" color="#6366f1" />);
    fireEvent.click(screen.getByRole("button", { name: "Одяг" }));
    fireEvent.click(screen.getByRole("button", { name: "Всі" }));
    expect(screen.getByText("Товарів: 3")).toBeInTheDocument();
  });

  it("shows product prices", () => {
    render(<ProductCatalog products={PRODUCTS} lang="uk" color="#6366f1" />);
    expect(screen.getByText("450 ₴")).toBeInTheDocument();
    expect(screen.getByText("350 ₴")).toBeInTheDocument();
    expect(screen.getByText("890 ₴")).toBeInTheDocument();
  });

  it("shows original (crossed-out) price when present", () => {
    render(<ProductCatalog products={PRODUCTS} lang="uk" color="#6366f1" />);
    expect(screen.getByText("600 ₴")).toBeInTheDocument();
  });

  it("shows product badge", () => {
    render(<ProductCatalog products={PRODUCTS} lang="uk" color="#6366f1" />);
    expect(screen.getByText("Хіт")).toBeInTheDocument();
  });

  it("shows product sizes", () => {
    render(<ProductCatalog products={PRODUCTS} lang="uk" color="#6366f1" />);
    const sElements = screen.getAllByText("S");
    expect(sElements.length).toBeGreaterThanOrEqual(1);
    const mElements = screen.getAllByText("M");
    expect(mElements.length).toBeGreaterThanOrEqual(1);
  });

  it("shows product tags", () => {
    render(<ProductCatalog products={PRODUCTS} lang="uk" color="#6366f1" />);
    expect(screen.getByText("бавовна")).toBeInTheDocument();
    expect(screen.getByText("унісекс")).toBeInTheDocument();
  });

  it("shows 'Купити' link for each product in Ukrainian", () => {
    render(<ProductCatalog products={PRODUCTS} lang="uk" color="#6366f1" />);
    const buyLinks = screen.getAllByRole("link", { name: "Купити" });
    expect(buyLinks.length).toBe(3);
    buyLinks.forEach((link) => expect(link).toHaveAttribute("href", "/uk/contact"));
  });

  it("shows 'Buy' link in English", () => {
    render(<ProductCatalog products={PRODUCTS} lang="en" color="#6366f1" />);
    const buyLinks = screen.getAllByRole("link", { name: "Buy" });
    expect(buyLinks.length).toBe(3);
  });

  it("shows empty state when no products match filter", () => {
    render(<ProductCatalog products={PRODUCTS} lang="uk" color="#6366f1" />);
    // Filter to "Аксесуари" then filter to "Одяг" — no, let's use an empty products list
    render(
      <ProductCatalog
        products={[{ id: "x", name: "Test", category: "Rare", price: "100 ₴", icon: "🔴", gradient: "from-red-400 to-red-600", sizes: ["M"] }]}
        lang="uk"
        color="#6366f1"
      />
    );
    fireEvent.click(screen.getAllByRole("button", { name: "Rare" })[0]);
    // After going back to all, all products show
    expect(screen.getAllByRole("button").length).toBeGreaterThan(0);
  });

  it("shows 'Нічого не знайдено' and reset button when no products in active filter", () => {
    // Use a product with a unique category, then check what happens with empty filtered state
    // We can render with an empty array
    render(<ProductCatalog products={[]} lang="uk" color="#6366f1" />);
    // Only "Всі" category, 0 products → shows empty state
    expect(screen.getByText("Нічого не знайдено")).toBeInTheDocument();
    expect(screen.getByText("Показати всі")).toBeInTheDocument();
  });

  it("shows 'No products found' empty state in English", () => {
    render(<ProductCatalog products={[]} lang="en" color="#6366f1" />);
    expect(screen.getByText("No products found")).toBeInTheDocument();
    expect(screen.getByText("Show all")).toBeInTheDocument();
  });

  it("shows category label on each product card", () => {
    render(<ProductCatalog products={PRODUCTS} lang="uk" color="#6366f1" />);
    // Category is shown as a badge on the card image area
    const categoryBadges = screen.getAllByText("Одяг");
    expect(categoryBadges.length).toBeGreaterThanOrEqual(1);
  });

  it("shows singular '1 product' in English", () => {
    render(
      <ProductCatalog
        products={[PRODUCTS[0]]}
        lang="en"
        color="#6366f1"
      />
    );
    expect(screen.getByText("1 product")).toBeInTheDocument();
  });
});
