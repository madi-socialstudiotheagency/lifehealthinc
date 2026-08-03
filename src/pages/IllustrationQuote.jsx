import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { handleLeadSubmission, submitLeadToGHL } from "../components/lead-submission-handler";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ChevronRight, ChevronLeft, CheckCircle, Loader2,
  Shield, Heart, FileText, User, Activity, DollarSign
} from "lucide-react";

const STEPS = [
  { id: 1, label: "Product", icon: Shield },
  { id: 2, label: "Personal", icon: User },
  { id: 3, label: "Health", icon: Activity },
  { id: 4, label: "Policy", icon: DollarSign },
  { id: 5, label: "Contact", icon: FileText },
];

const PRODUCT_OPTIONS = [
  { value: "iul", label: "Indexed Universal Life (IUL)", desc: "Cash value growth tied to market index with downside protection" },
  { value: "term_life", label: "Term Life Insurance", desc: "Pure death benefit coverage for a fixed period" },
  { value: "whole_life", label: "Whole Life Insurance", desc: "Permanent coverage with guaranteed cash value growth" },
  { value: "final_expense", label: "Final Expense", desc: "Affordable coverage for end-of-life expenses" },
];

export default function IllustrationQuotePage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    // Step 1
    productType: "",
    coverageGoal: "",
    // Step 2
    firstName: "", lastName: "", dob: "", gender: "", state: "", tobacco: "",
    // Step 3
    heightFt: "", heightIn: "", weightLbs: "", healthRating: "", healthConditions: "",
    // Step 4
    faceAmount: "", monthlyPremium: "", yearsToFund: "", termLength: "",
    retirementAge: "", incomeGoalMonthly: "", fundingStrategy: "",
    // Step 5
    email: "", phone: "",
    transactionalSmsConsent: false,
    marketingSmsConsent: false,
    consent: false,
  });

  const set = (field, val) => {
    setForm(prev => ({ ...prev, [field]: val }));
    setErrors(prev => ({ ...prev, [field]: null }));
  };

  const validate = () => {
    const e = {};
    if (step === 1) {
      if (!form.productType) e.productType = "Please select a product";
    }
    if (step === 2) {
      if (!form.firstName.trim()) e.firstName = "Required";
      if (!form.lastName.trim()) e.lastName = "Required";
      if (!form.dob) e.dob = "Required";
      if (!form.gender) e.gender = "Required";
      if (!form.state.trim()) e.state = "Required";
      if (!form.tobacco) e.tobacco = "Required";
    }
    if (step === 3) {
      if (!form.heightFt) e.heightFt = "Required";
      if (!form.weightLbs) e.weightLbs = "Required";
      if (!form.healthRating) e.healthRating = "Required";
    }
    if (step === 4) {
      if (!form.faceAmount) e.faceAmount = "Required";
      if (!form.monthlyPremium) e.monthlyPremium = "Required";
      if (form.productType === "term_life" && !form.termLength) e.termLength = "Required";
      if (form.productType !== "term_life" && !form.yearsToFund) e.yearsToFund = "Required";
    }
    if (step === 5) {
      if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
      if (!form.phone.trim()) e.phone = "Required";
      if (!form.consent) e.consent = "You must agree to be contacted";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validate()) setStep(s => s + 1); };
  const back = () => setStep(s => s - 1);

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);

    const height = form.heightFt && form.heightIn
      ? `${form.heightFt}'${form.heightIn}"`
      : form.heightFt ? `${form.heightFt}'` : "";

    const notes = `CARRIER ILLUSTRATION QUOTE REQUEST
━━━━━━━━━━━━━━━━━━━━━━━━━━━
PRODUCT: ${form.productType?.toUpperCase()}
Coverage Goal: ${form.coverageGoal || "Not specified"}

PERSONAL:
Name: ${form.firstName} ${form.lastName}
DOB: ${form.dob} | Gender: ${form.gender}
State: ${form.state} | Tobacco: ${form.tobacco}

HEALTH:
Height: ${height} | Weight: ${form.weightLbs} lbs
Health Class: ${form.healthRating}
Conditions: ${form.healthConditions || "None disclosed"}

POLICY PARAMETERS:
Face Amount: $${Number(form.faceAmount).toLocaleString()}
Monthly Premium: $${Number(form.monthlyPremium).toLocaleString()}
${form.productType === "term_life" ? `Term Length: ${form.termLength} years` : `Years to Fund: ${form.yearsToFund}`}
${form.retirementAge ? `Target Retirement Age: ${form.retirementAge}` : ""}
${form.incomeGoalMonthly ? `Monthly Income Goal: $${Number(form.incomeGoalMonthly).toLocaleString()}` : ""}
${form.fundingStrategy ? `Funding Strategy: ${form.fundingStrategy}` : ""}

SMS Consents: Transactional=${form.transactionalSmsConsent}, Marketing=${form.marketingSmsConsent}`;

    try {
      const leadData = {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        dob: form.dob,
        state: form.state,
        type: "contactForm",
        productType: form.productType === "iul" ? "life_insurance" : form.productType,
        primaryInterest: `Carrier Illustration - ${PRODUCT_OPTIONS.find(p => p.value === form.productType)?.label}`,
        faceAmount: Number(form.faceAmount),
        consent: form.consent,
        consentText: "User requested a carrier illustration via the quote flow."
          + (form.transactionalSmsConsent ? " | Transactional SMS consent given." : "")
          + (form.marketingSmsConsent ? " | Marketing SMS consent given." : ""),
        consentAt: new Date().toISOString(),
        submissionDate: new Date().toISOString(),
        status: "new",
        notes,
      };
      const result = await handleLeadSubmission(leadData);
      submitLeadToGHL(leadData);
      const leadId = result?.lead?.id || "";
      navigate(createPageUrl("QuoteComplete") + `?leadId=${leadId}&productType=${leadData.productType}&firstName=${form.firstName}`);
    } catch (err) {
      console.error(err);
      setErrors({ submit: "Submission failed. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  const progress = ((step - 1) / (STEPS.length - 1)) * 100;

  return (
    <div className="min-h-screen py-10 px-4" style={{ background: "linear-gradient(135deg, #f5f7fa 0%, #f0f4f8 100%)" }}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1 mb-4" style={{ background: 'rgba(26,53,134,0.12)', border: '1px solid rgba(26,53,134,0.35)' }}>
            <FileText className="w-4 h-4" style={{ color: '#1A3586' }} />
            <span className="text-sm font-medium" style={{ color: '#1A3586' }}>Carrier Illustration Request</span>
          </div>
          <h1 className="text-3xl font-bold text-white">Get Your Official Illustration</h1>
          <p className="text-slate-300 mt-2">We'll run a compliant carrier illustration tailored to your exact parameters.</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            {STEPS.map((s) => {
              const Icon = s.icon;
              const active = step === s.id;
              const done = step > s.id;
              return (
              <div key={s.id} className="flex flex-col items-center gap-1">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all ${`
                    done ? "border-blue-700" : active ? "bg-transparent" : "bg-transparent border-slate-600"
                  }`} style={done ? { background: '#1A3586', borderColor: '#1A3586' } : active ? { borderColor: '#1A3586' } : {}}
                  }`}>
                    {done
                      ? <CheckCircle className="w-5 h-5 text-white" />
                      : <Icon className="w-4 h-4" style={{ color: active ? '#1A3586' : '#94a3b8' }} />
                    }
                  </div>
                  <span className={`text-xs hidden sm:block ${done ? 'text-slate-300' : 'text-slate-500'}`} style={active ? { color: '#1A3586', fontWeight: 600 } : {}}>{s.label}</span>
                </div>
              );
            })}
          </div>
          <div className="h-1.5 bg-slate-300 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-500" style={{ background: '#1A3586', width: `${progress}%` }} />
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {step === 1 && <Step1 form={form} set={set} errors={errors} />}
          {step === 2 && <Step2 form={form} set={set} errors={errors} />}
          {step === 3 && <Step3 form={form} set={set} errors={errors} />}
          {step === 4 && <Step4 form={form} set={set} errors={errors} />}
          {step === 5 && <Step5 form={form} set={set} errors={errors} />}

          {errors.submit && (
            <p className="text-sm text-red-600 mt-4 text-center">{errors.submit}</p>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-slate-100">
            {step > 1 ? (
              <button onClick={back} className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium transition-colors">
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
            ) : <div />}

            {step < STEPS.length ? (
              <button onClick={next} className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold transition-colors" style={{ background: 'linear-gradient(135deg, #1A3586, #3D6B9E)', color: '#FFFFFF' }}>
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={submitting} className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold disabled:opacity-60 transition-colors" style={{ background: 'linear-gradient(135deg, #1A3586, #3D6B9E)', color: '#FFFFFF' }}>
                {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</> : <><FileText className="w-4 h-4" /> Submit Request</>}
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-slate-400 text-xs mt-4">100% Free • No Obligation • Licensed Professionals</p>
      </div>
    </div>
  );
}

/* ── Step Components ── */

function Step1({ form, set, errors }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900 mb-1">What product are you looking for?</h2>
      <p className="text-slate-500 text-sm mb-6">Select the type of policy for your illustration.</p>
      <div className="space-y-3">
        {PRODUCT_OPTIONS.map(opt => (
          <button
            key={opt.value}
            type="button"
            onClick={() => set("productType", opt.value)}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
              form.productType === opt.value
                ? "border-blue-700 bg-blue-50"
                : "border-slate-200 hover:border-slate-300"
            }`}
          >
            <div className="font-semibold text-slate-900">{opt.label}</div>
            <div className="text-sm text-slate-500 mt-0.5">{opt.desc}</div>
          </button>
        ))}
      </div>
      {errors.productType && <p className="text-sm text-red-600 mt-2">{errors.productType}</p>}

      <div className="mt-5">
        <label className="block text-sm font-medium text-slate-700 mb-1">Coverage Goal (Optional)</label>
        <select value={form.coverageGoal} onChange={e => set("coverageGoal", e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900">
          <option value="">Select goal...</option>
          <option value="income_replacement">Income Replacement</option>
          <option value="mortgage_protection">Mortgage Protection</option>
          <option value="retirement_income">Supplemental Retirement Income</option>
          <option value="wealth_transfer">Wealth Transfer / Estate Planning</option>
          <option value="business_protection">Business Protection</option>
          <option value="final_expense">Final Expense</option>
        </select>
      </div>
    </div>
  );
}

