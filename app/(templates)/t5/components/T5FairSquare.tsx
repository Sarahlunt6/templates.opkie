"use client";

import T5Reveal from "./T5Reveal";

interface T5FairSquareProps {
  insuranceText: string;
  membershipSummary?: string;
}

export default function T5FairSquare({
  insuranceText,
  membershipSummary,
}: T5FairSquareProps) {
  const ways = [
    {
      title: "Got insurance?",
      body: insuranceText,
      footnote: "We handle the claims paperwork for you.",
      accent: "teal" as const,
    },
    ...(membershipSummary
      ? [
          {
            title: "No insurance? No problem.",
            body: membershipSummary,
            footnote: "Cancel anytime — it's a membership, not a contract.",
            accent: "marigold" as const,
          },
        ]
      : []),
    {
      title: "Rather pay monthly?",
      body: "Bigger treatment plans can be split into predictable monthly payments, including 0% interest options for folks who qualify. We'll show you the monthly number before you say yes to anything.",
      footnote: "Applying takes about five minutes, right from your phone.",
      accent: "teal" as const,
    },
  ];

  return (
    <section
      id="fair-and-square"
      className="relative bg-[var(--t5-cream)] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <T5Reveal className="max-w-2xl">
          <p className="t5-kicker text-[var(--t5-marigold-deep)]">
            Money talk
          </p>
          <h2 className="t5-display t5-display-lg mt-4 text-[var(--t5-walnut)]">
            Fair &amp; square,{" "}
            <span className="t5-wave">every single time.</span>
          </h2>
          <p className="mt-5 max-w-xl text-[1.02rem] leading-relaxed text-[var(--t5-walnut-soft)]">
            The price talk happens before the drill comes out — never after.
            Three ways neighbors pay around here:
          </p>
        </T5Reveal>

        <div className="mt-12 grid grid-cols-1 gap-7 md:grid-cols-3">
          {ways.map((way, i) => (
            <T5Reveal
              key={way.title}
              delay={i * 0.09}
              rotate={i % 2 === 0 ? -0.7 : 0.7}
            >
              <article className="flex h-full flex-col rounded-[18px] border-2 border-[var(--t5-walnut)] bg-[var(--t5-paper)] p-8 shadow-[var(--t5-shadow-print)]">
                <span
                  aria-hidden
                  className="mb-5 inline-block h-3 w-16 rounded-full"
                  style={{
                    backgroundColor:
                      way.accent === "marigold"
                        ? "var(--t5-marigold)"
                        : "var(--t5-teal-bright)",
                  }}
                />
                <h3 className="t5-display text-[1.35rem] text-[var(--t5-walnut)]">
                  {way.title}
                </h3>
                <p className="mt-4 flex-1 text-[0.96rem] leading-relaxed text-[var(--t5-walnut-soft)]">
                  {way.body}
                </p>
                <p className="t5-kicker mt-6 flex items-start gap-2 !normal-case !tracking-normal text-[var(--t5-teal)]">
                  <span className="t5-star mt-[2px]" aria-hidden>
                    ★
                  </span>
                  {way.footnote}
                </p>
              </article>
            </T5Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
