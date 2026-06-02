import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ExtrasCatalog } from "../ExtrasCatalog";

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

jest.mock("@/lib/data/extras", () => ({
  getExtraTitle: (extra: { id: string; title: string }) => extra.title,
  getExtraDesc: (extra: { id: string; description: string }) => extra.description,
  EXTRA_CATEGORIES: [
    { value: "pages", label: "Сторінки", labelEn: "Pages", emoji: "📄", description: "Окремі сторінки", descriptionEn: "Individual pages" },
    { value: "features", label: "Функції", labelEn: "Features", emoji: "⚙️", description: "Інтерактивні модулі", descriptionEn: "Interactive modules" },
  ],
  EXTRAS: [
    {
      id: "page-landing",
      title: "Лендінг-сторінка",
      description: "Одна продаюча сторінка з hero та CTA.",
      category: "pages",
      priceFrom: 3500,
      deliveryDays: 5,
      tags: ["SEO", "Mobile First"],
      emoji: "🚀",
      isPopular: true,
      isNew: false,
    },
    {
      id: "page-about",
      title: "Сторінка «Про нас»",
      description: "Корпоративна сторінка з командою.",
      category: "pages",
      priceFrom: 2500,
      deliveryDays: 4,
      tags: ["Брендинг"],
      emoji: "🏢",
      isPopular: false,
      isNew: true,
    },
    {
      id: "feat-contact-form",
      title: "Форма зворотного зв'язку + Telegram",
      description: "Форма з валідацією та Telegram-сповіщенням.",
      category: "features",
      priceFrom: 1500,
      deliveryDays: 2,
      tags: ["Telegram", "Ліди"],
      emoji: "📬",
      isPopular: true,
      isNew: false,
    },
  ],
}));

// ExtraCard uses next/link internally — mock ExtraCard to avoid deep rendering
jest.mock("../ExtraCard", () => ({
  ExtraCard: ({ extra }: { extra: { title: string; isPopular: boolean; isNew: boolean; category: string } }) => (
    <div data-testid="extra-card" data-category={extra.category}>
      <span>{extra.title}</span>
      {extra.isPopular && <span>Популярне</span>}
      {extra.isNew && <span>New</span>}
    </div>
  ),
}));

describe("ExtrasCatalog", () => {
  it("відображає всі доробки за замовчуванням", () => {
    render(<ExtrasCatalog />);
    expect(screen.getByText("Лендінг-сторінка")).toBeInTheDocument();
    expect(screen.getByText("Сторінка «Про нас»")).toBeInTheDocument();
    expect(screen.getByText("Форма зворотного зв'язку + Telegram")).toBeInTheDocument();
  });

  it("відображає поле пошуку", () => {
    render(<ExtrasCatalog />);
    expect(screen.getByPlaceholderText(/пошук доробок/i)).toBeInTheDocument();
  });

  it("відображає кнопку 'Всі'", () => {
    render(<ExtrasCatalog />);
    expect(screen.getByRole("button", { name: /^всі/i })).toBeInTheDocument();
  });

  it("відображає категорійні кнопки з усіх EXTRA_CATEGORIES", () => {
    render(<ExtrasCatalog />);
    expect(screen.getByRole("button", { name: /сторінки/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /функції/i })).toBeInTheDocument();
  });

  it("фільтрує за категорією 'pages'", () => {
    render(<ExtrasCatalog />);
    fireEvent.click(screen.getByRole("button", { name: /сторінки/i }));
    expect(screen.getByText("Лендінг-сторінка")).toBeInTheDocument();
    expect(screen.getByText("Сторінка «Про нас»")).toBeInTheDocument();
    expect(screen.queryByText("Форма зворотного зв'язку + Telegram")).not.toBeInTheDocument();
  });

  it("фільтрує за категорією 'features'", () => {
    render(<ExtrasCatalog />);
    fireEvent.click(screen.getByRole("button", { name: /функції/i }));
    expect(screen.getByText("Форма зворотного зв'язку + Telegram")).toBeInTheDocument();
    expect(screen.queryByText("Лендінг-сторінка")).not.toBeInTheDocument();
  });

  it("фільтрує за пошуковим запитом по назві", () => {
    render(<ExtrasCatalog />);
    fireEvent.change(screen.getByPlaceholderText(/пошук доробок/i), { target: { value: "лендінг" } });
    expect(screen.getByText("Лендінг-сторінка")).toBeInTheDocument();
    expect(screen.queryByText("Сторінка «Про нас»")).not.toBeInTheDocument();
    expect(screen.queryByText("Форма зворотного зв'язку + Telegram")).not.toBeInTheDocument();
  });

  it("фільтрує за пошуком по тегу", () => {
    render(<ExtrasCatalog />);
    fireEvent.change(screen.getByPlaceholderText(/пошук доробок/i), { target: { value: "Telegram" } });
    expect(screen.getByText("Форма зворотного зв'язку + Telegram")).toBeInTheDocument();
    expect(screen.queryByText("Лендінг-сторінка")).not.toBeInTheDocument();
  });

  it("показує кнопку очищення при непорожньому пошуку", () => {
    render(<ExtrasCatalog />);
    fireEvent.change(screen.getByPlaceholderText(/пошук доробок/i), { target: { value: "test" } });
    expect(screen.getByRole("button", { name: /очистити пошук/i })).toBeInTheDocument();
  });

  it("кнопка очищення скидає пошук і показує всі", () => {
    render(<ExtrasCatalog />);
    fireEvent.change(screen.getByPlaceholderText(/пошук доробок/i), { target: { value: "лендінг" } });
    fireEvent.click(screen.getByRole("button", { name: /очистити пошук/i }));
    expect(screen.getByText("Лендінг-сторінка")).toBeInTheDocument();
    expect(screen.getByText("Форма зворотного зв'язку + Telegram")).toBeInTheDocument();
  });

  it("кнопка 'Всі' показує всі доробки після фільтру", () => {
    render(<ExtrasCatalog />);
    fireEvent.click(screen.getByRole("button", { name: /функції/i }));
    fireEvent.click(screen.getByRole("button", { name: /^всі/i }));
    expect(screen.getAllByTestId("extra-card").length).toBe(3);
  });

  it("показує порожній стан при відсутності результатів", () => {
    render(<ExtrasCatalog />);
    fireEvent.change(screen.getByPlaceholderText(/пошук доробок/i), {
      target: { value: "xyznonexistentquery123" },
    });
    expect(screen.queryByTestId("extra-card")).not.toBeInTheDocument();
  });

  it("показує правильну кількість результатів", () => {
    render(<ExtrasCatalog />);
    expect(screen.getAllByTestId("extra-card").length).toBe(3);
  });
});
