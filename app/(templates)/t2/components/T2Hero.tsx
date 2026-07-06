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
import { practice, location, bookingHref, EASE } from "./t2-lib";
import { sampleReviews } from "@/data/master";

const AVG_RATING = sampleReviews.length
  ? (
      sampleReviews.reduce((sum, r) => sum + r.rating, 0) /
      sampleReviews.length
    ).toFixed(1)
  : null;

/* ────────────────────────────────────────────────────────────────
   T2 Hero — flagship product launch for a dental practice.
   Pill eyebrow, huge Space Grotesk headline with a volt→emerald
   gradient payoff, pill CTAs, and an ArcLight-style stat readout.
   The signature scanline still sweeps the frame; HUD calibration
   dots sit on the imagery like alignment markers on a scan.
   ──────────────────────────────────────────────────────────────── */

const READOUT = [
  {
    value: 0.02,
    decimals: 2,
    suffix: " mm",
    label: "scan accuracy",
  },
  {
    value: 1,
    decimals: 0,
    suffix: " visit",
    label: "same-day crowns",
  },
  // the rating cell only exists when there are reviews to average
  ...(AVG_RATING !== null
    ? [
        {
          value: Number(AVG_RATING),
          decimals: 1,
          suffix: "★",
          label: "patient rating",
        },
      ]
    : []),
];

/* HUD calibration markers, placed over the plate like scan targets */
const HUD_MARKERS = [
  { top: "22%", left: "72%" },
  { top: "58%", left: "86%" },
  { top: "74%", left: "64%" },
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
        {/* Grade: near-black, precise, faint green undertone */}
        <div className="absolute inset-0 bg-[#060806]/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060806] via-[#060806]/45 to-[#060806]/75" />
      </motion.div>

      {/* Radial volt glow from the top-right corner */}
      <div
        className="t2p-corner-glow absolute inset-0 pointer-events-none"
        aria-hidden="true"
      />

      {/* ── Scan overlay: wireframe revealed around the beam ── */}
      {!reduced ? (
        <>
          <motion.div
            className="t2p-wireframe absolute inset-0 pointer-events-none"
            style={{ clipPath: overlayClip, opacity: 0.45 }}
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
          className="t2p-wireframe absolute inset-0 opacity-[0.1] pointer-events-none"
          aria-hidden="true"
        />
      )}

      {/* ── HUD calibration markers on the plate ── */}
      <div
        className="absolute inset-0 hidden md:block pointer-events-none"
        aria-hidden="true"
      >
        {HUD_MARKERS.map((m, i) => (
          <motion.span
            key={i}
            className="t2p-hud-dot absolute"
            style={{ top: m.top, left: m.left }}
            initial={reduced ? false : { opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.2 + i * 0.25, ease: EASE }}
          />
        ))}
      </div>

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
            {practice.globalPracticeName}
          </span>
        </div>
      </div>

      {/* ── Headline block ── */}
      <motion.div
        className="relative z-10 flex-1 flex items-center px-6 md:px-12"
        style={reduced ? undefined : { opacity: contentOpacity }}
      >
        <div className="max-w-7xl mx-auto w-full py-14 md:py-16">
          {/* Pill eyebrow */}
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15, ease: EASE }}
            className="t2p-mono inline-flex items-center gap-2.5 rounded-full border border-[var(--t2p-line-strong)] bg-[rgba(126,224,75,0.06)] px-4 py-2 text-[0.625rem] md:text-[0.6875rem] uppercase tracking-[0.18em] text-[var(--t2p-volt)]"
          >
            <span aria-hidden="true">●</span>
            Digital dentistry 2.0
          </motion.p>

          <h1 className="font-innovator mt-7 font-medium tracking-[-0.03em] leading-[0.98] text-[clamp(2.6rem,1.4rem+5.8vw,5.8rem)] max-w-5xl">
            {["Precision", "you can feel."].map((line, i) => (
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
            ))}
          </h1>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.55, ease: EASE }}
            className="mt-6 text-base md:text-lg text-[var(--t2p-text-70)] max-w-xl leading-relaxed"
          >
            3D imaging, same-day ceramic crowns, and guide-planned implants —
            scanned, designed, and delivered under one roof in{" "}
            {location.cityServed}.
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.68, ease: EASE }}
            className="mt-9 flex flex-wrap items-center gap-4"
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
              href="#technology"
              className="t2p-btn t2p-btn-ghost"
              magneticRadius={90}
              magneticStrength={0.3}
            >
              <span aria-hidden="true" className="text-[0.625rem]">
                ▶
              </span>
              <span>Watch how it works</span>
            </T2MagneticButton>
          </motion.div>

          {/* ── Stat readout strip ── */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.82, ease: EASE }}
            className={`mt-12 max-w-2xl grid ${
              READOUT.length === 3 ? "grid-cols-3" : "grid-cols-2"
            } divide-x divide-[var(--t2p-line)] border-y border-[var(--t2p-line)]`}
          >
            {READOUT.map((s, i) => (
              <div key={s.label} className={i === 0 ? "py-5 pr-4" : "py-5 px-4 md:px-6"}>
                <p className="t2p-mono text-xl md:text-3xl text-[var(--t2p-text)] tracking-tight">
                  <AnimatedCounter
                    value={s.value}
                    decimals={s.decimals}
                    suffix={s.suffix}
                    duration={1.6}
                  />
                </p>
                <p className="t2p-mono mt-1.5 text-[0.5625rem] md:text-[0.625rem] uppercase tracking-[0.18em] text-[var(--t2p-text-50)]">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>

          {practice.trustSignals.hasSameDayEmergency && (
            <motion.p
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1, ease: EASE }}
              className="t2p-mono mt-5 text-[0.625rem] uppercase tracking-[0.18em] text-[var(--t2p-text-50)]"
            >
              <span className="text-[var(--t2p-volt)]">＋</span> Same-day
              emergency appointments held daily
            </motion.p>
          )}
        </div>
      </motion.div>
    </section>
  );
}
