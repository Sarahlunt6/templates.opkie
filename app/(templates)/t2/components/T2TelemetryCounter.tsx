"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, animate } from "framer-motion";

interface T2TelemetryCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
  decimals?: number;
  label: string;
  glitchEffect?: boolean;
}

/**
 * T2 Telemetry Counter Component
 *
 * Data-driven odometer-style counter with optional glitch effect.
 * Features:
 * - Rapid count-up animation on scroll into view
 * - Optional glitch/blur effect during counting
 * - Hardware-accelerated transforms
 * - Gradient text styling
 * - Respects prefers-reduced-motion
 */
export default function T2TelemetryCounter({
  value,
  suffix = "",
  duration = 2,
  decimals = 0,
  label,
  glitchEffect = true,
}: T2TelemetryCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [displayValue, setDisplayValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Motion value for blur effect
  const blurAmount = useMotionValue(0);
  const blurSpring = useSpring(blurAmount, { stiffness: 100, damping: 15 });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!isInView) return;

    if (prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }

    setIsAnimating(true);

    // Animate the counter
    const controls = animate(0, value, {
      duration,
      ease: [0.23, 1, 0.32, 1],
      onUpdate: (latest) => {
        setDisplayValue(latest);
      },
      onComplete: () => {
        setIsAnimating(false);
        blurAmount.set(0);
      },
    });

    // Animate blur during counting
    if (glitchEffect) {
      blurAmount.set(3);
      setTimeout(() => blurAmount.set(0), duration * 1000 * 0.7);
    }

    return () => controls.stop();
  }, [isInView, value, duration, prefersReducedMotion, glitchEffect, blurAmount]);

  // Format number with optional decimals
  const formattedValue = decimals > 0
    ? displayValue.toFixed(decimals)
    : Math.floor(displayValue).toLocaleString();

  return (
    <motion.div
      ref={ref}
      className="text-center relative group"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        {/* Main counter display */}
        <motion.div
          className="text-5xl md:text-6xl font-bold tracking-tight mb-2 bg-gradient-to-br from-white via-white to-neutral-400 bg-clip-text text-transparent"
          style={{
            filter: glitchEffect && !prefersReducedMotion ? `blur(${blurSpring}px)` : "none",
          }}
          whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          {formattedValue}{suffix}
        </motion.div>

        {/* Glitch indicator dot */}
        {glitchEffect && isAnimating && !prefersReducedMotion && (
          <motion.div
            className="absolute -top-2 -right-2 w-2 h-2 rounded-full bg-brand-primary"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0, 1.2, 1.2, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        )}

        {/* Status indicator */}
        <div className="absolute -top-2 -right-2 w-2 h-2 rounded-full bg-emerald-400 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Label */}
      <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-semibold mt-3">
        {label}
      </p>

      {/* Divider line */}
      <div className="mt-4 h-[1px] w-16 mx-auto bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />

      {/* Scanning effect during animation */}
      {isAnimating && !prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ y: "-100%" }}
          animate={{ y: "100%" }}
          transition={{
            duration: duration * 0.5,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          <div className="h-8 bg-gradient-to-b from-transparent via-brand-primary/10 to-transparent blur-sm" />
        </motion.div>
      )}
    </motion.div>
  );
}
