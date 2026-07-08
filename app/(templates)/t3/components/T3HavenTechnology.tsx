"use client";

import T3Reveal from "./T3Reveal";

/**
 * Technology in the haven register — advanced tools described by how they
 * feel to the patient, not by their spec sheet. Calm cards, plain language,
 * reassurance over jargon.
 */
const SYSTEMS = [
  {
    title: "3D imaging",
    note: "A full three-dimensional view of your teeth and jaw lets us plan everything before we begin — less guesswork, fewer surprises, and usually less time in the chair.",
  },
  {
    title: "same-day crowns",
    note: "A gentle digital scan and an in-house mill mean many crowns are finished in a single visit. No goopy impressions, no temporary, no second trip across town.",
  },
  {
    title: "guided implants",
    note: "When a tooth needs replacing, we map the exact position in advance and place the implant through a custom guide — precise, predictable, and gentler than most expect.",
  },
];

export default function T3HavenTechnology() {
  return (
    <section
      id="technology"
      aria-labelledby="technology-heading"
      className="relative py-24 sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-16 grid grid-cols-1 gap-6 sm:mb-20 lg:grid-cols-12">
          <T3Reveal className="lg:col-span-6">
            <p className="t3-marker mb-6 text-sm font-light text-[var(--t3-moss-soft)]">
              quietly advanced
            </p>
            <h2 id="technology-heading" className="t3-display text-[var(--t3-moss)]">
              technology you&rsquo;ll{" "}
              <em className="t3-serif text-[var(--t3-euc-deep)]">
                barely notice
              </em>
            </h2>
          </T3Reveal>
          <T3Reveal delay={0.15} className="lg:col-span-4 lg:col-start-9 lg:self-end">
            <p className="max-w-sm text-[15px] font-light leading-relaxed text-[var(--t3-moss-soft)]">
              The point of good equipment isn&rsquo;t to impress you — it&rsquo;s
              to make your visit calmer, quicker, and easier on you.
            </p>
          </T3Reveal>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {SYSTEMS.map((s, i) => (
            <T3Reveal key={s.title} delay={i * 0.1}>
              <div className="flex h-full flex-col rounded-[1.5rem] bg-[var(--t3-sage-light)] p-7 shadow-[var(--t3-shadow-soft)] transition-shadow duration-700 hover:shadow-[var(--t3-shadow-bloom)] sm:p-8">
                <p className="t3-serif mb-3 text-xl text-[var(--t3-euc-deep)]">
                  {s.title}
                </p>
                <p className="text-[15px] font-light leading-relaxed text-[var(--t3-moss-soft)]">
                  {s.note}
                </p>
              </div>
            </T3Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
