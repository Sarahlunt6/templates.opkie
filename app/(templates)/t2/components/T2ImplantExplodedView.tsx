"use client";

import { useRef, useMemo, useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import * as THREE from "three";
import { motion, useScroll } from "framer-motion";

// Dynamic imports for Three.js components to avoid SSR issues
const Canvas = dynamic(
  () => import("@react-three/fiber").then((mod) => mod.Canvas),
  { ssr: false }
);

const OrbitControls = dynamic(
  () => import("@react-three/drei").then((mod) => mod.OrbitControls),
  { ssr: false }
);

const PerspectiveCamera = dynamic(
  () => import("@react-three/drei").then((mod) => mod.PerspectiveCamera),
  { ssr: false }
);

const Html = dynamic(
  () => import("@react-three/drei").then((mod) => mod.Html),
  { ssr: false }
);

// Import useFrame hook separately
let useFrame: any;
if (typeof window !== "undefined") {
  useFrame = require("@react-three/fiber").useFrame;
}

/**
 * 3D Dental Implant Component with Exploded View Animation
 * Deconstructs into: Crown, Abutment, and Screw with micro-threads
 */
function ImplantModel({ scrollProgress }: { scrollProgress: number }) {
  const crownRef = useRef<THREE.Mesh>(null);
  const abutmentRef = useRef<THREE.Mesh>(null);
  const screwRef = useRef<THREE.Mesh>(null);
  const threadsRef = useRef<THREE.Group>(null);

  // Smooth interpolation for exploded positions
  const crownY = useMemo(() => scrollProgress * 3, [scrollProgress]);
  const abutmentY = useMemo(() => scrollProgress * 1.5, [scrollProgress]);
  const screwScale = useMemo(() => 1 + scrollProgress * 0.3, [scrollProgress]);
  const threadExpansion = useMemo(() => scrollProgress * 2, [scrollProgress]);

  if (useFrame) {
    useFrame(() => {
      if (crownRef.current) {
        crownRef.current.position.y = crownY;
        crownRef.current.rotation.y += 0.002;
      }
      if (abutmentRef.current) {
        abutmentRef.current.position.y = abutmentY;
        abutmentRef.current.rotation.y += 0.001;
      }
      if (screwRef.current) {
        screwRef.current.scale.set(screwScale, screwScale, screwScale);
        screwRef.current.rotation.y += 0.003;
      }
      if (threadsRef.current) {
        threadsRef.current.children.forEach((thread, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const radius = 0.5 + threadExpansion * 0.3;
          thread.position.x = Math.cos(angle) * radius;
          thread.position.z = Math.sin(angle) * radius;
        });
      }
    });
  }

  // Create micro-threads geometry
  const threads = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      position: [0, -1.5 + i * 0.3, 0] as [number, number, number],
      key: i,
    }));
  }, []);

  return (
    <group>
      {/* Crown - Porcelain White with Translucency */}
      <mesh ref={crownRef} position={[0, 1, 0]} castShadow>
        <coneGeometry args={[0.6, 1.2, 32]} />
        <meshPhysicalMaterial
          color="#f8f8f8"
          metalness={0.1}
          roughness={0.2}
          transmission={0.1}
          thickness={0.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
        {scrollProgress > 0.2 && (
          <Html position={[1.2, 0, 0]} center distanceFactor={8}>
            <div className="pointer-events-none">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="backdrop-blur-sm bg-neutral-950/60 border border-teal-500/30 rounded-lg px-3 py-2 whitespace-nowrap"
              >
                <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-teal-400">
                  Porcelain Crown
                </p>
                <p className="text-[8px] text-neutral-400 mt-0.5">Natural Aesthetics</p>
              </motion.div>
              <svg
                className="absolute right-full top-1/2 -translate-y-1/2 mr-1"
                width="20"
                height="2"
                viewBox="0 0 20 2"
              >
                <line
                  x1="0"
                  y1="1"
                  x2="20"
                  y2="1"
                  stroke="rgba(20,184,166,0.4)"
                  strokeWidth="1"
                  strokeDasharray="2,2"
                />
              </svg>
            </div>
          </Html>
        )}
      </mesh>

      {/* Abutment Post - Metallic Connector */}
      <mesh ref={abutmentRef} position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.4, 0.8, 32]} />
        <meshStandardMaterial
          color="#c0c0c0"
          metalness={0.9}
          roughness={0.2}
          emissive="#14b8a6"
          emissiveIntensity={0.1}
        />
        {scrollProgress > 0.4 && (
          <Html position={[-1.5, 0, 0]} center distanceFactor={8}>
            <div className="pointer-events-none">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="backdrop-blur-sm bg-neutral-950/60 border border-cyan-500/30 rounded-lg px-3 py-2 whitespace-nowrap"
              >
                <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-cyan-400">
                  Abutment Post
                </p>
                <p className="text-[8px] text-neutral-400 mt-0.5">Precision Fit</p>
              </motion.div>
              <svg
                className="absolute left-full top-1/2 -translate-y-1/2 ml-1"
                width="20"
                height="2"
                viewBox="0 0 20 2"
              >
                <line
                  x1="0"
                  y1="1"
                  x2="20"
                  y2="1"
                  stroke="rgba(6,182,212,0.4)"
                  strokeWidth="1"
                  strokeDasharray="2,2"
                />
              </svg>
            </div>
          </Html>
        )}
      </mesh>

      {/* Titanium Screw - Main Body */}
      <mesh ref={screwRef} position={[0, -1, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.25, 0.15, 2, 32]} />
        <meshStandardMaterial
          color="#8a8a8a"
          metalness={0.95}
          roughness={0.15}
          emissive="#14b8a6"
          emissiveIntensity={0.15}
        />
        {scrollProgress > 0.6 && (
          <Html position={[1.8, 0, 0]} center distanceFactor={8}>
            <div className="pointer-events-none">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="backdrop-blur-sm bg-neutral-950/60 border border-emerald-500/30 rounded-lg px-3 py-2 whitespace-nowrap"
              >
                <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-emerald-400">
                  Biocompatible Titanium
                </p>
                <p className="text-[8px] text-neutral-400 mt-0.5">Grade 5 Alloy</p>
              </motion.div>
              <svg
                className="absolute right-full top-1/2 -translate-y-1/2 mr-1"
                width="30"
                height="2"
                viewBox="0 0 30 2"
              >
                <line
                  x1="0"
                  y1="1"
                  x2="30"
                  y2="1"
                  stroke="rgba(16,185,129,0.4)"
                  strokeWidth="1"
                  strokeDasharray="2,2"
                />
              </svg>
            </div>
          </Html>
        )}
      </mesh>

      {/* Micro-Threads - Expanding Detail */}
      <group ref={threadsRef}>
        {threads.map((thread) => (
          <mesh key={thread.key} position={thread.position} castShadow>
            <torusGeometry args={[0.15, 0.02, 8, 16]} />
            <meshStandardMaterial
              color="#707070"
              metalness={1}
              roughness={0.1}
              emissive="#0ea5e9"
              emissiveIntensity={scrollProgress > 0.7 ? 0.3 : 0.1}
            />
          </mesh>
        ))}
      </group>

      {/* Micro-Threads Label */}
      {scrollProgress > 0.7 && (
        <Html position={[-2, -1.5, 0]} center distanceFactor={8}>
          <div className="pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="backdrop-blur-sm bg-neutral-950/60 border border-sky-500/30 rounded-lg px-3 py-2 whitespace-nowrap"
            >
              <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-sky-400">
                Micro-Threads
              </p>
              <p className="text-[8px] text-neutral-400 mt-0.5">Osseointegration</p>
            </motion.div>
            <svg
              className="absolute left-full top-1/2 -translate-y-1/2 ml-1"
              width="40"
              height="2"
              viewBox="0 0 40 2"
            >
              <line
                x1="0"
                y1="1"
                x2="40"
                y2="1"
                stroke="rgba(14,165,233,0.4)"
                strokeWidth="1"
                strokeDasharray="2,2"
              />
            </svg>
          </div>
        </Html>
      )}

      {/* Ambient Lighting */}
      <ambientLight intensity={0.4} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        castShadow
        color="#14b8a6"
      />
      <spotLight
        position={[-10, -10, -10]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        color="#06b6d4"
      />
      <pointLight position={[0, 5, 5]} intensity={0.5} color="#0ea5e9" />
    </group>
  );
}

