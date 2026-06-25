"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Slow Motion Background Video
 *
 * Creates the meditative, slowed-down video backgrounds
 * seen in luxury spa and wellness websites.
 */
export function SlowMotionVideo({
  src,
  poster,
  playbackRate = 0.5,
  opacity = 0.6,
  overlay = true,
  className = "",
}: {
  src: string;
  poster?: string;
  playbackRate?: number;
  opacity?: number;
  overlay?: boolean;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        poster={poster}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity }}
      >
        <source src={src} type="video/mp4" />
      </video>

      {overlay && (
        <>
          {/* Gradient overlays for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-canvas/40 via-transparent to-brand-canvas/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-canvas/30 via-transparent to-brand-canvas/30" />
        </>
      )}
    </div>
  );
}

/**
 * Breathing Animation Container
 *
 * Subtle scale animation that mimics natural breathing rhythm,
 * creating a calming effect for wellness-focused interfaces.
 */
export function BreathingContainer({
  children,
  duration = 6,
  scale = 1.02,
  className = "",
}: {
  children: React.ReactNode;
  duration?: number;
  scale?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      animate={{
        scale: [1, scale, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Expansive Section Spacing
 *
 * A wrapper that applies the generous vertical padding
 * characteristic of luxury wellness sites (14rem/200px+).
 */
export function ExpansiveSection({
  children,
  className = "",
  padding = "large",
}: {
  children: React.ReactNode;
  className?: string;
  padding?: "medium" | "large" | "extra";
}) {
  const paddingClasses = {
    medium: "py-24 lg:py-32",
    large: "py-32 lg:py-48",
    extra: "py-48 lg:py-64",
  };

  return (
    <section className={`${paddingClasses[padding]} ${className}`}>
      {children}
    </section>
  );
}

/**
 * Floating Element
 *
 * Creates gentle floating animation for decorative elements,
 * evoking a sense of weightlessness and calm.
 */
export function FloatingElement({
  children,
  amplitude = 15,
  duration = 6,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  amplitude?: number;
  duration?: number;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-amplitude, amplitude, -amplitude],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Ambient Light Nodes
 *
 * Soft, diffused light spots that create an ambient,
 * spa-like atmosphere.
 */
export function AmbientLightNodes({
  count = 3,
  colors = ["var(--primary-brand)", "#A8D5BA", "#E8D5C4"],
  className = "",
}: {
  count?: number;
  colors?: string[];
  className?: string;
}) {
  const nodes = Array.from({ length: count }, (_, i) => ({
    color: colors[i % colors.length],
    x: 20 + (i * 30) % 60,
    y: 15 + (i * 25) % 70,
    size: 300 + (i * 100) % 200,
    duration: 15 + (i * 5),
  }));

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {nodes.map((node, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full blur-3xl"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            width: node.size,
            height: node.size,
            background: `radial-gradient(circle, ${node.color}20 0%, transparent 70%)`,
          }}
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -40, 30, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: node.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/**
 * Mindful Scroll Progress
 *
 * A gentle progress indicator that tracks scroll position
 * without being intrusive.
 */
export function MindfulScrollProgress({
  color = "var(--primary-brand)",
  thickness = 2,
  position = "left",
}: {
  color?: string;
  thickness?: number;
  position?: "left" | "right";
}) {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      className={`fixed top-0 ${position === "left" ? "left-0" : "right-0"} bottom-0 origin-top z-50`}
      style={{
        width: thickness,
        backgroundColor: color,
        scaleY,
        opacity: 0.4,
      }}
    />
  );
}

/**
 * Zen Quote Block
 *
 * An elegantly styled quote component with subtle
 * entrance animation, perfect for testimonials or philosophy statements.
 */
export function ZenQuote({
  quote,
  author,
  role,
  className = "",
}: {
  quote: string;
  author?: string;
  role?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Decorative line */}
      <div className="w-16 h-px bg-brand-primary/30 mb-10" />

      {/* Quote mark */}
      <span className="absolute -top-4 -left-4 text-8xl leading-none text-brand-primary/10 font-sanctuary select-none">
        &ldquo;
      </span>

      {/* Quote text */}
      <blockquote className="relative font-sanctuary text-2xl md:text-3xl lg:text-4xl font-extralight leading-relaxed tracking-wide text-neutral-700 mb-8">
        {quote}
      </blockquote>

      {/* Attribution */}
      {(author || role) && (
        <div className="flex items-center gap-4">
          <div className="w-8 h-px bg-brand-primary/40" />
          <div>
            {author && (
              <p className="text-sm font-medium text-neutral-800 font-sanctuary">{author}</p>
            )}
            {role && (
              <p className="text-xs text-neutral-500 font-sanctuary tracking-wide">{role}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Comfort Feature Grid
 *
 * A grid layout for displaying wellness/comfort features
 * with gentle reveal animations.
 */
interface ComfortFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function ComfortFeatureGrid({
  features,
  columns = 3,
  className = "",
}: {
  features: ComfortFeature[];
  columns?: 2 | 3 | 4;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".comfort-feature",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div
      ref={containerRef}
      className={`grid grid-cols-1 ${gridCols[columns]} gap-8 lg:gap-12 ${className}`}
    >
      {features.map((feature, index) => (
        <div
          key={index}
          className="comfort-feature text-center px-4"
        >
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
            {feature.icon}
          </div>
          <h3 className="font-sanctuary text-lg font-light mb-3 tracking-wide">
            {feature.title}
          </h3>
          <p className="font-sanctuary text-sm text-neutral-500 leading-relaxed">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
}

/**
 * Calming Divider
 *
 * A minimalist divider with optional center element,
 * designed for sanctuary/wellness aesthetics.
 */
export function CalmingDivider({
  centerElement,
  className = "",
}: {
  centerElement?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-center justify-center gap-8 py-16 ${className}`}>
      <div className="flex-1 max-w-[200px] h-px bg-gradient-to-r from-transparent via-brand-primary/20 to-brand-primary/20" />
      {centerElement || (
        <div className="w-2 h-2 rounded-full bg-brand-primary/30" />
      )}
      <div className="flex-1 max-w-[200px] h-px bg-gradient-to-l from-transparent via-brand-primary/20 to-brand-primary/20" />
    </div>
  );
}
