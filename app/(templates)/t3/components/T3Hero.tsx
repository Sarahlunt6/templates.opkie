"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import T3SensoryCheckIn from "./T3SensoryCheckIn";

interface T3HeroProps {
  practiceName: string;
  cityServed: string;
  phoneGBP: string;
  bookingUrl: string;
}

interface MediaCardProps {
  imageSrc: string;
  imageAlt: string;
  caption: string;
  aspectRatio?: string;
}

interface VideoCardProps {
  videoSrc: string;
  caption: string;
  aspectRatio?: string;
}

function MediaCard({ imageSrc, imageAlt, caption, aspectRatio = "aspect-[3/4]" }: MediaCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`relative ${aspectRatio} w-full rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl shadow-black/[0.08] border border-black/[0.04]`}>
        <motion.div
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
        </motion.div>
        {/* Subtle warm overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/20 via-transparent to-stone-50/5 pointer-events-none" />
      </div>
      {/* Caption */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="mt-5 text-[10px] uppercase tracking-[0.3em] text-stone-400 font-medium text-center"
      >
        {caption}
      </motion.p>
    </motion.div>
  );
}

function VideoCard({ videoSrc, caption, aspectRatio = "aspect-[3/4]" }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`relative ${aspectRatio} w-full rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl shadow-black/[0.08] border border-black/[0.04]`}>
        <motion.div
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </motion.div>
        {/* Subtle warm overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/20 via-transparent to-stone-50/5 pointer-events-none" />
      </div>
      {/* Caption */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="mt-5 text-[10px] uppercase tracking-[0.3em] text-stone-400 font-medium text-center"
      >
        {caption}
      </motion.p>
    </motion.div>
  );
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

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Parallax transforms
  const leftColumnY = useTransform(smoothProgress, [0, 1], [0, -60]);
  const rightColumnY = useTransform(smoothProgress, [0, 1], [0, 80]);
  const contentOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0.2]);
  const contentY = useTransform(smoothProgress, [0, 1], [0, 50]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] overflow-hidden"
    >
      {/* ═══════════════════════════════════════════════════════════════════════
          AMBIENT LUXURY CANVAS BACKGROUND
          Soft radial gradients with premium texture overlay
      ═══════════════════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 bg-[#FAFAF8]">
        {/* Primary radial gradient - warm center */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(245, 240, 235, 1) 0%, transparent 70%)",
          }}
        />
        {/* Secondary accent gradient - subtle teal wash */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 80% 20%, rgba(15, 90, 83, 0.08) 0%, transparent 60%)",
          }}
        />
        {/* Tertiary warm gradient - bottom left */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: "radial-gradient(ellipse 50% 40% at 20% 80%, rgba(245, 235, 225, 0.8) 0%, transparent 50%)",
          }}
        />
        {/* Premium texture overlay - subtle noise */}
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          THREE-COLUMN GRID LAYOUT
          Asymmetric editorial framework with floating media blocks
      ═══════════════════════════════════════════════════════════════════════ */}
      <div className="relative z-0 max-w-[1400px] mx-auto px-6 lg:px-8 py-16 lg:py-20 min-h-[92vh] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-8 lg:gap-6 xl:gap-10 w-full items-center">

          {/* ═══════════════════════════════════════════════════════════════════
              LEFT COLUMN - Sanctuary Video Card
          ═══════════════════════════════════════════════════════════════════ */}
          <motion.div
            style={{ y: leftColumnY }}
            className="hidden lg:block"
          >
            <VideoCard
              videoSrc="/videos/hero-background.mp4"
              caption="Explore the Sanctuary"
              aspectRatio="aspect-[3/4]"
            />
          </motion.div>

          {/* ═══════════════════════════════════════════════════════════════════
              CENTER COLUMN - Main Typography & Content Stack
          ═══════════════════════════════════════════════════════════════════ */}
          <motion.div
            style={{ opacity: contentOpacity, y: contentY }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center order-first lg:order-none py-8 lg:py-0"
          >
            {/* Top Practice Label */}
            <motion.div variants={itemVariants} className="mb-8">
              <p className="text-[11px] uppercase tracking-[0.25em] text-stone-500 font-semibold">
                {practiceName}
              </p>
            </motion.div>

            {/* Main Headline - Premium Display Typography with Editorial Accent */}
            <motion.h1
              variants={itemVariants}
              className="font-sanctuary text-[clamp(2rem,5vw,3.5rem)] font-extralight leading-[1.1] tracking-tight mb-8"
            >
              <span className="block text-stone-800">The </span>
              <span className="block mt-1">
                <span className="italic font-serif text-[#0f5a53] tracking-[0.02em]">Sanctuary</span>{" "}
                <span className="text-stone-800">Experience</span>
              </span>
            </motion.h1>

            {/* Thin Decorative Line */}
            <motion.div
              variants={itemVariants}
              className="w-16 h-px bg-gradient-to-r from-transparent via-[#0f5a53]/50 to-transparent mx-auto mb-8"
            />

            {/* Editorial Body Copy */}
            <motion.p
              variants={itemVariants}
              className="text-stone-600 max-w-lg mx-auto leading-relaxed text-sm lg:text-base mb-10 font-light"
            >
              Unhurried 90-minute appointments. Sedation options available. Care built around your comfort.
              Customize every detail of your visit before you arrive.
            </motion.p>

            {/* ═══════════════════════════════════════════════════════════════════
                SIGNATURE ELEMENT - Sensory Check-In (Thesis of the Page)
            ═══════════════════════════════════════════════════════════════════ */}
            <motion.div
              variants={itemVariants}
              className="mb-8"
            >
              <T3SensoryCheckIn
                onComplete={(selections) => {
                  console.log("Patient comfort preferences:", selections);
                  // In production, send to backend or store in state
                }}
              />
            </motion.div>

            {/* Secondary Action & Contact */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
            >
              {/* Direct Phone Link */}
              <a
                href={`tel:${phoneGBP.replace(/[^0-9+]/g, "")}`}
                className="group inline-flex items-center gap-3 text-[12px] tracking-[0.15em] text-stone-500 hover:text-[#0f5a53] transition-colors duration-500 font-medium"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>Call {phoneGBP}</span>
              </a>

              {/* Divider */}
              <div className="hidden sm:block w-px h-6 bg-stone-300" />

              {/* Or Book Directly */}
              <a
                href={bookingUrl !== "none" ? bookingUrl : `tel:${phoneGBP.replace(/[^0-9+]/g, "")}`}
                className="text-[12px] tracking-[0.12em] text-stone-500 hover:text-[#0f5a53] transition-colors duration-500 font-medium"
              >
                Book without customizing
              </a>
            </motion.div>

            {/* Trust Message Below */}
            <motion.p
              variants={itemVariants}
              className="text-xs text-stone-400 mt-8 max-w-md mx-auto leading-relaxed"
            >
              Serving {cityServed} • Most insurance accepted • Same-week appointments available
            </motion.p>
          </motion.div>

          {/* ═══════════════════════════════════════════════════════════════════
              RIGHT COLUMN - Doctor Portrait Media Card
          ═══════════════════════════════════════════════════════════════════ */}
          <motion.div
            style={{ y: rightColumnY }}
            className="hidden lg:block"
          >
            <MediaCard
              imageSrc="/images/team/doctor-portrait.png"
              imageAlt="Dr. Michael Roberts, Lead Dentist"
              caption="Meet Dr. Michael Roberts"
              aspectRatio="aspect-[3/4]"
            />
          </motion.div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          MOBILE MEDIA CARDS - Horizontal Scroll
          Only visible on mobile/tablet viewports
      ═══════════════════════════════════════════════════════════════════════ */}
      <div className="lg:hidden px-6 pb-12">
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-6 px-6">
          <div className="flex-shrink-0 w-[260px] snap-center">
            <VideoCard
              videoSrc="/videos/hero-background.mp4"
              caption="Explore the Sanctuary"
              aspectRatio="aspect-[4/5]"
            />
          </div>
          <div className="flex-shrink-0 w-[260px] snap-center">
            <MediaCard
              imageSrc="/images/team/doctor-portrait.png"
              imageAlt="Dr. Michael Roberts, Lead Dentist"
              caption="Meet Dr. Michael Roberts"
              aspectRatio="aspect-[4/5]"
            />
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          SCROLL INDICATOR - Elegant Minimal Design
      ═══════════════════════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          <div className="w-px h-12 bg-gradient-to-b from-[#0f5a53]/40 via-[#0f5a53]/20 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
