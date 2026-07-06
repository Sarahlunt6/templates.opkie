"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useSmoothScroll } from "@/components/premium/SmoothScrollProvider";
import T3Reveal, { HAVEN_EASE } from "./T3Reveal";

/**
 * How a first visit unfolds — four numbered process cards in the wellness
 * register. The mono-ish "0.01 … 0.04" indexes are honest here: a first
 * visit really is a sequence, and each card ends with a quiet text link
 * deeper into the page.
 */
const STEPS = [
  {
    index: "0.01",
    title: "Tell us what you need",
    body: "A short conversation in a regular chair, not the dental one. What has kept you away, what a good visit looks like for you.",
    linkHref: "#comfort",
    linkLabel: "Learn more",
  },
  {
    index: "0.02",
    title: "Meet your dentist",
    body: "Unhurried introductions before anything clinical. Every step gets explained before it happens — never after.",
    linkHref: "#doctors",
    linkLabel: "Learn more",
  },
  {
    index: "0.03",
    title: "Begin gentle care",
    body: "Numbing that starts slow and gets checked twice. A raised hand means we pause, mid-anything, no explanation needed.",
    linkHref: "#services",
    linkLabel: "Learn more",
  },
  {
    index: "0.04",
    title: "Care that grows with you",
    body: "A plan paced to your comfort and your budget, revisited together. Years of postponed care, caught up calmly.",
    linkHref: "#visit",
    linkLabel: "Learn more",
  },
];

function SproutGlyph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
    >
      <path d="M12 21v-8" />
      <path d="M12 13c0-4 2.5-6.5 7-6.5 0 4.5-2.5 6.5-7 6.5Z" />
      <path d="M12 10C12 7 10 5 6 5c0 3.5 2 5 6 5Z" />
    </svg>
  );
}

export default function T3FirstVisit() {
  const { scrollTo } = useSmoothScroll();
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="first-visit-heading"
      className="relative py-24 sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <T3Reveal className="mb-14 max-w-3xl sm:mb-20">
          <p className="t3-marker mb-6 text-sm font-light text-[var(--t3-moss-soft)]">
            how a first visit goes
          </p>
          <h2
            id="first-visit-heading"
            className="t3-display text-[var(--t3-moss)]"
          >
            Your first visit,{" "}
            <em className="t3-serif text-[var(--t3-euc-deep)]">unhurried</em>
          </h2>
        </T3Reveal>

        {/* Progress track — nodes centred over each step card, the line
            drawing in as the section arrives (decorative, desktop only) */}
        <div className="relative mb-8 hidden lg:block" aria-hidden="true">
          <div className="absolute inset-x-[12.5%] top-1/2 h-px -translate-y-1/2 bg-[var(--t3-line)]" />
          <motion.div
            className="absolute left-[12.5%] top-1/2 h-px -translate-y-1/2 bg-[var(--t3-euc)]"
            initial={reduce ? { width: "75%" } : { width: 0 }}
            whileInView={{ width: "75%" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.4, ease: HAVEN_EASE }}
          />
          <div className="relative flex justify-between px-[12.5%]">
            {STEPS.map((step) => (
              <span
                key={step.index}
                className="block h-3 w-3 rounded-full bg-[var(--t3-euc)] ring-4 ring-[var(--t3-sage)]"
              />
            ))}
          </div>
        </div>

        <ol className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {STEPS.map((step, i) => (
            <li key={step.index} className="h-full">
              <T3Reveal delay={i * 0.12} className="h-full">
                <article className="flex h-full flex-col rounded-[1.5rem] bg-[var(--t3-sage-light)] p-7 shadow-[var(--t3-shadow-soft)] transition-all duration-700 hover:shadow-[var(--t3-shadow-bloom)] motion-safe:hover:-translate-y-1 sm:p-8">
                  <div className="mb-8 flex items-start justify-between">
                    <span className="t3-index">{step.index}</span>
                    <span className="text-[var(--t3-euc)]" aria-hidden="true">
                      <SproutGlyph />
                    </span>
                  </div>
                  <h3 className="mb-3 text-xl font-light leading-snug text-[var(--t3-moss)]">
                    {step.title}
                  </h3>
                  <p className="mb-6 text-[15px] font-light leading-relaxed text-[var(--t3-moss-soft)]">
                    {step.body}
                  </p>
                  <a
                    href={step.linkHref}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(step.linkHref, { offset: -88, duration: 1.6 });
                    }}
                    className="mt-auto inline-flex items-center gap-1.5 self-start text-sm font-normal text-[var(--t3-euc-ink)] transition-colors duration-500 hover:text-[var(--t3-moss)]"
                  >
                    {step.linkLabel}
                    <span aria-hidden="true">→</span>
                  </a>
                </article>
              </T3Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
