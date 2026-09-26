interface Env { DB: D1Database }

const limits = {
  name: 120,
  email: 254,
  company: 200,
  country: 100,
  interest: 100,
  quantity: 50,
  message: 5000,
} as const;

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (contentLength > 16_384) return Response.json({ error: 'Your message is too large.' }, { status: 413 });
  if (!request.headers.get('content-type')?.includes('application/json')) {
    return Response.json({ error: 'Expected a JSON submission.' }, { status: 415 });
  }

  const data = await request.json().catch(() => null) as Record<string, unknown> | null;
  if (!data || typeof data !== 'object') {
    return Response.json({ error: 'Please check the form and try again.' }, { status: 400 });
  }

  // Quietly discard automated submissions that fill the visually hidden field.
  if (typeof data.website === 'string' && data.website.trim()) return Response.json({ ok: true }, { status: 201 });

  const fields = Object.fromEntries(Object.entries(limits).map(([key]) => {
    const value = data[key];
    return [key, typeof value === 'string' ? value.trim() : ''];
  })) as Record<keyof typeof limits, string>;

  if (!fields.name || !fields.email || !fields.message) {
    return Response.json({ error: 'Please complete the required fields.' }, { status: 400 });
  }
  for (const [key, max] of Object.entries(limits) as [keyof typeof limits, number][]) {
    if (fields[key].length > max) return Response.json({ error: `Please shorten the ${key} field.` }, { status: 400 });
  }
  if (!/^\S+@\S+\.\S+$/.test(fields.email)) {
    return Response.json({ error: 'Please enter a valid business email address.' }, { status: 400 });
  }

  const id = crypto.randomUUID();
  await env.DB.prepare('INSERT INTO inquiries (id, name, email, company, country, interest, quantity, message, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)')
    .bind(id, fields.name, fields.email, fields.company, fields.country, fields.interest, fields.quantity, fields.message, new Date().toISOString()).run();
  return Response.json({ ok: true, id }, { status: 201 });
};

