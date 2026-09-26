// Emails Matthew when a website form creates a lead or newsletter signup
// through the Base44 entities (referral form, quote calculator, health widget,
// annuities form, newsletter). Base44 stores the record; this makes sure a
// human sees it. Needs RESEND_API_KEY (secret Netlify env var).

const FROM = 'LifeHealthInc <info@lifehealthinc.org>';
const TO = 'matthew@lifehealthinc.org';

const esc = (s) =>
  String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

// Only our own pages may call this, so the endpoint cannot be used to spam
// Matthew's inbox from elsewhere.
const okOrigin = (h) => {
  const o = h.origin || h.referer || '';
  return /^https:\/\/([a-z0-9-]+\.)?lifehealthinc\.org(\/|$)/.test(o) || /^https:\/\/[a-z0-9-]*lifehealthinc\.netlify\.app(\/|$)/.test(o);
};

export const handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST' || !okOrigin(event.headers || {})) return { statusCode: 403, body: 'forbidden' };
    if ((event.body || '').length > 10000) return { statusCode: 413, body: 'too large' };
    const { kind, data, sourceUrl } = JSON.parse(event.body || '{}');
    if (!data || typeof data !== 'object') return { statusCode: 400, body: 'bad request' };
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set');
      return { statusCode: 200, body: 'not configured' };
    }

    const entries = Object.entries(data).filter(([, v]) => v !== '' && v != null && typeof v !== 'object');
    const who = data.name || data.fullName || [data.firstName, data.lastName].filter(Boolean).join(' ') || data.email || 'Website visitor';
    const label = kind === 'Newsletter' ? 'Newsletter signup' : 'New website lead';
    const rows = entries
      .map(
        ([k, v]) =>
          '<tr><td style="padding:8px 12px;border-bottom:1px solid #e3e8f0;font-size:13px;color:#5b6b85;vertical-align:top;width:34%">' + esc(k) +
          '</td><td style="padding:8px 12px;border-bottom:1px solid #e3e8f0;font-size:14px;color:#0b1a33">' + esc(v) + '</td></tr>'
      )
      .join('');
    const html =
      '<div style="background:#f3f5f9;padding:24px 12px;font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Helvetica,Arial,sans-serif">' +
      '<table role="presentation" width="100%" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden">' +
      '<tr><td style="background:#081730;padding:20px 26px"><div style="color:#ffffff;font-size:18px;font-weight:800">' + label + '</div>' +
      '<div style="color:#9db4e0;font-size:12px;margin-top:2px">' + esc(sourceUrl || '') + '</div></td></tr>' +
      '<tr><td><table role="presentation" width="100%" style="border-collapse:collapse">' + rows + '</table></td></tr></table></div>';
    const text = entries.map(([k, v]) => k + ': ' + v).join('\n');

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + process.env.RESEND_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: FROM, to: [TO], subject: label + ': ' + who, html, text }),
    });
    if (!res.ok) console.error('Resend failed', res.status, await res.text());
    return { statusCode: 200, body: res.ok ? 'sent' : 'resend error' };
  } catch (err) {
    console.error('lead-alert error', err);
    return { statusCode: 200, body: 'error' };
  }
};
