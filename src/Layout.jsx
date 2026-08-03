import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
  ArrowRight, Linkedin, Instagram, Twitter, Youtube, Facebook,
  Menu, X, Calculator, Sparkles, Users, ChevronDown,
  Heart, Shield, Activity, TrendingUp, Home as HomeIcon,
  Stethoscope, DollarSign, FileText, HelpCircle
} from 'lucide-react';
import NewsletterSignup from "./components/NewsletterSignup";
import { Button } from "@/components/ui/button";

import HealthQuoteWidget from "./components/HealthQuoteWidget";

// ─── Brand tokens ───────────────────────────────────────────────────────────
const GOLD = '#FFFFFF';
const DARK1 = '#081730';
const DARK2 = '#1A3586';
const ROYAL_BLUE = '#1A3586';

// ─── Services mega-menu data ─────────────────────────────────────────────────
const serviceLinks = [
  { label: 'Life Insurance',        page: 'LifeInsurance',    icon: Heart,        desc: 'Term, Whole Life & IUL' },
  { label: 'Health Insurance',      page: 'HealthInsurance',  icon: Activity,     desc: 'ACA, Group & Short-Term' },
  { label: 'Medicare',              page: 'Medicare',         icon: Stethoscope,  desc: 'Advantage, Supplement & Part D' },
  { label: 'Annuities',             page: 'Annuities',        icon: TrendingUp,   desc: 'FIAs, MYGAs & Income Planning' },
  { label: 'Mortgage Protection',   page: 'MortgageProtection', icon: HomeIcon,   desc: 'Protect Your Home & Equity' },
  { label: 'Final Expense',         page: 'FinalExpense',     icon: Shield,       desc: 'Affordable End-of-Life Coverage' },
  { label: 'Whole Life',            page: 'WholeLife',        icon: DollarSign,   desc: 'Lifetime Coverage & Cash Value' },
  { label: 'IUL Structuring',       page: 'IULStructuring',   icon: FileText,     desc: 'Tax-Free Retirement Strategy' },
];

