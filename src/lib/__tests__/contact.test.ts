// Test the sanitization and message building logic from the contact API route
export {};

function sanitize(str: string): string {
  return str.replace(/[<>"'&]/g, "").trim().slice(0, 1000);
}

interface ContactPayload {
  name: string;
  contact: string;
  service?: string;
  budget?: string;
  message?: string;
}

function buildTelegramMessage(data: ContactPayload): string {
  const lines = [
    "📬 *Нова заявка з сайту codeworth.uk*",
    "",
    `👤 *Ім'я:* ${data.name}`,
    `📞 *Контакт:* ${data.contact}`,
  ];
  if (data.service) lines.push(`🛠 *Послуга:* ${data.service}`);
  if (data.budget) lines.push(`💰 *Бюджет:* ${data.budget}`);
  if (data.message) lines.push(`📝 *Повідомлення:*\n${data.message}`);
  return lines.join("\n");
}

describe("sanitize()", () => {
  it("removes < > \" ' & characters", () => {
    expect(sanitize("<script>alert('xss')</script>")).toBe("scriptalert(xss)/script");
  });

  it("trims leading and trailing whitespace", () => {
    expect(sanitize("  hello  ")).toBe("hello");
  });

  it("truncates strings longer than 1000 chars", () => {
    const long = "a".repeat(1200);
    expect(sanitize(long)).toHaveLength(1000);
  });

  it("keeps normal text unchanged", () => {
    expect(sanitize("Іван Петренко")).toBe("Іван Петренко");
  });

  it("removes ampersands", () => {
    expect(sanitize("AT&T")).toBe("ATT");
  });

  it("handles empty string", () => {
    expect(sanitize("")).toBe("");
  });
});

describe("buildTelegramMessage()", () => {
  it("includes name and contact", () => {
    const msg = buildTelegramMessage({ name: "Іван", contact: "+380671234567" });
    expect(msg).toContain("Іван");
    expect(msg).toContain("+380671234567");
  });

  it("includes service when provided", () => {
    const msg = buildTelegramMessage({ name: "A", contact: "b", service: "SEO" });
    expect(msg).toContain("SEO");
  });

  it("omits service line when not provided", () => {
    const msg = buildTelegramMessage({ name: "A", contact: "b" });
    expect(msg).not.toContain("Послуга");
  });

  it("includes budget when provided", () => {
    const msg = buildTelegramMessage({ name: "A", contact: "b", budget: "30 000 грн" });
    expect(msg).toContain("30 000 грн");
  });

  it("includes message when provided", () => {
    const msg = buildTelegramMessage({ name: "A", contact: "b", message: "Привіт!" });
    expect(msg).toContain("Привіт!");
  });

  it("starts with the expected header", () => {
    const msg = buildTelegramMessage({ name: "A", contact: "b" });
    expect(msg).toMatch(/^📬 \*Нова заявка/);
  });
});
