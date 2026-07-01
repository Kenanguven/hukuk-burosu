import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/lib/site";

const schema = {
  name: { min: 2, max: 120 },
  phone: { min: 6, max: 32 },
  email: { min: 5, max: 200 },
  subject: { min: 2, max: 200 },
  message: { min: 10, max: 4000 },
};

const MAX_BODY_BYTES = 12_000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const rateLimit = new Map<string, { count: number; resetAt: number }>();

function clean(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!),
  );
}

export async function POST(req: Request) {
  const contentLength = Number(req.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Ä°stek boyutu Ã§ok bÃ¼yÃ¼k." }, { status: 413 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";
  const now = Date.now();
  if (rateLimit.size > 1000) {
    for (const [key, value] of rateLimit) {
      if (value.resetAt <= now) rateLimit.delete(key);
    }
  }
  const current = rateLimit.get(ip);
  if (!current || current.resetAt <= now) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
  } else {
    current.count += 1;
    if (current.count > RATE_LIMIT_MAX) {
      return NextResponse.json(
        { error: "Ã‡ok fazla deneme yapÄ±ldÄ±. LÃ¼tfen biraz sonra tekrar deneyin." },
        { status: 429 },
      );
    }
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  if (clean(body._honey)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name);
  const phone = clean(body.phone);
  const email = clean(body.email);
  const subject = clean(body.subject);
  const message = clean(body.message);
  const kvkk = body.kvkk === "on" || body.kvkk === true || body.kvkk === "true";

  if (!kvkk) {
    return NextResponse.json(
      { error: "KVKK onayı vermeniz gerekiyor." },
      { status: 400 },
    );
  }

  for (const [k, v] of Object.entries({ name, phone, email, subject, message })) {
    const rule = schema[k as keyof typeof schema];
    if (!rule) continue;
    if (v.length < rule.min || v.length > rule.max) {
      return NextResponse.json(
        { error: `${k} alanı geçerli değil.` },
        { status: 400 },
      );
    }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Geçerli bir e-posta adresi giriniz." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_INBOX ?? site.email;
  const from =
    process.env.CONTACT_FROM ?? "İletişim Formu <onboarding@resend.dev>";

  if (!apiKey) {
    console.warn("[contact] RESEND_API_KEY tanımsız — mesaj kaydedildi:", {
      name,
      email,
      subject,
    });
    return NextResponse.json({ ok: true });
  }

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;color:#3E2723;background:#FAF6EF;padding:24px;border-radius:12px;max-width:640px;margin:auto">
      <h2 style="font-family:Georgia,serif;color:#6B4423;margin:0 0 16px">Yeni İletişim Formu Mesajı</h2>
      <p style="margin:0 0 4px"><strong>Ad Soyad:</strong> ${escapeHtml(name)}</p>
      <p style="margin:0 0 4px"><strong>Telefon:</strong> ${escapeHtml(phone)}</p>
      <p style="margin:0 0 4px"><strong>E-posta:</strong> ${escapeHtml(email)}</p>
      <p style="margin:0 0 16px"><strong>Konu:</strong> ${escapeHtml(subject)}</p>
      <div style="background:#F5EDE0;padding:16px;border-radius:8px;white-space:pre-wrap">${escapeHtml(message)}</div>
    </div>`;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `İletişim: ${subject}`,
      html,
    });
    if (error) {
      console.error("[contact] resend error", error);
      return NextResponse.json(
        { error: "Mesaj iletilemedi. Lütfen tekrar deneyin." },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("[contact] send failed", err);
    return NextResponse.json(
      { error: "Mesaj iletilemedi. Lütfen tekrar deneyin." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
