import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { PortfolioContent } from "../PortfolioContent";

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

jest.mock("@/components/ui/Lightbox", () => ({
  Lightbox: ({ onClose }: { onClose: () => void }) => (
    <div data-testid="lightbox">
      <button onClick={onClose}>Закрити</button>
    </div>
  ),
}));

jest.mock("@/lib/data/portfolio", () => ({
  PROJECTS: [
    {
      slug: "restaurant-cafe",
      title: "Ресторан «Смачно»",
      client: "Ресторан / Кафе",
      category: "Корпоративний сайт",
      niche: "Їжа",
      year: 2024,
      complexity: "medium",
      tags: ["SEO", "Mobile First"],
      tech: ["Next.js", "Tailwind"],
      description: "Сайт ресторану з онлайн-меню.",
      result: "Бронювань +60%",
      color: "from-orange-400 to-red-500",
      emoji: "🍽",
      nicheSlug: "restaurant",
    },
    {
      slug: "beauty-salon",
      title: "Beauty Room Kyiv",
      client: "Салон краси",
      category: "Корпоративний сайт",
      niche: "Краса",
      year: 2024,
      complexity: "simple",
      tags: ["SEO", "Booking"],
      tech: ["Next.js", "TypeScript"],
      description: "Сайт салону краси з онлайн-записом.",
      result: "Клієнтів +40%",
      color: "from-pink-400 to-rose-500",
      emoji: "✂️",
      nicheSlug: "beauty",
    },
    {
      slug: "medical-clinic",
      title: "МедЦентр «Здоров'я»",
      client: "Медична клініка",
      category: "Портал",
      niche: "Медицина",
      year: 2024,
      complexity: "complex",
      tags: ["PWA", "CMS"],
      tech: ["Next.js", "Prisma"],
      description: "Медичний портал з каталогом послуг.",
      result: "Трафік +120%",
      color: "from-blue-400 to-indigo-500",
      emoji: "🏥",
      nicheSlug: "medical",
    },
  ],
  COMPLEXITY_LABELS: {
    simple: { label: "🟢 Простий", color: "bg-emerald-50 text-emerald-700" },
    medium: { label: "🟡 Середній", color: "bg-amber-50 text-amber-700" },
    complex: { label: "🔴 Складний", color: "bg-red-50 text-red-700" },
  },
}));

