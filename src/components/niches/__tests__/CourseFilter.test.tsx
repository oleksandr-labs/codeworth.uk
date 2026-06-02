/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CourseFilter } from "../CourseFilter";
import type { NicheCourseCard } from "@/lib/data/niches";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...rest}>{children}</a>
  ),
}));

const COURSES: NicheCourseCard[] = [
  {
    id: "1",
    title: "Основи HTML та CSS",
    category: "Веб-розробка",
    level: "Початківець",
    duration: "10 год",
    instructor: "Іван Коваль",
    rating: "4.8",
    lessonsCount: 20,
    studentsCount: "1 200",
    price: "490 ₴",
    originalPrice: "800 ₴",
    icon: "💻",
    gradient: "from-blue-400 to-indigo-500",
    badge: "Новинка",
    badgeColor: "bg-emerald-500",
    tags: ["html", "css"],
  },
  {
    id: "2",
    title: "React для профі",
    category: "Веб-розробка",
    level: "Просунутий",
    duration: "25 год",
    instructor: "Олена Сидоренко",
    rating: "4.9",
    lessonsCount: 50,
    studentsCount: "800",
    price: "1 490 ₴",
    icon: "⚛️",
    gradient: "from-cyan-400 to-blue-500",
    tags: ["react", "javascript"],
  },
  {
    id: "3",
    title: "Основи дизайну",
    category: "Дизайн",
    level: "Початківець",
    duration: "8 год",
    instructor: "Аліна Мороз",
    rating: "4.7",
    lessonsCount: 15,
    studentsCount: "2 000",
    price: "390 ₴",
    icon: "🎨",
    gradient: "from-pink-400 to-rose-500",
  },
  {
    id: "4",
    title: "UX/UI Середній рівень",
    category: "Дизайн",
    level: "Середній",
    duration: "15 год",
    instructor: "Тарас Гриценко",
    rating: "4.6",
    lessonsCount: 30,
    studentsCount: "500",
    price: "890 ₴",
    icon: "🖌️",
    gradient: "from-purple-400 to-pink-500",
  },
];

