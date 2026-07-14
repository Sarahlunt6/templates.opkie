"use client";

import Image from "next/image";
import T5Reveal from "./T5Reveal";

interface T5StoryProps {
  practiceName: string;
  city: string;
}

const HOUSE_RULES = [
  {
    rule: "We run on time.",
    why: "Your 2:00 is at 2:00. We book fewer chairs so nobody waits in ours.",
  },
  {
    rule: "We explain everything in plain English.",
    why: "You'll see what we see on the big screen, and nothing happens without your okay.",
  },
  {
    rule: "We never sell you what you don't need.",
    why: "If it can wait, we'll tell you it can wait. That's how neighbors treat neighbors.",
  },
];

export default function T5Story({ practiceName, city }: T5StoryProps) {
  return (
    <section id="story" className="relative py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-12 px-5 lg:grid-cols-12 lg:gap-10 lg:px-10">
        {/* the shopkeeper's portrait */}
        <div className="relative order-2 lg:order-1 lg:col-span-5">
          <T5Reveal rotate={-1.5} className="relative mx-auto max-w-sm">
            <div className="t5-polaroid">
              <span className="t5-tape" aria-hidden />
              <div className="relative aspect-[4/3] overflow-hidden rounded-[4px]">
                <Image
                  src="/images/team/doctor-portrait.jpeg"
                  alt="The practice owner smiling in the office"
                  fill
                  sizes="(max-width: 1024px) 90vw, 36vw"
                  className="object-cover"
                  style={{ objectPosition: "40% center" }}
                />
              </div>
              <p className="t5-script mt-3 pb-1 text-center text-[1.35rem] text-[var(--t5-teal-bright)]">
                the boss, mid-dad-joke
              </p>
            </div>
          </T5Reveal>

          {/* a butter sun peeking from behind the polaroid */}
          <div
            aria-hidden
            className="absolute -bottom-8 -left-4 -z-10 h-36 w-36 rounded-full bg-[var(--t5-butter)]"
          />
        </div>

        {/* the story */}
        <div className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7">
          <T5Reveal>
            <p className="t5-kicker text-[var(--t5-marigold-deep)]">
              Our story
            </p>
            <h2 className="t5-display t5-display-lg mt-4 text-[var(--t5-walnut)]">
              The corner-shop dentist is{" "}
              <span className="t5-wave--teal t5-wave">still a thing.</span>
            </h2>
          </T5Reveal>

          <T5Reveal delay={0.1}>
            <div className="mt-7 max-w-xl space-y-5 text-[1.02rem] leading-relaxed text-[var(--t5-walnut-soft)]">
              <p>
                {practiceName} runs the way the best small shops in {city}{" "}
                run: everybody's greeted by name, prices are posted where you
                can see them, and the work is done right the first time.
              </p>
              <p>
                We're the office families come back to — first loose tooth,
                first cavity, wedding-day whitening, and the crown dad
                finally stopped putting off. Bring the whole crew; we'll
                keep track of everyone's molars.
              </p>
            </div>
          </T5Reveal>

          {/* the house rules */}
          <div className="mt-10 space-y-5">
            {HOUSE_RULES.map((r, i) => (
              <T5Reveal key={r.rule} delay={0.12 + i * 0.08}>
                <div className="flex items-start gap-4">
                  <span
                    className="t5-star mt-1 text-[1.15rem]"
                    aria-hidden
                  >
                    ★
                  </span>
                  <div>
                    <h3 className="t5-display text-[1.2rem] text-[var(--t5-walnut)]">
                      {r.rule}
                    </h3>
                    <p className="mt-1 max-w-lg text-[0.96rem] leading-relaxed text-[var(--t5-walnut-faint)]">
                      {r.why}
                    </p>
                  </div>
                </div>
              </T5Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
