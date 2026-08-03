import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { createPageUrl } from '@/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { TrendingUp, Shield, DollarSign, ArrowRight, Calculator, Users, ExternalLink, AlertTriangle, CheckCircle, XCircle, UserCheck, Sparkles, Lock, ChevronRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend, Area, AreaChart } from 'recharts';
import { TooltipProvider } from "@/components/ui/tooltip";
import NewsletterSignup from '../components/NewsletterSignup';
import IULReadinessQuiz from '../components/IULReadinessQuiz';
import IULComparisonTool from '../components/IULComparisonTool';

const DARK1 = '#081730';
const DARK2 = '#1A3586';
const DARK3 = '#3D6B9E';

const SectionLabel = ({ children }) => (
  <div className="flex items-center justify-center gap-3 mb-4">
    <div className="h-px w-8 rounded-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5))' }} />
    <span className="text-xs font-bold uppercase tracking-widest text-white">{children}</span>
    <div className="h-px w-8 rounded-full" style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.5), transparent)' }} />
  </div>
);

const Divider = () => (
  <div className="max-w-6xl mx-auto px-4">
    <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }} />
  </div>
);

export default function IULStructuringPage() {
  const [monthlyContribution, setMonthlyContribution] = useState([300]);
  const [assumedCredit, setAssumedCredit] = useState([6]);
  const [years, setYears] = useState([20]);
  const [accountView, setAccountView] = useState('variable');

  const annualContribution = monthlyContribution[0] * 12;
  const growthRate = assumedCredit[0] / 100;
  const numYears = years[0];
  const totalContributions = annualContribution * numYears;

  let estimatedCashValue;
  if (growthRate > 0) {
    estimatedCashValue = annualContribution * (Math.pow(1 + growthRate, numYears) - 1) / growthRate;
  } else {
    estimatedCashValue = totalContributions;
  }
  const illustrativeGrowth = estimatedCashValue - totalContributions;

  const generateChartData = (monthlyAmount, growthPercent, durationYears) => {
    const data = [];
    const annual = monthlyAmount * 12;
    const rate = growthPercent / 100;
    const calcValue = (year) => rate > 0 ? annual * (Math.pow(1 + rate, year) - 1) / rate : annual * year;
    for (let year = 1; year <= durationYears; year++) {
      data.push({ year, contributions: Math.round(annual * year), cashValue: Math.round(calcValue(year)) });
    }
    return data;
  };

  const chartData = generateChartData(monthlyContribution[0], assumedCredit[0], years[0]);

  const generateIndexedComparisonData = () => {
    const data = [];
    const fixedRate = 0.035;
    let marketValue = 10000, indexedValue = 10000, fixedValue = 10000;
    const marketReturns = [0.08, -0.15, 0.22, -0.08, 0.18, 0.05, -0.12, 0.25, 0.03, -0.20, 0.15, 0.07, -0.05, 0.19, 0.02, -0.08, 0.14, 0.06, -0.03, 0.11];
    for (let year = 1; year <= 20; year++) {
      const mr = marketReturns[year - 1];
      const ir = Math.max(0, Math.min(0.10, mr));
      marketValue *= (1 + mr); indexedValue *= (1 + ir); fixedValue *= (1 + fixedRate);
      data.push({ year, market: Math.round(marketValue), indexed: Math.round(indexedValue), fixed: Math.round(fixedValue) });
    }
    return data;
  };

  const indexedComparisonData = generateIndexedComparisonData();

  const marketData = [
    { year: 1, marketReturn: 15.2, creditedReturn: 10.0 },
    { year: 2, marketReturn: -8.3, creditedReturn: 0.0 },
    { year: 3, marketReturn: 22.1, creditedReturn: 10.0 },
    { year: 4, marketReturn: -12.7, creditedReturn: 0.0 },
    { year: 5, marketReturn: 28.4, creditedReturn: 10.0 },
    { year: 6, marketReturn: 5.2, creditedReturn: 5.2 },
    { year: 7, marketReturn: -18.9, creditedReturn: 0.0 },
    { year: 8, marketReturn: 31.8, creditedReturn: 10.0 },
    { year: 9, marketReturn: 7.8, creditedReturn: 7.8 },
    { year: 10, marketReturn: -22.1, creditedReturn: 0.0 }
  ];

  const faqData = [
    { question: "Is IUL the same as investing in the stock market?", answer: "No. While IUL returns are linked to market index performance, you're not directly invested in the market. The insurance company credits interest based on index performance, subject to floors and caps. You cannot lose principal due to market downturns - there's a guaranteed 0% floor in most policies." },
    { question: "Can I lose money in an IUL?", answer: "You cannot lose cash value due to negative market performance thanks to the 0% floor protection. However, policy charges and fees continue regardless of market performance. If insufficient premiums are paid or if policy performance is poor over time, the policy could lapse without adequate funding." },
    { question: "What is a cap and participation rate?", answer: "A cap is the maximum interest rate credited to your policy in any given year, even if the index performs better. A participation rate determines what percentage of the index gain you receive. For example, with a 10% cap and 100% participation, if the S&P 500 gains 15%, you'd be credited 10%. If it gains 7%, you'd receive the full 7%." },
    { question: "Can I access cash value tax-advantaged?", answer: "Yes, in several ways. You can take tax-free withdrawals up to your basis (total premiums paid), and then take tax-free loans against the remaining cash value. Policy loans are not taxable events as long as the policy remains in force. This makes IUL popular for supplemental retirement income strategies." },
    { question: "How do I see real numbers for my situation?", answer: "Contact our licensed agents to request a carrier illustration. These detailed projections show how a specific IUL policy might perform for your age, health, and contribution level using the carrier's actual caps, floors, and charges. Illustrations are required for any IUL consideration." },
    { question: "Who determines caps and floors?", answer: "The insurance company sets caps and floors annually, though they cannot go below contractual minimums. Caps typically range from 9-12%, floors are usually 0-1%. These rates can change yearly based on the company's cost of providing the index option, but your previous years' gains are locked in and protected." }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="border p-4 rounded-xl shadow-2xl" style={{ background: DARK2, borderColor: 'rgba(255,255,255,0.3)' }}>
          <p className="font-bold mb-2 text-white">Year {label}</p>
          <p className="text-sm text-white">Contributions: <span className="font-bold">${payload[0]?.value?.toLocaleString()}</span></p>
          <p className="text-white text-sm">Cash Value: <span className="font-bold">${payload[1]?.value?.toLocaleString()}</span></p>
        </div>
      );
    }
    return null;
  };

  const [zipCode, setZipCode] = useState('');

  const handleGetStarted = () => {
    window.location.href = `${createPageUrl('Calculator')}?zip=${zipCode}`;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden" style={{ background: 'linear-gradient(135deg, #081730 0%, #1A3586 100%)' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              What If You Could Earn <span className="text-blue-300">Market Returns Without the Market Risk?</span>
            </h1>
            <p className="text-xl text-slate-200 mb-8">
              An IUL (Indexed Universal Life) lets your cash value grow alongside the S&P 500 — but with a guaranteed 0% floor. In a down year, you earn zero. You never go negative. In an up year, you keep the gains up to the cap.
            </p>
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-slate-900">Get Your Free IUL Illustration</h3>
                <p className="text-slate-600 mb-4">Enter your ZIP and a licensed IUL specialist will run real carrier numbers for your age and goals — no cost, no obligation.</p>
                <div className="flex gap-3">
                  <Input type="text" placeholder="ZIP Code" value={zipCode} onChange={e => setZipCode(e.target.value)} className="flex-1" maxLength={5} />
                  <Button onClick={handleGetStarted} size="lg" className="font-semibold" style={{ backgroundColor: '#1A3586', color: '#FFFFFF' }}>
                    Get Started <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
                <p className="text-sm text-slate-500 mt-4 text-center">
                  Or call <a href="tel:9545430853" className="font-semibold hover:underline" style={{ color: '#1A3586' }}>(954) 543-0853</a> for a quote
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-3"><Shield className="w-8 h-8 text-blue-600" /></div>
              <h3 className="font-semibold text-slate-900">0% Floor Protection</h3>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-3"><TrendingUp className="w-8 h-8 text-green-600" /></div>
              <h3 className="font-semibold text-slate-900">Index-Linked Growth</h3>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-3"><DollarSign className="w-8 h-8 text-purple-600" /></div>
              <h3 className="font-semibold text-slate-900">Tax-Advantaged Access</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Remaining content */}
      <div style={{ background: `linear-gradient(180deg, ${DARK1} 0%, ${DARK2} 50%, ${DARK3} 100%)` }}>

        {/* WHO SHOULD CONSIDER */}
        <section className="py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <SectionLabel>Is This For You?</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-black text-white">Who Should Consider IUL?</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { icon: Users, num: '01', title: "Parents Funding College", desc: "Tax-advantaged accumulation while keeping life insurance protection active." },
                { icon: TrendingUp, num: '02', title: "Business Owners", desc: "Flexible funding and tax-efficient cash buildup for succession planning." },
                { icon: DollarSign, num: '03', title: "High Earners", desc: "Additional tax-advantaged savings after maxing out 401(k) and IRA limits." },
                { icon: Shield, num: '04', title: "Legacy Planners", desc: "Pass wealth tax-efficiently to heirs while maintaining lifetime access." }
              ].map(({ icon: Icon, num, title, desc }, i) => (
                <div key={i} className="group relative rounded-2xl p-7 border border-white/10 hover:border-white/50 transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                  style={{ background: 'linear-gradient(160deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)' }}>
                  <div className="absolute top-4 right-5 text-5xl font-black opacity-10 select-none text-white">{num}</div>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                    style={{ background: 'linear-gradient(135deg, #1A3586, #3D6B9E)', border: '1px solid rgba(255,255,255,0.3)' }}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-white text-lg mb-2">{title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Divider />

        {/* CASH VALUE PROJECTION */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <SectionLabel>Personalize Your Numbers</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-black text-white">Cash Value Growth Projection</h2>
              <p className="text-lg text-slate-400 mt-3 max-w-2xl mx-auto">Adjust the sliders and watch the projection update live</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              {/* Sliders */}
              <div className="lg:col-span-2 rounded-2xl p-8 border border-white/10 space-y-8"
                style={{ background: 'linear-gradient(160deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)' }}>
                {[
                  { label: 'Monthly Contribution', value: `$${monthlyContribution[0].toLocaleString()}`, sliderProps: { value: monthlyContribution, onValueChange: setMonthlyContribution, max: 3000, min: 100, step: 50 }, range: ['$100/mo', '$3,000/mo'] },
                  { label: 'Assumed Credit Rate', value: `${assumedCredit[0]}%`, sliderProps: { value: assumedCredit, onValueChange: setAssumedCredit, max: 15, min: 0, step: 0.5 }, range: ['0% (Floor)', '15%'] },
                  { label: 'Time Horizon', value: `${years[0]} yrs`, sliderProps: { value: years, onValueChange: setYears, max: 40, min: 5, step: 5 }, range: ['5 years', '40 years'] },
                ].map(({ label, value, sliderProps, range }, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-white font-semibold">{label}</label>
                      <span className="text-2xl font-black text-white">{value}</span>
                    </div>
                    <Slider {...sliderProps} className="w-full" />
                    <div className="flex justify-between text-xs text-slate-500 mt-2"><span>{range[0]}</span><span>{range[1]}</span></div>
                  </div>
                ))}
              </div>

              {/* Results panel */}
              <div className="rounded-2xl p-8 border border-white/30 flex flex-col justify-between" style={{ background: 'linear-gradient(160deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.04) 100%)' }}>
                <div>
                  <h3 className="font-bold text-white text-lg mb-6 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-white" /> Projected Results
                  </h3>
                  <div className="space-y-4">
                    <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.06)' }}>
                      <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Total You Put In</p>
                      <p className="text-white text-2xl font-bold">${totalContributions.toLocaleString()}</p>
                    </div>
                    <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.06)' }}>
                      <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Estimated Cash Value</p>
                      <p className="text-3xl font-black text-white">${Math.round(estimatedCashValue).toLocaleString()}</p>
                    </div>
                    <div className="rounded-xl p-4 border border-green-500/30" style={{ background: 'rgba(34,197,94,0.08)' }}>
                      <p className="text-green-400 text-xs uppercase tracking-widest mb-1">Illustrative Growth</p>
                      <p className="text-green-300 text-2xl font-black">+${Math.round(illustrativeGrowth).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                <Button asChild className="mt-6 w-full font-bold rounded-xl py-6 hover:scale-105 transition-all duration-300"
                  style={{ background: 'linear-gradient(135deg, #1A3586, #3D6B9E)', color: '#FFFFFF' }}>
                  <a href="https://calendly.com/lifehealthinc/lifehealthinc" target="_blank" rel="noopener noreferrer">
                    Get Real Numbers <ChevronRight className="w-4 h-4 ml-1" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Chart */}
            <div className="rounded-2xl p-8 border border-white/10" style={{ background: 'linear-gradient(160deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)' }}>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="cvGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FFFFFF" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="coGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                    <XAxis dataKey="year" stroke="#374151" tick={{ fill: '#6b7280', fontSize: 12 }} label={{ value: 'Year', position: 'insideBottom', offset: -5, fill: '#6b7280' }} />
                    <YAxis stroke="#374151" tick={{ fill: '#6b7280', fontSize: 12 }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                    <RechartsTooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ paddingTop: '16px', color: '#9ca3af' }} />
                    <Area type="monotone" dataKey="contributions" stroke="#6366f1" strokeWidth={2} fill="url(#coGrad)" name="Total Contributions" dot={false} />
                    <Area type="monotone" dataKey="cashValue" stroke="#FFFFFF" strokeWidth={3} fill="url(#cvGrad)" name={`Projected Cash Value @ ${assumedCredit[0]}%`} dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex items-start gap-2 text-xs text-slate-500 bg-white/5 rounded-xl p-3">
                <AlertTriangle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-blue-400">Educational demo only.</strong> Real results depend on carrier caps, floors, policy charges, and crediting methods. Does not include insurance costs or expenses.</span>
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* GOT A DECLINE */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.2)', background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(61,107,158,0.8))' }}>
              <Accordion type="single" collapsible>
                <AccordionItem value="surrogate" className="border-none">
                  <AccordionTrigger className="text-white hover:no-underline px-8 py-7">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, #1A3586, #3D6B9E)' }}>
                        <UserCheck className="w-7 h-7 text-white" />
                      </div>
                      <div className="text-left">
                        <h2 className="text-xl md:text-2xl font-black text-white">Got a Decline?</h2>
                        <p className="text-slate-400 font-normal mt-1 text-sm max-w-xl">Chances are you didn't go the fully underwritten route — schedule here for a cost-free, medically underwritten risk assessment</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="px-8 pb-8">
                      <div className="grid lg:grid-cols-2 gap-10 items-start">
                        <div className="rounded-2xl p-8 border border-white/10" style={{ background: 'rgba(255,255,255,0.04)' }}>
                          <div className="flex justify-center items-center gap-6 mb-8">
                            {[
                              { icon: Users, label: 'Insured Person', sub: 'Child, parent, business partner' },
                              null,
                              { icon: DollarSign, label: 'Policy Owner', sub: 'You — control the cash value' }
                            ].map((item, i) => item === null ? (
                              <div key={i} className="flex flex-col items-center gap-1">
                                <ArrowRight className="w-7 h-7 text-white" />
                                <span className="text-xs text-slate-500 text-center leading-tight">Cash Value<br />Growth</span>
                                <ArrowRight className="w-7 h-7 text-white" />
                              </div>
                            ) : (
                              <div key={i} className="text-center">
                                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-3" style={{ background: 'linear-gradient(135deg, #1A3586, #3D6B9E)' }}>
                                  <item.icon className="w-10 h-10 text-white" />
                                </div>
                                <p className="text-sm font-semibold text-white">{item.label}</p>
                                <p className="text-xs text-slate-400 mt-1">{item.sub}</p>
                              </div>
                            ))}
                          </div>
                          <div className="rounded-xl p-4 border border-blue-700/40" style={{ background: 'rgba(26,53,134,0.2)' }}>
                            <p className="text-sm text-blue-200 text-center"><strong>Insurable Interest Required:</strong> You can own a policy on someone whose death would cause you financial loss.</p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h3 className="text-2xl font-black mb-5 text-white">How Surrogate Ownership Works</h3>
                          {[
                            { title: "Insure a Healthier Person", desc: "Health issues? Insure your healthy child or spouse. You still build and own all the cash value." },
                            { title: "Lower Premiums", desc: "Younger, healthier insureds mean significantly lower costs for the same death benefit." },
                            { title: "You Control the Cash Value", desc: "As the owner, access cash value through tax-advantaged loans and withdrawals." },
                            { title: "Asset Protection", desc: "In many states, cash value in life insurance is protected from creditors and lawsuits." },
                            { title: "Estate Planning Tool", desc: "Death benefit passes outside probate; cash value can be accessed tax-free during your lifetime." }
                          ].map(({ title, desc }, i) => (
                            <div key={i} className="flex items-start gap-3 rounded-xl p-4 border border-white/5" style={{ background: 'rgba(255,255,255,0.05)' }}>
                              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="font-semibold text-white text-sm">{title}</p>
                                <p className="text-slate-400 text-xs mt-0.5">{desc}</p>
                              </div>
                            </div>
                          ))}
                          <Button asChild size="lg" className="w-full mt-2 font-bold rounded-xl py-6 hover:scale-105 transition-all duration-300"
                            style={{ background: 'linear-gradient(135deg, #1A3586, #3D6B9E)', color: '#FFFFFF' }}>
                            <a href="https://calendly.com/lifehealthinc/lifehealthinc" target="_blank" rel="noopener noreferrer">
                              Schedule My Free Risk Assessment
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        <Divider />

        {/* WHAT IS IUL */}
        <section className="py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <SectionLabel>The Basics</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-black text-white">What is Indexed Universal Life?</h2>
              <p className="text-lg text-slate-400 mt-3 max-w-3xl mx-auto">A permanent policy with flexible premiums, market-linked growth, and guaranteed downside protection.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Shield, title: "Lifetime Protection", desc: "Permanent coverage that lasts your entire life with proper funding, ensuring your beneficiaries are always protected." },
                { icon: TrendingUp, title: "Index-Linked Growth", desc: "Cash value growth linked to the S&P 500 or other indexes with a guaranteed 0% floor — upside without the downside." },
                { icon: DollarSign, title: "Flexible Funding", desc: "Flexible premiums and tax-advantaged access to cash value through withdrawals and loans for any financial goal." }
              ].map(({ icon: Icon, title, desc }, i) => (
                <div key={i} className="group relative rounded-2xl p-8 overflow-hidden hover:-translate-y-2 transition-all duration-300"
                  style={{ background: 'linear-gradient(160deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }} />
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                    style={{ background: 'linear-gradient(135deg, #1A3586, #3D6B9E)' }}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-24 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${DARK1}, ${DARK2})` }}>
          <div className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-16">
              <SectionLabel>How It Works</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-black text-white">Your Premium Dollar Flow</h2>
            </div>

            <div className="flex flex-col md:flex-row items-stretch justify-center gap-0 max-w-3xl mx-auto">
              {[
                { step: '1', title: 'Your Premium', sub: 'Monthly contribution you set', accent: '#6366f1' },
                { step: '2', title: 'Cost of Insurance', sub: 'Death benefit protection & policy fees', accent: '#8b5cf6' },
                { step: '3', title: 'Cash Value Account', sub: 'Index-linked growth potential', accent: '#FFFFFF', gold: true },
              ].map(({ step, title, sub, accent, gold }, i) => (
                <div key={i} className="flex md:flex-row flex-col items-center flex-1">
                  <div className={`flex-1 rounded-2xl p-6 text-center relative overflow-hidden border ${gold ? 'border-white/40' : 'border-white/10'}`}
                    style={{ background: gold ? 'linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05))' : 'linear-gradient(160deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))' }}>
                    {gold && <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)' }} />}
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3 font-black text-sm"
                      style={{ background: gold ? 'linear-gradient(135deg, #1A3586, #3D6B9E)' : `${accent}30`, color: gold ? '#FFFFFF' : accent, border: `1px solid ${accent}50` }}>
                      {step}
                    </div>
                    <h3 className="font-bold text-white text-sm mb-1">{title}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed">{sub}</p>
                  </div>
                  {i < 2 && (
                    <div className="flex items-center justify-center px-2 py-3 md:py-0 md:px-3 flex-shrink-0">
                      <ArrowRight className="w-5 h-5 text-white/30 rotate-90 md:rotate-0" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FLOORS, CAPS, PARTICIPATION */}
        <section className="py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <SectionLabel>Key Mechanics</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-black text-white">Floors, Caps &amp; Participation</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { stat: '0%', label: 'Floor', title: 'Downside Protection', desc: 'Your cash value can never be credited below 0% due to market losses. Prior year gains are locked in permanently.', color: '#22c55e', border: 'border-green-500/20', bg: 'rgba(34,197,94,0.06)' },
                { stat: '13.3%', label: 'Cap', title: 'Growth Ceiling', desc: 'The maximum interest rate credited annually. If the index gains 20%, you receive up to 13.3%. A fair trade for the floor.', color: '#FFFFFF', border: 'border-white/30', bg: 'rgba(255,255,255,0.05)' },
                { stat: '100%', label: 'Participation', title: 'Full Index Exposure', desc: 'You receive 100% of index gains up to the cap. Some policies offer higher caps with lower participation rates.', color: '#818cf8', border: 'border-indigo-500/20', bg: 'rgba(129,140,248,0.06)' }
              ].map(({ stat, label, title, desc, color, border, bg }, i) => (
                <div key={i} className={`rounded-2xl p-8 text-center border ${border} hover:-translate-y-1 transition-all duration-300`} style={{ background: bg }}>
                  <div className="mb-5">
                    <span className="text-6xl font-black leading-none block" style={{ color }}>{stat}</span>
                    <span className="text-base font-bold uppercase tracking-widest mt-1 block" style={{ color: `${color}99` }}>{label}</span>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-3">{title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Divider />

        {/* IUL READINESS QUIZ */}
        <section className="py-24" style={{ background: `linear-gradient(135deg, ${DARK1}F5, ${DARK2}F5)` }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <SectionLabel>Find Out Now</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-black text-white">Is IUL Right for You?</h2>
              <p className="text-lg text-slate-400 mt-3 max-w-2xl mx-auto">Answer 5 quick questions and we'll tell you exactly where you stand — and what to do next.</p>
            </div>
            <div className="rounded-2xl border border-white/10 p-8 md:p-12" style={{ background: 'linear-gradient(160deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)' }}>
              <IULReadinessQuiz />
            </div>
          </div>
        </section>

        {/* ROI COMPARISON TOOL */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <SectionLabel>Interactive Tool</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-black text-white">IUL vs. Savings vs. Market</h2>
              <p className="text-lg text-slate-400 mt-3 max-w-2xl mx-auto">
                Adjust contributions, time horizon, and inflation rate to see how an IUL stacks up against traditional alternatives — after taxes.
              </p>
            </div>
            <IULComparisonTool />
          </div>
        </section>

        <Divider />

        {/* NEWSLETTER */}
        <section className="py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <NewsletterSignup variant="footer" />
          </div>
        </section>

        <Divider />

        {/* ACCOUNT STRATEGY */}
        <section className="py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <SectionLabel>Growth Strategy</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-black text-white">Account Strategy Comparison</h2>
              <p className="text-lg text-slate-400 mt-3">The two primary ways your cash value grows inside an IUL</p>
            </div>

            <div className="rounded-2xl overflow-hidden border border-white/10">
              <div className="p-6 border-b border-white/10" style={{ background: 'linear-gradient(160deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))' }}>
                <TooltipProvider>
                  <div className="grid grid-cols-2 gap-3 bg-black/40 p-2 rounded-xl">
                    {['fixed', 'variable'].map((view) => (
                      <Button key={view} onClick={() => setAccountView(view)}
                        className={`py-4 rounded-lg font-bold transition-all duration-300 ${accountView !== view ? 'bg-transparent text-slate-400 hover:bg-white/10' : ''}`}
                        style={accountView === view ? { background: 'linear-gradient(135deg, #1A3586, #3D6B9E)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.3)', transform: 'scale(1.03)' } : {}}>
                        {view === 'fixed' ? 'Fixed Interest Account' : 'Variable Index Account'}
                      </Button>
                    ))}
                  </div>
                </TooltipProvider>
              </div>

              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-green-400 font-bold mb-4 flex items-center gap-2"><CheckCircle className="w-5 h-5" /> Pros</h4>
                    <div className="space-y-3">
                      {accountView === 'fixed' ? <>
                        <div className="bg-green-900/20 border border-green-800/30 rounded-xl p-4 text-sm text-slate-300"><strong className="text-green-300">Steady, predictable growth</strong> at a rate declared by the insurer.</div>
                        <div className="bg-green-900/20 border border-green-800/30 rounded-xl p-4 text-sm text-slate-300">Completely shielded from stock market volatility.</div>
                      </> : <>
                        <div className="bg-green-900/20 border border-green-800/30 rounded-xl p-4 text-sm text-slate-300"><strong className="text-green-300">Market-linked potential</strong> for higher returns up to the cap.</div>
                        <div className="bg-green-900/20 border border-green-800/30 rounded-xl p-4 text-sm text-slate-300">Principal protected by 0% floor during market downturns.</div>
                      </>}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-red-400 font-bold mb-4 flex items-center gap-2"><XCircle className="w-5 h-5" /> Cons</h4>
                    <div className="space-y-3">
                      {accountView === 'fixed' ? <>
                        <div className="bg-red-900/20 border border-red-800/30 rounded-xl p-4 text-sm text-slate-300">Returns are typically lower than index-linked accounts.</div>
                        <div className="bg-red-900/20 border border-red-800/30 rounded-xl p-4 text-sm text-slate-300">May not keep pace with inflation over the long term.</div>
                      </> : <>
                        <div className="bg-red-900/20 border border-red-800/30 rounded-xl p-4 text-sm text-slate-300">Growth is capped — you don't capture all market gains.</div>
                        <div className="bg-red-900/20 border border-red-800/30 rounded-xl p-4 text-sm text-slate-300">Less predictable year-to-year than a fixed account.</div>
                      </>}
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-8 py-4 border-t border-white/10 text-xs text-slate-500 text-center">
                For educational purposes only. Most policies allow you to allocate between both account types.
              </div>
            </div>
          </div>
        </section>

        {/* WHY INDEXED STRATEGIES */}
        <section className="py-24 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${DARK1}, ${DARK2})` }}>
          <div className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-16">
              <SectionLabel>Side-by-Side</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-black text-white">Why Indexed Strategies Win</h2>
              <p className="text-lg text-slate-400 mt-3">Capture market upside while keeping your floor protection</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="rounded-2xl p-6 border border-white/10" style={{ background: 'linear-gradient(160deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))' }}>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={indexedComparisonData} margin={{ top: 10, right: 20, left: 10, bottom: 40 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                      <XAxis dataKey="year" stroke="#374151" tick={{ fill: '#6b7280', fontSize: 11 }} label={{ value: 'Years', position: 'insideBottom', offset: -10, fill: '#6b7280' }} />
                      <YAxis stroke="#374151" tick={{ fill: '#6b7280', fontSize: 11 }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                      <RechartsTooltip formatter={(v, n) => [`$${v.toLocaleString()}`, n]} labelFormatter={(l) => `Year ${l}`}
                        contentStyle={{ backgroundColor: DARK2, border: '1px solid rgba(255,255,255,0.3)', borderRadius: '12px', color: 'white' }} />
                      <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '11px', color: '#9ca3af' }} />
                      <Line type="monotone" dataKey="fixed" stroke="#a78bfa" strokeWidth={2} name="Fixed (3.5%)" strokeDasharray="5 5" dot={false} />
                      <Line type="monotone" dataKey="market" stroke="#ef4444" strokeWidth={2} name="Direct Market" dot={false} />
                      <Line type="monotone" dataKey="indexed" stroke="#FFFFFF" strokeWidth={3} name="Indexed (0% Floor, 13.3% Cap)" dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-xs text-slate-500 mt-3 text-center">Hypothetical $10,000 over 20 years. Educational purposes only.</p>
              </div>

              <div className="space-y-5">
                <h3 className="text-3xl md:text-4xl font-black text-white">Capture Gains.<br />Avoid the Losses.</h3>
                {[
                  "Upside linked to market indexes (e.g., S&P 500)",
                  "Downside protection with a guaranteed 0% floor",
                  "Flexibility to blend fixed and indexed allocations",
                  "Growth designed to outpace inflation over decades"
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-4 rounded-xl p-4 border border-white/5" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                    <p className="text-white font-medium">{text}</p>
                  </div>
                ))}
                <Button asChild size="lg" className="w-full font-bold rounded-xl py-6 hover:scale-105 transition-all duration-300 mt-2"
                  style={{ background: 'linear-gradient(135deg, #1A3586, #3D6B9E)', color: '#FFFFFF' }}>
                  <a href="https://calendly.com/lifehealthinc/lifehealthinc" target="_blank" rel="noopener noreferrer">
                    See If You Qualify Today <ChevronRight className="w-5 h-5 ml-1" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FLOOR VS MARKET TABLE */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <SectionLabel>Year by Year</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-black text-white">Floor vs. Market Protection</h2>
              <p className="text-lg text-slate-400 mt-3">See exactly how the 0% floor shields you during bad market years</p>
            </div>

            <div className="rounded-2xl overflow-hidden border border-white/10">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: 'linear-gradient(90deg, rgba(26,53,134,0.4), rgba(26,53,134,0.2))', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <th className="text-left py-4 px-6 font-bold text-white">Year</th>
                      <th className="text-right py-4 px-6 font-bold text-white">Market Return</th>
                      <th className="text-right py-4 px-6 font-bold text-white">IUL Credited</th>
                      <th className="text-center py-4 px-6 font-bold text-white">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marketData.map((data, i) => (
                      <tr key={i} className="border-t border-white/5 hover:bg-white/5 transition-colors"
                        style={{ background: data.marketReturn < 0 ? 'rgba(239,68,68,0.04)' : 'transparent' }}>
                        <td className="py-4 px-6 text-slate-300 font-semibold">Year {data.year}</td>
                        <td className={`py-4 px-6 text-right font-bold text-base ${data.marketReturn < 0 ? 'text-red-400' : 'text-green-400'}`}>
                          {data.marketReturn > 0 ? '+' : ''}{data.marketReturn}%
                        </td>
                        <td className="py-4 px-6 text-right font-bold text-base text-white">
                          {data.creditedReturn}%
                        </td>
                        <td className="py-4 px-6 text-center">
                          {data.marketReturn < 0 ? (
                            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-blue-900/40 text-blue-300 border border-blue-700/40">
                              <Shield className="w-3 h-3" /> Floor Protected
                            </span>
                          ) : data.creditedReturn < data.marketReturn ? (
                            <span className="inline-flex px-3 py-1.5 rounded-full text-xs font-bold bg-blue-900/30 border border-blue-700/40 text-white">
                              Cap Applied
                            </span>
                          ) : (
                            <span className="inline-flex px-3 py-1.5 rounded-full text-xs font-bold bg-green-900/30 text-green-300 border border-green-700/30">
                              Full Credit
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-5 border-t border-white/10 text-center text-xs text-slate-500">
                Example shows 0% floor, 13.3% cap. In negative market years, your cash value is credited 0% — never negative.
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* FAQ */}
        <section className="py-24" style={{ background: `linear-gradient(135deg, ${DARK2}F0, ${DARK3}F0)` }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <SectionLabel>Common Questions</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-black text-white">Frequently Asked Questions</h2>
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/10">
              <Accordion type="single" collapsible>
                {faqData.map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border-b border-white/10 last:border-none">
                    <AccordionTrigger className="text-left font-semibold hover:no-underline text-white py-5 px-7 hover:bg-white/5 transition-colors">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-400 leading-relaxed pb-6 px-7" style={{ borderLeft: '2px solid rgba(255,255,255,0.2)' }}>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-28 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${DARK1}, ${DARK2})` }} />
            <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #7c3aed, transparent)', transform: 'translateY(40%)' }} />
          </div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/30 mb-8" style={{ background: 'rgba(255,255,255,0.08)' }}>
              <Lock className="w-4 h-4 text-white" />
              <span className="text-sm font-semibold text-white">Not everyone qualifies — apply now while you can</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
              Your 401(k) Has Limits.<br />
              <span className="text-white">An IUL Doesn't.</span>
            </h2>
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
              High earners who've maxed out their retirement accounts use IULs to keep growing wealth tax-free. Get your personalized illustration — it takes 30 seconds to request.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-12 py-7 font-black rounded-full shadow-2xl hover:scale-105 transition-all duration-300"
                style={{ background: 'linear-gradient(135deg, #1A3586, #3D6B9E)', color: '#FFFFFF' }}>
                <a href="https://calendly.com/lifehealthinc/lifehealthinc" target="_blank" rel="noopener noreferrer">
                  <Calculator className="w-5 h-5 mr-2" /> Get a Carrier Illustration
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-10 py-7 font-bold rounded-full border-2 hover:bg-white/10 transition-all duration-300 bg-transparent"
                style={{ borderColor: 'rgba(255,255,255,0.5)', color: '#FFFFFF' }}>
                <a href="https://linktr.ee/lifehealthinc" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-5 h-5 mr-2" /> View Our Credentials
                </a>
              </Button>
            </div>
            <p className="text-slate-500 text-sm mt-8">Licensed professionals nationwide · No-cost illustrations · No pressure</p>
          </div>
        </section>

      </div>
    </div>
  );
}