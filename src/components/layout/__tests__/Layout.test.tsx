/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

// ── Mocks ──────────────────────────────────────────────────────────────────

jest.mock("next/navigation", () => ({
  useParams: () => ({ lang: "uk" }),
  usePathname: () => "/uk",
}));

jest.mock("next/link", () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
  MockLink.displayName = "MockLink";
  return MockLink;
});

jest.mock("next/image", () => {
  const MockImage = ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  );
  MockImage.displayName = "MockImage";
  return MockImage;
});

jest.mock("@/components/layout/LocaleProvider", () => ({
  useLocale: () => "uk",
}));

jest.mock("@/components/ui/Logo", () => ({
  LogoWordmark: () => <span>Codeworth</span>,
  LogoIcon: () => <span>Logo</span>,
}));

jest.mock("@/components/ui/ThemeToggle", () => ({
  ThemeToggle: () => <button>ThemeToggle</button>,
}));

jest.mock("@/components/ui/MiniCart", () => ({
  MiniCart: () => <button>Cart</button>,
}));

jest.mock("@/lib/data/services", () => ({
  SERVICES_DATA: [
    {
      slug: "website-dev",
      shortTitle: "Розробка сайтів",
      priceFrom: "15 000 грн",
      icon: () => null,
      bg: "bg-indigo-100",
      iconColor: "text-indigo-600",
    },
    {
      slug: "seo",
      shortTitle: "SEO",
      priceFrom: "5 000 грн",
      icon: () => null,
      bg: "bg-green-100",
      iconColor: "text-green-600",
    },
  ],
}));

// ── Container ──────────────────────────────────────────────────────────────

import { Container } from "../Container";

describe("Container", () => {
  it("renders children", () => {
    render(<Container>Hello container</Container>);
    expect(screen.getByText("Hello container")).toBeInTheDocument();
  });

  it("renders as a div by default", () => {
    const { container } = render(<Container>content</Container>);
    expect(container.firstChild?.nodeName).toBe("DIV");
  });

  it("renders as a custom element when `as` prop is provided", () => {
    const { container } = render(<Container as="section">section content</Container>);
    expect(container.firstChild?.nodeName).toBe("SECTION");
  });

  it("applies additional className alongside base classes", () => {
    const { container } = render(<Container className="my-custom-class">text</Container>);
    expect(container.firstChild).toHaveClass("my-custom-class");
    expect(container.firstChild).toHaveClass("mx-auto");
  });
});

// ── Footer ─────────────────────────────────────────────────────────────────

import { Footer } from "../Footer";

describe("Footer", () => {
  it("renders without error and shows the studio tagline", () => {
    render(<Footer />);
    expect(screen.getByText(/будуємо цифрові гнізда/i)).toBeInTheDocument();
  });

  it("renders Ukrainian service links with locale-prefixed hrefs", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /розробка сайтів/i })).toHaveAttribute(
      "href",
      "/uk/services/website-dev"
    );
    expect(screen.getByRole("link", { name: /інтернет-магазини/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /seo-просування/i })).toHaveAttribute(
      "href",
      "/uk/services/seo"
    );
  });

  it("renders company nav links with correct hrefs", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /контакти/i })).toHaveAttribute("href", "/uk/contact");
    expect(screen.getByRole("link", { name: /портфоліо/i })).toHaveAttribute("href", "/uk/portfolio");
  });

  it("renders social links and the current copyright year", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /telegram/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /instagram/i })).toBeInTheDocument();
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });
});

// ── Header ─────────────────────────────────────────────────────────────────

import { Header } from "../Header";

describe("Header", () => {
  it("renders without error and shows the logo link to the home page", () => {
    render(<Header />);
    const logoLink = screen.getAllByRole("link").find(
      (l) => l.getAttribute("href") === "/uk" || l.getAttribute("href") === "/uk/"
    );
    expect(logoLink).toBeInTheDocument();
  });

  it("renders desktop nav links for Marketplace, Portfolio, Pricing, Blog", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: /маркетплейс/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /портфоліо/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /ціни/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /блог/i })).toBeInTheDocument();
  });

  it("renders the Services dropdown button", () => {
    render(<Header />);
    expect(screen.getByRole("button", { name: /послуги/i })).toBeInTheDocument();
  });

  it("opens the mobile menu and shows navigation links", () => {
    render(<Header />);
    const mobileMenuButton = screen
      .getAllByRole("button")
      .find(
        (b) =>
          !b.textContent?.includes("Послуги") &&
          !b.textContent?.includes("ThemeToggle") &&
          !b.textContent?.includes("Cart")
      );
    expect(mobileMenuButton).toBeDefined();
    fireEvent.click(mobileMenuButton!);
    const aboutLinks = screen.getAllByRole("link", { name: /про нас/i });
    expect(aboutLinks.length).toBeGreaterThan(0);
    expect(aboutLinks[0]).toHaveAttribute("href", "/uk/about");
  });
});
