import { useEffect } from 'react';

export default function SmoothScroll() {
  useEffect(() => {
    let currentY = window.scrollY;
    let targetY = window.scrollY;
    let animating = false;

    const lerp = (a, b, t) => a + (b - a) * t;
    const EASE = 0.04; // lower = slower (3-5 seconds feel)

    const onWheel = (e) => {
      e.preventDefault();
      targetY = Math.max(0, Math.min(targetY + e.deltaY * 2.5, document.body.scrollHeight - window.innerHeight));
      if (!animating) {
        animating = true;
        requestAnimationFrame(animate);
      }
    };

    const animate = () => {
      currentY = lerp(currentY, targetY, EASE);
      window.scrollTo(0, currentY);
      if (Math.abs(currentY - targetY) > 0.5) {
        requestAnimationFrame(animate);
      } else {
        currentY = targetY;
        window.scrollTo(0, currentY);
        animating = false;
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, []);

  return null;
}