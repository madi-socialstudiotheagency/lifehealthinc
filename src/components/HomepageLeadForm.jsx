import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Loader2, Phone, Mail, MapPin, Info, Shield, Heart, Home, HeartPulse, TrendingUp } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { handleLeadSubmission, submitLeadToGHL } from './lead-submission-handler';
import LiveQuoteEstimator from './LiveQuoteEstimator';

const GOLD = '#D4AF37';
const DARK = '#1C1B30';

export default function HomepageLeadForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Product selection
    productType: '',

    // Common fields
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    tobacco: false,
    familyHealthHistory: false,

    // Life Insurance / IUL fields
    monthlyIncome: '',
    monthlyContribution: '',
    coverageRequested: '',
    bestTimeToCall: '',
    whoCovered: [],
    startDate: '',
    idealRetirementAge: '',
    lifetimeIncomeInterest: '',
    maxFundedIUL: '',
    surrogateOwner: '',
    specificStrategy: '',
    legalHistory: [],
    healthConditions: '',

    // Term Life specific
    termLength: '',

    // Mortgage Protection specific
    mortgageBalance: '',
    mortgagePayment: '',
    homeValue: '',
    yearsLeftOnMortgage: '',

    // Health Insurance specific
    householdSize: '',
    currentlyInsured: '',
    employerCoverage: '',
    preExistingConditions: '',
    prescriptionMedications: '',

    // Medicare specific
    medicareEligible: '',
    currentMedicare: '',
    supplementOrAdvantage: '',
    prescriptionCoverage: '',

    // Annuities specific
    retirementAge: '',
    investmentAmount: '',
    incomeNeeds: '',
    riskTolerance: '',
    otherRetirementAccounts: '',

    // Dental specific
    dentalCoverageType: '',
    dentalNeedOrthodontics: '',
    dentalWaitingPeriod: '',

    // Vision specific
    visionCoverageType: '',
    visionNeedContacts: '',
    visionExamFrequency: '',

    consent: false,
    transactionalSmsConsent: false,
    marketingSmsConsent: false
  });

  const handleCheckboxChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.consent) {
      alert('Please agree to be contacted');
      return;
    }

    if (!formData.productType) {
      alert('Please select an insurance type');
      return;
    }

    setLoading(true);

    try {
      // Build notes based on product type
      let notes = `Best Time to Call: ${formData.bestTimeToCall}\n`;

      if (formData.productType === 'life_insurance') {
        notes += `\nLIFE INSURANCE DETAILS:
Monthly Income: $${formData.monthlyIncome}
Monthly Contribution: $${formData.monthlyContribution}
Coverage Requested: $${formData.coverageRequested}
Who to Cover: ${formData.whoCovered.join(', ')}
Desired Start Date: ${formData.startDate}
Gender: ${formData.gender === 'M' ? 'Male' : 'Female'}

HEALTH SCREENING:
Tobacco Use (5 years): ${formData.tobacco ? 'Yes' : 'No'}
Family Health History (cancer/heart/diabetes/mental health): ${formData.familyHealthHistory ? 'Yes' : 'No'}

IUL/STRATEGY DETAILS:
Ideal Retirement Age: ${formData.idealRetirementAge || 'Not specified'}
Lifetime Income Interest: ${formData.lifetimeIncomeInterest || 'Not specified'}
Max Funded IUL: ${formData.maxFundedIUL || 'Not specified'}
Surrogate Owner: ${formData.surrogateOwner || 'Not specified'}
Specific Strategy: ${formData.specificStrategy || 'None specified'}

LEGAL/HEALTH HISTORY:
Legal History: ${formData.legalHistory.length > 0 ? formData.legalHistory.join(', ') : 'None disclosed'}
Health Conditions: ${formData.healthConditions || 'None disclosed'}`;
      } else if (formData.productType === 'term_life') {
        notes += `\nTERM LIFE INSURANCE DETAILS:
Coverage Requested: $${formData.coverageRequested}
Term Length: ${formData.termLength?.replace('term', '') || 'Not specified'} years
Who to Cover: ${formData.whoCovered.join(', ')}
Monthly Budget: $${formData.monthlyContribution}
Gender: ${formData.gender === 'M' ? 'Male' : 'Female'}

HEALTH SCREENING:
Tobacco Use (5 years): ${formData.tobacco ? 'Yes' : 'No'}
Family Health History (cancer/heart/diabetes/mental health): ${formData.familyHealthHistory ? 'Yes' : 'No'}

LEGAL/HEALTH HISTORY:
Legal History: ${formData.legalHistory.length > 0 ? formData.legalHistory.join(', ') : 'None disclosed'}
Health Conditions: ${formData.healthConditions || 'None disclosed'}`;
      } else if (formData.productType === 'mortgage_protection') {
        notes += `\nMORTGAGE PROTECTION DETAILS:
Mortgage Balance: $${formData.mortgageBalance}
Monthly Mortgage Payment: $${formData.mortgagePayment}
Home Value: $${formData.homeValue}
Years Left on Mortgage: ${formData.yearsLeftOnMortgage}
Coverage Type: ${formData.coverageRequested}

HEALTH HISTORY:
Health Conditions: ${formData.healthConditions || 'None disclosed'}`;
      } else if (formData.productType === 'health_insurance') {
        notes += `\nHEALTH INSURANCE DETAILS:
Household Size: ${formData.householdSize}
Currently Insured: ${formData.currentlyInsured}
Employer Coverage: ${formData.employerCoverage}
Pre-existing Conditions: ${formData.preExistingConditions || 'None disclosed'}
Prescription Medications: ${formData.prescriptionMedications || 'None'}`;
      } else if (formData.productType === 'medicare') {
        notes += `\nMEDICARE DETAILS:
Medicare Eligible: ${formData.medicareEligible}
Current Medicare Parts: ${formData.currentMedicare}
Interested In: ${formData.supplementOrAdvantage}
Prescription Coverage Needed: ${formData.prescriptionCoverage}
Health Conditions: ${formData.healthConditions || 'None disclosed'}`;
      } else if (formData.productType === 'annuities') {
        notes += `\nANNUITY DETAILS:
Target Retirement Age: ${formData.retirementAge}
Investment Amount: $${formData.investmentAmount}
Monthly Income Needs: $${formData.incomeNeeds}
Risk Tolerance: ${formData.riskTolerance}
Other Retirement Accounts: ${formData.otherRetirementAccounts}`;
      } else if (formData.productType === 'dental') {
        notes += `\nDENTAL INSURANCE DETAILS:
Coverage Type: ${formData.dentalCoverageType}
Need Orthodontics: ${formData.dentalNeedOrthodontics}
Waiting Period Concern: ${formData.dentalWaitingPeriod}
Monthly Budget: $${formData.monthlyContribution || 'Not specified'}
Household Size: ${formData.householdSize || 'Not specified'}`;
      } else if (formData.productType === 'vision') {
        notes += `\nVISION INSURANCE DETAILS:
Coverage Type: ${formData.visionCoverageType}
Need Contacts/Glasses: ${formData.visionNeedContacts}
Exam Frequency: ${formData.visionExamFrequency}
Monthly Budget: $${formData.monthlyContribution || 'Not specified'}
Household Size: ${formData.householdSize || 'Not specified'}`;
      }

      // Prepare lead data for unified handler
      const leadData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        dob: formData.dob,
        type: 'homepage_widget',
        productType: formData.productType,
        submissionDate: new Date().toISOString(),
        status: 'new',
        consent: formData.consent,
        consentText: 'I agree to be contacted by LifeHealthInc by phone and email regarding insurance options. Consent is not a condition of purchase.'
          + (formData.transactionalSmsConsent ? ' | Transactional SMS: appointment reminders, account notifications, service updates.' : '')
          + (formData.marketingSmsConsent ? ' | Marketing SMS: offers, follow-ups, promotional communications.' : ''),
        transactionalSmsConsent: formData.transactionalSmsConsent,
        marketingSmsConsent: formData.marketingSmsConsent,
        consentAt: new Date().toISOString(),
        notes: notes
      };

      // Use unified submission handler (saves to Base44 + syncs to GHL)
      const result = await handleLeadSubmission(leadData);

      // Also send direct webhook as backup
      submitLeadToGHL(leadData);

      // Redirect to quote completion page with lead info
      const leadId = result?.lead?.id || '';
      navigate(createPageUrl("QuoteComplete") + `?leadId=${leadId}&productType=${formData.productType}&firstName=${formData.firstName}`);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your information. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const productIcons = {
    life_insurance: Heart,
    term_life: Shield,
    mortgage_protection: Home,
    health_insurance: HeartPulse,
    medicare: HeartPulse,
    annuities: TrendingUp,
    dental: Heart, // Reusing Heart icon for Dental
    vision: Heart // Reusing Heart icon for Vision
  };

  const ProductIcon = formData.productType ? productIcons[formData.productType] : Shield;

  const productOptions = [
    { value: 'life_insurance', label: 'Life Insurance (IUL)', icon: Heart, desc: 'Permanent coverage + cash value growth' },
    { value: 'term_life', label: 'Term Life Insurance', icon: Shield, desc: 'Affordable protection for a set term' },
    { value: 'mortgage_protection', label: 'Mortgage Protection', icon: Home, desc: 'Keep your family in their home' },
    { value: 'health_insurance', label: 'Health Insurance', icon: HeartPulse, desc: 'ACA, short-term & private plans' },
    { value: 'medicare', label: 'Medicare', icon: HeartPulse, desc: 'Supplement, Advantage & Part D' },
    { value: 'annuities', label: 'Annuities', icon: TrendingUp, desc: 'Guaranteed retirement income' },
    { value: 'dental', label: 'Dental Insurance', icon: Heart, desc: 'Preventive & major dental care' },
    { value: 'vision', label: 'Vision Insurance', icon: Heart, desc: 'Eye exams, glasses & contacts' },
  ];

  return (
    <div className="space-y-6">
      {/* Form + optional quote estimator */}
      <div className="grid lg:grid-cols-[1fr_auto] gap-8 max-w-6xl mx-auto items-start">
        {/* Main Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full border-t-4 border-blue-700">

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-6">
          {[1, 2].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${formData.productType && s === 2 ? 'bg-blue-700 text-white' : s === 1 ? 'bg-blue-700 text-white' : 'bg-slate-200 text-slate-500'}`}>
                {s}
              </div>
              {s < 2 && <div className={`h-px flex-1 w-8 transition-all ${formData.productType ? 'bg-blue-700' : 'bg-slate-200'}`} />}
            </div>
          ))}
          <span className="ml-2 text-sm text-slate-500 font-medium">
            {formData.productType ? 'Step 2: Your Details' : 'Step 1: Select Coverage'}
          </span>
        </div>

        {/* Step 1: Product selection cards */}
        {!formData.productType ? (
          <div>
            <h3 className="text-xl font-bold mb-1" style={{ color: '#1C1B30' }}>What type of coverage are you looking for?</h3>
            <p className="text-slate-500 text-sm mb-5">Select one to get started — takes less than 2 minutes.</p>
            <div className="grid grid-cols-2 gap-3">
              {productOptions.map(({ value, label, icon: Icon, desc }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setFormData({ ...formData, productType: value })}
                  className="text-left p-4 rounded-xl border-2 border-slate-200 hover:border-blue-600 hover:bg-blue-50 transition-all group"
                >
                  <Icon className="w-6 h-6 mb-2 text-blue-600" />
                  <p className="font-semibold text-sm text-slate-800 leading-tight">{label}</p>
                  <p className="text-xs text-slate-500 mt-1 leading-tight">{desc}</p>
                </button>
              ))}
            </div>
          </div>
        ) : (
        <>
        {/* Step 2 header with back button */}
        <div className="flex items-center gap-3 mb-5">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, productType: '' })}
            className="text-sm text-blue-600 hover:underline flex items-center gap-1"
          >
            ← Back
          </button>
          <div className="flex items-center gap-2">
            <ProductIcon className="w-5 h-5" style={{ color: '#D4AF37' }} />
            <span className="font-bold text-slate-800">{productOptions.find(p => p.value === formData.productType)?.label}</span>
          </div>
        </div>
        </>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {formData.productType && (
            <>
              {/* Common Fields - Always Show */}
              <div className="pt-4 border-t border-slate-200">
                <h4 className="font-semibold text-lg mb-3" style={{ color: '#1C1B30' }}>
                  Your Information
                </h4>
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Smith"
                  />
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(555) 123-4567"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth *</Label>
                <Input
                  id="dob"
                  type="date"
                  required
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>

              {/* Gender Selection */}
              <div className="space-y-2">
                <Label>Gender *</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, gender: 'M' })}
                    className="py-3 px-4 rounded-lg border-2 font-semibold transition-all"
                    style={formData.gender === 'M' 
                      ? { borderColor: GOLD, background: `${GOLD}15`, color: DARK } 
                      : { borderColor: '#e2e8f0', background: 'white', color: '#64748b' }}>
                    Male
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, gender: 'F' })}
                    className="py-3 px-4 rounded-lg border-2 font-semibold transition-all"
                    style={formData.gender === 'F' 
                      ? { borderColor: GOLD, background: `${GOLD}15`, color: DARK } 
                      : { borderColor: '#e2e8f0', background: 'white', color: '#64748b' }}>
                    Female
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bestTimeToCall">Best Time to Call *</Label>
                <Select value={formData.bestTimeToCall} onValueChange={(value) => setFormData({ ...formData, bestTimeToCall: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select best time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (12 PM - 5 PM)</SelectItem>
                    <SelectItem value="evening">Evening (5 PM - 8 PM)</SelectItem>
                    <SelectItem value="anytime">Anytime</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* ── Life Insurance (IUL) — 5 questions ── */}
              {formData.productType === 'life_insurance' && (
                <div className="space-y-4 pt-4 border-t border-slate-200">
                  <h4 className="font-semibold text-base text-slate-700">A few quick questions</h4>
                  <div className="space-y-2">
                    <Label>Coverage amount needed *</Label>
                    <Select value={String(formData.coverageRequested)} onValueChange={v => setFormData({ ...formData, coverageRequested: v })}>
                      <SelectTrigger><SelectValue placeholder="Select amount" /></SelectTrigger>
                      <SelectContent>
                        {['250000','500000','750000','1000000','1500000','2000000'].map(v => (
                          <SelectItem key={v} value={v}>${Number(v).toLocaleString()}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Monthly budget *</Label>
                    <Select value={formData.monthlyContribution} onValueChange={v => setFormData({ ...formData, monthlyContribution: v })}>
                      <SelectTrigger><SelectValue placeholder="Select budget" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under100">Under $100/mo</SelectItem>
                        <SelectItem value="100-200">$100–$200/mo</SelectItem>
                        <SelectItem value="200-400">$200–$400/mo</SelectItem>
                        <SelectItem value="400+">$400+/mo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Primary goal *</Label>
                    <Select value={formData.lifetimeIncomeInterest} onValueChange={v => setFormData({ ...formData, lifetimeIncomeInterest: v })}>
                      <SelectTrigger><SelectValue placeholder="Select goal" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="death_benefit">Income protection / death benefit</SelectItem>
                        <SelectItem value="yes">Tax-free retirement income</SelectItem>
                        <SelectItem value="cash_value">Cash value growth</SelectItem>
                        <SelectItem value="unsure">Not sure yet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Tobacco use in last 2 years? *</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {[['Yes', true], ['No', false]].map(([label, val]) => (
                        <button key={String(val)} type="button" onClick={() => setFormData({ ...formData, tobacco: val })}
                          className="py-3 rounded-lg border-2 font-semibold transition-all text-sm"
                          style={formData.tobacco === val ? { borderColor: GOLD, background: `${GOLD}15`, color: DARK } : { borderColor: '#e2e8f0', background: 'white', color: '#64748b' }}>
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Any major health conditions? *</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {[['Yes', true], ['No', false]].map(([label, val]) => (
                        <button key={String(val)} type="button" onClick={() => setFormData({ ...formData, familyHealthHistory: val })}
                          className="py-3 rounded-lg border-2 font-semibold transition-all text-sm"
                          style={formData.familyHealthHistory === val ? { borderColor: GOLD, background: `${GOLD}15`, color: DARK } : { borderColor: '#e2e8f0', background: 'white', color: '#64748b' }}>
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── Term Life — 5 questions ── */}
              {formData.productType === 'term_life' && (
                <div className="space-y-4 pt-4 border-t border-slate-200">
                  <h4 className="font-semibold text-base text-slate-700">A few quick questions</h4>
                  <div className="space-y-2">
                    <Label>Coverage amount *</Label>
                    <Select value={String(formData.coverageRequested)} onValueChange={v => setFormData({ ...formData, coverageRequested: v })}>
                      <SelectTrigger><SelectValue placeholder="Select amount" /></SelectTrigger>
                      <SelectContent>
                        {['100000','250000','500000','750000','1000000','1500000','2000000'].map(v => (
                          <SelectItem key={v} value={v}>${Number(v).toLocaleString()}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Term length *</Label>
                    <Select value={formData.termLength} onValueChange={v => setFormData({ ...formData, termLength: v })}>
                      <SelectTrigger><SelectValue placeholder="Select term" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="term10">10 Years</SelectItem>
                        <SelectItem value="term15">15 Years</SelectItem>
                        <SelectItem value="term20">20 Years</SelectItem>
                        <SelectItem value="term25">25 Years</SelectItem>
                        <SelectItem value="term30">30 Years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Who needs coverage? *</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {[['Just me', 'self'], ['Me + spouse', 'spouse'], ['Me + kids', 'children'], ['Whole family', 'family']].map(([label, val]) => (
                        <button key={val} type="button"
                          onClick={() => setFormData({ ...formData, whoCovered: [val] })}
                          className="py-2 px-3 rounded-lg border-2 font-medium text-sm transition-all"
                          style={formData.whoCovered.includes(val) ? { borderColor: GOLD, background: `${GOLD}15`, color: DARK } : { borderColor: '#e2e8f0', background: 'white', color: '#64748b' }}>
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Tobacco use in last 2 years? *</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {[['Yes', true], ['No', false]].map(([label, val]) => (
                        <button key={String(val)} type="button" onClick={() => setFormData({ ...formData, tobacco: val })}
                          className="py-3 rounded-lg border-2 font-semibold transition-all text-sm"
                          style={formData.tobacco === val ? { borderColor: GOLD, background: `${GOLD}15`, color: DARK } : { borderColor: '#e2e8f0', background: 'white', color: '#64748b' }}>
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Any major health conditions? *</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {[['Yes', true], ['No', false]].map(([label, val]) => (
                        <button key={String(val)} type="button" onClick={() => setFormData({ ...formData, familyHealthHistory: val })}
                          className="py-3 rounded-lg border-2 font-semibold transition-all text-sm"
                          style={formData.familyHealthHistory === val ? { borderColor: GOLD, background: `${GOLD}15`, color: DARK } : { borderColor: '#e2e8f0', background: 'white', color: '#64748b' }}>
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── Mortgage Protection — 5 questions ── */}
              {formData.productType === 'mortgage_protection' && (
                <div className="space-y-4 pt-4 border-t border-slate-200">
                  <h4 className="font-semibold text-base text-slate-700">A few quick questions</h4>
                  <div className="space-y-2">
                    <Label>Mortgage balance *</Label>
                    <Select value={formData.mortgageBalance} onValueChange={v => setFormData({ ...formData, mortgageBalance: v })}>
                      <SelectTrigger><SelectValue placeholder="Select range" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under150k">Under $150,000</SelectItem>
                        <SelectItem value="150-300k">$150,000 – $300,000</SelectItem>
                        <SelectItem value="300-500k">$300,000 – $500,000</SelectItem>
                        <SelectItem value="500k+">Over $500,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Monthly mortgage payment *</Label>
                    <Select value={formData.mortgagePayment} onValueChange={v => setFormData({ ...formData, mortgagePayment: v })}>
                      <SelectTrigger><SelectValue placeholder="Select range" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under1000">Under $1,000</SelectItem>
                        <SelectItem value="1000-2000">$1,000 – $2,000</SelectItem>
                        <SelectItem value="2000-3500">$2,000 – $3,500</SelectItem>
                        <SelectItem value="3500+">Over $3,500</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Years left on mortgage *</Label>
                    <Select value={formData.yearsLeftOnMortgage} onValueChange={v => setFormData({ ...formData, yearsLeftOnMortgage: v })}>
                      <SelectTrigger><SelectValue placeholder="Select range" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under10">Under 10 years</SelectItem>
                        <SelectItem value="10-20">10 – 20 years</SelectItem>
                        <SelectItem value="20-30">20 – 30 years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Coverage goal *</Label>
                    <Select value={formData.coverageRequested} onValueChange={v => setFormData({ ...formData, coverageRequested: v })}>
                      <SelectTrigger><SelectValue placeholder="Select goal" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="payment_protection">Cover monthly payments</SelectItem>
                        <SelectItem value="balance_protection">Pay off full balance</SelectItem>
                        <SelectItem value="both">Both</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Any major health conditions? *</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {[['Yes', true], ['No', false]].map(([label, val]) => (
                        <button key={String(val)} type="button" onClick={() => setFormData({ ...formData, familyHealthHistory: val })}
                          className="py-3 rounded-lg border-2 font-semibold transition-all text-sm"
                          style={formData.familyHealthHistory === val ? { borderColor: GOLD, background: `${GOLD}15`, color: DARK } : { borderColor: '#e2e8f0', background: 'white', color: '#64748b' }}>
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── Health Insurance — 5 questions ── */}
              {formData.productType === 'health_insurance' && (
                <div className="space-y-4 pt-4 border-t border-slate-200">
                  <h4 className="font-semibold text-base text-slate-700">A few quick questions</h4>
                  <div className="space-y-2">
                    <Label>Who needs coverage? *</Label>
                    <Select value={formData.householdSize} onValueChange={v => setFormData({ ...formData, householdSize: v })}>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Just me</SelectItem>
                        <SelectItem value="2">Me + spouse/partner</SelectItem>
                        <SelectItem value="3">Me + children</SelectItem>
                        <SelectItem value="4+">Whole family</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Current insurance status *</Label>
                    <Select value={formData.currentlyInsured} onValueChange={v => setFormData({ ...formData, currentlyInsured: v })}>
                      <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no">Uninsured — need coverage</SelectItem>
                        <SelectItem value="losing">Losing coverage soon</SelectItem>
                        <SelectItem value="yes">Have coverage, want better options</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Employer coverage available? *</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {[['Yes', 'yes_affordable'], ['No', 'no']].map(([label, val]) => (
                        <button key={val} type="button" onClick={() => setFormData({ ...formData, employerCoverage: val })}
                          className="py-3 rounded-lg border-2 font-semibold transition-all text-sm"
                          style={formData.employerCoverage === val ? { borderColor: GOLD, background: `${GOLD}15`, color: DARK } : { borderColor: '#e2e8f0', background: 'white', color: '#64748b' }}>
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Monthly budget *</Label>
                    <Select value={formData.monthlyContribution} onValueChange={v => setFormData({ ...formData, monthlyContribution: v })}>
                      <SelectTrigger><SelectValue placeholder="Select budget" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under200">Under $200/mo</SelectItem>
                        <SelectItem value="200-400">$200–$400/mo</SelectItem>
                        <SelectItem value="400-600">$400–$600/mo</SelectItem>
                        <SelectItem value="600+">$600+/mo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Any pre-existing conditions? *</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {[['Yes', 'yes'], ['No', 'no']].map(([label, val]) => (
                        <button key={val} type="button" onClick={() => setFormData({ ...formData, preExistingConditions: val })}
                          className="py-3 rounded-lg border-2 font-semibold transition-all text-sm"
                          style={formData.preExistingConditions === val ? { borderColor: GOLD, background: `${GOLD}15`, color: DARK } : { borderColor: '#e2e8f0', background: 'white', color: '#64748b' }}>
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── Medicare — 5 questions ── */}
              {formData.productType === 'medicare' && (
                <div className="space-y-4 pt-4 border-t border-slate-200">
                  <h4 className="font-semibold text-base text-slate-700">A few quick questions</h4>
                  <div className="space-y-2">
                    <Label>Medicare eligibility *</Label>
                    <Select value={formData.medicareEligible} onValueChange={v => setFormData({ ...formData, medicareEligible: v })}>
                      <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="eligible_now">Eligible now (65+ or disabled)</SelectItem>
                        <SelectItem value="turning_65">Turning 65 within 6 months</SelectItem>
                        <SelectItem value="not_yet">Not yet eligible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Current Medicare coverage *</Label>
                    <Select value={formData.currentMedicare} onValueChange={v => setFormData({ ...formData, currentMedicare: v })}>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None yet</SelectItem>
                        <SelectItem value="parts_a_b">Part A & B only</SelectItem>
                        <SelectItem value="advantage">Medicare Advantage</SelectItem>
                        <SelectItem value="with_supplement">Part A, B + Supplement</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Interested in *</Label>
                    <Select value={formData.supplementOrAdvantage} onValueChange={v => setFormData({ ...formData, supplementOrAdvantage: v })}>
                      <SelectTrigger><SelectValue placeholder="Select preference" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="supplement">Medicare Supplement (Medigap)</SelectItem>
                        <SelectItem value="advantage">Medicare Advantage</SelectItem>
                        <SelectItem value="unsure">Not sure — need guidance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Need prescription drug coverage? *</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {[['Yes', 'yes'], ['No / Have it', 'have']].map(([label, val]) => (
                        <button key={val} type="button" onClick={() => setFormData({ ...formData, prescriptionCoverage: val })}
                          className="py-3 rounded-lg border-2 font-semibold transition-all text-sm"
                          style={formData.prescriptionCoverage === val ? { borderColor: GOLD, background: `${GOLD}15`, color: DARK } : { borderColor: '#e2e8f0', background: 'white', color: '#64748b' }}>
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Monthly budget for premiums *</Label>
                    <Select value={formData.monthlyContribution} onValueChange={v => setFormData({ ...formData, monthlyContribution: v })}>
                      <SelectTrigger><SelectValue placeholder="Select budget" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under100">Under $100/mo</SelectItem>
                        <SelectItem value="100-200">$100–$200/mo</SelectItem>
                        <SelectItem value="200+">$200+/mo</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* ── Annuities — 5 questions ── */}
              {formData.productType === 'annuities' && (
                <div className="space-y-4 pt-4 border-t border-slate-200">
                  <h4 className="font-semibold text-base text-slate-700">A few quick questions</h4>
                  <div className="space-y-2">
                    <Label>Amount to invest *</Label>
                    <Select value={formData.investmentAmount} onValueChange={v => setFormData({ ...formData, investmentAmount: v })}>
                      <SelectTrigger><SelectValue placeholder="Select range" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under50k">Under $50,000</SelectItem>
                        <SelectItem value="50-150k">$50,000 – $150,000</SelectItem>
                        <SelectItem value="150-500k">$150,000 – $500,000</SelectItem>
                        <SelectItem value="500k+">Over $500,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Retirement timeframe *</Label>
                    <Select value={formData.retirementAge} onValueChange={v => setFormData({ ...formData, retirementAge: v })}>
                      <SelectTrigger><SelectValue placeholder="Select timeframe" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="already">Already retired</SelectItem>
                        <SelectItem value="1-5">1–5 years away</SelectItem>
                        <SelectItem value="5-10">5–10 years away</SelectItem>
                        <SelectItem value="10+">10+ years away</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Primary goal *</Label>
                    <Select value={formData.riskTolerance} onValueChange={v => setFormData({ ...formData, riskTolerance: v })}>
                      <SelectTrigger><SelectValue placeholder="Select goal" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="conservative">Guaranteed lifetime income</SelectItem>
                        <SelectItem value="moderate">Growth with downside protection</SelectItem>
                        <SelectItem value="aggressive">Maximum growth potential</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Monthly income needed in retirement *</Label>
                    <Select value={formData.incomeNeeds} onValueChange={v => setFormData({ ...formData, incomeNeeds: v })}>
                      <SelectTrigger><SelectValue placeholder="Select range" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under2k">Under $2,000/mo</SelectItem>
                        <SelectItem value="2-4k">$2,000 – $4,000/mo</SelectItem>
                        <SelectItem value="4-7k">$4,000 – $7,000/mo</SelectItem>
                        <SelectItem value="7k+">Over $7,000/mo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Other retirement accounts? *</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {[['401k / IRA', '401k'], ['Pension', 'pension'], ['Social Security', 'social_security'], ['None', 'none']].map(([label, val]) => (
                        <button key={val} type="button"
                          onClick={() => setFormData({ ...formData, otherRetirementAccounts: val })}
                          className="py-2 px-3 rounded-lg border-2 font-medium text-sm transition-all"
                          style={formData.otherRetirementAccounts === val ? { borderColor: GOLD, background: `${GOLD}15`, color: DARK } : { borderColor: '#e2e8f0', background: 'white', color: '#64748b' }}>
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── Dental — 5 questions ── */}
              {formData.productType === 'dental' && (
                <div className="space-y-4 pt-4 border-t border-slate-200">
                  <h4 className="font-semibold text-base text-slate-700">A few quick questions</h4>
                  <div className="space-y-2">
                    <Label>Who needs coverage? *</Label>
                    <Select value={formData.dentalCoverageType} onValueChange={v => setFormData({ ...formData, dentalCoverageType: v })}>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="individual">Just me</SelectItem>
                        <SelectItem value="couple">Me + partner</SelectItem>
                        <SelectItem value="family">Family</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Need orthodontics? *</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {[['Yes', 'yes'], ['Kids only', 'children_only'], ['No', 'no']].map(([label, val]) => (
                        <button key={val} type="button" onClick={() => setFormData({ ...formData, dentalNeedOrthodontics: val })}
                          className="py-2 rounded-lg border-2 font-medium text-sm transition-all"
                          style={formData.dentalNeedOrthodontics === val ? { borderColor: GOLD, background: `${GOLD}15`, color: DARK } : { borderColor: '#e2e8f0', background: 'white', color: '#64748b' }}>
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>How soon do you need coverage? *</Label>
                    <Select value={formData.dentalWaitingPeriod} onValueChange={v => setFormData({ ...formData, dentalWaitingPeriod: v })}>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate_need">Right away</SelectItem>
                        <SelectItem value="routine">Within a few months</SelectItem>
                        <SelectItem value="flexible">No rush</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Monthly budget *</Label>
                    <Select value={formData.monthlyContribution} onValueChange={v => setFormData({ ...formData, monthlyContribution: v })}>
                      <SelectTrigger><SelectValue placeholder="Select budget" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under30">Under $30/mo</SelectItem>
                        <SelectItem value="30-60">$30–$60/mo</SelectItem>
                        <SelectItem value="60-100">$60–$100/mo</SelectItem>
                        <SelectItem value="100+">$100+/mo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Household size *</Label>
                    <Select value={formData.householdSize} onValueChange={v => setFormData({ ...formData, householdSize: v })}>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 person</SelectItem>
                        <SelectItem value="2">2 people</SelectItem>
                        <SelectItem value="3">3 people</SelectItem>
                        <SelectItem value="4+">4+ people</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* ── Vision — 5 questions ── */}
              {formData.productType === 'vision' && (
                <div className="space-y-4 pt-4 border-t border-slate-200">
                  <h4 className="font-semibold text-base text-slate-700">A few quick questions</h4>
                  <div className="space-y-2">
                    <Label>Who needs coverage? *</Label>
                    <Select value={formData.visionCoverageType} onValueChange={v => setFormData({ ...formData, visionCoverageType: v })}>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="individual">Just me</SelectItem>
                        <SelectItem value="couple">Me + partner</SelectItem>
                        <SelectItem value="family">Family</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>What do you need? *</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {[['Glasses', 'glasses'], ['Contacts', 'contacts'], ['Both', 'both'], ['Exams only', 'exams']].map(([label, val]) => (
                        <button key={val} type="button" onClick={() => setFormData({ ...formData, visionNeedContacts: val })}
                          className="py-2 rounded-lg border-2 font-medium text-sm transition-all"
                          style={formData.visionNeedContacts === val ? { borderColor: GOLD, background: `${GOLD}15`, color: DARK } : { borderColor: '#e2e8f0', background: 'white', color: '#64748b' }}>
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Exam frequency *</Label>
                    <Select value={formData.visionExamFrequency} onValueChange={v => setFormData({ ...formData, visionExamFrequency: v })}>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="annually">Every year</SelectItem>
                        <SelectItem value="biannually">Every 2 years</SelectItem>
                        <SelectItem value="as_needed">As needed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Monthly budget *</Label>
                    <Select value={formData.monthlyContribution} onValueChange={v => setFormData({ ...formData, monthlyContribution: v })}>
                      <SelectTrigger><SelectValue placeholder="Select budget" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under15">Under $15/mo</SelectItem>
                        <SelectItem value="15-30">$15–$30/mo</SelectItem>
                        <SelectItem value="30-50">$30–$50/mo</SelectItem>
                        <SelectItem value="50+">$50+/mo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Household size *</Label>
                    <Select value={formData.householdSize} onValueChange={v => setFormData({ ...formData, householdSize: v })}>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 person</SelectItem>
                        <SelectItem value="2">2 people</SelectItem>
                        <SelectItem value="3">3 people</SelectItem>
                        <SelectItem value="4+">4+ people</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Consent - Always Show */}
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="consent"
                    checked={formData.consent}
                    onCheckedChange={(checked) => setFormData({ ...formData, consent: checked })}
                  />
                  <label htmlFor="consent" className="text-xs text-slate-600 cursor-pointer leading-tight">
                    I agree to be contacted by LifeHealthInc by phone and email regarding insurance options. Consent is not a condition of purchase. See our{' '}
                    <Link to={createPageUrl("Privacy")} className="underline hover:opacity-80 text-blue-600">
                      Privacy Policy
                    </Link>
                    {' '}and{' '}
                    <Link to={createPageUrl("Terms")} className="underline hover:opacity-80 text-blue-600">
                      Terms & Conditions
                    </Link>
                    . *
                  </label>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="transactionalSmsConsent"
                    checked={formData.transactionalSmsConsent}
                    onCheckedChange={(checked) => setFormData({ ...formData, transactionalSmsConsent: checked })}
                  />
                  <label htmlFor="transactionalSmsConsent" className="text-xs text-slate-600 cursor-pointer leading-tight">
                    By submitting, you authorize LIFEHEALTHINC LLC to text/call the number above for informational/transactional messages, possibly using automated means. Msg/data rates apply, msg frequency varies. Consent is not a condition of purchase. <a href="/terms" className="text-blue-600 underline hover:text-blue-800">See terms</a>{' '}and{' '}<a href="/privacy" className="text-blue-600 underline hover:text-blue-800">privacy policy</a>. Text HELP for help and STOP to unsubscribe.
                  </label>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="marketingSmsConsent"
                    checked={formData.marketingSmsConsent}
                    onCheckedChange={(checked) => setFormData({ ...formData, marketingSmsConsent: checked })}
                  />
                  <label htmlFor="marketingSmsConsent" className="text-xs text-slate-600 cursor-pointer leading-tight">
                    By submitting, you authorize LIFEHEALTHINC LLC to text/call the number above for promotional messages, possibly using automated means. Msg/data rates apply, msg frequency varies. Consent is not a condition of purchase. <a href="/terms" className="text-blue-600 underline hover:text-blue-800">See terms</a>{' '}and{' '}<a href="/privacy" className="text-blue-600 underline hover:text-blue-800">privacy policy</a>. Text HELP for help and STOP to unsubscribe.
                  </label>
                </div>

                <p className="text-xs text-slate-400 pl-1">SMS consent is not shared with third parties except as required to deliver messages (SMS providers).</p>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading || !formData.consent}
                size="lg"
                className="w-full font-bold text-lg"
                style={{ background: 'linear-gradient(135deg, #1A3586, #3D6B9E)', color: '#FFFFFF' }}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Calendar className="w-5 h-5 mr-2" />
                    Continue to Book Call
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-slate-500 mt-4">
                100% Free • No Obligation • Licensed Professionals
              </p>
            </>
          )}
        </form>
      </div>

      {/* Live Quote Estimator Sidebar - Only show for life/term products */}
      {(formData.productType === 'life_insurance' || formData.productType === 'term_life') && (
        <div className="hidden lg:block">
          <div className="sticky top-24">
            <LiveQuoteEstimator 
              coverage={Number(formData.coverageRequested)}
              termLength={formData.termLength}
              gender={formData.gender}
              tobacco={formData.tobacco}
              dob={formData.dob}
            />
          </div>
        </div>
      )}
      </div>

      {/* Contact & Need Help Section - Below the grid */}
      <div className="space-y-6">
        {formData.productType && (
          <div className="grid md:grid-cols-2 gap-6 max-w-lg mx-auto">
          <Card className="bg-white/10 border-white/20">
            <CardContent className="p-6 text-center">
              <Phone className="w-10 h-10 mx-auto mb-3 text-white" />
              <h3 className="font-semibold text-lg mb-3 text-white">
                Need Help?
              </h3>
              <div className="space-y-2 text-sm" style={{ color: '#F4F6FA' }}>
                <a
                  href="tel:9545430853"
                  className="block hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 inline mr-2" />
                  (954) 543-0853
                </a>
                <a
                  href="mailto:info@lifehealthinc.org"
                  className="block hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 inline mr-2" />
                  info@lifehealthinc.org
                </a>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20">
            <CardContent className="p-6 text-center">
              <MapPin className="w-10 h-10 mx-auto mb-3 text-white" />
              <h3 className="font-semibold text-lg mb-3 text-white">
                Our Office
              </h3>
              <div className="text-sm" style={{ color: '#F4F6FA' }}>
                <p>18245 Paulson Dr</p>
                <p>Ste VP-2, #508</p>
                <p>Port Charlotte, FL 33954</p>
              </div>
            </CardContent>
          </Card>
        </div>
        )}
      </div>
    </div>
  );
}