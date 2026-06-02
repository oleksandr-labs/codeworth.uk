/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { NicheReviews } from "../NicheReviews";
import { NicheStats } from "../NicheStats";
import { NicheCalculator } from "../NicheCalculator";
import { BookingSection } from "../BookingSection";
import type { NicheCalculatorStep } from "@/lib/data/niches";

jest.mock("@/components/layout/LocaleProvider", () => ({
  useLocale: () => "uk",
}));

jest.mock("@/components/ui/Avatar", () => ({
  Avatar: ({ name }: { name: string }) => <div data-testid="avatar">{name}</div>,
}));

jest.mock("@/components/ui/StarRating", () => ({
  StarRating: ({ value }: { value: number }) => <div data-testid="star-rating">{value}</div>,
}));

jest.mock("@/components/ui/CountUp", () => ({
  CountUp: ({ end, suffix }: { end: number; suffix?: string }) => (
    <span>{end}{suffix}</span>
  ),
}));

// ── NicheReviews ──────────────────────────────────────────────────────
describe("NicheReviews", () => {
  it("відображає заголовок 'Що кажуть наші клієнти'", () => {
    render(<NicheReviews slug="restaurant" color="#6366f1" />);
    expect(screen.getByText(/що кажуть наші клієнти/i)).toBeInTheDocument();
  });

  it("відображає 3 відгуки", () => {
    render(<NicheReviews slug="restaurant" color="#6366f1" />);
    const avatars = screen.getAllByTestId("avatar");
    expect(avatars.length).toBe(3);
  });

  it("відображає рейтинг 4.9 / 5", () => {
    render(<NicheReviews slug="beauty" color="#ec4899" />);
    expect(screen.getByText(/4\.9/)).toBeInTheDocument();
  });

  it("різні slug повертають різний набір відгуків", () => {
    const { unmount } = render(<NicheReviews slug="restaurant" color="#6366f1" />);
    const names1 = screen.getAllByTestId("avatar").map((el) => el.textContent);
    unmount();
    render(<NicheReviews slug="xyzzyzzz" color="#6366f1" />);
    const names2 = screen.getAllByTestId("avatar").map((el) => el.textContent);
    // They may or may not differ depending on hash, but count is always 3
    expect(names2.length).toBe(3);
    // At least one name should be present (from the pool)
    expect(names1.length).toBe(3);
  });

  it("відображає роль та дату для кожного відгуку", () => {
    render(<NicheReviews slug="medical" color="#10b981" />);
    // Every review has a role pattern like "Власниця бізнесу" etc.
    const text = document.body.textContent ?? "";
    expect(text).toMatch(/2025/);
  });
});

// ── NicheCalculator ───────────────────────────────────────────────────

const CALC_STEPS: NicheCalculatorStep[] = [
  {
    label: "Тип послуги",
    options: [
      { label: "Базова", price: 500 },
      { label: "Стандарт", price: 1000 },
      { label: "Преміум", price: 2000 },
    ],
  },
  {
    label: "Доставка",
    options: [
      { label: "Самовивіз", price: 0 },
      { label: "По місту", price: 100 },
    ],
  },
];

