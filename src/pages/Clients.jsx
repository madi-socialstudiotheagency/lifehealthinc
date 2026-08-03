import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Calendar, ExternalLink, CreditCard, FileText, UserCheck, Users, ChevronRight, Phone, Shield } from 'lucide-react';
import CarrierCard from '../components/CarrierCard';
import { carriers } from '../components/carriersData';
import NewsletterSignup from '../components/NewsletterSignup';
import { base44 } from '@/api/base44Client';
import ClientPortalLogin from '../components/ClientPortalLogin';

const DARK1 = '#081730';
const DARK2 = '#1A3586';
const DARK3 = '#3D6B9E';

const SectionLabel = ({ children, light }) => (
  <div className="flex items-center justify-center gap-3 mb-4">
    <div className="h-px w-8 rounded-full" style={{ background: light ? 'rgba(255,255,255,0.3)' : `linear-gradient(90deg, transparent, ${DARK3})` }} />
    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: light ? 'rgba(255,255,255,0.7)' : DARK3 }}>{children}</span>
    <div className="h-px w-8 rounded-full" style={{ background: light ? 'rgba(255,255,255,0.3)' : `linear-gradient(90deg, ${DARK3}, transparent)` }} />
  </div>
);

const quickHelpLinks = [
  { title: 'Update Beneficiaries', icon: UserCheck, href: createPageUrl("Contact"), desc: 'Change or add beneficiaries on your policy' },
  { title: 'Billing & Payments', icon: CreditCard, href: createPageUrl("Contact"), desc: 'Questions about your premiums or payment methods' },
  { title: 'File a Claim', icon: FileText, href: createPageUrl("Contact"), desc: 'We\'ll guide you through the claims process' },
];

const faqs = [
  { question: "I don't know my carrier login.", answer: "Click on your carrier above and use the 'Forgot Username/Password' option, or contact us and we'll help you get logged in." },
  { question: "My policy isn't listed.", answer: "Contact us — we'll help locate your carrier portal and get you the right login information." },
  { question: "Can you make changes for me?", answer: "Yes, we'll guide you through the process and help submit any necessary forms with you." },
  { question: "How do I add a new policy?", answer: "Book a free consultation and we'll review your current coverage and recommend any additions that make sense for your situation." },
];

