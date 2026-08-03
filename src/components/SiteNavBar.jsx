import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';

const LINKS = [
  { label: 'Home', to: '/HomePage' },
  { label: 'Services', to: '/LifeInsurancePage' },
  { label: 'Medicare', to: '/MedicarePage' },
  { label: 'AUM & Wealth', to: '/AUMWealthPage' },
  { label: 'About', to: '/AboutPage' },
  { label: 'Clients', to: '/Clients' },
  { label: 'Contact', to: '/ContactPage' },
];

export default function SiteNavBar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <>
      {/* Alert bar */}
      <div className="bg-blue-900 text-white text-xs px-4 py-2 flex items-center justify-between">
        <span>🔒 Licensed Independent Brokerage — We work for YOU, not the carrier.</span>
        <a href="tel:3057249840" className="font-semibold hover:text-yellow-300 transition-colors whitespace-nowrap ml-4">(305) 724-9840</a>
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/HomePage" className="text-lg font-black tracking-tight text-gray-900">
            Life<span className="text-blue-700">Health</span>Inc
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {LINKS.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                  pathname === to ? 'text-blue-700 bg-blue-50' : 'text-gray-600 hover:text-blue-700 hover:bg-blue-50'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          <a
            href="tel:3057249840"
            className="hidden lg:flex items-center gap-2 bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
          >
            <Phone className="w-3.5 h-3.5" /> (305) 724-9840
          </a>

          <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-gray-600">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden border-t border-gray-100 bg-white px-4 pb-4 pt-2 space-y-1">
            {LINKS.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={`block px-3 py-2 rounded text-sm font-medium ${
                  pathname === to ? 'text-blue-700 bg-blue-50' : 'text-gray-600'
                }`}
              >
                {label}
              </Link>
            ))}
            <a href="tel:3057249840" className="block mt-2 bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg text-center">
              📞 (305) 724-9840
            </a>
          </div>
        )}
      </nav>
    </>
  );
}