"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/** Marigold's shared easing — a friendly settle with a hint of bounce. */
export const MARIGOLD_EASE = [0.34, 1.3, 0.5, 1] as const;

interface T5RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger offset in seconds. */
  delay?: number;
  /** Entrance rise distance in px. */
  y?: number;
  /** Optional resting tilt in degrees — for stickers and polaroids. */
  rotate?: number;
  duration?: number;
}

/**
 * Shared scroll reveal: a warm rise with a slight overshoot, fired once.
 * Renders settled when the visitor prefers reduced motion.
 */
export default function T5Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  rotate = 0,
  duration = 0.7,
}: T5RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={
        reduceMotion
          ? { opacity: 1, y: 0, rotate }
          : { opacity: 0, y, rotate: rotate + (rotate === 0 ? 0 : 2) }
      }
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration, delay, ease: MARIGOLD_EASE }}
    >
      {children}
    </motion.div>
  );
}