export default function ClientsPage() {
  const [user, setUser] = useState(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    base44.auth.me()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setIsChecking(false));
  }, []);

  const firstName = user?.full_name?.split(' ')[0] || null;
  const email = user?.email || null;

  if (isChecking) {
    return (
      <div className="fixed inset-0 flex items-center justify-center" style={{ background: '#081730' }}>
        <div className="w-8 h-8 border-4 border-slate-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <ClientPortalLogin onLoginSuccess={() => window.location.reload()} />;
  }

  return (
    <div className="min-h-screen" style={{ background: `linear-gradient(180deg, ${DARK1} 0%, ${DARK2} 100%)` }}>
      <style>{`
        .grid-carriers {
          display: grid;
          gap: 16px;
          grid-template-columns: 1fr;
        }
        @media(min-width: 480px) { .grid-carriers { grid-template-columns: repeat(2, 1fr); } }
        @media(min-width: 768px) { .grid-carriers { gap: 20px; grid-template-columns: repeat(3, 1fr); } }
        @media(min-width: 1200px) { .grid-carriers { grid-template-columns: repeat(4, 1fr); } }
        .carrier-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          background: rgba(255,255,255,0.04);
          padding: 20px;
          min-height: 200px;
          transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
        }
        .carrier-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.4);
          border-color: rgba(96,165,250,0.35);
          background: rgba(255,255,255,0.07);
        }
        .carrier-logo-rail { height: 56px; display: flex; align-items: center; justify-content: center; }
        @media(min-width: 1024px) { .carrier-logo-rail { height: 68px; } }
        .carrier-logo { max-width: 100%; max-height: 100%; width: auto; height: auto; object-fit: contain; display: block; }
        .carrier-logo.mono { filter: brightness(0) invert(1); opacity: 0.9; }
        .carrier-name { margin: 12px 0 10px; font-weight: 600; font-size: 0.95rem; text-align: center; color: white; }
        .carrier-actions { display: flex; flex-direction: column; gap: 8px; }
        .carrier-actions .btn-primary { width: 100%; height: 42px; }
        .carrier-actions .helper { font-size: 0.8rem; opacity: 0.7; }
      `}</style>

      {/* ─── HERO ─── */}
      <section className="relative py-24 overflow-hidden text-white">
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, rgba(96,165,250,0.08), transparent 70%)`, transform: 'translateY(-30%)' }} />

        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{ background: 'linear-gradient(135deg, #1A3586, #3D6B9E)' }}>
            <Shield className="w-10 h-10 text-white" />
          </div>
          <SectionLabel light>Client Portal</SectionLabel>
          <h1 className="text-5xl md:text-6xl font-black mt-2 mb-4 text-white">
            {firstName ? (
              <>Welcome Back,<br /><span style={{ color: '#60A5FA' }}>{firstName}</span></>
            ) : (
              <>Welcome Back,<br /><span style={{ color: '#60A5FA' }}>Valued Client</span></>
            )}
          </h1>
          {email && (
            <p className="text-sm text-slate-400 mb-4">Logged in as: <span className="font-semibold text-slate-200">{email}</span></p>
          )}
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
            Access your carrier portal, manage your policy, or reach out to your broker below.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="font-bold rounded-xl px-8"
              style={{ background: 'linear-gradient(135deg, #1A3586, #3D6B9E)', color: '#FFFFFF' }}>
              <a href="https://calendly.com/lifehealthinc/seminar" target="_blank" rel="noopener noreferrer">
                <Calendar className="w-5 h-5 mr-2" /> Join a Client Seminar
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="font-bold rounded-xl px-8"
              style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#FFFFFF', background: 'transparent' }}>
              <a href="tel:9545430853">
                <Phone className="w-5 h-5 mr-2" /> (954) 543-0853
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* ─── CARRIER GRID ─── */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <SectionLabel light>Your Carriers</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-3">Access Your Policy</h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Select your insurance carrier to log in, view your benefits, or manage your coverage.
            </p>
          </div>
          <div className="grid-carriers">
            {carriers.map((carrier, i) => (
              <CarrierCard key={i} name={carrier.name} href={carrier.href} logo={carrier.logo} mono={carrier.mono} />
            ))}
          </div>
          <p className="text-center text-slate-500 text-xs mt-8">
            Don't see your carrier? <Link to={createPageUrl("Contact")} className="text-blue-400 hover:text-blue-300 underline">Contact us</Link> and we'll help you find the right portal.
          </p>
        </div>
      </section>

      {/* ─── QUICK HELP ─── */}
      <section className="py-20" style={{ background: 'rgba(0,0,0,0.2)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <SectionLabel light>Support</SectionLabel>
            <h2 className="text-4xl font-black text-white mb-3">Need Help?</h2>
            <p className="text-slate-400">Our team is available to assist you with any policy questions.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {quickHelpLinks.map(({ title, icon: Icon, href, desc }, i) => (
              <div key={i} className="rounded-2xl p-7 border border-white/10 hover:border-blue-400/30 transition-all duration-300 hover:-translate-y-1 group"
                style={{ background: 'rgba(255,255,255,0.04)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                  style={{ background: 'linear-gradient(135deg, #1A3586, #3D6B9E)' }}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-white mb-2">{title}</h3>
                <p className="text-slate-400 text-sm mb-5 leading-relaxed">{desc}</p>
                <Button asChild variant="outline" size="sm" className="w-full rounded-lg hover:bg-white/10 transition-all"
                  style={{ borderColor: 'rgba(96,165,250,0.4)', color: '#60A5FA' }}>
                  <Link to={href}>Get Help <ChevronRight className="w-4 h-4 ml-1" /></Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SEMINAR SIGNUP ─── */}
      <section className="py-16 px-4">
        <div className="max-w-lg mx-auto rounded-2xl p-10 border relative overflow-hidden"
          style={{ borderColor: 'rgba(96,165,250,0.2)', background: 'linear-gradient(135deg, rgba(26,53,134,0.4), rgba(61,107,158,0.3))' }}>
          <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(96,165,250,0.5), transparent)' }} />
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #1A3586, #3D6B9E)' }}>
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white">Client Seminars</h2>
              <p className="text-slate-400 text-sm">Learn to maximize your benefits & coverage</p>
            </div>
          </div>
          <NewsletterSignup variant="footer" />
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <SectionLabel light>FAQ</SectionLabel>
            <h2 className="text-4xl font-black text-white">Common Questions</h2>
          </div>
          <div className="rounded-2xl overflow-hidden border border-white/10">
            <Accordion type="single" collapsible>
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-b border-white/8 last:border-none">
                  <AccordionTrigger className="text-left font-semibold text-white py-5 px-7 hover:bg-white/5 transition-colors hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-400 leading-relaxed pb-6 px-7"
                    style={{ borderLeft: '2px solid rgba(96,165,250,0.3)' }}>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ─── COMPLIANCE FOOTER ─── */}
      <section className="py-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-xs text-slate-600">
            Carrier portals are owned and operated by each insurance carrier. LifeHealthInc does not store or have access to your login credentials.
          </p>
        </div>
      </section>
    </div>
  );
}