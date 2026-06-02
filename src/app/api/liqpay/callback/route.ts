import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs";

function liqpaySign(privateKey: string, data: string): string {
  return crypto
    .createHash("sha1")
    .update(privateKey + data + privateKey)
    .digest("base64");
}

export async function POST(request: NextRequest) {
  const privateKey = process.env.LIQPAY_PRIVATE_KEY;
  if (!privateKey) {
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }

  try {
    const formData = await request.formData();
    const data = formData.get("data") as string | null;
    const signature = formData.get("signature") as string | null;

    if (!data || !signature) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    // Verify signature
    const expectedSig = liqpaySign(privateKey, data);
    if (expectedSig !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
    }

    const decoded = JSON.parse(Buffer.from(data, "base64").toString("utf-8")) as Record<string, string>;

    if (process.env.NODE_ENV === "development") {
      console.log("[liqpay callback]", decoded);
    }

    // Notify via Telegram on success
    if (decoded.status === "success" || decoded.status === "sandbox") {
      const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
      const telegramChatId = process.env.TELEGRAM_CHAT_ID;

      if (telegramToken && telegramChatId) {
        const text = [
          "✅ *LiqPay — оплата підтверджена!*",
          `📋 Замовлення: \`${decoded.order_id ?? "—"}\``,
          `💰 Сума: ${decoded.amount ?? "—"} ${decoded.currency ?? "UAH"}`,
          `📧 Клієнт: ${decoded.sender_email ?? decoded.customer ?? "—"}`,
          `📱 Телефон: ${decoded.sender_phone ?? "—"}`,
          `⏱ ${new Date().toLocaleString("uk-UA", { timeZone: "Europe/Kiev" })}`,
        ].join("\n");

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

      // Send confirmation email via Resend
      const resendKey = process.env.RESEND_API_KEY;
      const fromEmail = process.env.RESEND_FROM_EMAIL ?? "hello@codeworth.uk";
      const clientEmail = decoded.sender_email ?? decoded.customer;

      if (resendKey && clientEmail) {
        try {
          await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${resendKey}`,
            },
            body: JSON.stringify({
              from: `Codeworth <${fromEmail}>`,
              to: [clientEmail],
              subject: `✅ Payment confirmed — Order #${decoded.order_id ?? ""}`,
              html: buildPaymentConfirmationEmail(decoded),
            }),
          });
        } catch {
          // Email delivery failure is non-critical
        }
      }
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

function buildPaymentConfirmationEmail(decoded: Record<string, string>): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;background:#f4f4f5;">
  <div style="max-width:560px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
    <div style="background:#1E1B4B;padding:32px 40px;text-align:center;">
      <h1 style="color:#fff;margin:0;font-size:22px;font-weight:700;">Codeworth</h1>
      <p style="color:#a5b4fc;margin:8px 0 0;font-size:14px;">Web Studio &amp; Marketplace</p>
    </div>
    <div style="padding:40px;">
      <h2 style="color:#1E1B4B;font-size:20px;margin:0 0 16px;">Payment Confirmed ✅</h2>
      <p style="color:#374151;font-size:15px;line-height:1.6;margin:0 0 24px;">
        Your payment for order <strong>#${decoded.order_id ?? ""}</strong> has been successfully processed.
        Our manager will contact you within 30 minutes.
      </p>
      <div style="background:#f0f0ff;border-radius:12px;padding:20px;margin-bottom:24px;">
        <table style="width:100%;font-size:14px;color:#374151;border-collapse:collapse;">
          <tr><td style="padding:4px 0;color:#6b7280;">Order ID</td><td style="padding:4px 0;font-weight:600;text-align:right;">#${decoded.order_id ?? "—"}</td></tr>
          <tr><td style="padding:4px 0;color:#6b7280;">Amount</td><td style="padding:4px 0;font-weight:600;text-align:right;">${decoded.amount ?? "—"} ${decoded.currency ?? "UAH"}</td></tr>
          <tr><td style="padding:4px 0;color:#6b7280;">Status</td><td style="padding:4px 0;font-weight:600;text-align:right;color:#16a34a;">Paid</td></tr>
        </table>
      </div>
      <div style="text-align:center;margin-bottom:24px;">
        <a href="https://codeworth.uk/uk/marketplace/account" style="display:inline-block;background:#4f46e5;color:#fff;padding:12px 28px;border-radius:10px;text-decoration:none;font-size:14px;font-weight:600;">My Account →</a>
      </div>
      <p style="color:#9ca3af;font-size:13px;margin:0;text-align:center;">Questions? Contact us: hello@codeworth.uk</p>
    </div>
  </div>
</body>
</html>`;
}
