/**
 * Integration tests for useAuth — tests the full hook flow without mocking the hook itself.
 * These test login → localStorage persistence → hydration → logout.
 */
import { renderHook, act, waitFor } from "@testing-library/react";
import { useAuth } from "../useAuth";

// Mock fetch globally
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();
Object.defineProperty(window, "localStorage", { value: localStorageMock, writable: true });

const DEMO_USER = {
  id: "u_demo",
  email: "demo@codeworth.uk",
  firstName: "Демо",
  lastName: "Користувач",
  role: "user" as const,
};

beforeEach(() => {
  localStorageMock.clear();
  mockFetch.mockReset();
});

describe("useAuth integration — full flow", () => {
  it("login → localStorage → hydrate on next mount → logout clears all", async () => {
    // Step 1: Login
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ user: DEMO_USER }),
    });

    const { result, unmount } = renderHook(() => useAuth());
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.isAuthenticated).toBe(false);

    await act(async () => {
      await result.current.login("demo@codeworth.uk", "demo123");
    });

    expect(result.current.user).toEqual(DEMO_USER);
    expect(result.current.isAuthenticated).toBe(true);

    // Step 2: User is persisted in localStorage
    const stored = JSON.parse(localStorageMock.getItem("Codeworth-auth") ?? "null");
    expect(stored).toEqual(DEMO_USER);

    unmount();

    // Step 3: Re-mount — should hydrate from localStorage
    const { result: result2 } = renderHook(() => useAuth());
    await waitFor(() => expect(result2.current.isLoading).toBe(false));
    expect(result2.current.user).toEqual(DEMO_USER);
    expect(result2.current.isAuthenticated).toBe(true);

    // Step 4: Logout clears state and storage
    act(() => {
      result2.current.logout();
    });

    expect(result2.current.user).toBeNull();
    expect(result2.current.isAuthenticated).toBe(false);
    expect(localStorageMock.getItem("Codeworth-auth")).toBeNull();
  });

  it("failed login does not persist user", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Невірний email або пароль" }),
    });

    const { result } = renderHook(() => useAuth());
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    let loginResult: { success: boolean; error?: string } | undefined;
    await act(async () => {
      loginResult = await result.current.login("bad@example.com", "wrong");
    });

    expect(loginResult?.success).toBe(false);
    expect(result.current.user).toBeNull();
    expect(localStorageMock.getItem("Codeworth-auth")).toBeNull();
  });

  it("updateProfile updates user name and persists to localStorage", async () => {
    // Pre-populate localStorage
    localStorageMock.setItem("Codeworth-auth", JSON.stringify(DEMO_USER));

    const { result } = renderHook(() => useAuth());
    await waitFor(() => expect(result.current.user).toEqual(DEMO_USER));

    act(() => {
      result.current.updateProfile({ firstName: "Олег", lastName: "Коваленко" });
    });

    expect(result.current.user?.firstName).toBe("Олег");
    expect(result.current.user?.lastName).toBe("Коваленко");

    const stored = JSON.parse(localStorageMock.getItem("Codeworth-auth") ?? "null");
    expect(stored.firstName).toBe("Олег");
    expect(stored.lastName).toBe("Коваленко");
    // Other fields unchanged
    expect(stored.email).toBe(DEMO_USER.email);
    expect(stored.id).toBe(DEMO_USER.id);
  });

  it("isLoading settles to false after hydration", async () => {
    const { result } = renderHook(() => useAuth());
    // After effects flush, should be false
    await waitFor(() => expect(result.current.isLoading).toBe(false));
  });

  it("isLoading is true during login and false after", async () => {
    mockFetch.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({
        ok: true,
        json: async () => ({ user: DEMO_USER }),
      }), 50))
    );

    const { result } = renderHook(() => useAuth());
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    let loginPromise: Promise<{ success: boolean }>;
    act(() => {
      loginPromise = result.current.login("demo@codeworth.uk", "demo123");
    });
    expect(result.current.isLoading).toBe(true);

    await act(async () => {
      await loginPromise;
    });
    expect(result.current.isLoading).toBe(false);
  });
});
