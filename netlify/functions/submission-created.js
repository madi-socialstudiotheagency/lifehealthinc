// Runs automatically when Netlify verifies a form submission (non-spam).
// Sends the applicant a branded confirmation from LifeHealthInc's verified
// Resend domain. Matthew's copy of the lead is the Netlify email notification on
// the form, so this function only emails the applicant.
//
// Needs RESEND_API_KEY (secret Netlify env var). Never hard-code the key here.

const FROM = 'LifeHealthInc <info@lifehealthinc.org>';
const REPLY_TO = 'matthew@lifehealthinc.org';
const PHONE = '(954) 543-0853';

const esc = (s) =>
  String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

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
    '<p style="margin:0 0 12px;font-size:15px;line-height:1.6">Thank you for reaching out about <strong>' + esc(d.formTitle || 'insurance') + '</strong>. ' +
    'A licensed LifeHealthInc advisor is reviewing your information and will contact you personally' +
    (d.contactPref ? ' by ' + esc(String(d.contactPref).toLowerCase()) : '') + '.</p>' +
    (ref ? '<table role="presentation" width="100%" style="background:#f3f5f9;border-radius:8px;margin:16px 0"><tr><td style="padding:14px 16px;font-size:14px"><strong>Your reference:</strong> ' + ref + '</td></tr></table>' : '') +
    '<p style="margin:16px 0 8px;font-size:15px"><strong>What happens next</strong></p>' +
    '<ol style="margin:0 0 16px;padding-left:20px;font-size:14px;line-height:1.7">' +
    '<li>An advisor reviews your request and compares carriers.</li>' +
    '<li>We reach out to confirm details and answer your questions.</li>' +
    '<li>If you decide to move forward, we complete the carrier application with you.</li></ol>' +
    '<p style="margin:0;color:#5b6b85;font-size:13px;line-height:1.6">Questions in the meantime? Call or text ' + PHONE + ' or reply to this email. ' +
    'Please never send a Social Security, bank or card number by email.</p>' +
    '</td></tr>' +
    '<tr><td style="background:#f3f5f9;padding:16px 28px;color:#6b7a94;font-size:11px;line-height:1.5">' +
    'LifeHealthInc, 18245 Paulson Dr Ste VP-2 #508, Port Charlotte, FL 33954. This message confirms we received your request. It is not an offer, quote or binder of coverage.</td></tr>' +
    '</table></div>';
  const text =
    'Hi ' + first + ',\n\nThank you for reaching out about ' + (d.formTitle || 'insurance') + '. A licensed LifeHealthInc advisor is reviewing your information and will contact you personally.\n' +
    (ref ? '\nYour reference: ' + d.reference + '\n' : '') +
    '\nWhat happens next:\n1. An advisor reviews your request and compares carriers.\n2. We reach out to confirm details and answer your questions.\n3. If you decide to move forward, we complete the carrier application with you.\n' +
    '\nQuestions? Call or text ' + PHONE + ' or reply to this email. Please never send a Social Security, bank or card number by email.\n\nLifeHealthInc';
  return { html, text };
}

export const handler = async (event) => {
  try {
    const payload = JSON.parse(event.body || '{}').payload || {};
    if (payload.form_name !== 'lhi-intake') return { statusCode: 200, body: 'skipped' };
    const d = payload.data || {};
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
        subject: 'We received your request' + (d.reference ? ' (' + d.reference + ')' : ''),
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
