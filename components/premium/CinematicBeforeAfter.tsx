"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CaseStudy {
  id: string;
  beforeUrl: string;
  afterUrl: string;
  title: string;
  procedure: string;
  duration: string;
  description: string;
  doctor?: string;
}

interface CinematicBeforeAfterProps {
  cases: CaseStudy[];
  theme?: "prestige" | "innovator" | "sanctuary";
  layout?: "gallery" | "single" | "stacked";
}

// Spring physics for buttery smooth interactions
const SPRING_CONFIG = {
  stiffness: 0.12,
  damping: 0.85,
  mass: 1.2,
};

export default function CinematicBeforeAfter({
  cases,
  theme = "prestige",
  layout = "gallery",
}: CinematicBeforeAfterProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Theme-based styling
  const getThemeStyles = () => {
    switch (theme) {
      case "innovator":
        return {
          font: "font-innovator",
          accent: "text-brand-primary",
          bg: "bg-neutral-950",
          card: "bg-neutral-900/80",
        };
      case "sanctuary":
        return {
          font: "font-sanctuary",
          accent: "text-brand-primary",
          bg: "bg-brand-canvas",
          card: "bg-white/60",
        };
      default:
        return {
          font: "font-prestige",
          accent: "text-brand-primary",
          bg: "bg-brand-canvas",
          card: "bg-white/80",
        };
    }
  };

  const styles = getThemeStyles();

  // GSAP scroll-triggered reveal animation
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Fade in the entire gallery
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Stagger reveal for case cards
      gsap.fromTo(
        ".case-card",
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (layout === "gallery") {
    return (
      <section ref={containerRef} className={`py-24 ${styles.bg}`}>
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`text-xs uppercase tracking-[0.3em] ${styles.accent} mb-4 ${styles.font}`}
            >
              Transformations
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`text-4xl md:text-5xl font-light ${styles.font}`}
            >
              Real Results, Real Smiles
            </motion.h2>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cases.map((caseStudy, index) => (
              <CinematicSlider
                key={caseStudy.id}
                caseStudy={caseStudy}
                theme={theme}
                onExpand={() => {
                  setActiveIndex(index);
                  setIsExpanded(true);
                }}
              />
            ))}
          </div>
        </div>

        {/* Expanded Lightbox View */}
        <AnimatePresence>
          {isExpanded && (
            <ExpandedView
              caseStudy={cases[activeIndex]}
              theme={theme}
              onClose={() => setIsExpanded(false)}
              onPrev={() => setActiveIndex((i) => (i > 0 ? i - 1 : cases.length - 1))}
              onNext={() => setActiveIndex((i) => (i < cases.length - 1 ? i + 1 : 0))}
              currentIndex={activeIndex}
              totalCases={cases.length}
            />
          )}
        </AnimatePresence>
      </section>
    );
  }

  // Single featured case layout
  return (
    <section ref={containerRef} className={`py-24 ${styles.bg}`}>
      <div className="max-w-5xl mx-auto px-6">
        <CinematicSlider caseStudy={cases[0]} theme={theme} featured />
      </div>
    </section>
  );
}

