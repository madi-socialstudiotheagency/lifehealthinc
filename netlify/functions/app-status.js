// Polled by the applicant's waiting screen. Returns only the fields the applicant
// needs, and only when the reference AND the private key generated in their
// browser both match, so nobody can read another person's price by guessing a ref.

import { connectLambda, getStore } from '@netlify/blobs';
import { timingSafeEqual } from 'node:crypto';

const json = (status, obj) => ({
  statusCode: status,
  headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  body: JSON.stringify(obj),
});

const same = (a, b) => {
  const x = Buffer.from(String(a || ''));
  const y = Buffer.from(String(b || ''));
  return x.length === y.length && x.length > 0 && timingSafeEqual(x, y);
};

export const handler = async (event) => {
  try {
    connectLambda(event);
    const { ref, k } = event.queryStringParameters || {};
    if (!ref || !k) return json(400, { status: 'unknown' });
    const rec = await getStore({ name: 'applications', consistency: 'strong' }).get(String(ref), { type: 'json' });
    if (!rec || !same(rec.statusKey, k)) return json(200, { status: 'pending' });
    if (rec.status === 'pending') return json(200, { status: 'pending' });
    return json(200, {
      status: rec.status,
      plan: rec.plan || '',
      amount: rec.amount || '',
      payLink: rec.payLink || '',
      note: rec.note || '',
    });
  } catch (err) {
    console.error('app-status error', err);
    return json(200, { status: 'pending' });
  }
};
