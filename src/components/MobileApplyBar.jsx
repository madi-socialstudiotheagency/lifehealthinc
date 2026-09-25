import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { applyFor } from '@/data/productApply';

const BLUE = '#1A3586';

// Sticky bottom bar on phones: one tap into the right online application for
// the page the visitor is on. Hidden on the application pages themselves.
export default function MobileApplyBar({ currentPageName }) {
  const { pathname } = useLocation();
  if (pathname.startsWith('/get-started') || pathname.startsWith('/client-portal')) return null;
  const cfg = applyFor(currentPageName);
  const to = cfg ? `/get-started/${cfg.formId}` : '/get-started';
  return (
    <div
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-slate-200 px-3 pt-2.5 flex gap-2"
      style={{ paddingBottom: 'calc(0.625rem + env(safe-area-inset-bottom))', boxShadow: '0 -4px 16px rgba(8,23,48,0.08)' }}
    >
      <a
        href="tel:9545430853"
        className="flex items-center justify-center rounded-xl w-12 border border-slate-200"
        aria-label="Call (954) 543-0853"
      >
        <Phone className="w-5 h-5" style={{ color: BLUE }} />
      </a>
      <Link
        to={to}
        className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl py-3 font-bold text-white"
        style={{ background: BLUE }}
      >
        Apply online, no call needed <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
