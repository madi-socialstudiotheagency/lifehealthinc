import { useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, Lock, Phone, Zap } from 'lucide-react';
import { AUDIENCES, CONSENT_TEXT, INTAKE_FORMS, PRIVACY_TEXT, getForm } from '@/data/intakeForms';
import { makeReference, submitIntake } from '@/api/intakeClient';
import { ALL_CARRIERS, logoFor } from '@/data/carriers';
import TestimonialSlider from '@/components/TestimonialSlider';

const NAVY = '#081730';
const BLUE = '#1A3586';
const SKY = '#3D6B9E';

// Matthew's producer link into the carrier's own instant-quote and enrollment
// system (National General / NatGenHealth). No login required, so it is safe
// to link directly. Health applicants who use this go through the carrier's
// real underwriting and identity-verification flow, not a copy built here.
const NATGEN_QUICK_QUOTE_URL =
  'https://customer.enroll.natgenhealth.com/quick-quote/?agent=CfDJ8KcuJeU1UfVFhwatU8NLwQnUuAwHAxktLqVFMx2duuToSmFy7GJJVIWSMhIqXZeRKo50zQYSVjXubSDtZslsI0T3vQ&product=all-products';

// Matthew's InstaBrain page: instant-decision term life, policies issued by
// Fidelity Life. Public agent page, no login.
const INSTABRAIN_URL = 'https://matthewchristpheranderson.instabrain.io/';

const fieldClass =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500';

const visible = (field, answers) =>
  !field.showIf || answers[field.showIf.field] === field.showIf.equals;

