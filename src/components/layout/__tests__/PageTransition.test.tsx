import React from "react";
import { render, screen } from "@testing-library/react";
import { PageTransition } from "../PageTransition";

jest.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("PageTransition", () => {
  it("рендерить дочірні елементи", () => {
    render(
      <PageTransition>
        <p>Тестовий контент</p>
      </PageTransition>
    );
    expect(screen.getByText("Тестовий контент")).toBeInTheDocument();
  });

  it("має клас flex flex-col flex-1", () => {
    const { container } = render(
      <PageTransition>
        <span>child</span>
      </PageTransition>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("flex");
    expect(wrapper.className).toContain("flex-1");
  });

  it("рендерить кілька дочірніх елементів", () => {
    render(
      <PageTransition>
        <h1>Заголовок</h1>
        <p>Параграф</p>
      </PageTransition>
    );
    expect(screen.getByText("Заголовок")).toBeInTheDocument();
    expect(screen.getByText("Параграф")).toBeInTheDocument();
  });
});
