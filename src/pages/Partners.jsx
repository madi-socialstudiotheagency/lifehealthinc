import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Handshake, TrendingUp, Gavel, Home, Calculator, Briefcase, Linkedin, CheckCircle, ChevronRight } from 'lucide-react';

const GOLD = '#FFFFFF';
const DARK1 = '#081730';
const DARK2 = '#1A3586';
const DARK3 = '#3D6B9E';

const SectionLabel = ({ children }) => (
  <div className="flex items-center justify-center gap-3 mb-4">
    <div className="h-px w-8 rounded-full" style={{ background: `linear-gradient(90deg, transparent, ${GOLD})` }} />
    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: GOLD }}>{children}</span>
    <div className="h-px w-8 rounded-full" style={{ background: `linear-gradient(90deg, ${GOLD}, transparent)` }} />
  </div>
);

const GoldDivider = () => (
  <div className="max-w-6xl mx-auto px-4">
    <div className="h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}40, transparent)` }} />
  </div>
);

const partnershipBenefits = [
  { title: 'Expand Your Services', description: 'Offer expert insurance solutions without needing to become an expert yourself. We act as a seamless extension of your team.' },
  { title: 'Enhance Client Loyalty', description: 'Providing holistic advice deepens client relationships, making your services more indispensable and increasing retention.' },
  { title: 'Generous Referrals', description: 'Earn competitive, compliant referral compensation for every client who secures coverage through our partnership.' },
];

const professionals = [
  { title: 'CPAs & Accountants', icon: Calculator },
  { title: 'Financial Advisors', icon: TrendingUp },
  { title: 'Estate Planning Attorneys', icon: Gavel },
  { title: 'Mortgage Brokers', icon: Home },
  { title: 'Realtors', icon: Briefcase },
];

const howItWorksSteps = [
  { number: '01', title: 'Apply & Connect', description: "Submit a short application. We'll schedule a discovery call to align on goals and client needs." },
  { number: '02', title: 'Simple Referrals', description: 'Easily refer clients through a dedicated portal or email introduction. We handle the rest with care.' },
  { number: '03', title: 'Mutual Success', description: 'We provide exceptional service to your client, and you receive competitive compensation for the partnership.' },
];

export default function PartnersPage() {
  return (
    <div className="min-h-screen" style={{ background: `linear-gradient(180deg, ${DARK1} 0%, ${DARK2} 50%, ${DARK3} 100%)` }}>

      {/* ─── HERO ─── */}
      <section className="relative py-28 overflow-hidden text-white">
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: `linear-gradient(rgba(242,201,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(242,201,76,0.04) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${GOLD}0D, transparent 70%)`, transform: 'translateY(-30%)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none" style={{ background: `linear-gradient(transparent, ${DARK2})` }} />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8"
            style={{ background: `linear-gradient(135deg, #1A3586, #3D6B9E)` }}>
            <Handshake className="w-10 h-10 text-white" />
          </div>
          <SectionLabel>Partnerships</SectionLabel>
          <h1 className="text-5xl md:text-7xl font-black mb-6 mt-2 leading-tight">
            Become a<br />
            <span style={{ color: '#60A5FA' }}>
              Partner
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
            Work with LifeHealthInc to grow your practice and better serve your clients.
          </p>
          <Button asChild size="lg" className="font-black rounded-full px-12 py-7 hover:scale-105 transition-all shadow-2xl"
            style={{ background: `linear-gradient(135deg, #1A3586, #3D6B9E)`, color: '#FFFFFF' }}>
            <Link to={createPageUrl("PartnerForm")}>Apply Now <ChevronRight className="w-5 h-5 ml-1" /></Link>
          </Button>
        </div>
      </section>

      {/* ─── WHO WE PARTNER WITH ─── */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Icon Grid */}
            <div className="grid grid-cols-2 gap-5">
              {professionals.map(({ title, icon: Icon }, i) => (
                <div key={title} className="rounded-2xl p-6 border border-white/10 text-center hover:border-yellow-500/30 transition-all duration-300 hover:-translate-y-1 group"
                  style={{ background: 'linear-gradient(160deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))' }}>
                  <Icon className="w-10 h-10 mx-auto mb-3 group-hover:scale-110 transition-transform text-white" />
                  <h4 className="font-bold text-sm text-white">{title}</h4>
                </div>
              ))}
            </div>
            {/* Benefits */}
            <div>
              <SectionLabel>Why Partner</SectionLabel>
              <h2 className="text-3xl md:text-4xl font-black mb-8 text-white">A Partnership Built for Professionals</h2>
              <ul className="space-y-5">
                {partnershipBenefits.map(({ title, description }) => (
                  <li key={title} className="flex items-start gap-4 rounded-xl p-4 border border-white/5" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-black text-white mb-1">{title}</h3>
                      <p className="text-slate-400 text-sm">{description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-24 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${DARK1}, ${DARK2})` }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: `linear-gradient(rgba(242,201,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(242,201,76,0.03) 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <SectionLabel>The Process</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-black" style={{ color: GOLD }}>A Simple 3-Step Process</h2>
            <p className="text-lg text-slate-400 mt-3">Seamless collaboration from start to finish.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {howItWorksSteps.map(({ number, title, description }, i) => (
              <div key={i} className="rounded-2xl p-8 border border-white/10 text-center relative overflow-hidden hover:-translate-y-1 transition-all duration-300"
                style={{ background: 'linear-gradient(160deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))' }}>
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${GOLD}00, ${GOLD}, ${GOLD}00)` }} />
                <div className="absolute top-4 right-5 text-5xl font-black opacity-8 select-none" style={{ color: GOLD }}>{number}</div>
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-5 font-black text-lg"
                  style={{ background: `linear-gradient(135deg, #1A3586, #3D6B9E)`, color: '#FFFFFF' }}>
                  {i + 1}
                </div>
                <h3 className="font-black text-lg mb-3 text-white">{title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* ─── CTA ─── */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl p-10 md:p-16 border text-center relative overflow-hidden"
            style={{ borderColor: `rgba(255,255,255,0.2)`, background: `linear-gradient(135deg, rgba(26,53,134,0.3), rgba(61,107,158,0.3))` }}>
            <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)` }} />
            <h2 className="text-3xl md:text-4xl font-black mb-4 text-white">Let's Talk Partnerships</h2>
            <p className="text-slate-400 mb-10 max-w-lg mx-auto">Ready to create mutual success? Apply now to start the conversation.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="font-black rounded-full px-10 py-6 hover:scale-105 transition-all shadow-xl"
                style={{ background: `linear-gradient(135deg, #1A3586, #3D6B9E)`, color: '#FFFFFF' }}>
                <Link to={createPageUrl("PartnerForm")}>Apply Now <ChevronRight className="w-5 h-5 ml-1" /></Link>
              </Button>
              <a href="https://www.linkedin.com/in/matthew-anderson-797939296/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold transition-colors hover:text-white"
                style={{ color: `rgba(255,255,255,0.8)` }}>
                <Linkedin className="w-5 h-5" /> Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}