"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { clientMasterData } from "@/data/master";
import { MagneticElement } from "@/components/premium";

interface T2CinematicHeroProps {
  videoSrc?: string;
  posterSrc?: string;
  headline?: {
    line1: string;
    line2: string;
    accent: string;
  };
  subheadline?: string;
  isMobile?: boolean;
}

export default function T2CinematicHero({
  videoSrc = "/videos/hero-ambient.mp4",
  posterSrc = "/images/team/staff-photo.jpg",
  headline = {
    line1: "Same-Day Crowns.",
    line2: "3D-Guided Implants.",
    accent: "Zero Guesswork.",
  },
  subheadline = "Our CEREC system mills your permanent crown while you wait. Our CBCT scanner plans your implant to the tenth of a millimeter. This is dentistry without second appointments.",
  isMobile = false,
}: T2CinematicHeroProps) {
  const location = clientMasterData.locations[0];
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  // Scroll-based parallax
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
  const videoScale = useTransform(smoothProgress, [0, 1], [1, 1.15]);
  const videoOpacity = useTransform(smoothProgress, [0, 0.5, 1], [1, 0.8, 0.3]);
  const contentY = useTransform(smoothProgress, [0, 1], [0, 100]);
  const overlayOpacity = useTransform(smoothProgress, [0, 0.5], [0.5, 0.85]);

  // Video loading handlers
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        setVideoError(true);
      });
    }
  }, []);

  // Stagger animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const lineVariants = {
    hidden: { scaleX: 0, originX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.8,
      },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-[var(--t2-bg-primary)]"
    >
      {/* ══════════════════════════════════════════════════════════════════
          LAYER 0: Video Background with Parallax Zoom
      ══════════════════════════════════════════════════════════════════ */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ scale: isMobile ? 1 : videoScale, opacity: videoOpacity }}
      >
        {/* Video Element */}
        {!videoError ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            webkit-playsinline="true"
            onLoadedData={() => setVideoLoaded(true)}
            onError={() => setVideoError(true)}
            poster={posterSrc}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              videoLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : null}

        {/* Fallback Image (always rendered for poster/loading) */}
        <Image
          src={posterSrc}
          alt="Practice environment"
          fill
          className={`object-cover transition-opacity duration-1000 ${
            videoLoaded && !videoError ? "opacity-0" : "opacity-100"
          }`}
          sizes="100vw"
          priority
        />

        {/* Cinematic Gradient Overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--t2-gradient-cinematic)" }}
        />

        {/* Vignette Effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "var(--t2-gradient-vignette)",
            opacity: overlayOpacity,
          }}
        />

        {/* Subtle Film Grain Texture */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </motion.div>

      {/* ══════════════════════════════════════════════════════════════════
          LAYER 1: Ambient Glow Elements
      ══════════════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        {/* Primary Brand Glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute w-[600px] h-[600px] rounded-full animate-t2-glow-pulse"
          style={{
            background: `radial-gradient(circle, var(--t2-glow-primary) 0%, transparent 70%)`,
            top: "10%",
            left: "5%",
            filter: "blur(100px)",
          }}
        />

        {/* Accent Glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
          className="absolute w-[500px] h-[500px] rounded-full animate-drift-reverse"
          style={{
            background: `radial-gradient(circle, var(--t2-glow-accent) 0%, transparent 70%)`,
            top: "30%",
            right: "-10%",
            filter: "blur(120px)",
          }}
        />
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          LAYER 2: Corner UI Tags
      ══════════════════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute top-8 left-8 z-30 flex items-center gap-3"
      >
        <div className="w-[2px] h-4 bg-brand-primary/60" />
        <span className="text-t2-micro text-[var(--t2-text-muted)] uppercase">
          Advanced Dentistry
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="absolute top-8 right-8 z-30 flex items-center gap-3"
      >
        <span className="text-t2-micro text-[var(--t2-text-muted)] uppercase">
          {location.cityServed}
        </span>
        <div className="w-1 h-1 bg-white/20 rotate-45" />
        <span className="text-t2-micro text-brand-primary/70 uppercase">
          Now Accepting
        </span>
      </motion.div>

      {/* ══════════════════════════════════════════════════════════════════
          LAYER 3: Architectural Grid Elements
      ══════════════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-10 pointer-events-none hidden lg:block">
        {/* Corner Frames */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="absolute top-16 left-16 w-24 h-24 border-l border-t border-white/[0.04]" />
          <div className="absolute top-16 right-16 w-24 h-24 border-r border-t border-white/[0.04]" />
          <div className="absolute bottom-32 left-16 w-24 h-24 border-l border-b border-white/[0.04]" />
          <div className="absolute bottom-32 right-16 w-24 h-24 border-r border-b border-white/[0.04]" />

          {/* Crosshair Markers */}
          <span className="absolute top-16 left-16 -translate-x-1/2 -translate-y-1/2 text-white/15 text-xs select-none">
            +
          </span>
          <span className="absolute top-16 right-16 translate-x-1/2 -translate-y-1/2 text-white/15 text-xs select-none">
            +
          </span>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          LAYER 4: Main Content
      ══════════════════════════════════════════════════════════════════ */}
      <motion.div
        style={{ y: isMobile ? 0 : contentY }}
        className="min-h-screen relative z-20 px-6 md:px-12 lg:px-16 py-32 lg:py-24"
      >
        <div className="max-w-7xl mx-auto h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center w-full">
            {/* Left Column - Typography Stack */}
            <motion.div
              className="lg:col-span-7 relative z-20"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {/* Category Label */}
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-3 mb-8"
              >
                <div className="w-2 h-2 bg-brand-primary/80 rotate-45" />
                <span className="text-t2-micro text-[var(--t2-text-muted)] uppercase">
                  Precision Digital Dentistry
                </span>
              </motion.div>

              {/* Main Headline - Cinematic Typography */}
              <div className="mb-8">
                <motion.span
                  variants={itemVariants}
                  className="block text-t2-hero font-t2-display text-[var(--t2-text-primary)]"
                >
                  {headline.line1}
                </motion.span>
                <motion.span
                  variants={itemVariants}
                  className="block text-t2-hero font-t2-display text-[var(--t2-text-primary)]"
                >
                  {headline.line2}
                </motion.span>
                <motion.span
                  variants={itemVariants}
                  className="block text-t2-hero font-t2-display text-brand-primary"
                >
                  {headline.accent}
                </motion.span>
              </div>

              {/* Animated Accent Line */}
              <motion.div
                variants={lineVariants}
                className="w-24 h-[2px] bg-gradient-to-r from-brand-primary to-brand-primary/30 mb-8"
              />

              {/* Subheadline */}
              <motion.p
                variants={itemVariants}
                className="text-t2-body-lg font-t2-body text-[var(--t2-text-secondary)] max-w-md mb-10 leading-relaxed"
              >
                {subheadline}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-4"
              >
                <MagneticElement strength={isMobile ? 0 : 0.15}>
                  <a
                    href={
                      clientMasterData.onlineBookingUrl !== "none"
                        ? clientMasterData.onlineBookingUrl
                        : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`
                    }
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-brand-primary text-white font-semibold text-sm uppercase tracking-[0.15em] rounded-xl border border-brand-primary hover:bg-brand-primary/90 hover:shadow-lg hover:shadow-brand-primary/25 transition-all duration-300 active:scale-[0.98] min-h-[52px]"
                  >
                    <span>Schedule Consultation</span>
                    <svg
                      className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                </MagneticElement>

                <MagneticElement strength={isMobile ? 0 : 0.15}>
                  <a
                    href={`tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-transparent text-white font-semibold text-sm uppercase tracking-[0.15em] rounded-xl border border-white/15 hover:bg-white/[0.03] hover:backdrop-blur-md hover:border-white/25 transition-all duration-300 active:scale-[0.98] min-h-[52px]"
                  >
                    <span>{location.phoneGBP}</span>
                  </a>
                </MagneticElement>
              </motion.div>
            </motion.div>

            {/* Right Column - Team Photo Panel */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 relative hidden lg:block"
            >
              <div className="relative lg:-ml-12">
                {/* Team Photo Container */}
                <div className="relative aspect-[4/3] max-w-lg ml-auto rounded-2xl border border-white/[0.05] bg-zinc-900/40 overflow-hidden shadow-2xl">
                  <Image
                    src="/images/team-ortho.jpeg"
                    alt={`The team at ${clientMasterData.globalPracticeName}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 500px"
                    priority
                  />

                  {/* Subtle bottom gradient */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-zinc-950/50 to-transparent" />

                  {/* Corner architectural frames */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-l border-t border-white/[0.08]" />
                  <div className="absolute top-4 right-4 w-8 h-8 border-r border-t border-white/[0.08]" />
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-l border-b border-white/[0.08]" />
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-r border-b border-white/[0.08]" />

                  {/* Team badge */}
                  <div className="absolute bottom-5 left-5 right-5 z-10">
                    <div className="backdrop-blur-xl bg-zinc-950/60 border border-white/[0.08] rounded-xl px-5 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-t2-micro text-white/70 uppercase">
                          Our Team
                        </span>
                      </div>
                      <span className="text-t2-micro text-white/40">
                        Now Accepting Patients
                      </span>
                    </div>
                  </div>
                </div>

                {/* Decorative offset frame */}
                <div className="absolute -top-3 -right-3 w-full h-full rounded-2xl border border-white/[0.03] -z-10" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ══════════════════════════════════════════════════════════════════
          LAYER 5: Metrics Bar
      ══════════════════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-0 left-0 right-0 z-30 border-t border-white/[0.04] bg-[var(--t2-bg-primary)]/80 backdrop-blur-xl"
      >
        <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.04]">
            {[
              { value: "4.9", label: "Google (287 reviews)" },
              { value: "Same-Day", label: "CEREC Crowns" },
              { value: "0.1mm", label: "CBCT Precision" },
              { value: "2,400+", label: "Implants Placed" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                className="group relative py-6 px-6 md:px-8 hover:bg-white/[0.02] transition-all duration-300 cursor-default"
              >
                {/* Top border highlight rule */}
                <div className="absolute top-0 left-6 right-6 md:left-8 md:right-8 h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent group-hover:via-brand-primary/20 transition-all duration-300" />

                {/* Metric content */}
                <div className="border-t border-white/[0.05] pt-4">
                  <span className="block text-2xl md:text-3xl font-semibold text-brand-primary tracking-tight mb-1">
                    {stat.value}
                  </span>
                  <span className="block text-t2-micro text-white/40 uppercase">
                    {stat.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center gap-2"
      >
        <span className="text-t2-micro text-white/30 uppercase tracking-widest">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-8 bg-gradient-to-b from-white/30 to-transparent"
        />
      </motion.div>
    </section>
  );
}
