import { useState } from "react";

const MATTHEW_SCHEDULE_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ3HIQfT_n-IUvWsq-YGM6Ye1vljt7UGNqADlat84Pe75ILLNMjH1jVU2gy0oFG05tATaVTAwN67?gv=true";

export default function SchedulerChat() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="min-h-screen py-12 px-4"
      style={{ background: "linear-gradient(135deg, #081730 0%, #1A3586 100%)" }}
    >
      <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden bg-white shadow-2xl">
        <div className="text-center px-6 pt-10 pb-6">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#1A3586" }}>
            Free Consultation &mdash; No Pressure
          </p>
          <h1 className="text-3xl md:text-4xl font-black mb-3" style={{ color: "#081730" }}>
            Book a Free Call
          </h1>
          <p className="text-slate-600 text-base max-w-xl mx-auto">
            Pick a time below and a licensed advisor will walk you through your options. Rather skip the call?{" "}
            <a href="/get-started" className="font-bold underline" style={{ color: "#1A3586" }}>Apply online instead</a>.
          </p>
        </div>

        <div className="relative border-t border-slate-100">
          {!loaded && (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-white"
              style={{ minHeight: "600px" }}
            >
              <div className="w-10 h-10 border-4 border-slate-200 border-t-transparent rounded-full animate-spin mb-4" style={{ borderTopColor: "#1A3586" }} />
              <p className="text-slate-400 text-sm">Loading calendar...</p>
            </div>
          )}
          <iframe
            src={MATTHEW_SCHEDULE_URL}
            style={{ width: "100%", border: "none", minHeight: "600px", display: "block" }}
            title="Book a call with Matthew Anderson"
            onLoad={() => setLoaded(true)}
          />
        </div>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 px-6 py-5 text-xs text-slate-500 border-t border-slate-100">
          <span>&#x1F4C5; Pick any available time slot</span>
          <span>&#x23F1; 30-minute focused review</span>
          <span>&#x1F512; Secure and confidential</span>
          <span>&#x1F4DE; Licensed advisor on every call</span>
        </div>
      </div>
    </div>
  );
}
