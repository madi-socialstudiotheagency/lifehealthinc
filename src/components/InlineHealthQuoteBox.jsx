import { Link } from 'react-router-dom';
import { ArrowRight, Zap } from 'lucide-react';

const NAVY = '#081730';
const BLUE = '#1A3586';

export default function InlineHealthQuoteBox() {
  return (
    <div className="rounded-2xl border border-blue-100 bg-white shadow-sm p-6 w-full">
      <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest mb-2" style={{ color: BLUE }}>
        <Zap className="w-4 h-4" /> Apply online
      </p>
      <h3 className="text-xl font-black mb-1" style={{ color: NAVY }}>Protect your home in about five minutes</h3>
      <p className="text-sm text-slate-600 mb-4">
        Answer one short form and a licensed advisor prepares your application. No phone call needed.
      </p>
      <Link
        to="/get-started/mortgage-protection"
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-bold text-white"
        style={{ background: BLUE }}
      >
        Start my application <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
