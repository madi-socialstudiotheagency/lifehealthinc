export default function SiteCTABand({ headline, subtext }) {
  return (
    <section className="bg-blue-700 py-10 text-center text-white">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-2xl font-black mb-2">{headline || 'Ready to protect what matters most?'}</h2>
        <p className="text-blue-100 text-sm mb-6">{subtext || 'Speak with Matthew or Collin — free consultation, no pressure, no jargon.'}</p>
        <a
          href="tel:3057249840"
          className="inline-flex items-center gap-2 bg-yellow-400 text-gray-900 font-bold text-sm px-7 py-3 rounded-lg hover:bg-yellow-300 transition-colors"
        >
          📞 Call Now — (305) 724-9840
        </a>
      </div>
    </section>
  );
}