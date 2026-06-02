import { render, screen } from "@testing-library/react";
import { Divider } from "@/components/ui/Divider";

describe("Divider", () => {
  it("renders a horizontal rule when no label", () => {
    const { container } = render(<Divider />);
    expect(container.querySelector("hr")).toBeInTheDocument();
  });

  it("renders label text when provided", () => {
    render(<Divider label="або" />);
    expect(screen.getByText("або")).toBeInTheDocument();
  });

  it("has role=separator", () => {
    render(<Divider />);
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("renders vertical orientation", () => {
    const { container } = render(<Divider orientation="vertical" />);
    const el = container.firstChild as HTMLElement;
    expect(el.getAttribute("aria-orientation")).toBe("vertical");
  });

  it("renders dashed variant without crashing", () => {
    const { container } = render(<Divider variant="dashed" />);
    expect(container.querySelector("hr")).toBeInTheDocument();
  });

  it("renders dotted variant without crashing", () => {
    const { container } = render(<Divider variant="dotted" />);
    expect(container.querySelector("hr")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<Divider className="my-divider" />);
    expect(container.firstChild).toHaveClass("my-divider");
  });

  it("renders label with left align", () => {
    render(<Divider label="Ліво" align="left" />);
    expect(screen.getByText("Ліво")).toBeInTheDocument();
  });

  it("renders label with right align", () => {
    render(<Divider label="Право" align="right" />);
    expect(screen.getByText("Право")).toBeInTheDocument();
  });
});
