import { renderContactEmail } from "./emailTemplate"

export interface Env {
  RESEND_API_KEY: string
  ALLOWED_ORIGINS: string
  FROM_ADDRESS: string
  TO_ADDRESS: string
}

interface ContactPayload {
  name: string
  email: string
  phone: string
  message: string
  company?: string
  // Honeypot: real visitors never fill this hidden field.
  website?: string
}

function corsHeaders(origin: string | null, env: Env): HeadersInit {
  const allowed = env.ALLOWED_ORIGINS.split(",").map((o) => o.trim())
  const allowOrigin = origin && allowed.includes(origin) ? origin : allowed[0]
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  }
}

function json(data: unknown, status: number, headers: HeadersInit): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...headers, "Content-Type": "application/json" },
  })
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Accepts +56 9 1234 5678, 56912345678, 912345678, with any mix of
// spaces/dashes/parens. Chilean national numbers are 9 digits starting 2-9
// (9 = mobile, 2 = Santiago landline, other regions use other leading digits).
function isValidChileanPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "")
  const national =
    digits.startsWith("56") && digits.length === 11 ? digits.slice(2) : digits
  return /^[2-9]\d{8}$/.test(national)
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin")
    const headers = corsHeaders(origin, env)

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers })
    }

    if (request.method !== "POST") {
      return json({ ok: false, error: "method_not_allowed" }, 405, headers)
    }

    let body: ContactPayload
    try {
      body = await request.json()
    } catch {
      return json({ ok: false, error: "invalid_json" }, 400, headers)
    }

    // Honeypot: silently pretend success so bots don't learn to skip the field.
    if (body.website) {
      return json({ ok: true }, 200, headers)
    }

    const name = (body.name ?? "").trim()
    const email = (body.email ?? "").trim()
    const phone = (body.phone ?? "").trim()
    const message = (body.message ?? "").trim()
    const company = (body.company ?? "").trim()

    if (!name || name.length > 200) {
      return json({ ok: false, error: "invalid_name" }, 400, headers)
    }
    if (!email || email.length > 200 || !EMAIL_RE.test(email)) {
      return json({ ok: false, error: "invalid_email" }, 400, headers)
    }
    if (!phone || phone.length > 20 || !isValidChileanPhone(phone)) {
      return json({ ok: false, error: "invalid_phone" }, 400, headers)
    }
    if (!message || message.length > 5000) {
      return json({ ok: false, error: "invalid_message" }, 400, headers)
    }

    const { html, text } = renderContactEmail({ name, email, phone, message, company })

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.FROM_ADDRESS,
        to: [env.TO_ADDRESS],
        reply_to: email,
        subject: `Nueva consulta desde altotest.cl — ${name}`,
        text,
        html,
      }),
    })

    if (!resendResponse.ok) {
      const detail = await resendResponse.text()
      console.error("resend_error", resendResponse.status, detail)
      return json({ ok: false, error: "send_failed" }, 502, headers)
    }

    return json({ ok: true }, 200, headers)
  },
}
