"use client";

import { ReactNode, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { EASE } from "./t2-lib";

/* ────────────────────────────────────────────────────────────────
   Shared structural primitives for T2 Precision.
   One motif — the scan — expressed consistently.
   ──────────────────────────────────────────────────────────────── */

/** Coordinate-style section header: mono index + label, headline, lede. */
export function SectionHeader({
  index,
  label,
  title,
  lede,
  align = "left",
}: {
  index: string;
  label: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();

  return (
    <div
      ref={ref}
      className={`mb-14 md:mb-20 ${align === "center" ? "text-center" : ""}`}
    >
      <div
        className={`flex items-center gap-4 mb-6 ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        <span className="t2p-label" aria-hidden="true">
          {index}
        </span>
        <span
          className="relative h-px w-12 overflow-hidden bg-[var(--t2p-line-strong)]"
          aria-hidden="true"
        >
          {inView && !reduced && (
            <span className="t2p-beam-h t2p-divider-sweep absolute inset-0" />
          )}
        </span>
        <span className="t2p-label">{label}</span>
      </div>

      <motion.h2
        initial={reduced ? false : { opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: EASE }}
        className="font-innovator text-3xl md:text-5xl font-medium tracking-[-0.02em] text-[var(--t2p-text)] max-w-3xl"
        style={align === "center" ? { marginInline: "auto" } : undefined}
      >
        {title}
      </motion.h2>

      {lede && (
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.12, ease: EASE }}
          className="mt-5 text-base md:text-lg text-[var(--t2p-text-70)] max-w-xl leading-relaxed"
          style={align === "center" ? { marginInline: "auto" } : undefined}
        >
          {lede}
        </motion.p>
      )}
    </div>
  );
}

/** Full-width scanline that sweeps once when it enters the viewport. */
export function ScanDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 1 });
  const reduced = useReducedMotion();

  return (
    <div ref={ref} className="relative h-px w-full overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[var(--t2p-line)]" />
      {inView && !reduced && (
        <span className="t2p-beam-h t2p-divider-sweep absolute inset-0" />
      )}
    </div>
  );
}

/** Staggered entrance wrapper — fast-out precise, no bounce. */
export function Reveal({
  children,
  delay = 0,
  className = "",
  y = 28,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Mono key/value spec row used in readouts. */
export function SpecRow({
  k,
  v,
  accent = false,
}: {
  k: string;
  v: ReactNode;
  accent?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2.5 border-b border-[var(--t2p-line)] last:border-b-0">
      <span className="t2p-mono text-[0.6875rem] uppercase tracking-[0.16em] text-[var(--t2p-text-50)]">
        {k}
      </span>
      <span
        className={`t2p-mono text-sm text-right ${
          accent ? "text-[var(--t2p-ice)]" : "text-[var(--t2p-text)]"
        }`}
      >
        {v}
      </span>
    </div>
  );
}
