"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface TreatmentPhase {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  image: string;
  details: string[];
}

interface T2TreatmentDashboardProps {
  phases: TreatmentPhase[];
}

/**
 * T2 Treatment Dashboard Component
 *
 * Interactive medical software-style dashboard for treatment phases.
 * Features:
 * - Rapid horizontal slide transitions with clipping masks
 * - Tab-based navigation with crisp snap animations
 * - Progress indicators and status badges
 * - Hardware-accelerated transforms
 * - Respects prefers-reduced-motion
 */
export default function T2TreatmentDashboard({ phases }: T2TreatmentDashboardProps) {
  const [activePhase, setActivePhase] = useState(0);
  const [direction, setDirection] = useState(1);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const handlePhaseChange = (index: number) => {
    setDirection(index > activePhase ? 1 : -1);
    setActivePhase(index);
  };

  // Slide animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
      scale: 0.98,
    }),
  };

  const currentPhase = phases[activePhase];

  return (
    <section className="py-24 px-6 md:px-12 relative overflow-hidden bg-zinc-950">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-12">
          <span className="text-[11px] tracking-[0.3em] text-brand-primary uppercase font-medium">
            Treatment Protocol
          </span>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mt-4 mb-3">
            Digital Treatment Blueprint
          </h2>
          <p className="text-base text-white/50 max-w-2xl">
            Experience our precision-guided treatment workflow. Each phase is mapped, tracked, and optimized for superior outcomes.
          </p>
        </div>

        {/* Dashboard Container */}
        <div className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.08] rounded-2xl overflow-hidden">
          {/* Phase Navigation Tabs */}
          <div className="flex items-center gap-2 p-4 border-b border-white/[0.05] overflow-x-auto scrollbar-hide">
            {phases.map((phase, index) => (
              <motion.button
                key={phase.id}
                onClick={() => handlePhaseChange(index)}
                className={`relative flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 whitespace-nowrap ${
                  activePhase === index
                    ? "bg-brand-primary/20 border border-brand-primary/30"
                    : "bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1]"
                }`}
                whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              >
                {/* Phase number badge */}
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                    activePhase === index
                      ? "bg-brand-primary text-white"
                      : "bg-white/5 text-white/40"
                  }`}
                >
                  {index + 1}
                </div>

                {/* Phase title */}
                <span
                  className={`text-sm font-medium ${
                    activePhase === index ? "text-white" : "text-white/60"
                  }`}
                >
                  {phase.title}
                </span>

                {/* Active indicator */}
                {activePhase === index && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-primary"
                    layoutId="activeTab"
                    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Content Area with Slide Animation */}
          <div className="relative overflow-hidden min-h-[500px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activePhase}
                custom={direction}
                variants={prefersReducedMotion ? {} : slideVariants}
                initial={prefersReducedMotion ? false : "enter"}
                animate="center"
                exit={prefersReducedMotion ? false : "exit"}
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.2 },
                }}
                className="p-8 md:p-12"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                  {/* Left Column - Image/Diagram */}
                  <div className="lg:col-span-5">
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/[0.08]">
                      <Image
                        src={currentPhase.image}
                        alt={currentPhase.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                      />
                      {/* Corner frames */}
                      <div className="absolute top-3 left-3 w-6 h-6 border-l border-t border-brand-primary/30" />
                      <div className="absolute top-3 right-3 w-6 h-6 border-r border-t border-brand-primary/30" />
                      <div className="absolute bottom-3 left-3 w-6 h-6 border-l border-b border-brand-primary/30" />
                      <div className="absolute bottom-3 right-3 w-6 h-6 border-r border-b border-brand-primary/30" />

                      {/* Status badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <div className="backdrop-blur-xl bg-white/[0.08] border border-white/[0.1] rounded-full px-3 py-1.5 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
                          <span className="text-[10px] tracking-[0.15em] text-white/80 uppercase font-medium">
                            Phase {activePhase + 1}/{phases.length}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Duration indicator */}
                    <div className="mt-6 flex items-center gap-4 px-4 py-3 bg-white/[0.02] border border-white/[0.05] rounded-xl">
                      <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="text-xs text-white/40 uppercase tracking-wider">Duration</p>
                        <p className="text-sm text-white/80 font-medium">{currentPhase.duration}</p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Details */}
                  <div className="lg:col-span-7">
                    {/* Subtitle */}
                    <p className="text-xs tracking-[0.2em] text-brand-primary uppercase font-medium mb-3">
                      {currentPhase.subtitle}
                    </p>

                    {/* Title */}
                    <h3 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
                      {currentPhase.title}
                    </h3>

                    {/* Description */}
                    <p className="text-base text-white/60 leading-relaxed mb-8">
                      {currentPhase.description}
                    </p>

                    {/* Details List */}
                    <div className="space-y-3">
                      {currentPhase.details.map((detail, index) => (
                        <motion.div
                          key={index}
                          initial={prefersReducedMotion ? false : { opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-start gap-4 p-4 bg-white/[0.02] border border-white/[0.05] rounded-xl hover:border-brand-primary/30 transition-colors"
                        >
                          <div className="w-5 h-5 rounded-full bg-brand-primary/20 border border-brand-primary/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg className="w-3 h-3 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <p className="text-sm text-white/70 leading-relaxed">{detail}</p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Action button */}
                    <motion.button
                      className="mt-8 inline-flex items-center gap-3 px-6 py-3 bg-brand-primary/10 border border-brand-primary/30 rounded-xl text-brand-primary font-medium text-sm uppercase tracking-[0.15em] hover:bg-brand-primary/20 transition-colors"
                      whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                      whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                    >
                      <span>View Full Protocol</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress Bar */}
          <div className="px-4 pb-4">
            <div className="h-1 bg-white/[0.05] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-brand-primary to-emerald-400"
                initial={{ width: "0%" }}
                animate={{ width: `${((activePhase + 1) / phases.length) * 100}%` }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              />
            </div>
          </div>
        </div>

        {/* Navigation arrows */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <motion.button
            onClick={() => handlePhaseChange(Math.max(0, activePhase - 1))}
            disabled={activePhase === 0}
            className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:border-brand-primary/50 transition-colors"
            whileHover={prefersReducedMotion || activePhase === 0 ? {} : { scale: 1.1 }}
            whileTap={prefersReducedMotion || activePhase === 0 ? {} : { scale: 0.95 }}
          >
            <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          <span className="text-sm text-white/40">
            {activePhase + 1} / {phases.length}
          </span>

          <motion.button
            onClick={() => handlePhaseChange(Math.min(phases.length - 1, activePhase + 1))}
            disabled={activePhase === phases.length - 1}
            className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:border-brand-primary/50 transition-colors"
            whileHover={prefersReducedMotion || activePhase === phases.length - 1 ? {} : { scale: 1.1 }}
            whileTap={prefersReducedMotion || activePhase === phases.length - 1 ? {} : { scale: 0.95 }}
          >
            <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
