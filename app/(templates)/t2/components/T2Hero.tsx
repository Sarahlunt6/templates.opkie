"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { AnimatedCounter } from "@/components/premium";
import T2MagneticButton from "./T2MagneticButton";
import { practice, location, bookingHref, telHref, EASE } from "./t2-lib";

/* ────────────────────────────────────────────────────────────────
   T2 Hero — cinematic parallax video with the signature scanline.
   A thin Ice beam sweeps the frame; a wireframe/data overlay is
   revealed only in a band around the beam, as if the scanner is
   reading the room.
   ──────────────────────────────────────────────────────────────── */

const TELEMETRY = [
  { value: 0.1, decimals: 1, suffix: " mm", label: "scan resolution" },
  { value: 12, decimals: 0, suffix: " min", label: "crown mill time" },
  { value: 1, decimals: 0, suffix: " visit", label: "most crowns, start to seat" },
];

export default function T2Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  // Scroll-linked parallax on the video plate
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  // Scan beam position, 0–100 (% of width). Starts off-frame.
  const beam = useMotionValue(-12);
  const beamLeft = useTransform(beam, (v) => `${v}%`);
  const beamOpacity = useTransform(beam, (v) => (v < -8 || v > 108 ? 0 : 1));
  // Wireframe overlay revealed in a band trailing the beam
  const overlayClip = useTransform(beam, (v) => {
    const lead = Math.min(100, Math.max(0, v));
    const trail = Math.min(100, Math.max(0, v - 26));
    return `inset(0% ${100 - lead}% 0% ${trail}%)`;
  });

  useEffect(() => {
    if (reduced) return;
    const controls = animate(beam, 112, {
      duration: 6,
      ease: "linear",
      repeat: Infinity,
      repeatDelay: 3.2,
      repeatType: "loop",
      delay: 1.1,
    });
    return () => controls.stop();
  }, [beam, reduced]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] flex flex-col overflow-hidden"
      aria-label={`${practice.globalPracticeName} — digital dentistry in ${location.cityServed}`}
    >
      {/* ── Video plate with parallax ── */}
      <motion.div
        className="absolute inset-0"
        style={reduced ? undefined : { y: videoY, scale: videoScale }}
        aria-hidden="true"
      >
        <video
          className="h-full w-full object-cover"
          src="/videos/hero-ambient-t2.mp4"
          poster="/images/office-interior.jpg"
          autoPlay
          muted
          loop
          playsInline
        />
        {/* Grade: cool, dark, precise */}
        <div className="absolute inset-0 bg-[#0A0C10]/72" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C10] via-transparent to-[#0A0C10]/70" />
      </motion.div>

      {/* ── Scan overlay: wireframe revealed around the beam ── */}
      {!reduced ? (
        <>
          <motion.div
            className="t2p-wireframe absolute inset-0 pointer-events-none"
            style={{ clipPath: overlayClip, opacity: 0.5 }}
            aria-hidden="true"
          />
          <motion.div
            className="t2p-beam-v absolute top-0 bottom-0 w-px pointer-events-none"
            style={{ left: beamLeft, opacity: beamOpacity }}
            aria-hidden="true"
          />
        </>
      ) : (
        <div
          className="t2p-wireframe absolute inset-0 opacity-[0.12] pointer-events-none"
          aria-hidden="true"
        />
      )}

      {/* ── Top coordinate strip ── */}
      <div className="relative z-10 pt-24 md:pt-28 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between border-b border-[var(--t2p-line)] pb-4">
          <span className="t2p-mono text-[0.625rem] md:text-[0.6875rem] uppercase tracking-[0.2em] text-[var(--t2p-text-50)]">
            {location.cityServed}, {location.stateServed}
          </span>
          <span className="hidden sm:flex items-center gap-2.5">
            <span className="t2p-dot rounded-full" aria-hidden="true" />
            <span className="t2p-mono text-[0.625rem] md:text-[0.6875rem] uppercase tracking-[0.2em] text-[var(--t2p-text-70)]">
              Accepting new patients
            </span>
          </span>
          <span className="t2p-mono text-[0.625rem] md:text-[0.6875rem] uppercase tracking-[0.2em] text-[var(--t2p-text-50)]">
            Digital dentistry
          </span>
        </div>
      </div>

      {/* ── Headline block ── */}
      <motion.div
        className="relative z-10 flex-1 flex items-center px-6 md:px-12"
        style={reduced ? undefined : { opacity: contentOpacity }}
      >
        <div className="max-w-7xl mx-auto w-full py-16">
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15, ease: EASE }}
            className="t2p-label mb-6"
          >
            {practice.globalPracticeName}
          </motion.p>

          <h1 className="font-innovator font-medium tracking-[-0.03em] leading-[0.98] text-[clamp(2.4rem,1.4rem+5.5vw,5.6rem)] max-w-5xl">
            {["Dentistry, measured", "to a tenth of a millimeter."].map(
              (line, i) => (
                <span key={line} className="block overflow-hidden">
                  <motion.span
                    className="block"
                    initial={reduced ? false : { y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.7, delay: 0.25 + i * 0.12, ease: EASE }}
                  >
                    {i === 1 ? <span className="t2p-duotext">{line}</span> : line}
                  </motion.span>
                </span>
              ),
            )}
          </h1>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.55, ease: EASE }}
            className="mt-7 text-base md:text-lg text-[var(--t2p-text-70)] max-w-xl leading-relaxed"
          >
            3D imaging, same-day ceramic crowns, and guide-planned implants —
            in {location.cityServed}. Scanned, designed, and delivered under
            one roof.
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.68, ease: EASE }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <T2MagneticButton
              href={bookingHref}
              className="t2p-btn t2p-btn-primary"
              magneticRadius={110}
              magneticStrength={0.4}
            >
              <span>Book a visit</span>
              <span aria-hidden="true">→</span>
            </T2MagneticButton>
            <T2MagneticButton
              href={telHref}
              className="t2p-btn t2p-btn-ghost"
              magneticRadius={90}
              magneticStrength={0.3}
            >
              <span>{location.phoneGBP}</span>
            </T2MagneticButton>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Bottom telemetry strip ── */}
      <div className="relative z-10 px-6 md:px-12 pb-8">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85, ease: EASE }}
          className="max-w-7xl mx-auto border-t border-[var(--t2p-line)] pt-6 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6"
        >
          {TELEMETRY.map((t) => (
            <div key={t.label}>
              <p className="t2p-mono text-2xl md:text-3xl text-[var(--t2p-text)]">
                <AnimatedCounter
                  value={t.value}
                  decimals={t.decimals}
                  suffix={t.suffix}
                  duration={1.6}
                />
              </p>
              <p className="t2p-mono mt-1.5 text-[0.625rem] uppercase tracking-[0.18em] text-[var(--t2p-text-50)]">
                {t.label}
              </p>
            </div>
          ))}
          {practice.trustSignals.hasSameDayEmergency && (
            <div>
              <p className="t2p-mono text-2xl md:text-3xl text-[var(--t2p-ice)]">
                Same day
              </p>
              <p className="t2p-mono mt-1.5 text-[0.625rem] uppercase tracking-[0.18em] text-[var(--t2p-text-50)]">
                emergency appointments
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
