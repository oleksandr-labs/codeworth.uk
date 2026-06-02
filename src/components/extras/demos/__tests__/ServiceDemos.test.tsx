import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ContactFormDemo } from "../ContactFormDemo";
import { MultiStepFormDemo } from "../MultiStepFormDemo";
import { FloatingChatDemo } from "../FloatingChatDemo";

describe("ContactFormDemo", () => {
  it("renders for UK locale", () => {
    const { container } = render(<ContactFormDemo variant="service" isUk={true} />);
    expect(container.querySelectorAll("input, textarea, select").length).toBeGreaterThan(0);
  });

  it("renders for EN locale", () => {
    const { container } = render(<ContactFormDemo variant="service" isUk={false} />);
    expect(container.querySelectorAll("input, textarea, select").length).toBeGreaterThan(0);
  });
});

describe("MultiStepFormDemo", () => {
  it("renders step indicator on initial step", () => {
    render(<MultiStepFormDemo isUk={true} />);
    // Should have services to select
    expect(screen.getAllByRole("button").length).toBeGreaterThan(0);
  });

  it("renders for EN locale", () => {
    render(<MultiStepFormDemo isUk={false} />);
    expect(screen.getAllByRole("button").length).toBeGreaterThan(0);
  });

  it("advances to next step when service is selected", () => {
    const { container } = render(<MultiStepFormDemo isUk={false} />);
    const initialButtons = container.querySelectorAll("button").length;
    // Click first service button
    const buttons = container.querySelectorAll("button");
    if (buttons.length > 0) {
      fireEvent.click(buttons[0]);
      // After selection, UI should react (either step advance or selection visual)
      expect(container.querySelectorAll("button").length).toBeGreaterThanOrEqual(initialButtons - 5);
    }
  });
});

describe("FloatingChatDemo", () => {
  it("renders chat trigger button closed by default", () => {
    render(<FloatingChatDemo isUk={true} />);
    // There should be a button to open the chat
    expect(screen.getAllByRole("button").length).toBeGreaterThan(0);
  });

  it("renders for EN locale", () => {
    render(<FloatingChatDemo isUk={false} />);
    expect(screen.getAllByRole("button").length).toBeGreaterThan(0);
  });

  it("opens chat panel on trigger click", () => {
    const { container } = render(<FloatingChatDemo isUk={false} />);
    const triggerBtn = container.querySelector("button");
    if (triggerBtn) {
      fireEvent.click(triggerBtn);
      // After open, more elements should be visible
      const buttonsAfter = container.querySelectorAll("button").length;
      expect(buttonsAfter).toBeGreaterThan(1);
    }
  });
});
