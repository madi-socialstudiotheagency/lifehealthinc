// Delivers an intake submission through Netlify Forms. Netlify emails each
// submission to the notification address set on the form ("lhi-intake") in the
// Netlify dashboard, keeps a searchable copy, and filters spam.
//
// The matching static form lives in index.html: Netlify only detects forms in
// HTML it can see at deploy time, so every field posted here must be declared
// there too.

const encode = (obj) =>
  Object.keys(obj)
    .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k] == null ? '' : obj[k]))
    .join('&');

export const makeReference = () => 'LHI-' + Date.now().toString(36).toUpperCase();

export async function submitIntake(fields) {
  try {
    const res = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'lhi-intake', ...fields }),
    });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return { ok: true, reference: fields.reference };
  } catch (err) {
    console.error('Intake submit failed:', err);
    return { ok: false, message: 'We could not send your request. Please try again or call (954) 543-0853.' };
  }
}
