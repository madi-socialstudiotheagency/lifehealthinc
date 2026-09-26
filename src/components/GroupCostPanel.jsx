import { useState } from 'react';
import { Users } from 'lucide-react';

const NAVY = '#081730';
const BLUE = '#1A3586';

// National averages from the KFF 2025 Employer Health Benefits Survey, for firms
// with 10 to 199 workers. They are a planning reference, never a quote.
const SINGLE_YEAR = 9211;
const FAMILY_YEAR = 26054;
const WORKER_SHARE_SINGLE = '16%';
const WORKER_SHARE_FAMILY = '26%';

const money = (n) => '$' + Math.round(n).toLocaleString('en-US');

export default function GroupCostPanel({ compact = false }) {
  const [staff, setStaff] = useState(10);
  const n = Math.max(1, Math.min(500, Number(staff) || 0));

  return (
    <div className={`rounded-2xl border border-blue-100 bg-white text-left shadow-sm ${compact ? 'p-5' : 'p-6 md:p-8'}`}>
      <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest mb-2" style={{ color: BLUE }}>
        <Users className="w-4 h-4" /> What group health costs on average
      </p>
      <h2 className={`${compact ? 'text-lg' : 'text-2xl'} font-black mb-4`} style={{ color: NAVY }}>
        A typical small employer pays about {money(SINGLE_YEAR / 12)} per employee each month
      </h2>

      <div className="grid sm:grid-cols-2 gap-3 mb-4">
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs text-slate-500">Employee-only coverage</p>
          <p className="text-2xl font-black" style={{ color: NAVY }}>{money(SINGLE_YEAR / 12)}<span className="text-sm font-bold text-slate-500">/mo total premium</span></p>
          <p className="text-xs text-slate-500 mt-1">Employees typically pay about {WORKER_SHARE_SINGLE}; the employer covers the rest.</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs text-slate-500">Family coverage</p>
          <p className="text-2xl font-black" style={{ color: NAVY }}>{money(FAMILY_YEAR / 12)}<span className="text-sm font-bold text-slate-500">/mo total premium</span></p>
          <p className="text-xs text-slate-500 mt-1">Employees typically pay about {WORKER_SHARE_FAMILY}; the employer covers the rest.</p>
        </div>
      </div>

      <label className="block text-sm font-semibold mb-1" style={{ color: NAVY }} htmlFor="gcp-staff">How many employees would be covered?</label>
      <input
        id="gcp-staff"
        type="number"
        min="1"
        max="500"
        inputMode="numeric"
        value={staff}
        onChange={(e) => setStaff(e.target.value)}
        className="w-28 rounded-lg border border-slate-300 px-3 py-2 text-base mb-3"
      />
      <p className="text-sm text-slate-700 mb-1">
        Rough total for {n} {n === 1 ? 'employee' : 'employees'} on employee-only coverage:{' '}
        <strong style={{ color: NAVY }}>about {money((SINGLE_YEAR / 12) * n)} per month</strong>.
      </p>
      <p className="text-[11px] text-slate-400 mt-3 leading-relaxed">
        National averages for employers with 10 to 199 workers, from the KFF 2025 Employer Health Benefits Survey. This is a
        reference, not a quote. Your actual price depends on your employees&apos; ages, ZIP code, industry, the plan and its funding, so the exact
        number is to be confirmed once Matthew runs your census.
      </p>
    </div>
  );
}
