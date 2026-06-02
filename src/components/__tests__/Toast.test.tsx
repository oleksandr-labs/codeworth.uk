import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToastProvider, useToast } from "../ui/Toast";

// Helper component to trigger toasts
function ToastTrigger({ type, message }: { type: "success" | "error" | "warning" | "info"; message: string }) {
  const { toast } = useToast();
  return (
    <button onClick={() => toast(type, message)}>
      Show {type}
    </button>
  );
}

function renderWithProvider(
  type: "success" | "error" | "warning" | "info",
  message: string
) {
  return render(
    <ToastProvider>
      <ToastTrigger type={type} message={message} />
    </ToastProvider>
  );
}

describe("ToastProvider / useToast", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runAllTimers();
    });
    jest.useRealTimers();
  });

  it("shows success toast when triggered", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    renderWithProvider("success", "Збережено успішно!");
    await user.click(screen.getByText("Show success"));
    expect(screen.getByText("Збережено успішно!")).toBeInTheDocument();
  });

  it("shows error toast when triggered", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    renderWithProvider("error", "Щось пішло не так");
    await user.click(screen.getByText("Show error"));
    expect(screen.getByText("Щось пішло не так")).toBeInTheDocument();
  });

  it("shows warning toast when triggered", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    renderWithProvider("warning", "Увага: перевірте дані");
    await user.click(screen.getByText("Show warning"));
    expect(screen.getByText("Увага: перевірте дані")).toBeInTheDocument();
  });

  it("shows info toast when triggered", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    renderWithProvider("info", "Нова версія доступна");
    await user.click(screen.getByText("Show info"));
    expect(screen.getByText("Нова версія доступна")).toBeInTheDocument();
  });

  it("toast has role=alert for accessibility", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    renderWithProvider("success", "Привіт!");
    await user.click(screen.getByText("Show success"));
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("dismisses toast when close button clicked", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    renderWithProvider("success", "Тост для закриття");
    await user.click(screen.getByText("Show success"));
    expect(screen.getByText("Тост для закриття")).toBeInTheDocument();
    // Find the close button — it's the button that does NOT contain toast trigger text
    const buttons = screen.getAllByRole("button");
    const closeBtn = buttons.find((b) => !b.textContent?.includes("Show"));
    await user.click(closeBtn!);
    expect(screen.queryByText("Тост для закриття")).not.toBeInTheDocument();
  });

  it("auto-dismisses toast after duration", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <ToastProvider>
        <ToastTrigger type="success" message="Автозакриття" />
      </ToastProvider>
    );
    await user.click(screen.getByText("Show success"));
    expect(screen.getByText("Автозакриття")).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    expect(screen.queryByText("Автозакриття")).not.toBeInTheDocument();
  });

  it("throws error when useToast is used outside provider", () => {
    const consoleError = jest.spyOn(console, "error").mockImplementation(() => {});
    function BadComponent() {
      useToast();
      return null;
    }
    expect(() => render(<BadComponent />)).toThrow(
      "useToast must be used within ToastProvider"
    );
    consoleError.mockRestore();
  });
});

describe("Badge", () => {
  // Basic Badge tests here since the component is small
});
