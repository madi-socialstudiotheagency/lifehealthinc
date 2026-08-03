import { useState } from 'react';
import { Stethoscope, X, ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';

const GOLD = '#D4AF37';
const DARK1 = '#1C1B30';
const DARK2 = '#2C2B50';

export default function HealthQuoteWidget() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    coverage: '', age: '', tobacco: '', zip: '',
    firstName: '', email: '', phone: '',
    transactionalSmsConsent: false, marketingSmsConsent: false
  });

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleSubmit = async () => {
    setLoading(true);
    await base44.entities.Lead.create({
      firstName: form.firstName,
      email: form.email,
      phone: form.phone,
      age: parseInt(form.age) || undefined,
      state: form.zip,
      smoker: form.tobacco === 'Yes',
      productType: 'health_insurance',
      type: 'quote',
      primaryInterest: `Health Insurance – ${form.coverage}`,
      status: 'new',
      submissionDate: new Date().toISOString(),
    });
    setLoading(false);
    setSubmitted(true);
  };

  const coverageOptions = ['Just Me', 'Me + Spouse', 'Me + Child(ren)', 'Whole Family'];

  const canNext = () => {
    if (step === 0) return form.coverage && form.age;
    if (step === 1) return form.tobacco && form.zip;
    if (step === 2) return form.firstName && form.email && form.phone;
    return false;
  };

  const reset = () => { setStep(0); setSubmitted(false); setForm({ coverage: '', age: '', tobacco: '', zip: '', firstName: '', email: '', phone: '', transactionalSmsConsent: false, marketingSmsConsent: false }); };

  return (
    <>
      {/* Floating trigger button - bottom left */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full font-bold text-sm shadow-2xl transition-all hover:scale-105"
        style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', boxShadow: '0 4px 20px rgba(16,185,129,0.4)' }}
        aria-label="Get a Free Health Insurance Quote"
      >
        <Stethoscope className="w-4 h-4" />
        <span className="hidden sm:inline">Free Health Quote</span>
      </button>

      {/* Modal overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.75)' }}
          onClick={e => e.target === e.currentTarget && setOpen(false)}>
          <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-2xl" style={{ background: `linear-gradient(160deg, ${DARK1}, ${DARK2})`, border: `1px solid ${GOLD}30` }}>

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: `${GOLD}20` }}>
              <div className="flex items-center gap-2">
                <Stethoscope className="w-5 h-5" style={{ color: '#10b981' }} />
                <span className="font-black text-white">Free Health Insurance Quote</span>
              </div>
              <button onClick={() => { setOpen(false); reset(); }} className="text-slate-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-6 py-6">
              {submitted ? (
                <div className="text-center py-4">
                  <CheckCircle2 className="w-14 h-14 mx-auto mb-4" style={{ color: '#10b981' }} />
                  <h3 className="text-xl font-black text-white mb-2">You're All Set!</h3>
                  <p className="text-slate-400 text-sm mb-6">A licensed broker will reach out within 24 hours with your personalized health insurance options.</p>
                  <Button onClick={() => { setOpen(false); reset(); }} className="w-full font-bold rounded-xl" style={{ background: `linear-gradient(135deg, ${GOLD}, #f59e0b)`, color: DARK1 }}>
                    Close
                  </Button>
                </div>
              ) : (
                <>
                  {/* Progress dots */}
                  <div className="flex justify-center gap-2 mb-6">
                    {[0, 1, 2].map(i => (
                      <div key={i} className="h-2 rounded-full transition-all" style={{ width: i === step ? 24 : 8, background: i <= step ? '#10b981' : 'rgba(255,255,255,0.15)' }} />
                    ))}
                  </div>

                  {/* Step 0: Coverage + Age */}
                  {step === 0 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-black text-white mb-4">Who needs coverage?</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {coverageOptions.map(opt => (
                          <button key={opt} onClick={() => set('coverage', opt)}
                            className="py-3 px-3 rounded-xl text-sm font-semibold border-2 transition-all"
                            style={{ borderColor: form.coverage === opt ? '#10b981' : 'rgba(255,255,255,0.1)', background: form.coverage === opt ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.04)', color: form.coverage === opt ? '#10b981' : '#94a3b8' }}>
                            {opt}
                          </button>
                        ))}
                      </div>
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-widest mb-2 block" style={{ color: GOLD }}>Your Age</label>
                        <input type="number" min="18" max="99" placeholder="e.g. 35"
                          value={form.age} onChange={e => set('age', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl text-white placeholder-slate-500 outline-none border border-white/10 focus:border-emerald-500 transition-colors"
                          style={{ background: 'rgba(255,255,255,0.06)' }} />
                      </div>
                    </div>
                  )}

                  {/* Step 1: Tobacco + Zip */}
                  {step === 1 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-black text-white mb-4">A couple quick questions</h3>
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-widest mb-2 block" style={{ color: GOLD }}>Do you use tobacco?</label>
                        <div className="grid grid-cols-2 gap-2">
                          {['No', 'Yes'].map(opt => (
                            <button key={opt} onClick={() => set('tobacco', opt)}
                              className="py-3 rounded-xl text-sm font-semibold border-2 transition-all"
                              style={{ borderColor: form.tobacco === opt ? '#10b981' : 'rgba(255,255,255,0.1)', background: form.tobacco === opt ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.04)', color: form.tobacco === opt ? '#10b981' : '#94a3b8' }}>
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-widest mb-2 block" style={{ color: GOLD }}>ZIP Code</label>
                        <input type="text" maxLength="5" placeholder="e.g. 33954"
                          value={form.zip} onChange={e => set('zip', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl text-white placeholder-slate-500 outline-none border border-white/10 focus:border-emerald-500 transition-colors"
                          style={{ background: 'rgba(255,255,255,0.06)' }} />
                      </div>
                    </div>
                  )}

                  {/* Step 2: Contact Info */}
                  {step === 2 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-black text-white mb-4">Where should we send your options?</h3>
                      {[
                        { key: 'firstName', label: 'First Name', placeholder: 'Jane', type: 'text' },
                        { key: 'email', label: 'Email Address', placeholder: 'jane@example.com', type: 'email' },
                        { key: 'phone', label: 'Phone Number', placeholder: '(555) 000-0000', type: 'tel' },
                      ].map(({ key, label, placeholder, type }) => (
                        <div key={key}>
                          <label className="text-xs font-semibold uppercase tracking-widest mb-2 block" style={{ color: GOLD }}>{label}</label>
                          <input type={type} placeholder={placeholder}
                            value={form[key]} onChange={e => set(key, e.target.value)}
                            className="w-full px-4 py-3 rounded-xl text-white placeholder-slate-500 outline-none border border-white/10 focus:border-emerald-500 transition-colors"
                            style={{ background: 'rgba(255,255,255,0.06)' }} />
                        </div>
                      ))}

                      {/* SMS Consent */}
                      <div className="space-y-3 pt-2 border-t border-white/10">
                        <div className="flex items-start gap-3">
                          <input type="checkbox" id="hqw-trans-sms" checked={form.transactionalSmsConsent}
                            onChange={e => set('transactionalSmsConsent', e.target.checked)}
                            className="mt-0.5 flex-shrink-0 w-4 h-4 accent-emerald-500 cursor-pointer" />
                          <label htmlFor="hqw-trans-sms" className="text-xs text-slate-400 leading-relaxed cursor-pointer">
                            By submitting, you authorize LIFEHEALTHINC LLC to text/call the number above for informational/transactional messages, possibly using automated means. Msg/data rates apply, msg frequency varies. Consent is not a condition of purchase. <a href="/terms" className="text-blue-400 underline">See terms</a>{' '}and{' '}<a href="/privacy" className="text-blue-400 underline">privacy policy</a>. Text HELP for help and STOP to unsubscribe.
                          </label>
                        </div>
                        <div className="flex items-start gap-3">
                          <input type="checkbox" id="hqw-mkt-sms" checked={form.marketingSmsConsent}
                            onChange={e => set('marketingSmsConsent', e.target.checked)}
                            className="mt-0.5 flex-shrink-0 w-4 h-4 accent-emerald-500 cursor-pointer" />
                          <label htmlFor="hqw-mkt-sms" className="text-xs text-slate-400 leading-relaxed cursor-pointer">
                            By submitting, you authorize LIFEHEALTHINC LLC to text/call the number above for promotional messages, possibly using automated means. Msg/data rates apply, msg frequency varies. Consent is not a condition of purchase. <a href="/terms" className="text-blue-400 underline">See terms</a>{' '}and{' '}<a href="/privacy" className="text-blue-400 underline">privacy policy</a>. Text HELP for help and STOP to unsubscribe.
                          </label>
                        </div>
                        <p className="text-xs text-slate-500 pl-1">SMS consent is not shared with third parties except as required to deliver messages (SMS providers).</p>
                      </div>
                    </div>
                  )}

                  {/* Nav buttons */}
                  <div className="flex gap-3 mt-6">
                    {step > 0 && (
                      <Button variant="outline" onClick={() => setStep(s => s - 1)} className="flex-1 border-white/20 text-slate-300 hover:bg-white/10 rounded-xl">
                        <ChevronLeft className="w-4 h-4 mr-1" /> Back
                      </Button>
                    )}
                    {step < 2 ? (
                      <Button onClick={() => setStep(s => s + 1)} disabled={!canNext()} className="flex-1 font-bold rounded-xl"
                        style={{ background: canNext() ? 'linear-gradient(135deg, #10b981, #059669)' : 'rgba(255,255,255,0.1)', color: canNext() ? 'white' : '#64748b' }}>
                        Next <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    ) : (
                      <Button onClick={handleSubmit} disabled={!canNext() || loading} className="flex-1 font-bold rounded-xl"
                        style={{ background: canNext() ? 'linear-gradient(135deg, #10b981, #059669)' : 'rgba(255,255,255,0.1)', color: canNext() ? 'white' : '#64748b' }}>
                        {loading ? 'Submitting…' : 'Get My Options'}
                      </Button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}