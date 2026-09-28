// Shared by submission-created.js (Netlify Forms, can lag) and instant-alert.js
// (called by the browser the moment an application is submitted). A Blob flag
// per reference makes sure Matthew gets exactly one email.
import { connectLambda, getStore } from '@netlify/blobs';
import { createHmac } from 'node:crypto';

const SITE = 'https://www.lifehealthinc.org';
const FROM = 'LifeHealthInc <info@lifehealthinc.org>';
const REPLY_TO = 'matthew@lifehealthinc.org';

const esc = (s) =>
  String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const approvalToken = (ref) => createHmac('sha256', process.env.APPROVAL_SECRET || '').update(ref).digest('hex');

export async function alreadyNotified(event, ref) {
  try {
    connectLambda(event);
    return !!(await getStore('notified').get(String(ref)));
  } catch (err) {
    console.error('notified check failed', err);
    return false;
  }
}

async function markNotified(ref) {
  try {
    await getStore('notified').set(String(ref), new Date().toISOString());
  } catch (err) {
    console.error('notified mark failed', err);
  }
}

// One-tap "send this applicant their price" email to Matthew.
export async function notifyMatthew(event, d) {
  if (!process.env.APPROVAL_SECRET || !process.env.RESEND_API_KEY || !d.reference) return;
  try {
    const link = SITE + '/.netlify/functions/approve?ref=' + encodeURIComponent(d.reference) + '&t=' + approvalToken(String(d.reference));
    const html =
      '<div style="font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Helvetica,Arial,sans-serif;max-width:640px;margin:0 auto;padding:16px">' +
      '<p style="font-size:17px;margin:0 0 4px"><strong>' + esc(d.name || 'New applicant') + '</strong> just applied and may be waiting on their screen for a price.</p>' +
      '<p style="color:#5b6b85;font-size:14px;margin:0 0 14px">' + esc(d.formTitle || '') + (d.carrier && d.carrier !== 'No preference' ? ' &middot; ' + esc(d.carrier) : '') + '<br>Ref ' + esc(d.reference) + '</p>' +
      '<p style="margin:0 0 18px"><a href="' + link + '" style="display:inline-block;background:#1A3586;color:#fff;text-decoration:none;font-weight:700;padding:15px 28px;border-radius:10px">Review and send price</a></p>' +
      '<table role="presentation" width="100%" style="border-collapse:collapse;font-size:14px;margin-bottom:14px">' +
      [['Email', d.email], ['Phone', d.phone], ['State', d.state], ['Submitted from', d.sourceUrl]]
        .filter((r) => r[1])
        .map((r) => '<tr><td style="padding:6px 10px;border-bottom:1px solid #e3e8f0;color:#5b6b85;width:30%">' + r[0] + '</td><td style="padding:6px 10px;border-bottom:1px solid #e3e8f0">' + esc(r[1]) + '</td></tr>')
        .join('') +
      '</table>' +
      '<pre style="white-space:pre-wrap;font-family:inherit;font-size:14px;line-height:1.55;background:#f3f5f9;border-radius:10px;padding:14px;margin:0">' + esc(d.details || '') + '</pre>' +
      '<p style="color:#5b6b85;font-size:12px;margin-top:14px">Social Security, license and bank numbers are not in this email (last 4 digits only). The button opens your private page, which shows them in full along with the whole application. There, enter the monthly amount and paste the carrier\'s secure payment link. They see it on their screen and by email.</p></div>';
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + process.env.RESEND_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: FROM, to: [REPLY_TO], subject: 'New application: ' + (d.name || 'applicant') + ' (' + d.reference + ')', html }),
    });
    if (!res.ok) console.error('notifyMatthew failed', res.status, await res.text());
    else await markNotified(d.reference);
  } catch (err) {
    console.error('notifyMatthew error', err);
  }
}

