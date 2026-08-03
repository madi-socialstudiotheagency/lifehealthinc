export default function CalendlyModal({ open, onClose, url }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} aria-hidden="true" />
      <div className="relative w-full max-w-5xl h-[85vh] rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-10 rounded-full p-1 text-slate-300 hover:bg-slate-800 hover:text-white"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {url ? (
          <iframe
            title="Book with LifeHealthInc"
            src={url}
            className="w-full h-full"
            frameBorder="0"
            style={{ overflow: 'auto' }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400">
            <p>Calendly URL not configured.</p>
          </div>
        )}
      </div>
    </div>
  );
}