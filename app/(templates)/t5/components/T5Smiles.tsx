"use client";

import { BeforeAfterSlider } from "@/components/dental";
import type { BeforeAfterCase } from "@/types/dentist";
import T5Reveal from "./T5Reveal";

interface T5SmilesProps {
  cases: BeforeAfterCase[];
}

const CAPTIONS: Record<string, string> = {
  "Porcelain Veneers": "brand-new veneers!",
  "Professional Whitening": "fresh whitening!",
  "Invisalign Treatment": "invisalign, all done!",
};

const TILTS = [-1.5, 1.2, -1];

export default function T5Smiles({ cases }: T5SmilesProps) {
  return (
    <section
      id="smiles"
      className="relative bg-[var(--t5-cream)] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <T5Reveal className="max-w-2xl">
          <p className="t5-kicker text-[var(--t5-marigold-deep)]">
            Show &amp; tell
          </p>
          <h2 className="t5-display t5-display-lg mt-4 text-[var(--t5-walnut)]">
            Real smiles from{" "}
            <span className="t5-wave">real neighbors.</span>
          </h2>
          <p className="mt-5 text-[1.02rem] leading-relaxed text-[var(--t5-walnut-soft)]">
            Grab the handle on each photo and slide it — the left side is
            the day they walked in.
          </p>
        </T5Reveal>

        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((c, i) => (
            <T5Reveal
              key={c.id}
              delay={i * 0.1}
              rotate={TILTS[i % TILTS.length]}
            >
              <figure className="t5-polaroid">
                <span className="t5-tape" aria-hidden />
                <div className="overflow-hidden rounded-[4px]">
                  <BeforeAfterSlider
                    beforeUrl={c.beforeUrl}
                    afterUrl={c.afterUrl}
                    altTag={c.altTag}
                    aspectRatio="4/3"
                  />
                </div>
                <figcaption className="t5-script mt-3 pb-1 text-center text-[1.45rem] text-[var(--t5-teal-bright)]">
                  {CAPTIONS[c.procedureType] ?? c.procedureType.toLowerCase()}
                </figcaption>
              </figure>
            </T5Reveal>
          ))}
        </div>

        <T5Reveal delay={0.15}>
          <p className="t5-kicker mt-12 text-center text-[var(--t5-walnut-faint)]">
            Shared with each patient's permission ★ results vary person to
            person
          </p>
        </T5Reveal>
      </div>
    </section>
  );
}
