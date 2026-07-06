"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { ReviewData } from "@/types/dentist";
import T3Reveal, { HAVEN_EASE } from "./T3Reveal";

interface T3HavenReviewsProps {
  reviews: ReviewData[];
}

/**
 * Reviews as a photo-testimonial masonry — a staggered 1/2/3-column grid
 * mixing white quote cards (reviewer, procedure, rating) with soft imagery
 * cards carrying a small glassmorphic name-chip. Local practice photos
 * only; the chip pairs each photo with a real review from sampleReviews.
 */

/* reviews rendered as image cards, matched to a local photo by procedure */
const IMAGE_CARD_MAP: Record<string, { src: string; alt: string }> = {
  "rev-005": {
    src: "/images/office-interior.jpg",
    alt: "The calm, light-filled treatment room where sedation visits happen",
  },
  "rev-004": {
    src: "/images/services/invisalign.jpg",
    alt: "A clear Invisalign aligner tray held up to the light",
  },
};

function RatingDots({ rating }: { rating: number }) {
  return (
    <div
      className="flex gap-1.5"
      role="img"
      aria-label={`Rated ${rating} out of 5`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={`h-1.5 w-1.5 rounded-full ${
            i < rating ? "bg-[var(--t3-euc)]" : "bg-[var(--t3-line)]"
          }`}
        />
      ))}
    </div>
  );
}

function QuoteCard({ review }: { review: ReviewData }) {
  return (
    <figure className="mb-5 break-inside-avoid rounded-[1.5rem] bg-white p-7 shadow-[var(--t3-shadow-soft)] transition-all duration-700 hover:shadow-[var(--t3-shadow-bloom)] motion-safe:hover:-translate-y-1 sm:mb-6 sm:p-8">
      <blockquote>
        <p className="t3-serif text-[17px] leading-relaxed text-[var(--t3-moss)]">
          &ldquo;{review.reviewText}&rdquo;
        </p>
      </blockquote>
      <figcaption className="mt-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-normal text-[var(--t3-moss)]">
            {review.reviewerName}
          </p>
          <p className="mt-0.5 text-xs font-light text-[var(--t3-moss-soft)]">
            {review.procedureCategory.toLowerCase()}
            {review.isVerifiedPatient ? " · verified patient" : ""}
          </p>
        </div>
        <div className="pb-0.5">
          <RatingDots rating={review.rating} />
        </div>
      </figcaption>
    </figure>
  );
}

function ImageCard({
  review,
  image,
}: {
  review: ReviewData;
  image: { src: string; alt: string };
}) {
  return (
    <figure className="relative mb-5 break-inside-avoid overflow-hidden rounded-[1.5rem] shadow-[var(--t3-shadow-soft)] transition-all duration-700 hover:shadow-[var(--t3-shadow-bloom)] motion-safe:hover:-translate-y-1 sm:mb-6">
      <div className="relative aspect-[4/5]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          loading="lazy"
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 384px"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(46,59,52,0.28), transparent 45%)",
          }}
        />
      </div>
      <figcaption className="absolute inset-x-4 bottom-4">
        <div className="t3-glass-chip w-auto max-w-full px-4 py-2.5">
          <div className="min-w-0">
            <p className="truncate text-[13px] font-normal text-[var(--t3-moss)]">
              {review.reviewerName}{" "}
              <span className="font-light text-[var(--t3-moss-soft)]">
                · {review.procedureCategory.toLowerCase()}
              </span>
            </p>
          </div>
          <RatingDots rating={review.rating} />
        </div>
      </figcaption>
    </figure>
  );
}