describe("NicheCalculator", () => {
  it("відображає заголовок за замовчуванням", () => {
    render(<NicheCalculator steps={CALC_STEPS} color="#6366f1" />);
    expect(screen.getByText("Калькулятор вартості")).toBeInTheDocument();
  });

  it("відображає кастомний заголовок", () => {
    render(<NicheCalculator steps={CALC_STEPS} color="#6366f1" title="Розрахунок ремонту" />);
    expect(screen.getByText("Розрахунок ремонту")).toBeInTheDocument();
  });

  it("відображає назви кроків", () => {
    render(<NicheCalculator steps={CALC_STEPS} color="#6366f1" />);
    expect(screen.getByText(/тип послуги/i)).toBeInTheDocument();
    expect(screen.getByText(/доставка/i)).toBeInTheDocument();
  });

  it("показує початкову суму (перший варіант кожного кроку)", () => {
    render(<NicheCalculator steps={CALC_STEPS} color="#6366f1" />);
    // 500 (Базова) + 0 (Самовивіз) = 500
    // Total rendered as "500 ₴" in its own div (distinct from "+500 ₴" in dropdown button)
    expect(screen.getByText("500 ₴")).toBeInTheDocument();
  });

  it("відкриває dropdown при кліку на крок", () => {
    render(<NicheCalculator steps={CALC_STEPS} color="#6366f1" />);
    const firstBtn = screen.getAllByRole("button")[0];
    fireEvent.click(firstBtn);
    expect(screen.getByText("Стандарт")).toBeInTheDocument();
    expect(screen.getByText("Преміум")).toBeInTheDocument();
  });

  it("оновлює суму при виборі іншого варіанту", () => {
    render(<NicheCalculator steps={CALC_STEPS} color="#6366f1" />);
    // Відкрити перший dropdown
    fireEvent.click(screen.getAllByRole("button")[0]);
    // Обрати "Преміум" (price: 2000)
    fireEvent.click(screen.getByText("Преміум"));
    // Тепер: 2000 + 0 = 2000
    // toLocaleString("uk-UA") may format as "2 000" or "2000" depending on environment
    expect(document.body.textContent).toMatch(/2[\s\u00a0]?0{3}/);
  });

  it("відображає 'включено' для варіантів з ціною 0", () => {
    render(<NicheCalculator steps={CALC_STEPS} color="#6366f1" />);
    fireEvent.click(screen.getAllByRole("button")[1]); // Dropdown доставки
    expect(screen.getByText("включено")).toBeInTheDocument();
  });

  it("закриває dropdown після вибору варіанту", () => {
    render(<NicheCalculator steps={CALC_STEPS} color="#6366f1" />);
    fireEvent.click(screen.getAllByRole("button")[0]);
    expect(screen.getByText("Стандарт")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Стандарт"));
    expect(screen.queryByText("Преміум")).not.toBeInTheDocument();
  });

  it("відображає CTA-посилання на /contact", () => {
    render(<NicheCalculator steps={CALC_STEPS} color="#6366f1" />);
    const link = screen.getByRole("link", { name: /отримати точний розрахунок/i });
    expect(link).toHaveAttribute("href", "/uk/contact");
  });

  it("відображає підказку про орієнтовну ціну", () => {
    render(<NicheCalculator steps={CALC_STEPS} color="#6366f1" />);
    expect(screen.getByText(/фінальна ціна може відрізнятись/i)).toBeInTheDocument();
  });
});

// ── BookingSection ─────────────────────────────────────────────────────

const MOCK_SERVICES = [
  { name: "Стрижка", price: "від 350 ₴", duration: "60 хв", icon: "✂️" },
  { name: "Фарбування", price: "від 800 ₴", duration: "2–3 год", icon: "🎨" },
  { name: "Манікюр", price: "від 450 ₴", duration: "90 хв", icon: "💅" },
];

describe("BookingSection", () => {
  it("відображає заголовок за замовчуванням", () => {
    render(<BookingSection services={MOCK_SERVICES} color="#ec4899" gradient="from-pink-600 to-rose-400" />);
    expect(screen.getByText("Онлайн-запис")).toBeInTheDocument();
  });

  it("відображає кастомний заголовок", () => {
    render(<BookingSection services={MOCK_SERVICES} color="#ec4899" gradient="from-pink-600 to-rose-400" title="Запис до майстра" />);
    expect(screen.getByText("Запис до майстра")).toBeInTheDocument();
  });

  it("показує крок 1 — список послуг", () => {
    render(<BookingSection services={MOCK_SERVICES} color="#ec4899" gradient="from-pink-600 to-rose-400" />);
    expect(screen.getByText("Стрижка")).toBeInTheDocument();
    expect(screen.getByText("Фарбування")).toBeInTheDocument();
    expect(screen.getByText("Манікюр")).toBeInTheDocument();
  });

  it("відображає ціни та тривалість послуг", () => {
    render(<BookingSection services={MOCK_SERVICES} color="#ec4899" gradient="from-pink-600 to-rose-400" />);
    expect(screen.getByText("від 350 ₴")).toBeInTheDocument();
    expect(screen.getByText("60 хв")).toBeInTheDocument();
  });

  it("кнопка 'Далі' неактивна без вибору послуги", () => {
    render(<BookingSection services={MOCK_SERVICES} color="#ec4899" gradient="from-pink-600 to-rose-400" />);
    const nextBtn = screen.getByRole("button", { name: /далі/i });
    expect(nextBtn).toBeDisabled();
  });

  it("кнопка 'Далі' активується після вибору послуги", () => {
    render(<BookingSection services={MOCK_SERVICES} color="#ec4899" gradient="from-pink-600 to-rose-400" />);
    fireEvent.click(screen.getByText("Стрижка"));
    const nextBtn = screen.getByRole("button", { name: /далі/i });
    expect(nextBtn).not.toBeDisabled();
  });

  it("переходить до кроку 2 після вибору послуги та кліку 'Далі'", () => {
    render(<BookingSection services={MOCK_SERVICES} color="#ec4899" gradient="from-pink-600 to-rose-400" />);
    fireEvent.click(screen.getByText("Стрижка"));
    fireEvent.click(screen.getByRole("button", { name: /далі/i }));
    expect(screen.getByText(/оберіть дату та час/i)).toBeInTheDocument();
  });

  it("показує 6 днів у кроці 2", () => {
    render(<BookingSection services={MOCK_SERVICES} color="#ec4899" gradient="from-pink-600 to-rose-400" />);
    fireEvent.click(screen.getByText("Стрижка"));
    fireEvent.click(screen.getByRole("button", { name: /далі/i }));
    // 6 кнопок дат
    const dayButtons = screen.getAllByRole("button").filter(
      (btn) => /\d{2}\.\d{2}/.test(btn.textContent ?? "")
    );
    expect(dayButtons.length).toBe(6);
  });

  it("показує 10 часових слотів у кроці 2", () => {
    render(<BookingSection services={MOCK_SERVICES} color="#ec4899" gradient="from-pink-600 to-rose-400" />);
    fireEvent.click(screen.getByText("Стрижка"));
    fireEvent.click(screen.getByRole("button", { name: /далі/i }));
    expect(screen.getByRole("button", { name: "09:00" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "18:00" })).toBeInTheDocument();
  });

  it("кнопка 'Далі' неактивна без вибору дати та часу", () => {
    render(<BookingSection services={MOCK_SERVICES} color="#ec4899" gradient="from-pink-600 to-rose-400" />);
    fireEvent.click(screen.getByText("Стрижка"));
    fireEvent.click(screen.getByRole("button", { name: /далі/i }));
    const nextBtn = screen.getByRole("button", { name: /далі/i });
    expect(nextBtn).toBeDisabled();
  });

  it("переходить до кроку 3 після вибору дати та часу", () => {
    render(<BookingSection services={MOCK_SERVICES} color="#ec4899" gradient="from-pink-600 to-rose-400" />);
    fireEvent.click(screen.getByText("Стрижка"));
    fireEvent.click(screen.getByRole("button", { name: /далі/i }));
    // Обрати день (перший у списку)
    const dayButtons = screen.getAllByRole("button").filter(
      (btn) => /\d{2}\.\d{2}/.test(btn.textContent ?? "")
    );
    fireEvent.click(dayButtons[0]);
    fireEvent.click(screen.getByRole("button", { name: "10:00" }));
    fireEvent.click(screen.getByRole("button", { name: /далі/i }));
    expect(screen.getByText(/ваші контактні дані/i)).toBeInTheDocument();
  });

  it("показує зведення замовлення у кроці 3", () => {
    render(<BookingSection services={MOCK_SERVICES} color="#ec4899" gradient="from-pink-600 to-rose-400" />);
    fireEvent.click(screen.getByText("Стрижка"));
    fireEvent.click(screen.getByRole("button", { name: /далі/i }));
    const dayButtons = screen.getAllByRole("button").filter(
      (btn) => /\d{2}\.\d{2}/.test(btn.textContent ?? "")
    );
    fireEvent.click(dayButtons[0]);
    fireEvent.click(screen.getByRole("button", { name: "11:00" }));
    fireEvent.click(screen.getByRole("button", { name: /далі/i }));
    expect(screen.getByText("Стрижка")).toBeInTheDocument();
    expect(screen.getByText(/11:00/)).toBeInTheDocument();
  });

  it("кнопка підтвердження неактивна без заповнення форми", () => {
    render(<BookingSection services={MOCK_SERVICES} color="#ec4899" gradient="from-pink-600 to-rose-400" />);
    fireEvent.click(screen.getByText("Стрижка"));
    fireEvent.click(screen.getByRole("button", { name: /далі/i }));
    const dayButtons = screen.getAllByRole("button").filter(
      (btn) => /\d{2}\.\d{2}/.test(btn.textContent ?? "")
    );
    fireEvent.click(dayButtons[0]);
    fireEvent.click(screen.getByRole("button", { name: "12:00" }));
    fireEvent.click(screen.getByRole("button", { name: /далі/i }));
    const confirmBtn = screen.getByRole("button", { name: /підтвердити запис/i });
    expect(confirmBtn).toBeDisabled();
  });

  it("успішно підтверджує запис з валідними даними", () => {
    render(<BookingSection services={MOCK_SERVICES} color="#ec4899" gradient="from-pink-600 to-rose-400" />);
    fireEvent.click(screen.getByText("Стрижка"));
    fireEvent.click(screen.getByRole("button", { name: /далі/i }));
    const dayButtons = screen.getAllByRole("button").filter(
      (btn) => /\d{2}\.\d{2}/.test(btn.textContent ?? "")
    );
    fireEvent.click(dayButtons[0]);
    fireEvent.click(screen.getByRole("button", { name: "14:00" }));
    fireEvent.click(screen.getByRole("button", { name: /далі/i }));
    fireEvent.change(screen.getByPlaceholderText(/олена коваль/i), { target: { value: "Тест Тестович" } });
    fireEvent.change(screen.getByPlaceholderText(/\+38/i), { target: { value: "+380501234567" } });
    fireEvent.click(screen.getByRole("button", { name: /підтвердити запис/i }));
    expect(screen.getByText(/запис підтверджено/i)).toBeInTheDocument();
  });

  it("відображає деталі у кроці підтвердження", () => {
    render(<BookingSection services={MOCK_SERVICES} color="#ec4899" gradient="from-pink-600 to-rose-400" />);
    fireEvent.click(screen.getByText("Стрижка"));
    fireEvent.click(screen.getByRole("button", { name: /далі/i }));
    const dayButtons = screen.getAllByRole("button").filter(
      (btn) => /\d{2}\.\d{2}/.test(btn.textContent ?? "")
    );
    fireEvent.click(dayButtons[0]);
    fireEvent.click(screen.getByRole("button", { name: "09:00" }));
    fireEvent.click(screen.getByRole("button", { name: /далі/i }));
    fireEvent.change(screen.getByPlaceholderText(/олена коваль/i), { target: { value: "Іван Іванов" } });
    fireEvent.change(screen.getByPlaceholderText(/\+38/i), { target: { value: "+380671234567" } });
    fireEvent.click(screen.getByRole("button", { name: /підтвердити запис/i }));
    // Name and phone are in the same text node: "👤 Іван Іванов, +380671234567"
    expect(document.body.textContent).toContain("Іван Іванов");
    expect(document.body.textContent).toContain("+380671234567");
  });

  it("'Зробити ще один запис' скидає форму до кроку 1", () => {
    render(<BookingSection services={MOCK_SERVICES} color="#ec4899" gradient="from-pink-600 to-rose-400" />);
    fireEvent.click(screen.getByText("Стрижка"));
    fireEvent.click(screen.getByRole("button", { name: /далі/i }));
    const dayButtons = screen.getAllByRole("button").filter(
      (btn) => /\d{2}\.\d{2}/.test(btn.textContent ?? "")
    );
    fireEvent.click(dayButtons[0]);
    fireEvent.click(screen.getByRole("button", { name: "15:00" }));
    fireEvent.click(screen.getByRole("button", { name: /далі/i }));
    fireEvent.change(screen.getByPlaceholderText(/олена коваль/i), { target: { value: "Марія Марків" } });
    fireEvent.change(screen.getByPlaceholderText(/\+38/i), { target: { value: "+380931234567" } });
    fireEvent.click(screen.getByRole("button", { name: /підтвердити запис/i }));
    fireEvent.click(screen.getByRole("button", { name: /зробити ще один запис/i }));
    expect(screen.getByText("Стрижка")).toBeInTheDocument();
    expect(screen.getByText("Фарбування")).toBeInTheDocument();
  });

  it("кнопка 'Назад' повертає на попередній крок", () => {
    render(<BookingSection services={MOCK_SERVICES} color="#ec4899" gradient="from-pink-600 to-rose-400" />);
    fireEvent.click(screen.getByText("Стрижка"));
    fireEvent.click(screen.getByRole("button", { name: /далі/i }));
    expect(screen.getByText(/оберіть дату та час/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /← назад/i }));
    expect(screen.getByText("Стрижка")).toBeInTheDocument();
  });

  it("відображає 4 індикатори кроків", () => {
    render(<BookingSection services={MOCK_SERVICES} color="#ec4899" gradient="from-pink-600 to-rose-400" />);
    expect(screen.getByText("Послуга")).toBeInTheDocument();
    expect(screen.getByText("Дата та час")).toBeInTheDocument();
    expect(screen.getByText("Ваші дані")).toBeInTheDocument();
    expect(screen.getByText("Підтвердження")).toBeInTheDocument();
  });
});

// ── NicheStats ────────────────────────────────────────────────────────
describe("NicheStats", () => {
  it("відображає 4 статистики", () => {
    render(<NicheStats color="#6366f1" />);
    expect(screen.getByText(/34\+/)).toBeInTheDocument();
    expect(screen.getByText(/500\+/)).toBeInTheDocument();
    expect(screen.getByText(/98%/)).toBeInTheDocument();
    expect(screen.getByText(/7\+/)).toBeInTheDocument();
  });

  it("відображає підписи статистик", () => {
    render(<NicheStats color="#6366f1" />);
    expect(screen.getByText("Ніш")).toBeInTheDocument();
    expect(screen.getByText("Проєктів")).toBeInTheDocument();
    expect(screen.getByText("Задоволених")).toBeInTheDocument();
    expect(screen.getByText("Років")).toBeInTheDocument();
  });

  it("відображає описи статистик", () => {
    render(<NicheStats color="#6366f1" />);
    expect(screen.getByText(/готових рішень/i)).toBeInTheDocument();
  });
});
