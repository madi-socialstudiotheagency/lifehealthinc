import { Shield, Calendar, Hash, Building2, AlertCircle } from 'lucide-react';

const DARK1 = '#081730';
const DARK2 = '#1A3586';
const DARK3 = '#3D6B9E';

const POLICY_TYPE_LABELS = {
  term_life: 'Term Life',
  whole_life: 'Whole Life',
  iul: 'IUL',
  medicare_advantage: 'Medicare Advantage',
  medicare_supplement: 'Medicare Supplement',
  medicare_part_d: 'Medicare Part D',
  health_aca: 'ACA Health',
  final_expense: 'Final Expense',
  annuity: 'Annuity',
  mortgage_protection: 'Mortgage Protection',
  disability: 'Disability',
  dental: 'Dental',
  vision: 'Vision',
  other: 'Other',
};

const STATUS_STYLES = {
  active: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500', label: 'Active' },
  pending: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-400', label: 'Pending' },
  lapsed: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-400', label: 'Lapsed' },
  cancelled: { bg: 'bg-slate-100', text: 'text-slate-500', dot: 'bg-slate-400', label: 'Cancelled' },
};

function formatDate(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function PolicyGrid({ policies, loading }) {
  if (loading) {
    return (
      <div className="grid sm:grid-cols-2 gap-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="rounded-2xl border border-slate-100 bg-slate-50 p-6 animate-pulse h-48" />
        ))}
      </div>
    );
  }

  const active = policies.filter(p => p.status === 'active');

  if (active.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-100 bg-slate-50 p-10 text-center">
        <AlertCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
        <p className="font-semibold text-slate-500">No active policies found</p>
        <p className="text-sm text-slate-400 mt-1">Contact your broker if you believe this is an error.</p>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {active.map(policy => {
        const statusStyle = STATUS_STYLES[policy.status] || STATUS_STYLES.active;
        return (
          <div key={policy.id}
            className="rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col gap-4">
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `linear-gradient(135deg, ${DARK1}, ${DARK2})` }}>
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyle.bg} ${statusStyle.text}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
                {statusStyle.label}
              </span>
            </div>

            {/* Policy type */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: DARK3 }}>
                {POLICY_TYPE_LABELS[policy.policyType] || policy.policyType}
              </p>
              <p className="text-lg font-black" style={{ color: DARK1 }}>
                {policy.carrierName || '—'}
              </p>
            </div>

            {/* Meta */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-slate-500">
                <Hash className="w-3.5 h-3.5 flex-shrink-0" style={{ color: DARK3 }} />
                <span className="font-mono">{policy.policyNumber || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <Calendar className="w-3.5 h-3.5 flex-shrink-0" style={{ color: DARK3 }} />
                <span>Renews {formatDate(policy.renewalDate)}</span>
              </div>
              {policy.premiumAmount && (
                <div className="flex items-center gap-2 text-slate-500">
                  <Building2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: DARK3 }} />
                  <span>${policy.premiumAmount.toLocaleString()} / {policy.premiumFrequency?.replace('_', '-') || 'mo'}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}