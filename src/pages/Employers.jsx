import { Link } from 'react-router-dom';
import ApplyOnlineBand from '@/components/ApplyOnlineBand';
import TestimonialSlider from '@/components/TestimonialSlider';
import { BarChart3, Building2, CalendarClock, CheckCircle2, FileText, Layers, Phone, ShieldCheck } from 'lucide-react';

const NAVY = '#081730';
const BLUE = '#1A3586';
const SKY = '#3D6B9E';

const faqs = [
  {
    q: 'How do you find competitive group health pricing?',
    a: 'We are independent, so we request quotes from multiple carriers and funding models for the same census and plan design, then put them side by side. Pricing depends on your employees, location, industry and claims history, and we never promise the lowest rate before we have run your numbers.',
  },
  {
    q: 'What is a level-funded plan?',
    a: 'A level-funded plan is a form of self-funding with a fixed monthly payment that covers expected claims, administration and stop-loss insurance. If claims come in lower than expected, some carriers return part of the surplus. If claims run higher, stop-loss coverage limits your exposure. It is not the right fit for every group, and health history can affect eligibility and rates.',
  },
  {
    q: 'What is an ICHRA?',
    a: 'An Individual Coverage HRA lets an employer reimburse employees tax-free for individual health insurance they choose themselves, instead of running a traditional group plan. It gives the employer a predictable monthly cost. Rules on classes of employees and affordability apply, and we walk through them with you.',
  },
  {
    q: 'How many employees do we need for group coverage?',
    a: 'Federally, small group generally means up to 50 employees, and some states extend it to 100. Many carriers require at least one enrolled W-2 employee besides an owner, and typically look for minimum participation and an employer contribution. Requirements vary by state and carrier.',
  },
  {
    q: 'Do you handle renewals and compliance questions?',
    a: 'Yes. We review your renewal ahead of the date, re-market when it makes sense, and help you understand rules such as ACA employer requirements at 50 or more full-time equivalent employees. We are brokers, not attorneys, so we coordinate with your counsel or HR partner on legal questions.',
  },
  {
    q: 'Does it cost anything to have LifeHealthInc review our benefits?',
    a: 'There is no charge for the review or quotes. Carriers compensate brokers through commissions built into the premium, and your price does not increase because you use a broker.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
    {
      '@type': 'Service',
      name: 'Employer group health and benefits brokerage',
      provider: { '@type': 'InsuranceAgency', name: 'LifeHealthInc', url: 'https://www.lifehealthinc.org' },
      areaServed: 'US',
      serviceType: 'Group health insurance, level-funded plans, ICHRA, dental, vision, life and disability benefits',
    },
  ],
};

const steps = [
  { icon: FileText, title: 'Tell us about your team', text: 'A 5 minute form: headcount, locations, current plan and renewal date. No SSNs, no medical details.' },
  { icon: Layers, title: 'We shop the market', text: 'We compare fully insured, level-funded and ICHRA options across carriers for your exact group.' },
  { icon: BarChart3, title: 'You get a clear comparison', text: 'One side-by-side view of cost, networks and risk, plus our honest recommendation, including when staying put is right.' },
];

const funding = [
  { title: 'Fully insured', text: 'Fixed premium, carrier takes the claims risk. Most predictable and the simplest to run.' },
  { title: 'Level-funded', text: 'A fixed monthly payment with stop-loss protection and potential surplus refunds for healthy groups.' },
  { title: 'Self-funded', text: 'For larger groups: you pay claims directly with stop-loss insurance and more control over plan design.' },
  { title: 'ICHRA', text: 'A defined monthly allowance employees use toward individual plans. Predictable cost, flexible choice.' },
];

