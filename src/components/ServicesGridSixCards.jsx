import { useMemo, useState } from "react";
import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, y: 10 },
  show: i => ({ opacity: 1, y: 0, transition: { delay: 0.05 * i, duration: 0.35 }})
};

function FancyCard({ i, icon, title, desc, onClick, learnMore }) {
  const Icon = icon;
  return (
    <motion.button
      custom={i}
      variants={variants}
      initial="hidden"
      animate="show"
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group relative w-full text-left rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.6)] backdrop-blur
                 transition-colors hover:border-indigo-400/40 hover:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
    >
      {/* subtle shine */}
      <span className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity
                       bg-[radial-gradient(200px_80px_at_20%_-20%,rgba(255,255,255,0.15),transparent)]" />
      <div className="relative flex items-center gap-4">
        <div className="rounded-xl p-3 bg-slate-800/60 ring-1 ring-white/10 group-hover:bg-indigo-600/20 transition-colors">
          <Icon className="h-6 w-6 text-indigo-300 group-hover:text-indigo-200" />
        </div>
        <h3 className="text-white font-semibold">{title}</h3>
      </div>
      <p className="relative mt-2 text-sm text-slate-300">{desc}</p>
      <div className="relative mt-3 text-indigo-300 group-hover:text-indigo-200 text-sm font-medium">{learnMore}</div>
      {/* glow ring on hover */}
      <span className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition
                       ring-1 ring-indigo-400/40" />
    </motion.button>
  );
}

/**
 * ServicesGridSixCards with "Learn More" modal
 *
 * Drop this component wherever you render your product/category cards.
 * It matches a clean Tailwind card style and supports a configurable 6th card:
 *  - sixthOption="final"  → Final Expense Insurance (keeps life/health focus)
 *  - sixthOption="auto"   → Auto Insurance (broadens into personal lines)
 *
 * Interactions:
 *  - Clicking the CARD triggers onSelect(key) (continue funnel)
 *  - Clicking the "Learn more" link opens a modal with plain‑English info
 *
 * Example:
 * <ServicesGridSixCards sixthOption="final" onSelect={(key) => navigate(`/quote/${key}`)} />
 */
export default function ServicesGridSixCards({ onSelect, sixthOption = "final" }) {
  const [learnKey, setLearnKey] = useState(null);

  const baseCards = [
    {
      key: "life_insurance",
      title: "Life Insurance",
      desc: "Term & permanent coverage tailored to your family and budget.",
      icon: LifeIcon,
    },
    {
      key: "mortgage_protection",
      title: "Mortgage Protection",
      desc: "Keep the home secure if you pass away, get sick, or become disabled.",
      icon: MortgageIcon,
    },
    {
      key: "health_insurance",
      title: "Health Insurance",
      desc: "Private, ACA, and supplemental plans built around your needs.",
      icon: HealthIcon,
    },
    {
      key: "medicare",
      title: "Medicare",
      desc: "MA, Medigap, and Part D guidance with no-cost plan reviews.",
      icon: MedicareIcon,
    },
    {
      key: "annuity",
      title: "Annuities",
      desc: "Protect principal and create lifetime income you can't outlive.",
      icon: AnnuityIcon,
    },
  ];

  const sixthCard =
    sixthOption === "auto"
      ? {
          key: "auto_insurance",
          title: "Auto Insurance",
          desc: "Protect your car and stay covered on the road.",
          icon: AutoIcon,
        }
      : {
          key: "final_expense",
          title: "Final Expense Insurance",
          desc: "Affordable coverage for funeral and end‑of‑life costs.",
          icon: FinalExpenseIcon,
        };

  const cards = [...baseCards, sixthCard];

  const learnContent = useMemo(() => getLearnContent(sixthOption), [sixthOption]);

  const handleCtaClick = () => {
    if (learnKey) {
      onSelect?.(learnKey);
    }
    setLearnKey(null);
  };

  const handleLearnMore = (e, key) => {
    e.stopPropagation(); // Prevent card click
    setLearnKey(key);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {cards.map(({ key, title, desc, icon }, index) => (
          <FancyCard
            key={key}
            i={index}
            icon={icon}
            title={title}
            desc={desc}
            onClick={() => onSelect?.(key)}
            learnMore={
              <span 
                onClick={(e) => handleLearnMore(e, key)}
                className="cursor-pointer hover:underline"
              >
                Learn more →
              </span>
            }
          />
        ))}
      </div>

      <LearnMoreModal
        open={!!learnKey}
        onClose={() => setLearnKey(null)}
        onCtaClick={handleCtaClick}
        {...(learnKey ? learnContent[learnKey] : {})}
      />
    </>
  );
}

