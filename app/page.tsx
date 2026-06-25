"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// Dental template data
const dentalTemplates = [
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

// Orthodontic template data
const orthoTemplates = [
  {
    id: "o1",
    code: "01",
    title: "The Smile Architect",
    description: "Premium Orthodontic & Invisalign Practices",
    image: "/images/team/staff-photo.jpg",
  },
  {
    id: "o2",
    code: "02",
    title: "The Digital Aligner",
    description: "Tech-Forward Clear Aligner Specialists",
    image: "/images/office-interior.jpg",
  },
  {
    id: "o3",
    code: "03",
    title: "The Family Practice",
    description: "Warm & Welcoming Orthodontic Care",
    image: "/images/office-exterior.jpg",
  },
];

function DesignRegistryContent() {
  const searchParams = useSearchParams();
  const isOrtho = searchParams.get("type") === "ortho";
  const templates = isOrtho ? orthoTemplates : dentalTemplates;

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger entrance animation after mount
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Reset loaded state when switching template types
  useEffect(() => {
    setIsLoaded(false);
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, [isOrtho]);

  // Calculate flex values based on hover state
  const getFlexValue = (index: number) => {
    if (hoveredIndex === null) return 1;
    if (hoveredIndex === index) return 1.5;
    return 0.75;
  };

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
            <Image
              src="/images/opkie-logo.svg"
              alt="Opkie"
              width={100}
              height={37}
              className="opacity-90 brightness-0 invert"
            />
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
            key={`${isOrtho ? 'ortho' : 'dental'}-${index}`}
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
              className={`text-[11px] tracking-[0.2em] font-light transition-colors uppercase ${
                !isOrtho ? "text-white/50 hover:text-white/80" : "text-white/30 hover:text-white/60"
              }`}
            >
              Dental
            </Link>
            <Link
              href="/?type=ortho"
              className={`text-[11px] tracking-[0.2em] font-light transition-colors uppercase ${
                isOrtho ? "text-white/50 hover:text-white/80" : "text-white/30 hover:text-white/60"
              }`}
            >
              Orthodontic
            </Link>
          </div>

          <div className="flex items-center gap-3">
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
