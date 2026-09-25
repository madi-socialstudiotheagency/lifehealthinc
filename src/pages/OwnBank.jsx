import { Link } from 'react-router-dom';
import { AlertTriangle, Briefcase, Landmark, Scale, TrendingUp, Users } from 'lucide-react';

const NAVY = '#081730';
const BLUE = '#1A3586';
const SKY = '#3D6B9E';

const faqs = [
  {
    q: 'Does becoming your own bank mean life insurance replaces a bank?',
    a: 'No. A life insurance policy is not a bank account and is not FDIC insured. The idea is that permanent life insurance builds cash value you can borrow against, so some people use it as one part of a savings and financing strategy alongside conventional accounts.',
  },
  {
    q: 'Is the cash value guaranteed?',
    a: 'Whole life carries guaranteed minimum cash values set by the contract. Indexed universal life cash value is linked to a market index with a floor and a cap, and the crediting rates and charges can change, so illustrated results are not guaranteed.',
  },
  {
    q: 'Are policy loans tax-free?',
    a: 'Loans from a policy that is not a Modified Endowment Contract (MEC) and stays in force are generally not treated as taxable income. If the policy lapses or is surrendered with an outstanding loan, gains may become taxable. Talk to your tax advisor about your situation.',
  },
  {
    q: 'What are the downsides?',
    a: 'Early-year cash value is low because of charges and surrender periods, loans accrue interest and reduce the death benefit, overfunding limits apply, and a poorly managed policy can lapse. It is not suitable for everyone, and it works best with a long time horizon.',
  },
  {
    q: 'How do employers and business owners use this?',
    a: 'Common uses include executive bonus plans, funding non-qualified deferred compensation, key person coverage and buy-sell agreements. Each has tax and legal considerations that should be reviewed with your CPA and attorney.',
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
      '@type': 'Article',
      headline: 'Become your own bank: cash value life insurance explained for business owners',
      author: { '@type': 'Organization', name: 'LifeHealthInc' },
      publisher: { '@type': 'Organization', name: 'LifeHealthInc' },
    },
  ],
};

const uses = [
  { icon: Briefcase, t: 'Executive bonus plans', d: 'Reward and retain key people with a policy they own.' },
  { icon: Landmark, t: 'Owner savings strategy', d: 'Build accessible cash value alongside your other accounts.' },
  { icon: Users, t: 'Key person and buy-sell', d: 'Fund a buyout or protect the business if a key person is lost.' },
  { icon: TrendingUp, t: 'Supplemental retirement income', d: 'Plan for tax-advantaged income using policy loans, subject to policy performance.' },
];

export default function OwnBank() {
  return (
    <div className="min-h-screen" style={{ background: `linear-gradient(180deg, ${NAVY} 0%, ${BLUE} 55%, ${SKY} 100%)` }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="max-w-4xl mx-auto px-4 pt-20 pb-12 text-center text-white">
        <p className="text-xs font-bold uppercase tracking-widest text-blue-200 mb-4">Cash value strategy</p>
        <h1 className="text-4xl md:text-6xl font-black leading-tight mb-5">Become your own bank</h1>
        <p className="text-lg text-blue-100 max-w-3xl mx-auto mb-8">
          How business owners use cash value life insurance to build savings they can borrow against, explained honestly, including
          the risks most sales pages leave out.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link to="/get-started/executive-benefits" className="rounded-lg bg-white px-7 py-3.5 font-bold" style={{ color: BLUE }}>
            Request a free illustration
          </Link>
          <Link to="/employers" className="rounded-lg border-2 border-white px-7 py-3.5 font-bold text-white">
            Employer benefits
          </Link>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 pb-12 text-white">
        <h2 className="text-3xl font-black mb-4">The idea in plain English</h2>
        <p className="text-blue-100 leading-relaxed mb-4">
          Permanent life insurance, such as whole life or indexed universal life (IUL), builds cash value inside the policy over time.
          You can borrow against that cash value, and the policy stays in force as long as it is managed properly. Some owners use
          this to fund purchases, cover gaps or supplement retirement income, which is where the phrase "become your own bank" comes
          from. The policy also pays a death benefit to your beneficiaries.
        </p>
        <p className="text-blue-100 leading-relaxed">
          It is a long-term strategy, not a quick win. Cash value usually starts slowly, and the results depend on how the policy is
          designed and funded.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-4 pb-12">
        <div className="rounded-2xl bg-white p-6 md:p-8">
          <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-amber-600" /> What you need to know first
          </h2>
          <ul className="space-y-2 text-sm text-slate-700 leading-relaxed list-disc pl-5">
            <li>A life insurance policy is not a bank account and is not FDIC insured.</li>
            <li>IUL cash value is not guaranteed. Caps, participation rates and charges can change.</li>
            <li>Policy loans accrue interest and reduce your death benefit and available cash value.</li>
            <li>If the policy lapses with a loan outstanding, the gain may become taxable income.</li>
            <li>Paying too much premium too fast can turn the policy into a Modified Endowment Contract (MEC), which changes the tax treatment.</li>
            <li>Early years carry higher effective costs and may include surrender charges.</li>
            <li>Illustrations show projections, not promises. We show you conservative and guaranteed columns too.</li>
            <li>Not suitable for everyone. Review with your tax and legal advisors.</li>
          </ul>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 pb-12 text-white">
        <h2 className="text-3xl font-black text-center mb-8">Where business owners use it</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {uses.map(({ icon: Icon, t, d }) => (
            <div key={t} className="rounded-xl bg-white p-5">
              <Icon className="w-6 h-6 mb-2" style={{ color: BLUE }} />
              <h3 className="font-bold text-slate-900 mb-1">{t}</h3>
              <p className="text-sm text-slate-600">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 pb-12 text-white">
        <h2 className="text-3xl font-black mb-4 flex items-center gap-2"><Scale className="w-7 h-7" /> Why work with an independent broker</h2>
        <p className="text-blue-100 leading-relaxed">
          Policy design and carrier choice change results a lot. We compare illustrations from multiple carriers, show guaranteed and
          non-guaranteed assumptions, and tell you plainly when a different tool, or no policy at all, fits you better.
        </p>
      </section>

      <section className="max-w-3xl mx-auto px-4 pb-14">
        <h2 className="text-3xl font-black text-center text-white mb-8">Common questions</h2>
        <div className="space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="rounded-xl bg-white p-5">
              <summary className="font-bold text-slate-900 cursor-pointer">{f.q}</summary>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 pb-20 text-center text-white">
        <h2 className="text-3xl font-black mb-3">See real numbers for your situation</h2>
        <p className="text-blue-100 mb-6">A licensed advisor prepares a carrier illustration and walks you through every line. Free.</p>
        <Link to="/get-started/executive-benefits" className="inline-block rounded-lg bg-white px-8 py-3.5 font-bold" style={{ color: BLUE }}>
          Get my free illustration
        </Link>
        <p className="text-xs text-blue-200 mt-8 max-w-2xl mx-auto">
          This page is educational and is not tax, legal or investment advice. Insurance products are issued by insurance companies and
          are subject to underwriting, fees, charges and state availability. Loans and withdrawals reduce cash value and death benefit.
          LifeHealthInc does not guarantee any result.
        </p>
      </section>
    </div>
  );
}
