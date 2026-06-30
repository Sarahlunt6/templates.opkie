"use client";

import { useEffect, useRef, useState } from "react";

interface Bubble {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
}

interface WavePoint {
  x: number;
  y: number;
  intensity: number;
  time: number;
}

/**
 * AquaSonicCursor - High-End Fluid Cursor Displacement Effect
 *
 * Creates a sophisticated hydrostatic wave trail with microscopic bubble particles
 * and subtle polishing interactions. Hardware-accelerated with performance detection.
 */
export default function AquaSonicCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSupported, setIsSupported] = useState(true);
  const cursorPosRef = useRef({ x: 0, y: 0 });
  const bubblesRef = useRef<Bubble[]>([]);
  const wavePointsRef = useRef<WavePoint[]>([]);
  const frameRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    // Performance detection - disable on low-power devices
    const isLowPower =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isLowPower) {
      setIsSupported(false);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", {
      alpha: true,
      desynchronized: true // Hardware acceleration hint
    });
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Track cursor position
    const handleMouseMove = (e: MouseEvent) => {
      cursorPosRef.current = { x: e.clientX, y: e.clientY };

      // Create new wave point
      wavePointsRef.current.push({
        x: e.clientX,
        y: e.clientY,
        intensity: 1,
        time: performance.now()
      });

      // Generate subtle bubbles on movement (reduced frequency)
      if (Math.random() > 0.92) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.2 + Math.random() * 0.4;

        bubblesRef.current.push({
          x: e.clientX + (Math.random() - 0.5) * 15,
          y: e.clientY + (Math.random() - 0.5) * 15,
          vx: Math.cos(angle) * speed * 0.5,
          vy: Math.sin(angle) * speed - 0.3, // Slower float upward
          size: 1.5 + Math.random() * 2.5,
          opacity: 0.15 + Math.random() * 0.2, // More subtle
          life: 1
        });
      }

      // Limit arrays
      if (wavePointsRef.current.length > 15) {
        wavePointsRef.current.shift();
      }
      if (bubblesRef.current.length > 50) {
        bubblesRef.current.shift();
      }
    };

    // Polishing interaction on hover
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && (
        target.tagName === "H1" ||
        target.tagName === "H2" ||
        target.tagName === "H3" ||
        target.tagName === "P" ||
        target.classList.contains("polishable")
      )) {
        target.style.transition = "backdrop-filter 0.3s ease-out";
        target.style.backdropFilter = "brightness(1.2) contrast(1.1)";

        // Auto-remove after delay
        setTimeout(() => {
          target.style.backdropFilter = "";
        }, 600);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    // Animation loop
    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTimeRef.current;
      lastTimeRef.current = currentTime;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw realistic water ripples with wave physics
      wavePointsRef.current = wavePointsRef.current.filter((point) => {
        const age = currentTime - point.time;
        const maxAge = 2000; // 2 seconds for more visible ripples

        if (age > maxAge) return false;

        const progress = age / maxAge;
        const frequency = 0.08; // Wave frequency
        const waveCount = 4; // Number of concentric ripples

        // Draw multiple concentric ripple waves
        for (let i = 0; i < waveCount; i++) {
          const waveOffset = i * 25; // Spacing between waves
          const baseRadius = 10 + progress * 120 + waveOffset;

          // Calculate wave amplitude with decay
          const amplitude = 8 * (1 - progress) * Math.sin((progress * 15) - (i * 0.5));

          // Create organic water ripple using quadratic curves
          ctx.beginPath();
          const segments = 32; // Number of segments for smooth circle

          for (let j = 0; j <= segments; j++) {
            const angle = (j / segments) * Math.PI * 2;

            // Add wave distortion to radius for organic water movement
            const waveDistortion = amplitude * Math.sin(angle * 6 + progress * 10);
            const currentRadius = baseRadius + waveDistortion;

            const x = point.x + Math.cos(angle) * currentRadius;
            const y = point.y + Math.sin(angle) * currentRadius;

            if (j === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.closePath();

          // Calculate opacity with wave-based variation
          const waveOpacity = (1 - progress) * (0.18 - i * 0.03) *
                             (0.8 + 0.4 * Math.sin((progress * 20) - (i * 0.8)));

          // Gradient stroke for depth
          const gradient = ctx.createRadialGradient(
            point.x, point.y, baseRadius * 0.3,
            point.x, point.y, baseRadius
          );
          gradient.addColorStop(0, `rgba(165, 243, 252, ${waveOpacity * 1.2})`);
          gradient.addColorStop(0.5, `rgba(20, 184, 166, ${waveOpacity})`);
          gradient.addColorStop(1, `rgba(20, 184, 166, ${waveOpacity * 0.6})`);

          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2.5 - (i * 0.3) - (progress * 1.5);
          ctx.stroke();

          // Add subtle fill for wave crest with caustic-like effect
          if (i % 2 === 0 && amplitude > 2) {
            const fillGradient = ctx.createRadialGradient(
              point.x, point.y, baseRadius * 0.6,
              point.x, point.y, baseRadius
            );
            fillGradient.addColorStop(0, `rgba(165, 243, 252, ${waveOpacity * 0.15})`);
            fillGradient.addColorStop(1, `rgba(20, 184, 166, 0)`);
            ctx.fillStyle = fillGradient;
            ctx.fill();
          }
        }

        // Add interference pattern at wave center
        if (progress < 0.3) {
          const centerGradient = ctx.createRadialGradient(
            point.x, point.y, 0,
            point.x, point.y, 15
          );
          centerGradient.addColorStop(0, `rgba(165, 243, 252, ${(1 - progress * 3) * 0.4})`);
          centerGradient.addColorStop(1, `rgba(20, 184, 166, 0)`);
          ctx.fillStyle = centerGradient;
          ctx.beginPath();
          ctx.arc(point.x, point.y, 15, 0, Math.PI * 2);
          ctx.fill();
        }

        return true;
      });

      // Update and draw subtle microscopic bubbles
      bubblesRef.current = bubblesRef.current.filter((bubble) => {
        // Update position
        bubble.x += bubble.vx;
        bubble.y += bubble.vy;
        bubble.life -= 0.012;

        if (bubble.life <= 0) return false;

        // Draw subtle bubble with soft glow
        const bubbleOpacity = bubble.opacity * bubble.life;

        // Soft bubble glow (more subtle)
        const bubbleGradient = ctx.createRadialGradient(
          bubble.x, bubble.y, 0,
          bubble.x, bubble.y, bubble.size * 1.5
        );
        bubbleGradient.addColorStop(0, `rgba(165, 243, 252, ${bubbleOpacity * 0.5})`);
        bubbleGradient.addColorStop(0.5, `rgba(20, 184, 166, ${bubbleOpacity * 0.25})`);
        bubbleGradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

        ctx.fillStyle = bubbleGradient;
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.size * 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Tiny core
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.size * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${bubbleOpacity * 0.3})`;
        ctx.fill();

        return true;
      });

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  if (!isSupported) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{
        mixBlendMode: "screen",
        willChange: "transform",
      }}
    />
  );
}
