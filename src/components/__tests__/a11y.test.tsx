import { render, act } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { Button } from "../ui/Button";
import { Input, Textarea, Select, Checkbox } from "../ui/FormElements";
import { Badge } from "../ui/Badge";
import { NewsletterForm } from "../ui/NewsletterForm";
import { Breadcrumb } from "../ui/Breadcrumb";
import { Tabs } from "../ui/Tabs";
import { Pagination } from "../ui/Pagination";
import { StarRating } from "../ui/StarRating";
import { StepIndicator } from "../ui/StepIndicator";
import { Avatar, AvatarGroup } from "../ui/Avatar";
import { Divider } from "../ui/Divider";
import { Skeleton, SkeletonCard, SkeletonText } from "../ui/Skeleton";
import { ConfirmDialog } from "../ui/ConfirmDialog";
import { ShareButtons } from "../ui/ShareButtons";
import { EmptyState } from "../ui/EmptyState";
import { NicheCalculator } from "../niches/NicheCalculator";
import { NicheStats } from "../niches/NicheStats";
import { BookingSection } from "../niches/BookingSection";
import { Footer } from "../layout/Footer";
import { TestimonialsSection } from "../home/TestimonialsSection";
import { ClientLogosSection } from "../home/ClientLogosSection";
import { ServicesSection } from "../home/ServicesSection";
import { WhyUsSection } from "../home/WhyUsSection";
import { HowWeWorkSection } from "../home/HowWeWorkSection";
import { MarketplaceTeaser } from "../home/MarketplaceTeaser";
import { BlogPreviewSection } from "../home/BlogPreviewSection";
import { BMICalculator } from "../niches/BMICalculator";
import { ComparePanel } from "../ui/ComparePanel";
import { BeforeAfter } from "../ui/BeforeAfter";
import CookieConsent from "../ui/CookieConsent";
import { BackToTop } from "../ui/BackToTop";
import { FloatingChat } from "../ui/FloatingChat";
import { Lightbox } from "../ui/Lightbox";
import { MiniCart } from "../ui/MiniCart";
import { ThemeToggle } from "../ui/ThemeToggle";
import { ContactForm } from "../contact/ContactForm";
import { SpeedTestTool } from "../resources/SpeedTestTool";
import type { NicheCalculatorStep } from "@/lib/data/niches";

expect.extend(toHaveNoViolations);

// Mock fetch for NewsletterForm
global.fetch = jest.fn();

jest.mock("@/components/layout/LocaleProvider", () => ({
  useLocale: () => "uk",
}));

