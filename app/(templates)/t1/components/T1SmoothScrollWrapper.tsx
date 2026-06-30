"use client";

import { ReactNode } from "react";
import SmoothScrollProvider from "@/components/premium/SmoothScrollProvider";

interface T1SmoothScrollWrapperProps {
  children: ReactNode;
}

/**
 * T1 Smooth Scroll Wrapper
 *
 * Wraps Template 01 with premium Lenis smooth scrolling
 * configured for the ultra-luxury "Prestige Leader" aesthetic.
 *
 * Features:
 * - Weighted, deliberate scroll feel
 * - Custom luxury easing curve
 * - Optimized for editorial content
 */
export default function T1SmoothScrollWrapper({ children }: T1SmoothScrollWrapperProps) {
  return (
    <SmoothScrollProvider duration={1.6} easing={(t) => 1 - Math.pow(1 - t, 4)}>
      {children}
    </SmoothScrollProvider>
  );
}
