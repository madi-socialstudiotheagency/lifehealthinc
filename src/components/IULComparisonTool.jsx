import { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend, LineChart, Line } from 'recharts';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { TrendingUp, Shield, PiggyBank, Trophy, Info, ChevronRight } from 'lucide-react';

const GOLD = '#FFFFFF';
const DARK1 = '#081730';
const DARK2 = '#1A3586';

// ── Model assumptions ──────────────────────────────────────────────────────
const IUL_AVG_RATE     = 0.0600; // 6% avg credited (0% floor, 13.3% cap)
const IUL_POLICY_COST  = 0.0050; // 0.5% annual policy charges
const SAVINGS_APY      = 0.0200; // 2% high-yield savings (after income tax calc below)
const MARKET_RETURN    = 0.0800; // 8% broad index fund average
const INCOME_TAX_RATE  = 0.22;   // 22% marginal tax on savings interest
const CAP_GAINS_RATE   = 0.15;   // 15% long-term capital gains on market

const SCENARIOS = [
  { key: 'iul',     label: 'IUL Policy',          color: GOLD,      stroke: GOLD,      icon: Shield,    textColor: '#081730' },
  { key: 'market',  label: 'Market Portfolio',    color: '#818cf8', stroke: '#818cf8', icon: TrendingUp, textColor: 'white'  },
  { key: 'savings', label: 'Savings Account',     color: '#34d399', stroke: '#34d399', icon: PiggyBank,  textColor: '#1C1B30' },
];

function buildData(monthly, horizon, inflationPct) {
  const annual = monthly * 12;
  const inflRate = inflationPct / 100;
  const iulRate  = IUL_AVG_RATE - IUL_POLICY_COST;          // effective ~5.5%
  const savRate  = SAVINGS_APY * (1 - INCOME_TAX_RATE);      // after-tax ~1.56%

  let iulVal = 0, savVal = 0, mktVal = 0, totalContribs = 0;
  const rows = [];

  for (let year = 1; year <= horizon; year++) {
    totalContribs += annual;
    iulVal  = (iulVal  + annual) * (1 + iulRate);
    savVal  = (savVal  + annual) * (1 + savRate);
    mktVal  = (mktVal  + annual) * (1 + MARKET_RETURN);

    const inflFactor = Math.pow(1 + inflRate, year);

    // IUL: tax-free via policy loans – full value
    const iulNom  = Math.round(iulVal);
    const iulReal = Math.round(iulVal / inflFactor);

    // Savings: already after-tax interest
    const savNom  = Math.round(savVal);
    const savReal = Math.round(savVal / inflFactor);

    // Market: apply cap-gains tax on gains at withdrawal
    const mktGains    = mktVal - totalContribs;
    const mktAfterTax = mktVal - mktGains * CAP_GAINS_RATE;
    const mktNom  = Math.round(mktAfterTax);
    const mktReal = Math.round(mktAfterTax / inflFactor);

    rows.push({
      year,
      contributions: Math.round(totalContribs),
      iul_nominal: iulNom,   iul_real: iulReal,
      market_nominal: mktNom, market_real: mktReal,
      savings_nominal: savNom, savings_real: savReal,
    });
  }
  return rows;
}

const fmt  = (v) => v >= 1_000_000 ? `$${(v / 1_000_000).toFixed(2)}M` : `$${(v / 1000).toFixed(0)}k`;
const fmt2 = (v) => `$${Math.round(v).toLocaleString()}`;

function CustomTooltip({ active, payload, label, view }) {
  if (!active || !payload?.length) return null;
  const suffix = view === 'real' ? '_real' : '_nominal';
  return (
    <div className="p-4 rounded-xl shadow-2xl text-sm" style={{ background: DARK2, border: `1px solid ${GOLD}40` }}>
      <p className="font-bold mb-3" style={{ color: GOLD }}>Year {label}</p>
      {SCENARIOS.map(s => {
        const item = payload.find(p => p.dataKey === `${s.key}${suffix}`);
        return item ? (
          <div key={s.key} className="flex justify-between gap-6 mb-1">
            <span style={{ color: s.stroke }}>{s.label}</span>
            <span className="font-bold text-white">{fmt2(item.value)}</span>
          </div>
        ) : null;
      })}
      {payload.find(p => p.dataKey === 'contributions') && (
        <div className="flex justify-between gap-6 mt-2 pt-2 border-t border-white/10">
          <span className="text-slate-400">Contributed</span>
          <span className="text-slate-300 font-semibold">{fmt2(payload.find(p => p.dataKey === 'contributions').value)}</span>
        </div>
      )}
    </div>
  );
}

