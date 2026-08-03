import { useState, useEffect, useMemo, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createPageUrl } from '@/utils';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';
import { Tooltip as ShadTooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Link } from 'react-router-dom';
import { TrendingUp, Lock, Gift, PiggyBank, Briefcase, PlusCircle, MinusCircle, ArrowRight, Calendar, Check, Award, Loader2 } from 'lucide-react';
import NewsletterSignup from '../components/NewsletterSignup';
import { base44 } from '@/api/base44Client';

const DARK1 = '#081730';
const DARK2 = '#1A3586';
const DARK3 = '#3D6B9E';

const services = [
  { id: 'fia', title: 'Fixed Indexed Annuities (FIAs)', icon: TrendingUp, description: 'Growth linked to a market index (like the S&P 500), with a 0% floor protecting against market downturns. Growth is subject to caps or participation rates.', link: '#fia-explainer' },
  { id: 'myga', title: 'Multi-Year Guaranteed Annuities (MYGAs)', icon: Lock, description: 'Similar to CDs, offering fixed interest rates for 3–10 years. Predictable, tax-deferred growth.', link: '#myga-explainer' },
  { id: 'spia', title: 'Immediate Income Annuities (SPIAs)', icon: Gift, description: 'Convert a lump sum into a guaranteed income stream for life or a set period. Works like a personal pension.', link: '#spia-explainer' },
  { id: 'self-insurance', title: 'Self-Insurance Strategies', icon: PiggyBank, description: 'Build liquidity with an emergency fund or HSA. Reduce costs with high-deductible health plans.', link: '#self-insurance-explainer' }
];