describe("PortfolioContent", () => {
  it("відображає всі проєкти за замовчуванням", () => {
    render(<PortfolioContent />);
    expect(screen.getByText("Ресторан «Смачно»")).toBeInTheDocument();
    expect(screen.getByText("Beauty Room Kyiv")).toBeInTheDocument();
    expect(screen.getByText("МедЦентр «Здоров'я»")).toBeInTheDocument();
  });

  it("показує правильну кількість проєктів", () => {
    render(<PortfolioContent />);
    expect(screen.getByText(/показано 3 з 3/i)).toBeInTheDocument();
  });

  it("відображає поле пошуку", () => {
    render(<PortfolioContent />);
    expect(screen.getByPlaceholderText(/пошук проєктів/i)).toBeInTheDocument();
  });

  it("фільтрує проєкти за пошуковим запитом", () => {
    render(<PortfolioContent />);
    const input = screen.getByPlaceholderText(/пошук проєктів/i);
    fireEvent.change(input, { target: { value: "ресторан" } });
    expect(screen.getByText("Ресторан «Смачно»")).toBeInTheDocument();
    expect(screen.queryByText("Beauty Room Kyiv")).not.toBeInTheDocument();
    expect(screen.queryByText("МедЦентр «Здоров'я»")).not.toBeInTheDocument();
  });

  it("фільтрує за тегом у пошуку", () => {
    render(<PortfolioContent />);
    fireEvent.change(screen.getByPlaceholderText(/пошук проєктів/i), { target: { value: "PWA" } });
    expect(screen.getByText("МедЦентр «Здоров'я»")).toBeInTheDocument();
    expect(screen.queryByText("Ресторан «Смачно»")).not.toBeInTheDocument();
  });

  it("показує кнопку очищення при непорожньому запиті", () => {
    render(<PortfolioContent />);
    fireEvent.change(screen.getByPlaceholderText(/пошук проєктів/i), { target: { value: "test" } });
    expect(screen.getByRole("button", { name: /очистити пошук/i })).toBeInTheDocument();
  });

  it("кнопка очищення скидає пошук", () => {
    render(<PortfolioContent />);
    const input = screen.getByPlaceholderText(/пошук проєктів/i);
    fireEvent.change(input, { target: { value: "ресторан" } });
    fireEvent.click(screen.getByRole("button", { name: /очистити пошук/i }));
    expect(screen.getAllByRole("heading", { level: 3 }).length).toBe(3);
  });

  it("фільтрує за категорією 'Портал'", () => {
    render(<PortfolioContent />);
    fireEvent.click(screen.getByRole("button", { name: "Портал" }));
    expect(screen.getByText("МедЦентр «Здоров'я»")).toBeInTheDocument();
    expect(screen.queryByText("Ресторан «Смачно»")).not.toBeInTheDocument();
  });

  it("кнопка 'Всі' показує всі проєкти", () => {
    render(<PortfolioContent />);
    fireEvent.click(screen.getByRole("button", { name: "Портал" }));
    fireEvent.click(screen.getByRole("button", { name: "Всі" }));
    expect(screen.getByText(/показано 3 з 3/i)).toBeInTheDocument();
  });

  it("фільтрує за складністю 'Прості'", () => {
    render(<PortfolioContent />);
    fireEvent.click(screen.getByRole("button", { name: /прості/i }));
    expect(screen.getByText("Beauty Room Kyiv")).toBeInTheDocument();
    expect(screen.queryByText("Ресторан «Смачно»")).not.toBeInTheDocument();
    expect(screen.queryByText("МедЦентр «Здоров'я»")).not.toBeInTheDocument();
  });

  it("показує порожній стан при відсутності результатів", () => {
    render(<PortfolioContent />);
    fireEvent.change(screen.getByPlaceholderText(/пошук проєктів/i), {
      target: { value: "xyznonexistent" },
    });
    expect(screen.getByText(/нічого не знайдено/i)).toBeInTheDocument();
  });

  it("кнопка 'Скинути фільтри' у порожньому стані скидає все", () => {
    render(<PortfolioContent />);
    fireEvent.click(screen.getByRole("button", { name: /портал/i }));
    fireEvent.click(screen.getByRole("button", { name: /складні/i }));
    // Should be empty since no "Портал" + "complex" combo besides МедЦентр
    // МедЦентр is complex+Портал so it should show, let's filter for something that gives empty
    // Use search to guarantee empty state
    fireEvent.change(screen.getByPlaceholderText(/пошук проєктів/i), {
      target: { value: "xyznonexistent" },
    });
    const resetBtn = screen.getByRole("button", { name: /скинути фільтри/i });
    fireEvent.click(resetBtn);
    expect(screen.getByText(/показано 3 з 3/i)).toBeInTheDocument();
  });

  it("картка має посилання на кейс /portfolio/[slug]", () => {
    render(<PortfolioContent />);
    const caseLinks = screen.getAllByRole("link", { name: /деталі/i });
    expect(caseLinks[0]).toHaveAttribute("href", "/uk/portfolio/restaurant-cafe");
  });

  it("картка має посилання 'Демо' для проєктів з nicheSlug", () => {
    render(<PortfolioContent />);
    const demoLinks = screen.getAllByRole("link", { name: /демо/i });
    expect(demoLinks.length).toBe(3);
    expect(demoLinks[0]).toHaveAttribute("href", "/uk/niches/restaurant");
  });

  it("відображає результат проєкту (📈 метрика)", () => {
    render(<PortfolioContent />);
    expect(screen.getByText(/бронювань \+60%/i)).toBeInTheDocument();
  });

  it("відображає теги проєкту", () => {
    render(<PortfolioContent />);
    expect(screen.getAllByText("SEO").length).toBeGreaterThan(0);
  });

  it("відкриває lightbox при кліку на зображення проєкту", () => {
    render(<PortfolioContent />);
    const previewBtn = screen.getAllByLabelText(/переглянути скріншоти/i)[0];
    fireEvent.click(previewBtn);
    expect(screen.getByTestId("lightbox")).toBeInTheDocument();
  });

  it("закриває lightbox при натисканні кнопки закриття", () => {
    render(<PortfolioContent />);
    fireEvent.click(screen.getAllByLabelText(/переглянути скріншоти/i)[0]);
    fireEvent.click(screen.getByRole("button", { name: /закрити/i }));
    expect(screen.queryByTestId("lightbox")).not.toBeInTheDocument();
  });
});
