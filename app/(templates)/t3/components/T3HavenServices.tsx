"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import T3Reveal, { HAVEN_EASE } from "./T3Reveal";
import { telHref } from "./hours";

interface T3HavenServicesProps {
  phone: string;
  hasEmergency: boolean;
  hasSedation: boolean;
}

interface ServiceCard {
  id: string;
  title: string;
  line: string;
  detail: string;
  feels: string;
  image: string;
  alt: string;
  span: string;
  tall?: boolean;
}

const SERVICES: ServiceCard[] = [
  {
    id: "sedation",
    title: "sedation & comfort dentistry",
    line: "for every level of worry, mild to overwhelming",
    detail:
      "Oral sedation, nitrous, or simply a slower appointment with more check-ins — you choose the level, and we build the visit around it. Years of postponed care can often be finished in one or two calm sessions.",
    feels: "most patients describe it as a long, uneventful nap.",
    image: "/images/office-interior.jpg",
    alt: "A soft, light-filled treatment room prepared for a sedation visit",
    span: "md:col-span-4",
    tall: true,
  },
  {
    id: "invisalign",
    title: "invisalign & clear aligners",
    line: "straighter teeth, no brackets",
    detail:
      "Clear trays you swap at home, with short check-ins every few weeks. Most people are done in 12 to 18 months, and nobody at work has to know.",
    feels: "gentle pressure for a day or two per tray, then nothing.",
    image: "/images/services/invisalign.jpg",
    alt: "A clear Invisalign aligner tray held up to the light",
    span: "md:col-span-2",
  },
  {
    id: "veneers",
    title: "veneers & smile design",
    line: "your smile, on its best day",
    detail:
      "Thin porcelain layers shaped and shaded to look like you — not a catalog. We preview the result digitally before anything touches a tooth, and you approve every step.",
    feels: "two quiet appointments; numbing makes both easy.",
    image: "/images/services/full-mouth-smile.jpg",
    alt: "A close, natural smile after porcelain veneer treatment",
    span: "md:col-span-2",
  },
  {
    id: "implants",
    title: "dental implants",
    line: "a missing tooth, quietly replaced",
    detail:
      "Guided placement makes implants precise and surprisingly gentle. One visit to place it, a few months of quiet healing, then a crown that blends in completely.",
    feels: "less eventful than most extractions — truly.",
    image: "/images/services/implant.jpg",
    alt: "A ceramic dental implant crown displayed on a neutral background",
    span: "md:col-span-2",
  },
  {
    id: "whitening",
    title: "gentle whitening",
    line: "brighter, without the zing",
    detail:
      "Lower-sensitivity formulas applied slowly, with desensitizer built into the visit. A few shades brighter in about an hour, or take-home trays if you'd rather go gradually.",
    feels: "warm, quiet, and easier on sensitive teeth than the kits online.",
    image: "/images/services/full-mouth-shade.jpg",
    alt: "A dental shade guide held next to brightened teeth",
    span: "md:col-span-2",
  },
  {
    id: "braces",
    title: "braces & orthodontics",
    line: "for bites that need more",
    detail:
      "Modern brackets are smaller and kinder than the ones you remember. We map the whole treatment up front so you always know how far along you are.",
    feels: "adjustment days are mild — most people go straight back to work.",
    image: "/images/services/braces.jpg",
    alt: "Modern low-profile braces on a relaxed, smiling patient",
    span: "md:col-span-3",
  },
];

