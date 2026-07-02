"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { T1_EASE } from "./T1Motion";

interface QuoteEntry {
  id: string;
  reviewerName: string;
  reviewText: string;
  procedureCategory: string;
}

interface T1PullQuotesProps {
  quotes: QuoteEntry[];
}

/**
 * Patient voices as magazine pull-quotes — one enormous Fraunces italic
 * quotation at a time, cycling slowly, with a byline set like a credit.
 */
export default function T1PullQuotes({ quotes }: T1PullQuotesProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const count = quotes.length;

  useEffect(() => {
    if (reduced || paused || count < 2) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, 8000);
    return () => clearInterval(timer);
  }, [reduced, paused, count]);

  if (count === 0) return null;
  const quote = quotes[index];

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Oversized opening quote mark */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 left-0 font-t1-display text-[7rem] font-light leading-none text-[#9C7E46]/30 md:-top-14 md:text-[11rem]"
      >
        &ldquo;
      </span>

      <div className="min-h-[16rem] md:min-h-[15rem] lg:min-h-[14rem]">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={quote.id}
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -16 }}
            transition={{ duration: 0.9, ease: T1_EASE }}
          >
            <p className="font-t1-display text-[clamp(1.35rem,3.2vw,2.5rem)] font-light italic leading-[1.35] text-[#16130F]">
              {quote.reviewText}
            </p>
            <footer className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-sans text-xs font-medium uppercase tracking-[0.24em] text-[#16130F]">
                {quote.reviewerName}
              </span>
              <span aria-hidden="true" className="text-[#9C7E46]">
                —
              </span>
              <span className="font-sans text-xs uppercase tracking-[0.24em] text-[#6B675E]">
                {quote.procedureCategory}, verified patient
              </span>
            </footer>
          </motion.blockquote>
        </AnimatePresence>
      </div>

      {/* Issue-style pagination */}
      {count > 1 && (
        <div className="mt-10 flex items-center gap-6 border-t border-[#16130F]/15 pt-5">
          <p className="font-t1-display text-sm italic text-[#9C7E46]">
            {String(index + 1).padStart(2, "0")}
            <span className="mx-1 text-[#6B675E]">/</span>
            {String(count).padStart(2, "0")}
          </p>
          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIndex((i) => (i - 1 + count) % count)}
              aria-label="Previous patient account"
              className="flex h-11 w-11 items-center justify-center border border-[#16130F]/15 font-t1-display italic text-[#16130F] transition-colors duration-500 hover:border-[#9C7E46] hover:text-[#5E2A2B]"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => setIndex((i) => (i + 1) % count)}
              aria-label="Next patient account"
              className="flex h-11 w-11 items-center justify-center border border-[#16130F]/15 font-t1-display italic text-[#16130F] transition-colors duration-500 hover:border-[#9C7E46] hover:text-[#5E2A2B]"
            >
              →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
