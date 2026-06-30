"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";

interface PatientCard {
  id: string;
  name: string;
  imageSrc: string;
  initialX: number;
  initialY: number;
  initialRotate: number;
  initialScale: number;
  finalGridArea: string;
}

const patientCards: PatientCard[] = [
  {
    id: "patient-1",
    name: "Sarah M.",
    imageSrc: "/images/team/doctor-portrait.png",
    initialX: -120,
    initialY: -80,
    initialRotate: -12,
    initialScale: 0.85,
    finalGridArea: "1 / 1 / 3 / 3",
  },
  {
    id: "patient-2",
    name: "James L.",
    imageSrc: "/images/team/staff-photo.jpg",
    initialX: 180,
    initialY: -60,
    initialRotate: 8,
    initialScale: 1.1,
    finalGridArea: "1 / 3 / 2 / 5",
  },
  {
    id: "patient-3",
    name: "Maria K.",
    imageSrc: "/images/cases/smile-before.png",
    initialX: -90,
    initialY: 120,
    initialRotate: 15,
    initialScale: 0.9,
    finalGridArea: "2 / 3 / 3 / 4",
  },
  {
    id: "patient-4",
    name: "David R.",
    imageSrc: "/images/cases/smile-after.png",
    initialX: 140,
    initialY: 100,
    initialRotate: -18,
    initialScale: 1.05,
    finalGridArea: "2 / 4 / 3 / 5",
  },
  {
    id: "patient-5",
    name: "Emily T.",
    imageSrc: "/images/office-interior.jpg",
    initialX: 0,
    initialY: -140,
    initialRotate: -6,
    initialScale: 0.95,
    finalGridArea: "3 / 1 / 4 / 3",
  },
  {
    id: "patient-6",
    name: "Michael P.",
    imageSrc: "/images/services/full-mouth-smile.jpg",
    initialX: 220,
    initialY: 180,
    initialRotate: 22,
    initialScale: 0.88,
    finalGridArea: "3 / 3 / 4 / 5",
  },
];

