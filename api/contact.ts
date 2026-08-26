interface VercelRequest {
  method?: string;
  body?: unknown;
}

interface VercelResponse {
  status: (code: number) => VercelResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
}

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MIN_MESSAGE_LENGTH = 10;
const MAX_MESSAGE_LENGTH = 5000;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  message?: unknown;
}

function jsonError(res: VercelResponse, status: number, error: string) {
  return res.status(status).json({ error });
}

function validateContactBody(body: ContactPayload) {
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  if (!name) {
    return { ok: false as const, status: 400, error: 'Name is required' };
  }
  if (name.length > MAX_NAME_LENGTH) {
    return { ok: false as const, status: 400, error: 'Name is too long' };
  }
  if (!email) {
    return { ok: false as const, status: 400, error: 'Email is required' };
  }
  if (email.length > MAX_EMAIL_LENGTH || !EMAIL_PATTERN.test(email)) {
    return { ok: false as const, status: 400, error: 'Invalid email address' };
  }
  if (!message) {
    return { ok: false as const, status: 400, error: 'Message is required' };
  }
  if (message.length < MIN_MESSAGE_LENGTH) {
    return { ok: false as const, status: 400, error: 'Message is too short' };
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return { ok: false as const, status: 400, error: 'Message is too long' };
  }

  return {
    ok: true as const,
    data: { name, email, message },
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return jsonError(res, 405, 'Method not allowed');
  }

  const validation = validateContactBody((req.body ?? {}) as ContactPayload);
  if (!validation.ok) {
    return jsonError(res, validation.status, validation.error);
  }

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (!webhookUrl) {
    return jsonError(res, 503, 'not configured');
  }

  try {
    const webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...validation.data,
        source: 'rubberduck-space-contact',
        submittedAt: new Date().toISOString(),
      }),
    });

    if (!webhookResponse.ok) {
      return jsonError(res, 502, 'Unable to deliver message');
    }

    return res.status(200).json({ ok: true });
  } catch {
    return jsonError(res, 502, 'Unable to deliver message');
  }
}
