import { useState } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import ContactForm from "../components/ContactForm";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const GOLD = '#FFFFFF';
const DARK1 = '#081730';
const DARK2 = '#1A3586';
const DARK3 = '#3D6B9E';

const SectionLabel = ({ children }) => (
  <div className="flex items-center justify-center gap-3 mb-4">
    <div className="h-px w-8 rounded-full" style={{ background: `linear-gradient(90deg, transparent, ${GOLD})` }} />
    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: GOLD }}>{children}</span>
    <div className="h-px w-8 rounded-full" style={{ background: `linear-gradient(90deg, ${GOLD}, transparent)` }} />
  </div>
);

const contactItems = [
  { icon: Phone, title: 'Phone', content: <a href="tel:9545430853" className="text-slate-300 hover:text-white transition-colors font-semibold">(954) 543-0853</a> },
  { icon: Mail, title: 'Email', content: <a href="mailto:info@lifehealthinc.org" className="text-slate-300 hover:text-white transition-colors font-semibold">info@lifehealthinc.org</a> },
  { icon: MapPin, title: 'Address', content: <p className="text-slate-300 text-sm leading-relaxed">18245 Paulson Dr Ste VP-2, #508<br />Port Charlotte, FL 33954</p> },
];

const hours = [
  { day: 'Monday – Friday', time: '9:00 AM – 6:00 PM EST' },
  { day: 'Saturday', time: '10:00 AM – 2:00 PM EST' },
  { day: 'Sunday', time: 'Closed' },
];

const brokers = [
  { id: 'all', name: 'All Brokers', email: 'info@lifehealthinc.org', phone: '(954) 543-0853' },
  { id: 'matthew', name: 'Matthew Anderson', email: 'matthew@lifehealthinc.org', phone: '(954) 543-0853' },
  { id: 'broker2', name: 'Broker 2', email: 'broker2@lifehealthinc.org', phone: '(954) 543-0853' },
  { id: 'broker3', name: 'Broker 3', email: 'broker3@lifehealthinc.org', phone: '(954) 543-0853' },
];

export default function ContactPage() {
  const [selectedBroker, setSelectedBroker] = useState('all');
  const broker = brokers.find(b => b.id === selectedBroker) || brokers[0];

  return (
    <div className="min-h-screen" style={{ background: `linear-gradient(180deg, ${DARK1} 0%, ${DARK2} 50%, ${DARK3} 100%)` }}>
      
      {/* ─── HERO ─── */}
      <section className="relative py-24 overflow-hidden text-white">
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${GOLD}0D, transparent 70%)`, transform: 'translateY(-30%)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none" style={{ background: `linear-gradient(transparent, ${DARK2})` }} />

        <div className="max-w-3xl mx-auto px-4 text-center relative">
          <SectionLabel>Reach Out</SectionLabel>
          <h1 className="text-5xl md:text-6xl font-black mb-6 text-white">
            Contact Us
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed">
            Have questions? We're here to help. Send us a message or reach out directly.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">

        {/* ─── CONTACT CARDS ─── */}
        <div className="grid lg:grid-cols-3 gap-6 mb-16">
          {contactItems.map(({ icon: Icon, title, content }, i) => (
            <div key={i} className="rounded-2xl p-8 border border-white/10 text-center hover:border-yellow-500/30 transition-all duration-300 group relative overflow-hidden"
              style={{ background: 'linear-gradient(160deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))' }}>
              <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(90deg, ${GOLD}00, ${GOLD}, ${GOLD}00)` }} />
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"
                style={{ background: `linear-gradient(135deg, #1A3586, #3D6B9E)` }}>
                <Icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-black text-lg mb-3 text-white">{title}</h3>
              {content}
            </div>
          ))}
        </div>

        {/* ─── BROKER SELECTOR ─── */}
        <div className="max-w-2xl mx-auto mb-12">
          <label className="block text-sm font-semibold text-white mb-3">Who would you like to contact?</label>
          <Select value={selectedBroker} onValueChange={setSelectedBroker}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white h-12">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {brokers.map(b => (
                <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="mt-4 p-4 rounded-lg bg-white/5 border border-white/10">
            <p className="text-sm text-slate-300 mb-2">
              <span className="font-semibold text-white">{broker.name}</span>
            </p>
            <p className="text-xs text-slate-400">Email: <span className="text-slate-200">{broker.email}</span></p>
            <p className="text-xs text-slate-400">Phone: <span className="text-slate-200">{broker.phone}</span></p>
          </div>
        </div>

        {/* ─── CONTACT FORM ─── */}
        <div className="max-w-3xl mx-auto mb-16">
          <ContactForm variant="embedded" />
        </div>

        {/* ─── HOURS ─── */}
        <div className="max-w-md mx-auto">
          <div className="rounded-2xl p-8 border border-white/10 text-center"
            style={{ background: 'linear-gradient(160deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))' }}>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
              style={{ background: `linear-gradient(135deg, #1A3586, #3D6B9E)` }}>
              <Clock className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-black text-lg mb-5 text-white">Business Hours</h3>
            <div className="space-y-3">
              {hours.map(({ day, time }) => (
                <div key={day} className="flex justify-between items-center text-sm px-2">
                  <span className="text-slate-400">{day}</span>
                  <span className="text-white font-semibold">{time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}