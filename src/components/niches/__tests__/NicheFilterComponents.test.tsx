/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { PropertyFilter } from "../PropertyFilter";
import { PricingToggle } from "../PricingToggle";
import { BMICalculator } from "../BMICalculator";
import { MenuFilter } from "../MenuFilter";
import { ProductCatalog } from "../ProductCatalog";
import { CourseFilter } from "../CourseFilter";
import { ScheduleFilter } from "../ScheduleFilter";
import type {
  NichePropertyListing,
  NichePricingPlan,
  NicheMenuItem,
  NicheProductCard,
  NicheCourseCard,
  NicheScheduleItem,
} from "@/lib/data/niches";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...rest}>{children}</a>
  ),
}));

jest.mock("lucide-react", () => ({
  Check: () => <span data-testid="icon-check">✓</span>,
  X: () => <span data-testid="icon-x">✗</span>,
}));

// ── Mock data ─────────────────────────────────────────────────────────

const LISTINGS: NichePropertyListing[] = [
  {
    id: "1",
    type: "Квартира",
    title: "2-кімнатна на Печерську",
    district: "Печерськ",
    area: "65 м²",
    rooms: 2,
    floor: "5/9",
    price: "120 000 $",
    gradient: "from-blue-500 to-indigo-600",
    icon: "🏢",
    tags: ["Новобудова"],
  },
  {
    id: "2",
    type: "Будинок",
    title: "Котедж у Бучі",
    district: "Буча",
    area: "180 м²",
    rooms: 4,
    price: "250 000 $",
    gradient: "from-green-500 to-emerald-600",
    icon: "🏡",
    badge: "Хіт",
    badgeColor: "bg-orange-600",
  },
  {
    id: "3",
    type: "Комерція",
    title: "Офіс на Хрещатику",
    district: "Центр",
    area: "120 м²",
    price: "180 000 $",
    gradient: "from-purple-500 to-violet-600",
    icon: "🏬",
  },
  {
    id: "4",
    type: "Квартира",
    title: "3-кімнатна на Оболоні",
    district: "Оболонь",
    area: "90 м²",
    rooms: 3,
    floor: "8/12",
    price: "95 000 $",
    gradient: "from-sky-500 to-blue-600",
    icon: "🏠",
  },
];

const PLANS: NichePricingPlan[] = [
  {
    name: "Старт",
    description: "Для малого бізнесу",
    price: "1 000 ₴",
    period: "/міс",
    highlighted: false,
    features: [
      { text: "5 користувачів", included: true },
      { text: "Аналітика", included: false },
    ],
  },
  {
    name: "Бізнес",
    description: "Для середнього бізнесу",
    price: "2 500 ₴",
    period: "/міс",
    highlighted: true,
    features: [
      { text: "Необмежено користувачів", included: true },
      { text: "Аналітика", included: true },
    ],
  },
  {
    name: "Корпорат",
    description: "Для великих компаній",
    price: "5 000 ₴",
    period: "/міс",
    highlighted: false,
    features: [
      { text: "Необмежено користувачів", included: true },
      { text: "Пріоритетна підтримка", included: true },
    ],
  },
];

const MENU_ITEMS: NicheMenuItem[] = [
  {
    id: "m1",
    name: "Борщ",
    category: "Супи",
    description: "Класичний борщ",
    price: "95 ₴",
    icon: "🍲",
    gradient: "from-red-500 to-orange-600",
    weight: "350 г",
    calories: "180 ккал",
    tags: ["Веганське"],
  },
  {
    id: "m2",
    name: "Стейк",
    category: "М'ясо",
    description: "Яловичий стейк",
    price: "450 ₴",
    icon: "🥩",
    gradient: "from-orange-500 to-red-600",
    badge: "Хіт",
    badgeColor: "bg-red-600",
  },
  {
    id: "m3",
    name: "Овочевий рулет",
    category: "Закуски",
    description: "Свіжі овочі",
    price: "120 ₴",
    icon: "🥗",
    gradient: "from-green-500 to-lime-600",
    tags: ["Веганське", "Вегетаріанське", "Без глютену"],
  },
  {
    id: "m4",
    name: "Гострий суп",
    category: "Супи",
    description: "Суп по-азійськи",
    price: "110 ₴",
    icon: "🌶️",
    gradient: "from-yellow-500 to-orange-600",
    tags: ["Гостре"],
  },
];

