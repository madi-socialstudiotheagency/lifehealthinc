import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import {
  Shield, Heart, Home as HomeIcon, Users, TrendingUp, DollarSign,
  Phone, Calendar, CheckCircle, Sparkles, Activity, Stethoscope,
  FileText, ChevronRight, Star, ArrowRight, Award, Lock, Clock
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import NewsletterModal from '../components/NewsletterModal';
import TestimonialSlider from '../components/TestimonialSlider';
import ReferralForm from '../components/ReferralForm';

// ─── Brand tokens ────────────────────────────────────────────────────────────
const GOLD   = '#FFFFFF';
const DARK1  = '#081730';
const DARK2  = '#1A3586';
const DARK3  = '#3D6B9E';

// ─── Helpers ─────────────────────────────────────────────────────────────────
const SectionLabel = ({ children }) => (
  <div className="flex items-center justify-center gap-3 mb-4">
    <div className="h-px w-8 rounded-full" style={{ background: `linear-gradient(90deg,transparent,${GOLD})` }} />
    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: GOLD }}>{children}</span>
    <div className="h-px w-8 rounded-full" style={{ background: `linear-gradient(90deg,${GOLD},transparent)` }} />
  </div>
);

const GoldDivider = () => (
  <div className="max-w-6xl mx-auto px-4">
    <div className="h-px w-full" style={{ background: `linear-gradient(90deg,transparent,${GOLD}40,transparent)` }} />
  </div>
);

// ─── Services ────────────────────────────────────────────────────────────────
const services = [
  { id: 'life_insurance',     title: 'Life Insurance',      description: 'Term, whole life, and IUL policies to protect your family\'s income and future.', icon: Heart,       page: 'LifeInsurance',    cta: 'Explore Life Insurance' },
  { id: 'health_insurance',   title: 'Health Insurance',    description: 'ACA marketplace, group health, and short-term plans for individuals and families.', icon: Activity,    page: 'HealthInsurance',  cta: 'Explore Health Plans' },
  { id: 'medicare',           title: 'Medicare',            description: 'Medicare Advantage, Supplement (Medigap), and Part D — we shop all carriers for you.', icon: Stethoscope, page: 'Medicare',         cta: 'Review Medicare Options' },
  { id: 'annuities',          title: 'Annuities & AUM',     description: 'Fixed indexed annuities and income strategies to make your retirement bulletproof.', icon: TrendingUp,   page: 'Annuities',        cta: 'Build Retirement Income' },
  { id: 'mortgage',           title: 'Mortgage Protection', description: 'Keep your family in their home if the unexpected happens. Coverage that pays the mortgage.', icon: HomeIcon, page: 'MortgageProtection', cta: 'Protect My Home' },
  { id: 'final_expense',      title: 'Final Expense',       description: 'Simple, affordable whole-life policies that cover end-of-life costs with no medical exam.', icon: Shield,  page: 'FinalExpense',     cta: 'Get Final Expense Quote' },
];

// ─── Audience segments ───────────────────────────────────────────────────────
const audiences = [
  {
    title: 'Turning 65 Soon?',
    subtitle: 'Medicare Guidance',
    description: 'Navigating Medicare is confusing. We compare every plan — Advantage, Supplement, and Part D — at no cost to you, so you pick the right one the first time.',
    icon: Users,
    page: 'Medicare',
    cta: 'Review My Medicare Options',
    color: '#10b981',
  },
  {
    title: 'Protecting Your Family?',
    subtitle: 'Life & Health Insurance',
    description: 'From term life to permanent coverage, we shop 20+ top-rated carriers to find affordable protection for the people who depend on you most.',
    icon: Heart,
    page: 'LifeInsurance',
    cta: 'Protect My Family',
    color: '#1A3586',
  },
  {
    title: 'Planning for Retirement?',
    subtitle: 'Annuities & Income Strategy',
    description: 'Create guaranteed income you can\'t outlive. We specialize in fixed indexed annuities and retirement strategies that protect against market risk.',
    icon: TrendingUp,
    page: 'Annuities',
    cta: 'Build My Retirement Plan',
    color: '#818cf8',
  },
  {
    title: 'Own a Business?',
    subtitle: 'Group Benefits & Key-Man',
    description: 'Group health benefits, disability coverage, and key-man life insurance to attract top talent and protect your most important asset — your business.',
    icon: Award,
    page: 'Partners',
    cta: 'Explore Business Solutions',
    color: '#f472b6',
  },
];

