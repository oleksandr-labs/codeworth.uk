import { rateLimit, getClientIp } from "@/lib/rateLimit";
import { PartnershipSchema } from "@/lib/schemas";
import { ZodError } from "zod";

export async function POST(req: Request) {
  const ip = getClientIp(req as Parameters<typeof getClientIp>[0]);
  const rl = rateLimit(ip, { limit: 3, windowMs: 60 * 60 * 1000 });
  if (!rl.success) {
    const retryAfter = Math.ceil((rl.resetAt - Date.now()) / 1000);
    return Response.json(
      { error: "Забагато спроб. Спробуйте пізніше." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Honeypot check
  if ((body as { honeypot?: string })?.honeypot) {
    return Response.json({ success: true });
  }

  let data: ReturnType<typeof PartnershipSchema.parse>;
  try {
    data = PartnershipSchema.parse(body);
  } catch (err) {
    if (err instanceof ZodError) {
      return Response.json(
        { error: err.issues[0]?.message ?? "Validation error" },
        { status: 422 }
      );
    }
    return Response.json({ error: "Invalid data" }, { status: 400 });
  }

  // Telegram notification
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (token && chatId) {
    const typeLabel =
      data.type === "referral"
        ? "Реферальна програма"
        : data.type === "agency"
        ? "Агентське партнерство"
        : "Технологічне партнерство";

    const text = [
      "🤝 <b>Нова заявка на партнерство</b>",
      `👤 Ім'я: ${data.name}`,
      `📧 Email: ${data.email}`,
      `🏷 Тип: ${typeLabel}`,
      data.audience ? `👥 Аудиторія: ${data.audience}` : null,
      `📝 Опис: ${data.description}`,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
      });
    } catch {
      // Telegram failure is non-critical
    }
  }

  return Response.json({ success: true });
}
