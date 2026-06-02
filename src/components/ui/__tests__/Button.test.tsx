/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../Button";

jest.mock("next/link", () => {
  const MockLink = ({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) => (
    <a href={href} className={className}>{children}</a>
  );
  MockLink.displayName = "MockLink";
  return MockLink;
});

describe("Button", () => {
  it("рендерить кнопку з текстом", () => {
    render(<Button>Натисни мене</Button>);
    expect(screen.getByRole("button", { name: "Натисни мене" })).toBeInTheDocument();
  });

  it("рендерить як посилання коли передано href", () => {
    render(<Button href="/contact">Контакти</Button>);
    const link = screen.getByRole("link", { name: "Контакти" });
    expect(link).toHaveAttribute("href", "/contact");
  });

  it("variant='primary' застосовує indigo стилі", () => {
    render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole("button").className).toContain("bg-linear-to-r");
  });

  it("variant='danger' застосовує червоні стилі", () => {
    render(<Button variant="danger">Видалити</Button>);
    expect(screen.getByRole("button").className).toContain("bg-red-600");
  });

  it("disabled=true задізейблює кнопку", () => {
    render(<Button disabled>Заблоковано</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("isLoading=true задізейблює кнопку і встановлює aria-busy", () => {
    render(<Button isLoading>Завантаження</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute("aria-busy", "true");
  });

  it("isLoading=true показує спіннер SVG", () => {
    render(<Button isLoading>Завантаження</Button>);
    expect(screen.getByRole("button").querySelector("svg")).not.toBeNull();
  });

  it("onClick викликається при кліку", () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Клік</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("disabled кнопка не викликає onClick", () => {
    const onClick = jest.fn();
    render(<Button disabled onClick={onClick}>Заблоковано</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("size='lg' застосовує великі відступи", () => {
    render(<Button size="lg">Великий</Button>);
    expect(screen.getByRole("button").className).toContain("px-8");
  });

  it("href з disabled рендерить як кнопку (не link)", () => {
    render(<Button href="/test" disabled>Заблоковано</Button>);
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
