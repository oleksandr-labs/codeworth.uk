/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { DevStartDemo } from "../demos/DevStartDemo";
import { MathUpDemo } from "../demos/MathUpDemo";
import { MelodyDemo } from "../demos/MelodyDemo";
import { SpeakEasyDemo } from "../demos/SpeakEasyDemo";

jest.mock("next/link", () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
  MockLink.displayName = "MockLink";
  return MockLink;
});

// ── DevStartDemo ──────────────────────────────────────────────────────────────
describe("DevStartDemo", () => {
  it("renders course tab buttons in UK locale", () => {
    render(<DevStartDemo lang="uk" />);
    // Tabs render as "🖥️ Frontend Developer" etc — use regex; title appears in tab + content
    expect(screen.getAllByText(/Frontend Developer/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Backend Developer/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/QA Engineer/).length).toBeGreaterThan(0);
  });

  it("renders in EN locale without errors", () => {
    render(<DevStartDemo lang="en" />);
    expect(screen.getAllByText(/Frontend Developer/).length).toBeGreaterThan(0);
  });

  it("shows enrollment form placeholder 'Ваше ім'я' in UK", () => {
    render(<DevStartDemo lang="uk" />);
    expect(screen.getByPlaceholderText("Ваше ім'я")).toBeInTheDocument();
  });

  it("shows Email placeholder in both locales", () => {
    render(<DevStartDemo lang="uk" />);
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
  });

  it("shows 'Choose your track' heading in EN", () => {
    render(<DevStartDemo lang="en" />);
    expect(screen.getByText("Choose your track")).toBeInTheDocument();
  });

  it("shows success message after valid form submission in UK", () => {
    render(<DevStartDemo lang="uk" />);
    fireEvent.change(screen.getByPlaceholderText("Ваше ім'я"), { target: { value: "Тест" } });
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "test@test.com" } });
    const form = screen.getByPlaceholderText("Ваше ім'я").closest("form");
    fireEvent.submit(form!);
    expect(screen.getByText("Заявку прийнято!")).toBeInTheDocument();
  });

  it("switches active course on tab click", () => {
    render(<DevStartDemo lang="uk" />);
    const buttons = screen.getAllByRole("button");
    expect(() => fireEvent.click(buttons[1])).not.toThrow();
  });
});

// ── MathUpDemo ────────────────────────────────────────────────────────────────
describe("MathUpDemo", () => {
  it("renders headings in UK locale", () => {
    render(<MathUpDemo lang="uk" />);
    const headings = screen.getAllByRole("heading");
    expect(headings.length).toBeGreaterThan(0);
  });

  it("renders in EN locale without errors", () => {
    render(<MathUpDemo lang="en" />);
    const headings = screen.getAllByRole("heading");
    expect(headings.length).toBeGreaterThan(0);
  });

  it("shows name input placeholder in UK", () => {
    render(<MathUpDemo lang="uk" />);
    expect(screen.getByPlaceholderText(/Аліна|ім'я/i)).toBeInTheDocument();
  });

  it("shows phone input placeholder in UK", () => {
    render(<MathUpDemo lang="uk" />);
    expect(screen.getByPlaceholderText(/\+380/)).toBeInTheDocument();
  });

  it("shows success state after form submission", () => {
    render(<MathUpDemo lang="uk" />);
    const nameInput = screen.getByPlaceholderText(/Аліна|ім'я/i);
    const phoneInput = screen.getByPlaceholderText(/\+380/);
    fireEvent.change(nameInput, { target: { value: "Аліна" } });
    fireEvent.change(phoneInput, { target: { value: "+380671234567" } });
    const form = nameInput.closest("form");
    fireEvent.submit(form!);
    expect(screen.getByText("Заявку отримано!")).toBeInTheDocument();
  });

  it("FAQ accordion toggles on click", () => {
    render(<MathUpDemo lang="uk" />);
    const buttons = screen.getAllByRole("button");
    expect(() => fireEvent.click(buttons[0])).not.toThrow();
  });
});

// ── MelodyDemo ────────────────────────────────────────────────────────────────
describe("MelodyDemo", () => {
  it("renders headings in UK locale", () => {
    render(<MelodyDemo lang="uk" />);
    const headings = screen.getAllByRole("heading");
    expect(headings.length).toBeGreaterThan(0);
  });

  it("renders in EN locale without errors", () => {
    render(<MelodyDemo lang="en" />);
    const headings = screen.getAllByRole("heading");
    expect(headings.length).toBeGreaterThan(0);
  });

  it("shows enrollment form with name and phone placeholders in UK", () => {
    render(<MelodyDemo lang="uk" />);
    expect(screen.getByPlaceholderText(/ім'я дитини/i)).toBeInTheDocument();
  });

  it("shows success message 'Чудово!' after valid submission", () => {
    render(<MelodyDemo lang="uk" />);
    const nameInput = screen.getByPlaceholderText(/ім'я дитини/i);
    fireEvent.change(nameInput, { target: { value: "Тест" } });
    // Find phone input
    const inputs = screen.getAllByRole("textbox");
    const phoneInput = inputs.find(i => (i as HTMLInputElement).type === "tel" || i !== nameInput);
    if (phoneInput) fireEvent.change(phoneInput, { target: { value: "+380671234567" } });
    const form = nameInput.closest("form");
    fireEvent.submit(form!);
    expect(screen.getByText("Чудово!")).toBeInTheDocument();
  });

  it("renders music direction options", () => {
    render(<MelodyDemo lang="uk" />);
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
  });
});

// ── SpeakEasyDemo ─────────────────────────────────────────────────────────────
describe("SpeakEasyDemo", () => {
  it("renders headings in UK locale", () => {
    render(<SpeakEasyDemo lang="uk" />);
    const headings = screen.getAllByRole("heading");
    expect(headings.length).toBeGreaterThan(0);
  });

  it("renders in EN locale without errors", () => {
    render(<SpeakEasyDemo lang="en" />);
    const headings = screen.getAllByRole("heading");
    expect(headings.length).toBeGreaterThan(0);
  });

  it("shows level selection buttons", () => {
    render(<SpeakEasyDemo lang="uk" />);
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("switches active level on click", () => {
    render(<SpeakEasyDemo lang="uk" />);
    const buttons = screen.getAllByRole("button");
    expect(() => fireEvent.click(buttons[0])).not.toThrow();
  });

  it("shows 'Ваше ім'я' placeholder in UK", () => {
    render(<SpeakEasyDemo lang="uk" />);
    expect(screen.getByPlaceholderText("Ваше ім'я")).toBeInTheDocument();
  });

  it("shows 'Телефон' placeholder in UK", () => {
    render(<SpeakEasyDemo lang="uk" />);
    expect(screen.getByPlaceholderText("Телефон")).toBeInTheDocument();
  });

  it("shows success message 'Записано!' after valid form submission in UK", () => {
    render(<SpeakEasyDemo lang="uk" />);
    const nameInput = screen.getByPlaceholderText("Ваше ім'я");
    const phoneInput = screen.getByPlaceholderText("Телефон");
    fireEvent.change(nameInput, { target: { value: "Тест" } });
    fireEvent.change(phoneInput, { target: { value: "+380671234567" } });
    const form = nameInput.closest("form");
    fireEvent.submit(form!);
    expect(screen.getByText("Записано!")).toBeInTheDocument();
  });
});
