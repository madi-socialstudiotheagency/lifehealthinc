import { useState, useMemo, useEffect } from 'react';
import { DollarSign, TrendingUp, Calendar } from 'lucide-react';

const GOLD = '#D4AF37';
const DARK = '#1C1B30';

// Simplified rate tables for live estimates (per $1000 coverage)
const RATES = {
  term10: { M_NT: 0.08, F_NT: 0.06, M_T: 0.18, F_T: 0.14 },
  term20: { M_NT: 0.12, F_NT: 0.09, M_T: 0.25, F_T: 0.19 },
  term30: { M_NT: 0.18, F_NT: 0.14, M_T: 0.35, F_T: 0.27 },
  whole: { M: 1.20, F: 0.90 },
};

function calculateEstimate(coverage, termLength, gender, tobacco) {
  if (!coverage || !termLength || !gender) return null;
  
  const coverageK = coverage / 1000;
  const isTerm = termLength.startsWith('term');
  
  if (isTerm) {
    const key = `${gender}_${tobacco ? 'T' : 'NT'}`;
    const rate = RATES[termLength]?.[key] || 0.12;
    return Math.round(coverageK * rate);
  } else {
    const rate = RATES.whole?.[gender] || 1.0;
    return Math.round(coverageK * rate);
  }
}

export default function LiveQuoteEstimator({ coverage, termLength, gender, tobacco, dob }) {
  const [age, setAge] = useState(null);

  useEffect(() => {
    if (dob) {
      const birthDate = new Date(dob);
      const today = new Date();
      const calculatedAge = today.getFullYear() - birthDate.getFullYear();
      setAge(calculatedAge);
    }
  }, [dob]);

  const monthlyEstimate = useMemo(() => {
    return calculateEstimate(coverage, termLength, gender, tobacco);
  }, [coverage, termLength, gender, tobacco]);

  const formatCoverage = (amount) => {
    if (!amount) return '--';
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    return `$${(amount / 1000).toFixed(0)}k`;
  };

  const formatTermLength = (term) => {
    if (!term) return '--';
    if (term === 'whole') return 'Lifetime';
    return term.replace('term', '') + ' Years';
  };

  return (
    <div className="rounded-2xl p-6 border-2 shadow-xl"
      style={{ background: `linear-gradient(135deg, ${GOLD}15, ${GOLD}05)`, borderColor: GOLD }}>
      <h3 className="text-center font-black text-2xl mb-6" style={{ color: DARK }}>
        Estimated Cost
      </h3>

      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <DollarSign className="w-6 h-6" style={{ color: GOLD }} />
          <span className="text-5xl font-black" style={{ color: DARK }}>
            {monthlyEstimate != null ? `$${monthlyEstimate}` : '$--'}
          </span>
        </div>
        <p className="text-sm font-semibold text-slate-600">per month</p>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/60">
          <span className="text-sm font-semibold text-slate-700">Coverage</span>
          <span className="text-base font-black" style={{ color: DARK }}>
            {formatCoverage(coverage)}
          </span>
        </div>

        <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/60">
          <span className="text-sm font-semibold text-slate-700">Term</span>
          <span className="text-base font-black" style={{ color: DARK }}>
            {formatTermLength(termLength)}
          </span>
        </div>

        {age && (
          <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/60">
            <span className="text-sm font-semibold text-slate-700">Age</span>
            <span className="text-base font-black" style={{ color: DARK }}>{age}</span>
          </div>
        )}
      </div>

      <div className="bg-white/80 rounded-xl p-4 border border-slate-200">
        <div className="flex items-start gap-2">
          <TrendingUp className="w-4 h-4 text-slate-600 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-slate-600 leading-relaxed">
            This is an <strong>instant estimate</strong> based on your inputs. 
            Final premium depends on health class, state, and carrier underwriting.
          </p>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs text-slate-500">
          Licensed brokers shop 50+ carriers for your best rate
        </p>
      </div>
    </div>
  );
}