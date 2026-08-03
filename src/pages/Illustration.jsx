import { useMemo, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { base44 } from "@/api/base44Client";
import { handleLeadSubmission } from "../components/lead-submission-handler";
import { CheckCircle, Loader2, FileText } from "lucide-react";

/**
 * IllustrationPage.jsx (Educational IUL Projection)
 * -------------------------------------------------
 * A client-friendly "ILL page" focused on IUL (Indexed Universal Life) with
 * projected cash value under three scenarios (Low / Mid / High).
 * This is NOT a carrier illustration and should be used for education only.
 *
 * New IUL-specific features:
 *  - Index floor, cap, participation rate
 *  - Blend between Indexed bucket and Fixed bucket
 *  - Clearly labeled IUL assumptions
 */
export default function IllustrationPage() {
  // --- Inputs ---
  const [product] = useState("IUL"); // locked to IUL for this page
  const [age, setAge] = useState(35);
  const [face, setFace] = useState(250000);
  const [premium, setPremium] = useState(250); // monthly
  const [years, setYears] = useState(30);

  // Scenario assumptions (annual, before policy loads/drag)
  const [rateLow, setRateLow] = useState(0.04);   // market return assumption (pre-cap/floor/par)
  const [rateMid, setRateMid] = useState(0.06);
  const [rateHigh, setRateHigh] = useState(0.08);

  // Simple load/cost model (transparent approximation):
  const [loadFirstDecade, setLoadFirstDecade] = useState(0.08); // 8% yrs 1–10
  const [loadAfter, setLoadAfter] = useState(0.05);             // 5% yrs 11+
  const [interestDrag, setInterestDrag] = useState(0.01);       // 1% ongoing drag

  // IUL crediting parameters
  const [floor, setFloor] = useState(0.00);            // 0% floor typical
  const [cap, setCap] = useState(0.09);                // 9% example cap
  const [parRate, setParRate] = useState(1.00);        // 100% participation
  const [fixedRate, setFixedRate] = useState(0.03);    // fixed bucket
  const [mixFixed, setMixFixed] = useState(0.20);      // 20% fixed, 80% indexed

  const data = useMemo(() => buildProjection({
    years: Number(years),
    monthlyPremium: Number(premium),
    // market scenarios
    rateLow: Number(rateLow),
    rateMid: Number(rateMid),
    rateHigh: Number(rateHigh),
    // loads/drag
    loadFirstDecade: Number(loadFirstDecade),
    loadAfter: Number(loadAfter),
    interestDrag: Number(interestDrag),
    // iul crediting
    floor: Number(floor),
    cap: Number(cap),
    parRate: Number(parRate),
    fixedRate: Number(fixedRate),
    mixFixed: Math.min(1, Math.max(0, Number(mixFixed)))
  }), [years, premium, rateLow, rateMid, rateHigh, loadFirstDecade, loadAfter, interestDrag, floor, cap, parRate, fixedRate, mixFixed]);

  const summary = data[data.length - 1] || { year: 0, cvLow: 0, cvMid: 0, cvHigh: 0, creditedLow: 0, creditedMid: 0, creditedHigh: 0 };

  const mixIndexedPct = Math.round((1 - mixFixed) * 100);
  const mixFixedPct = Math.round(mixFixed * 100);

  return (
    <div className="py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto p-6 text-slate-900">
          <header className="mb-6">
            <h1 className="text-2xl font-semibold" style={{color: 'var(--brand-primary)'}}>
              IUL (Indexed Universal Life) — Projected Cash Value
            </h1>
            <p className="text-slate-600 mt-1">
              Educational projection only — not a carrier illustration. For a compliant carrier ILL, we'll generate the official PDF during your appointment.
            </p>
          </header>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Controls */}
            <div className="lg:col-span-1 space-y-4 p-4 rounded-2xl border border-slate-300 bg-white shadow-sm">
              <h2 className="font-medium text-lg" style={{color: 'var(--brand-primary)'}}>Inputs</h2>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-slate-700 mb-1">Issue Age</label>
                  <input 
                    type="number" 
                    value={age} 
                    onChange={(e) => setAge(Number(e.target.value))} 
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-700 mb-1">Face Amount ($)</label>
                  <input 
                    type="number" 
                    value={face} 
                    onChange={(e) => setFace(Number(e.target.value))} 
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-slate-700 mb-1">Monthly Premium ($)</label>
                  <input 
                    type="number" 
                    value={premium} 
                    onChange={(e) => setPremium(Number(e.target.value))} 
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-700 mb-1">Years Funded</label>
                  <input 
                    type="number" 
                    value={years} 
                    onChange={(e) => setYears(Number(e.target.value))} 
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-slate-600 mb-1">Low Market</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    value={rateLow} 
                    onChange={(e) => setRateLow(Number(e.target.value))} 
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-600 mb-1">Mid Market</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    value={rateMid} 
                    onChange={(e) => setRateMid(Number(e.target.value))} 
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-600 mb-1">High Market</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    value={rateHigh} 
                    onChange={(e) => setRateHigh(Number(e.target.value))} 
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  />
                </div>
              </div>

              <details className="mt-2" open>
                <summary className="text-sm font-medium text-slate-700 cursor-pointer">IUL Crediting (Indexed vs Fixed)</summary>
                <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                  <label className="block">Floor (min credit)
                    <input 
                      type="number" 
                      step="0.005" 
                      value={floor} 
                      onChange={(e) => setFloor(Number(e.target.value))} 
                      className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                    />
                  </label>
                  <label className="block">Cap (max credit)
                    <input 
                      type="number" 
                      step="0.005" 
                      value={cap} 
                      onChange={(e) => setCap(Number(e.target.value))} 
                      className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                    />
                  </label>
                  <label className="block">Participation
                    <input 
                      type="number" 
                      step="0.05" 
                      value={parRate} 
                      onChange={(e) => setParRate(Number(e.target.value))} 
                      className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                    />
                  </label>
                  <label className="block">Fixed Bucket Rate
                    <input 
                      type="number" 
                      step="0.005" 
                      value={fixedRate} 
                      onChange={(e) => setFixedRate(Number(e.target.value))} 
                      className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                    />
                  </label>
                  <label className="block col-span-2">Fixed Mix (0–1)
                    <input 
                      type="number" 
                      min={0} 
                      max={1} 
                      step="0.05" 
                      value={mixFixed} 
                      onChange={(e) => setMixFixed(Number(e.target.value))} 
                      className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                    />
                    <span className="text-slate-500 text-xs">Current blend: {mixFixedPct}% Fixed / {mixIndexedPct}% Indexed</span>
                  </label>
                </div>
              </details>

              <details className="mt-2">
                <summary className="text-sm text-slate-700 cursor-pointer">Policy Loads (approximation)</summary>
                <div className="mt-3 grid grid-cols-3 gap-3 text-sm">
                  <label className="block">Load Yrs 1–10
                    <input 
                      type="number" 
                      step="0.01" 
                      value={loadFirstDecade} 
                      onChange={(e) => setLoadFirstDecade(Number(e.target.value))} 
                      className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                    />
                  </label>
                  <label className="block">Load Yrs 11+
                    <input 
                      type="number" 
                      step="0.01" 
                      value={loadAfter} 
                      onChange={(e) => setLoadAfter(Number(e.target.value))} 
                      className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                    />
                  </label>
                  <label className="block">Interest Drag
                    <input 
                      type="number" 
                      step="0.01" 
                      value={interestDrag} 
                      onChange={(e) => setInterestDrag(Number(e.target.value))} 
                      className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                    />
                  </label>
                </div>
              </details>
            </div>

            {/* Chart */}
            <div className="lg:col-span-2 p-4 rounded-2xl border border-slate-300 bg-white shadow-sm">
              <h2 className="font-medium text-lg" style={{color: 'var(--brand-primary)'}}>Cash Value Projection</h2>
              <p className="text-xs text-slate-600">
                Indexed mix: {mixIndexedPct}% (floor {Math.round(floor*100)}%, cap {Math.round(cap*100)}%, par {Math.round(parRate*100)}%) • Fixed mix: {mixFixedPct}% (rate {Math.round(fixedRate*100)}%)
              </p>
              <div className="h-72 mt-3">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="year" stroke="#64748b" tick={{ fontSize: 12 }} />
                    <YAxis stroke="#64748b" tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} tick={{ fontSize: 12 }} />
                    <Tooltip 
                      formatter={(v) => `$${Number(v).toLocaleString()}`} 
                      labelFormatter={(l) => `Year ${l}`} 
                      contentStyle={{ 
                        background: "#ffffff", 
                        border: "1px solid #e2e8f0", 
                        color: "#1e293b",
                        borderRadius: "8px"
                      }} 
                    />
                    <Legend />
                    <Line type="monotone" dataKey="cvLow" name={`Low`} dot={false} stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="cvMid" name={`Mid`} dot={false} stroke="#8b5cf6" strokeWidth={2} />
                    <Line type="monotone" dataKey="cvHigh" name={`High`} dot={false} stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Summary cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                <SummaryTile label="Year" value={summary.year} />
                <SummaryTile label="Cash Value (Mid)" value={summary.cvMid} money />
                <SummaryTile label="Total Premium Paid" value={years * premium * 12} money />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3 text-xs text-slate-600">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  Credited (Low): {(summary.creditedLow*100).toFixed(1)}%
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  Credited (Mid): {(summary.creditedMid*100).toFixed(1)}%
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  Credited (High): {(summary.creditedHigh*100).toFixed(1)}%
                </div>
              </div>
            </div>
          </section>

          {/* Table */}
          <section className="mt-6 p-4 rounded-2xl border border-slate-300 bg-white shadow-sm overflow-x-auto">
            <h2 className="font-medium text-lg" style={{color: 'var(--brand-primary)'}}>Projection Table</h2>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-slate-600">
                  <tr>
                    <th className="text-left py-2">Year</th>
                    <th className="text-right py-2">Cash Value (Low)</th>
                    <th className="text-right py-2">Cash Value (Mid)</th>
                    <th className="text-right py-2">Cash Value (High)</th>
                    <th className="text-right py-2">Prem Paid (Cumulative)</th>
                    <th className="text-right py-2">Credited Low</th>
                    <th className="text-right py-2">Credited Mid</th>
                    <th className="text-right py-2">Credited High</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row) => (
                    <tr key={row.year} className="border-t border-slate-200">
                      <td className="py-2">{row.year}</td>
                      <td className="py-2 text-right">{dollar(row.cvLow)}</td>
                      <td className="py-2 text-right">{dollar(row.cvMid)}</td>
                      <td className="py-2 text-right">{dollar(row.cvHigh)}</td>
                      <td className="py-2 text-right">{dollar(row.premiumCum)}</td>
                      <td className="py-2 text-right">{(row.creditedLow*100).toFixed(1)}%</td>
                      <td className="py-2 text-right">{(row.creditedMid*100).toFixed(1)}%</td>
                      <td className="py-2 text-right">{(row.creditedHigh*100).toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <footer className="mt-6 text-xs text-slate-600 bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p>
              <strong>Disclosures:</strong> This page provides an educational projection only and is not an official carrier illustration. 
              Actual values depend on underwriting, carrier charges, index credits, caps/spreads, participation rates, policy loans, and rider costs. 
              For a compliant illustration, we will generate carrier software outputs during your consultation.
            </p>
          </footer>

          <CarrierIllustrationRequest illustrationParams={{ age, face, premium, years, cap, floor, parRate, fixedRate, mixFixed }} />
        </div>
      </div>
    </div>
  );
}

