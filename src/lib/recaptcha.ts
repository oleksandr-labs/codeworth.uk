const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY;
const MIN_SCORE = 0.5;

interface RecaptchaResponse {
  success: boolean;
  score?: number;
  action?: string;
  "error-codes"?: string[];
}

export async function verifyRecaptcha(token: string, expectedAction?: string): Promise<boolean> {
  if (!RECAPTCHA_SECRET) return true; // Skip verification if not configured

  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: RECAPTCHA_SECRET, response: token }),
    });

    const data: RecaptchaResponse = await res.json();

    if (!data.success) return false;
    if (data.score !== undefined && data.score < MIN_SCORE) return false;
    if (expectedAction && data.action && data.action !== expectedAction) return false;

    return true;
  } catch {
    return true; // Fail open — don't block users if reCAPTCHA is down
  }
}
