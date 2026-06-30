"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { clientMasterData, sampleReviews } from "@/data/master";
import T2Nav from "./components/T2Nav";
import T2Footer from "./components/T2Footer";
import T2CinematicHero from "./components/T2CinematicHero";
import T2MagneticButton from "./components/T2MagneticButton";
import T2TelemetryCounter from "./components/T2TelemetryCounter";
import T2AnimatedGrid from "./components/T2AnimatedGrid";
import T2TreatmentDashboard from "./components/T2TreatmentDashboard";
import BeforeAfterSlider from "@/components/dental/BeforeAfterSlider";
import {
  TextReveal,
  HeadlineReveal,
  CursorGlow,
  AnimatedCounter,
  MagneticElement,
} from "@/components/premium";

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

const location = clientMasterData.locations[0];

// ═══════════════════════════════════════════════════════════════════════
// TECHNOLOGY SECTION — Interactive Animated Panels
// ═══════════════════════════════════════════════════════════════════════
function TechnologySection() {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const technologies = [
    {
      id: "01",
      icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z",
      title: "Carestream CS 9600 CBCT",
      description: "Full 3D jaw imaging at 0.1mm resolution. See bone density, nerve pathways, and sinus proximity before we touch a drill.",
      stat: "0.1mm",
      statLabel: "Resolution",
    },
    {
      id: "02",
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
      title: "Solea CO₂ Laser",
      description: "Cuts soft tissue without bleeding. Most procedures need zero anesthesia. You'll feel pressure, not pain.",
      stat: "95%",
      statLabel: "No Anesthesia",
    },
    {
      id: "03",
      icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
      title: "CEREC Primescan + Mill",
      description: "Digital scan replaces goopy impressions. Mill carves your crown from solid ceramic in 12 minutes. Walk out same day.",
      stat: "12min",
      statLabel: "Mill Time",
    },
  ];

  return (
    <section ref={sectionRef} className="py-24 px-6 md:px-12 bg-zinc-900 relative overflow-hidden">
      {/* Animated background grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 0.02 : 0 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Ambient glow that follows active card */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        animate={{
          opacity: activeCard ? 0.15 : 0,
          x: activeCard === "01" ? "10%" : activeCard === "02" ? "40%" : "70%",
          y: "20%",
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          background: `radial-gradient(circle, var(--primary-brand) 0%, transparent 70%)`,
          filter: "blur(80px)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header with staggered animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[11px] tracking-[0.3em] text-brand-primary uppercase font-medium"
          >
            Our Technology
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl font-semibold tracking-[-0.01em] mt-4 mb-3"
          >
            Advanced Capabilities
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base text-white/50"
          >
            State-of-the-art technology for superior patient outcomes.
          </motion.p>
        </motion.div>

        {/* Interactive cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {technologies.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              onMouseEnter={() => setActiveCard(feature.id)}
              onMouseLeave={() => setActiveCard(null)}
              className="group relative bg-zinc-950 p-8 rounded-2xl border border-slate-800 cursor-pointer overflow-hidden"
            >
              {/* Hover gradient overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 via-transparent to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === feature.id ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />

              {/* Animated border glow */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: activeCard === feature.id ? 1 : 0,
                  boxShadow: activeCard === feature.id
                    ? "inset 0 0 0 1px rgba(var(--primary-brand-rgb), 0.3), 0 0 30px rgba(var(--primary-brand-rgb), 0.1)"
                    : "none"
                }}
                transition={{ duration: 0.3 }}
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  {/* Animated icon container */}
                  <motion.div
                    className="w-14 h-14 bg-brand-primary/10 border border-brand-primary/20 rounded-xl flex items-center justify-center"
                    animate={{
                      scale: activeCard === feature.id ? 1.1 : 1,
                      backgroundColor: activeCard === feature.id ? "rgba(var(--primary-brand-rgb), 0.2)" : "rgba(var(--primary-brand-rgb), 0.1)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.svg
                      className="w-6 h-6 text-brand-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      animate={{ rotate: activeCard === feature.id ? 5 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={feature.icon} />
                    </motion.svg>
                  </motion.div>

                  {/* Number badge with pulse */}
                  <motion.div
                    className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"
                    animate={{
                      scale: activeCard === feature.id ? [1, 1.2, 1] : 1,
                      borderColor: activeCard === feature.id ? "rgba(var(--primary-brand-rgb), 0.3)" : "rgba(255,255,255,0.1)",
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <span className={`text-[10px] font-medium transition-colors duration-300 ${activeCard === feature.id ? "text-brand-primary" : "text-white/40"}`}>
                      {feature.id}
                    </span>
                  </motion.div>
                </div>

                <motion.h3
                  className="text-xl font-semibold tracking-tight mb-3"
                  animate={{ x: activeCard === feature.id ? 4 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {feature.title}
                </motion.h3>

                <motion.p
                  className="text-sm text-white/50 leading-relaxed mb-6"
                  animate={{ opacity: activeCard === feature.id ? 0.8 : 0.5 }}
                  transition={{ duration: 0.3 }}
                >
                  {feature.description}
                </motion.p>

                {/* Stat reveal on hover */}
                <motion.div
                  className="flex items-center gap-3 pt-4 border-t border-white/[0.05]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: activeCard === feature.id ? 1 : 0.5,
                    y: activeCard === feature.id ? 0 : 5,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-2xl font-semibold text-brand-primary">{feature.stat}</span>
                  <span className="text-xs text-white/40 uppercase tracking-wider">{feature.statLabel}</span>
                </motion.div>
              </div>

              {/* Corner accents that animate in */}
              <motion.div
                className="absolute top-3 left-3 w-6 h-6 border-l border-t border-brand-primary/30"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: activeCard === feature.id ? 1 : 0,
                  scale: activeCard === feature.id ? 1 : 0.5,
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute bottom-3 right-3 w-6 h-6 border-r border-b border-brand-primary/30"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: activeCard === feature.id ? 1 : 0,
                  scale: activeCard === feature.id ? 1 : 0.5,
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// SERVICES GRID SECTION — Animated Interactive Grid with Images
// ═══════════════════════════════════════════════════════════════════════
function ServicesGridSection({ location }: { location: typeof clientMasterData.locations[0] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Service images and icons mapping
  const serviceData: Record<string, { image: string; icon: string }> = {
    "Cosmetic Dentist": {
      image: "/images/services/full-mouth-smile.jpg",
      icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
    },
    "Dental Implants Provider": {
      image: "/images/services/implant.jpg",
      icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
    },
    "Teeth Whitening Service": {
      image: "/images/services/full-mouth-shade.jpg",
      icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    },
    "Emergency Dental Service": {
      image: "/images/services/braces.jpg",
      icon: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    default: {
      image: "/images/services/invisalign.jpg",
      icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    },
  };

  const getServiceData = (category: string) => {
    return serviceData[category] || serviceData.default;
  };

  return (
    <section ref={sectionRef} className="py-24 px-6 md:px-12 relative overflow-hidden">
      {/* Animated background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 0.02 : 0 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[11px] tracking-[0.3em] text-brand-primary uppercase font-medium"
          >
            Full Service Menu
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl font-semibold tracking-[-0.01em] mt-4 mb-3"
          >
            Comprehensive Care
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base text-white/50"
          >
            Complete dental services in {location.cityServed}.
          </motion.p>
        </motion.div>

        {/* Animated grid with images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {location.secondaryCategoriesGBP.map((category, index) => {
            const data = getServiceData(category);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.1 + index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative rounded-2xl cursor-pointer overflow-hidden aspect-[4/5]"
              >
                {/* Background Image */}
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    scale: hoveredIndex === index ? 1.08 : 1,
                  }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Image
                    src={data.image}
                    alt={category}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </motion.div>

                {/* Gradient Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent"
                  animate={{
                    opacity: hoveredIndex === index ? 0.95 : 0.85,
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Brand color overlay on hover */}
                <motion.div
                  className="absolute inset-0 bg-brand-primary/20"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Border */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border border-white/10"
                  animate={{
                    borderColor: hoveredIndex === index ? "rgba(var(--primary-brand-rgb), 0.5)" : "rgba(255,255,255,0.1)",
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Content */}
                <div className="absolute inset-0 p-5 flex flex-col justify-between z-10">
                  {/* Top Row - Icon and Number */}
                  <div className="flex items-center justify-between">
                    <motion.div
                      className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center"
                      animate={{
                        backgroundColor: hoveredIndex === index ? "rgba(var(--primary-brand-rgb), 0.3)" : "rgba(255,255,255,0.1)",
                        borderColor: hoveredIndex === index ? "rgba(var(--primary-brand-rgb), 0.5)" : "rgba(255,255,255,0.2)",
                        scale: hoveredIndex === index ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        animate={{
                          color: hoveredIndex === index ? "var(--primary-brand)" : "rgba(255,255,255,0.8)",
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={data.icon} />
                      </motion.svg>
                    </motion.div>

                    <span className={`text-[10px] font-semibold transition-colors duration-300 ${hoveredIndex === index ? "text-brand-primary" : "text-white/50"}`}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Bottom Row - Title and Description */}
                  <div>
                    <motion.h3
                      className="text-lg font-semibold tracking-tight mb-2"
                      animate={{
                        color: hoveredIndex === index ? "var(--primary-brand)" : "rgba(255,255,255,0.95)",
                        y: hoveredIndex === index ? -4 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {category}
                    </motion.h3>

                    <motion.p
                      className="text-xs text-white/50 leading-relaxed"
                      animate={{
                        opacity: hoveredIndex === index ? 1 : 0.6,
                        y: hoveredIndex === index ? -2 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      Digital precision care
                    </motion.p>

                    {/* Arrow indicator */}
                    <motion.div
                      className="flex items-center gap-2 mt-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{
                        opacity: hoveredIndex === index ? 1 : 0,
                        x: hoveredIndex === index ? 0 : -10,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-[10px] uppercase tracking-[0.2em] text-brand-primary font-medium">
                        Learn More
                      </span>
                      <svg
                        className="w-4 h-4 text-brand-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </motion.div>
                  </div>
                </div>

                {/* Bottom accent line */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-primary via-brand-primary to-brand-primary/50"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: hoveredIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{ originX: 0 }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function Template2Page() {
  const { doctors } = clientMasterData;
  const primaryDoctor = doctors[0];
  const isMobile = useIsMobile();

  return (
    <div className="font-innovator bg-zinc-950 text-white relative overflow-x-hidden">
      {/* Cursor Tracking Glow Effect - Disabled on mobile */}
      <CursorGlow color="var(--primary-brand)" size={500} blur={120} opacity={0.12} enabled={!isMobile} />

      <T2Nav />

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO SECTION — CINEMATIC COMPONENT
          Full-screen video hero with Framer Motion animations
      ═══════════════════════════════════════════════════════════════════════ */}
      <T2CinematicHero
        videoSrc="/videos/hero-background.mp4"
        posterSrc="/images/team/staff-photo.jpg"
        isMobile={isMobile}
      />

      {/* ═══════════════════════════════════════════════════════════════════════
          PRECISION METRICS — DENTAL-SPECIFIC MEASUREMENTS
          Three-column precision display showing actual dental capabilities
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-12 px-6 md:px-12 bg-zinc-950 border-y border-white/5">
        {/* Animated circuit grid background */}
        <T2AnimatedGrid pattern="circuit" opacity={0.06} animationDuration={3} />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center">
              <T2TelemetryCounter
                value={0.1}
                suffix="mm"
                duration={2.5}
                decimals={1}
                label="CBCT Scan Resolution"
                glitchEffect={true}
              />
              <p className="text-xs text-white/40 mt-3 tracking-wide">
                Sees what X-rays miss
              </p>
            </div>
            <div className="text-center">
              <T2TelemetryCounter
                value={12}
                suffix="min"
                duration={3}
                label="Crown Mill Time"
                glitchEffect={true}
              />
              <p className="text-xs text-white/40 mt-3 tracking-wide">
                Same day, not two weeks
              </p>
            </div>
            <div className="text-center">
              <T2TelemetryCounter
                value={95}
                suffix="%"
                duration={2}
                label="No Anesthesia Needed"
                glitchEffect={true}
              />
              <p className="text-xs text-white/40 mt-3 tracking-wide">
                With Solea laser procedures
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          REFINED MARQUEE — ELEGANT SEPARATOR
      ═══════════════════════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden border-y border-slate-800 bg-zinc-900/50 py-5">
        <div className="animate-marquee whitespace-nowrap flex">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-16 mx-16">
              <span className="text-xs tracking-[0.2em] text-brand-primary font-medium">Same-Day CEREC Crowns</span>
              <span className="text-white/10">•</span>
              <span className="text-xs tracking-[0.2em] text-white/50">3D-Guided Implants</span>
              <span className="text-white/10">•</span>
              <span className="text-xs tracking-[0.2em] text-brand-primary font-medium">Solea Laser Dentistry</span>
              <span className="text-white/10">•</span>
              <span className="text-xs tracking-[0.2em] text-white/50">iTero Invisalign Scanning</span>
              <span className="text-white/10">•</span>
              <span className="text-xs tracking-[0.2em] text-brand-primary font-medium">CBCT 3D Imaging</span>
              <span className="text-white/10">•</span>
              <span className="text-xs tracking-[0.2em] text-white/50">Digital Smile Design</span>
              <span className="text-white/10">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          SERVICES — ASYMMETRIC SIDE-BY-SIDE PRESENTATION LAYOUT
          Left: Minimal vertical typography stack | Right: Dynamic showcase window
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-12 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="mb-16">
            <span className="text-[11px] tracking-[0.3em] text-brand-primary uppercase font-medium">
              Our Specialties
            </span>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mt-4 mb-3">
              Treatment Excellence
            </h2>
            <p className="text-base text-white/50 max-w-lg">
              Advanced digital procedures designed for optimal outcomes and lasting results.
            </p>
          </div>

          {/* Asymmetric Side-by-Side Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Side - Minimal Vertical Typography Stack */}
            <div className="lg:col-span-5 space-y-0">
              {[
                {
                  id: "01",
                  title: "Invisalign",
                  subtitle: "iTero Scanner + Diamond Provider",
                  description: "See your final smile in 3D before you start. Our Diamond status means we've treated 500+ cases—so we finish faster.",
                  image: "/images/services/invisalign.jpg",
                },
                {
                  id: "02",
                  title: "Dental Implants",
                  subtitle: "CBCT-Guided Surgery",
                  description: "Your implant is planned to the tenth of a millimeter. Surgical guides mean shorter surgery, faster healing.",
                  image: "/images/services/implant.jpg",
                },
                {
                  id: "03",
                  title: "Full Restoration",
                  subtitle: "Digital Smile Design",
                  description: "We design your new smile on screen first. You approve before we start. No surprises, just results.",
                  image: "/images/services/full-mouth-smile.jpg",
                },
                {
                  id: "04",
                  title: "Veneers",
                  subtitle: "CEREC Same-Day Delivery",
                  description: "Digital impressions mean perfect fit. Mill-cut ceramics mean you leave with your final veneers—not temporaries.",
                  image: "/images/services/full-mouth-shade.jpg",
                },
              ].map((service, index) => (
                <div
                  key={service.id}
                  className="group relative py-6 border-b border-white/[0.05] cursor-pointer hover:bg-white/[0.02] transition-all duration-300 -mx-4 px-4"
                >
                  <div className="flex items-start gap-6">
                    {/* Numeric Tag */}
                    <span className="text-[11px] tracking-[0.2em] text-white/30 font-medium pt-1 w-8 flex-shrink-0">
                      {service.id}
                    </span>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-semibold tracking-tight group-hover:text-brand-primary transition-colors duration-300">
                            {service.title}
                          </h3>
                          <p className="text-[10px] tracking-[0.2em] text-white/40 uppercase mt-1">
                            {service.subtitle}
                          </p>
                        </div>
                        {/* Hover Arrow */}
                        <svg className="w-5 h-5 text-brand-primary opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                      <p className="text-sm text-white/50 leading-relaxed mt-3 max-w-sm">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {/* Active indicator line */}
                  <div className="absolute bottom-0 left-0 h-[1px] bg-brand-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left w-full" />
                </div>
              ))}
            </div>

            {/* Right Side - Large Format Dynamic Showcase Window */}
            <div className="lg:col-span-7 relative">
              <div className="sticky top-24">
                {/* Main Showcase Frame */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <Image
                    src="/images/services/invisalign.jpg"
                    alt="Featured dental service"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />

                  {/* Floating info panel */}
                  <div className="absolute bottom-6 left-6 right-6 z-10">
                    <div className="backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-xl p-6">
                      <p className="text-[10px] tracking-[0.25em] text-brand-primary uppercase font-medium mb-2">
                        Featured Treatment
                      </p>
                      <h4 className="text-2xl font-semibold tracking-tight mb-2">
                        Precision Care
                      </h4>
                      <p className="text-sm text-white/50">
                        Experience the difference of digital dentistry with our advanced treatment protocols.
                      </p>
                    </div>
                  </div>

                  {/* Corner architectural elements */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-l border-t border-white/[0.1]" />
                  <div className="absolute top-4 right-4 w-8 h-8 border-r border-t border-white/[0.1]" />
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-l border-b border-white/[0.1] z-20" />
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-r border-b border-white/[0.1] z-20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECOND MARQUEE — REVERSED
      ═══════════════════════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden border-y border-slate-800 bg-zinc-900/50 py-5">
        <div className="animate-marquee-reverse whitespace-nowrap flex">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-16 mx-16">
              <span className="text-xs tracking-[0.2em] text-white/50">Precision</span>
              <span className="text-white/10">•</span>
              <span className="text-xs tracking-[0.2em] text-brand-primary font-medium">Technology</span>
              <span className="text-white/10">•</span>
              <span className="text-xs tracking-[0.2em] text-white/50">Innovation</span>
              <span className="text-white/10">•</span>
              <span className="text-xs tracking-[0.2em] text-brand-primary font-medium">Excellence</span>
              <span className="text-white/10">•</span>
              <span className="text-xs tracking-[0.2em] text-white/50">Digital</span>
              <span className="text-white/10">•</span>
              <span className="text-xs tracking-[0.2em] text-brand-primary font-medium">Advanced</span>
              <span className="text-white/10">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          WELCOME VIDEO — PRECISION FRAMING ON CANVAS
          Direct canvas placement, widescreen frame, no boxed containers
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-32 px-6 md:px-12 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Asymmetric Grid: Video + Text */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Video Frame - Wide Widescreen */}
            <div className="lg:col-span-8">
              <div className="relative aspect-[16/9] overflow-hidden">
                <video
                  className="w-full h-full object-cover"
                  controls
                  playsInline
                  webkit-playsinline="true"
                  poster="/images/team/staff-photo.jpg"
                >
                  {/* Video source disabled for demo */}
                  Your browser does not support the video tag.
                </video>

                {/* Corner architectural frames */}
                <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-white/[0.1] pointer-events-none" />
                <div className="absolute top-0 right-0 w-12 h-12 border-r-2 border-t-2 border-white/[0.1] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-12 h-12 border-l-2 border-b-2 border-white/[0.1] pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-white/[0.1] pointer-events-none" />

                {/* Status indicators */}
                <div className="absolute top-4 left-4 z-10 pointer-events-none">
                  <div className="backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-full px-4 py-2 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] tracking-[0.15em] text-white/60 uppercase">Practice Tour</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Text Content - Narrow Offset */}
            <div className="lg:col-span-4">
              <span className="text-[11px] tracking-[0.3em] text-brand-primary uppercase font-medium">
                Meet Our Team
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mt-4 mb-4">
                Practice Overview
              </h2>
              <p className="text-base text-white/50 leading-relaxed mb-6">
                Step inside our state-of-the-art facility. See the technology in action.
              </p>
              {/* Thin separator */}
              <div className="border-t border-white/[0.05] pt-6">
                <div className="flex items-center gap-4">
                  <span className="text-[10px] tracking-[0.2em] text-white/30 uppercase">Duration</span>
                  <span className="text-sm text-white/60">3:45</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          BEFORE/AFTER — CLINICAL RESULTS
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-12 bg-zinc-900 relative">
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-8">
            <span className="text-[11px] tracking-[0.3em] text-brand-primary uppercase font-medium">
              Case Studies
            </span>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.01em] mt-4 mb-3">
              Verified Results
            </h2>
            <p className="text-base text-white/50">
              Real transformations. Precision outcomes. Documented success.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="rounded-2xl border border-slate-800 overflow-hidden">
              <BeforeAfterSlider
                beforeUrl="/images/cases/smile-before-ortho.png"
                afterUrl="/images/cases/smile-after-ortho.png"
                altTag="Invisalign clear aligner transformation"
                aspectRatio="4/3"
              />
            </div>
            <p className="text-center text-sm text-white/40 mt-6">
              Drag to compare before and after results
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          DOCTOR PROFILE — DIRECT CANVAS PRESENTATION
          No heavy boxed cards, thin separators, elegant offset layout
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-32 px-6 md:px-12 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Asymmetric Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            {/* Portrait - Direct on canvas */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="/images/team/doctor-portrait.png"
                  alt={`${primaryDoctor.name}, ${primaryDoctor.role}`}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                {/* Subtle gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent" />

                {/* Corner frames */}
                <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-white/[0.08]" />
                <div className="absolute top-0 right-0 w-12 h-12 border-r-2 border-t-2 border-white/[0.08]" />
                <div className="absolute bottom-0 left-0 w-12 h-12 border-l-2 border-b-2 border-white/[0.08]" />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-white/[0.08]" />
              </div>

              {/* Status badge */}
              <div className="absolute bottom-6 left-6 z-10">
                <div className="backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-full px-4 py-2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] tracking-[0.15em] text-white/60 uppercase">Accepting Patients</span>
                </div>
              </div>
            </div>

            {/* Bio Content - Narrow offset text box */}
            <div className="lg:col-span-7 lg:pt-12">
              <span className="text-[11px] tracking-[0.3em] text-brand-primary uppercase font-medium">
                Your Provider
              </span>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mt-4 mb-2">
                {primaryDoctor.name}
              </h2>
              <p className="text-lg text-white/40 mb-8 italic">{primaryDoctor.role}</p>

              {/* Thin separator */}
              <div className="border-t border-white/[0.05] pt-8 mb-8">
                <p className="text-base text-white/60 leading-relaxed max-w-lg">
                  {primaryDoctor.biography}
                </p>
              </div>

              {/* Credentials - Thin underline frames */}
              <div className="space-y-0">
                {primaryDoctor.credentials.map((credential, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 py-4 border-b border-white/[0.05] group hover:border-white/[0.1] transition-colors"
                  >
                    <span className="text-[10px] tracking-[0.2em] text-white/30 font-medium w-6">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors">{credential}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          TECHNOLOGY FEATURES — INTERACTIVE ANIMATED PANELS
      ═══════════════════════════════════════════════════════════════════════ */}
      <TechnologySection />

      {/* ═══════════════════════════════════════════════════════════════════════
          SERVICES LIST — ANIMATED INTERACTIVE GRID
      ═══════════════════════════════════════════════════════════════════════ */}
      <ServicesGridSection location={location} />

      {/* ═══════════════════════════════════════════════════════════════════════
          PATIENT REVIEWS — ASYMMETRIC INTERACTIVE SLIDER FRAMEWORK
          Primary testimonial floating over translucent background, secondary cards offset
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-32 px-6 md:px-12 bg-zinc-900 relative overflow-hidden">
        {/* Elegant translucent background layer */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[70%] h-[80%] bg-gradient-to-bl from-brand-primary/[0.03] via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 w-[50%] h-[60%] bg-gradient-to-tr from-white/[0.01] via-transparent to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Asymmetric Layout: Large Primary + Stacked Secondary */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Side - Section Header + Secondary Reviews */}
            <div className="lg:col-span-5 space-y-8">
              {/* Header */}
              <div>
                <span className="text-[11px] tracking-[0.3em] text-brand-primary uppercase font-medium">
                  Patient Experiences
                </span>
                <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mt-4 mb-3">
                  Trusted Results
                </h2>
                <p className="text-base text-white/50">
                  Real stories from verified patients.
                </p>
              </div>

              {/* Overall Rating Badge */}
              <div className="backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <span className="text-4xl font-semibold text-brand-primary block">4.9</span>
                    <div className="flex items-center gap-0.5 mt-2 justify-center">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-3.5 h-3.5 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <div className="h-12 w-[1px] bg-white/[0.08]" />
                  <div>
                    <span className="text-2xl font-semibold block">287</span>
                    <span className="text-[10px] tracking-[0.15em] text-white/40 uppercase">Google Reviews</span>
                  </div>
                </div>
              </div>

              {/* Secondary Reviews - Compact Stack */}
              <div className="space-y-3">
                {sampleReviews.slice(1, 3).map((review, index) => (
                  <div
                    key={index}
                    className="group relative py-5 px-6 border-l-2 border-white/[0.06] hover:border-brand-primary/50 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-300"
                  >
                    <p className="text-sm text-white/60 leading-relaxed line-clamp-2 mb-3">
                      &ldquo;{review.reviewText}&rdquo;
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 bg-brand-primary/10 border border-brand-primary/20 rounded-full flex items-center justify-center">
                          <span className="text-xs font-semibold text-brand-primary">
                            {review.reviewerName.charAt(0)}
                          </span>
                        </div>
                        <span className="text-sm text-white/70">{review.reviewerName}</span>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-2.5 h-2.5 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Large Primary Testimonial Floating Quote */}
            <div className="lg:col-span-7 relative">
              <div className="relative">
                {/* Large quote mark - positioned outside and above the card */}
                <div className="absolute -top-16 -left-6 text-[140px] leading-none text-brand-primary/[0.15] font-serif select-none pointer-events-none z-0">
                  &ldquo;
                </div>

                {/* Primary Testimonial Card - Glassmorphism */}
                <div className="relative z-10 backdrop-blur-xl bg-white/[0.02] border border-white/[0.06] rounded-3xl p-10 md:p-14">
                  {/* Corner architectural elements */}
                  <div className="absolute top-6 left-6 w-8 h-8 border-l border-t border-white/[0.08]" />
                  <div className="absolute top-6 right-6 w-8 h-8 border-r border-t border-white/[0.08]" />
                  <div className="absolute bottom-6 left-6 w-8 h-8 border-l border-b border-white/[0.08]" />
                  <div className="absolute bottom-6 right-6 w-8 h-8 border-r border-b border-white/[0.08]" />

                  {/* Verified Badge */}
                  <div className="flex items-center gap-2 mb-8">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] tracking-[0.2em] text-white/40 uppercase">Featured Review</span>
                  </div>

                  {/* Quote Text - Large Format */}
                  <p className="text-xl md:text-2xl lg:text-3xl text-white/80 leading-relaxed font-light mb-10">
                    {sampleReviews[0].reviewText}
                  </p>

                  {/* Thin separator */}
                  <div className="border-t border-white/[0.06] pt-8">
                    <div className="flex items-center justify-between">
                      {/* Author */}
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-brand-primary/10 border border-brand-primary/20 rounded-full flex items-center justify-center">
                          <span className="text-lg font-semibold text-brand-primary">
                            {sampleReviews[0].reviewerName.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="text-base font-medium">{sampleReviews[0].reviewerName}</p>
                          <p className="text-[11px] text-white/40 tracking-wide">Verified Patient • Google</p>
                        </div>
                      </div>

                      {/* Stars */}
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-5 h-5 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Slider Navigation Dots */}
                <div className="flex items-center justify-center gap-2 mt-8">
                  <button className="w-8 h-1 rounded-full bg-brand-primary" aria-label="Review 1" />
                  <button className="w-2 h-1 rounded-full bg-white/20 hover:bg-white/40 transition-colors" aria-label="Review 2" />
                  <button className="w-2 h-1 rounded-full bg-white/20 hover:bg-white/40 transition-colors" aria-label="Review 3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          LOCATION & HOURS — REFINED PANEL
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-12 relative">
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-12">
            <span className="text-[11px] tracking-[0.3em] text-brand-primary uppercase font-medium">
              Visit Us
            </span>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.01em] mt-4">
              Location & Hours
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Hours Panel */}
            <div className="bg-zinc-900 p-8 md:p-12 rounded-2xl border border-slate-800">
              <p className="text-[11px] tracking-[0.2em] text-brand-primary mb-6 uppercase font-medium">
                Office Hours
              </p>
              <div className="space-y-2">
                {[
                  { day: "Monday", hours: "8:00 AM — 5:00 PM" },
                  { day: "Tuesday", hours: "8:00 AM — 5:00 PM" },
                  { day: "Wednesday", hours: "8:00 AM — 5:00 PM" },
                  { day: "Thursday", hours: "8:00 AM — 5:00 PM" },
                  { day: "Friday", hours: "8:00 AM — 12:00 PM" },
                  { day: "Saturday", hours: "Closed" },
                  { day: "Sunday", hours: "Closed" },
                ].map((schedule, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3 px-4 bg-white/5 border border-slate-800 rounded-xl hover:border-brand-primary/30 transition-colors"
                  >
                    <span className="text-sm text-white/70">{schedule.day}</span>
                    <span className={`text-sm ${schedule.hours === "Closed" ? "text-white/30" : "text-brand-primary"}`}>
                      {schedule.hours}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href={clientMasterData.onlineBookingUrl !== "none" ? clientMasterData.onlineBookingUrl : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
                className="inline-flex items-center gap-3 mt-8 px-8 py-4 bg-brand-primary text-white font-semibold text-sm uppercase tracking-[0.15em] rounded-xl border border-brand-primary hover:bg-brand-primary/90 transition-all duration-300"
              >
                <span>Schedule Appointment</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            {/* Map Panel */}
            <div className="relative aspect-square lg:aspect-auto min-h-[400px] bg-zinc-900 rounded-2xl overflow-hidden border border-slate-800">
              <iframe
                src={location.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map to ${location.practiceNameGBP}`}
                className="absolute inset-0"
              />
              {/* Refined Overlay */}
              <div className="absolute top-4 left-4 z-10">
                <span className="text-[10px] tracking-[0.2em] text-white/70 bg-zinc-950/90 px-3 py-1.5 rounded-full">
                  {location.cityServed}, {location.stateServed}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          MEMBERSHIP — EXPANDABLE ROW MATRIX STACK
          Clean responsive data rows, expandable details on selection
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-32 px-6 md:px-12 bg-zinc-900 relative">
        <div className="max-w-5xl mx-auto relative z-10">
          {/* Header */}
          <div className="mb-12 text-center">
            <span className="text-[11px] tracking-[0.3em] text-brand-primary uppercase font-medium">
              Membership Plans
            </span>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mt-4 mb-3">
              Digital Care Membership
            </h2>
            <p className="text-base text-white/50 max-w-lg mx-auto">
              No insurance? No problem. Members get 2 cleanings, full CBCT scans, and 25% off every procedure—including same-day crowns.
            </p>
          </div>

          {/* Benefits Row - Compact Indicator */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            {["2 Cleanings", "2 Exams", "CBCT 3D Scan", "25% Off Everything"].map((benefit, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2 backdrop-blur-xl bg-white/[0.02] border border-white/[0.06] rounded-full">
                <svg className="w-3.5 h-3.5 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-xs tracking-wide text-white/60">{benefit}</span>
              </div>
            ))}
          </div>

          {/* Row Matrix Stack */}
          <div className="space-y-2">
            {[
              { tier: "Individual", price: "335", code: "01", description: "Perfect for single patients seeking comprehensive preventive care coverage." },
              { tier: "Couple", price: "615", code: "02", popular: true, description: "Ideal for partners. Both members receive full membership benefits." },
              { tier: "Family", price: "965", code: "03", description: "Coverage for parents and children. Add additional members for $95/year each.", extra: "+$95 per additional member" },
            ].map((plan) => (
              <details
                key={plan.code}
                className="group"
              >
                <summary className={`flex items-center justify-between p-6 md:p-8 cursor-pointer list-none rounded-2xl transition-all duration-300 ${plan.popular ? "bg-brand-primary/[0.05] border border-brand-primary/20 hover:border-brand-primary/40" : "bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.03]"}`}>
                  <div className="flex items-center gap-6">
                    {/* Code Badge */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${plan.popular ? "bg-brand-primary/20 border border-brand-primary/30" : "bg-white/5 border border-white/10"}`}>
                      <span className={`text-xs font-medium ${plan.popular ? "text-brand-primary" : "text-white/40"}`}>{plan.code}</span>
                    </div>

                    {/* Tier Name */}
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-semibold tracking-tight">{plan.tier}</h3>
                        {plan.popular && (
                          <span className="text-[9px] tracking-[0.2em] text-brand-primary bg-brand-primary/10 px-3 py-1 rounded-full uppercase font-medium">
                            Popular
                          </span>
                        )}
                      </div>
                      {plan.extra && (
                        <p className="text-xs text-brand-primary/70 mt-1">{plan.extra}</p>
                      )}
                    </div>
                  </div>

                  {/* Price + Expand Indicator */}
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <span className="text-3xl font-semibold">${plan.price}</span>
                      <span className="text-sm text-white/40">/year</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-open:rotate-180 transition-transform duration-300">
                      <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </summary>

                {/* Expandable Content */}
                <div className="overflow-hidden">
                  <div className={`p-6 md:p-8 mt-1 rounded-2xl ${plan.popular ? "bg-brand-primary/[0.03] border border-brand-primary/10" : "bg-white/[0.01] border border-white/[0.04]"}`}>
                    <p className="text-sm text-white/60 leading-relaxed mb-6 max-w-2xl">
                      {plan.description}
                    </p>

                    {/* Benefits Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                      {["2 Cleanings", "2 Doctor Exams", "2 Oral Cancer Screenings", "2 Fluoride Treatments", "2 Digital/3D X-rays", "25% off All Procedures"].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 py-2">
                          <svg className="w-4 h-4 text-brand-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm text-white/70">{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action Button */}
                    <a
                      href={clientMasterData.onlineBookingUrl !== "none" ? clientMasterData.onlineBookingUrl : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
                      className="inline-flex items-center gap-3 px-6 py-3 bg-brand-primary text-white font-semibold text-sm uppercase tracking-[0.15em] rounded-xl border border-brand-primary hover:bg-brand-primary/90 transition-all duration-300"
                    >
                      <span>Enroll Now</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </details>
            ))}
          </div>

          {/* Bottom Note */}
          <div className="mt-8 text-center">
            <p className="text-xs text-white/40">
              No insurance required. Membership benefits activate immediately upon enrollment.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FINAL CTA — REFINED BANNER
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/office-interior.jpg"
            alt={`${clientMasterData.globalPracticeName} office interior`}
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-zinc-950/90" />
          {/* Subtle Grid Overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "64px 64px",
            }}
          />
        </div>

        <div className="relative z-10 w-full px-6 md:px-12 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-[11px] tracking-[0.3em] text-brand-primary uppercase font-medium">
              Start Your Journey
            </span>
            <h2 className="text-4xl md:text-6xl font-semibold tracking-[-0.01em] mt-6 mb-6">
              Ready to Begin?
            </h2>
            <p className="text-base text-white/50 mb-10 max-w-xl mx-auto">
              Complimentary consultations for Implants, Dentures, and Invisalign. Experience our 3D imaging technology at no cost.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <T2MagneticButton
                href={clientMasterData.onlineBookingUrl !== "none" ? clientMasterData.onlineBookingUrl : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
                className="inline-flex items-center gap-3 px-10 py-5 bg-brand-primary text-white font-semibold text-sm uppercase tracking-[0.15em] rounded-xl border border-brand-primary hover:bg-brand-primary/90 transition-all duration-300"
                magneticRadius={120}
                magneticStrength={0.5}
              >
                <span>Schedule Consultation</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </T2MagneticButton>
              <T2MagneticButton
                href={`tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
                className="inline-flex items-center gap-3 px-10 py-5 bg-transparent text-white font-semibold text-sm uppercase tracking-[0.15em] rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300"
                magneticRadius={100}
                magneticStrength={0.4}
              >
                <span>{location.phoneGBP}</span>
              </T2MagneticButton>
            </div>

            {/* Bottom Status */}
            <div className="mt-16 pt-8 border-t border-white/10 flex items-center justify-center gap-4">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm text-white/40">
                Now Accepting New Patients in {location.cityServed}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          TREATMENT BLUEPRINT DASHBOARD — INTERACTIVE PHASES
      ═══════════════════════════════════════════════════════════════════════ */}
      <T2TreatmentDashboard
        phases={[
          {
            id: "diagnosis",
            title: "Diagnosis & 3D Imaging",
            subtitle: "Phase 01 • Foundation",
            description: "Complete digital diagnostic workup using CBCT 3D imaging, intraoral scanning, and comprehensive clinical examination. We map every detail before treatment begins.",
            duration: "30-45 minutes",
            image: "/images/services/implant.jpg",
            details: [
              "Full CBCT 3D scan at 0.1mm resolution for precise bone and nerve mapping",
              "Intraoral digital impressions using iTero scanner (no goop)",
              "Comprehensive clinical examination and treatment planning consultation",
              "Digital photos and baseline documentation for progress tracking",
            ],
          },
          {
            id: "planning",
            title: "3D Digital Planning",
            subtitle: "Phase 02 • Design",
            description: "Treatment is designed virtually in our planning software. You'll see your final result before we begin, with the ability to make changes and approve the final design.",
            duration: "5-7 business days",
            image: "/images/services/full-mouth-smile.jpg",
            details: [
              "Digital Smile Design (DSD) mockup showing your predicted outcome",
              "Virtual implant placement with surgical guide design",
              "Crown/restoration design using CAD/CAM software",
              "Review appointment to approve plan and make any adjustments",
            ],
          },
          {
            id: "execution",
            title: "Guided Execution",
            subtitle: "Phase 03 • Treatment",
            description: "Treatment is performed using 3D-printed surgical guides and computer-aided precision. Most procedures completed in a single visit with immediate results.",
            duration: "1-3 hours",
            image: "/images/services/invisalign.jpg",
            details: [
              "Guided surgery using 3D-printed templates for submillimeter accuracy",
              "Same-day crown milling using CEREC technology (when applicable)",
              "Real-time verification scans to ensure precision fit",
              "Immediate temporary or final restoration placement",
            ],
          },
          {
            id: "followup",
            title: "Digital Follow-Up",
            subtitle: "Phase 04 • Verification",
            description: "Post-treatment verification imaging and progress monitoring. We document healing and ensure optimal integration of your restoration.",
            duration: "3-6 months",
            image: "/images/services/full-mouth-shade.jpg",
            details: [
              "Follow-up CBCT scans to verify healing and osseointegration",
              "Digital progress photos to track aesthetic outcomes",
              "Remote monitoring option using patient portal app",
              "Final verification appointment with adjustment if needed",
            ],
          },
        ]}
      />

      <T2Footer />
    </div>
  );
}
