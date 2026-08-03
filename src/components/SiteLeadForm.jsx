import { useState } from 'react';

export default function SiteLeadForm() {
  const [zip, setZip] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
        <div className="text-4xl mb-3">✅</div>
        <p className="font-bold text-gray-900 mb-1">We'll be in touch shortly!</p>
        <p className="text-sm text-gray-500">
          Or call us: <a href="tel:9545430853" className="text-blue-700 font-semibold">(954) 543-0853</a>
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="font-bold text-gray-900 text-lg mb-1">Interested in Learning more?</h3>
      <p className="text-sm text-gray-500 mb-4">
        Enter your Zip to get started and a local agent will contact you soon!
      </p>
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="ZIP Code"
          value={zip}
          onChange={e => setZip(e.target.value)}
          maxLength={5}
          className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => setSubmitted(true)}
          className="bg-blue-700 text-white font-bold text-sm px-5 py-2 rounded-lg hover:bg-blue-800 transition-colors whitespace-nowrap"
        >
          Get Started
        </button>
      </div>
      <p className="text-xs text-gray-400 mt-3 text-center leading-relaxed">
        By clicking Get Started, you authorize LIFEHEALTHINC LLC to contact you regarding insurance options. Msg/data rates may apply. Consent is not a condition of purchase. <a href="/terms" className="text-blue-600 underline">Terms</a> & <a href="/privacy" className="text-blue-600 underline">Privacy</a>.
      </p>
      <p className="text-sm text-gray-500 mt-2 text-center">
        Or call{' '}
        <a href="tel:9545430853" className="font-semibold text-blue-700 hover:underline">
          (954) 543-0853
        </a>{' '}
        for a quote
      </p>
    </div>
  );
}