function Step2({ form, set, errors }) {
  const US_STATES = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];
  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900 mb-1">Personal Information</h2>
      <p className="text-slate-500 text-sm mb-6">Required for accurate carrier underwriting.</p>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Field label="First Name *" error={errors.firstName}>
            <input value={form.firstName} onChange={e => set("firstName", e.target.value)} placeholder="John" className={input(errors.firstName)} />
          </Field>
          <Field label="Last Name *" error={errors.lastName}>
            <input value={form.lastName} onChange={e => set("lastName", e.target.value)} placeholder="Smith" className={input(errors.lastName)} />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Date of Birth *" error={errors.dob}>
            <input type="date" value={form.dob} onChange={e => set("dob", e.target.value)} max={new Date().toISOString().split("T")[0]} className={input(errors.dob)} />
          </Field>
          <Field label="Gender *" error={errors.gender}>
            <select value={form.gender} onChange={e => set("gender", e.target.value)} className={input(errors.gender)}>
              <option value="">Select...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="State *" error={errors.state}>
            <select value={form.state} onChange={e => set("state", e.target.value)} className={input(errors.state)}>
              <option value="">Select state...</option>
              {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </Field>
          <Field label="Tobacco Use (last 12 mo.) *" error={errors.tobacco}>
            <select value={form.tobacco} onChange={e => set("tobacco", e.target.value)} className={input(errors.tobacco)}>
              <option value="">Select...</option>
              <option value="never">Never</option>
              <option value="no_12mo">No – quit 12+ months ago</option>
              <option value="yes">Yes – current user</option>
            </select>
          </Field>
        </div>
      </div>
    </div>
  );
}

