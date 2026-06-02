/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Pagination } from "../Pagination";

jest.mock("@/components/layout/LocaleProvider", () => ({
  useLocale: () => "uk",
}));

describe("Pagination", () => {
  it("не рендериться якщо totalPages <= 1", () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} onPageChange={jest.fn()} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("рендерить навігацію якщо totalPages > 1", () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={jest.fn()} />);
    expect(screen.getByRole("navigation", { name: /пагінація/i })).toBeInTheDocument();
  });

  it("відображає кнопки для всіх сторінок якщо їх <= 7", () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={jest.fn()} />);
    for (let i = 1; i <= 5; i++) {
      expect(screen.getByRole("button", { name: `Сторінка ${i}` })).toBeInTheDocument();
    }
  });

  it("поточна сторінка має aria-current='page'", () => {
    render(<Pagination currentPage={3} totalPages={5} onPageChange={jest.fn()} />);
    const currentBtn = screen.getByRole("button", { name: "Сторінка 3" });
    expect(currentBtn).toHaveAttribute("aria-current", "page");
  });

  it("кнопка 'Попередня' задізейблена на першій сторінці", () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={jest.fn()} />);
    expect(screen.getByRole("button", { name: /попередня сторінка/i })).toBeDisabled();
  });

  it("кнопка 'Наступна' задізейблена на останній сторінці", () => {
    render(<Pagination currentPage={5} totalPages={5} onPageChange={jest.fn()} />);
    expect(screen.getByRole("button", { name: /наступна сторінка/i })).toBeDisabled();
  });

  it("клік на наступну сторінку викликає onPageChange з правильним номером", () => {
    const onPageChange = jest.fn();
    render(<Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByRole("button", { name: "Сторінка 3" }));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("клік на 'Наступна' збільшує сторінку на 1", () => {
    const onPageChange = jest.fn();
    render(<Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByRole("button", { name: /наступна сторінка/i }));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("клік на 'Попередня' зменшує сторінку на 1", () => {
    const onPageChange = jest.fn();
    render(<Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByRole("button", { name: /попередня сторінка/i }));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("відображає '...' для великої кількості сторінок", () => {
    render(<Pagination currentPage={5} totalPages={10} onPageChange={jest.fn()} />);
    // With 10 pages and currentPage=5, there should be ellipsis
    expect(screen.getAllByRole("button").length).toBeLessThan(12); // not all 10 pages shown
  });
});
