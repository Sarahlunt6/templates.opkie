"use client";

import type { LocationNAP } from "@/types/dentist";
import { sampleReviews } from "@/data/master";
import T3Reveal from "./T3Reveal";

interface T3MissionStatsProps {
  insuranceAcceptedText: string;
  locations: LocationNAP[];
}

const AVG_RATING = (
  sampleReviews.reduce((sum, r) => sum + r.rating, 0) / sampleReviews.length
).toFixed(1);

/**
 * Mission + stats band — a centered two-voice mission sentence on the
 * lighter sage canvas, a quiet strip of insurance text-marks (parsed from
 * trustSignals.insuranceAcceptedText, never hardcoded), then a calm row
 * of large light numerals. Reassurance, not sales.
 */

/** Pull carrier names out of "… including Delta Dental, Cigna, and X." */
function parseInsuranceNames(text: string): string[] {
  const match = text.match(/including\s+([^.]+)/i);
  if (!match) return [];
  return match[1]
    .split(/,|\band\b/i)
    .map((name) => name.trim())
    .filter(Boolean);
}

function ShieldGlyph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5 flex-shrink-0"
    >
      <path d="M12 3.5 5 6v5.5c0 4.4 3 7.6 7 9 4-1.4 7-4.6 7-9V6l-7-2.5Z" />
      <path d="m9.2 12 2 2 3.6-4" />
    </svg>
  );
}

export default function T3MissionStats({
  insuranceAcceptedText,
  locations,
}: T3MissionStatsProps) {
  const insurers = parseInsuranceNames(insuranceAcceptedText);

  const stats = [
    { value: `${AVG_RATING}/5`, label: "patient rating" },
    // "15+" mirrors the lead doctor's "over 15 years" in master-data bio
    { value: "15+", label: "years of care" },
    { value: `${locations.length}`, label: locations.length === 1 ? "location" : "locations" },
    { value: "thousands", label: "of calm visits" },
  ];

  return (
    <section
      aria-labelledby="mission-heading"
      className="relative bg-[var(--t3-sage-light)] py-24 sm:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
        {/* mission sentence, two voices */}
        <T3Reveal>
          <p className="t3-marker mx-auto mb-10 justify-center text-sm font-light text-[var(--t3-moss-soft)]">
            why we&rsquo;re here
          </p>
          <h2
            id="mission-heading"
            className="mx-auto mb-16 max-w-4xl text-[clamp(1.6rem,3.4vw,2.6rem)] font-extralight leading-[1.3] text-[var(--t3-moss)] sm:mb-20"
          >
            We provide gentle, judgment-free dentistry — helping people
            navigate care with{" "}
            <em className="t3-serif text-[var(--t3-euc-deep)]">
              patience, comfort, and compassion.
            </em>
          </h2>
        </T3Reveal>

        {/* insurance text-mark strip */}
        {insurers.length > 0 && (
          <T3Reveal delay={0.15}>
            <p className="mb-5 text-[13px] font-light text-[var(--t3-moss-soft)]">
              most major insurance accepted, including
            </p>
            <ul className="mb-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:mb-20">
              {insurers.map((name) => (
                <li
                  key={name}
                  className="inline-flex items-center gap-2 text-[15px] font-light tracking-[0.06em] text-[var(--t3-euc-ink)]"
                >
                  <ShieldGlyph />
                  {name}
                </li>
              ))}
            </ul>
          </T3Reveal>
        )}

        {/* stats row — large light numerals, small labels */}
        <T3Reveal delay={0.25}>
          <dl className="grid grid-cols-2 gap-y-12 border-t border-[var(--t3-line)] pt-14 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-2">
                <dd className="order-1 text-[clamp(2.2rem,4.5vw,3.4rem)] font-extralight leading-none tracking-[-0.01em] text-[var(--t3-moss)]">
                  {stat.value}
                </dd>
                <dt className="order-2 text-sm font-light text-[var(--t3-moss-soft)]">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </T3Reveal>
      </div>
    </section>
  );
}
