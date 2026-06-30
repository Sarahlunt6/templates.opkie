"use client";

import { useEffect, ReactNode } from "react";
import Lenis from "lenis";

interface T3SmoothScrollWrapperProps {
  children: ReactNode;
}

/**
 * T3 Smooth Scroll Wrapper Component
 *
 * Ultra-smooth, therapeutic scroll experience for The Spatial Sanctuary template.
 * Features:
 * - Lenis smooth scrolling with intentionally slow, calming velocity
 * - Extra-weighted damping for fluid, water-like motion
 * - Respects prefers-reduced-motion for accessibility
 *
 * Physics Configuration:
 * - Duration: 2.2s (very slow, intentional)
 * - Easing: Quintic ease-out for gentle deceleration
 * - Infinite: true for continuous smoothness
 */
export default function T3SmoothScrollWrapper({ children }: T3SmoothScrollWrapperProps) {
  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      // Skip smooth scroll for accessibility
      return;
    }

    // Initialize Lenis with therapeutic, ultra-slow configuration
    const lenis = new Lenis({
      duration: 2.2, // Very slow, calming scroll duration
      easing: (t) => {
        // Quintic ease-out: 1 - (1-t)^5
        // Creates gentle, luxurious deceleration
        return 1 - Math.pow(1 - t, 5);
      },
      smoothWheel: true,
      touchMultiplier: 1.5,
      infinite: false,
    });

    // RAF loop for smooth animation
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