function CarrierIllustrationRequest({ illustrationParams }) {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '' });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.firstName || !form.email || !form.phone) {
      setError('Please fill in all required fields.');
      return;
    }
    setSubmitting(true);
    setError('');
    const notes = `CARRIER ILLUSTRATION REQUEST
Age: ${illustrationParams.age} | Face: $${Number(illustrationParams.face).toLocaleString()} | Monthly Premium: $${illustrationParams.premium} | Years: ${illustrationParams.years}
Cap: ${(illustrationParams.cap*100).toFixed(1)}% | Floor: ${(illustrationParams.floor*100).toFixed(1)}% | Participation: ${(illustrationParams.parRate*100).toFixed(0)}% | Fixed Rate: ${(illustrationParams.fixedRate*100).toFixed(1)}% | Fixed Mix: ${(illustrationParams.mixFixed*100).toFixed(0)}%`;

    await handleLeadSubmission({
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      type: 'contactForm',
      productType: 'life_insurance',
      primaryInterest: 'Carrier Illustration Request (IUL)',
      consent: true,
      consentText: 'User requested a carrier illustration via the IUL projection tool.',
      consentAt: new Date().toISOString(),
      submissionDate: new Date().toISOString(),
      status: 'new',
      notes
    });
    setDone(true);
    setSubmitting(false);
  };

  return (
    <div className="mt-6 p-6 rounded-2xl border-2 border-yellow-400 bg-white shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <FileText className="w-6 h-6" style={{ color: 'var(--brand-primary)' }} />
        <div>
          <h2 className="font-semibold text-lg" style={{ color: 'var(--brand-primary)' }}>Request Your Official Carrier Illustration</h2>
          <p className="text-sm text-slate-600">We'll run a compliant illustration using actual carrier software based on the parameters above.</p>
        </div>
      </div>

      {done ? (
        <div className="flex items-center gap-3 text-green-700 bg-green-50 border border-green-200 rounded-lg p-4">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <p className="font-medium">Request submitted! We'll reach out within 1 business day with your carrier illustration.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-700 mb-1">First Name *</label>
            <input
              type="text"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
              placeholder="John"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-700 mb-1">Last Name</label>
            <input
              type="text"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
              placeholder="Smith"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-700 mb-1">Email *</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-700 mb-1">Phone *</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
              placeholder="(555) 123-4567"
            />
          </div>
          {error && <p className="text-sm text-red-600 col-span-2">{error}</p>}
          <div className="col-span-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto px-8 py-3 rounded-lg font-semibold text-sm flex items-center gap-2 justify-center disabled:opacity-60"
              style={{ backgroundColor: '#D4AF37', color: '#1C1B30' }}
            >
              {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</> : <><FileText className="w-4 h-4" /> Request Carrier Illustration</>}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

function SummaryTile({ label, value, money }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
      <div className="text-xs text-slate-600">{label}</div>
      <div className="text-lg font-semibold" style={{color: 'var(--brand-primary)'}}>
        {money ? dollar(value) : value}
      </div>
    </div>
  );
}

function dollar(n) {
  return `$${Number(n).toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
}

/**
 * buildProjection — IUL flavored
 * 1) Apply loads to premium (yrs 1–10 vs 11+)
 * 2) Determine credited rate per scenario using floor/cap/participation on
 *    the indexed portion, then blend with fixed bucket by mixFixed.
 * 3) Apply ongoing interest drag to approximate policy costs.
 */
function buildProjection({ years, monthlyPremium, rateLow, rateMid, rateHigh, loadFirstDecade, loadAfter, interestDrag, floor, cap, parRate, fixedRate, mixFixed }) {
  const rows = [];
  let cvLow = 0, cvMid = 0, cvHigh = 0; // starting cash value
  let premiumCum = 0;

  const mixIdx = Math.max(0, Math.min(1, 1 - mixFixed));
  const mixFix = Math.max(0, Math.min(1, mixFixed));

  for (let y = 1; y <= years; y++) {
    const annualPrem = monthlyPremium * 12;
    premiumCum += annualPrem;

    const loadRate = y <= 10 ? loadFirstDecade : loadAfter;
    const netPrem = annualPrem * (1 - loadRate);

    // Scenario market returns → indexed credited after floor/cap/participation
    const idxLow = capFloorPar(rateLow, floor, cap, parRate);
    const idxMid = capFloorPar(rateMid, floor, cap, parRate);
    const idxHigh = capFloorPar(rateHigh, floor, cap, parRate);

    // Blend with fixed bucket
    const credLow = mixIdx * idxLow + mixFix * fixedRate;
    const credMid = mixIdx * idxMid + mixFix * fixedRate;
    const credHigh = mixIdx * idxHigh + mixFix * fixedRate;

    // Apply interest drag (policy charges approximation)
    const effLow = Math.max(0, credLow - interestDrag);
    const effMid = Math.max(0, credMid - interestDrag);
    const effHigh = Math.max(0, credHigh - interestDrag);

    cvLow = (cvLow + netPrem) * (1 + effLow);
    cvMid = (cvMid + netPrem) * (1 + effMid);
    cvHigh = (cvHigh + netPrem) * (1 + effHigh);

    rows.push({ year: y, cvLow, cvMid, cvHigh, premiumCum, creditedLow: effLow, creditedMid: effMid, creditedHigh: effHigh });
  }
  return rows;
}

function capFloorPar(marketRate, floor, cap, parRate) {
  const participated = marketRate * parRate;
  return Math.min(cap, Math.max(floor, participated));
}