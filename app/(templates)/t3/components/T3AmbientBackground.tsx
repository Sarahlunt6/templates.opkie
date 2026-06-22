"use client";

import { motion } from "framer-motion";

export default function T3AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Primary Drifting Node - Large, Top Right */}
      <motion.div
        animate={{
          x: [0, 50, -30, 20, 0],
          y: [0, -40, 30, -20, 0],
          scale: [1, 1.1, 0.95, 1.05, 1],
          opacity: [0.04, 0.06, 0.03, 0.05, 0.04],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, var(--primary-brand) 0%, transparent 70%)",
        }}
      />

      {/* Secondary Drifting Node - Medium, Bottom Left */}
      <motion.div
        animate={{
          x: [0, -40, 30, -20, 0],
          y: [0, 50, -30, 40, 0],
          scale: [1, 0.9, 1.1, 0.95, 1],
          opacity: [0.03, 0.05, 0.02, 0.04, 0.03],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, var(--primary-brand) 0%, transparent 70%)",
        }}
      />

      {/* Tertiary Drifting Node - Small, Center Right */}
      <motion.div
        animate={{
          x: [0, 30, -20, 40, 0],
          y: [0, -30, 50, -20, 0],
          scale: [1, 1.15, 0.9, 1.05, 1],
          opacity: [0.025, 0.04, 0.02, 0.035, 0.025],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        className="absolute top-1/2 -right-16 w-[300px] h-[300px] rounded-full"
        style={{
          background: "radial-gradient(circle, var(--secondary-accent) 0%, transparent 70%)",
        }}
      />

      {/* Quaternary Drifting Node - Tiny, Top Left */}
      <motion.div
        animate={{
          x: [0, 25, -35, 15, 0],
          y: [0, 35, -25, 45, 0],
          scale: [1, 1.2, 0.85, 1.1, 1],
          opacity: [0.02, 0.035, 0.015, 0.03, 0.02],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 6,
        }}
        className="absolute top-1/4 left-1/4 w-[200px] h-[200px] rounded-full"
        style={{
          background: "radial-gradient(circle, var(--primary-brand) 0%, transparent 70%)",
        }}
      />

      {/* Fifth Drifting Node - Medium, Lower Center */}
      <motion.div
        animate={{
          x: [0, -20, 40, -30, 0],
          y: [0, 20, -35, 25, 0],
          scale: [1, 0.95, 1.08, 0.92, 1],
          opacity: [0.02, 0.04, 0.025, 0.035, 0.02],
        }}
        transition={{
          duration: 17,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 8,
        }}
        className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[350px] h-[350px] rounded-full"
        style={{
          background: "radial-gradient(circle, var(--primary-brand) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
