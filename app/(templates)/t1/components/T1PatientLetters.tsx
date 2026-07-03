"use client";

/**
 * Chapter IV — letters from patients.
 *
 * Reviews set as a tactile stack of letters on heavy paper. The top
 * letter can be dragged and flicked away — it settles under the stack
 * with a paper-ish spring. Arrow buttons and the keyboard advance the
 * stack for everyone else, and it turns itself slowly when left alone.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export interface LetterEntry {
  id: string;
  reviewerName: string;
  reviewText: string;
  procedureCategory: string;
}

interface T1PatientLettersProps {
  letters: LetterEntry[];
}

/** deterministic paper tilts, per letter */
const TILTS = [-1.7, 1.3, -0.9, 1.9, -1.2, 0.8, -1.5, 1.1];

const VISIBLE_DEPTH = 3;

function LetterBody({
  letter,
  index,
  total,
}: {
  letter: LetterEntry;
  index: number;
  total: number;
}) {
  return (
    <div className="relative flex h-full flex-col p-7 md:p-10">
      <div className="flex items-baseline justify-between gap-4">
        <span className="t1-eyebrow">
          Letter {index + 1} of {total}
        </span>
        <span
          aria-hidden="true"
          className="font-t1-display text-2xl font-light leading-none text-[#9C7E46]/45"
        >
          &ldquo;
        </span>
      </div>
      <blockquote className="mt-5 flex-1">
        <p className="font-t1-display text-[clamp(1.02rem,2vw,1.4rem)] font-light italic leading-[1.55] text-[#16130F]">
          {letter.reviewText}
        </p>
        <footer className="mt-6 flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className="font-sans text-xs font-medium uppercase tracking-[0.24em] text-[#16130F]">
            — {letter.reviewerName},
          </span>
          <span className="font-sans text-xs uppercase tracking-[0.24em] text-[#6B675E]">
            {letter.procedureCategory}
          </span>
        </footer>
      </blockquote>
    </div>
  );
}

export default function T1PatientLetters({ letters }: T1PatientLettersProps) {
  const reduced = useReducedMotion();
  const [order, setOrder] = useState<number[]>(() => letters.map((_, i) => i));
  const [paused, setPaused] = useState(false);
  const [lifted, setLifted] = useState<number | null>(null);
  const orderRef = useRef(order);
  orderRef.current = order;
  const liftTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const count = letters.length;

  const liftAndAdvance = useCallback(() => {
    if (count < 2) return;
    const top = orderRef.current[0];
    setLifted(top);
    setOrder((o) => [...o.slice(1), o[0]]);
    if (liftTimer.current) clearTimeout(liftTimer.current);
    liftTimer.current = setTimeout(() => setLifted(null), 750);
  }, [count]);

  const rewind = useCallback(() => {
    if (count < 2) return;
    setOrder((o) => [o[o.length - 1], ...o.slice(0, -1)]);
    setLifted(null);
  }, [count]);

  // slow auto-advance when idle
  useEffect(() => {
    if (reduced || paused || count < 2) return;
    const timer = setInterval(liftAndAdvance, 9000);
    return () => clearInterval(timer);
  }, [reduced, paused, count, liftAndAdvance]);

  useEffect(() => {
    return () => {
      if (liftTimer.current) clearTimeout(liftTimer.current);
    };
  }, []);

  if (count === 0) return null;

  const topIndex = order[0];
  const longest = letters.reduce((a, b) =>
    b.reviewText.length > a.reviewText.length ? b : a
  );

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        role="group"
        aria-roledescription="stack of patient letters"
        aria-label={`Letters from patients — ${count} letters. Use the left and right arrow keys to leaf through.`}
        tabIndex={0}
        data-cursor="drag"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight" || e.key === "ArrowDown") {
            e.preventDefault();
            liftAndAdvance();
          } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
            e.preventDefault();
            rewind();
          }
        }}
        className="relative mx-auto max-w-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#9C7E46]"
      >
        {/* invisible sizer — the longest letter sets the stack height */}
        <article className="t1-letter invisible relative" aria-hidden="true">
          <LetterBody letter={longest} index={0} total={count} />
        </article>

        {letters.map((letter, i) => {
          const depth = order.indexOf(i);
          const isTop = depth === 0;
          const shownDepth = Math.min(depth, VISIBLE_DEPTH);
          return (
            <motion.article
              key={letter.id}
              aria-hidden={!isTop}
              className="t1-letter absolute inset-0"
              style={{
                zIndex: lifted === i ? count + 1 : count - depth,
                touchAction: isTop && !reduced ? "none" : undefined,
              }}
              drag={isTop && !reduced}
              dragElastic={0.16}
              dragMomentum={false}
              whileDrag={{ scale: 1.02, rotate: 1.2 }}
              onDragEnd={(_, info) => {
                const power =
                  Math.abs(info.offset.x) +
                  Math.abs(info.velocity.x) * 0.25 +
                  Math.abs(info.offset.y) * 0.6;
                if (power > 170) liftAndAdvance();
              }}
              animate={{
                x: 0,
                y: reduced ? 0 : shownDepth * 12,
                scale: reduced ? 1 : 1 - shownDepth * 0.035,
                rotate: isTop || reduced ? 0 : TILTS[i % TILTS.length],
                opacity: depth > VISIBLE_DEPTH ? 0 : 1,
              }}
              transition={
                reduced
                  ? { duration: 0 }
                  : {
                      type: "spring",
                      stiffness: 160,
                      damping: 26,
                      mass: 0.9,
                    }
              }
            >
              <LetterBody letter={letter} index={i} total={count} />
            </motion.article>
          );
        })}

        {/* announce the letter on top for assistive tech */}
        <p className="sr-only" aria-live="polite">
          Letter {topIndex + 1} of {count}, from{" "}
          {letters[topIndex].reviewerName}
        </p>
      </div>

      {/* controls */}
      {count > 1 && (
        <div className="mx-auto mt-10 flex max-w-2xl items-center gap-6 border-t border-[#16130F]/15 pt-5">
          <p className="font-t1-display text-sm italic text-[#9C7E46]">
            {String(topIndex + 1).padStart(2, "0")}
            <span className="mx-1 text-[#6B675E]">/</span>
            {String(count).padStart(2, "0")}
          </p>
          <p className="hidden font-sans text-xs italic text-[#6B675E] sm:block">
            Flick the top letter aside, or leaf through.
          </p>
          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={rewind}
              aria-label="Previous letter"
              className="flex h-11 w-11 items-center justify-center border border-[#16130F]/15 font-t1-display italic text-[#16130F] transition-colors duration-500 hover:border-[#9C7E46] hover:text-[#5E2A2B]"
            >
              ←
            </button>
            <button
              type="button"
              onClick={liftAndAdvance}
              aria-label="Next letter"
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
