import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StepIndicator } from "../ui/StepIndicator";

jest.mock("@/components/layout/LocaleProvider", () => ({ useLocale: () => "uk" }));

const STEPS = [
  { id: 1, label: "Кошик", description: "Перевірте товари" },
  { id: 2, label: "Доставка" },
  { id: 3, label: "Оплата" },
  { id: 4, label: "Підтвердження" },
];

describe("StepIndicator", () => {
  it("renders all step labels on desktop (sm: hidden is applied)", () => {
    render(<StepIndicator steps={STEPS} currentStep={1} />);
    // Labels are rendered in DOM even if visually hidden on mobile
    expect(screen.getByText("Кошик")).toBeInTheDocument();
    expect(screen.getByText("Доставка")).toBeInTheDocument();
    expect(screen.getByText("Оплата")).toBeInTheDocument();
    expect(screen.getByText("Підтвердження")).toBeInTheDocument();
  });

  it("renders navigation landmark", () => {
    render(<StepIndicator steps={STEPS} currentStep={1} ariaLabel="Кроки оформлення" />);
    expect(screen.getByRole("navigation", { name: /кроки/i })).toBeInTheDocument();
  });

  it("shows step id number for pending steps", () => {
    render(<StepIndicator steps={STEPS} currentStep={1} />);
    // Steps 2, 3, 4 are pending and show their id number
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
  });

  it("shows description for active step", () => {
    render(<StepIndicator steps={STEPS} currentStep={1} />);
    expect(screen.getByText("Перевірте товари")).toBeInTheDocument();
  });

  it("does not show description for non-active step", () => {
    render(<StepIndicator steps={STEPS} currentStep={2} />);
    expect(screen.queryByText("Перевірте товари")).not.toBeInTheDocument();
  });

  it("disables completed steps when no onStepClick provided", () => {
    render(<StepIndicator steps={STEPS} currentStep={3} />);
    const buttons = screen.getAllByRole("button");
    // Without onStepClick, all buttons are disabled
    buttons.forEach((btn) => expect(btn).toBeDisabled());
  });

  it("enables completed steps when onStepClick provided", () => {
    render(
      <StepIndicator steps={STEPS} currentStep={3} onStepClick={() => {}} />
    );
    const buttons = screen.getAllByRole("button");
    // Steps 1 and 2 are completed (currentStep=3), so they should be enabled
    expect(buttons[0]).not.toBeDisabled(); // step 1 (completed)
    expect(buttons[1]).not.toBeDisabled(); // step 2 (completed)
    expect(buttons[2]).toBeDisabled(); // step 3 (active)
    expect(buttons[3]).toBeDisabled(); // step 4 (pending)
  });

  it("calls onStepClick when completed step button clicked", async () => {
    const user = userEvent.setup();
    const onStepClick = jest.fn();
    render(
      <StepIndicator steps={STEPS} currentStep={3} onStepClick={onStepClick} />
    );
    await user.click(screen.getByText("Кошик").closest("button")!);
    expect(onStepClick).toHaveBeenCalledWith(1);
  });

  it("does not call onStepClick for active step", async () => {
    const user = userEvent.setup();
    const onStepClick = jest.fn();
    render(
      <StepIndicator steps={STEPS} currentStep={2} onStepClick={onStepClick} />
    );
    await user.click(screen.getByText("Доставка").closest("button")!);
    expect(onStepClick).not.toHaveBeenCalled();
  });
});
