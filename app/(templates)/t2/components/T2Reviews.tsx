"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { sampleReviews } from "@/data/master";
import type { ReviewData } from "@/types/dentist";
import { SectionHeader } from "./T2Kit";
import { EASE } from "./t2-lib";

/* ────────────────────────────────────────────────────────────────
   Patient stories, read as case telemetry. The section splits in two:
   a full-width instrument panel up top — the aggregate rating as a
   huge blue numeral over an animated scan bar, beside a data-driven
   breakdown of verified sources — then a balanced grid of the reviews
   themselves. Mono type stays on the metadata (procedure tag, source,
   date); the person's words and stars stay human. Everything
   interpolates from the same review data.
   ──────────────────────────────────────────────────────────────── */

const SOURCE_LABELS: Record<ReviewData["verificationBadge"], string> = {
  google: "Google",
  facebook: "Facebook",
  yelp: "Yelp",
  healthgrades: "Healthgrades",
};

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** "2024-11-15" → "Nov 2024"; anything unparseable renders nothing. */
function formatMonthYear(iso: string): string {
  const m = iso.match(/^(\d{4})-(\d{2})/);
  if (!m) return "";
  const month = MONTHS[parseInt(m[2], 10) - 1];
  return month ? `${month} ${m[1]}` : m[1];
}

function RatingStars({
  rating,
  className = "text-[0.8125rem] tracking-[0.15em]",
}: {
  rating: number;
  className?: string;
}) {
  const filled = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <span
      className={`${className} text-[var(--t2p-blue)]`}
      role="img"
      aria-label={`Rated ${rating} out of 5`}
    >
      {"★".repeat(filled)}
      <span className="text-[var(--t2p-line-strong)]">
        {"★".repeat(5 - filled)}
      </span>
    </span>
  );
}

