"use client";

import type { ReviewData } from "@/types/dentist";
import T4Reveal, { T4RuleDraw } from "./T4Reveal";

interface T4ReviewsProps {
  reviews: ReviewData[];
}

function RatingDiamonds({ rating }: { rating: number }) {
  return (
    <span
      className="flex items-center gap-1.5"
      role="img"
      aria-label={`Rated ${rating} out of 5`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className="t4-diamond"
          style={{ opacity: i < rating ? 0.9 : 0.25 }}
        />
      ))}
    </span>
  );
}

export default function T4Reviews({ reviews }: T4ReviewsProps) {
  const average =
    reviews.length > 0
      ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
      : "5.0";

  const [featured, ...others] = reviews;
  const supporting = others.slice(0, 3);

  return (
    <section id="letters" className="relative py-24 lg:py-36">
      <div className="mx-auto max-w-[88rem] px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-3">
            <T4Reveal className="lg:sticky lg:top-32">
              <p className="t4-label text-[var(--t4-champagne)]">
                In their words
              </p>
              <T4RuleDraw className="mt-5 w-16" />
              <div className="mt-8 flex flex-col gap-3">
                <span className="t4-numeral t4-display text-[3.2rem] leading-none text-[var(--t4-ivory)]">
                  {average}
                </span>
                <RatingDiamonds rating={5} />
                <span className="t4-label text-[var(--t4-ivory-faint)]">
                  {reviews.length} verified patient reviews
                </span>
              </div>
            </T4Reveal>
          </div>

          <div className="lg:col-span-9 lg:col-start-4">
            {/* the featured letter */}
            {featured && (
              <T4Reveal>
                <figure className="relative">
                  <span
                    aria-hidden
                    className="t4-display pointer-events-none absolute -left-4 -top-10 select-none text-[7rem] leading-none text-[var(--t4-champagne)] opacity-25 lg:-left-10"
                  >
                    &ldquo;
                  </span>
                  <blockquote className="t4-display relative text-[clamp(1.5rem,2.6vw,2.3rem)] italic leading-[1.3] text-[var(--t4-ivory)]">
                    {featured.reviewText}
                  </blockquote>
                  <figcaption className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span className="t4-label text-[var(--t4-champagne)]">
                      {featured.reviewerName}
                    </span>
                    <span className="t4-diamond" />
                    <span className="t4-label text-[var(--t4-ivory-faint)]">
                      {featured.procedureCategory}
                    </span>
                    <span className="t4-diamond" />
                    <span className="t4-label text-[var(--t4-ivory-faint)]">
                      Verified · {featured.verificationBadge}
                    </span>
                  </figcaption>
                </figure>
              </T4Reveal>
            )}

            {/* supporting letters */}
            <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-3">
              {supporting.map((rev, i) => (
                <T4Reveal key={rev.id} delay={0.08 + i * 0.08}>
                  <figure className="flex h-full flex-col border-t border-[var(--t4-line-dark)] pt-7">
                    <RatingDiamonds rating={rev.rating} />
                    <blockquote className="mt-5 flex-1 font-t4-body text-[0.95rem] font-light leading-relaxed text-[var(--t4-ivory-soft)]">
                      &ldquo;{rev.reviewText}&rdquo;
                    </blockquote>
                    <figcaption className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2">
                      <span className="t4-label text-[var(--t4-champagne)]">
                        {rev.reviewerName}
                      </span>
                      <span className="t4-diamond" />
                      <span className="t4-label text-[var(--t4-ivory-faint)]">
                        {rev.procedureCategory}
                      </span>
                    </figcaption>
                  </figure>
                </T4Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