export default function T3InvisalignMorph() {
  const containerRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  // Scroll progress tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth spring physics for scroll
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Morph progress: 0 = chaotic, 1 = aligned
  const morphProgress = useTransform(smoothProgress, [0.2, 0.7], [0, 1]);

  // Typography tracking progress
  const letterSpacing = useTransform(morphProgress, [0, 1], ["-0.05em", "0.15em"]);
  const wordSpacing = useTransform(morphProgress, [0, 1], ["0.05em", "0.4em"]);
  const headlineOpacity = useTransform(smoothProgress, [0.1, 0.3, 0.8, 0.95], [0, 1, 1, 0.3]);

  // Intersection observer for initial viewport entry
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[180vh] overflow-hidden bg-gradient-to-br from-[#FAFAF8] via-stone-50 to-[#F5F5F3] py-32"
    >
      {/* Ambient Background Layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: "radial-gradient(ellipse 70% 50% at 30% 40%, rgba(15, 90, 83, 0.06) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: "radial-gradient(ellipse 60% 60% at 70% 70%, rgba(245, 235, 225, 0.5) 0%, transparent 50%)",
          }}
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12">

        {/* Kinetic Typography Headline */}
        <motion.div
          style={{
            opacity: headlineOpacity,
          }}
          className="text-center mb-32 relative"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[10px] uppercase tracking-[0.4em] text-stone-400 mb-8 font-medium"
          >
            Clear Aligner Therapy
          </motion.p>

          <motion.h2
            style={{
              letterSpacing,
            }}
            className="font-sanctuary text-[clamp(2.5rem,6vw,5rem)] font-extralight leading-[1.05] text-stone-800 mb-6"
          >
            <motion.span
              style={{ wordSpacing }}
              className="block"
            >
              TRANSFORMING
            </motion.span>
            <motion.span
              style={{ wordSpacing }}
              className="block mt-2 text-[#0f5a53]"
            >
              YOUR SMILE
            </motion.span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-stone-600 font-light text-base max-w-2xl mx-auto leading-relaxed"
          >
            Watch as chaos transforms into harmony—just like your Invisalign journey.
            Each patient's unique path, perfectly aligned.
          </motion.p>
        </motion.div>

        {/* Morphing Patient Grid Container */}
        <div className="relative w-full">
          {/* Target Grid Structure (invisible, provides layout reference) */}
          <div
            className="grid gap-4 lg:gap-6 max-w-6xl mx-auto"
            style={{
              gridTemplateColumns: "repeat(4, 1fr)",
              gridTemplateRows: "repeat(3, 280px)",
            }}
          >
            {/* Chaotic cards morph into this grid */}
            <AnimatePresence>
              {patientCards.map((card, index) => (
                <MorphingPatientCard
                  key={card.id}
                  card={card}
                  index={index}
                  morphProgress={morphProgress}
                  isInView={isInView}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Statistics Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {[
            { label: "Average Treatment", value: "12-18", suffix: "Months" },
            { label: "Patient Satisfaction", value: "98", suffix: "%" },
            { label: "Aligners Changed", value: "Every", suffix: "2 Weeks" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
              className="text-center p-8 bg-white/60 backdrop-blur-sm rounded-3xl border border-stone-200/50 shadow-lg shadow-black/5"
            >
              <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400 mb-4 font-medium">
                {stat.label}
              </p>
              <p className="text-4xl font-extralight text-[#0f5a53] mb-2 font-sanctuary">
                {stat.value}
              </p>
              <p className="text-sm text-stone-500 font-light tracking-wide">
                {stat.suffix}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

interface MorphingPatientCardProps {
  card: PatientCard;
  index: number;
  morphProgress: any;
  isInView: boolean;
}

function MorphingPatientCard({ card, index, morphProgress, isInView }: MorphingPatientCardProps) {
  // Transform from chaotic initial position to grid position
  const x = useTransform(morphProgress, [0, 1], [card.initialX, 0]);
  const y = useTransform(morphProgress, [0, 1], [card.initialY, 0]);
  const rotate = useTransform(morphProgress, [0, 1], [card.initialRotate, 0]);
  const scale = useTransform(morphProgress, [0, 1], [card.initialScale, 1]);
  const borderRadius = useTransform(morphProgress, [0, 1], [48, 24]);
  const opacity = useTransform(morphProgress, [0, 0.3, 1], [0.7, 0.95, 1]);
  const shadowIntensity = useTransform(morphProgress, [0, 1], [0.2, 0.08]);

  // Stagger initial appearance
  const [hasAppeared, setHasAppeared] = useState(false);

  useEffect(() => {
    if (isInView && !hasAppeared) {
      setTimeout(() => setHasAppeared(true), index * 120);
    }
  }, [isInView, hasAppeared, index]);

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.5,
      }}
      animate={hasAppeared ? {
        opacity: 1,
        scale: 1,
      } : {}}
      style={{
        x,
        y,
        rotate,
        scale,
        opacity,
        borderRadius,
        gridArea: card.finalGridArea,
      }}
      transition={{
        type: "spring",
        stiffness: 60,
        damping: 25,
        mass: 1.5,
      }}
      className="relative w-full h-full overflow-hidden shadow-2xl shadow-black/20 border border-white/40 backdrop-blur-md"
    >
      {/* Patient Image */}
      <div className="relative w-full h-full">
        <Image
          src={card.imageSrc}
          alt={card.name}
          fill
          className="object-cover"
          sizes="280px"
          priority={index < 3}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-stone-900/10 to-transparent" />

        {/* Patient Name Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={hasAppeared ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 + index * 0.1 }}
          className="absolute bottom-6 left-6 right-6"
        >
          <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full inline-flex items-center gap-2 shadow-lg">
            <div className="w-2 h-2 rounded-full bg-[#0f5a53] animate-pulse" />
            <span className="text-xs font-medium text-stone-700 tracking-wide">
              {card.name}
            </span>
          </div>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={hasAppeared ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 + index * 0.1 }}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/30 backdrop-blur-md border border-white/40 flex items-center justify-center"
        >
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
}
