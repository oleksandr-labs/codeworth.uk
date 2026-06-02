import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { rateLimit, getClientIp } from "@/lib/rateLimit";
import { ContactSchema, type ContactInput } from "@/lib/schemas";
import { verifyRecaptcha } from "@/lib/recaptcha";

export const runtime = "nodejs";

// 5 requests per 10 minutes per IP
const RATE_LIMIT = { limit: 5, windowMs: 10 * 60 * 1000 };

function buildTelegramMessage(data: ContactInput): string {
  const lines = [
    "📬 *Нова заявка з сайту codeworth.uk*",
    "",
    `👤 *Ім'я:* ${data.name}`,
    `📞 *Контакт:* ${data.contact}`,
  ];
  if (data.service) lines.push(`🛠 *Послуга:* ${data.service}`);
  if (data.budget) lines.push(`💰 *Бюджет:* ${data.budget}`);
  if (data.message) lines.push(`📝 *Повідомлення:*\n${data.message}`);
  lines.push("", `⏱ ${new Date().toLocaleString("uk-UA", { timeZone: "Europe/Kiev" })}`);
  return lines.join("\n");
}

export async function POST(request: NextRequest) {
  // Rate limiting
  const ip = getClientIp(request);
  const rl = rateLimit(ip, RATE_LIMIT);
  if (!rl.success) {
    return NextResponse.json(
      { error: "Забагато спроб. Спробуйте через кілька хвилин." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)),
        },
      }
    );
  }

  try {
    const body = await request.json();

    // Honeypot: bots fill hidden fields, humans don't
    if (body.website) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // reCAPTCHA v3 verification (optional — skip if not configured)
    if (body.recaptchaToken) {
      const isHuman = await verifyRecaptcha(body.recaptchaToken, "contact");
      if (!isHuman) {
        return NextResponse.json({ error: "Перевірка безпеки не пройдена. Спробуйте ще раз." }, { status: 400 });
      }
    }

    // Validate with Zod
    const parsed = ContactSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0];
      return NextResponse.json(
        { error: firstError?.message ?? "Некоректні дані" },
        { status: 400 }
      );
    }

    const payload = parsed.data;

    // Send to Telegram if configured
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;

    if (telegramToken && telegramChatId) {
      const text = buildTelegramMessage(payload);
      try {
        await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: telegramChatId,
            text,
            parse_mode: "Markdown",
          }),
        });
      } catch {
        // Telegram failure is non-critical
      }
    }

    // Send confirmation email via Resend
    const resendKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL ?? "hello@codeworth.uk";

    if (resendKey) {
      const html = `<!DOCTYPE html>
<html lang="uk"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;background:#f4f4f5;">
  <div style="max-width:520px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
    <div style="background:#1E1B4B;padding:28px 36px;text-align:center;">
      <h1 style="color:#fff;margin:0;font-size:20px;font-weight:700;">Codeworth</h1>
      <p style="color:#a5b4fc;margin:6px 0 0;font-size:13px;">Web Studio &amp; Marketplace</p>
    </div>
    <div style="padding:36px;">
      <h2 style="color:#1E1B4B;font-size:18px;margin:0 0 12px;">Ми отримали вашу заявку ✅</h2>
      <p style="color:#374151;font-size:14px;line-height:1.7;margin:0 0 20px;">
        Привіт, <strong>${payload.name}</strong>! Дякуємо за звернення до Codeworth.
        Ми зв'яжемося з вами протягом <strong>2 годин</strong>.
      </p>
      ${payload.service ? `<p style="color:#374151;font-size:14px;margin:0 0 8px;">📋 <strong>Послуга:</strong> ${payload.service}</p>` : ""}
      ${payload.budget ? `<p style="color:#374151;font-size:14px;margin:0 0 20px;">💰 <strong>Бюджет:</strong> ${payload.budget}</p>` : ""}
      <div style="text-align:center;margin:24px 0;">
        <a href="https://codeworth.uk/uk/portfolio" style="display:inline-block;background:#4f46e5;color:#fff;padding:11px 26px;border-radius:10px;text-decoration:none;font-size:14px;font-weight:600;">Переглянути портфоліо →</a>
      </div>
      <p style="color:#9ca3af;font-size:12px;margin:0;text-align:center;">hello@codeworth.uk · codeworth.uk</p>
    </div>
  </div>
</body></html>`;

      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendKey}`,
          },
          body: JSON.stringify({
            from: `Codeworth <${fromEmail}>`,
            to: [payload.contact.includes("@") ? payload.contact : "hello@codeworth.uk"],
            subject: "Заявку прийнято — Codeworth зв'яжеться з вами скоро",
            html,
          }),
        });
      } catch {
        // Email delivery failure is non-critical
      }
    }

    // Log in development
    if (process.env.NODE_ENV === "development") {
      console.log("[contact form]", payload);
    }

    return NextResponse.json(
      { success: true, message: "Заявку отримано. Зв'яжемося протягом 2 годин!" },
      { status: 200 }
    );
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json(
        { error: err.issues[0]?.message ?? "Некоректні дані" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Щось пішло не так. Спробуйте ще раз або напишіть нам у Telegram." },
      { status: 500 }
    );
  }
}
