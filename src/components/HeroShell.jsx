import { motion } from "framer-motion";

export default function HeroShell({ children, title="What type of insurance are you looking for?", subtitle="Select a product to get started." }) {
  return (
    <div className="relative overflow-hidden">
      {/* Animated gradient + radial glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl animate-pulse" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl animate-pulse [animation-duration:6s]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.06),_transparent_55%)]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-10">
        {/* Brand line */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-6 w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300 backdrop-blur"
        >
          <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          Licensed, multi-carrier brokerage
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-center text-3xl font-bold tracking-tight"
        >
          <span className="bg-gradient-to-r from-indigo-200 via-white to-indigo-200 bg-clip-text text-transparent">
            {title}
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-2 text-center text-slate-300"
        >
          {subtitle}
        </motion.p>

        {/* Content slot (your grid) */}
        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}