"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { HAVEN_EASE } from "./T3Reveal";
import { telHref } from "./hours";
import { sampleReviews } from "@/data/master";

const AVG_RATING = (
  sampleReviews.reduce((sum, r) => sum + r.rating, 0) / sampleReviews.length
).toFixed(1);

interface T3HavenHeroProps {
  practiceName: string;
  city: string;
  phone: string;
  bookingUrl: string | "none";
  hasSedation: boolean;
}

/**
 * Serene hero — soft asymmetry: a two-voice headline on the left, a layered
 * stack of organic-framed imagery (still photo + ambient video) drifting
 * gently on the right. Everything enters slowly, staggered, once.
 */
export default function T3HavenHero({
  practiceName,
  city,
  phone,
  bookingUrl,
  hasSedation,
}: T3HavenHeroProps) {
  const reduceMotion = useReducedMotion();
  const hasBooking = bookingUrl !== "none";

  const enter = (delay: number) => ({
    initial: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.4, delay, ease: HAVEN_EASE },
  });

  return (
    <section
      id="top"
      aria-label="Welcome"
      className="relative overflow-hidden pt-[120px] pb-16 sm:pt-[140px] lg:pb-24"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8">
        {/* ── copy ─────────────────────────────────────────────── */}
        <div className="lg:col-span-6 xl:col-span-5">
          <motion.p
            {...enter(0)}
            className="t3-marker mb-8 text-sm font-light text-[var(--t3-moss-soft)]"
          >
            a dental practice in {city}
          </motion.p>

          <motion.h1
            {...enter(0.15)}
            className="mb-8 text-[clamp(2.6rem,6.5vw,4.6rem)] font-extralight leading-[1.06] tracking-[0.01em] text-[var(--t3-moss)]"
          >
            walk in nervous.
            <br />
            <em className="t3-serif font-normal text-[var(--t3-euc-deep)]">
              leave lighter.
            </em>
          </motion.h1>

          <motion.p
            {...enter(0.3)}
            className="mb-10 max-w-md text-base font-light leading-relaxed text-[var(--t3-moss-soft)] sm:text-lg"
          >
            {practiceName} is built for people who put off the dentist.
            Unhurried appointments{hasSedation ? ", sedation options" : ""} and
            a team that moves at your pace — never the other way around.
          </motion.p>

          <motion.div
            {...enter(0.45)}
            className="mb-12 flex flex-wrap items-center gap-4"
          >
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
              or call {phone}
            </a>
          </motion.div>

          <motion.div {...enter(0.6)}>
            <div className="mb-5 h-px w-16 bg-[var(--t3-euc)] opacity-50" />
            <p className="max-w-sm text-sm font-light leading-relaxed text-[var(--t3-moss-faint)]">
              {hasSedation && <>sedation for every level of worry&ensp;·&ensp;</>}
              appointments that never feel rushed&ensp;·&ensp;breaks whenever
              you need them
            </p>
            <p className="mt-4 flex flex-wrap items-center gap-x-2 text-sm font-light text-[var(--t3-moss-soft)]">
              <span
                className="text-[var(--t3-euc-deep)]"
                role="img"
                aria-label={`Rated ${AVG_RATING} out of 5 by patients`}
              >
                ★ {AVG_RATING}
              </span>
              <span>
                from{" "}
                <em className="t3-serif">
                  people who were nervous too
                </em>
                &ensp;·&ensp;new patients welcome&ensp;·&ensp;insurance
                accepted
              </span>
            </p>
          </motion.div>
        </div>

        {/* ── layered imagery ──────────────────────────────────── */}
        <div className="relative lg:col-span-6 xl:col-span-7">
          <motion.div
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, delay: 0.25, ease: HAVEN_EASE }}
            className="relative mx-auto max-w-[560px] lg:ml-auto"
          >
            {/* soft halo behind the stack */}
            <div
              aria-hidden="true"
              className="absolute -inset-10 rounded-full opacity-70"
              style={{
                background:
                  "radial-gradient(circle at 60% 40%, rgba(109,139,125,0.14), transparent 65%)",
              }}
            />

            {/* primary organic-framed photo */}
            <div className="t3-blob relative aspect-[5/6] w-[86%] overflow-hidden shadow-[var(--t3-shadow-bloom)]">
              <Image
                src="/images/team/staff-photo.jpg"
                alt={`The team at ${practiceName} — the people who will take care of you`}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 500px"
              />
              {/* mist overlay */}
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(160deg, rgba(244,246,241,0.28) 0%, transparent 45%)",
                }}
              />
            </div>

            {/* overlapping ambient video, drifting gently */}
            <div className="t3-float absolute -bottom-8 right-0 w-[52%] sm:-bottom-10">
              <div className="t3-blob-b relative aspect-[4/3] overflow-hidden border-4 border-[var(--t3-mist)] shadow-[var(--t3-shadow-soft)]">
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster="/images/office-exterior.jpg"
                  aria-label={`Ambient footage inside ${practiceName}`}
                >
                  <source src="/videos/hero-ambient.mp4" type="video/mp4" />
                </video>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[#f4f6f1] opacity-15"
                />
              </div>
            </div>

            {/* quiet caption chip */}
            <div className="absolute -left-2 bottom-16 hidden rounded-full bg-[#f4f6f1f2] px-5 py-3 shadow-[var(--t3-shadow-soft)] backdrop-blur-sm sm:block">
              <p className="text-[13px] font-light text-[var(--t3-moss)]">
                <em className="t3-serif text-[var(--t3-euc-deep)]">quiet</em>{" "}
                by design
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
