"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";

interface T1MouseRevealBeforeAfterProps {
  beforeUrl: string;
  afterUrl: string;
  altTag: string;
  aspectRatio?: "4/3" | "16/9" | "1/1";
}

/**
 * T1 Premium Mouse-Reveal Before/After Component
 *
 * Ultra-luxury before/after interaction with:
 * - Custom floating "Reveal" cursor badge
 * - Smooth mouse-tracking wipe effect
 * - Fluid transition mask
 * - Hardware-accelerated transforms
 * - Respects prefers-reduced-motion
 */
export default function T1MouseRevealBeforeAfter({
  beforeUrl,
  afterUrl,
  altTag,
  aspectRatio = "4/3",
}: T1MouseRevealBeforeAfterProps) {
  const [revealPosition, setRevealPosition] = useState(50);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();

  const aspectClasses = {
    "4/3": "aspect-[4/3]",
    "16/9": "aspect-[16/9]",
    "1/1": "aspect-square",
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const updatePosition = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));

    // Smooth reveal position update
    setRevealPosition(percentage);

    // Cursor position for floating badge
    setCursorPosition({ x: clientX - rect.left, y: clientY - rect.top });
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(() => {
        updatePosition(e.clientX, e.clientY);
      });
    },
    [updatePosition]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setRevealPosition(50);
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${aspectClasses[aspectRatio]} overflow-hidden select-none group cursor-none`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="img"
      aria-label={`Before and after: ${altTag}`}
    >
      {/* After Image (Background) */}
      <div className="absolute inset-0">
        <Image
          src={afterUrl}
          alt={`After: ${altTag}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        <span className="absolute bottom-4 right-4 px-3 py-1.5 text-sm font-semibold rounded-lg bg-white/90 backdrop-blur-sm text-brand-mainText shadow-lg">
          After
        </span>
      </div>

      {/* Before Image (Clipped by Mouse Position) */}
      <div
        className="absolute inset-0 overflow-hidden will-change-[clip-path]"
        style={{
          clipPath: `inset(0 ${100 - revealPosition}% 0 0)`,
          transition: prefersReducedMotion ? "none" : "clip-path 0.15s cubic-bezier(0.25, 1, 0.5, 1)",
        }}
      >
        <Image
          src={beforeUrl}
          alt={`Before: ${altTag}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        <span className="absolute bottom-4 left-4 px-3 py-1.5 text-sm font-semibold rounded-lg bg-white/90 backdrop-blur-sm text-brand-mainText shadow-lg">
          Before
        </span>
      </div>

      {/* Vertical Divider Line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_20px_rgba(255,255,255,0.6)] pointer-events-none will-change-transform"
        style={{
          left: `${revealPosition}%`,
          transform: "translateX(-50%)",
          transition: prefersReducedMotion ? "none" : "left 0.15s cubic-bezier(0.25, 1, 0.5, 1)",
        }}
      />

      {/* Custom Floating "Reveal" Cursor Badge */}
      {isHovering && !prefersReducedMotion && (
        <div
          className="fixed pointer-events-none z-50 will-change-transform"
          style={{
            left: `${cursorPosition.x}px`,
            top: `${cursorPosition.y}px`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="px-4 py-2 bg-brand-primary text-white text-sm font-bold tracking-wider uppercase rounded-full shadow-2xl animate-pulse-subtle">
            Reveal
          </div>
          {/* Outer glow ring */}
          <div className="absolute inset-0 -z-10 bg-brand-primary/30 blur-xl rounded-full scale-150" />
        </div>
      )}

      {/* Instruction hint - only shows when not hovering */}
      {!isHovering && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-500 group-hover:opacity-0">
          <div className="px-6 py-3 bg-white/95 backdrop-blur-sm text-brand-mainText text-sm font-bold tracking-wide uppercase rounded-full shadow-2xl">
            Move Mouse to Compare
          </div>
        </div>
      )}

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/10 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black/10 to-transparent" />
      </div>
    </div>
  );
}
