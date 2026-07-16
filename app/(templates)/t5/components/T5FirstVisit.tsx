"use client";

import T5Reveal from "./T5Reveal";

const TIMELINE = [
  {
    time: "0:00",
    title: "We say hi",
    detail:
      "Coffee if you want it, the wifi password, and a quick tour so nothing feels unfamiliar.",
  },
  {
    time: "0:10",
    title: "Photos, not goop",
    detail:
      "Digital pictures and a quick scan of your teeth — you'll see everything on the big screen.",
  },
  {
    time: "0:25",
    title: "The unhurried look-around",
    detail:
      "A gentle, complete exam. We point at the screen and explain what we see as we go.",
  },
  {
    time: "0:45",
    title: "The plan, with prices",
    detail:
      "What needs doing now, what can wait, and what each thing costs — printed, in writing.",
  },
  {
    time: "1:00",
    title: "You decide",
    detail:
      "Book the next step, or take the plan home and think it over. Zero pressure either way.",
  },
];

export default function T5FirstVisit() {
  return (
    <section id="first-visit" className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <T5Reveal className="max-w-2xl">
          <p className="t5-kicker text-[var(--t5-marigold-deep)]">
            Your first visit
          </p>
          <h2 className="t5-display t5-display-lg mt-4 text-[var(--t5-walnut)]">
            One hour,{" "}
            <span className="t5-wave">minute by minute.</span>
          </h2>
          <p className="mt-5 text-[1.02rem] leading-relaxed text-[var(--t5-walnut-soft)]">
            No mystery, no marathon. Here's exactly how the first
            appointment goes:
          </p>
        </T5Reveal>

        {/* the clock-line */}
        <div className="relative mt-14 max-w-3xl">
          {/* dotted spine */}
          <div
            aria-hidden
            className="absolute bottom-6 left-[34px] top-2 border-l-[3px] border-dotted border-[rgba(70,49,42,0.3)] sm:left-[42px]"
          />

          <ol className="space-y-10">
            {TIMELINE.map((step, i) => (
              <li key={step.time}>
                <T5Reveal
                  delay={i * 0.07}
                  className="relative flex items-start gap-6 sm:gap-8"
                >
                  {/* the clock stop */}
                  <span className="relative z-10 flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-full border-2 border-[var(--t5-walnut)] bg-[var(--t5-marigold)] shadow-[3px_3px_0_var(--t5-walnut)] sm:h-[84px] sm:w-[84px]">
                    <span className="font-t5-display text-[0.95rem] text-[var(--t5-walnut)] sm:text-[1.1rem]">
                      {step.time}
                    </span>
                  </span>

                  <div className="pt-2 sm:pt-4">
                    <h3 className="t5-display text-[1.3rem] text-[var(--t5-walnut)]">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-lg text-[0.98rem] leading-relaxed text-[var(--t5-walnut-soft)]">
                      {step.detail}
                    </p>
                  </div>
                </T5Reveal>
              </li>
            ))}
          </ol>
        </div>

        <T5Reveal delay={0.15}>
          <p className="t5-kicker mt-12 flex items-center gap-2 text-[var(--t5-walnut-soft)]">
            <span className="t5-star" aria-hidden>
              ★
            </span>
            The whole first visit — exam, x-rays, cleaning — is $149.
          </p>
        </T5Reveal>
      </div>
    </section>
  );
}
