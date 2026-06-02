import { renderHook, act } from "@testing-library/react";
import { useCart, CartItem } from "../useCart";

const ITEM_A: CartItem = {
  id: "restaurant-basic",
  slug: "restaurant",
  title: "Ресторан / Кафе",
  emoji: "🍽",
  package: "Базовий",
  price: 9900,
};

const ITEM_B: CartItem = {
  id: "beauty-basic",
  slug: "beauty-salon",
  title: "Салон краси",
  emoji: "💇",
  package: "Базовий",
  price: 7900,
};

describe("useCart", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("initializes with empty cart", () => {
    const { result } = renderHook(() => useCart());
    expect(result.current.items).toEqual([]);
    expect(result.current.count).toBe(0);
    expect(result.current.subtotal).toBe(0);
  });

  it("addItem adds an item to the cart", () => {
    const { result } = renderHook(() => useCart());
    act(() => {
      result.current.addItem(ITEM_A);
    });
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]).toEqual(ITEM_A);
    expect(result.current.count).toBe(1);
  });

  it("addItem does not add duplicate items", () => {
    const { result } = renderHook(() => useCart());
    act(() => {
      result.current.addItem(ITEM_A);
      result.current.addItem(ITEM_A);
    });
    expect(result.current.items).toHaveLength(1);
  });

  it("removeItem removes item by id", () => {
    const { result } = renderHook(() => useCart());
    act(() => {
      result.current.addItem(ITEM_A);
      result.current.addItem(ITEM_B);
    });
    act(() => {
      result.current.removeItem(ITEM_A.id);
    });
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].id).toBe(ITEM_B.id);
  });

  it("subtotal sums prices correctly", () => {
    const { result } = renderHook(() => useCart());
    act(() => {
      result.current.addItem(ITEM_A);
      result.current.addItem(ITEM_B);
    });
    expect(result.current.subtotal).toBe(ITEM_A.price + ITEM_B.price);
  });

  it("clearCart empties the cart", () => {
    const { result } = renderHook(() => useCart());
    act(() => {
      result.current.addItem(ITEM_A);
      result.current.addItem(ITEM_B);
    });
    act(() => {
      result.current.clearCart();
    });
    expect(result.current.items).toHaveLength(0);
    expect(result.current.subtotal).toBe(0);
  });

  it("hasItem returns true for existing items", () => {
    const { result } = renderHook(() => useCart());
    act(() => {
      result.current.addItem(ITEM_A);
    });
    expect(result.current.hasItem(ITEM_A.id)).toBe(true);
    expect(result.current.hasItem(ITEM_B.id)).toBe(false);
  });

  it("updatePackage updates package and price", () => {
    const { result } = renderHook(() => useCart());
    act(() => {
      result.current.addItem(ITEM_A);
    });
    act(() => {
      result.current.updatePackage(ITEM_A.id, "Преміум", 19900);
    });
    const updated = result.current.items.find((i) => i.id === ITEM_A.id);
    expect(updated?.package).toBe("Преміум");
    expect(updated?.price).toBe(19900);
  });

  it("persists cart to localStorage on addItem", () => {
    const { result } = renderHook(() => useCart());
    act(() => {
      result.current.addItem(ITEM_A);
    });
    const stored = JSON.parse(localStorage.getItem("Codeworth-cart") ?? "[]");
    expect(stored).toHaveLength(1);
    expect(stored[0].id).toBe(ITEM_A.id);
  });

  it("persists cart to localStorage on removeItem", () => {
    const { result } = renderHook(() => useCart());
    act(() => {
      result.current.addItem(ITEM_A);
      result.current.addItem(ITEM_B);
    });
    act(() => {
      result.current.removeItem(ITEM_A.id);
    });
    const stored = JSON.parse(localStorage.getItem("Codeworth-cart") ?? "[]");
    expect(stored).toHaveLength(1);
    expect(stored[0].id).toBe(ITEM_B.id);
  });

  it("clearCart removes from localStorage", () => {
    const { result } = renderHook(() => useCart());
    act(() => {
      result.current.addItem(ITEM_A);
    });
    act(() => {
      result.current.clearCart();
    });
    const stored = JSON.parse(localStorage.getItem("Codeworth-cart") ?? "[]");
    expect(stored).toHaveLength(0);
  });
});
