/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LocaleProvider, useLocale } from "../LocaleProvider";

// ── LocaleProvider ─────────────────────────────────────────────────────────

function LocaleDisplay() {
  const locale = useLocale();
  return <span data-testid="locale">{locale}</span>;
}

describe("LocaleProvider", () => {
  it("provides the locale to children via useLocale", () => {
    render(
      <LocaleProvider lang="uk">
        <LocaleDisplay />
      </LocaleProvider>
    );
    expect(screen.getByTestId("locale")).toHaveTextContent("uk");
  });

  it("renders children", () => {
    render(
      <LocaleProvider lang="en">
        <p>hello</p>
      </LocaleProvider>
    );
    expect(screen.getByText("hello")).toBeInTheDocument();
  });

  it("defaults to 'en' when useLocale is called outside a provider", () => {
    render(<LocaleDisplay />);
    expect(screen.getByTestId("locale")).toHaveTextContent("en");
  });
});
