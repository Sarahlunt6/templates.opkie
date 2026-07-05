"use client";

import { useState } from "react";
import type { BeforeAfterCase } from "@/types/dentist";
import T3Reveal from "./T3Reveal";
import T3QuietSlider from "./T3QuietSlider";

interface T3TransformationsProps {
  cases: BeforeAfterCase[];
}

/**
 * "Quiet transformations" — one soft-framed slider with gentle case tabs.
 * No dramatic reveal language; the copy keeps the register reassuring.
 */
export default function T3Transformations({ cases }: T3TransformationsProps) {
  const [activeId, setActiveId] = useState(cases[0]?.id);
  const activeCase = cases.find((c) => c.id === activeId) ?? cases[0];

  if (!activeCase) return null;

  return (
    <section
      id="smiles"
      aria-labelledby="smiles-heading"
      className="relative py-24 sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <T3Reveal>
              <p className="t3-marker mb-6 text-sm font-light text-[var(--t3-moss-soft)]">
                real results
              </p>
              <h2
                id="smiles-heading"
                className="t3-display mb-6 text-[var(--t3-moss)]"
              >
                quiet{" "}
                <em className="t3-serif text-[var(--t3-euc-deep)]">
                  transformations
                </em>
              </h2>
              <p className="mb-10 max-w-md text-base font-light leading-relaxed text-[var(--t3-moss-soft)]">
                No dramatic reveals. Just smiles that look like you, on a
                better day. Slide gently between before and after.
              </p>
            </T3Reveal>

            <T3Reveal delay={0.15}>
              <div
                className="flex flex-wrap gap-3"
                aria-label="Choose a transformation to view"
              >
                {cases.map((c) => {
                  const active = c.id === activeCase.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setActiveId(c.id)}
                      className={`rounded-full px-5 py-2.5 text-sm font-light transition-all duration-700 ${
                        active
                          ? "bg-[var(--t3-euc-deep)] text-[var(--t3-sage-light)] shadow-[var(--t3-shadow-soft)]"
                          : "border border-[var(--t3-line)] text-[var(--t3-moss-soft)] hover:border-[var(--t3-euc)] hover:text-[var(--t3-moss)]"
                      }`}
                    >
                      {c.procedureType.toLowerCase()}
                    </button>
                  );
                })}
              </div>
            </T3Reveal>
          </div>

          <T3Reveal delay={0.2} className="lg:col-span-7">
            <T3QuietSlider
              key={activeCase.id}
              beforeUrl={activeCase.beforeUrl}
              afterUrl={activeCase.afterUrl}
              altTag={activeCase.altTag}
            />
          </T3Reveal>
        </div>
      </div>
    </section>
  );
}
