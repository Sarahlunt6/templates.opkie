"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { bookingHref, telHref, location, EASE } from "./t2-lib";

/* ────────────────────────────────────────────────────────────────
   Financing calculator — a payment instrument panel. Sliders with
   diamond thumbs, mono readouts, live payment telemetry.
   ──────────────────────────────────────────────────────────────── */

interface FinancingOption {
  id: string;
  name: string;
  apr: number;
  minMonths: number;
  maxMonths: number;
  description: string;
}

const FINANCING_OPTIONS: FinancingOption[] = [
  {
    id: "0-apr",
    name: "0% APR",
    apr: 0,
    minMonths: 6,
    maxMonths: 24,
    description: "No interest when paid in full within the promotional period.",
  },
  {
    id: "low-apr",
    name: "Extended term",
    apr: 9.99,
    minMonths: 24,
    maxMonths: 60,
    description: "Lower monthly payments over a longer horizon.",
  },
];

const TREATMENT_PRESETS = [
  { label: "Invisalign", minPrice: 3500, maxPrice: 7000, avgPrice: 5000 },
  { label: "Single implant", minPrice: 3000, maxPrice: 5000, avgPrice: 4000 },
  { label: "Full-mouth implants", minPrice: 20000, maxPrice: 40000, avgPrice: 28000 },
  { label: "Veneers (6)", minPrice: 6000, maxPrice: 12000, avgPrice: 9000 },
  { label: "Custom", minPrice: 500, maxPrice: 50000, avgPrice: 5000 },
];

