"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Magnetic, ParallaxImage, T1_EASE } from "./T1Motion";

interface T1HeroProps {
  practiceName: string;
  city: string;
  state: string;
  address: string;
  phone: string;
  bookingUrl: string;
  avgRating: string;
  reviewCount: number;
}

const CONTENTS = [
  {
    numeral: "I",
    title: "The Consultation",
    note: "An hour that belongs entirely to you",
    href: "#consultation",
  },
  {
    numeral: "II",
    title: "The Design",
    note: "Dentistry drawn before it is done",
    href: "#design",
  },
  {
    numeral: "III",
    title: "The Craft",
    note: "The room, the instruments, the hands",
    href: "#craft",
  },
  {
    numeral: "IV",
    title: "The Reveal",
    note: "Before, after, and the moment between",
    href: "#reveal",
  },
];

/**
 * The final word of the masthead set as a type-window: the ambient
 * practice video plays inside the letterforms. Solid ink beneath acts
 * as the fallback wherever the video (or the blend stack) is absent,
 * and under prefers-reduced-motion the overlay never mounts.
 */
function VideoWord({ word }: { word: string }) {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => setMounted(true), []);

  const showVideo = mounted && !reduced && !failed;

  return (
    <span className="t1-video-word">
      <em className="font-light italic">{word}</em>
      {showVideo && (
        <motion.span
          aria-hidden="true"
          className="t1-video-word-media"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 1.1, ease: T1_EASE }}
        >
          <video
            src="/videos/hero-ambient.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onError={() => setFailed(true)}
          />
          <em className="t1-video-word-knockout font-light italic">{word}</em>
        </motion.span>
      )}
    </span>
  );
}

/** Issue metadata that types itself in, character by character */
function TypedLine({
  text,
  delay = 0.4,
  className = "",
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <span className={className}>{text}</span>;
  }

  // Words stay unbreakable inside, but the line wraps at spaces —
  // important at 375px where the metadata runs long.
  const words = text.split(" ");
  let charCursor = 0;

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, wi) => {
          const start = charCursor;
          charCursor += word.length + 1;
          return (
            <span key={wi}>
              <span className="inline-block whitespace-nowrap">
                {word.split("").map((ch, ci) => (
                  <motion.span
                    key={ci}
                    className="inline-block"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.01,
                      delay: delay + (start + ci) * 0.016,
                    }}
                  >
                    {ch}
                  </motion.span>
                ))}
              </span>
              {wi < words.length - 1 ? " " : ""}
            </span>
          );
        })}
      </span>
    </span>
  );
}

