// Runs automatically when Netlify verifies a form submission (non-spam).
// Sends the applicant a branded confirmation from LifeHealthInc's verified
// Resend domain. Matthew's copy of the lead is the Netlify email notification on
// the form, so this function only emails the applicant.
//
// Needs RESEND_API_KEY (secret Netlify env var). Never hard-code the key here.

import { connectLambda, getStore } from '@netlify/blobs';
import { createHmac } from 'node:crypto';

const SITE = 'https://www.lifehealthinc.org';
const FROM = 'LifeHealthInc <info@lifehealthinc.org>';
const REPLY_TO = 'matthew@lifehealthinc.org';
const PHONE = '(954) 543-0853';

const esc = (s) =>
  String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const approvalToken = (ref) => createHmac('sha256', process.env.APPROVAL_SECRET || '').update(ref).digest('hex');

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
      createdAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error('trackApplication failed', err);
  }
}

// One-tap "send this applicant their price" email to Matthew.
async function notifyMatthew(d) {
  if (!process.env.APPROVAL_SECRET || !process.env.RESEND_API_KEY || !d.reference) return;
  try {
    const link = SITE + '/.netlify/functions/approve?ref=' + encodeURIComponent(d.reference) + '&t=' + approvalToken(String(d.reference));
    const html =
      '<div style="font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Helvetica,Arial,sans-serif;max-width:520px;margin:0 auto;padding:16px">' +
      '<p style="font-size:16px"><strong>' + esc(d.name || 'An applicant') + '</strong> is waiting on their screen for a price.</p>' +
      '<p style="color:#5b6b85;font-size:14px">' + esc(d.formTitle || '') + (d.carrier && d.carrier !== 'No preference' ? ' &middot; ' + esc(d.carrier) : '') + '<br>Ref ' + esc(d.reference) + '</p>' +
      '<p style="margin:22px 0"><a href="' + link + '" style="display:inline-block;background:#1A3586;color:#fff;text-decoration:none;font-weight:700;padding:15px 28px;border-radius:10px">Review and send price</a></p>' +
      '<p style="color:#5b6b85;font-size:12px">Enter the monthly amount and paste the carrier\'s secure payment link. They see it on their screen and get it by email.</p></div>';
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + process.env.RESEND_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: FROM, to: [REPLY_TO], subject: 'Send price: ' + (d.name || 'applicant') + ' (' + d.reference + ')', html }),
    });
    if (!res.ok) console.error('notifyMatthew failed', res.status, await res.text());
  } catch (err) {
    console.error('notifyMatthew error', err);
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
    'Everything above is what Matthew needs. He is a licensed advisor and will start preparing your application himself from your answers &mdash; you do not need to call.</p>' +
    (ref ? '<table role="presentation" width="100%" style="background:#f3f5f9;border-radius:8px;margin:16px 0"><tr><td style="padding:14px 16px;font-size:14px"><strong>Your reference:</strong> ' + ref + '</td></tr></table>' : '') +
    '<p style="margin:16px 0 8px;font-size:15px"><strong>What happens next</strong></p>' +
    '<ol style="margin:0 0 16px;padding-left:20px;font-size:14px;line-height:1.7">' +
    '<li>Matthew reviews your answers and compares carriers on your behalf.</li>' +
    '<li>He prepares your application from what you submitted.</li>' +
    '<li>He only contacts you' + (d.contactPref ? ' by ' + esc(String(d.contactPref).toLowerCase()) : '') + ' if something is missing, or when it is time to sign or verify your identity with the carrier.</li>' +
    '<li>Once the carrier decides, we email you whether you were approved, along with your actual coverage amount and rate.</li></ol>' +
    '<p style="margin:0;color:#5b6b85;font-size:13px;line-height:1.6">No need to call unless you want to. Reply to this email any time, or reach us at ' + PHONE + '. ' +
    'Please never send a Social Security, bank or card number by email.</p>' +
    '</td></tr>' +
    '<tr><td style="background:#f3f5f9;padding:16px 28px;color:#6b7a94;font-size:11px;line-height:1.5">' +
    'LifeHealthInc, 18245 Paulson Dr Ste VP-2 #508, Port Charlotte, FL 33954. This message confirms we received your request. It is not an offer, quote or binder of coverage.</td></tr>' +
    '</table></div>';
  const text =
    'Hi ' + first + ',\n\nThank you for applying for ' + (d.formTitle || 'insurance') + '. Everything above is what Matthew needs. He is a licensed advisor and will start preparing your application himself from your answers, you do not need to call.\n' +
    (ref ? '\nYour reference: ' + d.reference + '\n' : '') +
    '\nWhat happens next:\n1. Matthew reviews your answers and compares carriers on your behalf.\n2. He prepares your application from what you submitted.\n3. He only contacts you if something is missing, or when it is time to sign or verify your identity with the carrier.\n4. Once the carrier decides, we email you whether you were approved, along with your actual coverage amount and rate.\n' +
    '\nNo need to call unless you want to. Reply to this email any time, or reach us at ' + PHONE + '. Please never send a Social Security, bank or card number by email.\n\nLifeHealthInc';
  return { html, text };
}

export const handler = async (event) => {
  try {
    const payload = JSON.parse(event.body || '{}').payload || {};
    if (payload.form_name !== 'lhi-intake') return { statusCode: 200, body: 'skipped' };
    const d = payload.data || {};
    await trackApplication(event, d);
    await notifyMatthew(d);
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
