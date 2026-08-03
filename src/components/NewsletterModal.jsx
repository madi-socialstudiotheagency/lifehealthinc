import NewsletterSignup from "./NewsletterSignup";

export default function NewsletterModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} aria-hidden="true" />
      <div className="relative w-full max-w-lg rounded-2xl overflow-hidden bg-white shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="p-8">
          <NewsletterSignup 
            variant="modal" 
            onSuccess={() => {
              // Keep modal open briefly to show success message
              setTimeout(onClose, 2000);
            }}
          />
        </div>
      </div>
    </div>
  );
}