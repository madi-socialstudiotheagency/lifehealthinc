// Receives the sensitive answers from a life application (SSN, driver's
// license, bank routing and account numbers) separately from the rest of the
// form, so they never reach Netlify Forms or any email. They are encrypted with
// AES-256-GCM under SECURE_DATA_KEY and stored in the private "secure" Blobs
// store, keyed by the application reference. Only approve.js (Matthew's
// HMAC-token page) decrypts them.
//
// Key: SECURE_DATA_KEY (secret Netlify env var) when set, otherwise a separate
// key derived from APPROVAL_SECRET with HKDF. Each record stores which one
// (`kid`) so approve.js can always decrypt it. Never hard-code either here.

import { connectLambda, getStore } from '@netlify/blobs';
import { createCipheriv, createHash, hkdfSync, randomBytes } from 'node:crypto';

const currentKey = () =>
  process.env.SECURE_DATA_KEY
    ? { kid: 'sdk', key: createHash('sha256').update(process.env.SECURE_DATA_KEY).digest() }
    : process.env.APPROVAL_SECRET
      ? { kid: 'hkdf-approval', key: Buffer.from(hkdfSync('sha256', process.env.APPROVAL_SECRET, 'lhi-secure-data', 'lhi-secure-data-v1', 32)) }
      : null;

const okOrigin = (h) => {
  const o = h.origin || h.referer || '';
  return /^https:\/\/([a-z0-9-]+\.)?lifehealthinc\.org(\/|$)/.test(o) || /^https:\/\/[a-z0-9-]*lifehealthinc\.netlify\.app(\/|$)/.test(o);
};

const json = (statusCode, body) => ({ statusCode, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }, body: JSON.stringify(body) });

const encrypt = (plain, key) => {
  const iv = randomBytes(12);
  const c = createCipheriv('aes-256-gcm', key, iv);
  const data = Buffer.concat([c.update(plain, 'utf8'), c.final()]);
  return { iv: iv.toString('base64'), tag: c.getAuthTag().toString('base64'), data: data.toString('base64') };
};

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') return json(405, { error: 'POST only' });
  if (!okOrigin(event.headers || {})) return json(403, { error: 'forbidden' });
  const k = currentKey();
  if (!k) {
    console.error('no encryption key configured');
    return json(503, { error: 'not configured' });
  }
  try {
    const { reference, statusKey, fields } = JSON.parse(event.body || '{}');
    if (!/^LHI-[A-Z0-9]{4,20}$/.test(String(reference || ''))) return json(400, { error: 'bad reference' });
    if (!/^[a-f0-9]{32}$/.test(String(statusKey || ''))) return json(400, { error: 'bad key' });
    if (!Array.isArray(fields) || !fields.length || fields.length > 10) return json(400, { error: 'bad fields' });
    const clean = fields.map((f) => ({ label: String(f.label || '').slice(0, 120), value: String(f.value || '').slice(0, 40) }));

    connectLambda(event);
    const store = getStore('secure');
    // Write once: a reference that already holds secure data cannot be overwritten.
    if (await store.get(reference)) return json(409, { error: 'exists' });
    await store.setJSON(reference, {
      statusKey,
      createdAt: new Date().toISOString(),
      kid: k.kid,
      ...encrypt(JSON.stringify(clean), k.key),
    });
    return json(200, { ok: true });
  } catch (err) {
    console.error('secure-submit error', err);
    return json(500, { error: 'failed' });
  }
};
