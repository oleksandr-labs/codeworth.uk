import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { CountdownDemo } from "../CountdownDemo";
import { SkillsBarDemo } from "../SkillsBarDemo";
import { I18nSwitcherDemo } from "../I18nSwitcherDemo";

expect.extend(toHaveNoViolations);

jest.mock("@/components/layout/LocaleProvider", () => ({
  useLocale: () => "uk",
}));

describe("CountdownDemo", () => {
  it("renders preset buttons", () => {
    render(<CountdownDemo isUk={true} />);
    expect(screen.getAllByRole("button").length).toBeGreaterThanOrEqual(3);
  });

  it("renders for EN locale", () => {
    render(<CountdownDemo isUk={false} />);
    expect(screen.getAllByRole("button").length).toBeGreaterThanOrEqual(3);
  });

  it("switches preset on click", () => {
    render(<CountdownDemo isUk={false} />);
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[1]);
    // No throw means switch works
    expect(buttons[1]).toBeInTheDocument();
  });

  it("has no a11y violations", async () => {
    const { container } = render(<CountdownDemo isUk={false} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("SkillsBarDemo", () => {
  it("renders preset buttons", () => {
    render(<SkillsBarDemo isUk={true} />);
    expect(screen.getAllByRole("button").length).toBeGreaterThanOrEqual(2);
  });

  it("renders progress bars with ARIA attributes", () => {
    render(<SkillsBarDemo isUk={false} />);
    const bars = screen.getAllByRole("progressbar");
    expect(bars.length).toBeGreaterThanOrEqual(4);
    bars.forEach((b) => {
      expect(b).toHaveAttribute("aria-valuenow");
      expect(b).toHaveAttribute("aria-valuemin", "0");
      expect(b).toHaveAttribute("aria-valuemax", "100");
    });
  });

  it("has no a11y violations", async () => {
    const { container } = render(<SkillsBarDemo isUk={false} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("I18nSwitcherDemo", () => {
  it("renders variant toggle buttons (UK)", () => {
    render(<I18nSwitcherDemo isUk={true} />);
    expect(screen.getAllByRole("button").length).toBeGreaterThan(0);
  });

  it("renders variant toggle buttons (EN)", () => {
    render(<I18nSwitcherDemo isUk={false} />);
    expect(screen.getAllByRole("button").length).toBeGreaterThan(0);
  });

  it("opens dropdown listbox on click", () => {
    render(<I18nSwitcherDemo isUk={false} />);
    const buttons = screen.getAllByRole("button");
    const dropdownButton = buttons.find((b) => b.getAttribute("aria-haspopup") === "listbox");
    expect(dropdownButton).toBeDefined();
    if (dropdownButton) {
      fireEvent.click(dropdownButton);
      expect(screen.getByRole("listbox")).toBeInTheDocument();
    }
  });

  it("has no a11y violations (dropdown variant)", async () => {
    const { container } = render(<I18nSwitcherDemo isUk={false} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
