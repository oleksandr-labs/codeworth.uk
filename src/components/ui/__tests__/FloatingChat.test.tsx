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

  it("меню приховане за замовчуванням", () => {
    render(<FloatingChat />);
    expect(screen.queryByText("Швидка відповідь")).not.toBeInTheDocument();
    expect(screen.queryByText("Форма на сайті")).not.toBeInTheDocument();
  });

  it("клік по кнопці відкриває меню", () => {
    render(<FloatingChat />);
    const btn = screen.getByRole("button", { name: /написати нам/i });
    fireEvent.click(btn);
    expect(screen.getByText("Швидка відповідь")).toBeInTheDocument();
    expect(screen.getByText("Форма на сайті")).toBeInTheDocument();
  });

  it("кнопка отримує aria-expanded=true при відкритті", () => {
    render(<FloatingChat />);
    const btn = screen.getByRole("button");
    expect(btn).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(btn);
    expect(btn).toHaveAttribute("aria-expanded", "true");
  });

  it("повторний клік закриває меню", () => {
    render(<FloatingChat />);
    const btn = screen.getByRole("button");
    fireEvent.click(btn);
    expect(screen.getByText("Швидка відповідь")).toBeInTheDocument();
    fireEvent.click(btn);
    expect(screen.queryByText("Швидка відповідь")).not.toBeInTheDocument();
  });

  it("кнопка закриття має aria-label 'Закрити чат'", () => {
    render(<FloatingChat />);
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("button", { name: /закрити чат/i })).toBeInTheDocument();
  });

  it("посилання 'Форма на сайті' веде на сторінку контактів", () => {
    render(<FloatingChat />);
    fireEvent.click(screen.getByRole("button"));
    const contactLink = screen.getByRole("menuitem", { name: /форма на сайті/i });
    expect(contactLink.getAttribute("href")).toBe("/uk/contact");
  });

  it("клік по 'Швидка відповідь' відкриває чат зі швидкими питаннями", () => {
    render(<FloatingChat />);
    fireEvent.click(screen.getByRole("button", { name: /написати нам/i }));
    fireEvent.click(screen.getByText("Швидка відповідь"));
    expect(screen.getByText("Скільки коштує сайт?")).toBeInTheDocument();
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

  it("opens menu on click", () => {
    render(<FloatingChat />);
    fireEvent.click(screen.getByRole("button", { name: /contact us/i }));
    expect(screen.getByText("Quick answer")).toBeInTheDocument();
    expect(screen.getByText("Contact form")).toBeInTheDocument();
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

  it("contact form link points to /en/contact", () => {
    render(<FloatingChat />);
    fireEvent.click(screen.getByRole("button", { name: /contact us/i }));
    const contactLink = screen.getByRole("menuitem", { name: /contact form/i });
    expect(contactLink.getAttribute("href")).toBe("/en/contact");
  });
});
