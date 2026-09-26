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
const rawClient = createClient({
  appId,
  serverUrl,
  token,
  functionsVersion,
  requiresAuth: false,
});

// Whenever a form creates a Lead or Newsletter record, also email Matthew
// (netlify/functions/lead-alert.js) so a lead is never only sitting in Base44.
const ALERT_ENTITIES = new Set(['Lead', 'Newsletter']);

export function sendLeadAlert(kind, data) {
  try {
    fetch('/.netlify/functions/lead-alert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kind, data, sourceUrl: window.location.href }),
      keepalive: true,
    }).catch(() => {});
  } catch (e) {
    /* alerting must never break the form */
  }
}

const entitiesWithAlerts = new Proxy(rawClient.entities, {
  get(target, entityName, receiver) {
    const handler = Reflect.get(target, entityName, receiver);
    if (!ALERT_ENTITIES.has(entityName) || !handler || typeof handler.create !== 'function') return handler;
    return new Proxy(handler, {
      get(t, prop, r) {
        const value = Reflect.get(t, prop, r);
        if (typeof value !== 'function') return value;
        if (prop !== 'create') return value.bind(t);
        return async (...args) => {
          const result = await value.apply(t, args);
          sendLeadAlert(entityName, args[0]);
          return result;
        };
      },
    });
  },
});

export const base44 = new Proxy(rawClient, {
  get(target, prop, receiver) {
    return prop === 'entities' ? entitiesWithAlerts : Reflect.get(target, prop, receiver);
  },
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
