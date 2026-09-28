import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowRight, BadgeCheck, CalendarClock, CheckCircle2, FileText, Landmark, Lock, ShieldCheck, TrendingUp, Wallet } from 'lucide-react';

// Annuities: rates, comparisons and the online application.
//
// EVERY number on this page is dated and sourced (see SOURCES at the bottom and
// the methodology box). When rates are refreshed, update RATES_AS_OF, the two
// rate tables, BENCHMARKS and UPDATED together. Never label a rate "best".

const NAVY = '#081730';
const BLUE = '#1A3586';
const SKY = '#3B82F6';
const APPLY = '/get-started/annuity-retirement';

const UPDATED = 'September 28, 2026';
const RATES_AS_OF = 'September 23, 2026';

// Annuity.org fixed annuity rate table (data from CANNEX), dated Sep 23, 2026.
const RATED_A = [
  { term: '3 years', carrier: 'Security Benefit Life', product: 'Advanced Choice', rate: 5.25, amBest: 'A-' },
  { term: '5 years', carrier: 'Security Benefit Life', product: 'Advanced Choice', rate: 5.45, amBest: 'A-' },
  { term: '7 years', carrier: 'Security Benefit Life', product: 'Advanced Choice', rate: 5.45, amBest: 'A-' },
];
const HIGHEST = [
  { term: '3 years', carrier: 'Mountain Life', product: 'Alpine Horizon', rate: 6.1, amBest: 'B-' },
  { term: '5 years', carrier: 'Mountain Life', product: 'Alpine Horizon', rate: 6.45, amBest: 'B-' },
  { term: '7 years', carrier: 'Canvas Annuity', product: 'Canvas Future Fund', rate: 6.4, amBest: 'B++' },
  { term: '10 years', carrier: 'Canvas Annuity', product: 'Canvas Future Fund 10 Year', rate: 6.3, amBest: 'B++' },
];

// Five-year comparison, each with its own source date.
const BENCHMARKS = [
  { label: '5-year MYGA, A- rated carrier', value: 5.45, note: 'Security Benefit Life, Annuity.org / CANNEX, Sep 23, 2026', color: BLUE },
  { label: '5-year U.S. Treasury yield', value: 5.03, note: 'FRED series DGS5, Sep 24, 2026', color: SKY },
  { label: 'National average 5-year CD', value: 1.38, note: 'FDIC national rate, updated Sep 21, 2026', color: '#94A3B8' },
];

const AT_A_GLANCE = [
  { value: '5.45%', label: 'A- rated 5-year MYGA', sub: `Annuity.org / CANNEX, ${RATES_AS_OF}` },
  { value: '1.38%', label: 'Average 5-year bank CD', sub: 'FDIC national rate, Sep 2026' },
  { value: '11.20%', label: 'Highest indexed annuity cap', sub: 'Minnesota Life 7-yr, A+, Sep 24, 2026' },
  { value: '$250K', label: 'State guaranty coverage', sub: 'Annuity benefits, most states (NOLHGA)' },
];

const MARKET = [
  { value: '$464.1B', label: 'U.S. annuity sales in 2025', sub: 'A record, the 4th in a row (LIMRA, Mar 2026)' },
  { value: '$228.7B', label: 'Sales in the first half of 2026', sub: 'A record first half (LIMRA, Sep 2026)' },
  { value: '$165.3B', label: 'Fixed-rate (MYGA) sales, 2025', sub: 'LIMRA, Mar 2026' },
  { value: '$127.9B', label: 'Fixed indexed sales, 2025', sub: 'A record, 5th straight year of growth (LIMRA)' },
];

const LIMITS = [
  { value: '$24,500', label: '401(k) employee limit, 2026' },
  { value: '+$8,000', label: '401(k) catch-up, age 50+' },
  { value: '+$11,250', label: '401(k) catch-up, ages 60 to 63' },
  { value: '$7,500', label: 'IRA limit, 2026 (+$1,100 at 50+)' },
  { value: '73', label: 'Age required withdrawals (RMDs) begin' },
  { value: '~40%', label: 'Of pre-retirement pay Social Security replaces, on average' },
];

