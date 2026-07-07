"use client";

import T3Reveal from "./T3Reveal";

interface T3HavenFinancingProps {
  insuranceText: string;
  membershipSummary?: string;
}

/**
 * Financing & insurance in the haven register — the affordability story told
 * gently: flexible monthly plans, the insurance we welcome, and a membership
 * for those without. Plain language, soft cards, no pressure. (Carrier names
 * live in the mission strip; here we keep the reassurance, not the list.)
 */
export default function T3HavenFinancing({
  membershipSummary,
}: T3HavenFinancingProps) {
  return (
    <section
      id="financing"
      aria-labelledby="financing-heading"
      className="relative bg-[var(--t3-sage-light)] py-24 sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <T3Reveal className="mb-14 max-w-2xl sm:mb-20">
          <p className="t3-marker mb-6 text-sm font-light text-[var(--t3-moss-soft)]">
            no surprises
          </p>
          <h2 id="financing-heading" className="t3-display text-[var(--t3-moss)]">
            care that{" "}
            <em className="t3-serif text-[var(--t3-euc-deep)]">
              fits your life
            </em>
          </h2>
          <p className="mt-6 max-w-md text-base font-light leading-relaxed text-[var(--t3-moss-soft)]">
            We&rsquo;ll always talk through the numbers before anything begins —
            and find a way forward that feels comfortable.
          </p>
        </T3Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Monthly plans */}
          <T3Reveal delay={0.1}>
            <div className="flex h-full flex-col rounded-[1.5rem] bg-white p-7 shadow-[var(--t3-shadow-soft)] sm:p-8">
              <p className="t3-serif mb-3 text-xl text-[var(--t3-euc-deep)]">
                flexible monthly plans
              </p>
              <p className="text-[15px] font-light leading-relaxed text-[var(--t3-moss-soft)]">
                Spread treatment into predictable monthly payments — including
                interest-free options for those who qualify. No pressure, and no
                penalty for taking your time.
              </p>
            </div>
          </T3Reveal>

          {/* Insurance */}
          <T3Reveal delay={0.18}>
            <div className="flex h-full flex-col rounded-[1.5rem] bg-white p-7 shadow-[var(--t3-shadow-soft)] sm:p-8">
              <p className="t3-serif mb-3 text-xl text-[var(--t3-euc-deep)]">
                most insurance welcome
              </p>
              <p className="text-[15px] font-light leading-relaxed text-[var(--t3-moss-soft)]">
                We accept most major dental plans and verify your benefits
                before your visit, so you know what&rsquo;s covered ahead of
                time — no guessing, no surprises.
              </p>
            </div>
          </T3Reveal>

          {/* Membership */}
          {membershipSummary && (
            <T3Reveal delay={0.26}>
              <div
                className="flex h-full flex-col rounded-[1.5rem] p-7 shadow-[var(--t3-shadow-soft)] sm:p-8"
                style={{ backgroundColor: "rgba(201,126,93,0.14)" }}
              >
                <p className="t3-serif mb-3 text-xl text-[var(--t3-clay-deep)]">
                  no insurance? no problem
                </p>
                <p className="text-[15px] font-light leading-relaxed text-[var(--t3-moss-soft)]">
                  {membershipSummary}
                </p>
              </div>
            </T3Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
