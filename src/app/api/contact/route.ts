import { NextResponse } from "next/server";
import { deliverContactMessage } from "@/lib/contact-delivery";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, { count: number; until: number }>();

function plain(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > max || /[\r\n]/.test(trimmed)) return null;
  return trimmed;
}

function rateLimited(ip: string) {
  const now = Date.now();
  for (const [key, entry] of hits) if (entry.until <= now) hits.delete(key);
  const entry = hits.get(ip);
  if (!entry || entry.until <= now) { hits.set(ip, { count: 1, until: now + WINDOW_MS }); return false; }
  entry.count += 1;
  return entry.count > MAX_REQUESTS;
}

export async function POST(request: Request) {
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > 8_192) return NextResponse.json({ error: "invalid_request" }, { status: 413 });
  const reader = request.body?.getReader();
  if (!reader) return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 8_192) { await reader.cancel(); return NextResponse.json({ error: "invalid_request" }, { status: 413 }); }
      chunks.push(value);
    }
  } catch { return NextResponse.json({ error: "invalid_request" }, { status: 400 }); }

  let body: Record<string, unknown>;
  try {
    const raw = new TextDecoder().decode(Buffer.concat(chunks.map((chunk) => Buffer.from(chunk))));
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return NextResponse.json({ error: "invalid_request" }, { status: 400 });
    body = parsed as Record<string, unknown>;
  } catch { return NextResponse.json({ error: "invalid_request" }, { status: 400 }); }

  // Silently discard automated honeypot submissions, without storing or emailing their contents.
  if (typeof body.website === "string" && body.website.trim()) return NextResponse.json({ ok: true });

  const name = plain(body.name, 120);
  const email = plain(body.email, 254);
  const subject = plain(body.subject || "Portfolio contact", 160);
  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (!name || !email || !subject || message.length < 10 || message.length > 5_000 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  // The portfolio's Nginx reverse proxy appends the observed client IP. Use the rightmost value,
  // because an address supplied by the browser appears to the left of the trusted proxy value.
  const ip = request.headers.get("x-forwarded-for")?.split(",").at(-1)?.trim() || "unknown";
  if (rateLimited(ip)) return NextResponse.json({ error: "unavailable" }, { status: 429 });

  const delivery = await deliverContactMessage({ name, email, subject, message });
  if (delivery === "sent") return NextResponse.json({ ok: true });
  if (delivery === "not_configured") return NextResponse.json({ error: "transport_not_configured" }, { status: 503 });
  return NextResponse.json({ error: "unavailable" }, { status: delivery === "invalid_config" ? 503 : 502 });
}
