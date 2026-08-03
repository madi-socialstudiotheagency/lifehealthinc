// @ts-nocheck
import { base44 } from '../api/base44Client';

export function createPageUrl(pageName) {
  return '/' + pageName.toLowerCase().replace(/ /g, '-');
}

// ———— GHL CRM Integration ——————————————————————————————————————

/**
 * handleLeadSubmission
 * Called by ContactForm, PartnerForm, Newsletter, and any custom form.
 * 1) Creates a Lead record in Base44 (triggers the "Sync New Lead to GHL" automation)
 * 2) Also calls ghlSync directly as a belt-and-suspenders backup
 */
export async function handleLeadSubmission(data) {
  let firstName = data.firstName || '';
  let lastName  = data.lastName  || '';
  if (!firstName && data.fullName) {
    const parts = data.fullName.trim().split(/\s+/);
    firstName = parts[0] || '';
    lastName  = parts.slice(1).join(' ') || '';
  }
  if (!firstName && data.name) {
    const parts = data.name.trim().split(/\s+/);
    firstName = parts[0] || '';
    lastName  = parts.slice(1).join(' ') || '';
  }

  const lead = await base44.entities.Lead.create({
    full_name:        (firstName + ' ' + lastName).trim(),
    first_name:       firstName,
    last_name:        lastName,
    email:            data.email            || '',
    phone:            data.phone            || '',
    state:            data.state            || '',
    source:           data.source           || 'Website Form',
    notes:            data.notes || data.message || '',
    product_interest: data.productInterest  || data.product_interest || '',
    company_name:     data.companyName      || data.company_name     || '',
    profession:       data.profession       || '',
    status:           'New',
  });

  if (lead && lead.id) {
    submitLeadToGHL(lead.id);
  }

  return lead;
}

/**
 * submitLeadToGHL
 * Directly invokes the ghlSync backend function for a given leadId.
 * Fails silently so it never breaks the user-facing form flow.
 */
export async function submitLeadToGHL(leadId) {
  try {
    await base44.functions.ghlSync({ leadId });
  } catch (err) {
    console.warn('[GHL] ghlSync backup failed:', err?.message || err);
  }
}
