"use client";

import { useRef, useState, useEffect, ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";

interface T3AtmosphericParallaxProps {
  children: ReactNode;
  imageSrc?: string;
  intensity?: number;
  className?: string;
}

/**
 * T3 Atmospheric Parallax Component
 *
 * Multi-layered subtle parallax for environmental depth.
 * Features:
 * - Very low intensity movement (calming, not distracting)
 * - Smooth spring-based interpolation
 * - Optional background image layer
 * - Mouse parallax on desktop
 * - Scroll parallax for depth
 * - Respects prefers-reduced-motion
 *
 * Creates sense of three-dimensional calm architectural space.
 */
export default function T3AtmosphericParallax({
  children,
  imageSrc,
  intensity = 0.03, // Very subtle by default
  className = "",
}: T3AtmosphericParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Scroll parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Spring configuration for smooth, weighted movement
  const springConfig = {
    stiffness: 50, // Very soft
    damping: 30, // Heavily damped
    mass: 2, // Weighted feel
  };

  // Mouse parallax values (very subtle)
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  // Scroll parallax transforms
  const scrollY = useSpring(scrollYProgress, springConfig);
  const backgroundY = useTransform(scrollY, [0, 1], ["0%", "15%"]);
  const contentY = useTransform(scrollY, [0, 1], ["0%", "-8%"]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate distance from center, normalized to -1 to 1
      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);

      // Apply very subtle movement
      mouseX.set(deltaX * intensity * 50);
      mouseY.set(deltaY * intensity * 50);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [prefersReducedMotion, intensity, mouseX, mouseY]);

  if (prefersReducedMotion) {
    return (
      <div ref={containerRef} className={`relative ${className}`}>
        {imageSrc && (
          <div className="absolute inset-0 -z-10">
            <img src={imageSrc} alt="" className="w-full h-full object-cover" />
          </div>
        )}
        {children}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* Background layer with scroll parallax */}
      {imageSrc && (
        <motion.div
          style={{ y: backgroundY }}
          className="absolute inset-0 -z-10 scale-110"
        >
          <motion.div
            style={{ x: mouseX, y: mouseY }}
            className="w-full h-full"
          >
            <img
              src={imageSrc}
              alt=""
              className="w-full h-full object-cover"
            />
            {/* Soft overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/30" />
          </motion.div>
        </motion.div>
      )}

      {/* Content layer with subtle parallax */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10"
      >
        <motion.div
          style={{
            x: useTransform(mouseX, (value) => value * 0.5),
            y: useTransform(mouseY, (value) => value * 0.5),
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}
