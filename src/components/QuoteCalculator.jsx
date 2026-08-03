import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { base44 } from '@/api/base44Client';
import {
  Heart, Shield, Activity, Stethoscope,
  ChevronRight, ChevronLeft, CheckCircle, DollarSign, Star
} from 'lucide-react';

const DARK1 = '#081730';
const DARK2 = '#1A3586';
const GOLD = '#FFFFFF';

const PRODUCTS = [
  { id: 'life_insurance',      label: 'Protect My Family',          icon: Heart,       base: 28,  desc: 'Life Insurance — from $20/mo' },
  { id: 'health_insurance',    label: 'Lower My Health Costs',      icon: Activity,    base: 320, desc: 'Health Insurance — ACA & Group' },
  { id: 'medicare',            label: "Maximize My Medicare",        icon: Stethoscope, base: 0,   desc: 'Medicare — Advantage & Supplement' },
  { id: 'final_expense',       label: 'Cover My Final Costs',       icon: Shield,      base: 55,  desc: 'Final Expense — from $40/mo' },
];

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
  'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT',
  'VA','WA','WV','WI','WY'
];

function estimateMonthly(product, age, coverageK) {
  if (!product) return null;
  const p = PRODUCTS.find(x => x.id === product);
  if (!p || p.base === 0) return null;
  const ageMultiplier = age ? Math.max(1, 1 + (age - 30) * 0.04) : 1;
  const coverageMultiplier = coverageK ? coverageK / 250 : 1;
  if (product === 'life_insurance') {
    return Math.round(p.base * ageMultiplier * coverageMultiplier);
  }
  if (product === 'health_insurance') {
    return Math.round(p.base * ageMultiplier);
  }
  return Math.round(p.base * ageMultiplier);
}

