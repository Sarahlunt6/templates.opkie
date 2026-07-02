"use client";

import Image from "next/image";
import T3Reveal from "./T3Reveal";
import { telHref } from "./hours";

interface T3ClosingInviteProps {
  practiceName: string;
  phone: string;
  bookingUrl: string | "none";
  hasEmergency: boolean;
}

/**
 * Closing invitation — warm, judgment-free, one last gentle ask.
 */
export default function T3ClosingInvite({
  practiceName,
  phone,
  bookingUrl,
  hasEmergency,
}: T3ClosingInviteProps) {
  const hasBooking = bookingUrl !== "none";

  return (
    <section
      aria-labelledby="closing-heading"
      className="relative overflow-hidden py-24 sm:py-32 lg:py-40"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <T3Reveal>
            <h2
              id="closing-heading"
              className="mb-7 text-[clamp(2rem,5vw,3.4rem)] font-extralight leading-[1.1] text-[var(--t3-moss)]"
            >
              ready when{" "}
              <em className="t3-serif text-[var(--t3-euc-deep)]">you</em> are
            </h2>
            <p className="mb-10 max-w-md text-base font-light leading-relaxed text-[var(--t3-moss-soft)] sm:text-lg">
              No lecture about how long it&rsquo;s been. No judgment about
              where your teeth are today. Just a fresh start, at your pace,
              with a team that&rsquo;s glad you came.
            </p>
          </T3Reveal>

          <T3Reveal delay={0.15}>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={hasBooking ? bookingUrl : telHref(phone)}
                target={hasBooking ? "_blank" : undefined}
                rel={hasBooking ? "noopener noreferrer" : undefined}
                className="t3-btn t3-btn-primary px-8 py-4 text-[15px]"
              >
                Reserve a visit
              </a>
              <a
                href={telHref(phone)}
                className="t3-btn t3-btn-quiet px-7 py-4 text-[15px]"
              >
                call {phone}
              </a>
            </div>
            {hasEmergency && (
              <p className="mt-8 text-sm font-light text-[var(--t3-moss-soft)]">
                in pain right now? call — we hold same-day visits open every
                day.
              </p>
            )}
          </T3Reveal>
        </div>

        <T3Reveal delay={0.2} className="lg:col-span-6">
          <div className="relative mx-auto max-w-[540px]">
            <div
              aria-hidden="true"
              className="t3-blob absolute -inset-8 opacity-60"
              style={{
                background:
                  "radial-gradient(circle at 45% 45%, rgba(231,224,210,0.9), transparent 70%)",
              }}
            />
            <div className="t3-blob-b relative aspect-[5/4] overflow-hidden shadow-[var(--t3-shadow-bloom)]">
              <Image
                src="/images/team/staff-photo.jpg"
                alt={`The team at ${practiceName}, ready to welcome you`}
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 540px"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(160deg, rgba(244,246,241,0.2), transparent 45%)",
                }}
              />
            </div>
          </div>
        </T3Reveal>
      </div>
    </section>
  );
}
