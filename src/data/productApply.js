// Maps each page to the online application that fits it, so every product
// page and the mobile apply bar send visitors straight into the right form.

export const NATGEN_QUICK_QUOTE_URL =
  'https://customer.enroll.natgenhealth.com/quick-quote/?agent=CfDJ8KcuJeU1UfVFhwatU8NLwQnUuAwHAxktLqVFMx2duuToSmFy7GJJVIWSMhIqXZeRKo50zQYSVjXubSDtZslsI0T3vQ&product=all-products';
export const INSTABRAIN_URL = 'https://matthewchristpheranderson.instabrain.io/';

const lifeInstant = { href: INSTABRAIN_URL, label: 'Instant-decision term life, no exam' };
const healthInstant = { href: NATGEN_QUICK_QUOTE_URL, label: 'Instant health quote with live rates' };

export const PRODUCT_APPLY = {
  LifeInsurance: { formId: 'life-insurance', product: 'life insurance', instant: lifeInstant },
  WholeLife: { formId: 'life-insurance', product: 'whole life insurance' },
  IULStructuring: { formId: 'life-insurance', product: 'an IUL policy' },
  FinalExpense: { formId: 'final-expense', product: 'final expense coverage', instant: lifeInstant },
  MortgageProtection: { formId: 'mortgage-protection', product: 'mortgage protection', instant: lifeInstant },
  HealthInsurance: { formId: 'individual-health', product: 'health insurance', instant: healthInstant },
  Medicare: { formId: 'medicare', product: 'Medicare coverage' },
  Annuities: { formId: 'annuity-retirement', product: 'an annuity' },
  Employers: { formId: 'small-group-health', product: 'group health for your team' },
};

export const applyFor = (pageName) => PRODUCT_APPLY[pageName] || null;
