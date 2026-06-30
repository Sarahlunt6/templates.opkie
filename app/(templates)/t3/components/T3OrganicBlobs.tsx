"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface T3OrganicBlobsProps {
  count?: number;
  colors?: string[];
  opacity?: number;
}

/**
 * T3 Organic Blobs Component
 *
 * Continuously morphing SVG blob shapes for calming background ambiance.
 * Features:
 * - Smooth path morphing using GSAP
 * - Random gentle movement
 * - Soft gradient fills
 * - Ultra-slow animation (20-30s cycles)
 * - Respects prefers-reduced-motion
 *
 * Creates atmospheric depth without distraction.
 */
export default function T3OrganicBlobs({
  count = 3,
  colors = ["rgba(168, 213, 186, 0.15)", "rgba(232, 213, 196, 0.12)", "rgba(15, 90, 83, 0.08)"],
  opacity = 1,
}: T3OrganicBlobsProps) {
  const containerRef = useRef<SVGSVGElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!containerRef.current || prefersReducedMotion) return;

    const blobs = containerRef.current.querySelectorAll(".organic-blob");

    blobs.forEach((blob, index) => {
      // Generate smooth organic paths
      const generatePath = () => {
        const points = 8;
        const angleStep = (Math.PI * 2) / points;
        const baseRadius = 150 + Math.random() * 100;
        let pathData = "";

        for (let i = 0; i <= points; i++) {
          const angle = angleStep * i;
          const radiusVariation = baseRadius + (Math.random() - 0.5) * 60;
          const x = 400 + Math.cos(angle) * radiusVariation;
          const y = 400 + Math.sin(angle) * radiusVariation;

          if (i === 0) {
            pathData += `M ${x} ${y}`;
          } else {
            // Use quadratic curves for smooth organic shapes
            const prevAngle = angleStep * (i - 1);
            const prevRadius = baseRadius + (Math.random() - 0.5) * 60;
            const prevX = 400 + Math.cos(prevAngle) * prevRadius;
            const prevY = 400 + Math.sin(prevAngle) * prevRadius;

            const cpX = (prevX + x) / 2 + (Math.random() - 0.5) * 40;
            const cpY = (prevY + y) / 2 + (Math.random() - 0.5) * 40;

            pathData += ` Q ${cpX} ${cpY}, ${x} ${y}`;
          }
        }
        pathData += " Z";
        return pathData;
      };

      // Animate blob morphing
      const animateBlob = () => {
        const duration = 20 + Math.random() * 15; // 20-35s very slow cycle

        gsap.to(blob, {
          attr: { d: generatePath() },
          duration,
          ease: "sine.inOut",
          onComplete: animateBlob,
        });
      };

      // Start animation with stagger
      gsap.delayedCall(index * 2, animateBlob);

      // Gentle floating movement
      gsap.to(blob.parentElement, {
        x: `+=${(Math.random() - 0.5) * 100}`,
        y: `+=${(Math.random() - 0.5) * 100}`,
        duration: 25 + Math.random() * 10,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    });

    return () => {
      gsap.killTweensOf(".organic-blob");
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    // Show static blobs for reduced motion
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ opacity }}>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 800" preserveAspectRatio="xMidYMid slice">
          {Array.from({ length: count }).map((_, index) => (
            <g key={index} style={{ opacity: 0.5 }}>
              <circle
                cx={200 + index * 250}
                cy={300 + (index % 2) * 200}
                r={180}
                fill={colors[index % colors.length]}
                filter="blur(60px)"
              />
            </g>
          ))}
        </svg>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ opacity }}>
      <svg
        ref={containerRef}
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 800 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {colors.map((color, index) => (
            <radialGradient key={index} id={`blob-gradient-${index}`}>
              <stop offset="0%" stopColor={color} stopOpacity="0.8" />
              <stop offset="100%" stopColor={color} stopOpacity="0.2" />
            </radialGradient>
          ))}
        </defs>

        {Array.from({ length: count }).map((_, index) => (
          <g
            key={index}
            style={{
              transform: `translate(${index * 150}px, ${(index % 2) * 200}px)`,
            }}
          >
            <path
              className="organic-blob"
              d="M 400 250 Q 450 250, 500 300 Q 550 350, 550 400 Q 550 450, 500 500 Q 450 550, 400 550 Q 350 550, 300 500 Q 250 450, 250 400 Q 250 350, 300 300 Q 350 250, 400 250 Z"
              fill={`url(#blob-gradient-${index})`}
              filter="blur(60px)"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
