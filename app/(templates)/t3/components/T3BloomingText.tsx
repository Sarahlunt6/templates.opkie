"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { motion, useInView } from "framer-motion";

interface T3BloomingTextProps {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  stagger?: number;
}

/**
 * T3 Blooming Text Component
 *
 * Gentle, therapeutic text reveal animation.
 * Features:
 * - Soft blur-to-focus transition (mimics eye focusing)
 * - Gentle upward float with opacity fade
 * - Split by words for organic stagger effect
 * - Respects prefers-reduced-motion
 *
 * Animation Feel:
 * - Duration: 1.8s (very slow, calming)
 * - Blur: 8px → 0px (gentle focus)
 * - Y: 20px → 0px (subtle float)
 * - Opacity: 0 → 1 (gentle fade)
 * - Easing: Cubic ease-out for natural deceleration
 */
export default function T3BloomingText({
  children,
  as: Component = "p",
  className = "",
  delay = 0,
  stagger = 0.08,
}: T3BloomingTextProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Split text into words
  const text = typeof children === "string" ? children : "";
  const words = text.split(" ");

  // Animation variants for each word
  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1.8,
        ease: [0.16, 1, 0.3, 1], // Smooth cubic ease-out
      },
    },
  };

  // Container variants for stagger
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  if (prefersReducedMotion) {
    return <Component className={className}>{children}</Component>;
  }

  return (
    <Component
      ref={ref as any}
      className={className}
    >
      <motion.span
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="inline-block"
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={wordVariants}
            className="inline-block mr-[0.25em]"
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Component>
  );
}