export default function T1Hero({
  practiceName,
  city,
  state,
  address,
  phone,
  bookingUrl,
  avgRating,
  reviewCount,
}: T1HeroProps) {
  const reduced = useReducedMotion();
  const tel = `tel:${phone.replace(/[^0-9+]/g, "")}`;
  const hasBooking = bookingUrl !== "none";

  const words = practiceName.split(" ");
  const lastIndex = words.length - 1;

  const rise = (delay: number) => ({
    initial: reduced ? false : ({ yPercent: 115 } as const),
    animate: { yPercent: 0 },
    transition: { duration: 1.3, delay, ease: T1_EASE },
  });

  return (
    <section
      id="top"
      aria-label={`${practiceName} — introduction`}
      className="relative px-6 pt-28 md:px-10 md:pt-32 xl:px-16"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Folio line — issue metadata types in, hairline draws beneath */}
        <div className="relative flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 pb-4">
          <p className="t1-eyebrow">
            <TypedLine
              text={`Vol. I — The Smile Issue · Rated ${avgRating} across ${reviewCount} patient stories`}
              delay={0.35}
            />
          </p>
          <motion.p
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.2, ease: T1_EASE }}
            className="hidden font-sans text-[11px] uppercase tracking-[0.28em] text-[#6B675E] sm:block"
          >
            {city}, {state}
          </motion.p>
          <motion.span
            aria-hidden="true"
            className="absolute bottom-0 left-0 h-px w-full origin-left bg-[#16130F]/15"
            initial={reduced ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.25, ease: T1_EASE }}
          />
        </div>

        {/* Masthead — staggered line-mask rise; last word carries the film */}
        <h1 className="mt-10 font-t1-display font-light leading-[0.92] tracking-[-0.02em] text-[#16130F] text-[clamp(3.2rem,10.5vw,9.75rem)]">
          {words.map((word, i) => (
            <span
              key={`${word}-${i}`}
              className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-top"
            >
              <motion.span className="inline-block" {...rise(0.15 + i * 0.12)}>
                {i === lastIndex && words.length > 1 ? (
                  <VideoWord word={word} />
                ) : (
                  word
                )}
                {i < lastIndex ? " " : ""}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Deck + contents + cover image */}
        <div className="mt-10 grid grid-cols-1 gap-12 lg:mt-14 lg:grid-cols-12 lg:gap-8">
          {/* Left column */}
          <motion.div
            className="order-2 lg:order-1 lg:col-span-5 xl:col-span-4"
            initial={reduced ? false : { opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.75, ease: T1_EASE }}
          >
            <p className="max-w-md font-sans text-base leading-relaxed text-[#6B675E] md:text-lg">
              A study in considered dentistry, practiced at {address} and
              written one patient at a time.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Magnetic>
                <a
                  href={hasBooking ? bookingUrl : tel}
                  {...(hasBooking
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="t1-btn t1-btn-ink"
                >
                  Reserve a consultation
                </a>
              </Magnetic>
              <a href={tel} className="t1-link font-sans text-sm">
                or call {phone}
              </a>
            </div>

            {/* In this issue */}
            <nav aria-label="In this issue" className="mt-14">
              <p className="t1-eyebrow">In this issue</p>
              <ol className="mt-4">
                {CONTENTS.map((entry, i) => (
                  <motion.li
                    key={entry.numeral}
                    initial={reduced ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.9,
                      delay: 1.1 + i * 0.08,
                      ease: T1_EASE,
                    }}
                  >
                    <a
                      href={entry.href}
                      className="group flex items-baseline gap-4 border-t border-[#16130F]/15 py-3.5 transition-colors duration-500"
                    >
                      <span className="w-7 shrink-0 font-t1-display text-sm italic text-[#9C7E46]">
                        {entry.numeral}.
                      </span>
                      <span className="font-t1-display text-lg text-[#16130F] transition-colors duration-500 group-hover:text-[#5E2A2B] md:text-xl">
                        {entry.title}
                      </span>
                      <span className="ml-auto hidden text-right font-sans text-xs text-[#6B675E] sm:block">
                        {entry.note}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ol>
            </nav>
          </motion.div>

          {/* Cover image — breaks the grid to the right edge */}
          <div className="order-1 lg:order-2 lg:col-span-7 xl:col-span-8">
            <figure className="relative lg:-mr-10 xl:-mr-16">
              <motion.div
                initial={reduced ? false : { clipPath: "inset(0 0 100% 0)" }}
                animate={{ clipPath: "inset(0 0 0% 0)" }}
                transition={{ duration: 1.5, delay: 0.55, ease: T1_EASE }}
                className="overflow-hidden"
              >
                {/* slow settle from 1.12 → 1 while the mask lifts */}
                <motion.div
                  initial={reduced ? false : { scale: 1.12 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 2.2, delay: 0.55, ease: T1_EASE }}
                >
                  <ParallaxImage
                    src="/images/office-interior.jpg"
                    alt={`Inside the ${practiceName} practice in ${city}, ${state}`}
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority
                    reveal={false}
                    className="aspect-[4/3] w-full md:aspect-[16/10] lg:aspect-[4/3] xl:aspect-[16/10]"
                  />
                </motion.div>
              </motion.div>
              <motion.figcaption
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.4, ease: T1_EASE }}
                className="mt-3 flex items-baseline justify-between gap-4 font-sans text-xs text-[#6B675E]"
              >
                <span>The practice, photographed on an ordinary morning.</span>
                <span className="hidden uppercase tracking-[0.22em] sm:block">
                  Fig. 01
                </span>
              </motion.figcaption>
            </figure>
          </div>
        </div>

        {/* Begin reading cue */}
        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.7, ease: T1_EASE }}
          className="mt-12 border-t border-[#16130F]/15 pt-5 pb-2 lg:mt-16"
        >
          <a
            href="#consultation"
            className="t1-eyebrow inline-flex items-center gap-3 !text-[#6B675E] transition-colors duration-500 hover:!text-[#5E2A2B]"
          >
            Begin reading
            <span aria-hidden="true" className="font-t1-display italic">
              ↓
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
