/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MenuFilter } from "../MenuFilter";
import type { NicheMenuItem } from "@/lib/data/niches";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...rest}>{children}</a>
  ),
}));

const ITEMS: NicheMenuItem[] = [
  {
    id: "1",
    name: "Борщ",
    description: "Класичний",
    category: "Супи",
    price: "120 грн",
    gradient: "from-red-400 to-orange-500",
    icon: "🍲",
    tags: ["Веганське"],
    weight: "350 г",
    calories: "200 ккал",
  },
  {
    id: "2",
    name: "Стейк",
    description: "Яловичий стейк",
    category: "Страви",
    price: "450 грн",
    gradient: "from-amber-400 to-yellow-500",
    icon: "🥩",
    tags: ["Гостре"],
  },
  {
    id: "3",
    name: "Тофу",
    description: "Смажений тофу",
    category: "Страви",
    price: "200 грн",
    gradient: "from-green-400 to-emerald-500",
    icon: "🌿",
    tags: ["Веганське", "Без глютену"],
  },
  {
    id: "4",
    name: "Круасан",
    description: "Свіжий круасан",
    category: "Випічка",
    price: "60 грн",
    gradient: "from-yellow-300 to-amber-400",
    icon: "🥐",
    tags: ["Вегетаріанське"],
  },
];

// ── MenuFilter tests ───────────────────────────────────────────────────

describe("MenuFilter (uk)", () => {
  it("renders all items when no filter is active", () => {
    render(<MenuFilter items={ITEMS} lang="uk" color="#6366f1" />);
    expect(screen.getByText("Борщ")).toBeInTheDocument();
    expect(screen.getByText("Стейк")).toBeInTheDocument();
    expect(screen.getByText("Тофу")).toBeInTheDocument();
    expect(screen.getByText("Круасан")).toBeInTheDocument();
  });

  it("renders unique category chips derived from items", () => {
    render(<MenuFilter items={ITEMS} lang="uk" color="#6366f1" />);
    // "Всі" appears in both category and diet rows — verify at least 2 exist
    expect(screen.getAllByRole("button", { name: "Всі" }).length).toBeGreaterThanOrEqual(2);
    expect(screen.getByRole("button", { name: "Супи" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Страви" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Випічка" })).toBeInTheDocument();
  });

  it("filters items by category — clicking Супи shows only soup", () => {
    render(<MenuFilter items={ITEMS} lang="uk" color="#6366f1" />);
    fireEvent.click(screen.getByRole("button", { name: "Супи" }));
    expect(screen.getByText("Борщ")).toBeInTheDocument();
    expect(screen.queryByText("Стейк")).not.toBeInTheDocument();
    expect(screen.queryByText("Тофу")).not.toBeInTheDocument();
    expect(screen.queryByText("Круасан")).not.toBeInTheDocument();
  });

  it("filters items by diet tag — clicking Веганське shows only vegan dishes", () => {
    render(<MenuFilter items={ITEMS} lang="uk" color="#6366f1" />);
    fireEvent.click(screen.getByRole("button", { name: "Веганське" }));
    expect(screen.getByText("Борщ")).toBeInTheDocument();
    expect(screen.getByText("Тофу")).toBeInTheDocument();
    expect(screen.queryByText("Стейк")).not.toBeInTheDocument();
    expect(screen.queryByText("Круасан")).not.toBeInTheDocument();
  });

  it("shows empty state with reset button when no items match combined filters", () => {
    render(<MenuFilter items={ITEMS} lang="uk" color="#6366f1" />);
    // Супи category + Вегетаріанське tag → no match
    fireEvent.click(screen.getByRole("button", { name: "Супи" }));
    fireEvent.click(screen.getByRole("button", { name: "Вегетаріанське" }));
    expect(screen.getByText("Нічого не знайдено")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Скинути фільтри" })).toBeInTheDocument();
  });

  it("reset button restores all items", () => {
    render(<MenuFilter items={ITEMS} lang="uk" color="#6366f1" />);
    fireEvent.click(screen.getByRole("button", { name: "Випічка" }));
    fireEvent.click(screen.getByRole("button", { name: "Веганське" }));
    // should be empty now — Круасан is Вегетаріанське, not Веганське
    expect(screen.getByText("Нічого не знайдено")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Скинути фільтри" }));
    // all items should be visible again
    expect(screen.getByText("Борщ")).toBeInTheDocument();
    expect(screen.getByText("Стейк")).toBeInTheDocument();
  });

  it("shows correct result count in Ukrainian", () => {
    render(<MenuFilter items={ITEMS} lang="uk" color="#6366f1" />);
    expect(screen.getByText(`Знайдено страв: ${ITEMS.length}`)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Супи" }));
    expect(screen.getByText("Знайдено страв: 1")).toBeInTheDocument();
  });

  it("renders weight and calories when provided", () => {
    render(<MenuFilter items={ITEMS} lang="uk" color="#6366f1" />);
    expect(screen.getByText(/350 г/)).toBeInTheDocument();
    expect(screen.getByText(/200 ккал/)).toBeInTheDocument();
  });
});

describe("MenuFilter (en)", () => {
  it("renders diet tags in English", () => {
    render(<MenuFilter items={ITEMS} lang="en" color="#6366f1" />);
    // "All" appears in both category and diet rows
    expect(screen.getAllByRole("button", { name: "All" }).length).toBeGreaterThanOrEqual(2);
    expect(screen.getByRole("button", { name: "Vegan" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Vegetarian" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Gluten-Free" })).toBeInTheDocument();
  });

  it("EN Vegan filter matches Ukrainian tag Веганське in data", () => {
    render(<MenuFilter items={ITEMS} lang="en" color="#6366f1" />);
    fireEvent.click(screen.getByRole("button", { name: "Vegan" }));
    expect(screen.getByText("Борщ")).toBeInTheDocument();
    expect(screen.getByText("Тофу")).toBeInTheDocument();
    expect(screen.queryByText("Стейк")).not.toBeInTheDocument();
  });

  it("shows English result count text", () => {
    render(<MenuFilter items={ITEMS} lang="en" color="#6366f1" />);
    expect(screen.getByText(/Found: 4 dishes/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Spicy" }));
    expect(screen.getByText(/Found: 1 dish$/)).toBeInTheDocument();
  });
});
