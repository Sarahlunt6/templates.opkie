"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface CursorGlowProps {
  color?: string;
  size?: number;
  blur?: number;
  opacity?: number;
  enabled?: boolean;
}

/**
 * Premium Cursor Tracking Glow
 *
 * Creates a sophisticated ambient glow that follows the cursor,
 * commonly seen on tech-forward and luxury SaaS websites.
 */
export default function CursorGlow({
  color = "var(--primary-brand)",
  size = 400,
  blur = 100,
  opacity = 0.15,
  enabled = true,
}: CursorGlowProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-1000);
  const cursorY = useMotionValue(-1000);

  const springConfig = { stiffness: 100, damping: 30 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - size / 2);
      cursorY.set(e.clientY - size / 2);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY, enabled, isVisible, size]);

  if (!enabled) return null;

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          width: size,
          height: size,
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          filter: `blur(${blur}px)`,
          opacity,
        }}
        className="absolute"
      />
    </motion.div>
  );
}

/**
 * Tech Explainer Card with Interactive Hotspots
 *
 * A premium interactive card that reveals technical details
 * when hovering over specific areas.
 */
interface Hotspot {
  x: number; // Percentage from left
  y: number; // Percentage from top
  label: string;
  description: string;
}

interface TechExplainerProps {
  image: string;
  alt: string;
  hotspots: Hotspot[];
  title?: string;
  className?: string;
}

export function TechExplainer({
  image,
  alt,
  hotspots,
  title,
  className = "",
}: TechExplainerProps) {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {/* Image */}
      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-900">
        <img
          src={image}
          alt={alt}
          className="w-full h-full object-cover opacity-90"
        />

        {/* Scan line effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-primary/5 to-transparent"
          animate={{ y: ["-100%", "200%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          style={{ height: "50%" }}
        />

        {/* Hotspots */}
        {hotspots.map((hotspot, index) => (
          <div
            key={index}
            className="absolute"
            style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
          >
            {/* Pulse ring */}
            <motion.div
              className="absolute -inset-4 rounded-full border border-brand-primary/30"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Hotspot button */}
            <motion.button
              className="relative w-4 h-4 -ml-2 -mt-2 rounded-full bg-brand-primary shadow-lg cursor-pointer"
              whileHover={{ scale: 1.3 }}
              onMouseEnter={() => setActiveHotspot(index)}
              onMouseLeave={() => setActiveHotspot(null)}
            >
              <span className="absolute inset-0 rounded-full bg-brand-primary animate-ping opacity-50" />
            </motion.button>

            {/* Tooltip */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{
                opacity: activeHotspot === index ? 1 : 0,
                y: activeHotspot === index ? 0 : 10,
                scale: activeHotspot === index ? 1 : 0.9,
              }}
              transition={{ duration: 0.2 }}
              className="absolute top-6 left-1/2 -translate-x-1/2 w-48 p-4 bg-black/90 backdrop-blur-xl rounded-lg pointer-events-none z-10"
            >
              <p className="text-xs font-medium text-brand-primary mb-1 font-innovator">
                {hotspot.label}
              </p>
              <p className="text-xs text-white/80 leading-relaxed font-innovator">
                {hotspot.description}
              </p>
              {/* Arrow */}
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-black/90 rotate-45" />
            </motion.div>
          </div>
        ))}

        {/* Corner markers - tech aesthetic */}
        <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-brand-primary/40" />
        <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-brand-primary/40" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-brand-primary/40" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-brand-primary/40" />
      </div>

      {/* Title */}
      {title && (
        <div className="mt-4 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
          <p className="text-sm font-innovator font-medium tracking-wide">{title}</p>
        </div>
      )}
    </div>
  );
}

/**
 * Monospace Data Display
 *
 * Premium data display component with monospace typography
 * for technical/clinical data presentation.
 */
export function MonospaceData({
  label,
  value,
  unit,
  className = "",
}: {
  label: string;
  value: string | number;
  unit?: string;
  className?: string;
}) {
  return (
    <div className={`${className}`}>
      <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-1">
        {label}
      </p>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-mono font-light tracking-tight">{value}</span>
        {unit && <span className="text-sm font-mono text-neutral-400">{unit}</span>}
      </div>
    </div>
  );
}

/**
 * Interactive Stat Counter
 *
 * Animated number counter that triggers on scroll into view.
 */
export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 2,
  className = "",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = performance.now();
          const animate = (currentTime: number) => {
            const elapsed = (currentTime - startTime) / 1000;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out quad
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * value));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}
