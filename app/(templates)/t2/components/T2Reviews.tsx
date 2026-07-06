"use client";

import { motion, useReducedMotion } from "framer-motion";
import { sampleReviews } from "@/data/master";
import { SectionHeader } from "./T2Kit";
import { EASE } from "./t2-lib";

/* ────────────────────────────────────────────────────────────────
   Patient stories — mono type stays on the metadata (procedure tag,
   verification), while the person's words and stars stay human.
   The first grid cell is an instrument readout: the average rating
   as a huge volt numeral over a thin volt progress bar, computed
   from the same data the cards render. All content interpolates
   from data.
   ──────────────────────────────────────────────────────────────── */

function RatingStars({ rating }: { rating: number }) {
  return (
    <span
      className="text-[0.8125rem] tracking-[0.15em] text-[var(--t2p-volt)]"
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

  // no reviews on file yet — publish nothing rather than an empty section
  if (sampleReviews.length === 0) return null;

  const avgRating =
    sampleReviews.reduce((sum, r) => sum + r.rating, 0) / sampleReviews.length;

  return (
    <section id="reviews" className="relative py-24 md:py-32 px-6 md:px-12 bg-[var(--t2p-surface)] scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          index="07"
          label="Patient reviews"
          title={
            <>
              In their <span className="t2p-duotext">own words.</span>
            </>
          }
          lede="Unedited reviews from verified patients."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Rating summary — the instrument readout ahead of the words */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex h-full flex-col justify-between rounded-2xl border border-[var(--t2p-volt-dim)] bg-[#060806] p-7"
          >
            <p className="t2p-mono text-[0.625rem] uppercase tracking-[0.18em] text-[var(--t2p-text-50)]">
              [ Avg rating ]
            </p>

            <div className="py-8">
              <p
                className="t2p-mono text-7xl md:text-8xl leading-none tracking-tight text-[var(--t2p-volt)]"
                aria-label={`Average rating ${avgRating.toFixed(1)} out of 5`}
              >
                {avgRating.toFixed(1)}
              </p>

              {/* Thin volt bar — rating out of 5, drawn like a scan readout */}
              <div
                className="mt-6 h-[2px] w-full overflow-hidden rounded-full bg-[rgba(242,245,240,0.1)]"
                role="img"
                aria-label={`${avgRating.toFixed(1)} of 5 stars`}
              >
                <motion.div
                  className="h-full bg-[var(--t2p-volt)]"
                  style={{
                    boxShadow: "0 0 8px rgba(126, 224, 75, 0.6)",
                  }}
                  initial={
                    reduced
                      ? { width: `${(avgRating / 5) * 100}%` }
                      : { width: 0 }
                  }
                  whileInView={{ width: `${(avgRating / 5) * 100}%` }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 1, delay: 0.25, ease: EASE }}
                />
              </div>
              <div className="t2p-mono mt-2 flex justify-between text-[0.5625rem] uppercase tracking-[0.14em] text-[var(--t2p-text-50)]">
                <span>0</span>
                <span>5.0</span>
              </div>
            </div>

            <p className="t2p-mono text-[0.625rem] uppercase tracking-[0.18em] text-[var(--t2p-text-70)]">
              From {sampleReviews.length} verified patients
            </p>
          </motion.div>

          {sampleReviews.map((review, i) => (
            <motion.figure
              key={review.id}
              initial={reduced ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: EASE }}
              className="t2p-respond relative flex flex-col rounded-2xl border border-[var(--t2p-line)] bg-[var(--t2p-bg)] p-7"
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