const TYPES = [
  {
    icon: Lock, name: 'Fixed rate (MYGA)', tag: 'Most like a CD',
    body: 'A guaranteed interest rate for a set term, usually 3 to 10 years. Your rate and principal are guaranteed by the insurer, and growth is tax-deferred.',
    facts: [['Growth', 'Fixed, guaranteed for the term'], ['Market risk', 'None'], ['Access', 'Often 10% a year free; surrender charges on more'], ['Good fit', 'Savers who want a known rate for a known time']],
  },
  {
    icon: TrendingUp, name: 'Fixed indexed (FIA)', tag: 'Growth with a 0% floor',
    body: 'Interest is linked to an index such as the S&P 500, up to a cap or participation rate. When the index falls, you are credited 0%, never a loss.',
    facts: [['Growth', 'Index-linked, up to a cap'], ['Market risk', 'No losses from index drops'], ['Access', 'Surrender period, often 6 to 10 years'], ['Good fit', 'Long horizons wanting upside without losses']],
  },
  {
    icon: Wallet, name: 'Immediate income (SPIA)', tag: 'A personal pension',
    body: 'Turn a lump sum into guaranteed monthly income starting within a year, for life or a set period, for you alone or you and a spouse.',
    facts: [['Growth', 'Converted into income'], ['Market risk', 'None'], ['Access', 'Income only, usually no lump-sum access'], ['Good fit', 'Retirees covering essential bills']],
  },
  {
    icon: CalendarClock, name: 'Deferred income (DIA)', tag: 'Income that starts later',
    body: 'Pay now, and income starts on a future date you choose. Waiting longer generally means a larger guaranteed check.',
    facts: [['Growth', 'Built into the future income'], ['Market risk', 'None'], ['Access', 'Limited until income starts'], ['Good fit', 'Planning income 5 or more years out']],
  },
];

const STEPS = [
  { icon: FileText, title: 'Apply online', body: 'One application, about 12 minutes: your details, how you are funding it and a short financial profile the law requires.' },
  { icon: BadgeCheck, title: 'Matthew reviews it', body: 'A licensed advisor checks it is in your best interest and matches you with a carrier, comparing rating, rate and access.' },
  { icon: Landmark, title: 'Funding is arranged', body: 'Transfers, rollovers and 1035 exchanges are requested for you. The carrier emails any forms to e-sign.' },
  { icon: ShieldCheck, title: 'Contract issued', body: 'Your contract arrives by email or mail and your free-look period begins. Your rate is confirmed by the carrier in writing.' },
];

const FAQ = [
  { q: 'What is a good annuity rate right now?', a: `As of ${RATES_AS_OF}, the highest 5-year fixed annuity (MYGA) rate from an A- rated carrier was 5.45%, and the highest overall was 6.45% from a B- rated carrier (Annuity.org, data from CANNEX). The FDIC national average for a 5-year CD was 1.38%. Rates change weekly and vary by state and premium.` },
  { q: 'Are annuity rates better than CD rates?', a: 'Often, yes. In September 2026, A- rated 5-year MYGAs paid about 4 points more than the national average 5-year CD. CDs are FDIC insured; annuities are backed by the insurer and by state guaranty associations instead, and growth is tax-deferred until you withdraw.' },
  { q: 'What is a MYGA?', a: 'A multi-year guaranteed annuity locks in a fixed interest rate for a set term, typically 3 to 10 years. At the end of the term you can renew, move the money to another annuity tax-free with a 1035 exchange, or withdraw it.' },
  { q: 'Can a fixed annuity lose money?', a: 'Not from the market. Fixed and fixed indexed annuities do not lose value when markets fall. You can lose money by withdrawing more than the free amount during the surrender period, and taxes apply to earnings when withdrawn.' },
  { q: 'Are annuities FDIC insured?', a: 'No. Annuities are backed by the claims-paying ability of the insurance company. Every state also has a life and health insurance guaranty association; in most states it covers up to $250,000 in present value of annuity benefits if an insurer fails (NOLHGA).' },
  { q: 'What AM Best rating should I look for?', a: 'AM Best rates insurers on their ability to pay claims. A++ and A+ are "Superior", A and A- are "Excellent", and B++ and B+ are "Good". Higher-yield products often come from lower-rated carriers, which is why we show A- rated rates first.' },
  { q: 'How is annuity interest taxed?', a: 'Growth is tax-deferred. When you withdraw, earnings are taxed as ordinary income, and withdrawals before age 59½ may carry a 10% federal penalty. Annuities held in an IRA follow IRA rules, including required minimum distributions starting at age 73.' },
  { q: 'Can I get my money out early?', a: 'Most contracts let you take about 10% of the value each year with no surrender charge. Taking more during the surrender period, which often lasts 3 to 10 years, triggers a charge that declines each year.' },
  { q: 'Can I move my 401(k) or IRA into an annuity?', a: 'Yes. A direct rollover or transfer from a 401(k), 403(b), 457 or IRA into an IRA annuity is not taxed. Money from an existing annuity or life policy can move with a 1035 exchange, also without tax.' },
  { q: 'Do I need to talk to someone to buy one?', a: 'No. You apply online, and a licensed advisor reviews it and submits it to the carrier. The carrier emails any forms to e-sign. You can always reply to any email with questions.' },
];

