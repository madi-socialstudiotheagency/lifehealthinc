import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Phone, Mail, Calendar, ArrowRight, Shield, CheckCircle, Linkedin, Users, Loader2 } from 'lucide-react';

const DARK1 = '#081730';
const DARK2 = '#1A3586';
const DARK3 = '#3D6B9E';

export default function BrokerBioPage({ broker }) {
  const { name, title, npn, licenseNumber, licenseVerifyUrl, phone, phoneHref, email, image, objectPosition, bg, bio, bioExtended, specialties, quote, calendlyUrl: staticCalendlyUrl, linkedin } = broker;
  const firstName = name.split(' ')[0];

  // Dynamically fetch Calendly URL from Agent entity (falls back to static)
  const [calendlyUrl, setCalendlyUrl] = useState(staticCalendlyUrl);
  const [loadingCalendly, setLoadingCalendly] = useState(true);

  useEffect(() => {
    base44.entities.Agent.filter({ email: broker.email })
      .then(agents => {
        const agent = agents?.[0];
        if (agent?.calendlyUrl) {
          setCalendlyUrl(agent.calendlyUrl);
        }
      })
      .catch(() => {})
      .finally(() => setLoadingCalendly(false));
  }, [broker.email]);

  return (
    <div className="min-h-screen bg-white">

      {/* ─── HERO ─── */}
      <section className="relative py-20 text-white overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${DARK1} 0%, ${DARK2} 60%, ${DARK3} 100%)` }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)`, backgroundSize: '60px 60px' }} />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-blue-200 mb-8">
            <Link to={createPageUrl('About')} className="hover:text-white transition-colors">Our Team</Link>
            <span>/</span>
            <span className="text-white">{name}</span>
          </div>

          <div className="flex flex-col md:flex-row gap-12 items-center">
            {/* Photo */}
            <div className="flex-shrink-0 w-56 h-56 md:w-72 md:h-72 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20"
              style={{ background: bg || '#e8edf5' }}>
              <img src={image} alt={name} className={`w-full h-full object-cover ${objectPosition}`} />
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3"
                style={{ background: 'rgba(255,255,255,0.15)', color: '#93C5FD' }}>
                {title}
              </div>
              <h1 className="text-4xl md:text-5xl font-black mb-3 text-white">{name}</h1>
              <p className="text-blue-200 text-sm mb-1">NPN: {npn}{licenseNumber && ` · License #${licenseNumber}`}</p>
              {licenseVerifyUrl && (
                <a href={licenseVerifyUrl} target="_blank" rel="noopener noreferrer"
                  className="text-xs text-blue-300 hover:text-white underline transition-colors mb-1 inline-block">
                  Verify License →
                </a>
              )}
              <p className="text-slate-300 text-sm mb-6 italic">{quote}</p>

              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <a href={phoneHref}>
                  <Button size="lg" className="font-bold rounded-xl"
                    style={{ background: 'linear-gradient(135deg, #1A3586, #3D6B9E)', color: '#FFFFFF' }}>
                    <Phone className="w-4 h-4 mr-2" /> {phone}
                  </Button>
                </a>
                <a href={`mailto:${email}`}>
                  <Button variant="outline" size="lg" className="font-bold rounded-xl"
                    style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#FFFFFF', background: 'transparent' }}>
                    <Mail className="w-4 h-4 mr-2" /> Email {firstName}
                  </Button>
                </a>
                {linkedin && (
                  <a href={linkedin} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="lg" className="font-bold rounded-xl"
                      style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#FFFFFF', background: 'transparent' }}>
                      <Linkedin className="w-4 h-4 mr-2" /> LinkedIn
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BIO ─── */}
      <section className="py-20" style={{ background: '#f8f9fb' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-black mb-5" style={{ color: DARK1 }}>About {firstName}</h2>
              <p className="text-slate-600 leading-relaxed mb-5">{bio}</p>
              <p className="text-slate-600 leading-relaxed">{bioExtended}</p>
            </div>
            <div>
              {/* Specialties */}
              <div className="rounded-2xl p-7 border border-slate-200 bg-white shadow-sm mb-6">
                <div className="flex items-center gap-2 mb-5">
                  <Shield className="w-5 h-5" style={{ color: DARK2 }} />
                  <h3 className="font-black text-sm uppercase tracking-widest" style={{ color: DARK2 }}>Specialties</h3>
                </div>
                <div className="space-y-3">
                  {specialties.map(s => (
                    <div key={s} className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: DARK3 }} />
                      <span className="text-sm font-semibold text-slate-700">{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Card */}
              <div className="rounded-2xl p-7 border border-slate-200 bg-white shadow-sm">
                <h3 className="font-black text-sm uppercase tracking-widest mb-4" style={{ color: DARK2 }}>Contact {firstName}</h3>
                <div className="space-y-3 text-sm">
                  <a href={phoneHref} className="flex items-center gap-3 text-slate-600 hover:text-blue-700 transition-colors">
                    <Phone className="w-4 h-4" style={{ color: DARK3 }} /> {phone}
                  </a>
                  <a href={`mailto:${email}`} className="flex items-center gap-3 text-slate-600 hover:text-blue-700 transition-colors">
                    <Mail className="w-4 h-4" style={{ color: DARK3 }} /> {email}
                  </a>
                  {licenseVerifyUrl && (
                    <a href={licenseVerifyUrl} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-3 text-slate-600 hover:text-blue-700 transition-colors">
                      <Shield className="w-4 h-4" style={{ color: DARK3 }} /> Verify License #{licenseNumber}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CALENDAR ─── */}
      <section id="schedule" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4 text-xs font-bold uppercase tracking-widest"
              style={{ background: `rgba(26,53,134,0.08)`, color: DARK2 }}>
              <Calendar className="w-3.5 h-3.5" />
              Schedule a Call
            </div>
            <h2 className="text-4xl font-black mb-3" style={{ color: DARK1 }}>
              Book Time with {firstName}
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Pick a time that works for you. Free consultations, no commitment required.
            </p>
          </div>

          {/* Calendly embed — dynamic URL */}
          <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200">
            {loadingCalendly ? (
              <div className="flex items-center justify-center h-48 bg-slate-50">
                <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
              </div>
            ) : calendlyUrl ? (
              <iframe
                src={`${calendlyUrl}?embed_type=Inline&hide_landing_page_details=1&hide_gdpr_banner=1`}
                width="100%"
                height="700"
                frameBorder="0"
                title={`Book with ${name}`}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-48 bg-slate-50 gap-3">
                <Calendar className="w-8 h-8 text-slate-300" />
                <p className="text-slate-500 text-sm">Scheduling not available — please call or email directly.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── TEAM CTA ─── */}
      <section className="py-16 text-center text-white"
        style={{ background: `linear-gradient(135deg, ${DARK1}, ${DARK2})` }}>
        <div className="max-w-2xl mx-auto px-4">
          <Users className="w-10 h-10 mx-auto mb-4 text-blue-300" />
          <h2 className="text-3xl font-black mb-3">Meet the Full Team</h2>
          <p className="text-slate-300 mb-6 text-sm">
            Our entire team of licensed brokers is here to serve you — in every state, for every product.
          </p>
          <Button asChild size="lg" className="font-bold rounded-xl"
            style={{ background: 'linear-gradient(135deg, #1A3586, #3D6B9E)', color: '#FFFFFF' }}>
            <Link to={createPageUrl('About')}>
              View All Brokers <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}