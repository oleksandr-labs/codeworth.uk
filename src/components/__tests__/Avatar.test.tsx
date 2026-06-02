import { render, screen } from "@testing-library/react";
import { Avatar, AvatarGroup } from "@/components/ui/Avatar";

describe("Avatar", () => {
  it("renders initials from a full name", () => {
    render(<Avatar name="Олена Коваль" />);
    expect(screen.getByText("ОК")).toBeInTheDocument();
  });

  it("renders first letter only for a single-word name", () => {
    render(<Avatar name="Максим" />);
    expect(screen.getByText("М")).toBeInTheDocument();
  });

  it("renders ? when no name provided", () => {
    render(<Avatar />);
    expect(screen.getByText("?")).toBeInTheDocument();
  });

  it("renders an img element when src is provided", () => {
    render(<Avatar src="/photo.jpg" name="Test" alt="Test avatar" />);
    const img = screen.getByRole("img", { name: "Test avatar" });
    expect(img).toHaveAttribute("src", "/photo.jpg");
  });

  it("renders status badge with correct aria-label", () => {
    render(<Avatar name="Test" status="online" />);
    expect(screen.getByLabelText("online")).toBeInTheDocument();
  });

  it("renders all status variants without crashing", () => {
    const statuses = ["online", "offline", "busy", "away"] as const;
    statuses.forEach((status) => {
      const { unmount } = render(<Avatar name="Test" status={status} />);
      expect(screen.getByLabelText(status)).toBeInTheDocument();
      unmount();
    });
  });

  it("renders all size variants without crashing", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    sizes.forEach((size) => {
      const { unmount } = render(<Avatar name="Test" size={size} />);
      expect(screen.getByText("T")).toBeInTheDocument();
      unmount();
    });
  });

  it("applies custom className", () => {
    const { container } = render(<Avatar name="Test" className="my-custom-class" />);
    expect(container.firstChild).toHaveClass("my-custom-class");
  });
});

describe("AvatarGroup", () => {
  const avatars = [
    { name: "Олена" },
    { name: "Максим" },
    { name: "Іванна" },
    { name: "Тарас" },
    { name: "Аліна" },
  ];

  it("renders up to max avatars", () => {
    render(<AvatarGroup avatars={avatars} max={3} />);
    expect(screen.getByText("О")).toBeInTheDocument();
    expect(screen.getByText("М")).toBeInTheDocument();
    expect(screen.getByText("І")).toBeInTheDocument();
  });

  it("shows overflow count when avatars exceed max", () => {
    render(<AvatarGroup avatars={avatars} max={3} />);
    expect(screen.getByText("+2")).toBeInTheDocument();
  });

  it("does not show overflow when within limit", () => {
    render(<AvatarGroup avatars={avatars.slice(0, 3)} max={4} />);
    expect(screen.queryByText(/^\+/)).not.toBeInTheDocument();
  });

  it("renders all avatars when max is greater than count", () => {
    render(<AvatarGroup avatars={avatars.slice(0, 2)} max={5} />);
    expect(screen.queryByText(/^\+/)).not.toBeInTheDocument();
  });
});
