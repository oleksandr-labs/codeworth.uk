import { render, act } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { NewsletterForm } from "../ui/NewsletterForm";
import { Breadcrumb } from "../ui/Breadcrumb";
import { Pagination } from "../ui/Pagination";
import { StarRating } from "../ui/StarRating";
import { StepIndicator } from "../ui/StepIndicator";
import { Avatar, AvatarGroup } from "../ui/Avatar";
import { Divider } from "../ui/Divider";
import { Skeleton, SkeletonCard, SkeletonText } from "../ui/Skeleton";
import { ShareButtons } from "../ui/ShareButtons";
import { EmptyState } from "../ui/EmptyState";
import { Footer } from "../layout/Footer";
import { TestimonialsSection } from "../home/TestimonialsSection";
import { ClientLogosSection } from "../home/ClientLogosSection";
import { ServicesSection } from "../home/ServicesSection";
import { WhyUsSection } from "../home/WhyUsSection";
import { HowWeWorkSection } from "../home/HowWeWorkSection";
import { IndustriesTeaser } from "../home/IndustriesTeaser";
import { BlogPreviewSection } from "../home/BlogPreviewSection";
import { BeforeAfter } from "../ui/BeforeAfter";
import CookieConsent from "../ui/CookieConsent";
import { BackToTop } from "../ui/BackToTop";
import { FloatingChat } from "../ui/FloatingChat";
import { Lightbox } from "../ui/Lightbox";
import { ThemeToggle } from "../ui/ThemeToggle";
import { ContactForm } from "../contact/ContactForm";
import { SpeedTestTool } from "../resources/SpeedTestTool";

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

  describe("ThemeToggle", () => {
    it("closed state has no axe violations", async () => {
      const { container } = render(<ThemeToggle />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe("IndustriesTeaser", () => {
    it("has no axe violations", async () => {
      const { container } = render(<IndustriesTeaser lang="uk" />);
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
