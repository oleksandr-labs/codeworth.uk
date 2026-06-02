import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AccountClient from "../AccountClient";
import { ToastProvider } from "@/components/ui/Toast";

const renderAccount = () => render(<ToastProvider><AccountClient /></ToastProvider>);

// Mock next/link
jest.mock("next/link", () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
  MockLink.displayName = "MockLink";
  return MockLink;
});

jest.mock("@/components/layout/LocaleProvider", () => ({
  useLocale: () => "uk",
}));

// Mock next/navigation
const mockReplace = jest.fn();
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ replace: mockReplace, push: mockPush }),
  useParams: () => ({ lang: "uk" }),
}));

// Mock Container
jest.mock("@/components/layout/Container", () => ({
  Container: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock Skeleton
jest.mock("@/components/ui/Skeleton", () => ({
  Skeleton: ({ className }: { className?: string }) => (
    <div data-testid="skeleton" className={className} />
  ),
}));

// Mock useAuth
const mockLogout = jest.fn();
const mockUseAuth = {
  user: {
    id: "u_demo",
    firstName: "Демо",
    lastName: "Користувач",
    email: "demo@codenest.com.ua",
    role: "user" as const,
  },
  isAuthenticated: true,
  isLoading: false,
  logout: mockLogout,
};

jest.mock("@/hooks/useAuth", () => ({
  useAuth: () => mockUseAuth,
}));

beforeEach(() => {
  jest.clearAllMocks();
  mockUseAuth.isLoading = false;
  mockUseAuth.isAuthenticated = true;
  mockUseAuth.user = {
    id: "u_demo",
    firstName: "Демо",
    lastName: "Користувач",
    email: "demo@codenest.com.ua",
    role: "user" as const,
  };
});

describe("AccountClient", () => {
  it("shows skeleton when isLoading is true", () => {
    mockUseAuth.isLoading = true;
    renderAccount();
    expect(screen.getAllByTestId("skeleton").length).toBeGreaterThan(0);
  });

  it("shows skeleton when not authenticated", () => {
    mockUseAuth.isAuthenticated = false;
    renderAccount();
    expect(screen.getAllByTestId("skeleton").length).toBeGreaterThan(0);
  });

  it("redirects to login when not authenticated after loading", () => {
    mockUseAuth.isLoading = false;
    mockUseAuth.isAuthenticated = false;
    renderAccount();
    expect(mockReplace).toHaveBeenCalledWith("/uk/marketplace/login");
  });

  it("does not redirect when authenticated", () => {
    renderAccount();
    expect(mockReplace).not.toHaveBeenCalled();
  });

  it("displays user full name", () => {
    renderAccount();
    expect(screen.getByText("Демо Користувач")).toBeInTheDocument();
  });

  it("displays user email", () => {
    renderAccount();
    expect(screen.getByText("demo@codenest.com.ua")).toBeInTheDocument();
  });

  it("displays user initials", () => {
    renderAccount();
    expect(screen.getByText("ДК")).toBeInTheDocument();
  });

  it("calls logout and navigates to login when logout button is clicked", () => {
    renderAccount();
    fireEvent.click(screen.getByRole("button", { name: /вийти/i }));
    expect(mockLogout).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith("/uk/marketplace/login");
  });

  it("shows dashboard tab content by default", () => {
    renderAccount();
    // Dashboard shows a greeting heading
    expect(screen.getByRole("heading", { name: /вітаємо/i })).toBeInTheDocument();
  });

  it("switches to orders tab when clicked", () => {
    renderAccount();
    fireEvent.click(screen.getAllByRole("button", { name: /замовлення/i })[0]);
    // Orders section shows mock order IDs
    expect(screen.getAllByText(/CN-4821|CN-4756|CN-4699/).length).toBeGreaterThan(0);
  });

  it("switches to projects tab when clicked", () => {
    renderAccount();
    fireEvent.click(screen.getAllByRole("button", { name: /мої сайти/i })[0]);
    expect(screen.getAllByText(/smak-restaurant|beauty-lena/i).length).toBeGreaterThan(0);
  });

  it("switches to invoices tab when clicked", () => {
    renderAccount();
    fireEvent.click(screen.getAllByRole("button", { name: /рахунки/i })[0]);
    expect(screen.getAllByText(/INV-221|INV-198/).length).toBeGreaterThan(0);
  });

  it("shows nav items: Огляд, Замовлення, Мої сайти, Рахунки, Підтримка, Налаштування", () => {
    renderAccount();
    expect(screen.getAllByRole("button", { name: /огляд/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("button", { name: /замовлення/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("button", { name: /мої сайти/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("button", { name: /рахунки/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("button", { name: /підтримка/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("button", { name: /налаштування/i }).length).toBeGreaterThan(0);
  });

  it("orders tab shows file archive for completed orders", () => {
    renderAccount();
    fireEvent.click(screen.getAllByRole("button", { name: /замовлення/i })[0]);
    // Completed order CN-4821 has mock files listed
    expect(screen.getByText(/Файли та архів/i)).toBeInTheDocument();
    expect(screen.getByText(/demo-restaurant\.zip/i)).toBeInTheDocument();
  });

  it("support tab shows communication history with manager messages", () => {
    renderAccount();
    fireEvent.click(screen.getAllByRole("button", { name: /підтримка/i })[0]);
    // Mock messages: first manager message text
    expect(screen.getByText(/Вітаємо! Ваше замовлення прийнято/i)).toBeInTheDocument();
  });

  it("support tab has send message input", () => {
    renderAccount();
    fireEvent.click(screen.getAllByRole("button", { name: /підтримка/i })[0]);
    expect(screen.getByPlaceholderText(/Написати повідомлення/i)).toBeInTheDocument();
  });
});
