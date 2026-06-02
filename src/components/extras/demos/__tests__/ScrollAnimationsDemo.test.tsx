import React from "react";
import { render, screen } from "@testing-library/react";
import { ScrollAnimationsDemo } from "../ScrollAnimationsDemo";

describe("ScrollAnimationsDemo", () => {
  it("renders animation type buttons for UK locale", () => {
    render(<ScrollAnimationsDemo isUk={true} />);
    expect(screen.getAllByRole("button").length).toBeGreaterThanOrEqual(3);
  });

  it("renders animation type buttons for EN locale", () => {
    render(<ScrollAnimationsDemo isUk={false} />);
    expect(screen.getAllByRole("button").length).toBeGreaterThanOrEqual(3);
  });

  it("has replay button", () => {
    render(<ScrollAnimationsDemo isUk={false} />);
    const buttons = screen.getAllByRole("button");
    const hasReplayLike = buttons.some((b) =>
      /replay|play|повторити|анімація/i.test(b.textContent ?? "")
    );
    expect(hasReplayLike).toBe(true);
  });
});