export default function Employers() {
  return (
    <div className="min-h-screen" style={{ background: `linear-gradient(180deg, ${NAVY} 0%, ${BLUE} 55%, ${SKY} 100%)` }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="max-w-5xl mx-auto px-4 pt-20 pb-14 text-center text-white">
        <p className="text-xs font-bold uppercase tracking-widest text-blue-200 mb-4">For employers</p>
        <h1 className="text-4xl md:text-6xl font-black leading-tight mb-5">
          Affordable business health insurance your team will actually use
        </h1>
        <p className="text-lg text-blue-100 max-w-3xl mx-auto mb-8">
          LifeHealthInc is an independent brokerage. We compare carriers and funding models side by side so you can see where your
          numbers actually land, before your next renewal, not after it.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link to="/get-started/small-group-health" className="rounded-lg bg-white px-7 py-3.5 font-bold" style={{ color: BLUE }}>
            Up to 50 employees
          </Link>
          <Link to="/get-started/corporate-group-health" className="rounded-lg border-2 border-white px-7 py-3.5 font-bold text-white">
            50+ employees
          </Link>
          <a href="tel:9545430853" className="rounded-lg px-7 py-3.5 font-bold text-white inline-flex items-center gap-2 bg-white/10">
            <Phone className="w-4 h-4" /> (954) 543-0853
          </a>
        </div>
        <p className="text-xs text-blue-200 mt-4">Free review. No obligation. No SSN or medical information needed.</p>
      </section>

      <ApplyOnlineBand page="Employers" />

      <section className="max-w-5xl mx-auto px-4 pb-14 grid md:grid-cols-3 gap-4">
        {[
          { icon: Building2, t: 'Independent', d: 'We work for you, not one insurer.' },
          { icon: ShieldCheck, t: 'Licensed nationwide', d: 'Licensed brokers serving employers in all 50 states.' },
          { icon: CalendarClock, t: 'Renewal-ready', d: 'We start early so you are never stuck with a take-it-or-leave-it increase.' },
        ].map(({ icon: Icon, t, d }) => (
          <div key={t} className="rounded-xl bg-white p-5">
            <Icon className="w-6 h-6 mb-2" style={{ color: BLUE }} />
            <h2 className="font-bold text-slate-900 mb-1">{t}</h2>
            <p className="text-sm text-slate-600">{d}</p>
          </div>
        ))}
      </section>

      <section className="max-w-5xl mx-auto px-4 pb-14 text-white">
        <h2 className="text-3xl font-black text-center mb-8">How it works</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <div key={title} className="rounded-xl border border-white/15 bg-white/5 p-5">
              <div className="text-blue-200 text-xs font-bold mb-2">STEP {i + 1}</div>
              <Icon className="w-6 h-6 mb-2" />
              <h3 className="font-bold mb-1">{title}</h3>
              <p className="text-sm text-blue-100">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 pb-14 text-white">
        <h2 className="text-3xl font-black text-center mb-2">Every funding option, explained plainly</h2>
        <p className="text-center text-blue-100 mb-8">The right structure depends on your group. We show you the tradeoffs.</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {funding.map((f) => (
            <div key={f.title} className="rounded-xl bg-white p-5">
              <h3 className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" /> {f.title}
              </h3>
              <p className="text-sm text-slate-600">{f.text}</p>
            </div>
          ))}
        </div>
        <p className="text-center mt-8">
          Also quoting dental, vision, life, disability and voluntary benefits.{' '}
          <Link to="/get-started/group-ancillary" className="underline font-semibold">Request ancillary quotes</Link>
        </p>
      </section>

      <section className="py-16" style={{ background: 'linear-gradient(180deg,#1A3586 0%,#081730 100%)' }}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-black text-white text-center mb-2">What our clients say</h2>
          <p className="text-center text-blue-200 text-sm mb-8">Verified Google reviews</p>
          <TestimonialSlider />
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 pb-14">
        <h2 className="text-3xl font-black text-center text-white mb-8">Employer questions</h2>
        <div className="space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="rounded-xl bg-white p-5 group">
              <summary className="font-bold text-slate-900 cursor-pointer">{f.q}</summary>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 pb-20 text-center text-white">
        <h2 className="text-3xl font-black mb-3">See where your renewal really stands</h2>
        <p className="text-blue-100 mb-6">Send us your renewal and headcount. We will show you the market.</p>
        <Link to="/get-started/small-group-health" className="inline-block rounded-lg bg-white px-8 py-3.5 font-bold" style={{ color: BLUE }}>
          Start my employer review
        </Link>
        <p className="text-xs text-blue-200 mt-8 max-w-2xl mx-auto">
          LifeHealthInc is an independent insurance brokerage. Rates, plan availability and eligibility vary by state, carrier and group
          and are subject to underwriting. Nothing on this page is a guarantee of savings or of a particular price.
        </p>
      </section>
    </div>
  );
}