function Step3({ form, set, errors }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900 mb-1">Health & Build</h2>
      <p className="text-slate-500 text-sm mb-6">Helps determine realistic health classification for the illustration.</p>
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <Field label="Height (ft) *" error={errors.heightFt}>
            <select value={form.heightFt} onChange={e => set("heightFt", e.target.value)} className={input(errors.heightFt)}>
              <option value="">ft</option>
              {[4,5,6,7].map(f => <option key={f} value={f}>{f} ft</option>)}
            </select>
          </Field>
          <Field label="Height (in)">
            <select value={form.heightIn} onChange={e => set("heightIn", e.target.value)} className={input()}>
              <option value="">in</option>
              {[0,1,2,3,4,5,6,7,8,9,10,11].map(i => <option key={i} value={i}>{i} in</option>)}
            </select>
          </Field>
          <Field label="Weight (lbs) *" error={errors.weightLbs}>
            <input type="number" value={form.weightLbs} onChange={e => set("weightLbs", e.target.value)} placeholder="175" className={input(errors.weightLbs)} />
          </Field>
        </div>

        <Field label="Estimated Health Class *" error={errors.healthRating}>
          <div className="space-y-2 mt-1">
            {[
              { value: "preferred_plus", label: "Preferred Plus", desc: "Excellent health, ideal lab results, no family history concerns" },
              { value: "preferred", label: "Preferred", desc: "Very good health, minor issues only" },
              { value: "standard_plus", label: "Standard Plus", desc: "Good health, one or two minor conditions" },
              { value: "standard", label: "Standard", desc: "Average health, some conditions present" },
              { value: "substandard", label: "Substandard / Table Rate", desc: "Significant health conditions" },
            ].map(opt => (
              <label key={opt.value} className={`flex items-start gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${form.healthRating === opt.value ? 'border-blue-700 bg-blue-50' : 'border-slate-200'}`}>
                <input type="radio" name="healthRating" value={opt.value} checked={form.healthRating === opt.value} onChange={e => set("healthRating", e.target.value)} className="mt-0.5" />
                <div>
                  <div className="font-medium text-sm text-slate-900">{opt.label}</div>
                  <div className="text-xs text-slate-500">{opt.desc}</div>
                </div>
              </label>
            ))}
          </div>
          {errors.healthRating && <p className="text-sm text-red-600 mt-1">{errors.healthRating}</p>}
        </Field>

        <Field label="Major Health Conditions (Optional)">
          <textarea value={form.healthConditions} onChange={e => set("healthConditions", e.target.value)} rows={2} placeholder="E.g., diabetes, hypertension, heart condition..." className={input()} />
        </Field>
      </div>
    </div>
  );
}

