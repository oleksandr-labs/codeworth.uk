/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ScheduleFilter } from "../ScheduleFilter";
import type { NicheScheduleItem } from "@/lib/data/niches";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...rest}>{children}</a>
  ),
}));

const ITEMS: NicheScheduleItem[] = [
  {
    id: "1",
    title: "Ранкова йога",
    trainer: "Оля К.",
    category: "Йога",
    day: "Понеділок",
    time: "07:00",
    duration: "60 хв",
    spots: 10,
    spotsLeft: 3,
    gradient: "from-purple-400 to-violet-500",
    icon: "🧘",
  },
  {
    id: "2",
    title: "Кардіо-інтервали",
    trainer: "Максим В.",
    category: "Кардіо",
    day: "Понеділок",
    time: "09:00",
    duration: "45 хв",
    spots: 15,
    spotsLeft: 0,
    gradient: "from-red-400 to-orange-500",
    icon: "🏃",
    badge: "Хіт",
    badgeColor: "bg-red-600",
  },
  {
    id: "3",
    title: "Силові тренування",
    trainer: "Андрій М.",
    category: "Силові",
    day: "Середа",
    time: "10:00",
    duration: "75 хв",
    spots: 12,
    spotsLeft: 8,
    gradient: "from-amber-400 to-yellow-500",
    icon: "🏋",
  },
  {
    id: "4",
    title: "Вечірня йога",
    trainer: "Оля К.",
    category: "Йога",
    day: "П'ятниця",
    time: "18:00",
    duration: "60 хв",
    spots: 10,
    spotsLeft: 2,
    gradient: "from-green-400 to-emerald-500",
    icon: "🌿",
    badge: "Останні місця",
    badgeColor: "bg-orange-500",
  },
];

// ── ScheduleFilter (uk) ────────────────────────────────────────────────

