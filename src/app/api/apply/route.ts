import { NextRequest, NextResponse } from "next/server";
import { rateLimit, getClientIp } from "@/lib/rateLimit";
import { ApplySchema, type ApplyInput } from "@/lib/schemas";

export const runtime = "nodejs";

// 3 applications per 30 minutes per IP
const RATE_LIMIT = { limit: 3, windowMs: 30 * 60 * 1000 };

function buildTelegramMessage(data: ApplyInput): string {
  const lines = [
    "💼 *Нова заявка на вакансію — codeworth.uk*",
    "",
    `👤 *Ім'я:* ${data.name}`,
    `📧 *Email:* ${data.email}`,
    `🎯 *Позиція:* ${data.position}`,
  ];
  if (data.portfolioUrl) lines.push(`🔗 *Портфоліо/GitHub:* ${data.portfolioUrl}`);
  lines.push(`📝 *Cover letter:*\n${data.coverLetter}`);
  lines.push("", `⏱ ${new Date().toLocaleString("uk-UA", { timeZone: "Europe/Kiev" })}`);
  return lines.join("\n");
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const rl = rateLimit(ip, RATE_LIMIT);
  if (!rl.success) {
    return NextResponse.json(
      { error: "Забагато спроб. Спробуйте через кілька хвилин." },
      {
        status: 429,
        headers: { "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)) },
      }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Невалідний JSON" }, { status: 400 });
  }

  // Honeypot
  if (body && typeof body === "object" && "website" in body && (body as Record<string, unknown>).website) {
    return NextResponse.json({ success: true }, { status: 200 });
  }

  const parsed = ApplySchema.safeParse(body);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0];
    return NextResponse.json(
      { error: firstError?.message ?? "Некоректні дані" },
      { status: 400 }
    );
  }

  const payload = parsed.data;

  const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChatId = process.env.TELEGRAM_CHAT_ID;

  if (telegramToken && telegramChatId) {
    const text = buildTelegramMessage(payload);
    try {
      await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: telegramChatId, text, parse_mode: "Markdown" }),
      });
    } catch {
      // Telegram failure is non-critical
    }
  }

  // Send confirmation email to applicant via Resend
  const resendKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "hello@codeworth.uk";
  if (resendKey) {
    const html = `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;background:#f4f4f5;">
  <div style="max-width:520px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
    <div style="background:#1E1B4B;padding:28px 36px;text-align:center;">
      <h1 style="color:#fff;margin:0;font-size:20px;font-weight:700;">Codeworth</h1>
      <p style="color:#a5b4fc;margin:6px 0 0;font-size:13px;">Web Studio &amp; Marketplace</p>
    </div>
    <div style="padding:36px;">
      <h2 style="color:#1E1B4B;font-size:18px;margin:0 0 12px;">Application Received ✅</h2>
      <p style="color:#374151;font-size:14px;line-height:1.7;margin:0 0 20px;">
        Hi <strong>${payload.name}</strong>, thank you for applying to Codeworth!
        We've received your application for <strong>${payload.position}</strong> and will review it within <strong>3 business days</strong>.
      </p>
      <div style="background:#f0f0ff;border-radius:10px;padding:16px 20px;margin-bottom:24px;">
        <p style="color:#374151;font-size:13px;margin:0 0 6px;">📋 <strong>Position:</strong> ${payload.position}</p>
        <p style="color:#374151;font-size:13px;margin:0;">📧 <strong>Email:</strong> ${payload.email}</p>
      </div>
      <p style="color:#374151;font-size:14px;line-height:1.6;margin:0 0 24px;">
        If we find your profile a good match, we'll reach out to schedule an interview. In the meantime, feel free to check out our portfolio.
      </p>
      <div style="text-align:center;margin-bottom:24px;">
        <a href="https://codeworth.uk/en/portfolio" style="display:inline-block;background:#4f46e5;color:#fff;padding:11px 26px;border-radius:10px;text-decoration:none;font-size:14px;font-weight:600;">View Our Portfolio →</a>
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
          to: [payload.email],
          subject: `Application Received — ${payload.position} at Codeworth`,
          html,
        }),
      });
    } catch {
      // Email delivery failure is non-critical
    }
  }

  if (process.env.NODE_ENV === "development") {
    console.log("[apply]", payload);
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
