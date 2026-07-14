"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { FaqItem } from "@/types/dentist";
import T5Reveal, { MARIGOLD_EASE } from "./T5Reveal";

interface T5FaqProps {
  faqs: FaqItem[];
}

function FaqCard({ faq, index }: { faq: FaqItem; index: number }) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const panelId = `t5-faq-panel-${faq.id}`;
  const buttonId = `t5-faq-button-${faq.id}`;

  return (
    <T5Reveal delay={Math.min(index * 0.05, 0.3)}>
      <div
        className="rounded-[18px] border-2 border-[var(--t5-walnut)] bg-[var(--t5-paper)] transition-shadow duration-200"
        style={{ boxShadow: open ? "5px 5px 0 var(--t5-walnut)" : "var(--t5-shadow-print)" }}
      >
        <h3>
          <button
            id={buttonId}
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen(!open)}
            className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left sm:px-8"
          >
            <span className="t5-display text-[1.1rem] leading-snug text-[var(--t5-walnut)] sm:text-[1.2rem]">
              {faq.question}
            </span>
            <span
              aria-hidden
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[var(--t5-walnut)] bg-[var(--t5-marigold)] text-[1.2rem] font-bold text-[var(--t5-walnut)] transition-transform duration-300"
              style={{ transform: open ? "rotate(45deg)" : "none" }}
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
              transition={{ duration: 0.4, ease: MARIGOLD_EASE }}
              className="overflow-hidden"
            >
              <p className="px-6 pb-6 text-[0.96rem] leading-relaxed text-[var(--t5-walnut-soft)] sm:px-8">
                {faq.answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </T5Reveal>
  );
}

export default function T5Faq({ faqs }: T5FaqProps) {
  const mid = Math.ceil(faqs.length / 2);
  const columns = [faqs.slice(0, mid), faqs.slice(mid)];

  return (
    <section id="questions" className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <T5Reveal className="max-w-2xl">
          <p className="t5-kicker text-[var(--t5-marigold-deep)]">
            Good questions
          </p>
          <h2 className="t5-display t5-display-lg mt-4 text-[var(--t5-walnut)]">
            Things neighbors{" "}
            <span className="t5-wave">actually ask us.</span>
          </h2>
        </T5Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {columns.map((column, ci) => (
            <div key={ci} className="space-y-6">
              {column.map((faq, i) => (
                <FaqCard key={faq.id} faq={faq} index={ci * mid + i} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
