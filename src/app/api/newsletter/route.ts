import { NextRequest, NextResponse } from "next/server";
import { rateLimit, getClientIp } from "@/lib/rateLimit";
import { NewsletterSchema } from "@/lib/schemas";

function buildWelcomeEmail(email: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:Inter,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;max-width:600px;width:100%;">
        <tr>
          <td style="background:linear-gradient(135deg,#6366f1,#8b5cf6);padding:40px 40px 32px;text-align:center;">
            <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:700;letter-spacing:-0.5px;">Codeworth</h1>
            <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">codeworth.uk</p>
          </td>
        </tr>
        <tr>
          <td style="padding:40px;">
            <h2 style="margin:0 0 16px;color:#111827;font-size:22px;font-weight:600;">Welcome to Codeworth Newsletter!</h2>
            <p style="margin:0 0 16px;color:#374151;font-size:16px;line-height:1.6;">
              Thank you for subscribing. You'll be the first to know about:
            </p>
            <ul style="margin:0 0 24px;padding-left:20px;color:#374151;font-size:15px;line-height:1.8;">
              <li>New web development articles & guides</li>
              <li>Case studies and project showcases</li>
              <li>Tips, tools, and industry insights</li>
              <li>Exclusive offers for subscribers</li>
            </ul>
            <div style="text-align:center;margin:32px 0;">
              <a href="https://codeworth.uk/en/blog" style="display:inline-block;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;padding:14px 32px;border-radius:8px;">Read Our Blog</a>
            </div>
            <p style="margin:24px 0 0;color:#6b7280;font-size:13px;text-align:center;">
              You subscribed with <strong>${email}</strong>.<br>
              To unsubscribe, reply to this email with "Unsubscribe".
            </p>
          </td>
        </tr>
        <tr>
          <td style="background:#f3f4f6;padding:20px 40px;text-align:center;">
            <p style="margin:0;color:#9ca3af;font-size:12px;">© ${new Date().getFullYear()} Codeworth · codeworth.uk</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export const runtime = "nodejs";

// 3 requests per 5 minutes per IP
const RATE_LIMIT = { limit: 3, windowMs: 5 * 60 * 1000 };

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

    // Honeypot
    if (body.website) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Validate with Zod
    const parsed = NewsletterSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0];
      return NextResponse.json(
        { error: firstError?.message ?? "Введіть коректний email" },
        { status: 400 }
      );
    }

    const { email } = parsed.data;

    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;

    if (telegramToken && telegramChatId) {
      const text = [
        "📧 *Нова підписка на розсилку Codeworth*",
        "",
        `📬 *Email:* ${email}`,
        "",
        `⏱ ${new Date().toLocaleString("uk-UA", { timeZone: "Europe/Kiev" })}`,
      ].join("\n");

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

    // Send welcome email via Resend
    const resendKey = process.env.RESEND_API_KEY;
    const resendFrom = process.env.RESEND_FROM_EMAIL ?? "hello@codeworth.uk";
    if (resendKey) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendKey}`,
          },
          body: JSON.stringify({
            from: `Codeworth <${resendFrom}>`,
            to: [email],
            subject: "Welcome to Codeworth Newsletter!",
            html: buildWelcomeEmail(email),
          }),
        });
      } catch {
        // Email delivery failure is non-critical
      }
    }

    if (process.env.NODE_ENV === "development") {
      console.log("[newsletter]", email);
    }

    return NextResponse.json(
      { success: true, message: "Дякуємо! Ви підписалися на розсилку Codeworth." },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Щось пішло не так. Спробуйте ще раз." },
      { status: 500 }
    );
  }
}
