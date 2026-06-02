/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { FloatingChat } from "../FloatingChat";

jest.mock("next/link", () => {
  const MockLink = ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [k: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
  MockLink.displayName = "MockLink";
  return MockLink;
});

let mockLang = "uk";
jest.mock("next/navigation", () => ({
  useParams: () => ({ lang: mockLang }),
}));

describe("FloatingChat (UK locale)", () => {
  beforeEach(() => {
    mockLang = "uk";
  });

  it("відображає кнопку-тогл за замовчуванням", () => {
    render(<FloatingChat />);
    expect(screen.getByRole("button", { name: /написати нам/i })).toBeInTheDocument();
  });

  it("месенджери приховані за замовчуванням", () => {
    render(<FloatingChat />);
    expect(screen.queryByText("Telegram")).not.toBeInTheDocument();
    expect(screen.queryByText("Instagram")).not.toBeInTheDocument();
  });

  it("клік по кнопці відкриває список месенджерів", () => {
    render(<FloatingChat />);
    const btn = screen.getByRole("button", { name: /написати нам/i });
    fireEvent.click(btn);
    expect(screen.getByText("Telegram")).toBeInTheDocument();
    expect(screen.getByText("Instagram")).toBeInTheDocument();
  });

  it("кнопка отримує aria-expanded=true при відкритті", () => {
    render(<FloatingChat />);
    const btn = screen.getByRole("button");
    expect(btn).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(btn);
    expect(btn).toHaveAttribute("aria-expanded", "true");
  });

  it("повторний клік закриває список", () => {
    render(<FloatingChat />);
    const btn = screen.getByRole("button");
    fireEvent.click(btn);
    expect(screen.getByText("Telegram")).toBeInTheDocument();
    fireEvent.click(btn);
    expect(screen.queryByText("Telegram")).not.toBeInTheDocument();
  });

  it("кнопка закриття має aria-label 'Закрити чат'", () => {
    render(<FloatingChat />);
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("button", { name: /закрити чат/i })).toBeInTheDocument();
  });

  it("посилання Telegram веде на t.me", () => {
    render(<FloatingChat />);
    fireEvent.click(screen.getByRole("button"));
    const tgLink = screen.getByRole("menuitem", { name: /telegram/i });
    expect(tgLink.getAttribute("href")).toContain("t.me");
  });

  it("посилання Instagram веде на instagram.com", () => {
    render(<FloatingChat />);
    fireEvent.click(screen.getByRole("button"));
    const igLink = screen.getByRole("menuitem", { name: /instagram/i });
    expect(igLink.getAttribute("href")).toContain("instagram.com");
  });

  it("меню contacts має aria-label='Контакти' у UK локалі", () => {
    render(<FloatingChat />);
    fireEvent.click(screen.getByRole("button", { name: /написати нам/i }));
    expect(screen.getByRole("menu", { name: "Контакти" })).toBeInTheDocument();
  });
});

describe("FloatingChat (EN locale)", () => {
  beforeEach(() => {
    mockLang = "en";
  });

  it("renders toggle button with English aria-label", () => {
    render(<FloatingChat />);
    expect(screen.getByRole("button", { name: /contact us/i })).toBeInTheDocument();
  });

  it("opens messenger list on click", () => {
    render(<FloatingChat />);
    fireEvent.click(screen.getByRole("button", { name: /contact us/i }));
    expect(screen.getByText("Telegram")).toBeInTheDocument();
    expect(screen.getByText("Instagram")).toBeInTheDocument();
  });

  it("close button has English aria-label", () => {
    render(<FloatingChat />);
    fireEvent.click(screen.getByRole("button", { name: /contact us/i }));
    expect(screen.getByRole("button", { name: /close chat/i })).toBeInTheDocument();
  });

  it("menu has aria-label='Contacts' in EN locale", () => {
    render(<FloatingChat />);
    fireEvent.click(screen.getByRole("button", { name: /contact us/i }));
    expect(screen.getByRole("menu", { name: "Contacts" })).toBeInTheDocument();
  });

  it("shows quick answer button in English", () => {
    render(<FloatingChat />);
    fireEvent.click(screen.getByRole("button", { name: /contact us/i }));
    expect(screen.getByText("Quick answer")).toBeInTheDocument();
  });
});
