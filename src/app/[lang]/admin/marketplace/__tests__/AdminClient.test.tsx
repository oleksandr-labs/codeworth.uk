import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AdminClient from "../AdminClient";
import { ToastProvider } from "@/components/ui/Toast";

jest.mock("@/components/layout/LocaleProvider", () => ({
  useLocale: () => "uk",
}));

const renderAdmin = () => render(<ToastProvider><AdminClient /></ToastProvider>);

jest.mock("next/link", () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
  MockLink.displayName = "MockLink";
  return MockLink;
});

jest.mock("next/navigation", () => ({
  useRouter: () => ({ replace: jest.fn() }),
  useParams: () => ({ lang: "uk" }),
}));

jest.mock("@/hooks/useAuth", () => ({
  useAuth: () => ({
    user: { id: "1", email: "admin@codenest.com.ua", firstName: "Admin", lastName: "User", role: "admin" },
    isLoading: false,
    isAuthenticated: true,
    logout: jest.fn(),
    login: jest.fn(),
    updateProfile: jest.fn(),
  }),
}));

// NICHES_DATA is used for the products tab
jest.mock("@/lib/data/niches", () => ({
  NICHES_DATA: [
    { slug: "restaurant", title: "Ресторан / Кафе", priceFrom: 8000, complexity: "medium", emoji: "🍽" },
    { slug: "beauty", title: "Салон краси", priceFrom: 9000, complexity: "medium", emoji: "💇" },
  ],
}));

describe("AdminClient", () => {
  it("renders the admin panel with sidebar", () => {
    renderAdmin();
    expect(screen.getAllByText("Дашборд").length).toBeGreaterThan(0);
  });

  it("shows CodeNest Admin Panel branding", () => {
    renderAdmin();
    expect(screen.getAllByText("Admin Panel")[0]).toBeInTheDocument();
  });

  it("renders KPI cards on dashboard tab", () => {
    renderAdmin();
    expect(screen.getByText(/Дохід/i)).toBeInTheDocument();
    expect(screen.getByText(/Замовлень/i)).toBeInTheDocument();
    expect(screen.getByText(/Нових клієнтів/i)).toBeInTheDocument();
  });

  it("switches to products tab and shows niches list", () => {
    renderAdmin();
    fireEvent.click(screen.getAllByRole("button", { name: /продукти/i })[0]);
    expect(screen.getByText("Ресторан / Кафе")).toBeInTheDocument();
    expect(screen.getByText("Салон краси")).toBeInTheDocument();
  });

  it("switches to orders tab and shows mock orders", () => {
    renderAdmin();
    fireEvent.click(screen.getAllByRole("button", { name: /замовлення/i })[0]);
    expect(screen.getAllByText(/CN-4821|CN-4822/).length).toBeGreaterThan(0);
  });

  it("filters orders by search query", () => {
    renderAdmin();
    fireEvent.click(screen.getAllByRole("button", { name: /замовлення/i })[0]);
    const searchInput = screen.getByPlaceholderText(/пошук/i);
    fireEvent.change(searchInput, { target: { value: "CN-4821" } });
    expect(screen.getByText("CN-4821")).toBeInTheDocument();
    // Other orders should not be visible
    expect(screen.queryByText("CN-4822")).not.toBeInTheDocument();
  });

  it("switches to clients tab and shows mock clients", () => {
    renderAdmin();
    fireEvent.click(screen.getAllByRole("button", { name: /клієнти/i })[0]);
    expect(screen.getByText("Олег Коваленко")).toBeInTheDocument();
    expect(screen.getByText("Марія Левченко")).toBeInTheDocument();
  });

  it("switches to reviews tab and shows mock reviews", () => {
    renderAdmin();
    fireEvent.click(screen.getAllByRole("button", { name: /відгуки/i })[0]);
    expect(screen.getByText(/Сайт запустили/i)).toBeInTheDocument();
  });

  it("approve button changes review status to published", () => {
    renderAdmin();
    fireEvent.click(screen.getAllByRole("button", { name: /відгуки/i })[0]);
    // Find pending review and click approve
    const approveBtn = screen.getAllByRole("button", { name: /схвалити/i })[0];
    fireEvent.click(approveBtn);
    // After approval, the pending review's status updates (button disappears)
    expect(screen.queryAllByRole("button", { name: /схвалити/i }).length).toBeLessThan(2);
  });

  it("reject button changes review status to rejected", () => {
    renderAdmin();
    fireEvent.click(screen.getAllByRole("button", { name: /відгуки/i })[0]);
    const rejectBtn = screen.getAllByRole("button", { name: /відхилити/i })[0];
    fireEvent.click(rejectBtn);
    expect(screen.queryAllByRole("button", { name: /відхилити/i }).length).toBeLessThan(2);
  });

  it("switches to analytics tab", () => {
    renderAdmin();
    fireEvent.click(screen.getAllByRole("button", { name: /аналітика/i })[0]);
    expect(screen.getByRole("heading", { name: /аналітика/i })).toBeInTheDocument();
  });

  it("shows nav items for all sections", () => {
    renderAdmin();
    const expectedNav = ["Дашборд", "Продукти", "Замовлення", "Клієнти", "Відгуки", "Аналітика", "Фінанси", "Налаштування"];
    for (const label of expectedNav) {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    }
  });

  it("switches to finances tab and shows KPI cards", () => {
    renderAdmin();
    fireEvent.click(screen.getAllByRole("button", { name: /фінанси/i })[0]);
    expect(screen.getByRole("heading", { name: /фінанси/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Дохід/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Транзакцій/i).length).toBeGreaterThan(0);
  });

  it("finances tab shows transactions table", () => {
    renderAdmin();
    fireEvent.click(screen.getAllByRole("button", { name: /фінанси/i })[0]);
    expect(screen.getAllByText(/TXN-\d+/).length).toBeGreaterThan(0);
  });

  it("finances tab shows invoices table", () => {
    renderAdmin();
    fireEvent.click(screen.getAllByRole("button", { name: /фінанси/i })[0]);
    // Admin invoices have IDs like INV-221
    expect(screen.getAllByText(/INV-\d+/).length).toBeGreaterThan(0);
  });

  it("finances tab shows promo codes", () => {
    renderAdmin();
    fireEvent.click(screen.getAllByRole("button", { name: /фінанси/i })[0]);
    expect(screen.getByText("CODENEST10")).toBeInTheDocument();
    expect(screen.getByText("SPRING2026")).toBeInTheDocument();
  });
});
