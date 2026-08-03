import QuoteCalculator from '@/components/QuoteCalculator';
import { Shield, Clock, DollarSign, CheckCircle, Calendar, Star } from 'lucide-react';

const DARK1 = '#081730';
const DARK2 = '#1A3586';
const GOLD = '#FFFFFF';

const trustBadges = [
  { icon: Shield,       text: 'Licensed in All 50 States' },
  { icon: DollarSign,   text: '$0 Cost — Ever' },
  { icon: Clock,        text: 'Quote in 60 Seconds' },
  { icon: CheckCircle,  text: 'No Obligation Required' },
];

export default function QuotePage() {
  return (
    <>
      {/* SEO meta via document title */}
      <title>Free Insurance Quote Calculator | LifeHealthInc — Compare 50+ Carriers</title>

      <div className="min-h-screen py-16 px-4" style={{ background: `linear-gradient(135deg, ${DARK1} 0%, ${DARK2} 100%)` }}>
        <div className="max-w-4xl mx-auto">

          {/* Hero copy — SEO + psychological triggers */}
          <div className="text-center mb-10">
            <div className="inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-4"
              style={{ background: 'rgba(255,255,255,0.15)', color: GOLD, border: `1px solid ${GOLD}40` }}>
              Trusted by Thousands of Families Nationwide
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
              How Much Are You <span style={{ color: GOLD }}>Overpaying</span> for Insurance?
            </h1>
            <p className="text-slate-300 max-w-2xl mx-auto text-lg leading-relaxed">
              Most Americans pay <strong className="text-white">20–40% more than they should</strong> because they bought from one carrier.
              Our independent brokers shop 50+ top-rated carriers in seconds — and the comparison is 100% free.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              {trustBadges.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                  <Icon className="w-3.5 h-3.5 text-green-400" />
                  {text}
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-4 flex items-center justify-center gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-white text-white" />)}
                5-Star Client Reviews · 1,000+ Families Protected
                </p>
          </div>

          {/* Calendly booking CTA */}
          <div className="text-center mb-6">
            <a
              href="https://calendly.com/lifehealthinc/meeting-with-matthew-anderson"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold border transition-colors hover:bg-white/5"
              style={{ borderColor: `${GOLD}40`, color: GOLD }}
            >
              <Calendar className="w-4 h-4" />
              Prefer to Talk Now? Schedule a Free Call
            </a>
          </div>

          <QuoteCalculator />

          {/* SEO-rich bottom section */}
          <div className="mt-12 text-center">
            <p className="text-xs text-slate-500 max-w-2xl mx-auto leading-relaxed">
              LifeHealthInc is an independent insurance brokerage licensed in all 50 states. We compare life insurance, health insurance,
              Medicare plans, annuities, mortgage protection, and final expense coverage from top-rated carriers including Mutual of Omaha,
              Aetna, Allianz, Athene, and more — at no cost to you. NPN on file. No spam. No hard sell.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}