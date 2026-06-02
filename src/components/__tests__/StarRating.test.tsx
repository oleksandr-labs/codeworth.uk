import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StarRating, RatingBars } from "../ui/StarRating";

jest.mock("@/components/layout/LocaleProvider", () => ({
  useLocale: () => "uk",
}));

describe("StarRating", () => {
  it("renders 5 stars by default", () => {
    render(<StarRating value={3} readonly />);
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(5);
  });

  it("renders correct number of stars with max prop", () => {
    render(<StarRating value={3} max={10} readonly />);
    expect(screen.getAllByRole("button")).toHaveLength(10);
  });

  it("shows aria label with rating value", () => {
    render(<StarRating value={4} max={5} readonly />);
    expect(screen.getByRole("img", { name: /Рейтинг: 4 з 5/i })).toBeInTheDocument();
  });

  it("shows numeric value when showValue=true", () => {
    render(<StarRating value={4.5} showValue readonly />);
    expect(screen.getByText("4.5")).toBeInTheDocument();
  });

  it("shows review count when provided", () => {
    render(<StarRating value={4} reviewCount={128} readonly />);
    expect(screen.getByText(/128/)).toBeInTheDocument();
  });

  it("calls onChange when interactive star is clicked", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<StarRating value={2} onChange={onChange} />);
    const buttons = screen.getAllByRole("button");
    await user.click(buttons[3]); // 4th star
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it("does not call onChange in readonly mode", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<StarRating value={3} onChange={onChange} readonly />);
    const buttons = screen.getAllByRole("button");
    await user.click(buttons[0]);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("disables buttons in readonly mode", () => {
    render(<StarRating value={3} readonly />);
    const buttons = screen.getAllByRole("button");
    buttons.forEach((btn) => expect(btn).toBeDisabled());
  });

  it("does not disable buttons in interactive mode", () => {
    render(<StarRating value={3} onChange={() => {}} />);
    const buttons = screen.getAllByRole("button");
    buttons.forEach((btn) => expect(btn).not.toBeDisabled());
  });
});

describe("RatingBars", () => {
  const distribution = { 5: 50, 4: 30, 3: 15, 2: 4, 1: 1 };
  const total = 100;

  it("renders 5 rating bars", () => {
    render(<RatingBars distribution={distribution} total={total} />);
    // Each star level label (1-5) should appear (multiple elements with same text is fine here)
    expect(screen.getAllByText("5").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("3").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("2").length).toBeGreaterThanOrEqual(1);
  });

  it("renders correct counts", () => {
    render(<RatingBars distribution={distribution} total={total} />);
    // Check for unique counts that won't collide with star labels
    expect(screen.getByText("50")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
    expect(screen.getByText("15")).toBeInTheDocument();
  });

  it("handles zero total without crashing", () => {
    const zeroDist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    expect(() =>
      render(<RatingBars distribution={zeroDist} total={0} />)
    ).not.toThrow();
  });
});
