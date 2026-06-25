"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

// Template architecture data with engineering spec metadata
const templateArchitectures = [
  {
    id: "t1",
    code: "01",
    title: "The Prestige Leader",
    system: "RECONSTRUCTIVE AUTHORITY",
    architecture: "HERITAGE EDITORIAL GRID",
    blueprint: "split",
    video: "/videos/hero-ambient.mp4",
    fallbackImage: "/images/team/staff-photo.jpg",
    specs: {
      layout: "Asymmetric 12-Col",
      typography: "Cormorant Serif",
      density: "High",
      motion: "Parallax + Spring",
    },
    bestFor: ["High-End Cosmetic", "Legacy Multi-Doctor", "Reconstructive"],
  },
  {
    id: "t2",
    code: "02",
    title: "The Clinical Innovator",
    system: "PRECISION TECHNOLOGY",
    architecture: "DARK GLASSMORPHIC MATRIX",
    blueprint: "dashboard",
    video: "/videos/hero-ambient-t2.mp4",
    fallbackImage: "/images/office-interior.jpg",
    specs: {
      layout: "Dashboard Grid",
      typography: "Space Grotesk",
      density: "Medium",
      motion: "Cursor Track + Glow",
    },
    bestFor: ["Digital-First", "Tech-Forward", "Modern Clinical"],
  },
  {
    id: "t3",
    code: "03",
    title: "The Spatial Sanctuary",
    system: "HOLISTIC WELLNESS",
    architecture: "ZEN MINIMALIST CANVAS",
    blueprint: "centered",
    video: "/videos/hero-ambient.mp4",
    fallbackImage: "/images/office-exterior.jpg",
    specs: {
      layout: "Centered Flow",
      typography: "Outfit Sans",
      density: "Low",
      motion: "Breathing + Float",
    },
    bestFor: ["Boutique Practice", "Spa-Like", "Anxiety-Focused"],
  },
];

