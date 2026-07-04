export const config = { runtime: "edge" };

const HS_PORTAL_ID = "148818262";
const HS_FORM_GUID = "29d7ab26-fc00-4b66-9b1e-55c2a5eef56c";
const HS_ENDPOINT = `https://forms.hubspot.com/uploads/form/v2/${HS_PORTAL_ID}/${HS_FORM_GUID}`;
const SHEET_WEBHOOK =
  "https://script.google.com/macros/s/AKfycbyYH3NPvWxVylQeWv09x59TrHUiZPNtUgHhUaoHe-8vYMfXlLFnObwhbN1Rb-B2Piip/exec";

const MAX_BODY_BYTES = 8_192;
const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,24}$/;

const ALLOWED_HOSTS = new Set(["uaeworkrights.com", "www.uaeworkrights.com", "localhost"]);
function originAllowed(req: Request): boolean {
  const source = req.headers.get("origin") ?? req.headers.get("referer");
  // Some privacy tools strip these headers; don't lock out real users.
  if (!source) return true;
  try {
    const host = new URL(source).hostname;
    return ALLOWED_HOSTS.has(host) || host.endsWith(".vercel.app");
  } catch {
    return false;
  }
}

// Best-effort per-instance rate limit. Edge isolates are ephemeral and not
// shared, so this is a speed bump for bursty abuse, not a guarantee.
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 1000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(k);
  }
  return recent.length > RATE_MAX;
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }
  if (!originAllowed(req)) {
    return new Response("Forbidden", { status: 403 });
  }

  const ip =
    req.headers.get("x-real-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    "unknown";
  if (rateLimited(ip)) {
    return new Response("Too Many Requests", { status: 429 });
  }

  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) {
    return new Response("Payload Too Large", { status: 413 });
  }

  let body: {
    email?: string;
    firstname?: string;
    phone?: string;
    message?: string;
    would_you_pay?: string;
    enquiry?: string;
    kbCard?: string;
    website?: string; // honeypot — real users never fill this
  };
  try {
    body = JSON.parse(raw);
  } catch {
    return new Response("Bad Request", { status: 400 });
  }

  // Honeypot filled → bot. Pretend success, forward nothing.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return new Response("OK", { status: 200 });
  }

  const email = (body.email ?? "").trim();
  const firstname = (body.firstname ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const message = (body.message ?? "").trim();
  const would_you_pay = (body.would_you_pay ?? "").trim();
  const enquiry = (body.enquiry ?? "").trim();
  const kbCard = (body.kbCard ?? "").trim();

  if (
    !EMAIL_RE.test(email) ||
    firstname.length === 0 ||
    firstname.length > 80 ||
    phone.length > 32 ||
    message.length === 0 ||
    message.length > 1400 ||
    would_you_pay.length > 60 ||
    enquiry.length > 40 ||
    kbCard.length > 40
  ) {
    return new Response("Bad Request", { status: 400 });
  }

  const params = new URLSearchParams({ email, firstname, phone, message });
  if (would_you_pay) params.set("would_you_pay", would_you_pay);

  const hsRes = await fetch(HS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  // Backup copy to the Google Sheet (Apps Script webhook). Fire-and-forget:
  // a sheet failure must never cost a lead.
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 4000);
    await fetch(SHEET_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        name: firstname,
        email,
        enquiryType: enquiry,
        kbCardClicked: kbCard,
        willingnessToPay: would_you_pay,
        message: phone ? `Phone: ${phone}\n${message}` : message,
      }),
      signal: ctrl.signal,
    }).finally(() => clearTimeout(timer));
  } catch {
    // sheet backup unavailable — HubSpot remains the source of truth
  }

  return new Response(hsRes.ok ? "OK" : "HubSpot error", {
    status: hsRes.ok ? 200 : 502,
  });
}
