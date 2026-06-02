/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BookingSection } from "../BookingSection";

jest.mock("@/components/layout/LocaleProvider", () => ({
  useLocale: () => "uk",
}));

jest.mock("@/components/layout/Container", () => ({
  Container: ({ children }: any) => <div>{children}</div>,
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

const services = [
  { name: "Стрижка", price: "300 ₴", duration: "30 хв", icon: "✂️" },
  { name: "Фарбування", price: "800 ₴", duration: "90 хв", icon: "🎨" },
];

const defaultProps = {
  services,
  color: "#6366f1",
  gradient: "from-indigo-500 to-purple-500",
};

describe("BookingSection", () => {
  // 1. Renders h2 with "Онлайн-запис" title
  it('renders h2 with "Онлайн-запис" title', () => {
    render(<BookingSection {...defaultProps} />);
    expect(
      screen.getByRole("heading", { name: /Онлайн-запис/i })
    ).toBeInTheDocument();
  });

  // 2. Shows step nav labels
  it('shows step nav "Послуга", "Дата та час", "Ваші дані", "Підтвердження"', () => {
    render(<BookingSection {...defaultProps} />);
    expect(screen.getByText("Послуга")).toBeInTheDocument();
    expect(screen.getByText("Дата та час")).toBeInTheDocument();
    expect(screen.getByText("Ваші дані")).toBeInTheDocument();
    expect(screen.getByText("Підтвердження")).toBeInTheDocument();
  });

  // 3. Shows service buttons with names
  it("shows service buttons with names (Стрижка, Фарбування)", () => {
    render(<BookingSection {...defaultProps} />);
    expect(
      screen.getByRole("button", { name: /Стрижка/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Фарбування/i })
    ).toBeInTheDocument();
  });

  // 4. "Далі" button is disabled when no service selected
  it('"Далі" button is disabled when no service is selected', () => {
    render(<BookingSection {...defaultProps} />);
    const daliButtons = screen.getAllByRole("button", { name: /Далі/i });
    const daliButton = daliButtons[daliButtons.length - 1];
    expect(daliButton).toBeDisabled();
  });

  // 5. After clicking a service, "Далі" button becomes enabled
  it('"Далі" button becomes enabled after selecting a service', () => {
    render(<BookingSection {...defaultProps} />);
    fireEvent.click(screen.getByRole("button", { name: /Стрижка/i }));
    const daliButtons = screen.getAllByRole("button", { name: /Далі/i });
    const daliButton = daliButtons[daliButtons.length - 1];
    expect(daliButton).not.toBeDisabled();
  });

  // 6. Clicking "Далі" moves to step 1
  it('clicking "Далі" moves to step 1 (date/time heading visible)', () => {
    render(<BookingSection {...defaultProps} />);
    fireEvent.click(screen.getByRole("button", { name: /Стрижка/i }));
    const daliButtons = screen.getAllByRole("button", { name: /Далі/i });
    fireEvent.click(daliButtons[daliButtons.length - 1]);
    expect(
      screen.getByText(/Оберіть дату та час/i)
    ).toBeInTheDocument();
  });

  // 7. On step 1, day buttons are visible (at least 6)
  it("on step 1, at least 6 day buttons are visible", () => {
    render(<BookingSection {...defaultProps} />);
    fireEvent.click(screen.getByRole("button", { name: /Стрижка/i }));
    const daliButtons = screen.getAllByRole("button", { name: /Далі/i });
    fireEvent.click(daliButtons[daliButtons.length - 1]);

    // Day buttons contain a date string like "26.03"
    const allButtons = screen.getAllByRole("button");
    const dayButtons = allButtons.filter((btn) =>
      /\d{2}\.\d{2}/.test(btn.textContent ?? "")
    );
    expect(dayButtons.length).toBeGreaterThanOrEqual(6);
  });

  // 8. On step 1, time slot "09:00" is visible
  it('on step 1, time slot "09:00" is visible', () => {
    render(<BookingSection {...defaultProps} />);
    fireEvent.click(screen.getByRole("button", { name: /Стрижка/i }));
    const daliButtons = screen.getAllByRole("button", { name: /Далі/i });
    fireEvent.click(daliButtons[daliButtons.length - 1]);
    expect(screen.getByText("09:00")).toBeInTheDocument();
  });

  // 9. "← Назад" returns to step 0
  it('"← Назад" returns to step 0', () => {
    render(<BookingSection {...defaultProps} />);
    fireEvent.click(screen.getByRole("button", { name: /Стрижка/i }));
    const daliButtons = screen.getAllByRole("button", { name: /Далі/i });
    fireEvent.click(daliButtons[daliButtons.length - 1]);
    expect(screen.getByText(/Оберіть дату та час/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /← Назад/i }));
    expect(screen.getByText(/Оберіть послугу/i)).toBeInTheDocument();
  });

  // 10. Complete full flow
  it("completes full flow and shows confirmation", () => {
    render(<BookingSection {...defaultProps} />);

    // Step 0: select service
    fireEvent.click(screen.getByRole("button", { name: /Стрижка/i }));
    let daliButtons = screen.getAllByRole("button", { name: /Далі/i });
    fireEvent.click(daliButtons[daliButtons.length - 1]);

    // Step 1: select a day and time slot
    expect(screen.getByText(/Оберіть дату та час/i)).toBeInTheDocument();

    // Day buttons contain a date string like "26.03" or "01.04"
    const allButtons = screen.getAllByRole("button");
    const dayButton = allButtons.find((btn) =>
      /\d{2}\.\d{2}/.test(btn.textContent ?? "")
    );
    expect(dayButton).toBeTruthy();
    fireEvent.click(dayButton!);

    // Select time slot "09:00"
    fireEvent.click(screen.getByText("09:00"));

    daliButtons = screen.getAllByRole("button", { name: /Далі/i });
    fireEvent.click(daliButtons[daliButtons.length - 1]);

    // Step 2: fill in contact details
    expect(screen.getByText(/Ваші контактні дані/i)).toBeInTheDocument();

    const nameInput = screen.getByPlaceholderText(/Наприклад: Олена Коваль/i);
    fireEvent.change(nameInput, { target: { value: "Тест Тестовий" } });

    const phoneInput = screen.getByPlaceholderText(/\+38/i);
    fireEvent.change(phoneInput, { target: { value: "+38 (099) 123-45-67" } });

    // Submit
    fireEvent.click(
      screen.getByRole("button", { name: /Підтвердити запис/i })
    );

    // Step 3: confirmation
    expect(screen.getByText(/Запис підтверджено!/i)).toBeInTheDocument();
  });
});
