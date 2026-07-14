"use client";

import T4Reveal, { T4RuleDraw } from "./T4Reveal";

const FITTING_STEPS = [
  {
    numeral: "I",
    title: "The conversation",
    detail:
      "Twenty unhurried minutes in a consultation room — not a chair. What do you want your smile to do that it isn't doing now?",
  },
  {
    numeral: "II",
    title: "The measurements",
    detail:
      "Photographs, a digital scan, and a gentle, complete exam. You watch everything on screen as we see it.",
  },
  {
    numeral: "III",
    title: "The plan",
    detail:
      "A written plan with exact prices — what's recommended, what's optional, what can wait. Nothing begins without your yes.",
  },
];

export default function T4FirstVisit() {
  return (
    <section id="first-visit" className="t4-salon relative pb-24 pt-4 lg:pb-36">
      <div className="mx-auto max-w-[88rem] px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-3">
            <T4Reveal className="lg:sticky lg:top-32">
              <p className="t4-label text-[var(--t4-brass-ink)]">
                The first visit
              </p>
              <T4RuleDraw className="mt-5 w-16" />
            </T4Reveal>
          </div>

          <div className="lg:col-span-9 lg:col-start-4">
            <T4Reveal>
              <h2 className="t4-display t4-display-lg max-w-2xl text-[#241a12]">
                Your first fitting, in three movements.
              </h2>
            </T4Reveal>

            <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3">
              {FITTING_STEPS.map((step, i) => (
                <T4Reveal key={step.numeral} delay={i * 0.1}>
                  <div className="border-t border-[var(--t4-line-light)] pt-7">
                    <span className="t4-numeral t4-display block text-[3rem] leading-none text-[var(--t4-brass-ink)]">
                      {step.numeral}
                    </span>
                    <h3 className="t4-display mt-5 text-[1.35rem] text-[#241a12]">
                      {step.title}
                    </h3>
                    <p className="mt-3 font-t4-body text-[0.95rem] font-light leading-relaxed text-[var(--t4-espresso-soft)]">
                      {step.detail}
                    </p>
                  </div>
                </T4Reveal>
              ))}
            </div>

            <T4Reveal delay={0.2}>
              <div className="t4-plaque mt-14">
                <span className="t4-label text-[var(--t4-brass-ink)]">
                  Ninety minutes, start to finish
                </span>
                <span className="t4-diamond !bg-[var(--t4-brass-ink)]" />
                <span className="t4-label text-[var(--t4-espresso-faint)]">
                  $149, imaging included
                </span>
              </div>
            </T4Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
