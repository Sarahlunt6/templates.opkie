"use client";

import Image from "next/image";
import T4Reveal, { T4RuleDraw } from "./T4Reveal";

interface T4PhilosophyProps {
  practiceName: string;
  locationsCount: number;
  city: string;
}

const HOUSE_FIGURES = [
  { value: "15+", label: "Years of cosmetic practice" },
  { value: "2", label: "Doctors, one standard" },
  { value: "5.0", label: "Average patient rating" },
];

export default function T4Philosophy({
  practiceName,
  locationsCount,
  city,
}: T4PhilosophyProps) {
  return (
    <section id="house" className="relative py-24 lg:py-36">
      <div className="mx-auto grid max-w-[88rem] grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:gap-10 lg:px-12">
        {/* room label */}
        <div className="lg:col-span-3">
          <T4Reveal className="lg:sticky lg:top-32">
            <p className="t4-label text-[var(--t4-champagne)]">The house</p>
            <T4RuleDraw className="mt-5 w-16" />
          </T4Reveal>
        </div>

        <div className="lg:col-span-9 lg:col-start-4">
          <T4Reveal>
            <h2 className="t4-display t4-display-lg max-w-3xl text-[var(--t4-ivory)]">
              Dentistry, practiced the way good tailoring is practiced:{" "}
              <em className="italic text-[var(--t4-champagne-bright)]">
                measured twice, made once,
              </em>{" "}
              finished by hand.
            </h2>
          </T4Reveal>

          <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-9 lg:gap-10">
            <div className="lg:col-span-6">
              <T4Reveal delay={0.15}>
                <div className="max-w-xl space-y-6 font-t4-body text-[1.02rem] font-light leading-relaxed text-[var(--t4-ivory-soft)]">
                  <p>
                    Nothing here is rushed and nothing is off the rack. Every
                    crown, veneer, and aligner plan at {practiceName} begins
                    with a long conversation and a complete set of
                    measurements — photographs, digital scans, and a study of
                    how you actually bite, speak, and smile.
                  </p>
                  <p>
                    Then the work is fitted to you. Shade matched against
                    your skin tone in natural light. Edges adjusted by
                    fractions of a millimeter. Nothing leaves a chair in{" "}
                    {locationsCount > 1 ? "either office" : "the office"}{" "}
                    until it looks like it grew there.
                  </p>
                </div>
              </T4Reveal>

              {/* the house figures */}
              <T4Reveal delay={0.25}>
                <div className="mt-14 border-t border-[var(--t4-line-dark)]">
                  <div className="grid grid-cols-1 sm:grid-cols-3">
                    {HOUSE_FIGURES.map((f, i) => (
                      <div
                        key={f.label}
                        className={`flex flex-col gap-2 py-8 ${
                          i > 0
                            ? "border-t border-[var(--t4-line-dark)] sm:border-l sm:border-t-0 sm:pl-7"
                            : ""
                        }`}
                      >
                        <span className="t4-numeral text-[2.6rem] leading-none text-[var(--t4-champagne)]">
                          {f.value}
                        </span>
                        <span className="t4-label text-[var(--t4-ivory-faint)]">
                          {f.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </T4Reveal>
            </div>

            {/* the salon, hung on the wall beside the words */}
            <div className="lg:col-span-3">
              <T4Reveal delay={0.2} className="lg:sticky lg:top-32">
                <div className="t4-vitrine-case relative">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -inset-x-8 -top-12 bottom-0"
                  >
                    <div className="t4-spot" />
                  </div>
                  <div className="t4-frame relative">
                    <div className="t4-frame-inner t4-grade relative aspect-[3/4]">
                      <Image
                        src="/images/office-interior.jpg"
                        alt={`A private treatment room at ${practiceName}`}
                        fill
                        sizes="(max-width: 1024px) 90vw, 24vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
                <p className="mt-4 flex items-center gap-3">
                  <span className="t4-diamond" />
                  <span className="t4-label text-[var(--t4-ivory-faint)]">
                    A fitting room · {city}
                  </span>
                </p>
              </T4Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
