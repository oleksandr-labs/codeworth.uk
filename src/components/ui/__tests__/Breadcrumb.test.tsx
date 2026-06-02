/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import { Breadcrumb } from "../Breadcrumb";

jest.mock("@/components/layout/LocaleProvider", () => ({
  useLocale: () => "uk",
}));

jest.mock("next/link", () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
  MockLink.displayName = "MockLink";
  return MockLink;
});

describe("Breadcrumb", () => {
  it("завжди показує 'Головна' як перший елемент", () => {
    render(<Breadcrumb items={[{ label: "Послуги", href: "/services" }]} />);
    expect(screen.getByText("Головна")).toBeInTheDocument();
  });

  it("відображає переданий елемент", () => {
    render(<Breadcrumb items={[{ label: "Послуги", href: "/services" }]} />);
    expect(screen.getByText("Послуги")).toBeInTheDocument();
  });

  it("останній елемент не має посилання (тільки текст)", () => {
    render(
      <Breadcrumb
        items={[
          { label: "Послуги", href: "/services" },
          { label: "SEO-просування" },
        ]}
      />
    );
    const seo = screen.getByText("SEO-просування");
    expect(seo.tagName).toBe("SPAN");
    expect(seo.closest("a")).toBeNull();
  });

  it("проміжні елементи є посиланнями", () => {
    render(
      <Breadcrumb
        items={[
          { label: "Послуги", href: "/services" },
          { label: "SEO-просування" },
        ]}
      />
    );
    const servicesLink = screen.getByRole("link", { name: "Послуги" });
    expect(servicesLink).toHaveAttribute("href", "/services");
  });

  it("навігаційний елемент має aria-label='Breadcrumb'", () => {
    render(<Breadcrumb items={[{ label: "Блог" }]} />);
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
  });

  it("рендерить Schema.org JSON-LD скрипт", () => {
    render(<Breadcrumb items={[{ label: "Портфоліо", href: "/portfolio" }]} />);
    const script = document.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeNull();
    const data = JSON.parse(script!.textContent!);
    expect(data["@type"]).toBe("BreadcrumbList");
    expect(data.itemListElement.length).toBe(2);
  });

  it("'Головна' має посилання на '/'", () => {
    render(<Breadcrumb items={[{ label: "Ціни" }]} />);
    const homeLink = screen.getByRole("link", { name: "Головна" });
    expect(homeLink).toHaveAttribute("href", "/uk");
  });
});
