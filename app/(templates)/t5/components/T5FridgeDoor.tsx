"use client";

import type { ReviewData } from "@/types/dentist";
import T5Reveal from "./T5Reveal";

interface T5FridgeDoorProps {
  reviews: ReviewData[];
}

function Stars({ rating }: { rating: number }) {
  return (
    <span
      className="flex items-center gap-1 text-[var(--t5-marigold-deep)]"
      role="img"
      aria-label={`Rated ${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} aria-hidden style={{ opacity: i < rating ? 1 : 0.25 }}>
          ★
        </span>
      ))}
    </span>
  );
}

const TILTS = [-1.6, 1.2, -0.8, 1.6, -1.2, 0.9];

export default function T5FridgeDoor({ reviews }: T5FridgeDoorProps) {
  const average =
    reviews.length > 0
      ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
      : "5.0";

  return (
    <section
      id="fridge-door"
      className="relative bg-[var(--t5-butter)] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <T5Reveal className="max-w-2xl">
          <p className="t5-kicker text-[var(--t5-marigold-deep)]">
            The fridge door
          </p>
          <h2 className="t5-display t5-display-lg mt-4 text-[var(--t5-walnut)]">
            Nice notes from{" "}
            <span className="t5-wave t5-wave--teal">the neighbors.</span>
          </h2>
          <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-[1.02rem] text-[var(--t5-walnut-soft)]">
            <Stars rating={5} />
            <span className="font-t5-display text-[1.15rem] text-[var(--t5-walnut)]">
              {average}
            </span>
            <span>
              average across {reviews.length} verified reviews — pinned up
              exactly as written.
            </span>
          </p>
        </T5Reveal>

        {/* the pinned-up notes */}
        <div className="mt-14 columns-1 gap-7 sm:columns-2 lg:columns-3 [&>*]:mb-7 [&>*]:break-inside-avoid">
          {reviews.map((rev, i) => (
            <T5Reveal
              key={rev.id}
              delay={Math.min(i * 0.07, 0.35)}
              rotate={TILTS[i % TILTS.length]}
            >
              <figure className="t5-polaroid !p-6">
                <span className="t5-tape" aria-hidden />
                <Stars rating={rev.rating} />
                <blockquote className="mt-3 text-[0.95rem] leading-relaxed text-[var(--t5-walnut-soft)]">
                  &ldquo;{rev.reviewText}&rdquo;
                </blockquote>
                <figcaption className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="t5-kicker text-[var(--t5-teal)]">
                    {rev.reviewerName}
                  </span>
                  <span className="t5-ticket !text-[0.7rem]">
                    {rev.procedureCategory}
                  </span>
                </figcaption>
              </figure>
            </T5Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