describe("ScheduleFilter (uk)", () => {
  it("renders all schedule items when no filter is active", () => {
    render(<ScheduleFilter items={ITEMS} lang="uk" color="#6366f1" />);
    expect(screen.getByText("Ранкова йога")).toBeInTheDocument();
    expect(screen.getByText("Кардіо-інтервали")).toBeInTheDocument();
    expect(screen.getByText("Силові тренування")).toBeInTheDocument();
    expect(screen.getByText("Вечірня йога")).toBeInTheDocument();
  });

  it("renders unique day chips derived from data", () => {
    render(<ScheduleFilter items={ITEMS} lang="uk" color="#6366f1" />);
    // "Всі" appears in both the day row and the category row
    expect(screen.getAllByRole("button", { name: "Всі" }).length).toBeGreaterThanOrEqual(2);
    expect(screen.getByRole("button", { name: "Понеділок" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Середа" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "П'ятниця" })).toBeInTheDocument();
  });

  it("renders unique category chips derived from data", () => {
    render(<ScheduleFilter items={ITEMS} lang="uk" color="#6366f1" />);
    expect(screen.getByRole("button", { name: "Йога" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Кардіо" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Силові" })).toBeInTheDocument();
  });

  it("filters by day — clicking Понеділок shows only Monday classes", () => {
    render(<ScheduleFilter items={ITEMS} lang="uk" color="#6366f1" />);
    fireEvent.click(screen.getByRole("button", { name: "Понеділок" }));
    expect(screen.getByText("Ранкова йога")).toBeInTheDocument();
    expect(screen.getByText("Кардіо-інтервали")).toBeInTheDocument();
    expect(screen.queryByText("Силові тренування")).not.toBeInTheDocument();
    expect(screen.queryByText("Вечірня йога")).not.toBeInTheDocument();
  });

  it("filters by category — clicking Йога shows only yoga classes", () => {
    render(<ScheduleFilter items={ITEMS} lang="uk" color="#6366f1" />);
    fireEvent.click(screen.getByRole("button", { name: "Йога" }));
    expect(screen.getByText("Ранкова йога")).toBeInTheDocument();
    expect(screen.getByText("Вечірня йога")).toBeInTheDocument();
    expect(screen.queryByText("Кардіо-інтервали")).not.toBeInTheDocument();
    expect(screen.queryByText("Силові тренування")).not.toBeInTheDocument();
  });

  it("combined filter day+category shows only matching items", () => {
    render(<ScheduleFilter items={ITEMS} lang="uk" color="#6366f1" />);
    fireEvent.click(screen.getByRole("button", { name: "Понеділок" }));
    fireEvent.click(screen.getByRole("button", { name: "Кардіо" }));
    expect(screen.getByText("Кардіо-інтервали")).toBeInTheDocument();
    expect(screen.queryByText("Ранкова йога")).not.toBeInTheDocument();
  });

  it("shows empty state and reset button when no classes match", () => {
    render(<ScheduleFilter items={ITEMS} lang="uk" color="#6366f1" />);
    // П'ятниця + Кардіо → no match
    fireEvent.click(screen.getByRole("button", { name: "П'ятниця" }));
    fireEvent.click(screen.getByRole("button", { name: "Кардіо" }));
    expect(screen.getByText("Занять не знайдено")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Скинути фільтри" })).toBeInTheDocument();
  });

  it("reset button restores all items", () => {
    render(<ScheduleFilter items={ITEMS} lang="uk" color="#6366f1" />);
    fireEvent.click(screen.getByRole("button", { name: "Середа" }));
    fireEvent.click(screen.getByRole("button", { name: "Йога" }));
    expect(screen.getByText("Занять не знайдено")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Скинути фільтри" }));
    expect(screen.getByText("Ранкова йога")).toBeInTheDocument();
    expect(screen.getByText("Вечірня йога")).toBeInTheDocument();
  });

  it("shows Ukrainian result count", () => {
    render(<ScheduleFilter items={ITEMS} lang="uk" color="#6366f1" />);
    expect(screen.getByText(`Занять: ${ITEMS.length}`)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Середа" }));
    expect(screen.getByText("Занять: 1")).toBeInTheDocument();
  });

  it("shows 'Немає місць' for a fully booked class", () => {
    render(<ScheduleFilter items={ITEMS} lang="uk" color="#6366f1" />);
    // Кардіо-інтервали has spotsLeft: 0
    expect(screen.getByText("Немає місць")).toBeInTheDocument();
  });

  it("shows available spots count for classes with spots remaining", () => {
    render(<ScheduleFilter items={ITEMS} lang="uk" color="#6366f1" />);
    // Ранкова йога: spotsLeft=3, spots=10
    expect(screen.getByText("3 місць з 10")).toBeInTheDocument();
  });

  it("renders trainer names and schedule details", () => {
    render(<ScheduleFilter items={ITEMS} lang="uk" color="#6366f1" />);
    // "Оля К." appears twice (two yoga classes share the same trainer)
    expect(screen.getAllByText("Оля К.").length).toBe(2);
    expect(screen.getByText("Максим В.")).toBeInTheDocument();
    expect(screen.getByText(/07:00/)).toBeInTheDocument();
    // "60 хв" appears twice (morning and evening yoga)
    expect(screen.getAllByText(/60 хв/).length).toBe(2);
  });
});

describe("ScheduleFilter (en)", () => {
  it("renders 'All' chip and English UI labels", () => {
    render(<ScheduleFilter items={ITEMS} lang="en" color="#6366f1" />);
    // "All" appears in both day row and category row
    expect(screen.getAllByRole("button", { name: "All" }).length).toBeGreaterThanOrEqual(2);
    // The label "Type:" appears for the category row
    expect(screen.getByText("Type:")).toBeInTheDocument();
  });

  it("shows English result count with plural classes", () => {
    render(<ScheduleFilter items={ITEMS} lang="en" color="#6366f1" />);
    expect(screen.getByText(`${ITEMS.length} classes`)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Середа" }));
    expect(screen.getByText("1 class")).toBeInTheDocument();
  });

  it("shows 'Full' for fully booked class in English", () => {
    render(<ScheduleFilter items={ITEMS} lang="en" color="#6366f1" />);
    expect(screen.getByText("Full")).toBeInTheDocument();
  });

  it("shows spots fraction for available classes in English", () => {
    render(<ScheduleFilter items={ITEMS} lang="en" color="#6366f1" />);
    // Ранкова йога: spotsLeft=3, spots=10
    expect(screen.getByText("3/10 spots")).toBeInTheDocument();
  });
});
