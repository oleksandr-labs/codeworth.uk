import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ConfirmDialog } from "../ui/ConfirmDialog";

jest.mock("@/components/layout/LocaleProvider", () => ({ useLocale: () => "uk" }));

const defaultProps = {
  isOpen: true,
  title: "Видалити елемент?",
  message: "Цю дію не можна відмінити.",
  onConfirm: jest.fn(),
  onCancel: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("ConfirmDialog", () => {
  it("renders nothing when isOpen=false", () => {
    const { container } = render(
      <ConfirmDialog {...defaultProps} isOpen={false} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders dialog when isOpen=true", () => {
    render(<ConfirmDialog {...defaultProps} />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("shows title and message", () => {
    render(<ConfirmDialog {...defaultProps} />);
    expect(screen.getByText("Видалити елемент?")).toBeInTheDocument();
    expect(screen.getByText("Цю дію не можна відмінити.")).toBeInTheDocument();
  });

  it("renders default button labels", () => {
    render(<ConfirmDialog {...defaultProps} />);
    expect(screen.getByText("Підтвердити")).toBeInTheDocument();
    expect(screen.getByText("Скасувати")).toBeInTheDocument();
  });

  it("renders custom button labels", () => {
    render(
      <ConfirmDialog
        {...defaultProps}
        confirmLabel="Видалити"
        cancelLabel="Назад"
      />
    );
    expect(screen.getByText("Видалити")).toBeInTheDocument();
    expect(screen.getByText("Назад")).toBeInTheDocument();
  });

  it("calls onConfirm when confirm button clicked", async () => {
    const user = userEvent.setup();
    const onConfirm = jest.fn();
    render(<ConfirmDialog {...defaultProps} onConfirm={onConfirm} />);
    await user.click(screen.getByText("Підтвердити"));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("calls onCancel when cancel button clicked", async () => {
    const user = userEvent.setup();
    const onCancel = jest.fn();
    render(<ConfirmDialog {...defaultProps} onCancel={onCancel} />);
    await user.click(screen.getByText("Скасувати"));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("calls onCancel when backdrop clicked", async () => {
    const user = userEvent.setup();
    const onCancel = jest.fn();
    render(<ConfirmDialog {...defaultProps} onCancel={onCancel} />);
    // The backdrop is the absolute div behind the dialog
    const dialog = screen.getByRole("dialog");
    const backdrop = dialog.firstChild as HTMLElement;
    await user.click(backdrop);
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("has aria-modal and aria-labelledby attributes", () => {
    render(<ConfirmDialog {...defaultProps} />);
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-labelledby", "confirm-dialog-title");
  });

  it("title element has correct id for labelling", () => {
    render(<ConfirmDialog {...defaultProps} />);
    expect(screen.getByText("Видалити елемент?").id).toBe("confirm-dialog-title");
  });
});
