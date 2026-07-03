"use client";

/**
 * Chapter II — the services as a horizontal editorial gallery.
 *
 * On desktop (fine pointers, motion allowed) vertical scrolling pins the
 * chapter and scrubs a strip of framed "plates" sideways, each with a
 * slow parallax inside its frame. A brass progress rule tracks position.
 *
 * On mobile and under prefers-reduced-motion the strip degrades to a
 * stacked column of the same plates — no pinning, no horizontal motion.
 */

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { Fade, T1_EASE } from "./T1Motion";

export interface ServiceEntry {
  title: string;
  description: string;
  image: string;
}

interface T1ServicesGalleryProps {
  services: ServiceEntry[];
  alsoPracticed: string[];
}

function Plate({
  service,
  index,
  progress,
}: {
  service: ServiceEntry;
  index: number;
  progress: MotionValue<number>;
}) {
  const reduced = useReducedMotion();
  // slow drift of the photograph inside its fixed frame as the strip travels
  const imgX = useTransform(progress, [0, 1], ["-6%", "6%"]);

  return (
    <motion.figure
      data-cursor="view"
      whileHover={reduced ? undefined : { rotate: -1.5, y: -8 }}
      transition={{ duration: 0.8, ease: T1_EASE }}
      className="group relative w-[min(46vw,540px)] shrink-0"
    >
      <div className="border border-[#16130F]/10 bg-[#FDFCFA] p-3 shadow-[0_24px_50px_-28px_rgba(22,19,15,0.35)] transition-shadow duration-700 ease-out group-hover:shadow-[14px_34px_60px_-28px_rgba(22,19,15,0.45)] md:p-4">
        <div className="relative aspect-[4/3] overflow-hidden">
          <motion.div
            className="absolute inset-y-0 -inset-x-[8%]"
            style={reduced ? undefined : { x: imgX }}
          >
            <Image
              src={service.image}
              alt={`${service.title} — photographed for the practice portfolio`}
              fill
              sizes="(max-width: 1024px) 90vw, 46vw"
              loading="lazy"
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>

      <figcaption className="mt-5">
        <div className="flex items-baseline gap-4">
          <span className="t1-eyebrow shrink-0">
            Plate {String(index + 1).padStart(2, "0")}
          </span>
          <span
            aria-hidden="true"
            className="h-px flex-1 origin-left bg-[#9C7E46]/40 transition-colors duration-700 group-hover:bg-[#9C7E46]"
          />
        </div>
        <h3 className="mt-3 font-t1-display text-2xl font-light leading-tight text-[#16130F] transition-colors duration-500 group-hover:text-[#5E2A2B] md:text-3xl">
          {service.title}
        </h3>
        <p className="mt-2 max-w-md font-sans text-sm leading-relaxed text-[#6B675E] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden">
          {service.description}
        </p>
      </figcaption>
    </motion.figure>
  );
}

export default function T1ServicesGallery({
  services,
  alsoPracticed,
}: T1ServicesGalleryProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [shift, setShift] = useState(0);
  const [plateIndex, setPlateIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -shift]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(
      services.length - 1,
      Math.floor(v * services.length)
    );
    setPlateIndex(idx);
  });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      setShift(Math.max(0, track.scrollWidth - track.clientWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [services.length]);

  return (
    <>
      {/* ------- Desktop, motion-safe: pinned horizontal scrub ------- */}
      <div
        ref={sectionRef}
        className="relative hidden lg:motion-safe:block"
        style={{ height: `${120 + services.length * 55}vh` }}
      >
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <div
            className="px-10 xl:px-16"
            aria-label="Portfolio of services, presented as plates"
          >
            <motion.div ref={trackRef} className="flex gap-[5vw]" style={{ x }}>
              {services.map((service, i) => (
                <Plate
                  key={service.title}
                  service={service}
                  index={i}
                  progress={scrollYProgress}
                />
              ))}
              {/* end mark — lets the last plate travel fully into view */}
              <div
                aria-hidden="true"
                className="flex w-[18vw] shrink-0 items-center"
              >
                <p className="font-t1-display text-xl italic text-[#9C7E46]">
                  fin.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Brass progress rule + plate counter */}
          <div className="mt-12 px-10 xl:px-16">
            <div className="mx-auto flex max-w-[1400px] items-center gap-6">
              <p className="shrink-0 font-t1-display text-sm italic text-[#9C7E46]">
                {String(plateIndex + 1).padStart(2, "0")}
                <span className="mx-1 text-[#6B675E]">/</span>
                {String(services.length).padStart(2, "0")}
              </p>
              <div className="relative h-px flex-1 bg-[#16130F]/10">
                <motion.div
                  className="absolute inset-y-0 left-0 w-full origin-left bg-[#9C7E46]"
                  style={{ scaleX: scrollYProgress }}
                />
              </div>
              <p className="t1-eyebrow hidden shrink-0 !text-[#6B675E] xl:block">
                Scroll to turn the portfolio
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ------- Mobile & reduced-motion: stacked column ------- */}
      <div className="px-6 md:px-10 lg:motion-safe:hidden xl:px-16">
        <div className="mx-auto max-w-[1400px]">
          <ol className="grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-x-8">
            {services.map((service, i) => (
              <li key={service.title}>
                <Fade y={22} delay={(i % 2) * 0.08}>
                  <figure>
                    <div className="border border-[#16130F]/10 bg-[#FDFCFA] p-3 shadow-[0_20px_44px_-26px_rgba(22,19,15,0.3)]">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={service.image}
                          alt={`${service.title} — photographed for the practice portfolio`}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          loading="lazy"
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <figcaption className="mt-5">
                      <div className="flex items-baseline gap-4">
                        <span className="t1-eyebrow shrink-0">
                          Plate {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          aria-hidden="true"
                          className="h-px flex-1 bg-[#9C7E46]/40"
                        />
                      </div>
                      <h3 className="mt-3 font-t1-display text-2xl font-light leading-tight text-[#16130F] md:text-3xl">
                        {service.title}
                      </h3>
                      <p className="mt-2 max-w-md font-sans text-sm leading-relaxed text-[#6B675E]">
                        {service.description}
                      </p>
                    </figcaption>
                  </figure>
                </Fade>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* ------- Also practiced — shared closing line ------- */}
      <div className="px-6 md:px-10 xl:px-16">
        <div className="mx-auto max-w-[1400px]">
          <div className="mt-16 border-t border-[#16130F]/15 pt-6 lg:motion-safe:mt-0">
            <p className="font-sans text-sm leading-relaxed text-[#6B675E]">
              <span className="t1-eyebrow mr-4">Also practiced</span>
              {alsoPracticed.join("  ·  ")}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
