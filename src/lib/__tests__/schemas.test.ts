import { ContactSchema, NewsletterSchema, OrderSchema, LoginSchema } from "../schemas";

describe("ContactSchema", () => {
  const valid = { name: "Іван Петренко", contact: "ivan@example.com" };

  it("accepts valid contact data", () => {
    const result = ContactSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it("trims whitespace from name and contact", () => {
    const result = ContactSchema.safeParse({ name: "  Іван  ", contact: "  test@test.com  " });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("Іван");
      expect(result.data.contact).toBe("test@test.com");
    }
  });

  it("rejects name shorter than 2 chars", () => {
    const result = ContactSchema.safeParse({ ...valid, name: "А" });
    expect(result.success).toBe(false);
  });

  it("rejects contact shorter than 5 chars", () => {
    const result = ContactSchema.safeParse({ ...valid, contact: "ab" });
    expect(result.success).toBe(false);
  });

  it("rejects name longer than 100 chars", () => {
    const result = ContactSchema.safeParse({ ...valid, name: "A".repeat(101) });
    expect(result.success).toBe(false);
  });

  it("accepts optional fields", () => {
    const result = ContactSchema.safeParse({
      ...valid,
      service: "SEO",
      budget: "10000-20000",
      message: "Потрібен сайт",
    });
    expect(result.success).toBe(true);
  });

  it("accepts missing optional fields", () => {
    const result = ContactSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it("rejects honeypot field when filled", () => {
    const result = ContactSchema.safeParse({ ...valid, honeypot: "bot was here" });
    expect(result.success).toBe(false);
  });
});

describe("NewsletterSchema", () => {
  it("accepts valid email", () => {
    const result = NewsletterSchema.safeParse({ email: "user@example.com" });
    expect(result.success).toBe(true);
  });

  it("normalizes email to lowercase", () => {
    const result = NewsletterSchema.safeParse({ email: "USER@EXAMPLE.COM" });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe("user@example.com");
    }
  });

  it("rejects invalid email", () => {
    const result = NewsletterSchema.safeParse({ email: "notanemail" });
    expect(result.success).toBe(false);
  });

  it("rejects empty email", () => {
    const result = NewsletterSchema.safeParse({ email: "" });
    expect(result.success).toBe(false);
  });

  it("rejects email longer than 254 chars", () => {
    // 250 + "@b.com"(6) = 256 chars total → exceeds 254 limit
    const result = NewsletterSchema.safeParse({ email: "a".repeat(250) + "@b.com" });
    expect(result.success).toBe(false);
  });

  it("accepts optional source field", () => {
    const result = NewsletterSchema.safeParse({ email: "a@b.com", source: "blog-sidebar" });
    expect(result.success).toBe(true);
  });
});

describe("OrderSchema", () => {
  const validItem = { title: "Ресторан", package: "Розширений", price: 13600 };
  const valid = {
    firstName: "Олег",
    lastName: "Коваленко",
    email: "oleg@example.com",
    phone: "+380671234567",
    paymentMethod: "Банківська картка",
    items: [validItem],
    total: 13600,
  };

  it("accepts valid order", () => {
    const result = OrderSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it("rejects missing firstName", () => {
    const result = OrderSchema.safeParse({ ...valid, firstName: "" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = OrderSchema.safeParse({ ...valid, email: "bad" });
    expect(result.success).toBe(false);
  });

  it("rejects phone shorter than 7 chars", () => {
    const result = OrderSchema.safeParse({ ...valid, phone: "12345" });
    expect(result.success).toBe(false);
  });

  it("rejects empty items array", () => {
    const result = OrderSchema.safeParse({ ...valid, items: [] });
    expect(result.success).toBe(false);
  });

  it("rejects negative total", () => {
    const result = OrderSchema.safeParse({ ...valid, total: -100 });
    expect(result.success).toBe(false);
  });

  it("normalizes email to lowercase", () => {
    const result = OrderSchema.safeParse({ ...valid, email: "OLEG@EXAMPLE.COM" });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe("oleg@example.com");
    }
  });

  it("accepts optional fields", () => {
    const result = OrderSchema.safeParse({
      ...valid,
      company: "ТОВ Бізнес",
      businessName: "Ресторан Смачно",
      domain: "example.com.ua",
      description: "Опис бізнесу",
      wishes: "Зелені кольори",
    });
    expect(result.success).toBe(true);
  });
});

describe("LoginSchema", () => {
  const valid = { email: "user@example.com", password: "secret123" };

  it("accepts valid credentials", () => {
    const result = LoginSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it("normalizes email to lowercase", () => {
    const result = LoginSchema.safeParse({ ...valid, email: "USER@EXAMPLE.COM" });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe("user@example.com");
    }
  });

  it("rejects invalid email", () => {
    const result = LoginSchema.safeParse({ ...valid, email: "notanemail" });
    expect(result.success).toBe(false);
  });

  it("rejects password shorter than 6 chars", () => {
    const result = LoginSchema.safeParse({ ...valid, password: "abc" });
    expect(result.success).toBe(false);
  });

  it("rejects empty password", () => {
    const result = LoginSchema.safeParse({ ...valid, password: "" });
    expect(result.success).toBe(false);
  });

  it("rejects password longer than 128 chars", () => {
    const result = LoginSchema.safeParse({ ...valid, password: "a".repeat(129) });
    expect(result.success).toBe(false);
  });
});
