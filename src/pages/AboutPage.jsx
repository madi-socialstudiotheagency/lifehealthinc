import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { ArrowRight, Phone, Calendar, Shield, Award, Users, MapPin, Star, CheckCircle } from 'lucide-react';

const DARK1 = '#081730';
const DARK2 = '#1A3586';
const DARK3 = '#3D6B9E';
const GOLD = '#FFFFFF';

const TEAM = [
  {
    name: 'Matthew Anderson',
    title: 'Founder & Licensed Broker',
    npn: '20770864',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c1ca7c80a1472f1eb4424c/98348aea7_D2X_8468.jpg',
    objectPosition: 'object-top',
    bg: undefined,
    bio: "Matthew founded LifeHealthInc with one mission: make life and health insurance simple, honest, and accessible for every American family. With years of experience in the field, he's helped hundreds of clients find the right coverage at the right price — without the runaround.",
    specialties: ['Life Insurance', 'Mortgage Protection', 'Annuities', 'IUL Structuring'],
    quote: '"My job isn\'t to sell you a policy. It\'s to make sure your family is protected no matter what happens."',
    social: { linkedin: '#', phone: 'tel:9545430853' },
  },
  {
    name: 'Justin Brabant',
    title: 'Licensed Broker',
    npn: '22223194',
    image: 'https://media.base44.com/images/public/68c1ca7c80a1472f1eb4424c/b61dc8d67_image.png',
    objectPosition: 'object-top',
    bg: '#e8edf5',
    bio: "Justin is a licensed insurance broker based out of New York, bringing a sharp, client-focused approach to every consultation. Whether you're protecting your family with life insurance, planning for retirement, or securing your mortgage, Justin provides clear, honest guidance with no pressure — ever.",
    specialties: ['Life Insurance', 'Health Insurance', 'Mortgage Protection', 'Final Expense', 'Term Life'],
    quote: '"Great coverage shouldn\'t be complicated. I\'m here to make it simple and make sure you\'re truly protected."',
    social: { phone: 'tel:8633801008' },
  },
];

const VALUES = [
  { icon: Shield, title: 'Independent', desc: 'We represent you, not any insurance company. Zero quotas, zero carrier bias — ever.' },
  { icon: Award, title: 'Licensed in 50 States', desc: 'Active licenses nationwide means we can serve any client, anywhere in the country.' },
  { icon: Users, title: 'Client-First Always', desc: 'We build long-term relationships, not one-time transactions. Your family\'s future is our priority.' },
  { icon: CheckCircle, title: 'No Hidden Fees', desc: 'Our brokerage fee is paid entirely by the carrier. Our service to you is always 100% free.' },
];

const MILESTONES = [
  { value: '500+', label: 'Families Protected' },
  { value: '15+', label: 'Years Combined Experience' },
  { value: '20+', label: 'Carrier Relationships' },
  { value: '50', label: 'States Licensed' },
];

