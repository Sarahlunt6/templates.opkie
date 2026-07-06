"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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

/** Catalog status tags — template voice, one per shelf position */
const STATUS_TAGS = [
  "MOST REQUESTED",
  "HAND-FINISHED",
  "GUIDED SURGERY",
  "ONE PLAN",
];

/**
 * T1 PRESS — the services as an editorial index. A ruled contents list
 * on the left (numbered titles, like a newspaper index) drives a large
 * featured plate on the right; hovering or selecting an entry swaps the
 * feature with a quick cross-cut. Anton titles, mono indices, duotone
 * photography, and the one red accent plate are all preserved.
 */
export default function T1ServicesGallery({
  services,
  alsoPracticed,
}: T1ServicesGalleryProps) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const svc = services[active];

  const move = (delta: number) => {
    const next = (active + delta + services.length) % services.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      move(1);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      move(-1);
    }
  };

  return (
    <div>
      <Fade>
        <div className="grid grid-cols-1 gap-px border border-[rgba(26,23,19,0.15)] bg-[rgba(26,23,19,0.15)] lg:grid-cols-12">
          {/* Index — the ruled contents list */}
          <div
            role="tablist"
            aria-label="Services index"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            className="flex flex-col gap-px bg-[rgba(26,23,19,0.15)] lg:col-span-5"
          >
            {services.map((service, i) => {
              const on = i === active;
              return (
                <button
                  key={service.title}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  id={`svc-tab-${i}`}
                  aria-selected={on}
                  aria-controls="svc-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  className={`group flex items-center gap-4 p-5 text-left transition-colors duration-300 md:gap-5 md:p-7 ${
                    on ? "bg-[#F3EFE6]" : "bg-[#E9E3D4] hover:bg-[#EFEADC]"
                  }`}
                >
                  <span
                    className={`t1-mono-label ${
                      on ? "t1-mono-label-red" : "t1-mono-label-stone"
                    }`}
                  >
                    [ {String(i + 1).padStart(2, "0")} ]
                  </span>
                  <span
                    className={`flex-1 font-t1-press text-2xl uppercase leading-[0.95] transition-colors duration-300 md:text-[1.75rem] ${
                      on
                        ? "text-[#1A1713]"
                        : "text-[#6B675E] group-hover:text-[#1A1713]"
                    }`}
                  >
                    {service.title}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`text-lg transition-all duration-300 ${
                      on
                        ? "translate-x-0 text-[#D92B21]"
                        : "-translate-x-1 text-[rgba(26,23,19,0.3)] group-hover:translate-x-0 group-hover:text-[#1A1713]"
                    }`}
                  >
                    →
                  </span>
                </button>
              );
            })}
          </div>

          {/* Feature plate — the selected service, cross-cut on change */}
          <div
            role="tabpanel"
            id="svc-panel"
            aria-labelledby={`svc-tab-${active}`}
            className="bg-[#E9E3D4] lg:col-span-7"
          >
            <AnimatePresence mode="wait">
              <motion.article
                key={svc.title}
                initial={reduced ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: T1_EASE }}
                className="flex h-full flex-col p-5 md:p-8"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="t1-mono-label t1-mono-label-red">
                    [ {String(active + 1).padStart(2, "0")} ]
                  </span>
                  <span className="t1-mono-label border border-[#1A1713] px-2 py-1 !text-[10px]">
                    {STATUS_TAGS[active % STATUS_TAGS.length]}
                  </span>
                </div>

                <div className="relative mt-5 aspect-[16/10] w-full overflow-hidden border border-[#1A1713] bg-[#F3EFE6]">
                  <Image
                    src={svc.image}
                    alt={`${svc.title} — photographed for the practice catalog`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    loading="lazy"
                    className="t1-duotone object-cover"
                  />
                  {active === 1 && <div aria-hidden="true" className="t1-tint-red" />}
                </div>

                <h3 className="mt-6 font-t1-press text-3xl uppercase leading-[0.95] text-[#1A1713] md:text-4xl">
                  {svc.title}
                </h3>
                <p className="font-t3-serif mt-3 flex-1 text-[15px] leading-[1.7] text-[#6B675E] md:text-base">
                  {svc.description}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-[rgba(26,23,19,0.15)] pt-4">
                  <span className="t1-mono-label t1-mono-label-stone">
                    BY CONSULTATION
                  </span>
                  <span aria-hidden="true" className="t1-arrow-chip">
                    →
                  </span>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </Fade>

      {/* Also practiced — ruled closing line (hidden until categories exist) */}
      {alsoPracticed.length > 0 && (
        <div className="mt-8 flex flex-col gap-2 border-t border-[rgba(26,23,19,0.15)] pt-4 sm:flex-row sm:items-baseline sm:gap-6">
          <p className="t1-mono-label t1-mono-label-red shrink-0">
            [ ALSO PRACTICED ]
          </p>
          <p className="t1-mono-label t1-mono-label-stone !normal-case !tracking-[0.08em]">
            {alsoPracticed.join("  /  ")}
          </p>
        </div>
      )}
    </div>
  );
}
