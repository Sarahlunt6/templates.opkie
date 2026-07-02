"use client";

import T3Reveal from "./T3Reveal";

/**
 * Philosophy as an actual sequence — how a first visit unfolds.
 * Markers are quiet serif time-words ("first / then / throughout")
 * rather than numbers or badges.
 */
const STEPS = [
  {
    marker: "first",
    title: "we just talk",
    body: "You sit in a regular chair, not the dental one, and tell us what has kept you away. Your history, your worries, what a good visit would look like. Nothing happens until you say you're ready.",
  },
  {
    marker: "then",
    title: "you set the pace",
    body: "Every step gets explained before it happens, not after. A raised hand means we pause — mid-sentence, mid-anything. You can stop the whole visit and come back another day. That offer never expires.",
  },
  {
    marker: "throughout",
    title: "comfort stays the default",
    body: "Numbing that starts slow and gets checked twice. A blanket if you want one. Your playlist in the headphones. Breaks that are treated as part of the appointment, never an inconvenience.",
  },
];

export default function T3FirstVisit() {
  return (
    <section
      aria-labelledby="first-visit-heading"
      className="relative py-24 sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <T3Reveal className="mb-16 max-w-2xl sm:mb-24">
          <p className="t3-marker mb-6 text-sm font-light text-[var(--t3-moss-soft)]">
            how a first visit goes
          </p>
          <h2
            id="first-visit-heading"
            className="text-[clamp(1.9rem,4.5vw,3.2rem)] font-extralight leading-[1.12] text-[var(--t3-moss)]"
          >
            your first visit,{" "}
            <em className="t3-serif text-[var(--t3-euc-deep)]">unhurried</em>
          </h2>
        </T3Reveal>

        <ol className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10">
          {STEPS.map((step, i) => (
            <li key={step.marker} className="h-full">
              <T3Reveal delay={i * 0.15} className="h-full">
                <div className="mb-7 h-px w-12 bg-[var(--t3-euc)] opacity-60" />
                <p className="t3-serif mb-3 text-xl text-[var(--t3-euc-deep)]">
                  {step.marker}
                </p>
                <h3 className="mb-4 text-xl font-light text-[var(--t3-moss)]">
                  {step.title}
                </h3>
                <p className="text-[15px] font-light leading-relaxed text-[var(--t3-moss-soft)]">
                  {step.body}
                </p>
              </T3Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