jest.mock("next/link", () => {
  return function MockLink({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  };
});

jest.mock("next/navigation", () => ({
  useParams: () => ({ lang: "uk" }),
  useSearchParams: () => ({ get: () => null }),
}));

jest.mock("@/hooks/useCompare", () => ({
  useCompare: () => ({
    items: [
      { slug: "restaurant", title: "Ресторан / Кафе", emoji: "🍽", complexity: "medium", priceFrom: 9900 },
      { slug: "beauty", title: "Салон краси", emoji: "💇", complexity: "medium", priceFrom: 8000 },
    ],
    removeItem: jest.fn(),
    clearAll: jest.fn(),
  }),
}));

jest.mock("@/hooks/useCart", () => ({
  useCart: () => ({
    items: [],
    count: 0,
    subtotal: 0,
    removeItem: jest.fn(),
    isHydrated: true,
  }),
}));

jest.mock("../ui/ThemeProvider", () => ({
  useTheme: () => ({ theme: "system", setTheme: jest.fn() }),
}));

jest.mock("@/components/ui/CountUp", () => ({
  CountUp: ({ end, suffix }: { end: number; suffix: string }) => (
    <span>{end}{suffix}</span>
  ),
}));

describe("Accessibility (axe)", () => {
  describe("Button", () => {
    it("button with text has no axe violations", async () => {
      const { container } = render(<Button>Замовити</Button>);
      expect(await axe(container)).toHaveNoViolations();
    });

    it("button as link has no axe violations", async () => {
      const { container } = render(<Button href="/contact">Зв'язатися</Button>);
      expect(await axe(container)).toHaveNoViolations();
    });

    it("disabled button has no axe violations", async () => {
      const { container } = render(<Button disabled>Недоступно</Button>);
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe("FormElements", () => {
    it("Input with label has no axe violations", async () => {
      const { container } = render(
        <Input id="test-email" label="Email" type="email" placeholder="your@email.com" />
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it("Input with error has no axe violations", async () => {
      const { container } = render(
        <Input id="test-name" label="Ім'я" error="Поле обов'язкове" required />
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it("Textarea with label has no axe violations", async () => {
      const { container } = render(
        <Textarea id="test-msg" label="Повідомлення" placeholder="Введіть текст..." />
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it("Select with label has no axe violations", async () => {
      const { container } = render(
        <Select
          id="test-select"
          label="Послуга"
          options={[
            { value: "web", label: "Веб-сайт" },
            { value: "shop", label: "Інтернет-магазин" },
          ]}
          placeholder="Оберіть послугу"
        />
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it("Checkbox with label has no axe violations", async () => {
      const { container } = render(
        <Checkbox id="test-agree" label="Погоджуюсь з умовами" />
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe("Badge", () => {
    it("default badge has no axe violations", async () => {
      const { container } = render(<Badge>Новий</Badge>);
      expect(await axe(container)).toHaveNoViolations();
    });

    it("hot badge has no axe violations", async () => {
      const { container } = render(<Badge variant="hot">🔥 Хіт</Badge>);
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe("NewsletterForm", () => {
    it("inline form has no axe violations", async () => {
      const { container } = render(<NewsletterForm />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it("compact form has no axe violations", async () => {
      const { container } = render(<NewsletterForm variant="compact" />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe("Breadcrumb", () => {
    it("has no axe violations", async () => {
      const { container } = render(
        <Breadcrumb
          items={[
            { label: "Послуги", href: "/services" },
            { label: "Розробка сайтів" },
          ]}
        />
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it("single item has no axe violations", async () => {
      const { container } = render(<Breadcrumb items={[{ label: "Портфоліо" }]} />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe("Tabs", () => {
    const TABS = [
      { id: "features", label: "Функції" },
      { id: "tech", label: "Технології" },
      { id: "faq", label: "FAQ" },
    ];

    it("has no axe violations", async () => {
      const { container } = render(
        <Tabs tabs={TABS} defaultTab="features">
          {(active) => <div>{active === "features" ? "Функції" : "Інше"}</div>}
        </Tabs>
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe("Pagination", () => {
    it("has no axe violations (multiple pages)", async () => {
      const { container } = render(
        <Pagination currentPage={2} totalPages={10} onPageChange={() => {}} />
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it("first page has no axe violations", async () => {
      const { container } = render(
        <Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe("StarRating", () => {
    it("readonly star rating has no axe violations", async () => {
      const { container } = render(<StarRating value={4} readonly />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it("interactive star rating has no axe violations", async () => {
      const { container } = render(<StarRating value={3} onChange={() => {}} />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it("star rating with review count has no axe violations", async () => {
      const { container } = render(
        <StarRating value={5} readonly showValue reviewCount={12} />
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe("StepIndicator", () => {
    const STEPS = [
      { id: 1, label: "Контакти" },
      { id: 2, label: "Доставка" },
      { id: 3, label: "Оплата" },
    ];

    it("has no axe violations", async () => {
      const { container } = render(<StepIndicator steps={STEPS} currentStep={2} />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it("first step has no axe violations", async () => {
      const { container } = render(<StepIndicator steps={STEPS} currentStep={1} />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe("Avatar", () => {
    it("avatar with name initials has no axe violations", async () => {
      const { container } = render(<Avatar name="Олена Коваль" />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it("avatar with alt text has no axe violations", async () => {
      const { container } = render(<Avatar alt="Аватар Олени" />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it("AvatarGroup has no axe violations", async () => {
      const { container } = render(
        <AvatarGroup
          avatars={[
            { name: "Олена" },
            { name: "Денис" },
            { name: "Марія" },
          ]}
        />
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe("Divider", () => {
    it("plain divider has no axe violations", async () => {
      const { container } = render(<Divider />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it("divider with label has no axe violations", async () => {
      const { container } = render(<Divider label="або" />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it("dashed divider has no axe violations", async () => {
      const { container } = render(<Divider variant="dashed" />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe("Skeleton", () => {
    it("Skeleton has no axe violations", async () => {
      const { container } = render(<Skeleton className="w-48 h-6" />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it("SkeletonCard has no axe violations", async () => {
      const { container } = render(<SkeletonCard />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it("SkeletonText has no axe violations", async () => {
      const { container } = render(<SkeletonText lines={3} />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe("ConfirmDialog", () => {
    it("open dialog has no axe violations", async () => {
      const { container } = render(
        <ConfirmDialog
          isOpen
          title="Видалити товар?"
          message="Цю дію неможливо скасувати."
          onConfirm={() => {}}
          onCancel={() => {}}
        />
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it("danger variant dialog has no axe violations", async () => {
      const { container } = render(
        <ConfirmDialog
          isOpen
          variant="danger"
          title="Видалити акаунт?"
          message="Всі дані буде видалено назавжди."
          confirmLabel="Видалити"
          cancelLabel="Скасувати"
          onConfirm={() => {}}
          onCancel={() => {}}
        />
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe("NicheCalculator", () => {
    const CALC_STEPS: NicheCalculatorStep[] = [
      {
        label: "Тип послуги",
        options: [
          { label: "Базова", price: 500 },
          { label: "Стандарт", price: 1000 },
        ],
      },
      {
        label: "Доставка",
        options: [
          { label: "Самовивіз", price: 0 },
          { label: "По місту", price: 150 },
        ],
      },
    ];

    it("default state has no axe violations", async () => {
      const { container } = render(
        <NicheCalculator steps={CALC_STEPS} color="#6366f1" />
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it("has no axe violations with custom title", async () => {
      const { container } = render(
        <NicheCalculator steps={CALC_STEPS} color="#10b981" title="Розрахунок ціни" />
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe("Footer", () => {
    it("has no axe violations", async () => {
      const { container } = render(<Footer />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe("TestimonialsSection", () => {
    it("has no axe violations", async () => {
      const { container } = render(<TestimonialsSection />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe("BookingSection", () => {
    const MOCK_SERVICES = [
      { name: "Стрижка", price: "від 350 ₴", duration: "60 хв", icon: "✂️" },
      { name: "Фарбування", price: "від 800 ₴", duration: "2–3 год", icon: "🎨" },
    ];

    it("step 1 (service selection) has no axe violations", async () => {
      const { container } = render(
        <BookingSection
          services={MOCK_SERVICES}
          color="#6366f1"
          gradient="from-indigo-600 to-purple-600"
        />
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it("has no axe violations with custom title", async () => {
      const { container } = render(
        <BookingSection
          services={MOCK_SERVICES}
          color="#10b981"
          gradient="from-emerald-600 to-teal-600"
          title="Запис до майстра"
        />
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe("ClientLogosSection", () => {
    it("has no axe violations (including color contrast)", async () => {
      const { container } = render(<ClientLogosSection lang="uk" />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe("ServicesSection", () => {
    it("has no axe violations", async () => {
      const { container } = render(<ServicesSection lang="uk" />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe("WhyUsSection", () => {
    it("has no axe violations", async () => {
      const { container } = render(<WhyUsSection lang="uk" />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe("HowWeWorkSection", () => {
    it("has no axe violations", async () => {
      const { container } = render(<HowWeWorkSection lang="uk" />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe("ShareButtons", () => {
    beforeEach(() => {
      Object.assign(navigator, {
        clipboard: { writeText: jest.fn().mockResolvedValue(undefined) },
      });
    });

    it("English share buttons have no axe violations", async () => {
      const { container } = render(
        <ShareButtons
          url="https://codeworth.uk/en/blog/test"
          title="Test Article"
          isUk={false}
        />
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it("Ukrainian share buttons have no axe violations", async () => {
      const { container } = render(
        <ShareButtons
          url="https://codeworth.uk/uk/blog/test"
          title="Тестова стаття"
          isUk={true}
        />
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe("EmptyState", () => {
    it("search variant has no axe violations", async () => {
      const { container } = render(<EmptyState variant="search" />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it("cart variant has no axe violations", async () => {
      const { container } = render(<EmptyState variant="cart" />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it("generic variant has no axe violations", async () => {
      const { container } = render(<EmptyState />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe("BMICalculator", () => {
    it("UK locale has no axe violations", async () => {
      const { container } = render(<BMICalculator lang="uk" color="#6366f1" />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it("EN locale has no axe violations", async () => {
      const { container } = render(<BMICalculator lang="en" color="#10b981" />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe("ComparePanel", () => {
    it("panel with 2 items has no axe violations", async () => {
      const { container } = render(<ComparePanel />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe("BeforeAfter", () => {
    it("has no axe violations with default labels", async () => {
      const { container } = render(
        <BeforeAfter beforeSrc="/before.jpg" afterSrc="/after.jpg" />
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it("has no axe violations with custom labels", async () => {
      const { container } = render(
        <BeforeAfter
          beforeSrc="/before.jpg"
          afterSrc="/after.jpg"
          beforeLabel="Старий дизайн"
          afterLabel="Новий дизайн"
        />
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe("CookieConsent", () => {
    it("has no axe violations when banner is visible", async () => {
      localStorage.clear();
      let container!: HTMLElement;
      await act(async () => {
        ({ container } = render(<CookieConsent />));
      });
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe("BackToTop", () => {
    it("has no axe violations (hidden state)", async () => {
      const { container } = render(<BackToTop />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe("FloatingChat", () => {
    it("closed state has no axe violations", async () => {
      const { container } = render(<FloatingChat />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe("Lightbox", () => {
    const IMAGES = [
      { src: "/img1.jpg", alt: "Зображення 1", caption: "Підпис 1" },
      { src: "/img2.jpg", alt: "Зображення 2" },
    ];

    it("has no axe violations", async () => {
      const { container } = render(
        <Lightbox images={IMAGES} onClose={() => {}} />
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it("has no axe violations at second image", async () => {
      const { container } = render(
        <Lightbox images={IMAGES} initialIndex={1} onClose={() => {}} />
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe("MiniCart", () => {
    it("empty cart has no axe violations", async () => {
      const { container } = render(<MiniCart />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe("ThemeToggle", () => {
    it("closed state has no axe violations", async () => {
      const { container } = render(<ThemeToggle />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe("NicheStats", () => {
    it("has no axe violations", async () => {
      const { container } = render(<NicheStats color="#6366f1" />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe("MarketplaceTeaser", () => {
    it("has no axe violations", async () => {
      const { container } = render(<MarketplaceTeaser lang="uk" />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe("BlogPreviewSection", () => {
    it("has no axe violations", async () => {
      const { container } = render(<BlogPreviewSection lang="uk" />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe("ContactForm", () => {
    it("has no axe violations in idle state", async () => {
      const { container } = render(<ContactForm />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe("SpeedTestTool", () => {
    it("UK idle state has no axe violations", async () => {
      const { container } = render(<SpeedTestTool lang="uk" />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it("EN idle state has no axe violations", async () => {
      const { container } = render(<SpeedTestTool lang="en" />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
