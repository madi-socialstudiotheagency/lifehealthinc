// Runs automatically when Netlify verifies a form submission (non-spam).
// Sends the applicant a branded confirmation from LifeHealthInc's verified
// Resend domain. Matthew's copy of the lead is the Netlify email notification on
// the form, so this function only emails the applicant.
//
// Needs RESEND_API_KEY (secret Netlify env var). Never hard-code the key here.

import { connectLambda, getStore } from '@netlify/blobs';
import { notifyMatthew, alreadyNotified } from './lib/notify.js';

const SITE = 'https://www.lifehealthinc.org';
const FROM = 'LifeHealthInc <info@lifehealthinc.org>';
const REPLY_TO = 'matthew@lifehealthinc.org';

const esc = (s) =>
  String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

// Remember the application so the applicant's waiting screen can show the result.
async function trackApplication(event, d) {
  if (!d.reference || !d.statusKey) return;
  try {
    connectLambda(event);
    await getStore('applications').setJSON(String(d.reference), {
      ref: String(d.reference),
      statusKey: String(d.statusKey),
      status: 'pending',
      name: d.name || '',
      email: d.email || '',
      phone: d.phone || '',
      formTitle: d.formTitle || '',
      carrier: d.carrier || '',
      details: String(d.details || '').slice(0, 60000),
      createdAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error('trackApplication failed', err);
  }
}

function render(d) {
  const first = String(d.name || '').split(' ')[0] || 'there';
  const ref = esc(d.reference || '');
  const html =
    '<div style="background:#f3f5f9;padding:24px 12px;font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Helvetica,Arial,sans-serif">' +
    '<table role="presentation" width="100%" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden">' +
    '<tr><td style="background:#081730;padding:22px 28px"><div style="color:#ffffff;font-size:20px;font-weight:800;letter-spacing:-0.3px">LifeHealthInc</div>' +
    '<div style="color:#9db4e0;font-size:12px;margin-top:2px">Independent insurance brokerage</div></td></tr>' +
    '<tr><td style="padding:28px;color:#0b1a33">' +
    '<h1 style="margin:0 0 12px;font-size:22px;color:#081730">We received your request</h1>' +
    '<p style="margin:0 0 12px;font-size:15px;line-height:1.6">Hi ' + esc(first) + ',</p>' +
    '<p style="margin:0 0 12px;font-size:15px;line-height:1.6">Thank you for applying for <strong>' + esc(d.formTitle || 'insurance') + '</strong>. ' +
    'Your application is complete. Matthew, a licensed advisor, submits it to the carrier for you from your answers. There is nothing you need to call about.</p>' +
    (ref ? '<table role="presentation" width="100%" style="background:#f3f5f9;border-radius:8px;margin:16px 0"><tr><td style="padding:14px 16px;font-size:14px"><strong>Your reference:</strong> ' + ref + '</td></tr></table>' : '') +
    '<p style="margin:16px 0 8px;font-size:15px"><strong>What happens next</strong></p>' +
    '<ol style="margin:0 0 16px;padding-left:20px;font-size:14px;line-height:1.7">' +
    '<li>Matthew reviews your answers and matches you with the best-fit carrier.</li>' +
    '<li>He submits your application to the carrier for you.</li>' +
    '<li>If the carrier needs a signature, it arrives by email as a simple e-sign link.</li>' +
    '<li>Your approval, rate and secure payment link appear on your screen and in your email.</li></ol>' +
    '<p style="margin:0;color:#5b6b85;font-size:13px;line-height:1.6">Questions? Just reply to this email. ' +
    'For your security, never send a Social Security, bank or card number by email.</p>' +
    '</td></tr>' +
    '<tr><td style="background:#f3f5f9;padding:16px 28px;color:#6b7a94;font-size:11px;line-height:1.5">' +
    'LifeHealthInc, 18245 Paulson Dr Ste VP-2 #508, Port Charlotte, FL 33954. This message confirms we received your request. It is not an offer, quote or binder of coverage.</td></tr>' +
    '</table></div>';
  const text =
    'Hi ' + first + ',\n\nThank you for applying for ' + (d.formTitle || 'insurance') + '. Your application is complete. Matthew, a licensed advisor, submits it to the carrier for you from your answers. There is nothing you need to call about.\n' +
    (ref ? '\nYour reference: ' + d.reference + '\n' : '') +
    '\nWhat happens next:\n1. Matthew reviews your answers and matches you with the best-fit carrier.\n2. He submits your application to the carrier for you.\n3. If the carrier needs a signature, it arrives by email as a simple e-sign link.\n4. Your approval, rate and secure payment link appear on your screen and in your email.\n' +
    '\nQuestions? Just reply to this email. For your security, never send a Social Security, bank or card number by email.\n\nLifeHealthInc';
  return { html, text };
}

export const handler = async (event) => {
  try {
    const payload = JSON.parse(event.body || '{}').payload || {};
    if (payload.form_name !== 'lhi-intake') return { statusCode: 200, body: 'skipped' };
    const d = payload.data || {};
    await trackApplication(event, d);
    if (!(await alreadyNotified(event, d.reference))) await notifyMatthew(event, d);
    const to = String(d.email || '').trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) return { statusCode: 200, body: 'no applicant email' };
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set');
      return { statusCode: 200, body: 'not configured' };
    }
    const { html, text } = render(d);
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + process.env.RESEND_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: FROM,
        to: [to],
        bcc: [REPLY_TO],
        reply_to: REPLY_TO,
        subject: 'Your application is being prepared' + (d.reference ? ' (' + d.reference + ')' : ''),
        html,
        text,
      }),
    });
    if (!res.ok) console.error('Resend failed', res.status, await res.text());
    return { statusCode: 200, body: res.ok ? 'sent' : 'resend error' };
  } catch (err) {
    console.error('submission-created error', err);
    return { statusCode: 200, body: 'error' };
  }
};
