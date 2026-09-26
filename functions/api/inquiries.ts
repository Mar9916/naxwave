interface Env { DB: D1Database }
export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const data = await request.json().catch(() => null) as Record<string, unknown> | null;
  if (!data || typeof data.name !== 'string' || typeof data.email !== 'string' || typeof data.message !== 'string') {
    return Response.json({ error: 'Please complete the required fields.' }, { status: 400 });
  }
  const email = data.email.trim();
  if (!/^\S+@\S+\.\S+$/.test(email)) return Response.json({ error: 'Invalid email address.' }, { status: 400 });
  const id = crypto.randomUUID();
  await env.DB.prepare('INSERT INTO inquiries (id, name, email, company, country, interest, quantity, message, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)')
    .bind(id, data.name.trim(), email, String(data.company ?? ''), String(data.country ?? ''), String(data.interest ?? ''), String(data.quantity ?? ''), data.message.trim(), new Date().toISOString()).run();
  return Response.json({ ok: true, id }, { status: 201 });
};
