import { Link } from 'react-router-dom';
import { ArrowRight, Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';

const NAVY = '#081730';
const BLUE = '#1A3586';

const CHANNELS = [
  { label: 'Instagram', handle: '@lifehealthinc', href: 'https://www.instagram.com/lifehealthinc', Icon: Instagram },
  { label: 'YouTube', handle: '@lifehealthinc', href: 'https://www.youtube.com/@lifehealthinc', Icon: Youtube },
  { label: 'Facebook', handle: 'LifeHealthInc', href: 'https://www.facebook.com/profile.php?id=61578880157602', Icon: Facebook },
  { label: 'LinkedIn', handle: 'Matthew Anderson', href: 'https://www.linkedin.com/in/matthew-anderson-797939296/', Icon: Linkedin },
  { label: 'X', handle: '@LifeHealthInc_', href: 'https://x.com/LifeHealthInc_', Icon: Twitter },
];

export default function Social() {
  return (
    <div className="bg-white min-h-[70vh]">
      <div className="max-w-2xl mx-auto px-5 py-12 md:py-20">
        <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: BLUE }}>Follow along</p>
        <h1 className="text-3xl md:text-4xl font-black leading-tight mb-3" style={{ color: NAVY }}>
          Plain-English insurance tips
        </h1>
        <p className="text-slate-600 mb-8">
          Short, useful posts on life, health and Medicare coverage from the LifeHealthInc team.
        </p>

        <ul className="rounded-2xl border border-slate-200 divide-y divide-slate-200 overflow-hidden mb-10">
          {CHANNELS.map(({ label, handle, href, Icon }) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 px-4 py-4 hover:bg-slate-50 transition-colors">
                <span className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${BLUE}12` }}>
                  <Icon className="w-5 h-5" style={{ color: BLUE }} />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block font-bold" style={{ color: NAVY }}>{label}</span>
                  <span className="block text-sm text-slate-500">{handle}</span>
                </span>
                <ArrowRight className="w-4 h-4 text-slate-300" />
              </a>
            </li>
          ))}
        </ul>

        <Link
          to="/get-started"
          className="flex items-center justify-center gap-2 rounded-xl px-7 py-4 font-bold text-white"
          style={{ background: BLUE }}
        >
          Ready to get covered? Apply online <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
