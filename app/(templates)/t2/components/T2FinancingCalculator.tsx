"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { bookingHref, telHref, location, EASE } from "./t2-lib";

/* ────────────────────────────────────────────────────────────────
   Treatment configurator — build your plan like a flagship spec
   sheet: selectable option rows with mono pricing, precision
   sliders, a live payment readout, and a running total anchored
   bottom-right above a full-width pill CTA.
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

/**
 * Balance-over-term sparkline — the outstanding balance amortizing to zero,
 * drawn as a filled area in scan blue. A compact readout of how the plan pays
 * down, sized to the narrow results column.
 */
function BalanceChart({
  financed,
  payment,
  months,
  apr,
}: {
  financed: number;
  payment: number;
  months: number;
  apr: number;
}) {
  const r = apr / 100 / 12;
  const points: number[] = [financed];
  for (let k = 1; k <= months; k++) {
    const bal =
      r === 0
        ? financed - payment * k
        : financed * Math.pow(1 + r, k) - payment * ((Math.pow(1 + r, k) - 1) / r);
    points.push(Math.max(0, bal));
  }
  const max = financed || 1;
  const W = 100;
  const H = 40;
  const stepX = points.length > 1 ? W / (points.length - 1) : W;
  const coords = points.map(
    (b, i) => [i * stepX, H - (b / max) * H] as const,
  );
  const line = coords
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`)
    .join(" ");
  const area = `${line} L${W} ${H} L0 ${H} Z`;

  return (
    <div className="mt-6">
      <p className="t2p-mono mb-2.5 text-[0.625rem] uppercase tracking-[0.16em] text-[var(--t2p-text-50)]">
        Balance over term
      </p>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="h-14 w-full"
        role="img"
        aria-label={`Outstanding balance declining from ${fmt(financed)} to $0 over ${months} months`}
      >
        <defs>
          <linearGradient id="t2p-bal-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgb(var(--t2p-scan-rgb) / 0.35)" />
            <stop offset="100%" stopColor="rgb(var(--t2p-scan-rgb) / 0)" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#t2p-bal-fill)" />
        <path
          d={line}
          fill="none"
          stroke="var(--t2p-blue)"
          strokeWidth={1.5}
          vectorEffect="non-scaling-stroke"
          strokeLinejoin="round"
        />
      </svg>
      <div className="t2p-mono mt-1.5 flex justify-between text-[0.5625rem] uppercase tracking-[0.14em] text-[var(--t2p-text-50)]">
        <span>{fmt(financed)}</span>
        <span>paid off · M{months}</span>
      </div>
    </div>
  );
}

/** Configurator option row — name left, mono price right, blue check when selected. */
function OptionRow({
  selected,
  onSelect,
  name,
  detail,
  price,
}: {
  selected: boolean;
  onSelect: () => void;
  name: string;
  detail?: string;
  price: string;
}) {
  return (
    <button
      onClick={onSelect}
      aria-pressed={selected}
      className={`flex w-full items-center gap-4 rounded-xl border px-4 py-3.5 text-left transition-colors duration-300 ${
        selected
          ? "border-[var(--t2p-blue)] bg-[rgb(var(--t2p-blue-rgb)_/_0.05)]"
          : "border-[var(--t2p-line-strong)] hover:border-[var(--t2p-scan-dim)]"
      }`}
    >
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
          selected
            ? "border-[var(--t2p-blue)] bg-[var(--t2p-blue)] text-white"
            : "border-[var(--t2p-line-strong)] text-transparent"
        }`}
        aria-hidden="true"
      >
        <Check className="h-3 w-3" strokeWidth={3} />
      </span>
      <span className="flex-1 min-w-0">
        <span className="block text-sm font-medium text-[var(--t2p-text)]">
          {name}
        </span>
        {detail && (
          <span className="mt-0.5 block text-xs leading-relaxed text-[var(--t2p-text-50)]">
            {detail}
          </span>
        )}
      </span>
      <span
        className={`t2p-mono shrink-0 text-[0.75rem] ${
          selected ? "text-[var(--t2p-blue)]" : "text-[var(--t2p-text-50)]"
        }`}
      >
        {price}
      </span>
    </button>
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
    <div className="relative overflow-hidden rounded-2xl border border-[var(--t2p-line-strong)] bg-[var(--t2p-bg)]">
      {/* Header */}
      <div className="border-b border-[var(--t2p-line)] px-6 md:px-9 py-6 flex items-center justify-between gap-4">
        <div>
          <p className="t2p-label mb-2">Configurator</p>
          <h3 className="font-innovator text-xl md:text-2xl font-medium tracking-tight text-[var(--t2p-text)]">
            Build your treatment plan
          </h3>
        </div>
        <span className="t2p-mono hidden sm:block text-[0.625rem] uppercase tracking-[0.2em] text-[var(--t2p-text-50)]">
          EST-01
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5">
        {/* Inputs */}
        <div className="lg:col-span-3 px-6 md:px-9 py-8 space-y-9 lg:border-r border-[var(--t2p-line)]">
          {/* Treatment option rows */}
          <div>
            <p className="t2p-mono mb-3.5 text-[0.625rem] uppercase tracking-[0.2em] text-[var(--t2p-text-50)]">
              01 / Treatment
            </p>
            <div className="space-y-2">
              {TREATMENT_PRESETS.map((t) => (
                <OptionRow
                  key={t.label}
                  selected={treatment.label === t.label}
                  onSelect={() => {
                    setTreatment(t);
                    setCost(t.avgPrice);
                    setDown(0);
                  }}
                  name={t.label}
                  price={`from ${fmt(t.minPrice)}`}
                />
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

          {/* Plan option rows */}
          <div>
            <p className="t2p-mono mb-3.5 text-[0.625rem] uppercase tracking-[0.2em] text-[var(--t2p-text-50)]">
              02 / Financing
            </p>
            <div className="space-y-2">
              {FINANCING_OPTIONS.map((o) => (
                <OptionRow
                  key={o.id}
                  selected={plan.id === o.id}
                  onSelect={() => {
                    setPlan(o);
                    setMonths(Math.min(Math.max(months, o.minMonths), o.maxMonths));
                  }}
                  name={o.name}
                  detail={`${o.description} ${o.minMonths}–${o.maxMonths} months.`}
                  price={o.apr === 0 ? "+$0 interest" : `+${o.apr}% APR`}
                />
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
        <div className="lg:col-span-2 flex flex-col px-6 md:px-9 py-8 bg-[var(--t2p-surface)] border-t lg:border-t-0 border-[var(--t2p-line)]">
          <div className="flex-1">
            <p className="t2p-mono text-[0.625rem] uppercase tracking-[0.2em] text-[var(--t2p-text-50)]">
              Estimated monthly
            </p>
            <motion.p
              key={Math.round(result.payment)}
              initial={reduced ? false : { opacity: 0.4 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="t2p-mono mt-2 text-5xl md:text-6xl text-[var(--t2p-blue)] tracking-tight"
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

            {/* Amortization visual */}
            <BalanceChart
              financed={result.financed}
              payment={result.payment}
              months={months}
              apr={plan.apr}
            />

            {/* Schedule preview */}
            <button
              onClick={() => setExpanded(!expanded)}
              className="t2p-mono mt-4 flex w-full items-center justify-between py-2 text-[0.625rem] uppercase tracking-[0.18em] text-[var(--t2p-text-70)] hover:text-[var(--t2p-blue)] transition-colors"
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

          {/* Running total — anchored bottom-right */}
          <div className="mt-8">
            <div className="flex items-end justify-between gap-4 border-t border-[var(--t2p-line)] pt-5">
              <span className="t2p-mono text-[0.625rem] uppercase tracking-[0.2em] text-[var(--t2p-text-50)]">
                Est. total
              </span>
              <motion.span
                key={Math.round(result.total)}
                initial={reduced ? false : { opacity: 0.4 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="t2p-mono text-right text-2xl md:text-3xl tracking-tight text-[var(--t2p-text)]"
              >
                {fmt(result.total)}
              </motion.span>
            </div>
            <div className="mt-5 flex flex-col gap-2.5">
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
