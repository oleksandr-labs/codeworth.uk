import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { AnnouncementBarDemo } from "../AnnouncementBarDemo";
import { FabClusterDemo } from "../FabClusterDemo";
import { ScrollAnimationsDemo } from "../ScrollAnimationsDemo";

expect.extend(toHaveNoViolations);

jest.mock("@/components/layout/LocaleProvider", () => ({
  useLocale: () => "uk",
}));

jest.mock("next/link", () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
  MockLink.displayName = "MockLink";
  return MockLink;
});

describe("Extras demos — accessibility (jest-axe)", () => {
  it("AnnouncementBarDemo has no a11y violations (UK)", async () => {
    const { container } = render(<AnnouncementBarDemo isUk={true} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("AnnouncementBarDemo has no a11y violations (EN)", async () => {
    const { container } = render(<AnnouncementBarDemo isUk={false} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("FabClusterDemo has no a11y violations (UK)", async () => {
    const { container } = render(<FabClusterDemo isUk={true} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("FabClusterDemo has no a11y violations (EN)", async () => {
    const { container } = render(<FabClusterDemo isUk={false} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("ScrollAnimationsDemo has no a11y violations (UK)", async () => {
    const { container } = render(<ScrollAnimationsDemo isUk={true} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("ScrollAnimationsDemo has no a11y violations (EN)", async () => {
    const { container } = render(<ScrollAnimationsDemo isUk={false} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
