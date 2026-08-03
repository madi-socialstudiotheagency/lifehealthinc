import { ClipboardList } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function FloatingCalculator() {
  return (
    <Link
      to={createPageUrl("Calculator")}
      className="fixed bottom-6 right-6 text-white rounded-full p-4 shadow-2xl focus:outline-none focus:ring-4 focus:ring-yellow-500/50 transition-all hover:scale-110 z-50 w-16 h-16 flex items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #F2C94C 100%)' }}
      aria-label="Get a Quote"
    >
      <ClipboardList className="w-6 h-6" style={{ color: '#1C1B30' }} />
    </Link>
  );
}