import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

interface ContactPayload {
  name: string;
  email: string;
  affiliation?: string;
  intent: string;
  subject: string;
  message: string;
  turnstileToken?: string;
}

function isValidPayload(body: unknown): body is ContactPayload {
  if (typeof body !== 'object' || body === null) return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.name === 'string' &&
    b.name.trim().length > 0 &&
    typeof b.email === 'string' &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email) &&
    typeof b.intent === 'string' &&
    b.intent.length > 0 &&
    typeof b.subject === 'string' &&
    b.subject.trim().length > 0 &&
    typeof b.message === 'string' &&
    b.message.trim().length >= 20
  );
}

// Optional: verify a Cloudflare Turnstile token if TURNSTILE_SECRET_KEY is set.
async function verifyTurnstile(token: string | undefined): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // Turnstile not configured; skip verification.
  if (!token) return false;

  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token }),
    });
    const data = await res.json();
    return data.success === true;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!isValidPayload(body)) {
    return NextResponse.json({ error: 'Missing or invalid fields' }, { status: 400 });
  }

  const turnstileOk = await verifyTurnstile(body.turnstileToken);
  if (!turnstileOk) {
    return NextResponse.json({ error: 'Verification failed' }, { status: 400 });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL;
  const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev';

  // If Resend isn't configured, log and succeed so the form still works in development.
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL) {
    console.warn('[contact] RESEND_API_KEY or CONTACT_TO_EMAIL not set; message not sent:', body);
    return NextResponse.json({ ok: true, delivered: false });
  }

  const escapeHtml = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const html = `
    <h2>New contact form submission</h2>
    <p><strong>Name:</strong> ${escapeHtml(body.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(body.email)}</p>
    <p><strong>Affiliation:</strong> ${escapeHtml(body.affiliation || '—')}</p>
    <p><strong>Intent:</strong> ${escapeHtml(body.intent)}</p>
    <p><strong>Subject:</strong> ${escapeHtml(body.subject)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(body.message).replace(/\n/g, '<br/>')}</p>
  `;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Portfolio Contact Form <${CONTACT_FROM_EMAIL}>`,
        to: [CONTACT_TO_EMAIL],
        reply_to: body.email,
        subject: `[Portfolio] ${body.subject}`,
        html,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('[contact] Resend error:', errText);
      return NextResponse.json({ error: 'Failed to send message' }, { status: 502 });
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error('[contact] Unexpected error:', err);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
