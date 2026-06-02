import React from "react";
import { render, screen } from "@testing-library/react";
import { CartSummary } from "../CartSummary";

jest.mock("@/components/layout/LocaleProvider", () => ({
  useLocale: () => "uk",
}));

jest.mock("next/link", () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
  MockLink.displayName = "MockLink";
  return MockLink;
});

const mockUseCart = {
  subtotal: 0,
  isHydrated: true,
};

jest.mock("@/hooks/useCart", () => ({
  useCart: () => mockUseCart,
}));

beforeEach(() => {
  mockUseCart.subtotal = 0;
  mockUseCart.isHydrated = true;
});

describe("CartSummary", () => {
  it("renders 'Підсумок замовлення' heading", () => {
    render(<CartSummary />);
    expect(screen.getByText("Підсумок замовлення")).toBeInTheDocument();
  });

  it("shows dash placeholders before hydration", () => {
    mockUseCart.isHydrated = false;
    render(<CartSummary />);
    expect(screen.getAllByText("—").length).toBeGreaterThanOrEqual(2);
  });

  it("shows checkout link", () => {
    render(<CartSummary />);
    expect(screen.getByRole("link", { name: /оформити замовлення/i })).toHaveAttribute(
      "href",
      "/uk/marketplace/checkout"
    );
  });

  it("shows 'continue shopping' link to catalog", () => {
    render(<CartSummary />);
    expect(screen.getByRole("link", { name: /продовжити покупки/i })).toHaveAttribute(
      "href",
      "/uk/marketplace/catalog"
    );
  });

  it("shows trust badges: SSL, повернення, підтримка", () => {
    render(<CartSummary />);
    expect(screen.getByText(/безпечна оплата/i)).toBeInTheDocument();
    expect(screen.getByText(/повернення коштів/i)).toBeInTheDocument();
    expect(screen.getByText(/підтримка/i)).toBeInTheDocument();
  });

  it("shows subtotal label", () => {
    render(<CartSummary />);
    expect(screen.getByText("Підсумок")).toBeInTheDocument();
    expect(screen.getByText("Разом")).toBeInTheDocument();
  });
});
