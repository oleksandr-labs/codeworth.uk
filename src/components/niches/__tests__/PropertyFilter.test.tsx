/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { PropertyFilter } from "../PropertyFilter";
import type { NichePropertyListing } from "@/lib/data/niches";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...rest}>{children}</a>
  ),
}));

const LISTINGS: NichePropertyListing[] = [
  {
    id: "1",
    type: "Квартира",
    title: "1-кімнатна на Подолі",
    district: "Поділ",
    area: "42 м²",
    rooms: 1,
    floor: "3/7",
    price: "60 000 $",
    gradient: "from-blue-400 to-indigo-500",
    icon: "🏢",
    tags: ["Євроремонт"],
  },
  {
    id: "2",
    type: "Квартира",
    title: "2-кімнатна на Печерську",
    district: "Печерськ",
    area: "65 м²",
    rooms: 2,
    floor: "5/9",
    price: "120 000 $",
    gradient: "from-sky-400 to-blue-500",
    icon: "🏠",
    badge: "Новинка",
    badgeColor: "bg-blue-600",
  },
  {
    id: "3",
    type: "Будинок",
    title: "Котедж у Бучі",
    district: "Буча",
    area: "180 м²",
    rooms: 4,
    price: "250 000 $",
    gradient: "from-green-400 to-emerald-500",
    icon: "🏡",
    badge: "Хіт",
    badgeColor: "bg-orange-600",
  },
  {
    id: "4",
    type: "Комерція",
    title: "Офіс на Хрещатику",
    district: "Центр",
    area: "120 м²",
    price: "180 000 $",
    gradient: "from-purple-400 to-violet-500",
    icon: "🏬",
  },
  {
    id: "5",
    type: "Будинок",
    title: "Будинок з 5 кімнатами",
    district: "Ірпінь",
    area: "250 м²",
    rooms: 5,
    price: "350 000 $",
    gradient: "from-amber-400 to-yellow-500",
    icon: "🏘",
  },
];

// ── PropertyFilter (uk) ────────────────────────────────────────────────

