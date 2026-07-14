"use client";

import T4Reveal from "./T4Reveal";

interface T4FinaleProps {
  practiceName: string;
  phone: string;
  bookingUrl: string;
  hasEmergency: boolean;
}

export default function T4Finale({
  practiceName,
  phone,
  bookingUrl,
  hasEmergency,
}: T4FinaleProps) {
  const telHref = `tel:${phone.replace(/[^0-9+]/g, "")}`;
  const bookHref = bookingUrl !== "none" ? bookingUrl : telHref;

  return (
    <section className="relative overflow-hidden py-28 lg:py-40">
      {/* the last cone of light */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(65% 60% at 50% 0%, rgba(230,203,150,0.13), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-12">
        <T4Reveal>
          <p className="t4-label t4-label-wide text-[var(--t4-champagne)]">
            {practiceName}
          </p>
        </T4Reveal>

        <T4Reveal delay={0.1}>
          <h2 className="t4-display mt-8 text-[clamp(2.4rem,5.5vw,4.6rem)] leading-[1.05] text-[var(--t4-ivory)]">
            Begin with{" "}
            <em className="italic text-[var(--t4-champagne-bright)]">
              a conversation.
            </em>
          </h2>
        </T4Reveal>

        <T4Reveal delay={0.2}>
          <p className="mx-auto mt-7 max-w-md font-t4-body text-[1.02rem] font-light leading-relaxed text-[var(--t4-ivory-soft)]">
            No commitment, no pressure — just an unhurried consultation about
            what you'd like your smile to be.
          </p>
        </T4Reveal>

        <T4Reveal delay={0.3}>
          <div className="mt-11 flex flex-wrap items-center justify-center gap-4">
            <a
              href={bookHref}
              {...(bookingUrl !== "none"
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="t4-btn-solid"
            >
              Book a consultation
            </a>
            <a href={telHref} className="t4-btn-outline">
              Call {phone}
            </a>
          </div>
          {hasEmergency && (
            <p className="t4-label mt-8 text-[var(--t4-ivory-faint)]">
              In pain now? Same-day emergency visits are held each morning.
            </p>
          )}
        </T4Reveal>
      </div>
    </section>
  );
}
