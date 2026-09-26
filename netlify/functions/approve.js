// Matthew's one-tap approval page. The link in his "send this applicant their
// price" email carries an HMAC token for one application reference, so it cannot
// be guessed. GET shows a small form; POST records the outcome, updates the
// applicant's waiting screen (via app-status.js) and emails them the result.
//
// Needs APPROVAL_SECRET and RESEND_API_KEY (secret Netlify env vars).

import { connectLambda, getStore } from '@netlify/blobs';
import { createHmac, timingSafeEqual } from 'node:crypto';

const SITE = 'https://www.lifehealthinc.org';
const FROM = 'LifeHealthInc <info@lifehealthinc.org>';
const REPLY_TO = 'matthew@lifehealthinc.org';

const esc = (s) =>
  String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const token = (ref) => createHmac('sha256', process.env.APPROVAL_SECRET || '').update(ref).digest('hex');
const validToken = (ref, t) => {
  try {
    const a = Buffer.from(token(ref), 'hex');
    const b = Buffer.from(String(t || ''), 'hex');
    return a.length === b.length && timingSafeEqual(a, b);
  } catch {
    return false;
  }
};

const page = (body, status = 200) => ({
  statusCode: status,
  headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' },
  body:
    '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>LifeHealthInc approval</title>' +
    '<style>body{margin:0;background:#f3f5f9;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif;color:#0b1a33}' +
    '.card{max-width:520px;margin:24px auto;background:#fff;border-radius:14px;overflow:hidden}.hd{background:#081730;color:#fff;padding:18px 22px;font-weight:800}' +
    '.bd{padding:22px}label{display:block;font-size:13px;font-weight:600;margin:14px 0 4px}input,select,textarea{width:100%;box-sizing:border-box;padding:12px;border:1px solid #cbd5e1;border-radius:10px;font-size:16px}' +
    'button{width:100%;margin-top:20px;padding:15px;border:0;border-radius:12px;background:#1A3586;color:#fff;font-size:16px;font-weight:700}.m{color:#5b6b85;font-size:13px}</style></head><body><div class="card"><div class="hd">LifeHealthInc</div><div class="bd">' +
    body +
    '</div></div></body></html>',
});

async function sendResend(payload) {
  if (!process.env.RESEND_API_KEY) return false;
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + process.env.RESEND_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) console.error('Resend failed', res.status, await res.text());
  return res.ok;
}

function applicantEmail(rec, o) {
  const first = String(rec.name || '').split(' ')[0] || 'there';
  const money = o.amount ? '$' + Number(o.amount).toFixed(2).replace(/\.00$/, '') + '/month' : '';
  const shell = (title, inner) =>
    '<div style="background:#f3f5f9;padding:24px 12px;font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Helvetica,Arial,sans-serif"><table role="presentation" width="100%" style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden">' +
    '<tr><td style="background:#081730;padding:22px 28px"><div style="color:#fff;font-size:20px;font-weight:800">LifeHealthInc</div></td></tr>' +
    '<tr><td style="padding:28px;color:#0b1a33"><h1 style="margin:0 0 12px;font-size:22px;color:#081730">' + title + '</h1>' + inner + '</td></tr>' +
    '<tr><td style="background:#f3f5f9;padding:16px 28px;color:#6b7a94;font-size:11px;line-height:1.5">LifeHealthInc, 18245 Paulson Dr Ste VP-2 #508, Port Charlotte, FL 33954. Reference ' + esc(rec.ref) + '. Final premium and coverage are set by the carrier and confirmed in your policy documents.</td></tr></table></div>';
  if (o.outcome === 'approved') {
    const btn = o.payLink
      ? '<p style="margin:20px 0"><a href="' + esc(o.payLink) + '" style="display:inline-block;background:#1A3586;color:#fff;text-decoration:none;font-weight:700;padding:14px 26px;border-radius:10px">Continue to secure payment</a></p><p style="font-size:13px;color:#5b6b85">This opens the carrier\'s own secure page. We never ask for card or bank details by email or on our website.</p>'
      : '<p>Matthew will send your secure payment link shortly.</p>';
    return {
      subject: "You're approved" + (money ? ': ' + money : '') + ' (' + rec.ref + ')',
      html: shell("You're approved, " + esc(first), '<p style="font-size:15px;line-height:1.6">Good news. ' + (o.plan ? 'Your plan: <strong>' + esc(o.plan) + '</strong>. ' : '') + (money ? 'Your rate: <strong>' + esc(money) + '</strong>.' : '') + '</p>' + (o.note ? '<p style="font-size:14px;color:#334155">' + esc(o.note) + '</p>' : '') + btn),
    };
  }
  if (o.outcome === 'needs_info') {
    return {
      subject: 'One more thing we need (' + rec.ref + ')',
      html: shell('We need a little more, ' + esc(first), '<p style="font-size:15px;line-height:1.6">' + (o.note ? esc(o.note) : 'Matthew will reach out shortly for one more detail.') + '</p><p style="font-size:13px;color:#5b6b85">Reply to this email or text (954) 543-0853.</p>'),
    };
  }
  return {
    subject: 'About your application (' + rec.ref + ')',
    html: shell('An update on your application', '<p style="font-size:15px;line-height:1.6">' + (o.note ? esc(o.note) : 'This one was not approved as submitted. Matthew will email you other options that may fit.') + '</p>'),
  };
}

