"use client";

import { motion, useReducedMotion, useScroll } from "framer-motion";

/* ────────────────────────────────────────────────────────────────
   Scan spine — a fixed 2px vertical track at the left edge whose
   volt fill IS the page scan: scaleY maps 1:1 to overall scroll
   progress, transform-origin top, no easing lag. Desktop (lg+)
   only; under reduced motion only the static track renders.
   ──────────────────────────────────────────────────────────────── */

export default function T2ScanSpine() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();

  return (
    <div
      className="hidden lg:block fixed left-1 top-0 z-30 h-screen w-[2px] pointer-events-none"
      aria-hidden="true"
    >
      {/* Static track */}
      <div className="absolute inset-0 bg-[var(--t2p-line)]" />

      {/* Volt fill — continuous, 1:1 with scroll. It IS the scan. */}
      {!reduced && (
        <motion.div
          className="absolute inset-0 origin-top bg-[var(--t2p-volt)]"
          style={{
            scaleY: scrollYProgress,
            boxShadow:
              "0 0 8px rgba(126, 224, 75, 0.7), 0 0 22px rgba(11, 122, 57, 0.5)",
          }}
        />
      )}
    </div>
  );
}
