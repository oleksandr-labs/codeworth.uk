import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { NicheGrid } from "../NicheGrid";

jest.mock("next/link", () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
  MockLink.displayName = "MockLink";
  return MockLink;
});

jest.mock("@/components/layout/LocaleProvider", () => ({
  useLocale: () => "uk",
}));

const MOCK_NICHES = [
  {
    group: "🍽 Їжа та гостинність",
    items: [
      { name: "Ресторан / Кафе", slug: "restaurant", price: "9 900", complexity: "medium", emoji: "🍽", color: "from-orange-400 to-red-500" },
      { name: "Кондитерська", slug: "bakery", price: "4 900", complexity: "simple", emoji: "🎂", color: "from-amber-400 to-orange-400" },
      { name: "Доставка їжі", slug: "food-delivery", price: "19 900", complexity: "complex", emoji: "🛵", color: "from-red-400 to-rose-600" },
    ],
  },
  {
    group: "💇 Краса та здоров'я",
    items: [
      { name: "Салон краси", slug: "beauty", price: "9 900", complexity: "medium", emoji: "✂️", color: "from-pink-400 to-rose-500" },
      { name: "Медична клініка", slug: "medical", price: "19 900", complexity: "complex", emoji: "🏥", color: "from-blue-400 to-indigo-500" },
    ],
  },
];

describe("NicheGrid", () => {
  it("відображає всі групи та їх ніші", () => {
    render(<NicheGrid niches={MOCK_NICHES} />);
    expect(screen.getByText("🍽 Їжа та гостинність")).toBeInTheDocument();
    expect(screen.getByText("💇 Краса та здоров'я")).toBeInTheDocument();
    expect(screen.getByText("Ресторан / Кафе")).toBeInTheDocument();
    expect(screen.getByText("Салон краси")).toBeInTheDocument();
  });

  it("відображає поле пошуку", () => {
    render(<NicheGrid niches={MOCK_NICHES} />);
    expect(screen.getByPlaceholderText(/пошук ніші/i)).toBeInTheDocument();
  });

  it("відображає кнопки фільтру складності", () => {
    render(<NicheGrid niches={MOCK_NICHES} />);
    expect(screen.getByRole("button", { name: /^Всі$/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /простий/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /середній/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /складний/i })).toBeInTheDocument();
  });

  it("пошук фільтрує ніші за назвою", () => {
    render(<NicheGrid niches={MOCK_NICHES} />);
    fireEvent.change(screen.getByPlaceholderText(/пошук ніші/i), {
      target: { value: "ресторан" },
    });
    expect(screen.getByText("Ресторан / Кафе")).toBeInTheDocument();
    expect(screen.queryByText("Кондитерська")).not.toBeInTheDocument();
    expect(screen.queryByText("Салон краси")).not.toBeInTheDocument();
  });

  it("показує кількість знайдених результатів при пошуку", () => {
    render(<NicheGrid niches={MOCK_NICHES} />);
    fireEvent.change(screen.getByPlaceholderText(/пошук ніші/i), {
      target: { value: "кліні" },
    });
    expect(screen.getByText(/знайдено/i)).toBeInTheDocument();
  });

  it("фільтр 'Простий' показує тільки прості ніші", () => {
    render(<NicheGrid niches={MOCK_NICHES} />);
    fireEvent.click(screen.getByRole("button", { name: /простий/i }));
    expect(screen.getByText("Кондитерська")).toBeInTheDocument();
    expect(screen.queryByText("Ресторан / Кафе")).not.toBeInTheDocument();
    expect(screen.queryByText("Доставка їжі")).not.toBeInTheDocument();
  });

  it("фільтр 'Складний' показує тільки складні ніші", () => {
    render(<NicheGrid niches={MOCK_NICHES} />);
    fireEvent.click(screen.getByRole("button", { name: /складний/i }));
    expect(screen.getByText("Доставка їжі")).toBeInTheDocument();
    expect(screen.getByText("Медична клініка")).toBeInTheDocument();
    expect(screen.queryByText("Кондитерська")).not.toBeInTheDocument();
  });

  it("порожній результат показує стан 'Нічого не знайдено'", () => {
    render(<NicheGrid niches={MOCK_NICHES} />);
    fireEvent.change(screen.getByPlaceholderText(/пошук ніші/i), {
      target: { value: "qwerty12345xyz" },
    });
    expect(screen.getByText(/нічого не знайдено/i)).toBeInTheDocument();
  });

  it("кнопка 'Скинути фільтри' очищує пошук і фільтр", () => {
    render(<NicheGrid niches={MOCK_NICHES} />);
    fireEvent.change(screen.getByPlaceholderText(/пошук ніші/i), {
      target: { value: "ресторан" },
    });
    fireEvent.click(screen.getByRole("button", { name: /скинути фільтри/i }));
    expect(screen.getByText("🍽 Їжа та гостинність")).toBeInTheDocument();
    expect(screen.getByText("💇 Краса та здоров'я")).toBeInTheDocument();
  });

  it("кнопка 'Показати всі рішення' у порожньому стані скидає фільтр", () => {
    render(<NicheGrid niches={MOCK_NICHES} />);
    fireEvent.change(screen.getByPlaceholderText(/пошук ніші/i), {
      target: { value: "qwerty12345xyz" },
    });
    fireEvent.click(screen.getByRole("button", { name: /показати всі рішення/i }));
    expect(screen.getByText("Ресторан / Кафе")).toBeInTheDocument();
  });

  it("кнопки 'Замовити' ведуть на /marketplace/product/[slug]", () => {
    render(<NicheGrid niches={MOCK_NICHES} />);
    const orderLinks = screen.getAllByRole("link", { name: /замовити/i });
    expect(orderLinks[0].getAttribute("href")).toContain("/marketplace/product/");
  });

  it("кнопки 'Demo' ведуть на /niches/[slug]", () => {
    render(<NicheGrid niches={MOCK_NICHES} />);
    const demoLinks = screen.getAllByRole("link", { name: /demo/i });
    expect(demoLinks[0].getAttribute("href")).toContain("/niches/");
  });

  it("фільтр 'Всі' після застосованого фільтру показує всі ніші", () => {
    render(<NicheGrid niches={MOCK_NICHES} />);
    fireEvent.click(screen.getByRole("button", { name: /простий/i }));
    fireEvent.click(screen.getByRole("button", { name: /^Всі$/i }));
    expect(screen.getByText("Ресторан / Кафе")).toBeInTheDocument();
    expect(screen.getByText("Медична клініка")).toBeInTheDocument();
  });

  it("комбінований пошук + складність", () => {
    render(<NicheGrid niches={MOCK_NICHES} />);
    fireEvent.click(screen.getByRole("button", { name: /складний/i }));
    fireEvent.change(screen.getByPlaceholderText(/пошук ніші/i), {
      target: { value: "доставка" },
    });
    expect(screen.getByText("Доставка їжі")).toBeInTheDocument();
    expect(screen.queryByText("Медична клініка")).not.toBeInTheDocument();
  });
});
