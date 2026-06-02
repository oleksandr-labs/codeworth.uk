import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { z } from "zod";
import { rateLimit, getClientIp } from "@/lib/rateLimit";

export const runtime = "nodejs";

const RATE_LIMIT = { limit: 5, windowMs: 10 * 60 * 1000 };

const CreatePaymentSchema = z.object({
  amount: z.number().positive(),
  orderId: z.string().min(1).max(100),
  description: z.string().min(1).max(500),
  email: z.string().email().optional(),
});

function liqpaySign(privateKey: string, data: string): string {
  return crypto
    .createHash("sha1")
    .update(privateKey + data + privateKey)
    .digest("base64");
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const rl = rateLimit(ip, RATE_LIMIT);
  if (!rl.success) {
    return NextResponse.json(
      { error: "Забагато запитів. Спробуйте через кілька хвилин." },
      { status: 429, headers: { "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)) } }
    );
  }

  const publicKey = process.env.LIQPAY_PUBLIC_KEY;
  const privateKey = process.env.LIQPAY_PRIVATE_KEY;

  if (!publicKey || !privateKey) {
    return NextResponse.json(
      { error: "Платіжний сервіс недоступний. Оберіть інший метод оплати." },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const parsed = CreatePaymentSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Некоректні дані" },
        { status: 400 }
      );
    }

    const { amount, orderId, description, email } = parsed.data;
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://codeworth.uk";

    const params: Record<string, string> = {
      public_key: publicKey,
      version: "3",
      action: "pay",
      amount: String(amount),
      currency: "UAH",
      description,
      order_id: orderId,
      result_url: `${baseUrl}/uk/marketplace/account`,
      server_url: `${baseUrl}/api/liqpay/callback`,
    };
    if (email) params.customer = email;

    const data = Buffer.from(JSON.stringify(params)).toString("base64");
    const signature = liqpaySign(privateKey, data);

    return NextResponse.json({
      data,
      signature,
      checkoutUrl: "https://www.liqpay.ua/api/3/checkout",
    });
  } catch {
    return NextResponse.json(
      { error: "Помилка створення платежу. Спробуйте ще раз." },
      { status: 500 }
    );
  }
}
