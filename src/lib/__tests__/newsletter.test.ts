// Test the newsletter API helper logic
export {};

function sanitize(str: string): string {
  return str.replace(/[<>"'&]/g, "").trim().slice(0, 200);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

describe("newsletter sanitize()", () => {
  it("removes XSS characters", () => {
    expect(sanitize("<script>alert('xss')</script>")).toBe("scriptalert(xss)/script");
  });

  it("truncates to 200 chars", () => {
    const long = "a".repeat(300);
    expect(sanitize(long)).toHaveLength(200);
  });

  it("trims whitespace", () => {
    expect(sanitize("  test@example.com  ")).toBe("test@example.com");
  });

  it("preserves valid email", () => {
    expect(sanitize("hello@codeworth.uk")).toBe("hello@codeworth.uk");
  });
});

describe("isValidEmail()", () => {
  it("accepts standard email addresses", () => {
    expect(isValidEmail("user@example.com")).toBe(true);
    expect(isValidEmail("hello@codeworth.uk")).toBe(true);
    expect(isValidEmail("test+tag@domain.org")).toBe(true);
  });

  it("rejects missing @ symbol", () => {
    expect(isValidEmail("notanemail")).toBe(false);
    expect(isValidEmail("nodomain@")).toBe(false);
  });

  it("rejects missing domain", () => {
    expect(isValidEmail("@nodomain.com")).toBe(false);
    expect(isValidEmail("user@")).toBe(false);
  });

  it("rejects empty string", () => {
    expect(isValidEmail("")).toBe(false);
  });

  it("rejects emails with spaces", () => {
    expect(isValidEmail("user @example.com")).toBe(false);
    expect(isValidEmail("user@ example.com")).toBe(false);
  });

  it("accepts Ukrainian domain emails", () => {
    expect(isValidEmail("info@business.com.ua")).toBe(true);
  });
});
