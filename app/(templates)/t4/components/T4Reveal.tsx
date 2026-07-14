"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/** The single easing every Atelier movement shares — unhurried, certain. */
export const ATELIER_EASE = [0.22, 1, 0.36, 1] as const;

interface T4RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger offset in seconds. */
  delay?: number;
  /** Entrance rise distance in px — Atelier rises are shallow. */
  y?: number;
  duration?: number;
}

/**
 * Shared scroll reveal: a slow, composed fade-and-rise that fires once.
 * Renders settled when the visitor prefers reduced motion.
 */
export default function T4Reveal({
  children,
  className,
  delay = 0,
  y = 22,
  duration = 1.1,
}: T4RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: ATELIER_EASE }}
    >
      {children}
    </motion.div>
  );
}

/** A brass hairline that draws itself across when it enters the view. */
export function T4RuleDraw({
  className = "",
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden
      className={`t4-rule origin-left ${className}`}
      initial={reduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.4, delay, ease: ATELIER_EASE }}
    />
  );
}
