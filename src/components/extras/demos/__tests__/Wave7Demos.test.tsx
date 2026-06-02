import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { InstagramFeedDemo } from "../InstagramFeedDemo";
import { AiChatbotDemo } from "../AiChatbotDemo";
import { SeoArticleDemo } from "../SeoArticleDemo";

expect.extend(toHaveNoViolations);

describe("InstagramFeedDemo", () => {
  it("renders 9 posts in grid by default", () => {
    render(<InstagramFeedDemo isUk={true} />);
    const posts = screen.getAllByRole("button").filter((b) =>
      b.getAttribute("aria-label")?.startsWith("Post ")
    );
    expect(posts.length).toBe(9);
  });

  it("switches between grid and carousel", () => {
    render(<InstagramFeedDemo isUk={false} />);
    fireEvent.click(screen.getByText("Carousel"));
    expect(screen.getByText("Carousel")).toHaveClass("bg-white");
  });

  it("opens lightbox on post click", () => {
    render(<InstagramFeedDemo isUk={false} />);
    const firstPost = screen.getAllByRole("button").find((b) =>
      b.getAttribute("aria-label")?.startsWith("Post 1")
    );
    if (firstPost) {
      fireEvent.click(firstPost);
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    }
  });

  it("has no a11y violations", async () => {
    const { container } = render(<InstagramFeedDemo isUk={false} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("AiChatbotDemo", () => {
  it("renders initial AI greeting", () => {
    render(<AiChatbotDemo isUk={true} />);
    expect(screen.getByText(/Я AI-асистент Codeworth/i)).toBeInTheDocument();
  });

  it("renders suggested questions initially", () => {
    render(<AiChatbotDemo isUk={false} />);
    expect(screen.getByText(/pricing plans/i)).toBeInTheDocument();
  });

  it("sends message and shows user bubble", () => {
    render(<AiChatbotDemo isUk={false} />);
    const input = screen.getByLabelText("Message") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "What is your price?" } });
    fireEvent.click(screen.getByLabelText("Send"));
    expect(screen.getByText("What is your price?")).toBeInTheDocument();
  });

  it("disables send when input is empty", () => {
    render(<AiChatbotDemo isUk={false} />);
    expect(screen.getByLabelText("Send")).toBeDisabled();
  });

  it("resets conversation", () => {
    render(<AiChatbotDemo isUk={false} />);
    const input = screen.getByLabelText("Message") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Hi" } });
    fireEvent.click(screen.getByLabelText("Send"));
    fireEvent.click(screen.getByText("Reset"));
    expect(screen.queryByText("Hi")).not.toBeInTheDocument();
  });

  it("has no a11y violations", async () => {
    const { container } = render(<AiChatbotDemo isUk={false} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("SeoArticleDemo", () => {
  it("renders 3 view buttons", () => {
    render(<SeoArticleDemo isUk={true} />);
    expect(screen.getByText("Прев'ю")).toBeInTheDocument();
    expect(screen.getByText(/HTML/i)).toBeInTheDocument();
    expect(screen.getByText(/SEO аудит/i)).toBeInTheDocument();
  });

  it("shows preview by default", () => {
    render(<SeoArticleDemo isUk={false} />);
    expect(screen.getByText(/Next.js vs WordPress/i)).toBeInTheDocument();
  });

  it("switches to HTML view", () => {
    render(<SeoArticleDemo isUk={false} />);
    fireEvent.click(screen.getByText(/HTML \/ Schema/i));
    expect(screen.getByText(/Codeworth/i)).toBeInTheDocument();
  });

  it("switches to SEO audit view", () => {
    render(<SeoArticleDemo isUk={false} />);
    fireEvent.click(screen.getByText("SEO Audit"));
    expect(screen.getByText(/SEO score/i)).toBeInTheDocument();
    expect(screen.getByText("98/100")).toBeInTheDocument();
  });

  it("has no a11y violations", async () => {
    const { container } = render(<SeoArticleDemo isUk={false} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
