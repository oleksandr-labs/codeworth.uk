/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import { Badge } from "../Badge";

describe("Badge", () => {
  it("відображає текст контенту", () => {
    render(<Badge>Новинка</Badge>);
    expect(screen.getByText("Новинка")).toBeInTheDocument();
  });

  it("за замовчуванням використовує variant='default'", () => {
    render(<Badge>Тест</Badge>);
    const badge = screen.getByText("Тест");
    expect(badge.className).toContain("bg-neutral-100");
  });

  it("variant='success' застосовує зелені кольори", () => {
    render(<Badge variant="success">Успіх</Badge>);
    expect(screen.getByText("Успіх").className).toContain("bg-emerald-100");
  });

  it("variant='error' застосовує червоні кольори", () => {
    render(<Badge variant="error">Помилка</Badge>);
    expect(screen.getByText("Помилка").className).toContain("bg-red-100");
  });

  it("variant='hot' застосовує яскраво-червоний фон", () => {
    render(<Badge variant="hot">HOT</Badge>);
    expect(screen.getByText("HOT").className).toContain("bg-red-500");
  });

  it("variant='new' застосовує індиго фон", () => {
    render(<Badge variant="new">NEW</Badge>);
    expect(screen.getByText("NEW").className).toContain("bg-indigo-600");
  });

  it("variant='sale' застосовує бурштиновий фон", () => {
    render(<Badge variant="sale">-20%</Badge>);
    expect(screen.getByText("-20%").className).toContain("bg-amber-400");
  });

  it("приймає кастомний className", () => {
    render(<Badge className="custom-class">Кастом</Badge>);
    expect(screen.getByText("Кастом").className).toContain("custom-class");
  });

  it("рендерить як span", () => {
    render(<Badge>Span</Badge>);
    expect(screen.getByText("Span").tagName).toBe("SPAN");
  });
});
