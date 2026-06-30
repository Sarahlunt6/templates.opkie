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

      // Generate bubbles on movement
      if (Math.random() > 0.7) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.3 + Math.random() * 0.7;

        bubblesRef.current.push({
          x: e.clientX + (Math.random() - 0.5) * 20,
          y: e.clientY + (Math.random() - 0.5) * 20,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.5, // Float upward
          size: 2 + Math.random() * 4,
          opacity: 0.3 + Math.random() * 0.4,
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

      // Draw hydrostatic wave trail
      wavePointsRef.current = wavePointsRef.current.filter((point) => {
        const age = currentTime - point.time;
        const maxAge = 1500; // 1.5 seconds

        if (age > maxAge) return false;

        const progress = age / maxAge;
        const radius = 20 + progress * 80; // Expanding ripple
        const opacity = (1 - progress) * 0.15;

        // Outer wave ring - translucent aqua
        ctx.beginPath();
        ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(20, 184, 166, ${opacity})`; // Teal
        ctx.lineWidth = 2;
        ctx.stroke();

        // Inner glow
        const gradient = ctx.createRadialGradient(
          point.x, point.y, 0,
          point.x, point.y, radius * 0.6
        );
        gradient.addColorStop(0, `rgba(165, 243, 252, ${opacity * 0.3})`); // Light cyan
        gradient.addColorStop(1, `rgba(20, 184, 166, 0)`);
        ctx.fillStyle = gradient;
        ctx.fill();

        return true;
      });

      // Update and draw microscopic bubbles
      bubblesRef.current = bubblesRef.current.filter((bubble) => {
        // Update position
        bubble.x += bubble.vx;
        bubble.y += bubble.vy;
        bubble.life -= 0.01;

        if (bubble.life <= 0) return false;

        // Draw bubble with pearlescent effect
        const bubbleOpacity = bubble.opacity * bubble.life;

        // Outer bubble shell
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${bubbleOpacity * 0.6})`;
        ctx.fill();

        // Light diffraction highlight
        const highlightGradient = ctx.createRadialGradient(
          bubble.x - bubble.size * 0.3,
          bubble.y - bubble.size * 0.3,
          0,
          bubble.x,
          bubble.y,
          bubble.size
        );
        highlightGradient.addColorStop(0, `rgba(165, 243, 252, ${bubbleOpacity * 0.8})`);
        highlightGradient.addColorStop(0.5, `rgba(20, 184, 166, ${bubbleOpacity * 0.3})`);
        highlightGradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

        ctx.fillStyle = highlightGradient;
        ctx.fill();

        // Subtle rim
        ctx.strokeStyle = `rgba(255, 255, 255, ${bubbleOpacity * 0.4})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();

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
