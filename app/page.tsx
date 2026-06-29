"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// Hook to detect mobile viewport
function useIsMobile(breakpoint = 1024) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < breakpoint);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [breakpoint]);

  return isMobile;
}

// Template data
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

function DesignRegistryContent() {
  const isMobile = useIsMobile();

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);

  useEffect(() => {
    // Trigger entrance animation after mount
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);


  // Calculate flex values based on hover state (desktop only)
  const getFlexValue = (index: number) => {
    if (hoveredIndex === null) return 1;
    if (hoveredIndex === index) return 1.5;
    return 0.75;
  };

  // Handle mobile card tap
  const handleCardTap = (index: number) => {
    if (isMobile) {
      setActiveCardIndex(activeCardIndex === index ? null : index);
    }
  };

  return (
    <main className="min-h-screen lg:h-screen w-screen overflow-x-hidden overflow-y-auto lg:overflow-hidden bg-[#0C0C0C] text-white relative">
      {/* Minimal Header */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.1 }}
        className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-10 py-6 lg:py-8"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="/images/opkie-logo.svg"
              alt="Opkie"
              width={80}
              height={30}
              className="opacity-90 brightness-0 invert lg:w-[100px]"
            />
          </div>

          <span className="text-[10px] lg:text-[11px] tracking-[0.2em] lg:tracking-[0.25em] text-white/30 uppercase font-light hidden sm:block">
            Template Collection
          </span>
        </div>
      </motion.header>

      {/* Desktop: 3-Column Flex Layout */}
      {!isMobile && (
        <div className="h-full w-full flex">
          {templates.map((template, index) => (
            <div
              key={`template-${index}`}
              className="relative h-full border-r border-white/[0.08] last:border-r-0 overflow-hidden cursor-pointer"
              style={{
                flex: getFlexValue(index),
                transition: "flex 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Background Image - Elegant reveal on hover */}
              <div
                className="absolute inset-0"
                style={{
                  opacity: hoveredIndex === index ? 1 : 0,
                  transform: hoveredIndex === index ? "scale(1)" : "scale(1.08)",
                  transition: "opacity 0.8s ease-out, transform 1s ease-out",
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
                  className="text-[28vw] font-extralight text-white/[0.02] leading-none tracking-tight"
                  style={{
                    opacity: hoveredIndex === index ? 0 : 1,
                    transition: "opacity 0.6s ease-out",
                  }}
                >
                  {template.code}
                </span>
              </div>

              {/* Column Content */}
              <div className="relative z-10 h-full flex flex-col justify-between px-10 lg:px-14 py-32">
                {/* Top - Elegant number */}
                <div
                  style={{
                    opacity: isLoaded ? 1 : 0,
                    transform: isLoaded ? "translateY(0)" : "translateY(20px)",
                    transition: `opacity 0.8s ease-out ${0.2 + index * 0.1}s, transform 0.8s ease-out ${0.2 + index * 0.1}s`,
                  }}
                >
                  <span className="text-[13px] tracking-[0.4em] text-white/25 font-light">
                    {template.code}
                  </span>
                </div>

                {/* Center - Title & Description */}
                <div
                  className="flex flex-col gap-5"
                  style={{
                    opacity: isLoaded ? 1 : 0,
                    transform: isLoaded ? "translateY(0)" : "translateY(30px)",
                    transition: `opacity 0.8s ease-out ${0.3 + index * 0.1}s, transform 0.8s ease-out ${0.3 + index * 0.1}s`,
                  }}
                >
                  <h2
                    className="text-[clamp(1.75rem,3.5vw,3rem)] font-light tracking-[-0.015em] leading-[1.15]"
                    style={{
                      opacity: hoveredIndex === null || hoveredIndex === index ? 1 : 0.25,
                      transition: "opacity 0.4s ease-out",
                    }}
                  >
                    {template.title}
                  </h2>
                  <p
                    className="text-[13px] tracking-[0.04em] text-white/45 font-light leading-relaxed max-w-[280px]"
                    style={{
                      opacity: hoveredIndex === null || hoveredIndex === index ? 1 : 0.25,
                      transition: "opacity 0.4s ease-out",
                    }}
                  >
                    {template.description}
                  </p>
                </div>

                {/* Bottom - Clean CTA */}
                <div
                  style={{
                    opacity: isLoaded ? 1 : 0,
                    transform: isLoaded ? "translateY(0)" : "translateY(20px)",
                    transition: `opacity 0.8s ease-out ${0.4 + index * 0.1}s, transform 0.8s ease-out ${0.4 + index * 0.1}s`,
                  }}
                >
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
              <div
                className="absolute inset-0 pointer-events-none border"
                style={{
                  borderColor: hoveredIndex === index ? "rgba(255,255,255,0.06)" : "transparent",
                  transition: "border-color 0.5s ease-out",
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Mobile: Vertical Card Stack */}
      {isMobile && (
        <div className="flex flex-col pt-24 pb-24 px-6 gap-4">
          {templates.map((template, index) => {
            const isActive = activeCardIndex === index;
            return (
              <motion.div
                key={`template-mobile-${index}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: isLoaded ? 1 : 0,
                  y: isLoaded ? 0 : 30,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.1 + index * 0.1,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="relative overflow-hidden rounded-xl border border-white/[0.08] cursor-pointer"
                style={{
                  height: isActive ? "45vh" : "28vh",
                  minHeight: isActive ? "320px" : "180px",
                  transition: "height 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                onClick={() => handleCardTap(index)}
              >
                {/* Background Image - Always visible on mobile */}
                <div className="absolute inset-0">
                  <Image
                    src={template.image}
                    alt={template.title}
                    fill
                    className="object-cover"
                    style={{
                      transform: isActive ? "scale(1)" : "scale(1.05)",
                      transition: "transform 0.8s ease-out",
                    }}
                    sizes="100vw"
                    priority={index === 0}
                  />
                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/50 to-transparent"
                    style={{
                      opacity: isActive ? 0.9 : 0.75,
                      transition: "opacity 0.5s ease-out",
                    }}
                  />
                </div>

                {/* Card Content */}
                <div className="relative z-10 h-full flex flex-col justify-end p-6">
                  {/* Template Number */}
                  <span
                    className="text-[11px] tracking-[0.4em] text-white/40 font-light mb-2"
                    style={{
                      opacity: isActive ? 1 : 0.6,
                      transition: "opacity 0.4s ease-out",
                    }}
                  >
                    {template.code}
                  </span>

                  {/* Title */}
                  <h2 className="text-[clamp(1.5rem,6vw,2rem)] font-light tracking-[-0.01em] leading-[1.15] mb-2">
                    {template.title}
                  </h2>

                  {/* Description - Only show when active */}
                  <p
                    className="text-[13px] tracking-[0.02em] text-white/60 font-light leading-relaxed mb-4 max-w-[320px]"
                    style={{
                      opacity: isActive ? 1 : 0,
                      height: isActive ? "auto" : 0,
                      overflow: "hidden",
                      transition: "opacity 0.4s ease-out",
                    }}
                  >
                    {template.description}
                  </p>

                  {/* CTA - Only show when active */}
                  <div
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? "translateY(0)" : "translateY(10px)",
                      pointerEvents: isActive ? "auto" : "none",
                      transition: "opacity 0.4s ease-out, transform 0.4s ease-out",
                    }}
                  >
                    <Link
                      href={`/${template.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-6 py-3.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg active:bg-white/20 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span className="text-[12px] tracking-[0.12em] text-white font-medium uppercase">
                        View Template
                      </span>
                      <svg
                        className="w-4 h-4 text-white/80"
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
                    </Link>
                  </div>
                </div>

                {/* Tap indicator for inactive cards */}
                {!isActive && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                      <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Minimal Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className={`${isMobile ? "relative" : "fixed bottom-0 left-0 right-0"} z-50 px-6 lg:px-10 py-5 lg:py-6 bg-[#0C0C0C]/80 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-none`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6 lg:gap-8">
            <span className="text-[11px] tracking-[0.2em] font-light text-white/50 uppercase">
              Dental Templates
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <span className="text-[10px] tracking-[0.2em] text-white/20 font-light">
              © 2026
            </span>
            <span className="text-white/10">·</span>
            <span className="text-[10px] tracking-[0.15em] text-white/25 font-light">
              Designed by{" "}
              <a
                href="https://opkie.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white/70 transition-colors"
              >
                Opkie
              </a>
            </span>
          </div>
        </div>
      </motion.footer>
    </main>
  );
}

export default function DesignRegistryPage() {
  return (
    <Suspense fallback={<div className="h-screen w-screen bg-[#0C0C0C]" />}>
      <DesignRegistryContent />
    </Suspense>
  );
}
