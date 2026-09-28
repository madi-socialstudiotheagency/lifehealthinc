// The LifeHealthInc mark: the shield (hosted on our own domain, transparent
// background, public/brand/) plus the name set in live text, so it stays sharp
// at every size and never depends on a third-party image host.

export default function BrandLogo({ size = 40, tone = 'light', showName = true, className = '' }) {
  const text = tone === 'light' ? '#FFFFFF' : '#081730';
  const sub = tone === 'light' ? 'rgba(255,255,255,0.65)' : '#5b6b85';
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img
        src="/brand/lhi-shield-192.png"
        srcSet="/brand/lhi-shield-192.png 1x, /brand/lhi-shield-512.png 2x"
        alt={showName ? '' : 'LifeHealthInc'}
        width={Math.round(size * 0.93)}
        height={size}
        style={{ height: size, width: 'auto' }}
        decoding="async"
      />
      {showName && (
        <span className="leading-none">
          <span className="block font-display font-extrabold tracking-tight whitespace-nowrap" style={{ color: text, fontSize: Math.max(16, size * 0.46) }}>
            LifeHealthInc
          </span>
          <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] mt-1 whitespace-nowrap" style={{ color: sub }}>
            Independent Insurance Brokerage
          </span>
        </span>
      )}
    </span>
  );
}