describe("PropertyFilter (uk)", () => {
  it("renders all listings when no filter is active", () => {
    render(<PropertyFilter listings={LISTINGS} lang="uk" color="#6366f1" />);
    expect(screen.getByText("1-кімнатна на Подолі")).toBeInTheDocument();
    expect(screen.getByText("2-кімнатна на Печерську")).toBeInTheDocument();
    expect(screen.getByText("Котедж у Бучі")).toBeInTheDocument();
    expect(screen.getByText("Офіс на Хрещатику")).toBeInTheDocument();
  });

  it("renders type filter chips: Всі, Квартира, Будинок, Комерція", () => {
    render(<PropertyFilter listings={LISTINGS} lang="uk" color="#6366f1" />);
    expect(screen.getByRole("button", { name: "Всі" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Квартира" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Будинок" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Комерція" })).toBeInTheDocument();
  });

  it("filters by type Квартира — shows only apartments", () => {
    render(<PropertyFilter listings={LISTINGS} lang="uk" color="#6366f1" />);
    fireEvent.click(screen.getByRole("button", { name: "Квартира" }));
    expect(screen.getByText("1-кімнатна на Подолі")).toBeInTheDocument();
    expect(screen.getByText("2-кімнатна на Печерську")).toBeInTheDocument();
    expect(screen.queryByText("Котедж у Бучі")).not.toBeInTheDocument();
    expect(screen.queryByText("Офіс на Хрещатику")).not.toBeInTheDocument();
  });

  it("filters by rooms: clicking 2 shows only 2-room listings", () => {
    render(<PropertyFilter listings={LISTINGS} lang="uk" color="#6366f1" />);
    fireEvent.click(screen.getByRole("button", { name: "2" }));
    expect(screen.getByText("2-кімнатна на Печерську")).toBeInTheDocument();
    expect(screen.queryByText("1-кімнатна на Подолі")).not.toBeInTheDocument();
    expect(screen.queryByText("Котедж у Бучі")).not.toBeInTheDocument();
  });

  it("filter 4+ includes properties with 4 or more rooms", () => {
    render(<PropertyFilter listings={LISTINGS} lang="uk" color="#6366f1" />);
    fireEvent.click(screen.getByRole("button", { name: "4+" }));
    expect(screen.getByText("Котедж у Бучі")).toBeInTheDocument();
    expect(screen.getByText("Будинок з 5 кімнатами")).toBeInTheDocument();
    expect(screen.queryByText("1-кімнатна на Подолі")).not.toBeInTheDocument();
    expect(screen.queryByText("Офіс на Хрещатику")).not.toBeInTheDocument();
  });

  it("shows empty state and reset button when no listings match", () => {
    render(<PropertyFilter listings={LISTINGS} lang="uk" color="#6366f1" />);
    // Комерція + 2 rooms → no match
    fireEvent.click(screen.getByRole("button", { name: "Комерція" }));
    fireEvent.click(screen.getByRole("button", { name: "2" }));
    expect(screen.getByText("Нічого не знайдено")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Скинути фільтри" })).toBeInTheDocument();
  });

  it("reset button restores all listings", () => {
    render(<PropertyFilter listings={LISTINGS} lang="uk" color="#6366f1" />);
    fireEvent.click(screen.getByRole("button", { name: "Комерція" }));
    fireEvent.click(screen.getByRole("button", { name: "1" }));
    expect(screen.getByText("Нічого не знайдено")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Скинути фільтри" }));
    expect(screen.getByText("1-кімнатна на Подолі")).toBeInTheDocument();
    expect(screen.getByText("Котедж у Бучі")).toBeInTheDocument();
  });

  it("shows Ukrainian result count", () => {
    render(<PropertyFilter listings={LISTINGS} lang="uk" color="#6366f1" />);
    expect(screen.getByText(`Знайдено об'єктів: ${LISTINGS.length}`)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Комерція" }));
    expect(screen.getByText("Знайдено об'єктів: 1")).toBeInTheDocument();
  });

  it("renders badge for listings that have one", () => {
    render(<PropertyFilter listings={LISTINGS} lang="uk" color="#6366f1" />);
    expect(screen.getByText("Новинка")).toBeInTheDocument();
    expect(screen.getByText("Хіт")).toBeInTheDocument();
  });

  it("renders district and area for each listing", () => {
    render(<PropertyFilter listings={LISTINGS} lang="uk" color="#6366f1" />);
    expect(screen.getByText(/Поділ/)).toBeInTheDocument();
    expect(screen.getByText(/42 м²/)).toBeInTheDocument();
  });
});

describe("PropertyFilter (en)", () => {
  it("renders English type filter labels", () => {
    render(<PropertyFilter listings={LISTINGS} lang="en" color="#6366f1" />);
    expect(screen.getByRole("button", { name: "All" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Apartment" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "House" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Commercial" })).toBeInTheDocument();
  });

  it("EN Apartment filter maps to Ukrainian type Квартира in data", () => {
    render(<PropertyFilter listings={LISTINGS} lang="en" color="#6366f1" />);
    fireEvent.click(screen.getByRole("button", { name: "Apartment" }));
    expect(screen.getByText("1-кімнатна на Подолі")).toBeInTheDocument();
    expect(screen.getByText("2-кімнатна на Печерську")).toBeInTheDocument();
    expect(screen.queryByText("Котедж у Бучі")).not.toBeInTheDocument();
  });

  it("shows English result count with plural listings", () => {
    render(<PropertyFilter listings={LISTINGS} lang="en" color="#6366f1" />);
    expect(screen.getByText(`Found: ${LISTINGS.length} listings`)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Commercial" }));
    expect(screen.getByText("Found: 1 listing")).toBeInTheDocument();
  });
});
