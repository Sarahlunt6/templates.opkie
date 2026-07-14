"use client";

import { BeforeAfterSlider } from "@/components/dental";
import type { BeforeAfterCase } from "@/types/dentist";
import T4Reveal, { T4RuleDraw } from "./T4Reveal";

interface T4VitrineProps {
  cases: BeforeAfterCase[];
}

/** Fitting counts per procedure, for the engraved plaques. */
const FITTINGS: Record<string, string> = {
  "Porcelain Veneers": "Two fittings",
  "Professional Whitening": "One visit",
  "Invisalign Treatment": "Checked every six weeks",
};

function VitrineCase({
  item,
  index,
  featured,
}: {
  item: BeforeAfterCase;
  index: number;
  featured?: boolean;
}) {
  return (
    <div className="t4-vitrine-case group relative">
      {/* the cone of light above the case */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-10 -top-16 bottom-0 overflow-visible"
      >
        <div className="t4-spot" />
      </div>

      <div className="t4-frame relative">
        <div className="t4-frame-inner">
          <BeforeAfterSlider
            beforeUrl={item.beforeUrl}
            afterUrl={item.afterUrl}
            altTag={item.altTag}
            aspectRatio={featured ? "16/9" : "4/3"}
          />
        </div>
      </div>

      {/* engraved plaque */}
      <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="t4-numeral text-[0.95rem] text-[var(--t4-champagne)]">
          Case Nº {String(index + 1).padStart(2, "0")}
        </span>
        <span className="t4-diamond" />
        <span className="t4-label text-[var(--t4-ivory-soft)]">
          {item.procedureType}
        </span>
        <span className="t4-diamond" />
        <span className="t4-label text-[var(--t4-ivory-faint)]">
          {FITTINGS[item.procedureType] ?? "By consultation"}
        </span>
      </div>
    </div>
  );
}

export default function T4Vitrine({ cases }: T4VitrineProps) {
  const [featured, ...rest] = cases;

  return (
    <section id="work" className="relative py-24 lg:py-36">
      <div className="mx-auto max-w-[88rem] px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-3">
            <T4Reveal className="lg:sticky lg:top-32">
              <p className="t4-label text-[var(--t4-champagne)]">The work</p>
              <T4RuleDraw className="mt-5 w-16" />
            </T4Reveal>
          </div>

          <div className="lg:col-span-9 lg:col-start-4">
            <T4Reveal>
              <h2 className="t4-display t4-display-lg text-[var(--t4-ivory)]">
                Recent commissions.
              </h2>
              <p className="mt-6 max-w-xl font-t4-body text-[1.02rem] font-light leading-relaxed text-[var(--t4-ivory-soft)]">
                Real patients of the house, photographed without retouching.
                Take the seam and draw it across each case — the left side is
                the day they arrived.
              </p>
            </T4Reveal>

            {featured && (
              <T4Reveal delay={0.1} className="mt-14">
                <VitrineCase item={featured} index={0} featured />
              </T4Reveal>
            )}

            {rest.length > 0 && (
              <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2">
                {rest.map((item, i) => (
                  <T4Reveal key={item.id} delay={0.08 + i * 0.08}>
                    <VitrineCase item={item} index={i + 1} />
                  </T4Reveal>
                ))}
              </div>
            )}

            <T4Reveal delay={0.15}>
              <p className="t4-label mt-14 text-[var(--t4-ivory-faint)]">
                Results vary by patient · Shown with each patient&rsquo;s
                written permission
              </p>
            </T4Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
