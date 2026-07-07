"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionHeader } from "./T2Kit";
import { practice, EASE } from "./t2-lib";

/* ────────────────────────────────────────────────────────────────
   Comfort & sedation — anxiety handled like a protocol. A plain
   reassurance beside a panel of comfort measures, each a calibrated
   control. Sedation leads when the practice offers it.
   ──────────────────────────────────────────────────────────────── */

const MEASURES = [
  {
    title: "Pause on a raised hand",
    note: "Lift a hand and everything stops — mid-anything, no explanation needed.",
  },
  {
    title: "Blankets & headphones",
    note: "Your playlist, noise-cancelling headphones, and a blanket if you want one.",
  },
  {
    title: "Breaks on demand",
    note: "Stretch, sip water, step out. Every appointment has slack built in.",
  },
];

export default function T2Comfort() {
  const reduced = useReducedMotion();
  const hasSedation = practice.trustSignals.hasSedationAnxietyCare;

  const measures = hasSedation
    ? [
        {
          title: "Sedation, calibrated to you",
          note: "From a light edge-off to sleeping through the visit — you set the level, we plan around it.",
        },
        ...MEASURES,
      ]
    : MEASURES;

  return (
    <section
      id="comfort"
      className="relative py-24 md:py-32 px-6 md:px-12 bg-[var(--t2p-surface)] scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          index="15"
          label="Comfort & sedation"
          title={
            <>
              Nerves, <span className="t2p-duotext">engineered out.</span>
            </>
          }
          lede="A lot of our patients haven't been in years — there's no judgment here. The protocol below removes the guesswork: you always know what's next, and one raised hand stops everything."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start">
          {/* Reassurance */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="lg:pt-4"
          >
            <p className="text-lg md:text-xl leading-relaxed text-[var(--t2p-text-70)] max-w-md">
              If your heart rate climbs in the parking lot, you&rsquo;re exactly
              who this practice was designed for. Nobody asks why it&rsquo;s been
              a while. Nobody starts before you&rsquo;re ready.
            </p>
            {hasSedation && (
              <p className="t2p-mono mt-6 text-[0.625rem] uppercase tracking-[0.18em] text-[var(--t2p-text-50)]">
                <span className="text-[var(--t2p-blue)]">＋</span> Sedation
                available for every level of worry
              </p>
            )}
          </motion.div>

          {/* Comfort protocol panel */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.08, ease: EASE }}
            className="rounded-2xl border border-[var(--t2p-line)] bg-[var(--t2p-bg)] p-2 md:p-3"
          >
            <p className="t2p-label px-5 pt-4 pb-2">The comfort protocol</p>
            <ul>
              {measures.map((m) => (
                <li
                  key={m.title}
                  className="flex items-start gap-4 px-5 py-4 border-t border-[var(--t2p-line)]"
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--t2p-scan)]"
                    aria-hidden="true"
                  />
                  <span>
                    <span className="block text-sm md:text-base font-medium text-[var(--t2p-text)]">
                      {m.title}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-[var(--t2p-text-70)]">
                      {m.note}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
