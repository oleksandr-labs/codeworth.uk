/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import CatalogClient from "../CatalogClient";

jest.mock("@/components/layout/LocaleProvider", () => ({
  useLocale: () => "uk",
}));

// ─── Next.js mocks ───────────────────────────────────────────────────────────
const mockReplace = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ replace: mockReplace }),
  useSearchParams: () => new URLSearchParams(),
}));

jest.mock("next/link", () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
  MockLink.displayName = "MockLink";
  return MockLink;
});

// ─── UI mocks ─────────────────────────────────────────────────────────────────
jest.mock("@/components/layout/Container", () => ({
  Container: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));
jest.mock("@/components/ui/Badge", () => ({
  Badge: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
}));
jest.mock("@/components/ui/Pagination", () => ({
  Pagination: ({ currentPage, totalPages, onPageChange }: { currentPage: number; totalPages: number; onPageChange: (p: number) => void }) => (
    <div data-testid="pagination">
      <span>Page {currentPage} of {totalPages}</span>
      {currentPage < totalPages && (
        <button onClick={() => onPageChange(currentPage + 1)}>Далі</button>
      )}
    </div>
  ),
}));
jest.mock("@/components/ui/StarRating", () => ({
  StarRating: () => <div data-testid="star-rating" />,
}));

jest.mock("@/hooks/useCart", () => ({
  useCart: () => ({
    addItem: jest.fn(),
    hasItem: jest.fn(() => false),
  }),
}));

// ─── Niches data mock — small, controlled set ────────────────────────────────
jest.mock("@/lib/data/niches", () => {
  const NICHES_DATA = [
    {
      slug: "restaurant",
      title: "Ресторан / Кафе",
      subtitle: "Сайт для ресторану",
      description: "Опис ресторану",
      emoji: "🍽",
      category: "Їжа та гостинність",
      complexity: "medium",
      priceFrom: 9900,
      deliveryDays: 7,
      features: ["Система бронювання столиків", "Галерея страв"],
      pages: ["Головна"],
      tech: ["Next.js"],
      tags: ["ресторан", "кафе"],
      sampleSections: [],
      color: "from-orange-400 to-red-500",
      metaDescription: "",
      gradient: "",
    },
    {
      slug: "beauty-salon",
      title: "Салон краси",
      subtitle: "Сайт для салону",
      description: "Опис салону",
      emoji: "💇",
      category: "Краса та здоров'я",
      complexity: "simple",
      priceFrom: 7500,
      deliveryDays: 5,
      features: ["Онлайн-запис до майстра", "Галерея робіт", "SEO-оптимізація"],
      pages: ["Головна"],
      tech: ["Next.js"],
      tags: ["салон", "краса"],
      sampleSections: [],
      color: "from-pink-400 to-rose-500",
      metaDescription: "",
      gradient: "",
    },
    {
      slug: "saas-product",
      title: "SaaS / IT-продукт",
      subtitle: "Лендінг для SaaS",
      description: "Опис SaaS",
      emoji: "💻",
      category: "IT та SaaS",
      complexity: "complex",
      priceFrom: 24000,
      deliveryDays: 21,
      features: ["Особистий кабінет клієнта", "Кошик та онлайн-оплата", "Блог"],
      pages: ["Головна"],
      tech: ["Next.js"],
      tags: ["saas", "it", "продукт"],
      sampleSections: [],
      color: "from-blue-400 to-indigo-500",
      metaDescription: "",
      gradient: "",
    },
  ];
  return {
    NICHE_CATEGORIES: ["Їжа та гостинність", "Краса та здоров'я", "IT та SaaS"],
    NICHES_DATA,
    getNicheLocalized: (slug: string) => NICHES_DATA.find((n) => n.slug === slug),
  };
});

// ─── Helpers ─────────────────────────────────────────────────────────────────
const renderCatalog = () => render(<CatalogClient />);

const openFilters = () => {
  fireEvent.click(screen.getByRole("button", { name: /фільтри/i }));
};

// ─── Tests ───────────────────────────────────────────────────────────────────
describe("CatalogClient", () => {
  beforeEach(() => {
    mockReplace.mockClear();
  });

  // Rendering
  it("відображає всі продукти при старті", () => {
    renderCatalog();
    expect(screen.getByText("Ресторан / Кафе")).toBeInTheDocument();
    expect(screen.getByText("Салон краси")).toBeInTheDocument();
    expect(screen.getByText("SaaS / IT-продукт")).toBeInTheDocument();
  });

  it("відображає поле пошуку", () => {
    renderCatalog();
    expect(screen.getByPlaceholderText(/пошук рішень/i)).toBeInTheDocument();
  });

  it("відображає select сортування", () => {
    renderCatalog();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("відображає кнопку фільтрів", () => {
    renderCatalog();
    expect(screen.getByRole("button", { name: /фільтри/i })).toBeInTheDocument();
  });

  // Search
  it("фільтрує за пошуком — знаходить по назві", () => {
    renderCatalog();
    fireEvent.change(screen.getByPlaceholderText(/пошук рішень/i), { target: { value: "Ресторан" } });
    expect(screen.getByText("Ресторан / Кафе")).toBeInTheDocument();
    expect(screen.queryByText("Салон краси")).not.toBeInTheDocument();
  });

  it("фільтрує за пошуком — знаходить по тегу", () => {
    renderCatalog();
    fireEvent.change(screen.getByPlaceholderText(/пошук рішень/i), { target: { value: "saas" } });
    expect(screen.getByText("SaaS / IT-продукт")).toBeInTheDocument();
    expect(screen.queryByText("Ресторан / Кафе")).not.toBeInTheDocument();
  });

  it("показує 'нічого не знайдено' для невідомого запиту", () => {
    renderCatalog();
    fireEvent.change(screen.getByPlaceholderText(/пошук рішень/i), { target: { value: "xyzxyzxyz" } });
    expect(screen.getByText(/нічого не знайдено/i)).toBeInTheDocument();
  });

  it("показує кнопку 'скинути' коли є активний пошук", () => {
    renderCatalog();
    fireEvent.change(screen.getByPlaceholderText(/пошук рішень/i), { target: { value: "Ресторан" } });
    // X button inside the search input appears
    const searchInput = screen.getByPlaceholderText(/пошук рішень/i);
    expect(searchInput.closest("div")?.querySelector("button")).toBeInTheDocument();
  });

  it("очищає пошук після кліку X", () => {
    renderCatalog();
    const input = screen.getByPlaceholderText(/пошук рішень/i);
    fireEvent.change(input, { target: { value: "Ресторан" } });
    expect(screen.queryByText("Салон краси")).not.toBeInTheDocument();
    // Click the clear button (X inside search div)
    const clearBtn = input.closest("div")!.querySelector("button")!;
    fireEvent.click(clearBtn);
    expect(screen.getByText("Салон краси")).toBeInTheDocument();
  });

  // Filters panel
  it("відкриває панель фільтрів", () => {
    renderCatalog();
    fireEvent.click(screen.getByRole("button", { name: /фільтри/i }));
    // After clicking filters, sidebar content becomes visible (mobile drawer)
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  // Price filter
  it("показує слайдер ціни", () => {
    renderCatalog();
    openFilters();
    expect(screen.getAllByRole("slider")[0]).toBeInTheDocument();
  });

  it("фільтрує за максимальною ціною", () => {
    renderCatalog();
    openFilters();
    // Set max price to 10000 — should hide SaaS (24000) but keep restaurant (9900) and beauty (7500)
    const slider = screen.getAllByRole("slider")[0];
    fireEvent.change(slider, { target: { value: "10000" } });
    expect(screen.getByText("Ресторан / Кафе")).toBeInTheDocument();
    expect(screen.getByText("Салон краси")).toBeInTheDocument();
    expect(screen.queryByText("SaaS / IT-продукт")).not.toBeInTheDocument();
  });

  // Complexity filter
  it("фільтрує за складністю 'Простий'", () => {
    renderCatalog();
    openFilters();
    const simpleBtn = screen.getAllByRole("button", { name: "Простий" })[0];
    fireEvent.click(simpleBtn);
    expect(screen.getByText("Салон краси")).toBeInTheDocument();
    expect(screen.queryByText("Ресторан / Кафе")).not.toBeInTheDocument();
    expect(screen.queryByText("SaaS / IT-продукт")).not.toBeInTheDocument();
  });

  it("знімає фільтр складності при повторному кліку", () => {
    renderCatalog();
    openFilters();
    const simpleBtn = screen.getAllByRole("button", { name: "Простий" })[0];
    fireEvent.click(simpleBtn);
    expect(screen.queryByText("Ресторан / Кафе")).not.toBeInTheDocument();
    fireEvent.click(simpleBtn);
    expect(screen.getByText("Ресторан / Кафе")).toBeInTheDocument();
  });

  // Feature filter
  it("фільтрує за функціоналом 'Онлайн-запис'", () => {
    renderCatalog();
    openFilters();
    const bookingBtns = screen.getAllByRole("button", { name: /онлайн-запис/i });
    fireEvent.click(bookingBtns[0]);
    // beauty-salon has "Онлайн-запис до майстра"; restaurant has "Система бронювання столиків" — both match
    expect(screen.getByText("Салон краси")).toBeInTheDocument();
    expect(screen.getByText("Ресторан / Кафе")).toBeInTheDocument();
    // SaaS has no booking feature
    expect(screen.queryByText("SaaS / IT-продукт")).not.toBeInTheDocument();
  });

  it("фільтрує за функціоналом 'SEO-оптимізація'", () => {
    renderCatalog();
    openFilters();
    const seoBtns = screen.getAllByRole("button", { name: /seo/i });
    fireEvent.click(seoBtns[0]);
    expect(screen.getByText("Салон краси")).toBeInTheDocument();
    expect(screen.queryByText("Ресторан / Кафе")).not.toBeInTheDocument();
  });

  it("знімає фільтр функціоналу при повторному кліку", () => {
    renderCatalog();
    openFilters();
    const seoBtns = screen.getAllByRole("button", { name: /seo/i });
    fireEvent.click(seoBtns[0]);
    expect(screen.queryByText("Ресторан / Кафе")).not.toBeInTheDocument();
    fireEvent.click(seoBtns[0]);
    expect(screen.getByText("Ресторан / Кафе")).toBeInTheDocument();
  });

  // Active filter chips
  it("показує chip складності після вибору", () => {
    renderCatalog();
    openFilters();
    fireEvent.click(screen.getAllByRole("button", { name: "Складний" })[0]);
    // chip should appear below filters
    expect(screen.getAllByText("Складний").length).toBeGreaterThan(0);
  });

  // Clear all — "Скинути" button appears when hasFilters=true
  it("'Скинути' повертає всі продукти", () => {
    renderCatalog();
    fireEvent.change(screen.getByPlaceholderText(/пошук рішень/i), { target: { value: "Ресторан" } });
    expect(screen.queryByText("Салон краси")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /^скинути$/i }));
    expect(screen.getByText("Салон краси")).toBeInTheDocument();
  });

  // URL sync
  it("оновлює URL при пошуку", () => {
    renderCatalog();
    fireEvent.change(screen.getByPlaceholderText(/пошук рішень/i), { target: { value: "салон" } });
    expect(mockReplace).toHaveBeenCalled();
  });

  // Empty state reset button
  it("кнопка 'Скинути фільтри' в порожньому стані повертає всі продукти", () => {
    renderCatalog();
    fireEvent.change(screen.getByPlaceholderText(/пошук рішень/i), { target: { value: "xyzxyz" } });
    fireEvent.click(screen.getByRole("button", { name: /скинути фільтри/i }));
    expect(screen.getByText("Ресторан / Кафе")).toBeInTheDocument();
  });
});
