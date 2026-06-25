"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import Link from "next/link";

// Template data - clean, minimal metadata
const templates = [
  {
    id: "t1",
    code: "01",
    title: "The Prestige Leader",
    description: "Elite Cosmetic & Reconstructive Practices",
    image: "/images/team/staff-photo.jpg",
  },
  {
    id: "t2",
    code: "02",
    title: "The Clinical Innovator",
    description: "Technology-Forward Modern Practices",
    image: "/images/office-interior.jpg",
  },
  {
    id: "t3",
    code: "03",
    title: "The Spatial Sanctuary",
    description: "Boutique Wellness & Comfort-Focused",
    image: "/images/office-exterior.jpg",
  },
];

export default function DesignRegistryPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const columnsRef = useRef<(HTMLDivElement | null)[]>([]);
  const titlesRef = useRef<(HTMLDivElement | null)[]>([]);

  // Initial page load animation
  useEffect(() => {
    // Stagger animate titles on load
    if (titlesRef.current.length > 0) {
      gsap.fromTo(
        titlesRef.current.filter(Boolean),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.3,
        }
      );
    }
  }, []);

  // Handle column flex expansion on hover
  useEffect(() => {
    columnsRef.current.forEach((col, index) => {
      if (!col) return;

      if (hoveredIndex === null) {
        gsap.to(col, {
          flex: 1,
          duration: 0.7,
          ease: "power3.out",
        });
      } else if (hoveredIndex === index) {
        gsap.to(col, {
          flex: 1.6,
          duration: 0.7,
          ease: "power3.out",
        });
      } else {
        gsap.to(col, {
          flex: 0.7,
          duration: 0.7,
          ease: "power3.out",
        });
      }
    });
  }, [hoveredIndex]);

  return (
    <main className="h-screen w-screen overflow-hidden bg-[#0C0C0C] text-white relative">
      {/* Minimal Header */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.1 }}
        className="fixed top-0 left-0 right-0 z-50 px-10 py-8"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-7 h-7 border border-white/20 flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-white/70" />
            </div>
            <span className="text-[11px] tracking-[0.3em] text-white/50 uppercase font-light">
              Opkie Design Systems
            </span>
          </div>

          <span className="text-[11px] tracking-[0.25em] text-white/30 uppercase font-light">
            Template Collection
          </span>
        </div>
      </motion.header>

      {/* 3-Column Flex Layout */}
      <div className="h-full w-full flex">
        {templates.map((template, index) => (
          <div
            key={template.id}
            ref={(el) => { columnsRef.current[index] = el; }}
            className="relative h-full border-r border-white/[0.08] last:border-r-0 overflow-hidden cursor-pointer group"
            style={{ flex: 1 }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Background Image - Elegant reveal on hover */}
            <div
              className="absolute inset-0 transition-all duration-1000 ease-out"
              style={{
                opacity: hoveredIndex === index ? 1 : 0,
                transform: hoveredIndex === index ? "scale(1)" : "scale(1.05)",
              }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${template.image})` }}
              />
              {/* Soft gradient overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/60 to-[#0C0C0C]/40" />
            </div>

            {/* Subtle background number */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
              <span
                className="text-[28vw] font-extralight text-white/[0.02] leading-none tracking-tight transition-opacity duration-700"
                style={{ opacity: hoveredIndex === index ? 0 : 1 }}
              >
                {template.code}
              </span>
            </div>

            {/* Column Content */}
            <div className="relative z-10 h-full flex flex-col justify-between px-10 lg:px-14 py-32">
              {/* Top - Elegant number */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <span className="text-[13px] tracking-[0.4em] text-white/25 font-light">
                  {template.code}
                </span>
              </motion.div>

              {/* Center - Title & Description */}
              <div
                ref={(el) => { titlesRef.current[index] = el; }}
                className="flex flex-col gap-5"
              >
                <h2
                  className="text-[clamp(1.75rem,3.5vw,3rem)] font-light tracking-[-0.015em] leading-[1.15] transition-all duration-500"
                  style={{
                    opacity: hoveredIndex === null || hoveredIndex === index ? 1 : 0.25,
                  }}
                >
                  {template.title}
                </h2>
                <p
                  className="text-[13px] tracking-[0.04em] text-white/45 font-light leading-relaxed max-w-[280px] transition-all duration-500"
                  style={{
                    opacity: hoveredIndex === null || hoveredIndex === index ? 1 : 0.25,
                  }}
                >
                  {template.description}
                </p>
              </div>

              {/* Bottom - Clean CTA */}
              <div>
                <Link
                  href={`/${template.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/cta inline-flex items-center gap-3"
                >
                  <span className="relative text-[12px] tracking-[0.15em] text-white/60 font-light transition-colors duration-300 group-hover/cta:text-white">
                    Explore Template
                    {/* Minimal underline animation */}
                    <span className="absolute -bottom-1 left-0 w-full h-px bg-white/20">
                      <span className="absolute inset-0 bg-white/70 origin-left scale-x-0 group-hover/cta:scale-x-100 transition-transform duration-500 ease-out" />
                    </span>
                  </span>
                  <svg
                    className="w-4 h-4 text-white/40 group-hover/cta:text-white/80 group-hover/cta:translate-x-1 transition-all duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Subtle hover border glow */}
            <motion.div
              className="absolute inset-0 pointer-events-none border border-white/0 transition-colors duration-700"
              style={{
                borderColor: hoveredIndex === index ? "rgba(255,255,255,0.06)" : "transparent",
              }}
            />
          </div>
        ))}
      </div>

      {/* Minimal Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="fixed bottom-0 left-0 right-0 z-50 px-10 py-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="text-[11px] tracking-[0.2em] text-white/50 font-light hover:text-white/80 transition-colors uppercase"
            >
              Dental
            </Link>
            <Link
              href="/?type=ortho"
              className="text-[11px] tracking-[0.2em] text-white/30 font-light hover:text-white/60 transition-colors uppercase"
            >
              Orthodontic
            </Link>
          </div>

          <span className="text-[10px] tracking-[0.2em] text-white/20 font-light">
            © 2026 Opkie
          </span>
        </div>
      </motion.footer>
    </main>
  );
}