const carrierLogos = [
  { name: 'Athene', imageUrl: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c1ca7c80a1472f1eb4424c/f558b5fce_image.png' },
  { name: 'SILAC Insurance Company', imageUrl: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c1ca7c80a1472f1eb4424c/feb5c554c_image.png' },
  { name: 'Corebridge Financial', imageUrl: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c1ca7c80a1472f1eb4424c/51dc71410_image.png' },
  { name: 'North American Company', imageUrl: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c1ca7c80a1472f1eb4424c/ed0abeff7_image.png' },
  { name: 'Allianz', imageUrl: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c1ca7c80a1472f1eb4424c/a5a3e4686_image.png' },
  { name: 'Midland National', imageUrl: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c1ca7c80a1472f1eb4424c/278f903e1_image.png' },
];

const fiaChartData = [
    { year: 'Issue', market: 100, credited: 120, floor: 100, bonus: 20 },
    { year: 1, market: 115.2, credited: 129, floor: 120 },
    { year: 2, market: 105.6, credited: 120, floor: 120 },
    { year: 3, market: 128.9, credited: 129, floor: 120 },
    { year: 4, market: 135.6, credited: 125.2, floor: 120 },
    { year: 5, market: 110, credited: 120, floor: 120 },
];

const mygaLadderData = [
    { term: '3-Year', rate: 4.85 },
    { term: '5-Year', rate: 5.15 },
    { term: '7-Year', rate: 5.05 },
    { term: '10-Year', rate: 4.95 },
];

const comparisonData = [
  { feature: 'Growth Potential', fia: 'Market-linked with caps/participation', myga: 'Fixed rates for set terms', spia: 'Income-focused, not growth', self: 'Variable based on strategy' },
  { feature: 'Principal Protection', fia: '0% floor protects against losses', myga: 'Guaranteed by insurer', spia: 'Income backed by insurer strength', self: 'Depends on chosen investments' },
  { feature: 'Liquidity Access', fia: 'Limited (surrender charges apply)', myga: 'Limited (surrender charges apply)', spia: 'Very limited (income-only)', self: 'High (immediate access)' },
  { feature: 'Upfront Bonus Available?', fia: 'Yes (select products)', myga: 'No', spia: 'No', self: 'N/A' },
  { feature: 'Best For', fia: 'Growth with downside protection', myga: 'Predictable, CD-like returns', spia: 'Guaranteed lifetime income', self: 'Maximum flexibility and control' },
];

const disclosures = `Annuities are long-term insurance products. They are not a deposit, not FDIC or NCUA insured, not insured by any federal government agency, and not guaranteed by a bank or credit union. Guarantees are backed by the financial strength and claims-paying ability of the issuing insurance company. Surrender charges, fees, and taxes may apply. Withdrawals of earnings are taxable as ordinary income; if taken before age 59½, a 10% federal penalty may apply. Product availability varies by state.`;

export default function AnnuitiesPage() {
    const [spiaAge, setSpiaAge] = useState(65);
    const [spiaLumpSum, setSpiaLumpSum] = useState(250000);
    const [spiaIncome, setSpiaIncome] = useState(null);
    const [mygaTerms, setMygaTerms] = useState({ '3-Year': true, '5-Year': true });
    const [blendedYield, setBlendedYield] = useState(0);
    const [fiaCap, setFiaCap] = useState(9);
    const [fiaPar, setFiaPar] = useState(100);
    const [fiaCredited, setFiaCredited] = useState(null);

    const calculateSpia = useCallback(() => {
        const baseRate = 0.0055;
        const ageAdjustment = (spiaAge - 65) * 0.00005;
        const monthlyIncome = spiaLumpSum * (baseRate + ageAdjustment);
        setSpiaIncome({ min: Math.round(monthlyIncome * 0.95), max: Math.round(monthlyIncome * 1.05) });
    }, [spiaAge, spiaLumpSum]);

    const calculateMyga = useCallback(() => {
        const selected = mygaLadderData.filter(term => mygaTerms[term.term]);
        if (selected.length === 0) { setBlendedYield(0); return; }
        const totalRate = selected.reduce((acc, term) => acc + term.rate, 0);
        setBlendedYield((totalRate / selected.length).toFixed(2));
    }, [mygaTerms]);

    const calculateFia = useCallback((marketReturn = 12) => {
        const gain = marketReturn * (fiaPar / 100);
        const credited = Math.max(0, Math.min(gain, fiaCap));
        setFiaCredited(credited.toFixed(2));
    }, [fiaCap, fiaPar]);

    useEffect(() => {
        calculateSpia();
        calculateMyga();
        calculateFia();
    }, [calculateSpia, calculateMyga, calculateFia]);

    useEffect(() => { calculateMyga(); }, [calculateMyga]);

    const faqData = useMemo(() => [
        { question: "What is an annuity?", answer: "An annuity is a contract between you and an insurance company where you make a payment (or series of payments) and, in return, receive regular disbursements, either immediately or in the future. They are primarily used for retirement income, offering tax-deferred growth and a guaranteed stream of payments." },
        { question: "Are annuities FDIC insured?", answer: "No. They are insurance products, backed by the financial strength and claims-paying ability of the issuing insurer. Unlike bank deposits, annuities are not covered by FDIC insurance but are regulated by state insurance departments." },
        { question: "Will I lose money in an FIA?", answer: "You can't lose value due to market downturns thanks to the 0% floor protection, but policy charges and surrender fees may apply. Your principal and previously credited interest are protected from market losses." },
        { question: "How do annuity bonuses work?", answer: "Some products offer premium bonuses, subject to vesting schedules, recapture rules, and product limitations. The bonus is typically added to your accumulation value but may be forfeited if you surrender the policy early." },
        { question: "What taxes apply to annuities?", answer: "Withdrawals are taxed as ordinary income; withdrawals before age 59½ may incur a 10% federal penalty. The growth within the annuity is tax-deferred, meaning you don't pay taxes until you make withdrawals." },
        { question: "When can I access the money in my annuity?", answer: "Most annuities have a 'surrender period' (e.g., 3-10 years) during which withdrawals are subject to a fee. Many contracts allow for penalty-free withdrawals of up to 10% of the account value annually. After the surrender period ends, you have full access without fees from the insurer." },
    ], []);

    useEffect(() => {
        const scriptId = 'faq-schema';
        document.getElementById(scriptId)?.remove();
        const script = document.createElement('script');
        script.id = scriptId;
        script.type = 'application/ld+json';
        const faqSchema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqData.map(faq => ({ "@type": "Question", "name": faq.question, "acceptedAnswer": { "@type": "Answer", "text": faq.answer } }))
        };
        script.textContent = JSON.stringify(faqSchema);
        document.head.appendChild(script);
        return () => { document.getElementById(scriptId)?.remove(); };
    }, [faqData]);

    const [leadForm, setLeadForm] = useState({ firstName: '', phone: '', email: '' });
    const [leadSubmitting, setLeadSubmitting] = useState(false);
    const [leadSubmitted, setLeadSubmitted] = useState(false);

    const handleLeadSubmit = async (e) => {
        e.preventDefault();
        setLeadSubmitting(true);
        await base44.entities.Lead.create({
            firstName: leadForm.firstName,
            phone: leadForm.phone,
            email: leadForm.email,
            productType: 'annuity',
            type: 'quote',
            status: 'new',
            submissionDate: new Date().toISOString(),
            path: window.location.pathname,
            transactionalSmsConsent: leadForm.transactionalSmsConsent || false,
            promotionalSmsConsent: leadForm.promotionalSmsConsent || false,
            consentAt: new Date().toISOString(),
        });
        setLeadSubmitted(true);
        setLeadSubmitting(false);
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 lg:py-32 overflow-hidden" style={{ background: `linear-gradient(135deg, ${DARK1} 0%, ${DARK2} 100%)` }}>
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
                </div>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
                            What If You <span className="text-blue-300">Outlive Your Savings?</span>
                        </h1>
                        <p className="text-xl text-slate-200 mb-8">
                            The #1 retirement fear isn't dying too soon — it's running out of money too late. Annuities are the only financial product that can guarantee you an income you literally cannot outlive. We'll show you how.
                        </p>
                        <Card className="bg-white/95 backdrop-blur-sm">
                            <CardContent className="p-6">
                                {leadSubmitted ? (
                                    <div className="text-center py-4">
                                        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                                            <Check className="w-7 h-7 text-green-600" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-1">You're all set!</h3>
                                        <p className="text-slate-500 text-sm">A licensed specialist will reach out within 1 business day.</p>
                                        <a href="tel:9545430853" className="block mt-3 text-sm font-semibold" style={{ color: DARK2 }}>
                                            Or call now: (954) 543-0853
                                        </a>
                                    </div>
                                ) : (
                                    <>
                                        <h3 className="text-lg font-bold text-slate-900 mb-1">See What a Guaranteed Income Looks Like For You</h3>
                                        <p className="text-slate-500 text-sm mb-4">Free · No obligation · Takes 30 seconds</p>
                                        <form onSubmit={handleLeadSubmit} className="space-y-3">
                                            <Input
                                                placeholder="First Name"
                                                required
                                                value={leadForm.firstName}
                                                onChange={e => setLeadForm({ ...leadForm, firstName: e.target.value })}
                                            />
                                            <Input
                                                type="tel"
                                                placeholder="Phone Number"
                                                required
                                                value={leadForm.phone}
                                                onChange={e => setLeadForm({ ...leadForm, phone: e.target.value })}
                                            />
                                            <Input
                                                type="email"
                                                placeholder="Email Address"
                                                required
                                                value={leadForm.email}
                                                onChange={e => setLeadForm({ ...leadForm, email: e.target.value })}
                                            />
                                            <div className="space-y-3 bg-gray-50 rounded-lg p-3 mt-1">
                                                <div className="flex items-start gap-2">
                                                    <input
                                                        type="checkbox"
                                                        id="ann-trans"
                                                        checked={leadForm.transactionalSmsConsent || false}
                                                        onChange={e => setLeadForm({ ...leadForm, transactionalSmsConsent: e.target.checked })}
                                                        className="mt-0.5 flex-shrink-0 w-4 h-4"
                                                    />
                                                    <label htmlFor="ann-trans" className="text-xs leading-relaxed text-gray-600 cursor-pointer">
                                                        By submitting, you authorize LIFEHEALTHINC LLC to text/call the number above for informational/transactional messages, possibly using automated means. Msg/data rates apply, msg frequency varies. Consent is not a condition of purchase. <a href="/terms" className="text-blue-600 underline hover:text-blue-800">See terms</a> and <a href="/privacy" className="text-blue-600 underline hover:text-blue-800">privacy policy</a>. Text HELP for help and STOP to unsubscribe.
                                                    </label>
                                                </div>
                                                <div className="flex items-start gap-2">
                                                    <input
                                                        type="checkbox"
                                                        id="ann-promo"
                                                        checked={leadForm.promotionalSmsConsent || false}
                                                        onChange={e => setLeadForm({ ...leadForm, promotionalSmsConsent: e.target.checked })}
                                                        className="mt-0.5 flex-shrink-0 w-4 h-4"
                                                    />
                                                    <label htmlFor="ann-promo" className="text-xs leading-relaxed text-gray-600 cursor-pointer">
                                                        By submitting, you authorize LIFEHEALTHINC LLC to text/call the number above for promotional messages, possibly using automated means. Msg/data rates apply, msg frequency varies. Consent is not a condition of purchase. <a href="/terms" className="text-blue-600 underline hover:text-blue-800">See terms</a> and <a href="/privacy" className="text-blue-600 underline hover:text-blue-800">privacy policy</a>. Text HELP for help and STOP to unsubscribe.
                                                    </label>
                                                </div>
                                            </div>
                                            <Button type="submit" disabled={leadSubmitting} size="lg" className="w-full font-bold" style={{ backgroundColor: DARK2, color: '#FFFFFF' }}>
                                                {leadSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                                Get My Free Quote <ArrowRight className="w-4 h-4 ml-2" />
                                            </Button>
                                        </form>

                                    </>
                                )}
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
                            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-3"><Award className="w-8 h-8 text-blue-600" /></div>
                            <h3 className="font-semibold text-slate-900">Licensed Specialists</h3>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-3"><TrendingUp className="w-8 h-8 text-green-600" /></div>
                            <h3 className="font-semibold text-slate-900">A-Rated Carriers</h3>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-3"><Lock className="w-8 h-8 text-purple-600" /></div>
                            <h3 className="font-semibold text-slate-900">Principal Protection</h3>
                        </div>
                    </div>
                </div>
            </section>

            {/* Remaining page content uses dark background */}
            <div style={{ background: `linear-gradient(135deg, ${DARK1} 0%, ${DARK2} 100%)` }}>

                {/* Strategy Cards */}
                <section className="py-16">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {services.map((service) => (
                                <a href={service.link} key={service.id} className="block group">
                                    <Card className="h-full flex flex-col bg-white/5 border-white/20 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(26,53,134,0.5)]">
                                        <CardHeader className="text-center">
                                            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                                                <service.icon className="w-6 h-6 text-white" />
                                            </div>
                                            <CardTitle className="text-lg">{service.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent className="flex-grow flex flex-col text-center">
                                            <p className="text-slate-200 text-sm mb-4 flex-grow font-medium">{service.description}</p>
                                            <span className="font-semibold text-sm mt-auto text-blue-300">👉 Learn More →</span>
                                        </CardContent>
                                    </Card>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Premium Bonus Section */}
                <section id="bonus-explainer" className="py-16 bg-slate-900/50">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ backgroundColor: DARK2, color: '#FFFFFF' }}>
                            <Award className="w-5 h-5" />
                            <span className="text-sm font-bold">LIMITED TIME</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                            Your $100,000 Becomes $120,000 on Day One
                        </h2>
                        <p className="text-xl text-slate-100 max-w-3xl mx-auto mb-8 font-medium">
                            Select Fixed Indexed Annuities offer a 20% premium bonus the moment you fund the policy — so your retirement savings get an instant head start before any market growth even begins.
                        </p>

                        <Card className="bg-white/10 border-white/20 text-white rounded-2xl shadow-lg p-6 max-w-md mx-auto mb-8">
                            <h4 className="text-lg font-semibold mb-2 text-white">Illustrative Example</h4>
                            <div className="flex items-center justify-center gap-4">
                                <div className="text-center">
                                    <p className="text-2xl font-bold">$100,000</p>
                                    <p className="text-sm text-slate-400">Your Premium</p>
                                </div>
                                <ArrowRight className="w-8 h-8 text-slate-400" />
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-green-400">$120,000</p>
                                    <p className="text-sm text-slate-400">Day 1 Accumulation Value</p>
                                </div>
                            </div>
                        </Card>

                        <Button asChild size="lg" className="font-bold rounded-2xl shadow-lg mb-8" style={{ backgroundColor: DARK2, color: '#FFFFFF' }}>
                            <Link to={createPageUrl("Calculator")}>
                                See Bonus-Eligible Options
                            </Link>
                        </Button>

                        <div className="text-left max-w-2xl mx-auto text-slate-400 text-sm space-y-4">
                            <h4 className="font-semibold text-slate-200 text-base text-center">Compliance & Suitability Notes:</h4>
                            <ul className="list-disc list-inside space-y-2">
                                <li>The premium bonus is subject to a <strong>vesting schedule</strong> and may be recaptured by the insurer upon early surrender.</li>
                                <li>Bonus may not apply to amounts taken as <strong>penalty-free withdrawals</strong> during the surrender period.</li>
                                <li>Application of the bonus to the <strong>income base</strong> varies by contract and is not guaranteed.</li>
                                <li>A higher bonus may be offset by lower caps, lower participation rates, or higher fees elsewhere in the contract.</li>
                            </ul>
                            <p className="text-xs text-center italic pt-4">This is a hypothetical example for illustrative purposes only and is not a guarantee of future results. Annuity products are subject to carrier approval and state availability.</p>
                        </div>
                    </div>
                </section>

                {/* FIA Explainer */}
                <section id="fia-explainer" className="py-16">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-black mb-4 text-white">Fixed Indexed Annuities (FIAs)</h2>
                            <p className="text-slate-100 mb-4 font-medium">FIAs offer growth potential linked to market index performance without the risk of losing your principal. Your money is never directly in the market.</p>
                            <ul className="text-slate-300 space-y-2">
                                <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-400 mt-1" /><span className="text-slate-100"><strong>Upside Potential:</strong> Earn interest when the market goes up, up to a 'cap' or 'participation rate'.</span></li>
                                <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-400 mt-1" /><span className="text-slate-100"><strong>Downside Protection:</strong> A 0% floor guarantees you will never lose money due to market downturns.</span></li>
                            </ul>
                        </div>
                        <Card className="bg-white/5 border-white/20 text-white rounded-2xl shadow-lg p-4">
                            <h4 className="text-center font-semibold mb-2">Market vs. FIA Crediting with 20% Bonus</h4>
                            <ResponsiveContainer width="100%" height={250}>
                                <AreaChart data={fiaChartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                    <XAxis dataKey="year" stroke="#94a3b8" tick={{ fontSize: 12 }} />
                                    <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} domain={[80, 140]} unit="$k" scale="linear" />
                                    <RechartsTooltip contentStyle={{ backgroundColor: DARK1, border: '1px solid rgba(255,255,255,0.3)' }} labelStyle={{ color: 'white' }} />
                                    <Legend wrapperStyle={{ fontSize: "12px" }} />
                                    <defs>
                                        <linearGradient id="colorCredited" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor={DARK3} stopOpacity={0.8} />
                                            <stop offset="95%" stopColor={DARK3} stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <Area type="monotone" dataKey="credited" stroke="#FFFFFF" fillOpacity={1} fill="url(#colorCredited)" name="FIA Value" unit="$k" />
                                    <Line type="monotone" dataKey="floor" stroke="#34d399" strokeDasharray="5 5" name="Principal Floor" unit="$k" dot={false} />
                                </AreaChart>
                            </ResponsiveContainer>
                            <p className="text-xs text-slate-400 text-center mt-2">You never earn less than 0% in a crediting year, even if the market is down. Bonus increases starting accumulation value; credits still subject to caps/participation; early surrender may trigger recapture.</p>
                        </Card>
                    </div>
                </section>

                {/* MYGA Explainer */}
                <section id="myga-explainer" className="py-16">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
                        <Card className="bg-white/5 border-white/20 text-white rounded-2xl shadow-lg p-4 order-2 md:order-1">
                            <h4 className="text-center font-semibold mb-4">MYGA Rate Ladder</h4>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={mygaLadderData} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                    <XAxis type="number" stroke="#94a3b8" tick={{ fontSize: 12 }} domain={[4, 6]} tickFormatter={(val) => `${val}%`} />
                                    <YAxis type="category" dataKey="term" stroke="#94a3b8" tick={{ fontSize: 12 }} width={50} />
                                    <RechartsTooltip cursor={{ fill: 'rgba(26,53,134,0.2)' }} contentStyle={{ backgroundColor: DARK1, border: '1px solid rgba(255,255,255,0.3)' }} labelStyle={{ color: 'white' }} />
                                    <Bar dataKey="rate" fill={DARK3} background={{ fill: 'rgba(255,255,255,0.05)' }} name="Guaranteed Rate" />
                                </BarChart>
                            </ResponsiveContainer>
                            <p className="text-xs text-slate-400 text-center mt-2">Predictable rates, no market volatility. Educational purposes only.</p>
                        </Card>
                        <div className="order-1 md:order-2">
                            <h2 className="text-3xl font-black mb-4 text-white">Multi-Year Guaranteed Annuities (MYGAs)</h2>
                            <p className="text-slate-100 mb-4 font-medium">Think of a MYGA as a CD alternative from an insurance company. You get a guaranteed, fixed interest rate for a specified number of years (typically 3-10), and your earnings grow tax-deferred.</p>
                            <ul className="text-slate-300 space-y-2">
                                <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-400 mt-1" /><span className="text-slate-100"><strong>Predictable Returns:</strong> Your rate is locked in for the entire term.</span></li>
                                <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-400 mt-1" /><span className="text-slate-100"><strong>Tax Deferral:</strong> You don't pay taxes on interest earnings until you withdraw them.</span></li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* SPIA Explainer */}
                <section id="spia-explainer" className="py-16 bg-slate-900/50">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-black mb-4 text-white">Immediate Income Annuities (SPIAs)</h2>
                            <p className="text-slate-100 mb-4 font-medium">A SPIA is the simplest way to create a personal pension. You make one lump-sum payment to an insurance company, and in return, they provide you with a guaranteed stream of income for a chosen period, often for the rest of your life.</p>
                            <ul className="text-slate-300 space-y-2">
                                <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-400 mt-1" /><span className="text-slate-100"><strong>Longevity Insurance:</strong> Protects you from the risk of outliving your savings.</span></li>
                                <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-400 mt-1" /><span className="text-slate-100"><strong>Simplicity:</strong> Set it up once and receive reliable, predictable payments.</span></li>
                            </ul>
                        </div>
                        <Card className="bg-white/5 border-white/20 text-white rounded-2xl shadow-lg p-6">
                            <h4 className="text-center font-semibold mb-6">Income Timeline</h4>
                            <div className="flex items-center justify-center gap-2">
                                <div className="text-center">
                                    <div className="p-4 rounded-lg bg-blue-700/50 border border-blue-400">
                                        <p className="font-bold">Lump Sum</p>
                                    </div>
                                    <p className="text-xs mt-1">e.g., $250,000</p>
                                </div>
                                <ArrowRight className="w-8 h-8 text-slate-400 flex-shrink-0 mx-2" />
                                <div className="flex flex-col gap-2">
                                    <div className="p-2 rounded-lg bg-green-600/50 border border-green-400 text-center"><p className="font-semibold text-sm">Monthly Check</p></div>
                                    <div className="p-2 rounded-lg bg-green-600/50 border border-green-400 text-center"><p className="font-semibold text-sm">Monthly Check</p></div>
                                    <p className="text-center text-slate-400">...</p>
                                    <p className="text-center text-slate-400">(For Life)</p>
                                </div>
                            </div>
                            <p className="text-xs text-slate-400 text-center mt-4">Guarantees lifetime income backed by the insurer's claims-paying ability.</p>
                        </Card>
                    </div>
                </section>

                {/* Self-Insurance Explainer */}
                <section id="self-insurance-explainer" className="py-16">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl font-black mb-4 text-white">Self-Insurance Strategies</h2>
                        <p className="text-slate-100 mb-8 font-medium">While annuities provide guarantees, a "self-insured" approach relies on your own savings and investments. This offers maximum flexibility but requires discipline and carries market risk.</p>
                        <div className="grid sm:grid-cols-3 gap-6">
                            <Card className="bg-white/5 border-white/20 text-white rounded-2xl p-4">
                                <Briefcase className="w-8 h-8 mx-auto mb-2 text-blue-300" />
                                <h4 className="font-semibold">Emergency Fund</h4>
                                <p className="text-xs text-slate-400">3-6 months of living expenses in a liquid, high-yield savings account.</p>
                            </Card>
                            <Card className="bg-white/5 border-white/20 text-white rounded-2xl p-4">
                                <PlusCircle className="w-8 h-8 mx-auto mb-2 text-blue-300" />
                                <h4 className="font-semibold">Health Savings Account (HSA)</h4>
                                <p className="text-xs text-slate-400">A tax-advantaged account for medical costs, which can be invested for long-term growth.</p>
                            </Card>
                            <Card className="bg-white/5 border-white/20 text-white rounded-2xl p-4">
                                <MinusCircle className="w-8 h-8 mx-auto mb-2 text-blue-300" />
                                <h4 className="font-semibold">High Deductible Plan</h4>
                                <p className="text-xs text-slate-400">Lower monthly premiums, paired with an HSA, to cover potential out-of-pocket costs.</p>
                            </Card>
                        </div>
                        <p className="text-xs text-slate-400 text-center mt-6">Build your own cushion for life's surprises.</p>
                    </div>
                </section>

                {/* Comparison Table */}
                <section className="py-16 bg-slate-900/50">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-black text-center mb-8 text-white">Strategy Comparison</h2>
                        <TooltipProvider>
                            <div className="hidden md:block">
                                <table className="w-full text-left text-white border-collapse">
                                    <thead className="sticky top-0 bg-slate-900/80 backdrop-blur-sm">
                                        <tr>
                                            <th className="p-4 font-semibold border-b border-white/20">Feature</th>
                                            <th className="p-4 font-semibold border-b border-white/20">FIA</th>
                                            <th className="p-4 font-semibold border-b border-white/20">MYGA</th>
                                            <th className="p-4 font-semibold border-b border-white/20">SPIA</th>
                                            <th className="p-4 font-semibold border-b border-white/20">Self-Insurance</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/10">
                                        {comparisonData.map((row) => (
                                            <tr key={row.feature}>
                                                <td className="p-4 font-medium">{row.feature}</td>
                                                <td className="p-4 text-slate-300">
                                                    {row.feature === 'Upfront Bonus Available?' ? (
                                                        <ShadTooltip>
                                                            <TooltipTrigger asChild>
                                                                <span className="border-b border-dashed border-slate-500 cursor-help">{row.fia}</span>
                                                            </TooltipTrigger>
                                                            <TooltipContent className="bg-slate-800 text-white border-slate-600 max-w-xs p-3 rounded-lg">
                                                                <p className="font-semibold mb-1">Understanding the Bonus:</p>
                                                                <p>Bonus is added to accumulation value but is typically subject to a vesting schedule. Early surrender may result in recapture (forfeiture) of the bonus.</p>
                                                            </TooltipContent>
                                                        </ShadTooltip>
                                                    ) : row.fia}
                                                </td>
                                                <td className="p-4 text-slate-300">{row.myga}</td>
                                                <td className="p-4 text-slate-300">{row.spia}</td>
                                                <td className="p-4 text-slate-300">{row.self}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="md:hidden">
                                <Accordion type="single" collapsible className="w-full">
                                    {comparisonData.map(row => (
                                        <AccordionItem key={row.feature} value={row.feature} className="border-b-slate-600">
                                            <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline text-white">{row.feature}</AccordionTrigger>
                                            <AccordionContent className="text-slate-300 space-y-2 px-2">
                                                <p><strong>FIA:</strong> {row.feature === 'Upfront Bonus Available?' ? (
                                                    <ShadTooltip>
                                                        <TooltipTrigger asChild><span className="border-b border-dashed border-slate-500 cursor-help">{row.fia}</span></TooltipTrigger>
                                                        <TooltipContent className="bg-slate-800 text-white border-slate-600 max-w-xs p-3 rounded-lg">
                                                            <p className="font-semibold mb-1">Understanding the Bonus:</p>
                                                            <p>Bonus is added to accumulation value but is typically subject to a vesting schedule. Early surrender may result in recapture (forfeiture) of the bonus.</p>
                                                        </TooltipContent>
                                                    </ShadTooltip>
                                                ) : row.fia}</p>
                                                <p><strong>MYGA:</strong> {row.myga}</p>
                                                <p><strong>SPIA:</strong> {row.spia}</p>
                                                <p><strong>Self-Insurance:</strong> {row.self}</p>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </div>
                        </TooltipProvider>
                    </div>
                </section>

                {/* Newsletter Signup */}
                <section className="py-8">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <NewsletterSignup variant="mid-page" />
                    </div>
                </section>

                {/* Calculator Widgets */}
                <section className="py-16">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-black text-center mb-8 text-white">Interactive Tools</h2>
                        <div className="grid lg:grid-cols-3 gap-8">
                            <Card className="bg-white/5 border-white/20 text-white rounded-2xl shadow-lg">
                                <CardHeader><CardTitle className="text-lg">SPIA Income Estimator</CardTitle></CardHeader>
                                <CardContent className="space-y-4">
                                    <div><Label>Your Age</Label><Input type="number" value={spiaAge} onChange={e => setSpiaAge(Number(e.target.value))} className="bg-slate-800 border-slate-600" /></div>
                                    <div><Label>Lump Sum Amount</Label><Input type="number" value={spiaLumpSum} onChange={e => setSpiaLumpSum(Number(e.target.value))} className="bg-slate-800 border-slate-600" /></div>
                                    <Button onClick={calculateSpia} className="w-full" style={{ backgroundColor: DARK2, color: '#FFFFFF' }}>Estimate Income</Button>
                                    {spiaIncome && <div className="text-center bg-slate-800 p-3 rounded-lg"><p className="text-sm">Estimated Monthly Income:</p><p className="font-bold text-lg text-green-400">${spiaIncome.min.toLocaleString()} - ${spiaIncome.max.toLocaleString()}</p></div>}
                                    <p className="text-xs text-slate-400 text-center">Educational only; not a guarantee.</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-white/5 border-white/20 text-white rounded-2xl shadow-lg">
                                <CardHeader><CardTitle className="text-lg">MYGA Ladder Builder</CardTitle></CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-2">
                                        {mygaLadderData.map(term => (
                                            <div key={term.term} className={`p-2 rounded-lg text-center cursor-pointer border ${mygaTerms[term.term] ? 'bg-blue-700/30 border-blue-400' : 'border-slate-600'}`} onClick={() => setMygaTerms(p => ({ ...p, [term.term]: !p[term.term] }))}>
                                                <p className="font-semibold">{term.term}</p>
                                                <p className="text-xs">{term.rate}%</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="text-center bg-slate-800 p-3 rounded-lg"><p className="text-sm">Blended Yield:</p><p className="font-bold text-lg text-green-400">{blendedYield}%</p></div>
                                    <p className="text-xs text-slate-400 text-center">Shows average yield of selected terms.</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-white/5 border-white/20 text-white rounded-2xl shadow-lg">
                                <CardHeader><CardTitle className="text-lg">FIA Credit Demo</CardTitle></CardHeader>
                                <CardContent className="space-y-4">
                                    <div><Label>Cap Rate: {fiaCap}%</Label><Slider value={[fiaCap]} onValueChange={(v) => setFiaCap(v[0])} max={12} min={5} step={0.5} /></div>
                                    <div><Label>Participation Rate: {fiaPar}%</Label><Slider value={[fiaPar]} onValueChange={(v) => setFiaPar(v[0])} max={100} min={50} step={10} /></div>
                                    <Button onClick={() => calculateFia()} className="w-full" style={{ backgroundColor: DARK2, color: '#FFFFFF' }}>Run Demo (12% Market Gain)</Button>
                                    {fiaCredited !== null && <div className="text-center bg-slate-800 p-3 rounded-lg"><p className="text-sm">Credited Interest:</p><p className="font-bold text-lg text-green-400">{fiaCredited}%</p></div>}
                                    <p className="text-xs text-slate-400 text-center">Shows credited interest for one year.</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Carrier Strip */}
                <section className="py-16">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h3 className="text-2xl font-bold mb-8 text-white">We work with A-Rated carriers to provide multiple retirement solutions</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-x-8 gap-y-12 items-center">
                            {carrierLogos.map((carrier) => (
                                <div key={carrier.name}><img src={carrier.imageUrl} alt={`Carrier: ${carrier.name} logo`} className="max-h-12 mx-auto transition-transform duration-300 hover:scale-110 filter brightness-0 invert hover:filter hover:brightness-100 hover:invert-0" /></div>
                            ))}
                        </div>
                        <p className="text-sm text-slate-400 mt-8">Product features vary by state.</p>
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-16 bg-slate-900/50">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-black text-center mb-8 text-white">Frequently Asked Questions</h2>
                        <Accordion type="single" collapsible className="w-full">
                            {faqData.map((faq, index) => (
                                <AccordionItem key={index} value={`item-${index}`} className="border-b-slate-600">
                                    <AccordionTrigger className="text-left text-lg hover:no-underline text-white">{faq.question}</AccordionTrigger>
                                    <AccordionContent className="text-slate-300 prose prose-invert max-w-none">{faq.answer}</AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </section>

                {/* Disclosures */}
                <section className="py-16">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="disclosures" className="border-b-slate-600">
                                <AccordionTrigger className="text-lg font-semibold hover:no-underline text-white">Important Annuity Disclosures</AccordionTrigger>
                                <AccordionContent className="text-slate-400 text-sm">{disclosures}</AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </section>

                {/* Bottom CTA */}
                <section className="py-16 text-center">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-black mb-4 text-white">Stop Hoping Your Savings Last. Guarantee They Do.</h2>
                        <p className="text-xl text-slate-100 mb-8 font-medium">Our licensed annuity specialists will run a personalized illustration showing exactly what your guaranteed income could look like — at no cost and zero obligation.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button asChild size="lg" className="font-bold rounded-2xl shadow-lg" style={{ backgroundColor: DARK2, color: '#FFFFFF' }}>
                                <Link to={createPageUrl("Calculator")}>
                                    <Calendar className="w-5 h-5 mr-2" />
                                    Book My Free Consultation
                                </Link>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="font-bold rounded-2xl border-2 border-white/50 text-white hover:bg-white/10 bg-transparent">
                                <Link to={createPageUrl("IULStructuring")}>
                                    Ask About IUL Structuring
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}