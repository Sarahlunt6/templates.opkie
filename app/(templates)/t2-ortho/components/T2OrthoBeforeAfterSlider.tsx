"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";

interface CaseMetadata {
  treatment: string;
  duration: string;
  provider: string;
  description?: string;
}

interface T2BeforeAfterSliderProps {
  beforeUrl: string;
  afterUrl: string;
  altTag: string;
  aspectRatio?: "4/3" | "16/9" | "1/1" | "3/4";
  metadata?: CaseMetadata;
  showLabels?: boolean;
  variant?: "default" | "cinematic" | "minimal";
}

const SPRING_CONFIG = {
  stiffness: 0.18,
  damping: 0.85,
  mass: 1,
};

export default function T2BeforeAfterSlider({
  beforeUrl,
  afterUrl,
  altTag,
  aspectRatio = "4/3",
  metadata,
  showLabels = true,
  variant = "cinematic",
}: T2BeforeAfterSliderProps) {
  const [targetPosition, setTargetPosition] = useState(50);
  const [currentPosition, setCurrentPosition] = useState(50);
  const [velocity, setVelocity] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [showMetadata, setShowMetadata] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  const aspectClasses = {
    "4/3": "aspect-[4/3]",
    "16/9": "aspect-[16/9]",
    "1/1": "aspect-square",
    "3/4": "aspect-[3/4]",
  };

  // Spring physics animation loop
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      {/* Main Slider Container */}
      <div
        ref={containerRef}
        className={`relative w-full ${aspectClasses[aspectRatio]} overflow-hidden rounded-2xl select-none touch-none no-cls group border border-white/[0.06]`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        role="slider"
        aria-label="Before and after transformation slider"
        aria-valuenow={Math.round(currentPosition)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setTargetPosition((p) => Math.max(0, p - 5));
          if (e.key === "ArrowRight") setTargetPosition((p) => Math.min(100, p + 5));
        }}
      >
        {/* After Image (Background) */}
        <div className="absolute inset-0">
          <Image
            src={afterUrl}
            alt={`After: ${altTag}`}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 60vw"
            priority
          />
          {showLabels && (
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-4 right-4 px-4 py-2 text-t2-micro uppercase tracking-widest font-medium rounded-lg backdrop-blur-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400"
            >
              After
            </motion.span>
          )}
        </div>

        {/* Before Image (Clipped) */}
        <div
          className="absolute inset-0 overflow-hidden will-change-[clip-path]"
          style={{
            clipPath: `inset(0 ${100 - currentPosition}% 0 0)`,
          }}
        >
          <Image
            src={beforeUrl}
            alt={`Before: ${altTag}`}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 60vw"
            priority
          />
          {showLabels && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-4 left-4 px-4 py-2 text-t2-micro uppercase tracking-widest font-medium rounded-lg backdrop-blur-xl bg-white/10 border border-white/20 text-white/80"
            >
              Before
            </motion.span>
          )}
        </div>

        {/* Cinematic Vignette Overlay */}
        {variant === "cinematic" && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, rgba(0,0,0,0.3) 100%)",
            }}
          />
        )}

        {/* Slider Handle */}
        <div
          className="absolute top-0 bottom-0 w-[2px] cursor-ew-resize will-change-transform z-10"
          style={{
            left: `${currentPosition}%`,
            transform: "translateX(-50%)",
          }}
        >
          {/* Handle Line with Glow */}
          <div
            className="absolute inset-0 bg-white"
            style={{
              boxShadow: isDragging
                ? "0 0 30px rgba(255,255,255,0.9), 0 0 60px rgba(var(--primary-brand-rgb, 15, 118, 110),0.5)"
                : "0 0 15px rgba(255,255,255,0.6)",
              transition: "box-shadow 0.3s ease",
            }}
          />

          {/* Handle Button */}
          <motion.div
            animate={{
              scale: isDragging ? 1.15 : isHovering ? 1.05 : 1,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-xl bg-brand-primary border-2 border-white/30"
            style={{
              boxShadow: isDragging
                ? "0 8px 40px rgba(15, 118, 110, 0.6), 0 0 0 4px rgba(255,255,255,0.2)"
                : "0 4px 24px rgba(15, 118, 110, 0.4)",
            }}
          >
            <svg
              className="w-6 h-6"
              fill="white"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" transform="translate(5, 0)" />
            </svg>
          </motion.div>

          {/* Pulse Ring */}
          {!isDragging && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-brand-primary/30 animate-ping" />
          )}
        </div>

        {/* Corner Architectural Frames */}
        <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/[0.15] pointer-events-none" />
        <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-white/[0.15] pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-white/[0.15] pointer-events-none z-20" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/[0.15] pointer-events-none z-20" />

        {/* Info Button */}
        {metadata && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            onClick={(e) => {
              e.stopPropagation();
              setShowMetadata(!showMetadata);
            }}
            className="absolute top-4 right-4 w-10 h-10 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors z-20"
            aria-label="Show case details"
          >
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </motion.button>
        )}

        {/* Instruction Hint */}
        <AnimatePresence>
          {isHovering && !isDragging && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-16 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 text-t2-micro uppercase tracking-widest text-white/70"
            >
              Drag to compare
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hidden Range Input for Accessibility */}
        <input
          type="range"
          min="0"
          max="100"
          value={Math.round(currentPosition)}
          onChange={(e) => setTargetPosition(Number(e.target.value))}
          className="sr-only"
          aria-label="Adjust before and after comparison"
        />
      </div>

      {/* Metadata Panel */}
      <AnimatePresence>
        {metadata && showMetadata && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 overflow-hidden"
          >
            <div className="backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Treatment */}
                <div>
                  <span className="text-t2-micro text-white/40 uppercase tracking-widest block mb-1">
                    Treatment
                  </span>
                  <span className="text-base font-medium text-white">
                    {metadata.treatment}
                  </span>
                </div>

                {/* Duration */}
                <div>
                  <span className="text-t2-micro text-white/40 uppercase tracking-widest block mb-1">
                    Duration
                  </span>
                  <span className="text-base font-medium text-brand-primary">
                    {metadata.duration}
                  </span>
                </div>

                {/* Provider */}
                <div>
                  <span className="text-t2-micro text-white/40 uppercase tracking-widest block mb-1">
                    Provider
                  </span>
                  <span className="text-base font-medium text-white">
                    {metadata.provider}
                  </span>
                </div>
              </div>

              {metadata.description && (
                <div className="mt-4 pt-4 border-t border-white/[0.06]">
                  <p className="text-sm text-white/60 leading-relaxed">
                    {metadata.description}
                  </p>
                </div>
              )}

              {/* CTA */}
              <div className="mt-6 flex items-center gap-4">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-sm text-brand-primary hover:text-brand-primary/80 transition-colors"
                >
                  <span>Schedule similar treatment</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Always-Visible Metadata Strip (when not expanded) */}
      {metadata && !showMetadata && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-4 flex items-center justify-between text-sm"
        >
          <div className="flex items-center gap-6">
            <span className="text-white/50">
              <span className="text-white/30 mr-2">Treatment:</span>
              {metadata.treatment}
            </span>
            <span className="text-brand-primary">
              <span className="text-white/30 mr-2">Duration:</span>
              {metadata.duration}
            </span>
          </div>
          <button
            onClick={() => setShowMetadata(true)}
            className="text-white/40 hover:text-white/70 transition-colors text-sm flex items-center gap-1"
          >
            View details
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
