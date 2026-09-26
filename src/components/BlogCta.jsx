import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const NAVY = '#081730';
const BLUE = '#1A3586';

export default function BlogCta() {
  return (
    <div className="text-center rounded-2xl p-8 md:p-12 mt-12 text-white" style={{ background: `linear-gradient(135deg, ${NAVY}, ${BLUE})` }}>
      <h2 className="text-2xl md:text-3xl font-black mb-3">Ready to get covered?</h2>
      <p className="text-blue-100 mb-6 max-w-xl mx-auto">
        Apply online in a few minutes. A licensed advisor prepares your application, and you never have to get on a call.
      </p>
      <Link
        to="/get-started"
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 font-bold"
        style={{ color: BLUE }}
      >
        Start my application <ArrowRight className="w-4 h-4" />
      </Link>
      <p className="text-blue-200 text-xs mt-4">Free, no obligation, licensed in all 50 states.</p>
    </div>
  );
}
