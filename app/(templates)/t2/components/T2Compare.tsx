"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, X } from "lucide-react";
import { SectionHeader } from "./T2Kit";
import { practice, bookingHref, EASE } from "./t2-lib";

/* ────────────────────────────────────────────────────────────────
   Compare — flagship-launch comparison table. The center column
   (this practice) is highlighted in volt; the flanking columns —
   traditional impressions and mail-order aligners — sit in dim
   text. Boolean rows use volt check circles vs. dim x circles.
   ──────────────────────────────────────────────────────────────── */

type Verdict = boolean;
type Cell = string | Verdict;

interface CompareRow {
  label: string;
  traditional: Cell;
  summit: Cell;
  mailOrder: Cell;
}

const ROWS: CompareRow[] = [
  {
    label: "Visits needed",
    traditional: "3+ visits",
    summit: "1 visit",
    mailOrder: "0 — kit by mail",
  },
  {
    label: "Impression comfort",
    traditional: "Trays and putty",
    summit: "Digital scan, no trays",
    mailOrder: "Self-taken at home",
  },
  {
    label: "Accuracy",
    traditional: "Material can distort",
    summit: "0.02 mm digital",
    mailOrder: "Unverified",
  },
  {
    label: "Crown turnaround",
    traditional: "2–3 weeks in a temporary",
    summit: "Same day",
    mailOrder: "Not offered",
  },
  {
    label: "3D imaging on site",
    traditional: false,
    summit: true,
    mailOrder: false,
  },
  {
    label: "Doctor supervision",
    traditional: true,
    summit: true,
    mailOrder: false,
  },
  {
    label: "Same-day emergency repair",
    traditional: false,
    summit: true,
    mailOrder: false,
  },
];

function CellContent({ value, highlight }: { value: Cell; highlight?: boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <span className="t2p-verdict t2p-verdict-yes" role="img" aria-label="Yes">
        <Check className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden="true" />
      </span>
    ) : (
      <span className="t2p-verdict t2p-verdict-no" role="img" aria-label="No">
        <X className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
      </span>
    );
  }
  return (
    <span
      className={`t2p-mono text-[0.75rem] md:text-[0.8125rem] leading-snug ${
        highlight ? "text-[var(--t2p-volt)]" : "text-[var(--t2p-text-50)]"
      }`}
    >
      {value}
    </span>
  );
}

export default function T2Compare() {
  const reduced = useReducedMotion();

  return (
    <section id="compare" className="relative py-24 md:py-32 px-6 md:px-12 scroll-mt-20">
      <div className="t2p-blueprint absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div className="relative max-w-5xl mx-auto">
        <SectionHeader
          index="04"
          label="Comparison"
          title={
            <>
              Summit digital <span className="t2p-duotext">vs. the old way.</span>
            </>
          }
          lede="The same numbers we hold ourselves to, next to the two alternatives patients ask about most."
        />

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="overflow-x-auto pb-2"
        >
          <div
            role="table"
            aria-label="How digital dentistry compares"
            className="min-w-[640px] grid grid-cols-[1.1fr_1fr_1.15fr_1fr]"
          >
            {/* Header row */}
            <div role="row" className="contents">
              <div role="columnheader" className="px-4 py-5" />
              <div
                role="columnheader"
                className="px-4 py-5 text-center border-b border-[var(--t2p-line)]"
              >
                <p className="t2p-mono text-[0.625rem] uppercase tracking-[0.18em] text-[var(--t2p-text-50)]">
                  Traditional
                </p>
                <p className="mt-1 text-[0.8125rem] text-[var(--t2p-text-70)]">
                  Impressions
                </p>
              </div>
              <div
                role="columnheader"
                className="rounded-t-2xl border border-b-0 border-[var(--t2p-volt-dim)] bg-[rgba(126,224,75,0.05)] px-4 py-5 text-center"
              >
                <p className="t2p-mono text-[0.625rem] uppercase tracking-[0.18em] text-[var(--t2p-volt)]">
                  {practice.globalPracticeName}
                </p>
                <p className="mt-1 text-[0.8125rem] text-[var(--t2p-text)]">
                  Digital dentistry
                </p>
              </div>
              <div
                role="columnheader"
                className="px-4 py-5 text-center border-b border-[var(--t2p-line)]"
              >
                <p className="t2p-mono text-[0.625rem] uppercase tracking-[0.18em] text-[var(--t2p-text-50)]">
                  Mail-order
                </p>
                <p className="mt-1 text-[0.8125rem] text-[var(--t2p-text-70)]">
                  Aligners
                </p>
              </div>
            </div>

            {/* Data rows */}
            {ROWS.map((row, i) => {
              const last = i === ROWS.length - 1;
              return (
                <div role="row" key={row.label} className="contents">
                  <div
                    role="rowheader"
                    className={`flex items-center px-4 py-4 ${
                      last ? "" : "border-b border-[var(--t2p-line)]"
                    }`}
                  >
                    <span className="t2p-mono text-[0.625rem] md:text-[0.6875rem] uppercase tracking-[0.14em] text-[var(--t2p-text-70)]">
                      {row.label}
                    </span>
                  </div>
                  <div
                    role="cell"
                    className={`flex items-center justify-center px-4 py-4 text-center ${
                      last ? "" : "border-b border-[var(--t2p-line)]"
                    }`}
                  >
                    <CellContent value={row.traditional} />
                  </div>
                  <div
                    role="cell"
                    className={`flex items-center justify-center border-x border-[var(--t2p-volt-dim)] bg-[rgba(126,224,75,0.05)] px-4 py-4 text-center ${
                      last
                        ? "rounded-b-2xl border-b"
                        : "border-b border-b-[rgba(126,224,75,0.16)]"
                    }`}
                  >
                    <CellContent value={row.summit} highlight />
                  </div>
                  <div
                    role="cell"
                    className={`flex items-center justify-center px-4 py-4 text-center ${
                      last ? "" : "border-b border-[var(--t2p-line)]"
                    }`}
                  >
                    <CellContent value={row.mailOrder} />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          className="mt-8 flex justify-center"
        >
          <a href={bookingHref} className="t2p-btn t2p-btn-primary">
            <span>Book the digital way</span>
            <span aria-hidden="true">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
