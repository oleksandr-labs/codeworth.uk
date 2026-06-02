import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { LightboxDemo } from "../LightboxDemo";
import { SliderDemo } from "../SliderDemo";
import { VisualSitemapDemo } from "../VisualSitemapDemo";

expect.extend(toHaveNoViolations);

jest.mock("@/components/layout/LocaleProvider", () => ({
  useLocale: () => "uk",
}));

describe("LightboxDemo", () => {
  it("renders 2 preset toggle buttons", () => {
    render(<LightboxDemo isUk={true} />);
    expect(screen.getByText(/Галерея портфоліо/i)).toBeInTheDocument();
    expect(screen.getByText(/Фото товару/i)).toBeInTheDocument();
  });

  it("renders gallery images", () => {
    const { container } = render(<LightboxDemo isUk={false} />);
    const imgs = container.querySelectorAll("img, [role='button']");
    expect(imgs.length).toBeGreaterThan(0);
  });

  it("switches preset on click", () => {
    render(<LightboxDemo isUk={false} />);
    const productBtn = screen.getByText("Product photos");
    fireEvent.click(productBtn);
    expect(productBtn).toHaveClass("bg-indigo-600");
  });
});

describe("SliderDemo", () => {
  it("renders carousel region", () => {
    render(<SliderDemo isUk={true} />);
    expect(screen.getByRole("region", { name: /відгуками/i })).toBeInTheDocument();
  });

  it("renders navigation arrows", () => {
    render(<SliderDemo isUk={false} />);
    expect(screen.getByLabelText("Previous")).toBeInTheDocument();
    expect(screen.getByLabelText("Next")).toBeInTheDocument();
  });

  it("renders indicator dots", () => {
    render(<SliderDemo isUk={false} />);
    const dots = screen.getAllByRole("button").filter((b) =>
      /^Slide \d+$/.test(b.getAttribute("aria-label") ?? "")
    );
    expect(dots.length).toBe(4);
  });

  it("toggles pause/play", () => {
    render(<SliderDemo isUk={false} />);
    const pauseBtn = screen.getByLabelText("Pause");
    fireEvent.click(pauseBtn);
    expect(screen.getByLabelText("Play")).toBeInTheDocument();
  });

  it("has no a11y violations", async () => {
    const { container } = render(<SliderDemo isUk={false} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("VisualSitemapDemo", () => {
  it("renders tree role", () => {
    render(<VisualSitemapDemo isUk={true} />);
    expect(screen.getByRole("tree")).toBeInTheDocument();
  });

  it("renders expand/collapse all controls", () => {
    render(<VisualSitemapDemo isUk={false} />);
    expect(screen.getByText("Expand all")).toBeInTheDocument();
    expect(screen.getByText("Collapse all")).toBeInTheDocument();
  });

  it("expands all nodes on Expand all click", () => {
    render(<VisualSitemapDemo isUk={false} />);
    fireEvent.click(screen.getByText("Expand all"));
    // After expand-all, the leaf "Restaurant «Smachno»" should be visible
    expect(screen.getByText(/Restaurant.+Smachno/)).toBeInTheDocument();
  });

  it("collapses all on Collapse all click", () => {
    render(<VisualSitemapDemo isUk={false} />);
    fireEvent.click(screen.getByText("Expand all"));
    fireEvent.click(screen.getByText("Collapse all"));
    // After collapse, the leaf shouldn't be visible
    expect(screen.queryByText(/Restaurant.+Smachno/)).not.toBeInTheDocument();
  });

  it("has no a11y violations", async () => {
    const { container } = render(<VisualSitemapDemo isUk={false} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
