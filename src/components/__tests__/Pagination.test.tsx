import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Pagination } from "../ui/Pagination";

jest.mock("@/components/layout/LocaleProvider", () => ({ useLocale: () => "uk" }));

describe("Pagination", () => {
  it("returns null when totalPages is 1", () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} onPageChange={() => {}} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("returns null when totalPages is 0", () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={0} onPageChange={() => {}} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders navigation landmark", () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />);
    expect(screen.getByRole("navigation", { name: /пагінація/i })).toBeInTheDocument();
  });

  it("renders page buttons for small totalPages (<= 7)", () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />);
    expect(screen.getByLabelText("Сторінка 1")).toBeInTheDocument();
    expect(screen.getByLabelText("Сторінка 5")).toBeInTheDocument();
  });

  it("marks current page with aria-current=page", () => {
    render(<Pagination currentPage={3} totalPages={5} onPageChange={() => {}} />);
    const current = screen.getByLabelText("Сторінка 3");
    expect(current).toHaveAttribute("aria-current", "page");
  });

  it("disables prev button on first page", () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />);
    expect(screen.getByLabelText("Попередня сторінка")).toBeDisabled();
  });

  it("disables next button on last page", () => {
    render(<Pagination currentPage={5} totalPages={5} onPageChange={() => {}} />);
    expect(screen.getByLabelText("Наступна сторінка")).toBeDisabled();
  });

  it("calls onPageChange with next page when next button clicked", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Pagination currentPage={2} totalPages={5} onPageChange={onChange} />);
    await user.click(screen.getByLabelText("Наступна сторінка"));
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it("calls onPageChange with prev page when prev button clicked", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Pagination currentPage={3} totalPages={5} onPageChange={onChange} />);
    await user.click(screen.getByLabelText("Попередня сторінка"));
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it("calls onPageChange with correct page when page button clicked", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Pagination currentPage={1} totalPages={5} onPageChange={onChange} />);
    await user.click(screen.getByLabelText("Сторінка 4"));
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it("does not show all page buttons for large page counts", () => {
    render(<Pagination currentPage={5} totalPages={20} onPageChange={() => {}} />);
    // With 20 pages, should not show all 20 page buttons (uses windowing)
    const pageButtons = screen
      .getAllByRole("button")
      .filter((b) => b.getAttribute("aria-label")?.startsWith("Сторінка"));
    expect(pageButtons.length).toBeLessThan(20);
  });

  it("always shows first and last page in large page sets", () => {
    render(<Pagination currentPage={10} totalPages={20} onPageChange={() => {}} />);
    expect(screen.getByLabelText("Сторінка 1")).toBeInTheDocument();
    expect(screen.getByLabelText("Сторінка 20")).toBeInTheDocument();
  });
});
