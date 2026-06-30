"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface T2AnimatedGridProps {
  pattern?: "circuit" | "grid" | "hexagon";
  opacity?: number;
  color?: string;
  animationDuration?: number;
}

/**
 * T2 Animated Grid Component
 *
 * Interactive SVG grid/wireframe that draws itself on scroll.
 * Features:
 * - Circuit-like pathway animations using stroke-dasharray
 * - GSAP ScrollTrigger integration
 * - Multiple pattern options
 * - Hardware-accelerated rendering
 * - Respects prefers-reduced-motion
 */
export default function T2AnimatedGrid({
  pattern = "circuit",
  opacity = 0.08,
  color = "rgba(15, 118, 110, 1)",
  animationDuration = 2,
}: T2AnimatedGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current || prefersReducedMotion) return;

    const paths = svgRef.current.querySelectorAll("path, line, polyline");

    paths.forEach((path) => {
      const length = (path as SVGGeometryElement).getTotalLength?.() || 0;

      // Set initial dash state (hidden)
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      // Animate on scroll into view
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: animationDuration,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [prefersReducedMotion, animationDuration]);

  const renderPattern = () => {
    switch (pattern) {
      case "circuit":
        return (
          <svg
            ref={svgRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ opacity }}
            preserveAspectRatio="none"
          >
            {/* Horizontal lines */}
            <line x1="0%" y1="20%" x2="100%" y2="20%" stroke={color} strokeWidth="1" />
            <line x1="0%" y1="40%" x2="100%" y2="40%" stroke={color} strokeWidth="1" />
            <line x1="0%" y1="60%" x2="100%" y2="60%" stroke={color} strokeWidth="1" />
            <line x1="0%" y1="80%" x2="100%" y2="80%" stroke={color} strokeWidth="1" />

            {/* Vertical lines */}
            <line x1="20%" y1="0%" x2="20%" y2="100%" stroke={color} strokeWidth="1" />
            <line x1="40%" y1="0%" x2="40%" y2="100%" stroke={color} strokeWidth="1" />
            <line x1="60%" y1="0%" x2="60%" y2="100%" stroke={color} strokeWidth="1" />
            <line x1="80%" y1="0%" x2="80%" y2="100%" stroke={color} strokeWidth="1" />

            {/* Circuit pathways */}
            <path
              d="M 10% 10% L 30% 10% L 30% 30% L 50% 30%"
              stroke={color}
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M 50% 70% L 70% 70% L 70% 50% L 90% 50%"
              stroke={color}
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M 10% 90% L 20% 90% L 20% 70% L 40% 70%"
              stroke={color}
              strokeWidth="2"
              fill="none"
            />

            {/* Connection nodes */}
            <circle cx="30%" cy="10%" r="3" fill={color} />
            <circle cx="30%" cy="30%" r="3" fill={color} />
            <circle cx="50%" cy="30%" r="3" fill={color} />
            <circle cx="50%" cy="70%" r="3" fill={color} />
            <circle cx="70%" cy="70%" r="3" fill={color} />
            <circle cx="70%" cy="50%" r="3" fill={color} />
          </svg>
        );

      case "hexagon":
        return (
          <svg
            ref={svgRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ opacity }}
            preserveAspectRatio="none"
          >
            <defs>
              <pattern id="hexPattern" x="0" y="0" width="100" height="86.6" patternUnits="userSpaceOnUse">
                <polygon
                  points="50,1 95,25.5 95,75.5 50,100 5,75.5 5,25.5"
                  stroke={color}
                  strokeWidth="1"
                  fill="none"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexPattern)" />
          </svg>
        );

      case "grid":
      default:
        return (
          <svg
            ref={svgRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ opacity }}
            preserveAspectRatio="none"
          >
            {/* Vertical grid lines */}
            {Array.from({ length: 20 }).map((_, i) => (
              <line
                key={`v-${i}`}
                x1={`${(i * 100) / 20}%`}
                y1="0%"
                x2={`${(i * 100) / 20}%`}
                y2="100%"
                stroke={color}
                strokeWidth="0.5"
              />
            ))}
            {/* Horizontal grid lines */}
            {Array.from({ length: 20 }).map((_, i) => (
              <line
                key={`h-${i}`}
                x1="0%"
                y1={`${(i * 100) / 20}%`}
                x2="100%"
                y2={`${(i * 100) / 20}%`}
                stroke={color}
                strokeWidth="0.5"
              />
            ))}
          </svg>
        );
    }
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {renderPattern()}
    </div>
  );
}
