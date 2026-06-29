"use client";

import { useEffect, useRef, useCallback } from "react";
import { useSmoothScroll } from "@/components/premium";

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  hue: number;
  phase: number;
}

interface GradientOrb {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  size: number;
  hue: number;
  saturation: number;
  lightness: number;
  opacity: number;
  speed: number;
  phase: number;
}

interface T3PremiumCanvasProps {
  particleCount?: number;
  orbCount?: number;
  colorPalette?: "sanctuary" | "warm" | "cool";
}

export default function T3PremiumCanvas({
  particleCount = 35,
  orbCount = 4,
  colorPalette = "sanctuary",
}: T3PremiumCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const orbsRef = useRef<GradientOrb[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const dimensionsRef = useRef({ width: 0, height: 0 });
  const { scrollProgress, scrollVelocity } = useSmoothScroll();

  // Color palettes for luxury aesthetics
  const palettes = {
    sanctuary: {
      particles: [
        { h: 38, s: 25, l: 85 }, // Warm cream
        { h: 174, s: 30, l: 75 }, // Soft teal
        { h: 38, s: 35, l: 80 }, // Golden
      ],
      orbs: [
        { h: 38, s: 40, l: 90 }, // Amber glow
        { h: 174, s: 35, l: 85 }, // Teal mist
        { h: 30, s: 30, l: 92 }, // Warm white
        { h: 168, s: 25, l: 88 }, // Sage
      ],
    },
    warm: {
      particles: [
        { h: 30, s: 40, l: 80 },
        { h: 45, s: 35, l: 85 },
        { h: 20, s: 30, l: 82 },
      ],
      orbs: [
        { h: 35, s: 45, l: 88 },
        { h: 25, s: 35, l: 90 },
        { h: 40, s: 40, l: 85 },
        { h: 15, s: 30, l: 92 },
      ],
    },
    cool: {
      particles: [
        { h: 200, s: 30, l: 82 },
        { h: 180, s: 25, l: 85 },
        { h: 220, s: 20, l: 88 },
      ],
      orbs: [
        { h: 195, s: 35, l: 88 },
        { h: 210, s: 30, l: 90 },
        { h: 175, s: 25, l: 85 },
        { h: 185, s: 20, l: 92 },
      ],
    },
  };

  const palette = palettes[colorPalette];

  // Initialize particles
  const initParticles = useCallback(
    (width: number, height: number) => {
      const particles: Particle[] = [];
      for (let i = 0; i < particleCount; i++) {
        const colorIndex = Math.floor(Math.random() * palette.particles.length);
        const color = palette.particles[colorIndex];
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          baseX: Math.random() * width,
          baseY: Math.random() * height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.15,
          speedY: (Math.random() - 0.5) * 0.15,
          opacity: Math.random() * 0.3 + 0.1,
          hue: color.h,
          phase: Math.random() * Math.PI * 2,
        });
      }
      return particles;
    },
    [particleCount, palette.particles]
  );

  // Initialize gradient orbs
  const initOrbs = useCallback(
    (width: number, height: number) => {
      const orbs: GradientOrb[] = [];
      for (let i = 0; i < orbCount; i++) {
        const colorIndex = i % palette.orbs.length;
        const color = palette.orbs[colorIndex];
        orbs.push({
          x: Math.random() * width,
          y: Math.random() * height,
          targetX: Math.random() * width,
          targetY: Math.random() * height,
          size: Math.random() * 300 + 200,
          hue: color.h,
          saturation: color.s,
          lightness: color.l,
          opacity: Math.random() * 0.06 + 0.02,
          speed: Math.random() * 0.0003 + 0.0001,
          phase: Math.random() * Math.PI * 2,
        });
      }
      return orbs;
    },
    [orbCount, palette.orbs]
  );

  // Handle resize
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(dpr, dpr);
    }

    dimensionsRef.current = { width, height };

    // Reinitialize on resize
    particlesRef.current = initParticles(width, height);
    orbsRef.current = initOrbs(width, height);
  }, [initParticles, initOrbs]);

  // Handle mouse movement
  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = {
      x: e.clientX,
      y: e.clientY,
      active: true,
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.active = false;
  }, []);

  // Main animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const { width, height } = dimensionsRef.current;
    const time = performance.now() * 0.001;
    const mouse = mouseRef.current;

    // Clear with subtle fade for trail effect
    ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
    ctx.fillRect(0, 0, width, height);

    // Draw gradient orbs (background layer)
    orbsRef.current.forEach((orb) => {
      // Organic movement using perlin-like noise
      orb.phase += orb.speed;
      const noiseX = Math.sin(orb.phase) * Math.cos(orb.phase * 0.5) * 100;
      const noiseY = Math.cos(orb.phase * 0.7) * Math.sin(orb.phase * 0.3) * 100;

      // Scroll influence
      const scrollInfluence = scrollProgress * height * 0.3;
      const velocityInfluence = scrollVelocity * 20;

      orb.x += (orb.targetX + noiseX - orb.x) * 0.002;
      orb.y += (orb.targetY + noiseY - orb.y + scrollInfluence) * 0.002 + velocityInfluence * 0.01;

      // Mouse repulsion for orbs
      if (mouse.active) {
        const dx = orb.x - mouse.x;
        const dy = orb.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 400) {
          const force = (400 - dist) / 400;
          orb.x += dx * force * 0.002;
          orb.y += dy * force * 0.002;
        }
      }

      // Keep orbs in bounds with soft wrapping
      if (orb.x < -orb.size) orb.x = width + orb.size;
      if (orb.x > width + orb.size) orb.x = -orb.size;
      if (orb.y < -orb.size) orb.y = height + orb.size;
      if (orb.y > height + orb.size) orb.y = -orb.size;

      // Update target occasionally
      if (Math.random() < 0.001) {
        orb.targetX = Math.random() * width;
        orb.targetY = Math.random() * height;
      }

      // Draw radial gradient orb
      const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.size);
      gradient.addColorStop(
        0,
        `hsla(${orb.hue}, ${orb.saturation}%, ${orb.lightness}%, ${orb.opacity})`
      );
      gradient.addColorStop(0.5, `hsla(${orb.hue}, ${orb.saturation}%, ${orb.lightness}%, ${orb.opacity * 0.4})`);
      gradient.addColorStop(1, `hsla(${orb.hue}, ${orb.saturation}%, ${orb.lightness}%, 0)`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(orb.x, orb.y, orb.size, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw particles (foreground layer)
    particlesRef.current.forEach((particle) => {
      // Organic oscillation
      particle.phase += 0.008;
      const oscillateX = Math.sin(particle.phase) * 2;
      const oscillateY = Math.cos(particle.phase * 0.7) * 2;

      // Base drift
      particle.x += particle.speedX + oscillateX * 0.05;
      particle.y += particle.speedY + oscillateY * 0.05;

      // Scroll influence - particles drift with scroll
      particle.y += scrollVelocity * 0.3;

      // Mouse attraction for particles
      if (mouse.active) {
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          const force = (200 - dist) / 200;
          particle.x += dx * force * 0.008;
          particle.y += dy * force * 0.008;
        }
      } else {
        // Return to base position slowly
        particle.x += (particle.baseX - particle.x) * 0.001;
        particle.y += (particle.baseY - particle.y) * 0.001;
      }

      // Soft boundary wrapping
      if (particle.x < -10) particle.x = width + 10;
      if (particle.x > width + 10) particle.x = -10;
      if (particle.y < -10) particle.y = height + 10;
      if (particle.y > height + 10) particle.y = -10;

      // Pulsing opacity
      const pulsingOpacity = particle.opacity * (0.8 + Math.sin(time * 0.5 + particle.phase) * 0.2);

      // Draw particle with soft glow
      const gradient = ctx.createRadialGradient(
        particle.x,
        particle.y,
        0,
        particle.x,
        particle.y,
        particle.size * 4
      );
      gradient.addColorStop(0, `hsla(${particle.hue}, 30%, 85%, ${pulsingOpacity})`);
      gradient.addColorStop(0.5, `hsla(${particle.hue}, 25%, 90%, ${pulsingOpacity * 0.3})`);
      gradient.addColorStop(1, `hsla(${particle.hue}, 20%, 95%, 0)`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * 4, 0, Math.PI * 2);
      ctx.fill();

      // Core particle
      ctx.fillStyle = `hsla(${particle.hue}, 35%, 80%, ${pulsingOpacity * 1.5})`;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    });

    animationRef.current = requestAnimationFrame(animate);
  }, [scrollProgress, scrollVelocity]);

  // Setup and cleanup
  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [handleResize, handleMouseMove, handleMouseLeave, animate]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10"
      aria-hidden="true"
      style={{
        background: "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(252,251,250,1) 100%)",
      }}
    />
  );
}
