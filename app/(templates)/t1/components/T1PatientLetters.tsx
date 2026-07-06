"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { Fade, T1_EASE } from "./T1Motion";

export interface LetterEntry {
  id: string;
  reviewerName: string;
  reviewText: string;
  procedureCategory: string;
}

interface T1PatientLettersProps {
  letters: LetterEntry[];
  /** formatted average rating, e.g. "5.0" — null when there are no reviews */
  avgRating: string | null;
}

/** How long a quote holds before auto-advancing (ms). */
const AUTOPLAY_MS = 7000;

/**
 * T1 PRESS — the testimonial band, run as an editorial carousel. The
 * ink rating card holds the left as a fixed verdict; the paper panel to
 * its right features one patient quote at a time, cycled by arrows,
 * index ticks, keyboard, or a slow autoplay that pauses on interaction.
 * Reviewer and procedure set in mono, like a byline.
 */
export default function T1PatientLetters({
  letters,
  avgRating,
}: T1PatientLettersProps) {
  const reduced = useReducedMotion();
  const n = letters.length;

  // [active index, direction] — direction drives the slide of the transition
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const [paused, setPaused] = useState(false);

  const paginate = useCallback(
    (delta: number) => {
      setState(([i]) => [(i + delta + n) % n, delta]);
    },
    [n],
  );

  const goTo = useCallback(
    (target: number) => {
      setState(([i]) => [target, target > i ? 1 : -1]);
    },
    [],
  );

  // Autoplay — disabled under reduced motion, paused on hover/focus.
  useEffect(() => {
    if (reduced || paused || n <= 1) return;
    const id = setInterval(() => paginate(1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [reduced, paused, n, paginate, index]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      paginate(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      paginate(-1);
    }
  };

  const pauseRef = useRef({ enter: () => setPaused(true), leave: () => setPaused(false) });

  if (n === 0 || avgRating === null) return null;

  const active = letters[index];

  const slide = {
    enter: (d: number) => ({ opacity: 0, x: reduced ? 0 : d >= 0 ? 36 : -36 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: reduced ? 0 : d >= 0 ? -36 : 36 }),
  };

  return (
    <div className="grid grid-cols-1 gap-px border border-[rgba(26,23,19,0.15)] bg-[rgba(26,23,19,0.15)] md:grid-cols-3">
      {/* Rating summary — the ink card */}
      <div className="bg-[#1A1713] text-[#F3EFE6]">
        <Fade className="h-full">
          <div className="flex h-full flex-col justify-between p-6 md:p-8">
            <p className="t1-mono-label !text-[#F3EFE6]/60">[ THE VERDICT ]</p>
            <div className="py-10">
              <p
                className="font-t1-press text-[clamp(5rem,10vw,8rem)] leading-none text-[#D92B21]"
                aria-label={`Rated ${avgRating} out of 5`}
              >
                {avgRating}
              </p>
              <p className="t1-mono-label mt-3 !text-[#F3EFE6]/60">OUT OF 5</p>
            </div>
            <p className="t1-mono-label !text-[#F3EFE6]/70">
              FROM {n} VERIFIED PATIENTS
            </p>
          </div>
        </Fade>
      </div>

      {/* Featured quote — the carousel panel */}
      <div
        className="bg-[#F3EFE6] md:col-span-2"
        onMouseEnter={pauseRef.current.enter}
        onMouseLeave={pauseRef.current.leave}
        onFocus={pauseRef.current.enter}
        onBlur={pauseRef.current.leave}
      >
        <Fade className="h-full">
          <div
            className="flex h-full flex-col p-6 md:p-8"
            role="group"
            aria-roledescription="carousel"
            aria-label="Patient testimonials"
            tabIndex={0}
            onKeyDown={onKeyDown}
          >
            {/* Header row: index + oversized quote mark */}
            <div className="flex items-baseline justify-between gap-4">
              <span className="t1-mono-label t1-mono-label-red">
                [ {String(index + 1).padStart(2, "0")} ]
              </span>
              <span
                aria-hidden="true"
                className="font-t1-press text-5xl leading-none text-[#D92B21]"
              >
                &ldquo;
              </span>
            </div>

            {/* Animated quote body */}
            <div
              className="relative mt-4 flex flex-1 items-start"
              aria-live="polite"
            >
              <AnimatePresence mode="wait" custom={dir} initial={false}>
                <motion.blockquote
                  key={active.id}
                  custom={dir}
                  variants={slide}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: T1_EASE }}
                  className="flex min-h-[9rem] w-full flex-col md:min-h-[11rem]"
                >
                  <p className="flex-1 font-sans text-lg leading-[1.7] text-[#1A1713] md:text-xl md:leading-[1.65]">
                    {active.reviewText}
                  </p>
                  <footer className="mt-6">
                    <p className="t1-mono-label">
                      {active.reviewerName.toUpperCase()}
                    </p>
                    <p className="t1-mono-label t1-mono-label-stone mt-1">
                      {active.procedureCategory.toUpperCase()}
                    </p>
                  </footer>
                </motion.blockquote>
              </AnimatePresence>
            </div>

            {/* Control row: counter · ticks · arrows */}
            <div className="mt-6 flex items-center justify-between gap-4 border-t border-[rgba(26,23,19,0.15)] pt-4">
              <span className="t1-mono-label t1-mono-label-stone whitespace-nowrap">
                {String(index + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
              </span>

              {/* Clickable index ticks — hidden on the tightest screens */}
              <div className="hidden items-center gap-2 sm:flex" role="tablist" aria-label="Select testimonial">
                {letters.map((l, i) => (
                  <button
                    key={l.id}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Show testimonial ${i + 1}`}
                    onClick={() => goTo(i)}
                    className="group py-2"
                  >
                    <span
                      className={`block h-0.5 w-6 transition-colors duration-300 ${
                        i === index
                          ? "bg-[#D92B21]"
                          : "bg-[rgba(26,23,19,0.25)] group-hover:bg-[rgba(26,23,19,0.5)]"
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* Prev / next */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => paginate(-1)}
                  aria-label="Previous testimonial"
                  className="flex h-9 w-9 items-center justify-center border border-[rgba(26,23,19,0.25)] text-[#1A1713] transition-colors duration-200 hover:border-[#D92B21] hover:bg-[#D92B21] hover:text-[#F3EFE6]"
                >
                  <span aria-hidden="true" className="text-base leading-none">
                    &larr;
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => paginate(1)}
                  aria-label="Next testimonial"
                  className="flex h-9 w-9 items-center justify-center border border-[rgba(26,23,19,0.25)] text-[#1A1713] transition-colors duration-200 hover:border-[#D92B21] hover:bg-[#D92B21] hover:text-[#F3EFE6]"
                >
                  <span aria-hidden="true" className="text-base leading-none">
                    &rarr;
                  </span>
                </button>
              </div>
            </div>
          </div>
        </Fade>
      </div>
    </div>
  );
}
