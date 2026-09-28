// Instant Medicare Supplement (Medigap) estimate shown after the Medicare
// application. National averages only, so it is a range and always labeled as
// an estimate. Replace BASE_G_AT_65 / STATE_FACTOR with Matthew's carrier rate
// cards to tighten it.

const BASE_G_AT_65 = 185;
const AGE_POINTS = [[65, 1], [70, 1.094], [75, 1.237], [80, 1.519], [85, 1.609]];
const PLAN_FACTOR = { 'Plan G': 1, 'Plan N': 0.74, 'Plan F (if eligible)': 1.12 };
const STATE_FACTOR = { NY: 2.2, CT: 1.5, NJ: 1.4, MA: 1.4, WA: 1.3, NM: 0.55 };
const TOBACCO_FACTOR = 1.2;
const SPREAD = 0.22;

export function ageFromDob(dob, now = new Date()) {
  const d = new Date(dob);
  if (Number.isNaN(d.getTime())) return null;
  let age = now.getFullYear() - d.getFullYear();
  const m = now.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age -= 1;
  return age;
}

function ageFactor(age) {
  const a = Math.min(Math.max(age, 65), 85);
  for (let i = 1; i < AGE_POINTS.length; i++) {
    const [a1, f1] = AGE_POINTS[i - 1];
    const [a2, f2] = AGE_POINTS[i];
    if (a <= a2) return f1 + ((f2 - f1) * (a - a1)) / (a2 - a1);
  }
  return AGE_POINTS[AGE_POINTS.length - 1][1];
}

// Returns { plan, low, high } in dollars per month, or null when we should not guess.
export function estimateMedigap({ dob, tobacco, state, suppLetter, planPreference }) {
  if (planPreference === 'Medicare Advantage (all in one)') return null;
  const age = ageFromDob(dob);
  if (age == null || age < 64) return null;
  const plan = PLAN_FACTOR[suppLetter] ? suppLetter : 'Plan G';
  let mid = BASE_G_AT_65 * PLAN_FACTOR[plan] * ageFactor(age) * (STATE_FACTOR[String(state || '').toUpperCase()] || 1);
  if (tobacco === 'Yes') mid *= TOBACCO_FACTOR;
  const round5 = (n) => Math.round(n / 5) * 5;
  return { plan, low: round5(mid * (1 - SPREAD)), high: round5(mid * (1 + SPREAD)) };
}
