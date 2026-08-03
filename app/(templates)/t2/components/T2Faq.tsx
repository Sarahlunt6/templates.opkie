"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { sampleFaqs } from "@/data/master";
import { SectionHeader } from "./T2Kit";
import { EASE } from "./t2-lib";

/* ────────────────────────────────────────────────────────────────
   FAQ — a query console. Mono question rows; each answer unfolds with
   the same scan-beam sweep the services panels use, keeping the section
   on-motif. Single-open accordion. Content from shared FAQ data.
   ──────────────────────────────────────────────────────────────── */

export default function T2Faq() {
  const reduced = useReducedMotion();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  if (sampleFaqs.length === 0) return null;

  return (
    <section
      id="faq"
      className="relative py-24 md:py-32 px-6 md:px-12 bg-[var(--t2p-surface)] scroll-mt-20"
    >
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          index="18"
          label="Questions & answers"
          title={
            <>
              Answers, <span className="t2p-duotext">before you ask.</span>
            </>
          }
          lede="The things patients most often want to know — coverage, comfort, cost, and what a first visit is actually like."
        />

        <div className="rounded-2xl border border-[var(--t2p-line)] bg-[var(--t2p-bg)] overflow-hidden">
          {sampleFaqs.map((f, i) => {
            const open = openIdx === i;
            const panelId = `t2p-faq-panel-${i}`;
            return (
              <div
                key={f.id}
                className="border-b border-[var(--t2p-line)] last:border-b-0"
              >
                <button
                  onClick={() => setOpenIdx(open ? null : i)}
                  aria-expanded={open}
                  aria-controls={panelId}
                  className="group flex w-full items-center gap-5 md:gap-8 px-5 md:px-8 py-5 md:py-6 text-left transition-colors duration-300 hover:bg-[rgb(var(--t2p-scan-rgb)_/_0.05)]"
                >
                  <span
                    className={`t2p-mono text-[0.6875rem] tracking-[0.18em] transition-colors duration-300 ${
                      open ? "text-[var(--t2p-blue)]" : "text-[var(--t2p-text-50)]"
                    }`}
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-innovator flex-1 text-base md:text-xl font-medium tracking-tight text-[var(--t2p-text)]">
                    {f.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-[var(--t2p-blue)] transition-transform duration-300 ${
                      open ? "rotate-180" : ""
                    }`}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      key="panel"
                      id={panelId}
                      initial={reduced ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduced ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="relative overflow-hidden"
                    >
                      {!reduced && (
                        <motion.span
                          aria-hidden="true"
                          className="pointer-events-none absolute top-0 bottom-0 z-10 w-px"
                          style={{
                            background: "var(--t2p-scan)",
                            boxShadow: "0 0 12px rgb(var(--t2p-scan-rgb) / 0.6)",
                          }}
                          initial={{ left: "0%", opacity: 0 }}
                          animate={{ left: "100%", opacity: [0, 1, 1, 0] }}
                          transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
                        />
                      )}
                      <p className="max-w-3xl px-5 md:px-8 pb-7 md:pb-8 md:pl-[4.5rem] text-sm md:text-[0.9375rem] leading-relaxed text-[var(--t2p-text-70)]">
                        {f.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
