"use client";

import { useRef, useState, useEffect, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface T2MagneticButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  magneticRadius?: number;
  magneticStrength?: number;
}

/**
 * T2 Magnetic Button Component
 *
 * High-tech magnetic micro-interaction for CTA buttons.
 * Features:
 * - Snappy spring physics (mass: 0.5, stiffness: 150, damping: 15)
 * - Magnetic pull within defined radius
 * - Hardware-accelerated transforms
 * - Respects prefers-reduced-motion
 */
export default function T2MagneticButton({
  children,
  className = "",
  href,
  onClick,
  magneticRadius = 100,
  magneticStrength = 0.4,
}: T2MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Motion values for position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Snappy spring config for high-tech feel
  const springConfig = { mass: 0.5, stiffness: 150, damping: 15 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Scale transform on hover
  const scale = useTransform(springX, [-20, 0, 20], [1.02, 1, 1.02]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    // Apply magnetic pull only within radius
    if (distance < magneticRadius) {
      const pullFactor = (1 - distance / magneticRadius) * magneticStrength;
      x.set(distanceX * pullFactor);
      y.set(distanceY * pullFactor);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Component = href ? motion.a : motion.button;
  const props = href ? { href } : { onClick };

  return (
    <Component
      ref={ref as any}
      {...props}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: prefersReducedMotion ? 0 : springX,
        y: prefersReducedMotion ? 0 : springY,
        scale: prefersReducedMotion ? 1 : scale,
      }}
      whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </Component>
  );
}
