import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BeforeAfter } from "../ui/BeforeAfter";

jest.mock("@/components/layout/LocaleProvider", () => ({
  useLocale: () => "uk",
}));

const DEFAULT_PROPS = {
  beforeSrc: "/before.jpg",
  afterSrc: "/after.jpg",
  beforeLabel: "До",
  afterLabel: "Після",
};

describe("BeforeAfter", () => {
  it("renders both images", () => {
    render(<BeforeAfter {...DEFAULT_PROPS} />);
    expect(screen.getByAltText("До")).toBeInTheDocument();
    expect(screen.getByAltText("Після")).toBeInTheDocument();
  });

  it("has role='group' with descriptive aria-label", () => {
    render(<BeforeAfter {...DEFAULT_PROPS} />);
    expect(screen.getByRole("group", { name: /порівняння: до \/ після/i })).toBeInTheDocument();
  });

  it("shows default labels 'До' and 'Після'", () => {
    render(<BeforeAfter {...DEFAULT_PROPS} />);
    expect(screen.getByText("До")).toBeInTheDocument();
    expect(screen.getByText("Після")).toBeInTheDocument();
  });

  it("uses custom labels", () => {
    render(<BeforeAfter beforeSrc="/b.jpg" afterSrc="/a.jpg" beforeLabel="Раніше" afterLabel="Тепер" />);
    expect(screen.getByText("Раніше")).toBeInTheDocument();
    expect(screen.getByText("Тепер")).toBeInTheDocument();
  });

  it("renders drag handle button", () => {
    render(<BeforeAfter {...DEFAULT_PROPS} />);
    expect(screen.getByRole("button", { name: /перетягніть для порівняння/i })).toBeInTheDocument();
  });

  it("accepts custom className", () => {
    const { container } = render(<BeforeAfter {...DEFAULT_PROPS} className="my-class" />);
    expect(container.firstChild).toHaveClass("my-class");
  });

  it("sets initial slider position from prop", () => {
    render(<BeforeAfter {...DEFAULT_PROPS} initialPosition={60} />);
    const handle = screen.getByRole("button", { name: /перетягніть/i });
    expect(handle).toHaveStyle({ left: "60%" });
  });

  it("starts mouse drag on mousedown on handle", () => {
    render(<BeforeAfter {...DEFAULT_PROPS} />);
    const handle = screen.getByRole("button", { name: /перетягніть/i });
    // Should not throw
    expect(() => {
      fireEvent.mouseDown(handle, { preventDefault: jest.fn() });
    }).not.toThrow();
  });

  it("removes event listeners on unmount", () => {
    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");
    const { unmount } = render(<BeforeAfter {...DEFAULT_PROPS} />);
    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith("mousemove", expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith("mouseup", expect.any(Function));
    removeEventListenerSpy.mockRestore();
  });
});
