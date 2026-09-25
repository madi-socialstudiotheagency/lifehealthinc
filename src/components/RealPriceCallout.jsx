import { Link } from 'react-router-dom';
import { ArrowRight, BadgeCheck } from 'lucide-react';

const NAVY = '#081730';
const BLUE = '#1A3586';

// A real client price, used as the headline proof point. Keep the example
// exactly as the client's actual policy, and keep the disclaimer: prices vary
// by age, ZIP code, health and plan.
export default function RealPriceCallout({ compact = false }) {
  return (
    <div className={`rounded-2xl border border-blue-100 bg-white shadow-sm ${compact ? 'p-5' : 'p-6 md:p-7'}`}>
      <div className="flex flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
          <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest mb-2" style={{ color: BLUE }}>
            <BadgeCheck className="w-4 h-4" /> Real client price
          </p>
          <p className="text-4xl md:text-5xl font-black leading-none mb-2" style={{ color: NAVY }}>
            $179<span className="text-lg font-bold text-slate-500">/month</span>
          </p>
          <p className="text-sm text-slate-600">
            Age 23, health coverage with Manhattan Life, found by shopping carriers through LifeHealthInc.
          </p>
        </div>
        <Link
          to="/health-quote"
          className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 font-bold text-white flex-shrink-0"
          style={{ background: BLUE }}
        >
          See my price <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <p className="text-[11px] text-slate-400 mt-4">
        Example of one client's actual premium. Your price depends on your age, ZIP code, health, household and the
        plan you choose, and is set by the carrier.
      </p>
    </div>
  );
}
