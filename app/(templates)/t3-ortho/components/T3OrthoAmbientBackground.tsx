"use client";

import { motion } from "framer-motion";

export default function T3OrthoAmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Drifting Gradient Nodes */}
      {[
        { x: "10%", y: "20%", size: 300, delay: 0, color: "var(--primary-brand)" },
        { x: "80%", y: "15%", size: 250, delay: 2, color: "var(--secondary-accent)" },
        { x: "70%", y: "70%", size: 350, delay: 4, color: "var(--primary-brand)" },
        { x: "20%", y: "80%", size: 280, delay: 1, color: "var(--secondary-accent)" },
        { x: "50%", y: "50%", size: 400, delay: 3, color: "var(--primary-brand)" },
      ].map((node, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            left: node.x,
            top: node.y,
            width: node.size,
            height: node.size,
            background: `radial-gradient(circle, ${node.color}08 0%, transparent 70%)`,
            filter: "blur(60px)",
          }}
          animate={{
            x: [0, 30, -20, 10, 0],
            y: [0, -20, 30, -10, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
            opacity: [0.3, 0.5, 0.4, 0.6, 0.3],
          }}
          transition={{
            duration: 15 + index * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: node.delay,
          }}
        />
      ))}
    </div>
  );
}
