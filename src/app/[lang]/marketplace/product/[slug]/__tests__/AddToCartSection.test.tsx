import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AddToCartSection from "../AddToCartSection";
import type { NicheData } from "@/lib/data/niches";

jest.mock("@/components/layout/LocaleProvider", () => ({
  useLocale: () => "uk",
}));

jest.mock("next/link", () => {
  const MockLink = ({ children, href, target }: { children: React.ReactNode; href: string; target?: string }) => (
    <a href={href} target={target}>{children}</a>
  );
  MockLink.displayName = "MockLink";
  return MockLink;
});

jest.mock("@/components/ui/Button", () => ({
  Button: ({ children, href }: { children: React.ReactNode; href?: string }) => (
    <a href={href}>{children}</a>
  ),
}));

const mockAddItem = jest.fn();
const mockHasItem = jest.fn(() => false);

jest.mock("@/hooks/useCart", () => ({
  useCart: () => ({
    addItem: mockAddItem,
    hasItem: mockHasItem,
  }),
}));

const MOCK_NICHE: NicheData = {
  slug: "restaurant",
  title: "Ресторан / Кафе",
  subtitle: "Сайт для ресторану",
  description: "Опис",
  emoji: "🍽",
  category: "Їжа та гостинність",
  complexity: "medium",
  priceFrom: 9900,
  deliveryDays: 7,
  features: ["Система бронювання столиків", "SEO-оптимізація"],
  pages: ["Головна", "Меню"],
  tech: ["Next.js"],
  tags: ["ресторан"],
  sampleSections: ["Hero"],
  color: "from-orange-400 to-red-500",
  metaDescription: "Сайт для ресторану від Codeworth",
  gradient: "from-orange-400 to-red-500",
};

beforeEach(() => {
  jest.clearAllMocks();
  mockHasItem.mockReturnValue(false);
});

describe("AddToCartSection", () => {
  it("відображає кнопку 'Замовити зараз' із посиланням на /contact", () => {
    render(<AddToCartSection niche={MOCK_NICHE} />);
    expect(screen.getByRole("link", { name: /замовити зараз/i })).toHaveAttribute("href", "/uk/contact");
  });

  it("відображає кнопку 'В кошик' коли товар не в кошику", () => {
    render(<AddToCartSection niche={MOCK_NICHE} />);
    expect(screen.getByRole("button", { name: /в кошик/i })).toBeInTheDocument();
  });

  it("клік 'В кошик' викликає addItem з правильними даними", () => {
    render(<AddToCartSection niche={MOCK_NICHE} />);
    fireEvent.click(screen.getByRole("button", { name: /в кошик/i }));
    expect(mockAddItem).toHaveBeenCalledWith(
      expect.objectContaining({
        id: "restaurant-basic",
        slug: "restaurant",
        title: "Ресторан / Кафе",
        package: "Базовий",
        price: 9900,
      })
    );
  });

  it("показує 'У кошику' якщо товар вже є в кошику", () => {
    mockHasItem.mockReturnValue(true);
    render(<AddToCartSection niche={MOCK_NICHE} />);
    expect(screen.getByRole("button", { name: /у кошику/i })).toBeInTheDocument();
  });

  it("кнопка 'У кошику' задизейблена", () => {
    mockHasItem.mockReturnValue(true);
    render(<AddToCartSection niche={MOCK_NICHE} />);
    expect(screen.getByRole("button", { name: /у кошику/i })).toBeDisabled();
  });

  it("клік на задизейблену кнопку не викликає addItem", () => {
    mockHasItem.mockReturnValue(true);
    render(<AddToCartSection niche={MOCK_NICHE} />);
    fireEvent.click(screen.getByRole("button", { name: /у кошику/i }));
    expect(mockAddItem).not.toHaveBeenCalled();
  });

  it("відображає посилання 'Демо-сайт' на /niches/[slug]", () => {
    render(<AddToCartSection niche={MOCK_NICHE} />);
    expect(screen.getByRole("link", { name: /демо-сайт/i })).toHaveAttribute("href", "/uk/niches/restaurant");
  });

  it("Демо посилання відкривається у новій вкладці", () => {
    render(<AddToCartSection niche={MOCK_NICHE} />);
    expect(screen.getByRole("link", { name: /демо-сайт/i })).toHaveAttribute("target", "_blank");
  });
});
