// Carriers LifeHealthInc is appointed with, as provided by Matthew Anderson.
// Logos are the carriers' own site icons, shown only to identify companies we
// are appointed with; listing a name does not imply endorsement. Products and
// availability vary by state and by carrier.
// Verified 2026-09-24: InstaBrain is a technology and underwriting platform, not an insurer; its policies are issued by Fidelity Life. "Price Health" could not be verified and is left off until confirmed.
// formId is the online application a visitor lands on when they pick that carrier.

export const logoFor = (domain) => (domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128` : null);

export const LIFE_CARRIERS = [
  { name: 'Foresters Financial', domain: 'foresters.com', formId: 'life-insurance' },
  { name: 'American Amicable', domain: 'americanamicable.com', formId: 'final-expense' },
  { name: 'National Life Group', domain: 'nationallife.com', formId: 'life-insurance' },
  { name: 'Transamerica', domain: 'transamerica.com', formId: 'life-insurance' },
  { name: 'Mutual of Omaha', domain: 'mutualofomaha.com', formId: 'final-expense' },
  { name: 'Fidelity Life (instant decision through InstaBrain)', short: 'Fidelity Life', domain: 'fidelitylife.com', formId: 'life-insurance' },
  { name: 'F&G (Fidelity & Guaranty Life)', short: 'F&G', domain: 'fglife.com', formId: 'annuity-retirement' },
  { name: 'Corebridge Financial', domain: 'corebridgefinancial.com', formId: 'life-insurance' },
  { name: 'Pacific Life', domain: 'pacificlife.com', formId: 'life-insurance' },
  { name: 'Prudential', domain: 'prudential.com', formId: 'life-insurance' },
  { name: 'Americo', domain: 'americo.com', formId: 'final-expense' },
  { name: 'Aflac', domain: 'aflac.com', formId: 'life-insurance' },
];

export const HEALTH_CARRIERS = [
  { name: 'Allstate Health Solutions', domain: 'allstatehealth.com', formId: 'individual-health' },
  { name: 'Manhattan Life', domain: 'manhattanlife.com', formId: 'individual-health' },
  { name: 'Philadelphia American Life', domain: null, formId: 'medicare' },
  { name: 'Aflac', domain: 'aflac.com', formId: 'individual-health' },
];

export const ALL_CARRIERS = [...LIFE_CARRIERS, ...HEALTH_CARRIERS.filter((h) => !LIFE_CARRIERS.some((l) => l.name === h.name))];

export const CARRIER_DISCLAIMER =
  'LifeHealthInc is an independent brokerage and is not owned by, or an agent solely of, any carrier. Carrier names and logos are trademarks of their respective owners and are shown to identify companies we are appointed with. Product availability, features and pricing vary by state and are subject to underwriting.';