// Individual slider component with cinematic animations
function CinematicSlider({
  caseStudy,
  theme,
  featured = false,
  onExpand,
}: {
  caseStudy: CaseStudy;
  theme: string;
  featured?: boolean;
  onExpand?: () => void;
}) {
  const [targetPosition, setTargetPosition] = useState(50);
  const [currentPosition, setCurrentPosition] = useState(50);
  const [velocity, setVelocity] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  // Spring physics animation
  useEffect(() => {
    const animate = () => {
      setCurrentPosition((current) => {
        const displacement = targetPosition - current;
        const springForce = displacement * SPRING_CONFIG.stiffness;

        setVelocity((v) => {
          const newVelocity = (v + springForce) * SPRING_CONFIG.damping;
          return Math.abs(newVelocity) < 0.001 ? 0 : newVelocity;
        });

        const newPosition = current + velocity;

        if (Math.abs(displacement) < 0.01 && Math.abs(velocity) < 0.001) {
          return targetPosition;
        }

        return newPosition;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [targetPosition, velocity]);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setTargetPosition(percentage);
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      setIsDragging(true);
      setVelocity(0);
      updatePosition(e.clientX);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [updatePosition]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      updatePosition(e.clientX);
    },
    [isDragging, updatePosition]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    const handleGlobalPointerUp = () => setIsDragging(false);
    window.addEventListener("pointerup", handleGlobalPointerUp);
    return () => window.removeEventListener("pointerup", handleGlobalPointerUp);
  }, []);

  const themeStyles = {
    prestige: { font: "font-prestige", label: "bg-white/90 backdrop-blur-sm" },
    innovator: { font: "font-innovator", label: "bg-black/80 text-white backdrop-blur-sm" },
    sanctuary: { font: "font-sanctuary", label: "bg-white/80 backdrop-blur-sm" },
  }[theme] || { font: "font-prestige", label: "bg-white/90" };

  return (
    <motion.div
      className={`case-card group ${featured ? "" : "cursor-pointer"}`}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Image Container */}
      <div
        ref={containerRef}
        className={`relative ${featured ? "aspect-[16/10]" : "aspect-[4/3]"} overflow-hidden rounded-2xl select-none touch-none`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* After Image */}
        <div className="absolute inset-0">
          <Image
            src={caseStudy.afterUrl}
            alt={`After: ${caseStudy.title}`}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            sizes={featured ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
            priority={featured}
          />
          {/* Cinematic color grade overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </div>

        {/* Before Image (Clipped) */}
        <div
          className="absolute inset-0 overflow-hidden will-change-[clip-path]"
          style={{ clipPath: `inset(0 ${100 - currentPosition}% 0 0)` }}
        >
          <Image
            src={caseStudy.beforeUrl}
            alt={`Before: ${caseStudy.title}`}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            sizes={featured ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
            priority={featured}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </div>

        {/* Premium Labels */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between pointer-events-none">
          <motion.span
            className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide ${themeStyles.label} shadow-lg`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: currentPosition > 15 ? 1 : 0, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            Before
          </motion.span>
          <motion.span
            className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide ${themeStyles.label} shadow-lg`}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: currentPosition < 85 ? 1 : 0, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            After
          </motion.span>
        </div>

        {/* Cinematic Slider Handle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 cursor-ew-resize will-change-transform"
          style={{ left: `${currentPosition}%`, transform: "translateX(-50%)" }}
        >
          {/* Light beam effect */}
          <motion.div
            className="absolute inset-0 bg-white"
            animate={{
              boxShadow: isDragging
                ? "0 0 40px 8px rgba(255,255,255,0.6), 0 0 80px 16px rgba(255,255,255,0.3)"
                : "0 0 20px 4px rgba(255,255,255,0.4)",
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Handle grip */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "var(--primary-brand)" }}
            animate={{
              scale: isDragging ? 1.15 : isHovering ? 1.05 : 1,
              boxShadow: isDragging
                ? "0 8px 40px rgba(0,0,0,0.4), 0 0 0 4px rgba(255,255,255,0.4)"
                : "0 4px 20px rgba(0,0,0,0.3)",
            }}
            transition={{ duration: 0.3 }}
          >
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" transform="translate(5, 0)" />
            </svg>
          </motion.div>

          {/* Pulse animation when idle */}
          {!isDragging && (
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full"
              style={{ backgroundColor: "var(--primary-brand)" }}
              animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
          )}
        </div>

        {/* Expand button */}
        {onExpand && (
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onExpand();
            }}
            className="absolute top-4 right-4 p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </motion.button>
        )}
      </div>

      {/* Case Details */}
      <div className={`mt-6 ${themeStyles.font}`}>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs uppercase tracking-[0.2em] text-brand-primary font-medium">
            {caseStudy.procedure}
          </span>
          <span className="w-1 h-1 rounded-full bg-neutral-300" />
          <span className="text-xs text-neutral-500">{caseStudy.duration}</span>
        </div>
        <h3 className="text-xl font-light mb-2">{caseStudy.title}</h3>
        <p className="text-sm text-neutral-600 leading-relaxed">{caseStudy.description}</p>
        {caseStudy.doctor && (
          <p className="text-xs text-neutral-400 mt-3">Performed by {caseStudy.doctor}</p>
        )}
      </div>
    </motion.div>
  );
}

// Expanded lightbox view
function ExpandedView({
  caseStudy,
  theme,
  onClose,
  onPrev,
  onNext,
  currentIndex,
  totalCases,
}: {
  caseStudy: CaseStudy;
  theme: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  currentIndex: number;
  totalCases: number;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ backdropFilter: "blur(0px)" }}
        animate={{ backdropFilter: "blur(20px)" }}
        exit={{ backdropFilter: "blur(0px)" }}
        className="absolute inset-0 bg-black/80"
        onClick={onClose}
      />

      {/* Content */}
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative w-full max-w-6xl"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white transition-colors"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Navigation */}
        <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Slider */}
        <CinematicSlider caseStudy={caseStudy} theme={theme} featured />

        {/* Counter */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-white/60 text-sm">
          {currentIndex + 1} / {totalCases}
        </div>
      </motion.div>
    </motion.div>
  );
}

// Export types for use in templates
export type { CaseStudy, CinematicBeforeAfterProps };
