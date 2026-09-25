import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, FileText, Mail, Zap } from 'lucide-react';
import { applyFor } from '@/data/productApply';

const NAVY = '#081730';
const BLUE = '#1A3586';

// Placed near the top of every product page: the "do it online" path for that
// exact product, so no one has to call to get started.
export default function ApplyOnlineBand({ page }) {
  const cfg = applyFor(page);
  if (!cfg) return null;
  return (
    <section className="bg-white border-y border-slate-100">
      <div className="max-w-5xl mx-auto px-4 py-10 md:py-12">
        <div className="grid md:grid-cols-[1.3fr_1fr] gap-8 items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: BLUE }}>Apply online, no call needed</p>
            <h2 className="text-2xl md:text-3xl font-black mb-4 leading-tight" style={{ color: NAVY }}>
              Apply for {cfg.product} online in minutes
            </h2>
            <ul className="space-y-2 mb-6">
              {[
                { icon: FileText, text: 'Answer one simple form, about 5 minutes' },
                { icon: CheckCircle, text: 'A licensed advisor prepares your application for you' },
                { icon: Mail, text: 'Updates by email or text, we only call if you want us to' },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-2 text-sm text-slate-600">
                  <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: BLUE }} /> {text}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <Link
              to={`/get-started/${cfg.formId}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 font-bold text-white text-base shadow-lg"
              style={{ background: BLUE }}
            >
              Start my application <ArrowRight className="w-4 h-4" />
            </Link>
            {cfg.instant && (
              <a
                href={cfg.instant.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-bold text-sm border-2"
                style={{ borderColor: BLUE, color: BLUE }}
              >
                <Zap className="w-4 h-4" /> {cfg.instant.label}
              </a>
            )}
            <p className="text-xs text-slate-400 text-center">Free. No obligation. Licensed in all 50 states.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