// ─── Trust stats ─────────────────────────────────────────────────────────────
const stats = [
  { value: '50',   label: 'States Licensed' },
  { value: '20+',  label: 'Carrier Partners' },
  { value: '100%', label: 'Independent & Unbiased' },
  { value: '$0',   label: 'Consultation Fee' },
];

// ─── Why us ──────────────────────────────────────────────────────────────────
const whyUs = [
  { icon: Lock,     title: 'Independent Brokers',   desc: 'We\'re not captive agents. We work for YOU — not any single insurance company — so you always get an unbiased recommendation.' },
  { icon: Award,    title: 'Licensed in All 50 States', desc: 'Our team holds active licenses nationwide. Whether you\'re in Florida, Texas, or California, we\'re able to serve you.' },
  { icon: Clock,    title: 'Fast, No-Pressure Process', desc: 'Most clients have quotes in under 24 hours. No hard selling — just clear information and a path to the right coverage.' },
  { icon: DollarSign, title: 'No Cost to You',       desc: 'Our brokerage fee is paid by the carrier. Your quote, consultation, and ongoing service are completely free.' },
];

// ─── FAQs ─────────────────────────────────────────────────────────────────────
const faqs = [
  { q: 'Is your consultation really free?',             a: 'Yes — 100%. Our compensation comes from the carrier after you enroll in a plan. You pay nothing for our time, recommendations, or ongoing support.' },
  { q: 'How do I know you\'re recommending the best plan?', a: 'Because we\'re independent brokers, we have no incentive to steer you toward one carrier. We shop 20+ top-rated carriers and show you your top options side by side.' },
  { q: 'Can you help someone in my state?',             a: 'Yes. Our team is licensed in all 50 states, so we can help you wherever you live — entirely by phone or video call if you prefer.' },
  { q: 'I already have coverage. Can you still help?',  a: 'Absolutely. We do free policy reviews all the time. Many clients find they\'re overpaying or underinsured. A second opinion costs nothing.' },
  { q: 'What is the difference between Medicare Advantage and Medicare Supplement?', a: 'Medicare Advantage replaces Original Medicare with an all-in-one plan. Medicare Supplement (Medigap) works alongside Original Medicare to fill coverage gaps. The right choice depends on your health, budget, and preferred doctors — we\'ll walk you through both.' },
  { q: 'What is an IUL and is it right for me?',        a: 'An Indexed Universal Life (IUL) policy is a permanent life insurance product that builds tax-deferred cash value linked to a market index — with a floor of 0%, so you can\'t lose principal to market crashes. It\'s a powerful retirement supplement for the right client. Book a free call and we\'ll show you an illustration.' },
];

