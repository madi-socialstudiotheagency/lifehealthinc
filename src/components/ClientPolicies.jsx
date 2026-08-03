import { Loader2, AlertCircle, CheckCircle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

const GOLD = '#D4AF37';

export default function ClientPolicies({ policies, loading, onRefresh }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin" style={{ color: GOLD }} />
      </div>
    );
  }

  if (policies.length === 0) {
    return (
      <div className="rounded-lg border border-white/10 bg-white/5 p-12 text-center">
        <AlertCircle className="w-12 h-12 mx-auto mb-3" style={{ color: GOLD }} />
        <h3 className="text-lg font-semibold text-white mb-2">No Active Policies</h3>
        <p className="text-slate-400 text-sm mb-6">You don't have any approved policies yet.</p>
        <Button size="sm" style={{ backgroundColor: GOLD, color: '#081730' }} className="font-bold">
          Get a Quote
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {policies.map((policy) => (
        <div key={policy.id} className="rounded-lg border border-white/10 bg-white/5 p-6 hover:border-white/20 transition-all">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5" style={{ color: GOLD }} />
                <h3 className="text-lg font-semibold text-white">{policy.carrier || 'Insurance Policy'}</h3>
              </div>
              <div className="grid sm:grid-cols-3 gap-6 mt-4 text-sm">
                <div>
                  <p className="text-slate-500 mb-1">Coverage Type</p>
                  <p className="text-white font-medium">{policy.type || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-slate-500 mb-1">Face Amount</p>
                  <p className="text-white font-medium">${policy.faceAmount?.toLocaleString() || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-slate-500 mb-1">Monthly Premium</p>
                  <p className="text-white font-medium">${policy.monthlyEstimate?.toFixed(2) || 'N/A'}</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="inline-block px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-semibold">
                Active
              </span>
            </div>
          </div>
          {policy.notes && (
            <p className="text-sm text-slate-400 mt-4 pt-4 border-t border-white/10">{policy.notes}</p>
          )}
        </div>
      ))}
      <Button variant="outline" onClick={onRefresh} className="mt-6 border-white/20 text-slate-300 hover:bg-white/10">
        Refresh
      </Button>
    </div>
  );
}