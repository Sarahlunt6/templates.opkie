"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { animate, useReducedMotion } from "framer-motion";
import Image from "next/image";

interface T3QuietSliderProps {
  beforeUrl: string;
  afterUrl: string;
  altTag: string;
}

/**
 * A calm adaptation of the shared BeforeAfterSlider: no pulse rings, no
 * glow, lazy-loaded imagery, soft moss shadows, lowercase labels. The
 * handle simply follows the pointer — nothing springs or jitters.
 */
export default function T3QuietSlider({
  beforeUrl,
  afterUrl,
  altTag,
}: T3QuietSliderProps) {
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const snapToCenter = useCallback(() => {
    if (reduced) {
      setPosition(50);
      return;
    }
    animate(position, 50, {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setPosition(v),
    });
  }, [position, reduced]);

  const updateFromClientX = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, pct)));
  }, []);

  useEffect(() => {
    const stop = () => setDragging(false);
    window.addEventListener("pointerup", stop);
    return () => window.removeEventListener("pointerup", stop);
  }, []);

  return (
    <div>
    <div
      ref={containerRef}
      role="slider"
      aria-label={`Before and after comparison: ${altTag}`}
      aria-valuenow={Math.round(position)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setPosition((p) => Math.max(0, p - 5));
        if (e.key === "ArrowRight") setPosition((p) => Math.min(100, p + 5));
      }}
      onPointerDown={(e) => {
        e.preventDefault();
        setDragging(true);
        updateFromClientX(e.clientX);
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (!dragging) return;
        updateFromClientX(e.clientX);
      }}
      className="relative aspect-[4/3] w-full cursor-ew-resize touch-none select-none overflow-hidden rounded-[2rem] shadow-[var(--t3-shadow-bloom)]"
    >
      {/* after (base layer) */}
      <div className="absolute inset-0">
        <Image
          src={afterUrl}
          alt={`After: ${altTag}`}
          fill
          loading="lazy"
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 640px"
        />
        <span className="absolute bottom-4 right-4 t3-glass-chip px-3.5 py-1.5 text-xs font-light text-[var(--t3-moss)]">
          after
        </span>
      </div>

      {/* before (clipped layer) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={beforeUrl}
          alt={`Before: ${altTag}`}
          fill
          loading="lazy"
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 640px"
        />
        <span className="absolute bottom-4 left-4 t3-glass-chip px-3.5 py-1.5 text-xs font-light text-[var(--t3-moss)]">
          before
        </span>
      </div>

      {/* divider + handle */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 w-px bg-[rgba(255,255,255,0.85)]"
        style={{ left: `${position}%` }}
      />
      <div
        aria-hidden="true"
        className={`absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--t3-euc-deep)] shadow-[var(--t3-shadow-soft)] transition-transform duration-500 ${
          dragging ? "scale-105" : ""
        }`}
        style={{ left: `${position}%` }}
      >
        <svg
          className="h-5 w-5 text-[var(--t3-sage-light)]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 8l-4 4 4 4" />
          <path d="M15 8l4 4-4 4" />
        </svg>
      </div>

      {/* accessible range fallback */}
      <input
        type="range"
        min={0}
        max={100}
        value={Math.round(position)}
        onChange={(e) => setPosition(Number(e.target.value))}
        className="sr-only"
        aria-label="Adjust before and after comparison"
      />
    </div>

      {/* Reveal readout + gentle re-center */}
      <div className="mt-4 flex items-center justify-between gap-4">
        <span className="text-[13px] font-light text-[var(--t3-moss-soft)]">
          <span className="tabular-nums text-[var(--t3-moss)]">
            {Math.round(position)}%
          </span>{" "}
          before ·{" "}
          <span className="tabular-nums text-[var(--t3-moss)]">
            {100 - Math.round(position)}%
          </span>{" "}
          after
        </span>
        <button
          type="button"
          onClick={snapToCenter}
          className="rounded-full border border-[var(--t3-line)] px-4 py-1.5 text-[13px] font-light lowercase text-[var(--t3-moss-soft)] transition-colors duration-500 hover:border-[var(--t3-euc)] hover:text-[var(--t3-moss)]"
        >
          center
        </button>
      </div>
    </div>
  );
}
