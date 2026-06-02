import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tabs } from "../ui/Tabs";

const TABS = [
  { id: "разові", label: "Разові послуги" },
  { id: "підписка", label: "Підписка" },
  { id: "маркетплейс", label: "Маркетплейс" },
];

describe("Tabs", () => {
  it("renders all tab labels", () => {
    render(<Tabs tabs={TABS}>{() => <div />}</Tabs>);
    expect(screen.getByText("Разові послуги")).toBeInTheDocument();
    expect(screen.getByText("Підписка")).toBeInTheDocument();
    expect(screen.getByText("Маркетплейс")).toBeInTheDocument();
  });

  it("activates first tab by default", () => {
    render(
      <Tabs tabs={TABS}>
        {(active) => <div>Active: {active}</div>}
      </Tabs>
    );
    expect(screen.getByText("Active: разові")).toBeInTheDocument();
  });

  it("respects defaultTab prop", () => {
    render(
      <Tabs tabs={TABS} defaultTab="підписка">
        {(active) => <div>Active: {active}</div>}
      </Tabs>
    );
    expect(screen.getByText("Active: підписка")).toBeInTheDocument();
  });

  it("switches active tab on click", async () => {
    const user = userEvent.setup();
    render(
      <Tabs tabs={TABS}>
        {(active) => <div>Active: {active}</div>}
      </Tabs>
    );
    expect(screen.getByText("Active: разові")).toBeInTheDocument();
    await user.click(screen.getByText("Підписка"));
    expect(screen.getByText("Active: підписка")).toBeInTheDocument();
  });

  it("renders children with correct active tab id", async () => {
    const user = userEvent.setup();
    render(
      <Tabs tabs={TABS}>
        {(active) => <p data-testid="content">{active}</p>}
      </Tabs>
    );
    await user.click(screen.getByText("Маркетплейс"));
    expect(screen.getByTestId("content")).toHaveTextContent("маркетплейс");
  });

  it("applies custom className", () => {
    const { container } = render(
      <Tabs tabs={TABS} className="custom-wrapper">
        {() => <div />}
      </Tabs>
    );
    expect(container.firstChild).toHaveClass("custom-wrapper");
  });

  it("renders with empty tabs gracefully", () => {
    expect(() =>
      render(<Tabs tabs={[]}>{() => <div />}</Tabs>)
    ).not.toThrow();
  });
});
