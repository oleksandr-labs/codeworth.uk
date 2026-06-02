import { render, screen } from "@testing-library/react";
import { Breadcrumb } from "../ui/Breadcrumb";

jest.mock("@/components/layout/LocaleProvider", () => ({ useLocale: () => "uk" }));

// next/link is a server component — mock it for tests
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

describe("Breadcrumb", () => {
  it("renders home link as first item", () => {
    render(<Breadcrumb items={[{ label: "Послуги", href: "/services" }]} />);
    const homeLink = screen.getByRole("link", { name: /головна/i });
    expect(homeLink).toHaveAttribute("href", "/uk");

  });

  it("renders all provided items", () => {
    render(
      <Breadcrumb
        items={[
          { label: "Послуги", href: "/services" },
          { label: "Розробка сайтів" },
        ]}
      />
    );
    expect(screen.getByText("Послуги")).toBeInTheDocument();
    expect(screen.getByText("Розробка сайтів")).toBeInTheDocument();
  });

  it("last item has no link (current page)", () => {
    render(
      <Breadcrumb
        items={[
          { label: "Послуги", href: "/services" },
          { label: "Розробка сайтів" },
        ]}
      />
    );
    const currentPage = screen.getByText("Розробка сайтів");
    // Should be a span, not an anchor
    expect(currentPage.tagName.toLowerCase()).toBe("span");
  });

  it("intermediate items are links", () => {
    render(
      <Breadcrumb
        items={[
          { label: "Послуги", href: "/services" },
          { label: "Розробка сайтів" },
        ]}
      />
    );
    expect(screen.getByRole("link", { name: /послуги/i })).toHaveAttribute(
      "href",
      "/services"
    );
  });

  it("renders nav with aria-label", () => {
    render(<Breadcrumb items={[{ label: "Контакти" }]} />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <Breadcrumb items={[{ label: "Test" }]} className="custom-class" />
    );
    expect(container.querySelector("nav")).toHaveClass("custom-class");
  });

  it("injects Schema.org BreadcrumbList JSON-LD", () => {
    const { container } = render(
      <Breadcrumb items={[{ label: "Блог", href: "/blog" }]} />
    );
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).toBeInTheDocument();
    const data = JSON.parse(script!.textContent!);
    expect(data["@type"]).toBe("BreadcrumbList");
    expect(data.itemListElement).toHaveLength(2); // Home + Blog
  });
});
