// Emails Matthew a copy of a website chat, every time the assistant is used.
// Called from the browser once the visitor sends their first real message
// (subject: "New chat started"), again when they close the widget, and as a
// best-effort beacon on tab close. Needs RESEND_API_KEY (secret Netlify env var).

const FROM = 'LifeHealthInc <info@lifehealthinc.org>';
const TO = 'matthew@lifehealthinc.org';

const esc = (s) =>
  String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

function render(messages, sourceUrl) {
  const rows = messages
    .map(
      (m) =>
        '<tr><td style="padding:8px 12px;border-bottom:1px solid #e3e8f0;font-size:12px;color:#5b6b85;white-space:nowrap;vertical-align:top">' +
        (m.role === 'user' ? 'Visitor' : 'Assistant') +
        '<br>' + esc(m.time || '') +
        '</td><td style="padding:8px 12px;border-bottom:1px solid #e3e8f0;font-size:14px;color:#0b1a33;white-space:pre-wrap">' +
        esc(m.content) +
        '</td></tr>'
    )
    .join('');
  const html =
    '<div style="background:#f3f5f9;padding:24px 12px;font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Helvetica,Arial,sans-serif">' +
    '<table role="presentation" width="100%" style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden">' +
    '<tr><td style="background:#081730;padding:20px 26px"><div style="color:#ffffff;font-size:18px;font-weight:800">Website chat</div>' +
    '<div style="color:#9db4e0;font-size:12px;margin-top:2px">' + esc(sourceUrl) + '</div></td></tr>' +
    '<tr><td style="padding:0"><table role="presentation" width="100%" style="border-collapse:collapse">' + rows + '</table></td></tr>' +
    '</table></div>';
  const text = messages.map((m) => (m.role === 'user' ? 'Visitor' : 'Assistant') + ' (' + (m.time || '') + '): ' + m.content).join('\n\n');
  return { html, text };
}

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}');
    const messages = Array.isArray(body.messages) ? body.messages : [];
    // Only the greeting exists, nothing to report.
    if (messages.filter((m) => m.role === 'user').length === 0) {
      return { statusCode: 200, body: 'no visitor messages' };
    }
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set');
      return { statusCode: 200, body: 'not configured' };
    }
    const { html, text } = render(messages, body.sourceUrl || '');
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + process.env.RESEND_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        subject: (body.initial ? 'New chat started' : 'Website chat transcript') + ' · lifehealthinc.org',
        html,
        text,
      }),
    });
    if (!res.ok) console.error('Resend failed', res.status, await res.text());
    return { statusCode: 200, body: res.ok ? 'sent' : 'resend error' };
  } catch (err) {
    console.error('chat-transcript error', err);
    return { statusCode: 200, body: 'error' };
  }
};
