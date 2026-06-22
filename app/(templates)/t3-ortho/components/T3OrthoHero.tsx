"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

interface T3OrthoHeroProps {
  practiceName: string;
  cityServed: string;
  phoneGBP: string;
  bookingUrl: string;
}

export default function T3OrthoHero({
  practiceName,
  cityServed,
  phoneGBP,
  bookingUrl,
}: T3OrthoHeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms for floating images
  const leftImageY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const rightImageY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const leftImageOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  const rightImageOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  return (
    <section
      ref={containerRef}
      className="min-h-[85vh] relative flex items-center justify-center overflow-hidden pt-8 pb-20"
    >
      {/* Asymmetric Floating Image Matrix */}

      {/* Left Floating Image - Lower Position */}
      <motion.div
        style={{ y: leftImageY, opacity: leftImageOpacity }}
        className="absolute left-[5%] lg:left-[8%] top-[55%] -translate-y-1/2 w-[140px] md:w-[180px] lg:w-[220px] z-0 hidden md:block"
      >
        <div className="relative aspect-[2/3] border border-brand-primary/10 overflow-hidden">
          <Image
            src="/images/office-interior.jpg"
            alt="Serene orthodontic office interior"
            fill
            className="object-cover"
            sizes="220px"
          />
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-canvas/20 to-transparent" />
        </div>
        {/* Decorative label */}
        <p className="text-[9px] uppercase tracking-[0.4em] text-neutral-muted/60 mt-3 text-center">
          Sanctuary
        </p>
      </motion.div>

      {/* Right Floating Image - Higher Position */}
      <motion.div
        style={{ y: rightImageY, opacity: rightImageOpacity }}
        className="absolute right-[5%] lg:right-[8%] top-[35%] -translate-y-1/2 w-[120px] md:w-[160px] lg:w-[200px] z-0 hidden md:block"
      >
        <div className="relative aspect-[3/4] border border-brand-primary/10 overflow-hidden">
          <Image
            src="/images/team/doctor-portrait.png"
            alt="Your orthodontist"
            fill
            className="object-cover"
            sizes="200px"
          />
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-canvas/10 to-transparent" />
        </div>
        {/* Decorative label */}
        <p className="text-[9px] uppercase tracking-[0.4em] text-neutral-muted/60 mt-3 text-center">
          Expertise
        </p>
      </motion.div>

      {/* Third Accent Image - Bottom Right */}
      <motion.div
        style={{
          y: useTransform(scrollYProgress, [0, 1], [0, 40]),
          opacity: useTransform(scrollYProgress, [0, 0.6], [0.8, 0.2])
        }}
        className="absolute right-[15%] lg:right-[20%] bottom-[10%] w-[100px] md:w-[120px] lg:w-[140px] z-0 hidden lg:block"
      >
        <div className="relative aspect-square border border-brand-primary/10 overflow-hidden">
          <Image
            src="/images/cases/smile-after-ortho.png"
            alt="Beautiful smile result"
            fill
            className="object-cover"
            sizes="140px"
          />
        </div>
      </motion.div>

      {/* Main Content - Centered Editorial Column */}
      <div className="relative z-10 max-w-3xl mx-auto px-8 py-16 text-center">
        {/* Subtle Top Label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[11px] uppercase tracking-[0.4em] text-neutral-muted mb-12"
        >
          {practiceName}
        </motion.p>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-[clamp(2rem,6vw,4.5rem)] font-extralight leading-[1.1] tracking-[0.02em] mb-8"
        >
          <span className="block">Your Perfect Smile,</span>
          <span className="block text-brand-primary tracking-[0.08em]">
            Thoughtfully Designed
          </span>
        </motion.h1>

        {/* Thin Decorative Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-16 h-px bg-brand-primary/30 mx-auto mb-10 origin-center"
        />

        {/* Philosophy Statement */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-lg font-light text-neutral-muted leading-relaxed max-w-2xl mx-auto mb-14 tracking-wide"
        >
          We believe exceptional orthodontic care extends beyond treatment. Our
          patient-centered approach creates a personalized path to your perfect smile
          in {cityServed}.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <a
            href={bookingUrl !== "none" ? bookingUrl : `tel:${phoneGBP.replace(/[^0-9+]/g, "")}`}
            className="group inline-flex items-center gap-4 px-10 py-4 bg-brand-primary text-white text-sm uppercase tracking-[0.25em] font-light hover:bg-brand-primary/90 transition-all duration-500"
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
            className="text-sm tracking-[0.2em] text-neutral-muted hover:text-brand-primary transition-colors duration-500"
          >
            {phoneGBP}
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-transparent via-brand-primary/40 to-brand-primary/20"
        />
      </motion.div>
    </section>
  );
}
