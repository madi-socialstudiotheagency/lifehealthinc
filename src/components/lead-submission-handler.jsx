import { base44 } from '@/api/base44Client';

/**
 * Unified lead submission handler
 * Handles both Base44 entity creation and GHL webhook sync
 */
export async function handleLeadSubmission(leadData) {
  try {
    // 1. Create lead in Base44 database
    const lead = await base44.entities.Lead.create(leadData);
    
    // 2. Sync to GoHighLevel via backend function
    try {
      await base44.functions.invoke('ghlSync', {
        leadId: lead.id,
        triggerWorkflow: true
      });
    } catch (ghlError) {
      console.error('GHL sync failed (non-critical):', ghlError);
      // Don't fail the whole submission if GHL sync fails
    }

    return { success: true, lead };
  } catch (error) {
    console.error('Lead submission error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Direct GHL webhook submission (as backup/alternative method)
 */
export async function submitLeadToGHL(leadData) {
  const webhookUrl = window.GHL_WEBHOOK_URL || "https://services.leadconnectorhq.com/hooks/lJmzDmY0fD9lzFZWj5Lw/webhook-trigger/9d701892-b155-4cca-bd54-b9b58fe42879";
  
  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: leadData.firstName,
        lastName: leadData.lastName,
        email: leadData.email,
        phone: leadData.phone,
        source: leadData.type || 'website',
        productType: leadData.productType || 'life_insurance',
        city: leadData.city,
        state: leadData.state,
        ...leadData
      })
    });
  } catch (error) {
    console.error('GHL webhook submission failed:', error);
  }
}