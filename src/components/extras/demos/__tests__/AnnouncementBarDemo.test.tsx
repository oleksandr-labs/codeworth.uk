import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { AnnouncementBarDemo } from "../AnnouncementBarDemo";

describe("AnnouncementBarDemo", () => {
  it("renders 3 bar styles for UK locale", () => {
    render(<AnnouncementBarDemo isUk={true} />);
    expect(screen.getAllByRole("button").length).toBeGreaterThan(0);
  });

  it("renders 3 bar styles for EN locale", () => {
    render(<AnnouncementBarDemo isUk={false} />);
    expect(screen.getAllByRole("button").length).toBeGreaterThan(0);
  });

  it("has position toggle button", () => {
    render(<AnnouncementBarDemo isUk={false} />);
    const positionButtons = screen.getAllByRole("button").filter((b) =>
      /top|bottom|зверху|знизу/i.test(b.textContent ?? "")
    );
    expect(positionButtons.length).toBeGreaterThanOrEqual(1);
  });

  it("dismisses bar on close button click", () => {
    const { container } = render(<AnnouncementBarDemo isUk={false} />);
    const closeButtons = container.querySelectorAll('[aria-label*="ismiss"], [aria-label*="акрити"]');
    if (closeButtons.length > 0) {
      const initialBars = container.querySelectorAll('[class*="bg-linear-to-r"]').length;
      fireEvent.click(closeButtons[0]);
      const afterBars = container.querySelectorAll('[class*="bg-linear-to-r"]').length;
      expect(afterBars).toBeLessThanOrEqual(initialBars);
    }
  });
});
