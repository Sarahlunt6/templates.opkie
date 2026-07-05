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
 * Closing invitation — the one clay moment on this screen: a warm
 * clay-washed panel holding the last gentle ask, beside the team photo
 * in a soft editorial frame.
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
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12">
          {/* clay panel — the single warm moment on this screen */}
          <T3Reveal className="lg:col-span-7">
            <div
              className="flex h-full flex-col justify-center rounded-[2rem] p-8 sm:rounded-[2.5rem] sm:p-12 lg:p-14"
              style={{ backgroundColor: "rgba(201, 126, 93, 0.16)" }}
            >
              <p className="t3-serif mb-5 text-lg text-[var(--t3-clay-deep)]">
                whenever it feels right
              </p>
              <h2
                id="closing-heading"
                className="t3-display mb-7 text-[var(--t3-moss)]"
              >
                Ready when{" "}
                <em className="t3-serif text-[var(--t3-clay-deep)]">you</em>{" "}
                are
              </h2>
              <p className="mb-10 max-w-md text-base font-light leading-relaxed text-[var(--t3-moss-soft)] sm:text-lg">
                No lecture about how long it&rsquo;s been. No judgment about
                where your teeth are today. Just a fresh start, at your pace,
                with a team that&rsquo;s glad you came.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={hasBooking ? bookingUrl : telHref(phone)}
                  target={hasBooking ? "_blank" : undefined}
                  rel={hasBooking ? "noopener noreferrer" : undefined}
                  className="t3-btn t3-btn-primary px-8 py-4 text-[15px]"
                >
                  Book a visit
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
            </div>
          </T3Reveal>

          {/* team photo, soft-framed */}
          <T3Reveal delay={0.15} className="lg:col-span-5">
            <div className="relative h-full min-h-[320px] overflow-hidden rounded-[2rem] shadow-[var(--t3-shadow-bloom)] sm:rounded-[2.5rem]">
              <Image
                src="/images/team-ortho.jpeg"
                alt={`The team at ${practiceName}, ready to welcome you`}
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 480px"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(160deg, rgba(232,239,227,0.2), transparent 45%)",
                }}
              />
            </div>
          </T3Reveal>
        </div>
      </div>
    </section>
  );
}
