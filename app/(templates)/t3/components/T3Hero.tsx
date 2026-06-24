"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

interface T3HeroProps {
  practiceName: string;
  cityServed: string;
  phoneGBP: string;
  bookingUrl: string;
}

export default function T3Hero({
  practiceName,
  cityServed,
  phoneGBP,
  bookingUrl,
}: T3HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms for editorial lookbook frames
  const primaryImageY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const secondaryImageY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const accentImageY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0.3]);

  return (
    <section
      ref={containerRef}
      className="min-h-[85vh] relative flex items-center justify-center overflow-hidden pt-20 pb-16"
    >
      {/* ═══════════════════════════════════════════════════════════════════════
          SAFE EDITORIAL IMAGE FRAMEWORK
          Images positioned far from text to ensure absolute legibility
          All imagery constrained to side margins with safe clearance
      ═══════════════════════════════════════════════════════════════════════ */}

      {/* Primary Tall Vertical Frame - Far Right Edge Only */}
      <motion.div
        style={{ y: primaryImageY }}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute right-4 lg:right-8 xl:right-12 top-1/2 -translate-y-1/2 z-0 hidden xl:block"
      >
        <div className="relative aspect-[2/3] w-[200px] xl:w-[240px] rounded-2xl overflow-hidden shadow-sm border border-black/[0.03]">
          <Image
            src="/images/team/doctor-portrait.png"
            alt="Your wellness provider"
            fill
            className="object-cover object-top"
            sizes="240px"
            priority
          />
          {/* Subtle cream overlay for warmth */}
          <div className="absolute inset-0 bg-gradient-to-t from-amber-50/10 via-transparent to-transparent" />
        </div>
        {/* Decorative editorial tag */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-3 text-center"
        >
          <p className="text-[9px] uppercase tracking-[0.35em] text-neutral-muted/50 font-light">
            Expertise
          </p>
        </motion.div>
      </motion.div>

      {/* Secondary Narrow Frame - Far Left Edge Only */}
      <motion.div
        style={{ y: secondaryImageY }}
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-4 lg:left-8 xl:left-12 bottom-[20%] z-0 hidden xl:block"
      >
        <div className="relative aspect-[3/4] w-[160px] xl:w-[180px] rounded-2xl overflow-hidden shadow-sm border border-black/[0.03]">
          <Image
            src="/images/office-interior.jpg"
            alt="Serene sanctuary interior"
            fill
            className="object-cover"
            sizes="180px"
          />
          {/* Soft teal tint overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-teal-50/5 to-transparent" />
        </div>
        {/* Decorative editorial tag */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="mt-3 text-center"
        >
          <p className="text-[9px] uppercase tracking-[0.35em] text-neutral-muted/50 font-light">
            Sanctuary
          </p>
        </motion.div>
      </motion.div>

      {/* REMOVED: Upper-left accent image that was overlapping with headline text */}

      {/* ═══════════════════════════════════════════════════════════════════════
          MAIN TYPOGRAPHY STACK
          Premium geometric sans-serif with light weights
          Tight compositional balance with controlled spacing
      ═══════════════════════════════════════════════════════════════════════ */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-10 max-w-2xl lg:max-w-3xl mx-auto px-8 py-8 text-center"
      >
        {/* Top Micro-Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <div className="w-8 h-px bg-brand-primary/30" />
          <p className="text-[10px] uppercase tracking-[0.35em] text-neutral-muted font-medium font-sanctuary">
            {practiceName}
          </p>
          <div className="w-8 h-px bg-brand-primary/30" />
        </motion.div>

        {/* Main Headline - font-sanctuary with light weights */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-sanctuary text-[clamp(2.2rem,5.5vw,4rem)] font-extralight leading-[1.08] tracking-[0.02em] mb-6"
        >
          <span className="block">Oral Wellness,</span>
          <span className="block mt-1">
            <span className="text-brand-primary tracking-[0.06em]">Thoughtfully</span>{" "}
            Designed
          </span>
        </motion.h1>

        {/* Thin Decorative Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-12 h-px bg-brand-primary/40 mx-auto mb-6 origin-center"
        />

        {/* Philosophy Statement */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="font-sanctuary text-base lg:text-lg font-light text-neutral-muted leading-relaxed max-w-xl mx-auto mb-8 tracking-wide"
        >
          We believe exceptional dental care extends beyond treatment. Our
          holistic approach considers your complete wellbeing, creating a
          personalized path to lasting oral health in {cityServed}.
        </motion.p>

        {/* CTAs with refined styling */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <a
            href={bookingUrl !== "none" ? bookingUrl : `tel:${phoneGBP.replace(/[^0-9+]/g, "")}`}
            className="group inline-flex items-center gap-4 px-10 py-4 bg-brand-primary text-white text-[11px] uppercase tracking-[0.2em] font-light rounded-sm hover:bg-brand-primary/90 transition-all duration-500"
          >
            <span>Schedule</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
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
          </a>
          <a
            href={`tel:${phoneGBP.replace(/[^0-9+]/g, "")}`}
            className="text-[11px] tracking-[0.15em] text-neutral-muted hover:text-brand-primary transition-colors duration-500 font-light"
          >
            {phoneGBP}
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <p className="text-[8px] uppercase tracking-[0.4em] text-neutral-muted/40 font-light">
            Scroll
          </p>
          <div className="w-px h-10 bg-gradient-to-b from-brand-primary/30 via-brand-primary/20 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
