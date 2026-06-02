import { http, HttpResponse } from "msw";

export const handlers = [
  // POST /api/contact
  http.post("/api/contact", () => {
    return HttpResponse.json({ ok: true, message: "Повідомлення надіслано" }, { status: 200 });
  }),

  // POST /api/newsletter
  http.post("/api/newsletter", () => {
    return HttpResponse.json({ ok: true, message: "Підписка оформлена" }, { status: 200 });
  }),

  // POST /api/order
  http.post("/api/order", () => {
    return HttpResponse.json(
      { ok: true, message: "Замовлення прийнято", orderId: "ORD-TEST-001" },
      { status: 200 }
    );
  }),

  // POST /api/auth/login
  http.post("/api/auth/login", async ({ request }) => {
    const body = (await request.json()) as { email?: string; password?: string };
    if (body?.email === "demo@Codeworth.ua" && body?.password === "demo1234") {
      return HttpResponse.json(
        { ok: true, user: { email: "demo@Codeworth.ua", name: "Demo User", role: "user" } },
        { status: 200 }
      );
    }
    return HttpResponse.json({ ok: false, error: "Невірні дані" }, { status: 401 });
  }),
];