describe("CourseFilter", () => {
  it("renders all courses by default", () => {
    render(<CourseFilter courses={COURSES} lang="uk" color="#6366f1" />);
    expect(screen.getByText("Основи HTML та CSS")).toBeInTheDocument();
    expect(screen.getByText("React для профі")).toBeInTheDocument();
    expect(screen.getByText("Основи дизайну")).toBeInTheDocument();
    expect(screen.getByText("UX/UI Середній рівень")).toBeInTheDocument();
  });

  it("shows category filter buttons including 'Всі' in Ukrainian", () => {
    render(<CourseFilter courses={COURSES} lang="uk" color="#6366f1" />);
    expect(screen.getByRole("button", { name: "Всі" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Веб-розробка" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Дизайн" })).toBeInTheDocument();
  });

  it("shows 'All' category button in English", () => {
    render(<CourseFilter courses={COURSES} lang="en" color="#6366f1" />);
    expect(screen.getByRole("button", { name: "All" })).toBeInTheDocument();
  });

  it("shows level filter buttons in Ukrainian", () => {
    render(<CourseFilter courses={COURSES} lang="uk" color="#6366f1" />);
    expect(screen.getByRole("button", { name: "Всі рівні" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Початківець" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Середній" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Просунутий" })).toBeInTheDocument();
  });

  it("shows level filter buttons in English", () => {
    render(<CourseFilter courses={COURSES} lang="en" color="#6366f1" />);
    expect(screen.getByRole("button", { name: "All levels" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Beginner" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Intermediate" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Advanced" })).toBeInTheDocument();
  });

  it("shows 'Рівень:' label in Ukrainian", () => {
    render(<CourseFilter courses={COURSES} lang="uk" color="#6366f1" />);
    expect(screen.getByText("Рівень:")).toBeInTheDocument();
  });

  it("shows 'Level:' label in English", () => {
    render(<CourseFilter courses={COURSES} lang="en" color="#6366f1" />);
    expect(screen.getByText("Level:")).toBeInTheDocument();
  });

  it("shows total course count in Ukrainian", () => {
    render(<CourseFilter courses={COURSES} lang="uk" color="#6366f1" />);
    expect(screen.getByText("Курсів: 4")).toBeInTheDocument();
  });

  it("shows total course count in English", () => {
    render(<CourseFilter courses={COURSES} lang="en" color="#6366f1" />);
    expect(screen.getByText("4 courses")).toBeInTheDocument();
  });

  it("filters courses by category", () => {
    render(<CourseFilter courses={COURSES} lang="uk" color="#6366f1" />);
    fireEvent.click(screen.getByRole("button", { name: "Веб-розробка" }));
    expect(screen.getByText("Основи HTML та CSS")).toBeInTheDocument();
    expect(screen.getByText("React для профі")).toBeInTheDocument();
    expect(screen.queryByText("Основи дизайну")).not.toBeInTheDocument();
    expect(screen.queryByText("UX/UI Середній рівень")).not.toBeInTheDocument();
  });

  it("shows filtered course count after category filter", () => {
    render(<CourseFilter courses={COURSES} lang="uk" color="#6366f1" />);
    fireEvent.click(screen.getByRole("button", { name: "Веб-розробка" }));
    expect(screen.getByText("Курсів: 2")).toBeInTheDocument();
  });

  it("filters courses by level in Ukrainian", () => {
    render(<CourseFilter courses={COURSES} lang="uk" color="#6366f1" />);
    fireEvent.click(screen.getByRole("button", { name: "Початківець" }));
    expect(screen.getByText("Основи HTML та CSS")).toBeInTheDocument();
    expect(screen.getByText("Основи дизайну")).toBeInTheDocument();
    expect(screen.queryByText("React для профі")).not.toBeInTheDocument();
    expect(screen.queryByText("UX/UI Середній рівень")).not.toBeInTheDocument();
  });

  it("filters courses by level in English", () => {
    render(<CourseFilter courses={COURSES} lang="en" color="#6366f1" />);
    fireEvent.click(screen.getByRole("button", { name: "Advanced" }));
    expect(screen.getByText("React для профі")).toBeInTheDocument();
    expect(screen.queryByText("Основи HTML та CSS")).not.toBeInTheDocument();
  });

  it("combines category and level filters", () => {
    render(<CourseFilter courses={COURSES} lang="uk" color="#6366f1" />);
    fireEvent.click(screen.getByRole("button", { name: "Дизайн" }));
    fireEvent.click(screen.getByRole("button", { name: "Середній" }));
    expect(screen.getByText("UX/UI Середній рівень")).toBeInTheDocument();
    expect(screen.queryByText("Основи дизайну")).not.toBeInTheDocument();
    expect(screen.queryByText("Основи HTML та CSS")).not.toBeInTheDocument();
  });

  it("shows course instructor", () => {
    render(<CourseFilter courses={COURSES} lang="uk" color="#6366f1" />);
    expect(screen.getByText(/Іван Коваль/)).toBeInTheDocument();
    expect(screen.getByText(/Олена Сидоренко/)).toBeInTheDocument();
  });

  it("shows course ratings", () => {
    render(<CourseFilter courses={COURSES} lang="uk" color="#6366f1" />);
    expect(screen.getByText(/4\.8/)).toBeInTheDocument();
    expect(screen.getByText(/4\.9/)).toBeInTheDocument();
  });

  it("shows lessons count in Ukrainian", () => {
    render(<CourseFilter courses={COURSES} lang="uk" color="#6366f1" />);
    expect(screen.getByText(/20.*уроків/)).toBeInTheDocument();
  });

  it("shows lessons count in English", () => {
    render(<CourseFilter courses={COURSES} lang="en" color="#6366f1" />);
    expect(screen.getByText(/20.*lessons/)).toBeInTheDocument();
  });

  it("shows student count", () => {
    render(<CourseFilter courses={COURSES} lang="uk" color="#6366f1" />);
    expect(document.body.textContent).toContain("1 200");
  });

  it("shows course prices", () => {
    render(<CourseFilter courses={COURSES} lang="uk" color="#6366f1" />);
    expect(screen.getByText("490 ₴")).toBeInTheDocument();
    expect(screen.getByText("1 490 ₴")).toBeInTheDocument();
  });

  it("shows original (crossed-out) price", () => {
    render(<CourseFilter courses={COURSES} lang="uk" color="#6366f1" />);
    expect(screen.getByText("800 ₴")).toBeInTheDocument();
  });

  it("shows badge on course card", () => {
    render(<CourseFilter courses={COURSES} lang="uk" color="#6366f1" />);
    expect(screen.getByText("Новинка")).toBeInTheDocument();
  });

  it("shows course tags", () => {
    render(<CourseFilter courses={COURSES} lang="uk" color="#6366f1" />);
    expect(screen.getByText("html")).toBeInTheDocument();
    expect(screen.getByText("css")).toBeInTheDocument();
  });

  it("shows 'Записатись' links in Ukrainian", () => {
    render(<CourseFilter courses={COURSES} lang="uk" color="#6366f1" />);
    const links = screen.getAllByRole("link", { name: "Записатись" });
    expect(links.length).toBe(4);
    links.forEach((link) => expect(link).toHaveAttribute("href", "/uk/contact"));
  });

  it("shows 'Sign Up' links in English", () => {
    render(<CourseFilter courses={COURSES} lang="en" color="#6366f1" />);
    const links = screen.getAllByRole("link", { name: "Sign Up" });
    expect(links.length).toBe(4);
  });

  it("shows empty state when no courses match filters", () => {
    render(<CourseFilter courses={COURSES} lang="uk" color="#6366f1" />);
    // Combination that yields zero results: Веб-розробка + Середній
    fireEvent.click(screen.getByRole("button", { name: "Веб-розробка" }));
    fireEvent.click(screen.getByRole("button", { name: "Середній" }));
    expect(screen.getByText("Курсів не знайдено")).toBeInTheDocument();
    expect(screen.getByText("Скинути фільтри")).toBeInTheDocument();
  });

  it("shows English empty state message", () => {
    render(<CourseFilter courses={COURSES} lang="en" color="#6366f1" />);
    fireEvent.click(screen.getByRole("button", { name: "Веб-розробка" }));
    fireEvent.click(screen.getByRole("button", { name: "Intermediate" }));
    expect(screen.getByText("No courses found")).toBeInTheDocument();
    expect(screen.getByText("Reset filters")).toBeInTheDocument();
  });

  it("'Скинути фільтри' resets all filters", () => {
    render(<CourseFilter courses={COURSES} lang="uk" color="#6366f1" />);
    fireEvent.click(screen.getByRole("button", { name: "Веб-розробка" }));
    fireEvent.click(screen.getByRole("button", { name: "Середній" }));
    expect(screen.getByText("Курсів не знайдено")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Скинути фільтри"));
    expect(screen.getByText("Курсів: 4")).toBeInTheDocument();
  });

  it("shows singular '1 course' in English", () => {
    render(
      <CourseFilter
        courses={[COURSES[0]]}
        lang="en"
        color="#6366f1"
      />
    );
    expect(screen.getByText("1 course")).toBeInTheDocument();
  });

  it("shows course level and duration", () => {
    render(<CourseFilter courses={COURSES} lang="uk" color="#6366f1" />);
    expect(screen.getByText(/Початківець.*10 год/)).toBeInTheDocument();
  });
});
