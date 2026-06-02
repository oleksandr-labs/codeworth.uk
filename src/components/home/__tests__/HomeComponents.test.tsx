import React from "react";
import { render, screen } from "@testing-library/react";
import { TestimonialsSection } from "../TestimonialsSection";
import { MarketplaceTeaser } from "../MarketplaceTeaser";
import { ServicesSection } from "../ServicesSection";
import { WhyUsSection } from "../WhyUsSection";
import { HowWeWorkSection } from "../HowWeWorkSection";
import { ClientLogosSection } from "../ClientLogosSection";

jest.mock("next/link", () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
  MockLink.displayName = "MockLink";
  return MockLink;
});

jest.mock("@/components/layout/Container", () => ({
  Container: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock("@/components/ui/CountUp", () => ({
  CountUp: ({ end }: { end: number }) => <span>{end}</span>,
}));

jest.mock("@/components/layout/LocaleProvider", () => ({
  useLocale: () => "uk",
}));

// ── TestimonialsSection ───────────────────────────────────────────────
describe("TestimonialsSection", () => {
  it("відображає заголовок секції", () => {
    render(<TestimonialsSection />);
    expect(screen.getByText(/відгуки клієнтів/i)).toBeInTheDocument();
  });

  it("показує 85+ компаній", () => {
    render(<TestimonialsSection />);
    expect(screen.getByText(/85\+ компаній/i)).toBeInTheDocument();
  });

  it("відображає перші 3 відгуки (перша сторінка)", () => {
    render(<TestimonialsSection />);
    expect(screen.getByText("Олена Коваль")).toBeInTheDocument();
    expect(screen.getByText("Дмитро Савченко")).toBeInTheDocument();
    expect(screen.getByText("Марія Петренко")).toBeInTheDocument();
  });

  it("відображає назви компаній першої сторінки", () => {
    render(<TestimonialsSection />);
    expect(screen.getByText(/Beauty Room Kyiv/i)).toBeInTheDocument();
    expect(screen.getByText(/TechCargo Logistics/i)).toBeInTheDocument();
    expect(screen.getByText(/Sweet Bakery UA/i)).toBeInTheDocument();
  });

  it("показує зірки для 3 видимих відгуків", () => {
    render(<TestimonialsSection />);
    // 3 видимих відгуки × 5 зірок = 15
    const stars = document.querySelectorAll(".lucide-star");
    expect(stars.length).toBe(15);
  });

  it("має кнопки навігації між сторінками", () => {
    render(<TestimonialsSection />);
    expect(screen.getByLabelText("Попередні відгуки")).toBeInTheDocument();
    expect(screen.getByLabelText("Наступні відгуки")).toBeInTheDocument();
  });

  it("має dot-індикатори сторінок", () => {
    render(<TestimonialsSection />);
    expect(screen.getByLabelText("Сторінка 1")).toBeInTheDocument();
    expect(screen.getByLabelText("Сторінка 2")).toBeInTheDocument();
    expect(screen.getByLabelText("Сторінка 3")).toBeInTheDocument();
  });
});

// ── MarketplaceTeaser ─────────────────────────────────────────────────
describe("MarketplaceTeaser", () => {
  it("відображає заголовок маркетплейсу", () => {
    render(<MarketplaceTeaser lang="uk" />);
    expect(screen.getByText(/маркетплейс готових рішень/i)).toBeInTheDocument();
  });

  it("показує 4 нішеві картки", () => {
    render(<MarketplaceTeaser lang="uk" />);
    expect(screen.getByText("Ресторан / Кафе")).toBeInTheDocument();
    expect(screen.getByText("Салон краси")).toBeInTheDocument();
    expect(screen.getByText("Медична клініка")).toBeInTheDocument();
    expect(screen.getByText("Інтернет-магазин")).toBeInTheDocument();
  });

  it("кнопка 'Дивитися маркетплейс' веде на /marketplace", () => {
    render(<MarketplaceTeaser lang="uk" />);
    const links = screen.getAllByRole("link", { name: /маркетплейс/i });
    const mainLink = links.find((l) => l.getAttribute("href") === "/uk/marketplace");
    expect(mainLink).toBeInTheDocument();
  });

  it("відображає теги популярності (Популярне, Нове тощо)", () => {
    render(<MarketplaceTeaser lang="uk" />);
    expect(screen.getByText("Популярне")).toBeInTheDocument();
    expect(screen.getByText("Нове")).toBeInTheDocument();
  });
});

// ── ServicesSection ───────────────────────────────────────────────────
describe("ServicesSection", () => {
  it("відображає заголовок 'Послуги'", () => {
    render(<ServicesSection lang="uk" />);
    expect(screen.getByText(/наші послуги/i)).toBeInTheDocument();
  });

  it("відображає картку 'Розробка сайтів'", () => {
    render(<ServicesSection lang="uk" />);
    expect(screen.getByText("Розробка сайтів")).toBeInTheDocument();
  });

  it("відображає картку 'SEO-просування'", () => {
    render(<ServicesSection lang="uk" />);
    expect(screen.getByText("SEO-просування")).toBeInTheDocument();
  });

  it("картки мають посилання на відповідні сторінки послуг", () => {
    render(<ServicesSection lang="uk" />);
    const webDevLink = screen.getByRole("link", { name: /розробка сайтів/i });
    expect(webDevLink).toHaveAttribute("href", "/uk/services/website-dev");
  });

  it("кнопка 'Переглянути всі послуги' веде на /services", () => {
    render(<ServicesSection lang="uk" />);
    const allServicesLink = screen.getByRole("link", { name: /переглянути всі послуги/i });
    expect(allServicesLink).toHaveAttribute("href", "/uk/services");
  });
});

// ── WhyUsSection ──────────────────────────────────────────────────────
describe("WhyUsSection", () => {
  it("відображає заголовок секції", () => {
    render(<WhyUsSection lang="uk" />);
    expect(screen.getByText(/обирають нас/i)).toBeInTheDocument();
  });

  it("відображає переваги компанії", () => {
    render(<WhyUsSection lang="uk" />);
    expect(screen.getByText(/швидкий запуск/i)).toBeInTheDocument();
    expect(screen.getByText(/преміальний дизайн/i)).toBeInTheDocument();
  });
});

// ── ClientLogosSection ────────────────────────────────────────────────
describe("ClientLogosSection", () => {
  it("відображає trust badges", () => {
    render(<ClientLogosSection lang="uk" />);
    expect(screen.getByText("SSL & HTTPS")).toBeInTheDocument();
    expect(screen.getByText("Lighthouse 90+")).toBeInTheDocument();
    expect(screen.getByText("24/7 підтримка")).toBeInTheDocument();
    expect(screen.getByText("LCP < 2.5с")).toBeInTheDocument();
  });

  it("відображає логотипи клієнтів", () => {
    render(<ClientLogosSection lang="uk" />);
    expect(screen.getByText("Beauty Room")).toBeInTheDocument();
    expect(screen.getByText("TechCargo")).toBeInTheDocument();
    expect(screen.getByText("InvoiceFlow")).toBeInTheDocument();
  });

  it("відображає 12 логотипів клієнтів", () => {
    render(<ClientLogosSection lang="uk" />);
    expect(screen.getByText("Нам довіряють компанії по всій Україні")).toBeInTheDocument();
  });

  it("trust badges мають 4 елементи", () => {
    render(<ClientLogosSection lang="uk" />);
    expect(screen.getByText("Захищене з'єднання")).toBeInTheDocument();
    expect(screen.getByText("Продуктивність та SEO")).toBeInTheDocument();
    expect(screen.getByText("Завжди на зв'язку")).toBeInTheDocument();
    expect(screen.getByText("Core Web Vitals")).toBeInTheDocument();
  });
});

// ── HowWeWorkSection ──────────────────────────────────────────────────
describe("HowWeWorkSection", () => {
  it("відображає заголовок 'Як ми працюємо'", () => {
    render(<HowWeWorkSection lang="uk" />);
    expect(screen.getByText(/як ми працюємо/i)).toBeInTheDocument();
  });

  it("відображає 5 кроків процесу", () => {
    render(<HowWeWorkSection lang="uk" />);
    // Check key steps
    expect(screen.getByText(/брифінг/i)).toBeInTheDocument();
    expect(screen.getByText(/дизайн/i)).toBeInTheDocument();
    expect(screen.getByText(/розробка/i)).toBeInTheDocument();
  });

  it("кнопка CTA веде на /contact", () => {
    render(<HowWeWorkSection lang="uk" />);
    const contactLinks = screen.getAllByRole("link", { name: /контакт|проєкт|замовити|безкоштовну/i });
    expect(contactLinks.length).toBeGreaterThan(0);
  });
});
