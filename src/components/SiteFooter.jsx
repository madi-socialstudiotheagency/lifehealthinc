import { Link } from 'react-router-dom';

export default function SiteFooter() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-6">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <span className="font-black text-white text-base">
          Life<span className="text-blue-400">Health</span>Inc
        </span>
        <div className="flex gap-5">
          {['Privacy', 'Disclosures', 'Licensing', 'Contact'].map(l => (
            <Link key={l} to="/ContactPage" className="hover:text-white transition-colors">{l}</Link>
          ))}
        </div>
        <p className="text-center sm:text-right">© 2026 LifeHealthInc · Licensed Insurance Brokerage · Not affiliated with any government agency.</p>
      </div>
    </footer>
  );
}