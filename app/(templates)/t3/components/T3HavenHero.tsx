"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { HAVEN_EASE } from "./T3Reveal";
import { telHref } from "./hours";
import { sampleReviews } from "@/data/master";

const AVG_RATING = sampleReviews.length
  ? (
      sampleReviews.reduce((sum, r) => sum + r.rating, 0) /
      sampleReviews.length
    ).toFixed(1)
  : null;

interface T3HavenHeroProps {
  practiceName: string;
  city: string;
  phone: string;
  bookingUrl: string | "none";
  hasSedation: boolean;
}

/* tiny line icons for the floating glass chips */
function LeafIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 flex-shrink-0"
    >
      <path d="M6 20c8 0 13-5 13-14-9 0-14 5-14 13" />
      <path d="M6 20c0-6 4-10 9-11" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 flex-shrink-0"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 flex-shrink-0"
    >
      <path d="M20 13.5A8.5 8.5 0 1 1 10.5 4a7 7 0 0 0 9.5 9.5Z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 flex-shrink-0"
    >
      <rect x="3.5" y="5" width="17" height="16" rx="3" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </svg>
  );
}

function WaveIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 flex-shrink-0"
    >
      <path d="M2 12c2.5 0 2.5-3 5-3s2.5 3 5 3 2.5-3 5-3 2.5 3 5 3" />
      <path d="M2 17c2.5 0 2.5-3 5-3s2.5 3 5 3 2.5-3 5-3 2.5 3 5 3" />
    </svg>
  );
}

/**
 * Immersive photo-led hero — an oversized two-voice headline above a
 * full-width imagery zone. Floating glassmorphic annotation chips drift
 * gently over the photograph, each naming one reassurance; a larger glass
 * card anchors the bottom edge. Layered sage gradients build the greenery
 * atmosphere with CSS only. Everything enters slowly, staggered, once.
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

  const chips = [
    {
      icon: <LeafIcon />,
      label: "Gentle, judgment-free care",
      pos: "sm:absolute sm:left-[5%] sm:top-[14%]",
      float: "t3-float",
      delay: 0.7,
    },
    {
      icon: <ClockIcon />,
      label: "Same-day emergency visits",
      pos: "sm:absolute sm:right-[6%] sm:top-[24%]",
      float: "t3-float-slow",
      delay: 0.85,
    },
    ...(hasSedation
      ? [
          {
            icon: <MoonIcon />,
            label: "Sedation for anxious patients",
            pos: "sm:absolute sm:left-[9%] sm:top-[52%]",
            float: "t3-float-slow",
            delay: 1,
          },
        ]
      : []),
    {
      icon: <CalendarIcon />,
      label: "Simple online booking",
      pos: "sm:absolute sm:right-[10%] sm:top-[58%]",
      float: "t3-float",
      delay: 1.15,
    },
  ];

  return (
    <section
      id="top"
      aria-label="Welcome"
      className="relative overflow-hidden pt-[120px] pb-14 sm:pt-[150px] lg:pb-20"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* ── oversized two-voice headline ─────────────────────── */}
        <div className="mx-auto mb-12 max-w-4xl text-center sm:mb-16">
          <motion.p
            {...enter(0)}
            className="t3-marker mx-auto mb-8 justify-center text-sm font-light text-[var(--t3-moss-soft)]"
          >
            a dental practice in {city}
          </motion.p>

          <motion.h1
            {...enter(0.15)}
            className="t3-display-hero mb-7 text-[var(--t3-moss)]"
          >
            Breathe easy.
            <br />
            <em className="t3-serif font-normal text-[var(--t3-euc-deep)]">
              Smile again.
            </em>
          </motion.h1>

          <motion.p
            {...enter(0.3)}
            className="mx-auto mb-9 max-w-xl text-base font-light leading-relaxed text-[var(--t3-moss-soft)] sm:text-lg"
          >
            {practiceName} is built for people who put off the dentist — you
            set the pace{hasSedation ? ", sedation is always an option" : ""},
            and nothing happens before you&rsquo;re ready.
          </motion.p>

          <motion.div
            {...enter(0.45)}
            className="flex flex-wrap items-center justify-center gap-4"
          >
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
              or call {phone}
            </a>
          </motion.div>

          <motion.p
            {...enter(0.55)}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-2 text-sm font-light text-[var(--t3-moss-soft)]"
          >
            {AVG_RATING !== null && (
              <span
                className="text-[var(--t3-euc-ink)]"
                role="img"
                aria-label={`Rated ${AVG_RATING} out of 5 by patients`}
              >
                ★ {AVG_RATING}
              </span>
            )}
            {AVG_RATING !== null ? (
              <span>
                from <em className="t3-serif">people who were nervous too</em>
                &ensp;·&ensp;new patients welcome
              </span>
            ) : (
              <span>
                for <em className="t3-serif">people who were nervous too</em>
                &ensp;·&ensp;new patients welcome
              </span>
            )}
          </motion.p>
        </div>

        {/* ── immersive imagery zone with floating glass chips ─── */}
        <motion.div
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, delay: 0.4, ease: HAVEN_EASE }}
          className="relative"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] shadow-[var(--t3-shadow-bloom)] sm:aspect-[16/9] sm:rounded-[2.5rem] lg:aspect-[21/9]">
            <Image
              src="/images/office-interior.jpg"
              alt={`Inside ${practiceName} — a soft, light-filled treatment room`}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1216px"
            />
            {/* layered sage greenery atmosphere, CSS only */}
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(46,59,52,0.32), transparent 45%), radial-gradient(90% 70% at 12% 108%, rgba(109,139,125,0.4), transparent 60%), radial-gradient(70% 60% at 95% -10%, rgba(232,239,227,0.35), transparent 55%)",
              }}
            />

            {/* floating glass annotation chips — desktop & tablet */}
            {chips.map((chip) => (
              <motion.div
                key={chip.label}
                initial={
                  reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
                }
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: chip.delay, ease: HAVEN_EASE }}
                className={`hidden sm:block ${chip.pos}`}
              >
                <span
                  className={`t3-glass-chip px-5 py-2.5 text-[13px] font-normal text-[var(--t3-moss)] ${chip.float}`}
                >
                  <span className="text-[var(--t3-euc-ink)]">{chip.icon}</span>
                  {chip.label}
                </span>
              </motion.div>
            ))}

            {/* larger anchored glass card */}
            <motion.div
              initial={
                reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.3, delay: 1.25, ease: HAVEN_EASE }}
              className="absolute inset-x-4 bottom-4 sm:inset-x-auto sm:left-[5%] sm:bottom-[9%] sm:max-w-sm"
            >
              <div className="t3-glass-card flex items-start gap-4 px-6 py-5">
                <span className="mt-0.5 text-[var(--t3-euc-ink)]">
                  <WaveIcon />
                </span>
                <p className="text-sm font-light leading-relaxed text-[var(--t3-moss)]">
                  Private &amp; comfortable —{" "}
                  <em className="t3-serif text-[var(--t3-euc-ink)]">
                    a reassuring place to begin.
                  </em>
                </p>
              </div>
            </motion.div>
          </div>

          {/* the same annotations as a quiet wrapped row on small screens */}
          <motion.ul
            {...enter(0.7)}
            className="mt-5 flex flex-wrap justify-center gap-2.5 sm:hidden"
          >
            {chips.map((chip) => (
              <li key={chip.label}>
                <span className="t3-glass-chip px-4 py-2 text-[12px] font-normal text-[var(--t3-moss)]">
                  <span className="text-[var(--t3-euc-ink)]">{chip.icon}</span>
                  {chip.label}
                </span>
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
