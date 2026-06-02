import { NextRequest, NextResponse } from "next/server";
import { rateLimit, getClientIp } from "@/lib/rateLimit";
import { OrderSchema, type OrderInput } from "@/lib/schemas";
import { verifyRecaptcha } from "@/lib/recaptcha";

export const runtime = "nodejs";

// 3 orders per 30 minutes per IP
const RATE_LIMIT = { limit: 3, windowMs: 30 * 60 * 1000 };

function generateOrderId(): string {
  return `CN-${Date.now().toString(36).toUpperCase().slice(-6)}`;
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

  lines.push("", `⏱ ${new Date().toLocaleString("uk-UA", { timeZone: "Europe/Kiev" })}`);
  return lines.join("\n");
}

function buildOrderConfirmationEmail(data: OrderInput, orderId: string): string {
  const itemsHtml = data.items
    .map(
      (item) =>
        `<tr>
          <td style="padding:8px 0;color:#374151;">${item.title}</td>
          <td style="padding:8px 0;color:#6b7280;font-size:13px;">${item.package}</td>
          <td style="padding:8px 0;font-weight:600;text-align:right;color:#374151;">${item.price.toLocaleString("uk-UA")} ₴</td>
        </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="uk">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;background:#f4f4f5;">
  <div style="max-width:560px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
    <div style="background:#1E1B4B;padding:32px 40px;text-align:center;">
      <h1 style="color:#fff;margin:0;font-size:22px;font-weight:700;">Codeworth</h1>
      <p style="color:#a5b4fc;margin:8px 0 0;font-size:14px;">Web Studio &amp; Marketplace</p>
    </div>
    <div style="padding:40px;">
      <h2 style="color:#1E1B4B;font-size:20px;margin:0 0 8px;">Дякуємо за замовлення! 🎉</h2>
      <p style="color:#374151;font-size:15px;line-height:1.6;margin:0 0 24px;">
        Привіт, <strong>${data.firstName}</strong>! Ваше замовлення <strong>#${orderId}</strong> прийнято.
        Наш менеджер зв'яжеться з вами протягом 30 хвилин.
      </p>
      <div style="background:#f0f0ff;border-radius:12px;padding:20px;margin-bottom:24px;">
        <h3 style="margin:0 0 12px;font-size:14px;color:#1E1B4B;font-weight:700;">Деталі замовлення</h3>
        <table style="width:100%;border-collapse:collapse;">
          ${itemsHtml}
          <tr style="border-top:1px solid #e0e7ff;">
            <td colspan="2" style="padding:12px 0 4px;font-weight:700;color:#1E1B4B;font-size:15px;">Разом</td>
            <td style="padding:12px 0 4px;font-weight:700;color:#4f46e5;font-size:15px;text-align:right;">${data.total.toLocaleString("uk-UA")} ₴</td>
          </tr>
        </table>
        <p style="margin:12px 0 0;font-size:13px;color:#6b7280;">Метод оплати: ${data.paymentMethod}</p>
      </div>
      <div style="background:#f0fdf4;border-radius:12px;padding:20px;margin-bottom:24px;">
        <h3 style="margin:0 0 12px;font-size:14px;color:#15803d;font-weight:700;">Що далі?</h3>
        <ol style="margin:0;padding-left:20px;color:#374151;font-size:14px;line-height:1.8;">
          <li>Очікуйте дзвінка або повідомлення від менеджера</li>
          <li>Обговоримо деталі та підтвердимо ТЗ</li>
          <li>Ви отримаєте доступ до особистого кабінету</li>
          <li>Розпочнемо роботу над вашим сайтом</li>
        </ol>
      </div>
      <div style="text-align:center;margin-bottom:24px;">
        <a href="https://codeworth.uk/uk/marketplace/catalog" style="display:inline-block;background:#4f46e5;color:#fff;padding:12px 28px;border-radius:10px;text-decoration:none;font-size:14px;font-weight:600;">До каталогу →</a>
      </div>
      <p style="color:#9ca3af;font-size:13px;margin:0;text-align:center;">Запитання? Пишіть: hello@codeworth.uk</p>
    </div>
  </div>
</body>
</html>`;
}

async function sendResendEmail(to: string, subject: string, html: string): Promise<void> {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) return;

  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "hello@codeworth.uk";

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${resendKey}`,
    },
    body: JSON.stringify({
      from: `Codeworth <${fromEmail}>`,
      to: [to],
      subject,
      html,
    }),
  });
}

export async function POST(request: NextRequest) {
  // Rate limiting
  const ip = getClientIp(request);
  const rl = rateLimit(ip, RATE_LIMIT);
  if (!rl.success) {
    return NextResponse.json(
      { error: "Забагато запитів. Спробуйте через кілька хвилин." },
      {
        status: 429,
        headers: { "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)) },
      }
    );
  }

  try {
    const body = await request.json();

    // reCAPTCHA v3 verification (optional — skip if not configured)
    if (body.recaptchaToken) {
      const isHuman = await verifyRecaptcha(body.recaptchaToken, "order");
      if (!isHuman) {
        return NextResponse.json({ error: "Перевірка безпеки не пройдена. Спробуйте ще раз." }, { status: 400 });
      }
    }

    // Validate with Zod
    const parsed = OrderSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0];
      return NextResponse.json(
        { error: firstError?.message ?? "Некоректні дані замовлення" },
        { status: 400 }
      );
    }

    const payload = parsed.data;
    const orderId = generateOrderId();

    // Send to Telegram if configured
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;

    if (telegramToken && telegramChatId) {
      const text = buildTelegramMessage(payload, orderId);
      await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: telegramChatId, text, parse_mode: "Markdown" }),
      });
    }

    // Send confirmation email via Resend
    await sendResendEmail(
      payload.email,
      `Замовлення #${orderId} прийнято — Codeworth`,
      buildOrderConfirmationEmail(payload, orderId)
    );

    if (process.env.NODE_ENV === "development") {
      console.log("[order]", orderId, payload);
    }

    return NextResponse.json(
      {
        success: true,
        orderId,
        message: "Замовлення успішно оформлено! Наш менеджер зв'яжеться з вами протягом 30 хвилин.",
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Щось пішло не так. Спробуйте ще раз або зв'яжіться з нами напряму." },
      { status: 500 }
    );
  }
}