export const handler = async (event) => {
  try {
    connectLambda(event);
    const store = getStore('applications');
    const q = event.queryStringParameters || {};
    const isPost = event.httpMethod === 'POST';
    const params = isPost ? Object.fromEntries(new URLSearchParams(event.body || '')) : q;
    const ref = String(params.ref || '');
    if (!process.env.APPROVAL_SECRET || !ref || !validToken(ref, params.t)) return page('<p>This link is not valid.</p>', 403);

    const rec = await store.get(ref, { type: 'json' });
    if (!rec) return page('<p>Application not found.</p>', 404);

    if (!isPost) {
      return page(
        '<h2 style="margin:0 0 4px">' + esc(rec.name || 'Applicant') + '</h2><p class="m">' + esc(rec.formTitle || '') + (rec.carrier && rec.carrier !== 'No preference' ? ' &middot; ' + esc(rec.carrier) : '') + '<br>' + esc(rec.email || '') + ' &middot; ' + esc(rec.phone || '') + '<br>Ref ' + esc(rec.ref) + ' &middot; now: <strong>' + esc(rec.status) + '</strong></p>' +
          '<form method="POST"><input type="hidden" name="ref" value="' + esc(ref) + '"><input type="hidden" name="t" value="' + esc(params.t) + '">' +
          '<label>Result</label><select name="outcome"><option value="approved">Approved, send price</option><option value="needs_info">Need more information</option><option value="declined">Not approved</option></select>' +
          '<label>Plan or carrier product</label><input name="plan" placeholder="e.g. Mutual of Omaha Living Promise, $15,000">' +
          '<label>Monthly amount (numbers only)</label><input name="amount" inputmode="decimal" placeholder="e.g. 52.32">' +
          '<label>Secure payment or e-sign link from the carrier</label><input name="payLink" type="url" placeholder="https://...">' +
          '<label>Note to the applicant (optional)</label><textarea name="note" rows="3"></textarea>' +
          '<button type="submit">Send to applicant</button></form>'
      );
    }

    const outcome = ['approved', 'needs_info', 'declined'].includes(params.outcome) ? params.outcome : 'approved';
    const amount = String(params.amount || '').replace(/[^0-9.]/g, '');
    const payLink = /^https:\/\//i.test(String(params.payLink || '')) ? String(params.payLink).trim() : '';
    const done = { ...rec, status: outcome, plan: String(params.plan || '').slice(0, 200), amount, payLink, note: String(params.note || '').slice(0, 600), decidedAt: new Date().toISOString() };
    await store.setJSON(ref, done);

    let mailed = false;
    if (rec.email) {
      const m = applicantEmail(rec, { outcome, plan: done.plan, amount, payLink, note: done.note });
      mailed = await sendResend({ from: FROM, to: [rec.email], bcc: [REPLY_TO], reply_to: REPLY_TO, subject: m.subject, html: m.html });
    }
    return page('<h2 style="margin:0 0 8px">Sent</h2><p>' + esc(rec.name || 'The applicant') + ' now sees <strong>' + esc(outcome) + '</strong> on their screen' + (mailed ? ' and was emailed.' : '. Email could not be sent, so tell them directly.') + '</p>');
  } catch (err) {
    console.error('approve error', err);
    return page('<p>Something went wrong. Please try again.</p>', 500);
  }
};
