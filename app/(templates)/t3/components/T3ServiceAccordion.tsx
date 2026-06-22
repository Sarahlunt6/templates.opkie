"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Service {
  title: string;
  description: string;
  image: string;
}

const services: Service[] = [
  {
    title: "Invisalign",
    description:
      "Discreet alignment therapy that works with your lifestyle. Clear, comfortable, and precisely planned for optimal results.",
    image: "/images/services/invisalign.jpg",
  },
  {
    title: "Dental Implants",
    description:
      "Biocompatible tooth restoration that honors your body's natural processes. Permanent, lasting, and indistinguishable from natural teeth.",
    image: "/images/services/implants.jpg",
  },
  {
    title: "Holistic Restorations",
    description:
      "Mercury-free, metal-free dentistry using only the most biocompatible materials for your long-term health and wellness.",
    image: "/images/services/restoration.jpg",
  },
  {
    title: "Cosmetic Enhancements",
    description:
      "Subtle, natural improvements that enhance rather than transform. Authentic beauty, refined with precision and artistry.",
    image: "/images/services/veneers.jpg",
  },
];

export default function T3ServiceAccordion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative py-32 overflow-hidden border-t border-neutral-border/30">
      <div className="max-w-5xl mx-auto px-8">
        <p className="text-[11px] uppercase tracking-[0.4em] text-neutral-muted mb-8 text-center">
          Signature Services
        </p>

        <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-extralight text-center mb-16 tracking-[0.05em]">
          Thoughtful Care, Exceptional Results
        </h2>

        {/* Interactive Service Accordion */}
        <div className="relative">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="relative border-b border-brand-primary/10 cursor-pointer overflow-hidden"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            >
              {/* Background Image Reveal on Hover */}
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 z-0"
                  >
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                      sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-brand-canvas/90" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Service Row */}
              <div className="relative z-10 py-8 flex items-center justify-between gap-8">
                {/* Number */}
                <motion.span
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0.4,
                    scale: hoveredIndex === index ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className="text-sm font-light text-brand-primary tracking-wider w-8"
                >
                  0{index + 1}
                </motion.span>

                {/* Title with dynamic typography */}
                <motion.h3
                  animate={{
                    letterSpacing: hoveredIndex === index ? "0.12em" : "0.02em",
                    color: hoveredIndex === index ? "var(--primary-brand)" : "var(--text-main)",
                  }}
                  transition={{ duration: 0.4 }}
                  className="flex-1 text-xl md:text-2xl lg:text-3xl font-extralight"
                >
                  {service.title}
                </motion.h3>

                {/* Expand Icon */}
                <motion.div
                  animate={{
                    rotate: activeIndex === index ? 45 : 0,
                    scale: hoveredIndex === index ? 1.2 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-8 h-8 rounded-full border border-brand-primary/30 flex items-center justify-center"
                >
                  <svg
                    className="w-4 h-4 text-brand-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </motion.div>
              </div>

              {/* Expanded Content */}
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8 pl-12 pr-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                      {/* Description */}
                      <p className="text-neutral-muted font-light leading-relaxed tracking-wide">
                        {service.description}
                      </p>

                      {/* Small Image Preview */}
                      <div className="relative aspect-[16/9] overflow-hidden border border-brand-primary/10">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