export default function DesignRegistryPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const columnsRef = useRef<(HTMLDivElement | null)[]>([]);
  const titlesRef = useRef<(HTMLDivElement | null)[]>([]);

  // Initial page load animation
  useEffect(() => {
    setIsLoaded(true);

    // Stagger animate titles on load
    if (titlesRef.current.length > 0) {
      gsap.fromTo(
        titlesRef.current.filter(Boolean),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power4.out",
          delay: 0.5,
        }
      );
    }
  }, []);

  // Handle column flex expansion on hover
  useEffect(() => {
    columnsRef.current.forEach((col, index) => {
      if (!col) return;

      if (hoveredIndex === null) {
        // Reset to equal widths
        gsap.to(col, {
          flex: 1,
          duration: 0.6,
          ease: "power3.out",
        });
      } else if (hoveredIndex === index) {
        // Expand hovered column
        gsap.to(col, {
          flex: 1.8,
          duration: 0.6,
          ease: "power3.out",
        });
      } else {
        // Compress non-hovered columns
        gsap.to(col, {
          flex: 0.6,
          duration: 0.6,
          ease: "power3.out",
        });
      }
    });
  }, [hoveredIndex]);

  return (
    <main className="h-screen w-screen overflow-hidden bg-[#0a0a0a] text-white relative">
      {/* ═══════════════════════════════════════════════════════════════════════
          FILM GRAIN OVERLAY
          Subtle analog texture for premium feel
      ═══════════════════════════════════════════════════════════════════════ */}
      <div
        className="fixed inset-0 pointer-events-none z-[100] opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ═══════════════════════════════════════════════════════════════════════
          FLOATING TOP NAVIGATION
          Minimalist architectural header
      ═══════════════════════════════════════════════════════════════════════ */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50 px-8 py-6"
      >
        <div className="flex items-center justify-between">
          {/* Left - Brand Identity */}
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 border border-white/20 flex items-center justify-center">
              <div className="w-3 h-3 bg-white/80" />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono tracking-[0.25em] text-white/60 uppercase">
                Opkie Design Systems
              </span>
              <span className="text-white/20">//</span>
              <span className="text-[10px] font-mono tracking-[0.2em] text-white/40 uppercase">
                Architectural Deck 2026
              </span>
            </div>
          </div>

          {/* Right - Status Indicators */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] font-mono tracking-[0.2em] text-white/40 uppercase">
                3 Systems Online
              </span>
            </div>
            <div className="h-4 w-px bg-white/10" />
            <span className="text-[9px] font-mono tracking-[0.15em] text-white/30">
              V.2.0.26
            </span>
          </div>
        </div>
      </motion.header>

      {/* ═══════════════════════════════════════════════════════════════════════
          INTERACTIVE FLEX-DECK COMPONENT
          3-column dynamic expansion system
      ═══════════════════════════════════════════════════════════════════════ */}
      <div className="h-full w-full flex">
        {templateArchitectures.map((template, index) => (
          <div
            key={template.id}
            ref={(el) => { columnsRef.current[index] = el; }}
            className="relative h-full border-r border-white/[0.06] last:border-r-0 overflow-hidden cursor-pointer"
            style={{ flex: 1 }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Background Media - Hidden until hover */}
            <div
              className="absolute inset-0 transition-opacity duration-700"
              style={{ opacity: hoveredIndex === index ? 0.12 : 0 }}
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                poster={template.fallbackImage}
              >
                <source src={template.video} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
            </div>

            {/* Column Content */}
            <div className="relative z-10 h-full flex flex-col justify-between p-8 lg:p-12">
              {/* Top Section - Architecture Code */}
              <div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3 mb-8"
                >
                  <span className="text-[10px] font-mono tracking-[0.3em] text-white/30">
                    [ ARCHITECTURE: {template.code} ]
                  </span>
                </motion.div>

                {/* System Badge */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/[0.03] border border-white/[0.08] rounded-sm mb-6"
                >
                  <div className="w-1 h-1 bg-white/40" />
                  <span className="text-[9px] font-mono tracking-[0.2em] text-white/50 uppercase">
                    System: {template.system}
                  </span>
                </motion.div>
              </div>

              {/* Middle Section - Title & Specs */}
              <div className="flex-1 flex flex-col justify-center">
                {/* Main Title - Stagger animated */}
                <div
                  ref={(el) => { titlesRef.current[index] = el; }}
                  className="mb-8"
                >
                  <h2
                    className="text-[clamp(1.5rem,4vw,3.5rem)] font-light tracking-[-0.02em] leading-[1.1] mb-3 transition-all duration-500"
                    style={{
                      opacity: hoveredIndex === null || hoveredIndex === index ? 1 : 0.3,
                    }}
                  >
                    {template.title}
                  </h2>
                  <p className="text-[11px] font-mono tracking-[0.15em] text-white/40 uppercase">
                    {template.architecture}
                  </p>
                </div>

                {/* Spec Sheet Matrix - Visible on hover */}
                <motion.div
                  initial={false}
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0,
                    y: hoveredIndex === index ? 0 : 10,
                  }}
                  transition={{ duration: 0.4 }}
                  className="space-y-3 mb-8"
                >
                  {Object.entries(template.specs).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-4">
                      <span className="text-[9px] font-mono tracking-[0.2em] text-white/30 uppercase w-20">
                        {key}
                      </span>
                      <div className="flex-1 h-px bg-white/[0.06]" />
                      <span className="text-[10px] font-mono tracking-[0.1em] text-white/60">
                        {value}
                      </span>
                    </div>
                  ))}
                </motion.div>

                {/* Best For Tags */}
                <motion.div
                  initial={false}
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="flex flex-wrap gap-2"
                >
                  {template.bestFor.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-[9px] font-mono tracking-[0.1em] text-white/50 border border-white/[0.08] rounded-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>
              </div>

              {/* Bottom Section - CTA */}
              <div>
                {/* Animated Underline CTA */}
                <a
                  href={`/${template.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3"
                >
                  <span className="relative text-[11px] font-mono tracking-[0.2em] text-white/70 uppercase overflow-hidden">
                    <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                      View Template
                    </span>
                    {/* Animated underline */}
                    <span className="absolute bottom-0 left-0 w-full h-px bg-white/40">
                      <span className="absolute inset-0 bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                    </span>
                  </span>
                  {/* Arrow that translates on hover */}
                  <svg
                    className="w-3 h-3 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>

                {/* Column Index */}
                <div className="mt-12 flex items-end justify-between">
                  <span className="text-[100px] lg:text-[140px] font-extralight text-white/[0.03] leading-none select-none">
                    {template.code}
                  </span>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/60" />
                    <span className="text-[8px] font-mono tracking-[0.25em] text-white/30 uppercase">
                      Ready
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hover Border Glow */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={false}
              animate={{
                boxShadow:
                  hoveredIndex === index
                    ? "inset 0 0 80px rgba(255,255,255,0.02)"
                    : "inset 0 0 0px rgba(255,255,255,0)",
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          BOTTOM NAVIGATION BAR
          Practice type toggle and version info
      ═══════════════════════════════════════════════════════════════════════ */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="fixed bottom-0 left-0 right-0 z-50 px-8 py-5 border-t border-white/[0.04] bg-black/40 backdrop-blur-xl"
      >
        <div className="flex items-center justify-between">
          {/* Left - Practice Type Toggle */}
          <div className="flex items-center gap-6">
            <span className="text-[9px] font-mono tracking-[0.2em] text-white/30 uppercase">
              Practice Type
            </span>
            <div className="flex items-center gap-1">
              <a
                href="/"
                className="px-4 py-2 text-[10px] font-mono tracking-[0.15em] text-white/80 bg-white/[0.08] border border-white/[0.1] hover:bg-white/[0.12] transition-colors uppercase"
              >
                Dental
              </a>
              <a
                href="/?type=ortho"
                className="px-4 py-2 text-[10px] font-mono tracking-[0.15em] text-white/40 border border-white/[0.06] hover:text-white/60 hover:border-white/[0.1] transition-colors uppercase"
              >
                Orthodontic
              </a>
            </div>
          </div>

          {/* Center - Keyboard Hints */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 text-[9px] font-mono text-white/30 bg-white/[0.04] border border-white/[0.08] rounded">
                1
              </kbd>
              <kbd className="px-2 py-1 text-[9px] font-mono text-white/30 bg-white/[0.04] border border-white/[0.08] rounded">
                2
              </kbd>
              <kbd className="px-2 py-1 text-[9px] font-mono text-white/30 bg-white/[0.04] border border-white/[0.08] rounded">
                3
              </kbd>
              <span className="text-[9px] font-mono text-white/20 ml-2">
                Quick Nav
              </span>
            </div>
          </div>

          {/* Right - Attribution */}
          <div className="flex items-center gap-4">
            <span className="text-[9px] font-mono tracking-[0.2em] text-white/20 uppercase">
              Opkie Design Systems
            </span>
            <div className="h-3 w-px bg-white/10" />
            <span className="text-[9px] font-mono text-white/15">
              © 2026
            </span>
          </div>
        </div>
      </motion.footer>
    </main>
  );
}
