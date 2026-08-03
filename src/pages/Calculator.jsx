import { useState, useEffect, useRef } from "react";

export default function CalculatorPage() {
  const [iframeHeight, setIframeHeight] = useState(900);
  const iframeRef = useRef(null);
  const [transactionalConsent, setTransactionalConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  useEffect(() => {
    const handleMessage = (e) => {
      if (
        iframeRef.current &&
        e.data &&
        typeof e.data === "object" &&
        e.data.height
      ) {
        setIframeHeight(Math.max(900, e.data.height + 100));
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div style={{ background: "linear-gradient(160deg, #041830 0%, #0a2d52 50%, #041830 100%)", minHeight: "100vh" }}>

      {/* Hero */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "60px 24px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 800, color: "#ffffff", lineHeight: 1.15, margin: "0 0 16px" }}>
            Stop Overpaying for<br />
            <span style={{ color: "#38bdf8" }}>Life &amp; Health Insurance</span>
          </h1>
          <p style={{ fontSize: "1.15rem", color: "#94a3b8", maxWidth: "600px", margin: "0 auto 12px", lineHeight: 1.6 }}>
            Get your personalized quote in under 60 seconds &mdash; compare top carriers side-by-side, for free.
          </p>
          <p style={{ fontSize: "0.9rem", color: "#64748b", margin: 0 }}>
            No pushy sales calls. No spam. Just your best rate from a licensed advisor.
          </p>
        </div>

        {/* Social Proof Bar */}
        <div style={{ display: "flex", justifyContent: "center", gap: "40px", flexWrap: "wrap", marginBottom: "56px" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#facc15" }}>1,000+</div>
            <div style={{ fontSize: "0.8rem", color: "#94a3b8", marginTop: "4px" }}>Families Protected</div>
          </div>
          <div style={{ width: "1px", background: "#1e3a5f" }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#facc15" }}>30+</div>
            <div style={{ fontSize: "0.8rem", color: "#94a3b8", marginTop: "4px" }}>States Licensed</div>
          </div>
          <div style={{ width: "1px", background: "#1e3a5f" }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#facc15" }}>5-Star</div>
            <div style={{ fontSize: "0.8rem", color: "#94a3b8", marginTop: "4px" }}>Client Reviews</div>
          </div>
          <div style={{ width: "1px", background: "#1e3a5f" }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#facc15" }}>50+</div>
            <div style={{ fontSize: "0.8rem", color: "#94a3b8", marginTop: "4px" }}>Top-Rated Carriers</div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "start" }}>

          {/* Left Column — Benefits + Testimonial */}
          <div>
            {/* Benefits Card */}
            <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", padding: "32px", marginBottom: "24px" }}>
              <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#ffffff", margin: "0 0 24px" }}>
                Why families choose LifeHealthInc:
              </h2>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
                {[
                  { icon: "💰", title: "Save Up to 40% on Premiums", desc: "We shop 20+ carriers to find your lowest rate instantly." },
                  { icon: "🛡️", title: "Coverage That Actually Pays Out", desc: "We match you to policies with fast, hassle-free claims." },
                  { icon: "📅", title: "No Long-Term Commitment", desc: "Flexible plans that fit your budget and life stage." },
                  { icon: "🤝", title: "Dedicated Licensed Advisor", desc: "A real expert guides you — not a chatbot or call center." },
                  { icon: "🔒", title: "100% Free, No Obligation", desc: "Your quote is always free. Zero pressure, ever." },
                ].map((b, i) => (
                  <li key={i} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                    <span style={{ fontSize: "1.4rem", lineHeight: 1 }}>{b.icon}</span>
                    <div>
                      <div style={{ fontWeight: 700, color: "#ffffff", fontSize: "0.95rem", marginBottom: "2px" }}>{b.title}</div>
                      <div style={{ color: "#94a3b8", fontSize: "0.85rem" }}>{b.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Savings Callout */}
              <div style={{ marginTop: "24px", background: "linear-gradient(135deg, #f59e0b, #facc15)", borderRadius: "10px", padding: "14px 18px", textAlign: "center" }}>
                <p style={{ margin: 0, fontWeight: 800, fontSize: "1rem", color: "#1a1a1a" }}>
                  Most clients save $300&ndash;$900/year after switching
                </p>
              </div>
            </div>

            {/* Testimonial */}
            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(56,189,248,0.2)", borderRadius: "16px", padding: "24px" }}>
              <p style={{ color: "#e2e8f0", fontSize: "0.95rem", lineHeight: 1.65, fontStyle: "italic", margin: "0 0 16px" }}>
                "I was paying $340/month for a plan that barely covered anything. LifeHealthInc got me better coverage for $198/month. I wish I had called sooner."
              </p>
              <p style={{ margin: 0, fontWeight: 700, color: "#38bdf8", fontSize: "0.9rem" }}>
                — Sandra M., Florida &nbsp;★★★★★
              </p>
            </div>
          </div>

          {/* Right Column — GHL Form */}
          <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", overflow: "hidden" }}>
            {/* Form Header */}
            <div style={{ background: "linear-gradient(135deg, #1e40af, #1A3586)", padding: "20px 24px" }}>
              <h3 style={{ margin: "0 0 4px", color: "#ffffff", fontSize: "1.15rem", fontWeight: 700 }}>
                Get Your Free Quote Now
              </h3>
              <p style={{ margin: 0, color: "#93c5fd", fontSize: "0.85rem" }}>
                Takes less than 60 seconds &bull; No credit card needed
              </p>
            </div>

            {/*
              Note: The GHL form is loaded cross-origin (leadconnectorhq.com), so we cannot
              inject CSS/JS into it from here to hide its built-in consent checkboxes.
              To remove duplicate consent fields, disable/remove them directly in the
              GHL form builder for this form.
            */}
            {/* GHL Iframe */}
            <div style={{ padding: "0" }}>
              <iframe
                ref={iframeRef}
                src="https://api.leadconnectorhq.com/widget/form/ucTFwCvAS95I2jq8F3KD"
                style={{ width: "100%", height: iframeHeight + "px", border: "none", display: "block" }}
                title="Free Insurance Quote Form"
                loading="lazy"
                scrolling="no"
              />
            </div>

            {/* Custom Consent Checkboxes */}
            <div style={{ margin: "0 20px 20px", padding: "16px", background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", display: "flex", flexDirection: "column", gap: "14px" }}>
              <label style={{ display: "flex", gap: "10px", alignItems: "flex-start", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={transactionalConsent}
                  onChange={(e) => setTransactionalConsent(e.target.checked)}
                  style={{ marginTop: "3px", flexShrink: 0, width: "16px", height: "16px", accentColor: "#38bdf8" }}
                />
                <span style={{ fontSize: "0.78rem", color: "#94a3b8", lineHeight: 1.5 }}>
                  By checking this box, I consent to receive non-marketing text messages from LifeHealthInc. Message frequency varies, message &amp; data rates may apply. Text HELP for assistance, reply STOP to opt out.
                </span>
              </label>
              <label style={{ display: "flex", gap: "10px", alignItems: "flex-start", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={marketingConsent}
                  onChange={(e) => setMarketingConsent(e.target.checked)}
                  style={{ marginTop: "3px", flexShrink: 0, width: "16px", height: "16px", accentColor: "#38bdf8" }}
                />
                <span style={{ fontSize: "0.78rem", color: "#94a3b8", lineHeight: 1.5 }}>
                  By checking this box, I consent to receive marketing and promotional messages including special offers, discounts, new product updates among others, from LifeHealthInc at the phone number provided. Frequency may vary. Message &amp; data rates may apply. Text HELP for assistance, reply STOP to opt out.
                </span>
              </label>
            </div>

            {/* Trust Footer */}
            <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap", padding: "14px 20px", borderTop: "1px solid rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.2)" }}>
              {["🔒 256-bit SSL", "📄 No Spam", "✅ Licensed Advisors", "💸 Always Free"].map((t, i) => (
                <span key={i} style={{ fontSize: "0.78rem", color: "#64748b" }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile CTA */}
      <div className="sm:hidden" style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#1A3586", padding: "14px 20px", textAlign: "center", zIndex: 50, boxShadow: "0 -4px 20px rgba(0,0,0,0.4)" }}>
        <a href="tel:9545430853" style={{ color: "#facc15", fontWeight: 700, fontSize: "1rem", textDecoration: "none" }}>
          📞 Call Now: (954) 543-0853
        </a>
      </div>

    </div>
  );
}