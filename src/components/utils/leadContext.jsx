/**
 * Captures UTM parameters, referrer, and current page path.
 * @returns {object} An object containing lead context information.
 */
export function getLeadContext() {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source') || undefined,
    utm_medium: params.get('utm_medium') || undefined,
    utm_campaign: params.get('utm_campaign') || undefined,
    utm_term: params.get('utm_term') || undefined,
    utm_content: params.get('utm_content') || undefined,
    referrer: document.referrer || undefined,
    path: window.location.pathname || undefined,
  };
}