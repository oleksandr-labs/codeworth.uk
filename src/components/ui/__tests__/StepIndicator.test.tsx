/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { StepIndicator, Step } from "../StepIndicator";

const STEPS: Step[] = [
  { id: 1, label: "Кошик", description: "Перевірте замовлення" },
  { id: 2, label: "Доставка" },
  { id: 3, label: "Оплата" },
  { id: 4, label: "Підтвердження" },
];

describe("StepIndicator", () => {
  it("відображає всі кроки", () => {
    render(<StepIndicator steps={STEPS} currentStep={1} />);
    expect(screen.getByText("Кошик")).toBeInTheDocument();
    expect(screen.getByText("Доставка")).toBeInTheDocument();
    expect(screen.getByText("Оплата")).toBeInTheDocument();
    expect(screen.getByText("Підтвердження")).toBeInTheDocument();
  });

  it("має role navigation з aria-label", () => {
    render(<StepIndicator steps={STEPS} currentStep={2} ariaLabel="Кроки оформлення" />);
    expect(screen.getByRole("navigation", { name: /кроки оформлення/i })).toBeInTheDocument();
  });

  it("активний крок показує його опис", () => {
    render(<StepIndicator steps={STEPS} currentStep={1} />);
    expect(screen.getByText("Перевірте замовлення")).toBeInTheDocument();
  });

  it("неактивний крок не показує опис", () => {
    render(<StepIndicator steps={STEPS} currentStep={2} />);
    expect(screen.queryByText("Перевірте замовлення")).not.toBeInTheDocument();
  });

  it("завершені кроки не є клікабельними без onStepClick", () => {
    render(<StepIndicator steps={STEPS} currentStep={3} />);
    const buttons = screen.getAllByRole("button");
    // All buttons should be disabled without onStepClick handler
    buttons.forEach((btn) => expect(btn).toBeDisabled());
  });

  it("завершені кроки клікабельні коли надано onStepClick", () => {
    const onStepClick = jest.fn();
    render(<StepIndicator steps={STEPS} currentStep={3} onStepClick={onStepClick} />);
    // Step 1 and 2 are completed (currentStep=3), should be clickable
    const buttons = screen.getAllByRole("button");
    // Click first step button (Кошик - completed)
    fireEvent.click(buttons[0]);
    expect(onStepClick).toHaveBeenCalledWith(1);
  });

  it("поточний та майбутні кроки не є клікабельними навіть з onStepClick", () => {
    const onStepClick = jest.fn();
    render(<StepIndicator steps={STEPS} currentStep={2} onStepClick={onStepClick} />);
    const buttons = screen.getAllByRole("button");
    // Button for step 2 (active) - should be disabled
    fireEvent.click(buttons[1]);
    expect(onStepClick).not.toHaveBeenCalledWith(2);
  });
});
