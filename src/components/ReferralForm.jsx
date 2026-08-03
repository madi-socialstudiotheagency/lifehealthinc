import { useState } from 'react';
import { X, UserPlus, CheckCircle2, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';

const GOLD = '#D4AF37';
const DARK1 = '#1C1B30';
const DARK2 = '#2C2B50';

export default function ReferralForm({ open, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    // Referrer info
    referrerName: '',
    referrerEmail: '',
    referrerPhone: '',
    // Referred person info
    refFirstName: '',
    refLastName: '',
    refPhone: '',
    refEmail: '',
    refCoverageType: '',
    notes: '',
    transactionalSmsConsent: false,
    marketingSmsConsent: false,
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const coverageTypes = [
    'Health Insurance',
    'Life Insurance',
    'Mortgage Protection',
    'Medicare',
    'Annuity / Retirement',
    'Final Expense',
    'Not Sure – Needs Review',
  ];

  const canSubmit = form.referrerName && form.referrerEmail && form.refFirstName && form.refPhone && form.refCoverageType;

  const handleSubmit = async () => {
    setLoading(true);
    await base44.entities.Lead.create({
      firstName: form.refFirstName,
      lastName: form.refLastName,
      email: form.refEmail || `referral-${Date.now()}@noemail.lifehealthinc.org`,
      phone: form.refPhone,
      productType: form.refCoverageType === 'Health Insurance' ? 'health_insurance'
        : form.refCoverageType === 'Life Insurance' ? 'life_insurance'
        : form.refCoverageType === 'Mortgage Protection' ? 'mortgage_protection'
        : form.refCoverageType === 'Medicare' ? 'medicare'
        : form.refCoverageType === 'Annuity / Retirement' ? 'annuity'
        : form.refCoverageType === 'Final Expense' ? 'final_expense'
        : 'life_insurance',
      type: 'partnerForm',
      primaryInterest: `Referral from ${form.referrerName} (${form.referrerEmail}) – ${form.refCoverageType}`,
      notes: `REFERRAL\nReferred by: ${form.referrerName} | ${form.referrerEmail} | ${form.referrerPhone}\nCoverage requested: ${form.refCoverageType}\nNotes: ${form.notes}`,
      status: 'new',
      submissionDate: new Date().toISOString(),
    });
    setLoading(false);
    setSubmitted(true);
  };

  const reset = () => {
    setForm({ referrerName: '', referrerEmail: '', referrerPhone: '', refFirstName: '', refLastName: '', refPhone: '', refEmail: '', refCoverageType: '', notes: '' });
    setSubmitted(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      style={{ background: 'rgba(0,0,0,0.80)' }}
      onClick={e => e.target === e.currentTarget && (onClose(), reset())}>
      <div className="w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl my-4"
        style={{ background: `linear-gradient(160deg, ${DARK1}, ${DARK2})`, border: `1px solid ${GOLD}30` }}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: `${GOLD}25` }}>
          <div className="flex items-center gap-2">
            <UserPlus className="w-5 h-5" style={{ color: GOLD }} />
            <span className="font-black text-white">Refer Someone for Coverage</span>
          </div>
          <button onClick={() => { onClose(); reset(); }} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-6">
          {submitted ? (
            <div className="text-center py-6">
              <CheckCircle2 className="w-14 h-14 mx-auto mb-4" style={{ color: '#10b981' }} />
              <h3 className="text-xl font-black text-white mb-2">Referral Submitted!</h3>
              <p className="text-slate-400 text-sm mb-6 max-w-sm mx-auto">
                Thank you! A licensed broker will reach out to your referral within 24 hours. We appreciate you helping protect the people you care about.
              </p>
              <Button onClick={() => { onClose(); reset(); }} className="w-full font-bold rounded-xl"
                style={{ background: `linear-gradient(135deg, ${GOLD}, #f59e0b)`, color: DARK1 }}>
                Done
              </Button>
            </div>
          ) : (
            <div className="space-y-6">

              {/* Your Info */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: GOLD }}>Your Information</h4>
                <div className="space-y-3">
                  <input placeholder="Your Full Name *" value={form.referrerName} onChange={e => set('referrerName', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-white placeholder-slate-500 outline-none border border-white/10 focus:border-yellow-500 transition-colors text-sm"
                    style={{ background: 'rgba(255,255,255,0.06)' }} />
                  <div className="grid grid-cols-2 gap-3">
                    <input placeholder="Your Email *" type="email" value={form.referrerEmail} onChange={e => set('referrerEmail', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl text-white placeholder-slate-500 outline-none border border-white/10 focus:border-yellow-500 transition-colors text-sm"
                      style={{ background: 'rgba(255,255,255,0.06)' }} />
                    <input placeholder="Your Phone" type="tel" value={form.referrerPhone} onChange={e => set('referrerPhone', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl text-white placeholder-slate-500 outline-none border border-white/10 focus:border-yellow-500 transition-colors text-sm"
                      style={{ background: 'rgba(255,255,255,0.06)' }} />
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}30, transparent)` }} />

              {/* Referred Person Info */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: GOLD }}>Person You're Referring</h4>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input placeholder="First Name *" value={form.refFirstName} onChange={e => set('refFirstName', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl text-white placeholder-slate-500 outline-none border border-white/10 focus:border-yellow-500 transition-colors text-sm"
                      style={{ background: 'rgba(255,255,255,0.06)' }} />
                    <input placeholder="Last Name" value={form.refLastName} onChange={e => set('refLastName', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl text-white placeholder-slate-500 outline-none border border-white/10 focus:border-yellow-500 transition-colors text-sm"
                      style={{ background: 'rgba(255,255,255,0.06)' }} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input placeholder="Their Phone *" type="tel" value={form.refPhone} onChange={e => set('refPhone', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl text-white placeholder-slate-500 outline-none border border-white/10 focus:border-yellow-500 transition-colors text-sm"
                      style={{ background: 'rgba(255,255,255,0.06)' }} />
                    <input placeholder="Their Email (optional)" type="email" value={form.refEmail} onChange={e => set('refEmail', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl text-white placeholder-slate-500 outline-none border border-white/10 focus:border-yellow-500 transition-colors text-sm"
                      style={{ background: 'rgba(255,255,255,0.06)' }} />
                  </div>

                  {/* Coverage type */}
                  <div>
                    <p className="text-xs text-slate-500 mb-2">Coverage they need *</p>
                    <div className="flex flex-wrap gap-2">
                      {coverageTypes.map(opt => (
                        <button key={opt} onClick={() => set('refCoverageType', opt)}
                          className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
                          style={{
                            borderColor: form.refCoverageType === opt ? GOLD : 'rgba(255,255,255,0.15)',
                            background: form.refCoverageType === opt ? `${GOLD}20` : 'rgba(255,255,255,0.04)',
                            color: form.refCoverageType === opt ? GOLD : '#94a3b8'
                          }}>
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <textarea placeholder="Any additional notes (optional)" rows={2} value={form.notes} onChange={e => set('notes', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-white placeholder-slate-500 outline-none border border-white/10 focus:border-yellow-500 transition-colors text-sm resize-none"
                    style={{ background: 'rgba(255,255,255,0.06)' }} />
                </div>
              </div>

              {/* SMS Consent */}
              <div className="space-y-3 pt-2 border-t border-white/10">
                <div className="flex items-start gap-3">
                  <input type="checkbox" id="ref-trans-sms" checked={form.transactionalSmsConsent}
                    onChange={e => set('transactionalSmsConsent', e.target.checked)}
                    className="mt-0.5 flex-shrink-0 w-4 h-4 cursor-pointer" style={{ accentColor: GOLD }} />
                  <label htmlFor="ref-trans-sms" className="text-xs text-slate-400 leading-relaxed cursor-pointer">
                    By submitting, you authorize LIFEHEALTHINC LLC to text/call the number above for informational/transactional messages, possibly using automated means. Msg/data rates apply, msg frequency varies. Consent is not a condition of purchase. <a href="/terms" className="text-blue-400 underline">See terms</a>{' '}and{' '}<a href="/privacy" className="text-blue-400 underline">privacy policy</a>. Text HELP for help and STOP to unsubscribe.
                  </label>
                </div>
                <div className="flex items-start gap-3">
                  <input type="checkbox" id="ref-mkt-sms" checked={form.marketingSmsConsent}
                    onChange={e => set('marketingSmsConsent', e.target.checked)}
                    className="mt-0.5 flex-shrink-0 w-4 h-4 cursor-pointer" style={{ accentColor: GOLD }} />
                  <label htmlFor="ref-mkt-sms" className="text-xs text-slate-400 leading-relaxed cursor-pointer">
                    By submitting, you authorize LIFEHEALTHINC LLC to text/call the number above for promotional messages, possibly using automated means. Msg/data rates apply, msg frequency varies. Consent is not a condition of purchase. <a href="/terms" className="text-blue-400 underline">See terms</a>{' '}and{' '}<a href="/privacy" className="text-blue-400 underline">privacy policy</a>. Text HELP for help and STOP to unsubscribe.
                  </label>
                </div>
                <p className="text-xs text-slate-500 pl-1">SMS consent is not shared with third parties except as required to deliver messages (SMS providers).</p>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">By submitting, you confirm you have permission to share this person's contact information with a licensed insurance broker.</p>

              <Button onClick={handleSubmit} disabled={!canSubmit || loading} className="w-full font-bold rounded-xl py-6 text-base"
                style={{ background: canSubmit ? `linear-gradient(135deg, ${GOLD}, #f59e0b)` : 'rgba(255,255,255,0.1)', color: canSubmit ? DARK1 : '#64748b' }}>
                {loading ? 'Submitting…' : 'Submit Referral'} {!loading && <ChevronRight className="w-4 h-4 ml-1" />}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}