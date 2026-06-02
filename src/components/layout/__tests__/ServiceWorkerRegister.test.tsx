import React from "react";
import { render } from "@testing-library/react";
import { ServiceWorkerRegister } from "../ServiceWorkerRegister";

describe("ServiceWorkerRegister", () => {
  it("рендерить null (не відображає жодного DOM-елемента)", () => {
    const { container } = render(<ServiceWorkerRegister />);
    expect(container.firstChild).toBeNull();
  });

  it("реєструє service worker якщо підтримується браузером", () => {
    const mockRegister = jest.fn().mockResolvedValue({ scope: "/" });
    Object.defineProperty(navigator, "serviceWorker", {
      value: { register: mockRegister },
      writable: true,
      configurable: true,
    });
    render(<ServiceWorkerRegister />);
    expect(mockRegister).toHaveBeenCalledWith(
      expect.stringContaining("/sw.js"),
      { scope: "/" }
    );
  });

  it("не кидає помилку якщо реєстрація SW зазнала невдачі", () => {
    const mockRegister = jest.fn().mockRejectedValue(new Error("SW not supported"));
    Object.defineProperty(navigator, "serviceWorker", {
      value: { register: mockRegister },
      writable: true,
      configurable: true,
    });
    expect(() => render(<ServiceWorkerRegister />)).not.toThrow();
  });
});