export default function T3HavenReviews({ reviews }: T3HavenReviewsProps) {
  const reduced = useReducedMotion();
  const [filter, setFilter] = useState<string>("all");

  // no reviews on file yet — publish nothing rather than an empty section
  if (reviews.length === 0) return null;

  // Gentle reassurance figures, drawn from the reviews themselves
  const total = reviews.length;
  const avgRating = reviews.reduce((s, r) => s + r.rating, 0) / total;
  const verifiedCount = reviews.filter((r) => r.isVerifiedPatient).length;
  const recommendPct = Math.round(
    (reviews.filter((r) => r.rating >= 4).length / total) * 100,
  );

  // Filter pills, derived from the procedures patients actually mention
  const categories = Array.from(new Set(reviews.map((r) => r.procedureCategory)));
  const chips = ["all", ...categories];
  const filtered =
    filter === "all"
      ? reviews
      : reviews.filter((r) => r.procedureCategory === filter);

  return (
    <section
      aria-labelledby="reviews-heading"
      className="relative bg-[var(--t3-sage-light)] py-24 sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <T3Reveal className="mb-14 max-w-2xl sm:mb-20">
          <p className="t3-marker mb-6 text-sm font-light text-[var(--t3-moss-soft)]">
            in their words
          </p>
          <h2
            id="reviews-heading"
            className="t3-display text-[var(--t3-moss)]"
          >
            what patients{" "}
            <em className="t3-serif text-[var(--t3-euc-deep)]">tell us</em>
          </h2>
        </T3Reveal>

        {/* Quiet reassurance strip — the figures the reviews add up to */}
        <T3Reveal delay={0.1}>
          <div className="mb-12 flex flex-wrap items-center gap-x-12 gap-y-6 border-y border-[var(--t3-line)] py-7 sm:mb-14">
            <div className="flex items-center gap-4">
              <span className="text-4xl font-light text-[var(--t3-moss)] sm:text-5xl">
                {avgRating.toFixed(1)}
              </span>
              <div className="pb-1">
                <RatingDots rating={Math.round(avgRating)} />
                <p className="mt-2 text-xs font-light lowercase text-[var(--t3-moss-soft)]">
                  average rating
                </p>
              </div>
            </div>
            <div>
              <p className="text-4xl font-light text-[var(--t3-moss)] sm:text-5xl">
                {verifiedCount}
              </p>
              <p className="mt-2 text-xs font-light lowercase text-[var(--t3-moss-soft)]">
                verified patients
              </p>
            </div>
            <div>
              <p className="text-4xl font-light text-[var(--t3-moss)] sm:text-5xl">
                {recommendPct}%
              </p>
              <p className="mt-2 text-xs font-light lowercase text-[var(--t3-moss-soft)]">
                would recommend
              </p>
            </div>
          </div>
        </T3Reveal>

        {/* Soft filter pills — browse by what patients came in for */}
        <T3Reveal delay={0.15}>
          <div className="mb-10 flex flex-wrap gap-2.5">
            {chips.map((chip) => {
              const active = filter === chip;
              return (
                <button
                  key={chip}
                  type="button"
                  onClick={() => setFilter(chip)}
                  aria-pressed={active}
                  className={`rounded-full border px-4 py-2 text-[13px] font-light lowercase transition-colors duration-500 ${
                    active
                      ? "border-transparent bg-[var(--t3-euc-deep)] text-[var(--t3-sage-light)]"
                      : "border-[var(--t3-line)] text-[var(--t3-moss-soft)] hover:border-[var(--t3-euc)] hover:text-[var(--t3-moss)]"
                  }`}
                >
                  {chip}
                </button>
              );
            })}
          </div>
        </T3Reveal>

        <T3Reveal delay={0.2}>
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduced ? undefined : { opacity: 0 }}
              transition={{ duration: 0.45, ease: HAVEN_EASE }}
              className="columns-1 gap-5 sm:columns-2 sm:gap-6 lg:columns-3"
            >
              {filtered.map((review) => {
                const image = IMAGE_CARD_MAP[review.id];
                return image ? (
                  <ImageCard key={review.id} review={review} image={image} />
                ) : (
                  <QuoteCard key={review.id} review={review} />
                );
              })}
            </motion.div>
          </AnimatePresence>
        </T3Reveal>
      </div>
    </section>
  );
}
