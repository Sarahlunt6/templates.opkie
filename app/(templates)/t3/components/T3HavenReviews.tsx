"use client";

import type { ReviewData } from "@/types/dentist";
import T3Reveal from "./T3Reveal";

interface T3HavenReviewsProps {
  reviews: ReviewData[];
}

function ReviewCard({ review }: { review: ReviewData }) {
  return (
    <figure className="flex w-[320px] flex-shrink-0 flex-col justify-between rounded-[2rem] bg-[var(--t3-sand)] p-7 shadow-[var(--t3-shadow-soft)] sm:w-[420px] sm:p-9">
      <blockquote>
        <p className="t3-serif text-[17px] leading-relaxed text-[var(--t3-moss)] sm:text-[19px]">
          &ldquo;{review.reviewText}&rdquo;
        </p>
      </blockquote>
      <figcaption className="mt-7 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-normal text-[var(--t3-moss)]">
            {review.reviewerName}
          </p>
          <p className="mt-0.5 text-xs font-light text-[var(--t3-moss-soft)]">
            {review.procedureCategory.toLowerCase()}
            {review.isVerifiedPatient ? " · verified patient" : ""}
          </p>
        </div>
        <div
          className="flex gap-1.5 pb-0.5"
          role="img"
          aria-label={`Rated ${review.rating} out of 5`}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              aria-hidden="true"
              className={`h-1.5 w-1.5 rounded-full ${
                i < review.rating
                  ? "bg-[var(--t3-euc)]"
                  : "bg-[var(--t3-line)]"
              }`}
            />
          ))}
        </div>
      </figcaption>
    </figure>
  );
}

/**
 * Reviews as a slow drifting carousel — a continuous, pausable CSS drift
 * (85s per loop) with review text set in Newsreader italic. Under
 * prefers-reduced-motion it becomes a plain horizontally scrollable row.
 */
export default function T3HavenReviews({ reviews }: T3HavenReviewsProps) {
  return (
    <section
      aria-labelledby="reviews-heading"
      className="relative overflow-hidden py-24 sm:py-32 lg:py-40"
    >
      <div className="mx-auto mb-14 max-w-7xl px-5 sm:mb-20 sm:px-8">
        <T3Reveal className="max-w-2xl">
          <p className="t3-marker mb-6 text-sm font-light text-[var(--t3-moss-soft)]">
            in their words
          </p>
          <h2
            id="reviews-heading"
            className="text-[clamp(1.9rem,4.5vw,3.2rem)] font-extralight leading-[1.12] text-[var(--t3-moss)]"
          >
            what patients{" "}
            <em className="t3-serif text-[var(--t3-euc-deep)]">tell us</em>
          </h2>
        </T3Reveal>
      </div>

      <T3Reveal delay={0.15}>
        <div
          className="t3-marquee"
          role="region"
          aria-label="Patient reviews, drifting slowly"
        >
          <div className="t3-marquee-track">
            <div className="flex gap-6 pr-6 sm:gap-8 sm:pr-8">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
            {/* duplicate strip for the seamless loop — hidden from AT */}
            <div className="flex gap-6 pr-6 sm:gap-8 sm:pr-8" aria-hidden="true">
              {reviews.map((review) => (
                <ReviewCard key={`${review.id}-dup`} review={review} />
              ))}
            </div>
          </div>
        </div>
      </T3Reveal>

      <p className="mt-12 px-5 text-center text-sm font-light text-[var(--t3-moss-faint)] sm:px-8">
        drift pauses when you hover
      </p>
    </section>
  );
}