const PRODUCTS: NicheProductCard[] = [
  {
    id: "p1",
    name: "Сукня весняна",
    category: "Сукні",
    price: "1 200 ₴",
    icon: "👗",
    gradient: "from-pink-500 to-rose-600",
    sizes: ["XS", "S", "M"],
    badge: "NEW",
    badgeColor: "bg-indigo-600",
    tags: ["Весна"],
  },
  {
    id: "p2",
    name: "Джинси slim",
    category: "Джинси",
    price: "890 ₴",
    originalPrice: "1 100 ₴",
    icon: "👖",
    gradient: "from-blue-500 to-indigo-600",
    sizes: ["30", "32", "34"],
    badge: "SALE",
    badgeColor: "bg-red-600",
  },
  {
    id: "p3",
    name: "Блуза з принтом",
    category: "Блузи",
    price: "650 ₴",
    icon: "👚",
    gradient: "from-violet-500 to-purple-600",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "p4",
    name: "Сукня вечірня",
    category: "Сукні",
    price: "2 400 ₴",
    icon: "🌹",
    gradient: "from-rose-500 to-pink-600",
    sizes: ["XS", "S", "M", "L"],
    badge: "Bestseller",
    badgeColor: "bg-amber-600",
  },
];

const COURSES: NicheCourseCard[] = [
  {
    id: "c1",
    title: "Англійська для початківців",
    category: "Англійська",
    level: "Початківець",
    duration: "3 місяці",
    instructor: "Анна Коваль",
    rating: "4.8",
    lessonsCount: 36,
    studentsCount: "1 200+",
    price: "2 900 ₴",
    icon: "🇬🇧",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    id: "c2",
    title: "Німецька B1",
    category: "Німецька",
    level: "Середній",
    duration: "4 місяці",
    instructor: "Ганс Мюллер",
    rating: "4.7",
    lessonsCount: 48,
    studentsCount: "560+",
    price: "3 500 ₴",
    icon: "🇩🇪",
    gradient: "from-yellow-500 to-orange-600",
    badge: "Хіт",
    badgeColor: "bg-orange-600",
  },
  {
    id: "c3",
    title: "Англійська Advanced",
    category: "Англійська",
    level: "Просунутий",
    duration: "6 місяців",
    instructor: "Джон Сміт",
    rating: "4.9",
    lessonsCount: 60,
    studentsCount: "320+",
    price: "5 200 ₴",
    originalPrice: "6 000 ₴",
    icon: "🎓",
    gradient: "from-indigo-500 to-violet-600",
  },
];

const SCHEDULE: NicheScheduleItem[] = [
  {
    id: "s1",
    title: "Йога для початківців",
    category: "Йога",
    day: "Понеділок",
    time: "09:00",
    duration: "60 хв",
    trainer: "Марія Лис",
    spots: 15,
    spotsLeft: 8,
    icon: "🧘",
    gradient: "from-teal-500 to-green-500",
  },
  {
    id: "s2",
    title: "Силове тренування",
    category: "Силові",
    day: "Середа",
    time: "18:00",
    duration: "45 хв",
    trainer: "Олег Марченко",
    spots: 20,
    spotsLeft: 2,
    icon: "💪",
    gradient: "from-orange-500 to-red-500",
    badge: "Хіт",
    badgeColor: "bg-orange-600",
  },
  {
    id: "s3",
    title: "Пілатес",
    category: "Йога",
    day: "П'ятниця",
    time: "10:00",
    duration: "50 хв",
    trainer: "Олена Дяченко",
    spots: 12,
    spotsLeft: 0,
    icon: "🤸",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    id: "s4",
    title: "Кардіо",
    category: "Кардіо",
    day: "Понеділок",
    time: "07:00",
    duration: "40 хв",
    trainer: "Ірина Петренко",
    spots: 25,
    spotsLeft: 20,
    icon: "🏃",
    gradient: "from-blue-500 to-cyan-500",
  },
];

// ── PropertyFilter ─────────────────────────────────────────────────────

