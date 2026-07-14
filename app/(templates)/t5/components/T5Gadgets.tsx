"use client";

import T5Reveal from "./T5Reveal";

const GADGETS = [
  {
    name: "The tiny camera wand",
    what: "Snaps a 3-D scan of your teeth in a few minutes.",
    soWhat: "No more biting a tray of goop. Kids think it's a video game.",
    accent: "marigold",
  },
  {
    name: "The crown-making robot",
    what: "Carves your new crown from porcelain while you wait.",
    soWhat: "One visit instead of two. No temporary crown to babysit.",
    accent: "teal",
  },
  {
    name: "The whole-jaw x-ray",
    what: "A full 3-D picture of teeth, roots, and bone in seconds.",
    soWhat: "Implants and extractions get planned precisely, not approximately.",
    accent: "teal",
  },
  {
    name: "The smile sneak-peek",
    what: "Shows you a preview of your finished smile before we start.",
    soWhat: "You approve the destination before we take the trip.",
    accent: "marigold",
  },
];

export default function T5Gadgets() {
  return (
    <section id="gadgets" className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <T5Reveal className="max-w-2xl">
          <p className="t5-kicker text-[var(--t5-marigold-deep)]">
            The equipment
          </p>
          <h2 className="t5-display t5-display-lg mt-4 text-[var(--t5-walnut)]">
            Small-town welcome,{" "}
            <span className="t5-wave t5-wave--teal">big-city gadgets.</span>
          </h2>
          <p className="mt-5 text-[1.02rem] leading-relaxed text-[var(--t5-walnut-soft)]">
            We spent the money on the machines so your visits are faster,
            gentler, and fewer. Here's the toy box, in plain English:
          </p>
        </T5Reveal>

        <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {GADGETS.map((g, i) => (
            <T5Reveal
              key={g.name}
              delay={i * 0.08}
              rotate={i % 2 === 0 ? -0.8 : 0.8}
            >
              <article className="flex h-full flex-col rounded-[18px] border-2 border-[var(--t5-walnut)] bg-[var(--t5-paper)] p-7 shadow-[var(--t5-shadow-print)]">
                <span
                  aria-hidden
                  className="mb-5 inline-block h-10 w-10 rounded-full border-2 border-[var(--t5-walnut)]"
                  style={{
                    backgroundColor:
                      g.accent === "marigold"
                        ? "var(--t5-marigold)"
                        : "var(--t5-teal-bright)",
                  }}
                />
                <h3 className="t5-display text-[1.25rem] leading-snug text-[var(--t5-walnut)]">
                  {g.name}
                </h3>
                <p className="mt-3 text-[0.94rem] leading-relaxed text-[var(--t5-walnut-soft)]">
                  {g.what}
                </p>
                <p className="mt-auto pt-4 text-[0.9rem] font-medium leading-relaxed text-[var(--t5-teal)]">
                  So what? {g.soWhat}
                </p>
              </article>
            </T5Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
