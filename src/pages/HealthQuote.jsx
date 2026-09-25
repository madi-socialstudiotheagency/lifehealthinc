import { Link } from 'react-router-dom';
import { CheckCircle, Lock, ShieldCheck, Zap } from 'lucide-react';
import { NATGEN_QUICK_QUOTE_URL } from '@/data/productApply';
import RealPriceCallout from '@/components/RealPriceCallout';

const NAVY = '#081730';
const BLUE = '#1A3586';

const FAQS = [
  {
    q: 'How do I find cheap health insurance?',
    a: 'Enter your ZIP code and date of birth in the quote tool above to see affordable health insurance plans for individuals and families side by side. Prices depend on your age, location and plan type, so comparing live rates is the fastest way to find the lowest price for you.',
  },
  {
    q: 'Can I apply for health insurance online?',
    a: 'Yes. You can compare plans and apply online right on this page without a phone call. If you would rather have us do it, send your details through our online form and a licensed LifeHealthInc advisor prepares the application for you.',
  },
  {
    q: 'When is Open Enrollment for 2027 health insurance?',
    a: 'Open Enrollment for 2027 Marketplace coverage starts November 1. Some plans can be bought at any time of year, and a life event like losing coverage, moving or having a baby can open a Special Enrollment Period.',
  },
  {
    q: 'Can I get a lower price based on my income?',
    a: 'Income-based savings (premium tax credits) apply to ACA Marketplace plans. Send us your household size and income through our online form and Matthew will check whether a Marketplace plan with savings costs less for you than the plans shown above.',
  },
  {
    q: 'Do I need to talk to an agent to enroll?',
    a: 'No. Everything can be done online. Your LifeHealthInc advisor is attached to your policy, so help is there if you want it, by text, email or a scheduled call.',
  },
];

const FAQ_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};

// Live health insurance pricing and online enrollment, embedded from the
// carrier's own quoting system (Allstate Health Solutions / National General)
// under Matthew's agent code, inside a LifeHealthInc page. Visitors see real
// rates and can enroll without a call.
export default function HealthQuote() {
  return (
    <div className="bg-white">
      <section className="border-b border-slate-100" style={{ background: 'linear-gradient(180deg,#f5f8ff 0%,#ffffff 100%)' }}>
        <div className="max-w-6xl mx-auto px-4 pt-10 pb-6 md:pt-14">
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: BLUE }}>Instant health insurance quote</p>
          <h1 className="text-3xl md:text-5xl font-black leading-tight mb-3" style={{ color: NAVY }}>
            Apply for health insurance online and see real prices
          </h1>
          <p className="text-slate-600 max-w-3xl mb-5">
            Enter your ZIP code and date of birth below to see live plan rates from the carrier. Pick a plan and enroll
            online in minutes. No phone call needed, and your LifeHealthInc advisor is attached to your policy for any
            help you want later.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600">
            {[
              { icon: Zap, t: 'Live carrier pricing' },
              { icon: CheckCircle, t: 'Enroll online, no call' },
              { icon: Lock, t: 'Secure, encrypted connection' },
              { icon: ShieldCheck, t: 'Licensed advisor on your policy' },
            ].map(({ icon: Icon, t }) => (
              <span key={t} className="inline-flex items-center gap-1.5">
                <Icon className="w-4 h-4" style={{ color: BLUE }} /> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-2 sm:px-4 py-6">
        <div className="mb-6"><RealPriceCallout compact /></div>
        <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white">
          <iframe
            src={NATGEN_QUICK_QUOTE_URL}
            title="Instant health insurance quote and enrollment"
            className="w-full block"
            style={{ height: 'min(1600px, 180vh)', border: 0 }}
            allow="clipboard-write"
          />
        </div>
        <p className="text-xs text-slate-500 mt-3 text-center">
          Quotes and enrollment are provided by the carrier through LifeHealthInc, your licensed independent agency.
          Trouble loading?{' '}
          <a href={NATGEN_QUICK_QUOTE_URL} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: BLUE }}>
            Open the quote tool in a new tab
          </a>{' '}
          or <Link to="/get-started/individual-health" className="underline" style={{ color: BLUE }}>send us your details instead</Link>.
        </p>
      </section>

      <section className="max-w-3xl mx-auto px-4 pb-16">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />
        <h2 className="text-2xl md:text-3xl font-black text-center mb-6" style={{ color: NAVY }}>
          Affordable health insurance, questions answered
        </h2>
        <div className="space-y-3">
          {FAQS.map((f) => (
            <details key={f.q} className="rounded-xl border border-slate-200 bg-white p-5">
              <summary className="font-bold cursor-pointer" style={{ color: NAVY }}>{f.q}</summary>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
