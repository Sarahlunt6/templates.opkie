"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import type { FaqItem } from "@/types/dentist";
import T3Reveal, { HAVEN_EASE } from "./T3Reveal";

interface T3HavenFaqProps {
  faqs: FaqItem[];
}

/**
 * FAQ in the haven register — a soft, hairline-ruled accordion. Questions
 * in calm sans, answers unfold gently. One open at a time keeps it quiet.
 */
export default function T3HavenFaq({ faqs }: T3HavenFaqProps) {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState<string | null>(faqs[0]?.id ?? null);

  if (faqs.length === 0) return null;

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative py-24 sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <T3Reveal className="mb-14 sm:mb-16">
          <p className="t3-marker mb-6 text-sm font-light text-[var(--t3-moss-soft)]">
            good to know
          </p>
          <h2 id="faq-heading" className="t3-display text-[var(--t3-moss)]">
            questions,{" "}
            <em className="t3-serif text-[var(--t3-euc-deep)]">answered gently</em>
          </h2>
        </T3Reveal>

        <T3Reveal delay={0.1}>
          <dl>
            {faqs.map((f) => {
              const isOpen = open === f.id;
              const panelId = `t3-faq-${f.id}`;
              return (
                <div
                  key={f.id}
                  className="border-t border-[var(--t3-line)] last:border-b last:border-[var(--t3-line)]"
                >
                  <dt>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : f.id)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="group flex w-full items-center gap-5 py-6 text-left"
                    >
                      <span className="flex-1 text-lg font-light text-[var(--t3-moss)]">
                        {f.question}
                      </span>
                      <Plus
                        aria-hidden="true"
                        className={`h-5 w-5 shrink-0 text-[var(--t3-euc)] transition-transform duration-700 ${
                          isOpen ? "rotate-45" : ""
                        }`}
                        strokeWidth={1.4}
                      />
                    </button>
                  </dt>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.dd
                        id={panelId}
                        initial={
                          reduceMotion ? { opacity: 1 } : { height: 0, opacity: 0 }
                        }
                        animate={
                          reduceMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }
                        }
                        exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.7, ease: HAVEN_EASE }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-7 pr-8 text-[15px] font-light leading-relaxed text-[var(--t3-moss-soft)]">
                          {f.answer}
                        </p>
                      </motion.dd>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </dl>
        </T3Reveal>
      </div>
    </section>
  );
}
