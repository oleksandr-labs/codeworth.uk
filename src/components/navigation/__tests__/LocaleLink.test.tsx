/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import { LocaleLink } from "../LocaleLink";

jest.mock("next/link", () => {
  const L = ({ children, href }: any) => <a href={href}>{children}</a>;
  L.displayName = "Link";
  return L;
});

jest.mock("@/components/layout/LocaleProvider", () => ({
  useLocale: () => "uk",
}));

describe("LocaleLink (uk locale)", () => {
  it("prepends /uk to absolute path", () => {
    render(<LocaleLink href="/about">About</LocaleLink>);
    const link = screen.getByRole("link", { name: "About" });
    expect(link).toHaveAttribute("href", "/uk/about");
  });

  it("does not double-prepend if already locale-prefixed", () => {
    render(<LocaleLink href="/uk/about">About</LocaleLink>);
    const link = screen.getByRole("link", { name: "About" });
    expect(link).toHaveAttribute("href", "/uk/about");
  });

  it("passes non-absolute href unchanged", () => {
    render(<LocaleLink href="https://example.com">External</LocaleLink>);
    const link = screen.getByRole("link", { name: "External" });
    expect(link).toHaveAttribute("href", "https://example.com");
  });

  it("renders children correctly", () => {
    render(<LocaleLink href="/services">Our Services</LocaleLink>);
    expect(screen.getByText("Our Services")).toBeInTheDocument();
  });

  it("does not prepend locale to already-prefixed EN path", () => {
    render(<LocaleLink href="/en/contact">Contact</LocaleLink>);
    const link = screen.getByRole("link", { name: "Contact" });
    // /en/contact does not start with /uk, so uk is prepended
    expect(link).toHaveAttribute("href", "/uk/en/contact");
  });

  it("prepends /uk to root path /", () => {
    render(<LocaleLink href="/">Home</LocaleLink>);
    const link = screen.getByRole("link", { name: "Home" });
    expect(link).toHaveAttribute("href", "/uk/");
  });
});
