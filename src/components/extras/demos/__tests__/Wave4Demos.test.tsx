import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { VideoDemo } from "../VideoDemo";
import { InteractiveMapDemo } from "../InteractiveMapDemo";
import { WebPushDemo } from "../WebPushDemo";

expect.extend(toHaveNoViolations);

describe("VideoDemo", () => {
  it("renders 3 variant buttons", () => {
    render(<VideoDemo isUk={true} />);
    expect(screen.getByText(/Hero фонове відео/i)).toBeInTheDocument();
    expect(screen.getByText(/YouTube/i)).toBeInTheDocument();
    expect(screen.getByText(/Кейс-стаді/i)).toBeInTheDocument();
  });

  it("switches between variants", () => {
    render(<VideoDemo isUk={false} />);
    fireEvent.click(screen.getByText("YouTube/Vimeo embed"));
    expect(screen.getByText(/Codeworth Showreel/i)).toBeInTheDocument();
  });

  it("toggles mute on hero variant", () => {
    render(<VideoDemo isUk={false} />);
    const unmuteBtn = screen.getByLabelText("Unmute");
    fireEvent.click(unmuteBtn);
    expect(screen.getByLabelText("Mute")).toBeInTheDocument();
  });

  it("has no a11y violations", async () => {
    const { container } = render(<VideoDemo isUk={false} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("InteractiveMapDemo", () => {
  it("renders all 4 category filters", () => {
    render(<InteractiveMapDemo isUk={true} />);
    expect(screen.getByText(/Всі/i)).toBeInTheDocument();
    expect(screen.getByText(/Кав'ярні/i)).toBeInTheDocument();
    expect(screen.getByText(/Самовивіз/i)).toBeInTheDocument();
    expect(screen.getByText(/Офіс/i)).toBeInTheDocument();
  });

  it("renders 8 markers initially", () => {
    render(<InteractiveMapDemo isUk={false} />);
    const markers = screen.getAllByRole("button").filter((b) => {
      const label = b.getAttribute("aria-label") ?? "";
      return /Kyiv|Lviv|Odesa|Kharkiv|Dnipro/.test(label);
    });
    expect(markers.length).toBe(8);
  });

  it("opens popup on marker click", () => {
    render(<InteractiveMapDemo isUk={false} />);
    const marker = screen.getAllByRole("button").find((b) =>
      b.getAttribute("aria-label")?.includes("Khreshchatyk")
    );
    expect(marker).toBeDefined();
    if (marker) {
      fireEvent.click(marker);
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    }
  });

  it("filters markers by category", () => {
    render(<InteractiveMapDemo isUk={false} />);
    fireEvent.click(screen.getByText(/Office/i));
    const markers = screen.getAllByRole("button").filter((b) =>
      /^Kyiv|^Lviv|^Odesa|^Kharkiv|^Dnipro/.test(b.getAttribute("aria-label") ?? "")
    );
    expect(markers.length).toBe(1);
  });

  it("has no a11y violations", async () => {
    const { container } = render(<InteractiveMapDemo isUk={false} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("WebPushDemo", () => {
  it("renders segment checkboxes", () => {
    render(<WebPushDemo isUk={true} />);
    expect(screen.getAllByText(/Нові статті/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Акції/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Нагадування/i).length).toBeGreaterThan(0);
  });

  it("disables subscribe when no segments selected", () => {
    render(<WebPushDemo isUk={false} />);
    // Uncheck the default-checked segment
    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[0]);
    const subscribeBtn = screen.getByText(/Subscribe \(0/i);
    expect(subscribeBtn.closest("button")).toBeDisabled();
  });

  it("shows permission prompt after subscribe click", () => {
    render(<WebPushDemo isUk={false} />);
    const subscribeBtn = screen.getByText(/Subscribe/i).closest("button");
    if (subscribeBtn) {
      fireEvent.click(subscribeBtn);
      expect(screen.getByText(/Wants to send/i)).toBeInTheDocument();
    }
  });

  it("transitions to subscribed state on Allow", () => {
    render(<WebPushDemo isUk={false} />);
    const subscribeBtn = screen.getByText(/Subscribe/i).closest("button");
    if (subscribeBtn) {
      fireEvent.click(subscribeBtn);
      fireEvent.click(screen.getByText("Allow"));
      expect(screen.getByText(/You're subscribed/i)).toBeInTheDocument();
    }
  });

  it("has no a11y violations", async () => {
    const { container } = render(<WebPushDemo isUk={false} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
