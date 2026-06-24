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
      className="min-h-screen relative flex items-center justify-center overflow-hidden pt-24 pb-32"
    >
      {/* ═══════════════════════════════════════════════════════════════════════
          ASYMMETRIC EDITORIAL LOOKBOOK FRAMEWORK
          Offset floating frames with parallax drift
      ═══════════════════════════════════════════════════════════════════════ */}

      {/* Primary Tall Vertical Frame - Right of Typography */}
      <motion.div
        style={{ y: primaryImageY }}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute right-[8%] lg:right-[12%] top-1/2 -translate-y-1/2 z-0 hidden lg:block"
      >
        <div className="relative aspect-[2/3] w-[280px] xl:w-[320px] rounded-2xl overflow-hidden shadow-sm border border-black/[0.03]">
          <Image
            src="/images/team/doctor-portrait.png"
            alt="Your wellness provider"
            fill
            className="object-cover object-top"
            sizes="320px"
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
          className="mt-4 text-center"
        >
          <p className="text-[9px] uppercase tracking-[0.35em] text-neutral-muted/50 font-light">
            Expertise
          </p>
        </motion.div>
      </motion.div>

      {/* Secondary Narrow Frame - Lower Left */}
      <motion.div
        style={{ y: secondaryImageY }}
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-[6%] lg:left-[10%] bottom-[15%] z-0 hidden md:block"
      >
        <div className="relative aspect-[3/4] w-[180px] lg:w-[220px] rounded-2xl overflow-hidden shadow-sm border border-black/[0.03]">
          <Image
            src="/images/office-interior.jpg"
            alt="Serene sanctuary interior"
            fill
            className="object-cover"
            sizes="220px"
          />
          {/* Soft teal tint overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-teal-50/5 to-transparent" />
        </div>
        {/* Decorative editorial tag */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="mt-4 text-center"
        >
          <p className="text-[9px] uppercase tracking-[0.35em] text-neutral-muted/50 font-light">
            Sanctuary
          </p>
        </motion.div>
      </motion.div>

      {/* Accent Interior Frame - Upper Left */}
      <motion.div
        style={{ y: accentImageY }}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 0.85, y: 0 }}
        transition={{ duration: 1.2, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-[18%] lg:left-[22%] top-[18%] z-0 hidden lg:block"
      >
        <div className="relative aspect-square w-[120px] xl:w-[140px] rounded-xl overflow-hidden shadow-sm border border-black/[0.03]">
          <Image
            src="/images/cases/smile-after.png"
            alt="Natural smile enhancement"
            fill
            className="object-cover"
            sizes="140px"
          />
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════════════════════════════════════
          MAIN TYPOGRAPHY STACK
          Premium geometric sans-serif with light weights
      ═══════════════════════════════════════════════════════════════════════ */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-10 max-w-2xl lg:max-w-3xl mx-auto px-8 py-16 text-center"
      >
        {/* Top Micro-Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-12"
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
          className="font-sanctuary text-[clamp(2.2rem,5.5vw,4rem)] font-extralight leading-[1.08] tracking-[0.02em] mb-10"
        >
          <span className="block">Oral Wellness,</span>
          <span className="block mt-2">
            <span className="text-brand-primary tracking-[0.06em]">Thoughtfully</span>{" "}
            Designed
          </span>
        </motion.h1>

        {/* Thin Decorative Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-12 h-px bg-brand-primary/40 mx-auto mb-10 origin-center"
        />

        {/* Philosophy Statement */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="font-sanctuary text-base lg:text-lg font-light text-neutral-muted leading-relaxed max-w-xl mx-auto mb-14 tracking-wide"
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
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
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