const SOURCES = [
  ['Annuity.org, fixed annuity (MYGA) rates, data from CANNEX, table dated Sep 23, 2026', 'https://www.annuity.org/annuities/rates/'],
  ['Annuity.org, fixed indexed annuity cap rates, updated Sep 24, 2026', 'https://www.annuity.org/annuities/types/indexed/rates/'],
  ['FDIC, national rates and rate caps, updated Sep 21, 2026', 'https://www.fdic.gov/national-rates-and-rate-caps'],
  ['Federal Reserve Bank of St. Louis (FRED), 5-year Treasury yield (DGS5)', 'https://fred.stlouisfed.org/series/DGS5'],
  ['LIMRA, final 2025 U.S. retail annuity sales, Mar 23, 2026', 'https://www.limra.com/en/newsroom/news-releases/2026/limra-final-u.s.-retail-annuity-sales-set-new-sales-high-totaling-$464.1-billion-in-2025/'],
  ['LIMRA, second-quarter 2026 annuity sales, Sep 8, 2026', 'https://www.limra.com/en/newsroom/news-releases/2026/limra-u.s.-annuity-sales-reach-$121.2-billion-in-the-second-quarter-of-2026-setting-a-new-first-half-record/'],
  ['IRS, 2026 401(k) and IRA limits (IR-2025-111)', 'https://www.irs.gov/newsroom/401k-limit-increases-to-24500-for-2026-ira-limit-increases-to-7500'],
  ['IRS, required minimum distribution FAQs', 'https://www.irs.gov/retirement-plans/retirement-plan-and-ira-required-minimum-distributions-faqs'],
  ['NOLHGA, what guaranty associations cover', 'https://www.nolhga.com/policyholders/faqs-product-coverage/'],
  ['SEC Investor.gov, updated investor bulletin on indexed annuities', 'https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins/updated-investor-bulletin-indexed-annuities'],
  ['Social Security Administration, retirement benefits replace about 40% of earnings', 'https://www.ssa.gov/myaccount/assets/materials/workers-61-69.pdf'],
  ['NAIC, Buyer\'s Guide for Deferred Annuities', 'https://content.naic.org/sites/default/files/publication-ann-bp-buyers-guide-deferred-annuities.pdf'],
];

const CARRIERS = [
  ['Athene', '/assets/img/f558b5fce_image.png'],
  ['SILAC', '/assets/img/feb5c554c_image.png'],
  ['Corebridge Financial', '/assets/img/51dc71410_image.png'],
  ['North American', '/assets/img/ed0abeff7_image.png'],
  ['Allianz', '/assets/img/a5a3e4686_image.png'],
  ['Midland National', '/assets/img/278f903e1_image.png'],
];

const DISCLOSURE =
  'Annuities are long-term insurance contracts. They are not bank deposits, not FDIC or NCUA insured, not insured by any federal agency and not guaranteed by a bank. Guarantees are backed by the financial strength and claims-paying ability of the issuing insurer. Surrender charges may apply to withdrawals above the free amount during the surrender period. Earnings are taxed as ordinary income when withdrawn, and withdrawals before age 59½ may incur a 10% federal tax penalty. Rates shown are published examples as of the dates stated, change frequently, vary by state, premium and product, and are confirmed only by the carrier when your contract is issued. Product availability varies by state. LifeHealthInc does not give tax or legal advice.';

const pct = (n) => `${n.toFixed(2)}%`;

function Stat({ value, label, sub, dark }) {
  return (
    <div className={`rounded-2xl p-5 ${dark ? 'bg-white/10 ring-1 ring-white/15' : 'bg-white ring-1 ring-slate-200 shadow-sm'}`}>
      <div className={`font-display text-3xl font-extrabold tabular ${dark ? 'text-white' : ''}`} style={dark ? undefined : { color: NAVY }}>{value}</div>
      <div className={`mt-1 text-sm font-semibold ${dark ? 'text-blue-100' : 'text-slate-800'}`}>{label}</div>
      {sub && <div className={`mt-1 text-xs ${dark ? 'text-blue-200/80' : 'text-slate-500'}`}>{sub}</div>}
    </div>
  );
}