/**
 * Main 3D Implant Exploded View Scene
 * Integrated with T2's smoked obsidian design system
 */
export default function T2ImplantExplodedView() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollValue, setScrollValue] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setScrollValue(latest);
    });
  }, [scrollYProgress]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[200vh] bg-zinc-950 overflow-hidden"
    >
      {/* Sticky 3D Canvas Container */}
      <div className="sticky top-0 h-screen flex items-center justify-center">
        {/* Background Grid Overlay */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(20,184,166,0.2) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(20,184,166,0.2) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />

        {/* 3D Canvas */}
        <motion.div
          className="relative w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {typeof window !== "undefined" && (
            <Canvas
              shadows
              dpr={[1, 2]}
              camera={{ position: [4, 2, 6], fov: 50 }}
              gl={{
                alpha: true,
                antialias: true,
                powerPreference: "high-performance",
              }}
            >
              <PerspectiveCamera makeDefault position={[4, 2, 6]} fov={50} />
              <color attach="background" args={["#0a0a0a"]} />
              <fog attach="fog" args={["#0a0a0a", 5, 20]} />

              <ImplantModel scrollProgress={scrollValue} />

              <OrbitControls
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 1.5}
                autoRotate
                autoRotateSpeed={0.5}
              />
            </Canvas>
          )}
        </motion.div>

        {/* Overlay Content - Sticky Text */}
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-12">
          {/* Top Section Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <span className="text-[11px] tracking-[0.3em] text-teal-400 uppercase font-medium">
              Advanced Technology
            </span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mt-4 mb-4">
              Dental Implant Anatomy
            </h2>
            <p className="text-base text-neutral-400 leading-relaxed">
              Explore the precision-engineered components of a modern dental implant.
              Scroll to see the exploded view.
            </p>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-6"
          >
            <motion.a
              href="#consultation"
              className="pointer-events-auto inline-flex items-center gap-3 px-8 py-4 bg-teal-600 hover:bg-teal-500 text-white font-semibold text-sm uppercase tracking-[0.15em] rounded-xl transition-all duration-300 shadow-[0_0_30px_rgba(20,184,166,0.3)]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Schedule Consultation</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </motion.a>

            <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">
              Scroll to Explore →
            </div>
          </motion.div>
        </div>

        {/* Progress Indicator */}
        <motion.div
          className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="h-32 w-[2px] bg-neutral-800 rounded-full overflow-hidden">
            <motion.div
              className="w-full bg-gradient-to-b from-teal-500 to-cyan-500 origin-top"
              style={{
                transform: `scaleY(${scrollValue})`,
              }}
            />
          </div>
          <span className="text-[8px] uppercase tracking-wider text-neutral-600">
            Progress
          </span>
        </motion.div>
      </div>
    </section>
  );
}
