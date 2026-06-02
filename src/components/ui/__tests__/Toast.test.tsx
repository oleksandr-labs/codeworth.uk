/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { ToastProvider, useToast } from "../Toast";

// Helper component that triggers toasts
function ToastTrigger({ type, message }: { type: "success" | "error" | "warning" | "info"; message: string }) {
  const { toast } = useToast();
  return <button onClick={() => toast(type, message)}>show</button>;
}

function setup(type: "success" | "error" | "warning" | "info", message: string) {
  render(
    <ToastProvider>
      <ToastTrigger type={type} message={message} />
    </ToastProvider>
  );
  fireEvent.click(screen.getByRole("button", { name: "show" }));
}

describe("Toast / ToastProvider", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it("відображає повідомлення після виклику toast()", () => {
    setup("success", "Форму надіслано!");
    expect(screen.getByText("Форму надіслано!")).toBeInTheDocument();
  });

  it("toast type success рендериться з role=alert", () => {
    setup("success", "Успіх");
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("toast type error рендериться", () => {
    setup("error", "Сталася помилка");
    expect(screen.getByText("Сталася помилка")).toBeInTheDocument();
  });

  it("кнопка закриття видаляє toast", () => {
    setup("info", "Інформація");
    expect(screen.getByText("Інформація")).toBeInTheDocument();
    // The close button is inside the alert (dismiss button, has no text)
    const alert = screen.getByRole("alert");
    const closeBtn = alert.querySelector("button")!;
    fireEvent.click(closeBtn);
    expect(screen.queryByText("Інформація")).not.toBeInTheDocument();
  });

  it("toast автоматично зникає через duration", () => {
    setup("warning", "Попередження");
    expect(screen.getByText("Попередження")).toBeInTheDocument();
    act(() => jest.advanceTimersByTime(4000));
    expect(screen.queryByText("Попередження")).not.toBeInTheDocument();
  });

  it("useToast кидає помилку поза ToastProvider", () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    function BadComponent() {
      useToast();
      return null;
    }
    expect(() => render(<BadComponent />)).toThrow("useToast must be used within ToastProvider");
    consoleSpy.mockRestore();
  });

  it("можна показати кілька toast одночасно", () => {
    render(
      <ToastProvider>
        <ToastTrigger type="success" message="Перший" />
      </ToastProvider>
    );
    fireEvent.click(screen.getByRole("button", { name: "show" }));
    fireEvent.click(screen.getByRole("button", { name: "show" }));
    expect(screen.getAllByRole("alert").length).toBe(2);
  });
});
