import { useState, useEffect } from "react";

export default function SchedulerChat() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div
      className="min-h-screen py-16 px-4"
      style={{ background: "linear-gradient(135deg, #081730 0%, #1A3586 100%)" }}
    >
      <div className="max-w-2xl mx-auto text-center mb-8">
        <p className="text-blue-300 text-sm font-semibold uppercase tracking-widest mb-2">
          Free Consultation &mdash; No Pressure
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
          Request Free Quotes
        </h1>
        <p className="text-blue-200 text-base">
          Fill out the form below. A licensed advisor will review your coverage options and answer your questions.
        </p>
      </div>

      <div className="max-w-3xl mx-auto relative">
        {!loaded && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center z-10 rounded-xl"
            style={{ background: "rgba(8,23,48,0.7)", minHeight: "400px" }}
          >
            <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-blue-200 text-sm">Loading form...</p>
          </div>
        )}
        <iframe
          src="https://api.leadconnectorhq.com/widget/form/ucTFwCvAS95I2jq8F3KD"
          style={{ width: "100%", border: "none", borderRadius: "8px", minHeight: "800px", display: "block" }}
          id="popup-ucTFwCvAS95I2jq8F3KD"
          data-layout="{'id':'POPUP'}"
          data-trigger-type="alwaysShow"
          data-trigger-value=""
          data-activation-type="alwaysActivated"
          data-activation-value=""
          data-deactivation-type="neverDeactivate"
          data-deactivation-value=""
          data-form-name="Request Free Quotes"
          data-height="704"
          data-layout-iframe-id="popup-ucTFwCvAS95I2jq8F3KD"
          data-form-id="ucTFwCvAS95I2jq8F3KD"
          title="Request Free Quotes"
          data-modal-height="498"
          onLoad={() => setLoaded(true)}
        />
      </div>

      <div className="max-w-2xl mx-auto mt-6 flex flex-wrap justify-center gap-6 text-blue-300 text-xs">
        <span>&#x1F4C5; Pick Any Available Time Slot</span>
        <span>&#x23F1; 30-Minute Focused Review</span>
        <span>&#x1F512; Secure &amp; Confidential</span>
        <span>&#x1F4DE; Licensed Advisor on Every Call</span>
      </div>
    </div>
  );
}