import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { FAQContent } from "../FAQContent";

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

const MOCK_SECTIONS = [
  {
    id: "general",
    title: "Загальні питання",
    items: [
      { q: "Скільки коштує сайт?", a: "Вартість залежить від типу та складності проєкту." },
      { q: "Як довго триває розробка?", a: "Лендінг — 5 днів, корпоративний сайт — 2-3 тижні." },
    ],
  },
  {
    id: "tech",
    title: "Технічні питання",
    items: [
      { q: "Які технології ви використовуєте?", a: "Next.js, TypeScript, Tailwind CSS." },
      { q: "Чи є SEO-оптимізація?", a: "Так, базова SEO-оптимізація включена у всі проєкти." },
    ],
  },
];

describe("FAQContent", () => {
  it("відображає поле пошуку", () => {
    render(<FAQContent sections={MOCK_SECTIONS} />);
    expect(screen.getByPlaceholderText(/пошук у FAQ/i)).toBeInTheDocument();
  });

  it("відображає всі секції без пошуку", () => {
    render(<FAQContent sections={MOCK_SECTIONS} />);
    expect(screen.getByText("Загальні питання")).toBeInTheDocument();
    expect(screen.getByText("Технічні питання")).toBeInTheDocument();
  });

  it("відображає питання кожної секції", () => {
    render(<FAQContent sections={MOCK_SECTIONS} />);
    expect(screen.getByText("Скільки коштує сайт?")).toBeInTheDocument();
    expect(screen.getByText("Які технології ви використовуєте?")).toBeInTheDocument();
  });

  it("пошук фільтрує питання за текстом запитання", () => {
    render(<FAQContent sections={MOCK_SECTIONS} />);
    fireEvent.change(screen.getByPlaceholderText(/пошук у FAQ/i), {
      target: { value: "технологі" },
    });
    expect(screen.getByText("Які технології ви використовуєте?")).toBeInTheDocument();
    expect(screen.queryByText("Скільки коштує сайт?")).not.toBeInTheDocument();
  });

  it("пошук фільтрує за текстом відповіді", () => {
    render(<FAQContent sections={MOCK_SECTIONS} />);
    fireEvent.change(screen.getByPlaceholderText(/пошук у FAQ/i), {
      target: { value: "Next.js" },
    });
    expect(screen.getByText("Які технології ви використовуєте?")).toBeInTheDocument();
  });

  it("показує назву секції у результатах пошуку", () => {
    render(<FAQContent sections={MOCK_SECTIONS} />);
    fireEvent.change(screen.getByPlaceholderText(/пошук у FAQ/i), {
      target: { value: "технологі" },
    });
    expect(screen.getByText("Технічні питання")).toBeInTheDocument();
  });

  it("показує кількість результатів пошуку", () => {
    render(<FAQContent sections={MOCK_SECTIONS} />);
    fireEvent.change(screen.getByPlaceholderText(/пошук у FAQ/i), {
      target: { value: "сайт" },
    });
    expect(screen.getByText(/знайдено/i)).toBeInTheDocument();
  });

  it("показує повідомлення 'нічого не знайдено' для порожнього результату", () => {
    render(<FAQContent sections={MOCK_SECTIONS} />);
    fireEvent.change(screen.getByPlaceholderText(/пошук у FAQ/i), {
      target: { value: "qwerty12345" },
    });
    expect(screen.getByText(/нічого не знайдено/i)).toBeInTheDocument();
  });

  it("після очищення пошуку знову показує всі секції", () => {
    render(<FAQContent sections={MOCK_SECTIONS} />);
    const input = screen.getByPlaceholderText(/пошук у FAQ/i);
    fireEvent.change(input, { target: { value: "технологі" } });
    fireEvent.change(input, { target: { value: "" } });
    expect(screen.getByText("Загальні питання")).toBeInTheDocument();
    expect(screen.getByText("Технічні питання")).toBeInTheDocument();
  });

  it("має посилання для зв'язку з командою", () => {
    render(<FAQContent sections={MOCK_SECTIONS} />);
    const contactLinks = screen.getAllByRole("link");
    expect(contactLinks.length).toBeGreaterThan(0);
  });
});
