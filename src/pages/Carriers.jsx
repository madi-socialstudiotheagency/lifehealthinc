import { Link } from 'react-router-dom';
import { ShieldCheck, Scale, UserCheck } from 'lucide-react';
import { CARRIER_DISCLAIMER, HEALTH_CARRIERS, LIFE_CARRIERS } from '@/data/carriers';

const NAVY = '#081730';
const BLUE = '#1A3586';
const SKY = '#3D6B9E';

const Grid = ({ title, items }) => (
  <section className="mb-12">
    <h2 className="text-sm font-bold uppercase tracking-widest text-blue-200 mb-4">{title}</h2>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {items.map((c) => (
        <div key={c.name} className="rounded-xl border border-white/15 bg-white/5 px-4 py-4 text-white font-semibold text-center">
          {c.name}
        </div>
      ))}
    </div>
  </section>
);

const points = [
  { icon: Scale, title: 'Independent, not captive', text: 'We are not tied to one company, so we compare across carriers and recommend what fits you.' },
  { icon: UserCheck, title: 'Licensed advisors', text: 'Every conversation is with a licensed LifeHealthInc advisor, not a call center.' },
  { icon: ShieldCheck, title: 'Straight answers', text: 'Plain-language explanations of cost, coverage and the fine print before you decide.' },
];

export default function Carriers() {
  return (
    <div className="min-h-screen" style={{ background: `linear-gradient(180deg, ${NAVY} 0%, ${BLUE} 60%, ${SKY} 100%)` }}>
      <div className="max-w-5xl mx-auto px-4 py-16">
        <p className="text-xs font-bold uppercase tracking-widest text-blue-200 text-center mb-3">Our carriers</p>
        <h1 className="text-4xl md:text-5xl font-black text-white text-center mb-4">One advisor, many carriers</h1>
        <p className="text-center text-blue-100 max-w-2xl mx-auto mb-12">
          LifeHealthInc shops the market on your behalf across the carriers below.
        </p>

        <div className="grid md:grid-cols-3 gap-4 mb-14">
          {points.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-xl bg-white p-5">
              <Icon className="w-6 h-6 mb-2" style={{ color: BLUE }} />
              <h3 className="font-bold text-slate-900 mb-1">{title}</h3>
              <p className="text-sm text-slate-600">{text}</p>
            </div>
          ))}
        </div>

        <Grid title="Life insurance & annuities" items={LIFE_CARRIERS} />
        <Grid title="Health & supplemental" items={HEALTH_CARRIERS} />

        <div className="text-center mb-8">
          <Link to="/get-started" className="inline-block rounded-lg bg-white px-8 py-3 font-bold" style={{ color: BLUE }}>
            Start your request
          </Link>
        </div>
        <p className="text-xs text-blue-200 text-center max-w-3xl mx-auto">{CARRIER_DISCLAIMER}</p>
      </div>
    </div>
  );
}
