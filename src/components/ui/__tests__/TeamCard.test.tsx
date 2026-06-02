/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import { TeamCard, TeamMember } from "../TeamCard";

const MEMBER: TeamMember = {
  name: "Дмитро Ковальчук",
  role: "Lead Developer",
  bio: "Досвідчений розробник з 8 роками досвіду.",
  skills: ["Next.js", "TypeScript", "Tailwind"],
  socials: [
    { label: "GitHub профіль", href: "https://github.com/test", icon: "github" },
    { label: "LinkedIn профіль", href: "https://linkedin.com/test", icon: "linkedin" },
  ],
};

describe("TeamCard (default variant)", () => {
  it("відображає ім'я члена команди", () => {
    render(<TeamCard member={MEMBER} />);
    expect(screen.getByText("Дмитро Ковальчук")).toBeInTheDocument();
  });

  it("відображає роль", () => {
    render(<TeamCard member={MEMBER} />);
    expect(screen.getByText("Lead Developer")).toBeInTheDocument();
  });

  it("відображає bio якщо вказано", () => {
    render(<TeamCard member={MEMBER} />);
    expect(screen.getByText("Досвідчений розробник з 8 роками досвіду.")).toBeInTheDocument();
  });

  it("відображає навички", () => {
    render(<TeamCard member={MEMBER} />);
    expect(screen.getByText("Next.js")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Tailwind")).toBeInTheDocument();
  });

  it("відображає соціальні посилання з aria-label", () => {
    render(<TeamCard member={MEMBER} />);
    expect(screen.getByRole("link", { name: "GitHub профіль" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "LinkedIn профіль" })).toBeInTheDocument();
  });

  it("соціальні посилання мають rel='noopener noreferrer'", () => {
    render(<TeamCard member={MEMBER} />);
    const link = screen.getByRole("link", { name: "GitHub профіль" });
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("не відображає bio якщо не вказано", () => {
    render(<TeamCard member={{ name: "Тест", role: "Dev" }} />);
    expect(screen.queryByText("Досвідчений розробник")).not.toBeInTheDocument();
  });
});

describe("TeamCard (compact variant)", () => {
  it("відображає ім'я та роль у compact режимі", () => {
    render(<TeamCard member={MEMBER} variant="compact" />);
    expect(screen.getByText("Дмитро Ковальчук")).toBeInTheDocument();
    expect(screen.getByText("Lead Developer")).toBeInTheDocument();
  });

  it("compact не показує bio", () => {
    render(<TeamCard member={MEMBER} variant="compact" />);
    expect(screen.queryByText("Досвідчений розробник")).not.toBeInTheDocument();
  });
});