// ─── Carrier logos ────────────────────────────────────────────────────────────
const carriers = [
  { name: 'Mutual of Omaha', logo: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c1ca7c80a1472f1eb4424c/abb98e4f5_image.png' },
  { name: 'Aetna',           logo: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c1ca7c80a1472f1eb4424c/32c6dfb53_image.png' },
  { name: 'United of Omaha', logo: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c1ca7c80a1472f1eb4424c/4e8d0fa6d_image.png' },
  { name: 'Allianz',         logo: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c1ca7c80a1472f1eb4424c/a5a3e4686_image.png' },
  { name: 'Athene',          logo: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c1ca7c80a1472f1eb4424c/f558b5fce_image.png' },
  { name: 'North American',  logo: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c1ca7c80a1472f1eb4424c/ed0abeff7_image.png' },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function Home() {
  const [showNewsletter, setShowNewsletter] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowNewsletter(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="overflow-x-hidden">
      <style>{`
        @keyframes fadeInUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes shimmer{0%,100%{opacity:.6}50%{opacity:1}}
        .fade-in-up{animation:fadeInUp .7s ease both}
        .delay-1{animation-delay:.1s}
        .delay-2{animation-delay:.2s}
        .delay-3{animation-delay:.3s}
        .delay-4{animation-delay:.4s}
        .carrier-strip{display:flex;gap:2rem;animation:scroll 28s linear infinite}
        .carrier-strip img{filter:brightness(0) invert(1);opacity:.45;transition:opacity .3s;height:28px;object-fit:contain}
        .carrier-strip img:hover{opacity:.9}
        @keyframes scroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
      `}</style>

      {/* ═══ HERO ════════════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-[92vh] flex items-center justify-center text-white overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${DARK1} 0%, ${DARK2} 60%, ${DARK3} 100%)` }}
      >
        {/* Grid overlay */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage:`linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px)`, backgroundSize:'60px 60px' }} />
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background:`radial-gradient(circle,${GOLD}15,transparent 70%)`, transform:'translateY(-30%) translateX(-50%)' }} />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
          {/* New / Existing Client */}
          <div className="flex items-center justify-center gap-2 mb-6 fade-in-up">
          <Link to="/quote" className="text-sm font-semibold px-5 py-2 rounded-full border transition-colors" style={{ borderColor: `${GOLD}40`, color: GOLD, background: `${GOLD}12` }}>
          New Client
          </Link>
          <Link to={createPageUrl("Clients")} className="text-sm font-semibold px-5 py-2 rounded-full bg-white text-slate-900 hover:bg-slate-100 transition-colors">
          Existing Client
          </Link>
          </div>
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 text-xs font-bold uppercase tracking-widest fade-in-up"
            style={{ background:`${GOLD}18`, border:`1px solid ${GOLD}40`, color:GOLD }}>
            <Sparkles className="w-3.5 h-3.5" />
            Licensed in All 50 States · Independent Brokers · No Cost to You
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight fade-in-up delay-1">
            The Coverage You Need.
            <br />
            <span style={{ color: '#60A5FA' }}>
              The Price You Deserve.
            </span>
          </h1>


          <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in-up delay-3">
            <Button
              asChild
              size="lg"
              className="font-bold text-base px-8 py-6 rounded-xl shadow-lg"
              style={{ background:`linear-gradient(135deg, #1A3586, #3D6B9E)`, color:'#FFFFFF' }}
            >
              <Link to="/quote">
                <Calendar className="w-5 h-5 mr-2" />
                Book a Free Consultation
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="font-bold text-base px-8 py-6 rounded-xl"
              style={{ borderColor:`${GOLD}60`, color:GOLD, background:'transparent' }}
            >
              <Link to="/quote">
                <Phone className="w-5 h-5 mr-2" />
                Request Free Quotes
              </Link>
            </Button>
          </div>
          <div className="flex justify-center fade-in-up delay-3 mt-4">
          <Link to={createPageUrl("Clients")} className="inline-flex items-center gap-2 font-bold text-base px-6 py-3 rounded-xl bg-white text-slate-900 hover:bg-slate-100 transition-colors shadow-lg">
          <Users className="w-5 h-5" />
          Just got a policy with us? Click here to set up your online portal
          </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8 fade-in-up delay-4">
            {['No commitment required', 'Results in 24 hrs or less', 'Serving clients since 2019'].map(t => (
              <span key={t} className="flex items-center gap-1.5 text-xs text-slate-400">
                <CheckCircle className="w-3.5 h-3.5 text-green-400" /> {t}
              </span>
            ))}
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0,32 C360,64 1080,0 1440,32 L1440,64 L0,64 Z" fill="#f8f7f4" />
          </svg>
        </div>
      </section>

      {/* ═══ STATS BAR ═══════════════════════════════════════════════════════ */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map(({ value, label }) => (
              <div key={label} className="group">
                <p className="text-3xl md:text-4xl font-black mb-1" style={{ color:DARK2 }}>{value}</p>
                <p className="text-sm text-slate-500 font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CARRIER STRIP ═══════════════════════════════════════════════════ */}
      <section className="py-10 bg-slate-50 overflow-hidden" style={{ borderBottom:`1px solid #e5e7eb` }}>
        <div className="max-w-6xl mx-auto px-4 mb-5 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Carriers We Work With</p>
        </div>
        <div className="relative overflow-hidden" style={{ maskImage:'linear-gradient(90deg,transparent,black 12%,black 88%,transparent)' }}>
          <div className="carrier-strip">
            {[...carriers, ...carriers].map((c, i) => (
              <img key={i} src={c.logo} alt={c.name} title={c.name} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHO WE HELP ═════════════════════════════════════════════════════ */}
      <section className="py-24" style={{ background:'#f8f7f4' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <SectionLabel>Who We Help</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color:DARK2 }}>
              Find Your Path to Coverage
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Whether you're turning 65, protecting a young family, or planning retirement income — we have a specialist and a strategy for you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {audiences.map(({ title, subtitle, description, icon: Icon, page, cta, color }) => (
              <div
                key={title}
                className="group relative rounded-2xl p-8 border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer bg-white"
                style={{ borderColor:`${color}30` }}
              >
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background:`linear-gradient(90deg,${color}00,${color},${color}00)` }} />
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background:`${color}15` }}>
                    <Icon className="w-7 h-7" style={{ color }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color }}>{subtitle}</p>
                    <h3 className="text-xl font-black mb-2" style={{ color:DARK2 }}>{title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-5">{description}</p>
                    <Link
                      to={createPageUrl(page)}
                      className="inline-flex items-center gap-2 text-sm font-bold transition-colors"
                      style={{ color }}
                    >
                      {cta} <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* ═══ SERVICES GRID ═══════════════════════════════════════════════════ */}
      <section className="py-24" style={{ background: `linear-gradient(180deg, ${DARK1} 0%, ${DARK2} 100%)` }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <SectionLabel>Our Services</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Every Type of Coverage,
              <br />
              <span style={{ color:GOLD }}>One Trusted Team</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              From your first life insurance policy to a full retirement income strategy — we're your one-stop independent brokerage.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map(({ id, title, description, icon: Icon, page, cta }) => (
              <div
                key={id}
                className="group relative rounded-2xl p-7 border border-white/10 transition-all duration-300 hover:border-white/40 hover:-translate-y-1"
                style={{ background:'linear-gradient(160deg,rgba(255,255,255,.07) 0%,rgba(255,255,255,.02) 100%)' }}
              >
                <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background:'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }} />
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background:'rgba(255,255,255,0.15)' }}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-black text-white mb-2">{title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-5">{description}</p>
                <Link
                  to={createPageUrl(page)}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-white"
                >
                  {cta} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button
              asChild
              size="lg"
              className="font-bold px-8 py-6 rounded-xl"
              style={{ background:'linear-gradient(135deg, #1A3586, #3D6B9E)', color:'#FFFFFF' }}
            >
              <Link to="/quote">
                <Calendar className="w-5 h-5 mr-2" />
                Book a Free Consultation
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ═══ WHY US ══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left — copy */}
            <div>
              <SectionLabel>Why LifeHealthInc</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ color:DARK2 }}>
                We Work for You.
                <br />
                <span style={{ color:'#1A3586' }}>Not the Carrier.</span>
              </h2>
              <p className="text-slate-500 leading-relaxed mb-8">
                As fully independent brokers, we have no loyalty to any single insurance company.
                Our only job is to find the right coverage at the right price — then stick around to make sure it keeps working for you.
              </p>
              <div className="space-y-4">
                {whyUs.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background:'rgba(26,53,134,0.1)' }}>
                      <Icon className="w-5 h-5" style={{ color:'#1A3586' }} />
                    </div>
                    <div>
                      <p className="font-bold text-sm mb-0.5" style={{ color:DARK2 }}>{title}</p>
                      <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                asChild
                size="lg"
                className="mt-8 font-bold px-8 rounded-xl"
                style={{ background:'linear-gradient(135deg, #1A3586, #3D6B9E)', color:'#FFFFFF' }}
              >
                <Link to={createPageUrl("About")}>Meet the Team <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
            </div>

            {/* Right — team snapshot */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'Matthew Anderson', title: 'Founder & Licensed Broker', img: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c1ca7c80a1472f1eb4424c/98348aea7_D2X_8468.jpg', npn: '20770864' },
                { name: 'Collin Thomas',    title: 'Licensed Broker',           img: 'https://media.base44.com/images/public/68c1ca7c80a1472f1eb4424c/c8e8522eb_D725CA06-0F39-4498-85BE-D46B9BEC1383.PNG', npn: '21766454' },
                { name: 'Christian Buot',   title: 'Licensed Broker',           img: 'https://media.base44.com/images/public/68c1ca7c80a1472f1eb4424c/34f065b81_matthewanderson5.png', npn: '21689453' },
                { name: 'Rebecca Antonitis', title: 'Licensed Broker',          img: 'https://media.base44.com/images/public/68c1ca7c80a1472f1eb4424c/780f072e1_image.png', npn: '21768547' },
                { name: 'Austin Dundon',    title: 'Licensed Broker',           img: 'https://media.base44.com/images/public/68c1ca7c80a1472f1eb4424c/3778176ba_Gemini_Generated_Image_tci2b3tci2b3tci21.png', npn: '22078337', bg: '#1a1a1a' },
              ].map(({ name, title: role, img, npn }) => (
                <div key={name} className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                  <div className="aspect-[3/4] overflow-hidden" style={{ background: name === 'Christian Buot' ? '#4a6fa5' : name === 'Austin Dundon' ? '#1a1a1a' : '#e8edf5' }}>
                    {img ? (
                      <img src={img} alt={name} className={`w-full h-full object-cover ${name === 'Christian Buot' ? 'object-center' : 'object-top'}`} />
                    ) : (
                      <div className="w-full h-full bg-slate-200" />
                    )}
                  </div>
                  <div className="p-4 bg-white">
                    <p className="font-bold text-sm" style={{ color:DARK2 }}>{name}</p>
                    <p className="text-xs text-slate-400">{role}</p>
                    <p className="text-xs mt-1" style={{ color:'#1A3586' }}>NPN: {npn}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ════════════════════════════════════════════════════ */}
      <section className="py-24" style={{ background:`linear-gradient(180deg,${DARK2} 0%,${DARK1} 100%)` }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <SectionLabel>Client Reviews</SectionLabel>
            <h2 className="text-4xl font-black text-white mb-3">What Our Clients Say</h2>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-white text-white" />)}
            </div>
            <p className="text-slate-400 text-sm">Hundreds of families protected across the country</p>
          </div>
          <TestimonialSlider />
        </div>
      </section>

      {/* ═══ FAQ ═════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <SectionLabel>Common Questions</SectionLabel>
            <h2 className="text-4xl font-black mb-4" style={{ color:DARK2 }}>Frequently Asked Questions</h2>
            <p className="text-slate-500">Still not sure? <Link to={createPageUrl("Contact")} className="underline" style={{ color:'#1A3586' }}>Reach out directly.</Link></p>
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map(({ q, a }, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="rounded-xl border px-6"
                style={{ borderColor:'#e5e7eb' }}
              >
                <AccordionTrigger className="font-semibold text-left py-5" style={{ color:DARK2 }}>{q}</AccordionTrigger>
                <AccordionContent className="text-slate-500 text-sm leading-relaxed pb-5">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="text-center mt-10">
            <Link to={createPageUrl("FAQ")} className="inline-flex items-center gap-2 font-bold text-sm" style={{ color:'#1A3586' }}>
              View All FAQs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══════════════════════════════════════════════════════ */}
      <section
        className="py-24 text-white text-center relative overflow-hidden"
        style={{ background:`linear-gradient(135deg,${DARK1} 0%,${DARK2} 50%,${DARK3} 100%)` }}
      >
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage:`linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px)`, backgroundSize:'60px 60px' }} />
        <div className="relative max-w-3xl mx-auto px-4">
          <SectionLabel>Get Started Today</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-black mb-5">
            Your Free Consultation
            <br />
            <span className="text-white">Is One Click Away</span>
          </h2>
          <p className="text-slate-300 text-lg mb-10 leading-relaxed">
            No sales pressure. No jargon. Just honest advice from a licensed broker who's on your side.
            Most clients walk away with a better plan at a lower price.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="font-bold text-base px-10 py-6 rounded-xl"
              style={{ background:'linear-gradient(135deg, #1A3586, #3D6B9E)', color:'#FFFFFF' }}
            >
              <Link to="/quote">
                <Calendar className="w-5 h-5 mr-2" />
                Book My Free Consultation
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="font-bold text-base px-10 py-6 rounded-xl"
              style={{ borderColor:'rgba(255,255,255,0.5)', color:'#FFFFFF', background:'transparent' }}
            >
              <a href="tel:9545430853">
                <Phone className="w-5 h-5 mr-2" />
                Call (954) 543-0853
              </a>
            </Button>
          </div>
          <p className="text-xs text-slate-500 mt-6">Licensed in all 50 states · NPN on file · No commitment required</p>
        </div>
      </section>

      {/* Referral section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-8">
            <SectionLabel>Referral Program</SectionLabel>
            <h2 className="text-3xl font-black mb-2" style={{ color:DARK2 }}>Know Someone Who Needs Coverage?</h2>
            <p className="text-slate-500 text-sm">Refer a friend or family member and we'll take great care of them.</p>
          </div>
          <ReferralForm />
        </div>
      </section>

      {showNewsletter && <NewsletterModal onClose={() => setShowNewsletter(false)} />}
    </div>
  );
}