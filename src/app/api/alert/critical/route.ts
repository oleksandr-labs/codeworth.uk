import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return NextResponse.json({ ok: false, reason: "not_configured" }, { status: 200 });
  }

  let body: { message?: string; digest?: string; url?: string } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "invalid_body" }, { status: 400 });
  }

  const text = [
    "🚨 *Codeworth — критична помилка*",
    body.digest ? `ID: \`${body.digest}\`` : null,
    body.url ? `URL: ${body.url}` : null,
    body.message ? `\`${body.message.slice(0, 300)}\`` : null,
    `Час: ${new Date().toISOString()}`,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "Markdown" }),
    });
    const data = (await res.json()) as { ok: boolean };
    return NextResponse.json({ ok: data.ok });
  } catch {
    return NextResponse.json({ ok: false, reason: "fetch_failed" }, { status: 200 });
  }
}
