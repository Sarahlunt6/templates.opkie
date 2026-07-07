"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionHeader } from "./T2Kit";
import { practice, EASE } from "./t2-lib";
import T2FinancingCalculator from "./T2FinancingCalculator";

/* ────────────────────────────────────────────────────────────────
   Financing & insurance — the affordability instrument. The payment
   configurator up top, then accepted-coverage and membership readouts.
   Owns the cost story so the Visit section can stay about logistics.
   ──────────────────────────────────────────────────────────────── */

export default function T2Financing() {
  const reduced = useReducedMotion();

  return (
    <section
      id="financing"
      className="relative py-24 md:py-32 px-6 md:px-12 scroll-mt-20"
    >
      <div
        className="t2p-blueprint absolute inset-0 pointer-events-none"
        aria-hidden="true"
      />
      <div className="relative max-w-7xl mx-auto">
        <SectionHeader
          index="16"
          label="Financing & insurance"
          title={
            <>
              Care that <span className="t2p-duotext">fits the budget.</span>
            </>
          }
          lede="Model a monthly payment, confirm your coverage, and see the membership option — no obligation, and no surprises at checkout."
        />

        <T2FinancingCalculator />

        {/* Coverage + membership readouts */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="rounded-2xl border border-[var(--t2p-line)] bg-[var(--t2p-bg)] p-7 md:p-8"
          >
            <p className="t2p-label mb-3.5">Insurance</p>
            <p className="text-sm leading-relaxed text-[var(--t2p-text-70)]">
              {practice.trustSignals.insuranceAcceptedText}
            </p>
          </motion.div>
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
            className="rounded-2xl border border-[var(--t2p-line)] bg-[var(--t2p-bg)] p-7 md:p-8"
          >
            <p className="t2p-label mb-3.5">No insurance?</p>
            <p className="text-sm leading-relaxed text-[var(--t2p-text-70)]">
              {practice.trustSignals.membershipPlanSummary}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
