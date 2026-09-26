import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { base44, sendLeadAlert } from '@/api/base44Client';
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

// Where each product's visitor goes next, and what it really costs. Every figure
// is a published example with its source; nothing here is computed or invented.
const NEXT_STEP = {
  life_insurance: '/get-started/life-insurance',
  health_insurance: '/health-quote',
  medicare: '/get-started/medicare',
  final_expense: '/get-started/final-expense',
};

const COST_INFO = {
  medicare: {
    title: 'What Medicare costs (2026)',
    rows: [
      ['Part A, hospital', '$0 for most people'],
      ['Part B, doctor visits', '$202.90/mo standard, usually taken from Social Security'],
      ['Medicare Advantage', 'Often $0 extra premium. CMS estimates the average at about $14/mo'],
      ['Medicare Supplement (Medigap)', 'Varies by age, state and plan. We compare carriers for you'],
    ],
    note: 'Medicare itself is paid for by the government. Our help choosing the plan that fills the gaps is free.',
    source: 'Source: CMS 2026 premiums and deductibles.',
  },
  life_insurance: {
    title: 'Sample life insurance prices',
    rows: [
      ['Woman, 30, 20-year $500K, non-smoker (Pacific Life)', 'about $16/mo'],
      ['Man, 40, same coverage (Pacific Life)', 'about $28/mo'],
      ['Man, 45, same coverage (Prudential)', 'about $48/mo'],
    ],
    note: 'Published examples for top health class. Your price depends on your age, health and coverage.',
    source: 'Source: carrier rates reported by NerdWallet, 2025-2026.',
  },
  health_insurance: {
    title: 'Health insurance prices',
    rows: [
      ['Short-term medical (Allstate Health Solutions)', 'about $132/mo average, from about $70/mo'],
      ['ACA Marketplace plans', 'Depends on your income. You may qualify for savings'],
    ],
    note: 'The fastest way to see your real price is the live quote tool.',
    source: 'Source: ValuePenguin.',
    link: ['/health-quote', 'See live prices for my ZIP'],
  },
  final_expense: {
    title: 'Sample final expense prices',
    rows: [
      ['$15,000 whole life, woman, 55 (Mutual of Omaha)', 'about $40/mo'],
      ['$15,000 whole life, man, 55 (Mutual of Omaha)', 'about $52/mo'],
      ['$10,000, woman, 60, non-smoker (Fidelity Life)', 'about $44/mo'],
    ],
    note: 'Published examples. Your price depends on your age, health and the amount you choose.',
    source: 'Source: carrier and third-party rate charts.',
  },
};

export default function QuoteCalculator() {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState(null);
  const [coverageK, setCoverageK] = useState(250);
  const [form, setForm] = useState({ fullName: '', phone: '', email: '', state: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const product = PRODUCTS.find(p => p.id === selected);
  const cost = selected ? COST_INFO[selected] : null;

  // After a successful submit, move the visitor on to that product's application.
  useEffect(() => {
    if (!submitted) return undefined;
    const t = setTimeout(() => window.location.assign(NEXT_STEP[selected] || '/get-started'), 2500);
    return () => clearTimeout(t);
  }, [submitted, selected]);

  const handleSubmit = async () => {
    if (!form.fullName || !form.phone || !form.email || !form.state) return;
    setSubmitting(true);
    const [firstName, ...rest] = form.fullName.trim().split(' ');
    const lastName = rest.join(' ');
    const lead = {
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
    };
    try {
      await base44.entities.Lead.create(lead);
    } catch (err) {
      // The save can fail, but the lead must never be lost or the button left spinning.
      console.error('Lead save failed, alerting Matthew directly:', err);
      sendLeadAlert('Lead', lead);
    }
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center text-center px-6 py-16">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5" style={{ background: '#e8f5e9' }}>
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-black mb-2" style={{ color: DARK2 }}>Got it, thank you!</h2>
        <p className="text-slate-500 max-w-sm">
          Taking you to the next step now. Matthew will follow up at <strong>{form.email}</strong> if anything is missing.
        </p>
        <a
          href={NEXT_STEP[selected] || '/get-started'}
          className="mt-6 inline-flex items-center justify-center rounded-xl px-7 py-3.5 font-bold text-white"
          style={{ background: DARK2 }}
        >
          Continue my application
        </a>
        <p className="text-xs text-slate-400 mt-4">Questions? Call or text <a href="tel:9545430853" className="underline">(954) 543-0853</a></p>
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
                  {submitting ? 'Sending…' : 'Continue →'}
                </Button>
              </div>
            </>
          )}
        </div>

        {/* RIGHT PANEL — what it costs, from published sources */}
        <div
          className="rounded-2xl p-6 flex flex-col"
          style={{ background: `linear-gradient(135deg, ${DARK1}, ${DARK2})`, border: `2px solid ${GOLD}40` }}
        >
          <h3 className="text-center font-black text-lg mb-4" style={{ color: GOLD }}>{cost ? cost.title : 'What will it cost?'}</h3>

          {cost ? (
            <div className="flex-1 flex flex-col">
              <ul className="space-y-2 mb-4">
                {cost.rows.map(([label, value]) => (
                  <li key={label} className="rounded-xl px-4 py-3" style={{ background: 'rgba(255,255,255,0.08)' }}>
                    <span className="block text-xs text-slate-300">{label}</span>
                    <span className="block text-sm font-bold text-white mt-0.5">{value}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-slate-200 leading-relaxed mb-2">{cost.note}</p>
              <p className="text-[11px] text-slate-400 mb-4">{cost.source}</p>
              {cost.link && (
                <a href={cost.link[0]} className="text-center rounded-xl bg-white px-5 py-3 font-bold text-sm mb-4" style={{ color: DARK2 }}>
                  {cost.link[1]}
                </a>
              )}
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center py-10">
              <p className="text-sm text-slate-300 text-center max-w-xs">Pick what you want to protect and we will show typical real-world costs here.</p>
            </div>
          )}

          <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <p className="text-xs text-slate-300 leading-relaxed">
              These are published examples, not a quote. Your actual price depends on your age, health, state and the carrier.
            </p>
          </div>
          <p className="text-center text-xs text-slate-400 mt-3 flex items-center justify-center gap-1"><Star className="w-3 h-3 fill-white text-white" /> Independent brokers, we work for <em>you</em>, not the carrier</p>
        </div>
      </div>
    </div>
  );
}