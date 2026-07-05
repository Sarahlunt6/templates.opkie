"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { practice, EASE } from "./t2-lib";

/* ────────────────────────────────────────────────────────────────
   Care band — the human beat between the cinematic hero and the
   technology sections. One warm photograph, one plain sentence:
   the machines are for accuracy; the people are for you.
   ──────────────────────────────────────────────────────────────── */

export default function T2CareBand() {
  const reduced = useReducedMotion();

  return (
    <section
      aria-label="The people behind the technology"
      className="relative px-6 py-20 md:px-12 md:py-24"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="lg:col-span-5"
        >
          <div className="t2p-portrait relative aspect-[16/11] overflow-hidden rounded-2xl border border-[var(--t2p-line-strong)]">
            <span className="t2p-hud-dot absolute top-4 right-4 z-10" aria-hidden="true" />
            <Image
              src="/images/team-ortho.jpeg"
              alt={`The team at ${practice.globalPracticeName}`}
              fill
              loading="lazy"
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
        </motion.div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="lg:col-span-7"
        >
          <p className="font-innovator text-[clamp(1.5rem,1.2rem+1.8vw,2.5rem)] font-medium leading-[1.15] tracking-[-0.01em] text-[var(--t2p-text)]">
            The machines are for accuracy.{" "}
            <span className="t2p-duotext">The people are for you.</span>
          </p>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--t2p-text-70)] md:text-lg">
            Every scan is read by a clinician who knows your name, explains
            what they see in plain language, and never starts before your
            questions run out.
          </p>
          <a
            href="#doctors"
            className="t2p-mono mt-7 inline-flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.16em] text-[var(--t2p-volt)] transition-opacity duration-300 hover:opacity-75"
          >
            Meet your doctors <span aria-hidden="true">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
