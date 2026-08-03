
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { CheckCircle, Shield } from "lucide-react";

export default function LoadingPage() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const leadId = urlParams.get('leadId');

    if (!leadId) {
      // If no leadId, redirect back to home
      navigate(createPageUrl("Home"));
      return;
    }

    // Countdown timer
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          // Redirect to Book page with leadId
          navigate(createPageUrl("Book") + `?leadId=${leadId}`);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup timer on unmount
    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center justify-center text-center py-12 px-4"
      style={{background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-secondary))'}}
    >
      <div className="max-w-2xl w-full">
        {/* Logo/Brand */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <Shield className="w-8 h-8" style={{color: 'var(--brand-accent)'}} />
          <h1 className="text-2xl font-bold text-white">LifeHealthInc</h1>
        </div>

        {/* Loading Animation */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 border-4 border-white/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-white rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-md mx-auto mb-8">
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full transition-all duration-1000 ease-out rounded-full"
              style={{
                backgroundColor: 'var(--brand-accent)',
                width: `${((3 - countdown) / 3) * 100}%`
              }}
            />
          </div>
        </div>

        {/* Main Message */}
        <div className="text-white mb-8">
          <h2 className="text-3xl font-bold mb-4">
            Your request has been received
          </h2>
          <p className="text-xl text-slate-300 mb-6">
            Your assigned LifeHealthInc agent will be reaching out shortly.
          </p>
          <p className="text-lg text-slate-400">
            Redirecting to schedule your consultation in {countdown} seconds...
          </p>
        </div>

        {/* Status Indicators */}
        <div className="flex justify-center items-center gap-8 text-slate-300">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm">Request Processed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-sm">Agent Assigned</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
            <span className="text-sm">Scheduling Available</span>
          </div>
        </div>
      </div>
    </div>
  );
}
