"use client";

import T4Reveal, { T4RuleDraw } from "./T4Reveal";

interface T4ComfortProps {
  hasSedation: boolean;
}

export default function T4Comfort({ hasSedation }: T4ComfortProps) {
  const customs = [
    {
      lead: "Everything is explained before it happens.",
      detail:
        "What we're doing, what you'll feel, how long it takes. No surprises, ever.",
    },
    {
      lead: "Raise a hand and the room stops.",
      detail:
        "Not in a minute. Immediately. You are in charge of the pace here.",
    },
    {
      lead: "Warm blankets, headphones, quiet.",
      detail:
        "The chair should feel less like a procedure and more like a fitting.",
    },
    ...(hasSedation
      ? [
          {
            lead: "Sedation, for the visits you'd rather not remember.",
            detail:
              "Nitrous and oral options, discussed plainly and dosed carefully.",
          },
        ]
      : []),
  ];

  return (
    <section id="comfort" className="t4-salon relative py-24 lg:py-36">
      <div className="mx-auto max-w-[88rem] px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-3">
            <T4Reveal className="lg:sticky lg:top-32">
              <p className="t4-label text-[var(--t4-brass-ink)]">Comfort</p>
              <T4RuleDraw className="mt-5 w-16" />
            </T4Reveal>
          </div>

          <div className="lg:col-span-5 lg:col-start-5">
            <T4Reveal>
              <h2 className="t4-display t4-display-lg text-[#241a12]">
                Nervous is{" "}
                <em className="italic text-[var(--t4-brass-ink)]">normal</em>{" "}
                here.
              </h2>
              <p className="mt-6 max-w-lg font-t4-body text-[1.02rem] font-light leading-relaxed text-[var(--t4-espresso-soft)]">
                A good portion of our patients arrive after years — sometimes
                decades — away from any dental chair. Nobody here will ask
                why. These are the customs of the house instead:
              </p>
            </T4Reveal>

            <div className="mt-10">
              {customs.map((c, i) => (
                <T4Reveal key={c.lead} delay={i * 0.07}>
                  <div className="border-t border-[var(--t4-line-light)] py-6 last:border-b">
                    <h3 className="t4-display text-[1.25rem] leading-snug text-[#241a12]">
                      {c.lead}
                    </h3>
                    <p className="mt-2 max-w-md font-t4-body text-[0.95rem] font-light leading-relaxed text-[var(--t4-espresso-faint)]">
                      {c.detail}
                    </p>
                  </div>
                </T4Reveal>
              ))}
            </div>
          </div>

          {/* a patient's word, hung like a small framed letter */}
          <div className="lg:col-span-3 lg:col-start-10">
            <T4Reveal delay={0.2} className="lg:sticky lg:top-32">
              <figure
                className="bg-[var(--t4-porcelain-deep)] p-8"
                style={{ boxShadow: "var(--t4-shadow-salon)" }}
              >
                <blockquote className="t4-display text-[1.05rem] italic leading-relaxed text-[#241a12]">
                  &ldquo;I avoided dentists for 22 years after a bad
                  experience. The sedation option let me catch up on two
                  decades of care — I woke up and it was done.&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="t4-diamond !bg-[var(--t4-brass-ink)]" />
                  <span className="t4-label text-[var(--t4-espresso-faint)]">
                    Patricia H. · Verified patient
                  </span>
                </figcaption>
              </figure>
            </T4Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
