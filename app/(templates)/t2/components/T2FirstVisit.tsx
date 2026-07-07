"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionHeader } from "./T2Kit";
import { EASE } from "./t2-lib";

/* ────────────────────────────────────────────────────────────────
   First visit — the intake sequence, read like a four-stage routine.
   Mono stage indices, a scan-line connector across the top on desktop,
   node markers, and a short readout per stage.
   ──────────────────────────────────────────────────────────────── */

const STEPS = [
  {
    title: "Reach out",
    note: "Call or book online. A real person answers, and urgent cases are seen the same day.",
  },
  {
    title: "Meet your dentist",
    note: "An unhurried introduction. Every step gets explained before it happens — never after.",
  },
  {
    title: "Gentle care begins",
    note: "Numbing that starts slow and is checked twice. A raised hand pauses everything.",
  },
  {
    title: "Leave with a plan",
    note: "What's needed, what's optional, and what it costs — in writing, before you commit.",
  },
];

export default function T2FirstVisit() {
  const reduced = useReducedMotion();

  return (
    <section
      id="first-visit"
      className="relative py-24 md:py-32 px-6 md:px-12 scroll-mt-20"
    >
      <div
        className="t2p-blueprint absolute inset-0 pointer-events-none"
        aria-hidden="true"
      />
      <div className="relative max-w-7xl mx-auto">
        <SectionHeader
          index="14"
          label="Your first visit"
          title={
            <>
              What the first <span className="t2p-duotext">visit looks like.</span>
            </>
          }
          lede="No mystery, no surprises — four calm stages from the first call to a written plan."
        />

        <div className="relative">
          {/* Scan-line connector — desktop, behind the node row */}
          <div
            className="absolute left-0 right-0 top-[7px] hidden md:block"
            aria-hidden="true"
          >
            <div className="mx-[12.5%] h-px bg-[var(--t2p-line)]" />
            <motion.div
              className="absolute left-[12.5%] top-0 h-px"
              style={{
                background: "var(--t2p-scan)",
                boxShadow: "0 0 8px rgba(56, 189, 248, 0.5)",
              }}
              initial={reduced ? { width: "75%" } : { width: 0 }}
              whileInView={{ width: "75%" }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.2, ease: EASE }}
            />
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-6">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={reduced ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
              >
                {/* Node marker */}
                <span
                  className="block h-3.5 w-3.5 rounded-full border-2 border-[var(--t2p-blue)] bg-[var(--t2p-bg)]"
                  aria-hidden="true"
                />
                <p className="t2p-mono mt-5 text-[0.625rem] uppercase tracking-[0.2em] text-[var(--t2p-blue)]">
                  Stage {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-innovator mt-2 text-lg md:text-xl font-medium tracking-tight text-[var(--t2p-text)]">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[var(--t2p-text-70)]">
                  {step.note}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
