"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { MARIGOLD_EASE } from "./T5Reveal";

interface T5HeroProps {
  practiceName: string;
  city: string;
  neighborhoods: string[];
  phone: string;
  bookingUrl: string;
  hasEmergency: boolean;
}

export default function T5Hero({
  practiceName,
  city,
  neighborhoods,
  phone,
  bookingUrl,
  hasEmergency,
}: T5HeroProps) {
  const reduced = useReducedMotion();
  const telHref = `tel:${phone.replace(/[^0-9+]/g, "")}`;
  const bookHref = bookingUrl !== "none" ? bookingUrl : telHref;

  // Hero content renders settled — an animated entrance would hold the
  // page's LCP hostage until hydration (mobile perf).
  const rise = (delay: number) => ({
    initial: false as const,
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.75, delay, ease: MARIGOLD_EASE },
  });

  const pop = (delay: number, rotate: number) => ({
    initial: reduced ? { rotate } : { opacity: 0, scale: 0.6, rotate },
    animate: { opacity: 1, scale: 1, rotate },
    transition: { duration: 0.55, delay, ease: MARIGOLD_EASE },
  });

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 pb-16 pt-12 lg:grid-cols-12 lg:gap-8 lg:px-10 lg:pb-24 lg:pt-16">
        {/* ── left: the greeting ── */}
        <div className="relative z-10 lg:col-span-7">
          <motion.p
            {...rise(0.05)}
            className="t5-script -rotate-2 text-[clamp(1.6rem,3vw,2.2rem)] text-[var(--t5-teal-bright)]"
          >
            hi, neighbor —
          </motion.p>

          <motion.h1
            {...rise(0.15)}
            className="t5-display t5-display-hero mt-3 text-[var(--t5-walnut)]"
          >
            Healthy teeth.
            <br />
            <span className="t5-wave">Happy</span> people.
          </motion.h1>

          <motion.p
            {...rise(0.3)}
            className="mt-7 max-w-md text-[1.08rem] leading-relaxed text-[var(--t5-walnut-soft)]"
          >
            {practiceName} is {city}&rsquo;s friendly neighborhood dental
            office — honest prices on the wall, appointments that run on
            time, and a team your kids will actually want to visit.
          </motion.p>

          <motion.div
            {...rise(0.42)}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href={bookHref}
              {...(bookingUrl !== "none"
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="t5-btn"
            >
              Book a visit
            </a>
            <a href={telHref} className="t5-btn t5-btn--paper">
              {phone} — a person answers
            </a>
          </motion.div>

          {/* trust row */}
          <motion.div
            {...rise(0.55)}
            className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2"
          >
            <span className="t5-kicker flex items-center gap-2 text-[var(--t5-walnut-soft)]">
              <span className="t5-star" aria-hidden>
                ★
              </span>
              5.0 on Google
            </span>
            <span className="t5-kicker flex items-center gap-2 text-[var(--t5-walnut-soft)]">
              <span className="t5-star" aria-hidden>
                ★
              </span>
              Most insurance accepted
            </span>
            {hasEmergency && (
              <span className="t5-kicker flex items-center gap-2 text-[var(--t5-walnut-soft)]">
                <span className="t5-star" aria-hidden>
                  ★
                </span>
                Same-day emergencies
              </span>
            )}
          </motion.div>
        </div>

        {/* ── right: the storefront window ── */}
        <div className="relative lg:col-span-5">
          {/* the sun behind the window */}
          <motion.div
            aria-hidden
            initial={false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: MARIGOLD_EASE }}
            className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-[var(--t5-marigold)] opacity-90 lg:-right-16 lg:-top-14 lg:h-64 lg:w-64"
          />

          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.3, ease: MARIGOLD_EASE }}
            className="relative mx-auto max-w-sm lg:max-w-none"
          >
            <div className="t5-arch relative aspect-[4/5] border-[3px] border-[var(--t5-walnut)] bg-[var(--t5-paper)] shadow-[var(--t5-shadow-print)]">
              <Image
                src="/images/team/staff-photo.jpg"
                alt="A smiling dentist welcoming patients at the practice"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 38vw"
                className="object-cover"
                style={{ objectPosition: "60% center" }}
              />
            </div>

            {/* stickers slapped on the window */}
            <motion.span
              {...pop(0.7, -4)}
              className="t5-sticker t5-sticker--marigold absolute -left-4 top-8 sm:-left-8"
            >
              Kids welcome!
            </motion.span>
            <motion.span
              {...pop(0.82, 3)}
              className="t5-sticker t5-sticker--teal absolute -right-2 top-1/3 sm:-right-6"
            >
              Same-day crowns
            </motion.span>
            <motion.span
              {...pop(0.94, -2)}
              className="t5-sticker absolute -bottom-4 left-1/2 -translate-x-1/2"
            >
              New patients? Come on in.
            </motion.span>
          </motion.div>
        </div>
      </div>

      {/* ── the neighborhood parade ── */}
      <motion.div
        initial={false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="relative border-y-2 border-[var(--t5-walnut)] bg-[var(--t5-butter)]"
      >
        <div className="t5-parade-wrap overflow-hidden py-3.5" aria-hidden>
          <div className="t5-parade flex w-max items-center gap-7 pl-7 pr-7">
            {[...neighborhoods, ...neighborhoods, ...neighborhoods].map(
              (hood, i) => (
                <span key={i} className="flex items-center gap-7">
                  <span className="t5-kicker whitespace-nowrap text-[var(--t5-walnut-soft)]">
                    {hood}
                  </span>
                  <span className="t5-star" aria-hidden>
                    ★
                  </span>
                </span>
              ),
            )}
          </div>
        </div>
        <p className="sr-only">
          Proudly serving {neighborhoods.join(", ")}.
        </p>
      </motion.div>
    </section>
  );
}
