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
    image: "/images/services/implant.jpg",
  },
  {
    title: "Holistic Restorations",
    description:
      "Mercury-free, metal-free dentistry using only the most biocompatible materials for your long-term health and wellness.",
    image: "/images/services/full-mouth-smile.jpg",
  },
  {
    title: "Cosmetic Enhancements",
    description:
      "Subtle, natural improvements that enhance rather than transform. Authentic beauty, refined with precision and artistry.",
    image: "/images/services/full-mouth-shade.jpg",
  },
];

export default function T3ServiceAccordion() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="max-w-5xl mx-auto px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <div className="w-6 h-px bg-brand-primary/30" />
            <p className="text-[10px] uppercase tracking-[0.35em] text-neutral-muted font-medium font-sanctuary">
              Signature Services
            </p>
            <div className="w-6 h-px bg-brand-primary/30" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-sanctuary text-[clamp(1.6rem,4vw,2.8rem)] font-extralight tracking-[0.03em]"
          >
            Thoughtful Care, Exceptional Results
          </motion.h2>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════════
            PREMIUM TYPOGRAPHIC HOVER ACCORDION MATRIX
            Thin dividing lines, smooth height transitions, blurred backdrop reveal
        ═══════════════════════════════════════════════════════════════════════ */}
        <div className="relative">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative border-b border-slate-200/60"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            >
              {/* Blurred Background Image - Revealed on Hover */}
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 overflow-hidden pointer-events-none"
                  >
                    <div className="absolute inset-0">
                      <Image
                        src={service.image}
                        alt=""
                        fill
                        className="object-cover blur-xl scale-110"
                        sizes="100vw"
                      />
                      <div className="absolute inset-0 bg-brand-canvas/90" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Service Row */}
              <div className="relative z-10 py-8 cursor-pointer">
                <motion.div
                  className="flex items-center justify-between gap-8"
                  animate={{
                    x: hoveredIndex === index ? 12 : 0,
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Number */}
                  <motion.span
                    animate={{
                      opacity: hoveredIndex === index ? 1 : 0.35,
                      color: hoveredIndex === index ? "var(--primary-brand)" : "var(--text-main)",
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-sm font-light tracking-[0.15em] w-10 font-sanctuary"
                  >
                    0{index + 1}
                  </motion.span>

                  {/* Title with dynamic typography shift */}
                  <motion.h3
                    animate={{
                      letterSpacing: hoveredIndex === index ? "0.1em" : "0.03em",
                      color: hoveredIndex === index ? "var(--primary-brand)" : "var(--text-main)",
                    }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex-1 text-xl md:text-2xl lg:text-3xl font-extralight font-sanctuary"
                  >
                    {service.title}
                  </motion.h3>

                  {/* Expand/Collapse Icon */}
                  <motion.div
                    animate={{
                      rotate: expandedIndex === index ? 45 : 0,
                      borderColor: hoveredIndex === index ? "var(--primary-brand)" : "rgba(0,0,0,0.1)",
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-10 h-10 rounded-full border flex items-center justify-center transition-colors"
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
                        strokeWidth={1.5}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </motion.div>
                </motion.div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {expandedIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 pb-4 pl-10 pr-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                        {/* Description */}
                        <div>
                          <p className="font-sanctuary text-neutral-muted font-light leading-relaxed tracking-wide mb-6 text-sm">
                            {service.description}
                          </p>
                          <a
                            href="#"
                            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] text-brand-primary font-light hover:gap-4 transition-all duration-300"
                          >
                            <span>Learn more</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </a>
                        </div>

                        {/* Image Preview */}
                        <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-black/[0.03]">
                          <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 400px"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
