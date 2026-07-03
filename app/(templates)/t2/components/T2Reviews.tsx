"use client";

import { motion, useReducedMotion } from "framer-motion";
import { sampleReviews } from "@/data/master";
import { SectionHeader } from "./T2Kit";
import { EASE } from "./t2-lib";

/* ────────────────────────────────────────────────────────────────
   Patient stories — mono type stays on the metadata (procedure tag,
   verification), while the person's words and stars stay human.
   All review content interpolates from data.
   ──────────────────────────────────────────────────────────────── */

function RatingStars({ rating }: { rating: number }) {
  return (
    <span
      className="text-[0.8125rem] tracking-[0.15em] text-[var(--t2p-ice)]"
      role="img"
      aria-label={`Rated ${rating} out of 5`}
    >
      {"★".repeat(rating)}
      <span className="text-[var(--t2p-line-strong)]">
        {"★".repeat(5 - rating)}
      </span>
    </span>
  );
}

export default function T2Reviews() {
  const reduced = useReducedMotion();

  return (
    <section id="reviews" className="relative py-24 md:py-32 px-6 md:px-12 bg-[var(--t2p-surface)] scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          index="06"
          label="Patient stories"
          title={
            <>
              In their <span className="t2p-duotext">own words.</span>
            </>
          }
          lede="Unedited reviews from verified patients."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sampleReviews.map((review, i) => (
            <motion.figure
              key={review.id}
              initial={reduced ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: EASE }}
              className="relative flex flex-col border border-[var(--t2p-line)] bg-[var(--t2p-bg)] p-7"
            >
              <div className="flex items-center justify-between gap-3 border-b border-[var(--t2p-line)] pb-4">
                <span className="t2p-mono text-[0.625rem] uppercase tracking-[0.16em] text-[var(--t2p-text-50)]">
                  {review.procedureCategory}
                </span>
                <RatingStars rating={review.rating} />
              </div>

              <blockquote className="flex-1 py-5">
                <p className="text-sm md:text-[0.9375rem] leading-relaxed text-[var(--t2p-text-70)]">
                  &ldquo;{review.reviewText}&rdquo;
                </p>
              </blockquote>

              <figcaption className="flex items-baseline justify-between gap-3 border-t border-[var(--t2p-line)] pt-4">
                <span className="text-sm font-medium text-[var(--t2p-text)]">
                  {review.reviewerName}
                </span>
                <span className="t2p-mono text-[0.5625rem] uppercase tracking-[0.16em] text-[var(--t2p-text-50)]">
                  {review.isVerifiedPatient ? "Verified · " : ""}
                  {review.verificationBadge}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
