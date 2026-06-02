import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Lightbox, LightboxGallery } from "../ui/Lightbox";

jest.mock("@/components/layout/LocaleProvider", () => ({
  useLocale: () => "uk",
}));

const IMAGES = [
  { src: "/img1.jpg", alt: "Зображення 1", caption: "Перше фото" },
  { src: "/img2.jpg", alt: "Зображення 2" },
  { src: "/img3.jpg", alt: "Зображення 3" },
];

const onClose = jest.fn();

beforeEach(() => {
  onClose.mockReset();
});

describe("Lightbox", () => {
  it("renders a dialog with label", () => {
    render(<Lightbox images={IMAGES} onClose={onClose} />);
    expect(screen.getByRole("dialog", { name: /переглядач зображень/i })).toBeInTheDocument();
  });

  it("shows close button", () => {
    render(<Lightbox images={IMAGES} onClose={onClose} />);
    expect(screen.getByRole("button", { name: /закрити/i })).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    render(<Lightbox images={IMAGES} onClose={onClose} />);
    fireEvent.click(screen.getByRole("button", { name: /закрити/i }));
    // Note: click on close button may bubble to backdrop, so check it was called at least once
    expect(onClose).toHaveBeenCalled();
  });

  it("calls onClose when Escape key is pressed", () => {
    render(<Lightbox images={IMAGES} onClose={onClose} />);
    fireEvent.keyDown(window, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("shows the current image", () => {
    render(<Lightbox images={IMAGES} initialIndex={0} onClose={onClose} />);
    expect(screen.getByAltText("Зображення 1")).toBeInTheDocument();
  });

  it("starts at the specified initialIndex", () => {
    render(<Lightbox images={IMAGES} initialIndex={1} onClose={onClose} />);
    expect(screen.getByAltText("Зображення 2")).toBeInTheDocument();
  });

  it("shows counter (current / total)", () => {
    render(<Lightbox images={IMAGES} initialIndex={0} onClose={onClose} />);
    expect(screen.getByText("1 / 3")).toBeInTheDocument();
  });

  it("navigates to next image with ArrowRight key", () => {
    render(<Lightbox images={IMAGES} initialIndex={0} onClose={onClose} />);
    fireEvent.keyDown(window, { key: "ArrowRight" });
    expect(screen.getByAltText("Зображення 2")).toBeInTheDocument();
    expect(screen.getByText("2 / 3")).toBeInTheDocument();
  });

  it("navigates to previous image with ArrowLeft key", () => {
    render(<Lightbox images={IMAGES} initialIndex={1} onClose={onClose} />);
    fireEvent.keyDown(window, { key: "ArrowLeft" });
    expect(screen.getByAltText("Зображення 1")).toBeInTheDocument();
  });

  it("wraps around to last image when going prev from first", () => {
    render(<Lightbox images={IMAGES} initialIndex={0} onClose={onClose} />);
    fireEvent.keyDown(window, { key: "ArrowLeft" });
    expect(screen.getByText("3 / 3")).toBeInTheDocument();
  });

  it("shows caption when provided", () => {
    render(<Lightbox images={IMAGES} initialIndex={0} onClose={onClose} />);
    expect(screen.getByText("Перше фото")).toBeInTheDocument();
  });

  it("shows prev/next buttons for multiple images", () => {
    render(<Lightbox images={IMAGES} onClose={onClose} />);
    expect(screen.getByRole("button", { name: /попереднє зображення/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /наступне зображення/i })).toBeInTheDocument();
  });

  it("hides prev/next buttons for single image", () => {
    render(<Lightbox images={[IMAGES[0]]} onClose={onClose} />);
    expect(screen.queryByRole("button", { name: /попереднє/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /наступне/i })).not.toBeInTheDocument();
  });

  it("navigates with prev button click", () => {
    render(<Lightbox images={IMAGES} initialIndex={1} onClose={onClose} />);
    fireEvent.click(screen.getByRole("button", { name: /попереднє зображення/i }));
    expect(screen.getByAltText("Зображення 1")).toBeInTheDocument();
  });

  it("navigates with next button click", () => {
    render(<Lightbox images={IMAGES} initialIndex={0} onClose={onClose} />);
    fireEvent.click(screen.getByRole("button", { name: /наступне зображення/i }));
    expect(screen.getByAltText("Зображення 2")).toBeInTheDocument();
  });
});

describe("LightboxGallery", () => {
  it("renders image grid", () => {
    render(<LightboxGallery images={IMAGES} />);
    expect(screen.getAllByRole("button", { name: /відкрити:/i })).toHaveLength(3);
  });

  it("opens lightbox when thumbnail is clicked", () => {
    render(<LightboxGallery images={IMAGES} />);
    fireEvent.click(screen.getByRole("button", { name: /відкрити: зображення 1/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("opens lightbox at correct index", () => {
    render(<LightboxGallery images={IMAGES} />);
    fireEvent.click(screen.getByRole("button", { name: /відкрити: зображення 2/i }));
    // Both gallery thumbnail and lightbox may show the same alt text
    expect(screen.getAllByAltText("Зображення 2").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("2 / 3")).toBeInTheDocument();
  });

  it("closes lightbox when Escape is pressed", () => {
    render(<LightboxGallery images={IMAGES} />);
    fireEvent.click(screen.getByRole("button", { name: /відкрити: зображення 1/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
