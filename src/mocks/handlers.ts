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
];
