"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface EditorialGridProps {
  columns?: number;
  opacity?: number;
  color?: string;
  showOnHover?: boolean;
}

/**
 * Premium Editorial Grid Overlay
 *
 * Creates the subtle grid lines seen in high-end editorial publications
 * like Kinfolk, Cereal Magazine, and luxury brand sites.
 */
export default function EditorialGrid({
  columns = 12,
  opacity = 0.04,
  color = "currentColor",
  showOnHover = false,
}: EditorialGridProps) {
  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-500 ${
        showOnHover ? "opacity-0 hover:opacity-100" : ""
      }`}
      style={{ opacity: showOnHover ? undefined : opacity }}
    >
      <div className="max-w-7xl mx-auto h-full px-6 flex">
        {Array.from({ length: columns }).map((_, i) => (
          <div key={i} className="flex-1 h-full border-l" style={{ borderColor: color }} />
        ))}
        <div className="h-full border-r" style={{ borderColor: color }} />
      </div>
    </div>
  );
}

/**
 * Off-Center Text Overlay Component
 *
 * Creates the asymmetric text positioning seen in luxury editorial layouts
 * where text intentionally breaks the grid for visual tension.
 */
export function OffCenterOverlay({
  children,
  offset = { x: -5, y: 10 },
  className = "",
}: {
  children: React.ReactNode;
  offset?: { x: number; y: number };
  className?: string;
}) {
  return (
    <div
      className={`relative ${className}`}
      style={{
        transform: `translate(${offset.x}%, ${offset.y}%)`,
      }}
    >
      {children}
    </div>
  );
}

/**
 * Sticky Horizontal Scroll Credentials Bar
 *
 * A premium credentials/awards bar that scrolls horizontally
 * as user scrolls vertically - seen in high-end portfolio sites.
 */
export function StickyHorizontalCredentials({
  items,
  className = "",
}: {
  items: Array<{ icon?: React.ReactNode; label: string; value: string }>;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useMotionValue(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementTop = rect.top;
      const elementHeight = rect.height;

      // Calculate progress based on element position
      const progress = Math.max(
        0,
        Math.min(1, (windowHeight - elementTop) / (windowHeight + elementHeight))
      );
      scrollProgress.set(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollProgress]);

  const x = useTransform(scrollProgress, [0, 1], ["0%", "-30%"]);
  const smoothX = useSpring(x, { stiffness: 100, damping: 30 });

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <motion.div style={{ x: smoothX }} className="flex items-center gap-16 py-8">
        {/* Duplicate items for seamless scroll effect */}
        {[...items, ...items].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 whitespace-nowrap font-prestige"
          >
            {item.icon && <div className="text-brand-primary">{item.icon}</div>}
            <div>
              <p className="text-3xl font-light text-brand-primary">{item.value}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">{item.label}</p>
            </div>
            <div className="w-px h-12 bg-neutral-200 ml-16" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/**
 * Magnetic Cursor Effect
 *
 * Creates the premium magnetic cursor effect where elements
 * subtly pull toward the cursor position.
 */
export function MagneticElement({
  children,
  strength = 0.3,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}

/**
 * Parallax Image Frame
 *
 * Creates the editorial-style image frames with subtle parallax
 * movement on scroll.
 */
export function ParallaxFrame({
  children,
  speed = 0.1,
  className = "",
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const y = useMotionValue(0);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
      const windowCenter = windowHeight / 2;

      const offset = (elementCenter - windowCenter) * speed;
      y.set(offset);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed, y]);

  return (
    <motion.div ref={ref} className={className} style={{ y: smoothY }}>
      {children}
    </motion.div>
  );
}

/**
 * Editorial Section Divider
 *
 * Thin decorative lines with optional labels used to divide
 * editorial sections.
 */
export function EditorialDivider({
  label,
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-6 ${className}`}>
      <div className="flex-1 h-px bg-neutral-200" />
      {label && (
        <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-prestige">
          {label}
        </span>
      )}
      <div className="flex-1 h-px bg-neutral-200" />
    </div>
  );
}
