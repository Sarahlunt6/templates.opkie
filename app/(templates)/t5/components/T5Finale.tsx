"use client";

import T5Reveal from "./T5Reveal";

interface T5FinaleProps {
  phone: string;
  bookingUrl: string;
  hasEmergency: boolean;
}

const CONFETTI = [
  { top: "14%", left: "8%", rotate: "-12deg", size: "1.6rem", opacity: 0.5 },
  { top: "22%", right: "10%", rotate: "18deg", size: "2.1rem", opacity: 0.45 },
  { bottom: "20%", left: "16%", rotate: "10deg", size: "1.3rem", opacity: 0.4 },
  { bottom: "26%", right: "18%", rotate: "-15deg", size: "1.5rem", opacity: 0.5 },
];

export default function T5Finale({
  phone,
  bookingUrl,
  hasEmergency,
}: T5FinaleProps) {
  const telHref = `tel:${phone.replace(/[^0-9+]/g, "")}`;
  const bookHref = bookingUrl !== "none" ? bookingUrl : telHref;

  return (
    <section className="relative overflow-hidden bg-[var(--t5-marigold)]">
      {/* the awning hem, hanging over the sunshine */}
      <div
        className="t5-awning"
        style={
          {
            "--awning-a": "var(--t5-teal)",
            "--awning-b": "var(--t5-paper)",
          } as React.CSSProperties
        }
        aria-hidden
      />

      {/* star confetti, printed flat */}
      {CONFETTI.map((c, i) => (
        <span
          key={i}
          aria-hidden
          className="pointer-events-none absolute select-none text-[var(--t5-walnut)]"
          style={{
            top: c.top,
            bottom: c.bottom,
            left: c.left,
            right: c.right,
            transform: `rotate(${c.rotate})`,
            fontSize: c.size,
            opacity: c.opacity,
          }}
        >
          ★
        </span>
      ))}

      <div className="relative mx-auto max-w-4xl px-5 py-24 text-center lg:py-32">
        <T5Reveal>
          <p className="t5-script text-[clamp(1.7rem,3vw,2.4rem)] text-[var(--t5-teal-deep)]">
            well, what are you waiting for?
          </p>
        </T5Reveal>

        <T5Reveal delay={0.1}>
          <h2 className="t5-display mt-4 text-[clamp(2.6rem,6vw,5rem)] leading-[1.02] text-[var(--t5-walnut)]">
            Ready when
            <br />
            you are.
          </h2>
        </T5Reveal>

        <T5Reveal delay={0.22}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={bookHref}
              {...(bookingUrl !== "none"
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="t5-btn t5-btn--teal !px-8 !py-4 !text-[1.05rem]"
            >
              Book a visit
            </a>
            <a
              href={telHref}
              className="t5-btn t5-btn--paper !px-8 !py-4 !text-[1.05rem]"
            >
              Call {phone}
            </a>
          </div>
        </T5Reveal>

        <T5Reveal delay={0.32}>
          <p className="t5-kicker mt-9 text-[rgba(70,49,42,0.75)]">
            New patients welcome
            {hasEmergency && " ★ same-day emergencies"}
            {" ★ most insurance accepted"}
          </p>
        </T5Reveal>
      </div>
    </section>
  );
}
