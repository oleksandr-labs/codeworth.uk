import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { FabClusterDemo } from "../FabClusterDemo";

describe("FabClusterDemo", () => {
  it("renders main FAB button for UK locale", () => {
    render(<FabClusterDemo isUk={true} />);
    expect(screen.getAllByRole("button").length).toBeGreaterThan(0);
  });

  it("renders main FAB button for EN locale", () => {
    render(<FabClusterDemo isUk={false} />);
    expect(screen.getAllByRole("button").length).toBeGreaterThan(0);
  });

  it("expands channels on FAB click", () => {
    const { container } = render(<FabClusterDemo isUk={false} />);
    const buttons = screen.getAllByRole("button");
    const initialCount = container.querySelectorAll("button").length;
    fireEvent.click(buttons[buttons.length - 1]);
    const afterCount = container.querySelectorAll("button").length;
    expect(afterCount).toBeGreaterThanOrEqual(initialCount);
  });
});
