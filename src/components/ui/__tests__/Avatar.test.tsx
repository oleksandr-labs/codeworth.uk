/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import { Avatar, AvatarGroup } from "../Avatar";

describe("Avatar", () => {
  it("відображає ініціали для імені з двох слів", () => {
    render(<Avatar name="Олег Коваленко" />);
    expect(screen.getByText("ОК")).toBeInTheDocument();
  });

  it("відображає першу літеру для однослівного імені", () => {
    render(<Avatar name="Олег" />);
    expect(screen.getByText("О")).toBeInTheDocument();
  });

  it("відображає '?' якщо ім'я не вказано", () => {
    render(<Avatar />);
    expect(screen.getByText("?")).toBeInTheDocument();
  });

  it("відображає зображення коли передано src", () => {
    render(<Avatar src="/avatar.jpg" alt="Тест" name="Тест" />);
    const img = screen.getByRole("img", { name: "Тест" });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/avatar.jpg");
  });

  it("статус 'online' показує aria-label='online'", () => {
    render(<Avatar name="Тест" status="online" />);
    const statusDot = document.querySelector("[aria-label='online']");
    expect(statusDot).not.toBeNull();
  });

  it("не показує статус якщо status не вказано", () => {
    render(<Avatar name="Тест" />);
    expect(document.querySelector("[aria-label='online']")).toBeNull();
    expect(document.querySelector("[aria-label='offline']")).toBeNull();
  });
});

describe("AvatarGroup", () => {
  const avatars = [
    { name: "Олег Коваленко" },
    { name: "Марія Левченко" },
    { name: "Іван Петренко" },
    { name: "Тетяна Бойко" },
    { name: "Сергій Мороз" },
  ];

  it("показує max=4 аватарів за замовчуванням", () => {
    render(<AvatarGroup avatars={avatars} />);
    // 4 visible + overflow "+1"
    expect(screen.getByText("+1")).toBeInTheDocument();
  });

  it("показує overflow якщо більше avatars ніж max", () => {
    render(<AvatarGroup avatars={avatars} max={3} />);
    expect(screen.getByText("+2")).toBeInTheDocument();
  });

  it("не показує overflow якщо avatars <= max", () => {
    render(<AvatarGroup avatars={avatars.slice(0, 3)} max={5} />);
    expect(screen.queryByText(/^\+/)).not.toBeInTheDocument();
  });

  it("відображає ініціали для видимих аватарів", () => {
    render(<AvatarGroup avatars={avatars} max={2} />);
    expect(screen.getByText("ОК")).toBeInTheDocument();
    expect(screen.getByText("МЛ")).toBeInTheDocument();
  });
});
