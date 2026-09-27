import { useState } from "react";

const MATTHEW_SCHEDULE_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ3HIQfT_n-IUvWsq-YGM6Ye1vljt7UGNqADlat84Pe75ILLNMjH1jVU2gy0oFG05tATaVTAwN67?gv=true";

export default function SchedulerChat() {
  const [loaded, setLoaded] = useState(false);

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
          Book a Free Call
        </h1>
        <p className="text-blue-200 text-base">
          Pick a time and a licensed advisor will walk you through your options. Rather skip the call? You can apply online in a few minutes instead.
        </p>
      </div>

      <div className="max-w-3xl mx-auto relative">
        {!loaded && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center z-10 rounded-xl"
            style={{ background: "rgba(8,23,48,0.7)", minHeight: "600px" }}
          >
            <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-blue-200 text-sm">Loading calendar...</p>
          </div>
        )}
        <iframe
          src={MATTHEW_SCHEDULE_URL}
          style={{ width: "100%", border: "none", borderRadius: "8px", minHeight: "600px", display: "block" }}
          title="Book a call with Matthew Anderson"
          onLoad={() => setLoaded(true)}
        />
      </div>

      <p className="text-center mt-6">
        <a href="/get-started" className="inline-block rounded-lg bg-white px-6 py-3 font-bold" style={{ color: "#1A3586" }}>Apply online instead</a>
      </p>

      <div className="max-w-2xl mx-auto mt-6 flex flex-wrap justify-center gap-6 text-blue-300 text-xs">
        <span>&#x1F4C5; Pick Any Available Time Slot</span>
        <span>&#x23F1; 30-Minute Focused Review</span>
        <span>&#x1F512; Secure &amp; Confidential</span>
        <span>&#x1F4DE; Licensed Advisor on Every Call</span>
      </div>
    </div>
  );
}
