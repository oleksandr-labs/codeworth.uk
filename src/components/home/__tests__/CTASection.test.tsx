import React from "react";
import { render, screen } from "@testing-library/react";
import { CTASection } from "../CTASection";

jest.mock("@/components/layout/Container", () => ({
  Container: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock("../CTAForm", () => ({
  CTAForm: () => <div data-testid="cta-form">CTAForm</div>,
}));

describe("CTASection", () => {
  it("відображає заголовок секції", () => {
    render(<CTASection lang="uk" />);
    expect(screen.getByText(/готові запустити/i)).toBeInTheDocument();
  });

  it("відображає підзаголовок із CTA", () => {
    render(<CTASection lang="uk" />);
    expect(screen.getByText(/ваш проєкт/i)).toBeInTheDocument();
  });

  it("відображає форму CTAForm", () => {
    render(<CTASection lang="uk" />);
    expect(screen.getByTestId("cta-form")).toBeInTheDocument();
  });

  it("містить посилання на Telegram", () => {
    render(<CTASection lang="uk" />);
    const telegramLink = screen.getByRole("link", { name: /telegram/i });
    expect(telegramLink).toHaveAttribute("href", expect.stringContaining("t.me"));
  });

  it("Telegram посилання відкривається у новій вкладці", () => {
    render(<CTASection lang="uk" />);
    const telegramLink = screen.getByRole("link", { name: /telegram/i });
    expect(telegramLink).toHaveAttribute("target", "_blank");
    expect(telegramLink).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });

  it("відображає badge 'Зараз приймаємо нові проєкти'", () => {
    render(<CTASection lang="uk" />);
    expect(screen.getByText(/зараз приймаємо нові проєкти/i)).toBeInTheDocument();
  });
});
