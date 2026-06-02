/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { ShareButtons } from "../ShareButtons";

const DEFAULT_PROPS = {
  url: "https://codeworth.uk/en/blog/test-post",
  title: "Test Blog Post",
  isUk: false,
};

describe("ShareButtons", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockResolvedValue(undefined),
      },
    });
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it("renders the share label in English", () => {
    render(<ShareButtons {...DEFAULT_PROPS} />);
    expect(screen.getByText("Share this article:")).toBeInTheDocument();
  });

  it("renders the share label in Ukrainian", () => {
    render(<ShareButtons {...DEFAULT_PROPS} isUk={true} />);
    expect(screen.getByText("Поділитися статтею:")).toBeInTheDocument();
  });

  it("renders Telegram link with correct href", () => {
    render(<ShareButtons {...DEFAULT_PROPS} />);
    const link = screen.getByRole("link", { name: "Telegram" });
    expect(link).toHaveAttribute("href", expect.stringContaining("t.me/share/url"));
    expect(link).toHaveAttribute("href", expect.stringContaining(encodeURIComponent(DEFAULT_PROPS.url)));
  });

  it("renders Facebook link with correct href", () => {
    render(<ShareButtons {...DEFAULT_PROPS} />);
    const link = screen.getByRole("link", { name: "Facebook" });
    expect(link).toHaveAttribute("href", expect.stringContaining("facebook.com/sharer"));
    expect(link).toHaveAttribute("href", expect.stringContaining(encodeURIComponent(DEFAULT_PROPS.url)));
  });

  it("renders Twitter/X link with correct href", () => {
    render(<ShareButtons {...DEFAULT_PROPS} />);
    const link = screen.getByRole("link", { name: "X / Twitter" });
    expect(link).toHaveAttribute("href", expect.stringContaining("twitter.com/intent/tweet"));
    expect(link).toHaveAttribute("href", expect.stringContaining(encodeURIComponent(DEFAULT_PROPS.url)));
  });

  it("renders LinkedIn link with correct href", () => {
    render(<ShareButtons {...DEFAULT_PROPS} />);
    const link = screen.getByRole("link", { name: "LinkedIn" });
    expect(link).toHaveAttribute("href", expect.stringContaining("linkedin.com/shareArticle"));
    expect(link).toHaveAttribute("href", expect.stringContaining(encodeURIComponent(DEFAULT_PROPS.url)));
  });

  it("all external links open in _blank", () => {
    render(<ShareButtons {...DEFAULT_PROPS} />);
    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link).toHaveAttribute("target", "_blank");
    });
  });

  it("all external links have rel=noopener noreferrer", () => {
    render(<ShareButtons {...DEFAULT_PROPS} />);
    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  it('renders copy link button with "Copy link" label in English', () => {
    render(<ShareButtons {...DEFAULT_PROPS} />);
    expect(screen.getByRole("button", { name: /copy link/i })).toBeInTheDocument();
  });

  it('renders copy link button with "Копіювати" label in Ukrainian', () => {
    render(<ShareButtons {...DEFAULT_PROPS} isUk={true} />);
    expect(screen.getByRole("button", { name: /копіювати/i })).toBeInTheDocument();
  });

  it("clicking copy link calls clipboard.writeText with the URL", async () => {
    render(<ShareButtons {...DEFAULT_PROPS} />);
    const button = screen.getByRole("button", { name: /copy link/i });
    await act(async () => {
      fireEvent.click(button);
    });
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(DEFAULT_PROPS.url);
  });

  it("shows Copied! text after clicking copy link (English)", async () => {
    render(<ShareButtons {...DEFAULT_PROPS} />);
    const button = screen.getByRole("button", { name: /copy link/i });
    await act(async () => {
      fireEvent.click(button);
    });
    expect(screen.getByText("Copied!")).toBeInTheDocument();
  });

  it("shows Скопійовано! text after clicking copy link (Ukrainian)", async () => {
    render(<ShareButtons {...DEFAULT_PROPS} isUk={true} />);
    const button = screen.getByRole("button", { name: /копіювати/i });
    await act(async () => {
      fireEvent.click(button);
    });
    expect(screen.getByText("Скопійовано!")).toBeInTheDocument();
  });

  it("reverts copy button text back after 2 seconds", async () => {
    render(<ShareButtons {...DEFAULT_PROPS} />);
    const button = screen.getByRole("button", { name: /copy link/i });
    await act(async () => {
      fireEvent.click(button);
    });
    expect(screen.getByText("Copied!")).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(screen.queryByText("Copied!")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /copy link/i })).toBeInTheDocument();
  });

  it("encodes special characters in title for sharing links", () => {
    render(<ShareButtons {...DEFAULT_PROPS} title="SEO & Tips for 2024" />);
    const telegram = screen.getByRole("link", { name: "Telegram" });
    expect(telegram).toHaveAttribute("href", expect.stringContaining(encodeURIComponent("SEO & Tips for 2024")));
  });
});