function SectionHead({ eyebrow, title, children, center }) {
  return (
    <div className={`max-w-3xl mb-10 ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <p className="text-xs font-bold uppercase tracking-[0.18em] mb-3" style={{ color: BLUE }}>{eyebrow}</p>}
      <h2 className="text-3xl md:text-4xl font-extrabold" style={{ color: NAVY }}>{title}</h2>
      {children && <p className="mt-4 text-lg text-slate-600 leading-relaxed">{children}</p>}
    </div>
  );
}

export default function AnnuitiesPage() {
  const [tab, setTab] = useState('rated');
  const rows = tab === 'rated' ? RATED_A : HIGHEST;

  // FAQ + rate schema for search engines. Rates are also plain HTML in the table.
  useEffect(() => {
    const id = 'annuities-schema';
    document.getElementById(id)?.remove();
    const el = document.createElement('script');
    el.id = id;
    el.type = 'application/ld+json';
    el.textContent = JSON.stringify([
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
      ...[...RATED_A, ...HIGHEST].map((r) => ({
        '@context': 'https://schema.org',
        '@type': 'FinancialProduct',
        name: `${r.carrier} ${r.product}, ${r.term} fixed annuity (MYGA)`,
        category: 'Multi-year guaranteed annuity',
        provider: { '@type': 'Organization', name: r.carrier },
        interestRate: { '@type': 'QuantitativeValue', value: r.rate, unitText: 'PERCENT' },
        termsOfService: `Published rate as of ${RATES_AS_OF} (Annuity.org, data from CANNEX); AM Best ${r.amBest}. Confirmed by the carrier at issue.`,
        broker: { '@type': 'InsuranceAgency', name: 'LifeHealthInc', url: 'https://www.lifehealthinc.org' },
      })),
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.lifehealthinc.org/' },
          { '@type': 'ListItem', position: 2, name: 'Annuities', item: 'https://www.lifehealthinc.org/annuities' },
        ],
      },
    ]);
    document.head.appendChild(el);
    return () => el.remove();
  }, []);

  return (
    <div className="bg-slate-50">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${NAVY} 0%, ${BLUE} 100%)` }}>
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)', backgroundSize: '28px 28px' }} aria-hidden="true" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-[1.15fr_1fr] gap-12 items-center">
          <div className="text-white">
            <nav className="text-xs text-blue-200 mb-5" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-white">Home</Link> <span className="mx-1.5">/</span> <span className="text-white">Annuities</span>
            </nav>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 ring-1 ring-white/20 px-3 py-1 text-xs font-semibold text-blue-100 mb-5">
              <CalendarClock className="w-3.5 h-3.5" /> Rates updated {UPDATED}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-[3.4rem] font-extrabold leading-[1.08]">
              Annuity Rates Today: Compare MYGA, Fixed and Indexed Annuities
            </h1>
            <p className="mt-5 text-lg text-blue-100 leading-relaxed max-w-xl">
              Guaranteed rates, protection from market losses and income you cannot outlive. See dated rates with each carrier&apos;s AM Best rating, then apply online. A licensed advisor handles the rest, no sales call.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link to={APPLY} className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 font-bold shadow-lg hover:shadow-xl transition-shadow" style={{ color: NAVY }}>
                Start my annuity application <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="#rates" className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-4 font-semibold text-white ring-1 ring-white/35 hover:bg-white/10 transition-colors">
                See today&apos;s rates
              </a>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-blue-100">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-blue-300" /> Licensed in all 50 states</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-blue-300" /> NPN 20770864</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-blue-300" /> No fee to you, paid by the carrier</li>
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {AT_A_GLANCE.map((s) => <Stat key={s.label} {...s} dark />)}
          </div>
        </div>
      </section>

      {/* ── Rate board ───────────────────────────────────────────────────── */}
      <section id="rates" className="py-20 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead eyebrow="Fixed annuity (MYGA) rates" title="Today's fixed annuity rates">
            Published rates as of {RATES_AS_OF}. We show carriers rated A- or better first, because the highest yields usually come from lower-rated insurers.
          </SectionHead>

          <div className="inline-flex rounded-xl bg-white ring-1 ring-slate-200 p-1 mb-5" role="tablist">
            {[['rated', 'Rated A- or better'], ['highest', 'Highest yield, any rating']].map(([k, label]) => (
              <button
                key={k}
                role="tab"
                aria-selected={tab === k}
                onClick={() => setTab(k)}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${tab === k ? 'text-white shadow' : 'text-slate-600 hover:text-slate-900'}`}
                style={tab === k ? { background: BLUE } : undefined}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">Fixed annuity rates as of {RATES_AS_OF}</caption>
              <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-5 py-3.5 font-semibold">Term</th>
                  <th className="px-5 py-3.5 font-semibold">Carrier</th>
                  <th className="px-5 py-3.5 font-semibold hidden sm:table-cell">Product</th>
                  <th className="px-5 py-3.5 font-semibold text-right">Rate</th>
                  <th className="px-5 py-3.5 font-semibold text-right">AM Best</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((r) => (
                  <tr key={r.term + r.carrier} className="hover:bg-slate-50/70">
                    <td className="px-5 py-4 font-semibold text-slate-900">{r.term}</td>
                    <td className="px-5 py-4 text-slate-700">{r.carrier}</td>
                    <td className="px-5 py-4 text-slate-500 hidden sm:table-cell">{r.product}</td>
                    <td className="px-5 py-4 text-right font-display text-lg font-extrabold" style={{ color: BLUE }}>{pct(r.rate)}</td>
                    <td className="px-5 py-4 text-right">
                      <span className={`inline-block rounded-md px-2 py-0.5 text-xs font-bold ${r.amBest.startsWith('A') ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>{r.amBest}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-slate-500 leading-relaxed">
            Source: Annuity.org fixed annuity rate table, data from CANNEX, dated {RATES_AS_OF}. Annual rates for the full guarantee period. Rates change weekly, vary by state and premium, and are confirmed only by the carrier when your contract is issued. {tab === 'rated' && 'No A- or better 10-year rate was listed for this date.'}
          </p>

          <div className="mt-8 grid md:grid-cols-2 gap-5">
            <div className="rounded-2xl bg-white ring-1 ring-slate-200 p-6">
              <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: BLUE }}>Fixed indexed annuities</p>
              <p className="font-display text-2xl font-extrabold" style={{ color: NAVY }}>Caps from 5.00% to 11.20%</p>
              <p className="mt-2 text-sm text-slate-600">Annual caps on S&amp;P 500 style index strategies, as of September 24, 2026. The highest, 11.20%, was Minnesota Life&apos;s 7-year contract, rated A+. Source: Annuity.org.</p>
            </div>
            <div className="rounded-2xl p-6 text-white" style={{ background: `linear-gradient(135deg, ${NAVY}, ${BLUE})` }}>
              <p className="text-xs font-bold uppercase tracking-wider mb-2 text-blue-200">Lock in a rate</p>
              <p className="font-display text-2xl font-extrabold">Apply online in about 12 minutes</p>
              <p className="mt-2 text-sm text-blue-100">Matthew compares carriers on rating, rate and access, then submits it for you.</p>
              <Link to={APPLY} className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-bold" style={{ color: NAVY }}>
                Start my application <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── MYGA vs CD vs Treasury ───────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <SectionHead eyebrow="Annuity vs CD" title="A 5-year annuity vs a 5-year CD">
            An A- rated 5-year MYGA paid about four times the national average 5-year CD in September 2026, and its growth is tax-deferred until you withdraw. CDs are FDIC insured; annuities are backed by the insurer and your state&apos;s guaranty association.
          </SectionHead>
          <div className="space-y-6">
            {BENCHMARKS.map((b) => (
              <div key={b.label}>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-sm font-semibold text-slate-800">{b.label}</span>
                  <span className="font-display text-2xl font-extrabold tabular" style={{ color: NAVY }}>{pct(b.value)}</span>
                </div>
                <div className="mt-2 h-3 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-3 rounded-full" style={{ width: `${(b.value / 6) * 100}%`, background: b.color }} />
                </div>
                <p className="mt-1.5 text-xs text-slate-500">{b.note}</p>
              </div>
            ))}
            <p className="text-xs text-slate-500">
              On $100,000 over 5 years, 5.45% compounded annually grows to about $130,400, versus about $107,100 at 1.38%. Illustration only, before taxes.
            </p>
          </div>
        </div>
      </section>

      {/* ── Types ────────────────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead eyebrow="Types of annuities" title="Four ways an annuity can work for you" center>
            Every one protects your principal from the market. The difference is how it grows and when it pays.
          </SectionHead>
          <div className="grid md:grid-cols-2 gap-5">
            {TYPES.map(({ icon: Icon, name, tag, body, facts }) => (
              <article key={name} className="rounded-2xl bg-white ring-1 ring-slate-200 p-7 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <span className="rounded-xl p-2.5" style={{ background: `${BLUE}12` }}><Icon className="w-5 h-5" style={{ color: BLUE }} /></span>
                  <div>
                    <h3 className="text-xl font-extrabold" style={{ color: NAVY }}>{name}</h3>
                    <p className="text-xs font-semibold text-slate-500">{tag}</p>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed">{body}</p>
                <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-slate-100 pt-5 text-sm">
                  {facts.map(([k, v]) => (
                    <div key={k}><dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">{k}</dt><dd className="text-slate-800">{v}</dd></div>
                  ))}
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead eyebrow="How it works" title="Online from application to contract" center>
            No sales call. You fill out the application once and a licensed advisor takes it from there.
          </SectionHead>
          <ol className="grid md:grid-cols-4 gap-5">
            {STEPS.map(({ icon: Icon, title, body }, i) => (
              <li key={title} className="relative rounded-2xl ring-1 ring-slate-200 p-6 bg-slate-50">
                <span className="absolute -top-3 left-6 rounded-full px-2.5 py-0.5 text-xs font-bold text-white" style={{ background: BLUE }}>Step {i + 1}</span>
                <Icon className="w-6 h-6 mt-2 mb-3" style={{ color: BLUE }} />
                <h3 className="font-bold text-lg" style={{ color: NAVY }}>{title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 text-center">
            <Link to={APPLY} className="inline-flex items-center gap-2 rounded-xl px-8 py-4 font-bold text-white shadow-lg" style={{ background: BLUE }}>
              Start my annuity application <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Numbers ──────────────────────────────────────────────────────── */}
      <section className="py-20" style={{ background: `linear-gradient(135deg, ${NAVY} 0%, ${BLUE} 100%)` }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] mb-3 text-blue-200">By the numbers</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-10 max-w-3xl">Americans are choosing guaranteed growth in record numbers</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {MARKET.map((s) => <Stat key={s.label} {...s} dark />)}
          </div>
          <h3 className="mt-14 mb-5 text-xl font-bold text-white">2026 retirement numbers to know</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {LIMITS.map((s) => <Stat key={s.label} {...s} dark />)}
          </div>
          <p className="mt-4 text-xs text-blue-200/80">Sources: LIMRA; IRS IR-2025-111 and RMD FAQs; Social Security Administration. Full list below.</p>
        </div>
      </section>

      {/* ── Safety ───────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead eyebrow="Safety and fine print" title="How your money is protected, and what to know first" />
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { t: 'Backed by the insurer', b: 'Guarantees rest on the carrier\'s claims-paying ability. We show each carrier\'s AM Best rating so you can weigh rate against strength.' },
              { t: 'State guaranty associations', b: 'If an insurer fails, your state\'s guaranty association covers annuity benefits, up to $250,000 in present value in most states (NOLHGA).' },
              { t: 'Free-look period', b: 'After your contract is delivered you can cancel for a refund during the free-look period, typically 10 to 30 days depending on your state.' },
              { t: 'Surrender period', b: 'Taking more than the free amount early costs a surrender charge that shrinks each year. For indexed annuities the SEC notes these often last 6 to 10 years.' },
              { t: 'Free withdrawals', b: 'Many contracts allow about 10% of the value each year with no surrender charge, and full access once the term ends.' },
              { t: 'Taxes', b: 'Growth is tax-deferred; earnings are taxed as income when withdrawn. Withdrawals before 59½ may carry a 10% federal penalty.' },
            ].map(({ t, b }) => (
              <div key={t} className="rounded-2xl ring-1 ring-slate-200 p-6">
                <ShieldCheck className="w-5 h-5 mb-3" style={{ color: BLUE }} />
                <h3 className="font-bold" style={{ color: NAVY }}>{t}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Advisor + carriers ──────────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_1.2fr] gap-10 items-start">
          <div className="rounded-2xl bg-white ring-1 ring-slate-200 p-7 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.18em] mb-3" style={{ color: BLUE }}>Reviewed by</p>
            <h2 className="text-2xl font-extrabold" style={{ color: NAVY }}>Matthew Anderson</h2>
            <p className="text-slate-600">Founder and licensed insurance agent, LifeHealthInc</p>
            <dl className="mt-5 space-y-2 text-sm">
              <div className="flex justify-between gap-4 border-b border-slate-100 pb-2"><dt className="text-slate-500">National Producer Number</dt><dd className="font-semibold text-slate-900 tabular">20770864</dd></div>
              <div className="flex justify-between gap-4 border-b border-slate-100 pb-2"><dt className="text-slate-500">Licensed</dt><dd className="font-semibold text-slate-900">All 50 states</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-slate-500">Page last updated</dt><dd className="font-semibold text-slate-900">{UPDATED}</dd></div>
            </dl>
            <div className="mt-5 flex flex-wrap gap-3 text-sm">
              <a href="https://nipr.com/licensing-center/look-up-a-national-producer-number" target="_blank" rel="noopener noreferrer" className="font-semibold underline" style={{ color: BLUE }}>Look up an NPN (NIPR)</a>
              <Link to="/brokers/matthew-anderson" className="font-semibold underline" style={{ color: BLUE }}>About Matthew</Link>
            </div>
            <p className="mt-5 text-xs text-slate-500 leading-relaxed">How we are paid: the insurance company pays a commission when a contract is issued. You pay no fee to us, and the commission does not change your rate.</p>
          </div>
          <div>
            <h2 className="text-2xl font-extrabold mb-2" style={{ color: NAVY }}>Carriers we work with</h2>
            <p className="text-slate-600 mb-6">As an independent brokerage we are not tied to one insurer, so we can compare carriers for you.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {CARRIERS.map(([name, src]) => (
                <div key={name} className="flex items-center justify-center rounded-xl bg-white ring-1 ring-slate-200 h-20 p-4">
                  <img src={src} alt={name} className="max-h-10 max-w-full object-contain" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead eyebrow="FAQ" title="Annuity questions, answered" center />
          <Accordion type="single" collapsible className="w-full">
            {FAQ.map((f, i) => (
              <AccordionItem key={f.q} value={`q${i}`} className="border-slate-200">
                <AccordionTrigger className="text-left font-semibold text-slate-900 hover:no-underline">{f.q}</AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── Methodology + sources ────────────────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8">
          <div className="rounded-2xl bg-white ring-1 ring-slate-200 p-7">
            <h2 className="text-xl font-extrabold mb-3" style={{ color: NAVY }}>How we source these numbers</h2>
            <ul className="space-y-2 text-sm text-slate-600 list-disc pl-5">
              <li>Rates are published rates from an independent rate table (Annuity.org, data from CANNEX), shown with the date they were published.</li>
              <li>We list carriers rated A- or better by AM Best first, and show lower-rated carriers separately with their ratings.</li>
              <li>We never label a rate &ldquo;best&rdquo;. Your actual rate depends on your state, premium and product, and is confirmed by the carrier in writing.</li>
              <li>Benchmarks come from the FDIC, the Federal Reserve Bank of St. Louis, LIMRA, the IRS and the Social Security Administration.</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-white ring-1 ring-slate-200 p-7">
            <h2 className="text-xl font-extrabold mb-3" style={{ color: NAVY }}>Sources</h2>
            <ol className="space-y-1.5 text-sm list-decimal pl-5">
              {SOURCES.map(([label, url]) => (
                <li key={url}><a href={url} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:underline" style={{ textDecorationColor: BLUE }}>{label}</a></li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── Final CTA + disclosure ───────────────────────────────────────── */}
      <section className="py-20" style={{ background: `linear-gradient(135deg, ${NAVY} 0%, ${BLUE} 100%)` }}>
        <div className="max-w-3xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-extrabold">Guarantee the income your savings can give you</h2>
          <p className="mt-4 text-lg text-blue-100">Apply online in about 12 minutes. A licensed advisor reviews it and submits it to the carrier for you.</p>
          <Link to={APPLY} className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-bold shadow-lg" style={{ color: NAVY }}>
            Start my annuity application <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <p className="max-w-4xl mx-auto px-4 mt-14 text-[11px] leading-relaxed text-blue-200/80">{DISCLOSURE}</p>
      </section>
    </div>
  );
}