function Step4({ form, set, errors }) {
  const isIUL = form.productType === "iul";
  const isTerm = form.productType === "term_life";

  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900 mb-1">Policy Parameters</h2>
      <p className="text-slate-500 text-sm mb-6">These will be used to run the carrier illustration.</p>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Face Amount ($) *" error={errors.faceAmount}>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
              <input type="number" value={form.faceAmount} onChange={e => set("faceAmount", e.target.value)} placeholder="500,000" className={input(errors.faceAmount) + " pl-7"} />
            </div>
          </Field>
          <Field label="Monthly Premium ($) *" error={errors.monthlyPremium}>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
              <input type="number" value={form.monthlyPremium} onChange={e => set("monthlyPremium", e.target.value)} placeholder="300" className={input(errors.monthlyPremium) + " pl-7"} />
            </div>
          </Field>
        </div>

        {isTerm && (
          <Field label="Term Length (years) *" error={errors.termLength}>
            <select value={form.termLength} onChange={e => set("termLength", e.target.value)} className={input(errors.termLength)}>
              <option value="">Select term...</option>
              {[10,15,20,25,30].map(t => <option key={t} value={t}>{t} Years</option>)}
            </select>
          </Field>
        )}

        {!isTerm && (
          <Field label="Years to Fund *" error={errors.yearsToFund}>
            <select value={form.yearsToFund} onChange={e => set("yearsToFund", e.target.value)} className={input(errors.yearsToFund)}>
              <option value="">Select...</option>
              {[5,7,10,15,20,25,30].map(y => <option key={y} value={y}>{y} Years</option>)}
            </select>
          </Field>
        )}

        {isIUL && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Target Retirement Age">
                <input type="number" value={form.retirementAge} onChange={e => set("retirementAge", e.target.value)} placeholder="65" min={50} max={80} className={input()} />
              </Field>
              <Field label="Monthly Income Goal ($)">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                  <input type="number" value={form.incomeGoalMonthly} onChange={e => set("incomeGoalMonthly", e.target.value)} placeholder="3,000" className={input() + " pl-7"} />
                </div>
              </Field>
            </div>
            <Field label="Funding Strategy">
              <select value={form.fundingStrategy} onChange={e => set("fundingStrategy", e.target.value)} className={input()}>
                <option value="">Select strategy...</option>
                <option value="max_funded">Max Funded IUL (maximize cash value)</option>
                <option value="minimum_premium">Minimum Premium (maximize death benefit)</option>
                <option value="balanced">Balanced (blend of both)</option>
              </select>
            </Field>
          </>
        )}
      </div>
    </div>
  );
}

