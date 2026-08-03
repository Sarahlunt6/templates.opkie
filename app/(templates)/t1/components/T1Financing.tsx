"use client";

import { Fade } from "./T1Motion";

interface T1FinancingProps {
  insuranceText: string;
  membershipSummary?: string;
  phone: string;
}

/** Financing highlights — template voice, safe defaults. */
const PLANS = [
  {
    title: "Interest-free plans",
    note: "0% APR on qualifying treatment, paid over 6–24 months.",
  },
  {
    title: "Extended terms",
    note: "Lower monthly payments spread across 24–60 months.",
  },
  {
    title: "Transparent estimates",
    note: "Every number in writing before a single appointment is booked.",
  },
];

/**
 * T1 PRESS — the cost, stated plainly. A ruled three-column ledger:
 * financing plans, accepted insurance, and the membership option for
 * the uninsured. Mono labels, red indices, hairline rules — the fine
 * print treated as editorial matter, not an afterthought.
 */
export default function T1Financing({
  insuranceText,
  membershipSummary,
  phone,
}: T1FinancingProps) {
  const tel = `tel:${phone.replace(/[^0-9+]/g, "")}`;

  return (
    <Fade>
      <div className="grid grid-cols-1 gap-px border border-[var(--t1-hairline)] bg-[var(--t1-hairline)] lg:grid-cols-3">
        {/* Financing plans */}
        <div className="bg-[var(--t1-paper)] p-6 md:p-8">
          <h3 className="t1-mono-label t1-mono-label-red">[ FINANCING ]</h3>
          <ul className="mt-5">
            {PLANS.map((plan, i) => (
              <li
                key={plan.title}
                className="border-t border-[var(--t1-hairline)] py-4 first:border-t-0 first:pt-0"
              >
                <p className="flex items-baseline gap-3">
                  <span className="t1-mono-label t1-mono-label-red shrink-0">
                    [ {String(i + 1).padStart(2, "0")} ]
                  </span>
                  <span className="font-t1-press text-lg uppercase leading-none text-[var(--t1-ink)]">
                    {plan.title}
                  </span>
                </p>
                <p className="mt-2 pl-[2.75rem] font-sans text-sm leading-relaxed text-[var(--t1-stone)]">
                  {plan.note}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Insurance */}
        <div className="bg-[var(--t1-paper)] p-6 md:p-8">
          <h3 className="t1-mono-label t1-mono-label-red">[ ON INSURANCE ]</h3>
          <p className="mt-5 max-w-prose font-sans text-sm leading-[1.8] text-[var(--t1-stone)] md:text-base">
            {insuranceText}
          </p>
        </div>

        {/* Membership / questions */}
        <div className="bg-[var(--t1-paper)] p-6 md:p-8">
          {membershipSummary ? (
            <>
              <h3 className="t1-mono-label t1-mono-label-red">
                [ WITHOUT INSURANCE ]
              </h3>
              <p className="mt-5 max-w-prose font-sans text-sm leading-[1.8] text-[var(--t1-stone)] md:text-base">
                {membershipSummary}
              </p>
            </>
          ) : (
            <>
              <h3 className="t1-mono-label t1-mono-label-red">[ QUESTIONS ]</h3>
              <p className="mt-5 font-sans text-sm leading-[1.8] text-[var(--t1-stone)] md:text-base">
                Call{" "}
                <a href={tel} className="t1-link font-medium">
                  {phone}
                </a>{" "}
                — a real person will walk through the numbers with you.
              </p>
            </>
          )}
        </div>
      </div>
    </Fade>
  );
}
