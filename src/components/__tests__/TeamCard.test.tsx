import { render, screen } from "@testing-library/react";
import { TeamCard, type TeamMember } from "@/components/ui/TeamCard";

const baseMember: TeamMember = {
  name: "Іванна Савченко",
  role: "Frontend Developer",
  bio: "5 років досвіду у React та Next.js.",
  skills: ["React", "TypeScript", "Tailwind"],
  socials: [
    { label: "LinkedIn", href: "https://linkedin.com/in/test", icon: "linkedin" },
    { label: "GitHub", href: "https://github.com/test", icon: "github" },
  ],
};

describe("TeamCard (default variant)", () => {
  it("renders member name and role", () => {
    render(<TeamCard member={baseMember} />);
    expect(screen.getByText("Іванна Савченко")).toBeInTheDocument();
    expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
  });

  it("renders bio text", () => {
    render(<TeamCard member={baseMember} />);
    expect(screen.getByText(baseMember.bio!)).toBeInTheDocument();
  });

  it("renders all skills as badges", () => {
    render(<TeamCard member={baseMember} />);
    baseMember.skills!.forEach((skill) => {
      expect(screen.getByText(skill)).toBeInTheDocument();
    });
  });

  it("renders social links with correct hrefs", () => {
    render(<TeamCard member={baseMember} />);
    const linkedinLink = screen.getByLabelText("LinkedIn");
    expect(linkedinLink).toHaveAttribute("href", "https://linkedin.com/in/test");
    const githubLink = screen.getByLabelText("GitHub");
    expect(githubLink).toHaveAttribute("href", "https://github.com/test");
  });

  it("renders without optional fields", () => {
    render(<TeamCard member={{ name: "Анна", role: "Designer" }} />);
    expect(screen.getByText("Анна")).toBeInTheDocument();
    expect(screen.getByText("Designer")).toBeInTheDocument();
  });
});

describe("TeamCard (compact variant)", () => {
  it("renders name and role in compact layout", () => {
    render(<TeamCard member={baseMember} variant="compact" />);
    expect(screen.getByText("Іванна Савченко")).toBeInTheDocument();
    expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
  });

  it("renders social links in compact mode", () => {
    render(<TeamCard member={baseMember} variant="compact" />);
    expect(screen.getByLabelText("LinkedIn")).toBeInTheDocument();
  });

  it("renders without socials without crashing", () => {
    const member: TeamMember = { name: "Тест", role: "Dev" };
    render(<TeamCard member={member} variant="compact" />);
    expect(screen.getByText("Тест")).toBeInTheDocument();
  });
});

describe("TeamCard social icons", () => {
  const socialTypes = ["twitter", "instagram", "telegram"] as const;

  socialTypes.forEach((icon) => {
    it(`renders ${icon} social icon without crashing`, () => {
      const member: TeamMember = {
        name: "Test",
        role: "Dev",
        socials: [{ label: icon, href: `https://${icon}.com`, icon }],
      };
      render(<TeamCard member={member} />);
      expect(screen.getByLabelText(icon)).toBeInTheDocument();
    });
  });
});
