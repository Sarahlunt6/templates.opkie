"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ATELIER_EASE } from "./T4Reveal";

interface T4HeroProps {
  practiceName: string;
  city: string;
  state: string;
  address: string;
  phone: string;
  bookingUrl: string;
}

const TICKER_ITEMS = [
  "Porcelain veneers",
  "Same-day crowns",
  "Dental implants",
  "Invisalign",
  "Whitening",
  "General dentistry",
  "Sedation available",
  "Emergency care",
];

export default function T4Hero({
  practiceName,
  city,
  state,
  address,
  phone,
  bookingUrl,
}: T4HeroProps) {
  const reduced = useReducedMotion();
  const telHref = `tel:${phone.replace(/[^0-9+]/g, "")}`;
  const bookHref = bookingUrl !== "none" ? bookingUrl : telHref;

  // Hero content renders settled — an animated entrance would hold the
  // page's LCP hostage until hydration (mobile perf).
  const rise = (delay: number) => ({
    initial: false as const,
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.2, delay, ease: ATELIER_EASE },
  });

  return (
    <section id="top" className="relative flex min-h-screen flex-col pt-24 lg:pt-28">
      {/* a faint wash of evening light down the wall */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 55% at 72% 0%, rgba(201,165,106,0.09), transparent 60%)",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-[88rem] flex-1 grid-cols-1 items-center gap-14 px-6 pb-16 pt-10 lg:grid-cols-12 lg:gap-10 lg:px-12">
        {/* ── left: the introduction ── */}
        <div className="lg:col-span-7">
          <motion.div {...rise(0.1)} className="t4-plaque mb-9">
            <span className="t4-label text-[var(--t4-champagne)]">
              {practiceName}
            </span>
            <span className="t4-diamond" />
            <span className="t4-label text-[var(--t4-ivory-faint)]">
              {city}, {state}
            </span>
          </motion.div>

          <h1 className="t4-display t4-display-hero text-[var(--t4-ivory)]">
            <motion.span {...rise(0.25)} className="block">
              A smile,
            </motion.span>
            <motion.span {...rise(0.4)} className="block">
              made to{" "}
              <em className="italic text-[var(--t4-champagne-bright)]">
                measure.
              </em>
            </motion.span>
          </h1>

          <motion.p
            {...rise(0.6)}
            className="mt-8 max-w-md font-t4-body text-[1.05rem] font-light leading-relaxed text-[var(--t4-ivory-soft)]"
          >
            {practiceName} is a private dental practice in {city} where
            cosmetic and restorative work is planned like tailoring —
            measured carefully, fitted precisely, finished by hand.
          </motion.p>

          <motion.div {...rise(0.75)} className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={bookHref}
              {...(bookingUrl !== "none"
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="t4-btn-solid"
            >
              Book a consultation
            </a>
            <a href="#work" className="t4-btn-outline">
              View the work
            </a>
          </motion.div>

          {/* NAP microline */}
          <motion.div
            {...rise(0.9)}
            className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-2"
          >
            <span className="t4-label text-[var(--t4-ivory-faint)]">{address}</span>
            <span className="t4-diamond hidden sm:inline-block" />
            <a
              href={telHref}
              className="t4-link t4-label text-[var(--t4-champagne)]"
            >
              {phone}
            </a>
          </motion.div>
        </div>

        {/* ── right: the work, framed and lit ── */}
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5, ease: ATELIER_EASE }}
          className="relative lg:col-span-5"
        >
          {/* cone of light from above the frame */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-16 -top-24 bottom-0"
            style={{
              background:
                "radial-gradient(60% 55% at 50% 0%, rgba(230,203,150,0.14), transparent 70%)",
            }}
          />

          <div className="t4-frame relative mx-auto max-w-md lg:max-w-none">
            <div className="t4-frame-inner t4-grade relative aspect-[3/4]">
              <Image
                src="/images/services/full-mouth-smile.jpg"
                alt="A finished cosmetic dentistry result — a natural, healthy smile"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* engraved case plaque, hung off the frame's corner */}
          <div className="absolute -bottom-5 left-1/2 w-max -translate-x-1/2 bg-[var(--t4-espresso)] px-5 py-3 lg:left-auto lg:right-10 lg:translate-x-0">
            <div className="flex items-center gap-3">
              <span className="t4-numeral text-[0.95rem] text-[var(--t4-champagne)]">
                Nº 01
              </span>
              <span className="t4-diamond" />
              <span className="t4-label text-[var(--t4-ivory-soft)]">
                House work · Porcelain veneers
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── the house ticker ── */}
      <motion.div
        initial={false}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.05, ease: ATELIER_EASE }}
        className="relative border-t border-[var(--t4-line-dark)]"
      >
        <div className="t4-ticker-wrap overflow-hidden py-5" aria-hidden>
          <div className="t4-ticker flex w-max items-center gap-8 pl-8 pr-8">
            {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span key={i} className="flex items-center gap-8">
                <span className="t4-label whitespace-nowrap text-[var(--t4-ivory-faint)]">
                  {item}
                </span>
                <span className="t4-diamond" />
              </span>
            ))}
          </div>
        </div>
        <p className="sr-only">
          Services: porcelain veneers, same-day crowns, dental implants,
          Invisalign, whitening, general dentistry, sedation, emergency care.
        </p>
      </motion.div>
    </section>
  );
}
