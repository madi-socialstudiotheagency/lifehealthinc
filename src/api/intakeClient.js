// Posts an intake submission to the LifeHealthInc n8n webhook.
//
// Unlike the old Google Apps Script client (mode: 'no-cors', opaque response),
// this reads the real HTTP status, so a failure is shown to the visitor instead
// of being reported as "success". The webhook must allow this site's origin.

// Set to the production URL of the n8n workflow "LHI — Intake submissions".
export const INTAKE_WEBHOOK_URL = 'https://socialstudio.app.n8n.cloud/webhook/lhi-intake';

export async function submitIntake(payload) {
  if (!INTAKE_WEBHOOK_URL) {
    return { ok: false, message: 'Online intake is not connected yet. Please call (954) 543-0853.' };
  }
  try {
    const res = await fetch(INTAKE_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    let reference = null;
    try {
      reference = (await res.json()).reference || null;
    } catch {
      /* body is optional */
    }
    return { ok: true, reference };
  } catch (err) {
    console.error('Intake submit failed:', err);
    return { ok: false, message: 'We could not send your request. Please try again or call (954) 543-0853.' };
  }
}
