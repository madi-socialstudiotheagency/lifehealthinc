// Called by the browser right after an application is submitted, so Matthew's
// email arrives immediately instead of waiting on Netlify Forms verification.
// Origin-locked; deduped against submission-created.js by reference.

import { notifyMatthew, alreadyNotified } from './lib/notify.js';

const okOrigin = (h) => {
  const o = h.origin || h.referer || '';
  return /^https:\/\/([a-z0-9-]+\.)?lifehealthinc\.org(\/|$)/.test(o) || /^https:\/\/[a-z0-9-]*lifehealthinc\.netlify\.app(\/|$)/.test(o);
};

export const handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST' || !okOrigin(event.headers || {})) return { statusCode: 403, body: 'forbidden' };
    if ((event.body || '').length > 90000) return { statusCode: 413, body: 'too large' };
    const d = JSON.parse(event.body || '{}');
    if (!/^LHI-[A-Z0-9]{4,20}$/.test(String(d.reference || ''))) return { statusCode: 400, body: 'bad request' };
    if (await alreadyNotified(event, d.reference)) return { statusCode: 200, body: 'already sent' };
    await notifyMatthew(event, d);
    return { statusCode: 200, body: 'ok' };
  } catch (err) {
    console.error('instant-alert error', err);
    return { statusCode: 200, body: 'error' };
  }
};
