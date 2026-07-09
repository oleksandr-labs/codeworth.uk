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

  it("містить згадку про Telegram як альтернативний контакт", () => {
    // NOTE: the component only renders the word "Telegram" as plain text,
    // not as an actual <a href="https://t.me/..."> link. There is no
    // clickable Telegram link in CTASection today.
    render(<CTASection lang="uk" />);
    expect(screen.getByText("Telegram")).toBeInTheDocument();
    expect(screen.getByText(/або напишіть нам у/i)).toBeInTheDocument();
  });

  it("відображає badge 'Зараз приймаємо нові проєкти'", () => {
    render(<CTASection lang="uk" />);
    expect(screen.getByText(/зараз приймаємо нові проєкти/i)).toBeInTheDocument();
  });
});
