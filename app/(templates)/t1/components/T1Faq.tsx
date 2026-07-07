"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Fade, T1_EASE } from "./T1Motion";
import type { FaqItem } from "@/types/dentist";

/**
 * T1 PRESS — the FAQ as a ruled editorial Q&A. Mono red index, Anton
 * question set on hairline rows; the answer expands on click. First one
 * open by default so the section never reads as a wall of closed rows.
 */
export default function T1Faq({ faqs }: { faqs: FaqItem[] }) {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState<string | null>(faqs[0]?.id ?? null);

  if (faqs.length === 0) return null;

  return (
    <Fade>
      <dl className="border-t border-[rgba(26,23,19,0.15)]">
        {faqs.map((f, i) => {
          const isOpen = open === f.id;
          const panelId = `t1-faq-${f.id}`;
          return (
            <div key={f.id} className="border-b border-[rgba(26,23,19,0.15)]">
              <dt>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : f.id)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="group flex w-full items-baseline gap-4 py-5 text-left md:gap-8 md:py-6"
                >
                  <span className="t1-mono-label t1-mono-label-red shrink-0">
                    [ {String(i + 1).padStart(2, "0")} ]
                  </span>
                  <span className="flex-1 font-t1-press text-xl uppercase leading-tight text-[#1A1713] transition-colors duration-300 group-hover:text-[#D92B21] md:text-2xl">
                    {f.question}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`t1-mono-label t1-mono-label-stone shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
              </dt>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.dd
                    id={panelId}
                    initial={reduced ? { opacity: 1 } : { height: 0, opacity: 0 }}
                    animate={reduced ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                    exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: T1_EASE }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-3xl pb-6 pl-[3.25rem] font-sans text-[15px] leading-[1.8] text-[#6B675E] md:pl-[4.75rem] md:text-base">
                      {f.answer}
                    </p>
                  </motion.dd>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </dl>
    </Fade>
  );
}
