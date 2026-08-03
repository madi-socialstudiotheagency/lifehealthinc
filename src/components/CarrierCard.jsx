import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ExternalLink, HelpCircle } from 'lucide-react';

export default function CarrierCard({ name, href, logo, mono = false }) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleCarrierClick = () => {
    // Google Analytics tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'carrier_login', {
        event_category: 'engagement',
        carrier: name,
        value: 1
      });
    }

    // Facebook Pixel tracking
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('trackCustom', 'CarrierLogin', {
        carrier: name
      });
    }
  };

  const PlaceholderLogo = () => (
    <div className="w-full h-full bg-white/10 rounded-lg flex items-center justify-center">
      <span className="text-xs font-bold text-center px-2" style={{ color: '#E9C46A' }}>
        {name.substring(0, 3).toUpperCase()}
      </span>
    </div>
  );

  return (
    <div className="carrier-card">
      {/* Logo Rail */}
      <div className="carrier-logo-rail">
        {logo && !imageError ? (
          <>
            {imageLoading && (
              <div className="w-full h-full bg-white/5 rounded animate-pulse"></div>
            )}
            <img
              src={logo}
              alt={`${name} logo`}
              className={`carrier-logo ${mono ? 'mono' : ''} ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
              loading="lazy"
              width="120"
              height="60"
              onLoad={() => setImageLoading(false)}
              onError={() => {
                setImageError(true);
                setImageLoading(false);
              }}
            />
          </>
        ) : (
          <PlaceholderLogo />
        )}
      </div>

      {/* Carrier Name */}
      <div className="carrier-name text-white text-center">
        {name}
      </div>

      {/* Actions */}
      <div className="carrier-actions mt-auto">
        <Button
          asChild
          className="btn-primary w-full font-semibold text-sm"
          style={{ background: 'linear-gradient(135deg, #1A3586, #3D6B9E)', color: '#FFFFFF' }}
          onClick={handleCarrierClick}
        >
          <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label={`Open ${name} customer login in a new tab`}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Customer Login
          </a>
        </Button>
        
        <Link 
          to={createPageUrl("Contact")} 
          className="helper text-center text-slate-400 hover:text-white transition-colors text-xs flex items-center justify-center gap-1"
        >
          <HelpCircle className="w-3 h-3" />
          Need Help?
        </Link>
      </div>
    </div>
  );
}