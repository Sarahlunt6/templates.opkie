"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { FaqItem } from "@/types/dentist";
import T4Reveal, { T4RuleDraw, ATELIER_EASE } from "./T4Reveal";

interface T4FaqProps {
  faqs: FaqItem[];
}

function FaqRow({ faq, index }: { faq: FaqItem; index: number }) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const panelId = `t4-faq-panel-${faq.id}`;
  const buttonId = `t4-faq-button-${faq.id}`;

  return (
    <T4Reveal delay={Math.min(index * 0.05, 0.3)}>
      <div className="border-b border-[var(--t4-line-light)]">
        <h3>
          <button
            id={buttonId}
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen(!open)}
            className="group flex w-full items-baseline justify-between gap-6 py-7 text-left"
          >
            <span className="t4-display text-[1.2rem] leading-snug text-[#241a12] transition-colors duration-300 group-hover:text-[var(--t4-brass-ink)] lg:text-[1.35rem]">
              {faq.question}
            </span>
            <span
              aria-hidden
              className="t4-numeral relative top-[-2px] shrink-0 text-[1.5rem] font-light leading-none text-[var(--t4-brass-ink)] transition-transform duration-500"
              style={{
                transform: open ? "rotate(45deg)" : "rotate(0deg)",
              }}
            >
              +
            </span>
          </button>
        </h3>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              initial={reduced ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={reduced ? { height: 0, opacity: 0, transition: { duration: 0 } } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.55, ease: ATELIER_EASE }}
              className="overflow-hidden"
            >
              <p className="max-w-2xl pb-8 font-t4-body text-[0.98rem] font-light leading-relaxed text-[var(--t4-espresso-soft)]">
                {faq.answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </T4Reveal>
  );
}

export default function T4Faq({ faqs }: T4FaqProps) {
  return (
    <section id="questions" className="t4-salon relative py-24 lg:py-36">
      <div className="mx-auto max-w-[88rem] px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-3">
            <T4Reveal className="lg:sticky lg:top-32">
              <p className="t4-label text-[var(--t4-brass-ink)]">Questions</p>
              <T4RuleDraw className="mt-5 w-16" />
            </T4Reveal>
          </div>

          <div className="lg:col-span-8 lg:col-start-5">
            <T4Reveal>
              <h2 className="t4-display t4-display-lg text-[#241a12]">
                Asked, answered,{" "}
                <em className="italic text-[var(--t4-brass-ink)]">
                  in plain terms.
                </em>
              </h2>
            </T4Reveal>

            <div className="mt-12 border-t border-[var(--t4-line-light)]">
              {faqs.map((faq, i) => (
                <FaqRow key={faq.id} faq={faq} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
