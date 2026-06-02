import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ComparePanel } from "../ComparePanel";

const mockRemoveItem = jest.fn();
const mockClearAll = jest.fn();
let mockItems: Array<{ slug: string; title: string; emoji: string; complexity: string; priceFrom: number }> = [];

jest.mock("@/components/layout/LocaleProvider", () => ({
  useLocale: () => "uk",
}));

jest.mock("@/hooks/useCompare", () => ({
  useCompare: () => ({
    items: mockItems,
    removeItem: mockRemoveItem,
    clearAll: mockClearAll,
  }),
}));

jest.mock("next/link", () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
  MockLink.displayName = "MockLink";
  return MockLink;
});

beforeEach(() => {
  mockRemoveItem.mockClear();
  mockClearAll.mockClear();
});

describe("ComparePanel", () => {
  it("renders nothing when fewer than 2 items", () => {
    mockItems = [{ slug: "beauty", title: "Салон краси", emoji: "✂️", complexity: "medium", priceFrom: 9900 }];
    const { container } = render(<ComparePanel />);
    expect(container.innerHTML).toBe("");
  });

  it("renders panel when 2+ items", () => {
    mockItems = [
      { slug: "beauty", title: "Салон краси", emoji: "✂️", complexity: "medium", priceFrom: 9900 },
      { slug: "fitness", title: "Фітнес-клуб", emoji: "💪", complexity: "medium", priceFrom: 9900 },
    ];
    render(<ComparePanel />);
    expect(screen.getByText("Порівняння")).toBeInTheDocument();
    expect(screen.getByText("Салон краси")).toBeInTheDocument();
    expect(screen.getByText("Фітнес-клуб")).toBeInTheDocument();
  });

  it("shows item count badge", () => {
    mockItems = [
      { slug: "beauty", title: "Салон краси", emoji: "✂️", complexity: "medium", priceFrom: 9900 },
      { slug: "fitness", title: "Фітнес-клуб", emoji: "💪", complexity: "medium", priceFrom: 9900 },
    ];
    render(<ComparePanel />);
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("calls removeItem when X button clicked", () => {
    mockItems = [
      { slug: "beauty", title: "Салон краси", emoji: "✂️", complexity: "medium", priceFrom: 9900 },
      { slug: "fitness", title: "Фітнес-клуб", emoji: "💪", complexity: "medium", priceFrom: 9900 },
    ];
    render(<ComparePanel />);
    const removeBtn = screen.getByLabelText("Прибрати Салон краси з порівняння");
    fireEvent.click(removeBtn);
    expect(mockRemoveItem).toHaveBeenCalledWith("beauty");
  });

  it("calls clearAll when Очистити clicked", () => {
    mockItems = [
      { slug: "beauty", title: "Салон краси", emoji: "✂️", complexity: "medium", priceFrom: 9900 },
      { slug: "fitness", title: "Фітнес-клуб", emoji: "💪", complexity: "medium", priceFrom: 9900 },
    ];
    render(<ComparePanel />);
    fireEvent.click(screen.getByText("Очистити"));
    expect(mockClearAll).toHaveBeenCalled();
  });

  it("has compare link with correct slugs", () => {
    mockItems = [
      { slug: "beauty", title: "Салон краси", emoji: "✂️", complexity: "medium", priceFrom: 9900 },
      { slug: "fitness", title: "Фітнес-клуб", emoji: "💪", complexity: "medium", priceFrom: 9900 },
    ];
    render(<ComparePanel />);
    const compareLink = screen.getByRole("link", { name: /порівняти/i });
    expect(compareLink).toHaveAttribute("href", "/uk/marketplace/compare?slugs=beauty,fitness");
  });

  it("shows empty slots when less than 3 items", () => {
    mockItems = [
      { slug: "beauty", title: "Салон краси", emoji: "✂️", complexity: "medium", priceFrom: 9900 },
      { slug: "fitness", title: "Фітнес-клуб", emoji: "💪", complexity: "medium", priceFrom: 9900 },
    ];
    render(<ComparePanel />);
    expect(screen.getByText("+ додати")).toBeInTheDocument();
  });

  it("shows complexity labels", () => {
    mockItems = [
      { slug: "beauty", title: "Салон краси", emoji: "✂️", complexity: "simple", priceFrom: 4900 },
      { slug: "medical", title: "Медична клініка", emoji: "🏥", complexity: "complex", priceFrom: 19900 },
    ];
    render(<ComparePanel />);
    expect(screen.getByText("Простий")).toBeInTheDocument();
    expect(screen.getByText("Складний")).toBeInTheDocument();
  });

  it("has aria-label for accessibility", () => {
    mockItems = [
      { slug: "beauty", title: "Салон краси", emoji: "✂️", complexity: "medium", priceFrom: 9900 },
      { slug: "fitness", title: "Фітнес-клуб", emoji: "💪", complexity: "medium", priceFrom: 9900 },
    ];
    render(<ComparePanel />);
    expect(screen.getByRole("region", { name: "Панель порівняння" })).toBeInTheDocument();
  });
});

export {};
