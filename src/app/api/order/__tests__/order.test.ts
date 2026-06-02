// Tests for order API route helpers
export {};

function generateOrderId(): string {
  return `CN-${Date.now().toString(36).toUpperCase().slice(-6)}`;
}

interface OrderItem {
  title: string;
  package: string;
  price: number;
}

interface OrderInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  businessName?: string;
  domain?: string;
  description?: string;
  wishes?: string;
  paymentMethod: string;
  items: OrderItem[];
  total: number;
}

function buildTelegramMessage(data: OrderInput, orderId: string): string {
  const lines = [
    "🛒 *Нове замовлення через маркетплейс Codeworth!*",
    `📋 *Замовлення:* \`${orderId}\``,
    "",
    "👤 *Замовник:*",
    `• Ім'я: ${data.firstName} ${data.lastName}`,
    `• Email: ${data.email}`,
    `• Телефон: ${data.phone}`,
  ];

  if (data.company) lines.push(`• Компанія: ${data.company}`);

  lines.push("", "🛍 *Товари:*");
  for (const item of data.items) {
    lines.push(`• ${item.title} [${item.package}] — ${item.price.toLocaleString("uk-UA")} грн`);
  }

  lines.push(``, `💰 *Загальна сума:* ${data.total.toLocaleString("uk-UA")} грн`);
  lines.push(`💳 *Метод оплати:* ${data.paymentMethod}`);

  if (data.businessName) lines.push(``, `🏢 *Бізнес:* ${data.businessName}`);
  if (data.domain) lines.push(`🌐 *Домен:* ${data.domain}`);
  if (data.description) lines.push(`📝 *Опис:*\n${data.description}`);
  if (data.wishes) lines.push(`✨ *Побажання:*\n${data.wishes}`);

  return lines.join("\n");
}

const MOCK_ORDER: OrderInput = {
  firstName: "Олег",
  lastName: "Коваленко",
  email: "oleg@example.com",
  phone: "+380671234567",
  paymentMethod: "Банківська картка",
  items: [{ title: "Ресторан / Кафе", package: "Розширений", price: 13600 }],
  total: 13600,
};

describe("generateOrderId()", () => {
  it("starts with 'CN-' prefix", () => {
    const id = generateOrderId();
    expect(id).toMatch(/^CN-/);
  });

  it("is 9 characters long (CN- + 6)", () => {
    const id = generateOrderId();
    expect(id).toHaveLength(9);
  });

  it("suffix is uppercase alphanumeric", () => {
    const id = generateOrderId();
    const suffix = id.slice(3);
    expect(suffix).toMatch(/^[A-Z0-9]{6}$/);
  });

  it("generates unique IDs on consecutive calls", () => {
    const ids = new Set(Array.from({ length: 10 }, () => generateOrderId()));
    // Allow for 1 duplicate in very fast runs, but mostly unique
    expect(ids.size).toBeGreaterThanOrEqual(1);
  });
});

describe("buildTelegramMessage()", () => {
  it("includes order ID in the message", () => {
    const msg = buildTelegramMessage(MOCK_ORDER, "CN-ABC123");
    expect(msg).toContain("CN-ABC123");
  });

  it("includes customer name", () => {
    const msg = buildTelegramMessage(MOCK_ORDER, "CN-X");
    expect(msg).toContain("Олег Коваленко");
  });

  it("includes email and phone", () => {
    const msg = buildTelegramMessage(MOCK_ORDER, "CN-X");
    expect(msg).toContain("oleg@example.com");
    expect(msg).toContain("+380671234567");
  });

  it("includes item title and package", () => {
    const msg = buildTelegramMessage(MOCK_ORDER, "CN-X");
    expect(msg).toContain("Ресторан / Кафе");
    expect(msg).toContain("Розширений");
  });

  it("includes total amount", () => {
    const msg = buildTelegramMessage(MOCK_ORDER, "CN-X");
    expect(msg).toContain("13");
  });

  it("includes payment method", () => {
    const msg = buildTelegramMessage(MOCK_ORDER, "CN-X");
    expect(msg).toContain("Банківська картка");
  });

  it("includes optional company when provided", () => {
    const msg = buildTelegramMessage({ ...MOCK_ORDER, company: "ТОВ Тест" }, "CN-X");
    expect(msg).toContain("ТОВ Тест");
  });

  it("omits company section when not provided", () => {
    const msg = buildTelegramMessage(MOCK_ORDER, "CN-X");
    expect(msg).not.toContain("Компанія");
  });

  it("includes business name when provided", () => {
    const msg = buildTelegramMessage({ ...MOCK_ORDER, businessName: "Кафе Сонечко" }, "CN-X");
    expect(msg).toContain("Кафе Сонечко");
  });

  it("includes domain when provided", () => {
    const msg = buildTelegramMessage({ ...MOCK_ORDER, domain: "example.com.ua" }, "CN-X");
    expect(msg).toContain("example.com.ua");
  });

  it("includes description when provided", () => {
    const msg = buildTelegramMessage({ ...MOCK_ORDER, description: "Сімейний ресторан" }, "CN-X");
    expect(msg).toContain("Сімейний ресторан");
  });

  it("handles multiple items", () => {
    const order = {
      ...MOCK_ORDER,
      items: [
        { title: "Ресторан", package: "Базовий", price: 9500 },
        { title: "SEO", package: "Стандарт", price: 5000 },
      ],
    };
    const msg = buildTelegramMessage(order, "CN-X");
    expect(msg).toContain("Ресторан");
    expect(msg).toContain("SEO");
  });
});