export default function IULComparisonTool() {
  const [monthly,   setMonthly]   = useState([500]);
  const [horizon,   setHorizon]   = useState([20]);
  const [inflation, setInflation] = useState([3]);
  const [view,      setView]      = useState('nominal'); // 'nominal' | 'real'

  const data     = useMemo(() => buildData(monthly[0], horizon[0], inflation[0]), [monthly, horizon, inflation]);
  const lastRow  = data[data.length - 1] || {};
  const suffix   = view === 'real' ? '_real' : '_nominal';

  const totalContribs = monthly[0] * 12 * horizon[0];
  const iulBest  = (lastRow[`iul${suffix}`] ?? 0) > (lastRow[`market${suffix}`] ?? 0);

  const summaryCards = [
    {
      ...SCENARIOS[0],
      value: lastRow.iul_nominal ?? 0,
      realVal: lastRow.iul_real ?? 0,
      gain: (lastRow.iul_nominal ?? 0) - totalContribs,
      note: 'Tax-free via policy loans. 0% floor protects principal.',
      tag: 'Tax-Free Access',
      tagColor: 'text-green-400 bg-green-900/30 border-green-700/40',
    },
    {
      ...SCENARIOS[1],
      value: lastRow.market_nominal ?? 0,
      realVal: lastRow.market_real ?? 0,
      gain: (lastRow.market_nominal ?? 0) - totalContribs,
      note: `After 15% cap-gains tax on gains. Market can drop — no floor.`,
      tag: '15% Cap-Gains Tax',
      tagColor: 'text-blue-300 bg-blue-900/30 border-blue-700/40',
    },
    {
      ...SCENARIOS[2],
      value: lastRow.savings_nominal ?? 0,
      realVal: lastRow.savings_real ?? 0,
      gain: (lastRow.savings_nominal ?? 0) - totalContribs,
      note: 'Interest taxed as ordinary income each year at ~22%.',
      tag: 'Taxed Annually',
      tagColor: 'text-red-400 bg-red-900/30 border-red-700/40',
    },
  ];

  return (
    <div className="space-y-8">

      {/* ── Controls ─────────────────────────────────────────────────── */}
      <div className="grid lg:grid-cols-3 gap-6">
        {[
          { label: 'Monthly Contribution', value: `$${monthly[0].toLocaleString()}`, props: { value: monthly, onValueChange: setMonthly, min: 100, max: 5000, step: 50 }, range: ['$100', '$5,000'] },
          { label: 'Time Horizon',          value: `${horizon[0]} yrs`,              props: { value: horizon, onValueChange: setHorizon, min: 5,   max: 40,   step: 5  }, range: ['5 yrs', '40 yrs'] },
          { label: 'Inflation Rate',        value: `${inflation[0]}%`,               props: { value: inflation, onValueChange: setInflation, min: 1, max: 6, step: 0.5 }, range: ['1%', '6%'] },
        ].map(({ label, value, props, range }) => (
          <div key={label} className="rounded-2xl p-6 border border-white/10" style={{ background: 'linear-gradient(160deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))' }}>
            <div className="flex justify-between items-center mb-3">
              <span className="text-white font-semibold text-sm">{label}</span>
              <span className="text-xl font-black" style={{ color: GOLD }}>{value}</span>
            </div>
            <Slider {...props} className="w-full" />
            <div className="flex justify-between text-xs text-slate-500 mt-2"><span>{range[0]}</span><span>{range[1]}</span></div>
          </div>
        ))}
      </div>

      {/* ── Assumptions strip ────────────────────────────────────────── */}
      <div className="rounded-xl px-5 py-3 border border-white/8 flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-400" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <span className="flex items-center gap-1.5"><Info className="w-3.5 h-3.5" style={{ color: GOLD }} /> <strong className="text-white">IUL:</strong> 6% avg credit rate · 0% floor · 13.3% cap · 0.5% annual costs · tax-free access</span>
        <span className="flex items-center gap-1.5"><Info className="w-3.5 h-3.5 text-indigo-400" /> <strong className="text-white">Market Portfolio:</strong> 8% avg · 15% cap-gains tax at withdrawal</span>
        <span className="flex items-center gap-1.5"><Info className="w-3.5 h-3.5 text-green-400" /> <strong className="text-white">Savings:</strong> 2% APY · 22% income tax on interest annually</span>
      </div>

      {/* ── Chart ────────────────────────────────────────────────────── */}
      <div className="rounded-2xl border border-white/10 overflow-hidden" style={{ background: 'linear-gradient(160deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))' }}>
        {/* Toggle */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div>
            <h3 className="text-white font-bold">Growth Over Time</h3>
            <p className="text-slate-400 text-xs mt-0.5">{view === 'real' ? `Inflation-adjusted purchasing power in today's dollars` : 'Nominal (face-value) projected balances'}</p>
          </div>
          <div className="flex gap-2 bg-black/40 p-1.5 rounded-xl">
            {[['nominal', 'Nominal'], ['real', 'Inflation-Adjusted']].map(([v, lbl]) => (
              <button key={v} onClick={() => setView(v)}
                className="px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300"
                style={view === v ? { background: DARK2, color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.3)' } : { color: '#6b7280' }}>
                {lbl}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 8, right: 10, left: 10, bottom: 20 }}>
                <defs>
                  {SCENARIOS.map(s => (
                    <linearGradient key={s.key} id={`grad_${s.key}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor={s.color} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={s.color} stopOpacity={0}   />
                    </linearGradient>
                  ))}
                  <linearGradient id="grad_contrib" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#475569" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#475569" stopOpacity={0}   />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="year" stroke="#374151" tick={{ fill: '#6b7280', fontSize: 11 }} label={{ value: 'Year', position: 'insideBottom', offset: -12, fill: '#6b7280', fontSize: 12 }} />
                <YAxis stroke="#374151" tick={{ fill: '#6b7280', fontSize: 11 }} tickFormatter={fmt} width={55} />
                <RechartsTooltip content={<CustomTooltip view={view} />} />
                <Legend wrapperStyle={{ paddingTop: '24px', fontSize: '12px', color: '#9ca3af' }} />
                <Area type="monotone" dataKey="contributions" stroke="#475569" strokeWidth={1.5} fill="url(#grad_contrib)" name="Total Contributions" dot={false} strokeDasharray="4 4" />
                {SCENARIOS.map(s => (
                  <Area key={s.key} type="monotone" dataKey={`${s.key}${suffix}`} stroke={s.stroke} strokeWidth={s.key === 'iul' ? 3 : 2} fill={`url(#grad_${s.key})`} name={s.label} dot={false} />
                ))}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ── Summary Cards ─────────────────────────────────────────────── */}
      <div className="grid md:grid-cols-3 gap-5">
        {summaryCards.map((s, i) => {
          const isWinner = s.value === Math.max(...summaryCards.map(x => x.value));
          return (
            <div key={s.key} className="rounded-2xl p-6 border transition-all duration-300 relative overflow-hidden"
              style={{ borderColor: isWinner ? `${s.stroke}60` : 'rgba(255,255,255,0.08)', background: isWinner ? `${s.stroke}0D` : 'linear-gradient(160deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))' }}>
              {isWinner && <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${s.stroke}00, ${s.stroke}, ${s.stroke}00)` }} />}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${s.stroke}25` }}>
                    <s.icon className="w-4 h-4" style={{ color: s.stroke }} />
                  </div>
                  <span className="font-bold text-white text-sm">{s.label}</span>
                </div>
                {isWinner && (
                  <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold" style={{ background: `${GOLD}20`, color: GOLD }}>
                    <Trophy className="w-3 h-3" /> Best
                  </div>
                )}
              </div>

              <div className="mb-4">
                <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">Nominal Value</p>
                <p className="text-2xl font-black" style={{ color: s.stroke }}>{fmt2(s.value)}</p>
              </div>
              <div className="rounded-xl p-3 mb-3" style={{ background: 'rgba(0,0,0,0.25)' }}>
                <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">Inflation-Adjusted</p>
                <p className="text-lg font-bold text-white">{fmt2(s.realVal)}</p>
              </div>
              <div className="rounded-xl p-3 mb-4" style={{ background: 'rgba(0,0,0,0.2)' }}>
                <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">Gain Over Contributions</p>
                <p className="text-base font-bold text-green-400">+{fmt2(s.gain)}</p>
              </div>

              <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold border mb-3 ${s.tagColor}`}>{s.tag}</span>
              <p className="text-slate-400 text-xs leading-relaxed">{s.note}</p>
            </div>
          );
        })}
      </div>

      {/* ── Insight bar ───────────────────────────────────────────────── */}
      <div className="rounded-2xl p-6 border flex flex-col sm:flex-row items-center justify-between gap-5"
        style={{ borderColor: `${GOLD}30`, background: `linear-gradient(135deg, ${GOLD}0A, rgba(28,27,48,0.9))` }}>
        <div>
          <p className="font-bold text-white mb-1">
            IUL delivers <span style={{ color: GOLD }}>{fmt2(Math.max(0, (lastRow.iul_nominal ?? 0) - (lastRow.savings_nominal ?? 0)))}</span> more than a savings account over {horizon[0]} years — after all fees.
          </p>
          <p className="text-slate-400 text-sm">These projections use fixed assumptions. Request a personalized carrier illustration for precise numbers.</p>
        </div>
        <Button asChild className="flex-shrink-0 font-bold rounded-xl px-6 py-5 hover:scale-105 transition-all"
          style={{ background: 'linear-gradient(135deg, #1A3586, #3D6B9E)', color: '#FFFFFF' }}>
          <a href="https://calendly.com/lifehealthinc/lifehealthinc" target="_blank" rel="noopener noreferrer">
            Get My Illustration <ChevronRight className="w-4 h-4 ml-1" />
          </a>
        </Button>
      </div>

      <p className="text-xs text-slate-600 text-center">Educational tool only. Projections use simplified assumptions and do not represent guaranteed returns. IUL returns depend on actual carrier caps, floors, charges, and credited rates. Consult a licensed professional.</p>
    </div>
  );
}