describe("PropertyFilter", () => {
  it("відображає всі оголошення без фільтрів", () => {
    render(<PropertyFilter listings={LISTINGS} lang="uk" color="#6366f1" />);
    expect(screen.getByText("2-кімнатна на Печерську")).toBeInTheDocument();
    expect(screen.getByText("Котедж у Бучі")).toBeInTheDocument();
    expect(screen.getByText("Офіс на Хрещатику")).toBeInTheDocument();
    expect(screen.getByText("3-кімнатна на Оболоні")).toBeInTheDocument();
  });

  it("показує фільтри типу: Всі, Квартира, Будинок, Комерція", () => {
    render(<PropertyFilter listings={LISTINGS} lang="uk" color="#6366f1" />);
    expect(screen.getByRole("button", { name: "Всі" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Квартира" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Будинок" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Комерція" })).toBeInTheDocument();
  });

  it("фільтрує за типом Квартира", () => {
    render(<PropertyFilter listings={LISTINGS} lang="uk" color="#6366f1" />);
    fireEvent.click(screen.getByRole("button", { name: "Квартира" }));
    expect(screen.getByText("2-кімнатна на Печерську")).toBeInTheDocument();
    expect(screen.getByText("3-кімнатна на Оболоні")).toBeInTheDocument();
    expect(screen.queryByText("Котедж у Бучі")).not.toBeInTheDocument();
    expect(screen.queryByText("Офіс на Хрещатику")).not.toBeInTheDocument();
  });

  it("фільтрує за типом Будинок", () => {
    render(<PropertyFilter listings={LISTINGS} lang="uk" color="#6366f1" />);
    fireEvent.click(screen.getByRole("button", { name: "Будинок" }));
    expect(screen.getByText("Котедж у Бучі")).toBeInTheDocument();
    expect(screen.queryByText("2-кімнатна на Печерську")).not.toBeInTheDocument();
  });

  it("фільтрує за кількістю кімнат 2", () => {
    render(<PropertyFilter listings={LISTINGS} lang="uk" color="#6366f1" />);
    fireEvent.click(screen.getByRole("button", { name: "2" }));
    expect(screen.getByText("2-кімнатна на Печерську")).toBeInTheDocument();
    expect(screen.queryByText("3-кімнатна на Оболоні")).not.toBeInTheDocument();
  });

  it("фільтр 4+ показує 4-кімнатні і більше", () => {
    render(<PropertyFilter listings={LISTINGS} lang="uk" color="#6366f1" />);
    fireEvent.click(screen.getByRole("button", { name: "4+" }));
    expect(screen.getByText("Котедж у Бучі")).toBeInTheDocument();
    expect(screen.queryByText("2-кімнатна на Печерську")).not.toBeInTheDocument();
  });

  it("порожній стан + кнопка скидання фільтрів", () => {
    render(<PropertyFilter listings={LISTINGS} lang="uk" color="#6366f1" />);
    // Filter Комерція + rooms 1 → no match
    fireEvent.click(screen.getByRole("button", { name: "Комерція" }));
    fireEvent.click(screen.getByRole("button", { name: "1" }));
    expect(screen.getByText(/нічого не знайдено/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /скинути фільтри/i }));
    // After reset all listings visible
    expect(screen.getByText("2-кімнатна на Печерську")).toBeInTheDocument();
  });

  it("показує кількість знайдених об'єктів", () => {
    render(<PropertyFilter listings={LISTINGS} lang="uk" color="#6366f1" />);
    expect(screen.getByText(/знайдено об'єктів: 4/i)).toBeInTheDocument();
  });

  it("EN locale: показує фільтри англійською", () => {
    render(<PropertyFilter listings={LISTINGS} lang="en" color="#6366f1" />);
    expect(screen.getByRole("button", { name: "All" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Apartment" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "House" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Commercial" })).toBeInTheDocument();
  });

  it("EN locale: фільтр Apartment фільтрує за типом Квартира в даних", () => {
    render(<PropertyFilter listings={LISTINGS} lang="en" color="#6366f1" />);
    fireEvent.click(screen.getByRole("button", { name: "Apartment" }));
    expect(screen.getByText("2-кімнатна на Печерську")).toBeInTheDocument();
    expect(screen.queryByText("Котедж у Бучі")).not.toBeInTheDocument();
  });

  it("відображає ціну та район кожного оголошення", () => {
    render(<PropertyFilter listings={LISTINGS} lang="uk" color="#6366f1" />);
    expect(screen.getByText("120 000 $")).toBeInTheDocument();
    expect(screen.getAllByText(/Печерськ/).length).toBeGreaterThan(0);
  });
});

// ── PricingToggle ──────────────────────────────────────────────────────

describe("PricingToggle", () => {
  it("відображає назви тарифів", () => {
    render(<PricingToggle plans={PLANS} lang="uk" color="#6366f1" />);
    expect(screen.getByText("Старт")).toBeInTheDocument();
    expect(screen.getByText("Бізнес")).toBeInTheDocument();
    expect(screen.getByText("Корпорат")).toBeInTheDocument();
  });

  it("за замовчуванням показує місячні ціни", () => {
    render(<PricingToggle plans={PLANS} lang="uk" color="#6366f1" />);
    expect(screen.getAllByText("1 000 ₴").length).toBeGreaterThanOrEqual(1);
  });

  it("перемикач має role=switch і aria-checked=false за замовчуванням", () => {
    render(<PricingToggle plans={PLANS} lang="uk" color="#6366f1" />);
    const toggle = screen.getByRole("switch");
    expect(toggle).toHaveAttribute("aria-checked", "false");
  });

  it("клік на перемикач перемикає на річну підписку", () => {
    render(<PricingToggle plans={PLANS} lang="uk" color="#6366f1" />);
    fireEvent.click(screen.getByRole("switch"));
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
  });

  it("при річній підписці ціна 1000 стає 800 (×0.8)", () => {
    render(<PricingToggle plans={PLANS} lang="uk" color="#6366f1" />);
    fireEvent.click(screen.getByRole("switch"));
    // 1000 * 0.8 = 800
    expect(document.body.textContent).toMatch(/800/);
  });

  it("показує -20% на badge річної підписки", () => {
    render(<PricingToggle plans={PLANS} lang="uk" color="#6366f1" />);
    expect(screen.getByText("−20%")).toBeInTheDocument();
  });

  it("виділений план має бейдж 'Найпопулярніший'", () => {
    render(<PricingToggle plans={PLANS} lang="uk" color="#6366f1" />);
    expect(screen.getByText("Найпопулярніший")).toBeInTheDocument();
  });

  it("відображає фічі з іконками check/x", () => {
    render(<PricingToggle plans={PLANS} lang="uk" color="#6366f1" />);
    expect(screen.getAllByTestId("icon-check").length).toBeGreaterThan(0);
    expect(screen.getAllByTestId("icon-x").length).toBeGreaterThan(0);
  });

  it("показує підказку про орієнтовні ціни", () => {
    render(<PricingToggle plans={PLANS} lang="uk" color="#6366f1" />);
    expect(screen.getByText(/ціни орієнтовні/i)).toBeInTheDocument();
  });

  it("EN locale: toggle має лейбл Yearly/Monthly", () => {
    render(<PricingToggle plans={PLANS} lang="en" color="#6366f1" />);
    expect(screen.getByText("Monthly")).toBeInTheDocument();
    expect(screen.getByText("Yearly")).toBeInTheDocument();
  });

  it("EN locale: виділений план має бейдж 'Most Popular'", () => {
    render(<PricingToggle plans={PLANS} lang="en" color="#6366f1" />);
    expect(screen.getByText("Most Popular")).toBeInTheDocument();
  });

  it("при річній підписці відображає річну вартість", () => {
    render(<PricingToggle plans={PLANS} lang="uk" color="#6366f1" />);
    fireEvent.click(screen.getByRole("switch"));
    // 800 * 12 = 9600 → shown as "9 600 ₴ / рік" (uk-UA locale may format with space)
    expect(document.body.textContent).toMatch(/9[\s\u00a0]?600/);
  });

  it("посилання у кожному плані веде на /uk/contact", () => {
    render(<PricingToggle plans={PLANS} lang="uk" color="#6366f1" />);
    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link).toHaveAttribute("href", "/uk/contact");
    });
  });
});

// ── BMICalculator ──────────────────────────────────────────────────────

describe("BMICalculator", () => {
  it("відображає заголовок 'Калькулятор ІМТ'", () => {
    render(<BMICalculator lang="uk" color="#22c55e" />);
    expect(screen.getByText("Калькулятор ІМТ")).toBeInTheDocument();
  });

  it("EN locale: заголовок 'BMI Calculator'", () => {
    render(<BMICalculator lang="en" color="#22c55e" />);
    expect(screen.getByText("BMI Calculator")).toBeInTheDocument();
  });

  it("показує підказку до введення даних", () => {
    render(<BMICalculator lang="uk" color="#22c55e" />);
    expect(screen.getByText(/введіть вагу та зріст/i)).toBeInTheDocument();
  });

  it("показує поля для ваги та зросту", () => {
    render(<BMICalculator lang="uk" color="#22c55e" />);
    expect(screen.getByPlaceholderText(/напр\. 75/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/напр\. 175/i)).toBeInTheDocument();
  });

  it("розраховує ІМТ: 70 кг / 175 см → ~22.9 (Нормальна вага)", () => {
    render(<BMICalculator lang="uk" color="#22c55e" />);
    fireEvent.change(screen.getByPlaceholderText(/напр\. 75/i), { target: { value: "70" } });
    fireEvent.change(screen.getByPlaceholderText(/напр\. 175/i), { target: { value: "175" } });
    expect(screen.getByText(/22\.9/)).toBeInTheDocument();
    expect(screen.getAllByText("Нормальна вага").length).toBeGreaterThan(0);
  });

  it("розраховує ІМТ: 50 кг / 175 см → ~16.3 (Недостатня вага)", () => {
    render(<BMICalculator lang="uk" color="#22c55e" />);
    fireEvent.change(screen.getByPlaceholderText(/напр\. 75/i), { target: { value: "50" } });
    fireEvent.change(screen.getByPlaceholderText(/напр\. 175/i), { target: { value: "175" } });
    // Недостатня вага appears in both result + legend — just confirm it's there
    expect(screen.getAllByText("Недостатня вага").length).toBeGreaterThan(0);
    // BMI ≈ 16.3
    expect(screen.getByText(/16\.[0-9]/)).toBeInTheDocument();
  });

  it("розраховує ІМТ: 85 кг / 170 см → ~29.4 (Надмірна вага)", () => {
    render(<BMICalculator lang="uk" color="#22c55e" />);
    fireEvent.change(screen.getByPlaceholderText(/напр\. 75/i), { target: { value: "85" } });
    fireEvent.change(screen.getByPlaceholderText(/напр\. 175/i), { target: { value: "170" } });
    expect(screen.getAllByText("Надмірна вага").length).toBeGreaterThan(0);
    // BMI = 85 / (1.7)^2 = 29.4 — shown in result card (not legend range "25 – 29.9")
    expect(screen.getByText("29.4")).toBeInTheDocument();
  });

  it("розраховує ІМТ: 95 кг / 170 см → ~32.9 (Ожиріння I ступеня)", () => {
    render(<BMICalculator lang="uk" color="#22c55e" />);
    fireEvent.change(screen.getByPlaceholderText(/напр\. 75/i), { target: { value: "95" } });
    fireEvent.change(screen.getByPlaceholderText(/напр\. 175/i), { target: { value: "170" } });
    expect(screen.getAllByText("Ожиріння I ступеня").length).toBeGreaterThan(0);
  });

  it("розраховує ІМТ: 130 кг / 170 см → ~45 (Ожиріння II+ ступеня)", () => {
    render(<BMICalculator lang="uk" color="#22c55e" />);
    fireEvent.change(screen.getByPlaceholderText(/напр\. 75/i), { target: { value: "130" } });
    fireEvent.change(screen.getByPlaceholderText(/напр\. 175/i), { target: { value: "170" } });
    expect(screen.getAllByText("Ожиріння II+ ступеня").length).toBeGreaterThan(0);
  });

  it("відображає легенду з 5 категоріями ІМТ", () => {
    render(<BMICalculator lang="uk" color="#22c55e" />);
    expect(screen.getByText("Недостатня вага")).toBeInTheDocument();
    expect(screen.getByText("Нормальна вага")).toBeInTheDocument();
    expect(screen.getByText("Надмірна вага")).toBeInTheDocument();
    expect(screen.getByText("Ожиріння I ступеня")).toBeInTheDocument();
    expect(screen.getByText("Ожиріння II+ ступеня")).toBeInTheDocument();
  });

  it("показує підказку (tip) після розрахунку", () => {
    render(<BMICalculator lang="uk" color="#22c55e" />);
    fireEvent.change(screen.getByPlaceholderText(/напр\. 75/i), { target: { value: "70" } });
    fireEvent.change(screen.getByPlaceholderText(/напр\. 175/i), { target: { value: "175" } });
    expect(screen.getByText(/підтримуйте поточний ритм/i)).toBeInTheDocument();
  });

  it("показує застереження про орієнтовність ІМТ", () => {
    render(<BMICalculator lang="uk" color="#22c55e" />);
    expect(screen.getByText(/орієнтовний показник/i)).toBeInTheDocument();
  });
});

// ── MenuFilter ─────────────────────────────────────────────────────────

describe("MenuFilter", () => {
  it("відображає всі страви без фільтрів", () => {
    render(<MenuFilter items={MENU_ITEMS} lang="uk" color="#f59e0b" />);
    expect(screen.getByText("Борщ")).toBeInTheDocument();
    expect(screen.getByText("Стейк")).toBeInTheDocument();
    expect(screen.getByText("Овочевий рулет")).toBeInTheDocument();
    expect(screen.getByText("Гострий суп")).toBeInTheDocument();
  });

  it("відображає унікальні категорії як чіпи", () => {
    render(<MenuFilter items={MENU_ITEMS} lang="uk" color="#f59e0b" />);
    expect(screen.getByRole("button", { name: "Супи" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "М'ясо" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Закуски" })).toBeInTheDocument();
  });

  it("фільтрує за категорією Супи", () => {
    render(<MenuFilter items={MENU_ITEMS} lang="uk" color="#f59e0b" />);
    fireEvent.click(screen.getByRole("button", { name: "Супи" }));
    expect(screen.getByText("Борщ")).toBeInTheDocument();
    expect(screen.getByText("Гострий суп")).toBeInTheDocument();
    expect(screen.queryByText("Стейк")).not.toBeInTheDocument();
  });

  it("відображає дієтичні теги: Веганське, Вегетаріанське, Без глютену, Гостре", () => {
    render(<MenuFilter items={MENU_ITEMS} lang="uk" color="#f59e0b" />);
    expect(screen.getByRole("button", { name: "Веганське" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Вегетаріанське" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Без глютену" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Гостре" })).toBeInTheDocument();
  });

  it("фільтрує за тегом Веганське", () => {
    render(<MenuFilter items={MENU_ITEMS} lang="uk" color="#f59e0b" />);
    fireEvent.click(screen.getByRole("button", { name: "Веганське" }));
    // Борщ та Овочевий рулет мають тег Веганське
    expect(screen.getByText("Борщ")).toBeInTheDocument();
    expect(screen.getByText("Овочевий рулет")).toBeInTheDocument();
    expect(screen.queryByText("Стейк")).not.toBeInTheDocument();
  });

  it("комбінований фільтр: категорія + дієта", () => {
    render(<MenuFilter items={MENU_ITEMS} lang="uk" color="#f59e0b" />);
    fireEvent.click(screen.getByRole("button", { name: "Супи" }));
    fireEvent.click(screen.getByRole("button", { name: "Гостре" }));
    expect(screen.getByText("Гострий суп")).toBeInTheDocument();
    expect(screen.queryByText("Борщ")).not.toBeInTheDocument();
  });

  it("порожній стан коли нічого не знайдено + скидання", () => {
    render(<MenuFilter items={MENU_ITEMS} lang="uk" color="#f59e0b" />);
    fireEvent.click(screen.getByRole("button", { name: "М'ясо" }));
    fireEvent.click(screen.getByRole("button", { name: "Веганське" }));
    expect(screen.getByText(/нічого не знайдено/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /скинути фільтри/i }));
    expect(screen.getByText("Стейк")).toBeInTheDocument();
  });

  it("показує кількість знайдених страв", () => {
    render(<MenuFilter items={MENU_ITEMS} lang="uk" color="#f59e0b" />);
    expect(screen.getByText(/знайдено страв: 4/i)).toBeInTheDocument();
  });

  it("EN locale: дієтичні теги англійською", () => {
    render(<MenuFilter items={MENU_ITEMS} lang="en" color="#f59e0b" />);
    expect(screen.getByRole("button", { name: "Vegan" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Vegetarian" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Gluten-Free" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Spicy" })).toBeInTheDocument();
  });

  it("EN locale: фільтр Vegan фільтрує за тегом Веганське в даних", () => {
    render(<MenuFilter items={MENU_ITEMS} lang="en" color="#f59e0b" />);
    fireEvent.click(screen.getByRole("button", { name: "Vegan" }));
    expect(screen.getByText("Борщ")).toBeInTheDocument();
    expect(screen.queryByText("Стейк")).not.toBeInTheDocument();
  });
});

// ── ProductCatalog ─────────────────────────────────────────────────────

describe("ProductCatalog", () => {
  it("відображає всі товари без фільтра", () => {
    render(<ProductCatalog products={PRODUCTS} lang="uk" color="#ec4899" />);
    expect(screen.getByText("Сукня весняна")).toBeInTheDocument();
    expect(screen.getByText("Джинси slim")).toBeInTheDocument();
    expect(screen.getByText("Блуза з принтом")).toBeInTheDocument();
    expect(screen.getByText("Сукня вечірня")).toBeInTheDocument();
  });

  it("відображає унікальні категорії як чіпи", () => {
    render(<ProductCatalog products={PRODUCTS} lang="uk" color="#ec4899" />);
    expect(screen.getByRole("button", { name: "Сукні" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Джинси" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Блузи" })).toBeInTheDocument();
  });

  it("фільтрує за категорією Сукні", () => {
    render(<ProductCatalog products={PRODUCTS} lang="uk" color="#ec4899" />);
    fireEvent.click(screen.getByRole("button", { name: "Сукні" }));
    expect(screen.getByText("Сукня весняна")).toBeInTheDocument();
    expect(screen.getByText("Сукня вечірня")).toBeInTheDocument();
    expect(screen.queryByText("Джинси slim")).not.toBeInTheDocument();
    expect(screen.queryByText("Блуза з принтом")).not.toBeInTheDocument();
  });

  it("фільтрує за категорією Джинси", () => {
    render(<ProductCatalog products={PRODUCTS} lang="uk" color="#ec4899" />);
    fireEvent.click(screen.getByRole("button", { name: "Джинси" }));
    expect(screen.getByText("Джинси slim")).toBeInTheDocument();
    expect(screen.queryByText("Сукня весняна")).not.toBeInTheDocument();
  });

  it("показує кількість товарів", () => {
    render(<ProductCatalog products={PRODUCTS} lang="uk" color="#ec4899" />);
    expect(screen.getByText(/товарів: 4/i)).toBeInTheDocument();
  });

  it("після фільтрації кількість оновлюється", () => {
    render(<ProductCatalog products={PRODUCTS} lang="uk" color="#ec4899" />);
    fireEvent.click(screen.getByRole("button", { name: "Сукні" }));
    expect(screen.getByText(/товарів: 2/i)).toBeInTheDocument();
  });

  it("відображає розміри товарів", () => {
    render(<ProductCatalog products={PRODUCTS} lang="uk" color="#ec4899" />);
    expect(screen.getAllByText("XS").length).toBeGreaterThan(0);
    expect(screen.getAllByText("S").length).toBeGreaterThan(0);
  });

  it("відображає закреслену стару ціну для товару зі знижкою", () => {
    render(<ProductCatalog products={PRODUCTS} lang="uk" color="#ec4899" />);
    expect(screen.getByText("1 100 ₴")).toBeInTheDocument();
  });

  it("відображає бейджи товарів", () => {
    render(<ProductCatalog products={PRODUCTS} lang="uk" color="#ec4899" />);
    expect(screen.getByText("NEW")).toBeInTheDocument();
    expect(screen.getByText("SALE")).toBeInTheDocument();
    expect(screen.getByText("Bestseller")).toBeInTheDocument();
  });

  it("EN locale: чіп All та рахунок англійською", () => {
    render(<ProductCatalog products={PRODUCTS} lang="en" color="#ec4899" />);
    expect(screen.getByRole("button", { name: "All" })).toBeInTheDocument();
    expect(screen.getByText(/4 products/i)).toBeInTheDocument();
  });

  it("кнопки посилань ведуть на /uk/contact", () => {
    render(<ProductCatalog products={PRODUCTS} lang="uk" color="#ec4899" />);
    const links = screen.getAllByRole("link", { name: /купити/i });
    expect(links.length).toBeGreaterThan(0);
    links.forEach((l) => expect(l).toHaveAttribute("href", "/uk/contact"));
  });
});

// ── CourseFilter ───────────────────────────────────────────────────────

describe("CourseFilter", () => {
  it("відображає всі курси без фільтра", () => {
    render(<CourseFilter courses={COURSES} lang="uk" color="#8b5cf6" />);
    expect(screen.getByText("Англійська для початківців")).toBeInTheDocument();
    expect(screen.getByText("Німецька B1")).toBeInTheDocument();
    expect(screen.getByText("Англійська Advanced")).toBeInTheDocument();
  });

  it("відображає категорії курсів", () => {
    render(<CourseFilter courses={COURSES} lang="uk" color="#8b5cf6" />);
    expect(screen.getByRole("button", { name: "Англійська" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Німецька" })).toBeInTheDocument();
  });

  it("відображає рівні: Всі рівні, Початківець, Середній, Просунутий", () => {
    render(<CourseFilter courses={COURSES} lang="uk" color="#8b5cf6" />);
    expect(screen.getByRole("button", { name: "Всі рівні" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Початківець" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Середній" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Просунутий" })).toBeInTheDocument();
  });

  it("фільтрує за категорією Англійська", () => {
    render(<CourseFilter courses={COURSES} lang="uk" color="#8b5cf6" />);
    fireEvent.click(screen.getByRole("button", { name: "Англійська" }));
    expect(screen.getByText("Англійська для початківців")).toBeInTheDocument();
    expect(screen.getByText("Англійська Advanced")).toBeInTheDocument();
    expect(screen.queryByText("Німецька B1")).not.toBeInTheDocument();
  });

  it("фільтрує за рівнем Початківець", () => {
    render(<CourseFilter courses={COURSES} lang="uk" color="#8b5cf6" />);
    fireEvent.click(screen.getByRole("button", { name: "Початківець" }));
    expect(screen.getByText("Англійська для початківців")).toBeInTheDocument();
    expect(screen.queryByText("Англійська Advanced")).not.toBeInTheDocument();
  });

  it("комбінований фільтр: категорія Англійська + рівень Просунутий", () => {
    render(<CourseFilter courses={COURSES} lang="uk" color="#8b5cf6" />);
    fireEvent.click(screen.getByRole("button", { name: "Англійська" }));
    fireEvent.click(screen.getByRole("button", { name: "Просунутий" }));
    expect(screen.getByText("Англійська Advanced")).toBeInTheDocument();
    expect(screen.queryByText("Англійська для початківців")).not.toBeInTheDocument();
  });

  it("порожній стан + скидання фільтрів", () => {
    render(<CourseFilter courses={COURSES} lang="uk" color="#8b5cf6" />);
    fireEvent.click(screen.getByRole("button", { name: "Німецька" }));
    fireEvent.click(screen.getByRole("button", { name: "Початківець" }));
    expect(screen.getByText(/курсів не знайдено/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /скинути фільтри/i }));
    expect(screen.getByText("Англійська для початківців")).toBeInTheDocument();
  });

  it("показує кількість курсів", () => {
    render(<CourseFilter courses={COURSES} lang="uk" color="#8b5cf6" />);
    expect(screen.getByText(/курсів: 3/i)).toBeInTheDocument();
  });

  it("відображає викладача та рейтинг курсу", () => {
    render(<CourseFilter courses={COURSES} lang="uk" color="#8b5cf6" />);
    expect(screen.getByText(/Анна Коваль/)).toBeInTheDocument();
    expect(screen.getByText(/4\.8/)).toBeInTheDocument();
  });

  it("відображає закреслену стару ціну", () => {
    render(<CourseFilter courses={COURSES} lang="uk" color="#8b5cf6" />);
    expect(screen.getByText("6 000 ₴")).toBeInTheDocument();
  });

  it("EN locale: рівні англійською", () => {
    render(<CourseFilter courses={COURSES} lang="en" color="#8b5cf6" />);
    expect(screen.getByRole("button", { name: "All levels" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Beginner" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Intermediate" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Advanced" })).toBeInTheDocument();
  });

  it("EN locale: фільтр Beginner фільтрує за рівнем Початківець в даних", () => {
    render(<CourseFilter courses={COURSES} lang="en" color="#8b5cf6" />);
    fireEvent.click(screen.getByRole("button", { name: "Beginner" }));
    expect(screen.getByText("Англійська для початківців")).toBeInTheDocument();
    expect(screen.queryByText("Англійська Advanced")).not.toBeInTheDocument();
  });
});

// ── ScheduleFilter ─────────────────────────────────────────────────────

describe("ScheduleFilter", () => {
  it("відображає всі заняття без фільтра", () => {
    render(<ScheduleFilter items={SCHEDULE} lang="uk" color="#14b8a6" />);
    expect(screen.getByText("Йога для початківців")).toBeInTheDocument();
    expect(screen.getByText("Силове тренування")).toBeInTheDocument();
    expect(screen.getByText("Пілатес")).toBeInTheDocument();
    // "Кардіо" appears as both filter chip and item title
    expect(screen.getAllByText("Кардіо").length).toBeGreaterThanOrEqual(2);
  });

  it("відображає унікальні дні тижня з даних", () => {
    render(<ScheduleFilter items={SCHEDULE} lang="uk" color="#14b8a6" />);
    expect(screen.getByRole("button", { name: "Понеділок" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Середа" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "П'ятниця" })).toBeInTheDocument();
  });

  it("відображає унікальні категорії занять", () => {
    render(<ScheduleFilter items={SCHEDULE} lang="uk" color="#14b8a6" />);
    expect(screen.getByRole("button", { name: "Йога" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Силові" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Кардіо" })).toBeInTheDocument();
  });

  it("фільтрує за днем Понеділок", () => {
    render(<ScheduleFilter items={SCHEDULE} lang="uk" color="#14b8a6" />);
    fireEvent.click(screen.getByRole("button", { name: "Понеділок" }));
    expect(screen.getByText("Йога для початківців")).toBeInTheDocument();
    // "Кардіо" is both a filter chip and item heading — use heading role
    expect(screen.getByRole("heading", { name: "Кардіо" })).toBeInTheDocument();
    expect(screen.queryByText("Силове тренування")).not.toBeInTheDocument();
    expect(screen.queryByText("Пілатес")).not.toBeInTheDocument();
  });

  it("фільтрує за категорією Йога", () => {
    render(<ScheduleFilter items={SCHEDULE} lang="uk" color="#14b8a6" />);
    fireEvent.click(screen.getByRole("button", { name: "Йога" }));
    expect(screen.getByText("Йога для початківців")).toBeInTheDocument();
    expect(screen.getByText("Пілатес")).toBeInTheDocument();
    expect(screen.queryByText("Силове тренування")).not.toBeInTheDocument();
  });

  it("комбінований фільтр: день Понеділок + категорія Кардіо", () => {
    render(<ScheduleFilter items={SCHEDULE} lang="uk" color="#14b8a6" />);
    fireEvent.click(screen.getByRole("button", { name: "Понеділок" }));
    fireEvent.click(screen.getByRole("button", { name: "Кардіо" }));
    // One result — "Кардіо" as item heading
    expect(screen.getByRole("heading", { name: "Кардіо" })).toBeInTheDocument();
    expect(screen.getByText(/занять: 1/i)).toBeInTheDocument();
    expect(screen.queryByText("Йога для початківців")).not.toBeInTheDocument();
  });

  it("порожній стан + скидання", () => {
    render(<ScheduleFilter items={SCHEDULE} lang="uk" color="#14b8a6" />);
    fireEvent.click(screen.getByRole("button", { name: "Середа" }));
    fireEvent.click(screen.getByRole("button", { name: "Йога" }));
    expect(screen.getByText(/занять не знайдено/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /скинути фільтри/i }));
    expect(screen.getByText("Йога для початківців")).toBeInTheDocument();
  });

  it("показує кількість занять", () => {
    render(<ScheduleFilter items={SCHEDULE} lang="uk" color="#14b8a6" />);
    expect(screen.getByText(/занять: 4/i)).toBeInTheDocument();
  });

  it("клас з нульовою кількістю місць показує 'Немає місць'", () => {
    render(<ScheduleFilter items={SCHEDULE} lang="uk" color="#14b8a6" />);
    expect(screen.getByText("Немає місць")).toBeInTheDocument();
  });

  it("клас з місцями показує кількість вільних місць", () => {
    render(<ScheduleFilter items={SCHEDULE} lang="uk" color="#14b8a6" />);
    // Йога: 8/15 місць
    expect(screen.getByText("8 місць з 15")).toBeInTheDocument();
    // Кардіо: 20/25 місць
    expect(screen.getByText("20 місць з 25")).toBeInTheDocument();
  });

  it("відображає час та тривалість занять", () => {
    render(<ScheduleFilter items={SCHEDULE} lang="uk" color="#14b8a6" />);
    expect(screen.getByText(/09:00/)).toBeInTheDocument();
    expect(screen.getByText(/60 хв/)).toBeInTheDocument();
  });

  it("EN locale: показує 'All' та рахунок англійською", () => {
    render(<ScheduleFilter items={SCHEDULE} lang="en" color="#14b8a6" />);
    const allButtons = screen.getAllByRole("button", { name: "All" });
    expect(allButtons.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/4 classes/i)).toBeInTheDocument();
  });

  it("EN locale: повне заняття показує 'Full'", () => {
    render(<ScheduleFilter items={SCHEDULE} lang="en" color="#14b8a6" />);
    expect(screen.getByText("Full")).toBeInTheDocument();
  });
});