// ── Hub: every form, grouped by who it is for ───────────────────────────────
function IntakeHub() {
  return (
    <div className="min-h-screen" style={{ background: `linear-gradient(180deg, ${NAVY} 0%, ${BLUE} 60%, ${SKY} 100%)` }}>
      <div className="max-w-5xl mx-auto px-4 py-16 text-white">
        <p className="text-xs font-bold uppercase tracking-widest text-blue-200 text-center mb-3">Get started</p>
        <h1 className="text-4xl md:text-5xl font-black text-center mb-4">Apply for coverage online</h1>
        <p className="text-center text-blue-100 max-w-2xl mx-auto mb-12">
          Answer the questions once. Matthew uses what you submit to prepare your application himself, so in most
          cases you never have to get on a call. He only reaches out if something is missing or when it is time to sign.
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-12">
          {[
            { href: '/health-quote', internal: true, title: 'Health insurance, instant quote', text: 'See live carrier rates and enroll online, right here.', cta: 'See health prices' },
            { href: INSTABRAIN_URL, title: 'Life insurance, instant decision', text: 'Term life with no medical exam, decision in minutes (Fidelity Life).', cta: 'Start life application' },
          ].map((c) => (
            <a
              key={c.href}
              href={c.href}
              target={c.internal ? undefined : '_blank'}
              rel={c.internal ? undefined : 'noopener noreferrer'}
              className="flex flex-col justify-between gap-4 rounded-2xl bg-white p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="rounded-full p-3 flex-shrink-0" style={{ background: `${BLUE}15` }}>
                  <Zap className="w-6 h-6" style={{ color: BLUE }} />
                </div>
                <div>
                  <h2 className="font-black text-slate-900 text-lg">{c.title}</h2>
                  <p className="text-sm text-slate-600">{c.text}</p>
                </div>
              </div>
              <span className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-bold text-white" style={{ background: BLUE }}>
                {c.cta} <ArrowRight className="w-4 h-4" />
              </span>
            </a>
          ))}
        </div>

        {AUDIENCES.map((aud) => {
          const forms = INTAKE_FORMS.filter((f) => f.audience === aud);
          if (!forms.length) return null;
          return (
            <section key={aud} className="mb-10">
              <h2 className="text-sm font-bold uppercase tracking-widest text-blue-200 mb-4">{aud}</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {forms.map((f) => (
                  <Link
                    key={f.id}
                    to={`/get-started/${f.id}`}
                    className="block rounded-xl border border-white/15 bg-white/5 p-5 hover:bg-white/10 transition-colors"
                  >
                    <h3 className="font-bold text-lg mb-1">{f.title}</h3>
                    <p className="text-sm text-blue-100">{f.blurb}</p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
        <p className="text-center text-sm text-blue-200 flex items-center justify-center gap-2 mt-8">
          <Phone className="w-4 h-4" /> Prefer to talk? Call <a className="underline" href="tel:9545430853">(954) 543-0853</a>
        </p>
      </div>

      <section className="py-16" style={{ background: 'linear-gradient(180deg,#1A3586 0%,#081730 100%)' }}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-black text-white text-center mb-2">What our clients say</h2>
          <p className="text-center text-blue-200 text-sm mb-8">Verified Google reviews</p>
          <TestimonialSlider />
        </div>
      </section>
    </div>
  );
}

function Field({ field, value, onChange, error }) {
  const id = `f-${field.name}`;
  const common = { id, name: field.name, className: fieldClass, 'aria-invalid': !!error };
  let control;
  if (field.type === 'select') {
    control = (
      <select {...common} value={value || ''} onChange={(e) => onChange(e.target.value)}>
        <option value="">Select…</option>
        {field.options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    );
  } else if (field.type === 'textarea') {
    control = <textarea {...common} rows={3} placeholder={field.placeholder} value={value || ''} onChange={(e) => onChange(e.target.value)} />;
  } else if (field.type === 'radio') {
    control = (
      <div className="flex flex-wrap gap-2">
        {field.options.map((o) => (
          <label key={o} className={`cursor-pointer rounded-lg border px-3 py-2 text-sm ${value === o ? 'border-blue-600 bg-blue-50 text-blue-900 font-semibold' : 'border-slate-300 bg-white text-slate-700'}`}>
            <input type="radio" className="sr-only" name={field.name} checked={value === o} onChange={() => onChange(o)} />
            {o}
          </label>
        ))}
      </div>
    );
  } else if (field.type === 'multi') {
    const set = new Set(value || []);
    control = (
      <div className="flex flex-wrap gap-2">
        {field.options.map((o) => (
          <label key={o} className={`cursor-pointer rounded-lg border px-3 py-2 text-sm ${set.has(o) ? 'border-blue-600 bg-blue-50 text-blue-900 font-semibold' : 'border-slate-300 bg-white text-slate-700'}`}>
            <input
              type="checkbox"
              className="sr-only"
              checked={set.has(o)}
              onChange={() => { const n = new Set(set); n.has(o) ? n.delete(o) : n.add(o); onChange([...n]); }}
            />
            {o}
          </label>
        ))}
      </div>
    );
  } else {
    control = (
      <input
        {...common}
        type={field.type}
        inputMode={field.type === 'tel' ? 'tel' : field.type === 'number' ? 'decimal' : undefined}
        autoComplete={field.type === 'email' ? 'email' : field.type === 'tel' ? 'tel' : undefined}
        placeholder={field.placeholder}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-slate-800 mb-1">
        {field.label}{field.required && <span className="text-red-600"> *</span>}
      </label>
      {control}
      {field.help && <p className="text-xs text-slate-500 mt-1">{field.help}</p>}
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}

function IntakeForm({ form }) {
  const [params] = useSearchParams();
  const carrier = (params.get('carrier') || '').slice(0, 80);
  const carrierInfo = ALL_CARRIERS.find((c) => (c.short || c.name) === carrier);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [consent, setConsent] = useState(false);
  const [privacyAck, setPrivacyAck] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ state: 'idle' });

  const total = form.sections.length;
  const section = form.sections[step];
  const isLast = step === total - 1;

  const set = (name, v) => {
    setAnswers((a) => ({ ...a, [name]: v }));
    setErrors((e) => (e[name] ? { ...e, [name]: undefined } : e));
  };

  const validate = () => {
    const errs = {};
    section.fields.forEach((f) => {
      if (!visible(f, answers) || !f.required) return;
      const v = answers[f.name];
      const empty = v === undefined || v === '' || (Array.isArray(v) && v.length === 0);
      if (empty) errs[f.name] = 'Required';
      else if (f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) errs[f.name] = 'Enter a valid email';
      else if (f.type === 'tel' && String(v).replace(/\D/g, '').length < 10) errs[f.name] = 'Enter a 10-digit phone number';
    });
    if (isLast && !consent) errs._consent = 'Please agree so we can contact you';
    if (isLast && !privacyAck) errs._privacy = 'Please confirm you have read how we protect your information';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = () => { if (validate()) { setStep((s) => s + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); } };
  const back = () => { setStep((s) => Math.max(0, s - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (honeypot) { setStatus({ state: 'done' }); return; } // bots get a silent success
    setStatus({ state: 'sending' });
    const reference = makeReference();
    const lines = [];
    form.sections.forEach((s) => {
      const part = s.fields
        .filter((f) => visible(f, answers) && answers[f.name] !== undefined && answers[f.name] !== '' && !(Array.isArray(answers[f.name]) && answers[f.name].length === 0))
        .map((f) => f.label + ': ' + (Array.isArray(answers[f.name]) ? answers[f.name].join(', ') : answers[f.name]));
      if (part.length) lines.push('== ' + s.title + ' ==', ...part, '');
    });
    const name = ((answers.firstName || '') + ' ' + (answers.lastName || '')).trim() || answers.companyName || '';
    const res = await submitIntake({
      reference,
      formId: form.id,
      formTitle: form.title,
      audience: form.audience,
      name: (name + (answers.companyName && name !== answers.companyName ? ' (' + answers.companyName + ')' : '')).trim(),
      email: answers.email || '',
      phone: answers.phone || '',
      state: answers.state || answers.hqState || '',
      contactPref: answers.contactPref || '',
      submittedAt: new Date().toISOString(),
      sourceUrl: window.location.href,
      consent: 'Agreed: ' + CONSENT_TEXT + ' | Privacy acknowledged: ' + PRIVACY_TEXT,
      'bot-field': honeypot,
      carrier: carrier || 'No preference',
      details: (carrier ? 'Preferred carrier: ' + carrier + '\n\n' : '') + lines.join('\n'),
    });
    setStatus(res.ok ? { state: 'done', reference: res.reference } : { state: 'error', message: res.message });
  };

  const pct = useMemo(() => Math.round(((step + 1) / total) * 100), [step, total]);

  if (status.state === 'done') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: `linear-gradient(180deg, ${NAVY}, ${BLUE})` }}>
        <div className="max-w-lg bg-white rounded-2xl p-8 text-center shadow-2xl">
          <CheckCircle2 className="w-14 h-14 text-green-600 mx-auto mb-4" />
          <h1 className="text-2xl font-black text-slate-900 mb-2">Got it — you're set</h1>
          <p className="text-slate-600 mb-4">
            Everything above is what Matthew needs. He is a licensed advisor and will start preparing your
            application from your answers himself. You do not need to call. If anything is missing, or when it is
            time to sign or verify identity with the carrier, he will reach out
            {answers.contactPref ? ` by ${answers.contactPref.toLowerCase()}` : ''}.
            Once the carrier makes a decision, you will get an email letting you know whether you were approved,
            along with your actual coverage amount and rate. Submitting this form is not a guarantee of coverage.
            Approval and pricing are set by the carrier after underwriting.
          </p>
          {status.reference && <p className="text-xs text-slate-500 mb-4">Reference: {status.reference}</p>}
          <Link to="/get-started" className="text-blue-700 font-semibold underline">Back to all forms</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4" style={{ background: `linear-gradient(180deg, ${NAVY} 0%, ${BLUE} 100%)` }}>
      <div className="max-w-2xl mx-auto">
        <Link to="/get-started" className="text-blue-200 text-sm inline-flex items-center gap-1 mb-4">
          <ChevronLeft className="w-4 h-4" /> All forms
        </Link>
        <h1 className="text-3xl font-black text-white mb-1">{form.title}</h1>
        <p className="text-blue-100 mb-4">{form.blurb}</p>
        {carrier && (
          <div className="flex items-center gap-3 rounded-xl bg-white/10 border border-white/20 px-4 py-3 mb-6">
            <span className="w-9 h-9 rounded-lg bg-white flex items-center justify-center flex-shrink-0 overflow-hidden">
              {carrierInfo && logoFor(carrierInfo.domain)
                ? <img src={logoFor(carrierInfo.domain)} alt="" className="w-6 h-6 object-contain" />
                : <span className="font-black" style={{ color: BLUE }}>{carrier[0]}</span>}
            </span>
            <p className="text-sm text-white">Applying with <strong>{carrier}</strong>. Matthew submits your application to the carrier for you.</p>
          </div>
        )}

        <div className="h-2 rounded-full bg-white/15 mb-2" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-2 rounded-full bg-white transition-all" style={{ width: `${pct}%` }} />
        </div>
        <p className="text-xs text-blue-200 mb-4">Step {step + 1} of {total}: {section.title}</p>

        <form onSubmit={isLast ? submit : (e) => { e.preventDefault(); next(); }} className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl space-y-5" noValidate>
          <h2 className="text-lg font-bold text-slate-900">{section.title}</h2>
          {/* Honeypot: hidden from people, filled by bots */}
          <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} style={{ position: 'absolute', left: '-9999px' }} />

          {section.fields.filter((f) => visible(f, answers)).map((f) => (
            <Field key={f.name} field={f} value={answers[f.name]} onChange={(v) => set(f.name, v)} error={errors[f.name]} />
          ))}

          {isLast && (
            <div className="rounded-lg bg-slate-50 border border-slate-200 p-4">
              <label className="flex gap-3 items-start cursor-pointer">
                <input type="checkbox" className="mt-1" checked={consent} onChange={(e) => { setConsent(e.target.checked); setErrors((x) => ({ ...x, _consent: undefined })); }} />
                <span className="text-xs text-slate-600 leading-relaxed">{CONSENT_TEXT}</span>
              </label>
              {errors._consent && <p className="text-xs text-red-600 mt-2">{errors._consent}</p>}
              <label className="flex gap-3 items-start cursor-pointer mt-3 pt-3 border-t border-slate-200">
                <input type="checkbox" className="mt-1" checked={privacyAck} onChange={(e) => { setPrivacyAck(e.target.checked); setErrors((x) => ({ ...x, _privacy: undefined })); }} />
                <span className="text-xs text-slate-600 leading-relaxed"><Lock className="inline w-3 h-3 mr-1" />{PRIVACY_TEXT}</span>
              </label>
              {errors._privacy && <p className="text-xs text-red-600 mt-2">{errors._privacy}</p>}
            </div>
          )}

          {status.state === 'error' && <p className="text-sm text-red-700 bg-red-50 rounded-lg p-3">{status.message}</p>}

          <div className="flex justify-between items-center pt-2">
            {step > 0 ? (
              <button type="button" onClick={back} className="text-slate-600 font-semibold inline-flex items-center gap-1"><ChevronLeft className="w-4 h-4" /> Back</button>
            ) : <span />}
            <button
              type="submit"
              disabled={status.state === 'sending'}
              className="rounded-lg px-6 py-3 font-bold text-white disabled:opacity-60 inline-flex items-center gap-1"
              style={{ background: BLUE }}
            >
              {isLast ? (status.state === 'sending' ? 'Sending…' : 'Submit my application') : (<>Continue <ChevronRight className="w-4 h-4" /></>)}
            </button>
          </div>

          <p className="text-xs text-slate-500 flex items-center gap-1 justify-center pt-1">
            <Lock className="w-3 h-3" /> Never enter your Social Security, bank or card number here.
          </p>
        </form>

        <p className="text-xs text-blue-200 text-center mt-4">
          LifeHealthInc is a licensed independent insurance brokerage. This form requests information only and does not bind coverage.
        </p>
      </div>
    </div>
  );
}

export default function Intake() {
  const { formId } = useParams();
  if (!formId) return <IntakeHub />;
  const form = getForm(formId);
  if (!form) return <IntakeHub />;
  return <IntakeForm key={form.id} form={form} />;
}