export default function QuoteCalculator() {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState(null);
  const [coverageK, setCoverageK] = useState(250);
  const [form, setForm] = useState({ fullName: '', phone: '', email: '', state: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const product = PRODUCTS.find(p => p.id === selected);
  const age = null; // no age in this simplified version
  const monthly = estimateMonthly(selected, age, coverageK);

  const handleSubmit = async () => {
    if (!form.fullName || !form.phone || !form.email || !form.state) return;
    setSubmitting(true);
    const [firstName, ...rest] = form.fullName.trim().split(' ');
    const lastName = rest.join(' ');
    await base44.entities.Lead.create({
      firstName,
      lastName,
      phone: form.phone,
      email: form.email,
      state: form.state,
      productType: selected,
      type: 'quote',
      status: 'new',
      submissionDate: new Date().toISOString(),
      transactionalSmsConsent: form.transactionalSmsConsent || false,
      promotionalSmsConsent: form.promotionalSmsConsent || false,
      consentText: 'LIFEHEALTHINC LLC A2P consent obtained at submission.',
      consentAt: new Date().toISOString(),
    });
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center text-center px-6 py-16">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5" style={{ background: '#e8f5e9' }}>
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-black mb-2" style={{ color: DARK2 }}>You're All Set!</h2>
        <p className="text-slate-500 max-w-sm">
          A licensed broker will reach out to <strong>{form.email}</strong> within 24 hours with your personalized quote.
        </p>
        <p className="text-xs text-slate-400 mt-4">Questions? Call <a href="tel:9545430853" className="underline">(954) 543-0853</a></p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-6">
        {[1, 2].map(s => (
          <div key={s} className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all"
              style={{
                background: step >= s ? DARK2 : '#e5e7eb',
                color: step >= s ? '#fff' : '#9ca3af'
              }}
            >
              {s}
            </div>
            {s < 2 && <div className="w-8 h-0.5" style={{ background: step > 1 ? DARK2 : '#e5e7eb' }} />}
          </div>
        ))}
        <span className="text-sm text-slate-500 ml-2">
          {step === 1 ? 'Step 1: Choose Product' : 'Step 2: Your Details'}
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* LEFT PANEL */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          {step === 1 ? (
            <>
              <h3 className="font-black text-lg mb-1" style={{ color: DARK2 }}>What's your #1 concern right now?</h3>
              <p className="text-xs text-slate-400 mb-5">Select the goal that matters most to you — we'll find the best plan.</p>
              <div className="grid grid-cols-2 gap-3">
                {PRODUCTS.map(({ id, label, icon: Icon, desc }) => (
                  <button
                    key={id}
                    onClick={() => setSelected(id)}
                    className="flex flex-col items-start gap-2 p-4 rounded-xl border-2 text-left transition-all"
                    style={{
                      borderColor: selected === id ? DARK2 : '#e5e7eb',
                      background: selected === id ? `${DARK2}10` : '#fff',
                    }}
                  >
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: selected === id ? DARK2 : '#f1f5f9' }}>
                      <Icon className="w-4 h-4" style={{ color: selected === id ? '#fff' : DARK2 }} />
                    </div>
                    <div>
                      <p className="text-xs font-bold" style={{ color: DARK2 }}>{label}</p>
                      <p className="text-xs text-slate-400">{desc}</p>
                    </div>
                  </button>
                ))}
              </div>

              {selected === 'life_insurance' && (
                <div className="mt-5">
                  <label className="text-xs font-semibold text-slate-600 block mb-2">Coverage Amount: ${coverageK}k</label>
                  <input
                    type="range" min={100} max={2000} step={50}
                    value={coverageK}
                    onChange={e => setCoverageK(Number(e.target.value))}
                    className="w-full accent-blue-700"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>$100k</span><span>$2,000k</span>
                  </div>
                </div>
              )}

              <Button
                onClick={() => setStep(2)}
                disabled={!selected}
                className="w-full mt-6 font-bold"
                style={{ background: DARK2, color: '#fff' }}
              >
                Next <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </>
          ) : (
            <>
              <button onClick={() => setStep(1)} className="flex items-center gap-1 text-xs text-slate-400 mb-4 hover:text-slate-700">
                <ChevronLeft className="w-3.5 h-3.5" /> Back
              </button>
              <div className="flex items-center gap-2 mb-5">
                {product && <product.icon className="w-4 h-4" style={{ color: DARK2 }} />}
                <span className="font-bold text-sm" style={{ color: DARK2 }}>{product?.label}</span>
              </div>
              <h3 className="font-black text-lg mb-4" style={{ color: DARK2 }}>Your Information</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">Full Name *</label>
                  <Input
                    placeholder="Matthew Anderson"
                    value={form.fullName}
                    onChange={e => setForm({ ...form, fullName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">Phone Number *</label>
                  <Input
                    placeholder="(954) 543-0853"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">Email *</label>
                  <Input
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">State *</label>
                  <select
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.state}
                    onChange={e => setForm({ ...form, state: e.target.value })}
                  >
                    <option value="">Select state...</option>
                    {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <p className="text-xs text-slate-400 pt-1">
                  🔒 Your info is private. A licensed broker will reach out — no spam, no obligation, ever.
                </p>
                <div className="space-y-3 bg-slate-800 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="qc-transactional"
                      checked={form.transactionalSmsConsent || false}
                      onChange={e => setForm({ ...form, transactionalSmsConsent: e.target.checked })}
                      className="mt-0.5 flex-shrink-0"
                    />
                    <label htmlFor="qc-transactional" className="text-xs leading-relaxed text-slate-300 cursor-pointer">
                      By submitting, you authorize LIFEHEALTHINC LLC to text/call the number above for informational/transactional messages, possibly using automated means. Msg/data rates apply, msg frequency varies. Consent is not a condition of purchase. <a href="/terms" className="text-blue-400 underline">See terms</a>{' '}and{' '}<a href="/privacy" className="text-blue-400 underline">privacy policy</a>. Text HELP for help and STOP to unsubscribe.
                    </label>
                  </div>
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="qc-promotional"
                      checked={form.promotionalSmsConsent || false}
                      onChange={e => setForm({ ...form, promotionalSmsConsent: e.target.checked })}
                      className="mt-0.5 flex-shrink-0"
                    />
                    <label htmlFor="qc-promotional" className="text-xs leading-relaxed text-slate-300 cursor-pointer">
                      By submitting, you authorize LIFEHEALTHINC LLC to text/call the number above for promotional messages, possibly using automated means. Msg/data rates apply, msg frequency varies. Consent is not a condition of purchase. <a href="/terms" className="text-blue-400 underline">See terms</a>{' '}and{' '}<a href="/privacy" className="text-blue-400 underline">privacy policy</a>. Text HELP for help and STOP to unsubscribe.
                    </label>
                  </div>
                </div>
                <Button
                  onClick={handleSubmit}
                  disabled={submitting || !form.fullName || !form.phone || !form.email || !form.state}
                  className="w-full font-bold text-base py-5"
                  style={{ background: `linear-gradient(135deg, ${DARK2}, #3D6B9E)`, color: '#fff' }}
                >
                  {submitting ? 'Finding Your Best Rate...' : '🎯 Show Me My Best Rate →'}
                </Button>
              </div>
            </>
          )}
        </div>

        {/* RIGHT PANEL — Estimated Cost */}
        <div
          className="rounded-2xl p-6 flex flex-col"
          style={{ background: `linear-gradient(135deg, ${DARK1}, ${DARK2})`, border: `2px solid ${GOLD}40` }}
        >
          <h3 className="text-center font-black text-lg mb-2" style={{ color: GOLD }}>Estimated Cost</h3>

          <div className="flex-1 flex flex-col items-center justify-center py-8">
            {monthly ? (
              <>
                <div className="flex items-start gap-1 mb-1">
                  <span className="text-2xl font-bold text-white mt-2">$</span>
                  <span className="text-6xl font-black" style={{ color: GOLD }}>{monthly}</span>
                </div>
                <p className="text-sm text-slate-300">per month</p>
                <p className="text-xs text-slate-400 mt-1 text-center max-w-xs">
                  Estimate for {product?.label}
                  {selected === 'life_insurance' ? ` — $${coverageK}k coverage` : ''}
                </p>
              </>
            ) : (
              <>
                <div className="flex items-start gap-1 mb-1 opacity-40">
                  <span className="text-2xl font-bold text-white mt-2">$</span>
                  <span className="text-6xl font-black text-white">—</span>
                </div>
                <p className="text-sm text-slate-400">per month</p>
                <p className="text-xs text-slate-500 mt-2 text-center">Example: $22/mo for a 34-year-old in good health</p>
                {selected && (
                  <p className="text-xs text-slate-400 mt-2 text-center max-w-xs">
                    A broker will provide a personalized quote for {product?.label}.
                  </p>
                )}
              </>
            )}
          </div>

          {/* Coverage / Term display */}
          <div className="space-y-2 mb-5">
            <div className="flex justify-between items-center px-4 py-2.5 rounded-xl" style={{ background: 'rgba(255,255,255,0.08)' }}>
              <span className="text-sm text-slate-300">Product</span>
              <span className="text-sm font-semibold text-white">{product?.label ?? '—'}</span>
            </div>
            {selected === 'life_insurance' && (
              <div className="flex justify-between items-center px-4 py-2.5 rounded-xl" style={{ background: 'rgba(255,255,255,0.08)' }}>
                <span className="text-sm text-slate-300">Coverage</span>
                <span className="text-sm font-semibold text-white">${coverageK}k</span>
              </div>
            )}
          </div>

          <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <p className="text-xs text-slate-300 leading-relaxed">
              ↗ This is an <strong className="text-white">instant estimate</strong> based on your inputs. Final premium depends on health class, state, and carrier underwriting.
            </p>
          </div>
          <p className="text-center text-xs text-slate-500 mt-3 flex items-center justify-center gap-1"><Star className="w-3 h-3 fill-white text-white" /> Independent brokers — we work for <em>you</em>, not the carrier</p>
        </div>
      </div>
    </div>
  );
}