/**
 * MSW Node server для інтеграційних тестів.
 *
 * Використання в тестовому файлі:
 *
 * ```ts
 * // @jest-environment node
 * import { server } from "@/mocks/server";
 * import { http, HttpResponse } from "msw";
 *
 * beforeAll(() => server.listen({ onUnhandledRequest: "warn" }));
 * afterEach(() => server.resetHandlers());
 * afterAll(() => server.close());
 *
 * it("повертає помилку", () => {
 *   server.use(http.post("/api/contact", () => HttpResponse.json({ error: "fail" }, { status: 500 })));
 *   // ...
 * });
 * ```
 *
 * Важливо: додай `@jest-environment node` на початок файлу,
 * оскільки MSW/node потребує Node.js оточення (не jsdom).
 */
import { setupServer } from "msw/node";
import { handlers } from "./handlers";

export const server = setupServer(...handlers);
