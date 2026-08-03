import { Calendar, Mail, Phone, User, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DARK1 = '#081730';
const DARK2 = '#1A3586';
const DARK3 = '#3D6B9E';

export default function BrokerCard({ agent, loading }) {
  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-100 bg-white shadow-sm p-6 animate-pulse">
        <div className="h-4 bg-slate-100 rounded w-1/2 mb-4" />
        <div className="h-12 w-12 bg-slate-100 rounded-full mb-3" />
        <div className="h-5 bg-slate-100 rounded w-3/4 mb-2" />
        <div className="h-4 bg-slate-100 rounded w-full mb-2" />
        <div className="h-10 bg-slate-100 rounded mt-4" />
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="rounded-2xl border border-slate-100 bg-white shadow-sm p-6">
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: DARK3 }}>Your Dedicated Broker</p>
        <div className="flex items-center gap-3 py-4">
          <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #e8edf5, #c8d3e8)' }}>
            <User className="w-6 h-6 text-slate-400" />
          </div>
          <div>
            <p className="font-semibold text-slate-700">Not yet assigned</p>
            <p className="text-sm text-slate-400">Contact us to be connected with a broker.</p>
          </div>
        </div>
        <Button asChild className="w-full font-bold rounded-xl mt-2"
          style={{ background: `linear-gradient(135deg, ${DARK1}, ${DARK2})`, color: '#fff' }}>
          <a href="tel:9545430853"><Phone className="w-4 h-4 mr-2" /> (954) 543-0853</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-100 bg-white shadow-sm p-6">
      <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: DARK3 }}>Your Dedicated Broker</p>

      {/* Avatar + Name */}
      <div className="flex items-center gap-4 mb-5">
        {agent.photoUrl ? (
          <img src={agent.photoUrl} alt={agent.name}
            className="w-14 h-14 rounded-full object-cover border-2 border-slate-100 flex-shrink-0" />
        ) : (
          <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xl font-black"
            style={{ background: `linear-gradient(135deg, ${DARK1}, ${DARK2})` }}>
            {agent.name?.charAt(0)}
          </div>
        )}
        <div>
          <p className="font-black text-base" style={{ color: DARK1 }}>{agent.name}</p>
          <p className="text-xs text-slate-500">{agent.title || 'Licensed Broker'}</p>
        </div>
      </div>

      {/* Contact details */}
      <div className="space-y-2 text-sm mb-5">
        {agent.email && (
          <a href={`mailto:${agent.email}`}
            className="flex items-center gap-2 text-slate-500 hover:text-blue-700 transition-colors">
            <Mail className="w-3.5 h-3.5 flex-shrink-0" style={{ color: DARK3 }} />
            {agent.email}
          </a>
        )}
        {agent.phone && (
          <a href={`tel:${agent.phone.replace(/\D/g, '')}`}
            className="flex items-center gap-2 text-slate-500 hover:text-blue-700 transition-colors">
            <Phone className="w-3.5 h-3.5 flex-shrink-0" style={{ color: DARK3 }} />
            {agent.phone}
          </a>
        )}
      </div>

      {/* Book button */}
      {agent.calendlyUrl ? (
        <Button asChild className="w-full font-bold rounded-xl"
          style={{ background: `linear-gradient(135deg, ${DARK1}, ${DARK2})`, color: '#fff' }}>
          <a href={agent.calendlyUrl} target="_blank" rel="noopener noreferrer">
            <Calendar className="w-4 h-4 mr-2" /> Book a Policy Review
          </a>
        </Button>
      ) : (
        <Button asChild className="w-full font-bold rounded-xl"
          style={{ background: `linear-gradient(135deg, ${DARK1}, ${DARK2})`, color: '#fff' }}>
          <a href={`mailto:${agent.email}`}>
            <Mail className="w-4 h-4 mr-2" /> Email My Broker
          </a>
        </Button>
      )}
    </div>
  );
}