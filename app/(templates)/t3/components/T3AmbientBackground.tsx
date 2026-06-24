"use client";

import { motion } from "framer-motion";

export default function T3AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {/* ═══════════════════════════════════════════════════════════════════════
          AMBIENT SANCTUARY LIGHTING NODES
          Multi-layered organic atmosphere with drifting radial blurs
          Amber and Teal organic palette with 20-second drift loops
      ═══════════════════════════════════════════════════════════════════════ */}

      {/* Primary Amber Node - Large, Top Right */}
      <motion.div
        animate={{
          x: [0, 60, -40, 30, 0],
          y: [0, -50, 40, -30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-amber-100/[0.15] blur-[140px]"
      />

      {/* Secondary Teal Node - Large, Bottom Left */}
      <motion.div
        animate={{
          x: [0, -50, 40, -30, 0],
          y: [0, 60, -40, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
        className="absolute -bottom-40 -left-40 w-[550px] h-[550px] rounded-full bg-teal-50/[0.12] blur-[120px]"
      />

      {/* Tertiary Amber Node - Medium, Center Left */}
      <motion.div
        animate={{
          x: [0, 40, -30, 50, 0],
          y: [0, -40, 60, -30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 10,
        }}
        className="absolute top-1/3 -left-20 w-[400px] h-[400px] rounded-full bg-amber-100/[0.10] blur-[130px]"
      />

      {/* Quaternary Teal Node - Medium, Upper Right */}
      <motion.div
        animate={{
          x: [0, -35, 45, -25, 0],
          y: [0, 45, -35, 55, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 15,
        }}
        className="absolute top-1/4 -right-24 w-[450px] h-[450px] rounded-full bg-teal-50/[0.08] blur-[150px]"
      />

      {/* Quinary Subtle Amber - Lower Center */}
      <motion.div
        animate={{
          x: [0, -25, 35, -45, 0],
          y: [0, 30, -40, 25, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 7,
        }}
        className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-amber-50/[0.08] blur-[160px]"
      />
    </div>
  );
}
