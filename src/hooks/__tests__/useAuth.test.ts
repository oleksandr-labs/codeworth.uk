import { renderHook, act, waitFor } from "@testing-library/react";
import { useAuth } from "../useAuth";

// Mock fetch
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

const MOCK_USER = {
  id: "u1",
  email: "user@example.com",
  firstName: "Іван",
  lastName: "Петренко",
  role: "user" as const,
};

beforeEach(() => {
  localStorageMock.clear();
  mockFetch.mockReset();
});

describe("useAuth", () => {
  it("initializes with no user", async () => {
    const { result } = renderHook(() => useAuth());
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });

  it("loads user from localStorage on mount", async () => {
    localStorageMock.setItem("Codeworth-auth", JSON.stringify(MOCK_USER));
    const { result } = renderHook(() => useAuth());
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.user).toEqual(MOCK_USER);
    expect(result.current.isAuthenticated).toBe(true);
  });

  describe("login", () => {
    it("sets user on successful login", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ user: MOCK_USER }),
      });

      const { result } = renderHook(() => useAuth());
      await waitFor(() => expect(result.current.isLoading).toBe(false));

      let loginResult: { success: boolean; error?: string } | undefined;
      await act(async () => {
        loginResult = await result.current.login("user@example.com", "password123");
      });

      expect(loginResult?.success).toBe(true);
      expect(result.current.user).toEqual(MOCK_USER);
      expect(result.current.isAuthenticated).toBe(true);
    });

    it("saves user to localStorage after login", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ user: MOCK_USER }),
      });

      const { result } = renderHook(() => useAuth());
      await waitFor(() => expect(result.current.isLoading).toBe(false));

      await act(async () => {
        await result.current.login("user@example.com", "password123");
      });

      const stored = JSON.parse(localStorageMock.getItem("Codeworth-auth") ?? "null");
      expect(stored).toEqual(MOCK_USER);
    });

    it("returns error on failed login", async () => {
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
      expect(loginResult?.error).toBe("Невірний email або пароль");
      expect(result.current.user).toBeNull();
    });

    it("returns network error when fetch throws", async () => {
      mockFetch.mockRejectedValueOnce(new Error("Network error"));

      const { result } = renderHook(() => useAuth());
      await waitFor(() => expect(result.current.isLoading).toBe(false));

      let loginResult: { success: boolean; error?: string } | undefined;
      await act(async () => {
        loginResult = await result.current.login("user@example.com", "pass");
      });

      expect(loginResult?.success).toBe(false);
      expect(loginResult?.error).toMatch(/мережева/i);
    });
  });

  describe("logout", () => {
    it("clears user on logout", async () => {
      localStorageMock.setItem("Codeworth-auth", JSON.stringify(MOCK_USER));
      const { result } = renderHook(() => useAuth());
      await waitFor(() => expect(result.current.user).toEqual(MOCK_USER));

      act(() => {
        result.current.logout();
      });

      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
    });

    it("removes user from localStorage on logout", async () => {
      localStorageMock.setItem("Codeworth-auth", JSON.stringify(MOCK_USER));
      const { result } = renderHook(() => useAuth());
      await waitFor(() => expect(result.current.user).toEqual(MOCK_USER));

      act(() => {
        result.current.logout();
      });

      expect(localStorageMock.getItem("Codeworth-auth")).toBeNull();
    });
  });

  describe("updateProfile", () => {
    it("updates firstName in state and localStorage", async () => {
      localStorageMock.setItem("Codeworth-auth", JSON.stringify(MOCK_USER));
      const { result } = renderHook(() => useAuth());
      await waitFor(() => expect(result.current.user).toEqual(MOCK_USER));

      act(() => {
        result.current.updateProfile({ firstName: "Олег" });
      });

      expect(result.current.user?.firstName).toBe("Олег");
      const stored = JSON.parse(localStorageMock.getItem("Codeworth-auth") ?? "null");
      expect(stored.firstName).toBe("Олег");
    });

    it("does not crash when no user is logged in", () => {
      const { result } = renderHook(() => useAuth());
      expect(() => {
        act(() => {
          result.current.updateProfile({ firstName: "Test" });
        });
      }).not.toThrow();
    });
  });
});
