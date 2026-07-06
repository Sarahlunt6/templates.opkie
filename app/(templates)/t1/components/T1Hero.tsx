"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { T1_EASE } from "./T1Motion";

interface T1HeroProps {
  practiceName: string;
  city: string;
  state: string;
  address: string;
  phone: string;
  bookingUrl: string;
  avgRating: string | null;
  reviewCount: number;
  hasSameDayEmergency: boolean;
}

/**
 * T1 PRESS — cover. The first word of the practice name set as a giant
 * red Anton wordmark spanning the full viewport, with the cover
 * photograph rising into the letterforms (photo layered over the lower
 * third of the word). Mono stat callouts flank the photo; hairline
 * column rules structure the page behind everything.
 */
export default function T1Hero({
  practiceName,
  city,
  state,
  address,
  phone,
  bookingUrl,
  avgRating,
  reviewCount,
  hasSameDayEmergency,
}: T1HeroProps) {
  const reduced = useReducedMotion();
  const tel = `tel:${phone.replace(/[^0-9+]/g, "")}`;
  const hasBooking = bookingUrl !== "none";

  /* Scroll-linked settle: as the reader starts scrolling, the wordmark
     tightens and the photo lifts into it — one breath of depth, desktop
     only (scroll-linked transforms jank on low-end mobile) and off under
     reduced motion. */
  const sectionRef = useRef<HTMLElement>(null);
  const [isLg, setIsLg] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsLg(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const wordTracking = useTransform(
    scrollYProgress,
    [0, 0.6],
    ["0.005em", "-0.01em"]
  );
  const photoLift = useTransform(scrollYProgress, [0, 0.6], [0, -24]);
  const settleEnabled = isLg && !reduced;

  const word = practiceName.split(" ")[0] || practiceName;
  // Anton caps average ≈ 0.56em advance width — size the word so it
  // spans the viewport edge to edge at every width.
  const wordmarkSize = `calc((100vw - 1rem) / ${(word.length * 0.56).toFixed(2)})`;

  const rise = (delay: number) => ({
    initial: reduced ? false : ({ opacity: 0, y: 20 } as const),
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: T1_EASE },
  });

  return (
    <section
      id="top"
      ref={sectionRef}
      aria-label={`${practiceName} — introduction`}
      className="t1-col-rules relative overflow-hidden border-b border-[rgba(26,23,19,0.15)]"
    >
      {/* Dateline row */}
      <div className="mx-auto flex max-w-[1500px] items-baseline justify-between gap-4 border-b border-[rgba(26,23,19,0.08)] px-4 py-3 md:px-8 xl:px-12">
        <motion.p className="t1-mono-label" {...rise(0.05)}>
          [ {city}, {state} ]
        </motion.p>
        <motion.p
          className="t1-mono-label t1-mono-label-stone hidden lg:block"
          {...rise(0.1)}
        >
          [ NEW PATIENTS WELCOME ]
        </motion.p>
        {avgRating !== null && (
          <motion.p className="t1-mono-label t1-mono-label-red" {...rise(0.15)}>
            [ EST. RATING {avgRating} / 5 ]
          </motion.p>
        )}
      </div>

      {/* Wordmark + photo interleave */}
      <div className="relative pt-8 md:pt-12">
        <motion.h1
          className="relative z-0 whitespace-nowrap text-center font-t1-press uppercase leading-[0.84] tracking-[0.005em] text-[#D92B21]"
          style={settleEnabled ? { letterSpacing: wordTracking } : undefined}
        >
          <span className="sr-only">{practiceName}</span>
          <span aria-hidden="true" style={{ fontSize: wordmarkSize }}>
            {word}
          </span>
        </motion.h1>

        {/* Cover photograph — rises into the letterforms */}
        <motion.div
          className="relative z-10 mx-auto w-[88vw] max-w-[760px]"
          style={{
            marginTop: `calc(${wordmarkSize} * -0.28)`,
            ...(settleEnabled ? { y: photoLift } : {}),
          }}
        >
          <motion.figure
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: T1_EASE }}
            className="group relative border border-[#1A1713] bg-[#E9E3D4]"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden md:aspect-[16/10]">
              <Image
                src="/images/office-interior.jpg"
                alt={`Inside the ${practiceName} practice in ${city}, ${state}`}
                fill
                sizes="(max-width: 768px) 88vw, 760px"
                priority
                className="t1-duotone object-cover"
              />
              {/* Halftone edge — print reproduction artifact */}
              <div
                aria-hidden="true"
                className="t1-halftone pointer-events-none absolute inset-x-0 bottom-0 h-16"
              />
            </div>
            <figcaption className="flex items-baseline justify-between gap-4 border-t border-[#1A1713] px-3 py-2">
              <span className="t1-mono-label t1-mono-label-stone">
                FIG. 01 — THE PRACTICE
              </span>
              <span className="t1-mono-label hidden sm:block">
                {address.toUpperCase()}
              </span>
            </figcaption>
          </motion.figure>

          {/* Floating stat callouts — flank the photo on wide screens */}
          {avgRating !== null && (
            <motion.aside
              aria-label="Patient rating"
              className="mt-3 border border-[#1A1713] bg-[#F3EFE6] px-4 py-3 lg:absolute lg:-left-[9.5rem] lg:top-10 lg:mt-0 lg:w-36 xl:-left-44 xl:w-40"
              {...rise(0.35)}
            >
              <p className="font-t1-press text-4xl leading-none text-[#1A1713]">
                <span aria-hidden="true" className="mr-1 text-[#D92B21]">
                  ★
                </span>
                {avgRating}
              </p>
              <p className="t1-mono-label t1-mono-label-stone mt-2">
                AVG. RATING FROM {reviewCount} VERIFIED REVIEWS
              </p>
            </motion.aside>
          )}

          <motion.aside
            aria-label="Care availability"
            className="mt-3 border border-[#1A1713] bg-[#1A1713] px-4 py-3 text-[#F3EFE6] lg:absolute lg:-right-[9.5rem] lg:bottom-16 lg:mt-0 lg:w-36 xl:-right-44 xl:w-40"
            {...rise(0.45)}
          >
            <p className="font-t1-press text-2xl uppercase leading-[0.95]">
              {hasSameDayEmergency ? "Same-day" : "Careful"}
            </p>
            <p className="t1-mono-label mt-2 !text-[#F3EFE6]/70">
              {hasSameDayEmergency
                ? "EMERGENCY CARE, BY PHONE"
                : "APPOINTMENTS, BY RESERVATION"}
            </p>
          </motion.aside>
        </motion.div>
      </div>

      {/* Statement + CTA */}
      <div className="mx-auto max-w-[1500px] px-4 pb-16 pt-14 md:px-8 md:pb-24 md:pt-24 xl:px-12">
        <motion.h2
          className="mx-auto max-w-4xl text-center font-t1-press text-[clamp(1.9rem,5vw,3.5rem)] uppercase leading-[0.95] text-[#1A1713]"
          {...rise(0.25)}
        >
          Good dentistry deserves{" "}
          <em className="t1-italic normal-case text-[#D92B21]">
            to be seen.
          </em>
        </motion.h2>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
          {...rise(0.4)}
        >
          <a
            href={hasBooking ? bookingUrl : tel}
            {...(hasBooking
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="t1-btn t1-btn-ink"
          >
            Book a consultation
          </a>
          <a href={tel} className="t1-mono-label t1-link">
            OR CALL {phone}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
