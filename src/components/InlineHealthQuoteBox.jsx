import { useEffect } from 'react';
import { Calendar } from 'lucide-react';

const GOLD = '#D4AF37';

export default function InlineHealthQuoteBox() {
  useEffect(() => {
    const scriptId = 'calendly-widget-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl w-full"
      style={{ background: 'linear-gradient(160deg, #1C1B30, #2C2B50)', border: `1px solid ${GOLD}30` }}>

      {/* Header */}
      <div className="flex items-center gap-2 px-5 py-4 border-b" style={{ borderColor: `${GOLD}20`, background: 'rgba(0,0,0,0.2)' }}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: `rgba(212,175,55,0.15)`, border: `1px solid ${GOLD}50` }}>
          <Calendar className="w-4 h-4" style={{ color: GOLD }} />
        </div>
        <div>
          <p className="font-black text-white text-sm leading-tight">Get Your Free Quote</p>
          <p className="text-xs text-slate-400">Book a free 10-min call with a licensed broker</p>
        </div>
      </div>

      {/* Calendly Inline Embed */}
      <div
        className="calendly-inline-widget"
        data-url="https://calendly.com/lifehealthinc/lifehealthinc?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=1C1B30&text_color=ffffff&primary_color=D4AF37"
        style={{ minWidth: '280px', height: '630px' }}
      />
    </div>
  );
}