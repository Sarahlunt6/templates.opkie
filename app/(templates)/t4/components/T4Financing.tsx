"use client";

import T4Reveal, { T4RuleDraw } from "./T4Reveal";

interface T4FinancingProps {
  insuranceText: string;
  membershipSummary?: string;
}

export default function T4Financing({
  insuranceText,
  membershipSummary,
}: T4FinancingProps) {
  const ledger = [
    {
      title: "Insurance",
      body: insuranceText,
      note: "We file the paperwork for you",
    },
    ...(membershipSummary
      ? [
          {
            title: "The membership",
            body: membershipSummary,
            note: "For patients without insurance",
          },
        ]
      : []),
    {
      title: "Monthly terms",
      body: "Larger plans can be paid monthly through financing partners, including 0% APR for qualifying patients. We'll show you the exact monthly figure before you decide anything.",
      note: "Applications take about five minutes",
    },
  ];

  return (
    <section id="terms" className="t4-salon relative pb-24 pt-4 lg:pb-36">
      <div className="mx-auto max-w-[88rem] px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-3">
            <T4Reveal className="lg:sticky lg:top-32">
              <p className="t4-label text-[var(--t4-brass-ink)]">The terms</p>
              <T4RuleDraw className="mt-5 w-16" />
            </T4Reveal>
          </div>

          <div className="lg:col-span-9 lg:col-start-4">
            <T4Reveal>
              <h2 className="t4-display t4-display-lg max-w-2xl text-[#241a12]">
                The figure on your plan is the figure on your invoice.
              </h2>
              <p className="mt-6 max-w-xl font-t4-body text-[1.02rem] font-light leading-relaxed text-[var(--t4-espresso-soft)]">
                Money conversations happen before treatment, in writing, in
                plain English. Three ways patients of the house settle their
                care:
              </p>
            </T4Reveal>

            <div className="mt-14 grid grid-cols-1 md:grid-cols-3">
              {ledger.map((page, i) => (
                <T4Reveal key={page.title} delay={i * 0.1}>
                  <div
                    className={`flex h-full flex-col border-t border-[var(--t4-line-light)] py-8 md:border-t-0 md:py-2 ${
                      i > 0 ? "md:border-l md:border-[var(--t4-line-light)] md:pl-10" : ""
                    } ${i < ledger.length - 1 ? "md:pr-10" : ""}`}
                  >
                    <h3 className="t4-display text-[1.45rem] text-[#241a12]">
                      {page.title}
                    </h3>
                    <p className="mt-4 flex-1 font-t4-body text-[0.95rem] font-light leading-relaxed text-[var(--t4-espresso-soft)]">
                      {page.body}
                    </p>
                    <p className="mt-6 flex items-center gap-3">
                      <span className="t4-diamond !bg-[var(--t4-brass-ink)]" />
                      <span className="t4-label text-[var(--t4-brass-ink)]">
                        {page.note}
                      </span>
                    </p>
                  </div>
                </T4Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
