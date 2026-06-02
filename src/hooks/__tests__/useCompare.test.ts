import { renderHook, act } from "@testing-library/react";
import { useCompare, CompareItem } from "../useCompare";

const ITEM_A: CompareItem = {
  slug: "restaurant",
  title: "Ресторан / Кафе",
  emoji: "🍽",
  priceFrom: 9900,
  complexity: "medium",
  features: ["Бронювання столиків", "Меню онлайн"],
  gradient: "from-orange-400 to-red-500",
};

const ITEM_B: CompareItem = {
  slug: "beauty-salon",
  title: "Салон краси",
  emoji: "💇",
  priceFrom: 7900,
  complexity: "simple",
  features: ["Онлайн-запис", "Галерея робіт"],
  gradient: "from-pink-400 to-rose-500",
};

const ITEM_C: CompareItem = {
  slug: "fitness-club",
  title: "Фітнес-клуб",
  emoji: "💪",
  priceFrom: 11900,
  complexity: "medium",
  features: ["Розклад занять", "Онлайн-оплата"],
  gradient: "from-green-400 to-teal-500",
};

const ITEM_D: CompareItem = {
  slug: "medical-clinic",
  title: "Медична клініка",
  emoji: "🏥",
  priceFrom: 14900,
  complexity: "complex",
  features: ["Запис до лікаря", "Особистий кабінет"],
  gradient: "from-blue-400 to-cyan-500",
};

describe("useCompare", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("initializes with empty items", () => {
    const { result } = renderHook(() => useCompare());
    expect(result.current.items).toEqual([]);
    expect(result.current.count).toBe(0);
    expect(result.current.isFull).toBe(false);
  });

  it("addItem adds an item", () => {
    const { result } = renderHook(() => useCompare());
    act(() => { result.current.addItem(ITEM_A); });
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].slug).toBe("restaurant");
    expect(result.current.count).toBe(1);
  });

  it("addItem does not add duplicate", () => {
    const { result } = renderHook(() => useCompare());
    act(() => { result.current.addItem(ITEM_A); });
    act(() => { result.current.addItem(ITEM_A); });
    expect(result.current.items).toHaveLength(1);
  });

  it("addItem respects MAX_COMPARE limit of 3", () => {
    const { result } = renderHook(() => useCompare());
    act(() => { result.current.addItem(ITEM_A); });
    act(() => { result.current.addItem(ITEM_B); });
    act(() => { result.current.addItem(ITEM_C); });
    act(() => { result.current.addItem(ITEM_D); });
    expect(result.current.items).toHaveLength(3);
    expect(result.current.isFull).toBe(true);
  });

  it("removeItem removes a specific item", () => {
    const { result } = renderHook(() => useCompare());
    act(() => { result.current.addItem(ITEM_A); });
    act(() => { result.current.addItem(ITEM_B); });
    act(() => { result.current.removeItem("restaurant"); });
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].slug).toBe("beauty-salon");
  });

  it("removeItem on non-existent slug is a no-op", () => {
    const { result } = renderHook(() => useCompare());
    act(() => { result.current.addItem(ITEM_A); });
    act(() => { result.current.removeItem("does-not-exist"); });
    expect(result.current.items).toHaveLength(1);
  });

  it("toggleItem adds when not present", () => {
    const { result } = renderHook(() => useCompare());
    act(() => { result.current.toggleItem(ITEM_A); });
    expect(result.current.items).toHaveLength(1);
    expect(result.current.isSelected("restaurant")).toBe(true);
  });

  it("toggleItem removes when already present", () => {
    const { result } = renderHook(() => useCompare());
    act(() => { result.current.addItem(ITEM_A); });
    act(() => { result.current.toggleItem(ITEM_A); });
    expect(result.current.items).toHaveLength(0);
    expect(result.current.isSelected("restaurant")).toBe(false);
  });

  it("toggleItem does not add when list is full", () => {
    const { result } = renderHook(() => useCompare());
    act(() => { result.current.addItem(ITEM_A); });
    act(() => { result.current.addItem(ITEM_B); });
    act(() => { result.current.addItem(ITEM_C); });
    act(() => { result.current.toggleItem(ITEM_D); });
    expect(result.current.items).toHaveLength(3);
    expect(result.current.isSelected("medical-clinic")).toBe(false);
  });

  it("clearAll empties the list", () => {
    const { result } = renderHook(() => useCompare());
    act(() => { result.current.addItem(ITEM_A); });
    act(() => { result.current.addItem(ITEM_B); });
    act(() => { result.current.clearAll(); });
    expect(result.current.items).toHaveLength(0);
    expect(result.current.count).toBe(0);
    expect(result.current.isFull).toBe(false);
  });

  it("isSelected returns true for added item", () => {
    const { result } = renderHook(() => useCompare());
    act(() => { result.current.addItem(ITEM_A); });
    expect(result.current.isSelected("restaurant")).toBe(true);
    expect(result.current.isSelected("beauty-salon")).toBe(false);
  });

  it("persists items to localStorage", () => {
    const { result } = renderHook(() => useCompare());
    act(() => { result.current.addItem(ITEM_A); });
    const stored = JSON.parse(localStorage.getItem("Codeworth-compare") ?? "[]");
    expect(stored).toHaveLength(1);
    expect(stored[0].slug).toBe("restaurant");
  });

  it("hydrates from localStorage on mount", () => {
    localStorage.setItem("Codeworth-compare", JSON.stringify([ITEM_A, ITEM_B]));
    const { result } = renderHook(() => useCompare());
    act(() => {});
    expect(result.current.items).toHaveLength(2);
  });

  it("clears localStorage on clearAll", () => {
    const { result } = renderHook(() => useCompare());
    act(() => { result.current.addItem(ITEM_A); });
    act(() => { result.current.clearAll(); });
    const stored = JSON.parse(localStorage.getItem("Codeworth-compare") ?? "[]");
    expect(stored).toHaveLength(0);
  });
});