const fmt = (v: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(v);

function Slider({
  label,
  value,
  display,
  min,
  max,
  step,
  onChange,
  minLabel,
  maxLabel,
}: {
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  minLabel: string;
  maxLabel: string;
}) {
  const fill = max > min ? ((value - min) / (max - min)) * 100 : 0;
  return (
    <div>
      <div className="flex items-baseline justify-between mb-4">
        <label className="t2p-mono text-[0.625rem] uppercase tracking-[0.2em] text-[var(--t2p-text-50)]">
          {label}
        </label>
        <span className="t2p-mono text-lg text-[var(--t2p-text)]">{display}</span>
      </div>
      <input
        type="range"
        className="t2p-range"
        style={{ ["--fill" as string]: `${fill}%` }}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
      />
      <div className="t2p-mono mt-2.5 flex justify-between text-[0.5625rem] uppercase tracking-[0.14em] text-[var(--t2p-text-50)]">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}

export default function T2FinancingCalculator() {
  const [treatment, setTreatment] = useState(TREATMENT_PRESETS[0]);
  const [cost, setCost] = useState(TREATMENT_PRESETS[0].avgPrice);
  const [down, setDown] = useState(0);
  const [plan, setPlan] = useState(FINANCING_OPTIONS[0]);
  const [months, setMonths] = useState(12);
  const [expanded, setExpanded] = useState(false);
  const reduced = useReducedMotion();

  const result = useMemo(() => {
    const financed = Math.max(0, cost - down);
    const r = plan.apr / 100 / 12;
    const payment =
      r === 0
        ? financed / months
        : (financed * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
    const total = payment * months + down;
    return {
      financed,
      payment,
      interest: Math.max(0, total - cost),
      total,
    };
  }, [cost, down, plan, months]);

  return (
    <div className="t2p-tick relative border border-[var(--t2p-line-strong)] bg-[var(--t2p-bg)]">
      {/* Header */}
      <div className="border-b border-[var(--t2p-line)] px-6 md:px-9 py-6 flex items-center justify-between gap-4">
        <div>
          <p className="t2p-label mb-2">Payment instrument</p>
          <h3 className="font-innovator text-xl md:text-2xl font-medium tracking-tight text-[var(--t2p-text)]">
            Model your monthly payment
          </h3>
        </div>
        <span className="t2p-mono hidden sm:block text-[0.625rem] uppercase tracking-[0.2em] text-[var(--t2p-text-50)]">
          EST-01
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5">
        {/* Inputs */}
        <div className="lg:col-span-3 px-6 md:px-9 py-8 space-y-9 lg:border-r border-[var(--t2p-line)]">
          {/* Treatment presets */}
          <div>
            <p className="t2p-mono mb-3.5 text-[0.625rem] uppercase tracking-[0.2em] text-[var(--t2p-text-50)]">
              Treatment
            </p>
            <div className="flex flex-wrap gap-2">
              {TREATMENT_PRESETS.map((t) => (
                <button
                  key={t.label}
                  onClick={() => {
                    setTreatment(t);
                    setCost(t.avgPrice);
                    setDown(0);
                  }}
                  className={`t2p-mono px-3.5 py-2 text-[0.6875rem] uppercase tracking-[0.12em] border transition-colors duration-300 ${
                    treatment.label === t.label
                      ? "border-[var(--t2p-ice)] text-[var(--t2p-ice)] bg-[rgba(103,232,249,0.06)]"
                      : "border-[var(--t2p-line-strong)] text-[var(--t2p-text-70)] hover:border-[var(--t2p-ice-dim)]"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <Slider
            label="Treatment cost"
            value={cost}
            display={fmt(cost)}
            min={treatment.minPrice}
            max={treatment.maxPrice}
            step={100}
            onChange={(v) => {
              setCost(v);
              setDown((d) => Math.min(d, Math.floor(v * 0.5)));
            }}
            minLabel={fmt(treatment.minPrice)}
            maxLabel={fmt(treatment.maxPrice)}
          />

          <Slider
            label="Down payment"
            value={down}
            display={fmt(down)}
            min={0}
            max={Math.floor(cost * 0.5)}
            step={100}
            onChange={setDown}
            minLabel="$0"
            maxLabel={fmt(Math.floor(cost * 0.5))}
          />

          {/* Plan */}
          <div>
            <p className="t2p-mono mb-3.5 text-[0.625rem] uppercase tracking-[0.2em] text-[var(--t2p-text-50)]">
              Plan
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {FINANCING_OPTIONS.map((o) => (
                <button
                  key={o.id}
                  onClick={() => {
                    setPlan(o);
                    setMonths(Math.min(Math.max(months, o.minMonths), o.maxMonths));
                  }}
                  className={`p-4 text-left border transition-colors duration-300 ${
                    plan.id === o.id
                      ? "border-[var(--t2p-ice)] bg-[rgba(103,232,249,0.05)]"
                      : "border-[var(--t2p-line-strong)] hover:border-[var(--t2p-ice-dim)]"
                  }`}
                >
                  <span className="flex items-baseline justify-between gap-2">
                    <span className="text-sm font-medium text-[var(--t2p-text)]">
                      {o.name}
                    </span>
                    <span className="t2p-mono text-[0.6875rem] text-[var(--t2p-ice)]">
                      {o.apr}% APR
                    </span>
                  </span>
                  <span className="mt-1.5 block text-xs leading-relaxed text-[var(--t2p-text-50)]">
                    {o.description} {o.minMonths}–{o.maxMonths} months.
                  </span>
                </button>
              ))}
            </div>
          </div>

          <Slider
            label="Term"
            value={months}
            display={`${months} mo`}
            min={plan.minMonths}
            max={plan.maxMonths}
            step={6}
            onChange={setMonths}
            minLabel={`${plan.minMonths} mo`}
            maxLabel={`${plan.maxMonths} mo`}
          />
        </div>

        {/* Readout */}
        <div className="lg:col-span-2 flex flex-col justify-between px-6 md:px-9 py-8 bg-[var(--t2p-surface)] border-t lg:border-t-0 border-[var(--t2p-line)]">
          <div>
            <p className="t2p-mono text-[0.625rem] uppercase tracking-[0.2em] text-[var(--t2p-text-50)]">
              Estimated monthly
            </p>
            <motion.p
              key={Math.round(result.payment)}
              initial={reduced ? false : { opacity: 0.4 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="t2p-mono mt-2 text-5xl md:text-6xl text-[var(--t2p-ice)] tracking-tight"
            >
              {fmt(result.payment)}
            </motion.p>
            <p className="t2p-mono mt-1.5 text-[0.625rem] uppercase tracking-[0.18em] text-[var(--t2p-text-50)]">
              per month × {months}
            </p>

            <div className="mt-8 border-t border-[var(--t2p-line)]">
              {[
                ["Amount financed", fmt(result.financed)],
                [
                  "Total interest",
                  result.interest === 0 ? "$0" : fmt(result.interest),
                ],
                ["Total cost", fmt(result.total)],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-baseline justify-between py-3 border-b border-[var(--t2p-line)]"
                >
                  <span className="t2p-mono text-[0.625rem] uppercase tracking-[0.16em] text-[var(--t2p-text-50)]">
                    {k}
                  </span>
                  <span className="t2p-mono text-sm text-[var(--t2p-text)]">{v}</span>
                </div>
              ))}
            </div>

            {/* Schedule preview */}
            <button
              onClick={() => setExpanded(!expanded)}
              className="t2p-mono mt-4 flex w-full items-center justify-between py-2 text-[0.625rem] uppercase tracking-[0.18em] text-[var(--t2p-text-70)] hover:text-[var(--t2p-ice)] transition-colors"
              aria-expanded={expanded}
            >
              <span>Payment schedule</span>
              <span aria-hidden="true">{expanded ? "−" : "+"}</span>
            </button>
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  initial={reduced ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="overflow-hidden"
                >
                  {[...Array(Math.min(6, months))].map((_, i) => (
                    <div
                      key={i}
                      className="t2p-mono flex justify-between py-1.5 text-[0.6875rem] text-[var(--t2p-text-70)]"
                    >
                      <span>M{String(i + 1).padStart(2, "0")}</span>
                      <span>{fmt(result.payment)}</span>
                      <span className="text-[var(--t2p-text-50)]">
                        bal {fmt(Math.max(0, result.financed - result.payment * (i + 1)))}
                      </span>
                    </div>
                  ))}
                  {months > 6 && (
                    <p className="t2p-mono py-1.5 text-[0.625rem] text-[var(--t2p-text-50)]">
                      + {months - 6} further payments
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-8">
            <div className="flex flex-col gap-2.5">
              <a href={bookingHref} className="t2p-btn t2p-btn-primary w-full">
                Start an application
              </a>
              <a href={telHref} className="t2p-btn t2p-btn-ghost w-full">
                Call {location.phoneGBP}
              </a>
            </div>
            <p className="mt-4 text-[0.6875rem] leading-relaxed text-[var(--t2p-text-50)]">
              Estimates for illustration only. Actual rates and terms depend on
              credit approval — our coordinators will confirm your numbers
              before anything begins.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
