"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import T2MagneticButton from "./T2MagneticButton";
import { practice, location, bookingHref, telHref, EASE } from "./t2-lib";

/* ────────────────────────────────────────────────────────────────
   Final CTA — "Begin your scan." The motif closes where it opened:
   one last beam sweep across a full-bleed office frame.
   ──────────────────────────────────────────────────────────────── */

export default function T2FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduced = useReducedMotion();

  return (
    <section
      id="book"
      ref={ref}
      className="relative min-h-[70vh] flex items-center overflow-hidden scroll-mt-20"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/office-interior.jpg"
          alt=""
          fill
          loading="lazy"
          className="object-cover saturate-[0.4]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#0A0C10]/88" />
        <div className="t2p-wireframe absolute inset-0 opacity-[0.08]" />
      </div>

      {/* Closing beam sweep */}
      {inView && !reduced && (
        <motion.span
          className="t2p-beam-v absolute top-0 bottom-0 w-px z-10 pointer-events-none"
          initial={{ left: "-4%", opacity: 1 }}
          animate={{ left: "104%", opacity: [1, 1, 0] }}
          transition={{ duration: 2.2, ease: "linear", delay: 0.3 }}
          aria-hidden="true"
        />
      )}

      <div className="relative z-10 w-full px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE }}
            className="t2p-label"
          >
            08 — Intake
          </motion.p>

          <motion.h2
            initial={reduced ? false : { opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="font-innovator mt-7 text-4xl md:text-6xl font-medium tracking-[-0.03em] text-[var(--t2p-text)]"
          >
            Begin <span className="t2p-duotext">your scan.</span>
          </motion.h2>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.2, ease: EASE }}
            className="mx-auto mt-6 max-w-xl text-base md:text-lg leading-relaxed text-[var(--t2p-text-70)]"
          >
            Your first visit at {practice.globalPracticeName} starts with a
            full digital scan — and a plan you can see on screen before you
            commit to anything.
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.32, ease: EASE }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <T2MagneticButton
              href={bookingHref}
              className="t2p-btn t2p-btn-primary"
              magneticRadius={120}
              magneticStrength={0.45}
            >
              <span>Book a visit</span>
              <span aria-hidden="true">→</span>
            </T2MagneticButton>
            <T2MagneticButton
              href={telHref}
              className="t2p-btn t2p-btn-ghost"
              magneticRadius={100}
              magneticStrength={0.35}
            >
              <span>{location.phoneGBP}</span>
            </T2MagneticButton>
          </motion.div>

          <motion.p
            initial={reduced ? false : { opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
            className="t2p-mono mt-14 text-[0.625rem] uppercase tracking-[0.2em] text-[var(--t2p-text-50)]"
          >
            Accepting new patients — {location.cityServed}, {location.stateServed}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
