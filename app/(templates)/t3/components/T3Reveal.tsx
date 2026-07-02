"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/** The one easing curve every Haven animation shares — slow, floaty settle. */
export const HAVEN_EASE = [0.22, 1, 0.36, 1] as const;

interface T3RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger offset in seconds. */
  delay?: number;
  /** Entrance rise distance in px. */
  y?: number;
  /** Animation duration in seconds — Haven default is long and calm. */
  duration?: number;
}

/**
 * Shared scroll-reveal wrapper: a long, quiet fade-and-rise that fires once.
 * Respects prefers-reduced-motion by rendering settled.
 */
export default function T3Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  duration = 1.2,
}: T3RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration, delay, ease: HAVEN_EASE }}
    >
      {children}
    </motion.div>
  );
}