function Step5({ form, set, errors }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900 mb-1">Contact Information</h2>
      <p className="text-slate-500 text-sm mb-6">We'll use this to send you the completed illustration.</p>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Email *" error={errors.email}>
            <input type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="john@example.com" className={input(errors.email)} />
          </Field>
          <Field label="Phone *" error={errors.phone}>
            <input type="tel" value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="(555) 123-4567" className={input(errors.phone)} />
          </Field>
        </div>

        <div className="space-y-3 pt-3 border-t border-slate-100">
          {/* Primary consent */}
          <div className="flex items-start gap-3">
            <Checkbox
              id="consent"
              checked={form.consent}
              onCheckedChange={v => set("consent", v)}
              className={errors.consent ? "border-red-500" : ""}
            />
            <label htmlFor="consent" className="text-xs text-slate-600 leading-relaxed cursor-pointer">
              I agree to be contacted by LifeHealthInc regarding my illustration request via phone and email. Consent is not a condition of service. See our{" "}
              <Link to={createPageUrl("Privacy")} className="underline text-blue-600">Privacy Policy</Link>
              {" "}and{" "}
              <Link to={createPageUrl("Terms")} className="underline text-blue-600">Terms &amp; Conditions</Link>. *
            </label>
          </div>
          {errors.consent && <p className="text-xs text-red-600 ml-7">{errors.consent}</p>}

          {/* Transactional SMS */}
          <div className="flex items-start gap-3">
            <Checkbox
              id="transactionalSms"
              checked={form.transactionalSmsConsent}
              onCheckedChange={v => set("transactionalSmsConsent", v)}
            />
            <label htmlFor="transactionalSms" className="text-xs text-slate-600 leading-relaxed cursor-pointer">
              I agree to receive <strong>transactional SMS messages</strong> from <strong>First Class</strong> at the phone number provided. These messages may include appointment reminders, account notifications, and service related updates. Message frequency may vary. Message and data rates may apply. Reply <strong>HELP</strong> for help or <strong>STOP</strong> to opt out.
            </label>
          </div>

          {/* Marketing SMS */}
          <div className="flex items-start gap-3">
            <Checkbox
              id="marketingSms"
              checked={form.marketingSmsConsent}
              onCheckedChange={v => set("marketingSmsConsent", v)}
            />
            <label htmlFor="marketingSms" className="text-xs text-slate-600 leading-relaxed cursor-pointer">
              I agree to receive <strong>marketing and promotional SMS messages</strong> from <strong>First Class</strong> at the phone number provided. These messages may include offers, follow ups, and promotional communications. Message frequency may vary. Message and data rates may apply. Reply <strong>HELP</strong> for help or <strong>STOP</strong> to opt out.{" "}
              <Link to={createPageUrl("Privacy")} className="underline text-blue-600">Privacy Policy</Link>,{" "}
              <Link to={createPageUrl("Terms")} className="underline text-blue-600">Terms & Conditions</Link>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Helpers ── */
function Field({ label, error, children }) {
  return (
    <div className="space-y-1">
      {label && <label className="block text-sm font-medium text-slate-700">{label}</label>}
      {children}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

function input(error) {
  return `w-full rounded-lg border ${error ? "border-red-400" : "border-slate-300"} px-3 py-2 text-slate-900 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white`;
}