/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import { Divider } from "../Divider";

describe("Divider", () => {
  it("рендерить горизонтальний роздільник без тексту як <hr>", () => {
    const { container } = render(<Divider />);
    expect(container.querySelector("hr")).not.toBeNull();
  });

  it("має role='separator'", () => {
    render(<Divider />);
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("відображає текст label в горизонтальному роздільнику", () => {
    render(<Divider label="або" />);
    expect(screen.getByText("або")).toBeInTheDocument();
  });

  it("вертикальний роздільник має aria-orientation='vertical'", () => {
    render(<Divider orientation="vertical" />);
    const sep = screen.getByRole("separator");
    expect(sep).toHaveAttribute("aria-orientation", "vertical");
  });

  it("горизонтальний роздільник не має aria-orientation='vertical'", () => {
    render(<Divider />);
    const sep = screen.getByRole("separator");
    expect(sep).not.toHaveAttribute("aria-orientation", "vertical");
  });

  it("приймає кастомний className", () => {
    const { container } = render(<Divider className="my-custom" />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("my-custom");
  });

  it("variant='dashed' застосовує border-dashed", () => {
    const { container } = render(<Divider variant="dashed" />);
    const hr = container.querySelector("hr");
    expect(hr?.className).toContain("border-dashed");
  });
});
