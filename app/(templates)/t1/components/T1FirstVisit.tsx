"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Fade, T1_EASE } from "./T1Motion";

/** The visit, in four steps — template voice */
const STEPS = [
  {
    title: "Reach out",
    note: "Call or book online. A real person answers, and urgent cases are triaged the same day.",
  },
  {
    title: "Plan your visit",
    note: "Insurance is verified before you arrive, so the first conversation is about teeth, not paperwork.",
  },
  {
    title: "Sit down with the doctor",
    note: "An unhurried first hour — photographs, honest answers, and nothing sold.",
  },
  {
    title: "Leave with a plan",
    note: "What is possible, what is necessary, and what is neither — in writing, with numbers.",
  },
];

/**
 * T1 PRESS — the first visit as a staggered four-step application line on a
 * hairline spine, red node bullets, each note expanding on click (titles
 * always read, so nothing essential hides).
 */
export default function T1FirstVisit() {
  const reduced = useReducedMotion();
  const [openStep, setOpenStep] = useState<number | null>(0);

  return (
    <ol className="relative" aria-label="How a first visit works">
      {STEPS.map((step, i) => {
        const open = openStep === i;
        const panelId = `t1-step-panel-${i}`;
        return (
          <li
            key={step.title}
            className="relative border-l border-[rgba(26,23,19,0.15)] pb-10 pl-6 last:pb-2 md:pl-10"
          >
            <span
              aria-hidden="true"
              className={`absolute -left-[5px] top-1 h-[9px] w-[9px] bg-[#D92B21] transition-transform duration-300 ${
                open ? "scale-150" : ""
              }`}
            />
            <Fade delay={i * 0.06}>
              <div className={`max-w-xl ${i % 2 === 1 ? "md:ml-[14%]" : ""}`}>
                <button
                  type="button"
                  onClick={() => setOpenStep(open ? null : i)}
                  aria-expanded={open}
                  aria-controls={panelId}
                  className="group block w-full text-left"
                >
                  <p className="t1-mono-label t1-mono-label-red">[ 0{i + 1} ]</p>
                  <span className="mt-2 flex items-baseline justify-between gap-4">
                    <span className="font-t1-press text-2xl uppercase leading-none text-[#1A1713] transition-colors duration-300 group-hover:text-[#D92B21] md:text-3xl">
                      {step.title}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`t1-mono-label t1-mono-label-stone shrink-0 transition-transform duration-300 ${
                        open ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      key="note"
                      id={panelId}
                      initial={reduced ? { opacity: 1 } : { height: 0, opacity: 0 }}
                      animate={reduced ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                      exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: T1_EASE }}
                      className="overflow-hidden"
                    >
                      <p className="mt-2 font-sans text-sm leading-relaxed text-[#6B675E] md:text-base">
                        {step.note}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Fade>
          </li>
        );
      })}
    </ol>
  );
}
