"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";

interface BeforeAfterSliderProps {
  beforeUrl: string;
  afterUrl: string;
  altTag: string;
  aspectRatio?: "4/3" | "16/9" | "1/1";
}

// Spring physics configuration
const SPRING_CONFIG = {
  stiffness: 0.15,
  damping: 0.8,
  mass: 1,
};

export const BeforeAfterSlider = ({
  beforeUrl,
  afterUrl,
  altTag,
  aspectRatio = "4/3",
}: BeforeAfterSliderProps) => {
  const [targetPosition, setTargetPosition] = useState(50);
  const [currentPosition, setCurrentPosition] = useState(50);
  const [velocity, setVelocity] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  const aspectClasses = {
    "4/3": "aspect-[4/3]",
    "16/9": "aspect-[16/9]",
    "1/1": "aspect-square",
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

        // Stop animation when close enough
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
      setVelocity(0); // Reset velocity for immediate response
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
    <div
      ref={containerRef}
      className={`relative w-full ${aspectClasses[aspectRatio]} overflow-hidden rounded-xl select-none touch-none no-cls group`}
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
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        <span className="absolute bottom-4 right-4 px-3 py-1.5 text-sm font-semibold rounded-lg glass text-brand-mainText shadow-premium">
          After
        </span>
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
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        <span className="absolute bottom-4 left-4 px-3 py-1.5 text-sm font-semibold rounded-lg glass text-brand-mainText shadow-premium">
          Before
        </span>
      </div>

      {/* Slider Handle with Spring Animation */}
      <div
        className="absolute top-0 bottom-0 w-1 cursor-ew-resize will-change-transform"
        style={{
          left: `${currentPosition}%`,
          transform: "translateX(-50%)",
        }}
      >
        {/* Handle Line with Glow */}
        <div
          className="absolute inset-0 bg-white shadow-[0_0_20px_rgba(255,255,255,0.5)]"
          style={{
            boxShadow: isDragging
              ? "0 0 30px rgba(255,255,255,0.8), 0 0 60px rgba(15,118,110,0.3)"
              : "0 0 20px rgba(255,255,255,0.5)",
            transition: "box-shadow 0.3s ease"
          }}
        />

        {/* Handle Button */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center shadow-premium-lg transition-all duration-300 ${
            isDragging ? "scale-110" : isHovering ? "scale-105" : "scale-100"
          }`}
          style={{
            backgroundColor: "var(--primary-brand)",
            boxShadow: isDragging
              ? "0 8px 32px rgba(15, 118, 110, 0.5), 0 0 0 4px rgba(255,255,255,0.3)"
              : "0 4px 20px rgba(15, 118, 110, 0.3)",
          }}
        >
          {/* Arrow Icons */}
          <svg
            className={`w-6 h-6 transition-transform duration-300 ${isDragging ? "scale-90" : ""}`}
            fill="var(--bg-canvas)"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" transform="translate(5, 0)" />
          </svg>
        </div>

        {/* Pulse Ring Animation when Idle */}
        {!isDragging && (
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full animate-ping opacity-20"
            style={{ backgroundColor: "var(--primary-brand)" }}
          />
        )}
      </div>

      {/* Gradient Overlays for Depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black/10 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black/10 to-transparent" />
      </div>

      {/* Instruction Hint */}
      <div
        className={`absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full glass text-xs font-medium text-brand-mainText transition-all duration-500 ${
          isHovering && !isDragging ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        Drag to compare
      </div>

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
  );
};

export default BeforeAfterSlider;
