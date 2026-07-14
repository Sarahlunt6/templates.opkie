"use client";

import T5Reveal from "./T5Reveal";

interface T5ComfortProps {
  hasSedation: boolean;
}

export default function T5Comfort({ hasSedation }: T5ComfortProps) {
  const promises = [
    {
      lead: "No lectures. Ever.",
      detail:
        "Ten years since your last visit? Twenty? You'll hear \"glad you're here,\" and that's it.",
    },
    {
      lead: "You call the timeouts.",
      detail:
        "Raise your hand and everything stops — no questions, no sighs, as many times as you need.",
    },
    {
      lead: "We narrate before we do.",
      detail:
        "Every step gets explained first, so there are zero surprises in the chair.",
    },
    ...(hasSedation
      ? [
          {
            lead: "Sedation's on the menu too.",
            detail:
              "Laughing gas or a little pill for the big stuff — you can doze while we work.",
          },
        ]
      : []),
  ];

  return (
    <section
      id="nervous"
      className="relative bg-[var(--t5-blush)] py-20 lg:py-28"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 lg:grid-cols-12 lg:gap-10 lg:px-10">
        <div className="lg:col-span-5">
          <T5Reveal className="lg:sticky lg:top-36">
            <p className="t5-kicker text-[var(--t5-marigold-deep)]">
              For the nervous ones
            </p>
            <h2 className="t5-display t5-display-lg mt-4 text-[var(--t5-walnut)]">
              White-knuckle club? You're in{" "}
              <span className="t5-wave t5-wave--teal">good company.</span>
            </h2>
            <p className="mt-6 max-w-md text-[1.02rem] leading-relaxed text-[var(--t5-walnut-soft)]">
              Half the grown-ups in this town are secretly scared of the
              dentist. We built this office for exactly those people — here's
              the deal we make with every one of them:
            </p>

            {/* a neighbor's note, taped up */}
            <T5Reveal delay={0.2} rotate={-1.5} className="mt-10 max-w-sm">
              <figure className="t5-polaroid !p-6">
                <span className="t5-tape" aria-hidden />
                <blockquote className="text-[0.96rem] leading-relaxed text-[var(--t5-walnut-soft)]">
                  &ldquo;My 7-year-old used to cry in the parking lot before
                  dental visits. Dr. Roberts spent 15 minutes just talking to
                  him about dinosaurs before even looking at his teeth. Now my
                  son asks when his next appointment is.&rdquo;
                </blockquote>
                <figcaption className="t5-kicker mt-4 text-[var(--t5-teal)]">
                  Amanda S. ★ verified patient
                </figcaption>
              </figure>
            </T5Reveal>
          </T5Reveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <div className="space-y-6">
            {promises.map((p, i) => (
              <T5Reveal key={p.lead} delay={i * 0.08}>
                <div className="rounded-[18px] border-2 border-[var(--t5-walnut)] bg-[var(--t5-paper)] p-7 shadow-[var(--t5-shadow-print)]">
                  <h3 className="t5-display text-[1.3rem] text-[var(--t5-walnut)]">
                    {p.lead}
                  </h3>
                  <p className="mt-2.5 text-[0.98rem] leading-relaxed text-[var(--t5-walnut-soft)]">
                    {p.detail}
                  </p>
                </div>
              </T5Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