// ─── Dropdown component ──────────────────────────────────────────────────────
function ServicesDropdown({ onClose }) {
  return (
    <div
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[680px] rounded-2xl border shadow-2xl z-50 overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${DARK1} 0%, ${DARK2} 100%)`, borderColor: `${GOLD}30` }}
    >
      <div className="p-5">
        <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: `${GOLD}99` }}>
          All Services
        </p>
        <div className="grid grid-cols-2 gap-2">
          {serviceLinks.map(({ label, page, icon: Icon, desc }) => (
            <Link
              key={page}
              to={createPageUrl(page)}
              onClick={onClose}
              className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group"
              style={{ border: '1px solid transparent' }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${GOLD}40`;
                e.currentTarget.style.background = 'rgba(212,175,55,0.07)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'transparent';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: `${GOLD}20` }}
              >
                <Icon className="w-4 h-4" style={{ color: GOLD }} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{label}</p>
                <p className="text-xs" style={{ color: `${GOLD}80` }}>{desc}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-4 pt-4" style={{ borderTop: `1px solid ${GOLD}20` }}>
          <Link
            to={createPageUrl("Calculator")}
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm transition-all"
            style={{ background: 'linear-gradient(135deg, #1A3586, #3D6B9E)', color: '#FFFFFF' }}
          >
            <Calculator className="w-4 h-4" />
            Get a Free Quote Across All Products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Load GHL chat widget
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://widgets.leadconnectorhq.com/loader.js';
    script.setAttribute('data-resources-url', 'https://widgets.leadconnectorhq.com/chat-widget/loader.js');
    script.setAttribute('data-widget-id', '69f282150354321d42c26b1d');
    script.setAttribute('data-source', 'WEB_USER');
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);
  const [servicesOpen, setServicesOpen] = React.useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = React.useState(false);
  const dropdownRef = React.useRef(null);

  // Close dropdown on outside click
  React.useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Standalone truckers page — no layout
  if (currentPageName === 'truckers') {
    return (
      <>
        <style>{`
          [data-base44-id],[data-base44-tag],a[href*="base44"],a[href*="Base44"],div[class*="base44"],
          footer:has(a[href*="base44"]),[data-base44],.base44-powered,.powered-by-base44,
          div:has(a[href*="base44.com"]){display:none!important;visibility:hidden!important;
          opacity:0!important;position:absolute!important;left:-9999px!important;pointer-events:none!important}
        `}</style>
        <main>{children}</main>
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#f8f7f4' }}>
      {/* Favicon */}
      <link rel="icon" href="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c1ca7c80a1472f1eb4424c/f8b8be74c_lfhi1.png" type="image/png" />

      <script src="https://link.msgsndr.com/js/form_embed.js" type="text/javascript" async defer />
      <script dangerouslySetInnerHTML={{ __html: `window.GHL_WEBHOOK_URL="https://services.leadconnectorhq.com/hooks/lJmzDmY0fD9lzFZWj5Lw/webhook-trigger/9d701892-b155-4cca-bd54-b9b58fe42879";` }} />

      <style>{`
        :root{--brand-primary:#081730;--brand-secondary:#1A3586;--brand-accent:#FFFFFF;--brand-text-on-primary:#FFFFFF}
        .social-icon{width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,0.1);color:white;transition:all .3s ease;display:flex;align-items:center;justify-content:center}
        .social-icon:hover{background:#FFFFFF;color:#1A3586;transform:scale(1.1)}
        .header-link{color:rgba(255,255,255,0.88);text-decoration:none;font-weight:500;font-size:14px;padding:.45rem .85rem;border-radius:.5rem;transition:all .25s ease;display:flex;align-items:center;gap:4px}
        .header-link:hover,.header-link.active{background:rgba(255,255,255,0.15);color:#FFFFFF}
        .header-logo{height:42px;width:auto;transition:transform .3s ease}
        .header-logo:hover{transform:scale(1.05)}
        .sticky-cta-btn{position:fixed;top:88px;right:20px;z-index:40;font-size:11px;padding:8px 14px;box-shadow:0 4px 14px rgba(26,53,134,0.35);transition:all .2s ease}
        .sticky-cta-btn:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(26,53,134,0.45)}
        @media(max-width:768px){.sticky-cta-btn{display:none}}
        [data-base44-id],[data-base44-tag],a[href*="base44"],a[href*="Base44"],div[class*="base44"],
        footer:has(a[href*="base44"]),[data-base44],.base44-powered,.powered-by-base44,
        div:has(a[href*="base44.com"]){display:none!important;visibility:hidden!important;opacity:0!important;position:absolute!important;left:-9999px!important;pointer-events:none!important}
      `}</style>

      {/* ─── Announcement Bar ─────────────────────────────────────────────── */}
      <div
        className="w-full text-center py-1 px-4 text-xs font-semibold tracking-wide"
        style={{ background: `linear-gradient(90deg, ${DARK1}, ${DARK2})`, color: GOLD }}
      >
        📞 Licensed in All 50 States · (954) 543-0853 · No Cost Consultations Available
      </div>

      {/* ─── Sticky Header ────────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-50 w-full py-2 text-white shadow-lg"
        style={{ background: `linear-gradient(135deg, ${DARK1} 0%, ${DARK2} 100%)` }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">

            {/* Logo */}
            <Link to={createPageUrl("Home")} className="flex items-center gap-2 flex-shrink-0">
              <img
                src="https://media.base44.com/images/public/68c1ca7c80a1472f1eb4424c/6bb5a4d12_Untitleddesign.png"
                alt="LifeHealthInc Logo"
                className="header-logo"
                style={{ mixBlendMode: 'lighten', filter: 'brightness(1.1)' }}
              />
              <span className="text-lg font-bold hidden sm:block whitespace-nowrap" style={{ color: GOLD }}>LifeHealthInc</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-1">
              <Link to={createPageUrl("Home")} className={`header-link ${currentPageName === 'Home' ? 'active' : ''}`}>Home</Link>

              {/* Services dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  className={`header-link ${serviceLinks.some(s => s.page === currentPageName) ? 'active' : ''}`}
                  onClick={() => setServicesOpen(v => !v)}
                  onMouseEnter={() => setServicesOpen(true)}
                >
                  Services
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                </button>
                {servicesOpen && (
                  <div onMouseLeave={() => setServicesOpen(false)}>
                    <ServicesDropdown onClose={() => setServicesOpen(false)} />
                  </div>
                )}
              </div>

              <Link to={createPageUrl("About")} className={`header-link ${currentPageName === 'About' ? 'active' : ''}`}>About Us</Link>
              <Link to={createPageUrl("Blog")} className={`header-link ${currentPageName === 'Blog' ? 'active' : ''}`}>Blog</Link>
              <Link to={createPageUrl("Partners")} className={`header-link ${currentPageName === 'Partners' ? 'active' : ''}`}>Partners</Link>
              <Link to={createPageUrl("Contact")} className={`header-link ${currentPageName === 'Contact' ? 'active' : ''}`}>Contact</Link>
            </nav>

            {/* Right — CTA + Social */}
            <div className="hidden md:flex items-center gap-3">
              <Button
                asChild
                size="sm"
                className="font-bold rounded-lg"
                style={{ backgroundColor: GOLD, color: DARK1 }}
              >
                <Link to={createPageUrl("Clients")}>
                  <Users className="w-4 h-4 mr-1.5" />
                  Client Portal
                </Link>
              </Button>
              <Button
                asChild
                size="sm"
                className="font-bold rounded-lg"
                style={{ backgroundColor: GOLD, color: DARK1 }}
              >
                <Link to={createPageUrl("Book")}>
                  <Calculator className="w-4 h-4 mr-1.5" />
                  Free Consultation
                </Link>
              </Button>
              <div className="flex items-center gap-1.5 pl-3" style={{ borderLeft: '1px solid rgba(255,255,255,0.15)' }}>
                {[
                  { href: 'https://www.linkedin.com/in/matthew-anderson-797939296/', Icon: Linkedin, label: 'LinkedIn' },
                  { href: 'https://www.instagram.com/lifehealthinc', Icon: Instagram, label: 'Instagram' },
                  { href: 'https://x.com/LifeHealthInc_', Icon: Twitter, label: 'X / Twitter' },
                  { href: 'https://www.youtube.com/@lifehealthinc', Icon: Youtube, label: 'YouTube' },
                  { href: 'https://www.facebook.com/profile.php?id=61578880157602', Icon: Facebook, label: 'Facebook' },
                ].map(({ href, Icon, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label={label}>
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* ─── Mobile Menu ───────────────────────────────────────────────── */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4" style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}>
              <nav className="flex flex-col space-y-1 mt-4">
                <Link to={createPageUrl("Home")} className="header-link" onClick={() => setMobileMenuOpen(false)}>Home</Link>

                {/* Mobile services accordion */}
                <button
                  className="header-link justify-between"
                  onClick={() => setMobileServicesOpen(v => !v)}
                >
                  <span>Services</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileServicesOpen && (
                  <div className="ml-4 space-y-1">
                    {serviceLinks.map(({ label, page, icon: Icon }) => (
                      <Link
                        key={page}
                        to={createPageUrl(page)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/10"
                        onClick={() => { setMobileMenuOpen(false); setMobileServicesOpen(false); }}
                      >
                        <Icon className="w-4 h-4" style={{ color: GOLD }} />
                        {label}
                      </Link>
                    ))}
                  </div>
                )}

                <Link to={createPageUrl("About")} className="header-link" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
                <Link to={createPageUrl("Blog")} className="header-link" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
                <Link to={createPageUrl("Partners")} className="header-link" onClick={() => setMobileMenuOpen(false)}>Partners</Link>
                <Link to={createPageUrl("Contact")} className="header-link" onClick={() => setMobileMenuOpen(false)}>Contact</Link>

                <div className="pt-3 space-y-2">
                  <Button
                    asChild
                    className="w-full font-bold"
                    style={{ backgroundColor: GOLD, color: DARK1 }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link to={createPageUrl("Book")}>Free Consultation</Link>
                  </Button>
                  <Button
                    asChild
                    className="w-full font-bold"
                    style={{ backgroundColor: DARK2, color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.3)' }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link to={createPageUrl("Clients")}>
                      <Users className="w-4 h-4 mr-1.5" />
                      Client Portal
                    </Link>
                  </Button>
                </div>

                <div className="flex justify-center gap-3 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  {[
                    { href: 'https://www.linkedin.com/in/matthew-anderson-797939296/', Icon: Linkedin },
                    { href: 'https://www.instagram.com/lifehealthinc', Icon: Instagram },
                    { href: 'https://x.com/LifeHealthInc_', Icon: Twitter },
                    { href: 'https://www.youtube.com/@lifehealthinc', Icon: Youtube },
                    { href: 'https://www.facebook.com/profile.php?id=61578880157602', Icon: Facebook },
                  ].map(({ href, Icon }, i) => (
                    <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="social-icon">
                      <Icon className="w-3.5 h-3.5" />
                    </a>
                  ))}
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Sticky floating CTA - desktop */}
      <Link
        to={createPageUrl("Book")}
        className="sticky-cta-btn hidden md:flex items-center gap-1.5 rounded-lg font-bold text-xs"
        style={{ backgroundColor: GOLD, color: DARK1 }}
      >
        <Sparkles className="w-3.5 h-3.5" />
        Free Consult
      </Link>



      <main className="flex-grow">{children}</main>

      {/* ─── Client Portal Banner ─────────────────────────────────────────── */}
      {currentPageName !== 'Clients' && (
        <div className="py-10" style={{ background: `linear-gradient(135deg, ${DARK2}, ${DARK1})` }}>
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h3 className="text-2xl font-bold mb-2" style={{ color: GOLD }}>Already a Client?</h3>
            <p className="text-slate-300 mb-5 text-sm max-w-xl mx-auto">
              Access your policy, update beneficiaries, or manage your coverage through your carrier's portal.
            </p>
            <Button asChild size="lg" style={{ backgroundColor: GOLD, color: DARK1 }} className="font-bold">
              <Link to={createPageUrl("Clients")}>
                <Users className="w-5 h-5 mr-2" />
                Access My Carrier Portal
              </Link>
            </Button>
          </div>
        </div>
      )}

      {/* ─── Partner Banner ───────────────────────────────────────────────── */}
      {currentPageName !== 'Home' && currentPageName !== 'Partners' && location.pathname !== '/' && (
        <div className="py-8" style={{ background: `linear-gradient(135deg, ${DARK1}, ${DARK2})` }}>
          <div className="max-w-6xl mx-auto px-4 text-center flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8">
            <div>
              <p className="text-sm font-semibold text-slate-300">Are you a CPA, Attorney, Financial Advisor, or Realtor?</p>
              <p className="text-xs text-slate-400 mt-0.5">Earn referral income by sending clients our way.</p>
            </div>
            <Button asChild style={{ backgroundColor: GOLD, color: DARK1 }} className="font-bold whitespace-nowrap">
              <Link to={createPageUrl("Partners")}>
                Become a Referral Partner <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      )}

      {/* ─── Footer ───────────────────────────────────────────────────────── */}
      <footer className="w-full pt-10 pb-6 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Newsletter */}
          <div className="mb-8 pb-8" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="max-w-2xl">
              <NewsletterSignup variant="footer" />
            </div>
          </div>

          {/* Footer columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c1ca7c80a1472f1eb4424c/f8b8be74c_lfhi1.png"
                alt="LifeHealthInc"
                className="h-10 mb-3"
              />
              <p className="text-xs text-slate-400 leading-relaxed">
                Licensed insurance brokerage serving clients nationwide. We shop top-rated carriers to find the best coverage at the best price.
              </p>
              <div className="flex gap-2 mt-4">
                {[
                  { href: 'https://www.linkedin.com/in/matthew-anderson-797939296/', Icon: Linkedin },
                  { href: 'https://www.instagram.com/lifehealthinc', Icon: Instagram },
                  { href: 'https://x.com/LifeHealthInc_', Icon: Twitter },
                  { href: 'https://www.youtube.com/@lifehealthinc', Icon: Youtube },
                  { href: 'https://www.facebook.com/profile.php?id=61578880157602', Icon: Facebook },
                ].map(({ href, Icon }, i) => (
                  <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="social-icon" style={{ width: 28, height: 28 }}>
                    <Icon className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: GOLD }}>Services</p>
              <ul className="space-y-1.5 text-sm text-slate-400">
                {serviceLinks.map(({ label, page }) => (
                  <li key={page}>
                    <Link to={createPageUrl(page)} className="hover:text-white transition-colors">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: GOLD }}>Company</p>
              <ul className="space-y-1.5 text-sm text-slate-400">
                {[
                  { label: 'About Us', page: 'About' },
                  { label: 'Our Team', page: 'About' },
                  { label: 'Blog & Resources', page: 'Blog' },
                  { label: 'Partner With Us', page: 'Partners' },
                  { label: 'Client Portal', page: 'Clients' },
                  { label: 'FAQ', page: 'FAQ' },
                ].map(({ label, page }) => (
                  <li key={label}>
                    <Link to={createPageUrl(page)} className="hover:text-white transition-colors">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: GOLD }}>Contact</p>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="tel:9545430853" className="hover:text-white transition-colors" style={{ color: GOLD }}>
                    (954) 543-0853
                  </a>
                </li>
                <li>
                  <a href="mailto:info@lifehealthinc.org" className="hover:text-white transition-colors">
                    info@lifehealthinc.org
                  </a>
                </li>
                <li className="leading-relaxed text-xs pt-1">
                  18245 Paulson Dr Ste VP-2, #508<br />
                  Port Charlotte, FL 33954
                </li>
              </ul>
              <Button
                asChild
                size="sm"
                className="mt-4 font-bold w-full"
                style={{ backgroundColor: GOLD, color: DARK1 }}
              >
                <Link to={createPageUrl("Book")}>Book a Free Call</Link>
              </Button>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-slate-500" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <p>© {new Date().getFullYear()} LifeHealthInc LLC. All rights reserved. Licensed Insurance Brokerage.</p>
            <div className="flex gap-4">
              <Link to={createPageUrl("Privacy")} className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
              <Link to={createPageUrl("Terms")} className="hover:text-slate-300 transition-colors">Terms of Use</Link>
            </div>
          </div>
        </div>
      </footer>




    </div>
  );
}