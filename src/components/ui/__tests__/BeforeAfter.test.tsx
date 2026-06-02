/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import { BeforeAfter } from "../BeforeAfter";

jest.mock("@/components/layout/LocaleProvider", () => ({
  useLocale: () => "uk",
}));

describe("BeforeAfter", () => {
  const props = {
    beforeSrc: "/before.jpg",
    afterSrc: "/after.jpg",
    beforeLabel: "До",
    afterLabel: "Після",
  };

  it("відображає обидва зображення", () => {
    render(<BeforeAfter {...props} />);
    expect(screen.getByRole("img", { name: "До" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Після" })).toBeInTheDocument();
  });

  it("контейнер має role='group' з aria-label", () => {
    render(<BeforeAfter {...props} />);
    expect(screen.getByRole("group", { name: /порівняння: до \/ після/i })).toBeInTheDocument();
  });

  it("відображає кнопку-хендл для перетягування", () => {
    render(<BeforeAfter {...props} />);
    expect(screen.getByRole("button", { name: /перетягніть для порівняння/i })).toBeInTheDocument();
  });

  it("відображає мітки 'До' та 'Після'", () => {
    render(<BeforeAfter {...props} />);
    // Labels are spans (pointer-events-none), not buttons
    const labels = screen.getAllByText("До");
    expect(labels.length).toBeGreaterThan(0);
    const afterLabels = screen.getAllByText("Після");
    expect(afterLabels.length).toBeGreaterThan(0);
  });

  it("підтримує кастомні мітки", () => {
    render(<BeforeAfter beforeSrc="/a.jpg" afterSrc="/b.jpg" beforeLabel="Старий дизайн" afterLabel="Новий дизайн" />);
    expect(screen.getAllByText("Старий дизайн").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Новий дизайн").length).toBeGreaterThan(0);
  });

  it("зображення before має правильний src", () => {
    render(<BeforeAfter {...props} />);
    const beforeImg = screen.getByRole("img", { name: "До" });
    expect(beforeImg).toHaveAttribute("src", "/before.jpg");
  });

  it("зображення after має правильний src", () => {
    render(<BeforeAfter {...props} />);
    const afterImg = screen.getByRole("img", { name: "Після" });
    expect(afterImg).toHaveAttribute("src", "/after.jpg");
  });
});
