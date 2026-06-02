import React from "react";
import { render, screen } from "@testing-library/react";
import NotFound from "../[lang]/not-found";

jest.mock("next/link", () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
  MockLink.displayName = "MockLink";
  return MockLink;
});

jest.mock("next/headers", () => ({
  headers: () =>
    Promise.resolve({
      get: (key: string) => {
        if (key === "x-invoke-path") return "/uk/not-found";
        return null;
      },
    }),
}));

jest.mock("@/components/layout/Header", () => ({
  Header: () => <header data-testid="header" />,
}));
jest.mock("@/components/layout/Footer", () => ({
  Footer: () => <footer data-testid="footer" />,
}));
jest.mock("@/components/layout/Container", () => ({
  Container: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));
jest.mock("@/components/ui/Button", () => ({
  Button: ({ children, href }: { children: React.ReactNode; href?: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe("NotFound (not-found.tsx)", () => {
  beforeEach(async () => {
    const NotFoundResolved = await NotFound();
    render(NotFoundResolved as React.ReactElement);
  });

  it("відображає '404' в тексті", () => {
    expect(screen.getAllByText(/404/).length).toBeGreaterThan(0);
  });

  it("відображає заголовок h1", () => {
    expect(screen.getByRole("heading", { name: /сторінку не знайдено/i })).toBeInTheDocument();
  });

  it("кнопка 'На головну' веде на /uk", () => {
    expect(screen.getByRole("link", { name: /на головну/i })).toHaveAttribute("href", "/uk");
  });

  it("кнопка 'Наші послуги' веде на /uk/services", () => {
    expect(screen.getByRole("link", { name: /наші послуги/i })).toHaveAttribute("href", "/uk/services");
  });

  it("кнопка 'Маркетплейс' веде на /uk/marketplace/catalog", () => {
    expect(screen.getByRole("link", { name: /маркетплейс/i })).toHaveAttribute("href", "/uk/marketplace/catalog");
  });

  it("відображає популярні посилання: Портфоліо, Блог, Ціни, Контакти, FAQ", () => {
    expect(screen.getByRole("link", { name: "Портфоліо" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Блог" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Ціни" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Контакти" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "FAQ" })).toBeInTheDocument();
  });
});
