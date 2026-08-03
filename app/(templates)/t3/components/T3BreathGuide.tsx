"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { HAVEN_EASE } from "./T3Reveal";
import T3Reveal from "./T3Reveal";

interface T3BreathGuideProps {
  hasSedation: boolean;
}

const COMFORT_MENU = [
  {
    item: "sedation, in the dose you choose",
    note: "from a little something to take the edge off, to sleeping through the whole visit.",
  },
  {
    item: "a hand raised means we stop",
    note: "no explanation needed, ever. we pause until you're ready — or we're done for the day.",
  },
  {
    item: "warm blankets & headphones",
    note: "your playlist, our noise-cancelling headphones, and a blanket if you want one.",
  },
  {
    item: "breaks whenever you need",
    note: "stretch, sip water, step outside. your appointment has room built into it.",
  },
];

/**
 * The signature moment — a guided breath. A soft eucalyptus radial expands
 * for ~5s and settles for ~5s while the invitation text crossfades between
 * "breathe in" and "breathe out". It flows straight into the sedation and
 * comfort-menu story. Under prefers-reduced-motion the circle holds still
 * as a calm gradient with the same copy.
 */
export default function T3BreathGuide({ hasSedation }: T3BreathGuideProps) {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<"in" | "out">("in");
  // Patients can pause the pace and breathe on their own — anxiety-friendly.
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (reduceMotion || !running) return;
    const id = setInterval(
      () => setPhase((p) => (p === "in" ? "out" : "in")),
      5000
    );
    return () => clearInterval(id);
  }, [reduceMotion, running]);

  return (
    <section
      id="comfort"
      aria-labelledby="comfort-heading"
      className="relative overflow-hidden py-24 sm:py-32 lg:py-40"
    >
      {/* sand wash behind the lower half */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1/2"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(231,224,210,0.45))",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* ── the breath ─────────────────────────────────────── */}
        <div className="mx-auto mb-20 flex max-w-xl flex-col items-center text-center sm:mb-28">
          <T3Reveal>
            <p className="t3-marker mb-14 text-sm font-light text-[var(--t3-moss-soft)]">
              before anything else,{" "}
              <em className="t3-serif text-[var(--t3-euc-ink)]">breathe</em>
            </p>
          </T3Reveal>

          <div
            className="relative flex h-[300px] w-[300px] items-center justify-center sm:h-[360px] sm:w-[360px]"
            role="img"
            aria-label="A slowly expanding and settling circle, pacing one breath in and one breath out"
          >
            {/* outer bloom */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at center, rgb(var(--t3-euc-rgb) / 0.28) 0%, rgb(var(--t3-euc-rgb) / 0.1) 50%, transparent 72%)",
              }}
              animate={
                reduceMotion
                  ? { scale: 1.12, opacity: 0.9 }
                  : {
                      scale: phase === "in" ? 1.3 : 1,
                      opacity: phase === "in" ? 1 : 0.75,
                    }
              }
              transition={{ duration: 5, ease: "easeInOut" }}
            />
            {/* inner core */}
            <motion.div
              className="absolute inset-[27%] rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 42% 38%, rgb(var(--t3-euc-rgb) / 0.5), rgba(86,110,97,0.34) 70%)",
                boxShadow: "0 24px 60px -20px rgba(46,59,52,0.25)",
              }}
              animate={
                reduceMotion
                  ? { scale: 1.06 }
                  : { scale: phase === "in" ? 1.18 : 0.94 }
              }
              transition={{ duration: 5, ease: "easeInOut" }}
            />
            {/* breath text */}
            <div className="relative h-8">
              {reduceMotion ? (
                <span className="text-lg font-light tracking-[0.12em] text-[var(--t3-moss)]">
                  breathe easy
                </span>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.span
                    key={phase}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.6, ease: HAVEN_EASE }}
                    className="block text-lg font-light tracking-[0.12em] text-[var(--t3-moss)]"
                  >
                    {phase === "in" ? "breathe in…" : "breathe out…"}
                  </motion.span>
                </AnimatePresence>
              )}
            </div>
          </div>

          {/* Let patients set their own pace */}
          {!reduceMotion && (
            <button
              type="button"
              onClick={() => setRunning((r) => !r)}
              aria-pressed={!running}
              className="mt-10 rounded-full border border-[var(--t3-line)] px-5 py-2 text-[13px] font-light lowercase text-[var(--t3-moss-soft)] transition-colors duration-500 hover:border-[var(--t3-euc)] hover:text-[var(--t3-moss)]"
            >
              {running ? "pause" : "breathe with me"}
            </button>
          )}

          <T3Reveal delay={0.1}>
            <p className="mt-12 text-base font-light leading-relaxed text-[var(--t3-moss-soft)]">
              that pace — slow in, slow out — is the pace of everything here.
            </p>
          </T3Reveal>
        </div>

        {/* ── the comfort story ──────────────────────────────── */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          <T3Reveal className="lg:col-span-5">
            <h2
              id="comfort-heading"
              className="t3-display mb-6 text-[var(--t3-moss)]"
            >
              dental anxiety is common.
              <br />
              <em className="t3-serif text-[var(--t3-euc-deep)]">
                so is getting past it.
              </em>
            </h2>
            <p className="mb-5 max-w-md text-base font-light leading-relaxed text-[var(--t3-moss-soft)]">
              If your heart rate climbs in the parking lot, you are exactly who
              this practice was designed for. Nobody asks why it&rsquo;s been a
              while. Nobody starts before you&rsquo;re ready.
            </p>
            {hasSedation && (
              <p className="max-w-md text-base font-light leading-relaxed text-[var(--t3-moss-soft)]">
                Sedation is always on the menu — you choose how much help you
                want, and we plan the visit around it.
              </p>
            )}
          </T3Reveal>

          <div className="lg:col-span-6 lg:col-start-7">
            <T3Reveal delay={0.15}>
              <p className="t3-marker mb-8 text-sm font-light text-[var(--t3-moss-soft)]">
                the comfort menu
              </p>
            </T3Reveal>
            <ul className="space-y-0">
              {COMFORT_MENU.map((entry, i) => (
                <li
                  key={entry.item}
                  className="border-t border-[var(--t3-line)] py-6 first:border-t-0"
                >
                  <T3Reveal delay={0.15 + i * 0.1}>
                    <p className="mb-1.5 text-lg font-light text-[var(--t3-moss)]">
                      {entry.item}
                    </p>
                    <p className="text-sm font-light leading-relaxed text-[var(--t3-moss-soft)]">
                      {entry.note}
                    </p>
                  </T3Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
