// Two clients live here, and both are needed.
//
// `base44` is the Base44 SDK client that ten modules import — AuthContext,
// utils, the quote calculator, the referral and newsletter forms, the client
// portal, the broker bio pages, the AI assistant. On 4 Aug this file was
// replaced outright by the Google Sheets form client below, which deleted the
// `base44` export while every one of those imports stayed. The build has failed
// ever since ("base44" is not exported by "src/api/base44Client.js"), which is
// why nothing pushed to GitHub has reached the live site since 3 Aug — the
// published deploy is a hand-uploaded build with no commit attached.
//
// Do not delete either export. Removing one silently breaks the other's callers.

import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params';

const { appId, serverUrl, token, functionsVersion } = appParams;

// Auth is not required: most of this site is public marketing. The client
// portal gates itself through ProtectedRoute.
export const base44 = createClient({
  appId,
  serverUrl,
  token,
  functionsVersion,
  requiresAuth: false,
});

// Google Apps Script client for form submissions — posts form data to a Google
// Sheet via an Apps Script webhook.
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxdNlU0oBw81n74sipnHKL_4iDtS0BZAU/usercontent';

export const googleSheetClient = {
  submitForm: async (formData) => {
    try {
      // Sent as FormData, which Apps Script handles directly.
      const form = new FormData();
      Object.keys(formData).forEach((key) => {
        form.append(key, formData[key] || '');
      });

      await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: form,
      });

      // no-cors makes the response opaque — we cannot read a status, so this
      // reports the send, not the receipt. Treat a "success" here as "posted".
      return { success: true, message: 'Form submitted successfully' };
    } catch (error) {
      console.error('Error submitting form:', error);
      return { success: false, message: 'Error submitting form' };
    }
  },
};

export default googleSheetClient;