export default function T2Reviews() {
  const reduced = useReducedMotion();
  // "all" or a procedureCategory string
  const [filter, setFilter] = useState<string>("all");

  // no reviews on file yet — publish nothing rather than an empty section
  if (sampleReviews.length === 0) return null;

  const total = sampleReviews.length;
  const avgRating =
    sampleReviews.reduce((sum, r) => sum + r.rating, 0) / total;
  const verifiedPct = Math.round(
    (sampleReviews.filter((r) => r.isVerifiedPatient).length / total) * 100,
  );

  // Verified-source mix, computed from the same data the cards render
  const sourceCounts = sampleReviews.reduce<Record<string, number>>(
    (acc, r) => {
      acc[r.verificationBadge] = (acc[r.verificationBadge] ?? 0) + 1;
      return acc;
    },
    {},
  );
  const sources = (
    Object.keys(SOURCE_LABELS) as ReviewData["verificationBadge"][]
  )
    .map((key) => ({ key, label: SOURCE_LABELS[key], count: sourceCounts[key] ?? 0 }))
    .filter((s) => s.count > 0)
    .sort((a, b) => b.count - a.count);
  const maxSource = Math.max(1, ...sources.map((s) => s.count));

  // Procedure categories, in first-seen order, each with a count — the
  // filter chips derive straight from the review data.
  const categoryCounts = sampleReviews.reduce<Record<string, number>>(
    (acc, r) => {
      acc[r.procedureCategory] = (acc[r.procedureCategory] ?? 0) + 1;
      return acc;
    },
    {},
  );
  const categories = Array.from(new Set(sampleReviews.map((r) => r.procedureCategory)));
  const filtered =
    filter === "all"
      ? sampleReviews
      : sampleReviews.filter((r) => r.procedureCategory === filter);

  const chips = [
    { key: "all", label: "All", count: total },
    ...categories.map((c) => ({ key: c, label: c, count: categoryCounts[c] })),
  ];

  return (
    <section id="reviews" className="relative py-24 md:py-32 px-6 md:px-12 bg-[var(--t2p-surface)] scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          index="17"
          label="Patient reviews"
          title={
            <>
              In their <span className="t2p-duotext">own words.</span>
            </>
          }
          lede="Unedited reviews from verified patients — and the aggregate they add up to."
        />

        {/* ── Aggregate readout: the instrument panel ahead of the words ── */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="t2p-tick relative mb-5 overflow-hidden rounded-2xl border border-[var(--t2p-line-strong)] bg-[var(--t2p-surface)] md:mb-8"
        >
          <span
            className="t2p-corner-glow pointer-events-none absolute inset-0"
            aria-hidden="true"
          />
          <div className="relative grid items-center gap-8 p-8 md:grid-cols-[minmax(0,0.85fr)_1px_minmax(0,1fr)] md:gap-12 md:p-10 lg:p-12">
            {/* Left — the number */}
            <div>
              <p className="t2p-mono text-[0.625rem] uppercase tracking-[0.18em] text-[var(--t2p-text-50)]">
                [ Aggregate rating ]
              </p>

              <div className="mt-5 flex items-end gap-5">
                <span
                  className="t2p-mono text-7xl leading-[0.82] tracking-tight text-[var(--t2p-blue)] md:text-8xl"
                  aria-label={`Average rating ${avgRating.toFixed(1)} out of 5`}
                >
                  {avgRating.toFixed(1)}
                </span>
                <div className="pb-1.5">
                  <RatingStars
                    rating={avgRating}
                    className="text-base tracking-[0.18em]"
                  />
                  <p className="mt-2 text-sm text-[var(--t2p-text-70)]">
                    out of 5.0 · {total} reviews
                  </p>
                </div>
              </div>

              {/* Thin blue bar — rating out of 5, drawn like a scan readout */}
              <div
                className="mt-7 h-[2px] w-full overflow-hidden rounded-full bg-[rgba(23,32,42,0.1)]"
                role="img"
                aria-label={`${avgRating.toFixed(1)} of 5 stars`}
              >
                <motion.div
                  className="h-full bg-[var(--t2p-blue)]"
                  style={{ boxShadow: "0 0 8px rgb(var(--t2p-scan-rgb) / 0.5)" }}
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

            {/* Divider — vertical on desktop, drops out on mobile */}
            <span
              className="hidden h-full w-px bg-[var(--t2p-line)] md:block"
              aria-hidden="true"
            />

            {/* Right — where the reviews come from */}
            <div className="border-t border-[var(--t2p-line)] pt-8 md:border-t-0 md:pt-0">
              <div className="flex items-center justify-between gap-4">
                <p className="t2p-mono text-[0.625rem] uppercase tracking-[0.18em] text-[var(--t2p-text-50)]">
                  [ Verified sources ]
                </p>
                <span className="t2p-mono flex items-center gap-2 text-[0.625rem] uppercase tracking-[0.14em] text-[var(--t2p-text-70)]">
                  <span className="t2p-dot rounded-full" aria-hidden="true" />
                  {verifiedPct}% verified
                </span>
              </div>

              <ul className="mt-6 space-y-3.5">
                {sources.map((s, i) => (
                  <li key={s.key} className="flex items-center gap-4">
                    <span className="t2p-mono w-24 shrink-0 text-[0.6875rem] uppercase tracking-[0.12em] text-[var(--t2p-text-70)]">
                      {s.label}
                    </span>
                    <span className="h-[2px] flex-1 overflow-hidden rounded-full bg-[rgba(23,32,42,0.1)]">
                      <motion.span
                        className="block h-full bg-[var(--t2p-scan)]"
                        style={{ boxShadow: "0 0 6px rgb(var(--t2p-scan-rgb) / 0.5)" }}
                        initial={
                          reduced
                            ? { width: `${(s.count / maxSource) * 100}%` }
                            : { width: 0 }
                        }
                        whileInView={{ width: `${(s.count / maxSource) * 100}%` }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{
                          duration: 0.8,
                          delay: 0.3 + i * 0.08,
                          ease: EASE,
                        }}
                      />
                    </span>
                    <span className="t2p-mono w-4 shrink-0 text-right text-[0.8125rem] tabular-nums text-[var(--t2p-blue)]">
                      {s.count}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* ── Filter bar — chips derived from the review data ── */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-6 flex flex-wrap items-center gap-2.5"
        >
          {chips.map((chip) => {
            const active = filter === chip.key;
            return (
              <button
                key={chip.key}
                type="button"
                onClick={() => setFilter(chip.key)}
                aria-pressed={active}
                className={`t2p-mono inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[0.625rem] uppercase tracking-[0.14em] transition-colors duration-300 ${
                  active
                    ? "border-[var(--t2p-blue)] bg-[rgb(var(--t2p-blue-rgb)_/_0.08)] text-[var(--t2p-blue)]"
                    : "border-[var(--t2p-line-strong)] text-[var(--t2p-text-70)] hover:border-[var(--t2p-blue)] hover:text-[var(--t2p-text)]"
                }`}
              >
                {active && (
                  <span
                    className="h-1 w-1 rounded-full bg-[var(--t2p-scan)]"
                    aria-hidden="true"
                  />
                )}
                {chip.label}
                <span className={active ? "text-[var(--t2p-blue)]/60" : "text-[var(--t2p-text-50)]"}>
                  {chip.count}
                </span>
              </button>
            );
          })}
          <span className="t2p-mono ml-auto hidden text-[0.5625rem] uppercase tracking-[0.16em] text-[var(--t2p-text-50)] sm:inline">
            [ {filtered.length} / {total} shown ]
          </span>
        </motion.div>

        {/* ── The reviews — tiles re-flow as the filter changes ── */}
        <motion.div layout className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
          {filtered.map((review, i) => (
            <motion.figure
              key={review.id}
              layout
              initial={reduced ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.06, ease: EASE }}
              className="t2p-respond group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--t2p-line)] bg-[var(--t2p-bg)] p-7 md:p-8"
            >
              {/* Scan-light edge — ignites when the card powers on */}
              <span
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[var(--t2p-scan)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ boxShadow: "0 0 12px rgb(var(--t2p-scan-rgb) / 0.6)" }}
                aria-hidden="true"
              />
              {/* Oversized quotation mark, kept faint behind the metadata */}
              <span
                className="font-innovator pointer-events-none absolute right-6 top-2 select-none text-6xl leading-none"
                style={{ color: "rgb(var(--t2p-scan-rgb) / 0.16)" }}
                aria-hidden="true"
              >
                &rdquo;
              </span>

              <div className="relative flex items-center justify-between gap-3">
                <span className="t2p-mono inline-flex items-center gap-1.5 rounded-full border border-[var(--t2p-line-strong)] px-2.5 py-1 text-[0.5625rem] uppercase tracking-[0.14em] text-[var(--t2p-text-70)]">
                  <span
                    className="h-1 w-1 rounded-full bg-[var(--t2p-scan)]"
                    aria-hidden="true"
                  />
                  {review.procedureCategory}
                </span>
                <RatingStars rating={review.rating} />
              </div>

              <blockquote className="flex-1 pt-5">
                <p className="text-[0.9375rem] leading-relaxed text-[var(--t2p-text-70)] md:text-base">
                  &ldquo;{review.reviewText}&rdquo;
                </p>
              </blockquote>

              <figcaption className="mt-6 flex items-end justify-between gap-3 border-t border-[var(--t2p-line)] pt-4">
                <span className="text-sm font-medium text-[var(--t2p-text)]">
                  {review.reviewerName}
                </span>
                <span className="t2p-mono text-right text-[0.5625rem] uppercase leading-relaxed tracking-[0.14em] text-[var(--t2p-text-50)]">
                  {review.isVerifiedPatient ? "Verified · " : ""}
                  {SOURCE_LABELS[review.verificationBadge] ??
                    review.verificationBadge}
                  {formatMonthYear(review.datePosted) && (
                    <>
                      <br />
                      {formatMonthYear(review.datePosted)}
                    </>
                  )}
                </span>
              </figcaption>
            </motion.figure>
          ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
