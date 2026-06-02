/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ConfirmDialog } from "../ConfirmDialog";

jest.mock("@/components/layout/LocaleProvider", () => ({
  useLocale: () => "uk",
}));

const BASE_PROPS = {
  title: "Підтвердіть дію",
  message: "Ви впевнені що хочете видалити?",
  onConfirm: jest.fn(),
  onCancel: jest.fn(),
};

describe("ConfirmDialog", () => {
  beforeEach(() => jest.clearAllMocks());

  it("не рендериться якщо isOpen=false", () => {
    render(<ConfirmDialog {...BASE_PROPS} isOpen={false} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("рендериться якщо isOpen=true", () => {
    render(<ConfirmDialog {...BASE_PROPS} isOpen />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("відображає заголовок та повідомлення", () => {
    render(<ConfirmDialog {...BASE_PROPS} isOpen />);
    expect(screen.getByText("Підтвердіть дію")).toBeInTheDocument();
    expect(screen.getByText("Ви впевнені що хочете видалити?")).toBeInTheDocument();
  });

  it("кнопка підтвердження має aria-labelledby", () => {
    render(<ConfirmDialog {...BASE_PROPS} isOpen />);
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-labelledby", "confirm-dialog-title");
  });

  it("клік по 'Підтвердити' викликає onConfirm", () => {
    render(<ConfirmDialog {...BASE_PROPS} isOpen />);
    fireEvent.click(screen.getByRole("button", { name: /підтвердити/i }));
    expect(BASE_PROPS.onConfirm).toHaveBeenCalledTimes(1);
  });

  it("клік по 'Скасувати' викликає onCancel", () => {
    render(<ConfirmDialog {...BASE_PROPS} isOpen />);
    fireEvent.click(screen.getByRole("button", { name: /скасувати/i }));
    expect(BASE_PROPS.onCancel).toHaveBeenCalledTimes(1);
  });

  it("клік по backdrop викликає onCancel", () => {
    render(<ConfirmDialog {...BASE_PROPS} isOpen />);
    // The backdrop is the first absolute div inside the fixed container
    const dialog = screen.getByRole("dialog");
    const backdrop = dialog.querySelector(".absolute.inset-0");
    fireEvent.click(backdrop!);
    expect(BASE_PROPS.onCancel).toHaveBeenCalled();
  });

  it("підтримує кастомні мітки кнопок", () => {
    render(
      <ConfirmDialog
        {...BASE_PROPS}
        isOpen
        confirmLabel="Так, видалити"
        cancelLabel="Ні, залишити"
      />
    );
    expect(screen.getByRole("button", { name: "Так, видалити" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Ні, залишити" })).toBeInTheDocument();
  });

  it("variant='danger' застосовує червоні стилі до кнопки підтвердження", () => {
    render(<ConfirmDialog {...BASE_PROPS} isOpen variant="danger" />);
    const confirmBtn = screen.getByRole("button", { name: /підтвердити/i });
    expect(confirmBtn.className).toContain("bg-red-600");
  });
});