const SectionLabel = ({ children, light }) => (
  <div className="flex items-center justify-center gap-3 mb-4">
    <div className="h-px w-8 rounded-full" style={{ background: light ? 'rgba(255,255,255,0.4)' : `linear-gradient(90deg, transparent, ${DARK2})` }} />
    <span className={`text-xs font-bold uppercase tracking-widest ${light ? 'text-blue-200' : ''}`} style={!light ? { color: DARK3 } : {}}>{children}</span>
    <div className="h-px w-8 rounded-full" style={{ background: light ? 'rgba(255,255,255,0.4)' : `linear-gradient(90deg, ${DARK2}, transparent)` }} />
  </div>
);

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ─── HERO ─── */}
      <section className="relative py-24 text-white overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${DARK1} 0%, ${DARK2} 60%, ${DARK3} 100%)` }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)`, backgroundSize: '60px 60px' }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <SectionLabel light>Our Story</SectionLabel>
          <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            We Work For You.<br />
            <span className="text-blue-300">Not the Carrier.</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            LifeHealthInc is an independent brokerage built on one principle: every client deserves honest, unbiased advice from a licensed professional who puts their interests first — always.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Button asChild size="lg" className="font-bold px-8 rounded-xl"
              style={{ background: 'linear-gradient(135deg, #1A3586, #3D6B9E)', color: '#FFFFFF' }}>
              <Link to={createPageUrl("Book")}>
                <Calendar className="w-5 h-5 mr-2" /> Book a Free Consultation
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="font-bold px-8 rounded-xl"
              style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#FFFFFF', background: 'transparent' }}>
              <a href="tel:9545430853">
                <Phone className="w-5 h-5 mr-2" /> (954) 543-0853
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* ─── MILESTONES ─── */}
      <section style={{ background: DARK2 }} className="py-12">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          {MILESTONES.map(({ value, label }) => (
            <div key={label}>
              <p className="text-4xl font-black text-blue-200">{value}</p>
              <p className="text-sm text-blue-100 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── MEET THE TEAM ─── */}
      <section className="py-24" style={{ background: '#f8f9fb' }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <SectionLabel>The Team</SectionLabel>
            <h2 className="text-4xl font-black mb-4" style={{ color: DARK1 }}>Your Licensed Brokers</h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              Dedicated professionals. One shared mission — protecting your family's future.
            </p>
          </div>

          <div className="space-y-20">
            {TEAM.map(({ name, title, npn, image, objectPosition, bg, bio, specialties, quote }, idx) => (
              <div key={name}
                className={`flex flex-col ${idx % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center`}>

                {/* Photo */}
                <div className="w-full md:w-2/5 flex-shrink-0">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5]"
                    style={{ background: bg || '#e8edf5' }}>
                    <img src={image} alt={name}
                      className={`w-full h-full object-cover ${objectPosition}`} />
                    {/* NPN badge */}
                    <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-lg text-xs font-bold text-white"
                      style={{ background: 'rgba(8,23,48,0.85)', backdropFilter: 'blur(4px)' }}>
                      NPN: {npn}
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="w-full md:w-3/5">
                  <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: DARK3 }}>{title}</p>
                  <h3 className="text-3xl md:text-4xl font-black mb-4" style={{ color: DARK1 }}>{name}</h3>
                  <p className="text-slate-600 leading-relaxed text-base mb-6">{bio}</p>

                  {/* Quote */}
                  <blockquote className="border-l-4 pl-4 mb-6 italic text-slate-500 text-sm leading-relaxed"
                    style={{ borderColor: DARK3 }}>
                    {quote}
                  </blockquote>

                  {/* Specialties */}
                  <div className="mb-8">
                    <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: DARK2 }}>Specialties</p>
                    <div className="flex flex-wrap gap-2">
                      {specialties.map(s => (
                        <span key={s} className="px-3 py-1.5 rounded-full text-xs font-semibold text-white"
                          style={{ background: `linear-gradient(135deg, ${DARK2}, ${DARK3})` }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button asChild size="lg" className="font-bold rounded-xl"
                      style={{ background: `linear-gradient(135deg, ${DARK1}, ${DARK2})`, color: '#FFFFFF' }}>
                      <Link to={`/brokers/${name.toLowerCase().replace(/ /g, '-')}`}>
                        View {name.split(' ')[0]}'s Profile <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="font-bold rounded-xl"
                      style={{ borderColor: DARK3, color: DARK2 }}>
                      <Link to={`/brokers/${name.toLowerCase().replace(/ /g, '-')}#schedule`}>
                        Book a Call
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VALUES ─── */}
      <section className="py-20" style={{ background: `linear-gradient(135deg, ${DARK1}, ${DARK2})` }}>
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <SectionLabel light>What We Stand For</SectionLabel>
            <h2 className="text-4xl font-black text-white mb-3">Our Core Values</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl p-6 text-center"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
                <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.12)' }}>
                  <Icon className="w-6 h-6 text-blue-200" />
                </div>
                <h3 className="font-bold text-white text-sm mb-2">{title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── OFFICE ─── */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <SectionLabel>Where We Are</SectionLabel>
          <h2 className="text-3xl font-black mb-4" style={{ color: DARK1 }}>Based in Florida. Licensed Everywhere.</h2>
          <p className="text-slate-500 mb-6">We serve clients in all 50 states — in person, by phone, or via video call.</p>
          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white"
            style={{ background: `linear-gradient(135deg, ${DARK1}, ${DARK2})` }}>
            <MapPin className="w-4 h-4" />
            18245 Paulson Dr Ste VP-2, #508 — Port Charlotte, FL 33954
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 text-center text-white"
        style={{ background: `linear-gradient(135deg, ${DARK1}, ${DARK2}, ${DARK3})` }}>
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-blue-200 text-blue-200" />)}
          </div>
          <h2 className="text-4xl font-black mb-4">Ready to Get Protected?</h2>
          <p className="text-slate-300 mb-8 text-lg">
            No pressure. No jargon. Just honest advice from a licensed broker who's on your side.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="font-bold px-8 rounded-xl"
              style={{ background: 'linear-gradient(135deg, #1A3586, #3D6B9E)', color: '#FFFFFF' }}>
              <Link to={createPageUrl("Book")}>
                <Calendar className="w-5 h-5 mr-2" /> Book My Free Consultation
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="font-bold px-8 rounded-xl"
              style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#FFFFFF', background: 'transparent' }}>
              <a href="tel:9545430853">
                <Phone className="w-5 h-5 mr-2" /> Call Us Now
              </a>
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}