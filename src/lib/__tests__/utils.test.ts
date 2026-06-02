import { cn } from "../utils";

describe("cn()", () => {
  it("returns empty string for no args", () => {
    expect(cn()).toBe("");
  });

  it("joins multiple classes", () => {
    expect(cn("a", "b", "c")).toBe("a b c");
  });

  it("filters falsy values", () => {
    expect(cn("a", false, null, undefined, "b")).toBe("a b");
  });

  it("handles conditional classes", () => {
    const active = true;
    const disabled = false;
    expect(cn("base", active && "active", disabled && "disabled")).toBe("base active");
  });

  it("merges conflicting Tailwind classes (last wins)", () => {
    expect(cn("text-red-500", "text-blue-600")).toBe("text-blue-600");
    expect(cn("p-4", "p-6")).toBe("p-6");
    expect(cn("mt-2", "mt-4")).toBe("mt-4");
  });

  it("handles object syntax", () => {
    expect(cn({ "font-bold": true, italic: false })).toBe("font-bold");
  });

  it("handles arrays", () => {
    expect(cn(["a", "b"], "c")).toBe("a b c");
  });

  it("does not duplicate classes", () => {
    expect(cn("px-4", "px-4")).toBe("px-4");
  });
});