/* ----------------------------- Learn Content ----------------------------- */
function getLearnContent(sixthOption) {
  return {
    life_insurance: {
      title: "Life Insurance",
      bullets: [
        "Pays a tax‑free lump sum to your loved ones if you pass away.",
        "Best for replacing income, covering debts, and leaving a legacy.",
        "Types: Term (affordable, 10–30 yrs) • Permanent (whole/UL with cash value).",
      ],
      cta: "See life insurance options",
    },
    mortgage_protection: {
      title: "Mortgage Protection",
      bullets: [
        "Designed to keep your family in the home if something happens.",
        "Covers death, and optional riders for critical/chronic illness or disability.",
        "Sized to your balance or a set number of mortgage payments.",
      ],
      cta: "Check mortgage protection",
    },
    health_insurance: {
      title: "Health Insurance",
      bullets: [
        "ACA marketplace, private health, and supplemental options.",
        "Match your doctors, prescriptions, and budget.",
        "Short‑term gap plans available outside open enrollment.",
      ],
      cta: "Explore health plans",
    },
    medicare: {
      title: "Medicare",
      bullets: [
        "Guidance on Medicare Advantage, Medigap, and Part D.",
        "Avoid penalties and coverage gaps; annual plan reviews included.",
        "We help verify doctors and drugs are in‑network.",
      ],
      cta: "Review Medicare options",
    },
    annuity: {
      title: "Annuities",
      bullets: [
        "Tax‑deferred growth with principal protection (fixed & indexed).",
        "Create guaranteed lifetime income you can't outlive.",
        "Time horizons from 3–15+ years; penalty‑free withdrawals available.",
      ],
      cta: "Compare annuity strategies",
    },
    ...(sixthOption === "auto"
      ? {
          auto_insurance: {
            title: "Auto Insurance",
            bullets: [
              "Liability, collision, and comprehensive coverage options.",
              "Bundle discounts available when combined with other policies.",
              "SR‑22 and high‑risk options available in many states.",
            ],
            cta: "Get auto coverage",
          },
        }
      : {
          final_expense: {
            title: "Final Expense Insurance",
            bullets: [
              "Affordable whole‑life designed for funeral and end‑of‑life costs.",
              "Premiums never increase; coverage doesn't expire.",
              "Simplified issue options; quick approvals common.",
            ],
            cta: "See final expense quotes",
          },
        }),
  };
}

/* --------------------------------- Modal -------------------------------- */
function LearnMoreModal({ open, onClose, onCtaClick, title, bullets = [], cta }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="learn-more-title"
        className="relative w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl text-slate-100"
      >
        <div className="flex items-start justify-between gap-6">
          <h3 id="learn-more-title" className="text-xl font-semibold">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200" aria-label="Close dialog">✕</button>
        </div>
        <ul className="mt-4 space-y-2 text-sm">
          {bullets.map((b, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-indigo-400" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-3 py-2 rounded-lg border border-slate-700 text-slate-200 hover:bg-slate-800"
          >
            Close
          </button>
          {cta && (
            <button
              onClick={onCtaClick}
              className="px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium"
            >
              {cta}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- Inline Icons ------------------------------ */
function LifeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M12 3l7 4v5c0 5-7 9-7 9s-7-4-7-9V7l7-4z" />
      <path d="M8 12h2l1-2 1 3 1-1h2" />
    </svg>
  );
}

function MortgageIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M3 11l9-7 9 7" />
      <path d="M5 10v10h14V10" />
      <path d="M8 16l2 2 4-4" />
    </svg>
  );
}

function HealthIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M6 3v6a4 4 0 108 0V3" />
      <path d="M14 9a4 4 0 108 0" opacity="0.15" />
      <circle cx="18" cy="9" r="2" />
      <path d="M10 13v2a4 4 0 004 4h2" />
    </svg>
  );
}

function MedicareIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M12 2v20" />
      <path d="M7 7c2-2 8-2 10 0M7 17c2 2 8 2 10 0" />
      <circle cx="12" cy="7" r="1.5" />
      <circle cx="12" cy="17" r="1.5" />
    </svg>
  );
}

function AnnuityIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M12 3l7 4v5c0 5-7 9-7 9s-7-4-7-9V7l7-4z" />
      <path d="M12 10c1.657 0 3 .843 3 1.88S13.657 13.76 12 13.76s-3 .843-3 1.88S10.343 17.52 12 17.52" />
    </svg>
  );
}

function FinalExpenseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="2" />
      <path d="M12 4c1.5 2 1.5 4 0 6-1.5-2-1.5-4 0-6z" />
      <path d="M12 14c1.5 2 1.5 4 0 6-1.5-2-1.5-4 0-6z" />
      <path d="M4 12c2-1.5 4-1.5 6 0-2 1.5-4 1.5-6 0z" />
      <path d="M14 12c2-1.5 4-1.5 6 0-2 1.5-4 1.5-6 0z" />
    </svg>
  );
}

function AutoIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M3 13l2-5h14l2 5" />
      <path d="M5 13v5a2 2 0 002 2h10a2 2 0 002-2v-5" />
      <circle cx="8" cy="18" r="1.5" />
      <circle cx="16" cy="18" r="1.5" />
    </svg>
  );
}