function ServiceTile({ service, delay }: { service: ServiceCard; delay: number }) {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <T3Reveal delay={delay} className={`col-span-1 ${service.span}`}>
      <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] bg-[var(--t3-sage-light)] shadow-[var(--t3-shadow-soft)] transition-shadow duration-700 hover:shadow-[var(--t3-shadow-bloom)]">
        <div
          className={`relative w-full overflow-hidden ${
            service.tall ? "aspect-[16/10] md:aspect-[16/9]" : "aspect-[16/10]"
          }`}
        >
          <Image
            src={service.image}
            alt={service.alt}
            fill
            loading="lazy"
            className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(242,246,238,0.35), transparent 40%)",
            }}
          />
        </div>

        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <h3 className="mb-1.5 text-lg font-light text-[var(--t3-moss)] sm:text-xl">
            {service.title}
          </h3>
          <p className="mb-4 text-sm font-light text-[var(--t3-moss-soft)]">
            {service.line}
          </p>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                key="detail"
                initial={reduceMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
                animate={
                  reduceMotion
                    ? { opacity: 1 }
                    : { height: "auto", opacity: 1 }
                }
                exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                transition={{ duration: 0.9, ease: HAVEN_EASE }}
                className="overflow-hidden"
              >
                <p className="mb-3 text-sm font-light leading-relaxed text-[var(--t3-moss-soft)]">
                  {service.detail}
                </p>
                <p className="t3-serif mb-4 text-[15px] text-[var(--t3-euc-ink)]">
                  how it feels: {service.feels}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="mt-auto inline-flex items-center gap-2 self-start text-sm font-normal text-[var(--t3-euc-ink)] transition-colors duration-500 hover:text-[var(--t3-moss)]"
          >
            <Plus
              aria-hidden="true"
              className={`h-4 w-4 transition-transform duration-700 ${
                open ? "rotate-45" : ""
              }`}
            />
            {open ? "that's enough detail" : "what to expect"}
          </button>
        </div>
      </article>
    </T3Reveal>
  );
}

export default function T3HavenServices({
  phone,
  hasEmergency,
  hasSedation,
}: T3HavenServicesProps) {
  const visibleServices = hasSedation
    ? SERVICES
    : SERVICES.filter((s) => s.id !== "sedation");

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative py-24 sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-16 grid grid-cols-1 gap-6 sm:mb-20 lg:grid-cols-12">
          <T3Reveal className="lg:col-span-6">
            <p className="t3-marker mb-6 text-sm font-light text-[var(--t3-moss-soft)]">
              what we do
            </p>
            <h2
              id="services-heading"
              className="t3-display text-[var(--t3-moss)]"
            >
              Care for{" "}
              <em className="t3-serif text-[var(--t3-euc-deep)]">
                whatever brought you here
              </em>
            </h2>
          </T3Reveal>
          <T3Reveal delay={0.15} className="lg:col-span-4 lg:col-start-9 lg:self-end">
            <p className="max-w-sm text-[15px] font-light leading-relaxed text-[var(--t3-moss-soft)]">
              Every service below comes with the same promise: you&rsquo;ll
              know what&rsquo;s happening before it happens, and you can pause
              at any point.
            </p>
          </T3Reveal>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-6">
          {visibleServices.map((service, i) => (
            <ServiceTile key={service.id} service={service} delay={i * 0.08} />
          ))}

          {/* the one clay moment on this screen — same-day emergency */}
          {hasEmergency && (
            <T3Reveal delay={0.3} className="col-span-1 md:col-span-3">
              <a
                href={telHref(phone)}
                className="group flex h-full min-h-[220px] flex-col justify-between rounded-[2rem] p-7 shadow-[var(--t3-shadow-soft)] transition-shadow duration-700 hover:shadow-[var(--t3-shadow-bloom)] sm:p-8"
                style={{ backgroundColor: "rgba(201,126,93,0.14)" }}
              >
                <div>
                  <p className="t3-serif mb-3 text-xl text-[var(--t3-clay-deep)]">
                    in pain today?
                  </p>
                  <h3 className="mb-3 text-xl font-light text-[var(--t3-moss)] sm:text-2xl">
                    we&rsquo;ll see you today.
                  </h3>
                  <p className="max-w-xs text-sm font-light leading-relaxed text-[var(--t3-moss-soft)]">
                    Same-day emergency visits are held open every day. Call,
                    tell us what hurts, and we&rsquo;ll take it from there —
                    calmly.
                  </p>
                </div>
                <span className="mt-6 inline-flex items-center gap-2 text-[15px] font-normal text-[var(--t3-clay-deep)] transition-colors duration-500 group-hover:text-[var(--t3-moss)]">
                  call {phone}
                  <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </a>
            </T3Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
